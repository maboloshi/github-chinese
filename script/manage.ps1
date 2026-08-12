# manage_templates.py 的 UTF-8 包装：修复 Windows 管道下输出乱码
# 用法：
#   PowerShell: .\script\manage.ps1 [--check | --requirements | ...]
#   CMD: .\script\manage.cmd [--check | --requirements | ...]
#   若 PowerShell 执行策略阻止脚本运行，可在当前会话中临时使用：
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned

# 把 PowerShell 会话文化传给 Python（供 manage_templates.py 简繁提示本地化）
if (-not $env:LANG) { $env:LANG = $PSCulture }

# 让 PowerShell 以 UTF-8 解码 Python 子进程输出（zh-CN Windows 默认 GBK，会乱码/报错）
$env:PYTHONUTF8 = "1"
$env:PYTHONIOENCODING = "utf-8"
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$InputEncoding = [System.Text.Encoding]::UTF8

# 候选 Python 解析器：优先仓库 venv，其次 py、python
$python = @(
    @{ Command = (Join-Path $PSScriptRoot "..\.venv\Scripts\python.exe"); Args = @() },
    @{ Command = "py"; Args = @("-3") },
    @{ Command = "python"; Args = @() }
) | Where-Object { Get-Command $_.Command -ErrorAction SilentlyContinue } | Select-Object -First 1

if (-not $python) {
    $message = if ([System.Globalization.CultureInfo]::CurrentUICulture.Name.ToLowerInvariant() -match '^(zh-(hk|mo|tw)|zh-hant)') {
        '找不到 Python。請先安裝 Python 3，並確保 py 或 python 在 PATH 中。'
    }
    else {
        '未找到 Python。请先安装 Python 3，并确保 py 或 python 在 PATH 中。'
    }
    Write-Error $message
    exit 1
}

$scriptArgs = $python.Args + @(Join-Path $PSScriptRoot "manage_templates.py") + @($args)
& $python.Command @scriptArgs
exit $LASTEXITCODE
