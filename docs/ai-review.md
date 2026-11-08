# AI 代码审查（DeepSeek）— 使用说明

本仓库内置一个"类 Copilot"的 AI 代码审查工作流：任何用户可**自动或按需**请求 DeepSeek 对 PR 进行中文代码审查，审查以**机器人身份**发布，**每次审查消耗请求者自己的 DeepSeek 额度**，仓库不保存任何密钥明文。

## 如何工作

```mermaid
flowchart LR
  U[用户] -- 提交/评论 PR 或 /review --> W[GitHub Actions<br/>本仓库/fork]
  W -- 拉取 PR diff --> D
  W -- 调用 DeepSeek（用请求者 LLM_API_KEY） --> D[(DeepSeek)]
  W -- 机器人身份发布中文审查 --> P[PR]
```

- `script/ai_review.py`：拉取 PR 元数据与 diff → 读取 `.github/copilot-instructions.md`（强制中文）→ 调用 DeepSeek → 生成结构化审查（概览 / 问题分级 / 优点 / 重写建议）。
- 发布身份：
  - 默认：`github-actions[bot]`（无需任何额外配置）。
  - 若配置了 GitHub App：以 `gh-chinese-ai-reviewer[bot]` 发布（可发布到任意已安装该 App 的仓库，含上游）。

## 触发方式

| 触发 | 说明 |
|---|---|
| `pull_request`（opened / synchronize / ready_for_review） | 打开或更新 PR 时自动审查（需工作流位于默认分支） |
| 评论 `/review` | 在 PR 上评论 `/review` 即按需审查 |
| `workflow_dispatch` | 手动指定 `repo` 与 `pr` 审查任意公开 PR |
| `schedule`（每 15 分钟） | 轮询「看护清单」中的上游 PR，响应其中由本仓库属主发出的 `/review` |

去重：同一 head SHA 只会审查一次（评论尾部 `<!--ai-review:<sha>-->` 标记）。

## 配置（fork 自建实例）

### Secrets（Settings → Secrets and variables → Actions）

| 名称 | 必填 | 说明 |
|---|---|---|
| `LLM_API_KEY` | ✅ | 你的 DeepSeek API key（https://platform.deepseek.com/api_keys）。只存在你自己的 fork，明文从不出你侧 |
| `APP_ID` | 可选 | 用于以 App 机器人身份发布（见下「GitHub App」） |
| `APP_PRIVATE_KEY` | 可选 | GitHub App 私钥（`.pem` 全文） |
| `LLM_BASE_URL` / `LLM_MODEL` | 可选 | 默认 `https://api.deepseek.com` / `deepseek-chat` |

### Variables（可选，Step 2 轮询用）

| 名称 | 说明 |
|---|---|
| `REVIEW_TARGET` | 轮询的目标仓库，默认 `maboloshi/github-chinese` |
| `REVIEW_WATCHLIST` | 逗号分隔的 PR 号，如 `760,766`；只轮询这些 PR 上的 `/review` |

### GitHub App（可选，bot 身份发布）

1. https://github.com/settings/apps/new 创建 App（名称勿以 `GitHub`/`Gist` 开头）
2. 权限：**Pull requests Read & write**、**Issues Write**；Webhook 可关；安装范围 **Any account**
3. 生成私钥 `.pem`；把 `APP_ID`、`APP_PRIVATE_KEY` 配进 Secrets
4. 安装到你自己的 fork（`Install App`）；发布到上游仓库时，请仓库维护者从 App 公共页 https://github.com/apps/<app-name> 安装

## 安全模型

- **任何人看不到明文**：DeepSeek key 只存在于请求者自己的 fork secret / 本地；上游仓库零密钥。
- **自负额度**：每次审查只用触发者自己的 `LLM_API_KEY`（`secrets.LLM_API_KEY`）。
- **bot 身份**：审查以 `github-actions[bot]` 或 GitHub App 机器人发布，不占用用户账号。
- **提示词注入**：密钥绝不进入 prompt；模型输出只作为文本渲染，不执行。
- **工作流安全**：不使用 `pull_request_target`；第三方 Action 建议钉版本；不打印密钥。
- **已知限制**：
  - 上游 `/review` 为**轮询**（约 15 分钟），非即时。
  - fork PR 的 `pull_request` 事件**读不到 secrets** → fork 内 PR 自动审需要把工作流放到 fork 默认分支；上游 PR 的自动审依赖 fork 侧 `push` 反查或轮询。
  - 发布到上游需仓库维护者安装 GitHub App（可随时撤销）。

## 常见问题

- **工作流没跑？** 确认工作流文件在**默认分支**（`issue_comment` / `schedule` / `workflow_dispatch` 只在默认分支触发）。
- **提示缺 `LLM_API_KEY`？** 在 fork 的 Secrets 添加。
- **`/review` 没反应？** 轮询有延迟（≤15 分钟）；确认该 PR 在 `REVIEW_WATCHLIST` 中（若配置）。
- **想只审一次？** 去重按 head SHA，同一提交不会重复审查。
