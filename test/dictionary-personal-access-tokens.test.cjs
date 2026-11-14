// #590：新建精细化个人访问令牌的权限区、删除对话框与权限预览。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const repoRoot = path.join(__dirname, '..');
const mainScriptPath = path.join(repoRoot, 'main.user.js');
const mainSource = fs.readFileSync(mainScriptPath, 'utf8');
const fixture = JSON.parse(fs.readFileSync(
    path.join(__dirname, 'fixtures', 'personal-access-tokens', 'permissions-page.json'),
    'utf8',
));

function loadI18N() {
    const localePath = path.join(repoRoot, 'locals.js');
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync(localePath, 'utf8'), context, { filename: localePath });
    return context.I18N;
}

function extractFunction(name) {
    const start = mainSource.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist`);

    const bodyStart = mainSource.indexOf('{', start);
    let depth = 0;
    for (let index = bodyStart; index < mainSource.length; index += 1) {
        if (mainSource[index] === '{') depth += 1;
        if (mainSource[index] === '}') depth -= 1;
        if (depth === 0) return mainSource.slice(start, index + 1);
    }
    assert.fail(`could not extract ${name}`);
}

const I18N = loadI18N();
const locale = I18N['zh-CN'];
const page = locale[fixture.pageType];

function translate(text) {
    const staticResult = page.static[text];
    if (typeof staticResult === 'string') return staticResult;

    for (const [pattern, replacement] of [...page.regexp, ...locale.public.regexp]) {
        const result = text.replace(pattern, replacement);
        if (result !== text) return result;
    }
    return text;
}

test('权限页固定文案覆盖账户权限空状态与删除令牌对话框', () => {
    for (const { input, expected } of fixture.static) {
        assert.equal(translate(input), expected, input);
    }
});

test('有效期下拉与权限预览正则按当前文案翻译', () => {
    for (const { input, expected } of fixture.regexp) {
        assert.equal(translate(input), expected, input);
    }
});

test('权限预览长句不再被 500 字符文本节点上限拦截', () => {
    const { input, expected } = fixture.longPreview;

    assert.ok(input.length > 500, `preview length: ${input.length}`);
    assert.ok(
        I18N.conf.maxTextNodeLengthPage[fixture.pageType] > input.length,
        'page limit should allow the preview text node',
    );
    assert.equal(translate(input), expected);
});

test('buildPageConfig 为权限页启用 characterData 与页面级文本长度上限', () => {
    const context = vm.createContext({
        I18N,
        CONFIG: { LANG: 'zh-CN' },
        window: { location: { pathname: '/settings/personal-access-tokens/new' } },
    });
    const buildPageConfig = vm.runInContext(
        `(${extractFunction('buildPageConfig')})`,
        context,
        { filename: mainScriptPath },
    );

    const config = buildPageConfig(fixture.pageType);
    assert.equal(config.characterData, true);
    assert.equal(
        config.maxTextNodeLength,
        I18N.conf.maxTextNodeLengthPage[fixture.pageType],
    );
});

test('handleTextNode 使用页面级上限，其他页面仍保持 500 字符限制', () => {
    function loadHandleTextNode(maxTextNodeLength) {
        const calls = [];
        const context = vm.createContext({
            State: { pageConfig: { maxTextNodeLength } },
            transElementAttrs(node, attr) {
                calls.push({ node, attr });
            },
        });
        const handleTextNode = vm.runInContext(
            `(${extractFunction('handleTextNode')})`,
            context,
            { filename: mainScriptPath },
        );
        return { handleTextNode, calls };
    }

    const longNode = {
        length: fixture.longPreview.input.length,
        parentElement: null,
    };

    const permissionPage = loadHandleTextNode(
        I18N.conf.maxTextNodeLengthPage[fixture.pageType],
    );
    permissionPage.handleTextNode(longNode);
    assert.equal(permissionPage.calls.length, 1);
    assert.equal(permissionPage.calls[0].attr, 'data');

    const otherPage = loadHandleTextNode(500);
    otherPage.handleTextNode(longNode);
    assert.equal(otherPage.calls.length, 0, 'default pages must keep the guard');

    // 文本域的默认值仍是用户内容，不受页面级上限影响（#727）
    const textareaNode = {
        length: 10,
        parentElement: { tagName: 'TEXTAREA' },
    };
    permissionPage.handleTextNode(textareaNode);
    assert.equal(permissionPage.calls.length, 1);
});
