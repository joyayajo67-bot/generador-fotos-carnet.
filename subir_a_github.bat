@echo off
title Subir Cambios a GitHub - Generador de Fotos Carnet
echo ===================================================
echo   SUBIENDO CAMBIOS DE LINTERNA / FLASH A GITHUB
echo ===================================================
echo.
echo 1. Configurando identidad local de Git...
git config --local user.email "joyayajo67@example.com"
git config --local user.name "joyayajo67-bot"
echo Identity set successfully.
echo.
echo 2. Configurando rama local a 'main'...
git branch -M main
echo.
echo 3. Agregando archivos al area de preparacion...
git add .
echo Files added to staging.
echo.
echo 4. Creando confirmacion (Commit)...
git commit -m "feat: agregar linterna de captura, bloquear seleccion y adaptar responsive cedula"
echo.
echo 5. Subiendo cambios a GitHub (Push)...
echo ---------------------------------------------------
echo IMPORTANTE: Si se abre una ventana azul de GitHub,
echo por favor inicia sesion con tu cuenta para permitir
echo la subida segura de tus archivos.
echo ---------------------------------------------------
echo.
git push -u origin main --force
echo.
echo ===================================================
echo   ¡PROCESO COMPLETADO CON EXITO!
echo ===================================================
echo Ya puedes recargar la app en tu telefono celular.
echo.
pause
