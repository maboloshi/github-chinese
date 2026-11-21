// 衍生脚本 main(nju.edu).user.js 由
// .github/workflows/main.user.js_version_update_and_sync_zh-TW.yaml 用
// `cp main.user.js` + sed 替换 @require 生成，因此它应当是 main.user.js 的纯镜像。
//
// 但该 workflow 的同步步骤带 `if: env.LOCALS_JS_CHANGED == 'true'` 条件，只有
// locals.js 变化时才复制：11-14 到 11-15 之间主脚本的 8 个提交就没同步过去，
// 装 nju 版的用户拿到的是旧脚本。
//
// 这里把"镜像已同步"变成一个会响的不变量，而不是继续信任 workflow。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const ROOT = path.join(__dirname, '..');
const MAIN = 'main.user.js';
const MIRROR = 'main(nju.edu).user.js';

// nju 镜像的 @require 指向 mirror.nju.edu.cn，且版本号是纯日期
const MIRROR_REQUIRE = /^\/\/ @require\s+https:\/\/mirror\.nju\.edu\.cn\/github-chinese\/locals\.js\?v=\d{4}-\d{2}-\d{2}$/m;

function read(name) {
    return fs.readFileSync(path.join(ROOT, name), 'utf8').replace(/\r\n/g, '\n');
}

/** 把每一条 @require 行抹平，便于比较两份脚本的其余部分。 */
function withoutRequire(text) {
    return text.replace(/^\/\/ @require .*$/gm, '// @require <locals>');
}

test('main(nju.edu).user.js 是 main.user.js 的纯镜像（仅 @require 不同）', () => {
    const main = read(MAIN);
    const mirror = read(MIRROR);

    assert.equal(
        withoutRequire(mirror),
        withoutRequire(main),
        `${MIRROR} 应与 ${MAIN} 除 @require 外完全一致：镜像落后于主脚本时要重新生成`,
    );
    assert.match(mirror, MIRROR_REQUIRE, `${MIRROR} 的 @require 应指向 nju 镜像`);
    assert.doesNotMatch(main, MIRROR_REQUIRE, `${MAIN} 不应使用 nju 镜像的 @require`);
});
