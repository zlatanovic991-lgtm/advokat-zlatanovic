@echo off
chcp 65001 >nul
title KPO agent - ciscenje starih anomalija

echo.
echo ============================================================
echo  Ciscenje starih anomalija iz KPO knjige
echo ============================================================
echo.

echo Proveravam zavisnosti...
pip install openpyxl -q

python "%~dp0ocisti_anomalije.py"

echo.
pause
