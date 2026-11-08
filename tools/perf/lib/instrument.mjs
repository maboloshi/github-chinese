// GitHub 汉化插件 · 性能基准台 · 插桩与注入素材
//
// 三块素材，必须按 INSTRUMENT → SHIMS → 词库 → 主脚本 的顺序注入到同一个新文档：
//   INSTRUMENT  计数器，包住 MutationObserver / createTreeWalker / textContent / data /
//               setAttribute / removeChild / insertBefore，并收集 longtask 与未捕获错误。
//               必须在主脚本之前执行，否则包不住主脚本自己创建的那些对象。
//   SHIMS       GM_* 垫片，让 userscript 在普通页面里跑得起来。
//   bootstrap   主脚本外壳：等 documentElement 出现再启动。

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitDictionaryTopLevel } from './split-dictionary.mjs';

/** 仓库根目录（由本文件位置推出，不受调用方 cwd 影响）。 */
export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

export const INSTRUMENT = `
(() => {
  // 防重复登记：addScriptToEvaluateOnNewDocument 的登记对 page target 是累积的，
  // 同一只浏览器里连着跑两次基准会注入两份脚本，指标直接翻倍而没有任何报错。
  // 这里检测到重复就把事情闹大，让 bench.mjs 中止，而不是悄悄给出错数字。
  if (window.__gnavHarnessInstalled) { window.__gnavHarnessDuplicate = true; return; }
  window.__gnavHarnessInstalled = true;

  const M = {
    moCallbacks: 0, moRecords: 0, moTimeMs: 0, byTarget: {},
    treeWalkers: 0, treeNodes: 0, walkerSites: {}, walkerNodes: {},
    textContentWrites: 0, dataWrites: 0, setAttributeWrites: 0,
    cjkTextWrites: 0, revertWrites: 0, revertSamples: [], destructiveTextWrites: 0, destructiveSamples: [],
    removeChildCalls: 0, removeChildErrors: 0, insertErrors: 0, removedWritten: 0,
    longTasks: 0, longTaskMs: 0, errors: [],
  };
  window.__gnav = M;
  const CJK = /[\\u3400-\\u9fff]/;
  const orig = new WeakMap();
  const last = new WeakMap();
  const written = new WeakSet();

  const NativeMO = window.MutationObserver;
  window.MutationObserver = class extends NativeMO {
    constructor(cb) {
      const wrapped = function (records, obs) {
        const t0 = performance.now();
        M.moCallbacks++; M.moRecords += records.length;
        const label = obs && obs.__label ? obs.__label : 'unknown';
        const b = M.byTarget[label] || (M.byTarget[label] = { callbacks: 0, records: 0, types: {} });
        b.callbacks++; b.records += records.length;
        // 按记录类型分开计：childList 要走子树、attributes/characterData 只该动那一个节点，
        // 分不清类型就看不出遍历成本该往哪儿收窄。
        for (const record of records) b.types[record.type] = (b.types[record.type] || 0) + 1;
        try { return cb.call(this, records, obs); }
        finally { M.moTimeMs += performance.now() - t0; }
      };
      super(wrapped);
    }
    observe(target, options) {
      this.__label = target === document.body ? 'body'
        : (target.id || (target.tagName + '.' + String(target.className || '').split(' ')[0]).slice(0, 28));
      return super.observe(target, options);
    }
  };

  const nativeCTW = Document.prototype.createTreeWalker;
  // 走查成本归到「哪个调用点建的 walker」。主脚本是单独注入的一段脚本，栈里的
  // <anonymous>:N:M 就是它自己的行号（注意外壳那层前缀占一行，要减 1）。
  const walkerSite = () => {
    const frames = String(new Error().stack || '').split('\\n');
    // stack 的第 0 行是 "Error" 本身，紧接着是 walkerSite、下面的包装函数，之后才是调用方。
    // 所以要从第 3 行开始找；靠名字过滤没用——注入的每段脚本在栈里都叫 <anonymous>。
    for (const frame of frames.slice(3)) {
      const m = frame.match(/(<anonymous>|https?:\\/\\/[^:)]+):(\\d+):(\\d+)/);
      if (m) return (m[1] === '<anonymous>' ? 'main' : m[1].split('/').pop()) + ':' + m[2];
    }
    return 'unknown';
  };
  Document.prototype.createTreeWalker = function (...args) {
    const w = nativeCTW.apply(this, args);
    const site = walkerSite();
    M.treeWalkers++;
    M.walkerSites[site] = (M.walkerSites[site] || 0) + 1;
    const next = w.nextNode.bind(w);
    w.nextNode = function () {
      const n = next();
      if (n) { M.treeNodes++; M.walkerNodes[site] = (M.walkerNodes[site] || 0) + 1; }
      return n;
    };
    return w;
  };

  const classify = (node, prev, next) => {
    if (!orig.has(node)) orig.set(node, prev);
    const o = orig.get(node);
    if (typeof next === 'string') {
      if (CJK.test(next)) { M.cjkTextWrites++; written.add(node); }
      if (prev !== o && next === o) {
        M.revertWrites++;   // 被改回原值 = 有人把这篇文字改回去了
        // 留现场：节点是谁、原值/被改成的值分别是什么、这次写入的调用栈（谁改回去的）。
        // 这个数里混着页面自己的回写，所以判据只能是「本脚本的回写 = 0」，归属靠这里。
        if (M.revertSamples.length < 5) {
          const el = node.nodeType === 1 ? node : node.parentElement;
          M.revertSamples.push({
            node: (node.nodeType === 1 ? node.tagName : node.nodeName)
              + (node.id ? '#' + node.id : '')
              + (node.className ? '.' + String(node.className || '').split(' ')[0] : ''),
            host: el ? String(el.tagName + (el.id ? '#' + el.id : '')).slice(0, 40) : null,
            original: String(o).slice(0, 60),
            replaced: String(prev).slice(0, 60),
            stack: String(new Error().stack || '').split('\\n').slice(1, 6).join(' | '),
          });
        }
      }
    }
    last.set(node, next);
  };

  const tc = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  Object.defineProperty(Node.prototype, 'textContent', {
    configurable: true, enumerable: tc.enumerable,
    get: tc.get,
    set(value) {
      M.textContentWrites++;
      if (this.childNodes && this.childNodes.length && typeof value === 'string') {
        M.destructiveTextWrites++;
        // 只留前几处：知道「还剩哪几处销毁式写入」就能定位，留多了没意义。
        if (M.destructiveSamples.length < 5) {
          M.destructiveSamples.push(String(new Error().stack || '').split('\\n').slice(1, 5).join(' | '));
        }
      }
      classify(this, tc.get.call(this), value);
      return tc.set.call(this, value);
    },
  });

  const cd = Object.getOwnPropertyDescriptor(CharacterData.prototype, 'data');
  Object.defineProperty(CharacterData.prototype, 'data', {
    configurable: true, enumerable: cd.enumerable,
    get: cd.get,
    set(value) {
      M.dataWrites++;
      classify(this, cd.get.call(this), value);
      return cd.set.call(this, value);
    },
  });

  const sa = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    M.setAttributeWrites++;
    if (typeof value === 'string' && CJK.test(value)) M.cjkTextWrites++;
    return sa.call(this, name, value);
  };

  const rc = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    M.removeChildCalls++;
    if (written.has(child)) M.removedWritten++;
    try { return rc.call(this, child); }
    catch (e) { M.removeChildErrors++; M.errors.push('removeChild: ' + e.name); throw e; }
  };
  const ib = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (n, ref) {
    try { return ib.call(this, n, ref); }
    catch (e) { M.insertErrors++; M.errors.push('insertBefore: ' + e.name); throw e; }
  };

  try {
    new PerformanceObserver(l => { for (const e of l.getEntries()) { M.longTasks++; M.longTaskMs += e.duration; } })
      .observe({ entryTypes: ['longtask'] });
  } catch (e) {}
  addEventListener('error', e => M.errors.push('error: ' + (e.message || '')));
  addEventListener('unhandledrejection', e => M.errors.push('rejection: ' + ((e.reason && e.reason.message) || String(e.reason))));

  window.__gnavSnapshot = () => ({
    moCallbacks: M.moCallbacks, moRecords: M.moRecords, moTimeMs: +M.moTimeMs.toFixed(1),
    treeWalkers: M.treeWalkers, treeNodes: M.treeNodes,
    walkerNodes: M.walkerNodes, walkerSites: M.walkerSites,
    textContentWrites: M.textContentWrites, dataWrites: M.dataWrites, setAttributeWrites: M.setAttributeWrites,
    cjkTextWrites: M.cjkTextWrites, revertWrites: M.revertWrites, destructiveTextWrites: M.destructiveTextWrites,
    revertSamples: M.revertSamples.slice(),
    destructiveSamples: M.destructiveSamples.slice(),
    removeChildCalls: M.removeChildCalls, removedWritten: M.removedWritten,
    removeChildErrors: M.removeChildErrors, insertErrors: M.insertErrors,
    longTasks: M.longTasks, longTaskMs: +M.longTaskMs.toFixed(1),
    errors: M.errors.slice(-6),
    targets: Object.entries(M.byTarget).map(kv => [kv[0], kv[1].callbacks, kv[1].records, kv[1].types]),
  });
  // 汉化覆盖度：header 内出现中文的元素数
  window.__gnavCoverage = () => {
    const header = document.querySelector('header.GlobalNav');
    if (!header) return null;
    const all = [...header.querySelectorAll('*')];
    const cjk = all.filter(el => el.children.length === 0 && CJK.test(el.textContent || ''));
    const navLabels = [...header.querySelectorAll('a,button,summary')].slice(0, 60)
      .map(el => (el.getAttribute('aria-label') || el.textContent || '').trim())
      .filter(t => t && t.length < 24);
    return {
      headerElements: all.length,
      cjkLeafElements: cjk.length,
      navSamples: [...new Set(navLabels)].slice(0, 24),
    };
  };
})();
`;

export const SHIMS = `
window.GM_info = { script: { version: 'bench', name: 'bench' } };
window.GM_addStyle = css => { const s = document.createElement('style'); s.textContent = css; (document.head || document.documentElement).appendChild(s); return s; };
window.GM_getValue = (k, d) => { try { const v = localStorage.getItem('gm:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
window.GM_setValue = (k, v) => { try { localStorage.setItem('gm:' + k, JSON.stringify(v)); } catch (e) {} };
window.GM_registerMenuCommand = () => 0;
window.GM_unregisterMenuCommand = () => {};
window.GM_notification = () => {};
window.GM_xmlhttpRequest = () => {};
`;

/**
 * 主脚本外壳。
 *
 * 时序对齐：Tampermonkey 走的是 document_start 内容脚本，此时 documentElement 已存在
 * （实测 true）、head/body 仍为 null、readyState=loading。而 CDP 的
 * Page.addScriptToEvaluateOnNewDocument 更早一档（documentElement 仍为 null），
 * 直接跑主脚本会让 init() 在 initLangEnv 处抛错中断。
 * 因此这里等 documentElement 出现再启动，目的是复刻 Tampermonkey 的真实时序，
 * 而非修补脚本缺陷。
 */
export function buildBootstrap(mainSource) {
    return '(function(){' +
        'if(window.__gnavHarnessBooted){window.__gnavHarnessDuplicate=true;return;}' +
        'window.__gnavHarnessBooted=true;' +
        'var src=function(){' + mainSource + '};' +
        'if(document.documentElement){src();return;}' +
        'var n=0,t=setInterval(function(){if(document.documentElement||++n>200){clearInterval(t);src();}},1);})();';
}

/**
 * 从仓库读取待测脚本。基准台永远测仓库里的文件，不测已发布版本。
 * mainPath 可指向别的副本，用来 A/B 对照历史版本而不必改动工作树
 * （例如 `git show HEAD:main.user.js > reports/head-main.user.js`）。
 */
export function readScripts(root = repoRoot, mainPath = null) {
    return {
        locals: readFileSync(join(root, 'locals.js'), 'utf8'),
        main: readFileSync(mainPath || join(root, 'main.user.js'), 'utf8'),
    };
}

/**
 * 把四块素材按顺序登记到新文档，返回登记号。
 *
 * 登记对 page target 是**累积**的：不清掉就跑第二轮，会注入两份脚本、指标直接翻倍。
 * 所以调用方必须在结束时 uninstallHarness()，否则下一轮会被 INSTRUMENT 的防重复
 * 检测拦下（宁可报错，也不要给出一个悄悄翻倍的数字）。
 */
export async function installHarness(session, { root = repoRoot, mainPath = null } = {}) {
    const { locals, main } = readScripts(root, mainPath);
    // 词库已到 2MB 量级，单条登记会让浏览器迟迟不回包（实测 30s 超时）；
    // GitHub 的 CSP 又不许 eval，只能按顶层语句边界切段逐条登记。
    const sources = [INSTRUMENT, SHIMS, ...splitDictionaryTopLevel(locals), buildBootstrap(main)];
    const identifiers = [];
    for (const source of sources) {
        const { identifier } = await session.send('Page.addScriptToEvaluateOnNewDocument', { source });
        identifiers.push(identifier);
    }
    return identifiers;
}

/**
 * 撤销 installHarness 的登记（只影响后续文档加载，不影响当前页面的插桩）。
 * 取消失败不在这里报错：残留的登记会在下一轮被 INSTRUMENT 的防重复检测拦下，
 * 那里才能给出可读的信息。
 */
export async function uninstallHarness(session, identifiers) {
    for (const identifier of identifiers) {
        await session.send('Page.removeScriptToEvaluateOnNewDocument', { identifier }).catch(() => {});
    }
}
