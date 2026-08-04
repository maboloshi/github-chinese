# GitHub 中文化 (VS Code 扩展)

[![license GPL-3.0](https://img.shields.io/github/license/maboloshi/github-chinese?style=flat-square&label=License)](https://opensource.org/licenses/GPL-3.0)

一键安装 GitHub 中文化脚本到 VS Code 集成浏览器。

## 前提

### 安装依赖扩展

需要 [Integrated Browser Extensions](https://marketplace.visualstudio.com/items?itemName=boylett.integrated-browser-extensions)。

> [!WARNING]
> 该依赖扩展的 GitHub 源码仓库已被作者删除（404），市场列表仍存在但扩展不再维护。功能在当前版本中正常可用，但未来可能因 VS Code 更新而失效。

> [!NOTE]
> 本扩展尚未上架 [VS Code 市场](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace#_find-and-install-an-extension)，需通过[源码构建](#方案二从源码构建)或下载 VSIX 安装。上架后从市场安装时会自动安装 Integrated Browser Extensions。

### 添加启动参数

VS Code 必须带 `--enable-proposed-api boylett.integrated-browser-extensions` 参数启动。

<details>
<summary>带参数启动 VS Code 的方式</summary>

- 打开[运行对话框](https://learn.microsoft.com/windows/advanced-settings/modern-run)，输入：

  ```cmd
  "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" --enable-proposed-api boylett.integrated-browser-extensions
  ```
  
- 或修改[“开始”菜单](https://www.microsoft.com/zh-cn/windows/tips/start-menu)的 VS Code 快捷方式，在 `目标` 字段末尾追加 [COMMAND_LINE_ARGUMENTS](https://learn.microsoft.com/openspecs/windows_protocols/ms-shllink/17b69472-0f34-4bcf-b290-eccdb8de224b)：

  ```cmd
   --enable-proposed-api boylett.integrated-browser-extensions
  ```
  
  然后从“开始”菜单启动

</details>

## 安装方式

### 方案一：从 GitHub Actions 下载（推荐）

> 该方案需要登录 GitHub 账号，若你没有账号，请使用 [方案二](#方案二从源码构建)

1. 打开本仓库的 [Actions](https://github.com/maboloshi/github-chinese/actions/workflows/build-vscode-extension) 页面

2. 选择最近一次成功运行的 workflow

3. 滚动到页面底部，在 **Artifacts** 区域下载 `github-chinese-extension.vsix`

4. 在 VS Code 中按 `Ctrl+Shift+P` 打开命令面板

5. 输入 `Extensions: Install from VSIX...` 并选择刚才下载的 `.vsix` 文件

6. 安装完成后，在 VS Code 集成浏览器中刷新 GitHub 页面即可生效

### 方案二：从源码构建

#### 环境要求

- [Git](https://git-scm.cn/install) （可选，用于克隆仓库，若不打算安装 Git ，请自行将仓库下载至本地）

- [NodeJS](https://nodejs.org)

#### 构建步骤

在 PowerShell 中执行以下代码：

```shell
git clone https://github.com/maboloshi/github-chinese.git # 克隆仓库

# 若你的网络环境无法访问 GitHub 克隆仓库，请自行寻找加速器等解决

cd github-chinese/vscode-extension # 进入插件目录

npm install # 安装依赖

# 若你的网络环境缓慢，请使用这行命令：

# npm install --registry=https://registry.npmmirror.com

npx @vscode/vsce package # 打包插件
```

构建完成后，按方案一的第 4-5 步安装生成的 `.vsix` 文件。

## 常见问题

### 为什么打开 GitHub 页面没有汉化？

请检查以下几点：

1. **确认已安装依赖扩展**：Integrated Browser Extensions 必须已安装并启用
2. **确认启动参数正确**：VS Code 必须带 `--enable-proposed-api boylett.integrated-browser-extensions` 参数启动
3. **确认扩展已启用**：在扩展面板中确认 `GitHub 中文化` 扩展已启用
4. **刷新页面**：在 VS Code 的集成浏览器中按 `Ctrl+R` 或 `F5` 刷新页面
5. **重启 VS Code**：尝试完全退出并重新启动 VS Code

## 调试

[打开扩展开发宿主窗口](https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension)。
