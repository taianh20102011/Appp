@echo off
title SMART AI - Khoi Dong May Chu Web Cuc Bo
echo ========================================================
echo   SMART AI - KHOI DONG LOCAL WEB SERVER (PORT 8080)
echo ========================================================
echo.
echo Dang thu khoi dong server bang Node.js hoac Python...
echo Dia chi: http://localhost:8080
echo.

where node >nul 2>&1
if %errorlevel% equ 0 (
    echo Phat hien Node.js, dang khoi dong web server...
    start "" "http://localhost:8080"
    npx -y serve -p 8080 .
    goto end
)

where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Phat hien Python, dang khoi dong web server...
    start "" "http://localhost:8080"
    python -m http.server 8080
    goto end
)

echo Khong tim thay Node/Python, dang mo truc tiep index.html...
start "" "index.html"

:end
pause
