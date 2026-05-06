@echo off
title NovaMind
echo.
echo  Starting NovaMind...
echo.

cd /d "%~dp0backend"

echo  Installing dependencies (first run only)...
call npm install --silent

echo  Launching server...
echo.
start "" "http://localhost:3001"
node server.js
