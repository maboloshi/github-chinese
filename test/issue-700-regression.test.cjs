const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

const localeFiles = [
    'locals.js',
];

function loadConfig(fileName) {
    const filePath = `${__dirname}/../${fileName}`;
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N.conf;
}

for (const fileName of localeFiles) {
    test(`${fileName} keeps repository tree README content out of translation`, () => {
        const config = loadConfig(fileName);
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
}
