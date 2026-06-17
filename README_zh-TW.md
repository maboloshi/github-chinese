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

> [!IMPORTANT]
> 💡 **重要：** 本繁體語言版本，使用基於[OpenCC](https://github.com/BYVoid/OpenCC)及[自定義規則](./t2s_rules.conf)轉換

<details>
<summary><kbd>目錄樹</kbd></summary>

#### TOC
- [🌟 功能特性](#-功能特性)
- [🌐 兼容環境](#-兼容環境)
- [💻 安裝指南](#-安裝指南)
- [🔧 本地調試](#-本地調試)
- [🔄 更新日誌](#-更新日誌)
- [📌 待辦事項](#-待辦事項)
- [🤝 參與貢獻](#-參與貢獻)
- [🖼️ 效果預覽](#-效果預覽)
- [🙏 特別鳴謝](#-特別鳴謝)
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

> [!TIP]
> 💡 **溫馨提示：** 您可以將詞庫文件拖拽至瀏覽器地址欄，複製路徑直接使用。

<div align="right">

[![][back-to-top]](#readme-top)

</div>


## 🔄 更新日誌

### 最新版本

#### v1.9.4.3 (2026-06-17)

1. 相容修復`1.9.2.3`,`1.9.4.3`：
   - 收窄 React 搜尋模組忽略範圍，恢復倉庫議題頁和搜尋頁主體區域翻譯。

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

<details><summary><kbd>查看更多歷史版本</kbd></summary>

#### v1.9.2 (2024-06-14)

1. 適配`www.githubstatus.com`
1. 適配`skills.github.com`

#### v1.9.1 (2024-05-23)

1. 更新`切換正則功能按鈕`

#### v1.9.0 (2023-12-09)

1. 重新定義版本號規則, 如`1.9.0-2023-12-09`。
   - `1.9.0`: 主版本號（由項目所有者更新）
   - `2023-12-09`：`詞庫`發佈版本號（由 GitHub Action 自動更新）
1. 加強: [GitHub 源【開發版】][main.user.js]每週一凌晨自動更新`詞庫`發佈版本號
1. 加強: [GreasyFork 源【穩定版】][main(greasyfork).user.js]每週五凌晨自動更新`詞庫`發佈版本號, 詞庫內容同上一次[GitHub 源【開發版】][main.user.js]
1. 加強：在 `README.md` 中自動更新貢獻者頭像
1. 更新: 忽略規則, 詞條等

#### v1.8.5 (2023-08-31)

1. 優化: `transDesc 函數`代碼
1. 修復: 重複添加`translate-me`翻譯按鈕
1. 加強：`watchUpdate 函數`新增節點文本更新的情況
1. 調整: `transBySelector和transDesc函數`延遲執行時間
1. 更新: 忽略規則, 詞條等

#### v1.8.4 (2023-08-08)

1. 修復: `Itemprop`過濾規則, 依然使用正則方式
1. 修復: `tooltipped`樣式提示, 依然使用正則方式

#### v1.8.3 (2023-08-07)

1. 梳理、優化腳本
1. 更新: 忽略規則, 大量詞條等

#### v1.8.2 (2023-05-15)

1. `greasyfork 託管`源切換到`按頁面精細化詞條模式`
1. 調整詞庫格式
1. 功能加強: 優化`元素篩選器`翻譯邏輯
1. 更新: 忽略規則, 大量詞條等

#### v1.8.1 (2023-01-22)

1. 修復: #8 與 dark reader 擴展發生衝突，導致時間顯示出現問題
1. `GitHub`源開始切換到`按頁面精細化詞條模式(開發版)`, 詞庫未完全遷移適配
1. 停止`greasyfork`源詞庫文件的同步更新

#### v1.8.0 (2023-01-18)

1. 刪除: `TURBO-FRAME`框架處理代碼. Github 已調整新動態加載模式, 直接檢測`url`的變化就能獲取對應的`page`信息
1. 新增: 支持時間元素的`Shadow DOM`翻譯, 並監聽變化
1. 新增: 啟用並更新`時間元素翻譯`專項正則詞條
1. 新增: 僅當`page`有效才翻譯頁面
1. 修復: 原`簡介翻譯`引擎`GitHub中文社區`失效, 改為`訊飛`引擎(測試)
1. 修復: 追加公共正則重複迭代的問題
1. 修復: 正則標記變量`RegExp`與構造函數`new RegExp`衝突
1. 更新: 忽略規則, 詞條等

預告, 下次將細化`page`匹配規則, 導致詞庫文件結構大調整, 詞庫文件會適當變大, 頁面正則更精細效率會提升

#### v1.7.9 (2022-07-17)

GitHub 的 ajax 載入方式逐步從 [defunkt/jquery-pjax](https://github.com/defunkt/jquery-pjax) 切換到 [hotwired/turbo](turbo.hotwired.dev), 導致已有的動態監測方式逐步失效

目前, 通過以下修復:

1. 新增 `BODY` 元素新增監視
1. 解析 `TURBO-FRAME` 框架, 獲取對應的 `page`
1. 修復 github 新動態加載模式, 導致`翻譯描述`返回值無法插入
1. 修復 github 新動態加載模式, 導致`chrome`瀏覽器自帶翻譯功能卡死頁面

其他更新:

1. 修復`rePagePath`,`rePagePathRepo`,`rePagePathOrg`匹配規則，限制路徑匹配層次，排除干擾
1. 直接使用網頁URL`document.URL`變化觸發`標題翻譯`和`JS 篩選器`翻譯
1. 修復`關閉正則`無法生效, 需要刷新頁面才生效
1. 日常更新詞庫和忽略規則
1. 更新`JS 篩選器`規則

#### v1.7.8 (2022-06-29)

1. 緊急修復: GitHub 變更了`document.body`和`title`更新機制, 導致原有的`監測更新`規則部分失效, 目前使用`document.documentElement`監視整個頁面 DOM 的變更
1. 跳過`<HEAD>`標籤
1. `標題翻譯`和`JS 篩選器`翻譯, 依據 URL變化更新

#### v1.7.7 (2022-06-26)

1. 新增`時間元素翻譯`功能
1. 重寫`頁面標題翻譯`函數
1. 梳理`遍歷節點`函數邏輯
1. 優化`transPage`函數，默認翻譯公共部分
1. 調整`getPage`函數, 使`ClassName匹配規則`優先
1. 優化`translate`函數, 跳過`不存在英文字母和符號,.`, 保留首尾空白部分等
1. 部分函數重命名，使用`es6`新語法
1. 日常更新詞庫和忽略規則，修復一個`JS 選擇器規則`

#### v1.7.6 (2022-05-12)

1. 日常更新詞庫和忽略規則
1. 添加手動開啟/禁用正則翻譯，添加切換菜單
1. 優化翻譯文本函數：避免已翻譯詞彙二次匹配，提高效率；局部翻譯優先於全局

</details>

<div align="right">

[![][back-to-top]](#readme-top)

</div>


## 📌 待辦事項

1. 添加 GitHub 專用名詞解釋
1. 整理 [Git](https://git-scm.com/) & [GitHub](https://github.com/) 學習資料
1. 完善文檔翻譯，需大家 PR 共同翻譯

## 🤝 參與貢獻

歡迎通過以下方式參與貢獻：

1. 完善詞庫翻譯（編輯 `locals.js`）
1. 提交議題報告，參與話題討論
1. 改進代碼邏輯

[![][pr-welcome-shield]][pr-welcome-link]

### 翻譯參考資源:

1. [Pro Git 第二版 簡體中文](https://git-scm.com/book/zh/v2)
1. [Pro Git: 翻譯約定](https://github.com/progit/progit2-zh/blob/master/TRANSLATION_NOTES.asc)
1. [Git 官方軟件包的簡體中文翻譯](https://github.com/git/git/blob/master/po/zh_CN.po)
1. [GitHub 詞彙表官方譯本](https://docs.github.com/cn/get-started/quickstart/github-glossary)
1. **[CSS 選擇器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors) 用於編寫忽略規則**

> [查看詳細貢獻指南](https://github.com/maboloshi/github-chinese/discussions/57)

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
<a href="https://github.com/maboloshi" title="沙漠之子">
  <img src="https://avatars.githubusercontent.com/u/7850715?v=4" width="42;" alt="沙漠之子"/>
</a>
<a href="https://github.com/52cik" title="樓教主">
  <img src="https://avatars.githubusercontent.com/u/5033310?v=4" width="42;" alt="樓教主"/>
</a>
<a href="https://github.com/TC999" title="陳生雜物房">
  <img src="https://avatars.githubusercontent.com/u/88823709?v=4" width="42;" alt="陳生雜物房"/>
</a>
<a href="https://github.com/qznfbnj" title="其智乃反不能及">
  <img src="https://avatars.githubusercontent.com/u/100760086?v=4" width="42;" alt="其智乃反不能及"/>
</a>
<a href="https://github.com/wyc-26" title="wyc-26">
  <img src="https://avatars.githubusercontent.com/u/154735436?v=4" width="42;" alt="wyc-26"/>
</a>
<a href="https://github.com/pylover7" title="大葉子">
  <img src="https://avatars.githubusercontent.com/u/56282729?v=4" width="42;" alt="大葉子"/>
</a>
<a href="https://github.com/cat-kun" title="cat-kun">
  <img src="https://avatars.githubusercontent.com/u/8529528?v=4" width="42;" alt="cat-kun"/>
</a>
<a href="https://github.com/ChinaGodMan" title="人民的勤務員">
  <img src="https://avatars.githubusercontent.com/u/96548841?v=4" width="42;" alt="人民的勤務員"/>
</a>
<a href="https://github.com/buiawpkgew1" title="菾凴">
  <img src="https://avatars.githubusercontent.com/u/71136405?v=4" width="42;" alt="菾凴"/>
</a>
<a href="https://github.com/yrljroli" title="𠭞">
  <img src="https://avatars.githubusercontent.com/u/169890386?v=4" width="42;" alt="𠭞"/>
</a>
<a href="https://github.com/YiShengJunn" title="益生君">
  <img src="https://avatars.githubusercontent.com/u/134821571?v=4" width="42;" alt="益生君"/>
</a>
<a href="https://github.com/3DMXM" title="小莫">
  <img src="https://avatars.githubusercontent.com/u/28587093?v=4" width="42;" alt="小莫"/>
</a>
<a href="https://github.com/xuexb" title="前端小武">
  <img src="https://avatars.githubusercontent.com/u/3872051?v=4" width="42;" alt="前端小武"/>
</a>
<a href="https://github.com/wang4yu6peng13" title="wang4yu6peng13">
  <img src="https://avatars.githubusercontent.com/u/10207042?v=4" width="42;" alt="wang4yu6peng13"/>
</a>
<a href="https://github.com/pangshitong" title="pangshitong">
  <img src="https://avatars.githubusercontent.com/u/41714457?v=4" width="42;" alt="pangshitong"/>
</a>
<a href="https://github.com/daydaygo" title="dayday">
  <img src="https://avatars.githubusercontent.com/u/3986303?v=4" width="42;" alt="dayday"/>
</a>
<a href="https://github.com/heicks" title="create new ██████╗  ██╔══██╗ ██████╔╝ ██╔══██╗ ██████╔╝ ╚═════╝  　　██╗ 　  ██╗ 　　██║ 　  ██║ 　　██║  　 ██║ 　　██║  　 ██║ 　　╚█████╔╝  　　╚═════╝  ███████╗ ██╔════╝　 ██║████═╗　 ██║　   ██　║ ╚██████╔╝　 　╚══════╝">
  <img src="https://avatars.githubusercontent.com/u/12287943?v=4" width="42;" alt="create new ██████╗  ██╔══██╗ ██████╔╝ ██╔══██╗ ██████╔╝ ╚═════╝  　　██╗ 　  ██╗ 　　██║ 　  ██║ 　　██║  　 ██║ 　　██║  　 ██║ 　　╚█████╔╝  　　╚═════╝  ███████╗ ██╔════╝　 ██║████═╗　 ██║　   ██　║ ╚██████╔╝　 　╚══════╝"/>
</a>
<a href="https://github.com/KS-OTO" title="KS-OTO">
  <img src="https://avatars.githubusercontent.com/u/6616413?v=4" width="42;" alt="KS-OTO"/>
</a>
<a href="https://github.com/swsoyee" title="InfinityLoop">
  <img src="https://avatars.githubusercontent.com/u/20528423?v=4" width="42;" alt="InfinityLoop"/>
</a>
<a href="https://github.com/ImgBotApp" title="Imgbot">
  <img src="https://avatars.githubusercontent.com/u/31427850?v=4" width="42;" alt="Imgbot"/>
</a>
<a href="https://github.com/neveler" title="neveler">
  <img src="https://avatars.githubusercontent.com/u/55753029?v=4" width="42;" alt="neveler"/>
</a>
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
[github-issues-link]: https://github.com/maboloshi/github-chinese/issues "議題"
[github-issues-shield]: https://img.shields.io/github/issues/maboloshi/github-chinese?style=flat-square&logo=github&label=Issue
[github-stars-link]: https://github.com/maboloshi/github-chinese/stargazers "星標"
[github-stars-shield]: https://img.shields.io/github/stars/maboloshi/github-chinese?style=flat-square&logo=github&label=Star
[github-forks-link]: https://github.com/maboloshi/github-chinese/network "復刻"
[github-forks-shield]: https://img.shields.io/github/forks/maboloshi/github-chinese?style=flat-square&logo=github&label=Fork
[github-license-link]: https://opensource.org/licenses/GPL-3.0  "許可證"
[github-license-shield]: https://img.shields.io/github/license/maboloshi/github-chinese?style=flat-square&logo=github&label=License
[greasyFork-link]: https://greasyfork.org/scripts/435208  "GreasyFork 源 - GitHub 中文化插件"
[greasyFork-shield]: https://img.shields.io/badge/dynamic/json?style=flat-square&logo=GreasyFork&label=GreasyFork&query=total_installs&suffix=%20installs&url=https://greasyfork.org/scripts/435208.json
[pr-welcome-link]: https://github.com/maboloshi/github-chinese/pulls
[pr-welcome-shield]: https://img.shields.io/badge/🤯_pr_welcome-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge "歡迎提交 PR"
[Tampermonkey]: http://tampermonkey.net/ "篡改猴"
[Violentmonkey]: https://violentmonkey.github.io/ "暴力猴"
[Macaque]: https://macaque.app/ "獼猴"
[Stay]: https://apps.apple.com/cn/app/stay-for-safari-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BC%B4%E4%BE%A3/id1591620171 "Stay"
[main_zh-TW.user.js]: https://github.com/maboloshi/github-chinese/raw/gh-pages/main_zh-TW.user.js "GitHub 中文化插件（繁體版） - GitHub 託管"
[update-contributors-images]: https://github.com/maboloshi/github-chinese/blob/gh-pages/.github/workflows/update_contributors_images.yml
