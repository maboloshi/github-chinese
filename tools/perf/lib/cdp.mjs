// GitHub 汉化插件 · 性能基准台 · 公共 CDP 客户端
//
// 只做一件事：连上已在 --remote-debugging-port 下运行的浏览器，并提供一个可求值的通道。
// 不启动浏览器（启动见 start-edge-debug.cmd），不注入脚本（注入见 ./instrument.mjs）。

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/** 调试端口：默认 9222，可用 EDGE_DEBUG_PORT 覆盖。 */
export function debugPort() {
    return Number(process.env.EDGE_DEBUG_PORT || 9222);
}

/** 所有 page target。调试浏览器里可能同时开着多个标签页（点开新标签就会多一个）。 */
export async function pageTargets(port = debugPort()) {
    let list;
    try {
        list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    } catch (error) {
        throw new Error(`连不上调试端口 ${port}，请先运行 start-edge-debug.cmd（原始错误：${error.message}）`);
    }
    const pages = list.filter(target => target.type === 'page');
    if (!pages.length) throw new Error(`调试端口 ${port} 上没有 page target`);
    return pages;
}

/** 这个标签页里有没有基准台的插桩。 */
export async function hasHarness(target) {
    try {
        const session = await connect(target.webSocketDebuggerUrl);
        const result = await session.send('Runtime.evaluate', {
            expression: 'window.__gnavHarnessInstalled === true',
            returnByValue: true,
        });
        session.close();
        return result.result?.value === true;
    } catch {
        return false;
    }
}

/** 极简 CDP 会话：send(method, params) / close()。 */
export function connect(url) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(url);
        const pending = new Map();
        let id = 0;
        ws.addEventListener('open', () => resolve({
            send(method, params = {}) {
                const mid = ++id;
                ws.send(JSON.stringify({ id: mid, method, params }));
                return new Promise((res, rej) => {
                    pending.set(mid, { res, rej });
                    setTimeout(() => {
                        if (pending.has(mid)) {
                            pending.delete(mid);
                            rej(new Error(`${method} timeout`));
                        }
                    }, 30000);
                });
            },
            close: () => ws.close(),
        }));
        ws.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (message.id && pending.has(message.id)) {
                const { res, rej } = pending.get(message.id);
                pending.delete(message.id);
                message.error ? rej(new Error(JSON.stringify(message.error))) : res(message.result);
            }
        });
        ws.addEventListener('error', reject);
    });
}

/** 关闭除 keepId 以外的所有 page target，返回关掉了几个。 */
export async function closeOtherPages(keepId, port = debugPort()) {
    const others = (await pageTargets(port)).filter(page => page.id !== keepId);
    for (const page of others) {
        await fetch(`http://127.0.0.1:${port}/json/close/${page.id}`).catch(() => {});
    }
    return others.length;
}

/** 被测页面：默认是仓库主页（登录态下带完整 GlobalNav），EDGE_DEBUG_URL 可覆盖。 */
export function benchUrl() {
    return process.env.EDGE_DEBUG_URL || 'https://github.com/maboloshi/github-chinese';
}

/**
 * 把被测标签页带到指定页面并等到文档加载完成。
 *
 * 基准必须自己决定被测页面：调试浏览器里的标签页是人手动开的，可能停在任意位置
 * （实测漂到过 /notifications）。沿用「重载当前标签页」的话，同一份脚本会在不同页面上
 * 量出不同数字，基线也就失去意义。
 *
 * 导航期间求值会打在正在销毁的文档上而失败，所以这里的求值失败一律视为「还没好」。
 */
export async function openPage(session, url, { timeoutMs = 30000 } = {}) {
    const target = new URL(url);
    // 一律走 Page.navigate，即使已经在目标页面上：navigate 与 reload 的加载特征不同，
    // 对同一 URL 用不同方式进入会污染 A/B 对照。
    await session.send('Page.navigate', { url });

    const wanted = `complete|${target.pathname}`;
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        await sleep(300);
        const state = await session
            .evaluate('document.readyState + "|" + location.pathname')
            .catch(() => null);
        if (state === wanted) return;
    }
    throw new Error(`导航到 ${url} 后 ${timeoutMs}ms 内未就绪（最后状态：${wanted}）`);
}

/**
 * 连上调试浏览器并返回求值助手。
 *   evaluate(expr)  → JS 表达式的值
 *   json(expr)      → 把表达式结果当 JSON 取回（表达式本身是脚本内部的值对象）
 *   send/close      → 透传底层会话
 *
 * 调试浏览器里可能开着多个标签页，而插桩只在 bench.mjs 重载过的那个文档里。
 * 需要插桩的脚本（stress-* / probe-hover）必须传 preferHarness；bench.mjs 会在
 * 开始前先 closeOtherPages 清场，所以正常情况下不会有歧义。
 */
export async function attach(port = debugPort(), { preferHarness = false } = {}) {
    const pages = await pageTargets(port);
    let page = pages[0];

    if (preferHarness) {
        const found = [];
        for (const candidate of pages) {
            if (await hasHarness(candidate)) found.push(candidate);
        }
        if (!found.length) {
            throw new Error(
                `端口 ${port} 的 ${pages.length} 个标签页里都没有插桩。` +
                '插桩只存在于 bench.mjs 刚重载过的那个文档里——先跑 bench.mjs，且中间不要刷新页面。',
            );
        }
        if (found.length > 1) {
            console.warn(`注意：有 ${found.length} 个标签页都带着插桩，取第一个。`);
        }
        page = found[0];
    }

    const session = await connect(page.webSocketDebuggerUrl);
    const evaluate = async expression =>
        (await session.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.value;
    const json = async expression => JSON.parse((await evaluate(`JSON.stringify(${expression})`)) || 'null');
    return { ...session, page, evaluate, json };
}

/** 仅保留数值字段的差值，外加 targets/errors 这两个非数值字段。 */
export function delta(before, after) {
    if (!before || !after) {
        throw new Error('取指标快照失败（页面里没有 __gnavSnapshot 或表达式求值出错）');
    }
    const out = {};
    for (const key of Object.keys(after)) {
        if (typeof after[key] === 'number') out[key] = +(after[key] - before[key]).toFixed(2);
    }
    out.targets = after.targets;
    out.errors = after.errors;
    return out;
}

/** 单行指标摘要，bench 与两个 stress 脚本共用，保证口径一致。 */
export function formatMetrics(label, m) {
    return `${label.padEnd(16)} MO回调=${m.moCallbacks} 记录=${m.moRecords} 回调耗时=${m.moTimeMs}ms ` +
        `遍历节点=${m.treeNodes} 中文写入=${m.cjkTextWrites} 回写=${m.revertWrites} ` +
        `销毁式写入=${m.destructiveTextWrites} 长任务=${m.longTasks} ` +
        `removeChild错误=${m.removeChildErrors} insertBefore错误=${m.insertErrors}`;
}
