const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const PLACEHOLDER_EN = 'Ask anything or type @ to add context';
const ARIA_EN = 'Ask anything or type @ to add context with Copilot';

const NodeFilter = {
    FILTER_ACCEPT: 1,
    FILTER_REJECT: 2,
    SHOW_ELEMENT: 1,
    SHOW_TEXT: 4,
};

function createTreeWalker(root, whatToShow, filter) {
    const acceptNode = typeof filter === 'function' ? filter : (node) => filter.acceptNode(node);
    const accepted = [];

    function visit(node) {
        for (const child of node.childNodes || []) {
            const shown = child.nodeType === TEXT_NODE ? NodeFilter.SHOW_TEXT : NodeFilter.SHOW_ELEMENT;
            if ((whatToShow & shown) === 0) {
                visit(child);
                continue;
            }
            const result = acceptNode(child);
            if (result === NodeFilter.FILTER_REJECT) continue;
            if (result === NodeFilter.FILTER_ACCEPT) accepted.push(child);
            visit(child);
        }
    }

    visit(root);
    let index = 0;
    return {
        nextNode() {
            return index < accepted.length ? accepted[index++] : null;
        },
    };
}

function extractBetween(source, startMarker, endMarker) {
    const start = source.indexOf(startMarker);
    const end = source.indexOf(endMarker, start + startMarker.length);
    assert.notEqual(start, -1, startMarker);
    assert.notEqual(end, -1, endMarker);
    return source.slice(start, end);
}

function element(tagName, props = {}) {
    return {
        nodeType: ELEMENT_NODE,
        tagName: tagName.toUpperCase(),
        childNodes: [],
        placeholder: props.placeholder || '',
        ariaLabel: props.ariaLabel || '',
        append(child) {
            child.parentElement = this;
            this.childNodes.push(child);
        },
        matches(selector) {
            return selector.split(',').some(part => part.trim().toLowerCase() === this.tagName.toLowerCase());
        },
    };
}

function loadEngine() {
    const filePath = path.join(__dirname, '..', 'main.user.js');
    const source = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const context = vm.createContext({
        document: { createTreeWalker },
        window: { location: { pathname: '/dashboard' } },
        Node: { ELEMENT_NODE, TEXT_NODE },
        NodeFilter,
        performance: { now: () => 0 },
        console,
        CONFIG: { LANG: 'zh-CN' },
        State: {
            pageConfig: null,
            featureSet: { enable_RegExp: true, enable_missedTerms: false },
        },
        MissedTermsManager: { cleanup() {}, record() {} },
        refreshMenuStates() {},
    });

    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'locals.js'), 'utf8'), context);
    return vm.runInContext(`
        ${extractBetween(source, '    function buildPageConfig(', '    function detectPageType(')}
        ${extractBetween(source, '    function traverseNode(', '    /* =========================== 远程翻译')}
        State.pageConfig = buildPageConfig('dashboard');
        ({ traverseNode });
    `, context, { filename: filePath });
}

const engine = loadEngine();

test('translates dashboard copilot textarea chrome and leaves a second pass unchanged', () => {
    const parent = element('div');
    const textarea = element('textarea', {
        placeholder: PLACEHOLDER_EN,
        ariaLabel: ARIA_EN,
    });
    parent.append(textarea);

    engine.traverseNode(parent);
    engine.traverseNode(parent);

    assert.equal(textarea.placeholder, '询问任何问题或输入 @ 来添加上下文');
    assert.equal(textarea.ariaLabel, '使用 Copilot 询问任何问题或输入 @ 来添加上下文');
});
