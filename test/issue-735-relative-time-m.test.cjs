const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

function loadLocale(fileName) {
    const code = fs.readFileSync(path.join(root, fileName), 'utf8');
    const ctx = {};
    vm.createContext(ctx);
    vm.runInContext(`${code}\nthis.I18N = I18N;`, ctx);
    return ctx.I18N;
}

function translate(rules, text) {
    for (const [pattern, replacement] of rules) {
        const result = text.replace(pattern, replacement);
        if (result !== text) return result;
    }
    return text;
}

const localeCases = [
    {
        file: 'locals.js',
        lang: 'zh-CN',
        cases: {
            '1m': '1 分钟之前',
            '1m ago': '1 分钟之前',
            '30m': '30 分钟之前',
            '1mo': '1 个月之前',
            '1mo ago': '1 个月之前',
            '12mo': '12 个月之前',
            '2h': '2 小时之前',
            '1d': '1 天之前',
            '1w': '1 周之前',
            '1y': '1 年之前',
        },
    },
    {
        file: 'locals(greasyfork).js',
        lang: 'zh-CN',
        cases: {
            '1m': '1 分钟之前',
            '1mo': '1 个月之前',
            '2h': '2 小时之前',
        },
    },
    {
        file: 'locals_zh-TW.js',
        lang: 'zh-TW',
        cases: {
            '1m': '1 分鐘之前',
            '1mo': '1 個月之前',
            '2h': '2 小時之前',
            '1y': '1 年之前',
        },
    },
];

for (const { file, lang, cases } of localeCases) {
    test(`issue #735: ${file} short relative-time units`, () => {
        const pub = loadLocale(file)[lang].public;
        assert.ok(pub, `missing ${lang}.public in ${file}`);

        for (const [input, expected] of Object.entries(cases)) {
            for (const which of ['regexp', 'time-regexp']) {
                const got = translate(pub[which], input);
                assert.equal(
                    got,
                    expected,
                    `${file} ${which}: ${JSON.stringify(input)} => ${JSON.stringify(got)}, expected ${JSON.stringify(expected)}`
                );
            }
        }

        // Explicitly ensure minute is never translated as month.
        assert.match(translate(pub.regexp, '1m'), /分钟|分鐘/);
        assert.doesNotMatch(translate(pub.regexp, '1m'), /个月|個月/);
        assert.match(translate(pub['time-regexp'], '1m'), /分钟|分鐘/);
        assert.doesNotMatch(translate(pub['time-regexp'], '1m'), /个月|個月/);
    });
}
