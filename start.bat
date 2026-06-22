@echo off
title XZY Games - Full Stack
echo.
echo  ====================================
echo     XZY GAMES - Full Stack Launcher
echo  ====================================
echo.

:: Set local database path (outside git repo to prevent data loss)
set LOCAL_DB_PATH=d:\PROJECTS WEBSITES AND SOFTWARES\SOFTWARES\xzy-local-data\xzy.db

:: Start Backend (Python API)
echo  [..] Starting Backend API on port 5050...
cd /d "%~dp0backend"
start "XZY Backend" cmd /c "set LOCAL_DB_PATH=%LOCAL_DB_PATH% && python -m uvicorn main:app --host 0.0.0.0 --port 5050 --app-dir "%~dp0backend""

:: Start Frontend (Vite)
echo  [..] Starting Frontend on port 5173...
cd /d "%~dp0"
start "XZY Frontend" npm run dev

:: Wait a bit then open browser
ping -n 6 127.0.0.1 >nul
echo  [OK] Both servers starting! Opening browser...
start http://localhost:5173

echo.
echo  ====================================
echo   Backend:  http://localhost:5050
echo   Frontend: http://localhost:5173
echo   API Docs: http://localhost:5050/docs
echo  ====================================
echo.
echo  Press any key to stop all servers...
pause

:: Kill both servers
taskkill /F /FI "WINDOWTITLE eq XZY Backend*" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq XZY Frontend*" >nul 2>&1
echo  All servers stopped.
