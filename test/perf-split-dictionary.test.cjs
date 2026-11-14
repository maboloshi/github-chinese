// 基准台按顶层语句切片注入词库；页面词典改成懒加载调用后，切片器必须继续识别
// defineI18nPage / defineI18nAlias，否则会退化成单条 2MB 注入并超时。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { pathToFileURL } = require('node:url');

const ROOT = path.join(__dirname, '..');

test('locals.js 能被切成多条可独立解析的注入片段', async () => {
    const { splitDictionaryTopLevel } = await import(
        pathToFileURL(path.join(ROOT, 'tools/perf/lib/split-dictionary.mjs')).href
    );
    const source = fs.readFileSync(path.join(ROOT, 'locals.js'), 'utf8');
    const chunks = splitDictionaryTopLevel(source, 200000);

    assert.ok(chunks.length > 1, `词库应被切分，实际 ${chunks.length} 段`);
    assert.equal(chunks.join(''), source, '切片必须无损拼回原文');

    for (const [index, chunk] of chunks.entries()) {
        assert.ok(chunk.length < 400000, `第 ${index} 段过大: ${chunk.length}`);
        assert.doesNotThrow(() => new Function(chunk), `第 ${index} 段语法不合法`);
    }
});
