// ==UserScript==
// @name                GitHub Internationalization
// @name:zh-CN          GitHub汉化插件gitee
// @name:ja             GitHub日本語
// @namespace           https://github.com/k1995/github-i18n-plugin/
// @version             0.30
// @description         Translate GitHub.com
// @description:zh      GitHub汉化插件，包含人机翻译
// @description:zh-CN   GitHub汉化插件，包含人机翻译
// @description:ja      GitHub日本語プラグイン
// @author              k1995
// @match               https://github.com/*
// @match               https://gist.github.com/*
// @grant               GM_xmlhttpRequest
// @grant               GM_getResourceText
// @resource            zh-CN https://www.github-zh.com/raw-githubusercontent/k1995/github-i18n-plugin/master/locales/zh-CN.json?v=20240617
// @resource            ja https://www.github-zh.com/raw-githubusercontent/k1995/github-i18n-plugin/master/locales/ja.json
// @require             https://cdn.staticfile.org/timeago.js/4.0.2/timeago.min.js
// @require             https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    const SUPPORT_LANG = ["zh-CN", "ja"];
    const lang = (navigator.language || navigator.userLanguage).toLowerCase();
    let locales = getLocales(lang);

    translateByCssSelector();
    translateTime();
    traverseElement(document.body);
    watchUpdate();

    if (window.location.pathname.split('/').length === 3) {
        translateDesc(".repository-content .f4"); // 仓库简介翻译
        // 注释掉的 Gist 简介翻译代码将被保留以备将来可能的需求
        // translateDesc(".gist-content [itemprop='about']");
    }


    function getLocales(lang) {
        if (lang.startsWith("zh")) { // zh zh-TW --> zh-CN
            lang = "zh-CN";
        }
        if (SUPPORT_LANG.includes(lang)) {
            return JSON.parse(GM_getResourceText(lang));
        }
        return {
            css: [],
            dict: {}
        };
    }

    function translateRelativeTimeEl(el) {
        const datetime = $(el).attr('datetime');
        let humanTime = timeago.format(datetime, lang.replace('-', '_'));
        if (el.shadowRoot) {
            el.shadowRoot.textContent = humanTime;
        } else {
            el.textContent = humanTime;
        }
    }

    function translateElement(el) {
        let k;
        if (el.tagName === "INPUT") {
            k = el.type === 'button' || el.type === 'submit' ? 'value' : 'placeholder';
        } else {
            k = 'data';
        }

        if (!isNaN(el[k])) {
            const txtSrc = el[k].trim();
            const key = txtSrc.toLowerCase()
                .replace(/\xa0/g, ' ') // replace '&nbsp;'
                .replace(/\s{2,}/g, ' ');
            if (locales.dict[key]) {
                el[k] = el[k].replace(txtSrc, locales.dict[key]);
            }
        }
        translateElementAriaLabel(el);
    }

    function translateElementAriaLabel(el) {
        if (el.getAttribute('aria-label')) {
            const k = 'aria-label';
            const txtSrc = el.getAttribute(k).trim();
            const key = txtSrc.toLowerCase()
                .replace(/\xa0/g, ' ') // replace '&nbsp;'
                .replace(/\s{2,}/g, ' ');
            if (locales.dict[key]) {
                el.setAttribute(k, el.getAttribute(k).replace(txtSrc, locales.dict[key]));
            }
        }
    }

    function shouldTranslateEl(el) {
        const blockIds = [
            "readme",
            "file-name-editor-breadcrumb", "StickyHeader" // fix repo详情页文件路径breadcrumb
        ];
        const blockClass = [
            "CodeMirror",
            "js-navigation-container", // 过滤文件目录
            "blob-code",
            "topic-tag", // 过滤标签,
            // "text-normal", // 过滤repo name, 复现：https://github.com/search?q=explore
            "repo-list", // 过滤搜索结果项目,解决"text-normal"导致的有些文字不翻译的问题,搜索结果以后可以考虑单独翻译
            "js-path-segment", "final-path", "react-tree-show-tree-items", // 过滤目录,文件位置栏
            "markdown-body", // 过滤wiki页面,
            "search-input-container", // 搜索框
            "search-match", // fix搜索结果页,repo name被翻译
            "cm-editor", "react-code-lines", // 代码编辑框
            "PRIVATE_TreeView-item", // 文件树
            "repo" // 项目名称
        ];
        const blockTags = ["CODE", "SCRIPT", "LINK", "IMG", "svg", "TABLE", "PRE"];
        const blockItemprops = ["name"];

        if (blockTags.includes(el.tagName)) {
            return false;
        }

        if (el.id && blockIds.includes(el.id)) {
            return false;
        }

        if (el.classList) {
            for (let clazz of blockClass) {
                if (el.classList.contains(clazz)) {
                    return false;
                }
            }
        }

        if (el.getAttribute) {
            let itemprops = el.getAttribute("itemprop");
            if (itemprops) {
                itemprops = itemprops.split(" ");
                for (let itemprop of itemprops) {
                    if (blockItemprops.includes(itemprop)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    function traverseElement(el) {
        translateElementAriaLabel(el);
        if (!shouldTranslateEl(el)) {
            return;
        }

        if (el.childNodes.length === 0) {
            if (el.nodeType === Node.TEXT_NODE) {
                translateElement(el);
                return;
            } else if (el.nodeType === Node.ELEMENT_NODE) {
                if (el.tagName === "INPUT") {
                    translateElement(el);
                    return;
                }
            }
        }

        for (const child of el.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                translateElement(child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName === "INPUT") {
                    translateElement(child);
                } else {
                    traverseElement(child);
                }
            }
        }
    }

    function watchUpdate() {
        const m = window.MutationObserver || window.WebKitMutationObserver;
        const observer = new m(function(mutations, observer) {
            let reTrans = false;
            for (let mutationRecord of mutations) {
                if (mutationRecord.addedNodes || mutationRecord.type === 'attributes') {
                    reTrans = true;
                    traverseElement(mutationRecord.target);
                }
            }
            if (reTrans) {
                traverseElement(document.body);
                translateTime();
            }
        });

        observer.observe(document.body, {
            subtree: true,
            characterData: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data', 'data-confirm'], // 仅观察特定属性变化(试验测试阶段，有问题再恢复)
        });
    }

    function translateDesc(el) {
        $(el).append("<br/>");
        $(el).append("<a id='translate-me' href='#' style='color:rgb(27, 149, 224);font-size: small'>翻译</a>");
        $("#translate-me").click(function() {
            const desc = $(el)
                .clone()
                .children()
                .remove()
                .end()
                .text()
                .trim();

            if (!desc) {
                return;
            }

            let lang = (navigator.userLanguage || navigator.language).toLowerCase();
            let data_json = {
                header: {
                    fn: "auto_translation"
                },
                type: "plain",
                source: {
                    text_list: [
                        desc
                    ]
                },
                target: {
                    lang: lang === "zh-cn" ? "zh" : lang
                }
            };
            const repoId = $("input[name=repository_id]").val();
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://www.github-zh.com/translate?i=${repoId}&q=${encodeURIComponent(desc)}`,
                onload: function(rsp) {
                    if (rsp.status === 200) {
                        $("#translate-me").hide();
                        const text = rsp.responseText;
                        $(".repository-content .f4").append("<span style='font-size: small'>由 <a target='_blank' style='color:rgb(27, 149, 224);' href='https://www.githubs.cn'>GitHub中文社区</a> 翻译👇</span>");
                        $(".repository-content .f4").append("<br/>");
                        $(".repository-content .f4").append(text);
                    } else {
                        console.error("仓库描述翻译失败:", rsp);
                        alert("翻译失败");
                    }
                }
            });
        });
    }

    function translateByCssSelector() {
        if (locales.css) {
            for (var css of locales.css) {
                if ($(css.selector).length > 0) {
                    if (css.key === '!html') {
                        $(css.selector).html(css.replacement);
                    } else {
                        $(css.selector).attr(css.key, css.replacement);
                    }
                }
            }
        }
    }

    function translateTime() {
        $("relative-time").each(function() {
            translateRelativeTimeEl(this);
        });
    }
})();