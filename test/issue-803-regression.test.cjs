'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const repoRoot = path.join(__dirname, '..');
const fixtureDir = path.join(__dirname, 'fixtures', 'issue-803');

const runtimeScripts = [
    'main.user.js',
    'main(nju.edu).user.js',
    'main_zh-TW.user.js',
    'main(greasyfork).user.js',
];

function extractFunction(source, functionName) {
    const start = source.indexOf(`    function ${functionName}(`);
    assert.notEqual(start, -1, `${functionName} should exist in the userscript`);

    let depth = 0;
    for (let i = start; i < source.length; i += 1) {
        if (source[i] === '{') depth += 1;
        if (source[i] === '}') {
            depth -= 1;
            if (depth === 0) return source.slice(start, i + 1).trim();
        }
    }
    assert.fail(`${functionName} body should be balanced`);
}

function extractConst(source, constName) {
    const start = source.indexOf(`    const ${constName} = new Set([`);
    assert.notEqual(start, -1, `${constName} should exist in the userscript`);

    const end = source.indexOf('\n    ]);', start);
    assert.notEqual(end, -1, `${constName} body should be balanced`);
    return source.slice(start, end + '\n    ]);'.length);
}

function parseFixture(fileName) {
    const html = fs.readFileSync(path.join(fixtureDir, fileName), 'utf8');
    const metas = {};

    for (const match of html.matchAll(/<meta\b([^>]*)>/g)) {
        const attributes = match[1];
        const name = attributes.match(/\bname="([^"]+)"/)?.[1];
        const content = attributes.match(/\bcontent="([^"]*)"/)?.[1] ?? '';
        if (name) metas[name] = content;
    }

    const className = html.match(/<body\b[^>]*\bclass="([^"]*)"/)?.[1] || '';
    return {
        metas,
        bodyClasses: className.split(/\s+/).filter(Boolean),
    };
}

function createDocument(fixture) {
    function queryMeta(selector) {
        const name = selector.match(/^meta\[name="([^"]+)"\]$/)?.[1];
        if (!name || !Object.hasOwn(fixture.metas, name)) return null;
        return { content: fixture.metas[name] };
    }

    return {
        head: { querySelector: queryMeta },
        body: {
            classList: {
                contains: (name) => fixture.bodyClasses.includes(name),
            },
            className: fixture.bodyClasses.join(' '),
        },
        querySelector: queryMeta,
        getElementsByName(name) {
            return Object.hasOwn(fixture.metas, name)
                ? [{ content: fixture.metas[name] }]
                : [];
        },
    };
}

function loadI18N(context, fileName) {
    vm.runInContext(
        fs.readFileSync(path.join(repoRoot, fileName), 'utf8'),
        context,
        { filename: fileName },
    );
}

function detectPageType(fileName, fixture, href) {
    const source = fs.readFileSync(path.join(repoRoot, fileName), 'utf8');
    const context = vm.createContext({
        console,
        URL,
        URLSearchParams,
        window: { location: { href } },
        document: createDocument(fixture),
        CONFIG: {
            PAGE_MAP: { 'github.com': 'github' },
            SPECIAL_SITES: [],
            LANG: 'zh-CN',
        },
    });
    loadI18N(context, 'locals.js');
    vm.runInContext(
        `${extractConst(source, 'RESERVED_ROOTS')}\n${extractFunction(source, 'isFallbackRepositoryPath')}`,
        context,
        { filename: fileName },
    );

    return vm.runInContext(
        `(${extractFunction(source, 'detectPageType')})`,
        context,
        { filename: fileName },
    )();
}

function getGreasyforkPage(fixture, href) {
    const fileName = 'main(greasyfork).user.js';
    const source = fs.readFileSync(path.join(repoRoot, fileName), 'utf8');
    const context = vm.createContext({
        console,
        location: new URL(href),
        document: createDocument(fixture),
        lang: 'zh-CN',
    });
    loadI18N(context, 'locals(greasyfork).js');

    return vm.runInContext(
        `(${extractFunction(source, 'getPage')})`,
        context,
        { filename: fileName },
    )();
}

const loggedInHome = parseFixture('logged-in-home.html');
const loggedOutHome = parseFixture('logged-out-home.html');
const loggedInRepo = parseFixture('logged-in-repo.html');

for (const fileName of runtimeScripts) {
    test(`${fileName} detects login from user-login meta without the logged-in body class`, () => {
        const source = fs.readFileSync(path.join(repoRoot, fileName), 'utf8');
        assert.match(source, /meta\[name="user-login"\]/);
        assert.match(source, /logged-in/);
    });
}

for (const fileName of ['main.user.js', 'main(nju.edu).user.js', 'main_zh-TW.user.js']) {
    test(`${fileName} classifies the logged-in home as dashboard`, () => {
        assert.equal(
            detectPageType(fileName, loggedInHome, 'https://github.com/'),
            'dashboard',
        );
    });

    test(`${fileName} keeps the logged-out home as homepage`, () => {
        assert.equal(
            detectPageType(fileName, loggedOutHome, 'https://github.com/'),
            'homepage',
        );
    });
}

for (const fileName of ['main.user.js', 'main(nju.edu).user.js']) {
    test(`${fileName} classifies the issue #803 repository page without analytics-location`, () => {
        assert.equal(
            detectPageType(fileName, loggedInRepo, 'https://github.com/GopeedLab/gopeed'),
            'repository',
        );
    });
}

test('main(greasyfork).user.js classifies the logged-in home as page-dashboard', () => {
    assert.equal(getGreasyforkPage(loggedInHome, 'https://github.com/'), 'page-dashboard');
    assert.equal(getGreasyforkPage(loggedOutHome, 'https://github.com/'), 'homepage');
});

test('dashboard dictionary covers the logged-in home content that homepage does not', () => {
    const context = vm.createContext({});
    loadI18N(context, 'locals.js');
    const zh = context.I18N['zh-CN'];

    assert.equal(zh.dashboard.static['Agent sessions'], '智能体会话');
    assert.equal(zh.homepage.static['Agent sessions'], undefined);
    assert.equal(zh.repository.static['Latest commit'], '最新提交');
    assert.equal(zh.repository.static['Folders and files'], '文件夹和文件');
});
