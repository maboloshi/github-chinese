// ==UserScript==
// @name         GitHub 汉化插件
// @description  汉化 GitHub 界面的部分菜单及内容。
// @copyright    2016, 楼教主 (http://www.52cik.com/)
// @icon         https://assets-cdn.github.com/pinned-octocat.svg
// @version      1.0.1
// @author       楼教主
// @license      MIT
// @homepageURL  https://github.com/52cik/github-hans
// @match        http://*github.com/*
// @match        https://*github.com/*
// @require      http://www.52cik.com/github-hans/locals.js?v1.0.0
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    
    // 要翻译的页面正则
    var rePage = /\b(vis-public|page-(dashboard|profile|account)|homepage|signup|session-authentication)\b/;
    var page = document.body.className.match(rePage);

    page = page ? page[1] : false;
    
    walk(document.body); // 立即翻译

    $(document).ajaxComplete(function () {
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
                if (el.id !== 'readme' && !/(files|highlight\s+tab-size)\s+js-(navigation|file-line)-container|breadcrumb/.test(el.className)) {
                    walk(el);
                }
            } else if (el.nodeType === 3) { // 文本节点处理
                el.data = translate(el.data);
            }
        }
    }

    function translate(data) { // 翻译
        var str;
        var _key = data.trim();
        
        if (_key === '') { return data; } // 空字符返回原始数据
        
        str = transPage('pubilc', _key); // 公共翻译
        if (str !== _key) { return str; } // 已公共翻译
        
        if (page === false) { return data; } // 未知页面不翻译

        str = transPage(page, _key); // 翻译已知页面
        return str === _key ? data : str; // 未翻译返回原始数据
    }

    function transPage(page, key) {
        var str, res, len, i;

        // 静态翻译
        str = I18N['zh'][page]['static'][key];
        if (str) { return str; }

        // 正则翻译
        if (res = I18N['zh'][page]['regexp']) {
            for (i = 0, len = res.length; i < len; i++) {
                str = key.replace(res[i][0], res[i][1]);
                if (str !== key) { return str; }
            }
        }

        return key; // 没有翻译条目
    }

})();
