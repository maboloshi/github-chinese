const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadI18N() {
    const filePath = path.join(__dirname, '..', 'locals.js');
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N;
}

const I18N = loadI18N();
const zh = I18N['zh-CN'];

function orgPageGroup(pathname) {
    const match = pathname.match(I18N.conf.rePagePathOrg);
    assert.ok(match, pathname);
    return match[1];
}

test('routes custom properties and issue fields to their org settings dictionaries', () => {
    assert.equal(
        orgPageGroup('/organizations/acme/settings/custom-properties'),
        'settings/custom-properties',
    );
    assert.equal(
        orgPageGroup('/organizations/acme/settings/issue-fields'),
        'settings/issue-fields',
    );

    const customProperties = zh['orgs/settings/custom-properties'];
    const issueFields = zh['orgs/settings/issue-fields'];
    assert.equal(typeof customProperties, 'object');
    assert.equal(typeof issueFields, 'object');
    assert.ok(customProperties);
    assert.ok(issueFields);

    assert.equal(customProperties.static['Rulesets'], '规则集');
    assert.equal(
        customProperties.static['No custom properties set for this repository.'],
        '该仓库尚未设置自定义属性。',
    );
    assert.equal(issueFields.static['Issue fields'], '议题字段');
    assert.equal(
        issueFields.static['Manage issue fields for an organization.'],
        '管理组织的议题字段。',
    );
    assert.equal(issueFields.static['Member privileges'], '成员权限');
});

test('reuses Copilot sentences and org settings menu labels', () => {
    const sentence = 'Choose which repositories Coding agent should be enabled in. Coding agent will only be available where it is enabled for the repository and in the Copilot license policies.';
    const copilot = zh['orgs/settings/copilot'];

    assert.equal(copilot.static['Enable automatic code review'], '启用自动代码审查');
    assert.equal(copilot.static['Enable firewall'], '启用防火墙');
    assert.equal(copilot.static[sentence], zh['settings/copilot'].static[sentence]);
    assert.equal(
        copilot.static[sentence],
        '选择要启用编程智能体的仓库。编程智能体仅在为该仓库启用并符合 Copilot 许可证政策的情况下可用。',
    );
    assert.ok(copilot.regexp.some(([pattern]) => pattern.source.includes('repository rulesets')));

    const menu = zh['orgs-settings-menu'].static;
    assert.equal(menu['Issue fields'], '议题字段');
    assert.equal(menu['Code review'], '代码审查');
    assert.equal(menu['Internet access'], '访问互联网');
    assert.equal(menu['Runner type'], '运行器类型');
});

test('shares blocked-user duration options and the blocked-user list heading', () => {
    assert.equal(zh['settings/blocked_users'].static['For 1 day'], '1 天');
    assert.equal(zh['orgs/settings/blocked_users'].static['All blocked users'], '所有被拉黑的用户');
});

test('keeps existing org settings routes on their current dictionaries', () => {
    const routes = [
        ['/organizations/acme/settings/rules', 'settings/rules'],
        ['/organizations/acme/settings/rules/insights', 'settings/rules/insights'],
        ['/organizations/acme/settings/copilot/coding_agent', 'settings/copilot'],
        ['/organizations/acme/settings/copilot/runner_type', 'settings/copilot'],
        ['/organizations/acme/settings/actions/rules/insights', 'settings/actions/rules/insights'],
        ['/organizations/acme/settings/actions/runners', 'settings/actions'],
        ['/organizations/acme/settings/sandboxes', 'settings/sandboxes'],
        ['/organizations/acme/settings/profile', 'settings/profile'],
    ];

    for (const [pathname, group] of routes) {
        assert.equal(orgPageGroup(pathname), group, pathname);
    }

    assert.equal(zh['orgs/settings/rules/dashboard'], undefined);
});

test('does not copy fragment keys or the org settings menu onto the wrong pages', () => {
    const copilot = zh['orgs/settings/copilot'].static;

    assert.equal(copilot['General'], '常规');
    assert.equal(copilot['Enable GitHub Copilot'], '启用 GitHub Copilot');
    for (const key of ['The', 'of', 'With', 'then', 'Open']) {
        assert.equal(Object.hasOwn(copilot, key), false, key);
    }
    assert.equal(Object.hasOwn(zh['settings/blocked_users'].static, 'Publisher Verification'), false);
});

test('routes org rules insights and actions rules insights to dedicated dictionaries', () => {
    assert.equal(
        orgPageGroup('/organizations/acme/settings/rules/insights'),
        'settings/rules/insights',
    );
    assert.equal(
        orgPageGroup('/organizations/acme/settings/actions/rules/insights'),
        'settings/actions/rules/insights',
    );
    assert.equal(
        orgPageGroup('/organizations/acme/settings/rules'),
        'settings/rules',
    );
    assert.equal(
        orgPageGroup('/organizations/acme/settings/actions'),
        'settings/actions',
    );

    assert.equal(typeof zh['orgs/settings/rules/insights'], 'object');
    assert.equal(typeof zh['orgs/settings/actions/rules/insights'], 'object');
    assert.ok(I18N.conf.characterDataPage.includes('orgs/settings/rules/insights'));
    assert.ok(I18N.conf.characterDataPage.includes('orgs/settings/actions/rules/insights'));
});

test('translates rules insights filters and empty states', () => {
    const insights = zh['orgs/settings/rules/insights'].static;

    assert.equal(insights['Repository ruleset insights'], '仓库规则集洞察');
    assert.equal(insights['Filter rules insights'], '筛选规则洞察');
    assert.equal(insights['Rule status'], '规则状态');
    assert.equal(insights['All statuses'], '所有状态');
    assert.equal(insights['Time period'], '时间段');
    assert.equal(insights['Last 24 hours'], '过去 24 小时');
    assert.equal(insights['No rule evaluations matched your search'], '没有与您的搜索匹配的规则评估');
    assert.equal(insights['Rule insights search timed out'], '规则洞察搜索超时');
    assert.equal(insights["Rule insights couldn't be loaded"], '无法加载规则洞察');
    assert.equal(
        insights['Something went wrong while loading rule evaluations. Try reloading in a few moments.'],
        '加载规则评估时出现问题。请稍后重新加载。',
    );
});

test('translates rule evaluation results and shares them with actions insights', () => {
    const insights = zh['orgs/settings/rules/insights'].static;
    const actionsInsights = zh['orgs/settings/actions/rules/insights'].static;

    assert.equal(insights['All rules passed'], '所有规则均已通过');
    assert.equal(insights['Some rules did not pass'], '部分规则未通过');
    assert.equal(insights['Some rules were bypassed'], '部分规则已被旁路');
    assert.equal(insights['Evaluation timings'], '评估耗时');
    assert.equal(insights['Push rules passed'], '推送规则已通过');
    assert.equal(
        insights['The ruleset that ran for this push has changed.'],
        '本次推送运行的规则集已更改。',
    );
    assert.equal(actionsInsights['Actions ruleset insights'], 'Actions 规则集洞察');
    assert.equal(actionsInsights['Filter rules insights'], '筛选规则洞察');
});

test('keeps rules insights regexes anchored to page-specific text', () => {
    const insights = zh['orgs/settings/rules/insights'];
    const actionsInsights = zh['orgs/settings/actions/rules/insights'];
    const unrelated = ['The quick brown fox', 'Open settings', 'Pass this test'];

    for (const dict of [insights, actionsInsights]) {
        for (const text of unrelated) {
            for (const [pattern] of dict.regexp) {
                assert.equal(pattern.test(text), false, `${pattern} matched ${text}`);
            }
        }
    }
});
