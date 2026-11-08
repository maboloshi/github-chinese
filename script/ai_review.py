#!/usr/bin/env python3
"""
AI 代码审查（DeepSeek）—— 生成结构化中文审查。
用法：
  python script/ai_review.py --repo <owner/repo> --pr <number> [--mode full|summary] [--out file.md]
输出：审查 Markdown（默认 stdout，--out 写文件）。
环境变量：
  LLM_API_KEY  必填（DeepSeek API key）
  LLM_BASE_URL 可选，默认 https://api.deepseek.com
  LLM_MODEL    可选，默认 deepseek-chat
"""
import argparse
import json
import os
import sys
import time
import urllib.request
import urllib.error


def fetch(url: str, headers: dict | None = None, retries: int = 3) -> str:
    """拉取 URL；对 5xx / 网络错误做指数退避重试。"""
    req = urllib.request.Request(
        url, headers=headers or {"User-Agent": "github-chinese-ai-review"}
    )
    last_err = ""
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read().decode("utf-8")
        except urllib.error.HTTPError as e:
            last_err = f"HTTP {e.code}"
            if e.code < 500:  # 4xx 不重试
                raise
        except Exception as e:  # noqa: BLE001 - 网络层异常统一重试
            last_err = str(e)
        time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"请求失败（重试 {retries} 次后仍失败）：{last_err}")


def main() -> None:
    parser = argparse.ArgumentParser(description="AI 代码审查（DeepSeek）")
    parser.add_argument("--repo", required=True, help="owner/repo")
    parser.add_argument("--pr", required=True, help="PR 编号")
    parser.add_argument("--mode", choices=["full", "summary"], default="full")
    parser.add_argument("--out", help="输出文件（默认 stdout）")
    args = parser.parse_args()

    api_key = os.environ.get("LLM_API_KEY")
    if not api_key:
        print("❌ 缺少环境变量 LLM_API_KEY", file=sys.stderr)
        sys.exit(1)

    # 1) PR 元数据 + diff
    try:
        pr_meta = json.loads(fetch(f"https://api.github.com/repos/{args.repo}/pulls/{args.pr}"))
    except Exception as e:  # noqa: BLE001
        print(f"❌ 无法获取 PR 信息：{e}", file=sys.stderr)
        sys.exit(1)
    title = pr_meta.get("title", "")
    body = (pr_meta.get("body") or "")[:2000]
    base, head = pr_meta["base"]["ref"], pr_meta["head"]["ref"]
    try:
        diff = fetch(f"https://github.com/{args.repo}/pull/{args.pr}.diff")
    except Exception as e:  # noqa: BLE001
        print(f"❌ 无法获取 PR diff：{e}", file=sys.stderr)
        sys.exit(1)
    if len(diff) > 60000:
        diff = diff[:60000] + "\n...(diff 过长已截断)"

    # 2) 仓库审查规范（强制中文回复）
    instructions = ""
    try:
        instructions = fetch(
            f"https://raw.githubusercontent.com/{args.repo}/HEAD/.github/copilot-instructions.md"
        )
    except Exception:
        pass

    # 3) 组装 prompt
    system = (
        "你是一名资深代码审查员。请务必用简体中文输出审查意见。\n" + instructions
    )
    scope = "请重点审查核心逻辑、正确性、安全与可维护性，给出精炼结论。"
    if args.mode == "summary":
        scope = "请只输出简短摘要（3-5 行）：变更目的、主要风险、是否建议合并。"
    user = f"""请审查拉取请求 #{args.pr}「{title}」（{base} → {head}）。

PR 描述：
{body}

变更 diff：
```diff
{diff}
```

{scope}

完整输出请用如下 Markdown 结构：
## 概览
一句话结论 + 变更规模/重点。
## 发现的问题
按严重度分组（🔴 阻断 / 🟠 重要 / 🟡 建议 / 🔵 nit），每条尽量给出「文件:行号 + 问题 + 修改建议」。
## 优点
值得肯定的点。
## 重写/改进建议（必要时）
对明显可简化的逻辑给出具体改法；若无需重写则省略本节。
若 diff 为空或无可审内容，请如实说明。"""

    # 4) 调用 DeepSeek
    base_url = os.environ.get("LLM_BASE_URL") or "https://api.deepseek.com"
    model = os.environ.get("LLM_MODEL") or "deepseek-chat"
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.2,
        "stream": False,
    }
    req = urllib.request.Request(
        f"{base_url}/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            resp = json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"❌ DeepSeek 调用失败：{e.code} {e.read().decode('utf-8')[:500]}", file=sys.stderr)
        sys.exit(1)

    choices = resp.get("choices") or []
    if not choices:
        print("❌ DeepSeek 返回空 choices（可能被内容过滤或额度/余额不足）", file=sys.stderr)
        sys.exit(1)
    content = choices[0].get("message", {}).get("content", "")
    review = (
        f"## 🤖 AI 审查（DeepSeek）— PR #{args.pr}\n\n{content}\n\n"
        "---\n*由 `script/ai_review.py` 生成，使用请求者自己的 DeepSeek 额度。*"
    )
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(review)
        print(f"✅ 审查已写入 {args.out}", file=sys.stderr)
    else:
        print(review)


if __name__ == "__main__":
    main()
