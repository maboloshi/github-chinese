const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

class TextNode {
    constructor(data) {
        this.nodeType = TEXT_NODE;
        this.data = data;
        this.parentElement = null;
    }

    get textContent() {
        return this.data;
    }

    set textContent(value) {
        this.data = value;
    }
}

class Element {
    constructor(tagName, attributes = {}) {
        this.nodeType = ELEMENT_NODE;
        this.tagName = tagName.toUpperCase();
        this.attributes = { ...attributes };
        this.childNodes = [];
        this.parentElement = null;
        this.listeners = new Map();
    }

    append(...nodes) {
        nodes.forEach(node => {
            const child = typeof node === 'string' ? new TextNode(node) : node;
            child.parentElement = this;
            this.childNodes.push(child);
        });
    }

    addEventListener(type, listener) {
        this.listeners.set(type, listener);
    }

    click() {
        this.listeners.get('click')?.();
    }

    get textContent() {
        return this.childNodes.map(node => node.textContent).join('');
    }

    set textContent(value) {
        this.childNodes.forEach(node => {
            node.parentElement = null;
        });
        this.childNodes = [];
        this.append(value);
    }

    getAttribute(name) {
        return this.attributes[name] ?? null;
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    matches(selector) {
        return selector.split(',').some(part => part.trim().toLowerCase() === this.tagName.toLowerCase());
    }

    closest(selector) {
        if (selector.includes('qbsearch-input') && this.tagName === 'QBSEARCH-INPUT') return this;
        if (selector.includes('[class*="Search-module__"]')
            && this.getAttribute('class')?.includes('Search-module__')) return this;
        if (selector.includes('#__primerPortalRoot__')
            && this.getAttribute('id') === '__primerPortalRoot__') return this;
        return this.parentElement?.closest(selector) || null;
    }

    querySelector() {
        return null;
    }

    querySelectorAll() {
        return [];
    }
}

function loadGlobalNavTranslation(document) {
    const filePath = path.join(__dirname, '..', 'main.user.js');
    const source = fs.readFileSync(filePath, 'utf8');
    const start = source.indexOf('    function setupReactGlobalNavTranslation(');
    const end = source.indexOf('\n\n    /* =========================== MutationObserver', start);
    assert.notEqual(start, -1);
    assert.notEqual(end, -1);

    const setupSource = source.slice(start, end).trim().replace(
        '        // ----- 初始化入口 -----',
        `        return {
            canTranslateReactGlobalNavHeader,
            translateReactGlobalNavSearchButton,
            translateReactGlobalNavSearchDialog,
        };

        // ----- 初始化入口 -----`,
    );
    const context = vm.createContext({
        document,
        window: {},
        I18N: {
            conf: {
                reactGlobalNavLabels: {
                    'Type / to search': '输入 / 搜索',
                    Search: '搜索',
                },
            },
        },
        Node: { ELEMENT_NODE, TEXT_NODE },
    });
    const setup = vm.runInContext(`(${setupSource})`, context, { filename: filePath });

    return setup();
}

function createFixture() {
    const header = new Element('header', { class: 'GlobalNav' });
    const searchButton = new Element('button', { class: 'Search-module__button__abc' });
    const placeholder = new Element('span', { class: 'Search-module__placeholder__abc' });
    const shortcut = new Element('kbd', { 'aria-hidden': 'true' });
    shortcut.append('/');
    placeholder.append('Type ', shortcut, ' to search');
    searchButton.append(placeholder);
    header.append(searchButton);

    const input = new Element('input');
    const dialogHeader = new Element('h2', { id: 'search-suggestions-dialog-header' });
    dialogHeader.append('Search');
    const suggestion = new Element('div', { class: 'dynamic-suggestion' });
    const suggestionControl = new Element('button');
    suggestionControl.append('octocat/github-chinese');
    suggestion.append(suggestionControl);
    const dialog = new Element('div', { id: 'search-suggestions-dialog', role: 'dialog' });
    dialog.append(input, dialogHeader, suggestion);

    let dialogOpen = false;
    searchButton.addEventListener('click', () => {
        if (shortcut.parentElement === placeholder) dialogOpen = true;
    });

    const document = {
        readyState: 'complete',
        activeElement: null,
        querySelector(selector) {
            if (selector === 'header.GlobalNav') return header;
            if (selector.includes('Search-module__placeholder__')) return placeholder;
            if (selector === '#search-suggestions-dialog') return dialogOpen ? dialog : null;
            if (selector === '#__primerPortalRoot__ [role="dialog"]') return dialogOpen ? dialog : null;
            return null;
        },
        getElementById(id) {
            return id === 'search-suggestions-dialog-header' && dialogOpen ? dialogHeader : null;
        },
    };

    dialog.querySelectorAll = selector => {
        if (selector === '.ActionList-sectionDivider-title') return [];
        if (selector === '.search-feedback-prompt a, .search-feedback-prompt button') return [];
        return [];
    };

    return {
        document,
        dialog,
        dialogHeader,
        input,
        placeholder,
        searchButton,
        shortcut,
        suggestion,
        suggestionControl,
        isDialogOpen: () => dialogOpen,
    };
}

test('translates the mixed search label without replacing React-owned shortcut markup', () => {
    const fixture = createFixture();
    const translation = loadGlobalNavTranslation(fixture.document);

    translation.translateReactGlobalNavSearchButton();

    assert.equal(fixture.placeholder.textContent, '输入 / 搜索');
    assert.equal(fixture.shortcut.parentElement, fixture.placeholder);
    assert.equal(fixture.placeholder.childNodes[1], fixture.shortcut);
    assert.equal(fixture.shortcut.getAttribute('aria-hidden'), 'true');
});

test('the translated search control retains its activation path', () => {
    const fixture = createFixture();
    const translation = loadGlobalNavTranslation(fixture.document);

    translation.translateReactGlobalNavSearchButton();
    fixture.searchButton.click();

    assert.equal(fixture.isDialogOpen(), true);
    assert.equal(fixture.document.querySelector('#search-suggestions-dialog'), fixture.dialog);
});

test('active search guard and dialog translation leave input and suggestions untouched', () => {
    const fixture = createFixture();
    const translation = loadGlobalNavTranslation(fixture.document);
    fixture.searchButton.click();
    fixture.document.activeElement = {
        closest(selector) {
            return selector.includes('Search-module__') ? fixture.searchButton : null;
        },
    };
    fixture.input.value = 'user query';

    assert.equal(translation.canTranslateReactGlobalNavHeader(), false);
    translation.translateReactGlobalNavSearchDialog();

    assert.equal(fixture.dialogHeader.textContent, '搜索');
    assert.equal(fixture.input.value, 'user query');
    assert.equal(fixture.suggestion.textContent, 'octocat/github-chinese');
    assert.equal(fixture.suggestion.childNodes[0], fixture.suggestionControl);
});
