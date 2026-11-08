'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');
const { pathToFileURL } = require('node:url');

const ROOT = path.join(__dirname, '..');
const FIXTURE_DRIFT = path.join(__dirname, 'fixtures', 'terms', 'sample-drift.js');
const FIXTURE_OK = path.join(__dirname, 'fixtures', 'terms', 'sample-ok.js');
const FIXTURE_OVERRIDE = path.join(__dirname, 'fixtures', 'terms', 'sample-override.js');
const GLOSSARY_OVERRIDE = path.join(__dirname, 'fixtures', 'terms', 'glossary-override.json');
const FIXTURE_PHRASE = path.join(__dirname, 'fixtures', 'terms', 'sample-phrase.js');
const GLOSSARY_PHRASE = path.join(__dirname, 'fixtures', 'terms', 'glossary-phrase.json');
const FIXTURE_BANNED = path.join(__dirname, 'fixtures', 'terms', 'sample-banned.js');
const GLOSSARY_BANNED = path.join(__dirname, 'fixtures', 'terms', 'glossary-banned.json');
const MISSING_BASELINE = path.join(__dirname, 'fixtures', 'terms', 'no-baseline.json');

async function loadChecker() {
    return import(pathToFileURL(path.join(ROOT, 'script', 'check-terms.mjs')).href);
}

test('真实词库：无新增违规，存量全部落在基线内', async () => {
    const { check } = await loadChecker();
    const result = check();

    assert.equal(result.blocked.length, 0, '不应有未豁免的违规');
    assert.ok(result.termCount > 0, '应加载到术语表');
    assert.ok(result.labelChecked > 0, '应检查到标签');
});

test('术语表规则生效：禁用译法被识别并给出行号', async () => {
    const { check } = await loadChecker();
    const result = check({ dict: FIXTURE_DRIFT, baseline: MISSING_BASELINE });

    const ids = result.blocked.map((v) => v.id).sort();
    assert.deepEqual(ids, ['actions', 'repository']);

    const repository = result.blocked.find((v) => v.id === 'repository');
    assert.equal(repository.key, 'Repositories');
    assert.equal(repository.value, '存储库');
    assert.equal(repository.expect, '仓库');
    assert.equal(repository.forbidden, true);
    assert.equal(repository.line, 6, '应定位到夹具第 6 行');
});

test('合规词条不产生违规', async () => {
    const { check } = await loadChecker();
    const result = check({ dict: FIXTURE_OK, baseline: MISSING_BASELINE });

    assert.deepEqual(result.blocked, []);
    assert.deepEqual(result.warns, []);
});

test('按段落覆盖：仓库段要求「策略」，组织段仍是「政策」', async () => {
    const { check } = await loadChecker();
    const result = check({
        dict: FIXTURE_OVERRIDE,
        glossary: GLOSSARY_OVERRIDE,
        baseline: MISSING_BASELINE,
    });

    assert.equal(result.blocked.length, 1, '只有仓库段应违规');

    const [violation] = result.blocked;
    assert.equal(violation.section, 'repository/settings/demo');
    assert.equal(violation.value, '政策');
    assert.equal(violation.expect, '策略');
    assert.equal(violation.override, 'repository/');
    assert.equal(violation.forbidden, true);
});

test('短语模板：Learn more about 必须接「了解更多关于」，「了解如何」例外', async () => {
    const { check } = await loadChecker();
    const result = check({
        dict: FIXTURE_PHRASE,
        glossary: GLOSSARY_PHRASE,
        baseline: MISSING_BASELINE,
    });

    assert.equal(result.blocked.length, 1, '只有不合模板的那条应违规');

    const [violation] = result.blocked;
    assert.equal(violation.id, 'learn-more-about');
    assert.equal(violation.via, 'phrase');
    assert.equal(violation.value, '了解更多');
    assert.equal(violation.expect, '了解更多关于');
    assert.equal(violation.line, 6);
});

test('全域禁用词：帐户 违规，其余不误报', async () => {
    const { check } = await loadChecker();
    const result = check({
        dict: FIXTURE_BANNED,
        glossary: GLOSSARY_BANNED,
        baseline: MISSING_BASELINE,
    });

    assert.equal(result.blocked.length, 1);

    const [violation] = result.blocked;
    assert.equal(violation.id, 'account-simplified');
    assert.equal(violation.via, 'banned');
    assert.equal(violation.value, '帐户设置');
});
