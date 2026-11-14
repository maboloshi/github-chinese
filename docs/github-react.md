# GitHub 新版页面的 React 渲染机制

> 实测时间：2026-11-14；对象：`github.com/<owner>/<repo>` 仓库首页。
> 用途：解释「描述翻译」按钮为什么必须在 React 提交之后挂载，对应实现见 `main.user.js` 的 `watchReactCommits()`。

## 结论

1. 仓库页是 **SSR HTML + 客户端 React app**，不是静态服务端页面：
   `DOMContentLoaded` / `load` / `turbo:load` / `soft-nav:react-done` 触发时，SSR 节点还没被 React 接管。
2. 在接管前往描述节点后面插按钮，会制造 hydration mismatch：React 丢弃这棵 SSR 树、改为客户端渲染，按钮随之消失（实测 0.5–1s 后）。
3. 可靠时机是 GitHub `react-core` 打完的 **`react-root:commit:<app>` performance mark**（React 提交完成之后）。脚本用 `PerformanceObserver({ entryTypes: ['mark'], buffered: true })` 监听它。
4. 首次载入与软导航（Turbo / `soft-nav:*`）都会打这个 mark，root 名会变（仓库首页 `code-view`，切到 Issues 后 `repo`），所以按前缀 `react-root:commit:` 匹配。

## 技术栈（实测）

- React **19.3.1**（bundle 内 `version="19.3.1"`）+ `react-dom/client` + `react-reconciler` + `scheduler`，通过原生 ESM + `<script type="importmap">` 加载。
- `react-compiler-runtime`（React Compiler）、`primer-react`（Primer React Components，`prc-*` 类名）。
- 不是 Next/Remix/RSC：`__next_f`、`__remixContext`、`__FLIGHT_DATA` 均不存在。
- `window.Turbo` 存在，但描述区域的渲染/替换由 React 完成，期间没有 Turbo 事件、没有 Fetch/XHR。

## 页面结构

- 仓库页数据内联在 `<script type="application/json">`，键形如 `codeViewRepoRoute`（约 100KB）。
- 根组件 `CodeViewRepoInternal` 接收 `payload`，fiber 链：
  `CodeViewRepoInternal → providers → SidebarAbout → SidebarSection → Description → SafeHTML → Text → <p class="…description…">`
- 仓库页同时渲染窄屏（`NarrowOnly__`）与桌面侧栏（`HideWhenNarrow__`）两份 About 描述，脚本两份都要挂。

## 可观测信号

| 信号 | 类型 | 时刻 | 能否作为挂载时机 |
|---|---|---|---|
| `DOMContentLoaded` | DOM 事件 | SSR 已解析，React 未接管 | ❌ |
| `soft-nav:initial` | DOM 事件（document） | 软导航开始 | ❌ |
| `soft-nav:react-done` | DOM 事件（document） | 早于 commit mark 20–500ms | ❌ 实测仍丢 |
| `soft-nav:payload` | DOM 事件（document） | 早于 commit mark | ❌ |
| `react-root:commit:<app>` | performance mark | React 提交完成 | ✅ |
| `react-root:total` | performance measure | 单个 root 解析 + 渲染总耗时 | 参考 |

`react-root:commit:*` 由 `@github-ui/react-core` 埋点，同组还有 `react-root:start`、`react-root:get-node-start`、`react-root:render-start`。

## 实测对照（同机 Edge headless，1280px）

| 实验 | 结果 |
|---|---|
| 不插入节点 | SSR 描述节点原地 hydration，获得 `__reactFiber$` |
| `DOMContentLoaded` 插按钮 | hydration mismatch：节点被移除并改为客户端渲染，按钮丢 |
| `soft-nav:react-done` 同步插 | 仍丢（事件早于 commit） |
| `react-root:commit:*` 时插 | 存活（6–10s 观察无移除） |
| 真实脚本端到端 | t+6s / t+10s 均有按钮，无报错 |

## 失效对策

- 若 GitHub 改掉 `react-root:commit:*` 埋点，`watchReactCommits()` 会静默不挂。先在页面里执行 `performance.getEntriesByType('mark')` 确认新名字，再改前缀。
- `PerformanceObserver` 不可用时脚本退回载入时挂载（此时会触发一次 mismatch 重渲染，仅作兜底）。
- 复现：用 CDP `Page.addScriptToEvaluateOnNewDocument` 注入探针，`PerformanceObserver` 记录 mark、`MutationObserver` 记录描述节点的 added/removed 即可。
