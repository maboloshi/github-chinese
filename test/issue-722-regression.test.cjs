'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const FIXTURE_PATH = path.join(__dirname, 'fixtures', 'issue-722', 'actions-sidebar-disabled.html');
const RUNTIME_SCRIPTS = [
    'main.user.js',
    'main(nju.edu).user.js',
    'main_zh-TW.user.js',
    'main(greasyfork).user.js',
];
const TRAILING_VISUAL_SELECTOR = '[class*="TrailingVisual__"]';

function read(relativePath) {
    return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function extractFunction(source, functionName) {
    const start = source.indexOf(`    function ${functionName}(`);
    assert.notEqual(start, -1, `${functionName} should exist in the userscript`);

    const bodyStart = source.indexOf('{', start);
    let depth = 0;
    for (let index = bodyStart; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') depth -= 1;
        if (depth === 0) return source.slice(start, index + 1);
    }

    assert.fail(`could not extract ${functionName} from the userscript`);
}

function extractStyleBlock(source) {
    for (const match of source.matchAll(/`([^`]*)`/g)) {
        if (match[1].includes(TRAILING_VISUAL_SELECTOR)) return match[1];
    }
    assert.fail(`no style block targets ${TRAILING_VISUAL_SELECTOR}`);
}

function parseRule(css, selector) {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
    if (!match) return null;

    const declarations = {};
    for (const declaration of match[1].split(';')) {
        const separator = declaration.indexOf(':');
        if (separator === -1) continue;
        declarations[declaration.slice(0, separator).trim()] = declaration.slice(separator + 1).trim();
    }
    return declarations;
}

function loadTranslator() {
    const context = vm.createContext({});
    vm.runInContext(read('locals.js'), context, { filename: 'locals.js' });

    const dictionaries = context.I18N['zh-CN'];
    const page = dictionaries['repository/actions'];
    const state = {
        pageConfig: {
            staticDict: { ...dictionaries.public.static, ...page.static },
            regexpRules: [],
            currentPath: '/maboloshi/github-chinese/actions',
        },
        featureSet: { enable_RegExp: false, enable_missedTerms: false },
    };

    const source = read('main.user.js');
    const functions = ['transText', 'fetchTransResult']
        .map((functionName) => extractFunction(source, functionName))
        .join('\n\n');

    return vm.runInContext(
        `(function () {\n${functions}\nreturn transText;\n})()`,
        vm.createContext({
            State: state,
            MissedTermsManager: { cleanup() {}, record() {} },
            refreshMenuStates() {},
        }),
        { filename: 'main.user.js' },
    );
}

function estimateRowHeight(statusText, whiteSpace) {
    const lineHeight = 19.5;
    const minRowHeight = 32;
    const statusColumnWidth = 16;
    const cjkGlyphWidth = 15;

    const textWidth = [...statusText].length * cjkGlyphWidth;
    const lines = whiteSpace === 'nowrap'
        ? 1
        : Math.max(1, Math.ceil(textWidth / statusColumnWidth));
    return Math.max(minRowHeight, lines * lineHeight);
}

for (const fileName of RUNTIME_SCRIPTS) {
    test(`${fileName} keeps the Actions sidebar trailing status on one line`, () => {
        const css = extractStyleBlock(read(fileName));
        const rule = parseRule(css, TRAILING_VISUAL_SELECTOR);

        assert.ok(rule, `${fileName} should style the Actions sidebar trailing visual`);
        assert.equal(rule['flex-shrink'], '0', `${fileName} should not shrink the trailing visual`);
        assert.equal(rule['white-space'], 'nowrap', `${fileName} should not wrap the trailing status`);
    });
}

test('the disabled workflow fixture stays at the base row height after translation', () => {
    const fixture = fs.readFileSync(FIXTURE_PATH, 'utf8');
    const statusMatch = fixture.match(/data-disabled-status[^>]*>([^<]+)</);

    assert.ok(statusMatch, 'fixture should contain the disabled status label');
    assert.equal(statusMatch[1].trim(), 'Disabled');

    const translate = loadTranslator();
    const translated = translate(statusMatch[1].trim());
    assert.equal(translated, '已禁用');

    const css = extractStyleBlock(read('main.user.js'));
    const rule = parseRule(css, TRAILING_VISUAL_SELECTOR);
    assert.ok(rule);

    assert.equal(estimateRowHeight(translated, rule['white-space']), 32);
    assert.ok(
        estimateRowHeight(translated, 'normal') > 32,
        'without nowrap the translated status must reproduce the height regression',
    );
});
