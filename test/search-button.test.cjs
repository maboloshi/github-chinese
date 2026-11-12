'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8').replace(/\r\n/g, '\n');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(ROOT, 'locals.js'), 'utf8'), context);
context.State = {
    pageConfig: { staticDict: context.I18N['zh-CN'].public.static, currentPath: 'homepage' },
    featureSet: {},
};
context.MissedTermsManager = { cleanup() {} };

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

vm.runInContext([
    'handleElementNode', 'handleTextNode', 'transElementAttrs',
    'transElementAttr', 'transText', 'fetchTransResult',
].map(extractFunction).join('\n'), context);

test('搜索按钮翻译可访问名称和分段提示，保留键盘节点并可重复处理', () => {
    const before = { data: 'Type ', length: 5 };
    const keyboard = { tagName: 'KBD', textContent: '/' };
    const after = { data: ' to search', length: 10 };
    const button = {
        tagName: 'BUTTON',
        className: 'Search-module__searchButton__xxx',
        ariaLabel: 'Open quick search dialog, type / to search',
        dataset: {},
        childNodes: [before, keyboard, after],
        set textContent(value) { assert.fail('must preserve child nodes'); },
        set innerHTML(value) { assert.fail('must preserve child nodes'); },
    };
    const children = button.childNodes;

    for (let pass = 0; pass < 2; pass += 1) {
        context.handleElementNode(button);
        context.handleTextNode(before);
        context.handleTextNode(after);
        assert.equal(button.ariaLabel, '打开快速搜索对话框，键入 / 搜索');
        assert.equal(before.data, '请键入 ');
        assert.equal(after.data, ' 去搜索');
        assert.equal(keyboard.textContent, '/');
        assert.equal(button.childNodes, children);
        [before, keyboard, after].forEach((node, index) => assert.equal(button.childNodes[index], node));
    }

    const config = context.I18N.conf;
    assert.ok(config.ignoreSelectorPage['*'].includes('KBD'));
    for (const selectors of [config.ignoreSelectorPage['*'], config.ignoreMutationSelectorPage['*']]) {
        assert.ok(!selectors.some(selector => selector.includes('Search-module__')));
    }
});

test('按钮保留未匹配的可访问名称，仍翻译已有属性和 tooltipped 名称', () => {
    for (const attrs of [{}, { ariaLabel: '' }, { ariaLabel: 'Unknown search label' }]) {
        const button = { tagName: 'BUTTON', className: '', dataset: {}, ...attrs };
        context.handleElementNode(button);
        assert.equal(button.ariaLabel, attrs.ariaLabel);
        assert.equal(Object.hasOwn(button, 'ariaLabel'), Object.hasOwn(attrs, 'ariaLabel'));
    }

    const button = {
        tagName: 'BUTTON',
        className: 'tooltipped',
        ariaLabel: 'Open quick search dialog, type / to search',
        title: 'Delete',
        cancelConfirmText: 'Cancel',
        dataset: {
            confirm: 'Delete', confirmText: 'Delete', confirmCancelText: 'Cancel',
            disableWith: 'Delete', visibleText: 'Delete',
        },
    };
    context.handleElementNode(button);
    assert.equal(button.ariaLabel, '打开快速搜索对话框，键入 / 搜索');
    assert.equal(button.title, '删除');
    assert.equal(button.cancelConfirmText, '取消');
    assert.deepEqual(button.dataset, {
        confirm: '删除', confirmText: '删除', confirmCancelText: '取消',
        disableWith: '删除', visibleText: '删除',
    });
});
