const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const repository = 'https://github.com/octocat/hello-world';
const issues = `${repository}/issues`;

function eventTarget() {
    const listeners = new Map();
    return {
        listeners,
        addEventListener(type, callback, options) {
            const entries = listeners.get(type) || [];
            entries.push({ callback, once: options?.once });
            listeners.set(type, entries);
        },
        dispatch(type, properties = {}) {
            for (const entry of [...(listeners.get(type) || [])]) {
                if (entry.once) {
                    listeners.set(type, listeners.get(type).filter(item => item !== entry));
                }
                entry.callback({ type, ...properties });
            }
        },
    };
}

function body() {
    const root = { nodeType: 1, children: [], matches: () => false };
    root.text = { nodeType: 3, data: 'Open', parentElement: root };
    root.children.push(root.text);
    return root;
}

function loadRuntime(fileName, { urlchange = false, supported = true, loading = false } = {}) {
    const filePath = path.join(__dirname, '..', fileName);
    const source = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    const window = { ...eventTarget(), location: new URL(repository) };
    if (supported) window.onurlchange = null;
    const walks = [];
    const errors = [];
    const work = { title: 0, selector: 0, description: 0, menus: 0 };
    const timers = new Map();
    const observers = [];
    let timerId = 0;
    const document = {
        ...eventTarget(),
        readyState: loading ? 'loading' : 'complete',
        body: loading ? null : body(),
        createTreeWalker(root, mask, filter) {
            walks.push({ root, url: window.location.href });
            if (root.fail) throw new Error('translation failure');
            const nodes = [];
            function visit(parent) {
                for (const child of parent.children || []) {
                    if (filter(child) === 2) continue;
                    nodes.push(child);
                    visit(child);
                }
            }
            visit(root);
            return { nextNode: () => nodes.shift() || null };
        },
    };
    const context = vm.createContext({
        window, document,
        console: { log() {}, error: (...args) => errors.push(args) },
        performance: { now: () => 0 },
        Node: { ELEMENT_NODE: 1, TEXT_NODE: 3 },
        NodeFilter: { SHOW_ELEMENT: 1, SHOW_TEXT: 4, FILTER_REJECT: 2, FILTER_ACCEPT: 1 },
        GM_getValue: (key, fallback) => fallback,
        CONFIG: { OBSERVER_CONFIG: { childList: true, subtree: true }, DESC_SELECTORS: { repository: '.description' } },
        MutationObserver: class {
            constructor(callback) {
                this.callback = callback;
                this.target = null;
                this.disconnects = 0;
                observers.push(this);
            }
            disconnect() { this.target = null; this.disconnects++; }
            observe(target) { assert.ok(target, 'cannot observe a missing body'); this.target = target; }
        },
        setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
        clearTimeout(id) { timers.delete(id); },
        checkI18NLoaded() {},
        setupReactGlobalNavTranslation() {},
        initLangEnv() {},
        injectStyles() {},
        setupMenuCommands() { work.menus++; },
        detectPageType() {
            if (window.location.pathname === '/unsupported') return null;
            return window.location.pathname.includes('/issues') ? 'repository/issues' : 'repository';
        },
        buildPageConfig(currentPageType) {
            return { currentPageType, currentPath: window.location.pathname, ignoreSelectors: '.protected' };
        },
        handleTextNode(node) { node.data = `translated:${context.State.pageConfig.currentPageType}`; },
        handleElementNode() {},
        isReactGlobalNavPortalNode: () => false,
        transTitle() { work.title++; },
        transBySelector() { work.selector++; },
        transDesc() { work.description++; },
    });
    // Execute production declarations, including registration, traversal and mutation processing.
    const state = source.match(/^    const State = \{[\s\S]*?^    \};/m);
    assert.ok(state);
    const names = [
        'safe', 'init', 'setupInitTrans', 'setupUrlChangeListener', 'handleUrlChange',
        'setupTurboEvents', 'handleTurboLoad', 'updatePageConfig', 'setupMutationObserver',
        'shouldIgnoreMutationNode', 'processMutations', 'traverseNode',
    ];
    const functions = names.map(name => {
        const declaration = source.match(new RegExp(`^    function ${name}\\([^]*?^    }`, 'm'));
        assert.ok(declaration, `${fileName}: ${name}`);
        return declaration[0];
    });
    vm.runInContext(`${state[0]}\nthis.State = State;\n${functions.join('\n')}`, context, { filename: filePath });
    context.State.featureSet.enable_onurlchange = urlchange;
    context.init();
    return {
        context, window, document, walks, errors, work, timers, observers,
        navigate(url, nextBody = document.body) { window.location = new URL(url); document.body = nextBody; },
        flush() {
            const pending = [...timers.values()];
            timers.clear();
            pending.forEach(callback => callback());
        },
        mutate(target = document.body) {
            observers.filter(observer => observer.target === target).forEach(observer => observer.callback([
                { type: 'childList', target, addedNodes: [target.text] },
            ]));
        },
    };
}

function assertObserved(runtime, expectedBody, pageType = 'repository/issues') {
    assert.equal(runtime.context.State.currentURL, runtime.window.location.href);
    assert.equal(runtime.context.State.pageConfig.currentPageType, pageType);
    assert.equal(runtime.context.State.pageConfig.currentPath, runtime.window.location.pathname);
    assert.equal(expectedBody.text.data, `translated:${pageType}`);
    assert.deepEqual(runtime.observers.filter(observer => observer.target).map(observer => observer.target), [expectedBody]);
    assert.ok(runtime.walks.some(walk => walk.root === expectedBody), 'uses production body traversal');
    expectedBody.text.data = 'new dynamic content';
    runtime.mutate(expectedBody);
    assert.equal(expectedBody.text.data, `translated:${pageType}`);
}

for (const fileName of ['main.user.js', 'main(nju.edu).user.js', 'main_zh-TW.user.js']) {
    test(`${fileName}: Turbo replacement refreshes configuration and observation`, () => {
        const runtime = loadRuntime(fileName);
        const originalObserver = runtime.context.State.mutationObserver;
        const replacement = body();
        runtime.navigate(issues, replacement);
        runtime.document.dispatch('turbo:load');
        assertObserved(runtime, replacement);
        assert.ok(originalObserver.disconnects > 0);
        assert.equal(originalObserver.target, null);
        assert.equal(runtime.work.title, 1);
        assert.equal(runtime.work.selector, 1);
    });

    for (const lateBody of [false, true]) {
        test(`${fileName}: Back/Forward with ${lateBody ? 'late' : 'early'} body replacement`, () => {
            const runtime = loadRuntime(fileName);
            for (const [url, pageType] of [[issues, 'repository/issues'], [repository, 'repository']]) {
                const replacement = body();
                runtime.navigate(url, lateBody ? runtime.document.body : replacement);
                runtime.window.dispatch('popstate');
                runtime.flush();
                if (lateBody) runtime.document.body = replacement;
                else assertObserved(runtime, replacement, pageType);
                runtime.document.dispatch('turbo:render');
                assertObserved(runtime, replacement, pageType);
                runtime.document.dispatch('turbo:load');
                assertObserved(runtime, replacement, pageType);
            }
        });
    }

    for (const options of [{ urlchange: true }, { urlchange: false }, { urlchange: true, supported: false }]) {
        test(`${fileName}: early URL notification ${JSON.stringify(options)} cannot suppress render`, () => {
            const runtime = loadRuntime(fileName, options);
            runtime.navigate(issues);
            if (runtime.context.State.urlChangeHandler) runtime.window.dispatch('urlchange');
            else runtime.mutate();
            assert.equal(runtime.context.State.currentURL, issues);
            for (let i = 0; i < 2; i++) {
                const restored = body();
                runtime.document.body = restored;
                runtime.document.dispatch('turbo:render');
                assertObserved(runtime, restored);
                runtime.document.dispatch('turbo:load');
                assertObserved(runtime, restored);
            }
        });
    }

    test(`${fileName}: pageshow restores unchanged URLs but initial/hash history stays idle`, () => {
        const runtime = loadRuntime(fileName);
        const count = runtime.walks.length;
        runtime.window.dispatch('pageshow', { persisted: false });
        runtime.flush();
        runtime.navigate(`${repository}#readme`);
        runtime.window.dispatch('popstate');
        runtime.flush();
        assert.equal(runtime.walks.length, count);
        assert.equal(runtime.context.State.currentURL, runtime.window.location.href);
        for (const replace of [false, true]) {
            if (replace) runtime.document.body = body();
            runtime.document.body.text.data = 'restored';
            runtime.window.dispatch('pageshow', { persisted: true });
            runtime.window.dispatch('popstate');
            runtime.flush();
            assertObserved(runtime, runtime.document.body, 'repository');
        }
        assert.equal(runtime.work.menus, 1);
    });

    test(`${fileName}: early lifecycle waits for a body and unsupported routes recover`, () => {
        const runtime = loadRuntime(fileName, { loading: true });
        assert.doesNotThrow(() => runtime.context.setupMutationObserver());
        runtime.document.dispatch('turbo:render');
        runtime.window.dispatch('popstate');
        runtime.flush();
        assert.equal(runtime.observers.filter(observer => observer.target).length, 0);
        assert.equal(runtime.errors.length, 0);
        runtime.navigate('https://github.com/unsupported', body());
        runtime.window.dispatch('DOMContentLoaded');
        runtime.document.dispatch('turbo:load');
        assert.equal(runtime.context.State.pageConfig, null);
        assert.equal(runtime.context.State.mutationObserver.target, runtime.document.body);
        runtime.navigate(issues, body());
        runtime.document.dispatch('turbo:render');
        assertObserved(runtime, runtime.document.body);
        const count = runtime.walks.length;
        runtime.window.dispatch('DOMContentLoaded');
        assert.equal(runtime.walks.length, count);
    });

    test(`${fileName}: rapid history uses the final destination without accumulating listeners`, () => {
        const runtime = loadRuntime(fileName);
        const count = runtime.walks.length;
        runtime.navigate(issues, body());
        runtime.window.dispatch('popstate');
        const finalBody = body();
        runtime.navigate(repository, finalBody);
        runtime.window.dispatch('popstate');
        assert.equal(runtime.walks.length, count, 'history work is deferred');
        assert.equal(runtime.timers.size, 1);
        runtime.flush();
        assert.equal(runtime.walks.length, count + 1);
        assert.equal(runtime.walks.at(-1).url, repository);
        assertObserved(runtime, finalBody, 'repository');
        for (let i = 0; i < 5; i++) {
            runtime.document.dispatch('turbo:render');
            runtime.document.dispatch('turbo:load');
        }
        assertObserved(runtime, finalBody, 'repository');
        for (const type of ['popstate', 'pageshow']) assert.equal(runtime.window.listeners.get(type).length, 1);
        for (const type of ['turbo:render', 'turbo:load']) assert.equal(runtime.document.listeners.get(type).length, 1);
        assert.equal(runtime.work.menus, 1);
    });

    test(`${fileName}: rendering before deferred history keeps the final route configuration`, () => {
        const runtime = loadRuntime(fileName);
        for (const url of [issues, `${issues}/684`, `${issues}/684?view=all`]) {
            runtime.navigate(url, body());
            runtime.window.dispatch('popstate');
            runtime.document.dispatch('turbo:render');
            runtime.document.dispatch('turbo:load');
            runtime.flush();
            assertObserved(runtime, runtime.document.body);
        }
    });

    test(`${fileName}: refresh preserves exclusions, feature flags and error boundaries`, () => {
        const runtime = loadRuntime(fileName);
        const protectedText = { nodeType: 3, data: 'user content' };
        runtime.document.body.children.push({
            nodeType: 1, children: [protectedText], matches: selector => selector === '.protected',
        });
        runtime.document.dispatch('turbo:render');
        assert.equal(protectedText.data, 'user content');
        assert.equal(runtime.work.description, 1);
        runtime.context.State.featureSet.enable_transDesc = false;
        runtime.document.dispatch('turbo:load');
        assert.equal(runtime.work.description, 1);
        runtime.document.body.fail = true;
        assert.doesNotThrow(() => runtime.document.dispatch('turbo:load'));
        assert.equal(runtime.errors.length, 1);
        assert.equal(runtime.work.title, 3);
        assert.equal(runtime.work.selector, 3);
        assert.equal(runtime.context.State.mutationObserver.target, runtime.document.body);
        runtime.context.handleTextNode = () => { throw new Error('mutation failure'); };
        assert.doesNotThrow(() => runtime.mutate());
        assert.equal(runtime.errors.length, 2);
        runtime.document.body.fail = false;
        runtime.context.transTitle = () => { throw new Error('title failure'); };
        assert.doesNotThrow(() => runtime.document.dispatch('turbo:load'));
        assert.equal(runtime.work.selector, 4, 'a title failure does not prevent selector translation');
        assert.equal(runtime.context.State.mutationObserver.target, runtime.document.body);
    });
}
