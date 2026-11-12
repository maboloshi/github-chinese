// 头部导航翻译时序探针
//
// 回答两个问题：
//   A. 通用遍历到底有没有翻到 header.GlobalNav 里的导航项（是「从未翻」还是「翻了又被覆盖」）；
//   B. 最终停在英文的是哪几项，它们在不在词库里。
//
// 用法: node tools/perf/probe-header-translate.mjs [url]
// 前置: start-edge-debug.cmd 起的调试浏览器，且已登录 GitHub。

import { attach, closeOtherPages, debugPort, openPage, sleep } from './lib/cdp.mjs';
import { installHarness, repoRoot, uninstallHarness } from './lib/instrument.mjs';

const URL_ = process.argv[2] || 'https://github.com/notifications';
const CJK = /[\u3400-\u9fff]/;

// 采一次样：导航项文本 + 是否有中文 + 是否已挂上 React fiber（水合完成的标志）
const SAMPLE = `JSON.stringify((() => {
    const header = document.querySelector('header.GlobalNav');
    if (!header) return { header: false };
    const items = [...header.querySelectorAll('nav ol li > a > span')].map(span => ({
        text: (span.textContent || '').trim(),
        fiber: Object.keys(span).some(key => key.startsWith('__reactFiber$')),
    })).filter(item => item.text);
    const all = [...header.querySelectorAll('a,button,summary')]
        .map(el => (el.textContent || '').trim())
        .filter(text => text && text.length < 24);
    return {
        header: true,
        items,
        cjkAnywhere: all.some(text => /[\\u3400-\\u9fff]/.test(text)),
        cjkItems: items.filter(item => /[\\u3400-\\u9fff]/.test(item.text)).length,
        labeled: [...header.querySelectorAll('[data-component="text"][data-content]')]
            .map(el => ({ source: el.getAttribute('data-content'), text: (el.textContent || '').trim() })),
    };
})())`;

const session = await attach(debugPort());
await session.send('Page.enable');
await session.send('Runtime.enable');
await closeOtherPages(session.page.id, debugPort());

const registrations = await installHarness(session, { root: repoRoot });
await openPage(session, URL_);

const samples = [];
for (let index = 0; index < 40; index += 1) {
    const raw = await session.evaluate(SAMPLE);
    try {
        samples.push({ at: index * 250, data: JSON.parse(raw) });
    } catch {
        samples.push({ at: index * 250, data: null });
    }
    await sleep(250);
}

await uninstallHarness(session, registrations);
session.close();

const first = samples.find(sample => sample.data?.header);
if (!first) {
    console.log('页面里没有 header.GlobalNav，换一个 url 再试');
    process.exit(1);
}

console.log(`## ${URL_}`);
console.log(`\n出现中文的采样点: ${samples.filter(s => s.data?.cjkAnywhere).map(s => s.at + 'ms').join(', ') || '（一次也没有）'}`);

let previous = '';
for (const { at, data } of samples) {
    if (!data?.header) continue;
    const line = data.items.map(item => item.text).join(' | ');
    if (line !== previous) {
        console.log(`  ${String(at).padStart(5)}ms  [fiber=${data.items[0]?.fiber ? 'yes' : 'no '}] ${line}`);
        previous = line;
    }
}

const last = samples.filter(s => s.data?.header).at(-1).data;
console.log('\n最终状态:');
for (const item of last.items) {
    console.log(`  ${CJK.test(item.text) ? '✔ 中文' : '✖ 英文'}  ${item.text}`);
}
if (last.labeled.length) {
    console.log('\n带 data-content 的节点:');
    for (const item of last.labeled) console.log(`  ${item.source} → ${item.text}`);
}

const dict = (await import('node:fs')).readFileSync('locals.js', 'utf8');
const missing = last.items.filter(item => !CJK.test(item.text) && !dict.includes(`"${item.text}"`));
if (missing.length) {
    console.log('\n词库里也找不到的文案:');
    for (const item of missing) console.log(`  ${item.text}`);
}
