// locals.js 的页面词典改为按需构建后，仍必须保持原有的可访问性与别名语义。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');

function loadLocale() {
    const context = vm.createContext({ window: {}, document: {}, console });
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'locals.js'), 'utf8'), context);
    return context.I18N['zh-CN'];
}

test('页面词典在首次访问时才构建，并缓存同一个对象', () => {
    const locale = loadLocale();
    const descriptor = Object.getOwnPropertyDescriptor(locale, 'dashboard');

    assert.equal(typeof descriptor.get, 'function', 'dashboard 应该是懒加载 getter');

    const first = locale.dashboard;
    assert.ok(first.static && first.regexp, 'dashboard 构建后应包含 static 与 regexp');
    assert.equal(locale.dashboard, first, '重复访问必须复用同一个对象');
});

test('别名页面与目标页面共享同一份词典', () => {
    const locale = loadLocale();

    assert.equal(locale.dashboard, locale['page-dashboard']);
    assert.equal(locale['repository/tree'], locale.repository);
});

test('公共块仍可独立访问且内容完整', () => {
    const locale = loadLocale();

    assert.ok(Object.keys(locale.public.static).length > 0);
    assert.ok(Array.isArray(locale.public.regexp));
});
