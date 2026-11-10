const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const sourceText = 'Ask Copilot about this snippet';
const translatedText = '向 Copilot 询问此片段';

function extractFunction(source, name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist in the userscript`);

    const bodyStart = source.indexOf('{', start);
    let depth = 0;

    for (let index = bodyStart; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') depth -= 1;
        if (depth === 0) return source.slice(start, index + 1);
    }

    assert.fail(`could not extract ${name} from the userscript`);
}

function createElement(tagName, attributes = {}) {
    const element = {
        nodeType: ELEMENT_NODE,
        tagName: tagName.toUpperCase(),
        attributes: { ...attributes },
        className: '',
        childNodes: [],
        dataset: {},
        getAttribute(name) {
            return Object.hasOwn(this.attributes, name) ? this.attributes[name] : null;
        },
        setAttribute(name, value) {
            this.attributes[name] = value;
        },
        hasAttribute(name) {
            return Object.hasOwn(this.attributes, name);
        },
    };

    Object.defineProperty(element, 'ariaLabel', {
        get() {
            return this.attributes['aria-label'] ?? '';
        },
        set(value) {
            this.attributes['aria-label'] = value;
        },
    });

    return element;
}

function loadModernHandler(fileName) {
    const filePath = path.join(__dirname, '..', fileName);
    const source = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const functions = [
        'handleElementNode',
        'transElementAttrs',
        'transElementAttr',
        'transText',
        'fetchTransResult',
    ].map(name => extractFunction(source, name)).join('\n\n');
    const context = vm.createContext({
        console: { log() {} },
        MissedTermsManager: { cleanup() {} },
        Node: { ELEMENT_NODE, TEXT_NODE },
        refreshMenuStates() {},
        State: {
            pageConfig: {
                currentPath: '/octocat/Hello-World/blob/main/README.md',
                staticDict: { [sourceText]: translatedText },
                regexpRules: [],
            },
            featureSet: {
                enable_RegExp: false,
                enable_missedTerms: false,
            },
        },
        transTimeElement() {},
    });
    const api = vm.runInContext(
        `(function () {\n${functions}\nreturn { handleElementNode };\n})()`,
        context,
        { filename: filePath },
    );

    return api.handleElementNode;
}

function loadLegacyTraverser(fileName) {
    const filePath = path.join(__dirname, '..', fileName);
    const source = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const functions = [
        'traverseNode',
        'transElement',
        'translateText',
        'fetchTranslatedText',
    ].map(name => extractFunction(source, name)).join('\n\n');
    const context = vm.createContext({
        console: { log() {} },
        I18N: {
            conf: {
                reIgnoreClass: /$a/,
                reIgnoreId: /$a/,
                reIgnoreItemprop: /$a/,
                reIgnoreTag: [],
            },
            'zh-CN': {
                blob: {
                    regexp: [],
                    static: { [sourceText]: translatedText },
                },
                public: {
                    regexp: [],
                    static: {},
                },
            },
        },
        Node: { ELEMENT_NODE, TEXT_NODE },
        enable_RegExp: false,
        lang: 'zh-CN',
        page: 'blob',
        transTimeElement() {},
    });
    const api = vm.runInContext(
        `(function () {\n${functions}\nreturn { traverseNode };\n})()`,
        context,
        { filename: filePath },
    );

    return api.traverseNode;
}

for (const fileName of ['main.user.js', 'main(nju.edu).user.js', 'main_zh-TW.user.js']) {
    test(`${fileName} translates aria-label tooltips without the tooltipped class`, () => {
        const translate = loadModernHandler(fileName);
        const button = createElement('button', { 'aria-label': sourceText });

        translate(button);

        assert.equal(button.getAttribute('aria-label'), translatedText);
    });

    test(`${fileName} leaves unknown aria-label values untouched`, () => {
        const translate = loadModernHandler(fileName);
        const button = createElement('button', { 'aria-label': 'octocat/Hello-World' });

        translate(button);

        assert.equal(button.getAttribute('aria-label'), 'octocat/Hello-World');
    });
}

test('main(greasyfork).user.js translates aria-label tooltips without the tooltipped class', () => {
    const translate = loadLegacyTraverser('main(greasyfork).user.js');
    const button = createElement('button', { 'aria-label': sourceText });

    translate(button);

    assert.equal(button.getAttribute('aria-label'), translatedText);
});

test('main(greasyfork).user.js leaves unknown aria-label values untouched', () => {
    const translate = loadLegacyTraverser('main(greasyfork).user.js');
    const button = createElement('button', { 'aria-label': 'octocat/Hello-World' });

    translate(button);

    assert.equal(button.getAttribute('aria-label'), 'octocat/Hello-World');
});

test('blob dictionaries retain the Ask Copilot tooltip label', () => {
    const cases = [
        ['locals.js', 'zh-CN', translatedText],
        ['locals_zh-TW.js', 'zh-TW', '向 Copilot 詢問此片段'],
        ['locals(greasyfork).js', 'zh-CN', translatedText],
    ];

    for (const [fileName, lang, expected] of cases) {
        const filePath = path.join(__dirname, '..', fileName);
        const context = vm.createContext({});

        vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
            filename: filePath,
        });

        assert.equal(
            context.I18N[lang]['repository/blob'].static[sourceText],
            expected,
            fileName,
        );
    }
});
