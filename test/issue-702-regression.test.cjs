'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const { loadConfig } = require('./helpers/load-config.cjs');

// 单管线契约（2026-11 重构）：
// React GlobalNav 与 portal 不再由旁路引擎接管，改由通用 MutationObserver + 词库翻译。
// 这些断言锁的是「旁路引擎不复活」，不是实现细节。

const repoRoot = path.join(__dirname, '..');
const mainScript = fs.readFileSync(path.join(repoRoot, 'main.user.js'), 'utf8');
const config = loadConfig('locals.js');

const removalSymbols = [
    'setupReactGlobalNavTranslation',
    'isReactGlobalNavPortalNode',
    'translateReactGlobalNav',
    'reactGlobalNavLabels',
    'findStaticGlobalNavLabel',
    'scheduleReactGlobalNavTranslation',
];

test('main.user.js 不再携带 React GlobalNav 旁路引擎', () => {
    for (const symbol of removalSymbols) {
        assert.doesNotMatch(
            mainScript,
            new RegExp(`\\b${symbol}\\b`),
            `main.user.js 仍残留 ${symbol}`,
        );
    }
});

test('main.user.js 只有语言守卫与主遍历两个 MutationObserver', () => {
    const observers = mainScript.match(/new MutationObserver\(/g) || [];
    assert.equal(observers.length, 2, '除语言守卫外不应再有专属观察器');
    assert.doesNotMatch(mainScript, /__primerPortalRoot__/);
    assert.doesNotMatch(mainScript, /GlobalNav/);
});

test('面包屑标识符护栏留在通用遍历里（#824）', () => {
    assert.match(mainScript, /function isBreadcrumbIdentifierLink/);
    assert.match(mainScript, /octolytics-dimension-repository_nwo/);
    assert.match(mainScript, /FILTER_REJECT; \/\/ 跳过账号名 \/ 仓库名/);
});

test('locals.js 把 GlobalNav 与 portal 交还通用遍历', () => {
    const mutationIgnored = config.ignoreMutationSelectorPage['*'];
    const traversalIgnored = config.ignoreSelectorPage['*'];

    for (const [name, list] of [
        ['ignoreMutationSelectorPage', mutationIgnored],
        ['ignoreSelectorPage', traversalIgnored],
    ]) {
        assert.ok(!list.includes('header.GlobalNav'), `${name} 仍在跳过 GlobalNav`);
        assert.ok(!list.includes('#__primerPortalRoot__'), `${name} 仍在跳过 portal`);
    }
});

test('搜索控件仍被排除在遍历之外（#704 的护栏）', () => {
    const traversalIgnored = config.ignoreSelectorPage['*'];
    const mutationIgnored = config.ignoreMutationSelectorPage['*'];

    for (const [name, list] of [
        ['ignoreMutationSelectorPage', mutationIgnored],
        ['ignoreSelectorPage', traversalIgnored],
    ]) {
        assert.ok(
            list.includes('header.GlobalNav [class*="Search-module__"]'),
            `${name} 应继续跳过 React 头部搜索按钮`,
        );
        assert.ok(list.includes('qbsearch-input'), `${name} 应继续跳过搜索自定义元素`);
    }
});

test('locals.js 不再有独立的 GlobalNav 词表', () => {
    assert.equal(config.reactGlobalNavLabels, undefined);
    assert.doesNotMatch(
        fs.readFileSync(path.join(repoRoot, 'locals.js'), 'utf8'),
        /reactGlobalNavLabels\s*:/,
    );
});

test('GlobalNav 文案并入公共词库，仍可被通用查表命中', () => {
    const publicStatic = loadLocale('locals.js', 'zh-CN').public.static;

    const expected = {
        'Pull requests': '拉取请求',
        'Wiki': 'Wiki',
        'Billing': '账单',
        'Following': '正在关注',
        'Search suggestions': '搜索建议',
        'Branches': '分支',
        'Tags': '标签',
        'Copilot': 'GitHub Copilot',
        'Repository navigation': '仓库导航',
    };

    for (const [source, target] of Object.entries(expected)) {
        assert.equal(publicStatic[source], target, `公共词库缺少 ${source}`);
    }
});

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
