/*******************************************************************************

    conf.js - 搭配用户脚本插件`GitHub 中文化插件`的页面匹配规则, 忽略规则文件
    Copyright (C) 2016-2021 楼教主 (https://github.com/52cik)
    Copyright (C) 2021-当前 沙漠之子 (https://github.com/maboloshi)

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

    Home: https://github.com/maboloshi/github-chinese
*/
var I18N = {};

I18N.conf = {

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
    rePagePath: /^\/($|dashboard|signup|login\/oauth|login|logout|sessions?|password_reset|orgs|explore|topics|notifications\/subscriptions|notifications|watching|stars|issues|pulls|search|trending|showcases|new\/(import|project)|new|import|settings\/(profile|admin|appearance|accessibility|notifications|billing|emails|security_analysis|security-log|security|auth|sessions|keys|ssh|gpg|organizations|enterprises|blocked_users|interaction_limits|code_review_limits|repositories|codespaces|deleted_repositories|packages|copilot|pages|replies|installations|apps\/authorizations|reminders|sponsors-log|apps|(?:personal-access-|)tokens|developers|applications\/new|applications|connections\/applications)|settings|installations\/new|marketplace|apps|account\/(organizations\/new|choose|upgrade|billing\/history)|projects|redeem|discussions|events|collections|sponsors|sponsoring|github-copilot\/signup|codespaces|developer\/register|features|security)|^\/users\/[^\/]+\/(projects|packages|succession\/invitation)/,

    // 仓库路径
    rePagePathRepo: /^\/[^\/]+\/[^\/]+\/(issues|pulls|pull|tree|watchers|stargazers|new|edit|delete|upload|find|wiki|branches|discussions|activity|rules|releases|packages|tags|labels|milestones|compare|commit|blob|blame|actions|runs|deployments|security|pulse|community|forks|fork|import|graphs\/(contributors|community|traffic|commit-activity|code-frequency)|network$|network\/(dependencies|dependents|updates|members)|settings\/(access|code_review_limits|interaction_limits|branches|branch_protection_rules|tag_protection|rules|actions|hooks|environments|codespaces|pages|security_analysis|dependabot_rules|keys|secrets|variables|installations|notifications)|settings|transfer|projects\/new|pkgs|contribute|subscription|invitations|codespaces|attestations)/,

    // 组织路径
    rePagePathOrg: /^\/[^\/]+\/[^\/]+\/(repositories\/new|repositories|discussions|projects|packages|teams|new-team|people|outside-collaborators|pending_collaborators|dashboard|billing_managers\/new|settings\/(profile|billing|roles|member_privileges|teams|import-export|blocked_users|interaction_limits|code_review_limits|moderators|repository-defaults|rules|codespaces|copilot|actions|hooks|discussions|packages|pages|projects|security_analysis|security|dependabot_rules|domains|secrets|variables|oauth_application_policy|installations|personal-access-token|reminders|sponsors-log|audit-log|deleted_repositories|applications\/new|applications|apps\/new|apps|publisher)|topics|domain\/new|audit-log\/event_settings|billing\/(history|plans)|policies\/applications)|^\/[^\/]+\/(enterprise_plan|sponsoring)/,

    characterDataPage: ['repository/new', 'repository/edit', 'new', 'new/import', 'orgs/repositories/new'],

    ignoreMutationSelectorPage: {
        'repository/new': [".cm-scroller"],
        'repository/edit': [".cm-scroller", "table"],
        'repository/pull': ["td.blob-code"],
        'repository/compare': ["tbody"],
        'repository/commit': ["tr.show-top-border"],
        'repository/blob': ["section"],
        'repository/blame': ["section"],
        'repository': [".AppHeader-context", "article.markdown-body", "table"],
        'repository/releases': [".Box-footer"],
    },

    ignoreSelectorPage: {
        'repository': [
            '.AppHeader-context-full', // 顶部 <username>/<repo_name>
            '.content[itemprop="name"]', // 仓库名称 无效
            // 'ul.list-style-none', // 右侧 部署列表 无效
            '.d-block.overflow-x-hidden.color-fg-default', // 仓库名称
            '[data-testid="latest-commit"]', // 最新的提交
            'tr.react-directory-row', // 仓库列表
            '.f4.my-3', // 仓库简介正文
            '#translate-me',
            '.my-3.d-flex.flex-items-center', // 仓库简介中的链接
            // '.markdown-body',
            'li.mt-2',
        ],
        'repository/tree': [
            '.AppHeader-context-full', // 顶部 <username>/<repo_name>
            '.react-tree-show-tree-items', // 左侧文件树项目
            'tbody', // 文件列表
            '#repos-header-breadcrumb',
            '#file-name-id', // 文件路径中文件部分
        ],
        'repository/blob': [
            '.AppHeader-context-full', // 顶部 <username>/<repo_name>
            '.react-tree-show-tree-items', // 左侧文件树项目
            '[id^="offset"]', //符号-->引用
            'section', // 代码视图
            '#filter-results', // 右侧 符号筛选
            '#repos-header-breadcrumb', // 文件路径中文件夹路径
            '#repos-header-breadcrumb--wide', // 文件路径中文件夹路径 左侧文件树展开情况
            '#sticky-breadcrumb',
            '#file-name-id', // 文件路径中文件部分
        ],
        'repository/commit': [
            'tr.show-top-border', // 代码差异 同屏
            'td.blob-code', // 代码差异 分屏
        ],
        'repository/pull': [
            'tr.show-top-border', // 代码差异 同屏
            'td.blob-code', // 代码差异 分屏
        ],
        'repository/compare': [
            'tr.show-top-border', // 代码差异 同屏
            'td.blob-code', // 代码差异 分屏
        ],
        'repository/edit': [
            '.cm-scroller', // 代码编辑器
        ],
        'repository/new': [
            '.cm-scroller', // 代码编辑器
        ],
        'dashboard': [
            '.js-notice-dismiss', // 右侧栏 广告
            '.TimelineItem', // 右侧栏 最新变化
        ],
        '*': [
            '.markdown-body',
            '.markdown-title'
        ],
    },
};
