const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const localeFiles = [
    'locals.js',
    'locals(greasyfork).js',
    'locals_zh-TW.js',
];

const protectedReactGlobalNavSelectors = [
    'header.GlobalNav',
    '#__primerPortalRoot__',
];

const protectedReactTraversalSelectors = [
    'header.GlobalNav [class*="Search-module__"]',
    'qbsearch-input',
    '#__primerPortalRoot__',
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
            "Pull requests": "拉取請求",
            "Discussions": "討論",
            "Actions": "操作",
            "Projects": "專案",
            "Wiki": "Wiki",
            "Security": "安全",
            "Security and quality": "安全和品質",
            "Insights": "洞察",
            "Settings": "設定",
            "Packages": "軟體包",
            "Releases": "發行版",
            "Stars": "星號",
            "Agents": "智能體",
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
            "Search code, repositories, users, issues, pull requests...": "搜尋程式碼、儲存庫、使用者、議題、拉取請求...",
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

function loadConfig(fileName) {
    const filePath = path.join(__dirname, '..', fileName);
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N.conf;
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

    assert.match(script, /function shouldIgnoreMutation/);
    assert.match(script, /ignoreMutationSelectorPage/);
    assert.match(script, /closest\?\.\(ignoreMutationSelectors\)/);
});

for (const fileName of localeFiles) {
    test(`${fileName} translates React GlobalNav labels without CSS pseudo-elements`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');
        const { labels } = expectedReactNavLabels[fileName];

        assert.match(source, /function translateReactGlobalNavLabels/);
        assert.match(source, /function resolveReactGlobalNavLabel/);
        assert.match(source, /function findStaticGlobalNavLabel/);
        assert.match(source, /function findRegexpGlobalNavLabel/);
        assert.match(source, /function translateReactGlobalNavSurface/);
        assert.match(source, /function translateReactGlobalNavAttributes/);
        assert.match(source, /function canTranslateReactGlobalNavHeader/);
        assert.match(source, /function isReactGlobalNavSurfaceIdle/);
        assert.match(source, /requireSettledHeader: true/);
        assert.match(source, /controlledSurfaceSelector/);
        assert.match(source, /searchSurfaceSelector/);
        assert.match(source, /pointerover/);
        assert.match(source, /#__primerPortalRoot__ \[role="tooltip"\]/);
        assert.match(source, /qbsearch-input/);
        assert.match(source, /placeholder/);
        assert.doesNotMatch(source, /input:not/);
        assert.match(source, /textContent = label/);

        for (const [sourceLabel, targetLabel] of Object.entries(labels)) {
            assert.ok(
                source.includes(`"${sourceLabel}": "${targetLabel}"`),
                `${fileName} should include ${sourceLabel} -> ${targetLabel}`,
            );
        }

        assert.doesNotMatch(source, /::after/);
        assert.doesNotMatch(source, /github-chinese-react-global-nav-style/);
    });

    test(`${fileName} does not translate React search widgets during early interactions`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

        assert.match(source, /const searchSurfaceSelector = 'qbsearch-input'/);
        assert.match(source, /element\.closest\?\.\(searchSurfaceSelector\)/);
        assert.match(source, /if \(!shouldSkipReactGlobalNavNode\(element\)\)/);
        assert.doesNotMatch(
            source,
            /surfaces\.push\(\.\.\.document\.querySelectorAll\(searchSurfaceSelector\)\)/,
        );
    });
}
