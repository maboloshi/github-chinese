const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const localeFiles = [
    'locals.js',
];

const globalTranslationSkipSelectors = [
    '.highlight',
    '.notranslate',
    '[translate="no"]',
];

function loadConfig(fileName) {
    const filePath = `${__dirname}/../${fileName}`;
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N.conf;
}

test('locals.js keeps repository tree README content out of translation', () => {
    const config = loadConfig('locals.js');
    const selector = 'article.markdown-body';

    assert.ok(
        config.ignoreMutationSelectorPage['repository/tree'].includes(selector),
        `${selector} must be ignored by MutationObserver translation`,
    );
    assert.ok(
        config.ignoreSelectorPage['repository/tree'].includes(selector),
        `${selector} must be ignored during the initial DOM traversal`,
    );
});

for (const fileName of localeFiles) {
    test(`${fileName} honors global translation-skip regions`, () => {
        const config = loadConfig(fileName);

        for (const selector of globalTranslationSkipSelectors) {
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
}
