// 词条回归：贡献者时间段、提交菜单底部、仪表板 Copilot 输入框文案。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const repoRoot = path.join(__dirname, '..');

function loadLocale(fileName, localeName) {
    const filePath = path.join(repoRoot, fileName);
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, { filename: filePath });
    return context.I18N[localeName];
}

function translateWithRules(text, rules) {
    for (const [pattern, replacement] of rules) {
        const result = text.replace(pattern, replacement);
        if (result !== text) return result;
    }
    return text;
}

test('Simplified Chinese contributor periods use the page-specific full phrase rule', () => {
    const locale = loadLocale('locals.js', 'zh-CN');
    const rules = locale['repository/graphs/contributors'].regexp;

    assert.equal(translateWithRules('Last 6 months', rules), '最后 6 个月');
    assert.equal(translateWithRules('Last 12 months', rules), '最后 12 个月');
    assert.equal(translateWithRules('Last 24 months', rules), '最后 24 个月');
});

test('Traditional Chinese contributor periods use the page-specific full phrase rule', () => {
    const locale = loadLocale('locals_zh-TW.js', 'zh-TW');
    const rules = locale['repository/graphs/contributors'].regexp;

    assert.equal(translateWithRules('Last 6 months', rules), '最後 6 個月');
    assert.equal(translateWithRules('Last 12 months', rules), '最後 12 個月');
    assert.equal(translateWithRules('Last 24 months', rules), '最後 24 個月');
});

for (const [fileName, localeName, expected] of [
    ['locals.js', 'zh-CN', '查看所有用户的提交'],
    ['locals(greasyfork).js', 'zh-CN', '查看所有用户的提交'],
    ['locals_zh-TW.js', 'zh-TW', '查看所有用戶的提交'],
]) {
    test(`${fileName} retains the commits menu footer translation`, () => {
        const locale = loadLocale(fileName, localeName);

        assert.equal(
            locale['repository/commit'].static['View commits for all users'],
            expected,
        );
    });
}

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
