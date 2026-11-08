const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ELEMENT_NODE = 1;

function extractFunction(source, name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist in the stable userscript`);

    const bodyStart = source.indexOf('{', start);
    let depth = 0;

    for (let index = bodyStart; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') depth -= 1;
        if (depth === 0) return source.slice(start, index + 1);
    }

    assert.fail(`could not extract ${name} from the stable userscript`);
}

function loadStableTimeTranslation() {
    const filePath = path.join(__dirname, '..', 'main(greasyfork).user.js');
    const source = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const observers = [];
    let timeRuleReads = 0;

    class MutationObserver {
        constructor(callback) {
            this.callback = callback;
            this.target = null;
            this.config = null;
            observers.push(this);
        }

        observe(target, config) {
            this.target = target;
            this.config = config;
        }
    }

    const document = {
        body: {},
        documentElement: { lang: 'en' },
    };
    const publicRules = {};
    Object.defineProperty(publicRules, 'time-regexp', {
        get() {
            timeRuleReads += 1;
            return [[/^(\d+)m ago$/, '$1个月前']];
        },
    });

    const context = vm.createContext({
        console: { log() {} },
        document,
        getPage: () => false,
        I18N: {
            conf: {
                reIgnoreId: /$a/,
                reIgnoreClass: /$a/,
                reIgnoreTag: [],
                reIgnoreItemprop: /$a/,
            },
            'zh-CN': { public: publicRules },
        },
        lang: 'zh-CN',
        MutationObserver,
        Node: { ELEMENT_NODE, TEXT_NODE: 3 },
        page: false,
        registerMenuCommand() {},
        setTimeout() {},
        setupReactGlobalNavTranslation() {},
        transBySelector() {},
        transDesc() {},
        transElement() {},
        transTitle() {},
        watchUpdate() {},
        window: { MutationObserver },
    });
    const functions = [
        'initLangEnv',
        'transTimeElement',
        'traverseNode',
        'init',
    ].map(name => extractFunction(source, name)).join('\n\n');
    const api = vm.runInContext(
        `(function () {\n${functions}\nreturn { init, transTimeElement, traverseNode };\n})()`,
        context,
        { filename: filePath },
    );

    return {
        ...api,
        document,
        observers,
        getTimeRuleReads: () => timeRuleReads,
    };
}

function createRelativeTime(text) {
    let value = text;
    const shadowRoot = {
        childNodes: [{}],
        get lastChild() {
            return { textContent: value };
        },
        get textContent() {
            return value;
        },
        set textContent(nextValue) {
            value = nextValue;
        },
    };

    return {
        nodeType: ELEMENT_NODE,
        tagName: 'RELATIVE-TIME',
        id: '',
        className: '',
        childNodes: [],
        getAttribute() {
            return null;
        },
        shadowRoot,
    };
}

test('stable initialization selects and protects the zh-CN document language', () => {
    const stable = loadStableTimeTranslation();

    stable.init();

    assert.equal(stable.document.documentElement.lang, 'zh-CN');
    assert.equal(stable.observers.length, 1);
    assert.equal(stable.observers[0].target, stable.document.documentElement);
    assert.deepEqual(Array.from(stable.observers[0].config.attributeFilter), ['lang']);

    stable.document.documentElement.lang = 'en';
    stable.observers[0].callback();

    assert.equal(stable.document.documentElement.lang, 'zh-CN');
});

test('leaves compact relative minutes to GitHub localization', () => {
    const stable = loadStableTimeTranslation();
    const relativeTime = createRelativeTime('3m ago');

    stable.traverseNode(relativeTime);

    assert.equal(relativeTime.shadowRoot.textContent, '3m ago');
    assert.equal(stable.getTimeRuleReads(), 0);
});

test('limits time handling to RELATIVE-TIME shadow roots', () => {
    const stable = loadStableTimeTranslation();
    const legacyTime = createRelativeTime('on Sep 5, 2026');
    legacyTime.tagName = 'TIME-AGO';
    const shadowlessRelativeTime = createRelativeTime('on Sep 5, 2026');
    shadowlessRelativeTime.shadowRoot = null;
    shadowlessRelativeTime.textContent = 'on Sep 5, 2026';

    stable.traverseNode(legacyTime);
    stable.traverseNode(shadowlessRelativeTime);

    assert.equal(legacyTime.shadowRoot.textContent, 'on Sep 5, 2026');
    assert.equal(shadowlessRelativeTime.textContent, 'on Sep 5, 2026');
});

test('does not install an observer that races GitHub relative-time updates', () => {
    const stable = loadStableTimeTranslation();
    const relativeTime = createRelativeTime('3m ago');
    stable.init();

    stable.traverseNode(relativeTime);
    relativeTime.shadowRoot.textContent = '2m ago';
    stable.observers
        .filter(observer => observer.target === relativeTime.shadowRoot)
        .forEach(observer => observer.callback([{
            addedNodes: [relativeTime.shadowRoot],
        }]));

    assert.equal(stable.observers.length, 1);
    assert.equal(relativeTime.shadowRoot.textContent, '2m ago');
});

test('continues to remove only the leading on from absolute time text', () => {
    const stable = loadStableTimeTranslation();
    const relativeTime = createRelativeTime('on Sep 5, 2026');

    stable.traverseNode(relativeTime);

    assert.equal(relativeTime.shadowRoot.textContent, ' Sep 5, 2026');
    assert.equal(stable.getTimeRuleReads(), 0);
});
