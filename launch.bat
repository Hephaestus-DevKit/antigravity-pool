@echo off
title Antigravity Pool Launcher
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/launcher-terminal.ps1
pause
