// 把 locals.js 按顶层语句边界切成若干段，供 CDP 逐段注入（避免 2MB 单条超时，也避免 eval 被 CSP 拦）
export function splitDictionaryTopLevel(source, chunkSize = 200000) {
    const cuts = [0];
    // 页面词典既可能是 I18N 赋值，也可能是懒加载的 defineI18nPage/defineI18nAlias 调用；
    // 两种顶层语句都要能作为切分点，否则整份词库会退化成单条 2MB 注入。
    const re = /^(?:I18N(?:\.conf|\[)|defineI18n(?:Page|Alias)\()/gm;
    let match;
    while ((match = re.exec(source))) {
        if (match.index > 0 && match.index - cuts[cuts.length - 1] >= chunkSize) {
            cuts.push(match.index);
        }
    }
    cuts.push(source.length);
    const chunks = [];
    for (let i = 0; i < cuts.length - 1; i++) {
        chunks.push(source.slice(cuts[i], cuts[i + 1]));
    }
    return chunks;
}
