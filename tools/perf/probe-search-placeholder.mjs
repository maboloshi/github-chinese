// 搜索控件文案探针
//
// 回答：header 搜索按钮 / 弹层输入框的占位提示到底来自哪里（DOM 文本 / input 属性 / CSS），
// 以及当前脚本有没有翻到它。
//
// 用法: node tools/perf/probe-search-placeholder.mjs [url]
// 前置: start-edge-debug.cmd 起的调试浏览器，且已登录 GitHub。

import { attach, closeOtherPages, debugPort, openPage, sleep } from './lib/cdp.mjs';
import { installHarness, repoRoot, uninstallHarness } from './lib/instrument.mjs';

const URL_ = process.argv[2] || 'https://github.com/maboloshi/github-chinese';

const REPORT = `JSON.stringify((() => {
    const header = document.querySelector('header.GlobalNav');
    const inputs = [...document.querySelectorAll('input')]
        .filter(input => ['text', 'search'].includes(input.type))
        .map(input => ({
            cls: (input.className || '').slice(0, 60),
            placeholder: input.getAttribute('placeholder'),
            ariaLabel: input.getAttribute('aria-label'),
            value: (input.value || '').slice(0, 40),
            focused: input === document.activeElement,
        }));
    const placeholders = [...document.querySelectorAll('[class*="Search-module__placeholder"], [class*="Search"] [class*="placeholder"]')]
        .map(el => ({ cls: (el.className || '').slice(0, 60), text: (el.textContent || '').trim().slice(0, 40) }));
    const searchButtons = [...(header ? header.querySelectorAll('button, a, summary') : [])]
        .map(el => (el.textContent || '').trim())
        .filter(text => /search|搜索|jump/i.test(text))
        .slice(0, 6);
    return { inputs, placeholders, searchButtons, portal: !!document.querySelector('#__primerPortalRoot__') && document.querySelector('#__primerPortalRoot__').childElementCount };
})())`;

const session = await attach(debugPort());
await session.send('Page.enable');
await session.send('Runtime.enable');
await closeOtherPages(session.page.id, debugPort());

const registrations = await installHarness(session, { root: repoRoot });
await openPage(session, URL_);
await sleep(3000);

console.log('== 静止状态 ==');
console.log(await session.evaluate(REPORT));

// 打开搜索弹层：优先点 header 里那条「请键入 / 去搜索」按钮
const opened = await session.evaluate(`(() => {
    const header = document.querySelector('header.GlobalNav');
    const buttons = [...(header ? header.querySelectorAll('button, a') : [])]
        .filter(el => !el.disabled && /search|jump|搜索|键入/i.test(
            (el.textContent || '') + ' ' + (el.getAttribute('aria-label') || '')));
    if (!buttons.length) return 'no-button';
    buttons[0].click();
    return buttons[0].textContent.trim().slice(0, 30);
})()`);
console.log('\n点击搜索按钮:', opened);

await sleep(2000);
console.log('\n== 弹层打开后 ==');
console.log(await session.evaluate(REPORT));

await uninstallHarness(session, registrations);
session.close();
