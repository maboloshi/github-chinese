<!-- 由 manage_templates.py 自動生成，請勿手動編輯。來源：README.yml -->

<div align="center"><a name="readme-top"></a>

# [GitHub 中文化插件][github-project-link]

> 讓 GitHub 界面全面中文化 | 源自 [52cik/github-hans](https://github.com/52cik/github-hans)

[简体中文](./README.md) · **繁體中文** · [反饋問題][github-issues-link]

<!-- SHIELD GROUP -->

[![GitHub issues][github-issues-shield]][github-issues-link]
[![GitHub stars][github-stars-shield]][github-stars-link]
[![GitHub forks][github-forks-shield]][github-forks-link]
[![license GPL-3.0][github-license-shield]][github-license-link]
[![GreasyFork installs][greasyFork-shield]][greasyFork-link]

<a href="https://hellogithub.com/repository/738d0abae49543f18d887a7e29ec9e90" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=738d0abae49543f18d887a7e29ec9e90&claim_uid=zepvSg6Vwl4EqMr&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=738d0abae49543f18d887a7e29ec9e90&claim_uid=zepvSg6Vwl4EqMr&theme=neutral" />
    <img alt="Featured｜HelloGitHub" src="https://api.hellogithub.com/v1/widgets/recommend.svg?rid=738d0abae49543f18d887a7e29ec9e90&claim_uid=zepvSg6Vwl4EqMr&theme=neutral" style="width: 250px; height: 54px;" />
  </picture>
</a>

</div>

> [!warning]
> 本項目從未發佈至 GitCode，如您發現請截圖並保留證據

<details>
<summary><kbd>目錄樹</kbd></summary>

#### TOC
- [🌟 功能特性](#-功能特性)
- [🌐 兼容環境](#-兼容環境)
- [💻 安裝指南](#-安裝指南)
    - [瀏覽器（Tampermonkey）](#瀏覽器tampermonkey)
    - [VS Code 整合式瀏覽器（Integrated Browser Extensions）](#vs-code-整合式瀏覽器integrated-browser-extensions)
- [🔧 本地調試](#-本地調試)
- [🔄 更新日誌](#-更新日誌)
    - [最新版本](#最新版本)
- [📌 待辦事項](#-待辦事項)
- [🤝 參與貢獻](#-參與貢獻)
- [🖼️ 效果預覽](#-效果預覽)
- [🙏 特別鳴謝](#-特別鳴謝)
    - [核心團隊](#核心團隊)
    - [貢獻者牆](#貢獻者牆)
- [📈 項目統計](#-項目統計)
- [🎁 歡迎打賞](#-歡迎打賞)

</details>

## 🌟 功能特性

- [x] 全面中文化 GitHub 界面元素（菜單欄、標題、按鈕等）
- [x] 智能正則匹配功能
- [x] 支持項目描述的人機翻譯
- [x] 自動本地化時間元素
- [x] 持續更新詞庫

## 🌐 兼容環境

瀏覽器類型           | 支持的腳本管理器
:------------------: | :---------------:
Chrome / Chromium 內核 | [Tampermonkey][Tampermonkey], [Violentmonkey][Violentmonkey]
Safari（全平臺）     | [Macaque][Macaque], [Stay][Stay]
Firefox / Gecko 內核   | [Tampermonkey][Tampermonkey], [Violentmonkey][Violentmonkey]
Via（Android）       | 內置管理器

## 💻 安裝指南

### 瀏覽器（Tampermonkey）

1. 安裝用戶腳本管理器：
    - 推薦：[Tampermonkey][Tampermonkey]
1. **基於 Chrome / Chromium 內核瀏覽器：**
    1. 務必開啟 「擴展程序」 管理中的 **「開發者模式」**[^1]
    1. 務必開啟 「擴展程序」 管理中腳本管理器擴展的 **「允許運行用戶腳本」**
    1. 具體可參考 [Tampermonkey 官方指引](https://www.tampermonkey.net/faq.php#Q209)
1. 選擇安裝源：
    - [GitHub 源【開發版】][main_zh-TW.user.js]
1. 刷新頁面後，插件即可生效
1. 必要時，重啟瀏覽器

[^1]: [Chrome 切換到 Manifest V3後，使用問題](https://github.com/maboloshi/github-chinese/issues/234)

> [!NOTE]
> **版本說明**：
> - 🚀 開發版：實時更新，每週五自動更新詞庫
> - 🛡️ 穩定版：每週一同步開發版詞庫，更穩定

### VS Code 整合式瀏覽器（Integrated Browser Extensions）

請參考[擴展的自述文件](vscode-extension/README.md)。

## 🔧 本地調試

1. 安裝 [Tampermonkey][Tampermonkey]，並啟用 “允許訪問文件網址”。
1. 下載詞庫文件到本地（如：`D:\github-chinese\locals.js`）
1. 在腳本管理器中修改引用路徑：
   ```js
   // 原始路徑
   // @require https://raw.githubusercontent.com/...

   // 修改為
   // @require file:///D:/github-chinese/locals.js
   ```
1. 刷新頁面生效

> [!IMPORTANT]
> **若無效：**
> 1. 進入 [Tampermonkey][Tampermonkey] 插件`設置頁`
> 1. 將 `通用 - 配置模式` 設置為`高級`，進入高級設置模式
> 1. 找到 `安全 - 允許腳本訪問本地文件` 並設置為 `外部(@require 和 @resource)`

> [!TIP]
> 💡 **溫馨提示：** 您可以將詞庫文件拖拽至瀏覽器地址欄，複製路徑直接使用。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🔄 更新日誌

### 最新版本

#### v1.9.4.4 (2026-06-20)

1. 相容修復`1.9.2.4`,`1.9.4.4`：
   - 區分 React GlobalNav 與頁面主體共用的 Primer 彈層，恢復下拉選單即時、完整翻譯。

#### v1.9.4.3 (2026-06-17)

1. 相容修復`1.9.2.3`,`1.9.4.3`：
   - 收窄 React 搜尋模組忽略範圍，恢復倉庫議題頁和搜尋頁主體區域翻譯。

#### v1.9.4.2 (2026-06-17)

1. 相容修復`1.9.2.2`,`1.9.4.2`：
   - 在保持 React 頭部搜索框穩定的前提下，恢復頭部導航、菜單、搜索彈層和提示翻譯。

#### v1.9.4.1 (2026-06-16)

1. 臨時修復`1.9.2`,`1.9.4`：
   - 關於 GitHub 引入 React 機制導致頭部搜索框消失。副作用整個頭部導航全部加入忽略規則，無法翻譯。

#### v1.9.4 (2026-05-17)

1. 代碼重構：
   - 全面結構化重組：抽離配置常量 `CONFIG`、狀態管理器 `State`
   - 引入 `safe()` 錯誤邊界包裹關鍵函數，便於排錯
   - 函數拆分細化：`watchUpdate` → `setupMutationObserver` + `processMutations`，`transDesc` → `handleTransClick` + `requestRemoteTrans` + `showTransResult`
   - `processMutations` 祖先去重：同一批 mutation 中後代節點不再重複遍歷
1. 新增功能：
   - 翻譯結果 UI 暗色主題適配（CSS 變量 + `prefers-color-scheme` 媒體查詢），使用 `GM_addStyle` 插入
   - 未命中詞條管理器 `MissedTermsManager`（記錄、導出 JSON、清空、統計、菜單）
   - 開發者模式（`CONFIG.DEV`）控制未命中詞條菜單顯隱
   - Tampermonkey `onurlchange` 事件支持（`setupUrlChangeListener`）
1. 修復：
   - 修復翻譯 API 響應 XSS 漏洞：`innerHTML` 模板拼接改為 `textContent` 安全賦值（由 #692 報告）
   - 修復 TreeWalker 過濾器在 `ignoreSelectors` 為空時拋出 `SyntaxError`
   - 修復翻譯按鈕可能重複添加的問題（`nextSibling` 空值檢查）
   - 修復 `RELATIVE-TIME` shadowRoot 為 null 時的崩潰
   - 修復從未識別頁面離開後 `State.pageConfig` 未清空，導致舊配置殘留的問題
1. 性能優化：減少無效迭代，消除不必要的 DOM 遍歷

#### v1.9.3 (2024-08-18)

1. 新增功能：通過設置中文環境，自動本地化時間元素，僅保留`on`開頭的時間正則，並停用時間元素監視
1. 優化突變翻譯處理：
   - 引入`characterDataPage`規則，對特定頁面啟用`篩選字符數據`的變更
   - 引入`ignoreMutationSelectorPage`規則，忽略特定突變元素
1. 合併`reIgnoreClass，reIgnoreItemprop，ignoreId，ignoreTag`為`ignoreSelectorPage`規則，處理全局及特定頁面，忽略特定元素
1. 引入全局緩存模式，減少重複構建包括不限於基於`page`變化的忽略規則、正則規則數組等
1. 調整：更新訊飛聽見翻譯引擎v2.0
1. 優化：梳理、優化腳本
1. 調整：調整詞庫語言代碼為`zh-CN`, 與環境語言設置一致

<details><summary><kbd>查看更多历史版本</kbd></summary>

#### v1.9.2 (2024-06-14)

1. 适配`www.githubstatus.com`
1. 适配`skills.github.com`

#### v1.9.1 (2024-05-23)

1. 更新`切换正则功能按钮`

#### v1.9.0 (2023-12-09)

1. 重新定义版本号规则, 如`1.9.0-2023-12-09`。
   - `1.9.0`: 主版本号（由项目所有者更新）
   - `2023-12-09`：`词库`发布版本号（由 GitHub Action 自动更新）
1. 加强: [GitHub 源【开发版】][main.user.js]每周一凌晨自动更新`词库`发布版本号
1. 加强: [GreasyFork 源【稳定版】][main(greasyfork).user.js]每周五凌晨自动更新`词库`发布版本号, 词库内容同上一次[GitHub 源【开发版】][main.user.js]
1. 加强：在 `README.md` 中自动更新贡献者头像
1. 更新: 忽略规则, 词条等

#### v1.8.5 (2023-08-31)

1. 优化: `transDesc 函数`代码
1. 修复: 重复添加`translate-me`翻译按钮
1. 加强：`watchUpdate 函数`新增节点文本更新的情况
1. 调整: `transBySelector和transDesc函数`延迟执行时间
1. 更新: 忽略规则, 词条等

#### v1.8.4 (2023-08-08)

1. 修复: `Itemprop`过滤规则, 依然使用正则方式
1. 修复: `tooltipped`样式提示, 依然使用正则方式

#### v1.8.3 (2023-08-07)

1. 梳理、优化脚本
1. 更新: 忽略规则, 大量词条等

#### v1.8.2 (2023-05-15)

1. `greasyfork 托管`源切换到`按页面精细化词条模式`
1. 调整词库格式
1. 功能加强: 优化`元素筛选器`翻译逻辑
1. 更新: 忽略规则, 大量词条等

#### v1.8.1 (2023-01-22)

1. 修复: #8 与 dark reader 扩展发生冲突，导致时间显示出现问题
1. `GitHub`源开始切换到`按页面精细化词条模式(开发版)`, 词库未完全迁移适配
1. 停止`greasyfork`源词库文件的同步更新

#### v1.8.0 (2023-01-18)

1. 删除: `TURBO-FRAME`框架处理代码. Github 已调整新动态加载模式, 直接检测`url`的变化就能获取对应的`page`信息
1. 新增: 支持时间元素的`Shadow DOM`翻译, 并监听变化
1. 新增: 启用并更新`时间元素翻译`专项正则词条
1. 新增: 仅当`page`有效才翻译页面
1. 修复: 原`简介翻译`引擎`GitHub中文社区`失效, 改为`讯飞`引擎(测试)
1. 修复: 追加公共正则重复迭代的问题
1. 修复: 正则标记变量`RegExp`与构造函数`new RegExp`冲突
1. 更新: 忽略规则, 词条等

预告, 下次将细化`page`匹配规则, 导致词库文件结构大调整, 词库文件会适当变大, 页面正则更精细效率会提升

#### v1.7.9 (2022-07-17)

GitHub 的 ajax 载入方式逐步从 [defunkt/jquery-pjax](https://github.com/defunkt/jquery-pjax) 切换到 [hotwired/turbo](turbo.hotwired.dev), 导致已有的动态监测方式逐步失效

目前, 通过以下修复:

1. 新增 `BODY` 元素新增监视
1. 解析 `TURBO-FRAME` 框架, 获取对应的 `page`
1. 修复 github 新动态加载模式, 导致`翻译描述`返回值无法插入
1. 修复 github 新动态加载模式, 导致`chrome`浏览器自带翻译功能卡死页面

其他更新:

1. 修复`rePagePath`,`rePagePathRepo`,`rePagePathOrg`匹配规则，限制路径匹配层次，排除干扰
1. 直接使用网页URL`document.URL`变化触发`标题翻译`和`JS 筛选器`翻译
1. 修复`关闭正则`无法生效, 需要刷新页面才生效
1. 日常更新词库和忽略规则
1. 更新`JS 筛选器`规则

#### v1.7.8 (2022-06-29)

1. 紧急修复: GitHub 变更了`document.body`和`title`更新机制, 导致原有的`监测更新`规则部分失效, 目前使用`document.documentElement`监视整个页面 DOM 的变更
1. 跳过`<HEAD>`标签
1. `标题翻译`和`JS 筛选器`翻译, 依据 URL变化更新

#### v1.7.7 (2022-06-26)

1. 新增`时间元素翻译`功能
1. 重写`页面标题翻译`函数
1. 梳理`遍历节点`函数逻辑
1. 优化`transPage`函数，默认翻译公共部分
1. 调整`getPage`函数, 使`ClassName匹配规则`优先
1. 优化`translate`函数, 跳过`不存在英文字母和符号,.`, 保留首尾空白部分等
1. 部分函数重命名，使用`es6`新语法
1. 日常更新词库和忽略规则，修复一个`JS 选择器规则`

#### v1.7.6 (2022-05-12)

1. 日常更新词库和忽略规则
1. 添加手动开启/禁用正则翻译，添加切换菜单
1. 优化翻译文本函数：避免已翻译词汇二次匹配，提高效率；局部翻译优先于全局

</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📌 待辦事項

1. 添加 GitHub 專用名詞解釋
1. 整理 [Git](https://git-scm.com/) & [GitHub](https://github.com/) 學習資料
1. 完善文檔翻譯，需大家 PR 共同翻譯

## 🤝 參與貢獻

請參閱 [貢獻指南](CONTRIBUTING_zh-TW.md)。

## 🖼️ 效果預覽

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/img1.png"/>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/img3.png"/>
  <img src="https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/img1.png" width="75%" />
</picture>
<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/img2.png"/>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/img4.png"/>
  <img src="https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/preview/img2.png" width="75%" />
</picture>

## 🙏 特別鳴謝

### 核心團隊

- [maboloshi](https://github.com/maboloshi) - 項目作者
- [wyc-26](https://github.com/wyc-26)，[陳生雜物房](https://github.com/TC999) - 項目協作者
- [52cik](https://github.com/52cik) - 項目原作者

### 貢獻者牆

一如既往，感謝我們出色的貢獻者❤️！

<!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT-->
<a href="https://github.com/maboloshi" title="沙漠之子"><img src="https://avatars.githubusercontent.com/u/7850715?v=4" width="42;" alt="沙漠之子"/></a>
<a href="https://github.com/52cik" title="楼教主"><img src="https://avatars.githubusercontent.com/u/5033310?v=4" width="42;" alt="楼教主"/></a>
<a href="https://github.com/TC999" title="陈生杂物房"><img src="https://avatars.githubusercontent.com/u/88823709?v=4" width="42;" alt="陈生杂物房"/></a>
<a href="https://github.com/wyc-26" title="wyc-26"><img src="https://avatars.githubusercontent.com/u/154735436?v=4" width="42;" alt="wyc-26"/></a>
<a href="https://github.com/qznfbnj" title="其智乃反不能及"><img src="https://avatars.githubusercontent.com/u/100760086?v=4" width="42;" alt="其智乃反不能及"/></a>
<a href="https://github.com/LuYifei2011" title="Lu Yifei"><img src="https://avatars.githubusercontent.com/u/118034848?v=4" width="42;" alt="Lu Yifei"/></a>
<a href="https://github.com/tangyuan0821" title="Paper Moon"><img src="https://avatars.githubusercontent.com/u/195516213?v=4" width="42;" alt="Paper Moon"/></a>
<a href="https://github.com/cat-kun" title="cat-kun"><img src="https://avatars.githubusercontent.com/u/8529528?v=4" width="42;" alt="cat-kun"/></a>
<a href="https://github.com/pylover7" title="大叶子"><img src="https://avatars.githubusercontent.com/u/56282729?v=4" width="42;" alt="大叶子"/></a>
<a href="https://github.com/MasterBao66" title="Mr.Baoboer"><img src="https://avatars.githubusercontent.com/u/272576744?v=4" width="42;" alt="Mr.Baoboer"/></a>
<a href="https://github.com/Kisechan" title="Kise Platinyl"><img src="https://avatars.githubusercontent.com/u/162338950?v=4" width="42;" alt="Kise Platinyl"/></a>
<a href="https://github.com/pecasha" title="Pecasha"><img src="https://avatars.githubusercontent.com/u/9607128?v=4" width="42;" alt="Pecasha"/></a>
<a href="https://github.com/pooneyy" title="poney"><img src="https://avatars.githubusercontent.com/u/85266337?v=4" width="42;" alt="poney"/></a>
<a href="https://github.com/ChinaGodMan" title="人民的勤务员"><img src="https://avatars.githubusercontent.com/u/96548841?v=4" width="42;" alt="人民的勤务员"/></a>
<a href="https://github.com/sebastiondev" title="Sebastion"><img src="https://avatars.githubusercontent.com/u/262984339?v=4" width="42;" alt="Sebastion"/></a>
<a href="https://github.com/PtJade-Ceramic" title="PtJade Ceramic"><img src="https://avatars.githubusercontent.com/u/185668489?v=4" width="42;" alt="PtJade Ceramic"/></a>
<a href="https://github.com/Iamliuxiaozhen" title="Oliver Lin"><img src="https://avatars.githubusercontent.com/u/149680880?v=4" width="42;" alt="Oliver Lin"/></a>
<a href="https://github.com/wang93wei" title="AlanWang"><img src="https://avatars.githubusercontent.com/u/6371053?v=4" width="42;" alt="AlanWang"/></a>
<a href="https://github.com/yrljroli" title="苓𥤚"><img src="https://avatars.githubusercontent.com/u/169890386?v=4" width="42;" alt="苓𥤚"/></a>
<a href="https://github.com/YiShengJunn" title="益生君"><img src="https://avatars.githubusercontent.com/u/134821571?v=4" width="42;" alt="益生君"/></a>
<a href="https://github.com/3DMXM" title="小莫"><img src="https://avatars.githubusercontent.com/u/28587093?v=4" width="42;" alt="小莫"/></a>
<a href="https://github.com/xuezhaju" title="学渣驹"><img src="https://avatars.githubusercontent.com/u/175468713?v=4" width="42;" alt="学渣驹"/></a>
<a href="https://github.com/th-dd" title="叹号大帝"><img src="https://avatars.githubusercontent.com/u/162813557?v=4" width="42;" alt="叹号大帝"/></a>
<a href="https://github.com/xuexb" title="前端小武"><img src="https://avatars.githubusercontent.com/u/3872051?v=4" width="42;" alt="前端小武"/></a>
<a href="https://github.com/wang4yu6peng13" title="wang4yu6peng13"><img src="https://avatars.githubusercontent.com/u/10207042?v=4" width="42;" alt="wang4yu6peng13"/></a>
<a href="https://github.com/pangshitong" title="pangshitong"><img src="https://avatars.githubusercontent.com/u/41714457?v=4" width="42;" alt="pangshitong"/></a>
<a href="https://github.com/daydaygo" title="dayday"><img src="https://avatars.githubusercontent.com/u/3986303?v=4" width="42;" alt="dayday"/></a>
<a href="https://github.com/heicks" title="create new ██████╗  ██╔══██╗ ██████╔╝ ██╔══██╗ ██████╔╝ ╚═════╝  　　██╗ 　  ██╗ 　　██║ 　  ██║ 　　██║  　 ██║ 　　██║  　 ██║ 　　╚█████╔╝  　　╚═════╝  ███████╗ ██╔════╝　 ██║████═╗　 ██║　   ██　║ ╚██████╔╝　 　╚══════╝"><img src="https://avatars.githubusercontent.com/u/12287943?v=4" width="42;" alt="create new ██████╗  ██╔══██╗ ██████╔╝ ██╔══██╗ ██████╔╝ ╚═════╝  　　██╗ 　  ██╗ 　　██║ 　  ██║ 　　██║  　 ██║ 　　██║  　 ██║ 　　╚█████╔╝  　　╚═════╝  ███████╗ ██╔════╝　 ██║████═╗　 ██║　   ██　║ ╚██████╔╝　 　╚══════╝"/></a>
<a href="https://github.com/shuwn" title="Shuwn Hsu"><img src="https://avatars.githubusercontent.com/u/20023822?v=4" width="42;" alt="Shuwn Hsu"/></a>
<a href="https://github.com/NyA1K0" title="NyA!K0"><img src="https://avatars.githubusercontent.com/u/177237971?v=4" width="42;" alt="NyA!K0"/></a>
<a href="https://github.com/MaydayV" title="MaydayV"><img src="https://avatars.githubusercontent.com/u/61279703?v=4" width="42;" alt="MaydayV"/></a>
<a href="https://github.com/KS-OTO" title="KS-OTO"><img src="https://avatars.githubusercontent.com/u/6616413?v=4" width="42;" alt="KS-OTO"/></a>
<a href="https://github.com/swsoyee" title="InfinityLoop"><img src="https://avatars.githubusercontent.com/u/20528423?v=4" width="42;" alt="InfinityLoop"/></a>
<a href="https://github.com/ImgBotApp" title="Imgbot"><img src="https://avatars.githubusercontent.com/u/31427850?v=4" width="42;" alt="Imgbot"/></a>
<a href="https://github.com/HeavenlessLing" title="Heavenless"><img src="https://avatars.githubusercontent.com/u/238226870?v=4" width="42;" alt="Heavenless"/></a>
<a href="https://github.com/BluewhaleYF" title="Flint Scophire"><img src="https://avatars.githubusercontent.com/u/206069864?v=4" width="42;" alt="Flint Scophire"/></a>
<a href="https://github.com/neveler" title="neveler"><img src="https://avatars.githubusercontent.com/u/55753029?v=4" width="42;" alt="neveler"/></a>
<!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT-END-->

> 貢獻者列表，由 [GitHub Action][update-contributors-images] 自動生成

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 📈 項目統計

<a href="https://star-history.com/#maboloshi/github-chinese&Timeline">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=maboloshi/github-chinese&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=maboloshi/github-chinese&type=Timeline" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=maboloshi/github-chinese&type=Timeline" width="75%" />
  </picture>
</a>

![Alt](https://repobeats.axiom.co/api/embed/ae4c378f0e6ec317654ec5c4e8b01218c734cd53.svg "Repobeats analytics image")

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 🎁 歡迎打賞

[讚賞列表](https://github.com/maboloshi/maboloshi/issues/1)
|                                        微信讚賞                                        |                                       支付寶讚賞                                       |
| :--------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------: |
| <img src="https://cdn.jsdelivr.net/gh/maboloshi/maboloshi/img/wechat.png?raw=true" alt="WeChat QRcode" width=200> <br><small>☕喝點咖啡繼續幹☕</small> | <img src="https://cdn.jsdelivr.net/gh/maboloshi/maboloshi/img/alipay-1.jpg?raw=true" alt="AliPay QRcode" width=200> <br><small>🌶️來包辣條吧~🍪</small> |

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[github-project-link]: https://github.com/maboloshi/github-chinese "GitHub 中文化插件"
[github-issues-link]: https://github.com/maboloshi/github-chinese/issues "议题"
[github-issues-shield]: https://img.shields.io/github/issues/maboloshi/github-chinese?style=flat-square&logo=github&label=Issue
[github-stars-link]: https://github.com/maboloshi/github-chinese/stargazers "星标"
[github-stars-shield]: https://img.shields.io/github/stars/maboloshi/github-chinese?style=flat-square&logo=github&label=Star
[github-forks-link]: https://github.com/maboloshi/github-chinese/network "复刻"
[github-forks-shield]: https://img.shields.io/github/forks/maboloshi/github-chinese?style=flat-square&logo=github&label=Fork
[github-license-link]: https://opensource.org/licenses/GPL-3.0  "许可证"
[github-license-shield]: https://img.shields.io/github/license/maboloshi/github-chinese?style=flat-square&logo=github&label=License
[greasyFork-link]: https://greasyfork.org/scripts/435208  "GreasyFork 源 - GitHub 中文化插件"
[greasyFork-shield]: https://img.shields.io/greasyfork/dt/435208?style=flat-square&logo=GreasyFork&label=GreasyFork%20Installs
[Tampermonkey]: http://tampermonkey.net/ "篡改猴"
[Violentmonkey]: https://violentmonkey.github.io/ "暴力猴"
[Macaque]: https://macaque.app/ "猕猴"
[Stay]: https://apps.apple.com/cn/app/stay-for-safari-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BC%B4%E4%BE%A3/id1591620171 "Stay"
[main.user.js]: https://github.com/maboloshi/github-chinese/raw/gh-pages/main.user.js "GitHub 中文化插件 - GitHub 源"
[main(nju.edu).user.js]:https://mirror.nju.edu.cn/github-chinese/main(nju.edu).user.js "GitHub 中文化插件 - 南大镜像源"
[main(greasyfork).user.js]: https://greasyfork.org/scripts/435208-github-%E4%B8%AD%E6%96%87%E5%8C%96%E6%8F%92%E4%BB%B6/code/GitHub%20%E4%B8%AD%E6%96%87%E5%8C%96%E6%8F%92%E4%BB%B6.user.js "GitHub 中文化插件 - GreasyFork 源"
[update-contributors-images]: https://github.com/maboloshi/github-chinese/blob/gh-pages/.github/workflows/update_contributors_images.yml
[Integrated Browser Extensions]: https://marketplace.visualstudio.com/items?itemName=boylett.integrated-browser-extensions "Integrated Browser Extensions"
