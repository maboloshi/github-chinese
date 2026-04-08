name: Bug 提交（简体中文）
description: 提交 BUG
labels: bug

body:
- type: markdown
  attributes:
    value: "### 欢迎！"
- type: markdown
  attributes:
    value: |
      感谢您提交议题！请补充以下内容，以便我们能更好地协助您。
      提交议题前确保您已阅读[常见问题（FAQ）](https://github.com/maboloshi/github-chinese/issues/493)。
- type: textarea
  id: description
  attributes:
    label: 问题/建议
    description: 请描述你遇到的问题/提出的建议。
  validations:
    required: true
- type: textarea
  id: steps
  attributes:
    label: 步骤
    description: 请逐步描述你遇到的问题，并带上测试链接（如有）。
  validations:
    required: true
- type: textarea
  id: expectation
  attributes:
    label: 预期
    description: 请描述你对本插件行为的预期。
  validations:
    required: true
- type: textarea
  id: realization
  attributes:
    label: 实际
    description: 请描述本插件的实际行为。
  validations:
    required: true
- type: textarea
  id: evidence
  attributes:
    label: 附件
    description: 请提供相关截图或附件（如有）。
  validations:
    required: false
- type: dropdown
  id: browser-name
  attributes:
    label: 浏览器名称
    description: 请选择运行本插件的浏览器的名称。
    options:
      - Microsoft Edge
      - Google Chrome
      - Others
  validations:
    required: true
- type: input
  id: browser-version
  attributes:
    label: 浏览器版本
    description: |
      请填入运行本插件的浏览器的版本。
      [Microsoft Edge 版本](https://support.microsoft.com/zh-cn/microsoft-edge/c726bee8-c42e-e472-e954-4cf5123497eb)
      [Google Chrome 版本](chrome://settings/help)
    placeholder: 版本 146.0.3856.62 (正式版本) (arm64)
  validations:
    required: true
- type: dropdown
  id: script-manager-name
  attributes:
    label: 脚本管理器名称
    description: 请选择管理本插件的脚本管理器的名称。
    options:
      - 篡改猴（Tampermonkey）
      - Others
  validations:
    required: true
- type: input
  id: script-manager-version
  attributes:
    label: 脚本管理器版本
    description: |
      请填入管理本插件的脚本管理器的版本。
      [Microsoft Edge 扩展](https://support.microsoft.com/zh-cn/topic/a3ae1ebb-8e7f-49df-a5f8-8c3f56c8078b)
    placeholder: "5.4.1"
  validations:
    required: true
- type: input
  id: plugin-version
  attributes:
    label: 插件版本
    description: |
      请填入 GitHub 中文化插件的版本。
      见 [GitHub 中文化插件](extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=49f369f3-16e7-423f-86d9-1aa23aa2fd1c)源码中 `@version` 的值（不再接受 1.9.2 版本反馈）。
    placeholder: "1.9.3"
  validations:
    required: true
