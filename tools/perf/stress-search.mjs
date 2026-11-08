// GitHub 汉化插件 · 压力场景 A：quick search 弹层连续打字
//
// 目的: 在一次连续输入里，看 React 是否回写我们的翻译、模块遍历开销有多大。
// 前置: start-edge-debug.cmd 起的调试浏览器；页面停在仓库页且已注入基准台（先跑 bench.mjs）。

import { attach, debugPort, delta, formatMetrics, sleep } from './lib/cdp.mjs';

const session = await attach(debugPort(), { preferHarness: true });
const snap = () => session.json('window.__gnavSnapshot()');

const before = await snap();
console.log('打字前输入框:', await session.evaluate(`[...document.querySelectorAll('input')].map(i => i.value.slice(0, 30)).filter(Boolean)[0]`));

const t0 = Date.now();
for (const chunk of ['react', 'hooks', 'useEffect', 'dependency', 'array']) {
    await session.send('Input.insertText', { text: ' ' + chunk });
    await sleep(160);
}
const typingMs = Date.now() - t0;
const afterTyping = await snap();
console.log(formatMetrics('打字期间', delta(before, afterTyping)));
console.log('打字耗时:', typingMs, 'ms');

await sleep(3000);
const settled = await snap();
console.log(formatMetrics('静置3s后', delta(afterTyping, settled)));
console.log('输入框最终值:', await session.evaluate(`[...document.querySelectorAll('input')].map(i => i.value.slice(0, 60)).filter(Boolean)[0]`));
console.log('弹层是否还在:', await session.evaluate(`!!document.querySelector('#__primerPortalRoot__ .quick-search-overlay-module__Panel__')`));
console.log('弹层内中文片段:', await session.evaluate(`[...document.querySelectorAll('#__primerPortalRoot__ *')].filter(e => !e.children.length && /^[\\u4e00-\\u9fff]/.test((e.textContent || '').trim())).map(e => e.textContent.trim()).slice(0, 12)`));
console.log('最新错误:', await session.evaluate(`window.__gnav.errors.slice(-4)`));

session.close();
