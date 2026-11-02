const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const ELEMENT_NODE = 1;
const sourceCache = new Map();
const i18nCache = new Map();

const devVariants = [
    ['main.user.js', 'locals.js'],
    ['main(nju.edu).user.js', 'locals.js'],
    ['main_zh-TW.user.js', 'locals_zh-TW.js'],
];

const repositoryPages = [
    ['https://github.com/acme/project', 'repository'],
    ['https://github.com/acme/project/', 'repository'],
    ['https://github.com/acme/project?files=1', 'repository'],
    ['https://github.com/acme/project#readme', 'repository'],
    ['https://github.com/acme/project?files=1#readme', 'repository'],
    ['https://github.com/acme/project/tree/main', 'repository/tree'],
    ['https://github.com/acme/project/issues', 'repository/issues'],
    ['https://github.com/acme/project/issues/7', 'repository/issues'],
    ['https://github.com/acme/project/settings', 'repository/settings'],
    ['https://github.com/acme/project/settings/hooks', 'repository/settings/hooks'],
];

function readSource(fileName) {
    if (!sourceCache.has(fileName)) {
        const filePath = path.join(ROOT, fileName);
        sourceCache.set(fileName, fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n'));
    }
    return sourceCache.get(fileName);
}

function loadI18N(fileName) {
    if (!i18nCache.has(fileName)) {
        const filePath = path.join(ROOT, fileName);
        const context = vm.createContext({});
        vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, { filename: filePath });
        i18nCache.set(fileName, context.I18N);
    }
    return i18nCache.get(fileName);
}

function extractFunction(source, name) {
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

function extractOptionalFunction(source, name) {
    if (!source.includes(`    function ${name}(`)) return '';
    return `${extractFunction(source, name)}\n\n`;
}

function extractConfig(source) {
    const start = source.indexOf('    const CONFIG = {');
    const end = source.indexOf('\n    };', start);
    assert.notEqual(start, -1);
    assert.notEqual(end, -1);
    return source.slice(start, end + '\n    };'.length);
}

function createEnvironment() {
    const state = {
        href: 'https://github.com/settings/profile',
        classes: [],
        meta: '',
    };
    const location = {
        get href() { return state.href; },
        get hostname() { return new URL(state.href).hostname; },
        get pathname() { return new URL(state.href).pathname; },
        get search() { return new URL(state.href).search; },
        get hash() { return new URL(state.href).hash; },
    };
    const body = {
        nodeType: ELEMENT_NODE,
        parentElement: null,
        matches() { return false; },
        closest() { return null; },
        get className() { return state.classes.join(' '); },
        classList: {
            contains(name) { return state.classes.includes(name); },
        },
    };
    const listeners = new Map();
    const document = {
        body,
        head: {
            querySelector(selector) {
                if (selector === 'meta[name="analytics-location"]' && state.meta) {
                    return { content: state.meta };
                }
                if (selector === 'meta[name="octolytics-dimension-repository_nwo"]' && state.nwo) {
                    return { content: state.nwo };
                }
                return null;
            },
        },
        getElementsByName(name) {
            if (name === 'analytics-location' && state.meta) return [{ content: state.meta }];
            return [];
        },
        addEventListener(type, listener) {
            if (!listeners.has(type)) listeners.set(type, []);
            listeners.get(type).push(listener);
        },
        dispatch(type) {
            for (const listener of listeners.get(type) || []) listener();
        },
    };

    return {
        location,
        document,
        setUrl(href) { state.href = new URL(href).href; },
        setClasses(classes) { state.classes = classes.slice(); },
        setMeta(meta) { state.meta = meta; },
        setNwo(nwo) { state.nwo = nwo; },
    };
}

function createHost(env) {
    const calls = [];
    const tasks = [];
    const bridge = { page() { return null; } };
    const observers = [];

    class MutationObserver {
        constructor(callback) {
            this.callback = callback;
            observers.push(this);
        }

        observe(target, config) {
            this.target = target;
            this.config = config;
        }

        disconnect() {}
    }

    const context = vm.createContext({
        URL,
        URLSearchParams,
        Node: { ELEMENT_NODE, TEXT_NODE: 3 },
        MutationObserver,
        console: {
            log() {},
            warn() {},
            error(...args) {
                const found = args.find(item => item instanceof Error);
                throw found || new Error(args.map(String).join(' '));
            },
        },
        document: env.document,
        location: env.location,
        window: { location: env.location, MutationObserver },
        setTimeout(fn, delay) {
            tasks.push({ fn, delay });
            return tasks.length;
        },
        isReactGlobalNavPortalNode() { return false; },
        transTitle() { calls.push('title'); },
        transBySelector() { calls.push('selector'); },
        transDesc(selector) { calls.push(['desc', selector]); },
        traverseNode(node) { calls.push(['traverse', node, bridge.page()]); },
    });

    return { context, calls, tasks, bridge, observers, MutationObserver };
}

function runScript(context, source, filename) {
    vm.runInContext(source, context, { filename });
    return context.__api;
}

function loadDevDetector(scriptName, dictionaryName) {
    const source = readSource(scriptName);
    const env = createEnvironment();
    const host = createHost(env);
    host.context.I18N = loadI18N(dictionaryName);
    const api = runScript(host.context, `
${extractConfig(source)}
${extractOptionalFunction(source, 'isFallbackRepositoryPath')}
${extractFunction(source, 'detectPageType')}
globalThis.__api = { CONFIG, detectPageType };
`, scriptName);
    return { api, env, I18N: host.context.I18N };
}

function loadDevRuntime(scriptName, dictionaryName) {
    const source = readSource(scriptName);
    const env = createEnvironment();
    const host = createHost(env);
    host.context.I18N = loadI18N(dictionaryName);
    const names = [
        'safe',
        'handleUrlChange',
        'setupTurboEvents',
        'handleTurboLoad',
        'updatePageConfig',
        'buildPageConfig',
        'detectPageType',
        'setupMutationObserver',
        'shouldIgnoreMutationNode',
        'processMutations',
    ];
    const api = runScript(host.context, `
${extractConfig(source)}
const State = {
    featureSet: {
        enable_RegExp: true,
        enable_transDesc: true,
        enable_missedTerms: false,
        enable_onurlchange: false,
    },
    pageConfig: null,
    currentURL: 'https://github.com/settings/profile',
    mutationObserver: null,
    urlChangeHandler: null,
};
${extractOptionalFunction(source, 'isFallbackRepositoryPath')}
${names.map(name => extractFunction(source, name)).join('\n\n')}
globalThis.__api = {
    CONFIG,
    State,
    detectPageType,
    updatePageConfig,
    handleUrlChange,
    handleTurboLoad,
    setupTurboEvents,
    setupMutationObserver,
};
`, scriptName);
    host.bridge.page = () => api.State.pageConfig?.currentPageType ?? null;
    return { api, env, calls: host.calls, tasks: host.tasks, I18N: host.context.I18N };
}

function loadStableDetector() {
    const source = readSource('main(greasyfork).user.js');
    const env = createEnvironment();
    const host = createHost(env);
    host.context.I18N = loadI18N('locals(greasyfork).js');
    const api = runScript(host.context, `
const lang = I18N.zh ? 'zh' : 'zh-CN';
${extractOptionalFunction(source, 'isFallbackRepositoryPath')}
${extractFunction(source, 'getPage')}
globalThis.__api = { getPage, get lang() { return lang; } };
`, 'main(greasyfork).user.js');
    return { api, env, I18N: host.context.I18N };
}

function loadStableRuntime() {
    const source = readSource('main(greasyfork).user.js');
    const env = createEnvironment();
    const host = createHost(env);
    host.context.I18N = loadI18N('locals(greasyfork).js');
    const names = [
        'getElementFromNode',
        'getIgnoreMutationSelectors',
        'shouldIgnoreMutationNode',
        'getPage',
        'watchUpdate',
    ];
    const api = runScript(host.context, `
const lang = I18N.zh ? 'zh' : 'zh-CN';
let page = false;
${extractOptionalFunction(source, 'isFallbackRepositoryPath')}
${names.map(name => extractFunction(source, name)).join('\n\n')}
globalThis.__api = {
    getPage,
    watchUpdate,
    readPage() { return page; },
    get lang() { return lang; },
};
`, 'main(greasyfork).user.js');
    host.bridge.page = () => api.readPage();
    return {
        api,
        env,
        calls: host.calls,
        tasks: host.tasks,
        observers: host.observers,
        I18N: host.context.I18N,
    };
}

function classifyDev(loaded, href, classes = [], meta = '') {
    loaded.env.setUrl(href);
    loaded.env.setClasses(classes);
    loaded.env.setMeta(meta);
    return loaded.api.detectPageType();
}

function classifyStable(loaded, href, classes = [], meta = '') {
    loaded.env.setUrl(href);
    loaded.env.setClasses(classes);
    loaded.env.setMeta(meta);
    return loaded.api.getPage();
}

function preservedPages(dashboard, education) {
    const pages = [
        ['https://github.com/settings/profile', [], 'settings/profile'],
        ['https://github.com/topics/javascript', [], 'topics'],
        ['https://github.com/notifications/subscriptions', [], 'notifications/subscriptions'],
        ['https://github.com/copilot/chat', [], 'copilot'],
        ['https://github.com/users/acme/projects', [], 'projects'],
        ['https://github.com/github-copilot/signup', [], 'github-copilot/signup'],
        ['https://github.com/new/import', [], 'new/import'],
        ['https://github.com/account/organizations/new', [], 'account/organizations/new'],
        ['https://github.com/installations/new', [], false],
        ['https://github.com/orgs/acme', [], 'orgs'],
        ['https://github.com/orgs/acme/repositories', [], 'orgs/repositories'],
        ['https://github.com/organizations/acme', [], 'orgs'],
        ['https://github.com/organizations/acme/people', [], 'orgs/people'],
        ['https://github.com/organizations/acme/settings/profile', [], 'orgs/settings/profile'],
        ['https://github.com/acme/enterprise_plan', [], false],
        ['https://github.com/acme/sponsoring', [], false],
        ['https://github.com/settings-tools/project', [], 'repository'],
        ['https://github.com/login', [], 'login'],
        ['https://github.com/acme/project', ['session-authentication'], 'session-authentication'],
        ['https://github.com/', [], 'homepage'],
        ['https://github.com/', ['logged-in'], dashboard],
        ['https://github.com/acme?tab=repositories', ['page-profile'], 'page-profile/repositories'],
        ['https://github.com/acme/stars', ['page-profile'], 'page-profile/stars'],
        ['https://github.com/acme/project', ['page-profile'], 'page-profile'],
        ['https://gist.github.com/acme/project', [], 'gist'],
        ['https://www.githubstatus.com/incidents', [], 'status'],
        ['https://skills.github.com/acme/project', [], 'skills'],
    ];
    if (education) pages.push(['https://education.github.com/acme/project', [], 'education']);
    return pages;
}

const rejectedPages = [
    'https://github.com/acme',
    'https://github.com/acme/',
    'https://github.com//project',
    'https://github.com/acme//tree',
    'https://github.com/acme/...',
    'https://github.com/.../project',
    'https://github.com/acme/foo%20bar',
    'https://github.com/acme/project/reported_content',
    'https://github.com/acme/project/unknown-feature',
];

for (const [scriptName, dictionaryName] of devVariants) {
    test(`${scriptName} selects repository dictionaries without analytics metadata`, () => {
        const loaded = loadDevDetector(scriptName, dictionaryName);
        for (const [href, expected] of repositoryPages) {
            for (const meta of ['', 'unavailable', '/<user-name>/<repo-name>']) {
                assert.equal(classifyDev(loaded, href, ['logged-in'], meta), expected, `${href} [${meta}]`);
            }
        }
        assert.equal(
            classifyDev(loaded, 'https://github.com/acme', [], '/<user-name>'),
            'page-profile',
        );
    });

    test(`${scriptName} keeps global, profile, auth, home, org, and special-host routes`, () => {
        const loaded = loadDevDetector(scriptName, dictionaryName);
        for (const [href, classes, expected] of preservedPages('dashboard', true)) {
            for (const meta of ['', 'unavailable']) {
                assert.equal(classifyDev(loaded, href, classes, meta), expected, `${href} [${meta}]`);
            }
        }
        assert.equal(
            classifyDev(loaded, 'https://github.com/topics/javascript', [], '/<user-name>/<repo-name>'),
            'repository',
        );
    });

    test(`${scriptName} rejects incomplete paths and unknown dictionaries`, () => {
        const loaded = loadDevDetector(scriptName, dictionaryName);
        for (const href of rejectedPages) {
            assert.equal(classifyDev(loaded, href, [], ''), false, href);
            assert.equal(classifyDev(loaded, href, [], 'unavailable'), false, href);
        }
        assert.equal(
            classifyDev(loaded, 'https://github.com/acme/project/reported_content', [], '/<user-name>/<repo-name>'),
            false,
        );
        assert.equal(
            classifyDev(loaded, 'https://github.com/acme/project/unknown-feature', [], '/<user-name>/<repo-name>'),
            'repository',
        );
    });

    test(`${scriptName} resumes translation after a URL change without metadata`, () => {
        const loaded = loadDevRuntime(scriptName, dictionaryName);
        const { api, env, calls, I18N } = loaded;
        api.setupTurboEvents();
        env.setUrl('https://github.com/settings/profile');
        api.State.currentURL = env.location.href;
        api.updatePageConfig('start');
        assert.equal(api.State.pageConfig.currentPageType, 'settings/profile');

        calls.length = 0;
        env.setMeta('');
        env.setUrl('https://github.com/acme/project');
        api.handleUrlChange();

        assert.equal(api.State.pageConfig.currentPageType, 'repository');
        assert.equal(api.State.pageConfig.currentPath, '/acme/project');
        assert.equal(api.State.pageConfig.staticDict.Pin, I18N[api.CONFIG.LANG].repository.static.Pin);
        assert.deepEqual(calls, [['traverse', env.document.body, 'repository']]);

        env.setMeta('/<user-name>/<repo-name>');
        calls.length = 0;
        env.document.dispatch('turbo:load');
        assert.equal(api.detectPageType(), 'repository');
        assert.equal(api.State.pageConfig.currentPageType, 'repository');
        assert.deepEqual(calls, ['title', 'selector', ['desc', api.CONFIG.DESC_SELECTORS.repository]]);

        calls.length = 0;
        env.setMeta('');
        env.setUrl('https://github.com/acme');
        api.handleUrlChange();
        assert.equal(api.State.pageConfig, null);
        assert.deepEqual(calls, []);
        env.document.dispatch('turbo:load');
        assert.deepEqual(calls, []);
    });

    test(`${scriptName} resumes translation from the mutation observer without metadata`, () => {
        const loaded = loadDevRuntime(scriptName, dictionaryName);
        const { api, env, calls } = loaded;
        api.setupTurboEvents();
        env.setUrl('https://github.com/notifications');
        api.State.currentURL = env.location.href;
        api.State.urlChangeHandler = null;
        api.updatePageConfig('start');
        api.setupMutationObserver();
        const observer = api.State.mutationObserver;
        const node = { nodeType: ELEMENT_NODE, parentElement: null };

        calls.length = 0;
        env.setMeta('');
        env.setUrl('https://github.com/acme/project/issues/7');
        observer.callback([{ type: 'childList', addedNodes: [node], target: env.document.body }]);

        assert.equal(api.State.pageConfig.currentPageType, 'repository/issues');
        assert.deepEqual(calls, [['traverse', node, 'repository/issues']]);

        env.setMeta('/<user-name>/<repo-name>');
        calls.length = 0;
        env.document.dispatch('turbo:load');
        assert.equal(api.detectPageType(), 'repository/issues');
        assert.equal(api.State.pageConfig.currentPageType, 'repository/issues');
        assert.deepEqual(calls, ['title', 'selector']);

        calls.length = 0;
        env.setMeta('');
        env.setUrl('https://github.com/acme/project/reported_content');
        observer.callback([{ type: 'childList', addedNodes: [node], target: env.document.body }]);
        assert.equal(api.State.pageConfig, null);
        assert.deepEqual(calls, []);
    });
}

test('main.user.js keeps the repository_nwo signal alongside the path fallback', () => {
    const loaded = loadDevDetector('main.user.js', 'locals.js');
    const href = 'https://github.com/acme/project/unknown-feature';
    assert.equal(classifyDev(loaded, href, [], ''), false);
    loaded.env.setNwo('acme/project');
    assert.equal(classifyDev(loaded, href, [], ''), 'repository');
});

test('stable getPage selects repository dictionaries without analytics metadata', () => {
    const loaded = loadStableDetector();
    for (const [href, expected] of repositoryPages) {
        for (const meta of ['', 'unavailable', '/<user-name>/<repo-name>']) {
            assert.equal(classifyStable(loaded, href, ['logged-in'], meta), expected, `${href} [${meta}]`);
        }
    }
    assert.equal(classifyStable(loaded, 'https://github.com/acme', [], '/<user-name>'), false);
});

test('stable getPage keeps global, profile, auth, home, org, and special-host routes', () => {
    const loaded = loadStableDetector();
    for (const [href, classes, expected] of preservedPages('page-dashboard', false)) {
        for (const meta of ['', 'unavailable']) {
            assert.equal(classifyStable(loaded, href, classes, meta), expected, `${href} [${meta}]`);
        }
    }
    assert.equal(
        classifyStable(loaded, 'https://github.com/topics/javascript', [], '/<user-name>/<repo-name>'),
        'repository',
    );
});

test('stable getPage rejects incomplete paths and unknown dictionaries', () => {
    const loaded = loadStableDetector();
    for (const href of rejectedPages) {
        assert.equal(classifyStable(loaded, href, [], ''), false, href);
        assert.equal(classifyStable(loaded, href, [], 'unavailable'), false, href);
    }
    assert.equal(
        classifyStable(loaded, 'https://github.com/acme/project/reported_content', [], '/<user-name>/<repo-name>'),
        false,
    );
    assert.equal(
        classifyStable(loaded, 'https://github.com/acme/project/unknown-feature', [], '/<user-name>/<repo-name>'),
        'repository',
    );
});

test('stable observer resumes translation after navigation without metadata', () => {
    const loaded = loadStableRuntime();
    const { api, env, calls, tasks, observers, I18N } = loaded;
    env.setUrl('https://github.com/settings/profile');
    assert.equal(api.getPage(), 'settings/profile');
    api.watchUpdate();
    const callback = observers[0].callback;
    const node = {
        nodeType: ELEMENT_NODE,
        parentElement: null,
        matches() { return false; },
        closest() { return null; },
    };

    calls.length = 0;
    env.setMeta('');
    env.setUrl('https://github.com/acme/project');
    callback([{ type: 'childList', addedNodes: [node], target: env.document.body }]);

    assert.equal(api.readPage(), 'repository');
    assert.equal(typeof I18N[api.lang][api.readPage()].static.Pin, 'string');
    assert.deepEqual(calls, ['title', ['traverse', node, 'repository']]);
    assert.equal(tasks.length, 1);
    assert.equal(tasks[0].delay, 500);
    tasks.shift().fn();
    assert.deepEqual(calls, [
        'title',
        ['traverse', node, 'repository'],
        'selector',
        ['desc', '.f4.my-3'],
    ]);

    calls.length = 0;
    env.setMeta('/<user-name>/<repo-name>');
    env.setUrl('https://github.com/acme/project?restore=1');
    callback([{ type: 'childList', addedNodes: [node], target: env.document.body }]);
    assert.equal(api.readPage(), 'repository');
    assert.equal(api.getPage(), 'repository');
    assert.deepEqual(calls, ['title', ['traverse', node, 'repository']]);

    calls.length = 0;
    tasks.length = 0;
    env.setMeta('');
    env.setUrl('https://github.com/acme');
    callback([{ type: 'childList', addedNodes: [node], target: env.document.body }]);
    assert.equal(api.readPage(), false);
    assert.equal(tasks.length, 0);
    assert.deepEqual(calls, ['title']);
});
