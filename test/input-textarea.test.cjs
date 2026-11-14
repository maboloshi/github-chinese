// 输入框 / 文本域 / 可编辑内容：只翻 placeholder、aria-label 与按钮 value，
// 用户输入、textarea 默认值、contenteditable 正文都保持原文。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const { loadConfig } = require('./helpers/load-config.cjs');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8').replace(/\r\n/g, '\n');

const editableSelectors = [
    '[contenteditable=""]',
    '[contenteditable="true"]',
    '[contenteditable="plaintext-only"]',
];

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

test('输入框与文本域会翻译 aria-label', () => {
    const textarea = { tagName: 'TEXTAREA', type: 'textarea', ariaLabel: 'Ask anything' };
    const textInput = { tagName: 'INPUT', type: 'text', ariaLabel: 'Search' };
    const submit = { tagName: 'INPUT', type: 'submit', ariaLabel: 'Submit', dataset: { confirm: 'x' } };

    const { calls, handle } = loadHandleElementNode();
    for (const element of [textarea, textInput, submit]) {
        calls.length = 0;
        handle(element);
        assert.ok(
            calls.some(call => call.target === element && call.attr === 'ariaLabel'),
            `${element.tagName}[${element.type}] 应请求翻译 ariaLabel，实际 ${JSON.stringify(calls.map(c => c.attr))}`,
        );
    }
});

test('非按钮输入框仍然翻译 placeholder', () => {
    const element = { tagName: 'TEXTAREA', type: 'textarea', ariaLabel: 'x' };
    const { calls, handle } = loadHandleElementNode();
    handle(element);
    assert.ok(calls.some(call => call.attr === 'placeholder'));
});

test('locals.js keeps contenteditable content out of translation', () => {
    const config = loadConfig('locals.js');

    for (const selector of editableSelectors) {
        assert.ok(
            config.ignoreMutationSelectorPage['*'].includes(selector),
            `${selector} must be ignored by MutationObserver translation`,
        );
        assert.ok(
            config.ignoreSelectorPage['*'].includes(selector),
            `${selector} must be ignored during the initial DOM traversal`,
        );
    }
});

test('input / textarea 交给通用遍历，不再留在忽略表里', () => {
    const config = loadConfig('locals.js');

    for (const selector of ['input', 'textarea']) {
        assert.ok(
            !config.ignoreMutationSelectorPage['*'].includes(selector),
            `${selector} 不应再被 MutationObserver 忽略`,
        );
        assert.ok(
            !config.ignoreSelectorPage['*'].includes(selector),
            `${selector} 不应再被遍历忽略`,
        );
    }
});

test('textarea 的子文本（默认值）不会被当作文本节点翻译', () => {
    const translated = [];
    const context = vm.createContext({
        State: { pageConfig: { maxTextNodeLength: 500 } },
        transElementAttrs(node, attr) { translated.push({ node, attr }); },
    });
    vm.runInContext(`${extractFunction('handleTextNode')}
globalThis.__handleText = handleTextNode;`, context);

    const textareaDefaultValue = { length: 12, parentElement: { tagName: 'TEXTAREA' } };
    context.__handleText(textareaDefaultValue);
    assert.equal(translated.length, 0, 'textarea 的默认值属于用户内容，不能翻');

    const bodyText = { length: 12, parentElement: { tagName: 'P' } };
    context.__handleText(bodyText);
    assert.deepEqual(translated.map(call => call.attr), ['data']);
});
