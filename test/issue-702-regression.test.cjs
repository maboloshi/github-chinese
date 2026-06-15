const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const localeFiles = [
    'locals.js',
    'locals(greasyfork).js',
    'locals_zh-TW.js',
];

const protectedReactSelectors = [
    'header.GlobalNav',
    '#__primerPortalRoot__',
];

function loadConfig(fileName) {
    const filePath = path.join(__dirname, '..', fileName);
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N.conf;
}

for (const fileName of localeFiles) {
    test(`${fileName} protects the React global navigation from translation`, () => {
        const config = loadConfig(fileName);
        const mutationSelectors = config.ignoreMutationSelectorPage['*'];
        const traversalSelectors = config.ignoreSelectorPage['*'];

        for (const selector of protectedReactSelectors) {
            assert.ok(
                mutationSelectors.includes(selector),
                `${selector} must be ignored by MutationObserver translation`,
            );
            assert.ok(
                traversalSelectors.includes(selector),
                `${selector} must be ignored during the initial DOM traversal`,
            );
        }
    });
}
