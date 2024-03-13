// ==UserScript==
// @name         GitHub 中文化插件
// @namespace    https://github.com/maboloshi/github-chinese
// @description  中文化 GitHub 界面的部分菜单及内容。原作者为楼教主(http://www.52cik.com/)。
// @copyright    2021, 沙漠之子 (https://maboloshi.github.io/Blog)
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.7.6
// @author       沙漠之子
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @require      https://github.com/maboloshi/github-chinese/raw/js2json/locals.js?v1.7.6
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_notification
// @connect      www.githubs.cn
// ==/UserScript==

(function (window, document, undefined) {
    'use strict';

    var enable_RegExp = GM_getValue("RegExp", 1);
    var lang = 'zh'; // 中文

    // 翻译规则重定向
    for (let key in I18N.conf.redirect) {
        I18N[lang][key] = I18N[lang][I18N.conf.redirect[key]];
    }

    // 要翻译的页面
    var page = getPage();

    transTitle(); // 页面标题翻译
    translateBySelector(); // Selector 翻译
    traverseNode(document.body); // 立即翻译页面
    watchUpdate();

    // 翻译描述
    translateDesc(".f4.my-3"); //仓库简介翻译
    translateDesc(".gist-content [itemprop='about']"); // Gist 简介翻译

    /**
     * 监听节点变化, 触发和调用翻译函数
     *
     * 2021-10-07 11:28:30
     * 使用原生API 代替 jQuery 的 `ajaxComplete`函数
     */
    function watchUpdate() {
        const m =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;
        var currentPath = location.pathname;
        new m(function (mutations) {
            /**
             * 仅翻译变更部分 不在全局匹配
             *
             * 且仅监听:
             *    1. 节点增加
             *    2. 节点属性的变化
             *
             * 2021-10-10 15:24:49
             * 遍历节点 函数 walk 需相应打2个补丁 适配
             * */
            if(location.pathname !== currentPath) {
                currentPath = location.pathname;
                page = getPage(); // 仅当,页面地址发生变化时运行
            }
            for(let mutation of mutations) { // for速度比forEach快
                if (mutation.addedNodes || mutation.type === 'attributes') { // 仅当节点增加 或者属性更改
                    traverseNode(mutation.target);
                }
            }
        }).observe(document.body, {
            subtree: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm'], // 仅观察特定属性变化(试验测试阶段，有问题再恢复)
        });

        new m(function(mutations) {
            transTitle();
            translateBySelector(); // Selector 翻译 目前先跟随 url 即页面标题变化
        }).observe(
            document.querySelector('title'),
            { childList: true }
        );
    }

    /**
     * 遍历节点
     *
     * @param {Element} node 节点
     */
    function traverseNode(node) {
        // 跳过忽略
        if (I18N.conf.reIgnoreId.test(node.id) ||
            I18N.conf.reIgnoreClass.test(node.className) ||
            I18N.conf.reIgnoreTag.test(node.tagName) ||
            (node.getAttribute && I18N.conf.reIgnoreItemprop.test(node.getAttribute("itemprop")))
           ) {
            return;
        }

        var nodes = node.childNodes;

        for (var i = 0, len = nodes.length; i <= len; i++) { // 遍历节点
            var el = nodes[i] ? nodes[i] : node; //可能还要优化 该节点不存在子节点
            // todo 1. 修复多属性翻译问题; 2. 添加事件翻译, 如论预览信息;

            if (el.nodeType === Node.ELEMENT_NODE) { // 元素节点处理

                // 元素节点属性翻译
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { // 输入框 按钮 文本域
                    if (el.type === 'button' || el.type === 'submit' || el.type === 'reset') {
                        if (el.hasAttribute('data-confirm')) { // 翻译 浏览器 提示对话框
                            transElement(el, 'data-confirm', true);
                        }
                        transElement(el, 'value');
                    } else {
                        transElement(el, 'placeholder');
                    }
                } else if (el.tagName === 'BUTTON'){
                    if (el.hasAttribute('aria-label') && /tooltipped/.test(el.className)) {
                        transElement(el, 'aria-label', true); // 翻译 浏览器 提示对话框
                    }
                    if (el.hasAttribute('data-confirm')) {
                        transElement(el, 'data-confirm', true); // 翻译 浏览器 提示对话框 ok
                    }
                    if (el.hasAttribute('data-confirm-text')) {
                        transElement(el, 'data-confirm-text', true); // 翻译 浏览器 提示对话框 ok
                    }
                    if (el.hasAttribute('data-confirm-cancel-text')) {
                        transElement(el, 'data-confirm-cancel-text', true); // 取消按钮 提醒
                    }
                    if (el.hasAttribute('cancel-confirm-text')) {
                        transElement(el, 'cancel-confirm-text', true); // 取消按钮 提醒
                    }
                    if (el.hasAttribute('data-disable-with')) { // 按钮等待提示
                        transElement(el.dataset, 'disableWith');
                    }
                } else if (el.tagName === 'OPTGROUP') { // 翻译 <optgroup> 的 label 属性
                    transElement(el, 'label');
                } else if (/tooltipped/.test(el.className)) { // 仅当 元素存在'tooltipped'样式 aria-label 才起效果
                    transElement(el, 'aria-label', true); // 带提示的元素，类似 tooltip 效果的
                }
                if (el != node) {
                    traverseNode(el); // 遍历子节点
                }
            } else if (el.nodeType === Node.TEXT_NODE) { // 文本节点翻译
                if (el.length <= 500){ // 修复 许可证编辑框初始化载入内容被翻译
                    transElement(el, 'data');
                }
            }
        }
    }

    /**
     * 获取翻译页面
     *
     * 2021-10-07 11:48:50
     * 参考 v2.0 中规则
     */
    function getPage() {
        // 站点，如 gist, developer, help 等，默认主站是 github
        const site = location.host.replace(/\.?github\.com$/, '') || 'github'; // 站点
        const pathname = location.pathname; // 当前路径
        const isLogin = /logged-in/.test(document.body.className); // 是否登录

        // 用于确定 个人首页，组织首页，仓库页 然后做判断
        const analyticsLocation = (document.getElementsByName('analytics-location')[0] || 0).content || '';
        //const isProfile = analyticsLocation === '/<user-name>'; // 仅个人首页 其标签页识别不了 优先使用Class 过滤
        // 如 maboloshi?tab=repositories 等
        const isOrganization = /\/<org-login>/.test(analyticsLocation); // 组织页
        const isRepository = /\/<user-name>\/<repo-name>/.test(analyticsLocation); // 仓库页

        if (site === 'gist') { // Gist 站点
            return 'gist';
        }

        if (pathname === '/' && site === 'github') { // github.com 首页
            return isLogin ? 'page-dashboard' : 'homepage';
        } //登录 或 未登录

        // 仅个人首页 其标签页识别不了 优先使用 Class 过滤(/page-profile/)
        // if (isProfile) { // 个人首页
        //     return 'page-profile';
        // }

        if (isRepository) { // 仓库页
            let t = pathname.match(I18N.conf.rePagePathRepo);
            return t ? 'repository/'+t[1] : 'repository';
        }

        if (isOrganization) { // 组织页
            let t = pathname.match(I18N.conf.rePagePathOrg);
            return t ? 'orgs/'+t[1] : 'orgs';
        }

        // 匹配 body 的 class
        var page = document.body.className.match(I18N.conf.rePageClass);

        if (!page) { // 扩展 pathname 匹配
            page = pathname.match(I18N.conf.rePagePath);
        }

        return page ? page[1] : false; // 取页面 key
    }

    /**
     * 翻译页面标题
     */
    function transTitle() {
        var title = translate(document.title, 'title');

        if (!title) { // 无翻译则退出
            return false;
        }

        document.title = title;
    }


    /**
     * 翻译节点对应属性内容
     *
     * @param {object} el 对象
     * @param {string} field 属性字段
     * @param {boolean} isAttr 是否是 attr 属性
     *
     * @returns {boolean}
     */
    function transElement(el, field, isAttr=false) {
        var transText; // 翻译后的文本

        if (!isAttr) { // 非属性翻译
            transText = translate(el[field], page);
        } else {
            transText = translate(el.getAttribute(field), page);
        }

        if (!transText) { // 无翻译则退出
            return false;
        }

        // 替换翻译后的内容
        if (!isAttr) {
            el[field] = transText;
        } else {
            el.setAttribute(field, transText);
        }
    }


    /**
     * 翻译文本
     *
     * @param {string} text 待翻译字符串
     * @param {string} page 页面字段
     *
     * @returns {string|boolean}
     */
    function translate(text, page) { // 翻译

        if (!isNaN(text) || /^[\s]*[\u4e00-\u9fa5]|[\u4e00-\u9fa5][\s]*$/.test(text)) { ///^[\u4e00-\u9fa5]+.*$/.test(text)
            return false;
        } // 内容为空, 空白字符和或数字, 已翻译汉字 不翻译

        var str;
        var _key = text.trim(); // 去除首尾空格的 key
        var _key_neat = _key
            .replace(/\xa0/g, ' ') // 替换 &nbsp; 空格导致的 bug
            .replace(/[\s]+/g, ' ') // 去除多余空白字符(空格 换行符)，(试验测试阶段，有问题再恢复)

        if (page === 'title') {
            return transPage('title', _key_neat);
        } // 翻译网页标题

        if (page) {
            str = transPage(page, _key_neat); // 翻译已知页面 (局部优先)
        } // 未知页面不翻译

        if (str && str !== _key_neat) { // 已知页面翻译完成
            return str;
        }

        str = transPage('pubilc', _key_neat); // 公共翻译

        if (!str) {
            return false;
        } // 未知内容不翻译

        return str;
    }


    /**
     * 翻译页面内容
     *
     * @param {string} page 页面
     * @param {string} key 待翻译内容
     * @param {boolean} isRegexp 是否仅翻译正则部分
     *
     * @returns {string|boolean}
     */
    function transPage(page, key, isRegexp=false) {
        var str; // 翻译结果

        // 静态翻译
        if (!isRegexp) {
            str = I18N[lang][page]['static'][key];
            if (typeof str === 'string') {
                return str;
            }
        }

        // 正则翻译
        if (enable_RegExp){
            var res = I18N[lang][page].regexp; // 正则数组
            if (res) {
                for (var i = 0, len = res.length; i < len; i++) {
                    str = key.replace(res[i][0], res[i][1]);
                    if (str !== key) {
                        return str;
                    }
                }
            }
        }

        return false; // 没有翻译条目
    }

    /**
     * 翻译描述
     *
     * 2021-10-06 16:41:54
     * 来自：k1995/github-i18n-plugin
     * 改写为原生代码
     */
    function translateDesc(el) {
        let element = document.querySelector(el);

        if (!element) {
            return false;
        }

        element.insertAdjacentHTML('afterend', "<a id='translate-me' href='#' style='color:rgb(27, 149, 224);font-size: small'>翻译</a>");
        let translate_me = document.getElementById('translate-me')

        translate_me.onclick = function() {
            // get description text
            const desc = element.textContent.trim();

            if(!desc) {
                return false;
            }

            GM_xmlhttpRequest({
                method: "GET",
                url: `https://www.githubs.cn/translate?q=`+ encodeURIComponent(desc),
                onload: function(res) {
                    if (res.status === 200) {
                        translate_me.style.display="none";
                        // render result
                        const text = res.responseText;
                        element.insertAdjacentHTML('afterend', "<span style='font-size: small'>由 <a target='_blank' style='color:rgb(27, 149, 224);' href='https://www.githubs.cn'>GitHub中文社区</a> 翻译👇</span><br/>"+text);
                    } else {
                        alert("翻译失败");
                    }
                }
            });
        };
    }

    /**
     * js原生选择器 翻译元素
     *
     * 2022-02-04 19:46:44
     * 灵感参考自：k1995/github-i18n-plugin
     */
    function translateBySelector() {
        var res = I18N[lang].selector; // 数组
        if (res) {
            for (var i = 0, len = res.length; i < len; i++) {
                let element = document.querySelector(res[i][0])
                if (element) {
                    element.textContent = res[i][1];
                } else if (document.getElementsByClassName(res[i][0]).length != 0) {
                    document.getElementsByClassName(res[i][0])[0].textContent = res[i][1];
                }
            }
        }
    }

    /**
     * 深度克隆 JS 对象, 并对 正则和函数 字符串化
     *
     * 2022-03-20 20:14:50
     * 改编 deepClone 函数自: https://juejin.cn/post/6889327058158092302
     */
    function deepCloneR(target,cache = new Map()){
      if(cache.get(target)){
          return cache.get(target)
      }
      if(target instanceof Object){
          let dist ;
          if(target instanceof Array){
            // 拷贝数组
            dist = [];
          }else if(target instanceof Function){
            // 函数 --> 字符串
              dist = "("+target.toString()+")"; // 给函数字符串 添加()
          }else if(target instanceof RegExp){
            // 正则表达式 -> 字符串
           dist = target.toString().replace(/^\/|\/$/g, ""); // 正则 转 字符串 并去除行尾 /
          }else{
            // 拷贝普通对象
            dist = {};
          }
          // 将属性和拷贝后的值作为一个map
          cache.set(target, dist);
          for(let key in target){
              // 过滤掉原型身上的属性
            if (target.hasOwnProperty(key)) {
                dist[key] = deepCloneR(target[key], cache);
            }
          }
          return dist;
      }else{
          return target;
      }
    }

    // JS 对象 --> JSON 对象 并输出到 Web 控制台
    GM_registerMenuCommand("输出JSON词库到后台", () => {
        var I18N_new = deepCloneR(I18N);
        I18N_new.dict = I18N_new.zh;
        delete I18N_new.zh;
        console.log("I18N_json",JSON.stringify(I18N_new, null, 4));
    })

    GM_registerMenuCommand("正则切换", () => {
        if (RegExp){
            GM_setValue("RegExp", 0);
            GM_notification("已关闭正则功能");
        } else {
            GM_setValue("RegExp", 1);
            GM_notification("已开启正则功能");
            location.reload();
        }
    })

})(window, document);
