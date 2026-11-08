#!/usr/bin/env node
/**
 * 术语一致性检查
 *
 * 数据源: docs/terms.json        —— 术语表（单一数据源）
 * 校验对象: locals.js            —— zh-CN 词库
 * 豁免基线: docs/terms-baseline.json —— 存量不一致，只拦新增
 *
 * 用法:
 *   node script/check-terms.mjs                 检查（有新增违规时退出码 1）
 *   node script/check-terms.mjs --all           显示全部提示项
 *   node script/check-terms.mjs --update-baseline  把当前全部违规写入基线
 *   node script/check-terms.mjs --dict other.js 检查另一个词库文件
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const DEFAULTS = {
    dict: path.join(ROOT, 'locals.js'),
    glossary: path.join(ROOT, 'docs', 'terms.json'),
    baseline: path.join(ROOT, 'docs', 'terms-baseline.json'),
};

const isRegExp = (v) => Object.prototype.toString.call(v) === '[object RegExp]';

/** 读入词库，展开为 { 段落, 键, 值 } 列表 */
export function loadDictionary(file) {
    const source = fs.readFileSync(file, 'utf8');
    const context = vm.createContext({});
    vm.runInContext(source, context, { filename: file });

    const zh = context.I18N && context.I18N['zh-CN'];
    if (!zh || typeof zh !== 'object') {
        throw new Error(`${file} 中未找到 I18N["zh-CN"]`);
    }

    const entries = [];
    const byKey = new Map();
    const seen = new WeakSet();

    const add = (section, key, value) => {
        const entry = {
            section,
            key: typeof key === 'string' ? key : `/${key.source}/`,
            value,
        };
        entries.push(entry);
        if (typeof key === 'string') {
            if (!byKey.has(key)) byKey.set(key, []);
            byKey.get(key).push(entry);
        }
    };

    const walk = (section, key, value) => {
        if (typeof value === 'string') {
            add(section, key, value);
        } else if (Array.isArray(value)) {
            for (const item of value) {
                // 正则翻译是 [正则, 译文] 成对出现，键应记为正则本身，而不是父级 "regexp"
                if (Array.isArray(item) && isRegExp(item[0]) && typeof item[1] === 'string') {
                    add(section, item[0], item[1]);
                } else {
                    walk(section, key, item);
                }
            }
        } else if (value && typeof value === 'object' && !isRegExp(value)) {
            for (const [k, v] of Object.entries(value)) walk(section, k, v);
        }
    };

    for (const [section, value] of Object.entries(zh)) {
        if (!value || typeof value !== 'object' || isRegExp(value)) continue;
        // 形如 I18N["zh-CN"]["dashboard"] = I18N["zh-CN"]["page-dashboard"] 的别名段落
        // 与源段落共用同一对象，跳过以免重复计数
        if (seen.has(value)) continue;
        seen.add(value);
        for (const [k, v] of Object.entries(value)) walk(section, k, v);
    }

    return {
        source,
        entries,
        byKey,
        starts: buildLineStarts(source),
        ranges: buildSectionRanges(source),
    };
}

function buildLineStarts(source) {
    const starts = [0];
    for (let i = 0; i < source.length; i++) {
        if (source.charCodeAt(i) === 10) starts.push(i + 1);
    }
    return starts;
}

function lineAt(starts, offset) {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
        const mid = (lo + hi + 1) >> 1;
        if (starts[mid] <= offset) lo = mid;
        else hi = mid - 1;
    }
    return lo + 1;
}

function buildSectionRanges(source) {
    const re = /^I18N\["zh-CN"\]\["([^"]+)"\]/gm;
    const found = [];
    let match;
    while ((match = re.exec(source))) {
        found.push({ name: match[1], start: match.index });
    }
    const ranges = new Map();
    for (let i = 0; i < found.length; i++) {
        ranges.set(found[i].name, {
            start: found[i].start,
            end: i + 1 < found.length ? found[i + 1].start : source.length,
        });
    }
    return ranges;
}

/** 定位某条目在源码中的行号；别名/压缩写法下可能只能给出近似行 */
function locate(dict, section, key, value) {
    const range = dict.ranges.get(section);
    if (!range) return { line: null, exact: false };

    const slice = dict.source.slice(range.start, range.end);
    const quotedValue = JSON.stringify(value);
    let keyAt = -1;

    if (typeof key === 'string') {
        keyAt = slice.indexOf(JSON.stringify(key));
        if (keyAt < 0) keyAt = slice.indexOf(`'${key.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`);
    }

    let valueAt = keyAt >= 0 ? slice.indexOf(quotedValue, keyAt) : slice.indexOf(quotedValue);
    if (valueAt < 0 && keyAt >= 0) valueAt = slice.indexOf(value, keyAt);

    if (valueAt >= 0) {
        return { line: lineAt(dict.starts, range.start + valueAt), exact: keyAt >= 0 };
    }
    if (keyAt >= 0) {
        return { line: lineAt(dict.starts, range.start + keyAt), exact: false };
    }
    return { line: lineAt(dict.starts, range.start), exact: false };
}

const STOPWORDS = new Set([
    'the', 'of', 'in', 'on', 'at', 'to', 'for', 'and', 'or', 'by', 'with',
    'a', 'an', 'we', 'you', 'it', 'is', 'are', 'this', 'that', 's', 'no',
]);

/** 形似 UI 标签的键：短、ASCII、无占位符 */
function isLabelKey(key) {
    if (key.length < 3 || key.length > 28) return false;
    if (!/^[A-Za-z][A-Za-z0-9 '&/.,+-]*$/.test(key)) return false;
    if (/[.,]$/.test(key)) return false;
    const words = key.trim().split(/\s+/);
    if (words.length > 3) return false;
    if (STOPWORDS.has(words[0].toLowerCase())) return false;
    return true;
}

function wordRegExp(word) {
    const body = word.trim().split(/\s+/).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
    return new RegExp(`\\b${body}(?:s|es)?\\b`, 'i');
}

function countValues(entries) {
    const counts = new Map();
    for (const e of entries) counts.set(e.value, (counts.get(e.value) || 0) + 1);
    return [...counts.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count);
}

/**
 * 取某个段落生效的术语规则：override 按 sectionPrefix 最长匹配，
 * 没有命中就用术语默认值。
 */
export function resolveRule(term, section, label) {
    let matched = null;
    for (const override of term.overrides || []) {
        const prefix = override.sectionPrefix;
        if (typeof prefix !== 'string' || !prefix) continue;
        if (!section.startsWith(prefix)) continue;
        if (Array.isArray(override.labels) && label && !override.labels.includes(label)) continue;
        if (!matched || prefix.length > matched.sectionPrefix.length) matched = override;
    }
    return {
        zh: matched ? matched.zh : term.zh,
        forbid: matched && Array.isArray(matched.forbid) ? matched.forbid : term.forbid || [],
        override: matched ? matched.sectionPrefix : null,
    };
}

export function fingerprint(violation) {
    return [violation.id, violation.key, violation.value].join('|');
}

export function loadBaseline(file) {
    if (!fs.existsSync(file)) return [];
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        return Array.isArray(data.terms) ? data.terms : [];
    } catch {
        return [];
    }
}

/**
 * 执行检查，返回结构化结果。
 * @param {{dict?:string, glossary?:string, baseline?:string}} [options]
 */
export function check(options = {}) {
    const dictPath = options.dict ? path.resolve(options.dict) : DEFAULTS.dict;
    const glossaryPath = options.glossary ? path.resolve(options.glossary) : DEFAULTS.glossary;
    const baselinePath = options.baseline ? path.resolve(options.baseline) : DEFAULTS.baseline;

    const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
    const terms = Array.isArray(glossary.terms) ? glossary.terms : [];
    const phrases = Array.isArray(glossary.phrases) ? glossary.phrases : [];
    const bannedRules = Array.isArray(glossary.banned) ? glossary.banned : [];
    const dict = loadDictionary(dictPath);
    const baseline = new Set(loadBaseline(baselinePath));

    const labelKeys = new Set();
    for (const term of terms) for (const label of term.labels || []) labelKeys.add(label);

    const violations = [];
    let labelChecked = 0;

    // 1) 标签规则：精确键 → 精确译文（支持按段落覆盖）
    for (const term of terms) {
        for (const label of term.labels || []) {
            for (const entry of dict.byKey.get(label) || []) {
                labelChecked++;
                const rule = resolveRule(term, entry.section, label);
                if (entry.value === rule.zh) continue;
                const where = locate(dict, entry.section, label, entry.value);
                violations.push({
                    id: term.id,
                    key: label,
                    value: entry.value,
                    expect: rule.zh,
                    override: rule.override,
                    section: entry.section,
                    line: where.line,
                    exact: where.exact,
                    severity: term.severity === 'warn' ? 'warn' : 'error',
                    forbidden: rule.forbid.includes(entry.value),
                    note: term.note || '',
                });
            }
        }
    }

    // 2) 短语模板规则：英文键以 match 开头时，译文必须以 prefix 开头（术语「了解如何」类可 allow）
    for (const rule of phrases) {
        const match = String(rule.match || '').toLowerCase();
        if (!match) continue;
        const allowRe = (rule.allow || []).map((src) => new RegExp(src));
        for (const entry of dict.entries) {
            if (entry.key.startsWith('/')) continue;
            if (!entry.key.toLowerCase().startsWith(match)) continue;
            if (allowRe.some((re) => re.test(entry.value))) continue;

            const normalized = entry.value.replace(/[。．.!！?？:：]+$/, '').trim();
            const prefixMiss = rule.prefix && !normalized.startsWith(rule.prefix);
            const forbidHit = !prefixMiss && (rule.forbid || []).find((f) => entry.value.includes(f));
            if (!prefixMiss && !forbidHit) continue;

            const where = locate(dict, entry.section, entry.key, entry.value);
            violations.push({
                id: rule.id,
                key: entry.key,
                value: entry.value,
                expect: prefixMiss ? rule.prefix : `不含「${forbidHit}」`,
                override: null,
                section: entry.section,
                line: where.line,
                exact: where.exact,
                severity: rule.severity === 'warn' ? 'warn' : 'error',
                forbidden: Boolean(forbidHit),
                note: rule.note || '',
                via: 'phrase',
            });
        }
    }

    // 3) 全域禁用词：任何译文出现 match 即违规，allow 可放行例外（如「迷你」里的「你」）
    for (const rule of bannedRules) {
        const pattern = String(rule.match || '');
        if (!pattern) continue;
        const allowRe = (rule.allow || []).map((src) => new RegExp(src));
        const keyRe = rule.keyMatch ? new RegExp(rule.keyMatch, 'i') : null;
        for (const entry of dict.entries) {
            if (entry.key.startsWith('/')) continue;
            if (keyRe && !keyRe.test(entry.key)) continue;
            if (!entry.value.includes(pattern)) continue;
            if (allowRe.some((re) => re.test(entry.value))) continue;

            const where = locate(dict, entry.section, entry.key, entry.value);
            violations.push({
                id: rule.id,
                key: entry.key,
                value: entry.value,
                expect: `不含「${pattern}」`,
                override: null,
                section: entry.section,
                line: where.line,
                exact: where.exact,
                severity: rule.severity === 'warn' ? 'warn' : 'error',
                forbidden: true,
                note: rule.note || '',
                via: 'banned',
            });
        }
    }

    // 4) 长句规则：键含术语词，值里出现禁用译法（仅提示，不阻断）
    const sentenceHits = [];
    for (const term of terms) {
        if (!term.words || !term.words.length || !term.forbid || !term.forbid.length) continue;
        for (const word of term.words) {
            const re = wordRegExp(word);
            for (const entry of dict.entries) {
                if (entry.key.startsWith('/')) continue; // 正则条目不是标签
                if (!re.test(entry.key)) continue;
                if (labelKeys.has(entry.key)) continue;
                const hit = term.forbid.find((f) => entry.value.includes(f));
                if (!hit) continue;
                const where = locate(dict, entry.section, entry.key, entry.value);
                sentenceHits.push({
                    id: term.id,
                    key: entry.key,
                    value: entry.value,
                    expect: term.zh,
                    forbidden: hit,
                    section: entry.section,
                    line: where.line,
                    exact: where.exact,
                });
            }
        }
    }

    // 3) 标签分歧探测：同一短键存在多种译法，多数派占比 ≥ 80%
    const divergent = [];
    for (const [key, list] of dict.byKey) {
        if (labelKeys.has(key)) continue;
        if (!isLabelKey(key)) continue;
        if (list.length < 3) continue;
        const counts = countValues(list);
        if (counts.length < 2) continue;
        const share = counts[0].count / list.length;
        if (share < 0.8) continue;
        if (!/[\u4e00-\u9fff]/.test(counts[0].value)) continue;
        divergent.push({ key, total: list.length, share, values: counts.slice(0, 4) });
    }
    divergent.sort((a, b) => b.total - a.total);

    // 4) 去重：展开运算符（...I18N["zh-CN"]["x"]["static"]）会把同一词条带进多个段落，
    //    按「术语 + 键 + 值」合并，优先保留能精确定位行号的那条
    const deduped = new Map();
    const warnList = [];
    for (const v of violations) {
        if (v.severity === 'warn') {
            warnList.push(v);
            continue;
        }
        const key = `${v.id}|${v.key}|${v.value}|${v.expect}`;
        const prev = deduped.get(key);
        if (!prev || (prev.exact === false && v.exact === true)) deduped.set(key, v);
    }
    violations.length = 0;
    violations.push(...deduped.values(), ...warnList);

    const dedupedSentence = new Map();
    for (const v of sentenceHits) {
        const key = `${v.id}|${v.key}|${v.value}`;
        if (!dedupedSentence.has(key)) dedupedSentence.set(key, v);
    }
    sentenceHits.length = 0;
    sentenceHits.push(...dedupedSentence.values());

    // 5) 术语表自检：标签键/覆盖前缀在词库里不存在时提示，避免死条目
    const unusedLabels = [];
    for (const term of terms) {
        for (const label of term.labels || []) {
            if (!dict.byKey.has(label)) unusedLabels.push({ id: term.id, label });
        }
        for (const override of term.overrides || []) {
            const prefix = override.sectionPrefix;
            if (!prefix) continue;
            const hit = [...dict.ranges.keys()].some((section) => section.startsWith(prefix));
            if (!hit) unusedLabels.push({ id: term.id, label: `覆盖前缀 ${prefix}` });
        }
    }
    for (const rule of phrases) {
        const match = String(rule.match || '').toLowerCase();
        if (!match) continue;
        const hit = dict.entries.some((e) => !e.key.startsWith('/') && e.key.toLowerCase().startsWith(match));
        if (!hit) unusedLabels.push({ id: rule.id, label: `短语前缀 ${rule.match}` });
    }

    // 6) 基线核对
    const fpSet = new Set(violations.filter((v) => v.severity === 'error').map(fingerprint));
    const blocked = violations.filter((v) => v.severity === 'error' && !baseline.has(fingerprint(v)));
    const exempted = violations.filter((v) => v.severity === 'error' && baseline.has(fingerprint(v)));
    const warns = violations.filter((v) => v.severity === 'warn');
    const stale = [...baseline].filter((fp) => !fpSet.has(fp));

    return {
        dictPath,
        glossaryPath,
        baselinePath,
        termCount: terms.length,
        labelChecked,
        entryCount: dict.entries.length,
        violations,
        blocked,
        exempted,
        warns,
        sentenceHits,
        divergent,
        unusedLabels,
        stale,
    };
}

function parseArgs(argv) {
    const args = { all: false, updateBaseline: false, dict: null, glossary: null, baseline: null, help: false };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--all') args.all = true;
        else if (a === '--update-baseline') args.updateBaseline = true;
        else if (a === '--dict' || a === '--file') args.dict = argv[++i];
        else if (a === '--glossary') args.glossary = argv[++i];
        else if (a === '--baseline') args.baseline = argv[++i];
        else if (a === '--help' || a === '-h') args.help = true;
        else throw new Error(`未知参数: ${a}`);
    }
    return args;
}

function rel(file) {
    return path.relative(ROOT, file).split(path.sep).join('/');
}

function printViolation(v, marker = '✖') {
    const at = v.line ? `${rel(v.dictPath || DEFAULTS.dict)}:${v.line}` : v.section;
    const why = v.forbidden ? `禁用译法「${v.value}」` : `「${v.value}」`;
    const approx = v.exact === false ? '（行号近似）' : '';
    const override = v.override ? `（覆盖：${v.override}）` : '';
    console.log(`  ${marker} [${v.id}] ${v.key} → ${why}，应为「${v.expect}」  ${at}${approx}${override}`);
}

export function print(result, args = {}) {
    const dictName = rel(result.dictPath);
    console.log(`术语一致性检查 · ${dictName}`);
    console.log(`  术语 ${result.termCount} 条 / 标签检查 ${result.labelChecked} 处 / 词条 ${result.entryCount} 条\n`);

    if (result.blocked.length) {
        console.log(`✖ 新增违规 ${result.blocked.length} 处（会被 CI 阻断）`);
        for (const v of result.blocked) printViolation({ ...v, dictPath: result.dictPath });
        console.log('');
    } else {
        console.log('✔ 无新增违规\n');
    }

    if (result.exempted.length) {
        console.log(`· 基线豁免 ${result.exempted.length} 处（存量）`);
        if (args.all) {
            for (const v of result.exempted) printViolation({ ...v, dictPath: result.dictPath });
        }
    }

    if (result.warns.length) {
        console.log(`\n⚠ 待裁定 ${result.warns.length} 处（不阻断）`);
        const byId = new Map();
        for (const v of result.warns) {
            if (!byId.has(v.id)) byId.set(v.id, []);
            byId.get(v.id).push(v);
        }
        for (const [id, list] of byId) {
            console.log(`  [${id}] ${list.length} 处${list[0].note ? ' — ' + list[0].note : ''}`);
            for (const v of args.all ? list : list.slice(0, 3)) {
                printViolation({ ...v, dictPath: result.dictPath }, '⚠');
            }
            if (!args.all && list.length > 3) console.log(`    …另有 ${list.length - 3} 处（--all 查看）`);
        }
    }

    if (result.sentenceHits.length) {
        console.log(`\n⚠ 长句中的禁用译法 ${result.sentenceHits.length} 处（不阻断）`);
        for (const v of args.all ? result.sentenceHits : result.sentenceHits.slice(0, 5)) {
            const at = v.line ? `${rel(result.dictPath)}:${v.line}` : v.section;
            console.log(`  · [${v.id}] ${v.key} → 含「${v.forbidden}」  ${at}`);
        }
        if (!args.all && result.sentenceHits.length > 5) {
            console.log(`  …另有 ${result.sentenceHits.length - 5} 处（--all 查看）`);
        }
    }

    if (result.divergent.length) {
        console.log(`\n⚠ 标签分歧 ${result.divergent.length} 个键（多数派 ≥80%，候选术语）`);
        for (const d of args.all ? result.divergent : result.divergent.slice(0, 10)) {
            const detail = d.values.map((x) => `${x.value}×${x.count}`).join(' | ');
            console.log(`  · ${d.key} (${d.total})  ${detail}`);
        }
        if (!args.all && result.divergent.length > 10) {
            console.log(`  …另有 ${result.divergent.length - 10} 个（--all 查看）`);
        }
        console.log('  → 裁定后可写入 docs/terms.json，纳入阻断');
    }

    if (result.stale.length) {
        console.log(`\n· 基线中有 ${result.stale.length} 条已失效（对应条目已修正），可执行 --update-baseline 收缩`);
    }

    if (result.dictPath === DEFAULTS.dict && result.unusedLabels && result.unusedLabels.length) {
        console.log('\n⚠ 术语表中的键在词库里不存在（可能拼写有误或页面已下线）');
        for (const u of result.unusedLabels) console.log(`  · [${u.id}] ${u.label}`);
    }

    console.log('');
}

function writeBaseline(result, args) {
    const file = args.baseline ? path.resolve(args.baseline) : DEFAULTS.baseline;
    const terms = [...new Set(result.violations.filter((v) => v.severity === 'error').map(fingerprint))].sort();
    const data = {
        note: '术语检查的存量豁免清单，由 `node script/check-terms.mjs --update-baseline` 生成。只应随修正而收缩，不应手工新增。',
        terms,
    };
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`已写入基线: ${rel(file)}（${terms.length} 条）`);
}

function main(argv) {
    let args;
    try {
        args = parseArgs(argv);
    } catch (err) {
        console.error(err.message);
        process.exit(2);
    }
    if (args.help) {
        console.log('用法: node script/check-terms.mjs [--all] [--update-baseline] [--dict <file>] [--glossary <file>] [--baseline <file>]');
        return;
    }

    const result = check(args);
    print(result, args);
    if (args.updateBaseline) writeBaseline(result, args);
    process.exit(result.blocked.length ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    main(process.argv.slice(2));
}
