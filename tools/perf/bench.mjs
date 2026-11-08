// GitHub 汉化插件 · 性能基准台
//
// 用法:
//   node test/perf/bench.mjs                       # 跑完整场景，写 reports/bench-report.json
//   node test/perf/bench.mjs --baseline test/perf/baseline/1.9.4.4.json
//   node test/perf/bench.mjs --main <另一个 main.user.js>     # A/B 对照历史版本
//
// `--out` 与 `--baseline` 都按当前工作目录解析，`--main` 也是。
//
// 前置: 先用 start-edge-debug.cmd 起一个已登录 GitHub 的调试浏览器（默认端口 9222）。
//
// 为什么必须用真实浏览器: 本基准要量的就是「脚本在 React 管理的真实 DOM 上做了什么」，
// jsdom 既没有 React 水合、也没有真实的排版与事件派发。所有计数都来自 lib/instrument.mjs
// 对原生原型的包装，口径在 bench 与其它 probe/stress 脚本间共用。

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { attach, benchUrl, closeOtherPages, debugPort, delta, formatMetrics, openPage, sleep } from './lib/cdp.mjs';
import { installHarness, repoRoot, uninstallHarness } from './lib/instrument.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const argOf = name => {
    const i = args.indexOf(name);
    return i === -1 ? null : args[i + 1];
};
const OUT = resolve(argOf('--out') || join(here, 'reports', 'bench-report.json'));
const BASELINE = argOf('--baseline');
const MAIN = argOf('--main');
const URL = argOf('--url') || benchUrl();

const port = debugPort();
const session = await attach(port);
await session.send('Page.enable');
await session.send('Runtime.enable');
await session.send('Emulation.setFocusEmulationEnabled', { enabled: true }).catch(() => {});

// 专用调试浏览器里可能残留着别的标签页（点开过新标签就会有）。插桩只存在于本脚本
// 重载的那个文档里，多标签页会让后面的 probe/stress 分不清哪个才是被测对象，先清场。
const closed = await closeOtherPages(session.page.id, port);
if (closed) console.log(`已关闭 ${closed} 个多余标签页，只留被测的那一个。`);

const registrations = await installHarness(session, { root: repoRoot, mainPath: MAIN ? resolve(MAIN) : null });
await session.send('Page.bringToFront');

console.log(`注入完成，导航到 ${URL} …`);
await openPage(session, URL);
await sleep(4000);
await session.send('Page.bringToFront');

if (await session.evaluate('window.__gnavHarnessDuplicate === true')) {
    await uninstallHarness(session, registrations);
    session.close();
    throw new Error('调试浏览器里残留了上一轮的注入登记（指标会翻倍）。请关掉调试窗口重开再跑。');
}
if (!(await session.evaluate('typeof window.__gnavSnapshot === "function"'))) {
    await uninstallHarness(session, registrations);
    session.close();
    throw new Error('插桩未生效：页面没加载成功，或主脚本在注入前就中断了。');
}

const snap = () => session.json('window.__gnavSnapshot()');

const phases = [];
let prev = null;
// 每个阶段记一次累计快照，并打印相对上一阶段的增量。
const step = async (name, action) => {
    if (action) await action();
    const state = await snap();
    const d = prev ? delta(prev, state) : state;
    phases.push({ name, ...state, ...(prev ? { delta: d } : {}) });
    console.log('  ' + formatMetrics(name, d));
    prev = state;
    return state;
};

const click = async (x, y) => {
    await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
    await sleep(150);
    await session.send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await session.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
};
const hover = (x, y) => session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
const escape = async () => {
    await session.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await session.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
};
const rect = sel => session.json(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), w: Math.round(r.width), h: Math.round(r.height) }; })()`);

console.log('（每行是相对上一阶段的增量，第一行是加载完成后的累计值）');
await step('after-load');
const coverage0 = await session.json('window.__gnavCoverage()');

console.log('场景 1: 仓库导航 hover');
await step('hover-issues', async () => {
    const r = await rect('header.GlobalNav a[href$="/issues"]');
    if (r) await hover(r.x, r.y);
    await sleep(1500);
});

console.log('场景 2: 用户菜单（Portal）');
const avatar = (await rect('header.GlobalNav img[alt^="@"]')) || (await rect('header.GlobalNav button[aria-haspopup="true"]'));
await step('menu-open', async () => {
    if (avatar) await click(avatar.x, avatar.y);
    await sleep(2200);
});
const portalSample = await session.json(`[...document.querySelectorAll('#__primerPortalRoot__ [role="menu"] *, #__primerPortalRoot__ [role="dialog"] *')].filter(e => e.children.length === 0).map(e => e.textContent.trim()).filter(Boolean).slice(0, 20)`);
await step('menu-close', async () => {
    await escape();
    await sleep(1200);
});

console.log('场景 3: 搜索弹层 + 连续输入');
const searchButton = await rect('header.GlobalNav button[aria-label*="search" i]');
await step('search-open', async () => {
    if (searchButton) await click(searchButton.x, searchButton.y);
    await sleep(1800);
});
const searchDialogOpen = await session.json(`({ dialog: !!document.querySelector('#search-suggestions-dialog'), input: document.querySelector('header.GlobalNav input, #__primerPortalRoot__ input')?.value ?? null })`);
await step('search-type-5', async () => {
    await session.send('Input.insertText', { text: 'react' });
    await sleep(1200);
});
await step('search-type-more', async () => {
    await session.send('Input.insertText', { text: ' hooks useEffect' });
    await sleep(2000);
});
const searchState = await session.json(`({ dialog: !!document.querySelector('#search-suggestions-dialog'), input: document.querySelector('header.GlobalNav input, #__primerPortalRoot__ input')?.value ?? null, placeholder: document.querySelector('header.GlobalNav [class*="Search-module__placeholder__"]')?.textContent ?? null })`);
await step('search-close', async () => {
    await escape();
    await sleep(1200);
});

console.log('场景 4: 菜单连开连关 x3（压力）');
await step('menu-stress', async () => {
    for (let i = 0; i < 3; i++) {
        if (avatar) await click(avatar.x, avatar.y);
        await sleep(700);
        await escape();
        await sleep(700);
    }
});

console.log('场景 5: 静置（先等前序收尾，再量稳态）');
// menu-stress 收尾时会排一次 400ms 重试；若直接量 10s，这次重试会被算进来，
// 看上去像「空闲时仍在走树」。先静置到确实没有待办，再量稳态。
await step('settle-3s', () => sleep(3000));
await step('idle-10s', () => sleep(10000));

const coverage1 = await session.json('window.__gnavCoverage()');
const finalMetrics = await snap();
const url = await session.evaluate('location.href');

const report = { generatedAt: new Date().toISOString(), repo: repoRoot, url, phases, coverage0, coverage1, portalSample, searchDialogOpen, searchState, finalMetrics };
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(report, null, 2));

console.log('\n报告已写入:', OUT);
console.log('覆盖度 前:', JSON.stringify(coverage0));
console.log('覆盖度 后:', JSON.stringify(coverage1));
console.log('搜索弹层:', JSON.stringify(searchDialogOpen), '| 输入后:', JSON.stringify(searchState));

if (BASELINE) {
    const baseline = JSON.parse(readFileSync(resolve(BASELINE), 'utf8'));
    console.log(`\n与基线对照（${BASELINE}）—— 只列「应下降」的遍历与「必须为 0」的安全性指标：`);
    const keys = ['treeNodes', 'moCallbacks', 'moRecords', 'moTimeMs', 'revertWrites', 'destructiveTextWrites', 'removeChildErrors', 'insertErrors'];
    console.log('  阶段'.padEnd(18) + keys.map(k => k.padStart(20)).join(''));
    for (const phase of phases) {
        const b = baseline.phases.find(p => p.name === phase.name);
        if (!b) continue;
        const cells = keys.map(k => `${b[k]}→${phase[k]}`.padStart(20));
        console.log(`  ${phase.name.padEnd(16)}${cells.join('')}`);
    }
    const before = baseline.coverage1?.cjkLeafElements;
    const after = coverage1?.cjkLeafElements;
    console.log(`  覆盖度 cjkLeafElements: ${before} → ${after}`);
}

await uninstallHarness(session, registrations);
session.close();
