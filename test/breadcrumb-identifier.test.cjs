// 面包屑标识符判定（#824）不能误伤站点固定路径。
//
// #824 要求仓库/账号面包屑里的 owner、repo 保持原文；但 /notifications、/settings
// 这类页面的面包屑首项是界面文案（「通知」），必须照常翻译。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(ROOT, 'main.user.js'), 'utf8').replace(/\r\n/g, '\n');

function extractBlock(start, terminator) {
    const end = source.indexOf(terminator, start);
    assert.notEqual(start, -1);
    assert.notEqual(end, -1);
    return source.slice(start, end + terminator.length);
}

function extractConst(name) {
    const start = source.indexOf(`    const ${name} = `);
    assert.notEqual(start, -1, `${name} should exist`);
    return extractBlock(start, '\n    ]);');
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

function load({ pathname, nwo = null }) {
    const context = vm.createContext({
        document: {
            head: {
                querySelector(selector) {
                    if (selector.includes('octolytics-dimension-repository_nwo')) {
                        return nwo ? { content: nwo } : null;
                    }
                    return null;
                },
            },
        },
        window: { location: { pathname } },
    });
    vm.runInContext(`
${extractConst('RESERVED_ROOTS')}
${extractFunction('isBreadcrumbIdentifierLink')}
globalThis.__isIdentifier = isBreadcrumbIdentifierLink;
`, context, { filename: 'main.user.js' });

    return {
        link(href, { inBreadcrumbs = true } = {}) {
            return context.__isIdentifier({
                tagName: 'A',
                pathname: href,
                closest: selector => (inBreadcrumbs && selector === 'nav[data-component="Breadcrumbs"]' ? {} : null),
            });
        },
    };
}

test('固定路径页面的面包屑首项是界面文案，不当作标识符', () => {
    const cases = [
        ['/notifications', '/notifications'],
        ['/settings/profile', '/settings'],
        ['/marketplace', '/marketplace'],
        ['/explore', '/explore'],
        ['/pulls', '/pulls'],
    ];
    for (const [pathname, href] of cases) {
        const page = load({ pathname });
        assert.equal(page.link(href), false, `${pathname} 的 ${href} 不应被拒翻`);
    }
});

test('账号名 / 仓库名仍然保持原文（#824 不回归）', () => {
    const profile = load({ pathname: '/maboloshi' });
    assert.equal(profile.link('/maboloshi'), true, '用户主页的面包屑用户名要被跳过');

    const org = load({ pathname: '/orgs/acme' });
    assert.equal(org.link('/acme'), true, '组织页的面包屑组织名要被跳过');

    const repo = load({ pathname: '/acme/project', nwo: 'acme/project' });
    assert.equal(repo.link('/acme'), true, '仓库页的面包屑 owner 要被跳过');
    assert.equal(repo.link('/acme/project'), true, '仓库页的面包屑 repo 要被跳过');
});

test('只对面包屑里的 <a> 生效', () => {
    const page = load({ pathname: '/maboloshi' });
    assert.equal(page.link('/maboloshi', { inBreadcrumbs: false }), false, '不在面包屑里就不管');
});

test('面包屑标识符护栏留在通用遍历里（#824）', () => {
    assert.match(source, /function isBreadcrumbIdentifierLink/);
    assert.match(source, /octolytics-dimension-repository_nwo/);
    assert.match(source, /FILTER_REJECT; \/\/ 跳过账号名 \/ 仓库名/);
});
