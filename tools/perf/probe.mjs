// GitHub 汉化插件 · 调试浏览器探针
//
// 用法:
//   node test/perf/probe.mjs                       # 打印页面与脚本注入的关键状态
//   node test/perf/probe.mjs "document.title"      # 执行任意表达式并打印结果
//
// 前置: start-edge-debug.cmd 起的调试浏览器（默认端口 9222，EDGE_DEBUG_PORT 可覆盖）。

import { attach, debugPort, hasHarness, pageTargets } from './lib/cdp.mjs';

const DEFAULT_QUERY = `({
    url: location.href,
    title: document.title,
    loggedIn: document.body.classList.contains('logged-in'),
    login: document.querySelector('meta[name=user-login]')?.content || null,
    globalNav: !!document.querySelector('header.GlobalNav'),
    globalNavTextHosts: document.querySelectorAll('header.GlobalNav [data-component="text"][data-content]').length,
    portalRoot: !!document.querySelector('#__primerPortalRoot__'),
    reactPrivateKeys: [...document.querySelectorAll('header.GlobalNav *')].filter(el => Object.keys(el).some(k => k.startsWith('__reactFiber$'))).length,
    harness: typeof window.__gnavSnapshot === 'function',
    harnessDuplicate: window.__gnavHarnessDuplicate === true,
})`;

const port = debugPort();
const pages = await pageTargets(port);
if (pages.length > 1) {
    console.log(`调试浏览器上有 ${pages.length} 个标签页，本脚本读的是第一个：`);
    for (const page of pages) {
        console.log(`  ${(await hasHarness(page)) ? '[已插桩]' : '[      ]'} ${page.url}`);
    }
}

const session = await attach(port);
const expression = process.argv[2] || DEFAULT_QUERY;
const value = await session.evaluate(`JSON.stringify(${expression}, null, 2)`);
console.log(value === undefined ? '(表达式求值失败)' : value);
session.close();
