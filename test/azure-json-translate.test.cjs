const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {
    createAzureTranslator,
    makeBatches,
    runAction,
    splitLongText,
    translateJsonValue,
} = require('../.github/actions/azure-json-translate/index.js');

test('translates string values recursively while keeping JSON keys, non-strings, and placeholders', async () => {
    const source = JSON.parse(
        '{"title":"Hello {user}, %s!","nested":["Open {{project.name}}",42,false,null,"${count} files"],"percent":"100% complete","__proto__":{"safe":"Keep :name unchanged"}}',
    );
    const translated = await translateJsonValue(source, async texts => texts.map(text => `ZH(${text})`));

    assert.deepEqual(translated, JSON.parse(
        '{"title":"ZH(Hello) {user}ZH(,) %sZH(!)","nested":["ZH(Open) {{project.name}}",42,false,null,"${count} ZH(files)"],"percent":"ZH(100% complete)","__proto__":{"safe":"ZH(Keep) :name ZH(unchanged)"}}',
    ));
    assert.equal(source.title, 'Hello {user}, %s!');
});

test('does not call Azure when the JSON contains no translatable text', async () => {
    let calls = 0;
    const result = await translateJsonValue({ count: 3, empty: '', marker: '{name}' }, async texts => {
        calls += 1;
        return texts;
    });

    assert.deepEqual(result, { count: 3, empty: '', marker: '{name}' });
    assert.equal(calls, 0);
});

test('splits long text without breaking Unicode characters and batches within Azure limits', () => {
    assert.deepEqual(splitLongText('甲乙😀丙', 3), ['甲乙', '😀丙']);
    const batches = makeBatches(['a'.repeat(45001), 'b', 'c']);
    assert.deepEqual(batches.map(batch => batch.length), [1, 3]);
    assert.equal(batches.flat().join(''), `${'a'.repeat(45001)}bc`);
    assert.ok(batches.every(batch => batch.length <= 100
        && batch.reduce((total, text) => total + text.length, 0) <= 45000));
});

test('sends Azure Translator requests with the configured region and Simplified Chinese target', async () => {
    const requests = [];
    const translator = createAzureTranslator({
        apiKey: 'test-secret',
        region: 'eastus',
        sourceLanguage: 'en',
        endpoint: 'https://example.cognitiveservices.azure.com/',
        fetchImpl: async (url, options) => {
            requests.push({ url: new URL(url), options });
            return {
                ok: true,
                json: async () => [{ translations: [{ text: '你好' }] }],
            };
        },
    });

    assert.deepEqual(await translator(['Hello']), ['你好']);
    assert.equal(requests[0].url.pathname, '/translate');
    assert.equal(requests[0].url.searchParams.get('to'), 'zh-Hans');
    assert.equal(requests[0].url.searchParams.get('from'), 'en');
    assert.equal(requests[0].options.headers['Ocp-Apim-Subscription-Region'], 'eastus');
    assert.deepEqual(JSON.parse(requests[0].options.body), [{ Text: 'Hello' }]);
});

test('retries transient Azure errors and redacts the API key from failure details', async () => {
    let calls = 0;
    const waits = [];
    const translator = createAzureTranslator({
        apiKey: 'never-print-this',
        region: 'eastus',
        endpoint: 'https://example.cognitiveservices.azure.com',
        sleep: async ms => waits.push(ms),
        fetchImpl: async () => {
            calls += 1;
            return calls === 1
                ? { ok: false, status: 429, headers: { get: () => '1' } }
                : {
                    ok: false,
                    status: 401,
                    statusText: 'Unauthorized',
                    text: async () => 'key=never-print-this',
                };
        },
    });

    await assert.rejects(translator(['Hello']), error => {
        assert.match(error.message, /Azure Translator request failed \(401\)/);
        assert.match(error.message, /\[REDACTED\]/);
        assert.doesNotMatch(error.message, /never-print-this/);
        return true;
    });
    assert.equal(calls, 2);
    assert.deepEqual(waits, [1000]);
});

test('reads and writes the selected files while preserving the JSON shape', async t => {
    const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'azure-json-translate-'));
    t.after(() => fs.rm(cwd, { recursive: true, force: true }));
    await fs.mkdir(path.join(cwd, 'locales'), { recursive: true });
    await fs.writeFile(path.join(cwd, 'locales', 'en.json'), '{"button":"Save {name}","version":2}');

    await runAction({
        cwd,
        env: {
            'INPUT_API-KEY': 'test-secret',
            INPUT_REGION: 'eastus',
            'INPUT_INPUT-FILE': 'locales/en.json',
            'INPUT_OUTPUT-FILE': 'generated/zh-Hans.json',
            'INPUT_SOURCE-LANGUAGE': 'ja',
        },
        fetchImpl: async (url, options) => {
            assert.equal(new URL(url).searchParams.get('from'), 'ja');
            return {
                ok: true,
                json: async () => JSON.parse(options.body).map(({ Text }) => ({
                    translations: [{ text: `译文:${Text}` }],
                })),
            };
        },
        logger: { info() {} },
    });

    const output = JSON.parse(await fs.readFile(path.join(cwd, 'generated', 'zh-Hans.json'), 'utf8'));
    assert.deepEqual(output, { button: '译文:Save {name}', version: 2 });
});
