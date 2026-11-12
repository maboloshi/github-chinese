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
        ['/organizations/acme/settings/rules/insights', 'settings/rules'],
        ['/organizations/acme/settings/copilot/coding_agent', 'settings/copilot'],
        ['/organizations/acme/settings/copilot/runner_type', 'settings/copilot'],
        ['/organizations/acme/settings/actions/rules/insights', 'settings/actions'],
        ['/organizations/acme/settings/actions/runners', 'settings/actions'],
        ['/organizations/acme/settings/sandboxes', 'settings/sandboxes'],
        ['/organizations/acme/settings/profile', 'settings/profile'],
    ];

    for (const [pathname, group] of routes) {
        assert.equal(orgPageGroup(pathname), group, pathname);
    }

    assert.equal(zh['orgs/settings/rules/insights'], undefined);
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
