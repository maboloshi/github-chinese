// ==UserScript==
// @name         GitHub 汉化插件
// @description  汉化 GitHub 界面的部分菜单及内容。
// @copyright    2016, 楼教主 (http://www.52cik.com/)
// @icon         https://assets-cdn.github.com/pinned-octocat.svg
// @version      0.3.0
// @author       楼教主
// @license      MIT
// @homepageURL  https://github.com/52cik/github-hans
// @match        http://*github.com/*
// @match        https://*github.com/*
// @require      http://www.52cik.com/github-hans/locals.js
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    walk(document.body); // 立即翻译

    $(document).ajaxComplete(function() {
        walk(document.body); // ajax 请求后再次翻译
    });

    function walk(node) {
        var nodes = node.childNodes;

        var i = 0;
        var len = nodes.length;
        var el = null; // 遍历元素用
        var attr; // 元素属性

        for (; i < len; i++) {
            el = nodes[i];

            /(files|highlight\s+tab-size)\s+js-(navigation|file-line)-container/.test(el.className) && console.log(el);

            if (el.nodeType === 1) {
                if (el.tagName === "INPUT") { // 输入框 按钮 处理
                    if (el.type === "button" || el.type === "submit") {
                        el.value = translate(el.value);
                    } else {
                        el.placeholder = translate(el.placeholder);
                    }
                } else if (attr = el.getAttribute('aria-label')) { // 带提示的元素，类似 tooltip 效果的
                    el.setAttribute('aria-label', translate(attr));
                }

                // todo 的跳过 readme, 文件列表, 代码显示
                if (el.id !== 'readme' && !/(files|highlight\s+tab-size)\s+js-(navigation|file-line)-container/.test(el.className) ) {
                    walk(el);
                }
            } else if (el.nodeType === 3) { // 文本节点处理
                el.data = translate(el.data);
            }
        }
    }

    function translate(key) {
        // todo 添加 字符串部分替换 如 "2 days"
        return __GitHub_I18N['zh'][key.trim()] || key;
    }
})();