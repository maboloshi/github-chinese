# 性能基准台（tools/perf）

量的是 `main.user.js` 在**真实 GitHub 页面**上对 React 管理的 DOM 做了什么。
它需要真实浏览器 + GitHub 登录态，只在动头部翻译模块时手动跑，不属于 `node --test test/`。

**为什么不放在 `test/` 下**：裸跑 `node --test` 会把 `test/` 目录下的每个文件都当成测试文件，
连 `lib/*.mjs` 和 `reports/` 里的副本都算，等于跑一次七十秒的浏览器基准并报一堆失败。
放到 `tools/` 下就与测试发现规则彻底无关。

## 为什么要真实浏览器

要测的三件事 jsdom 一样都给不了：

- React 是否把我们的改写**回写**覆盖掉（需要真实水合与真实调度）；
- 我们改写过的节点会不会被 React `removeChild` 掉（即会不会引发 `NotFoundError`）；
- 事件频率与遍历成本的耦合（需要真实的 hover/focus/输入事件派发）。

所以基准台通过 CDP 连一个已登录的调试 Edge，在文档创建前注入插桩，然后像真人一样操作页面。

## 一次性准备

```bat
tools\perf\start-edge-debug.cmd
```

首次跑起来后在窗口里登录 GitHub 网页账号即可（**不要**登录 Edge 账号——会同步扩展进来）。
profile 默认落在 `%LOCALAPPDATA%\github-chinese-edge-debug\profile`，与日常 Edge 数据完全隔离。

两个要注意的 Chromium 行为：

- **136+ 拒绝对默认用户数据目录开放远程调试端口**，所以必须显式给非默认 `--user-data-dir`；
- **`--disable-extensions` 挡不住 Edge 自带的组件扩展**（实测仍剩 6 个），必须同时加
  `--disable-component-extensions-with-background-pages` 才能让扩展 target 归零。
  装了 Tampermonkey 的 profile 会和基准台注入的仓库脚本打架，所以这个 profile 保持干净。

环境变量覆盖：`EDGE_BIN` / `EDGE_DEBUG_PORT` / `EDGE_DEBUG_PROFILE` / `EDGE_DEBUG_PROXY` /
`EDGE_DEBUG_URL` / `EDGE_DEBUG_NO_PROXY`。

## 跑基准

```bat
node tools\perf\bench.mjs
node tools\perf\bench.mjs --baseline tools\perf\baseline\1.9.4.4.json
node tools\perf\bench.mjs --out reports\step-1.json
node tools\perf\bench.mjs --main reports\head-main.user.js
node tools\perf\bench.mjs --url https://github.com/maboloshi/github-chinese/issues
```

五个场景：页面加载 → 导航 hover → 用户菜单 Portal → 搜索弹层连续输入 → 菜单连开连关 ×3 →
静置 3s（等前序收尾）→ 静止 10s（稳态）。
结果写到 `reports/bench-report.json`（该目录不入库）。

被测页面由 `--url`（或 `EDGE_DEBUG_URL`）决定，默认是仓库主页。bench **每次都会自己导航过去**，
不会沿用标签页当前所在的页面——调试浏览器是人手动开的，实测漂到过 `/notifications`，
不导航就会在同一份脚本上量出完全不同的一组数字。A/B 两轮也一律走 `Page.navigate`，
不混用 `Page.reload`（两者加载特征不同，会污染对照）。

`--baseline` / `--out` / `--main` 都按**当前工作目录**解析。
`--main` 用来 A/B 对照历史版本，不必改动工作树：

```bat
git show HEAD:main.user.js > reports\head-main.user.js
node tools\perf\bench.mjs --main reports\head-main.user.js
```

bench 开始前会关掉调试浏览器里多余的标签页——插桩只存在于它重载的那个文档里，
留着多个标签页会让后续的 probe/stress 分不清被测对象。

**测量纪律**：基准台注入的是**仓库里的 `main.user.js` 与 `locals.js`**，不是 Tampermonkey 里已发布的版本。
改完脚本直接重跑即可，不需要重新打包、也不需要动浏览器里的插件。

**注入约束**：`locals.js` 已有 2MB 量级，单条 `Page.addScriptToEvaluateOnNewDocument` 会让浏览器
迟迟不回包（实测 30s 超时）；而 GitHub 的 CSP 又不允许 `eval`。所以 `lib/instrument.mjs` 用
`lib/split-dictionary.mjs` 按顶层语句边界把词库切段、逐条登记。改注入逻辑时别退回一次性注入。

## 指标口径

全部来自 [`lib/instrument.mjs`](lib/instrument.mjs) 对原生原型的包装，`bench` 与各 probe/stress 脚本共用同一套：

| 指标 | 含义 |
|---|---|
| `moCallbacks` / `moRecords` | MutationObserver 回调次数 / 收到的记录条数 |
| `moTimeMs` | 回调内耗时合计（即脚本自己的处理时间） |
| `treeNodes` | `createTreeWalker().nextNode()` 实际走过的节点数 —— **纯浪费最直观的指标** |
| `walkerNodes` / `walkerSites` | 上面那个数按「哪个调用点建的 walker」拆开；主脚本是单独注入的一段脚本，栈里的 `<anonymous>:N` 就是它的行号，所以能直接对回 `main.user.js:N` |
| `cjkTextWrites` | 写入中文的次数（覆盖度侧面证据） |
| `revertWrites` | 我们写过之后又被改回原值的次数（= React 回写） |
| `destructiveTextWrites` | 对已有子节点的元素做 `textContent =` 的次数。**这个数字包含页面自己（React、`github-elements`）的写入**，不全是我们的；要归属就看 `destructiveSamples` 里的调用栈 |
| `destructiveSamples` | 头 5 次销毁式写入的调用栈，用来分辨「这 5 次是谁写的」 |
| `removeChildErrors` / `insertErrors` | React 删除/插入我们动过的节点时抛的异常 |
| `longTasks` | 长任务数量 |

**读数纪律**：`after-load` 的 `moRecords` 与 `treeNodes` 有**双峰波动**（实测同一份代码跑出
1166~1487 记录、3001~3394 节点，各项 observer 的增量同涨同落，像是同一次运行里页面自己多做了
约 25% 的活）。所以：

- 对照要跑两轮以上看分布，别拿单轮差值下结论；
- 判断「我们变快了没有」优先看 `walkerNodes` 里属于 `main.user.js` 的那几个调用点，
  以及 `settle-3s`/`idle-10s` 是否为 0；
- 判断「有没有翻译退化」看 `cjkTextWrites` 与覆盖度（`search-*` 之后的阶段随打字落点波动，不逐位可比）。

## 压力场景

需要先跑过一次 `bench.mjs`（它负责注入插桩并重载页面），然后在同一个页面上：

```bat
node tools\perf\stress-search.mjs    # 搜索弹层连续打字
node tools\perf\stress-heavy.mjs     # 文件查找器实时过滤 + 通知面板
node tools\perf\probe-hover.mjs      # hover 触发的提示气泡是否仍被翻译
node tools\perf\probe-mutations.mjs  # 各条变更通道实际覆盖到哪些节点
```

## 单管线冒烟（headless，不需要登录）

拆掉 React GlobalNav 旁路引擎后，用它确认「头部仍被通用遍历翻译」且「搜索控件没被动过」：

```bat
node tools\perf\smoke-single-pipeline.mjs
node tools\perf\smoke-single-pipeline.mjs https://github.com/community/community
```

它自起 headless Edge，逐个页面检查：header 存在、导航出现中文、搜索控件无中文、面包屑里的
账号名/仓库名未被翻译、无未捕获错误、`removeChildErrors=0`，并打印 `cjkTextWrites`/`revertWrites`。

**环境限制**：headless 访问 github.com 在部分网络下会落到 `chrome-error://`，
所以它只适合做冒烟，不能替代调试窗口里的 `bench.mjs`。

`probe-docstart.mjs` 是独立的注入时机对照实验（自己起 headless 浏览器，不依赖调试窗口）：

```bat
node tools\perf\probe-docstart.mjs
```

`probe-writetargets.mjs` 不装插桩，只把页面里各类写入目标的真实 DOM 形状摊开
（子节点个数与类型、可见文字到底来自 DOM 还是 CSS），改写入方式之前先跑它：

```bat
node tools\perf\probe-writetargets.mjs
node tools\perf\probe-writetargets.mjs --url <页面地址> --wait 9000
```

## 文件

| 路径 | 作用 |
|---|---|
| `lib/cdp.mjs` | CDP 连接、求值、指标差值、单行摘要 |
| `lib/instrument.mjs` | 插桩脚本 + `GM_*` 垫片 + 主脚本外壳 + 注入顺序 |
| `bench.mjs` | 五场景基准，可对照基线 |
| `probe.mjs` | 读页面/注入状态，或执行任意表达式 |
| `stress-search.mjs` | 搜索弹层打字压力 |
| `stress-heavy.mjs` | 文件查找器 + 通知面板压力 |
| `probe-hover.mjs` | hover 提示气泡的翻译与遍历成本 |
| `probe-mutations.mjs` | 各条变更通道（新增元素自身 / 后代 / 属性变化 / 文本）实际覆盖到谁 |
| `probe-header-translate.mjs` | 按 250ms 采样 header 导航项，区分「从未翻」与「翻了又被 React 覆盖」 |
| `probe-search-placeholder.mjs` | 摊开搜索控件文案的真实来源（DOM 文本 / input 属性 / CSS），改 input 补翻前先看它 |
| `probe-writetargets.mjs` | 写入目标的 DOM 形状（空 / 单文本 / 多子节点），改写入方式前先看它 |
| `probe-docstart.mjs` | `document_start` vs CDP 注入时机对照 |
| `start-edge-debug.cmd` | 起基准台专用调试浏览器 |
| `baseline/` | 冻结的基线数据 |
| `reports/` | 每次运行的输出（不入库） |
