// ==UserScript==
// @name         GitHub 中文化插件
// @namespace    https://github.com/maboloshi/github-chinese
// @description  中文化 GitHub 界面的部分菜单及内容。原作者为楼教主(http://www.52cik.com/)。
// @copyright    2021, 沙漠之子 (https://maboloshi.github.io/Blog)
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.9.4-2026-05-21
// @author       沙漠之子
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://skills.github.com/*
// @match        https://gist.github.com/*
// @match        https://education.github.com/*
// @match        https://www.githubstatus.com/*
// @require      https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4-2026-05-21
// @run-at       document-start
// @grant        GM_addStyle
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

    /* =========================== 全局配置常量 =========================== */
    const CONFIG = {
        LANG: 'zh-CN', // 默认语言
        DEV: false, // 默认不开启开发者模式
        PAGE_MAP: { // 站点域名 -> 类型映射
            'gist.github.com': 'gist',
            'www.githubstatus.com': 'status',
            'skills.github.com': 'skills',
            'education.github.com': 'education'
        },
        SPECIAL_SITES: ['gist', 'status', 'skills', 'education'], // 特殊站点类型
        DESC_SELECTORS: { // 简介元素的CSS选择器
            repository: ".f4.tmp-my-3",
            gist: ".gist-content [itemprop='about']"
        },
        OBSERVER_CONFIG: { // MutationObserver配置
            childList: true,
            subtree: true,
            characterData: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm']
        },
        TRANS_ENGINES: { // 翻译引擎配置
            iflyrec: {
                name: '讯飞听见',
                url: 'https://fanyi.iflyrec.com/text-translate',
                url_api: 'https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://fanyi.iflyrec.com'
                },
                getRequestData: (text) => ({
                    from: 2, // 英语
                    to: 1,   // 简体中文
                    type: 1,
                    contents: [{ text: text }]
                }),
                responseIdentifier: 'biz[0]?.sectionResult[0]?.dst', // 翻译结果在响应中的路径
            },
        },
        STYLES: `
            /* 基础样式变量 */
            :root {
                --ghc-primary-color: #1b95e0;
                --ghc-bg-color: #f8f9fa;
                --ghc-border-color: #e1e4e8;
                --ghc-button-bg: #f6f8fa;
            }
            /* 浅色主题样式（默认） */
            .translate-button {
                color: var(--ghc-primary-color);
                font-size: small;
                cursor: pointer;
                margin-top: 5px;
                display: inline-block;
            }
            .translation-result {
                margin-top: 10px;
                padding: 8px;
                border: 1px solid var(--ghc-border-color);
                background-color: var(--ghc-button-bg);
                border-radius: 6px;
            }
            .translation-credit {
                font-size: small;
                color: var(--ghc-primary-color);
            }
            .translation-content {
                margin-top: 5px;
                white-space: pre-wrap;
            }

            /* 暗色主题适配 - 使用 prefers-color-scheme */
            @media (prefers-color-scheme: dark) {
                :root {
                    --ghc-primary-color: #58a6ff;
                    --ghc-bg-color: #0d1117;
                    --ghc-border-color: #30363d;
                    --ghc-button-bg: #21262d;
                }
            }
        `
    };

    /* =========================== 状态管理器 =========================== */
    const State = {
        // 功能开关
        featureSet: {
            enable_RegExp: GM_getValue("enable_RegExp", true),
            enable_transDesc: GM_getValue("enable_transDesc", true),
            enable_missedTerms: GM_getValue("enable_missedTerms", false),
            enable_onurlchange: false,
        },

        // 当前运行时状态
        pageConfig: null,        // 当前页面配置（null 表示无有效页面）
        currentURL: window.location.href, // 当前页面URL
        transEngine: 'iflyrec',  // 当前翻译引擎
        mutationObserver: null,  // DOM变化观察器
        urlChangeHandler: null,  // 存储URL变化处理器
        dynamicMenus: {},        // 动态菜单ID记录
        initDone: false,
    };

    /* =========================== 安全检查 =========================== */

    /**
     * 检查词库文件是否加载 — 未加载则抛出错误阻止继续执行
     */
    function checkI18NLoaded() {
        if (typeof I18N === 'undefined') {
            alert('GitHub 汉化插件：词库文件 locals.js 未加载，脚本无法运行！');
            throw new Error('[GitHub 中文化插件] 词库文件 locals.js 未加载');
        }
    }

    /**
     * 错误边界 — 包装函数，捕获异常避免阻断页面正常使用
     * @param {Function} fn - 要执行的函数
     * @param {string} label - 错误标签
     * @returns {Function} 包装后的函数
     */
    function safe(fn, label) {
        return function (...args) {
            try {
                return fn.apply(this, args);
            } catch (e) {
                console.error(`[GitHub 中文化插件] ${label} 出错:`, e);
            }
        };
    }

    /* =========================== 初始化入口 =========================== */
    function init() {
        checkI18NLoaded();
        initLangEnv();
        injectStyles();
        setupMenuCommands();
        setupInitTrans();
        setupUrlChangeListener();
        setupTurboEvents();
        State.initDone = true;
    }

    /**
     * 初始化并保护中文语言环境
     */
    function initLangEnv() {
        // 设置初始语言
        document.documentElement.lang = CONFIG.LANG;

        // 监视语言属性变化，防止被改回英文
        const langObserver = new MutationObserver(() => {
            // 如果检测到语言被改回英文，重新设置
            if (document.documentElement.lang === "en") {
                document.documentElement.lang = CONFIG.LANG;
            }
        });
        langObserver.observe(document.documentElement, { attributeFilter: ['lang'] });
    }

    /**
     * 注入自定义样式到页面
     */
    function injectStyles() {
        GM_addStyle(CONFIG.STYLES);
    }

    /**
     * 设置初始翻译
     *
     * 即使 @run-at document-start，Tampermonkey 注入脚本也可能晚于 DOMContentLoaded
     *（扩展冷启动、bfcache 恢复等场景）。因此不能假设注册监听器时事件尚未触发：
     * readyState 已是 interactive/complete 则直接执行，否则才注册一次性监听器。
     */
    function setupInitTrans() {
        function doInitTrans() {
            updatePageConfig('首次载入');
            if (State.pageConfig) {
                safe(traverseNode, '首次遍历')(document.body);
            }
            setupMutationObserver(); // 设置DOM变化观察器
        }

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            // 文档已就绪，直接执行
            doInitTrans();
        } else {
            // 等待 DOMContentLoaded
            window.addEventListener('DOMContentLoaded', doInitTrans, { once: true });
        }
    }

    /* =========================== URL 变化监听 =========================== */
    /**
     * 设置URL变化监听器
     * Tampermonkey 环境使用 onurlchange 事件，其他环境回退到 MutationObserver URL 检测
     */
    function setupUrlChangeListener() {
        // Tampermonkey 环境下 window.onurlchange 为 null（支持），其他环境为 undefined
        if (State.featureSet.enable_onurlchange && window.onurlchange === null) {

            // 创建URL变化处理函数
            State.urlChangeHandler = function (event) {
                console.log("URL变化检测 (Tampermonkey onurlchange)", event);
                handleUrlChange();
            };

            window.addEventListener('urlchange', State.urlChangeHandler);
            console.log("🛠️ 开发者模式：已启用 onurlchange 事件监听");
        } else {
            console.log("当前环境不支持 onurlchange 事件，使用传统URL检测方式");
        }
    }

    /**
     * 处理URL变化
     */
    function handleUrlChange() {
        const currentURL = window.location.href;

        // 如果URL没有实际变化，则跳过处理
        if (currentURL === State.currentURL) return;

        State.currentURL = currentURL;
        updatePageConfig("URL变化 (onurlchange)");

        // 重新设置观察器
        if (State.mutationObserver) {
            State.mutationObserver.disconnect();
        }

        // 如果页面类型有效，重新遍历DOM
        if (State.pageConfig) {
            safe(traverseNode, 'URL变化遍历')(document.body);
        }

        setupMutationObserver();
    }

    /* =========================== Turbo 事件 =========================== */
    /**
     * 设置Turbo框架事件监听
     * 处理GitHub的Turbolinks页面切换
     */
    function setupTurboEvents() {
        document.addEventListener('turbo:load', handleTurboLoad);
    }

    /**
     * 处理Turbo页面加载事件
     * 在新页面加载后执行必要的翻译
     */
    function handleTurboLoad() {
        if (!State.pageConfig) return;

        transTitle(); // 翻译页面标题
        transBySelector(); // 通过选择器翻译特定元素

        // 如果描述翻译功能启用，翻译页面描述
        if (State.featureSet.enable_transDesc &&
            CONFIG.DESC_SELECTORS[State.pageConfig.currentPageType]) {
            transDesc(CONFIG.DESC_SELECTORS[State.pageConfig.currentPageType]);
        }
    }

    /* =========================== 页面配置管理 =========================== */

    /**
     * 更新页面配置 — 页面类型变化时重建 State.pageConfig
     * @param {string} trigger - 触发更新的原因（用于调试）
     */
    function updatePageConfig(trigger) {
        const newType = detectPageType();
        if (!newType) {
            State.pageConfig = null;
        } else if (newType !== State.pageConfig?.currentPageType) {
            State.pageConfig = buildPageConfig(newType);
        }
        console.log(`【Debug】${trigger}触发, 页面类型为 ${State.pageConfig?.currentPageType}`);
    }

    /**
     * 构建页面配置对象
     * @param {string} pageType - 页面类型
     * @returns {Object} 页面配置对象
     */
    function buildPageConfig(pageType) {
        return {
            currentPageType: pageType, // 当前页面类型
            currentPath: window.location.pathname, // 当前路径
            titleStaticDict: I18N[CONFIG.LANG][pageType]?.title?.static || {},
            titleRegexpRules: I18N[CONFIG.LANG][pageType]?.title?.regexp || [],
            staticDict: { // 合并公共和页面特定的静态词典
                ...I18N[CONFIG.LANG].public.static,
                ...(I18N[CONFIG.LANG][pageType]?.static || {})
            },
            regexpRules: [ // 合并公共和页面特定的正则规则
                ...(I18N[CONFIG.LANG][pageType]?.regexp || []),
                ...(I18N[CONFIG.LANG].public.regexp || [])
            ],
            ignoreMutationSelectors: [ // 忽略的突变选择器
                ...(I18N.conf.ignoreMutationSelectorPage['*'] || []),
                ...(I18N.conf.ignoreMutationSelectorPage[pageType] || [])
            ].join(', '),
            ignoreSelectors: [ // 忽略的选择器
                ...(I18N.conf.ignoreSelectorPage['*'] || []),
                ...(I18N.conf.ignoreSelectorPage[pageType] || [])
            ].join(', '),
            characterData: (I18N.conf.characterDataPage || []).includes(pageType), // 是否监视文本节点变化
            transSelectors: [ // 翻译选择器规则
                ...(I18N[CONFIG.LANG].public.selector || []),
                ...(I18N[CONFIG.LANG][pageType]?.selector || [])
            ],
        };
    }

    /* =========================== 页面类型检测 =========================== */

    /**
     * 检测当前页面类型
     * @returns {string|boolean} 页面类型或false（如果未识别）
     */
    function detectPageType() {
        const url = new URL(window.location.href);
        const { PAGE_MAP, SPECIAL_SITES } = CONFIG;
        const { hostname, pathname } = url;

        // 基础配置
        const site = PAGE_MAP[hostname] || 'github'; // 通过站点映射获取基础类型
        const isLogin = document.body.classList.contains("logged-in");
        const metaLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';

        // 页面特征检测
        const isSession = document.body.classList.contains("session-authentication");
        const isHomepage = pathname === '/' && site === 'github';
        const isProfile = document.body.classList.contains("page-profile") || metaLocation === '/<user-name>';
        const isRepository = /\/<user-name>\/<repo-name>/.test(metaLocation);
        const isOrganization = /\/<org-login>/.test(metaLocation) || /^\/(?:orgs|organizations)/.test(pathname);

        let pageType;
        // 根据页面特征确定页面类型
        switch (true) { // 使用 switch(true) 模式处理多条件分支
            case isSession: // 登录/认证页面
                pageType = 'session-authentication';
                break;
            case SPECIAL_SITES.includes(site): // 特殊站点
                pageType = site;
                break;
            case isProfile: { // 用户资料页面
                const tabParam = new URLSearchParams(url.search).get('tab');
                pageType = pathname.includes('/stars') ? 'page-profile/stars'
                         : tabParam ? `page-profile/${tabParam}`
                         : 'page-profile';
                break;
            }
            case isHomepage: // 首页/仪表盘
                pageType = isLogin ? 'dashboard' : 'homepage';
                break;
            case isRepository: { // 代码仓库页面
                const repoMatch = pathname.match(I18N.conf.rePagePathRepo);
                pageType = repoMatch ? `repository/${repoMatch[1]}` : 'repository';
                break;
            }
            case isOrganization: { // 组织页面
                const orgMatch = pathname.match(I18N.conf.rePagePathOrg);
                pageType = orgMatch ? `orgs/${orgMatch[1] || orgMatch.slice(-1)[0]}` : 'orgs';
                break;
            }
            default: { // 默认页面类型
                const pathMatch = pathname.match(I18N.conf.rePagePath);
                pageType = pathMatch ? (pathMatch[1] || pathMatch.slice(-1)[0]) : false;
            }
        }

        // 验证页面类型是否有效
        if (pageType === false || !I18N[CONFIG.LANG]?.[pageType]) {
            const reason = pageType === false
                ? '路径未匹配任何页面规则'
                : `词库中缺少 "${pageType}" 的翻译`;
            console.warn('[i18n] %s', reason, {
                url: window.location.href,
                hostname,
                pathname,
                site,
                pageType,
                isLogin,
                metaLocation
            });
            return false;
        }

        return pageType;
    }

    /* =========================== MutationObserver =========================== */

    /**
     * 设置DOM变化观察器
     * 监听页面变化并触发翻译
     */
    function setupMutationObserver() {
        // 缓存当前页面的 URL
        let previousURL = window.location.href;

        if (State.mutationObserver) {
            State.mutationObserver.disconnect();
        }

        State.mutationObserver = new MutationObserver(
            safe((mutations) => {
                const currentURL = window.location.href;
                // 当没有 onurlchange 支持时，通过 Observer 检测 URL 变化
                if (!State.urlChangeHandler && currentURL !== previousURL) {
                    previousURL = currentURL;
                    State.currentURL = currentURL;
                    updatePageConfig("URL变化 (MutationObserver)");
                }

                // 处理DOM变化
                if (State.pageConfig) {
                    processMutations(mutations);
                }
            }, 'MutationObserver')
        );

        // 开始观察页面主体
        State.mutationObserver.observe(document.body, CONFIG.OBSERVER_CONFIG);
    }

    /**
     * 处理MutationObserver检测到的变化
     * 收集突变节点、过滤忽略选择器、对祖先-后代关系去重，仅遍历顶层节点
     * @param {Array} mutations - 变化记录数组
     */
    function processMutations(mutations) {
        const nodesToProcess = new Set();

        // 收集需要处理的节点
        mutations.forEach(({ target, addedNodes, type }) => {
            if (type === 'childList' && addedNodes.length > 0) {
                // 处理新增节点
                addedNodes.forEach(node => {
                    const parent = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
                    if (parent && !parent.closest?.(State.pageConfig.ignoreMutationSelectors)) {
                        nodesToProcess.add(node);
                    }
                });
            } else if (type === 'attributes') {
                // 处理属性变化，target 就是元素
                if (target && !target.closest?.(State.pageConfig.ignoreMutationSelectors)) {
                    nodesToProcess.add(target);
                }
            } else if (type === 'characterData' && State.pageConfig.characterData) {
                // 处理文本变化，target 是文本节点，取其父元素
                const parent = target.parentElement;
                if (parent && !parent.closest?.(State.pageConfig.ignoreMutationSelectors)) {
                    nodesToProcess.add(target);
                }
            }
        });

        // 过滤掉祖先已在集合中的后代节点，避免重复遍历
        const topNodes = new Set();
        nodesToProcess.forEach(node => {
            let ancestor = node.parentElement;
            let hasAncestor = false;
            while (ancestor) {
                if (nodesToProcess.has(ancestor)) {
                    hasAncestor = true;
                    return;
                }
                ancestor = ancestor.parentElement;
            }
            if (!hasAncestor) {
                topNodes.add(node);
            }
        });

        console.log("DOM变化(已过滤)", topNodes);

        // 仅遍历顶层节点
        topNodes.forEach(node => {
            traverseNode(node);
        });
    }

    /* =========================== DOM 遍历与节点处理 =========================== */
    /**
     * 遍历节点树并进行翻译
     * @param {Node} rootNode - 要遍历的根节点
     */
    function traverseNode(rootNode) {
        const start = performance.now();

        // 文本节点直接处理
        if (rootNode.nodeType === Node.TEXT_NODE) {
            handleTextNode(rootNode);
            return;
        }

        // 创建TreeWalker遍历节点树
        const treeWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
            node => {
                if (node.nodeType === Node.ELEMENT_NODE
                    && State.pageConfig.ignoreSelectors
                    && node.matches(State.pageConfig.ignoreSelectors)) {
                    return NodeFilter.FILTER_REJECT; // 跳过忽略的选择器
                }
                return NodeFilter.FILTER_ACCEPT; // 接受其他节点
            }
        );

        let currentNode;
        // 遍历所有节点
        while ((currentNode = treeWalker.nextNode())) {
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
                handleElementNode(currentNode);
            } else if (currentNode.nodeType === Node.TEXT_NODE) {
                handleTextNode(currentNode);
            }
        }

        // 性能监控
        const duration = performance.now() - start;
        if (duration > 10) {
            console.log(`节点遍历耗时: ${duration.toFixed(2)}ms`);
        }
    }

    /**
     * 处理文本节点
     * @param {Node} node - 文本节点
     */
    function handleTextNode(node) {
        if (node.length > 500) return; // 跳过长文本节点
        transElementAttrs(node, 'data'); // 翻译文本内容
    }

    /**
     * 处理元素节点
     * @param {Element} node - 元素节点
     */
    function handleElementNode(node) {
        // 根据标签类型进行不同的翻译处理
        const tag = node.tagName;

        if (tag === "RELATIVE-TIME") { // 相对时间元素
            if (node.shadowRoot) {
                transTimeElement(node.shadowRoot);
            }
            return;
        }

        if (tag === "INPUT" || tag === "TEXTAREA") { // 输入框和文本域
            if (['button', 'submit', 'reset'].includes(node.type)) {
                transElementAttrs(node.dataset, 'confirm'); // 确认对话框文本
                transElementAttrs(node, 'value'); // 值属性
            } else {
                transElementAttrs(node, 'placeholder'); // 占位符
            }
            return;
        }

        if (tag === "OPTGROUP") { // 选项组
            transElementAttrs(node, 'label'); // 标签文本
            return;
        }

        if (tag === "BUTTON") { // 按钮
            transElementAttrs(node, [
                'title',
                'cancelConfirmText'
            ]);
            transElementAttrs(node.dataset, [
                'confirm', // 确认文本
                'confirmText', // 确认按钮文本
                'confirmCancelText', // 取消按钮文本
                'disableWith', // 禁用提示
                'visibleText'
            ]);
        }

        if (tag === "A" || tag === "SPAN") {
            transElementAttrs(node, 'title'); // 标题提示
            transElementAttrs(node.dataset, 'visibleText'); // 可见文本
        }

        // 带有 tooltipped 样式的元素
        if (/tooltipped/.test(node.className)) {
            transElementAttrs(node, 'ariaLabel');
        }
    }

    /* =========================== 翻译功能 =========================== */

    /**
     * 翻译页面标题
     */
    function transTitle() {
        const text = document.title;
        let result = State.pageConfig.titleStaticDict[text] || '';

        // 尝试静态翻译
        if (!result) {
            // 尝试正则表达式翻译
            for (const [pattern, replacement] of State.pageConfig.titleRegexpRules) {
                result = text.replace(pattern, replacement);
                if (result !== text) break;
            }
        }

        // 应用翻译结果
        if (result) {
            document.title = result;
        }
    }

    /**
     * 翻译时间元素
     * @param {Element} element - 时间元素
     */
    function transTimeElement(element) {
        // 获取时间文本
        const text = element.textContent;
        if (!text) return;
        // 移除开头的"on"
        const result = text.replace(/^on/, "");
        if (result !== text) {
            element.textContent = result; // 应用翻译
        }
    }

    /**
     * 翻译元素的单个属性
     * @param {Object} target - 元素对象或元素数据集
     * @param {string} attrName - 要翻译的属性名
     */
    function transElementAttr(target, attrName) {
        const text = target[attrName];
        if (!text) return;

        const result = transText(text);
        if (result) {
            target[attrName] = result;
        }
    }

    /**
     * 批量翻译元素的多个属性
     * @param {Object} target - 元素对象或元素数据集
     * @param {string|string[]} attrs - 要翻译的属性名或属性名数组
     */
    function transElementAttrs(target, attrs) {
        const attrList = Array.isArray(attrs) ? attrs : [attrs];
        attrList.forEach(attrName => transElementAttr(target, attrName));
    }

    /**
     * 通过选择器翻译特定元素
     */
    function transBySelector() {
        State.pageConfig.transSelectors?.forEach(([selector, result]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = result; // 应用翻译
            }
        });
    }

    /**
     * 翻译文本内容
     * @param {string} text - 要翻译的文本
     * @returns {string|boolean} 翻译后的文本或 false
     */
    function transText(text) {
        // 跳过不需要翻译的文本：
        // 1. 空文本（包空白字符）或纯数字
        // 2. 纯中文字符
        // 3. 不包含英文字母和,.符号的文本
        if (/^[\s0-9]*$/.test(text) ||
            /^[\u4e00-\u9fa5]+$/.test(text) ||
            !/[a-zA-Z,.]/.test(text)) {
            return false;
        }

        // 清理文本：去除首尾空格和多余空白
        const trimmedText = text.trim();
        const cleanedText = trimmedText.replace(/\xa0|[\s]+/g, ' ');

        // 获取翻译
        const result = fetchTransResult(cleanedText);
        if (result && result !== cleanedText) {
            return text.replace(trimmedText, result);
        }

        return false;
    }

    /**
     * 从词库获取翻译 — 直接读取 State.pageConfig
     * @param {string} text - 要翻译的文本
     * @returns {string|boolean} 翻译结果或 false
     */
    function fetchTransResult(text) {
        if (!State.pageConfig) return false;

        // 静态词典查找
        const staticResult = State.pageConfig.staticDict[text];
        if (typeof staticResult === 'string') {
            MissedTermsManager.cleanup(text, State.pageConfig.currentPath);
            return staticResult;
        }

        // 正则规则查找
        if (State.featureSet.enable_RegExp) {
            for (const [pattern, replacement] of State.pageConfig.regexpRules) {
                const result = text.replace(pattern, replacement);
                if (result !== text) {
                    MissedTermsManager.cleanup(text, State.pageConfig.currentPath);
                    return result;
                }
            }
        }

        // 记录未命中词条
        if (State.featureSet.enable_missedTerms) {
            MissedTermsManager.record(text, State.pageConfig.currentPath);
            refreshMenuStates();
        }

        return false;
    }

    /* =========================== 远程翻译 =========================== */

    /**
     * 为描述元素添加翻译按钮
     * @param {string} selector - 描述元素的选择器
     */
    function transDesc(selector) {
        const element = document.querySelector(selector);
        if (!element) return;

        // 修复：安全检查 classList.contains，避免 null sibling 时崩溃
        const nextSibling = element.nextElementSibling;
        if (nextSibling?.classList?.contains('translate-button')) return;

        // 创建翻译按钮
        const button = document.createElement('div');
        button.classList.add('translate-button');
        button.textContent = '翻译';
        element.after(button);

        // 绑定点击事件
        button.addEventListener('click', () => handleTransClick(button, element));
    }

    /**
     * 处理翻译按钮点击事件
     * @param {Element} button - 翻译按钮元素
     * @param {Element} element - 要翻译的元素
     */
    function handleTransClick(button, element) {
        if (button.disabled) return;
        button.disabled = true; // 防止重复点击

        const descText = element.textContent.trim();
        if (!descText) {
            button.disabled = false;
            return;
        }

        // 发起远程翻译请求
        requestRemoteTrans(descText)
            .then(result => {
                showTransResult(element, button, result);
            })
            .catch(error => {
                console.error('翻译失败:', error);
                button.disabled = false; // 启用按钮以允许重试
            });
    }

    /**
     * 显示翻译结果
     * @param {Element} element - 原始元素
     * @param {Element} button - 翻译按钮
     * @param {string} result - 翻译结果
     */
    function showTransResult(element, button, result) {
        const { name, url } = CONFIG.TRANS_ENGINES[State.transEngine];

        // 创建结果容器 — 结构与不可信文本分离，防止 XSS
        const resultContainer = document.createElement('div');
        resultContainer.className = 'translation-result';
        resultContainer.innerHTML = `
            <span class="translation-credit">
                由 <a target='_blank' href='${url}'>${name}</a> 翻译👇
            </span>
            <br/>
            <div class="translation-content"></div>
        `;

        // API 响应文本使用 textContent，禁止 HTML 解析
        resultContainer.querySelector('.translation-content').textContent = result;

        // 移除按钮并显示结果
        button.remove();
        element.after(resultContainer);
    }

    /**
     * 请求远程翻译API
     * @param {string} text - 要翻译的文本
     * @returns {Promise} 返回翻译结果的Promise
     */
    function requestRemoteTrans(text) {
        return new Promise((resolve, reject) => {
            const engine = CONFIG.TRANS_ENGINES[State.transEngine];
            const { url_api, method, headers, getRequestData, responseIdentifier } = engine;

            // 准备请求数据
            const requestData = getRequestData(text);

            // 使用GM_xmlhttpRequest发起跨域请求
            GM_xmlhttpRequest({
                method: method,
                url: url_api,
                headers: headers,
                data: method === 'POST' ? JSON.stringify(requestData) : null,
                params: method === 'GET' ? requestData : null, // For GET requests
                timeout: 10000, // 10秒超时
                onload: (res) => {
                    try {
                        const response = JSON.parse(res.responseText);
                        // 从响应中提取翻译结果
                        const result = getNestedProperty(response, responseIdentifier);
                        if (result) {
                            resolve(result);
                        } else {
                            reject(new Error('翻译结果无效'));
                        }
                    } catch (err) {
                        reject(err);
                    }
                },
                onerror: (err) => {
                    reject(err);
                }
            });
        });
    }

    /**
     * 安全获取嵌套对象属性
     * 支持路径格式如 'biz[0]?.sectionResult[0]?.dst'
     *   - '?.' 在路径中作为可选链标记被忽略，实际按强制访问处理
     * @param {Object} obj - 目标对象
     * @param {string} path - 属性路径
     * @returns {*} 属性值或 undefined
     */
    function getNestedProperty(obj, path) {
        // 移除路径中的 ?. 标记（讯飞API返回的路径表示可选，但此处按强制处理）
        const cleanPath = path.replace(/\?\./g, '.');
        return cleanPath.split('.').reduce((acc, part) => {
            if (!acc) return undefined;
            const match = part.match(/^(\w+)(?:\[(\d+)\])?$/);
            if (!match) return undefined;
            const key = match[1];
            const index = match[2];
            // 处理数组索引或对象属性
            return index !== undefined ? acc[key]?.[index] : acc[key];
        }, obj);
    }

    /* =========================== 未命中词条管理器 =========================== */
    const MissedTermsManager = {
        /**
         * 未命中词条数据结构（简洁模式）
         * {
         *   [pathname]: {
         *     "原始文本1": "",
         *     "原始文本2": "",
         *     ...
         *   }
         * }
         */
        data: GM_getValue("missedTerms", {}),

        /**
         * 记录未命中词条
         * @param {string} text - 未翻译的文本
         * @param {string} path - 当前页面路径
         */
        record(text, path) {
            if (!path) return false;
            if (!this.data[path]) {
                this.data[path] = {};
            }

            // 使用对象存储，保持简洁
            if (!(text in this.data[path])) {
                this.data[path][text] = "";
                this.save();
                return true; // 新增词条
            }
            return false; // 词条已存在
        },

        /**
         * 清理已命中的词条
         * @param {string} text - 已翻译的文本
         * @param {string} path - 当前页面路径
         */
        cleanup(text, path) {
            if (!path) return false;
            if (this.data[path] && text in this.data[path]) {
                delete this.data[path][text];

                // 如果该路径下没有词条了，删除路径条目
                if (Object.keys(this.data[path]).length === 0) {
                    delete this.data[path];
                }
                this.save();
                return true;
            }
            return false;
        },

        /**
         * 获取所有未命中词条
         * @returns {Object} 未命中词条数据
         */
        getAll() {
            return this.data;
        },

        /**
         * 按路径获取词条
         * @param {string} path - 页面路径
         * @returns {Object} 该路径下的词条对象
         */
        getByPath(path) {
            return this.data[path] || {};
        },

        /**
         * 获取所有词条的文本数组（按路径分组）
         * @returns {Array} 格式为 [{path, terms: []}, ...]
         */
        getAllTermsArray() {
            return Object.entries(this.data).map(([path, terms]) => ({
                path,
                terms: Object.keys(terms)
            }));
        },

        /**
         * 清空所有词条
         */
        clearAll() {
            this.data = {};
            this.save();
        },

        /**
         * 清空指定路径的词条
         * @param {string} path - 页面路径
         */
        clearPath(path) {
            if (this.data[path]) {
                delete this.data[path];
                this.save();
            }
        },

        /**
         * 获取统计信息
         * @returns {Object} 统计信息
         */
        getStats() {
            const paths = Object.keys(this.data);
            const totalTerms = paths.reduce((sum, path) =>
                sum + Object.keys(this.data[path]).length, 0
            );
            return { totalPaths: paths.length, totalTerms: totalTerms };
        },

        /**
         * 导出数据
         * @returns {Object} 导出数据
         */
        exportData() {
            const data = this.data;
            const stats = this.getStats();
            return {
                metadata: {
                    exportedAt: new Date().toISOString(),
                    version: "1.0",
                    ...stats
                },
                data
            };
        },

        /**
         * 保存数据到存储
         */
        save() {
            GM_setValue("missedTerms", this.data);
        }
    };

    /* =========================== 用户菜单 =========================== */

    /**
     * 1. 动态菜单管理
     */
    function refreshMenuStates() {
        // 注销所有动态菜单
        Object.values(State.dynamicMenus).forEach(id => GM_unregisterMenuCommand(id));
        State.dynamicMenus = {};

        // 仅开发者模式下显示未命中词条相关菜单
        if (!CONFIG.DEV) return;

        // 切换菜单
        const toggleLabel = `${State.featureSet.enable_missedTerms ? "禁用" : "启用"} 未命中词条记录`;
        State.dynamicMenus.toggle = GM_registerMenuCommand(toggleLabel, () => {
            const newState = !State.featureSet.enable_missedTerms;
            State.featureSet.enable_missedTerms = newState;
            GM_setValue("enable_missedTerms", newState);

            if (!newState) {
                MissedTermsManager.clearAll();
                GM_notification("未命中词条记录已禁用，所有记录已清空");
            } else {
                GM_notification("未命中词条记录已启用");
            }

            refreshMenuStates();
        });

        // 启用 + 有词条时显示导出和清空菜单
        if (State.featureSet.enable_missedTerms) {
            const stats = MissedTermsManager.getStats();
            const hasData = stats.totalTerms > 0;

            if (hasData) {
                // 导出菜单
                State.dynamicMenus.export = GM_registerMenuCommand(
                    `📥 导出未命中词条 (${stats.totalTerms}条)`,
                    () => {
                        const exportData = MissedTermsManager.exportData();
                        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                            type: "application/json"
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `GitHub_未命中词条_${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }
                );

                // 清空菜单
                State.dynamicMenus.clear = GM_registerMenuCommand(
                    "🗑️ 清空未命中词条",
                    () => {
                        if (confirm(`确定要清空所有未命中词条吗？\n共 ${stats.totalPaths} 个页面，${stats.totalTerms} 个词条`)) {
                            MissedTermsManager.clearAll();
                            GM_notification("未命中词条记录已清空");
                            refreshMenuStates();
                        }
                    }
                );

                // 查看统计菜单
                State.dynamicMenus.stats = GM_registerMenuCommand(
                    "📊 查看统计",
                    () => {
                        const s = MissedTermsManager.getStats();
                        GM_notification({
                            title: "未命中词条统计",
                            text: `页面数: ${s.totalPaths}\n词条数: ${s.totalTerms}`,
                            timeout: 5000
                        });
                    }
                );
            }
        }
    }

    /**
     * 2. 静态菜单创建
     * @param {Object} config - 菜单配置
     */
    function createMenuCommand(config) {
        const { label, key, callback } = config;
        let menuId;

        // 生成菜单标签（根据当前状态）
        const getMenuLabel = () =>
            `${State.featureSet[key] ? "禁用" : "启用"} ${label}`;

        // 切换功能状态
        const toggle = () => {
            const newState = !State.featureSet[key];
            // 保存到存储
            GM_setValue(key, newState);
            State.featureSet[key] = newState;
            // 显示通知
            GM_notification(`${label}已${newState ? '启用' : '禁用'}`);

            // 执行回调
            callback?.(newState);

            // 重新注册菜单（更新标签）
            GM_unregisterMenuCommand(menuId);
            menuId = GM_registerMenuCommand(getMenuLabel(), toggle);
        };

        // 初始注册菜单
        menuId = GM_registerMenuCommand(getMenuLabel(), toggle);
    }

    /**
     * 3. 主菜单设置
     */
    function setupMenuCommands() {
        const menuConfigs = [
            {
                label: "正则功能",
                key: "enable_RegExp",
                callback: (enabled) => {
                    if (enabled && State.pageConfig) safe(traverseNode, '菜单触发遍历')(document.body);
                }
            },
            {
                label: "描述翻译",
                key: "enable_transDesc",
                callback: (enabled) => {
                    const pageType = State.pageConfig?.currentPageType;
                    if (enabled && pageType) {
                        // 启用描述翻译
                        transDesc(CONFIG.DESC_SELECTORS[pageType]);
                    } else if (!enabled) {
                        // 禁用描述翻译，移除按钮
                        document.querySelector('.translate-button')?.remove();
                    }
                }
            }
        ];

        // 为每个配置创建静态菜单
        menuConfigs.forEach(config => createMenuCommand(config));

        // 初始化动态菜单
        refreshMenuStates();
    }

    /* =========================== 启动 =========================== */
    init();
})(window, document);
