// 把 locals.js 按顶层语句边界切成若干段，供 CDP 逐段注入（避免 2MB 单条超时，也避免 eval 被 CSP 拦）
export function splitDictionaryTopLevel(source, chunkSize = 200000) {
    const cuts = [0];
    const re = /^I18N(?:\.conf|\[)/gm;
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
