@echo off
chcp 65001 >nul
title Dokument agent - registracija Task Scheduler zadatka

echo.
echo ============================================================
echo  Registracija automatskog sortiranja dokumenata (Task Scheduler)
echo ============================================================
echo.
echo Napomena: Ollama mora biti pokrenuta (obicno se sama pokrece uz
echo Windows) i model preuzet unapred (ollama pull qwen3.6).
echo.

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
set "SKRIPTA=%~dp0dokument_agent.py"
set "TASKNAME=Dokument Organizator"

echo Python:  %PYTHON_PATH%
echo Pythonw: %PYTHONW_PATH%
echo Skripta: %SKRIPTA%
echo.

schtasks /create /tn "%TASKNAME%" /tr "\"%PYTHONW_PATH%\" \"%SKRIPTA%\"" /sc minute /mo 10 /rl limited /f

if %errorlevel%==0 (
    echo.
    echo Zadatak "%TASKNAME%" je uspesno registrovan.
    echo Pokrece se na svakih 10 minuta, bez otvaranja konzole.
    echo Log: %~dp0dokument_log.txt
) else (
    echo.
    echo [GRESKA] Registracija zadatka nije uspela. Pokusaj da pokrenes
    echo ovaj .bat fajl kao administrator ako se problem ponovi.
)

echo.
pause
