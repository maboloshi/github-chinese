// #793 / #801：仪表板 Copilot 聊天输入框的无障碍名称（aria-label）要跟着翻译
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

function loadLocale(fileName, localeName) {
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync(path.join(ROOT, fileName), 'utf8'), context);
    return context.I18N[localeName];
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

test('仪表板词库收录完整 Copilot 无障碍名称', () => {
    const locale = loadLocale('locals.js', 'zh-CN');
    assert.equal(
        locale['page-dashboard'].static['Ask anything or type @ to add context with Copilot'],
        '询问任何问题或输入 @ 以通过 Copilot 添加上下文',
    );
    // 旧短文案仍在，避免回退
    assert.equal(
        locale['page-dashboard'].static['Ask anything or type @ to add context'],
        '询问任何问题或输入 @ 来添加上下文',
    );
});
