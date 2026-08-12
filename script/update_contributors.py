#!/usr/bin/env python3
"""更新 README.yml 的贡献者墙（thanks.contributors.list 共享块）。

由 .github/workflows/update_contributors_images.yml 调用。
用法：printf '%s' "$HTML_LIST" | python script/update_contributors.py

HTML_LIST 由 jaywcjlove/github-action-contributors 输出（不含 AUTO_GENERATED 标记），
本脚本将其嵌入 <!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT--> 标记之间写入 YAML 源。
"""
import sys
from pathlib import Path

README_YML = Path("script/multilingual-docs/README.yml")
MARKER = "    list: |-"

# Windows 本地调试时强制 UTF-8，避免罕见汉字在 GBK 管道下解码出错
for stream in (sys.stdin, sys.stdout):
    if hasattr(stream, "reconfigure"):
        stream.reconfigure(encoding="utf-8")  # type: ignore[union-attr]

html = sys.stdin.read().strip().replace("\\n", "\n")
if not html:
    print("⚠️ 空 HTML 列表，跳过", file=sys.stderr)
    sys.exit(1)

lines = README_YML.read_text(encoding="utf-8").splitlines()

try:
    start = next(i for i, l in enumerate(lines) if l == MARKER)
except StopIteration:
    print("❌ 未找到贡献者墙 list 字段", file=sys.stderr)
    sys.exit(1)

content_indent = " " * (len(MARKER) - len(MARKER.lstrip()) + 2)  # 6 空格

new_lines = lines[: start + 1]
new_lines.append(content_indent + "<!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT-->")
for line in html.splitlines():
    new_lines.append(content_indent + line if line else "")
new_lines.append(content_indent + "<!--AUTO_GENERATED_PLEASE_DONT_DELETE_IT-END-->")

# 跳过旧 list 块内容（缩进 >= 6 的空格开头，或空行）
i = start + 1
while i < len(lines) and (lines[i].startswith(content_indent) or lines[i] == ""):
    i += 1
new_lines.extend(lines[i:])

data = "\n".join(new_lines) + "\n"
# 写前先验证可编码，避免异常导致目标文件被截断为空
try:
    data.encode("utf-8")
except UnicodeEncodeError as exc:
    print(f"❌ 输出含无法编码的字符，未写入：{exc}", file=sys.stderr)
    sys.exit(1)

README_YML.write_text(data, encoding="utf-8")
print(f"✅ 已更新 {README_YML}")
