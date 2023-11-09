/*******************************************************************************

    locals.js - 搭配用户脚本插件`GitHub 中文化插件`的页面匹配规则, 翻译忽略规则,
                词条库文件
    Copyright (C) 2016-2021 楼教主 (https://github.com/52cik)
    Copyright (C) 2021-当前 buiawpkgew1 (https://github.com/buiawpkgew1)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Home: https://github.com/buiawpkgew1/github-chinese
*/
var I18N = {};

I18N.conf = {
    /**
     * 要翻译的页面正则(不含仓库页)
     *
     * 2021-10-07 11:53:34
     * GitHub 网站更新 调整 Class 过滤规则
     * 且过滤 Class 并不是总是生效，增加 PathName 规则补充
     */
    rePageClass: /\b(page-(profile|new-repo|create-org)|session-authentication)\b/,

    /**
     * 匹配 pathname 页面的正则
     *
     * 注册页面 /signup
     * 登录二步验证 /login/oauth
     * 登录页面 /login
     * 密码重置 /password_reset
     * 组织页面 /orgs
     * 探索页面 /explore
     * 订阅页面 /notifications/subscriptions
     * 通知页面 /notifications
     * 关注页面 /watching
     * 星标页面 /stars
     * 议题页面 /issues
     * 拉取请求 /pulls
     * 搜索页面 /search
     * 趋势页面 /trending
     * 展示页面 /showcases
     * 导入仓库 /new/import
     * ...
     */
    rePagePath: /^\/($|dashboard|signup|login\/oauth|login|logout|sessions?|password_reset|orgs|explore|topics|notifications\/subscriptions|notifications|watching|stars|issues|pulls|search|trending|showcases|new\/(import|project)|new|import|settings\/(profile|admin|appearance|accessibility|notifications|billing|emails|security_analysis|security-log|security|auth|sessions|keys|ssh|gpg|organizations|enterprises|blocked_users|interaction_limits|code_review_limits|repositories|codespaces|deleted_repositories|packages|copilot|pages|replies|installations|apps\/authorizations|reminders|sponsors-log|apps\/new|apps|(?:personal-access-|)tokens|developers|applications\/new|applications)|settings|installations\/new|marketplace|apps|account\/organizations\/new|projects|account\/billing\/history|redeem|discussions|events|collections|sponsors\/explore)/,

    // 仓库路径
    rePagePathRepo: /^\/[^\/]+\/[^\/]+\/(issues|pull|watchers|stargazers|new|edit|delete|upload|find|wiki|branches|discussions|activity|releases|packages|tags|labels|milestones|compare|commit|blob|actions|runs|deployments|security|pulse|community|forks|fork|graphs\/(contributors|community|traffic|commit-activity|code-frequency)|network$|network\/(dependencies|dependents|updates|members)|settings\/(access|code_review_limits|interaction_limits|branches|branch_protection_rules|tag_protection|rules|actions|hooks|environments|codespaces|pages|security_analysis|dependabot_rules|keys|secrets|variables|installations|notifications)|settings|transfer|projects\/new|pkgs)/,

    // 组织路径
    rePagePathOrg: /^\/(?:orgs|organizations)\/[^\/]+\/(repositories|discussions|projects|packages|teams|new-team|people|outside-collaborators|pending_collaborators|dashboard|billing_managers\/new|settings\/(profile|billing|roles|member_privileges|teams|import-export|blocked_users|interaction_limits|code_review_limits|moderators|repository-defaults|rules|codespaces|copilot|actions|hooks|discussions|packages|pages|projects|security_analysis|security|dependabot_rules|domains|secrets|variables|oauth_application_policy|installations|personal-access-token|reminders|sponsors-log|audit-log|deleted_repositories|applications\/new|applications|apps\/new|apps|publisher)|topics|domain\/new|audit-log\/event_settings|billing\/history)/,

    /**
     * 忽略区域的 class 正则
     *
     * 代码编辑器 内容 代码高亮 CodeMirror
     * 代码编辑器 最小单元 cm-line
     * 代码高亮 blob-code
     * 仓库名和用户名 repo-and-owner (已知出现在：应用安装授权页和设置页 选定仓库)
     * 文件,目录位置栏 |js-path-segment|final-path
     * 文件列表 files js-navigation-container js-active-navigation-container
     * 评论内容等 js-comment-body
     * 评论预览 js-preview-body
     * 评论编辑区域 comment-form-textarea
     * 文件搜索模式 js-tree-finder-virtual-filter
     * 仓库文件列表 js-navigation-open Link--primary
     * 快捷键 按键 js-modifier-key
     * 洞察-->流量-->热门内容列表 capped-list-label
     * realease 页面 描述主体 markdown-body my-3
     * 仓库页 仓库描述 f4 my-3
     * 提交的用户名 commit-author
     * 搜索页 搜索结果 search-match
     * 追溯 视图 代码 react-code-text
     * tree 视图 文件名 react-directory-filename-column 提交信息 react-directory-commit-message
     * 代码差异页面 pl-c1
     */
    reIgnoreClass: /(cm-line|CodeMirror|blob-code|highlight-.*|repo-and-owner|js-path-segment|final-path|files js-navigation-container|js-comment-body|js-preview-body|comment-form-textarea|markdown-title|js-tree-finder-virtual-filter|js-navigation-open Link--primary|js-modifier-key|capped-list-label|blob-code blob-code-inner js-file-line|pl-token|Link--primary no-underline text-bold|markdown-body my-3|f4 my-3|commit-author|search-match|react-directory-filename-column|react-directory-commit-message|react-code-text|pl-c1)/,

    /**
     * 忽略区域的 itemprop 属性正则
     * name 列表页 仓库名
     * author 仓库页 作者名称
     * additionalName 个人主页 附加名称
     */
    reIgnoreItemprop: /(name|author|additionalName)/,

    /**
     * 忽略区域的 特定元素id 正则
     * offset /blob页面 符号-->引用
     * fix repo详情页文件路径breadcrumb
     */
    reIgnoreId: ['readme', 'offset', 'breadcrumb', 'file-name-id'],

    /**
     * 忽略区域的 标签 正则
     * /i 规则不区分大小写
     */
    reIgnoreTag: ['CODE', 'SCRIPT', 'STYLE', 'LINK', 'IMG', 'MARKED-TEXT', 'PRE', 'KBD'],
    // marked-text --> 文件搜索模式/<user-name>/<repo-name>/find/<branch> 文件列表条目
    // ^script$ --> 避免勿过滤 notifications-list-subscription-form
    // ^pre$ --> 避免勿过滤
};

I18N.zh = {};

I18N.zh["title"] = { // 标题翻译
    "static": { // 静态翻译
        "Sign in to GitHub · GitHub": "登录 GitHub · GitHub",
        "Join GitHub · GitHub": "加入 GitHub · GitHub",
        "Forgot your password? · GitHub": "忘记您的密码了吗？· GitHub",
        "Forgot your password?": "忘记您的密码了吗？",
        "GitHub · Where software is built": "GitHub - 软件构建的地方",
        "Create a New Repository": "创建新仓库",
        "Import a Repository": "导入仓库",
        "New Project": "创建项目",
        "Your Repositories": "我的仓库",
        "Your Projects": "我的项目",
        "Your Packages": "我的软件包",
        "Your Stars": "我的星标页面",
        "Your Profile": "个人资料",
        "Account settings": "帐户设置",
        "Appearance": "外观",
        "Accessibility": "无障碍",
        "Notification settingss": "通知设置",
        "Billing": "账单",
        "Email settings": "邮箱设置",
        "Account security": "帐户安全",
        "SSH and GPG keys": "SSH 和 GPG 公钥",
        "Organizations": "组织",
        "Blocked users": "拉黑用户",
        "Temporary interaction limits": "临时互动限制",
        "Code review limits": "代码审查限制",
        "Repositorys": "仓库",
        "Deleted Packages": "删除的软件包",
        "Pages": "GitHub 页面",
        "Saved replies": "快捷回复",
        "Security & analysis": "安全与分析",
        "Installed GitHub Apps": "已安装的 GitHub 应用",
        "Scheduled reminders": "定时提醒",
        "Security log": "安全日志",
        "Sponsorship Log": "赞助日志",
        "GitHub Apps": "GitHub 应用",
        "Developer applications": "开发者应用",
        "Personal Access Tokens": "个人访问令牌",
        "Register new GitHub App": "注册新 GitHub 应用",
        "New OAuth Application": "新 OAuth 应用",
        "Create a new Gist": "创建新代码片段",
        "Discover gists": "探索代码片段",
        "Enable two-factor authentication": "启用双重身份验证",
        "Manage two-factor authentication": "管理双重身份验证",
        "Options": "仓库 · 选项",
        "Confirm access": "授权访问",
        "General": "通常",
        "Manage access": "访问管理",
        "Branches": "分支",
        "Tags": "标签",
        "Webhooks": "Web 钩子",
        "Environments": "环境",
        "Code security & analysis": "代码安全性与分析",
        "Deploy keys": "部署密钥",
        "Add deploy key": "添加部署密钥",
        "Actions secrets": "操作机密",
        "Dependabot secrets": "Dependabot 机密",
        "Configure email notifications": "配置邮件通知",
        "Community Standards": "社区准则",
        "General Organization Settings": "常规组织设置",
        "Member privileges": "成员权限",
        "Teams": "团队",
        "Repository defaults": "仓库默认值",
        "Runners": "运行器",
        "Runner Groups": "运行器组",
        "Packages": "软件包",
        "Security": "安全",
        "Verified & approved domains": "经验证和批准的域名",
        "Third-party application access policy": "第三方应用访问策略",
        "Audit log": "审计日志",
        "Deleted Repositories": "已删除的仓库",
        "GitHub Publisher Verification": "GitHub 发布者验证",
        "Notifications": "通知",
        "Confirm your account recovery settings": "确认您的帐户恢复设置",
        "Your stars": "我的星标",
        "Your starred repositories": "我的星标仓库",
        "Your starred topics": "我的星标主题",
        "Pull Requests": "拉取请求",
    },
    "regexp": [ // 正则翻译
        [/Repositories/, "仓库"],
        [/Starred/, "星标页面"],
        [/starred repositories/, "星标仓库"],
        [/starred topics/, "星标主题"],
        [/starred/, "星标"],
        [/Commits/, "提交"],
        [/New Issue/, "新建议题"],
        [/Issues/, "议题"],
        [/Pull requests/, "拉取请求"],
        [/Actions/, "操作"],
        [/Projects/, "项目"],
        [/Packages/, "软件包"],
        [/Security Overview/, "安全概述"],
        [/Security Policy/, "安全政策"],
        [/Security Advisories/, "安全公告"],
        [/Dependabot alerts/, "Dependabot 警报"],
        [/Pulse/, "统计"],
        [/Contributors to/, "贡献者 ·"],
        [/Community/, "社区"],
        [/Traffic/, "流量"],
        [/Commit Activity/, "提交活动"],
        [/Code frequency/, "代码频率"],
        [/Dependencies/, "依赖关系"],
        [/Network Dependents/, "网络依赖者"],
        [/Network Graph/, "网络图"],
        [/Revisions/,"修订"],
        [/Stargazers/, "追星者"],
        [/Forks/, "复刻"],
        [/Draft Advisory/, "安全公告草案"],
        [/Code scanning alerts/, "代码扫描警报"],
        [/Repository topics/, "仓库主题"],
        [/Scheduled reminders/, "定时提醒"],
        [/Sponsorship Log/, "赞助日志"],
        [/OAuth applications/, "OAuth 应用"],
        [/People · Pending Collaborators/, "成员 · 待定协作者"],
        [/People/, "成员"],
        [/Outside collaborators/, "外部协作者"],
        [/Discussions/, "讨论"],
        ["_regexp_end", "end"]
    ],
};

I18N.zh["pubilc"] = { // 公共区域翻译
    "static": { // 静态翻译
        //
        "No server is currently available to service your request.": "当前服务器无法为您的请求提供服务。",
        "This page is taking too long to load.": "此页面加载时间过长。",
        "Sorry about that. Please try refreshing and contact us if the problem persists.": "对此我们很抱歉。请尝试刷新，如果问题仍然存在，请联系我们。",
        "Contact Support": "联系 GitHub Support",
        "GitHub Status": "GitHub 状态",

        // 顶部栏 (未登录)
        "Why GitHub?": "为什么选择 GitHub？",
        "Team": "团队",
        "Enterprise": "企业",
        // "Pricing": "价格",
        "Product": "产品",
        "Solutions": "解决方案",
        "Open Source": "开源",
        "Search": "搜索",
        "Sign in": "登录",
        "Sign up": "注册",

        // 搜索栏
        "Search or jump to…": "搜索或跳转到…",
        "In this repository": "当前仓库",
        "In this organization": "当前组织",
        "In this user": "当前用户",
        "All GitHub": "整个 GitHub",
        "All of GitHub": "整个 GitHub", // new code search
        "Autocomplete": "自动完成", // new code search
        "Search all of GitHub": "搜索整个 GitHub", // new code search
        "Search in this repository": "在该仓库中搜索", // new code search
        "Search in this owner": "在该所有者中搜索", // new code search
        "Search in this organization": "在该组织中搜索", // new code search
        "Owners": "所有者", // new code search
        "Languages": "语言", // new code search
        "Search syntax tips": "搜索语法提示", // new code search
        "Jump to": "跳转到",

        // 顶部栏 & 小屏左上角下拉栏 (已登录)
        "Dashboard": "仪表板",
        //"Pull requests": "拉取请求"  // 使用 Selector 规则翻译
        "Issues": "议题",
        "Marketplace": "应用市场",
        "Explore": "探索",
        "Give new navigation feedback": "提供新导航的反馈",
        "Codespaces": "代码空间",
        "Sponsors": "赞助",

        "Overview": "概况",
        "Repositories": "仓库",
        "Projects": "项目",
        "Packages": "软件包",
        "Sponsoring": "赞助",

        // 新版全局导航 按钮菜单
        "Home": "主页",
        "Filter repositories": "筛选仓库",
        "Show more": "显示更多",

        // 右上角通知按钮提示
        "You have no unread notifications": "您没有未读通知",
        "You have unread notifications": "您有未读通知",

        // 右上角新建按钮下拉菜单
        "New repository": "新建仓库",
        "Import repository": "导入仓库",
        "New codespace": "新建代码空间",
        "New gist": "新建代码片段",
        "New organization": "新建组织",
        "New project": "新建项目",
        "This organization": "本组织", // 组织
        "New team": "新建团队", // 组织

        // 新版全局导航
        "Command palette": "命令面板",
        "Create new...": "新建...",

        // 右上角个人图标下拉菜单
        "Signed in as": "登录身份为",
        "Set status": "状态设置",
        "Your profile": "我的个人资料",
        "Add account": "添加账户",
            "Switch account": "切换账户",
        "Your sponsorships": "我的捐助者",
        "Your repositories": "我的仓库",
        "Your codespaces": "我的代码空间",
        "Your organizations": "我的组织",
        "Your enterprises": "我的企业",
        "Your projects": "我的项目",
        "Your discussions": "我的讨论",
        "Your stars": "我的标星页面",
        "Your gists": "我的代码片段",
        "Your sponsors": "我的赞助者",
        "Upgrade": "升级",
        "Try Enterprise": "试用企业版",
        "Try Copilot": "试用 Copilot",
        "Feature preview": "功能预览",
            // 对话框
            "Enable": "启用",
            "Disable": "禁用",
            "New Branches and Commits Pages": "新版分支和提交页面",
            "New Code Search and Code View": "新版代码搜索和代码视图",
            "Colorblind themes": "色盲主题",
            "Command Palette": "命令面板",
            "Global Navigation Update": "全局导航更新",
            "Rich Jupyter Notebook Diffs": "丰富的 Jupyter Notebook 差异",
            "Project Migration": "项目迁移",
            "Deployments Dashboard View": "部署仪表板视图",
            "Passkeys": "通行密钥",
            "New Repository Overview": "新版仓库概述",
            "Slash Commands": "斜杠命令",
        "Help": "帮助",
        "Settings": "设置",
        "GitHub Docs": "GitHub 文档", // 新版全局导航
        "GitHub Support": "GitHub 支持", // 新版全局导航
        "Sign out": "退出",

        "Stars": "星标",


        "Prev": "上一页",
        "Previous": "上一页",
        "Next": "下一页",


        // 状态设置对话框
        // 出现位置: 个人资料页, Gist 个人主页, 仓库页右上角个人图标下拉菜单
        "Edit status": "编辑状态",
        "What's happening?": "发生了什么？",

        "Suggestions:": "建议：",
            "On vacation": "在度假",
            "Working from home": "在家工作",
            "Out sick": "生病",
            "Focusing": "专注中",
        
        "Busy": "繁忙中",
        "I may be slow to respond.": "我的反应可能比较慢。",
        "When others mention you, assign you, or request your review, GitHub will let them know that you have limited availability.": "当其他人提及您、指派您或请求您进行评论时，GitHub 会告知他们您的很忙。",
        "Clear status": "清除状态",
        "Never": "永不",
        "Keep this status until you clear or edit your status.": "在清除或编辑状态之前，请保留此状态。",
        "Visible to": "可见",
            "Everyone": "所有人",
            "Your status will be visible to everyone": "所有人都可以看到您的状态",
            // [/Only members of ([^ ]+) will be able to see your status./, "只有 $1 的成员才能看到您的状态。"],
        "Keep this status until you clear your status or edit your status.": "保持此状态直到您清除或编辑您的状态。",
        "in 30 minutes": "30 分钟",
        "in 1 hour": "1 小时",
        "in 4 hours": "4 小时",
        "today": "今天",
        "this week": "本周",
        "Filter emoji": "过滤表情符号",

        // 底部条
        "Terms": "服务条款",
        "Privacy": "隐私",
        "Security": "安全",
        "Status": "状态",
        "Docs": "文档",

        "Contact GitHub": "联系 GitHub",
        "Pricing": "价格",
        "Training": "培训",
        "Shop": "商店",
        "Blog": "博客",
        "About": "关于",

        // 描述、评论编辑器翻译
        "Add a comment": "添加评论",
        "Add a body": "添加内容",
        "Write": "撰写",
            "Add your comment here...": "在此添加您的评论...",
        "Preview": "预览",
            "Nothing to preview": "没有可预览的内容。",
            "This file is empty.": "这是一个空文件。",
        "Leave a comment": "发表评论",
        "Write a reply": "发表回复", // 具体讨论页
        "Write a comment": "发表回复", // 具体讨论页
        "Suggest an answer": "建议一个答案", // 具体讨论页
        "Ask a question, start a conversation, or make an announcement": "提出问题、开始讨论或发布公告", // 新建讨论
        "Nothing to preview": "没有什么可预览",
        "This repository has been archived.": "此仓库已存档。", // 已存档仓库 某个提交的评论框
        "Add review comment": "添加审查意见", // 具体拉取请求 文件审查评论
        "Start a review": "开始评论", // 具体拉取请求 文件审查评论
        // 取消按钮 提醒信息
        "Are you sure you want to discard your unsaved changes?": "您确定要放弃未保存的更改吗？",

        "Add a title": "添加标题",
        "Add a description": "添加描述",
            "Add your description here...": "在此添加您的描述...",
        // 拉取请求 代码审查 回复对话框
        "Heading": "标题",
        "Bold": "粗体",
        "Italic": "斜体",
        "Quote": "摘引",
        "Link": "链接",
        "Numbered list": "有序列表",
        "Unordered list": "无序列表",
        "Task list": "任务列表",
        "Attach files": "附件",
        "Mention": "提及",
        "Reference": "引用",
        "Saved replies": "快速回复",
            "Select a reply": "选择一个回复",
            "Create a new saved reply": "创建新的快速回复",
        "Slash commands": "斜杠命令",
            "Code block": "代码块",
                "Insert a code block formatted for a chosen syntax": "插入针对所选语法格式化的代码块",
            "Details": "详细信息",
                "Add a details tag to hide content behind a visible heading": "添加详情标签，将内容隐藏在可见标题后面",
            // "快速回复": "",
                "Insert one of your saved replies": "插入您快速回复",
            "Table": "表格",
                "Add markdown table": "添加 Markdown 表格",
            "Templates": "模板",
                "Insert one of your issue templates": "插入您的议题模板",

            "Slash": "斜杠",
            // 代码块
            "No Syntax": "无语法",
            // 快速回复
            "No saved replies": "尚无快速回复",
            "You can create one in your": "您可以创建一个在您的",
            "settings": "设置",
            // 表格
            "Columns": "列",
            "1 column": "1 列",
            "2 columns": "2 列",
            "3 columns": "3 列",
            "4 columns": "4 列",
            "5 columns": "5 列",

            "Rows": "行",
            "1 row": "1 行",
            "2 rows": "2 行",
            "3 rows": "3 行",
            "4 rows": "4 行",
            "5 rows": "5 行",

            // 模板
            "No issue templates": "尚无议题模板",
            "Learn more about": "了解更多关于",
            "issue templates": "议题模板",

        // 小屏 插入链接 对话框
            "Insert Link": "插入链接",
            "Link Text": "链接文本",
            "Add": "添加",

        "Attach files by dragging & dropping, selecting or pasting them.": "通过拖放，选择或粘贴来附加文件。",
        "Attach files by selecting or pasting them.": "通过选择或粘贴来附加文件。",
        "Styling with Markdown is supported": "支持 Markdown 功能哦。",
        "Uploading your files…": "正在上传您的文件…",

        "Close issue": "关闭议题", // issue页 评论框
            "Close as completed": "完成后关闭",
                "Done, closed, fixed, resolved": "已完成、已关闭、已修复、已解决",
            "Close as not planned": "非计划中关闭",
                "Won't fix, can't repro, duplicate, stale": "不会修复，无法重现，重复，陈旧",
        "Close with comment": "评论并关闭议题", // issue页 评论框
        "Close pull request": "关闭拉取请求", // pull页 评论框
        "Close discussion": "关闭讨论", // discussion页 评论框
            "Close as resolved": "因解决而关闭",
                "The discussion has been resolved": "讨论已解决",
            "Close as outdated": "因过时而关闭",
                "The discussion is no longer relevant": "讨论不再相关",
            "Close as duplicate": "因重复而关闭",
                "The discussion is a duplicate of another": "讨论与另一个讨论重复",
        "Comment": "评论",
        "Submit new issue": "提交新议题",
        "Comment on this commit": "评论",
        "Close and comment": "提交并关闭",
        "Reopen and comment": "提交并重新打开",
        "Reopen issue": "重新打开议题", // 具体议题
        "Reopen with comment": "重新打开评论", // 具体议题
        "Reopen pull request": "重新打开拉取请求", //具体拉取请求
        "Add single comment": "评论", // 具体提交页 进行某条代码评论
        "Reply": "回复", // 具体讨论页
        "Answer": "答复", // 具体讨论页
        "Start discussion": "开始讨论", // 新建讨论
        "Update": "更新", // 新建讨论
        "discussion": "讨论", // 新建讨论
        "discussions": "讨论", // 新建讨论

        // 全局快捷键对话框 - 快捷键 ? 打开
        "Keyboard shortcuts": "键盘快捷键",
        "Site-wide shortcuts": "全站快捷键",
            "Open command palette": "打开命令面板",
            "Open command palette in command mode": "在命令模式下打开命令面板",
            "Focus search bar": "聚焦搜索栏", // gist
            "Open search bar": "打开搜索栏",
            "Go to notifications": "跳转到通知",
            "Go to dashboard": "跳转到仪表板",
            "Go to your issues": "跳转到议题",
            "Go to your pull requests": "跳转到拉取请求",
            "Bring up this help dialog": "弹出这个帮助对话框",
            "Move selection down": "向下移动选择",
            "Move selection up": "向上移动选择",
            "Toggle selection": "切换选择",
            "Open selection": "打开选择",
        "View all keyboard shortcuts": "查看所有键盘快捷键",

        // 命令面板 - ctrl k 或 ctrl alt k 打开
            "Clear Command Palette": "清除命令面板",
            "Tip:": "小贴士：",
                "Go to your accessibility settings to change your keyboard shortcuts": "跳转到您的无障碍设置，以更改您的键盘快捷键",
                "to search discussions": "搜索讨论", // 键入 #
                "to search issues": "搜索议题", // 键入 #
                "to search pull requests": "搜索拉取请求", // 键入 #
                "to search projects": "搜索项目", // 键入 !
                "to search people and organizations": "搜索成员和组织", // 键入 @
                "to search teams": "搜索团队", // 键入 @
                "to activate command mode": "激活命令模式", // 键入 >
                "Type is:issue to filter to issues": "键入 is:issue 以筛选议题",
                "Type is:pr to filter to pull requests": "键入 is:pr 以筛选拉取请求",
                "Type is:open to filter to open content": "键入 is:open 以筛选打开的内容",
                "Type author:@me to search your content": "键入 author:@me 以筛选您的内容",
                "Type": "请键入",
                "for help and tips": "寻求帮助和提示", // 键入 ?

            "Search or jump to...": "搜索或跳转到…",
            "Clear": "清除",
            // "for issues and pull requests,": "议题和拉取请求，",
            // "for issues, pull requests, and projects,": "议题、拉取请求和项目，",
            // "for files, and": "文件，",
            // "for commands, and": "命令，",
            // "for commands": "命令，",
            // "for help": "帮助",

            "Pages": "GitHub Pages",
            "Notifications": "通知",
            "Discussions": "讨论",
            "Actions": "操作",
            "Insights": "洞察",
            "Organizations": "组织",
            "Users": "用户",
            "Saved queries": "已保存的搜索",
            "to jump to": "去跳转",
            "to search": "去搜索",

            "Top result": "最佳结果",
            "No results matched your search": "没有与您的搜索相符的结果",
            // [/in ([\w]+/[\w]+)/, "在 $1"],

            // # 模式
            "Search issues and pull requests": "搜索议题和拉取请求",
            "Search issues, pull requests, discussions, and projects": "搜索议题、拉取请求、讨论和项目",
            "Issues, pull requests, and discussions": "议题、拉取请求和讨论",

            // ! 模式
            "Search projects": "搜索项目",

            // @ 模式
            "Search or jump to a repository": "搜索或跳转到仓库",
            "Search or jump to a user, organization, or repository": "搜索或跳转到用户、组织或仓库",

            // / 文件模式
            "Search files": "搜索文件",
            "Files": "文件",

            // > 命令模式
            "Run a command": "运行命令",
            "Run command": "运行命令",
            "Commands": "命令",
            "Global Commands": "全局命令",
            "Type > to filter": "键入 > 去筛选",
            "– New repository": "- 新建仓库",
            "– Import repository": "- 导入仓库",
            "– New project": "- 新建项目",
            "– New discussion": "- 新建讨论",
            "– New organization": "- 新建组织",
            "– New gist": "- 新建代码片段",
            "– New issue": "- 新建议题",
            "– New file": "- 新建文件",
            "– Change tab size rendering": "- 切换制表符尺寸",
            "– Switch theme": "- 切换主题",

            "New issue": "新建议题",
            "New discussion": "新建讨论",
            "New file": "新建文件",
            "Change tab size rendering": "切换制表符尺寸",
            "Change tab size r...": "切换制表符尺寸",
                "2 spaces": "2 个空格",
                "3 spaces": "3 个空格",
                "4 spaces": "4 个空格",
                "5 spaces": "5 个空格",
                "6 spaces": "6 个空格",
                "7 spaces": "7 个空格",
                "8 spaces": "8 个空格",
                "9 spaces": "9 个空格",
                "10 spaces": "10 个空格",
                "12 spaces": "12 个空格",
            "Switch theme": "切换主题",
                "Default dark": "暗 - 默认",
                "Default light": "亮 - 默认",
                "Dark dimmed": "昏暗",
                "Switch theme to dark high contrast": "切换主题为 暗 - 高对比",
                "Sync with system settings": "与系统设置同步",

            // ? 模式
            "Modes": "模式",
            "Search for": "搜索",
            "across all of GitHub": "在整个 GitHub中",
            "issues, pull requests, discussions,": "议题、拉取请求、讨论",
            "organizations, repositories,": "组织、仓库",
            "projects": "项目",
            "files": "文件",
            "issues": "议题",
            "pull requests": "拉取请求",
            "organizations": "组织",
            "repositories": "仓库",
            "users": "用户",
            "Activate": "激活",
            "command mode": "命令模式",

            "Use filters in issues, pull requests, discussions, and projects": "在议题题、拉取请求、讨论和项目中使用过滤器",
            "Search your issues, pull requests, and discussions": "搜索您的议题、拉取请求和讨论",
            "Filter to pull requests": "筛选拉取请求",
            "Filter to issues": "筛选议题",
            "Filter to discussions": "筛选讨论",
            "Filter to projects": "筛选项目",
            "Filter to open issues, pull requests, and discussions": "筛选打开的议题、拉取请求和讨论",

            // 议题页面
            "Edit issue title": "编辑议题标题",
            "Edit issue body": "编辑议题内容",
            "Transfer issue…": "转移议题…",
            "Delete issue…": "删除议题…",

        // 公共词 高频词
        "Followers": "关注者",
        "Follow": "关注",
        "Unfollow": "取消关注",
        "Star": "星标",
        // "Unstar": "已加星标",
        "Starred": "已加星标",
        "Fork": "复刻",
        "Save": "保存",
        "Saving…": "保存中…",
        "Updating": "更新中",
        "Updating…": "更新中…",
        "Delete": "删除",
        "Cancel": "取消",
        "Edit": "编辑",
        "Added on": "添加于",
        "Loading...": "载入中...",
        "Loading…": "载入中…",
        "Copied!": "✅ 复制成功!",
        "Copy to clipboard": "复制到剪切板",
        "Give feedback": "反馈",
        "Give us your feedback": "向我们提供反馈意见",
        "Download": "下载",
        "Create": "创建",

        "and": "和",
        ", and": "，和",
        "or": "或",
        ", or": "，或",
        "to": "到",
        "by": "由",
        "on": "于",

        "Learn more": "了解更多",
        "Learn More": "了解更多",
        "Learn more.": "了解更多。",
        ",": "，",
        ".": "。",

        // 名词
        "Public": "公共",
        "Private": "私有",
        "Public archive": "公共存档",
        "Private archive": "私有存档",
        "Code": "代码",
        "Pull requests": "拉取请求",
        "Collaborators": "协作者",
        "collaborators": "协作者",

        "People": "成员",
        "Teams": "团队",

        // 相对时间
        "just now": "刚刚",
        "now": "当前",
        "yesterday": "昨天",
        "last month": "上个月",

        "commit": "提交",
        "commits": "提交",

        // 状态词
        "Verified": "已验证",
        "Partially verified": "部分验证",
        "Unverified": "未验证",

        // 邮箱验证提示
        "Please verify your email address to access all of GitHub's features.": "请验证您的电子邮箱地址以便开启所有 GitHub 功能。",
        "Configure email settings": "修改电子邮箱设置",
        "Your email was verified.": "您的电子邮箱地址验证成功！",

        // 标签提示
        "New feature or request": "新功能或要求",

        // 更换新手机, 要求重新下载恢复码的全局提醒
        "Don't get locked out - if you get a new phone this season, be sure to transfer your authenticator app data to the new phone. Enable cloud back up if your authenticator app supports it and consider": "不要被锁在门外——如果您在这个季节买了一部新手机，请务必将您的身份验证器应用数据传输到新手机。如果您的身份验证器应用支持云备份，请启用它并考虑",
        "redownloading your recovery codes": "重新下载您的恢复码",
        ", just to be safe.": "，以确保安全。",

        // 刷新会话提示条
        "You signed in with another tab or window.": "您使用其他标签页或窗口登录。",
        "Reload": "重新加载",
        "to refresh your session.": "以刷新您的会话",

        // 日历
        "Jan": "1月",
        "Feb": "2月",
        "Mar": "3月",
        "Apr": "4月",
        "May": "5月",
        "Jun": "6月",
        "Jul": "7月",
        "Aug": "8月",
        "Sep": "9月",
        "Oct": "10月",
        "Nov": "11月",
        "Dec": "12月",

        "January"   : "1月",
        "February"  : "2月",
        "March"     : "3月",
        "April"     : "4月",
        "June"      : "6月",
        "July"      : "7月",
        "August"    : "8月",
        "September" : "9月",
        "October"   : "10月",
        "November"  : "11月",
        "December"  : "12月",

        "Sun"  : "周日",
        "Mon"  : "周一",
        "Tue"  : "周二",
        "Wed"  : "周三",
        "Thu"  : "周四",
        "Fri"  : "周五",
        "Sat"  : "周六",
    },
    "regexp": [ // 正则翻译
        /**
         * 匹配时间格式
         *
         * 月 日 或 月 日, 年
         * Mar 19, 2015 – Mar 19, 2016
         * January 26 – March 19
         * March 26
         *
         * 不知道是否稳定, 暂时先试用着. 2016-03-19 20:46:45
         *
         * 更新于 2021-10-04 15:19:18
         * 增加 带介词 on 的格式，on 翻译不体现
         * on Mar 19, 2015
         * on March 26
         *
         * 更新于 2021-10-10 13:44:36
         * on 星期(简写), 月 日 年  // 个人访问令牌 有效期
         * on Tue, Nov 9 2021
         *
         * 2021-10-19 12:04:19 融合更多规则
         *
         * 4 Sep
         * 30 Dec 2020
         *
         * on 4 Sep
         * on 30 Dec 2020
         *
         * 2021-11-22 12:51:57 新增 格式
         *
         * 星期(全称), 月 日, 年 // 仓库-->洞察-->流量 图示标识
         * Sunday, November 14, 2021
         *
         * 更新于 2023-07-04 13:19:21
         * 新增前缀词, 减少二次组织翻译
         *  Updated Jul 4            // 仪表盘页面 仓库标签卡
         *  Commits on Jul 4, 2023   // 提交页面、仓库拉取请求页->提交卡
         *  Joined on Jul 4, 2023    // 追星者，关注者页面
         *
         * Tip:
         * 正则中的 ?? 前面的字符 重复0次或1次
         * 正则中的 ?: 非捕获符号(即关闭圆括号的捕获能力) 使用方法 (?: 匹配规则) -->该匹配不会被捕获 为 $数字
         */
        [/(^Updated |^Commits on |^Joined on |on |)(?:(\d{1,2}) |)(?:(Sun(?:day)?|Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?), |)(?:(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May(?:)??|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:,? |$))(\d{4}|)(\d{1,2}|)(?:,? (\d{4})|)/g, function (all, prefix, date1, week, month, year1, date2, year2) {
            var prefixKey = {
                "Updated "   : "更新于 ",
                "Commits on ": "提交于 ",
                "Joined on " : "加入于 ",
            };
            var weekKey = {
                "Sun"  : "周日",
                "Mon"  : "周一",
                "Tue"  : "周二",
                "Wed"  : "周三",
                "Thu"  : "周四",
                "Fri"  : "周五",
                "Sat"  : "周六",
            };
            var monthKey = {
                "Jan": "1月",
                "Feb": "2月",
                "Mar": "3月",
                "Apr": "4月",
                "May": "5月",
                "Jun": "6月",
                "Jul": "7月",
                "Aug": "8月",
                "Sep": "9月",
                "Oct": "10月",
                "Nov": "11月",
                "Dec": "12月"
            };
            var date = date1 ? date1 : date2;
            var year = year1 ? year1 : year2;
            return (prefixKey[prefix] ? prefixKey[prefix] : '') + (year ? year + '年' : '') + monthKey[month.substring(0, 3)] + (date ? date + '日' : '') + (week ? ', ' + weekKey[week.substring(0, 3)] : '');
        }],
        /**
         * 相对时间格式处理
         *
         * 更新于 2021-11-21 16:47:14
         * 1. 添加 前缀词
         *    over xxx ago // 里程碑页面 最后更新时间
         *    about xxx ago // 里程碑页面 最后更新时间
         *    almost xxx ago // 里程碑页面 最后更新时间
         *    less than xxx ago // 导出帐户数据
         * 2. xxx之内的相对时间格式
         *  in 6 minutes // 拉取请求页面
         *
         * 更新于 2021-11-22 11:54:30
         * 1. 修复 Bug: 意外的扩大了匹配范围(不带前缀与后缀的时间) 干扰了带有相对时间的其他规则
         *  7 months
         */
            [/^just now|^now|^last month|^yesterday|(?:(over|about|almost|in) |)(an?|\d+)(?: |)(second|minute|hour|day|month|year)s?( ago|)/, function (all, prefix, count, unit, suffix) {
            if (all === 'now') {
                return '现在';
            }
            if (all === 'just now') {
                return '刚刚';
            }
            if (all === 'last month') {
                return '上个月';
            }
            if (all === 'yesterday') {
                return '昨天';
            }
            if (count[0] === 'a') {
                count = '1';
            } // a, an 修改为 1

            var unitKey = {second: '秒', minute: '分钟', hour: '小时', day: '天', month: '个月', year: '年'};

            if (suffix) {
                return (prefix === 'about' || prefix === 'almost' ? '大约 ' : prefix === 'less than' ? '不到 ' : '') + count + ' ' + unitKey[unit] + (prefix === 'over' ? '多之前' : '之前');
            } else {
                return count + ' ' + unitKey[unit] + (prefix === 'in' ? '之内' : '之前');
            }
        }],
        /**
         * 匹配时间格式 2
         *
         * in 5m 20s
         */
        [/^(?:(in) |)(?:(\d+)m |)(\d+)s/,function (all, prefix, minute, second) {
            all = minute ? minute + '分' + second + '秒' : second + '秒';
            return (prefix ? all + '之内' : all);
        }],
        [/Only members of ([^ ]+) will be able to see your status./, "只有 $1 的成员才能看到您的状态。"],
    ],
    "time-regexp": [ // 时间正则翻译专项
        /**
         * 匹配时间格式
         *
         * 月 日 或 月 日, 年
         * Mar 19, 2015 – Mar 19, 2016
         * January 26 – March 19
         * March 26
         *
         * 不知道是否稳定, 暂时先试用着. 2016-03-19 20:46:45
         *
         * 更新于 2021-10-04 15:19:18
         * 增加 带介词 on 的格式，on 翻译不体现
         * on Mar 19, 2015
         * on March 26
         *
         * 更新于 2021-10-10 13:44:36
         * on 星期(简写), 月 日 年  // 个人访问令牌 有效期
         * on Tue, Nov 9 2021
         *
         * 2021-10-19 12:04:19 融合更多规则
         *
         * 4 Sep
         * 30 Dec 2020
         *
         * on 4 Sep
         * on 30 Dec 2020
         *
         * 2021-11-22 12:51:57 新增 格式
         *
         * 星期(全称), 月 日, 年 // 仓库-->洞察-->流量 图示标识
         * Sunday, November 14, 2021
         *
         * Tip:
         * 正则中的 ?? 前面的字符 重复0次或1次
         * 正则中的 ?: 非捕获符号(即关闭圆括号的捕获能力) 使用方法 (?: 匹配规则) -->该匹配不会被捕获 为 $数字
         */
        [/(?:on |)(?:(\d{1,2}) |)(?:(Sun(?:day)?|Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?), |)(?:(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May(?:)??|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:,? |$))(\d{4}|)(\d{1,2}|)(?:,? (\d{4})|)/g, function (all, date1, week, month, year1, date2, year2) {
            var weekKey = {
                "Sun"  : "周日",
                "Mon"  : "周一",
                "Tue"  : "周二",
                "Wed"  : "周三",
                "Thu"  : "周四",
                "Fri"  : "周五",
                "Sat"  : "周六",
            };
            var monthKey = {
                "Jan": "1月",
                "Feb": "2月",
                "Mar": "3月",
                "Apr": "4月",
                "May": "5月",
                "Jun": "6月",
                "Jul": "7月",
                "Aug": "8月",
                "Sep": "9月",
                "Oct": "10月",
                "Nov": "11月",
                "Dec": "12月"
            };
            var date = date1 ? date1 : date2;
            var year = year1 ? year1 : year2;
            return (year ? year + '年' : '') + monthKey[month.substring(0, 3)] + (date ? date + '日' : '') + (week ? ', ' + weekKey[week.substring(0, 3)] : '');
        }],
        /**
         * 相对时间格式处理
         *
         * 更新于 2021-11-21 16:47:14
         * 1. 添加 前缀词
         *    over xxx ago // 里程碑页面 最后更新时间
         *    about xxx ago // 里程碑页面 最后更新时间
         *    almost xxx ago // 里程碑页面 最后更新时间
         *    less than xxx ago // 导出帐户数据
         * 2. xxx之内的相对时间格式
         *  in 6 minutes // 拉取请求页面
         *
         * 更新于 2021-11-22 11:54:30
         * 1. 修复 Bug: 意外的扩大了匹配范围(不带前缀与后缀的时间) 干扰了带有相对时间的其他规则
         *  7 months
         */
        [/^just now|^now|^last year|^last month|^last week|^yesterday|(?:(over|about|almost|in) |)(an?|\d+)(?: |)(second|minute|hour|day|month|year|week)s?( ago|)/, function (all, prefix, count, unit, suffix) {
            if (all === 'now') {
                return '现在';
            }
            if (all === 'just now') {
                return '刚刚';
            }
            if (all === 'last year') {
                return '最近 1 年';
            }
            if (all === 'last month') {
                return '上个月';
            }
            if (all === 'last week') {
                return '上周';
            }
            if (all === 'yesterday') {
                return '昨天';
            }
            if (count[0] === 'a') {
                count = '1';
            } // a, an 修改为 1

            var unitKey = {second: '秒', minute: '分钟', hour: '小时', day: '天', month: '个月', year: '年', week: '周'};

            if (suffix) {
                return (prefix === 'about' || prefix === 'almost' ? '大约 ' : prefix === 'less than' ? '不到 ' : '') + count + ' ' + unitKey[unit] + (prefix === 'over' ? '多之前' : '之前');
            } else {
                return count + ' ' + unitKey[unit] + (prefix === 'in' ? '之内' : '之前');
            }
        }],
        [/(\d+)(h|d|w|m)/, function (all, count, suffix) {
            var suffixKey = {h: '小时', d: '天', w: '周', m: '个月'};

            return count + ' ' + suffixKey[suffix] + '之前';
        }],
    ],
    "selector": [ // 元素筛选器规则
        ["a[aria-label='Pull requests you created']", "拉取请求"], // 顶部条 拉取请求
    ],
};

I18N.zh["page-dashboard"] = { // 已登录的首页 - 仪表板(含组织)
    "static": { // 静态翻译
        // 新手帮助
        "Learn Git and GitHub without any code!": "了解 Git 和 GitHub 无需任何代码！",
        "Using the Hello World guide, you’ll create a repository, start a branch,": "使用 Hello World 指南，您将创建一个仓库，开始一个分支，",
        "write comments, and open a pull request.": "写评论，并创建一个拉取请求。(教程内容就不翻译了...)",
        "Let's get started!": "让我们开始吧！",
        "Hide this notice forever": "永久的隐藏该信息",

        "Welcome to GitHub! What’s next?": "欢迎来到 GitHub！下一步干什么？",
        "Create a repository": "创建一个仓库",
        "Tell us about yourself": "介绍一下您自己",
        "Browse interesting repositories": "浏览有趣的仓库",
        "on Twitter": "在 Twitter 上",

        "You don’t have any repositories yet!": "您目前还没有任何仓库！",
        "Create your first repository": "创建您的第一个仓库",
        "or": "或者",
        "Learn more about Git and GitHub": "了解更多关于 Git 和 GitHub 的信息",

        // 组织
        // [/You’re an owner of the ([^ ]+) organization!/, "您是 $1 组织的所有者！"],
        // [/Create a repository for ([^ ]+)/, "为 $1 创建仓库"],
        "View and create teams": "查看并创建团队",
        "See all owners": "查看全部所有者",
        // [/Edit ([^ ]+)’s settings/, "编辑 $1 的设置"],
        "Return to your personal dashboard": "返回到您的个人仪表板",

        // 已有仓库的项目
        // 左侧栏
        "View organization": "查看组织", // 组织
        "Browse organization's repositories": "浏览组织的仓库", // 组织
        "Top Repositories": "置顶仓库",
        "New": "新建",
        "Find a repository…": "搜索仓库…",
        "Show more": "显示更多",
        "Your teams": "您的团队",
            "You don’t belong to any teams yet!": "您还不属于任何团队！",
        "Find a team…": "搜索团队…",
        "Recent activity": "近期活动",
            "When you take actions across GitHub, we’ll provide links to that activity here.": "当您在 GitHub 上采取行动时，我们会在这里提供该活动的链接。", // 组织

        "Public": "公共",
        "Private": "私有",
        "Public archive": "公共存档",
        "Private archive": "私有存档",

        // 中间栏
        "The home for all developers — including you.": "所有开发者的家园--包括您。",
        "Welcome to your personal dashboard, where you can find an introduction to how GitHub works, tools to help you build software, and help merging your first lines of code.": "欢迎来到您的个人仪表板，在这里您可以看到关于GitHub工作原理的介绍，帮助您构建软件的工具，以及帮助您合并您的第一行代码。",
        "Start writing code": "开始编写代码",
            "You're seeing this because you haven't created a repository in a while.": "您看到这个是因为您有一段时间没有创建仓库了。",
            "Remove from dashboard": "从仪表板中删除",
        "Tools of the trade": "贸易工具",
            "You're seeing this because you haven't opened a pull request in a while.": "您看到这个是因为您有一段时间没有打开拉取请求了。",
            "Write code in your web browser": "在您的网络浏览器中编写代码",
                "Use": "使用",
                "the github.dev web-based editor": "基于 github.dev 的网络编辑器",
                "from your repository or pull request to create and commit changes.": "从您的仓库或拉取请求中创建和提交更改。",
        "Install a powerful code editor": "安装一个强大的代码编辑器",
            "is a multi-platform code editor optimized for building and debugging software.": "是针对构建和调试软件进行了优化的多平台代码编辑器。",
        "Set up your local dev environment": "设置本地开发环境",
            "set up Git": "设置 Git",
            ", simplify your dev workflow with": "，简化您的开发工作流程，使用",
            ", or": "，或",
            "bring GitHub to the command line": "将 GitHub 引入命令行",
        "Get started on GitHub": "开始使用 GitHub",
            "You're seeing this because you haven't used GitHub's core features, yet.": "您看到这个是因为您有一段时间没有使用过 GitHub 的核心功能了。",
        "About version control and Git": "关于版本控制和 Git",
        "Learn about the version control system, Git, and how it works with GitHub.":"了解版本控制系统、Git 以及它如何与 GitHub 一起工作。",
        "The GitHub Flow":"GitHub 流程",
        "Adopt GitHub's lightweight, branch-based workflow to collaborate on projects.":"采用 GitHub 的轻量级、基于分支的工作流程来协作处理项目。",


        "One moment please...": "稍等一会儿...",
        "Loading activity...": "载入活动...",
        "All activity": "所有活动",

        "Updates to your homepage feed": "主页订阅源的更新",
        "We've combined the power of the Following feed with the For you feed so there’s one place to discover content on GitHub. There’s improved filtering so you can customize your feed exactly how you like it, and a shiny new visual design. ✨": "我们将 Following 提要的功能与 For you 提要相结合，因此在 GitHub 上有一个地方可以发现内容。它改进了过滤功能，因此您可以根据自己的喜好定制订阅源，它还有一个闪亮的新视觉设计。 ✨",
        "Learn more": "了解更多",
        "Filter": "筛选器",
            "Feed filters": "提要筛选器",
            "Announcements": "公告",
            "Special discussion posts from repositories": "仓库的特别讨论消息",
            "Releases": "发行版",
            "Update posts from repositories": "仓库更新消息",
            "Follows": "关注",
            "Relevant projects or people that are being sponsored": "被赞助的相关项目或人员",
            "Stars": "星标",
            "Repositories being starred by people": "被人们星标的仓库",
            "Repositories": "仓库",
            "Repositories that are created or forked by people": "被人创建或复刻的仓库",
            "Repository activity": "仓库活动",
            "Issues and pull requests from repositories": "从仓库发出的问题和拉取请求",
            "Follows": "关注",
            "Who people are following": "人们在关注谁",
            "Recommendations": "推荐",
            "Repositories and people you may like": "您可能喜欢的仓库和人",
            "Reset to default": "重置",
            "Save": "保存",

        "Welcome to the new feed!": "欢迎来到新的提要!",
        "We’re updating the cards and ranking all the time, so check back regularly. At first, you might need to follow some people or star some repositories to get started": "我们一直在更新卡片和排名，所以请定期查看。一开始，您可能需要关注一些人或标星一些仓库才能开始",
        "Send feedback": "发送反馈",

        "Show all": "显示所有",
        "Show less": "显示更少",

        "published a release": "发布发行版",
        "forked a repository": "复刻仓库",
        "starred a repository": "星标仓库",
        "sponsored": "赞助了",
        "followed": "关注了",
        "added a repository to": "已将仓库添加到",
        "contributed to": "贡献给",

        // 动态 状态词
        "starred": "星标了",
        "created": "创建了",
        "forked from": "复刻自",
        "generated from": "创建自",
        "forked": "复刻了",
        "from": "来自",
        "for": "",
        "pushed to": "推送到",
        "released": "发布了",
        "started sponsoring": "赞助给",
        "started following": "开始关注了",
        "you": "您",
        "Updated": "更新于",
        "has a new repository": "创建了仓库",
        "created a repository": "创建了仓库",
        "created a branch in": "创建了一个分支在",
        "in": "分支在",
        "Forked to": "复刻为",
        "of": "",
        "made": "将",
        "public": "设为公共",
        "committed": "提交于",
        //[/and (\d+) more/, "和另外 $1 个"],

        "Read more": "阅读更多内容",

        "More": "更多",
        "Loading more…": "载入更多…",

        "Subscribe to your news feed": "订阅您的新闻提要",
        "Subscribe to the": "订阅", // 组织
        "organization news feed": "组织的新闻提要", // 组织

        //主页上仓库3个点
        "You're seeing this because of your activity.": "您看到这个是因为您的活动。",
        "Show less activity like this": "显示较少这类活动",
        // [/You're seeing this because you collaborated with ([^ ]+)/, "您看到这个是因为您与 $1 有过合作"],
        // [/You're seeing this because you starred ([^ ]+)/, "您看到这个，是因为您星标了 $1"],
        "Unstar this repository": "取消星标此仓库",
        // [/You're seeing this because you follow ([^ ]+)/, "您看到这个，是因为您关注了 $1"],
        "Unfollow this user": "取消关注此用户",

        "Contributors": "贡献者",
        "Report": "举报",
        "Recommended for you": "为您推荐",
        "Trending repositories": "热门仓库",
        "See more": "查看更多",
        "You're seeing this based on GitHub-wide trends.": "您看到的是基于 GitHub-wide 的趋势。",
        "Recommended based on people you follow": "根据您关注的人推荐",
        "has a new discussion in": "有一条新讨论，在",
        "Join discussion": "参与讨论",
        "Popular among": "很受欢迎",
        "people you follow": "在您关注的人中",
        "Sponsor": "赞助",

        // 右侧栏
        "Latest changes": "最新变化",
        "View changelog →": "查看更新日志 →",
        "Explore repositories": "探索仓库",
        "Explore more →": "探索更多 →",

        "Member statuses": "成员状态", // 组织

        // 用户 浮动信息卡
        "Member of": "隶属组织",
        // [/, and (\d+) more/, "，以及其他 $1 个组织"],

        // 组织  浮动信息卡
        // [/(\d+) repositor(y|ies)/, "$1 个仓库"],
        // [/(\d+) members?/, "$1 个成员"],

        "Add to list": "添加到清单",
        "Lists": "清单",
        "You don't have any lists yet.": "您尚无任何清单。",
        "Create list": "创建清单",
            "Create a list to organize your starred repositories.": "创建一个清单来组织您的星标仓库。",
            "⭐️ Name this list": "⭐️ 清单名称",
            "Write a description": "简单描述",
            "Lists are currently in beta.": "清单目前处于测试阶段。",
            "Share feedback and report bugs.": "分享反馈意见和报告错误。",
            "Creating...": "创建中...",

        "Switch dashboard context": "切换默认身份", // 组织
        "Manage organizations": "管理组织", // 组织
        "Create organization": "创建组织", // 组织

        // 首次加入组织通知
        "You’ve been added to the": "您已经被添加到",
        "organization!": "组织！",
        "Here are some quick tips for a first-time organization member.": "以下是首次加入组织的一些提示。",
        "Use the switch context button in the upper left corner of this page to switch between your personal context (": "使用页面左上角的切换身份按钮，您可以在(",
        ") and organizations you are a member of.": ")和组织身份之间进行切换。",
        "After you switch contexts you’ll see an organization-focused dashboard that lists out organization repositories and activities.": "当您切换身份，您会看到一个组织为中心的页面，其中列出了组织库和活动。",

        // 快捷键
        "Dashboards": "仪表板",
        "Go to your issues": "跳转到您的议题",
        "Go to your pull requests": "跳转到您的拉取请求",
    },
    "regexp": [ // 正则翻译
        [/added (\d+) repositor(y|ies) to/, "添加 $1 个仓库到"],
        [/, and (\d+) more/, "，以及其他 $1 个组织"], // 用户 浮动信息卡
        [/(\d+) repositor(y|ies)/, "$1 个仓库"], // 组织  浮动信息卡
        [/(\d+) members?/, "$1 个成员"], // 组织  浮动信息卡
        [/is being deleted./, "正在被删除。"], // 仓库 组织被删除
        [/Your repository \"([^ ]+)\" was successfully deleted./, "您的仓库 “$1” 已成功删除。"], // 仓库删除
        [/(\d+) releases?/, "$1 个发行版"],
        [/(\d+) followers?/, "$1 个关注者"],
        [/(\d+) comments?/, "$1 条评论"],
        [/(\d+) commits? to/, "$1 个提交到"],
        [/(\d+) more commits? »/, "$1 个更多提交到"],
        [/(\d+) issues? needs? help/, "$1 个议题需要帮助"],
        // [/Updated/, "更新于"],
        [/You’re an owner of the ([^ ]+) organization!/, "您是 $1 组织的所有者！"], // 组织
        [/Create a repository for ([^ ]+)/, "为 $1 创建仓库"], // 组织
        [/Edit ([^ ]+)’s settings/, "编辑 $1 的设置"], // 组织
        [/and (\d+) more/, "和另外 $1 个"],
        [/You're seeing this because you collaborated with ([^ ]+)/, "您看到这个是因为您与 $1 有过合作"],
        [/You're seeing this because you starred ([^ ]+)/, "您看到这个，是因为您星标了 $1"],
        [/You're seeing this because you follow ([^ ]+)/, "您看到这个，是因为您关注了 $1"],
    ],
};
I18N.zh["dashboard"] = I18N.zh["page-dashboard"];
I18N.zh["orgs/dashboard"] = I18N.zh["page-dashboard"];

I18N.zh["page-profile-public"] = { // 个人首页 (含组织)
    "static": { // 静态翻译
        // 个人首页 公关部分
            // 左侧用户信息栏
            "Change your avatar": "修改头像",
            "You have blocked this user": "您已拉黑此用户",
            "Follow": "关注",
            "Sponsor": "赞助",
            "follower": "关注者",
            "followers": "关注者",
            "following": "关注",
            "Joined": "加入于",
            "Achievements": "成就",
            "Highlights": "高光时刻",
            "Organizations": "组织",
            "Block or Report": "拉黑或举报",
            "Unblock or report user": "取消拉黑或举报",

            // 编辑个人资料
            "Edit profile": "编辑个人资料",
            "Name": "名称",
            "Bio": "个人简介",
            "Add a bio": "添加个人简介",
                "You can": "您可",
                "@mention": "@用户名或组织名",
                "other users and organizations to link to them.": "链接到其他用户和组织。",
            "Pronouns": "代词",
                "Don't specify": "不说明",
                "they/them": "他们",
                "she/her": "她",
                "he/him": "他",
                "Custom": "自定义",
            "Company": "公司",
            "Location": "位置",
            "Display current local time": "显示当前当地时间",
            "same time": "相同时间",
            "Website": "网站",
            "Social accounts": "社交账户",
            "Link to social profile": "链接到社交账户",

            // 成就浮动界面
            "Arctic Code Vault Contributor": "北极代码库贡献者",
            "contributed code to several repositories in the": "为多个仓库贡献了代码，在",
            ", and more!": "，更多！",

            // 拉黑 & 举报用户对话框
            // [/Block or report ([^ ]+)/, "拉黑或举报 $1"],
            "Block user": "拉黑用户",
            "Prevent this user from interacting with your repositories and sending you notifications. Learn more about": "防止该用户与您的仓库互动并向您发送通知。了解更多关于",
            "blocking users": "拉黑用户",

            "Unblock user": "取消拉黑",
            "Allow this user to interact with your repositories and send you notifications. Learn more about": "允许该用户与您的仓库互动并向您发送通知。了解更多关于",

            "Report abuse": "举报滥用",
            "Contact GitHub support about this user’s behavior. Learn more about": "就该用户的行为联系 GitHub 支持部门。了解更多关于",
            "reporting abuse": "举报滥用",

            "Send feedback": "发送反馈",

        // 公共词
            "Public": "公共",
            "Private": "私有",
            "Public archive": "公共存档",
            "Private archive": "私有存档",
            "Public template": "公共模板",

            "Lists": "清单",
            "You don't have any lists yet.": "您尚无任何清单。",
            "Create list": "创建清单",
                "Create a list to organize your starred repositories.": "创建一个清单来组织您的星标仓库。",
                "⭐️ Name this list": "⭐️ 清单名称",
                "Write a description": "简单描述",
                "Lists are currently in beta.": "清单目前处于测试阶段。",
                "Share feedback and report bugs.": "分享反馈意见和报告错误。",
                "Creating...": "创建中...",

    },
    "regexp": [ // 正则翻译
        [/(\d+) discussions? answered/, "$1 个讨论已回答"], // 高光时刻
        [/Block or report ([^ ]+)/, "拉黑或举报 $1"],
        [/(\d+) GitHub Archive Program/, "$1 GitHub 存档计划"], // 成就浮动款
    ],
};

I18N.zh["page-profile"] = { // 个人首页
    "static": { // 静态翻译
        ...I18N.zh["page-profile-public"]["static"],

        // 概述标签卡 即主页 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Customize your pins": "自定义置顶",
            // 设置置顶项目对话框
            "Edit pinned items": "设置置顶项目",
            "Select up to six public repositories or gists you'd like to show to anyone.": "最多选择 6 个您想向任何人展示的公共仓库或代码片段。",
            "Select up to six public repositories you'd like to show.": "最多选择 6 个要显示的公共仓库。", // 组织页
            "Filter repositories and gists": "筛选仓库和代码片段",
            "Repositories": "仓库",
            "Gists": "代码片段",
            "Filter repositories": "筛选仓库", // 组织页
            "Show:": "显示：",
            "Save pins": "保存置顶",

            "Drag to reorder": "拖动重新排序",

            // 顶部提醒
            "Your pins have been updated. Drag and drop to reorder them.": "您的置顶已更新。拖放来重新排列它们。",
            // 拖拽排序提醒
            "Order updated.": "置顶已更新。",

            "Pinned": "已置顶",
            "Top repositories": "置顶的仓库",
            "Popular repositories": "流行的仓库",

            "Learn how we count contributions": "了解我们如何计算贡献",
            "Less": "更少",
            "More": "更多",
            "Contribution settings": "贡献设置",
            // 贡献设置下拉菜单
            "Private contributions": "私人贡献",
            "Turning on private contributions will show anonymized private activity on your profile.": "开启私人贡献则将在您的个人资料上显示匿名的私人活动。",
            "Visitors will now see your public and anonymized private contributions.": "访客现在将看到您的公开和匿名的私人贡献。",
            "Turning off private contributions will show only public activity on your profile.": "关闭私人贡献则将仅在您的个人资料中显示公开活动。",
            "Visitors will now see only your public contributions.": "访客现在将只能看到您的公开贡献。",
            "Activity overview": "活动概况",
            "Turning off the activity overview will hide the section on your profile.": "关闭活动概况则将隐藏您的个人资料中的部分内容。",
            "The 'Activity overview' section will no longer appear on your profile.": "“活动概况” 部分将不再出现在您的个人资料中。",
            "Turning on the activity overview will show an overview of your activity across organizations and repositories.": "开启活动概况将显示跨组织和仓库的活动概况。",
            "Others will now see 'Activity overview' when they view your profile.": "其他人在查看您的资料时，现在会看到 “活动概况”。",

            "Contribution activity": "贡献活动",

            "Search by name": "搜索组织名",
            "Contributed to": "贡献给了",
            "Activity in": "活动在",
            "No activity overview available.": "没有可用的活动概况。",

            "open": "打开",
            "closed": "已关闭",
            "merged": "已合并",
            "pull request": "拉取请求",

            "commits": "次提交",
            "comments": "次评论",
            "Commits": "提交",
            "Code review": "代码审查",
            "Built by": "构建者",

            "Created their first repository": "创建了他们的第一个仓库",
            "Created an issue in": "创建一个议题在",
            "Created a pull request in": "创建一个拉取请求在",
            "First repository": "第一个仓库",
            "First pull request": "第一次拉取请求",
            "First issue": "第一次议题",
            "Opened their first issue on GitHub in": "打开了他们第一个议题",
            "Opened their first pull request on GitHub in": "打开了他们第一个拉取请求",
            "Joined GitHub": "刚加入 GitHub",
            "Joined the": "加入",
            "organization": "组织",
            //"Show more activity": "显示更多",
            "Show more activity": "加载更多动态",
            "Loading...": "载入中...",

            "Seeing something unexpected? Take a look at the": "看到了一些意想不到的东西？请看一下",
            "GitHub profile guide": "GitHub 个人资料指南",

    },
    "regexp": [ // 正则翻译
        [/(\d+) discussions? answered/, "$1 个讨论已回答"], // 高光时刻
        [/Block or report ([^ ]+)/, "拉黑或举报 $1"],
        [/(\d+) GitHub Archive Program/, "$1 GitHub 存档计划"], // 成就浮动款
        [/(\d+) remaining/, "$1 剩余"], // 置顶项目 剩余
        [/([^ ]+) doesn('|’)t have any public repositories yet./, "$1 尚无任何公共仓库。"],
        [/([\d,]+) contributions? in the last year/, "在过去的一年中贡献 $1 次"],
        [/([\d,]+) contributions? in (\d+) in ([^ ]+)/, "在 $2 年中向 $3, 贡献 $1 次"],
        [/([\d,]+) contributions? in (\d+)/, "在 $2 年中贡献 $1 次"],
        [/(\d+) contributions? in private repositories?/, "私有仓库 $1 个贡献"],
        [/(\d+|No) contributions?/, function (all, number) {
            return number === 'No' ? "无贡献" : number+" 次贡献";
        }],// 贡献日历
        [/and (\d+) other repositor(y|ies)/, "和 $1 个其他仓库"], // 活动概览
        // 贡献信息
        [/Created (\d+) commits? in (\d+) repositor(y|ies)/, "在 $2 个仓库中创建了 $1 次提交"],
        [/Created (\d+) repositor(y|ies)/, "创建了 $1 个仓库"],
        [/Opened (\d+) pull requests? in (\d+) repositor(y|ies)/, "在 $2 个仓库中打开了 $1 个拉取请求"],
        [/Opened (\d+) other pull requests? in (\d+) repositor(y|ies)/, "在 $2 个其他仓库中打开了 $1 个拉取请求"],
        [/Opened (\d+) issues? in (\d+) repositor(y|ies)/, "在 $2 个仓库中打开了 $1 个议题"],
        [/Opened (\d+) other issues? in (\d+) repositor(y|ies)/, "在 $2 个其他仓库中打开了 $1 个其他议题"],
        [/Reviewed (\d+) pull requests? in (\d+) repositor(y|ies)/, "在 $2 个仓库中审查了 $1 个拉取请求"],
        [/Answered (\d+) discussions? in (\d+) repositor(y|ies)/, "在 $2 个仓库中答复了 $1 个讨论"],
        [/Started (\d+) discussions? in (\d+) repositor(y|ies)/, "在 $2 个仓库中发起了 $1 个讨论"],
        [/(\d+) commits?/, "$1 次提交"],
        [/(\d+) pull requests?/, "$1 次拉取请求"],
        [/that received (\d+) comments?/  , "收到 $1 条评论"],
        [/(\d+) of (\d+) tasks?/, "$1 / $2 个任务"],
        [/(\d+) comments?/, "$1 条评论"],
        [/(\d+) tasks? done/, "$1 个任务完成"],
        [/([^ ]+) doesn't have any projects yet./, "$1 目前还没有任何项目。"],
        [/([^ ]+) has no activity yet for this period./, "$1 目前还没有活动。"],
        [/([^ ]+) had no activity during this period./, "$1 在此期间没有活动。"],
        [/Contribution activity in ([^ ]+)/, "在 $1 中的贡献活动"],
        [/([^ ]+) had no activity in ([^ ]+) during this period./, "在此期间，$1 在 $2 中没有活动。"],
        [/([^ ]+) has no activity in ([^ ]+) yet for this period./, "在此期间，$1 在 $2 中没有活动。"],
    ],
};
I18N.zh["page-profile/overview"] = I18N.zh["page-profile"];

I18N.zh["page-profile/repositories"] = { // 个人首页 - 仓库标签卡
    "static": { // 静态翻译
        ...I18N.zh["page-profile-public"]["static"],

        // 仓库标签卡 ?tab=repositories >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            // 顶部提醒
                // [/Your repository \"([^ ]+)\" was successfully deleted./, "您的仓库 “$1” 已成功删除。"],

            // "Search repositories…": "搜索这些查库…",
            // "Search starred repositories…": "搜索点赞的仓库…",

            // 搜索, 筛选 & 排序工具栏
            "Find a repository…": "搜索仓库…",
            // "Type": "类型", // 与全局冲突 使用 Selector 规则翻译
                // 下拉菜单
                "Select type": "选择类型",
                "All": "全部",
                "Public": "公共",
                "Private": "私有",
                "Sources": "源码",
                "Forks": "复刻",
                "Archived": "存档",
                "Can be sponsored": "可赞助",
                "Mirrors": "镜像",
                "Templates": "模板",
            "Language": "语言",
                // 下拉菜单
                "Select language": "选择语言",
                "All languages": "所有语言",
            "Sort": "排序",
                // 下拉菜单
                "Select order": "选择排序",
                "Last updated": "最近更新",
                // "Name": "仓库名",
                // "Recently starred": "最近星标",
                // "Recently active": "最近活跃",
                // "Most stars": "最多星标",
                // "Unstar": "取消星标",
            "New": "新建",

            // 筛选结果
            "result for": "个结果在",
            "results for": "个结果在",
                "public": "公共",
                "private": "私有",
                "source": "源码",
                "forked": "复刻",
                "archived": "存档",
                "sponsorable": "可赞助",
                "mirror": "镜像",
                "template": "模板",
            "repositories matching": "仓库中匹配了",
            "result for repositories matching": "个结果在仓库中匹配了",
            "results for repositories matching": "个结果在仓库中匹配了",
            "repositories sorted by": "仓库，排序按",
            "written in": "，使用语言",
            "results for repositories written in": "个结果在仓库中使用语言",
            "star matching": "个星标匹配", //?tab=stars
            "stars matching": "个星标匹配", //?tab=stars
            "star written in": "个星标使用语言", //?tab=stars
            "stars written in": "个星标使用语言", //?tab=stars
            "sorted by": "，排序按",
                "last updated": "最近更新",
                "name": "仓库名",
                "stars": "星标",

            "Clear filter": "清除筛选",

            // [/([^ ]+) doesn’t have any repositories that match./, "$1 没有任何匹配的仓库"],
            "This organization doesn’t have any repositories that match.": "该组织没有任何匹配的仓库。", // 组织仓库

            "This organization has no public repositories.": "该组织没有公共仓库。", //组织仓库

            // 项目 状态词
            "Updated": "更新于",
            "Forked from": "复刻自",

            // 曲线图提示
            "Past year of activity": "过去一年的活动",
    },
    "regexp": [ // 正则翻译
        [/([^ ]+) doesn’t have any repositories that match./, "$1 没有任何匹配的仓库"], // 仓库标签卡
        [/Your repository \"([^ ]+)\" was successfully deleted./, "您的仓库 “$1” 已成功删除。"],
        [/(\d+) issues? needs? help/, "$1 个议题需要帮助"],
    ],
    "selector": [ // 元素筛选器规则
        ["#type-options > summary > span:nth-child(1)", "类型"], // 个人主页 --> 仓库标签页-->类型筛选器 Type
    ],
};

I18N.zh["page-profile/projects"] = { // 个人首页- 项目标签卡
    "static": { // 静态翻译
        ...I18N.zh["page-profile-public"]["static"],

        // 项目标签卡 ?tab=projects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "There aren't any projects yet": "尚无任何项目",
            "Provide quick access to relevant projects.": "提供快速访问相关项目的途径。",
            "Add projects to view them here.": "将项目添加到此处查看。",

            "Welcome to the all-new projects": "欢迎访问全新的项目",
            "Built like a spreadsheet, project tables give you a live canvas to filter, sort, and group issues and pull requests. Tailor them to your needs with custom fields and saved views.": "构建像电子表格一样的项目表，给您一个实时的画布来对议题和拉取请求进行筛选、排序和分组。通过自定义字段和保存的视图，使它们符合您的需要。",

            "Learn more about projects": "了解更多关于项目", // ?tab=projects

            "Create your first GitHub project": "创建您的第一个 GitHub 项目",
            "Projects are a customizable, flexible tool for planning and tracking your work.": "项目是一个可定制的、灵活的工具，用于规划和跟踪您的工作。",

            "Sort": "排序",
                // 排序下拉菜单
                "Newest": "最新",
                "Oldest": "最早",
                "Recently updated": "近期更新内容",
                "Least recently updated": "最近最少更新",
            // 清除筛选
            "Clear current search query and sorts": "清除当前的搜索查询和分类",

            "Plan and track work across repositories with custom fields and multiple views": "通过自定义字段和多个视图来计划和跟踪整个仓库的工作",
            "Kanban-style project board": "看板式项目板",

            "You don't have any projects yet.": "您还没有任何项目。",
            "There are no projects matching your search.": "没有符合您搜索条件的项目。",
            "Learn More": "了解更多",

            "No description": "无描述",
            "Close": "关闭",
            "Closed": "已关闭",
            "Reopen": "重新打开",

            // 顶部提醒
            "Project closed.": "项目已关闭。",
            "Project reopened.": "项目已重新打开。",

    },
    "regexp": [ // 正则翻译
        [/([\d,]+) Open/, "$1 打开"], // 项目标签卡
        [/([\d,]+) Closed/, "$1 已关闭"],
    ],
};

I18N.zh["page-profile/packages"] = { // 个人首页 - 软件包标签卡
    "static": { // 静态翻译
        ...I18N.zh["page-profile-public"]["static"],

        // 软件包标签卡 ?tab=packages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Get started with GitHub Packages": "开始使用 GitHub 软件包",
            "Safely publish packages, store your packages alongside your code, and share your packages privately with your team.": "安全地发布包，将您的包与您的代码一起存储，并与您的团队私下共享您的包。",
            "Choose a registry": "选择一个注册表",
            "A software platform used for building applications based on containers — small and lightweight execution environments.": "用于构建基于容器的应用的软件平台——小型轻量级执行环境。",
            "A default package manager used for the Java programming language and the Java runtime environment.": "用于 Java 编程语言和 Java 运行环境的一个默认包管理器。",
            "A free and open source package manager used for the Microsoft development platforms including .NET.": "一个自由和开源的开源包管理器，用于包括 .NET 在内的 Microsoft 开发平台。",
            "A standard format for distributing Ruby programs and libraries used for the Ruby programming language.": "分发用于 Ruby 编程语言的 Ruby 程序和库的标准格式。",
            "A package manager for JavaScript, included with Node.js. npm makes it easy for developers to share and reuse code.": "npm 是一个 JavaScript 的包管理器，包含在 Node.js 中。它使开发人员能够轻松地分享和重用代码。",
            "Containers": "容器",
            "A single place for your team to manage Docker images and decide who can see and access your images.": "为您的团队提供一个管理 Docker 镜像的单一场所，并决定谁可以看到和访问您的镜像。",

            "Type:": "类型:",
                // 下拉菜单
                "Select type": "选择类型",
                "All": "全部",

            "Search packages…": "搜索软件包…",

            "Visibility:": "可见性:",
                "Select visibility": "选择可见性",
                "Internal": "内部",
            "Sort by:": "排序方式:",
                "Select sort view": "选择排序视图",
                "Most downloads": "最多下载",
                "Least downloads": "最少下载",

            "Published": "发布于",

    },
    "regexp": [ // 正则翻译
        [/(\d+) packages?/, "$1 软件包"],
    ],
};

I18N.zh["page-profile/sponsors"] = { // 个人首页 - 赞助标签卡
    "static": { // 静态翻译
        ...I18N.zh["page-profile-public"]["static"],

        // 赞助标签卡 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // [/is sponsoring/, "正在赞助"],
            "organization or developer:": "个组织或开发者：",
    },
    "regexp": [ // 正则翻译
        [/is sponsoring/, "正在赞助"],
    ],
};

I18N.zh["page-profile/stars"] = { // 个人首页 - 星标标签卡
    "static": { // 静态翻译
        ...I18N.zh["page-profile-public"]["static"],

        // 星标标签卡 ?tab=stars >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Lists": "清单",
            "Show all lists...": "显示所有列表...",

            "Sort by": "排序方式",
            // 排序补充
                "Name ascending (A-Z)": "名称升序 (A-Z)",
                "Name descending (Z-A)": "名称降序 (Z-A)",
                "Newest": "最新",
                "Oldest": "最早",
                "Last updated": "最后更新",
            "Create list": "创建清单",
                "Create a list to organize your starred repositories.": "创建一个清单来组织您的星标仓库。",
                "⭐️ Name this list": "⭐️ 清单名称",
                "Write a description": "简单描述",
                "Lists are currently in beta.": "清单目前处于测试阶段。",
                "Share feedback and report bugs.": "分享反馈意见和报告错误。",
                "Create": "创建",
                "Creating...": "创建中...",

            "Create your first list": "创建您的第一个清单",
            "Lists make it easier to organize and curate repositories that you have starred.": "列表可使您更容易组织和策划您的星标仓库。",
            "Create your first list.": "创建您的第一个清单。",

            // 搜索, 筛选 & 排序工具栏
            "Search stars": "搜索星标",
            "Type: All"    : "类型：全部",
            "Type: Public" : "类型：公共",
            "Type: Private": "类型：私有",
            "Type: Sources": "类型：源码",
            "Type: Forks"  : "类型：复刻",
            "Type: Mirrors": "类型：镜像",
            "Type: Templates": "类型：模板",
                "All"    : "全部",
                "Public" : "公共",
                "Private": "私有",
                "Sources": "源码",
                "Forks"  : "复刻",
                "Can be sponsored": "可赞助",
                "Mirrors": "镜像",
                "Templates": "模板",
            "Language": "语言",
                // 下拉菜单
                "Select language": "选择语言",
                "All languages": "所有语言",
            "Sort": "排序",
                // 下拉菜单
            "Sort by: Recently starred": "排序：最近星标",
            "Sort by: Recently active": "排序：最近活跃",
            "Sort by: Most stars": "排序：最多星标",
                "Recently starred": "最近星标",
                "Recently active": "最近活跃",
                "Most stars": "最多星标",
                "Languages": "语言",

            // 筛选结果
            "result for": "个结果在",
            "results for": "个结果在",
                "public": "公共",
                "private": "私有",
                "source": "源码",
                "forked": "复刻",
                "sponsorable": "可赞助",
                "archived": "存档",
                "mirror": "镜像",
                "template": "模板",
            "star matching": "个星标匹配", //?tab=stars
            "stars matching": "个星标匹配", //?tab=stars
            "star written in": "个星标使用语言", //?tab=stars
            "stars written in": "个星标使用语言", //?tab=stars
            "starred repositories": "星标仓库",
            "starred repositories written in": "星标仓库使用语言",

            "Clear filter": "清除筛选",

            // 项目 状态词
            "Updated": "更新于",
            "Forked from": "复刻自",

            "That’s it. You’ve reached the end of your stars.": "而已。您已经到了星海的尽头。",

            "Topics": "主题",

            "Add to list": "添加到清单",
            "Lists": "清单",
            "You don't have any lists yet.": "您尚无任何清单。",

            // [/(\d+) repositor(y|ies)/, "$1 个仓库"],

            // 他人库 星标页 补充
            "Search starred repositories": "搜索星标仓库",
            "Starred repositories": "星标仓库",
            "Starred topics": "星标主题",
            "See all starred topics": "查看所有星标主题",

            // [/That’s it. You’ve reached the end of ([^ ]+)’s stars./, "而已。您已经到了$1 星海的尽头。"], // 他人星标页 搜索结果

        // https://github.com/stars/<repo-name>/lists/<清单>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Edit list": "编辑清单",
                "Delete list": "删除清单",
                    "Are you sure you want to delete this list?": "您确定要删除此清单吗？",
                        // 顶部提醒
                        // [/Deleted \"(.*)\"./, "已删除 “$1”。], // 删除星标清单
                "Save list": "保存清单",
                "Saving...": "保存中...",
            "Add repositories to this list": "添加仓库到此清单",
            "Star repositories on GitHub to keep track of your favorite projects and inspirational code.": "GitHub上的星标仓库可以跟踪您最喜欢的项目和鼓舞人心的代码。",
            "Explore repositories.": "探索仓库。",
    },
    "regexp": [ // 正则翻译
        [/Deleted \"(.*)\"./, "已删除 “$1”。"], // 删除星标清单 顶部提醒
        [/doesn’t have any starred repositories yet./, "尚无任何星标仓库。"],
        [/That’s it. You’ve reached the end of ([^ ]+)’s stars./, "而已。您已经到了$1 星海的尽头。"], // 他人星标页 搜索结果
        [/(\d+) repositor(y|ies)/, "$1 个仓库"],
        [/Language: /, "语言："],
    ],
};

I18N.zh["page-profile/achievements"] = I18N.zh["page-profile-public"];

I18N.zh["orgs-public"] = { // 组织公共部分
    "static": { // 静态翻译

        "People": "成员",
        "Teams": "团队",

    },
    "regexp": [ // 正则翻译
        [/Invite someone to/, "邀请某人加入组织"],
        [/New team in/, "新建团队在组织"],
        [/New repository in/, "新建仓库在组织"],
        [/This organization was marked as archived by an administrator (on .+). It is no longer maintained./, "此组织已由管理员于 $1 存档。不再维护。"],
    ],
};

I18N.zh["settings-menu"] = { // 设置 - 公共部分
    "static": { // 静态翻译
        "Settings": "设置", // 新版全局导航

        "Your personal account": "我的个人帐户",
        "Switch settings context": "切换设置上下文", // 存在组织时
        "Go to your personal profile": "去我的个人资料",
        // 左侧菜单
        "Public profile": "基本资料",
        "Account": "帐户",
        "Appearance": "外观",
        "Accessibility": "无障碍",
        "Notifications": "通知",

        "Access": "访问",
        "Billing and plans": "账单和计划",
            "Plans and usage": "计划和使用情况",
            "Spending limits": "支出限额",
            "Payment information": "支付信息",
        "Emails": "电子邮箱",
        "Password and authentication": "密码和身份验证",
        "Sessions": "会话",
        "SSH and GPG keys": "SSH 与 GPG 公钥",
        "Organizations": "组织",
        "Enterprises": "企业版",
        "Moderation": "节制",
            "Blocked users": "黑名单",
            "Interaction limits": "互动限制",
            "Code review limits": "代码审查限制",

        "Code, planning, and automation": "代码、规划和自动化",
        // "Repository": "仓库"
        "Packages": "软件包",
        "Copilot": "GitHub Copilot",
        "Pages": "GitHub Pages",
        "Saved replies": "快捷回复",

        // "Security": "安全",
        "Code security and analysis": "代码安全性与分析",

        "Integrations": "集成",
        "Applications": "应用",
        "Scheduled reminders": "定时提醒",

        "Archives": "存档",
        "Security log": "安全日志",
        "Sponsorship log": "赞助日志",

        "Developer settings": "开发者设置",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs-settings-menu"] = { // 组织设置 公共部分
    "static": { // 静态翻译
        ...I18N.zh["orgs-public"]["static"],

        // 公用部分
            "Organization": "组织",
            "Switch settings context": "切换设置上下文", // 存在组织时
            "Go to your organization profile": "去我的组织主页",
            // 左侧菜单
            "General": "常规",
            "Access": "访问",
            "Billing and plans": "账单和计划",
            "Repository roles": "仓库角色",
            "Member privileges": "成员权限",
            "Team discussions": "团队讨论",
            "Import/Export": "导入/导出",
            "Moderation": "节制",
                "Blocked users": "黑名单",
                "Interaction limits": "互动限制",
                "Code review limits": "代码审查限制",
                "Moderators": "版主",

            "Code, planning, and automation": "代码、规划和自动化",
            "Repository": "仓库",
                "Repository defaults": "仓库默认值",
                "Repository topics": "仓库主题",
                "Repository rulesets": "仓库规则集",
                "Repository rule insights": "仓库规则洞察",
                "Custom properties": "自定义属性",
            "Codespaces": "代码空间",
            "Copilot": "GitHub Copilot",
                "Access": "访问",
                "Policies and features": "政策和功能",
            "Actions": "操作",
                "Runners": "运行器",
                "Runner groups": "运行器组",
                "Caches": "缓存",
            "Webhooks": "Web 钩子",
            "Packages": "软件包",
            "Projects": "项目",

            "Security": "安全",
            "Authentication security": "身份验证安全",
            "Code security and analysis": "代码安全性与分析",
            "Verified and approved domains": "经验证和批准的域名",
            "Secrets and variables": "机密和变量",

            "Third-party Access": "第三方访问",
            "OAuth application policy": "OAuth 应用策略",
            "GitHub Apps": "GitHub 应用",
            "Personal access tokens": "个人访问令牌",
                "Active tokens": "活跃的令牌",
                "Pending requests": "待处理的请求",

            "Integrations": "集成",
            "Scheduled reminders": "定时提醒",

            "Archive": "存档",
            "Logs": "日志",
                "Sponsorship log": "赞助日志",
                "Audit log": "审计日志",
            "Deleted repositories": "删除的仓库",

            "Developer settings": "开发者设置",
                "OAuth Apps": "OAuth 应用",
                "Publisher Verification": "发布者验证",
            "Account settings": "帐户设置",

            "Developer settings": "开发者设置"
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/profile"] = { // 设置 - 个人资料
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Profile 个人资料 https://github.com/settings/profile
            "Public profile": "基本资料",
            "Profile picture": "我的头像",
                "Edit": "编辑",
                "Upload a photo…": "上传图片…",
                // 裁剪个人头像对话框
                "Crop your new profile picture": "裁剪个人头像",
                "Set new profile picture": "设置新的个人头像",
            //"You can also drag and drop a picture from your computer.": "您也可以直接拖拽照片镜像上传.",
            "Name": "昵称",
            "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.": "您的昵称可能会出现在 GitHub 上，您的贡献或被提及的地方。您可以随时删除它。",
            "Public email": "公开电子邮箱",
            "Select a verified email to display": "选择显示一个已验证的电子邮箱",
            "You have set your email address to private. To toggle email privacy, go to": "您已将电子邮箱地址设置为私密。需要切换电子邮箱地址的私密性，请转到",
            "email settings": "邮箱设置",
            "and uncheck \"Keep my email address private.\"": "并取消 “保持我的电子邮箱地址的私密性”。",
            //"Don’t show my email address": "不显示我的邮箱",
            //"You can add or remove verified email addresses in your": "您可以添加或删除邮件地址在您的",
            //"personal email settings": "邮箱设置",
            "Bio": "个人简介",
            "Tell us a little bit about yourself": "自我介绍一下您自己的相关信息",
            "You can": "您可以",
            "@mention": "@用户名或组织名",
            "other users and organizations to link to them.": "链接到其他用户和组织。",
            "URL": "网站",
            "Social accounts": "社交账户",
            "Link to social profile": "链接到社交账户",
            "Company": "公司",
            "your company’s GitHub organization to link it.": "链接到您所在公司的 GitHub 组织。",
             //"your company's GitHub organization to link it.": "贵公司和GitHub的组织联系起来。",
            "Pronouns": "代词",
                "Don't specify": "不说明",
                "they/them": "他们",
                "she/her": "她",
                "he/him": "他",
                "Custom": "自定义",
            "Location": "位置",
            "Display current local time": "显示当前当地时间",
                "Other users will see the time difference from their local time.": "其他用户将看到与本地时间的时差。",
                "Time zone": "时区",

            "All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our": "此页面上的所有字段都是可选的，可以随时删除，填写这些字段，即表示您同意我们在您的个人资料出现的任何地方共享此数据。请参阅我们的",
            "privacy statement": "隐私声明",
            "to learn more about how we use this information.": "以了解更多关于我们如何使用这些信息。",
            "Update profile": "更新资料",
            // 顶部提醒
                "Profile updated successfully": "资料更新成功。",
                "Profile updated successfully —": "资料更新成功 —",
                "view your profile.": "查看您的个人资料。",

            "Contributions & Activity": "贡献与活动",
                "Make profile private and hide activity": "将个人资料设置为私密，并隐藏活动",
                    "Enabling this will hide your contributions and activity from your GitHub profile and from social features like followers, stars, feeds, leaderboards and releases.": "启用此功能后，您的贡献和活动将会从您的 GitHub 个人资料中隐藏起来，也不会被关注者、观星者、订阅源、排行榜和发布等社交功能所发现。",
                "Include private contributions on my profile": "在我的个人资料显示私人贡献",
                    "Your contribution graph, achievements, and activity overview will show your private contributions without revealing any repository or organization information.": "您的贡献图、成就和活动概览将显示您的私人贡献，而不会透露任何仓库或组织信息。",
                    "Read more": "了解更多",
            "Update preferences": "更新设置",

            "Profile settings": "个人资料设置",
            "Show Achievements on my profile": "在我的个人资料上显示成就",
            "Your achievements will be shown on your profile.": "您的成就将显示在您的个人资料中。",

            "GitHub Developer Program": "GitHub 开发者计划",
            "Building an application, service, or tool that integrates with GitHub?": "构建与 GitHub 集成的应用、服务或工具？",
            "Join the GitHub Developer Program": "加入 GitHub 开发者计划",
            ", or read more about it at our": "，或阅读更多关于它的信息在我们的",
            "Developer site": "开发者网站",

            "Jobs profile": "就业状态",
            "Available for hire": "求 HR 带走",
            "Save jobs profile": "保存状态",
                // 顶部提醒
                "Profile updated successfully —": "个人资料更新成功 —",
                "view your profile.": "查看您的个人资料。",

            "Trending settings": "趋势设置",
            "Preferred spoken language": "首选语言",
            "No Preference": "未设置",
            "We'll use this language preference to filter the trending repository lists on": "我们将使用此语言偏好来过滤趋势仓库列表在",
            "and our": "和我们的",
            "Trending Repositories": "趋势仓库",
            "page.": "页面。",
            "Save Trending settings": "保存趋势设置",
    },
    "regexp": [ // 正则翻译
    ],
};
I18N.zh["settings"] = I18N.zh["settings/profile"];

I18N.zh["settings/admin"] = { // 设置 - 帐户
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Account settings 帐户设置 https://github.com/settings/admin
            "Change username": "更改用户名",
            "Changing your username can have": "更改您的用户名可能会有",
            "unintended side effects": "意想不到的副作用",
                "Really change your username?": "确定要更改您的用户名？",
                "Unexpected bad things will happen if you don’t read this!": "请仔细阅读以下提示信息！！！",
                "We": "我们",
                "will not": "不会",
                "will": "会",
                "set up redirects for your old profile page.": "为您的旧资料页设置重定向",
                "set up redirects for Pages sites.": "为 Pages 站点设置重定向。",
                "create redirects for your repositories (web and git access).": "为您的仓库设置重定向（ web 和 git 访问）。",
                "Renaming may take a few minutes to complete.": "重命名可能需要几分钟的时间来完成。",
                "I understand, let’s change my username": "我明白了，依然更改我的用户名",

                "Enter a new username": "输入一个新用户名",
                "Choose a new username": "选择一个新用户名",
                "Change my username": "更改我的用户名",
                "Trademark Policy": "商标政策",
                "are available.": "都可以使用。",
                "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.": "用户名只能包含字母数字字符或单个连字符，不能以连字符开始或结束。",
            "Looking to manage account security settings? You can find them in the": "想管理帐户安全设置？您可以找到它们在",
            "Account security": "帐户安全",
            "page.": "页。",

            "Link Patreon account": "与 Patreon 账户连接",
            "Connect a Patreon account for": "为",
            "to sponsor maintainers with. Get recognition on GitHub for sponsorships made on Patreon when the sponsored person has linked Patreon and GitHub, too, and has a public GitHub Sponsors profile.": "连接 Patreon 账户来赞助维护人员。当被赞助人链接 Patreon 和 GitHub时，会在 GitHub 上获得 Patreon 上赞助的认可，并有一个公开的GitHub赞助商档案。",
            "Connect with Patreon": "连接 Patreon",

            "Export account data": "导出帐户数据",
            "Export all repositories and profile metadata for": "导出所有仓库和配置元数据，自",
            ". Exports will be available for 7 days.": "。导出结果将有 7 天有效期。",
            "Start export": "开始导出",
            "Recent exports": "近期导出",
            "New export": "新建导出",
            "We're preparing your export! We'll send you an email when it's finished.": "我们正在为您准备导出！我们完成后会发一封电子邮件。",
            "New exports cannot be requested while an export is currently in progress": "当前正在导出中，无法请求新的导出",
            "Resend email with link": "重新发送带有链接的邮件",
            "Download deleted": "导出内容已删除",
            "Job queued to delete file.": "正在排队删除文件的作业。",

            "Successor settings": "设置继任者",
            "designated below": "下面指定的",
            ", in the event of my death. I understand that this appointment of a successor does not override legally binding next-of-kin rules or estate laws of any relevant jurisdiction, and does not create a binding will.": "，在我死亡的情况下。我明白，这种指定继任者的做法并不凌驾于具有法律约束力的近亲规则或任何相关司法管辖区的遗产法，也不产生具有约束力的遗嘱。",
            "Learn more about account successors.": "了解更多关于帐户继任者的信息。",
            "Add Successor": "添加继任者",
            "Search by username, full name, or email address": "搜索用户名、全名、或电子邮箱",
            "You have not designated a successor.": "您还没有指定继任者。",

            "Delete account": "删除帐户",
            "Once you delete your account, there is no going back. Please be certain.": "您一旦删除了您的帐户，将再也无法恢复。请确认！",
                "Your account is currently an owner in these organizations:": "您的帐户目前是以下组织的所有者：", // 存在组织
                "You must": "您必须先",
                "remove yourself": "删除您自己",
                "transfer ownership": "转让所有权",
                "delete": "删除",
                "these organizations before you can delete your user.": "这些组织，您才可以删除您的用户。",
            "Delete your account": "删除帐户",
            "Are you sure you don’t want to just": "您确定不希望仅仅是",
            "downgrade your account": "降级您的帐户",
            "to a": "为",
            "FREE": "免费",
            "account? We won’t charge your payment information anymore.": "帐户吗？我们不会再收取您的支付信息。",
                "Are you sure you want to do this?": "您确定要这么做吗？",
                "This is extremely important.": "这是极其重要的。",
                "We will": "我们将",
                ", along with all of your forks, wikis, issues, pull requests, and GitHub Pages sites.": "以及您所有的复刻、Wiki、议题、拉取请求和 GitHub Pages 站点。",
                "You will no longer be billed, and after 90 days your username will be available to anyone on GitHub.": "您将不再被收取费用，并且 90 天后您的用户名将被 GitHub 上的任何人使用。",
                "For more help, read our article \"": "如需更多帮助，请阅读我们的文章 “",
                "Deleting your user account": "删除您的帐户",
                "\".": "”。",
                "Your username or email:": "您的用户名或电子邮箱：",
                "To verify, type": "为了验证，请输入",
                "below:": "在下面：",
                "Confirm your password:": "确认您的密码：",
                "Cancel plan and delete this account": "取消计划并删除此帐户",

    },
    "regexp": [ // 正则翻译
        [/is available\./, "可用。"],
        [/Username ([^ ]+) is not available\. Please choose another\. To submit a trademark claim, please see our/, "用户名 $1 不可用。请重新选择一个。要提交商标索赔，请看我们的"],
        [/By clicking \"Add Successor\" below, I acknowledge that I am the owner of the([^@]+@[^\n]+) account, and am authorizing GitHub to transfer content within that account to my GitHub Successor,/, "通过点击下面的 “添加继任者”，我承认我是 $1 帐户的所有者，并授权 GitHub 将该帐户内的内容转让给我的 GitHub 继任者。"],
        [/immediately delete all of your repositories \((\d+)\)/, "立即删除您所有的仓库（$1个）"],
    ],
};

I18N.zh["settings/appearance"] = { // 设置 - 外观
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Appearance 外观 https://github.com/settings/appearance
            "Theme preferences": "主题首选项",
            "Choose how GitHub looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.": "选择 GitHub 在您眼中的样子。选择单一主题，或与您的系统同步并自动在白天和夜晚的主题之间切换。",
            "Theme mode": "主题模式",
                "Single theme": "单一主题",
                "Sync with system": "与系统同步",
            "GitHub will use your selected theme": "GitHub 将使用您选择的主题",
            "GitHub theme will match your system active settings": "GitHub 主题将匹配您的系统设置",
            "Light default": "亮 - 默认",
            "Light high contrast": "亮 - 高对比",
            "Light Protanopia & Deuteranopia": "亮 - 近视和远视",
            "Light Tritanopia": "亮 - 蓝色盲",
            "Dark default": "暗 - 默认",
            "Dark high contrast": "暗 - 高对比",
            "Dark Protanopia & Deuteranopia": "暗 - 近视和远视",
            "Dark Tritanopia": "暗 - 蓝色盲",
            "Dark dimmed": "昏暗",
            "Day theme": "日间主题",
            "Night theme": "夜间主题",
            "Active": "激活",
            "This theme will be active when your system is set to “light mode”": "当您的系统设置为 “灯光模式” 时，该主题将被激活。",
            "This theme will be active when your system is set to “dark mode”": "当您的系统设置为 “暗夜模式” 时，该主题将被激活。",

            "Emoji skin tone preference": "表情符号肤色首选项",
            "Preferred default emoji skin tone": "默认的表情符号肤色",

            "Tab size preference": "制表符首选项",
            "Choose the number of spaces a tab is equal to when rendering code": "在渲染代码时，选择一个制表符等于多少个空格",
            "8 (Default)": "8 (默认)",

            "Markdown editor font preference": "Markdown 编辑器字体首选项",
            "Font preference for plain text editors that support Markdown styling (e.g. pull request and issue descriptions, comments.)": "支持 Markdown 样式的纯文本编辑器的字体首选项（例如拉取请求和议题描述、评论。）",
            "Use a fixed-width (monospace) font when editing Markdown": "编辑 Markdown 时使用固定宽度（等宽）字体",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/accessibility"] = { // 设置 - 无障碍
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Accessibility 无障碍 https://github.com/settings/accessibility
            "GitHub keyboard shortcuts": "GitHub 键盘快捷键",
            "General": "通常",
            "Character keys": "字符键",
                "GitHub shortcuts": "GitHub 快捷键",
                "that don't use modifier keys in their activation. For example, the": "，这些快捷键在激活时不使用修改键。例如，",
                "shortcut to navigate notifications, or": "快捷键来导航到通知，或",
                "to view context relevant shortcuts.": "查看与上下文相关的快捷键。",
                "Learn more about character key shortcuts": "了解更多关于字符快捷键的信息",

            "Command palette": "命令面板",
                "Modify the shortcuts to trigger the Command Palette for the default search mode and the command mode": "修改快捷键以触发默认搜索模式和命令模式的命令面板",
                "Search mode": "搜索模式",
                    "control + k or control + alt + k (default)": "control + k 或 control + alt + k (默认)",
                    "Disabled": "禁用",
                "Command mode": "命令模式",
                    "control + shift + k (default)": "control + shift + k (默认)",
                "Save keyboard shortcut preferences": "保存键盘快捷键首选项",

            // 顶部提醒
            "Keyboard shortcut preference successfully saved.": "键盘快捷键首选项已成功保存。",

            "Motion": "动态",
            "Autoplay animated images": "自动播放动态图片",
            "Select whether animated images should play automatically.": "选择是否需要自动播放动态图片。",
            "Sync with system": "与系统同步",
            "Adopts your system preference for reduced motion": "采用您的系统偏好以减少运动",
            "Enabled": "启用",
            "Automatically plays animated images": "自动播放动态图片",
            "Prevents animated images from playing automatically": "防止自动播放动态图片",
            "Save motion preferences": "保存动态首选项",

            // 顶部提醒
            "Motion preferences successfully saved.": "动态首选项已成功保存。",

            "Content": "内容",
            "Link underlines": "链接下划线",
            "Show or hide underlines for links within text blocks. Something isn't working as expected?": "显示或隐藏文本块内链接的下划线。有什么东西没有按预期工作吗？",
            "Let us know": "请告知我们",
            "Hide link underlines": "隐藏链接下划线",
            "Show link underlines": "显示链接下划线",

            // 顶部提醒
            "Link underline preferences successfully saved.": "链接下划线首选项已成功保存。",

            "Editor settings": "编辑器设置",
                "URL paste behavior": "URL 粘贴行为",
                "Select if URLs should be formatted on paste. You can use": "选择是否应在粘贴时格式化 URL。您可以使用",
                "to paste a link in the opposite way.": "以相反的方式粘贴链接。",
                "Formatted link": "格式化链接",
                    "Pasting a URL while having text selected will format to a Markdown link": "在选择了文本的情况下，粘贴 URL 将格式化为 Markdown 链接",
                "Plain text": "纯文本",
                    "Pasting a URL while having text selected will replace the text": "在选择了文本的情况下，粘贴 URL 将替换文本",
                "Save editor settings": "保存编辑器设置",
                    // 顶部提醒
                    "Paste behavior preferences successfully saved.": "粘贴行为首选项已成功保存。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/notifications"] = { // 设置 - 通知
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Notification center 通知 https://github.com/settings/notifications
            "Default notifications email": "默认邮件通知设置",
                "Choose where you'd like emails to be sent. You can add more email addresses. Use custom routes to specify different email addresses to be used for individual organizations.": "选择您希望将邮件发送到的邮箱。您可以添加更多电子邮件地址。使用自定义路由来指定用于各个组织的不同电子邮件地址。",
                "Custom routing": "自定义路由",

            "Automatically watch repositories": "自动关注仓库",
                "When you're given push access to a repository, automatically receive notifications for it.": "当您给一个仓库推送权限时，自动接收相关通知。",
            "Automatically watch teams": "自动关注团队",
                "Anytime you join a new team, you will automatically be subscribed to updates and receive notification when that team is @mentioned.": "当您加入新团队时，您将自动订阅更新，并在该团队 @提及 时收到通知。",

                "On": "开启",
                "Off": "关闭",

            "Subscriptions": "订阅",
                "Watching": "关注仓库",
                    "Notifications for all repositories, teams, or conversations you're watching.": "所有您正在关注的仓库、团队或对话的通知。",
                    "View watched repositories": "查看正在关注的仓库",
                    "Notify me:": "提醒我：",
                    "on GitHub, Email": "在 GitHub 上、电子邮件",
                    "On GitHub": "在 GitHub 上",

                "Participating, @mentions and custom": "参与、@提及和自定义",
                    "Notifications for the conversations you are participating in, or if someone cites you with an @mention. Also for all activity when subscribed to specific events.": "您正在参与的对话的通知，或者如果有人 @您。也适用于订阅特定事件时的所有活动。",

                "Customize email updates": "自定义电子邮件更新",
                    "Choose which additional events you'll receive emails for when participating or watching": "选择参与或关注时，您将收到哪些额外活动的电子邮件。",
                    "Reviews": "审查",
                    "Reviews, Pushes": "审查、推送",
                    "Reviews, Pushes, Comments": "审查、推送、评论",
                    "Reviews, Pushes, Comments, My own updates": "审查、推送、评论、自我更新",
                    "Pull Request reviews": "拉取请求审核",
                    "Pull Request pushes": "拉取请求推送",
                    "Comments on Issues and Pull Requests": "关于议题和拉取请求的评论",
                    "Includes your own updates": "包括您自己的更新",
                "Ignored repositories": "忽略的仓库",
                "You'll never be notified.": "您将永远不会收到通知。",
                "View ignored repositories": "查看忽略的仓库",

            "System": "系统",
                "Actions": "操作",
                    "Notifications for workflow runs on repositories set up with": "仓库的工作流程通知，设置在",
                    ". (": "。（",
                    "Failed workflows only": "仅工作流程失败时",
                    "Only notify for failed workflows": "只对失败的工作流程进行通知",

            "Dependabot alerts: New vulnerabilities": "Dependabot 警报：新漏洞",
                "When you're given access to": "当您获得",
                "Dependabot alerts": "Dependabot 警报",
                "automatically receive notifications when a new vulnerability is found in one of your dependencies.": " 访问权限时，当您的某个依赖关系中发现新的漏洞时，就会自动收到通知。",

            "Email weekly digest": "每周电子邮件摘要",
                "Email a weekly summary summarizing alerts for up to 10 of your repositories.": "通过电子邮件发送每周摘要，汇总最多 10 个仓库的警报。",
                "Don't send": "不发送",
                "Send weekly": "每周发送",
                "Send daily": "每日发送",

            "\'Deploy key\' alert email": "“部署密钥” 警报电子邮件",
                "When you are given admin permissions to an organization, automatically receive notifications when a new deploy key is added.": "当您获得组织的管理员权限时，会在添加新部署密钥时自动接收通知。",

        // 通知 自定义路由 https://github.com/settings/notifications/custom_routing
                "/ Custom Routing": "/ 自定义路由",
                    "You can send notifications to different": "您可以将通知发送到不同的",
                    "verified": "经确认",
                    "email addresses depending on the organization that owns the repository.": "电子邮件地址，根据拥有仓库的组织。",
                    "is your current default email for notifications.": "是您目前默认的通知邮箱。",

                    "No custom routes yet.": "尚无自定义路由",
                    "Add new route": "添加新路由",
                        "Pick organization": "挑选组织",
                        "Search organizations": "搜索组织",
                        "Select email": "选择邮箱",
                        "Saved": "已保存",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/billing"] = { // 设置 - 账单和计划
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],
        ...I18N.zh["orgs-settings-menu"]["static"], // 组织设置

        // 账单和计划 https://github.com/settings/billing/summary
            "Billing Summary": "账单摘要",
            "Your next payment": "您的下一次应付款",
            "This amount does not include the spend on usage of metered service. View your": "该金额不包括使用计量服务的支出。在下面查看您的",
            "usage this month": "本月使用情况",
            "below.": "。",

            // 组织设置
                "Current monthly bill": "当前月度账单",
                "Switch to yearly billing and save": "切换到按年计费并保存",

                "Next payment due": "下一次应付款",

            "Payment information": "支付信息",
            "Manage spending limit": "管理支出限额",
            "View payment history": "查看支付记录",
            "Switch to yearly billing": "切换到按年计费",

            "Current plan": "当前计划",
                "Compare all plans": "比较所有计划",

                "GitHub Free": "GitHub 免费",
                "The basics for all developers": "基础计划（所有开发者）",

                "The basics for organizations and developers": "组织和开发者的基本计划", // 组织设置
                "Unlimited public/private repos": "无限的公共/私有仓库",
                "Unlimited collaborators": "无限协作者",
                "2,000 Actions minutes/month": "2,000 次操作 分钟/月",
                "500MB of Packages storage": "500MB 的包存储空间",
                "120 core-hours of Codespaces compute": "120 个核心小时的代码空间计算",
                "15GB of Codespaces storage": "15GB 的代码空间存储",
                "Community support": "社区支持",

                "Not included:": "不包含：",
                "Protected branches on all repos": "所有仓库上的受保护分支",
                "Access to Codespaces": "访问代码空间",
                "Multiple reviewers in pull requests": "拉取请求中多个审阅者",
                "Required status checks": "所需的状态检查",
                "Code owners": "代码所有者",
                "Required reviewers": "所需的审阅者",
                "Pages for static website hosting": "静态网站页面托管",
                "Web-based support": "基于网络的支持",
                "See all features and compare plans": "查看所有功能并比较计划",

            "Start your first organization account": "开设您的第一个组织帐户",
            "With CI/CD, Dependabot, and the world's largest developer community, GitHub gives your team everything they need to ship better software faster": "借助 CI/CD、Dependabot 和世界上最大的开发者社区，GitHub为您的团队提供了他们所需的一切，以更快地发布更好的软件。",
            "Create an organization": "创建组织",


            "Add-ons": "附加组件",
                // "GitHub Copilot": "",
                    "Your AI pair programmer": "您的人工智能助理程序员",
                    "Your AI powered pair programmer": "您的人工智能助理程序员",
                    "Enable GitHub Copilot": "启用 GitHub Copilot",
                    "GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time, right from your editor": "GitHub Copilot 使用 OpenAI Codex 实时在您的编辑器中提供代码和整个函数建议",

                     // 组织设置
                    "Buy Copilot for Business": "购买 GitHub Copilot 商业版",
                    "Copilot for Business": "GitHub Copilot 商业版",
                    "GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time, right from your editor. $19/month/user.": "GitHub Copilot 使用 OpenAI Codex 实时在您的编辑器中提供代码和整个函数建议。每月 $19/用户。",

                // 组织设置
                // [/In addition to your personal account, you have (\d+) organizations? account./, "除了个人帐户外，您还有 $1 个组织帐户。"],
                "Manage your organization accounts": "管理您的组织帐户",
                    "Create a new organization": "创建新组织",

            "Usage this month": "本月使用情况",
                "Get usage report": "获取使用报告",

                "See billing documentation": "查看计费政策",
                "monthly spending limit": "每月支出限额",
                "monthly spending limit |": "每月支出限额 |",  // 组织设置
                "Set up a spending limit": "设置支出限额",

            "GitHub Sponsors": "GitHub 赞助",
                "Connect with the community that builds the tools you use": "与构建您使用的工具的社区联系",
                "Start sponsoring": "开始赞助",
                "You're currently not sponsoring anyone.": "您目前没有赞助任何人。",
                "Learn more about GitHub Sponsors": "了解更多关于 GitHub 赞助",

            "GitHub Marketplace": "GitHub 市场",
                "Change plan": "更改计划",
                "Cancel plan": "取消计划",
                "Do you have any questions? Contact": "您有任何问题吗？请联系",

            // 组织设置
            "Billing Management": "账单管理",
                "Receipts are sent to billing managers and email recipients.": "收据会被发送给账单管理员和邮件接收者。",

                "Billing managers": "账单管理员",
                    "You have not invited any billing managers": "您尚未邀请任何账单管理员",
                    "Invite": "邀请",

                "Email recipients": "邮件接收者",
                    "Add": "添加",
                    "Primary": "主帐户",

                    // 编辑账单电子邮箱对话框
                        "Edit billing email address": "编辑账单电子邮箱",
                        "Billing primary email": "账单主帐户邮箱",
                        "Update": "更新",

                    // 添加账单接收者对话框
                        "Add billing recipient": "添加账单接收者",
                        "Add billing recipient email": "添加账单接收者邮箱",

                "Metered billing via Azure": "通过 Azure 计量计费",
                    "Add Azure Subscription": "添加 Azure 订阅",
                    "To manage metered billing for this account through Microsoft Azure an Azure Subscription ID must be added to your account.": "通过 Microsoft Azure 管理此帐户的计量计费，必须将 Azure 订阅 ID 添加到您的帐户中。",

        // 支付信息 https://github.com/settings/billing/payment_information
            "Billing & plans": "账单和计划",
            "/ Payment information": "/ 支付信息",

            "Please update your billing information in order to add a payment method.": "请更新您的账单信息，以便添加支付方式。",

            "Billing information": "账单信息",
            // 组织设置
            "An organization owner's personal billing information must be linked with this organization account.": "组织所有者的个人账单信息必须与该组织账户关联。",
            "Update your billing information": "更新您的账单信息",
            "to be able to link it with this organization.": "以便将其与该组织关联。",

            "First name": "名字",
            "Last name": "姓氏",
            "Address (P.O. box, company name, c/o)": "地址（邮政信箱、公司名称、c/o）",
            "Address line 2 (Apartment, suite, unit)": "地址第 2 行（公寓、套房、单元）",
            "City": "城市",
            "Postal/Zip code": "邮政编码",
                "Required for certain countries": "某些国家/地区需要",
            "Country/Region": "国家/地区",
                "Choose your country": "选择您所在的国家/地区",
            "State/Province": "州/省",
            "You have not added any billing information.": "您尚未添加账单方式。",

            "Payment method": "支付方式",
            "Add Information": "添加信息",
            "You have not added a payment method.": "您尚未添加支付方式。",

            "Last payment": "最后一次支付",
            "You have not made any payments.": "您尚未支付任何款项。",

            "Coupon": "优惠劵",
            "Redeem a coupon": "兑换优惠券",
            "You don’t have an active coupon.": "您没有有效的优惠券。",

            "Additional information": "附加信息",
                "Add specific contact or tax information to your receipts, like your full business name, VAT/GST identification number, or address of record here. We’ll make sure it shows up on every receipt.": "在您的收据上添加具体的联系方式或税务信息，例如您的企业全称、VAT/GST 识别号码或记录地址。我们将确保它显示在每张收据上。",
            "Add information": "添加信息",
            "No additional information added to your receipts.": "您的收据上没有添加任何额外的信息。",

            // 对话框
            "Extra billing information": "额外的账单信息",
            "This information will appear on all your receipts.": "此信息将出现在您的所有收据上。",
            "For your security, do not include any confidential or financial information (like credit card numbers).": "为了您的安全，请勿包含任何机密或财务信息（如信用卡号）。",
            "Full business name or address of record": "企业全称或记录地址",
            "Save contact information": "保存联系信息",

        // 支付方式 https://github.com/settings/billing/payment
            "/ Payment method": "/ 支付方式",
            "Loading payment information…": "正在加载支付信息…",
            "Pay with": "支付方式：",
                "Credit card": "信用卡",
                    "Card Number": "卡号",
                    "Expiration Date": "终止日期",
                        "- Select One -": "- 选择一个 -",
                    "Address 1": "地址 1",
                    "Address 2": "地址 2",
                    "Country": "国家/地区",
                    "City": "城市",
                    "State": "州/省",
                    "Postal Code": "邮政编码",
                    "Submit": "提交",
                "PayPal account": "PayPal 帐户",
                    "Sign in to": "登录到",
                    "Connecting to PayPal…": "正在连接到 PayPal…",
            "Back to billing settings": "返回账单设置",
            "There are no upcoming charges to your account.": "您的帐户没有即将发生的费用。",

        // 支出限额 https://github.com/settings/billing/spending_limit
            "/ Monthly spending limits": "/ 每月支付限额",
            "/ Monthly spending limit": "/ 每月支付限额", // 组织设置
            "Set up a monthly spending limit. You can adjust it at any time. Read more information about": "设置每月支出限额。您可以随时调整它。阅读更多关于",
            "spending limits": "支付限额",
            "Actions spending limits": "GitHub 操作支付限额", // 组织设置
            "Packages spending limits": "软件包支付限额", // 组织设置

            "Payment method is missing": "缺失支付方式",
            "You can’t increase the spending limits until you set up a valid payment method.": "在您设置有效的支付方式之前，您无法提高支出限额。",
            "Add payment method": "添加支付方式",

            "Actions & Packages": "操作与软件包",
            "Limit spending": "限制支出",
                "Set up a spending limit on a monthly basis": "设置每月支出限额",
                "Update limit": "更新限额",
                // [/Leaving it at (\$\d+\.\d{2}) will avoid any extra expenses/, "将其限制在 $1 美元将避免任何额外的费用。"],
            "Unlimited spending": "不限制支出",
                "Pay as much as needed to keep Actions & Packages running": "按需支付，以保持操作和软件包的运行",

            "Email alerts": "电子邮件提醒",
            "Receive email notifications when usage reaches 75%, 90% and 100% thresholds.": "当使用率达到 75%、90% 和 100% 的阈值时，会收到电子邮件通知。",
            "Included resources alerts": "包含资源提醒",
            "Spending limit alerts": "支出限额提醒",

            // 代码空间
                "Pay as much as needed to keep Codespaces running": "按需支付，以保持代码空间的运行",

        // 账单历史 https://github.com/account/billing/history
            "/ Payment history": "/ 支付历史",
            "Amounts shown in USD": "以美元显示的金额",

        // 用户计划 https://github.com/account/billing/plans
            "Compare plans": "比较计划",
            "Free": "免费",
                "All the basics": "所有基础",
            "Pro": "专业",
                "Advanced tools for private repos": "用于私人仓库的高级工具",

        // 组织设置 邀请账单管理员 '/organizations/<org-login>/billing_managers/new'
            "Billing": "账单",
            "/ Add a billing manager": "/ 添加账单管理员",
            "A": " ",
            "billing manager": "账单管理员",
            "is a user who manages the billing settings of your organization.": "是管理您组织的账单设置的用户。",
            "will": "会",
            "will not": "不会",
            "have the ability to:": "具备以下能力：",
                "Change the billing plan": "更改账单计划",
                "Add, update, or remove payment methods": "添加、更新或删除支付方式",
                // "": "查看支付记录",
                "Download, and receive receipts": "下载并接收收据",
                "View a list of billing managers": "查看帐单管理员列表",
                "Invite additional billing managers": "邀请其他账单管理员",
                "Remove other existing billing managers": "移除其他现有的账单管理员",
                "Start, modify, or cancel sponsorships": "开始、修改或取消赞助",
            "be able to:": "能够：",
                "Create or access repositories in your organization": "在您的组织中创建或访问仓库",
                "See private members of your organization": "查看您组织的私人成员",
                "Be seen in the list of organization members": "在组织成员列表中可见",
                "Use the organization’s payment method": "使用组织的支付方式",
                "Purchase, edit, or cancel Marketplace subscriptions": "购买、编辑或取消市场订阅",

            "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
            "Send invitation": "发送邀请",

    },
    "regexp": [ // 正则翻译
        [/In addition to your personal account, you have (\d+) organizations? account./, "除了个人帐户外，您还有 $1 个组织帐户。"],
        [/Leaving it at (\$\d+\.\d{2}) will avoid any extra expenses/, "将其限制在 $1 美元将避免任何额外的费用。"],
        [/isn’t a GitHub member/, "不是 GitHub 成员"], // 组织设置
    ],
};
I18N.zh["account/billing/history"] = I18N.zh["settings/billing"];
I18N.zh["orgs/settings/billing"] = I18N.zh["settings/billing"];
I18N.zh["orgs/billing_managers/new"] = I18N.zh["settings/billing"];
I18N.zh["orgs/billing/history"] = I18N.zh["settings/billing"];

I18N.zh["settings/emails"] = { // 设置 - 电子邮箱
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Emails 电子邮箱 https://github.com/settings/emails
            "Email settings": "电子邮箱设置",
            "Primary": "主帐户",
            "This email will be used for account-related notifications and can also be used for password resets.": "该电子邮箱将用于与帐户有关的通知，也可用于密码重置。",
            "Not visible in emails": "在电子邮件中不可见",
            "Visible in emails": "在电子邮件中可见",
                "This email may be used as the 'author' or 'committer' address for web-based Git operations, e.g., edits and merges.": "该电子邮箱可用作基于 Web 的 Git 操作（例如：编辑和合并）的 ‘作者’ 或 ‘提交者’ 地址。",
            "Receives notifications": "接收通知",
            "This email address is the default used for GitHub notifications, i.e., replies to issues, pull requests, etc.": "该电子邮箱默认用于 GitHub 的通知，即对议题和拉取请求的回复，等等。",
            "At least one email is required.": "至少需要一个电子邮箱。",
            // 删除按钮 提醒信息
                "Are you sure you want to remove this email from your account? Once removed, commits attributed to this email address will no longer be associated with your account. One of your other emails will become your primary address.": "您确定要从您的帐户中删除此电子邮箱吗？删除后，归因于该电子邮箱地址的提交将不再与您的帐户相关联。您的其他电子邮箱之一将成为您的主要地址。",

            "Add email address": "添加电子邮箱",
            "Email address": "电子邮箱",
                // 顶部提醒
                "Resend verification email": "重新发送验证邮件",
                "Your email was verified.": "您的电子邮箱地址验证成功！",

            "Primary email address": "主电子邮箱",
            // 未电子邮箱隐私
            "will be used for account-related notifications and can be used for password resets.": "将用于与帐户相关的通知，并可用于密码重置。",
            // 电子邮箱隐私
            "Because you have email privacy enabled,": "因为您已经启用了电子邮箱隐私，",
            "will be used for account-related notifications as well as password resets.": "将用于与帐户相关的通知以及密码重置。",
            "will be used for web-based Git operations, e.g., edits and merges.": "将用于基于 Web 的 Git 操作，例如编辑和合并。",
            // 顶部提醒
            "Your primary email was changed to": "您的主电子邮箱已更改为",
            ". Your default notification email address is still set to": "。您的默认通知电子邮箱仍然设置为",
            ". Would you like to update that as well?": "。您也想更新它吗？",
            "Yes， update my notification email": "是的，更新我的通知电子邮箱",

            "Backup email address": "备用电子邮箱",
            "Your backup GitHub email address will be used as an additional destination for security-relevant account notifications and can also be used for password resets.": "您的备用 GitHub 电子邮箱将额外的用作安全相关帐户通知，也可以用于密码重置。",
            "Allow all verified emails": "允许所有已验证的电子邮箱",
                // 顶部提醒
                "All verified emails can now be used for password resets.": "所有已验证的电子邮箱现在均可用于密码重置。",
            "Only allow primary email": "仅允许主电子邮箱",
                // 顶部提醒
                "Only your primary email address can now be used for password resets.": "现在只有您的主电子邮箱可用于密码重置。",
            "Please add a verified email, in addition to your primary email, in order to choose a backup email address.": "请在您的主电子邮箱之外，添加一个经验证的电子邮箱，以便选择一个备用电子邮箱。",

            "Keep my email addresses private": "保持我的电子邮箱地址的私密性",
                // 顶部提醒
                "Your primary email address is now public. To select which email to display on your profile, visit": "您的主电子邮箱地址现已公开。要选择在您的个人资料中显示哪个电子邮箱，请访问",
                "profile settings.": "个人资料设置。",
                "Your primary email address is now private. If you previously made your email public, we’ve removed it from your profile.": "您的主电子邮箱地址现已设为私密。如果您以前公开过您的电子邮箱，我们已经从您的个人资料中删除了它。",
            "We’ll remove your public profile email and use": "我们将删除您的公开个人资料中的电子邮箱，并使用",
            "when performing web-based Git operations (e.g. edits and merges) and sending email on your behalf. If you want command line Git operations to use your private email you must": "执行基于 Web 的 Git 操作（例如：编辑和合并）并以您的名义发送电子邮件。如果您想在命令行 Git 操作中使用您的私人电子邮箱，您必须",
            "set your email in Git": "在 Git 中设置您的电子邮箱",
            "Commits pushed to GitHub using this email will still be associated with your account.": "使用此电子邮箱推送到 GitHub 的提交仍将与您的帐户相关联。",

            "Block command line pushes that expose my email": "阻止在命令行推送中暴露我的电子邮箱",
                // 顶部提醒
                "Commits pushed with a private email will no longer be blocked.": "使用私人电子邮箱推送的提交将不再被阻止。",
                "Commits pushed with a private email will now be blocked and you will see a warning.": "使用私人电子邮箱推送的提交将被阻止，您会看到一个警告。",
            "When you push to GitHub, we’ll check the most recent commit. If the author email on that commit is a private email on your GitHub account, we will block the push and warn you about exposing your private email.": "当您推送到 GitHub 时，我们会检查最近的提交。如果该提交的作者电子邮箱是您 GitHub 帐户上的私人电子邮箱，我们会阻止推送并警告您不要暴露您的私人电子邮箱。",

            "Email preferences": "邮件首选项",
                "Subscriptions through our various marketing platforms. Each email address has its own subscriptions.": "通过我们的各种营销平台进行订阅。每个电子邮件地址都有自己的订阅。",
                "Manage": "管理",

        // 订阅偏好 https://github.com/settings/emails/subscriptions
            "No subscriptions found": "未找到订阅信息",
            "Save subscription preferences": "保存订阅首选项",
            "Back to email settings": "返回电子邮件设置",

    },
    "regexp": [ // 正则翻译
        [/This email will not be used as the 'from' address for web-based Git operations, e\.g\., edits and merges. We will instead use ([^@]+@users.noreply.github.com)\./, "该电子邮箱不会用作基于 Web 的 Git 操作（例如编辑和合并）的 “发件人” 地址。我们将改为使用 $1。"],
        [/Your primary email was changed to ([^@]+@[^\n]+)\./, "您的主电子邮箱已更改为 $1"],
        [/Subscription preferences for ([^@]+@[^\n]+)/, "$1 的订阅偏好"],
    ],
};

I18N.zh["settings/security"] = { // 设置 - 密码和身份身份验证
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 密码和身份身份验证 - 帐户安全 https://github.com/settings/security
            "Change password": "更改密码",
            "Old password": "旧密码",
            "New password": "新密码",
            "Confirm new password": "确认新密码",
            "Make sure it's": "请确保",
            "at least 15 characters": "至少需要15个字符",
            "OR": " 或者",
            "at least 8 characters": "至少需要8个字符",
            "including a number": "包括数字",
            "and a lowercase letter": "和小写字母",
            "Password is too short (minimum is 8 characters)": "密码太短（最少8个字符）",
            "Password is too short (minimum is 8 characters), needs at least 1 lowercase letter, and is in a list of passwords commonly used on other websites": "密码太短（最少8个字符），至少需要1个小写字母，而且已在其他网站常用密码列表中",
            "Password is too short (minimum is 8 characters), needs at least 1 lowercase letter, cannot include your login, and is in a list of passwords commonly used on other websites": "密码太短（最少为8个字符），至少需要1个小写字母，而且不能包括您的登录名，以及在其他网站常用的密码列表中。",
            "Password is too short (minimum is 8 characters), needs at least 1 number, cannot include your login, and is in a list of passwords commonly used on other websites": "密码太短（最少8个字符），需要至少1个数字，不能包含您的登录名，以及在其他网站常用的密码列表中",
            "Password is too short (minimum is 8 characters) and is in a list of passwords commonly used on other websites": "密码太短（最少为8个字符），而且已在其他网站常用的密码列表中。",
            "Password needs at least 1 lowercase letter and is in a list of passwords commonly used on other websites": "密码需要至少 1 个小写字母，而且已在其他网站常用的密码列表中",
            "Password is in a list of passwords commonly used on other websites": "密码在其他网站常用的密码列表中",
            "Update password": "更新密码",
            "I forgot my password": "我忘记了我的密码",

            "Passkeys": "通行密钥",
                "Passwordless sign-in with passkeys": "使用通行密钥进行无密码登录",
                "Passkeys are a password replacement that validates your identity using touch, facial recognition, a password, or a PIN. Passkeys can be used for sign-in as a simple and secure alternative to your password and two-factor credentials.": "通行密钥是一种密码替代品，可通过触摸、面部识别、密码或 PIN 验证您的身份。通行密钥可用于登录，作为密码和双重身份验证的一种简单而安全的替代方式。",
                "This browser or device does not fully support passkeys - you may be able to use a passkey from another device.": "此浏览器或设备不完全支持通行密钥 - 您可以尝试使用来自其他设备的通行密钥。",
                "Add a passkey": "添加通行密钥",

                "Passkeys are a password replacement that validates your identity using touch, facial recognition, a device password, or a PIN.": "通行密钥是一种密码替代品，可通过触摸、面部识别、设备密码或 PIN 验证您的身份。",
                "This browser or device is not reporting full passkey support, but you may be able to use a passkey from a nearby device.": "此浏览器或设备不完全支持通行密钥，但您可以尝试使用附近设备的通行密钥。",
                "Your passkeys": "您的通行密钥",
                "Seen from this browser": "该浏览器中查看",
                "| Last used": "| 最后使用",
                // | Last used less than 1 小时之前
                "Edit passkey nickname": "编辑密钥昵称",
                // [/Delete `([^ ]+)` passkey/, "删除 “$1” 通行密钥"],

                // 删除密钥对话框
                    "Delete passkey?": "删除通行密钥？",
                    // [Are you sure you want to delete your `([^ ]+)` passkey?/, "您确定要删除您的 “$1” 通行密钥吗？"],
                    "You will no longer be able to use it to sign-in to your account.": "您将无法再使用它登录您的帐户。",
                    "Note: You may continue to see this passkey as an option during sign-in until you also delete it from your browser, device or associated account's password management settings.": "注意：您可能会在登录过程中继续看到此通行密钥作为一个选项，直到您将其从浏览器、设备或关联帐户的密码管理设置中删除。",
                    "Deleting…": "删除中…",

            // 双重身份验证
                // 顶部提醒
                    "You can now manage your two-factor authentication methods from this page.": "您现在可以从此页面管理您的双重身份验证方法。",
                    "Two-factor authentication successfully disabled.": "成功禁用双重身份验证。",
                    "SMS/Text message successfully configured.": "短信/文本信息配置成功。",

            "Two-factor authentication": "双重身份验证",
                "Two-factor authentication is not enabled yet.": "尚未启用双重身份验证。",
                "Enable two-factor authentication": "启用双重身份验证",

                "Because of your contributions on GitHub, two-factor authentication is required for your account. Thank you for helping keep the ecosystem safe!": "基于您在 GitHub 上的贡献，您的帐户需要双重身份验证。感谢您帮助维护生态系统安全！",
                "Learn more about our two-factor authentication initiative": "了解更多关于我们的双重身份验证的倡议",

                "Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.": "双重身份验证不仅仅要求密码登录，还为您的帐户增加了一层额外的安全性。",
                "Learn more about two-factor authentication": "了解更多关于双重身份验证的信息",


                "Enable": "启用",
                "Enabled": "启用",
                    "Two-factor authentication is required for at least one organization or enterprise account you're affiliated with.": "至少有一个您所属的组织或企业账户需要进行双重身份验证。",
                "Disable": "停用",

            "Preferred 2FA method": "首选 2FA 方法",
                "Set your preferred method to use for two-factor authentication when signing into GitHub.": "设置登录 GitHub 时用于双重身份验证的首选方法。",

            "Two-factor methods": "双重身份验证方式",
                "Configured": "已配置",

                "Authenticator app": "身份验证器应用",
                    "Use an authentication app or browser extension to get two-factor authentication codes when prompted.": "在出现提示时，使用身份验证应用或浏览器扩展获取双重身份验证码。",
                    "Use an authentication app or browser extension to generate one-time codes.": "使用身份验证应用或浏览器扩展生成一次性代码。",

                    "Manage Authenticator app": "管理身份验证器应用",

                    "Authenticator apps and browser extensions like": "身份验证器应用和浏览器扩展，例如",
                    ", etc. generate one-time passwords that are used as a second factor to verify your identity when prompted during sign-in.": "等生成一次性密码，在登录过程中出现提示时用作第二个因素来验证您的身份。",

                    "Scan the QR code": "扫描二维码",
                    "Re-scan the QR code": "重新扫描二维码",
                    "Use an authenticator app or browser extension to scan.": "请使用身份验证器应用或浏览器扩展进行扫描。",
                    "Learn more about enabling 2FA": "了解更多关于启用 2FA 的信息",

                    "Unable to scan? You can use the": "无法扫描？您可以使用",
                    "setup key": "设置密钥",
                    "to manually configure your authenticator app.": "手动配置您的身份验证器应用。",
                        "Your two-factor secret": "您的双因素密钥",

                    "Verify the code from the app": "验证来自身份验证器应用的验证码",
                    "Two-factor code verification failed. Please try again.": "双重身份验证码验证失败。请重试。",

                "SMS/Text message": "短信/文字信息",
                    "Manage SMS/Text message": "管理短信/文字信息",

                    "Get one-time codes sent to your phone via SMS to complete authentication requests.": "通过短信向您的手机发送一次性代码，以完成认证请求。",

                    "Get authentication codes by SMS on your mobile phone when signing into GitHub. Make sure that": "登录 GitHub 时通过手机短信获取验证码。确保",
                    "your country or region is supported": "支持您的国家/地区",
                    "for SMS delivery.": "用于短信发送。",

                    "Verify account": "验证账户",
                    "Before setting up SMS, please verify that you're a human.": "在设置短信之前，请验证您是人类。",

                    "Country code": "国家代码",
                    "Your phone number": "您的手机号码",
                    "Send authentication code": "发送验证码",
                    "Sent. It may take a minute for the SMS to arrive.": "已发送。短信可能需要一分钟时间才能送达。",
                    "Verify the code sent to your phone": "验证发送到您手机的验证码",

                    // [/You will receive one-time codes at this phone number:/, "您将通过以下电话号码收到一次性验证码："], // 已设置短信/文字信息

                "Security keys": "安全密钥",
                    "Security keys are hardware devices that can be used as your second factor of authentication.": "安全密钥是一种硬件设备，可以作为您的第二个验证步骤。",
                    "Hide": "隐藏",
                    "No security keys": "没有安全密钥",

                    "Register new security key": "注册新安全密钥",
                    "Enter a nickname for this security key": "输入安全密钥的昵称",
                    "Waiting for input from browser interaction...": "等待来自浏览器交互的输入...",
                    "Security key registration failed.": "安全密钥注册失败。",
                    "Try again": "请重试",

                "GitHub Mobile": "GitHub Mobile",
                    "GitHub Mobile can be used for two-factor authentication by installing the GitHub Mobile app and signing in to your account.": "通过安装 GitHub Mobile 应用并登录帐户，可以使用 GitHub Mobile 来进行双重身份验证。",
                    "Manage GitHub Mobile": "管理 GitHub Mobile",

                    // [/(\d+) devices?/, "$1 设备"], // 设置--> 密码和身份验证页
                    "Show": "显示",

            "Recovery options": "恢复选项",
                "Recovery codes": "恢复码",
                    "Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.": "恢复码可用于在您无法访问设备且无法接收双重身份验证码的情况下访问您的帐户。",
                    "Viewed": "已查看",
                    "View": "查看",

            // 授权访问 sudo 模式身份验证
                "Confirm access": "授权访问",
                "Authentication code": "验证码",
                    "More information about sudo mode authentication": "更多关于 sudo 模式身份验证的信息",
                "Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.": "打开您的双重身份验证器 (TOTP) 应用或浏览器扩展以查看您的身份验证码。",
                "Verify": "验证",
                "Verify": "验证",
                "Verifying…": "验证中…",
                "Your authentication code has been sent.": "您的验证码已发送。",

                "Having problems?": "有问题吗？",
                "Use GitHub Mobile": "使用 GitHub Mobile",
                "Use your passkey": "使用您的通行密钥",
                "Use your authenticator app": "使用您的身份验证器应用",
                "Use your password": "使用您的密码",

                "GitHub Mobile": "GitHub Mobile",
                "Creating a verification request for your GitHub Mobile app.": "为您的 GitHub Mobile 应用创建验证请求。",
                "We sent you a verification request on your GitHub Mobile app. Enter the digits shown below to enter sudo mode.": "我们向您的 GitHub Mobile 应用发送了一个验证请求。输入下面显示的数字以进入 sudo 模式。",
                "We could not verify your identity": "我们无法核实您的身份",
                "Retry": "请重试",

                "Password": "密码",
                "Forgot password?": "忘记密码？",
                "Confirm": "确认",

                "Passkey": "通行密钥",
                "When you are ready, authenticate using the button below.": "准备好后，请使用下面的按钮进行身份验证。",
                "This browser or device does not fully support passkeys.": "此浏览器或设备不完全支持通行密钥。",
                "Use passkey": "使用通行密钥",

                "Authentication failed.": "认证失败。",
                "Retry passkey": "重试通行密钥",

                "Unable to verify with your passkey?": "无法验证您的通行密钥？",

    },
    "regexp": [ // 正则翻译
        [/(\d+) devices?/, "$1 个设备"], // 设置--> 密码和身份验证页
        [/You will receive one-time codes at this phone number:/, "您将通过以下电话号码收到一次性验证码："], // 已设置短信/文字信息
        [/Delete `([^ ]+)` passkey/, "删除 “$1” 通行密钥"],
        [/Are you sure you want to delete your `([^ ]+)` passkey?/, "您确定要删除您的 “$1” 通行密钥吗？"],
    ],
};

I18N.zh["settings/auth"] = {
    "static": { // 静态翻译

        // 查看恢复码 https://github.com/settings/auth/recovery-codes
            "Two-factor recovery codes": "双重身份验证恢复码",
                "Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.": "恢复码可用于在您无法访问设备且无法接收双重身份验证码的情况下访问您的帐户。",

            "Recovery codes": "恢复码",
                "Keep your recovery codes as safe as your password. We recommend saving them with a password manager such as": "保持您的恢复码与您的密码一样安全。我们建议使用密码管理器保存它们，例如",
                "Keep your recovery codes in a safe spot.": "将您的恢复码保存在一个安全的地方。",
                "These codes are the last resort for accessing your account in case you lose your password and second factors. If you cannot find these codes, you": "这些恢复码是在您丢失密码和第二要素的情况下访问您账户的最后手段。如果您找不到这些恢复码，您",
                "will": "将",
                "lose access to your account.": "无法访问您的帐户。",

                "Download": "下载",
                "Print": "打印",
                "Copy": "复制",

            "Generate new recovery codes": "生成新的恢复码",
                "When you generate new recovery codes, you must download or print the new codes.": "当您生成新的恢复码时，您必须下载或打印新恢复码。",
                "Your old codes won't work anymore.": "您的旧恢复码将失效。",

            "Back to settings": "返回设置",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/sessions"] = {
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 会话详情 https://github.com/settings/sessions
            "Web sessions": "网络会话",
            "GitHub Mobile can be used to verify your identity when signing in from a new device and as a two-factor authentication method.": "GitHub Mobile 可用于从新设备登录时验证您的身份，并作为一种双重身份验证方法。",
            "Learn more about authentication with GitHub Mobile.": "了解更多关于 GitHub Mobile 身份验证的信息。",
            "To get started, install GitHub Mobile for": "首先，安装 GitHub Mobile 适用于",
            "and sign in to your account.": "并登录您的帐户。",

            "This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.": "这是已登录您帐户的设备列表。 撤销任何您不认识的会话。",
            "See more": "查看更多",
            "Your current session": "您当前的会话",
            "Last accessed on": "最后访问日期：",

            "GitHub Mobile sessions": "GitHub Mobile 会话",
            "This is a list of devices that have logged into your account via the GitHub Mobile app. Revoke any session that you do not recognize or you can": "这是已通过 GitHub Mobile 应用登录到您帐户的设备列表。撤销任何您不认识的会话，或者您可以",
            "revoke": "撤消",
            "your GitHub Mobile app authorization to sign out of all your devices.": "您的 GitHub Mobile 应用授权，以登出您的所有设备。",
            "Revoke": "撤消",
            "Registered -": "注册于 -",
            "Last accessed -": "最后访问 -",
            "Last used for authentication -": "最后一次认证 -",
            "Never used": "未使用",

        // 会话详情 https://github.com/settings/sessions/<id>
            "Session details": "会话详情",
            "Revoke session": "撤销会话",
            "Device:": "设备：",
            "Last location:": "最后的位置：",
            "Signed in:": "登录：",
            "View all sessions": "查看所有会话",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/keys"] = { // 设置 - SSH 与 GPG 公钥
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // SSH and GPG keys SSH 与 GPG 公钥 https://github.com/settings/keys
            "SSH keys": "SSH 密钥",
            "New SSH key": "新建 SSH 密钥",
            "Authentication Keys": "认证密钥",
            "There are no SSH keys associated with your account.": "没有与您的帐户关联的 SSH 密钥。",
            "This is a list of SSH keys associated with your account. Remove any keys that you do not recognize.": "这是与您的帐户相关的 SSH 密钥的列表。删除任何您无法识别的密钥。",
            "Check out our guide to": "请看我们的指南",
            "generating SSH keys": "生成 SSH 密钥",
            "or troubleshoot": "或解决",
            "common SSH problems": "常见的 SSH 问题",

            "GPG keys": "GPG 密钥",
            "New GPG key": "新建 GPG 密钥",
            "There are no GPG keys associated with your account.": "没有与您的帐户关联的 GPG 密钥。",
            "This is a list of GPG keys associated with your account. Remove any keys that you do not recognize.": "这是与您的帐户相关的 GPG 密钥的列表。删除任何您无法识别的密钥。",

            "Email address:": "电子邮件地址：",
            "Key ID:": "密钥 ID：",
            "Subkeys:": "子密钥：",
            "Added": "添加于",

            "Learn how to": "了解如何",
            "generate a GPG key and add it to your account": "生成 GPG 密钥并将其添加到您的帐户",

            "Vigilant mode": "警戒模式",
            "Flag unsigned commits as unverified": "将未签名的提交标记为未验证",
            "This will include any commit attributed to your account but not signed with your GPG or S/MIME key.": "这将包括任何归属于您的帐户但没有用您的 GPG 或 S/MIME 密钥签名的提交。",
            "Note that this will include your existing unsigned commits.": "请注意，这将包括您现有的未签名的提交。",
            "Learn about vigilant mode": "了解警戒模式",

            // SSH 密钥删除 对话框
            "Are you sure you want to delete this SSH key?": "您确定要删除此 SSH 密钥吗？",
            "This action": "该操作",
            "CANNOT": "不能",
            "be undone. This will permanently delete the SSH key and if you’d like to use it in the future, you will need to upload it again.": "被撤销。这将永久地删除 SSH 密钥，如果您想在未来使用它，您将需要再次上传它。",
            "I understand, delete this SSH key": "我明白了，删除此 SSH 密钥",

            // GPG 密钥删除 对话框
            "Are you sure you want to delete this GPG key?": "您确定要删除此 GPG 密钥吗？",
            "be undone. This will permanently delete the GPG key, and if you’d like to use it in the future, you will need to upload it again.": "被撤销。这将永久地删除 GPG 密钥，如果您想在未来使用它，您将需要再次上传它。",
            "Any commits you signed with this key will become unverified after removing it.": "删除后，您使用此密钥签名的任何提交都将变成未验证。",
            "I understand, delete this GPG key": "我明白了，删除此 GPG 密钥",
            "Okay, you have successfully deleted that key.": "好的，您已成功删除该密钥。",

            // 顶部提醒
            "Key is invalid. You must supply a key in OpenSSH public key format": "密钥无效。您必须提供 OpenSSH 公钥格式的密钥",
            "We got an error doing that.": "我们在这样做时出错了。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/ssh"] = { // 设置 - SSH 与 GPG 公钥 - 添加 SSH 公钥
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 添加 SSH 公钥 https://github.com/settings/ssh/new
            "Add new SSH Key": "添加新 SSH 密钥",
            "Title": "标题",
            "Key type": "密钥类型",
                "Authentication Key": "认证密钥",
                "Signing Key": "签名密钥",
            "Key": "密钥",
            "Add SSH key": "添加 SSH 密钥",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/gpg"] = { // 设置 - SSH 与 GPG 公钥 - 添加 GPG 公钥
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 添加 GPG 公钥 https://github.com/settings/gpg/new
            "Add new GPG key": "添加新 GPG 密钥",
            "Title": "标题",
            "Key": "密钥",
            "Add GPG key": "添加 GPG 密钥",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/organizations"] = { // 设置 - 组织
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Organizations 组织 https://github.com/settings/organizations
            "You are not a member of any organizations.": "您暂无任何组织。",

            "Owner": "所有者",
            "Compare plans": "比较计划",
            "Leave": "离开",

            "Transform account": "帐户变更",
            "You cannot transform this account into an organization until you leave all organizations that you’re a member of.": "在您离开您所属的所有组织之前，您无法将此帐户转换为组织。", // 存在所属组织时
            "You cannot transform this account into an organization because you have an active GitHub Sponsors account.": "由于您有一个活跃的 GitHub 赞助商帐户，因此您无法将此帐户转换为组织。", // 存在赞助商账户时
            "Account transformation warning": "帐户变更警告",
            "What you are about to do is an irreversible and destructive process. Please be aware:": "这将是一个不可逆转的过程，请确认：",
            "Any user-specific information (OAuth tokens, SSH keys, Job Profile, etc) will be erased": "任何用户特定的信息（OAuth 令牌, SSH 密钥, 职位简介, 等）将被删除。",
            "create a new personal account": "创建一个新的个人帐户",
            "The total amount of collaborators across private repositories will be the total amount of seats for the organization": "跨私人仓库的合作者总数将是该组织的席位总数",

    },
    "regexp": [ // 正则翻译
        [/Turn ([^ ]+) into an organization/, "变更 $1 为一个组织"],
        [/Outside collaborator on (\d+) repositor(y|ies)/, "$1 个仓库的外部协作者"], // 设置 - 组织
        [/Are you positive you want to leave ([^ ]+)\? You will lose access to all repositories and teams./, "您确定要离开 $1 吗？您将失去对所有仓库和团队的访问权。"], // 设置 - 组织 离开按钮 提醒
        [/Are you positive you want to leave ([^ ]+)\? You will lose access to all repositories./, "您确定要离开 $1 吗？您将失去对所有仓库的访问权。"], // 设置 - 组织 离开按钮 提醒
    ],
};

I18N.zh["settings/enterprises"] = { // 设置 - 企业版
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 企业版 https://github.com/settings/enterprises
        "Enterprises": "企业版",
        "You don't have any enterprises": "您还没有任何企业版",
        "Designed for businesses or teams who collaborate on GitHub.com": "专为在 GitHub.com 上协作的企业或团队而设计",

        "Start free trial": "开启免费体验",
        "Learn more about enterprises": "了解更多关于企业版信息",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/blocked_users"] = { // 设置 - 黑名单
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Blocked users 黑名单 https://github.com/settings/blocked_users
            "Block a user": "拉黑用户",
            "Blocking a user prevents the following on all your repositories:": "拉黑用户可以防止所有仓库中的以下操作：",
            "opening or commenting on issues or pull requests": "打开或评论议题或拉取请求",
            "starring, forking, or watching": "加星标、复刻、关注",
            "adding or editing wiki pages": "添加或编辑 Wiki 页面",
            "Additionally, blocked users are not able to:": "此外，被拉黑用户无法：",
            "invite you as a collaborator to their repositories": "邀请您作为其仓库的协作者",
            "follow your account’s public activity": "关注您的帐户的公共活动",
            "send you notifications by @mentioning your username in public repositories": "在公共仓库中通过 @您 向您发送通知",
            "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
                "Learn more about blocking a user": "了解更多关于拉黑用户的信息",
            "Block user": "拉黑用户",
            "You have not blocked any users.": "您还没有拉黑任何用户。",
            "Unblock": "取消拉黑",
            "Warn me when a blocked user is a prior contributor to a repository": "请警告我，当被拉黑的用户是仓库的先前贡献者时",
            "On repositories you haven’t contributed to yet, we’ll warn you when a user you’ve blocked has previously made contributions.": "在您还没有贡献的仓库里，当您拉黑的用户之前有贡献时，我们会警告您。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/interaction_limits"] = { // 设置 - 互动限制
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Interaction limits 互动限制 https://github.com/settings/interaction_limits
            "Temporary interaction limits": "临时互动限制",
            "Temporarily restrict which external users can interact with your repositories (comment, open issues, or create pull requests) for a configurable period of time.": "在配置的时间段内，可临时限制哪些外部用户与您的仓库互动（评论、打开议题或创建拉取请求）。",
            "This may be used to force a \"cool-down\" period during heated discussions or prevent unwanted interactions.": "可用于在激烈讨论期间，强制进入 “冷静” 期或防止不必要的互动。",
            "Interaction limits may already exist in your account's": "互动限制可能已经存在于您的",
            "public repositories": "公开仓库",
            ". Any changes here will override those limits.": " 的设置中。此处的全局设置将覆盖那些仓库的局部设置。",
            "Limit to existing users": "仅限现有用户",
                "Users that have recently created their account will be unable to interact with your repositories.": "最近创建帐户的用户将无法与您的仓库互动。",
            "Limit to prior contributors": "仅限于先前的贡献者",
                "Users that have not previously committed to the default branch of one of your repositories will be unable to interact with that repository.": "以前从未提交到您某个仓库默认分支的用户将无法与该仓库互动。",
            "Limit to repository collaborators": "仅限仓库协作者",
                "Users that are not collaborators of one of your repositories will not be able to interact with that repository.": "不是您某个仓库的协作者将无法与该仓库互动。",
            "New users": "新用户",
            "Users": "用户",
            "Contributors": "贡献者",
            "Collaborators": "协作者",
            // 交互限制时间 下拉菜单
            "Enable interaction limits for:": "启用交互限制：",
            "24 hours": "24 小时",
            "3 days": "3 天",
            "1 week": "1 周",
            "1 month": "1 个月",
            "6 months": "6 个月",
            // 顶部提醒
            "User interaction limit settings saved.": "用户交互限制设置已保存。",

    },
    "regexp": [ // 正则翻译
        [/Enabled with about ([^ ]+) remaining./, ""],
    ],
};

I18N.zh["settings/code_review_limits"] = { // 设置 - 代码审查限制
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Code review limits 代码审查限制 https://github.com/settings/code_review_limits
            "Restrict users who are permitted to approve or request changes on pull requests in your public repositories.": "限制允许批准或请求更改公共仓库中拉取请求的用户。",
            "Code review limits may already be specified by individual repositories. Any changes here will override those limits until unset.": "代码审查限制可能已经由各个仓库指定。此处的任何更改都将覆盖这些限制，直至取消设置。",
            "Code review limits are currently managed individually for all repositories. Enable limits to permit only users who have explicitly been granted access to each repository to submit reviews that \"approve\" or \"request changes\". Remove limits to allow all users to submit pull request reviews. All users able to submit comment pull request reviews will continue to be able to do so.": "目前，所有仓库代码审查限制都是单独管理的。启用限制，只允许明确授予每个仓库访问权的用户提交 “批准” 或 “请求更改” 的审查。删除限制，允许所有用户提交拉取请求审查。所有能够提交评论拉取请求审查的用户将继续能够这样做。",
            "Limit reviews on all repositories": "限制对所有仓库的审查",
            "Remove review limits from all repositories": "取消对所有仓库的审查限制",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/repositories"] = { // 设置 - 仓库
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Repository 仓库 https://github.com/settings/repositories
            "Repository default branch": "仓库默认分支",
            "Choose the default branch for your new personal repositories. You might want to change the default name due to different workflows, or because your integrations still require “master” as the default branch name. You can always change the default branch name on individual repositories.": "为您新的个人仓库选择默认的分支。由于工作流程的不同，或者由于您的集成仍然需要 “master” 作为默认分支名，您可能想改变默认名称。您可以随时改变个人仓库的默认分支名称。",
            "Learn more about default branches.": "了解更多关于默认分支的信息。",
            "Update": "更新",
            "Deleted repositories": "删除的仓库",
            "Leave": "离开",

    },
    "regexp": [ // 正则翻译
        [/(\d+) collaborators?/, "$1 位合作者"]
    ],
};

I18N.zh["settings/deleted_repositories"] = { // 设置 - 仓库 - 删除的仓库
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 删除的仓库 https://github.com/settings/deleted_repositories
            "Deleted repositories": "删除的仓库",
            "It may take up to an hour for repositories to be displayed here. You can only restore repositories that are not forks, or have not been forked.": "仓库可能需要一个小时的时间才能显示在这里。您只能恢复不是复刻或没有被复刻的仓库。",
            "Learn more about restoring deleted repositories": "了解更多关于恢复已删除仓库的信息",

            "These repositories were deleted, but can't be restored by you. Contact support if you want to restore them.": "这些仓库已被删除，但您无法恢复。如果您想恢复它们，请联系 GitHub 支持人员。",

            "Deleted": "删除于",
            // [/by/, "由"], // 删除的仓库
            "Restore": "恢复",
            "Queue…": "排队中…",
            "Done!": "完成!",

            // 恢复仓库 对话框
            // [/Are you sure you want to restore ([^ ]+)?/, "您确定要恢复 $1 吗？"],
            "This repository will be in a private state when it is restored. To change this state, go to settings once the repo is restored.": "此仓库在恢复时将处于私有状态。要更改此状态，请在仓库恢复后转到设置。",
            "Any team or collaborator permissions that previously existed for this repository will not be restored. If you require specific team or collaborator permissions, you will need to configure them in settings.": "此仓库以前存在的任何团队或协作者的权限将不会被恢复。如果您需要特定的团队或协作者权限，则需要在设置中配置。",
            "I understand, restore this repository": "我明白了，依然恢复该仓库。",

    },
    "regexp": [ // 正则翻译
        [/No recoverable repositories were found for ([^ ]+)\./, "没有找到 $1 的可恢复仓库。"],
        [/by/, "由"], // 删除的仓库
        [/Are you sure you want to restore ([^ ]+)?/, "您确定要恢复 $1 吗？"], // 删除的仓库
    ],
};

I18N.zh["settings/codespaces"] = { // 设置 - 代码空间
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 代码空间 https://github.com/settings/codespaces
            "Dotfiles": "点文件",
            "Automatically install dotfiles": "自动安装点文件",
            "Codespaces can automatically install your dotfiles into every codespace you create.": "代码空间可以自动将您点文件安装到您创建的每个代码空间。",
            "Learn how to set up your dotfiles for Codespaces.": "了解如何为代码空间设置点文件。",
            "Search for a repository": "搜索仓库",

            "Codespaces secrets": "代码空间机密",
            "New secret": "新建机密",
            "Secrets are environment variables that are": "机密是环境变量",
            "encrypted": "被加密",
            "and only exposed to Codespaces you create.": "并且只暴露给您创建的代码空间。",
            "There are no Codespaces secrets.": "尚无代码空间机密",
            "Secrets created at the user level can be shared with specified repositories.": "在用户级别创建的机密可以与指定的仓库共享。",

            // [/(\d+) repositor(y|ies)/, "$1 个仓库"],
            "Updated": "更新于",
            // [/Are you sure you want to delete ([^ ]+)\?/, "您确定要删除 $1 吗？"],

            "GPG verification": "GPG 验证",
                "Codespaces can have GPG commit signing capabilities so that GitHub can verify that commits made in the codespace come from a trusted source. When enabled, this setting will be applied to your list of trusted repositories.": "代码空间可以具有 GPG 提交签名功能，以便 GitHub 可以验证代码空间中的提交是来自受信任的来源。启用后，该设置将被应用到您的受信任仓库列表中。",
                // "Enabled": "启用",
                    "GPG signing will be available in Codespaces": "GPG 签名将在代码空间中可用",

            "Settings Sync": "设置同步",
                "By enabling, your codespaces will be able to pull from VS Code Settings Sync service and push only for the trusted repositories you specify. Only enable this for repositories that you trust.": "通过启用，您的代码空间将能够从 VS Code 设置同步服务中提取数据，并仅推送您指定的受信任仓库。请只对您信任的仓库启用此功能。",
                // "Enabled": "启用",
                    "VS Code Settings Sync will be available in Codespaces": "VS Code 设置同步将在代码空间中可用",

            "Trusted repositories": "受信任仓库",
                "The following repositories will be referenced by GPG verification and Settings Sync.": "以下仓库将被 GPG 验证和设置同步所引用。",

                "All repositories": "所有仓库",
                    "GPG signing and VS Code Settings Sync will be available for codespaces for all repositories": "GPG 签名和 VS Code 设置同步将适用于所有仓库的代码空间",
                "Selected repositories": "选定的仓库",
                    "GPG signing and VS Code Settings Sync will be available for codespaces from the selected repositories": "GPG 签名和 VS Code 设置同步将适用于选定仓库的代码空间",
                    "Select repositories": "选择仓库",
                    // [/Selected (\d+) repositor(y|ies)./, "选定 #1 个仓库"],
                    "GPG and VS Code Settings Sync will be available for Codespaces from these repositories.": "GPG 和 VS Code 设置同步将可用于这些仓库的代码空间。",

            "Access and security": "访问和安全",
            "Deprecated": "弃用",
            "Codespaces you create for your personal account can either be restricted to accessing the repository it was opened for, or granted read access to other repositories you own.": "您为您个人帐户创建的代码空间可以限制访问已启用的仓库或您其他被赋予读取权限的仓库",

            "Editor preference": "编辑器偏好",
                // VS code
                    "Connect to the cloud from your local desktop client. Requires": "从本地桌面客户端连接到云。要求",
                    "with the": "安装",
                    "GitHub Codespaces": "GitHub 代码空间",
                    "extension.": "插件。",

                "Visual Studio Code for the Web": "网络版的 Visual Studio Code",
                    "Edit and preview changes straight from the browser.": "直接从浏览器编辑和预览更改。",

                // "JetBrains Gateway": "",
                    "Connect to the cloud from your local desktop client. Requires the": "从本地桌面客户端连接到云。要求",
                    "plugin, and a JetBrains license.": "插件和 JetBrains 许可证。",

                // JupyterLab
                    "Edit and run notebooks from the browser with JupyterLab.": "使用 JupyterLab 从浏览器编辑和运行笔记本。",

            "Default idle timeout": "默认空闲超时",
                "A codespace will suspend after a period of inactivity. You can specify a default idle timeout value, which will apply to all codespaces created after the default is changed. You will be charged for the entire time your codespace is running, even if it is idle. The maximum value is": "一段时间不活动后，代码空间将暂停。您可以指定一个默认的空闲超时值，该值将应用于更改默认值后创建的所有代码空间。您将在代码空间运行的整个过程中付费，即使它是空闲的。最大值是",
                "minutes (4 hours).": "分钟（4小时）。",
                "minutes": "分钟",

            "Default retention period": "默认保留期",
                "Inactive codespaces are automatically deleted 30 days after the last time they were stopped. A shorter retention period can be set, and will apply to all codespaces created going forward. The default and maximum value is": "不活跃的代码空间在上次停止后 30 天自动删除。可以设置更短的保留期，并将应用于以后创建的所有代码空间。默认值和最大值是",
                "days.": "天。",
                "Learn about retention setting": "了解关于保留时间的设置",
                "days": "天",

            "Region": "地区",
                "Your default region will be used to designate compute resources to your codespaces. GitHub can set your region automatically based on your location, or you can set it yourself. Codespaces are deployed to a subset of Azure regions.": "您的默认区域将被用来为您的代码空间指定计算资源。 GitHub 可以根据您的位置自动设置您的区域，您也可以自己设置。代码空间部署到 Azure 区域的子集。",
                "Set automatically": "自动设置",
                "We will determine the closest available region based on your location (IP address) at codespace creation time.": "我们将在创建代码空间时根据您的位置（IP地址）确定最近的可用区域。",
                "Set manually": "手动设置",
                "Choose your default region": "选择您的默认区域",

            // 顶部提醒
                "Secret added.": "机密已添加。",
                "Secret deleted.": "机密已删除。",
                "Secret updated.": "机密已更新。",

        // 代码空间 机密新建 https://github.com/settings/codespaces/secrets/new
            "/ New secret": "/ 新建机密",
            "Add secret": "添加机密",
                "Adding…": "添加中…",

            "Name": "名称",
                "YOUR_SECRET_NAME": "您的机密名称",
                "Secret name is required and must not start with GITHUB": "机密名称是必需的，并且不能以 GITHUB 开头",
            "Value": "值",

            "Repository access": "仓库权限",
            "Available to": "适用于",
            "repository": "仓库",
            "This secret will not be active until at least 1 repository is selected.": "至少选择 1 个仓库，否则此密钥不会处于活动状态。",

        // 编辑机密 https://github.com/settings/codespaces/secrets/<机密名称>/edit
            "/ Update secret": "/ 更新机密",
            "Secret values are encrypted and cannot be displayed, but you can": "机密值已加密，无法显示，但您可以",
            "enter a new value.": "输入一个新值。",
            "Update secret": "更新机密",
                "Updating…": "更新中…",
            "Save changes": "保存更改",

    },
    "regexp": [ // 正则翻译
        [/Selected (\d+) repositor(y|ies)./, "选定 $1 个仓库"],
        [/(\d+) repositor(y|ies)/, "$1 个仓库"],
        [/Are you sure you want to delete ([^ ]+)\?/, "您确定要删除 $1 吗？"],
    ],
};

I18N.zh["settings/packages"] = { // 设置 - 软件包
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],
        ...I18N.zh["orgs-settings-menu"]["static"], // 组织设置

        // Packages 软件包 https://github.com/settings/packages
            "Packages permissions": "软件包权限",

            // 组织设置
                "Package Creation": "包的创建",
                "Members will be able to publish only the selected visibility types for packages and containers. Outside collaborators can never publish packages or containers.": "成员只能发布选定可见性类型的软件包和容器。外部协作者永远不能发布软件包或容器。",
                "Public": "公共",
                    "Members will be able to create public packages, visible to anyone.": "成员将能够创建公共包，对任何人都可见。",
                "Private": "私有",
                    "Members will be able to create private packages, visible to organization members with permission.": "成员将能够创建私有包，对具有权限的组织成员可见。",
                "Internal": "内部",
                    "Members will be able to create internal packages, visible to all organization/enterprise members.": "成员将能够创建内部包，对所有组织/企业成员可见。",

            "Default Package Setting": "默认软件包设置",
            "Default Package Settings": "默认软件包设置",// 组织设置
            "This setting will be applied to new Container, npm, rubygems and NuGet packages.": "此设置将应用于新的容器、npm、rubygems 和 NuGet 软件包。",
            "Inherit access from source repository": "从源仓库继承访问权限",
            "Save": "保存",

            "Deleted Packages": "删除的软件包",
            "These are packages that have been previously deleted belonging to you. You can restore a package deleted within the last 30 days.": "这些是先前已删除的属于您的软件包。您可以恢复在过去 30 天内删除的包。",
            "These are packages that have been previously deleted belonging to this organization. You can restore a package deleted within the last 30 days.": "这些是先前已删除的属于您组织的软件包。您可以恢复在过去 30 天内删除的包。", // 组织设置
            "Search deleted packages": "搜索已删除的软件包",

    },
    "regexp": [ // 正则翻译
        [/No recoverable packages were found for ([^ ]+)./, "没有找到 $1 的可恢复包。"],
    ],
};
I18N.zh["orgs/settings/packages"] = I18N.zh["settings/packages"];

I18N.zh["settings/copilot"] = { // 设置 - GitHub Copilot
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // GitHub Copilot https://github.com/settings/copilot
            "Trained on billions of lines of code,": "经过数十亿行代码的训练，",
            "turns natural language prompts into coding suggestions across dozens of languages.": "将自然语言提示转换为多种语言的编码建议。",
            "Start free trial": "开始免费试用",
            "After that $10/month": "结束试用后 $10/月",
            "Get Copilot from an organization": "从组织中获取 GitHub Copilot",
            "Organizations can provide their members (including you) and their teams access to GitHub Copilot.": "组织可以为其成员（包括您）及其团队提供使用 GitHub Copilot 的权限。",
            "Organizations owned by enterprise accounts": "企业帐户拥有的组织",
            "are not currently listed.": "目前未包含在此计划中。",
            "You do not belong to any organizations.": "您不属于任何组织。",
            "Create an organization": "创建一个组织",

            "Ask admin for access": "向管理员请求访问权限",
            "Buy Copilot for Business": "购买 GitHub Copilot 企业版",
            "Owner": "所有者",

    },
    "regexp": [ // 正则翻译
        [/Outside collaborator on (\d+) repositor(y|ies)/, "$1 个仓库的外部协作者"],
    ],
};

I18N.zh["settings/pages"] = { // 设置 - GitHub Pages
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],
        ...I18N.zh["orgs-settings-menu"]["static"], // 组织设置菜单

        // GitHub Pages https://github.com/settings/pages
            "Verified domains": "经验证的域名",
            "Add a domain": "添加域名",
            "There are no verified domains.": "暂无经验证的域名",
            "There are no verified domains for this organization.": "此组织暂无经验证的域名", // 组织设置
            "Verify domains to restrict who can publish GitHub Pages on them.": "验证域名以限制谁可以在上面发布 GitHub Pages。",

        // GitHub Pages - 添加域名 https://github.com/settings/pages_verified_domains/new
            "Add a verified domain": "经验证的域名",
            "What domain would you like to add?": "您想添加什么域名？",
            "Add domain": "添加域名",

    },
    "regexp": [ // 正则翻译
    ],
};
I18N.zh["orgs/settings/pages"] = I18N.zh["settings/pages"];

I18N.zh["settings/replies"] = { // 设置 - 快捷回复
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Saved replies 快捷回复 https://github.com/settings/replies
            "Saved replies are re-usable text snippets that you can use throughout GitHub comment fields. Saved replies can save you time if you’re often typing similar responses.": "快捷回复是可重复使用的文本片段，您可以在整个 GitHub 评论区使用。如果您经常输入类似的回复，快捷回复可以节省您的时间。",
            "Learn more about working with saved replies": "了解更多关于使用快捷回复的信息",
            "No saved replies yet.": "暂时没有快捷回复。",
            "Add a saved reply": "添加快捷回复",
            "Saved reply title": "快捷回复的标题",
            "Add a short title to your reply": "为您的快捷回复添加简短的标题",
            "Add your saved reply": "添加您的快捷回复",
            "Add saved reply": "添加快捷回复",
            "Your saved reply was created successfully.": "您的快捷回复已成功创建。",
            "Edit saved reply": "编辑快捷回复",
            "Update saved reply": "更新快捷回复",
            "Your saved reply was updated successfully.": "您的快捷回复已成功更新。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/security_analysis"] = { // 设置 - 代码安全性与分析
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 代码安全性与分析 https://github.com/settings/security_analysis
            "Security and analysis features help keep your repositories secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your repositories.": "安全和分析功能有助于确保您的仓库安全和更新。通过启用这些功能，您授予我们对您的仓库执行只读分析的权限。",

            "User": "用户",
                "Security and analysis features help keep you secure and updated, wherever you are.": "无论您身在何处，安全和分析功能都可以帮助您保持安全并及时更新。",

                "Keep your public pushes safe with push protection": "通过推送保护确保您的公共推送安全",
                "GitHub will enable push protection for all GitHub Free individuals in January 2024. Enable below to try it now in beta.": "GitHub 将于 2024 年 1 月为所有 GitHub 免费用户启用推送保护。在下面启用以立即在测试版中尝试。",
                    "Dismiss": "忽略",

                "Push protection for yourself": "启用推送保护",
                    "Block commits that contain": "阻止提交，包含",
                    "supported secrets": "受支持的秘密",
                    "across all public repositories on GitHub.": "跨 GitHub 上的所有公共仓库。",

                    // 为自己启用推送保护对话框
                        "Enable push protection for yourself": "为自己启用推送保护",
                        "This will enable push protection wherever you push": "这样，无论您在哪里推送，都能实现推送保护",
                        "Enable push protection": "启用推送保护",

                    // 为自己禁用推送保护
                        "Disable push protection for yourself": "为自己禁用推送保护",
                        "This will disable push protection wherever you push": "这样，无论您在哪里推送，都会禁用推送保护",
                        "Disable push protection": "禁用推送保护",

                        // 顶部提醒
                            // [/Security settings updated for ([^ ]+)\'s repositories./, "更新了 $1 的仓库的安全设置。"],

            // 仓库
                "Security and analysis features help keep your repositories secure and updated.": "安全和分析功能可帮助您确保仓库的安全和更新。",

            "Disable all": "禁用全部",
            "Enable all": "启用全部",

            "Private vulnerability reporting": "私下漏洞报告",
                "Allow your community to privately report potential security vulnerabilities to maintainers and repository owners.": "允许您的社区向维护者和仓库所有者私下报告潜在的安全漏洞。",
                "Learn more about private vulnerability reporting": "了解更多关于私下漏洞报告的信息",
                "Automatically enable for new public repositories": "为新公共仓库自动启用",

                // 对话框
                "Disable private vulnerability reporting": "禁用私下漏洞报告",
                // [/You're about to disable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中禁用私下漏洞报告。"],
                "Enable by default for new public repositories": "默认启用新公共仓库",

                "Enable private vulnerability reporting": "启用私下漏洞报告",
                // [/You're about to enable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中启用私下漏洞报告。"],

            "Dependency graph": "依赖关系图",
                "Understand your dependencies.": "了解您的依赖项。",
                "Automatically enable for new private repositories": "为新私有仓库自动启用",

                // 对话框
                "Disable dependency graph": "禁用依赖关系图",
                "You're about to disable dependency graph on all your private repositories. This will also disable Dependabot alerts and Dependabot security updates on those repositories.": "您即将禁用您所有私有仓库上的依赖关系图。这也将禁用这些仓库的 Dependabot 警报和 Dependabot 安全更新。",
                "Enable by default for new private repositories": "默认为新私有仓库启用",

                "Enable dependency graph": "启用依赖关系图",
                "You're about to enable dependency graph on all your private repositories.": "您即将启用您所有私有仓库上的依赖关系图。",

            // Dependabot
                "Keep your dependencies secure and up-to-date.": "保持您的依赖关系的安全和最新",
                "Learn more about Dependabot": "了解更多关于 Dependabot 的信息",

                "Dependabot alerts": "Dependabot 警报",
                    "Receive alerts for vulnerabilities that affect your dependencies and manually generate Dependabot pull requests to resolve these vulnerabilities.": "接收影响您的依赖关系的漏洞警报，并手动生成 Dependabot 拉取请求以解决这些漏洞。",
                        "Configure alert notifications": "配置警报通知",
                    "Automatically enable for new repositories": "为新仓库自动启用",

                // 对话框
                    "Disable Dependabot alerts": "禁用 Dependabot 警报",
                    "You're about to disable Dependabot alerts on all your repositories. This will also disable Dependabot security updates on those repositories.": "您即将禁用您所有仓库上的 Dependabot 警报。这也将禁用这些仓库的 Dependabot 安全更新。",
                    "Enable by default for new repositories": "默认为新仓库启用",

                    "Enable Dependabot alerts": "启用 Dependabot 警报",
                    "You're about to enable Dependabot alerts on all your repositories. Alerts require the dependency graph, so we'll also turn that on for all repositories.": "您即将启用您所有仓库上的 Dependabot 警报。Dependabot 警报需要依赖关系图，因此我们还将为所有仓库打开它。",

            "Dependabot security updates": "Dependabot 安全更新",
                "Enabling this option will result in Dependabot automatically attempting to open pull requests to resolve every open Dependabot alert with an available patch. If you would like more specific configuration options, leave this disabled and use": "启用后，Dependabot 会自动尝试打开拉取请求，以使用可用补丁解决每个打开的 Dependabot 警报。如果您想要更具体的配置选项，请将其禁用并使用",
                    "Dependabot rules": "Dependabot 规则",

                // 对话框
                "Disable Dependabot security updates": "禁用 Dependabot 安全更新",
                "You're about to disable Dependabot security updates on all your repositories.": "您即将禁用您所有仓库上的 Dependabot 安全更新。",
                "Enable Dependabot security updates": "启用 Dependabot 安全更新",
                "You're about to enable Dependabot security updates on all your repositories. Dependabot security updates require the dependency graph and Dependabot alerts, so we'll also turn that on for all repositories.": "您即将启用您所有仓库上的 Dependabot 安全更新。Dependabot 安全更新需要依赖关系图和 Dependabot 警报，因此我们还将为所有仓库打开它。",

            "Secret scanning": "机密扫描",
                "Receive alerts on GitHub for detected secrets, keys, or other tokens.": "在 GitHub 上接收有关检测到的秘密、密钥或其他令牌的警报。",
                "GitHub will always send alerts to partners for detected secrets in public repositories.": "GitHub 会随时向合作伙伴发送公共仓库中检测到的机密警报。",
                "Learn more about partner patterns": "了解更多关于合作伙伴模式的信息",

                // 对话框
                "Disable secret scanning?": "禁用机密扫描？",
                "This will disable secret scanning on all repositories where it is enabled.": "这将禁用所有启用了机密扫描的仓库上的机密扫描。",
                "Disable secret scanning": "禁用机密扫描",
                "Enable secret scanning for eligible repositories?": "启用符合条件的仓库的机密扫描？",
                "This will turn on secret scanning for all public repositories.": "这将为所有公共仓库启用机密扫描。",
                "Enable for eligible repositories": "启用符合条件的仓库",

                "Push protection": "推送保护",
                    // "Block commits that contain": "阻止提交，包含",
                    // "supported secrets": "受支持的秘密",
                    "Automatically enable for repositories added to secret scanning": "自动启用对添加到机密扫描的仓库进行扫描",


    },
    "regexp": [ // 正则翻译
        [/You're about to disable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中禁用私下漏洞报告。"],
        [/You're about to enable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中启用私下漏洞报告。"],
        [/Security settings updated for ([^ ]+)\'s repositories./, "更新了$1 的仓库的安全设置。"],
    ],
};

I18N.zh["settings/installations"] = { // 设置 - 应用/安装的 GitHub 应用
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        "Installed GitHub Apps": "安装的 GitHub 应用",
        "Authorized GitHub Apps": "授权的 GitHub 应用",
        "Authorized OAuth Apps": "授权的 OAuth 应用",

        // Applications 应用 https://github.com/settings/installations
            // "Installed GitHub Apps": "安装的 GitHub 应用",
            "GitHub Apps augment and extend your workflows on GitHub with commercial, open source, and homegrown tools.": "GitHub 应用通过商业、开源和自主开发的工具来增强和扩展您在 GitHub 上的工作流程。",
            "No installed applications": "没有已安装的应用",
            "You have no applications installed on this account.": "此帐户上没有安装任何应用。",
            "Configure": "配置",

        // https://github.com/settings/installations/<id>
            "Installed": "安装于",
            "Developed by": "开发者",
            "Permissions": "权限",
            "Repository access": "仓库访问权限",
            "All repositories": "所有仓库",
            "This applies to all current": "这适用于所有当前",
            "and": "和",
            "future repositories.": "未来的仓库。",
            "Only select repositories": "仅选定的仓库",
                "Select at least one repository. Max 100 repositories.": "至少选择一个仓库。最多 100 个仓库。",
            "Select repositories": "选择仓库",
            "Search for a repository": "搜索仓库",

            "Danger zone": "危险区",
            "Suspend your installation": "暂停使用",
            "This will block the app access to your resources.": "这将阻止应用访问您的资源。",
            "Suspend": "暂停",
                // 取消按钮 提醒信息
                "Are you sure you want to suspend this GitHub App?": "您确定要暂停此 GitHub 应用吗？",
            "This will remove the app and revoke access to all resources.": "这将删除应用并撤销对所有资源的访问权限。",
            "Uninstall": "卸载",
                // 取消按钮 提醒信息
                // [/This action cannot be undone. Are you sure you want to uninstall this GitHub App from (\d+) repositor(y|ies)?/, "此操作无法撤消。您确定要从 1 个仓库中卸载此 GitHub 应用吗？"],


            "Report abuse": "举报滥用",
            "Revoke": "撤销",
            "Read more about connecting with third-party applications at": "了解更多关于与第三方应用连接的信息，请访问",
            "GitHub Help": "GitHub 帮助",

        // https://github.com/settings/apps/authorizations
            // "Authorized GitHub Apps": "授权的 GitHub 应用",
            "No authorized applications": "无授权申请",
            "You have no applications authorized to access your account.": "您没有授权访问您的帐户的应用。",

        // https://github.com/settings/applications
            // "Authorized OAuth Apps": "授权的 OAuth 应用",
            "You have granted": "您已经授权",
            "access to your account.": "访问您的帐户。",
            "Revoke all": "撤销全部",
            "Sort": "排序",
            "Sort by": "排序方式",
            "Alphabetical": "按字母排列",
            "Recently used": "最近使用的",
            "Least recently used": "最近使用最少的",

            "Last used within the last week · Owned by": "最后一次使用是最近 1 周之内 · 作者",

            "Report abuse": "举报滥用",
            "Revoke": "撤销",

            // 撤销对话框
            "Are you sure you want to revoke authorization?": "您确定要撤销授权吗？",
            "I understand, revoke access": "我明白了，依然撤销访问",

            // 全部撤销对话框
            "Are you sure you want to revoke access for all applications?": "您确定要撤销对所有应用的访问权限吗？",
            "This will revoke access for": "这将撤销访问",
            "all third-party": "所有第三方",
            "OAuth applications. This action cannot be undone.": "OAuth 应用。此操作无法撤消。",
            "Any SSH keys created on your behalf by applications will also be deleted.": "任何由应用代表您创建的 SSH 密钥也将被删除。",
            "Type your username to confirm.": "输入您的用户名进行确认。",
            "I understand, revoke access for everything": "我明白了，依然撤销对一切的访问",

            // 举报滥用对话框
            "Report Abuse": "举报滥用",
            "More options": "更多选项",
            "Revoking will deny future access to your account": "撤销授权，将拒绝今后访问您的帐户",

    },
    "regexp": [ // 正则翻译
        [/This action cannot be undone. Are you sure you want to uninstall this GitHub App from (\d+) repositor(y|ies)?/, "此操作无法撤消。您确定要从 $1 个仓库中卸载此 GitHub 应用吗？"],
        [/Uninstall "([^ ]+)"/, "卸载 “$1”"],

        [/You will no longer be able to sign in to ([^ ]+) \(all administrative privileges will be bestowed upon the owners you choose\)/, "您将无法再登录 $1（所有管理权限都将授予您选择的所有者）"],

        [/(\d+) applications?/, "$1 个应用"],
        [/([^ ]+) will no longer be able to access your GitHub account. You cannot undo this action./, "$1 将无法再访问您的 GitHub 帐户。您无法撤消此操作。"],
        [/([^ ]+) has been revoked from your account./, "$1 已经从您的帐户中被撤销了。"],
        [/Last used within the last (\d+) weeks? · Owned by/, "最后一次使用是最近 $1 周之内 · 作者"],
        [/Last used within the last (\d+) months? · Owned by/, "最后一次使用是最近 $1 月之内 · 作者"],
    ],
};
I18N.zh["settings/apps/authorizations"] = I18N.zh["settings/installations"];
I18N.zh["settings/applications"] = I18N.zh["settings/installations"];
///settings/connections/applications/

I18N.zh["settings/reminders"] = { // 设置 - 定时提醒
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // 定时提醒 https://github.com/settings/reminders
            "Reminders allow you to push certain events to authorized instances of Microsoft Teams or Slack.": "提醒功能允许您将特定事件推送到 Microsoft Teams 或 Slack 的授权实例。",
            "Available organizations": "可用组织",
            "Configure Reminder": "配置提醒",
            "No reminders": "没有提醒",

        // 新的预定提醒 https://github.com/settings/reminders/<组织名>
            "New scheduled reminder": "新建预定提醒",
            "Slack workspace": "Slack 工作区",
            "Authorize Slack workspace": "授权 Slack 工作区",
            "Days": "天",
                "Weekdays": "工作日",
                "Monday"    : "周一",
                "Tuesday"   : "周二",
                "Wednesday" : "周三",
                "Thursday"  : "周四",
                "Friday"    : "周五",
                "Saturday"  : "周六",
                "Sunday"    : "周日",
            "Times": "时间",
                "Filter": "筛选",
            "Review requests assigned to you": "审查分配给您的请求",
                "Receive reminders for reviews waiting on you.": "接收等待您的审查提醒。",
            "Review requests assigned to your team": "审查分配给您团队的请求",
                "Receive reminders for reviews waiting on your team.": "接收等待您的团队的审查提醒。",
            "Enable real-time alerts": "启用实时警报",
                "Receive immediate Slack messages when certain events happen": "当某些事件发生时，会立即收到 Slack 消息",

            "You will only receive notifications from public repositories in this organization because the current plan for": "您将只收到来自该组织中公共仓库的通知，因为目前",
            "does not support reminders for private repositories.": "的计划不支持私人仓库的提醒。",
            "Upgrade to Team": "升级为团队",
            "Create reminder": "创建提醒者",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/security-log"] = { // 设置 - 安全日志
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Security log 安全日志 https://github.com/settings/security-log
            "Loading audit log entries…": "正在加载日志条目...",
            "Filters": "筛选",
                "Filter audit logs": "筛选审计日志",
                "Yesterday's activity": "昨天的活动",
                "Repository management": "仓库管理",
                "Billing updates": "账单更新",
                "Copilot activity": "Copilot 活动",
                "Personal access token activity": "个人访问令牌活动",
                "View advanced search syntax": "查看高级搜索语法",
            "Search audit logs": "搜索审计日志",
            "Search your security log": "搜索您的安全日志",
            "Clear current search query": "清除当前的搜索查询",
            "Export": "导出",
            "Recent events": "最近的事件",
            // [/Found (\d+) events?/, "发现 $1 个活动"],
            "Newer": "新的",
            "Older": "旧的",
            "ProTip!": "专业提示！",
                "View all events created yesterday": "查看昨天创建的所有事件",
                "View all events where you created something": "查看所有您创建内容时产生的事件",


    },
    "regexp": [ // 正则翻译
        [/Found (\d+) events?/, "发现 $1 个活动"],
    ],
};

I18N.zh["settings/sponsors-log"] = { // 设置 - 赞助日志
    "static": { // 静态翻译
        ...I18N.zh["settings-menu"]["static"],

        // Sponsorship log 赞助日志 https://github.com/settings/sponsors-log
            "Sponsors log": "赞助日志",
            "New sponsorships, changes, and cancellations": "新的赞助、更改和取消",
            "Period:": "周期：",
            "Filter activity": "筛选活动",
            "All-time": "所有时间",
            "Past Day": "过去一天",
            "Past Week": "过去一周",
            "Past Month": "过去一月",
            "Past Year": "过去一年",
            "No sponsorship activity in this time period": "这段时间没有赞助活动",
            "This is where you can review activity from your sponsorships.": "您可以在此处查看您的赞助活动。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/apps"] = { // 设置 - 开发者设置/GitHub 应用
    "static": { // 静态翻译
            "Developer Settings": "开发者设置",
            "GitHub Apps": "GitHub 应用",
            "OAuth Apps": "OAuth 应用",
            "Personal access tokens": "个人访问令牌",
                "Fine-grained tokens": "精细化的令牌",
                "Tokens (classic)": "令牌（经典）",

        // GitHub 应用 https://github.com/settings/apps
            "Register a new GitHub App": "注册新的 GitHub 应用",
            "Want to build something that integrates with and extends GitHub?": "想要构建与 GitHub 集成和扩展的东西吗？",
            "New GitHub App": "新 GitHub 应用",
            "to get started developing on the GitHub API. You can also read more about building GitHub Apps in our": "，开始在 GitHub API 上进行开发。您还可以在我们的文档中阅读有关构建 GitHub 应用的更多信息",
            "developer documentation": "开发者文档",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/apps/new"] = { // 新建 GitHub 应用
    "static": { // 静态翻译

        // 注册 GitHub 应用 https://github.com/settings/apps/new
            "Developer Settings": "开发者设置",

            "Register new GitHub App": "注册新 GitHub 应用",
            "GitHub App name": "GitHub 应用名称",
            "The name of your GitHub App.": "您的 GitHub 应用的名称。",
            "Markdown supported": "支持 Markdown 语法",
            "This is displayed to users of your GitHub App": "展示给 GitHub 应用的使用者",
            "Homepage URL": "主页地址",
            "The full URL to your GitHub App’s website.": "GitHub 应用网站的主页地址",
            "Identifying and authorizing users": "识别并授权用户",
            "The full URL to redirect to after a user authorizes an installation.": "用户授权安装后重定向到的完整地址。",
            "Callback URL documentation": "回调地址文档",
            "Add Callback URL": "添加回调地址",
            "Callback URL": "回调地址",
            "Expire user authorization tokens": "用户授权令牌",
            "This will provide a": "这将提供一个",
            "which can be used to request an updated access token when this access token expires.": "，用于在此访问令牌到期时，请求更新访问令牌。",
            "Request user authorization (OAuth) during installation": "在安装期间请求用户授权 (OAuth)",
            "Requests that the installing user grants access to their identity during installation of your App": "请求用户在安装应用期间授予其身份访问权限。",
            "Identifying and authorizing users for GitHub Apps documentation": "关于 GitHub 应用识别并授权用户的文档",
            "Enable Device Flow": "启用设备流",
            "Allow this GitHub App to authorize users via the Device Flow.": "允许此 GitHub 应用通过设备流程授权用户。",
            "Read the": "阅读",
            "Device Flow documentation": "设备流程文档",
            "Post installation": "安装完成后",
            "Setup URL (optional)": "设置网址 (可选)",
                "Users will be redirected to this URL after installing your GitHub App to complete additional setup.": "用户在安装完 GitHub 应用后，会被重定向到这个网址，以完成额外的设置。",
                "Unavailable when requesting OAuth during installation.": "安装过程中请求 OAuth 时不可用。",
                "Users will be redirected to the 'User authorization callback URL' to complete additional setup.": "用户将被重定向到 “用户授权回调网址” 以完成其他设置。",
            "Redirect on update": "更新时重定向",
                "Redirect users to the 'Setup URL' after installations are updated (E.g. repositories added/removed).": "在安装后更新时将用户重定向到 “设置网址”（例如: 添加/删除仓库）。",
                "Redirect users to the 'User authorization callback URL' after installations are updated (E.g repositories added/removed).": "在安装后更新时将用户重定向到 “用户授权回调网址”（例如: 添加/删除仓库）。",
            "Webhook": "Web 钩子",
            "Active": "激活",
            "We will deliver event details when this hook is triggered.": "当钩子被触发时，我们将提供事件详细信息。",
            "Webhook URL": "Web 钩子网址",
            "Events will POST to this URL. Read our": "事件将 POST 到此网址。阅读",
            "webhook documentation": "关于 Web 钩子",
            "for more information.": "以获取更多信息。",
            "Webhook secret (optional)": "Web 钩子隐私 (可选)",
            "Read our": "阅读我们",
            "webhook secret documentation": "Web 钩子隐私文档",

            "Permissions": "权限",
                "User permissions are granted on an individual user basis as part of the": "用户权限的授予是以单个用户为基础的，是一个环节",
                "User authorization flow": "用户授权流程",
                "permissions documentation": "权限文档",
                "for information about specific permissions.": "以了解有关特定权限的信息。",

                "Access:": "访问权限：",
                "Select an access level": "选择访问级别",
                "No access": "禁止访问",
                "Read-only": "只读",
                "Read and write": "读写",

                  "Selected": "项被选中",
                  "mandatory": "强制",

                "Repository permissions": "仓库权限",
                    "Repository permissions permit access to repositories and related resources.": "仓库权限允许访问仓库和相关资源。",

                    "Actions": "操作",
                        "Workflows, workflow runs and artifacts.": "工作流程、工作流程的运行和工件。",
                    "Administration": "管理",
                        "Repository creation, deletion, settings, teams, and collaborators.": "仓库创建、删除、设置、团队和协作者。",
                    "Checks": "检查",
                        "Checks on code.": "检查代码。",
                    "Code scanning alerts": "代码扫描警报",
                        "View and manage code scanning alerts.": "查看和管理代码扫描警报。",
                    // "": "代码空间",
                        "Create, edit, delete and list Codespaces.": "创建、编辑、删除和列出代码空间。",
                    "Codespaces lifecycle admin": "代码空间的生命周期管理",
                        "Manage the lifecycle of Codespaces, including starting and stopping.": "管理代码空间的生命周期，包括启动和停止。",
                    "Codespaces metadata": "代码空间元数据",
                        "Access Codespaces metadata including the devcontainers and machine type.": "访问代码空间元数据，包括开发容器和机器类型。",
                    "Codespaces secrets": "代码空间机密",
                        "Restrict Codespaces user secrets modifications to specific repositories.": "限制代码空间的用户机密对特定仓库的修改。",
                    "Commit statuses": "提交状态",
                        "Commit statuses.": "提交状态。",
                    "Contents": "内容",
                        "Repository contents, commits, branches, downloads, releases, and merges.": "仓库内容、提交、分支、下载、发布和合并。",
                    "Dependabot alerts": "Dependabot 警报",
                        "Retrieve Dependabot alerts.": "检索 Dependabot 警报。",
                    "Dependabot secrets": "Dependabot 机密",
                        "Manage Dependabot repository secrets.": "管理 Dependabot 仓库的机密。",
                    "Deployments": "部署",
                        "Deployments and deployment statuses.": "部署和部署状态。",
                    "Discussions": "讨论",
                        "Discussions and related comments and labels.": "讨论及相关评论和标签。",
                    "Environments": "环境",
                        "Manage repository environments.": "管理仓库环境。",
                    "Issues": "议题",
                        "Issues and related comments, assignees, labels, and milestones.": "议题及相关评论、受理人、标签和里程碑。",
                    "Merge queues": "合并列队",
                        "Manage a repository's merge queues": "管理仓库的合并队列。",
                    "Metadata": "元数据",
                        "Search repositories, list collaborators, and access repository metadata.": "搜索仓库、列出协作者，访问仓库元数据。",
                    "Packages": "软件包",
                        "Packages published to the GitHub Package Platform.": "发布软件包到 GitHub Package 平台。",
                    "Pages": "GitHub Pages",
                        "Retrieve Pages statuses, configuration, and builds, as well as create new builds.": "检索页面状态、配置和构建，以及创建新的构建。",
                    "Projects": "项目",
                        "Manage classic projects within a repository.": "管理仓库中的经典项目。",
                    "Pull requests": "拉取请求",
                        "Pull requests and related comments, assignees, labels, milestones, and merges.": "拉取请求及相关评论、受让人、标签、里程碑和合并。",
                    "Repository security advisories": "仓库安全公告",
                        "View and manage repository security advisories.": "查看和管理安全公告",
                    "Secret scanning alerts": "隐私扫描警报",
                        "View and manage secret scanning alerts.": "查看和管理隐私扫描警报。",
                    "Secrets": "隐私",
                        "Manage Actions repository secrets.": "管理操作仓库隐私。",
                    "Single file": "单个文件",
                        "Manage just a single file.": "只管理单个文件。",
                        "Path": "路径",
                        "The content paths to single files your app can access.": "应用可以访问的单个文件的内容路径。",
                    "Variables": "变量",
                        "Manage Actions repository variables.": "管理操作仓库变量。",
                    "Webhooks": "Web 钩子",
                        "Manage the post-receive hooks for a repository.": "管理仓库的接收后钩子。",
                    "Workflows": "工作流程",
                        "Update GitHub Action workflow files.": "更新 GitHub Actions 工作流程文件。",

                "Organization permissions": "组织权限",
                    "Organization permissions permit access to organization related resources.": "组织权限允许访问组织相关资源。",

                    // 管理
                        "Manage access to an organization.": "管理对组织的访问。",
                    "Blocking users": "拉黑用户",
                        "View and manage users blocked by the organization.": "查看和管理被组织拉黑的用户。",
                    "Custom properties": "自定义属性",
                        "View custom properties, write repository values, and administer definitions.": "查看自定义属性、写入仓库值并管理定义。",
                    "Custom repository roles": "自定义仓库角色",
                        "Create, edit, delete and list custom repository roles.": "创建、编辑、删除和列出自定义仓库角色。",
                    "Events": "活动",
                        "View events triggered by an activity in an organization.": "查看组织中某项活动所触发的事件。",
                    "GitHub Copilot for Business": "GitHub Copilot 商业版",
                        "Manage Copilot for Business seats and settings": "管理 GitHub Copilot 商业版席位和设置",
                    "Members": "成员",
                        "Organization members and teams.": "组织成员和团队。",
                    "Organization announcement banners": "组织公告横幅",
                        "View and modify announcement banners for an organization.": "查看并修改组织的公告横幅。",
                    "Organization codespaces": "组织代码空间",
                        "Manage Codespaces for an organization.": "管理组织的代码空间。",
                    "Organization codespaces secrets": "组织代码空间机密",
                        "Manage Codespaces Secrets for an organization.": "管理组织的代码空间机密。",
                    "Organization codespaces settings": "组织代码空间设置",
                        "Manage Codespaces settings for an organization.": "管理组织的代码空间设置。",
                    "Organization dependabot secrets": "组织 Dependabot 机密",
                        "Manage Dependabot organization secrets.": "管理 Dependabot 组织的机密。",
                    "Personal access token requests": "个人访问令牌请求",
                        "Manage personal access token requests from organization members.": "管理来自组织成员的个人访问令牌请求。",
                    "Personal access tokens": "个人访问令牌",
                        "View and revoke personal access tokens that have been granted access to an organization.": "查看和撤销已被授予组织访问权限的个人访问令牌。",
                    "Plan": "计划",
                        "View an organization's plan.": "查看组织的计划。",
                    // 项目
                        "Manage projects for an organization.": "管理组织的项目。",
                    // 隐私
                        "Manage Actions organization secrets.": "管理操作组织隐私",
                    "Self-hosted runners": "自托管运行器",
                        "View and manage Actions self-hosted runners available to an organization.": "查看和管理组织可用的'操作自托管运行器'。",
                    "Team discussions": "团队讨论",
                        "Manage team discussions and related comments.": "管理团队讨论及相关评论。",
                    // 变量
                        "Manage Actions organization variables.": "管理操作组织变量。",
                    // Web 钩子
                        "Manage the post-receive hooks for an organization.": "管理组织的接收后钩子。",

                "Account permissions": "帐户权限",
                    "These permissions are granted on an individual user basis as part of the User authorization flow.": "这些权限是在单个用户的基础上授予的，作为用户授权流程的一部分",

                    "Block another user": "拉黑其他用户",
                        "View and manage users blocked by the user.": "查看和管理被用户拉黑的用户。",
                    "Codespaces user secrets": "代码空间用户机密",
                        "Manage Codespaces user secrets.": "管理代码空间用户机密。",
                    "Email addresses": "电子邮箱地址",
                        "Manage a user's email addresses.": "管理用户的电子邮箱地址。",
                    // 关注者
                        "A user's followers": "用户的关注者",
                    "GPG keys": "GPG 密钥",
                        "View and manage a user's GPG keys.": "查看和管理用户的 GPG 密钥。",
                    // Gist
                        "Create and modify a user's gists and comments.": "创建和修改用户的代码片段和评论。",
                    "Git SSH keys": "Git SSH 密钥",
                    "Interaction limits": "交互限制",
                        "Interaction limits on repositories": "仓库的交互限制",
                    // 计划
                        "View a user's plan.": "查看用户的计划。",
                    "Profile": "个人信息",
                        "Manage a user's profile settings.": "管理用户的个人信息设置。",
                    "SSH signing keys": "SSH 签名密钥",
                        "View and manage a user's SSH signing keys.": "查看和管理用户的 SSH 签名密钥。",
                    "Starring": "星标",
                        "List and manage repositories a user is starring.": "列出和管理用户已加星标的仓库。",
                    "Watching": "关注",
                        "List and change repositories a user is subscribed to.": "列出和更改用户订阅的仓库。",

            "Subscribe to events": "订阅事件",
                "Based on the permissions you’ve selected, what events would you like to subscribe to?": "根据您选择的权限，您想订阅哪些事件？",
                "Installation target": "安装目标",
                    "A GitHub App installation target is renamed.": "GitHub 应用程序安装目标已重命名。",
                "Meta": "元",
                    "When this App is deleted and the associated hook is removed.": "当该应用被删除和相关的钩子被删除时。",
                "Security advisory": "安全提示",
                    "Security advisory published, updated, or withdrawn.": "发布、更新或撤销的安全提示",
                "Label": "标签",
                    "Label created, edited or deleted.": "标签已创建、编辑或删除。",
                // 公共
                    "Repository changes from private to public.": "仓库从私有更改为公共。",
                "Repository": "仓库",
                    "Repository created, deleted, archived, unarchived, publicized, privatized, edited, renamed, or transferred.": "仓库创建、删除、归档、取消归档、公开、私有化、编辑、重命名或转移。",
                // 星标
                    "A star is created or deleted from a repository.": "星标或取消仓库星标。",
                "Watch": "关注",
                    "User stars a repository.": "用户星标仓库。",

            "Where can this GitHub App be installed?": "这款 GitHub 应用可以安装在哪里？",
                "Only on this account": "仅在当前帐户",
                    "Only allow this GitHub App to be installed on the": "只允许该 GitHub 应用被安装在",
                    "account.": "帐户。",
                "Any account": "任何帐户",
                    "Allow this GitHub App to be installed by any user or organization.": "允许任何用户或组织安装此 GitHub 应用。",

            "Create GitHub App": "创建 GitHub 应用",

    },
    "regexp": [ // 正则翻译
    ],
};
I18N.zh["orgs/settings/apps/new"] = I18N.zh["settings/apps/new"];

I18N.zh["settings/developers"] = { // 设置 - 开发者设置/OAuth 应用
    "static": { // 静态翻译
            "Developer Settings": "开发者设置",
            "GitHub Apps": "GitHub 应用",
            "OAuth Apps": "OAuth 应用",
            "Personal access tokens": "个人访问令牌",
                "Fine-grained tokens": "精细化的令牌",
                "Tokens (classic)": "令牌（经典）",

        // OAuth 应用 https://github.com/settings/developers
            "No OAuth applications": "没有 OAuth 应用",
            "OAuth applications are used to access the GitHub API.": "OAuth 应用用于访问 GitHub API。",
            "Read the docs": "阅读文档",
            "to find out more.": "以了解更多情况。",
            "Register a new application": "注册新 OAuth 应用",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["settings/applications/new"] = { // 设置 - 开发者设置/OAuth 应用
    "static": { // 静态翻译

        // 注册 OAuth 应用 https://github.com/settings/applications/new
            "Developer Settings": "开发者设置",

            "Register a new OAuth application": "注册 OAuth 应用",
            "Application name": "应用名",
            "Something users will recognize and trust.": "让用户识别和信任。",
            "Homepage URL": "主页地址",
            "The full URL to your application homepage.": "您的应用主页地址。",
            "Application description": "应用描述",
            "Application description is optional": "应用描述 (可选)",
            "This is displayed to all users of your application.": "所有用户都能看到您的应用描述。",
            "Authorization callback URL": "认证回调地址",
            "Your application’s callback URL. Read our": "您的应用授权回调地址。阅读我们",
            "OAuth documentation": "OAuth 文档",
            "for more information.": "了解更多信息。",
            "Enable Device Flow": "启用设备流程",
            "Allow this OAuth App to authorize users via the Device Flow.": "允许此 OAuth 应用通过设备流程授权用户。",
            "Read the": "阅读",
            "Device Flow documentation": "设备流程文档",
            "Register application": "注册应用",

    },
    "regexp": [ // 正则翻译
    ],
};
I18N.zh["orgs/settings/applications/new"] = I18N.zh["settings/applications/new"];

I18N.zh["settings/tokens"] = { // 设置 - 开发者设置/个人访问令牌
    "static": { // 静态翻译
            "Developer Settings": "开发者设置",
            "GitHub Apps": "GitHub 应用",
            "OAuth Apps": "OAuth 应用",
            "Personal access tokens": "个人访问令牌",
                "Fine-grained tokens": "精细化的令牌",
                "Tokens (classic)": "令牌（经典）",

        // 开发者设置/精细化的个人访问令牌 https://github.com/settings/tokens?type=beta
            "Fine-grained personal access tokens": "精细化的个人访问令牌",
                "Need an API token for scripts or testing?": "需要用于脚本或测试的 API 令牌？",
                "Generate a personal access token": "生成个人访问令牌",
                "for quick access to the": "用于快速访问",

                "These are fine-grained, repository-scoped tokens suitable for personal": "这些都是精细化的、仓库域的令牌，适合个人",
                "use and for using Git over HTTPS.": "使用和通过 HTTPS 使用 Git。",

                "Make sure to copy your personal access token now as you will not be able to see this again.": "请务必立即复制您的个人访问令牌，因为您将无法再次看到它。",
                "Loading expiration ...": "载入有效期 ...",
                "This token has expired.": "此令牌已过期。",
                    "To set a new expiration date, you must regenerate the token.": "要设置新的有效期，您必须重新生成令牌。",

            // 顶部提醒
                "Deleted personal access token": "已删除个人访问令牌",

        // 开发者设置/个人访问令牌（经典） https://github.com/settings/tokens
            "Personal access tokens (classic)": "个人访问令牌（经典）",
            "Generate new token": "生成新令牌",
                "Fine-grained, repo-scoped": "精细化、 仓库域",
                "Generate new token (classic)": "生成新令牌（经典）",
                    "For general use": "一般用途",
            "Revoke all": "全部撤销",
            "Tokens you have generated that can be used to access the": "生成令牌用于访问",
            "Expires": "有效期至",
            "Expired": "有效期至",
            "This token has no expiration date": "此令牌未设置有效期",
            "Regenerate": "重新生成",
            "this token to take advantage of the": "此令牌使用",
            "new token formats": "新的令牌格式",
            "Personal access tokens (classic) function like ordinary OAuth access tokens. They can be used instead of a password for Git over HTTPS, or can be used to": "个人访问令牌（经典）的功能类似于普通的 OAuth 访问令牌。它们可以用来代替 HTTPS 上 Git 的密码，或者可以用来",
            "authenticate to the API over Basic Authentication": "通过 ‘基本身份验证’ 对 API 进行身份验证",

            "Never used": "尚未使用",
            "Last used within the last week": "最后一次使用是最近 1 周之内",

            // 全部撤销对话框
            "Are you sure you want to revoke access for all personal access tokens?": "对话框您确定要撤销所有个人访问令牌的访问权限吗？",
            "This will revoke access for": "这将撤销访问",
            "all personal access tokens": "所有个人访问令牌",
            ", but will not revoke access for any authorized third-party OAuth applications. This action cannot be undone.": "，但不会撤销任何授权第三方 OAuth 应用的访问权限。此操作无法撤消。",
            "Any SSH keys created on your behalf by personal access tokens will also be deleted.": "任何由个人访问令牌代表您创建的 SSH 密钥也将被删除",
            "Type your username to confirm": "输入您的用户名进行确认",
            "I understand, revoke access for everything": "我明白了，依然撤销对一切的访问",

        // 创建精细化个人访问令牌 https://github.com/settings/personal-access-tokens/new
            "New fine-grained personal access token": "新建精细化个人访问令牌",
            "Create a fine-grained, repository-scoped token suitable for personal API use and for using Git over HTTPS.": "创建精细化的、仓库域的令牌，适合个人 API 使用和通过 HTTPS 使用 Git。",
            "Token name": "令牌名称",
                "A unique name for this token. May be visible to resource owners or users with possession of the token.": "此令牌的唯一名称。可能对资源所有者或持有该令牌的用户可见。",
                "Name can't be blank": "名称不能为空",
            "Description": "描述",
            "What is this token for?": "这个令牌是用来做什么的？",
            "Resource owner": "资源所有者",
            "Authorizing...": "授权中...",

            "Custom expiration can't be blank. Please choose a date.": "自定义过期时间不能为空。请选择日期。",

            "Repository access": "仓库访问",
                "Public Repositories (read-only)": "公共仓库（只读）",
                "All repositories": "所有仓库",
                    "This applies to all current": "这适用于资源所有者拥有的所有当前",
                    "future repositories owned by the resource owner.": "未来的仓库。",
                    "Also includes public repositories (read-only).": "还包括公共仓库（只读）。",
                "Only select repositories": "仅选定的仓库",
                    "Select at least one repository. Max 50 repositories.": "至少选择一个仓库。最多 50 个仓库。",
                    "Select repositories": "选择仓库",
                    "Search for a repository": "搜索仓库",
                    // [/Selected (\d+) repositor(y|ies)./, "选定 #1 个仓库"],

            // 权限
            "Permissions": "权限",
                "Read our": "阅读我们的",
                "permissions documentation": "权限文档",
                "for information about specific permissions.": "以了解有关具体权限的信息。",

                "Access:": "访问权限：",
                "Select an access level": "选择访问级别",
                "No access": "禁止访问",
                "Read-only": "只读",
                "Read and write": "读写",

                "Selected": "项被选中",
                "mandatory": "强制",

                "Repository permissions": "仓库权限",
                    "Repository permissions permit access to repositories and related resources.": "仓库权限允许访问仓库和相关资源。",

                    "Actions": "操作",
                        "Workflows, workflow runs and artifacts.": "工作流程、工作流程的运行和工件。",
                    "Administration": "管理",
                        "Repository creation, deletion, settings, teams, and collaborators.": "仓库创建、删除、设置、团队和协作者。",
                    "Checks": "检查",
                        "Checks on code.": "检查代码。",
                    "Code scanning alerts": "代码扫描警报",
                        "View and manage code scanning alerts.": "查看和管理代码扫描警报。",
                    // "": "代码空间",
                        "Create, edit, delete and list Codespaces.": "创建、编辑、删除和列出代码空间。",
                    "Codespaces lifecycle admin": "代码空间的生命周期管理",
                        "Manage the lifecycle of Codespaces, including starting and stopping.": "管理代码空间的生命周期，包括启动和停止。",
                    "Codespaces metadata": "代码空间元数据",
                        "Access Codespaces metadata including the devcontainers and machine type.": "访问代码空间元数据，包括开发容器和机器类型。",
                    "Codespaces secrets": "代码空间机密",
                        "Restrict Codespaces user secrets modifications to specific repositories.": "限制代码空间的用户机密对特定仓库的修改。",
                    "Commit statuses": "提交状态",
                        "Commit statuses.": "提交状态。",
                    "Contents": "内容",
                        "Repository contents, commits, branches, downloads, releases, and merges.": "仓库内容、提交、分支、下载、发布和合并。",
                    "Dependabot alerts": "Dependabot 警报",
                        "Retrieve Dependabot alerts.": "检索 Dependabot 警报。",
                    "Dependabot secrets": "Dependabot 机密",
                        "Manage Dependabot repository secrets.": "管理 Dependabot 仓库的机密。",
                    "Deployments": "部署",
                        "Deployments and deployment statuses.": "部署和部署状态。",
                    "Discussions": "讨论",
                        "Discussions and related comments and labels.": "讨论及相关评论和标签。",
                    "Environments": "环境",
                        "Manage repository environments.": "管理仓库环境。",
                    "Issues": "议题",
                        "Issues and related comments, assignees, labels, and milestones.": "议题及相关评论、受理人、标签和里程碑。",
                    "Merge queues": "合并列队",
                        "Manage a repository's merge queues": "管理仓库的合并队列。",
                    "Metadata": "元数据",
                        "Search repositories, list collaborators, and access repository metadata.": "搜索仓库、列出协作者，访问仓库元数据。",
                    "Packages": "软件包",
                        "Packages published to the GitHub Package Platform.": "发布软件包到 GitHub Package 平台。",
                    "Pages": "GitHub Pages",
                        "Retrieve Pages statuses, configuration, and builds, as well as create new builds.": "检索页面状态、配置和构建，以及创建新的构建。",
                    "Projects": "项目",
                        "Manage classic projects within a repository.": "管理仓库中的经典项目。",
                    "Pull requests": "拉取请求",
                        "Pull requests and related comments, assignees, labels, milestones, and merges.": "拉取请求及相关评论、受让人、标签、里程碑和合并。",
                    "Repository security advisories": "仓库安全公告",
                        "View and manage repository security advisories.": "查看和管理安全公告",
                    "Secret scanning alerts": "隐私扫描警报",
                        "View and manage secret scanning alerts.": "查看和管理隐私扫描警报。",
                    "Secrets": "隐私",
                        "Manage Actions repository secrets.": "管理操作仓库隐私。",
                    "Variables": "变量",
                        "Manage Actions repository variables.": "管理操作仓库变量。",
                    "Webhooks": "Web 钩子",
                        "Manage the post-receive hooks for a repository.": "管理仓库的接收后钩子。",
                    "Workflows": "工作流程",
                        "Update GitHub Action workflow files.": "更新 GitHub Actions 工作流程文件。",

                "Account permissions": "帐户权限",
                    "User permissions permit access to resources under your personal GitHub account.": "用户权限允许访问您个人 GitHub 帐户下的资源。",

                    "Block another user": "拉黑其他用户",
                        "View and manage users blocked by the user.": "查看和管理被用户拉黑的用户。",
                    "Codespaces user secrets": "代码空间用户机密",
                        "Manage Codespaces user secrets.": "管理代码空间用户机密。",
                    "Email addresses": "电子邮箱地址",
                        "Manage a user's email addresses.": "管理用户的电子邮箱地址。",
                    // 关注者
                        "A user's followers": "用户的关注者",
                    "GPG keys": "GPG 密钥",
                        "View and manage a user's GPG keys.": "查看和管理用户的 GPG 密钥。",
                    // Gist
                        "Create and modify a user's gists and comments.": "创建和修改用户的代码片段和评论。",
                    "Git SSH keys": "Git SSH 密钥",
                    "Interaction limits": "交互限制",
                        "Interaction limits on repositories": "仓库的交互限制",
                    "Plan": "计划",
                        "View a user's plan.": "查看用户的计划。",
                    "Private repository invitations": "私有仓库邀请",
                        "View a user's invitations to private repositories": "查看用户对私有仓库的邀请",
                    "Profile": "个人信息",
                        "Manage a user's profile settings.": "管理用户的个人信息设置。",
                    "SSH signing keys": "SSH 签名密钥",
                        "View and manage a user's SSH signing keys.": "查看和管理用户的 SSH 签名密钥。",
                    "Starring": "星标",
                        "List and manage repositories a user is starring.": "列出和管理用户已加星标的仓库。",
                    "Watching": "关注",
                        "List and change repositories a user is subscribed to.": "列出和更改用户订阅的仓库。",

                "Organization permissions": "组织权限",
                    "Organization permissions permit access to organization related resources.": "组织权限允许访问组织相关资源。",

                    // 管理
                        "Manage access to an organization.": "管理对组织的访问。",
                    "Blocking users": "拉黑用户",
                        "View and manage users blocked by the organization.": "查看和管理被组织拉黑的用户。",
                    "Custom properties": "自定义属性",
                        "View custom properties, write repository values, and administer definitions.": "查看自定义属性、写入仓库值并管理定义。",
                    "Custom repository roles": "自定义仓库角色",
                        "Create, edit, delete and list custom repository roles.": "创建、编辑、删除和列出自定义仓库角色。",
                    "Events": "活动",
                        "View events triggered by an activity in an organization.": "查看组织中某项活动所触发的事件。",
                    "GitHub Copilot for Business": "GitHub Copilot 商业版",
                        "Manage Copilot for Business seats and settings": "管理 GitHub Copilot 商业版席位和设置",
                    "Members": "成员",
                        "Organization members and teams.": "组织成员和团队。",
                    "Organization announcement banners": "组织公告横幅",
                        "View and modify announcement banners for an organization.": "查看并修改组织的公告横幅。",
                    "Organization codespaces": "组织代码空间",
                        "Manage Codespaces for an organization.": "管理组织的代码空间。",
                    "Organization codespaces secrets": "组织代码空间机密",
                        "Manage Codespaces Secrets for an organization.": "管理组织的代码空间机密。",
                    "Organization codespaces settings": "组织代码空间设置",
                        "Manage Codespaces settings for an organization.": "管理组织的代码空间设置。",
                    "Organization dependabot secrets": "组织 Dependabot 机密",
                        "Manage Dependabot organization secrets.": "管理 Dependabot 组织的机密。",
                    "Plan": "计划",
                        "View an organization's plan.": "查看组织的计划。",
                    // 项目
                        "Manage projects for an organization.": "管理组织的项目。",
                    // 隐私
                        "Manage Actions organization secrets.": "管理操作组织隐私",
                    "Self-hosted runners": "自托管运行器",
                        "View and manage Actions self-hosted runners available to an organization.": "查看和管理组织可用的'操作自托管运行器'。",
                    "Team discussions": "团队讨论",
                        "Manage team discussions and related comments.": "管理团队讨论及相关评论。",
                    // 变量
                        "Manage Actions organization variables.": "管理操作组织变量。",
                    // Web 钩子
                        "Manage the post-receive hooks for an organization.": "管理组织的接收后钩子。",

            // 概述
                // [/(\d+) permissions for none of your repositories/, ""],
                "permission": "项权限",
                "Organization permission": "项组织权限",
                "s": " ",
                "for": " ",
                "none": "无",
                "all": "所有",
                "of your repositories": "您的仓库",
                "Account permission": "项帐户权限",

                "This token will expire": "此令牌将过期：",
                "on an unselected custom date.": "未选择的自定义日期。",
                "This token will be ready for use immediately.": "该令牌将即可可用。",

        // https://github.com/settings/personal-access-tokens/<id>
            "No description": "暂无描述",
            "Created": "创建于",
            "Access on": "访问:",
            "Select the repositories this token can access. Personal access tokens can always read from all public repositories on GitHub.com": "选择此令牌可以访问的仓库。个人访问令牌始终可以读取 GitHub.com 上所有公共仓库中的内容。",
            "This token does not have access to any repositories.": "此令牌无权访问任何仓库。",
            "User permissions": "用户权限",
            "This token does not have any repository permissions.": "此令牌没有任何仓库权限。",

            // 顶部提醒
                "Your personal access token has been updated": "您的个人访问令牌已更新",

        // 重新生成精细化个人访问令牌 https://github.com/settings/personal-access-tokens/<id>/regenerate
            "Regenerate fine-grained personal access token": "重新生成精细化个人访问令牌",

        // 创建新个人访问令牌 https://github.com/settings/tokens/new
            "New personal access token (classic)": "新建个人访问令牌（经典）",
            "Note": "备注",
                "Note can't be blank": "备注不能为空",
            "What’s this token for?": "这个令牌有什么用？",

            "Expiration": "有效期",
            // "This token expires": "该令牌有效期至",
            ". To set a new expiration date, you must": "。要设置一个新的有效期，您必须",

            // 有效期 下拉菜单
            "7 days": "7天",
            "30 days": "30天",
            "60 days": "60天",
            "90 days": "90天",
            "Custom...": "自定义...",
            "No expiration": "无有效期",
            "The token will never expire!": "此令牌永不过期！",
            "GitHub strongly recommends that you set an expiration date for your token to help keep your information secure.": "GitHub 强烈建议您为令牌设置有效期，以帮助确保您的信息安全。",

            "Select scopes": "选择作用域",
            "Scopes define the access for personal tokens.": "作用域定义了个人令牌的访问范围。",
            "Read more about OAuth scopes.": "了解更多关于 OAuth 作用域的信息。",
            "Full control of private repositories": "完全控制私有仓库",
            "Access commit status": "访问提交状态",
            "Access deployment status": "访问部署状态",
            "Access public repositories": "访问公共仓库",
            "Access repository invitations": "访问仓库邀请",
            "Read and write security events": "读写安全事件",
            "Update GitHub Action workflows": "更新 GitHub Actions 工作流程",
            "Upload packages to GitHub Package Registry": "将包上传到 GitHub Packages 包注册",
            "Download packages from GitHub Package Registry": "从 GitHub Packages 包注册表下载包",
            "Delete packages from GitHub Package Registry": "从 GitHub Packages 包注册表中删除包",
            "Full control of orgs and teams, read and write org projects": "完全控制组织和团队，读写组织项目",
            "Read and write org and team membership, read and write org projects": "读写组织和团队成员，读写组织项目",
            "Read org and team membership, read org projects": "读取组织和团队成员，读取组织项目",
            "Manage org runners and runner groups": "管理组织运行器和运行器组",
            "Full control of user public keys": "完全控制用户公钥",
            "Write user public keys": "写入用户公钥",
            "Read user public keys": "读取用户公钥",
            "Full control of repository hooks": "完全控制仓库钩子",
            "Write repository hooks": "写入仓库钩子",
            "Read repository hooks": "读取仓库钩子",
            "Full control of organization hooks": "完全控制组织钩子",
            "Create gists": "创建 Gist",
            "Access notifications": "访问通知",
            "Update ALL user data": " 更新所有用户数据",
            "Read ALL user profile data": "读取所有用户个人资料数据",
            "Access user email addresses (read-only)": "访问用户电子邮箱地址（只读）",
            "Follow and unfollow users": "关注和取消关注用户",
            "Delete repositories": "删除仓库",
            "Read and write team discussions": "读写团队讨论",
            "Read team discussions": "读取团队讨论",
            "Full control of enterprises": "完全控制企业",
            "Manage enterprise runners and runner groups": "管理企业运行器和运行器组",
            "Read and write enterprise billing data": "读写企业计费数据",
            "Read enterprise profile data": "读取企业个人数据",
            "Full control of audit log": "完全控制审核日志",
            "Read access of audit log": "读取审核日志",
            "Full control of codespaces": "完全控制代码空间",
            "Ability to create, read, update, and delete codespace secrets": "创建、读取、更新和删除代码空间机密",
            "Full control of GitHub Copilot settings and seat assignments": "完全控制 GitHub Copilot 设置和席位分配",
                "View and edit Copilot for Business seat assignments": "查看和编辑 GitHub Copilot 商业版席位分配",
            "Full control of projects": "完全控制项目",
            "Read access of projects": "读取项目",
            "Full control of public user GPG keys": "完全控制公共用户 GPG 密钥",
            "(Developer Preview)": "（开发者预览版）",
            "Write public user GPG keys": "写入公共用户 GPG 密钥",
            "Read public user GPG keys": "读取公共用户 GPG 密钥",
            "Full control of public user SSH signing keys": "完全控制公共用户 SSH 签名密钥",
            "Write public user SSH signing keys": "写入公共用户 SSH 签名密钥",
            "Read public user SSH signing keys": "读取公共用户 SSH 签名密钥",            "Generate token": "生成令牌",
                // 顶部提醒
                "Some of the scopes you’ve selected are included in other scopes. Only the minimum set of necessary scopes has been saved.": "您选择的一些作用域包含在其他作用域中。只保存了必要作用域的最小集合。",

            "Make sure to copy your personal access token now. You won’t be able to see it again!": "确保立即复制您的个人访问令牌。您将无法再看到它！",

            "Are you sure you want to delete this token?": "您确定要删除此令牌吗？",
            "Any applications or scripts using this token will no longer be able to access the GitHub API. You cannot undo this action.": "任何使用此令牌的应用或脚本将无法再访问 GitHub API。您无法撤消此操作。",
            "I understand, delete this token": "我明白了，依然删除该令牌。",

        // 编辑个人访问令牌 https://github.com/settings/tokens/<id>
            "Edit personal access token (classic)": "编辑个人访问令牌（经典）",
            "If you’ve lost or forgotten this token, you can regenerate it, but be aware that any scripts or applications using this token will need to be updated.": "如果您丢失或忘记了此令牌，则可以重新生成它，但请注意，需要更新使用此令牌的任何脚本或应用。",
            "This token has no expiration date. To set a new expiration date, you must": "此令牌未设置有效期。要设置新的有效期，您必须",
            "regenerate the token": "重新生成令牌",
            "Update token": "更新令牌",
            "Delete personal access token": "删除个人访问令牌",
            "Delete token": "删除令牌",
            "Delete this token": "删除令牌",

        // 重新生成个人访问令牌 https://github.com/settings/tokens/<id>/regenerate
            "Regenerate personal access token (classic)": "重新生成个人访问令牌（经典）",
            "Submitting this form will generate a new token. Be aware that any scripts or applications using this token will need to be updated.": "提交此表单将产生一个新的令牌。请注意，任何使用该令牌的脚本或应用将需要更新。",
            "Regenerate token": "重新生成令牌",

    },
    "regexp": [ // 正则翻译
        [/The token will expire/, "该令牌有效期至"],
        [/Last used within the last (\d+) weeks?/, "最后一次使用是最近 $1 周之内"],
        [/Last used within the last (\d+) months?/, "最后一次使用是最近 $1 月之内"],
        [/Selected (\d+) repositor(y|ies)./, "选定 $1 个仓库"],
        [/Access:/, "访问权限:"],
    ],
};
I18N.zh["settings/personal-access-tokens"] = I18N.zh["settings/tokens"];

// 仓库相关==
I18N.zh["repository-public"] = { // 仓库-公共部分
    "static": { // 静态翻译
       // 仓库页面 /<user-name>/<repo-name>/
            // 公共部分 - 头部条
            "Public": "公共",
            "Private": "私有",
            "Public archive": "公共存档",
            "Private archive": "私有存档",
            "Public template": "公共模板",

            "forked from": "复刻自",
            "generated from": "创建自",

            "Pin": "置顶", // 组织仓库
            "Edit Pins": "编辑置顶", // 组织仓库
                "Pin to…": "置顶到…",
                "Profile": "个人资料页",
                    "Pin this to your personal profile, visible to everyone": "将此置顶到您的个人资料，对所有人可见",
                    "Limit reached": "已达上限",
                "Public pins in this organization": "该组织的公共置顶",
                    "Visible to anyone": "对任何人可见",
                "Private pins in this organization": "该组织的私有置顶",
                    "Visible to members only": "仅对成员可见",
            "Unpin": "取消置顶",

            "Ignoring": "忽略",
            "Stop ignoring": "取消忽略",
            "Watch": "关注",
            "Unwatch": "取消关注",

            "Star": "星标",
            "Unstar": "已加星标",
            "Fork": "复刻",
            "Unfork": "取消复刻",

            "Sponsor": "赞助",
            // 赞助对话框
            // [/Sponsor ([^ ]+)?/, "赞助 $1"], // 赞助按钮 对话框 标题
            "External links": "外部链接",
            "Learn more about funding links in repositories": "了解更多关于仓库中的赞助链接的信息",
            "Report abuse": "举报滥用",

            // 关注 & 订阅通知设置 下拉菜单
            "Notification settings": "通知设置", //小屏模式
            "Notifications": "通知类型",
            "Participating and @mentions": "参与和 @您",
                "Only receive notifications from this repository when participating or @mentioned.": "仅在参与或 @您 时接收来自此仓库的通知。",
            "All Activity": "所有活动",
                "Notified of all notifications on this repository.": "接收来自此仓库所有通知。",
            "Ignore": "忽略",
                "Never be notified.": "永不接收通知。",
            "Custom": "自定义",
                "Select events you want to be notified of in addition to participating and @mentions.": "选择除参与和 @您 之外还要接收通知的事件。",
            "Get push notifications on": "要获取推送通知，使用",
            "Releases": "发行版",
                "Issues are not enabled for this repository": "此仓库未启用议题功能",
            "Discussions": "讨论",
                "Discussions are not enabled for this repository": "该仓库未启用讨论功能",
                "Discussions are not enabled for this repo": "此仓库未启用讨论功能",
            "Security alerts": "安全警报",
            //"Cancel": "取消",
            "Apply": "应用",

            // 复刻下拉
            // [/Fork your own copy of ([^ ]+)/, "复刻成您自己的 $1 副本"],
            "Cannot fork because repository is empty.": "无法复刻，因为仓库是空的。",
            "Cannot fork because you own this repository and are not a member of any organizations.": "不能复刻，因为您拥有该仓库，而且不是任何组织的成员。",
            "Existing forks": "现有的复刻",
            "You don't have any forks of this repository.": "您没有此仓库的任何复刻。",
            "Create a new fork": "创建复刻",

            //
            "Star this repository": "星标仓库", //小屏模式
            "Add to list": "添加到清单",
            "Lists": "清单",
            "You don't have any lists yet.": "您尚无任何清单。",
            "Create list": "创建清单",
                "Create a list to organize your starred repositories.": "创建一个清单来组织您的星标仓库。",
                "⭐️ Name this list": "⭐️ 清单名称",
                "Write a description": "简单描述",
                "Lists are currently in beta.": "清单目前处于测试阶段。",
                "Share feedback and report bugs.": "分享反馈意见和报告错误。",
                "Creating...": "创建中...",

             // 用户 浮动信息卡
                "Recently edited these files": "最近编辑过这些文件",
                "Owns this repository": "拥有这个仓库",
                "Left a review": "留下了一个评论",
                "Committed to this repository": "已提交过这个仓库",
                "Committed to this repository in the past day": "最近一个天里已提交过这个仓库",
                "Committed to this repository in the past week": "最近一个周里已提交过这个仓库",
                "Committed to this repository in the past month": "最近一个月里已提交过这个仓库",
                "Member of": "隶属组织",
                // [/, and (\d+) more/, "，以及其他 $1 个组织"],
                "Opened this issue": "打开了该议题",
                "Opened this pull request": "打开了该拉取请求",
                "Opened this pull request (their first ever)": "打开了该拉取请求（他们有史以来的第一个请求）",

            // 组织  浮动信息卡
                // [/(\d+) repositor(y|ies)/, "$1 个仓库"],
                // [/(\d+) members?/, "$1 个成员"],


            "Jump to bottom": "跳到底部", //小屏模式

            // 标签栏
            "Code": "代码",
            "Pull requests": "拉取请求",
            "Discussions": "讨论",
            "Actions": "操作",
            "Projects": "项目",
            "Security": "安全",
            "Insights": "洞察",
            "Settings": "设置",

            // "Pulse": "统计",
            // "Graphs": "图表",

            // 返回通知页状态条
            "Back to notifications": "回到通知",
            "Done": "已完成",
            "Unsubscribe": "退订",
            "Mark as read": "标记为已读",
            "Mark as unread": "标记为未读",
            "Save": "保存",

            // 评论框头部栏 (议题 & 拉取请求)
                "Contributor": "贡献者",
                "Owner": "所有者",
                "Author": "作者",
                    "You are the author of this issue.": "您是这个议题的作者。",  // 议题
                    "You are the author of this pull request.": "您是这个拉取请求的作者。", // 拉取请求
                    "This user is the author of this issue.": "该用户是这个议题的作者。",// 拉取请求
                    "This user is the author of this pull request.": "该用户是这个拉取请求的作者。",// 拉取请求
                "Member": "成员",
                    //[/This user is a member of the ([^ ]+)./, "该用户是 $1 组织的成员。"],
                "Collaborator": "协作者",
                    //[/This user has been invited to collaborate on the ([^ ]+) repository./, "该用户已被邀请在 $1 仓库上进行协作。"],
                "Pick your reaction": "选择您的表情",
                "Copy link": "复制链接",
                "Quote reply": "引用回复",
                "Reference in new issue": "引用到新议题",
                    // 引用到新议题 对话框
                    "Body": "正文",
                "Report content": "举报内容",
                "Report": "举报",
                // 评论删除提醒
                    "Are you sure you want to delete this?": "您定要删除这个吗？",

                "commented": "评论于",
                "— with": "— 通过",
                "Update comment": "更新评论",
                "Hide": "隐藏",

                "created": "创建",
                "edited": "编辑",
                "(most recent)": "(最近的)",
                "(deleted)": "(已删除)",
                "deleted this content": "删除了该内容",
                // 评论历史查看
                "Options": "选项",
                // 选项下拉菜单
                "More options": "更多选项",
                "The most recent revision cannot be deleted. Need to delete sensitive information? Go to the specific edit where the information was added.": "最近的修订版不能被删除。需要删除敏感信息？请到信息的具体编辑处修改。",
                "Delete revision from history": "从历史记录中删除修订",
                "This edit’s content will no longer be visible": "此修改的内容将不再可见",

            // 键盘快捷键
                "Open in codespace"  : "在代码空间中打开",
                "Open in github.dev editor"  : "在 github.dev 编辑器中打开",
                "Open github.dev editor in a new tab"  : "在新标签页中打开 github.dev 编辑器",
                "Open cs.github.com in a new tab": "在新标签页中打开 cs.github.com",
                "Focus secondary search bar" : "聚焦二级搜索栏",
                "Go to Code"                 : "跳转到代码",
                "Go to Issues"               : "跳转到议题",
                "Go to Pull Requests"        : "跳转到拉取请求",
                "Go to Actions"              : "跳转到操作",
                "Go to Projects"             : "跳转到项目",
                "Go to Wiki"                 : "跳转到 Wiki",
                "Go to Discussions"          : "跳转到讨论",

            // 议题
                "Submit comment": "提交评论",
                "Submit comment and close issue": "提交评论并关闭议题",
                "Preview comment": "预览评论",
                "Create issue": "创建议题",
                // "筛选用户": "",
                "Filter by or edit assignees"  : "按受理人筛选或编辑受理人",
                "Filter by or edit labels"     : "按标签筛选或编辑标签",
                "Filter by or edit projects"   : "按项目筛选或编辑项目",
                "Filter by or edit milestones" : "按里程碑筛选或编辑里程碑",
                "Reply (quoting selected text)": "答复（引用所选文本）",
                "Open saved replies": "打开快捷回复（引用所选文本）",
                "Insert saved reply (with open saved replies)": "插入快捷回复（打开快捷回复）",

                "Pull request list": "拉取请求列表",
                    "Open pull request"  : "打开拉取请求",
                "Pull request - Conversation tab": "拉取请求 - 对话标签卡",
                    "Submit comment and close or open pull request":"提交评论和关闭或打开拉取请求",
                    "Request reviewers": "请求审阅者",
                    "Link an issue or pull request from the same repository": "链接同一仓库的议题或拉取请求",
                    "Toggle visibility of all collapsed review comments instead of just the current one": "切换所有折叠审查评论的可见性，而不仅仅是当前的审查评论",
                "Pull request - Files changed tab": "拉取请求 - 文件更改标签卡",
                    "Open commits list": "打开提交列表",
                    "Open files list": "打开文件列表",
                    "Next commit": "下一个提交",
                    "Previous commit": "上一个提交",
                    "Show or hide annotations": "显示或隐藏批注",
                    "Show or hide comments": "显示或隐藏评论",
                    "Submit a review comment": "提交审查意见",
                    "Collapse or expand all files instead of just the current one": "折叠或展开所有文件，而不仅仅是当前文件",
                    "and click": "和点击",

            // 高频词
                "Open": "打开",
                "Closed": "已关闭",
                "Merged": "已合并",
                "Draft": "草案",
                "Branch": "分支",
                "Branches": "分支",
                "Tags": "标签",

            "Compare & pull request": "比较 & 拉取请求",

    },
    "regexp": [ // 正则翻译
        [/, and (\d+) more/, "，以及其他 $1 个组织"], // 用户 浮动信息卡
        [/(\d+) repositor(y|ies)/, "$1 个仓库"], // 组织  浮动信息卡
        [/(\d+) members?/, "$1 个成员"], // 组织  浮动信息卡
        [/Sponsor ([^ ]+)/, "赞助 $1"], // 赞助对话框 标题
        [/Fork your own copy of ([^ ]+)/, "复刻成您自己的 $1 副本"], // 复刻按钮提示
        [/had recent pushes (\d+) minutes? ago/, "分支有了最新的推送，$1 分钟之前"],
        [/had recent pushes less than (\d+) minutes? ago/, "分支有了最新的推送，不到 $1 分钟"],
        [/had recent pushes about/, "分支有了最新的推送，大约"],
        [/This user is a member of the ([^ ]+)./, "该用户是 $1 组织的成员。"],
        [/This user has been invited to collaborate on the ([^ ]+) repository./, "该用户已被邀请在 $1 仓库上进行协作。"],
        [/This repository has been archived by the owner (on .+). It is now read-only./, "此仓库已由所有者于 $1 存档。它现在是只读的。"],
    ],
};

I18N.zh["page-new-repo"] = {// 仓库 - 新建/导入/复刻仓库
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 新建仓库 https://github.com/new
            "Create a new repository": "创建新仓库",
            "A repository contains all project files, including the revision history.": "仓库包含项目中的所有文件，包括修订历史记录。",
            "Already have a project repository elsewhere?": "在其他地方已有仓库？",
            "Import a repository.": "导入仓库",
            //"Cancel": "取消",
            //"Begin import": "开始导入",
            "Owner": "所有者",
            "Repository name": "仓库名称",
            "Great repository names are short and memorable. Need inspiration? How about": "好的仓库名称应该简单且容易记忆。需要灵感吗？这个怎么样：",
                "Checking availability…": "检查可用性…",
                "is available.": "名称可用。",
                "The repository": "仓库",
                "already exists on this account.": "已经存在于此帐户。",
                "Your new repository will be created as": "您的新仓库将被创建为",
                "New repository name must not be blank": "新仓库名称不能为空",

                // 用户名同名仓库
                "You found a secret!": "您发现了一个秘密！",
                "is a ✨": "是一个 ✨",
                "special": "特别的",
                "✨ repository that you can use to add a": "✨ 仓库，您可以用它来添加一个",
                "to your GitHub profile. Make sure it’s public and initialize it with a": "到您的 GitHub 个人资料。确保它是公开的，并在初始化时加入一个",
                "to get started.": "以便开始工作。",
                 // 组织 .github 仓库
                "to your organization's GitHub profile. Make sure it’s public and initialize it with a": "到您组织的 GitHub 个人资料。确保它是公开的，并在初始化时加入一个",
                "in the": "在",
                "directory to get started.": "目录下以便开始工作。",

            "Description": "描述",
                "(optional)": "(可选)",
            "Public": "公共",
                "Anyone on the internet can see this repository. You choose who can commit.": "任何人都可以看到这个仓库，您可以选择谁能提交。",
            "Private": "私有",
                "You choose who can see and commit to this repository.": "您可以选择谁可以看和提交到该仓库。",
            "Initialize this repository with:": "使用以下方式初始化此仓库：",
                "Skip this step if you’re importing an existing repository.": "如果您要导入现有仓库，请跳过此步骤。",
            "Add a README file": "添加 README 文件",
                "This is where you can write a long description for your project.": "您可以在此处为您的项目编写详细描述。",
                "Learn more about READMEs.": "了解更多关于 README 的信息。",
            "Add .gitignore": "添加 .gitignore 文件",
                "Choose which files not to track from a list of templates.": "从模板列表中选择哪些文件不需要跟踪。",
                "Learn more about ignoring files.": "了解更多关于忽略文件的信息。",
            ".gitignore template:": ".gitignore 模板：",
                ".gitignore template": ".gitignore 模板",
                "Filter…": "筛选…",
                "None": "无",
            "Choose a license": "选择许可证",
                "A license tells others what they can and can't do with your code.": "许可证告诉其他人，他们可以使用您的代码做什么和不能做什么。",
                "Learn more about licenses.": "了解更多关于许可证的信息。",

                "License:": "许可证：",
                    "License": "许可证",

            "You are creating a public repository in your personal account.": "您正在个人帐户中创建公共仓库",
            "You are creating a private repository in your personal account.": "您正在个人帐户中创建私有仓库",

            "This will set": "这将设置",
            "as the default branch.": "为默认分支。",
            "Change the default name in": "变更默认名称在",
            "your": "您的",
            "settings": "设置",

            "Create repository": "创建仓库",
            "Creating repository…": "创建仓库中…",

        // 导入仓库 第一页 https://github.com/new/import
            "Import your project to GitHub": "将您的项目导入到 GitHub",
                "Import all the files, including revision history, from another version control system.": "导入的所有文件，包括修订历史记录，来自其他版本控制系统。",

                "Support for importing Mercurial, Subversion and Team Foundation Version Control (TFVC) repositories will end on October 17, 2023. For more details, see the": "对导入 Mercurial、Subversion 和 Team Foundation 版本控制 (TFVC) 仓库的支持将于 2023 年 10 月 17 日结束。有关详细信息，请参阅",
                "changelog": "更新日志",

            "Your old repository's clone URL": "您旧仓库的克隆地址",
            "Learn more about the types of": "了解更多关于",
            "supported VCS": "VCS 的支持",
            "Your new repository details": "新仓库详情",
            //"Owner": "所有者",
            "Repository Name": "仓库名称",
                // "is available.": "名称可用。",
                //"The repository": "仓库",
                //"already exists on this account.": "已经存在于此帐户。",
                //"Your new repository will be created as": "您的新仓库将被创建为",
            //"Public": "公共",
            //"Anyone on the internet can see this repository. You choose who can commit.": "任何人都可以看到这个仓库，您可以选择谁能提交。",
            //"Private": "私有",
            //"You choose who can see and commit to this repository.": "您可以选择谁可以看和提交到该仓库。",
            "Cancel": "取消",
            "Begin import": "开始导入",
            "Preparing import…": "准备导入…",

        // 复刻仓库 /<user-name>/<repo-name>/fork
            "Create a new fork": "创建新复刻",
            "A": " ",
            "is a copy of a repository. Forking a repository allows you to freely experiment with changes without affecting the original project.": "是一个仓库的副本。复刻仓库可以让您在不影响原项目的情况下自由地进行修改实验。",
            "View existing forks.": "查看现有复刻。",
            "No available destinations to fork this repository.": "没有复刻此仓库的可用目标。",
            "Required fields are marked with an asterisk (*).": "带星号 (*) 的为必填项。",
            "Creating fork…": "正在创建复刻…",

            "Owners": "所有者",
                "Choose an owner": "选择所有者",
            "Repository name": "仓库名称",

                // [/is available./, "名称可用。"], // 复刻页面
                "The repository": "仓库",
                "already exists on this account.": "已经存在于此帐户。",
                "Your new repository will be created as": "您的新仓库将被创建为",
                    "The repository name can only contain ASCII letters, digits, and the characters": "仓库名称只能包含 ASCII 字母、数字和字符",

            "By default, forks are named the same as their upstream repository. You can customize the name to distinguish it further.": "默认情况下，复刻的名称与他们的上游仓库相同。您可以自定义名称以进一步区分它。",
            "(optional)": "（可选）",

            "Copy the": "仅复制",
            "branch only": "分支",

            "Contribute back to": "回馈给",
            "by adding your own branch.": "通过添加您自己的分支。",

            "You are creating a fork in your personal account.": "您正在向您的个人帐户中创建一个复刻。",
            "Create fork": "创建复刻",

    },
    "regexp": [ // 正则翻译
        [/([^ ]+) is available\./,"$1 名称可用。"],
        [/You are creating a public repository in the ([^ ]+) organization./,"您正在 $1 组织中创建一个公共仓库。"], // 创建组织的公共仓库
        [/You are creating a private repository in the ([^ ]+) organization./,"您正在 $1 组织中创建一个私有仓库。"], // 创建组织的私有仓库
        [/\(fork already exists\)/, "（复刻已存在）"], // 复刻页面
        [/\(repository already exists\)/, "（仓库已存在）"], // 复刻页面
        [/is available./, "名称可用。"], // 复刻页面
        [/You are creating a fork in the ([^ ]+) organization./, "您正在 $1 组织中创建一个复刻。"], // 复刻页面
        ...I18N.zh["repository-public"]["regexp"],
        // [/, and (\d+) more/, "，以及其他 $1 个组织"], // 用户 浮动信息卡
        // [/(\d+) repositor(y|ies)/, "$1 个仓库"], // 组织  浮动信息卡
        // [/(\d+) members?/, "$1 个成员"], // 组织  浮动信息卡
    ],
};
I18N.zh["new"] = I18N.zh["page-new-repo"];
I18N.zh["new/import"] = I18N.zh["page-new-repo"];
I18N.zh["repository/fork"] = I18N.zh["page-new-repo"];
I18N.zh["orgs/repositories/new"] = I18N.zh["page-new-repo"];

I18N.zh["repository"] = { // 仓库页面 /<user-name>/<repo-name>/
    "static": { // 静态翻译
            ...I18N.zh["repository-public"]["static"],

            // 被 GitHub 官方禁用
            "This repository has been disabled.": "此仓库已被禁用。",
            "Access to this repository has been disabled by GitHub Staff due to a violation of GitHub's terms of service. If you are the owner of the repository, you may reach out to GitHub Support for more information.": "由于违反了 GitHub 的服务条款，GitHub 已禁止访问此仓库。如果您是仓库的所有者，您可以联系 GitHub 支持以获取更多信息。",

            // 仓库违反 DMCA
            "Repository unavailable due to DMCA takedown.": "由于 DMCA 删除，仓库不可用。",
            "This repository is currently disabled due to a DMCA takedown notice. We have disabled public access to the repository. The notice has been": "由于 DMCA 删除通知，此仓库当前已被禁用。我们已经禁止公众访问该仓库。该通知已",
            "publicly posted": "公开发布",
            "If you are the repository owner, and you believe that your repository was disabled as a result of mistake or misidentification, you have the right to file a counter notice and have the repository reinstated. Our help articles provide more details on our": "如果您是仓库所有者，并且您认为您的仓库由于错误或误认而被禁用，您有权提交反通知并恢复仓库。我们的帮助文章提供了关于我们的更多详细信息",
            "DMCA takedown policy": "DMCA 删除政策",
            "how to file a counter notice": "如何提交反通知",
            ". If you have any questions about the process or the risks in filing a counter notice, we suggest that you consult with a lawyer.": "。如果您对提交反通知的流程或风险有任何疑问，我们建议您咨询律师。",

        // 代码标签卡 & 仓库首页 /<user-name>/<repo-name>/ 和 /<user-name>/<repo-name>/tree/<branch>
            // [/Branch ([^ ]+) was renamed to ([^ ]+)./, "分支 $1 已更名为 $2。"],

            // 快捷键
                "Commands": "命令",
                "Clone repository: Copy HTTPS": "克隆仓库：复制 HTTPS",
                "Clone repository: Copy SSH": "克隆仓库：复制 SSH",
                "Clone repository: Copy GitHub CLI": "克隆仓库：复制 GitHub CLI",
                "Copy file permalink": "复制文件永久链接",

            // 仓库主页 分支保护
                // [/Your ([^ ]+) branch isn't protected/, "您的 $1 分支不受保护"], // 仓库主页 分支保护
                "Your": "您的",
                "branch isn't protected": "分支不受保护", // 新版仓库概述
                "Protect this branch from force pushing or deletion, or require status checks before merging.": "保护此分支免受强制推送或删除，或在合并前要求状态检查。",
                "View documentation.": "查看文档",
                "Protect this branch": "保护该分支",

            // 仓库主页 Dependabot 警告框
                "We found potential security vulnerabilities in your dependencies.": "我们在您的依赖项中发现了潜在的安全漏洞。",
                "Only the owner of this repository can see this message.": "仅此仓库的所有者可以看到此消息。",
                "See Dependabot alerts": "查看 Dependabot 警报",

            // 空仓库
                "This repository is empty.": "此仓库是空的。",
                "Care to check out the": "是否愿意查看",
                "GitHub Channel on YouTube": "YouTube 上的 GitHub 频道",
                "while you wait?": "在您等待的时候？",

            // 已上架的 GitHub Action 项目
                "Use this GitHub action with your project": "将此 GitHub Actions 用于您的项目",
                "Add this Action to an existing workflow or create a new one": "将此操作添加到现有工作流程或创建新工作流程",
                "View on Marketplace": "去市场查看",

            // 未上架的 GitHub Action 项目
                "You can publish this Action to the GitHub Marketplace": "您可以将此 Action 发布到 GitHub 市场",
                "Draft a release": "起草发布",

            // 访问已删除的分支
            "This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.": "这个提交不属于本仓库的任何分支，可能属于仓库以外的分支。",

            // 最近有了新提交提醒
            // [/had recent pushes less than/, "有了最近的推送，不到"], //最近有了新提交提醒
            // [/had recent pushes/, "有了最近的推送，"], //最近有了新提交提醒

            "Navigate back to": "导航回", // 小屏模式

            // 左侧正文
            // 切换分支/标签 下拉菜单
                "Switch branches/tags": "切换分支/标签",
                "Find or create a branch…": "查找或创建分支…",
                "Find a branch...": "查找分支...",
                "Filter branches/tags": "搜索分支/标签",
                "Branches": "分支",
                "default": "默认",
                "View all branches": "查看全部分支",
                "Find a tag": "查找标签",
                "Tags": "标签",
                "Search for a tag": "搜索标签",
                "Nothing to show": "暂无",
                "View all tags": "查看全部标签",

            // 默认分支被重命名提醒框
                "The default branch has been renamed!": "默认分支已被重新命名!",
                "is now named": "已被重新命名为",
                "If you have a local clone, you can update it by running the following commands.": "如果您有一个本地克隆，您可以通过运行以下命令来更新它。",
                "OK, got it": "好的，我知道了！",

            "branch": "分支",
            "branches": "分支",
            "tag": "标签",
            "tags": "标签",

            "Go to file": "转到文件",
                "No matches found": "未找到匹配项",
            "Add file": "添加文件",
                // 添加文件 下拉菜单
                "Create new file": "新建文件",
                "Upload files": "上传文件",

            // 代码 下拉菜单
                "Local": "本地",
                    "Clone": "克隆",
                        // HTTPS
                        "Use Git or checkout with SVN using the web URL.": "使用 Git 或 SVN 通过该网址检出。",
                        // SSH
                        "You don't have any public SSH keys in your GitHub account. You can": "您的 GitHub 帐户中没有任何公共 SSH 密钥。您可以",
                        "add a new public key": "添加新的公共密钥",
                        ", or try cloning this repository via HTTPS.": "，或尝试通过 HTTPS 克隆此仓库。",

                        "Use a password-protected SSH key.": "使用受密码保护的 SSH 密钥。",
                        // GitHub CLI
                        "Work fast with our official CLI.": "使用我们的官方 CLI 快速工作。",
                        "Learn more about the CLI": "了解更多关于 CLI 的信息",

                    "Open with GitHub Desktop": "在 GitHub Desktop 中打开",
                    "Open with Visual Studio": "在 Visual Studio 中打开",
                    "Download ZIP": "下载 ZIP 压缩包",

                    "Which remote URL should I use?": "我应该使用哪个远程 URL ?",
                    // "Copy to clipboard": "复制到剪切板",
                    // "Copied!": "✅ 复制成功!",

                // 代码空间
                    "Your workspaces in the cloud": "您在云端的工作空间",
                    //[/Create a codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
                    "Codespace repository configuration": "代码空间仓库配置",
                        "New with options...": "新建（选项）...",
                        "Configure dev container": "配置开发容器",
                        "Set up prebuilds": "设置预构建",
                        "Manage codespaces": "管理代码空间",
                        "Share a deep link": "分享深度链接",
                        "What are codespaces?": "什么是代码空间？",
                    "No codespaces": "尚无代码空间",
                    "You don't have any codespaces with this repository checked out": "您没有检出此仓库的任何代码空间",
                    //[/Create codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
                    "Learn more about codespaces...": "了解更多关于代码空间的信息...",
                    "Codespace usage for this repository is paid for by": "此仓库的代码空间使用费用由",

                    "On current branch": "在当前分支",
                        "No codespaces on current branch": "当前分支上没有代码空间",
                    "On other branches": "在其他分支",
                    "miniature adventure": "迷你探险",
                    "Open miniature adventure in web": "在网络中打开迷你探险",
                    "Active": "激活",
                        "Open in ...": "打开 ...",
                            "Open in browser": "在浏览器中打开",
                            "Open in Visual Studio Code": "在 Visual Studio Code 中打开",
                            "Open in JetBrains Gateway": "在 JetBrains Gateway 中打开",
                            "Open in JupyterLab": "在 JupyterLab 中打开",
                        "Rename": "重命名",
                            "Change codespace display name to...": "将代码空间显示名称更改为...",
                        "Export changes to a branch": "将更改导出到分支",
                            "This will create a new branch with any unpushed changes": "这将创建一个包含任何未推送更改的新分支",
                            "Create branch": "创建分支",
                        "Change machine type": "更改机器类型",
                            "Change codespace machine type": "更改代码空间机器类型",
                            "Machine type": "机器类型",
                                "2-core": "双核",
                                "4-core": "四核",
                            "Need even more power?": "需要更多的力量？",
                            "Contact our team": "联系我们团队",
                            "to enable 32-core or GPU machines.": "启用 32 核或 GPU 机器。",
                            "Update codespace": "升级代码空间",
                        "Stop codespace": "停止代码空间",
                    "Codespace configuration": "代码空间设置",
                    "No changes": "未更改",

                    // [/Codespace \"(.+)\" stopped./, "代码空间 “$1” 已停止。"],
                    // [/Codespace \"(.+)\" deleted./, "代码空间 “$1” 已删除。"],
                    // [/Are you sure you want to delete (.+)\?/, "您确定要删除 $1 吗？"],


            "Use this template": "使用此模板",
                "Create a new repository": "创建新仓库",
                "Open in a codespace": "在代码空间中打开",

            // 个人仓库 当前分支状态
            "This branch is": "该分支",
            "ahead of": "领先与", // 新版仓库概述
            "behind": "落后", // 新版仓库概述
            "This branch is up to date with": "该分支保持同步与", // 新版仓库概述

            "Contribute": "贡献",
                // 贡献按钮下拉菜单
                "No new commits yet. Enjoy your day!": "尚无新提交。祝您愉快！",
                "Open a pull request to contribute your changes upstream.": "打开拉取请求以向上游贡献您的更改。",
                "Open pull request": "打开拉取请求",

            "Sync fork": "同步复刻",
                // 同步复刻按钮下拉菜单
                "This branch is out-of-date": "此分支已过时",
                "Update branch to merge the latest changes from the upstream repository into this branch.": "更新分支，将上游仓库的最新修改合并到本分支。",
                // [/Update branch to keep this branch up-to-date by syncing (\d+) commits? from the upstream repository./, "通过从上游仓库同步 $1 个提交来更新分支，以使该分支保持最新。"], // 同步复刻
                "Update branch to keep this branch up-to-date by syncing": "更新分支以保持该分支与最新状态同步，需要同步",
                "from the upstream repository.": "来自上游仓库。",
                "Learn more about syncing a fork": "了解更多关于复刻同步的信息",
                // [/This branch is not behind the upstream ([^ ]+)/, "该分支不落后与上游 $1"], // 同步复刻
                "No new commits to fetch. Enjoy your day!": "尚无新提交。祝您愉快！", //相同
                "Compare": "对比",
                "Update branch":"更新分支",
                "Updating...":"正在更新中…",

                "This branch has conflicts that must be resolved": "该分支有必须解决的冲突",
                // [/Discard (\d+) commits? to make this branch match the upstream repository. (\d+)commits? will be removed from this branch./, "丢弃 $1 个提交，以使本分支与上游仓库一致。$2 个提交将从本分支中删除。"],
                "Discard": "丢弃", // 新版仓库概述
                "to make this branch match the upstream repository.": "，以使本分支与上游仓库一致。", // 新版仓库概述
                "will be removed from this branch.": "将从本分支中删除。", // 新版仓库概述
                "You can resolve merge conflicts using the command line and a text editor.": "您可以使用命令行和文本编辑器解决合并冲突。",
                // [/Discard (\d+) commits?/, "丢弃 $1 个提交"],
                "Discarding changes...": "放弃更改...",

                // 顶部提醒
                    // [/Successfully fetched and merged from upstream ([^ ]+)/, "成功从上游 $1 获取并合并。"],

            // "Choose a head ref": "选择一个头引用",

            // "There isn’t anything to compare.": "没有什么可比较的。",
            // "and": "和",
            // "are entirely different commit histories.": "是完全不同的提交历史。",
            // "No commit comments for this range": "在此范围内没有提交评论",
            // "No new commits yet. enjoy your day!": "尚无新提交。祝您愉快！",
            // "Find a branch": "查找分支",

            // 正文
            "commit": "次提交",
            "commits": "次提交",
            // [/([\d,]+) Commits?/, "$1 次提交"], // 新版仓库概述

            "Failed to load latest commit information.": "载入最新提交信息失败。",

            "View code": "查看代码", //小屏模式

            // 仓库缺失 README 提醒
            "Help people interested in this repository understand your project by adding a README.": "通过添加 README，帮助对此仓库感兴趣的人了解您的项目。",
            "Add a README": "添加 README",

            // 右侧栏

            // 与用户名同名仓库 编辑 README
            "is a special repository.": "是一个特殊的仓库。",
            "Its": "它的",
            "will appear on your public profile.": "将出现在您的公开个人资料中。",
            "Edit README": "编辑 README",
            "Visit profile": "查看资料",

            "is special. If you": "是特殊的。如果您",
            "make this a public repository": "将仓库设置为公开",
            ", its": "，它的",
            "Go to Settings": "前往设置",

            // 组织下.github 仓库 README
                "is a special repository. Create a": "是一个特殊的仓库。创建",
                "and it will appear on the organization's profile!": "并将出现在该组织资料中!",
                "Add profile README": "添加 profile/README",

                "is a special repository.": "是一个特殊的仓库。",
                "will appear on the organization's profile.": "将出现在该组织资料中。",

            // 组织下.github-private 仓库 README
                "Add a README with an overview of your project.": "为您项目添加一个概述 README 文件。",
                "The": " ",
                // [/will appear on ([^ ]+)'s member profile, visible only to organization members./, "将出现在 $1 的成员资料中，仅对组织成员可见。"],

            // "About": "关于"，
            "No description, website, or topics provided.": "未提供描述、网站或主题。",
            "Readme": "自述文件",
            "View license": "查看许可证",
            "Code of conduct": "行为准则",
            "Security policy": "安全政策",
            "Activity": "活动",
            "star": "星标",
            "stars": "星标",
            "watching": "关注",
            "fork": "复刻",
            "forks": "复刻",
            "Report repository": "举报仓库",
            "Public repository": "公共仓库", //小屏模式
            "Private repository": "私有仓库", //小屏模式


            // 仓库描述编辑 对话框
            "Edit repository details": "编辑仓库简述",
            "Description": "描述",
            "Short description of this repository": "简短的描述下您的仓库",
            "Website": "网址",
            "Enter a valid URL": "请输入有效的 URL",
            "Use your GitHub Pages website": "使用您的 GitHub Pages 站点",
            "Topics": "主题",
            "(separate with spaces)": "（空格分隔）",
            "Suggested:": "建议：",
                "Add this topic": "接受该建议",
                "Decline this topic": "拒绝该建议",
                    "This isn’t relevant": "这并不相关",
                    "This is too specific": "这太具体了",
                    "This is too general": "这太笼统了",
                    "I just don’t like it": "我只是不喜欢它",
            "Include in the home page": "包含在主页中",
            "Save changes": "保存更改",
                // 顶部提醒
                "Your repository details have been saved.": "您的仓库简述已保存。",

            "Releases": "发行版",
                "No releases published": "未发布任何版本",
                "Latest": "最新",
                "Create a new release": "创建发行版",
            // "Packages": "软件包",
                "No packages published": "未发布软件包",
                "Publish your first package": "发布软件包",
            "Sponsor this project": "赞助本项目",
                "Learn more about GitHub Sponsors": "了解更多关于 GitHub 赞助者的信息",
            "Used by": "使用者",
            "Contributors": "贡献者",
            "Environments": "环境",
            "Deployments": "部署",
                "+ more deployments": "+ 更多部署",
            "Languages": "语言",

            // "branch": "分支",
            // "branches": "分支",
            // "release": "次发布",
            // "releases": "次发布",
            // "contributor": "个贡献者",
            // "contributors": "个贡献者",

        // 新版仓库概述
            // /<user-name>/<repo-name>#coc
                "Add a code of conduct": "添加行为准则",
                "Define community standards, signal a welcoming and inclusive project, and outline procedures for handling abuse by adding a code of conduct.": "通过添加行为准则，明确社区标准，体现项目的欢迎和包容性，并概述处理滥用行为的程序。",

            // /<user-name>/<repo-name>#license
                "License": "许可证",
                "Add a license": "添加许可证",
                "Add a license to your repository to make it clear how others can use, change, and contribute to your project.": "向仓库中添加许可证，以明确其他人可以如何使用、更改您的项目并为您的项目做出贡献。",

            // /<user-name>/<repo-name>#security
                "Add a security policy": "添加安全策略",
                "Help your community understand how to securely report security vulnerabilities for your project.": "帮助您的社区了解如何安全地报告项目的安全漏洞。",

        // Action 仓库 右侧栏
            "Suggested Workflows": "建议的工作流程",
            "Based on your tech stack": "基于您的技术堆栈",
            "Set up": "设立",
            "Configure": "设置",
            "More workflows": "更多工作流程",
            "Dismiss suggestions": "隐藏建议",

        // 仓库复刻中...
            // [/Forking ([^ ]+)/, "复刻 $1 中"], // 复刻中...
            "Generating your repository...": "正在创建您的仓库...",
            "It should only take a few seconds.": "应该只需要几秒钟的时间。",
            "Refresh": "刷新",

        // 初始化空仓库 /<user-name>/<repo-name>/
            // 组织仓库
            "Set up GitHub Copilot": "设置 GitHub Copilot",
                "Use GitHub's AI pair programmer to autocomplete suggestions as you code.": "使用 GitHub 的 AI 配对程序员在您编码时自动完成建议。",
            "Invite collaborators": "邀请合作者",
                "Find people using their GitHub username or email address.": "使用 GitHub 用户名或电子邮件地址查找人员。",

            "Quick setup": "快速安装",
            "— if you’ve done this kind of thing before": "- 如果您以前做过这样的事",
            "Set up in Desktop": "安装到 GitHub Desktop",
            "Get started by": "通过",
            "creating a new file": "创建一个新文件",
            "uploading an existing file": "上传一个现有的文件",
            ". We recommend every repository include a": "来开始。我们推荐每个仓库都包括",
            ", and": "，和",
            "…or create a new repository on the command line": "…或在命令行上创建一个新的仓库",
            "…or push an existing repository from the command line": "…或从命令行中推送现有的仓库",
            "…or import code from another repository": "…或从另一个仓库导入代码",
            "You can initialize this repository with code from a Subversion, Mercurial, or TFS project.": "您可以初始化此仓库从一个 Subversion，Mercurial 或 TFS 项目导入。",
            "Import code": "导入代码",

        // 导入仓库 第二页 /<user-name>/<repo-name>/import
            "Preparing your new repository": "准备您的新仓库",
                "There is no need to keep this window open, we’ll email you when the import is done.": "无需保持此窗口，导入完成后我们会通过电子邮件通知您。",
            "Detecting your project’s version control system…": "正在检测项目的版本控制系统…",
            "Importing commits and revision history…": "导入提交和修订历史…",
            // [/Updating branches and (\d+) commit authors?…/, "更新分支和 $1 个提交者…"],
            "Optimizing repository and pushing commits to GitHub…": "优化仓库并将提交推送到 GitHub...",
            "Importing complete! Your new repository": "导入完成！您的新仓库",
            "is ready.": "已准备就绪。",

        // 文件管理器 /<user-name>/<repo-name>/tree/<branch>/<文件夹路径>/
            // 切换分支/标签 下拉菜单
                "Switch branches/tags": "切换分支/标签",
                "Find or create a branch…": "查找或创建分支…",
                "Filter branches/tags": "搜索分支/标签",
                "Branches": "分支",
                "default": "默认",
                "View all branches": "查看全部分支",
                "Find a tag": "查找标签",
                "Tags": "标签",
                "Search for a tag": "搜索标签",
                "Nothing to show": "暂无",
                "View all tags": "查看全部标签",

            "Go to file": "转到文件",
                "No matches found": "未找到匹配项",
            "Add file": "添加文件",
                // 添加文件 下拉菜单
                "Create new file": "新建文件",
                "Upload files": "上传文件",
            "Delete directory": "删除文件夹",
            "History": "历史",

            "Give feedback": "反馈",

        // 文件管理器 - 议题模板 /<user-name>/<repo-name>/tree/<branch>/.github/ISSUE_TEMPLATE
            "Customize the issue creation experience with a": "自定义议题的创建模板使用一个",
            "file.": "文件。",


        // new code view
            "Top": "顶部",
            "Jump to file": "跳转到文件",

            // 切换分支/标签 下拉菜单
                "Switch branches/tags": "切换分支/标签",
                "Find or create a branch...": "查找或创建分支...",
                "View all": "查看全部",
                "branches": "分支",
                "Find a tag...": "查找标签...",
                "Nothing to show": "暂无",
                "tags": "标签",

        // 新版 New Code Search /<user-name>/<repo-name>/?search=1
            "Path copied!": "✅ 路径已复制！",

            "Name": "文件名",
            "Last commit message": "最后提交消息",
            "Last commit date": "最后提交时间",

            // 大纲按钮
            "Outline": "大纲", // md 文件
                "Filter headings": "筛选标题", // md 文件
            // 编辑按钮
            "Edit README": "编辑 README", // md 文件

        // 追溯 /<user-name>/<repo-name>/blame/<branch>/<file>
            "Blame": "追溯",
            "Newer": "新的",
            "Older": "旧的",

            // 新三个点
                "Raw file content": "原始文件内容",
                "Jump to line": "跳转到行",
                "Find in file": "在文件中查找",
                "Copy path": "复制路径",
                "Copy permalink": "复制永久链接",
                "View options": "查看选项",
                    "Show code folding buttons": "显示代码折叠按钮",
                    "Wrap lines": "换行",
                    "Center content": "核心内容",
                    "Open symbols on click": "单击打开符号",
                "Delete file": "删除文件",

            "Raw": "源码",
            "Copy raw file":"复制原始文件",
            "Download raw file":"下载原始文件",
            "Edit this file": "编辑本文件",
            "Edit the file in your fork of this project": "在您的复刻中编辑文件",
                "Edit file":"编辑文件",
                "Edit in place":"就地编辑",
                "Open with...":"打开...",

            "View blame prior to this change": "查看此变化之前的追溯",

            // 浮动搜索框
                "Find": "查找",
                "Press": "按",
                "again to open the browser's find menu": "打开浏览器的查找菜单",
                "Search this file": "搜索此文件",

        // *.yml /<user-name>/<repo-name>/blame/<branch>/.github/workflows/*.yml
            "View Runs": "查看运行情况",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Branch ([^ ]+) was renamed to ([^ ]+)./, "分支 $1 已更名为 $2。"],
        [/Your ([^ ]+) branch isn't protected/, "您的 $1 分支不受保护"], // 仓库主页 分支保护
        [/([\d,]+) Commits?/, "$1 次提交"], // 新版仓库概述
        [/Create a codespace on (.+)/, "在 $1 上创建代码空间"], // 仓库主页 创建代码空间
        [/Create codespace on (.+)/, "在 $1 上创建代码空间"],
        [/Codespace \"(.+)\" stopped./, "代码空间 “$1” 已停止。"],
        [/Codespace \"(.+)\" deleted./, "代码空间 “$1” 已删除。"],
        [/Are you sure you want to delete (.+)\?/, "您确定要删除 $1 吗？"],
        [/Sponsor ([^ ]+)?/, "赞助 $1"], // 赞助按钮 对话框 标题
        [/\+ ([\d,]+) releases?/, "+ $1 个发行版"], // 仓库首页右侧栏 发行版
        [/\+ ([\d,]+) packages?/, "+ $1 个软件包"], // 仓库首页右侧栏 软件包
        [/\+ ([\d,]+) contributors?/, "+ $1 位贡献者"], // 仓库首页右侧栏 贡献者
        [/\+ ([\d,]+) environments?/, "+ $1 个环境"], // 仓库首页右侧栏 环境
        [/\+ ([\d,]+) deployments?/, "+ $1 个部署"], // 仓库首页右侧栏 部署
        // 个人仓库 贡献和同步复刻操作后 信息提示条
        [/Successfully fetched and fast-forwarded from upstream ([^ ]+)\./, "成功从上游 $1 中获取并快速转发。"],
        [/Successfully discarded changes and synchronized branch to match upstream ([^ ]+)\./, "成功丢弃更改，并将分支与上游 $1 保持同步。"],
        // 同步复刻
        [/Update branch to keep this branch up-to-date by syncing (\d+) commits? from the upstream repository./, "通过从上游仓库同步 $1 个提交来更新分支，以使该分支保持最新。"],
        [/This branch is not behind the upstream ([^ ]+)/, "该分支不落后与上游 $1"],
        [/Discard (\d+) commits? to make this branch match the upstream repository. (\d+) commits? will be removed from this branch./, "丢弃 $1 个提交，以使本分支与上游仓库一致。$2 个提交将从本分支中删除。"],
        [/Discard (\d+) commits?/, "丢弃 $1 个提交"],
        [/Successfully fetched and merged from upstream ([^ ]+)/, "成功从上游 $1 获取并合并。"],
        // 贡献
        [/This branch is not ahead of the upstream ([^ ]+)\./, "该分支并不领先上游 $1。"],
        [/This branch is (\d+) commits? ahead of ([^ ]+)\./, "该分支领先上游 $2 $1个提交。"],
        // 个人仓库当前分支状态
        [/This branch is up to date with ([^ ]+)\./, "该分支与上游 $1 保持同步。"],
        [/(\d+) commits? ahead/, "领先 $1 个提交"],
        [/(\d+) commits? behind/, "落后 $1 个提交"],
        [/(\d+) commits?/, "$1 个提交"], // 新版仓库概述
        [/Save (.+?) to your computer and use it in GitHub Desktop./, "使用 GitHub Desktop，保存 $1 到您的电脑。"],
        [/Forking ([^ ]+)/, "复刻 $1 中"], // 复刻中...
        [/will appear on ([^ ]+)'s member profile, visible only to organization members./, "将出现在 $1 的成员资料中，仅对组织成员可见。"],
        [/Updating branches and (\d+) commit authors?…/, "更新分支和 $1 个提交者…"], // 仓库导入第二页
    ],
};

I18N.zh["repository/labels"] = { // 仓库 - 标签页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 仓库 --> 标签页面 /<user-name>/<repo-name>/labels
            "Labels": "标签",
            "Milestones": "里程碑",
            "Search all labels": "搜索所有标签",

            "labels": "标签",

            "New label": "新建标签",
                "Label preview": "标签预览",
                "Label name": "标签名",
                "Description": "描述",
                "Description (optional)": "描述（可选）",
                "Color": "颜色",
                    "Get a new color": "获得新颜色",
                    "Choose from default colors:": "从默认颜色中选择：",
                "Create label": "创建标签",
                "Saving...": "保存中...",
                "Save changes": "保存更改",

            "Sort": "排序",
                "Alphabetically": "按字母顺序",
                "Reverse alphabetically": "按字母倒序",
                "Most issues": "最多的议题",
                "Fewest issues": "最少的议题",

            // 标签
                "bug": "BUG",
                    "Something isn't working": "有些东西不工作",
                "dependencies": "依赖性",
                    "Pull requests that update a dependency file": "更新一个依赖文件的拉取请求",
                "documentation": "文档",
                    "Improvements or additions to documentation": "文档的改进或补充",
                "duplicate": "重复",
                    "This issue or pull request already exists": "这个议题或拉取请求已经存在",
                "enhancement": "增强",
                    "New feature or request": "新功能或请求",
                "good first issue": "好的首发议题",
                    "Good for newcomers": "适合新人",
                "help wanted": "需要帮助",
                    "Extra attention is needed": "需要特别关注",
                "invalid": "无效",
                    "This doesn't seem right": "这似乎不对",
                "question": "问题",
                    "Further information is requested": "要求提供更多信息",
                "wontfix": "不会修复",
                    "This will not be worked on": "这将不会被处理",

            // [/open issues? and pull requests?/, "个打开的议题和拉取请求"], // 标签页面
            // [/open issues? or pull requests?/, "个打开的议题或拉取请求"], // 标签页面

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/open issues? and pull requests?/, "个打开的议题和拉取请求"], // 标签页面
        [/open issues? or pull requests?/, "个打开的议题或拉取请求"], // 标签页面
    ],
};

I18N.zh["repository/milestones"] = { // 仓库 - 里程碑页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 里程碑页面 /<user-name>/<repo-name>/milestones
            "Labels": "标签",
            "Milestones": "里程碑",

            "You haven’t created any Milestones.": "您尚未创建任何里程碑。",
            "Use Milestones to create collections of Issues and Pull Requests for a particular release or project.": "使用里程碑为特定版本或项目创建议题和拉取请求的集合。",

            // 组织 仓库 里程碑
            "No Milestones found!": "没有发现里程碑!",
            "If this project had milestones, we’d show you them here. Promise!": "如果该项目有里程碑，我们会在此处向您展示。",

            "Create a Milestone": "创建里程碑",

            "Sort": "排序",
                "Recently updated": "最近更新",
                "Furthest due date": "最迟到期日",
                "Closest due date": "最近到期日",
                "Least complete": "最不完整",
                "Most complete": "最完整",
                "Alphabetically": "按字母顺序",
                "Reverse alphabetically": "按字母倒序",
                "Most issues": "最多的议题",
                "Least issues": "最少的议题",

            "No due date": "没有截止日期",
            // [/Due by (.*)/, "截止日期 $1"], // 里程碑截止日期
            "Last updated": "最后更新",
            "(more)": "（更多）",
            "Show less": "显示更少",
            // 完成进度条
            "complete": "已完成",
            "open": "打开",
            "closed": "关闭",

        // 新建里程碑页面 /<user-name>/<repo-name>/milestones/new
            "New milestone": "新建里程牌",
                "Create a new milestone to help organize your issues and pull requests. Learn more about": "创建一个新的里程碑来帮助组织您的议题和拉取请求。了解更多关于",
                "milestones and issues": "里程碑和议题",
            "Title": "标题",
            "Due date (optional)": "截止日期（可选）",
            "Description": "描述",
            "Create milestone": "创建里程碑",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/([\d,]+) Open/, "$1 打开"],
        [/([\d,]+) Closed/, "$1 已关闭"],
    ],
};

I18N.zh["repository/pull_issue_public"] = { // 仓库 - 议题和拉取请求页面公共部分
    "static": { // 静态翻译
        // pull 与 request 公共词条
            "Filters": "筛选",
                // 筛选下拉菜单
                "Filter Issues": "筛选议题",
                "Open issues and pull requests": "打开的议题和拉取请求",
                "Your issues": "您提出的议题",
                "Your pull requests": "您的拉取请求",
                "Everything assigned to you": "任何分配给您的",
                "Everything mentioning you": "任何提及您的",
                "View advanced search syntax": "查看高级搜索语法",

            "Clear current search query, filters, and sorts": "清除当前的搜索查询、筛选器和排序方式",

            "Labels": "标签",
            "Milestones": "里程碑",
            "New issue": "创建议题",
            "New": "创建", // 小屏

            // 筛选工作条
            // "Author": "作者",
                "Filter by author": "按用户筛选",
                "Filter users": "筛选用户名",

            "Label": "标签",
                "Filter by label": "按标签筛选",
                "Filter labels": "筛选标签",
                "Unlabeled": "无标签",

            // "Projects": "项目",
                "Filter by project": "按项目筛选",
                "Filter projects": "筛选项目",
                "Repository": "仓库",
                "Organization": "组织",
                "No projects found. Sorry about that.": "很抱歉，未找到任何项目。",

            // "Milestones": "里程碑",
                "Filter by milestone": "按里程碑筛选",
                "Filter milestones": "筛选里程碑",
                "Issues with no milestone": "无里程碑的议题",
                "Pull requests with no milestone": "无里程碑的拉取请求", // pulls
                "Nothing to show": "暂无",

            "Assignee": "受理人",
                "Filter by who’s assigned": "按受理人筛选",
                "Assigned to nobody": "无受理人",
                // [/Awaiting requested review from ([^ ]+)/, "正在等待 $1 审查请求"],
                "Requested changes must be addressed to merge this pull request.": "要合并这个拉取请求，必须先解决所要求的更改。",

            "Sort": "排序",
                "Sort by": "排序",
                "Newest": "最新的",
                "Oldest": "最早的",
                "Most commented": "最多评论",
                "Least commented": "最少评论",
                "Recently updated": "最近更新",
                "Least recently updated": "最早更新", //?
                "Most reactions": "多数反应",
                "Best match": "最佳匹配",

            // 选中模式
                "selected": "选中",
                "Mark as": "标记为",
                "Apply labels": "应用标签",
                "Assign": "分配",
                    "Assign someone": "分配给某人",
                    "Assign to nobody": "分配给任何人",

            // 筛选结果
            "No results matched your search.": "没有与您的搜索匹配的结果。",
            "You could search": "您可以搜索",
            "all of GitHub": "所有 GitHub",
            "or try an": "或者尝试",
            "advanced search": "高级搜索",

            // 状态词
            "was merged": "合并于",
            "was closed": "关闭于",
            "Approved": "已批准",
            "Review required": "需要审查", // 拉取请求 页面状态词
                "Review required before merging": "合并前需要审查",
            "outdated": "陈旧的",
            "Pending": "待定",
            "Draft": "草案",

            // [/(\d+) linked pull requests?/, "链接 $1 个拉取请求"],

    }
};

I18N.zh["repository/issues"] = { // 仓库 - 议题页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository/pull_issue_public"]["static"],

        // 仓库 --> 议题 标签卡/<user-name>/<repo-name>/issues
            // 欢迎信息
            "Welcome to issues!": "欢迎关注议题！",
            "Issues are used to track todos, bugs, feature requests, and more. As issues are created, they’ll appear here in a searchable and filterable list. To get started, you should": "议题用于跟踪待办事项、错误、功能请求等。创建议题后，它们将出现在可搜索和可筛选的列表中。要开始，您应该",
            "create an issue": "创建议题",

            "Label issues and pull requests for new contributors": "标记新贡献者的议题和拉取请求",
            "Now, GitHub will help potential first-time contributors": "现在，GitHub 将帮助潜在的首次贡献者",
            "discover issues": "探索议题",
            "labeled with": "标记为",

            // [/Want to contribute to ([^ ]+)/, "想为 $1 做贡献吗？"], /issues
            "If you have a bug or an idea, read the": "如果您发现一个错误或有任何想法，请阅读",
            "before opening an issue.": "，在打开议题之前。",
            "If you have a bug or an idea, browse the open issues before opening a new one. You can also take a look at the": "如果您发现一个错误或有任何想法，请在打开新议题之前浏览未解决的议题。您也可以看看",
            "Open Source Guide": "开源指南",
            "If you're ready to tackle some open issues,": "如果您准备好解决一些未解决的议题，",
            "we've collected some good first issues for you": "我们已为您收集了一些好的首发议题",

            "Dismiss": "忽略",
                // 忽略 下拉
                "Dismiss for this repository only": "仅对该仓库不在提示",
                "Dismiss for all repositories": "对所有仓库均不在提示",


            "There aren’t any open issues.": "暂无开放的议题。",

            // 状态词
            "Open": "打开",
            "Closed": "已关闭",
            "Merged": "已合并",
            // "open": "打开",
            // "Opened": "打开",
            // "opened": "打开",
            // "closed": "已关闭",

            // 置顶议题
            "Pinned issues": "置顶议题",

            "ProTip!": "专业提示！",
                    "Find everything you created by searching": "查找您创建的所有内容，使用",
                    "Exclude your own issues with": "查看您自己的问题，使用",
                    "Mix and match filters to narrow down what you’re looking for.": "混搭筛选器，以缩小范围，找到您想看到的。",
                    "Exclude everything labeled": "如果要找到所有标有",
                    "with": "标签的，请使用",
                    "Notify someone on an issue with a mention, like:": "在某个问题上通知并提及某人，例如：",

        // 新建议题 选择议题模板  /<user-name>/<repo-name>/issues/new/choose
            "Get started": "开始",
            "Don’t see your issue here?": "在这里没有看到您的议题？",
            "Open a blank issue.": "打开一个空白议题。",
            "Edit templates": "编辑模板",

            "View organization templates": "查看组织模板", // 组织仓库

        // 新建空白议题  /<user-name>/<repo-name>/issues/new
            "Title": "标题",
            "Helpful resources":"帮助性资源",

        // 从讨论创建议题  /<user-name>/<repo-name>/issues/new?created_from_discussion_number=<id>
            "Documentation has changed since you last contributed": "自您上次贡献以来，文档已更改",
            ". Take a look before submitting an issue:": "。在提交议题之前先看一下：",
            "Contributing guidelines": "贡献指南",
            "Last updated": "最后更新",

        // 某条具体的议题 /<user-name>/<repo-name>/issues/<id> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "This issue was moved to a discussion.": "这个议题被转移到讨论中。",
            "You can continue the conversation there.": "您可以在那里继续讨论。",
            "Go to discussion →": "转到讨论→",

            "Edit": "编辑",


            // 状态词 同 /<user-name>/<repo-name>/pull/<id>
            "changed the title": "修改了标题",
            "opened this issue": "打开了该议题",
            "· Fixed by": "· 修复了",
            "mentioned this issue": "提及了该议题",
            "opened this": "打开了这个",
            // "Issue": "议题",
            "added a commit that closed this issue": "在提交时关闭了这个议题",
            "closed this in": "关闭于",
            "added the": "添加了",
            "added": "添加了",
            "and removed": "并移除了",
            "removed the": "移除了",
            "removed": "移除了",
            "label": "标签",
            "labels": "标签",
            "self-assigned this": "自己受理了该议题",
            // "edited": "编辑的",
            "added this to the": "添加到",
            "added this to": "添加到",
            "milestone": "里程碑",
            "closed this": "关闭了",
            "closed this as": "已关闭因",
                "not planned": "非计划中",
            "reopened this": "重新打开了",
            "This was referenced": "这是引用",
            "deleted a comment from": "删除了评论，来自",
            "· May be fixed by": " · 可通过该方案修复",
            "pinned this issue": "置顶议题",
            "unpinned this issue": "取消置顶",
            "Repository owner locked as": "仓库所有者锁定为",
            "locked as": "锁定为",
                "off-topic": "离题",
                "too heated": "过热",
                "resolved": "已解决",
                "spam": "垃圾信息",
            "and limited conversation to collaborators": "并限制与协作者对话",
            "unlocked this conversation": "解锁了对话",
            "merged commit": "已合并提交",
            // "into": "到",
            "deleted the": "删除了",
            "locked and limited conversation to collaborators": "锁定并限制与协作者对话",
            "removed their assignment": "取消了他们的任务",
            "assigned": "分配给了",
            "and unassigned": "和取消了分配给",
            "marked this pull request as draft": "将此拉取请求标记为草案",
            "marked this pull request as ready for review": "将此拉取请求标记为可供审查",
            "dismissed a stale review via": "忽略了一个陈旧的审查，通过",
            "requested changes": "请求了更改",
            "added a commit that referenced this issue": "添加了一个引用此问题的提交",
            "referenced this issue": "提及这个议题",
            "closed this as completed": "已完成，关闭",

            "This comment has been minimized.": "此评论已最小化。",
            "Show comment": "显示评论",
            "Hide comment": "隐藏评论",

            // 同 /<user-name>/<repo-name>/pull/<id>
            // 右侧栏
                "Reviewers": "审阅者",
                    "Loading suggestions…": "载入推荐…",
                    // [/([^ ]+) left review comments/, "$1 发表了审查评论"],
                    "At least 1 approving review is required to merge this pull request.": "至少需要 1 次批准审查才能合并此拉取请求。",
                    "Still in progress?": "仍在进行中吗？",
                    "Convert to draft": "设置为草案",
                        // 设置草案对话框
                            "Convert this pull request to draft?": "将此拉取请求转换为草案？",
                            "People who are already subscribed will not be unsubscribed.": "已订阅的用户将不会被取消订阅。",
                    // 下拉
                    "Request up to 15 reviewers": "最多请求 15 个审阅者",
                    // [/([^ ]+) approved these changes/, "$1 批准这些更改"], // 具体的拉取请求 审阅者
                    "Request": "请求",
                    // [/Request review from ([^ ]+)/, "请求 $1 审查"], // 具体的拉取请求 审阅者
                    "This pull request is waiting on your review.": "此拉取请求正在等待您的审核。",

                "Assignees": "受理人",
                    "No one assigned": "无人受理",
                    "No one—": "无人 - ",
                    "assign yourself": " 受理自己",
                    // 下拉框
                    "Assign up to 10 people to this issue": "最多指定 10 人", // 议题
                    "Assign up to 10 people to this pull request": "最多指定 10 人", // 拉取请求
                    "Clear assignees": "清除受理人",
                    "Type or choose a user": "输入或选择用户",
                    "Suggestions": "建议",

                // "Labels": "标签",
                    "None yet": "暂无",
                    // 下拉
                    "Apply labels to this issue": "应用标签", // 议题
                    "Apply labels to this pull request": "应用标签", // 拉取请求
                    "Edit labels": "编辑标签",

                // 项目
                    "Recent": "最近",
                    "User": "用户",
                    "No projects": "无项目",

                "Milestone": "里程碑",
                    "No milestone": "无里程碑",
                    //下拉
                    "Set milestone": "设置里程碑",

                "Development": "进展",
                    "Successfully merging this pull request may close these issues.": "成功合并此拉取请求可能会关闭这些议题。",
                    "Successfully merging a pull request may close this issue.": "成功合并一个拉取请求可能会关闭此议题。",
                    // 下拉
                    "Link an issue from this repository": "关联来自此仓库的议题",
                    "Filter": "筛选",
                    "No results": "无结果",

                // "Notifications": "通知类型",
                "Customize": "自定义",
                "Subscribe": "订阅",
                // "Unsubscribe": "取消订阅",
                "You’re not receiving notifications from this thread.": "您没有收到来自该话题的通知。",
                "You’re receiving notifications because you’re watching this repository.": "您收到通知是因为您正在关注此仓库。",
                "You’re receiving notifications because you authored the thread.": "您收到通知是因为您提出了该话题。",
                "You’re receiving notifications because you’re subscribed to this thread.": "您收到通知是因为您订阅了该话题。",
                "You’re receiving notifications because you were mentioned.": "您收到通知是因为有人 @您。",
                "You’re receiving notifications because you commented.": "您收到通知是因为您发表了评论。",
                "You’re receiving notifications because you are watching pull requests on this repository.": "您收到通知是因为您正在关注此仓库上的拉取请求。",
                "You’re receiving notifications because you are watching issues on this repository.": "您收到通知是因为您正在关注此仓库上的议题。",
                "You’re receiving notifications because you modified the open/close state.": "您收到通知是因为您修改了打开/关闭状态。",
                "You’re ignoring this repository.": "您忽略了这个仓库。",

                    // 通知设置对话框
                    "Notification settings": "通知设置",
                    "Not subscribed": "未订阅",
                        "Only receive notifications from this pull request when you have participated or have been @mentioned.": "只有在您参与或被 @您时才会收到来自此拉取请求的通知。",
                        "Only receive notifications from this issue when you have participated or have been @mentioned.": "只有在您参与或被 @您时才会收到来自此议题的通知。", // 议题页面
                    "Subscribed": "订阅",
                        "Receive all notifications from this pull request.": "接收来自此拉取请求的所有通知。",
                        "Receive all notifications from this issue.": "接收来自此议题的所有通知。",  // 议题页面
                    "You will only be notified for the events selected from the list below.": "您只会收到从以下列表中选择的事件的通知。",
                    "If you participate or are @mentioned you will be subscribed.": "如果您参与或 @您时，将自动订阅。",
                    // 议题
                        "Receive a notification when this issue has been closed.": "当议题被关闭时，收到通知。",
                        "Reopened": "重新打开",
                            "Receive a notification when this issue has been reopened.": "当议题被重新打开时，收到通知。",
                    // 拉取请求
                        "Receive a notification when this pull request has been merged.": "当拉取请求被合并时，收到通知。",
                        "Receive a notification when this pull request has been closed.": "当拉取请求被关闭时，收到通知。",
                        "Receive a notification when this pull request has been reopened.": "当拉取请求被重新打开时，收到通知。",

                // /([\d,]+) participants?/, "$1 位参与者"
                "and others": "和其它",

            // 右侧栏 补充
                // "Development": "进展",
                    "No branches or pull requests": "没有分支或拉取请求",
                    "Shows branches and pull requests linked to this issue.": "显示与该议题相关的分支和拉取请求。",
                    "Create a branch": "创建分支",
                    "for this issue or link a pull request.": "为这个议题或关联一个拉取请求",
                    "When branches are created from issues, their pull requests are automatically linked.": "当从议题中创建分支时，它们的拉取请求会自动关联。",

                    // 下拉
                    "Link a pull request from this repository": "关联来自此仓库的拉取请求",

                    // "linked a pull request that will": "关联一个拉取请求, 将会",
                    // "close": "关闭",
                    // "this issue": "这个议题",

                    // 创建分支 对话框
                        "Create a branch for this issue": "为该议题创建一个分支",
                        "Branch name": "分支名称",
                        "Repository destination": "仓库目的地",
                            "Search for a repository": "搜索仓库",
                        "Change branch source": "更改分支源",
                        "What's next?": "下一步是什么？",
                            "Checkout locally": "检出本地",
                            "Open branch with GitHub Desktop": "使用 GitHub Desktop 打开分支",
                        "Create branch": "创建分支",

                    // 在本地仓库检出对话框
                        "Checkout in your local repository": "在本地仓库检出",
                        "Run the following commands in your local clone.": "在您的本地克隆中运行以下指令。",

                    //
                        "Link a branch or pull request": "关联分支或拉取请求",
                        "Select a repository to search for branches and pull requests or": "选择一个仓库来搜索分支和拉取请求或",
                        "create a branch": "创建一分支",
                        "Search for repositories": "搜索仓库",
                        "Link a branch, pull request, or": "关联分支、拉取请求或",
                        "Search for branches or pull requests": "搜索分支或拉取请求",

                "Lock conversation": "锁定对话",
                    "Lock conversation on this issue": "锁定此议题的对话",
                    "Other users": "其他用户",
                    "can’t add new comments": "无法添加新评论",
                    "to this issue.": "到该议题。",
                    "You and other collaborators": "您和其他协作者",
                    "with access": "有权限访问",
                    "to this repository": "该仓库",
                    "can still leave comments": "仍然可以发表评论",
                    "that others can see.": "其他人可以看到。",
                    "You can always unlock this issue again in the future.": "您今后仍可以随时再次解锁此议题。",
                    "Reason for locking": "锁定原因",
                    "Choose a reason": "选择原因",
                        "Off-topic": "离题",
                        "Too heated": "过热",
                        "Resolved": "已解决",
                        "Spam": "垃圾信息",
                    "Optionally, choose a reason for locking that others can see. Learn more about when it’s appropriate to": "或者，选择其他人可以看到的锁定原因。详细了解何时适合",
                    "lock conversations": "锁定对话",
                    // "Lock conversation on this issue": "锁定对话",
                "Unlock conversation": "解锁对话",
                    "Unlock conversation on this issue": "解锁此议题的对话",
                    "Everyone": "任何人",
                    "will be able to comment on this issue once more.": "将能够再次对这个议题发表评论。",
                    "You can always lock this issue again in the future.": "您今后仍可以随时再次锁定此议题。",
                "Pin issue": "置顶议题",
                    "Up to 3 issues can be pinned and they will appear publicly at the top of the issues page": "最多可以置顶 3 个议题，它们将公开显示在议题页面的顶部",
                    // 顶部提醒
                    "The issue has been pinned.": "该议题已置顶。",
                "Unpin issue": "取消置顶",
                    "Up to 3 issues can be pinned and they will appear at the top of the issues page": "最多可以置顶 3 个议题，它们将显示在议题页面的顶部",
                    // 顶部提醒
                    "The issue has been unpinned.": "该议题已取消置顶。",
                "Transfer issue": "转移议题",
                    // 转移议题 对话框
                        "Transfer this issue": "转移议题",
                            "Repository projects assigned to this issue will not transfer to the new location": "分配给此议题的仓库项目不会转移到新位置",
                        "Choose a repository": "选择仓库",
                        "Find a repository": "搜索仓库",
                        "Warning!": "警告！",
                            "Transferring an issue does not scrub any issue content. Content such as text references to other issues, pull requests, projects, teams will remain in this issue's descriptions and comments.": "转移议题不会清除任何议题内容。诸如对其他议题、拉取请求、项目、团队的文本引用等内容将保留在此议题的描述和评论中。",
                            "Assignees, labels and milestones will be transferred if they are present in the target repository.": "如果目标仓库中存在受让人、标签和里程碑，它们将被转移。",
                "Convert to discussion": "转为讨论",
                    // 转换议题为讨论 对话框
                    "Convert issue to a discussion": "转换议题为讨论",
                        "Are you sure you want to convert this issue to a discussion?": "您确定要将议题转换为讨论吗？",
                        "What happens when an issue is converted into a discussion:": "将议题转化为讨论时，会发生什么：",
                        "Issue will be closed and locked": "议题将被关闭并锁定",
                        "Title, description, and author will be the same as the issue": "标题、描述和作者将与议题相同",
                        "All comments and reactions will be the same as the issue": "所有评论和反应将与议题相同",
                        "Category for new discussion": "新讨论的类别",
                            "Announcements": "公告",
                            "General": "通常",
                            "Ideas": "想法",
                            "Polls": "投票",
                            "Q&A": "问与答",
                            "Show and tell": "展示与讲述",
                        "I understand, convert this issue.": "我明白了，依然转化该议题。",
                "Delete issue": "删除议题",
                    "Are you sure you want to delete this issue?": "您确定要删除此议题吗？",
                    "This cannot be undone": "这不能被撤消",
                    "Only administrators can delete issues": "只有管理员可以删除议题",
                    "Deletion will remove the issue from search and previous references will point to a placeholder": "删除将会从搜索中删除议题，以前的引用将指向一个占位符",
                    "Delete this issue": "删除议题",
                    "Deleting issue…": "议题删除中…",
                    // 顶部提醒
                    "The issue was successfully deleted.": "该议题已成功删除。",


            "Load more…": "载入更多…",
            "Loading…": "载入中…",

            "This conversation has been locked as": "此对话已锁定为",
            "and limited to collaborators.": "，并限制与协作者对话。",

            "Remember, contributions to this repository should follow our": "请记住，对该仓库的贡献应遵循我们的",
            "GitHub Community Guidelines": "GitHub 社区准则",
            "Remember, contributions to this repository should follow its": "请记住，对该仓库的贡献应遵循",
            "contributing guidelines": "贡献指南",
            "and": "和",
            "code of conduct": "行为准则",

            "This issue has been deleted.": "该议题已被删除。",
            "deleted this from": "删除了这个，从",

            // 底部赞助
            "Show your support for": "通过赞助来表达您对",
            "by sponsoring them.": "的支持。",

        // 议题标签管理 /<user-name>/<repo-name>/issues/labels
            ...I18N.zh["repository/labels"]["static"],

        // 添加/编辑议题模板 /<user-name>/<repo-name>/issues/templates/edit
            "Propose changes": "提出更改",
            "Add template:": "添加模板：",
            "select": "选择",
            "Bug report": "错误报告",
                "Standard bug report template": "标准错误报告模板",
                "Create a report to help us improve": "创建报告以帮助我们改进",
            "Feature request": "功能要求",
                "Standard feature request template": "标准功能请求模板",
                "Suggest an idea for this project": "为这个项目提出想法",
            "Custom template": "自定义模板",
                "Blank template for other issue types": "其他议题类型的空白模板",
                "Custom issue template": "自定义议题模板",
                "Describe this issue template's purpose here.": "在此处描述此议题模板的用途。",

            "Preview and edit": "预览和编辑",
            "Close preview": "关闭预览",

            "Template name": "模板名称",
            "This file lives in": "该文件位于",
            "Template content": "模板内容",
            "Optional additional items": "可选附加项目",
            "Issue default title": "议题默认标题",
            "This will be suggested as the issue title": "建议作为议题标题",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Want to contribute to ([^ ]+)/, "想为 $1 做贡献吗？"],
        [/Awaiting requested review from ([^ ]+)/, "正在等待 $1 审查请求"],
        [/([\d,]+) Open/, "$1 打开"],
        [/([\d,]+) Closed/, "$1 已关闭"],
        [/#(\d+) opened/, "#$1 打开于"],
        [/#(\d+) by/, "#$1 打开者"],
        [/(\d+) linked pull requests?/, "链接 $1 个拉取请求"],
        [/([\d,]+) linked issues?/, "$1 个关联议题"],
        [/(\d+) tasks? done/, "$1 个任务完成"],
        [/(\d+) of (\d+) tasks?/, "$1 / $2 个任务"],
        [/(\d+) tasks?/, "$1 个任务"],
        [/First time contributing to ([^ ]+)?/, "首次为 $1 做贡献？"],
        // 具体某条议题 /<user-name>/<repo-name>/issues/<id>
        [/· ([\d,]+) comments?/, "• $1 条评论"],
        [/([\d,]+) participants?/, "$1 位参与者"],
        [/(\d+) similar comments?/, "$1 条类似评论"],
        [/(\d+) hidden items?/, "$1 条隐藏项目"],
        [/added a commit to ([^ ]+) that referenced this issue/, "为 $1 添加了引用这个议题的提交"],
        [/Only people who can see ([^ ]+) will see this reference./, "只有能看到 $1 的人才能看到这个参考。"],
        [/Sponsor ([^ ]+)?/, "赞助 $1"], // 赞助按钮 对话框 标题
    ],
};

I18N.zh["repository/pull"] = { // 仓库 - 拉取请求页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository/pull_issue_public"]["static"],

        // 仓库 --> 拉取请求 标签卡 /<user-name>/<repo-name>/pulls
            // 欢迎信息
            "Welcome to pull requests!": "欢迎使用拉取请求！",
            "Pull requests help you collaborate on code with other people. As pull requests are created, they’ll appear here in a searchable and filterable list. To get started, you should": "拉取请求可帮助您与其他人协作处理代码。创建拉取请求后，它们将出现在可搜索和可筛选的列表中。要开始，您应该",
            "create a pull request": "创建拉取请求",

            // [/First time contributing to ([^ ]+)?/, "首次为 $1 做贡献？"], // /pulls
            "If you know how to fix an": "如果您知道如何修复一个",
            "issue": "议题",
            ", consider opening a pull request for it.": "，可考虑为它打开一个拉取请求。",
            "You can read this repository’s": "您可以阅读该仓库的",
            "to learn how to open a good pull request.": "，去学习如何打开一个好的拉取请求。",
            "If you would like to submit code to this repository, consider opening a pull request.": "如果您想向这个仓库提交代码，请考虑打开一个拉取请求。",
            "If you would like to submit code to this repository, consider opening a pull request. You can read this repository’s": "如果您想向这个仓库提交代码，请考虑打开一个拉取请求。您可以阅读该仓库的",

            "Label issues and pull requests for new contributors": "标记新贡献者的议题和拉取请求",
            "Now, GitHub will help potential first-time contributors": "现在，GitHub 将帮助潜在的首次贡献者",
            "discover issues": "探索议题",
            "labeled with": "标记为",

            "Dismiss": "忽略",
                // 忽略 下拉
                "Dismiss for this repository only": "仅对该仓库不在提示",
                "Dismiss for all repositories": "对所有仓库均不在提示",

            "New pull request": "发起拉取请求",

            "Reviews": "审查",
                // 筛选工作条
                "Filter by reviews": "按审查筛选",
                "No reviews": "未经审查",
                // "Review required": "需要审查",
                "Approved review": "已批准的审查",
                "Changes requested": "已请求更改",
                "Reviewed by you": "由您审查",
                "Not reviewed by you": "您未审查",
                "Awaiting review from you": "等待您审查",
                "Awaiting review from you or your team": "等待您或您的团队的审查",
                "Awaiting review from you specifically": "特别等待您审查",

                // 筛选结果
                "There aren’t any open pull requests.": "暂无拉取请求。",

                "ProTip!": "专业提示！",
                    "Find everything you created by searching": "查找您创建的所有内容，使用",
                    "Exclude your own issues with": "查看您自己的问题，使用",
                    "Mix and match filters to narrow down what you’re looking for.": "混搭筛选器，以缩小范围，找到您想看到的。",
                    "Exclude everything labeled": "如果要找到所有标有",
                    "with": "标签的，请使用",
                    "Notify someone on an issue with a mention, like:": "在某个问题上通知并提及某人，例如：",

        // 某条具体的拉取请求 /<user-name>/<repo-name>/pull/<id> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // 顶部提醒
                "Your review was submitted on a merged pull request.": "您的审查已提交，一个合并的拉取请求。",

            // 编辑 -> 选择基础库
            "Choose a base branch": "选择基础分支",
                // 更改基础分支对话框
                "Are you sure you want to change the base?": "您确定要更改基础分支吗？",
                "Some commits from the old base branch may be removed from the timeline, and old review comments may become outdated.": "旧的基础分支的一些提交可能会从时间线上删除，而旧的审查评论可能会变得过时。",
                "Change base": "更改基础分支",

            // 代码 下拉菜单
                "Local": "本地",
                    "Checkout with GitHub CLI": "使用 GitHub CLI 检出",
                    "Work fast with our official CLI.": "使用我们的官方 CLI 快速工作。",
                    "Checkout with GitHub Desktop": "使用 GitHub Desktop 检出",

                // 代码空间
                    "Your workspaces in the cloud": "您在云端的工作空间",
                    //[/Create a codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
                    "Codespace repository configuration": "代码空间仓库配置",
                        "New with options...": "新建（选项）...",
                        "Configure dev container": "配置开发容器",
                        "Set up prebuilds": "设置预构建",
                        "Manage codespaces": "管理代码空间",
                        "Share a deep link": "分享深度链接",
                        "What are codespaces?": "什么是代码空间？",
                    "No codespaces": "尚无代码空间",
                    "You don't have any codespaces with this repository checked out": "您没有检出此仓库的任何代码空间",
                    //[/Create codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
                    "Learn more about codespaces...": "了解更多关于代码空间的信息...",

                    "On current branch": "在当前分支",
                        "No codespaces on current branch": "当前分支上没有代码空间",
                    "On other branches": "在其他分支",
                    "miniature adventure": "迷你探险",
                    "Open miniature adventure in web": "在网络中打开迷你探险",
                    "Active": "激活",
                        "Open in ...": "打开 ...",
                            "Open in browser": "在浏览器中打开",
                            "Open in Visual Studio Code": "在 Visual Studio Code 中打开",
                            "Open in JetBrains Gateway": "在 JetBrains Gateway 中打开",
                            "Open in JupyterLab": "在 JupyterLab 中打开",
                        "Rename": "重命名",
                            "Change codespace display name to...": "将代码空间显示名称更改为...",
                        "Export changes to a branch": "将更改导出到分支",
                            "This will create a new branch with any unpushed changes": "这将创建一个包含任何未推送更改的新分支",
                            "Create branch": "创建分支",
                        "Change machine type": "更改机器类型",
                            "Change codespace machine type": "更改代码空间机器类型",
                            "Machine type": "机器类型",
                                "2-core": "双核",
                                "4-core": "四核",
                            "Need even more power?": "需要更多的力量？",
                            "Contact our team": "联系我们团队",
                            "to enable 32-core or GPU machines.": "启用 32 核或 GPU 机器。",
                            "Update codespace": "升级代码空间",
                        "Stop codespace": "停止代码空间",
                    "Codespace configuration": "代码空间设置",
                    "No changes": "未更改",

                    "Codespace usage for this repository is paid for by": "该仓库的代码空间使用费由以下人员支付",

                    // [/Codespace \"(.+)\" stopped./, "代码空间 “$1” 已停止。"],
                    // [/Codespace \"(.+)\" deleted./, "代码空间 “$1” 已删除。"],
                    // [/Are you sure you want to delete (.+)\?/, "您确定要删除 $1 吗？"],

            // 自动修复漏洞 提示
            "This automated pull request fixes a": "这个自动拉取请求将修复了一个",
            "security vulnerability": "安全漏洞",
            "Only users with access to Dependabot alerts can see this message.": "只有有权访问 Dependabot 警报的用户才能看到此消息。",
            "Learn more about Dependabot security updates": "了解更多关于 Dependabot 安全更新的信息",
            "opt out": "选择退出",
            // 顶部提醒
                "Opted out of Dependabot security updates.": "选择退出 Dependabot 安全更新。",
            "or": "或",

            // Dependabot 警报 拉取请求 提示
                "Merging this pull request will resolve a": "合并此拉取请求将解决",
                "high": "高",
                "severity": "严重性",
                "Dependabot alert": "Dependabot 警报",

                // 合并后顶部提醒
                    // [/This pull request resolved a Dependabot alert on ([^ ]+)./, "该请求解决了 $1 的 Dependabot 警报问题。"],

            // 状态词
            // [/merged (\d+) commits? into/, "将 4 个提交合并到"],
            "into": "到",
            // "merged": "已合并",
            "wants to merge": "希望合并",
            "commit into": "个提交到",
            "commits into": "个提交到",
            "from": "来自",

            // 标签栏
            "Conversation": "讨论",
            // "Commits": "提交",
            "Checks": "检查",
            "Files changed": "更改的文件",

            // 右侧栏
                "Reviewers": "审阅者",
                    "Loading suggestions…": "载入推荐…",
                    // [/([^ ]+) left review comments/, "$1 发表了审查评论"],
                    "At least 1 approving review is required to merge this pull request.": "至少需要 1 次批准审查才能合并此拉取请求。",
                    "No reviews—at least 1 approving review is required.": "未经审查—至少需要 1 次批准审查。",
                    "Re-request review": "重新请求审核",
                    "Still in progress?": "仍在进行中吗？",
                    // [/Awaiting requested review from ([^ ]+)/, "等待 $1 的审查请求"]
                    "Learn about draft PRs": "了解拉取请求草案",
                    "Convert to draft": "设置为草案",
                    // 下拉
                    "Request up to 15 reviewers": "最多请求 15 个审阅者",
                    // [/([^ ]+) approved these changes/, "$1 批准这些更改"], // 具体的拉取请求 审阅者
                    "Request": "请求",
                    // [/Request review from ([^ ]+)/, "请求 $1 审查"], // 具体的拉取请求 审阅者
                    "This pull request is waiting on your review.": "此拉取请求正在等待您的审核。",

                "Assignees": "受理人",
                    "No one assigned": "无人受理",
                    "No one—": "无人 - ",
                    "assign yourself": " 受理自己",
                    // 下拉框
                    "Assign up to 10 people to this issue": "最多指定 10 人", // 议题
                    "Assign up to 10 people to this pull request": "最多指定 10 人", // 拉取请求
                    "Clear assignees": "清除受理人",
                    "Type or choose a user": "输入或选择用户",
                    "Suggestions": "建议",

                // "Labels": "标签",
                    "None yet": "暂无",
                    // 下拉
                    "bug": "BUG",
                        "Something isn't working": "有些东西不工作",
                    "dependencies": "依赖性",
                        "Pull requests that update a dependency file": "更新一个依赖文件的拉取请求",
                    "documentation": "文档",
                        "Improvements or additions to documentation": "文档的改进或补充",
                    "duplicate": "重复",
                        "This issue or pull request already exists": "这个议题或拉取请求已经存在",
                    "enhancement": "增强",
                        "New feature or request": "新功能或请求",
                    "good first issue": "好的首发议题",
                        "Good for newcomers": "适合新人",
                    "help wanted": "需要帮助",
                        "Extra attention is needed": "需要特别关注",
                    "invalid": "无效",
                        "This doesn't seem right": "这似乎不对",
                    "question": "问题",
                        "Further information is requested": "要求提供更多信息",
                    "wontfix": "不会修复",
                        "This will not be worked on": "这将不会被处理",

                    "Apply labels to this issue": "应用标签", // 议题
                    "Apply labels to this pull request": "应用标签", // 拉取请求
                    "Edit labels": "编辑标签",

                    "dependencies": "依赖关系",
                        "Pull requests that update a dependency file": "更新依赖文件的拉取请求",

                // 项目
                    "Recent": "最近",
                    "User": "用户",
                    "No projects": "无项目",

                "Milestone": "里程碑",
                    "No milestone": "无里程碑",
                    //下拉
                    "Set milestone": "设置里程碑",
                        "Nothing to show": "暂无",

                "Development": "进展",
                    "Successfully merging this pull request may close these issues.": "成功合并此拉取请求可能会关闭这些议题。",
                    "Successfully merging a pull request may close this issue.": "成功合并一个拉取请求可能会关闭此议题。",
                    // 下拉
                    "Link an issue from this repository": "关联来自此仓库的议题",
                    "Filter": "筛选",
                    "No results": "无结果",

                // "Notifications": "通知类型",
                "Customize": "自定义",
                "Subscribe": "订阅",
                // "Unsubscribe": "取消订阅",
                "You’re not receiving notifications from this thread.": "您没有收到来自该话题的通知。",
                "You’re receiving notifications because you’re watching this repository.": "您收到通知是因为您正在关注此仓库。",
                "You’re receiving notifications because you authored the thread.": "您收到通知是因为您提出了该话题。",
                "You’re receiving notifications because you’re subscribed to this thread.": "您收到通知是因为您订阅了该话题。",
                "You’re receiving notifications because you were mentioned.": "您收到通知是因为有人 @您。",
                "You’re receiving notifications because you commented.": "您收到通知是因为您发表了评论。",
                "You’re receiving notifications because you are watching pull requests on this repository.": "您收到通知是因为您正在关注此仓库上的拉取请求。",
                "You’re receiving notifications because you are watching issues on this repository.": "您收到通知是因为您正在关注此仓库上的议题。",
                "You’re receiving notifications because you modified the open/close state.": "您收到通知是因为您修改了打开/关闭状态。",
                "You’re ignoring this repository.": "您忽略了这个仓库。",

                    // 通知设置对话框
                    "Notification settings": "通知设置",
                    "Not subscribed": "未订阅",
                        "Only receive notifications from this pull request when you have participated or have been @mentioned.": "只有在您参与或被 @您时才会收到来自此拉取请求的通知。",
                        "Only receive notifications from this issue when you have participated or have been @mentioned.": "只有在您参与或被 @您时才会收到来自此议题的通知。", // 议题页面
                    "Subscribed": "订阅",
                        "Receive all notifications from this pull request.": "接收来自此拉取请求的所有通知。",
                        "Receive all notifications from this issue.": "接收来自此议题的所有通知。",  // 议题页面
                    "You will only be notified for the events selected from the list below.": "您只会收到从以下列表中选择的事件的通知。",
                    "If you participate or are @mentioned you will be subscribed.": "如果您参与或 @您时，将自动订阅。",
                    // 议题
                        "Receive a notification when this issue has been closed.": "当议题被关闭时，收到通知。",
                        "Reopened": "重新打开",
                            "Receive a notification when this issue has been reopened.": "当议题被重新打开时，收到通知。",
                    // 拉取请求
                        "Receive a notification when this pull request has been merged.": "当拉取请求被合并时，收到通知。",
                        "Receive a notification when this pull request has been closed.": "当拉取请求被关闭时，收到通知。",
                        "Receive a notification when this pull request has been reopened.": "当拉取请求被重新打开时，收到通知。",

                "Allow edits by maintainers": "允许维护者进行编辑",
                    "If checked,": "如果选中，",
                    // [/users with write access to ([^ ]+) can add new commits/, "对 $1 具有写权限的用户可以添加新的提交"], // 具体拉取请求
                    "to your": "到您的",
                    "branch. You can always change this setting later.": "分支。您以后可以随时更改此设置。",
                "Allow edits and access to secrets by maintainers": "允许维护者编辑和访问密钥",
                    "Maintainers could potentially edit this repository's workflows to reveal values of secrets and gain access to other branches.": "维护者有可能编辑这个仓库的工作流程来获取密钥值，并获得对其他分支的访问。",

                // /([\d,]+) participants?/, "$1 位参与者"
                "and others": "和其它",

                "Maintainers are allowed to edit this pull request.": "允许维护者编辑此拉取请求。",

                "Lock conversation": "锁定对话",
                    "Lock conversation on this pull request": "锁定此拉取请求的对话",
                    "Other users": "其他用户",
                    "can’t add new comments": "无法添加新评论",
                    "to this pull request.": "到该拉取请求。",
                    "You and other collaborators": "您和其他协作者",
                    "with access": "有权限访问",
                    "to this repository": "该仓库",
                    "can still leave comments": "仍然可以发表评论",
                    "that others can see.": "其他人可以看到。",
                    "You can always unlock this pull request again in the future.": "您今后仍可以随时再次解锁此拉取请求。",
                    "Reason for locking": "锁定原因",
                    "Choose a reason": "选择原因",
                        "Off-topic": "离题",
                        "Too heated": "过热",
                        "Resolved": "已解决",
                        "Spam": "垃圾信息",
                    "Optionally, choose a reason for locking that others can see. Learn more about when it’s appropriate to": "或者，选择其他人可以看到的锁定原因。详细了解何时适合",
                    "lock conversations": "锁定对话",
                    // "Lock conversation on this issue": "锁定对话",
                "Unlock conversation": "解锁对话",
                    "Unlock conversation on this pull request": "解锁此拉取请求的对话",
                    "Everyone": "任何人",
                    "will be able to comment on this pull request once more.": "将能够再次对这个拉取请求发表评论。",
                    "You can always lock this pull request again in the future.": "您今后仍可以随时再次锁定此拉取请求。",

            // 底部赞助
            "Show your support for": "通过赞助来表达您对",
            "by sponsoring them.": "的支持。",

            "Remember, contributions to this repository should follow our": "请记住，对该仓库的贡献应遵循我们的",
            "GitHub Community Guidelines": "GitHub 社区准则",
            "Remember, contributions to this repository should follow its": "请记住，对该仓库的贡献应遵循",
            "contributing guidelines": "贡献指南",
            "security policy": "安全政策",
            "code of conduct": "行为准则",

            // 讨论标签卡 主页
            "marked this pull request as draft": "将此拉取请求标记为草稿",
            "First-time contributor": "首次贡献者",
            // [/This user is a first-time contributor to the ([^ ]+) repository./, "该用户是第一次为 $1 仓库做贡献。"]
            "View changes": "查看更改",
            "View Changes": "查看更改",
            "Outdated": "陈旧的",
            "Resolve conversation": "解决对话",
                "Resolving conversation…": "解决对话中…",
            "Unresolve conversation": "未解决对话",
                "marked this conversation as resolved.": "将此对话标记为已解决。",
            // "Changes requested": "更改请求",
            "Change requested": "更改请求",
            "Show resolved": "显示已解决",
            "Hide resolved": "隐藏已解决",
            "Show all reviewers": "显示所有审阅者",
            "Hide all reviewers": "隐藏所有审阅者",
            "New changes since you last viewed": "自您上次查看以来的新变化",
            "mentioned this pull request": "提及这个拉取请求",
            "dismissed": "忽略",
            "\’s": "的",
            "stale review": "陈旧审查",
            "via": "通过",
            "force-pushed": "强制推送",
            "the": " ",
            "branch from": "分支从",
            "and others": "和其他成员",
            "approved these changes": "批准这些更改",
                "See review": "查看审查",
            "started a review": "开始审查",
                "View reviewed changes": "查看已审核的更改",
            "self-requested a review": "自我要求审查",
            "self-assigned this": "已自我审查",
            "merged commit": "合并提交",
            "left a comment": "发表评论",
            "Add more commits by pushing to the": "添加更多提交，通过推送到",
            "branch on": "分支在",
            "This pull request was": "此拉取请求已",
            "Compare": "比较",
            "deleted the": "删除",
            "branch": "分支",
            "added": "添加",

            //
            "This branch has not been deployed": "该分支尚未部署",
            "No deployments": "未部署",

            // 拉取请求状态
            "Review requested": "请求审查",
            "Review has been requested on this pull request. It is not required to merge.": "此拉取请求已请求进行审查。这不是合并的必要条件。",
            // [/(\d+) pending reviewers?/, "$1 名待审者"],
            "was requested for review": "被请求审查",

            "This pull request is still a work in progress": "此拉取请求仍在进行中",
                "Ready for review": "准备审核",
                "Draft pull requests cannot be merged.": "拉取请求草稿不能合并。",
            "This pull request can be automatically merged by project collaborators": "此拉取请求可以由项目协作者自动合并",
                "Only those with": "只有对此仓库具有",
                "write access": "写入访问权限",
                "to this repository can merge pull requests.": "的才可合并拉取请求。",
                "to this repository can mark a draft pull request as ready for review.": "的才可将拉取请求草案标记为可供审查。",

            // "Review required": "需要审查", // 拉取请求 页面状态词
                "Add your review": "添加您的评论",
            // [/At least (\d+) approving reviews? is required by reviewers with write access./, "具有写入权限的审查者至少需要 $1 次批准审查。"],
            "Learn more about pull request reviews.": "了解更多关于拉取请求审核的信息。",
            "Changes approved": "变更已获批准",
            // [/(\d+) approving reviews? by reviewers? with write access./, "$1 个批准的审查由具有写入权限的审阅者进行审查。"],
            // [/(\d+) approvals?/, "$1 项批准"],
            "Some checks haven’t completed yet": "有些检查还没有完成",
            // [/1 in progress check/, "$1个正在进行的检查"],
            "Some checks were not successful": "有些检查不成功",
            // [/1 skipped, 4 successful, and 2 failing checks/, "$1 个跳过, $2 个成功, $3 失败"],
            // [/1 skipped, 4 successful, and 2 expected checks/, "$1 个跳过, $2 个成功, $3 个预先检查"],
            "All checks have passed": "所有检查均已通过",
            "All checks have failed": "所有检查均失败",
            // [/5 successful checks/, ""],
            // [/6 checks passed/, ""],
                "Show all checks": "显示所有检查",
                "Hide all checks": "隐藏所有检查",
                "Details": "细节",
                "Required": "必须",
            "Merging is blocked": "合并被阻止",
            "Merging can be performed automatically once the requested changes are addressed.": "一旦请求的更改得到解决，合并就可以自动执行。",
            "This branch is out-of-date with the base branch": "此分支相比基础分支已过时",

            "The base branch restricts merging to authorized users.": "基础分支合并仅限于授权用户。",
            "Learn more about protected branches.": "了解更多关于受保护分支的信息。",
            // [/Merging can be performed automatically with (\d+) approving review./, "合并可以通过 $1 次批准审查自动执行。"],
            "Merge without waiting for requirements to be met (bypass branch protections)": "合并而无需等待需求满足（绕过分支保护）。",
                // [/This commit will be authored by ([^@]+@[^\n]+)/, "此提交的作者是 $1"],


            // [/(\d+) workflow awaiting approval/, "$1 个工作流等待批准"],
            "First-time contributors need a maintainer to approve running workflows.": "首次贡献者需要维护者来批准正在运行的工作流。",
            "The base branch does not accept merge commits. Alternate merge methods are preferred.": "基础分支不接受合并提交。其他合并方法是首选。",
            // [/The ([^ ]+) branch requires linear history/, "$1 分支为要求线性历史记录"],
            "Learn more about required linear history.": "了解更多关于要求线性历史记录。",

            "Checking for ability to merge automatically…": "检测自动合并的能力…",
            "Hang in there while we check the branch’s status.": "请等待，我们正在检查该分支的状态",

            "Required statuses must pass before merging": "合并前必须通过所需的状态",
            "All required": "所有必需",
            "statuses": "状态",
            "and check runs on this pull request must run successfully to enable automatic merging.": "和检查运行在该拉取请求上必须成功运行，才能启用自动合并。",

            "Continuous integration has not been set up": "尚未设置持续集成",
            "several other apps": "其他一些应用",
            "can be used to automatically catch bugs and enforce style.": "可用于自动捕获错误和强制执行样式。",

            "This branch has no conflicts with the base branch": "该分支与基础分支没有冲突",
                "Merging can be performed automatically.": "可以自动地执行合并。",

            "This branch has no conflicts with the base branch when rebasing": "该分支基变时与基础分支没有冲突。",
                "Rebase and merge can be performed automatically.": "可以自动执行变基和合并。",

                "You’re not": "您无",
                "authorized": "权限",
                "to merge this pull request.": "合并此拉取请求。",

            "Merge pull request": "合并拉取请求",
            // 合并拉取请求 按钮下拉
                "Create a merge commit": "创建合并提交",
                    "All commits from this branch will be added to the base branch via a merge commit.": "该分支的所有提交都将通过合并提交加入到基础分支中。",
                "Squash and merge": "压缩合并",
                    // [/The (\d+) commits? from this branch will be added to the base branch./, "该分支的 $1 个提交将合并到基本分支中。"],
                "Rebase and merge": "变基合并",
                    // [/The (\d+) commits? from this branch will be rebased and added to the base branch./, "该分支的 $1 个提交将变基合并到基础分支中。"],
                    "Failed to load repo merge settings": "无法加载仓库合并设置",

            //确认合并 对话框
            "Confirm merge": "确认合并",
            "Confirm squash and merge": "确认压缩合并",
            "Confirm rebase and merge": "确认变基合并",
            "Merging…": "合并中…",

            "You can also": "您也可以",
            "open this in GitHub Desktop": "在 GitHub Desktop 中打开",
            "or view": "，或查看",
            "command line instructions": "命令行指令",

            // "Merged": "已合并",
            "View details": "查看详情",
            "Hide details": "隐藏详情",
            "Revert": "还原",
                "Create a new pull request to revert these changes": "创建一个新的拉取请求以恢复这些更改",
            "Closed with unmerged commits": "已关闭的未合并的提交",

            "Pull request successfully merged and closed": "拉取请求已成功合并并关闭",
            "Delete branch": "删除分支",
            "Restore branch": "恢复分支",

            "Pull request closed": "拉取请求已关闭",
            "This pull request is closed, but the": "此拉取请求已关闭，但是",
            "branch has unmerged commits.": "分支具有未合并的提交。",
            "branch has unmerged commits. You can delete this branch if you wish.": "分支具有未合并的提交。您可以根据需要删除此分支。",
            "If you wish, you can also delete this fork of": "如果需要，还可以删除此复刻",
            "If you wish, you can delete this fork of": "如果需要，可以删除此复刻",
            "in the":"在",
            "settings": "设置",

            // "Only those with": "只有对此仓库具有",
            // "write access": "写入访问权限",
            // "to this repository can merge pull requests.": "的才可合并拉取请求。",
            "You’re all set — the": "一切就绪 —",
            "You’re all set—the": "一切就绪 —",
            "branch can be safely deleted.": "分支可以被安全删除。",
            "This branch has conflicts that must be resolved": "该分支存在冲突，必须解决",
            "Resolve conflicts": "解决冲突",
                "Use the": "使用",
                "web editor": "Web 编辑器",
                "or the": "或",
                "command line": "命令行",
                "to resolve conflicts.": "来解决冲突。",
            "Conflicting files": "冲突的文件:",

            "Require approval from specific reviewers before merging": "合并前需要特定审阅者的批准",
                "Branch protection rules": "分支保护规则",
                "ensure specific people approve pull requests before they're merged.": "确保特定人员在合并之前批准拉取请求。",
            "Add rule": "添加规则",
            // [/Ensure specific people or teams approve pull requests before they're merged into your ([^ ]+) branch./, "确保特定的人或团队在拉取请求被合并到您的 $1 分支之前批准它们。"], // 合并拉取请求

            // [/(\d+) workflows? awaiting approval/, "$1 个工作流程等待批准"],
            "This workflow requires approval from a maintainer.": "此工作流程需要维护者批准。",
            "Learn more about approving workflows.": "了解更多关于批准工作流程的信息。",
            "Approve and run": "批准并运行",

            // 状态词
            "reviewed": "审查",
            "requested a review from": "请求审查",
            "Reply...": "回复...",

            // 代码审查回复
            "Suggestions cannot be applied on outdated comments.": "建议不要应用于过时的评论。",
            "Suggested change": "更改建议",
            "This code change can be committed by users with write permissions.": "具有写入权限的用户可以提交此代码更改。",

        // 拉取请求 --> 提交 标签卡 /<user-name>/<repo-name>/pull/<id>/commits
            "Commits": "提交",
            // [/Commits (.+)/, "提交于 $1"]
            "committed": "提交于",

            // 验证标记浮动信息
                "This commit was created on GitHub.com and signed with GitHub’s": "此提交是在 GitHub.com 上创建的，并使用 GitHub 的",
                "This commit was signed with the committer’s": "此提交已签署，使用提交者的",
                "This tag was signed with the committer’s": "此标签已签署，使用提交者的", // /<user-name>/<repo-name>/releases
                "verified signature": "已验证签名",
                "This commit is not signed, but one or more authors requires that any commit attributed to them is signed.": "此提交未签名，但一位或多位作者要求对归属于他们的任何提交进行签名。",
                "We had a problem verifying this signature. Please try again later.": "我们在验证此签名时遇到问题。请稍后再试。",

                "GPG key ID:": "GPG 密钥 ID：",
                "SSH Key Fingerprint:": "SSH 密钥指纹：",
                "Learn about vigilant mode": "了解警戒模式",

            "Copy the full SHA": "复制完整的 SHA",
            "View commit details": "查看提交详情",
            "Browse the repository at this point in the history": "浏览该阶段的历史仓库内容",

        // 拉取请求--> 提交 --> 某提交详情/<user-name>/<repo-name>/pull/<id>/commits/<full SHA>
            "commit": "提交",

            // 修改的文件 左侧 展开按钮
            "Expand all": "展开全部",
            "Expand All": "展开全部",
            "Expand Up": "向上展开",
            "Expand Down": "向下展开",

            // 修改的文件 右侧下拉
            "Show comments": "显示评论",
            "Show annotations": "显示注释",
            "View file": "查看文件",
            "Edit file": "编辑文件",
            "Delete file": "删除文件",
            "Open in desktop": "在 GitHub Desktop 中打开",

            // 上一页
            "You are viewing the earliest commit": "您正在查看最早的提交",
            // 下一页
            "You are viewing the latest commit": "您正在查看最新的提交",

        // 拉取请求 --> 更改的文件 标签卡 /<user-name>/<repo-name>/pull/<id>/files
            // 工具条
            "Show file tree": "显示文件树",
            "Hide file tree": "隐藏文件树",
            "Changes from": "更改自",
                "all commits": "所有提交",
                // 下拉
                "Show all changes": "显示所有更改",
                // [/(\d+) commits?/, "$1 条提交"],
                "Show changes since your last review": "显示自您上次评论以来的更改",
                // "You haven‘t reviewed this pull requeste": "您尚未审查过此请求请求",
                "You haven’t reviewed this pull request yet": "您尚未审查此请求请求",
                "Select commit": "选择提交",
                "Hold shift + click to select a range": "按住 shift + 单击以选择一个范围",
            "File filter": "文件筛选",
                "Filter by extension": "按文件后缀名筛选",
                    "No extension": "无后缀名",
                    // [/All (\d+) file types? selected/, "所有 $1 种文件类型被选中"],
                    // [/Select all 1 file types?/, "选择所有 $1 种文件类型"],
                    "Only manifest files": "仅清单文件",
                "There are no files selected for viewing": "没有选择要查看的文件",
                "Viewed files": "查看过的文件",
                // "filter file types": "筛选文件类型",
                // "filter viewed files": "筛选已查看文件",
                // "hide viewed files": "隐藏已查看文件",
                // "filter by context": "按内容筛选",
            "Clear filters": "清除筛选",
            "Conversations": "讨论",
                "Jump to conversation": "跳转到讨论",
                "Give feedback": "反馈",
                // [/Unresolved conversations/, "未解决的讨论"],
                "Nice work!": "干得好！",
                "All of your conversations have been resolved.": "您的所有讨论都已解决。",
                // [/Reresolved conversations/, "已解决的讨论"],
                "No conversations yet": "尚无讨论",
                "Review conversations will show up here.": "审查讨论将显示在这里。",
            // "Jump to": "跳转到",
                "Jump to file": "跳转到文件",
                "Filter changed files": "筛选已更改文件",
            // 差异视图
                "Diff view": "差异视图",
                // "Always": "总是",
                "Unified": "同屏",
                "Split": "分屏",
                // "Just for now": "仅当前",
                // "Hide whitespace changes": "隐藏空白更改",
                "Hide whitespace": "隐藏空白",
                "Apply and reload": "应用并重新加载",
            "Show whitespace": "显示空白",
            // "Refresh": "刷新",

            "files viewed": "查看过的文件",
                "Marking files as viewed can help keep track of your progress, but will not affect your submitted review": "将文件标记为已查看可以帮助您跟踪进度，但不会纠正您提交的审查",
            "Review in codespace": "在代码空间中审查",
            // "Review changes": "审查更改", // 使用 Selector 规则翻译
                // 下拉
                "Finish your review": "完成审查",
                    "Submit general feedback without explicit approval.": "未批准，并提出一般性反馈意见。",
                "Approve": "批准",
                    "Submit feedback approving these changes.": "批准，并提出反馈意见。",
                    "Submit feedback and approve merging these changes.": "提交反馈意见并批准合并这些更改。",
                    "Pull request authors can’t approve their own pull request": "拉取请求作者无法批准自己的拉取请求",
                    "Only users with explicit access to this repository may approve pull requests": "只有对这个仓库有明确访问权限的用户才能批准拉取请求",
                "Request changes": "请求更改",
                    "Submit feedback suggesting changes.": "请求更改，并提出更改反馈意见。",
                    "Submit feedback that must be addressed before merging.": "提交合并前必须解决的反馈意见",
                    "Pull request authors can’t request changes on their own pull request": "拉取请求作者不能在自己的拉取请求上请求更改",
                    "Only users with explicit access to this repository may request changes to pull requests": "只有对这个仓库有明确访问权限的用户才能请求更改拉取请求",
                "Submit review": "提交审查",
                "Cancel review": "取消审核",
                "pending": "条待处理",
                "comment": "评论",
                "comments": "评论",

            "Review changes": "审查更改",
                // 被锁定
                "This conversation has been locked and limited to collaborators.": "此对话已锁定，并限制与协作者对话。",

            "Viewed": "已查看",
            "Comment on this file": "评论此文件",

            "Load diff": "载入差异",
            "This file was deleted.": "该文件已被删除",
            "Large diffs are not rendered by default.": "默认情况下，大的差异不会被呈现。",
            "Some generated files are not rendered by default. Learn more about": "某些生成的文件默认不呈现。了解更多信息关于",
            "how customized files appear on GitHub": "更改文件在 GitHub 中的显示方式",
            "File renamed without changes.": "文件仅重命名，内容没有更改。",

        // 拉取请求 --> 更改的文件 标签卡 /<user-name>/<repo-name>/pull/<id>/files/<full SHA>
            "You are viewing a condensed version of this merge commit. You can view the": "您正在查看该合并提交的浓缩版本。您可以查看",
            "full changes here": "完整的更改",

        // 拉取请求 --> 解决冲突 /<user-name>/<repo-name>/pull/<id>/conflicts
            "Resolving conflicts": "解决冲突",
            "between": "",
            "and committing changes": "并提交更改",
            // [/(\d+) conflicting files?/, "$1 个冲突文件"],
            // [/(\d+) conflicts?/, "$1 处冲突"],
            "Mark as resolved": "标记为已解决",
                "Remove all conflict markers to resolve this file": "删除所有冲突标记以解决此文件冲突",
            "Indent mode": "缩进模式",
                "Spaces": "空格",
                "Tabs": "制表符",
            "Indent size": "缩进尺寸",
            "Line wrap mode": "换行模式",
                "No wrap": "不换行",
                "Soft wrap": "软换行",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/([\d,]+) Open/, "$1 打开"],
        [/([\d,]+) Closed/, "$1 已关闭"],
        [/#(\d+) opened/, "#$1 打开于"],
        [/#(\d+) by/, "#$1 打开者"],
        [/(\d+) tasks? done/, "$1 个任务完成"],
        [/(\d+) of (\d+) tasks?/, "$1 / $2 个任务"],
        [/(\d+) tasks?/, "$1 个任务"],
        [/First time contributing to ([^ ]+)?/, "首次为 $1 做贡献？"],
        // 具体某条拉取请求
        [/merged (\d+) commits? into/, "将 $1 个提交合并到"],
        [/([^ ]+) left review comments?/, "$1 发表了审查评论"],
        [/([^ ]+) approved these changes?/, "$1 批准这些更改"], // 具体的拉取请求 审阅者
        [/Request review from ([^ ]+)/, "请求 $1 审查"], // 具体的拉取请求 审阅者
        [/users with write access to ([^ ]+) can add new commits/, "对 $1 具有写权限的用户可以添加新的提交"], // 具体拉取请求
        [/This user is a first-time contributor to the ([^ ]+) repository./, "该用户是第一次为 $1 仓库做贡献。"],
        [/(\d+) pending reviewers?/, "$1 名待审者"],
        [/([\d,]+) participants?/, "$1 位参与者"],
        [/At least (\d+) approving reviews? is required by reviewers with write access./, "具有写入权限的审查者至少需要 $1 次批准审查。"],
        [/(\d+) approving reviews? by reviewers? with write access./, "$1 个批准的审查由具有写入权限的审阅者进行审查。"],
        [/(\d+) approvals?/, "$1 项批准"],
        // [/(\d+) reviews? requesting changes by reviewers with write access/, "$1 项审查，要求有写入权限的审阅者进行更改"],
        [/(\d+) changes? requested/, "$1 项更改请求"],
        [/(\d+) in progress checks?/, "$1 个正在进行的检查"],
        [/(\d+) skipped and (\d+) successful checks?/, "$1 个跳过, $2 个成功检查"],
        [/(\d+) successful and (\d+) failing checks?/, "$1 个成功, $2 个失败检查"],
        [/(\d+) skipped, (\d+) successful, and (\d+) failing checks?/, "$1 个跳过, $2 个成功, $3 个失败检查"],
        [/(\d+) skipped, (\d+) successful, (\d+) cancelled, and (\d+) failing checks?/, "$1 个跳过, $2 个成功, $3 个取消, $4 个失败检查"],
        [/(\d+) skipped, (\d+) successful, and (\d+) expected checks?/, "$1 个跳过, $2 个成功, $3 个预先检查"],
        [/(\d+) skipped, (\d+) successful, (\d+) queue, and (\d+) expected checks?/, "$1 个跳过, $2 个成功, $3 个排队, $4 个预先检查"],
        [/(\d+) skipped, (\d+) successful, (\d+) in progress, and (\d+) expected checks?/, "$1 个跳过, $2 个成功, $3 个正在进行, $4 个预先检查"],
        [/(\d+) neutral checks?/, "$1 次中立检查"],
        [/(\d+) successful checks?/, "$1 次成功检查"],
        [/(\d+) checks? passed/, "$1 次检查通过"],
        [/Merging can be performed automatically with (\d+) approving review./, "合并可以通过 $1 次批准审查自动执行。"],
        [/(\d+) workflow awaiting approval/, "$1 个工作流等待批准"],
        [/The ([^ ]+) branch requires linear history/, "$1 分支为要求线性历史记录"],
        [/The (\d+) commits? from this branch will be added to the base branch./, "该分支的 $1 个提交将合并到基本分支中。"], // 合并拉取请求 按钮下拉
        [/The (\d+) commits? from this branch will be combined into one commit in the base branch./, "该分支的 $1 个提交将合并到基础分支中。"], // 合并拉取请求 按钮下拉
        [/The (\d+) commits? from this branch will be rebased and added to the base branch./, "该分支的 $1 个提交将变基合并到基础分支中。"], // 合并拉取请求 按钮下拉
        [/Ensure specific people or teams approve pull requests before they're merged into your ([^ ]+) branch./, "确保特定的人或团队在拉取请求被合并到您的 $1 分支之前批准它们。"], // 合并拉取请求
        [/(\d+) commits?/, "$1 条提交"],
        [/All (\d+) file types? selected/, "所有 $1 种文件类型被选中"], // 文件筛选
        [/Select all (\d+) file types?/, "选择所有 $1 种文件类型"],
        [/Unresolved conversations/, "未解决的讨论"],
        [/Reresolved conversations/, "已解决的讨论"],
        // [/Commits (.+)/, "提交于 $1"], // 提交标签卡
        // 代码空间
        [/Create a codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
        [/Create codespace on ([^ ]+)/, "在 $1 上创建代码空间"],
        [/Codespace \"(.+)\" stopped./, "代码空间 “$1” 已停止。"],
        [/Codespace \"(.+)\" deleted./, "代码空间 “$1” 已删除。"],
        [/Are you sure you want to delete (.+)\?/, "您确定要删除 $1 吗？"],
        [/(\d+) conflicting files?/, "$1 个冲突文件"], //conflicts
        [/(\d+) conflicts?/, "$1 处冲突"],  //conflicts
        // [/This commit will be authored by (.+)/, "此提交将由 $1 撰写"],// 具体的拉取请求
        [/Awaiting requested review from ([^ ]+)/, "等待 $1 审查请求"], // 具体的拉取请求
        [/This commit will be authored by ([^@]+@[^\n]+)/, "此提交的作者是 $1"], // 具体的拉取请求
        [/This pull request resolved a Dependabot alert on ([^ ]+)./, "该请求解决了 $1 的 Dependabot 警报问题。"],
        [/(\d+) workflows? awaiting approval/, "$1 个工作流程等待批准"],
    ],
    "selector": [ // 元素筛选器规则
        ["span[data-message='Review changes']", "审查更改"], // 拉取请求 --> 更改的文件
    ],
};

I18N.zh["repository/compare"] = { // 仓库 - 比较并创建拉取请求
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 变更比较 页面 /<user-name>/<repo-name>/compare
            "Compare changes": "比较变更",
            "Compare changes across branches, commits, tags, and more below. If you need to, you can also": "比较跨分支，提交，标签，和更多的变更。如果您需要，也可以",
            "compare across forks": "比较复刻库和源仓库",

            // 分支选择栏
            "base repository:": "基础仓库：",
                "Choose a Base Repository": "选择基础仓库",
                "Filter repos": "筛选仓库",
            "head repository:": "头部仓库：",
                "Choose a Head Repository": "选择头部仓库",

            "base:": "基础库：",
                "Choose a base ref": "选择基础引用",
                "Find a branch": "搜索分支",
                "Find a tag": "搜索标签",
            "compare:": "比较库：",
                "Choose a head ref": "选择头部引用",

            "Choose different branches or forks above to discuss and review changes.": "选择不同的分支或复刻来讨论和查看变化。",
            "Learn about pull requests": "了解拉取请求",

            "Create pull request": "创建拉取请求",

            "Compare and review just about anything": "比较和审查任何文件",
            "Branches, tags, commit ranges, and time ranges. In the same repository and across forks.": "分支，标签，提交范围和时间范围。在同一仓库和复刻的仓库。",
            "Example comparisons": "比较例子",

        // 提出合并分支 /<user-name>/<repo-name>/compare/<branch>...<user-name>:<branch>
        // /<user-name>/<repo-name>/compare/<branch>...<user-name>:<repo-name>:<branch>
            // https://github.com/k1995/github-i18n-plugin/compare/master...maboloshi:master
            // https://github.com/maboloshi/github-i18n-plugin/compare/master...k1995:master
            "Comparing changes": "比较变更",
            "Choose two branches to see what’s changed or to start a new pull request. If you need to, you can also": "选择两个分支，看看发生了什么改变，或发起一个新的拉请求。如果您需要，您也可以",
            "base fork:": "基复刻：",

            "There isn’t anything to compare.": "没有任何东西可比较。",
            "is up to date with all commits from": "已是最新，提交于",
            ". Try": "。尝试",
            "switching the base": "切换基础库",
            "for your comparison.": "来进行比较。",


            "Discuss and review the changes in this comparison with others.": "与他人讨论并回顾此次对比中的变化。",

            "This comparison is big! We’re only showing the most recent 250 commits": "这个比较是很大的! 我们只显示最近的 250 个提交。",

            "You’ll need to use two different branch names to get a valid comparison.": "您需要使用两个不同的分支名称来进行有效的比较。",
            "Check out some of these sample comparisons.": "看看这些比较的例子吧。",
            "are identical.": "是相同的。",

            "Create another pull request to discuss and review the changes again.": "创建另一个拉取请求，再次讨论和审查这些更改。",

        //// 直接提交拉取请求
            "Open a pull request": "新建一个拉取请求",
            "Create a new pull request by comparing changes across two branches. If you need to, you can also": "通过比较两个分支的更改来创建一个新的拉请求。如果需要，还可以",

            "Checking mergeability…": "检查可合并性…",
            "Don’t worry, you can still create the pull request.": "别担心，您仍然可以创建拉取请求。",
            "Able to merge.": "可被合并。",
            "Can’t automatically merge.": "无法自动合并。",
            "These branches can be automatically merged.": "该分支可被自动合并。",

            "View pull request": "查看拉取请求", //存在拉取请求时

            // "commit comment": "次提交",
            // "commit comments": "次提交",
            // "file changed": "个文件变更",
            // "files changed": "个文件变更",
            // "comments": "个评论",
            // "contributor": "位贡献者",
            // "contributors": "位贡献者",
            // "No commit comments for this range": "该范围变更没有提交注释",

            "Allow edits by maintainers": "允许维护者进行编辑",
            // 创建拉取请求 按钮下拉
                "Open a pull request that is ready for review": "打开一个拉取请求，以供审查",
                "Create draft pull request": "创建拉取请求草案",
                "Cannot be merged until marked ready for review": "在标记为可供审查之前，不能合并",
                "Draft pull request": "拉取请求草案",
            "Remember, contributions to this repository should follow our": "请记住，对该仓库的贡献应遵循我们的",
            "GitHub Community Guidelines": "GitHub 社区准则",

            // 右侧栏补充
            // 关联议题
            "Use": "使用",
            "Closing keywords": "关闭关键词",
            "in the description to automatically close issues": "在描述中，以自动关闭议题",
            "Use Closing keywords to add a closing reference": "使用关闭关键词添加一个关闭引用",

            "Helpful resources":"帮助性资源",
            // "GitHub Community Guidelines": "GitHub 社区准则",


        // 标签对应版本比较 /<user-name>/<repo-name>/compare/<tag id1>...<tag id2>
            // 仅限 MD文件
            "Display the source diff": "显示源差异",
            "Display the rich diff": "显示富差异",

            "Load more commits": "载入更多的提交",

        // /<user-name>/<repo-name>/compare/<tag>...<branch>
            "Commit comments": "提交评论",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/commit"] = { // 仓库 - 提交页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 具体某个提交页面 /<user-name>/<repo-name>/commit/<full SHA>
            "Commit": "提交",

            // 快捷键
            "Browsing commits": "浏览提交",
            // "": "提交评论",
            "Close form": "关闭评论",
            "Parent commit": "父提交",
            "Other parent commit": "其他父提交",

            // 访问已删除的提交
            "This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.": "这个提交不属于本仓库的任何分支，可能属于仓库以外的分支。",

            "Browse files": "浏览文件",
            "Loading branch information": "载入分支信息",

            // [/This commit closes issue (#\d+)./, "此提交关闭了提议 $1。"], //具体提交页面
            "committed": "提交于",
            "commit": "提交",

            "Showing": "显示",
            "with": "包含",
            "always": "总是",
            "Unified": "同屏",
            "Split": "分屏",

            "Display the source diff": "显示源差异",
            "Display the rich diff": "显示富差异",
            "Comment on this file": "评论此文件", // new code view

            "Filter changed files": "筛选已更改的文件", // new code view 侧栏

            "Submodule": "子模块",
            "updated": "已更新",
            // [/from ([^ ]+) to ([^ ]+)/, "从 $1 到 $2。"], //具体提交页面

            "Binary file not shown.": "不显示二进制文件",
            "Empty file.": "空文件。",
            "File renamed without changes.": "文件仅重命名，内容没有更改。",

            "Load diff": "载入差异",
            "This file was deleted.": "该文件已被删除",
            "Large diffs are not rendered by default.": "默认情况下，大的差异不会被呈现。",
            "Some generated files are not rendered by default. Learn more about": "某些生成的文件默认不呈现。了解更多信息关于",
            "how customized files appear on GitHub": "更改文件在 GitHub 中的显示方式",
            "File renamed without changes.": "文件仅重命名，内容没有更改。",

            // 修改的文件 左侧 展开按钮
            "Expand all": "展开全部",
            "Expand Up": "展开",
            "Collapse expanded lines": "折叠展开的线",

            // 修改的文件 右侧下拉
            "Show comments": "显示评论",
            "Show annotations": "显示注释",
            "View file": "查看文件",
            "Edit file": "编辑文件",
            "Delete file": "删除文件",
            "Open in desktop": "在 GitHub Desktop 中打开",

            //底部评论框上部
            "Lock conversation": "锁定对话",
                "Lock conversation on this commit": "锁定关于此提交的对话",
                "Locking the conversation means:": "锁定对话意味着：",
                    "Other users": "其他用户",
                    "can’t add new comments": "无法添加新评论",
                    "to this commit.": "到这个提交。",
                    "You and other collaborators": "您和其他协作者",
                    "with access": "有权限访问",
                    "to this repository": "该仓库",
                    "can still leave comments": "仍然可以发表评论",
                    "that others can see.": "其他人可以看到。",
                "You can always unlock this commit again in the future.": "您可以随时再次解锁此提交。",
            "Unlock conversation": "解锁对话",
                "Unlock conversation on this commit": "解锁关于此提交的对话",
                "Unlocking the conversation means:": "解锁对话意味着：",
                "will be able to comment on this commit once more.": "将能够再次对此提交发表评论。",
                "You can always lock this commit again in the future.": "您可以随时再次锁定此提交。",

            "Subscribe": "订阅",
            "Unsubscribe": "取消订阅",
            "You’re not receiving notifications from this thread.": "您没有收到来自该话题的通知。",
            "You’re receiving notifications because you’re subscribed to this thread.": "您收到通知是因为您订阅了该话题。",
            "You’re receiving notifications because you’re watching this repository.": "您收到通知是因为您关注了该仓库。",

        // 提交 commits 页面 /<user-name>/<repo-name>/commits/<branch> 或 /<user-name>/<repo-name>/commits
            "Commits": "提交",
            // 快捷键
                "Copy file permalink": "复制文件永久链接",

            // 切换分支/标签 下拉菜单
                "Switch branches/tags": "切换分支/标签",
                "Find a branch...": "查找分支……",
                "Find a tag...": "查找标签……",
                "Filter branches/tags": "搜索分支/标签",
                "Branches": "分支",
                "default": "默认",
                "View all": "查看全部",
                "branches": "分支",
                "tags": "标签",
                "Find a tag": "查找标签",
                "Tags": "标签",
                "Search for a tag": "搜索标签",
                "Nothing to show": "暂无",

            // 验证标记浮动信息
            "This commit was created on GitHub.com and signed with GitHub’s": "此提交是在 GitHub.com 上创建的，并使用 GitHub 的",
            "This commit was signed with the committer’s": "此提交已签署，使用提交者的",
            "This tag was signed with the committer’s": "此标签已签署，使用提交者的", // /<user-name>/<repo-name>/releases
            "verified signature": "已验证签名",
            "This commit is not signed, but one or more authors requires that any commit attributed to them is signed.": "此提交未签名，但一位或多位作者要求对归属于他们的任何提交进行签名。",
            "We had a problem verifying this signature. Please try again later.": "我们在验证此签名时遇到问题。请稍后再试。",

            "GPG key ID:": "GPG 密钥 ID：",
            "SSH Key Fingerprint:": "SSH 密钥指纹：",
            "Learn about vigilant mode": "了解警戒模式",

            "Copy the full SHA": "复制完整的 SHA",
            "View commit details": "查看提交详情",
            "Browse the repository at this point in the history": "浏览该阶段的历史仓库内容",

            "Newer": "新的",
            "Older": "旧的",

        // 新版提交 commits 页面 /<user-name>/<repo-name>/commits/<branch> 或 /<user-name>/<repo-name>/commits
            // 用户筛选
                "All users": "所有用户",
                "Find a user...": "寻找一个用户……",
                "View commits for all users": "查看所有用户的提交",
            // 时间筛选
                "All time": "所有时间",
                "Today": "今天",
            "Browse repository at this point": "查看此时间点的仓库",
            

        // 提交中文件历史 /<user-name>/<repo-name>/commits/<branch>/<file> 或 /<user-name>/<repo-name>/commits/<full SHA>/<file>
            "History for": "历史：",
            "View at this point in the history": "在这一历史节点上查看",

            // [/Renamed from/, "重命名自"], // 提交中文件历史
            "(Browse History)": "（浏览历史）",

        // 提交中文件夹历史 /<user-name>/<repo-name>/commits/<branch>/<folder> 或 /<user-name>/<repo-name>/commits/<full SHA>/<folder>
            "End of commit history for this file": "此文件的提交历史结束",

        // 2/commits?author=maboloshi&since=2021-09-30&until=2021-10-13
            "Seeing something unexpected? Take a look at the": "看到了一些意想不到的东西？请看一下",
            "GitHub commits guide": "GitHub 提交指南",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) parents?/, "$1 个父"],
        [/(\d+) changed files?/, "$1 个更改的文件"],
        [/(\d+) additions?$/, "$1 处增加"],
        [/(\d+) deletions?$/, "$1 处删除"],
        [/(\d+) changes: (\d+) additions? & (\d+) deletions?$/, "$1 处更改：$2 处增加和 $3 处删除"],
        [/This commit closes issue (#\d+)./, "此提交关闭了提议 $1。"], //具体提交页面
        [/from ([^ ]+) to ([^ ]+)/, "从 $1 到 $2。"], //具体提交页面
        [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "$1 处增加，$2 处删除未显示，因为差异太大。请使用本地 Git 客户端查看这些更改。"],
        [/(\d+) comments? on commit/, "该提交有 $1 条评论"],
        // [/Commits (.+)/, "提交于 $1"], // 提交页面 /<user-name>/<repo-name>/commits/<branch
        [/Renamed from/, "重命名自"], // 提交中文件历史
    ],
};

I18N.zh["repository/blob"] = { // 仓库 - 浏览代码
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 文件代码页面 /<user-name>/<repo-name>/blob/<brach>/<file> >>>>>>>>>>>>>>>>>>>>>>
            // 顶部提醒
                "This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.": "此提交不属于该仓库上的任何分支，并且可能属于仓库的外部分支。",

            // 切换分支/标签 下拉菜单
                "Switch branches/tags": "切换分支/标签",
                "Find a branch...": "查找分支...",
                "Filter branches/tags": "搜索分支/标签",
                "Branches": "分支",
                "default": "默认",
                "View all branches": "查看全部分支",
                "Find a tag": "查找标签",
                "Tags": "标签",
                "Search for a tag": "搜索标签",
                "Nothing to show": "暂无",
                "View all tags": "查看全部标签",

            // 左侧栏
                "Add file": "添加文件",
                "Documentation": "文档",

            "View Runs": "查看运行情况", // 工作流程文件
            "Go to file": "转到文件",
                "No matches found": "未找到匹配项",

            // 快捷键
                "Source code browsing": "源代码浏览",
                "Activates the file finder": "激活文件查找器",
                "Jump to line": "跳转到行",
                "Switch branch/tag": "切换分支/标签",
                "Expand URL to its canonical form": "将 URL 扩展为其规范形式",
                "Show/hide all inline notes": "显示/隐藏所有内嵌注释",
                "Open blame": "打开追溯视图",

            // Action的 action.yml 文件
                "You can publish this Action to the GitHub Marketplace": "您可以将此 Action 发布到 GitHub 市场",
                "Draft a release": "起草发布",
            "View runs": "查看工作流程", // 工作流程文件 /blob/<brach>/.github/workflows/xxxx.yml

            "Path copied!": "✅ 路径已复制！",

            "Download": "下载",
            "Open with Desktop": "在 Desktop 中打开", //小屏
            "Delete file": "删除文件", //小屏

            "View raw": "查看原始数据",
            "(Sorry about that, but we can’t show files that are this big right now.)": "（很抱歉，但我们现在无法显示这么大的文件。）",
            "Sorry, something went wrong.": "抱歉，出了一些问题。",
            "Reload?": "重新加载？",
            "Unable to render code block": "无法渲染代码块",

            "More Pages": "更多页面",

            // 地址栏 最右侧 下拉菜单
            "Go to line": "跳转到行",
                "Jump to line…": "跳转到行",
                // "Go":"确定",
            "Go to definition": "跳转到定义",
                // 代码定义筛选对话框
                "Code definitions": "代码定义",
                "Filter definitions": "筛选定义",
                "Function": "函数",
                "Method": "方法",
                "Code navigation index up-to-date": "代码导航索引最新",
                "No definitions found in this file.": "本文件中没有发现任何定义。",
                "Code navigation not available for this commit": "该提交的代码导航不可用",
            "Copy path": "复制路径",
            "Copy permalink": "复制永久链接",

            "Latest commit": "最新提交",
            "History": "历史",

            "contributor": "贡献者",
            "contributors": "贡献者",

            "Display the source blob": "源代码视图", // md 文件
            "Display the rendered blob": "解析后视图", // md 文件
            "Raw": "源码",
            "Blame": "追溯",
            // GitHub Desktop 图标
                "Open this file in GitHub Desktop":"在 GitHub Desktop 中打开",
                "You must be on a branch to open this file in GitHub Desktop": "您必须在分支上才能在 GitHub Desktop 中打开",
            "Copy raw contents": "复制源码内容",
            // 文件编辑图标
            "Edit this file": "编辑本文件",
                "Open in github.dev": "在 github.dev 中打开",
                "Open in GitHub Desktop": "在 GitHub Desktop 中打开",

                // 按钮提示
                "Fork this repository and edit the file": "复刻此仓库并编辑文件",
            // 文件删除图标
            "Delete this file":"删除本文件",
                "Fork this repository and delete the file": "复刻此仓库并删除文件",
            "You must be on a branch to make or propose changes to this file": "您必须在分支上才能对此文件进行操作或提议更改", // 历史文件

            "Copy line": "复制行",
            "Copy lines": "复制行",
            "Copy permalink": "复制永久链接",
            "View git blame": "浏览 Git 追溯",
            "Reference in new issue": "引用到新议题",
            "Reference in new discussion": "引用到新讨论",
            "View file in GitHub.dev": "在 GitHub.dev 中查看文件",
            "View file in different branch/tag": "查看不同分支/标签中的文件",

            "Search this file…": "搜索这个文件...", // csv 文件

            //
            "This file contains bidirectional Unicode text that may be interpreted or compiled differently than what appears below. To review, open the file in an editor that reveals hidden Unicode characters.": "此文件包含双向 Unicode 文本，其解释或编译方式可能与下面的显示不同。要查看，请在一个能显示隐藏的 Unicode 字符的编辑器中打开文件。",
            "Learn more about bidirectional Unicode characters": "了解更多关于双向 Unicode 字符的信息",
            "Show hidden characters": "显示隐藏字符",


            // new code view
                "Top": "顶部",
                "Jump to file": "跳转到文件",

                // 切换分支/标签 下拉菜单
                    "Switch branches/tags": "切换分支/标签",
                    "Find or create a branch...": "查找或创建分支...",
                    "default": "默认",
                    "View all": "查看全部",
                    "branches": "分支",
                    "Find a tag...": "查找标签...",
                    "Nothing to show": "暂无",
                    "tags": "标签",

                // 新三个点
                    "Raw file content": "原始文件内容",
                    // "Jump to line": "跳转到行",
                    "Find in file": "在文件中查找",
                    "View options": "查看选项",
                        "Show code folding buttons": "显示代码折叠按钮",
                        "Wrap lines": "换行",
                        "Center content": "核心内容",
                        "Open symbols on click": "单击打开符号",
                    "Delete file": "删除文件",

                "Copy raw file":"复制原始文件",
                "Download raw file":"下载原始文件",
                "Edit this file": "编辑本文件",
                "Edit the file in your fork of this project": "在您的复刻中编辑文件",
                    "Edit file":"编辑文件",
                    "Edit in place":"就地编辑",
                    "Open with...":"打开...",

                // 大纲按钮
                "Outline": "大纲", // md 文件
                    "Filter headings": "筛选标题", // md 文件

                //展开按钮
                "Open symbols panel": "打开符号面板",
                "Close symbols panel": "关闭符号面板",
                "Symbols": "符号",
                    "Symbol outline not available for this file": "大纲不适用于此文件",
                    "To inspect a symbol, try clicking on the symbol directly in the code view.": "要检查一个符号，可以尝试在代码视图中直接点击该符号。",
                    "Code navigation supports a limited number of languages.": "代码导航支持有限数量的语言。",
                    "See which languages are supported.": "查看支持哪些语言。",

                    "Find definitions and references for functions and other symbols in this file by clicking a symbol below or in the code.": "通过点击下方或代码中的符号，查找此文件中函数和其他符号的定义和引用。",
                    "Filter symbols": "筛选符号",

                "All Symbols": "所有符号",
                    "Search for this symbol in this repository": "在此仓库中搜索此符号",
                    "all repositories.": "所有仓库。",
                    "In this file": "在这个文件中",
                    "Definition": "定义",
                    "search-based": "基于搜索",
                    "References": "引用",
                    "Reference": "引用",
                    "No definitions or references found": "未找到定义或引用",
                    "Show more": "显示更多",
                    "Search for this symbol": "搜索此符号",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) References?/, "$1 次引用"],
    ],
};

I18N.zh["repository/discussions"] = { // 讨论页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 讨论页面 /<user-name>/<repo-name>/discussions 组织讨论页 /orgs/<orgs-name>/discussions
            "Teams": "团队", //组织仓库
            "People": "成员", //组织仓库

            "Start a new discussion": "开始新的讨论",
            "Get started by creating the first": "开始吧，为您的社区创建",
            "discussion for your community.": "第一个讨论。",
            "Got it": "知道了",

            "About pinned discussions": "关于置顶讨论",
            "When you start a discussion,": "当您开始讨论时，",
            "you can choose to feature it": "您可以选择将",
            "here by pinning it.": "其置顶在此处。",

            "Personalize your categories": "自定义您的分类",
            "Choose categories that fit your community. These could be announcements, Q&A with marked answers, open-ended conversations, or polls for community voting.": "选择适合您社区的类别。这些可以是公告、带有标记答案的问答、开放式对话或用于调查的社区投票。",

            "Welcome to discussions!": "欢迎参与讨论！",
            "Discussions are to share announcements, create conversation in your community, answer questions, and more.": "讨论是为了分享公告，在您的社区创造对话，回答问题，以及更多。",
            "Discussions are to share announcements, create conversation in your community, answer questions, and more. To get started, you can create a": "讨论是为了分享公告，在您的社区创造对话，回答问题，以及更多。首先，您可以创建一个",

            // 组织讨论
            "Welcome to Organization Discussions!": "欢迎参与组织讨论！",
            "Organization discussions are to broadcast news, create conversation in your community, answer questions, and share ideas. To get started, you can": "组织讨论是为了广播新闻，在您的社区创造对话，回答问题，并分享想法。要开始，您可以",
            "create a new discussion.": "创建新的讨论。",

            // 左侧栏
            "Search all discussions": "搜索所有讨论",
            "Suggested filters": "推荐的筛选器",
            "filter by discussion author": "按讨论作者筛选",
            "filter by discussion category": "按讨论分类筛选",
            "filter by answered or unanswered": "按已答复或未答复筛选",

            "Categories": "分类",
            "View all discussions": "查看全部讨论", // 组织讨论
            "View all": "查看全部", // 仓库讨论

            "Most helpful": "最有帮助",
                "Be sure to mark someone’s comment as an answer if it helps you resolve your question — they deserve the credit!": "如果某人的评论有助于您解决问题，请务必将其标记为答案——他们值得称赞！",
            "Community guidelines": "社区指南",
            "Community insights": "社区见解",

            //
            "Sort by:": "排序方式：",
                "Latest activity": "最新活动",
                "Date created": "创建日期",
                "Top: Past week": "置顶：过去一周",
                "Top: Past month": "置顶：过去一月",
                "Top: Past day": "置顶：过去一天",
                "Top: Past year": "置顶：过去一年",
                "Top: All": "置顶：所有",
            "Label": "标签",
                "Filter by label": "按标签筛选",
                "Filter labels": "筛选标签",
                "Unlabeled": "无标签",

                "bug": "BUG",
                    "Something isn't working": "有些东西不工作",
                "dependencies": "依赖性",
                    "Pull requests that update a dependency file": "更新一个依赖文件的拉取请求",
                "documentation": "文档",
                    "Improvements or additions to documentation": "文档的改进或补充",
                "duplicate": "重复",
                    "This issue or pull request already exists": "这个议题或拉取请求已经存在",
                "enhancement": "增强",
                    "New feature or request": "新功能或请求",
                "good first issue": "好的首发议题",
                    "Good for newcomers": "适合新人",
                "help wanted": "需要帮助",
                    "Extra attention is needed": "需要特别关注",
                "invalid": "无效",
                    "This doesn't seem right": "这似乎不对",
                "question": "问题",
                    "Further information is requested": "要求提供更多信息",
                "wontfix": "不会修复",
                    "This will not be worked on": "这将不会被处理",

                "Edit labels": "编辑标签",
            "Filter:": "筛选:",
                "Answered": "已答复",
                "Unanswered": "未答复",
                "Locked": "锁定",
                "Unlocked": "未锁定",
                "All": "所有",

            "New discussion": "新建讨论",

            "There aren't any discussions.": "暂无任何讨论。",
            "There are no matching discussions.": "没有匹配的讨论。",
            "There are no matching answered discussions.": "没有匹配的已答复讨论。",
            "There are no matching unanswered discussions.": "没有匹配的未答复讨论。",
            "You can open a": "您可以打开一个",
            "new discussion": "新讨论",
            "to ask questions about this repository or get help.": "，询问关于这个仓库的问题或获得帮助。",

            "asked": "回复",
            "started": "标星",
            "· Unanswered":" · 未答复",
            "· Answered":" · 已答复",

            // 下拉补充
            "to exclude labels.": "去排除标签。",

            // 状态词
            "asked a question in": "提出了一个问题在",
            "Unanswered Question": "未解答的问题",
            "announced": "公布于",
            "in": "在",

        // 讨论分类 /<user-name>/<repo-name>/discussions/categories
            "Manage discussion categories": "管理讨论分类",
                "Sections are a dropdown of categories. Categories have types of discussions, and discussions within them.": "本栏目是类别的下拉菜单。类别中包含讨论类型和讨论内容。",
            // [/(\d+) categories?/, "$1 个分类"],
            "Categories without section": "无栏目分类",
            "Announcements": "公告",
                "Updates from maintainers": "维护者的更新信息",
            "General": "通常",
                "Chat about anything and everything here": "在这里谈论任何事情",
            "Ideas": "想法",
                "Share ideas for new features":"分享对新功能的想法",
            "Polls": "投票",
                "Take a vote from the community": "社区中进行投票",
            "Q&A": "问答",
                "Ask the community for help": "向社会寻求帮助",
                "Answers enabled": "已启用答案",
            "Show and tell": "展示与讲述",
                "Show off something you've made": "炫耀您所做的事情",

            "New section": "新建栏目",
            "New category": "新建分类",

            "Edit Announcements category": "编辑 “公告” 分类",
            "Edit General category": "编辑 “通常” 分类",
            "Edit Ideas category": "编辑 “想法” 分类",
            "Edit Polls category": "编辑 “投票” 分类",
            "Edit Q&A category": "编辑 “问与答” 分类",
            "Edit Show and tell category": "编辑 “展示与讲述” 分类",

            "Delete Announcements category": "删除 “公告” 分类",
            "Delete General category": "删除 “通常” 分类",
            "Delete Ideas category": "删除 “想法” 分类",
            "Delete Polls category": "删除 “投票” 分类",
            "Delete Q&A category": "删除 “问与答” 分类",
            "Delete Show and tell category": "删除 “展示与讲述” 分类",

            // 删除分类
                "If this category has discussions associated, where would you like to reassign them?": "如果此类别有相关的讨论，您希望将它们重新分配到何处？",
                "Delete and move": "删除并移动",

            // 删除栏目
                // [/Delete (.*) section/, "删除 “$1” 栏目"],
                "Are you sure you want to delete this section? All categories in this section will no longer belong to a section.": "您确定要删除此栏目吗？此栏目中的所有分类将不再属于一个栏目。",

        // 新建 & 编辑 分类 /<user-name>/<repo-name>/discussions/categories/new
        // /<user-name>/<repo-name>/discussions/categories/<id>/edit
            "Create category": "创建分类",
            "Edit category": "编辑分类",
            "Category name": "分类名称",
            "Description": "描述",
            "Add a description (optional)": "添加描述（可选）",
            "Discussion Format": "讨论形式",
                "Open-ended discussion": "开放式讨论",
                    "Enable your community to have conversations that don't require a definitive answer to a question. Great for sharing tips and tricks or just chatting.": "使您的社区能够进行对话，不需要对问题作出明确的回答。很适合分享技巧和窍门，或者只是聊天。",
                "Question / Answer": "问 / 答",
                    "Enable your community to ask questions, suggest answers, and vote on the best suggested answer.": "使您的社区能够提出问题、建议答案并投票选出最佳建议答案。",
                "Announcement": "公告",
                    "Share updates and news with your community. Only maintainers and admins can post new discussions in these categories, but anyone can comment and reply.": "与您的社区分享更新和新闻。只有维护者和管理员可以在这些类别中发布新讨论，但任何人都可以发表评论和回复。",
                "Poll": "投票",
                    "Gauge interest, vote, and interact with other community members using polls.": "调查兴趣，投票，并使用投票与其他社区成员互动。",
                    "Cannot be changed to polls. Please create a new category for polls.": "不能更改为投票。请为投票创建一个新类别。",
            "Add this category to a section (optional)": "将此分类添加到一个栏目（可选）",
                "No section": "无栏目",

            "Create": "创建",
            "Save changes": "保存更改",
            "Submitting": "提交中",

            // 顶部提醒
                "Category Announcements has been created.": "分类 “公告” 已创建",
                "Category General has been created.": "分类 “通常” 已创建",
                "Category Ideas has been created.": "分类 “想法” 已创建",
                "Category Polls has been created.": "分类 “投票” 已创建",
                "Category Q&A has been created.": "分类 “问与答” 已创建",
                "Category Show and tell has been created.": "分类 “展示与讲述” 已创建",

                "Category Announcements has been updated.": "分类 “公告” 已更新",
                "Category General has been updated.": "分类 “通常” 已更新",
                "Category Ideas has been updated.": "分类 “想法” 已更新",
                "Category Polls has been updated.": "分类 “投票” 已更新",
                "Category Q&A has been updated.": "分类 “问与答” 已更新",
                "Category Show and tell has been updated.": "分类 “展示与讲述” 已更新",

                "Category Announcements has been deleted.": "分类 “公告” 已删除",
                "Category General has been deleted.": "分类 “通常” 已删除",
                "Category Ideas has been deleted.": "分类 “想法” 已删除",
                "Category Polls has been deleted.": "分类 “投票” 已删除",
                "Category Q&A has been deleted.": "分类 “问与答” 已删除",
                "Category Show and tell has been deleted.": "分类 “展示与讲述” 已删除",

                // [/Category \"(.*)\" has been created./, "分类 “$1” 已创建。"],
                // [/Category \"(.*)\" has been updated./, "分类 “$1” 已更新。"],
                // [/Category \"(.*)\" has been deleted./, "分类 “$1” 已删除。"],

        // 新建 & 编辑栏目 /<user-name>/<repo-name>/discussions/sections/new
            "Create section": "创建栏目",
            "Section name": "栏目名称",
            "Add categories to this section": "向栏目添加分类",
            "A category can only belong to one section at a time.": "一个分类一次只能属于一个栏目。",

            // 顶部提醒
                // [/Section \"(.*)\" has been created./, "栏目 “$1” 已创建。"],
                // [/Section \"(.*)\" has been updated./, "栏目 “$1” 已更新。"],
                // [/Section \"(.*)\" has been deleted./, "栏目 “$1” 已删除。"],


        // 新建讨论页面 /<user-name>/<repo-name>/discussions/new
            "Start a new discussion": "开始新的讨论",
            "Select a discussion category": "选择讨论分类",
            "Get started": "开始",
            "Category:": "分类：",
            "Contributing": "贡献",
            "It looks like this is your first time starting a discussion in this repository!": "看起来这是您第一次在此仓库中开始讨论！",
            "This is a community we build together. Please be welcoming and open minded.": "这是我们共同建立的社区。请保持热情和开放的态度。",

            // 投票类
            "Poll question": "投票问题",
            "Ask your question here (required)": "在此提出您的问题（必填）。",
            "Poll options": "投票选项",
            "Option 1 (required)": "选项 1（必填）",
            "Option 2 (required)": "选项 2（必填）",
            "Option": "选项",
            "+ Add an option": "+ 增加选项",

            // 右侧栏
            "Labels": "标签",
                "None yet": "暂无",
            "Helpful resources":"帮助性资源",
            "Code of conduct": "行为准则",
            "Security policy": "安全政策",
            "Support": "支持",
            "GitHub Community Guidelines": "GitHub 社区准则",

            "Ask a question, start a conversation, or make an announcement": "提出问题、开始对话或发布公告",

        // 新建讨论页面 /<user-name>/<repo-name>/discussions/new?category=general
            "If this doesn’t look right you can": "如果这个看起来不对，你可以",
            "choose a different category.": "选择不同的类别。",
            "Fields marked with an asterisk (*) are required.": "标有星号（*）的字段是必填字段。",
            "Discussion title": "讨论标题",

        // 新建讨论页面 /<user-name>/<repo-name>/discussions/new?category=announcements&welcome_text=true
            "Since you're new here, we're helping you to get started by generating your first post to the community. Don't worry, you can edit this discussion after you post!": "由于您是新来的，我们正在帮助您开始向社区发布您的第一个帖子。不用担心，您可以在发布后编辑此讨论！",

        // 某个讨论页面 /<user-name>/<repo-name>/discussions/<id>
            // [/Congratulations, you've created the first discussion in ([^ ]+)!/, "恭喜您，您已经在 $1 中创建了第一个讨论!"],

            "announced in": "宣布于",
            "started this conversation in": "开始了这次讨论，在",
            "asked this question in": "提出了这个问题，在",
            "Maintainer": "维护者",
            "Discussion options": "讨论选项",
            "Category": "分类",

            // [/(\d+) answers?/, "$1 位答复者"],
            "Return to top": "返回顶部",
            // [/(\d+) comments?/, "$1 条评论"],
            // [/(\d+) replies?/, "$1 条回复"],
            // [/(\d+) suggested answer/, "$1 个建议答案"],

            "Answered by": "答复者：",
            "View full answer": "查看完整答案",
            "Oldest": "最早",
            "Newest": "最新",
            "Top": "置顶",
            "Comment options": "评论选项",


            "Events": "活动",
            "Marked": "标记为",
            "an": "一个",
            "Marked then unmarked an answer": "标记后，又取消标记",
            "Marked as answer": "标记为答案",
            "Answer selected by": "被标记答案由",

            "This comment was marked as off-topic.": "这条评论被标记为离题。",
            "Show comment": "显示评论",
            "Hide comment": "隐藏评论",

            "Remember, contributions to this repository should follow its": "请记住，对该仓库的贡献应遵循",
            "Remember, contributions to this repository should follow our": "请记住，对该仓库的贡献应遵循我们的",
            "code of conduct": "行为准则",

            // 右侧栏
            // /([\d,]+) participants?/, "$1 位参与者"
            "and others": "和其它",

            "Change category": "更改类别",
            "Converted from issue": "由议题转化而来",

            "Notifications": "通知类型",
                "Subscribe": "订阅",
                "Unsubscribe": "退订",
                "You’re not receiving notifications from this thread.": "您没有收到来自该话题的通知。",
                "You’re receiving notifications because you’re watching this repository.": "您收到通知是因为您正在关注此仓库。",
                "You’re receiving notifications because you authored the thread.": "您收到通知是因为您提出了该话题。",
                "You’re receiving notifications because you’re subscribed to this thread.": "您收到通知是因为您订阅了该话题。",
                "You’re receiving notifications because you were mentioned.": "您收到通知是因为有人 @您。",
                "You’re receiving notifications because you commented.": "您收到通知是因为您发表了评论。",
                "You’re receiving notifications because you are watching pull requests on this repository.": "您收到通知是因为您正在关注此仓库上的拉取请求。",
                "You’re receiving notifications because you are watching issues on this repository.": "您收到通知是因为您正在关注此仓库上的议题。",
                "You’re receiving notifications because you modified the open/close state.": "您收到通知是因为您修改了打开/关闭状态。",
                "You’re ignoring this repository.": "您忽略了这个仓库。",

            // 锁定对话
            "Lock conversation": "锁定对话",
                "Are you sure you want to lock conversation on this discussion?": "您确定要锁定此讨论的对话吗？",
                "Other users": "其他用户",
                "can’t add new comments": "无法添加新评论",
                "to this discussion.": "到该讨论。",
                "You and other collaborators": "您和其他合作者",
                "with access": "具有访问权限",
                "to this repository": "该仓库",
                "can still leave comments": "仍然可以留下评论",
                "that others can see.": "，其他人可以看到。",
                "You can always unlock this discussion again in the future.": "您今后仍可以随时再次解锁此讨论。 ",
                "This conversation has been locked and limited to collaborators.": "此对话已锁定，仅合作者可评论。",
            "Unlock conversation": "解锁对话",
                "Are you sure you want to unlock conversation on this discussion?": "您确定要解锁此讨论的对话吗？",
                "Everyone": "任何人",
                "will be able to comment on this discussion once more.": "将能够再次对这个讨论发表评论。",
                "You can always lock this discussion again in the future.": "您今后仍可以随时再次锁定此讨论。",
            "Transfer this discussion": "转移讨论",
                // 转移议题 对话框
                "Move this discussion to another repository you own.": "将此讨论移至您拥有的另一个仓库。",
                "Search repositories": "搜索仓库",
                "There aren't any eligible repositories that match your query.": "没有任何符合条件的仓库与您的查询匹配。",
                "Transfer discussion": "转移讨论",
            "Pin discussion": "置顶讨论",
                "You can pin up to 4 discussions. They will appear publicly at the top of the discussions page.": "您最多可以置顶 4 个讨论。它们将公开显示在讨论页面的顶部。",
                "Configure pinned discussion": "设置置顶讨论",
                    "Background": "背景色",
                    "Pattern": "图案",
                "Pinning discussion…": "置顶讨论…",
            "Edit pinned discussion": "编辑置顶讨论",
            "Unpin discussion": "取消置顶讨论",
                "Are you sure you want to unpin this discussion?": "您确定要取消置顶讨论吗？",
                "The discussion itself won't be deleted, it just won't be shown prominently above the list of discussions.": "讨论本身不会被删除，只是不会突出显示在讨论列表上方。",
                // 顶部提醒
                // [/Discussion \"([^ ]+)\" has been unpinned./, "讨论 “$1” 已取消置顶。"],
            "Pin discussion to Announcements": "将讨论置顶到 “公告”",
                "Pin this discussion to this category": "将此讨论置顶到此类别",
                    "This will pin this discussion to the top of the Announcements category.": "这将此讨论置顶到 “公告” 类别顶部。",
                    "Pin to Announcements": "置顶到 “公告”",
            "Pin discussion to General": "将讨论置顶到 “通常”",
                    "This will pin this discussion to the top of the General category.": "这将此讨论置顶到 “通常” 类别顶部。",
                    "Pin to General": "置顶到 “通常”",
            "Pin discussion to Ideas": "将讨论置顶到 “想法”",
                    "This will pin this discussion to the top of the Ideas category.": "这将此讨论置顶到 “想法” 类别顶部。",
                    "Pin to Ideas": "置顶到 “想法”",
            "Pin discussion to Polls": "将讨论置顶到 “投票”",
                    "This will pin this discussion to the top of the Polls category.": "这将此讨论置顶到 “投票” 类别顶部。",
                    "Pin to Polls": "置顶到 “投票”",
            "Pin discussion to Q&A": "将讨论置顶到 “问与答”",
                    "This will pin this discussion to the top of the Q&A category.": "这将此讨论置顶到 “问与答” 类别顶部。",
                    "Pin to Q&A": "置顶到 “问与答”",
            "Pin discussion to Show and tell": "将讨论置顶到 “展示与讲述”",
                    "This will pin this discussion to the top of the Show and tell category.": "这将此讨论置顶到 “展示与讲述” 类别顶部。",
                    "Pin to Show and tell": "置顶到 “展示与讲述”",
            "Create issue from discussion": "从讨论中创建议题",
            "Delete discussion": "删除讨论",
                "Delete discussion?": "删除讨论？",
                "The discussion will be deleted permanently. You will not be able to restore the discussion or its comments.": "该讨论将被永久删除。您将无法恢复该讨论或其评论。",
                "Deleting discussion…": "正在删除讨论...",
                // 顶部提醒
                "The discussion was successfully deleted.": "该讨论已成功删除。",

            "The original post will be copied into a new issue, and the discussion will remain active.": "原帖将被复制到一个新的议题中，讨论将保持活跃。",
            "OK, got it!": "好的，我知道了！",

            "Convert issues": "转换为议题",
            // [/Convert (\d+) issues? to discussions?/, "将 $1 个议题转换为讨论"], // 标签页面
            // [/Are you sure you want to convert (\d+) issues? with the following label to discussions?/, "您确定要将带有以下标签的 2 个议题转换为讨论吗？"], // 标签页面
            // "What happens when an issue is converted into a discussion:": "将议题转化为讨论时，会发生什么：",
            "Issue will be locked": "议题将被锁定",
            // "Title, description, and author will be the same as the issue": "标题、描述和作者将与议题相同",
            "Existing links will redirect to the new discussion": "现有链接将重定向到新讨论",
            // "All comments and reactions will be the same as the issue": "所有评论和反应将与议题相同",
            "Discussions do not have milestones": "讨论没有里程碑",
            "Discussions cannot be added to projects": "讨论不能被添加到项目中",
            "Discussions do not have assignees": "讨论没有受理人",
            "You must choose a category for the discussion to belong to. You will be able to change this after the conversion is complete.": "您必须为讨论选择一个所属的类别。在转换完成后，您将能够更改此设置。",
            "Choose a category": "选择类别",
            "Future issues with this label will not be automatically converted into discussions.": "今后带有此标签的议题并不会自动转化为讨论。",
            "I understand, convert these issues to discussions.": "我明白了，依然把这些议题转化为讨论。",

            // 顶部提醒
            // [/Open issues with label \'([^ ]+)\' are being converted to discussions./, "带有 “$1” 标签的打开议题正在被转换为讨论。"], // 标签页面

        // /<user-name>/community/discussions
            // [/This is a ✨special✨ repository containing the organization level discussions for ([^ ]+). Everything posted here will also be visible at the organization level./, "这是一个 ✨ 特别的 ✨ 仓库，包含 $1 的组织层面的讨论。这里发布的所有内容在组织层面上也是可见的。"],
            "View organization discussions": "查看组织讨论",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) categories?/, "$1 个分类"],
        [/Congratulations, you've created the first discussion in ([^ ]+)!/, "恭喜您，您已经在 $1 中创建了第一个讨论!"],
        [/(\d+) answers?/, "$1 位答复者"],
        [/(\d+) comments?/, "$1 条评论"],
        [/(\d+) repl(y|ies)?/, "$1 条回复"],
        [/(\d+) suggested answers?/, "$1 个建议答案"],
        [/(\d+) participants?/, "$1 位参与者"],
        [/Discussion \"([^ ]+)\" has been unpinned./, "讨论 “$1” 已取消置顶。"],
        [/Convert (\d+) issues? to discussions?/, "将 $1 个议题转换为讨论"], // 标签页面
        [/Are you sure you want to convert (\d+) issues? with the following label to discussions?/, "您确定要将带有以下标签的 2 个议题转换为讨论吗？"], // 标签页面
        [/Open issues with label \'([^ ]+)\' are being converted to discussions./, "带有 “$1” 标签的打开议题正在被转换为讨论。"], // 标签页面
        [/Edited (\d+) times?/,"编辑 $1 次"], //评论框编辑次数
        [/edited by ([^ ]+)/,"被 $1 编辑"], //评论框 被他人编辑
        [/This is a ✨special✨ repository containing the organization level discussions for ([^ ]+). Everything posted here will also be visible at the organization level./, "这是一个 ✨ 特别的 ✨ 仓库，包含 $1 的组织层面的讨论。这里发布的所有内容在组织层面上也是可见的。"],
        [/Category \"(.*)\" has been created./, "分类 “$1” 已创建。"],
        [/Category \"(.*)\" has been updated./, "分类 “$1” 已更新。"],
        [/Category \"(.*)\" has been deleted./, "分类 “$1” 已删除。"],
        [/Section \"(.*)\" has been created./, "栏目 “$1” 已创建。"],
        [/Section \"(.*)\" has been updated./, "栏目 “$1” 已更新。"],
        [/Section \"(.*)\" has been deleted./, "栏目 “$1” 已删除。"],
        [/Delete (.*) category/, "删除分类 “$1”"],
        [/Edit (.*) category/, "编辑 “$1” 分类"],
        [/Edit section (.*)/, "编辑栏目 “$1”"],
        [/Delete section (.*)/, "删除栏目 “$1”"],
        [/Delete (.*) section/, "删除 “$1” 栏目"],
    ],
};
I18N.zh["repository/orgs/discussions"] = I18N.zh["repository/discussions"] ;

I18N.zh["repository/actions"] = { // 仓库 - 操作页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 新建操作 /<user-name>/<repo-name>/actions/new
            "Get started with GitHub Actions": "开始使用 GitHub Actions",
            "Choose a workflow": "选择一个工作流程",
            "Build, test, and deploy your code. Make code reviews, branch management, and issue triaging work the way you want. Select a workflow to get started.": "构建、测试和部署您的代码。以您想要的方式进行代码审查、分支管理和议题分类。选择一个工作流以开始使用。",
            "Skip this and": "跳过并",
            "set up a workflow yourself": "建立工作流程",
            "Search workflows": "搜索工作流",

            "Suggested for this repository": "建议该仓库采用",
            "Configure": "设置",
            "Deployment": "部署",
            "Continuous integration": "持续集成",
            "Automation": "自动化",
            "Browse all categories": "浏览所有类别",
                "Code scanning": "代码扫描",
            "View all": "查看全部",

            "Learn more about GitHub Actions": "了解更多关于 GitHub Actions 的信息",
            "Getting started and core concepts": "入门和核心概念",
            "New to Actions? Start here. Learn the core concepts and how to get started.": "初次接触 Actions？从这里开始。了解核心概念和如何开始。",
            "Configuring and managing workflows": "配置和管理工作流程",
            "Create custom workflows to control your project's life cycle processes.": "创建自定义工作流程以控制项目的生命周期过程。",
            "Language and framework guides": "语言与框架指南",
            "Guides for projects written in many programming languages.": "项目指南由多种编程语言编写。",

            "Didn't find what you're looking for?": "没有找到您需要的？",
            "Fill out a 2-minute survey to request a new workflow template for GitHub Actions." :"填写一份 2 分钟的调查，为 GitHub Actions 申请一个新的工作流模板。",
            "Request": "申请",

        // 新建操作 /<user-name>/<repo-name>/actions/new?category=xxxx
            // [/Found (\d+) workflows?/, "发现 $1 个工作流程"],

        // 操作 /<user-name>/<repo-name>/actions
            // 快捷键
                "Go to usage": "跳转到运用",
                "Go to workflow file": "跳转到工作流程文件", // /actions/runs/<id>
                "Toggle timestamps in logs": "切换日志中的时间戳",
                "Toggle fullscreen logs": "切换全屏日志",
                "Exit fullscreen logs": "退出全屏日志",
                "Actions main view search bar": "操作主视图搜索栏",

            "Automate your workflow from idea to production": "从创意到产品，使您的工作流程自动化",
            "GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub.": "GitHub Actions 现在可以使用世界一流的 CI/CD 轻松自动化所有软件工作流程。直接从 GitHub 构建、测试和部署您的代码。",
            "Linux, macOS, Windows, ARM, and containers": "Linux、macOS、Windows、ARM 和容器",
            "Hosted runners for every major OS make it easy to build and test all your projects. Run directly on a VM or inside a container. Use your own VMs, in the cloud or on-prem, with self-hosted runners.": "为每一个主要的操作系统提供的托管运行程序，使您能够轻松地构建和测试您的所有项目。直接在虚拟机上或容器内运行。在云端或本地使用您自己的虚拟机，以及自托管的运行器。",

            "Matrix builds": "矩阵式构建",
            "Save time with matrix workflows that simultaneously test across multiple operating systems and versions of your runtime.": "使用矩阵工作流程可同时跨多个操作系统和版本运行，节省时间",

            "Any language": "任何语言",
            "GitHub Actions supports Node.js, Python, Java, Ruby, PHP, Go, Rust, .NET, and more. Build, test, and deploy applications in your language of choice.": "GitHub Actions 支持 Node.js、Python、Java、Ruby、PHP、Go、Rust、.NET 等。以您选择的语言构建、测试和部署应用。",

            "Live logs": "实时日志",
            "See your workflow run in realtime with color and emoji. It’s one click to copy a link that highlights a specific line number to share a CI/CD failure.": "使用颜色和表情符号实时查看您的工作流程。只需单击即可复制突出显示特定行号的链接以共享 CI/CD 故障。",

            "Built-in secret store": "内置的秘密存储",
            "Automate your software development practices with workflow files embracing the Git flow by codifying it in your repository.": "通过将工作流程文件编码到您的仓库，您的软件开发实践，包括 Git 流程自动化。",

            "Multi-container testing": "多容器测试",
            "Test your web service and its DB in your workflow by simply adding some": "在您的工作流程中测试您的网络服务和它的数据库，只需添加一些",
            "docker-compose": "docker-组合",
            "to your workflow file.": "到您的工作流程文件。",


            // 左侧栏
            "Workflows": "工作流程",
            "New workflow": "新建工作流程",
            "Select workflow": "选择工作流程",
            "Show more workflows...": "显示更多工作流程...",
            "Management": "管理",
            "Caches": "缓存",
            "Deployments": "部署",

            "Help us improve GitHub Actions": "帮助我们改进 GitHub Actions",
            "Tell us how to make GitHub Actions work better for you with three quick questions.": "通过三个快速问题告诉我们如何让 GitHub Actions 更好地为您服务。",

            "All workflows": "全部工作流程",
            "Showing runs from all workflows": "显示所有工作流程的运行情况",

            //筛选条
            "Filter workflow runs": "筛选工作流程",
                "Narrow your search": "缩小搜索范围",

            // [/(\d+) workflow runs?$/, "$1 个工作流程运行"],
            // [/(\d+) workflow runs results/, "$1 个工作流程运行结果"],
            "Event": "事件",
                "Filter by event": "按事件筛选",
                "Find an event": "查找事件",
                "push": "推送",
                "pull_request": "拉取请求",
                "pull_request_target": "拉取请求目标",
                "schedule": "日程",
                "watch": "关注",
                "workflow_dispatch": "工作流程调度",
                "dynamic": "动态",
            // 状态
                "Filter by status": "按状态筛选",
                "Find a status": "查找状态",
                "queued": "排队",
                "in progress": "正在进行中",
                "waiting": "等待中",
                "completed": "已完成",
                "neutral": "中立",
                "success": "成功",
                "failure": "失败",
                "cancelled": "已取消",
                "action required": "需要采取行动",
                "timed out": "已超时",
                "skipped": "跳过",
                "stale": "陈旧",
            "Branch": "分支",
                "Filter by branch": "按分支筛选",
                "Find a branch": "查找分支",
            "Actor": "角色",
                "Filter by actor": "按角色筛选",
                "Find a user": "查找用户",

            // 日志 右侧按钮
            "Cancel run": "取消运行",
            "Delete workflow run": "删除工作流程运行",
                // 删除工作流程运行 对话框
                    "Are you sure you want to permanently delete this workflow run?": "您确定要永久删除此工作流程运行吗？",
                    "This action cannot be undone": "此操作无法撤消",
                    "Yes, permanently delete this workflow run": "是，永久删除此工作流程运行",
                // 顶部提醒
                    "Workflow run deleted successfully.": "工作流程运行删除成功。",

            // 筛选结果
            "all workflow runs": "所有工作流程运行",
            "or try different filters.": "或尝试不同的筛选器。",

            // 列表区域
                // 工作流程运行状态
                "In progress": "进行中",
                "Queued": "排队中",
                "Pending": "待定中",

            // 顶部提醒
                "You have successfully requested the workflow to be canceled.": "您已成功请求取消工作流。",

        // /actions/caches
            "Showing caches from all workflows.": "显示所有工作流程的缓存。",
            "Learn more about managing caches.": "了解更多关于管理缓存的信息。",
            "Filter caches": "筛选缓存",

            // [/(\d+) caches?/, "$1 个缓存"],
            "Sort": "排序",
            "Sort by": "排序方式",
                // 排序下拉菜单
                "Recently used": "最近使用",
                "Least recently used": "最近最少使用",
                "Newest": "最新",
                "Oldest": "最早",
                "Largest size": "最大尺寸",
                "Smallest size": "最小尺寸",
            "No caches": "尚无缓存",
            "Nothing has been cached by actions running in this repository.": "在此仓库中运行的操作未缓存任何内容。",
            "Learn more about caching": "了解更多关于缓存的信息",
            "dependencies and build outputs to improve workflow execution time.": "依赖关系和构建输出以缩短工作流执行时间。",
            "Last used": "最近使用",

            // [/(\d+) cache results?/, "$1 个缓存结果"],
            "No caches matched your search": "没有与您的搜索相匹配的缓存",
            // [/No caches matched your search branch:([^ ]+)/, "没有与您搜索的分支: $1 相匹配的缓存"],
            "Remove the filters": "删除筛选器",
            "or try a different search query.": "或尝试不同的搜索查询。",

            "Remove cache": "删除缓存",
                "Are you sure you want to delete this cache?": "您确定要删除此缓存吗？",
                "Yes, permanently delete this cache": "是的，永久删除此缓存",

                "Deleting Cache...": "删除缓存中...",
                // 顶部提醒
                "Cache deleted successfully.": "缓存已成功删除。",

        // /<user-name>/<repo-name>/actions/workflows/<file>.yml
            "This workflow has a": "这个工作流程有一个",
            "event trigger.": "事件触发器。",

            "Run workflow": "运行工作流程",
                "Use workflow from": "使用工作流程来自：",
                "Branch:": "分支：",
                "Select branch": "选择分支",
                "Select ref": "选择引用",
                "Select a tag": "选择标签",
                    "Nothing to show": "暂无",

                    "Workflow does not exist or does not have a": "工作流程不存在或没有",
                    "trigger in this branch.": "触发在此分支。",
                    "Learn more about manual workflows": "了解更多关于手工工作流程的信息",
                // 顶部提醒
                "Workflow run was successfully requested.": "工作流程已成功请求运行。",

            "This scheduled workflow is disabled because there hasn't been activity in this repository for at least 60 days.": "此计划工作流程已禁用，因为此仓库至少 60 天没有活动。",
            "Enable workflow": "启用工作流程",
                // 顶部提醒
                "Workflow enabled successfully.": "工作流程已成功启用。",
            "Disable workflow": "禁用工作流程",
                // 提醒
                "This workflow was disabled manually.": "工作流程已被手动禁用。",
                // 顶部提醒
                "Workflow disabled successfully.": "工作流程已成功禁用。",
            "Re-run jobs": "重新运行作业",

            "This workflow has no runs yet.": "此工作流程尚未运行。",

            "No results matched your search.": "没有与您的搜索匹配的结果。",
            "You could search": "您可以搜索",

        // /<user-name>/<repo-name>/actions/runs/<id>

            // 标题
            "Re-run all jobs": "重新运行所有作业",
            "Cancel workflow": "取消工作流程",
            //右侧按钮
            "View workflow file": "查看工作流程文件",
            "View workflow runs": "查看工作流程运行",
            "Create status badge": "创建状态徽章",
                "Copy status badge Markdown": "复制状态徽章 Markdown 代码",
            "Delete all logs": "删除所有日志",

            // 左侧栏
            "Summary": "摘要",
            "Jobs": "作业",
            "Run details": "运行详情",
            "Usage": "运用",

            //状态条
            "Triggered via pull request": "通过拉取请求触发",
            "Triggered via issues": "通过议题触发",
            "Triggered via push": "通过推送触发",
            "Triggered via schedule": "通过计划表触发",
            "Triggered via dynamic": "通过动态触发",
            "Triggered via GitHub Pages": "通过 GitHub 页面触发",
            "Manually triggered": "手动触发",

            // 状态
                "Success": "成功",
                "Failure": "失败",
                "Cancelled": "取消",
            "Total duration": "总时长",
            "Billable time": "计费时间",

            // 右侧中间栏
                "This workflow graph cannot be shown": "无法显示此工作流图表",
                "A graph will be generated the next time this workflow is run.": "下次运行此工作流时将生成一个图表。",

                "This run and associated checks have been archived and are scheduled for deletion.": "此运行和相关检查已存档并计划删除。",
                "Learn more about checks retention": "了解更多关于检查保留的信息",

            "Artifacts": "附件",
                "Produced during runtime": "在运行期间生成",
                "Name": "名称",
                "Size": "大小",
                // [/Delete artifact ([^ ]+)/, "删除附件 $1"],
                "Expired": "已过期",
                    "This artifact has expired and you can no longer download it": "此附件已过期，您无法再下载",
            "Annotations": "说明",
                // [/1 error/, "$1 个错误"],
                "Show more": "显示更多",

        // /<user-name>/<repo-name>/actions/runs/<id>/jobs/<id2>

        // /<user-name>/<repo-name>/actions/runs/<id>/usage
            "Run and billable time": "运行和计费时间",
            "Learn about OS pricing on GitHub Actions": "了解 GitHub Actions 上的操作系统定价",
            "Job": "工作",
            "Run time": "运行时间",
            "Billable": "计费",
            "time": "时间",

        // /<user-name>/<repo-name>/actions/runs/<id>/workflow
            "Workflow file": "工作流程文件",
            "Workflow file for this run": "本次运行的工作流程文件",

        // /<user-name>/<repo-name>/runs/<id>
            "The logs for this run have expired and are no longer available.": "此运行日志已过期，不再可用。",

            "Search logs": "搜索日志",
            // 设置按钮
                "Show timestamps": "显示时间戳",
                "Show full screen (Shift+F)": "全屏显示（Shift+F）",
                "Download log archive": "下载日志存档",
                "View raw logs": "查看原始日志",

            "Try broadening your search filters.": "尝试扩大您的搜索筛选器。",

            // GitHub Pages
                "GitHub Pages / Page Build": "GitHub Pages / 页面构建",
                "Page Build": "页面构建",
                "succeeded": "成功于",
                "GitHub Pages successfully built your site.": "GitHub Pages 成功构建了您的站点。",
                "Your website is ready at": "您的网站已准备就绪，网址为",
                "View more details on GitHub Pages": "在 GitHub Pages 查看更多细节",

                //顶部提醒
                    "You have successfully requested checks from GitHub Pages.": "您已成功请求来自 GitHub Pages 的检查。",

            "Re-run all checks": "重新运行所有检查",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Found (\d+) workflows?/, "发现 $1 个工作流程"],
        [/(\d+) workflow runs?$/, "$1 个工作流程运行"],
        [/(\d+) workflow runs? results?/, "$1 个工作流程运行结果"],
        [/Delete artifact ([^ ]+)/, "删除附件 $1"],
        [/(\d+) errors?/, "$1 个错误"],
        [/(\d+) cache results?/, "$1 个缓存结果"],
        [/(\d+) caches?/, "$1 个缓存"],
        [/No caches matched your search branch:([^ ]+)/, "没有与您搜索的分支: $1 相匹配的缓存"],
    ],
};
I18N.zh["repository/runs"] = I18N.zh["repository/actions"];

I18N.zh["repository/deployments"] = { // 仓库 - 部署页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // /<user-name>/<repo-name>/deployments
            // [/Deployed to ([^ ]+)/, "部署到 $1"],
            "was deployed by": "部署者",
            "Deployment history": "部署历史",
            "Try the new deployments view": "尝试新的部署视图",
            "Show:": "显示：",
                "All environments": "所有环境",
            "Loading information…": "载入信息…",
            "at": "在",
            "Deployed": "部署",
            "Deployed by": "部署者",
            "Active": "活跃",
            "Inactive": "不活跃",
            "Abandoned": "废弃",
            "View deployment": "查看部署情况",

            "View full deployment history": "查看完整的部署历史",

            // 测试版部署
                "Environments": "环境",
                "Manage environments": "管理环境",
                "Give beta feedback": "提供测试反馈",
                "Opt out of beta view": "选择退出测试版视图",
                "Active deployments": "活跃的的部署",
                "From select environments": "来自选择的环境",
                "Last": "最后",
                "deployed": "部署于",
                "Latest deployments from": "最新部署来自",
                "all environments": "所有环境",
                "Latest": "最新",
                "View logs": "查看日志",
                "View workflow run": "查看工作流程运行",

                "Status: Deployed (completed).": "状态：已部署（已完成）",
                "Status: Failed to deploy (completed).": "状态：部署失败（已完成）",
                "No status available for": "无可用状态",

        // /<user-name>/<repo-name>/deployments/activity_log?environment=github-pages
            "Deployments": "部署",
            "/ History": "/ 历史",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Deployed to ([^ ]+)/, "部署到 $1"],
        [/(\d+) deployments?/, "$1 次部署"],
    ],
};

I18N.zh["repository/watchers"] = { // 仓库 - 关注者页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 关注者页面  /<user-name>/<repo-name>/watchers
            "Watchers": "关注者",
            "No one’s watching this repository yet. You could be the first.": "暂无关注者。您可以成为第一个",
            "Learn more about how watching repositories works on GitHub": "了解更多关于如何在 GitHub 上关注仓库的工作方式",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        // [/Joined/,"加入于"], // 追星者，关注者页面
    ],
};

I18N.zh["repository/stargazers"] = { // 仓库 - 追星者页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 追星者页面  /<user-name>/<repo-name>/stargazers
            "Stargazers": "追星者",
            "All": "全部",
            "You know": "您关注的",
            "Be the first to star this repository.": "成为第一个为这个仓库加星标的人。",
            "about how starring works on GitHub.": "关于如何在 GitHub 上加注星标。",
            "Be the first of your friends to star this repository.": "成为第一个为这个仓库加星标的朋友。",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        // [/Joined/,"加入于"], // 追星者，关注者页面
    ],
};

I18N.zh["repository/new"] = { // 仓库 - 新建/编辑/上传/删除文件页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 新建文件页面 /<user-name>/<repo-name>/new/<branch>
            // 组织仓库 编辑文件页面
            "You’re making changes in a project you don’t have write access to. We’ve": "您正在对没有写入权限的项目进行更改。我们已经",
            "created a fork of this project": "为该项目创建复刻",
            "for you to commit your proposed changes to. Submitting a change will write it to a new branch in your fork, so you can send a pull request.": "供您提交建议的更改。提交更改会将其写入复刻中的新分支，这样您就可以发送拉取请求。",

            "Name your file...": "文件名...",
            "in": "在",
            "Cancel changes": "取消更改",

            "Edit new file": "编辑新文件",
            "Preview changes": "预览更改",
            "loading preview…": "载入预览…",
            "Loading preview…": "载入预览…",
            "Unable to load this preview, sorry.": "抱歉，无法加载此预览。",
            "There are no changes to show.": "没有要显示的更改。",
            "But you can preview the whole file.": "但您可以预览整个文件。", // new code view

            // 代码编辑框
            "Indent mode": "缩进模式",
            "Spaces": "空格",
            "Tabs": "Tab",
            "Indent size": "缩进大小",
            "Line wrap mode": "换行模式",
            "No wrap": "不换行",
            "Soft wrap": "软换行",

            "Commit new file": "提交新文件", //  自有仓库
            "Propose new file": "提议新文件", //  他人仓库
            "Sign off and commit new file": "签署并提交新文件",
            // 提交框
                "Add an optional extended description…": "添加描述... (可选)",

                "You are": "您将",
                "signing off": "签署",
                // [/on this commit as/,"该提交以"],

                "You can’t commit to": "您不能提交到",
                "because its is a": "，因为它是一个",
                "protected branch": "受保护分支",

                "Commit directly to the": "提交到",
                "branch.": "分支。",

                "Some rules will be bypassed by committing directly": "直接提交可以绕过一些规则",

                "Create a": "创建",
                "new branch": "新分支",
                "for this commit and start a pull request.": "为这个提交，并且发起一个拉取请求。",
                "Learn more about pull requests.": "了解更多关于拉取请求的信息。",

            "Something went wrong. Please fork the project, then try from your fork.": "出错了。请复刻该项目，然后从您的复刻处尝试。",

            // 顶部提醒
            // [/Your license is ready. Please review it below and either commit it to the ([^ ]+) branch or to a new branch./, "您的许可证已准备就绪。请在下面审查它并将其提交到 $1 分支或新分支。"],

        // 编辑文件页面 /<user-name>/<repo-name>/edit/<branch>/<file>
            // 非本人仓库
                "You need to fork this repository to propose changes.": "您需要复刻此仓库以提出更改。",
                "Sorry, you’re not able to edit this repository directly—you need to fork it and propose your changes from there instead.": "抱歉，您无法直接编辑此仓库——您需要将其复刻并从那里提出您的更改。",
                "Fork this repository": "复刻此仓库",
                "Learn more about forks": "了解更多关于复刻的信息",
                "You’re making changes in a project you don’t have write access to. Submitting a change will write it to a new branch in your fork": "您正在对没有写入权限的项目进行更改。提交更改会将其写入您的复刻",
                ", so you can send a pull request.": " 中的新分支，这样您就可以发送拉取请求。",

            // 与用户名同名仓库 编辑 README.md 文件
                "is a special repository: its": "是一个特殊的仓库：它的",
                "will appear on your profile!": "将出现在您的个人资料中！",

                "New": "新",
                "is now a special repository: its": "现在是一个特殊的仓库：它的",

            // 组织下.github 仓库 编辑 /profile/README.md 文件
                "is a special repository: this": "是一个特殊的仓库：这个",
                "will appear on your organization's profile!": "将出现在您的组织资料中!",

            // 编辑 .gitignore 文件
                "Want to use a": "想使用",
                "template?": "模板吗？",
                "Filter ignores…": "筛选忽略…",
                "Filter ignores...": "筛选忽略...", // new code view
                "Choose .gitignore:": "选择 .gitignore：",
                "none": "无",

            // 编辑 工作流程文件 .github/workflows/xxxx.yml
                "Start commit": "开始提交",

                "Search Marketplace for Actions": "搜索 Actions 市场",
                "Featured Actions": "特色 Actions",
                "Featured categories": "特色分类",
                    "Code quality": "代码质量",
                    "Monitoring": "监控",
                    "Continuous integration": "持续集成",
                    "Project management": "项目管理",
                    "Deployment": "部署",
                    "Project management": "项目管理",
                    "Testing": "测试",
                "Browse all actions on the GitHub Marketplace": "浏览 GitHub 市场 上的所有 Actions",

                "Use": "使用",
                "Space": "空格",
                "to trigger autocomplete in most situations.": "在大多数情况下将触发自动完成。",
                "Documentation": "文档",

            // 编辑 LICENSE 许可证文件
                "Choose a license template": "选择一个许可证模板",

            // 快捷键
            "Code editor": "代码编辑器",
            // "Preview changes": "预览更改",
            "Toggle line comment": "切换行评论",

            "Edit file": "编辑文件",
            "Preview": "预览",
            "Show diff": "显示差异",
            "Show Diff": "显示差异", // new code view

            "Commit changes": "提交更改", //  自有仓库
            "Commit changes...": "提交更改...", //  自有仓库 // new code view
                "Saving...": "保存中...",
            "Propose changes": "提议更改", //  他人仓库
            "Sign off and commit changes": "签署并提交更改",
            "You have unsaved changes. Do you want to discard them?": "您有未保存的更改。您想丢弃它们吗？",

            // 提交更改 对话框
                "Commit message": "提交信息",
                "Extended description": "扩展描述",
                "Add an optional extended description..": "添加可选的扩展描述..",

                "branch": "分支",
                "for this commit and start a pull request": "为此提交并创建拉取请求",
                "Learn more about pull requests": "了解更多关于拉取请求的信息",

            // 查找工具栏
                "Find": "查找",
                "next": "下一处",
                "previous": "上一处",
                "all": "全部",
                "match case": "区分大小写",
                "regexp": "正则",
                "by word": "全字匹配",
                "Replace": "替换",
                "replace": "替换",
                "replace all": "全部替换",

            // 底部栏
                "to toggle the": "切换",
                "key moving focus. Alternatively, use": "键移动对焦。或者使用",
                "then": "键，然后",
                "to move to the next interactive element on the page.": "键移动到页面上的下一个交互元素。",

        // 删除文件页面 /<user-name>/<repo-name>/delete/<branch>/<file>
            // 顶部提醒
            "File successfully deleted.": "文件已成功删除。",

        // 上传文件页面 /<user-name>/<repo-name>/upload/<branch>
            // 自有仓库
                "Drag files here to add them to your repository": "拖拽文件添加到当前仓库",
                "Drag additional files here to add them to your repository": "拖拽其他文件添加到当前仓库",
                "Or": "或",
                "choose your files": "选择文件",
                "Drop to upload your files": "拖拽上传您的文件",
                // 处理反馈
                "Yowza, that’s a big file. Try again with a file smaller than 25MB.": "我勒个擦，这么大的文件，单文件不得超过25MB",
                "Yowza, that’s a lot of files. Try again with fewer than 100 files.": "我勒个擦，这么多文件，一次不能超过100个",
                "This file is": "这个文件是",
                "empty": "空的",
                "Something went really wrong, and we can’t process that file.": "遇到错误，我们无法处理这个文件。",

                // 文件上传进度条
                "Uploading": "文件上传中",
                // [/1 of 1 files/, ""],

                // "Commit changes": "提交更改",
                // 提交框 补充
                    "Add files via upload": "通过上传添加文件",
                    "Add an optional extended description…": "添加可选的扩展描述...",

            // 他人仓库
                "Uploads are disabled.": "上传功能已禁用。",
                "File uploads require push access to this repository.": "文件上传需要推送访问此仓库。",

        // new code view
            "Top": "顶部",
            "Jump to file": "跳转到文件",

            // 切换分支/标签 下拉菜单
                "Switch branches/tags": "切换分支/标签",
                "Find or create a branch...": "查找或创建分支...",
                "default": "默认",
                "View all": "查看全部",
                "branches": "分支",
                "Find a tag...": "查找标签...",
                "Nothing to show": "暂无",
                "tags": "标签",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/on this commit as/,"该提交以"],
        [/Your license is ready. Please review it below and either commit it to the ([^ ]+) branch or to a new branch./, "您的许可证已准备就绪。请在下面审查它并将其提交到 $1 分支或新分支。"],
    ],
};
I18N.zh["repository/edit"] = I18N.zh["repository/new"];
I18N.zh["repository/delete"] = I18N.zh["repository/new"];
I18N.zh["repository/upload"] = I18N.zh["repository/new"];

I18N.zh["repository/find"] = { //  仓库 - 查找文件页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // Find file 页面 /<user-name>/<repo-name>/find/<branch>
            "You’ve activated the": "您已激活",
            "file finder": "文件搜索模式",
            ". Start typing to filter the file list. Use": "。输入关键词查找您的文件。使用",
            "and": "和",
            "to navigate,": "选择文件",
            "to view files,": "查看文件",
            "to exit.": "返回。",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/wiki"] = { // 仓库 - wiki 页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // wiki 页面  /<user-name>/<repo-name>/wiki
            // [/Welcome to the ([^ ]+) wiki!/, "欢迎访问 $1 的 Wiki"], // wiki页面
            "Wikis provide a place in your repository to lay out the roadmap of your project, show the current status, and document software better, together.": "Wiki 为您的仓库提供了一个更好的文档资料。",
            "Create the first page": "创建第一个页面",

            // [/edited this page/, "编辑此页"], // wiki
            // [/(\d+) revisions?/, "$1 次修订"], // wiki
            "New page": "新建页面",
            "Add a custom footer": "添加自定义页脚",

            // 右侧栏
            "Pages": "页面",
                "Find a page…": "搜索页面…",
            "Add a custom sidebar": "添加自定义侧边栏",
            "Clone this wiki locally": "在本地克隆这个 Wiki",

            "Last updated": "最后更新",

        // 新建 wiki 页面 /<user-name>/<repo-name>/wiki/_new
            "Create new page": "创建新页面",
            "Title": "标题",
            "Write": "编辑",
            "Preview": "预览",
            "Edit mode:": "编辑模式：",
            "Edit message": "提交信息",

            "Write a small message here explaining this change. (Optional)": "在这里写一条小消息，解释这一变化。(可选)",
            "Save page": "保存页面",
            // 顶部提醒
                "Your Wiki was created.": "您的 Wiki 已创建。",

        // 编辑 wiki 页面 /<user-name>/<repo-name>/wiki/<page name>/_edit
            // [/Editing/, "编辑"], //编辑 wiki
            "Page history": "页面历史",
            "Delete page": "删除页面",
                "Are you sure you want to delete this page?": "您确定要删除此页面吗？",

            "Someone has edited the wiki since you started. Please reload this page and re-apply your changes.": "自您开始以来，有人编辑了 wiki。请重新加载此页面并重新应用您的更改。",

            // 顶部提醒
                "The wiki page was successfully deleted.": "Wiki 页面已成功删除。",

        // wiki页面历史 /<user-name>/<repo-name>/wiki/<page name>/_history
            "Edit page": "编辑页面",
            "Revisions": "修订",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Welcome to the ([^ ]+) wiki!/, "欢迎访问 $1 的 Wiki"], // wiki页面
        [/edited this page/, "编辑此页"], // wiki
        [/(\d+) revisions?/, "$1 次修订"], // wiki
        [/Editing/, "编辑"], //编辑 wiki
        [/Could not find version "([^ ]+)"/, "找不到版本 “$1”"],
    ],
};

I18N.zh["repository/branches"] = { // 仓库 - 分支页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 分支页面 branches  /<user-name>/<repo-name>/branches
            // 标签卡栏
            "Overview": "概况",
            "Yours": "您的",
            "Active": "活跃的",
            "Stale": "陈旧的",
            "All branches": "所有分支",
            "All": "所有",
            "branches": "分支",
            "New branch": "新建分支",
                // 创建分支对话框
                "Branch source": "源分支",
                    "Choose from this fork or its upstream repository.": "从此复刻或其上游仓库中进行选择。",
                    "Choose a source branch": "选择一个源分支",
                "Share feedback": "分享反馈",


            "Search branches…": "搜索分支…",

            "Default branch": "默认分支",
            "Switch default branch": "切换默认分支",
            "View branch activity": "查看分支活动",
            "Default": "默认",

            // [/Your ([^ ]+) branch isn't protected/, "您的 $1 分支不受保护"],
            "Protect this branch from force pushing or deletion, or require status checks before merging.": "保护此分支不被强制推送或删除，或在合并之前要求状态检查。",
            "Dismiss": "驳回",
            "Protect this branch": "保护该分支",

            "Updated": "更新于",
            "New pull request": "发起拉取请求",

                // 重命名分支对话框
                "Rename default branch": "重命名默认分支", // 重命名默认分支 标题
                "Rename this branch": "重命名分支", // 重命名其他分支 标题
                "Rename": "重命名",
                "to:": "为：",
                "Most projects name the default branch": "大多数项目将默认分支名为",
                "Renaming this branch:": "重命名此分支：",
                    // 该分支存在来自其他分支的拉取请求时
                        "Will update": "将更新",
                        "pull request targeting this branch.": "条针对该分支的拉取请求。",
                        "branch protection rule that explicitly targets": "条分支保护规则明确针对",

                    // 该分支存在用于其他分支的拉取请求时
                        "Will close": "将关闭",
                        "open pull request for this branch.": "个该分支的拉取请求。",

                    // 重命名 GitHub Pages 所在分支
                        "Will unpublish current GitHub Pages site.": "将取消当前发布的 GitHub Pages 站点。",
                            "Your current GitHub Pages site will become unpublished. A new commit on the renamed branch will publish the GitHub Pages site again.": "您当前的 GitHub Pages 站点将被取消发布。重命名分支上的新提交将再次发布 GitHub Pages 站点。",

                    "Will not update your members' local environments.": "不会更新您成员的本地环境。",
                "Renaming this branch will not update your members' local environments.": "重命名此分支不会更新您成员的本地环境。",
                    "Your members will have to manually update their local environments. We'll let them know when they visit the repository, or you can share the following commands.": "您的成员将不得不手动更新他们的本地环境。我们会在他们访问仓库时通知他们，或者您可以共享以下命令。",

                "Rename branch": "重命名分支",
                "Saving…": "保存中…",

                // 删除分支后
                "Restore": "还原",
                "Deleted just now by": "刚刚被删除",

                // 删除对话框 仅当该分支存在拉取请求
                "The branch": "分支",
                // [/is associated with (\d+) open pull requests?:/, "与 $1 个拉取请求相关联："], // 分支页面
                "If you delete this branch, the pull request will be closed.": "如果您删除此分支，则拉取请求将被关闭。",
                "Are you sure you want to delete this branch?": "您确定要删除此分支吗？",

                // 顶部提醒
                // [/Branch ([^ ]+) will be renamed to ([^ ]+) shortly./,"分支 $1 将很快重命名为 $2。"], //分支重命名成功

            "Your branches": "您的分支",
            "You haven’t pushed any branches to this repository.": "您没有推送任何分支到该仓库。",
            "Active branches": "活跃的分支",
            "There aren’t any active branches.": "没有任何活跃的分支。",
            "Stale branches": "陈旧的分支",
            "There aren’t any stale branches.": "没有任何陈旧的分支。",
            "View more active branches": "查看更多活跃的分支",
            "View more stale branches": "查看更多陈旧的分支",

            // [/(\d+) commits? ahead, (\d+) commits? behind ([^ ]+)/, "领先 $1 个提交，落后 $2 个提交于 $3"],

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Your ([^ ]+) branch isn't protected/, "您的 $1 分支不受保护"],
        [/Rename default branch/, "重命名默认分支"],
        [/Rename branch/, "重命名分支"],
        [/Delete/, "删除分支"],
        [/is associated with (\d+) open pull requests?:/, "与 $1 个拉取请求相关联："],
        [/Branch ([^ ]+) will be renamed to ([^ ]+) shortly./,"分支 $1 将很快重命名为 $2。"], //分支重命名成功
        [/(\d+) commits? ahead, (\d+) commits? behind ([^ ]+)/, "领先 $1 个提交，落后 $2 个提交于 $3"],
        [/(\d+) commits? behind ([^ ]+)/, "落后 $1 个提交于 $2"],
        [/(\d+) commits? ahead ([^ ]+)/, "领先 $1 个提交于 $2"],
    ],
    "selector": [ // 元素筛选器规则
        ["a[data-target='branch-filter.allFilter']", "所有分支"],
    ],
};

I18N.zh["repository/releases"] = { // 仓库 - 发行版页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

            // 验证标记浮动信息
                "This commit was created on GitHub.com and signed with GitHub’s": "此提交是在 GitHub.com 上创建的，并使用 GitHub 的",
                "This commit was signed with the committer’s": "此提交已签署，使用提交者的",
                "This tag was signed with the committer’s": "此标签已签署，使用提交者的", // /<user-name>/<repo-name>/releases
                "verified signature": "已验证签名",
                "This commit is not signed, but one or more authors requires that any commit attributed to them is signed.": "此提交未签名，但一位或多位作者要求对归属于他们的任何提交进行签名。",
                "We had a problem verifying this signature. Please try again later.": "我们在验证此签名时遇到问题。请稍后再试。",

                "GPG key ID:": "GPG 密钥 ID：",
                "SSH Key Fingerprint:": "SSH 密钥指纹：",
                "Learn about vigilant mode": "了解警戒模式",

        // 发行版 页面 /<user-name>/<repo-name>/releases
            "Releases": "发行版",
            // 无发行版时
            "There aren’t any releases here": "没有任何发行版",
            "You can create a release to package software, along with release notes and links to binary files, for other people to use. Learn more about releases in": "您可以创建一个发行版来打包软件，以及发行说明和二进制文件链接，供其他人使用。了解更多关于发布的信息查看",
            "our docs": "文档",
            "Releases are powered by": "发行版是指通过对仓库中",
            "tagging specific points of history": "特定历史点",
            "in a repository. They’re great for marking release points like": "进行标记来发布。用于发布的版本号类似",
            "Create a new release": "创建发行版",

            // 有发行版时
            "Draft a new release": "起草发行版",
            "Find a release": "搜索发行版",
            // 左侧栏
            "Pre-release": "预发行版",
            "Latest": "最新发行版",
            "Draft": "草案",

            "Compare": "对比",
                "Choose a tag to compare": "选择一个标签进行比较",
                "Find a tag": "搜索标签",
                "View all tags": "查看全部标签",

            "Read more": "阅读更多内容",
            "Contributors": "贡献者",
            "Assets": "资源",
            // [/Show all (\d+) assets?/, "显示所有 $1 个资产？"],

            "Join discussion": "加入讨论",

        // 发行版 标签卡 /<user-name>/<repo-name>/tags
            "Create release": "创建发行版",
            "Edit release": "编辑发行版",

            "Toggle commit message": "显示/隐藏提交消息",

            "Notes": "说明",
            "Downloads": "下载",

            "Delete tag": "删除标签",
                // 删除标签 对话框
                    "Delete this tag?": "删除此标签？",
                    "This will delete the information for the tag": "这将删除标签信息",
                    "and cannot be undone.": "而且无法撤销。",
                    "Delete this tag": "删除此标签",

        // 某个发行版标签 /<user-name>/<repo-name>/releases/tag/<tag>
            // 不存在发行版时
            // "Create release": "创建发行版",
            "from tag": "来自该标签",
            // "Edit": "编辑",
            "release": "发行版",

            // "Read release notes": "阅读发布说明",
            // 状态词
            "released this": "发布于",
            "tagged this": "标记了",
            "drafted this": "起草了",

            // 删除标签对话框
            "Delete tag?": "删除标签？",
            "This will delete the information for this tag and cannot be undone.": "将删除该标签的所有信息，并且无法撤消。",
            "I understand, delete this tag": "我明白了，依然删除该标签",

            // 存在发行版时
            // 15 commits to master since this release

            "Delete release": "删除发行版",
            // 删除发行版对话框
            "Delete this release?": "删除该发行版？",
            // "This will delete the information for this release.": "这将会删除该发行版的信息。",
            // [/This will delete the information for the release ([^ ]+)./, "这将删除发行版 $1 的信息。"],
            "Delete this release": "删除发行版",

            // 顶部提醒框
            "Your tag was removed": "您的标签已删除",
            "Your release was removed": "您的发行版已删除",

        // 创建发行版 /releases/new 和 编辑发行版 /releases/edit/<tag>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // 提醒条
            "This is a draft and won’t be seen by the public unless it’s published.": "这是一个草案，除非发布，否则不会被公众看到。",
            "Discard draft": "丢弃草案",

            "Choose a tag": "选择标签",
                "Find or create a new tag": "查找或创建新标签",
            "Target:": "目标：",
                "Pick a branch or recent commit": "选择一个分支或最近的提交",
                "Filter branches…": "筛选分支…",
                "Filter recent commits…": "筛选最近提交…",
                "Recent Commits": "最近提交…",
            "Choose an existing tag, or create a new tag on publish": "选择一个现有的标签，或在发布时创建一个新标签",
            "Choose an existing tag, or create a new tag when you publish this release.": "选择一个现有的标签，或在您发布这个版本时，创建一个新标签。",

            "Loading tag information…": "载入标签信息…",
            // 在筛选标签框输入 标签时
            "Create new tag:": "创建新标签：",
            "on publish": "发布时",
            // 输入结果
            "Duplicate tag name": "重复的标签名",
                "This tag already has release notes. Would you like to": "这个标签已经有发行说明。您是否愿意",
                "edit them?": "编辑它们？",
                "Existing tag": "已存在的标签",
            "Invalid tag name": "无效的标签名",
                "We can’t create a tag with this name. Take a look at the suggestions in the sidebar for example tag names.": "我们不能用这个名字创建标签。看看侧边栏的建议，看看标签名称的例子。",
            "Excellent! This tag will be created from the target when you publish this release.": "优秀! 当您发布这个版本时，这个标签将从目标创建。",

            "Release title": "发行版标题",

            "Previous tag:": "上一个标签：",
                "auto": "自动",
                "Select previous tag to compare": "选择上一个标签进行比较",
                    "Find previous tag": "筛选上一个标签",
            "Generate release notes": "生成发行版说明",
                "Automatically add the Markdown for all the merged pull requests from this diff and contributors of this release": "自动为来自此差异和此发行版贡献者的所有已合并拉取请求，添加 Markdown 说明。",
                "Clear existing notes to automatically add the Markdown for all the merged pull requests from this diff and contributors of this release": "清除现有的注释，以自动添加来自此差异和此版本贡献者的所有合并的拉取请求的标记。",

                "There were no pull requests associated with the commits included in this release.": "此版本中没有与提交相关的拉取请求。",

            "Describe this release": "描述此发行版",

            // 附加文件
            "Attach binaries by dropping them here or selecting them.": "拖拽文件到这来或选择它们来附加文件。",
            "Uploading your release now…": "正在上传到您的发行版…",
            "An attachment with that filename already exists.": "同名附件已经存在。",
            "Try a different file.": "请尝试不同的文件。",
            "We don’t support that file type.  try zipping it.": "我们不支持该文件类型，请尝试压缩它。",
            "Try another file.": "请尝试另一个文件。",
            "Yowza, that’s a big file.": "哟，这可是个大文件。",
            "Try again": "请尝试",
            "With a file smaller than 2GB.": "一个小于 2GB 的文件。",
            "This file is empty.": "这是一个空文件。",
            "with a file that’s not empty.": "一个非空的文件。",
            "Something went really wrong, and we can’t process that file.": "确实出了点问题，我们无法处理该文件。",
            "Try again.": "请重试。",

            "Delete and try uploading this file again.": "删除并重新上传。",
            "will be deleted": "将被删除",
            "(undo)": "(撤销)",

            "Set as a pre-release": "设置为预发布版本",
                "This release will be labeled as non-production ready": "此版本将被标记为非正式版本。",
            "Create a discussion for this release": "为此版本创建讨论",
                "People will be able to leave comments and reactions on this release using Discussions.": "人们将能够使用“讨论”对此版本发表评论和反应。",
                        "Category:": "类别：",
                            "Announcements": "公告",
                            "General": "通常",
                            "Ideas": "想法",
                            "Polls": "投票",
                            "Q&A": "问与答",
                            "Show and tell": "展示与讲述",
            "Set as the latest release": "设置为最新版本", //edit
                "This release will be labeled as the latest for this repository.": "此版本将被标记为此仓库的最新版本。",

            "Publish release": "发布发行版",
                "Publishing…": "发布中…",
            "Update release": "更新发行版",
                "Updating…": "更新中…",
                "Saving release…": "保存中…",
            "Save draft": "保存草案",
            "Saved!": "已保存",
            "Saving draft failed. Try again?": "保存草案失败。请重试？",

            // 丢弃草案 对话框
            "Are you sure?": "您确定哇?",
            "This will delete the information for this draft.": "这将会删除该草案的信息。",
            "Delete this draft": "删除草案",

            // 右侧栏
            "Tagging suggestions": "标签建议",
            "It’s common practice to prefix your version names with the letter": "通常的做法是在版本名称前加上字母",
            ". Some good tag names might be": "。一些好的标签名称可能是",
            "If the tag isn’t meant for production use, add a pre-release version after the version name. Some good pre-release versions might be": "如果标签不是用于生产的，就在版本名后面加上预发布版本。一些好的预发布版本可能是",

            "Semantic versioning": "语义版本管理",
            "If you’re new to releasing software, we highly recommend to": "如果您是发布新手，我们强烈您",
            "learn more about semantic versioning.": "了解更多关于语义版本管理的信息。",

            "A newly published release will automatically be labeled as the latest release for this repository.": "新发布的版本将自动标记为该仓库的最新版本。",
            "If \'Set as the latest release\' is unchecked, the latest release will be determined by higher semantic version and creation date.": "如果未选中 “设置为最新版本”，则最新版本将由更高语义版本和创建日期确定。",
            "Learn more about release settings.": "了解更多关于发行版设置的信息。",

       // 创建 Action 发行版到市场 /releases/new?marketplace 和 编辑 /releases/edit/... >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Release Action": "发布 Action",
                "Publish this release to the GitHub Marketplace": "将此版本发布到 GitHub 市场",
                "You must": "您必须",
                "accept the GitHub Marketplace Developer Agreement": "接受 GitHub 市场开发者协议",
                "before publishing an Action.": "在发布之前。",

                "Publish this Action to the GitHub Marketplace": "将此 Action 发布到 GitHub  市场",
                "Your Action will be discoverable in the Marketplace and available in GitHub search.": "您的 Action 将在市场中被发现，并可在 GitHub 搜索中找到。",

                "Your action.yml needs changes before it can be published.": "您的 action.yml 需要更改才能发布。",
                "Everything looks good! You have all the required information.": "一切看起来都不错！您拥有所有必需的信息。",

                "Name": "名称",
                    "- Name must be unique. Cannot match an existing action, user or organization name.": "- 名称必须唯一。不能与现有的操作、用户或组织名称相匹配。",
                "Description": "描述",
                "Icon": "图标",
                "Color": "颜色",

                "A README exists.": "已经存在 README 文件。",

                "Primary Category": "主要类别",
                    "Choose an option": "请选择",
                "Another Category": "其他分类",
                    "— optional": "— 可选",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Show all (\d+) assets?/, "显示所有 $1 个资产"],
        [/(\d+) commits?/, "$1 个提交"],
        [/to ([^ ]+) since this release/, "至 $1 分支，该发行版"],
        [/This will delete the information for the release ([^ ]+)./, "这将删除发行版 $1 的信息。"],
    ],
};
I18N.zh["repository/tags"] = I18N.zh["repository/releases"];

I18N.zh["repository/packages"] = { // 仓库 - 软件包页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // /<user-name>/<repo-name>/packages
            "Get started with GitHub Packages": "开始使用 GitHub 软件包",
            "Safely publish packages, store your packages alongside your code, and share your packages privately with your team.": "安全地发布包，将您的包与您的代码一起存储，并与您的团队私下共享您的包。",
             "Choose a registry": "选择一个注册表",

            "A software platform used for building applications based on containers — small and lightweight execution environments.": "用于构建基于容器的应用的软件平台——小型轻量级执行环境。",
            "A default package manager used for the Java programming language and the Java runtime environment.": "用于 Java 编程语言和 Java 运行环境的一个默认包管理器。",
            "A free and open source package manager used for the Microsoft development platforms including .NET.": "一个自由和开源的开源包管理器，用于包括 .NET 在内的 Microsoft 开发平台。",
            "A standard format for distributing Ruby programs and libraries used for the Ruby programming language.": "分发用于 Ruby 编程语言的 Ruby 程序和库的标准格式。",
            "A package manager for JavaScript, included with Node.js. npm makes it easy for developers to share and reuse code.": "npm 是一个 JavaScript 的包管理器，包含在 Node.js 中。它使开发人员能够轻松地分享和重用代码。",
            "Containers": "容器",
            "A single place for your team to manage Docker images and decide who can see and access your images.": "为您的团队提供一个管理 Docker 镜像的单一场所，并决定谁可以看到和访问您的镜像。",

    },
    "regexp": [
    ],
}

I18N.zh["repository/pkgs"] = { // 仓库 - 软件包
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // /<user-name>/<repo-name>/pkgs/container/<pag name>
            "Installation": "安装",
            "Learn more about packages": "了解更多关于软件包的信息",
            "Install from the command line": "从命令行安装",
            "Use as base image in Dockerfile:": "在 Dockerfile 中用作基础镜像：",
            "Recent tagged image versions": "最近被标记的映像版本",
            "latest": "最新",
            // [/Published (.*) · Digest/, "发布于 $1 · 摘要"],
            "View all tagged versions": "查看所有被标记的版本",

            "Details": "详细信息",
            "Last published": "最新发布",
            "Total downloads": "总下载量",
            "Open an issue": "打开一个议题",

        // 全部版本 /<user-name>/<repo-name>/pkgs/container/<pag name>/versions
            "All versions": "所有版本",
            // [/Published (*)/, "发布于 $1"],
            // [/(\d+) tagged/, "$1 个标记"],
            // [/(\d+) untagged/, "$1 个未标记"],

        // 某个版本 /<user-name>/<repo-name>/pkgs/container/<pag name>/<version id>
            "About this version": "关于这个版本",
            "Manifest": "清单",
            "No description provided": "未提供说明",
            "This package version was published": "此版本软件包发布于",

            "To provide a description, add the following line to your Dockerfile:": "要提供描述，请将以下行添加到您的 Dockerfile 中：",
            "For multi-arch images, set a value for the": "对于多架构镜像，请设置",
            "key in the": "值在",
            "field of the manifest:": "字段：",
            "Learn more about labelling container images": "了解更多关于标记容器镜像的信息",

            "Download activity": "下载活动",
                "Download activity of this version": "此版本的下载活动",
            "Last 30 days": "最近 30 天",
            "Last week": "最近一周",
            "Today": "今天",

            "Other tags on this version": "此版本的其他标签",
            "View all versions": "查看全部版本",

    },
    "regexp": [ // 正则翻译
        [/Published (.*) · Digest/, "发布于 $1 · 摘要"],
        [/Published (.*)/, "发布于 $1"],
        [/(\d+) tagged/, "$1 个标记"],
        [/(\d+) untagged/, "$1 个未标记"],
    ],
};
I18N.zh["packages"] = I18N.zh["repository/pkgs"];

I18N.zh["repository/security"] = { // 仓库 - 安全页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 安全标签卡 & 安全概述 /<user-name>/<repo-name>/security

            // 公共部分
            "Reporting": "报告",
                "Policy": "政策",
                "Advisories": "咨询",
            "Vulnerability alerts": "漏洞警报",
                "Code scanning": "代码扫描",
                "Secret scanning": "机密扫描",

            "Disabled": "禁用",
            "Enabled": "启用",
            "Needs setup": "需要设置",

            "Security overview": "安全概述",
            "Security policy •": "安全政策 •",
                "Define how users should report security vulnerabilities for this repository": "定义用户应如何报告此仓库的安全漏洞",

                "Suggest how users should report security vulnerabilities for this repository": "建议用户应如何报告此仓库的安全漏洞",
                "Suggest a security policy": "安全政策建议",

                "View how to securely report security vulnerabilities for this repository": "查看如何安全地报告此仓库的安全漏洞",
                "View security policy": "查看安全策略",

            "Security advisories •": "安全公告 •",
                "View or disclose security advisories for this repository": "查看或公开此仓库的安全公告",
                "View security advisories": "查看安全公告",
                "View security advisories for this repository": "查看此仓库的安全公告",

            "Private vulnerability reporting •": "私下漏洞报告 •",
                "Allow users to privately report potential security vulnerabilities": "允许用户私下报告潜在的安全漏洞",
                "Enable vulnerability reporting": "启用漏洞报告",
                "See reported vulnerabilities": "查看报告的漏洞",

            "Dependabot alerts •": "Dependabot 警报 •",
                "— Active": "— 激活",
                "Get notified when one of your dependencies has a vulnerability": "当您的一个依赖项存在漏洞时得到通知",
                "Enable Dependabot alerts": "启用 Dependabot 警报",
                "View Dependabot alerts": "查看 Dependabot 警报",

            "Code scanning alerts •": "代码扫描警报 •",
                "Automatically detect common vulnerability and coding errors": "自动检测常见漏洞和编码错误",
                "Set up code scanning": "设置代码扫描",
                // 私有库
                "Advanced Security is only available for Organizations": "高级安全只适用于组织",
                "Find out more": "了解更多",
                "Code scanning for private repositories is part of GitHub Advanced Security": "私有仓库的代码扫描是 GitHub 高级安全的一部分", //组织仓库
                "Contact sales": "联系销售", //组织仓库

            "Secret scanning alerts •": "机密扫描警报 •",
                "Get notified when a secret is pushed to this repository": "当机密被推送到仓库时得到通知",
                "Enable in settings": "在设置中启用",
                "View detected secrets": "查看检测到的机密",

            // "Vulnerability details": "漏洞详情",
            "High severity": "高风险",
            "Moderate severity": "中风险",
            "Low severity": "低风险",
            // "Create dependabot security update": "创建可靠的安全更新",

            "Suggest a policy": "建议政策",

        // 安全政策 /<user-name>/<repo-name>/security/policy
            "Set up a security policy": "制定安全政策",
            "Help your community understand how to securely report security vulnerabilities for your project.": "帮助您的社区了解如何安全地报告项目的安全漏洞。",
            "Start setup": "开始设置",

            "No security policy detected": "未检测到安全策略",
            "This project has not set up a": "该项目尚未设置",
            "file yet.": "文件。",

        // 安全公告 /<user-name>/<repo-name>/security/advisories
            "Security Advisories": "安全公告",
            "Privately discuss, fix, and publish information about security vulnerabilities in your repository's code.": "私人讨论，修复和发布仓库代码中的安全漏洞的信息。",
            "New draft security advisory": "新的安全建议草案",

            // [/(\d+) Draft/, "$1 项草案"],
            // [/(\d+) Published/, "$1 项已发布"],
            // [/(\d+) Closed/, "$1 项已关闭"],

            "There aren’t any draft security advisories": "没有任何安全建议草案",
            "There aren’t any published security advisories": "没有任何已发布的安全公告",
            "There aren’t any closed security advisories": "没有任何已关闭的安全公告",

            // 他人库
            "View information about security vulnerabilities from this repository's maintainers.": "查看仓库维护者提供的安全漏洞信息。",

        // Dependabot 警报 /<user-name>/<repo-name>/security/dependabot
            "Dependabot alerts": "Dependabot 警报",

            "Ignore the false alarms": "忽略误报",
            "To help you focus on the alerts that matter, Dependabot now proactively dismisses low impact alerts. These alerts may only have limited effects (e.g. long-running builds or tests) or are unlikely to be exploitable.": "为了帮助您专注于重要的警报，Dependabot 现在会主动消除低影响警报。这些警报可能只会产生有限的影响（例如长时间运行的构建或测试）或不太可能被利用。",
            "Opt out": "设置",
            "learn more about auto-dismissing alerts.": "了解更多关于自动撤消警报的信息。",

            "Auto-triage your alerts": "自动分类您的警报",
                "Control how Dependabot opens pull requests, ignores false positives and snoozes alerts. Rules can be enforced at the organization level. Free for open source and available for private repos through": "控制 Dependabot 如何打开拉取请求、忽略误报和推迟警报。规则可以在组织层面强制执行。免费供开源项目使用，私有仓库需要通过",
                "GitHub Advanced Security.": "GitHub 高级安全性。",
                "Learn more about auto-triage": "了解更多关于自动分类的信息",

            "Dependabot alerts are disabled.": "Dependabot 警报已禁用。",
            "To receive Dependabot alerts, you must first enable Dependabot alerts in": "要接收 Dependabot 警报，必须首先启用 Dependabot 警报",
            "this repository’s settings": "在仓库的设置中",

            // "Tell us how to make Dependabot alerts work better for you with three quick questions.": "通过三个快速问题告诉我们如何让 Dependabot 警报更好地为您服务。",

            "Welcome to Dependabot alerts!": "欢迎使用 Dependabot 警报！",
            "Dependabot alerts track security vulnerabilities that apply to your repository's dependencies. As alerts are created, they’ll appear here.": "Dependabot 警报跟踪适用于仓库依赖项的安全漏洞。创建警报后，它们将显示在此处。",

            "Configure": "设置",
                "Manage repository vulnerability settings": "管理仓库漏洞设置",
                "Manage account notification settings": "管理帐户通知设置",

            "Closed as": "关闭",
                "Filter by resolution": "按决议筛选",
                "A fix has already been started": "修复已经开始",
                "No bandwidth to fix this": "没有带宽来修复",
                "Risk is tolerable to this project": "风险可承受",
                "This alert is inaccurate or incorrect": "此警报不准确或不正确",
                "Vulnerable code is not actually used": "漏洞代码实际未使用",
                "Fixed": "已修复",
            "Package": "软件包",
                "Filter by package": "按软件包筛选",
                "Filter package": "筛选软件包",
            "Ecosystem": "生态系统",
                "Filter by ecosystem": "按生态系统筛选",
                "Filter ecosystem": "筛选生态系统",
            "Manifest": "清单",
                "Filter by manifest": "按清单筛选",
                "Filter manifest": "筛选清单",
                "All": "所有",
            "Severity": "严重等级",
                "Filter by severity": "按严重性筛选",
            "Sort": "排序",
                "Sort by": "排序方式",
                "Newest": "最新的",
                "Oldest": "最早的",
                "Most important": "最重要的",
                "Manifest path": "表现路径",
                "Package name": "包名称",

            "selected": "条被选中",
            "Dismiss alerts": "忽略警报",
                "Select a reason to dismiss": "选择驳回理由",

            "There aren’t any open alerts.": "尚无任何打开的警报。",
            "As alerts are created, they’ll appear here.": "创建警报后，它们将出现在此处。",

            // 底部信息
            "surface known security vulnerabilities in some dependency manifest files.": "表面已知的安全漏洞在某些依赖性清单文件中。",
            "Dependabot security updates": "Dependabot 安全更新",
            "automatically keep your application up-to-date by updating dependencies in response to these alerts.": "通过响应这些警报更新依赖项，自动保持您的应用是最新的。",
            "Dependabot version updates": "Dependabot 版本更新",
            "can also help keep dependencies updated.": "也可以帮助保持依赖项的更新。",

            "Protip!": "专业提示！",
                "See auto-dismissed alerts with": "要查看自动解除的警报，请使用",
                "to see alerts without an available fix.": "来查看没有可用修复程序的警报。",

         // 具体某条Dependabot 警报 /security/dependabot/<id>
            "Dismiss alert": "忽略警报",

            "Opened": "打开",
            // [/Upgrade ([^ ]+) to fix/, "升级 $1 去修复"], // 某个 Dependabot 警报
            // [/Upgrade ([^ ]+) to version/, "升级 $1 到版本"], // 某个 Dependabot 警报
            "Create Dependabot security update": "创建 Dependabot 安全更新",

            // [/Dependabot cannot update ([^ ]+) to a non-vulnerable version/, "Dependabot 无法将 $1 更新为无漏洞的版本"],
            "The latest possible version that can be installed is": "最新可以安装版本是",
            "because of the following conflicting dependency:": "，但是存在以下冲突的依赖关系：",
            "because of the following conflicting dependencies:": "，但是存在以下冲突的依赖关系：",
            "The earliest fixed version is": "最早修复版本为",
            "Try again": "再试一次",
            "View logs": "查看日志",
            "Learn more about troubleshooting Dependabot errors": "了解更多关于排除 Dependabot 错误的信息",

            "Patched version": "补丁版本",

            "Impact": "影响",
            "Patches": "补丁",
            "Workarounds": "解决方法",
            "Workarounds / Mitigations": "解决方法/缓解措施",
            "References": "参考信息",
            "For more information": "更多信息",

            // [/Bump ([^ ]+) from ([^ ]+) to ([^ ]+)/, "将 $1 从 $2 升级到 $3"],
            "Merging this pull request would fix": "合并此拉取请求将修复",
            "Review security update": "审查安全更新",

            // 右侧栏
                "CVSS base metrics": "CVSS 基本指标",
                    "Attack vector": "攻击载体",
                        "More severe the more the remote (logically and physically) an attacker can be in order to exploit the vulnerability": "攻击者为了利用该漏洞，可以在远程（逻辑上和物理上）攻击时更严重",
                        "Network": "网络",
                        "Local": "本地",
                    "Attack complexity": "攻击复杂性",
                        "More severe for the least complex attacks": "当最不复杂的攻击时更严重",
                    "Privileges required": "所需权限",
                        "More severe if no privileges are required": "当不需要权限时更严重",
                        "None": "无",
                    "User interaction": "用户交互",
                        "More severe when no user interaction is required": "当不需要用户交互时更严重",
                        "Required": "必须",
                    "Scope": "范围",
                        "More severe when a scope change occurs, e.g. one vulnerable component impacts resources in components beyond its security scope": "当范围发生变化时更严重，例如一个易受攻击的组件会影响超出其安全范围的组件中的资源",
                        "Unchanged": "无变化",
                        "Changed": "已变化",
                    "Confidentiality": "保密性",
                        "More severe when loss of data confidentiality is highest, measuring the level of data access available to an unauthorized user": "当数据保密性损失最高时更为严重，衡量未授权用户可获得的数据访问级别",
                    "Integrity": "完整性",
                        "More severe when loss of data integrity is the highest, measuring the consequence of data modification possible by an unauthorized user": "当数据完整性损失最高时更为严重，衡量未授权用户可能修改数据的后果",
                    "Availability": "可利用性",
                        "More severe when the loss of impacted component availability is highest": "当受影响的组件可用性损失最高时更为严重",
                "Weaknesses": "缺陷",
                "See advisory in GitHub Advisory Database": "请参阅 GitHub 咨询数据库中的咨询",
                "See all of your affected repositories": "查看您所有受影响的仓库",
                "See something to contribute?": "看到有什么可贡献的吗？",
                "Suggest improvements for this advisory on the GitHub Advisory Database.": "在 GitHub 咨询数据库上建议改进此咨询。",

            // 生成安全更新
                // 顶部提醒
                    // [/Started generating a security update for ([^ ]+)./, "开始为 $1 生成安全更新。"],
                // [/Creating a security update for ([^ ]+)/, "为 $1 创建安全更新"],
                "Dependabot is creating a security update to fix": "Dependabot 正在创建一个安全更新来修复",
                // [/(\d+) Dependabot alerts?/, "$1 个 Dependabot 警报"],
                // [/on ([^ ]+) in/, "关于 $1 在"],
                // [/Or, manually upgrade ([^ ]+) to version/, "或者，手动将 $1 升级到版本"],
                "or later. For example:": "或更高。例如：",

         // 具体某条Dependabot 警报 日志 /security/dependabot/<id>/update-logs/<id2>
            "Update logs": "更新日志",

        // 代码扫描器 /<user-name>/<repo-name>/security/code-scanning
            "Automatically detect vulnerabilities in your code.": "自动检测您代码中的漏洞。",
            "Code Scanning uses Actions to run the analysis. Enabling this feature will create a new workflow file. Learn more about": "代码扫描使用 Actions 来运行分析。启用此功能将创建一个新的工作流程文件。了解更多关于",
            "Code Scanning": "代码扫描",
            "Configure CodeQL alerts": "配置 CodeQL 警报",
            "Configure other scanning tools": "配置其他扫描工具",

            "Configure tools that integrate with Code Scanning to keep the quality of your code under control. Learn more about": "与代码扫描集成的配置工具，使您的代码质量得到控制。了解更多关于",
            "Configure scanning tool": "配置扫描工具",

        // 机密扫描警报 /<user-name>/<repo-name>/security/secret-scanning
            "Secret scanning alerts": "机密扫描警报",
            "Secret scanning disabled": "机密扫描已停用",
                "To scan for secrets, you must first enable secret scanning in": "要扫描机密，您必须首先启用机密扫描在",
                "this repository's settings": "此仓库设置",

            "Secret type": "机密类型",
                "Filter by secret type": "按机密类型筛选",
                "Filter secret type": "筛选机密类型",
                "Nothing to show": "暂无",

            "Provider": "提供者",
                "Filter by provider": "按提供者筛选",
                "Filter provider": "筛选提供者",

            // 排序
                "Recently updated": "最近更新",
                "Least recently updated": "最早更新",

            "Clear current search query, filters, and sorts": "清除当前搜索查询、过滤器和排序",

            "No secrets found.": "没有发现任何机密",
            "Your repository doesn't have any unresolved secrets.": "您的仓库没有任何未解决的秘密。",

        // 新建安全公告草案 /<user-name>/<repo-name>/security/advisories/new
            "Open a draft security advisory": "打开一个安全公告草案",
            "After the draft security advisory is open, you can privately discuss it with collaborators and create a temporary private fork where you can collaborate on a fix. If you've already fixed the vulnerability, just fill out the draft security advisory and then publish it.": "在安全公告草案打开后，您可以与协作者私下讨论，并创建一个临时的私有复刻，在那里您们可以协作进行修复。如果您已经修复了该漏洞，只需填写安全公告草案，然后发布即可。",

            "Advisory Details": "公告详情",
            "Title *": "标题 *",
            "CVE identifier": "CVE 标识符",
                "Request CVE ID later": "稍后请求 CVE ID",
                "I have an existing CVE ID": "我有一个现有的 CVE ID",
            "Description *": "描述 *",

            "Affected products": "受影响的产品",
            "Ecosystem *": "生态系统 *",
                "Don't see the ecosystem you're looking for? It may not be supported yet.": "没有看到您正在寻找的生态系统？可能还不支持。",
                "Select an ecosystem": "选择一个生态系统",
                "Go": "",
                "Other": "其他",
            "Affected versions": "受影响的版本",
            "Patched versions": "补丁版本",
            "Add another affected product": "添加另一个受影响的产品",

            "Select severity": "选择严重程度",
                "Low": "低风险",
                "Moderate": "中风险",
                "High": "高风险",
                "Critical": "关键风险",
                "Assess severity using CVSS": "使用 CVSS 评估严重程度",

            "Common weakness enumerator (CWE)": "常见弱点枚举器 (CWE)",
                "Search by CWE": "按 CWE 搜索",

            "Create draft security advisory": "创建安全公告草案",

            // 右侧栏
            "Access and visibility": "访问和可见性",
                "Until it is published, this draft security advisory will only be visible to the owner of": "在发布之前，此安全公告草案仅对以下的所有者可见",
                ". Other users and teams may be added once the advisory is created.": "。 其他用户和团队可以在咨询创建后加入。",
            "Once published, security advisories on public repositories are visible to everyone.": "一旦发布，公共仓库上的安全公告对所有人都是可见的。",
            "Once reviewed by GitHub, security advisories may be broadcast on the": "一旦通过 GitHub 的审查，安全公告就可以出现在",
            "GitHub Advisory Database": "GitHub 咨询数据库",
            ". They may also trigger Dependabot alerts to users that depend on this repository.": "。它们还可能向依赖此仓库的用户触发 Dependabot 警报。",

            "Security policy": "安全政策",
            "Glossary and documentation": "词汇表和文档",
            "Dependabot language support": "Dependabot 语言支持",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/([\d,]+) Draft/, "$1 草案"],
        [/([\d,]+) Published/, "$1 发布"],
        [/([\d,]+) Open/, "$1 打开"],
        [/([\d,]+) Closed/, "$1 关闭"],
        [/(\d+) selected/, "$1 条被选中"],
        [/Upgrade ([^ ]+) to fix/, "升级 $1 去修复"], // 某个 Dependabot 警报
        [/Upgrade ([^ ]+) to version/, "升级 $1 到版本"], // 某个 Dependabot 警报
        [/Dependabot cannot update ([^ ]+) to a non-vulnerable version/, "Dependabot 无法将 $1 更新为无漏洞的版本"],
        [/Bump ([^ ]+) from ([^ ]+) to ([^ ]+)/, "将 $1 从 $2 升级到 $3"],
        [/Started generating a security update for ([^ ]+)./, "开始为 $1 生成安全更新。"],
        [/Creating a security update for ([^ ]+)/, "为 $1 创建安全更新"],
        [/(\d+) Dependabot alerts?/, "$1 个 Dependabot 警报"],
        [/on ([^ ]+) in/, "关于 $1 在"],
        [/Or, manually upgrade ([^ ]+) to version/, "或者，手动将 $1 升级到版本"],
    ],
};

I18N.zh["repository/activity"] = { // 仓库 - 活动页面
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],

        // 活动页面 /<user-name>/<repo-name>/activity 
            "Activity": "活动",

            "All branches": "所有分支",
                "Switch branches": "切换分支",
                "Find a branch...": "查找分支...",
                "Branches": "分支",
                "default": "默认",
                "View activity for all branches": "查看所有分支的活动",

            "All activity": "所有活动",
                "Direct pushes": "直接推送",
                "Pull request merges": "拉取请求合并",
                "Merge queue merges": "合并队列合并",
                "Force pushes": "强制推送",
                "Branch creations": "创建分支",
                "Branch deletions": "删除分支",

            "All users": "所有用户",
                "Find a user...": "查找用户...",
                "View activity for all users": "查看所有用户的活动",

            "All time": "所有时间",
                "Last 24 hours": "过去 24 小时",
                "Last week": "上星期",
                "Last month": "上个月",
                "Last quarter": "上季度",
                "Last year": "去年",


            "Showing oldest first": "显示最早的",
            "Showing most recent first": "显示最近的",

            "Compare changes": "比较变更",

            "Previous": "上一页",
            "Next": "下一页",

            "Direct push": "直接推送",
            "Pull request merge": "拉取请求合并",
            "Force push": "强制推送",
            "Branch creation": "创建分支",
            "Branch deletion": "删除分支",

            "force pushed to": "强制推送到",
            "deleted": "删除",

            "Share feedback about this page": "分享关于此页面的反馈",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/pushed (\d+) commits? to/, "推送 $1个提交到"],
        [/pushed (\d+) commits?/, "推送 $1个提交"],
    ],
};


// 洞察 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

I18N.zh["repository-insights-menu"] = { // 仓库 -> 洞察 - 公共部分
    "static": { // 静态翻译
        // 公共部分
            // 左侧菜单
            "Pulse": "统计",
            "Contributors": "贡献者",
            "Community": "社区",
            "Community Standards": "社区准则",
            "Traffic": "流量",
            "Commits": "提交",
            "Code frequency": "代码频率",
            "Dependency graph": "依赖关系图",
            // "Punch card": "时刻",
            "Network": "网络",
            // "Members": "成员",
            "Forks": "复刻",

            "People": "成员", //组织仓库

            // 私有库禁用部分功能的提醒
            "Upgrade to GitHub Pro or make this repository public to enable this feature.": "升级到 GitHub Pro 或将此仓库设为公开以启用此功能。",
            // 他人私有库
            "Contact an administrator to upgrade to GitHub Team or make this repository public to enable this feature.": "请联系管理员升级到 GitHub 团队或将此设为仓库公开以启用此功能。",

            "We want to know how these insights are helping you and where they could be improved.": "我们想知道这些洞察如何帮助您，以及在哪些方面可以改进。",
            "Give us your feedback": "向我们提供反馈意见",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["repository/pulse"] = { // 仓库 -> 洞察 - 统计
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //统计 /<user-name>/<repo-name>/pulse
            "Period:": "周期：",
                "Filter activity": "筛选活动",
                "24 hours": "24 小时",
                "3 days": "3 天",
                "1 week": "1 周",
                "1 month": "1 个月",
            "Active pull request": "活跃的拉取请求",
            "Active pull requests": "活跃的拉取请求",
            "Active issue": "活跃的议题",
            "Active issues": "活跃的议题",
            "Merged pull request": "合并的拉取请求",
            "Merged pull requests": "合并的拉取请求",
            "Open pull request": "打开的拉取请求",
            "Open pull requests": "打开的拉取请求",
            "Closed issue": "关闭的议题",
            "Closed issues": "关闭的议题",
            "New issue": "新议题",
            "New issues": "新议题",

            "Excluding merges,": "不包括合并，",
            // [/(\d+) authors?/, "$1 位作者"],
            "have pushed": "推送了",
            "has pushed": "推送了",
            "commit": "次提交",
            "commits": "次提交",
            // [/to ([^ ]+), and/, "到 $1 分支和"],
            // [/to all branches. On ([^ ]+),/, "到全部分支。在 $1 分支，"],
            // [/(\d+) files?/, "$1 个文件"],
            "have changed and there have been": "已经发生了变化，并且有",
            "has changed and there have been": "已经发生了变化，并且有",
            "additions": "处增加",
            "deletions": "处删除",

            "commit authored by": "次提交，作者：",
            "commits authored by": "次提交，作者：",

            "Want to help out?": "想帮忙吗？",
            "Fork this repository": "复刻仓库",
            "Release published by": "个发行版已发布由",
            "Releases published by": "个发行版已发布由",
            "published": "发布",
            "Pull request merged by": "个拉取请求已合并由",
            "Pull requests merged by": "个拉取请求已合并由",
            "Pull request opened by": "个拉取请求打开由",
            "Pull requests opened by": "个拉取请求打开由",
            "Issue closed by": "个议题已关闭由",
            "Issues closed by": "个议题已关闭由",
            "Issue opened by": "个议题打开由",
            "Issues opened by": "个议题打开由",
            "person": "人",
            "people": "人",
            "Sometimes conversations happen on old items that aren’t yet closed. Here is a list of all the Issues and Pull Requests with unresolved conversations.": "有时会针对尚未关闭的旧项目进行讨论。以下是所有未解决的讨论的议题和拉取请求的列表。",
            // [/• (\d+) new comments/, "• $1 个新评论"],
            "Unresolved conversation": "个未解决的讨论",
            "Unresolved conversations": "个未解决的讨论",

            "merged": "已合并",
            "opened": "打开",
            "closed": "已关闭",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) authors?/, "$1 位作者"],
        [/to ([^ ]+) and/, "到 $1 分支和"],
        [/to all branches. On ([^ ]+),/, "到全部分支。在 $1 分支，"],
        [/(\d+) files?/, "$1 个文件"],
        [/(\d+) commented on/, "$1 评论于",],
        [/• (\d+) new comments?/, "• $1 个新评论"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last 24 hours./, "在过去的 24 小时里，$1 没有任何提交活动。"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last 3 days./, "在过去的 3 天里，$1 没有任何提交活动。"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last week./, "在过去的 1 周里，$1 没有任何提交活动。"],
        [/There hasn’t been any commit activity on ([^ ]+) in the last month./, "在过去的 1 月里，$1 没有任何提交活动。"],
    ],
};

I18N.zh["repository/graphs/contributors"] = { // 仓库 -> 洞察 - 贡献者
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //贡献者 /<user-name>/<repo-name>/graphs/contributors
            "Loading contributions…": "载入贡献者…",
            // [/Contributions to (.*), excluding merge commits/, "贡献到 $1分支，不包括合并提交"],
            "Contributions:": "贡献者：",
                // 下拉菜单
                "Filter contributions": "筛选贡献者",
                "Additions": "添加数量",
                "Deletions": "删除数量",
                // [/Contributions to (.*), excluding merge commits and bot accounts/, "贡献到 $1分支，不包括合并提交和机器人帐户"],
            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Contributions to (.*), excluding merge commits/, "贡献到 $1分支，不包括合并提交"],
        [/([\d,]+) commits?/, "$1 次提交"],
    ],
};

I18N.zh["repository/graphs/community"] = { // 仓库 -> 洞察 - 社区
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //社区 /<user-name>/<repo-name>/graphs/community
            "Enable Discussions to unlock Community Insights!": "启用讨论，以解锁社区见解！",
            "Discussions is the central space for your community to share announcements, ask questions, and host conversations.": "讨论是您的社区共享公告、提出问题和主持对话的中心空间。",
            "Set up discussions": "建立讨论",

            "Community insights": "社区见解",
            "Period:": "周期：",
                "Filter activity": "筛选活动",
                "Last 30 days": "最近 30 天",
                "Last 3 months": "最近 3 个月",
                "Last year": "最近 1 年",

            "Contribution activity": "贡献活动",
                "Count of total contribution activity to Discussions, Issues, and PRs": "对讨论、议题和拉取请求的总贡献活动计数",
                "discussions": "讨论",
                "Quantity": "数量",
                "Timeline": "时间轴",
                // [/(\d+) pull requests created/, "$1 个拉取请求创建"],
            "We tried our best, but the graph wouldn’t load. Try reloading the page.": "我们尽了最大努力，但图表无法加载。尝试重新加载页面。",
            "Discussions page views": "讨论页面浏览量",
                "Total page views to Discussions segmented by logged in vs anonymous users.": "按登录用户与匿名用户划分的讨论的总页面浏览量。",
                "logged in": "登录",
                "anonymous": "匿名",
            "Discussions daily contributors": "每日讨论的贡献者",
                "Count of unique users who have reacted, upvoted, marked an answer, commented, or posted in the selected period.": "在所选时间段内，作出反应、投票、标记答案、评论或发帖的唯一用户的数量。",
            "Discussions new contributors": "讨论的新贡献者",
                "Count of unique new users to Discussions who have reacted, upvoted, marked an answer, commented, or posted in the selected period.": "在所选时间段内，对讨论作出反应、投票、标记答案、评论或发帖的唯一新用户的数量。",

            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) pull requests? created/, "$1 个拉取请求创建"],
        [/(\d+) issues? created/, "$1 个议题创建"],
    ],
};

I18N.zh["repository/community"] = { // 仓库 -> 洞察 - 社区准则
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //社区准则 /<user-name>/<repo-name>/community
            "Here’s how this project compares to": "以下是该项目内容，不同于",
            "recommended community standards": "推荐的社区标准",
            "Checklist": "检查清单",
            "Add": "添加",
            "Propose": "提议",

            "Description": "描述",
                "Add a description to your repository so people understand the goals of your project.": "向您的仓库添加描述，以便人们了解您项目的目标。",
            "README": "自述文件（README）",
                "Writing a README": "编写自述文件（README）",
            "Code of conduct": "行为准则",
                "What is a code of conduct?": "什么是行为准则？",
            "Contributing": "贡献",
                "Writing contributing guidelines": "编写贡献指南",
            "License": "许可证",
                "Choosing a license": "选择许可证",
            "Security policy": "安全政策",
                "Set up a security policy": "设置安全策略",
            "Issue templates": "议题模板",
            "Pull request template": "拉取请求模板",
            "Repository admins accept content reports": "仓库管理员接受内容报告", // 组织仓库?
            "What is": "什么是",
            "the community profile": "社区简介",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};
//community/code-of-conduct/new

I18N.zh["repository/graphs/traffic"] = { // 仓库 -> 洞察 - 流量
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //流量 /<user-name>/<repo-name>/graphs/traffic
            "Git clones":"Git 克隆",
            "Clones":"克隆",
            "Unique cloners":"唯一克隆者",
            "clones":"次克隆",
            "clone":"次克隆",
            "unique cloners":"个唯一克隆者",
            "unique cloner":"个唯一克隆者",
            "Visitors":"访客",

            "Referring sites":"引荐网站",
            "Site":"站点",
            "Views":"浏览",
            "Unique visitors":"唯一访客",
            "views":"次浏览",
            "view":"次浏览",
            "unique visitors":"个唯一访客",
            "unique visitor":"个唯一访客",
            "Popular content":"热门内容",
            "Content":"内容",

            "We don’t have enough data to show anything useful.": "我们没有足够的数据来显示任何有用的东西。",
            "It usually takes about a week to populate this graph.": "通常需要一周左右的时间来填充此图表。",
            "It looks like traffic to your repository is a little light. Go spread the word and check back later!": "看起来您的仓库的流量有点少呀。去宣传一下吧，稍后再回来查看！",

            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/graphs/commit-activity"] = { // 仓库 -> 洞察 - 提交
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //提交 /<user-name>/<repo-name>/graphs/commit-activity
            "Sunday"    : "周日",
            "Monday"    : "周一",
            "Tuesday"   : "周二",
            "Wednesday" : "周三",
            "Thursday"  : "周四",
            "Friday"    : "周五",
            "Saturday"  : "周六",

            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/graphs/code-frequency"] = { // 仓库 -> 洞察 - 代码频率
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //代码频率 /<user-name>/<repo-name>/graphs/code-frequency
            "Code frequency over the history of": "历史上的代码频率",
            "Additions": "添加数量",
            "Deletions": "删除数量",
            "per week": "每周",
            "Crunching the latest data, just for you. Hang tight…": "正在为您准备最新数据，请稍后…",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/network/dependencies"] = { // 仓库 -> 洞察 - 依赖关系图 - 依赖关系
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        "Dependencies": "依赖关系",
        "Dependents": "依赖者",
        //依赖关系图 - 依赖关系 /network/dependencies
            "Tell us how to make the Dependency Graph work better for you with a few quick questions.": "请通过几个简单的问题告诉我们，如何使 “依赖关系图” 更好地为您工作。",

            "The dependency graph is not enabled": "依赖关系图未启用",
            "The owner of this repository has not yet enabled the dependency graph. Once enabled, you can": "此仓库的所有者尚未启用依赖关系图。一旦启用，您可以", //个人仓库
            "The dependency graph has not yet been enabled by an organization owner or a user with admin permissions for this repository. Once enabled, you can": "依赖关系图还没有被组织所有者或具有该仓库管理权限的用户启用。一旦启用，您可以", // 组织仓库
            "track this repository’s dependencies": "追踪此仓库的依赖关系",

            "Enable the dependency graph": "启用依赖关系图",
            "Track this repository’s dependencies and sub-dependencies": "追踪该仓库的依赖关系和子依赖关系",
            "The": " ",
            "is not enabled for this repository. Click on \"Enable the dependency graph\" below to enable it.": "暂未启用。单击下面的 “启用依赖关系图” 以启用它。",
            "If you’d like to enable the": "如果您想启用",
            "dependency graph": "依赖关系图",
            "vulnerability alerting": "漏洞警报",
            "click on \"Allow access\" below to enable it.": "点击下面的 “允许访问” 来启用它。",
            "Learn more about how we use your data": "了解更多关于我们如何使用您的数据的信息",
            "Allow access": "允许访问",

            "No dependencies found.": "未找到依赖项",
            "To view your dependency graph, your repository must define dependencies in": "要查看依赖关系图，您的仓库必须定义依赖关系存在",
            "one of the supported manifest file types": "一个支持的清单文件",
            ", like": "，例如",
            ", and": "，和",

            "Export SBOM": "导出 SBOM",

            // "Dependencies": "依赖关系",
            "Search all dependencies": "搜索所有依赖项",

            "These dependencies are defined in": "这些依赖关系被定义在",
            "’s manifest files, such as": "的清单文件，例如",
            "Dependencies defined in": "依赖关系被定义在",

            // 发现已知漏洞
            "Dependencies defined in these manifest files have known security vulnerabilities and should be updated:": "这些清单文件中定义的依赖项具有已知的安全漏洞，应更新：",
            // [/(\d+) vulnerabilities? found/, "发现 $1 个漏洞"],
            "Known security vulnerability in": "已知的安全漏洞，在",
                "Known vulnerability found": "发现已知漏洞",
                "update suggested:": "更新建议：",
                "Always verify the validity and compatibility of suggestions with your codebase.": "始终验证建议与代码库的有效性和兼容性。",

            // [/(\d+) more dependencies/, "更多 $1 个依赖项"],
            // [/Load (\d+) more…/, "加载更多 $1个…"],

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) vulnerabilities? found/, "发现 $1 个漏洞"],
        [/(\d+) more dependencies/, "更多 $1 个依赖项"],
        [/Load (\d+) more…/, "加载更多 $1个…"],
    ],
};

I18N.zh["repository/network/dependents"] = { // 仓库 -> 洞察 - 依赖关系图 - 依赖者
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        "Dependencies": "依赖关系",
        "Dependents": "依赖者",
        //依赖关系图 - 依赖者 /network/dependents
            "GitHub does not currently determine the dependents of private repositories": "GitHub 目前无法确定私有仓库的依赖者",

            "Export SBOM": "导出 SBOM",
            // "Dependents": "依赖者",
            "We haven’t found any dependents for this repository yet.": "我们尚未找到这个仓库的任何依赖者。",
            "We’ll keep looking!": "我们会继续寻找！",

            "Repositories that depend on": "依赖的仓库包括",
            "Package:": "软件包：",

            // [/(\d+) Repositor(y|ies)/, "$1 仓库"],
            // [/(\d+) Packages?/, "$1 软件包"],

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) Repositor(y|ies)/, "$1 仓库"],
        [/(\d+) Packages?/, "$1 软件包"],
    ],
};

I18N.zh["repository/network/updates"] = { // 仓库 -> 洞察 - 依赖关系图 - 依赖机器人
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        "Dependencies": "依赖关系",
        "Dependents": "依赖者",

        "Export SBOM": "导出 SBOM",
        //依赖关系图 - 依赖机器人 /network/updates
            "Enable Dependabot": "启用 Dependabot",
            "Dependabot isn't enabled": "未启用 Dependabot",
            "Dependabot isn't enabled on forks by default": "默认情况下，Dependabot 不会在复刻上启用。",

            "Dependabot version updates aren't configured yet": "尚未配置 Dependabot 版本更新",
            "Dependabot creates pull requests to keep your dependencies up-to-date.": "Dependabot 创建拉取请求以保持您的依赖项是最新的。",
            "Create config file": "创建配置文件",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/network"] = { // 仓库 -> 洞察 - 网络图
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //网络图 /<user-name>/<repo-name>/network
            // 键盘快捷键
                "Scroll left": "向左滑动",
                "Scroll right": "向右滑动",
                "Scroll up": "向上滑动",
                "Scroll down": "向下滑动",
                "Toggle visibility of the head labels": "切换头部标签的可见性",
                "Scroll all the way left": "一直向左滑动",
                "Scroll all the way right": "一直向右滑动",
                "Scroll all the way up": "一直向上滑动",
                "Scroll all the way down": "一直向下滑动",

            "Network graph": "网络图",
            "Find useful forks":"找到有用的叉子",
            "Timeline of the most recent commits to this repository and its network ordered by most recently pushed to.": "最近提交到此仓库的时间轴及其网络图按最近推送的顺序排序。",

            "The repository network shows the 100 most recently pushed forks.": "仓库网络图显示最近推送的 100 个复刻。",

            "Loading graph data": "加载网络图数据",
            "Keyboard shortcuts available": "可用的键盘快捷键",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/network/members"] = { // 仓库 -> 洞察 - 复刻
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //复刻 /<user-name>/<repo-name>/network/members
            "switch to list view": "切换到列表视图",

            "No one has forked this repository yet.": "目前，暂无人复刻该仓库。",
            "Forks are a great way to contribute to a repository. After": "复刻是给该仓库做贡献的好方法。首先",
            "forking a repository": "复刻仓库",
            ", you can send the original author a": "，然后您可向原作者发送",
            "pull request": "拉取请求",

            "Woah, this network is huge! We’re showing only some of this network’s repositories.": "哇，这个网络太庞大了! 我们只展示了这个网络中的一部分仓库。",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/forks"] = { // 仓库 -> 洞察 - 复刻
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-insights-menu"]["static"],

        //复刻 /<user-name>/<repo-name>/forks
            "Switch to tree view": "切换到树形视图",

            "No one has forked this repository yet": "目前，暂无人复刻该仓库",
            "Forks are a great way to contribute to a repository. After": "复刻是给该仓库做贡献的好方法。首先",
            "forking a repository": "复刻仓库",
            ", you can send the original author a": "，然后您可向原作者发送",
            "pull request": "拉取请求",

            "No forked repositories found": "尚无复刻仓库",
            "Try changing your filters, or search for": "尝试更改筛选器，或搜索",
            "active forked repositories": "活跃的复刻仓库",

            "Period:": "周期:",
                "Filter by period": "筛选周期",
                "1 month": "1 个月",
                "6 months": "6 个月",
                "1 year": "1 年",
                "2 years": "2 年",
                "5 years": "5 年",
                "All time": "所有时间",

                "Any repository that has not been created or updated during this period will be excluded.": "在此期间未被创建或更新的任何仓库将被排除在外。",
            "Repository type:": "仓库类型:",
                "Filter by repository type": "筛选仓库类型",
                "None": "无",
                "Active": "活跃",
                    "Repositories with push activity": "有推送活动的仓库",
                "Inactive": "不活跃",
                    "Repositories with no push activity": "无推送活动的仓库",
                "Network": "网络",
                    "Forks of other forks": "其他复刻的复刻",
                "Archived": "存档",
                    "Archived repositories": "已存档的仓库",
                "Starred": "星标",
                    "Repositories with at least 1 star": "至少有 1 个星标的仓库",
            "Sort:": "排序:",
                "Sort by": "排序方式",
                    "Most starred": "最多星标",
                    "Recently updated": "最近更新",
                    "Open issues": "打开的议题",
                    "Open pull requests": "打开的拉取请求",
                "Defaults Saved": "默认值已保存",
                "Save Defaults": "保存默认值",

            "Never updated": "从未更新",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Created/, "创建于"],
        [/Updated/, "更新于"],
    ],
};

// 洞察 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

I18N.zh["repository-settings-menu"] = { // 仓库设置公共部分
    "static": { // 静态翻译
        // >>>>>>>>>>>>>>>>>>   仓库设置 公共部分  <<<<<<<<<<<<<<<<<<<
            // 顶部提醒栏
            "Most repository settings are hidden for archived repositories. This repository must be unarchived to change them.": "对于存档的仓库，大多数仓库设置都是隐藏的。 必须解除仓库存档才能更改它们。",
            "This repository has been archived by the owner. It is now read-only.": "此仓库已由所有者存档。它现在是只读的。",
            "Repository settings saved.": "仓库设置已保存。",


            // 左侧菜单
            "General": "通常",

            "Access": "访问",
                // "Collaborators": "协作者",
                "Collaborators and teams": "协作者和团队", // 组织仓库
                "Team and member roles": "团队和成员职责",  // 组织仓库
                "Moderation options": "节制选项",
                    "Interaction limits": "互动限制",
                    "Code review limits": "代码审查限制",

            "Code and automation": "代码与自动化",
                "Branches": "分支",
                "Tags": "标签",
                "Rules": "规则",
                    "Rulesets": "规则集",
                // "Actions": "操作",
                    // "General": "通常",
                    "Runners": "运行器",
                "Webhooks": "Web 钩子",
                "Environments": "环境",
                "Pages": "GitHub Pages",

            // "Security": "安全",
                "Code security and analysis": "代码安全性与分析",
                "Deploy keys": "部署密钥",
                "Secrets and variables": "机密和变量",

            "Integrations": "集成",
            "GitHub Apps": "GitHub 应用",
            "Email notifications": "邮件通知",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["repository/settings"] = { // 仓库设置 - 通常 /<user-name>/<repo-name>/settings
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 通常 - 设置页面 /<user-name>/<repo-name>/settings ====================================
            "Repository name": "仓库名称",
            "Rename": "重命名",
                // [/is available./, "名称可用。"],
                "The repository": "仓库",
                "already exists on this account.": "已经存在于此帐户。",
                "Your new repository will be created as": "您的新仓库将被创建为",
                // 顶部提醒
                "Repository name was not changed": "仓库名称未更改",

            "Template repository": "模板库",
                "Template repositories let users generate new repositories with the same directory structure and files.": "模板仓库允许用户生成具有相同目录结构和文件的新仓库。",
                "A repository with LFS content cannot be used as a template.": "带有 LFS 内容的仓库不能作为模板使用。",
                "Learn more about template repositories": "了解更多关于模板库的信息",

                "Require contributors to sign off on web-based commits": "要求贡献者在基于 Web 的提交上签署",
                "Enabling this setting will require contributors to sign off on commits made through GitHub’s web interface. Signing off is a way for contributors to affirm that their commit complies with the repository's terms, commonly the": "启用此设置将要求贡献者签署通过 GitHub 的 Web 界面所做的提交。签署是贡献者确认他们的提交符合仓库条款的一种方式，通常是",
                "Developer Certificate of Origin (DCO)": "开发者原产地证书（DCO）",
                "Learn more about signing off on commits": "了解更多关于签署提交的信息",

            "Default branch": "默认分支",
            "The default branch is considered the “base” branch in your repository, against which all pull requests and code commits are automatically made, unless you specify a different branch.": "默认分支被认为是仓库中的 “基础” 分支，所有的拉取请求和代码提交都是针对该分支进行的，除非您指定一个不同的分支。",
            "Rename branch": "重命名分支",
                // 重命名分支对话框
                "Rename this branch": "重命名分支",
                "Rename": "重命名",
                "to:": "为：",
                // [/is already the branch name./, "已经是分支的名称了。"],
                // [/Your branch name will be/, "您的分支的名称将重命名为"],
                "Most projects name the default branch": "大多数项目将默认分支名为",
                "Renaming this branch:": "重命名此分支：",
                    // 该分支存在来自其他分支的拉取请求时
                        "Will update": "将更新",
                        "pull request targeting this branch.": "条针对该分支的拉取请求。",
                        "pull requests targeting this branch.": "条针对该分支的拉取请求。",
                        "branch protection rule that explicitly targets": "条分支保护规则明确针对",

                    // 该分支存在用于其他分支的拉取请求时
                        "Will close": "将关闭",
                        "open pull request for this branch.": "个该分支的拉取请求。",

                    // 重命名 GitHub Pages 所在分支
                        "Will unpublish current GitHub Pages site.": "将取消当前发布的 GitHub Pages 站点。",
                            "Your current GitHub Pages site will become unpublished. A new commit on the renamed branch will publish the GitHub Pages site again.": "您当前的 GitHub Pages 站点将被取消发布。重命名分支上的新提交将再次发布 GitHub Pages 站点。",

                    "Will not update your members' local environments.": "不会更新您成员的本地环境。",
                "Renaming this branch will not update your members' local environments.": "重命名此分支不会更新您成员的本地环境。",
                    "Your members will have to manually update their local environments. We'll let them know when they visit the repository, or you can share the following commands.": "您的成员将不得不手动更新他们的本地环境。我们会在他们访问仓库时通知他们，或者您可以共享以下命令。",
                "Saving…": "保存中…",

            "Switch to another branch": "切换到另一分支",
                // 分支切换对话框
                "Switch default branch to another branch": "将默认分支切换到另一分支",
                // [/Choose another branch to use as the default branch of ([^ ]+) instead of/,"选择另一分支作为 $1 的默认分支而不是"], // 分支切换 对话框
                "Update": "更新",
                "Switch default branch": "切换默认分支",
                "Filter branches": "筛选分支",
                "default": "默认",
                // 更新默认分支对话框
                "Update default branch": "更新默认分支",
                "Changing your default branch": "更改您的默认分支",
                "can have unintended consequences that can affect new pull requests and clones.": "可能会产生意想不到的后果，影响新的拉取请求和克隆。",
                "I understand, update the default branch.": "我明白了，依然更新默认分支",

            "Social Preview": "社交预览",
            // 关于私有库提醒
            "You can upload a social image, but it will not be visible publicly while": "您可以上传社交图片，但当",
            "is private.": "是私密时，它不会公开显示。",
            "Upload an image to customize your repository’s social media preview.": "上传图像以自定义仓库的社交媒体预览。",
            "Images should be at least 640×320px (1280×640px for best display).": "图片至少应为 640×320 像素（1280×640 像素以获得最佳显示效果）。",
            "Download template": "下载模板",
            "Edit": "编辑",
                "Upload an image…": "上传图片…",
                "Remove image": "删除图片",

            "Features": "功能",
            // "Wikis": "",
                "Wikis host documentation for your repository.": "Wikis 为您的仓库托管文档。",
                "Restrict editing to collaborators only": "仅限协作者进行编辑",
                "Restrict editing to users in teams with push access only": "仅限具有推送访问权限的团队中的成员进行编辑", //组织仓库
                    "Public wikis will still be readable by everyone.": "公共 Wikis 仍然可供所有人阅读。",

            // 私人库 启用 Wiki 提醒
                "Upgrade or make this repository public to enable Wikis": "升级或公开此仓库，以启用 Wiki",
                "GitHub Wikis is a simple way to let others contribute content. Any GitHub user can create and edit pages to use for documentation, examples, support, or anything you wish.": "GitHub Wikis 是一种让他人贡献内容的简单方法。任何 GitHub 用户都可以创建和编辑页面，用于文档、示例、支持或任何您想要的东西。",
                // "Upgrade": "升级",
                    "Learn more about wikis": "了解更多关于 Wiki 的信息",

            // 议题
            "Issues integrate lightweight task tracking into your repository. Keep projects on track with issue labels and milestones, and reference them in commit messages.": "议题将轻量级任务跟踪集成到您的仓库中。使用议题标签和里程碑保持项目正常运行，并在提交消息中引用它们。",
            "Get organized with issue templates": "使用议题模板进行组织",
            "Give contributors issue templates that help you cut through the noise and help them push your project forward.": "为贡献者提供议题模板，帮助您消除干扰并帮助他们推进您的项目。",
            "Set up templates": "设置模板",

            "Allow forking": "允许复刻", // 组织仓库
            "If disabled, existing forks will be unaffected.": "如果禁用，现有复刻将不受影响。", // 组织仓库

            // 赞助
            "Sponsorships": "赞助",
            "Sponsorships help your community know how to financially support this repository.": "赞助可帮助您的社区了解如何在资金上支持此仓库。",
            "Display a \"Sponsor\" button": "显示 “赞助” 按钮",
            "Add links to GitHub Sponsors or third-party methods your repository accepts for financial contributions to your project.": "添加指向 GitHub 赞助者或您的仓库接受的第三方收款链接，以便为您的项目提供资金捐助。",
            "Set up sponsor button": "设置赞助按钮",

            // 项目
            "Projects on GitHub help you organize and prioritize your work. You can create projects for specific feature work, comprehensive roadmaps, or even release checklists.": "GitHub 上的项目可以帮助您组织工作并确定其优先次序。您可以为特定的功能工作、全面的路线图、甚至是发布清单创建项目",

            "Preserve this repository": "保留这个仓库",
            "Include this code in the": "将此代码包含在",
            "GitHub Archive Program": "GitHub 存档计划中",

            "Table of contents": "目录",
            "Autogenerate table of contents for markdown files in this repository. the table of contents will be displayed near the top of the file.": "自动生成此仓库中 Markdown 文件的目录。目录将显示在文件顶部附近。",

            // "Discussions": "讨论",
            "Discussions is the space for your community to have conversations, ask questions and post answers without opening issues.": "讨论是您的社区进行对话、提问和发布答案的地方，而无需打开议题。",
            "Get started with Discussions": "开始讨论",
            "Engage your community by having discussions right in your repository, where your community already lives": "通过在您的社区已经存在的仓库中进行讨论来吸引您的社区",
            "Set up discussions": "建立讨论",

            // 项目
            "Projects on GitHub are created at the repository owner's level (organization or user) and can be linked to a repository's Projects tab. Projects are suitable for cross-repository development efforts such as feature work, complex product roadmaps or even Issue triage.": "GitHub 上的项目是在仓库所有者级别（组织或用户）创建的，并且可以链接到仓库的项目选项卡。项目适用于跨仓库的开发工作，例如功能工作、复杂的产品路线图，甚至问题分流。",

            // "Pull Requests": "拉取请求",
                "When merging pull requests, you can allow any combination of merge commits, squashing, or rebasing. At least one option must be enabled. If you have linear history requirement enabled on any protected branch, you must enable squashing or rebasing.": "当合并拉取请求时，您可以允许合并提交、压缩或变基的任意组合。必须至少启用一个选项。如果您在任何受保护分支上启用了线性历史要求，则必须启用压缩或变基。",

                "You must select at least one option": "您必须至少选择一个选项",
                "Allow merge commits": "允许合并提交",
                    "Add all commits from the head branch to the base branch with a merge commit.": "使用合并提交将所有从头部分支的提交添加到基础分支。",
                        "Default message": "默认信息",
                            "Default commit message presented when merging a pull request with merge.": "当合并拉取请求时显示的默认提交信息。",
                        "Default to pull request title": "默认为拉取请求标题",
                        "Default to pull request title and description": "默认为拉取请求标题和描述",

                "Allow squash merging": "允许压缩合并",
                    "Combine all commits from the head branch into a single commit in the base branch.": "将来自头部分支的所有提交合并到基础分支中的单个提交中。",
                        // "Default message": "默认信息",
                            "Default commit message presented when merging a pull request with squash.": "当用压缩合并拉取请求时显示的默认提交信息。",
                        "Default to pull request title and commit details": "默认为拉取请求标题和提交详细信息",

                    "Default to PR title for squash merge commits": "默认将拉取请求的标题作为压缩合并提交的信息",
                    "This will pre-populate the commit message with the PR title when performing a squash merge.": "在执行压缩合并时，将在提交信息中添加拉取请求的标题。",

                "Allow rebase merging": "允许变基合并",
                    "Add all commits from the head branch onto the base branch individually.": "将来自头部分支的所有提交单独添加到基础分支。",

                "Control how and when users are prompted to update their branches if there are new changes available in the base branch.": "如果基础分支中有可用的新更改，则控制提示用户更新其分支的方式和时间。",
                "Always suggest updating pull request branches": "始终建议更新拉取请求分支",
                    "Whenever there are new changes available in the base branch, present an “update branch” option in the pull request.": "每当基础分支中有可用的新更改时，就在拉取请求中显示 “更新分支” 选项。",

                "You can allow setting pull requests to merge automatically once all required reviews and status checks have passed.": "一旦所有必需的审查和状态检查都通过，您可以允许设置拉取请求自动合并。",

                "Allow auto-merge": "允许自动合并",
                    "Waits for merge requirements to be met and then merges automatically.": "等待满足合并要求，然后自动合并。",
                    "Why is this option disabled?": "为什么该选项被禁用？",

                "After pull requests are merged, you can have head branches deleted automatically.": "合并拉取请求后，您可以自动删除头部分支。",

                    "Automatically delete head branches": "自动删除头部分支",
                        "Deleted branches will still be able to be restored.": "删除的分支仍然可以恢复。",

            "Archives": "档案",
            "When creating source code archives, you can choose to include files stored using Git LFS in the archive.": "创建源代码存档时，您可以选择在存档中包含使用 Git LFS 存储的文件。",

            "Include Git LFS objects in archives": "在档案中包含 Git LFS 对象",
            "Git LFS usage in archives is billed at the same rate as usage with the client.": "归档中的 Git LFS 使用率与客户端的使用率相同。",

            "Pushes": "推送",
            "Limit how many branches and tags can be updated in a single push": "限制一次推送中可以更新多少个分支和标签",
                "Pushes will be rejected if they attempt to update more than this.": "如果推送尝试更新超过该值，则推送将被拒绝。",
                "Learn more about this setting": "了解更多关于此设置的信息",
                ", and send us your": "，并向我们发送您的",
                "feedback": "反馈",

                "Up to": "在一次推送中最多可以更新",
                "branches and tags can be updated in a push": "个分支和标签",

                // 提醒
                "Must be a whole number between 2 and 1000": "必须是 2 到 1000 之间的整数",

            "Danger Zone": "危险区",
            "Change repository visibility": "更改仓库可见性",
            "You cannot change the visibility of a fork. please": "您无法更改复刻仓库的可见性。请",
            "Duplicate the repository": "复制仓库",
            "For security reasons, you cannot change the visibility of a fork.": "出于安全原因，您无法更改复刻仓库的可见性。",

            // 更改仓库可见性对话框
            "Change visibility": "更改可见性",
                "Change to private": "更改为私有",
                "Change to public": "更改为公开",
            "This repository is currently public.": "该仓库当前是公开的。",
            "This repository is currently private.": "该仓库当前是私有的。",
            "I want to make this repository public": "我想将此仓库设为公开",
                "The code will be visible to everyone who can visit https://github.com": "所有可以访问 https://github.com 的人都可以看到代码",
                "Anyone can fork your repository.": "任何人都可以复刻您的仓库。",
                "Your changes will be published as activity.": "您的更改将作为活动发布。",
                "Make this repository public": "我想将此仓库设为公开",
            "I want to make this repository private": "我想将此仓库设为私有",
                "Making this repository private could permanently erase these counts by removing stars and watchers associated to users that will no longer have access to this repository:": "该仓库私有化，将会通过解除星标者和关注者，删除这些计数。他们将无法访问该仓库：",
                    "star": "星标者",
                    "stars": "星标者",
                    "watcher": "关注者",
                    "watchers": "关注者",
                "If you decide to make this repository public in the future, it will not be possible to restore these stars and watchers and this will affect its repository rankings.": "即使您决定将来公开此仓库，也无法恢复这些星标者和关注者，这将影响其仓库排名。",
                "Dependency graph and Dependabot alerts will remain enabled with permission to perform read-only analysis on this repository.": "依赖关系图和 Dependabot 警报将保持启用，并有权限对该仓库进行只读分析。",
                "Dependency graph and Dependabot alerts will remain enabled with permission to perform read-only analysis on this repository. Any custom Dependabot alert rules will be disabled unless GitHub Advanced Security is enabled for this repository.": "依赖关系图和 Dependabot 警报将继续启用，并允许对该仓库执行只读分析。除非为该仓库启用了 GitHub 高级安全功能，否则任何自定义的 Dependabot 警报规则都将被禁用。",
                "Code scanning will become unavailable.": "代码扫描将变得不可用。",
                "Current forks will remain public and will be detached from this repository.": "当前的复刻将保持公开，并将从该仓库中分离出来。",
                "Make this repository private": "将此仓库设为私有",
                "I have read and understand these effects": "我已阅读并理解这些影响",

                "Warning: this is a destructive action": "警告：这是一个破坏性的行为",
                "To confirm, type the number of stars on this repository in the box below": "要确认，请在下面的框中输入此仓库的星标数",

            "Disable branch protection rules": "禁用分支保护规则",
                "Disable branch protection rules enforcement and APIs": "禁用分支保护规则执行和 API",

                // 顶部提醒
                    "Branch protection settings saved.": "分支保护设置已保存。",

            // 禁用分支保护对话框
                "This will hide the branch protection settings and disable branch protection rules for this repository.": "这将隐藏分支保护设置，并禁用该仓库的分支保护规则。",
                "Disabling branch protection rules allows you to enforce branch and tag protections exclusively with Repository Rules.": "禁用分支保护规则后，允许您仅使用仓库规则来执行分支和标记保护。",

                "This action will disable:": "此操作将禁用：",
                    "Branch protection rule enforcement": "分支保护执行",
                    "Branch protection rule APIs": "分支保护 API",
                // [/(\d+) branch protection rules?/, "$1 项分支保护规则"],
                "will be disabled as part of this action": "作为此操作的一部分将被禁用",

            "Re-enable branch protection rules": "重新启用分支保护规则",
                "Re-enable branch protection rules enforcement and APIs": "重新启用分支保护规则执行和 API",

            // 重新启用分支保护对话框
                "Re-enable branch protection": "重新启用分支保护",
                "will be re-enabled as part of this action": "作为此操作的一部分将被重新启用",

            "Transfer ownership": "转让所有权",
            "Transfer": "转让",
            "Transfer this repository to another user or to an organization where you have the ability to create repositories.": "将此仓库转让给另一位用户或您可以创建仓库的组织。",

            "Archive this repository": "存档仓库",
            "Mark this repository as archived and read-only.": "将此仓库标记为已存档和只读。",

            // 存档仓库对话框
            "Archive repository": "存档仓库",
            "This repository will become read-only.": "该仓库将设置为只读。",
            "You will still be able to fork the repository and unarchive it at any time.": "您仍然可以随时访问复刻仓库并取消存档。",
            "Unexpected bad things will happen if you don’t read this!": "如果您不阅读此说明，将会发生意想不到的事情！",
            "All scheduled workflows will stop running.": "所有预定的工作流程将停止运行。",
            "Security features will be unavailable:": "安全功能将无法使用：",
            "Code scanning": "代码扫描",
            "Before you archive, please consider:": "在您存档之前，请考虑：",
            "Updating any repository settings": "更新仓库设置",
            "Closing all open issues and pull requests": "关闭所有打开的议题和拉取请求",
            "Making a note in your README": "在您的 README 中做个说明",
            "Please type": "请键入",
            "to confirm.": "进行确定。",
            "I understand the consequences, archive this repository": "我明白后果，依然存档该仓库",
            // "This repository has been archived by the owner. It is now read-only.": "此仓库已由所有者存档。它现在是只读的。",

            // 顶部提醒
            // [/Your repository \"([^ ]+)\" was successfully archived./, "您的仓库 “$1” 已成功存档。"], //仓库存档

            "Unarchive this repository": "解除仓库存档",
            "Mark this repository as unarchived and read-write.": "将此仓库标记为未存档和可读写。",

            // 解除仓库存档对话框
            "Unarchive repository": "解除仓库存档",
            "This will make": "这将使",
            "read-write.": "可读写。",
            "Once unarchived, the following can be modified and commented on:": "一旦解除存档，就可以对以下内容进行修改和评论：",
            "Pull Requests": "拉取请求",
            "Labels": "标签",
            "Releases": "发行版",
            "Milestones": "里程碑",
            "Security features will become available:": "安全功能将不可用：",
            "I understand the consequences, unarchive this repository": "我明白后果，依然解除该仓库存档",

            "Delete this repository": "删除仓库",
            "Once you delete a repository, there is no going back. Please be certain.": "您一旦删除仓库，将再也无法恢复。请确认。",

            // 顶部提醒
            // [/Your repository \"([^ ]+)\" was successfully unarchived./, "您的仓库 “$1” 已成功解除存档。"], //仓库解除存档

            // 删除仓库对话框
                // [/Delete/, "删除"],
                "I want to delete this repository": "我想删除这个仓库",

                "This will permanently delete the": "这将永久删除",
                "repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations.": "仓库、Wiki、议题、评论、软件包、密钥、工作流程，并删除所有协作者关联。",
                "repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all team associations.": "仓库、Wiki、议题、评论、软件包、密钥、工作流程，并删除所有团队关联。", // 组织仓库
                "This will not change your billing plan. If you want to downgrade, you can do so in your Billing Settings.": "这并不会更改您的结算方案。 如果您想降级，可以在结算设置中进行降级。",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/is available./, "名称可用。"],
        [/Make ([^ ]+) private/, "将 $1 设为私有"],
        [/Make ([^ ]+) public/, "将 $1 设为公开"],
        [/(\d+) stars?/, "$1 位星标者"],
        [/(\d+) watchers?/, "$1 位关注者"],
        [/To confirm, type \"([^ ]+)\" in the box below/, "要确认，请在下面的方框中输入 \"$1\""],
        [/Your repository \"([^ ]+)\" was successfully archived./, "您的仓库 “$1” 已成功存档。"], //仓库存档
        [/Your repository \"([^ ]+)\" was successfully unarchived./, "您的仓库 “$1” 已成功解除存档。"], //仓库解除存档
        [/is already the branch name./, "已经是分支的名称了。"],
        [/Your branch name will be/, "您的分支的名称将重命名为"],
        [/Choose another branch to use as the default branch of ([^ ]+) instead of/,"选择另一分支作为 $1 的默认分支而不是"], // 分支切换 对话框
        [/(\d+) branch protection rules?/, "$1 项分支保护规则"], // 禁用/重启启用分支保护
        [/Delete/, "删除"],
    ],
};

I18N.zh["repository/settings/access"] = { // 仓库设置 - 协作者/(组织仓库 协作者和团队) /<user-name>/<repo-name>/settings/access
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 协作者 / 协作者和团队 - 访问管理页面 /<user-name>/<repo-name>/settings/access ====================================
            // 顶部提醒
                "Repository invitation URLs work for invited users only. You may only share this URL with an invited user.": "仓库邀请 URL 仅适用于受邀请的用户。您只能与受邀请的用户共享此 URL。",

            "Who has access": "谁有权访问",
            "public repository": "公共仓库",
            "This repository is public and visible to anyone.": "该仓库是公开的，对任何人都可见。",
            "private repository": "私有仓库",
            "Only those with access to this repository can view it.": "只有拥有该仓库访问权的用户才能查看。",
            "Manage": "管理",

            "Direct access": "直接访问",
            "collaborators have access to this repository. Only you can contribute to this repository.": "个协作者有权访问此仓库。 只有您可以对此仓库做出贡献。",
            "has access to this repository.": "位有权访问此仓库。",
            // 组织仓库
            "teams or members have access to this repository. Only": "团队或成员有权访问此仓库。只有",
            "Owners": "所有者",
            "can contribute to this repository.": "可以为此仓库做出贡献。",

            // 组织仓库
            "Base role": "基本角色",
            "All": "所有",
            // [/(\d+) members?/, "$1 位成员"],
            "can access this repository.": "可以访问此仓库。",

            "Manage access": "访问管理",
            "You haven't invited any collaborators yet": "您尚未邀请任何协作者",
            // "invite a collaborator": "邀请协作者",
            "Add people": "添加他人",

            "Select all": "全选",
                // [/(\d+) members? selected…/, "已选择 $1 名成员..."],
                "Remove Access": "删除访问权限",
            "Type": "类型",
                "Filter by member type": "按成员类型筛选",
                    "Pending Invitations": "待处理邀请",
            "Find a collaborator…": "寻找协作者...",

            "Pending Invite": "待处理邀请",
            // [/Awaiting ([^ ]+)’s response/, "等待 $1 的回复"],
            "Remove": "移除",

            // 邀请对话框
                "Add a collaborator to": "添加协作者到",
                "Search by username, full name, or email": "搜索用户名、全名、或电子邮箱",
                "Select a collaborator above": "从上方选择协作者",
                "Invite collaborator": "邀请协作者",
                "Add": "添加",
                "to this repository": "到这个仓库",

            // 组织仓库
            "Create team": "创建组织",
            "You haven't added any teams or people yet": "您尚未添加团队或成员",
            "Organization owners can manage individual and team access to the organization's repositories. Team maintainers can also manage a team's repository access.": "组织所有者可以管理成员和团队对组织仓库的访问。团队维护者也可以管理一个团队的仓库访问。",
            "Learn more about organization access": "了解更多关于组织访问权限的信息",
            "Add teams": "添加团队",

            "Add people to": "添加成员到",
            "Select a member above": "在上面选择一名成员",
            "Add teams to": "添加团队",
            "Search by team name": "按团队名称搜索",
            "Select a team above": "在上面选择一个团队",

    },
    "regexp": [ // 正则翻译
        [/(\d+) members? selected…/, "已选择 $1 名成员..."],
        [/(\d+) members?/, "$1 位成员"],
        [/(\d+) collaborators?/, "$1 位合作者"],
        [/(\d+) invitations?/, "$1 个邀请"],
        [/Awaiting ([^ ]+)’s response/, "等待 $1 的回复"],
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/settings/interaction_limits"] = { // 仓库设置 - 互动限制 /<user-name>/<repo-name>/settings/interaction_limits
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 审查设置 (仓库)互动限制 /<user-name>/<repo-name>/settings/interaction_limits
        // 同全局 同组织仓库
            "Temporary interaction limits": "临时互动限制",
            "Temporarily restrict which external users can interact with your repository (comment, open issues, or create pull requests) for a configurable period of time.": "在配置的时间段内，可临时限制哪些外部用户与您的仓库互动（评论、打开议题或创建拉取请求）。",
            "This may be used to force a \"cool-down\" period during heated discussions or prevent unwanted interactions.": "可用于在激烈讨论期间，强制进入 “冷静” 期或防止不必要的互动。",

            "You can restrict repository interactions across your account in your": "您可以限制仓库交互，在您的帐户设置中的",
            "account settings": "互动限制",

            // [/You can restrict repository interactions across the ([^ ]+) organization in your/, "您可以在您的 $1 组织中限制仓库交互"],

            "Limit to existing users": "仅限现有用户",
                "Users that have recently created their account will be unable to interact with the repository.": "最近创建帐户的用户将无法与该仓库互动。",
            "Limit to prior contributors": "仅限于先前的贡献者",
                "Users that have not previously": "以前从未",
                "committed": "提交",
                // [/to the ([^ ]+) branch of this repository will be unable to interact with the repository./, "到该仓库的 $1 分支的用户将无法与该仓库互动。"],
            "Limit to repository collaborators": "仅限仓库协作者",
                "Users that are not": "不是",
                // "collaborators": "",
                // "of one of your repositories will not be able to interact with that repository.": "",
                "will not be able to interact with the repository.": "将无法与该仓库互动。",

            "New users": "新用户",
            "Users": "用户",
            "Contributors": "贡献者",
            "Collaborators": "协作者",
            "Organization members": "组织成员", //组织仓库

            "Enable": "启用",
            "Disable": "禁用",
            // 交互限制时间 下拉菜单
            "Enable interaction limits for:": "启用交互限制：",
            "24 hours": "24 小时",
            "3 days": "3 天",
            "1 week": "1 周",
            "1 month": "1 个月",
            "6 months": "6 个月",

            // 顶部提醒
            "Repository interaction limit settings saved.": "仓库交互限制设置已保存。",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
            [/You can restrict repository interactions across the ([^ ]+) organization in your/, "您可以在您的 $1 组织中限制仓库交互"],
            [/to the ([^ ]+) branch of this repository will be unable to interact with the repository./, "到该仓库的 $1 分支的用户将无法与该仓库互动。"],
    ],
};

I18N.zh["repository/settings/code_review_limits"] = { // 仓库设置 - 代码审查限制 /<user-name>/<repo-name>/settings/code_review_limits
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // Code review limits 代码审查限制 /<user-name>/<repo-name>/settings/code_review_limits
            "Restrict users who are permitted to approve or request changes on pull requests in this repository.": "限制允许批准或请求更改该仓库中拉取请求的用户。",
            "Limit to users explicitly granted": "限于明确授予",
            "read": "读取",
            "or higher access": "或 更高权限的用户",
                "When enabled, only users explicitly granted access to this repository will be able to submit pull request reviews that \"approve\" or \"request changes\". All users able to submit comment pull request reviews will continue to be able to do so.": "启用后，只有被明确授予该仓库访问权的用户才能提交 “批准” 或 “请求更改” 的拉取请求审查。所有能够提交评论拉取请求审查的用户将继续能够这样做。",

            // 顶部提醒
                "Code review limit settings saved.": "代码审查限制设置已保存。",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/settings/branches"] = { // 仓库设置 - 分支 /<user-name>/<repo-name>/settings/branches
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 分支管理页面 /<user-name>/<repo-name>/settings/branches====================================
            "Branch protection rules": "分支保护规则",
            "Add rule": "添加规则",

            "Define branch protection rules to disable force pushing, prevent branches from being deleted, and optionally require status checks before merging. New to branch protection rules?": "定义分支保护规则，以禁止强制推送，防止分支被删除，并可选择要求在合并前进行状态检查。初次接触分支保护规则？",

            "No branch protection rules defined yet.": "尚未定义分支保护规则。",

            "You haven't protected any of your branches": "您没有保护任何分支",
            "Define a protected branch rule to disable force pushing, prevent branches from being deleted, and optionally require status checks before merging.": "定义分支保护规则，以禁用强制推送，防止分支被删除，并可选择在合并前进行状态检查。",
            "Learn more about protected branches": "了解更多关于受保护分支的信息",
            "Add branch protection rule": "添加分支保护规则",

            // 私有库 分支保护 未执行 提醒
            "Your protected branch rules won't be enforced on this private repository until you move to a GitHub Team or Enterprise organization account.": "您的受保护分支规则不会在这个私有仓库上执行，直到您迁移至 GitHub 团队或企业组织账户。",
            "Move to an organization": "转移到组织",

            "Not enforced": "未执行",
                "Rules on your private repos can't be enforced until you upgrade to GitHub Team or Enterprise.": "在您升级到 GitHub 团队或企业版之前，您的私有仓库的规则不能被执行。",

            // [/Currently applies to (\d+) branchs?/, "目前适用于 $1 个分支"], // 仓库设置-->分支-->分支保护规则

            // 删除分支保护规则
            "Delete this branch protection rule?": "删除此分支保护规则？",
            "This action cannot be undone.": "此操作无法撤消。",
            "I understand, delete this rule.": "我明白了，依然删除此规则。",

            // 顶部提醒
            "Branch protection rule settings saved.": "分支保护规则设置已保存。",
            "Branch protection rule created.": "分支保护规则已创建。",
            "Branch protection rule was successfully deleted.": "分支保护规则已成功删除。",


    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Currently applies to (\d+) branch(|es)/, "目前适用于 $1 个分支"], // 仓库设置-->分支-->分支保护规则
    ],
};

I18N.zh["repository/settings/branch_protection_rules"] = { // 仓库设置 - 分支/分支保护 /<user-name>/<repo-name>/settings/branch_protection_rules
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 新建分支保护规则 页面 /<user-name>/<repo-name>/settings/branch_protection_rules/new====================================
            "Branch protection rule": "分支保护规则",

            "Protect your most important branches": "保护您最重要的分支",
                "Branch protection rules": "分支保护规则",
                "define whether collaborators can delete or force push to the branch and set requirements for any pushes to the branch, such as passing status checks or a linear commit history.": "定义协作者是否可以删除或强制推送到分支，并对任何推送到分支的内容设置要求，如通过状态检查或线性提交历史。",
                "Your GitHub Free plan": "您的 GitHub 免费计划",
                "can only enforce rules on its public repositories, like this one.": "只能对其公共仓库执行规则，例如这个。",
                "Your rules won't be enforced on this private repository until": "您的规则将不会在此私有仓库上强制执行，直到",
                "move to a GitHub Team or Enterprise organization account": "迁移至 GitHub 团队或企业组织账户",
                "Your rules won't be enforced on this private repository until you": "您的规则将不会在此私有仓库上强制执行，直到您",
                "upgrade this organization account to GitHub Team or Enterprise": "升级组织账户至 GitHub 团队或企业版", // 组织

            "Branch name pattern": "分支名称模式",
            "Protect matching branches": "保护匹配的分支",
            "Require a pull request before merging": "要求在合并前提交拉取请求",
            "When enabled, all commits must be made to a non-protected branch and submitted via a pull request before they can be merged into a branch that matches this rule.": "启用后，所有提交都必须提交到不受保护的分支，并通过拉取请求提交，然后才能将它们合并到与此规则匹配的分支中。",
                "Require approvals": "需要批准",
                "When enabled, pull requests targeting a matching branch require a number of approvals and no changes requested before they can be merged.": "启用后，针对匹配分支的拉取请求需要经过多次批准，并且在合并之前不需要更改。",
                "Required number of approvals before merging:": "合并前所需的审批数量：",
                "Dismiss stale pull request approvals when new commits are pushed": "当新的提交被推送时，撤销陈旧的拉取请求审批",
                "New reviewable commits pushed to a matching branch will dismiss pull request review approvals.": "推送到匹配分支的新的可审查提交将撤销拉取请求的审查批准。",
                    "Require review from Code Owners": "要求代码所有者的审查",
                    "Require an approved review in pull requests including files with a designated code owner.": "要求在拉取请求中进行批准审查，包括有指定代码所有者的文件。",
                    "Require approval of the most recent reviewable push": "要求批准最近一次可审查的推送",
                        "Whether the most recent reviewable push must be approved by someone other than the person who pushed it.": "最近一次可审核的推送是否必须得到推送者以外的人批准。",
                "Require status checks to pass before merging": "要求在合并前通过状态检查",
                "Choose which": "选择那些",
                "status checks": "状态检查",
                "must pass before branches can be merged into a branch that matches this rule. When enabled, commits must first be pushed to another branch, then merged or pushed directly to a branch that matches this rule after status checks have passed.": "必须通过，才能将分支合并到符合此规则的分支。启用后，提交的内容必须先推送到另一个分支，然后在状态检查通过后再合并或直接推送到符合此规则的分支。",
                    "Require branches to be up to date before merging": "要求分支在合并前必须是最新的",
                "This ensures pull requests targeting a matching branch have been tested with the latest code. This setting will not take effect unless at least one status check is enabled (see below).": "这可确保针对匹配分支的拉取请求已使用最新的代码进行了测试。除非启用了至少一个状态检查，否则这个设置不会生效（见下文）。",
                "Search for status checks in the last week for this repository": "搜索此仓库最近一周的状态检查",
                "Status checks that are required.": "需要进行的状态检查。",
            "Require conversation resolution before merging": "要求在合并前解决对话",
            "When enabled, all conversations on code must be resolved before a pull request can be merged into a branch that matches this rule.": "启用后，必须先解决所有有关代码的对话，然后才能将拉取请求合并到与此规则匹配的分支中。",
            "Learn more about requiring conversation completion before merging": "了解更多关于合并前要求完成对话的信息",
            "Require signed commits": "要求带签名的提交",
            "Commits pushed to matching branches must have verified signatures.": "推送到匹配分支的提交必须带有经过验证的签名。",
            "Require linear history": "要求线性历史记录",
            "Prevent merge commits from being pushed to matching branches.": "防止合并后的提交被推送到匹配的分支。",
            "Require deployments to succeed before merging": "要求部署成功后再合并",
                "Choose which environments must be successfully deployed to before branches can be merged into a branch that matches this rule.": "选择必须成功部署到哪些环境才能将分支合并到与此规则匹配的分支中。",
                        "No deployment environments found": "尚无部署环境",
                        "Sorry, we couldn’t find any deployments for this repository.": "抱歉，我们找不到此仓库的任何部署。",
                        "Deployment environments found in this repository": "在此仓库中找到的部署环境",
            "Lock branch": "锁定分支",
                "Branch is read-only. Users cannot push to the branch.": "分支为只读。用户无法推送到该分支。",
            "Do not allow bypassing the above settings": "不允许绕过上述设置",
                "The above settings will apply to administrators and custom roles with the \"bypass branch protections\" permission.": "上述设置将应用于具有 “绕过分支保护” 权限的管理员和自定义角色。",
            "Restrict who can push to matching branches": "限制谁可以推送到匹配的分支",
                "Specify people, teams, or apps allowed to push to matching branches. Required status checks will still prevent these people, teams, and apps from merging if the checks fail.": "指定允许推送到匹配分支的人员、团队或应用。如果检查失败，所需的状态检查仍然会阻止这些人、团队和应用的合并。",

            "Include administrators": "包括管理员",
            "Enforce all configured restrictions above for administrators.": "对管理员执行上述所有配置进行限制。",

            "Rules applied to everyone including administrators": "规则适用于每个人，包括管理员",
            "Allow force pushes": "允许强制推送",
                "Permit force pushes for all users with push access.": "允许所有有推送权限的用户强制推送。",
                "Specify who can force push": "指定谁可以强制推送",
                    "Only these people, teams, or apps are allowed to force push.": "仅允许这些人、团队或应用强制推送。",
                    "Search for people, teams, or apps": "搜索人员、团队或应用",
                    "People, teams, or apps who can force push": "可以强制推送的人员、团队或应用",
                        "Organization and repository administrators (automatic)": "组织和仓库管理员（自动）",
            "Allow deletions": "允许删除",
            "Allow users with push access to delete matching branches.": "允许有推送权限的用户删除匹配的分支。",

            "Create": "创建",

            // 顶部提醒
            "Branch protection rule created.": "分支保护规则已创建。",

        // 编辑分支保护规则 页面 /<user-name>/<repo-name>/settings/branch_protection_rules/<id>===================================
            // [/Applies to (\d+) branchs?/, "应用于 $1 个分支"], //仓库设置-->分支-->分支保护规则-->编辑

            "Save changes": "保存更改",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Applies to (\d+) branch(|es)/, "应用于 $1 个分支"], //仓库设置-->分支-->分支保护规则-->编辑
    ],
};

I18N.zh["repository/settings/tag_protection"] = { // 仓库设置 - 标签 /<user-name>/<repo-name>/settings/tag_protection
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 标签 页面 /<user-name>/<repo-name>/settings/tag_protection===============================
            "Protected tags": "受保护的标签",
            "Protected tags are available to Pro, Team, and Enterprise users": "专业版、团队版和企业版用户均可使用受保护的标签", //私有库
            "Protected tags can only be created or deleted by users with enhanced permissions defined by your organization owners.": "受保护的标签只能由具有由组织所有者定义的增强权限的用户创建或删除。",
            "Learn more about protected tags": "了解更多关于受保护标签的信息",
            "No protected tag rules exist yet": "尚无受保护的标签规则存在",
            "New rule": "新建规则",

        // 新建标签规则 页面 /<user-name>/<repo-name>/settings/tag_protection/new===============================
            "/ New rule": "/ 新建规则",
            "Tag name pattern": "标签名称模式",
            "Example: You can use": "示例：您可以使用",
            "to target tags named": "来锁定名为",
            ", and so on.": "等的标签。",

            "Add rule": "添加规则",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/settings/rules"] = { // 仓库设置 - 规则 /<user-name>/<repo-name>/settings/rules
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],
        ...I18N.zh["orgs-settings-menu"]["static"], // 组织设置

        // 规则 页面 /<user-name>/<repo-name>/settings/rules===============================
            "Rulesets": "规则集",
            "New ruleset": "新建规则集",
                "New branch ruleset": "新建分支规则集",
                    "New tag ruleset": "新建标签规则集",
                    "Import a ruleset": "导入规则集",

            "Organization Rulesets are only available with GitHub Enterprise. Upgrade your account to activate these rulesets.": "组织规则集仅适用于 GitHub 企业版。升级您的账户以激活这些规则集。", // 组织设置

            // 切换分支/标签 下拉菜单
                "Switch branches/tags": "切换分支/标签",
                "Find a branch...": "查找分支...",
                "All": "所有",
                "default": "默认",
                "View all rules": "查看全部规则",
                "Find a tag...": "查找标签...",
                "Nothing to show": "暂无",
            "No rulesets have been added yet": "尚未添加任何规则集",
            "• targeting": "• 针对",

        // 新建分支规则 /<user-name>/<repo-name>/settings/rules/new?target=branch&enforcement=disabled
            "This ruleset does not target any resources and will not be applied.": "此规则集不针对任何资源，因此不会应用。",
            "This ruleset is disabled. The rules below will not be enforced.": "此规则集已禁用。以下规则将不会被强制执行。",
            "This ruleset will not be enforced until this organization account is upgraded to GitHub Team or Enterprise.": "在将此组织帐户升级到 GitHub 团队版或企业版之前，不会强制执行此规则集。", //组织仓库设置
            "Organization Rulesets are only available with GitHub Enterprise. Upgrade your account to activate this ruleset.": "组织规则集仅适用于 GitHub 企业版。升级您的账户以激活此规则集。", // 组织设置

            "Ruleset Name": "规则集名称",
                "Ruleset name cannot be empty": "规则集名称不能为空",
            "Enforcement status": "执行状态",
                "Active": "激活",
                    "Rules will be enforced": "规则将被执行",
                    "Enable Organization Ruleset": "启用组织规则集", // 组织设置
                        "I want rules enforced on targeted repositories in this ruleset.": "我希望此规则集中强制执行针对目标仓库的规则。",
                "Evaluate": "评估", // 组织设置
                    "Evaluate Rulesets to trial rules and view insights": "评估规则集，以试用规则并查看洞察",
                    "Evaluate mode is only available to Enterprise organizations.": "评估模式仅适用于企业组织。",
                "Disabled": "禁用",
                    "Do not evaluate or enforce rules": "不评估或执行规则",
            "Bypass mode": "旁路模式",
                "Not permitted": "不允许",
                    "All users in the organization will be subject to these rules": "组织中的所有用户都将遵守这些规则",
                "Repository bypass permitted": "允许仓库绕过",
                    "Organization Administrators, Repository Administrators, and users with Repository bypass permissions can bypass these rules within their repository": "组织管理员、仓库管理员和具有仓库旁路权限的用户可以在他们的仓库中绕过这些规则",
                "Organization bypass permitted": "允许组织绕过", // 组织设置
                    "Organization administrators and users with Organizational bypass permissions can bypass these rules": "组织管理员和具有组织旁路权限的用户可以绕过这些规则",
                "Determines who can bypass this ruleset.": "确定谁可以绕过此规则集。",

            "Bypass list": "旁路列表",
                "Add bypass": "添加旁路",

                 // 添加旁路对话框
                    "Choose which roles, teams, and apps can bypass this ruleset": "选择哪些角色、团队和应用可绕过此规则集",

                    "Suggestions": "建议",
                        "Role": "角色",
                        "App": "应用",
                        "Organization admin": "组织管理员",
                        "Repository admin": "仓库管理员",
                        "Maintain": "维护",
                        "triage": "分类",
                        "maintain": "维持",
                        "read": "读取",
                        "write": "写入",
                        "vulnerability_reporter": "漏洞报告员",
                        "Add selected": "添加所选",

                "Add a team or app to the bypass list": "将团队或应用添加到旁路列表",
                "Add a team to the bypass list": "将团队添加到旁路列表", // 组织设置

                "Bypass list is empty": "旁路列表为空",
                "Exempt teams or apps from this ruleset by adding them to the bypass list": "通过将团队或应用添加到旁路列表中，使其免于此规则集",
                "Exempt roles": "豁免角色",
                ", teams, or apps": "团队或应用",
                "from this ruleset by adding them to the bypass list": "在用于规则，通过将它们添加到旁路列表",

            "Target repositories": "目标仓库",
                "Add target": "添加目标",
                "Repository targeting determines which repositories will be protected by this ruleset. Use inclusion patterns to expand the list of repositories under this ruleset. Use exclusion patterns to exclude repositories.": "仓库目标决定了哪些仓库将受此规则集保护。使用包含规则来扩展此规则集下的仓库列表。使用排除规则来排除仓库。",

                "Target:": "目标：",
                    // 所有仓库
                        "Target all repositories within the organization": "目标是针对组织内的所有仓库。",
                    "Dynamic list of repositories": "动态仓库列表",
                        "Target repositories based on name": "基于名称的目标仓库",
                    "Select repositories": "选定的仓库",
                        "Target a specific list of selected repositories": "以选定的仓库的特定列表为目标",

                "Targeting criteria": "目标定位条件",
                    "All Repositories": "所有仓库",
                    "No repository targets have been added yet": "尚未添加仓库目标",
                    "Repository targeting determines which repositories will be protected by this ruleset.": "仓库目标决定了哪些仓将受此规则集保护。",

                "Prevent renaming of target repositories": "防止重命名目标仓库",
                    "When checked, target repositories can only be renamed by those with bypass permission.": "勾选后，目标仓库只能由具有旁路权限的人重命名。",

                "All repositories": "所有仓库",
                "Targets have changed and repository match list will update on save.": "目标已更改，仓库匹配列表将在保存时更新。",

                "Repositories that match the matching pattern will be targeted by this ruleset.": "与匹配规则相匹配的仓库将成为此规则集的目标。",
                "Repositories that do not match the matching pattern will be targeted by this ruleset.": "与匹配规则不匹配的仓库将成为此规则集的目标。",

            "Target branches": "目标分支",
                "Add a target": "添加分支",
                    "Include default branch": "包含默认分支",
                    "Include all branches": "包含所有分支",
                    "Target by inclusion or exclusion pattern": "通过包含或排除规则确定目标",
                    "Include by pattern": "包含规则",
                    "Exclude by pattern": "排除规则",

                "Branch targeting has not been configured": "尚未配置分支目标",
                    "targeting determines which": "目标决定了",
                    "branches": "分支",
                    "will be protected by this ruleset. Use inclusion patterns to expand the list of": "将受此规则集保护。使用包含规则来扩展此规则集下的列表",
                    "under this ruleset. Use exclusion patterns to exclude": "使用排除规则来排除",

                "Default": "默认",
                "All branches": "所有分支",
                "Targets have changed and branch match list will update on save.": "目标已更改，分支匹配列表将在保存时更新。",

                // 包含规则 对话框
                    "Branches that match the matching pattern will be targeted by this ruleset.": "与匹配规则相匹配的分支将成为该规则集的目标。",
                    "naming pattern": "命名规则",
                        "Pattern cannot be empty": "规则不能为空",
                    "Example patterns: \"": "示例：\"",
                    "Learn more about fnmatch": "了解更多关于 fnmatch 的信息",
                    "Add Inclusion pattern": "添加包含规则",

                // 排除规则 对话框
                    "Branches that do not match the matching pattern will be targeted by this ruleset.": "与匹配规则不匹配的分支将成为该规则集的目标。",
                    "Add Exclusion pattern": "添加排除规则",

            "Branch protections": "分支保护",
                "Restrict creations": "限制创建",
                    "Only allow users with bypass permission to create matching refs.": "只允许具有绕过权限的用户创建匹配的引用。",
                "Restrict updates": "限制更新",
                    "Only allow users with bypass permission to update matching refs.": "只允许具有绕过权限的用户更新匹配的引用。",
                "Restrict deletions": "限制删除",
                    "Only allow users with bypass permissions to delete matching refs.": "只允许具有绕过权限的用户删除匹配的引用。",
                "Require linear history": "需要线性历史",
                    "Prevent merge commits from being pushed to matching refs.": "防止合并后的提交被推送到匹配的引用。",
                "Require deployments to succeed": "要求部署成功",
                    "Choose which environments must be successfully deployed to before refs can be pushed into a ref that matches this rule.": "选择必须成功部署到哪些环境,7，才能将引用推送到与此规则匹配的引用中。",
                "Require signed commits": "要求带签名的提交",
                    "Commits pushed to matching refs must have verified signatures.": "推送到匹配引用的提交必须带有经过验证的签名。",
                "Require a pull request before merging": "要求在合并前提交拉取请求",
                    "Require all commits be made to a non-target branch and submitted via a pull request before they can be merged.": "要求所有的提交都必须在非目标分支上进行，并在合并前通过拉取请求提交。",
                "Require status checks to pass": "要求通过状态检查",
                    "Choose which status checks must pass before the ref is updated. When enabled, commits must first be pushed to another ref where the checks pass.": "更新引用之前必须选择通过哪些状态检查。启用后，提交必须首先推送到检查通过的另一个引用。",
                "Block force pushes": "阻止强制推送",
                    "Prevent users with push access from force pushing to refs.": "防止具有推送权限的用户强制推送到引用。",

            "Metadata": "元数据", // 组织设置
            "restrictions": "限制",
                "No metadata restrictions have been added": "尚无元素限制",
                "Learn more about": "了解更多关于",
                "metadata": "元素",

                // 添加元数据限制 对话框
                    "Add a metadata restriction": "添加元数据限制",
                        "Restrict commit author email addresses, committer email addresses, commit message content, and other metadata": "限制提交作者电子邮箱地址、提交者电子邮箱地址、提交消息内容和其他元数据",
                        "Applies To": "适用于",
                            "Commit message": "提交信息",
                            "Author email": "作者电子邮箱地址",
                            "Committer email": "提交者电子邮箱地址",
                            "Branch name": "分支名称",
                        "Requirement": "要求",
                            "Must": "必须",
                            "start with a matching pattern": "以匹配规则开头",
                            "end with a matching pattern": "以匹配规则结束",
                            "contain a matching pattern": "包含匹配规则",
                            "match a given regex pattern": "匹配给定的正则表达式规则",
                            "Must not": "不得",
                        "Matching pattern": "匹配规则",
                        "Description": "描述",
                            // [/Commit message must start with a matching pattern/, "提交信息必须以匹配规则开头"],
                            // [/Commit message must end with a matching pattern/, "提交信息必须以匹配规则结束"],
                            // [/Commit message must contain with a matching pattern/, "提交信息必须包含匹配规则"],
                            // [/Commit message must match a given regex pattern/, "提交信息必须匹配给定的正则表达式规则"],
                            // [/Commit message must not start with a matching pattern/, "提交信息不得以匹配规则开头"],
                            // [/Commit message must not end with a matching pattern/, "提交信息不得以匹配规则结束"],
                            // [/Commit message must not contain a matching pattern/, "提交信息不得包含匹配规则"],
                            // [/Commit message must not match a given regex pattern/, "提交信息不得匹配给定的正则表达式规则"],

                            // [/Author email must start with a matching pattern/, "作者电子邮箱地址必须以匹配规则开头"],
                            // [/Author email must end with a matching pattern/, "作者电子邮箱地址必须以匹配规则结束"],
                            // [/Author email must contain a matching pattern/, "作者电子邮箱地址必须包含匹配规则"],
                            // [/Author email must match a given regex pattern/, "作者电子邮箱地址必须匹配给定的正则表达式规则"],
                            // [/Author email must not start with a matching pattern/, "作者电子邮箱地址不得以匹配规则开头"],
                            // [/Author email must not end with a matching pattern/, "作者电子邮箱地址不得以匹配规则结束"],
                            // [/Author email must not contain a matching pattern/, "作者电子邮箱地址不得包含匹配规则"],
                            // [/Author email must not match a given regex pattern/, "作者电子邮箱地址不得匹配给定的正则表达式规则"],

                            // [/Committer email must start with a matching pattern/, "提交者电子邮箱地址必须以匹配规则开头"],
                            // [/Committer email must end with a matching pattern/, "提交者电子邮箱地址必须以匹配规则结束"],
                            // [/Committer email must contain a matching pattern/, "提交者电子邮箱地址必须包含匹配规则"],
                            // [/Committer email must match a given regex pattern/, "提交者电子邮箱地址必须匹配给定的正则表达式规则"],
                            // [/Committer email must not start with a matching pattern/, "提交者电子邮箱地址不得以匹配规则开头"],
                            // [/Committer email must not end with a matching pattern/, "提交者电子邮箱地址不得以匹配规则结束"],
                            // [/Committer email must not contain a matching pattern/, "提交者电子邮箱地址不得包含匹配规则"],
                            // [/Committer email must not match a given regex pattern/, "提交者电子邮箱地址不得匹配给定的正则表达式规则"],

                            // [/Branch name must start with a matching pattern/, "分支名称必须以匹配规则开头"],
                            // [/Branch name must end with a matching pattern/, "分支名称必须以匹配规则结束"],
                            // [/Branch name must contain a matching pattern/, "分支名称必须包含匹配规则"],
                            // [/Branch name must match a given regex pattern/, "分支名称必须匹配给定的正则表达式规则"],
                            // [/Branch name must not start with a matching pattern/, "分支名称不得以匹配规则开头"],
                            // [/Branch name must not end with a matching pattern/, "分支名称不得以匹配规则结束"],
                            // [/Branch name must not contain a matching pattern/, "分支名称不得包含匹配规则"],
                            // [/Branch name must not match a given regex pattern/, "分支名称不得匹配给定的正则表达式规则"],

                        "How this rule will appear to your": "这个规则将如何在您的",
                        "organization": "组织",
                        "'s users throughout": "内的用户中显示",

            // 授权访问 sudo 模式身份验证
                "Confirm access": "授权访问",
                "Authentication code": "验证码",
                    "More information about sudo mode authentication": "更多关于 sudo 模式身份验证的信息",
                "Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.": "打开您的双重身份验证器 (TOTP) 应用或浏览器扩展以查看您的身份验证码。",
                "Verify": "验证",
                "Verify": "验证",
                "Verifying…": "验证中…",
                "Your authentication code has been sent.": "您的验证码已发送。",

                "Having problems?": "有问题吗？",
                "Use GitHub Mobile": "使用 GitHub Mobile",
                "Use your authenticator app": "使用您的身份验证器应用",
                "Send a code via SMS": "通过短信发送验证码",
                "Resend SMS": "重新发送短信",
                "Use your password": "使用您的密码",

                "GitHub Mobile": "GitHub Mobile",
                "Creating a verification request for your GitHub Mobile app.": "为您的 GitHub Mobile 应用创建验证请求。",
                "We sent you a verification request on your GitHub Mobile app. Enter the digits shown below to enter sudo mode.": "我们向您的 GitHub Mobile 应用发送了一个验证请求。输入下面显示的数字以进入 sudo 模式。",
                "We could not verify your identity": "我们无法核实您的身份",
                "Retry": "请重试",

                "We just sent you a message via SMS with your authentication code. Enter the code in the form above to verify your identity.": "我们刚刚通过短信向您发送了一条消息，其中包含您的验证码。在上面的表格中输入验证码以验证您的身份。",

                "Password": "密码",
                "Forgot password?": "忘记密码？",
                "Confirm": "确认",

            "Unauthorized": "未经授权",
            "Ruleset created": "规则集已创建",

            "Revert": "撤销",
            "changes": "更改",
            "change": "更改",

        // 新建标签规则 /<user-name>/<repo-name>/settings/rules/new?target=tag&enforcement=disabled
            "Target tags": "目标标签",
            "Tag targeting has not been configured": "尚未配置标签目标",
            "Tag": "标签",
            "tags": "标签",
            "Include all tags": "包含所有标签",
            "All tags": "所有标签",
            "Tags that match the matching pattern will be targeted by this ruleset.": "与匹配规则相匹配的标签将成为该规则集的目标。",
            "Tags that do not match the matching pattern will be targeted by this ruleset.": "与匹配规则不匹配的标签将成为该规则集的目标。",
            "Tag protections": "标签保护",

        // 编辑规则 /<user-name>/<repo-name>/settings/rules/<id>
            "Delete ruleset": "删除规则",

            "Delete ruleset?": "删除规则？",
            "Are you sure you want to delete this ruleset? This action cannot be undone.": "您确定要删除此规则集吗？此操作无法撤消。",

            "Applies to": "应用到",
            "target:": "个目标:",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) rules?/, "$1 条规则"],
        [/(\d+) branch(es)?/, "$1 个分支"],
        [/Commit message must start with a matching pattern/, "提交信息必须以匹配规则开头"],
        [/Commit message must end with a matching pattern/, "提交信息必须以匹配规则结束"],
        [/Commit message must contain with a matching pattern/, "提交信息必须包含匹配规则"],
        [/Commit message must match a given regex pattern/, "提交信息必须匹配给定的正则表达式规则"],
        [/Commit message must not start with a matching pattern/, "提交信息不得以匹配规则开头"],
        [/Commit message must not end with a matching pattern/, "提交信息不得以匹配规则结束"],
        [/Commit message must not contain a matching pattern/, "提交信息不得包含匹配规则"],
        [/Commit message must not match a given regex pattern/, "提交信息不得匹配给定的正则表达式规则"],
        [/Author email must start with a matching pattern/, "作者电子邮箱地址必须以匹配规则开头"],
        [/Author email must end with a matching pattern/, "作者电子邮箱地址必须以匹配规则结束"],
        [/Author email must contain a matching pattern/, "作者电子邮箱地址必须包含匹配规则"],
        [/Author email must match a given regex pattern/, "作者电子邮箱地址必须匹配给定的正则表达式规则"],
        [/Author email must not start with a matching pattern/, "作者电子邮箱地址不得以匹配规则开头"],
        [/Author email must not end with a matching pattern/, "作者电子邮箱地址不得以匹配规则结束"],
        [/Author email must not contain a matching pattern/, "作者电子邮箱地址不得包含匹配规则"],
        [/Author email must not match a given regex pattern/, "作者电子邮箱地址不得匹配给定的正则表达式规则"],
        [/Committer email must start with a matching pattern/, "提交者电子邮箱地址必须以匹配规则开头"],
        [/Committer email must end with a matching pattern/, "提交者电子邮箱地址必须以匹配规则结束"],
        [/Committer email must contain a matching pattern/, "提交者电子邮箱地址必须包含匹配规则"],
        [/Committer email must match a given regex pattern/, "提交者电子邮箱地址必须匹配给定的正则表达式规则"],
        [/Committer email must not start with a matching pattern/, "提交者电子邮箱地址不得以匹配规则开头"],
        [/Committer email must not end with a matching pattern/, "提交者电子邮箱地址不得以匹配规则结束"],
        [/Committer email must not contain a matching pattern/, "提交者电子邮箱地址不得包含匹配规则"],
        [/Committer email must not match a given regex pattern/, "提交者电子邮箱地址不得匹配给定的正则表达式规则"],
        [/Branch name must start with a matching pattern/, "分支名称必须以匹配规则开头"],
        [/Branch name must end with a matching pattern/, "分支名称必须以匹配规则结束"],
        [/Branch name must contain a matching pattern/, "分支名称必须包含匹配规则"],
        [/Branch name must match a given regex pattern/, "分支名称必须匹配给定的正则表达式规则"],
        [/Branch name must not start with a matching pattern/, "分支名称不得以匹配规则开头"],
        [/Branch name must not end with a matching pattern/, "分支名称不得以匹配规则结束"],
        [/Branch name must not contain a matching pattern/, "分支名称不得包含匹配规则"],
        [/Branch name must not match a given regex pattern/, "分支名称不得匹配给定的正则表达式规则"],
    ],
};
I18N.zh["orgs/settings/rules"] = I18N.zh["repository/settings/rules"];

I18N.zh["repository/settings/actions"] = { // 仓库设置 - 操作 /<user-name>/<repo-name>/settings/actions
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 操作页面 /<user-name>/<repo-name>/settings/actions
            "Actions permissions": "操作权限",
                "This setting has been disabled by organization administrators.": "此设置已被组织管理员禁用。", // 组织仓库
                "Allow all actions and reusable workflows": "允许所有操作和可复用的工作流程",
                    "Any action or reusable workflow can be used, regardless of who authored it or where it is defined.": "可以使用任何操作或可复用的工作流程，而不管它是谁创作的或在哪里定义的。",
            "Disable actions": "禁用操作",
                "The Actions tab is hidden and no workflows can run.": "“操作” 选项卡将被隐藏，无法运行任何工作流程。",
            // [/Allow ([^ ]+) actions and reusable workflows/, "允许 $1 的操作和可复用的工作流程"],
                // [/Any action or reusable workflow defined in a repository within ([^ ]+) can be used./, "可以使用在 $1 的仓库中定义的任何操作或可复用的工作流程。"], // 操作页面
            // [/Allow ([^ ]+), and select non-([^ ]+), actions and reusable workflows/, "允许 $1，并选择非 $2、操作和可复用的工作流程"],
                // [/Any action or reusable workflow that matches the specified criteria, plus those defined in a repository within ([^ ]+), can be used./, "可以使用符合指定条件的操作或工作流程，以及在 $1 的仓库中定义的操作或可复用的工作流程。"], // 操作页面
                "Learn more about allowing specific actions and reusable workflows to run.": "了解更多关于允许运行特定操作和可复用的工作流程的信息。",
                "Allow actions created by GitHub": "允许由 GitHub 创建的操作",
                "Allow actions by Marketplace": "允许来自市场的操作，",
                "verified creators": "由经验证的创建者创建",
                "Allow specified actions and reusable workflows": "允许指定的操作和可复用的工作流程",
                "Enter a comma-separated list of actions and reusable workflows": "输入以逗号分隔的操作和可复用的工作流程列表",
                "Wildcards, tags, and SHAs are allowed.": "允许使用通配符、标签和 SHA。",
                "Action examples:": "操作示例：",
                "Reusable workflow examples:": "可复用的工作流程示例：",
                "Entire organisation or repository examples:": "整个组织或仓库的示例：",
                // "Save": "保存",
                "Saving...": "保存中...",
                // 顶部提醒
                    "Actions policy updated.": "操作政策已更新",

            "Artifact and log retention": "工件和日志保留",
                "Choose the repository settings for artifacts and logs.": "选择工件和日志的仓库设置。",
                "Your organization has set a maximum limit of": "您的组织已将上限设置为", //组织仓库
                "days.": "天。", //组织仓库

                "days": "天",

            "Fork pull request workflows": "复刻拉取请求工作流程",
                "Run workflows from fork pull requests": "从复刻拉取请求运行工作流程",
                    "This tells Actions to run workflows from pull requests originating from repository forks. Note that doing so will give maintainers of those forks the ability to use tokens with read permissions on the source repository.": "这告诉 Actions 运行工作流程，来自仓库复刻的拉取请求。请注意，这样做将使这些复刻的维护者有能力在源码库上使用具有读取权限的令牌。",
                "Send write tokens to workflows from fork pull requests.": "从复刻拉取请求，发送可写令牌到工作流程",
                    "This tells Actions to send tokens with": "这告诉 Actions 发送令牌",
                    "write": "写入",
                    "permissions to workflows from pull requests originating from repository forks. Note that doing so will give maintainers of those forks": "权限到工作流程，来自仓库复刻的拉取请求。请注意，这样做将授予这些复刻的维护者",
                    "permissions against the source repository.": "权限，针对源仓库。",
                "Send secrets to workflows from fork pull requests.": "从复刻拉取请求，发送机密到工作流程",
                    "This tells Actions to send repository secrets to workflows from pull requests originating from repository forks.": "这告诉 Actions 发送仓库机密到工作流程，来自仓库复刻的拉取请求。",

            "Fork pull request workflows from outside collaborators": "从外部协作者，复刻拉取请求工作流程",
                "Choose which subset of outside collaborators will require approval to run workflows on their pull requests.": "选择哪些外部协作者的子集需要批准才能对他们的拉取请求运行工作流程。",
                "Learn more about approving workflow runs from public forks.": "了解更多关于批准来自公共复刻的工作流运行的信息。",
            "Require approval for first-time contributors who are new to GitHub": "要求对首次加入 GitHub 的贡献者进行审批",
                "Only first-time contributors who recently created a GitHub account will require approval to run workflows.": "只有最近创建 GitHub 帐户的首次贡献者才需要获得批准才能运行工作流程。",
            "Require approval for first-time contributors": "要求对首次贡献者进行审批",
                "Only first-time contributors will require approval to run workflows.": "只有首次贡献者才需要获得批准才能运行工作流程。",
            "Require approval for all outside collaborators": "要求对所有外部协作者进行审批",
                "All outside collaborators will always require approval to run workflows on their pull requests.": "所有外部协作者将始终需要批准才能在他们的拉取请求上运行工作流程。",

            "Workflow permissions": "工作流程权限",
                "Choose the default permissions granted to the GITHUB_TOKEN when running workflows in this repository. You can specify more granular permissions in the workflow using YAML.": "在仓库中运行工作流程时，选择授予 GITHUB_TOKEN 的默认权限。您可以使用 YAML 在工作流程中指定更细化的权限。",
                "Learn more about managing permissions.": "了解更多关于管理权限的信息。",
                "Read and write permissions": "读取和写入权限",
                    "Workflows have read and write permissions in the repository for all scopes.": "工作流程在仓库中对所有作用域具有读和写的权限。",
                "Read repository contents and packages permissions": "读取仓库的内容和软件包的权限",
                    "Workflows have read permissions in the repository for the contents and packages scopes only.": "工作流程在仓库中仅对内容和软件包作用域具有只读的权限。",
                    "Choose whether GitHub Actions can create pull requests or submit approving pull request reviews.": "选择 GitHub Actions 是否可以创建拉取请求或提交批准拉取请求审查。",
                        "Allow GitHub Actions to create and approve pull requests": "允许 GitHub Actions 创建和批准拉取请求",

                // 顶部提醒
                    "Default workflow permissions settings saved.": "已保存默认工作流程权限设置。",

        // 运行器页面 /<user-name>/<repo-name>/settings/actions/runners
            "New self-hosted runner": "新建自托管运行器",
            "Host your own runners and customize the environment used to run jobs in your GitHub Actions workflows.": "托管您自己的运行器，并定制用于在您的 GitHub Actions 工作流程中运行作业的环境。",
            "Learn more about self-hosted runners": "了解更多关于自托管运行器的信息",
            "There are no runners configured": "暂无设置运行器",
            "Learn more about using runners": "了解更多关于使用运行器的信息",
            "to run actions on your own servers.": "在您自己的服务器上运行操作的信息。",

        // 创建运行器页面 /<user-name>/<repo-name>/settings/actions/runners/new
            "/ Create self-hosted runner": "/ 创建自托管运行器",
            "Adding a self-hosted runner requires that you download, configure, and execute the GitHub Actions Runner. By downloading and configuring the GitHub Actions Runner, you agree to the": "添加一个自托管运行器需要您下载、配置并执行 GitHub Actions 运行器。下载并配置 GitHub Actions 运行器 后，您同意",
                "GitHub Terms of Service": "GitHub 服务条款",
                "GitHub Corporate Terms of Service": "GitHub 企业服务条款",
                ", as applicable.": "，如适用。",
            "Runner image": "运行器镜像",
            "Architecture": "架构",
            "Download": "下载",
            "We recommend configuring the runner under \"\\actions-runner\". This will help avoid issues related to service identity folder permissions and long path restrictions on Windows.": "我们建议在 “\\actions-runner” 下配置运行器。这将有助于避免与 Windows 上的服务标识文件夹权限和长路径限制相关的议题。",
            "Configure": "设置",
            "Using your self-hosted runner": "使用您的自托管运行器",
            "For additional details about configuring, running, or shutting down the runner, please check out our": "关于配置、运行或关闭运行器的其他细节，请查看我们的",
            "product docs": "产品文档",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Allow ([^ ]+) actions and reusable workflows/, "允许 $1 的操作和可复用的工作流程"],
        [/Any action or reusable workflow defined in a repository within ([^ ]+) can be used./, "可以使用在 $1 的仓库中定义的任何操作或可复用的工作流程。"], // 操作页面
        [/Allow ([^ ]+), and select non-([^ ]+), actions and reusable workflows/, "允许 $1，并选择非 $2、操作和可复用的工作流程"],
        [/Any action or reusable workflow that matches the specified criteria, plus those defined in a repository within ([^ ]+), can be used./, "可以使用符合指定条件的操作或工作流程，以及在 $1 的仓库中定义的操作或可复用的工作流程。"], // 操作页面
    ],
};

I18N.zh["repository/settings/hooks"] = { // 仓库设置 - Web 钩子 /<user-name>/<repo-name>/settings/hooks
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // Web 钩子 页面 /<user-name>/<repo-name>/settings/hooks====================================
            "Add webhook": "添加 Web 钩子",
            "Webhooks allow external services to be notified when certain events happen. When the specified events happen, we’ll send a POST request to each of the URLs you provide. Learn more in our": "Web 钩子允许在发生某些事件时通知外部服务。当指定的事件发生时，我们将向您提供的每个 URL 发送 POST 请求。了解更多信息，在我们的",
            "Webhooks Guide": "Web 钩子指南",

            "We will also send events from this repository to your": "我们还将把这个仓库的事件发送到您的", // 组织仓库
            "organization webhooks": "组织 Web 钩子", // 组织仓库

            // 删除对话框
                "Delete webhook?": "删除 Web 钩子？",
                "This action cannot be undone. Future events will no longer be delivered to this webhook": "此操作无法撤消。未来的事件将不再传递到此 Web 钩子",
                "Yes, delete webhook": "是的，删除 Web 钩子",

        // 添加钩子 页面 /<user-name>/<repo-name>/settings/hooks/new ====================================
            "Webhooks /": "Web 钩子 /",
            "Add webhook": "添加 Web 钩子",
            "We’ll send a": "我们将",
            "request to the URL below with details of any subscribed events. You can also specify which data format you’d like to receive (JSON,": "请求到以下 URL，其中包含任何订阅事件的详细信息。您还可以指定要接收的数据格式（JSON、",
            "etc": "等",
            "). More information can be found in": "）。更多信息可以在",
            "our developer documentation": "开发人员文档",

            "Payload URL": "有效负载 URL",
            "Content type": "内容类型",
            "Secret": "密钥",
                "Leave blank to remove secret": "留空以删除密钥",

            "SSL verification": "SSL 验证",
            "By default, we verify SSL certificates when delivering payloads.": "默认情况下，我们在交付有效负载时验证 SSL 证书。",
            "Enable SSL verification": "启用 SSL 验证",
            "Disable": "禁用",
            "(not recommended)": "（不推荐）",
                "Are you sure?": "您确定吗？",
                "Warning": "警告",
                ": Disabling SSL verification has serious implications.": "：禁用 SSL 验证具有严重的影响。",
                "SSL verification helps ensure that hook payloads are delivered to your URL endpoint securely, keeping your data away from prying eyes. Disabling this option is": "SSL 验证有助于确保钩子有效负载安全地传送到您的 URL 端点，使您的数据远离窥探。禁用此选项是",
                "not recommended": "不推荐的",
                "Disable, I understand my webhooks may not be secure": "禁用，我明白我的 web 钩子可能不安全",

            "Which events would you like to trigger this webhook?": "您希望哪些事件触发此 Web 钩子？",
                "Just the": "仅",
                "push": "推送",
                "event.": "事件。",
                "Send me": "发送给我",
                "everything": "所有",
                "Let me select individual events.": "让我选择单个事件。",
                    "Branch or tag creation": "分支或标签创建",
                        "Branch or tag created.": "分支或标签的创建。",
                    "Branch or tag deletion": "分支或标签删除",
                        "Branch or tag deleted.": "分支或标签的删除。",
                    "Branch protection configurations": "分支保护配置",
                        "All branch protections disabled or enabled for a repository.": "禁用或启用仓库的所有分支保护。",
                    "Branch protection rules": "分支保护规则",
                        "Branch protection rule created, deleted or edited.": "分支保护规则的创建、删除或编辑。",
                    "Check runs": "检查运行",
                        "Check run is created, requested, rerequested, or completed.": "检查运行的创建、请求、重新请求或完成。",
                    "Check suites": "检查套件",
                        "Check suite is requested, rerequested, or completed.": "检查套件的请求、重新请求或已完成。",
                    "Code scanning alerts": "代码扫描警报",
                        "Code Scanning alert created, fixed in branch, or closed": "代码扫描警报的创建、在分支中的修复或关闭",
                    "Collaborator add, remove, or changed": "协作者的添加、删除或更改",
                        "Collaborator added to, removed from, or has changed permissions for a repository.": "协作者添加到仓库、从仓库中删除或更改了仓库的权限。",
                    "Commit comments": "提交评论",
                        "Commit or diff commented on.": "提交或差异评论。",
                    "Dependabot alerts": "Dependabot 警报",
                        "Dependabot alert auto_dismissed, auto_reopened, created, dismissed, reopened, fixed, or reintroduced.": "Dependabot 警报自动驳回、自动重新打开、创建、驳回、重新打开、修复或重新引入。",
                    "Deploy keys": "部署密钥",
                        "A deploy key is created or deleted from a repository.": "在仓库中部署密钥的创建或删除。",
                    "Deployment statuses": "部署状态",
                        "Deployment status updated from the API.": "从 API 更新的部署状态。",
                    "Deployments": "部署",
                        "Repository was deployed or a deployment was deleted.": "仓库的部署或删除部署。",
                    "Discussion comments": "讨论评论",
                        "Discussion comment created, edited, or deleted.": "讨论评论的创建、编辑或删除。",
                    // "Discussion": "讨论",
                        "Discussion created, edited, closed, reopened, pinned, unpinned, locked, unlocked, transferred, answered, unanswered, labeled, unlabeled, had its category changed, or was deleted.": "讨论的创建、编辑、关闭、重新打开、置顶、取消置顶、锁定、解锁、转移、回答、未回答、标记、未标记、更改其类别或删除。",
                    "Forks": "复刻",
                        "Repository forked.": "仓库复刻。",
                    "Issue comments": "发表评论",
                        "Issue comment created, edited, or deleted.": "议题评论的创建、编辑或删除。",
                    // "Issue": "议题",
                        "Issue opened, edited, deleted, transferred, pinned, unpinned, closed, reopened, assigned, unassigned, labeled, unlabeled, milestoned, demilestoned, locked, or unlocked.": "议题的打开、编辑、删除、转移、钉住、取消钉住、关闭、重新打开、分配、未分配、标记、未标记、密闭、去密闭、锁定或解锁。",
                    "Labels": "标签",
                        "Label created, edited or deleted.": "标签的创建、编辑或删除。",
                    "Memberships": "团队成员", // 组织设置
                        "Team membership added or removed.": "添加或删除团队成员。",
                    "Merge groups": "合并组",
                        "Merge Group requested checks, or was destroyed.": "合并组的请求检查或被销毁。",
                    "Meta": "元数据",
                        "This particular hook is deleted.": "这个特定的钩子被删除。",
                    "Milestones": "里程碑",
                    "Milestone created, closed, opened, edited, or deleted.": "里程碑的创建、关闭、打开、编辑或删除。",
                    "Org blocks": "组织黑名单", // 组织设置
                        "A user has been blocked or unblocked.": "用户拉黑或解除拉黑。",
                    "Organizations": "组织", // 组织设置
                        "Organization deleted, renamed, member invited, member added, or member removed.": "组织被删除、重命名、邀请成员、添加成员或删除成员。",
                    // "Packages": "软件包",
                        "GitHub Packages published or updated in a repository.": "在仓库中 GitHub 软件包的发布或更新 。",
                    "Page builds": "页面构建",
                        "Pages site built.": "页面站点建成。",
                    "Project cards": "项目卡",
                        "Project card created, updated, or deleted.": "项目卡的创建、更新或删除。",
                    "Project columns": "项目栏目",
                        "Project column created, updated, moved or deleted.": "项目列目的创建、更新、移动或删除。",
                    "Projects v2 items": "项目项 v2", // 组织设置
                        "Project item created, edited, deleted, archived, restored, converted, or reordered. Feedback is welcome in": "项目条目的创建、编辑、删除、归档、恢复、转换或重新排序。欢迎提供反馈意见在",
                        "this discussion": "这个讨论",
                    // "": "项目",
                        "Project created, updated, or deleted.": "项目的创建、更新或删除。",
                    "Project v2": "项目 v2", // 组织设置
                        "Project created, updated, deleted, closed, or reopened. Feedback is welcome in": "项目的创建、更新、删除、关闭或重新打开。欢迎提供反馈意见在",
                    "Pull request review comments": "拉取请求的审查评论",
                        "Pull request diff comment created, edited, or deleted.": "拉取请求差异评论的创建、编辑或删除。",
                    "Pull request review threads": "拉取请求的审查线程",
                        "A pull request review thread was resolved or unresolved.": "拉取请求审查线程的解决或未解决。",
                    "Pull request reviews": "拉取请求审查",
                        "Pull request review submitted, edited, or dismissed.": "拉取请求审查的提交、编辑或忽略。",
                    // "": "拉取请求",
                        "Pull request assigned, auto merge disabled, auto merge enabled, closed, converted to draft, demilestoned, dequeued, edited, enqueued, labeled, locked, milestoned, opened, ready for review, reopened, review request removed, review requested, synchronized, unassigned, unlabeled, or unlocked.": "拉取请求的分配、自动合并禁用、自动合并启用、关闭、转换为草稿、删除、撤销排队、编辑、排队、标记、锁定、里程碑、打开、准备好审查、重新打开、删除审查请求、请求审查、同步、撤销分配、撤销标记或解锁。",
                    "Pushes": "推送",
                        "Git push to a repository.": "Git 推送到仓库。",
                    "Registry packages": "注册软件包",
                        "Registry package published or updated in a repository.": "注册软件包的发布或更新。",
                    "Releases": "发行版",
                        "Release created, edited, published, unpublished, or deleted.": "发行版的创建、编辑、发布、取消发布或删除。",
                    // "": "仓库",
                        "Repository created, deleted, archived, unarchived, publicized, privatized, edited, renamed, or transferred.": "仓库的创建、删除、存档、取消存档、公开、私有化、编辑、重命名或转让。",
                    "Repository advisories": "仓库公告",
                        "Repository advisory published or reported.": "仓库公告发布或报告。",
                    "Repository imports": "仓库导入",
                        "Repository import succeeded, failed, or cancelled.": "仓库导入的成功、失败或取消。",
                    "Repository rulesets": "仓库规则集",
                        "Repository ruleset created, deleted or edited.": "仓库规则集的创建、删除或编辑。",
                        "This event is not yet public. If you would like to receive payloads for this event, you will need to explicitly choose it here.": "此事件尚未公开。如果您想接收此事件的有效负载，则需要在此处明确选择它。",
                    "Repository vulnerability alerts": "仓库漏洞警报",
                        "Dependabot alert (aka dependency vulnerability alert) created, resolved, or dismissed on a repository.": "Dependabot 警报（又名依赖漏洞警报）在仓库上的创建、解决或解除。",
                    "Secret scanning alert locations": "密钥扫描警报位置",
                        "Secrets scanning alert location created": "密钥扫描警报位置的创建",
                    "Secret scanning alerts": "密钥扫描警报",
                        "Secrets scanning alert created, resolved, or reopened": "密钥扫描警报的创建、解决或重新打开",
                    "Security and analyses": "安全和分析",
                    "Code security and analysis features enabled or disabled for a repository.": "为仓库启用或禁用的代码安全和分析功能。",
                    // "": "星标",
                        "A star is created or deleted from a repository.": "从仓库中创建或删除星标。",
                    "Statuses": "状态",
                        "Commit status updated from the API.": "从 API 更新的提交状态。",
                    "Team adds": "团队添加",
                        "Team added or modified on a repository.": "在仓库上添加或修改的团队。",
                    "Teams": "团队",  // 组织设置
                        "Team is created, deleted, edited, or added to/removed from a repository.": "团队被创建、删除、编辑或添加到仓库/从仓库中删除。",
                    "Visibility changes": "可见性变化",
                        "Repository changes from private to public.": "仓库从私有更改为公共。",
                    "Watches": "关注",
                        "User stars a repository.": "用户给一个仓库加星标。",
                    "Wiki": "",
                        "Wiki page updated.": "Wiki 页面的更新。",
                    "Workflow jobs": "工作流程的工作",
                        "Workflow job queued, waiting, in progress, or completed on a repository.": "在仓库上的工作流程的排队、等待、正在进行或完成。",
                    "Workflow runs": "工作流程的运行",
                        "Workflow run requested or completed on a repository.": "在仓库上的工作流程的请求或完成。",
                "Active": "激活",
                "We will deliver event details when this hook is triggered.": "当钩子被触发时，我们将提供事件详细信息。",

            // 顶部提醒
            "Okay, that hook was successfully created. We sent a ping payload to test it out! Read more about it at https://docs.github.com/webhooks/#ping-event.": "好的，这个钩子已经成功创建。我们发送了一个 ping 负载来测试它! 阅读更多关于它的信息，请访问 https://docs.github.com/webhooks/#ping-event。",

        // 管理 钩子 /<user-name>/<repo-name>/settings/hooks/<id>
            "Manage webhook": "管理 Web 钩子",
            "If you've lost or forgotten this secret, you can change it, but be aware that any integrations using this secret will need to be updated. —": "如果您丢失或忘记了此密钥，则可以更改它，但请注意，使用此密钥的任何集成都需要更新。 —",
            "Change Secret": "更改密钥",
            "Update webhook": "更新 Web 钩子",
            // 顶部提醒
                "Okay, the hook was successfully updated.": "好的，Web 钩子已经成功更新。",
            "Delete webhook": "删除 Web 钩子",

        // 最近交付标签 /<user-name>/<repo-name>/settings/hooks/<id>?tab=deliveries
            "Recent Deliveries": "最近交付",
                "redelivery": "再交付",
            "Loading deliveries…": "载入交付…",
            "Detailed delivery information will be shown here once the hook has been triggered.": "一旦触发钩子，详细的交付信息将在此处显示。",

            "Request": "请求",
            "Response": "应答",
            "Redeliver": "重新交付",
                "Redeliver payload?": "重新交付有效负载？",
                "The payload will be delivered to": "该有效负载将被发送到",
                "using the current webhook configuration.": "使用当前的 Web 钩子 配置。",
                "Yes, redeliver this payload": "是的，重新发送此有效负载",
                    "Delivering payload…": "交付有效载荷...",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Completed in (\d+(\.\d+)) seconds?./, "在 $1 秒内完成。"],
    ],
};

I18N.zh["repository/settings/environments"] = { // 仓库设置 - 环境 /<user-name>/<repo-name>/settings/environment
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 仓库 环境 /<user-name>/<repo-name>/settings/environments
            "New environment": "新建环境",
            "You can configure environments with protection rules, variables and secrets.": "您可以使用保护规则，变量和机密配置环境。",
            "Learn more about configuring environments.": "了解更多关于配置环境的信息。",

            "There are no environments for this repository": "此仓库尚无环境",
            "Environments are used by your workflows for deployments.": "您的工作流程使用环境进行部署。",
            "You can configure environments with protection rules and secrets.": "您可以使用保护规则和机密配置环境。",

            // 删除环境对话框
            "Are you sure you want to delete this environment?": "您确定要删除此环境吗？",
                "Deleting an environment will delete all associated secrets, variables, and protection rules.": "删除环境将删除所有关联的机密、变量和保护规则。",
                "I understand, delete this environment": "我明白了，依然删除这个环境",
            // 顶部提醒
            "Environment deleted.": "环境已删除。",

        // 仓库 新建环境 /<user-name>/<repo-name>/settings/environments/new
            "/ Add": "/ 添加",
            "Name": "名称",
            "Configure environment": "设置环境",

        // 编辑环境 /<user-name>/<repo-name>/settings/environments/<id>/edit
            "/ Configure": "/ 设置",

            "Deployment protection rules": "部署保护规则",
                "Configure reviewers, timers, and custom rules that must pass before deployments to this environment can proceed.": "配置审阅者、计时器和自定义规则，在继续部署到此环境之前必须通过这些规则。",

                "Required reviewers": "所需的审阅者",
                "Specify people or teams that may approve workflow runs when they access this environment.": "指定访问此环境时可以批准工作流运行的人员或团队。",
                    "Add up to": "最多添加",
                    "more reviewers": "位审阅者",
                    "Search for people or teams...": "搜索人员或团队...",
                "Wait timer": "等待计时器",
                "Set an amount of time to wait before allowing deployments to proceed.": "设置一个允许部署前的等待时间。",
                    "minutes": "分钟",
                "Save protection rules": "保存保护规则",
                "Enable custom rules with GitHub Apps": "使用 GitHub Apps 启用自定义规则",
                    "Learn about existing apps": "了解现有应用",
                    "create your own protection rules": "创建您自己的保护规则",
                    "so you can deploy with confidence.": "以便您可以放心地进行部署。",
                "Allow administrators to bypass configured protection rules": "允许管理员绕过配置的保护规则",

            "Deployment branches": "部署分支",
                "Limit which branches can deploy to this environment based on rules or naming patterns.": "根据规则或命名模式限制哪些分支可以部署到此环境。",
                "All branches": "全部分支",
                    "Any branch from this repository can deploy.": "该仓库的任何分支都可以部署。",
                "Protected branches": "受保护的分支",
                    "Deployment limited to branches with protection rules.": "部署仅限于具有保护规则的分支。",
                "Selected branches": "选中的分支",
                    "Specify a list of branches using branch name patterns.": "使用分支名称模式指定一个分支列表",

                "Applies to": "适用于",
                // [/(\d+) branchs?/, "$1 个分支"],
                ". Based on the existing": "。基于已有的",
                "repository branch protection rules": "仓库分支保护规则",
                // [/Currently applies to (\d+) branch(es)/, "目前适用于 $1 个分支"],

                "No branch rules applied yet:": "尚未应用分支规则：",
                "all branches are still allowed to deploy.": "仍允许所有分支进行部署。",
                "Add deployment branch rule": "添加部署分支规则",
                    // 添加部署分支规则 对话框
                    "Branch name pattern:": "分支名称模式：",
                    "Add rule": "添加规则",
                // [/(\d+) branch(es) allowed/, "允许 $1 个分支"],
                "Remove": "删除",

                // 顶部提醒
                    "Environment changes successfully saved: all branches can deploy.": "环境更改已成功保存：所有分支都可以部署。",
                    "Environment changes successfully saved: only protected branches can deploy.": "环境更改已成功保存：只有受保护的分支才能部署。",
                    "Environment changes successfully saved: only selected branches can deploy.": "环境更改已成功保存：只有选定的分支才能部署。",
                    // [/Deployment branch rule \"([^ ]+)\" saved successfully./ ,"部署分支规则 “$1” 已成功保存。"],
                    // [/Deployment branch rule \"([^ ]+)\" removed./, "部署分支规则 “$1” 已删除。",]

            "Environment secrets": "环境机密",
                "Secrets are encrypted environment variables. They are accessible only by GitHub Actions in the context of this environment.": "机密是加密的环境变量。它们只能由 GitHub Actions 在这个环境中访问。",
                "Add Secret": "添加机密",
                "Add secret": "添加机密",
                    // 添加机密对话框
                    "Name": "名称",
                    "Value": "值",
                    "Secret value": "机密值",

            "Environment variables": "环境变量",
                "Variables are used for non-sensitive configuration data. They are accessible only by GitHub Actions in the context of this environment. They are accessible using the": "变量用于非敏感配置数据。它们只能通过此环境上下文中的 GitHub Actions 访问。它们可以使用",
                "vars context": "变量内容",
                "Add variable": "添加变量",
                    "Variable value": "变量值",
                    "Adding…": "添加中…",
                "Update variable": "更新变量",
                    "Save variable": "保存变量",
                    "Saving...": "保存中...",
                // 删除变量 对话框
                    "Remove variable": "删除变量",
                    "Are you sure you want to delete": "您确定要删除",
                    "Yes, remove this variable": "是的，删除这个变量",
                    // 顶部提醒
                    "Variable deleted.": "变量已删除。",

            // 顶部提醒
            // [/Environment \"([^ ]+)\" created./, "环境 “$1” 已创建。"],

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) protection rules?/, "$1 个保护规则"], // /environments
        [/Environment \"([^ ]+)\" created./, "环境 “$1” 已创建。"],
        [/Environment \"([^ ]+)\" updated./, "环境 “$1” 已更新。"],
        [/Currently applies to (\d+) branch(es)/, "目前适用于 $1 个分支"],
        [/(\d+) branch(es) allowed/, "允许 $1 个分支"],
        [/(\d+) branch(es)/, "$1 个分支"],
        [/Deployment branch rule \"([^ ]+)\" saved successfully./ ,"部署分支规则 “$1” 已成功保存。"],
        [/Deployment branch rule \"([^ ]+)\" removed./, "部署分支规则 “$1” 已删除。",]
    ],
};

I18N.zh["repository/settings/codespaces"] = { // 仓库设置 - 代码空间 /<user-name>/<repo-name>/settings/codespaces
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 代码空间 /<user-name>/<repo-name>/settings/codespaces
            "Prebuild configuration": "预构建配置",
            "Set up prebuild": "设置预构建",
            "There are no prebuilds configured for this repository": "尚无预构建设置",
            "Prebuild configurations speed up Codespace creations significantly by pre-executing all the tasks required to build your development environment.": "预构建配置通过预先执行构建开发环境所需的所有任务，大大加快了代码空间的创建。",
            "Learn more about setting up prebuilds": "了解更多关于预构建设置的信息",

        // 代码空间 /<user-name>/<repo-name>/settings/codespaces
            "Prebuilds": "预构建",
            "/ New configuration": "/ 新建设置",
            "Configuration": "设置",
            "Your prebuild will be built from the branch and configuration file selected below. Learn more about": "您的预构建将从下面选择的分支和配置文件中构建。了解更多关于",
            "prebuild configuration.": "预构建设置。",
            "Select branch": "选择分支",
            "Find a branch": "查找分支",
            "Configuration File:": "设置文件：",
            "Default Codespaces Configuration": "默认代码空间设置",

            "Access and cost control": "访问和成本控制",
            "Prebuild triggers": "预构建触发器",
            "You can specify how often to prebuild your codespace based on changes to your repository or a schedule to manage Actions usage.": "您可以根据对仓库的更改或管理操作使用的计划来指定预构建代码空间的频率。",
            "Learn about prebuild triggers": "了解预构建触发器",
            "Every push": "每次推送",
                "Default": "默认",
                "Your codespace will prebuild on every push to this branch": "您的代码空间将在每次推送到该分支时预构建",
            "On configuration change": "配置改变时",
                "Your codespace will prebuild when a change is detected on the devcontainer.json and associated configuration files": "当检测到 devcontainer.json 和相关的配置文件有变化时，您的代码空间将预构建。",
            "Scheduled": "计划",
                "Your codespace will prebuild on a schedule": "您的代码空间将按计划进行预构建",
            "Days": "天",
            "Weekdays": "工作日",
            "Every day": "每日",
            "Sunday"    : "周日",
            "Monday"    : "周一",
            "Tuesday"   : "周二",
            "Wednesday" : "周三",
            "Thursday"  : "周四",
            "Friday"    : "周五",
            "Saturday"  : "周六",
            "Times": "时间",

            "Region availability": "区域可用性",
            "Reduce prebuild available to only specific regions": "减少仅适用于特定区域的预构建",
                "By default, your prebuilt image will be available to all regions where codespaces are available and storage costs will apply for each region. You can adjust this to manage your storage usage.": "默认情况下，您的预构建映像将适用于所有代码空间可用的区域，并且每个地区都有存储费用。。您可以调整此项以管理您的存储使用情况。",
                "Learn about region availability": "了解区域可用性",

            "Template history": "模板历史",
                "You can specify the number of prebuild template versions retained to speed up codespaces from an older commit to manage storage costs. The maximum value is 5 versions.": "您可以指定保留的预构建模板版本的数量，以加快旧提交的代码空间，以管理存储成本。最大值为 5 个版本。",
                "Learn about template history": "了解模板历史",
            "versions": "个版本",

            "Failure notifications": "失败通知",
            "You can specify users or teams to be notified via e-mail when prebuilds for this particular configuration fail.": "您可以指定用户或团队，当这个特定配置的预构建失败时，通过电子邮件通知他们。",
            "Add by username, full name, or team name": "按用户名、全名或团队名称添加",
            "You haven't added anyone yet": "尚未添加任何人",
            "Add members to receive email notifications when prebuilds fail for this configuration": "添加成员，以便在此配置的预构建失败时接收电子邮件通知",
            "Show advanced options": "显示高级选项",

            "Advanced options": "高级选项",
            "You can disable prebuild optimization if you're having issues where codespaces are several commits behind on a specific branch.": "如果您遇到代码空间在特定分支上落后多个提交的问题，您可以禁用预构建优化。",
            "Learn about prebuild optimization": "了解预构建优化",
            "Disable prebuild optimization": "禁用预构建优化",
                "This prevents codespaces from attempting to use an older image to speed up boot time. This could adversely affect performance.": "这可以防止代码空间尝试使用旧的映像来加快启动时间。这可能会对性能产生不利影响。",
            "Hide advanced options": "隐藏高级选项",
            "Create": "创建",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/settings/pages"] = { // 仓库设置页面(含组织仓库) /<user-name>/<repo-name>/settings
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // GitHub Pages 页面 /<user-name>/<repo-name>/settings/pages====================================
            "is designed to host your personal, organization, or project pages from a GitHub repository.": "旨在从 GitHub 仓库托管您的个人、组织或项目页面。",
            // 私有库 提醒
            "Upgrade or make this repository public to enable Pages": "升级或公开该仓库，以启用 GitHub Pages",
            "GitHub Pages is designed to host your personal, organization, or project pages from a GitHub repository.": "GitHub Pages 旨在从 GitHub 仓库中托管您的个人、组织或项目页面。",
            // 存档时 提醒
            "This repository has been archived. The associated GitHub Pages site remains published but settings are read-only.": "该仓库已存档。相关的 GitHub Pages 网站仍然发布，但设置是只读的。",

            // 已发布时
            "Your site is live at": "您的站点在",
                "Last": "最近",
                "deployed": "部署",
            "Visit site": "访问网站",
            "Unpublish site": "取消站点发布",
                // 顶部提醒
                    "GitHub Pages unpublished.": "GitHub  Pages 未发布。",

            "Build and deployment": "构建和部署",
                // 顶部提醒
                    "GitHub Pages source saved.": "GitHub Pages 源已保存。",
            "Source": "来源",
                // "GitHub Actions": "",
                    "Best for using frameworks and customizing your build process": "最适合使用框架和自定义构建过程",
                "Deploy from a branch": "从分支部署",
                    "Classic Pages experience": "经典页面体验",

            // GitHub Actions 部署模式
                "Send feedback": "发送反馈",
                "Use a suggested workflow,": "使用建议的工作流程，",
                "browse all workflows": "浏览所有工作流程",
                ", or": "，或",
                "create your own": "自建",

                "Configure": "设置",

                "Workflow details will appear here once your site has been deployed.": "部署站点后，工作流程详细信息将显示在此处。",
                "View workflow runs.": "查看工作流程运行情况。",

                "Your site was last deployed to the":"您的站点上次部署到",
                "environment by the":"环境，由",
                "pages build and deployment": "页面构建和部署",
                "workflow.":"工作流程。",
                "Learn more about deploying to GitHub Pages using custom workflows": "了解更多关于使用自定义工作流程部署到 GitHub Pages 的信息",

            // 从分支部署模式
            "Branch": "分支",
                // 禁用时
                "GitHub Pages is currently disabled. Select a source below to enable GitHub Pages for this repository.": "GitHub Pages 目前已被禁用。在下面选择一个源，为该仓库启用 GitHub Pages。",
                "GitHub Pages is currently disabled. You must first add content to your repository before you can publish a GitHub Pages site.": "GitHub Pages 目前已被禁用。您必须先将内容添加到您的仓库，然后才能发布 GitHub Pages 站点。",
                // 启用时
                "Your GitHub Pages site is currently being built from the": "您的 GitHub Pages 站点，目前正建立于",
                "folder in the": "目录在",
                "branch.": "分支。",
                "Learn more about configuring the publishing source for your site": "了解更多关于配置网站发布源的信息",

                "Select branch": "选择分支",
                    "None": "无",
                "Select folder": "选择文件夹",
                    "/ (root)": "/ (根目录)",

                "Learn how to": "了解如何",
                "add a Jekyll theme": "添加 Jekyll 主题",
                "to your site.": "到您的站点。",

            "Custom domain": "自定义域",
                "Custom domains allow you to serve your site from a domain other than": "自定义域允许您从其他域为您的站点提供服务，而不是",
                "Learn more about configuring custom domains": "了解更多关于配置自定义域的信息",
                    "Remove": "移除",
                    "Check again": "再检查一次",
                    // [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) DNS check is in progress./, "$1 的 DNS 检查正在进行。"],
                    "Please wait for the DNS check to complete.": "请等待 DNS 检查结束。",
                    // [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) is improperly configured/, "$1 配置不正确"],
                    // [/Your site's DNS settings are using a custom subdomain, ([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?), that's not set up with a correct CNAME record. We recommend you set this CNAME record to point at [YOUR USERNAME].github.io. For more information, see/, "您网站的 DNS 设置使用的是自定义子域 $1，该子域未设置正确的 CNAME 记录。我们建议您将此 CNAME 记录设置为指向 [YOUR USERNAME].github.io。有关详细信息，请参阅"],

                    "DNS records should point to the": "DNS记录应该指向",
                    "internationalized domain name": "国际化域名",

                    // 顶部提醒
                    "No changes to custom domain.": "没有对自定义域进行修改。",
                    "Custom domain removed. Please remember to remove any GitHub Pages DNS records for this domain if you do not plan to continue using it with GitHub Pages.": "自定义域已删除。如果您不打算继续使用 GitHub Pages，请记得删除此域的任何 GitHub Pages 的 DNS 记录。",

                "Enforce HTTPS": "强制 HTTPS",
                    "— Required for your site because you are using the default domain (": "— 必须先设置自定义域，目前您正在使用默认域 (",

                    "HTTPS provides a layer of encryption that prevents others from snooping on or tampering with traffic to your site.": "HTTPS 提供了一层加密，防止他人窥探或篡改您站点的流量。",
                    "When HTTPS is enforced, your site will only be served over HTTPS.": "当开启强制 HTTPS 时，您的站点将只通过 HTTPS 提供服务。",
                    "Learn more about securing your GitHub Pages site with HTTPS": "了解更多关于使用 HTTPS 保护 GitHub Pages 站点安全的信息",

            "Visibility": "可见性",
                "GitHub Enterprise": "GitHub 企业版",
                "With a GitHub Enterprise account, you can restrict access to your GitHub Pages site by publishing it privately. A privately published site can only be accessed by people with read access to the repository the site is published from. You can use privately published sites to share your internal documentation or knowledge base with members of your enterprise.": "使用 GitHub 企业版帐户，您可以通过私下发布来限制对 GitHub Pages 站点的访问。私下发布的站点只能由对发布该站点的仓库具有读取权限的人访问。您可以使用私下发布的站点与企业成员共享您的内部文档或知识库。",
                "Try GitHub Enterprise risk-free for 30 days": "免费无风险试用 GitHub 企业版 30 天",
                "Learn more about the visibility of your GitHub Pages site": "了解更多关于GitHub Pages 站点可见性的信息",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) DNS check is in progress./, "$1 的 DNS 检查正在进行。"],
        [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) is improperly configured/, "$1 配置不正确"],
        [/Your site's DNS settings are using a custom subdomain, ([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?), that's not set up with a correct CNAME record. We recommend you set this CNAME record to point at [YOUR USERNAME].github.io. For more information, see/, "您网站的 DNS 设置使用的是自定义子域 $1，该子域未设置正确的 CNAME 记录。我们建议您将此 CNAME 记录设置为指向 [YOUR USERNAME].github.io。有关详细信息，请参阅"],
    ],
};

I18N.zh["repository/settings/security_analysis"] = { // 仓库设置 - 代码安全性与分析 /<user-name>/<repo-name>/settings/security_analysis
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 代码安全性与分析 /<user-name>/<repo-name>/settings/security_analysis
            "Security and analysis features help keep your repository secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your repository. Unarchive your repository to access additional features.": "安全和分析功能有助于确保您的仓库安全和更新。通过启用这些功能，您授予我们对您的仓库执行只读分析的权限。解除您仓库的存档以访问其他功能。", //存档仓库
            "Security and analysis features help keep your repository secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your repository.": "安全和分析功能有助于确保您的仓库安全和更新。通过启用这些功能，您授予我们对您的仓库执行只读分析的权限。",

            "Private vulnerability reporting": "私下漏洞报告",
                "Allow your community to privately report potential security vulnerabilities to maintainers and repository owners.": "允许您的社区向维护者和仓库所有者私下报告潜在的安全漏洞。",
                "Learn more about private vulnerability reporting": "了解更多关于私下漏洞报告的信息",

            "Dependency graph": "依赖关系图",
                "Understand your dependencies.": "了解您的依赖项。",
                "Dependency graph is always enabled for public repos.": "公共仓库始终启用依赖关系图。",

                // 禁用对话框
                    "Disable dependency graph": "禁用依赖关系图",
                        "Disabling the dependency graph will also disable Dependabot alerts and Dependabot security updates.": "禁用依赖关系图也会禁用 Dependabot 警报和 Dependabot 安全更新。", // Dependabot 警报和 Dependabot 安全更新启用时
                        "Disabling the dependency graph will also disable Dependabot alerts.": "禁用依赖关系图也会禁用 Dependabot 警报。", // Dependabot 警报启用, Dependabot 安全更新未启用时

            // Dependabot
                "Keep your dependencies secure and up-to-date.":"保持您的依赖关系的安全和最新",
                "Learn more about Dependabot": "了解更多关于 Dependabot 的信息",

                "Dependabot alerts": "Dependabot 警报",
                    "Receive alerts for vulnerabilities that affect your dependencies and manually generate Dependabot pull requests to resolve these vulnerabilities.": "接收影响您的依赖关系的漏洞警报，并手动生成 Dependabot 拉取请求以解决这些漏洞。",
                    "Configure alert notifications": "配置警报通知",

                    // 启用对话框
                        "Enable Dependabot alerts": "启用 Dependabot 警报",
                            "Dependabot alerts needs the dependency graph to be enabled, so we'll turn that on too.": "Dependabot 警报需要启用依赖关系图，因此我们也将启用它。", // 依赖关系图未启用时

                    // 禁用对话框
                        "Disable Dependabot alerts": "禁用 Dependabot 警报",
                            "Disabling Dependabot alerts will also disable Dependabot security updates.": "禁用 Dependabot 警报也将禁用 Dependabot 安全更新。", // Dependabot 安全更新启用时

                    "Dependabot rules": "Dependabot 规则",
                        "Create your own custom rules and manage alert presets.": "创建您自己的自定义规则并管理警报预设。",
                        "Review and manage alert presets.": "查看和管理警报预设。", //私有库
                        // [/(\d+) rules? enabled/, "已启用 $1 条规则"],

            "Dependabot security updates": "Dependabot 安全更新",
                "Enabling this option will result in Dependabot automatically attempting to open pull requests to resolve every open Dependabot alert with an available patch. If you would like more specific configuration options, leave this disabled and use": "启用后，Dependabot 会自动尝试打开拉取请求，以使用可用补丁解决每个打开的 Dependabot 警报。如果您想要更具体的配置选项，请将其禁用并使用",
                    // "Dependabot rules": "Dependabot 规则",
                "Enabling this option will result in Dependabot automatically attempting to open pull requests to resolve every open Dependabot alert with an available patch.": "启用后，Dependabot 会自动尝试打开拉取请求，以使用可用补丁解决每个打开的 Dependabot 警报。", // 私有库

                // 启用对话框
                    "Enable Dependabot security updates": "启用 Dependabot 安全更新",
                        "Dependabot security updates needs the dependency graph and Dependabot alerts to be enabled, so we'll turn them on too.": "Dependabot 安全更新需要启用依赖关系图和 Dependabot 警报，因此我们也会将它们打开。",

            "Dependabot version updates": "Dependabot 版本更新",
                "Enable Dependabot version updates": "启用 Dependabot 版本更新",
                "Allow Dependabot to open pull requests automatically to keep your dependencies up-to-date when new versions are available.": "允许 Dependabot 自动打开拉取请求，以便在有新版本时保持您的依赖关系是最新的。",
                "Learn more about configuring a dependabot.yml file": "了解更多关于配置 dependabot.yml 文件的信息",
                "Configure": "配置",
                "― Create a config file": "― 创建配置文件",

            "Code scanning": "代码扫描",
                "Automatically detect common vulnerabilities and coding errors.": "自动检测常见漏洞和编码错误。",

                "Code scanning with GitHub Actions is not available for this repository.": "使用 GitHub Actions 进行代码扫描不适用于该仓库。",
                    "GitHub Actions policy is limiting the use of some required actions. To use code scanning, allow actions from `actions/*` and `github/codeql-action/*` in": "GitHub Actions 策略限制了某些必需操作的使用。要使用代码扫描，请允许 `actions/*` 和 `github/codeql-action/*` 的操作，在",
                "your policy": "您的策略",
                ", or": "，或",
                "submit code scanning results externally using the API": "使用 API 在代码扫描外部结果",

                "Tools": "工具",
                    "CodeQL analysis": "CodeQL 分析",
                        "Identify vulnerabilities and errors with": "识别代码中的漏洞和错误，通过",
                        "for": "为",
                        "eligible": "符合条件的",
                        "repositories.": "仓库。",
                        "Set up": "设置",
                        "Default": "默认",
                            "CodeQL will automatically find the best configuration for your repository.": "CodeQL 将自动给您的仓库找到最佳配置。",
                            "Languages detected in this repository are not compatible with this setup type at this time. Use the advanced setup instead.": "目前，该仓库中检测到的语言与该设置类型不兼容。请使用高级设置。",
                        "Advanced": "高级",
                            "Customize your CodeQL configuration via a YAML file checked into the repository.": "通过仓库中的 YAML 文件定制您的 CodeQL 配置。",
                        "Not supported": "不支持",
                        "Languages on this repository are not compatible with this feature. Learn more about": "该仓库上的语言与此功能不兼容。了解更多关于",
                        "supported languages and frameworks": "所支持的语言和框架",
                    "Other tools": "其他工具",
                        "Add any third-party code scanning tool.": "添加任意第三方代码扫描工具。",
                        "Explore workflows": "探索工作流程",

                "Protection rules": "保护规则",
                    "Pull request check failure": "拉取请求检查失败",
                        "Define which code scanning alert severity should cause a pull request check to fail. This also applies to analysis results uploaded via the API.": "定义哪种代码扫描警报严重程度会导致拉取请求检查失败。这也适用于通过 API 上传的分析结果。",
                    "None": "无",
                    "Only critical": "仅关键风险",
                    "High or higher": "高风险及以上",
                    "Medium or higher": "中风险及以上",
                    "Any": "任何",
                    "Other": "其他",
                        "Only errors": "仅错误",
                        "Errors and warnings": "错误和警告",

                // 顶部提醒
                "Code Scanning alert severity settings saved.": "代码扫描警报严重性设置已保存。",

            "Secret scanning": "机密扫描",
                "Receive alerts on GitHub for detected secrets, keys, or other tokens.": "在 GitHub 上接收有关检测到的秘密、密钥或其他令牌的警报。",
                "GitHub will always send alerts to partners for detected secrets in public repositories.": "GitHub 会始终向合作伙伴发送检测到公共仓库中机密的警报。",
                "Learn more about partner patterns": "了解更多关于合作伙伴模式的信息",
                    "Push protection": "推送保护",
                    "Block commits that contain": "阻止推送包含",
                    "supported secrets": "支持的机密",

            // 组织仓库
            "Access to alerts": "访问警报",
            "Admins, users, and teams in the list below have permission to view and manage Dependabot or secret scanning alerts. These users may be notified when a new vulnerability is found in one of this repository's dependencies and when a secret or key is checked in. They will also see additional details when viewing Dependabot security updates. Individuals can manage how they receive these alerts in their": "以下列表中的管理员、用户和团队有权限查看和管理 Dependabot 或秘钥扫描警报。当在此仓库的依赖项之一中发现新的漏洞，以及当密钥或令牌被嵌入时，可能会通知这些用户。在查看 Dependabot 安全更新时，他们还会看到其他详细信息。用户可以管理他们如何接收这些警报，在他们的",
            "notification settings": "通知设置",

            "Choose the people or teams you would like to grant access": "选择您要授予访问权限的人员或团队",
            "Search for people or teams": "搜索人员或团队",
            "People and teams with access": "具有访问权限的人员和团队",
            "Organization administrators, repository administrators, and teams with the security manager role": "具有安全管理员角色的组织管理员、仓库管理员和团队",
            "These members always see Dependabot and secret scanning alerts.": "这些成员总是能看到 Dependabot 和密钥扫描警报。",
            "Save changes": "保存更改",
    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/(\d+) rules? enabled/, "已启用 $1 条规则"],
    ],
};

I18N.zh["repository/settings/keys"] = { // 仓库设置 - 部署密钥 /<user-name>/<repo-name>/settings/keys
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 部署密钥 页面 /<user-name>/<repo-name>/settings/keys====================================
            "Add deploy key": "添加部署密钥",
            "There are no deploy keys for this repository": "此仓库暂无部署密钥",
            "Check out our": "查看我们的",
            "guide on deploy keys": "部署密钥指南",
            "to learn more.": "了解更多。",
            "Last used within the last week": "最后一次使用是最近 1 周之内",
            "— Read/write": "— 读取和写入权限",
            "— Read": "— 读取权限",

            // 密钥删除对话框
            "Are you sure you want to delete this SSH key?": "您确定要删除此 SSH 密钥吗？",
            "This action": "该操作",
            "cannot": "不能",
            "be undone. This will permanently delete the SSH key, and if you’d like to use it in the future, you will need to upload it again.": "被撤销。这将永久地删除 SSH 密钥，如果您想在未来使用它，您将需要再次上传它。",
            "I understand, delete this SSH key": "我明白了，依然删除该 SSH 密钥",

            // 顶部提醒
            "Okay, you have successfully deleted that key.": "好的，您已成功删除该密钥。",
            "Key is invalid. You must supply a key in OpenSSH public key format": "密钥无效。您必须提供 OpenSSH 公钥格式的密钥",

        // 部署密钥新建 页面 /<user-name>/<repo-name>/settings/keys/new====================================
            "/ Add new": "/ 新添",
            "Title": "标题",
            "Key": "密钥",
            "Allow write access": "允许写访问",
            "Can this key be used to": "该密钥允许",
            "push": "推送",
            "to this repository? Deploy keys always have pull access.": "到这个仓库？部署密钥始终具有拉取访问权限。",
            "Add key": "添加密钥",
            // 顶部提醒
            "Key is invalid. You must supply a key in OpenSSH public key format": "密钥无效。您必须提供 OpenSSH 公钥格式的密钥",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Last used within the last (\d+) weeks?/, "最后一次使用是最近 $1 周之内"], // /keys
        [/Last used within the last (\d+) months?/, "最后一次使用是最近 $1 个月之内"], // /keys
    ],
};

I18N.zh["repository/settings/secrets"] = { // 仓库设置 - 机密 /<user-name>/<repo-name>/settings/secrets
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 操作机密 /<user-name>/<repo-name>/settings/secrets/actions
            "Actions secrets and variables": "操作机密和变量",
            "New repository secret": "新建仓库机密",
            "Secrets and variables allow you to manage reusable configuration data. Secrets are": "秘密和变量允许您管理可重复使用的配置数据。机密是",
            "encrypted": "被加密",
            "and are used for sensitive data.": "并用于敏感数据。",
            "Learn more about encrypted secrets": "了解更多关于加密机密的信息",
            ". Variables are shown as plain text and are used for": "。变量显示为纯文本，用于",
            "non-sensitive": "不敏感",
            "data.": "数据。",
            "Learn more about variables": "了解更多关于变量的信息",

            "Anyone with collaborator access to this repository can use these secrets and variables for actions. They are not passed to workflows that are triggered by a pull request from a fork.": "任何有协作者权限的人都可以使用这些机密和变量进行操作。它们不会被传递到由复刻的拉取请求触发的工作流中。",

            "Secrets": "机密",
            "Variables": "变量",

            "Updated": "更新于",
            "Remove": "移除",

            // 顶部提醒
            "Failed to add secret. Secret names can only contain alphanumeric characters ([a-z], [A-Z], [0-9]) or underscores (_). Spaces are not allowed. Must start with a letter ([a-z], [A-Z]) or underscores (_).": "添加机密失败。机密名称只能包含字母数字字符（[a-z]、[A-Z]、[0-9]）或下划线 (_)。不允许有空格。必须以字母 ([a-z], [A-Z]) 或下划线 (_) 开头。",

            "Environment secrets": "环境机密",
            "Manage environments": "管理环境",
            "There are no secrets for this repository’s environments.": "此仓库的环境暂无机密。",
            // "Encrypted environment secrets allow you to store sensitive information, such as access tokens, in your repository environments.": "加密的环境机密允许您在仓库环境中存储敏感信息，例如访问令牌。",
            // "Manage your environments and add environment secrets": "管理您的环境并添加环境机密",

            "Repository secrets": "仓库机密",
            "There are no secrets for this repository.": "此仓库暂无机密。",
            // "Encrypted secrets allow you to store sensitive information, such as access tokens, in your repository.": "加密的机密允许您在仓库中存储敏感信息，例如访问令牌。",

            //组织仓库
            "Secrets can also be created at the organization level and authorized for use in this repository.": "机密也可以在组织层面上创建，并授权在这个仓库中使用。",
            "Organization secrets": "组织机密",
            "Manage organization secrets": "管理组织机密",
            "Organization secrets can only be used by public repositories on your plan.": "组织机密只能由您计划中的公共仓库使用。",
            "If you would like to use organization secrets in a private repository, you will need to upgrade your plan.": "如果您想在私有仓库中使用组织机密，则需要升级您的计划。",

            // 删除机密对话框
            "Remove secret": "删除机密",
                "Are you sure you want to delete": "您确定要删除",
                "Yes, remove this secret": "是的，删除该机密",

            // 顶部提醒
                "Repository secret added.": "添加了仓库机密。",
                "Repository secret deleted.": "删除了仓库机密。",

        // /<user-name>/<repo-name>/settings/variables/actions
            "New repository variable": "新建仓库变量",

            "Environment variables": "环境变量",
            "There are no variables for this repository’s environments.": "此仓库的环境暂无变量。",

            "Repository variables": "仓库变量",
            "There are no variables for this repository.": "此仓库暂无变量。",

        // 新建仓库机密 /<user-name>/<repo-name>/settings/secrets/actions/new
            "Actions secrets": "操作机密",
            "/ New secret": "/ 新建机密",

            "Name": "名称",
            "Secret": "机密",

            "Add secret": "添加机密",
                "Adding…": "添加中…",

        // 新建仓库变量 /<user-name>/<repo-name>/settings/variables/actions/new
            "Actions variables": "操作变量",
            "/ New variable": "/ 新建变量",
            "Note: Variable values are exposed as plain text. If you need to encrypt and mask sensitive information,": "注意：变量值是以纯文本形式暴露的。如果您需要对敏感信息进行加密和屏蔽，请使用",
            "create a secret": "创建机密",
            "instead.": "代替。",

            "Alphanumeric characters ([a-z], [A-Z], [0-9]) or underscores (_) only.": "字母数字字符（[A-Z]，[A-Z]，[0-9]）或仅下划线（_）。",
            "Spaces are not allowed.": "不允许出现空格。",
            "Cannot start with a number.": "不能以数字开头。",
            "Cannot start with": "不能以",
            "prefix.": "前缀开头。",

            "Add variable": "添加变量",

        // 更新操作机密 /<user-name>/<repo-name>/settings/secrets/actions/<name>
            "/ Update secret": "/ 更新机密",

            "Value": "值",

            "Update secret": "更新机密",
                "Updating…": "更新中…",

        // 代码空间机密 /<user-name>/<repo-name>/settings/secrets/codespaces
            "Codespaces secrets": "代码空间机密",
            "Secrets are environment variables that are": "机密是环境变量",
            ". Anyone with": "。任何对此仓库具有",
            "collaborator": "协作者",
            "access to this repository can use these secrets for Codespaces.": "访问此仓库可以将这些秘密用于代码空间。",

        // Dependabot 机密 /<user-name>/<repo-name>/settings/secrets/dependabot
            "Dependabot secrets": "Dependabot 机密",
            "Secrets are credentials that are": "机密是凭证",
            "access to this repository can use these secrets for Dependabot.": "访问权限的人可以将这些机密用于 Dependabot。",
            "Secrets are not passed to forks.": "机密不会传递给复刻。",
            "Encrypted secrets allow you to store private access tokens so that Dependabot can update dependencies from private registries.": "加密的机密允许您存储私有访问令牌，以便 Dependabot 可以从私有注册表更新依赖项。",

            // 组织仓库
            "No organization secrets have been authorized for this repository.": "该仓库暂无授权任何组织机密。",
            // [/Organization secrets for ([^ ]+) can be managed within/, "$1  的组织机密可以管理，在"],
            "organization settings": "组织设置",

            // 顶部提醒
            "Secret updated.": "机密已更新",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
        [/Organization secrets for ([^ ]+) can be managed within/, "$1  的组织机密可以管理，在"], // /secrets/dependabot
    ],
};
I18N.zh["repository/settings/variables"] = I18N.zh["repository/settings/secrets"];

I18N.zh["repository/settings/installations"] = { // 仓库设置 - GitHub 应用 /<user-name>/<repo-name>/settings/installations
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 集成应用 页面 /<user-name>/<repo-name>/settings/installations====================================
        // 全局设置在 Applications 应用 /settings/installations
            "Installed GitHub Apps": "安装的 GitHub 应用",
            "GitHub Apps augment and extend your workflows on GitHub with commercial, open source, and homegrown tools.": "GitHub 应用通过商业、开源和自主开发的工具来增强和扩展您在 GitHub 上的工作流程。",
            "Configure": "配置",

            "There aren't any GitHub Apps installed on this repository.": "此仓库上未安装任何 GitHub 应用。",
            "Developed by": "开发者:",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/settings/notifications"] = { // 仓库设置 - 邮件通知 /<user-name>/<repo-name>/settings/notifications/edit
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],

        // 邮件通知管理 页面 /<user-name>/<repo-name>/settings/notifications/edit ====================================
            "Setup email addresses to receive notifications when push events are triggered.": "设置电子邮箱地址，以便在推送事件被触发时收到通知。",
            "Asterisk (*) denotes a required field": "星号 (*) 表示必填字段",
            "Address": "电子邮箱地址",
            "Whitespace separated email addresses (at most two).": "用空格分隔的电子邮箱地址（最多两个）。",
            "Approved header": "批准的标题",
            "Sets the": "设置",
            "Active": "激活",
            "header to automatically approve the message in a read-only or moderated mailing list.": "标头以自动批准只读或审核邮件列表中的邮件。",
            "We will send notification emails to the listed addresses when a":"我们将向所列地址发送通知邮件，当",
            "event is triggered.":"事件被触发。",
            "Setup notifications": "设置通知",

    },
    "regexp": [ // 正则翻译
        ...I18N.zh["repository-public"]["regexp"],
    ],
};

I18N.zh["repository/transfer"] = { // 转让仓库
    "static": { // 静态翻译

        // 转让仓库 /<user-name>/<repo-name>/transfer
            "Transfer this repository to another user or to an organization where you have the ability to create repositories.": "将该仓库转让给另一位用户或一个您可以创建仓库的组织。",
            "Required fields are marked with an asterisk (*).": "带星号 (*) 的为必填项。",
            "To understand admin access, teams, issue assignments, and redirects after a repository is transferred, see": "要了解仓库转移后的管理员访问权限、团队、问题分配和重定向，请参阅",
            "Transferring a repository": "转让仓库",
            "in GitHub Help.": "在 GitHub 帮助中。",
            "Transferring may be delayed until the new owner approves the transfer.": "转让可能会延迟，直到新所有者批准转让。",
            "There": "有",
            "are": " ",
            "is": " ",
            "that may be affected by this transfer.": "可能受到这次转让的影响。",
            "New owner": "新所有者",
            "Select one of my organizations": "选择一个我的组织",
            "Choose an owner": "选择所有者",
            "Filter…": "筛选…",
            "Specify an organization or username": "指定组织或用户名",
            "Repository name": "仓库名",
                "Checking availability…": "检查可用性…",
                "The repository": "仓库",
                "already exists on this account": "已经存在于此帐户",
                "Your new repository will be created as": "您的新仓库将被创建为",
                "New repository name must not be blank": "新仓库名称不能为空",

            // 私有仓库转让
                "If": "如果",
                "username": "用户名",
                "is using": "使用",
                "and accepts the transfer, they will lose access to private repository features:": "并接受转移，他们将失去对私有仓库功能的访问：",
                "Code owners": "代码所有者",
                "Any existing": "任何已存在的",
                "wikis": "WiKi",
                "Pulse, Contributors, Community, Traffic, Commits, Code Frequency, Network,": "统计，贡献者，社区，流量，提交，代码频率，网络，",
                "Forks": "复刻",
                "on the": "在",
                "Insights": "洞察",
                "tab": "标签页",
                "Draft": "草案",
                "PRs": "拉取请求",
                "Multiple assignees": "多个受让人",
                "for issues and PRs": "的议题和拉取请求",
                "Multiple reviewers": "多个审阅者",
                "for PRs": "的拉去请求",
                "Branch and tag protection rules": "分支和标签保护规则",

                "can": "可",
                "upgrade": "升级",
                "their plan before accepting the transfer to avoid losing access.": "他们的计划在接受转让之前，以避免失去访问权。",

            "Individual users, teams, and apps will be removed from the following options:": "个人用户、团队和应用将从以下选项中删除：",
                "Repository ruleset bypassers": "仓库规则旁路设置",
                "Protected branch pull request bypassers": "受保护分支拉取请求旁路设置",
                "Protected branch authorized pull request review dismissers": "受保护分支授权拉取请求审核驳回者",
                "Protected branch authorized pushers": "受保护分支授权的推送者",
                "Protected branch allowed force pushers": "受保护分支允许强制推送者",

            "Warning: This is a potentially destructive action.": "警告：这是一个潜在的破坏性行为。",

            "to confirm.": "进行确认。",
            "I understand, transfer this repository.": "我明白了，依然转让该仓库。",

    },
    "regexp": [ // 正则翻译
        [/Transfer repository:/, "转让仓库:"],
        [/(\d+) codespaces?/, "$1 个代码空间"],
        [/is available./, "名称可用。"],
    ],
};
// 仓库相关==

I18N.zh["homepage"] = { // 未登录的首页
    "static": { // 静态翻译
        // 顶部栏
        "Product": "产品",
        "Team": "团队",
        "Enterprise": "企业",
        // "Pricing": "价格",
        "Search GitHub": "在 GitHub 上搜索",
        "Sign in": "登录",
        "Sign up": "注册",

        "Let’s build from here": "让我们从这里开始",
        "Harnessed for productivity. Designed for collaboration. Celebrated for built-in security. Welcome to the platform developers love.": "驾驭生产力。专为协作而设计。以内置安全性着称。欢迎来到广大开发者喜爱的平台。",

        "Email address": "电子邮箱地址",
        "Sign up for GitHub": "注册 GitHub",
        "Start a free enterprise trial": "开始免费试用企业版",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["session-authentication"] = { // 登录页 包含(/login, /session, /sessions/two-factor, sessions/recovery, /sessions/recovery/token, /password_reset等)
    "static": { // 静态翻译

        // 登录页 https://github.com/login
            "Sign in to GitHub": "登录 GitHub",
            "Sign in to": "登录",
            "to continue to": "继续登录",
            "Username or email address": "用户名或电子邮箱",
            "Password": "密码",
            "Forgot password?": "忘记密码？",
            "Sign in": "登录",
            "Sign in with a passkey": "使用通行密钥登录",
            "Signing in…": "登录中…",

            "Add an account": "添加账号", // 添加新账号
            "Want to create an account?": "想要新建一个帐户吗？", // 添加新账号

            "Or": "或",
            // "This browser or device does not fully support passkeys.": "此浏览器或设备不完全支持通行密钥。",
            "This browser or device is reporting partial passkey support.": "此浏览器或设备报告部分支持通行密钥。",
            "Sign-in with a passkey": "使用通行密钥登录",

            "New to GitHub?": "初次接触 GitHub？",
            "Create an account": "那就注册个帐户吧",

            "Contact GitHub Support": "联系 GitHub 支持",

            // 验证状态提醒
            "Incorrect username or password.": "用户名或密码不正确。",
            "Recovery code authentication failed.": "恢复码身份验证失败。",

        // 设备激活 https://github.com/login/device
            "Device Activation": "设备激活",
            "Enter the code displayed on your device": "输入您的设备上显示的代码",
            "Continue": "继续",
            "GitHub staff will never ask you to enter your code on this page.": "GitHub 工作人员绝不会要求您在此页面上输入您的代码。",

        // https://github.com/login/device/failure?reason=not_found
            "Uh oh, we couldn't find anything": "呃，我们找不到任何东西",
            "Please make sure you entered the user code correctly.": "请确保您输入正确的用户代码。",

        // 双重身份验证登录 https://github.com/sessions/two-factor/app
            // "Learn more": "了解更多",
            // "Learn more.": "了解更多。",
            "Confirm password to continue": "确认密码以继续",
            "Confirm password": "确认密码",
            "Tip:": "提示：",

            "Two-factor authentication": "双重身份验证",
            "Authentication code": "验证码",
                "More information about Authentication Codes": "更多关于验证码的信息",
            //"Signing in…": "登录中…",
            "6-digit code": "6位验证码",
            "Verify": "验证",
                "Verifying": "验证中",
                "Verifying…": "验证中…",
            "Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code.": "打开您的移动设备上的 “双重身份验证器” 应用（TOTP），以查看您的身份验证码。",

            "Use this method for future logins": "今后的登录中使用此方法",
                "Future logins on this device will prompt you to use": "今后在该设备上的登录将提示您使用",
                "an authentication code": "一个验证码",
                "by default.": "作为默认方式。",

            "Having problems?": "有问题吗？",
                "Use your passkey": "使用您的通行密钥",
                "Authenticate with GitHub Mobile": "使用 GitHub Mobile 进行身份验证",
                "Use a recovery code or begin 2FA account recovery": "使用恢复码或开始 2FA 帐户恢复",

        // https://github.com/sessions/two-factor/mobile
            "We sent you a sign-in request on your GitHub Mobile app. Enter the digits shown below to verify your identity.": "我们向您的 GitHub Mobile 应用发送了一个登录请求。输入下面显示的数字以验证您的身份。",
            "We could not verify your identity": "我们无法核实您的身份",
            "Retry": "请重试",

            "Unable to verify with GitHub Mobile?": "无法使用 GitHub Mobile 进行验证？",
                "Enter two-factor authentication code": "输入双重身份验证码",

            // 验证状态提醒
            "Sign-in request timed out.": "登录请求超时。",

        // https://github.com/sessions/two-factor/webauthn
            "Passkey": "通行密钥",
            "When you are ready, authenticate using the button below.": "准备好后，请使用下面的按钮进行身份验证。",
            "Use passkey": "使用通行密钥",

            "Authentication failed.": "认证失败。",
            "Retry passkey": "重试通行密钥",

            "Unable to verify with your passkey?": "无法验证您的通行密钥？",

        // 双重身份验证恢复 https://github.com/sessions/two-factor/recovery
            "Two-factor recovery": "双重身份验证恢复",
            "Recovery code": "恢复码",

            "If you are unable to access your mobile device, enter one of your recovery codes to verify your identity.": "如果您无法访问您的移动设备，请输入您的一个恢复码以验证您的身份。",

            "Don't have a recovery code?": "没有恢复码？",
            "Where to find recovery codes": "哪里可以找到恢复码",

            "Locked out?": "被锁在外面了吗？",
            "Try recovering your account, or unlink your account email address(es)": "请尝试恢复您的帐户，或取消关联您的帐户电子邮件地址。",

            // 恢复帐户对话框
            "Recovering your account": "恢复您的帐户",
            "If you can’t access a verified device or recovery codes you can request a reset of your authentication settings. For security reasons": "如果您无法访问已验证的设备或恢复码，您可以请求重置您的验证设置。出于安全考虑",
            "this can take 1-3 days": "这可能需要 1-3 天",
            "Step 1": "第一步",
            "Verify an email associated with this account.": "验证与该帐户相关的电子邮箱。",
            "Step 2": "第二步",
            "Verify a device, SSH key or personal access token.": "验证一个设备、SSH 密钥或个人访问令牌。",
            "Step 3": "第三步",
            "GitHub support will review your request": "GitHub Support 将审查您的请求",
            "within 1-3 days": "在 1-3 天内",
            "I understand, get started": "我知道了，开始吧",

            "Two-factor authentication failed.": "双重身份验证失败。",

        // 帐户恢复 https://github.com/sessions/recovery
            "Account recovery": "帐户恢复",
            "The account recovery process can take 1-3 business days. We recommend one of the following if possible.": "帐户恢复过程可能需要 1-3 个工作日。如果可能，我们推荐以下其中一项。",
            "Enter a recovery code": "输入恢复码",
                "The file containing your recovery codes may exist on your computer - check for a file named": "包含恢复码的文件可能存在于您的计算机上——请检查一个名为",
            //使用 GitHub Mobile 应用进行身份验证
            "It looks like you have a GitHub Mobile session that could be used for two-factor authentication. If you have access to your mobile device, you may be able to use it to login.": "看起来您有一个 GitHub Mobile 会话，可以用来进行双重身份验证。如果您能访问您的移动设备，您也许能用它来登录。",

            "First we need to verify an email address": "首先，我们需要验证一个电子邮箱地址",
            "by sending a one-time password to all addresses associated with this account.": "用于通过向该帐户关联的所有地址发送一次性密码。",
            "Send one-time password": "发送一次性密码",

            // 验证提醒
            "Recovery email sent": "已发送恢复电子邮件",

            "One-time password": "一次性密码",
            "Verify email address": "验证电子邮箱地址",
            "We sent an email to all addresses associated with this account containing a one-time password.": "我们向与该帐户相关的所有邮箱地址发送了一封电子邮件，其中包含一个一次性的密码。",
            "Resend email": "重新发送邮件",

            "Next we need to verify an alternative factor.": "接下来，我们需要验证另一个因素。",
            "This can be a verified device, an SSH key or a personal access token associated with this account.": "这可以是一个经过验证的设备，一个SSH 密钥或一个与此帐户相关的个人访问令牌。",
            "Cannot verify this device": "无法验证该设备",
            "or verify a": "或者验证",
            "SSH key": "SSH 密钥",
            "Personal access token": "个人访问令牌",

            "Unable to verify an alternative factor?": "无法验证另一个因素？",
            "Contact support": "联系支持部门",

            // "Sign in to": "登录",
            // "To continue to": "继续登录",

            // 定时确认您的帐户恢复设置
            "Confirm your account recovery settings": "确认您的帐户恢复设置",
            "Are your account recovery settings up to date? If not, you risk getting locked out of your account.": "您的帐户恢复设置是否最新？如果没有，您就有被锁定帐户的风险。",
            "Emails": "电子邮箱",
                "View and update your email addresses": "查看和更新您的电子邮箱地址",

                "Verified emails": "经过验证的电子邮箱",
                    // [/(\d+) verified emails?/, "$1 个经过验证的邮箱"],
                "Verified emails give you access to more features on GitHub.": "经过验证的电子邮箱让您可以使用 GitHub 上的更多功能。",
            "Password Alternatives": "密码替代方案",
                // 通行密钥
                "Passkeys are a password replacement that validates your identity using touch, facial recognition, a device password, or a PIN.": "通行密钥是一种密码替代品，可通过触摸、面部识别、设备密码或 PIN 验证您的身份。",
            "Two-factor methods": "双重身份验证方式",
                "Your preferred 2FA method is": "您首选的 2FA 方式是",
                "Configured": "已配置",
                "Not configured": "未配置",

                "Authenticator app": "身份验证器应用",
                    "Use an authentication app or browser extension to get two-factor authentication codes when prompted.": "在出现提示时，使用身份验证应用或浏览器扩展获取双重身份验证码。",
                "SMS/Text message": "短信/文字信息",
                    // [/You will receive authentication code to this phone number:/, "您将收到此手机号码的验证码："]
                "Security keys": "安全密钥",
                    "Security keys are hardware devices that can be used as your second factor of authentication.": "安全密钥是一种硬件设备，可以作为您的第二个验证步骤。",
                "GitHub Mobile": "GitHub Mobile",
                    "GitHub Mobile can be used for two-factor authentication by installing the GitHub Mobile app and signing in to your account.": "通过安装 GitHub Mobile 应用并登录帐户，可以使用 GitHub Mobile 来进行双重身份验证。",
                    "No devices": "没有设备",
                "SMS number": "手机号码",
            "Recovery options": "恢复选项",
                "Recovery codes": "恢复码",
                    "Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.": "恢复码可用于在您无法访问设备且无法接收双重身份验证码的情况下访问您的帐户。",
                    "Viewed": "已查看",

            "Make changes": "进行更改",
            "Confirm": "确认",
            "Remind me later": "稍后提醒我",

        // 验证个人访问令牌 https://github.com/sessions/recovery/token
            "Verify a personal access token": "验证个人访问令牌",
            "you've used in the past to verify your account. The token must have": "您过去曾用于验证您的帐户。令牌必须具有",
            "scope.": "范围。",
            "Verify and submit for review": "验证并提交审核",

            // 验证提醒
            "Unable to verify personal access token": "无法验证个人访问令牌",

        // 配置无密码身份验证 https://github.com/sessions/trusted-device?return_to=%2Fsettings%2Fsecurity
            "Configure passwordless authentication": "配置无密码身份验证",
            "Add a passkey": "添加通行密钥",
            "Your device supports passkeys, a password replacement that validates your identity using touch, facial recognition, a device password, or a PIN.": "您的设备支持密码替代方案，通过触摸、面部识别、设备密码或者 PIN 码来验证您的身份。",

            "Passkeys can be used for sign-in as a simple and secure alternative to your password and two-factor credentials.": "通行密钥可以作为一种简单且安全的替代方式，用于登录而不需要密码和双重身份验证。",
            "Add passkey": "添加通行密钥",
            "Passkey registration failed.": "密钥注册失败。",
            "Ask me later": "稍后再问",
            "Not interested?": "没兴趣？",
            "Don't ask again for this browser": "不要再询问此浏览器",

            "Successfully added a passkey": "已成功添加通行密钥",
            "From now on, you can use this passkey to sign-in to GitHub.": "从现在起，您可以使用此通行密钥登录 GitHub。",
            "Passkey nickname": "通行密钥昵称",
            "Continue...": "继续中...",

        // 重置密码 https://github.com/password_reset
            "Reset your password": "重置您的密码",
            "Enter your user account's verified email address and we will send you a password reset link.": "输入您的用户帐户经过验证的电子邮箱，我们将向您发送一份带密码重置链接的邮件。",
            "Enter your email address": "输入您的邮箱地址",
            "Verify your account": "验证您的帐户",
            "Send password reset email": "发送密码重置邮件",
            "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.": "检查您的电子邮件以获取重置密码的链接。如果它在几分钟内没有出现，请检查您的垃圾邮件文件夹。",
            "Return to Sign in": "返回登录",

        // 授权访问 sudo 模式身份验证
            "Confirm access": "授权访问",
            "Authentication code": "验证码",
                "More information about sudo mode authentication": "更多关于 sudo 模式身份验证的信息",
            "Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.": "打开您的双重身份验证器 (TOTP) 应用或浏览器扩展以查看您的身份验证码。",
            "Verify": "验证",
            "Verify": "验证",
            "Verifying…": "验证中…",
            "Your authentication code has been sent.": "您的验证码已发送。",

            "Having problems?": "有问题吗？",
            "Use GitHub Mobile": "使用 GitHub Mobile",
            "Use your authenticator app": "使用您的身份验证器应用",
            "Send a code via SMS": "通过短信发送验证码",
            "Resend SMS": "重新发送短信",
            "Use your password": "使用您的密码",

            "GitHub Mobile": "GitHub Mobile",
            "Creating a verification request for your GitHub Mobile app.": "为您的 GitHub Mobile 应用创建验证请求。",
            "We sent you a verification request on your GitHub Mobile app. Enter the digits shown below to enter sudo mode.": "我们向您的 GitHub Mobile 应用发送了一个验证请求。输入下面显示的数字以进入 sudo 模式。",
            "We could not verify your identity": "我们无法核实您的身份",
            "Retry": "请重试",

            "We just sent you a message via SMS with your authentication code. Enter the code in the form above to verify your identity.": "我们刚刚通过短信向您发送了一条消息，其中包含您的验证码。在上面的表格中输入验证码以验证您的身份。",

            // "Password": "密码",
            // "Forgot password?": "忘记密码？",
            "Confirm": "确认",

            "You are entering": "您正在进入",
            "sudo mode": "Sudo 模式",
            ". After you've performed a sudo-protected action, you'll only be asked to re-authenticate again after a few hours of inactivity.": "。在您执行了受 sudo 保护的操作后，在几个小时不活动后才会要求您重新进行身份验证。",

        // 首次设置双重身份验证 https://github.com/settings/two_factor_authentication/setup/intro

            "Enable two-factor authentication (2FA)": "启用双重身份验证 (2FA)",
            "Loading…": "载入中…",

            // 第1步
                "Setup authenticator app": "设置身份验证器应用",
                "Authenticator apps and browser extensions like": "身份验证器应用和浏览器扩展，例如",
                ", etc. generate one-time passwords that are used as a second factor to verify your identity when prompted during sign-in.": "等生成一次性密码，在登录过程中出现提示时用作第二个因素来验证您的身份。",

                "Scan the QR code": "扫描二维码",
                "Re-scan the QR code": "重新扫描二维码",
                "Use an authenticator app or browser extension to scan.": "请使用身份验证器应用或浏览器扩展进行扫描。",
                "Learn more about enabling 2FA": "了解更多关于启用 2FA 的信息",

                "Unable to scan? You can use the": "无法扫描？您可以使用",
                "setup key": "设置密钥",
                "to manually configure your authenticator app.": "手动配置您的身份验证器应用。",
                    "Your two-factor secret": "您的双因素密钥",

                "Verify the code from the app": "验证来自身份验证器应用的验证码",
                "Two-factor code verification failed. Please try again.": "双重身份验证码验证失败。请重试。",

                "Setup SMS authentication": "设置短信验证",
                    "Get authentication codes by SMS on your mobile phone when signing into GitHub. Make sure that": "登录 GitHub 时通过手机短信获取验证码。确保",
                    "your country is supported": "支持您的国家/地区",
                    "for SMS delivery.": "用于短信发送。",
                    "Country code": "国家代码",
                    "Your phone number": "您的手机号码",
                    "Send authentication code": "发送验证码",
                    "Sent. It may take a minute for the SMS to arrive.": "已发送。短信可能需要一分钟时间才能送达。",
                    "Verify the code sent to your phone": "验证发送到您手机的验证码",

                "Continue": "继续",

                "Alternative 2FA option:": "备选 2FA 选项:",
                "SMS authentication": "短信验证",
                    "Get one-time codes sent to your phone via SMS to complete authentication requests.": "通过短信向您的手机发送一次性代码，以完成认证请求。",
                "Authenticator app": "身份验证器应用",
                    "Use an authentication app or browser extension to generate one-time codes.": "使用身份验证应用或浏览器扩展生成一次性代码。",
                "Select": "选择",

            // 第2步
                "Download your recovery codes": "下载您的恢复码",
                "You can use recovery codes as a second factor to authenticate in case you lose access to your device. We recommend saving them with a secure password manager such as": "您可以使用恢复码作为第二个因素来进行身份验证，以防您无法访问您的设备。我们建议使用安全的密码管理器保存它们，例如",
                "Keep your recovery codes in a safe spot": "将您的恢复码保存在安全的地方",
                "If you lose your device and don't have the recovery codes, you will lose access to your account.": "如果您丢失了您的设备，并且没有恢复码，您将无法访问您的帐户。",

                "Download":"下载",
                "I have saved my recovery codes": "我已经保存了我的恢复码",

            // 第3步
                "Two-factor authentication (2FA) is now enabled for your GitHub account": "现已为您的 GitHub 帐户启用双重身份验证 (2FA)",
                "You have enabled two-factor authentication using SMS.": "您已使用 SMS 启用双重身份验证",
                "You have enabled two-factor authentication using your authenticator app.": "您已使用身份验证应用启用双重身份验证",

                "Don't get locked out, configure additional authentication methods": "别被锁在外面，配置额外的身份验证方法",
                "Configuring additional authentication methods will help you gain access to your account in case you lose your device and don't have your recovery codes.": "配置额外的认证方法将帮助您在丢失设备和没有恢复码的情况下获得对账户的访问。",

                "Security key": "安全密钥",
                    "Use your device with Touch ID, Windows Hello, etc. or a physical security key (e.g. YubiKey)": "使用您的设备配合 Touch ID、Windows Hello 等功能或物理安全密钥（例如YubiKey）。",
                    "Manage": "管理",
                    "Register new security key": "注册新安全密钥",
                    "Enter a nickname for this security key": "输入安全密钥的昵称",
                    "Waiting for input from browser interaction...": "等待来自浏览器交互的输入...",
                    "Security key registration failed.": "安全密钥注册失败。",
                    "Try again": "请重试",

                "GitHub Mobile": "GitHub Mobile",
                    "Install": "安装",
                    "The GitHub Mobile app on your phone can be used as a 2FA method. Enable it by installing the GitHub Mobile app for": "您手机上的 GitHub Mobile 应用可用作双重身份验证方法。通过安装 GitHub Mobile 应用（",
                    "and signing in to your account.": "）并登录您的帐户来启用它。",
                "Done": "完成",

        // 定期验证双重身份验证（2FA）设置
            "Verify your two-factor authentication (2FA) settings": "验证您的双重身份验证（2FA）设置",
            "This is a one-time verification of your recent configured 2FA credentials.": "这是对您最近配置的双重身份验证凭据进行一次性验证。",
            "Make sure that 2FA is correctly configured, and avoid a potential account lockout disaster. If you're having trouble verifying, you'll be able to reconfigure 2FA for your account.": "确保正确配置双重身份验证，避免可能的账户锁定灾难。如果您在验证时遇到问题，可以重新为您的账户配置双重身份验证。",
            "Verify 2FA now": "现在验证双重身份验证",
            "You can choose to": "您可以选择",
            "skip 2FA verification": "跳过双重身份验证",
            "at this moment, we'll remind you again tomorrow.": "此刻，我们会在明天再次提醒您。",

        // https://github.com/settings/two_factor_checkup?
            "Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.": "打开您的双重身份验证器（TOTP）应用或浏览器扩展，以查看您的身份验证码。",
            "Verify your 2FA setup tomorrow": "明天验证您的双重身份验证设置",
            "Reconfigure 2FA on this account": "重新配置双重身份验证",

        // https://github.com/settings/two_factor_checkup
            "2FA verification successful!": "双重身份验证成功！",
            "Keep your recovery codes safe and easy to access": "请将您的恢复码保管好以便于访问。",
            "As a reminder, recovery codes can be used as a second factor to authenticate in case you lose your device. If you don't have your recovery codes, you may lose access to your account.": "作为提醒，恢复码可用作第二个身份验证因素，以防您丢失设备。如果您没有恢复码，则可能无法访问您的帐户。",
            "Not sure where you saved them?": "您不确定把它们保存在哪里了吗？",

        // https://github.com/settings/security
            "Two-factor authentication (2FA)": "双重身份验证 (2FA)",
            "is required for your GitHub account": "您的 GitHub 帐户需要",

            "This will only take a minute.": "只需一分钟时间。",
            "Enable 2FA now. You'll be able to continue on with your work right after.": "立即启用双重身份验证。之后您将能够继续您的工作。",

            "Two-factor authentication adds an": "双重身份验证增加了一个",
            "additional layer of account security": "额外的账户安全保护",
            ". It is a proven method of keeping you safe from hackers and account takeover, even if your password is stolen or compromised.": "。这是一种行之有效的方法，即使您的密码被盗或泄露，也能保证您不被黑客和账户接管。",
            "Enable 2FA now": "立即启用双重身份验证",

            "You have": "您还有",
            "left to enable 2FA. Take action now to avoid additional interruptions.": "时间启用双重身份验证。请立即采取行动以避免额外的干扰。",
            "Remind me tomorrow": "明天提醒我",

        // 登出页面 https://github.com/logout
            "Are you sure you want to sign out?": "您确定要登出？",
            "Sign out": "登出",

    },
    "regexp": [ // 正则翻译
        [/(\d+) verified emails?/, "$1 个经过验证的邮箱"],
        [/(\d+) devices?/, "$1 设备"],
        [/You will receive authentication code to this phone number:/, "您将收到此手机号码的验证码："]
    ],
};
I18N.zh.login = I18N.zh["session-authentication"];
I18N.zh.logout = I18N.zh["session-authentication"];
I18N.zh.session = I18N.zh["session-authentication"];
I18N.zh.sessions = I18N.zh["session-authentication"];
I18N.zh.password_reset = I18N.zh["session-authentication"];

I18N.zh["signup"] = { // 注册页
    "static": { // 静态翻译
        "Already have an account?": "已经有帐户吗？",
        "Sign in →": "登录 →",
        "Welcome to GitHub!": "欢迎来到 GitHub!",
        "Let’s begin the adventure": "让我们开始探险吧",
        "Enter your email": "输入您的电子邮箱地址",
            "Email is invalid or already taken": "电子邮箱地址无效或已被占用",
        "Continue": "继续",
        "Create a password": "创建密码",
            "Password is too short": "密码太短",
            "Password needs a number and lowercase letter": "密码需要有数字和小写字母",
            "Password is strong": "密码很强",
            "Make sure it's": "请确保",
                "at least 15 characters": "至少需要15个字符",
                "OR": " 或者",
                "at least 8 characters": "至少需要8个字符",
                "including a number": "包括数字",
                "and a lowercase letter": "和小写字母",
            "Password may be compromised": "密码可能被泄露",
            "Password is in a list of passwords commonly used on other websites": "密码在其他网站常用的密码列表中",
        "Enter a username": "输入您的用户名",
            "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.": "用户名只能包含字母数字字符或单个连字符，并且不能以连字符开头或结尾。",
        "Would you like to receive product updates and announcements via email?": "您是否愿意通过电子邮件接收产品更新和公告？",
        "Type \"y\" for yes or \"n\" for no": "输入 \"y\" 表示愿意，输入 \"n\" 表示不愿意。",
        "Verify your account": "验证您的帐户",
        "Create account": "创建帐户",
        "By creating an account, you agree to the": "创建帐户即表示您同意",
        "Terms of Service": "服务条款",
        ". For more information about GitHub's privacy practices, see the": "。关于 GitHub 隐私条款的更多信息，请参见",
        "GitHub Privacy Statement": "GitHub 隐私声明",
        ". We'll occasionally send you account-related emails.": "。我们偶尔会向您发送与帐户相关的电子邮件。",
    },
    "regexp": [ // 正则翻译
        [/Username ([^ ]+) is not available./, "用户名 $1 不可用。"],
        [/([^ ]+) is available./, "用户名 $1 可用。"],
    ],
};

I18N.zh["notifications"] = { // 通知页面
    "static": { // 静态翻译
        "Notifications": "通知",
        "All": "所有",
        "Unread": "未读",

        "Inbox": "收件箱",
        "Saved": "已保存",
        "Save": "保存",
        "Done": "已完成",
        "Filters": "筛选",
        "Dismiss": "忽略",
        "get started": "开始",
        "Subscribe": "订阅",
        "Unsubscribe": "退订",

        "Filter notifications": "筛选通知",
            "Sorry, we don't support the": "抱歉，我们不支持",
            "filter yet.": "筛选器。",
            "Learn more about filters.": "了解更多关于筛选器的信息。",

            "- submit": "- 提交",

            "Available filters": "可用筛选器",
            "filter by repository": "按仓库筛选",
            "filter by status or discussion type": "按状态或评论类型筛选",
            "filter by notification reason": "按通知原因筛选",
            "filter by notification author": "按通知作者筛选",
            "filter by organization": "按组织筛选",
        "Group by:": "分组：",
        "Group by: Date": "分组：日期",
        "Group by: Repository": "分组：仓库",
        "Date": "日期",
        "Repository": "仓库",
        // [/(\d+) new notifications?/, "$1 条新通知"], // 通知管理页

        // 筛选结果
        "No results": "无结果",
        "No notifications matched your query.": "没有与您的查询相匹配的通知。",

        "Select all": "全选",
        "selected": "条被选中",
        "Mark as read": "标记为已读",
        "Mark as unread": "标记为未读",
        "Mark as done": "标记为已完成",
        "Move to inbox": "移动到收件箱",

         "Clear selection":"清除选中",

        //"Mark all as read": "全部标为已读",
        //"Are you sure?": "您确定吗？",
        //"Are you sure you want to mark all unread notifications as read?": "您确定要将所有的未读通知标记为已读？",
        //"Mark all notifications as read": "全部标为已读",

        "Clear out the clutter.": "清除混乱。",
        "Get the most out of your new inbox by quickly and easily marking all of your previously read notifications as done.": "快速轻松地将所有已阅读的通知标记为已完成，以充分利用新的收件箱。",
        "Overwhelmed by notifications? We've found some repositories that may be causing notifications you don't need.": "通知不知所措？我们发现了一些仓库，这些仓库可能会导致您不需要的通知。",
        "Update watching settings": "更新关注设置",

        "Manage notifications": "管理通知",
        "Notification settings": "通知设置",
        "Watched repositories": "关注的仓库",
        "Subscriptions": "订阅",
        "Watching": "关注",

        "subscribed": "订阅",
        "mention": "提及",
        "commented": "评论",
        "author": "作者",
        "manual": "手动",
        "state change": "状态更改",

        "View all gist notifications": "查看全部 Gist 通知", // 仓库分组模式

        "Prev": "上一页",
        "Previous": "上一页",
        "Next": "下一页",

        "change notification settings": "更改通知设置",
        "you can change how you receive notifications from your account settings.": "您可以从帐户设置更改接收通知的方式。",
        "unwatch suggestions": "取消关注建议",
        "these repositories may be causing unnecessary notifications.": "这些仓库可能导致不必要的通知。",
        "unwatch all": "取消所有关注",
        "customize": "自定义",

        "🎯 Assigned": "🎯 已分配",
        "💬 Participating": "💬 参与",
        "✋ Mentioned": "✋ 提及",
        "🙌 Team mentioned": "🙌 提到的团队",
        "👀 Review requested": "👀 审查请求",
        "Name": "名称",
        "Filter inbox by…": "筛选收件箱…",
        "Create new filter": "创建新规则",
        "Create": "创建",
        "Query": "规则",

        "All caught up!": "处理完了！",
        "Take a break, write some code, do what you do best.": "休息一下，写一些代码，做您最擅长的事。",
        "Save something important": "保存重要的东西",
        "Notifications you save will appear here to read later.": "您保存的通知会出现在这里，以便以后阅读。",
        "Mark notifications as done so you can move on with your work.": "将通知标记为已完成，以便您可以继续工作。",
        "New activity appears in your inbox.": "新活动出现在您的收件箱中。",

        // /notifications?query=repo 某个仓库
        "We've noticed that you rarely interact with this repository, are you sure you need notifications?": "我们注意到您很少与此仓库交互，您确定需要通知吗？",
        "Unwatch": "取消关注",
        // "Notifications": "通知类型",
            "Participating and @mentions": "参与和 @您",
            "Only receive notifications from this repository when participating or @mentioned.": "仅在参与或 @您 时接收来自此仓库的通知。",
            "All Activity": "所有活动",
            "Notified of all notifications on this repository.": "接收来自此仓库所有通知。",
            "Ignore": "忽略",
            "Never be notified.": "永不接收通知。",
            "Custom": "自定义",
            "Select events you want to be notified of in addition to participating and @mentions.": "选择除参与和 @您 之外还要接收通知的事件。",
            "Discussions are not enabled for this repo": "此仓库未启用讨论功能",
            "Releases": "发行版",
            "Discussions": "讨论",
                "Discussions are not enabled for this repository": "该仓库未启用讨论功能",
            "Security alerts": "安全警报",
            //"Cancel": "取消",
            "Apply": "应用",
    },
    "regexp": [ // 正则翻译
        [/(\d+) selected/, "$1 条被选中"],
        [/Select all (\d+) notifications?/, "选中全部 $1 条通知"],
        [/View all (\d+) notifications?/, "查看全部 $1 条通知"], // 仓库分组模式
        [/(\d+) new notifications?/, "$1 条新通知"],
        [/of (\d+)/, " 共 $1 条"],
    ],
};

I18N.zh["watching"] = { // 关注的仓库页面
    "static": { // 静态翻译
        "Notifications": "通知",
        "Watching": "关注",
        "Subscriptions": "订阅",
        "Custom": "自定义",
        // "Ignoring": "忽略",

        "Unwatch suggestions": "取消关注建议",
        "These repositories may be causing unnecessary notifications.": "这些仓库可能导致不必要的通知。",

        //
        "Are you sure?": "您确定吗?",
        // [/By unwatching these (\d+) repositor(y|ies), you will only receive notifications when participating or @mentioned./, "取消对这 $1 个仓库的关注，您将只在参与或 @您 时收到通知。"], //取消所以关注

        "Ignoring": "忽略",
        "Stop ignoring": "取消忽略",
        "Watch": "关注",
        "Unwatch": "取消关注",

        //"Watched repositories": "关注的仓库",

        // "Stop ignoring": "取消忽略",
        //"Sorted by most recently watched.": "按最近关注排序",
        "Unwatch all": "取消所有关注",
            "Unwatch repositories by owner": "按所有者取消关注仓库",
            "Find a repository owner": "查找仓库所有者",
            "All repositories": "所有仓库",
             // [/([^ ]+)'s repositories/, "$1 的仓库"],
        "Stop watching all repositories": "取消关注所有的仓库",

        // 取消所有者关注仓库对话框
        // [/Confirm unwatching ([^ ]+)'s repositories/, "确认不关注 $1 的仓库"],
        // [/You will stop receiving notifications for all repositories owned by ([^ ]+) that you are watching./, "您将停止接收您所关注的 $1 拥有的所有仓库的通知。"],

        // 关注 & 订阅通知设置 下拉菜单
        // "Notifications": "通知类型",
        "Participating and @mentions": "参与和 @您",
        "Only receive notifications from this repository when participating or @mentioned.": "仅在参与或 @您 时接收来自此仓库的通知。",
        "All Activity": "所有活动",
        "Notified of all notifications on this repository.": "接收来自此仓库所有通知。",
        "Ignore": "忽略",
        "Never be notified.": "永不接收通知。",
        // "Custom": "自定义",
        "Select events you want to be notified of in addition to participating and @mentions.": "选择除参与和 @您 之外还要接收通知的事件。",
        "Discussions are not enabled for this repo": "此仓库未启用讨论功能",
        "Releases": "发行版",
        "Discussions": "讨论",
            "Discussions are not enabled for this repository": "该仓库未启用讨论功能",
        "Security alerts": "安全警报",
        //"Cancel": "取消",
        "Apply": "应用",

        "Notification settings": "通知设置",
        "You can change how you receive notifications from your account settings.": "您可以从帐户设置更改接收通知的方式。",
        "Change notification settings": "更改通知设置",
    },
    "regexp": [ // 正则翻译
        [/By unwatching these (\d+) repositor(y|ies), you will only receive notifications when participating or @mentioned./, "取消对这 $1 个仓库的关注，您将只在参与或 @您 时收到通知。"],
        [/Unwatch (\d+) repositor(y|ies)/, "取消对 $1 个仓库关注"],
        [/You will stop receiving notifications for the (\d+) repositor(y|ies) you are watching./, "您将停止接收您正在关注的 $1 个仓库的通知。"],
        [/Confirm unwatching ([^ ]+)'s repositories/, "确定不关注 $1 的仓库"],
        [/You will stop receiving notifications for all repositories owned by ([^ ]+) that you are watching./, "您将停止接收您所关注的 $1 拥有的所有仓库的通知。"],
        [/([^ ]+)'s repositories/, "$1 的仓库"],
    ],
};

I18N.zh["notifications/subscriptions"] = { //订阅的仓库页面
    "static": { // 静态翻译
        "Notifications": "通知",
        "Watching": "关注",
        "Subscriptions": "订阅",

        "Reason": "原因",
            "Filter by reason": "按原因筛选",
            "Any reason": "任何原因",
            "Show all subscriptions": "显示所有订阅",
            "Assign": "分配",
            "You were assigned to the Issue/PR.": "您被分配到议题/拉取请求。",
            "Author": "作者",
            "You created the thread.": "您创造了这个话题。",
            "Comment": "评论",
            "You commented on the thread.": "您评论了这个话题。",
            "Manual": "手动",
            "You subscribed to the thread (via an Issue or Pull Request).": "您订阅了该主题（通过议题或拉取请求）。",
            "Mention": "提及",
            "You were specifically @mentioned in the content.": "在内容中特别 @您。",
            "Review Requested": "请求审查",
            "You were requested for review.": "您被要求进行审查。",
            "State Change": "状态变化",
            "You changed the thread state (for example, closing an Issue or merging a Pull Request).": "您更改了话题状态（例如，关闭议题或合并拉取请求）。",
            "Team Mention": "提及团队",
            "You were on a team that was mentioned.": "您在团队中被提及。",
        "Repository": "仓库",
            "Filter by repository": "按仓库筛选",
            "Filter repository": "筛选仓库",
            "All repositories": "所有仓库",
            "Loading repositories…": "载入仓库中…",
        "Sort:": "排序：",
            "Sort by": "排序方式",
            "Most recently subscribed": "最近订阅最多的",
            "Least recently subscribed": "最近订阅最少的",

        "Reason:": "原因：",
        "Repository:": "仓库：",
        "Clear current filters": "清除当前筛选器",
        "No results matched your search.": "没有符合您的搜索结果。",

        "selected": "个被选中",
        "Unsubscribe": "取消订阅",

        "opened": "打开",
        "• subscribed": "• 订阅于",
        "• updated": "• 更新于",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["stars"] = { // 星标 https://github.com/stars/<用户名>
    "static": { // 静态翻译
        "Your Stars": "我的星标",
        "Browse your starred repositories and topics": "浏览我的星标仓库和主题",
        "Your Starred Repositories": "我的星标仓库",
        "Browse your starred repositories": "浏览我的星标仓库",
        "Your Starred Topics": "我的星标主题",
        "Browse your starred topics": "浏览我的星标主题",

        "Browse starred repositories and topics": "浏览星标仓库和主题",
        "Starred Repositories": "星标仓库", // 他人
        "Browse starred repositories": "浏览星标仓库", // 他人
        "Starred Topics": "星标主题", // 他人
        "Browse starred topics": "浏览星标主题", // 他人

        "Search stars…": "搜索星标主题...",
        "Sort:": "排序：",
            // 筛选下拉
            "Sort options": "排序选项",
            "Recently starred": "最近标星",
            "Recently active": "最近活跃",
            "Most stars": "最多标星",

        "Sponsor": "赞助",
        "Unstar": "已加星标于",
        "See all starred repositories": "查看所有星标仓库",
        "See all starred topics": "查看所有星标主题",

        "You don’t have any starred topics, yet.": "您尚无任何的星标主题。",
        "As you": "如果您",
        "explore GitHub": "探索 GitHub",
        ", star topics to save them for later and they’ll show up here.": " 时，将主题标星保存起来，它们会在这里显示出来。",


        // 右侧栏
        "All stars": "所有星标",
        "All repositories": "所有仓库",
        "Your repositories": "我的仓库",
        "Others’ repositories": "其他仓库",
        "Topics": "主题",

        "Filter by languages": "按语言筛选",
        "Jump to a friend": "去好基友那",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["issues"] = { // 议题页面
    "static": { // 静态翻译
        "Pull Requests": "拉取请求", // pulls

        "Public": "公共",
        "Private": "私有",
        "Public archive": "公共存档",
        "Private archive": "私有存档",

        "Created": "已创建",
        "Assigned": "已分配",
        "Mentioned": "提到的",
            "Issues mentioning you": "提及您的议题",
            "Pull Requests mentioning you": "提及您的拉取请求", // pulls
        "Review requests": "审查请求", // pulls
            "Pull Requests requesting your review": "请求您审查的拉取请求", // pulls

        "Search all issues": "搜索所有议题",

        "Visibility": "可见性",
        "Repository visibility": "仓库可见性",
        "Private repositories only": "只有私有仓库",
        "Public repositories only": "只有公共仓库",

        "Organization": "组织",
        "Filter by organization or owner": "按组织或所有者筛选",
        "Filter organizations": "筛选组织",

        "Sort": "排序",
        "Sort by": "排序方式",
        "Newest": "最新的",
        "Oldest": "最早的",
        "Most commented": "最多评论",
        "Least commented": "最少评论",
        "Recently updated": "最近更新",
        "Least recently updated": "最早更新",
        "Best match": "最佳匹配",
        "Most reactions": "最多回应",

        // 状态词
        "was merged": "已合并",
        "was closed": "已关闭",
        "Approved": "已批准",
        "Review required": "需要审查", // 拉取请求 页面状态词
            "Review required before merging": "合并前需要审查",
        "Changes requested": "已请求更改",
        "outdated": "陈旧的",
        "Draft": "草案",

        // "No results matched your search.": "没有符合您的搜索结果。",
        // 筛选结果
        "No results matched your search.": "没有与您的搜索匹配的结果。",
        "You could search": "您可以搜索",
        "all of GitHub": "所有 GitHub",
        "or try an": "或者尝试",
        "advanced search": "高级搜索",

        // "Use the links above to find what you’re looking for, or try": "使用上面的链接找到您要找的内容，或尝试",
        // "a new search query": "新的搜索查询",
        // ". The Filters menu is also super helpful for quickly finding issues most relevant to you.": "。筛选菜单也是快速找到议题最相关的您超级有帮助的。",
        // "Updated in the last three days": "更新了最后三天：",
        "ProTip!": "专业提示！",
            "Mix and match filters to narrow down what you’re looking for.": "通过混合和匹配筛选器以缩小您要查找的范围。",
            "Notify someone on an issue with a mention, like:": "在某个问题上通知并提及某人，例如：",
            "Exclude everything labeled": "如果要找到所有标有",
            "with": "标签的，请使用",

        // 键盘快捷键
            "Pull request list"  : "拉取请求列表",
                "Open pull request"  : "打开拉取请求",
            "Pull request - Conversation tab": "拉取请求 - 对话选项卡",
                "Open in github.dev editor"  : "在 github.dev 编辑器中打开",
                "Open github.dev editor in a new tab"  : "在新标签页中打开 github.dev 编辑器",
                "Submit comment": "提交评论",
                "Submit comment and close or open pull request": "提交评论并关闭或打开拉取请求",
                "Submit comment and close issue": "提交评论并关闭??议题", // 议题
                "Preview comment": "预览评论",
                "Create issue": "创建议题", //议题
                "Request reviewers": "请求审阅者",
                "Filter by author"             : "按作者筛选",
                "Filter by or edit assignees"  : "按受理人筛选或编辑受理人",
                "Filter by or edit labels"     : "按标签筛选或编辑标签",
                "Filter by or edit projects"   : "按项目筛选或编辑项目",
                "Filter by or edit milestones" : "按里程碑筛选或编辑里程碑",
                "Link an issue or pull request from the same repository": "链接同一仓库的议题或拉取请求",
                "Reply (quoting selected text)": "答复（引用所选文本）",
                "Open saved replies": "打开快捷回复（引用所选文本）",
                "Insert saved reply (with open saved replies)": "插入快捷回复（打开快捷回复）",
                "Toggle visibility of all collapsed review comments instead of just the current one": "切换所有折叠审查评论的可见性，而不仅仅是当前的审查评论",
            "Pull request - Files changed tab": "拉取请求 - 文件更改标签卡",
                "Open commits list": "打开提交列表",
                "Open files list": "打开文件列表",
                "Next commit": "下一个提交",
                "Previous commit": "上一个提交",
                "Show or hide annotations": "显示或隐藏批注",
                "Show or hide comments": "显示或隐藏评论",
                "Submit a review comment": "提交审查意见",
                "Collapse or expand all files instead of just the current one": "折叠或展开所有文件，而不仅仅是当前文件",
                    "and click": "和点击",
    },
    "regexp": [ // 正则翻译
        [/(\d+) Open/, "$1 打开"],
        [/(\d+) Closed/, "$1 已关闭"],
        [/(\d+) tasks? done/, "$1 个任务完成"],
        [/(\d+) of (\d+) tasks?/, "$1 / $2 个任务"],
        [/(\d+) tasks?/, "$1 个任务"],
        [/(\d+) review approvals?/, "$1 次审查批准"],// 拉取请求页 "已批准' 浮动提示
        [/(\d+) review requesting changes?/, "$1 条请求更改评论"],
        [/([\d,]+) linked issues?/, "$1 个关联议题"],
        [/([\d,]+) linked pull requests?/, "$1 个关联拉取请求"],
        [/(\d+) \/ (\d+) checks? OK/, "$1 / $2 检查 OK"], // 对勾 的提醒 /pulls
        [/Assigned to ([^ ]+)/, "分配给 $1"],
        // [/Updated/, "更新于"],
        [/#(\d+) opened/, "#$1 打开于"],
        [/#(\d+) by/, "#$1 打开者"],
    ],
};
I18N.zh.pulls = I18N.zh.issues;

I18N.zh["search"] = { // 搜索页面
    "static": { // 静态翻译
        // 搜索 https://github.com/search >>>>>>>>>>>>>>>>>>>>>>>>
            "Search GitHub": "在 GitHub 上搜索",

            // ProTip
            "For an": "要进行",
            "advanced search": "高级搜索",
            ", use our": "，使用我们的",
            "prefixes": "前缀",

            // 搜索技巧 对话框 (忽略 不翻译)
            "Search cheat sheet": "搜索小技巧",
            "GitHub’s search supports a variety of different operations. Here’s a quick cheat sheet for some of the common searches.": "GitHub 的搜索支持各种不同的操作。下面是一些常见搜索的快速小抄。",
            "For more information, visit our": "有关更多信息，请访问我们的",
            "search help section": "搜索帮助章节",
            "Basic search": "基本搜索",
            "This search": "关键规则",
            "Finds repositories with…": "查找仓库...",
            "Repository search": "仓库搜索",
            "Code search": "代码搜索",
            "Issue search": "议题搜索",
            "User search": "用户搜索",

        // 搜索结果页面 https://github.com/search?q=  >>>>>>>>>>>>>>>>>>>>>>>>
            // 左侧菜单
            "Filter by": "筛选",
            "Code": "代码",
            "Repositories": "仓库",
            "Commits": "提交",
            "Discussions": "讨论",
            "Topics": "主题",
            "Users": "用户",
            "More": "更多",

            "States": "状态",
            "Closed": "已关闭",
            "Open": "打开",

            "Languages": "语言",
            "More languages...": "更多语言...",

            // &type=code
            "More repositories...": "更多仓库...",
            "Paths": "路径",
            "More directories...": "更多路径...",

            // &type=registrypackages
            "Types": "类型",

            // &type=issues
            "State": "状态",

            "Advanced": "高级搜索",
                "Owner": "所有者",
                "Size": "尺寸",
                "Number of followers": "关注数",
                "Number of forks": "复刻数",
                "Number of stars": "星标数",
                "Date created": "创建日期",
                "Date pushed": "推送日期",
                "Topic": "话题",
                "License": "许可证",
                "Archived": "存档",

                // &type=code
                "Symbol": "符号",
                "Exclude archived": "排除存档",

                // &type=issues
                "Close reason": "关闭原因",
                "Has linked pull request": "已关联的拉取请求",
                "Author": "作者",
                "Assignee": "受理人",
                "Mentioned user": "提及的用户",
                "Mentioned team": "提及的团队",
                "Commenter": "评论者",
                "Involved user": "相关用户",
                "Label": "标签",
                "Milestone": "里程碑",
                "Number of comments": "评论数",
                "Number of interactions": "互动数",

                // &type=pullrequests
                "CI status": "CI 状态",
                "Review status": "审查状态",
                "Merged": "已合并",
                "Not merged": "未合并",

                // &type=discussions
                "Organization": "组织",
                "Involves user": "相关用户",

                // &type=users
                "Full name": "全称",
                "Location": "地区",
                "Language": "语言",
                "Sponsorable": "可赞助",

                // &type=commits
                "Committer": "提交至",
                "Author email": "作者电子邮箱",
                "Committer email": "提交者电子邮箱",
                "Merge commits": "合并提交",
                "Hash": "哈希值",
                "Parent hash": "父哈希值",
                "Tree hash": "树哈希值",

            "Advanced search": "高级搜索",
                // &type=wikis
                "User": "用户",
                "Repository": "仓库",
                "Last updated date": "最后更新日期",
                // &type=topics
                "Curated topics": "策划主题",
                "Featured topics": "精选主题",
                "Number of repositories": "仓库数",
                "Creation date": "创建日期",

            "Cheat sheet": "搜索技巧",

            "Sort by:": "排序方式：",
                // 筛选下拉
                // &type=repositories
                "Sort options": "排序选项",
                "Best match": "最佳匹配",
                "Most stars": "最多星标",
                "Fewest stars": "最少星标",
                "Most forks": "最多复刻",
                "Fewest forks": "最少复刻",
                "Recently updated": "最近更新",
                "Least recently updated": "最早更新",
                // 提交
                "Recently committed": "最近提交",
                "Least recently committed": "最早提交",
                "Recently authored": "最近撰写",
                "Least recently authored": "最早撰写",
                // 议题
                "Most commented": "最多评论",
                "Least commented": "最少评论",
                "Newest": "最新",
                "Oldest": "最早",
                // 讨论
                "Highest score": "得分最高",
                "Lowest score": "得分最低",
                // 软件包
                "Most downloads": "最多下载",
                "Fewest downloads": "最少下载",
                // 用户
                "Most followers": "最多关注者",
                "Fewest followers": "最少关注者",
                "Most recently joined": "最近加入",
                "Fewest recently joined": "最早加入",
                "Least recently joined": "最早加入",
                "Most repositories": "最多仓库",
                "Fewest repositories": "最少仓库",

            "More options": "更多选项",
            "View search docs": "查看搜索文档",

            // 部分状态词
            "Updated": "更新于", // &type=repositories
            "committ": "提交",
            "committed": "提交于", // &type=commits
            "Opened": "打开于", // &type=issues
            "Last updated": "最近更新于", // &type=wikis
            "posted": "发布于", // &type=discussions

            // 保存对话框
            "Create saved search": "创建保存的搜索",
                "Use saved searches to filter your results more quickly": "使用保存的搜索更快地筛选结果",
                "Name": "名称",
                "Query": "询问",
                "To see all available qualifiers, see our": "要查看所有可用的限定符，请参阅我们的",
                "documentation": "文档",

                "Name has already been taken": "名称被占用",

            // &type=repositories
                "Public": "公共",
                "Private": "私有",
                "Public archive": "公共存档",
                "Private archive": "私有存档",

                "Sponsor": "赞助",
                // [/Sponsor ([^ ]+)?/, "赞助 $1"], // 赞助按钮 对话框 标题
                // 赞助对话框
                "External links": "外部链接",
                "Learn more about funding links in repositories": "了解更多关于仓库中的赞助链接的信息",
                "Report abuse": "举报滥用",

                // 右侧栏
                    "Sponsor open source projects you depend on": "赞助您依赖的开源项目",
                    "Contributors are working behind the scenes to make open source better for everyone—give them the help and recognition they deserve.": "贡献者们正在幕后努力，为每个人创造更好的开源环境——给予他们应有的帮助和认可",
                    "Explore sponsorable projects": "探索可赞助项目",

                    "How can we improve search?": "我们如何改进搜索？",
                    "Give feedback": "提供反馈意见",

            // &type=code
                // [/Show ([\d,]+) more matches?/, "显示更多 $1 处匹配"],
                "Show less": "显示更少",
                "This file contains": "该文件还包含",
                "more": "处",
                "match": "匹配",
                "matches": "匹配",
                "not shown.": "未显示。",
                "See all": "查看完整文件中的所有",
                "matche in the full file": "处匹配",
                "matches in the full file": "处匹配",

            // &type=issues
                "Learn how you can use GitHub Issues to plan and track your work.": "了解如何使用 GitHub 议题计划和跟踪工作。",
                "Save views for sprints, backlogs, teams, or releases. Rank, sort, and filter issues to suit the occasion. The possibilities are endless.": "保存冲刺、待办事项、团队或发布的视图。根据场合对议题进行排名、排序和筛选。可能性是无止境。",
                "Learn more about GitHub Issues": "了解更多关于 GitHub 议题的信息",

            // &type=registrypackages
                "Learn GitHub Packages": "了解 GitHub 软件包",
                "GitHub Packages is a platform for hosting and managing packages, including containers and other dependencies. Get started with publishing or installing packages yourself.": "GitHub 软件包是一个托管和管理包（包括容器和其他依赖项）的平台。开始自行发布或安装软件包吧",
                "Learn more about GitHub Packages": "了解更多关于 GitHub 软件包的信息",

            // &type=topics
                "Related:": "相关的：",

            // &type=registrypackages
                "latest": "最新",

            "Your search did not match any": "您的搜索没有匹配任何",
            "code": "代码",
            "issue": "议题",
            "issues": "议题",
            "pull request": "拉取请求",
            "pull requests": "拉取请求",
            "discussion": "讨论",
            "discussions": "讨论",
            "commit": "提交",
            "commits": "提交",
            "package": "软件包",
            "packages": "软件包",
            "wikis": "Wiki",
            "Try one of the tips below to find more code": "请尝试使用以下提示查找更多代码",

            "However we found": "然而我们发现",
            "and": "和",
            "that matched your search query. Alternatively try one of the tips below.": "与您的搜索查询相匹配。或者尝试以下提示之一。",

            "Search across repositories": "跨仓库搜索",
                "Within a repository:": "在仓库内：",
                "Across several:": "跨越几个：",
                "Alternative way:": "替代方式：",

                "Note that we don't currently support regular expressions in the repo or org qualifiers. For more information on search syntax, see our": "请注意，我们目前不支持 repo 或 org 限定符中的正则表达式。更多关于搜索语法的信息，请参阅我们的",
                "syntax guide": "语法指南",

            "Search across an organization": "跨组织搜索",
                "Within an organization:": "在组织内：",
                "User's code:": "用户代码：",

            "Find a particular file extension": "查找特定的文件扩展名",
                "With .txt extensions:": "带有 .txt 扩展名：",
                "JavaScript and TypeScript files:": "JavaScript 和 TypeScript 文件：",

                "The path qualifier can search the entire file path, not just the extension, and supports regular expressions. For more information, see our": "路径限定符可以搜索整个文件路径，而不仅仅是扩展名，并且支持正则表达式。更多信息，请参阅我们的",

            "Why wasn't my code found?": "为什么找不到我的代码？",
                "When you search within a repository for the first time, please note that the repository undergoes reindexing.": "首次在仓库中搜索时，请注意仓库会进行重新索引。",
                "This process may take a few minutes.": "这一过程可能需要几分钟。",

                "The index currently includes more than 70 million popular public repositories, plus all private repositories that users search for.": "该索引目前包括超过 7000 万个流行的公共仓库，以及用户搜索的所有私有仓库。",
                "Beyond that, we also don't include all files in the search index:": "除此之外，我们也不会将所有文件都纳入搜索索引：",
                    "Vendored and generated code is excluded": "排除供应和生成的代码",
                    "Empty files and files over 350 kiB are excluded": "排除空文件和超过 350 kiB 的文件",
                    "Only UTF-8 encoded files are indexed": "仅对 UTF-8 编码的文件进行索引",
                    "Very large repositories may not be indexed": "非常大的仓库可能不会被索引",

                "We intend to continue to increase the amount of code available in the index as much as possible. If we are missing files that are useful to you, feel free to": "我们打算继续尽可能增加索引中可用的代码量。如果我们缺少对您有用的文件，请随意在此处",
                "provide feedback here": "提供反馈",

            "Regular expressions": "正则表达式",
                "Sparse followed by index:": "稀疏跟随索引：",
                "Lines that end with return:": "以回车结束的行：",
                "File paths matching:": "文件路径匹配：",

                "Note that you'll have to escape any slashes in the regex. For more information, see our": "注意，您必须在 正则中转义任何斜线。更多信息，请参阅我们的",

            "Saved searches": "保存搜索",
                "Always searching within the same organization or set of repositories? Try constructing a query and click the save button in the top right corner.": "总是在同一个组织或一组仓库中搜索？请尝试创建一个查询，然后点击右上角的保存按钮。",

            "You could try an": "您可以尝试",

        // 高级搜索 https://github.com/search/advanced >>>>>>>>>>>>>>>>>>>>>>>>
            // 高级搜索
            // "Advanced search": "高级搜索",
            "Search": "搜索",
            "Advanced options": "高级选项",
            "From these owners": "指定作者",
            "In these repositories": "指定仓库",
            "Created on the dates": "创建日期",
            "Written in this language": "使用语言",
            "Any Language": "任何语言",
                "Popular": "流行的",
                "Everything else": "其他语言",

            "Repositories options": "仓库选项",
            "With this many stars": "指定星标数",
            "With this many forks": "指定复刻数",
            "Of this size": "仓库大小",
            "Pushed to": "推送于",
            "With this license": "用何种许可证",
                "Any license": "任意许可证",
                "Licenses": "许可证",
                "License families": "许可证系列",
            "Return repositories": "搜索结果",
            "not": "不",
            // "and": "要",
            "only": "仅",
            "including forks.": "包含复刻仓库。",

            "Code options": "代码选项",
            "With this extension": "文件后缀",
            "Of this file size": "文件大小",
            "In this path": "文件路径",
            "With this file name": "文件名称",
            "Return code": "搜索结果",
            // "Return code from forked repositories": "搜索结果包括被复刻的仓库。",

            "Issues options": "议题选项",
            "In the state": "议题状态",
                "open/closed": "打开/关闭",
                "open": "打开",
                "closed": "已关闭",
            "With the reason": "原因",
                "any reason": "任何原因",
                "completed": "已完成",
                "not planned": "未计划",
                "reopened": "重新打开",
            "With this many comments": "评论数量",
            "With the labels": "议题标签",
            "Opened by the author": "提议人",
            "Mentioning the users": "提及谁",
            "Assigned to the users": "分配给谁",
            "Updated before the date": "更新于",

            "Users options": "用户选项",
            "With this full name": "用户全称",
            "From this location": "来自哪里",
            "With this many followers": "有多少关注者",
            "With this many public repositories": "有多少公共仓库",
            "Working in this language": "擅长什么语言",
            "Wiki options": "Wiki 选项",

    },
    "regexp": [ // 正则翻译
        [/Show ([\d,]+) more matches?/, "显示更多 $1 处匹配"],
        [/(\d+) issues? needs? help/, "$1 个议题需要帮助"],
        [/Sponsor ([^ ]+)?/, "赞助 $1"], // 赞助按钮 对话框 标题
    ],
    "selector": [ // 元素筛选器规则
        ["#search_form > div.container-lg.p-responsive.advanced-search-form > fieldset:nth-child(2) > label > select > option:nth-child(2)", "要"],
        ["#search_form > div.container-lg.p-responsive.advanced-search-form > fieldset:nth-child(3) > label > select > option:nth-child(2)", "要"],
    ],
};
I18N.zh["repository/search"] = I18N.zh["search"];

I18N.zh["discussions"] = {
    "static": { // 静态翻译
        // https://github.com/discussions
            "Discussions": "讨论",

            "Created": "已创建",
            "Commented": "已评论",

            "Search all discussions": "搜索所有讨论",

            "No discussions match the selected filters.": "没有符合所筛选条件的讨论。",
            "Discussions are used to ask questions and have open-ended conversations.": "讨论用于提出问题并进行开放式对话。",

        // https://github.com/discussions/commented
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["gist"] = { // 代码片段页面
    "static": { // 静态翻译
        // 快捷键
        "Site wide shortcuts": "全局快捷键",
        "Gists": "代码片段",
        "Go to Code": "跳转到代码",
        "Go to Revisions": "跳转到修订",

        "Instantly share code, notes, and snippets.": "即时分享您的代码，笔记，片段，以及灵感。",
        "Search…": "搜索代码片段…",
            "No results.": "没有结果。",
            "Yours": "您的",
        "All gists": "所有片段",
        "Back to GitHub": "返回到 GitHub",

        "Forked": "复刻",
        "Starred": "星标",

        // 左侧用户信息栏
        "Change your avatar": "修改头像",
        "followers": "关注者",
        "following": "关注",
        "Joined": "加入于",
        "View GitHub Profile": "查看 GitHub 个人资料",

        //"New gist": "新建片段",
        // 右上角个人图标下拉菜单
        "Your gists": "我的代码片段",
        "Starred gists": "我的标星代码片段",
        "Your GitHub profile": "我的 GitHub 个人资料",

        "View profile and more": "查看更多信息",
        "See all of your gists": "查看您的所有片段",

        // 返回通知页状态条
        "Back to notifications": "回到通知",
        "Done": "已完成",
        "Unsubscribe": "退订",
        "Mark as unread": "标记为未读",
        "Save": "保存",

        // 用户 浮动信息卡
        "Member of": "隶属组织",
        // [/, and (\d+) more/, "，以及其他 $1 个组织"],

        // 新建片段页面
        "View your gists": "查看您的片段",
        "Gist description…": "片段描述…",
        "Filename including extension…": "文件名 (包括扩展名)…",
        "Create secret gist": "创建私密片段",
        "Secret gists are hidden by search engines but visible to anyone you give the URL to.": "私密片段对搜索引擎不可见，对直接访问您分享的链接可见。",
        "Create public gist": "创建公开片段",
        "Public gists are visible to everyone.": "公开片段对所有人可见。",

        // 代码编辑框
        "Indent mode": "缩进模式",
        "Spaces": "空格",
        "Tabs": "Tab",
        "Indent size": "缩进大小",
        "Line wrap mode": "换行模式",
        "No wrap": "不换行",
        "Soft wrap": "软换行",
        "Add file": "添加文件",
        "Remove file": "移除文件",

        // All gists 标签卡
        // 筛选 & 排序工具栏
        "Sort:": "排序:",
        "Sort options": "排序选项",
        "Recently created": "最近创建",
        "Least recently created": "最早创建",
        "Recently updated": "最近更新",
        "Least recently updated": "最早更新",

        "Type:": "类型:",
        "Filter options": "筛选选项",
        "All": "所有",
        "Public": "公共",
        "Secret": "私密",

        "Created": "创建于",
        "Last active": "最后活动于",
        "Forked from": "复刻自",
        "— forked from": "— 复刻自",
        "View": "查看",

        "Newer": "新的",
        "Older": "旧的",

        // View 代码 页面
        // 头部通用信息
        "Only those with the link can see this gist.": "只有知道链接的人才能看到此 Gist。",
        "Edit": "编辑",
        "Delete": "删除",
            "Are you positive you want to delete this Gist?": "您确定要删除此 Gist 吗？",
            // 顶部提醒
                "Gist deleted successfully.": "代码片段已成功删除。",
        "Subscribe": "订阅",
        // "Unsubscribe": "退订",
        "Star": "星标",
            "Star this gist": "星标该代码片段",
        "Unstar": "取消星标",
            "Unstar this gist": "取消该代码片段星标",
        "User actions": "用户操作",
        "Report abuse": "举报滥用",

        "Code": "代码",
        "Revisions": "修订",
        "Stars": "星标",
        "Forks": "复刻",

        "Drop one or more files here to prefill your gist!": "在此处拖放一个或多个文件以填充您的 Gist！",

        // 分享工具条
        "What would you like to do?": "您想做什么？",
        "Embed": "嵌入",
        "Embed this gist in your website.": "嵌入到您的网页中。",
        "Share": "分享",
        "Copy sharable link for this gist.": "复制片段共享链接。",
        "Clone via HTTPS": "通过 HTTPS 方式克隆",
        "Clone with Git or checkout with SVN using the repository’s web address.": "通过仓库 web 地址进行 Git 克隆或 SVN 检出。",
        "Clone via SSH": "通过 SSH 方式克隆",
        "Clone with an SSH key and passphrase from your GitHub settings.": "通过 GitHub 设置中的 SSH 密钥和密码进行克隆。",
        "Learn more about clone URLs": "了解更多关于克隆地址的信息",

        "Copy to clipboard": "复制到剪切板",
        "Copied!": "✅ 复制成功!",
        "Download ZIP": "下载 Zip 压缩包",
        "Permalink": "永久链接",

        // 代码标签卡
        "Raw": "源码",
        "Load earlier comments...": "载入早期的评论...",

        // 修订标签卡
        "Unified": "同屏",
        "Split": "分屏",
        "created": "创建",
        "revised": "修订",
        "renamed": "重命名",
        "this gist": "该片段于",
        "with": "包含",
        "and": "和",
        "No changes.": "无变化",

        "Show comments": "显示评论",
        "View file": "查看文件",

        "Display the source diff": "显示源差异",
        "Display the rich diff": "显示富差异",
        "Empty file.": "空文件。",
        "File renamed without changes.": "文件仅重命名，内容没有更改。",
        // [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "$1 处添加，$2 处删除未显示，因为差异太大。请使用本地 Git 客户端查看这些更改。"],

        // 星标标签卡
        "Stargazers": "追星者",
        "Be the first to star this gist.": "成为第一个该代码片段标星人。",
        "Learn more about starring Gists": "了解更多关于标星代码片段的信息",

        // 复刻标签卡
        "Modified": "修改",
        "View fork": "浏览复刻",

        // 编辑代码页面
        "Editing": "编辑",
        "Edit file": "编辑文件",
        "Edit new file": "编辑新文件",
        "Preview changes": "预览更改",
        "Loading preview…": "载入预览…",
        "Make secret": "转为私密",
        "Make public": "转为公开",
        "Cancel": "取消",
        "Update public gist": "更新公开片段",
        "Update secret gist": "更新私密片段",

        // 已加星标页面
        "You don’t have any starred gists yet.": "您还没有标星任何片段。",

        // 评论框
        "Owner": "所有者",
        "Author": "作者",
        "Copy link": "复制链接",
        "Quote reply": "引用回复",
        "Report content": "举报内容",
        "Report": "举报",
        // 评论删除提醒
            "Are you sure you want to delete this?": "您定要删除这个吗？",

        "You are the owner of the gist.": "您是代码片段的所有者。",
        "You are the author of this gist.": "您是代码片段的作者。",
        "You are the author of this .": "您是代码片段的作者。",

        "commented": "评论于",
        "via email": "通过邮件",
        "Update comment": "更新评论",
        "Hide": "隐藏",

        "edited": "编辑",
        "(most recent)": "(最近的)",
        "(deleted)": "(已删除)",
        "deleted this content": "删除了该内容",
        "Options": "选项",
        "More options": "更多选项",
        "The most recent revision cannot be deleted. Need to delete sensitive information? Go to the specific edit where the information was added.": "最近的修订版不能被删除。需要删除敏感信息？请到信息的具体编辑处修改。",
        "Delete revision from history": "从历史记录中删除修订",
        "This edit’s content will no longer be visible": "此修改的内容将不再可见",

        // 探索页面
        "Discover gists": "探索代码片段",

    },
    "regexp": [ // 正则翻译
        [/View ([^ ]+) on GitHub/, "查看 $1 的 GitHub"],
        [/(\d+) files?/, "$1 文件"],
        [/(\d+) forks?/, "$1 复刻"],
        [/(\d+) comments?/, "$1 评论"],
        [/(\d+) stars?/, "$1 星标"],
        [/Save (.+?) to your computer and use it in GitHub Desktop./, "使用 GitHub Desktop，保存 $1 到您的电脑。"],
        //代码修订
        [/(\d+) changed files?/, "$1 个更改的文件"],
        [/(\d+) additions?$/, "$1 处增加"],
        [/(\d+) deletions?$/, "$1 处删除"],
        [/(\d+) changes?: (\d+) additions? & (\d+) deletions?/, " $1 处更改：$2 处增加 & $3 处删除"],
        [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "$1 处增加，$2 处删除未显示，因为差异太大。请使用本地 Git 客户端查看这些更改。"],
        [/Edited (\d+) times?/,"编辑 $1 次"], //评论框编辑次数
        [/edited by ([^ ]+)/,"被 $1 编辑"], //评论框 被他人编辑
        // [/Joined/,"加入于"], //星标标签卡
        [/, and (\d+) more/, "，以及其他 $1 个组织"], // 用户 浮动信息卡
        [/doesn’t have any public gists yet./, "尚无任何公开的代码片段。"],
    ],
};

I18N.zh["login/oauth"] = { // 应用授权
    "static": { // 静态翻译
        // 第三页 安装中

        // 第四页 安装后 授权
        // /login/oauth/authorize?client_id=Iv1.1a4d20f84a40d790&state=login
            "Resources on your account": "您帐户中的资源",
            "Act on your behalf": "代表您行事",
            "Email addresses": "电子邮箱地址",
            "(read)": "(只读)",
            "View your email addresses": "查看您的电子邮箱地址",
            "Authorizing will redirect to": "授权将重定向到",
            "Not": "不由",
            "owned or operated by GitHub": "GitHub 拥有或运营",
            "Created": "创建于",
            "GitHub users": "GitHub 用户",

        // /login/oauth/authorize?client_id=78a2ba87f071c28e65bb&redirect_uri=https%3A%2F%2Fcircleci.com%2Fauth%2Fgithub%3Freturn-to%3D%252Fdashboard%253Futm_medium%253Dpartner%2526utm_campaign%253Dghmarketplace%2526utm_source%253Dgithub&scope=repo%2Cuser%3Aemail&state=uZ9BTIkhQ3_98icRI09o1L1HJmfvIO8gK3FDGwytNAzbBRzXwTge440cKS7NaGtvS0tqCR_HzGMH2z3p
            "wants to access your": "想访问您的",
            "account": "帐户",
            "Public and": "公共库和",
            "private": "私有库",
            "This application will be able to": "该应用将能够",
            "read and write all public and private repository data": "读写所有公共和私有仓库数据",
            ". This includes the following:": "。这包括以下内容：",
            "Wikis": "Wiki",
            "Webhooks and services": "Web 钩子和服务",
            "Deploy keys": "部署密钥",
            "Collaboration invites": "合作的邀请",

            "Personal user data": "个人用户资料",
            "Email addresses (read-only)": "电子邮箱地址(只读)",
            "This application will be able to read your private email addresses.": "此应用将能够读取您的私人电子邮箱地址。",

        // 第五页 即将跳转到 重定向页面
            "You are being redirected to the authorized application.": "您将被重定向到授权的应用。",
            "If your browser does not redirect you back, please": "如果您的浏览器没有将您重定向回来，请",
            "click here": "点击这里",
            "to continue.": "继续。",
            "would like permission to:": "希望获得以下许可：",
            "Know which resources you can access": "了解您可以访问哪些资源",

        // // /apps/codacy-production/installations/new/permissions?target_id=7850715
        //     "All repositories": "所有仓库",
        //     "This applies to all current": "这适用于所有当前",
        //     "and": "和",
        //     "future repositories.": "未来的仓库。",
        //     "Only select repositories": "仅选定的仓库",
        //     "Select repositories": "选择仓库",
        //     "Search for a repository": "搜索仓库",
        //     "with these permissions:": "授权以下权限：",
        //     "User permissions": "用户权限",
        //     "Install & Authorize": "安装 & 授权",
        //     "Next: you'll be redirected to": "下一步：您将被重定向到",

        // // >>>>>具体的权限不打算汉化<<<<<<<
        // // >>>>>具体的权限不打算汉化<<<<<<<
    },
    "regexp": [ // 正则翻译
        // /login/oauth/authorize?client_id=Iv1.1a4d20f84a40d790&state=login
        [/Verify your GitHub identity/, "验证您的 GitHub 身份"],
        [/has not been installed on any accounts you have access to./, "尚未安装在您有权访问的任何帐户上。"],
        [/Learn more about/, "了解更多关于"],
        [/More than ([^ ]+)/, "超过 $1"],
        // /apps/codacy-production/installations/new/permissions?target_id=7850715
        [/Install & Authorize on your personal account/, "安装和授权到您的个人帐户"],
        [/Install & Authorize/, "安装和授权"],
        [/Authorize ([^ ]+)/, "授权 $1"], // /login/oauth/authorize?client_id=Iv1.1a4d20f84a40d790&state=login 调整位置避免覆盖
        [/Installing and authorizing ([^ ]+) immediately grants these permissions on your account:/, "安装和授权 $1则会立即授予您帐户的以下权限："],
        [/Selected (\d+) repositor(y|ies)./, "选择了 $1 个仓库。"],
    ],
};
I18N.zh["installations/new"] = I18N.zh["login/oauth"];

I18N.zh["explore"] = { // 探索页面
    "static": { // 静态翻译

        // github.com/explore
            "Explore": "探索",
            "Topics": "主题",
            "Trending": "热门",
            "Collections": "集合",
            "Events": "活动",
            "GitHub Sponsors": "GitHub 赞助",
            "Get email updates": "获取电子邮件更新",
            "Change email updates": "更改电子邮件更新", // 已设置邮件更新通知

            // 右侧信息栏
            "Trending repositories": "热门仓库",
            "See more trending repositories": "查看更多热门仓库",
            "Trending developers": "热门开发者",
            "See more trending developers": "查看更多热门开发者",

            // 中间信息栏
            "Here's what we found based on your interests...": "以下是我们根据您的兴趣发现的内容...",
                "This recommendation was generated by GitHub computers":"此推荐由 GitHub 计算机生成",
                "Based on repositories you’ve starred": "基于您星标的仓库",
                "Based on topics you've starred": "基于您星标的主题",
                "Based on people you follow": "基于您关注的人",
                "Based on repositories you’ve viewed": "基于您查看过的仓库",
                "Based on your public repository contributions": "基于您对公共仓库的贡献",
                "App recommended by GitHub": "GitHub 推荐的应用",

            "Star topics that interest you": "为您感兴趣的主题加注星标",
            "and we'll show you the latest from the octoverse.": "我们将向您展示来自八维空间的最新信息。",
            "Explore more topics": "探索更多主题",

            "Collection recommended by GitHub": "GitHub 推荐的合集",

            "That's everything we found for you, for now.": "这就是我们目前为您找到的一切。",
                "Come back soon to see what we find next,": "请尽快回来查看我们接下来会发现什么，",
                "get email updates.": "获取电子邮件更新。",
                "check how often you receive email updates.": "检查您收到电子邮件更新的频率。", // 已设置邮件更新通知

            "Updated": "更新于",
            "See more matching repositories": "查看更多匹配的仓库",

        // github.com/explore/email
            "Explore email newsletter": "探索电子邮件通讯",
                "Get email updates about what GitHub finds for you based on your interests": "根据您的兴趣，通过电子邮件获取 GitHub 为您找到的最新信息",

            "None": "无",
                "Email isn’t for everyone. Or maybe you’ve just made github.com/explore your homepage. We won’t send you any emails.": "电子邮件并不适合所有人。或者，您刚刚把 github.com/explore 作为您的主页。我们不会给您发送任何电子邮件。",
            "Daily": "每天",
                "Start your day with a delicious cup of coffee (or perhaps an artisan matcha latte) and interesting repositories every day.": "每天以一杯美味的咖啡（或可能是手工抹茶拿铁）和有趣的仓库开始您的一天。",
            "Weekly": "每周",
                "The perfect way to keep on top of everything GitHub. Every Tuesday, we’ll send you an email with everything we found for you in the past week based on your interests.": "掌握 GitHub 一切信息的完美方式。每周二，我们会根据您的兴趣向您发送一封电子邮件，内容是我们在过去一周为您找到的所有内容。",
            "Monthly": "每月",
                "The best option for lurkers who want to keep up with major happenings in the open source world.": "对于想了解开源世界重大事件的潜伏者来说，这是最佳选择。",
            "Unsubscribed!": "已取消订阅！",
            "Subscribed!": "已订阅！",

    },
    "regexp": [ // 正则翻译
        [/([\d,]+) starred topics?/, "$1 个星标主题"],
        [/([\d,]+) starred repositories?/, "$1 个星标仓库"],
        [/There are ([\d,]+) public repositories? matching this topic/, "有 $1 个公共仓库与此主题相匹配"],
        [/See the ([\d,]+) items? in this collection/, "查看该系列中的 $1 个项目"],
    ],
};

I18N.zh["topics"] = { // 探索-->主题页面
    "static": { // 静态翻译

        // github.com/topics
            "Explore": "探索",
            "Topics": "主题",
            "Trending": "热门",
            "Collections": "集合",
            "Events": "活动",
            "GitHub Sponsors": "GitHub 赞助",
            "Get email updates": "获取电子邮件更新",
            "Change email updates": "更改电子邮件更新", // 已设置邮件更新通知

            "Browse popular topics on GitHub.": "浏览 GitHub 上的热门主题。",
            "All featured topics": "所有主题",
            "Popular topics": "热门主题",
            "Unstar": "已加星标",
            "Load more…": "载入更多…",
            "Loading more…": "载入中…",

        // github.com/topics/<某主题>
            "Created by": "创建者",
            "Released": "发布于",

            "Related Topics": "相关主题",
            "Updated": "更新于",
            "Sponsor": "赞助",

            "Language:": "语言:",
                "Filter by language": "按语言筛选",
                "All": "所有",
            "Sort:": "排序:",
                "Sort options": "排序选项",
                "Most stars": "最多标星",
                "Fewest stars": "最少星标",
                "Most forks": "最多复刻",
                "Fewest forks": "最少复刻",
                "Recently updated": "最近更新",
                "Least recently updated": "最早更新",

            "Lists": "清单",
            "Create list": "创建清单",
                "Create a list to organize your starred repositories.": "创建一个清单来组织您的星标仓库。",
                "⭐️ Name this list": "⭐️ 清单名称",
                "Write a description": "简单描述",
                "Lists are currently in beta.": "清单目前处于测试阶段。",
                "Share feedback and report bugs.": "分享反馈意见和报告错误。",
                "Creating...": "创建中...",

    },
    "regexp": [ // 正则翻译
        [/followers?/, "个关注者"],
        [/Here are ([\d,]+) public repositories? matching this topic.../, "有 $1 个公共仓库与此主题相匹配"],
    ],
};

I18N.zh["trending"] = { // 热门页面
    "static": { // 静态翻译
        "Explore": "探索",
        "Topics": "主题",
        "Trending": "热门",
        "Collections": "集合",
        "Events": "活动",
        "GitHub Sponsors": "GitHub 赞助",
        "Get email updates": "获取电子邮件更新",
        "Change email updates": "更改电子邮件更新", // 已设置邮件更新通知

        "See what the GitHub community is most excited about today.": "看看 GitHub 社区今天最受关注的项目。",
        "See what the GitHub community is most excited about this week.": "看看 GitHub 社区本周最受关注的项目。",
        "See what the GitHub community is most excited about this month.": "看看 GitHub 社区本月最受关注的项目。",

        "These are the developers building the hot tools today.": "这些是今天创建热门项目的开发人员。",
        "These are the developers building the hot tools this week.": "这些是本周创建热门项目的开发人员。",
        "These are the developers building the hot tools this month.": "这些是本月创建热门项目的开发人员。",

        "Repositories": "仓库",
        "Developers": "开发者",

        "Sponsor": "赞助",
        "Built by": "构建者",

        "Spoken Language:": "母语：",
            "Select a spoken language": "选择母语：",
            "This setting can be saved in your": "此设置可以保存在您的",
            "profile settings.": "个人资料设置",
            "Filter spoken languages": "筛选母语",
            "Any": "任何",
        "Language:": "语言:",
            "Select a language": "选择语言：",
            "Filter languages": "筛选语言",
            "Unknown languages": "未知语言",
        "Date range:": "日期范围：",
            "Adjust time span": "调整的时间跨度",
                "Today": "今天",
                "This week": "本周",
                "This month": "本月",
        "Sponsorable:": "可赞助：",
            "GitHub Sponsors participation": "参与 GitHub 赞助",
            "Sponsorable developers": "可赞助的开发者",
            "All developers": "所有开发者",
            "All": "所有",

    },
    "regexp": [ // 正则翻译
        [/([\d,]+) stars today?/, "今日 $1 星标"],
        [/([\d,]+) stars this week?/, "本周 $1 星标"],
        [/([\d,]+) stars this month?/, "本月 $1 星标"],
    ],
};

I18N.zh["collections"] = { // 集合页面
    "static": { // 静态翻译
        "Explore": "探索",
        "Topics": "主题",
        "Trending": "热门",
        "Collections": "集合",
        "Events": "活动",
        "GitHub Sponsors": "GitHub 赞助",
        "Get email updates": "获取电子邮件更新",
        "Change email updates": "更改电子邮件更新", // 已设置邮件更新通知
        "Curated lists and insight into burgeoning industries, topics, and communities.": "精心策划的列表和对新兴行业、主题和社区的见解。",
        "Create a collection": "创建一个集合",
        "Load more…": "载入更多...",
        "Loading more…": "载入中...",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["events"] = { // 活动页面
    "static": { // 静态翻译
        "Explore": "探索",
        "Topics": "主题",
        "Trending": "热门",
        "Collections": "集合",
        "Events": "活动",
        "GitHub Sponsors": "GitHub 赞助",
        "Get email updates": "获取电子邮件更新",
        "Change email updates": "更改电子邮件更新", // 已设置邮件更新通知
        "Connect with the GitHub community at conferences, meetups, and hackathons around the world.": "在世界各地的会议、聚会和编程马拉松上与 GitHub 社区建立联系。",
        "GitHub Events": "GitHub 活动",
        "Sponsored by GitHub": "由 GitHub 赞助",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["sponsors/explore"] = { // 赞助页面
    "static": { // 静态翻译
        "Explore": "探索",
        "Topics": "主题",
        "Trending": "热门",
        "Collections": "集合",
        "Events": "活动",
        "GitHub Sponsors": "GitHub 赞助",
        "Get email updates": "获取电子邮件更新",
        "Change email updates": "更改电子邮件更新", // 已设置邮件更新通知
        "Explore GitHub Sponsors": "探索 GitHub 赞助",
        "Fund the work of developers and projects you depend on.": "为您所依赖的开发人员和项目提供资金。",
        "Ecosystem": "生态系统",
            "All ecosystems": "所有生态系统",
        "Filters": "过滤器",
            "Direct dependencies only": "仅直接依赖项",
        "None of your dependencies can be sponsored": "您的任何依赖项都尚未开放赞助",
        "You don't directly depend on any repositories whose maintainers can be sponsored.": "您不直接依赖于任何可以赞助其维护人员的存储库。",
        "Explore people and projects": "探索人员和项目",
        "Bulk Sponsor": "批量赞助",
            "Sponsor multiple maintainers in one easy transaction.": "在一笔简单的交易中赞助多个维护人员。",
            "Get started": "开始",
        "Don't see what you're looking for? Try": "没有看到您在找的东西？尝试",
        "searching for people you can sponsor": "搜索可以赞助的人员",
        "and filtering by language!": "并通过语言筛选！",
        "Clear filter": "清除筛选器",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["showcases"] = { // 展示页面
    "static": { // 静态翻译
        "Open source showcases": "开源展示",
        "Browse popular repositories based on the topic that interests you most.": "浏览热门仓库基于您最感兴趣的主题。",
        "Search showcases": "搜索展示",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["account/organizations/new"] = { // 创建组织
    "static": { // 静态翻译
        // 创建免费的组织 https://github.com/account/organizations/new?coupon=&plan=team_free
        // 第 1 页
        "Tell us about your organization": "告诉我们您的组织",
        "Set up your organization": "设置您的组织",
        "Organization account name": "组织帐户名称",
        // [/The name \'(\d+)\' is already taken./, "名称 '$1' 已被采用。"],
        // [/The name \'(\d+)\' may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen./, "名称 '$1' 只能包含字母数字字符或单个连字符，并且不能以连字符开头或结尾。"],
        // [/Organization name \'([^ ]+)\' is unavailable./, "组织名称 '$1' 不可用。"], //
        "This will be the name of your account on GitHub.": "这将是您在 GitHub 上的帐户名称。",
        "Your URL will be: https://github.com/": "您的网址将是：https://github.com/",
        "Contact email": "联系电子邮箱",
            "Email is invalid": "电子邮箱无效",
        "This organization belongs to:": "该组织属于：",
        "My personal account": "我的个人帐户",
            // [/I.e.,/, "即："],
        "A business or institution": "企业或机构",
            "For example: GitHub, Inc., Example Institute, American Red Cross": "比如说：GitHub, Inc., Example Institute, American Red Cross",
            "Name of business or institution this organization belongs to": "该组织所属的企业或机构的名称",
            "This business or institution — not": "该企业或机构 — 不是",
            "(your personal account) — will control this organization account.": "（您的个人帐户）— 将控制此组织帐户。",
        "I hereby accept the": "我特此接受",
        "Terms of Service": "服务条款",
        ". For more information about GitHub's privacy practices, see the": "。关于 GitHub 隐私条款的更多信息，请参见",
        "GitHub Privacy Statement": "GitHub 隐私声明",
        "GitHub Customer Agreement": "GitHub 客户协议",
        "on behalf of my organization and confirm that I have the authority to do so": "代表我的组织，并确认我有权力这样做",

        ". We'll occasionally send you account-related emails.": "。我们偶尔会向您发送与帐户相关的电子邮件。",

        // https://github.com/organizations/<org-name>/invite
        // 第 2 页 邀请成员
        "Start collaborating": "开始合作",
        // [/Welcome to/, "欢迎来到"],
        "Add organization members": "添加组织成员",
        "Organization members will be able to view repositories, organize into teams, review code, and tag other members using @mentions.": "组织成员将能够使用 @提及来查看仓库、组织成团队、审查代码以及标记其他成员。",
        "Learn more about permissions for organizations →": "了解更多关于组织权限的信息 →",
        "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
        "Complete setup": "完成设置",
        "Skip this step": "跳过",

        // https://github.com/orgs/<org-name>/invitations/bulk_create_for_new_org
        // https://github.com/orgs/<org-name>/welcome_survey/new
    },
    "regexp": [ // 正则翻译
        [/The name \'([^ ]+)\' is already taken./, "名称 '$1' 已被采用。"],
        [/The name \'([^ ]+)\' may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen./, "名称 '$1' 只能包含字母数字字符或单个连字符，并且不能以连字符开头或结尾。"],
        [/Organization name \'([^ ]+)\' is unavailable./, "组织名称 '$1' 不可用。"],
        [/I.e.,/, "即："],
    ],
};

I18N.zh["marketplace"] = { // GitHub 市场
    "static": { // 静态翻译
        // GitHub 市场主页 https://github.com/marketplace
            "Extend GitHub": "拓展 GitHub",
                "Add tools to help you build and grow": "添加工具来帮助您构建和成长",
                "Find tools to improve your workflow": "寻找改进工作流程的工具", // 未登录
            "Explore apps": "探索应用",
            "Explore free apps": "探索免费应用", // 未登录
            "Contact Sales": "联系销售",

            "Types": "类型",
                "Build on your workflow with apps that integrate with GitHub.": "使用与 GitHub 集成的应用构建您的工作流程。",
                "An entirely new way to automate your development workflow.": "自动化开发工作流程的全新方式。",

            "Search for apps and actions": "搜索应用和操作",
                "Narrow your search": "缩小搜索范围",

            "Sort:": "排序：",
                "Sort options": "排序选项",
                "Best Match": "最佳匹配",
                "Recently added": "最近添加",
                "Most installed/starred": "安装次数最多/标星最多",

            // 类别
                "API management": "API 管理",
                    "Structure your API infrastructure to enable various internet gateways to interact with your service.": "构建应用接口基础设施，使各种互联网网关能够与您的服务互动。",
                "Chat": "聊天",
                    "Bring GitHub into your conversations.": "将 GitHub 纳入您的对话中。",
                "Code quality": "代码质量",
                    "Automate your code review with style, quality, security, and test‑coverage checks when you need them.": "在需要时，通过样式、质量、安全性和测试覆盖检查自动进行代码审查。",
                "Code review": "代码审查",
                    "Ensure your code meets quality standards and ship with confidence.": "确保您的代码符合质量标准，并能放心交付。",
                "Continuous integration": "持续集成",
                    "Automatically build and test your code as you push it to GitHub, preventing bugs from being deployed to production.": "当您将代码推送到 GitHub 时，自动构建和测试您的代码，从而防止将错误部署到生产中。",
                    "Container CI": "容器持续集成",
                        "Continuous integration for container applications.": "容器应用的持续集成。",
                    "Game CI": "游戏 CI",
                        "Tools for building a CI pipeline for game development": "用于构建游戏开发 CI 管道的工具",
                    "Mobile CI": "移动 CI",
                        "Continuous integration for Mobile applications": "移动应用的持续集成",
                "Dependency management": "依赖管理",
                    "Secure and manage your third-party dependencies.": "保护和管理第三方依赖关系。",
                "Deployment": "部署",
                    "Streamline your code deployment so you can focus on your product.": "简化代码部署，让您专注于产品。",
                "IDEs": "集成开发环境",
                    "Find the right interface to build, debug, and deploy your source code.": "找到合适的界面来构建、调试和部署源代码。",
                "Learning": "学习",
                    "Get the skills you need to level up.": "获得升级所需的技能。",
                "Localization": "本地化",
                    "Extend your software's reach. Localize and translate continuously from GitHub.": "扩展您的软件的覆盖范围。从 GitHub 持续本地化和翻译。",
                "Mobile": "移动",
                    "Improve your workflow for the small screen.": "针对小屏幕改进工作流程。",
                "Monitoring": "监视",
                    "Monitor the impact of your code changes. Measure performance, track errors, and analyze your application.": "监控代码更改的影响。衡量性能、跟踪错误并分析您的应用。",
                "Project management": "项目管理",
                    "Organize, manage, and track your project with tools that build on top of issues and pull requests.": "使用基于置顶议题和拉取请求的工具来组织、管理和跟踪您的项目。",
                "Publishing": "发布",
                    "Get your site ready for production so you can get the word out.": "让您的网站做好生产准备，以便您可以宣传。",
                "Recently added": "最新添加",
                    "The latest tools that help you and your team build software better, together.": "最新的工具可帮助您和您的团队更好地共同构建软件。",
                "Testing": "测试",
                    "Find, fix, and prevent security vulnerabilities before they can be exploited.": "发现、修复和预防安全漏洞，防患于未然。",
                // 支持
                    "Get your team and customers the help they need.": "为您的团队和客户提供所需的帮助。",
                // 测试
                    "Eliminate bugs and ship with more confidence by adding these tools to your workflow.": "通过将这些工具添加到您的工作流程中，消除错误并更有信心地交付。",
                "Utilities": "实用工具",
                    "Auxiliary tools to enhance your experience on GitHub": "辅助工具，提升您的 GitHub 使用体验",
                    "Backup Utilities": "备份工具",
                        "Utilities providing periodic backups of your GitHub data": "定期备份 GitHub 数据的实用工具",

            "Filters": "筛选器",
                // 免费
                    "Tools that provide a free tier.": "提供免费套餐的工具。",
                "Free Trials": "免费试用",
                    "Tools that support free, time-limited, access to their service.": "支持免费、限时访问其服务的工具。",
                "GitHub Enterprise": "GitHub 企业版",
                    "Tools that have GitHub Enterprise supported offerings.": "支持 GitHub 企业版的工具。",
                "Paid": "付费",
                    "Tools that require a paid subscription.": "需要付费订阅的工具。",

            "Verification": "验证",
                "Verified Creator": "经验证的创建者",

            "Your items": "您的项目",
                "Pending orders": "待处理订单",
                "Pending installations": "待安装",
                "Purchases": "购买",

            "Recommended": "推崇",
            "View all": "查看全部",

            "List your tool on GitHub Marketplace": "在 GitHub 市场上列出您的工具",
            "Read the documentation": "阅读文档",
                "Learn how you can build tools to extend and improve developers' workflows.": "了解如何构建工具来扩展和改进开发人员的工作流程",

            "Submit your tool for review": "提交您的工具以供审核",
                "Share your app or GitHub Action with millions of developers.": "与数百万开发者分享您的应用或 GitHub Action",

        // https://github.com/marketplace?type=
            "Search results": "搜索结果",
            "filtered by": "已筛选",
            "Publisher domain and email verified": "已验证发布者域名和电子邮件",
            "Creator verified by GitHub": "创建者经 GitHub 验证",

        // 应用介绍页面 /marketplace/codacy 第一页
            "Apps": "应用",
            // 左侧信息栏
            "GitHub has verified that the application meets the": "GitHub 已验证了该应用符合",
            "requirements for listing": "上架要求",
            "GitHub has verified that the publisher controls the domain and meets other": "GitHub 已经验证了发布者对该域名的控制权和满足其他",
            "requirements": "要求",
            "Categories": "类别",
            "Supported languages": "支持的语言",
            "and": "和",
            "Customers": "客户",
            "Verified domains": "经验证的域名",
            "Developer links": "开发者链接",
            "Support": "支持",
            "Documentation": "文档",
            // 右侧正文
            "Application": "应用",
            "Set up a plan": "制定一个计划",
            "Read more…": "了解更多…",
            // 下半部分
            "Pricing and setup": "定价与设置",
            "Free for open source projects": "免费的开源项目",
            "Unlimited private repositories": "无限制私有项目",
            "per user": "每人",
            "User(s) in this plan": "个用户在计划中",
            "Install it for free": "免费安装",
            "Buy with GitHub": "通过 GitHub 购买",
            "Next: Confirm your installation location and payment information.": "下一步：确认您的安装位置和支付信息。",
            "terms of service": "服务条款",
            "privacy policy": "隐私政策",
            ", and": "，和",
            "support documentation": "支持文档",
            "support contact": "支持联络",

        // /marketplace/travis-ci/order/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW43MA==?account=maboloshi
            "Edit your plan": "编辑您的计划",
            "Open Source": "开源",
            "(current plan)": "(当前计划)",
            "plans": "计划",
            // "(current plan)": "(当前计划)",
            "Account:": "帐户：",
            "/ month": "/ 月",
            "To complete this installation, you must": "要完成此安装，您必须",
            "grant this app access": "授予此应用的权限",
            "to your GitHub account.": "访问您的 GitHub 帐户。",
            "Cancel this plan": "取消计划",
            "Order summary": "订单摘要",
            "Current plan": "当前计划",
            "Billing information": "账单信息",
            "Personal account": "个人帐户",
            "Terms of Service": "服务条款",
            "and the": "和",
            "Privacy Policy": "隐私政策",
            ". You previously agreed to the": "。您已同意过",
            "Marketplace Terms of Service.": "商城服务条款。",
            "Issue plan changes": "议题计划更改",

        // 应用的审查订单 第二页  /marketplace/gitlocalize/order/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW4zOTg=?account=maboloshi
            "Review your order": "审查您的订单",
            "Free": "免费",
            "For individuals, teams, and communities, public and private projects": "对于个人、团队和社区，公共和私人项目",
            "Total amount": "总金额",
            "Due today": "截止到今天",
            "Complete order and begin installation": "完成订购并开始安装",
            // "Prorated for": "",

        // /apps/codacy-production
            "GitHub App": "GitHub 应用",
            "Read more about this app on the Marketplace": "了解更多关于商城中此应用的信息",

            "Install": "安装",
            "Next: Confirm your installation location.": "下一步：确认您的安装位置。",
            "Configure": "设置",
            "Manage your installation settings.": "管理安装设置。",

            "Developer": "开发者",
            "Website": "网站",
            "is provided by a third-party and is governed by separate terms of service, privacy policy, and support documentation.": "是由第三方提供的，并受单独的服务条款、隐私政策和支持文档的约束。",
            "Report abuse": "举报滥用",

        // /marketplace/actions/merge-upstream
            "Latest version": "最新发行版",
            "Use latest version": "使用最新发行版",
            "Choose a version": "选择发行版",

            "Contributors": "贡献者",
            "Links": "链接",
            "Open issues": "打开议题",
            "is not certified by GitHub. It is provided by a third-party and is governed by separate terms of service, privacy policy, and support documentation.": "未经 GitHub 认证。它由第三方提供，并受单独的服务条款、隐私政策和支持文档的约束。",

        // /apps/codacy-production/installations/new/permissions?target_id=7850715
            "All repositories": "所有仓库",
            "This applies to all current": "这适用于所有当前",
            "and": "和",
            "future repositories.": "未来的仓库。",
            "Only select repositories": "仅选定的仓库",
            "Select repositories": "选择仓库",
            "Search for a repository": "搜索仓库",
            "with these permissions:": "授权以下权限：",
            "User permissions": "用户权限",
            "Install & Authorize": "安装 & 授权",
            "Next: you'll be redirected to": "下一步：您将被重定向到",

        // >>>>>具体的权限不打算汉化<<<<<<<
        // >>>>>具体的权限不打算汉化<<<<<<<
    },
    "regexp": [ // 正则翻译
        // /marketplace/codacy
        [/(\d+) other languages? supported/, "$1 种其他语言支持"],
        [/([^ ]+) is provided by a third-party and is governed by separate/, "$1 是由第三方提供的，并受单独的"],
        // /marketplace/travis-ci/order/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW43MA==?account=maboloshi
        [/By clicking "Issue plan changes", you are agreeing to ([^ ]+)’s/, "点击 “议题计划更改”，您同意 $1 的"],
        [/By clicking "Complete order and begin installation", you are agreeing to ([^ ]+)’s/, "点击 “完成订购并开始安装”，表示您同意 $1 的"],
        [/Next: Authorize ([^ ]+) to access your account./, "下一步：授权 $1 访问您的帐户。"],
        [/(\d+) results?/, "$1 个结果"],
        [/([0-9.k]+) stars?/, "$1 星标"],
        [/([0-9.k]+) installs?/, "$1 次安装"],
    ],
};
I18N.zh["apps"] = I18N.zh["marketplace"];

I18N.zh["orgs"] = { // 组织页面
    "static": { // 静态翻译
        //>>>>>>>>>>>>>>>>>> 组织主页/概况页 <<<<<<<<<<<<<<<<<<<<<
            // [/doesn't have any pinned public repositories yet./, "还没有任何置顶的公共仓库。"],

            "followers": "关注者",
            "Sponsor": "赞助",

            "Send feedback": "发送反馈",

            "Pinned": "已置顶",
            "Popular repositories": "流行的仓库",

            // 仓库
                // 搜索, 筛选 & 排序工具栏
                "Find a repository…": "搜索仓库…",
                // "Type": "类型", // 与全局冲突 使用 Selector 规则翻译
                    // 下拉菜单
                    "Select type": "选择类型",
                    "All": "全部",
                    "Public": "公共",
                    "Private": "私有",
                    "Sources": "源码",
                    "Forks": "复刻",
                    "Archived": "存档",
                    "Can be sponsored": "可赞助",
                    "Mirrors": "镜像",
                    "Templates": "模板",
                "Language": "语言",
                    // 下拉菜单
                    "Select language": "选择语言",
                    "All languages": "所有语言",
                "Sort": "排序",
                    // 下拉菜单
                    "Select order": "选择排序",
                    "Last updated": "最近更新",
                    "Name": "仓库名",
                    // "Recently starred": "最近星标",
                    // "Recently active": "最近活跃",
                    // "Most stars": "最多星标",
                    // "Unstar": "取消星标",
                "New": "新建",

                // 筛选结果
                "result for": "个结果在",
                "results for": "个结果在",
                    "public": "公共",
                    "private": "私有",
                    "source": "源码",
                    "forked": "复刻",
                    "archived": "存档",
                    "sponsorable": "可赞助",
                    "mirror": "镜像",
                    "template": "模板",
                // "repositories matching": "仓库中匹配了",
                // "result for repositories matching": "个结果在仓库中匹配了",
                // "results for repositories matching": "个结果在仓库中匹配了",
                // "repositories sorted by": "仓库，排序按",
                // "written in": "，使用语言",
                // "results for repositories written in": "个结果在仓库中使用语言",
                // "star matching": "个星标匹配", //?tab=stars
                // "stars matching": "个星标匹配", //?tab=stars
                // "star written in": "个星标使用语言", //?tab=stars
                // "stars written in": "个星标使用语言", //?tab=stars
                "repositories sorted by": "仓库，排序按",
                "sorted by": "，排序按",
                    "last updated": "最近更新",
                    "name": "仓库名",
                    "stars": "星标",
                "all": "所有",
                "repositories written in": "仓库中使用语言",

                "Clear filter": "清除筛选",

                // [/([^ ]+) doesn’t have any repositories that match./, "$1 没有任何匹配的仓库"],
                "No repositories matched your search.": "没有与您的搜索相匹配的仓库。",

                // 项目 状态词
                "Updated": "更新于",
                "Forked from": "复刻自",


            // 右侧栏
                "View as:": "浏览：",
                    "Switch profile context": "切换视角",
                    "Member": "成员",

                // 公共视角
                    "You are viewing the README and pinned repositories as a public user.": "您正在以公共用户的身份查看自述文件和置顶仓库。",

                // 组织成员视角
                    // [/You are viewing the README and pinned repositories as a member of the ([^ ]+) organization./, "您正在以 $1 组织成员的身份查看自述文件和置顶仓库。"],

                "You can": "您可以",
                "pin repositories": "置顶仓库",
                "visible to anyone.": "让任何人都能看到。",
                "visible only to members of the organization.": "仅对组织成员可见。",

                "Get started with tasks": "开始任务",
                "that most successful organizations complete.": "大多数成功的组织都会完成。",
                "hide the tasks we've suggested": "隐藏我们建议的任务",
                "on this page and bring them back later.": "在此页面上，以后再把它们带回来。",

                "Top discussions this past month": "上个月的热门讨论",
                    "Nothing to see here yet!": "这里还没什么可看的!",
                    "Discussions are for sharing announcements, creating conversation in your community, answering questions, and more.": "讨论是为了分享公告，在您的社区创建对话，回答问题，以及更多。",
                    "Start a new discussion": "开始新的讨论",
                    "View all discussions": "查看全部讨论", // 组织讨论

                // "People": "成员",
                    "This organization has no public members. You must be a member to see who’s a part of this organization.": "该组织没有公共成员。您必须是成员才能查看谁是该组织的成员。",
                    "Invite someone": "邀请他人",
                        // 邀请对话框
                        // [/Invite a member to/, "邀请成员加入"],
                        "Search by username, full name or email address": "搜索用户名，全名或邮箱地址：",
                        "Invite": "邀请",
                        "Invite a billing manager": "邀请一位账单管理员",
                        "Authenticate your members with SAML single sign-on": "使用 SAML 单点登录对您的成员进行身份验证",
                        "Try risk-free for 30 days": "无风险试用 30 天",
                        "learn more about SAML": "了解更多关于 SAML 的信息",
                        ", or": "，或",
                        "dismiss this message": "忽略此消息",
                    "View all": "查看全部",

                "Top languages": "热门语言",
                    "Loading…": "载入中…",
                "Most used topics": "最常用的话题",
                "Developer Program Member": "开发者计划成员",
                "Report abuse": "举报滥用",

            "Create new repository": "新建仓库",
            "Import": "导入",

            "This organization has no repositories.": "该组织暂无仓库。",
            "View all repositories": "查看所有仓库",

            // 设置置顶
            "Edit pinned repositories": "设置置顶项目",
            "Select up to six public repositories you'd like to show to anyone.": "最多选择 6 个您想向任何人展示的公共仓库。",
            "Select up to six public, internal, or private repositories you'd like to show only to members of the organization.": "最多选择 6 个您想仅向组织成员展示的公共、内部或私有仓库。",
            "No repositories or gists found.": "没有发现仓库或 Gists。",
            // 顶部提醒
            "You’re not a member of any teams in this organization.": "您不是该组织中任何团队的成员。",

            // 新组织 入门任务
            "We think you’re gonna like it here.": "我们认为您会喜欢这里的。",
            "We’ve suggested some tasks here in your organization's overview to help you get started.": "我们在这里就您的组织概况提出了一些任务，以帮助您开始工作。",
            "Invite your people": "邀请同伴",
                "Invite your first member": "邀请首位成员",
                    "Find people by their GitHub username or email address.": "通过 GitHub 用户名或电子邮件地址找到他们。",
                "Customize members' permissions": "自定义成员权限",
                    "Set everyone’s base permissions for your code.": "为您的代码设置每个人的基本权限。",
            "Collaborative coding": "协助编码",
                "See more about collaborative coding": "查看更多关于协作式编码的信息",
                "Create a pull request": "创建拉取请求",
                    "Propose and collaborate on changes to a repository.": "就对仓库的更改提出建议并进行协作。",
                "Create a branch protection rule": "创建分支保护规则",
                    "Enforce certain workflows for one or more branches.": "为一个或多个分支强制执行某些工作流程。",
            "Automation and CI/CD": "自动化和 CI/CD",
                "See more about automation and CI/CD": "查看更多关于自动化和 CI/CD 的信息",
                "Auto-assign new issues": "自动分配新议题",
                    "Try automatically assigning work with GitHub Actions.": "尝试使用 GitHub Actions 自动分配工作。",
                "Run a continuous integration test": "运行持续集成测试",
                    "Validate your code using a CI workflow.": "使用 CI 工作流程验证您的代码。",
            "Discover new GitHub features": "发现 GitHub 的新功能",
                "See all features": "查看所有功能",
                "Client apps": "客户端应用",
                "Project management": "项目管理",
                "Team administration": "团队管理",
                "Community": "社区",

            // 组织关注 指引框
                "You can now follow organizations": "您现在可以关注组织",
                "Organization activity like new discussions, sponsorships, and repositories will appear in": "组织活动，如新的讨论、赞助和仓库将出现在",
                "your dashboard feed": "您的仪表板的信息上",
                "OK, got it!": "好的，知道了！",

            "This organization has no public repositories.": "该组织没有公共仓库。",

    },
    "regexp": [ // 正则翻译
        [/doesn't have any pinned public repositories yet./, "还没有任何置顶的公共仓库。"],
        [/You are viewing the README and pinned repositories as a member of the ([^ ]+) organization./, "您正在以 $1 组织成员的身份查看自述文件和置顶仓库。"],
        [/Invite a member to/, "邀请成员加入"],
    ],
    "selector": [ // 元素筛选器规则
        ["#type-options > summary > span:nth-child(1)", "类型"], // 组织主页 --> 仓库标签页-->类型筛选器 Type
    ],
};

I18N.zh["orgs/repositories"] = I18N.zh["page-profile/repositories"];

I18N.zh["orgs/projects"] = I18N.zh["page-profile/projects"];

I18N.zh["orgs/packages"] = I18N.zh["page-profile/packages"];

I18N.zh["orgs/people"] = { // 组织 - 成员标签卡
    "static": { // 静态翻译

        // 成员标签页 https://github.com/orgs/<orgs-name>/people
            // 左侧栏
            "Organization permissions": "组织权限",
            "Members": "成员",
            "Outside collaborators": "外部协作者",
            "Pending collaborators": "待定协作者",
            "Invitations": "邀请",
            "Failed invitations": "失败邀请",

            "Find a member…": "搜索成员…",

            "Export": "导出",
            "Invite member": "邀请成员",

            "You are the only owner of this organization! We recommend a minimum of two people within each organization have the owner role.": "您是该组织的唯一所有者！我们建议每个组织内至少有两人担任所有者角色。",
            "Dismiss": "忽略",

            "Filter by two-factor authentication": "按双重身份验证筛选",
            "Everyone": "所有人",
            "Enabled": "禁用",
            "Disabled": "启用",
            "Required": "必须",

            "Role": "角色",
            "Filter by role": "按角色筛选",
            "Owners": "所有者",

            "Organization visibility": "组织可见性",
            "Your membership is visible to everyone and is displayed on your public profile.": "您的成员资格对所有人都是可见的，并显示在您的个人资料上。",
            "Your membership is only visible to other members of this organization.": "您的成员资格只对本组织的其他成员可见。",

            "Owner": "所有者",
            "Owners have full access to teams, settings, and repositories.": "所有者拥有对团队、设置和仓库的完全访问权限。",
            // [/0 teams/, ""],

            "Manage": "管理",
            "Convert to outside collaborator…": "转为外部协作者…",
            "Remove from organization…": "从组织移除…",

            "This organization has no public members.": "该组织没有公开的成员。",

            // 邀请对话框
                // [/Invite a member to/, "邀请成员加入"],
                "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
                "Invite": "邀请",
                "Invite a billing manager": "邀请一位账单管理员",
                "Authenticate members with": "对成员进行身份验证，使用",
                "SAML single sign-on": "SAML 单点登录",
                "Try it in a 30-day trial of GitHub Enterprise.": "尝试试用 30 天 GitHub 企业版",
                "Start a free trial": "开始免费试用",

            // 转换为外部合作者 对话框
                // [/Convert ([^ ]+) to outside collaborator?/, "将 $1 转换为外部合作者？"],
                "Converting members to outside collaborators will remove them from this organization and from all teams, and if they do not currently have access to any private repositories in the organization their seat will be reclaimed.": "将成员转换为外部协作者会将把他们从本组织和所有团队中移除，如果他们目前无法访问组织中的任何私有仓库，他们的席位将被收回。",
                "Their repository access will be preserved by making them collaborators on all repositories that their teams gave them access to. They will retain access to repositories that they were previously collaborators on, but all other access to this organization’s repositories will be lost.": "通过使他们成为其团队授予他们访问权限的所有仓库的协作者，他们的仓库访问权限将得到保留。他们将保留对之前作为合作者的仓库的访问权限，但对该组织仓库的所有其他访问权限都将丢失。",
                "Convert to outside collaborator": "转换为外部合作者",

                //顶部提示
                    "You can't remove yourself from the organization. Have another admin do this for you.": "您无法将自己从组织中删除。请让其他管理员代劳。",
            // 移除成员 对话框
                // [/Removing (\d+) members? from/, "移除 $1 名成员，从"],
                "The following members will be removed:": "以下成员将被移除：",
                "Remove members": "移除成员",

                // 顶部提醒
                    "You can't remove the last owner of this organization.": "您无法移除该组织的最后一位所有者。",
            // 顶部提醒
                "You publicized 1 membership.": "您公开了 1 名会员资格",
                "You concealed 1 membership.": "您隐藏了 1 名会员资格",

        // 成员管理 https://github.com/orgs/<orgs-name>/people/<user-name>

        // 外部协作者 https://github.com/orgs/<orgs-name>/outside-collaborators
            "Find a collaborator…": "寻找协作者…",
            "Select all": "全选",
            "No one outside of the organization has access to its repositories.": "组织外部的任何人都无法访问其仓库。",

        // 待定协作者 https://github.com/orgs/<orgs-name>/pending_collaborators
            "Find a pending collaborator…": "搜索待定协作者…",
            "There aren't any pending collaborators.": "暂无任何待定的协作者",

        // 待定邀请 https://github.com/orgs/<orgs-name>/people/pending_invitations
            "Find an invitation…": "搜索邀请…",

            "Source": "来源",
            "Filter by invitation source": "按邀请来源筛选",
            "All sources": "所有来源",

            // [/(\d+) invitations?/, "邀请"],

            "Sort": "排序",
            "Sort Order": "排序方式",
            "Newest": "最新的",
            "Oldest": "最早的",

            "No matching invitations.": "暂无匹配的邀请。",

        // 失败邀请 https://github.com/orgs/<orgs-name>/people/failed_invitations
            // [/(\d+) Failed invitations?/, "个失败邀请"],
            "No failed invitations.": "暂无失败邀请。",

    },
    "regexp": [ // 正则翻译
        [/(\d+) teams?/, "$1 团队"],
        [/(\d+) invitations?/, "$1 邀请"],
        [/(\d+) Failed invitations?/, "$1 失败邀请"],
        [/Invite a member to/, "邀请成员加入"],
        [/Convert ([^ ]+) to outside collaborator?/, "将 $1 转换为外部合作者？"],
        [/Removing (\d+) members? from/, "移除 $1 名成员，从"],
   ],
};
I18N.zh["orgs/outside-collaborators"] = I18N.zh["orgs/people"];
I18N.zh["orgs/pending_collaborators"] = I18N.zh["orgs/people"];


I18N.zh["orgs/teams"] = { // 组织 - 团队标签卡
    "static": { // 静态翻译

        // 团队标签卡 https://github.com/orgs/<orgs-name>/teams
            "Seamless communication with teams": "与团队的无缝沟通",
            "Teams are a great way for groups of people to communicate and work on code together. Take a look at why they’re great.": "团队是一群人在一起交流和编写代码的好方法。看看为什么他们很棒。",
            "Flexible repository access": "灵活的仓库访问",
                "You can add repositories to your teams with more flexible levels of access (Admin, Write, Read).": "您可以将仓库添加到您的团队中，并有更灵活的访问级别（管理员、写入、读取）。",
            "Request to join teams": "申请加入团队",
                "Members can quickly request to join any team. An owner or team maintainer can approve the request.": "成员可以快速申请加入任何团队。一个所有者或团队维护者可以批准该请求。",
            "Team mentions": "团队提及",
                "Use team @mentions (ex.": "使用团队 @提及（例如",
                "for the entire team) in any comment, issue, or pull request.": "对于整个团队）在任何评论、议题或拉取请求中。",
                "New team": "新建团队",

        // 创建团队 /orgs/<org-login>/new-team
            "Create new team": "新建团队",
            "Team name": "团队名称",
            "You’ll use this name to mention this team in conversations.": "您将使用此名称在对话中提及此团队。",
            "Description": "描述",
            "What is this team all about?": "这个团队是什么？",
            "Parent team": "父团队",
                "There are no teams that can be selected.": "没有可以选择的团队。",
            "Team visibility": "团队可见性",
                "Visible": "可见",
                    "Recommended": "推荐",
                    "A visible team can be seen and": "可见的团队可以被看到并",
                    "@mentioned": "@提及",
                    "by every member of this organization.": "本组织的每一位成员。",
                "Secret": "私密",
                    "A secret team can only be seen by its members and may not be nested.": "私密团队只能被其成员看到，而且不能被嵌套。",
            "Create team": "创建团队",

    },
    "regexp": [ // 正则翻译
    ],
};
I18N.zh["orgs/new-team"]= I18N.zh["orgs/teams"]

I18N.zh["orgs/domain/new"] = { // 组织 - 添加域名
    "static": { // 静态翻译
        "Verified & approved domains": "经验证和批准的域名",
        "Add a domain": "添加域名",
        "What domain would you like to add?": "您想添加什么域名？",
        "Add domain": "添加域名",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/profile"] = { // 组织设置 - 组织资料
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 组织资料 /organizations/<org-login>/settings/profile
            "Most organization settings are hidden for an archived organization. This organization must be unarchived to change them.": "对于已存档的组织，组织大多数设置都是隐藏的。必须取消对该组织的归档才能更改它们。",

            "Organization profile": "基本资料",
                "Profile picture": "我的头像",
                    "Upload new picture": "上传新头像",
                    "Note: To apply for a publisher verification your organization's profile picture should not be irrelevant, abusive or vulgar. It should not be a default image provided by GitHub.": "注意：需要申请发布者验证，您的组织的个人资料图片不应该是不相关的、辱骂性的或粗俗的。它不应该是由 GitHub 提供的默认图片。",
                "Organization display name": "组织显示名称",
                "Email (will be public)": "公开电子邮箱",
                "Description": "描述",
                "URL": "网站",
                "Social accounts": "社交账户",
                "Link to social profile": "链接到社交账户",
                "Location": "位置",
                    "Select a location": "选择位置",
                    "Find a location...": "搜索位置...",
                    "Clear Location": "清除位置",
                "Billing email": "账单电子邮箱",
                "(Private)": "（私人）",
                    "Add more billing email recipients in the":"添加更多的账单邮件收件人在",
                    "billing page": "账单页面",
                "Gravatar email": "Gravatar 电子邮箱",
                "Sponsors update email": "赞助者更新电子邮箱",
                    "The developers and organizations that your organization sponsors can send you updates to this email.": "您的组织赞助的开发人员和组织可以向您发送此电子邮箱的更新。",
                "Update profile": "更新资料",
                "Profile updated successfully": "资料更新成功。",

            "GitHub Developer Program": "GitHub 开发者计划",
                "Building an application, service, or tool that integrates with GitHub?": "构建应用、服务或工具，集成到 GitHub 吗？",
                "Join the GitHub Developer Program": "加入 GitHub 开发者计划",
                ", or read more about it at our": "，或了解更多信息在我们的",
                "Developer site": "开发者站点",
                "Check out the Developer site": "查看开发者网站，",
                "for guides, our API reference, and other resources for building applications that integrate with GitHub. Make sure your contact information is up-to-date below. Thanks for being a member!": "了解指南、我们的 API 参考和其他用于构建与 GitHub 集成的应用的资源。请确保您的联系信息是最新的。感谢您成为我们的会员！",

            "Terms of Service": "服务条款",
                "Standard": "标准",
                    "Best for individuals wanting the freedom to move data and remain independent of a corporation.": "最适合希望自由移动数据并保持独立于公司的个人。",
                    "Read the Standard Terms of Service": "阅读 “标准服务条款”",
                "Corporate": "企业",
                    "Best for businesses that need to protect their intellectual property and secure visibility into their data.": "最适合需要保护知识产权并确保数据可见性的企业。",
                    "Read the GitHub customer agreement": "请阅读 GitHub 用户协议",
                    "Sign GitHub customer terms": "签署 GitHub 用户条款",

            "Danger zone": "危险区",
                "Rename organization": "重命名组织",
                    "Renaming your organization can have": "重命名您的组织可能会有",
                    "unintended side effects": "意想不到的副作用",
                    "This organization cannot be renamed because it is archived.": "该组织无法重命名，因为它已存档。",
                "Really rename your organization?": "确定要重命名您的组织？",
                "Unexpected bad things will happen if you don’t read this!": "请仔细阅读以下提示信息！！！",
                "We": "我们",
                "will not": "不会",
                "will": "会",
                "create redirects for your repositories (web and git access).": "为您的仓库设置重定向（ web 和 git 访问）。",
                "You will need to update your local repositories to point to the new location.": "您将需要更新您的本地仓库，以指向新的位置。",
                "Renaming may take a few minutes to complete.": "重命名可能需要几分钟的时间来完成。",
                "I understand, let’s rename my organization": "我明白了，依然重命名我的组织",

                "Rename your organization": "重命名组织",
                "Change organization’s name":"更改组织名",
                // 顶部提醒
                    "Organization name may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen": "组织名称只能包含字母数字字符或单连字符，不能以连字符开始或结束。",
                    "Organization name is not available": "组织名称不可用",

                "Archive this organization": "存档组织",
                    "Mark this organization and all its repositories as archived and read-only.": "将此组织及其所有仓库标记为已存档和只读。",
                    "Please provide": "请提供",
                    "feedback": "反馈",
                    "on this feature.": "关于此功能。",

                    "Archive organization": "存档组织",
                        "This organization will be archived.": "该组织将被存档。",
                        "Modifying settings will be limited and creating new repositories will be blocked.": "修改设置将受到限制，并且创建新仓库将被阻止。",

                        "All repositories will be": "所有仓库都将被",
                        "archived": "存档",
                        "and be read-only.": "并设为只读。",
                        "Before you archive, please consider:": "在存档之前，请考虑：",
                            "Updating any organization settings": "更新任何组织设置",
                            "Making a note in your": "请标记在您的",
                            "organization README": "组织 README",
                        "Please type": "请输入",
                        "to confirm.": "进行确定。",
                        "I understand the consequences, archive this organization": "我明白后果，依然存档该组织",

                        // 顶部提醒
                        // [/Your organization ([^ ]+) is being archived./, "您的组织 $1 已归档。"],

                "Unarchive this organization": "解锁存档组织",
                    "Mark this organization as unarchived and read-write.": "将此组织标记为未存档且可读写。",

                    "Unarchive organization": "解除组织存档",
                    "This organization will be unarchived.": "该组织将解除存档。",
                    "Modifying settings will be possible and creating new repositories will be unblocked.": "可以修改设置，创建新仓库也将不再受限。",

                    "Repositories will be remain": "仓库将保持",
                    "and need to be unarchived separately.": "，并需要单独解除存档。",
                    "I understand the consequences, unarchive this organization": "我明白后果，依然解除该组织存档",

                        // 顶部提醒
                        // [/Your organization ([^ ]+) has been unarchived./, "您的组织 $1 已解除归档。"],

                "Delete this organization": "删除组织",
                    "Once deleted, it will be gone forever. Please be certain.": "您一旦删除，将再也无法恢复。请确认！",

                   "Are you sure you want to delete this?": "您确定要删除吗？",
                   "Deleting the": "删除",
                   "organization will delete all of its repositories. The": "组织，将会删除其所有仓库。",
                   "username will be unavailable for 90 days.": "用户名将在 90 天内不可用。",
                   "Before proceeding, please be sure to review the": "在继续之前，请务必查看",
                   "regarding account deletion.": "关于帐户删除。",
                   "Enter this organization’s name to confirm": "请输入组织的名称，进行确认",
                   "Cancel plan and delete the organization": "取消计划并删除此组织",

    },
    "regexp": [ // 正则翻译
        [/Your organization ([^ ]+) is being archived./, "您的组织 $1 已归档。"],
        [/Your organization ([^ ]+) has been unarchived./, "您的组织 $1 已解除归档。"],
    ],
};

I18N.zh["orgs/settings/roles"] = { // 组织设置 - 仓库角色
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 仓库角色 /organizations/<org-login>/settings/roles
            "Roles are used to grant access and permissions for teams and members. In addition to the available pre-defined roles, you can create up to 0 custom roles to fit your needs.": "角色是用来为团队和成员授予访问和权限的。除了可用的预定义角色外，您可以创建多达 0 个自定义角色以满足您的需求。",
            "Pre-defined roles": "预定义角色",
                "You can": "您可",
                "set the base role": "设置基础角色",
                "for this organization from one of these roles.": "从该组织的这些角色中设置",
                    "Read": "只读",
                        "Read and clone repositories. Open and comment on issues and pull requests.": "读取和克隆仓库。打开并评论问题和拉取请求。",
                    "Triage": "分级",
                        "Read permissions plus manage issues and pull requests.": "读取权限外加管理议题和拉取请求的权限。",
                    "Write": "可写",
                        "Triage permissions plus read, clone and push to repositories.": "分级权限外加读取、克隆和推送到仓库。",
                    "Maintain": "维护",
                        "Write permissions plus manage issues, pull requests and some repository settings.": "可写权限外加管理议题、拉取请求和一些仓库设置。",
                    "Admin": "管理员",
                        "Full access to repositories including sensitive and destructive actions.": "对仓库的完全访问权限，包括敏感和破坏性操作。",
                        "Modify Admin Role": "修改管理角色",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/member_privileges"] = { // 组织设置 - 成员权限
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 成员权限 /organizations/<org-login>/settings/member_privileges
            "Member repository permissions": "成员仓库权限",
            "Base permissions": "基本权限",
            "Base permissions to the organization’s repositories apply to all members and excludes outside collaborators. Since organization members can have permissions from multiple sources, members and collaborators who have been granted a higher level of access than the base permissions will retain their higher permission privileges.": "组织仓库的基本权限适用于所有成员，不包括外部协作者。由于组织成员可以拥有多个来源的权限，已经被授予比基本权限更高的访问级别的成员和协作者将保留他们更高的权限。",

            "Organization member permissions": "组织成员的权限",
                "No permission": "无权限",
                    "Members will only be able to clone and pull public repositories. To give a member additional access, you’ll need to add them to teams or make them collaborators on individual repositories.": "成员只能克隆和拉取公共仓库。要为成员提供额外的访问权限，您需要将他们添加到团队中，或者让他们成为单个仓库的协作者。",
                    // 对话框
                        "Change base permission to \"No permission\"": "将基本权限更改为 “无权限”",
                        "You are about to change the base repository permission for this organization.": "您即将更改此组织仓库的基本权限。",
                        // [/This may change the permission that the organization’s (\d+) members? has on its (\d+) repositories?./, "这可能会更改组织的 $1 个成员对其 $2 个仓库的权限。"],
                "Read": "只读",
                    "Members will be able to clone and pull all repositories.": "成员将能够克隆和拉取所有仓库。",
                    // 对话框
                        "Change base permission to \"Read\"": "将基本权限更改为 “只读”",
                "Write": "可写",
                    "Members will be able to clone, pull, and push all repositories.": "成员将能够克隆、拉取和推送所有仓库。",
                    // 对话框
                        "Change base permission to \"Write\"": "将基本权限更改为 “可写”",
                "Admin": "管理员",
                    "Members will be able to clone, pull, push, and add new collaborators to all repositories.": "成员将能够克隆、拉取、推送和向所有仓库添加新的协作者。",
                    // 对话框
                        "Change base permission to \"Admin\"": "将基本权限更改为 “管理员”",
                // 顶部提醒
                    "Base repository permission removed.": "基本仓库权限已被删除。",
                    "Base repository permission updated to \"Read\".": "基本仓库权限已更新为 “只读” 。",
                    "Base repository permission updated to \"Write\".": "基本仓库权限已更新为 “可写” 。",
                    "Base repository permission updated to \"Admin\".": "基本仓库权限已更新为 “管理员” 。",

                "Repository creation": "仓库创建",
                    "Members will be able to create only selected repository types. Outside collaborators can never create repositories.": "成员将只能创建选定类型的仓库。外部协作者永远不能创建仓库。",
                    "Public": "公共",
                        "Members will be able to create public repositories, visible to anyone.": "成员将能够创建任何人都可见的公共仓库。",
                        "Why is this option disabled?": "为什么该选项被禁用？",
                    "Private": "私有",
                        "Members will be able to create private repositories, visible to organization members with permission.": "成员将能够创建私有仓库，对有权限的组织成员可见。",
                // 顶部提醒
                    "Projects settings updated for this organization.": "该组织的项目设置已经更新。",

                    "Repository forking": "仓库复刻",
                        "Allow forking of private repositories": "允许复刻私有仓库",
                        "If enabled, forking is allowed on private and public repositories. If disabled, forking is only allowed on public repositories. This setting is also configurable per-repository.": "如果启用，则私有和公共仓库都允许复刻。如果禁用，则只允许复刻公共仓库。此设置也可以在每个仓库中进行配置。",
                // 顶部提醒
                    "Repository forking setting updated!": "仓库复刻设置已经更新!",

                "Projects base permissions": "项目基本权限",
                    "Projects created by members will default to the elected role below.": "成员创建的项目将默认为下面选定的角色。",

                "Pages creation": "页面创建",
                    "Members will be able to publish sites with only the selected access controls.": "成员将能够发布仅只有选定的访问控制的站点。",
                    // "Public": "公共",
                        "Members will be able to create public sites, visible to anyone.": "成员将能够创建任何人都可见的公共站点。",
                    // "Private": "私有",
                        "Members will be able to create private sites, visible to anyone with permission.": "成员将能够创建私有站点，对任何有权限的人可见。",
                "Integration access requests": "集成访问请求",
                    "Allow integration requests from outside collaborators": "允许来自外部协作者的集成请求",
                    "Outside collaborators will be able to request access for GitHub or OAuth apps to access this organization and its resources.": "外部协作者将能够为 GitHub 或 OAuth 应用申请访问该组织及其资源的权限。",

                "Admin repository permissions": "管理员仓库权限",
                    "Repository visibility change": "仓库可见性更改",
                        "Allow members to change repository visibilities for this organization": "允许成员更改此组织的仓库可见性",
                        "If enabled, members with admin permissions for the repository will be able to change its visibility. If disabled, only organization owners can change repository visibilities.": "如果启用，对仓库有管理权限的成员将能够更改其可见性。如果禁用，只有组织所有者可以更改仓库的可见性。",
                    // 顶部提醒
                        "Members can now change repository visibility.": "成员现在可以更改仓库可见性。",
                        "Members can no longer change repository visibility.": "成员不能再更改仓库可见性。",

                    "Repository deletion and transfer": "仓库的删除和转让",
                        "Allow members to delete or transfer repositories for this organization": "允许成员删除或转让此组织的仓库",
                        "If enabled, members with admin permissions for the repository will be able to delete or transfer": "如果启用，对仓库有管理权限的成员将能够删除或转让",
                        "public": "公共",
                        "private": "私有",
                        "repositories. If disabled, only organization owners can delete or transfer repositories.": "仓库。如果禁用，只有组织所有者可以删除或转让仓库。",
                    // 顶部提醒
                        "Members can now delete or transfer repositories.": "成员现在可以删除或转让仓库。",
                        "Members can no longer delete or transfer repositories.": "成员不能再删除或转让仓库。",

                    "Issue deletion": "议题删除",
                        "Allow repository administrators to delete issues for this organization": "允许仓库管理员删除此组织的议题",
                        "If enabled, members with admin permissions for the repository will be able to delete issues. If disabled, only organization owners can delete issues.": "如果启用，对仓库有管理权限的成员将能够删除议题。如果禁用，只有组织所有者可以删除议题。",
                    // 顶部提醒
                        "Members can now delete issues.": "成员现在可以删除议题。",
                        "Members can no longer delete issues.": "成员不能再删除议题。",

                "Repository discussions": "仓库讨论",
                    "Allow users with read access to create discussions": "允许具有读取权限的用户创建讨论",
                    // [/If enabled, all users with read access can create and comment on discussions in ([^ ]+)’s repositories./, "如果启用，所有具有读取权限的用户都可以在 $1 的仓库中创建和评论讨论。"],
                    "If disabled, discussion creation is limited to users with at least triage permission. Users with read access can still comment on discussions.": "如果禁用，讨论的创建仅限于至少具有分级权限的用户。具有读取权限的用户仍然可以对讨论发表评论。",
                // 顶部提醒
                    "Users with read access to repositories can create new discussions.": "对仓库具有读取权限的用户可以创建新的讨论。",
                    "Only users with at least triage access to repositories can create new discussions.": "只有至少对仓库有分级权限的用户才能创建新的讨论。",

                "Member team permissions": "成员团队权限",
                    "Team creation rules": "团队创建规则",
                        "Allow members to create teams": "允许成员创建团队",
                        "If enabled, any member of the organization will be able to create new teams. If disabled, only organization owners can create new teams.": "如果启用，组织的任何成员将能够创建新的团队。如果禁用，只有组织所有者可以创建新的团队。",
                    // 顶部提醒
                        "Members can now create teams.": "成员现在可以创建团队。",
                        "Members can no longer create teams.": "成员不能再创建团队。",
    },
    "regexp": [ // 正则翻译
        [/This may change the permission that the organization’s (\d+) members? has on its (\d+) repositories?./, "这可能会更改组织的 $1 个成员对其 $2 个仓库的权限。"], // 组织 基本权限更改
        [/If enabled, all users with read access can create and comment on discussions in ([^ ]+)’s repositories./, "如果启用，所有具有读取权限的用户都可以在 $1 的仓库中创建和评论讨论。"],
    ],
};

I18N.zh["orgs/settings/teams"] = { // 组织设置 - 团队讨论
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 团队讨论 /organizations/<org-login>/settings/teams
            "Team discussions provide a place for a team to have conversations that span across projects or repositories and that don’t belong in an issue or a pull request.": "团队讨论为团队提供了一个进行跨项目或仓库，且不属于议题或拉取请求的对话的场所。",
            "Enable team discussions for this organization": "为此组织启用团队讨论",
                "This allows members to start discussions in any team in the": "这允许成员在任何团队中开始讨论，在",
            "organization.": "组织中。",

            "Looking for": "寻找",
            "Organization Discussions": "组织讨论",
            "? Go to": "？转到",
            "Organization Discussions settings.": "组织讨论设置。",

            // 顶部提醒
                "Team discussions enabled for this organization.": "该组织启用了团队讨论。",
                "Team discussions disabled for this organization.": "该组织禁用了团队讨论。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/import-export"] = { // 组织设置 - 导入/导出
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // Import/Export 导入/导出 - 占位帐户 /organizations/<org-login>/settings/import-export
            "Mannequins": "占位帐户",
            "Search mannequins by login or email...": "通过登录名或电子邮箱地址搜索占位帐户...",
            "There are no mannequins in this organization": "该组织尚无占位帐户",
            "Mannequins represent authors of imported contributions. They do not have profile pages and cannot sign in. Their contributions can be reattributed to other members of your organization.": "占位帐户代表导入贡献的作者。他们没有个人资料页，也不能登录。他们的贡献可以重新归属于您组织的其他成员。",

        // Import/Export 导入/导出 - 归属邀请 /organizations/<org-login>/settings/import-export/attribution-invitations
            "Attribution Invitations": "归属邀请",
            "Below are the mannequin reattribution invitations that have been sent within this organization. If the state is \"invited,\" then the user has not yet replied; if it is \"completed,\" then the user has accepted and their contributions have been reattributed, and if it is \"rejected,\" then the user opted not to be credited for that mannequin's contributions.": "以下是该组织内已发送的占位帐户重新归属的邀请。如果状态是 “已邀请”，则用户尚未回复；如果是 “已完成”，那么用户已经接受并且他们的贡献已经被重新归属；如果是 “已拒绝”，那么用户选择不记入该占位帐户的贡献。",
            "No attribution invitations have been sent": "尚未发出归属邀请",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/blocked_users"] = { // 组织设置 - 黑名单
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // Blocked users 黑名单 /organizations/<org-login>/settings/blocked_users
            "Block a user": "拉黑用户",
            "Blocking a user prevents the following on all your repositories:": "拉黑用户可以防止所有仓库中的以下操作：",
            "opening or commenting on issues or pull requests": "打开或评论议题或拉取请求",
            "starring, forking, or watching": "加星标、复刻、关注",
            "adding or editing wiki pages": "添加或编辑 Wiki 页面",

            "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
                "Learn more about blocking a user": "了解更多关于拉黑用户的信息",
            "Block options": "拉黑选项",
                "For 1 day": "1 天",
                "For 3 days": "3 天",
                "For 7 days": "7 天",
                "For 30 days": "30 天",
                "Until I unblock them": "直到取消拉黑",
            "Block user": "拉黑用户",
            "You have not blocked any users.": "您还没有拉黑任何用户。",
            "Unblock": "取消拉黑",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/interaction_limits"] = { // 组织设置 - 互动限制
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // Interaction limits 互动限制 /organizations/<org-login>/settings/interaction_limits
            "Temporary interaction limits": "临时互动限制",
            "Temporarily restrict which external users can interact with your repositories (comment, open issues, or create pull requests) for a configurable period of time. Users who are members of this organization will not be affected by these limits.": "在配置的时间段内，可临时限制哪些外部用户与您的仓库互动（评论、打开议题或创建拉取请求）。作为该组织成员的用户将不受这些限制的影响。",
            "This may be used to force a \"cool-down\" period during heated discussions or prevent unwanted interactions.": "可用于在激烈讨论期间，强制进入 “冷静” 期或防止不必要的互动。",
            "Interaction limits may already exist in your organization's": "互动限制可能已经存在于您的组织",
            "public repositories": "公开仓库",
            ". Any changes here will override those limits.": " 的设置中。此处的全局设置将覆盖那些仓库的局部设置。",
            "Limit to existing users": "仅限现有用户",
                "Users that have recently created their account will be unable to interact with this organization's repositories.": "最近创建帐户的用户将无法与您组织的仓库互动。",
            "Limit to prior contributors": "仅限于先前的贡献者",
                "Users that have not previously committed to the default branch of a repository in this organization will be unable to interact with that repository.": "以前从未提交到您组织某个仓库默认分支的用户将无法与该仓库互动。",
            "Limit to repository collaborators": "仅限仓库协作者",
                "Users that are not collaborators of a repository in this organization will not be able to interact with that repository.": "不是您组织某个仓库的协作者将无法与该仓库互动。",
            "New users": "新用户",
            "Users": "用户",
            "Contributors": "贡献者",
            "Collaborators": "协作者",
            "Organization members": "组织成员",
            // 交互限制时间 下拉菜单
            "Enable interaction limits for:": "启用交互限制：",
            "24 hours": "24 小时",
            "3 days": "3 天",
            "1 week": "1 周",
            "1 month": "1 个月",
            "6 months": "6 个月",
            // 顶部提醒
            "User interaction limit settings saved.": "用户交互限制设置已保存。",


    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/code_review_limits"] = { // 组织设置 - 代码审查限制
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 代码审查限制 /organizations/<org-login>/settings/code_review_limits
            "Restrict users who are permitted to approve or request changes on pull requests in public repositories within this organization.": "限制该组织内允许批准或请求更改公共仓库中拉取请求的用户。",
            "Code review limits may already be specified by individual repositories. Any changes here will override those limits until unset.": "代码审查限制可能已经由各个仓库指定。此处的任何更改都将覆盖这些限制，直至取消设置。",
            "Code review limits are currently managed individually for all repositories. Enable limits to permit only users who have explicitly been granted access to each repository to submit reviews that \"approve\" or \"request changes\". Remove limits to allow all users to submit pull request reviews. All users able to submit comment pull request reviews will continue to be able to do so.": "目前，所有仓库代码审查限制都是单独管理的。启用限制，只允许明确授予每个仓库访问权的用户提交 “批准” 或 “请求更改” 的审查。删除限制，允许所有用户提交拉取请求审查。所有能够提交评论拉取请求审查的用户将继续能够这样做。",
            "Limit reviews on all repositories": "限制对所有仓库的审查",
            "Remove review limits from all repositories": "取消对所有仓库的审查限制",


    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/moderators"] = { // 组织设置 - 版主
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // Moderators 版主 /organizations/<org-login>/settings/moderators
            "You can add organization members or teams as moderators for your organization. Moderators can block and unblock users from the organization, minimize comments, and manage interaction limits for all public organization repositories.": "您可以将组织成员或团队添加为组织的主版主。版主可以阻止和解除对该组织用户的阻止、最小化评论、并管理所有公共组织仓库的交互限制。",

            "You may add up to": "您最多可以添加",
            "members or teams as moderators.": "成员或团队作为版主。",
            "Add a member or team": "添加成员或团队",
            "You don't have any moderators for this organization.": "该组织尚无任何版主",

            // [/Successfully added (@[^\n]+) as a moderator/, "已成功将 $1 添加为版主"],
            // [/Successfully removed (@[^\n]+) as a moderator/, "已成功将 $1 的版主身份移除"],
            "Remove moderator": "移除版主",


    },
    "regexp": [ // 正则翻译
            [/Successfully added (@[^\n]+) as a moderator/, "已成功将 $1 添加为版主"],
            [/Successfully removed (@[^\n]+) as a moderator/, "已成功将 $1 的版主身份移除"],
    ],
};

I18N.zh["orgs/settings/repository-defaults"] = { // 组织设置 - 仓库 / 默认值
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 仓库默认分支 /organizations/<org-login>/settings/repository-defaults
            "Repository default branch": "仓库默认分支",
                "Choose the default branch for new repositories in this organization. You might want to change the default name due to different workflows, or because your integrations still require “master” as the default branch name. You can always change the default branch name on individual repositories.": "为该组织中的新仓库选择默认的分支。由于工作流程的不同，或者由于您的集成仍然需要 “master” 作为默认分支名，您可能想改变默认名称。您可以随时改变单个仓库的默认分支名称。",
                "Learn more about default branches.": "了解更多关于默认分支的信息。",
            // "Update": "更新",
            "Updating…": "更新中…",
            // 顶部提醒
                // [/New repositories created in ([^ ]+) will use main as their default branch./, "在 $1 中创建的新仓库将使用 main 作为其默认分支。"],

            "Commit signoff": "提交签署",
                "Choose whether repositories will require contributors to sign off on commits they make through GitHub's web interface. Signing off is a way for contributors to affirm that their commit complies with the repository's terms, commonly the": "选择仓库是否要求贡献者签署通过 GitHub 的 Web 界面所做的提交。签署是贡献者确认他们的提交符合仓库条款的一种方式，通常是",
                "Developer Certificate of Origin (DCO)": "开发者原产地证书（DCO）",
                "Learn more about signing off on commits": "了解更多关于签署提交的信息",
                "All repositories": "所有仓库",
                    "Require signoff on web-based commits for all repositories in this organization": "要求对该组织中所有仓库的基于 Web 的提交进行签署",
                "No policy": "无政策",
                    "Each repository chooses whether to require signoff on web-based commits": "每个仓库选择是否要求对基于 Web 的提交进行签署",

                // 顶部提醒
                    "Commit signoff settings were updated.": "提交签署设置已更新。",

            "Repository labels": "仓库标签",
                "Set the labels that will be included when a new repository is created in this organization.": "设置在此组织中创建新的仓库时将包含的标签。",
                "Learn more about managing default labels for your organization.": "了解更多关于为您的组织管理默认标签的信息。",
            "New label": "新建标签",
                "Label preview": "标签预览",
                "Label name": "标签名",
                "Description": "描述",
                "Description (optional)": "描述（可选）",
                "Color": "颜色",
                    "Get a new color": "获得新颜色",
                    "Choose from default colors:": "从默认颜色中选择：",
                "Create label": "创建标签",
                "Saving...": "保存中...",
                "Save changes": "保存更改",
            // 删除提醒
            "Are you sure? Deleting a label will remove as a default, and no future repositories will receive this label when created.": "您确定吗？删除标签将作为默认值删除，以后的仓库在创建时不会收到此标签。",

            "label": "个标签",
            "labels": "个标签",
            "bug": "BUG",
                "Something isn't working": "有些东西不工作",
            "dependencies": "依赖性",
                "Pull requests that update a dependency file": "更新一个依赖文件的拉取请求",
            "documentation": "文档",
                "Improvements or additions to documentation": "文档的改进或补充",
            "duplicate": "重复",
                "This issue or pull request already exists": "这个议题或拉取请求已经存在",
            "enhancement": "增强",
                "New feature or request": "新功能或请求",
            "good first issue": "好的首发议题",
                "Good for newcomers": "适合新人",
            "help wanted": "需要帮助",
                "Extra attention is needed": "需要特别关注",
            "invalid": "无效",
                "This doesn't seem right": "这似乎不对",
            "question": "问题",
                "Further information is requested": "要求提供更多信息",
            "wontfix": "不会修复",
                "This will not be worked on": "这将不会被处理",

    },
    "regexp": [ // 正则翻译
        [/New repositories created in ([^ ]+) will use main as their default branch./, "在 $1 中创建的新仓库将使用 main 作为其默认分支。"],
        [/Your default branch name will be ([^ ]+)/, "您的默认分支名称将是 $1"],
    ],
};

I18N.zh["orgs/topics"] = { // 组织设置 - 仓库 /仓库主题
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 仓库主题 /orgs/<org-login>/topics
            "No repositories": "尚无仓库",
            "A code repository designed to show the best GitHub has to offer.": "旨在展示 GitHub 必须提供的最佳代码仓库。",

    },
    "regexp": [ // 正则翻译
        [/([^ ]+) repositories you contribute to/, "您贡献的 $1 仓库"],
        [/There are no repositories in ([^ ]+) that you’ve contributed to and that you can set topics on./, "$1  中没有您贡献过的并且可以设置主题的仓库。"],
    ],
};

I18N.zh["orgs/settings/codespaces"] = { // 组织设置 - 仓库 /代码空间
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],
        "To start using Codespaces, please": "要开始使用代码空间，请",
        "upgrade your plan": "升级您的计划",
        "to enable your organization.": "以启用您的组织。",

        "Codespaces access": "代码空间访问",
            "Manage access to GitHub Codespaces for your organization's members on private and internal repositories. Codespaces are always available on public repositories.": "管理组织成员对私有和内部仓库中 GitHub 代码空间的访问权限。代码空间始终在公共仓库中可用。",

            "By enabling Codespaces, you agree to GitHub’s": "启用代码空间即表示您同意 GitHub 的",
            "additional products and features terms": "附加产品和功能条款",
            "and approve of these terms on behalf of your organization.": "并代表您的组织批准这些条款。",

            "Disabled": "禁用",
                "Disable GitHub Codespaces for all organization owned private and internal repositories": "禁用所有组织拥有的私有和内部仓库的 GitHub 代码空间",

            "Enable for specific members": "为特定成员启用",
                "Enable GitHub Codespaces for specific organization members on all organization owned private and internal repositories": "在所有组织拥有的私有和内部仓库上为特定组织成员启用 GitHub 代码空间",

            "Enable for all members": "为所有成员启用",
                "Enable GitHub Codespaces for all organization members on all organization owned private and internal repositories": "在所有组织拥有的私有和内部仓库上为所有组织成员启用 GitHub 代码空间",

            "Enable for all members and outside collaborators": "为所有成员和外部协作者启用",
                "Enable GitHub Codespaces for all organization members and outside collaborators on all organization owned private and internal repositories": "在所有组织拥有的私有和内部仓库上为所有组织成员和外部协作者启用 GitHub 代码空间",

        "Codespace ownership": "代码空间所有权",
            "Control who owns codespaces created by your organization’s members on organization owned repositories. Codespace ownership dictates who is billed for usage, whose policies apply, and where audit logs are sent.": "控制谁拥有组织成员在组织拥有的仓库上创建的代码空间。代码空间所有权决定了由谁来支付使用费、适用谁的策略以及审计日志发送到何处。",

            "Organization ownership": "组织所有权",
                "All codespaces created by your organization’s members on your organization’s repositories are owned by the organization": "组织成员在组织仓库上创建的所有代码空间都归组织所有",

            "User ownership": "用户所有权",
                "All codespaces created by your organization’s members on your organization’s repositories are owned by the creating member": "组织的成员在组织仓库上创建的所有代码空间都归创建成员所有",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/copilot"] = {  // 组织设置 - GitHub Copilot
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 组织设置 - GitHub Copilot /orgs/<org-login>/settings/copilot
            "The AI powered pair programmer for your organization. Once you complete onboarding, you’ll have the ability to manage policies and control which users or teams will have access to": "为您的组织提供人工智能助理程序员。完成入职后，您将能够管理策略并控制哪些用户或团队有权访问组织内的",
            "inside your organization.": "。",

            "Enable GitHub Copilot": "启用 GitHub Copilot",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/actions"] = { // 组织设置 - 操作
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 操作页面 /organizations/<org-login>/settings/actions
            "General actions permissions": "常规操作权限",

            "Policies": "政策",
                "Choose which repositories are permitted to use GitHub Actions.": "选择允许哪些仓库使用 GitHub Actions。",
                "All repositories": "所有仓库",
                    "Actions can be run by any repository in the organization": "操作可以由组织中的任何仓库运行",
                "Selected repositories": "选定的仓库",
                    "Actions can only be run by specifically selected repositories": "操作只能由特定选择的仓库运行",
                    // [/(\d+) selected repositor(y|ies)/, "$1 个选定的仓库"],
                    "selected repository": "个选定的仓库",
                    "selected repositories": "个选定的仓库",
                    // 对话框
                        "Select the organization repositories that may use Actions.": "选择可以使用操作的组织仓库。",
                        "Filter repositories": "筛选仓库",
                        "No repositories found.": "未找到仓库。",
                        "Select repositories": "选定仓库",
                "Disabled": "禁用",
                    "GitHub Actions is disabled for all repositories in the organization": "对组织中的所有仓库禁用 GitHub Actions",

                "Allow all actions and reusable workflows": "允许所有操作和可复用的工作流程",
                    "Any action or reusable workflow can be used, regardless of who authored it or where it is defined.": "可以使用任何操作或可复用的工作流程，而不管它是谁创作的或在哪里定义的。",
                // [/Allow ([^ ]+) actions and reusable workflows/, "允许 $1 的操作和可复用的工作流程"],
                //     [/Any action or reusable workflow defined in a repository within the ([^ ]+) organization can be used./, "可以使用在 $1 组织内的仓库中定义的任何操作或可复用的工作流程。"], // 操作页面
                // [/Allow ([^ ]+), and select non-([^ ]+), actions and reusable workflows/, "允许 $1，并选择非 $2、操作和可复用的工作流程"],
                //     [/Any action or reusable workflow that matches the specified criteria, plus those defined in a repository within the ([^ ]+) organization, can be used./, "可以使用符合指定条件的操作或可复用的工作流程，以及在 $1 组织内的仓库中定义的操作或可复用的工作流程。"], // 操作页面
                    "Learn more about allowing specific actions and reusable workflows to run.": "了解更多关于允许运行特定操作和可复用的工作流程的信息。",
                    "Allow actions created by GitHub": "允许由 GitHub 创建的操作",
                    "Allow actions by Marketplace": "允许来自市场的操作，",
                    "verified creators": "由经验证的创建者创建",
                    "Allow specified actions and reusable workflows": "允许指定的操作和可复用的工作流程",
                    "Applies to": "适用于",
                    "repositories only": "仓库，仅仅",
                        // "Workflows using these actions in private repositories will fail.": "在私有仓库中使用这些操作的工作流程将失败。",
                        // "Using a list of specific actions is only supported for public repositories on your current GitHub plan. To have this list apply to private repositories,": "只有当前 GitHub 计划中的公共仓库才支持使用特定操作列表。要将此列表应用于私有仓库，",
                        // "upgrade your plan": "升级您的计划",
                "Enter a comma-separated list of actions and reusable workflows": "输入以逗号分隔的操作和可复用的工作流程列表",
                "Wildcards, tags, and SHAs are allowed.": "允许使用通配符、标签和 SHA。",
                "Action examples:": "操作示例：",
                "Reusable workflow examples:": "可复用的工作流程示例：",
                "Entire organisation or repository examples:": "整个组织或仓库的示例：",

            "Artifact and log retention": "工件和日志保留",
                "Choose the default repository settings for artifacts and logs.": "选择工件和日志的默认仓库设置。",
                "days": "天",
                "You can set a maximum limit of": "您最多可以设置为",
                "days.": "天。",

            "Fork pull request workflows from outside collaborators": "从外部协作者，复刻拉取请求工作流程",
                "Choose which subset of outside collaborators will require approval to run workflows on their pull requests.": "选择哪些外部协作者的子集需要批准才能对他们的拉取请求运行工作流程。",
                "Learn more about approving workflow runs from public forks.": "了解更多关于批准来自公共复刻的工作流运行的信息。",
                "Require approval for first-time contributors who are new to GitHub": "要求对首次加入 GitHub 的贡献者进行审批",
                    "Only first-time contributors who recently created a GitHub account will require approval to run workflows.": "只有最近创建 GitHub 帐户的首次贡献者才需要获得批准才能运行工作流程。",
                "Require approval for first-time contributors": "要求对首次贡献者进行审批",
                    "Only first-time contributors will require approval to run workflows.": "只有首次贡献者才需要获得批准才能运行工作流程。",
                "Require approval for all outside collaborators": "要求对所有外部协作者进行审批",
                    "All outside collaborators will always require approval to run workflows on their pull requests.": "所有外部协作者将始终需要批准才能在他们的拉取请求上运行工作流程。",

            "Fork pull request workflows in private repositories": "私有仓库的复刻拉取请求工作流程",
                "These settings apply to private repositories. Repository administrators will only be able to change the settings that are enabled here.": "这些设置适用于私有仓库。仓库管理员只能改变这里启用的设置。",
                "Run workflows from fork pull requests": "从复刻拉取请求运行工作流程",
                    "This tells Actions to run workflows from pull requests originating from repository forks. Note that doing so will give maintainers of those forks the ability to use tokens with read permissions on the source repository.": "这告诉 Actions 运行工作流程，来自仓库复刻的拉取请求。请注意，这样做将使这些复刻的维护者有能力在源码库上使用具有读取权限的令牌。",
                    "Send write tokens to workflows from fork pull requests.": "从复刻拉取请求，发送可写令牌到工作流程",
                        "This tells Actions to send tokens with": "这告诉 Actions 发送令牌",
                        "write": "写入",
                        "permissions to workflows from pull requests originating from repository forks. Note that doing so will give maintainers of those forks": "权限到工作流程，来自仓库复刻的拉取请求。请注意，这样做将授予这些复刻的维护者",
                        "permissions against the source repository.": "权限，针对源仓库。",
                    "Send secrets to workflows from fork pull requests.": "从复刻拉取请求，发送机密到工作流程",
                        "This tells Actions to send repository secrets to workflows from pull requests originating from repository forks.": "这告诉 Actions 发送仓库机密到工作流程，来自仓库复刻的拉取请求。",

            "Workflow permissions": "工作流程权限",
                "Choose the default permissions granted to the GITHUB_TOKEN when running workflows in this organization. You can specify more granular permissions in the workflow using YAML.": "在组织中运行工作流程时，选择授予 GITHUB_TOKEN 的默认权限。您可以使用 YAML 在工作流程中指定更细化的权限。",
                "Repository administrators will only be able to change the default permissions to a more restrictive setting.": "仓库管理员只能将默认权限改为更严格的设置。",
                    "Read and write permissions": "读取和写入权限",
                        "Workflows have read and write permissions in the repository for all scopes.": "工作流程在仓库中对所有作用域具有读和写的权限。",
                    "Read repository contents and packages permissions": "读取仓库的内容和软件包的权限",
                        "Workflows have read permissions in the repository for the contents and packages scopes only.": "工作流程在仓库中仅对内容和软件包作用域具有只读的权限。",
                    "Choose whether GitHub Actions can create pull requests or submit approving pull request reviews.": "选择 GitHub Actions 是否可以创建拉取请求或提交批准拉取请求审查。",
                    "Allow GitHub Actions to create and approve pull requests": "允许 GitHub Actions 创建和批准拉取请求",
                        "This controls whether GitHub Actions can create pull requests or submit approving pull request reviews.": "这控制 GitHub Actions 是否可以创建拉取请求或提交批准的拉取请求审查。",

            "Required workflows": "所需的工作流程",
                "Add workflow": "添加工作流",
                "Set required workflows to run in your organization’s repositories. These workflows will run alongside the repository workflows and branch merging will be blocked until the required checks succeed.": "设置所需的工作流程，在您的组织的仓库中运行。这些工作流程将与仓库的工作流程一起运行，分支合并将被阻止，直到所需的检查成功。",
                "Learn more about required workflows.": "了解更多关于所需工作流程的信息。",
                "There are no required workflows in this organization.": "此组织中尚无所需的工作流程。",

        // 运行器页面 /organizations/<org-login>/settings/actions/runners
            "Includes all runners across self-hosted and GitHub-hosted runners.": "包括所有自托管和 GitHub 托管的运行器。",

            "Host your own runners and customize the environment used to run jobs in your GitHub Actions workflows. Runners added to this organization can be used to process jobs in multiple repositories in your organization.": "托管您自己的运行器，并定制用于在您的 GitHub Actions 工作流程中运行作业的环境。添加到该组织的运行器可以用来处理您的组织中的多个仓库的工作。",
            "Learn more about self-hosted runners": "了解更多关于自托管运行器的信息",

            "Search runners": "搜索运行器",
            "New runner": "创建运行器",

            "There are no runners configured": "暂无设置运行器",
            "Learn more about using runners": "了解更多关于使用运行器的信息",
            "to run actions on your own servers.": "在您自己的服务器上运行操作的信息。",

            "GitHub-hosted runners": "由 GitHub 托管的运行器",
            "Ready-to-use runners managed by GitHub": "由 GitHub 管理的即用型运行器",
            // [/(\d+) active jobs?/ ,"$1 个活跃的工作"]

        // 由 GitHub 托管的运行器 /organizations/<org-login>/settings/actions/hosted-runners
            "/ GitHub-hosted runners": "/ 由 GitHub 托管的运行器",
            "All jobs usage": "所有工作的使用情况",
            "To increase your concurrency limit, upgrade your": "要增加您的并发限制，请升级您的",
            "GitHub plan.": "GitHub 计划。",

            "Labels": "标签",

            "Active jobs": "活跃的工作",
            "There are currently no running jobs": "目前没有正在运行的工作",
            "Add `": "添加 `",
            "` to your workflow's YAML to send jobs to GitHub-hosted runners.": "`到您的工作流程的YAML中，以发送作业到 GitHub 托管的运行器。",

        // 创建运行器页面 /organizations/<org-login>/settings/actions/runners/new
            "/ Create self-hosted runner": "/ 创建自托管运行器",
            "Adding a self-hosted runner requires that you download, configure, and execute the GitHub Actions Runner. By downloading and configuring the GitHub Actions Runner, you agree to the": "添加一个自托管运行器需要您下载、配置并执行 GitHub Actions 运行器。下载并配置 GitHub Actions 运行器 后，您同意",
                "GitHub Terms of Service": "GitHub 服务条款",
                "GitHub Corporate Terms of Service": "GitHub 企业服务条款",
                ", as applicable.": "，如适用。",
            "Runner image": "运行器镜像",
            "Architecture": "架构",
            "Download": "下载",
            // win 64
            "We recommend configuring the runner under \"\\actions-runner\". This will help avoid issues related to service identity folder permissions and long path restrictions on Windows.": "我们建议在 “\\actions-runner” 下配置运行器。这将有助于避免与 Windows 上的服务标识文件夹权限和长路径限制相关的议题。",
            // macOS-arm64
            "macOS-arm64 runners are currently in pre-release status and subject to change.": "macOS-arm64 的运行器目前处于预发布状态，可能会有变化。",
            "Configure": "设置",
            "Using your self-hosted runner": "使用您的自托管运行器",
            "For additional details about configuring, running, or shutting down the runner, please check out our": "关于配置、运行或关闭运行器的其他细节，请查看我们的",
            "product docs": "产品文档",

        // 运行器组 /organizations/<org-login>/settings/actions/runner-groups
            "Control access to your runners by specifying the repositories that are able to use your shared organization runners. Upgrade to an Enterprise plan to create groups.": "通过指定能够使用您的共享组织运行器的仓库来控制对运行器的访问。升级到企业计划以创建组。",

            "Search runner groups": "搜索运行器组",
            "New runner group": "创建运行器组",

            "Group": "组",
            "Default": "默认",
                "This group cannot be deleted and new runners will be automatically assigned to this group if no other group is specified.": "该组不能被删除，如果没有指定其他组，新的运行器将被自动分配到该组。",
                "All repositories, excluding public repositories": "所有仓库，不包括公共仓库",

        // 缓存 /organizations/<org-login>/settings/actions/caches
            "Caches": "缓存",
            "You can use caches for dependencies and other commonly reused files to speed up your workflows. The data on this page have at least 5 minutes of latency.": "您可以对依赖项和其他经常重复使用的文件的缓存来加快您的工作流程。此页面上的数据至少有 5 分钟的延迟。",
            "Learn more about caches": "了解有关缓存的更多信息",

            "Search repositories": "搜索仓库",

            "Sort": "排序",
                "Sort by": "排序方式",
                "Largest size": "最大尺寸",
                "Smallest size": "最小尺寸",

            "No repository uses caches": "尚无仓库使用缓存",
            "Nothing has been cached by workflows running in any repositories of this organization.": "该组织任何仓库中运行的工作流程都未缓存任何内容。。",
            "Learn more about caching": "了解更多关于缓存",
            "dependencies and build outputs to improve workflow execution time.": "依赖关系和构建输出以改善工作流程执行时间的信息。",

    },
    "regexp": [ // 正则翻译
        [/(\d+) selected repositor(y|ies)/, "$1 个选定的仓库"],
        [/Allow ([^ ]+) actions and reusable workflows/, "允许 $1 的操作和可复用的工作流程"],
        [/Any action or reusable workflow defined in a repository within the ([^ ]+) organization can be used./, "可以使用在 $1 组织内的仓库中定义的任何操作或可复用的工作流程。"], // 操作页面
        [/Allow ([^ ]+), and select non-([^ ]+), actions and reusable workflows/, "允许 $1，并选择非 $2、操作和可复用的工作流程"],
        [/Any action or reusable workflow that matches the specified criteria, plus those defined in a repository within the ([^ ]+) organization, can be used./, "可以使用符合指定条件的操作或可复用的工作流程，以及在 $1 组织内的仓库中定义的操作或可复用的工作流程。"], // 操作页面
        [/(\d+) active jobs?/ ,"$1 个活跃的工作"], // settings/actions/runners
        [/(\d+) caches?/, "$1 项缓存"],
    ],
};

I18N.zh["orgs/settings/hooks"] = { // 组织设置 - Web 钩子
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],
        ...I18N.zh["repository/settings/hooks"]["static"],

    },
    "regexp": [ // 正则翻译
        [/Completed in (\d+) seconds?./, "在 (\d+) 秒内完成。"],
    ],
};

I18N.zh["orgs/settings/discussions"] = { // 组织设置 - 讨论
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 讨论 /organizations/<org-login>/settings/discussions
            "Discussions for your organization": "您组织的讨论",
            "Setting up Discussions for your organization will allow you to broadcast updates, answer questions, and hold conversations for the entire organization.": "为您的组织设置 “讨论”，将您能够为整个组织广播更新、回答问题和举行对话。",
            "Enable discussions for this organization": "启用组织的讨论功能",

            "Choose a source repository that will host the discussions.": "选择一个承载讨论的源码库。",
                "All discussions on the source repository will be surfaced to the organization Discussions tab.": "源码库上的所有讨论都将显示在组织讨论选项卡中。",
                "Permissions from the repository will be applied to the organization Discussions. By default, all members of the organization will be able to create and comment on discussions.": "来自仓库的权限将应用于组织讨论。默认情况下，组织的所有成员都可以创建讨论并发表评论。",
                "Members can now share updates or ask questions to the entire organization.": "成员现在可以向整个组织共享更新或提问。",
                "For more information, see our documentation.": "有关更多信息，请参阅我们的文档。",

                "Choose a repository": "选择仓库",
                "Search for a repository": "搜索仓库",

            // 提醒
                "Organization discussions has been set up!": "组织讨论已经建立！",
                "View organization discussions": "查看组织讨论",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/projects"] = { // 组织设置 - 项目
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 项目 /organizations/<org-login>/settings/projects
            "Projects on GitHub help you organize and prioritize your work. You can create projects for specific feature work, comprehensive roadmaps, or even release checklists.": "GitHub 上的项目可以帮助您组织和安排工作的优先级。您可以为特定的功能工作、全面的路线图、甚至是发布清单创建项目。",
            "Enable Projects for the organization": "启用项目，为组织",
                "This allows members to create projects for the": "允许成员创建项目，为",
                "organization. Members can create projects to organize and track issues from any": "组织。成员可以创建项目来组织和跟踪来自任何",
                "-owned repository.": "组织拥有的仓库。",
            "Allow members to change project visibilities for this organization": "允许成员更改此组织的项目可见性",
                "If enabled, members with admin permissions on a project can make the project public or private. If disabled, only organization owners can make the project public or private. All projects are private by default.": "如果启用，在项目上有管理权限的成员可以将项目设为公开或私有。如果禁用，则只有组织所有者可以将项目设为公开或私有。默认情况下，所有项目都是私有的。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/security"] = { // 组织设置 - 身份验证安全主
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 身份验证安全  /organizations/<org-login>/settings/security
            "Two-factor authentication": "双重身份验证",
            "Requiring an additional authentication method adds another level of security for your organization.": "要求额外的身份验证方法为您的组织增加了另一个级别的安全性。",
            // [/Require two-factor authentication for everyone in the ([^]+) organization./, "要求对 $1 组织中的每个成员进行双重身份验证。"],
            "Members, billing managers, and outside collaborators who do not have two-factor authentication enabled for their personal account will be removed from the organization and will receive an email notifying them about the change.": "未为其个人帐户启用双重身份验证的成员、账单管理员和外部协作者将从组织中删除，并会收到一封电子邮件，通知他们有关更改。",

            // 顶部提醒
                "Enabling two-factor authentication requirement.": "启用双重身份验证。",
                "Disabled two-factor authentication requirement.": "禁用双重身份验证。",

            "SSH Certificate Authorities": "SSH 证书颁发机构",
            "Provide SSH certificates that members can use to access your resources with Git": "提供 SSH 证书，成员可以用 Git 来访问您的资源",
            "Try risk-free for 30 days": "无风险试用 30 天",
            "learn more": "了解更多",
            ", or": "，或",
            "dismiss this message.": "忽略此消息。",

            "IP allow list": "IP 白名单",
            "An IP allow list lets your organization limit access based on the IP address a person is accessing from.": "IP  白名单可让您的组织根据成员访问的 IP 地址来限制访问。",
            "Restrict access to your organization's assets by configuring a list of IP addresses that are allowed to connect": "通过配置 IP 白名单来限制对组织资产的访问",
    },
    "regexp": [ // 正则翻译
        [/Require two-factor authentication for everyone in the ([^]+) organization./, "要求对 $1 组织中的每个成员进行双重身份验证。"],
    ],
};

I18N.zh["orgs/settings/security_analysis"] = { // 组织设置 - 代码安全性与分析
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 代码安全性与分析 /organizations/<org-login>/settings/security_analysis
            "Security and analysis features help keep your repositories secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your organization's repositories.": "安全和分析功能有助于确保您的仓库安全和更新。通过启用这些功能，您授予我们对您组织的仓库执行只读分析的权限。",

            "Disable all": "禁用全部",
            "Enable all": "启用全部",

            "Private vulnerability reporting": "私下漏洞报告",
                "Allow your community to privately report potential security vulnerabilities to maintainers and repository owners.": "允许您的社区向维护者和仓库所有者私下报告潜在的安全漏洞。",
                "Learn more about private vulnerability reporting": "了解更多关于私下漏洞报告的信息",
                "Automatically enable for new public repositories": "为新公共仓库自动启用",

                // 对话框
                "Disable private vulnerability reporting": "禁用私下漏洞报告",
                // [/You're about to disable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中禁用私下漏洞报告。"],
                "Enable by default for new public repositories": "默认启用新公共仓库",

                "Enable private vulnerability reporting": "启用私下漏洞报告",
                // [/You're about to enable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中启用私下漏洞报告。"],

            "Dependency graph": "依赖关系图",
                "Understand your dependencies.": "了解您的依赖项。",
                "Automatically enable for new private repositories": "为新私有仓库自动启用",

                // 对话框
                "Disable dependency graph": "禁用依赖关系图",
                // [/You're about to disable dependency graph on all private repositories in ([^ ]+). This will also disable Dependabot alerts and Dependabot security updates on those repositories./, "您即将禁用 $1 组织中所有私有仓库上的依赖关系图。这也将禁用这些仓库的 Dependabot 警报和 Dependabot 安全更新。"],
                "Enable by default for new private repositories": "默认为新私有仓库启用",

                "Enable dependency graph": "启用依赖关系图",
                // [/You're about to enable dependency graph on all private repositories in ([^ ]+)./, "您即将启用 $1 组织中的所有私有仓库上的依赖关系图。"],

            // Dependabot
                "Keep your dependencies secure and up-to-date.": "保持您的依赖关系的安全和最新",
                "Learn more about Dependabot": "了解更多关于 Dependabot 的信息",

                "Dependabot alerts": "Dependabot 警报",
                    "Receive alerts for vulnerabilities that affect your dependencies and manually generate Dependabot pull requests to resolve these vulnerabilities.": "接收影响您的依赖关系的漏洞警报，并手动生成 Dependabot 拉取请求以解决这些漏洞。",
                        "Configure alert notifications": "配置警报通知",
                    "Automatically enable for new repositories": "为新仓库自动启用",

                // 对话框
                    "Disable Dependabot alerts": "禁用 Dependabot 警报",
                    // [/You're about to disable Dependabot alerts on all repositories in ([^ ]+). This will also disable Dependabot security updates on those repositories./, "您即将禁用 $1 组织中所有仓库上的 Dependabot 警报。这也将禁用这些仓库的 Dependabot 安全更新。"],
                    "Enable by default for new repositories": "默认为新仓库启用",

                    "Enable Dependabot alerts": "启用 Dependabot 警报",
                    // [/You're about to enable Dependabot alerts on all repositories in ([^ ]+). Alerts require the dependency graph, so we'll also turn that on for all repositories./, "您即将启用 $1 组织中所有仓库上的 Dependabot 警报。Dependabot 警报需要依赖关系图，因此我们还将为所有仓库打开它。"],

                    "Dependabot rules": "Dependabot 规则",
                        "Create your own custom rules and manage alert presets.": "创建您自己的自定义规则并管理警报预设。",
                        // [/(\d+) rules? enabled/, "$1 条规则启用"],

            "Dependabot security updates": "Dependabot 安全更新",
                "Enabling this option will result in Dependabot automatically attempting to open pull requests to resolve every open Dependabot alert with an available patch. If you would like more specific configuration options, leave this disabled and use": "启用后，Dependabot 会自动尝试打开拉取请求，以使用可用补丁解决每个打开的 Dependabot 警报。如果您想要更具体的配置选项，请将其禁用并使用",
                    // "Dependabot rules": "Dependabot 规则",

                // 对话框
                "Disable Dependabot security updates": "禁用 Dependabot 安全更新",
                // [/You're about to disable Dependabot security updates on all repositories in ([^ ]+)./, "您即将禁用 $1 组织中的所有仓库上的 Dependabot 安全更新。"],

                "Enable Dependabot security updates": "启用 Dependabot 安全更新",
                // [/You're about to enable Dependabot security updates on all repositories in ([^ ]+). Dependabot security updates require the dependency graph and Dependabot alerts, so we'll also turn that on for all repositories./, "您即将启用 $1 组织中的所有仓库上的 Dependabot 安全更新。Dependabot 安全更新需要依赖关系图和 Dependabot 警报，因此我们还将为所有仓库打开它。"],

            "Code scanning": "代码扫描",
                "Identify vulnerabilities and errors with": "识别代码中的漏洞和错误，通过",
                ". Default CodeQL analysis will be set up on": "。默认的 CodeQL 分析将被设置为",
                "eligible": "符合条件的",
                "public repositories.": "公共仓库。",

                "Recommend the extended query suite for repositories enabling default setup": "建议为启用默认设置的仓库提供扩展查询套件",
                    "The extended query includes the default suite, plus lower severity and precision queries.": "扩展查询包括默认套件，以及较低严重性和精度的查询。",

            "Secret scanning": "机密扫描",
                "Receive alerts on GitHub for detected secrets, keys, or other tokens.": "在 GitHub 上接收有关检测到的秘密、密钥或其他令牌的警报。",

                "Push protection": "推送保护",
                    "Block commits that contain": "阻止提交，包含",
                    "supported secrets": "受支持的秘密",
                    "Automatically enable for repositories added to secret scanning": "自动启用对添加到机密扫描的仓库进行扫描",
                    "Add a resource link in the CLI and web UI when a commit is blocked": "当提交被阻止时，在 CLI 和 Web UI 中添加资源链接。",

                // 对话框
                "Disable secret scanning?": "禁用机密扫描？",
                "This will disable secret scanning on all repositories where it is enabled.": "这将禁用所有启用了机密扫描的仓库上的机密扫描。",
                "Disable secret scanning": "禁用机密扫描",
                "Enable secret scanning for eligible repositories?": "启用适用仓库的机密扫描？",
                "This will turn on secret scanning for all public repositories.": "这将为所有公共仓库启用机密扫描。",
                "Enable for eligible repositories": "启用符合条件的仓库",

            "Security managers": "安全管理员",
            "Grant a team permission to manage security alerts and settings across your organization. This team will also be granted read access to all repositories.": "授予团队管理整个组织的安全警报和设置的权限。该团队还将被授予对所有仓库的读取权限。",
            "Learn more about these security privileges": "了解更多关于这些安全特权的信息",
            "Search for teams": "搜索团队",

    },
    "regexp": [ // 正则翻译
        [/You're about to disable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中禁用私下漏洞报告。"],
        [/You're about to enable private vulnerability reporting on all public repositories in ([^ ]+)./, "您即将在 $1 的所有公共仓库中启用私下漏洞报告。"],
        [/You're about to disable dependency graph on all private repositories in ([^ ]+). This will also disable Dependabot alerts and Dependabot security updates on those repositories./, "您即将禁用 $1 组织中所有私有仓库上的依赖关系图。这也将禁用这些仓库的 Dependabot 警报和 Dependabot 安全更新。"],
        [/You're about to enable dependency graph on all private repositories in ([^ ]+)./, "您即将启用 $1 组织中的所有私有仓库上的依赖关系图。"],
        [/You're about to disable Dependabot alerts on all repositories in ([^ ]+). This will also disable Dependabot security updates on those repositories./, "您即将禁用 $1 组织中所有仓库上的 Dependabot 警报。这也将禁用这些仓库的 Dependabot 安全更新。"],
        [/You're about to enable Dependabot alerts on all repositories in ([^ ]+). Alerts require the dependency graph, so we'll also turn that on for all repositories./, "您即将启用 $1 组织中所有仓库上的 Dependabot 警报。Dependabot 警报需要依赖关系图，因此我们还将为所有仓库打开它。"],
        [/You're about to disable Dependabot security updates on all repositories in ([^ ]+)./, "您即将禁用 $1 组织中的所有仓库上的 Dependabot 安全更新。"],
        [/You're about to enable Dependabot security updates on all repositories in ([^ ]+). Dependabot security updates require the dependency graph and Dependabot alerts, so we'll also turn that on for all repositories./, "您即将启用 $1 组织中的所有仓库上的 Dependabot 安全更新。Dependabot 安全更新需要依赖关系图和 Dependabot 警报，因此我们还将为所有仓库打开它。"],
        [/(\d+) rules? enabled/, "$1 条规则启用"],
    ],
};

I18N.zh["orgs/settings/dependabot_rules"] = { // 组织设置 - Dependabot 规则
    "static": { // 静态翻译
        ...I18N.zh["repository-public"]["static"],
        ...I18N.zh["repository-settings-menu"]["static"],
        ...I18N.zh["orgs-settings-menu"]["static"],

        // Dependabot 规则 /organizations/<org-login>/settings/dependabot_rules
            // 顶部提醒
                "Rule created.": "规则已创建。", // 仓库规则
                "Rule saved. It may take a moment for this rule to be applied to matching alerts": "规则已保存。此规则可能需要一段时间才能应用于匹配的警报",
                "Rule saved.": "规则已保存。",
                "Rule was successfully deleted.": "规则已成功删除。",

            "/ Dependabot rules": "/ Dependabot 规则",
            "New rule": "新建规则",
            "GitHub presets": "GitHub 预设",
                "Managed by GitHub": "由 GitHub 管理",
                "Edit curated rule": "编辑策划规则",
                "Edit rule": "编辑规则",  // 仓库规则
                "Dismiss low-impact alerts for development-scoped dependencies": "解除开发范围下依赖关系的低影响警报",
                    "In a developer (non-production or runtime) environment, these alerts are unlikely to be unexploitable or have limited effect like slow builds or long-running tests.": "在开发人员（非生产或运行时）环境中，这些警报不可能不被利用或效果有限，例如缓慢的构建或长时间运行的测试。",
                    "Learn more about this methodology.": "了解更多关于此方式的信息。",
            "Repository rules": "仓库规则", // 仓库规则
            "Organization rules": "组织规则",
                // [/Managed by ([^ ]+)/, "由 $1 管理"],
                "Edit custom rule": "编辑自定义规则",

        // 新建规则 /organizations/<org-login>/settings/dependabot_rules/new
            // 顶部警告
                "The following inputs have errors:": "以下输入有错误：",

            "Dependabot rules": "Dependabot 规则",
            "/ New rule": "/ 新建规则",
            "Rule name": "规则名称",
                "Add a rule name": "添加规则名称",
            "State": "状态",
                "Rules will target all public repositories in this organization.": "规则将针对该组织中的所有公共仓库。",
                    "Enabled": "启用",
                        "Rule is enabled by default for all public repositories.": "默认情况下，规则对所有公共仓库启用。",
                    "Enforced": "强制",
                        "Rule is enabled for all public repositories and can never be disabled by individual repositories.": "规则对所有公共仓库启用，单个仓库永远无法禁用。",
                    "Disabled": "禁用",
                        "Rule can never be enabled on any repositories.": "规则永远不能在任何仓库中启用。",
            "Target alerts": "目标警告",
                "Add rule metadata": "添加规则元数据",
                    "Suggested filters": "建议的过滤器",
                        "severity:": "严重度：",
                            "critical, high, moderate, low": "严重、高、中、低",
                                "Severities": "严重度",
                                    "critical": "严重",
                                    "high": "高",
                                    "moderate": "中",
                                    "low": "低",
                        "package:": "软件包：",
                            "package-name": "软件包名称",
                        "ecosystem:": "生态系统：",
                            "ecosystem-name": "生态系统名称",
                        "scope:": "范围：",
                            "runtime, development": "运行时、开发",
                                "Scopes": "范围",
                                    "runtime": "运行时",
                                    "development": "开发",
                        "cwe:": "CWE：",
                            "cwe-number": "CWE 号码",
                "Rules will be applied for alerts matching all included metadata.": "规则将应用于与所有包含的元数据匹配的警报。",
            "Rules": "规则",
                "Select one or more rules to apply to matching alerts.": "选择一个或多个规则以应用于匹配的警报。",
                "Dismiss alerts": "忽略警报",
                    "Dependabot will automatically close or reopen alerts based on selected criteria.": "Dependabot 将根据选定的条件自动关闭或重新打开警报。",
                    "Until patch is available": "直到补丁可用为止",
                    "Indefinitely": "无限期",
                "Open a pull request to resolve alerts": "打开拉取请求以解决警报",
                    "Dependabot will attempt to open security updates based on selected criteria.": "Dependabot 将尝试根据选定的标准打开安全更新。",
            "Create rule": "创建规则",

        // 编辑规则 /organizations/<org-login>/settings/dependabot_rules/edit/<id>
            "/ Edit rule": "/ 编辑规则",
            "Save rule": "保存规则",

            "Danger Zone": "危险区",
                "Delete this rule": "删除规则",
                    "Deleting this rule can potentially reopen associated alerts.": "删除此规则可能会重新打开相关警报。",
                    "Delete rule": "删除规则",

                    "Are you sure you want to delete this rule?": "您确定要删除此规则吗？",
                        // [/This will permanently delete the rule \"(.*)\" and potentially reopen associated alerts./, "这将永久删除规则 “$1” 并可能重新打开相关警报。"],

        // 编辑默认规则 /organizations/<org-login>/settings/dependabot_rules/edit_default/1
            "/ GitHub Preset rule": "/ GitHub 预设规则",

    },
    "regexp": [ // 正则翻译
        [/Managed by ([^ ]+)/, "由 $1 管理"],
        [/This will permanently delete the rule \"(.*)\" and potentially reopen associated alerts./, "这将永久删除规则 “$1” 并可能重新打开相关警报。"],
    ],
};
I18N.zh["repository/settings/dependabot_rules"] = I18N.zh["orgs/settings/dependabot_rules"];

I18N.zh["orgs/settings/domains"] = { // 组织设置 - 经验证和批准的域名
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 经验证和批准的域名 /organizations/<org-login>/settings/domains
            "Verified & approved domains": "经验证和批准的域名",
            "Add a domain": "添加域名",
            "You can verify the domains controlled by your organization to confirm your organization's identity on GitHub. A": "您可以验证组织控制的域，以确认组织在 GitHub 上的身份。一个",
            "badge will be added to your organization's profile page if all of the domains displayed on your profile (e.g. public email or website URL) are verified. You may also approve a domain by first adding it to the list of eligible domains. Approved domains may be used for email notification routing to users with verified emails that do not belong to a domain that you can verify.": "的徽章，您的组织的资料页面上显示，则表明您的资料中显示的所有域名（例如公共电子邮箱地址或网站 URL）都经过验证。您也可以通过，首先将一个域名添加到合格的域名列表中来批准该域名。已批准的域名可用于通过电子邮件通知具有经过验证的邮箱地址的用户，这些电子邮箱地址不属于您可以验证的域名。",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/secrets"] = { // 组织设置 - 机密
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 操作机密 /organizations/<org-login>/settings/secrets/actions
            "Actions secrets and variables": "操作机密和变量",
            "New organization secret": "新建组织机密",
            "Secrets and variables allow you to manage reusable configuration data. Secrets are": "秘密和变量允许您管理可重复使用的配置数据。机密是",
            "encrypted": "被加密",
            "and are used for sensitive data.": "并用于敏感数据。",
            "Learn more about encrypted secrets": "了解更多关于加密机密的信息",
            ". Variables are shown as plain text and are used for": "。变量显示为纯文本，用于",
            "non-sensitive": "不敏感",
            "data.": "数据。",
            "Learn more about variables": "了解更多关于变量的信息",

            "Anyone with collaborator access to the repositories with access to a secret or variable can use it for Actions. They are not passed to workflows that are triggered by a pull request from a fork.": "任何具有协作者权限的人，只要能接触到机密或变量，都可以将其用于操作。它们不会被传递到由复刻的拉取请求触发的工作流中。",

            "Organization secrets and variables cannot be used by private repositories with your plan.": "私有仓库不能在您的计划中使用组织机密和变量。",
            "Please consider": "请考虑",
            "upgrading your plan": "升级您的计划",
            "if you require this functionality.": "如果您需要此功能。",

            "Secrets": "机密",
            "Variables": "变量",

            "There are no secrets for this organization.": "该组织尚无机密。",
            "Secrets created at the organization level can be shared with specified repositories.": "在组织层面创建的机密可以与指定的仓库共享。",

            "Available to": "适用于",
            "Updated": "更新于",
            "Remove": "移除",

            // 顶部提醒
                "Failed to add secret. Secret names can only contain alphanumeric characters ([a-z], [A-Z], [0-9]) or underscores (_). Spaces are not allowed. Must start with a letter ([a-z], [A-Z]) or underscores (_).": "添加机密失败。机密名称只能包含字母数字字符（[a-z]、[A-Z]、[0-9]）或下划线 (_)。不允许有空格。必须以字母 ([a-z], [A-Z]) 或下划线 (_) 开头。",
                "Secret added.": "机密已添加。",
                "Secret deleted.": "机密已删除。",

            // 删除机密对话框
            "Remove secret": "删除机密",
                "Are you sure you want to delete": "您确定要删除",
                "Yes, remove this secret from the organization": "是的，从组织中删除该机密",

        // 操作变量 /organizations/<org-login>/settings/variables/actions
            "New organization variable": "新建组织变量",

            "Organization variables": "组织变量",
            "There are no variables for this organization.": "此组织暂无变量。",
            "Variables created at the organization level can be shared with specified repositories.": "在组织层面创建的变量可以与指定的仓库共享。",

        // 新建组织变量 /organizations/<org-login>/settings/variables/actions/new
            "Actions variables": "操作变量",
            "/ New variable": "/ 新建变量",
            "Note: Variable values are exposed as plain text. If you need to encrypt and mask sensitive information,": "注意：变量值是以纯文本形式暴露的。如果您需要对敏感信息进行加密和屏蔽，请使用",
            "create a secret": "创建机密",
            "instead.": "代替。",

            "Alphanumeric characters ([a-z], [A-Z], [0-9]) or underscores (_) only.": "字母数字字符（[A-Z]，[A-Z]，[0-9]）或仅下划线（_）。",
            "Spaces are not allowed.": "不允许出现空格。",
            "Cannot start with a number.": "不能以数字开头。",
            "Cannot start with": "不能以",
            "prefix.": "前缀开头。",

            "Add variable": "添加变量",

        // 更新操作机密 /organizations/<org-login>/settings/secrets/actions/<name>
            "/ Update secret": "/ 更新机密",
            "Secret values are encrypted and cannot be displayed, but you can": "机密值已加密，无法显示，但您可以",
            "enter a new value.": "输入一个新值。",
            "Update secret": "更新机密",
                "Updating…": "更新中…",

        // 新建组织机密 /organizations/<org-login>/settings/secrets/actions/new
            "Actions secrets": "操作机密",
            "/ New secret": "/ 新建机密",
            "Add secret": "添加机密",
                "Adding…": "添加中…",

            "Name": "名称",
            "Value": "值",

            "Repository access": "仓库权限",
            "Public repositories": "公共仓库",
                "This secret may be used by public repositories in the organization. Paid GitHub plans include private repositories.": "此机密可能会被组织中的公共仓库使用。付费的 GitHub 计划包括私有仓库。",
            "Private repositories": "私有仓库",
                "Organization secrets cannot be used by private repositories with your plan.": "私有仓库不能在您的计划中使用组织机密。",
            "Selected repositories": "选定的仓库",
                "This secret may only be used by specifically selected repositories.": "此机密只能由特定仓库使用。",
                    // [/(\d+) selected repositor(y|ies)/, "$1 个选定的仓库"],
                // 机密仓库访问 对话框
                    "Secret repository access": "机密仓库访问",
                    "Select the organization repositories that may use this secret.": "选择可以使用该机密的组织仓库。",
                        "Filter repositories": "筛选仓库",
                        "selected repository": "个选定的仓库",
                        "selected repositories": "个选定的仓库",
                    "Update selection": "更新选择",

        // 代码空间机密 /<user-name>/<repo-name>/settings/secrets/codespaces
            "Codespaces secrets": "代码空间机密",
            "Secrets are environment variables that are": "机密是环境变量",
            ". Anyone with": "。任何对此仓库具有",
            "collaborator": "协作者",
            "access to the repositories with access to each secret can use it for Codespaces.": "访问权限的仓库的每个机密都可以用于代码空间。",

        // Dependabot 机密 /organizations/<org-login>/settings/secrets/dependabot
            "Dependabot secrets": "Dependabot 机密",
            "Secrets are credentials that are": "机密是凭证",
            // "access to this repository can use these secrets for Dependabot.": "访问权限的人可以将这些机密用于 Dependabot。",
            "access to the repositories with access to each secret can use it for Dependabot.": "访问权限的人都可以访问仓库的每个机密用于 Dependabot。",
            "Secrets are not passed to forks.": "机密不会传递给复刻。",

        // Dependabot 机密 /organizations/<org-login>/settings/secrets/dependabot/new
            "All repositories": "所有仓库",
            "This secret may be used by any repository in the organization.": "组织中的任何仓库都可以使用此机密。",
            "This secret may be used by any private repository in the organization.": "组织中的任何私有仓库都可以使用此机密。",

    },
    "regexp": [ // 正则翻译
        [/(\d+) selected repositor(y|ies)/, "$1 个选定的仓库"],
    ],
};
I18N.zh["orgs/settings/variables"] = I18N.zh["orgs/settings/secrets"];

I18N.zh["orgs/settings/oauth_application_policy"] = { // 组织设置 - 第三方访问
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 第三方访问 /organizations/<org-login>/settings/oauth_application_policy
            "Third-party application access policy": "第三方应用访问策略",
            "Policy:": "策略：",
                "Access restricted": "访问受限",
                    "Only approved applications can access data in this organization. Applications owned by": "只有获得批准的应用才能访问该组织中的数据。应用由",
                    "always have access.": "拥有的始终可以访问。",
                    "Remove restrictions": "解除限制",
                    // 解除限制对话框
                    "Are you sure?": "您确定吗？",
                    "You’re about to remove all third-party application restrictions. Please read this carefully.": "您即将删除所有第三方应用限制。请仔细阅读。",
                    "Removing third-party application restrictions will immediately give member authorized applications access to private data in the": "取消第三方应用限制，将立即允许成员授权的应用访问私人数据，在",
                    "Please be sure you want to do this.": "请确定您想这么做。",
                    "Yes, remove application restrictions": "是的，取消应用限制",
                "No restrictions": "未受限",
                    "All applications authorized by organization members have access to": "所有由组织成员授权的应用都可以访问",
                    "’s data.": "的数据。",
                    "Setup application access restrictions": "设置应用访问限制",

            "No pending requests": "没有待处理的请求",
            "As members request access for specific applications, those requests will be listed here for your approval. You can start by browsing": "当成员请求访问特定应用时，这些请求将在此处列出以供您批准。您可以浏览",
            "your own authorized applications": "您授权的应用",

            "When authorized, applications can act on behalf of organization members. Your access policy determines which applications can access data in your organization.": "获得授权后，应用可以代表组织成员进行操作。您的访问策略决定了哪些应用可以访问您组织中的数据。",
            "Read more about third-party access and organizations.": "阅读更多关于第三方访问和组织的信息。",

        // 设置应用访问限制 /settings/oauth_application_policy/confirm
            "Third-party application restrictions": "第三方应用限制",
            "create an extra layer of security that allows owners to better control how applications access data in their organization.": "创建一个额外的安全层，使所有者能够更好地控制应用如何访问其组织中的数据。",
            "Organization owners maintain a whitelist of trusted applications.": "组织所有者维护受信任应用白名单。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/installations"] = { // 组织设置 - GitHub 应用
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // GitHub 应用 /organizations/<org-login>/settings/installations
            "Installed GitHub Apps": "安装的 GitHub 应用",
            "GitHub Apps augment and extend your workflows on GitHub with commercial, open source, and homegrown tools.": "GitHub 应用通过商业、开源和自主开发的工具来增强和扩展您在 GitHub 上的工作流程。",

            "Pending GitHub Apps installation requests": "待处理的 GitHub 应用安装请求",
            "Members in your organization can request that GitHub Apps be installed. Pending requests are listed below.": "您组织中的成员可以申请安装 GitHub 应用。待处理的请求列在下面。",

            "No installed applications": "未安装任何应用",
            "You have no applications installed on this account.": "该账户未安装任何应用。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/personal-access-token"] = { // 组织设置 - 个人访问令牌
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 个人访问令牌 /organizations/<org-login>/settings/personal-access-tokens-onboarding
            "Restrict access via fine-grained personal access tokens": "通过精细化的个人访问令牌限制访问。",
                "By default, fine-grained personal access tokens cannot access content owned by your organization via the Public API or Git. This includes both public and private resources such as repositories.": "默认情况下，精细化的个人访问令牌不能通过公共 API 或 Git 访问您组织拥有的内容。这包括公共和私人资源，如仓库。",
                "Allow access via fine-grained personal access tokens": "允许通过细化的个人访问令牌进行访问",
                    "API and Git access will be allowed using approved organization member's fine-grained personal access tokens": "API 和 Git 访问将被允许使用经批准的组织成员的精细化个人访问令牌",
                "Restrict access via fine-grained personal access tokens": "通过精细化的个人访问令牌限制访问。",
                    "Organization members will not be allowed to access your organization using a fine-grained personal access token": "不允许组织成员使用精细化的个人访问令牌访问您的组织",
            "Continue": "继续",

            "Require approval of fine-grained personal access tokens": "要求批准精细化的个人访问令牌",
                "Access requests by organization members can be subject to review by administrator before approval.": "组织成员的访问请求在批准之前可能需要经过管理员审查。",
                "Require administrator approval": "需要管理员批准",
                    "All access requests by organization members to this organization must be approved before the token is usable.": "组织成员对该组织的所有访问请求都必须在令牌可用之前得到批准。",
                "Do not require administrator approval": "不需要管理员批准",
                    "Tokens requested for this organization will work immediately, and organization members are not required to provide a justification when creating the token.": "为该组织申请的令牌将立即生效，并且组织成员在创建令牌时无需提供理由。",
            "Restrict access via personal access tokens (classic)": "通过个人访问令牌限制访问（经典）",
                "By default, personal access tokens (classic) can access content owned by your organization via the GitHub API or Git over HTTPS. This includes both public and private resources such as repositories.": "默认情况下，个人访问令牌（经典）可以通过 GitHub API 或基于 HTTPS 的 Git 访问您组织拥有的内容。这包括公共和私有资源，例如仓库。",
                "Allow access via personal access tokens (classic)": "允许通过个人访问令牌进行访问（经典）",
                    "API and Git access will be allowed using an organization member's personal access token (classic)": "允许组织成员使用个人访问令牌（经典）访问 API 和 Git。",
                "Restrict access via personal access tokens (classic)": "通过个人访问令牌限制访问（经典）",
                    "Organization members will not be allowed to access your organization using a personal access token (classic)": "不允许组织成员使用个人访问令牌（经典）访问您的组织",

                "Enroll your organization": "注册您的组织",
                    "You've selected the following options. If these don't look correct, you can go back through your previous choices before enrolling. These options can be configured at any time on the settings page.": "您已选择以下选项。如果这些看起来不正确，您可以在注册之前返回之前的选择。这些选项可以随时在设置页面上进行配置。",
                "Enroll": "注册",
                "Done": "完成",
                    "Your organization has been configured": "您的组织已配置",
                    "Click \"Continue\" to move on.": "点击 “继续”，继续。",

                "Fine-grained personal access tokens": "精细化的个人访问令牌",
                "Personal access token (classic)": "个人访问令牌（经典）",

                "Are you sure you want to update your selection?": "您确定要更新您的选择吗？",
                // 顶部提醒
                    "Personal access tokens are now able to access your organization.": "个人访问令牌能够访问您的组织。",
                    "Personal access tokens are no longer able to access your organization.": "个人访问令牌不再能够访问您的组织。",
                    "All organization fine-grained personal access token requests are now subject to administrator review.": "所有组织精细化的个人访问令牌请求现在都要经过管理员的审查。",
                    "All fine-grained personal access tokens requested for this organization will work immediately": "为该组织申请的所有精细化的个人访问令牌将立即生效。",
                    "Personal access tokens (classic) are now able to access your organization.": "个人访问令牌（经典）现在能够访问您的组织。",
                    "Personal access tokens (classic) are no longer able to access your organization.": "个人访问令牌（经典）不再能够访问您的组织。",

        // 活跃的令牌  /organizations/<org-login>/settings/personal-access-tokens/active
            "Filter active fine-grained tokens": "筛选活跃的精细化令牌",
            "Tokens": "令牌",
            "Owner": "所有者",
                "Filter by owner": "按所有者筛选",
                "Filter users": "筛选用户",

            // "Repository": "仓库",
                "Filter by repository": "按仓库筛选",
                "Filter repositories": "筛选仓库",

            "Permissions": "权限",
                "Filter by permission": "按权限筛选",
                "Filter permissions": "筛选权限",
                    "read": "只读",
                    "write": "可写",
                    "Administration": "管理员",
                    "Code scanning alerts": "代码扫描警报",
                    "Codespaces lifecycle admin": "代码空间生命周期管理员",
                    "Codespaces metadata": "代码空间元数据",
                    "Codespaces secrets": "代码空间秘密",
                    "Commit statuses": "提交状态",
                    "Contents": "内容",
                    "Dependabot alerts": "Dependabot 警报",
                    "Dependabot secrets": "Dependabot 机密",
                    "Deployments": "部署",
                    "Environments": "环境",
                    "Merge queues": "合并列队",
                    "Metadata": "元数据",
                    "Repository announcement banners": "仓库公告横幅",
                    "Repository security advisories": "仓库安全公告",
                    "Secret scanning alerts": "机密扫描警报",
                    "Secrets": "机密",
                    "Variables": "变量",
                    "Workflows": "工作流程",
                    "Organization": "组织",
                        "Blocking users": "拉黑用户",
                        "Custom repository roles": "自定义仓库角色",
                        "Events": "活动",
                        "GitHub Copilot for Business": "GitHub Copilot 商业版",
                        "Members": "成员",
                        "Organization announcement banners": "组织公告横幅",
                        "Organization codespaces": "组织代码空间",
                        "Organization codespaces secrets": "组织代码空间机密",
                        "Organization codespaces settings": "组织代码空间设置",
                        "Organization dependabot secrets": "组织 Dependabot 机密",
                        "Plan": "计划",
                        "Self-hosted runners": "自托管运行器",

            "There aren't any fine-grained tokens for this organization": "该组织尚无任何精细化令牌",

        // 精细化的个人访问令牌请求  /organizations/<org-login>/settings/personal-access-token-requests
            "Fine-grained personal access token requests": "精细化的个人访问令牌请求",
            "Filter fine-grained personal access tokens requests": "筛选精细化的个人访问令牌请求",

            "Requests": "请求",

            "There aren't any personal access token requests for this organization": "该组织尚无任何个人访问令牌的请求",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/reminders"] = { // 组织设置 - 定时提醒
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 定时提醒 /organizations/<org-login>/settings/reminders
            "No scheduled reminders created.": "未创建预定提醒。",
            "To keep projects moving, you can now remind your teams about pull requests they need to review.": "为了保持项目进展，您现在可以提醒您的团队关于他们需要审查的拉取请求。",

            "Connect a Slack workspace to get started": "连接 Slack 工作区以开始使用",
            // 对话框
            "Add Slack workspace": "添加 Slack 工作区",
            "We have rolled out a new version of the GitHub app in Slack. If you are currently on the old app, please consider switching over to the new app! More info about migration can be found": "我们已经在 Slack 中推出了新版本的 GitHub 应用。如果您目前使用的是旧版应用，请考虑切换到新版应用！更多关于迁移的信息可以点击",
            "here.": "这里。",
            "1. Clicking on 'Add' will configure your Slack workspace with the new GitHub app.": "1. 点击 “添加” 将用新的 GitHub 应用配置您的 Slack 工作区。",
            "2. If you already have the old app in Slack, it will uninstall the legacy app and install the new one.": "2. 如果您在 Slack 中已有旧应用，它将卸载旧应用并安装新应用。",
            "Add workspace": "添加工作区",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/sponsors-log"] = { // 组织设置 - 赞助日志
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // Sponsorship log 赞助日志 /organizations/<org-login>/settings/sponsors-log
            "Sponsors log": "赞助日志",
            "New sponsorships, changes, and cancellations": "新的赞助、更改和取消",
            "Period:": "周期：",
                "Filter activity": "筛选活动",
                "All-time": "所有时间",
                "Past Day": "过去一天",
                "Past Week": "过去一周",
                "Past Month": "过去一月",
                "Past Year": "过去一年",
            "No sponsorship activity in this time period": "这段时间没有赞助活动",
            // "This is where you can review activity from your sponsorships.": "您可以在此处查看您的赞助活动。",
            // [/This is where you can review activity from ([^ ]+)'s sponsorships./ "在这里您可以查看 $1 赞助的活动。"],
    },
    "regexp": [ // 正则翻译
        [/This is where you can review activity from ([^ ]+)'s sponsorships./,  "在这里您可以查看 $1 赞助的活动。"],
    ],
};

I18N.zh["orgs/settings/audit-log"] = { // 组织设置 - 审计日志
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // Audit log 审计日志 /organizations/<org-login>/settings/audit-log
            "Events": "活动",
            "Loading audit log entries…": "正在加载日志条目…",
            "Filters": "筛选",
                "Filter audit logs": "筛选审计日志",
                "Yesterday's activity": "昨日的活动",
                "Organization membership": "组织成员",
                "Team management": "团队管理",
                "Repository management": "仓库管理",
                "Billing updates": "帐单更新",
                "Hook activity": "挂钩活动",
                "Personal access token activity": "个人访问令牌活动",
                "View advanced search syntax": "查看高级搜索语法",
            "Search audit logs": "搜索审计日志",
            "Export Git Events": "导出 Git 事件",
                "Export Git events": "导出 Git 事件",
                "Export file will be limited to 100 Mb.": "导出文件将限制为 100 Mb。",
                "Select events from:": "选择事件，从：",
                "To:": "到：",
                "Download Results": "下载结果",
            "Export": "导出",
                "Exporting": "导出中",
            "Recent events": "最近的事件",

            "Clear current search query": "清除当前搜索查询",
            // [/Found (\d+) events?/, "找到 $1 个事件"],
            "We couldn’t find any events matching your search.": "我们未找到与您的搜索相匹配的活动。",

            "Newer": "新的",
            "Older": "旧的",

        // 源IP泄露 /organizations/<org-login>/audit-log/event_settings
            "Disclose actor IP addresses in audit logs": "在审计日志中披露行为人 IP 地址",
            "Enable source IP disclosure": "启用源 IP 泄露",
            "Enabling will allow you to view IP addresses of current members for organization audit log events. As this feature makes your users' IP addresses automatically available, you should review this change with your legal team to determine whether any user notification is required. When enabled at the enterprise level it will be automatically enabled for all organizations owned by the enterprise, the reverse is not true.": "启用此功能将允许您查看组织审计日志事件中当前成员的 IP 地址。由于此功能会自动公开用户的 IP 地址，因此您应该与法律团队一起审核此更改，以确定是否需要任何用户通知。当在企业级别启用时，它将自动为企业拥有的所有组织启用，反之则不然。",
    },
    "regexp": [ // 正则翻译
        [/Found (\d+) events?/, "找到 $1 个事件"],
    ],
};
I18N.zh["orgs/audit-log/event_settings"] = I18N.zh["orgs/settings/audit-log"];

I18N.zh["orgs/settings/deleted_repositories"] = { // 组织设置 - 删除的仓库
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 删除的仓库 /organizations/<org-login>/settings/deleted_repositories
            "Deleted Repositories": "删除的仓库",
            // [/No recoverable repositories were found for ([^ ]+)./, "没有发现 $1 中可恢复仓库"],
            "It may take up to an hour for repositories to be displayed here. You can only restore repositories that are not forks, or have not been forked.": "仓库可能需要一个小时的时间才能显示在这里。您只能恢复没有复刻，或没有被复刻的仓库。",
            "Learn more about restoring deleted repositories": "了解更多关于恢复已删除仓库的信息",
    },
    "regexp": [ // 正则翻译
        [/No recoverable repositories were found for ([^ ]+)./, "没有发现 $1 中可恢复仓库"],
    ],
};

I18N.zh["orgs/settings/applications"] = { // 组织设置 - OAuth 应用
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // OAuth 应用 /organizations/<org-login>/settings/applications
            "No Organization Owned Applications": "没有组织拥有的应用",
            "Do you want to develop an application that uses the": "您想开发一个应用，使用",
            "? Register an application to generate OAuth tokens.": "？注册应用以生成 OAuth 令牌。",
            "Register an application": "注册应用",
    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/apps"] = { // 组织设置 - GitHub 应用
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // GitHub 应用 /organizations/<org-login>/settings/apps
            "New GitHub App": "新 GitHub 应用",
            "Want to build something that integrates with and extends GitHub?": "想要构建与 GitHub 集成和扩展的东西吗？",
            "Register a new GitHub App": "注册新的 GitHub 应用",
            "to get started developing on the GitHub API. You can also read more about building GitHub Apps in our": "，开始在 GitHub API 上进行开发。您还可以在我们的文档中阅读有关构建 GitHub 应用的更多信息",
            "developer documentation": "开发者文档",

            "Management": "管理人员",
            "Choose members that are allowed to manage all GitHub Apps belonging to this organization.": "选择允许管理属于该组织的所有 GitHub 应用的成员。",
            "Organization owner": "组织所有者",
            "Search by username or full name": "按用户名或全名搜索",
            "Grant": "授予",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["orgs/settings/publisher"] = { // 组织设置 - GitHub 发布者验证
    "static": { // 静态翻译
        ...I18N.zh["orgs-settings-menu"]["static"],

        // 发布者验证 /organizations/<org-login>/settings/publisher
            "There must be 1 or more GitHub/OAuth App registered by the organization to request publisher verification": "组织必须有 1 个或多个 GitHub/OAuth 应用才能请求发布者验证",
            "You can request publisher verification for your organization. A": "您可以为您的组织请求发布者验证。一个",
            "badge will be added to your apps published in the marketplace, recognizing that apps and other published materials were created by you.": "徽章将添加到您在市场上发布的应用中，以识别应用和其他已发布材料是由您创建的。",
            "Learn more about publisher verification.": "了解更多关于发布者验证的信息。",

    },
    "regexp": [ // 正则翻译
    ],
};

I18N.zh["projects"] = { // 项目页面(含仓库项目)
    "static": { // 静态翻译
        // >>>>>>>>>>>>>>>>>>仓库 公共部分<<<<<<<<<<<<<<<<<<<<<<<<<<<
            // 头部条
            "Public": "公共",
            "Private": "私有",
            "Public archive": "公共存档",
            "Private archive": "私有存档",

            "forked from": "复刻自",

            "Unpin": "取消置顶",
            "Ignoring": "忽略",
            "Stop ignoring": "取消忽略",
            "Watch": "关注",
            "Unwatch": "取消关注",

            "Star": "星标",
            "Unstar": "已加星标",
            "Fork": "复刻",
            "Unfork": "取消复刻",

            // 赞助对话框
            "External links": "外部链接",
            "Learn more about funding links in repositories": "了解更多关于仓库中的赞助链接的信息",
            "Report abuse": "举报滥用",

            // 关注 & 订阅通知设置 下拉菜单
            "Notifications": "通知类型",
            "Participating and @mentions": "参与和 @您",
            "Only receive notifications from this repository when participating or @mentioned.": "仅在参与或 @您时接收来自此仓库的通知。",
            "All Activity": "所有活动",
            "Notified of all notifications on this repository.": "接收来自此仓库所有通知。",
            "Ignore": "忽略",
            "Never be notified.": "永不接收通知。",
            "Custom": "自定义",
            "Select events you want to be notified of in addition to participating and @mentions.": "选择除参与和 @您之外还要接收通知的事件。",
            "Discussions are not enabled for this repo": "此仓库未启用讨论功能",
            // "Releases": "发行版",
            // "Discussions": "讨论",
            "Security alerts": "安全警报",
            //"Cancel": "取消",
            "Apply": "应用",

            // 复刻下拉
            "Existing forks": "现有的复刻",
            "You don't have any forks of this repository.": "您没有此仓库的任何复刻。",
            "Create a new fork": "创建复刻",

           //
            "Add to list": "添加到清单",
            "Lists": "清单",
            "You don't have any lists yet.": "您尚无任何清单。",
            "Create list": "创建清单",
                "Create a list to organize your starred repositories.": "创建一个清单来组织您的星标仓库。",
                "⭐️ Name this list": "⭐️ 清单名称",
                "Write a description": "简单描述",
                "Lists are currently in beta.": "清单目前处于测试阶段。",
                "Share feedback and report bugs.": "分享反馈意见和报告错误。",
                "Creating...": "创建中...",

            // 标签栏
            "Code": "代码",
            "Pull requests": "拉取请求",
            "Discussions": "讨论",
            "Actions": "操作",
            "Projects": "项目",
            "Security": "安全",
            "Insights": "洞察",
            "Settings": "设置",

            // 键盘快捷键
                "Open in codespace"  : "在代码空间中打开",
                "Open in github.dev editor"  : "在 github.dev 编辑器中打开",
                "Open github.dev editor in a new tab"  : "在新标签页中打开 github.dev 编辑器",
                "Open cs.github.com in a new tab": "在新标签页中打开 cs.github.com",
                "Focus secondary search bar" : "聚焦二级搜索栏",
                "Go to Code"                 : "跳转到代码",
                "Go to Issues"               : "跳转到议题",
                "Go to Pull Requests"        : "跳转到拉取请求",
                "Go to Actions"              : "跳转到操作",
                "Go to Projects"             : "跳转到项目",
                "Go to Wiki"                 : "跳转到 Wiki",
                "Go to Discussions"          : "跳转到讨论",

        // 公共词 简版 议题&拉取请求信息
            "opened by": "打开者",
            "Opened in": "打开在",
            "commented": "评论于",
            "Show less": "显示更少",
            "Show more": "显示更多",
            "Assignees": "受理人",
                "No one assigned": "无人受理",
            "Labels": "标签",
            "Milestone": "里程碑",
                "No milestone": "尚无里程碑",
            "Linked pull requests": "关联的拉取请求",
                "Successfully merging a pull request may close this issue.": "成功合并一个拉取请求可能会关闭此议题。",
            "None yet": "暂无",
            "Go to issue for full details": "跳转到议题以获取完整详细信息",

            "Loading details…": "载入细节…",

        // 新建项目 https://github.com/new/project
          //同 仓库 新建项目页面  /<user-name>/<repo-name>/projects/new
            "Create a new classic project": "创建经典项目",
            "Coordinate, track, and update your work in one place, so projects stay transparent and on schedule.": "在这里协调、跟踪和更新您的工作，使项目保持透明，并按计划进行。",
            "Project board name": "项目板名称",
            "Description": "描述",
            "(optional)": "(可选)",
            "Project template": "项目模板",
            "Save yourself time with a pre-configured project board template.": "使用预先配置的项目板模板可为您节省时间。",
            "Template:": "模板：",
                "Templates": "模板",
                "None": "无",
                    "Start from scratch with a completely blank project board. You can add columns and configure automation settings yourself.": "从一个完全空白的项目板开始。您可以自己添加栏目并配置自动化设置。",
                "Basic kanban": "基础看板",
                    "Basic kanban-style board with columns for To do, In progress and Done.": "基础风格看板，带有待办、进行中和已完成等栏目。",
                "Automated kanban": "自动化看板",
                    "Kanban-style board with built-in triggers to automatically move issues and pull requests across To do, In progress and Done columns.": "带有内置触发器的风格看板，可以自动将议题和拉取请求移到待办、进行中和已完成栏目中。",
                "Automated kanban with reviews": "带审查的自动看板",
                    "Everything included in the Automated kanban template with additional triggers for pull request reviews.": "除了包含自动化看板模板中的所有内容，还有拉取请求审查的额外触发器。",
                "Bug triage": "BUG 分类",
                    "Triage and prioritize bugs with columns for To do, High priority, Low priority, and Closed.": "使用待办事项、高优先级、低优先级和已关闭的栏目对错误进行分类和优先级排序。",
            "Visibility": "可见性",
                "Public": "公共",
                    "Anyone on the internet can see this project. You choose who can make changes.": "互联网上的任何人都可以看到这个项目。您选择谁可以进行更改。",
                "Private": "私有",
                    "You choose who can see and make changes to this project.": "您可以选择谁可以查看此项目并对其进行更改。",
            "Linked repositories": "关联的仓库",
                "Search": "搜索",
                "to link repositories to this project for more accurate suggestions and better search results.": "将仓库关联到此项目，以获得更准确的建议和更好的搜索结果。",
                "Search by repository name": "搜索仓库名",
                "You've reached the limit of 25 linked repositories.": "您已经达到了 25 个关联仓库的上限。",
                "Linked repositories:": "关联的仓库",
                "None yet!": "啥也木有！",
            "Create project": "创建项目",

        // 仓库 项目页面  /<user-name>/<repo-name>/projects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            "Welcome to the all-new projects": "欢迎访问全新的项目",
            "Built like a spreadsheet, project tables give you a live canvas to filter, sort, and group issues and pull requests. Tailor them to your needs with custom fields and saved views.": "构建像电子表格一样的项目表，给您一个实时的画布来对议题和拉取请求进行筛选、排序和分组。通过自定义字段和保存的视图，使它们符合您的需要。",

            "This repository doesn't have any projects yet": "该仓库目前没有任何项目",
            "Create a project": "创建一个项目",

            "Organize your issues with project boards": "使用项目板组织您的议题",
            "Did you know you can manage projects in the same place you keep your code? Set up a project board on GitHub to streamline and automate your workflow.": "您知道您可以在保存代码的同一个地方管理项目吗？在 GitHub 上设置项目板以简化和自动化您的工作流程。",

            "Sort tasks": "排序任务",
            "Add issues and pull requests to your board and prioritize them alongside note cards containing ideas or task lists.": "将议题和拉取请求添加到您的看板中，并将它们与包含想法或任务清单的笔记卡一起进行优先排序。",
            "Plan your project": "规划项目",
            "Sort tasks into columns by status. You can label columns with status indicators like \"To Do\", \"In Progress\", and \"Done\".": "将任务按状态分类成列。您可以用 “待办”、“进行中” 和 “已完成” 等状态指标给各栏贴上标签。",
            "Automate your workflow": "自动化工作流程",
            "Set up triggering events to save time on project management—we’ll move tasks into the right columns for you.": "设置触发事件，以节省项目管理的时间——我们将为您把任务移到正确的栏目中。",
            "Track progress": "追踪进度",
            "Keep track of everything happening in your project and see exactly what’s changed since the last time you looked.": "追踪项目中发生的一切，并准确查看自上次查看以来发生的变化。",
            "Share status": "共享状态",
            "Each card has a unique URL, making it easy to share and discuss individual tasks with your team.": "每张卡片都有一个唯一的 URL，可以轻松地与您的团队共享和讨论个人任务。",
            "Wrap up": "结束工作",
            "After you wrap up your work, close your project board to remove it from your active projects list. On to the next project!": "结束工作后，关闭项目板，并从活动项目列表中删除。进入下一个项目！",

            "Try the": "尝试",
            "new projects today.": "新版项目。",
            "Repository access coming soon ✨": "仓库访问即将推出 ✨",

            "Sort": "排序",
            "Sort by": "排序方式",
                // 排序下拉菜单
                "Newest": "最新",
                "Oldest": "最早",
                "Recently updated": "近期更新内容",
                "Least recently updated": "最近最少更新",
                "Name": "名称",
            // 清除筛选
            "Clear current search query, filters, and sorts": "清除当前的搜索查询、筛选器和排序方式",

            "No description": "无描述",
            "Close": "关闭",
            "Closed": "已关闭",
            "Reopen": "重新打开",

            // 顶部提醒
            "Project closed.": "项目已关闭。",
            "Project reopened.": "项目已重新打开。",

        // https://github.com/users/<user-name>/projects/<id>
            // 键盘快捷键
                "Project card shortcuts": "项目卡快捷键",
                    "Open the issue or pull request associated with the focused card in the sidebar": "聚焦卡片的侧边栏中打开相关联的议题或拉取请求",
                "Moving a card": "移动卡片",
                    "Start moving the focused card": "开始移动聚焦卡片",
                    "Cancel the move in progress": "取消正在进行的移动",
                    "Complete the move in progress": "完成正在进行的移动",
                    "Move card down": "向下移动卡片",
                    "Move card to the bottom of the column": "移动到项目栏底部",
                    "Move card up": "向上移动卡片",
                    "Move card to the top of the column": "移动到项目栏顶部",
                    "Move card to the bottom of the column on the left": "移动到左侧项目栏底部",
                    "Move card to the top of the column on the left": "移动到左侧项目栏顶部",
                    "Move card to the bottom of the leftmost column": "移动到最左侧项目栏底部",
                    "Move card to the top of the leftmost column": "移动到最左侧项目栏顶部",
                    "Move card to the bottom of the column on the right": "移动到右侧项目栏底部",
                    "Move card to the top of the column on the right": "移动到右侧项目栏顶部",
                    "Move card to the bottom of the rightmost column": "移动到最右侧项目栏底部",
                    "Move card to the top of the rightmost column": "移动到最右侧项目栏顶部",
                "Moving a column": "移动栏目",
                    "Start moving the focused column": "开始移动聚焦栏目",
                    "Move column to the left": "将栏目移到左侧",
                    "Move column to the leftmost position": "将栏目移到最左侧",
                    "Move column to the right": "将栏目移到右侧",
                    "Move column to the rightmost position": "将栏目移到最右侧",
            // 顶部提醒
            "Project created from Basic kanban template.": "已从基础看板模板创建项目。",

            "Updated": "更新于",
            "Filter cards": "筛选卡片",
                "Narrow your search": "缩小搜索范围",
            // 工具栏
            "Add cards": "添加卡片",
                "You can use the filters available in": "您可使用的筛选器在",
                "issue search": "议题搜索",
                "Loading search results…": "载入搜索结果…",
                "Search results": "搜索结果",
                "More": "更多",
                "Loading more...": "载入更多...",
            "Fullscreen": "全屏",
            "Exit fullscreen": "退出全屏",
            "Menu": "菜单",
                "This project doesn’t have a description.": "该项目没有描述。",
                "Add description": "添加描述",
                "Close project": "关闭项目",
                    "Are you sure you want to close": "您确定要关闭",
                "Activity": "活动",
                // ... 展开
                "Copy": "复制",
                "Loading activity": "载入活动",
                "View archive": "查看活动",
                "Showing all activity": "显示所有活动",
            // 活动 状态词
                "added": "添加了",
                "created the project": "创建了项目",
                "updated the project": "更新了项目",
                "created the column": "创建了栏目",
                "To do.": "待办。",
                "Done.": "已完成。",
                "In progress.": "进行中。",
                "archived": "存档了",
                "restored": "恢复了",
                "moved": "移动了",
                "from": "来自",
                "From": "来自",

            // 编辑对话框
                "Edit project": "编辑项目",
                "Name": "名称",
                "Description": "描述",
                "Track project progress": "跟踪项目进度",
                    "A progress bar will be displayed to help you visualize the overall progress of your project based on your automated To Do, In Progress, and Done columns.": "将显示一个进度条，以帮助您根据您的自动化的待办、进行中和已完成栏目，直观地了解项目的总体进展。",
                "Save project": "保存项目",
                // [/Delete/, "删除"],
                "Once you delete a project, there is no going back. Please be certain.": "删除项目后，将无法撤回。请确认。",
                "Delete project": "删除项目",

            // 复制项目
                "Copy project board": "复制项目板",
                "Your copy of this project includes column names and positions. Cards will not be copied.": "此项目的副本包括栏目名称和位置。卡片不会被复制。",
                "Owner": "所有者",
                    "Choose an owner": "选择所有者",
                    "Search organizations and repositories": "搜索组织和仓库",
                    "Suggested": "建议",
                    "Everything else": "其他一切",
                "Project board name": "项目板名称",
                "Copy project": "复制项目",

            // 存档的卡片
                "Archived cards": "存档的卡片",
                "Loading archived cards…": "载入存档的卡片…",
                "Show all archived cards": "显示所有存档卡片",
                "Filter by note or issue title": "按注释或提议标题筛选",
                "Column:": "栏目：",
                    "All": "所有",
                "Restore": "恢复",
                "No archived cards": "无存档卡片",
                "You haven't archived any cards yet.": "您尚未归档任何卡片。",

            "This project doesn’t have any columns or cards.": "该项目没有任何栏目或卡片。",

            "Add a column": "添加栏目",
            "Add column": "添加栏目",
                "Column name": "栏目名称",
                "Enter a column name (To Do, In Progress, Done)": "输入栏目名称（待办、进行中、已完成）",
                "Automation": "自动化",
                "Choose a preset to enable progress tracking, automation, and better context sharing across your project.": "选择一个预设，以便在您的项目中实现进度跟踪、自动化和更好的内容共享。",
                "Loading…": "载入中…",
                "Preset:": "预设：",
                    "Select type": "选择类型",
                    "None": "无",
                        "This column will not be automated": "本栏目将不会自动化",
                    "To do": "待办",
                        "Planned but not started": "已计划但未开始",
                        "Move issues here when…": "当…时，将议题移至此处",
                            "Newly added": "新添加的",
                                "Issues will automatically move here when added to this project.": "添加到此项目时，议题将自动移至此处。",
                            "Reopened": "重新打开",
                                "If a closed issue in this project reopens, it will automatically move here.": "如果此项目中已关闭的议题重新打开，它将自动移至此处。",
                        "Move pull requests here when…": "当…时，将拉取请求移到此处",
                            "Pull requests will automatically move here when added to this project.": "添加到此项目时，拉取请求将自动移至此处。",
                            "If a closed pull request in this project reopens, it will automatically move here.": "如果此项目中已关闭的拉取请求重新打开，它将自动移至此处。",
                    "In progress": "进行中",
                        "Actively being worked on": "正在积极开展工作",
                        "Approved by reviewer": "由审阅者批准",
                        "Pull requests in this project will automatically move here when they meet the minimum number of required approving reviews. Recommended when another column has the": "当该项目中的拉取请求达到所需的最低批准审查数量时，将自动移至此处。当另一栏启用了 “",
                        "automation enabled.": "” 的自动化功能时推荐使用。",
                        "Pending approval by reviewer": "由审阅者待批准",
                        "Pull requests in this project will automatically move here when a reviewer requests changes, or it no longer meets the minimum number of required approving reviews. Recommended when another column has the": "当审阅者请求更改或不再满足所需的最小批准审查数时，此项目中的拉取请求将自动移至此处。当另一栏目启用了 “",
                    "Done": "已完成",
                        "Items are complete": "项目已完成",
                        "Closed": "已关闭",
                            "If an open issue in this project is closed, it will automatically move here.": "如果该项目中的一个打开的议题被关闭，它将自动转移到这里。",
                        "Merged": "已合并",
                            "If an open pull request in this project is merged, it will automatically move here.": "如果该项目中的一个打开的拉取请求被合并，它将自动转移到这里。",
                        "Closed with unmerged commits": "已关闭的未合并的提交",
                            "If an open pull request in this project is closed with unmerged commits, it will automatically move here.": "如果该项目中的一个打开的拉取请求因未合并提交而关闭，它将自动移到这里。",
                "Create column": "创建栏目",

            "Edit column": "编辑栏目",
            "Manage automation": "管理自动化",
            "Archive all cards": "存档所有卡片",
                "Archiving cards...": "存档卡片...",
            "Copy column link": "复制栏目链接",
            "Delete column": "删除栏目",

            // "Manage automation for To do": "管理待办的自动化",
            // "Manage automation for In progress": "管理进行中的自动化",
            // "Manage automation for Done": "管理已完成的自动化",
            "Update automation": "更新自动化设置",

            "Add a note to this column": "向此栏目添加注释",
            "Enter a note": "输入注释",
            "Add": "添加",

            // "Edit To do": "编辑 “待办”",
            // "Edit In progress": "编辑 “进行中”",
            // "Edit Done": "编辑 “已完成”",
            "Update column": "更新栏目",

            "Cards": "卡片",
            "Automation": "自动化",

            // "Archive all cards in To do": "存档所有 “待办” 卡片",
            // "Archive all cards in In progress": "存档所有 “进行中” 卡片",
            // "Archive all cards in Done": "存档所有 “已完成” 卡片",
            "Are you sure you want to archive all cards in the": "您确定要将存档所有卡片",
            "column? You will not be able to undo this action.": "栏目？您将无法撤消此操作。",

            // "Delete To do": "删除 “待办” ",
            // "Delete In progress": "删除 “进行中” ",
            // "Delete Done": "删除 “已完成” ",
            "This action will remove any cards and automation preset associated with the column.": "此操作将删除与该列关联的所有卡片和自动化预设。",

            "Copy card link": "复制卡片链接",
            "Convert to issue": "转换为议题",
                "Convert note to issue":"转换注释为议题",
                "Repository":"仓库",
                    "Choose a repository for this issue":"为这个议题选择一个仓库",
                    "Find a repository":"查找仓库",
                    "Title":"标题",
                    "Body":"内容",
            "Edit note": "编辑注释",
                "Note": "注释",
                "Save note": "保存注释",
            "Archive": "存档",
            "Delete note": "删除注释",
                "This will remove this note from the project": "这将从项目中删除该注释",

        // 自动化看板模板项目 https://github.com/users/<user-name>/projects/<id>?add_cards_query=is%3Aopen
            // 顶部提醒
            "Project created from Automated kanban template.": "已从自动化看板模板创建项目。",

            "Automated as": "自动化为",
            "Manage": "管理",

            // 管理自动化 补充
            "The": " ",
            "column is already using this rule.": "栏目已在使用此规则。",

            // 复制项目板 补充
            "Your copy of this project includes column names, positions, and automation settings. Cards will not be copied.": "此项目的副本包括栏目名称、位置和自动化设置。卡片不会被复制。",
            "Automation settings": "自动化设置",
            "Copy automation settings.": "复制自动化设置。",
            "Includes automation settings for": "包括自动化设置，关于",
            "To do, In progress, and Done": "待办、进行中和已完成",


            "Pull Request closed without merge": "拉取请求关闭而不合并",
            "Pull Request merged": "合并拉取请求",
            "Issue closed": "议题已关闭",
            "Pull Request reopened": "拉取请求已重新打开",
            "Issue reopened": "议题已重新打开",
            "Pull Request pending card added": "添加了拉取请求待办卡",
            "Issue pending card added": "添加了议题待办卡",

            "automation": "自动化",
            "to the": "到",
            "column.": "栏目。",

        // 自动看板与审查模板项目 https://github.com/users/<user-name>/projects/<id>?add_cards_query=is%3Aopen
            // 顶部提醒
            "Project created from Automated kanban with reviews template.": "已从自动看板与审查模板创建项目。",

        // 错误分类模板项目 https://github.com/users/<user-name>/projects/<id>?add_cards_query=is%3Aopen
            // 顶部提醒
            "Project created from Bug triage template.": "已从错误分类模板创建项目。",

            "Needs triage": "需要分流",
            "High priority": "高优先级",
            "Low priority": "低优先级",

        // https://github.com/users/<user-name>/projects/<id>/settings
            "Collaboration settings": "协作设置",
                "Options": "选项",
                    "Visibility": "可见性",
                    "Visibility settings only impact the project itself. Project content that belongs to a repository the user does not have access to will be redacted.": "可见性设置只影响项目本身。属于用户无权访问的仓库的项目内容将被编辑。",
                    "Public": "公开",
                        "Anyone on the internet can see this project. You choose who can make changes.": "互联网上的任何人都可以看到这个项目。您选择谁可以进行更改。",
                    "Private": "私密",
                        "You choose who can see and make changes to this project.": "您可以选择谁查看此项目并对其进行更改。",
            // 协作者
                "This project doesn’t have any collaborators yet. Use the form below to add a collaborator.": "该项目还没有任何协作者。使用下面的表格添加协作者。",
                "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",

                "You’ll only be able to find a GitHub user by their email address if they’ve chosen to list it publicly. Otherwise, use their username instead.": "只有当 GitHub 用户选择公开电子邮箱地址时，您才能通过他们的电子邮箱地址找到他们。否则，请使用他们的用户名代替。",
                "Add collaborator": "Add collaborator",
                // [/isn’t a GitHub member/, "不是 GitHub 成员"],
            "Linked repositories": "关联的仓库",
                "Link a repository": "关联仓库",
                "Get more accurate suggestions and better search results by linking up to 25 repositories to this project.": "通过将多达 25 个仓库关联到这个项目，获得更准确的建议和更好的搜索结果。",
                // [/(\d+) linked repositories/, "$1 个关联仓库"],
                "This project doesn’t have any linked repositories yet.": "该项目暂无任何关联的仓库。",

        // https://github.com/users/<user-name>/projects/<id>/edit
            "(optional)": "(可选)",
            "Once you delete this project, there is no going back. Please be certain.": "一旦您删除了这个项目，就再也无法恢复。请确认。",
    },
    "regexp": [ // 正则翻译
        [/Delete/, "删除"],
        [/Edit/, "编辑"],
        [/Manage automation for/, "管理自动化"],
        [/Archive all cards in/, "存档所有"],
        [/(\d+) linked repositories/, "$1 个关联仓库"],
        [/([\d,]+) Open/, "$1 打开"], // 项目标签卡
        [/([\d,]+) Closed/, "$1 已关闭"],
        [/(\d+) tasks? done/, "$1 个任务完成"],
    ],
};

I18N.zh["new/project"] = I18N.zh["projects"];
I18N.zh["repository/projects/new"] = I18N.zh["projects"];

I18N.zh["redeem"] = { // 兑换页面
    "static": { // 静态翻译
        "Enter coupon code": "输入优惠券代码",
        "Redeem": "兑换",
    },
    "regexp": [ // 正则翻译
    ],
};
