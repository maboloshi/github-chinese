@echo off
setlocal EnableDelayedExpansion

set "SCRIPT_DIR=%~dp0"
set "VENV_PYTHON=%SCRIPT_DIR%..\.venv\Scripts\python.exe"

if exist "%VENV_PYTHON%" (
    "%VENV_PYTHON%" "%SCRIPT_DIR%manage_templates.py" %*
) else (
    where py >nul 2>nul
    if not errorlevel 1 (
        py -3 "%SCRIPT_DIR%manage_templates.py" %*
    ) else (
        where python >nul 2>nul
        if not errorlevel 1 (
            python "%SCRIPT_DIR%manage_templates.py" %*
        ) else (
            for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "$culture=[System.Globalization.CultureInfo]::CurrentUICulture.Name.ToLowerInvariant(); if($culture -match '^(zh-(hk|mo|tw)|zh-hant)'){ '找不到 Python。請先安裝 Python 3，並確保 py 或 python 在 PATH 中。' } else { '未找到 Python。请先安装 Python 3，并确保 py 或 python 在 PATH 中。' }"`) do echo %%I
            exit /b 1
        )
    )
)

@echo off
setlocal EnableDelayedExpansion

set "SCRIPT_DIR=%~dp0"
set "VENV_PYTHON=%SCRIPT_DIR%..\.venv\Scripts\python.exe"

if exist "%VENV_PYTHON%" (
    "%VENV_PYTHON%" "%SCRIPT_DIR%manage_templates.py" %*
) else (
    where py >nul 2>nul
    if not errorlevel 1 (
        py -3 "%SCRIPT_DIR%manage_templates.py" %*
    ) else (
        where python >nul 2>nul
        if not errorlevel 1 (
            python "%SCRIPT_DIR%manage_templates.py" %*
        ) else (
            for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "$culture=[System.Globalization.CultureInfo]::CurrentUICulture.Name.ToLowerInvariant(); if($culture -match '^(zh-(hk|mo|tw)|zh-hant)'){ '找不到 Python。請先安裝 Python 3，並確保 py 或 python 在 PATH 中。' } else { '未找到 Python。请先安装 Python 3，并确保 py 或 python 在 PATH 中。' }"`) do echo %%I
            exit /b 1
        )
    )
)

exit /b %ERRORLEVEL%
