// GitHub 汉化插件 · 悬停验证：hover 还会不会触发头部全量重走、提示气泡是否仍被翻译
//
// 为什么单列一个脚本: 头部模块原先挂了一个捕获阶段的 pointerover 监听，每越过一个元素边界
// 就调度一次「头部全量重走」。它在基准里表现为 hover 阶段 MO 记录 2 条、却遍历 194 个节点。
// 移除它的前提有两条，都要验证：
//   1) hover 不再产生那 194 个节点的遍历；
//   2) 只有悬停才出现的提示气泡照样被翻译。
//
// 关于提示气泡: GitHub 上现在用的是 <tool-tip> 自定义元素（不是 Primer 的
// [role="tooltip"]）。它平时 display:none，文案就放在宿主元素的 light DOM 里，
// 由通用通道翻译；头部模块的 portalSurfaceSelector 从来就匹配不到它。
// 本脚本按 <tool-tip for="..."> 回查它绑定的控件是否在 header 内来判定归属。
//
// 前置: 先跑一次 bench.mjs（它负责注入插桩并重载页面），中间不要刷新页面。

import { attach, debugPort, delta, formatMetrics, sleep } from './lib/cdp.mjs';

const HOVER_TARGETS = [
    'header.GlobalNav button[aria-haspopup="true"]',
    'header.GlobalNav a[href$="/notifications"]',
    'header.GlobalNav button[aria-label]',
];
const CJK = /[\u3400-\u9fff]/;

// 取所有 <tool-tip>，标出可见性、归属（绑定的控件在不在 header 里）与文案。
const TOOLTIPS = `(() => {
    const tips = [...document.querySelectorAll('tool-tip')].map(tip => {
        const anchor = tip.getAttribute('for');
        const owner = anchor ? document.getElementById(anchor) : null;
        return {
            text: (tip.textContent || '').trim().slice(0, 60),
            visible: tip.getClientRects().length > 0,
            inHeader: !!(owner && owner.closest('header.GlobalNav')),
        };
    });
    const header = tips.filter(tip => tip.inHeader);
    return {
        total: tips.length,
        header: header.length,
        details: (header.length ? header : tips).slice(0, 8),
    };
})()`;

const session = await attach(debugPort(), { preferHarness: true });
const snap = () => session.json('window.__gnavSnapshot()');
const point = selector => session.json(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
})()`);
const moveAway = async () => {
    await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 20, y: 400, button: 'none' });
    await sleep(500);
};

const before = await snap();
let hovered = 0;
for (const selector of HOVER_TARGETS) {
    const at = await point(selector);
    if (!at) continue;
    await moveAway();
    await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: at.x, y: at.y, button: 'none' });
    await sleep(1300);
    hovered++;
}
const after = await snap();
const tooltips = await session.json(TOOLTIPS);

console.log(formatMetrics(`hover x${hovered}`, delta(before, after)));
console.log(`<tool-tip> 共 ${tooltips.total} 个，其中绑定在 header 内的 ${tooltips.header} 个：`);
for (const tip of tooltips.details) {
    const state = tip.inHeader ? '仅头部悬停才出现' : '页面其它位置';
    console.log(`  [${tip.visible ? '可见' : '隐藏'}][${state}] ${tip.text === '' ? '(空)' : tip.text}` +
        `  → ${CJK.test(tip.text) ? '已汉化' : '仍是英文'}`);
}

const walked = after.treeNodes - before.treeNodes;
console.log(`\n结论: hover 遍历节点变化 = ${walked}` + (walked === 0 ? '（符合预期：不再全量重走）' : '（预期为 0，需要复查）'));

await moveAway();
session.close();
