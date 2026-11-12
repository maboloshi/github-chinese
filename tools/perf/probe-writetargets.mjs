// GitHub 汉化插件 · 写入目标形状探针
//
// 用途：在改「销毁式写入」之前，先看清这些写入点的真实 DOM 形状——元素是空的、
// 只有一段文本、还是有多个子节点。写入原语阶梯只能覆盖前两种，所以必须先有数据，
// 否则改完才发现某类目标根本不在阶梯覆盖范围内（表现为漏翻）。
//
// 用法:
//   node tools/perf/probe-writetargets.mjs                       # 默认仓库主页
//   node tools/perf/probe-writetargets.mjs --url <页面地址>
//
// 前置: start-edge-debug.cmd 起的已登录调试浏览器。

import { attach, benchUrl, debugPort, openPage, sleep } from './lib/cdp.mjs';

const args = process.argv.slice(2);
const argOf = name => {
    const i = args.indexOf(name);
    return i === -1 ? null : args[i + 1];
};
const URL = argOf('--url') || benchUrl();
const WAIT = Number(argOf('--wait') || 6000);

// shape() 是这里的关键：阶梯的判据是「子节点个数 + 唯一的那个是不是文本节点」。
const SHAPE = `
const shape = el => {
    const nodes = [...el.childNodes];
    return {
        tag: el.tagName,
        children: nodes.length,
        kinds: nodes.map(n => n.nodeType === Node.TEXT_NODE ? 'text' : (n.nodeType === Node.ELEMENT_NODE ? n.tagName : '#' + n.nodeType)),
        text: (el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 32),
        dataContent: el.getAttribute('data-content'),
        dataMessage: el.getAttribute('data-message'),
        pseudo: [getComputedStyle(el, '::before').content, getComputedStyle(el, '::after').content]
            .filter(v => v && v !== 'none' && v !== 'normal'),
        html: el.outerHTML.replace(/\\s+/g, ' ').slice(0, 220),
    };
};
const census = list => {
    const rows = list.map(shape);
    const byChildren = {};
    for (const row of rows) {
        const key = row.children + ':' + row.kinds.join('+');
        byChildren[key] = (byChildren[key] || 0) + 1;
    }
    return { total: rows.length, byChildren, samples: rows.slice(0, 6) };
};
`;

const QUERY = `(() => {
${SHAPE}
    return {
        url: location.href,
        hydrated: [...document.querySelectorAll('header.GlobalNav *')].some(el => Object.keys(el).some(k => k.startsWith('__reactFiber$'))),
        headerDataContent: census([...document.querySelectorAll('header.GlobalNav [data-component="text"][data-content]')]),
        pageDataContent: census([...document.querySelectorAll('[data-content]')]),
        dataMessage: census([...document.querySelectorAll('[data-message]')]),
        relativeTimes: [...document.querySelectorAll('relative-time')].slice(0, 6).map(el => ({
            host: shape(el),
            hostSiblings: el.childNodes.length,
            shadow: el.shadowRoot
                ? [...el.shadowRoot.childNodes].map(n => n.nodeType === Node.TEXT_NODE ? 'text:' + JSON.stringify(n.data) : (n.nodeType === Node.ELEMENT_NODE ? n.tagName + ':' + JSON.stringify(n.textContent) : '#' + n.nodeType))
                : null,
        })),
        // data-content 同时出现在属性与 ::before 上，必须弄清可见文字到底来自哪一边：
        // 若来自 ::before，写 textContent 不会改变可见文字，改法就完全不同。
        cssProbe: (() => {
            const el = document.querySelector('header.GlobalNav [data-component="text"][data-content]');
            if (!el) return null;
            const pseudo = getComputedStyle(el, '::before');
            const clone = el.cloneNode(true);
            el.parentNode.appendChild(clone);
            clone.textContent = '';
            const emptied = {
                innerText: clone.innerText,
                width: +clone.getBoundingClientRect().width.toFixed(1),
                beforeContent: getComputedStyle(clone, '::before').content,
                beforeDisplay: getComputedStyle(clone, '::before').display,
            };
            clone.remove();
            // 终极判据：把文本子节点换成长字符串，看元素宽度是否随之变化。
            // 变宽 = DOM 文本就是可见文本（写 textContent 有效）；
            // 不变 = 可见文本来自 ::before/attr(data-content)，写 textContent 是白写。
            const original = el.textContent;
            const originalWidth = el.getBoundingClientRect().width;
            el.textContent = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
            const wideWidth = el.getBoundingClientRect().width;
            el.textContent = original;
            return {
                textContent: el.textContent,
                innerText: el.innerText,
                width: +el.getBoundingClientRect().width.toFixed(1),
                before: { content: pseudo.content, display: pseudo.display, width: pseudo.width },
                emptied,
                widthWithLongText: +wideWidth.toFixed(1),
                widthRestored: +el.getBoundingClientRect().width.toFixed(1),
                originalWidth: +originalWidth.toFixed(1),
            };
        })(),
    };
})()`;

const port = debugPort();
const session = await attach(port);
await session.send('Page.enable');
await session.send('Runtime.enable');
await openPage(session, URL);
await sleep(WAIT);

console.log(JSON.stringify(await session.json(QUERY), null, 2));
session.close();
