// ==UserScript==
// @name         GitHub 中文化插件Gitee json i18n（测试版）
// @namespace    https://github.com/buiawpkgew1/github-chinese
// @description  中文化 GitHub 界面的部分菜单及内容。原作者为楼教主(http://www.52cik.com/)。
// @copyright    2021, buiawpkgew1, 沙漠之子, 菾凴
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @version      1.9.2-beta.10-2024-06-09
// @author       菾凴
// @license      GPL-3.0
// @match        https://github.com/*
// @match        https://skills.github.com/*
// @match        https://gist.github.com/*
// @match        https://www.githubstatus.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_notification
// @connect      fanyi.iflyrec.com
// @supportURL   https://github.com/buiawpkgew1/github-chinese/issues
// ==/UserScript==
(function (window, document, undefined) {
    'use strict';

    // 设置默认语言.
    let lang = 'zh-CN';
    // 获取或设置是否启用正则表达式翻译
    let page = false, enable_RegExp = GM_getValue("enable_RegExp", 1);

    // 翻译配置
    const I18N = {
        conf: {
            characterDataPage: ['page-profile'],
            ignoreSelector: {
                'page-profile': ['.ignore-selector']
            },
            rePagePathRepo: /\/<user-name>\/<repo-name>/,
            rePagePathOrg: /\/<org-login>/,
            rePagePath: /\/<path>/,
            ignoreId: ['ignore-id'],
            ignoreTag: ['IGNORE-TAG'],
            reIgnoreClass: /ignore-class/,
            reIgnoreItemprop: /ignore-itemprop/,
            timeRegexp: [
                [/(\d+)天前/, '$1天前'],
                [/(\d+)小时前/, '$1小时前'],
                [/(\d+)分钟前/, '$1分钟前']
            ]
        },
        lang: {
            'zh-CN': {
                'page-dashboard':{
                    'static': {
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
                        "You've been added to the": "您已被添加至",
                        "organization.": "组织",
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

                        // 中间栏
                        "The home for all developers — including you.": "所有开发者的家园——包括您。",
                        "Welcome to your personal dashboard, where you can find an introduction to how GitHub works, tools to help you build software, and help merging your first lines of code.": "欢迎来到您的个人仪表板，在这里您可以看到关于 GitHub 工作原理的介绍，帮助您构建软件的工具，以及帮助您合并您的第一行代码。",
                        "Start writing code": "开始编写代码",
                            "You're seeing this because you haven't created a repository in a while.": "您看到这个是因为您有一段时间没有创建仓库了。",
                            "You're seeing this because you haven't used repositories, issues, and pull requests recently.": "您看到这个是因为您最近没有使用仓库、议题和拉取请求。",
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
                        "Learn about the version control system, Git, and how it works with GitHub.": "了解版本控制系统、Git 以及它如何与 GitHub 一起工作。",
                        "The GitHub Flow": "GitHub 流程",
                        "Adopt GitHub's lightweight, branch-based workflow to collaborate on projects.": "采用 GitHub 的轻量级、基于分支的工作流程来协作处理项目。",

                        "One moment please...": "稍等一会儿...",
                        "Loading activity...": "载入活动...",
                        "All activity": "所有活动",

                        "Welcome to the new feed!": "欢迎来到新的动态提要!",
                        "We’re updating the cards and ranking all the time, so check back regularly. At first, you might need to follow some people or star some repositories to get started": "我们一直在更新卡片和排名，所以请定期查看。一开始，您可能需要关注一些人或标星一些仓库才能开始",
                        "Send feedback": "发送反馈",

                        "Updates to your homepage feed": "主页动态摘要的更新",
                        "We've combined the power of the Following feed with the For you feed so there’s one place to discover content on GitHub. There’s improved filtering so you can customize your feed exactly how you like it, and a shiny new visual design. ✨": "我们将 “关注动态提要” 与 “您的动态提要” 的强大功能结合在一起，让您在一个地方就能发现 GitHub 上的内容。此外，我们还改进了筛选功能，让您可以完全按照自己的喜好定制动态提要，并采用全新的视觉设计。 ✨",
                        "Learn more": "了解更多",

                        // 提要筛选
                        "Filter": "筛选器",
                            "Feed filters": "提要筛选器",
                            "Events": "事件",
                                "Activity you want to see on your feed": "您想在提要上看到的活动",
                            "Announcements": "公告",
                                "Special discussion posts from repositories": "来自仓库的特别讨论帖",
                            "Releases": "发行版",
                                "Update posts from repositories": "来自仓库的更新帖",
                            // 赞助
                                "Relevant projects or people that are being sponsored": "获得赞助的相关项目或人员",
                            "Stars": "星标",
                                "Repositories being starred by people": "被人们标星的仓库",
                            "Repositories": "仓库",
                                "Repositories that are created or forked by people": "由人们创建或复刻的仓库",
                            "Repository activity": "仓库活动",
                                "Issues and pull requests from repositories": "来自仓库的议题和拉取请求",
                            "Follows": "关注",
                                "Who people are following": "人们在关注谁",
                            "Recommendations": "推荐",
                                "Repositories and people you may like": "您可能喜欢的仓库和人",

                            "Include events from starred repositories": "包括来自星标仓库中的事件",
                                "By default, the feed shows events from repositories you sponsor or watch, and people you follow.": "默认情况下，动态提要显示的事件来自您赞助或关注的仓库，以及您关注的人。",
                            "Reset to default": "重置",
                            "Save": "保存",

                        "Show all": "显示所有",
                        "Show less": "显示更少",

                        "Uh oh!": "哎呀！",
                        "There was an error in loading the activity feed.": "载入动态提要时发生错误。",
                        "Reload this page.": "重载此页面",

                        // 动态 状态词
                        "starred": "星标了",
                        "created": "创建了",
                        "forked from": "复刻自",
                        "generated from": "创建自",
                        "mirrored from": "镜像自",
                        "forked": "复刻了",
                        "from": "来自",
                        "for": "",
                        "pushed to": "推送到",
                        "released": "发布了",
                        "published": "发布了",
                        "started sponsoring": "赞助给",
                        "started following": "开始关注了",
                        "you": "您",
                        "Updated": "更新于",
                        "a repository": "1 个仓库",
                        "has a new repository": "创建了仓库",
                        "created a repository": "创建了仓库",
                        "created a branch in": "创建了一个分支在",
                        "in": "分支在",
                        "Forked to": "复刻为",
                        "of": "",
                        "made": "将",
                        "public": "设为公共",
                        "committed": "提交于",
                        "posted a discussion in": "发表讨论于",
                        "made this repository public": "将此仓库公开",
                        "labeled a pull request": "将标签添加到拉取请求中",
                        "launched their sponsorship page 💖": "推出了他们的赞助页面 💖",
                        //[/and (\d+) more/, "和另外 $1 个"],

                        "published a release": "发布发行版",
                        "forked a repository": "复刻仓库",
                        "starred a repository": "星标仓库",
                        "sponsored": "赞助了",
                        "followed": "关注了",
                        "added a repository to": "已将仓库添加到",
                        "contributed to": "贡献给",

                        "your repository": "您的仓库",

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

                        // 仪表板右上方看板
                        "The world’s fair of software is here.": "世界软件博览会就在这里。",
                        "The GitHub Universe call for sessions is now open! Apply to share your expertise by submitting a session proposal today. Plus, get 35% off your tickets to GitHub Universe only for a limited time.": "GitHub Universe 的会议征集现已开启！立即提交您的会议提案，分享您的专业知识。此外，现在限时可享 35% 的 GitHub Universe 会议门票折扣。",

                        // 用户 浮动信息卡
                        "Member of": "隶属组织",
                        // [/, and (\d+) more/, "，以及其他 $1 个组织"],

                        // 组织  浮动信息卡
                        // [/(\d+) repositor(y|ies)/, "$1 个仓库"],
                        // [/(\d+) members?/, "$1 个成员"],

                        "Switch dashboard context": "切换默认身份", // 组织
                        "Manage organizations": "管理组织", // 组织
                        "Create organization": "创建组织", // 组织

                        // 首次加入组织通知
                        "You’ve been added to the": "您已经被添加到",
                        "organization!": "组织！",
                        "Here are some quick tips for a first-time organization member.": "以下是首次加入组织的一些提示。",
                        "Use the switch context button in the upper left corner of this page to switch between your personal context (": "使用页面左上角的切换身份按钮，您可以在（",
                        ") and organizations you are a member of.": "）和组织身份之间进行切换。",
                        "After you switch contexts you’ll see an organization-focused dashboard that lists out organization repositories and activities.": "当您切换身份，您会看到一个组织为中心的页面，其中列出了组织库和活动。",

                        // 快捷键
                        "Dashboards": "仪表板",
                        "Go to your issues": "跳转到您的议题",
                        "Go to your pull requests": "跳转到您的拉取请求",
                    },
                    'regexp': {},

                },
                'title': {
                    'static': {
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
                        "Your Achievements": "我的成就",
                        "Your Followers": "我的关注者",
                        "Who You’re Following": "我关注的人",
                        "Account settings": "帐户设置",
                        "Appearance": "外观",
                        "Accessibility": "无障碍",
                        "Notification settings": "通知设置",
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
                        "Issue search results": "议题搜索结果",
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
                        "Enable two-factor authentication": "启用双因素身份验证",
                        "Manage two-factor authentication": "管理双因素身份验证",
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
                        "Trending  repositories on GitHub today": "今日热门仓库",
                        "Trending  repositories on GitHub this week": "本周热门仓库",
                        "Trending  repositories on GitHub this month": "本月热门仓库",
                        "Repository defaults": "仓库默认值",
                        "Repository search results": "仓库搜索结果",
                        "Runners": "运行器",
                        "Runner Groups": "运行器组",
                        "Packages": "软件包",
                        "Package": "软件包",
                        "Security": "安全",
                        "Verified & approved domains": "经验证和批准的域名",
                        "Add a Pages verified domain": "添加一个经验证的 GitHub Pages 域名",
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
                        "Register for the GitHub Developer Program": "注册 GitHub 开发者计划",
                        "Codespaces": "代码空间",
                        "Codespace Templates": "代码空间模版",
                        "Create new codespace": "创建代码空间",
                    },
                    'regexp': [
                        [/GitHub/, 'GitHub 中文'],
                        [/Authorized OAuth Apps/, "授权的 OAuth 应用"],
                        [/Authorized GitHub Apps/, "授权的 GitHub 应用"],
                        [/Installed GitHub Apps/, "已安装的 GitHub 应用"],
                        [/Accessibility/, "无障碍"],
                        [/Repositories/, "仓库"],
                        [/Starred/, "星标页面"],
                        [/starred repositories/, "星标仓库"],
                        [/starred topics/, "星标主题"],
                        [/starred/, "星标"],
                        [/Commits/, "提交"],
                        [/New Issue/, "新建议题"],
                        [/Issues?/, "议题"],
                        [/Pull requests?/, "拉取请求"],
                        [/Actions/, "操作"],
                        [/Projects/, "项目"],
                        [/Packages?/, "软件包"],
                        [/Security Overview/, "安全概述"],
                        [/Security Policy/, "安全政策"],
                        [/Security Advisories/, "安全公告"],
                        [/Dependabot alerts/, "Dependabot 警报"],
                        [/Pulse/, "统计"],
                        [/Contributors to/, "贡献者 ·"],
                        [/Dashboard/, "仪表板"],
                        [/Community/, "社区"],
                        [/Traffic/, "流量"],
                        [/Commit Activity/, "提交活动"],
                        [/Code frequency/, "代码频率"],
                        [/Created/, "已创建"],
                        [/Dependencies/, "依赖关系"],
                        [/Network Dependents/, "网络依赖者"],
                        [/Network Graph/, "网络图"],
                        [/Revisions/,"修订"],
                        [/GitHub Skills Quickstart Guide/, "GitHub 技能快速入门指南"],
                        [/Skills/, "技能"],
                        [/Sponsoring/, "捐助"],
                        [/Stargazers/, "追星者"],
                        [/Forks?/, "复刻"],
                        [/Tags?/, "标签"],
                        [/Release/, "发行版"],
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
                        [/Workflow runs/, "工作流运行"],
                        [/Add a code of conduct to/, "添加代码行为准则到"],
                        ["_regexp_end", "end"]
                    ]
                },
                'pubilc': {
                    'static': {
                        "No server is currently available to service your request.": "当前服务器无法为您的请求提供服务。",
                        "This page is taking too long to load.": "此页面加载时间过长。",
                        "Sorry about that. Please try refreshing and contact us if the problem persists.": "对此我们很抱歉。请尝试刷新，如果问题仍然存在，请联系我们。",
                        "Contact Support": "联系 GitHub 支持",
                        "GitHub Status": "GitHub 状态",
                        // 顶部栏 (未登录)
                        "Product": "产品",
                        "Solutions": "解决方案",
                        "Open Source": "开源",
                        "Pricing": "价格",
                        "Search": "搜索",
                        "Sign in": "登录",
                        "Sign up": "注册",
                        "Team": "团队",
                        "Enterprise": "企业",
                        // 搜索栏
                        "Search or jump to...": "搜索或跳转到…",
                        "Type": "请键入",
                        "to search": "去搜索",
                        "Command palette": "命令面板",
                        "Saved queries": "已保存的搜索",
                        "All of GitHub": "整个 GitHub",
                        "Autocomplete": "自动完成",
                        "Search all of GitHub": "搜索整个 GitHub",
                        "Search in this directory": "在文件夹中搜索",
                        "Search in this repository": "在该仓库中搜索",
                        "Search in this owner": "在该所有者中搜索",
                        "Search in this organization": "在该组织中搜索",
                        "Owners": "所有者",
                        "Languages": "语言",
                        "Search syntax tips": "搜索语法提示",
                        "Jump to": "跳转到",
                        // 左上角下拉栏 (已登录)
                        "Home": "主页",
                        "Issues": "议题",
                        "Pull requests": "拉取请求",
                        "Projects": "项目",
                        "Codespaces": "代码空间",
                        "Explore": "探索",
                        "Marketplace": "市场",
                        "Filter repositories": "筛选仓库",
                        "Close filter": "关闭筛选器",
                        "Show more": "显示更多",
                        // 顶部提示横幅
                            "Don't get locked out of your account.": "不要被锁定在您的帐户之外。",
                            "Download your recovery codes": "下载您的恢复码",
                            "add a passkey": "添加通行密钥",
                            "so you don't lose access when you get a new device.": "这样您在登录新设备时就不会失去访问权限。",

                        // 右上角通知按钮提示
                            "You have no unread notifications": "您没有未读通知",
                            "You have unread notifications": "您有未读通知",

                        // 右上角新建按钮下拉菜单
                            "Create new...": "新建...",
                                "New repository": "新建仓库",
                                "Import repository": "导入仓库",
                                "New codespace": "新建代码空间",
                                "New gist": "新建代码片段",
                                "New organization": "新建组织",
                                "New project": "新建项目",
                                "This organization": "本组织", // 组织
                                "New team": "新建团队", // 组织

                        // 右上角个人图标下拉菜单
                            "Signed in as": "登录身份为",
                            "Set status": "状态设置",
                            "Your profile": "我的资料",
                            "See all accounts": "查看所有账户",
                            "Add account": "添加账户",
                            "Your sponsorships": "我的捐助者",
                            "Your repositories": "我的仓库",
                            "Your codespaces": "我的代码空间",
                            "Your Copilot": "我的 Copilot",
                            "Your organizations": "我的组织",
                            "Your enterprises": "我的企业",
                            "Your projects": "我的项目",
                            "Your discussions": "我的讨论",
                            "Your stars": "我的星标",
                            "Your gists": "我的代码片段",
                            "Your sponsors": "我的赞助者",
                            "Upgrade": "升级",
                            "Try Enterprise": "试用企业版",
                                "Free": "免费",
                            "Try Copilot": "试用 Copilot",
                            "Feature preview": "功能预览",
                                // 对话框
                                "Enable": "启用",
                                "Disable": "禁用",
                                "Documentation": "文档",
                                "Codespaces Connectivity v2": "代码空间连接 v2",
                                    "Codespaces is rolling out improved infrastructure for both the main connection, and forwarded ports, resulting in better performance and increased reliability.": "代码空间正在推出针对主连接和端口转发的改进基础设施，从而实现更佳的性能和更高的稳定性。",
                                    "If you primarily use Codespaces behind a firewall, you may have to update your firewall settings to enable this new approach. Codespaces will now require access to *.visualstudio.com to facilitate your connection to the codespace.": "如果您通常在防火墙后使用代码空间，为了适应这一新的接入方式，您可能需要对您的防火墙设置进行更新。代码空间现在需要访问 *.visualstudio.com 以便于您连接到代码空间。",
                                "Colorblind themes": "色盲主题",
                                    "Varying by gender and geography, color blindness can affect on average 8% of men and up to 0.5% of women. Our previous colorblind theme has been split into two new themes:": "色盲会因性别和地域的不同而有所不同，平均而言，色盲会影响 8% 的男性和高达 0.5% 的女性。我们之前的色盲主题被分为两个新主题：",
                                    "Light/dark Protanopia & Deuteranopia for red/green color blindness.": "明/暗 - 红绿色盲主题适用于红绿色盲。",
                                    "Light/dark Tritanopia for blue/yellow color blindness.": "明/暗 - 蓝色盲主题适用于蓝黄色盲。",
                                "Command Palette": "命令面板",
                                    "Quickly navigate and jump between your organizations or repositories and search recent issues, pull requests, projects and more with the new command palette. You can also execute time saving commands all without lifting your fingers off the keyboard!": "使用新的命令面板，可以快速导航并跳转到您所在的组织或仓库，并搜索最近的议题、拉取请求、项目等等。您还可以执行节省时间的命令，而无需将手指从键盘上移开！",
                                    "To open the command palette:": "打开命令面板：",
                                "Rich Jupyter Notebook Diffs": "Jupyter Notebook 的丰富差异视图",
                                    "Enables rich diffs of Jupyter Notebooks in pull requests": "在拉取请求中启用 Jupyter Notebook 的丰富差异视图",
                                    "Note: commenting on rich diff views of notebooks is not yet supported": "注意：尚不支持对 Jupyter Notebook 的丰富差异视图进行评论",
                                "Project Migration": "项目迁移",
                                    "We've made it easy for you to migrate your project (classic) boards to the all new Projects experience! Enable this feature so that you can try out tables, multiple views, new automation options, and powerful field types using your existing projects.": "我们已经为您简化了将您的项目（经典版）面板迁移到全新项目的体验！启用此功能，您可以在现有项目中尝试表格、多视图、新的自动化选项和强大的字段类型。",
                                    "How it works:": "如何工作：",
                                        "We'll create a copy of your existing classic project board in Projects.": "我们将在 “项目” 中创建现有经典项目看板的副本。",
                                        "You'll be prompted to close your classic project as future changes won't be synchronized.": "系统将提示您关闭经典项目，因为未来的更改将不会同步。",
                                        "You can reopen your old project in a pinch if necessary!": "如果有必要，您可以紧急重新打开您的旧项目！",
                                    "Notes:": "注意：",
                                        "Migrated projects will be made private by default.": "默认情况下，迁移的项目将设为私有。",
                                        "Projects does not support repository level projects. When you migrate a repository project board, it will migrate to either the organization or personal account that owns the repository project, and the migrated project will be pinned to the original repository. We will migrate permissions to the best of our ability but some folks may lose read or writes access.": "项目不支持仓库级别的项目。当您迁移仓库项目面板时，它将被迁移到拥有该仓库项目的组织或个人帐户，并且迁移后的项目将被固定到原始仓库。我们将尽最大努力迁移权限，但有些人可能会失去读取或写入权限。",
                                "Deployments Dashboard View": "部署仪表板视图",
                                    "A new dashboard to view and track your deployments across all your environments, see the full history of your deployments, and filter by environment.": "一个全新的仪表板，用于查看和跟踪您在所有环境中的部署情况，查看您部署的完整历史记录，并按环境进行筛选。",
                                "Slash Commands": "斜杠命令",
                                    "Slash commands make it easier to type more complex Markdown, such as tables, tasklists, and code blocks.": "斜线命令可以让您更轻松地输入更复杂的 Markdown，如表格、任务列表和代码块。",
                                    "Simply type": "只需在议题、拉取请求和讨论中键入",
                                    "on Issues, PRs and Discussions to check out a list of available commands!": "，即可查看可用命令的列表！",
                            "Help": "帮助",
                            "Settings": "设置",
                            "GitHub Docs": "GitHub 文档",
                            "GitHub Support": "GitHub 支持",
                            "GitHub Community": "GitHub 社区",
                            "Sign out": "退出",

                        // 状态设置对话框
                        // 出现位置: 个人资料页, Gist 个人主页, 仓库页右上角个人图标下拉菜单
                            "Edit status": "编辑状态",
                            "What's your current status?": "您目前的状况如何？",

                            "Suggestions": "建议",
                                "On vacation": "在度假",
                                "Working from home": "在家工作",
                                "Out sick": "生病",
                                "Focusing": "专注中",

                            "Busy": "繁忙中",
                                "When others mention you, assign you, or request your review, GitHub will let them know that you have limited availability.": "当其他人提及您、指派您或请求您进行评论时，GitHub 会告知他们您的很忙。",
                                "I may be slow to respond.": "我的反应可能比较慢。",

                            "Clear status": "清除状态",
                                "Never": "永不",
                                "in 30 minutes": "30 分钟",
                                "in 1 hour": "1 小时",
                                "in 4 hours": "4 小时",
                                "today": "今天",
                                "this week": "本周",
                                "How long until this status will automatically clear.": "多久后状态自动清除。",
                            "Visible to": "可见",
                                "Everyone": "任何人",
                                    "Scope status visibility to a single organization.": "将状态可视范围扩大到单个组织。",
                                "Everyone - Your status will be visible to everyone.": "所有人 - 所有人都可以看到您的状态。",
                            "Filter emoji": "筛选表情符号",
                                "Search results": "筛选结果",

                        // 底部条
                            "Terms": "服务条款",
                            "Privacy": "隐私",
                            "Security": "安全",
                            "Status": "状态",
                            "Docs": "文档",
                            "Contact": "联系我们",
                            "Manage cookies": "管理 Cookies",
                            "Do not share my personal information": "请勿分享我的个人信息",

                        // 左侧栏底部条
                            "About": "关于",
                            "Blog": "博客",
                            "Manage Cookies": "管理 Cookies",

                        // 其他
                            "Contact GitHub": "联系 GitHub",
                            "Training": "培训",

                        // 描述、评论编辑器翻译
                            "Add a comment": "添加评论",
                            "Add a body": "添加内容",
                            "Write": "撰写",
                                "Add your comment here...": "在此添加您的评论...",
                                "Add your answer here...": "在此添加您的答复...", // 具体讨论页
                            "Preview": "预览",
                                "Nothing to preview": "没有可预览的内容。",
                                "This file is empty.": "这是一个空文件。",
                            "Leave a comment": "发表评论",
                            "Write a reply": "发表回复", // 具体讨论页
                            "Write a comment": "发表评论", // 具体讨论页
                            "Suggest an answer": "提出答复", // 具体讨论页
                            "Ask a question, start a conversation, or make an announcement": "提出问题、开始讨论或发布公告", // 新建讨论
                            "Nothing to preview": "没有什么可预览",
                            "This repository has been archived.": "此仓库已存档。", // 已存档仓库 某个提交的评论框
                            "Add review comment": "添加审查意见", // 具体拉取请求 文件审查意见
                            "Start a review": "开始评论", // 具体拉取请求 文件审查意见
                            // 取消按钮 提醒信息
                            "Are you sure you want to discard your unsaved changes?": "您确定要放弃未保存的更改吗？",

                            "Add a title": "添加标题",
                                "Title": "标题",
                            "Add a description": "添加描述",
                                "Add your description here...": "在此添加您的描述...",

                            // 拉取请求 代码审查 回复对话框
                            "Add a suggestion, <Ctrl+g>": "添加建议, <Ctrl+g>",
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
                                "Select a reply": "选择回复",
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

                            "Attach files by": "通过",
                            "dragging & dropping,": "拖放，",
                            "selecting or pasting them.": "选择或粘贴来附加文件。",
                            "Markdown is supported": "支持 Markdown 语法",
                            "Styling with Markdown is supported.": "支持 Markdown 语法。",
                            "Paste, drop, or click to add files": "粘贴、拖放或点击添加文件",
                            "Uploading your files…": "正在上传您的文件…",

                            "Close issue": "关闭议题", // issue页 评论框
                                "Close as completed": "完成后关闭",
                                    "Done, closed, fixed, resolved": "已完成、已关闭、已修复、已解决",
                                "Close as not planned": "非计划中关闭",
                                    "Won't fix, can't repro, duplicate, stale": "不会修复，无法重现，重复，陈旧",
                            "Close with comment": "评论并关闭议题", // issue页 评论框
                            "Close pull request": "关闭拉取请求", // pull页 评论框
                            "Reopen discussion": "重新打开讨论", // discussion页 评论框
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

                        // 添加到清单
                            "Add to list": "添加到清单",
                                "You don't have any lists yet.": "您尚无任何清单。",
                                "Lists": "清单",
                                    "Search lists": "搜索清单",
                                "Create list": "创建清单",
                                    "Create a list to organize your starred repositories.": "创建一个清单来组织您的星标仓库。",
                                    "⭐️ Name this list": "⭐️ 清单名称",
                                    "Write a description": "简单描述",
                                    "Lists are currently in beta.": "清单目前处于测试阶段。",
                                    "Share feedback and report bugs.": "分享反馈意见和报告错误。",
                                    "Creating...": "创建中...",

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
                                "for help and tips": "寻求帮助和提示", // 键入 ?

                            "Pages": "GitHub Pages",
                            "Dashboard": "仪表板",
                            "Notifications": "通知",
                            "Discussions": "讨论",
                            "Actions": "操作",
                            "Insights": "洞察",
                            "Organizations": "组织",
                            "Repositories": "仓库",
                            "Packages": "软件包",
                            "Users": "用户",
                            "to jump to": "去跳转",

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
                            "across all of GitHub": "在整个 GitHub 中",
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
                            "Follow": "关注",
                            "Unfollow": "取消关注",
                            "Star": "星标",
                            "Stars": "星标",
                            // "Unstar": "已加星标",
                            "Starred": "已加星标",
                            "Fork": "复刻",
                            "Save": "保存",
                            "Saving…": "保存中…",
                            "Saving...": "保存中...",
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
                            "Use": "使用",

                            "Learn more": "了解更多",
                            "Learn More": "了解更多",
                            "Learn more.": "了解更多。",
                            ",": "，",
                            ".": "。",

                            "Prev": "上一页",
                            "Previous": "上一页",
                            "Next": "下一页",

                            // 名词
                            "Public": "公共",
                            "Private": "私有",
                            "Public archive": "公共存档",
                            "Private archive": "私有存档",
                            "Public template": "公共模板",
                            "Public mirror": "公共镜像",
                            "Code": "代码",
                            "Overview": "概况",
                            "Followers": "关注者",
                            "Collaborators": "协作者",
                            "collaborators": "协作者",
                            "Sponsors": "赞助者",
                            "commit": "提交",
                            "commits": "提交",
                            "Organization": "组织",
                            "People": "成员",
                            "Teams": "团队",

                            // 相对时间
                            "just now": "刚刚",
                            "now": "当前",
                            "yesterday": "昨天",
                            "last month": "上个月",

                        // 验证标记浮动信息
                            "This commit was created on GitHub.com and signed with GitHub’s": "此提交在 GitHub.com 上创建并签名，使用 GitHub 的",
                            "This commit was created on GitHub.com and signed with GitHub's": "此提交在 GitHub.com 上创建并签名，使用 GitHub 的",
                            "This commit was created on GitHub.com and signed with GitHub’s verified signature": "此提交在 GitHub.com 上创建并签名，使用 GitHub 的",
                            "This commit was signed with the committer's": "此提交已签名，使用提交者的",
                            "This tag was signed with the committer's": "此标签已签署，使用提交者的", // /<user-name>/<repo-name>/releases
                            "This commit was signed with the committer’s": "此提交已签名，使用提交者的",
                            "This tag was signed with the committer’s": "此标签已签署，使用提交者的", //
                            "verified signature": "已验证签名",
                            "The key has expired": "密钥已过期",
                            "This commit is not signed, but one or more authors requires that any commit attributed to them is signed.": "此提交未签名，但一位或多位作者要求对归属于他们的任何提交进行签名。",
                            "We had a problem verifying this signature. Please try again later.": "我们在验证此签名时遇到问题。请稍后再试。",

                            "GPG Key ID:": "GPG 密钥 ID：",
                            "GPG key ID:": "GPG 密钥 ID：",
                            "SSH Key Fingerprint:": "SSH 密钥指纹：",
                            "SSH key Fingerprint:": "SSH 密钥指纹：",
                            "Learn about vigilant mode": "了解警戒模式",

                            "Verified": "已验证",
                            "Expired": "已过期",
                            "Partially verified": "部分验证",
                            "Unverified": "未验证",
                                "Upload your public signing GPG key": "上传您的公共签名 GPG 密钥",
                                "to verify your signature.": "以验证您的签名。",

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

                        // Cookie 设置
                            "Manage cookie preferences": "管理 Cookie 偏好设置",
                            "Most GitHub websites use cookies. Cookies are small text files placed on your device to store data so web servers can use it later. GitHub and our third-party partners use cookies to remember your preferences and settings, help you sign in, show you personalized ads, and analyze how well our websites are working. For more info, see the Cookies and similar technologies section of the": "大多数 GitHub 网站都使用 Cookie。Cookie 是保存在您的设备上的小型文本文件，用于存储数据，以便 Web 服务器稍后使用。GitHub 和我们的第三方合作伙伴使用 Cookie 来记住您的偏好和设置、帮助您登录、向您显示个性化广告以及分析我们网站的运行情况。有关更多信息，请参阅隐私声明中的",
                            "Privacy Statement": "Cookie 和类似技术部分",
                            "Accept": "接受",
                            "Reject": "拒绝",
                            "Reset all": "重置全部",
                            "Save changes": "保存更改",
                            "Required": "必要的",
                            "GitHub uses required cookies to perform essential website functions and to provide the services. For example, cookies are used to log you in, save your language preferences, provide a shopping cart experience, improve performance, route traffic between web servers, detect the size of your screen, determine page load times, improve user experience, and for audience measurement. These cookies are necessary for our websites to work.": "GitHub 使用必需的 Cookie 来执行基本网站功能并提供服务。例如，Cookie 用于登录、保存您的语言偏好、提供购物车体验、提高性能、在 Web 服务器之间路由流量、检测屏幕大小、确定页面加载时间、改善用户体验以及用于受众测量。这些 Cookie 是我们网站正常运行所必需的。",
                            "Analytics": "分析",
                            "We allow third parties to use analytics cookies to understand how you use our websites so we can make them better. For example, cookies are used to gather information about the pages you visit and how many clicks you need to accomplish a task. We also use some analytics cookies to provide personalized advertising.": "我们允许第三方使用分析性 Cookie 来了解您如何使用我们的网站，以便我们改进网站。例如，Cookie 用于收集有关您访问的页面以及完成任务所需的点击次数的信息。我们还使用一些分析性 Cookie 来提供个性化广告。",
                            "Social Media": "社交媒体",
                            "GitHub and third parties use social media cookies to show you ads and content based on your social media profiles and activity on GitHub's websites. This ensures that the ads and content you see on our websites and on social media will better reflect your interests. This also enables third parties to develop and improve their products, which they may use on websites that are not owned or operated by GitHub.": "GitHub 和第三方使用社交媒体 Cookie 根据您的社交媒体个人资料和 GitHub 网站上的活动向您显示广告和内容。这可以确保您在我们的网站和社交媒体上看到的广告和内容将更好地反映您的兴趣。还使第三方能够开发和改进它们的产品，它们可能会在不由 GitHub 拥有或运营的网站上使用这些产品。",
                            "Advertising": "广告",
                            "In addition, GitHub and third parties use advertising cookies to show you new ads based on ads you've already seen. Cookies also track which ads you click or purchases you make after clicking an ad. This is done to show you ads that are more relevant to you and for business purposes with our advertising partners. For example, cookies are used to detect when you click an ad and to show you ads based on your social media interests and website browsing history.": "此外，GitHub 和第三方使用广告 Cookie 根据您已经看过的广告向您显示新广告。Cookie 还会跟踪您点击的广告或点击广告后进行的购买。这样做是为了向您显示与您更相关的广告，并用于与我们的广告合作伙伴开展业务。例如，Cookie 用于检测您何时点击广告，并根据您的社交媒体兴趣和网站浏览历史记录向您显示广告。",

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
                    'regexp': [],
                    'selector': [
                        ["span[data-message='Review changes']", "审查更改"], // 拉取请求 --> 更改的文件
                    ]
                },
                'page-profile': {
                    'static': {
                        // 左侧用户信息栏
                        "Change your avatar": "修改头像",
                        "they/them": "他们",
                        "she/her": "她",
                        "he/him": "他",
                        "You have blocked this user": "您已拉黑此用户",
                        "Follow": "关注",
                        "Sponsor": "赞助",
                        "follower": "关注者",
                        "followers": "关注者",
                        "following": "关注",
                        "Joined": "加入于",
                        "Achievements": "成就",
                        "Highlights": "高光时刻",
                        "Developer Program Member": "开发者计划成员",
                        "Organizations": "组织",
                        "Block or Report": "拉黑或举报",
                        "Unblock or report user": "取消拉黑或举报",
                        "- same time": "- 时间相同",

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
                        // 北极代码库贡献者
                        "Arctic Code Vault Contributor": "北极代码库贡献者",
                        "History": "历史",
                        "100% unlocked": "100% 解锁",
                        "· Unlocked": "· 解锁于",
                        "these repositories, and more, were archived": "这些仓库以及更多仓库已存档",
                        // YOLO
                        "You want it? You merge it.": "您想要它？您合并它。",
                        "Merged without a review": "未经审查就合并",
                        // Pull Shark
                        "Pull Shark": "鲨鱼拉",
                        "Bronze unlocked": "青铜已解锁",
                        "Bronze and Silver unlocked": "青铜和白银已解锁",
                        "· First unlocked": "· 首次解锁于",
                        "2nd pull request merged": "2 个拉取请求被合并",
                        "16th pull request merged": "16 个拉取请求被合并",
                        "128th pull request merged": "128 个拉取请求被合并",
                        "1024th pull request merged": "1024 个拉取请求被合并",
                        // Starstruck
                        "Starstruck": "追星族",
                        "⭐️ 16 stars": "⭐️ 16 个星标",
                        "⭐️ 128 stars": "⭐️ 128 个星标",
                        "⭐️ 512 stars": "⭐️ 512 个星标",
                        "⭐️ 4096 stars": "⭐️ 4096 个星标",
                        // Pair Extraordinaire
                        "Pair Extraordinaire": "非凡搭档",
                        "Unlocked": "解锁于",
                        "Coauthored with": "与下列用户共同合作",
                        "Coauthored with an unknown user": "与未知用户共同合作",
                        // Quickdraw
                        "Quickdraw": "快速关闭",
                        "Gitty up!": "赶快开始！",
                        "Closed within 5 minutes of opening": "在打开的 5 分钟内关闭",
                        // Galaxy Brain
                        "Galaxy Brain": "银河大脑",
                        "2nd accepted answer": "2 个答案被接受",
                        "8th accepted answer": "8 个答案被接受",
                        "16th accepted answer": "16 个答案被接受",
                        "32nd accepted answer": "32 个答案被接受",
                        // Public Sponsor
                        "Public Sponsor": "公共赞助者",
                        "1st sponsorship": "1 次赞助",
                        // Mars 2020 Contributor
                        "Mars 2020 Contributor": "火星 2020 贡献者",
                        "Mars 2020 Helicopter Mission": "2020 火星无人直升机首飞计划",
                        "this repository was included": "该仓库已收录",

                        // ?tab=achievements
                        "Hide from profile": "从个人资料中隐藏",
                        "Hidden from your profile.": "已从您的个人资料中隐藏",
                        "Show on profile": "在个人资料中显示",
                        "Copy share link": "复制共享链接",
                    },
                    'regexp': [],
                    'selector': [
                        ['.selector3', '翻译后的文本3']
                    ]
                }
            }
        }
    };

    /**
     * watchUpdate 函数：监视页面变化，根据变化的节点进行翻译
     */
    function watchUpdate() {
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        let previousURL = location.href;

        new MutationObserver(mutations => {
            const currentURL = location.href;
            if (currentURL !== previousURL) {
                previousURL = currentURL;
                page = getPage();
                console.log(`DOM变化触发: 链接变化 page= ${page}`);
            }

            if (page) {
                const { characterData, ignoreSelectors } = I18N.conf;
                const filteredMutations = mutations.flatMap(({ target, addedNodes, type }) => {
                    let nodes = [];
                    if (type === 'childList' && addedNodes.length > 0) {
                        nodes = Array.from(addedNodes);
                    } else if (type === 'attributes' || (characterData && type === 'characterData')) {
                        nodes = [target];
                    }

                    return nodes.filter(node =>
                        !ignoreSelectors.some(selector => node.parentElement?.closest(selector))
                    );
                });

                filteredMutations.forEach(node => traverseNode(node));
            }
        }).observe(document.body, {
            characterData: true,
            subtree: true,
            childList: true,
            attributeFilter: ['value', 'placeholder', 'aria-label', 'data-confirm']
        });
    }

    /**
     * traverseNode 函数：遍历指定的节点，并对节点进行翻译。
     * @param {Node} node - 需要遍历的节点。
     */
    function traverseNode(node) {
        // 跳过忽略
        const { ignoreId, ignoreTag, reIgnoreClass, reIgnoreItemprop } = I18N.conf;
        const skipNode = node => ignoreId.includes(node.id) ||
                                 ignoreTag.includes(node.tagName) ||
                                 reIgnoreClass.test(node.className) ||
                                 (node.nodeType === Node.ELEMENT_NODE && reIgnoreItemprop.test(node.getAttribute("itemprop")));

        if (skipNode(node)) return;

        if (node.nodeType === Node.ELEMENT_NODE) { // 元素节点处理

            // 处理不同标签的元素属性翻译
            switch (node.tagName) {
                case "RELATIVE-TIME": // 翻译时间元素
                    transTimeElement(node.shadowRoot);
                    return;

                case "INPUT":
                case "TEXTAREA": // 输入框 按钮 文本域
                    if (['button', 'submit', 'reset'].includes(node.type)) {
                        transElement(node.dataset, 'confirm'); // 翻译 浏览器 提示对话框
                        transElement(node, 'value');
                    } else {
                        transElement(node, 'placeholder');
                    }
                    break;

                case "BUTTON":
                    if (/tooltipped/.test(node.className)) transElement(node, 'ariaLabel'); // 翻译 浏览器 提示对话框
                    transElement(node, 'title'); // 翻译 浏览器 提示对话框
                    transElement(node.dataset, 'confirm'); // 翻译 浏览器 提示对话框 ok
                    transElement(node.dataset, 'confirmText'); // 翻译 浏览器 提示对话框 ok
                    transElement(node.dataset, 'confirmCancelText'); // 取消按钮 提醒
                    transElement(node, 'cancelConfirmText'); // 取消按钮 提醒
                    transElement(node.dataset, 'disableWith'); // 按钮等待提示
                    break;

                case "OPTGROUP":
                    transElement(node, 'label'); // 翻译 <optgroup> 的 label 属性
                    break;

                case "A":
                    transElement(node, 'title'); // title 属性
                    if (node.hasAttribute('data-hovercard-type')) return;
                    break;

                default:
                    // 仅当 元素存在'tooltipped'样式 aria-label 才起效果
                    if (/tooltipped/.test(node.className)) transElement(node, 'ariaLabel'); // 带提示的元素，类似 tooltip 效果的
            }

            const childNodes = node.childNodes;
            for (let i = 0; i < childNodes.length; i++) { // 遍历子节点
                traverseNode(childNodes[i]);
            }
        } else if (node.nodeType === Node.TEXT_NODE && node.length <= 500) {
            transElement(node, 'data');
        }
    }

    /**
     * getPage 函数：获取页面的类型。
     * @param {URL object} URL - 需要分析的 URL。
     * @returns {string|boolean} 页面的类型，如果无法确定类型，那么返回 false。
     */
    function getPage(url = window.location) {
        // 站点映射
        const siteMapping = {
            'gist.github.com': 'gist',
            'www.githubstatus.com': 'status',
            'skills.github.com': 'skills'
        };
        const site = siteMapping[url.hostname] || 'github';
        const pathname = url.pathname;

        // 是否登录
        const isLogin = document.body.classList.contains("logged-in");
        // 获取 analytics-location
        const analyticsLocation = document.head.querySelector('meta[name="analytics-location"]')?.content || '';

        // 判断页面类型
        const isOrganization = /\/<org-login>/.test(analyticsLocation) || /^\/(?:orgs|organizations)/.test(pathname);
        const isRepository = /\/<user-name>\/<repo-name>/.test(analyticsLocation);
        const isProfile = document.body.classList.contains("page-profile") || analyticsLocation === '/<user-name>';
        const isSession = document.body.classList.contains("session-authentication");

        let t, page = false;

        if (isSession) {
            page = 'session-authentication';
        } else if (site === 'gist' || site === 'status' || site === 'skills') {
            page = site;
        } else if (isProfile) {
            t = url.search.match(/tab=([^&]+)/);
            page = t ? 'page-profile/' + t[1] : pathname.includes('/stars') ? 'page-profile/stars' : 'page-profile';
        } else if (pathname === '/' && site === 'github') {
            page = isLogin ? 'page-dashboard' : 'homepage';
        } else if (isRepository) {
            t = pathname.match(I18N.conf.rePagePathRepo);
            page = t ? 'repository/' + t[1] : 'repository';
        } else if (isOrganization) {
            t = pathname.match(I18N.conf.rePagePathOrg);
            page = t ? 'orgs/' + (t[1] || t.slice(-1)[0]) : 'orgs';
        } else {
            t = pathname.match(I18N.conf.rePagePath);
            page = t ? (t[1] || t.slice(-1)[0]) : false;
        }

        if (!page || !I18N.lang[lang][page]) {
            console.log(`请注意对应 page ${page} 词库节点不存在`);
            page = false;
        }
        return page;
    }

    /**
     * transTitle 函数：翻译页面标题
     */
    function transTitle() {
        const text = document.title;
        let translatedText = I18N.lang[lang]['title']['static'][text] || '';
        if (!translatedText) {
            const res = I18N.lang[lang]['title'].regexp || [];
            for (let [a, b] of res) {
                translatedText = text.replace(a, b);
                if (translatedText !== text) {
                    break;
                }
            }
        }
        document.title = translatedText;
    }

    /**
     * transTimeElement 函数：翻译时间元素文本内容。
     * @param {Element} el - 需要翻译的元素。
     */
    function transTimeElement(el) {
        const text = el.childNodes.length > 0 ? el.lastChild.textContent : el.textContent;
        const res = I18N.lang[lang]['pubilc']['time-regexp'];

        for (let [a, b] of res) {
            const translatedText = text.replace(a, b);
            if (translatedText !== text) {
                el.textContent = translatedText;
                break;
            }
        }
    }

    /**
     * transElement 函数：翻译指定元素的文本内容或属性。
     * @param {Element|DOMStringMap} el - 需要翻译的元素或元素的数据集 (node.dataset)。
     * @param {string} field - 需要翻译的属性名称或文本内容字段。
     */
    function transElement(el, field) {
        const text = el[field]; // 获取需要翻译的文本
        if (!text) return false; // 当 text 为空时，退出函数

        const translatedText = transText(text); // 翻译后的文本
        if (translatedText) {
            el[field] = translatedText; // 替换翻译后的内容
        }
    }

    /**
     * transText 函数：翻译文本内容
     * @param {string} text - 需要翻译的文本内容
     * @returns {string|boolean} 翻译后的文本内容，如果没有找到对应的翻译，那么返回 false
     */
    function transText(text) {
        const shouldSkip = text => /^[\s0-9]*$/.test(text) || /^[\u4e00-\u9fa5]+$/.test(text) || !/[a-zA-Z,.]/.test(text);
        if (shouldSkip(text)) return false;

        const trimmedText = text.trim();
        const cleanedText = trimmedText.replace(/\xa0|[\s]+/g, ' ');

        let translatedText = I18N.lang[lang][page]['static'][cleanedText] || I18N.lang[lang]['pubilc']['static'][cleanedText];

        if (typeof translatedText === 'string') {
            return text.replace(trimmedText, translatedText);
        }

        if (enable_RegExp) {
            const res = (I18N.lang[lang][page].regexp || []).concat(I18N.lang[lang]['pubilc'].regexp || []);

            for (let [a, b] of res) {
                translatedText = text.replace(a, b);
                if (translatedText !== text) {
                    return text.replace(trimmedText, translatedText);
                }
            }
        }

        return false;
    }

    /**
     * transDesc 函数：为指定的元素添加一个翻译按钮，并为该按钮添加点击事件。
     * @param {string} selector - CSS选择器，用于选择需要添加翻译按钮的元素。
     */
    function transDesc(selector) {
        const element = document.querySelector(selector);
        if (!element || document.getElementById('translate-me')) return false;

        const buttonHTML = `<div id='translate-me' style='color: rgb(27, 149, 224); font-size: small; cursor: pointer'>翻译</div>`;
        element.insertAdjacentHTML('afterend', buttonHTML);
        const button = element.nextSibling;

        button.addEventListener('click', () => {
            const descText = element.textContent.trim();
            if (!descText) return false;

            transDescText(descText, translatedText => {
                button.style.display = "none";
                const translatedHTML = `<span style='font-size: small'>由 <a target='_blank' style='color:rgb(27, 149, 224);' href='https://fanyi.iflyrec.com/text-translate'>讯飞听见</a> 翻译👇</span><br/>${translatedText}`;
                element.insertAdjacentHTML('afterend', translatedHTML);
            });
        });
    }

    /**
     * transDescText 函数：将指定的文本发送到讯飞的翻译服务进行翻译。
     * @param {string} text - 需要翻译的文本。
     * @param {function} callback - 翻译完成后的回调函数，该函数接受一个参数，即翻译后的文本。
     */
    function transDescText(text, callback) {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation",
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://fanyi.iflyrec.com',
            },
            data: JSON.stringify({
                "from": 2,
                "to": 1,
                "type": 1,
                "contents": [{
                    "text": text
                }]
            }),
            responseType: "json",
            onload: (res) => {
                try {
                    const { status, response } = res;
                    const translatedText = (status === 200) ? response.biz[0].sectionResult[0].dst : "翻译失败";
                    callback(translatedText);
                } catch (error) {
                    console.error('翻译失败', error);
                    callback("翻译失败");
                }
            },
            onerror: (error) => {
                console.error('网络请求失败', error);
                callback("网络请求失败");
            }
        });
    }

    /**
     * transBySelector 函数：通过 CSS 选择器找到页面上的元素，并将其文本内容替换为预定义的翻译。
     */
    function transBySelector() {
        const res = (I18N.lang[lang][page]?.selector || []).concat(I18N.lang[lang]['pubilc'].selector || []);

        if (res.length > 0) {
            for (let [selector, translatedText] of res) {
                const element = document.querySelector(selector);
                if (element) {
                    element.textContent = translatedText;
                }
            }
        }
    }

    function registerMenuCommand() {
        const toggleRegExp = () => {
            enable_RegExp = !enable_RegExp;
            GM_setValue("enable_RegExp", enable_RegExp);
            GM_notification(`已${enable_RegExp ? '开启' : '关闭'}正则功能`);
            if (enable_RegExp) {
                location.reload();
            }
            GM_unregisterMenuCommand(id);
            id = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
        };

        let id = GM_registerMenuCommand(`${enable_RegExp ? '关闭' : '开启'}正则功能`, toggleRegExp);
    }

    /**
     * init 函数：初始化翻译功能。
     */
    function init() {
        page = getPage();
        console.log(`开始page= ${page}`);
        const elements = document.querySelectorAll('.to-be-translated');
        setTimeout(() => {
            const element = document.querySelector('.focus-element');
            if (element) {
                element.focus();
            }
        }, 0);
        requestAnimationFrame(() => {
            elements.forEach(element => {
                transElement(element, 'textContent');
            });
        });

        transTitle();

        if (page) traverseNode(document.body);

        watchUpdate();
    }

    document.documentElement.lang = lang;
    new MutationObserver(mutations => {
        if (document.documentElement.lang === "en") {
            document.documentElement.lang = lang;
        }
    }).observe(document.documentElement, {
        attributeFilter: ['lang']
    });

    document.addEventListener('turbo:load', () => {
        if (page) {
            transBySelector();
            if (page === "repository") {
                transDesc(".f4.my-3");
            } else if (page === "gist") {
                transDesc(".gist-content [itemprop='about']");
            }
        }
    });

    registerMenuCommand();
    window.addEventListener('DOMContentLoaded', init);

})(window, document);
