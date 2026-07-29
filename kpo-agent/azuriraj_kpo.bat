@echo off
chcp 65001 >nul
title KPO agent - inkrementalno azuriranje

echo.
echo ============================================================
echo  KPO agent - Raiffeisen + Banca Intesa - inkrementalno azuriranje
echo ============================================================
echo.

if defined YAHOO_APP_PASS (
    set LOZINKA=%YAHOO_APP_PASS%
) else (
    set /p LOZINKA="Yahoo app lozinka: "
)

echo Proveravam zavisnosti...
pip install pdfplumber openpyxl -q

python "%~dp0kpo_agent.py" --lozinka %LOZINKA%

echo.
pause
