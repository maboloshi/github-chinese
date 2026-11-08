const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const { loadConfig } = require('./helpers/load-config.cjs');

const localeFiles = [
    'locals.js',
    'locals(greasyfork).js',
    'locals_zh-TW.js',
];

const protectedReactGlobalNavSelectors = [
    'header.GlobalNav',
];

const protectedReactTraversalSelectors = [
    'header.GlobalNav [class*="Search-module__"]',
    'qbsearch-input',
    '#__primerPortalRoot__',
];

const runtimeScripts = [
    'main.user.js',
    'main_zh-TW.user.js',
    'main(greasyfork).user.js',
];

const expectedReactNavLabels = {
    'locals.js': {
        labels: {
            "Overview": "概况",
            "Repositories": "仓库",
            "Code": "代码",
            "Issues": "议题",
            "Pull requests": "拉取请求",
            "Discussions": "讨论",
            "Actions": "操作",
            "Projects": "项目",
            "Wiki": "Wiki",
            "Security": "安全",
            "Security and quality": "安全和质量",
            "Insights": "洞察",
            "Settings": "设置",
            "Packages": "软件包",
            "Releases": "发行版",
            "Stars": "星标",
            "Agents": "智能体",
            "Models": "模型",
            "Set status": "状态设置",
            "Profile": "个人资料",
            "Gists": "代码片段",
            "Copilot settings": "Copilot 设置",
            "Feature preview": "功能预览",
            "Appearance": "外观",
            "Accessibility": "无障碍",
            "Try Enterprise": "试用企业版",
            "Sign out": "退出",
            "Free": "免费",
            "Type / to search": "输入 / 搜索",
            "Search code, repositories, users, issues, pull requests...": "搜索代码、仓库、用户、议题、拉取请求...",
            "Search": "搜索",
            "Clear": "清除",
            "Search syntax tips": "搜索语法提示",
            "Give feedback": "反馈",
            "Saved searches": "保存搜索",
            "Use saved searches to filter your results more quickly": "使用保存的搜索快速筛选结果",
            "Create saved search": "创建保存的搜索",
            "Provide feedback": "提供反馈",
            "Submit feedback": "提交反馈",
            "Cancel": "取消",
            "Name": "名称",
            "Query": "查询",
            "0 suggestions.": "0 条建议。",
            "People": "成员",
            "Teams": "团队",
            "Sponsoring": "赞助",
            "Followers": "关注者",
            "Following": "正在关注",
            "Activity": "活动",
            "Branches": "分支",
            "Tags": "标签",
            "Codespaces": "代码空间",
            "Dashboard": "仪表板",
            "Explore": "探索",
            "Marketplace": "市场",
            "Sponsors": "赞助者",
            "Organizations": "组织",
            "Enterprises": "企业版",
            "Billing": "账单",
            "Copilot": "GitHub Copilot",
        },
    },
    'locals(greasyfork).js': {
        labels: {
            "Overview": "概况",
            "Repositories": "仓库",
            "Code": "代码",
            "Issues": "议题",
            "Pull requests": "拉取请求",
            "Discussions": "讨论",
            "Actions": "操作",
            "Projects": "项目",
            "Wiki": "Wiki",
            "Security": "安全",
            "Security and quality": "安全和质量",
            "Insights": "洞察",
            "Settings": "设置",
            "Packages": "软件包",
            "Releases": "发行版",
            "Stars": "星标",
            "Agents": "智能体",
            "Models": "模型",
            "Set status": "状态设置",
            "Profile": "个人资料",
            "Gists": "代码片段",
            "Copilot settings": "Copilot 设置",
            "Feature preview": "功能预览",
            "Appearance": "外观",
            "Accessibility": "无障碍",
            "Try Enterprise": "试用企业版",
            "Sign out": "退出",
            "Free": "免费",
            "Type / to search": "输入 / 搜索",
            "Search code, repositories, users, issues, pull requests...": "搜索代码、仓库、用户、议题、拉取请求...",
            "Search": "搜索",
            "Clear": "清除",
            "Search syntax tips": "搜索语法提示",
            "Give feedback": "反馈",
            "Saved searches": "保存搜索",
            "Use saved searches to filter your results more quickly": "使用保存的搜索快速筛选结果",
            "Create saved search": "创建保存的搜索",
            "Provide feedback": "提供反馈",
            "Submit feedback": "提交反馈",
            "Cancel": "取消",
            "Name": "名称",
            "Query": "查询",
            "0 suggestions.": "0 条建议。",
            "People": "成员",
            "Teams": "团队",
            "Sponsoring": "赞助",
            "Followers": "关注者",
            "Following": "正在关注",
            "Activity": "活动",
            "Branches": "分支",
            "Tags": "标签",
            "Codespaces": "代码空间",
            "Dashboard": "仪表板",
            "Explore": "探索",
            "Marketplace": "市场",
            "Sponsors": "赞助者",
            "Organizations": "组织",
            "Enterprises": "企业版",
            "Billing": "账单",
            "Copilot": "GitHub Copilot",
        },
    },
    'locals_zh-TW.js': {
        labels: {
            "Overview": "概況",
            "Repositories": "儲存庫",
            "Code": "程式碼",
            "Issues": "議題",
            "Pull requests": "合併請求",
            "Discussions": "討論",
            "Actions": "操作",
            "Projects": "專案",
            "Wiki": "Wiki",
            "Security": "安全",
            "Security and quality": "安全和質量",
            "Insights": "分析",
            "Settings": "設置",
            "Packages": "軟件包",
            "Releases": "發行版本",
            "Stars": "星號",
            "Agents": "AI 代理",
            "Models": "模型",
            "Set status": "狀態設置",
            "Profile": "個人資料",
            "Gists": "程式碼片段",
            "Copilot settings": "Copilot 設置",
            "Feature preview": "功能預覽",
            "Appearance": "外觀",
            "Accessibility": "無障礙",
            "Try Enterprise": "試用企業版",
            "Sign out": "退出",
            "Free": "免費",
            "Type / to search": "輸入 / 搜尋",
            "Search code, repositories, users, issues, pull requests...": "搜尋程式碼、儲存庫、用戶、議題、合併請求...",
            "Search": "搜尋",
            "Clear": "清除",
            "Search syntax tips": "搜尋語法提示",
            "Give feedback": "回饋",
            "Saved searches": "保存搜尋",
            "Use saved searches to filter your results more quickly": "使用保存的搜尋快速篩選結果",
            "Create saved search": "創建保存的搜尋",
            "Provide feedback": "提供回饋",
            "Submit feedback": "提交回饋",
            "Cancel": "取消",
            "Name": "名稱",
            "Query": "查詢",
            "0 suggestions.": "0 條建議。",
            "People": "成員",
            "Teams": "團隊",
            "Sponsoring": "贊助",
            "Followers": "追蹤者",
            "Following": "正在追蹤",
            "Activity": "活動",
            "Branches": "分支",
            "Tags": "標籤",
            "Codespaces": "程式碼空間",
            "Dashboard": "儀表板",
            "Explore": "探索",
            "Marketplace": "市場",
            "Sponsors": "贊助者",
            "Organizations": "組織",
            "Enterprises": "企業版",
            "Billing": "帳單",
            "Copilot": "GitHub Copilot",
        },
    },
};

function loadLocale(fileName, localeName) {
    const filePath = path.join(__dirname, '..', fileName);
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N[localeName];
}

function translateWithRules(source, rules) {
    for (const [pattern, replacement] of rules) {
        const result = source.replace(pattern, replacement);
        if (result !== source) return result;
    }

    return source;
}

function loadRuntimeFunction(fileName, functionName, document) {
    const filePath = path.join(__dirname, '..', fileName);
    const source = fs.readFileSync(filePath, 'utf8');
    const start = source.indexOf(`    function ${functionName}(`);
    const nextFunction = source.slice(start + 1).search(/\r?\n\r?\n    function /);
    const end = nextFunction === -1 ? -1 : start + 1 + nextFunction;
    assert.notEqual(start, -1, `${functionName} should exist in ${fileName}`);
    assert.notEqual(end, -1, `${functionName} should be followed by another runtime function`);

    const context = vm.createContext({ document });
    return vm.runInContext(`(${source.slice(start, end).trim()})`, context, {
        filename: filePath,
    });
}

for (const fileName of localeFiles) {
    test(`${fileName} keeps React global navigation out of generic DOM traversal`, () => {
        const config = loadConfig(fileName);
        const mutationSelectors = config.ignoreMutationSelectorPage['*'];
        const traversalSelectors = config.ignoreSelectorPage['*'];

        for (const selector of protectedReactGlobalNavSelectors) {
            assert.ok(
                mutationSelectors.includes(selector),
                `${selector} must be ignored by MutationObserver translation`,
            );
            assert.ok(
                traversalSelectors.includes(selector),
                `${selector} must be ignored during the initial DOM traversal`,
            );
        }

        assert.ok(
            !mutationSelectors.includes('#__primerPortalRoot__'),
            'Shared Primer portals must remain available to page-specific MutationObserver translation',
        );
        assert.ok(
            traversalSelectors.includes('#__primerPortalRoot__'),
            'Initial traversal should still avoid an already-open Primer portal',
        );

        for (const selector of protectedReactTraversalSelectors) {
            assert.ok(
                traversalSelectors.includes(selector),
                `${selector} must be ignored during the initial DOM traversal`,
            );
        }

        assert.ok(
            !mutationSelectors.includes('[class*="Search-module__"]'),
            'React Search-module classes must not be ignored globally because repository and search pages reuse them',
        );
        assert.ok(
            !traversalSelectors.includes('[class*="Search-module__"]'),
            'React Search-module classes must not be skipped outside GlobalNav',
        );

        assert.equal(config.reactGlobalNavStyle, undefined);
    });

    test(`${fileName} keeps old traversal away from React GlobalNav internals`, () => {
        const config = loadConfig(fileName);

        assert.equal(
            config.reIgnoreClass.test('GlobalNav styles-module__appHeader__YzYWk'),
            true,
            'Legacy traversal should skip the React global navigation before it is hydrated',
        );
        assert.equal(
            config.reIgnoreClass.test('Search-module__SearchContainer__O_2rw'),
            false,
            'Repository and search page React search modules should remain translatable',
        );
        assert.ok(
            config.reIgnoreTag.includes('QBSEARCH-INPUT'),
            'Legacy traversal should skip the hidden search custom element subtree',
        );
        assert.equal(
            config.reIgnoreId.test('__primerPortalRoot__'),
            true,
            'Legacy traversal should skip Primer portal roots',
        );
    });
}

test('main(greasyfork).user.js skips GlobalNav mutation updates for the legacy script', () => {
    const script = fs.readFileSync(path.join(__dirname, '..', 'main(greasyfork).user.js'), 'utf8');

    assert.match(script, /function shouldIgnoreMutationNode/);
    assert.match(script, /ignoreMutationSelectorPage/);
    assert.match(script, /closest\?\.\(ignoreMutationSelectors\)/);
    assert.match(script, /isReactGlobalNavPortalNode/);
    assert.match(script, /addedNodes\.forEach/);
});

for (const scriptName of runtimeScripts) {
    test(`${scriptName} owns the React GlobalNav runtime patch`, () => {
        const script = fs.readFileSync(path.join(__dirname, '..', scriptName), 'utf8');

        assert.match(script, /function setupReactGlobalNavTranslation/);
        assert.ok(
            script.match(/\bsetupReactGlobalNavTranslation\(\)/g)?.length >= 2,
            'The runtime patch must be defined and started during script initialization',
        );
        assert.match(script, /function translateReactGlobalNavLabels/);
        assert.match(script, /function resolveReactGlobalNavLabel/);
        assert.match(script, /function findStaticGlobalNavLabel/);
        assert.match(script, /function findRegexpGlobalNavLabel/);
        assert.match(script, /match\[0\] !== source/);
        assert.match(script, /function translateReactGlobalNavSurface/);
        assert.match(script, /function translateReactGlobalNavAttributes/);
        assert.match(script, /function canTranslateReactGlobalNavHeader/);
        assert.match(script, /function isReactGlobalNavSurfaceIdle/);
        assert.match(script, /function isReactGlobalNavSearchPortal/);
        assert.match(script, /function startReactGlobalNavTranslation/);
        assert.match(
            script,
            /function startReactGlobalNavTranslation\(\) \{\s*observeReactGlobalNav\(\);\s*scheduleReactGlobalNavSeries\(\);/s,
        );
        assert.match(
            script,
            /isReactGlobalNavSearchPortal\(surface\) && !isReactGlobalNavSurfaceIdle\('portal'\)/,
        );
        assert.match(script, /requireSettledHeader: true/);
        assert.match(script, /controlledSurfaceSelector/);
        assert.match(script, /searchSurfaceSelector/);
        assert.match(script, /pointerover/);
        assert.match(script, /#__primerPortalRoot__ \[role="tooltip"\]/);
        assert.match(script, /\.filter\(isReactGlobalNavPortalNode\)/);
        assert.match(script, /I18N\.conf\.reactGlobalNavLabels/);
        assert.match(script, /qbsearch-input/);
        assert.match(script, /placeholder/);
        assert.match(script, /element\.closest\?\.\(searchSurfaceSelector\)/);
        assert.match(script, /if \(!shouldSkipReactGlobalNavNode\(element\)\)/);
        assert.doesNotMatch(
            script,
            /surfaces\.push\(\.\.\.document\.querySelectorAll\(searchSurfaceSelector\)\)/,
        );
        assert.doesNotMatch(script, /input:not/);
        assert.match(script, /textContent = label/);
        assert.match(script, /function shouldIgnoreMutationNode/);
        assert.match(script, /function isReactGlobalNavPortalNode/);
        assert.doesNotMatch(
            script,
            /closest\?\.\(State\.pageConfig\.ignoreMutationSelectors\)/,
            'Mutation routing must use the shared node-level ownership check',
        );
    });
}

for (const fileName of localeFiles) {
    test(`${fileName} only stores React GlobalNav configuration and labels`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');
        const config = loadConfig(fileName);
        const { labels } = expectedReactNavLabels[fileName];

        assert.ok(config.reactGlobalNavLabels);
        assert.doesNotMatch(source, /setupReactGlobalNavTranslation/);
        assert.doesNotMatch(source, /function translateReactGlobalNav/);
        assert.doesNotMatch(source, /function isReactGlobalNavPortalNode/);
        assert.doesNotMatch(source, /new MutationObserver/);

        for (const [sourceLabel, targetLabel] of Object.entries(labels)) {
            assert.equal(
                config.reactGlobalNavLabels[sourceLabel],
                targetLabel,
                `${fileName} should retain ${sourceLabel} -> ${targetLabel}`,
            );
        }

        assert.doesNotMatch(source, /::after/);
        assert.doesNotMatch(source, /github-chinese-react-global-nav-style/);
    });

}

for (const scriptName of runtimeScripts) {
    test(`${scriptName} distinguishes page portals from GlobalNav-owned portals`, () => {
        let headerOwned = false;
        let activeHeader = false;
        const trigger = {
            closest(selector) {
                return selector === 'header.GlobalNav' && headerOwned ? {} : null;
            },
        };
        const labelledMenu = {
            getAttribute(attribute) {
                return attribute === 'aria-labelledby' ? 'portal-trigger' : null;
            },
        };
        const portalRoot = {};
        const portal = {
            id: '',
            closest(selector) {
                return selector === '[data-component="Portal"]' ? portal : null;
            },
            getAttribute() {
                return null;
            },
            matches(selector) {
                return selector.includes('[role="menu"]');
            },
            querySelector(selector) {
                return selector === '[data-component="Portal"]' ? portal : null;
            },
            querySelectorAll(selector) {
                if (selector === '[id]') return [];
                return selector.includes('aria-labelledby') ? [labelledMenu] : [];
            },
        };
        const node = {
            nodeType: 1,
            parentElement: null,
            closest(selector) {
                if (selector === '#__primerPortalRoot__') return portalRoot;
                if (selector === '[data-component="Portal"]') return portal;
                return null;
            },
            querySelector() {
                return portal;
            },
        };
        const document = {
            activeElement: {
                closest(selector) {
                    return selector.includes('header.GlobalNav') && activeHeader ? {} : null;
                },
            },
            getElementById(id) {
                return id === 'portal-trigger' ? trigger : null;
            },
            querySelectorAll() {
                return [];
            },
        };
        const isReactGlobalNavPortalNode = loadRuntimeFunction(
            scriptName,
            'isReactGlobalNavPortalNode',
            document,
        );

        assert.equal(isReactGlobalNavPortalNode(node), false);
        activeHeader = true;
        assert.equal(isReactGlobalNavPortalNode(node), true);
        activeHeader = false;
        headerOwned = true;
        assert.equal(isReactGlobalNavPortalNode(node), true);
    });
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
