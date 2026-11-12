// 内容跳过区：仓库文件树的 README 正文、PR 提交消息都不参与翻译。
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

for (const fileName of [
    'locals.js',
    'locals_zh-TW.js',
    'locals(greasyfork).js',
]) {
    test(`${fileName} completely skips pull-request commit messages`, () => {
        const config = loadConfig(fileName);

        for (const selector of [// 提交消息区域的忽略选择器（经典 UI + 新版 React，与 repository/commit 一致 + 容器加固）
            'div.commit-title',                                          // 提交标题（经典 UI）
            'div.commit-desc',                                           // 提交说明（经典 UI）
            'span.ws-pre-wrap',                                          // 提交说明（新版）
            "h4[class^='Title-module__heading']",                        // 提交标题（新版）
            'div[class^="CommitHeader-module__commitMessageContainer"]', // PR changes 页提交消息容器
        ]) {
            assert.ok(
                config.ignoreMutationSelectorPage['repository/pull'].includes(selector),
                `${selector} must be ignored by MutationObserver translation`,
            );
            assert.ok(
                config.ignoreSelectorPage['repository/pull'].includes(selector),
                `${selector} must be ignored during the initial DOM traversal`,
            );
        }
    });
}
