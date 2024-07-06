// 假设已正确导入了优化后的配置文件
const I18N = require('./i18nConfig');

// 使用配置
function processPage(pagePath, pageTitle) {
    const { pagePaths, repoPaths, orgPaths, ignore, specialHandling } = I18N;

    // 示例：检查页面路径是否匹配特定规则
    if (pagePaths.test(pagePath)) {
        console.log("当前页面属于通用页面类型");
    } else if (repoPaths.test(pagePath)) {
        console.log("当前页面属于仓库相关页面");
    } else if (orgPaths.test(pagePath)) {
        console.log("当前页面属于组织相关页面");
    }

    // 示例：根据页面路径获取需要特殊处理的字符数据页面
    if (specialHandling.characterDataPages.includes(pageTitle)) {
        console.log(`页面"${pageTitle}"需要特殊字符数据处理`);
    }

    // 示例：检查并应用忽略规则
    const selectorsToIgnore = ignoreSelectors[pageTitle] || [];
    selectorsToIgnore.forEach(selector => {
        // 假设这里有一个函数可以处理忽略逻辑
        handleIgnoredElement(selector);
    });
}

// 假设调用此函数处理一个页面
processPage('/some-repo/issues/1', 'repository/edit');