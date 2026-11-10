// #727 / #774：可编辑内容不能被自动翻译。
// input / textarea 已回归通用遍历（只翻 placeholder / aria-label），
// 这里锁住剩下的护栏：contenteditable 仍整体排除，textarea 的子文本（默认值）在文本节点处理时拦截。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8').replace(/\r\n/g, '\n');

const editableSelectors = [
    '[contenteditable=""]',
    '[contenteditable="true"]',
    '[contenteditable="plaintext-only"]',
];

function loadConfig() {
    const filePath = path.join(ROOT, 'locals.js');
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N.conf;
}

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

test('locals.js keeps contenteditable content out of translation', () => {
    const config = loadConfig();

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
    const config = loadConfig();

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
