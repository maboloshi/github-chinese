<!-- 由 manage_templates.py 自動生成，請勿手動編輯。來源：vscode-extension-README.yml -->

<div align="center"><a name="vscode-extension-readme-top"></a>

# GitHub 中文化 (VS Code 擴展)

一鍵安裝 GitHub 中文化腳本到 VS Code 集成瀏覽器。

[简体中文](./README.md) · **繁體中文**

<!-- SHIELD GROUP -->

[![license GPL-3.0](https://img.shields.io/github/license/maboloshi/github-chinese?style=flat-square&label=License)](https://opensource.org/licenses/GPL-3.0)

</div>

<details>
<summary><kbd>目錄樹</kbd></summary>

#### TOC
- [前提](#前提)
    - [安裝依賴擴展](#安裝依賴擴展)
    - [添加啟動參數](#添加啟動參數)
- [從本倉庫源碼構建](#從本倉庫源碼構建)
- [調試](#調試)

</details>

## 前提

### 安裝依賴擴展

需要 [Integrated Browser Extensions](https://marketplace.visualstudio.com/items?itemName=boylett.integrated-browser-extensions)。

> [!WARNING]
> 該依賴擴展的 GitHub 源碼倉庫已被作者刪除（404），市場列表仍存在但擴展不再維護。功能在當前版本中正常可用，但未來可能因 VS Code 更新而失效。

> [!NOTE]
> 本擴展尚未上架 [VS Code 市場](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace#_find-and-install-an-extension)，需通過[源碼構建](#從本倉庫源碼構建)或下載 VSIX 安裝。上架後從市場安裝時會自動安裝 Integrated Browser Extensions。

### 添加啟動參數

VS Code 必須帶 `--enable-proposed-api boylett.integrated-browser-extensions` 參數啟動。

<details>
<summary>帶參數啟動 VS Code 的方式</summary>

- 打開[運行對話框](https://learn.microsoft.com/windows/advanced-settings/modern-run)，錄入：
  ```cmd
  "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" --enable-proposed-api boylett.integrated-browser-extensions
  ```
- 或修改[“開始”菜單](https://www.microsoft.com/zh-cn/windows/tips/start-menu)的 VS Code 快捷方式，在 `目標` 字段末尾追加 [COMMAND_LINE_ARGUMENTS](https://learn.microsoft.com/openspecs/windows_protocols/ms-shllink/17b69472-0f34-4bcf-b290-eccdb8de224b)：
  ```cmd
   --enable-proposed-api boylett.integrated-browser-extensions
  ```
  然後從“開始”菜單啟動

</details>

## 從本倉庫源碼構建

1. [克隆倉庫](https://docs.github.com/zh/repositories/creating-and-managing-repositories/cloning-a-repository)
1. [在 VS Code 中打開該文件夾](https://code.visualstudio.com/docs/editor/workspaces#_folder-projects)
1. [打開終端](https://code.visualstudio.com/docs/terminal/getting-started#_run-your-first-command-in-the-terminal)，執行：
   ```powershell
   cd vscode-extension
   npm install
   npx @vscode/vsce package
   ```
1. [從 VSIX 安裝](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace#_install-from-a-vsix)

> [!TIP]
> 推薦從[發行版](https://github.com/maboloshi/github-chinese/releases)直接下載 `.vsix`（如有）。

## 調試

[打開擴展開發宿主窗口](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension)。
