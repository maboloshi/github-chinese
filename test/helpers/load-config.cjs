'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

/**
 * 从仓库根目录加载一个语言配置文件，并返回其 I18N.conf。
 *
 * @param {string} fileName  相对于仓库根目录的路径（如 'locals.js'）。
 * @returns {object} 解析后的 I18N.conf 对象。
 */
function loadConfig(fileName) {
    const filePath = path.join(__dirname, '..', '..', fileName);
    const context = vm.createContext({});

    vm.runInContext(fs.readFileSync(filePath, 'utf8'), context, {
        filename: filePath,
    });

    return context.I18N.conf;
}

module.exports = { loadConfig };
