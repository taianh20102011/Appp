@echo off
title SMART AI - Tu Dong Build App Cho Windows (.exe)
echo ========================================================
echo   SMART AI - TU DONG BIEN DICH APP WINDOWS (.EXE)
echo ========================================================
echo.
echo 1. Dang kiem tra Node.js va moi truong build...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] May tinh chua cai Node.js. Hay cai dat Node.js tai https://nodejs.org
    pause
    exit /b
)

echo 2. Dang cai dat cac thu vien Electron & Builder (neu chua co)...
call npm install --include=dev

echo.
echo 3. Dang bien dich file .exe (Installer va Portable chay ngay)...
call npm run build:win

echo.
echo ========================================================
echo   HOAN TAT! FILE .EXE DA DUOC TAO TRONG THU MUC: dist\
echo ========================================================
explorer dist
pause
