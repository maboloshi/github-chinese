// 正则规则的「必然字面量」前置过滤：抽取必须安全，过滤不得改变任何翻译结果。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8');

function extractFunction(name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist`);

    let depth = 0;
    for (let index = start; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') {
            depth -= 1;
            if (depth === 0) return source.slice(start, index + 1);
        }
    }
    assert.fail(`could not extract ${name}`);
}

const getRequiredLiteral = vm.runInContext(`(${extractFunction('getRequiredLiteral')})`, vm.createContext({}));

test('必然字面量：只接受未被可选量词修饰的连续字母段', () => {
    const cases = [
        [/Successful in (\d+)s/, 'Successful'],
        [/^Settings: ([^\s/]+\/[^\s/]+)$/, 'Settings'],
        [/foobar\?/, 'foobar'],
        [/[a-z]foobar/, 'foobar'],
        [/(?:foobar)+/, 'foobar'],
        [/foo(bar)?/, null],
        [/foo|bar/, null],
        [/(?!foobar)bazqux/, null],
        [/(?=foobar)baz/, null],
        [/foobar{2}/, null],
        [/^(\d+) repositor(y|ies)/, null],
        [/foo(?=bar)/, null],
        [/foo/i, null],
    ];

    for (const [pattern, expected] of cases) {
        assert.equal(getRequiredLiteral(pattern), expected, pattern.source);
    }
});

function loadRules() {
    const context = vm.createContext({ window: {}, document: {}, console });
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'locals.js'), 'utf8'), context);
    const zh = context.I18N['zh-CN'];
    return [...zh.repository.regexp, ...zh.public.regexp];
}

function translateWithRules(text, rules) {
    for (const [pattern, replacement] of rules) {
        const result = text.replace(pattern, replacement);
        if (result !== text) return result;
    }
    return false;
}

function translateWithPrefilter(text, rules, prefilters) {
    for (let index = 0; index < rules.length; index += 1) {
        const required = prefilters[index];
        if (required && !text.includes(required)) continue;
        const [pattern, replacement] = rules[index];
        const result = text.replace(pattern, replacement);
        if (result !== text) return result;
    }
    return false;
}

test('前置过滤不改变真实词库规则链的结果', () => {
    const rules = loadRules();
    const prefilters = rules.map(([pattern]) => getRequiredLiteral(pattern));

    const corpus = new Set([
        'Successful in 3s',
        '3 successful checks',
        'Started 3 discussions in this repository in the past day',
        'maboloshi/github-chinese',
        'Pull requests',
        'Settings',
        '3,456 commits',
        'Updated 2 hours ago',
        'not in any dictionary at all',
    ]);
    const context = vm.createContext({ window: {}, document: {}, console });
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'locals.js'), 'utf8'), context);
    const zh = context.I18N['zh-CN'];
    for (const page of Object.keys(zh)) {
        for (const key of Object.keys(zh[page].static || {})) corpus.add(key);
    }

    for (const text of corpus) {
        assert.equal(
            translateWithPrefilter(text, rules, prefilters),
            translateWithRules(text, rules),
            `prefilter changed the result for: ${text}`,
        );
    }
});

test('fetchTransResult 使用 regexpPrefilters 跳过不可能命中的规则', () => {
    const context = vm.createContext({
        State: {
            featureSet: { enable_missedTerms: false, enable_RegExp: true },
            pageConfig: {
                staticDict: {},
                regexpRules: [
                    [/AlphaBeta/, '第一条'],
                    [/GammaDelta/, '第二条'],
                ],
                regexpPrefilters: ['AlphaBeta', 'GammaDelta'],
                transCache: new Map(),
                currentPath: '/owner/repo',
            },
        },
        TRANS_CACHE_LIMIT: 5000,
        MissedTermsManager: { record: () => {}, cleanup: () => {} },
        refreshMenuStates: () => {},
    });
    const fetchTransResult = vm.runInContext(`(${extractFunction('fetchTransResult')})`, context);

    assert.equal(fetchTransResult('AlphaBeta'), '第一条');
    assert.equal(fetchTransResult('GammaDelta'), '第二条');
    // 字面量缺失的规则必须被跳过；若过滤失效，这里会命中 /GammaDelta/
    assert.equal(fetchTransResult('OnlyGamma'), false);
});

test('buildPageConfig 为每条规则生成对应的前置过滤值', () => {
    assert.match(source, /regexpPrefilters:\s*regexpRules\.map\(/, 'buildPageConfig 必须生成 regexpPrefilters');
});
