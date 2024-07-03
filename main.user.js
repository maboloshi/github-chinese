// ==UserScript==
// @name         GitHub 中文化插件（测试版）
// @namespace    https://github.com/maboloshi/github-chinese
// @description  中文化 GitHub 界面的部分菜单及内容。原作者为楼教主(http://www.52cik.com/)。
// @copyright    2021, 沙漠之子 (https://maboloshi.github.io/Blog)
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.9.2-beta.9-2024-06-09
// @author       沙漠之子
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://skills.github.com/*
// @match        https://gist.github.com/*
// @match        https://www.githubstatus.com/*
// @require      https://raw.githubusercontent.com/maboloshi/github-chinese/Test_zh-CN_LangEnvSet/locals.js?v1.9.0
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @connect      fanyi.iflyrec.com
// @supportURL   https://github.com/maboloshi/github-chinese/issues
// ==/UserScript==

(function (window, document, undefined) {
    'use strict';

    const lang = 'zh-CN'; // 设置默认语言
    let page;
    let enable_RegExp = GM_getValue("enable_RegExp", 1);

    /**
     * watchUpdate 函数：监视页面变化，根据变化的节点进行翻译
     */
    function watchUpdate() {
        // 检测浏览器是否支持 MutationObserver
        const MutationObserver =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;

        // 缓存当前页面的 URL
        let previousURL = location.href;

        // 监测 HTML Lang 值, 设置中文环境
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

        // 监听 document.body 下 DOM 变化，用于处理节点变化
        new MutationObserver(mutations => {
            const currentURL = location.href;

            // 如果页面的 URL 发生变化
            if (currentURL !== previousURL) {
                previousURL = currentURL;
                page = getPage();
                console.log(`DOM变化触发: 链接变化 page= ${page}`);
            }

            if (page) {
                const { characterData, ignoreSelectors } = getConfig(page);

                // 使用 mutations.filter 进行筛选:
                //  1. 保留`节点增加突变`、`属性突变`
                //  2. 保留特定页面`文本节点突变`
                //  3. 丢弃特定页面，`特定忽略元素`内的突变
                const filteredMutations = mutations.filter(({ target, addedNodes, type }) =>
                    // 优先处理突变类型判断
                    (addedNodes.length || type === 'attributes' || (characterData && type === 'characterData')) &&
                    // 随后检查忽略元素
                    !ignoreSelectors.some(selector => target.parentElement?.closest(selector))
                );

                // 处理每个变化
                filteredMutations.forEach(mutation => traverseNode(mutation.target));
            }
        }).observe(document.body, {
            characterData: true,
            subtree: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm'], // 仅观察特定属性变化
        });

        // 监听 Turbo 完成事件
        document.addEventListener('turbo:load', () => {
            if (page) {
                transTitle(); // 翻译页面标题
                transBySelector();
                if (page === "repository") { //仓库简介翻译
                    transDesc(".f4.my-3");
                } else if (page === "gist") { // Gist 简介翻译
                    transDesc(".gist-content [itemprop='about']");
                }
            }
        });
    }

    /**
     * traverseNode 函数：遍历指定的节点，并对节点进行翻译。
     * @param {Node} node - 需要遍历的节点。
     */
    function traverseNode(node) {
        // 跳过忽略
        const { ignoreId, ignoreTag, reIgnoreClass, reIgnoreItemprop } = I18N.conf;
        const skipNode = node => ignoreId.includes(node.id) ||
                                 ignoreTag.includes(node.tagName) ||
                                 reIgnoreClass.test(node.className) ||
                                 (node.nodeType === Node.ELEMENT_NODE && reIgnoreItemprop.test(node.getAttribute("itemprop")));

        if (skipNode(node)) return;

        if (node.nodeType === Node.ELEMENT_NODE) { // 元素节点处理

            // 处理不同标签的元素属性翻译
            switch (node.tagName) {
                case "RELATIVE-TIME": // 翻译时间元素
                    transTimeElement(node.shadowRoot);
                    return;

                case "INPUT":
                case "TEXTAREA": // 输入框 按钮 文本域
                    if (['button', 'submit', 'reset'].includes(node.type)) {
                        transElement(node.dataset, 'confirm'); // 翻译 浏览器 提示对话框
                        transElement(node, 'value');
                    } else {
                        transElement(node, 'placeholder');
                    }
                    break;

                case "BUTTON":
                    if (/tooltipped/.test(node.className)) transElement(node, 'ariaLabel'); // 翻译 浏览器 提示对话框
                    transElement(node, 'title'); // 翻译 浏览器 提示对话框
                    transElement(node.dataset, 'confirm'); // 翻译 浏览器 提示对话框 ok
                    transElement(node.dataset, 'confirmText'); // 翻译 浏览器 提示对话框 ok
                    transElement(node.dataset, 'confirmCancelText'); // 取消按钮 提醒
                    transElement(node, 'cancelConfirmText'); // 取消按钮 提醒
                    transElement(node.dataset, 'disableWith'); // 按钮等待提示
                    break;

                case "OPTGROUP":
                    transElement(node, 'label'); // 翻译 <optgroup> 的 label 属性
                    break;

                case "A":
                    transElement(node, 'title'); // title 属性
                    if (node.hasAttribute('data-hovercard-type')) return;
                    break;

                default:
                    // 仅当 元素存在'tooltipped'样式 aria-label 才起效果
                    if (/tooltipped/.test(node.className)) transElement(node, 'ariaLabel'); // 带提示的元素，类似 tooltip 效果的
            }

            const childNodes = node.childNodes;
            for (let i = 0; i < childNodes.length; i++) { // 遍历子节点
                traverseNode(childNodes[i]);
            }

        } else if (node.nodeType === Node.TEXT_NODE && node.length <= 500) { // 文本节点翻译
            transElement(node, 'data');
        }
    }


    /**
     * getPage 函数：获取页面的类型。
     * @param {URL object} URL - 需要分析的 URL。
     * @returns {string|boolean} 页面的类型，如果无法确定类型，那么返回 false。
     */
    function getPage(url = window.location) {
        // 站点映射
        const siteMapping = {
            'gist.github.com': 'gist',
            'www.githubstatus.com': 'status',
            'skills.github.com': 'skills'
        };
        const site = siteMapping[url.hostname] || 'github';
        const pathname = url.pathname;

        // 是否登录
        const isLogin = document.body.classList.contains("logged-in");
        // 获取 analytics-location
        const analyticsLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';

        // 判断页面类型
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
     * transTitle 函数：翻译页面标题
     */
    function transTitle() {
        let key = document.title; // 标题文本内容
        let str = I18N[lang]['title']['static'][key] || '';
        if (!str) {
            let res = I18N[lang]['title'].regexp || [];
            for (let [a, b] of res) {
                str = key.replace(a, b);
                if (str !== key) {
                    break;
                }
            }
        }
        document.title = str;
    }

    /**
     * transTimeElement 函数：翻译时间元素文本内容。
     * @param {Element} el - 需要翻译的元素。
     */
    function transTimeElement(el) {
        let key = el.childNodes.length > 0 ? el.lastChild.textContent : el.textContent;
        let res = I18N[lang]['pubilc']['time-regexp']; // 时间正则规则

        for (let [a, b] of res) {
            let str = key.replace(a, b);
            if (str !== key) {
                el.textContent = str;
                break;
            }
        }
    }

    /**
     * transElement 函数：翻译指定元素的文本内容或属性。
     * @param {Element} el - 需要翻译的元素。
     * @param {string} field - 需要翻译的文本内容或属性的名称。
     * @param {boolean} isAttr - 是否需要翻译属性（不可直接访问的属性值）。
     */
    function transElement(el, field, isAttr = false) {
        let text = isAttr ? el.getAttribute(field) : el[field]; // 需要翻译的文本
        if (!text) return; // 当 text 为空时，退出函数
        let str = transText(text); // 翻译后的文本

        // 替换翻译后的内容
        if (str) {
            if (isAttr) {
                el.setAttribute(field, str);
            } else {
                el[field] = str;
            }
        }
    }

    /**
     * transText 函数：翻译文本内容。
     * @param {string} text - 需要翻译的文本内容。
     * @returns {string|boolean} 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false。
     */
    function transText(text) {
        // 判断是否需要跳过翻译
        //  1. 检查内容是否为空或者仅包含空白字符或数字。
        //  2. 检查内容是否仅包含中文字符。
        //  3. 检查内容是否不包含英文字母和符号。
        const shouldSkip = text => /^[\s0-9]*$/.test(text) || /^[\u4e00-\u9fa5]+$/.test(text) || !/[a-zA-Z,.]/.test(text);
        if (shouldSkip(text)) return false;

        // 清理文本内容
        let trimmedText = text.trim(); // 去除首尾空格
        let cleanedText = trimmedText.replace(/\xa0|[\s]+/g, ' '); // 去除多余空白字符（包括 &nbsp; 空格 换行符）

        // 尝试获取翻译结果
        let translatedText = fetchTranslatedText(cleanedText);

        // 如果找到翻译并且不与清理后的文本相同，则返回替换后的结果
        if (translatedText && translatedText !== cleanedText) {
            return text.replace(trimmedText, translatedText); // 替换原字符，保留首尾空白部分
        }

        return false;
    }

    /**
     * fetchTranslatedText 函数：从特定页面的词库中获得翻译文本内容。
     * @param {string} key - 需要翻译的文本内容。
     * @returns {string|boolean} 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false。
     */
    function fetchTranslatedText(key) {

        // 静态翻译
        let str = I18N[lang][page]['static'][key] || I18N[lang]['pubilc']['static'][key]; // 默认翻译 公共部分

        if (typeof str === 'string') {
            return str;
        }

        // 正则翻译
        if (enable_RegExp) {
            let res = (I18N[lang][page].regexp || []).concat(I18N[lang]['pubilc'].regexp || []); // 正则数组

            for (let [a, b] of res) {
                str = key.replace(a, b);
                if (str !== key) {
                    return str;
                }
            }
        }

        return false; // 没有翻译条目
    }

    /**
     * transDesc 函数：为指定的元素添加一个翻译按钮，并为该按钮添加点击事件。
     * @param {string} el - CSS选择器，用于选择需要添加翻译按钮的元素。
     */
    function transDesc(el) {
        // 使用 CSS 选择器选择元素
        let element = document.querySelector(el);

        // 如果元素不存在 或者 translate-me 元素已存在，那么直接返回
        if (!element || document.getElementById('translate-me')) {
            return false;
        }

        // 在元素后面插入一个翻译按钮
        const buttonHTML = `<div id='translate-me' style='color: rgb(27, 149, 224); font-size: small; cursor: pointer'>翻译</div>`;
        element.insertAdjacentHTML('afterend', buttonHTML);
        let button = element.nextSibling;

        // 为翻译按钮添加点击事件
        button.addEventListener('click', () => {
            // 获取元素的文本内容
            const desc = element.textContent.trim();

            // 如果文本内容为空，那么直接返回
            if (!desc) {
                return false;
            }

            // 调用 translateDescText 函数进行翻译
            translateDescText(desc, text => {
                // 翻译完成后，隐藏翻译按钮，并在元素后面插入翻译结果
                button.style.display = "none";
                const translationHTML = `<span style='font-size: small'>由 <a target='_blank' style='color:rgb(27, 149, 224);' href='https://fanyi.iflyrec.com/text-translate'>讯飞听见</a> 翻译👇</span><br/>${text}`;
                element.insertAdjacentHTML('afterend', translationHTML);
            });
        });
    }

    /**
     * translateDescText 函数：将指定的文本发送到讯飞的翻译服务进行翻译。
     * @param {string} text - 需要翻译的文本。
     * @param {function} callback - 翻译完成后的回调函数，该函数接受一个参数，即翻译后的文本。
     */
    function translateDescText(text, callback) {
        // 使用 GM_xmlhttpRequest 函数发送 HTTP 请求
        GM_xmlhttpRequest({
            method: "POST", // 请求方法为 POST
            url: "https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation", // 请求的 URL
            headers: { // 请求头
                'Content-Type': 'application/json',
                'Origin': 'https://fanyi.iflyrec.com',
            },
            data: JSON.stringify({
                "from": 2,
                "to": 1,
                "type": 1,
                "contents": [{
                    "text": text
                }]
            }), // 请求的数据
            responseType: "json", // 响应的数据类型为 JSON
            onload: (res) => {
                try {
                    const { status, response } = res;
                    const translatedText = (status === 200) ? response.biz[0].sectionResult[0].dst : "翻译失败";
                    callback(translatedText);
                } catch (error) {
                    console.error('翻译失败', error);
                    callback("翻译失败");
                }
            },
            onerror: (error) => {
                console.error('网络请求失败', error);
                callback("网络请求失败");
            }
        });
    }

    /**
     * transBySelector 函数：通过 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译。
     */
    function transBySelector() {
        // 获取当前页面的翻译规则，如果没有找到，那么使用公共的翻译规则
        let res = (I18N[lang][page]?.selector || []).concat(I18N[lang]['pubilc'].selector || []); // 数组

        // 如果找到了翻译规则
        if (res.length > 0) {
            // 遍历每个翻译规则
            for (let [selector, translation] of res) {
                // 使用 CSS 选择器找到对应的元素
                let element = document.querySelector(selector)
                // 如果找到了元素，那么将其文本内容替换为翻译后的文本
                if (element) {
                    element.textContent = translation;
                }
            }
        }
    }

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
     * init 函数：初始化翻译功能。
     */
    function init() {
        // 获取当前页面的翻译规则
        page = getPage();
        console.log(`开始page= ${page}`);

        // 翻译页面标题
        transTitle();

        if (page) {
            // 立即翻译页面
            traverseNode(document.body);

            // 使用 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译
            transBySelector();
            if (page === "repository") { //仓库简介翻译
                transDesc(".f4.my-3");
            } else if (page === "gist") { // Gist 简介翻译
                transDesc(".gist-content [itemprop='about']");
            }
        }

        // 监视页面变化
        watchUpdate();
    }

    // 执行初始化
    registerMenuCommand();

    // 设置中文环境
    document.documentElement.lang = 'zh-CN';

    // 在页面初始加载完成时执行
    window.addEventListener('DOMContentLoaded', init);

})(window, document);