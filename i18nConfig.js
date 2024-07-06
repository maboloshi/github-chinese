const pathRegexes = require('./pathRegexes');
const ignoreRules = require('./ignoreRules');

module.exports = {
    pagePaths: pathRegexes.pagePaths,
    repoPaths: pathRegexes.repoPaths,
    orgPaths: pathRegexes.orgPaths,
    ignore: {
        classes: ignoreRules.ignoreClasses,
        itemprops: ignoreRules.ignoreItemprops,
        ids: ignoreRules.ignoreIds,
        tags: ignoreRules.ignoreTags,
    },
    specialHandling: {
        characterDataPages: ignoreRules.characterDataPages,
        ignoreSelectors: ignoreRules.ignoreSelectors,
    },
};
