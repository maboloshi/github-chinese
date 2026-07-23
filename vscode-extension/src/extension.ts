import * as vscode from 'vscode';

const USERSCRIPT_NAME = 'github-chinese.user.js';

let _ctx: vscode.ExtensionContext;

// ─── 检测集成浏览器扩展 ───────────────────────────────────────

function isIntegratedBrowserInstalled(): boolean {
    return vscode.extensions.getExtension('boylett.integrated-browser-extensions') !== undefined;
}

// ─── 核心操作 ──────────────────────────────────────────────────

async function installScript(): Promise<boolean> {
    if (!isIntegratedBrowserInstalled()) {
        if ((await vscode.window.showErrorMessage('未检测到 Integrated Browser Extensions，请先安装该扩展。', '打开扩展市场')) === '打开扩展市场') {
            vscode.commands.executeCommand('workbench.extensions.search', 'boylett.integrated-browser-extensions');
        }
        return false;
    }

    const userscriptsDir = vscode.Uri.joinPath(_ctx.globalStorageUri, '../boylett.integrated-browser-extensions/userscripts');
    try { await vscode.workspace.fs.stat(userscriptsDir); } catch { await vscode.workspace.fs.createDirectory(userscriptsDir); }

    await vscode.workspace.fs.writeFile(
        vscode.Uri.joinPath(userscriptsDir, USERSCRIPT_NAME),
        await vscode.workspace.fs.readFile(vscode.Uri.joinPath(_ctx.extensionUri, 'main(vscode).user.js'))
    );

    vscode.window.showInformationMessage('✅ GitHub 中文化脚本已安装到集成浏览器！\n请确保 VS Code 以 --enable-proposed-api boylett.integrated-browser-extensions 启动。');
    await refreshStatus();
    return true;
}

async function checkStatus(): Promise<{ installed: boolean; ibVersion: string; scriptPath?: string }> {
    const ext = vscode.extensions.getExtension('boylett.integrated-browser-extensions');
    const ibVersion = ext ? ext.packageJSON.version || '?' : '未安装';

    const p = vscode.Uri.joinPath(_ctx.globalStorageUri, '../boylett.integrated-browser-extensions/userscripts', USERSCRIPT_NAME);
    let installed = false;
    try { await vscode.workspace.fs.stat(p); installed = true; } catch { installed = false; }

    return { installed, ibVersion, scriptPath: p.fsPath };
}

// ─── 状态栏 ────────────────────────────────────────────────────

let statusBarItem: vscode.StatusBarItem;

function updateStatusBar(installed: boolean): void {
    if (!statusBarItem) {
        return;
    }
    if (installed) {
        statusBarItem.text = '$(check) GitHub 中文化';
        statusBarItem.tooltip = 'GitHub 中文化脚本已安装';
        statusBarItem.backgroundColor = undefined;
    } else {
        statusBarItem.text = '$(circle-slash) GitHub 中文化';
        statusBarItem.tooltip = '点击安装 GitHub 中文化脚本';
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
    statusBarItem.show();
}

async function refreshStatus(): Promise<void> {
    updateStatusBar((await checkStatus()).installed);
}

// ─── 激活 ──────────────────────────────────────────────────────

export async function activate(context: vscode.ExtensionContext) {
    _ctx = context;
    console.log('[github-chinese] 扩展已激活');

    // 状态栏
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'github-chinese.status';
    _ctx.subscriptions.push(statusBarItem);

    // 初始状态
    const status = await checkStatus();
    updateStatusBar(status.installed);

    // 注册命令
    _ctx.subscriptions.push(
        vscode.commands.registerCommand('github-chinese.install', () =>
            vscode.window.withProgress(
                { location: vscode.ProgressLocation.Notification, title: '安装 GitHub 中文化脚本…' },
                () => installScript()
            )
        ),
        vscode.commands.registerCommand('github-chinese.uninstall', async () => {
            try {
                await vscode.workspace.fs.stat(vscode.Uri.joinPath(_ctx.globalStorageUri, '../boylett.integrated-browser-extensions/userscripts', USERSCRIPT_NAME));
                await vscode.workspace.fs.delete(vscode.Uri.joinPath(_ctx.globalStorageUri, '../boylett.integrated-browser-extensions/userscripts', USERSCRIPT_NAME));
                vscode.window.showInformationMessage('🗑️ GitHub 中文化脚本已卸载。');
            } catch {
                vscode.window.showInformationMessage('⚠️ 未找到已安装的 GitHub 中文化脚本。');
            }
            await refreshStatus();
        }),
        vscode.commands.registerCommand('github-chinese.status', async () => {
            const s = await checkStatus();
            vscode.window.createWebviewPanel('github-chinese-status', 'GitHub 中文化 — 状态', vscode.ViewColumn.Active, { enableScripts: false }).webview.html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<style>
body { font-family: var(--vscode-font-family); padding: 20px; }
h1 { font-size: 1.3em; }
.ok { color: var(--vscode-testing-iconPassed); }
.fail { color: var(--vscode-testing-iconFailed); }
code { background: var(--vscode-textCodeBlock-background); padding: 1px 4px; border-radius: 3px; }
</style>
</head>
<body>
<h1>📊 GitHub 中文化 — 状态</h1>
<hr>
<p class="${s.ibVersion ? 'ok' : 'fail'}">
  <strong>Integrated Browser Extensions</strong>:
  ${s.ibVersion ? '✅ 已安装 (' + s.ibVersion + ')' : '❌ 未安装'}
</p>
<p class="${s.installed ? 'ok' : 'fail'}">
  <strong>用户脚本</strong>:
  ${s.installed ? '✅ 已安装' : '❌ 未安装'}
</p>
<p><strong>脚本路径</strong>: <code>${s.scriptPath}</code></p>
<blockquote>⚠️ 确保以 <code>--enable-proposed-api boylett.integrated-browser-extensions</code> 启动 VS Code</blockquote>
<hr>
<p><button onclick="window.location.href='command:github-chinese.install'">🔄 重新安装</button>
<button onclick="window.location.href='command:github-chinese.uninstall'">🗑️ 卸载</button></p>
</body>
</html>`;
    }));

    // 启动后自动安装一次（仅当未安装时）
    if (!status.installed) {
        setTimeout(() => {
            if (isIntegratedBrowserInstalled()) {
                installScript();
            }
        }, 5000);
    }
}

export function deactivate() {
    // 清理
}
