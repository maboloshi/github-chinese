const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const FILTER_ACCEPT = 1;
const FILTER_REJECT = 2;
const FILTER_SKIP = 3;

const sourceText = 'Ask Copilot about this snippet';
const translatedText = '向 Copilot 询问此片段';
const tooltipFixturePath = path.join(__dirname, 'fixtures', 'tooltip-v2.html');

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

function matchesSelector(element, selector) {
    return selector.split(',').some(part => {
        const rule = part.trim();
        const attrEquals = rule.match(/^\[([\w-]+)="([^"]*)"\]$/);
        if (attrEquals) return element.getAttribute(attrEquals[1]) === attrEquals[2];

        const attrContains = rule.match(/^\[([\w-]+)\*="([^"]*)"\]$/);
        if (attrContains) {
            return (element.getAttribute(attrContains[1]) || '').includes(attrContains[2]);
        }

        if (rule.startsWith('#')) return element.id === rule.slice(1);
        if (rule.startsWith('.')) return String(element.className).split(/\s+/).includes(rule.slice(1));
        return element.tagName === rule.toUpperCase();
    });
}

function createElement(tagName, attributes = {}, options = {}) {
    const className = options.className ?? attributes.class ?? '';
    const element = {
        nodeType: ELEMENT_NODE,
        tagName: tagName.toUpperCase(),
        id: attributes.id || '',
        attributes: { ...attributes },
        className,
        childNodes: [],
        dataset: {},
        parentElement: null,
        appendChild(child) {
            child.parentElement = this;
            this.childNodes.push(child);
            return child;
        },
        getAttribute(name) {
            return Object.hasOwn(this.attributes, name) ? this.attributes[name] : null;
        },
        setAttribute(name, value) {
            this.attributes[name] = String(value);
        },
        hasAttribute(name) {
            return Object.hasOwn(this.attributes, name);
        },
        matches(selector) {
            return matchesSelector(this, selector);
        },
        closest(selector) {
            let node = this;
            while (node && node.nodeType === ELEMENT_NODE) {
                if (node.matches(selector)) return node;
                node = node.parentElement;
            }
            return null;
        },
        querySelectorAll(selector) {
            const found = [];
            const walk = node => {
                for (const child of node.childNodes) {
                    if (child.nodeType !== ELEMENT_NODE) continue;
                    if (child.matches(selector)) found.push(child);
                    walk(child);
                }
            };
            walk(this);
            return found;
        },
    };

    if (className) element.attributes.class = className;

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

function createTextNode(data) {
    return {
        nodeType: TEXT_NODE,
        data,
        parentElement: null,
        get length() {
            return this.data.length;
        },
    };
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

function createTreeWalker(root, filter) {
    const stack = [];
    const pushChildren = node => {
        for (let index = node.childNodes.length - 1; index >= 0; index -= 1) {
            stack.push(node.childNodes[index]);
        }
    };
    pushChildren(root);

    return {
        nextNode() {
            while (stack.length > 0) {
                const node = stack.pop();
                const verdict = filter ? filter(node) : FILTER_ACCEPT;

                if (verdict === FILTER_REJECT) continue;
                if (node.nodeType === ELEMENT_NODE) pushChildren(node);
                if (verdict === FILTER_SKIP) continue;
                return node;
            }
            return null;
        },
    };
}

function loadModernPipeline(fileName) {
    const filePath = path.join(__dirname, '..', fileName);
    const source = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const selectorMatch = source.match(/const TOOLTIP_SELECTOR = '([^']+)';/);
    assert.ok(selectorMatch, `${fileName} should define TOOLTIP_SELECTOR`);

    const functions = [
        'shouldIgnoreMutationNode',
        'isTooltipElement',
        'transTooltipElements',
        'processMutations',
        'traverseNode',
        'handleElementNode',
        'handleTextNode',
        'transElementAttrs',
        'transElementAttr',
        'transText',
        'fetchTransResult',
    ].map(name => extractFunction(source, name)).join('\n\n');

    const context = vm.createContext({
        console: { log() {} },
        CONFIG: { DEV: false },
        MissedTermsManager: { cleanup() {}, record() {} },
        Node: { ELEMENT_NODE, TEXT_NODE },
        NodeFilter: { SHOW_ELEMENT: 1, SHOW_TEXT: 4, FILTER_ACCEPT, FILTER_REJECT, FILTER_SKIP },
        document: { createTreeWalker: (root, what, filter) => createTreeWalker(root, filter) },
        performance: { now: () => 0 },
        refreshMenuStates() {},
        isBreadcrumbIdentifierLink: () => false,
        transTimeElement() {},
        State: {
            pageConfig: {
                currentPath: '/octocat/Hello-World/blob/main/README.md',
                staticDict: {
                    [sourceText]: translatedText,
                    'Ask Copilot': '询问 Copilot',
                },
                regexpRules: [[/Line (\d+) options/, '行 $1 选项']],
                ignoreMutationSelectors: '#highlighted-line-menu-positioner',
                ignoreSelectors: '#highlighted-line-menu-positioner',
                characterData: true,
            },
            featureSet: {
                enable_RegExp: true,
                enable_missedTerms: false,
            },
        },
    });

    return vm.runInContext(
        `(function () {\nconst TOOLTIP_SELECTOR = ${JSON.stringify(selectorMatch[1])};\n${functions}\nreturn { processMutations, shouldIgnoreMutationNode, transTooltipElements };\n})()`,
        context,
        { filename: filePath },
    );
}

function buildTooltipFixtureTree() {
    const html = fs.readFileSync(tooltipFixturePath, 'utf8');
    const span = html.match(/<span\b([^>]*)>([^<]*)<\/span>/);
    assert.ok(span, 'fixture should contain a TooltipV2 span');

    const attributes = {};
    for (const match of span[1].matchAll(/([\w-]+)="([^"]*)"/g)) {
        attributes[match[1]] = match[2];
    }

    const ignored = createElement('div', { id: 'highlighted-line-menu-positioner' });
    const menu = createElement('div', { id: 'highlighted-line-menu-container' });
    const button = createElement('button', { 'aria-haspopup': 'true' });
    button.appendChild(createTextNode('Ask Copilot'));

    const tooltip = createElement('span', attributes);
    tooltip.appendChild(createTextNode(span[2]));

    menu.appendChild(button);
    menu.appendChild(tooltip);
    ignored.appendChild(menu);

    return { attributes, button, ignored, menu, tooltip };
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

    test(`${fileName} covers TooltipV2 via class and data-component`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');
        const match = source.match(/const TOOLTIP_SELECTOR = '([^']+)';/);

        assert.ok(match, `${fileName} should define TOOLTIP_SELECTOR`);
        assert.match(match[1], /data-component="Tooltip"/);
        assert.match(match[1], /class\*="Tooltip"/);
        assert.doesNotMatch(source, /tooltipped/);
    });

    test(`${fileName} translates a TooltipV2 bubble added inside an ignored area`, () => {
        const api = loadModernPipeline(fileName);
        const { button, ignored, menu, tooltip } = buildTooltipFixtureTree();

        api.processMutations([{ type: 'childList', target: ignored, addedNodes: [menu] }]);

        assert.equal(tooltip.childNodes[0].data, translatedText);
        assert.equal(button.childNodes[0].data, 'Ask Copilot', '忽略区里的普通内容不应被翻译');
    });

    test(`${fileName} translates a TooltipV2 bubble inserted directly`, () => {
        const api = loadModernPipeline(fileName);
        const { ignored, tooltip } = buildTooltipFixtureTree();

        api.processMutations([{ type: 'childList', target: ignored, addedNodes: [tooltip] }]);

        assert.equal(tooltip.childNodes[0].data, translatedText);
    });

    test(`${fileName} translates TooltipV2 text updates with regexp rules`, () => {
        const api = loadModernPipeline(fileName);
        const { ignored, tooltip } = buildTooltipFixtureTree();

        api.processMutations([{ type: 'childList', target: ignored, addedNodes: [tooltip] }]);
        tooltip.childNodes[0].data = 'Line 10 options';
        api.processMutations([{ type: 'characterData', target: tooltip.childNodes[0] }]);

        assert.equal(tooltip.childNodes[0].data, '行 10 选项');
    });

    test(`${fileName} translates the bubble aria-label`, () => {
        const api = loadModernPipeline(fileName);
        const { ignored, tooltip } = buildTooltipFixtureTree();
        tooltip.setAttribute('aria-label', 'Ask Copilot');

        api.processMutations([{ type: 'childList', target: ignored, addedNodes: [tooltip] }]);

        assert.equal(tooltip.getAttribute('aria-label'), '询问 Copilot');
    });

    test(`${fileName} ignores ordinary elements inside the ignored area`, () => {
        const api = loadModernPipeline(fileName);
        const ignored = createElement('div', { id: 'highlighted-line-menu-positioner' });
        const tooltip = createElement('span', { 'data-component': 'Tooltip' });
        const plain = createElement('span');
        plain.appendChild(createTextNode('Ask Copilot'));
        ignored.appendChild(tooltip);
        ignored.appendChild(plain);

        assert.equal(api.shouldIgnoreMutationNode(plain), true);
        assert.equal(api.shouldIgnoreMutationNode(tooltip), false);

        api.processMutations([{ type: 'childList', target: ignored, addedNodes: [plain] }]);
        assert.equal(plain.childNodes[0].data, 'Ask Copilot');
    });
}

test('TooltipV2 selector matches either class or data-component', () => {
    const api = loadModernPipeline('main.user.js');

    for (const attributes of [
        { 'data-component': 'Tooltip' },
        { class: 'prc-TooltipV2-Tooltip-tLeuB' },
    ]) {
        const tooltip = createElement('span', attributes);
        tooltip.appendChild(createTextNode(sourceText));

        api.processMutations([{ type: 'childList', target: {}, addedNodes: [tooltip] }]);

        assert.equal(tooltip.childNodes[0].data, translatedText, JSON.stringify(attributes));
    }
});

test('TooltipV2 fixture keeps the reported DOM shape', () => {
    const html = fs.readFileSync(tooltipFixturePath, 'utf8');

    assert.match(html, /id="highlighted-line-menu-positioner"/);
    assert.match(html, /class="prc-TooltipV2-Tooltip-/);
    assert.match(html, /data-component="Tooltip"/);
    assert.match(html, /aria-hidden="true"/);
    assert.match(html, /Ask Copilot about this snippet/);
});

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

test('main(greasyfork).user.js no longer keys translation on tooltipped', () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'main(greasyfork).user.js'), 'utf8');

    assert.doesNotMatch(source, /tooltipped/);
});

test('main(greasyfork).user.js translates TooltipV2 bubble text', () => {
    const translate = loadLegacyTraverser('main(greasyfork).user.js');
    const tooltip = createElement('span', {
        class: 'prc-TooltipV2-Tooltip-tLeuB',
        'data-component': 'Tooltip',
        'aria-hidden': 'true',
    });
    tooltip.appendChild(createTextNode(sourceText));

    translate(tooltip);

    assert.equal(tooltip.childNodes[0].data, translatedText);
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
