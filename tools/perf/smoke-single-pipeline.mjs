// 单管线冒烟验证（headless，不需要登录）
//
// 目的：拆掉 React GlobalNav 旁路引擎后，确认真实 GitHub 页面上
//   1) 头部导航仍被通用遍历翻成中文；
//   2) 顶部搜索入口仍能被识别（新版 UI 的入口文案由通用管线翻译）；
//   3) 面包屑里的账号名 / 仓库名不被误译（#824）；
//   4) 没有未捕获错误、没有把节点写坏的迹象。
//
// 用法: node tools/perf/smoke-single-pipeline.mjs [url ...]
//       EDGE_BIN=... node tools/perf/smoke-single-pipeline.mjs

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { connect, sleep } from './lib/cdp.mjs';
import { proxyArgs } from './lib/edge.mjs';
import { INSTRUMENT, SHIMS, buildBootstrap, readScripts } from './lib/instrument.mjs';
import { splitDictionaryTopLevel } from './lib/split-dictionary.mjs';

// locals.js 有 2MB，单条 addScriptToEvaluateOnNewDocument 会让浏览器迟迟不回包（实测 30s 超时）；
// 按顶层语句边界切段逐条注入即可（eval 会被 GitHub 的 CSP 拦）。
async function installChunked(session, { chunkSize = 200000 } = {}) {
    const { locals, main } = readScripts();
    const identifiers = [];
    const register = async source => {
        const { identifier } = await session.send('Page.addScriptToEvaluateOnNewDocument', { source });
        identifiers.push(identifier);
    };

    await register(INSTRUMENT);
    await register(SHIMS);
    const chunks = splitDictionaryTopLevel(locals, chunkSize);
    for (const chunk of chunks) await register(chunk);
    await register(buildBootstrap(main));
    return identifiers;
}

const EDGE = [
    process.env.EDGE_BIN,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/microsoft-edge',
].filter(Boolean).find(existsSync);

if (!EDGE) {
    console.error('找不到 Edge，可用 EDGE_BIN 指定');
    process.exit(1);
}

const PORT = Number(process.env.EDGE_DEBUG_PORT || 9273);
const URLS = process.argv.slice(2).length
    ? process.argv.slice(2)
    : [
        'https://github.com/maboloshi/github-chinese',
        'https://github.com/community/community',
    ];

const profile = mkdtempSync(join(tmpdir(), 'gnav-smoke-'));
const child = spawn(EDGE, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    ...proxyArgs(),
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-component-extensions-with-background-pages',
    'about:blank',
], { stdio: 'ignore' });

const CJK = /[\u3400-\u9fff]/;

async function waitForPort(port, timeoutMs = 20000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        await sleep(300);
        try {
            if ((await fetch(`http://127.0.0.1:${port}/json/version`)).ok) return true;
        } catch {}
    }
    return false;
}

function check(name, ok, detail) {
    console.log(`  ${ok ? '✔' : '✖'} ${name}${detail ? ' — ' + detail : ''}`);
    return ok;
}

let failures = 0;

try {
    if (!await waitForPort(PORT)) throw new Error(`调试端口 ${PORT} 未就绪`);

    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const page = list.find(target => target.type === 'page');
    const session = await connect(page.webSocketDebuggerUrl);
    await session.send('Page.enable');
    await session.send('Runtime.enable');
    const identifiers = await installChunked(session);

    const evaluate = async expression => (await session.send('Runtime.evaluate', {
        expression, returnByValue: true, awaitPromise: true,
    })).result?.value;

    for (const url of URLS) {
        await session.send('Page.navigate', { url });
        await sleep(9000);

        const snapshot = JSON.parse(await evaluate('JSON.stringify(window.__gnavSnapshot && window.__gnavSnapshot())') || 'null');
        const probe = JSON.parse(await evaluate(`JSON.stringify((() => {
            const header = document.querySelector('header.GlobalNav');
            if (!header) return { header: false };
            const labels = [...header.querySelectorAll('a,button,summary')]
                .map(el => (el.textContent || '').trim())
                .filter(text => text && text.length < 24);
            const unique = [...new Set(labels)];
            const searchEntry = header.querySelector('button[aria-label*="quick search" i]');
            const breadcrumbs = [...header.querySelectorAll('nav[data-component="Breadcrumbs"] a[href]')]
                .map(a => ({ text: (a.textContent || '').trim(), path: a.pathname }));
            return { header: true, labels: unique, searchEntry: searchEntry ? searchEntry.textContent.trim() : null, breadcrumbs };
        })())`) || 'null');

        console.log(`\n## ${url}`);
        failures += !check('页面有 header.GlobalNav', probe?.header);
        const labels = probe?.labels || [];
        failures += !check('头部导航出现中文', labels.some(text => CJK.test(text)), labels.slice(0, 10).join(' | '));
        console.log(`    顶部搜索入口: ${JSON.stringify(probe?.searchEntry)}`);
        if (probe?.breadcrumbs?.length) {
            const bad = probe.breadcrumbs.filter(item => CJK.test(item.text));
            failures += !check('面包屑账号/仓库名保持原文', bad.length === 0, JSON.stringify(probe.breadcrumbs));
        }
        if (snapshot) {
            failures += !check('无未捕获错误', snapshot.errors.length === 0, JSON.stringify(snapshot.errors));
            failures += !check('无 removeChild 错误', snapshot.removeChildErrors === 0, `removeChildErrors=${snapshot.removeChildErrors}`);
            console.log(`    指标: 中文写入=${snapshot.cjkTextWrites} 回写=${snapshot.revertWrites} ` +
                `销毁式写入=${snapshot.destructiveTextWrites} MO回调=${snapshot.moCallbacks}`);
            console.log(`    覆盖: ${JSON.stringify(await evaluate('JSON.stringify(window.__gnavCoverage && window.__gnavCoverage())'))}`);
        }
    }

    for (const identifier of identifiers) { await session.send('Page.removeScriptToEvaluateOnNewDocument', { identifier }).catch(() => {}); }
    session.close();
} finally {
    spawn('taskkill', ['/F', '/T', '/PID', String(child.pid)], { stdio: 'ignore' });
    await new Promise(resolve => child.once('exit', resolve).once('error', resolve));
    await sleep(1500);
    try {
        rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
    } catch (error) {
        console.warn('临时 profile 未清掉（不影响结论）:', profile);
    }
}

console.log(failures ? `\n结果: ${failures} 项未通过` : '\n结果: 全部通过');
process.exit(failures ? 1 : 0);
