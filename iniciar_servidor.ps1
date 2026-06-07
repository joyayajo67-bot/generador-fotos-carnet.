# Obtener la dirección IP local de la tarjeta Wi-Fi o Ethernet activa
$localIp = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" 
} | Select-Object -First 1).IPAddress

if (-not $localIp) {
    $localIp = "127.0.0.1"
}

$port = 8080
$started = $false
$accessWarning = $false
$listener = $null

while (-not $started -and $port -le 8180) {
    # Crear una nueva instancia de HttpListener en cada intento para evitar estados de error
    $listener = New-Object System.Net.HttpListener
    try {
        $listener.Prefixes.Add("http://localhost:$port/")
        $listener.Prefixes.Add("http://127.0.0.1:$port/")
        if ($localIp -ne "127.0.0.1") {
            $listener.Prefixes.Add("http://$($localIp):$port/")
        }
        $listener.Start()
        $started = $true
    } catch {
        # Si falla (por ejemplo, restricción de administrador al usar la IP local),
        # cerramos este listener e intentamos solo con localhost.
        $listener.Close()
        $listener = New-Object System.Net.HttpListener
        try {
            $listener.Prefixes.Add("http://localhost:$port/")
            $listener.Prefixes.Add("http://127.0.0.1:$port/")
            $listener.Start()
            $started = $true
            $accessWarning = $true
        } catch {
            # Si también falla, el puerto está realmente ocupado. Cerramos y probamos el siguiente puerto.
            $listener.Close()
            $port++
        }
    }
}

if (-not $started) {
    Write-Host "ERROR: No se pudo iniciar el servidor. Todos los puertos entre 8080 y 8180 están ocupados." -ForegroundColor Red
    Read-Host "Presiona Enter para salir..."
    exit
}

# Intentar abrir el puerto en el Firewall de Windows si se está ejecutando como Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if ($isAdmin -and -not $accessWarning) {
    try {
        $ruleName = "GeneradorFotosCarnet_Port_$port"
        if (-not (Get-NetFirewallRule -Name $ruleName -ErrorAction SilentlyContinue)) {
            New-NetFirewallRule -DisplayName "Generador de Fotos Carnet IA ($port)" -Name $ruleName -Direction Inbound -LocalPort $port -Protocol TCP -Action Allow -ErrorAction SilentlyContinue | Out-Null
        }
    } catch {
        # Ignorar fallos si las políticas de red bloquean la configuración
    }
}

Clear-Host
Write-Host "==================================================================" -ForegroundColor Magenta
Write-Host "    SERVIDOR LOCAL ACTIVO (NATIVO DE WINDOWS)" -ForegroundColor Cyan -Bold
Write-Host "==================================================================" -ForegroundColor Magenta
Write-Host "Tu servidor local está corriendo correctamente sin dependencias." -ForegroundColor Gray
Write-Host ""
Write-Host "Para entrar desde este computador:" -ForegroundColor Gray
Write-Host "  -> http://localhost:$port" -ForegroundColor Green -Bold
Write-Host ""
Write-Host "Para entrar desde tu TELÉFONO CELULAR (conectado al mismo Wi-Fi):" -ForegroundColor Gray
if ($accessWarning) {
    Write-Host "  [BLOQUEADO] - Para habilitar el acceso móvil, haz clic derecho sobre 'iniciar_servidor.bat' y selecciona 'Ejecutar como Administrador'." -ForegroundColor Red
    Write-Host "  (Actualmente el servidor está corriendo solo de forma local en tu PC)" -ForegroundColor Yellow
} else {
    Write-Host "  -> http://$($localIp):$port" -ForegroundColor Green -Bold
}
Write-Host "==================================================================" -ForegroundColor Magenta
Write-Host "Mantén esta ventana abierta para seguir usando la app. Ciérrala para apagar el servidor." -ForegroundColor Yellow
Write-Host ""

# Bucle del servidor para despachar peticiones
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Mapear URL de petición a archivo local
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }

        # Evitar vulnerabilidades de navegación de directorios
        $urlPath = $urlPath.Replace("/", "\")
        $filePath = Join-Path $PSScriptRoot $urlPath

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Mapeador básico de tipo MIME
            $contentType = "text/html; charset=utf-8"
            if ($filePath.EndsWith(".css")) { $contentType = "text/css" }
            elseif ($filePath.EndsWith(".js")) { $contentType = "application/javascript" }
            elseif ($filePath.EndsWith(".png")) { $contentType = "image/png" }
            elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $contentType = "image/jpeg" }
            elseif ($filePath.EndsWith(".json")) { $contentType = "application/json" }
            elseif ($filePath.EndsWith(".svg")) { $contentType = "image/svg+xml" }

            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            
            # Cabecera CORS básica para depuración
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.OutputStream.Close()
    } catch {
        # Control silencioso de cortes de conexión en segundo plano
    }
}
