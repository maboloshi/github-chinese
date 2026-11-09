#!/usr/bin/env python3
"""script/check_issue_template_purity.py 的单元测试。

覆盖场景：
- 纯简/繁模板通过；
- 繁体模板混入简体字、简体模板混入繁体字时报错；
- 代码块与行内代码中的字形不参与检查；
- 未登记的模板文件、缺失的已登记模板都会失败；
- 仓库内真实模板必须通过检查。
"""

from __future__ import annotations

import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "script" / "check_issue_template_purity.py"

CN_NAME = "bug-提交-简体中文-.yml"
TW_NAME = "bug-提交-繁體中文-.yml"


def _template(name: str, value: str) -> str:
    """构造一个最小的议题模板 YAML。

    块标量的内容必须比 `value:` 键缩进更深，故用 6 空格。
    """
    body = (
        "    value: |\n" + "\n".join(f"      {line}" for line in value.splitlines()) + "\n"
        if "\n" in value
        else f"    value: {value}\n"
    )
    return f"name: {name}\ndescription: 提交 BUG\nbody:\n- type: markdown\n  attributes:\n{body}"


def _cn(value: str = "欢迎") -> str:
    return _template("Bug 提交（简体中文）", value)


def _tw(value: str = "歡迎") -> str:
    return _template("Bug 提交（繁體中文）", value)


def _output(result: "subprocess.CompletedProcess[str]") -> str:
    """容错拼接子进程输出：读取线程解码失败时 stdout/stderr 可能为 None。"""
    return (result.stdout or "") + (result.stderr or "")


class PurityCheckTest(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)

    def tearDown(self) -> None:
        self._tmp.cleanup()

    def run_check(self, templates: dict[str, str], *args: str) -> "subprocess.CompletedProcess[str]":
        """把脚本复制进临时仓库骨架后运行，模拟真实目录结构。"""
        (self.root / "script").mkdir(parents=True, exist_ok=True)
        shutil.copy2(SCRIPT, self.root / "script" / SCRIPT.name)
        template_dir = self.root / ".github" / "ISSUE_TEMPLATE"
        template_dir.mkdir(parents=True, exist_ok=True)
        for filename, content in templates.items():
            (template_dir / filename).write_text(content, encoding="utf-8")
        return subprocess.run(
            [sys.executable, str(self.root / "script" / SCRIPT.name), *args],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )

    def test_pure_templates_pass(self) -> None:
        result = self.run_check({CN_NAME: _cn(), TW_NAME: _tw()})
        self.assertEqual(0, result.returncode, _output(result))

    def test_simplified_char_in_traditional_template_is_reported(self) -> None:
        result = self.run_check({CN_NAME: _cn(), TW_NAME: _tw("步骤")})
        self.assertEqual(1, result.returncode, _output(result))
        self.assertIn("骤→驟", _output(result))
        self.assertIn(TW_NAME, _output(result))

    def test_traditional_char_in_simplified_template_is_reported(self) -> None:
        result = self.run_check({CN_NAME: _cn("步驟"), TW_NAME: _tw()})
        self.assertEqual(1, result.returncode, _output(result))
        self.assertIn("驟→骤", _output(result))
        self.assertIn(CN_NAME, _output(result))

    def test_code_block_and_code_span_are_ignored(self) -> None:
        result = self.run_check({
            CN_NAME: _cn("示例：\n\n```\n步驟與歡迎\n```\n\n还有 `繁體` 这个词\n\n欢迎"),
            TW_NAME: _tw(),
        })
        self.assertEqual(0, result.returncode, _output(result))

    def test_taiwan_vocabulary_is_not_reported(self) -> None:
        """合法的台湾用语（插件/腳本/設定…）属于词汇差异，不算字形混用。"""
        value = "本插件支援繁體，請在腳本管理員中設定"
        result = self.run_check({CN_NAME: _cn(), TW_NAME: _tw(value)})
        self.assertEqual(0, result.returncode, _output(result))

    def test_yaml_extension_is_rejected(self) -> None:
        """模板目录下只认 .yml；.yaml 会被 GitHub 忽略，应报错而非静默跳过。"""
        result = self.run_check({
            CN_NAME: _cn(),
            TW_NAME: _tw(),
            "bug-提交-简体中文-.yaml": _cn(),
        })
        self.assertEqual(1, result.returncode, _output(result))
        self.assertIn(".yaml", _output(result))

    def test_unregistered_template_is_rejected(self) -> None:
        result = self.run_check({
            CN_NAME: _cn(),
            TW_NAME: _tw(),
            "feature-request.yml": _template("功能请求", "欢迎大家"),
        })
        self.assertEqual(1, result.returncode, _output(result))
        self.assertIn("未登记", _output(result))

    def test_missing_registered_template_is_rejected(self) -> None:
        result = self.run_check({CN_NAME: _cn()})
        self.assertEqual(1, result.returncode, _output(result))
        self.assertIn(TW_NAME, _output(result))

    def test_repo_templates_pass(self) -> None:
        """仓库内真实模板必须通过检查（回归保护）。"""
        result = subprocess.run(
            [sys.executable, str(SCRIPT)],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        self.assertEqual(0, result.returncode, _output(result))


if __name__ == "__main__":
    unittest.main()
