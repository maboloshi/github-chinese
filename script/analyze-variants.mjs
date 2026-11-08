#!/usr/bin/env node
/**
 * 变体分析：在不把词库读进上下文的前提下，找出「同一英文 → 多种中文」的地方。
 *
 * 视角：
 *   --word <w>        某个词/词的译法分布（中文 n-gram 提升度）
 *   --template <p>    以 p 开头的键，译文的前缀/后缀模板（如 Learn more about）
 *   --templates [n]   扫描全库三词前缀，找出「模板不统一」的高频句式
 *   --keys [n]        同一个英文键在不同段落被译成不同值（含长句）
 *   --scan [n]        短键（≤3 个英文词）多译扫描，按分歧程度排序
 *
 * 用法：
 *   node script/analyze-variants.mjs --word email
 *   node script/analyze-variants.mjs --template "Learn more about"
 *   node script/analyze-variants.mjs --keys 20
 *   node script/analyze-variants.mjs --scan 20
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDictionary } from './check-terms.mjs';

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const args = process.argv.slice(2);

function opt(name, fallback) {
    const i = args.indexOf(name);
    return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
function num(name, fallback) {
    const v = Number(opt(name, ''));
    return Number.isFinite(v) && v > 0 ? v : fallback;
}

const dict = loadDictionary(opt('--dict', path.join(ROOT, 'locals.js')));
const entries = dict.entries;
const TOTAL = entries.length;

/* ---------- 中文 n-gram 索引 ---------- */

const HAN_RUN = /[\u4e00-\u9fff]+/g;
const globalNgrams = new Map();
let globalGramTotal = 0;

function walkNgrams(value, cb) {
    for (const m of value.matchAll(HAN_RUN)) {
        const run = m[0];
        for (let len = 2; len <= 4; len++) {
            for (let i = 0; i + len <= run.length; i++) cb(run.slice(i, i + len));
        }
    }
}

const buildGlobal = () => {
    for (const e of entries) walkNgrams(e.value, (g) => globalNgrams.set(g, (globalNgrams.get(g) || 0) + 1));
    globalGramTotal = TOTAL;
};
buildGlobal();

/* ---------- 英文 token 倒排 ---------- */

const TOKEN_RE = /[a-z][a-z0-9'-]*/gi;
const tokenIndex = new Map();

for (const e of entries) {
    if (e.key.startsWith('/')) continue; // 正则条目不是英文短语
    const seen = new Set();
    for (const m of e.key.matchAll(TOKEN_RE)) {
        const t = m[0].toLowerCase();
        if (t.length < 3 || seen.has(t)) continue;
        seen.add(t);
        let arr = tokenIndex.get(t);
        if (!arr) tokenIndex.set(t, (arr = []));
        arr.push(e);
    }
}

/* ---------- 词级变体 ---------- */

/**
 * 候选译文只从「短键」（≤3 个英文词）的译文里取前缀/后缀 n-gram。
 * 这样能避开「子邮」「过邮」这类从词中间切出来的碎片。
 */
function candidateGrams(group) {
    const sources = new Map(); // gram -> Set<value>
    for (const e of group) {
        if (e.key.split(/\s+/).length > 3) continue;
        const runs = e.value.match(HAN_RUN) || [];
        for (const run of runs) {
            for (let len = 2; len <= 5; len++) {
                if (run.length < len) continue;
                for (const gram of [run.slice(0, len), run.slice(-len)]) {
                    if (!sources.has(gram)) sources.set(gram, new Set());
                    sources.get(gram).add(e.value);
                }
            }
        }
    }
    // 只保留至少出现在 2 条不同短键译文里的片段，滤掉一次性短语
    return [...sources].filter(([, values]) => values.size >= 2).map(([gram]) => gram);
}

function variantsOf(group, minCount = 5, minCoverage = 0.03, limit = 10) {
    if (!group.length) return [];
    const candidates = candidateGrams(group);
    const scored = [];

    for (const gram of candidates) {
        let count = 0;
        for (const e of group) if (e.value.includes(gram)) count++;
        if (count < minCount) continue;
        const coverage = count / group.length;
        if (coverage < minCoverage) continue;
        const expected = ((globalNgrams.get(gram) || 0) / globalGramTotal) * group.length;
        const lift = count / Math.max(expected, 0.5);
        scored.push({ gram, count, coverage, lift });
    }

    scored.sort((a, b) => b.coverage - a.coverage);

    // 包含关系去重：A ⊂ B 且出现次数几乎相同，保留更长的 B
    const picked = [];
    for (const s of scored) {
        const covered = picked.find((p) => p.gram.includes(s.gram) && Math.abs(p.count - s.count) <= Math.max(2, p.count * 0.1));
        if (covered) continue;
        picked.push(s);
        if (picked.length >= limit * 2) break;
    }

    const cleaned = picked.filter(
        (s) => !picked.some((p) => p !== s && p.gram.length > s.gram.length && p.gram.includes(s.gram) && Math.abs(p.count - s.count) <= Math.max(2, p.count * 0.1)),
    );
    return cleaned.slice(0, limit);
}

function cmdWord(word) {
    const key = word.toLowerCase();
    const group = tokenIndex.get(key) || [];
    if (!group.length) {
        console.log(`未找到包含「${word}」的键`);
        return;
    }
    console.log(`### ${word}（${group.length} 个键）`);
    for (const v of variantsOf(group, 5, 0.03, 10)) {
        console.log(`   ${v.gram}  ×${v.count}  覆盖 ${(v.coverage * 100).toFixed(0)}%  提升 ${v.lift.toFixed(1)}`);
    }
}

/* ---------- 短语模板 ---------- */

function topPrefix(values, len) {
    const m = new Map();
    for (const v of values) m.set(v.slice(0, len), (m.get(v.slice(0, len)) || 0) + 1);
    return [...m].sort((a, b) => b[1] - a[1]);
}
function topSuffix(values, len) {
    const m = new Map();
    for (const v of values) m.set(v.slice(-len), (m.get(v.slice(-len)) || 0) + 1);
    return [...m].sort((a, b) => b[1] - a[1]);
}

function cmdTemplate(phrase) {
    const p = phrase.toLowerCase();
    const group = entries.filter((e) => e.key.toLowerCase().startsWith(p));
    if (!group.length) {
        console.log(`没有以「${phrase}」开头的键`);
        return;
    }
    const values = group.map((e) => e.value);
    console.log(`### 模板 ${phrase}（${group.length} 个键）`);

    for (const len of [6, 4]) {
        const rows = topPrefix(values, len).filter(([, n]) => n / values.length >= 0.03).slice(0, 5);
        if (!rows.length) continue;
        console.log(`前缀 ${len} 字：`);
        for (const [v, n] of rows) console.log(`   ${v}  ×${n}  ${((n / values.length) * 100).toFixed(0)}%`);
    }
    for (const len of [4, 3]) {
        const rows = topSuffix(values, len).filter(([, n]) => n / values.length >= 0.03).slice(0, 5);
        if (!rows.length) continue;
        console.log(`后缀 ${len} 字：`);
        for (const [v, n] of rows) console.log(`   ${v}  ×${n}  ${((n / values.length) * 100).toFixed(0)}%`);
    }

    const samples = group.slice(0, 3);
    console.log('样例：');
    for (const e of samples) console.log(`   ${e.key.slice(0, 70)}  →  ${e.value.slice(0, 70)}`);
}

/* ---------- 同键多译 ---------- */

function cmdKeys(limit) {
    const byKey = new Map();
    for (const e of entries) {
        if (!byKey.has(e.key)) byKey.set(e.key, new Map());
        const m = byKey.get(e.key);
        m.set(e.value, (m.get(e.value) || 0) + 1);
    }
    const rows = [];
    for (const [key, m] of byKey) {
        if (m.size < 2) continue;
        const counts = [...m.values()];
        const total = counts.reduce((a, b) => a + b, 0);
        const top = Math.max(...counts);
        rows.push({ key, total, variants: m.size, share: top / total, values: [...m].sort((a, b) => b[1] - a[1]) });
    }
    rows.sort((a, b) => b.total * (1 - b.share) - a.total * (1 - a.share));
    console.log(`同键多译：${rows.length} 个键（显示前 ${Math.min(limit, rows.length)}）`);
    for (const r of rows.slice(0, limit)) {
        const detail = r.values.slice(0, 3).map(([v, n]) => `${v.slice(0, 24)}×${n}`).join(' | ');
        console.log(`\n${r.key.slice(0, 68)}  (${r.total})  ${detail}`);
    }
}

/* ---------- 全库扫描：短键多译 ---------- */

function cmdScan(limit) {
    const byKey = new Map();
    for (const e of entries) {
        const words = e.key.trim().split(/\s+/);
        if (words.length > 3 || words.length < 1) continue;
        if (!/^[A-Za-z]/.test(e.key)) continue;
        if (!byKey.has(e.key)) byKey.set(e.key, new Map());
        const m = byKey.get(e.key);
        m.set(e.value, (m.get(e.value) || 0) + 1);
    }

    const rows = [];
    for (const [key, m] of byKey) {
        if (m.size < 2) continue;
        const total = [...m.values()].reduce((a, b) => a + b, 0);
        const top = Math.max(...m.values());
        rows.push({ key, total, share: top / total, values: [...m].sort((a, b) => b[1] - a[1]) });
    }
    rows.sort((a, b) => b.total * (1 - b.share) - a.total * (1 - a.share));

    console.log(`短键多译：${rows.length} 个键（显示前 ${Math.min(limit, rows.length)}）`);
    for (const r of rows.slice(0, limit)) {
        const detail = r.values.slice(0, 4).map(([v, n]) => `${v.slice(0, 20)}×${n}`).join(' | ');
        console.log(`\n${r.key.slice(0, 56)}  (${r.total})  ${detail}`);
    }
}

/* ---------- 模板漂移扫描 ---------- */

function cmdTemplates(limit, minCount = 30) {
    const groups = new Map();
    for (const e of entries) {
        if (e.key.startsWith('/')) continue;
        const words = e.key.trim().split(/\s+/);
        if (words.length < 4) continue;
        const phrase = words.slice(0, 3).join(' ').toLowerCase();
        if (!/^[a-z][a-z' ]*$/.test(phrase)) continue;
        if (!groups.has(phrase)) groups.set(phrase, []);
        groups.get(phrase).push(e);
    }

    const rows = [];
    for (const [phrase, group] of groups) {
        if (group.length < minCount) continue;
        const values = group.map((e) => e.value);

        let best = null;
        for (const len of [4, 5, 6, 8]) {
            const [top] = topPrefix(values, len);
            const coverage = top[1] / values.length;
            if (!best || coverage > best.coverage) best = { len, gram: top[0], count: top[1], coverage };
        }
        if (!best || best.coverage < 0.5) continue; // 没有稳定模板的不看
        const alts = topPrefix(values, best.len).slice(1, 3).filter(([, n]) => n / values.length >= 0.05);
        if (best.coverage >= 0.98 && !alts.length) continue; // 已经完全统一
        rows.push({ phrase, total: group.length, ...best, alts });
    }

    rows.sort((a, b) => b.total * (1 - b.coverage) - a.total * (1 - a.coverage));
    console.log(`模板漂移：${rows.length} 个前缀（显示前 ${Math.min(limit, rows.length)}）`);
    for (const r of rows.slice(0, limit)) {
        const alts = r.alts.map(([v, n]) => `${v}×${n}`).join(' | ');
        console.log(`${r.phrase}  (${r.total})  主：${r.gram}×${r.count} ${(r.coverage * 100).toFixed(0)}%${alts ? '  异：' + alts : ''}`);
    }
}

/* ---------- 入口 ---------- */

if (args.includes('--word')) cmdWord(opt('--word', ''));
else if (args.includes('--template')) cmdTemplate(opt('--template', ''));
else if (args.includes('--templates')) cmdTemplates(num('--templates', 15));
else if (args.includes('--keys')) cmdKeys(num('--keys', 20));
else if (args.includes('--scan')) cmdScan(num('--scan', 15));
else {
    console.log('用法：--word <词> | --template <前缀> | --templates [n] | --keys [n] | --scan [n]');
}
