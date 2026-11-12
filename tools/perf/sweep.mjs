// GitHub 汉化插件 · 多页面巡检台
//
// 基准台（bench.mjs）只盯仓库主页一个页面，那里的结论未必适用于别的页面：模块在
// notifications / settings / issue 列表这些页面上遇到的头部、弹层、词条都不一样。
// 这个巡检台按同一套注入流程过一遍页面清单，逐页记录：
//   - 翻译覆盖度（header 元素数 / 中文叶子数 / navSamples）
//   - 全页中文指纹（去重排序后哈希，含可译属性里的中文）
//   - 模块自己的驱动计数（resolved / miss / hit-static / hit-regexp 的**键集合**）
//   - 插桩快照里的写入与错误计数
//
// 用法:
//   node tools/perf/sweep.mjs                          # 仓库 main.user.js，内置页面清单
//   node tools/perf/sweep.mjs --main <副本路径> --out <报告.json>
//   node tools/perf/sweep.mjs --baseline <另一份.json>  # 逐页对照两份报告
//   node tools/perf/sweep.mjs --pages url1,url2 --settle 3000
//
// 读数纪律：
//   - 页面里的相对时间、计数本身就是动态的，所以**先把同一份脚本跑两遍**看哪些页面指纹稳定；
//     指纹不稳定的页面只能用 driver 的键集合做对照，不能拿指纹说事。
//   - driver 键集合（resolved:/miss:/hit-static:）逐字可比：剪枝类改造只要没丢翻译，
//     这份集合在两份报告里就该完全相同。

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { attach, closeOtherPages, debugPort, openPage, sleep } from './lib/cdp.mjs';
import { installHarness, uninstallHarness } from './lib/instrument.mjs';

const args = process.argv.slice(2);
const argOf = name => {
    const i = args.indexOf(name);
    return i === -1 ? null : args[i + 1];
};

const DEFAULT_PAGES = [
    'https://github.com/maboloshi/github-chinese',
    'https://github.com/maboloshi/github-chinese/issues',
    'https://github.com/maboloshi/github-chinese/pulls',
    'https://github.com/maboloshi/github-chinese/issues/700',
    'https://github.com/notifications',
    'https://github.com/maboloshi',
    'https://github.com/settings/profile',
    'https://github.com/search?q=react&type=repositories',
];

const PAGES = (argOf('--pages') || '').split(',').map(s => s.trim()).filter(Boolean);
const URLs = PAGES.length ? PAGES : DEFAULT_PAGES;
const SETTLE = Number(argOf('--settle') || 3000);
const OUT = resolve(argOf('--out') || 'D:/edge-debug/reports/sweep.json');
const BASELINE = argOf('--baseline') ? resolve(argOf('--baseline')) : null;
const MAIN = argOf('--main');

// 全页中文指纹：去重 + 排序后做 FNV-1a，顺序噪声不影响结果；同时留一小撮样本便于人工核对。
const FINGERPRINT = `(() => {
    const CJK = /[\\u3400-\\u9fff]/;
    const SKIP = 'svg, canvas, video, textarea, code, pre';
    const texts = [];
    let cjkLeaves = 0;
    for (const el of document.querySelectorAll('body *')) {
        if (el.children.length) continue;
        if (el.closest(SKIP)) continue;
        const text = (el.textContent || '').trim();
        if (!text || !CJK.test(text)) continue;
        cjkLeaves += 1;
        if (texts.length < 6000) texts.push(text);
    }
    const hash = list => {
        let h = 2166136261;
        for (const s of list) for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
        return (h >>> 0).toString(16);
    };
    const uniqText = [...new Set(texts)].sort();
    // 页面里的相对时间、计数本身就在变，指纹要能把它们排除掉才算稳定信号；
    // 两套都记：textHash 是全量（噪声参考），stableHash 去掉含数字的条目（对照用）。
    const stableText = uniqText.filter(text => !/[0-9]/.test(text));
    const attrs = [...document.querySelectorAll('[title], [aria-label], [data-visible-text], [placeholder]')]
        .map(el => ['title', 'aria-label', 'data-visible-text', 'placeholder']
            .map(name => el.getAttribute(name) || '').join('|'))
        .filter(value => CJK.test(value));
    const uniqAttr = [...new Set(attrs)].sort();
    return {
        cjkLeaves,
        textUniq: uniqText.length,
        textHash: hash(uniqText),
        stableUniq: stableText.length,
        stableHash: hash(stableText),
        attrUniq: uniqAttr.length,
        attrHash: hash(uniqAttr),
        sample: uniqText.slice(0, 10),
    };
})()`;

const DRIVERS = `(() => {
    const drv = window.__gnavDrivers;
    if (!drv || !drv.count) return null;
    const buckets = { resolved: [], miss: [], hitStatic: [], hitRegexp: [], other: [] };
    for (const key of Object.keys(drv.count)) {
        const i = key.indexOf(':');
        const kind = i === -1 ? key : key.slice(0, i + 1);
        const value = i === -1 ? key : key.slice(i + 1);
        if (kind === 'resolved:') buckets.resolved.push(value);
        else if (kind === 'miss:') buckets.miss.push(value);
        else if (kind === 'hit-static:') buckets.hitStatic.push(value);
        else if (kind === 'hit-regexp:') buckets.hitRegexp.push(value);
        else buckets.other.push([key, drv.count[key]]);
    }
    for (const list of [buckets.resolved, buckets.miss, buckets.hitStatic]) list.sort();
    return buckets;
})()`;

const SNAPSHOT_KEYS = [
    'cjkTextWrites', 'setAttributeWrites', 'dataWrites', 'textContentWrites',
    'destructiveTextWrites', 'removeChildErrors', 'insertErrors', 'longTasks', 'revertWrites',
];

const session = await attach(debugPort());
await session.send('Page.enable');
await session.send('Runtime.enable');
await session.send('Emulation.setFocusEmulationEnabled', { enabled: true }).catch(() => {});

const closed = await closeOtherPages(session.page.id, debugPort());
if (closed) console.log(`已关闭 ${closed} 个多余标签页。`);
await session.send('Page.bringToFront');

const registrations = await installHarness(session, { mainPath: MAIN ? resolve(MAIN) : null });
console.log(`插桩已登记${MAIN ? `（main: ${resolve(MAIN)}）` : ''}，开始巡检 ${URLs.length} 个页面。`);

const records = [];
for (const url of URLs) {
    try {
        await openPage(session, url);
    } catch (e) {
        records.push({ url, error: '导航失败: ' + e.message });
        console.log(`${url}  导航失败`);
        continue;
    }
    await sleep(SETTLE);

    const fingerprint = await session.json(FINGERPRINT);
    const coverage = await session.json('window.__gnavCoverage ? window.__gnavCoverage() : null');
    const full = await session.json('window.__gnavSnapshot ? window.__gnavSnapshot() : null');
    const drivers = await session.json(DRIVERS);

    const snapshot = {};
    for (const key of SNAPSHOT_KEYS) snapshot[key] = full ? full[key] : null;

    records.push({ url, pathname: new URL(url).pathname, fingerprint, coverage, snapshot, drivers });
    console.log(
        `${new URL(url).pathname.padEnd(34)} 中文叶子=${String(fingerprint.cjkLeaves).padStart(4)} `
        + `稳定hash=${fingerprint.stableHash} 属性hash=${fingerprint.attrHash} `
        + `header=${coverage ? coverage.headerElements : '-'} `
        + `miss=${drivers ? drivers.miss.length : '-'} resolved=${drivers ? drivers.resolved.length : '-'} `
        + `hitStatic=${drivers ? drivers.hitStatic.length : '-'} 回写=${snapshot.revertWrites}`,
    );
}

await uninstallHarness(session, registrations);
session.close();

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ main: MAIN || '(repo main.user.js)', settle: SETTLE, records }, null, 2));
console.log(`\n报告已写入: ${OUT}`);

if (!BASELINE) process.exit(0);

// ---- 逐页对照 ----
const baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));
const byUrl = new Map(baseline.records.map(r => [r.url, r]));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let stable = 0;
let drifted = 0;

console.log(`\n对照基线: ${BASELINE}`);
for (const record of records) {
    const before = byUrl.get(record.url);
    if (!before) {
        console.log(`${record.pathname}  ← 基线里没有这一页`);
        continue;
    }

    const diff = [];
    if (!same(before.fingerprint?.textHash, record.fingerprint?.textHash)) diff.push('中文文本指纹');
    if (!same(before.fingerprint?.stableHash, record.fingerprint?.stableHash)) diff.push('去数字后文本指纹');
    if (!same(before.fingerprint?.attrHash, record.fingerprint?.attrHash)) diff.push('属性中文指纹');
    if (!same(before.fingerprint?.cjkLeaves, record.fingerprint?.cjkLeaves)) {
        diff.push(`中文叶子 ${before.fingerprint?.cjkLeaves}->${record.fingerprint?.cjkLeaves}`);
    }
    for (const key of ['headerElements', 'cjkLeafElements']) {
        if (!same(before.coverage?.[key], record.coverage?.[key])) {
            diff.push(`${key} ${before.coverage?.[key]}->${record.coverage?.[key]}`);
        }
    }
    for (const key of ['cjkTextWrites', 'textContentWrites', 'setAttributeWrites', 'destructiveTextWrites']) {
        if (!same(before.snapshot?.[key], record.snapshot?.[key])) {
            diff.push(`${key} ${before.snapshot?.[key]}->${record.snapshot?.[key]}`);
        }
    }
    // 驱动计数只存在于插桩副本（--main 指向 D:\edge-debug\debug-main.user.js 时）。
    // 对照历史提交时那份脚本没有插桩，此时只比指纹与写入计数。
    if (before.drivers && record.drivers) {
        for (const key of ['resolved', 'miss', 'hitStatic', 'hitRegexp']) {
            const a = before.drivers[key];
            const b = record.drivers[key];
            if (!same(a, b)) {
                const onlyBefore = (a || []).filter(x => !(b || []).includes(x));
                const onlyAfter = (b || []).filter(x => !(a || []).includes(x));
                diff.push(`${key}(仅基线:${onlyBefore.length} 仅本次:${onlyAfter.length})`);
            }
        }
    }
    if (!same(before.snapshot?.revertWrites, record.snapshot?.revertWrites)) diff.push('revertWrites');

    if (diff.length) {
        drifted += 1;
        console.log(`${record.pathname}  ⚠ 差异: ${diff.join('、')}`);
    } else {
        stable += 1;
        console.log(`${record.pathname}  ✓ 一致`);
    }
}
console.log(`\n一致 ${stable} 页，有差异 ${drifted} 页（指纹差异也可能是页面动态内容，需再跑一遍确认噪声）。`);
