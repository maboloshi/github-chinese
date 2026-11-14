@echo off
chcp 65001 >nul
rem GitHub 汉化插件 - 基准台专用 Edge
rem
rem 为什么需要专用 profile：Chromium 136+ 拒绝对「默认用户数据目录」开放远程调试端口，
rem 必须显式给一个非默认 --user-data-dir。
rem
rem 为什么必须禁组件扩展：--disable-extensions 挡不住 Edge 自带的 6 个组件扩展，
rem 还要加 --disable-component-extensions-with-background-pages 才能让扩展 target 归零。
rem 装了 Tampermonkey 的 profile 会与基准台注入的仓库脚本打架，所以这个 profile 里
rem 不要装扩展；也不要在这里登录 Edge 账号（会同步扩展进来），只登录 GitHub 网页即可。
rem
rem 可用环境变量覆盖：EDGE_BIN / EDGE_DEBUG_PORT / EDGE_DEBUG_PROFILE / EDGE_DEBUG_PROXY

setlocal

if not defined EDGE_BIN set "EDGE_BIN=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not defined EDGE_DEBUG_PORT set "EDGE_DEBUG_PORT=9222"
if not defined EDGE_DEBUG_PROFILE set "EDGE_DEBUG_PROFILE=%LOCALAPPDATA%\github-chinese-edge-debug\profile"
if not defined EDGE_DEBUG_PROXY set "EDGE_DEBUG_PROXY=http://127.0.0.1:7890"
if not defined EDGE_DEBUG_URL set "EDGE_DEBUG_URL=https://github.com/maboloshi/github-chinese"

rem 需要后台跑基准时设 EDGE_DEBUG_MINIMIZED=1，窗口启动即最小化
set "MIN_ARG="
if defined EDGE_DEBUG_MINIMIZED set "MIN_ARG=/min"

if not exist "%EDGE_BIN%" (
  echo [错误] 找不到 Edge: "%EDGE_BIN%"
  echo         请设置 EDGE_BIN 指向 msedge.exe
  pause
  exit /b 1
)

rem 代理只在确实需要时启用；设了 EDGE_DEBUG_NO_PROXY 就不加 --proxy-server
set "PROXY_ARG=--proxy-server=%EDGE_DEBUG_PROXY%"
if defined EDGE_DEBUG_NO_PROXY set "PROXY_ARG="

echo 启动调试 Edge
echo   profile : %EDGE_DEBUG_PROFILE%
echo   port    : %EDGE_DEBUG_PORT%
echo   代理    : %PROXY_ARG%

start "" %MIN_ARG% "%EDGE_BIN%" ^
  --user-data-dir="%EDGE_DEBUG_PROFILE%" ^
  --remote-debugging-port=%EDGE_DEBUG_PORT% ^
  %PROXY_ARG% ^
  --disable-extensions ^
  --disable-component-extensions-with-background-pages ^
  --disable-default-apps ^
  --disable-sync ^
  --no-first-run ^
  --no-default-browser-check ^
  --window-size=1440,900 ^
  "%EDGE_DEBUG_URL%"

endlocal
