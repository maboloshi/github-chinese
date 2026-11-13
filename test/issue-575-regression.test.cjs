// #575：下拉菜单/选择面板里的文本在打开后由 React 原地改写，
// 这些页面不在 characterDataPage 白名单里，文本变化必须单独放行。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8').replace(/\r\n/g, '\n');
const fixture = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'fixtures', 'issue-575', 'dropdown-menus.json'), 'utf8'),
);

const LIVE_SURFACES = [
    '[role="menu"]',
    '[role="listbox"]',
    '[role="dialog"]',
    '[role="tooltip"]',
    'details-menu',
    '.Popover',
    '.dropdown-menu',
];

function extractFunction(name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist`);

    const bodyStart = source.indexOf('{', start);
    let depth = 0;
    for (let index = bodyStart; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') depth -= 1;
        if (depth === 0) return source.slice(start, index + 1);
    }
    assert.fail(`could not extract ${name}`);
}

function extractLiveSurfaceSelector() {
    const start = source.indexOf('    const LIVE_SURFACE_SELECTOR = [');
    assert.notEqual(start, -1, 'LIVE_SURFACE_SELECTOR should exist');
    const end = source.indexOf("    ].join(', ');", start);
    assert.notEqual(end, -1, 'LIVE_SURFACE_SELECTOR should be a joined selector list');
    return source.slice(start, end + "    ].join(', ');".length);
}

function loadI18N() {
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'locals.js'), 'utf8'), context);
    return context.I18N;
}

function pageDictionary(I18N, pageType) {
    const page = I18N['zh-CN'][pageType];
    assert.ok(page, `词库缺少页面 "${pageType}"`);
    return { ...I18N['zh-CN'].public.static, ...(page.static || {}) };
}

function createTextNode(text, surface, { blocked = false } = {}) {
    const ancestor = {};
    return {
        nodeType: 3,
        data: text,
        length: text.length,
        parentElement: {
            tagName: 'SPAN',
            closest(selector) {
                if (blocked && selector === '.blocked') return ancestor;
                if (surface && selector.includes(surface)) return ancestor;
                return null;
            },
        },
    };
}

function loadPipeline(characterData = false) {
    const traversed = [];
    const state = {
        pageConfig: {
            characterData,
            ignoreMutationSelectors: '.blocked',
        },
    };
    const context = vm.createContext({
        Node: { ELEMENT_NODE: 1, TEXT_NODE: 3 },
        State: state,
        CONFIG: { DEV: false },
        traverseNode(node) {
            traversed.push(node);
        },
        console: { log() {} },
    });
    vm.runInContext(`
${extractLiveSurfaceSelector()}
${extractFunction('isLiveSurfaceNode')}
${extractFunction('shouldIgnoreMutationNode')}
${extractFunction('processMutations')}
globalThis.__processMutations = processMutations;
globalThis.__state = State;
`, context);

    return {
        state,
        traversed,
        mutate(mutation) {
            traversed.length = 0;
            context.__processMutations([mutation]);
        },
    };
}

function loadTextTranslator(pageType) {
    const dict = pageDictionary(loadI18N(), pageType);
    const state = {
        pageConfig: {
            staticDict: dict,
            regexpRules: [],
            currentPath: '/',
        },
        featureSet: {
            enable_RegExp: false,
            enable_missedTerms: false,
        },
    };
    const context = vm.createContext({
        State: state,
        MissedTermsManager: { cleanup() {}, record() {} },
    });
    vm.runInContext(`
${extractFunction('transText')}
${extractFunction('fetchTransResult')}
${extractFunction('transElementAttr')}
${extractFunction('transElementAttrs')}
${extractFunction('handleTextNode')}
globalThis.__handleTextNode = handleTextNode;
`, context);

    return text => {
        const node = { nodeType: 3, data: text, length: text.length, parentElement: { tagName: 'SPAN' } };
        context.__handleTextNode(node);
        return node.data;
    };
}

test('issue #575 的三处下拉菜单文案都能按页面词库翻译', () => {
    for (const [name, scenario] of Object.entries(fixture)) {
        const translate = loadTextTranslator(scenario.pageType);

        for (const { source: text, expected } of scenario.texts) {
            assert.equal(translate(text), expected, `${name} 未翻译：${text}`);
        }
    }
});

test('非 characterDataPage 的菜单文本变化仍会被处理', () => {
    for (const surface of LIVE_SURFACES) {
        const pipeline = loadPipeline(false);
        const node = createTextNode('Private contributions', surface);

        pipeline.mutate({ type: 'characterData', target: node });

        assert.deepEqual(pipeline.traversed, [node], `${surface} 内的文本变化被漏掉`);
    }
});

test('菜单之外的文本变化仍遵守 characterDataPage 白名单', () => {
    const pipeline = loadPipeline(false);
    const node = createTextNode('Private contributions', null);

    pipeline.mutate({ type: 'characterData', target: node });

    assert.deepEqual(pipeline.traversed, []);
});

test('忽略选择器覆盖菜单文本时仍然跳过', () => {
    const pipeline = loadPipeline(false);
    const node = createTextNode('Private contributions', '[role="menu"]', { blocked: true });

    pipeline.mutate({ type: 'characterData', target: node });

    assert.deepEqual(pipeline.traversed, []);
});

test('characterDataPage 原有行为不变', () => {
    const pipeline = loadPipeline(true);
    const node = createTextNode('Private contributions', null);

    pipeline.mutate({ type: 'characterData', target: node });

    assert.deepEqual(pipeline.traversed, [node]);
});

test('菜单新增节点仍走 childList 通道', () => {
    const pipeline = loadPipeline(false);
    const node = createTextNode('Activity overview', '[role="menu"]');

    pipeline.mutate({ type: 'childList', target: {}, addedNodes: [node] });

    assert.deepEqual(pipeline.traversed, [node]);
});

test('LIVE_SURFACE_SELECTOR 覆盖三处截图的弹层形态', () => {
    const selector = extractLiveSurfaceSelector();
    for (const surface of LIVE_SURFACES) {
        assert.ok(selector.includes(surface), `LIVE_SURFACE_SELECTOR 缺少 ${surface}`);
    }
});
