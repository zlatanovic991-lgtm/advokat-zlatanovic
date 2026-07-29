@echo off
chcp 65001 >nul
title KPO agent - registracija Task Scheduler zadatka

echo.
echo ============================================================
echo  Registracija automatskog azuriranja KPO (Task Scheduler)
echo ============================================================
echo.

if not defined YAHOO_APP_PASS (
    echo [UPOZORENJE] YAHOO_APP_PASS nije podesena kao trajna USER environment
    echo promenljiva. Zadatak ce se registrovati, ali nece raditi dok je ne podesis:
    echo.
    echo     setx YAHOO_APP_PASS "tvoja_app_lozinka"
    echo.
    echo Posle setx komande, ODJAVI SE I PONOVO PRIJAVI (ili restartuj racunar)
    echo da bi Task Scheduler video novu promenljivu.
    echo.
    pause
)

for /f "delims=" %%P in ('where python 2^>nul') do (
    if not defined PYTHON_PATH set "PYTHON_PATH=%%P"
)

if not defined PYTHON_PATH (
    echo [GRESKA] Python nije pronadjen u PATH-u.
    echo Instaliraj Python sa python.org i pokusaj ponovo.
    pause
    exit /b 1
)

set "PYTHONW_PATH=%PYTHON_PATH:python.exe=pythonw.exe%"
if not exist "%PYTHONW_PATH%" set "PYTHONW_PATH=%PYTHON_PATH%"
set "SKRIPTA=%~dp0kpo_agent.py"
set "TASKNAME=KPO Azuriranje"

echo Python:  %PYTHON_PATH%
echo Pythonw: %PYTHONW_PATH%
echo Skripta: %SKRIPTA%
echo.

schtasks /create /tn "%TASKNAME%" /tr "\"%PYTHONW_PATH%\" \"%SKRIPTA%\"" /sc daily /st 10:00 /rl limited /f

if %errorlevel%==0 (
    echo.
    echo Zadatak "%TASKNAME%" je uspesno registrovan.
    echo Pokrece se svakog dana u 10:00, bez otvaranja konzole.
    echo Log: %~dp0kpo_log.txt
) else (
    echo.
    echo [GRESKA] Registracija zadatka nije uspela. Pokusaj da pokrenes
    echo ovaj .bat fajl kao administrator ako se problem ponovi.
)

echo.
pause
