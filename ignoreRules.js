const ignoreClasses = /(blob-code|highlight-.*|...)/;
const ignoreItemprops = /(name|author|additionalName)/;
const ignoreIds = ['readme', 'offset', 'breadcrumb', 'file-name-id'];
const ignoreTags = ['CODE', 'SCRIPT', 'STYLE', 'LINK', 'IMG', 'MARKED-TEXT', 'PRE', 'KBD'];
const characterDataPages = ['repository/new', 'repository/edit', 'new', 'new/import', 'orgs/repositories/new'];
const ignoreSelectors = {
    'repository/new': [".cm-scroller"],
    'repository/edit': [".cm-scroller", "table"],
    // ...
};

module.exports = {
    ignoreClasses,
    ignoreItemprops,
    ignoreIds,
    ignoreTags,
    characterDataPages,
    ignoreSelectors,
};