// ==UserScript==
// @name         GitHub 中文化插件（繁體版）
// @namespace    https://github.com/maboloshi/github-chinese
// @description  中文化 GitHub 界面的部分菜單及內容。原作者為樓教主(http://www.52cik.com/)。
// @copyright    2021, 沙漠之子 (https://maboloshi.github.io/Blog)
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.9.4.3-2026-06-17
// @author       沙漠之子
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://skills.github.com/*
// @match        https://gist.github.com/*
// @match        https://education.github.com/*
// @match        https://www.githubstatus.com/*
// @require      https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals_zh-TW.js?v1.9.4.3-2026-06-17
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
        LANG: 'zh-TW', // 默認語言
        DEV: false, // 默認不開啟開發者模式
        PAGE_MAP: { // 站點域名 -> 類型映射
            'gist.github.com': 'gist',
            'www.githubstatus.com': 'status',
            'skills.github.com': 'skills',
            'education.github.com': 'education'
        },
        SPECIAL_SITES: ['gist', 'status', 'skills', 'education'], // 特殊站點類型
        DESC_SELECTORS: { // 簡介元素的CSS選擇器
            repository: ".f4.tmp-my-3",
            gist: ".gist-content [itemprop='about']"
        },
        OBSERVER_CONFIG: { // MutationObserver配置
            childList: true,
            subtree: true,
            characterData: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm']
        },
        TRANS_ENGINES: { // 翻譯引擎配置
            iflyrec: {
                name: '訊飛聽見',
                url: 'https://fanyi.iflyrec.com/text-translate',
                url_api: 'https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://fanyi.iflyrec.com'
                },
                getRequestData: (text) => ({
                    from: 2, // 英語
                    to: 1,   // 簡體中文
                    type: 1,
                    contents: [{ text: text }]
                }),
                responseIdentifier: 'biz[0]?.sectionResult[0]?.dst', // 翻譯結果在響應中的路徑
            },
        },
        STYLES: `
            /* 基礎樣式變量 */
            :root {
                --ghc-primary-color: #1b95e0;
                --ghc-bg-color: #f8f9fa;
                --ghc-border-color: #e1e4e8;
                --ghc-button-bg: #f6f8fa;
            }
            /* 淺色主題樣式（默認） */
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

            /* 暗色主題適配 - 使用 prefers-color-scheme */
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

    /* =========================== 狀態管理器 =========================== */
    const State = {
        // 功能開關
        featureSet: {
            enable_RegExp: GM_getValue("enable_RegExp", true),
            enable_transDesc: GM_getValue("enable_transDesc", true),
            enable_missedTerms: GM_getValue("enable_missedTerms", false),
            enable_onurlchange: false,
        },

        // 當前運行時狀態
        pageConfig: null,        // 當前頁面配置（null 表示無有效頁面）
        currentURL: window.location.href, // 當前頁面URL
        transEngine: 'iflyrec',  // 當前翻譯引擎
        mutationObserver: null,  // DOM變化觀察器
        urlChangeHandler: null,  // 存儲URL變化處理器
        dynamicMenus: {},        // 動態菜單ID記錄
        initDone: false,
    };

    /* =========================== 安全檢查 =========================== */

    /**
     * 檢查詞庫文件是否加載 — 未加載則拋出錯誤阻止繼續執行
     */
    function checkI18NLoaded() {
        if (typeof I18N === 'undefined') {
            alert('GitHub 漢化插件：詞庫文件 locals.js 未加載，腳本無法運行！');
            throw new Error('[GitHub 中文化插件] 詞庫文件 locals.js 未加載');
        }
    }

    /**
     * 錯誤邊界 — 包裝函數，捕獲異常避免阻斷頁面正常使用
     * @param {Function} fn - 要執行的函數
     * @param {string} label - 錯誤標簽
     * @returns {Function} 包裝後的函數
     */
    function safe(fn, label) {
        return function (...args) {
            try {
                return fn.apply(this, args);
            } catch (e) {
                console.error(`[GitHub 中文化插件] ${label} 出錯:`, e);
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
     * 初始化並保護中文語言環境
     */
    function initLangEnv() {
        // 設置初始語言
        document.documentElement.lang = CONFIG.LANG;

        // 監視語言屬性變化，防止被改回英文
        const langObserver = new MutationObserver(() => {
            // 如果檢測到語言被改回英文，重新設置
            if (document.documentElement.lang === "en") {
                document.documentElement.lang = CONFIG.LANG;
            }
        });
        langObserver.observe(document.documentElement, { attributeFilter: ['lang'] });
    }

    /**
     * 註入自定義樣式到頁面
     */
    function injectStyles() {
        GM_addStyle(CONFIG.STYLES);
    }

    /**
     * 設置初始翻譯
     *
     * 即使 @run-at document-start，Tampermonkey 註入腳本也可能晚於 DOMContentLoaded
     *（擴展冷啟動、bfcache 恢復等場景）。因此不能假設註冊監聽器時事件尚未觸發：
     * readyState 已是 interactive/complete 則直接執行，否則才註冊一次性監聽器。
     */
    function setupInitTrans() {
        function doInitTrans() {
            updatePageConfig('首次載入');
            if (State.pageConfig) {
                safe(traverseNode, '首次遍歷')(document.body);
            }
            setupMutationObserver(); // 設置DOM變化觀察器
        }

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            // 文檔已就緒，直接執行
            doInitTrans();
        } else {
            // 等待 DOMContentLoaded
            window.addEventListener('DOMContentLoaded', doInitTrans, { once: true });
        }
    }

    /* =========================== URL 變化監聽 =========================== */
    /**
     * 設置URL變化監聽器
     * Tampermonkey 環境使用 onurlchange 事件，其他環境回退到 MutationObserver URL 檢測
     */
    function setupUrlChangeListener() {
        // Tampermonkey 環境下 window.onurlchange 為 null（支持），其他環境為 undefined
        if (State.featureSet.enable_onurlchange && window.onurlchange === null) {

            // 創建URL變化處理函數
            State.urlChangeHandler = function (event) {
                console.log("URL變化檢測 (Tampermonkey onurlchange)", event);
                handleUrlChange();
            };

            window.addEventListener('urlchange', State.urlChangeHandler);
            console.log("🛠️ 開發者模式：已啟用 onurlchange 事件監聽");
        } else {
            console.log("當前環境不支持 onurlchange 事件，使用傳統URL檢測方式");
        }
    }

    /**
     * 處理URL變化
     */
    function handleUrlChange() {
        const currentURL = window.location.href;

        // 如果URL沒有實際變化，則跳過處理
        if (currentURL === State.currentURL) return;

        State.currentURL = currentURL;
        updatePageConfig("URL變化 (onurlchange)");

        // 重新設置觀察器
        if (State.mutationObserver) {
            State.mutationObserver.disconnect();
        }

        // 如果頁面類型有效，重新遍歷DOM
        if (State.pageConfig) {
            safe(traverseNode, 'URL變化遍歷')(document.body);
        }

        setupMutationObserver();
    }

    /* =========================== Turbo 事件 =========================== */
    /**
     * 設置Turbo框架事件監聽
     * 處理GitHub的Turbolinks頁面切換
     */
    function setupTurboEvents() {
        document.addEventListener('turbo:load', handleTurboLoad);
    }

    /**
     * 處理Turbo頁面加載事件
     * 在新頁面加載後執行必要的翻譯
     */
    function handleTurboLoad() {
        if (!State.pageConfig) return;

        transTitle(); // 翻譯頁面標題
        transBySelector(); // 通過選擇器翻譯特定元素

        // 如果描述翻譯功能啟用，翻譯頁面描述
        if (State.featureSet.enable_transDesc &&
            CONFIG.DESC_SELECTORS[State.pageConfig.currentPageType]) {
            transDesc(CONFIG.DESC_SELECTORS[State.pageConfig.currentPageType]);
        }
    }

    /* =========================== 頁面配置管理 =========================== */

    /**
     * 更新頁面配置 — 頁面類型變化時重建 State.pageConfig
     * @param {string} trigger - 觸發更新的原因（用於調試）
     */
    function updatePageConfig(trigger) {
        const newType = detectPageType();
        if (!newType) {
            State.pageConfig = null;
        } else if (newType !== State.pageConfig?.currentPageType) {
            State.pageConfig = buildPageConfig(newType);
        }
        console.log(`【Debug】${trigger}觸發, 頁面類型為 ${State.pageConfig?.currentPageType}`);
    }

    /**
     * 構建頁面配置對象
     * @param {string} pageType - 頁面類型
     * @returns {Object} 頁面配置對象
     */
    function buildPageConfig(pageType) {
        return {
            currentPageType: pageType, // 當前頁面類型
            currentPath: window.location.pathname, // 當前路徑
            titleStaticDict: I18N[CONFIG.LANG][pageType]?.title?.static || {},
            titleRegexpRules: I18N[CONFIG.LANG][pageType]?.title?.regexp || [],
            staticDict: { // 合並公共和頁面特定的靜態詞典
                ...I18N[CONFIG.LANG].public.static,
                ...(I18N[CONFIG.LANG][pageType]?.static || {})
            },
            regexpRules: [ // 合並公共和頁面特定的正則規則
                ...(I18N[CONFIG.LANG][pageType]?.regexp || []),
                ...(I18N[CONFIG.LANG].public.regexp || [])
            ],
            ignoreMutationSelectors: [ // 忽略的突變選擇器
                ...(I18N.conf.ignoreMutationSelectorPage['*'] || []),
                ...(I18N.conf.ignoreMutationSelectorPage[pageType] || [])
            ].join(', '),
            ignoreSelectors: [ // 忽略的選擇器
                ...(I18N.conf.ignoreSelectorPage['*'] || []),
                ...(I18N.conf.ignoreSelectorPage[pageType] || [])
            ].join(', '),
            characterData: (I18N.conf.characterDataPage || []).includes(pageType), // 是否監視文本節點變化
            transSelectors: [ // 翻譯選擇器規則
                ...(I18N[CONFIG.LANG].public.selector || []),
                ...(I18N[CONFIG.LANG][pageType]?.selector || [])
            ],
        };
    }

    /* =========================== 頁面類型檢測 =========================== */

    /**
     * 檢測當前頁面類型
     * @returns {string|boolean} 頁面類型或false（如果未識別）
     */
    function detectPageType() {
        const url = new URL(window.location.href);
        const { PAGE_MAP, SPECIAL_SITES } = CONFIG;
        const { hostname, pathname } = url;

        // 基礎配置
        const site = PAGE_MAP[hostname] || 'github'; // 通過站點映射獲取基礎類型
        const isLogin = document.body.classList.contains("logged-in");
        const metaLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';

        // 頁面特征檢測
        const isSession = document.body.classList.contains("session-authentication");
        const isHomepage = pathname === '/' && site === 'github';
        const isProfile = document.body.classList.contains("page-profile") || metaLocation === '/<user-name>';
        const isRepository = /\/<user-name>\/<repo-name>/.test(metaLocation);
        const isOrganization = /\/<org-login>/.test(metaLocation) || /^\/(?:orgs|organizations)/.test(pathname);

        let pageType;
        // 根據頁面特征確定頁面類型
        switch (true) { // 使用 switch(true) 模式處理多條件分支
            case isSession: // 登錄/認證頁面
                pageType = 'session-authentication';
                break;
            case SPECIAL_SITES.includes(site): // 特殊站點
                pageType = site;
                break;
            case isProfile: { // 用戶資料頁面
                const tabParam = new URLSearchParams(url.search).get('tab');
                pageType = pathname.includes('/stars') ? 'page-profile/stars'
                         : tabParam ? `page-profile/${tabParam}`
                         : 'page-profile';
                break;
            }
            case isHomepage: // 首頁/儀表盤
                pageType = isLogin ? 'dashboard' : 'homepage';
                break;
            case isRepository: { // 代碼倉庫頁面
                const repoMatch = pathname.match(I18N.conf.rePagePathRepo);
                pageType = repoMatch ? `repository/${repoMatch[1]}` : 'repository';
                break;
            }
            case isOrganization: { // 組織頁面
                const orgMatch = pathname.match(I18N.conf.rePagePathOrg);
                pageType = orgMatch ? `orgs/${orgMatch[1] || orgMatch.slice(-1)[0]}` : 'orgs';
                break;
            }
            default: { // 默認頁面類型
                const pathMatch = pathname.match(I18N.conf.rePagePath);
                pageType = pathMatch ? (pathMatch[1] || pathMatch.slice(-1)[0]) : false;
            }
        }

        // 驗證頁面類型是否有效
        if (pageType === false || !I18N[CONFIG.LANG]?.[pageType]) {
            const reason = pageType === false
                ? '路徑未匹配任何頁面規則'
                : `詞庫中缺少 "${pageType}" 的翻譯`;
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
     * 設置DOM變化觀察器
     * 監聽頁面變化並觸發翻譯
     */
    function setupMutationObserver() {
        // 緩存當前頁面的 URL
        let previousURL = window.location.href;

        if (State.mutationObserver) {
            State.mutationObserver.disconnect();
        }

        State.mutationObserver = new MutationObserver(
            safe((mutations) => {
                const currentURL = window.location.href;
                // 當沒有 onurlchange 支持時，通過 Observer 檢測 URL 變化
                if (!State.urlChangeHandler && currentURL !== previousURL) {
                    previousURL = currentURL;
                    State.currentURL = currentURL;
                    updatePageConfig("URL變化 (MutationObserver)");
                }

                // 處理DOM變化
                if (State.pageConfig) {
                    processMutations(mutations);
                }
            }, 'MutationObserver')
        );

        // 開始觀察頁面主體
        State.mutationObserver.observe(document.body, CONFIG.OBSERVER_CONFIG);
    }

    /**
     * 處理MutationObserver檢測到的變化
     * 收集突變節點、過濾忽略選擇器、對祖先-後代關系去重，僅遍歷頂層節點
     * @param {Array} mutations - 變化記錄數組
     */
    function processMutations(mutations) {
        const nodesToProcess = new Set();

        // 收集需要處理的節點
        mutations.forEach(({ target, addedNodes, type }) => {
            if (type === 'childList' && addedNodes.length > 0) {
                // 處理新增節點
                addedNodes.forEach(node => {
                    const parent = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
                    if (parent && !parent.closest?.(State.pageConfig.ignoreMutationSelectors)) {
                        nodesToProcess.add(node);
                    }
                });
            } else if (type === 'attributes') {
                // 處理屬性變化，target 就是元素
                if (target && !target.closest?.(State.pageConfig.ignoreMutationSelectors)) {
                    nodesToProcess.add(target);
                }
            } else if (type === 'characterData' && State.pageConfig.characterData) {
                // 處理文本變化，2target 是文本節點，取其父元素
                const parent = target.parentElement;
                if (parent && !parent.closest?.(State.pageConfig.ignoreMutationSelectors)) {
                    nodesToProcess.add(target);
                }
            }
        });

        // 過濾掉祖先已在集合中的後代節點，避免重復遍歷
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

        console.log("DOM變化(已過濾)", topNodes);

        // 僅遍歷頂層節點
        topNodes.forEach(node => {
            traverseNode(node);
        });
    }

    /* =========================== DOM 遍歷與節點處理 =========================== */
    /**
     * 遍歷節點樹並進行翻譯
     * @param {Node} rootNode - 要遍歷的根節點
     */
    function traverseNode(rootNode) {
        const start = performance.now();

        // 文本節點直接處理
        if (rootNode.nodeType === Node.TEXT_NODE) {
            handleTextNode(rootNode);
            return;
        }

        // 創建TreeWalker遍歷節點樹
        const treeWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
            node => {
                if (node.nodeType === Node.ELEMENT_NODE
                    && State.pageConfig.ignoreSelectors
                    && node.matches(State.pageConfig.ignoreSelectors)) {
                    return NodeFilter.FILTER_REJECT; // 跳過忽略的選擇器
                }
                return NodeFilter.FILTER_ACCEPT; // 接受其他節點
            }
        );

        let currentNode;
        // 遍歷所有節點
        while ((currentNode = treeWalker.nextNode())) {
            if (currentNode.nodeType === Node.ELEMENT_NODE) {
                handleElementNode(currentNode);
            } else if (currentNode.nodeType === Node.TEXT_NODE) {
                handleTextNode(currentNode);
            }
        }

        // 性能監控
        const duration = performance.now() - start;
        if (duration > 10) {
            console.log(`節點遍歷耗時: ${duration.toFixed(2)}ms`);
        }
    }

    /**
     * 處理文本節點
     * @param {Node} node - 文本節點
     */
    function handleTextNode(node) {
        if (node.length > 500) return; // 跳過長文本節點
        transElementAttrs(node, 'data'); // 翻譯文本內容
    }

    /**
     * 處理元素節點
     * @param {Element} node - 元素節點
     */
    function handleElementNode(node) {
        // 根據標簽類型進行不同的翻譯處理
        const tag = node.tagName;

        if (tag === "RELATIVE-TIME") { // 相對時間元素
            if (node.shadowRoot) {
                transTimeElement(node.shadowRoot);
            }
            return;
        }

        if (tag === "INPUT" || tag === "TEXTAREA") { // 輸入框和文本域
            if (['button', 'submit', 'reset'].includes(node.type)) {
                transElementAttrs(node.dataset, 'confirm'); // 確認對話框文本
                transElementAttrs(node, 'value'); // 值屬性
            } else {
                transElementAttrs(node, 'placeholder'); // 占位符
            }
            return;
        }

        if (tag === "OPTGROUP") { // 選項組
            transElementAttrs(node, 'label'); // 標簽文本
            return;
        }

        if (tag === "BUTTON") { // 按鈕
            transElementAttrs(node, [
                'title',
                'cancelConfirmText'
            ]);
            transElementAttrs(node.dataset, [
                'confirm', // 確認文本
                'confirmText', // 確認按鈕文本
                'confirmCancelText', // 取消按鈕文本
                'disableWith', // 禁用提示
                'visibleText'
            ]);
        }

        if (tag === "A" || tag === "SPAN") {
            transElementAttrs(node, 'title'); // 標題提示
            transElementAttrs(node.dataset, 'visibleText'); // 可見文本
        }

        // 帶有 tooltipped 樣式的元素
        if (/tooltipped/.test(node.className)) {
            transElementAttrs(node, 'ariaLabel');
        }
    }

    /* =========================== 翻譯功能 =========================== */

    /**
     * 翻譯頁面標題
     */
    function transTitle() {
        const text = document.title;
        let result = State.pageConfig.titleStaticDict[text] || '';

        // 嘗試靜態翻譯
        if (!result) {
            // 嘗試正則表達式翻譯
            for (const [pattern, replacement] of State.pageConfig.titleRegexpRules) {
                result = text.replace(pattern, replacement);
                if (result !== text) break;
            }
        }

        // 應用翻譯結果
        if (result) {
            document.title = result;
        }
    }

    /**
     * 翻譯時間元素
     * @param {Element} element - 時間元素
     */
    function transTimeElement(element) {
        // 獲取時間文本
        const text = element.textContent;
        if (!text) return;
        // 移除開頭的"on"
        const result = text.replace(/^on/, "");
        if (result !== text) {
            element.textContent = result; // 應用翻譯
        }
    }

    /**
     * 翻譯元素的單個屬性
     * @param {Object} target - 元素對象或元素數據集
     * @param {string} attrName - 要翻譯的屬性名
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
     * 批量翻譯元素的多個屬性
     * @param {Object} target - 元素對象或元素數據集
     * @param {string|string[]} attrs - 要翻譯的屬性名或屬性名數組
     */
    function transElementAttrs(target, attrs) {
        const attrList = Array.isArray(attrs) ? attrs : [attrs];
        attrList.forEach(attrName => transElementAttr(target, attrName));
    }

    /**
     * 通過選擇器翻譯特定元素
     */
    function transBySelector() {
        State.pageConfig.transSelectors?.forEach(([selector, result]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = result; // 應用翻譯
            }
        });
    }

    /**
     * 翻譯文本內容
     * @param {string} text - 要翻譯的文本
     * @returns {string|boolean} 翻譯後的文本或 false
     */
    function transText(text) {
        // 跳過不需要翻譯的文本：
        // 1. 空文本（包空白字符）或純數字
        // 2. 純中文字符
        // 3. 不包含英文字母和,.符號的文本
        if (/^[\s0-9]*$/.test(text) ||
            /^[\u4e00-\u9fa5]+$/.test(text) ||
            !/[a-zA-Z,.]/.test(text)) {
            return false;
        }

        // 清理文本：去除首尾空格和多余空白
        const trimmedText = text.trim();
        const cleanedText = trimmedText.replace(/\xa0|[\s]+/g, ' ');

        // 獲取翻譯
        const result = fetchTransResult(cleanedText);
        if (result && result !== cleanedText) {
            return text.replace(trimmedText, result);
        }

        return false;
    }

    /**
     * 從詞庫獲取翻譯 — 直接讀取 State.pageConfig
     * @param {string} text - 要翻譯的文本
     * @returns {string|boolean} 翻譯結果或 false
     */
    function fetchTransResult(text) {
        if (!State.pageConfig) return false;

        // 靜態詞典查找
        const staticResult = State.pageConfig.staticDict[text];
        if (typeof staticResult === 'string') {
            MissedTermsManager.cleanup(text, State.pageConfig.currentPath);
            return staticResult;
        }

        // 正則規則查找
        if (State.featureSet.enable_RegExp) {
            for (const [pattern, replacement] of State.pageConfig.regexpRules) {
                const result = text.replace(pattern, replacement);
                if (result !== text) {
                    MissedTermsManager.cleanup(text, State.pageConfig.currentPath);
                    return result;
                }
            }
        }

        // 記錄未命中詞條
        if (State.featureSet.enable_missedTerms) {
            MissedTermsManager.record(text, State.pageConfig.currentPath);
            refreshMenuStates();
        }

        return false;
    }

    /* =========================== 遠程翻譯 =========================== */

    /**
     * 為描述元素添加翻譯按鈕
     * @param {string} selector - 描述元素的選擇器
     */
    function transDesc(selector) {
        const element = document.querySelector(selector);
        if (!element) return;

        // 修復：安全檢查 classList.contains，避免 null sibling 時崩潰
        const nextSibling = element.nextElementSibling;
        if (nextSibling?.classList?.contains('translate-button')) return;

        // 創建翻譯按鈕
        const button = document.createElement('div');
        button.classList.add('translate-button');
        button.textContent = '翻譯';
        element.after(button);

        // 綁定點擊事件
        button.addEventListener('click', () => handleTransClick(button, element));
    }

    /**
     * 處理翻譯按鈕點擊事件
     * @param {Element} button - 翻譯按鈕元素
     * @param {Element} element - 要翻譯的元素
     */
    function handleTransClick(button, element) {
        if (button.disabled) return;
        button.disabled = true; // 防止重復點擊

        const descText = element.textContent.trim();
        if (!descText) {
            button.disabled = false;
            return;
        }

        // 發起遠程翻譯請求
        requestRemoteTrans(descText)
            .then(result => {
                showTransResult(element, button, result);
            })
            .catch(error => {
                console.error('翻譯失敗:', error);
                button.disabled = false; // 啟用按鈕以允許重試
            });
    }

    /**
     * 顯示翻譯結果
     * @param {Element} element - 原始元素
     * @param {Element} button - 翻譯按鈕
     * @param {string} result - 翻譯結果
     */
    function showTransResult(element, button, result) {
        const { name, url } = CONFIG.TRANS_ENGINES[State.transEngine];

        // 創建結果容器 — 結構與不可信文本分離，防止 XSS
        const resultContainer = document.createElement('div');
        resultContainer.className = 'translation-result';
        resultContainer.innerHTML = `
            <span class="translation-credit">
                由 <a target='_blank' href='${url}'>${name}</a> 翻譯👇
            </span>
            <br/>
            <div class="translation-content"></div>
        `;

        // API 響應文本使用 textContent，禁止 HTML 解析
        resultContainer.querySelector('.translation-content').textContent = result;

        // 移除按鈕並顯示結果
        button.remove();
        element.after(resultContainer);
    }

    /**
     * 請求遠程翻譯API
     * @param {string} text - 要翻譯的文本
     * @returns {Promise} 返回翻譯結果的Promise
     */
    function requestRemoteTrans(text) {
        return new Promise((resolve, reject) => {
            const engine = CONFIG.TRANS_ENGINES[State.transEngine];
            const { url_api, method, headers, getRequestData, responseIdentifier } = engine;

            // 準備請求數據
            const requestData = getRequestData(text);

            // 使用GM_xmlhttpRequest發起跨域請求
            GM_xmlhttpRequest({
                method: method,
                url: url_api,
                headers: headers,
                data: method === 'POST' ? JSON.stringify(requestData) : null,
                params: method === 'GET' ? requestData : null, // For GET requests
                timeout: 10000, // 10秒超時
                onload: (res) => {
                    try {
                        const response = JSON.parse(res.responseText);
                        // 從響應中提取翻譯結果
                        const result = getNestedProperty(response, responseIdentifier);
                        if (result) {
                            resolve(result);
                        } else {
                            reject(new Error('翻譯結果無效'));
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
     * 安全獲取嵌套對象屬性
     * 支持路徑格式如 'biz[0]?.sectionResult[0]?.dst'
     *   - '?.' 在路徑中作為可選鏈標記被忽略，實際按強製訪問處理
     * @param {Object} obj - 目標對象
     * @param {string} path - 屬性路徑
     * @returns {*} 屬性值或 undefined
     */
    function getNestedProperty(obj, path) {
        // 移除路徑中的 ?. 標記（訊飛API返回的路徑表示可選，但此處按強製處理）
        const cleanPath = path.replace(/\?\./g, '.');
        return cleanPath.split('.').reduce((acc, part) => {
            if (!acc) return undefined;
            const match = part.match(/^(\w+)(?:\[(\d+)\])?$/);
            if (!match) return undefined;
            const key = match[1];
            const index = match[2];
            // 處理數組索引或對象屬性
            return index !== undefined ? acc[key]?.[index] : acc[key];
        }, obj);
    }

    /* =========================== 未命中詞條管理器 =========================== */
    const MissedTermsManager = {
        /**
         * 未命中詞條數據結構（簡潔模式）
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
         * 記錄未命中詞條
         * @param {string} text - 未翻譯的文本
         * @param {string} path - 當前頁面路徑
         */
        record(text, path) {
            if (!path) return false;
            if (!this.data[path]) {
                this.data[path] = {};
            }

            // 使用對象存儲，保持簡潔
            if (!(text in this.data[path])) {
                this.data[path][text] = "";
                this.save();
                return true; // 新增詞條
            }
            return false; // 詞條已存在
        },

        /**
         * 清理已命中的詞條
         * @param {string} text - 已翻譯的文本
         * @param {string} path - 當前頁面路徑
         */
        cleanup(text, path) {
            if (!path) return false;
            if (this.data[path] && text in this.data[path]) {
                delete this.data[path][text];

                // 如果該路徑下沒有詞條了，刪除路徑條目
                if (Object.keys(this.data[path]).length === 0) {
                    delete this.data[path];
                }
                this.save();
                return true;
            }
            return false;
        },

        /**
         * 獲取所有未命中詞條
         * @returns {Object} 未命中詞條數據
         */
        getAll() {
            return this.data;
        },

        /**
         * 按路徑獲取詞條
         * @param {string} path - 頁面路徑
         * @returns {Object} 該路徑下的詞條對象
         */
        getByPath(path) {
            return this.data[path] || {};
        },

        /**
         * 獲取所有詞條的文本數組（按路徑分組）
         * @returns {Array} 格式為 [{path, terms: []}, ...]
         */
        getAllTermsArray() {
            return Object.entries(this.data).map(([path, terms]) => ({
                path,
                terms: Object.keys(terms)
            }));
        },

        /**
         * 清空所有詞條
         */
        clearAll() {
            this.data = {};
            this.save();
        },

        /**
         * 清空指定路徑的詞條
         * @param {string} path - 頁面路徑
         */
        clearPath(path) {
            if (this.data[path]) {
                delete this.data[path];
                this.save();
            }
        },

        /**
         * 獲取統計信息
         * @returns {Object} 統計信息
         */
        getStats() {
            const paths = Object.keys(this.data);
            const totalTerms = paths.reduce((sum, path) =>
                sum + Object.keys(this.data[path]).length, 0
            );
            return { totalPaths: paths.length, totalTerms: totalTerms };
        },

        /**
         * 導出數據
         * @returns {Object} 導出數據
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
         * 保存數據到存儲
         */
        save() {
            GM_setValue("missedTerms", this.data);
        }
    };

    /* =========================== 用戶菜單 =========================== */

    /**
     * 1. 動態菜單管理
     */
    function refreshMenuStates() {
        // 註銷所有動態菜單
        Object.values(State.dynamicMenus).forEach(id => GM_unregisterMenuCommand(id));
        State.dynamicMenus = {};

        // 僅開發者模式下顯示未命中詞條相關菜單
        if (!CONFIG.DEV) return;

        // 切換菜單
        const toggleLabel = `${State.featureSet.enable_missedTerms ? "禁用" : "啟用"} 未命中詞條記錄`;
        State.dynamicMenus.toggle = GM_registerMenuCommand(toggleLabel, () => {
            const newState = !State.featureSet.enable_missedTerms;
            State.featureSet.enable_missedTerms = newState;
            GM_setValue("enable_missedTerms", newState);

            if (!newState) {
                MissedTermsManager.clearAll();
                GM_notification("未命中詞條記錄已禁用，所有記錄已清空");
            } else {
                GM_notification("未命中詞條記錄已啟用");
            }

            refreshMenuStates();
        });

        // 啟用 + 有詞條時顯示導出和清空菜單
        if (State.featureSet.enable_missedTerms) {
            const stats = MissedTermsManager.getStats();
            const hasData = stats.totalTerms > 0;

            if (hasData) {
                // 導出菜單
                State.dynamicMenus.export = GM_registerMenuCommand(
                    `📥 導出未命中詞條 (${stats.totalTerms}條)`,
                    () => {
                        const exportData = MissedTermsManager.exportData();
                        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                            type: "application/json"
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `GitHub_未命中詞條_${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }
                );

                // 清空菜單
                State.dynamicMenus.clear = GM_registerMenuCommand(
                    "🗑️ 清空未命中詞條",
                    () => {
                        if (confirm(`確定要清空所有未命中詞條嗎？\n共 ${stats.totalPaths} 個頁面，${stats.totalTerms} 個詞條`)) {
                            MissedTermsManager.clearAll();
                            GM_notification("未命中詞條記錄已清空");
                            refreshMenuStates();
                        }
                    }
                );

                // 查看統計菜單
                State.dynamicMenus.stats = GM_registerMenuCommand(
                    "📊 查看統計",
                    () => {
                        const s = MissedTermsManager.getStats();
                        GM_notification({
                            title: "未命中詞條統計",
                            text: `頁面數: ${s.totalPaths}\n詞條數: ${s.totalTerms}`,
                            timeout: 5000
                        });
                    }
                );
            }
        }
    }

    /**
     * 2. 靜態菜單創建
     * @param {Object} config - 菜單配置
     */
    function createMenuCommand(config) {
        const { label, key, callback } = config;
        let menuId;

        // 生成菜單標簽（根據當前狀態）
        const getMenuLabel = () =>
            `${State.featureSet[key] ? "禁用" : "啟用"} ${label}`;

        // 切換功能狀態
        const toggle = () => {
            const newState = !State.featureSet[key];
            // 保存到存儲
            GM_setValue(key, newState);
            State.featureSet[key] = newState;
            // 顯示通知
            GM_notification(`${label}已${newState ? '啟用' : '禁用'}`);

            // 執行回調
            callback?.(newState);

            // 重新註冊菜單（更新標簽）
            GM_unregisterMenuCommand(menuId);
            menuId = GM_registerMenuCommand(getMenuLabel(), toggle);
        };

        // 初始註冊菜單
        menuId = GM_registerMenuCommand(getMenuLabel(), toggle);
    }

    /**
     * 3. 主菜單設置
     */
    function setupMenuCommands() {
        const menuConfigs = [
            {
                label: "正則功能",
                key: "enable_RegExp",
                callback: (enabled) => {
                    if (enabled && State.pageConfig) safe(traverseNode, '菜單觸發遍歷')(document.body);
                }
            },
            {
                label: "描述翻譯",
                key: "enable_transDesc",
                callback: (enabled) => {
                    const pageType = State.pageConfig?.currentPageType;
                    if (enabled && pageType) {
                        // 啟用描述翻譯
                        transDesc(CONFIG.DESC_SELECTORS[pageType]);
                    } else if (!enabled) {
                        // 禁用描述翻譯，移除按鈕
                        document.querySelector('.translate-button')?.remove();
                    }
                }
            }
        ];

        // 為每個配置創建靜態菜單
        menuConfigs.forEach(config => createMenuCommand(config));

        // 初始化動態菜單
        refreshMenuStates();
    }

    /* =========================== 啟動 =========================== */
    init();
})(window, document);
