@echo off
title SMART AI - Tu Dong Build App Cho Android (Capacitor / APK)
echo ========================================================
echo   SMART AI - TU DONG CHUAN BI DU AN ANDROID (.APK)
echo ========================================================
echo.
echo 1. Dang cai dat cac goi Capacitor Android...
call npm install --include=dev

echo.
echo 2. Dang dong bo ma nguon Web vao du an Android...
call npx @capacitor/cli add android
call npx @capacitor/cli copy android

echo.
echo 3. Mo du an Android trong Android Studio (de xuat APK)...
call npx @capacitor/cli open android

echo.
echo ========================================================
echo   Luu y: Tren GitHub Actions, file .APK da duoc build tu dong 100%!
echo   Ban co the len tab Releases tren GitHub de tai file .apk ve may.
echo ========================================================
pause
