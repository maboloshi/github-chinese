'use strict';

// #759：用户名是标识符，不是界面文案；用户资料页 README 是用户内容。
// 这里锁定忽略规则，防止后续调整词库/选择器时重新开始翻译用户名。
const assert = require('node:assert/strict');
const test = require('node:test');

const { loadConfig } = require('./helpers/load-config.cjs');

const config = loadConfig('locals.js');

const userIdentifierSelectors = [
    'a[data-hovercard-type="user"]',
    'a.user-mention',
];

test('用户名链接在遍历与突变两条管线里都被跳过（#759）', () => {
    for (const selector of userIdentifierSelectors) {
        assert.ok(
            config.ignoreSelectorPage['*'].includes(selector),
            `ignoreSelectorPage['*'] 缺少 ${selector}`,
        );
        assert.ok(
            config.ignoreMutationSelectorPage['*'].includes(selector),
            `ignoreMutationSelectorPage['*'] 缺少 ${selector}`,
        );
    }
});

test('用户资料页 README 不参与翻译（#759）', () => {
    assert.ok(
        config.ignoreSelectorPage['page-profile'].includes('article.markdown-body'),
        "ignoreSelectorPage['page-profile'] 缺少 article.markdown-body",
    );
    assert.ok(
        config.ignoreMutationSelectorPage['page-profile'].includes('article.markdown-body'),
        "ignoreMutationSelectorPage['page-profile'] 缺少 article.markdown-body",
    );
});
