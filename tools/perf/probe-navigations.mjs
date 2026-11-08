// GitHub 汉化插件 · 导航方式矩阵探针
//
// 「站内跳转」不止一种：Turbo 标签点击、全局导航点击、文件浏览器点击、Turbo.visit、
// 浏览器前进/后退、纯 pushState、只改 hash、整页加载/刷新、BFCache 恢复……每种走到脚本里的
// 入口都不一样（turbo:load / urlchange / MutationObserver 的 URL 变化检测 / 什么都不触发）。
// 这个探针把每种导航都跑一遍，逐条记录：
//   - 是否同一文档（哨兵还在 → 站内跳转；否则整页重载）
//   - 触发了哪些 Turbo 事件
//   - 模块自己的驱动增量（mark / exec / walk-header / mo-cb）
//   - 到达页面的中文叶子数，并跟「同一 URL 整页加载」的基线对比（这才是「翻没翻出来」）
//
// 用法:
//   node tools/perf/probe-navigations.mjs --main <插桩副本>     # 一条命令可复现
//   node tools/perf/probe-navigations.mjs                       # 用当前文档（先跑过 bench.mjs）

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const BASE = 'D:\\App\\github项目\\github-chinese\\tools\\perf\\lib\\';
const { attach, debugPort, sleep, openPage, benchUrl, closeOtherPages } = await import(pathToFileURL(BASE + 'cdp.mjs').href);
const { installHarness, uninstallHarness } = await import(pathToFileURL(BASE + 'instrument.mjs').href);

const args = process.argv.slice(2);
const argOf = name => {
    const i = args.indexOf(name);

    return i === -1 ? null : args[i + 1];
};
const MAIN = argOf('--main');
const SETTLE = Number(argOf('--settle') || 4000);

const REPO = 'https://github.com/maboloshi/github-chinese';
const TARGETS = {
    repo: REPO,
    issues: `${REPO}/issues`,
    pulls: `${REPO}/pulls`,
    tree: `${REPO}/tree/gh-pages/test`,
    profile: 'https://github.com/maboloshi',
    notifications: 'https://github.com/notifications',
};

const session = await attach(debugPort());
await session.send('Runtime.enable');
await session.send('Page.enable');
await session.send('Page.bringToFront');

let registrations = null;
if (MAIN) {
    await closeOtherPages(session.page.id, debugPort());
    await session.send('Page.bringToFront');
    registrations = await installHarness(session, { mainPath: resolve(MAIN) });
    await openPage(session, benchUrl());
    await sleep(4000);
    if (await session.evaluate('window.__gnavHarnessDuplicate === true')) {
        console.error('调试浏览器里残留了上一轮的注入登记（指标会翻倍）。请关掉调试窗口重开再跑。');
        process.exit(1);
    }
}

const READ = `(() => {
    const CJK = /[\\u3400-\\u9fff]/;
    const SKIP = 'svg, canvas, video, textarea, code, pre';
    let all = 0, body = 0;
    for (const el of document.querySelectorAll('body *')) {
        if (el.children.length) continue;
        if (el.closest(SKIP)) continue;
        const text = (el.textContent || '').trim();
        if (!text || !CJK.test(text)) continue;
        all += 1;
        if (!el.closest('header.GlobalNav')) body += 1;
    }
    const drv = window.__gnavDrivers || { count: {} };
    const c = drv.count || {};
    const snap = window.__gnavSnapshot ? window.__gnavSnapshot() : {};
    return {
        pathname: location.pathname + location.search,
        sentinel: window.__sentinel || null,
        sameBody: document.body === window.__bodyRef,
        cjk: all,
        bodyCjk: body,
        treeNodes: snap.treeNodes || 0,
        errors: snap.errors ? snap.errors.slice(-3) : [],
        driver: {
            mark: c['mark:h'] || 0,
            markHp: c['mark:hp'] || 0,
            markP: c['mark:p'] || 0,
            exec: c['exec'] || 0,
            walkHeader: c['walk-header'] || 0,
            moCb: c['mo-cb'] || 0,
            evtClick: c['evt-click'] || 0,
            cacheHit: c['cache-hit'] || 0,
        },
        turbo: (window.__turboLog || []).splice(0),
    };
})()`;

const armProbe = `(() => {
    window.__sentinel = 'kept';
    window.__bodyRef = document.body;
    window.__turboLog = [];
    for (const name of ['turbo:before-visit', 'turbo:visit', 'turbo:before-fetch-request', 'turbo:render', 'turbo:load', 'turbo:before-cache', 'turbo:before-frame-render', 'turbo:frame-render', 'turbo:frame-load']) {
        document.addEventListener(name, event => window.__turboLog.push(name + (event.defaultPrevented ? '(prevented)' : '')));
    }
    return true;
})()`;

const rows = [];
const state = async () => session.json(READ);
const delta = (before, after) => {
    const out = {};
    for (const key of Object.keys(after)) out[key] = after[key] - before[key];

    return out;
};

const clickHref = href => session.evaluate(
    `(() => {
        const list = [...document.querySelectorAll('a[href="${href}"]')].filter(a => a.getBoundingClientRect().width);
        if (!list.length) return 'no-link';
        list[0].click();
        return (list[0].textContent || '').trim().slice(0, 18);
    })()`,
);

// ---- 1. 整页加载基线 ----
console.log('== 整页加载基线（Page.navigate）==');
const baselines = {};
for (const [name, url] of Object.entries(TARGETS)) {
    await openPage(session, url);
    await sleep(SETTLE);
    const s = await state();
    baselines[name] = { url, cjk: s.cjk, bodyCjk: s.bodyCjk };
    console.log(`${name.padEnd(14)} ${s.pathname.padEnd(40)} 中文叶子=${String(s.cjk).padStart(4)}(正文${String(s.bodyCjk).padStart(4)})`);
}

// ---- 2. 导航方式矩阵 ----
const case_ = async (label, { start, action, expect }) => {
    await openPage(session, start);
    await sleep(SETTLE);
    await session.evaluate(armProbe);
    const before = await state();
    let triggered = null;
    try {
        triggered = await action();
    } catch (e) {
        triggered = 'ERR ' + e.message;
    }
    await sleep(SETTLE);
    const after = await state();
    const row = {
        label,
        triggered,
        from: before.pathname,
        to: after.pathname,
        sameDocument: after.sentinel === before.sentinel,
        sameBody: after.sameBody,
        turbo: after.turbo,
        cjk: after.cjk,
        bodyCjk: after.bodyCjk,
        driver: delta(before.driver, after.driver),
        treeDelta: after.treeNodes - before.treeNodes,
        errors: after.errors,
        expect,
        baseline: baselines[expect] ? baselines[expect].cjk : null,
    };
    rows.push(row);

    const ratio = row.baseline ? `${Math.round(100 * row.cjk / row.baseline)}%` : '-';
    console.log(
        `\n${label}\n  触发=${JSON.stringify(triggered)}  ${row.from} -> ${row.to}`
        + `\n  同一文档=${row.sameDocument ? '是' : '否'} 同一 body=${row.sameBody ? '是' : '否'}`
        + `  中文叶子=${row.cjk}(正文${row.bodyCjk}) 基线=${row.baseline ?? '-'}（${ratio}）`
        + `\n  驱动增量=${JSON.stringify(row.driver)} 遍历节点+${row.treeDelta}`
        + `\n  Turbo 事件=${JSON.stringify(row.turbo)}`
        + (row.errors.length ? `\n  错误=${JSON.stringify(row.errors)}` : ''),
    );
};

console.log('\n== 导航方式矩阵 ==');

await case_('A. 整页加载（Page.navigate 对照）', {
    start: TARGETS.repo,
    action: async () => { await openPage(session, TARGETS.issues); return 'Page.navigate'; },
    expect: 'issues',
});
await case_('B. 原地刷新（Page.reload）', {
    start: TARGETS.issues,
    action: async () => { await session.send('Page.reload'); return 'Page.reload'; },
    expect: 'issues',
});
await case_('C. Turbo：点仓库导航「议题」标签', {
    start: TARGETS.repo,
    action: () => clickHref(`${REPO}/issues`),
    expect: 'issues',
});
await case_('D. Turbo：点仓库导航「拉取请求」标签', {
    start: TARGETS.repo,
    action: () => clickHref(`${REPO}/pulls`),
    expect: 'pulls',
});
await case_('E. Turbo：点全局导航「议题」', {
    start: TARGETS.repo,
    action: () => clickHref('https://github.com/issues'),
    expect: 'issues',
});
await case_('F. Turbo：点仓库导航「议题」后再点「拉取请求」（连续跳转）', {
    start: TARGETS.repo,
    action: async () => {
        const first = await clickHref(`${REPO}/issues`);
        await sleep(3000);
        await session.evaluate(armProbe);
        const second = await clickHref(`${REPO}/pulls`);
        return `${first} -> ${second}`;
    },
    expect: 'pulls',
});
await case_('G. Turbo.visit 直接跳转', {
    start: TARGETS.repo,
    action: () => session.evaluate(`(() => { window.Turbo.visit('${REPO}/pulls'); return 'Turbo.visit'; })()`),
    expect: 'pulls',
});
await case_('H. 浏览器后退（history.back）', {
    start: TARGETS.repo,
    action: async () => { await clickHref(`${REPO}/issues`); await sleep(2500); await session.evaluate('history.back()'); return 'click + back'; },
    expect: 'repo',
});
await case_('I. 浏览器前进（history.forward）', {
    start: TARGETS.repo,
    action: async () => { await clickHref(`${REPO}/issues`); await sleep(2500); await session.evaluate('history.back()'); await sleep(2500); await session.evaluate('history.forward()'); return 'click + back + forward'; },
    expect: 'issues',
});
await case_('J. 只改 hash（location.hash）', {
    start: TARGETS.repo,
    action: () => session.evaluate(`(() => { location.hash = '#readme'; return 'hash'; })()`),
    expect: 'repo',
});
await case_('K. 只 pushState（内容不变）', {
    start: TARGETS.repo,
    action: () => session.evaluate(`(() => { history.pushState({}, '', '${REPO}?tab=readme-ov-file'); return 'pushState'; })()`),
    expect: 'repo',
});
await case_('L. Turbo：跨版块 repo -> notifications -> repo', {
    start: TARGETS.repo,
    action: async () => {
        const a = await clickHref('https://github.com/notifications');
        await sleep(3500);
        await session.evaluate(armProbe);
        const b = await clickHref(REPO);
        return `${a} -> ${b}`;
    },
    expect: 'repo',
});

if (registrations) await uninstallHarness(session, registrations);
console.log(`\n== 汇总（相对同 URL 整页加载的中文叶子对比）==`);
for (const row of rows) {
    const ratio = row.baseline ? `${Math.round(100 * row.cjk / row.baseline)}%` : '-';
    console.log(`${row.label.padEnd(46)} 同文档=${row.sameDocument ? '是' : '否'} 叶子=${String(row.cjk).padStart(4)} 基线=${String(row.baseline ?? '-').padStart(4)} (${ratio.padStart(4)}) walkHeader+${row.driver.walkHeader}`);
}

session.close();
