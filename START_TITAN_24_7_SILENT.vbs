' 🤖 TITAN AUTONOMOUS 24/7 SILENT BACKGROUND DAEMON LAUNCHER
' Detaches the daemons from all console and terminal windows.
' Runs completely invisibly (WindowStyle = 0).

Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c ""c:\Users\Admin\.gemini\antigravity-ide\scratch\antigravity-ide\RUN_ALL_TITAN_24_7_DAEMONS.bat""", 0, False
