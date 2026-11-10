// 输入框的 placeholder / aria-label 现在由通用遍历的 INPUT / TEXTAREA 分支负责：
// React 搜索框（portal 里的文本 input）与普通 input 走同一条管线，不再有旁路补翻。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8').replace(/\r\n/g, '\n');

function extractFunction(name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist`);
    const bodyStart = source.indexOf('{', start);
    let depth = 0;
    for (let index = bodyStart; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') depth -= 1;
        if (depth === 0) return source.slice(start, index + 1);
    }
    assert.fail(`could not extract ${name}`);
}

function loadHandleElementNode() {
    const calls = [];
    const context = vm.createContext({
        calls,
        transElementAttrs(target, attrs) {
            for (const attr of Array.isArray(attrs) ? attrs : [attrs]) {
                calls.push({ target: target === undefined ? 'undefined' : target, attr });
            }
        },
        transTimeElement() {},
    });
    vm.runInContext(`${extractFunction('handleElementNode')}
globalThis.__handle = handleElementNode;`, context);
    return { calls, handle: element => context.__handle(element) };
}

test('main.user.js 不再携带输入框旁路补翻', () => {
    for (const symbol of ['transInputAttributes', 'translateInputAccessibleName', 'INPUT_LABEL_ATTRS']) {
        assert.doesNotMatch(source, new RegExp(`\\b${symbol}\\b`), `仍残留 ${symbol}`);
    }
});

test('React 搜索框（文本 input）翻 placeholder 与 aria-label，不碰 value', () => {
    const input = {
        tagName: 'INPUT',
        type: 'text',
        placeholder: 'Search or jump to...',
        ariaLabel: 'Search or jump to',
        value: '',
        dataset: {},
    };
    const { calls, handle } = loadHandleElementNode();
    handle(input);

    const attrs = calls.filter(call => call.target === input).map(call => call.attr);
    assert.deepEqual(attrs, ['ariaLabel', 'placeholder']);
    assert.ok(!attrs.includes('value'), '文本输入框的 value 是用户输入，不能翻');
});

test('button / submit / reset 类 input 仍翻 value 与 data-confirm', () => {
    const input = {
        tagName: 'INPUT',
        type: 'submit',
        value: 'Delete',
        ariaLabel: 'Delete',
        dataset: { confirm: 'Are you sure?' },
    };
    const { calls, handle } = loadHandleElementNode();
    handle(input);

    const attrs = calls.map(call => call.attr);
    assert.ok(attrs.includes('ariaLabel'));
    assert.ok(attrs.includes('value'));
    assert.ok(calls.some(call => call.target === input.dataset && call.attr === 'confirm'));
});

test('textarea 翻 placeholder / aria-label', () => {
    const textarea = { tagName: 'TEXTAREA', type: 'textarea', placeholder: 'Leave a comment', ariaLabel: 'Comment' };
    const { calls, handle } = loadHandleElementNode();
    handle(textarea);

    assert.deepEqual(calls.filter(call => call.target === textarea).map(call => call.attr), ['ariaLabel', 'placeholder']);
});

test('新增的 input 由通用 mutation 管线遍历，无需单独补翻', () => {
    const traversed = [];
    const context = vm.createContext({
        Node: { ELEMENT_NODE: 1, TEXT_NODE: 3 },
        State: { pageConfig: { characterData: false } },
        CONFIG: { DEV: false },
        shouldIgnoreMutationNode: () => false,
        traverseNode: node => traversed.push(node),
        console: { log() {} },
    });
    vm.runInContext(`${extractFunction('processMutations')}
globalThis.__process = processMutations;`, context);

    const input = { tagName: 'INPUT', nodeName: 'INPUT', parentElement: null };
    context.__process([
        { type: 'childList', target: {}, addedNodes: [input] },
        { type: 'attributes', target: input, attributeName: 'placeholder', addedNodes: [] },
    ]);

    assert.deepEqual(traversed, [input], '新增与属性变化合并后只遍历一次');
});
