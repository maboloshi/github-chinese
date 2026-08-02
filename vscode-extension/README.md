# GitHub 中文化 (VS Code 扩展)

[![license GPL-3.0](https://img.shields.io/github/license/maboloshi/github-chinese?style=flat-square&label=License)](https://opensource.org/licenses/GPL-3.0)

一键安装 GitHub 扩展，实现 VS Code 集成浏览器中 GitHub 网页的中文化。

## 工作原理

- 扩展启用 VS Code 的 proposed `browser` API（`vscode.window.browserTabs` + `startCDPSession()`）
- 在扩展宿主侧从 [南大镜像](https://mirror.nju.edu.cn/github-chinese/) 拉取词库 `locals.js` 与主脚本 `main.user.js`，规避页面 CORS 限制
- 通过 CDP `Page.addScriptToEvaluateOnNewDocument` 直接注入源码（非 eval），绕过 github.com 的 CSP 限制（IBE 因使用 `new Function` 被 CSP 拦截）
- 注入内容内置 GM_* 兼容层与 document-end 语义（等 `DOMContentLoaded` 后执行）

## 先决条件

### 添加启动参数

VS Code 必须带 `--enable-proposed-api maboloshi.github-chinese` 参数启动，否则无法使用 browser API。

<details>
<summary>带参数启动 VS Code 的方式</summary>

- 打开[运行对话框](https://learn.microsoft.com/windows/advanced-settings/modern-run)，录入：
  ```cmd
  "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" --enable-proposed-api maboloshi.github-chinese
  ```
- 或修改[“开始”菜单](https://www.microsoft.com/zh-cn/windows/tips/start-menu)的 VS Code 快捷方式，在 `目标` 字段末尾追加 [COMMAND_LINE_ARGUMENTS](https://learn.microsoft.com/openspecs/windows_protocols/ms-shllink/17b69472-0f34-4bcf-b290-eccdb8de224b)：
  ```cmd
   --enable-proposed-api maboloshi.github-chinese
  ```
  然后从“开始”菜单启动

</details>

> [!NOTE]
> 本扩展尚未上架 [VS Code 市场](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace#_find-and-install-an-extension)，需通过[源码构建](#从本仓库源码构建)或下载 VSIX 安装。

## 命令

- `GitHub 中文化: 检查注入状态` — 查看 browser API 可用性、注入标签数与词库加载状态
- `GitHub 中文化: 刷新集成浏览器注入` — 重新拉取词库/主脚本并重新注入所有已打开的集成浏览器标签

## 从本仓库源码构建

1. [克隆仓库](https://docs.github.com/zh/repositories/creating-and-managing-repositories/cloning-a-repository)
1. [在 VS Code 中打开该文件夹](https://code.visualstudio.com/docs/editor/workspaces#_folder-projects)
1. [打开终端](https://code.visualstudio.com/docs/terminal/getting-started#_run-your-first-command-in-the-terminal)，执行：
   ```powershell
   cd vscode-extension
   npm install
   npx @vscode/vsce package
   ```
1. [从 VSIX 安装](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace#_install-from-a-vsix)

> [!TIP]
> 推荐从[发行版](https://github.com/maboloshi/github-chinese/releases)直接下载 `.vsix`（如有）。

## 调试

[打开扩展开发宿主窗口](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension)。
