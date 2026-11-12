// 观察器回调按帧合并：同一帧内的多次回调只遍历一次，换 body 时丢弃旧批次。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8');

function extractFunction(name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist`);
    let depth = 0;
    for (let index = start; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') {
            depth -= 1;
            if (depth === 0) return source.slice(start, index + 1);
        }
    }
    assert.fail(`could not extract ${name}`);
}

function createHarness() {
    const frames = [];
    const cancelled = [];
    const processed = [];
    const updates = [];
    let descCalls = 0;
    let observer = null;

    const window = {
        location: { href: 'https://github.com/owner/repo' },
        requestAnimationFrame(callback) {
            frames.push(callback);
            return frames.length;
        },
        cancelAnimationFrame(id) {
            cancelled.push(id);
        },
    };
    const context = vm.createContext({
        window,
        document: { body: {} },
        console: { log() {}, error() {} },
        CONFIG: { DESC_SELECTORS: { repository: '.description' }, OBSERVER_CONFIG: {} },
        State: {
            currentURL: window.location.href,
            urlChangeHandler: null,
            pageConfig: { currentPageType: 'repository' },
            pendingMutations: [],
            mutationFlush: null,
            featureSet: { enable_transDesc: true },
        },
        MutationObserver: class {
            constructor(callback) {
                observer = this;
                this.callback = callback;
                this.target = null;
            }
            observe(target) { this.target = target; }
            disconnect() { this.target = null; }
        },
        safe: fn => fn,
        processMutations: batch => processed.push(batch),
        transDesc: () => { descCalls += 1; },
        updatePageConfig: trigger => updates.push(trigger),
    });

    const functions = ['createMutationObserver', 'flushMutationBatch', 'scheduleMutationFlush', 'resetMutationBatch']
        .map(name => extractFunction(name))
        .join('\n');
    vm.runInContext(functions, context);

    return {
        window, context, frames, cancelled, processed, updates,
        get descCalls() { return descCalls; },
        get observer() { return observer; },
    };
}

const record = (id) => ({ type: 'childList', target: {}, addedNodes: [], id });

test('同一帧内的多次回调只处理一次', () => {
    const harness = createHarness();
    const observer = vm.runInContext('createMutationObserver()', harness.context);

    observer.callback([record(1)]);
    observer.callback([record(2)]);

    assert.equal(harness.processed.length, 0, '未到帧末不应遍历');
    assert.equal(harness.frames.length, 1, '一帧只排一次');

    harness.frames[0]();
    assert.equal(harness.processed.length, 1);
    assert.deepEqual(harness.processed[0].map(item => item.id), [1, 2]);
    assert.equal(harness.descCalls, 1, '描述重挂一轮只做一次');
});

test('flush 之后的新回调会重新排期', () => {
    const harness = createHarness();
    const observer = vm.runInContext('createMutationObserver()', harness.context);

    observer.callback([record(1)]);
    harness.frames[0]();
    observer.callback([record(2)]);

    assert.equal(harness.frames.length, 2);
    harness.frames[1]();
    assert.equal(harness.processed.length, 2);
});

test('换 body 时取消已排期的批次并清空缓存记录', () => {
    const harness = createHarness();
    const observer = vm.runInContext('createMutationObserver()', harness.context);

    observer.callback([record(1)]);
    vm.runInContext('resetMutationBatch()', harness.context);
    assert.deepEqual(harness.cancelled, [1]);
    assert.equal(harness.context.State.pendingMutations.length, 0);

    // 旧帧回调即使被执行，也不应再处理被丢弃的记录
    harness.frames[0]();
    assert.equal(harness.processed.length, 0);
});

test('URL 变化仍在回调里同步更新页面配置', () => {
    const harness = createHarness();
    const observer = vm.runInContext('createMutationObserver()', harness.context);

    harness.window.location.href = 'https://github.com/owner/repo/issues';
    observer.callback([record(1)]);

    assert.equal(harness.context.State.currentURL, 'https://github.com/owner/repo/issues');
    assert.equal(harness.updates.length, 1);
});
