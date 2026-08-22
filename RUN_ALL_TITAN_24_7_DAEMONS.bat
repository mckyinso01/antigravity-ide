@echo off
title Titan Autonomous 24/7 Master Daemons Supervisor
echo ====================================================================
echo 🤖 TITAN AUTONOMOUS 24/7 MASTER DAEMONS & PERSISTENT SUPERVISOR
echo ====================================================================

:: 1. Launch Hourly Executive Report & Inbound AI Closer Daemon
cd /d "c:\Users\Admin\.gemini\antigravity-ide\scratch\antigravity-ide\hospital_leads_database"
start /b "" node hourlyMasterDaemon.js

:: 2. Launch LeadSuite Pro AI 24/7 Continuous Dispatch Daemon
cd /d "c:\Users\Admin\.gemini\antigravity-ide\scratch\antigravity-ide\autonomous_operations"
start /b "" node leadsuite_24_7_continuous_dispatch_daemon.js

echo.
echo ✅ [TITAN 24/7 DAEMONS RUNNING IN DETACHED BACKGROUND]
echo • Hourly Executive Reports -> mckinsyo01@gmail.com
echo • LeadSuite Pro AI Dispatcher -> Real Persistent Ledger
echo • Inbound AI Closer -> SpaceMail (mharcgatan@linkable.it.com)
echo.
