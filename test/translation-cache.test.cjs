// fetchTransResult 的按页缓存：命中不重跑规则，未命中也要缓存，开发者模式绕开缓存。
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

function createHarness({ missedTerms = false } = {}) {
    const reads = new Map();
    const staticDict = new Proxy({ Hello: '你好', 'Hello 2': '你好 2' }, {
        get(target, key) {
            reads.set(key, (reads.get(key) || 0) + 1);
            return target[key];
        },
    });
    const calls = { record: 0, cleanup: 0, refresh: 0, rules: 0 };
    const pageConfig = {
        staticDict,
        regexpRules: [[/^A(\d+)$/, (match, value) => {
            calls.rules += 1;
            return `甲${value}`;
        }]],
        transCache: new Map(),
        currentPath: '/owner/repo',
    };
    const State = {
        featureSet: { enable_missedTerms: missedTerms, enable_RegExp: true },
        pageConfig,
    };
    const context = vm.createContext({
        State,
        TRANS_CACHE_LIMIT: 5000,
        MissedTermsManager: {
            record: () => { calls.record += 1; },
            cleanup: () => { calls.cleanup += 1; },
        },
        refreshMenuStates: () => { calls.refresh += 1; },
    });
    const fetchTransResult = vm.runInContext(
        `(${extractFunction('fetchTransResult')})`,
        context,
        { filename: path.join(ROOT, 'main.user.js') },
    );
    return { fetchTransResult, State, pageConfig, reads, calls };
}

test('静态词典命中后写入缓存，重复查询不再读词典', () => {
    const { fetchTransResult, reads } = createHarness();

    assert.equal(fetchTransResult('Hello'), '你好');
    assert.equal(fetchTransResult('Hello'), '你好');
    assert.equal(reads.get('Hello'), 1);
});

test('未命中结果也会缓存，避免重复跑完整条规则链', () => {
    const { fetchTransResult, calls } = createHarness();

    assert.equal(fetchTransResult('A7'), '甲7');
    assert.equal(fetchTransResult('A7'), '甲7');
    assert.equal(calls.rules, 1);

    assert.equal(fetchTransResult('not in dictionary'), false);
    assert.equal(fetchTransResult('not in dictionary'), false);
});

test('清空缓存后重新计算（正则开关切换的失效路径）', () => {
    const { fetchTransResult, State, calls } = createHarness();

    fetchTransResult('A7');
    assert.equal(calls.rules, 1);

    State.pageConfig.transCache = new Map();
    fetchTransResult('A7');
    assert.equal(calls.rules, 2);
});

test('开启未命中词条记录时绕开缓存，保证每次查询都记账', () => {
    const { fetchTransResult, reads, calls } = createHarness({ missedTerms: true });

    assert.equal(fetchTransResult('Hello'), '你好');
    assert.equal(fetchTransResult('Hello'), '你好');
    assert.equal(reads.get('Hello'), 2);
    assert.equal(calls.record, 0);
});
