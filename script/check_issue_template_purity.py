#!/usr/bin/env python3
"""议题模板语种纯度检查。

简体模板中不得混入繁体字，繁体模板中不得混入简体字（用 OpenCC 转换比对字形）。

用法：
    python script/check_issue_template_purity.py            # 检查全部已登记模板
    python script/check_issue_template_purity.py 文件名...  # 仅检查指定模板
"""

from __future__ import annotations

import re
import sys
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Callable, Iterator

try:
    import opencc
    import yaml
except ModuleNotFoundError as exc:  # 缺依赖时给出可执行的提示
    raise SystemExit(
        f"缺少依赖 {exc.name}，请先安装：pip install pyyaml opencc-python-reimplemented"
    ) from exc

TEMPLATE_DIR = (
    Path(__file__).resolve().parents[1] / ".github" / "ISSUE_TEMPLATE"
)

# 模板文件 → 期望语种（新增模板需在此登记）
TEMPLATES: dict[str, str] = {
    "bug-提交-简体中文-.yml": "CN",
    "bug-提交-繁體中文-.yml": "TW",
}


def _walk_strings(node: Any, path: str = "") -> Iterator[tuple[str, str]]:
    """递归产出 (字段路径, 字符串值)。"""
    if isinstance(node, dict):
        for key, value in node.items():
            yield from _walk_strings(
                value, f"{path}.{key}" if path else str(key)
            )
    elif isinstance(node, list):
        for index, item in enumerate(node):
            yield from _walk_strings(item, f"{path}[{index}]")
    elif isinstance(node, str) and node:
        yield path, node


def main(argv: list[str]) -> int:
    # Windows 管道重定向时强制 UTF-8，避免中文输出触发 UnicodeEncodeError
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")

    # 只比较字形：opencc-python-reimplemented 的 s2tw 不含台湾词汇表；
    # 带词汇表的 s2twp 会把「插件」改成「外掛」、「腳本」改成「指令碼」，
    # 那是词汇差异而非字形混用，会造成误报（见 test_taiwan_vocabulary_is_not_reported）。
    converter: dict[str, Callable[[str], str]] = {
        "CN": opencc.OpenCC("t2s").convert,
        "TW": opencc.OpenCC("s2tw").convert,
    }

    if argv:
        names = [Path(arg).name for arg in argv]
    else:
        # GitHub 只识别 .yml；.yaml 会被静默忽略，故显式报错而非跳过
        yaml_named = sorted(p.name for p in TEMPLATE_DIR.glob("*.yaml"))
        if yaml_named:
            print(
                f"❌ 模板目录下存在 .yaml 文件：{'、'.join(yaml_named)}",
                file=sys.stderr,
            )
            print("   GitHub 只识别 .yml，请将这些文件改名为 .yml。", file=sys.stderr)
            return 1
        found = sorted(p.name for p in TEMPLATE_DIR.glob("*.yml"))
        # 议题表单必须是 .yml（config.yml 亦然），.yaml 会被 GitHub 忽略
        odd = sorted(
            p.name for p in TEMPLATE_DIR.glob("*.y*ml") if p.suffix != ".yml"
        )
        if odd:
            print(
                f"❌ 议题表单必须是 .yml（.yaml 不会被 GitHub 读取）：{'、'.join(odd)}",
                file=sys.stderr,
            )
            return 1
        unregistered = [
            name
            for name in found
            if name not in TEMPLATES and name != "config.yml"
        ]
        if unregistered:
            print(f"❌ 发现未登记的模板：{'、'.join(unregistered)}", file=sys.stderr)
            print(
                "   请在本脚本的 TEMPLATES 中登记其语种（config.yml 无需登记）。",
                file=sys.stderr,
            )
            return 1
        missing = [name for name in TEMPLATES if name not in found]
        if missing:
            print(f"❌ 已登记的模板不存在：{'、'.join(missing)}", file=sys.stderr)
            print(
                "   请确认模板文件路径，或从本脚本的 TEMPLATES 中移除对应条目。",
                file=sys.stderr,
            )
            return 1
        names = [name for name in found if name in TEMPLATES]

    failed = False
    for name in names:
        lang = TEMPLATES.get(name)
        path = TEMPLATE_DIR / name
        if lang is None:
            print(f"❌ 未登记的模板：{name}", file=sys.stderr)
            failed = True
        elif not path.is_file():
            print(f"❌ 模板文件不存在：{path}", file=sys.stderr)
            failed = True
        else:
            # 收集纯度问题（字段路径 + 改动明细）
            issues: list[str] = []
            for field, value in _walk_strings(
                yaml.safe_load(path.read_text(encoding="utf-8"))
            ):
                # 代码块与行内代码不参与检查（内容可能保留原文形式）
                text = re.sub(r"```.*?```", "", value, flags=re.DOTALL)
                text = re.sub(r"`[^`]+`", "", text)
                converted = converter[lang](text)
                # 列出转换前后被改动的字（形如 x→y）
                changes: list[str] = []
                for tag, i1, i2, j1, j2 in SequenceMatcher(
                    None, text, converted, autojunk=False
                ).get_opcodes():
                    if tag == "replace" and i2 - i1 == j2 - j1:
                        changes.extend(
                            f"{a}→{b}"
                            for a, b in zip(text[i1:i2], converted[j1:j2])
                            if a != b
                        )
                    elif tag != "equal":
                        changes.append(
                            f"{text[i1:i2] or ''}→{converted[j1:j2] or ''}"
                        )
                if changes:
                    issues.append(
                        f"{field}："
                        + "、".join(changes[:8])
                        + (f" 等共 {len(changes)} 处" if len(changes) > 8 else "")
                    )
            if issues:
                failed = True
                kind = "繁体" if lang == "CN" else "简体"
                print(f"❌ {name}：混入{kind}字（{len(issues)} 个字段）")
                for issue in issues:
                    print(f"   🈴 {issue}")
            else:
                print(f"✅ {name}：通过")

    if failed:
        print("\n提示：请把混入的字改回本模板对应的字形。")
        return 1
    print("\n✅ 议题模板语种纯度检查通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
