const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const runtimeScripts = [
    'main.user.js',
    'main(nju.edu).user.js',
    'main_zh-TW.user.js',
    'main(greasyfork).user.js',
];

function extractTimeTranslator(source) {
    const start = source.indexOf('function transTimeElement(');
    assert.notEqual(start, -1, 'transTimeElement should exist in the userscript');

    const end = source.indexOf('\n    /**', start);
    assert.notEqual(end, -1, 'transTimeElement should end before the next documented function');
    return source.slice(start, end).trimEnd();
}

for (const fileName of runtimeScripts) {
    test(`${fileName} removes the leftover on from translated timestamps`, () => {
        const filePath = path.join(__dirname, '..', fileName);
        const source = fs.readFileSync(filePath, 'utf8');
        const translateTime = vm.runInNewContext(`(${extractTimeTranslator(source)})`);
        const element = { textContent: '打开于 on 7月15日' };

        translateTime(element);

        assert.equal(element.textContent, '打开于 7月15日');
    });
}
