@echo off
title LinkableAI 24/7 Autonomous Master Daemon Launcher
cd /d "c:\Users\Admin\.gemini\antigravity-ide\scratch\antigravity-ide\hospital_leads_database"

echo ========================================================
echo 🤖 STARTING LINKABLEAI 24/7 AUTONOMOUS CRM DAEMONS
echo ========================================================

start /b "" node masterOrchestratorDaemon.js
cd /d "c:\Users\Admin\.gemini\antigravity-ide\scratch\antigravity-ide\omnistock_leads_database"
start /b "" node omnistockMasterDaemon.js

echo.
echo ✅ Both Master Orchestrator and OmniStock Daemons are running in the background!
echo 📬 Executive reports & website telemetry will be delivered directly to: mckinsyo01@gmail.com
echo 🚀 SpaceMail (mharcgatan@linkable.it.com) is active for cold dispatches and prospect replies.
