var I18N = {};

I18N.conf = {
    /**
     * 要翻译的页面正则(不含仓库页)
     *
     * 2021-10-07 11:53:34
     * GitHub 网站更新 调整 Class 过滤规则
     * 且过滤 Class 并不是总是生效，增加 PathName 规则补充
     */
    rePageClass: /\b(page-(profile|account|new-repo|create-org)|session-authentication)\b/,

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
    rePagePath: /\/($|signup|login\/oauth|login|sessions?|password_reset|orgs|explore|notifications\/subscriptions|notifications|watching|stars|issues|pulls|search|trending|showcases|new\/(import|project)|import|settings\/(apps\/authorizations|apps|tokens|developers|applications\/new)|settings|installations\/new|marketplace|apps|account\/organizations\/new)/,

    // 仓库路径
    rePagePathRepo: /\/(settings)/,

    // 组织路径
    rePagePathOrg: /\/(settings|billing_managers\/new)/,

    /**
     * 忽略区域的 class 正则
     *
     * 代码编辑器 内容 代码高亮 CodeMirror
     * 代码高亮 blob-code
     * 仓库名和用户名 repo-and-owner (已知出现在：应用安装授权页和设置页 选定仓库)
     * 文件,目录位置栏 |js-path-segment|final-path
     * 文件列表 files js-navigation-container js-active-navigation-container
     * 评论内容等 js-comment-body
     * 文件搜索模式 js-tree-finder-virtual-filter
     * 仓库文件列表 js-navigation-open Link--primary
     * 洞察-->复刻-->仓库列表 network 或 repo
     */
    reIgnoreClass: /(CodeMirror|blob-code|highlight-source-js|repo-and-owner|js-path-segment|final-path|files js-navigation-container|js-comment-body|markdown-title|js-tree-finder-virtual-filter|js-navigation-open Link--primary|network)/,

    /**
     * 忽略区域的 itemprop 属性正则
     * name 列表页 仓库名
     */
    reIgnoreItemprop: /(name)/,

    /**
     * 忽略区域的 特定元素id 正则
     */
    reIgnoreId: /(readme)/,

    /**
     * 忽略区域的 标签 正则
     * /i 规则不区分大小写
     */
    reIgnoreTag: /(code|link|img|table|marked-text)/i,
    // 文件搜索模式 文件列表条目 marked-text
};

I18N.zh = {
    "title": { // 标题翻译
        "static": { // 静态翻译
            "Sign in to GitHub · GitHub": "登录 GitHub · GitHub",
            "Join GitHub · GitHub": "加入 GitHub · GitHub",
            "Forgot your password? · GitHub": "忘记您的密码了吗？· GitHub",
            "Forgot your password?": "忘记您的密码了吗？",
            "GitHub · Where software is built": "GitHub - 软件构建的地方",
            "Create a New Repository": "创建新仓库",
            "Import a Repository": "导入仓库",
            "New Project": "创建项目",
            "Your Repositories": "您的仓库",
            "Your Projects": "您的项目",
            "Your Packages": "您的软件包",
            "Your Profile": "个人资料",
            "Account settings": "帐户设置",
            "Appearance": "外观",
            "Account security": "帐户安全",
            "Email settings": "邮箱设置",
            "Notifications": "通知",
            "Developer settings": "开发者设置",
            "Personal Access Tokens": "个人访问令牌",
            "Register new GitHub App": "注册新 GitHub 应用",
            "Create a new Gist": "创建新代码片段",
            "Discover gists": "探索代码片段",
            "Enable two-factor authentication": "开启双因素身份验证",
            "Manage two-factor authentication": "管理双因素身份验证",
            "Options": "仓库 · 选项",
            "Confirm access": "授权访问",
            "Manage access": "访问管理",
        },
        "regexp": [ // 正则翻译
            [/Commits/, "提交"],
            [/Issues?/, "议题"],
            [/Pull requests/, "拉取请求"],
            [/Actions/, "操作"],
            [/Revisions/,"修订"],
            [/Stargazers/, "追星者"],
            [/Forks/, "复刻"],
            ["_regexp_end", "end"]
        ],
    },

    "pubilc": { // 公共区域翻译
        "static": { // 静态翻译
            // 顶部栏 (未登录)
            "Why GitHub?": "为何选择 GitHub？",
            "Team": "团队",
            "Enterprise": "企业",
            // "Pricing": "价格",
            "Search": "搜索",
            "Sign in": "登录",
            "Sign up": "注册",



            // 搜索栏
            "Search or jump to…": "搜索或跳转到…",
            "In this repository": "当前仓库",
            "In this organization": "当前组织",
            "In this user": "当前用户",
            "All GitHub": "整个 GitHub",
            "Jump to": "跳转到",

            // 顶部栏 & 小屏左上角下拉栏 (已登录)
            "Dashboard": "仪表盘",
            "Pull": "拉取",
            "request": "请求",
            "s": " ",
            //"Pull requests": "拉取请求"
            "Issues": "议题",
            "Marketplace": "应用商城",
            "Explore": "探索",
            "Codespaces": "代码空间",
            "Sponsors": "赞助",

            "Overview": "概况",
            "Repositories": "仓库",
            "Projects": "项目",
            "Packages": "软件包",
            "Sponsoring": "赞助",


            // 右上角通知按钮提示
            "You have no unread notifications": "您没有未读通知",
            "You have unread notifications": "您有未读通知",

            // 右上角新建按钮下拉菜单
            "New repository": "新建仓库",
            "Import repository": "导入仓库",
            "New gist": "新建代码片段",
            "New organization": "新建组织",
            "New project": "新建项目",

            // 右上角个人图标下拉菜单
            "Signed in as": "登录身份为",
            "Set status": "状态设置",
            "Your profile": "我的个人资料",
            "Your repositories": "我的仓库",
            "Your organizations": "我的组织",
            "Your codespaces": "我的代码空间",
            "Your projects": "我的项目",
            "Your stars": "我的标星页面",
            "Your gists": "我的代码片段",
            "Upgrade": "升级",
            "Feature preview": "功能预览",
                // 对话框
                "Enable": "启用",
                "Disable": "禁用",
            "Help": "帮助",
            "Settings": "设置",
            "Sign out": "退出",

            "Stars": "星标",


            "Prev": "上一页",
            "Previous": "上一页",
            "Next": "下一页",


            // 状态设置对话框
            // 出现位置: 个人资料页, Gist 个人主页, 仓库页右上角个人图标下拉菜单
            "Edit status": "编辑状态",
            "What's happening?": "发生了什么？",
            "Busy": "繁忙中",
            "When others mention you, assign you, or request your review, GitHub will let them know that you have limited availability.": "当其他人提及您、指派您或请求您进行评论时，GitHub 会告知他们您的很忙。",
            "Clear status": "清除状态",
            "Never": "永不",
            "Visible to": "可见",
                "Your status will be visible to everyone": "所有人都可以看到您的状态",
                // [/Only members of (\w+.*) will be able to see your status./, "只有 $1 的成员才能看到您的状态。"],
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

            // 评论编辑器翻译
            "Write": "撰写",
            "Preview": "预览",
            "Leave a comment": "发表评论",
            "Write a reply": "发表回复", // 具体讨论页
            "Write a comment": "发表回复", // 具体讨论页
            "Suggest an answer": "建议一个答案", // 具体讨论页
            "Ask a question, start a conversation, or make an announcement": "提出问题、开始讨论或发布公告", // 新建讨论
            "Nothing to preview": "没有什么可预览",
            // 取消按钮 提醒信息
            "Are you sure you want to discard your unsaved changes?": "您确定要放弃未保存的更改吗？",


            "Add header text": "添加标题文本",
            "Add bold text <ctrl+b>": "添加粗体文本 <ctrl+b>",
            "Add italic text <ctrl+i>": "添加斜体文本 <ctrl+i>",
            "Insert a quote <ctrl+.>": "插入引用 <ctrl+.>",
            "Insert a quote <ctrl+shift+.>": "插入引用 <ctrl+shift+.>",
            "Insert code <ctrl+e>": "插入代码 <ctrl+e>",
            "Add a link <ctrl+k>": "添加链接 <ctrl+k>",
            "Add a bulleted list <ctrl+shift+8>": "添加无序列表 <ctrl+shift+8>",
            "Add a numbered list <ctrl+shift+7>": "添加有序列表 <ctrl+shift+7>",
            "Add a numbered list <ctrl+shift+9>": "添加有序列表 <ctrl+shift+9>",
            // "Add a task list": "添加任务列表",
            "Add a task list <ctrl+shift+l>": "添加任务列表 <ctrl+shift+l>",// 具体提交页 进行某条代码评论
            "Directly mention a user or team": "直接提及用户或团队",
            "Attach an image or video": "附加图片或视频",
            "Reference an issue, pull request or discussion": "引用议题，拉取请求或讨论",
            "Reference an issue, pull request, or discussion": "引用议题，拉取请求或讨论",
            "Reference an issue or pull request": "引用议题或拉取请求",
            "Insert a reply": "插入回复",

            "Attach files by dragging & dropping, selecting or pasting them.": "通过拖放，选择或粘贴来附加文件。",
            "Attach files by selecting or pasting them.": "通过选择或粘贴来附加文件。",
            "Styling with Markdown is supported": "支持 Markdown 功能哦。",
            "Uploading your files…": "正在上传您的文件…",

            "Select a reply": "选择回复",
            "Filter replies…": "筛选回复",
            "Default replies": "默认快捷回复",
            "Duplicate issue": "重复议题",
            // "Duplicate of #": "重复 #",
            "Duplicate pull request": "重复拉取请求",
            // "Duplicate of #": "重复 #",
            "Create a new saved reply…": "创建新快捷回复…",

            "Close issue": "关闭议题", // issue页 评论框
            "Close with comment": "评论并关闭议题", // issue页 评论框
            "Close pull request": "关闭拉取请求", // pull页 评论框
            "Comment": "评论",
            "Submit new issue": "提交新议题",
            "Comment on this commit": "评论",
            "Close and comment": "提交并关闭",
            "Reopen and comment": "提交并重新打开",
            "Reopen issue": "重新打开议题", // 具体议题
            "Reopen pull request": "重新打开拉取请求", //具体拉取请求
            "Add single comment": "评论", // 具体提交页 进行某条代码评论
            "Reply": "回复", // 具体讨论页
            "Answer": "答复", // 具体讨论页
            "Start discussion": "开始讨论", // 新建讨论

            // 公共词 高频词
            "Followers": "关注者",
            "Follow": "关注",
            "Unfollow": "取消关注",
            "Star": "星标",
            "Unstar": "已加星标",
            "Fork": "复刻",
            "Save": "保存",
            "Delete": "删除",
            "Cancel": "取消",
            "Edit": "编辑",
            "Added on": "添加于",
            "Loading...": "载入中...",
            "Copied!": "复制成功!",

            "and": "和",
            "or": "或",
            "to": "到",
            "by": "由",

            "Learn more": "了解更多",
            "Learn More": "了解更多",
            "Learn more.": "了解更多。",
            ".": "。",

            // 名词
            "Code": "代码",
            "Pull requests": "拉取请求",
            "Collaborators": "协作者",
            "collaborators": "协作者",

            // 相对时间
            "just now": "刚刚",
            "now": "当前",
            "yesterday": "昨天",
            "last month": "上个月",

            // 状态词
            "Verified": "已验证",
            "Partially verified": "部分验证",
            "Unverified": "未验证",

            // 邮箱验证提示
            "Please verify your email address to access all of GitHub's features.": "请验证您的电子邮件地址以便开启所有 GitHub 功能。",
            "Configure email settings": "修改电子邮件设置",
            "Your email was verified.": "您的邮件地址验证成功！",
        },
        "regexp": [ // 正则翻译 (公共区域正则会二次调用翻译，为了弥补部分翻译的情况)
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
             * 星期, 月 日 年  // 个人访问令牌 有效期
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
             * Tip:
             * 正则中的 ?? 前面的字符 重复0次或1次
             * 正则中的 ?: 非捕获符号(即关闭圆括号的捕获能力) 使用方法 (?: 匹配规则) -->该匹配不会被捕获 为 $数字
             */
            [/(?:on |)(?:(\d{1,2}) |)(?:(Sun|Mon|Tue|Wed|Thu|Fri|Sat), |)(?:(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May(?:)??|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?:,? |$))(\d{4}|)(\d{1,2}|)(?:,? (\d{4})|)/g, function (all, date1, week, month, year1, date2, year2) {
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
                return (year ? year + '年' : '') + monthKey[month.substring(0, 3)] + (date ? date + '日' : '') + (week ? ', ' + weekKey[week] : '');
            }],
            /**
             * 相对时间格式处理
             */
            [/(an?|\d+) (second|minute|hour|day|month|year)s? ago/, function (m, d, t) {
                if (d[0] === 'a') {
                    d = '1';
                } // a, an 修改为 1

                var dt = {second: '秒', minute: '分钟', hour: '小时', day: '天', month: '个月', year: '年'};

                return d + ' ' + dt[t] + '之前';
            }],
        ],
    },

    "page-dashboard": { // 已登录的首页
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
            "Browse interesting repositories": "浏览有趣资料库",
            "on Twitter": "在 Twitter 上",

            "You don’t have any repositories yet!": "您目前还没有任何仓库！",
            "Create your first repository": "创建您的第一个仓库",
            "or": "或者",
            "learn more about Git and GitHub": "学习更多关于 Git 和 GitHub 知识",

            // 已有仓库的项目
            // 左侧栏
            "New": "新建",
            "Find a repository…": "搜索仓库…",
            "Show more": "显示更多",
            "Recent activity": "近期活动",

            "Public": "公共",
            "Private": "私有",
            "Public archive": "公共存档",
            "Private archive": "私有存档",

            // 中间栏
            "One moment please...": "稍等一会儿...",
            "Loading activity...": "载入活动...",
            "All activity": "所有活动",
            // 动态 状态词
            "starred": "星标了",
            "created": "创建了",
            "forked from": "复刻自",
            "forked": "复刻了",
            "from": "自",
            "pushed to": "推送到",
            "released": "发布了",
            "started following you": "开始关注了您",
            "started following": "开始关注了",
            "Updated": "更新于",
            "created a repository": "创建了仓库",
            "Forked to": "复刻为",
            "of": "",

            "Read more": "阅读更多内容",

            "More": "更多",
            "Loading more…": "载入更多…",

            "Subscribe to your news feed": "订阅您的新闻提要",

            // 右侧栏
            "Explore repositories": "探索仓库",
            "Explore more →": "探索更多 →",


            "Switch dashboard context": "切换默认身份",
            "Manage organizations": "管理组织",
            "Create organization": "创建组织",

            // 首次加入组织通知
            "You’ve been added to the": "您已经被添加到",
            "organization!": "组织！",
            "Here are some quick tips for a first-time organization member.": "以下是首次加入组织的一些提示。",
            "Use the switch context button in the upper left corner of this page to switch between your personal context (": "使用页面左上角的切换身份按钮，您可以在(",
            ") and organizations you are a member of.": ")和组织身份之间进行切换。",
            "After you switch contexts you’ll see an organization-focused dashboard that lists out organization repositories and activities.": "当您切换身份，您会看到一个组织为中心的页面，其中列出了组织库和活动。",
        },
        "regexp": [ // 正则翻译
            [/is being deleted./, "正在被删除。"], // 仓库 组织被删除
            [/Your repository \"(\w+.*)\" was successfully deleted./, "您的仓库 “$1” 已成功删除。"], // 仓库删除
            [/(\d+) releases?/, "$1 个发行版"],
            [/(\d+) repositor(y|ies)/, "$1 个仓库"],
            [/(\d+) followers?/, "$1 个关注者"],
            [/(\d+) commits? to/, "$1 个提交到"],
            [/(\d+) more commits? »/, "$1 个更多提交到"],
            [/(\d+) issues? needs? help/, "$1 个议题需要帮助"],
            [/Updated/, "更新于"],
        ],
    },

    "page-profile": { // 个人首页
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
                "Company": "公司",
                "Location": "位置",
                "Website": "网站",
                "Twitter username": "Twitter 用户名",

                // 成就浮动界面
                "Arctic Code Vault Contributor": "北极代码库贡献者",
                "contributed code to several repositories in the": "为多个仓库贡献了代码，在",
                ", and more!": "，更多！",

                // 拉黑 & 举报用户对话框
                // [/Block or report (\w+)/, "拉黑或举报 $1"],
                "Block user": "拉黑用户",
                "Prevent this user from interacting with your repositories and sending you notifications. Learn more about": "防止该用户与您的仓库互动并向您发送通知。了解更多关于",
                "blocking users": "拉黑用户",

                "Unblock user": "取消拉黑",
                "Allow this user to interact with your repositories and send you notifications. Learn more about": "允许该用户与您的仓库互动并向您发送通知。了解更多关于",

                "Report abuse": "举报滥用",
                "Contact GitHub support about this user’s behavior. Learn more about": "就该用户的行为联系 GitHub 支持部门。了解更多关于",
                "reporting abuse": "举报滥用",

            // 概述标签卡 即主页 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "Customize your pins": "自定义置顶",
                // 设置置顶项目对话框
                "Edit pinned items": "设置置顶项目",
                "Select up to six public repositories or gists you’d like to show.": "最多选择 6 个要显示的公共仓库或代码片段。",
                "Filter repositories and gists": "过滤仓库和代码片段",
                "Show:": "显示：",
                "Save pins": "保存置顶",
                // 顶部提醒
                "Your pins have been updated. Drag and drop to reorder them.": "您的置顶已更新。拖放来重新排列它们。",
                // 拖拽排序提醒
                "Order updated.": "置顶已更新。",

                "Pinned": "已置顶",
                "Popular repositories": "流行的仓库",

                // 公共词
                "Public": "公共",
                "Private": "私有",
                "Public archive": "公共存档",
                "Private archive": "私有存档",
                "Public template": "公共模板",

                "Learn how we count contributions": "您想知道如何计算贡献的吗",
                "Less": "更少",
                "More": "更多",
                "Contribution settings": "贡献设置",
                // 贡献设置下拉菜单
                "Private contributions": "私人贡献",
                "Turning on private contributions will show anonymized private activity on your profile.": "开启私人贡献则将在您的个人资料上显示匿名的私人活动。",
                "Visitors will now see your public and anonymized private contributions.": "访客将看到您的公开和匿名的私人贡献。",
                "Turning off private contributions will show only public activity on your profile.": "关闭私人贡献则将仅在您的个人资料中显示公开活动。",
                "Visitors will now see only your public contributions.": "访问者现在只能看到您的公开贡献。",
                "Activity overview": "活动概览",
                "Turning off the activity overview will hide the section on your profile.": "关闭活动概览则将隐藏您的个人资料中的部分内容。",
                "The 'Activity overview' section will no longer appear on your profile.": "“活动概览” 部分将不再出现在您的个人资料中。",
                "Turning on the activity overview will show an overview of your activity across organizations and repositories.": "开启活动概览将显示跨组织和仓库的活动概览。",
                "Others will now see 'Activity overview' when they view your profile.": "其他人在查看您的资料时，现在会看到 “活动概述”。",

                "Contribution activity": "贡献信息",

                "Search by name": "搜索组织名",
                "Contributed to": "贡献给了",
                "Activity in": "活动在",
                "No activity overview available.": "没有可用的活动概览。",

                "open": "打开",
                "closed": "已关闭",
                "merged": "已合并",
                "pull request": "拉取请求",

                "commits": "次提交",
                "comments": "次评论",
                "Commits": "提交",
                "Code review": "代码审查",

                "Created their first repository": "创建了他们的第一个仓库",
                "Created an issue in": "创建一个议题在",
                "Created a pull request in": "创建一个拉取请求在",
                "First repository": "第一个仓库",
                "First pull request": "第一次拉取请求",
                "First issue": "第一次提问",
                "Opened their first issue on GitHub in": "打开了他们第一个议题",
                "Opened their first pull request on GitHub in": "打开了他们第一个议题",
                "Joined GitHub": "刚加入 GitHub",
                //"Show more activity": "显示更多",
                "Show more activity": "加载更多动态",
                "Loading...": "加载中...",

                "Seeing something unexpected? Take a look at the": "看到了一些意想不到的东西？请看一下",
                "GitHub profile guide": "GitHub 个人资料指南",

            // 仓库标签卡 ?tab=repositories >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

                // "Search repositories…": "搜索这些查库…",
                // "Search starred repositories…": "搜索点赞的仓库…",

                // 搜索, 筛选 & 排序工具栏
                "Find a repository…": "搜索仓库…",
                "Type": "类型",
                    // 下拉菜单
                    "Select type": "选择类型",
                    "All": "全部",
                    "Public": "公共",
                    "Private": "私有",
                    "Sources": "源码",
                    "Forks": "复刻",
                    "Archived": "存档",
                    "Mirrors": "镜像",
                "Language": "语言",
                    // 下拉菜单
                    "Select language": "选择语言",
                    "All languages": "所有语言",
                "Sort": "排序",
                    // 下拉菜单
                    "Select order": "选择排序",
                    "Last updated": "最近更新",
                    // "Name": "仓库名",
                    // "Recently starred": "最近关注的",
                    // "Recently active": "最近活动的",
                    // "Most stars": "最多赞的",
                    // "Unstar": "取消点赞",
                "New": "新建",

                // 筛选结果
                "results for": "结果在",
                "public": "公共",
                "private": "私有",
                "source": "源码",
                "forked": "复刻",
                "archived": "存档",
                "mirror": "镜像",
                "repositories matching": "仓库的匹配",
                "results for repositories matching": "结果在匹配的仓库",
                // "repositories sorted by": "仓库，排序按",
                "written in": "使用语言",
                "results for repositories written in": "",
                "sorted by": "，排序按",
                "last updated": "最近更新",
                "name": "仓库名",
                "stars": "星标",

                "Clear filter": "清除筛选",

                // [/\(w+) doesn’t have any repositories that match./, "$1 没有任何匹配的仓库"],

                // 项目 状态词
                "Updated": "更新于",
                "Forked from": "复刻自",

            // 项目标签卡 ?tab=projects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "Sort by": "排序方式",
                    // 排序下拉菜单
                    "Newest": "最新",
                    "Oldest": "最早",
                    "Recently updated": "近期更新内容",
                    "Least recently updated": "最近最少更新",
                // 清楚筛选
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

            // 软件包标签卡 ?tab=packages >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "Get started with GitHub Packages": "开始使用 GitHub 软件包",
                "Safely publish packages, store your packages alongside your code, and share your packages privately with your team.": "安全地发布包，将您的包与您的代码一起存储，并与您的团队私下共享您的包。",
                "Choose a registry": "选择一个注册表",

            // 赞助标签卡 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                // [/is sponsoring/, "正在赞助"],
                "organization or developer:": "个组织或开发者：",

            // 星标标签卡 ?tab=stars >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "Filters": "过滤",
                    // 过滤下拉菜单
                    "Find repositories…": "搜索仓库…",
                    "Recently starred": "最近关注的",
                    "Recently active": "最近活动的",
                    "Most stars": "最多赞的",
                    "Languages": "语言",

                //筛选结果
                // "Clear filter": "清除筛选",

            //>>>>>>>>>>>>>>>>>> 组织主页 <<<<<<<<<<<<<<<<<<<<<
                // [/doesn't have any pinned public repositories yet./, "还没有任何置顶的公共仓库。"],

                "People": "成员",
                "Teams": "团队",

                // 右侧栏
                    // "People": "成员",
                        "This organization has no public members. You must be a member to see who’s a part of this organization.": "该组织没有公共成员。您必须是成员才能查看谁是该组织的成员。",
                        "Invite someone": "邀请他人",
                            // 邀请对话框
                            // [/Invite a member to/, "邀请成员加入"],
                            "Search by username, full name, or email address": "搜索用户名, 全名, 邮箱地址：",
                            "Invite": "邀请",
                            "Invite a billing manager": "邀请一位计费经理",
                    "Top languages": "热门语言",
                        "Loading…": "载入中…",
                    "Most used topics": "最常用的话题",
                    "Developer Program Member": "开发者计划成员",

                "This organization has no repositories.": "该组织暂无仓库。",
                "Create a new repository": "创建新仓库",
                "View all repositories": "查看所有仓库",

                // 设置置顶
                "Select up to six public repositories you’d like to show.": "最多选择 6 个您要显示的公共仓库。",
                "No repositories or gists found.": "没有发现仓库或 Gists。",
                // 顶部提醒
                "You’re not a member of any teams in this organization.": "您不是该组织中任何团队的成员。",
            // 成员标签页 https://github.com/orgs/<orgs-name>/people
                "Organization permissions": "组织权限",
                "Members": "成员",
                "Outside collaborators": "外部合作者",
                "Pending collaborators": "待定合作者",
                "Pending invitations": "待定邀请",
                "Failed invitations": "失败的邀请",

                "Find a member…": "搜索成员…",

                "Export": "导出",
                "Invite member": "邀请成员",

                "Filter by two-factor authentication": "按双因素身份验证筛选",
                "Everyone": "所有人",
                "Enabled": "禁用",
                "Disabled": "启用",

                "Role": "角色",
                "Filter by role": "筛选角色",
                "Owners": "所有者",

                "Organization visibility": "组织可见性",
                "Your membership is visible to everyone and is displayed on your public profile.": "您的成员资格对所有人都是可见的，并显示在您的个人资料上。",
                "Your membership is only visible to other members of this organization.": "您的成员资格只对本组织的其他成员可见。",

                "Owner": "所有者",
                "Owners have full access to teams, settings, and repositories.": "所有者拥有对团队、设置和仓库的完全访问权限。",
                // [/0 teams/, ""],

                "Manage": "管理",
                "Convert to outside collaborator": "转为外部合作者",
                "Remove from organization": "从组织移除",

                "This organization has no public members.": "该组织没有公开的成员。",

            // 项目标签页 https://github.com/orgs/<orgs-name>/projects
                "There aren't any public projects yet": "该组织没有公共项目。",

            // https://github.com/orgs/maboloshi-inuyasha/teams
        },
        "regexp": [ // 正则翻译
            [/(\d+) discussions? answered/, "$1 个讨论已回答"], // 高光时刻
            [/Block or report (\w+)/, "拉黑或举报 $1"],
            [/(\d+) GitHub Archive Program/, "$1 GitHub 存档计划"], // 成就浮动款
            [/(\d+) remaining/, "$1 剩余"], // 置顶项目 剩余
            [/(\w+.*) doesn't have any public repositories yet./, "$1 暂未有任何公共仓库。"],
            [/([\d,]+) contributions? in the last year/, "在过去的一年中贡献 $1 次"],
            [/([\d,]+) contributions? in (\d+) in (\w+.*)/, "在 $2 年中向 $3, 贡献 $1 次"],
            [/([\d,]+) contributions? in (\d+)/, "在 $2 年中贡献 $1 次"],
            [/(\d+) contributions? in private repositories?/, "私人仓库 $1 个贡献"],
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
            [/Started (\d+) discussion in (\d+) repositor(y|ies)/, "在 $2 个仓库中发起了 $1 个讨论"],
            [/(\d+) commits?/, "$1 次提交"],
            [/(\d+) pull requests?/, "$1 次拉取请求"],
            [/that received (\d+) comments?/  , "收到 $1 条评论"],
            [/(\d+) of (\d+) tasks?/, "$1 / $2 个任务"],
            [/(\d+) comments?/, "$1 条评论"],
            [/(\d+) tasks? done/, "$1 个任务完成"],
            [/(\w+) doesn't have any projects yet./, "$1 目前还没有任何项目。"],
            [/(\w+) has no activity yet for this period./, "$1 目前还没有活动。"],
            [/(\w+) had no activity during this period./, "$1 在此期间没有活动。"],
            [/Contribution activity in (\w+.*)/, "在 $1 中的贡献活动"],
            [/(\w+) had no activity in (\w+.*) during this period./, "在此期间，$1 在 $2 中没有活动。"],
            [/(\w+) has no activity in (\w+.*) yet for this period./, "在此期间，$1 在 $2 中没有活动。"],
            [/([\d,]+) Open/, "$1 打开"], // 项目标签卡
            [/([\d,]+) Closed/, "$1 已关闭"],
            // 组织页面
            [/\((\d+) issues? need help\)/, "($1 个议题需要帮助）"],
            [/doesn’t have any public projects./, "没有任何公共项目。"],
            [/doesn't have any pinned public repositories yet./, "还没有任何置顶的公共仓库。"],
            [/Invite a member to/, "邀请成员加入"],
        ],
    },

    "page-account": { // 个人设置 = /settings
        "static": { // 静态翻译
            "Your personal account": "我的个人帐户",
            "Switch to another account": "切换到另一个帐户", // 存在组织时
            "Go to your personal profile": "去我的个人资料",
            // 左侧菜单
            // "Settings": "设置",
            "Account settings": "帐户设置",
            "Profile": "个人资料",
            "Account": "帐户",
            "Appearance": "外观",
            "Account security": "帐户安全",
            "Billing & plans": "计费 & 计划",
            "Security log": "安全日志",
            "Security & analysis": "安全 & 分析",
            "Sponsorship log": "赞助日志",
            "Emails": "电子邮箱",
            "Notifications": "通知",
            "Scheduled reminders": "定时提醒",
            "SSH and GPG keys": "SSH 与 GPG 公钥",
            // "Repository": "仓库"
            "Packages": "软件包",
            "Pages": "GitHub Pages",
            "Organizations": "组织",
            "Saved replies": "快捷回复",
            "Applications": "应用",
            "Developer settings": "开发者设置",
            "Moderation settings": "审查设置",
            "Blocked users": "黑名单",
            "Interaction limits": "互动限制",
            "Code review limits": "代码审查限制",

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
                "Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.": "您的名字可能会出现在 GitHub 上，您的贡献或被提及的地方。您可以在随时删除它。",
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
                "other users and organizations to link to them.": "关联其他用户和组织。",
                "URL": "网站",
                "Twitter username": "Twitter 用户名",
                "Company": "公司",
                "your company’s GitHub organization to link it.": "关联您所在公司的 GitHub 组织。",
                 //"your company's GitHub organization to link it.": "贵公司和GitHub的组织联系起来。",
                "Location": "地址",
                "All of the fields on this page are optional and can be deleted at any time, and by filling them out, you're giving us consent to share this data wherever your user profile appears. Please see our": "此页面上的所有字段都是可选的，可以随时删除，填写这些字段，即表示您同意我们在您的个人资料出现的任何地方共享此数据。请参阅我们的",
                "privacy statement": "隐私声明",
                "to learn more about how we use this information.": "以了解更多关于我们如何使用这些信息。",
                "Update profile": "更新资料",
                // 顶部提醒
                    "Profile updated successfully": "资料更新成功。",

                "Profile settings": "个人资料设置",
                "Display Pro badge": "显示 Pro 徽章",
                "Display Arctic Code Vault badge": "显示北极代码库徽章",
                "This will display the": "这将显示",
                "Arctic Code Vault Contributor": "北极代码库贡献者",
                "badge on your public profile page.": "徽章在您的个人资料页面。",
                "Update preferences": "更新设置",
                    // 顶部提醒
                    "Visitors will now see your public and anonymized private contributions.": "访客现在将看到您的公开和匿名的私人贡献。",
                    "Visitors will now see only your public contributions.": "访客现在将只看到您的公开贡献。",

                "Contributions": "贡献",
                "Include private contributions on my profile": "在我的个人资料显示私人贡献",
                "Get credit for all your work by showing the number of contributions to private repositories on your profile without any repository or organization information.": "显示所有包括私人仓库的贡献到您的个人资料页面，不包括仓库或组织信息。",
                "Learn how we count contributions": "查看如统计贡献",
                "Update contributions": "更新贡献",

                "GitHub Developer Program": "GitHub 开发者计划",
                "Building an application, service, or tool that integrates with GitHub?": "构建应用程序、服务或工具，集成到 GitHub 吗？",
                "Join the GitHub Developer Program": "加入 GitHub 开发者计划",
                ", or read more about it at our": "，或了解更多信息在我们的",
                "Developer site": "开发者站点",
                "Check out the Developer site": "查看开发者网站，",
                "for guides, our API reference, and other resources for building applications that integrate with GitHub. Make sure your contact information is up-to-date below. Thanks for being a member!": "了解指南、我们的 API 参考和其他用于构建与 GitHub 集成的应用程序的资源。请确保您的联系信息是最新的。感谢您成为我们的会员！",

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
                "tab.": "选项页。",

                "Export account data": "导出帐户数据",
                "Export all repositories and profile metadata for": "导出所有仓库和配置元数据，自",
                ". Exports will be available for 7 days.": "。导出结果将有 7 天有效期。",
                "Start export": "开始导出",
                "Recent exports": "近期导出",
                "New export": "新建导出",
                "New exports cannot be requested while an export is currently in progress": "当前正在导出中，无法请求新的导出",
                "Resend email with link": "重新发送带有链接的邮件",
                "Download deleted": "导出内容已删除",
                "Job queued to delete file.": "正在排队删除文件的作业。",
                "We're preparing your export! we'll send you an email when it's finished.": "我们正在为您准备导出！我们完成后会发一封电子邮件。",

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
                    "transfer ownership": "转移所有权",
                    "delete": "删除",
                    "these organizations before you can delete your user.": "这些组织，您才可以删除您的用户。",
                "Delete your account": "删除帐户",
                "Are you sure you don’t want to just": "您确定不希望仅仅是",
                "downgrade your account": "降级您的帐户",
                "to a": "为",
                "FREE": "免费",
                "account? We won’t charge your payment information anymore.": "帐户吗？我们不会再收取您的付款信息。",
                    "Are you sure you want to do this?": "您确定要这么做吗？",
                    "This is extremely important.": "这是极其重要的。",
                    "We will": "我们将",
                    ", along with all of your forks, wikis, issues, pull requests, and GitHub Pages sites.": "以及您所有的复刻、维基、议题、拉取请求和 GitHub Pages 站点。",
                    "You will no longer be billed, and your username will be available to anyone on GitHub.": "您将不再被收取费用，并且您的用户名将被 GitHub 上的任何人使用。",
                    "For more help, read our article \"": "如需更多帮助，请阅读我们的文章 “",
                    "Deleting your user account": "删除您的帐户",
                    "\".": "”。",
                    "Your username or email:": "您的用户名或电子邮箱：",
                    "To verify, type": "为了验证，请输入",
                    "below:": "在下面：",
                    "Confirm your password:": "确认您的密码：",
                    "Cancel plan and delete this account": "取消计划并删除此帐户",

            // Appearance 外观 https://github.com/settings/appearance
                "Theme preferences": "主题偏好",
                "Choose how GitHub looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.": "选择 GitHub 在您眼中的样子。选择单一主题，或与您的系统同步并自动在白天和夜晚的主题之间切换。",
                "Theme mode": "主题模式",
                    "Single theme": "单一主题",
                    "Sync with system": "与系统同步",
                "GitHub will use your selected theme": "GitHub 将使用您选择的主题",
                "GitHub theme will match your system active settings": "GitHub 主题将匹配您的系统设置",
                "Default light": "亮 - 默认",
                "Default dark": "暗 - 默认",
                "Dark dimmed": "昏暗",
                "Dark high contrast": "暗 - 高对比",
                "Dark colorblind": "暗 - 色盲友好",
                "Light colorblind": "亮 - 色盲友好",
                "Day theme": "日间主题",
                "Night theme": "夜间主题",
                "Active": "激活",
                "This theme will be active when your system is set to “light mode”": "当您的系统设置为 “灯光模式” 时，该主题将被激活。",
                "This theme will be active when your system is set to “dark mode”": "当您的系统设置为 “暗夜模式” 时，该主题将被激活。",

                "Emoji skin tone preference": "表情符号肤色偏好",
                "Preferred default emoji skin tone": "默认的表情符号肤色",

                "Tab size preference": "制表符偏好",
                "Choose the number of spaces a tab is equal to when rendering code": "在渲染代码时，选择一个制表符等于多少个空格",
                "8 (Default)": "8 (默认)",

                "Markdown editor font preference": "Markdown 编辑器字体首选项",
                "Font preference for plain text editors that support Markdown styling (e.g. pull request and issue descriptions, comments.)": "支持 Markdown 样式的纯文本编辑器的字体首选项（例如拉取请求和议题描述、评论。）",
                "Use a fixed-width (monospace) font when editing Markdown": "编辑 Markdown 时使用固定宽度（等宽）字体",

            // Account security 帐户安全 https://github.com/settings/security
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

                // 双因素身份验证
                // 顶部提醒
                "Two-factor authentication successfully disabled.": "成功禁用两因素身份验证。",

                "Two-factor authentication": "双因素身份验证",
                "Two factor authentication is not enabled yet.": "尚未启用两因素身份验证。",
                "Enable two-factor authentication": "启用双因素身份验证",

                "Enable": "启用",
                "Enabled": "启用",
                "Disable": "停用",
                "Add": "添加",
                "Added": "添加",
                "Two-factor methods": "双因素验证方式",
                "Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to sign in.": "双因素身份验证不仅仅要求密码登录，还为您的帐户增加了一层额外的安全性。",
                "Authenticator app": "身份验证器应用",
                "Security keys": "安全密钥",
                "Security keys are hardware devices that can be used as your second factor of authentication.": "安全密钥是硬件设备，可以作为您的第二认证因素。",
                "SMS number": "手机号码",
                "Recovery options": "恢复选项",
                "Recovery codes": "恢复码",
                "Recovery codes can be used to access your account in the event you lose access to your device and cannot receive two-factor authentication codes.": "恢复码可用于在您无法访问设备且无法接收双因素身份验证码的情况下访问您的帐户。",
                "Downloaded": "已下载",
                "Show": "显示",
                "Fallback SMS number": "备用手机号码",
                "Providing a fallback SMS number will allow GitHub to send your two-factor authentication codes to an alternate device if you lose your primary device.": "如果您丢失主要设备，提供备用手机号码将允许 GitHub 将您的双因素身份验证码发送到备用设备。",
                "Recovery tokens": "恢复令牌",
                "Account recovery with Facebook is a simple way to recover your account.": "使用 Facebook 恢复帐户是一种恢复帐户的简单方法。",
                "Configured": "已配置",
                "Not configured": "未配置",
                "No security keys": "未配置安全密钥",
                "Viewed": "查看于",
                "No fallback SMS number": "未设置备用手机号码",
                "No recovery tokens": "未设置恢复令牌",

                "Sessions": "会话",
                "This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.": "这是已登录您帐户的设备列表。 撤销任何您不认识的会话。",
                "See more": "查看更多",
                "Your current session": "您当前的会话",
                "Last accessed on": "最后访问日期：",
                "Session details": "会话详情",
                "Revoke session": "撤销会话",
                "Device:": "设备：",
                "Last location:": "最后的位置：",
                "Signed in:": "登录：",
                "View all sessions": "查看所有会话",

            // Billing & plans 计费 & 计划 https://github.com/settings/billing
                "Personal billing": "个人帐单",
                "Current monthly bill": "当前月度帐单",
                "Switch to yearly billing": "转为按年计费",
                "Next payment due": "下一次到期的付款",
                "View payment history": "查看付款记录",
                "Payment information": "支付信息",
                "Update payment method": "更新付款方式",
                "Manage spending limit": "管理支出限额",
                "Redeem coupon": "兑换优惠券",
                "Current plan": "当前计划",
                "Compare all plans": "比较所有计划",
                //"GitHub Free": "GitHub 免费",
                "The basics for all developers": "基础计划（所有开发者）",
                "Unlimited public/private repos": "无限的公共/私人仓库",
                "Unlimited collaborators": "无限协作者",
                "2,000 Actions minutes/month": "2,000 次操作 分钟/月",
                "500MB of Packages storage": "500MB 的包存储空间",
                "Community support": "社区支持",
                "Usage this month": "本月使用情况",
                "Get usage report": "获取使用报告",
                "GitHub Sponsors": "GitHub 赞助",
                "Connect with the community that builds the tools you use": "与构建您使用的工具的社区联系",
                "Start sponsoring": "开始赞助",
                "You’re currently not sponsoring anyone.": "您目前没有赞助任何人。",
                "Learn more about GitHub Sponsors": "了解更多关于 GitHub 赞助",
                "Change plan": "更改计划",
                "Cancel plan": "取消计划",
                "Do you have any questions? Contact": "对话框您有任何问题吗？请联系",

                // "Billing overview": "财务信息",
                // "Plan": "方案",
                // "Free": "免费",
                // "Change plan": "修改计划",
                // "Cancel plan": "取消计划",
                // "per month for": "每月 -",
                // "Learn more about Git LFS": "什么是 Git LFS (大文件存储)？",
                // "Purchase more": "购买更多",
                // "Billing cycle": "结算周期",
                // "Bandwidth": "带宽",
                // "Bandwidth quota resets every billing cycle": "带宽配额每个周期重置",
                // "Storage": "存储",
                // "Payment": "支付方式",
                // "No payment method on file.": "没有设置支付方式",
                // "Add payment method": "添加支付方式",
                // "Payment history": "支付记录",
                // "Amounts shown in USD": "以美元显示",

            // https://github.com/settings/billing/payment_information
                "/ Payment information": "/ 付款信息",
                "Billing Information": "帐单信息",
                "Address": "地址",
                "Payment method": "付款方法",
                "Add Information": "添加信息",
                "You have not added a payment method.": "您尚未添加付款方式。",
                "Last payment": "最后一次付款",
                "You have not made any payments.": "您尚未支付任何款项。",
                "Coupon": "优惠劵",
                "Redeem a coupon": "兑换优惠券",
                "You don’t have an active coupon.": "您没有有效的优惠券。",
                "Additional Information": "附加信息",
                "Add information": "添加信息",
                "No additional information added to your receipts.": "您的收据上没有添加任何额外的信息。",

            // Security log 安全日志 https://github.com/settings/security-log
                "Filters": "过滤",
                "Search your security log": "搜索您的安全日志",
                "Export": "导出",
                "Recent events": "最近的事件",

            // Security & analysis 安全 & 分析 https://github.com/settings/security_analysis
                "Configure security and analysis features": "配置安全和分析功能",
                "Security and analysis features help keep your repositories secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your repositories.": "安全和分析功能有助于确保您的仓库安全和更新。通过启用这些功能，您授予我们对您的仓库执行只读分析的权限。",
                "Disable all": "禁用全部",
                "Enable all": "启用全部",
                "Dependency graph": "依赖关系图",
                "Understand your dependencies.": "了解您的依赖项。",
                "Automatically enable for new private repositories": "为新私有仓库自动启用",
                //"": "Dependabot 警报",
                "Be alerted when a new vulnerability is found in one of your dependencies.": "在您的依赖项中发现新漏洞时收到警报。",
                "Automatically enable for new repositories": "为新仓库自动启用",
                "Dependabot security updates": "Dependabot 安全更新",
                "Easily upgrade to non-vulnerable dependencies.": "轻松升级到无漏洞的依赖项。",

            // Sponsorship log 赞助日志 https://github.com/settings/sponsors-log
                "Sponsors log": "赞助日志",
                "New sponsorships, changes, and cancellations": "新的赞助、更改和取消",
                "Period:": "周期：",
                "Filter activity": "过滤活动",
                "All-time": "所有时间",
                "Past Day": "过去一天",
                "Past Week": "过去一周",
                "Past Month": "过去一月",
                "Past Year": "过去一年",
                "No sponsorship activity in this time period": "这段时间没有赞助活动",
                "This is where you can review activity from your sponsorships.": "您可以在此处查看您的赞助活动。",

            // Emails 电子邮箱 https://github.com/settings/emails
                "Email settings": "电子邮箱设置",
                "Primary": "主帐户",
                "This email will be used for account-related notifications and can also be used for password resets.": "该电子邮箱将用于与帐户有关的通知，也可用于密码重置。",
                "Not visible in emails": "在电子邮件中不可见",
                "Receives notifications": "接收通知",
                "This email address is the default used for GitHub notifications, i.e., replies to issues, pull requests, etc.": "该电子邮箱默认用于 GitHub 的通知，即对议题和拉取请求的回复，等等。",
                "At least one email is required.": "至少需要一个电子邮箱。",
                "Are you sure you want to remove this email from your account? Once removed, commits attributed to this email address will no longer be associated with your account. One of your other emails will become your primary address.": "您确定要从您的帐户中删除此电子邮箱吗？删除后，归因于该电子邮箱地址的提交将不再与您的帐户相关联。您的其他电子邮箱之一将成为您的主要地址。",

                "Add email address": "添加电子邮箱",
                "Email address": "电子邮箱",
                "Resend verification email": "重新发送验证邮件",
                "Your email was verified.": "您的电子邮箱已被验证。",
                "Primary email address": "主电子邮箱",
                "Because you have email privacy enabled,": "因为您已经启用了电子邮箱隐私，",
                "will be used for account-related notifications as well as password resets.": "将用于与帐户相关的通知以及密码重置。",
                "will be used for web-based Git operations, e.g., edits and merges.": "将用于基于 Web 的 Git 操作，例如编辑和合并。",
                "Your primary email was changed to": "您的主电子邮箱已更改为",
                ". Your default notification email address is still set to": "。您的默认通知电子邮箱仍然设置为",
                ". Would you like to update that as well?": "。您也想更新它吗？",
                "Yes， update my notification email": "是的，更新我的通知电子邮箱",
                "Backup email address": "备用电子邮箱",
                "Your backup GitHub email address will be used as an additional destination for security-relevant account notifications and can also be used for password resets.": "您的备用 GitHub 电子邮箱将额外的用作安全相关帐户通知，也可以用于密码重置。",
                "Allow all verified emails": "允许所有已验证的电子邮箱",
                "Only allow primary email": "仅允许主电子邮箱",
                "Please add a verified email, in addition to your primary email, in order to choose a backup email address.": "请在您的主电子邮箱之外，添加一个经验证的电子邮箱，以便选择一个备用电子邮箱。",
                "All verified emails can now be used for password resets.": "所有已验证的电子邮箱现在均可用于密码重置。",
                "Keep my email addresses private": "保持我的电子邮箱地址的私密性",
                "We’ll remove your public profile email and use": "我们将删除您的公开个人资料中的电子邮箱，并使用",
                "when performing web-based Git operations (e.g. edits and merges) and sending email on your behalf. If you want command line Git operations to use your private email you must": "执行基于 Web 的 Git 操作（例如编辑和合并）并以您的名义发送电子邮件。如果您想在命令行 Git 操作中使用您的私人电子邮箱，您必须",
                "set your email in Git": "在 Git 中设置您的电子邮箱",
                "Commits pushed to GitHub using this email will still be associated with your account.": "使用此电子邮箱推送到 GitHub 的提交仍将与您的帐户相关联。",
                "Your primary email address is now public. to select which email to display on your profile, visit": "您的主电子邮箱现在是公开的。要选择在您的个人资料上显示的电子邮箱，请访问",
                "Profile settings.": "个人资料设置。",
                "Your primary email address is now private. If you previously made your email public, we’ve removed it from your profile.": "您的主电子邮箱现在是私密的。如果您以前公开了您的电子邮箱，我们已经从您的个人资料中删除了它。",
                "Block command line pushes that expose my email": "阻止在命令行推送中暴露我的电子邮箱",
                "When you push to GitHub, we’ll check the most recent commit. If the author email on that commit is a private email on your GitHub account, we will block the push and warn you about exposing your private email.": "当您推送到 GitHub 时，我们会检查最近的提交。如果该提交的作者电子邮箱是您 GitHub 帐户上的私人电子邮箱，我们会阻止推送并警告您不要暴露您的私人电子邮箱。",
                "Commits pushed with a private email will no longer be blocked.": "使用私人电子邮箱推送的提交将不再被阻止。",
                "Commits pushed with a private email will now be blocked and you will see a warning.": "使用私人电子邮箱推送的提交将被阻止，您会看到一个警告。",
                "Email preferences": "邮件首选项",
                "Receive all emails, except those I unsubscribe from.": "接收所有的邮件，除了那些我取消订阅的邮件。",
                "We’ll occasionally contact you with the latest news and happenings from the GitHub Universe.": "我们会不定期地联系您，告诉您来自 GitHub 宇宙的最新消息和发生的事情。",
                "Only receive account related emails, and those I subscribe to.": "仅接收帐户相关的邮件，以及我订阅的邮件。",
                "We’ll only send you legal or administrative emails, and any emails you’re specifically subscribed to.": "我们仅向您发送法律或行政邮件，以及您特别订阅的任何邮件。",
                "Save email preferences": "保存邮件首选项",
                "Successfully updated your email preferences.": "成功更新了您的邮件首选项。",
                "Looking for activity notification controls? Check the": "正在寻找活动通知控制？请检查",
                "Notification center": "通知中心",

            // Notification center 通知 https://github.com/settings/notifications
                //"How you receive notifications": "通知设置",
                "Choose how you receive notifications. These notification settings apply to the": "选择接收通知的方式。这些通知设置适用于",
                "things you’re watching": "您正在关注的内容",
                "Automatic watching": "自动关注",
                "When you’re given push access to a repository, automatically receive notifications for it.": "当您给一个仓库推送权限时，自动接收相关通知。",
                "Automatically watch repositories": "自动关注仓库",
                "When you’re added to or join a team, automatically receive notifications for that team’s discussions.": "当您被添加或加入团队时，会自动接收该团队讨论的通知。",
                "Automatically watch teams": "自动关注团队",
                "Participating": "参与话题",
                "Notifications for the conversations you are participating in, or if someone cites you with an": "通知您正在参与的对话，或者如果有人",
                "When you participate in a conversation or someone brings you in with an": "当有人",
                //"@mention": "@您",
                "Email": "电子邮件",
                "Web and Mobile": "网站 和 移动设备",
                "Watching": "关注仓库",
                "Notifications for all repositories, teams, or conversations you’re watching.": "所有您正在关注的仓库、团队或对话的通知。",
                // "Updates to any repositories or threads you’re watching.": "当您关注的仓库更新时。",
                // "Your notification settings apply to the": "通知设置将应用到",
                // "repositories you’re watching": "您关注的仓库",
                // "Notification email": "接收通知的邮箱",
                // "Primary email address": "主邮箱地址",
                // "Save": "保存",
                "Dependabot alerts": "Dependabot 警报",
                "When you’re given access to": "当您获得",
                ", automatically receive notifications when a new vulnerability is found in one of your dependencies.": " 访问权限时，当您的某个依赖关系中发现新的漏洞时，就会自动收到通知。",
                "UI alerts": "用户界面警报",
                "UI alerts display warnings in a repository’s file and code views.": "在仓库的文件和代码视图中显示警告。",
                "Command Line": "命令行",
                "Command Line alerts display warnings as a callback when you push to a repository with vulnerabilities.": "当您推送到存在漏洞的仓库时，命令行将发出警告。",
                "Web": "网站",
                "Receive security alert notifications via email": "通过电子邮件接收安全警报通知",
                "Email each time a vulnerability is found": "每次发现漏洞时发送电子邮件",
                "Email a digest summary of vulnerabilities": "发送漏洞摘要电子邮件",

                "Actions": "操作",
                "Notifications for workflow runs on repositories set up with": "仓库的工作流程通知，设置在",
                "GitHub Actions": "",
                "Send notifications for failed workflows only": "只为失败的工作流程发送通知",

                "Email notification preferences": "邮件通知偏好",
                "Default notification email": "默认通知电子邮箱",
                "Save": "保存",
                "Choose which email updates you receive on conversations you’re participating in or watching": "选择您要收到正在参与或关注的对话中的邮件更新",
                "Comments on Issues and Pull Requests": "关于议题和拉取请求的评论",
                "Pull Request reviews": "拉取请求审核",
                "Pull Request pushes": "拉取请求推送",
                "Include your own updates": "包括您自己的更新",

                "Custom routing": "自定义",
                "You can send notifications to different": "您可以发送通知到不同的",
                "verified": "经验证",
                "email addresses depending on the organization that owns the repository.": "的电子邮箱，根据拥有仓库的组织。",

            // SSH and GPG keys SSH 与 GPG 公钥 https://github.com/settings/keys
                "SSH keys": "SSH 密钥",
                "New SSH key": "新建 SSH 密钥",
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
                "Learn how to": "了解如何",
                "generate a GPG key and add it to your account": "生成 GPG 密钥并将其添加到您的帐户",
                "Vigilant mode": "警戒模式",
                "Flag unsigned commits as unverified": "将未签名的提交标记为未验证",
                "This will include any commit attributed to your account but not signed with your GPG or S/MIME key.": "这将包括任何归属于您的帐户但没有用您的 GPG 或 S/MIME 密钥签名的提交。",
                "Note that this will include your existing unsigned commits.": "请注意，这将包括您现有的未签名的提交。",
                "Learn about vigilant mode": "了解警戒模式",
                "/ Add new": "/ 新添",
                "Title": "标题",
                "Key": "密钥",
                "Add SSH key": "添加 SSH 密钥",
                "Key is invalid. You must supply a key in OpenSSH public key format": "密钥无效。您必须提供 OpenSSH 公钥格式的密钥",
                "We got an error doing that.": "我们在这样做时出错了。",
                "Add GPG key": "添加 GPG 密钥",
                "Are you sure you want to delete this SSH key?": "您确定要删除此 SSH 密钥吗？",
                "This action": "该操作",
                "cannot": "不能",
                "be undone. This will permanently delete the SSH key and if you’d like to use it in the future, you will need to upload it again.": "被撤销。这将永久地删除 SSH 密钥，如果您想在未来使用它，您将需要再次上传它。",
                "I understand, please delete this SSH key": "我明白了，依然删除该 SSH 密钥",
                "Are you sure you want to delete this GPG key?": "您确定要删除此 GPG 密钥吗？",
                "be undone. This will permanently delete the GPG key, and if you’d like to use it in the future, you will need to upload it again.": "被撤销。这将永久地删除 GPG 密钥，如果您想在未来使用它，您将需要再次上传它。",
                "Any commits you signed with this key will become unverified after removing it.": "删除后，您使用此密钥签名的任何提交都将变成未验证。",
                "I understand, delete this GPG key": "我明白了，依然删除该 GPG 密钥",
                "Okay, you have successfully deleted that key.": "好的，您已成功删除该密钥。",

            // Repository 仓库 https://github.com/settings/repositories
                "Repository default branch": "仓库默认分支",
                "Choose the default branch for your new personal repositories. You might want to change the default name due to different workflows, or because your integrations still require “master” as the default branch name. You can always change the default branch name on individual repositories.": "为您新的个人仓库选择默认的分支。由于工作流程的不同，或者由于您的集成仍然需要 “master” 作为默认分支名，您可能想改变默认名称。您可以随时改变个人仓库的默认分支名称。",
                "Learn more about default branches.": "了解有关默认分支的更多信息。",
                "Update": "更新",
                "Deleted repositories": "删除的仓库",

            // 删除的仓库 https://github.com/settings/deleted_repositories
                "It may take up to an hour for repositories to be displayed here. You can only restore repositories that have no forks or have not been forked.": "仓库可能需要一个小时的时间才能显示在这里。您只能恢复没有复刻或没有被复刻的仓库。",

            // Packages 软件包 https://github.com/settings/deleted_packages
                "Deleted Packages": "删除软件包",
                "These are packages that have been previously deleted belonging to you. You can restore a package deleted within the last 30 days.": "这些是先前已删除的属于您的软件包。您可以恢复在过去 30 天内删除的包。",
                "Search deleted packages": "搜索已删除的软件包",

            // GitHub Pages https://github.com/settings/pages
                "Verified domains": "经过验证的域名",
                "Add a domain": "添加域名",
                "There are no verified domains.": "暂无经过验证的域名",
                "Verify domains to restrict who can publish GitHub Pages on them.": "验证域名以限制谁可以在上面发布 GitHub Pages。",

            // Organizations 组织 https://github.com/settings/organizations
                "You are not a member of any organizations.": "您暂无任何组织。",

                "owner": "所有者",
                "Leave": "离开",

                "Transform account": "帐户变更",
                "You cannot transform this account into an organization until you leave all organizations that you’re a member of.": "在您离开您所属的所有组织之前，您无法将此帐户转换为组织。", // 存在所属组织时
                "Account transformation warning": "帐户变更警告",
                "What you are about to do is an irreversible and destructive process. Please be aware:": "这将是一个不可逆转的过程，请确认：",
                "Any user-specific information (OAuth tokens, SSH keys, Job Profile, etc) will be erased": "任何用户特定的信息（OAuth 令牌, SSH 密钥, 职位简介, 等）将被删除。",
                "create a new personal account": "创建一个新的个人帐户",
                "The total amount of collaborators across private repositories will be the total amount of seats for the organization": "创建一个新的个人帐户",

            // Saved replies 快捷回复 https://github.com/settings/replies
                "Saved replies are re-usable text snippets that you can use throughout GitHub comment fields. Saved replies can save you time if you’re often typing similar responses.": "快捷回复是可重复使用的文本片段，您可以在整个 GitHub 评论区使用。如果您经常输入类似的回复，快捷回复可以节省您的时间。",
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

            // Applications 应用 https://github.com/settings/installations
                "Installed GitHub Apps": "安装的 GitHub 应用",
                "GitHub Apps augment and extend your workflows on GitHub with commercial, open source, and homegrown tools.": "GitHub 应用通过商业、开源和自主开发的工具来增强和扩展您在 GitHub 上的工作流程。",
                "Configure": "配置",

            // https://github.com/settings/apps/authorizations
                "Authorized GitHub Apps": "授权的 GitHub 应用",
                "No authorized applications": "无授权申请",
                "You have no applications authorized to access your account.": "您没有授权访问您的帐户的应用程序。",
                "Authorized OAuth Apps": "授权的 OAuth 应用",

            // https://github.com/settings/applications
                "You have granted": "您已经授权",
                "access to your account.": "访问您的帐户。",
                "Revoke all": "撤销全部",
                "Sort": "排序",
                "Sort by": "排序方式",
                "Alphabetical": "按字母排列",
                "Recently used": "最近使用的",
                "Least recently used": "最近使用最少的",

                "Last used within the last week · Owned by": "最后一次使用是最近 1 周之内 · 作者",

                // 撤销对话框
                "Are you sure you want to revoke authorization?": "您确定要撤销授权吗？",
                "I understand, revoke access": "我明白了，依然撤销访问",

                // 全部撤销对话框
                "Are you sure you want to revoke access for all applications?": "您确定要撤销对所有应用程序的访问权限吗？",
                "This will revoke access for": "这将撤销访问",
                "all third-party": "所有第三方",
                "OAuth applications. This action cannot be undone.": "OAuth 应用程序。此操作无法撤消。",
                "Any SSH keys created on your behalf by applications will also be deleted.": "任何由应用程序代表您创建的 SSH 密钥也将被删除。",
                "Type your username to confirm.": "输入您的用户名进行确认。",
                "I understand, revoke access for everything": "我明白了，依然撤销对一切的访问",

                // 举报滥用对话框
                "Report Abuse": "举报滥用",
                "More options": "更多选项",
                "Revoking will deny future access to your account": "撤销授权，将拒绝今后访问您的帐户",

            // https://github.com/settings/installations/id
                "Installed": "安装于",
                "Developed by": "开发者",
                "Permissions": "权限",
                "Repository access": "仓库访问权限",
                "All repositories": "所有仓库",
                "This applies to all current": "这适用于所有当前",
                "and": "和",
                "future repositories.": "未来的仓库。",
                "Only select repositories": "仅选定的仓库",
                "Select repositories": "选择仓库",
                "Search for a repository": "搜索仓库",

                "Danger zone": "危险区",
                "Suspend your installation": "暂停使用",
                "This will block the app access to your resources.": "这将阻止应用访问您的资源。",
                "Suspend": "暂停",
                "This will remove the app and revoke access to all resources.": "这将删除应用并撤销对所有资源的访问权限。",
                "Uninstall": "卸载",


                "Report abuse": "举报滥用",
                "Revoke": "撤销",
                "Read more about connecting with third-party applications at": "了解更多关于与第三方应用程序连接的信息，请访问",
                "GitHub Help": "GitHub 帮助",

            // Blocked users 黑名单 https://github.com/settings/blocked_users
                "Block a user": "拉黑用户",
                "Blocking a user prevents the following on all your repositories:": "拉黑用户可以防止所有仓库中的以下操作：",
                "opening or commenting on issues or pull requests": "打开或评论问题或拉取请求",
                "starring, forking, or watching": "加星标、复刻、关注",
                "adding or editing wiki pages": "添加或编辑 Wiki 页面",
                "Additionally, blocked users are not able to:": "此外，被拉黑用户无法：",
                "invite you as a collaborator to their repositories": "邀请您作为其仓库的协作者",
                "follow your account’s public activity": "关注您的帐户的公共活动",
                "send you notifications by @mentioning your username in public repositories": "在公共仓库中通过 @您 向您发送通知",
                "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
                    "Learn more about blocking a user": "了解更多有关拉黑用户的信息",
                "Block user": "拉黑用户",
                "You have not blocked any users.": "您还没有拉黑任何用户。",
                "Unblock": "取消拉黑",
                "Warn me when a blocked user is a prior contributor to a repository": "请警告我，当被拉黑的用户是仓库的先前贡献者时",
                "On repositories you haven’t contributed to yet, we’ll warn you when a user you’ve blocked has previously made contributions.": "在您还没有贡献的仓库里，当您拉黑的用户之前有贡献时，我们会警告您。",

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
                "6 months": "6个月",
                // 顶部提醒
                "User interaction limit settings saved.": "用户交互限制设置已保存。",

            // Code review limits 代码审查限制 https://github.com/settings/code_review_limits
                "Restrict users who are permitted to approve or request changes on pull requests in your public repositories.": "限制那些有权批准或请求更改公共仓库中拉取请求的用户。",
                "Code review limits may already be specified by individual repositories. Any changes here will override those limits until unset.": "代码审查限制可能已经由各个仓库指定。此处的任何更改都将覆盖这些限制，直至取消设置。",
                "Code review limits are currently managed individually for all repositories. Enable limits to permit only users who have explicitly been granted access to each repository to submit reviews that \"approve\" or \"request changes\". Remove limits to allow all users to submit pull request reviews. All users able to submit comment pull request reviews will continue to be able to do so.": "目前，所有仓库代码审查限制都是单独管理的。启用限制，只允许明确授予每个仓库访问权的用户提交 “批准” 或 “请求更改” 的审查。删除限制，允许所有用户提交拉取请求审查。所有能够提交评论拉取请求审查的用户将继续能够这样做。",
                "Limit reviews on all repositories": "限制对所有仓库的审查",
                "Remove review limits from all repositories": "取消对所有仓库的审查限制",

            // 启用双因素身份验证 https://github.com/settings/two_factor_authentication/setup/intro
                // 提示
                "You’re about to change your two-factor authentication device. This will invalidate your current two-factor devices and recovery codes. This will not affect your fallback SMS configuration. It can be updated on the two-factor settings page.": "您即将更改双因素身份验证设备。这将使您当前的双因素设备和恢复码失效。这不会影响您的备用 SMS 配置。它可以在双因素设置页面上更新。",
                // 第1步
                "Two-factor authentication (2FA) is an extra layer of security used when logging into websites or apps.": "双因素身份验证 (2FA) 是登录网站或应用程序时使用的额外安全层。",
                "Set up using an app": "使用应用程序进行设置",
                "Use an application on your phone to get two-factor authentication codes when prompted. We recommend using cloud-based TOTP apps such as:": "出现提示时，使用手机上的应用程序获取两步验证码。我们建议使用基于云的 TOTP 应用程序，例如：",
                ", or": " 或",
                "Set up using SMS": "使用短信设置",
                "GitHub will send you an SMS with a two-factor authentication code when prompted. SMS cannot be delivered in all countries. Check that": "GitHub 会在出现提示时向您发送带有两步验证码的短信。短信无法在所有国家/地区发送。请检查一下",
                "your country is supported": "您所在的国家/地区是否受支持，",
                "before you select this option.": "在选择此选项之前。",
                "Continue": "继续",

                // 第2步 app
                "Authentication verification": "认证验证",
                "Scan the image below with the two-factor authentication app on your phone. If you can’t use a QR code,": "使用手机上的双因素身份验证应用扫描下面的图像。如果您无法使用二维码，",
                "enter this text code": "输入此文本代码",
                "Your two-factor secret": "您的双因素秘钥",
                "instead.": "代替。",
                "Enter the six-digit code from the application": "输入应用程序中的六位数代码",
                "After scanning the QR code image, the app will display a six-digit code that you can enter below.": "扫描二维码图像后，应用程序将显示一个六位数代码，您可以在下方输入。",
                "Two-factor code verification failed. Please try again.": "两因素代码验证失败。请再试一次。",

                // 第2步 SMS
                "We will send authentication codes to your mobile phone during sign in.": "我们会在您登录时向您的手机发送验证码。",
                "Country code": "国家代码",
                "Phone number": "手机号码",
                "Authentication codes will be sent here.": "验证码将发送到此手机号码。",
                "Send authentication code": "发送验证码",
                "Enter the six-digit code sent to your phone": "输入发送到您手机上的六位数代码",
                "It may take a minute to arrive.": "可能需要一分钟才能到达。",

                // 第3步
                "Save your recovery codes": "保存您的恢复码",
                "Download": "下载",
                "Why is saving you recovery codes important?": "为什么保存您的恢复码很重要？",
                "If you lose access to your phone, you can authenticate to GitHub using your recovery codes. We recommend saving them with a secure password manager.": "如果您无法访问手机，可以使用恢复码向 GitHub 进行身份验证。我们建议使用安全的密码管理器保存它们。",
                "I have saved my recovery codes": "我已经保存了我的恢复码",

                // 第4步
                "Two-factor authentication activated": "两步验证已激活",
                "The next time you login from an unrecognized browser or device, you will need to provide a two-factor authentication code.": "下次从无法识别的浏览器或设备登录时，您需要提供一个两步验证码。",
                "Done": "完成",

            // 管理双因素身份验证 https://github.com/settings/two_factor_authentication/configure
                "Two-factor authentication is currently on": "目前两因素身份验证启用中",
                "Disable two-factor authentication": "禁用两因素身份验证",
                "Recover accounts elsewhere": "在别处恢复帐户",
                "GitHub can": "GitHub 可以",
                "store a recovery token with another provider": "将恢复令牌存储在另一个提供商处",
                ". This can be used to help verify your identity if you get locked out of your account.": " 如果您的帐户被锁定，这可以用来帮助验证您的身份。",
                "Recover your GitHub account with:": "使用以下恢复您的 GitHub 帐户：",
                // 恢复码
                "GitHub Support cannot restore access to accounts with two-factor authentication enabled for security reasons,": "出于安全原因，GitHub 支持部门无法恢复已启用双因素身份验证的帐户的访问，",
                "saving your recovery codes in a safe place can help keep you from being locked out of your account": "将您的恢复码保存在一个安全的地方，可以帮助您避免您的帐户被锁定",
                "View recovery codes": "查看恢复码",
                // 备用手机
                "For security reasons, GitHub Support cannot restore access to accounts with two-factor authentication enabled. If you lose access to both your primary device and your recovery keys, a backup SMS number can get you back in to your account.": "出于安全原因，GitHub 支持部门无法恢复对启用了双因素身份验证的帐户的访问。如果您无法访问主设备和恢复密钥，一个备用手机号码可以让您重新访问您的帐户。",
                "Add fallback SMS number": "添加备用手机号码",
                // 添加备用手机号码对话框
                "Please note that SMS deliverability is only available in": "请注意，短信送达仅适用于",
                "certain countries": "某部分国家/地区",
                "Set fallback": "设置备用手机号码",

                // 交付选项
                "Delivery options": "交付选项",
                "Your primary delivery method is:": "您的主要交付方式是：",
                "authenticator application": "验证器应用",
                "Reconfigure two-factor authentication": "重新配置两因素身份验证",
                // 安全密钥
                "Security keys can be used as your second factor of authentication instead of a verification code.": "安全密钥可用作您的第二个身份验证因素，而不是验证码。",
                "about configuring a security key.": "关于配置安全密钥。",
                "Register new security key": "注册新安全密钥",
                "Enter a nickname for this security key": "输入安全密钥的昵称",
                "Waiting for security key": "等待安全密钥",
                "Follow your browsers steps to register your security key with Github": "按照浏览器的步骤，向 Github 注册安全密钥",

                "Back to settings": "返回设置",

            // 查看恢复码 https://github.com/settings/auth/recovery-codes
                "Two-factor recovery codes": "双因素恢复码",
                "Treat your recovery codes with the same level of attention as you would your password! We recommend saving them with a password manager such as": "像对待密码一样重视您的恢复码！我们建议使用密码管理器保存它们，例如",
                "Put these in a safe spot.": "将恢复码放在安全的地方。",
                "If you lose your device and don’t have the recovery codes you will lose access to your account.": "如果您丢失了设备并且没有恢复码，您将无法访问您的帐户。",
                "Print": "打印",
                "Copy": "复制",
                "Generate new recovery codes": "生成新的恢复码",
                "When you generate new recovery codes, you must download or print the new codes. Your old codes won’t work anymore.": "当您生成新的恢复码时，您必须下载或打印新恢复码。您的旧恢复码将失效。",

        },
        "regexp": [ // 正则翻译
            // 帐户 /settings/admin
            [/is available\./, "可用。"],
            [/Username (\w+) is not available\. Please choose another\. To submit a trademark claim, please see our/, "用户名 $1 不可用。请重新选择一个。要提交商标索赔，请看我们的"],
            [/By clicking \"Add Successor\" below, I acknowledge that I am the owner of the([^@]+@[^\n]+) account, and am authorizing GitHub to transfer content within that account to my GitHub Successor,/, "通过点击下面的 \"添加继任者\"，我承认我是 $1 帐户的所有者，并授权 GitHub 将该帐户内的内容转移给我的 GitHub 继任者。"],
            [/immediately delete all of your repositories \((\d+)\)/, "立即删除您所有的仓库（$1个）"],
            // Emails 页面
            [/This email will not be used as the 'from' address for web-based Git operations, e\.g\., edits and merges. We will instead use ([^@]+@users.noreply.github.com)\./, "此电子邮件不会用作基于 Web 的 Git 操作（例如编辑和合并）的 “发件人” 地址。我们将改为使用 $1。"],
            [/Your primary email was changed to ([^@]+@[^\n]+)\./, "您的主电子邮箱已更改为 $1"],
            //  仓库
            [/(\d+) collaborators/, "$1 协作者"],
            [/No recoverable repositories were found for (\w+)\./, "没有找到 $1 的可恢复仓库。"],
            // 组织 页面
            [/Turn (\w+) into an organization/, "变更 $1 为一个组织"],
            // /settings/apps/authorizations
            [/You will no longer be able to sign in to (\w+) \(all administrative privileges will be bestowed upon the owners you choose\)/, "您将无法再登录 $1（所有管理权限都将授予您选择的所有者）"],
            [/Any commits credited to (\w+) will no longer be linked to this GitHub account/, "任何属于 $1 的提交将不再关联到这个 GitHub 帐户"],
            [/If you are using (\w+) as a personal account, you should/, "如果您正在使用 $1 作为个人帐户，您应"],
            [/before transforming (\w+) into an organization./, "在转化 $1 组织之前。"],
            // 软件库
            [/No recoverable packages were found for (\w+)./, "没有找到 $1 的可恢复包。"],
            [/(\d+) applications?/, "$1 个应用"],
            // /settings/applications
            [/(\w+) will no longer be able to access your GitHub account. You cannot undo this action./, "$1 将无法再访问您的 GitHub 帐户。您无法撤消此操作。"],
            [/(\w+) has been revoked from your account./, "$1 已经从您的帐户中被撤销了。"],
            [/Last used within the last (\d+) weeks? · Owned by/, "最后一次使用是最近 $1 周之内 · 作者"],
            [/Last used within the last (\d+) months? · Owned by/, "最后一次使用是最近 $1 月之内 · 作者"],
            [/Reporting (\w+.*) will contact Support about abuse on the application./, "举报 $1 将就应用程序滥用问题联系支持人员。"],
            [/Revoke (\w+)/, "撤销 $1"],
            [/Report (\w+)/, "举报 $1"],
            // /settings/installations/5478903
            [/Selected (\d+) repositor(y|ies)./, "选择了 $1 个仓库。"],
            [/Uninstall "(\w+)"/, "卸载 “$1”"],
            // /settings/billing
            [/You've cancelled your subscription to (\w+.*)\. This plan change will take effect on (\d{4}-\d{2}-\d{2})./, "您已取消订阅 $1 。此计划更改将于 $2 生效。"],
        ],
    },

    "settings/apps": {
        "static": { // 静态翻译
            // GitHub 应用程序 https://github.com/settings/apps
                "Want to build something that integrates with and extends GitHub?": "想要构建与 GitHub 集成和扩展的东西吗？",
                "Register a new GitHub App": "注册新的 GitHub 应用程序",
                "New GitHub App": "新 GitHub 应用程序",
                "to get started developing on the GitHub API. You can also read more about building GitHub Apps in our": "，开始在 GitHub API 上进行开发。您还可以在我们的文档中阅读有关构建 GitHub 应用程序的更多信息",
                "developer documentation": "开发者文档",

            // 注册 GitHub 应用程序 https://github.com/settings/apps/new
                "Register new GitHub App": "注册新 GitHub 应用",
                "GitHub App name": "GitHub 应用名称",
                "The name of your GitHub App.": "您的 GitHub 应用的名称。",
                "Markdown supported": "支持 Markdown 语法",
                "This is displayed to users of your GitHub App": "展示给 GitHub 应用的使用者",
                "Homepage URL": "主页地址",
                "The full URL to your GitHub App’s website.": "GitHub 应用网站的主页地址",
                "Identifying and authorizing users": "识别并授权用户",
                "The full URL to redirect to after a user authorizes an installation.": "用户授权安装后重定向到的完整地址。",
                "Add Callback URL": "添加回调地址",
                "Callback URL": "回调地址",
                "Expire user authorization tokens": "用户授权令牌",
                "This will provide a": "这将提供一个",
                "which can be used to request an updated access token when this access token expires.": "，用于在此访问令牌到期时，请求更新访问令牌。",
                "Request user authorization (OAuth) during installation": "在安装期间请求用户授权 (OAuth)",
                "Requests that the installing user grants access to their identity during installation of your App": "请求用户在安装应用期间授予其身份访问权限。",
                "Identifying and authorizing users for GitHub Apps documentation": "关于 GitHub 应用程序识别并授权用户的文档",
                "Post installation": "安装完成后",
                "Setup URL (optional)": "设置网址 (可选)",
                "Users will be redirected to this URL after installing your GitHub App to complete additional setup.": "用户在安装完 GitHub 应用后，会被重定向到这个网址，以完成额外的设置。",
                "Redirect on update": "更新时重定向",
                "Redirect users to the 'Setup URL' after installations are updated (E.g. repositories added/removed).": "在安装后更新时将用户重定向到 “设置网址”（例如: 添加/删除仓库）。",
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
                "SSL verification": "SSL 验证",
                "By default, we verify SSL certificates when delivering payloads.": "默认情况下，我们在交付有效负载时验证 SSL 证书。",
                "Enable SSL verification": "启用 SSL 验证",
                "Disable": "禁用",
                "(not recommended)": "（不推荐）",
                "Access:": "访问权限：",
                "Select an access level": "选择访问级别",
                "No access": "禁止访问",
                "Read-only": "只读",
                "Read & write": "读写",
                "Repository permissions": "仓库权限",
                "Actions": "操作",
                "Workflows, workflow runs and artifacts.": "工作流程、工作流程的运行和工件。",
                "Administration": "管理",
                "Repository creation, deletion, settings, teams, and collaborators.": "仓库创建、删除、设置、团队和协作者。",
                "Checks": "检查",
                "Checks on code.": "检查代码。",
                "Content references": "内容引用",
                "Get notified of content references, and create content attachments.": "获取有关内容引用的通知，并创建内容附件。",
                "Contents": "内容",
                "Repository contents, commits, branches, downloads, releases, and merges.": "仓库内容、提交、分支、下载、发布和合并。",
                "Deployments": "部署",
                "Deployments and deployment statuses.": "部署和部署状态。",
                "Discussions": "讨论",
                "Discussions and related comments and labels.": "讨论及相关评论和标签。",
                "Environments": "环境",
                "Manage repository environments.": "管理仓库环境。",
                "Issues": "议题",
                "Issues and related comments, assignees, labels, and milestones.": "议题及相关评论、受理人、标签和里程碑。",
                "Metadata": "元数据",
                "Search repositories, list collaborators, and access repository metadata.": "搜索仓库、列出协作者，访问仓库元数据。",
                "Organization packages": "组织软件包",
                "Packages": "软件包",
                "Packages published to the GitHub Package Platform.": "发布软件包到 GitHub Package 平台。",
                "Pages": "",
                "Retrieve Pages statuses, configuration, and builds, as well as create new builds.": "检索页面状态、配置和构建，以及创建新的构建。",
                "Pull requests": "拉取请求",
                "Pull requests and related comments, assignees, labels, milestones, and merges.": "拉取请求及相关评论、受让人、标签、里程碑和合并。",
                "Webhooks": "Web 钩子",
                "Manage the post-receive hooks for a repository.": "管理仓库的接收后钩子。",
                "Projects": "项目",
                "Manage repository projects, columns, and cards.": "管理仓库项目、栏目和卡片。",
                "Secret scanning alerts": "隐私扫描警报",
                "View and manage secret scanning alerts.": "查看和管理隐私扫描警报。",
                "Secrets": "隐私",
                "Manage repository secrets.": "管理仓库隐私。",
                "Security events": "安全事件",
                "View and manage security events like code scanning alerts.": "查看和管理安全事件，如代码扫描警报。",
                "Single file": "单个文件",
                "Manage just a single file.": "只管理单个文件。",
                "Commit statuses": "提交状态",
                "Commit statuses.": "提交状态。",
                "Dependabot alerts": "Dependabot 警报",
                "Retrieve Dependabot alerts.": "检索 Dependabot 警报。",
                "Workflows": "工作流程",
                "Update GitHub Action workflow files.": "更新 GitHub Actions 工作流程文件。",
                "Organization permissions": "组织权限",
                "Members": "成员",
                "Organization members and teams.": "组织成员和团队。",
                "Manage access to an organization.": "管理对组织的访问。",
                "Events": "活动",
                "View events triggered by an activity in an organization.": "查看组织中某项活动所触发的事件。",
                "Manage the post-receive hooks for an organization.": "管理组织的接收后钩子。",
                "Plan": "计划",
                "View an organization's plan.": "查看组织的计划。",
                "Manage organization projects, columns, and cards.": "管理组织项目、栏目和卡片。",
                "Manage organization secrets.": "管理组织隐私",
                "Self-hosted runners": "自托管运行器",
                "View and manage Actions self-hosted runners available to an organization.": "查看和管理组织可用的'操作自托管运行器'。",
                "Blocking users": "拉黑用户",
                "View and manage users blocked by the organization.": "查看和管理被组织拉黑的用户。",
                "Team discussions": "团队讨论",
                "Manage team discussions and related comments.": "管理团队讨论及相关评论。",
                "User permissions": "用户权限",
                "These permissions are granted on an individual user basis as part of the": "这些权限是在个人用户的基础上授予的，作为",
                "User authorization flow": "用户授权流程",
                ". They will be also be displayed during account installation for transparency.": "。它们也将在帐户安装期间显示以确保透明度。",
                "Block another user": "拉黑其他用户",
                "View and manage users blocked by the user.": "查看和管理被用户拉黑的用户。",
                "Email addresses": "电子邮箱地址",
                "Manage a user's email addresses.": "管理用户的电子邮箱地址。",
                "A user's followers": "用户的关注者",
                "Create and modify a user's gists and comments.": "创建和修改用户的代码片段和评论。",
                "GPG keys": "GPG 密钥",
                "View and manage a user's GPG keys.": "查看和管理用户的 GPG 密钥。",
                "Interaction limits": "交互限制",
                "Interaction limits on repositories": "仓库的交互限制",
                "Git SSH keys": "Git SSH 密钥",
                "View a user's plan.": "查看用户的计划。",
                "Profile": "个人信息",
                "Manage a user's profile settings.": "管理用户的个人信息设置。",
                "Starring": "星标",
                "List and manage repositories a user is starring.": "列出和管理用户已加星标的仓库。",
                "Watching": "订阅",
                "List and change repositories a user is subscribed to.": "列出和更改用户订阅的仓库。",
                "Subscribe to events": "订阅事件",
                "Based on the permissions you’ve selected, what events would you like to subscribe to?": "根据您选择的权限，您想订阅哪些事件？",
                "Meta": "元",
                "When this App is deleted and the associated hook is removed.": "当该应用被删除和相关的钩子被删除时。",
                "Security advisory": "安全提示",
                "Security advisory published, updated, or withdrawn.": "发布、更新或撤销的安全提示",
                "Where can this GitHub App be installed?": "这款 GitHub 应用可以安装在哪里？",
                "Only on this account": "仅在当前帐户",
                "Only allow this GitHub App to be installed on the": "只允许该 GitHub 应用被安装在",
                "account.": "帐户。",
                "Any account": "任何帐户",
                "Allow this GitHub App to be installed by any user or organization.": "允许任何用户或组织安装此 GitHub 应用。",
                "Create GitHub App": "创建 GitHub 应用",

            // OAuth 应用程序 https://github.com/settings/developers
                "No OAuth applications": "没有 OAuth 应用程序",
                "OAuth applications are used to access the GitHub API.": "OAuth 应用程序用于访问 GitHub API。",
                "Read the docs": "阅读文档",
                "to find out more.": "以了解更多情况。",
                "Register a new application": "注册新 OAuth 应用程序",

            // 注册 OAuth 应用 https://github.com/settings/applications/new
                "Register a new OAuth application": "注册 OAuth 应用",
                "Application name": "应用名",
                "Something users will recognize and trust.": "让用户识别和信任。",
                //"Homepage URL": "主页地址",
                "The full URL to your application homepage.": "您的应用主页地址。",
                "Application description": "应用描述",
                "Application description is optional": "应用描述 (可选)",
                "This is displayed to all users of your application.": "所有用户都能看到您的应用描述。",
                "Authorization callback URL": "认证回调地址",
                "Your application’s callback URL. Read our": "您的应用授权回调地址。阅读我们",
                "OAuth documentation": "OAuth 文档",
                //"for more information": "。",
                "Register application": "注册应用",

            // 开发者设置/个人访问令牌 https://github.com/settings/tokens
                "Developer settings": "开发者设置",
                "GitHub Apps": "GitHub 应用程序",
                "OAuth Apps": "OAuth 应用程序",
                "Personal access tokens": "个人访问令牌",
                "Generate new token": "生成新令牌",
                "Revoke all": "全部撤销",
                "Tokens you have generated that can be used to access the": "生成令牌用于访问",
                "Expires": "有效期至",
                "Expired": "有效期至",
                "This token has no expiration date": "此令牌未设置有效期",
                "Regenerate": "重新生成",
                "this token to take advantage of the": "此令牌使用",
                "new token formats": "新的令牌格式",
                "Personal access tokens function like ordinary OAuth access tokens. They can be used instead of a password for Git over HTTPS, or can be used to": "个人访问令牌的功能类似于普通的 OAuth 访问令牌。它们可以用来代替 HTTPS 上 Git 的密码，或者可以用来",
                "authenticate to the API over Basic Authentication": "通过 ‘基本身份验证’ 对 API 进行身份验证",

                "Never used": "尚未使用",
                "Last used within the last week": "最后一次使用是最近 1 周之内",

                // 全部撤销对话框
                "Are you sure you want to revoke access for all personal access tokens?": "对话框您确定要撤销所有个人访问令牌的访问权限吗？",
                "This will revoke access for": "这将撤销访问",
                "all personal access tokens": "所有个人访问令牌",
                ", but will not revoke access for any authorized third-party OAuth applications. This action cannot be undone.": "，但不会撤销任何授权第三方 OAuth 应用程序的访问权限。此操作无法撤消。",
                "Any SSH keys created on your behalf by personal access tokens will also be deleted.": "任何由个人访问令牌代表您创建的 SSH 密钥也将被删除",
                "Type your username to confirm": "输入您的用户名进行确认",
                "I understand, revoke access for everything": "我明白了，依然撤销对一切的访问",

            // 创建新个人访问令牌 https://github.com/settings/tokens/new
                "New personal access token": "新的个人访问令牌",
                "Note": "备注",
                    "Note can't be blank": "备注不能为空",
                "What’s this token for?": "这个令牌有什么用？",

                "Expiration": "有效期",
                "This token expires": "该令牌有效期至",
                ". To set a new expiration date, you must": "。要设置一个新的有效期，您必须",

                // 有效期 下拉菜单
                "7 days": "7天",
                "30 days": "30天",
                "60 days": "60天",
                "90 days": "90天",
                "Custom...": "自定义...",
                "No expiration": "无有效期",
                "The token will never expire!": "此令牌永不过期！",
                // "Beep bop! Tokens that live forever are scary. Expiration dates are highly recommended!": "哔哔！永不过期的令牌是可怕的。强烈建议设置有效期！",
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
                "Access user email addresses (read-only)": "访问用户电子邮件地址（只读）",
                "Follow and unfollow users": "关注和取消关注用户",
                "Delete repositories": "删除仓库",
                "Read and write team discussions": "读写团队讨论",
                "Read team discussions": "读取团队讨论",
                "Full control of enterprises": "完全控制企业",
                "Manage enterprise runners and runner-groups": "管理企业运行人员和运行人员小组",
                "Read and write enterprise billing data": "读写企业计费数据",
                "Read enterprise profile data": "读取企业个人数据",
                "Full control of public user GPG keys": "完全控制公共用户 GPG 密钥",
                "(Developer Preview)": "（开发者预览版）",
                "Write public user GPG keys": "写入公共用户 GPG 密钥",
                "Read public user GPG keys": "读取公共用户 GPG 密钥",
                "Generate token": "生成令牌",
                    // 顶部提醒
                    "Some of the scopes you’ve selected are included in other scopes. Only the minimum set of necessary scopes has been saved.": "您选择的一些作用域包含在其他作用域中。只保存了必要作用域的最小集合。",

                "Make sure to copy your personal access token now. You won’t be able to see it again!": "确保立即复制您的个人访问令牌。您将无法再看到它！",

                "Are you sure you want to delete this token?": "您确定要删除此令牌吗？",
                "Any applications or scripts using this token will no longer be able to access the GitHub API. You cannot undo this action.": "任何使用此令牌的应用程序或脚本将无法再访问 GitHub API。您无法撤消此操作。",
                "I understand, delete this token": "我明白了，依然删除该令牌。",

            // 编辑个人访问令牌 https://github.com/settings/tokens/ID号
                "Edit personal access token": "编辑个人访问令牌",
                "If you’ve lost or forgotten this token, you can regenerate it, but be aware that any scripts or applications using this token will need to be updated.": "如果您丢失或忘记了此令牌，则可以重新生成它，但请注意，需要更新使用此令牌的任何脚本或应用程序。",
                "This token has no expiration date. To set a new expiration date, you must": "此令牌未设置有效期。要设置新的有效期，您必须",
                "regenerate the token": "重新生成令牌",
                "Update token": "更新令牌",
                "Delete personal access token": "删除个人访问令牌",
                "Delete this token": "删除令牌",

            // 重新生成个人访问令牌 https://github.com/settings/tokens/ID号/regenerate
                "Regenerate personal access token": "重新生成个人访问令牌",
                "Submitting this form will generate a new token. Be aware that any scripts or applications using this token will need to be updated.": "提交此表单将产生一个新的令牌。请注意，任何使用该令牌的脚本或应用程序将需要更新。",
                "Regenerate token": "重新生成令牌",

        },
        "regexp": [ // 正则翻译
            // 开发者设置/个人访问令牌 settings/apps
            [/The token will expire/, "该令牌有效期至"],
            [/Last used within the last (\d+) weeks?/, "最后一次使用是最近 $1 周之内"],
            [/Last used within the last (\d+) months?/, "最后一次使用是最近 $1 月之内"],
        ],
    },

    "page-new-repo": {// 新建仓库
        "static": { // 静态翻译
            // 新建仓库 https://github.com/new
                "Create a new repository": "创建新仓库",
                "A repository contains all project files, including the revision history. Already have a project repository elsewhere?": "仓库包含项目中的所有文件，包括修订历史记录。在其他地方已有仓库？",
                "Import a repository.": "导入仓库",
                //"Cancel": "取消",
                //"Begin import": "开始导入",
                "Owner": "所有者",
                "Repository name": "仓库名称",
                "Great repository names are short and memorable. Need inspiration? How about": "好的仓库名称应该简单且容易记忆。需要灵感吗？这个怎么样：",
                    "is available.": "名称可用。",
                    "The repository": "仓库",
                    "already exists on this account.": "已经存在于此帐户。",
                    "Your new repository will be created as": "您的新仓库将被创建为",

                    "You found a secret!": "您发现了一个秘密！",
                    "is a ✨": "是一个",
                    "special": "特别的",
                    "✨ repository that you can use to add a": "仓库，您可以用它来添加一个",
                    "to your GitHub profile. Make sure it’s public and initialize it with a": "到您的 GitHub 个人资料。确保它是公开的，并在初始化时加入一个",
                    "to get started.": "以便开始工作。",

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
                "Add .gitignore": "添加 .gitignore 文件",
                "Choose which files not to track from a list of templates.": "从模板列表中选择哪些文件不需要跟踪。",
                ".gitignore template:": ".gitignore 模板：",
                    ".gitignore template": ".gitignore 模板",
                    "Filter ignores…": "过滤忽略…",
                    "None": "无",
                "Choose a license": "选择许可证",
                "A license tells others what they can and can't do with your code.": "许可证告诉其他人，他们可以使用您的代码做什么和不能做什么。",
                "License:": "许可证：",
                    "License": "许可证",
                    "Filter licenses...": "过滤许可证…",
                "This will set": "这将设置",
                "as the default branch.": "为默认分支。",
                "Change the default name in": "改变默认名称在",
                "your": "您的",
                "settings": "设置",
                "Create repository": "创建仓库",
                "Creating repository…": "创建仓库中…",

            // 导入仓库 第一页 https://github.com/new/import
                "Import your project to GitHub": "将您的项目导入到 GitHub",
                "Import all the files, including the revision history, from another version control system.": "导入的所有文件，包括修订历史记录，来自其他版本控制系统。",
                "Your old repository’s clone URL": "您旧仓库的克隆地址",
                "Learn more about the types of": "了解更多关于",
                "supported VCS.": "VCS 的支持。",
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

        },
        "regexp": [ // 正则翻译
            [/(\w+) is available\./,"$1 名称可用。"],
        ],
    },

    "new/project": { // 新建项目
        "static": { // 静态翻译
            "Create a new project": "创建新项目",
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
            "Linked repositories": "关联仓库",
                "Search": "搜索",
                "to link repositories to this project for more accurate suggestions and better search results.": "将仓库关联到此项目，以获得更准确的建议和更好的搜索结果。",
                "Search by repository name": "搜索仓库名",
                "You've reached the limit of 25 linked repositories.": "您已经达到了 25 个关联仓库的上限。",
                "Linked repositories:": "关联仓库",
                "None yet!": "啥也木有！",
            "Create project": "创建项目",

        },
        "regexp": [ // 正则翻译
        ],
    },

    "page-create-org": { // 新建组织
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },

    "repository": { // 仓库页面
        "static": { // 静态翻译
            // 导入仓库 第二页 /<user-name>/<repo-name>/import
                "Preparing your new repository": "准备新的仓库",
                "There is no need to keep this window open, we’ll email you when the import is done.": "没有必要在这个窗口傻等，当导入完成时，我们会向您发送电子邮件。",
                "Detecting your project’s version control system…": "检测项目的版本控制系统…",
                "Importing  commits and revision history…": "导入提交和历史版本…",
                "Importing complete! Your new repository": "导入完成，您的新仓库",
                "is ready.": "已经就绪。",

            // 初始化空仓库 /<user-name>/<repo-name>/
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
                "…or import code from another repository": "…或从另一个仓库库导入代码",
                "You can initialize this repository with code from a Subversion, Mercurial, or TFS project.": "您可以初始化此仓库从一个 Subversion，Mercurial 或 TFS 项目导入。",
                "Import code": "导入代码",

            // 仓库页面 /<user-name>/<repo-name>/
                // "Where should we fork this repository?": "您想该仓库复刻到哪个角色下？",
                // 顶部提醒
                "This repository has been archived by the owner. It is now read-only.": "此仓库已由所有者存档。它现在是只读的。",

                // 被 GitHub 官方禁用
                "This repository has been disabled.": "此仓库已被禁用。",
                "Access to this repository has been disabled by GitHub Staff due to a violation of GitHub's terms of service. If you are the owner of the repository, you may reach out to GitHub Support for more information.": "由于违反了 GitHub 的服务条款，GitHub 已禁止访问此仓库。如果您是仓库的所有者，您可以联系 GitHub 支持以获取更多信息。",

                // 公共部分 - 头部条
                "Public": "公共",
                "Private": "私有",
                "Public archive": "公共存档",
                "Private archive": "私有存档",

                "forked from": "复刻自",

                "Ignoring": "忽略",
                "Stop ignoring": "取消忽略",
                "Watch": "订阅",
                "Unwatch": "取消订阅",

                "Star": "星标",
                "Unstar": "已加星标",
                "Fork": "复刻",
                "Unfork": "取消复刻",

                // 赞助对话框
                "External links": "外部链接",
                "Learn more about funding links in repositories": "了解更多关于资料库中的赞助链接的信息",
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
                "Mark as unread": "标记为未读",
                "Save": "保存",

                // 评论框头部栏 (议题 & 拉取请求)
                "Contributor": "贡献者",
                "Owner": "所有者",
                "Author": "作者",
                    "You are the author of this issue.": "您是这个议题的作者。",  // 议题
                    "You are the author of this pull request.": "您是这个拉取请求的作者。", // 拉取请求
                    "This user is the author of this pull request.": "该用户是这个拉取请求的作者。",// 拉取请求
                "Member": "成员",
                    //[/This user is a member of the (\w+.*)./, "该用户是 $1 组织的成员。"],
                "Collaborator": "协作者",
                    //[/This user has been invited to collaborate on the (\w+) repository./, "该用户已被邀请在 $1 仓库上进行协作。"],
                "Pick your reaction": "选择您的表情",
                "Copy link": "复制链接",
                "Quote reply": "引用回复",
                "Reference in new issue": "引用到新议题",
                "Report content": "举报内容",
                "Report": "举报",

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

                // 代码标签卡 & 仓库首页 /<user-name>/<repo-name>/
                // 仓库主页 Dependabot 警告框
                    "We found potential security vulnerabilities in your dependencies.": "我们在您的依赖项中发现了潜在的安全漏洞。",
                    "Only the owner of this repository can see this message.": "仅此仓库的所有者可以看到此消息。",
                    "See Dependabot alerts": "查看 Dependabot 警报",

                // 已上架的 GitHub Action 项目
                    "Use this GitHub Action with your project": "将此 GitHub Actions 用于您的项目",
                    "Add this Action to an existing workflow or create a new one.": "将此操作添加到现有工作流程或创建新工作流程。",
                    "View on Marketplace": "去商城查看",

                // 左侧正文
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

                // 默认分支被重命名 
                    "The default branch has been renamed!": "默认分支已被重新命名!",
                    "is now named": "已被重新命名为",
                    "If you have a local clone, you can update it by running the following commands.": "如果您有一个本地克隆，您可以通过运行以下命令来更新它。",
                    "OK, got it": "好的，我知道了！",

                "branch": "分支",
                "branches": "分支",
                "tag": "标签",
                "tags": "标签",

                "Go to file": "转到文件",
                "Add file": "添加文件",
                    // 添加文件 下拉菜单
                    "Create new file": "新建文件",
                    "Upload files": "上传文件",

                // 代码克隆 下拉菜单
                "Clone": "克隆",
                    // HTTPS
                    "Use Git or checkout with SVN using the web URL.": "使用 Git 或 SVN 通过该网址检出。",
                    // SSH
                    "You don't have any public SSH keys in your GitHub account. You can": "您的 GitHub 帐户中没有任何公共 SSH 密钥。您可以",
                    "add a new public key": "添加新的公共密钥",
                    ", or try cloning this repository via HTTPS.": "，或尝试通过 HTTPS 克隆此仓库。",

                    "Use a password-protected SSH key.": "使用受密码保护的 SSH 密钥。",
                    // Github CLI
                    "Work fast with our official CLI.": "使用我们的官方 CLI 快速工作。",

                "Open with GitHub Desktop": "在 GitHub Desktop 中打开",
                "Download ZIP": "下载 Zip 压缩包",

                "Which remote URL should I use?": "我应该使用哪个远程 URL ?",
                // "Copy to clipboard": "复制到剪切板",
                // "Copied!": "复制成功!",

                // 个人仓库 当前分支状态

                "Contribute": "贡献",
                    // 贡献按钮下拉菜单
                    "No new commits yet. Enjoy your day!": "尚无新提交。祝您愉快！",
                    "Open a pull request to contribute your changes upstream.": "打开拉取请求以向上游贡献您的更改。",
                    "Open pull request": "打开拉取请求",

                "Fetch upstream": "获取上游",
                    // 获取上游按钮下拉菜单
                    "Keep your fork up-to-date with the upstream repository.": "使您的复刻与上游仓库保持同步。",
                    "No new commits to fetch. Enjoy your day!": "尚无新提交。祝您愉快！", //相同
                    "Compare": "对比",
                    "Fetch and merge":"获取并合并",
                    "Fetching and merging…":"正在获取和合并中…",
                    "Open a pull request to fetch upstream and review changes or resolve conflicts.": "打开拉取请求去获取上游并查看更改或解决冲突。",
                    "and has conflicts that must be resolved.": "并且有冲突必须解决。",

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

                "View code": "查看代码", //小屏模式

                // 右侧栏

                // 与用户名同名仓库 编辑 README
                "is a special repository. Its": "是一个特殊的仓库。",
                "Its": "它的",
                "will appear on your public profile!": "将出现在您的公开个人资料中！",
                "Edit README": "编辑 README",
                "Visit profile": "查看个人资料",

                "is special. If you": "是特殊的。如果您",
                "make this a public repository": "将仓库设置为公开",
                ", its": "，它的",
                "Go to Settings": "前往设置",

                // "About": "关于"，
                "No description, website, or topics provided.": "未提供描述、网站或主题。",
                "Readme": "自述文件",

                // 仓库描述编辑 对话框
                "Edit repository details": "编辑仓库简述",
                "Description": "描述",
                "Short description of this repository": "简短的描述下您的仓库",
                "Website": "网址",
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
                    // "Create a new release": "创建发行版",
                // "Packages": "软件包",
                    "No packages published": "未发布软件包",
                    "Publish your first package": "发布软件包",
                "Sponsor this project": "赞助本项目",
                    "Learn more about GitHub Sponsors": "了解更多关于 GitHub 赞助者的信息",
                "Used by": "使用者",
                //"Contributors": "贡献者",
                "Environments": "环境",
                "Languages": "语言",


                // "branch": "分支",
                // "branches": "分支",
                // "release": "次发布",
                // "releases": "次发布",
                // "contributor": "个贡献者",
                // "contributors": "个贡献者",

            // 议题标签卡 issues 页面 /<user-name>/<repo-name>/issues
                // 欢迎信息
                "Welcome to issues!": "欢迎关注议题！",
                "Issues are used to track todos, bugs, feature requests, and more. As issues are created, they’ll appear here in a searchable and filterable list. To get started, you should": "议题用于跟踪待办事项、错误、功能请求等。创建议题后，它们将出现在可搜索和可过滤的列表中。要开始，您应该",
                "create an issue": "创建议题",

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

                "Filters": "筛选",
                    // 筛选下拉菜单
                    "Filter Issues": "筛选议题",
                    "Open issues and pull requests": "打开的议题和拉取请求",
                    "Your issues": "您提出的议题",
                    "Your pull requests": "您的拉取请求",
                    "Everything assigned to you": "任何分配给您的",
                    "Everything mentioning you": "任何提及您的",
                    "View advanced search syntax": "查看高级搜索语法",

                "Clear current search query, filters, and sorts": "清除当前的搜索查询、过滤器和排序方式",

                "Labels": "标签",
                "Milestones": "里程碑",
                "New issue": "创建议题",

                // 筛选工作条
                // "Author": "作者",
                    "Filter by author": "筛选用户",
                    "Filter users": "筛选用户名",

                "Label": "标签",
                    "Filter by label": "筛选标签",
                    "Filter labels": "筛选标签",
                    "Unlabeled": "无标签",

                // "Projects": "项目",
                    "Filter by project": "筛选项目",
                    "Filter projects": "筛选项目",
                    "Repository": "仓库",
                    "Organization": "组织",
                    "No projects found. Sorry about that.": "很抱歉，未找到任何项目。",

                // "Milestones": "里程碑",
                    "Filter by milestone": "筛选里程碑",
                    "Filter milestones": "筛选里程碑",
                    "Issues with no milestone": "无里程碑",

                "Assignee": "受理人",
                    "Filter by who’s assigned": "筛选受理人",
                    "Assigned to nobody": "无受理人",

                "Sort": "排序",
                    "Sort by": "排序",
                    "Newest": "最新的",
                    "Oldest": "最早的",
                    "Most commented": "最多评论",
                    "Least commented": "最少评论",
                    "Recently updated": "最近更新",
                    "Least recently updated": "最早更新", //?
                    "Most reactions": "多数反应",

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
                "all of GitHub": "所有 Github",
                "or try an": "或者尝试",
                "advanced search": "高级搜索",

                // 状态词
                "was merged": "已合并",
                "was closed": "已关闭",
                "Approved": "已批准",
                "Review required": "需要审查", // 拉取请求 页面状态词
                    "Review required before merging": "合并前需要审查",
                "outdated": "陈旧的",
                "Draft": "草案",


            // 新建议题 选择议题模板  /<user-name>/<repo-name>/issues/new/choose
                "Get started": "开始",
                "Don’t see your issue here?": "在这里没有看到您的议题？",
                "Open a blank issue.": "打开一个空白议题。",
                "Edit templates": "编辑模板",

            // 新建空白议题  /<user-name>/<repo-name>/issues/new
            "Title": "标题",

            // 从讨论创建议题  /<user-name>/<repo-name>/issues/new?created_from_discussion_number=857
                "Documentation has changed since you last contributed": "自您上次贡献以来，文档已更改",
                ". Take a look before submitting an issue:": "。在提交问题之前先看一下：",
                "Contributing guidelines": "贡献指南",
                "Last updated": "最后更新",

            // 某条具体的议题 /<user-name>/<repo-name>/issues/ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "This issue was moved to a discussion.": "这个问题被转移到讨论中。",
                "You can continue the conversation there.": "您可以在那里继续讨论。",
                "Go to discussion →": "转到讨论→",

                "Edit": "编辑",


                // 状态词
                "changed the title": "修改了标题",
                "opened this issue": "打开该议题",
                "mentioned this issue": "提及该议题",
                "opened this": "打开这个",
                // "Issue": "议题",
                "added a commit that closed this issue": "在提交时关闭了这个议题",
                "closed this in": "关闭于",
                "added the": "添加了",
                "added": "添加",
                "and removed": "并移除了",
                "removed the": "移除了",
                "label": "标签",
                "labels": "标签",
                "self-assigned this": "自己受理了该议题",
                // "edited": "编辑的",
                "added this to the": "添加到",
                "milestone": "里程碑",
                "closed this": "关闭了",
                "reopened this": "重新打开了",
                "This was referenced": "这是引用",
                "deleted a comment from": "删除了评论，来自",
                "· May be fixed by": " · 可通过该方案修复",
                "pinned this issue": "置顶议题",
                "unpinned this issue": "取消置顶",
                "locked as": "锁定为",
                    "off-topic": "离题",
                    "too heated": "过热",
                    "resolved": "已解决",
                    "spam": "垃圾信息",
                "and limited conversation to collaborators": "并限制与协作者对话",
                "unlocked this conversation": "解锁对话",
                "merged commit": "已合并提交",
                // "into": "到",
                "deleted the": "删除了",
                "locked and limited conversation to collaborators": "锁定并限制与合作者的讨论",
                "removed their assignment": "取消了他们的任务",
                "assigned": "分配的",
                "and unassigned": "和未分配的",
                "marked this pull request as draft": "将此拉取请求标记为草案",
                "marked this pull request as ready for review": "将此拉取请求标记为可供审查",

                // 右侧栏 补充
                // 同 /<user-name>/<repo-name>/pull/ID
                "Linked pull requests": "关联拉取请求",
                    "Successfully merging a pull request may close this issue.": "成功合并一个拉取请求可能会关闭此议题。",

                    "linked a pull request that will": "关联一个拉取请求, 将会",
                    "close": "关闭",
                    "this issue": "这个议题",

                "Lock conversation": "锁定对话",
                    "Lock conversation on this issue": "锁定关于此议题的对话",
                    "Other users": "其他用户",
                    "can’t add new comments": "无法添加新评论",
                    "to this issue.": "到该议题。",
                    "You and other collaborators": "您和其他合作者",
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
                    "Unlock conversation on this issue": "解锁关于此议题的对话",
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
                        "Labels, milestones, and repository projects assigned to this issue will not transfer to the new location": "分配给此议题的标签、里程碑和仓库项目不会转移到新位置",
                    "Choose a repository": "选择仓库",
                    "Find a repository": "搜索仓库",
                    "Warning!": "警告！",
                    "Transferring an issue does not scrub any issue content. Content such as text references to other issues, pull requests, projects, teams will remain in this issue's descriptions and comments. However, issue editing history will be removed.": "转移议题不会清除任何议题内容。诸如对其他议题、拉取请求、项目、团队的文本引用等内容将保留在此议题的描述和评论中。但是，议题编辑历史将被删除。",
                "Convert to discussion": "转为讨论",
                    "Convert issue to a discussion": "转换议题为讨论",
                    "Are you sure you want to convert this issue to a discussion?": "您确定要将议题转换为讨论吗？",
                    "What happens when an issue is converted into a discussion:": "将议题转化为讨论时，会发生什么：",
                    "Issue will be closed and locked": "议题将被关闭并锁定",
                    "Title, description, and author will be the same as the issue": "标题、描述和作者将与议题相同",
                    "All comments and reactions will be the same as the issue": "所有评论和反应将与议题相同",
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
                "and limited to collaborators.": "，并限制协作者对话。",

                "Remember, contributions to this repository should follow our": "请记住，对该仓库的贡献应遵循我们的",
                "GitHub Community Guidelines": "GitHub 社区准则",
                "Remember, contributions to this repository should follow its": "请记住，对该仓库的贡献应遵循",
                "contributing guidelines": "贡献指南",
                "and": "和",
                "code of conduct": "行为准则",

            // 拉取请求 标签卡 /<user-name>/<repo-name>/pulls >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                // 欢迎信息
                "Welcome to pull requests!": "欢迎使用拉取请求！",
                "Pull requests help you collaborate on code with other people. As pull requests are created, they’ll appear here in a searchable and filterable list. To get started, you should": "拉取请求可帮助您与其他人协作处理代码。创建拉取请求后，它们将出现在可搜索和可过滤的列表中。要开始，您应该",
                "create a pull request": "创建拉取请求",

                "New pull request": "发起拉取请求",

                "Reviews": "审查",
                    // 筛选工作条
                    "Filter by reviews": "筛选审查",
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

            // 某条具体的拉取请求 /<user-name>/<repo-name>/pull/<ID> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

                // 代码
                "Checkout with GitHub CLI": "使用 GitHub CLI 检出",
                "Checkout with GitHub Desktop": "使用 GitHub Desktop 检出",

                "Jump to bottom": "跳到底部", //小屏模式

                // 状态词
                "into": "到",
                // "merged": "已合并",
                "wants to merge": "希望合并",
                "commit into": "个提交到",
                "commits into": "个提交到",
                "from": "从",

                // 标签栏
                "Conversation": "讨论",
                // "Commits": "提交",
                "Checks": "检查",
                "Files changed": "更改的文件",

                // 右侧栏
                "Reviewers": "审查人",
                    // [/(\w+) left review comments/, "$1 发表了审查评论"],
                    "At least 1 approving review is required to merge this pull request.": "至少需要 1 次批准审查才能合并此拉取请求。",
                    "Still in progress?": "仍在进行中吗？",
                    "Convert to draft": "设置为草案",
                    // 下拉
                    "Request up to 15 reviewers": "最多请求 15 个审查人",
                    // [/approved these changes/, "批准这些更改"], // 具体的拉取请求 审查人

                "Assignees": "受理人",
                    "No one assigned": "无人受理",
                    "No one—": "无人 - ",
                    "assign yourself": " 受理自己",
                    // 下拉框
                    "Assign up to 10 people to this issue": "最多指定 10 人", // 议题
                    "Assign up to 10 people to this pull request": "最多指定 10 人", // 拉取请求
                    "Clear assignees": "清楚受理人",
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

                "Linked issues": "关联议题",
                    "Successfully merging this pull request may close these issues.": "成功合并此拉取请求可能会关闭这些议题。",
                    // 下拉
                    "Link a pull request from this repository": "关联来自此仓库的拉取请求",
                    "Filter": "筛选",
                    "No results": "无结果",

                // "Notifications": "通知类型",
                "Customize": "自定义",
                "Subscribe": "订阅",
                // "Unsubscribe": "取消订阅",
                "You’re not receiving notifications from this thread.": "您没有收到来自该话题的通知。",
                "You’re receiving notifications because you’re watching this repository.": "您收到通知是因为您正在关注此仓库。",
                "You’re receiving notifications because you authored the thread.": "您收到通知是因为您提出了该话题。",
                "You’re receiving notifications because you were mentioned.": "您收到通知是因为有人 @您。",
                "You’re ignoring this repository.": "您忽略了这个仓库。",
                "You’re receiving notifications because you are watching pull requests on this repository.": "您收到通知是因为您正在关注此仓库上的拉取请求。",

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
                    // [/users with write access to (\w+.*) can add new commits/, "对 $1 具有写权限的用户可以添加新的提交"], // 具体拉取请求
                    "to your": "到您的",
                    "branch. You can always change this setting later.": "分支。您以后可以随时更改此设置。",
                "Allow edits and access to secrets by maintainers": "允许维护者编辑和访问密钥",
                    "Maintainers could potentially edit this repository's workflows to reveal values of secrets and gain access to other branches.": "维护者有可能编辑这个仓库的工作流程来获取密钥值，并获得对其他分支的访问。",


                // 讨论标签卡 主页
                "View changes": "查看更改",
                "View Changes": "查看更改",
                "Outdated": "陈旧的",
                "Resolve conversation": "解决对话",
                "Unresolve conversation": "未解决对话",
                    "marked this conversation as resolved.": "将此对话标记为已解决。",
                // "Changes requested": "更改请求",
                "Change requested": "更改请求",
                "Show resolved": "显示已解决",
                "Hide resolved": "隐藏已解决",
                "Show all reviewers": "显示所有审查人",
                "Hide all reviewers": "隐藏所有审查人",
                "New changes since you last viewed": "自您上次查看以来的新变化",
                "mentioned this pull request": "提及这个拉取请求",
                "dismissed": "驳回",
                "\’s": "的",
                "stale review": "陈旧审查",
                "via": "通过",
                "force-pushed": "强制推送",
                "branch from": "分支从",
                "and others": "和其他成员",
                "approved these changes": "批准这些更改",
                    "See review": "查看审查",
                "started a review": "开始审查",
                "self-requested a review": "自我要求审查",
                "left a comment": "发表评论",

                // 
                "This branch has not been deployed": "该分支尚未部署",
                "No deployments": "未部署",

                // 拉取请求状态
                "This pull request is still a work in progress": "此拉取请求仍在进行中",
                    "Only those with": "只有对此仓库具有",
                    "write access": "写入访问权限",
                    "to this repository can merge pull requests.": "的才可合并拉取请求。",
                    "to this repository can mark a draft pull request as ready for review.": "的才可将拉取请求草案标记为可供审查。",

                // "Review required": "需要审查", // 拉取请求 页面状态词
                    "Add your review": "添加您的评论",
                // [/At least 1 approving review is required by reviewers with write access./, ""],
                "Changes approved": "变更已获批准",
                // [/(\d+) approving reviews? by reviewers? with write access./, "$1 个批准的审查由具有写入权限的审查人进行审查。"],
                // [/(\d+) approvals?/, "$1 项批准"],
                "Some checks haven’t completed yet": "有些检查还没有完成",
                // [/1 in progress check/, "$1个正在进行的检查"],
                "Some checks were not successful": "有些检查不成功",
                // [/1 skipped, 4 successful, and 2 failing checks/, "$1 个跳过, $2 个成功, $3 失败"],
                // [/1 skipped, 4 successful, and 2 expected checks/, "$1 个跳过, $2 个成功, $3 个预先检查"],
                "All checks have passed": "所有检查均已通过",
                // [/5 successful checks/, ""],
                // [/6 checks passed/, ""],
                    "Show all checks": "显示所有检查",
                    "Hide all checks": "隐藏所有检查",
                    "Details": "细节",
                    "Required": "必须",
                "Merging is blocked": "合并被阻止",
                "The base branch restricts merging to authorized users.": "基础分支合并仅限于授权用户。",
                "Learn more about protected branches.": "了解更多关于受保护分支的信息。",
                // [/Merging can be performed automatically with 1 approving review./, ""],


                // [/(\d+) workflow awaiting approval/, "$1 个工作流等待批准"],
                "First-time contributors need a maintainer to approve running workflows.": "首次贡献者需要维护者来批准正在运行的工作流。",
                "The base branch does not accept merge commits. Alternate merge methods are preferred.": "基础分支不接受合并提交。其他合并方法是首选。",
                // [/The k1995:master branch requires linear history/, "$1 分支为要求线性历史记录"],
                "Learn more about required linear history.": "了解更多关于要求线性历史记录。",

                "Checking for ability to merge automatically…": "检测自动合并的能力…",
                "Hang in there while we check the branch’s status.": "请等待，我们正在检查该分支的状态",
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
                    "Squash and merge": "压缩与合并",
                        // [/The (\d+) commits? from this branch will be added to the base branch./, "该分支的 $1 个提交将合并到基本分支中。"],
                    "Rebase and merge": "变基与合并",
                        // [/The (\d+) commits? from this branch will be rebased and added to the base branch./, "该分支的 $1 个提交将变基并合并到基础分支中。"],

                //确认合并 对话框
                "Confirm merge": "确认合并",
                "Merging…": "合并中…",

                "You can also": "您也可以",
                "open this in GitHub Desktop": "在 GitHub Desktop 中打开",
                "or view": "，或通过",
                "command line instructions": "命令行查看",

                // "Merged": "已合并",
                "View details": "查看详情",
                "Hide details": "隐藏详情",
                "Revert": "还原",
                    "Create a new pull request to revert these changes": "创建一个新的拉取请求以恢复这些更改",
                "Closed with unmerged commits": "已关闭未合并的提交",

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
                "Conflicting files": "冲突的文件:",

                "Add more commits by pushing to the": "添加更多提交，通过推送到",
                "branch on": "分支在",

                // "Avoid bugs by automatically running your tests.": "通过持续集成测试来避免BUG。",
                // "Continuous integration can help catch bugs by running your tests automatically.": "持续集成可以通过自动运行您的测试有助于捕获错误。",
                // "Merge your code with confidence using one of our continuous integration providers.": "合并您的代码使用我们信任的持续集成供应商。",

                // "Use the links above to find what you’re looking for, or try": "使用上面的链接来找到您要找的，或者尝试",
                // "a new search query": "新的搜索查询",
                // ". The Filters menu is also super helpful for quickly finding issues most relevant to you.": "。搜索栏也是快速找到议题最相关的您超级有帮助的。",


                // 状态词
                "reviewed": "审查",
                "requested a review from": "请求审查",
                "reply…": "回复…",

                // 底部捐助
                "Show your support for": "通过赞助来表达您对",
                "by sponsoring them.": "的支持。",
                "Sponsor": "赞助",

            // 提交 标签卡 /<user-name>/<repo-name>/pull/<ID>/commits
                "Copy the full SHA": "复制完整的 SHA",
                "View commit details": "查看提交详情",
                "Browse the repository at this point in the history": "浏览该阶段的历史仓库内容",

            // 更改的文件 标签卡 /<user-name>/<repo-name>/pull/<ID>/files
                // 工具条
                "Changes from": "更改自",
                    "all commits": "所有提交",
                    // 下拉
                    "Show all changes": "显示所有更改",
                    "Show changes since your last review": "显示自您上次评论以来的更改",
                    // "You haven‘t reviewed this pull requeste": "您尚未审查过此请求请求",
                    "You haven’t reviewed this pull request yet": "您尚未审查此请求请求",
                    "Select commit": "选择提交",
                    "Hold shift + click to select a range": "按住 shift + 单击以选择一个范围",
                "File filter": "文件筛选",
                    "Filter by extension": "筛选文件后缀名",
                        "No extension": "无后缀名",
                        // [/All (\d+) file types? selected/, "所有 $1 中文件类型被选中"],
                    "Viewed files": "查看过的文件",
                    // "filter file types": "过滤文件类型",
                    // "filter viewed files": "过滤已查看文件",
                    // "hide viewed files": "隐藏已查看文件",
                    // "filter by context": "过滤内容",
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
                    // "Always": "总是", 取消
                    "Unified": "同屏",
                    "Split": "分屏",
                    // "Just for now": "仅当前",
                    // "Hide whitespace changes": "隐藏空白更改",
                    "Hide whitespace": "隐藏空白",
                    "Apply and reload": "应用并重新加载",
                "Show whitespace": "显示空白",
                "Refresh": "刷新",

                "files viewed": "查看过的文件",
                    "Marking files as viewed can help keep track of your progress, but will not affect your submitted review": "将文件标记为已查看可以帮助您跟踪进度，但不会纠正您提交的审查",
                "Review": "审查",
                "changes": "更改",
                    // 下拉
                    "Finish your review": "完成审查",
                        "Submit general feedback without explicit approval.": "未批准，并提出一般性反馈意见。",
                    "Approve": "批准",
                        "Submit feedback approving these changes.": "批准，并提出反馈意见。",
                        "Pull request authors can’t approve their own pull request": "拉取请求作者无法批准自己的拉取请求",
                        "Only users with explicit access to this repository may approve pull requests": "只有对这个仓库有明确访问权限的用户才能批准拉取请求",
                    "Request changes": "请求更改",
                        "Submit feedback suggesting changes.": "请求更改，并提出更改意见。",
                        "Pull request authors can’t request changes on their own pull request": "拉取请求作者不能在自己的拉取请求上请求更改",
                        "Only users with explicit access to this repository may request changes to pull requests": "只有对这个仓库有明确访问权限的用户才能请求更改拉取请求",
                    "Submit review": "提交审查",

                "Viewed": "已查看",

                "Load diff": "载入差异",
                "This file was deleted.": "该文件已被删除",
                "Large diffs are not rendered by default.": "默认情况下，大的差异不会被呈现。",

            // /<user-name>/<repo-name>/pull/<ID>/commits/<full SHA>
                // 上一页
                "You are viewing the earliest commit": "您正在查看最早的提交",
                // 下一页
                "You are viewing the latest commit": "您正在查看最新的提交",

            "Branch:": "分支：",

            // 关注者页面  /<user-name>/<repo-name>/watchers
                "Watchers": "关注者",
                "No one’s watching this repository yet. You could be the first.": "暂无关注者。您可以成为第一个",
                "about how watching works on GitHub.": "关于在 GitHub 上关注的工作原理。",

            // 追星者页面  /<user-name>/<repo-name>/stargazers
                "Stargazers": "追星者",
                "All": "全部",
                "You know": "您关注的",
                "Be the first to star this repository.": "成为第一个为这个仓库加星标的人。",
                "about how starring works on GitHub.": "关于如何在 GitHub 上加注星标。",
                "Be the first of your friends to star this repository.": "成为第一个为这个仓库加星标的朋友。",

            // 新建文件页面 /<user-name>/<repo-name>/new/<branch>
                "Name your file…": "文件名…",
                "in": "在",
                "Cancel changes": "取消更改",

                "Edit new file": "编辑新文件",
                "Preview changes": "预览更改",
                "loading preview…": "载入预览…",
                "Loading preview…": "载入预览…",
                "There are no changes to show.": "没有要显示的更改。",

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
                // 提交框
                    "Add an optional extended description…": "添加描述... (可选)",
                    "Commit directly to the": "提交到",
                    "branch.": "分支。",
                    "Create a": "创建",
                    "new branch": "新分支",
                    "for this commit and start a pull request.": "为这个提交，并且发起一个拉取请求。",
                    "Learn more about pull requests.": "了解更多拉取请求。",

            // 编辑文件页面 /<user-name>/<repo-name>/edit/<branch>/<file>
            // 与用户名同名仓库
            "is a special repository: its": "是一个特殊的仓库：它的",
            "will appear on your profile!": "将出现在您的个人资料中！",
            // "New": "新",
            "is now a special repository: its": "现在是一个特殊的仓库：它的",

            // 仅对于 .gitignore 文件
            "Want to use a": "想使用",
            "template?": "模板吗？",
            "Filter ignores…": "过滤忽略…",
            "Choose .gitignore:": "选择 .gitignore：",
            "none": "无",

            // 针对 工作流程文件
            "Start commit": "开始提交",
            "Space": "空格",
            "to trigger autocomplete in most situations.": "在大多数情况下将触发自动完成。",
            "Documentation": "文档",

            // "Edit file": "编辑文件",
            // "Preview": "预览",
            "Show diff": "显示差异",

            "Commit changes": "提交更改", //  自有仓库
            "Propose changes": "提议更改", //  他人仓库

            // 删除文件页面 /<user-name>/<repo-name>/delete/<branch>/<file>
                // 顶部提醒
                "File successfully deleted.": "文件已成功删除。",

            // Upload files 上传文件页面 /<user-name>/<repo-name>/upload/<branch>
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
                        // "Optional extended description": "可选的描述",

                // 他人仓库
                    "Uploads are disabled.": "上传功能已禁用。",
                    "File uploads require push access to this repository.": "文件上传需要推送访问此仓库。",


            // Find file 页面 /<user-name>/<repo-name>/find/<branch>
                "You’ve activated the": "您已激活",
                "file finder": "文件搜索模式",
                ". Start typing to filter the file list. Use": "。输入关键词查找您的文件。使用",
                "and": "和",
                "to navigate,": "选择文件",
                "to view files,": "查看文件",
                "to exit.": "返回。",

            // 拉取请求信息提示
            "Your recently pushed branches:": "您最近推送的分支：",
            "Compare & pull request": "比较 & 拉取请求",

            // 项目页面  /<user-name>/<repo-name>/projects >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "This repository doesn't have any projects yet": "该仓库目前没有任何项目",
                "Create a project": "创建一个项目",

                "Organize your issues with project boards": "使用项目板组织您的议题",
                "Did you know you can manage projects in the same place you keep your code? Set up a project board on GitHub to streamline and automate your workflow.": "您知道您可以在保存代码的同一个地方管理项目吗？在 GitHub 上设置项目板以简化和自动化您的工作流程。",

                    // 排序 补充
                    "Name": "名称",
                "Sort tasks": "排序任务",
                "Add issues and pull requests to your board and prioritize them alongside note cards containing ideas or task lists.": "将议题和拉取请求添加到你的看板中，并将它们与包含想法或任务清单的笔记卡一起进行优先排序。",
                "Plan your project": "规划项目",
                "Sort tasks into columns by status. You can label columns with status indicators like \"To Do\", \"In Progress\", and \"Done\".": "将任务按状态分类成列。你可以用 “待办”、“进行中” 和 “已完成” 等状态指标给各栏贴上标签。",
                "Automate your workflow": "自动化工作流程",
                "Set up triggering events to save time on project management—we’ll move tasks into the right columns for you.": "设置触发事件，以节省项目管理的时间——我们将为您把任务移到正确的栏目中。",
                "Track progress": "追踪进度",
                "Keep track of everything happening in your project and see exactly what’s changed since the last time you looked.": "追踪项目中发生的一切，并准确查看自上次查看以来发生的变化。",
                "Share status": "共享状态",
                "Each card has a unique URL, making it easy to share and discuss individual tasks with your team.": "每张卡片都有一个唯一的 URL，可以轻松地与您的团队共享和讨论个人任务。",
                "Wrap up": "结束工作",
                "After you wrap up your work, close your project board to remove it from your active projects list. On to the next project!": "结束工作后，关闭项目板，并从活动项目列表中删除。进入下一个项目！",

            // 新建项目页面  /<user-name>/<repo-name>/projects/new >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "Create a new project": "创建新项目",
                "Coordinate, track, and update your work in one place, so projects stay transparent and on schedule.": "在这里协调、跟踪和更新您的工作，使项目保持透明和按计划进行。",
                "Project board name": "项目板名称",
                // "Description": "描述",
                "(optional)": "(可选)",
                "Project template": "项目模板",
                "Save yourself time with a pre-configured project board template.": "使用预先配置的项目板模板可为您节省时间。",
                "Template:": "模板:",
                    "Templates": "模板",
                    "None": "无",
                        "Start from scratch with a completely blank project board. You can add columns and configure automation settings yourself.": "从一个完全空白的项目板开始。您可以自己添加栏目并配置自动化设置。",
                    "Basic kanban": "基础看板",
                        "Basic kanban-style board with columns for To do, In progress and Done.": "基础风格看板，带有待处理、进行中和已完成等栏目。",
                    "Automated kanban": "自动化看板",
                        "Kanban-style board with built-in triggers to automatically move issues and pull requests across To do, In progress and Done columns.": "带有内置触发器的风格看板，可以自动将议题和拉取请求移到待处理、进行中和已完成栏目中。",
                    "Automated kanban with reviews": "带审查的自动看板",
                        "Everything included in the Automated kanban template with additional triggers for pull request reviews.": "除了包含自动化看板模板中的所有内容，还有拉取请求审查的额外触发器。",
                    "Bug triage": "BUG 分类",
                        "Triage and prioritize bugs with columns for To do, High priority, Low priority, and Closed.": "使用待处理事项、高优先级、低优先级和已关闭的栏目对错误进行分类和优先级排序。",
                "Create project": "创建项目",

            // wiki 页面  /<user-name>/<repo-name>/wiki >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "Wikis provide a place in your repository to lay out the roadmap of your project, show the current status, and document software better, together.": "Wiki 为您的仓库提供了一个更好的文档资料。",
                "Create the first page": "创建第一个页面",

                // [/edited this page/, "编辑此页"], // wiki
                // [/(\d+) revisions?/, "$1 次修订"], // wiki
                "New Page": "新建页面",
                "Add a custom footer": "添加自定义页脚",

                // 右侧栏
                "Pages": "页面",
                    "Find a Page…": "搜索页面…",
                "Add a custom sidebar": "添加自定义侧边栏",
                "Clone this wiki locally": "在本地克隆这个 Wiki",

            // 新建 wiki 页面 /<user-name>/<repo-name>/wiki/_new >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                "Create new page": "创建新页面",
                "Write": "编辑",
                "Preview": "预览",
                "Edit mode:": "编辑模式：",
                "Edit message": "提交信息",

                "Write a small message here explaining this change. (Optional)": "在这里写一条小消息，解释这一变化。(可选)",
                "Save Page": "保存页面",
                // 顶部提醒
                    "Your Wiki was created.": "您的 Wiki 已创建。",

            // 编辑 wiki 页面 /<user-name>/<repo-name>/wiki/<page name>/_edit
                // [/Editing/, "编辑"], //编辑 wiki
                "Page History": "页面历史",
                "Delete Page": "删除页面",
                    "Are you sure you want to delete this page?": "您确定要删除此页面吗？",

                "Someone has edited the wiki since you started. Please reload this page and re-apply your changes.": "自您开始以来，有人编辑了 wiki。请重新加载此页面并重新应用您的更改。",

                // 顶部提醒
                    "The wiki page was successfully deleted.": "Wiki 页面已成功删除。",

            // wiki页面历史 /<user-name>/<repo-name>/wiki/<page name>/_history
                "Edit Page": "编辑页面",
                "Revisions": "修订",


            //// 直接提交拉取请求
            "Open a pull request": "新建一个拉取请求",
            "Create a new pull request by comparing changes across two branches. If you need to, you can also": "通过比较两个分支的更改来创建一个新的拉请求。如果需要，还可以",

            "Checking mergeability…": "检查可合并性…",
            "Don’t worry, you can still create the pull request.": "别担心，您仍然可以创建拉取请求。",
            "Able to merge.": "可被合并。",
            "Can’t automatically merge.": "无法自动合并。",
            "These branches can be automatically merged.": "该分支可被自动合并。",

            "View pull request": "查看拉取请求", //存在拉取请求时

            "commit comment": "次提交",
            "commit comments": "次提交",
            "file changed": "个文件变更",
            "files changed": "个文件变更",
            "comments": "个评论",
            "contributor": "位贡献者",
            "contributors": "位贡献者",
            "No commit comments for this range": "该范围变更没有提交注释",

            // 创建拉取请求 按钮下拉
            "Open a pull request that is ready for review": "打开一个拉取请求，以供审查",
            "Create draft pull request": "创建拉取请求草案",
            "Cannot be merged until marked ready for review": "在标记为可供审查之前，不能合并",
            "Draft pull request": "拉取请求草案",

            // 右侧栏补充
            // 关联议题
            "Use": "使用",
            "Closing keywords": "关闭关键词",
            "in the description to automatically close issues": "在描述中，以自动关闭议题",
            "Use Closing keywords to add a closing reference": "使用关闭关键词添加一个关闭引用",

            "Helpful resources":"帮助性资源",

            // https://github.com/maboloshi/github-chinese/compare/2.0...gh-pages
            "Commit comments": "提交评论",

            // Compare changes 页面 /compare
            ///<user-name>/<repo-name 合并到分支>/compare/<branch>...<user-name>:<branch> 提出合并分支 ?
            "Compare changes": "变更比较",
            "Compare changes across branches, commits, tags, and more below. If you need to, you can also": "比较跨分支，提交，标签，和更多的变更。如果您需要，也可以",
            "compare across forks": "比较复刻库和源仓库",

            // 分支选择栏
            "base repository:": "基础仓库：",
                "Choose a Base Repository": "选择基础仓库",
                "Filter repos": "过滤仓库",
            "head repository:": "头部仓库：",
                "Choose a Head Repository": "选择头部仓库",
            "base:": "基础库：",
                "Choose a base ref": "选择一个基础引用",
                "Find a branch": "筛选分支",
                "Find a tag": "筛选标签",
            "compare:": "比较库：",
                "Choose a head ref": "选择一个头部引用",

            "Choose different branches or forks above to discuss and review changes.": "选择不同的分支或复刻来讨论和查看变化。",
            "Create pull request": "创建拉取请求",

            "Compare and review just about anything": "比较和审查任何文件",
            "Branches, tags, commit ranges, and time ranges. In the same repository and across forks.": "分支，标签，提交范围和时间范围。在同一仓库和复刻的仓库。",
            "Example comparisons": "比较例子",

            // /<user-name>/<repo-name 合并到分支>/compare/<branch>...<user-name>:<branch> 提出合并分支
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
            "Learn about pull requests": "了解拉取请求",

            "This comparison is big! We’re only showing the most recent 250 commits": "这个比较是很大的! 我们只显示最近的250个提交。",

            "You’ll need to use two different branch names to get a valid comparison.": "您需要使用两个不同的分支名称来进行有效的比较。",
            "Check out some of these sample comparisons.": "看看这些比较的例子吧。",
            "are identical.": "是相同的。",

            // /<user-name>/<repo-name>/compare/<tag id1>...<tag id2> 标签对应版本比较
            // 仅限 MD文件
            "Display the source diff": "显示源差异",
            "Display the rich diff": "显示富差异",

            // 提交 commits 页面 /<user-name>/<repo-name>/commits/<branch> 或 /<user-name>/<repo-name>/commits

            // 验证标记浮动信息
            "This commit was created on GitHub.com and signed with GitHub’s": "此提交是在 GitHub.com 上创建的，并签署使用 GitHub 的",
            "This commit was signed with the committer’s": "此提交已签署使用提交者的",
            "This tag was signed with the committer’s": "此标签已签署使用提交者的", // /<user-name>/<repo-name>/releases
            "verified signature": "已验证签名",
            "Learn about vigilant mode": "了解警戒模式",

            // "Copy the full SHA": "复制完整的 SHA",
            // "View commit details": "查看提交详情",
            // "Browse the repository at this point in the history": "浏览该阶段的历史仓库内容",

            "Newer": "新的",
            "Older": "旧的",

            // 2/commits?author=maboloshi&since=2021-09-30&until=2021-10-13
            "Seeing something unexpected? Take a look at the": "看到了一些意想不到的东西？请看一下",
            "GitHub commits guide": "GitHub 提交指南",

            // 具体某个提交页面 /<user-name>/<repo-name>/commit/<full SHA>
                // 访问已删除的提交
                "This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.": "这个提交不属于本仓库的任何分支，可能属于仓库以外的分支。",

                "Browse files": "浏览文件",
                "Loading branch information": "载入分支信息",

                // [/This commit closes issue (#\d+)./, "此提交关闭了提议 $1。"], //具体提交页面
                "committed": "提交于",
                "commit": "提交",

                "Showing": "显示",
                "with": "包含",
                // "always": "总是",
                // "Unified": "同屏",
                // "Split": "分屏",

                "Binary file not shown.": "不显示二进制文件",
                "Empty file.": "空文件。",
                "File renamed without changes.": "文件仅重命名，内容没有更改。",

                // 修改的文件 左侧 展开按钮
                "Expand all": "展开全部",
                "Collapse expanded lines": "折叠展开的线",

                // 修改的文件 右侧下拉
                "Show comments": "显示评论",
                "Show annotations": "显示注释",
                "View file": "查看文件",
                "Edit file": "编辑文件",
                "Delete file": "删除文件",
                "Open in desktop": "在 GitHub Desktop 中打开",

                //底部评论框上部
                // "Lock conversation": "锁定对话",
                    "Lock conversation on this commit": "锁定关于此提交的对话",
                    "Locking the conversation means:": "锁定对话意味着：",
                    "to this commit.": "到这个提交。",
                    "You can always unlock this commit again in the future.": "您可以随时再次解锁此提交。",
                // "Unlock conversation": "解锁对话",
                    "Unlock conversation on this commit": "解锁关于此提交的对话",
                    "Unlocking the conversation means:": "解锁对话意味着：",
                    "will be able to comment on this commit once more.": "将能够再次对此提交发表评论。",
                    "You can always lock this commit again in the future.": "您可以随时再次锁定此提交。",

            // 分支页面 branches  /<user-name>/<repo-name>/branches
                // 标签卡栏
                "Overview": "概述",
                "Yours": "您的",
                "Active": "活跃的",
                "Stale": "陈旧的",
                "All branches": "所有分支",

                "Search branches…": "搜索分支…",

                "Default branch": "默认分支",
                "Switch default branch": "切换默认分支",
                "Default": "默认",

                "Updated": "更新",

                    // 重命名默认分支对话框
                    "Rename default branch": "重命名默认分支",
                    "Rename": "重命名",
                    "to:": "为：",
                    "Most projects name the default branch": "大多数项目将默认分支名为",
                    "Renaming this branch:": "重命名此分支：",
                    "Will unpublish current GitHub Pages site.": "将取消当前发布的 GitHub Pages 站点。",
                        "Your current GitHub Pages site will become unpublished. A new commit on the renamed branch will publish the GitHub Pages site again.": "您当前的 GitHub Pages 站点将被取消发布。重命名分支上的新提交将再次发布 GitHub Pages 站点。",
                    "Will not update your members' local environments.": "不会更新您成员的本地环境。",
                    "Your members will have to manually update their local environments. We'll let them know when they visit the repository, or you can share the following commands.": "您的成员将不得不手动更新他们的本地环境。我们会在他们访问仓库时通知他们，或者您可以共享以下命令。",
                    "Rename branch": "重命名分支",
                    "Saving…": "保存中…",

                    // 重命名分支对话框
                    "Rename this branch": "重命名分支",
                    "Renaming this branch will not update your members' local environments.": "重命名此分支不会更新您成员的本地环境。",

                    // 顶部提醒
                    // [/Branch main will be renamed to (\w+.*) shortly./,"主分支将很快重命名为 $1"], //默认主分支默认 重命名成功

                "Your branches": "您的分支",
                "You haven’t pushed any branches to this repository.": "您没有推送任何分支到该仓库。",
                "Active branches": "活跃的分支",
                "There aren’t any active branches.": "没有任何活跃的分支。",
                "Stale branches": "陈旧的分支",
                "There aren’t any stale branches.": "没有任何陈旧的分支。",
                "View more active branches": "查看更多活跃的分支",
                "View more stale branches": "查看更多陈旧的分支",

                // [/(\d+) commits? ahead, (\d+) commits? behind (\w+.*)/, "领先 $1 个提交，落后 $2 个提交于 $3"],

            // "Compare": "比较",
            // "Change default branch": "更改默认分支",

            // Releases 页面 /<user-name>/<repo-name>/releases
                //"Releases": "发布",
                // 无发行版时
                "There aren’t any releases here": "没有任何发行版",
                "You can create a release to package software, along with release notes and links to binary files, for other people to use. Learn more about releases in": "您可以创建一个发行版来打包软件，以及发行说明和二进制文件链接，供其他人使用。了解有关发布的更多信息查看",
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
                "Latest release": "最新发行版",
                // "Draft": "草案",

                // 对比按钮下拉
                "Choose a tag to compare": "选择一个标签进行比较",

                "Read more": "阅读更多内容",
                "Assets": "资源",

                "Join discussion": "加入讨论",

            // 发行版 标签卡 /<user-name>/<repo-name>/tags
                "Create release": "创建发行版",
                "Edit release": "编辑发行版",

                "Notes": "说明",
                "Downloads": "下载",

            // 某个发行版标签 /<user-name>/<repo-name>/releases/tag/<tag>
                // "Create release": "创建发行版",
                "from tag": "来自该标签",
                // "Edit": "编辑",
                "release": "发行版",

                // "Read release notes": "阅读发布说明",
                // 状态词
                "released this": "发布了",
                "tagged this": "标记了",
                "drafted this": "起草了",

                // 删除标签对话框
                "Are you sure?": "您确定吗？",
                "This will delete the information for this tag.": "将删除该标签的所有信息。",
                "Delete this tag": "删除此标签",

                // 删除发行版对话框
                "This will delete the information for this release.": "这将会删除该发行版的信息。",
                "Delete this release": "删除发行版",

                // 顶部提醒框
                "Your tag was removed": "您的标签已删除",
                "Your release was removed": "您的发行版已删除",

            // 创建发行版 /releases/new >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
                "Auto-generate release notes": "自动生成发行版说明",
                "Select a valid tag to automatically add the markdown for all the merged pull requests from this diff and contributors of this release": "选择一个有效的标签，自动为来自此差异和此发行版贡献者的所有已合并拉取请求，添加说明。",
                "Automatically add the markdown for all the merged pull requests from this diff and contributors of this release": "自动为来自此差异和此发行版贡献者的所有已合并拉取请求，添加说明。",
                "Describe this release": "描述此发行版",

                // 附加文件
                "Attach binaries by dropping them here or selecting them.": "拖拽文件到这来或选择它们来附加文件。",
                "Uploading your release now…": "正在上传到您的发行版...",
                "An attachment with that filename already exists.": "同名附件已经存在。",
                "Try a different file.": "请尝试不同的文件。",
                "We don’t support that file type.  try zipping it.": "我们不支持该文件类型，请尝试压缩它。",
                "Try another file.": "请尝试另一个文件。",
                "Yowza, that’s a big file.": "哟，这可是个大文件。",
                "Try again": "请尝试",
                "With a file smaller than 2GB.": "一个小于 2GB 的文件。",
                // "This file is empty.": "这是一个空文件。",
                "with a file that’s not empty.": "一个非空的文件。",
                // "Something went really wrong, and we can’t process that file.": "确实出了点问题，我们无法处理该文件。",
                "Try again.": "请重试。",

                "Delete and try uploading this file again.": "删除并重新上传。",
                "will be deleted": "将被删除",
                "(undo)": "(撤销)",

                "This is a pre-release": "这是一个预发布版",
                "We’ll point out that this release is identified as non-production ready.": "我们需要指出，该版本为非正式发布。", //我们需要指出的是，这个版本被认定为非生产准备。

                "Publish release": "发布发行版",
                    "Publishing…": "发布中…",
                "Update release": "更新发行版",
                    "Updating…": "更新中…",
                    "Saving release…": "保存中…",
                "Save draft": "保存草案",
                "Saved!": "已保存",
                "Saving draft failed. Try again?": "保存草案失败。请重试？",

                // 丢弃草案 对话框
                // "Are you sure?": "您确定哇?",
                "This will delete the information for this draft.": "这将会删除该草案的信息。",
                "Delete this draft": "删除草案",

                // 顶部提醒栏
                // "Your release was removed": "您的发行版已删除",

                // 右侧栏
                "Tagging suggestions": "标签建议",
                "It’s common practice to prefix your version names with the letter": "通常的做法是在版本名称前加上字母",
                ". Some good tag names might be": "。一些好的标签名称可能是",
                "If the tag isn’t meant for production use, add a pre-release version after the version name. Some good pre-release versions might be": "如果标签不是用于生产的，就在版本名后面加上预发布版本。一些好的预发布版本可能是",

                "Semantic versioning": "语义化版本",
                "If you’re new to releasing software, we highly recommend reading about": "如果您是发布新手，我们强烈建议阅读关于",
                "semantic versioning.": "语义化版本。",


            // 编辑发行版 /releases/edit/<tag>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // 同 创建发行版 /releases/new

            // "Add release notes": "添加发布说明",
            // "Edit release notes": "编辑发布说明",
            // "(No release notes)": "(没有发布说明)",
            // "Release notes": "发布说明",

            // "Edit tag": "修改标签",

            // "Markdown supported": "Markdown 语法支持",


            // 洞察页面 /<user-name>/<repo-name>/pulse >>>>>>>>>>>>>>>>>>>
            // 左侧菜单
            "Pulse": "统计",
            "Contributors": "贡献者",
            "Community": "社区",
            "Traffic": "流量",
            "Commits": "提交",
            "Code frequency": "代码频率",
            "Dependency graph": "依赖关系图",
            // "Punch card": "时刻",
            "Network": "网络",
            // "Members": "成员",
            "Forks": "复刻",

            // 贡献者 /<user-name>/<repo-name>/graphs/contributors
            "Contributions to master, excluding merge commits and bot accounts": "对主分支的贡献，不包括合并提交和机器人帐户",
            "Contributions:": "贡献者：",
            // 下拉菜单
            "Filter contributions": "筛选贡献者",
            "Additions": "添加数量",
            "Deletions": "删除数量",

            // 月历
            "January"   : "1月",
            "February"  : "2月",
            "March"     : "3月",
            "April"     : "4月",
            "May"       : "5月",
            "June"      : "6月",
            "July"      : "7月",
            "August"    : "8月",
            "September" : "9月",
            "October"   : "10月",
            "November"  : "11月",
            "December"  : "12月",


            // 提交 /graphs/commit-activity
            "Sunday"    : "周日",
            "Monday"    : "周一",
            "Tuesday"   : "周二",
            "Wednesday" : "周三",
            "Thursday"  : "周四",
            "Friday"    : "周五",
            "Saturday"  : "周六",

            // 网络图 /network
            "Network graph": "网络图",
            "Timeline of the most recent commits to this repository and its network ordered by most recently pushed to.": "最近提交到此仓库的时间轴及其网络图按最近推送的顺序排序。",
            "Keyboard shortcuts available": "可用的键盘快捷键",

            // 频率
            "per week": "每周",

            // 安全标签卡 /<user-name>/<repo-name>/security
            // 安全概述
            "Security overview": "安全概述",
            "Security policy": "安全政策",
            "Define how users should report security vulnerabilities for this repository": "定义用户应如何报告此仓库的安全漏洞",

            "Suggest how users should report security vulnerabilities for this repository": "建议用户应如何报告此仓库的安全漏洞",
            "Suggest a security policy": "安全政策建议",

            "Security advisories": "安全公告",
            "View or disclose security advisories for this repository": "查看或公开此仓库的安全公告",
            "View security advisories": "查看安全公告",
            "View security advisories for this repository": "查看此仓库的安全公告",

            "Dependabot alerts": "Dependabot 警报",
            "— Active": "— 激活",
            "Get notified when one of your dependencies has a vulnerability": "当您的一个依赖项存在漏洞时得到通知",
            "Enable Dependabot alerts": "启用 Dependabot 警报",
            "View Dependabot alerts": "查看 Dependabot 警报",

            "Code scanning alerts": "代码扫描警报",
            "Automatically detect common vulnerability and coding errors": "自动检测常见漏洞和编码错误",
            "Set up code scanning": "设置代码扫描",

            // "Vulnerability details": "漏洞详情",
            "high severity": "高风险",
            "moderate severity": "中风险",
            "low severity": "低风险",
            // "Create dependabot security update": "创建可靠的安全更新",

            // 安全政策
            "Set up a security policy": "制定安全政策",
            "Help your community understand how to securely report security vulnerabilities for your project.": "帮助您的社区了解如何安全地报告项目的安全漏洞。",
            "Start setup": "开始设置",

            // 安全公告
            "Security Advisories": "安全建议",
            "Privately discuss, fix, and publish information about security vulnerabilities in your repository's code.": "私人讨论，修复和发布仓库代码中的安全漏洞的信息。",
            "New draft security advisory": "新的安全建议草案",
            "There aren’t any draft security advisories": "没有任何安全建议草案",

            // 他人库
            "View information about security vulnerabilities from this repository's maintainers.": "查看仓库维护者提供的安全漏洞信息。",
            "There aren’t any published security advisories": "没有任何已发布的安全公告",

            // Dependabot 警报
            "Dependabot alerts are disabled.": "Dependabot 警报已禁用。",
            "To receive Dependabot alerts, you must first enable Dependabot alerts in": "要接收 Dependabot 警报，必须首先启用 Dependabot 警报",
            "this repository’s settings": "在仓库的设置中",
            "Dismiss all": "驳回全部",
            // 下拉菜单
            "A fix has already been started": "修复已经开始",
            "No bandwidth to fix this": "没有带宽来修复",
            "Risk is tolerable to this project": "风险可承受",
            "Vulnerable code is not actually used": "漏洞代码实际未使用",
            "Manage repository vulnerability settings": "管理仓库漏洞设置",
            "Manage account notification settings": "管理帐户通知设置",

            "Manifest": "清单",
            // 清单下拉
            "Filter by manifest": "筛选清单",
            "Filter manifests": "筛选清单",
            "All": "所有",

            // 排序下拉 补充词条
            "Severity": "严重等级",
            "Manifest path": "表现方式",
            "Package name": "软件包名称",

            // 底部信息
            "surface known security vulnerabilities in some dependency manifest files.": "表面已知的安全漏洞在某些依赖性清单文件中。",
            "Dependabot security updates": "Dependabot 安全更新",
            "automatically keep your application up-to-date by updating dependencies in response to these alerts.": "通过响应这些警报更新依赖项，自动保持您的应用程序是最新的。",
            "Dependabot version updates": "Dependabot 版本更新",
            "can also help keep dependencies updated.": "也可以帮助保持依赖项的更新。",

            // 具体某条Dependabot 警报
            "Create Dependabot security update": "创建 Dependabot 警报更新",
            "Dismiss": "驳回",
            // 下拉菜单 补充
            "This alert is inaccurate or incorrect": "此警报不准确或不正确",

            // 状态词
            "opened this alert": "打开此警报",

            // 代码扫描器
            "Get started with code scanning": "开始使用代码扫描",
            "Automatically detect common vulnerabilities and coding errors": "自动检测常见漏洞和编码错误",
            "Set up this workflow": "设置此工作流程",
            "Security analysis from the Marketplace": "来自商城的安全分析工具",
            "View in marketplace →": "在商城中查看 →",
            "Already created a code scanning workflow?": "已经创建了代码扫描工作流程？",
            "Click here": "点击这里",
            "to see the currently running workflows.": "查看当前正在运行的工作流程。",

            // 新建安全建议草案 /security/advisories/new >>>>>>>>>>>>>>>>>>>>>>

            // 文件代码页面 /<user-name>/<repo-name>/blob/<brach>/<Patch>/<file_name> >>>>>>>>>>>>>>>>>>>>>>
                "Download": "下载",
                "View raw": "查看原始数据",
                "(Sorry about that, but we can’t show files that are this big right now.)": "（很抱歉，但我们现在无法显示这么大的文件。）",

                "View runs": "查看工作流程", // 工作流程文件 /blob/<brach>/.github/workflows/xxxx.yml
                // 地址栏 最右侧 下拉菜单
                "Go to line": "跳转到行",
                    "Jump to line…": "跳转到行",
                    "Go":"确定",
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

                "Display the source blob": "源代码视图", // md 文件
                "Display the rendered blob": "解析后视图", // md 文件
                "Raw": "源码",
                "Blame": "追溯",
                "Open this file in GitHub Desktop":"在 GitHub Desktop 中打开",
                "Copy raw contents":"复制原码内容",
                "Edit this file":"编辑本文件",
                "Edit the file in your fork of this project": "在您的复刻中编辑该文件", // 他人库
                "Fork this project and edit the file": "复刻项目再编辑文件", // 他人库
                "Delete this file":"删除本文件",
                "Delete the file in your fork of this project": "在您的复刻中删除该文件", // 他人库
                "Fork this project and delete the file": "复刻项目再删除文件", // 他人库

                "Copy line": "复制行",
                "Copy lines": "复制行",
                // "Copy permalink": "复制永久链接",
                "View git blame": "浏览 Git 追溯",
                // "Reference in new issue": "引用到新议题",
                "Reference in new discussion": "引用到新讨论",

                "Search this file…": "搜索这个文件...", // csv 文件

            // 代码追溯页面 /<user-name>/<repo-name>/blame/<branch>/<file>
                "Normal view": "正常视图",
                "View blame prior to this change": "查看此修改的早期修订",

            // 提交中文件历史 /<user-name>/<repo-name>/commits/<branch>/<file> 或 /<user-name>/<repo-name>/commits/<full SHA>/<file>
                "History for": "历史：",
                "View at this point in the history": "在这一历史节点上查看",

            // 讨论分类 /<user-name>/<repo-name>/discussions/categories
                // [/(\d+) categories?/, "$1 个分类"],
                "Announcements": "公告",
                    "Updates from maintainers": "维护者的更新信息",
                "General": "通常",
                    "Chat about anything and everything here": "在这里谈论任何事情",
                "Ideas": "想法",
                    "Share ideas for new features":"分享对新功能的想法",
                "Q&A": "问与答",
                    "Ask the community for help": "向社会寻求帮助",
                    "Answers enabled": "已启用答案",
                "Show and tell": "展示与讲述",
                    "Show off something you've made": "炫耀您所做的事情",

                "New category": "新建分类",
                    "Create category": "创建分类",
                    "Category name": "分类名称",
                    "Add a description (optional)": "添加描述（可选）",
                    "Discussion Format": "讨论形式",
                    "Open ended discussion": "开放式讨论",
                        "Enable your community to have conversations that don't require a definitive answer to a question. Great for sharing tips and tricks or just chatting.": "使您的社区能够进行对话，不需要对问题作出明确的回答。很适合分享技巧和窍门，或者只是聊天。",
                    "Question / Answer": "问与答",
                        "Enable your community to ask questions, suggest answers, and vote on the best suggested answer.": "使您的社区能够提出问题、建议答案并投票选出最佳建议答案。",
                    "Announcement": "公告",
                        "Share updates and news with your community. Only maintainers and admins can post new discussions in these categories, but anyone can comment and reply.": "与您的社区分享更新和新闻。只有维护者和管理员可以在这些类别中发布新讨论，但任何人都可以发表评论和回复。",
                    "Create": "创建",
                "Edit category": "编辑分类",
                // 删除
                    "If this category has discussions associated, where would you like to reassign them?": "如果此类别有相关的讨论，您希望将它们重新分配到何处？",
                    "Delete and move": "删除并移动",

            // 讨论页面 /<user-name>/<repo-name>/discussions
                "Start a new discussion": "开始新的讨论",
                "Get started by creating the first": "开始吧，为您的社区创建",
                "discussion for your community.": "第一个讨论。",
                "Got it": "知道了",

                "Pinned discussions": "置顶讨论",
                "When you start a discussion,": "当您开始讨论时，",
                "you can choose to feature it": "您可以选择将",
                "here by pinning it.": "其置顶在此处。",
                // 左侧栏
                "Search all discussions": "搜索所有讨论",
                "Suggested filters": "推荐的筛选器",
                "filter by discussion author": "按讨论作者筛选",
                "filter by discussion category": "按讨论分类筛选",
                "filter by answered or unanswered": "按已答复或未答复筛选",

                "Categories": "分类",
                "View all": "查看全部",

                "Most helpful": "最有帮助",
                "Be sure to mark someone’s comment as an answer if it helps you resolve your question — they deserve the credit!": "如果某人的评论有助于您解决问题，请务必将其标记为答案——他们值得称赞！",
                "Community guidelines": "社区指南",
                "New": "新",
                "Top:": "顶部：",
                "Today": "今天",
                "Past week": "上周",
                "Past month": "上个月",
                "Past year": "过去一年",
                "Answered": "已答复",
                "Unanswered": "未答复",

                "New discussion": "新建讨论",

                "There aren't any discussions.": "暂无任何讨论。",
                "There are no matching answered discussions.": "没有匹配的已答复讨论。",
                "There are no matching unanswered discussions.": "没有匹配的未答复讨论。",
                "You can open a": "您可以打开一个",
                "new discussion": "新讨论",
                "to ask questions about this repository or get help.": "，询问关于这个资源库的问题或获得帮助。",

                "asked": "回复",
                "started": "标星",
                "· Unanswered":" · 未答复",
                "· Answered":" · 已答复",

            // 新建讨论页面 /<user-name>/<repo-name>/discussions/new
                "Select category": "选择分类",
                "Category:": "分类：",
                "Contributing": "贡献",
                "It looks like this is your first time starting a discussion in this repository!": "看起来这是您第一次在此仓库中开始讨论！",
                "This is a community we build together. Please be welcoming and open minded.": "这是我们共同建立的社区。请保持热情和开放的态度。",

            // 新建讨论页面 /<user-name>/<repo-name>/discussions/new?category=general

            // 某个讨论页面 /<user-name>/<repo-name>/discussions/ID
                "started this conversation in": "开始了这次讨论，在",
                "asked this question in": "提出了这个问题，在",
                "Maintainer": "维护者",
                "Category": "分类",


                // [/(\d+) answers?/, "$1 位答复者"],
                "Return to top": "返回顶部",
                // [/(\d+) comments?/, "$1 条评论"],
                // [/(\d+) replies?/, "$1 条回复"],
                // [/(\d+) suggested answer/, "$1 个建议答案"],
                "Events": "活动",
                "Marked": "标记为",
                "an": "一个",
                "Marked then unmarked an answer": "标记后，又取消标记",
                "Marked as answer": "标记为答案",
                "Answer selected by": "被标记答案由",

                // 右侧栏
                "Change category": "更改类别",
                "Converted from issue": "由议题转化而来",

                // 锁定对话
                    "Lock conversation on this discussion": "锁定关于此讨论的对话",
                    "to this discussion.": "到该讨论。",
                    "You can always unlock this discussion again in the future.": "您今后仍可以随时再次解锁此讨论。 ",
                "Transfer discussion": "转移讨论",
                    // 转移议题 对话框
                    "Transfer this discussion": "转移讨论",
                    "Choose another repository you own to move this discussion to:": "选择您拥有的另一个仓库以将此讨论移至：",
                "Pin discussion": "置顶讨论",
                    "Up to 4 discussions can be pinned and they will appear publicly at the top of the discussions page.": "最多可以置顶 4 个讨论，它们将公开显示在讨论页面的顶部。",
                    "Configure pinned discussion": "设置置顶讨论",
                        "Background": "背景色",
                        "Pattern": "图案",
                    "Pinning discussion…": "置顶讨论…",
                "Edit pinned discussion": "编辑置顶讨论",
                "Unpin discussion": "取消置顶讨论",
                    "Are you sure you want to unpin this discussion?": "您确定要取消置顶讨论吗？",
                    "The discussion itself won't be deleted, it just won't be shown prominently above the list of discussions.": "讨论本身不会被删除，只是不会突出显示在讨论列表上方。",
                    "Deleting spotlight…": "删除聚光灯…",
                    // 顶部提醒
                    // [/Discussion \"(\w+.*)\" has been unpinned./, "讨论 “$1” 已取消固定。"],
                "Create issue from discussion": "从讨论中创建议题",
                "Delete discussion": "删除讨论",
                    "Are you sure you want to delete this discussion?": "您确定要删除此讨论吗？",
                    "The discussion will be deleted permanently": "该讨论将被永久删除",
                    "You will not be able to restore the discussion or its comments": "您将无法恢复讨论或其评论",
                    "Delete this discussion": "删除讨论",
                    "Deleting discussion…": "讨论删除中…",
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
                // [/Open issues with label \'(\w+.*)\' are being converted to discussions./, "带有 \"$1 \"标签的打开议题正在被转换为讨论。"], // 标签页面

            // 标签页面 /<user-name>/<repo-name>/labels
                "Search all labels": "搜索所有标签",
                "New label": "新建标签",
                    "Label preview": "标签预览",
                    "Label name": "标签名",
                    "Description (optional)": "描述（可选）",
                    "Color": "颜色",
                        "Get a new color": "获得新颜色",
                        "Choose from default colors:": "从默认颜色中选择：",
                    "Create label": "创建标签",

                "Alphabetically": "按字母顺序",
                "Reverse alphabetically": "按字母倒序",
                "Most issues": "最多的议题",
                "Fewest issues": "最少的议题",

                "bug": "臭虫",
                    "Something isn't working": "有些东西不工作",
                "dependencies": "依赖性",
                    "Pull requests that update a dependency file": "更新一个依赖文件的拉取请求",
                "documentation": "文档",
                    "Improvements or additions to documentation": "文档的改进或补充",
                "duplicate": "重复",
                    "This issue or pull request already exists": "这个议题或拉取请求已经存在",
                "enhancement": "增强",
                    "New feature or request": "新功能或请求",
                "good first issue": "好的第一个议题",
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

            // 里程碑页面 /<user-name>/<repo-name>/milestones
                "You haven’t created any Milestones.": "您尚未创建任何里程碑。",
                "Use Milestones to create collections of Issues and Pull Requests for a particular release or project.": "使用里程碑为特定版本或项目创建议题和拉取请求的集合。",

                "Create a Milestone": "创建里程碑",

                // 排序补充
                "Furthest due date": "最迟到期日",
                "Closest due date": "最近到期日",
                "Least complete": "最不完整",
                "Most complete": "最完整",
                "Least issues": "最少的议题",

                "No due date": "没有截止日期",
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
                "Due date (optional)": "截止日期（可选）",

                "Create milestone": "创建里程碑",

            // 新建操作 /<user-name>/<repo-name>/actions/new
                "Get started with GitHub Actions": "开始使用 GitHub Actions",
                "Build, test, and deploy your code. Make code reviews, branch management, and issue triaging work the way you want. Select a workflow template to get started.": "构建、测试和部署您的代码。以您想要的方式进行代码审查、分支管理和议题分类。选择一个工作流模板以开始使用。",
                "Skip this and": "跳过并",
                "set up a workflow yourself": "建立工作流程",

                "Workflows made for your repository": "为您的存储库制作的工作流程",
                "Suggested": "推荐的",
                "Deploy your code with these popular services": "使用这些流行的服务部署您的代码",
                "Continuous integration workflows": "持续集成工作流程",
                "More continuous integration workflows...": "更多持续集成工作流程...",
                "Automate every step in your process": "自动化流程中的每一步",

                "Learn more about GitHub Actions": "了解更多关于 GitHub Actions 的信息",
                "Getting started and core concepts": "入门和核心概念",
                "New to Actions? Start here. Learn the core concepts and how to get started.": "初次接触 Actions？从这里开始。了解核心概念和如何开始。",
                "Configuring and managing workflows": "配置和管理工作流程",
                "Create custom workflows to control your project's life cycle processes.": "创建自定义工作流程以控制项目的生命周期过程。",
                "Language and framework guides": "语言与框架指南",
                "Guides for projects written in many programming languages.": "项目指南由多种编程语言编写。",

            // 操作 /<user-name>/<repo-name>/actions
                "Automate your workflow from idea to production": "",
                // 左侧栏
                "Workflows": "工作流程",
                "New workflow": "新建工作流程",
                // "Select workflow": "选择工作流程",

                "All workflows": "全部工作流程",
                "Showing runs from all workflows": "显示所有工作流程的运行情况",

                //筛选条
                "Filter workflow runs": "过滤工作流程",
                    "Narrow your search": "缩小搜索范围",

                // [/(\d+) workflow runs?$/, "$1 个工作流程运行"],
                // [/(\d+) workflow runs results/, "$1 个工作流程运行结果"],
                "Event": "事件",
                    "Filter by event": "按事件过滤",
                    "Find an event": "查找事件",
                    "push": "推送",
                    "schedule": "日程",
                    "watch": "关注",
                    "workflow_dispatch": "工作流程的调度",
                // 状态
                    "Filter by status": "按状态过滤",
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
                    "Filter by branch": "按分支过滤",
                "Actor": "角色",
                    "Filter by actor": "按角色过滤",
                    "Find a user": "查找用户",

                // 日志 右侧按钮
                "Cancel run": "取消运行",
                "Delete workflow run": "删除工作流程运行",

                // 筛选结果
                "all workflow runs": "所有工作流程运行",
                "or try different filters.": "或尝试不同的筛选器。",

            // /<user-name>/<repo-name>/actions/workflows/<file>.yml
                "This workflow has a": "这个工作流程有一个",
                "event trigger.": "事件触发器。",

                "Run workflow": "运行工作流程",
                    "Use workflow from": "使用工作流程来自：",
                    "Select branch": "选择分支",
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
                // "Re-run jobs": "重新运行作业",

                "This workflow has no runs yet.": "此工作流程尚未运行。",
            // /<user-name>/<repo-name>/actions/runs/1377924356
                // 标题
                "Re-run all jobs": "重新运行所有作业",
                //右侧按钮
                "View workflow file": "查看工作流程文件",
                "View workflow runs": "查看工作流程运行",
                "Create status badge": "创建状态徽章",
                    "Copy status badge Markdown": "复制状态徽章 Markdown 代码",
                "Delete all logs": "删除所有日志",

                // 左侧栏
                "Summary": "摘要",
                "Jobs": "作业",

                //状态条
                "Triggered via issues": "通过议题触发",
                "Triggered via push": "通过推送触发",
                "Triggered via schedule": "通过调度触发",
                "Manually triggered": "手动触发",

                // 状态
                    "Success": "成功",
                    "Failure": "失败",
                "Total duration": "总时长",
                "Billable time": "计费时间",
                "Artifacts": "附件",

            // /<user-name>/<repo-name>/actions/runs/1377924356/workflow
                "Workflow file": "工作流程文件",
                "Workflow file for this run": "本次运行的工作流程文件",

            // /<user-name>/<repo-name>/runs/3989101564?check_suite_focus=true
                "The logs for this run have expired and are no longer available.": "此运行日志已过期，不再可用。",

                "Search logs": "搜索日志",
                // 设置按钮
                    "Show timestamps": "显示时间戳",
                    "Show full screen (Shift+F)": "全屏显示（Shift+F）",
                    "Download log archive": "下载日志存档",
                    "View raw logs": "查看原始日志",

                "Try broadening your search filters.": "尝试扩大您的搜索过滤器。",

                // GitHub Pages
                "GitHub Pages / Page Build": "GitHub Pages / 页面构建",
                "succeeded": "成功于",
                "GitHub Pages successfully built your site.": "GitHub Pages 成功构建了您的站点。",
                "Your website is ready at": "您的网站已准备就绪，网址为",
                "View more details on GitHub Pages": "在 GitHub Pages 查看更多细节",

            // /<user-name>/<repo-name>/deployments
                // [/Deployed to (\w+.*)/, "部署到 $1"],
                "was deployed by": "被部署",
                "Deployment history": "部署历史",
                "Show:": "显示：",
                    "All environments": "所有环境",
                "Loading information…": "载入信息…",
                "at": "在",
                "Deployed by": "部署者",
                "Inactive": "不活跃",
                "Abandoned": "废弃",
                "View deployment": "查看部署情况",

                "View full deployment history": "查看完整的部署历史",

            // /<user-name>/<repo-name>/deployments/activity_log?environment=github-pages
                "Deployments": "部署",
                "/ History": "/ 历史",

        },
        "regexp": [ // 正则翻译
            // 评论框头部栏 (议题 & 拉取请求)
            // 成员
            [/This user is a member of the (\w+.*) organization./, "该用户是 $1 组织的成员。"],
            // 协作者
            [/This user has been invited to collaborate on the (\w+.*) repository./, "该用户已被邀请在 $1 仓库上进行协作。"],
            // 贡献者
            [/You have previously committed to the (\w+.*) repository./, "您之前已经提交到过 $1 仓库。"],
            [/This user has previously committed to the (\w+.*) repository./, "该用户之前已提交给 $1 仓库。"],
            // 所有者
            [/This user is the owner of the (\w+.*) repository./, "该用户是 $1 仓库的所有者。"],
            [/Sponsor (\w+)?/, "赞助 $1"], // 赞助按钮 对话框 标题
            [/\+ ([\d,]+) releases?/, "+ $1 个发行版"], // 仓库首页右侧栏 发行版
            [/\+ ([\d,]+) contributors?/, "+ $1 位贡献者"], // 仓库首页右侧栏 贡献者
            // 个人仓库 贡献和获取操作后 信息提示条
            [/Successfully fetched and fast-forwarded from upstream (\w+.*)\./, "成功从上游的 $1 中获取并快速转发。"],
            // 个人仓库当前分支状态
            // [/This branch is even with (\w+.*)\./, "该分支与上游 $1 相同。"],
            [/This branch is up to date with (\w+.*)\./, "该分支与上游 $1 保持同步。"],
            [/This branch is (\d+) commits? behind (\w+.*)\./, "该分支落后上游 $2 $1 个提交。"],
            [/This branch is (\d+) commits? ahead, (\d+) commits? behind (\w+.*)\./, "该分支领先上游 $3 $1 个提交，落后 $2 个提交。"],
            // 贡献
            [/This branch is not ahead of the upstream (\w+.*)\./, "该分支并不领先上游 $1。"],
            [/This branch is (\d+) commits? ahead of (\w+.*)\./, "该分支领先上游 $2 $1个提交。"],
            //获取上游.
            [/This branch is not behind the upstream (\w+.*)\./, "该分支并不落后上游 $1。"], //相同时
            [/This branch is (\d+) commits? behind the upstream/, "该分支落后上游 $1 个提交,"],
            [/Fetch and merge (\d+) upstream commits? from (\w+.*)\./, "从上游 $2 获取并合并 $1 个提交。"],
            [/Save (.+?) to your computer and use it in GitHub Desktop./, "使用 GitHub Desktop，保存 $1 到您的电脑。"],
            // 议题 & 拉取请求
            [/([\d,]+) Open/, "$1 打开"],
            [/([\d,]+) Closed/, "$1 已关闭"],
            [/([\d,]+) linked issues?/, "$1 个关联议题"],
            [/(\d+) tasks? done/, "$1 个任务完成"],
            [/(\d+) of (\d+) tasks?/, "$1 / $2 个任务"],
            [/(\d+) tasks?/, "$1 个任务"],
            [/This issue will close once commit (\w+) is merged into the \'(\w+)\' branch./, "一旦提交 $1 被合并到 '$2' 分支，这个议题就会关闭。"],
            [/This issue will close when (\d+) is merged/, "这个议题将在 $1 合并后关闭"],
            [/(\d+) contributors?/, "$1 位贡献者"],
            [/Failure: Your tests failed on (\w+)/, "失败：您的测试在 $1 上失败了"], // X 的提醒
            [/Success: Your tests passed on (\w+)/, "成功：您的测试在 $1 上通过了"], // 对勾 的提醒
            [/(\d+) \/ (\d+) checks? OK/, "$1 / $2 检查 OK"], // 对勾 的提醒 /pulls
            [/View all issues opened by (.+)/, "查看所有 $1 的议题"],
            // 具体拉取请求 /<user-name>/<repo-name>/pull/ID
            [/([\d,]+) participants?/, "$1 位参与者"],
            [/(\w+) left review comments/, "$1 发表了审查评论"],
            [/users with write access to (\w+.*) can add new commits/, "对 $1 具有写权限的用户可以添加新的提交"],
            [/The (\w+.*) branch has been deleted./, "$1 分支已被删除。"], // 具体拉取请求 重新打开拉取请求 /<user-name>/<repo-name>/pull/ID
            [/merged (\d+) commits? into/, "已合并 $1 个提交到"],
            [/The (\d+) commits? from this branch will be added to the base branch./, "该分支的 $1 个提交将合并到基本分支中。"],

            [/The (\d+) commits? from this branch will be rebased and added to the base branch./, "该分支的 $1 个提交将变基并合并到基础分支中。"],
            [/added a commit to (\w+.*) that referenced this issue/, "为 $1 添加了引用这个议题的提交"],
            [/approved these changes/, "批准这些更改"], // 具体的拉取请求 审查人
            // [/Commits on (.+)/, "提交于 $1"],
            [/Commits (.+)/, "提交于 $1"], // 提交页面 /<user-name>/<repo-name>/commits/<branch
            // bug [/from (.+)/, "从 $1"],
            [/wants to merge ([\d,]+) commits? into/, "需要合并 $1 次提交到"],
            [/([\d,]+) commits?$/, "$1 次提交"],
            [/· ([\d,]+) comments?/, "$1 次提交"],
            [/Edited (\d+) times?/,"编辑 $1 次"], //评论框编辑次数
            [/edited by (\w+)/,"被 $1 编辑"], //评论框 被他人编辑
            [/(\d+) hidden items/,"$1 条隐藏信息"], //议题页 评论太多 需要点击载入
            [/(\d+) Draft/,"$1 草案"],// 安全建议页
            [/(\d+) Published/,"$1 发布"],// 安全建议页
            // 具体某个提交页面
            [/This commit closes issue (#\d+)./, "此提交关闭了提议 $1。"],
            [/(\d+) parents?/, "$1 个父"],
            [/(\d+) changed files?/, "$1 个更改的文件"],
            [/(\d+) additions?/, "$1 处增加"],
            [/(\d+) deletions?/, "$1 处删除"],
            [/(\d+) comments? on commit/, "该提交有 $1 条评论"],
            //某个标签 tag /releases/tag/<tag>
            [/to (\w+) since this tag/, "到 $1，从这个标签开始"],
            [/to ([^\n]+)[\n\s]+since this release/, "到 $1，从这个发行版开始"],
            [/(\d+) review approvals?/, "$1 次审查批准"],// 拉取请求页 "已批准' 浮动提示
            [/Joined/,"加入于"], // 追星者，关注者页面
            [/You’re making changes in a project you don’t have write access to. Submitting a change will write it to a new branch in your fork (\w+.*), so you can send a pull request./, "您正在对没有写入权限的项目进行更改。提交更改会将其写入您的复刻 $1 中的新分支，这样您就可以发送拉取请求。"], // 新建, 编辑文件页面
            [/At least (\d+) approving reviews? is required by reviewers with write access./, "具有写入权限的审查者至少需要 $1 次批准审查。"],
            [/(\d+) approving reviews? by reviewers? with write access./, "$1 个批准的审查由具有写入权限的审查人进行审查。"],
            [/(\d+) approvals?/, "$1 项批准"],
            [/(\d+) in progress checks?/, "$1 个正在进行的检查"],
            [/(\d+) skipped, (\d+) successful, and (\d+) failing checks/, "$1 个跳过, $2 个成功, $3 个失败"],
            [/(\d+) skipped, (\d+) successful, and (\d+) expected checks/, "$1 个跳过, $2 个成功, $3 个预先检查"],
            [/(\d+) successful checks?/, "$1 次成功检查"],
            [/(\d+) checks? passed/, "$1 次检查通过"],
            [/Merging can be performed automatically with (\d+) approving review./, "合并可以通过 $1 次批准审查自动执行。"],
            [/All (\d+) file types? selected/, "所有 $1 中文件类型被选中"],
            [/Unresolved conversations/, "未解决的讨论"],
            [/Reresolved conversations/, "已解决的讨论"],
            [/(\d+) of (\d+) files?/, "$1 / $2 个文件"],
            [/(\d+) workflow awaiting approval/, "$1 个工作流等待批准"],
            [/The (\w+) branch requires linear history/, "$1 分支为要求线性历史记录"],
            [/Welcome to the ([^ ]+) wiki!/, "欢迎访问 $1 的 wiki"], // wiki页面
            [/edited this page/, "编辑此页"], // wiki
            [/(\d+) revisions?/, "$1 次修订"], // wiki
            [/Editing/, "编辑"], //编辑 wiki
            [/Discussion \"(\w+.*)\" has been unpinned./, "讨论 “$1” 已取消置顶。"],// 讨论页面
            [/(\d+) categories?/, "$1 个分类"], // 讨论分类
            [/(\d+) answers?/, "$1 位答复者"], // 具体讨论
            [/(\d+) comments?/, "$1 条评论"], // 具体讨论
            [/(\d+) repl(y|ies)?/, "$1 条回复"], // 具体讨论
            [/(\d+) suggested answers?/, "$1 个建议答案"], // 具体讨论
            [/Convert (\d+) issues? to (a |)discussions?/, "将 $1 个议题转换为讨论"], // 标签页面?
            [/Are you sure you want to convert (\d+) issues? with the following label to (a |)discussions?\?/, "您确定要将带有以下标签的 $1 个议题转换为讨论吗？"], // 标签页面
            [/Open issues? with label \'(\w+.*)\' are being converted to discussions./, "带有 \"$1 \"标签的打开议题正在被转换为讨论。"], // 标签页面
            // [/Closed issues? with label \'(\w+.*)\' are being converted to discussions./, "带有 \"$1 \"标签的已关闭议题正在被转换为讨论。"], // 标签页面
            [/open issues? and pull requests?/, "个打开的议题和拉取请求"], // 标签页面
            [/open issues? or pull requests?/, "个打开的议题或拉取请求"], // 标签页面
            [/(\d+) commits? ahead, (\d+) commits? behind (\w+.*)/, "领先 $1 个提交，落后 $2 个提交于 $3"], // 分支页面 /<user-name>/<repo-name>/branches
            [/(\d+) commits? ahead (\w+.*)/, "领先 $1 个提交于 $2"], // 分支页面 /<user-name>/<repo-name>/branches
            [/(\d+) commits? behind (\w+.*)/, "落后 $1 个提交于 $2"], // 分支页面 /<user-name>/<repo-name>/branches
            [/Branch (\w+.*) will be renamed to (\w+.*) shortly./,"$1 分支将很快重命名为 $2"],  // 分支页面 顶部提醒 当分支重命名成功
            [/is already the branch name./, "已经是分支的名称了。"], // 分支页面 重命名分支
            [/Your branch name will be/, "您的分支的名称将重命名为"], // 分支页面 重命名分支
            [/Deployed to (\w+.*)/, "部署到 $1"], // 部署页面 /deployments
            [/(\d+) workflow runs?$/, "$1 个工作流程运行"], // 操作 /<user-name>/<repo-name>/actions
            [/(\d+) workflow run results?/, "$1 个工作流程运行结果"],
        ],
    },

    "repository/settings": { // 仓库设置页面 /<user-name>/<repo-name>/settings
        "static": { // 静态翻译
            // 授权访问 (已经合并到仓库设置)
                "Confirm access": "授权访问",
                "Password": "密码",
                "Forgot password?": "忘记密码？",
                "Confirm password": "确认密码",
                "You are entering": "您正在进入",
                "sudo mode": "Sudo 模式",
                ". We won’t ask for your password again for a few hours.": " 。我们将在未来几个小时内不再要求您输入密码。",

            // >>>>>>>>>>>>>>>>>>仓库 公共部分<<<<<<<<<<<<<<<<<<<<<<<<<<<
                // 头部条
                "Public": "公共",
                "Private": "私有",
                "Public archive": "公共存档",
                "Private archive": "私有存档",

                "forked from": "复刻自",

                "Ignoring": "忽略",
                "Stop ignoring": "取消忽略",
                "Watch": "订阅",
                "Unwatch": "取消订阅",

                "Star": "星标",
                "Unstar": "已加星标",
                "Fork": "复刻",
                "Unfork": "取消复刻",

                // 赞助对话框
                "External links": "外部链接",
                "Learn more about funding links in repositories": "了解更多关于资料库中的赞助链接的信息",
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

                // 标签栏
                "Code": "代码",
                "Pull requests": "拉取请求",
                "Discussions": "讨论",
                "Actions": "操作",
                "Projects": "项目",
                "Security": "安全",
                "Insights": "洞察",
                "Settings": "设置",

            // >>>>>>>>>>>>>>>>>>   仓库设置  <<<<<<<<<<<<<<<<<<<<<<<<<<<
                // 顶部提醒栏
                "Most repository settings are hidden for archived repositories. This repository must be unarchived to change them.": "对于存档的仓库，大多数仓库设置都是隐藏的。 必须解除仓库存档才能更改它们。",
                "This repository has been archived by the owner. It is now read-only.": "此仓库已由所有者存档。它现在是只读的。",
                "Repository settings saved.": "仓库设置已保存。",


                // 左侧菜单
                "Options": "选项",
                "Manage access": "访问管理",
                "Repository roles": "仓库规则",
                "Security & analysis": "安全 & 分析",
                "Branches": "分支",
                "Webhooks": "Web 钩子",
                // "Notifications": "通知",
                "Integrations": "集成",
                "Deploy keys": "部署密钥",
                // "Actions": "操作",
                    "General": "通常",
                    "Runners": "运行器",
                "Environments": "环境",
                "Secrets": "密钥",
                "Pages": "GitHub Pages",
                "Moderation settings": "审查设置",
                "Interaction limits": "互动限制",
                "Code review limits": "代码审查限制",


            // 设置页面 /<user-name>/<repo-name>/settings ====================================
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

                "Social preview": "社交预览",
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
                // 私人库 需要升级或公开
                    "Upgrade or make this repository public to enable Wikis": "升级或公开此仓库，以启用 Wiki",
                    "GitHub Wikis is a simple way to let others contribute content. Any GitHub user can create and edit pages to use for documentation, examples, support, or anything you wish.": "GitHub Wikis 是一种让他人贡献内容的简单方法。任何 GitHub 用户都可以创建和编辑页面，用于文档、示例、支持或任何您想要的东西。",
                    "Restrict editing to collaborators only": "仅限协作者进行编辑",
                    "Public wikis will still be readable by everyone.": "公共 Wikis 仍然可供所有人阅读。",
                    // "Upgrade": "升级",

                // 议题
                "Issues integrate lightweight task tracking into your repository. Keep projects on track with issue labels and milestones, and reference them in commit messages.": "议题将轻量级任务跟踪集成到您的仓库中。使用议题标签和里程碑保持项目正常运行，并在提交消息中引用它们。",
                "Get organized with issue templates": "使用议题模板进行组织",
                "Give contributors issue templates that help you cut through the noise and help them push your project forward.": "为贡献者提供议题模板，帮助您消除干扰并帮助他们推进您的项目。",
                "Set up templates": "设置模板",

                // 赞助
                "Sponsorships": "赞助",
                "Sponsorships help your community know how to financially support this repository.": "赞助可帮助您的社区了解如何在资金上支持此仓库。",
                "Display a \"Sponsor\" button": "显示 “赞助” 按钮",
                "Add links to GitHub Sponsors or third-party methods your repository accepts for financial contributions to your project.": "添加指向 GitHub 赞助者或您的仓库接受的第三方收款链接，以便为您的项目提供资金捐助。",
                "Set up sponsor button": "设置赞助按钮",

                // 项目
                "Project boards on GitHub help you organize and prioritize your work. You can create project boards for specific feature work, comprehensive roadmaps, or even release checklists.": "GitHub 上的项目板可以帮助您组织和安排工作的优先次序。 您可以为特定功能工作、全面的路线图、甚至发布检查列表来创建项目板。",

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

                "Merge button": "合并按钮",
                    "You must select at least one option": "您必须至少选择一个选项",
                "When merging pull requests, you can allow any combination of merge commits, squashing, or rebasing. At least one option must be enabled. If you have linear history requirement enabled on any protected branch, you must enable squashing or rebasing.": "当合并拉取请求时，您可以允许合并提交、压缩或变基的任意组合。必须至少启用一个选项。如果您在任何受保护分支上启用了线性历史要求，则必须启用压缩或变基。",

                "Allow merge commits": "允许合并提交",
                "Add all commits from the head branch to the base branch with a merge commit.": "使用合并提交将所有从头部分支的提交添加到基础分支。",

                "Allow squash merging": "允许压缩合并",
                "Combine all commits from the head branch into a single commit in the base branch.": "将来自头部分支的所有提交合并到基础分支中的单个提交中。",

                "Allow rebase merging": "允许变基合并",
                "Add all commits from the head branch onto the base branch individually.": "将来自头部分支的所有提交单独添加到基础分支。",

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

                // GitHub Pages
                "Pages settings now has its own dedicated tab!": "Pages 设置现在有其专用选项卡！",
                "Check it out here!": "看看这里！",

                "Danger Zone": "危险区",

                "Change repository visibility": "更改仓库可见性",
                "You cannot change the visibility of a fork. please": "您无法更改复刻仓库的可见性。请",
                "Duplicate the repository": "复制仓库",
                "For security reasons, you cannot change the visibility of a fork.": "出于安全原因，您无法更改复刻仓库的可见性。",

                // 更改仓库可见性对话框
                "Change visibility": "更改可见性",
                "Warning: this is a potentially destructive action.": "警告：这是一个潜在的破坏性操作。",
                "Make public": "转为公开",
                "This repository is currently public.": "该仓库当前是公开的。",
                "Make this repository visible to anyone.": "让任何人都能看到这个仓库。",
                    "The code will be visible to everyone who can visit https://github.com": "所有可以访问 https://github.com 的人都可以看到代码",
                    "Anyone can fork your repository.": "任何人都可以复刻您的仓库。",
                    "Your changes will be published as activity.": "您的更改将作为活动发布。",
                "Make private": "转为私有",
                "This repository is currently private.": "该仓库当前是私有的。",
                "Hide this repository from the public.": "向公众隐藏这个仓库。",
                    "You will": "您将会",
                    "permanently": "永久地",
                    "lose:": "丢失：",
                    "All": "所有",
                        "stars and watchers": "追星者和关注者",
                        "of this repository.": "对于这个仓库。",
                        "pages": "GitHub Page",
                        "published from this repository.": "发布自这个仓库。",
                    "Dependency graph, Dependabot alerts, and Dependabot security updates will remain enabled. Leaving them enabled grants us permission to perform read-only analysis on this repository.": "依赖关系图、Dependabot 警报和 Dependabot 安全更新将继续保持启用状态。启用它们将授予我们对此仓库执行只读分析的权限。",
                    "Dependency graph will remain enabled. Leaving them enabled grants us permission to perform read-only analysis on this repository.": "依赖关系图将保持启用状态。启用它们将授予我们对此仓库执行只读分析的权限。",
                    // 与用户名同名仓库
                    "The README in this repository will no longer be shown on your public profile once this repository is private.": "一旦此仓库设置为私有的，此仓库中的 README 将不再显示在您的公共个人资料中。",
                    "Code scanning will become unavailable.": "代码扫描将不可用。",
                    "Current forks will remain public and will be separated from this repository.": "当前的复刻将继续保持公开状态，并将与此仓库分离。",
                "Please type": "请键入",
                "to confirm.": "进行确定。",
                "I understand, change repository visibility.": "我明白了，依然更改该仓库的可见性。",

                "Transfer ownership": "转让所有权",
                "Transfer": "转让",
                "Transfer this repository to another user or to an organization where you have the ability to create repositories.": "将此仓库转让给另一位用户或您可以创建仓库的组织。",

                // 仓库转让对话框
                "Transfer repository": "转让仓库",
                "To understand admin access, teams, issue assignments, and redirects after a repository is transferred, see": "要了解仓库转让后的管理员访问、团队、议题分配和重定向，请参阅",
                "Transferring a repository": "转让仓库",
                "in GitHub Help.": "在 GitHub 帮助中所示。",
                "Transferring may be delayed until the new owner approves the transfer.": "在新所有者批准接受转让之前，转让可能会延迟。",
                "New owner’s GitHub username or organization name": "新所有者的 GitHub 用户名或组织名称",
                "Warning: This is a potentially destructive action.": "警告：这是一个潜在的破坏性操作。",
                "If": "如果",
                "username": "指定的用户",
                "is using GitHub Free and accepts the transfer, they will lose access to private repository features:": "正在使用 GitHub Free 计划并接受转移，那么他们将无法访问私有仓库如下功能：",
                "Code owners": "代码所有者",
                "Any existing": "任何现有的",
                "wikis": "Wiki",
                "Pulse, Contributors, Community, Traffic, Commits, Code Frequency, Network,": "统计、贡献者、社区、流量、提交、代码频率、网络、",
                "and": "和",
                "Forks": "复刻",
                "on the": "在",
                "tab": "标签页中",
                "Draft": "草案",
                "PRs": "拉取请求",
                "Multiple assignees": "多位受理人",
                "for issues and PRs": "关于议题和拉取请求",
                "Multiple reviewers": "多位审查人",
                "for PRs": "关于拉取请求",
                // "Branch protection rules": "分支保护规则",
                "can": "可",
                "upgrade": "升级",
                "their plan before accepting the transfer to avoid losing access.": "他们的计划在接受转移之前，以避免失去访问权。",
                "Username or organization name": "用户名或组织名称",
                "Type": "请输入",
                // "to confirm.": "进行确定。",
                "I understand, transfer this repository.": "我明白了，依然转让该仓库。",

                "Archive this repository": "归档仓库",
                "Mark this repository as archived and read-only.": "将此仓库标记为已存档和只读。",

                // 归档仓库对话框
                "Archive repository": "归档仓库",
                "This repository will become read-only.": "该仓库将设置为只读。",
                "You will still be able to fork the repository and unarchive it at any time.": "您仍然可以随时访问复刻仓库并取消存档。",
                "Unexpected bad things will happen if you don’t read this!": "如果您不阅读此说明，将会发生意想不到的事情！",
                "All scheduled workflows will stop running.": "所有预定的工作流程将停止运行。",
                "Security features will be unavailable:": "安全功能将无法使用：",
                "Code scanning": "代码扫描",
                "Before you archive, please consider:": "在您归档之前，请考虑：",
                "Updating any repository settings": "更新仓库设置",
                "Closing all open issues and pull requests": "关闭所有打开的议题和拉取请求",
                "Making a note in your README": "在您的 README 中做个说明",
                // "Please type": "请键入",
                "I understand the consequences, archive this repository": "我明白后果，依然存档该仓库",
                // "This repository has been archived by the owner. It is now read-only.": "此仓库已由所有者存档。它现在是只读的。",

                "Unarchive this repository": "解除仓库存档",
                "Mark this repository as unarchived and read-write.": "将此仓库标记为未归档和可读写。",

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

                // 删除仓库对话框
                "Are you absolutely sure?": "您完全确定吗？",
                "This action": "该操作",
                "cannot": "不能",
                "be undone. This will permanently delete the": "被撤消。这将永久删除",
                "repository, wiki, issues, comments, packages, secrets, workflow runs, and remove all collaborator associations.": "仓库、Wiki、议题、评论、软件包、密钥、工作流程，并删除所有协作者关联。",
                "This will not change your billing plan. If you want to downgrade, you can do so in your Billing Settings.": "这并不会更改您的结算方案。 如果您想降级，可以在结算设置中进行降级。",
                "I understand the consequences, delete this repository": "我明白后果，依然删除该仓库",

            // 访问管理页面 /<user-name>/<repo-name>/settings/access ====================================
                // "Manage access": "访问管理",
                "Who has access": "谁有权访问",
                "public repository": "公共仓库",
                "This repository is public and visible to anyone.": "该仓库是公开的，对任何人都可见。",
                "private repository": "私有仓库",
                "Only those with access to this repository can view it.": "只有拥有该仓库访问权的用户才能查看。",
                "Manage": "管理",
                "Direct access": "直接访问",
                "collaborators have access to this repository. Only you can contribute to this repository.": "个协作者有权访问此仓库。 只有您可以对此仓库做出贡献。",
                "You haven't invited any collaborators yet": "您尚未邀请任何协作者",
                // "invite a collaborator": "邀请协作者",
                "Add people": "添加他人",
                // 邀请对话框
                "Add a collaborator to": "添加协作者到",
                "Search by username, full name, or email": "搜索用户名、全名、或电子邮箱",
                "Select a collaborator above": "从上方选择协作者",
                "Invite collaborator": "邀请协作者",
                "Add": "添加",
                "to this repository": "到这个仓库",

            // 安全 & 分析页面 /<user-name>/<repo-name>/settings/security_analysis
                "Configure security and analysis features": "配置安全和分析功能",
                "Security and analysis features help keep your repository secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your repository.": "安全和分析功能有助于确保您的仓库安全和更新。通过启用这些功能，您授予我们对您的仓库执行只读分析的权限。",
                "Dependency graph": "依赖关系图",
                    "Understand your dependencies.": "了解您的依赖项。",
                    "Dependency graph is always enabled for public repos.": "公共仓库始终启用依赖关系图。",
                "Dependabot alerts": "Dependabot 警报",
                    "Receive alerts of new vulnerabilities that affect your dependencies.": "接收有关影响您的依赖项的新漏洞的警报。",
                "Dependabot security updates": "Dependabot 安全更新",
                    "Easily upgrade to non-vulnerable dependencies.": "轻松升级到无漏洞的依赖项。",
                    "Enable Dependabot security updates": "启用 Dependabot 安全更新",
                        "Dependabot security updates need Dependabot alerts to be enabled, so we'll turn that on too.": "Dependabot 安全更新需要启用 Dependabot 警报，因此我们也将启用它。",
                // "Code scanning": "代码扫描",
                    "Automatically detect common vulnerabilities and coding errors.": "自动检测常见漏洞和编码错误。",
                    "Set up": "设置",

            // 分支管理页面 /<user-name>/<repo-name>/settings/branches====================================
                "Default branch": "默认分支",
                "The default branch is considered the “base” branch in your repository, against which all pull requests and code commits are automatically made, unless you specify a different branch.": "默认分支被认为是仓库中的 “基础” 分支，所有的拉取请求和代码提交都是针对该分支进行的，除非您指定一个不同的分支。",
                "Rename branch": "重命名分支",
                    // 重命名分支对话框
                    "Rename this branch": "重命名分支",
                    "to:": "为：",
                    // [/is already the branch name./, "已经是分支的名称了。"],
                    // [/Your branch name will be/, "您的分支的名称将重命名为"],
                    "Most projects name the default branch": "大多数项目将默认分支名为",
                    "Renaming this branch will not update your members' local environments.": "重命名此分支不会更新您成员的本地环境。",
                        "Your members will have to manually update their local environments. We'll let them know when they visit the repository, or you can share the following commands.": "您的成员将不得不手动更新他们的本地环境。我们会在他们访问仓库时通知他们，或者您可以共享以下命令。",
                    "Saving…": "保存中…",
                    // 重命名 GitHub Pages 所在分支
                    "Renaming this branch:": "重命名分支",
                    "Will unpublish current GitHub Pages site.": "将取消发布当前的 GitHub Pages 站点。",
                        "Your current GitHub Pages site will become unpublished. A new commit on the renamed branch will publish the GitHub Pages site again.": "您当前的 GitHub Pages 站点将取消发布。重命名分支上的新提交将再次发布 GitHub Pages 站点。",
                    "Will not update your members' local environments.": "不会更新您成员的本地环境。",
                "Switch to another branch": "切换到另一分支",
                    // 分支切换对话框
                    "Switch default branch to another branch": "将默认分支切换到另一分支",
                    "Update": "更新",
                    "Switch default branch": "切换默认分支",
                    "Filter branches": "筛选分支",
                    // 更新默认分支对话框
                    "Update default branch": "更新默认分支",
                    "Changing your default branch": "更改您的默认分支",
                    "can have unintended consequences that can affect new pull requests and clones.": "可能会产生意想不到的后果，影响新的拉取请求和克隆。",
                    "I understand, update the default branch.": "我明白了，依然更新默认分支",

                "Branch protection rules": "分支保护规则",
                "Add rule": "添加规则",
                "Define branch protection rules to disable force pushing, prevent branches from being deleted, and optionally require status checks before merging. New to branch protection rules?": "定义分支保护规则，以禁止强制推送，防止分支被删除，并可选择要求在合并前进行状态检查。对分支保护规则感到陌生？",
                "No branch protection rules defined yet.": "尚未定义分支保护规则。",

            // 新建分支保护规则 页面 /<user-name>/<repo-name>/settings/branch_protection_rules/new====================================
                "Branch protection rule": "分支保护规则",
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
                "Require signed commits": "要求带签名的提交",
                "Commits pushed to matching branches must have verified signatures.": "推送到匹配分支的提交必须带有经过验证的签名。",
                "Require linear history": "要求线性历史记录",
                "Prevent merge commits from being pushed to matching branches.": "防止合并后的提交被推送到匹配的分支。",
                "Include administrators": "包括管理员",
                "Enforce all configured restrictions above for administrators.": "对管理员执行上述所有配置进行限制。",

                "Rules applied to everyone including administrators": "规则适用于每个人，包括管理员",
                "Allow force pushes": "允许强制推送",
                "Permit force pushes for all users with push access.": "允许所有有推送权限的用户强制推送。",
                "Allow deletions": "允许删除",
                "Allow users with push access to delete matching branches.": "允许有推送权限的用户删除匹配的分支。",

                "Create": "创建",

            // Web 钩子 页面 /<user-name>/<repo-name>/settings/hooks====================================
                "Add webhook": "添加钩子",
                "Webhooks allow external services to be notified when certain events happen. When the specified events happen, we’ll send a POST request to each of the URLs you provide. Learn more in our": "Web 钩子允许在发生某些事件时通知外部服务。当指定的事件发生时，我们将向您提供的每个 URL 发送 POST 请求。了解更多信息，在我们的",
                "Webhooks Guide": "Web 钩子指南",

            // 添加钩子 页面 /<user-name>/<repo-name>/settings/hooks/new ====================================
                "Webhooks /": "Web 钩子 /",
                "We’ll send a": "我们将",
                "request to the URL below with details of any subscribed events. You can also specify which data format you’d like to receive (JSON,": "请求到以下 URL，其中包含任何订阅事件的详细信息。您还可以指定要接收的数据格式（JSON、",
                "etc": "等",
                "). More information can be found in": "）。更多信息可以在",
                "our developer documentation": "开发人员文档",

                "Payload URL": "有效载荷 URL",
                "Content type": "内容类型",
                "Secret": "机密",

                "SSL verification": "SSL 验证",
                "By default, we verify SSL certificates when delivering payloads.": "默认情况下，我们在交付有效负载时验证 SSL 证书。",
                "Enable SSL verification": "启用 SSL 验证",
                "Disable": "禁用",
                "(not recommended)": "（不推荐）",

                "Which events would you like to trigger this webhook?": "您希望哪些事件触发此 Web 钩子？",
                    "Just the": "仅",
                    "push": "推送",
                    "event.": "事件。",
                    "Send me": "发送给我",
                    "everything": "所有",
                    "Let me select individual events.": "让我选择单个事件。",
                    "Active": "激活",
                    "We will deliver event details when this hook is triggered.": "当钩子被触发时，我们将提供事件详细信息。",

            // 通知管理 页面 /<user-name>/<repo-name>/settings/notifications/edit ====================================
                "Setup email addresses to receive notifications when push events are triggered.": "设置电子邮箱地址，以便在推送事件被触发时收到通知。",
                "Address": "电子邮箱地址",
                "Whitespace separated email addresses (at most two).": "用空格分隔的电子邮箱地址（最多两个）。",
                "Approved header": "批准的标题",
                "Sets the": "设置",
                "Approved": "批准",
                "header to automatically approve the message in a read-only or moderated mailing list.": "标头以自动批准只读或审核邮件列表中的邮件。",
                "We will send notification emails to the listed addresses when a":"我们将向所列地址发送通知邮件，当",
                "event is triggered.":"事件被触发。",
                "Setup notifications": "设置通知",

            // 集成 页面 /<user-name>/<repo-name>/settings/installations====================================
            // 全局设置在 Applications 应用 /settings/installations
                "Installed GitHub Apps": "安装的 GitHub 应用",
                "GitHub Apps augment and extend your workflows on GitHub with commercial, open source, and homegrown tools.": "GitHub 应用通过商业、开源和自主开发的工具来增强和扩展您在 GitHub 上的工作流程。",
                "Configure": "配置",

            // 部署密钥 页面 /<user-name>/<repo-name>/settings/keys====================================
                "Add deploy key": "添加部署密钥",
                "There are no deploy keys for this repository": "此仓库暂无部署密钥",
                "Check out our": "查看我们的",
                "guide on deploy keys": "部署密钥指南",
                "to learn more.": "了解更多。",
                "Last used within the last week": "最后一次使用是最近 1 周之内",

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

                // 密钥删除对话框
                "Are you sure you want to delete this SSH key?": "您确定要删除此 SSH 密钥吗？",
                // "This action": "该操作",
                // "cannot": "不能",
                "be undone. This will permanently delete the SSH key, and if you’d like to use it in the future, you will need to upload it again.": "被撤销。这将永久地删除 SSH 密钥，如果您想在未来使用它，您将需要再次上传它。",
                "I understand, delete this SSH key": "我明白了，依然删除该 SSH 密钥",

                // 顶部提醒
                "Okay, you have successfully deleted that key.": "好的，您已成功删除该密钥。",

            // 操作页面 /<user-name>/<repo-name>/settings/actions
                "Actions permissions": "操作权限",
                    "Allow all actions": "允许所有操作",
                        "Any action can be used, regardless of who authored it or where it is defined.": "可以使用任何操作，而不管它是谁创作的或在哪里定义的。",
                "Disable Actions": "禁用操作",
                    "The Actions tab is hidden and no workflows can run.": "“操作” 选项卡将被隐藏，无法运行任何工作流程。",
                "Allow local actions only": "仅允许本地操作",
                    // [/Only actions defined in a repository within (\w+.*) can be used./, "只能使用在 $1 中的仓库中定义的操作。"], // 操作页面
                "Allow select actions": "允许选择操作",
                    // [/Only actions that match specified criteria, plus actions defined in a repository within (\w+.*), can be used./, "只能使用符合指定条件的操作，以及在 $1 中的仓库中定义的操作。"], // 操作页面
                    "Learn more about allowing specific actions to run.": "了解更多关于允许运行特定操作的信息。",
                    "Allow actions created by GitHub": "允许由 GitHub 创建的操作",
                    "Allow Marketplace actions by": "允许市场操作，",
                    "verified creators": "由经验证的创建者创建",
                    "Allow specified actions": "允许指定的操作",
                    "Enter a comma-separated list of actions": "输入以逗号分隔的操作列表",
                    "Wildcards, tags, and SHAs are allowed. Examples:": "允许使用通配符、标签和 SHA。例如：",

                "Artifact and log retention": "工件和日志保留",
                    "This is the duration that artifacts and logs will be retained.": "这是工件和日志将被保留的时间。",
                    "days": "天",

                "Fork pull request workflows from outside collaborators": "来自外部合作者的复刻拉取请求工作流程",
                    "Choose which subset of outside collaborators will require approval to run workflows on their pull requests.": "选择哪些外部合作者的子集需要批准才能对他们的拉取请求运行工作流程。",
                "Require approval for first-time contributors who are new to GitHub": "要求对首次加入 GitHub 的贡献者进行审批",
                    "Only first-time contributors who recently created a GitHub account will require approval to run workflows.": "只有最近创建 GitHub 帐户的首次贡献者才需要获得批准才能运行工作流程。",
                "Require approval for first-time contributors": "要求对首次贡献者进行审批",
                    "Only first-time contributors will require approval to run workflows.": "只有首次贡献者才需要获得批准才能运行工作流程。",
                "Require approval for all outside collaborators": "要求对所有外部合作者进行审批",
                    "All outside collaborators will always require approval to run workflows on their pull requests.": "所有外部合作者将始终需要批准才能在他们的拉取请求上运行工作流程。",

                "Workflow permissions": "工作流程权限",
                    "Choose the default permissions granted to the GITHUB_TOKEN when running workflows in this repository. You can specify more granular permissions in the workflow using YAML.": "在仓库中运行工作流程时，选择授予 GITHUB_TOKEN 的默认权限。您可以使用 YAML 在工作流程中指定更细化的权限。",
                    "Read and write permissions": "读取和写入权限",
                        "Workflows have read and write permissions in the repository for all scopes.": "工作流程在仓库中对所有作用域具有读和写的权限。",
                    "Read repository contents permission": "只读权限",
                        "Workflows have read permissions in the repository for the contents scope only.": "工作流程在仓库中对所有作用域具有只读的权限。",

            // 运行器页面 /<user-name>/<repo-name>/settings/actions/runners
                "New self-hosted runner": "新建自托管运行器",
                "Host your own runners and customize the environment used to run jobs in your GitHub Actions workflows.": "托管您自己的运行器，并定制用于在您的 GitHub Actions 工作流程中运行作业的环境。",
                "Learn more about self-hosted runners": "了解更多关于自托管运行器的信息",
                "There are no runners configured": "暂无设置运行器",
                "Learn more about using runners": "了解更多关于使用运行器的信息",
                "to run actions on your own servers.": "在您自己的服务器上运行操作的信息。",

            // 创建运行器页面 /<user-name>/<repo-name>/settings/actions/runners/new
                "/ Create self-hosted runner": "/ 创建自托管运行器",
                "Adding a self-hosted runner requires that you download, configure, and execute the GitHub Actions Runner. By downloading and configuring the GitHub Actions Runner, you agree to the": "添加一个自托管运行器需要您下载、配置并执行 GitHub Actions Runner。下载并配置 GitHub Actions Runner 后，您同意",
                    "GitHub Terms of Service": "GitHub 服务条款",
                    "GitHub Corporate Terms of Service": "GitHub 企业服务条款",
                    ", as applicable.": "，如适用。",
                "Runner image": "运行器镜像",
                "Architecture": "架构",
                "Download": "下载",
                "We recommend configuring the runner under \"\\actions-runner\". This will help avoid issues related to service identity folder permissions and long path restrictions on Windows.": "我们建议在 “\\actions-runner” 下配置运行器。这将有助于避免与 Windows 上的服务标识文件夹权限和长路径限制相关的问题。",
                "Using your self-hosted runner": "使用您的自托管运行器",
                "For additional details about configuring, running, or shutting down the runner, please check out our": "关于配置、运行或关闭运行器的其他细节，请查看我们的",
                "product docs": "产品文档",

            // 仓库 环境 /<user-name>/<repo-name>/settings/environments
                "New environment": "新建环境",
                "There are no environments for this repository": "此仓库尚无环境",
                "Environments are used by your workflows for deployments.": "您的工作流程使用环境进行部署。",
                "You can configure environments with protection rules and secrets.": "您可以使用保护规则和密钥配置环境。",

                // 删除环境对话框
                "Are you sure you want to delete this environment?": "您确定要删除此环境吗？",
                "Deleting an environment will delete all secrets and protection rules associated with the environment.": "删除环境将删除与环境关联的所有密钥和保护规则。",
                "I understand, delete this environment": "我明白了，依然删除这个环境",
                // 顶部提醒
                "Environment deleted.": "环境已删除。",

            // 仓库 新建环境 /<user-name>/<repo-name>/settings/environments/new
                "/ Add": "/ 添加",
                "Name": "名称",
                "Configure environment": "设置环境",
                // [/Environment \"(\w+)\" created./, "环境 \"$1\" 已创建。"],

            // 编辑环境 /<user-name>/<repo-name>/settings/environments/19897411/edit
                "/ Configure": "/ 设置",
                "Environment protection rules": "环境保护规则",
                "Can be used to configure manual approvals and timeouts.": "可用于配置人工审批和超时。",

                "Required reviewers": "所需的审查员",
                "Specify people or teams that may approve workflow runs when they access this environment.": "指定访问此环境时可以批准工作流运行的人员或团队。",
                    "Add up to": "最多添加",
                    "more reviewers": "位审查员",
                    "Search for people or teams...": "搜索人员或团队...",
                "Wait timer": "等待计时器",
                "Set an amount of time to wait before allowing deployments to proceed.": "设置一个允许部署前的等待时间。",
                    "minutes": "分钟",
                "Save protection rules": "保存保护规则",

                "Deployment branches": "部署分支",
                    "Can be used to limit what branches can deploy to this environment using branch name patterns.": "可以使用分支名称模式来限制哪些分支可以部署到这个环境。",
                    "All branches": "全部分支",
                    "Any branch from this repository can deploy.": "该仓库的任何分支都可以部署。",
                    "Protected branches": "受保护的分支",
                    "Deployment limited to branches with protection rules.": "部署仅限于具有保护规则的分支。",
                    "Selected branches": "选中的分支",
                    "Specify a list of branches using branch name patterns.": "使用分支名称模式指定一个分支列表",
                "Environment secrets": "环境密钥",
                "Secrets are encrypted environment variables. They are accessible only by GitHub Actions in the context of this environment.": "密钥是加密的环境变量。它们只能由 GitHub Actions 在这个环境中访问。",
                "Add Secret": "添加密钥",
                "Add secret": "添加密钥",
                    // 添加密钥对话框
                    "Value": "值",
                    "Secret value": "密钥值",

            // 操作密钥 /<user-name>/<repo-name>/settings/secrets/actions
                "Actions secrets": "操作密钥",
                "New repository secret": "新建仓库机密",
                "Secrets are environment variables that are": "秘密是环境变量",
                "encrypted": "被加密",
                ". Anyone with": "。任何对此仓库具有",
                "collaborator": "协作者",
                "access to this repository can use these secrets for Actions.": "访问权限的人都可以将这些机密用于操作。",
                "Secrets are not passed to workflows that are triggered by a pull request from a fork.": "秘密不会传递给来自复刻的拉取请求触发的工作流程。",

                "There are no secrets for this repository's environments.": "这个仓库的环境暂无秘密。",
                "Encrypted environment secrets allow you to store sensitive information, such as access tokens, in your repository environments.": "加密的环境机密允许您在仓库环境中存储敏感信息，例如访问令牌。",
                "Manage your environments and add environment secrets": "管理您的环境并添加环境机密",

                "Repository secrets": "仓库机密",
                "There are no secrets for this repository.": "这个仓库暂无秘密。",
                "Encrypted secrets allow you to store sensitive information, such as access tokens, in your repository.": "加密的机密允许您在仓库中存储敏感信息，例如访问令牌。",

            // 新建仓库机密 /<user-name>/<repo-name>/settings/secrets/actions/new
                "/ New secret": "新建机密",

            // Dependabot 密钥 /<user-name>/<repo-name>/settings/secrets/dependabot
                "Dependabot secrets": "Dependabot 密钥",
                "Secrets are credentials that are": "秘密是凭证",
                "access to this repository can use these secrets for Dependabot.": "访问权限的人可以将这些机密用于 Dependabot。",
                "Secrets are not passed to forks.": "秘密不会传递给复刻。",
                "Encrypted secrets allow you to store private access tokens so that Dependabot can update dependencies from private registries.": "加密的机密允许您存储私有访问令牌，以便 Dependabot 可以从私有注册表更新依赖项。",

            // GitHub Pages 页面 /<user-name>/<repo-name>/settings/pages====================================
                "is designed to host your personal, organization, or project pages from a GitHub repository.": "旨在从 GitHub 仓库托管您的个人、组织或项目页面。",
                // 发布状态
                "Your site is published at": "您的站点发布在",
                "Your site is ready to be published at": "您的网站已准备好发布在",

                "Source": "来源",
                // 禁用时
                "GitHub Pages is currently disabled. Select a source below to enable GitHub Pages for this repository.": "GitHub Pages 目前已被禁用。在下面选择一个源，为该仓库启用 GitHub Pages。",
                "GitHub Pages is currently disabled. You must first add content to your repository before you can publish a GitHub Pages site.": "GitHub Pages 目前已被禁用。您必须先将内容添加到您的仓库，然后才能发布 GitHub Pages 站点。",
                // 启用时
                "Your GitHub Pages site is currently being built from the": "您的 GitHub Pages 站点，目前正建立于",
                "branch.": "分支。",
                "Branch:": "分支：",
                "Select branch": "选择分支",
                "None": "无",
                "Select folder": "选择文件夹",
                "/ (root)": "/ (根目录)",

                "You can't disable GitHub Pages while having a": "您无法禁用 GitHub Pages，当仓库存在",
                "branch in this repository. Read more on how to": "分支。阅读更多关如何",
                "unpublish your GitHub Pages site": "取消发布 GitHub Pages 站点",

                "Theme Chooser": "设置主题",
                "Select a theme to publish your site with a Jekyll theme using the": "选择一个主题，用 jekyll 主题发布您的站点，使用",
                "Select a theme to publish your site with a Jekyll theme.": "选择一个主题，用 Jekyll 主题发布您的站点。",
                "Choose a theme": "选择一个主题",
                "Hide thumbnails": "隐藏缩略图",
                "Show thumbnails": "显示缩略图",
                "Select theme": "选择主题",

                "Custom domain": "自定义域",
                "Custom domains allow you to serve your site from a domain other than": "自定义域允许您从其他域为您的站点提供服务，而不是",
                "Remove": "移除",
                    "Check again": "再检查一次",
                    // [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) DNS check is in progress./, "$1 的 DNS 检查正在进行。"],
                    "Please wait for the DNS check to complete.": "请等待 DNS 检查结束。",
                    // [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) is improperly configured/, "$1 配置不正确"],
                    // [/Your site's DNS settings are using a custom subdomain, ([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?), that's not set up with a correct CNAME record. We recommend you set this CNAME record to point at [YOUR USERNAME].github.io. For more information, see/, "您网站的 DNS 设置使用的是自定义子域 $1，该子域未设置正确的 CNAME 记录。我们建议您将此 CNAME 记录设置为指向 [YOUR USERNAME].github.io。有关详细信息，请参阅"],
                    // 顶部提醒
                    "No changes to custom domain.": "没有对自定义域进行修改。",
                    "Custom domain removed. Please remember to remove any GitHub Pages DNS records for this domain if you do not plan to continue using it with GitHub Pages.": "自定义域已删除。如果您不打算继续使用 GitHub Pages，请记得删除此域的任何 GitHub Pages 的 DNS 记录。",

                "Enforce HTTPS": "强制 HTTPS",
                "HTTPS provides a layer of encryption that prevents others from snooping on or tampering with traffic to your site.": "HTTPS 提供了一层加密，防止他人窥探或篡改您站点的流量。",
                "When HTTPS is enforced, your site will only be served over HTTPS.": "当开启强制 HTTPS 时，您的站点将只通过 HTTPS 提供服务。",
                "— Required for your site because you are using the default domain (": "— 必须先设置自定义域，目前您正在使用默认域 (",

                // 私有库 启用 Github Pages 提醒
                "Upgrade or make this repository public to enable Pages": "升级或公开该仓库，以启用 GitHub Pages",
                "GitHub Pages is designed to host your personal, organization, or project pages from a GitHub repository.": "GitHub Pages 旨在从 GitHub 仓库中托管您的个人、组织或项目页面。",

            // 审查设置 (仓库)互动限制 /<user-name>/<repo-name>/settings/interaction_limits
            // 同全局
                "Temporary interaction limits": "临时互动限制",
                "Temporarily restrict which external users can interact with your repository (comment, open issues, or create pull requests) for a configurable period of time.": "在配置的时间段内，可临时限制哪些外部用户与您的仓库互动（评论、打开议题或创建拉取请求）。",
                "This may be used to force a \"cool-down\" period during heated discussions or prevent unwanted interactions.": "可用于在激烈讨论期间，强制进入 “冷静” 期或防止不必要的互动。",

                "You can restrict repository interactions across your account in your": "您可以限制仓库交互，在您的帐户设置中的",
                "account settings": "互动限制",

                "Limit to existing users": "仅限现有用户",
                    "Users that have recently created their account will be unable to interact with the repository.": "最近创建帐户的用户将无法与该仓库互动。",
                "Limit to prior contributors": "仅限于先前的贡献者",
                    "Users that have not previously": "以前从未",
                    "committed": "提交",
                    // [/to the (\w+.*) branch of this repository will be unable to interact with the repository./, "到该仓库的 $1 分支的用户将无法与该仓库互动。"],
                "Limit to repository collaborators": "仅限仓库协作者",
                    "Users that are not": "不是",
                    // "collaborators": "",
                    // "of one of your repositories will not be able to interact with that repository.": "",
                    "will not be able to interact with the repository.": "将无法与该仓库互动。",

                "New users": "新用户",
                "Users": "用户",
                "Contributors": "贡献者",
                "Collaborators": "协作者",

                "Enable": "启用",
                "Disable": "禁用",
                // 交互限制时间 下拉菜单
                "Enable interaction limits for:": "启用交互限制：",
                "24 hours": "24 小时",
                "3 days": "3 天",
                "1 week": "1 周",
                "1 month": "1 个月",
                "6 months": "6个月",

                // 顶部提醒
                "Repository interaction limit settings saved.": "仓库交互限制设置已保存。",

            // Code review limits 代码审查限制 /<user-name>/<repo-name>/settings/code_review_limits
                "Restrict users who are permitted to approve or request changes on pull requests in this repository.": "限制那些有权批准或请求更改该仓库中拉取请求的用户。",
                "Limit to users explicitly granted": "限于明确授予",
                "read": "读取",
                "or higher access": "或 更高权限的用户",
                    "When enabled, only users explicitly granted access to this repository will be able to submit pull request reviews that \"approve\" or \"request changes\". All users able to submit comment pull request reviews will continue to be able to do so.": "启用后，只有被明确授予该仓库访问权的用户才能提交 “批准” 或 “请求更改” 的拉取请求审查。所有能够提交评论拉取请求审查的用户将继续能够这样做。",
        },
        "regexp": [ // 正则翻译
            [/Choose another branch to use as the default branch of (\w+.*) instead of/,"选择另一分支作为 $1 的默认分支而不是"], // 分支切换 对话框
            [/is already the branch name./, "已经是分支的名称了。"], // 重命名分支 对话框
            [/Your branch name will be/, "您的分支的名称将重命名为"], // 重命名分支 对话框
            [/Default branch changed to (\w+)/, "默认分支已经更改为 $1"], // 顶部提醒 当默认分支更改成功
            [/Last used within the last (\d+) weeks?/, "最后一次使用是最近 $1 周之内"], //密钥使用时间
            [/Invite collaborator/, "邀请协作者"], // 访问管理 -> 邀请协作者
            [/Enabled with about (\w+.*) remaining./, ""],
            [/to the (\w+.*) branch of this repository will be unable to interact with the repository./, "到该仓库 $1 分支的用户将无法与您的仓库互动。"], // 仓库互动限制
            // Github Pages 自定义域检测
            [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) DNS check is in progress./, "$1 的 DNS 检查正在进行中。"],
            [/([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?) is improperly configured/, "$1 配置不正确"],
            [/Your site's DNS settings are using a custom subdomain, ([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?), that's not set up with a correct CNAME record. We recommend you set this CNAME record to point at \[YOUR USERNAME\].github.io. For more information, see/, "您网站的 DNS 设置使用的是自定义子域 $1，该子域未设置正确的 CNAME 记录。我们建议您将此 CNAME 记录设置为指向 [YOUR USERNAME].github.io。有关详细信息，请参阅"],
            [/\((\w+.*)\). We recommend you change this to a CNAME record pointing to/, "($1)。我们建议您将 CNAME 记录设置为指向"],
            [/Only actions defined in a repository within (\w+.*) can be used./, "只能使用在 $1 中的仓库中定义的操作。"], // 操作页面
            [/Only actions that match specified criteria, plus actions defined in a repository within (\w+.*), can be used./, "只能使用符合指定条件的操作，以及在 $1 中的仓库中定义的操作。"], // 操作页面
        ],
    },

    "homepage": { // 未登录的首页
        "static": { // 静态翻译
            // 顶部栏
            "Why GitHub?": "为何选择 GitHub？",
            "Team": "团队",
            "Enterprise": "企业",
            // "Pricing": "价格",
            "Search GitHub": "GitHub 一下，您就知道",
            "Sign in": "登录",
            "Sign up": "注册",

            // "Built for developers": "专为开发者打造",
            "Email address": "电子邮箱地址",
            "Sign up for GitHub": "注册 GitHub",
            // "Refresh": "刷新",
            "Developers": "开发者",
            "Organizations": "组织",
            "Fortune 50": "财富 50 强",
        },
        "regexp": [ // 正则翻译
        ],
    },

    "session-authentication": { // 登录页 包含(/login, /session, /sessions/two-factor, sessions/recovery等)
        "static": { // 静态翻译
            // 登录页 https://github.com/login
                "Sign in to GitHub": "登录 GitHub",
                "Username or email address": "用户名或电子邮箱",
                "Password": "密码",
                "Forgot password?": "忘记密码？",
                "Incorrect username or password.": "用户名或密码不正确。",
                "Recovery code authentication failed.": "恢复码身份验证失败。",
                "Sign in": "登录",
                "Signing in…": "登录中…",
                "New to GitHub?": "初次接触 GitHub？",
                "Create an account": "那就注册个帐户吧",

            // 双因素登录验证 https://github.com/sessions/two-factor
                // "Learn more": "了解更多",
                // "Learn more.": "了解更多。",
                "Confirm password to continue": "确认密码以继续",
                "Confirm password": "确认密码",
                "Tip:": "提示：",

                "Two-factor authentication": "双因素身份验证",
                "Authentication code": "验证码",
                //"Signing in…": "登录中…",
                "What’s this?": "这是什么？",
                "6-digit code": "6位验证码",
                "Verify": "验证",
                "Verifying": "验证中",
                "Verifying…": "验证中…",
                "Open the two-factor authentication app on your device to view your authentication code and verify your identity.": "打开设备上的两因素身份验证程序以查看身份验证码并验证您的身份。",
                "Having problems?": "有议题吗？",
                "Enter a two-factor recovery code": "输入恢复码",
                "Can’t access your two-factor device or valid recovery codes?": "无法访问您的双因素验证设备或有效的恢复码？",

                "Recovering your account": "恢复您的帐户",
                "If you can’t access a verified device or recovery codes you can request a reset of your authentication settings. For security reasons": "如果您无法访问已验证的设备或恢复码，您可以请求重置您的验证设置。出于安全考虑",
                "this can take 3-5 business days": "这可能需要 3-5 个工作日",
                "Step 1": "第一步",
                "Verify an email associated with this account.": "验证与该帐户相关的电子邮箱。",
                "Step 2": "第二步",
                "Verify a device, SSH key or personal access token.": "验证一个设备、SSH 密钥或个人访问令牌。",
                "Step 3": "第三步",
                "GitHub support will review your request": "GitHub Support 将审查您的请求",
                "within 3-5 business days": "在 3-5 个工作日内",
                "I understand, get started": "我知道了，开始吧",
                "Two-factor authentication failed.": "双因素身份验证失败。",

            // https://github.com/sessions/two-factor/recovery
                "Two-factor recovery": "双因素验证恢复",
                "Recovery code": "恢复码",
                "You can enter one of your recovery codes in case you lost access to your mobile device.": "如果您无法访问移动设备，则可以输入恢复码。",
                "Still having problems?": "还是有问题？",

            // https://github.com/sessions/recovery
                "Account recovery": "帐户恢复",
                "First we need to verify an email address": "首先，我们需要验证一个电子邮箱地址",
                "by sending a one-time password to all addresses associated with this account.": "用于通过向该帐户关联的所有地址发送一次性密码。",
                "Send one-time password": "发送一次性密码",
                "Skip this with recovery codes": "使用恢复码跳过此步骤",
                "If you can locate your two-factor recovery codes you can skip this recovery process.": "如果您能找到您的双因素恢复码，您可以跳过这个恢复过程。",
                "The file containing your recovery codes may exist on your computer - check for a file named": "包含恢复码的文件可能存在于您的计算机上——请检查一个名为",
                "Enter recovery code": "输入恢复码",

                "Recovery email sent": "已发送恢复电子邮件",
                "One-time password": "一次性密码",
                "Verify email address": "验证电子邮箱地址",
                "We sent an email to all addresses associated with this account containing a one-time password.": "我们向与该帐户相关的所有邮箱地址发送了一封电子邮件，其中包含一个一次性的密码。",
                "Resend email": "重新发送邮件",
                "Sign in to": "登录",
                "To continue to": "继续登录",

                // 定时确认确认您的帐户恢复设置
                "Confirm your account recovery settings": "确认您的帐户恢复设置",
                "Are your account recovery settings up to date? If not, you risk getting locked out of your account.": "您的帐户恢复设置是否最新？如果没有，您就有被锁定帐户的风险。",
                "Update": "更新",
                "Confirm": "确认",
                "Remind me later": "稍后提醒我",
                "Configured": "已配置",
                "No security keys": "未配置安全密钥",
                "Not configured": "未配置",
                "No fallback SMS number": "未设置备用手机号码",
                "No recovery tokens": "未设置恢复令牌",

            // 授权访问 (已经合并到settings)
            "Confirm access": "授权访问",
            //"Password": "密码",
            //"Forgot password?": "忘记密码？",
            "You are entering": "您正在进入",
            "sudo mode": "Sudo 模式",
            ". We won’t ask for your password again for a few hours.": " 。我们将在未来几个小时内不再要求您输入密码。",

            // 重置密码 https://github.com/password_reset
                "Reset your password": "重置您的密码",
                "Enter your user account's verified email address and we will send you a password reset link.": "输入您的用户帐户经过验证的电子邮箱，我们将向您发送一份带密码重置链接的邮件。",
                "Enter your email address": "输入您的邮箱地址",
                "Verify your account": "验证您的帐户",
                "Send password reset email": "发送密码重置邮件",
                "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.": "检查您的电子邮件以获取重置密码的链接。如果它在几分钟内没有出现，请检查您的垃圾邮件文件夹。",
                "Return to Sign in": "返回登录",

        },
        "regexp": [ // 正则翻译
        ],
    },

    "signup": { // 注册页
        "static": { // 静态翻译
            "Already have an account?": "已经有帐户吗？",
            "Sign in →": "登录 →",
            "Welcome to GitHub!": "欢迎来到 GitHub!",
            "Let’s begin the adventure": "让我们开始探险吧",
            "Enter your email": "输入您的邮箱地址",
            "Continue": "继续",
            "Email is invalid or already taken": "电子邮件无效或已被占用",
            "Create a password": "创建密码",
            "Password is too short": "密码太短",
            "Password needs a number and lowercase letter": "密码需要有数字和小写字母",
            "Password is strong": "密码很强壮",
            "Make sure it's": "请确保",
            "at least 15 characters": "至少需要15个字符",
            "OR": " 或者",
            "at least 8 characters": "至少需要8个字符",
            "including a number": "包括数字",
            "and a lowercase letter": "和小写字母",
            "password may be compromised": "密码可能被泄露",
            "password is in a list of passwords commonly used on other websites": "密码在其他网站常用的密码列表中",
            "Enter a username": "输入您的用户名",
            "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.": "用户名只能包含字母数字字符或单个连字符，并且不能以连字符开头或结尾。",
            "Would you like to receive product updates and announcements via email?": "您是否愿意通过电子邮件接收产品更新和公告？",
            "Type \"y\" for yes or \"n\" for no": "输入 \"y\" 表示愿意，输入 \"n\" 表示不愿意。",
            "Verify your account": "验证您的帐户",
            "Create account": "创建帐户",
            "By creating an account, you agree to the": "创建帐户即表示您同意",
            "Terms of Service": "服务条款",
            ". For more information about GitHub's privacy practices, see the": "。有关 GitHub 隐私惯例的更多信息，请参阅",
            "GitHub Privacy Statement": "GitHub 隐私声明",
            ". We'll occasionally send you account-related emails.": "。我们偶尔会向您发送与帐户相关的电子邮件。",
        },
        "regexp": [ // 正则翻译
            [/Username (\w+) is not available./, "用户名 $1 不可用。"],
        ],
    },

    "notifications": { // 通知页面
        "static": { // 静态翻译
            "Notifications": "通知",
            "All": "所有",
            "Unread": "未读",

            "Inbox": "收件箱",
            "Saved": "已保存",
            "Save": "保存",
            "Done": "已完成",
            "Filters": "过滤",
            "Dismiss": "关闭",
            "get started": "开始",
            "Subscribe": "订阅",
            "Unsubscribe": "退订",

            "Filter notifications": "过滤通知",
                "Available filters": "可用过滤器",
                "filter by repository": "筛选仓库",
                "filter by status or discussion type": "筛选状态或评论类型",
                "filter by notification reason": "筛选通知原因",
                "filter by notification author": "筛选通知作者",
                "filter by organization": "筛选组织",
            "Group by:": "分组：",
            "Date": "日期",
            "Repository": "仓库",
            // [/(\d+) new notifications?/, "$1 条新通知"], // 通知管理页

            "Select all": "全选",
            "selected": "个被选中",
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
            "Watched repositories": "订阅的仓库",
            "Subscriptions": "订阅",
            "Watching": "关注",

            "subscribed": "订阅",
            "mention": "提及",
            "commented": "评论",
            "author": "作者",

            "View all gist notifications": "查看全部 Gist 通知", // 仓库分组模式

            "Prev": "上一页",
            "Previous": "上一页",
            "Next": "下一页",

            "change notification settings": "更改通知设置",
            "you can change how you receive notifications from your account settings.": "您可以更改通过帐户设置接收通知的方式。",
            "unwatch suggestions": "取消关注建议",
            "these repositories may be causing unnecessary notifications.": "这些仓库可能导致不必要的通知。",
            "unwatch all": "全部取消关注",
            "customize": "自定义",

            "🎯 Assigned": "🎯 已分配",
            "💬 Participating": "💬 参与",
            "✋ Mentioned": "✋ 提及",
            "🙌 Team mentioned": "🙌 提到的团队",
            "👀 Review requested": "👀 审查请求",
            "Name": "名称",
            "Filter inbox by…": "过滤收件箱…",
            "Create new filter": "创建新规则",
            "Create": "创建",
        },
        "regexp": [ // 正则翻译
            [/(\d+) selected/, "$1 个被选中"],
            [/Select all (\d+) notifications?/, "选中全部 $1 个通知"],
            [/View all (\d+) notifications?/, "查看全部 $1 个通知"], // 仓库分组模式
        ],
    },

    "watching": { // 关注的仓库页面
        "static": { // 静态翻译
            "Notifications": "通知",
            "Watching": "关注",
            "Subscriptions": "订阅",
            "Custom": "自定义",
            // "Ignoring": "忽略",

            "Ignoring": "忽略",
            "Stop ignoring": "取消忽略",
            "Watch": "订阅",
            "Unwatch": "取消订阅",

            //"Watched repositories": "关注的仓库",

            // "Stop ignoring": "取消忽略",
            //"Sorted by most recently watched.": "按最近关注排序",
            "Unwatch all": "取消所有关注",

            // 关注 & 订阅通知设置 下拉菜单
            // "Notifications": "通知类型",
            "Participating and @mentions": "参与和 @您",
            "Only receive notifications from this repository when participating or @mentioned.": "仅在参与或 @您时接收来自此仓库的通知。",
            "All Activity": "所有活动",
            "Notified of all notifications on this repository.": "接收来自此仓库所有通知。",
            "Ignore": "忽略",
            "Never be notified.": "永不接收通知。",
            // "Custom": "自定义",
            "Select events you want to be notified of in addition to participating and @mentions.": "选择除参与和 @您之外还要接收通知的事件。",
            "Discussions are not enabled for this repo": "此仓库未启用讨论功能",
            "Releases": "发行版",
            "Discussions": "讨论",
            "Security alerts": "安全警报",
            //"Cancel": "取消",
            "Apply": "应用",

            "Notification settings": "通知设置",
            "You can change how you receive notifications from your account settings.": "您可以修改接收通知的方式。",
            "Change notification settings": "修改通知设置",
        },
        "regexp": [ // 正则翻译
        ],
    },

    "notifications/subscriptions": { //订阅的仓库页面
        "static": { // 静态翻译
            "Notifications": "通知",
            "Watching": "关注",
            "Subscriptions": "订阅",

            "Reason": "原因",
                "Filter by reason": "过滤原因",
                "Any reason": "任何原因",
                "Show all subscriptions": "显示所有订阅",
                "Assign": "分配",
                "You were assigned to the Issue/PR.": "您被分配到议题/拉取请求。",
                "Author": "作者",
                "You created the thread.": "您创造了这个话题。",
                "Comment": "评论",
                "You commented on the thread.": "您评论了这个话题。",
                "Manual": "手册",
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
                "Filter by repository": "按仓库过滤",
                "Filter repository": "过滤仓库",
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

            "opened": "打开",
            "• subscribed": "• 订阅于",
            "• updated": "• 更新于",
        },
    },

    "stars": { // 星标页面
        "static": { // 静态翻译
            "All stars": "所有仓库",
            "Your repositories": "您的仓库",
            "Others' repositories": "其他仓库",

            "Filter by languages": "筛选语言",
            "Jump to a friend": "去好基友那",
        },
        "regexp": [ // 正则翻译
        ],
    },

    "trending": { // 趋势页面
        "static": { // 静态翻译
            "Trending in open source": "开源趋势",
            "See what the GitHub community is most excited about today.": "看看 GitHub 社区今天最受关注的项目。",
            "See what the GitHub community is most excited about this week.": "看看 GitHub 社区本周最受关注的项目。",
            "See what the GitHub community is most excited about this month.": "看看 GitHub 社区本月最受关注的项目。",

            "Trending developers": "开发者趋势",
            "These are the organizations and developers building the hot tools today.": "这是今天创建热门项目的组织和开发人员。",
            "These are the organizations and developers building the hot tools this week.": "这是本周创建热门项目的组织和开发人员。",
            "These are the organizations and developers building the hot tools this month.": "这是本月创建热门项目的组织和开发人员。",

            "Repositories": "仓库",
            "Developers": "开发者",

            "Trending:": "趋势：",
            "Adjust time span": "调整的时间跨度",
            "today": "今天",
            "this week": "本周",
            "this month": "本月",

            "All languages": "所有语言",
            "Unknown languages": "未知语言",

            "Other:": "其他：",
            "Languages": "语言",
            "Other Languages": "其他语言",
            "Filter Languages": "筛选语言",
        },
        "regexp": [ // 正则翻译
            [/([\d,]+) stars today([^B]+)[\w ]+/, "今天 $1 赞$2创建者"],
            [/([\d,]+) stars this week([^B]+)[\w ]+/, "本周 $1 赞$2创建者"],
            [/([\d,]+) stars this month([^B]+)[\w ]+/, "本月 $1 赞$2创建者"],
        ],
    },

    "showcases": { // 展示页面
        "static": { // 静态翻译
            "Open source showcases": "开源展示",
            "Browse popular repositories based on the topic that interests you most.": "浏览热门仓库基于您最感兴趣的主题。",
            "Search showcases": "搜索展示",
        },
    },

    "issues": { // 议题页面
        "static": { // 静态翻译
            "Created": "已创建",
            "Assigned": "已分配",
            "Mentioned": "提到的",
            "Review requests": "审查请求", // pulls

            "Search all issues": "搜索所有议题",

            "Visibility": "可见性",
            "Repository visibility": "仓库可见性",
            "Private repositories only": "只有私有仓库",
            "Public repositories only": "只有公共库",

            "Organization": "组织",
            "Filter by organization or owner": "通过组织或所有者筛选",
            "Filter organizations": "筛选组织",

            "Sort": "排序",
            "Sort by": "排序方式",
            "Newest": "最新的",
            "Oldest": "最老的",
            "Most commented": "最多评论",
            "Least commented": "最少评论",
            "Recently updated": "最近更新",
            "Least recently updated": "最早更新",
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
            "all of GitHub": "所有 Github",
            "or try an": "或者尝试",
            "advanced search": "高级搜索",

            // "Use the links above to find what you’re looking for, or try": "使用上面的链接找到您要找的内容，或尝试",
            // "a new search query": "新的搜索查询",
            // ". The Filters menu is also super helpful for quickly finding issues most relevant to you.": "。过滤菜单也是快速找到议题最相关的您超级有帮助的。",
            // "Updated in the last three days": "更新了最后三天：",
            "ProTip!": "专业提示！",
                "Mix and match filters to narrow down what you’re looking for.": "通过混合和匹配筛选器以缩小您要查找的范围。",
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
            [/Assigned to (\w+)/, "分配给 $1"],
        ],
    },

    "search": { // 搜索页面
        "static": { // 静态翻译
            // 搜索 https://github.com/search >>>>>>>>>>>>>>>>>>>>>>>>
                "Search more than": "这里有超过",
                "repositories": "的仓库供您搜索",
                "users": "用户在使用",
                "issues": "议题被提出",
                "Search GitHub": "GitHub 一下，您就知道",


                // ProTip
                "For an": "要进行",
                "advanced search": "高级搜索",
                ", use some of our": "，使用我们的这些",
                "prefixes.": "前缀。",
                // "You could try an": "您可以尝试",

                // 搜索技巧 对话框 (忽略 不翻译)
                "Search cheat sheet": "搜索小技巧",
                "GitHub’s search supports a variety of different operations. Here’s a quick cheat sheet for some of the common searches.": "GitHub 的搜索支持各种不同的操作。下面是一些常见搜索的快速小抄。",
                "For more information, visit our": "有关更多信息，请访问我们的",
                "search help section": "搜索帮助章节",
                "Basic search": "基本搜索",
                "This search": "该搜索",
                "Finds repositories with…": "查找仓库...",

            // 搜索结果页面 https://github.com/search?q=  >>>>>>>>>>>>>>>>>>>>>>>>
                // 左侧菜单
                "Repositories": "仓库",
                "Code": "代码",
                "Commits": "提交",
                "Discussions": "讨论",
                "Topics": "主题",
                "Users": "用户",

                "States": "状态",
                "Closed": "已关闭",
                "Open": "打开",

                "Languages": "语言",

                "Advanced search": "高级搜索",
                "Cheat sheet": "搜索技巧",

                "Sort:": "排序：",
                // 筛选下拉
                "Sort options": "排序选项",
                "Best match": "最佳匹配",
                "Most stars": "最多星标",
                "Fewest stars": "最少星标",
                "Most forks": "最多复刻",
                "Fewest forks": "最少复刻",
                "Recently updated": "最近更新",
                "Least recently updated": "最早更新",
                // 代码
                "Recently indexed": "最近索引",
                "Least recently indexed": "最早索引",
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

                // 部分状态词
                "Updated": "更新于",
                "Last indexed": "最近索引",
                "committed": "提交",
                "committ": "提交",
                "opened": "打开",
                "Last updated": "最近更新",

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
                "and": "要",
                "only": "仅",
                "including forks.": "包括被复刻的仓库。",

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
            // 搜索结果页
            [/(Showing |)([\d,]+) ((repository|code|commit|available commit|package|marketplace|topic|wiki) results?|issues?|discussions?|users?)/, "$2 个相关结果"],
            [/We couldn(’|')t find (any|anything) (repositories|codes|commits|issues|discussions|packages|in the GitHub Marketplace|topics|wiki pages|users) matching '(.+)'/, "我们没有找到任何与 '$4' 相关的结果"],
        ],
    },

    "gist": { // 代码片段页面
        "static": { // 静态翻译
            "Instantly share code, notes, and snippets.": "即时分享您的代码，笔记，片段，以及灵感。",
            "Search…": "搜索代码片段…",
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

            // 新建片段页面
            "View your gists": "查看您的所有片段",
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
            "Sort:": "排序：",
            "Sort options": "排序选项",
            "Recently created": "最近创建的",
            "Least recently created": "最早创建的",
            "Recently updated": "最近更新的",
            "Least recently updated": "最早更新的",

            "Type:": "类型：",
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
            "Edit": "编辑",
            "Delete": "删除",
            "Are you positive you want to delete this Gist?": "您确定要删除此 Gist 吗？",
            "Subscribe": "订阅",
            // "Unsubscribe": "退订",
            "Star": "星标",
            "Unstar": "取消星标",
            "User actions": "用户操作",
            "Report abuse": "举报滥用",

            "Code": "代码",
            "Revisions": "修订",
            "Stars": "星标",
            "Forks": "复刻",

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
            "Learn more about clone URLs": "了解有关克隆地址的更多信息",

            "Copy to clipboard": "复制到剪切板",
            "Copied!": "复制成功!",
            "Download ZIP": "下载 Zip 压缩包",
            "Permalink": "永久链接",

            // 顶部提醒
            "Gist deleted successfully.": "代码片段已成功删除。",

            // 代码标签卡
            "Raw": "源码",

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
            // [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "/$1 处添加，$2 处删除未显示，因为差异太大。请使用本地 Git 客户端查看这些更改。"],

            // 星标标签卡
            "Stargazers": "追星者",

            // 复刻标签卡
            "Modified": "修改",
            "View fork": "浏览复刻",

            // 编辑代码页面
            "Editing": "编辑",
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

            "You are the owner of the gist.": "您是代码片段的所有者。",
            "You are the author of this gist.": "您是代码片段的作者。",

            "commented": "评论于",
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
            [/(\d+) changed file/, "$1 个更改的文件"],
            [/(\d+) additions?$/, "$1 处增加"],
            [/(\d+) deletions?$/, "$1 处删除"],
            [/(\d+) changes?: (\d+) additions? & (\d+) deletions?/, " $1 处更改：$2 处增加 & $3 处删除"],
            [/([\d,]+) additions, ([\d,]+) deletions not shown because the diff is too large. Please use a local Git client to view these changes./, "/$1 处增加，$2 处删除未显示，因为差异太大。请使用本地 Git 客户端查看这些更改。"],
            [/Edited (\d+) times?/,"编辑 $1 次"], //评论框编辑次数
            [/edited by (\w+)/,"被 $1 编辑"], //评论框 被他人编辑
            [/Joined/,"加入于"], //星标标签卡
        ],
    },

    "login/oauth": { // 应用授权
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
                "This application will be able to": "该应用程序将能够",
                "read and write all public and private repository data": "读写所有公共和私有仓库数据",
                ". This includes the following:": "。这包括以下内容：",
                "Wikis": "维基",
                "Webhooks and services": "Web 钩子和服务",
                "Deploy keys": "部署密钥",
                "Collaboration invites": "合作的邀请",

                "Personal user data": "个人用户资料",
                "Email addresses (read-only)": "电子邮箱地址(只读)",
                "This application will be able to read your private email addresses.": "此应用程序将能够读取您的私人电子邮箱地址。",

            // 第五页 即将跳转到 重定向页面
                "You are being redirected to the authorized application.": "您将被重定向到授权的应用程序。",
                "If your browser does not redirect you back, please": "如果您的浏览器没有将您重定向回来，请",
                "click here": "点击这里",
                "to continue.": "继续。",
                "would like permission to:": "希望获得以下许可：",
                "Know which resources you can access": "了解您可以访问哪些资源",

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
            // /login/oauth/authorize?client_id=Iv1.1a4d20f84a40d790&state=login
            [/Verify your GitHub identity/, "验证您的 GitHub 身份"],
            [/has not been installed on any accounts you have access to./, "尚未安装在您有权访问的任何帐户上。"],
            [/Learn more about/, "了解更多关于"],
            [/More than (\w+)/, "超过 $1"],
            // /apps/codacy-production/installations/new/permissions?target_id=7850715
            [/Install & Authorize on your personal account/, "安装和授权到您的个人帐户"],
            [/Install & Authorize/, "安装和授权"],
            [/Authorize (\w+.*)/, "授权 $1"], // /login/oauth/authorize?client_id=Iv1.1a4d20f84a40d790&state=login 调整位置避免覆盖
            [/Installing and authorizing (\w+.*) immediately grants these permissions on your account:/, "安装和授权 $1则会立即授予您帐户的以下权限："],
            [/Selected (\d+) repositor(y|ies)./, "选择了 $1 个仓库。"],
        ],
    },

    "orgs": { // 组织页面
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },

    "explore": { // 探索页面
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },

    "account/organizations/new": { // 创建组织
        "static": { // 静态翻译
            "Tell us about your organization": "告诉我们您的组织",
            "Set up your organization": "设置您的组织",
            "Organization account name": "组织帐户名称",
            // [/The name \'(\d+)\' is already taken./, "名称 '$1' 已被采用。"],
            // [/The name \'(\d+)\' may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen./, "名称 '$1' 只能包含字母数字字符或单个连字符，并且不能以连字符开头或结尾。"],
            // [/Organization name \'(\w+.*)\' is unavailable./, "组织名称 \'$1\' 不可用。"], //
            "This will be the name of your account on GitHub.": "这将是您在 GitHub 上的帐户名称。",
            "Your URL will be: https://github.com/": "您的网址将是：https://github.com/",
            "Contact email": "联系电子邮箱",
                "Email is invalid": "电子邮箱无效",
            "This organization belongs to:": "该组织属于：",
            "My personal account": "我的个人账户",
                // [/I.e.,/, "即："],
            "A business or institution": "企业或机构",
            "For example: GitHub, Inc., Example Institute, American Red Cross": "比如说：GitHub, Inc., Example Institute, American Red Cross",
            "By creating an account, you agree to the": "创建帐户即表示您同意",
            "Terms of Service": "服务条款",
            ". For more information about GitHub's privacy practices, see the": "。关于 GitHub 隐私条款的更多信息，请参见",
            "GitHub Privacy Statement": "GitHub 隐私声明",
            ". We'll occasionally send you account-related emails.": "。我们偶尔会向您发送与帐户相关的电子邮件。",

            // https://github.com/organizations/maboloshi-inuyasha/invite
            "Start collaborating": "开始合作",
            // [/Welcome to/, "欢迎来到"],
            "Add organization members": "添加组织成员",
            "Organization members will be able to view repositories, organize into teams, review code, and tag other members using @mentions.": "组织成员将能够使用 @提及来查看仓库、组织成团队、审查代码以及标记其他成员。",
            "Learn more about permissions for organizations →": "了解更多有关组织权限的信息 →",
            "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
            "Complete setup": "完成设置",
            "Skip this step": "跳过",

            // https://github.com/orgs/maboloshi-inuyasha/invitations/bulk_create_for_new_org
            // https://github.com/orgs/maboloshi-inuyasha/welcome_survey/new

        },
        "regexp": [ // 正则翻译
            [/The name \'(\w+.*)\' is already taken./, "名称 '$1' 已被采用。"],
            [/The name \'(\w+.*)\' may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen./, "名称 '$1' 只能包含字母数字字符或单个连字符，并且不能以连字符开头或结尾。"],
            [/Organization name \'(\w+.*)\' is unavailable./, "组织名称 \'$1\' 不可用。"],
            [/I.e.,/, "即："],
        ],
    },

    "marketplace": { // 应用商店
        "static": { // 静态翻译
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
                "Next: Confirm your installation location and payment information.": "下一步：确认您的安装位置和付款信息。",
                "terms of service": "服务条款",
                "privacy policy": "隐私政策",
                ", and": "和",
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
                "grant this app access": "授予此应用程序的权限",
                "to your GitHub account.": "访问您的 GitHub 帐户。",
                "Cancel this plan": "取消计划",
                "Order summary": "订单摘要",
                "Current plan": "当前计划",
                "Billing information": "账单信息",
                "Personal account": "个人帐户",
                "Terms of Service": "服务条款",
                "and the": "和",
                "Privacy Policy": "隐私政策条款",
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
                "Read more about this app on the Marketplace": "了解更多有关商城中此应用程序的信息",
                "Install": "安装",
                "Next: Confirm your installation location.": "下一步：确认您的安装位置。",
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
        },
        "regexp": [ // 正则翻译
            // /marketplace/codacy
            [/(\d+) other languages? supported/, "$1 种其他语言支持"],
            [/(\w+) is provided by a third-party and is governed by separate/, "$1 是由第三方提供的，并受单独的"],
            // /marketplace/travis-ci/order/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW43MA==?account=maboloshi
            [/By clicking "Issue plan changes", you are agreeing to (\w+.*)’s/, "点击 “议题计划更改”，您同意 $1 的"],
            [/By clicking "Complete order and begin installation", you are agreeing to (\w+.*)’s/, "点击 “完成订购并开始安装”，表示您同意 $1 的"],
            [/Next: Authorize (\w+) to access your account./, "下一步：授权 $1 访问您的帐户。"],
        ],
    },

    "orgs/settings": { // 组织 设置页面
        "static": { // 静态翻译
            // 授权访问 (已经合并到组织设置)
                "Confirm access": "授权访问",
                "Password": "密码",
                "Forgot password?": "忘记密码？",
                "Confirm password": "确认密码",
                "You are entering": "您正在进入",
                "sudo mode": "Sudo 模式",
                ". We won’t ask for your password again for a few hours.": " 。我们将在未来几个小时内不再要求您输入密码。",

            // 公用部分
                "Organization account": "组织帐户",
                "Switch to another account": "切换到另一个帐户", // 存在组织时
                "Go to your organization profile": "去我的组织主页",
                // 左侧菜单
                "Account settings": "帐户设置",
                "Profile": "组织资料",
                "Billing & plans": "计费 & 计划",
                "Member privileges": "会员特权",
                "Organization security": "组织安全",
                "Security & analysis": "安全 & 分析",
                "Verified & approved domains": "验证和批准的域",
                "Audit log": "审计日志",
                "Sponsorship log": "赞助日志",
                "Webhooks": "Web 钩子",
                "Third-party access": "第三方访问",
                "Installed GitHub Apps": "安装的 GitHub 应用",
                "Scheduled reminders": "定时提醒",
                "Repository topics": "仓库主题",
                "Repository defaults": "仓库默认值",
                "Deleted repositories": "删除的仓库",
                "Projects": "项目",
                "Teams": "团队",
                "Actions": "操作",
                "Packages": "软件包",
                "Secrets": "密钥",
                "Developer settings": "开发者设置",
                "Moderation settings": "审查设置",
                    "Blocked users": "黑名单",
                    "Interaction limits": "互动限制",

            // Profile 组织资料 /organizations/<org-login>/settings/profile
                "Organization profile": "基本资料",
                    "Profile picture": "我的头像",
                        "Upload new picture": "上传新头像",
                        "Note: To apply for a publisher verification your organization's profile picture should not be irrelevant, abusive or vulgar. It should not be a default image provided by GitHub.": "注意：需要申请发布者验证，您的组织的个人资料图片不应该是不相关的、辱骂性的或粗俗的。它不应该是由 GitHub 提供的默认图片。",
                    "Organization display name": "组织显示名称",
                    "Email (will be public)": "公开电子邮箱",
                    "Description": "组织简介",
                    "URL": "网站",
                    "Twitter username": "Twitter 用户名",
                    "Location": "地址",
                        "Select a location": "选择地址",
                        "Find a location...": "搜索地址...",
                        "Clear Location": "清除地址",
                    "Billing email": "帐单电子邮箱",
                    "(Private)": "（私人）",
                        "Add more billing email recipients in the":"添加更多的帐单邮件收件人在",
                        "billing page": "账单页面",
                    "Gravatar email": "Gravatar 电子邮箱",
                    "Sponsors update email": "赞助者更新电子邮箱",
                        "The developers and organizations that your organization sponsors can send you updates to this email.": "您的组织赞助的开发人员和组织可以向您发送此电子邮箱的更新。",
                    "Update profile": "更新资料",
                    "Profile updated successfully": "资料更新成功。",

                "GitHub Developer Program": "GitHub 开发者计划",
                    "Building an application, service, or tool that integrates with GitHub?": "构建应用程序、服务或工具，集成到 GitHub 吗？",
                    "Join the GitHub Developer Program": "加入 GitHub 开发者计划",
                    ", or read more about it at our": "，或了解更多信息在我们的",
                    "Developer site": "开发者站点",
                    "Check out the Developer site": "查看开发者网站，",
                    "for guides, our API reference, and other resources for building applications that integrate with GitHub. Make sure your contact information is up-to-date below. Thanks for being a member!": "了解指南、我们的 API 参考和其他用于构建与 GitHub 集成的应用程序的资源。请确保您的联系信息是最新的。感谢您成为我们的会员！",

                "Terms of Service": "服务条款",
                    "Standard": "标准",
                        "Best for individuals wanting the freedom to move data and remain independent of a corporation.": "最适合希望自由移动数据并保持独立于公司的个人。",
                        "Read the Standard Terms of Service": "阅读 “标准服务条款”",
                    "Corporate": "企业",
                        "Best for businesses that need to protect their intellectual property and secure visibility into their data.": "最适合需要保护知识产权并确保数据可见性的企业。",
                        "Read the Corporate Terms of Service": "阅读 “企业服务条款”",
                        "Sign corporate terms": "签署企业条款",

                "Danger zone": "危险区",
                    "Rename organization": "重命名组织",
                        "Renaming your organization can have": "重命名您的组织可能会有",
                        "unintended side effects": "意想不到的副作用",
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

                    "Delete this organization": "删除组织",
                        "Once deleted, it will be gone forever. Please be certain.": "您一旦删除，将再也无法恢复。请确认！",

                       "Are you sure you want to delete this?": "您确定要删除吗？",
                       "Deleting the": "删除",
                       "organization will delete all of its repositories.": "组织，将会删除其所有仓库。",
                       "Before proceeding, please be sure to review the": "在继续之前，请务必查看",
                       "regarding account deletion.": "关于帐户删除。",
                       "Enter this organization’s name to confirm": "请输入组织的名称，进行确认",
                       "Cancel plan and delete the organization": "取消计划并删除此组织",

            // Billing & plans 计费 & 计划 /organizations/<org-login>/settings/billing
                // "Personal billing": "个人帐单",
                "Current monthly bill": "当前月度帐单",
                "Switch to yearly billing": "转为按年计费",
                "Next payment due": "下一次到期的付款",
                "View payment history": "查看付款记录",
                "Payment information": "支付信息",
                "Update payment method": "更新付款方式",
                "Manage spending limit": "管理支出限额",
                "Redeem coupon": "兑换优惠券",
                "Current plan": "当前计划",
                "Compare all plans": "比较所有计划",
                //"GitHub Free": "GitHub 免费",
                "The basics for organizations and developers": "组织和开发者的基本计划",
                "Unlimited public/private repos": "无限的公共/私人仓库",
                "Unlimited collaborators": "无限协作者",
                "2,000 Actions minutes/month": "2,000 次操作 分钟/月",
                "500MB of Packages storage": "500MB 的包存储空间",
                "Community support": "社区支持",
                "Usage this month": "本月使用情况",
                "Get usage report": "获取使用报告",

                "GitHub Sponsors": "GitHub 赞助",
                "Connect with the community that builds the tools you use": "与构建您使用的工具的社区联系",
                "Start sponsoring": "开始赞助",
                "You’re currently not sponsoring anyone.": "您目前没有赞助任何人。",
                "Learn more about GitHub Sponsors": "了解更多关于 GitHub 赞助",
                // "Change plan": "更改计划",
                // "Cancel plan": "取消计划",
                // "Do you have any questions? Contact": "对话框您有任何问题吗？请联系",

                "Billing management": "帐单管理",
                "Receipts are sent to billing managers and email recipients.": "收据会被发送给账单管理员和邮件接收者。",
                "Billing managers": "帐单管理员",
                    "You have not invited any billing managers": "您尚未邀请任何帐单管理员",
                    "Invite": "邀请",
                "Email recipients": "邮件接收者",
                "Add": "添加",
                "Primary": "主账户",

                "Edit billing email address": "编辑帐单电子邮箱",
                "Billing primary email": "账单主账户邮箱",
                "Update": "更新",

                "Add billing recipient": "添加帐单接收者",
                "Add billing recipient email": "添加帐单接收者邮箱",

                // "Billing overview": "财务信息",
                // "Plan": "方案",
                // "Free": "免费",
                // "Change plan": "修改计划",
                // "Cancel plan": "取消计划",
                // "per month for": "每月 -",
                // "Learn more about Git LFS": "什么是 Git LFS (大文件存储)？",
                // "Purchase more": "购买更多",
                // "Billing cycle": "结算周期",
                // "Bandwidth": "带宽",
                // "Bandwidth quota resets every billing cycle": "带宽配额每个周期重置",
                // "Storage": "存储",
                // "Payment": "支付方式",
                // "No payment method on file.": "没有设置支付方式",
                // "Add payment method": "添加支付方式",
                // "Payment history": "支付记录",
                // "Amounts shown in USD": "以美元显示",

            // '/organizations/<org-login>/billing_managers/new'
                "/ Add a billing manager": "/ 添加帐单管理员",

            // Security & analysis 安全 & 分析 /organizations/<org-login>/settings/security_analysis
                "Configure security and analysis features": "配置安全和分析功能",
                "Security and analysis features help keep your repositories secure and updated. By enabling these features, you're granting us permission to perform read-only analysis on your organization's repositories.": "安全和分析功能有助于确保您的仓库安全和更新。通过启用这些功能，您授予我们对您组织的仓库执行只读分析的权限。",
                "Disable all": "禁用全部",
                "Enable all": "启用全部",
                "Dependency graph": "依赖关系图",
                "Understand your dependencies.": "了解您的依赖项。",
                "Automatically enable for new private repositories": "为新私有仓库自动启用",
                "Dependabot alerts": "Dependabot 警报",
                "Be alerted when a new vulnerability is found in one of your dependencies.": "在您的依赖项中发现新漏洞时收到警报。",
                "Automatically enable for new repositories": "为新仓库自动启用",
                "Dependabot security updates": "Dependabot 安全更新",
                "Easily upgrade to non-vulnerable dependencies.": "轻松升级到无漏洞的依赖项。",

            // Audit log 审计日志 /organizations/<org-login>/settings/audit-log
                "Filters": "过滤",
                "Search audit log": "搜索审计日志",
                "Export Git Events": "导出 Git 事件",
                "Export": "导出",
                "Recent events": "最近的事件",

            // Sponsorship log 赞助日志 /organizations/<org-login>/settings/sponsors-log
                "Sponsors log": "赞助日志",
                "New sponsorships, changes, and cancellations": "新的赞助、更改和取消",
                "Period:": "周期：",
                    "Filter activity": "过滤活动",
                    "All-time": "所有时间",
                    "Past Day": "过去一天",
                    "Past Week": "过去一周",
                    "Past Month": "过去一月",
                    "Past Year": "过去一年",
                "No sponsorship activity in this time period": "这段时间没有赞助活动",
                // "This is where you can review activity from your sponsorships.": "您可以在此处查看您的赞助活动。",
                // This is where you can review activity from inuyasha-maboloshi's sponsorships.

            // 删除的仓库 /organizations/<org-login>/settings/deleted_repositories
                "Deleted Repositories": "删除的仓库",
                // No recoverable repositories were found for maboloshi-inuyasha.
                "It may take up to an hour for repositories to be displayed here. You can only restore repositories that have no forks or have not been forked.": "仓库可能需要一个小时的时间才能显示在这里。您只能恢复没有复刻或没有被复刻的仓库。",

            // Packages 软件包 /organizations/<org-login>/settings/packages
                "Deleted Packages": "删除软件包",
                "These are packages that have been previously deleted belonging to this organization. You can restore a package deleted within the last 30 days.": "这些是先前已删除的属于您组织的软件包。您可以恢复在过去 30 天内删除的包。",
                "Search deleted packages": "搜索已删除的软件包",

            // 安装的 GitHub 应用 /organizations/<org-login>/settings/installations
                // "Installed GitHub Apps": "安装的 GitHub 应用",
                "GitHub Apps augment and extend your workflows on GitHub with commercial, open source, and homegrown tools.": "GitHub 应用通过商业、开源和自主开发的工具来增强和扩展您在 GitHub 上的工作流程。",
                "Configure": "配置",

            // Blocked users 黑名单 /organizations/<org-login>/settings/user_blocks
                "Block a user": "拉黑用户",
                "Blocking a user prevents the following on all your repositories:": "拉黑用户可以防止所有仓库中的以下操作：",
                "opening or commenting on issues or pull requests": "打开或评论问题或拉取请求",
                "starring, forking, or watching": "加星标、复刻、关注",
                "adding or editing wiki pages": "添加或编辑 Wiki 页面",

                "Search by username, full name or email address": "搜索用户名、全名、或电子邮箱",
                    "Learn more about blocking a user": "了解更多有关拉黑用户的信息",
                "Block options": "拉黑选项",
                    "For 1 day": "1 天",
                    "For 3 days": "3 天",
                    "For 7 days": "7 天",
                    "For 30 days": "30 天",
                    "Until I unblock them": "直到取消拉黑",
                "Block user": "拉黑用户",
                "You have not blocked any users.": "您还没有拉黑任何用户。",
                "Unblock": "取消拉黑",

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
                "6 months": "6个月",
                // 顶部提醒
                "User interaction limit settings saved.": "用户交互限制设置已保存。",

        },
        "regexp": [ // 正则翻译
            // 软件库
            [/No recoverable packages were found for (\w+.*)./, "没有找到 $1 的可恢复包。"],
         ],
    },

};


// 公共复用翻译部分
I18N.zh.pulls = I18N.zh.issues;

// 重定向
I18N.zh.settings = I18N.zh["page-account"];
I18N.zh["settings/apps/authorizations"] = I18N.zh.settings;

I18N.zh["settings/tokens"] = I18N.zh["settings/apps"];
I18N.zh["settings/developers"] = I18N.zh["settings/apps"];
I18N.zh["settings/applications/new"] = I18N.zh["settings/apps"];

I18N.zh.login = I18N.zh["session-authentication"];
I18N.zh.session = I18N.zh["session-authentication"];
I18N.zh.sessions = I18N.zh["session-authentication"];
I18N.zh.password_reset = I18N.zh["session-authentication"];

I18N.zh.new = I18N.zh["page-new-repo"];
I18N.zh["new/import"] = I18N.zh["page-new-repo"];
I18N.zh["import"] = I18N.zh["page-new-repo"];

I18N.zh["installations/new"] = I18N.zh["login/oauth"];

I18N.zh.apps = I18N.zh.marketplace;
I18N.zh.orgs = I18N.zh["page-profile"];
I18N.zh["billing_managers/new"] = I18N.zh["orgs/settings"];