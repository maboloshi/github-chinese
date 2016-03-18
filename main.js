// ==UserScript==
// @name         GitHub 汉化插件
// @description  汉化 GitHub 界面的部分菜单及内容。
// @copyright    2016, 楼教主 (http://www.52cik.com/)
// @icon         https://assets-cdn.github.com/pinned-octocat.svg
// @version      1.3.4
// @author       楼教主
// @license      MIT
// @homepageURL  https://github.com/52cik/github-hans
// @match        http://*.github.com/*
// @match        https://*.github.com/*
// @require      http://www.52cik.com/github-hans/locals.js?v1.3.4
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function (window, document, undefined) {
    'use strict';

    // 要翻译的页面正则
    var page = document.body.className.match(I18N.conf.rePageClass);

    if (!page) { // 扩展 pathname 匹配
        page = location.pathname.match(I18N.conf.rePagePath);
    }

    if (!page) { // 扩展 url 匹配
        page = location.href.match(I18N.conf.rePageUrl);
    }

    page = page ? page[1] : false; // 取页面 key

    timeElement(); // 时间节点翻译
    contributions(); // 贡献日历翻译 (日历是内嵌或ajax的, 所以基于回调事件处理)
    walk(document.body); // 立即翻译页面

    $(document).ajaxComplete(function (event, xhr, settings) {
        // console.log(settings.url);
        walk(document.body); // ajax 请求后再次翻译页面
    });


    function walk(node) {
        var nodes = node.childNodes;

        var i = 0;
        var len = nodes.length;
        var el = null; // 遍历元素用
        var attr; // 元素属性

        for (; i < len; i++) {
            el = nodes[i];
            // todo 1. 未变动节点不重复赋值; 2. 修复多属性翻译问题; 3. 添加事件翻译, 如论预览信息;

            if (el.nodeType === 1) { // 元素节点属性翻译
                if (el.tagName === "INPUT") { // 输入框 按钮 处理
                    if (el.type === "button" || el.type === "submit") {
                        el.value = translate(el.value);
                    } else {
                        el.placeholder = translate(el.placeholder);
                    }
                } else if (attr = el.getAttribute('aria-label')) { // 带提示的元素，类似 tooltip 效果的
                    el.setAttribute('aria-label', translate(attr));

                    if (attr = el.getAttribute('data-copied-hint')) { // 复制成功提示
                        el.setAttribute('data-copied-hint', translate(attr));
                    }
                }

                // 跳过 readme, 文件列表, 代码显示
                if (el.id !== 'readme' && !I18N.conf.reIgnore.test(el.className)) {
                    walk(el);
                }
            } else if (el.nodeType === 3) { // 文本节点翻译
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


    function timeElement() { // 时间节点翻译
        var RelativeTimeElement$getFormattedDate = RelativeTimeElement.prototype.getFormattedDate;
        var TimeAgoElement$getFormattedDate = TimeAgoElement.prototype.getFormattedDate;
        var LocalTimeElement$getFormattedDate = LocalTimeElement.prototype.getFormattedDate;

        var RelativeTime = function (str, el) { // 相对时间解析
            if (/^on ([\w ]+)$/.test(str)) {
                return '于 ' + el.title.replace(/ .+$/, '');
            }

            return str.replace(/just now|(an?|\d+) (second|minute|hour|day|month|year)s? ago/, function (m, d, t) {
                if (m === 'just now') { return '刚刚'; }

                if (d[0] === 'a') { d = '1'; } // a, an 修改为 1

                var dt = {second: '秒', minute: '分钟', hour: '小时', day: '天', month: '个月', year: '年'};

                return d + ' ' + dt[t] + '之前';
            });
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
        $('time').each(function (i, el) {
            if (el.getFormattedDate) { // 跳过未注册的 time 元素
                el.textContent = el.getFormattedDate();
            }
        });
    }


    function contributions() { // 贡献日历 基于事件翻译
        var tip = document.getElementsByClassName('svg-tip-one-line');

        // 等待 IncludeFragmentElement 元素加载完毕后绑定事件
        $.observe(".js-calendar-graph-svg", function () {
            setTimeout(function mouseover() { // 延时绑定 mouseover 事件，否则没法翻译
                var $calendar = $('.js-calendar-graph');
                walk($calendar[0]); // 翻译日历部分

                $calendar.on('mouseover', '.day', function () {
                    if (tip.length === 0) { // 没有 tip 元素时退出防止报错
                        return true;
                    }

                    var $tip = $(tip[0]);

                    var str = $tip.text().trim().replace(/^(No|\d+) contributions? on (.+)$/, function (m, i, d) {
                        var str = '<strong>';
                        str += i === 'No' ? '无贡献' : (i + ' 次贡献');
                        str += '</strong> ';

                        var dt = new Date(d);
                        dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset()); // 修正时区。
                        str += dt.toISOString().split('T')[0]; // 得到 yyyy-mm-dd 这样的格式

                        return str;
                    });

                    $tip.html(str);
                    $tip.css('left', $(this).offset().left - tip[0].offsetWidth / 2 + 5.5);
                });
            }, 999);
        });
    }

})(window, document);
