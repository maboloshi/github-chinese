const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const editableSelectors = [
    'input',
    'textarea',
    '[contenteditable=""]',
    '[contenteditable="true"]',
    '[contenteditable="plaintext-only"]',
];

function loadConfig() {
    const filePath = `${__dirname}/../locals.js`;
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N.conf;
}

test('locals.js keeps editable content out of translation', () => {
    const config = loadConfig();

    for (const selector of editableSelectors) {
        assert.ok(
            config.ignoreMutationSelectorPage['*'].includes(selector),
            `${selector} must be ignored by MutationObserver translation`,
        );
        assert.ok(
            config.ignoreSelectorPage['*'].includes(selector),
            `${selector} must be ignored during the initial DOM traversal`,
        );
    }
});
