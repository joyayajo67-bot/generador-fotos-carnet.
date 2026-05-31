@echo off
title Servidor Local de Fotos Carnet IA
echo Iniciando servidor nativo de Windows...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0iniciar_servidor.ps1"
pause
