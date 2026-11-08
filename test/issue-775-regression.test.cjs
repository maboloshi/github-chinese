const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const messagePrefix = 'to enable two-factor authentication as an additional security measure. Your activity on GitHub includes you in this requirement. You will need to enable two-factor authentication on your account before';
const messageSuffix = ', or be restricted from account actions.';

function loadPublicRules() {
    const filePath = path.join(__dirname, '..', 'locals.js');
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N['zh-CN'].public.regexp;
}

function loadTwoFactorDeadlineRule() {
    const rule = loadPublicRules().find(([pattern]) => (
        pattern.source.includes('to enable two-factor authentication as an additional security measure')
    ));

    assert.ok(rule, 'the public dictionary should include the two-factor deadline rule');
    return rule;
}

function translateDeadline(deadline, separator = '') {
    const [pattern, replacement] = loadTwoFactorDeadlineRule();
    return `${messagePrefix}${separator}${deadline}${messageSuffix}`.replace(pattern, replacement);
}

test('translates a joined two-factor authentication deadline', () => {
    assert.equal(
        translateDeadline('2026年9月14日'),
        '启用双因素身份验证（2FA）作为额外安全措施。您在 GitHub 上的活动让您接收到此要求。您将需要在 2026年9月14日 前启用双因素身份验证，否则会被限制账户操作。',
    );
});

test('continues to translate a spaced two-factor authentication deadline', () => {
    assert.equal(
        translateDeadline('2026年9月14日', ' '),
        '启用双因素身份验证（2FA）作为额外安全措施。您在 GitHub 上的活动让您接收到此要求。您将需要在 2026年9月14日 前启用双因素身份验证，否则会被限制账户操作。',
    );
});

test('preserves a different two-factor authentication deadline', () => {
    const translated = translateDeadline('October 3, 2027');

    assert.match(translated, /October 3, 2027/);
    assert.doesNotMatch(translated, /or be restricted from account actions/);
});
