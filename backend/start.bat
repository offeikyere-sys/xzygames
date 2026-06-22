@echo off
title XZY Games - Backend Server
echo.
echo  ====================================
echo     XZY GAMES - Backend Server
echo  ====================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  [!!] Python is not installed!
    echo  Download from https://www.python.org/downloads/
    echo.
    pause
    exit /b
)

:: Navigate to backend folder
cd /d "%~dp0"

:: Install dependencies if needed
if not exist "venv" (
    echo  [..] First time setup - creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate
    echo  [..] Installing dependencies...
    pip install fastapi uvicorn pydantic -q
    echo  [OK] Dependencies installed!
) else (
    call venv\Scripts\activate
)

echo  [..] Starting XZY Games API server on port 5050...
echo.
echo  API: http://localhost:5050
echo  Docs: http://localhost:5050/docs
echo.
python -m uvicorn main:app --host 0.0.0.0 --port 5050 --reload