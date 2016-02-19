var I18N = {};

I18N.zh = {
    "pubilc": { // 公共区域翻译
        "static": { // 静态翻译
            "Search GitHub": "GitHub 一下，您就知道",
            "This repository": "当前仓库",
            "Search": "搜索",

            "Pull requests": "合并请求",
            "Issues": " 问题 ",
            "Gist": "代码片段",
            
            "You have no unread notifications": "您没有未读通知",
            "Create new…": "新建…",
            "View profile and more": "查看更多信息",

            "New repository": " 新建仓库",
            "New organization": " 新建组织",
            "New issue": " 新建问题",
            
            "Signed in as": "您好 ",
            "Your profile": "您的主页",
            "Your stars": "点赞的项目",
            "Explore": "激动的探索",
            "Integrations": "集成工具",
            "Help": "帮助",
            "Settings": "设置",
            "Sign out": "退出",

            "Previous": "上一页",
            "Next": "下一页",

            "Period:": "最近:",
            "Filter activity": "选择时间",
            "1 day": "一天",
            "3 days": "三天",
            "1 week": "一周",
            "1 month": "一个月",

            "Confirm password to continue": "确认密码后才能继续操作",
            "Password": "密码",
            "(Forgot password)": "(忘记密码)",
            "Confirm password": "继续",
        },
        "regexp": [ // 正则翻译
            [/just now|(an?|\d+) (second|minute|hour|day|month|year)s? ago/, function (m, d, t) {
                if (m === 'just now') { return '刚刚'; }
                if (d[0] === 'a') { d = '1 '; }

                var dt = {second:'秒', minute:'分钟', hour:'小时', day:'天', month: '月', year:'年'};

                return d + dt[t] + '之前';
            }],
        ],
    },

    "page-dashboard": { // 已登录的首页
        "static": { // 静态翻译
            "Repositories you contribute to": "您贡献过的仓库",
            "Your repositories": "您的仓库 ",
            "Find a repository…": "搜索仓库…",
            "All": "全部",
            "Public": "公共",
            "Private": "私有",
            "Sources": "源码",
            "Forks": "收藏",

            "View": "查看 ",
            "new broadcast": " 条新公告",
            "new broadcasts": " 条新公告",
            
            // 动态 状态词
            "starred": " 赞了 ",
            "forked": " 收藏了 ",
            "created repository": " 创建了仓库 ",
            "opened issue": " 新建问题 ",
            "close issue": " 关闭问题 ",
            "added": " 添加了 ",
            "to": " 到 ",
            
            "More": "更多",
        },
        "regexp": [ // 正则翻译
            [/Show (\d+) more repositories…/, "显示 $1 个更多的仓库…"],
        ],
    },

    "page-profile": { // 个人首页
        "static": { // 静态翻译
            "Joined on": "注册于 ",
            "Follow": " 关注",
            "Unfollow": " 取消关注",
            "Change your avatar": "修改头像",
            "Followers": "粉丝",
            "Starred": "赞了",
            "Following": "关注",
            "Organizations": "组织",
            "Contributions": " 贡献",
            "Repositories": " 仓库",
            "Public activity": " 动态",
            "Edit profile": " 修改设置",
            "Popular repositories": "流行的仓库",
            "Repositories contributed to": "贡献过的仓库",
            "Contribution activity": "近期贡献信息",

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

            "M": "周一",
            "W": "周三",
            "F": "周五",

            "Includes contributions from private repositories you can access.": "您可以访问包括私人仓库。",
            "Summary of pull requests, issues opened, and commits.": "包括 合并请求, 提问, 提交.",
            "Learn how we count contributions": " 您想知道如何计算贡献的吗",
            "Less": "少",
            "More": "多",
            "Contributions in the last year": "过去一年的贡献",
            "Longest streak": "连续贡献最长天数",
            "Current streak": "当前连续贡献天数",

            "commits": " 次提交 ",
            "Pull Request": " 合并请求 ",
            "Pull Requests": " 合并请求 ",
            "Issues reported": " 问题报告",

            "pushed to": " 提交了 ",
            "opened pull request": " 提交了合并请求 ",
            "at": " 在 ",

            // 仓库 tab
            "Find a repository…": "搜索仓库…",
            "All": "全部",
            "Public": "公共",
            "Private": "私有",
            "Sources": "源码",
            "Forks": "收藏",
            "Mirrors": "镜像",
            "New": " 新建",

            "User actions": "用户操作",
            "Block user": "阻止该用户",
            "Report abuse": "举报该用户",
        },
        "regexp": [ // 正则翻译
            [/Pushed (\d+) commits? to/, "提交了 $1 次到"],
        ],
    },

    "page-account": { // 个人设置
        "static": { // 静态翻译
            // 菜单
            "Personal settings": "个人设置",
            "Profile": "基本信息",
            "Account settings": "帐户设置",
            "Emails": "邮箱设置",
            "Notification center": "通知设置",
            "Billing": "财务信息",
            "SSH keys": "SSH keys",
            "Security": "安全信息",
            "Applications": "应用设置",
            "Personal access tokens": "访问令牌",
            "Repositories": "仓库管理",
            "Organizations": "组织管理",

            // Profile 菜单
            "Public profile": "基本资料",
            "Profile picture": "我的头像",
            "Upload new picture": "上传新图片",
            "You can also drag and drop a picture from your computer.": "您也可以直接拖拽照片镜像上传.",
            "Name": "昵称",
            "Public email": "公共邮箱",
            "Don’t show my email address": "不显示我的邮箱",
            "You can add or remove verified email addresses in your": "您可以添加或删除邮件地址在您的 ",
            "personal email settings": "邮箱设置",
            "URL": "网站",
            "Company": "公司",
            "Location": "地址",
            "Update profile": "更新资料",
            "Profile updated successfully": "资料更新成功。",

            "GitHub Developer Program": "GitHub 开发者计划",
            "Building an application, service, or tool that integrates with GitHub?": "构建应用程序、服务或工具,集成了GitHub吗？",
            "Join the GitHub Developer Program": "加入 GitHub 开发者计划",
            ",\n        or read more about it at our": " 或了解更多信息在我们的 ",
            "Developer site": "开发者站点",

            "Jobs profile": "就业状态",
            "Available for hire": "求HR带走",
            "Save jobs profile": "保存状态",

            // Account settings 菜单
            "Change password": "修改密码",
            "Old password": "旧的密码",
            "New password": "新的密码",
            "Confirm new password": "再次输入新的密码",
            "Update password": "更新",
            "I forgot my password": "我忘记我的密码了",
            "Looking for two-factor authentication? You can find it in": "使用双重认证？您可以去",
            "Security": "安全信息",
            "Change username": "修改用户名",
            "Changing your username can have": "修改您的用户名会导致",
            "unintended side effects": "意想不到的副作用",
            "Delete account": "删除帐户",
            "Once you delete your account, there is no going back. Please be certain.": "一旦您删除了帐户，就没办法恢复，请三思而行。",
            "Delete your account": "确认删除",

            // Emails 菜单
            "Your": "您的",
            "primary GitHub email address": " GitHub Email 主帐户 ",
            "will be used for account-related notifications\n        (e.g. account changes and billing receipts) as well as any web-based GitHub operations\n        (e.g. edits and merges).": "将被用于接收相关通知 (例如：账单信息)，以及任何基于 web 的 GitHub 操作 (例如：编辑或合并操作)。",
            "Primary": "主帐户",
            "Private": "私有",
            "Public": "公开",
            "This email will be used as the 'from' address for web-based GitHub operations.": "该邮箱将被用作 \"发件人\" 地址",
            "Your primary email address is now public.": "主邮件地址现在是公开的。",
            "Your primary email address is now private.": "主邮件地址现在是保密的。",
            "Set as primary": "设为主帐户",
            "Add email address": "添加 Email 地址",
            "Add": "添加",
            "Keep my email address private": "将我的邮件地址保密",
            "We will use": "我们将使用 ",
            "when performing web-based Git operations and\n              sending email on your behalf. If you want command line Git operations to use your private email you must": " 作为默认\"发件人\"地址以您的名义发送电子邮件。如果您想在命令行 Git 的操作中使用您的私人邮件地址，您必须在",
            "set your email in Git": " Git 中设置您的电子邮件地址",
            "Email preferences": "Email 偏好设置",
            "Receive all emails, except those I unsubscribe from.": "接收所有邮件，除了那些我退订的信息。",
            "We'll occasionally contact you with the latest news and happenings from the GitHub Universe.": "我们将会把 GitHub Universe 的最新消息和事件发送给您。",
            "Learn more": "查看更多",
            "Only receive account related emails, and those I subscribe to.": "只接收帐户相关的电子邮件，以及我的订阅的信息。",
            "We'll only send you legal or administrative emails, and any emails you’ve specifically subscribed to.": "我们只向您发送法律或行政邮件以及您订阅信息。",
            "Save email preferences": "保存偏好",
            "Successfully updated your email preferences.": "Email 偏好设置修改成功。",
            "Looking for activity notification controls? Check the": "想要了解更详细的通知设置，请请前往 ",

            // Notification center 菜单
            "How you receive notifications": "通知设置",
            "Automatic watching": "自动关注",
            "When you’re given push access to a repository, automatically receive notifications for it.": "当您给一个仓库推送权限时，自动接收相关通知。",
            "Automatically watch repositories": "自动关注仓库",
            "Participating": "参与话题",
            "When you participate in a conversation or someone brings you in with an": "当有人 ",
            "@mention": "@提到您",
            "Watching": "关注仓库",
            "Updates to any repositories or threads you’re watching.": "当您关注的仓库更新时。",
            "Your notification settings apply to the": "通知设置将应用到",
            "repositories you’re watching": " 您关注的仓库",
            "Notification email": "接收通知的邮箱",
            "Primary email address": "主邮箱地址",
            "Save": "保存",
            "Custom routing": "自定义",
            "You can send notifications to different": "你可以发送通知不同的",
            "verified": "验证",
            "email addresses depending on the organization that owns the repository.": "电子邮件地址取决于组织拥有仓库。",

            // Billing 菜单
            "Billing overview": "财务信息",
            "Plan": "方案",
            "Free": "免费 ",
            "Change plan": " 修改方案",
            "per\n      month for": " 每月 - ",
            "Learn more about Git LFS": "什么是 Git LFS (大文件存储)？",
            "Purchase more": " 购买更多",
            "Billing cycle": "结算周期 ",
            "Bandwidth": "带宽 ",
            "Bandwidth quota resets every billing cycle": "带宽配额每个周期重置",
            "Storage": "存储 ",
            "Payment": "支付方式",
            "No payment method on file.": "没有设置支付方式",
            "Add payment method": " 添加支付方式",
            "Coupon": "优惠券",
            "You don’t have an active coupon.": "没有可用的优惠券",
            "Redeem a coupon": " 兑换优惠券",
            "Payment history": "支付记录",
            "Amounts shown in USD": "以美元显示",
            "You have not made any payments.": "没有支付记录",

            // Security 菜单
            "Two-factor authentication": "双重认证",
            "Status:": "状态:",
            "Off": "未开启",
            "Set up two-factor authentication": "设置双重认证",
            "provides another layer of security to your account.": "为您的帐户提供了另一层安全保障。",
            "Sessions": "会话信息",
            "This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.": "这是您登陆的设备会话列表，如果不是您本人操作，可以关闭该会话。",
            "Your current session": "您当前的会话",
            "Location:": "地址",
            "Signed in:": "登陆于",
            "Last accessed on": "最后访问时间 ",
            "Revoke": "注销",
            "Security history": "操作记录",
            "This is a security log of important events involving your account.": "这是您帐户的操作日志",

            // Applications 菜单
            "Authorized applications": "已授权的应用",
            "Developer applications": "开发者应用",
            "Revoke all": "注销全部",
            "You have granted the following applications access to your account. Read more about connecting with third-party applications at": "您已授权下来应用访问您的帐户信息，如需了解更多请阅读 ",
            "Sort": "排序",
            "Sort by": "排序方式",
            "Alphabetical": "字母排序",
            "Recently used": "最近使用",
            "Least recently used": "最少使用",
            "No Developer Applications": "暂无开发者的应用",
            "Developer applications are used to access the": "开发者应用是用于访问 ",
            ". To get started you should": "。首先您应该",
            "register an application": "注册一个应用",
            "Register new application": "注册应用",
            "Register a new OAuth application": "注册一个 OAuth 应用",
            "Application name": "应用名",
            "Something users will recognize and trust": "让用户识别和信任",
            "Homepage URL": "主页地址",
            "The full URL to your application homepage": "您的应用主页地址",
            "Application description": "应用描述",
            "Application description is optional": "应用描述 (可选)",
            "This is displayed to all potential users of your application": "给您的目标用户最直接的信息",
            "Authorization callback URL": "认证回调地址",
            "Your application’s callback URL. Read our": "您的应用授权回调地址。详情请阅读",
            "OAuth documentation": " OAuth 文档",
            "for more information": "。",
            "Register application": "注册应用",
            "Drag & drop": "拖拽上传",
            "or": "或者",
            "choose an image": "选择图片",
        },
        "regexp": [ // 正则翻译
            [/This email will not be used as the 'from' address for web-based GitHub operations - we will instead use ([^@]+@users.noreply.github.com)./, "该邮箱不会被用作 \"发件人\" 地址，我们会改用 ($1) 作为默认 \"发件人\" 地址。"],
            [/Your primary email was changed to ([^@]+@[^\n]+)\./, "您的 Email 主帐户已经更改为 $1"],
            [/(\d+) private repositories?\./, "$1 个私有仓库."],
            [/(\d+) data packs?/, "$1 数据包"],
            [/(\d+) days? left,\n\s+billed monthly/, "$1天, 按月"],
            [/Using\n\s+([\d.]+) of\n\s+(\d+) GB\/month/, "＄$1, $2GB/月"],
            [/Using\n\s+([\d.]+) of\n\s+(\d+) GB/, "＄$1, $2GB"],
            [/(\d+) Authorized applications?/, "$1 个授权应用"],
        ],
    },

    "page-new-repo": { // 新建仓库
        "static": { // 静态翻译
            "Create a new repository": "创建一个新的仓库",
            "A repository contains all the files for your project, including the revision history.": "仓库包含项目中的所有文件，包括修订历史记录。",
            "Owner": "创建者",
            "Repository name": "仓库名",
            "Great repository names are short and memorable. Need inspiration? How about": "一个好的仓库名应该是简单容易被记住的，需要来点灵感吗？这个名字怎么样 ",
            "Description": "描述 ",
            "(optional)": "(可选)",
            "Public": "公共 (免费)",
            "Anyone can see this repository. You choose who can commit.": "任何人都可以看到这个仓库，您可以选择谁能提交。",
            "Private": "私有 (收费)",
            "You choose who can see and commit to this repository.": "您可以选择谁可以看和提交到该仓库。",
            "Initialize this repository with a README": "使用 README.md 初始化仓库",
            "This will let you immediately clone the repository to your computer. Skip this step if you’re importing an existing repository.": "这将让您可以立刻克隆该仓库到您的电脑。如果您要提交已有的仓库，请忽略这个选项。",
            "Add .gitignore:": "添加 .gitignore 文件",
            "Filter ignores…": "筛选忽略文件…",
            "Add a license:": "添加发布许可",
            "Filter licenses…": "筛选许可…",
            "None": "无",
            "Need help picking a license? We’ve built a site just for you.": "需要帮您挑选一个许可吗？我们为您供了参考页面。",
            "Create repository": "创建仓库",
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

    "vis-public": { // 仓库页
        "static": { // 静态翻译
            "Watch": " 关注",
            "Unwatch": " 取消关注",
            "Star": " 点赞",
            "Unstar": " 取消点赞",
            "Fork": " 收藏",
            
            "Code": " 代码",
            "Pulse": " 统计",
            "Graphs": " 图表",

            // 仓库描述编辑
            "Edit": "编辑",
            "Description": "描述",
            "Short description of this repository": "简短的描述下您的仓库",
            "Website": "网址",
            "Website for this repository (optional)": "这个仓库的网址 (可选)",
            "Save": "保存",
            "or": "或",
            "Cancel": "取消",

            // 关注通知设置
            "Notifications": "通知类型",
            "Not watching": "取消关注",
            "Watching": "关注",
            "Ignoring": "忽略",
            "Be notified when participating or @mentioned.": "仅参与交谈或@我时通知我.",
            "Be notified of all conversations.": "所有交谈都通知我.",
            "Never be notified.": "忽略任何通知.",

            "commit": "次提交",
            "commits": "次提交",
            "branch": "个分支",
            "branches": "个分支",
            "release": "次发布",
            "releases": "次发布",
            "contributor": "个贡献者",
            "contributors": "个贡献者",
            "Copy to clipboard": "复制到剪切板",

            "New pull request": "发起合并请求",
            "New file": "新建文件",
            "Find file": "查找文件",
            "Download ZIP": "下载 ZIP",
            "History": "历史记录",

            "Branch:": "分支:",
            "Switch branches/tags": "选择分支或标签",
            "Branches": " 分支 ",
            "Tags": " 标签 ",
            "Nothing to show": "暂无",

            "Choose a clone URL": "选择克隆 URL",
            "Clone with Git or checkout with SVN using the repository's web address.": "克隆 Git 或 检出 SVN 使用仓库的 web 地址.",
            "SSH": "SSH",
            "Clone with an SSH key and passphrase from your GitHub settings.": "克隆的 SSH 密钥通过 GitHub 设置。",
            "Learn more about clone URLs": "更多的克隆方法",

            "File uploading is now available": "现在可以上传文件了",
            "You can now drag and drop files into your repositories.": "您可以直接拖拽文件到该仓库界面进行上传。",
            "Learn more": "查看详情",
            "Dismiss": " 我知道了",

            // 关注者页面
            "Watchers": "关注者",
            "Follow": " 关注",
            "Unfollow": " 取消关注",

            // 点赞者页面
            "Stargazers": "点赞的人",
            "All": "全部",
            "You know": "您关注的",

            // issues 页面
            "Filters": "筛选",
            "Open issues and pull requests": "开放的问题或请求",
            "Your issues": "您提出的问题",
            "Your pull requests": "您的请求合并",
            "Everything assigned to you": "任何关于您的",
            "Everything mentioning you": "提及您的",
            "View advanced search syntax": "查看高级搜索语法",

            "Labels": " 标签 ",
            "Milestones": " 里程碑 ",
            "Author": " 作者 ",
            "Assignee": " 代理人 ",
            "Sort": " 排序 ",

            "Filter by author": "筛选用户",
            "Filter users": "筛选用户名",
            "Filter by label": "筛选标签",
            "Filter labels": "筛选标签",
            "Unlabeled": "无标签",
            "Filter by milestone": "筛选里程碑",
            "Filter milestones": "筛选里程碑",
            "Issues with no milestone": "无里程碑",
            "Filter by who’s assigned": "筛选代理人",
            "Filter users": "筛选代理人",
            "Assigned to nobody": "无代理人",
            "Sort by": "排序",
            "Newest": "最新的",
            "Oldest": "最老的",
            "Most commented": "最多评论",
            "Least commented": "最少评论",
            "Recently updated": "最近更新",
            "Least recently updated": "最早更新",
            "View all issues in this milestone": "查看这个里程碑的所有问题",

            // New collaborator 页面
            "New collaborator": "添加合作者",
            "Collaborators": "合作者",
            "Push access to the repository": "当前仓库的推送权限",
            "This repository doesn’t have any collaborators yet. Use the form below to add a collaborator.": "当前仓库没有合作者，您可以在下面输入框添加合作者。",
            "Search by username, full name or email address": "搜索用户名, 全名, 邮箱地址：",
            "Add collaborator": "添加合作者",

            // Compare changes 页面
        },
        "regexp": [ // 正则翻译
            [/HTTPS\s+(recommended)/, "HTTPS (推荐)"],
            [/Save (.+?) to your computer and use it in GitHub Desktop./, "使用 GitHub 桌面版，保存 $1 到您的电脑。"],
            [/(\d+) Open/, "$1 个开放的"],
            [/(\d+) Closed/, "$1 个关闭的"],
            [/View all issues opened by (.+)/, "查看所有 $1 的问题"],
        ],
    },

    "homepage": { // 未登录首页
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },

    "session-authentication": { // 登录页
        "static": { // 静态翻译
            "Sign in to GitHub": "登录 GitHub 帐户",
            "Username or email address": "用户名/邮箱",
            "Password": "密码",
            "Forgot password?": "忘记密码",
            "Sign in": "登录",
            "New to GitHub?": "第一次来 GitHub?",
            "Create an account": " 那就注册个帐户吧",
        }
    },

    "signup": { // 注册页
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },
};
