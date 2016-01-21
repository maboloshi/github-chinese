// ==UserScript==
// @name         GitHub 汉化插件
// @namespace    http://github.com/
// @version      0.1
// @description  GitHub 汉化插件
// @author       楼教主
// @match        http://*github.com/*
// @match        https://*github.com/*
// @grant        none
// @require      http://www.52cik.com/github-hans/locals.js
// ==/UserScript==
/* jshint -W097 */

(function () {
	'use strict';

	walk(document.body); // 立即翻译

	$(document).ajaxComplete(function() {
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
				} else {
					walk(el); // 递归遍历
				}
			} else if (el.nodeType === 3) { // 文本节点处理
				el.data = translate(el.data);
			}
		}
	}

	function translate(key) {
		return __GitHub_I18N['zh'][key.trim()] || key;
	}
})();