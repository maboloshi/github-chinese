// GitHub 汉化插件 · 变更通道探针：脏区间到底覆盖到谁
//
// 回答一个问题：MutationObserver 把变化交到脚本手里之后，究竟哪些节点真的被重新翻译了。
// 三档各测一次：
//   addedBare     新增一个「自身带可翻译属性」的元素
//   addedContainer 新增一个容器，可翻译元素在里面
//   attrMutation  对已存在的元素改属性（命中 CONFIG.OBSERVER_CONFIG.attributeFilter）
//   addedText     新增纯文本节点
//   addedSelfAttr 新增元素的自身 title（不在 attributeFilter 里，只能靠 childList 覆盖）
//
// 用法（必须先跑过 bench.mjs，插桩只存在于它重载的那个文档里）:
//   node tools/perf/probe-mutations.mjs

import { attach, debugPort } from './lib/cdp.mjs';

const PROBE = `(async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const host = document.querySelector('.repository-content') || document.body;
    const created = [];
    const make = (tag, attrs, text) => {
        const el = document.createElement(tag);
        for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
        if (text) el.textContent = text;
        return el;
    };

    // 统一用 "Issues"（已验证在本页词典里、译作"议题"）当探针词，
    // 免得把「词不在本页词典」误读成「通道没覆盖」。
    // 也不能用 input/textarea：它们在 ignoreSelectorPage['*'] 里，会被遍历过滤器直接 REJECT，
    // 那样测到的是忽略名单而不是通道本身。
    const bare = make('span', { title: 'Issues' }, 'Issues');

    const titleWrap = make('div');
    const nested = make('span', { title: 'Issues' }, 'Issues');
    titleWrap.appendChild(nested);

    // data-confirm 在 OBSERVER_CONFIG.attributeFilter 里，且 BUTTON 的 dataset.confirm
    // 确实被 handleElementNode 翻译，是唯一能验证「属性变化通道」的组合。
    const confirmWrap = make('div');
    const button = make('button', { 'data-confirm': 'Issues' });
    confirmWrap.appendChild(button);

    for (const el of [bare, titleWrap, confirmWrap]) { host.appendChild(el); created.push(el); }
    await sleep(700);

    const result = {
        addedSelfTitle: bare.getAttribute('title'),       // 新增元素「自身」的属性
        addedSelfText: bare.textContent,                  // 同一个元素的文本
        addedNestedTitle: nested.getAttribute('title'),   // 新增容器里的后代元素
        addedNestedText: nested.textContent,
        addedNestedConfirm: button.getAttribute('data-confirm'),
    };

    button.setAttribute('data-confirm', 'Issues');
    await sleep(700);
    result.attrMutation = button.getAttribute('data-confirm');

    for (const el of created) el.remove();
    return result;
})()`;

const session = await attach(debugPort(), { preferHarness: true });
// 注意不能写成 session.json(PROBE)：那会变成 JSON.stringify(一个 Promise)，结果恒为 {}。
const value = await session.evaluate(`(async () => JSON.stringify(await (${PROBE})))()`);
console.log(JSON.stringify(JSON.parse(value), null, 2));
session.close();
