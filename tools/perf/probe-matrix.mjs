// GitHub 汉化插件 · 交互与导航矩阵探针
//
// 三块：
//   A. 页面基线（整页加载）：逐页记 header / 正文中文叶子，以及可交互元素数量
//   B. 导航矩阵：整页加载、刷新、Turbo 标签点击、全局导航点击、Turbo.visit、
//      后退/前进、只改 hash、只 pushState、跨版块往返 —— 每条重试若干次，
//      分成「站内跳转（同一文档）/ 整页重载 / 没跳成」三类，并对照同 URL 整页加载的覆盖度
//   C. 鼠标交互：把指针扫过页面上各个可交互区块（导航、头像、铃铛、搜索、文件行、侧栏），
//      再真的点开用户菜单与搜索弹层，看被「悬停/点开」后才出现的内容有没有被翻出来
//
// 用法:
//   node tools/perf/probe-matrix.mjs --main <插桩副本> [--settle 4000] [--tries 2]
//   node tools/perf/probe-matrix.mjs                       # 用当前文档（先跑过 bench.mjs）

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
const TRIES = Number(argOf('--tries') || 2);
const INTERACTIONS_ONLY = args.includes('--interactions-only');

const REPO = 'https://github.com/maboloshi/github-chinese';
const TARGETS = {
    repo: REPO,
    issues: `${REPO}/issues`,
    pulls: `${REPO}/pulls`,
    tree: `${REPO}/tree/gh-pages/test`,
    profile: 'https://github.com/maboloshi',
    repos: 'https://github.com/maboloshi?tab=repositories',
    notifications: 'https://github.com/notifications',
    globalIssues: 'https://github.com/issues/assigned',
    globalPulls: 'https://github.com/pulls/inbox',
    settings: 'https://github.com/settings/appearance',
    search: 'https://github.com/search?q=react&type=repositories',
    gist: 'https://gist.github.com/',
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
    await sleep(SETTLE);
    if (await session.evaluate('window.__gnavHarnessDuplicate === true')) {
        console.error('调试浏览器里残留了上一轮的注入登记（指标会翻倍）。请关掉调试窗口重开再跑。');
        process.exit(1);
    }
}

const CJK_STATS = `(() => {
    const CJK = /[\\u3400-\\u9fff]/;
    const SKIP = 'svg, canvas, video, textarea, code, pre';
    let header = 0;
    let body = 0;
    for (const el of document.querySelectorAll('body *')) {
        if (el.children.length) continue;
        if (el.closest(SKIP)) continue;
        const text = (el.textContent || '').trim();
        if (!text || !CJK.test(text)) continue;
        if (el.closest('header.GlobalNav')) header += 1;
        else body += 1;
    }
    const portal = document.getElementById('__primerPortalRoot__');
    let portalCjk = 0;
    if (portal) {
        for (const el of portal.querySelectorAll('*')) {
            if (el.children.length) continue;
            const text = (el.textContent || '').trim();
            if (text && CJK.test(text)) portalCjk += 1;
        }
    }
    const drv = window.__gnavDrivers || { count: {} };
    const c = drv.count || {};
    const snap = window.__gnavSnapshot ? window.__gnavSnapshot() : {};
    return {
        path: location.pathname + location.search,
        sentinel: window.__sentinel || null,
        sameBody: document.body === window.__bodyRef,
        header,
        body,
        portalCjk,
        interactive: document.querySelectorAll('a, button, summary, [role="menuitem"]').length,
        menus: document.querySelectorAll('[role="menu"], [role="dialog"], [role="tooltip"]').length,
        expanded: document.querySelectorAll('[aria-expanded="true"]').length,
        treeNodes: snap.treeNodes || 0,
        cjkTextWrites: snap.cjkTextWrites || 0,
        errors: snap.errors ? snap.errors.slice(-3) : [],
        driver: {
            markHp: c['mark:hp'] || 0, markH: c['mark:h'] || 0, markP: c['mark:p'] || 0,
            exec: c['exec'] || 0, walkHeader: c['walk-header'] || 0, moCb: c['mo-cb'] || 0,
            evtClick: c['evt-click'] || 0, cacheHit: c['cache-hit'] || 0,
        },
        turbo: (window.__turboLog || []).splice(0),
    };
})()`;

const ARM = `(() => {
    window.__sentinel = 'kept';
    window.__bodyRef = document.body;
    window.__turboLog = [];
    for (const name of ['turbo:before-visit', 'turbo:visit', 'turbo:before-fetch-request', 'turbo:render', 'turbo:load', 'turbo:before-frame-render', 'turbo:frame-render']) {
        document.addEventListener(name, event => window.__turboLog.push(name + (event.defaultPrevented ? '(prevented)' : '')));
    }
    return true;
})()`;

const read = () => session.json(CJK_STATS);
const driverDelta = (a, b) => {
    const out = {};
    for (const key of Object.keys(b)) out[key] = b[key] - a[key];

    return out;
};
const move = async (x, y, ms = 350) => {
    await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
    await sleep(ms);
};
const press = async (x, y) => {
    await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
    await sleep(120);
    await session.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await session.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
};
const escape = async () => {
    await session.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await session.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
};
const clickHref = href => session.evaluate(
    `(() => {
        const list = [...document.querySelectorAll('a[href="${href}"]')].filter(a => a.getBoundingClientRect().width);
        if (!list.length) return 'no-link';
        list[0].click();
        return (list[0].textContent || '').trim().slice(0, 18);
    })()`,
);
const waitPath = async (expected, timeoutMs = 6000) => {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        await sleep(250);
        const path = await session.evaluate('location.pathname').catch(() => null);
        if (path === expected) return true;
    }

    return false;
};

// ---------- A. 页面基线 ----------
if (!INTERACTIONS_ONLY) {
    console.log('== A. 整页加载基线 ==');
}
const baselines = {};
if (!INTERACTIONS_ONLY) {
    for (const [name, url] of Object.entries(TARGETS)) {
        await openPage(session, url);
        await sleep(SETTLE);
        const s = await read();
        baselines[name] = s;
        console.log(`${name.padEnd(14)} ${s.path.padEnd(30)} header=${String(s.header).padStart(3)} 正文=${String(s.body).padStart(4)} 可交互=${String(s.interactive).padStart(4)}`);
    }
}

// ---------- B. 导航矩阵 ----------
if (!INTERACTIONS_ONLY) {
    console.log('\n== B. 导航矩阵（每条重试 ' + TRIES + ' 次）==');
}
const navResults = [];

const navCase = async (label, { start, expect, action }) => {
    const attempts = [];
    for (let attempt = 1; attempt <= TRIES; attempt += 1) {
        await openPage(session, start);
        await sleep(SETTLE);
        await session.evaluate(ARM);
        const before = await read();
        let triggered = null;
        try {
            triggered = await action();
        } catch (e) {
            triggered = 'ERR ' + e.message;
        }
        await waitPath(baselines[expect].path.split('?')[0], 5000);
        await sleep(SETTLE);
        const after = await read();
        const changed = after.path !== before.path;
        const kind = !changed ? 'no-op' : (after.sentinel === before.sentinel ? 'turbo' : 'reload');
        attempts.push({
            kind,
            triggered,
            path: after.path,
            header: after.header,
            body: after.body,
            portalCjk: after.portalCjk,
            driver: driverDelta(before.driver, after.driver),
            treeDelta: after.treeNodes - before.treeNodes,
            turbo: after.turbo,
            errors: after.errors,
        });
    }

    const turbos = attempts.filter(a => a.kind === 'turbo');
    const best = (turbos.length ? turbos : attempts).sort((a, b) => b.body - a.body)[0];
    const baseline = baselines[expect].body;
    const row = { label, expect, attempts, best, baseline };
    navResults.push(row);
    console.log(
        `${label}\n  判定: ${attempts.map(a => a.kind).join(' / ')}  到达=${best.path}`
        + `  正文叶子=${best.body}/${baseline}（${Math.round(100 * best.body / baseline)}%）`
        + `  弹层叶子=${best.portalCjk}`
        + `\n  驱动增量=${JSON.stringify(best.driver)} 遍历节点+${best.treeDelta}`
        + `  Turbo=${JSON.stringify(best.turbo.slice(0, 3))}`
        + (best.errors.length ? `\n  错误=${JSON.stringify(best.errors)}` : ''),
    );
};

if (!INTERACTIONS_ONLY) {
await navCase('B1. 整页加载（对照）', {
    start: TARGETS.repo, expect: 'issues',
    action: async () => { await openPage(session, TARGETS.issues); return 'Page.navigate'; },
});
await navCase('B2. 原地刷新', {
    start: TARGETS.issues, expect: 'issues',
    action: async () => { await session.send('Page.reload'); return 'Page.reload'; },
});
await navCase('B3. Turbo 标签点击（仓库导航「议题」）', {
    start: TARGETS.repo, expect: 'issues',
    action: () => clickHref(`${REPO}/issues`),
});
await navCase('B4. Turbo 标签点击（仓库导航「拉取请求」）', {
    start: TARGETS.repo, expect: 'pulls',
    action: () => clickHref(`${REPO}/pulls`),
});
await navCase('B5. 全局导航点击（「议题」）', {
    start: TARGETS.repo, expect: 'issues',
    action: () => clickHref('https://github.com/issues'),
});
await navCase('B6. Turbo.visit 直接跳转', {
    start: TARGETS.repo, expect: 'pulls',
    action: () => session.evaluate(`(() => { window.Turbo.visit('${REPO}/pulls'); return 'Turbo.visit'; })()`),
});
await navCase('B7. 后退（先 Turbo 去 issues 再 back）', {
    start: TARGETS.repo, expect: 'repo',
    action: async () => { const r = await clickHref(`${REPO}/issues`); await sleep(2500); await session.evaluate('history.back()'); return `${r} + back`; },
});
await navCase('B8. 前进（去 issues、back、forward）', {
    start: TARGETS.repo, expect: 'issues',
    action: async () => { await clickHref(`${REPO}/issues`); await sleep(2500); await session.evaluate('history.back()'); await sleep(2500); await session.evaluate('history.forward()'); return 'forward'; },
});
await navCase('B9. 只改 hash', {
    start: TARGETS.repo, expect: 'repo',
    action: () => session.evaluate(`(() => { location.hash = '#readme'; return 'hash'; })()`),
});
await navCase('B10. 只 pushState（内容不变）', {
    start: TARGETS.repo, expect: 'repo',
    action: () => session.evaluate(`(() => { history.pushState({}, '', '${REPO}?tab=readme-ov-file'); return 'pushState'; })()`),
});
}

// ---------- C. 鼠标交互：先枚举，再逐个真点开 ----------
console.log('\n== C. 交互面（repo 主页：枚举可点开的元素，逐个真点开）==');
await openPage(session, TARGETS.repo);
await sleep(SETTLE);
await session.evaluate(ARM);

const portalCount = `(() => {
    const root = document.getElementById('__primerPortalRoot__');
    if (!root) return 0;
    const CJK = /[\\u3400-\\u9fff]/;
    let n = 0;
    for (const el of root.querySelectorAll('*')) {
        if (el.children.length) continue;
        const text = (el.textContent || '').trim();
        if (text && CJK.test(text)) n += 1;
    }
    return n;
})()`;

const enumerate = `(() => {
    const seen = new Set();
    const list = [];
    const push = (el, kind) => {
        if (!el || seen.has(el)) return;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        seen.add(el);
        list.push({
            kind,
            label: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('data-testid') || el.tagName).trim().slice(0, 34),
            x: Math.round(r.x + r.width / 2),
            y: Math.round(r.y + r.height / 2),
        });
    };
    const header = document.querySelector('header.GlobalNav');
    if (header) {
        for (const el of header.querySelectorAll('button[aria-haspopup], [aria-haspopup="menu"], [aria-haspopup="true"], img[alt*="@"]')) push(el, 'header');
        push(header.querySelector('a[href="/notifications"]'), 'header');
    }
    for (const el of document.querySelectorAll('button[aria-haspopup="dialog"], button[data-testid="code-button"], summary[aria-haspopup], button[aria-expanded]')) push(el, 'page');
    return list;
})()`;

const candidates = await session.json(enumerate);
console.log(`枚举到 ${candidates.length} 个候选：` + candidates.map(c => c.label).join(' / '));

for (const candidate of candidates.slice(0, 14)) {
    const before = await read();
    // 先悬停（有些菜单是悬停展开），再点一次
    await move(candidate.x, candidate.y, 800);
    const afterHover = await read();
    await press(candidate.x, candidate.y);
    await sleep(2000);
    const afterClick = await read();
    console.log(
        `「${candidate.label}」(${candidate.kind})\n`
        + `  悬停: 弹层叶子 ${before.portalCjk} -> ${afterHover.portalCjk}  `
        + `点击: 弹层叶子 -> ${afterClick.portalCjk}  正文 ${before.body} -> ${afterClick.body}`
        + `  菜单/对话框数 ${before.menus} -> ${afterClick.menus}  展开态 ${before.expanded} -> ${afterClick.expanded}\n`
        + `  驱动增量=${JSON.stringify(driverDelta(before.driver, afterClick.driver))}`
        + (afterClick.errors.length ? `  错误=${JSON.stringify(afterClick.errors)}` : ''),
    );
    await escape();
    await sleep(900);
    await move(5, 5, 400);
    // 有些「候选」其实会导航（例如头像/仓库链接）：不回到起始页，后面几行就在另一个页面上测了
    if (afterClick.path !== before.path) {
        console.log(`  ⚠ 这一下触发了跳转（${before.path} -> ${afterClick.path}），回到起始页继续`);
        await openPage(session, TARGETS.repo);
        await sleep(SETTLE);
        await session.evaluate(ARM);
    }
}

// ---------- D. 更多页面上的交互 ----------
console.log('\n== D. 其它页面上的交互面 ==');
for (const [name, url] of [['tree', TARGETS.tree], ['notifications', TARGETS.notifications], ['issues', TARGETS.issues]]) {
    await openPage(session, url);
    await sleep(SETTLE);
    await session.evaluate(ARM);
    const list = await session.json(enumerate);
    const before = await read();
    console.log(`${name}（${list.length} 个候选）` + (list.length ? '：' + list.map(c => c.label).join(' / ') : ''));
    for (const candidate of list.slice(0, 4)) {
        const pre = await read();
        await move(candidate.x, candidate.y, 700);
        await press(candidate.x, candidate.y);
        await sleep(2000);
        const post = await read();
        console.log(`  「${candidate.label}」弹层叶子 ${pre.portalCjk} -> ${post.portalCjk}  正文 ${pre.body} -> ${post.body}  菜单/对话框 ${pre.menus} -> ${post.menus}  展开态 ${pre.expanded} -> ${post.expanded}` + (post.errors.length ? ` 错误=${JSON.stringify(post.errors)}` : ''));
        await escape();
        await sleep(800);
        await move(5, 5, 300);
        if (post.path !== pre.path) {
            console.log(`  ⚠ 触发了跳转（${pre.path} -> ${post.path}），回到 ${name} 继续`);
            await openPage(session, url);
            await sleep(SETTLE);
            await session.evaluate(ARM);
        }
    }
    const after = await read();
    console.log(`  该页交互前/正文 ${before.body} -> ${after.body}，错误=${JSON.stringify(after.errors)}`);
}

console.log('\n== 汇总 ==');
for (const row of navResults) {
    const kinds = row.attempts.map(a => a.kind).join('/');
    console.log(`${row.label.padEnd(40)} ${kinds.padEnd(14)} 正文叶子=${String(row.best.body).padStart(4)}/${String(row.baseline).padStart(4)} (${String(Math.round(100 * row.best.body / row.baseline)).padStart(3)}%)`);
}

if (registrations) await uninstallHarness(session, registrations);
session.close();
