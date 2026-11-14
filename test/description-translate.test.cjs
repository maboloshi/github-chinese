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

function createDocument(element) {
    const created = [];
    return {
        created,
        currentElement: element,
        selectorQueried: null,
        querySelector(selector) {
            this.selectorQueried = selector;
            return this.currentElement;
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

    test(`${fileName} re-mounts the description translate button after React updates`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

        if (fileName === 'main(greasyfork).user.js') {
            assert.match(
                source,
                /if \(page === "repository"\) \{[^}]{0,120}transDesc\(REPOSITORY_DESC_SELECTOR\)/,
                `${fileName} should re-mount the description button on mutations`,
            );
        } else if (fileName === 'main.user.js') {
            // 首次载入与 Turbo 换页共用 applyPage：载入路径同样强制核对描述按钮，
            // 之后由批次按 isConnected 决定是否重挂
            assert.match(
                source,
                /applyPage\('首次载入'\)/,
                `${fileName} should apply the first page through the unified entry`,
            );
            assert.match(
                source,
                /safe\(mountDescButton, '描述翻译'\)\(true\)/,
                `${fileName} should mount the description button on load/navigation`,
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
    assert.equal(
        transDesc('[class*="borderGrid__"] p[class*="description__"]').mount,
        document.created[0],
        '已挂载时应返回现有按钮，供按帧重挂逻辑记住节点',
    );

    // 同一描述节点重复调用不应插入第二个按钮（MutationObserver 会反复触发）
    transDesc('[class*="borderGrid__"] p[class*="description__"]');
    assert.equal(document.created.length, 1);
});

test('transDesc re-attaches the button after React replaces the description node', () => {
    const firstElement = createDescriptionElement('first');
    const document = createDocument(firstElement);
    const transDesc = loadTransDesc(document);

    transDesc('[class*="borderGrid__"] p[class*="description__"]');
    assert.equal(document.created.length, 1);

    // GitHub React 用新节点替换旧描述节点，旧按钮随旧节点一起消失
    const secondElement = createDescriptionElement('second');
    document.currentElement = secondElement;

    transDesc('[class*="borderGrid__"] p[class*="description__"]');

    assert.equal(document.created.length, 2);
    assert.equal(firstElement.nextElementSibling, document.created[0]);
    assert.equal(secondElement.nextElementSibling, document.created[1]);
});

for (const fileName of ['main.user.js', 'main(nju.edu).user.js', 'main_zh-TW.user.js']) {
    test(`${fileName} skips re-mount when the translation result is already shown`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

        assert.match(
            source,
            /contains\('translate-button'\)[\s\S]{0,160}?contains\('translation-result'\)/,
            `${fileName} should also check for an existing translation result in transDesc`,
        );
    });
}

test('transDesc does not insert a new button when the translation result is already shown', () => {
    const element = createDescriptionElement();
    // 翻译完成后的 DOM：按钮已被 showTransResult 移除，结果容器插在描述后面
    element.nextElementSibling = {
        classList: { contains: (className) => className === 'translation-result' },
    };
    const document = createDocument(element);
    const transDesc = loadTransDesc(document);

    // MutationObserver 重挂载不得再插入按钮，否则每次点击都会叠加一个翻译框
    transDesc('[class*="borderGrid__"] p[class*="description__"]');

    assert.equal(document.created.length, 0);
});
