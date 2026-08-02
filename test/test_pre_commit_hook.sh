#!/usr/bin/env bash
# 测试 .githooks/pre-commit 钩子行为
#
# 用法：bash test/test_pre_commit_hook.sh
# 前置条件：`python` 可执行且已安装依赖（pyyaml、Jinja2、opencc-python-reimplemented）
#
# 场景：
#   A. 手动修改生成文件（源文件未改）→ 应阻止提交并打印差异
#      覆盖：14 类逻辑块（标题/段落/引用/alert/列表/表格/链接定义/HTML 等）
#      × 行首/行中/行尾 三种位置 + 列表/引用/alert 的空行断块
#   B. 修改源文件 → 应自动生成并纳入暂存、提交成功
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

# 复制钩子与多语言源文件
mkdir -p .githooks script/multilingual-docs .github/ISSUE_TEMPLATE vscode-extension
cp "$ROOT/.githooks/pre-commit" .githooks/pre-commit
chmod +x .githooks/pre-commit
cp "$ROOT/pyproject.toml" pyproject.toml
cp "$ROOT/script/manage_templates.py" script/manage_templates.py
cp "$ROOT/script/multilingual-docs/"./* script/multilingual-docs/

# 生成基准文档并作为首个提交（后续场景以它为 HEAD 基准）
python script/manage_templates.py >/dev/null
git add -A
git commit -q -m "baseline"

fail() { echo "❌ FAIL: $1"; exit 1; }

# ── 断言：对 README.md 做一次手动修改后提交，应被阻止并打印差异 ──
assert_blocked() {
    local desc="$1"
    git add README.md
    local before; before="$(git rev-parse HEAD)"
    local output; output="$(git commit -m "manual edit" 2>&1 || true)"
    [ "$(git rev-parse HEAD)" = "$before" ] || fail "场景A($desc)：手动修改未被阻止"
    echo "$output" | grep -q "差异如下" || fail "场景A($desc)：未打印与自动生成的差异"
    echo "$output" | grep -q "请通过源文件修改" || fail "场景A($desc)：未提示通过源文件修改"
    git reset -q --hard
    echo "✅ 场景A($desc)：被阻止并打印差异"
}

# ── 场景 A：手动修改生成文件 → 均应被阻止 ──
# 动态检测：基于 GFM 块元素规则（spec §4 叶块 / §5 容器块）对每行分类，
# 自动发现文档中实际存在的块类型，对每种类型施加 行首/行中/行尾 修改，
# 并对列表/引用/alert 等容器块做空行断开（文档里不存在则自动跳过）。
mkdir -p manual_vars
python - <<'PY'
import pathlib, re

lines = pathlib.Path("README.md").read_text(encoding="utf-8").split("\n")
variants = []

def add(desc, new_lines):
    variants.append((desc, "\n".join(new_lines)))

def mutate(idx, kind):
    L = lines[:]
    if kind == "prefix":
        L[idx] = "MANUAL " + L[idx]
    elif kind == "infix":
        mid = len(L[idx]) // 2
        L[idx] = L[idx][:mid] + " MANUAL " + L[idx][mid:]
    else:  # suffix
        L[idx] = L[idx] + " MANUAL"
    return L

def classify(line):
    """基于 GFM 块元素规范（spec §4 叶块 / §5 容器块）对单行分类。"""
    s = line.strip()
    if not s:
        return None
    if s.startswith("<!--"):
        return "HTML注释"
    if s.startswith("<"):
        return "HTML块"
    m = re.match(r"^(#{1,6})\s", line)
    if m:
        return "标题H%d" % len(m.group(1))
    if s.startswith("> [!") or s.startswith(">!["):
        return "alert块"
    if s.startswith(">"):
        return "引用块"
    if re.match(r"^[-*_]{3,}\s*$", s):
        return "分隔线"
    if re.match(r"^\d+[.)]\s", s):
        return "有序列表"
    if re.match(r"^[-+*]\s", s):
        return "无序列表"
    if s.startswith("|"):
        return "表格行"
    if re.match(r"^\[[^\]]+\]:\s", s):
        return "链接定义"
    if s.startswith("!["):
        return "图片"
    if s.startswith("[!["):
        return "徽章"
    if s.startswith("```") or s.startswith("~~~"):
        return "围栏代码块"
    return "段落"

# 动态收集文档中实际出现的块类型（首次出现的行作为该类型代表行）
seen = []
for i, line in enumerate(lines):
    t = classify(line)
    if t is None:
        continue
    if all(t != x[0] for x in seen):
        seen.append((t, i))

# 每种存在的类型：行首/行中/行尾 修改
for t, idx in seen:
    add("行首插入·" + t, mutate(idx, "prefix"))
    add("行中插入·" + t, mutate(idx, "infix"))
    add("行尾追加·" + t, mutate(idx, "suffix"))

# 容器块（列表/引用/alert）空行断开：同类型连续行块中间插入空行
def blank_mid(name, is_start, is_same):
    i = 0
    while True:
        start = None
        for j in range(i, len(lines)):
            if is_start(lines[j]):
                start = j
                break
        if start is None:
            return
        j = start
        while j + 1 < len(lines) and is_same(lines[j + 1]):
            j += 1
        if j - start >= 1:
            mid = start + (j - start) // 2
            L = lines[:]
            L.insert(mid + 1, "")
            add("空行断开·" + name, L)
            return
        i = j + 1

present = {t for t, _ in seen}
if "无序列表" in present:
    blank_mid("无序列表", lambda l: classify(l) == "无序列表", lambda l: classify(l) == "无序列表")
if "有序列表" in present:
    blank_mid("有序列表", lambda l: classify(l) == "有序列表", lambda l: classify(l) == "有序列表")
if "引用块" in present:
    blank_mid("引用块", lambda l: classify(l) == "引用块", lambda l: classify(l) == "引用块")
if "alert块" in present:
    blank_mid("alert块", lambda l: classify(l) == "alert块", lambda l: l.strip().startswith(">"))

out = pathlib.Path("manual_vars")
out.mkdir(exist_ok=True)
for i, (desc, new) in enumerate(variants, 1):
    (out / ("d" + str(i))).write_text(desc, encoding="utf-8")
    (out / ("b" + str(i))).write_text(new, encoding="utf-8")
print(len(variants))
PY
count=$(ls manual_vars/b* 2>/dev/null | wc -l)
i=1
while [ "$i" -le "$count" ]; do
    desc=$(cat "manual_vars/d$i")
    cp "manual_vars/b$i" README.md
    assert_blocked "$desc"
    i=$((i + 1))
done
rm -rf manual_vars

# ── 场景 B：修改源文件 → 应自动生成并纳入暂存、提交成功 ──
sed -i 's/CN: 贡献指南/CN: 贡献指南钩子测试/; s/TW: 貢獻指南/TW: 貢獻指南鉤子測試/' \
    script/multilingual-docs/CONTRIBUTING.yml
git add script/multilingual-docs/CONTRIBUTING.yml
git commit -q -m "source change" || fail "场景B：源文件变更被阻止"
git show --stat HEAD | grep -q "CONTRIBUTING.md" || fail "场景B：生成的 CONTRIBUTING.md 未被自动纳入"
[ -z "$(git status --short)" ] || fail "场景B：提交后工作区不干净"
echo "✅ 场景B：源文件变更自动生成并纳入暂存"

# ── 场景 C：无关改动 → 应直接放行 ──
echo "unrelated" > unrelated.txt
git add unrelated.txt
git commit -q -m "unrelated" || fail "场景C：无关改动被阻止"
echo "✅ 场景C：无关改动直接放行"

echo ""
echo "🎉 全部钩子测试通过"
