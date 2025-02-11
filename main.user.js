// ==UserScript==
// @name         GitHub 中文化插件
// @namespace    https://github.com/maboloshi/github-chinese
// @description  中文化 GitHub 界面的部分菜单及内容。原作者为楼教主(http://www.52cik.com/)。
// @copyright    2021, 沙漠之子 (https://maboloshi.github.io/Blog)
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.9.3-2025-02-09
// @author       沙漠之子
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://skills.github.com/*
// @match        https://gist.github.com/*
// @match        https://education.github.com/*
// @match        https://www.githubstatus.com/*
// @require      https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.3-2025-02-09
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

    /****************** 全局配置区（开发者可修改部分） ******************/
    const FeatureSet = {
        enable_RegExp: GM_getValue("enable_RegExp", true),
        enable_transDesc: GM_getValue("enable_transDesc", true),
    };
    const CONFIG = {
        LANG: 'zh-CN',
        // 站点域名 -> 类型映射
        PAGE_MAP: {
            'gist.github.com': 'gist',
            'www.githubstatus.com': 'status',
            'skills.github.com': 'skills',
            'education.github.com': 'education'
        },
        // 需要特殊处理的站点类型
        SPECIAL_SITES: ['gist', 'status', 'skills', 'education'],
        // 简介 css 筛选器规则
        DESC_SELECTORS: {
            repository: ".f4.my-3",
            gist: ".gist-content [itemprop='about']"
        },
        OBSERVER_CONFIG: {
            childList: true,
            subtree: true,
            characterData: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm']
        },
        // 当前使用引擎（开发者可切换）
        transEngine: 'iflyrec',
        // 翻译引擎配置
        TRANS_ENGINES: {
            iflyrec: {
                name: '讯飞听见',
                url: 'https://fanyi.iflyrec.com/text-translate',
                url_api: 'https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://fanyi.iflyrec.com'
                },
                // 请求体数据结构
                getRequestData: (text) => ({
                    from: 2,
                    to: 1,
                    type: 1,
                    contents: [{ text: text }]
                }),
                // 响应标识
                responseIdentifier: 'biz[0]?.sectionResult[0]?.dst',
            },
        }
    };

    let pageConfig = {};

    // 更新页面设置
    function updatePageConfig() {
        const newType = detectPageType();
        if (newType && newType !== pageConfig.currentPageType) {
            pageConfig = buildPageConfig(newType);
        }
    }

    // 构建页面设置 pageConfig 对象
    function buildPageConfig(pageType = pageConfig.currentPageType) {
        return {
            // 当前页面类型
            currentPageType: pageType,
            // 静态词库
            staticDict: {
                ...I18N[CONFIG.LANG].public.static,
                ...(I18N[CONFIG.LANG][pageType]?.static || {})
            },
            // 正则词库
            regexpRules: [
                ...I18N[CONFIG.LANG].public.regexp,
                ...(I18N[CONFIG.LANG][pageType]?.regexp || [])
            ],
            // 忽略突变元素选择器（字符串）
            ignoreMutationSelectors: [
                ...I18N.conf.ignoreMutationSelectorPage['*'],
                ...(I18N.conf.ignoreMutationSelectorPage[pageType] || [])
            ].join(', '),
            // 忽略元素选择器规则（字符串）
            ignoreSelectors: [
                ...I18N.conf.ignoreSelectorPage['*'],
                ...(I18N.conf.ignoreSelectorPage[pageType] || [])
            ].join(', '),
            // 字符数据监视开启规则（布尔值）
            characterData: I18N.conf.characterDataPage.includes(pageType),
            // CSS 选择器规则
            tranSelectors: [
                ...(I18N[CONFIG.LANG].public.selector || []),
                ...(I18N[CONFIG.LANG][pageType]?.selector || [])
            ],
        };
    }

    /**
     * watchUpdate 函数：监视页面变化，根据变化的节点进行翻译
     */
    function watchUpdate() {
        // 缓存当前页面的 URL
        let previousURL = window.location.href;

        const handleUrlChange = () => {
            const currentURL = window.location.href;
            // 如果页面的 URL 发生变化
            if (currentURL !== previousURL) {
                previousURL = currentURL;
                updatePageConfig();
                pageConfig.firstChangeURL = false; // 重置 firstChangeURL
                console.log(`【Debug】页面切换 pageType= ${pageConfig.currentPageType}`);
            }
        }

        const processMutations = mutations => {
            // 平铺突变记录并过滤需要处理的节点（链式操作）
            // 使用 mutations.flatMap 进行筛选突变:
            //   1. 针对`节点增加`突变，后期迭代翻译的对象调整为`addedNodes`中记录的新增节点，而不是`target`，此举大幅减少重复迭代翻译
            //   2. 对于其它`属性`和特定页面`文本节点`突变，仍旧直接处理`target`
            //   3. 使用`.filter()`筛选丢弃特定页面`特定忽略元素`内突变的节点
            mutations.flatMap(({ target, addedNodes, type }) => {
                // 处理子节点添加的情况
                if (type === 'childList' && addedNodes.length > 0) {
                    return [...addedNodes]; // 将新增节点转换为数组
                }
                // 处理属性和文本内容变更的情况
                return (type === 'attributes' || (type === 'characterData' && pageConfig.characterData))
                    ? [target] // 否则，仅处理目标节点
                    : [];
            })
            // 过滤需要忽略的突变节点
            .filter(node =>
                // 剔除节点在忽略选择器的父元素内
                !node.parentElement?.closest(pageConfig.ignoreMutationSelectors)
            )
            // 处理每个变化
            .forEach(node =>
                // 递归遍历节点树进行处理
                traverseNode(node)
            );
        }

        // 监听 document.body 下 DOM 变化，用于处理节点变化
        new MutationObserver(mutations => {
            if (pageConfig.firstChangeURL) handleUrlChange();
            if (pageConfig.currentPageType) processMutations(mutations);
        }).observe(document.body, CONFIG.OBSERVER_CONFIG);
    }

    /**
     * traverseNode 函数：遍历指定的节点，并对节点进行翻译。
     * @param {Node} node - 需要遍历的节点。
     */
    function traverseNode(rootNode) {
        const start = performance.now();

        const handleTextNode = node => {
            if (node.length > 500) return;
            transElement(node, 'data');
        }

        // 如果 rootNode 是文本节点，直接处理
        if (rootNode.nodeType === Node.TEXT_NODE) {
            handleTextNode(rootNode);
            return; // 文本节点没有子节点，直接返回
        }

        const treeWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
            {
                acceptNode: node =>
                // 跳过忽略的节点
                node.matches?.(pageConfig.ignoreSelectors) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
            }
        );

        const handleElement = node => {
            // 处理不同标签的元素属性翻译
            switch (node.tagName) {
                case "RELATIVE-TIME": // 翻译时间元素
                    transTimeElement(node.shadowRoot);
                    watchTimeElement(node.shadowRoot);
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

                case "OPTGROUP":
                    transElement(node, 'label'); // 翻译 <optgroup> 的 label 属性
                    break;

                case "BUTTON":
                    transElement(node, 'title'); // 翻译 浏览器 提示对话框
                    transElement(node.dataset, 'confirm'); // 翻译 浏览器 提示对话框 ok
                    transElement(node.dataset, 'confirmText'); // 翻译 浏览器 提示对话框 ok
                    transElement(node.dataset, 'confirmCancelText'); // 取消按钮 提醒
                    transElement(node, 'cancelConfirmText'); // 取消按钮 提醒
                    transElement(node.dataset, 'disableWith'); // 按钮等待提示

                case "A":
                case "SPAN":
                    transElement(node, 'title'); // title 属性

                default:
                    // 仅当 元素存在'tooltipped'样式 aria-label 才起效果
                    if (/tooltipped/.test(node.className)) transElement(node, 'ariaLabel'); // 带提示的元素，类似 tooltip 效果的
            }
        }

        // 预绑定处理函数提升性能
        const handlers = {
            [Node.ELEMENT_NODE]: handleElement,
            [Node.TEXT_NODE]: handleTextNode
        };

        let currentNode;
        while ((currentNode = treeWalker.nextNode())) {
            handlers[currentNode.nodeType]?.(currentNode);
        }

        const duration = performance.now() - start;
        if (duration > 10) {
            // console.warn(`【Debug】节点遍历耗时: ${duration.toFixed(2)}ms`, rootNode);
            console.log(`节点遍历耗时: ${duration.toFixed(2)}ms`);
        }
    }

    /**
     * detectPageType 函数：检测当前页面类型，基于URL、元素类名和meta信息。
     * @returns {string|boolean} 页面的类型，如'repository'、'dashboard'等，如果无法确定类型，那么返回 false。
     */
    function detectPageType() {
        const { PAGE_MAP, SPECIAL_SITES } = CONFIG;
        const url = new URL(window.location.href);
        const { hostname, pathname } = url;

        // 基础配置 ===============================================
        const site = PAGE_MAP[hostname] || 'github'; // 通过站点映射获取基础类型
        const isLogin = document.body.classList.contains("logged-in");
        const metaLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';

        // 页面特征检测 ============================================
        const isSession = document.body.classList.contains("session-authentication");
        const isHomepage = pathname === '/' && site === 'github';
        const isProfile = document.body.classList.contains("page-profile") || metaLocation === '/<user-name>';
        const isRepository = /\/<user-name>\/<repo-name>/.test(metaLocation);
        const isOrganization = /\/<org-login>/.test(metaLocation) || /^\/(?:orgs|organizations)/.test(pathname);

        // 正则配置 ================================================
        const { rePagePathRepo, rePagePathOrg, rePagePath } = I18N.conf;

        // 核心判断逻辑 ============================================
        let pageType;
        switch (true) { // 使用 switch(true) 模式处理多条件分支
            // 1. 登录相关页面
            case isSession:
                pageType = 'session-authentication';
                break;

            // 2. 特殊站点类型（gist/status/skills/education）
            case SPECIAL_SITES.includes(site):
                pageType = site;
                break;

            // 3. 个人资料页
            case isProfile:
                const tabParam = new URLSearchParams(url.search).get('tab');
                pageType = pathname.includes('/stars') ? 'page-profile/stars'
                         : tabParam ? `page-profile/${tabParam}`
                         : 'page-profile';
                break;

            // 4. 首页/仪表盘
            case isHomepage:
                pageType = isLogin ? 'dashboard' : 'homepage';
                break;

            // 5. 代码仓库页
            case isRepository:
                const repoMatch = pathname.match(rePagePathRepo);
                pageType = repoMatch ? `repository/${repoMatch[1]}` : 'repository';
                break;

            // 6. 组织页面
            case isOrganization:
                const orgMatch = pathname.match(rePagePathOrg);
                pageType = orgMatch ? `orgs/${orgMatch[1] || orgMatch.slice(-1)[0]}` : 'orgs';
                break;

            // 7. 默认处理逻辑
            default:
                const pathMatch = pathname.match(rePagePath);
                pageType = pathMatch ? (pathMatch[1] || pathMatch.slice(-1)[0]) : false;
        }

        console.log(`【Debug】pathname = ${pathname}, site = ${site}, isLogin = ${isLogin}, analyticsLocation = ${metaLocation}, isOrganization = ${isOrganization}, isRepository = ${isRepository}, isProfile = ${isProfile}, isSession = ${isSession}`)

        // 词库校验 ================================================
        if (pageType === false || !I18N[CONFIG.LANG]?.[pageType]) {
            console.warn(`[i18n] 页面类型未匹配或词库缺失: ${pageType}`);
            return false; // 明确返回 false 表示异常
        }

        return pageType;
    }

    /**
     * transTitle 函数：翻译页面标题
     */
    function transTitle() {
        const text = document.title; // 获取标题文本内容
        let translatedText = I18N[CONFIG.LANG]['title']['static'][text] || '';
        if (!translatedText) {
            const res = I18N[CONFIG.LANG]['title'].regexp || [];
            for (const [pattern, replacement] of res) {
                translatedText = text.replace(pattern, replacement);
                if (translatedText !== text) break;
            }
        }
        document.title = translatedText;
    }

    /**
     * transTimeElement 函数：翻译时间元素文本内容。
     * @param {Element} el - 需要翻译的元素。
     */
    function transTimeElement(el) {
        const text = el.childNodes.length > 0 ? el.lastChild.textContent : el.textContent;
        const translatedText = text.replace(/^on/, "");
        if (translatedText !== text) {
            el.textContent = translatedText;
        }
    }

    /**
     * watchTimeElement 函数：监视时间元素变化, 触发和调用时间元素翻译
     * @param {Element} el - 需要监视的元素。
     */
    function watchTimeElement(el) {
        new MutationObserver(mutations => {
            transTimeElement(mutations[0].addedNodes[0]);
        }).observe(el, {
            childList: true
        });
    }

    /**
     * transElement 函数：翻译指定元素的文本内容或属性。
     * @param {Element|DOMStringMap} el - 需要翻译的元素或元素的数据集 (node.dataset)。
     * @param {string} field - 需要翻译的属性名称或文本内容字段。
     */
    function transElement(el, field) {
        const text = el[field]; // 获取需要翻译的文本
        if (!text) return false; // 当 text 为空时，退出函数

        const translatedText = transText(text); // 翻译后的文本
        if (translatedText) {
            el[field] = translatedText; // 替换翻译后的内容
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
        const trimmedText = text.trim(); // 去除首尾空格
        const cleanedText = trimmedText.replace(/\xa0|[\s]+/g, ' '); // 去除多余空白字符（包括 &nbsp; 空格 换行符）

        // 尝试获取翻译结果
        const translatedText = fetchTranslatedText(cleanedText);

        // 如果找到翻译并且不与清理后的文本相同，则返回替换后的结果
        if (translatedText && translatedText !== cleanedText) {
            return text.replace(trimmedText, translatedText); // 替换原字符，保留首尾空白部分
        }

        return false;
    }

    /**
     * fetchTranslatedText 函数：从特定页面的词库中获得翻译文本内容。
     * @param {string} text - 需要翻译的文本内容。
     * @returns {string|boolean} 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false。
     */
    function fetchTranslatedText(text) {

        // 静态翻译
        let translatedText = pageConfig.staticDict[text]; // 默认翻译 公共部分

        if (typeof translatedText === 'string') return translatedText;

        // 正则翻译
        if (FeatureSet.enable_RegExp) {
            for (const [pattern, replacement] of pageConfig.regexpRules) {
                translatedText = text.replace(pattern, replacement);
                if (translatedText !== text) return translatedText;
            }
        }

        return false; // 没有翻译条目
    }

    /**
     * transDesc 函数：为指定的元素添加一个翻译按钮，并为该按钮添加点击事件。
     * @param {string} selector - CSS选择器，用于选择需要添加翻译按钮的元素。
     */
    function transDesc(selector) {
        // 使用 CSS 选择器选择元素
        const element = document.querySelector(selector);

        // 如果元素不存在 或者 translate-me 元素已存在，那么直接返回
        if (!element || element.nextElementSibling?.id === 'translate-me') return;

        // 在元素后面插入一个翻译按钮
        const button = document.createElement('div');
        button.id = 'translate-me';
        button.style.cssText = 'color: #1b95e0; font-size: small; cursor: pointer;';
        button.textContent = '翻译';
        element.after(button);

        // 为翻译按钮添加点击事件
        button.addEventListener('click', async() => {
            if (button.disabled) return;
            button.disabled = true;
            try {
                const descText = element.textContent.trim();
                if (!descText) return;

                // 执行翻译
                const translatedText = await requestRemoteTranslation(descText);

                // 安全创建结果元素
                const { name, url } = CONFIG.TRANS_ENGINES[CONFIG.transEngine]
                const resultContainer = document.createElement('div');
                resultContainer.innerHTML = `
                    <span style='font-size: small'>
                        由 <a target='_blank' style='color:#1b95e0;' href=${url}>${name}</a> 翻译👇
                    </span>
                    <br/>
                `;
                // 安全插入文本内容
                const textNode = document.createTextNode(translatedText);
                resultContainer.appendChild(textNode);

                button.remove();
                element.after(resultContainer);
            } finally {
                button.disabled = false;
            }
        });
    }

    /**
     * getNestedProperty 函数：获取嵌套属性的安全函数
     * @param {Object} obj - 需要查询的对象
     * @param {string} path - 属性路径，例如 'biz[0].sectionResult[0].dst'
     * @returns {*} - 返回嵌套属性的值
     */
    function getNestedProperty(obj, path) {
        return path.split('.').reduce((acc, part) => {
            const match = part.match(/(\w+)(?:\[(\d+)\])?/);
            if (!match) return undefined;
            const key = match[1];
            const index = match[2];
            if (acc && acc[key] !== undefined) {
                return index !== undefined ? acc[key][index] : acc[key];
            }
            return undefined;
        }, obj);
    }

    /**
     * requestRemoteTranslation 函数：将指定的文本发送到设定的翻译引擎进行翻译。
     * @param {string} text - 需要翻译的文本。
     */
    async function requestRemoteTranslation(text) {
        return new Promise((resolve) => {
            const { url_api, method, headers, getRequestData, responseIdentifier } = CONFIG.TRANS_ENGINES[CONFIG.transEngine];
            // 构建请求数据
            const requestData = getRequestData(text);

            // 使用 GM_xmlhttpRequest 函数发送 HTTP 请求
            GM_xmlhttpRequest({
                method: method,
                url: url_api, // 请求的 URL
                headers: headers,
                data: method === 'POST' ? JSON.stringify(requestData) : null,
                params: method === 'GET' ? requestData : null, // For GET requests
                onload: (res) => {
                    try {
                        const result = JSON.parse(res.responseText);
                        console.log(result);
                        const translatedText = getNestedProperty(result, responseIdentifier) || '翻译失败';
                        resolve(translatedText);
                    } catch {
                        resolve('翻译失败');
                    }
                },
                onerror: (err) => {
                    console.error('翻译请求失败:', err);
                    resolve(`翻译失败（${err.type}）`);
                }
            });
        });
    }

    /**
     * transBySelector 函数：通过 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译。
     */
    function transBySelector() {
        // 遍历每个翻译规则
        pageConfig.tranSelectors?.forEach(([selector, translatedText]) => {
            // 使用 CSS 选择器找到对应的元素
            const element = document.querySelector(selector);
            // 如果找到了元素，那么将其文本内容替换为翻译后的文本
            if (element) {
                element.textContent = translatedText;
            }
        })
    }

    /**
     * registerMenuCommand 函数：注册菜单。
     */
    function registerMenuCommand() {
        const createMenuCommand = (config) => {
            const { label, key, callback } = config;
            let menuId;

            const getMenuLabel = (label, isEnabled) =>
                `${isEnabled ? "禁用" : "启用"} ${label}`;

            const toggle = () => {
                const newFeatureState = !FeatureSet[key];
                GM_setValue(key, newFeatureState);
                FeatureSet[key] = newFeatureState;
                GM_notification(`${label}已${newFeatureState ? '启用' : '禁用'}`);

                // 调用回调函数
                if (callback) callback(newFeatureState);

                // 更新菜单命令的标签
                GM_unregisterMenuCommand(menuId);
                menuId = GM_registerMenuCommand(
                    getMenuLabel(label, newFeatureState),
                    toggle
                );
            };

            // 初始注册菜单命令
            menuId = GM_registerMenuCommand(
                getMenuLabel(label, FeatureSet[key]),
                toggle
            );
        };

        const menuConfigs = [
            {
                label: "正则功能",
                key: "enable_RegExp",
                callback: newFeatureState => {
                    if (newFeatureState) traverseNode(document.body);
                }
            },
            {
                label: "描述翻译",
                key: "enable_transDesc",
                callback: newFeatureState => {
                    if (newFeatureState && CONFIG.DESC_SELECTORS[pageConfig.currentPageType]) {
                        transDesc(CONFIG.DESC_SELECTORS[pageConfig.currentPageType]);
                    } else {
                        document.getElementById('translate-me')?.remove();
                    }
                }
            }
        ];

        // 注册所有菜单项
        menuConfigs.forEach(config => createMenuCommand(config));
    };

    /**
     * init 函数：初始化翻译功能。
     */
    function init() {
        // 获取当前页面的翻译规则
        updatePageConfig();
        console.log(`【Debug】开始 pageType= ${pageConfig.currentPageType}`);

        if (pageConfig.currentPageType) traverseNode(document.body);

        // 监视页面变化
        watchUpdate();
    }

    // 设置中文环境
    document.documentElement.lang = CONFIG.LANG;

    // 监测 HTML Lang 值, 设置中文环境
    new MutationObserver(() => {
        if (document.documentElement.lang === "en") {
            document.documentElement.lang = CONFIG.LANG;
        }
    }).observe(document.documentElement, {
        attributeFilter: ['lang']
    });

    // 监听 Turbo 获取响应之前事件
    document.addEventListener('turbo:before-fetch-response', () => {
        pageConfig.firstChangeURL = true;  // 页面开始切换前设置为 true
    });

    // 监听 Turbo 完成事件（延迟翻译）
    document.addEventListener('turbo:load', () => {
        if (!pageConfig.currentPageType) return;

        transTitle(); // 翻译页面标题
        transBySelector();

        if (FeatureSet.enable_transDesc && CONFIG.DESC_SELECTORS[pageConfig.currentPageType]) {
            transDesc(CONFIG.DESC_SELECTORS[pageConfig.currentPageType]);
        }
    });

    // 初始化菜单
    registerMenuCommand();

    // 在页面初始加载完成时执行
    window.addEventListener('DOMContentLoaded', init);

})(window, document);
