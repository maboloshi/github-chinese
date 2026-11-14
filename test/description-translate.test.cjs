const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const runtimeScripts = [
    'main.user.js',
    'main(nju.edu).user.js',
    'main_zh-TW.user.js',
    'main(greasyfork).user.js',
];

const mainScriptPath = path.join(__dirname, '..', 'main.user.js');
const mainSource = fs.readFileSync(mainScriptPath, 'utf8');

function extractFunction(source, functionName) {
    const start = source.indexOf(`    function ${functionName}(`);
    assert.notEqual(start, -1, `${functionName} should exist in the userscript`);

    // 函数后面可能跟着 JSDoc 注释，不能用“下一个 function”定位，改为配对花括号
    let depth = 0;
    let end = start;
    for (let i = start; i < source.length; i += 1) {
        if (source[i] === '{') depth += 1;
        if (source[i] === '}') {
            depth -= 1;
            if (depth === 0) {
                end = i + 1;
                break;
            }
        }
    }
    assert.ok(end > start, `${functionName} body should be balanced`);
    return source.slice(start, end).trim();
}

function createButton() {
    const classes = new Set();
    return {
        tagName: 'DIV',
        textContent: '',
        disabled: false,
        classList: {
            add: (className) => classes.add(className),
            contains: (className) => classes.has(className),
        },
        listeners: {},
        addEventListener(type, handler) {
            this.listeners[type] = handler;
        },
        matches(selector) {
            return selector.split(',').some(part => classes.has(part.trim().replace(/^\./, '')));
        },
    };
}

function createDescriptionElement(text = 'GitHub 汉化插件') {
    return {
        textContent: text,
        nextElementSibling: null,
        after(node) {
            this.nextElementSibling = node;
        },
    };
}

function createDocument(elements) {
    const created = [];
    return {
        created,
        elements: Array.isArray(elements) ? elements : [elements],
        selectorQueried: null,
        querySelectorAll(selector) {
            this.selectorQueried = selector;
            return this.elements;
        },
        createElement(tagName) {
            const button = createButton();
            button.tagName = tagName.toUpperCase();
            created.push(button);
            return button;
        },
    };
}

function loadTransDesc(document) {
    const context = vm.createContext({ document, handleTransClick: () => {} });
    return vm.runInContext(`(${extractFunction(mainSource, 'transDesc')})`, context, {
        filename: mainScriptPath,
    });
}

function loadWatchReactCommits() {
    let callback = null;
    let options = null;
    let mounts = 0;
    const context = vm.createContext({
        PerformanceObserver: class {
            constructor(handler) { callback = handler; }
            observe(observeOptions) { options = observeOptions; }
        },
        safe: fn => fn,
        mountDescButton: () => { mounts += 1; },
        console: { error() {} },
    });
    const watchReactCommits = vm.runInContext(
        `(${extractFunction(mainSource, 'watchReactCommits')})`,
        context,
        { filename: mainScriptPath },
    );
    watchReactCommits();
    return {
        get mounts() { return mounts; },
        options,
        notify: (names) => callback({ getEntries: () => names.map(name => ({ name })) }),
    };
}

for (const fileName of runtimeScripts) {
    test(`${fileName} covers the BorderGrid fallback description selector`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

        for (const token of ['borderGrid__', 'description__']) {
            assert.ok(
                source.includes(token),
                `${fileName} should include ${token} in the repository description selectors`,
            );
        }
    });

    test(`${fileName} keeps the description translate button mounted`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

        if (fileName === 'main(greasyfork).user.js') {
            assert.match(
                source,
                /if \(page === "repository"\) \{[^}]{0,120}transDesc\(REPOSITORY_DESC_SELECTOR\)/,
                `${fileName} should re-mount the description button on mutations`,
            );
        } else if (fileName === 'main.user.js') {
            // 首次载入与 Turbo 换页共用 applyPage：载入 / 导航后挂一次；
            // React 之后替换侧栏时，由碰了描述节点的突变批次补挂
            assert.match(
                source,
                /applyPage\('首次载入'\)/,
                `${fileName} should apply the first page through the unified entry`,
            );
            assert.match(
                source,
                /safe\(mountDescButton, '描述翻译'\)\(\)/,
                `${fileName} should mount the description button for non-React pages`,
            );
            assert.match(
                source,
                /PerformanceObserver[\s\S]{0,240}?react-root:commit:/,
                `${fileName} should mount after the React root commit mark`,
            );
            assert.match(
                source,
                /currentPageType !== 'repository'/,
                `${fileName} should not insert before React takes over repository pages`,
            );
            assert.ok(
                !source.includes('batchTouchesDesc'),
                `${fileName} should not keep the mutation-batch remount`,
            );
            assert.ok(
                !source.includes('enable_descRearm'),
                `${fileName} should not expose a behavior switch for re-mounting`,
            );
        } else if (fileName === 'main(nju.edu).user.js' || fileName === 'main_zh-TW.user.js') {
            // 衍生脚本尚未接入统一入口，仍是载入 + 导航两处各自强制核对
            const traditional = fileName === 'main_zh-TW.user.js';
            const loadLabel = traditional ? '描述翻譯' : '描述翻译';
            const firstLabel = traditional ? '描述按鈕' : '描述按钮';
            assert.match(
                source,
                new RegExp(`safe\\(mountDescButton, '${loadLabel}'\\)\\(true\\)`),
                `${fileName} should mount the description button on load/navigation`,
            );
            assert.match(
                source,
                new RegExp(`safe\\(mountDescButton, '${firstLabel}'\\)\\(true\\)`),
                `${fileName} should mount the description button on first load`,
            );
            assert.match(
                source,
                /mountDescButton\(\);[\s\S]{0,240}?takeRecords\(\)/,
                `${fileName} should re-mount after mutations and drop its own records`,
            );
            assert.ok(
                !source.includes('enable_descRearm'),
                `${fileName} should not expose a behavior switch for re-mounting`,
            );
        } else {
            assert.match(
                source,
                /State\.featureSet\?\.enable_transDesc[\s\S]{0,240}?transDesc\(descSelector\)/,
                `${fileName} should re-mount the description button in the MutationObserver callback`,
            );
        }
    });
}

test('main.user.js 的描述选择器同时覆盖登录态与未登录态结构', () => {
    // 登录态（#811 实测）：<p class="SidebarAbout-module_eqNI3a_description prc-Text-Text-9mHv3">
    // 未登录/桌面：<p class="description__ej4leF prc-Text-Text-9mHv3">
    // 前者不含 description__：只保留 borderGrid 选择器会让登录态按钮消失（f9bcddd 回归）。
    const block = mainSource.match(/DESC_SELECTORS: \{[\s\S]*?\n        \},/);
    assert.ok(block, 'main.user.js should still declare DESC_SELECTORS');

    const effective = block[0]
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n');

    assert.ok(effective.includes('SidebarAbout-module_'), '保留登录态 React 组件选择器');
    assert.ok(effective.includes('_description'), '登录态类名以 _description 结尾');
    assert.ok(effective.includes('borderGrid__'), '保留未登录态 About 侧栏选择器');
    assert.ok(effective.includes('description__'), '未登录态类名以 description__ 开头');
    assert.ok(!effective.includes('.f4.tmp-my-3'), '经典 UI 选择器已失效，不再保留');
});

test('transDesc inserts exactly one translate button after the matched description', () => {
    const element = createDescriptionElement();
    const document = createDocument(element);
    const transDesc = loadTransDesc(document);

    transDesc('[class*="borderGrid__"] p[class*="description__"]');

    assert.equal(document.selectorQueried, '[class*="borderGrid__"] p[class*="description__"]');
    assert.equal(document.created.length, 1);
    assert.ok(document.created[0].classList.contains('translate-button'));
    assert.equal(element.nextElementSibling, document.created[0]);

    // 首次载入与 Turbo 换页会各调一次，重复调用不应插入第二个按钮
    transDesc('[class*="borderGrid__"] p[class*="description__"]');
    assert.equal(document.created.length, 1);
});

test('transDesc 为窄屏与桌面两份描述各挂一个按钮', () => {
    // GitHub 同时渲染 NarrowOnly 与 HideWhenNarrow 两份 About 描述，靠 CSS 决定显示哪份；
    // 只挂 querySelector 的第一个会让宽屏那份没有按钮。
    const narrow = createDescriptionElement('narrow');
    const desktop = createDescriptionElement('desktop');
    const document = createDocument([narrow, desktop]);
    const transDesc = loadTransDesc(document);

    transDesc('p[class*="SidebarAbout-module_"][class*="_description"]');

    assert.equal(document.created.length, 2, '两份描述各得到一个按钮');
    assert.equal(narrow.nextElementSibling, document.created[0]);
    assert.equal(desktop.nextElementSibling, document.created[1]);

    // 再次挂载只补缺失的那份，不给已有按钮的描述再插一个
    const third = createDescriptionElement('third');
    document.elements = [narrow, desktop, third];
    transDesc('p[class*="SidebarAbout-module_"][class*="_description"]');
    assert.equal(document.created.length, 3);
    assert.equal(third.nextElementSibling, document.created[2]);
});

test('transDesc re-attaches the button after React replaces the description node', () => {
    const firstElement = createDescriptionElement('first');
    const document = createDocument(firstElement);
    const transDesc = loadTransDesc(document);

    transDesc('[class*="borderGrid__"] p[class*="description__"]');
    assert.equal(document.created.length, 1);

    // GitHub React 用新节点替换旧描述节点，旧按钮随旧节点一起消失；
    // 下一次载入 / 导航重新挂载时，新节点会拿到按钮
    const secondElement = createDescriptionElement('second');
    document.elements = [secondElement];

    transDesc('[class*="borderGrid__"] p[class*="description__"]');

    assert.equal(document.created.length, 2);
    assert.equal(firstElement.nextElementSibling, document.created[0]);
    assert.equal(secondElement.nextElementSibling, document.created[1]);
});

for (const fileName of ['main.user.js', 'main(nju.edu).user.js', 'main_zh-TW.user.js']) {
    test(`${fileName} skips re-mount when the translation result is already shown`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

        if (fileName === 'main.user.js') {
            assert.match(
                source,
                /matches\('\.translate-button, \.translation-result'\)/,
                `${fileName} should skip mounting when a button or result already follows`,
            );
        } else {
            assert.match(
                source,
                /contains\('translate-button'\)[\s\S]{0,160}?contains\('translation-result'\)/,
                `${fileName} should also check for an existing translation result in transDesc`,
            );
        }
    });
}

test('watchReactCommits 只在 React root 提交 mark 时挂载描述按钮', () => {
    const harness = loadWatchReactCommits();
    // Chromium 不支持 entryTypes + buffered（控制台报 warning 且 buffered 被忽略），必须是单个 type
    assert.equal(harness.options.type, 'mark');
    assert.equal(harness.options.entryTypes, undefined);
    assert.equal(harness.options.buffered, true);

    harness.notify(['react-root:render-start:code-view', 'unrelated-mark']);
    assert.equal(harness.mounts, 0, '提交之前的 mark 不挂载');

    harness.notify(['react-root:commit:code-view']);
    assert.equal(harness.mounts, 1);

    harness.notify(['react-root:commit:repo']);
    assert.equal(harness.mounts, 2, '软导航换 root 名后仍能挂载');
});

test('transDesc does not insert a new button when the translation result is already shown', () => {
    const element = createDescriptionElement();
    // 翻译完成后的 DOM：按钮已被 showTransResult 移除，结果容器插在描述后面
    element.nextElementSibling = { matches: () => true };
    const document = createDocument(element);
    const transDesc = loadTransDesc(document);

    // 载入 / 导航再次挂载时不得再插按钮，否则每次换页都会多一个翻译框
    transDesc('[class*="borderGrid__"] p[class*="description__"]');

    assert.equal(document.created.length, 0);
});
