const assert = require('node:assert/strict');
const test = require('node:test');

const { loadConfig } = require('./helpers/load-config.cjs');

const localeFiles = [
    'locals.js',
];

const globalTranslationSkipSelectors = [
    '.highlight',
    '.notranslate',
    '[translate="no"]',
];

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
