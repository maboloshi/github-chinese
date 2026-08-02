#!/usr/bin/env python3
"""
多语言文件管理：验证 + 生成，一站式。

用法：
    python script/manage_templates.py               # 验证通过后生成所有文件
    python script/manage_templates.py --check       # 仅验证，不生成
    python script/manage_templates.py --doc-dir DIR # 文档输出到指定根目录（供钩子比对）
"""

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Any


SCRIPT = Path(__file__).name


def _tr(text: str) -> str:
    """简体 → 繁体 提示文案（按终端文化设置）；非繁体环境原样返回。"""
    lang = (os.environ.get("LANG") or os.environ.get("LC_ALL") or "").lower()
    if not lang and sys.platform == "win32":
        import ctypes
        lang = "zh_hant" if ctypes.windll.kernel32.GetConsoleOutputCP() == 950 else "zh_hans"
    if not lang.replace("-", "_").startswith(("zh_tw", "zh_hk", "zh_mo", "zh_hant")):
        return text
    for s, t in (("通过", "通過"), ("个问题", "個問題"), ("文档", "文檔"),
                 ("不纯", "不純"), ("当前版本过低", "目前版本過低"), ("已跳过", "已跳過"),
                 ("文件", "檔案"), ("含简体字", "含簡體字"), ("含繁体字", "含繁體字"),
                 ("为空", "為空")):
        text = text.replace(s, t)
    return text


# ══════════════════════════════════════════════════════════════════════
#  验证
# ══════════════════════════════════════════════════════════════════════

def _check_node(node: Any, path: str, s2tw: Any, t2s: Any, missing: list[str], impure: list[str]) -> None:
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
            for val, converter, label in (  # type: ignore[assignment]
                (tw, s2tw, "TW"),
                (cn, t2s, "CN")
            ):
                # lang_links 中的语言名称按原语言呈现，跳过纯度检查
                if isinstance(val, str) and val and "lang_links" not in path:
                    if (text_only := re.sub(r"```.+?```", "", val, flags=re.DOTALL) if "```" in val else val) \
                       and (converted := converter(text_only)) != text_only \
                       and (diffs := sorted({f"{o}→{n}" for o, n in zip(text_only, converted) if o != n})):
                        kind = "简体" if label == "TW" else "繁体"
                        impure.append(f"{path}: {label} 含{kind}字 {diffs}")
            return
        for key, value in node.items():  # type: ignore[unknown-variable]
            _check_node(value, f"{path}.{key}", s2tw, t2s, missing, impure)
    elif isinstance(node, list):
        for i, item in enumerate(node):  # type: ignore[unknown-variable]
            _check_node(item, f"{path}[{i}]", s2tw, t2s, missing, impure)


# ══════════════════════════════════════════════════════════════════════
#  生成
# ══════════════════════════════════════════════════════════════════════

def _resolve(node: Any, lang: str) -> Any:
    """递归解析，提取指定语言的值。"""
    if isinstance(node, dict):
        if "CN" in node and "TW" in node and len(node) == 2:  # type: ignore[arg-type]
            return node[lang]  # type: ignore[return-value]
        return {key: _resolve(value, lang) for key, value in node.items()}  # type: ignore[unknown-variable]
    if isinstance(node, list):
        return [_resolve(item, lang) for item in node]  # type: ignore[unknown-variable]
    return node


def _generate_requirements(pyproject: Path = Path("pyproject.toml")) -> None:
    """从 pyproject.toml 的 dependencies 生成 script/requirements.txt（仅需标准库）。"""
    try:
        import tomllib  # type: ignore[import-not-found]
    except ModuleNotFoundError:
        print(_tr("⚠️ 需要 Python 3.11+ 才能生成 requirements.txt（当前版本过低），已跳过"), file=sys.stderr)
        return
    deps = tomllib.loads(pyproject.read_text(encoding="utf-8"))["project"]["dependencies"]
    out = Path("script") / "requirements.txt"
    out.write_text("".join(f"{d}\n" for d in deps), encoding="utf-8")
    print(f"✅ {pyproject.name} → {out}")


def _collect_headings(node: Any, depth: int = 0, out: list[tuple[int, str]] | None = None) -> list[tuple[int, str]]:
    """递归收集文档标题（## 与 ###，排除更深层级）。"""
    if out is None:
        out = []
    for key, value in node.items():  # type: ignore[unknown-variable]
        if isinstance(value, dict):
            first = next(iter(value), None)
            if first == "heading":
                level = depth + 2
                if level <= 3:
                    out.append((level, value["heading"]))
                body = {k: v for k, v in value.items() if k != "heading"}
                if body:
                    _collect_headings(body, depth + 1, out)
    return out


# 文档类源文件 → (Jinja 模板名, 输出文件名模式, 输出目录)
# {suffix} 占位："" = 简体, "_zh-TW" = 繁体
DOC_TEMPLATES: dict[str, tuple[str, str, Path]] = {
    "CONTRIBUTING.yml": ("CONTRIBUTING.md.j2", "CONTRIBUTING{suffix}.md", Path(".")),
    "README.yml": ("README.md.j2", "README{suffix}.md", Path(".")),
    "vscode-extension-README.yml": ("vscode-extension-README.md.j2", "README{suffix}.md", Path("vscode-extension")),
}


def main() -> None:
    # Windows 管道重定向时强制 UTF-8，避免 ✅ 等字符触发 GBK UnicodeEncodeError
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]

    parser = argparse.ArgumentParser(description="多语言文件管理：验证 + 生成")
    parser.add_argument(
        "multilingual_dir",
        nargs="?",
        default="script/multilingual-docs/",
        help="多语言源文件目录（默认: script/multilingual-docs/）"
    )
    parser.add_argument(
        "output_dir",
        nargs="?",
        default=".github/ISSUE_TEMPLATE/",
        help="模板输出目录（默认: .github/ISSUE_TEMPLATE/）"
    )
    parser.add_argument(
        "--doc-dir",
        default=None,
        help="文档输出根目录（默认：各模板的相对输出目录，如 . / vscode-extension）"
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="仅验证，不生成"
    )
    parser.add_argument(
        "--requirements",
        action="store_true",
        help="仅从 pyproject.toml 生成 script/requirements.txt（无需 pyyaml/opencc），供安装依赖前使用"
    )
    args = parser.parse_args()

    if args.requirements:
        _generate_requirements()
        return

    import yaml  # type: ignore[import-not-found]

    class _TemplateDumper(yaml.Dumper):  # type: ignore[misc]
        pass
    _TemplateDumper.add_representer(str, lambda d, data: d.represent_scalar(  # type: ignore[no-untyped-call]
        "tag:yaml.org,2002:str", data,
        style="|" if "\n" in data else '"' if data and (data[0] in "#&*!{%@`" or data[-1] in ":.}" or ":" in data) else None
    ))  # type: ignore[no-untyped-call]
    template_dumper = _TemplateDumper

    multilingual_dir, output_dir = Path(args.multilingual_dir), Path(args.output_dir)

    import opencc  # type: ignore
    s2tw, t2s = [opencc.OpenCC(c).convert for c in ("s2tw", "t2s")]  # type: ignore[no-untyped-call]
    yml_files = list(multilingual_dir.glob("*.yml"))
    if not yml_files:
        print(_tr(f"在 {multilingual_dir} 中未找到 .yml 文件。"), file=sys.stderr)
        sys.exit(1)

    all_missing: list[str] = []
    all_impure: list[str] = []

    for f in yml_files:
        with open(f, "r", encoding="utf-8") as fh:
            data = yaml.safe_load(fh)

        missing: list[str] = []
        impure: list[str] = []
        _check_node(data, f.name, s2tw, t2s, missing, impure)
        all_missing.extend(missing)
        all_impure.extend(impure)

        count = len(missing) + len(impure)
        if count:
            print(_tr(f"\n❌ {f.name}: {count} 个问题"))
            for items, emoji in (
                (missing, "⚠️"),
                (impure, "🈴")
            ):
                for item in items:
                    print(_tr(f"   {emoji}  {item}"))
        else:
            print(_tr(f"✅ {f.name}: 通过"))

    total = len(all_missing) + len(all_impure)
    if total:
        print(_tr(f"\n共 {total} 个问题（{len(all_missing)} 缺失, {len(all_impure)} 不纯）"))
        sys.exit(1)
    print(_tr("\n✅ 全部通过"))

    if args.check:
        return

    for f in sorted(multilingual_dir.glob("*.yml")):
        data = yaml.safe_load(f.read_text(encoding="utf-8"))
        doc = DOC_TEMPLATES.get(f.name)
        for lang, suffix in {"CN": "", "TW": "_zh-TW"}.items():
            resolved = _resolve(data, lang)
            comment = {
                "CN": f"由 {SCRIPT} 自动生成，请勿手动编辑。来源：{f.name}",
                "TW": f"由 {SCRIPT} 自動生成，請勿手動編輯。來源：{f.name}",
            }[lang]
            if doc:
                template_name, out_name, out_dir = doc
                base = Path(args.doc_dir) / out_dir if args.doc_dir else out_dir
                out = base / out_name.format(suffix=suffix)
                # 延迟导入：仅在渲染文档时才需要 jinja2，保证 --requirements/--check 仅用标准库
                from jinja2 import Environment, FileSystemLoader, StrictUndefined

                content = (
                    f"<!-- {comment} -->\n\n"
                    # Jinja2 环境：模板从多语言源文件目录加载，缺字段即报错
                    + Environment(
                        loader=FileSystemLoader(multilingual_dir),
                        undefined=StrictUndefined,
                    ).get_template(template_name).render(resolved=resolved)
                )
                # 自动生成目录树（插入到第一个二级标题之前）
                headings = _collect_headings(resolved)
                if headings:
                    toc_lines = ["<details>", f'<summary><kbd>{"目录树" if lang == "CN" else "目錄樹"}</kbd></summary>', "", "#### TOC"]
                    for level, title in headings:
                        indent = "    " * (level - 2)
                        slug = title.lower()
                        slug = re.sub(r"\s+", "-", slug)
                        slug = re.sub(r"[^\w-]+", "", slug)
                        slug = re.sub(r"-+", "-", slug)
                        toc_lines.append(f"{indent}- [{title}](#{slug})")
                    toc_lines += ["", "</details>"]
                    idx = content.find("\n## ")
                    if idx != -1:
                        content = content[: idx + 1] + "\n".join(toc_lines) + "\n\n" + content[idx + 1 :]
                out.parent.mkdir(parents=True, exist_ok=True)
                out.write_text(content, encoding="utf-8")
            else:
                out = output_dir / f"{f.stem}{suffix}.yml"
                out.parent.mkdir(parents=True, exist_ok=True)
                with open(out, "w", encoding="utf-8") as fh:
                    fh.write(f"# {comment}\n")
                    yaml.dump(resolved, fh, Dumper=template_dumper,
                              allow_unicode=True, default_flow_style=False,
                              sort_keys=False, width=120)
            print(f"✅ {f.name} → {out.name}")
        print(_tr(f"✅ {f.name}: {'文档' if doc else '模板'}生成完成"))

    _generate_requirements()


if __name__ == "__main__":
    main()
