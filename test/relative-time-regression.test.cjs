const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = vm.createContext({});
const dictionary = path.join(__dirname, '..', 'locals.js');
vm.runInContext(fs.readFileSync(dictionary, 'utf8'), context, { filename: dictionary });
const rules = context.I18N['zh-CN'].public.regexp;

function translate(text) {
    for (const [pattern, replacement] of rules) {
        const result = text.replace(pattern, replacement);
        if (result !== text) return result;
    }
    return text;
}

test('preserves duration-like phrases in ordinary text', () => {
    for (const text of [
        'Windows Search sometimes steals focus when I press the physical Windows key on a second monitor',
        'Wait a second',
        'A 2 minute delay',
        'Support a secondhand monitor',
    ]) {
        assert.equal(translate(text), text);
    }
});

test('translates standalone durations and explicit relative times', () => {
    for (const [text, expected] of [
        ['a second', '1 秒之前'],
        ['7 months', '7 个月之前'],
        ['2 hours ago', '2 小时之前'],
        ['Updated about a day ago', 'Updated 大约 1 天之前'],
        ['Expires in 6 minutes', 'Expires 6 分钟之内'],
    ]) {
        assert.equal(translate(text), expected, text);
    }
});
