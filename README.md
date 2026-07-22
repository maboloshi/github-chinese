# GitHub 汉化步骤

## 1. 安装用户脚本管理器

推荐使用 **Tampermonkey（篡改猴）**，以下是 Chrome / Chromium 内核浏览器的安装步骤：

1. 打开 Chrome 浏览器 → **设置** → **扩展程序**
2. 请务必开启 **"开发者模式"**（位于扩展程序管理页面右上角）
3. 下载 [tampermonkey_stable.crx](https://www.tampermonkey.net/crx/tampermonkey_stable.crx)，将插件文件拖到扩展程序页面即可安装
4. 在扩展详情中，开启 **"允许运行用户脚本"**（未开启则脚本无法生效，部分版本默认已开启，有的版本无此选项可忽略）

## 2. 安装汉化脚本

1. 打开脚本地址：[https://github.com/cyb504/github-chinese/blob/gh-pages/main.user.js](https://github.com/cyb504/github-chinese/blob/gh-pages/main.user.js)
2. 点击页面上的**"Raw"** 按钮，会自动跳转到 Tampermonkey 安装界面
3. 点击 **安装**（或 **重新安装**）按钮
4. 刷新 GitHub 页面即可看到GitHub显示中文界面

---

> 💡 **提示**：如果安装后未生效，请检查 Tampermonkey 是否在 GitHub 站点上启用，并确保浏览器已正确加载脚本。
