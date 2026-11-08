// #809 / #812：Turbo 导航后 analytics-location 短暂缺失，仓库页必须仍被识别
//
// 只覆盖主脚本。衍生脚本（greasyfork / zh-TW / nju）尚未同步，等主脚本验证完再补。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const ELEMENT_NODE = 1;

const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8').replace(/\r\n/g, '\n');

function loadI18N() {
    const context = vm.createContext({});
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'locals.js'), 'utf8'), context);
    return context.I18N;
}

function extractFunction(name) {
    const start = source.indexOf(`    function ${name}(`);
    assert.notEqual(start, -1, `${name} should exist`);

    const bodyStart = source.indexOf('{', start);
    let depth = 0;
    for (let index = bodyStart; index < source.length; index += 1) {
        if (source[index] === '{') depth += 1;
        if (source[index] === '}') depth -= 1;
        if (depth === 0) return source.slice(start, index + 1);
    }
    assert.fail(`could not extract ${name}`);
}

function extractConfig() {
    const start = source.indexOf('    const CONFIG = {');
    const end = source.indexOf('\n    };', start);
    assert.notEqual(start, -1);
    assert.notEqual(end, -1);
    return source.slice(start, end + '\n    };'.length);
}

function createEnvironment() {
    const state = {
        href: 'https://github.com/settings/profile',
        classes: [],
        meta: '',
        nwo: '',
    };
    const location = {
        get href() { return state.href; },
        get hostname() { return new URL(state.href).hostname; },
        get pathname() { return new URL(state.href).pathname; },
        get search() { return new URL(state.href).search; },
        get hash() { return new URL(state.href).hash; },
    };
    const body = {
        nodeType: ELEMENT_NODE,
        parentElement: null,
        get className() { return state.classes.join(' '); },
        classList: {
            contains(name) { return state.classes.includes(name); },
        },
    };
    const document = {
        body,
        head: {
            querySelector(selector) {
                if (selector === 'meta[name="analytics-location"]' && state.meta) {
                    return { content: state.meta };
                }
                if (selector === 'meta[name="octolytics-dimension-repository_nwo"]' && state.nwo) {
                    return { content: state.nwo };
                }
                return null;
            },
        },
    };

    return {
        window: { location },
        document,
        setUrl(href) { state.href = new URL(href).href; },
        setClasses(classes) { state.classes = classes.slice(); },
        setMeta(meta) { state.meta = meta; },
        setNwo(nwo) { state.nwo = nwo; },
    };
}

function loadDetector() {
    const env = createEnvironment();
    const context = vm.createContext({
        URL,
        URLSearchParams,
        I18N: loadI18N(),
        console: { log() {}, warn() {}, error() {} },
        document: env.document,
        window: env.window,
    });
    vm.runInContext(`
${extractConfig()}
${extractFunction('isFallbackRepositoryPath')}
${extractFunction('detectPageType')}
globalThis.__detect = detectPageType;
`, context, { filename: 'main.user.js' });
    return { env, detect: () => context.__detect() };
}

function classify(loaded, href, classes = [], meta = '') {
    loaded.env.setUrl(href);
    loaded.env.setClasses(classes);
    loaded.env.setMeta(meta);
    return loaded.detect();
}

const repositoryPages = [
    ['https://github.com/acme/project', 'repository'],
    ['https://github.com/acme/project/', 'repository'],
    ['https://github.com/acme/project?files=1', 'repository'],
    ['https://github.com/acme/project#readme', 'repository'],
    ['https://github.com/acme/project?files=1#readme', 'repository'],
    ['https://github.com/acme/project/tree/main', 'repository/tree'],
    ['https://github.com/acme/project/issues', 'repository/issues'],
    ['https://github.com/acme/project/issues/7', 'repository/issues'],
    ['https://github.com/acme/project/settings', 'repository/settings'],
    ['https://github.com/acme/project/settings/hooks', 'repository/settings/hooks'],
];

const preservedPages = [
    ['https://github.com/settings/profile', [], 'settings/profile'],
    ['https://github.com/topics/javascript', [], 'topics'],
    ['https://github.com/notifications/subscriptions', [], 'notifications/subscriptions'],
    ['https://github.com/copilot/chat', [], 'copilot'],
    ['https://github.com/users/acme/projects', [], 'projects'],
    ['https://github.com/github-copilot/signup', [], 'github-copilot/signup'],
    ['https://github.com/new/import', [], 'new/import'],
    ['https://github.com/account/organizations/new', [], 'account/organizations/new'],
    ['https://github.com/installations/new', [], false],
    ['https://github.com/orgs/acme', [], 'orgs'],
    ['https://github.com/orgs/acme/repositories', [], 'orgs/repositories'],
    ['https://github.com/organizations/acme', [], 'orgs'],
    ['https://github.com/organizations/acme/people', [], 'orgs/people'],
    ['https://github.com/organizations/acme/settings/profile', [], 'orgs/settings/profile'],
    ['https://github.com/acme/enterprise_plan', [], false],
    ['https://github.com/acme/sponsoring', [], false],
    ['https://github.com/settings-tools/project', [], 'repository'],
    ['https://github.com/login', [], 'login'],
    ['https://github.com/acme/project', ['session-authentication'], 'session-authentication'],
    ['https://github.com/', [], 'homepage'],
    ['https://github.com/', ['logged-in'], 'dashboard'],
    ['https://github.com/acme?tab=repositories', ['page-profile'], 'page-profile/repositories'],
    ['https://github.com/acme/stars', ['page-profile'], 'page-profile/stars'],
    ['https://github.com/acme/project', ['page-profile'], 'page-profile'],
    ['https://gist.github.com/acme/project', [], 'gist'],
    ['https://www.githubstatus.com/incidents', [], 'status'],
    ['https://skills.github.com/acme/project', [], 'skills'],
];

const rejectedPages = [
    'https://github.com/acme',
    'https://github.com/acme/',
    'https://github.com//project',
    'https://github.com/acme//tree',
    'https://github.com/acme/...',
    'https://github.com/.../project',
    'https://github.com/acme/foo%20bar',
    'https://github.com/acme/project/reported_content',
    'https://github.com/acme/project/unknown-feature',
];

test('仓库路径在 analytics-location 缺失/失效时仍被识别', () => {
    const loaded = loadDetector();
    for (const [href, expected] of repositoryPages) {
        for (const meta of ['', 'unavailable', '/<user-name>/<repo-name>']) {
            assert.equal(classify(loaded, href, ['logged-in'], meta), expected, `${href} [${meta}]`);
        }
    }
    assert.equal(
        classify(loaded, 'https://github.com/acme', [], '/<user-name>'),
        'page-profile',
    );
});

test('全局、个人、认证、首页、组织与特殊站点路由不被回退误判', () => {
    const loaded = loadDetector();
    for (const [href, classes, expected] of preservedPages) {
        for (const meta of ['', 'unavailable']) {
            assert.equal(classify(loaded, href, classes, meta), expected, `${href} [${meta}]`);
        }
    }
    // 元数据可用时以元数据为准
    assert.equal(
        classify(loaded, 'https://github.com/topics/javascript', [], '/<user-name>/<repo-name>'),
        'repository',
    );
});

test('不完整路径与未知路由不会被当成仓库页', () => {
    const loaded = loadDetector();
    for (const href of rejectedPages) {
        assert.equal(classify(loaded, href, [], ''), false, href);
        assert.equal(classify(loaded, href, [], 'unavailable'), false, href);
    }
    assert.equal(
        classify(loaded, 'https://github.com/acme/project/reported_content', [], '/<user-name>/<repo-name>'),
        false,
    );
    assert.equal(
        classify(loaded, 'https://github.com/acme/project/unknown-feature', [], '/<user-name>/<repo-name>'),
        'repository',
    );
});

test('repository_nwo 元数据仍然有效，不被路径回退取代', () => {
    const loaded = loadDetector();
    loaded.env.setUrl('https://github.com/acme/project/unknown-feature');
    loaded.env.setClasses([]);
    loaded.env.setMeta('');
    assert.equal(loaded.detect(), false);
    loaded.env.setNwo('acme/project');
    assert.equal(loaded.detect(), 'repository');
});
