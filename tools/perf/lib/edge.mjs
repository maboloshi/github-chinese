// 调试/无头 Edge 的公共启动参数：代理约定与 start-edge-debug.cmd 保持一致。
//
// EDGE_DEBUG_PROXY     代理地址，默认 http://127.0.0.1:7890
// EDGE_DEBUG_NO_PROXY  设为非空则不走代理
export function proxyArgs(env = process.env) {
    if (env.EDGE_DEBUG_NO_PROXY) return [];
    const proxy = env.EDGE_DEBUG_PROXY || 'http://127.0.0.1:7890';
    return [
        `--proxy-server=${proxy}`,
        '--proxy-bypass-list=127.0.0.1;localhost',
    ];
}
