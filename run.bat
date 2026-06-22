@echo off
title XZY Games - Starting...
echo.
echo  ====================================
echo     XZY GAMES - Quick Launch
echo  ====================================
echo.

:: Check if the dev server is already running on port 5173
netstat -an | findstr ":5173" | findstr "LISTENING" >nul 2>&1

if %errorlevel% == 0 (
    echo  [OK] Dev server is already running!
    echo  Opening browser at http://localhost:5173 ...
    echo.
    start http://localhost:5173
    timeout /t 2 >nul
    exit /b
)

echo  [..] Dev server is NOT running. Starting it now...
echo  This will open your browser automatically.
echo.

cd /d "%~dp0"
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo  [!!] Something went wrong. Make sure Node.js is installed.
    echo.
    pause
)