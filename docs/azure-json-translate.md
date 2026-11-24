# Azure JSON 翻译 Action

此 Action 使用 Azure Translator 将 JSON 文件中的英文字符串值翻译为简体中文（`zh-Hans`）；JSON 键、数组/对象结构和常见插值占位符（例如 `{name}`、`{{name}}`、`${count}`、`%s`、`%(name)s` 和 `:name`）会保留。非字符串值不会发送给翻译服务。

## 配置 Azure Translator

在 Azure 创建 Translator 资源，并在仓库的 **Settings → Secrets and variables → Actions** 中添加：

- Secret `AZURE_TRANSLATOR_KEY`：Translator 资源的密钥。
- Repository variable `AZURE_TRANSLATOR_REGION`：资源区域，例如 `eastus`。

不要把密钥写入工作流文件、仓库变量或 JSON 文件。

## 在工作流中使用

仓库同时提供可手动运行的工作流：在 **Actions → Azure JSON to Simplified Chinese → Run workflow** 中填写输入和输出 JSON 路径；完成后可从 workflow run 下载 `zh-Hans-localization` 构件。运行前需在 **Settings → Secrets and variables → Actions** 配置上述 Secret 和变量。

若要在其他仓库中复用该 Action，可使用以下工作流：

```yaml
name: Translate resources

on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: maboloshi/github-chinese/.github/actions/azure-json-translate@gh-pages
        with:
          api-key: ${{ secrets.AZURE_TRANSLATOR_KEY }}
          region: ${{ vars.AZURE_TRANSLATOR_REGION }}
          input-file: locales/en.json
          output-file: locales/zh-Hans.json
          source-language: en
      - uses: actions/upload-artifact@v7
        with:
          name: zh-Hans-localization
          path: locales/zh-Hans.json
```

`input-file` 和 `output-file` 相对于调用工作流的仓库工作区；目标目录不存在时会自动创建。也可以传入绝对路径。Action 会将输出写为 2 空格缩进并以换行结尾的 JSON，不会自动提交或发布文件。

`endpoint` 可选，默认为 `https://api.cognitive.microsofttranslator.com`；自定义端点必须使用 HTTPS。`source-language` 默认为 `en`。翻译请求按 Azure 限制分批；遇到限流或暂时性服务错误会有限重试，其他错误会使 Action 失败并显示诊断信息。
