var I18N = {};

I18N.zh = {
    "pubilc": { // 公共区域翻译
        "static": { // 静态翻译
            "Search GitHub": "GitHub 一下，你就知道",
            "This repository": "当前仓库",
            "Search": "搜索",

            "Pull requests": " 合并请求 ",
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
        },
        "regexp": [ // 正则翻译
            [/just now|(an?|\d+) (second|minute|hour|day|month|year)s? ago/, function (m, d, t) {
                if (m === 'just now') { return '刚刚'; }
                if (d[0] === 'a') { d = '1 '; }

                var dt = {second:'秒', minute:'分钟', hour:'小时', day:'天', month: '月', year:'年'};

                return ' - ' + d + dt[t] + '之前';
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
            
            // 动态 状态词
            "starred": " 赞了 ",
            "forked": " 收藏了 ",
            "created repository": " 创建了仓库 ",
            "opened issue": " 新建问题 ",
            "close issue": " 关闭问题 ",
            
            "More": "更多",
        },
        "regexp": [ // 正则翻译
        	["Show \d+ more repositories…", "显示 $1 更多的仓库…"],
        ],
    },

    "page-profile": { // 个人首页
        "static": { // 静态翻译
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
            "Repositories contributed to": "您贡献过的仓库",
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
            "Learn how we count contributions": " 你想知道如何计算贡献的吗",
            "Less": "少",
            "More": "多",
            "Contributions in the last year": "过去一年的贡献",
            "Longest streak": "连续贡献最长天数",
            "Current streak": "当前连续贡献天数",

            "commits": " 次提交 ",
            "Pull Requests": " 合并请求",
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
        },
        "regexp": [ // 正则翻译
        ],
    },

    "page-account": { // 个人设置
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
        },
        "regexp": [ // 正则翻译
            [/HTTPS\s+(recommended)/, "HTTPS (推荐)"],
            [/Save (.+?) to your computer and use it in GitHub Desktop./, "使用 GitHub 桌面版，保存 $1 到您的电脑。"],
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
            "Sign in to GitHub": "登录 GitHub 帐号",
            "Username or email address": "用户名/邮箱",
            "Password": "密码",
            "Forgot password?": "忘记密码",
            "Sign in": "登录",
            "New to GitHub?": "第一次来 GitHub?",
            "Create an account": " 那就注册个账号吧",
        }
    },

    "signup": { // 注册页
        "static": { // 静态翻译
        },
        "regexp": [ // 正则翻译
        ],
    },
};