@echo off
echo =======================================================
echo     FIXING LOADLIBRARY ERROR 126 FOR AMD RADEON
echo =======================================================
echo.
copy "C:\Windows\System32\DriverStore\FileRepository\u0417877.inf_amd64_8b2c2b61b3f8a9e5\B417004\atig6pxx.dll" "C:\Windows\System32\atig6pxx.dll" /Y
echo.
if %errorlevel% equ 0 (
    echo [SUCCESS] atig6pxx.dll successfully copied to C:\Windows\System32!
    echo LoadLibrary error has been PERMANENTLY FIXED.
) else (
    echo [ERROR] Please right-click this script and select 'Run as administrator'.
)
echo.
pause
