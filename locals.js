var I18N = {};

I18N.conf = {
    /**
     * 要翻译的页面正则
     */
    rePageClass: /\b(vis-public|page-(dashboard|profile|account|new-repo|create-org)|homepage|signup|session-authentication|oauth)\b/,

    /**
     * 匹配 pathname 页面的正则
     *
     * 通知页面 /notifications
     * 关注页面 /watching
     * 点赞页面 /stars
     * 问题页面 /issues
     * 搜索页面 /search
     */
    rePagePath: /\/(notifications|watching|stars|issues|search)/,

    /**
     * 匹配 url 页面的正则
     *
     * 代码片段页面 gist
     */
    rePageUrl: /(gist)\.github.com/,

    /**
     * 忽略区域的 class 正则
     *
     * 面包屑 breadcrumb
     * 文件列表 files js-navigation-container js-active-navigation-container
     * 代码高亮 highlight tab-size js-file-line-container
     * 代码差异 data highlight blob-wrapper
     * wiki内容 markdown-body
     */
    reIgnore: /(breadcrumb|files js-navigation-container|highlight tab-size|highlight blob-wrapper|markdown-body)/,
};

I18N.zh = {
    "title": { // 标题翻译
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },

    "pubilc": { // 公共区域翻译
        "static": { // 静态翻译
            // 未登录部分
            "Personal": "个人",
            "Open source": "开源",
            "Business": "商业",
            "Pricing": "定价",
            "Support": "支持",
            "Sign in": "登录",
            "Sign up": "注册",

            "Search GitHub": "GitHub 一下，您就知道",
            "This repository": "当前仓库",
            "Search": "搜索",

            "Pull requests": "拉取请求",
            "Issues": " 问题 ",
            "Gist": "代码片段",

            "You have no unread notifications": "您没有未读通知",
            "You have unread notifications": "您有未读通知",
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
            "Settings": " 设置 ",
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

            "Updated": "更新 ",
            "Terms": "条款 ",
            "Privacy": "隐私 ",
            "Security": "安全 ",
            "Contact": "联系 ",
            "Status": "状态 ",
            "Training": "培训 ",
            "Shop": "商店 ",
            "Blog": "博客 ",
            "About": "关于 ",

            // 评论编辑器翻译
            "Write": "编辑",
            "Preview": "预览",

            "Add header text": "标题",
            "Add bold text <cmd+b>": "加粗 <cmd+b>",
            "Add italic text <cmd+i>": "斜体 <cmd+i>",
            "Insert a quote": "插入引用",
            "Insert code": "插入代码",
            "Add a link <cmd+k>": "连接 <cmd+k>",
            "Add a bulleted list": "添加无序列表",
            "Add a numbered list": "添加有序列表",
            "Add a task list": "添加任务列表",
            "Directly mention a user or team": "直接提到用户或团队",
            "Reference an issue or pull request": "参考问题或拉取请求",
            "Leave a comment": "留下评论",

            "Attach files by dragging & dropping,": "拖拽添加附件，",
            "selecting them": "或选择文件",
            ", or pasting\n        from the clipboard.": "，或复制黏贴内容。",
            "Styling with Markdown is supported": "支持 Markdown 功能哦。",

            "Close issue": "关闭问题",
            "Comment": "提交",
            "Submit new issue": "提交新问题",
            "Comment on this commit": "提交",
            "Close and comment": "提交并关闭",
        },
        "regexp": [ // 正则翻译
            // 仓库删除提示
            [/Your repository "([^"]+)" was successfully deleted\./, "您的 \"$1\" 仓库以成功被删除了。"],

            /**
             * 匹配时间格式
             *
             * Mar 19, 2015 – Mar 19, 2016
             * January 26 – March 19
             * March 26
             *
             * 不知道是否稳定, 暂时先试用着. 2016-03-19 20:46:45
             */
            [/(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May(?:)?|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?) (\d+)(?:, (\d+)|)/g, function (all, month, date, year) {
                var monthKey = {"Jan": "1月","Feb": "2月","Mar": "3月","Apr": "4月","May": "5月","Jun": "6月","Jul": "7月","Aug": "8月","Sep": "9月","Oct": "10月","Nov": "11月","Dec": "12月"};
                return ' ' + (year ? year + '年' : '') + monthKey[month.substring(0,3)] + date + '日 ';
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
            "forked from": " 收藏至 ",
            "created repository": " 创建了仓库 ",
            "opened pull request": " 发起了拉取请求 ",
            "commented on pull request": " 评论了拉取请求 ",
            "opened issue": " 新建问题 ",
            "close issue": " 关闭问题 ",
            "added": " 添加了 ",
            "to": " 到 ",
            "pushed to": " 提交了 ",
            "closed issue": " 关闭了问题 ",
            "merged pull request": " 合并了拉取请求 ",
            "commented on issue": " 提交了评论 ",

            "More": "更多",


            "Switch dashboard context": "切换默认身份",
            "Manage organizations": "管理组织",
            "Create organization": "创建组织",

            // 首次加入组织通知
            "You’ve been added to the": "您已经被添加到 ",
            "organization!": " 组织！",
            "Here are some quick tips for a first-time organization member.": "以下是首次加入组织的一些提示。",
            "Use the switch context button in the upper left corner of this page\n        to switch between your personal context (": "使用页面左上角的切换身份按钮，您可以在(",
            ")\n        and organizations you are a member of.": ")和组织身份之间进行切换。",
            "After you switch contexts you’ll see an organization-focused\n        dashboard that lists out organization repositories and activities.": "当您切换身份，您会看到一个组织为中心的页面，其中列出了组织库和活动。",
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
            "Public contributions": " 贡献",
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
            "Summary of pull requests, issues opened, and commits.": "包括 拉取请求, 提问, 提交.",
            "Learn how we count contributions": " 您想知道如何计算贡献的吗",
            "Less": "少",
            "More": "多",
            "Contributions in the last year": "过去一年的贡献",
            "Longest streak": "连续贡献最长天数",
            "Current streak": "当前连续贡献天数",
            "No recent contributions": "最近没有贡献",

            "commits": " 次提交 ",
            "Pull Request": " 拉取请求 ",
            "Pull Requests": " 拉取请求 ",
            "Issue reported": " 问题报告",
            "Issues reported": " 问题报告",

            // 动态 状态词
            "starred": " 赞了 ",
            "forked": " 收藏了 ",
            "forked from": " 收藏至 ",
            "created repository": " 创建了仓库 ",
            "opened pull request": " 发起了拉取请求 ",
            "commented on pull request": " 评论了拉取请求 ",
            "opened issue": " 新建问题 ",
            "close issue": " 关闭问题 ",
            "added": " 添加了 ",
            "to": " 到 ",
            "pushed to": " 提交了 ",
            "closed issue": " 关闭了问题 ",
            "merged pull request": " 合并了拉取请求 ",
            "commented on issue": " 提交了评论 ",


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
            [/Follow ([^’]+)’s activity feed/, "关注 $1 的 feed"],
            [/([^ ]+) has no activity during this period\./, "$1 近期没有任何活动。"],
            [/(\d+) total/, "$1 次"],
            [/(\d+) days?/, "$1 天"],
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
            "OAuth applications": "授权应用",
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
            "You can send notifications to different": "您可以发送通知不同的",
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

            // Personal access tokens 页面
            "Generate new token": "创建新的密令",
            "Tokens you have generated that can be used to access the": "密令可以用来访问 ",
            "Full control of private repositories": "完全控制私有仓库",
            "Edit": "编辑",
            "Delete": "删除",
            "Personal access tokens function like ordinary OAuth access tokens. They\n      can be used instead of a password for Git over HTTPS, or can be used to": "访问令牌功能类似于OAuth，他可以代替密码给 Git Https 访问，",
            "authenticate to the API over Basic Authentication": "或用来进行API调用的验证",

            // Organizations 页面
            "You are not a member of any organizations.": "您暂无任何组织。",
            "Transform account": "账户变更",
            "Account transformation warning": "账户变更警告",
            "What you are about to do is an irreversible and destructive process. Please be aware:": "这将是一个不可逆转的过程，请确认：",
            "Any user-specific information (OAuth tokens, SSH keys, Job Profile, etc) will be erased": "任何用户特定的信息（OAuth tokens, SSH keys, Job Profile, 等）将被删除。",
            "create a new personal account": "创建一个新的个人帐户",
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
            [/Turn (\w+) into an organization/, "变更 $1 为一个组织"],
            [/You will no longer be able to sign into (\w+) \(all administrative privileges will be bestowed upon the owners you choose\)/, "您将不能作为账户登录到 $1。（所有管理权限将赋予您选择的所有者）"],
            [/Any commits credited to (\w+) will no longer be linked to this GitHub account/, "任何提交归功于 $1 将不再链接到这个 GitHub 帐户"],
            [/If you are using (\w+) as a personal account, you should/, "如果您正在使用 $1 作为个人帐户，您应"],
            [/before transforming (\w+) into an organization./, "在转化 $1 组织之前。"],
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
            "No description or website provided.": "没有提供说明和网站信息.",
            "Edit": "编辑",
            "Description": "描述",
            "Short description of this repository": "简短的描述下您的仓库",
            "Website": "网址",
            "Website for this repository (optional)": "这个仓库的网址 (可选)",
            "Save": "保存",
            "or": " 或 ",
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
            "branch": "分支",
            "branches": "分支",
            "release": "次发布",
            "releases": "次发布",
            "contributor": "个贡献者",
            "contributors": "个贡献者",
            "Copy to clipboard": "复制到剪切板",
            "Copied!": "复制成功!",

            "Your recently pushed branches:": "您最近提交的分支:",
            "(less than a minute ago)": " 不到一分钟前 ",
            "Compare & pull request": " 比较 & 拉取请求 ",

            "New pull request": "发起拉取请求",
            "New file": "新建文件",
            "Upload files": "上传文件",
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
            "Open issues and pull requests": "开放的问题或拉取请求",
            "Your issues": "您提出的问题",
            "Your pull requests": "您的拉取请求",
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

            // Upload files 页面
            "Drag files here to add them to your repository": "拖拽文件添加到当前仓库",
            "Drag additional files here to add them to your repository": "拖拽其他文件添加到当前仓库",
            "Drop to upload your files": "拖拽上传您的文件",
            "Or": "或 ",
            "choose your files": "选择文件",
            "Yowza, that’s a big file. Try again with a file smaller than 25MB.": "我勒个擦，这么大的文件，单文件不得超过25MB",
            "Yowza, that’s a lot of files. Try again with fewer than 100 files.": "我勒个擦，这么多文件，一次不能超过100个",
            "This file is empty.": "这个文件是空的",
            "Something went really wrong, and we can’t process that file.": "遇到错误，我们处理不了这个文件。",
            "Uploading": "文件上传中 ",
            "of": "",
            "files": "",
            "Commit changes": "提交变更",
            "Add files via upload": "通过添加文件上传",
            "Optional extended description": "可选的描述",
            "Add an optional extended description…": "添加描述... (可选)",
            "Commit directly to the": "提交到 ",
            "Create a": "创建",
            "new branch": " 新分支 ",
            "for this commit and start a pull request.": "为这个提交，并且发起一个拉取请求。",
            "Learn more about pull requests.": " 了解更多拉取请求。",

            // Find file 页面
            "You’ve activated the": "您已激活",
            "file finder": " 文件搜索模式 ",
            ".\n        Start typing to filter the file list. Use": "。输入关键词查找您的文件。使用 ",
            "and": " 和 ",
            "to navigate,": " 选择文件 ",
            "to view files,": " 查看文件 ",
            "to exit.": " 返回。",

            // Pull Requests 页面
            "There aren’t any open pull requests.": "暂无拉取请求。",
            "Use the links above to find what you’re looking for, or try": "使用上面的链接来找到您要找的，或者尝试",
            "a new search query": "新的搜索查询",
            ". The Filters menu is also super helpful for quickly finding issues most relevant to you.": "。搜索栏也是快速找到问题最相关的您超级有帮助的。",

            // wiki 页面
            "Wikis provide a place in your repository to lay out the roadmap of your project, show the current status, and document software better, together.": "wiki 为您的仓库提供了一个更好的文档资料。",
            "Create the first page": "创建第一个页面",

            "Create new page": "创建新页面",
            "Write": "编辑",
            "Preview": "预览",
            "Edit mode:": "编辑模式:",
            "Edit Message": "提交信息",
            "Save Page": "保存页面",

            // settings 页面
            "Options": "基本选项",
            "Repository name": "仓库名",
            "Rename": "重命名",
            "Features": "特性",
            "GitHub Wikis is a simple way to let others contribute content.\n      Any GitHub user can create and edit pages to use for documentation,\n      examples, support, or anything you wish.": "GitHub wikis 是一个简单的方法让别人贡献内容。GitHub 的任何用户都可以创建和编辑页面中使用的文档，示例，支持或任何您想。",
            "Restrict editing to collaborators only": "编辑限制只有合作者可以",
            "Public wikis will still be readable by everyone.": "公共 wikis 仍然会受到大家的可读性",
            "GitHub Issues adds lightweight issue tracking tightly integrated with\n      your repository. Add issues to milestones, label issues, and\n      close & reference issues from commit messages.": "GitHub 与您的存储库添加轻量级问题跟踪紧密集成的问题。添加里程碑的问题，标签问题，并密切与参考问题提交消息。",

            "Merge button": "合并按钮",
            "When merging pull requests, you can allow merge commits, squashing, or both.": "当合并拉取请求时，您可以允许合并提交，压缩。",
            "Allow merge commits": "允许合并提交",
            "Add all commits from the head branch to the base branch with a merge commit.": "从head分支的所有提交合并提交到base分支。",
            "Allow squash merging": "允许压缩合并",
            "Combine all commits from the head branch into a single commit in the base branch.": "从head分支的所有提交压缩提交到base分支。",
            "You must select at least one option": "您至少要选择一个选项。",

            "GitHub Pages": "GitHub 项目演示页面",
            "Your site is published at": " 您的演示地址为: ",
            "Your site is ready to be published at": " 您的演示地址为: ",
            "Update your site": "更新您的站点",
            "To update your site, push your HTML or": "更新您的站点，可以直接上传 html 或者使用 ",
            "updates to\n      your": " 更新到 ",
            "branch.\n    Read the": " 分支。详情请阅读 ",
            "Pages help article": "演示页面帮助",
            "for more information.": " 获取更多信息 ",
            "Overwrite site": "覆盖现有站点",
            "Replace your existing site by using our automatic page generator. Author your content in our Markdown editor, select a theme, then publish.": "通过使用我们的自动页面生成器替换现有的网站。您可以在我们的 Markdown 编辑器，选择一个主题，然后发布。",
            "Launch automatic page generator": "启动自动生成器",

            "Danger Zone": "危险区",
            "Make this repository private": "将该仓库设为私有仓库",
            "Public forks can’t be made private.\n    Please": "收藏的的仓库，无法转为私有，请",
            "duplicate the repository": "复制一份该仓库。",
            "Make private": "转为私有",
            "Please": "请",
            "upgrade your plan": " 更新您的私有仓库计划 ",
            "to make this repository private.": "让这个仓库转为私有。",
            "Transfer ownership": "转让所有权",
            "Transfer": "转让",
            "Transfer this repository to another user or to an organization where you have admin rights.": "此存储库转移到其他用户或组织，在这里您具有管理员权限。",
            "Delete this repository": "删除此仓库",
            "Once you delete a repository, there is no going back. Please be certain.": "一旦删除您的仓库，将无法找回。请您三思。",

            "Default branch": "默认分支",
            "The default branch is considered the “base” branch in your repository, against which all pull requests and code commits are automatically made, unless you specify a different branch.": "默认分支被认为是“基地”分支在您的资料库，对所有拉取请求和代码的提交是自动进行的，除非您指定一个不同的分支。",
            "Update": "更新",
            "Switch default branch": "选择默认分支",
            "Filter branches": "搜索分支",
            "Protected branches": "受保护的分支",
            "Protect branches to disable force pushing, prevent branches from being deleted, and optionally require status checks before merging.\n    New to protected branches?": "受保护分支禁用强制 push，避免删除分支机构，合并可选要求前状态检查。创建新的受保护的分支机构？",
            "Learn more.": "查看更多信息",
            "No protected branches yet.": "暂无受保护分支",

            "Are you ABSOLUTELY sure?": "您确定一定以及肯定？",
            "Unexpected bad things will happen if you don’t read this!": "请仔细阅读以下提示信息！！！",
            "This action": "该操作是",
            "CANNOT": "不可逆的",
            "be undone. This will permanently delete the": "，您将永久删除 ",
            "repository, wiki, issues, and comments, and remove all collaborator associations.": " 仓库，wiki，问题和提交内容，并且移除所有合作者。",
            "Please type in the name of the repository to confirm.": "请您输入该仓库名以确认删除它。",
            "I understand the consequences, delete this repository": "我确定一定以及肯定删除它",

            // Compare changes 页面
            "Compare changes": "变更比较",
            "Compare changes across branches, commits, tags, and more below. If you need to, you can also": "比较跨分支，提交，标签，和更多的变更。如果您需要，也可以",
            "compare across forks": "比较收藏和源仓库",
            "base:": "基础库:",
            "compare:": "比较库:",
            "Create pull request": " 创建拉取请求",
            "Choose different branches or forks above to discuss and review changes.": "选择不同的分支或收藏来讨论和查看变化。",
            "Compare and review just about anything": "比较和审查任何文件",
            "Branches, tags, commit ranges, and time ranges. In the same repository and across forks.": "分支，标签，提交范围和时间范围。在同一仓库和收藏的仓库。",
            "Example comparisons": "比较例子",

            // issues 页面
            "No description provided.": "没有具体描述。",
            "Add your reaction": "添加您的表情",
            "Pick your reaction": "选择您的表情",
            "Leave a comment": "发表评论",
            "Milestone": "里程碑",
            "Unsubscribe": "取消订阅",
            "Attach files by dragging & dropping,": "拖拽添加附件，",
            "selecting them": "或选择文件，",
            ", or pasting\n        from the clipboard.": "或复制黏贴内容。",
            "Styling with Markdown is supported": "支持 Markdown 功能。",
            "Close issue": "关闭问题",
            "Comment": "提交",

            // 新建空仓库
            "Quick setup": "快速安装",
            "— if you’ve done this kind of thing before": " - 如果您以前做过这样的事",
            "Set up in Desktop": " 安装到桌面 ",
            "We recommend every repository include a": "我们推荐每个仓库都包括 ",
            ",\n            and": "，和 ",
            "…or create a new repository on the command line": "…或在命令行上创建一个新的仓库",
            "…or push an existing repository from the command line": "…或从命令行中推送现有的仓库",
            "…or import code from another repository": "…或从另一个仓库库导入代码",
            "You can initialize this repository with code from a Subversion, Mercurial, or TFS project.": "您可以初始化此仓库从一个 Subversion，Mercurial 或 TFS 项目。",
            "Import code": "导入代码",

            // commits 页面
            "committed": " 提交于 ",
            "Merge pull request": "拉取请求",

            "Copy the full SHA": "复制完整的 SHA",
            "Browse the repository at this point in the history": "浏览该阶段的历史仓库内容",

            "Newer": "新的",
            "Older": "旧的",

            // branches 页面
            "Overview": "概述",
            "Yours": "您的",
            "Active": "活跃的",
            "Stale": "陈旧的",
            "All branches": "所有分支",
            "Search branches…": "搜索分支…",

            "Your branches": "您的分支",
            "You haven’t pushed any branches to this repository.": "您没有提交任何分支到该仓库。",
            "Active branches": "活跃的分支",
            "There aren’t any active branches.": "没有任何活跃的分支。",
            "Stale branches": "陈旧的分支",
            "There aren’t any stale branches.": "没有任何陈旧的分支。",
            "View more active branches": "查看更多活跃的分支 ",
            "View more stale branches": "查看更多陈旧的分支 ",
            "Compare": " 比较 ",
            "Change default branch": "更改默认分支",

            // Releases 页面
            "Releases": "发布",
            "Pre-release": "预发布",
            "Downloads": " 下载 ",
            "Notes": " 说明 ",
            "There aren’t any releases here": "没有任何发布内容",
            "Create a new release": "创建一个发布",
            "Releases are powered by": "发布是通过在仓库中标记",
            "tagging specific points of history": " 特定历史版本 ",
            "in a repository. They’re great for marking release points like": "，用于发布的版本类似 ",

            "Latest release": "最新发布",
            "Read release notes": "阅读发布说明",
            "released this": " 发布它 ",
            "tagged this": " 标注 ",

            "Draft a new release": "起草新版本发布",
            "Add release notes": "添加发布说明",
            "Edit release notes": "编辑发布说明",
            "(No release notes)": "(没有发布说明)",
            "Release notes": "发布说明",

            "Edit tag": "修改标签",
            "Edit release": "修改发布",
            "Delete": " 删除 ",
            "Are you sure?": "您确定一定以及肯定吗？",
            "This will delete the information for this tag.": "将删除该标签的所有信息。",
            "Delete this tag": "删除此标签",
            "Your tag was removed": "标签删除成功！",

            "Existing tag": " 已存在的标签",
            "Markdown supported": " Markdown 语法支持",
            "Attach binaries by dropping them here or": " 拖拽文件到这来添加附件",
            "This is a pre-release": " 这是一个预发布版本 ",
            "We’ll point out that this release is identified as non-production ready.": "我们会指定该版本为未正式发布。",
            "Update release": "更新发布",
            "Publish release": "发布版本",
            "Save draft": "保存草稿",
            "Saved!": "已保存",
            "Saving draft failed. Try again?": "保存失败，再试一次？",

            // 图表页面
            "Contributors": "贡献者",
            "Traffic": "流量",
            "Commits": "提交",
            "Code frequency": "频率",
            "Punch card": "时刻",
            "Network": "网络",
            "Members": "成员",

            "Contributions to master, excluding merge commits": "对主分支的贡献，不包括合并提交",
            "Contributions:": "贡献者:",
            "Filter contributions": "筛选贡献者",
            "Additions": "添加数量",
            "Deletions": "删除数量",

        },
        "regexp": [ // 正则翻译
            [/HTTPS\s+(recommended)/, "HTTPS (推荐)"],
            [/Save (.+?) to your computer and use it in GitHub Desktop./, "使用 GitHub 桌面版，保存 $1 到您的电脑。"],
            [/(\d+) Open/, "$1 个开放的"],
            [/(\d+) Closed/, "$1 个关闭的"],
            [/View all issues opened by (.+)/, "查看所有 $1 的问题"],
            [/Welcome to the ([^ ]+) wiki!/, "欢迎访问 $1 的 wiki"],
            [/(\d+) participants?/, "$1 参与者"],
            [/Commits on (.+)/, "提交于 $1"],
            // bug [/from (.+)/, "从 $1"],
            [/(\d+) commits?/, "$1 次提交"],
            [/to ([^\n]+)[\n\s]+since this release/, " 到 $1 分支在此发布中。"],
        ],
    },

    "homepage": { // 未登录首页
        "static": { // 静态翻译
            "Pick a username": "选择一个用户名",
            "Your email address": "您的邮件地址",
            "Create a password": "创建一个密码",
            "Sign up for GitHub": "注册 GitHub",

            "Use at least one letter, one numeral, and seven characters.": "密码需要字母和数字组成的 7 位以上字符串。",
            "By clicking \"Sign up for GitHub\", you agree to our": "点击 “注册 GitHub”，表示您同意我们的 ",
            "terms of service": "服务条款",
            "and": " 和 ",
            "privacy policy": "隐私政策条款",
            "We'll occasionally send you account related emails.": "我们会偶尔发送您的帐户相关的电子邮件。",

            "How\xa0people build\xa0software": "人们如何构建软件",
            "Millions of developers use GitHub to build personal projects, support their businesses, and\xa0work together on open source technologies.": "数以百万计的开发人员使用 GitHub 建立个人项目，支持他们的企业，共同在开放源码技术。",

            "Welcome home, developers": "欢迎回来，开发者们",
            "GitHub fosters a fast, flexible, and collaborative development process that lets you work on your own or with others.": "GitHub 提供了一个快速，灵活和协作开发过程，让您对自己或与他人合作。",

            "For everything you build": "为您打造",
            "Host and manage your code on GitHub. You can keep your work private or share it with the world.": "主机和管理您的代码在 GitHub 上。您可以把您的工作或私人与世界分享。",
            "A better way to work": "一个更好的工作方式",
            "From hobbyists to professionals, GitHub helps developers simplify the way they build software.": "从业余爱好者到专业人士，GitHub 帮助开发人员简化的方式构建软件。",
            "Millions of projects": "数以百万计的项目",
            "GitHub is home to millions of open source projects. Try one out or get inspired to create your own.": "GitHub 是数百万开源项目的家园。尝试一个或获得灵感来创造您自己的项目。",
            "One platform, from start to finish": "一个平台，从始至终",
            "With hundreds of integrations, GitHub is flexible enough to be at the center of your development process.": "成百上千的集成，GitHub 是足够灵活的，能够在您的发展过程的中心。",

            "Who uses GitHub?": "谁在使用 GitHub ?",
            "Individuals": "个人 ",
            "Use GitHub to create a personal project, whether you want to experiment with a new programming language or host your life’s work.": "使用 GitHub 来创建一个个人项目，不管您想要尝试一个新的编程语言或主机在您生活及工作。",
            "Communities": "社区 ",
            "GitHub hosts one of the largest collections of open source software. Create, manage, and work on some of today’s most influential technologies.": "GitHub 主机是最大的开放源码软件的集合之一。创建，管理，以及在一些当今最具影响力的技术工作。",
            "Businesses": "企业 ",
            "Businesses of all sizes use GitHub to support their development process and securely build software.": "各种规模的企业使用的 GitHub 支持其发展过程中，安全地构建软件。",

            "GitHub is proud to host projects and organizations like": "GitHub 是自豪地举办项目和组织，如 ",
            "Public projects are always free. Private plans start at $7/month.": "公共项目是免费的。私人项目需要支付 7 美元一个月的费用。",
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
        },
        "regexp": [ // 正则翻译
        ],
    },

    "signup": { // 注册页
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },

    "notifications": { // 通知页面
        "static": { // 静态翻译
            "Notifications": " 通知",
            "Watching": " 关注的仓库",
            "Unread": "未读",
            "Participating": "参与话题",
            "All notifications": "所有通知",

            "No new notifications.": "没有新的通知。",
            "Depending on": "根据 ",
            "your notification settings": "您的通知设置",
            ", you’ll see updates here for your conversations in watched repositories.": "，您将看到您关注仓库的更新信息。",
        },
        "regexp": [ // 正则翻译
        ],
    },

    "watching": { // 关注的仓库页面
        "static": { // 静态翻译
            "Notifications": " 通知",
            "Watching": " 关注的仓库",

            "Watched repositories": "关注的仓库",
            "Sorted by most recently watched.": "按最近关注排序",
            "Unwatch all": "取消所有关注",
            "Unwatch": "取消关注",
            "Notification settings": "通知设置",
            "You can change how you receive notifications from your account settings.": "您可以修改接收通知的方式。",
            "Change notification settings": "修改通知设置",
        },
        "regexp": [ // 正则翻译
        ],
    },

    "stars": { // 点赞页面
        "static": { // 静态翻译
            "Showcases": " 展柜",
            "Trending": " 趋势",
            "Stars": " 已赞",

            "Search starred repositories…": "搜索点赞的仓库…",
            "Sort:": "排序:",
            "Sort options": "排序选项",
            "Recently starred": "最近关注的",
            "Recently active": "最近活动的",
            "Most stars": "最多赞的",
            "Unstar": "取消点赞",

            "All stars": "所有仓库",
            "Your repositories": "您的仓库",
            "Others' repositories": "其他仓库",

            "Filter by languages": "筛选语言",
            "Jump to a friend": "去好基友那",
        },
        "regexp": [ // 正则翻译
        ],
    },

    "issues": { // 问题页面
        "static": { // 静态翻译
            "Created": "已创建",
            "Assigned": "已分配",
            "Mentioned": "提到的",

            "Visibility": "可见性 ",
            "Repository visibility": "仓库可见性",
            "Private repositories only": "只有私有仓库",
            "Public repositories only": "只有公共库",

            "Organization": "组织 ",
            "Filter by organization or owner": "通过组织或所有者筛选",
            "Filter organizations": "筛选组织",

            "Sort": "排序 ",
            "Sort by": "排序方式",
            "Newest": "最新的",
            "Oldest": "最老的",
            "Most commented": "最多评论",
            "Least commented": "最少评论",
            "Recently updated": "最近更新",
            "Least recently updated": "最早更新",

            "No results matched your search.": "没有符合您的搜索结果。",
            "Use the links above to find what you’re looking for, or try": "使用上面的链接找到您要找的内容，或尝试",
            "a new search query": "新的搜索查询",
            ". The Filters menu is also super helpful for quickly finding issues most relevant to you.": "。过滤菜单也是快速找到问题最相关的您超级有帮助的。",
            "ProTip!": "专业提示！",
            "Updated in the last three days": "更新了最后三天：",
        },
        "regexp": [ // 正则翻译
            [/(\d+) Open/, " $1 未处理"],
            [/(\d+) Closed/, " $1 已处理"],
        ],
    },


    "search": { // 搜索页面
        "static": { // 静态翻译
            "Search more than": " 这里有超过 ",
            "repositories": " 的仓库供您搜索",

            "Repositories": " 仓库 ",
            "Code": " 代码 ",
            "Users": " 用户 ",

            "Languages": " 语言 ",

            "Advanced search": "高级搜索",
            "Cheat sheet": "搜索技巧",
            "You could try an": "您可以试一试 ",
            "advanced search": "高级搜索",

            "Sort:": "排序:",
            "Sort options": "排序选项",
            "Best match": "最佳匹配",
            "Most stars": "最多赞",
            "Fewest stars": "最少赞",
            "Most forks": "最多收藏",
            "Fewest forks": "最少收藏",
            "Recently updated": "最近更新",
            "Least recently updated": "最早更新",

            // 高级搜索
            "Advanced options": "高级选项",
            "From these owners": "指定作者",
            "In these repositories": "指定仓库",
            "Created on the dates": "创建日期",
            "Written in this language": "使用语言",
            "Any Language": "任何语言",
            "Popular": "流行的",
            "Everything else": "其他语言",

            "Repositories options": "仓库选项",
            "With this many stars": "指定被赞数",
            "With this many forks": "指定收藏数",
            "Of this size": "仓库大小",
            "Pushed to": "推送于",
            "Return repositories": "搜索结果 ",
            "not": "不",
            "and": "要",
            "only": "只",
            "including forks.": " 包括被收藏的仓库。",

            "Code options": "代码选项",
            "With this extension": "文件后缀",
            "Of this file size": "文件大小",
            "In this path": "文件路径",
            "Return code from forked repositories": "搜索结果包括被收藏的仓库。",

            "Issues options": "问题选项",
            "In the state": "问题状态",
            "With this many comments": "评论数量",
            "With the labels": "问题标签",
            "Opened by the author": "提问人",
            "Mentioning the users": "提到谁",
            "Assigned to the users": "分配给谁",
            "Updated before the date": "更新于",

            "Users options": "用户选项",
            "With this full name": "用户全称",
            "From this location": "来自哪里",
            "With this many followers": "有多少粉丝",
            "With this many public repositories": "有多少公共仓库",
            "Working in this language": "擅长什么语言",

        },
        "regexp": [ // 正则翻译
            [/We’ve found ([\d,]+) repository results/, "我们为您找到 $1 个相关结果"],
            [/We couldn’t find any repositories matching '(.+)'/, "我们没有找到任何与 '$1' 相关的结果"],
        ],
    },


    "gist": { // 代码片段页面
        "static": { // 静态翻译
            "Search…": "搜索代码片段…",
            "All gists": " 所有片段 ",
            "New gist": "新建片段",
            "Your gists": "您的片段",
            "Starred gists": "已赞片段",
            "Your GitHub profile": "设置",

            "View profile and more": "查看更多信息",
            "See all of your gists": "查看您的所有片段",
            "Instantly share code, notes, and snippets.": "即时分享您的代码，笔记，片段，以及灵感。",
            "Gist description…": "片段描述",

            "Filename including extension…": "文件名 (包括扩展名)",
            "Indent mode": "缩进模式",
            "Spaces": "空格",
            "Tabs": "TAB",
            "Indent size": "缩进大小",
            "Line wrap mode": "换行模式",
            "No wrap": "无换行",
            "Soft wrap": "软换行",
            "Add file": "添加文件",
            "Create secret gist": "创建私有片段",
            "Secret gists are hidden from search engines but visible to anyone you give the URL.": "私有片段搜索引擎是搜不到的，但是您可以分享您的 url 给他们。",
            "Create public gist": "创建公共片段",

            // All gists 页面
            "Sort:": "排序:",
            "Sort options": "排序选项",
            "Recently created": "最近创建的",
            "Least recently created": "最早创建的",
            "Recently updated": "最近更新的",
            "Least recently updated": "最早更新的",
            "Filter:": "筛选:",
            "Filter options": "筛选选项",
            "Public & Secret": "公共 & 私有",
            "Public only": "仅公共",
            "Secret only": "仅私有",
            "forked from": " 收藏自 ",
            "Created": "创建于 ",
            "View": " 查看 ",

            // View 代码 页面
            "Edit": " 编辑 ",
            "Delete": " 删除 ",
            "Star": " 点赞 ",
            "Unstar": " 取消点赞 ",
            "User actions": "用户操作",
            "Report abuse": "举报该用户",

            "Code": " 代码 ",
            "Revisions": " 修订 ",

            // 代码页面
            "What would you like to do?": "您想做什么？",
            "Embed this gist in your website.": "Embed 可嵌入到您的网页中。",
            "Copy sharable URL for this gist.": "复制 URL 共享这个片段。",
            "Clone with Git or checkout with SVN using the repository's web address.": "Git 克隆或 SVN 检出该仓库所使用的 web 地址。",
            "Clone with an SSH key and passphrase from your GitHub settings.": "使用 SSH 密钥克隆",
            "Learn more about clone URLs": "更多的克隆方法",

            "Copy to clipboard": "复制到剪切板",
            "Copied!": "复制成功!",
            "Download ZIP": "下载 ZIP",
            "Permalink": "永久链接",
            "Raw": "源码",

            // 修订页面
            "Unified": " 同屏 ",
            "Split": " 分屏 ",
            "created": " 创建",
            "this gist": "该片段于 ",

            // 编辑代码页面
            "Editing": " 编辑 ",
            "Make secret": " 转为私有 ",
            "Cancel": "取消",
            "Update public gist": "更新片段",
        },
        "regexp": [ // 正则翻译
            [/View ([^ ]+) on GitHub/, "查看 $1 的 GitHub"],
            [/(\d+) files?/, " $1 文件"],
            [/(\d+) forks?/, " $1 收藏"],
            [/(\d+) comments?/, " $1 评论"],
            [/(\d+) stars?/, " $1 赞"],
            [/Save (.+?) to your computer and use it in GitHub Desktop./, "使用 GitHub 桌面版，保存 $1 到您的电脑。"],
        ],
    },

    "oauth": { // 应用授权
        "static": { // 静态翻译
            "Authorize application": "应用授权",
            "by": " 的 ",
            "would like permission to access your account": " 想访问您的帐户",
            "Review permissions": "查看权限",
            "Public data only": "仅公共数据",
            "Limited access to your public data": "仅限访问您的公共数据",
            "This application will be able to identify you and read public information.": "此应用程序将能识别您的身份和读取您的公共信息。",
            "Learn more": "更多",

            "Visit application’s website": "访问应用官网",
            "Learn more about OAuth": "查看更多授权信息",
        },
        "regexp": [ // 正则翻译
        ],
    },
};
