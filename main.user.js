// ==UserScript==
// @name         GitHub 中文化插件Gitee（测试版）
// @namespace    https://github.com/buiawpkgew1/github-chinese
// @description  中文化 GitHub 界面的部分菜单及内容。原作者为楼教主(http://www.52cik.com/)。
// @copyright    2021, buiawpkgew1, 菾凴
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.9.2-beta.9-2024-06-09
// @author       菾凴
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://skills.github.com/*
// @match        https://gist.github.com/*
// @match        https://www.githubstatus.com/*
// @require      https://gitee.com/awnioow/github-chinese/raw/Test_zh-CN_LangEnvSet/locals.js?v1.9.0
// @resource     ja https://gitee.com/awnioow/github-chinese/raw/Test_zh-CN_LangEnvSet/i18n/ja.json
// @resource     zh-CN https://gitee.com/awnioow/github-chinese/raw/Test_zh-CN_LangEnvSet/i18n/zh-CN.json
// @resource     zh-TW https://gitee.com/awnioow/github-chinese/raw/Test_zh-CN_LangEnvSet/i18n/zh-TW.json
// @require      https://cdn.staticfile.org/timeago.js/4.0.2/timeago.min.js
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @connect      fanyi.iflyrec.com
// @supportURL   https://github.com/buiawpkgew1/github-chinese/issues
// ==/UserScript==
(function (window, document, undefined) {
    'use strict';

    // 支持的语言列表
    const SUPPORT_LANG = ["zh-CN", "ja"];
    // 获取当前浏览器的语言
    const lang = (navigator.language || navigator.userLanguage).toLowerCase();
    // 获取本地化资源
    let locales = getLocales(lang);
    let page;
    // 获取正则表达式功能开关
    let enable_RegExp = GM_getValue("enable_RegExp", 1);

    /**
     * 获取本地化资源
     * @param {string} lang - 当前语言
     * @returns {Object} - 本地化资源对象
     */
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

    /**
     * 监视页面变化，根据变化的节点进行翻译
     */
    function watchUpdate() {
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        let previousURL = location.href;

        new MutationObserver(mutations => {
            if (document.documentElement.lang === "en") {
                document.documentElement.lang = lang;
            }
        }).observe(document.documentElement, {
            attributeFilter: ['lang']
        });

        const { characterDataPage, ignoreSelector } = I18N.conf;

        const getConfig = page => {
            const characterData = characterDataPage.includes(page),
                  ignoreSelectors = ignoreSelector[page] || [];
            return { characterData, ignoreSelectors };
        };

        new MutationObserver(mutations => {
            const currentURL = location.href;
            if (currentURL !== previousURL) {
                previousURL = currentURL;
                page = getPage();
                console.log(`DOM变化触发: 链接变化 page= ${page}`);
            }

            if (page) {
                const { characterData, ignoreSelectors } = getConfig(page);
                const filteredMutations = mutations.filter(({ target, addedNodes, type }) =>
                    (addedNodes.length || type === 'attributes' || (characterData && type === 'characterData')) &&
                    !ignoreSelectors.some(selector => target.parentElement?.closest(selector))
                );

                filteredMutations.forEach(mutation => traverseNode(mutation.target));
            }
        }).observe(document.body, {
            characterData: true,
            subtree: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm']
        });

        document.addEventListener('turbo:load', () => {
            if (page) {
                transTitle();
                transBySelector();
                if (page === "repository") {
                    transDesc(".f4.my-3");
                } else if (page === "gist") {
                    transDesc(".gist-content [itemprop='about']");
                }
            }
        });
    }

    /**
     * 遍历指定的节点，并对节点进行翻译
     * @param {Node} node - 需要遍历的节点
     */
    function traverseNode(node) {
        const { ignoreId, ignoreTag, reIgnoreClass, reIgnoreItemprop } = I18N.conf;
        if (shouldSkipNode(node, ignoreId, ignoreTag, reIgnoreClass, reIgnoreItemprop)) return;

        if (node.nodeType === Node.ELEMENT_NODE) {
            switch (node.tagName) {
                case "RELATIVE-TIME":
                    transTimeElement(node.shadowRoot);
                    break;

                case "INPUT":
                case "TEXTAREA":
                    if (['button', 'submit', 'reset'].includes(node.type)) {
                        transElement(node.dataset, 'confirm');
                        transElement(node, 'value');
                    } else {
                        transElement(node, 'placeholder');
                    }
                    break;

                case "BUTTON":
                    transElement(node, 'ariaLabel');
                    transElement(node, 'title');
                    transElement(node.dataset, 'confirm');
                    transElement(node.dataset, 'confirmText');
                    transElement(node.dataset, 'confirmCancelText');
                    transElement(node, 'cancelConfirmText');
                    transElement(node.dataset, 'disableWith');
                    break;

                case "OPTGROUP":
                    transElement(node, 'label');
                    break;

                case "A":
                    transElement(node, 'title');
                    if (node.hasAttribute('data-hovercard-type')) return;
                    break;

                default:
                    if (/tooltipped/.test(node.className)) transElement(node, 'ariaLabel');
            }

            for (let child of node.childNodes) {
                traverseNode(child);
            }
        } else if (node.nodeType === Node.TEXT_NODE && node.length <= 500) {
            transElement(node, 'data');
        }
    }

    /**
     * 判断节点是否需要跳过翻译
     * @param {Node} node - 需要判断的节点
     * @param {Array} ignoreId - 忽略的ID列表
     * @param {Array} ignoreTag - 忽略的标签列表
     * @param {RegExp} reIgnoreClass - 忽略的类名正则表达式
     * @param {RegExp} reIgnoreItemprop - 忽略的itemprop属性正则表达式
     * @returns {boolean} - 是否需要跳过
     */
    function shouldSkipNode(node, ignoreId, ignoreTag, reIgnoreClass, reIgnoreItemprop) {
        return ignoreId.includes(node.id) ||
               ignoreTag.includes(node.tagName) ||
               reIgnoreClass.test(node.className) ||
               (node.nodeType === Node.ELEMENT_NODE && reIgnoreItemprop.test(node.getAttribute("itemprop")));
    }

    /**
     * 获取页面的类型
     * @param {URL} url - 需要分析的URL
     * @returns {string|boolean} - 页面的类型，如果无法确定类型，那么返回 false
     */
    function getPage(url = window.location) {
        const siteMapping = {
            'gist.github.com': 'gist',
            'www.githubstatus.com': 'status',
            'skills.github.com': 'skills'
        };
        const site = siteMapping[url.hostname] || 'github';
        const pathname = url.pathname;
        const isLogin = document.body.classList.contains("logged-in");
        const analyticsLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';

        const isOrganization = /\/<org-login>/.test(analyticsLocation) || /^\/(?:orgs|organizations)/.test(pathname);
        const isRepository = /\/<user-name>\/<repo-name>/.test(analyticsLocation);
        const isProfile = document.body.classList.contains("page-profile") || analyticsLocation === '/<user-name>';
        const isSession = document.body.classList.contains("session-authentication");

        const { rePagePathRepo, rePagePathOrg, rePagePath } = I18N.conf;
        let t, page = false;

        if (isSession) {
            page = 'session-authentication';
        } else if (isProfile) {
            t = url.search.match(/tab=([^&]+)/);
            page = t ? 'page-profile/' + t[1] : pathname.includes('/stars') ? 'page-profile/stars' : 'page-profile';
        } else if (site === 'gist' || site === 'status' || site === 'skills') {
            page = site;
        } else if (pathname === '/' && site === 'github') {
            page = isLogin ? 'page-dashboard' : 'homepage';
        } else if (isRepository) {
            t = pathname.match(rePagePathRepo);
            page = t ? 'repository/' + t[1] : 'repository';
        } else if (isOrganization) {
            t = pathname.match(rePagePathOrg);
            page = t ? 'orgs/' + (t[1] || t.slice(-1)[0]) : 'orgs';
        } else {
            t = pathname.match(rePagePath);
            page = t ? (t[1] || t.slice(-1)[0]) : false;
        }

        if (!page || !I18N[lang][page]) {
            console.log(`请注意对应 page ${page} 词库节点不存在`);
            page = false;
        }
        return page;
    }

    /**
     * 翻译页面标题
     */
    function transTitle() {
        let key = document.title;
        let str = I18N[lang]['title']['static'][key] || '';
        if (!str) {
            let res = I18N[lang]['title'].regexp || [];
            for (let [a, b] of res) {
                str = key.replace(a, b);
                if (str !== key) break;
            }
        }
        document.title = str;
    }

    /**
     * 翻译时间元素文本内容
     * @param {Element} el - 需要翻译的元素
     */
    function transTimeElement(el) {
        let key = el.childNodes.length > 0 ? el.lastChild.textContent : el.textContent;
        let res = I18N[lang]['pubilc']['time-regexp'];
        for (let [a, b] of res) {
            let str = key.replace(a, b);
            if (str !== key) {
                el.textContent = str;
                break;
            }
        }
    }

    /**
     * 翻译指定元素的文本内容或属性
     * @param {Element} el - 需要翻译的元素
     * @param {string} field - 需要翻译的文本内容或属性的名称
     * @param {boolean} isAttr - 是否需要翻译属性（不可直接访问的属性值）
     */
    function transElement(el, field, isAttr = false) {
        let text = isAttr ? el.getAttribute(field) : el[field];
        if (!text) return;
        let str = transText(text);
        if (str) {
            if (isAttr) {
                el.setAttribute(field, str);
            } else {
                el[field] = str;
            }
        }
    }

    /**
     * 翻译文本内容
     * @param {string} text - 需要翻译的文本内容
     * @returns {string|boolean} - 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false
     */
    function transText(text) {
        if (shouldSkipText(text)) return false;
        let trimmedText = text.trim();
        let cleanedText = trimmedText.replace(/\xa0|[\s]+/g, ' ');
        let translatedText = messages[text];
        if (typeof translatedText === 'string') {
            return translatedText;
        }

        if (enable_RegExp) {
            let res = (I18N[lang][page].regexp || []).concat(I18N[lang]['pubilc'].regexp || []);
            for (let [a, b] of res) {
                str = key.replace(a, b);
                if (str !== key) {
                    return str;
                }
            }
        }

        return false;
    }

    /**
     * 判断文本是否需要跳过翻译
     * @param {string} text - 需要判断的文本
     * @returns {boolean} - 是否需要跳过
     */
    function shouldSkipText(text) {
        return /^[\s0-9]*$/.test(text) || /^[\u4e00-\u9fa5]+$/.test(text) || !/[a-zA-Z,.]/.test(text);
    }

    /**
     * 从特定页面的词库中获得翻译文本内容
     * @param {string} key - 需要翻译的文本内容
     * @returns {string|boolean} - 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false
     */
    function fetchTranslatedText(key) {
        let str = I18N[lang][page]['static'][key] || I18N[lang]['pubilc']['static'][key];
        if (typeof str === 'string') {
            return str;
        }

        if (enable_RegExp) {
            let res = (I18N[lang][page].regexp || []).concat(I18N[lang]['pubilc'].regexp || []);
            for (let [a, b] of res) {
                str = key.replace(a, b);
                if (str !== key) {
                    return str;
                }
            }
        }

        return false;
    }

    /**
     * 为指定的元素添加一个翻译按钮，并为该按钮添加点击事件
     * @param {string} el - CSS选择器，用于选择需要添加翻译按钮的元素
     */
    function transDesc(el) {
        let element = document.querySelector(el);
        if (!element || document.getElementById('translate-me')) return false;
        const buttonHTML = `<div id='translate-me' style='color: rgb(27, 149, 224); font-size: small; cursor: pointer'>翻译</div>`;
        element.insertAdjacentHTML('afterend', buttonHTML);
        let button = element.nextSibling;

        button.addEventListener('click', () => {
            const desc = element.textContent.trim();
            if (!desc) return false;
            translateDescText(desc, text => {
                button.style.display = "none";
                const translationHTML = `<span style='font-size: small'>由 <a target='_blank' style='color:rgb(27, 149, 224);' href='https://fanyi.iflyrec.com/text-translate'>讯飞听见</a> 翻译👇</span><br/>${text}`;
                element.insertAdjacentHTML('afterend', translationHTML);
            });
        });
    }

    /**
     * 将指定的文本发送到讯飞的翻译服务进行翻译
     * @param {string} text - 需要翻译的文本
     * @param {function} callback - 翻译完成后的回调函数，该函数接受一个参数，即翻译后的文本
     */
    function translateDescText(text, callback) {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation",
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://fanyi.iflyrec.com',
            },
            data: JSON.stringify({
                "from": 2,
                "to": 1,
                "type": 1,
                "contents": [{ "text": text }]
            }),
            responseType: "json",
            onload: res => {
                try {
                    const { status, response } = res;
                    const translatedText = (status === 200) ? response.biz[0].sectionResult[0].dst : "翻译失败";
                    callback(translatedText);
                } catch (error) {
                    console.error('翻译失败', error);
                    callback("翻译失败");
                }
            },
            onerror: error => {
                console.error('网络请求失败', error);
                callback("网络请求失败");
            }
        });
    }

    /**
     * 通过 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译
     */
    function transBySelector() {
        let res = (I18N[lang][page]?.selector || []).concat(I18N[lang]['pubilc'].selector || []);
        if (res.length > 0) {
            for (let [selector, translation] of res) {
                let element = document.querySelector(selector);
                if (element) {
                    element.textContent = translation;
                }
            }
        }
    }

    /**
     * 注册菜单命令，用于切换正则表达式功能
     */
    function registerMenuCommand() {
        const toggleRegExp = () => {
            enable_RegExp = !enable_RegExp;
            GM_setValue("enable_RegExp", enable_RegExp);
            GM_notification(`已${enable_RegExp ? '开启' : '关闭'}正则功能`);
            if (enable_RegExp) {
                location.reload();
            }
            GM_unregisterMenuCommand(id);
            id = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
        };

        let id = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
    }

    /**
     * 初始化翻译功能
     */
    function init() {
        page = getPage();
        console.log(`开始page= ${page}`);

        transTitle();

        if (page) {
            traverseNode(document.body);
            transBySelector();
            if (page === "repository") {
                transDesc(".f4.my-3");
            } else if (page === "gist") {
                transDesc(".gist-content [itemprop='about']");
            }
        }

        watchUpdate();
    }

    registerMenuCommand();
    document.documentElement.lang = 'zh-CN';
    window.addEventListener('DOMContentLoaded', init);

})(window, document);
