// ==UserScript==
// @name         GitHub 中文化插件 (VS Code)
// @namespace    https://github.com/maboloshi/github-chinese
// @description  专为 VS Code 集成浏览器 + Integrated Browser Extensions 优化。
//                ⚠️ 注意：Integrated Browser Extensions 的 GitHub 源码仓库已被删除（404），
//                市场列表仍存在但不再维护。此脚本供已安装用户参考。
//                📌 关注 https://github.com/maboloshi/github-chinese/issues/747#issuecomment-5046504139 获取最新进展。
// @copyright    2021, 沙漠之子 (https://maboloshi.github.io/Blog)
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.0.0
// @author       沙漠之子
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://skills.github.com/*
// @match        https://gist.github.com/*
// @match        https://education.github.com/*
// @match        https://www.githubstatus.com/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @connect      fanyi.iflyrec.com
// @require      https://mirror.nju.edu.cn/github-chinese/locals.js
// @require      https://mirror.nju.edu.cn/github-chinese/main.user.js
// @supportURL   https://github.com/maboloshi/github-chinese/issues/747#issuecomment-5046504139
// ==/UserScript==

// 此文件为 VS Code Integrated Browser Extensions 的轻量包装脚本。
// 通过 @require 从南大镜像远程加载 locals.js（词库）和 main.user.js（主逻辑）。
// 如果 raw.githubusercontent.com 不可达，可使用南大镜像源 [main(nju.edu).user.js]。

(function () {
    'use strict';
})();
