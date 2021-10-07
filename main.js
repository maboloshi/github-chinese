// ==UserScript==
// @name         GitHub 汉化插件
// @description  汉化 GitHub 界面的部分菜单及内容。原作者为楼教主(http://www.52cik.com/)。
// @copyright    2021, 沙漠之子 (https://maboloshi.github.io/Blog)
// @icon         https://assets-cdn.github.com/pinned-octocat.svg
// @version      1.6.4
// @author       沙漠之子
// @license      MIT
// @homepageURL  https://github.com/maboloshi/github-chinese
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @require      https://maboloshi.github.io/github-chinese/locals.js?v1.6.4
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function (window, document, undefined) {
    'use strict';

    var lang = 'zh'; // 中文

    // 2016-04-18 github 将 jquery 以 amd 加载，不暴露到全局了。
    // var $ = require('github/jquery')['default'];

    // 要翻译的页面
    var page = getPage();

    transTitle(); // 页面标题翻译
    // timeElement(); // 时间节点翻译
    // setTimeout(contributions, 100); // 贡献日历翻译 (日历是内嵌或ajax的, 所以基于回调事件处理)
    walk(document.body); // 立即翻译页面
    watchUpdate();

    /**
     * 监听节点变化, 触发和调用翻译函数
     *
     * 2021-10-07 11:28:30
     * 使用原生API 代替 jQuery 的 `ajaxComplete`函数
     */
    function watchUpdate() {
        const m = window.MutationObserver || window.WebKitMutationObserver;
        const observer = new m(function (mutations, observer) {
            transTitle();
            walk(document.body);
        });
        observer.observe(document.body, {
          subtree: true,
          characterData: true,
          childList: true,
        });
    }

    /**
     * 遍历节点
     *
     * @param {Element} node 节点
     */
    function walk(node) {
        var nodes = node.childNodes;

        for (var i = 0, len = nodes.length; i < len; i++) {
            var el = nodes[i];
            // todo 1. 修复多属性翻译问题; 2. 添加事件翻译, 如论预览信息;

            if (el.nodeType === Node.ELEMENT_NODE) { // 元素节点处理

                // 元素节点属性翻译
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { // 输入框 按钮 文本域
                    if (el.type === 'button' || el.type === 'submit') {
                        transElement(el, 'value');
                    } else {
                        transElement(el, 'placeholder');
                    }
                } else if (el.hasAttribute('aria-label')) { // 带提示的元素，类似 tooltip 效果的
                    transElement(el, 'aria-label', true);

                    if (el.hasAttribute('data-copied-hint')) { // 复制成功提示
                        transElement(el.dataset, 'copiedHint');
                    }
                } else if (el.tagName === 'OPTGROUP') { // 翻译 <optgroup> 的 label 属性
                    transElement(el, 'label');
                }

                if (el.hasAttribute('data-disable-with')) { // 按钮等待提示
                    transElement(el.dataset, 'disableWith');
                }

                // 跳过 readme, 文件列表, 代码显示
                if (!I18N.conf.reIgnoreId.test(el.id) &&
                    !I18N.conf.reIgnoreClass.test(el.className) &&
                    !I18N.conf.reIgnoreItemprop.test(el.getAttribute("itemprop"))) {
                    walk(el); // 遍历子节点
                }
            } else if (el.nodeType === Node.TEXT_NODE) { // 文本节点翻译
                transElement(el, 'data');
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
        const isOrganization = analyticsLocation === '/<org-login>'; // 仅组织首页 其标签页使用 Pathname 过滤(/orgs/)
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
            var t = location.pathname.match(I18N.conf.rePagePathRepo);
            return t ? 'repository/'+t[1] : 'repository';
        }

        // 仅组织首页 其标签页使用 Pathname 过滤(/orgs/)
        if (isOrganization) { // 组织主页 别名
            return 'orgs';
        }

        // 匹配 body 的 class
        var page = document.body.className.match(I18N.conf.rePageClass);

        if (!page) { // 扩展 pathname 匹配
            page = location.pathname.match(I18N.conf.rePagePath);
        }

        return page ? page[1] : false; // 取页面 key
    }

    /**
     * 翻译页面标题
     */
    function transTitle() {
        var title = translate(document.title, 'title');

        if (title === false) { // 无翻译则退出
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
    function transElement(el, field, isAttr) {
        var transText = false; // 翻译后的文本

        if (isAttr === undefined) { // 非属性翻译
            transText = translate(el[field], page);
        } else {
            transText = translate(el.getAttribute(field), page);
        }

        if (transText === false) { // 无翻译则退出
            return false;
        }

        // 替换翻译后的内容
        if (isAttr === undefined) {
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

        if (!isNaN(text)) {
            return false;
        } // 内容为空, 空白字符和或数字 不翻译

        var str;
        var _key = text.trim(); // 去除首尾空格的 key
        var _key_neat = _key
            .replace(/\xa0/g, ' ') // 替换 &nbsp; 空格导致的 bug
            .replace(/\s{2,}/g, ' '); // 去除多余换行空格等字符，(试验测试阶段，有问题再恢复)

        if (page === 'title') {
            return transPage('title', _key_neat);
        } // 翻译网页标题

        str = transPage('pubilc', _key_neat); // 公共翻译

        if (str !== false && str !== _key_neat) { // 公共翻译完成
            str = transPage('pubilc', str) || str;  // 二次公共翻译（为了弥补正则部分翻译的情况）
            return text.replace(_key, str);  // 替换原字符，保留空白部分
        }

        if (page === false) {
            return false;
        } // 未知页面不翻译

        str = transPage(page, _key_neat); // 翻译已知页面
        if (str === false || str === '') {
            return false;
        } // 未知内容不翻译

        str = transPage('pubilc', str) || str; // 二次公共翻译（为了弥补正则部分翻译的情况）
        return text.replace(_key, str); // 替换原字符，保留空白部分
    }


    /**
     * 翻译页面内容
     *
     * @param {string} page 页面
     * @param {string} key 待翻译内容
     *
     * @returns {string|boolean}
     */
    function transPage(page, key) {
        var str; // 翻译结果
        var res; // 正则数组

        // 静态翻译
        str = I18N[lang][page]['static'][key];
        if (str) {
            return str;
        }

        // 正则翻译
        res = I18N[lang][page].regexp;
        if (res) {
            for (var i = 0, len = res.length; i < len; i++) {
                str = key.replace(res[i][0], res[i][1]);
                if (str !== key) {
                    return str;
                }
            }
        }

        return false; // 没有翻译条目
    }


    /**
     * 时间节点翻译
     */
    function timeElement() {
        if (!window.RelativeTimeElement) { // 防止报错
            return;
        }

        var RelativeTimeElement$getFormattedDate = RelativeTimeElement.prototype.getFormattedDate;
        var TimeAgoElement$getFormattedDate = TimeAgoElement.prototype.getFormattedDate;
        // var LocalTimeElement$getFormattedDate = LocalTimeElement.prototype.getFormattedDate;

        var RelativeTime = function (str, el) { // 相对时间解析
            if (/^on ([\w ]+)$/.test(str)) {
                return '于 ' + el.title.replace(/ .+$/, '');
            }

            // 使用字典公共翻译的第二个正则翻译相对时间
            var time_ago = I18N[lang].pubilc.regexp[1];
            return str.replace(time_ago[0], time_ago[1]);
        };

        RelativeTimeElement.prototype.getFormattedDate = function () {
            var str = RelativeTimeElement$getFormattedDate.call(this);
            return RelativeTime(str, this);
        };

        TimeAgoElement.prototype.getFormattedDate = function () {
            var str = TimeAgoElement$getFormattedDate.call(this);
            return RelativeTime(str, this);
        };

        LocalTimeElement.prototype.getFormattedDate = function () {
            return this.title.replace(/ .+$/, '');
        };

        // 遍历 time 元素进行翻译
        // 2016-04-16 github 改版，不再用 time 标签了。
        var times = document.querySelectorAll('time, relative-time, time-ago, local-time');
        Array.prototype.forEach.call(times, function (el) {
            if (el.getFormattedDate) { // 跳过未注册的 time 元素
                el.textContent = el.getFormattedDate();
            }
        });
    }


    /**
     * 贡献日历 基于事件翻译
     */
    function contributions() {
        var tip = document.getElementsByClassName('svg-tip-one-line');

        // 等待 IncludeFragmentElement 元素加载完毕后绑定事件
        // var observe = require('github/observe').observe;

        define('github/hans-contributions', ['./observe'], function (observe) {
            observe(".js-calendar-graph-svg", function () {
                setTimeout(function () { // 延时绑定 mouseover 事件，否则没法翻译
                    var $calendar = $('.js-calendar-graph');
                    walk($calendar[0]); // 翻译日历部分

                    $calendar.on('mouseover', '.day', function () {
                        if (tip.length === 0) { // 没有 tip 元素时退出防止报错
                            return true;
                        }

                        var data = $(this).data(); // 获取节点上的 data
                        var $tip = $(tip[0]);

                        $tip.html(data.count + ' 次贡献 ' + data.date);

                        var rect = this.getBoundingClientRect(); // 获取元素位置
                        var left = rect.left + window.pageXOffset - tip[0].offsetWidth / 2 + 5.5;

                        $tip.css('left', left);
                    });
                }, 999);
            });
        });

        ghImport('github/hans-contributions')['catch'](function(e) {
            setTimeout(function() { throw e });
        });
    }

})(window, document);
