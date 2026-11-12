// GitHub 汉化插件 · 压力场景 B：文件查找器实时过滤（React 每次按键重排大列表）
//
// 目的: 把「抢 React 管理的节点会不会输」钉死在最恶劣的场景上——大量子节点被 React
// 连删带插的同时，我们还在往里写中文。
// 前置: start-edge-debug.cmd 起的调试浏览器；页面停在仓库页且已注入基准台（先跑 bench.mjs）。

import { attach, debugPort, delta, formatMetrics, sleep } from './lib/cdp.mjs';

const session = await attach(debugPort(), { preferHarness: true });
const snap = () => session.json('window.__gnavSnapshot()');

const key = async (k, code, vk) => {
    await session.send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, text: k.length === 1 ? k : undefined });
    await session.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk });
};

// 1. 文件查找器
await session.evaluate('document.activeElement?.blur(); document.body.focus && document.body.focus(); true');
await sleep(300);
let prev = await snap();
await key('t', 'KeyT', 84);
await sleep(1200);
console.log('查找器是否打开:', await session.evaluate(`!!document.querySelector('#__primerPortalRoot__ input, .tree-finder, [class*="tree-finder" i], [class*="FileFinder" i]')`));

const t0 = Date.now();
for (const query of ['loc', 'ales', 'js']) {
    await session.send('Input.insertText', { text: query });
    await sleep(220);
}
const typingMs = Date.now() - t0;
let now = await snap();
console.log(formatMetrics('查找器过滤', delta(prev, now)));
console.log('  过滤耗时:', typingMs, 'ms | 结果条目:', await session.evaluate(`document.querySelectorAll('#__primerPortalRoot__ [role="option"], #__primerPortalRoot__ [role="listbox"] *').length`));
prev = now;
await key('Escape', 'Escape', 27);
await sleep(1500);
now = await snap();
console.log(formatMetrics('关闭查找器', delta(prev, now)));
prev = now;

// 2. 通知面板
const bell = await session.json(`(() => {
    const b = [...document.querySelectorAll('header.GlobalNav a, header.GlobalNav button')]
        .find(e => /notification|通知/i.test(e.getAttribute('aria-label') || '') || /notifications/.test(e.getAttribute('href') || ''));
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
})()`);
console.log('通知入口:', JSON.stringify(bell));
if (bell) {
    await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: bell.x, y: bell.y, button: 'none' });
    await session.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: bell.x, y: bell.y, button: 'left', clickCount: 1 });
    await session.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: bell.x, y: bell.y, button: 'left', clickCount: 1 });
    await sleep(2500);
    now = await snap();
    console.log(formatMetrics('通知面板', delta(prev, now)));
    console.log('  面板内容(前 8):', await session.evaluate(`[...document.querySelectorAll('#__primerPortalRoot__ *')].filter(e => !e.children.length && e.textContent.trim()).map(e => e.textContent.trim()).slice(0, 8)`));
    prev = now;
    await key('Escape', 'Escape', 27);
    await sleep(1500);
    now = await snap();
    console.log(formatMetrics('关闭通知', delta(prev, now)));
}

// 3. 最终静置
await sleep(5000);
const final = await snap();
console.log(formatMetrics('静置5s', delta(now, final)));
console.log('\n累计: removeChild错误=%d insertBefore错误=%d 被删已写节点=%d', final.removeChildErrors, final.insertErrors, final.removedWritten);
console.log('错误列表:', JSON.stringify([...new Set(final.errors)]));

session.close();
