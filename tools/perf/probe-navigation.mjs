// GitHub 汉化插件 · 页面跳转触发探针
//
// 基准台用 Page.navigate 打开每个页面（整文档重载），它测不到「站内 Turbo 跳转」这条路径：
// 点链接换页时文档不重载，头部可能整块换掉、弹层会消失，模块必须靠 turbo:load / urlchange
// 标脏 + MutationObserver 重新挂观察器才能把新页面翻出来。4b 删掉了 800/1600/3000 三个裸
// timeout，4d 又把 Portal 判定改成阶段缓存 —— 这条路径必须单独验。
//
// 用法（两种都行）:
//   node tools/perf/probe-navigation.mjs                     # 用当前文档（先跑过 bench.mjs 才有插桩）
//   node tools/perf/probe-navigation.mjs --main <插桩副本> [--url <起始页>]
//       自己登记插桩并导航到起始页，然后再发起 Turbo 跳转 —— 一条命令可复现。
//
// 判据（每次跳转后都该看到）：
//   - window 上的哨兵还在 → 确实没有整文档重载
//   - mark:hp 增加（turbo:load/urlchange 标脏）、exec 增加、walk-header 增加（头部重走）
//   - 新页面的中文叶子数 > 0（列表/正文被翻出来，不只是头部）
//   - 错误为 0

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const LIB = 'D:\\App\\github项目\\github-chinese\\tools\\perf\\lib\\cdp.mjs';
const { attach, debugPort, sleep, openPage, benchUrl, closeOtherPages } = await import(pathToFileURL(LIB).href);
const { installHarness, uninstallHarness } = await import(
    pathToFileURL('D:\\App\\github项目\\github-chinese\\tools\\perf\\lib\\instrument.mjs').href
);

const args = process.argv.slice(2);
const argOf = name => {
    const i = args.indexOf(name);

    return i === -1 ? null : args[i + 1];
};
const MAIN = argOf('--main');
const START_URL = argOf('--url') || benchUrl();

const session = await attach(debugPort());
await session.send('Runtime.enable');
await session.send('Page.enable');
await session.send('Page.bringToFront');

let registrations = null;
if (MAIN) {
    await closeOtherPages(session.page.id, debugPort());
    await session.send('Page.bringToFront');
    registrations = await installHarness(session, { mainPath: resolve(MAIN) });
    console.log(`插桩已登记（main: ${resolve(MAIN)}），导航到 ${START_URL} …`);
    await openPage(session, START_URL);
    await sleep(4000);
    if (await session.evaluate('window.__gnavHarnessDuplicate === true')) {
        console.error('调试浏览器里残留了上一轮的注入登记（指标会翻倍）。请关掉调试窗口重开再跑。');
        process.exit(1);
    }
}

const json = expr => session.json(expr);

const READ = `(() => {
    const drv = window.__gnavDrivers || null;
    const count = drv ? drv.count : {};
    const CJK = /[\\u3400-\\u9fff]/;
    const SKIP = 'svg, canvas, video, textarea, code, pre';
    let cjkLeaves = 0;
    let bodyCjk = 0;
    for (const el of document.querySelectorAll('body *')) {
        if (el.children.length) continue;
        if (el.closest(SKIP)) continue;
        const text = (el.textContent || '').trim();
        if (!text || !CJK.test(text)) continue;
        cjkLeaves += 1;
        if (!el.closest('header.GlobalNav')) bodyCjk += 1;
    }
    const header = document.querySelector('header.GlobalNav');
    return {
        pathname: location.pathname,
        sentinel: window.__navSentinel || null,
        driver: {
            mark: count['mark:h'] || 0,
            markHp: count['mark:hp'] || 0,
            markP: count['mark:p'] || 0,
            exec: count['exec'] || 0,
            walkHeader: count['walk-header'] || 0,
            moCb: count['mo-cb'] || 0,
            evtClick: count['evt-click'] || 0,
            cacheHit: count['cache-hit'] || 0,
        },
        cjkLeaves,
        bodyCjk,
        headerNav: header
            ? [...header.querySelectorAll('a,button,summary')].slice(0, 12)
                .map(el => (el.getAttribute('aria-label') || el.textContent || '').trim()).filter(Boolean)
            : null,
    };
})()`;

const clickSelector = async selector => {
    const box = await json(`(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return null;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
    })()`);
    if (!box) return false;

    await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x, y: box.y, button: 'none' });
    await sleep(120);
    await session.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1 });
    await session.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1 });

    return true;
};

const waitPath = async (expected, timeoutMs = 8000) => {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        await sleep(200);
        const pathname = await session.evaluate('location.pathname').catch(() => null);
        if (pathname === expected) return true;
    }

    return false;
};

const delta = (before, after) => {
    const out = {};
    for (const key of Object.keys(after)) out[key] = after[key] - before[key];

    return out;
};

// 哨兵：整文档重载会丢掉它，Turbo 跳转不会
await session.evaluate(`window.__navSentinel = ${Date.now()}`);

const steps = [];
const record = async label => {
    const state = await json(READ);
    steps.push({ label, ...state });

    return state;
};

const base = await record('起始（仓库主页，已整页加载）');
console.log(`起始 ${base.pathname}  中文叶子=${base.cjkLeaves}（正文 ${base.bodyCjk}）`);

const hop = async (label, action, expectedPath) => {
    const before = steps[steps.length - 1];
    const started = await action();
    if (!started) {
        console.log(`${label}  ✗ 触发失败（找不到链接或 Turbo 不可用）`);

        return;
    }
    const arrived = await waitPath(expectedPath);
    await sleep(2500);
    const after = await record(label);
    const d = delta(before.driver, after.driver);
    const sameDocument = after.sentinel === base.sentinel;

    console.log(
        `${label}\n  ${before.pathname} -> ${after.pathname}（期望 ${expectedPath}${arrived ? ' ✓' : ' ✗ 未到达'}）`
        + `\n  同一文档=${sameDocument ? '是（站内跳转）' : '否（整页重载）'}`
        + `  中文叶子 ${before.cjkLeaves} -> ${after.cjkLeaves}（正文 ${after.bodyCjk}）`
        + `\n  驱动增量: ${JSON.stringify(d)}`
        + `\n  头部导航样本: ${JSON.stringify((after.headerNav || []).slice(0, 6))}`
        + `\n  Turbo 事件: ${JSON.stringify(await takeTurboLog())}`,
    );

    return { arrived, sameDocument };
};

// GitHub 用 Turbo 做站内跳转：Turbo.visit 与点站内链接走的是同一条路径
// （turbo:visit → turbo:render → turbo:load），比去找「哪条链接是 Turbo 链接」可靠。
const turboVisit = url => session.evaluate(
    `(() => {
        if (!window.Turbo || typeof window.Turbo.visit !== 'function') return false;
        window.Turbo.visit(${JSON.stringify(url)});
        return true;
    })()`,
).catch(() => false);
const hasTurbo = await session.evaluate('!!(window.Turbo && window.Turbo.visit)');
console.log(`页面 Turbo 可用: ${hasTurbo}`);

// Turbo 事件日志：跳转到底有没有发生、卡在哪一步（before-visit 被取消 / fetch 失败 / 渲染后没 load），
// 只看驱动计数分不清「模块漏了」还是「跳转根本没发生」。
await session.evaluate(`(() => {
    window.__turboLog = [];
    for (const name of ['turbo:before-visit', 'turbo:visit', 'turbo:before-fetch-request', 'turbo:before-render', 'turbo:render', 'turbo:load', 'turbo:before-cache']) {
        document.addEventListener(name, event => {
            window.__turboLog.push(name + (event.defaultPrevented ? '(prevented)' : '') + ' @' + location.pathname);
        });
    }
    return true;
})()`);
const takeTurboLog = async () => {
    const log = await json('window.__turboLog ? window.__turboLog.splice(0) : []');

    return log;
};
await takeTurboLog();

const repoBase = 'https://github.com/maboloshi/github-chinese';
await hop('Turbo 跳转 → 仓库「议题」页', () => turboVisit(`${repoBase}/issues`), '/maboloshi/github-chinese/issues');
await hop('Turbo 跳转 → 仓库「拉取请求」页', () => turboVisit(`${repoBase}/pulls`), '/maboloshi/github-chinese/pulls');
await hop('点击仓库导航链接 → 回到代码页', () => clickSelector(`a[href="${repoBase}"]`), '/maboloshi/github-chinese');

// 返回：popstate / Turbo 恢复访问
const beforeBack = steps[steps.length - 1];
await session.evaluate('history.back()');
await sleep(2500);
const afterBack = await record('history.back() 回上一步');
console.log(
    `history.back()\n  ${beforeBack.pathname} -> ${afterBack.pathname}`
    + `\n  同一文档=${afterBack.sentinel === base.sentinel ? '是' : '否'}`
    + `  中文叶子 ${beforeBack.cjkLeaves} -> ${afterBack.cjkLeaves}（正文 ${afterBack.bodyCjk}）`
    + `\n  驱动增量: ${JSON.stringify(delta(beforeBack.driver, afterBack.driver))}`,
);

const errors = await json('(window.__gnavSnapshot ? window.__gnavSnapshot().errors : null)');
console.log(`\n页面错误: ${JSON.stringify(errors)}`);
console.log(`快照: ${JSON.stringify(steps.map(s => ({ label: s.label, pathname: s.pathname, driver: s.driver })), null, 2)}`);

if (registrations) await uninstallHarness(session, registrations);
session.close();
