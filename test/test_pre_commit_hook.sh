#!/usr/bin/env bash
# 测试 .githooks/pre-commit 钩子行为（模型 B：生成文件不入库，由 CI 自动生成）
#
# 用法：bash test/test_pre_commit_hook.sh
# 前置条件：`python` 可执行且已安装依赖（pyyaml、Jinja2、opencc-python-reimplemented）
#
# 场景：
#   A. 工作区生成文件与源文件渲染不一致（手动修改）→ 应阻止提交并打印差异
#   B. 修改源文件且工作区生成文件已同步 → 应提交成功；生成文件不入库
#   C. 无关改动 → 应直接放行
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP" 2>/dev/null || true' EXIT

cd "$TMP"
git init -q
git config user.name "test"
git config user.email "test@example.com"
git config core.hooksPath ".githooks"

# 复制钩子、源文件与 .gitignore（生成文件不入库）
mkdir -p .githooks script/multilingual-docs .github/ISSUE_TEMPLATE vscode-extension
cp "$ROOT/.githooks/pre-commit" .githooks/pre-commit
chmod +x .githooks/pre-commit
cp "$ROOT/.gitignore" .gitignore
cp "$ROOT/pyproject.toml" pyproject.toml
cp "$ROOT/script/manage_templates.py" script/manage_templates.py
cp "$ROOT/script/multilingual-docs/"./* script/multilingual-docs/

# 生成到工作区；baseline 只提交源文件（生成文件被 gitignore，不入库）
python script/manage_templates.py >/dev/null
git add -A
git commit -q -m "baseline"

fail() { echo "❌ FAIL: $1"; exit 1; }

# ── 断言：改源文件提交，若工作区生成文件与源文件渲染不一致 → 应阻止并打印差异 ──
assert_blocked() {
    local desc="$1"
    git add script/multilingual-docs/
    local before; before="$(git rev-parse HEAD)"
    local output; output="$(git commit -m "source change" 2>&1 || true)"
    [ "$(git rev-parse HEAD)" = "$before" ] || fail "场景A($desc)：不一致未被阻止"
    echo "$output" | grep -q "不一致" || fail "场景A($desc)：未打印不一致提示"
    echo "$output" | grep -q "请通过源文件修改" || fail "场景A($desc)：未提示通过源文件修改"
    git reset -q --hard
    echo "✅ 场景A($desc)：被阻止并打印差异"
}

# ── 场景 A：改源文件并同步生成后，再手动修改 README.md → 应阻止 ──
sed -i 's/CN: 贡献指南/CN: 贡献指南钩子测试/; s/TW: 貢獻指南/TW: 貢獻指南鉤子測試/' \
    script/multilingual-docs/CONTRIBUTING.yml
python script/manage_templates.py >/dev/null
echo "<!-- manual edit -->" >> README.md
assert_blocked "手动修改 README.md"

# 恢复：重置源文件改动 + 重新生成（README 回到 baseline 渲染）
git reset -q --hard
python script/manage_templates.py >/dev/null

# ── 场景 B：改源文件 + 生成同步 → 应提交成功，生成文件不入库 ──
sed -i 's/CN: 贡献指南/CN: 贡献指南钩子测试/; s/TW: 貢獻指南/TW: 貢獻指南鉤子測試/' \
    script/multilingual-docs/CONTRIBUTING.yml
python script/manage_templates.py >/dev/null
git add script/multilingual-docs/
git commit -q -m "source change" || fail "场景B：源文件变更被阻止"
git show --stat HEAD | grep -q "CONTRIBUTING.md" && fail "场景B：生成文件不应入库"
git show --stat HEAD | grep -q "README.md" && fail "场景B：生成文件不应入库"
git show --stat HEAD | grep -q "CONTRIBUTING.yml" || fail "场景B：源文件未提交"
[ -z "$(git status --short)" ] || fail "场景B：提交后工作区不干净"
echo "✅ 场景B：源文件提交成功，生成文件不入库"

# ── 场景 C：无关改动 → 应直接放行 ──
echo "unrelated" > unrelated.txt
git add unrelated.txt
git commit -q -m "unrelated" || fail "场景C：无关改动被阻止"
echo "✅ 场景C：无关改动直接放行"

echo ""
echo "🎉 全部钩子测试通过"
