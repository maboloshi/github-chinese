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
    test(`${fileName} covers classic, React module and current BorderGrid description selectors`, () => {
        const source = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

        for (const token of [
            '.f4.tmp-my-3',
            'SidebarAbout-module_',
            '_description',
            'borderGrid__',
            'description__',
        ]) {
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
        } else {
            assert.match(
                source,
                /State\.featureSet\?\.enable_transDesc[\s\S]{0,240}?transDesc\(descSelector\)/,
                `${fileName} should re-mount the description button in the MutationObserver callback`,
            );
        }
    });
}

test('transDesc inserts exactly one translate button after the matched description', () => {
    const element = createDescriptionElement();
    const document = createDocument(element);
    const transDesc = loadTransDesc(document);

    transDesc('[class*="borderGrid__"] p[class*="description__"]');

    assert.equal(document.selectorQueried, '[class*="borderGrid__"] p[class*="description__"]');
    assert.equal(document.created.length, 1);
    assert.ok(document.created[0].classList.contains('translate-button'));
    assert.equal(element.nextElementSibling, document.created[0]);

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
