# GitHub 中文化 (VS Code 扩展)

一键安装 GitHub 中文化脚本到 VS Code 集成浏览器。

## 前提

### 安装依赖扩展

需要 [Integrated Browser Extensions](https://marketplace.visualstudio.com/items?itemName=boylett.integrated-browser-extensions)。

> [!NOTE]
> [从市场安装](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace#_find-and-install-an-extension)本扩展时会自动安装 Integrated Browser Extensions；[VSIX 安装](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace#_install-from-a-vsix)本扩展需手动安装依赖扩展。

### 添加启动参数

VS Code 必须带 `--enable-proposed-api boylett.integrated-browser-extensions` 参数启动。

<details>
<summary>带参数启动 VS Code 的方式</summary>

- 打开[运行对话框](https://learn.microsoft.com/windows/advanced-settings/modern-run)，录入：
  ```cmd
  "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" --enable-proposed-api boylett.integrated-browser-extensions
  ```
- 或修改[“开始”菜单](https://www.microsoft.com/zh-cn/windows/tips/start-menu)的 VS Code 快捷方式，在 `目标` 字段末尾追加 [COMMAND_LINE_ARGUMENTS](https://learn.microsoft.com/openspecs/windows_protocols/ms-shllink/17b69472-0f34-4bcf-b290-eccdb8de224b)：
  ```cmd
   --enable-proposed-api boylett.integrated-browser-extensions
  ```
  然后从“开始”菜单启动

</details>

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

## 许可

[GPL-3.0](LICENSE)
