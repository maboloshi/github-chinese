// #684 / #792：浏览器前进/后退（含 bfcache 恢复）后，页面必须重新翻译并重新挂观察器
//
// 只覆盖主脚本。衍生脚本尚未同步。
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
    const root = { nodeType: 1, children: [], matches: () => false, closest: () => null };
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
    const work = { title: 0, selector: 0, description: 0, menus: 0, builds: 0 };
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
        window,
        document,
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
            takeRecords() { return []; }
        },
        setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
        clearTimeout(id) { timers.delete(id); },
        checkI18NLoaded() {},
        initLangEnv() {},
        injectStyles() {},
        setupMenuCommands() { work.menus++; },
        detectPageType() {
            if (window.location.pathname === '/unsupported') return null;
            return window.location.pathname.includes('/issues') ? 'repository/issues' : 'repository';
        },
        buildPageConfig(currentPageType) {
            work.builds += 1;
            return { currentPageType, currentPath: window.location.pathname, ignoreSelectors: '.protected' };
        },
        handleTextNode(node) { node.data = `translated:${context.State.pageConfig.currentPageType}`; },
        handleElementNode() {},
        transTitle() { work.title++; },
        transBySelector() { work.selector++; },
        transDesc() { work.description++; },
    });
    // 执行生产代码里的声明：注册、遍历、变更处理都必须是真的那一份
    const state = source.match(/^    const State = \{[\s\S]*?^    \};/m);
    assert.ok(state);
    const names = [
        'safe', 'init', 'setupInitTrans', 'setupUrlChangeListener', 'handleUrlChange',
        'setupTurboEvents', 'handleTurboLoad', 'updatePageConfig',
        'applyPage', 'traversePage', 'hasFreshTraversal', 'markPageTraversed',
        'createMutationObserver', 'attachMutationObserver', 'scheduleIdleTraversal', 'setupMutationObserver',
        'flushMutationBatch', 'scheduleMutationFlush', 'resetMutationBatch',
        'mountDescButton',
        'watchReactCommits',
        'shouldIgnoreMutationNode', 'processMutations', 'traverseNode', 'isBreadcrumbIdentifierLink',
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

const fileName = 'main.user.js';

test(`${fileName}: Turbo 换 body 后刷新配置与观察目标`, () => {
    const runtime = loadRuntime(fileName);
    const originalObserver = runtime.context.State.mutationObserver;
    const replacement = body();
    runtime.navigate(issues, replacement);
    runtime.document.dispatch('turbo:load');
    assertObserved(runtime, replacement);
    assert.ok(originalObserver.disconnects > 0);
    assert.equal(originalObserver.target, null);
    // 首次载入已经翻过标题 / 选择器，这次换 body 再应用一次
    assert.equal(runtime.work.title, 2);
    assert.equal(runtime.work.selector, 2);
});

test(`${fileName}: 首次载入即翻标题与选择器，随后的 turbo:load 不重复全量遍历`, () => {
    const runtime = loadRuntime(fileName);
    assert.equal(runtime.work.title, 1, '首次载入也要翻标题，晚注入时不能缺译文');
    assert.equal(runtime.work.selector, 1);

    const walks = runtime.walks.length;
    runtime.document.dispatch('turbo:load');
    assert.equal(runtime.walks.length, walks, '同一 URL + 同一 body 不应再走一遍树');
});

test(`${fileName}: 同一页面类型的站内翻页复用词典与规则配置`, () => {
    const runtime = loadRuntime(fileName);
    const config = runtime.context.State.pageConfig;
    const builds = runtime.work.builds;
    const nextRepo = 'https://github.com/octocat/another-repository';

    runtime.navigate(nextRepo);
    runtime.document.dispatch('turbo:load');

    assert.equal(runtime.context.State.pageConfig, config, '不应为同一页面类型重建配置');
    assert.equal(runtime.work.builds, builds, '不应重新展开词库 / 重算前置过滤');
    assert.equal(config.currentPath, '/octocat/another-repository', '路径仍要跟着导航更新');
});

for (const lateBody of [false, true]) {
    test(`${fileName}: 前进/后退（${lateBody ? 'body 延迟替换' : 'body 立即替换'}）`, () => {
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
    test(`${fileName}: 提前到达的 URL 通知 ${JSON.stringify(options)} 不能吞掉渲染`, () => {
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

test(`${fileName}: 恢复访问在插入前挂好观察器，同步全量遍历让位给空闲补扫`, () => {
    const runtime = loadRuntime(fileName);
    const count = runtime.walks.length;
    const replacement = body();

    runtime.document.dispatch('turbo:visit', { detail: { action: 'restore' } });
    // before-render 时 newBody 还没插入文档
    runtime.document.dispatch('turbo:before-render', { detail: { newBody: replacement } });
    assert.equal(runtime.context.State.observedBody, replacement);
    assert.equal(runtime.context.State.mutationObserver.target, replacement);

    // 换 body 后，React 水合窗口内的改写从第一帧就被接住
    runtime.document.body = replacement;
    replacement.text.data = 'rehydrated english';
    runtime.mutate(replacement);
    assert.equal(replacement.text.data, 'translated:repository');

    runtime.document.dispatch('turbo:render');
    assert.equal(runtime.walks.length, count, '恢复访问不应同步全量遍历');
    assert.ok(runtime.timers.size >= 1, '应安排空闲补扫');

    runtime.document.dispatch('turbo:load');
    assert.equal(runtime.context.State.visitAction, null);
    runtime.flush();
    assert.ok(runtime.walks.length > count, '空闲补扫仍要兜底遍历');
    assertObserved(runtime, replacement, 'repository');
});

test(`${fileName}: 应用访问（advance）仍同步遍历新页面`, () => {
    const runtime = loadRuntime(fileName);
    const count = runtime.walks.length;
    const replacement = body();

    runtime.document.dispatch('turbo:visit', { detail: { action: 'advance' } });
    runtime.document.dispatch('turbo:before-render', { detail: { newBody: replacement } });
    runtime.document.body = replacement;
    runtime.document.dispatch('turbo:load');

    assert.ok(runtime.walks.length > count, '新页面是英文，必须同步遍历');
    assert.equal(runtime.timers.size, 0, '应用访问不需要空闲补扫');
    assertObserved(runtime, replacement, 'repository');
});

test(`${fileName}: bfcache 原样恢复不重翻，观察器仍在工作；纯锚点历史保持空闲`, () => {
    const runtime = loadRuntime(fileName);
    const count = runtime.walks.length;
    const observer = runtime.context.State.mutationObserver;

    // bfcache：文档、观察器、译文都原样还原，没有任何事要做
    runtime.window.dispatch('pageshow', { persisted: true });
    runtime.flush();
    assert.equal(runtime.walks.length, count);
    assert.equal(runtime.context.State.mutationObserver, observer);

    // 恢复后 React 若再改 DOM，活着的观察器仍然接得住
    runtime.document.body.text.data = 'restored english';
    runtime.mutate();
    assert.equal(runtime.document.body.text.data, 'translated:repository');

    // 纯锚点变化不重翻
    runtime.navigate(`${repository}#readme`);
    runtime.window.dispatch('popstate');
    runtime.flush();
    assert.equal(runtime.walks.length, count);
    assert.equal(runtime.context.State.currentURL, runtime.window.location.href);

    // 同 body、换路由：按新路由重翻
    runtime.navigate(issues);
    runtime.window.dispatch('popstate');
    runtime.flush();
    assertObserved(runtime, runtime.document.body, 'repository/issues');
    assert.equal(runtime.work.menus, 1);
});

test(`${fileName}: 生命周期早于 body 时不报错，未知路由能自愈`, () => {
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

test(`${fileName}: 连续历史操作只按最终目的地做一次，且不累积监听器`, () => {
    const runtime = loadRuntime(fileName);
    const count = runtime.walks.length;
    runtime.navigate(issues, body());
    runtime.window.dispatch('popstate');
    const finalBody = body();
    runtime.navigate(repository, finalBody);
    runtime.window.dispatch('popstate');
    assert.equal(runtime.walks.length, count, '历史工作应被推迟');
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
    for (const type of ['popstate']) assert.equal(runtime.window.listeners.get(type).length, 1);
    assert.equal(runtime.window.listeners.get('pageshow'), undefined, 'bfcache 原样恢复不需要监听');
    for (const type of ['turbo:render', 'turbo:load']) assert.equal(runtime.document.listeners.get(type).length, 1);
    assert.equal(runtime.work.menus, 1);
});

test(`${fileName}: 推迟的历史刷新与随后的渲染不会互相覆盖配置`, () => {
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

test(`${fileName}: 刷新保留忽略规则、功能开关与错误边界`, () => {
    const runtime = loadRuntime(fileName);
    const protectedText = { nodeType: 3, data: 'user content' };
    runtime.document.body.children.push({
        nodeType: 1, children: [protectedText], matches: selector => selector === '.protected', closest: () => null,
    });
    runtime.document.dispatch('turbo:render');
    assert.equal(protectedText.data, 'user content');
    // 首次载入挂一次 + turbo:render 挂一次
    assert.equal(runtime.work.description, 2);
    runtime.context.State.featureSet.enable_transDesc = false;
    runtime.document.dispatch('turbo:load');
    assert.equal(runtime.work.description, 2);
    runtime.document.body.fail = true;
    runtime.context.State.lastTraversal = null; // 模拟一次尚未遍历的页面，让失败路径真的走到
    assert.doesNotThrow(() => runtime.document.dispatch('turbo:load'));
    assert.equal(runtime.errors.length, 1);
    assert.equal(runtime.work.title, 4);
    assert.equal(runtime.work.selector, 4);
    assert.equal(runtime.context.State.mutationObserver.target, runtime.document.body);
    runtime.context.handleTextNode = () => { throw new Error('mutation failure'); };
    assert.doesNotThrow(() => runtime.mutate());
    assert.equal(runtime.errors.length, 2);
    runtime.document.body.fail = false;
    runtime.context.transTitle = () => { throw new Error('title failure'); };
    assert.doesNotThrow(() => runtime.document.dispatch('turbo:load'));
    assert.equal(runtime.work.selector, 5, '标题翻译失败不应挡住选择器翻译');
    assert.equal(runtime.context.State.mutationObserver.target, runtime.document.body);
});
