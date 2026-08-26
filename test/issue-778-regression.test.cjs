const assert = require('node:assert/strict');
const test = require('node:test');

const { loadConfig } = require('./helpers/load-config.cjs');

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
