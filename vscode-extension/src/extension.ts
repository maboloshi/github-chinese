import * as vscode from 'vscode';

// 镜像源：词库 + 主脚本（在扩展宿主侧拉取，无 CORS 限制）
const LOCALS_URL = 'https://mirror.nju.edu.cn/github-chinese/locals.js';
const MAIN_URL = 'https://mirror.nju.edu.cn/github-chinese/main.user.js';

/**
 * VS Code proposed `browser` API 的 BrowserCDPSession。
 * （见 https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.proposed.browser.d.ts）：
 *  - onDidReceiveMessage: Event<unknown>  收到的是 CDP 对象（非 JSON 字符串）
 *  - onDidClose: Event<void>
 *  - sendMessage(message: {id, method, params, sessionId}): Thenable<void>
 *  - close(): Thenable<void>
 */
interface RawCdpSession {
    onDidReceiveMessage(listener: (msg: any) => void): vscode.Disposable;
    onDidClose(listener: () => void): vscode.Disposable;
    sendMessage(message: { id: number; method: string; params?: unknown; sessionId?: string }): Thenable<void>;
    close(): Thenable<void>;
}

/** 集成浏览器标签（proposed API，宽松类型） */
interface BrowserTabLike {
    readonly url?: string;
    readonly title?: string;
    startCDPSession(): Thenable<RawCdpSession>;
}

interface TabEntry {
    tab: BrowserTabLike;
    client: CdpClient;
    scriptIds: Map<string, string>;
}

/**
 * 最小 CDP 客户端：为 BrowserCDPSession 补齐 "id 匹配请求/响应" 的 send 封装，
 * 并将事件分发给监听器。同一 raw session 只应创建/注册一次 onDidReceiveMessage。
 */
class CdpClient {
    private _nextId = 1;
    private _pending = new Map<number, { resolve: (v: any) => void; reject: (e: Error) => void }>();
    private readonly _listeners: Array<(msg: any) => void> = [];
    private readonly _onMessage: vscode.Disposable;

    constructor(private readonly _raw: RawCdpSession) {
        this._onMessage = _raw.onDidReceiveMessage((msg: any) => {
            // 响应：带 id 且与挂起请求匹配
            if (msg && typeof msg.id === 'number' && this._pending.has(msg.id)) {
                const p = this._pending.get(msg.id)!;
                this._pending.delete(msg.id);
                if (msg.error) { p.reject(new Error(msg.error.message || 'CDP 错误')); }
                else { p.resolve(msg.result); }
                return;
            }
            // 事件：分发给监听器
            for (const l of this._listeners) {
                try { l(msg); } catch (e) { console.error('[github-chinese] CDP 事件处理出错:', e); }
            }
        });
    }

    /** 发送 CDP 命令，sessionId 用于路由到附加的子会话（如页面会话）。 */
    send(method: string, params: unknown = {}, sessionId?: string): Promise<any> {
        const id = this._nextId++;
        return new Promise<any>((resolve, reject) => {
            this._pending.set(id, { resolve, reject });
            Promise.resolve(this._raw.sendMessage({ id, method, params, sessionId })).catch((e: Error) => {
                if (this._pending.delete(id)) { reject(e); }
            });
        });
    }

    onEvent(listener: (msg: any) => void): void { this._listeners.push(listener); }

    close(): void {
        this._onMessage.dispose();
        Promise.resolve(this._raw.close()).catch(() => { });
    }
}

let _statusBar: vscode.StatusBarItem;
const _tabs = new Map<BrowserTabLike, TabEntry>();
let _source: string | null = null;

// ─── browser API 检测 ────────────────────────────────────────

function isBrowserApiAvailable(): boolean {
    const w = vscode.window as any;
    return typeof w.browserTabs !== 'undefined'
        && typeof w.onDidOpenBrowserTab === 'function'
        && typeof w.onDidCloseBrowserTab === 'function';
}

// ─── 注入源码构建 ─────────────────────────────────────────────

async function fetchText(url: string): Promise<string> {
    const res = await (globalThis as any).fetch(url);
    if (!res.ok) { throw new Error(`HTTP ${res.status} ${url}`); }
    return res.text();
}

/**
 * 构建注入源码：GM_* 兼容层 + 等 DOM 就绪后执行词库与主脚本（document-end 语义）。
 * 通过 CDP Page.addScriptToEvaluateOnNewDocument 直接注入（不 eval），
 * 规避 github.com CSP 对 eval 的限制（IBE 因用 new Function 被 CSP 拦截）。
 */
async function refreshSource(): Promise<string | null> {
    try {
        const [locals, main] = await Promise.all([fetchText(LOCALS_URL), fetchText(MAIN_URL)]);
        _source = `(function () {
'use strict';
/* ---- GM_* 兼容层（无 IBE 时补齐页面端 GM API）---- */
var gm = {
    addStyle: function (css) {
        var el = document.createElement('style');
        el.textContent = css;
        (document.head || document.documentElement).appendChild(el);
    },
    getValue: function (k, d) {
        try { var v = localStorage.getItem('ghc:' + k); return v === null ? d : JSON.parse(v); }
        catch (e) { return d; }
    },
    setValue: function (k, v) { try { localStorage.setItem('ghc:' + k, JSON.stringify(v)); } catch (e) {} },
    registerMenuCommand: function () { return 0; },
    unregisterMenuCommand: function () {},
    notification: function () {},
    xmlhttpRequest: function (o) {
        var init = { method: o.method || 'GET', headers: o.headers || {} };
        if (o.data) { init.body = o.data; }
        fetch(o.url, init).then(function (r) { return r.text(); })
            .then(function (t) { if (o.onload) { o.onload({ responseText: t }); } })
            .catch(function (e) { if (o.onerror) { o.onerror(e); } });
    }
};
window.GM_addStyle = gm.addStyle;
window.GM_getValue = gm.getValue;
window.GM_setValue = gm.setValue;
window.GM_registerMenuCommand = gm.registerMenuCommand;
window.GM_unregisterMenuCommand = gm.unregisterMenuCommand;
window.GM_notification = gm.notification;
window.GM_xmlhttpRequest = gm.xmlhttpRequest;

/* ---- 等 DOM 就绪后再执行主脚本（document-end 语义）---- */
function start() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
        return;
    }
${locals}
${main}
}
start();
})();`;
        return _source;
    } catch (e) {
        console.error('[github-chinese] 拉取镜像词库/主脚本失败:', e);
        return null;
    }
}

// ─── CDP 注入 ────────────────────────────────────────────────

async function removeScript(client: CdpClient, identifier: string, sessionId?: string): Promise<void> {
    await client.send('Page.removeScriptToEvaluateOnNewDocument', { identifier }, sessionId).catch(() => { });
}

async function injectInto(entry: TabEntry, source: string, sessionId?: string): Promise<void> {
    const key = sessionId || 'top';
    const prev = entry.scriptIds.get(key);
    if (prev) {
        await removeScript(entry.client, prev, sessionId);
    }
    // 注册到"新文档"：之后每次导航/刷新都会执行（不 eval，绕过 CSP）
    for (const params of [{ source, runImmediately: true }, { source }]) {
        try {
            const { identifier } = await entry.client.send('Page.addScriptToEvaluateOnNewDocument', params, sessionId) as { identifier?: string };
            if (identifier) { entry.scriptIds.set(key, identifier); }
            break;
        } catch (e) {
            console.error('[github-chinese] 注册注入脚本失败:', e);
        }
    }
    // 双保险：对当前已加载文档用 Runtime.evaluate 立即执行一次（无需刷新即可翻译当前页面）
    await entry.client.send('Runtime.evaluate', { expression: source, awaitPromise: true }, sessionId).catch(() => { });
}

/**
 * 附加一个页面会话并注入。
 * @param sid 页面会话 id（attachToTarget 或 attachedToTarget 返回）
 */
async function attachAndInject(entry: TabEntry, sid: string, waitingForDebugger: boolean, source: string): Promise<void> {
    await entry.client.send('Page.enable', {}, sid).catch(() => { });
    await entry.client.send('Runtime.enable', {}, sid).catch(() => { });
    // 让该页面会话也自动附加其子 target（iframe/worker）
    await entry.client.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true }, sid).catch(() => { });
    await injectInto(entry, source, sid);
    if (waitingForDebugger) {
        await entry.client.send('Runtime.runIfWaitingForDebugger', {}, sid).catch(() => { });
    }
}

async function adopt(tab: BrowserTabLike): Promise<void> {
    if (_tabs.has(tab) || !_source) { return; }
    const source = _source; // 守卫后 _source 已窄化为 string，捕获给闭包使用
    let raw: RawCdpSession;
    try {
        raw = await tab.startCDPSession();
    } catch (e) {
        console.error('[github-chinese] 无法为标签启动 CDP 会话:', e);
        return;
    }
    const entry: TabEntry = { tab, client: new CdpClient(raw), scriptIds: new Map() };
    _tabs.set(tab, entry);
    const client = entry.client;

    // 监听自动附加的新 target（后续打开的新页面/子 frame）
    client.onEvent((msg) => {
        if (msg?.method === 'Target.attachedToTarget') {
            const params = msg.params || {};
            const sid: string | undefined = params.sessionId;
            const info = params.targetInfo || {};
            if (sid && info.type === 'page') {
                void attachAndInject(entry, sid, !!params.waitingForDebugger, source);
            } else if (sid && params.waitingForDebugger) {
                // 非 page target（worker 等）暂停，恢复其执行
                void client.send('Runtime.runIfWaitingForDebugger', {}, sid).catch(() => { });
            }
        } else if (msg?.method === 'Target.detachedFromTarget') {
            const sid: string | undefined = msg.params?.sessionId;
            if (sid) {
                const id = entry.scriptIds.get(sid);
                if (id) { void removeScript(client, id, sid); }
                entry.scriptIds.delete(sid);
            }
        }
    });

    // 先开启自动附加，再显式发现并附加现有页面 target
    await client.send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: true, flatten: true }).catch(() => { });
    try {
        const { targetInfos } = await client.send('Target.getTargets') as { targetInfos?: Array<{ type: string; targetId: string }> };
        for (const info of (targetInfos || [])) {
            if (info.type !== 'page') { continue; }
            const res = await client.send('Target.attachToTarget', { targetId: info.targetId, flatten: true }).catch(() => null) as { sessionId?: string } | null;
            const sid = res?.sessionId;
            if (sid) {
                // 已 attach 的页面：注册脚本到新文档 + 对当前文档立即执行（见 injectInto）
                await attachAndInject(entry, sid, false, source);
            }
        }
    } catch (e) {
        console.error('[github-chinese] 发现/附加页面 target 失败:', e);
    }
    updateStatusBar();
}

// ─── 状态栏 / 命令 ───────────────────────────────────────────

function updateStatusBar(): void {
    if (!_statusBar) { return; }
    const ok = isBrowserApiAvailable();
    _statusBar.text = ok ? `$(check) GitHub 中文化 (${_tabs.size})` : '$(circle-slash) GitHub 中文化';
    _statusBar.tooltip = ok ? `已注入 ${_tabs.size} 个集成浏览器标签` : 'browser API 不可用，请以 --enable-proposed-api 启动';
    _statusBar.show();
}

// ─── 激活 ────────────────────────────────────────────────────

export async function activate(context: vscode.ExtensionContext) {
    console.log('[github-chinese] 扩展已激活');

    _statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    _statusBar.command = 'github-chinese.status';
    context.subscriptions.push(_statusBar);

    context.subscriptions.push(
        vscode.commands.registerCommand('github-chinese.status', () => {
            void vscode.window.showInformationMessage(
                [
                    `browser API：${isBrowserApiAvailable() ? '✅ 可用' : '❌ 不可用'}`,
                    `注入标签数：${_tabs.size}`,
                    `词库：${_source ? '✅ 已加载（镜像）' : '❌ 加载失败'}`,
                ].join('\n')
            );
        }),
        vscode.commands.registerCommand('github-chinese.refresh', async () => {
            const src = await refreshSource();
            if (!src) { return; }
            for (const entry of _tabs.values()) {
                for (const id of [...entry.scriptIds.keys()]) {
                    await injectInto(entry, src, id === 'top' ? undefined : id);
                }
            }
            void vscode.window.showInformationMessage(`GitHub 中文化：已刷新注入（${_tabs.size} 个标签）`);
            updateStatusBar();
        })
    );

    if (!isBrowserApiAvailable()) {
        void vscode.window.showWarningMessage('GitHub 中文化：当前 VS Code 未启用 browser API，请以 --enable-proposed-api 启动。');
        updateStatusBar();
        return;
    }

    if (!(await refreshSource())) {
        void vscode.window.showWarningMessage('GitHub 中文化：无法从镜像拉取词库/脚本，注入未启用。');
    }

    const w = vscode.window as any;
    for (const tab of (w.browserTabs || [])) { void adopt(tab); }
    context.subscriptions.push(
        w.onDidOpenBrowserTab((tab: BrowserTabLike) => void adopt(tab)),
        w.onDidCloseBrowserTab((tab: BrowserTabLike) => {
            const entry = _tabs.get(tab);
            if (entry) { entry.client.close(); }
            _tabs.delete(tab);
            updateStatusBar();
        })
    );
    updateStatusBar();
}

export function deactivate(): void {
    for (const entry of _tabs.values()) { entry.client.close(); }
    _tabs.clear();
}
