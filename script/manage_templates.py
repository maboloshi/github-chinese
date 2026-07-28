#!/usr/bin/env python3
"""
多语言 Issue 模板管理：验证 + 生成，一站式。

用法：
    python script/manage_templates.py               # 验证通过后生成 CN/TW 模板
    python script/manage_templates.py --check       # 仅验证，不生成
"""

import argparse
import sys
from pathlib import Path
from typing import Any

import yaml


SCRIPT = Path(__file__).name


# ══════════════════════════════════════════════════════════════════════
#  验证
# ══════════════════════════════════════════════════════════════════════

def _get_converter() -> Any:
    import opencc  # type: ignore
    return opencc.OpenCC("s2tw")


def _validate(multilingual_dir: Path) -> bool:
    """检查多语言源文件的语言纯度。返回 True 表示通过。"""
    s2tw = _get_converter().convert
    yml_files = list(multilingual_dir.glob("*.yml"))
    if not yml_files:
        print(f"在 {multilingual_dir} 中未找到 .yml 文件。", file=sys.stderr)
        return False

    all_missing: list[str] = []
    all_impure: list[str] = []

    for f in yml_files:
        with open(f, "r", encoding="utf-8") as fh:
            data = yaml.safe_load(fh)

        missing: list[str] = []
        impure: list[str] = []
        _check_node(data, f.name, s2tw, missing, impure)
        all_missing.extend(missing)
        all_impure.extend(impure)

        count = len(missing) + len(impure)
        if count:
            print(f"\n❌ {f.name}: {count} 个问题")
            for items, emoji in (
                (missing, "⚠️"),
                (impure, "🈴")
            ):
                for item in items:
                    print(f"   {emoji}  {item}")
        else:
            print(f"✅ {f.name}: 通过")

    total = len(all_missing) + len(all_impure)
    if total:
        print(f"\n共 {total} 个问题（{len(all_missing)} 缺失, {len(all_impure)} 不纯）")
        return False
    print("\n✅ 全部通过")
    return True


def _check_node(node: Any, path: str, s2tw: Any, missing: list[str], impure: list[str]) -> None:
    """递归检查多语言源文件节点。"""
    if isinstance(node, dict):
        if "CN" in node and "TW" in node and len(node) == 2:  # type: ignore[arg-type]
            cn, tw = node["CN"], node["TW"]  # type: ignore[assignment]
            for val, label in (  # type: ignore[assignment]
                (cn, "CN"),
                (tw, "TW")
            ):
                if not val:
                    missing.append(f"{path}: {label} 为空")
            if isinstance(tw, str) and tw:
                converted = s2tw(tw)
                if converted != tw:
                    diffs = sorted({f"{o}→{n}" for o, n in zip(tw, converted) if o != n})
                    if diffs:
                        impure.append(f"{path}: TW 含简体字 {diffs}")
            return
        for key, value in node.items():  # type: ignore[unknown-variable]
            _check_node(value, f"{path}.{key}", s2tw, missing, impure)
    elif isinstance(node, list):
        for i, item in enumerate(node):  # type: ignore[unknown-variable]
            _check_node(item, f"{path}[{i}]", s2tw, missing, impure)


# ══════════════════════════════════════════════════════════════════════
#  生成
# ══════════════════════════════════════════════════════════════════════

def _str_representer(dumper: yaml.Dumper, data: str) -> Any:
    match data:
        case _ if "\n" in data: style = "|"
        case _ if data and (data[0] in "#&*!{%@`" or data[-1] in ":.}" or ":" in data): style = '"'
        case _: style = None
    return dumper.represent_scalar("tag:yaml.org,2002:str", data, style=style)  # type: ignore[no-untyped-call]


class _TemplateDumper(yaml.Dumper):
    pass


_TemplateDumper.add_representer(str, _str_representer)


def _dump(node: Any, fh: Any) -> None:
    yaml.dump(node, fh, Dumper=_TemplateDumper, allow_unicode=True,
              default_flow_style=False, sort_keys=False, width=120)


def _resolve(node: Any, lang: str) -> Any:
    """递归解析，提取指定语言的值。"""
    if isinstance(node, dict):
        if "CN" in node and "TW" in node and len(node) == 2:  # type: ignore[arg-type]
            return node[lang]  # type: ignore[return-value]
        return {key: _resolve(value, lang) for key, value in node.items()}  # type: ignore[unknown-variable]
    if isinstance(node, list):
        return [_resolve(item, lang) for item in node]  # type: ignore[unknown-variable]
    return node


def _generate(multilingual_dir: Path, output_dir: Path) -> None:
    """从多语言源文件生成 CN/TW 模板文件。"""
    yml_files = list(multilingual_dir.glob("*.yml"))
    generated = 0
    for f in yml_files:
        with open(f, "r", encoding="utf-8") as fh:
            data = yaml.safe_load(fh)
        stem = f.stem
        for lang, suffix in {"CN": "简体中文", "TW": "繁體中文"}.items():
            out_path = output_dir / f"{stem}-{suffix}-.yml"
            with open(out_path, "w", encoding="utf-8") as fh:
                fh.write(f"# 由 {SCRIPT} 自动生成，请勿手动编辑。来源：{f.name}\n")
                _dump(_resolve(data, lang), fh)
            print(f"✅ {f.name} → {out_path.name}")
            generated += 1
    print(f"\n共生成 {generated} 个模板文件。")


# ══════════════════════════════════════════════════════════════════════
#  主入口
# ══════════════════════════════════════════════════════════════════════

def main() -> None:
    parser = argparse.ArgumentParser(description="多语言 Issue 模板管理：验证 + 生成")
    parser.add_argument(
        "multilingual_dir",
        nargs="?",
        default="script/multilingual-issue-templates/",
        help="多语言源文件目录（默认: script/multilingual-issue-templates/）"
    )
    parser.add_argument(
        "output_dir",
        nargs="?",
        default=".github/ISSUE_TEMPLATE/",
        help="输出目录（默认: .github/ISSUE_TEMPLATE/）"
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="仅验证，不生成模板"
    )
    args = parser.parse_args()

    multilingual_dir, output_dir = Path(args.multilingual_dir), Path(args.output_dir)

    if not _validate(multilingual_dir):
        sys.exit(1)

    if args.check:
        return

    _generate(multilingual_dir, output_dir)


if __name__ == "__main__":
    main()
