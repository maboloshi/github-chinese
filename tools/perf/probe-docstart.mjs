// GitHub 汉化插件 · 注入时机对照实验（自起 headless 浏览器，不依赖调试窗口）
//
// 问题: 主脚本在 init() 早段就访问 document.documentElement，若注入时机太早会抛错。
//       Tampermonkey 到底给我们的是哪个时机？
//
// 做法: 同一个页面里放两个探针——一个 MV3 内容脚本（run_at=document_start，即
//       Tampermonkey 用的时机），一个 CDP Page.addScriptToEvaluateOnNewDocument
//       （更早一档）——比对各自看到的 DOM 状态。
//
// 用法: node test/perf/probe-docstart.mjs
//       EDGE_BIN=... node test/perf/probe-docstart.mjs

import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { connect, sleep } from './lib/cdp.mjs';

const CANDIDATES = [
    process.env.EDGE_BIN,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/microsoft-edge',
].filter(Boolean);
const EDGE = CANDIDATES.find(existsSync);
if (!EDGE) {
    console.error('找不到 Edge 可执行文件，请用 EDGE_BIN 指定。已尝试:', CANDIDATES.join(' | '));
    process.exit(1);
}

const PORT = Number(process.env.EDGE_DEBUG_PORT || 9271);
const TARGET = 'https://github.com/maboloshi/github-chinese';

const extensionRoot = mkdtempSync(join(tmpdir(), 'ds-ext-'));
const extension = join(extensionRoot, 'ext');
mkdirSync(extension, { recursive: true });
writeFileSync(join(extension, 'manifest.json'), JSON.stringify({
    manifest_version: 3,
    name: 'ds-probe',
    version: '1.0',
    content_scripts: [{ matches: ['https://github.com/*'], run_at: 'document_start', js: ['cs.js'], all_frames: false }],
}));
writeFileSync(join(extension, 'cs.js'), `
window.postMessage({ __dsprobe: {
  who: 'content-script(document_start)',
  docEl: !!document.documentElement,
  head: !!document.head,
  body: !!document.body,
  readyState: document.readyState,
  t: Math.round(performance.now()),
} }, '*');
`);

const profile = mkdtempSync(join(tmpdir(), 'ds-prof-'));
const child = spawn(EDGE, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    `--load-extension=${extension}`,
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
], { stdio: 'ignore' });

try {
    let ready = false;
    for (let i = 0; i < 30 && !ready; i++) {
        await sleep(500);
        try {
            ready = (await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok;
        } catch {}
    }
    if (!ready) throw new Error(`调试端口 ${PORT} 未就绪`);

    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const session = await connect(list.find(target => target.type === 'page').webSocketDebuggerUrl);
    await session.send('Page.enable');
    await session.send('Runtime.enable');

    await session.send('Page.addScriptToEvaluateOnNewDocument', { source: `
        window.__dsProbe = [];
        addEventListener('message', e => { if (e.data && e.data.__dsprobe) window.__dsProbe.push(e.data.__dsprobe); });
        window.__dsProbe.push({
            who: 'CDP(addScriptToEvaluateOnNewDocument)',
            docEl: !!document.documentElement,
            head: !!document.head,
            body: !!document.body,
            readyState: document.readyState,
            t: Math.round(performance.now()),
        });
    ` });
    await session.send('Page.navigate', { url: TARGET });
    await sleep(9000);

    const probes = JSON.parse(await session.evaluate('JSON.stringify(window.__dsProbe || [])'));
    console.log('注入时机对照（按发生顺序）:');
    probes.forEach((p, i) => console.log(
        `  ${i + 1}. ${p.who}\n     documentElement=${p.docEl} head=${p.head} body=${p.body} readyState=${p.readyState} t=${p.t}ms`,
    ));
    if (!probes.some(p => p.who.startsWith('content-script'))) {
        console.log('  (内容脚本未上报：扩展是否被加载？)');
    }
    session.close();
} finally {
    spawn('taskkill', ['/F', '/T', '/PID', String(child.pid)], { stdio: 'ignore' });
    await sleep(1000);
    rmSync(profile, { recursive: true, force: true });
    rmSync(extensionRoot, { recursive: true, force: true });
}
