/**
 * 忽略规则定义文件，包含了需要在处理过程中忽略的元素选择器、属性等。
 */
const ignoreClasses = /(blob-code|highlight-.*|...)/; // 需要忽略的CSS类名正则
const ignoreItemprops = /(name|author|additionalName)/; // 需要忽略的itemprop属性值正则
const ignoreIds = ['readme', 'offset', 'breadcrumb', 'file-name-id']; // 需要忽略的ID列表
const ignoreTags = ['CODE', 'SCRIPT', 'STYLE', 'LINK', 'IMG', 'MARKED-TEXT', 'PRE', 'KBD']; // 需要忽略的HTML标签列表
const characterDataPages = ['repository/new', 'repository/edit', 'new', 'new/import', 'orgs/repositories/new']; // 特殊字符数据处理的页面路径
const ignoreSelectors = {
    'repository/new': [".cm-scroller"], // 在'repository/new'页面下忽略的CSS选择器
    'repository/edit': [".cm-scroller", "table"], // 在'repository/edit'页面下忽略的CSS选择器
    // 更多页面特定的忽略选择器...
};

module.exports = {
    ignoreClasses,
    ignoreItemprops,
    ignoreIds,
    ignoreTags,
    characterDataPages,
    ignoreSelectors,
};