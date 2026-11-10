// 验证 #826：翻译结果已经在 DOM 里时，MutationObserver 的重挂载不得再补翻译按钮
//
// 由于基准台的 GM_xmlhttpRequest 是空壳、走不到 showTransResult，这里直接复刻它留下的 DOM：
// 移除按钮，把 .translation-result 插到描述元素后面，等观察器跑完再看按钮有没有回来。
//
// 用法: node tools/perf/probe-transdesc-rearm.mjs [url]

import { attach, closeOtherPages, debugPort, openPage, sleep } from './lib/cdp.mjs';
import { installHarness, repoRoot, uninstallHarness } from './lib/instrument.mjs';

const DESC = '[class*="borderGrid__"] p[class*="description__"]';
const URL_ = process.argv[2] || 'https://github.com/maboloshi/github-chinese';

const session = await attach(debugPort());
await session.send('Page.enable');
await session.send('Runtime.enable');
await closeOtherPages(session.page.id, debugPort());

const registrations = await installHarness(session, { root: repoRoot });
await openPage(session, URL_);
await sleep(3000);

const count = () => session.evaluate(`document.querySelectorAll('.translate-button').length`);

console.log('描述元素存在:', await session.evaluate(`!!document.querySelector('${DESC}')`));
console.log('初始翻译按钮数:', await count());

// 复刻 showTransResult 之后的 DOM：按钮被移除，结果容器插在描述后面
const simulated = await session.evaluate(`(() => {
    const element = document.querySelector('${DESC}');
    if (!element) return 'no-element';
    document.querySelectorAll('.translate-button').forEach(button => button.remove());
    const result = document.createElement('div');
    result.className = 'translation-result';
    result.textContent = '（模拟翻译结果）';
    element.after(result);
    return 'ok';
})()`);
console.log('模拟翻译完成:', simulated);

await sleep(1200);

const after = await count();
const sibling = await session.evaluate(`(() => {
    const element = document.querySelector('${DESC}');
    return element?.nextElementSibling?.className || null;
})()`);

console.log('重挂载后的翻译按钮数:', after);
console.log('描述元素的下一个兄弟:', sibling);
console.log(after === 0 ? '✔ 没有重复叠加' : '✖ 又挂上了一个按钮');

await uninstallHarness(session, registrations);
session.close();
process.exit(after === 0 ? 0 : 1);
