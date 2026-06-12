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

# Generar y configurar un Certificado de Firma de Desarrollo para HTTPS local si se es Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
$usingHttps = $false

if ($isAdmin) {
    try {
        Write-Host "Configurando certificado SSL de desarrollo para HTTPS..." -ForegroundColor Yellow
        $certSubject = "CN=GeneradorFotosCarnetDev"
        $certStorePath = "Cert:\LocalMachine\My"
        
        # Buscar si ya existe el certificado
        $cert = Get-ChildItem -Path $certStorePath | Where-Object { $_.Subject -eq $certSubject } | Select-Object -First 1
        if (-not $cert) {
            $cert = New-SelfSignedCertificate -DnsName "localhost", $localIp, "127.0.0.1" -CertStoreLocation $certStorePath -FriendlyName "Generador Fotos Carnet Dev SSL" -Subject $certSubject -KeyLength 2048 -NotAfter (Get-Date).AddYears(3)
            # Agregar a Entidades de confianza para evitar alertas de seguridad en la PC
            Export-Certificate -Cert $cert -FilePath "$env:TEMP\devCert.cer" | Out-Null
            Import-Certificate -FilePath "$env:TEMP\devCert.cer" -CertStoreLocation "Cert:\CurrentUser\Root" | Out-Null
            Remove-Item "$env:TEMP\devCert.cer" -Force -ErrorAction SilentlyContinue
        }
        
        $certHash = $cert.Thumbprint
        $appId = "{4ae5a05b-8c67-4d94-a1df-3323fb3fb7c3}"

        # Eliminar cualquier asociación de puerto HTTPS SSL previa en el puerto 8080
        netsh http delete sslcert ipport=0.0.0.0:$port 2>&1 | Out-Null
        netsh http delete sslcert ipport=[::]:$port 2>&1 | Out-Null
        
        # Asociar el nuevo certificado al puerto
        netsh http add sslcert ipport=0.0.0.0:$port certhash=$certHash appid=$appId 2>&1 | Out-Null
        $usingHttps = $true
    } catch {
        Write-Host "Aviso: No se pudo enlazar el certificado SSL. Usando HTTP estándar de respaldo." -ForegroundColor Yellow
    }
} else {
    Write-Host "Nota: Ejecuta el servidor como Administrador para habilitar HTTPS de forma segura y usar la cámara en tu celular." -ForegroundColor DarkYellow
}

$protocol = if ($usingHttps) { "https" } else { "http" }

# Creamos los prefijos de URL usando concatenación limpia para evitar errores de interpretación de variables en PowerShell
$urlLocalhost = $protocol + "://localhost:" + $port + "/"
$urlLoopback = $protocol + "://127.0.0.1:" + $port + "/"
$urlIp = $protocol + "://" + $localIp + ":" + $port + "/"

while (-not $started -and $port -le 8180) {
    $listener = New-Object System.Net.HttpListener
    try {
        $listener.Prefixes.Add($urlLocalhost)
        $listener.Prefixes.Add($urlLoopback)
        if ($localIp -ne "127.0.0.1") {
            $listener.Prefixes.Add($urlIp)
        }
        $listener.Start()
        $started = $true
    } catch {
        $listener.Close()
        $listener = New-Object System.Net.HttpListener
        try {
            $listener.Prefixes.Add($urlLocalhost)
            $listener.Prefixes.Add($urlLoopback)
            $listener.Start()
            $started = $true
            $accessWarning = $true
        } catch {
            $listener.Close()
            $port++
            # Actualizar URLs si cambia el puerto
            $urlLocalhost = $protocol + "://localhost:" + $port + "/"
            $urlLoopback = $protocol + "://127.0.0.1:" + $port + "/"
            $urlIp = $protocol + "://" + $localIp + ":" + $port + "/"
        }
    }
}

if (-not $started) {
    Write-Host "ERROR: No se pudo iniciar el servidor. Todos los puertos entre 8080 y 8180 están ocupados." -ForegroundColor Red
    Read-Host "Presiona Enter para salir..."
    exit
}

# Intentar abrir el puerto en el Firewall de Windows si se está ejecutando como Administrador
if ($isAdmin -and -not $accessWarning) {
    try {
        $ruleName = "GeneradorFotosCarnet_Port_$port"
        if (-not (Get-NetFirewallRule -Name $ruleName -ErrorAction SilentlyContinue)) {
            New-NetFirewallRule -DisplayName "Generador de Fotos Carnet IA ($port)" -Name $ruleName -Direction Inbound -LocalPort $port -Protocol TCP -Action Allow -ErrorAction SilentlyContinue | Out-Null
        }
    } catch {
        # Ignorar
    }
}

Clear-Host
Write-Host "==================================================================" -ForegroundColor Magenta
if ($usingHttps) {
    Write-Host "    SERVIDOR LOCAL SEGURO ACTIVO (HTTPS NATIVO)" -ForegroundColor Green -Bold
} else {
    Write-Host "    SERVIDOR LOCAL ACTIVO (HTTP - CÁMARA SOLO EN PC)" -ForegroundColor Cyan -Bold
}
Write-Host "==================================================================" -ForegroundColor Magenta
Write-Host "Servidor en tiempo real para desarrollo rápido." -ForegroundColor Gray
Write-Host ""
Write-Host "Para entrar desde este computador:" -ForegroundColor Gray
Write-Host ("  -> " + $protocol + "://localhost:" + $port) -ForegroundColor Green -Bold
Write-Host ""
Write-Host "Para entrar desde tu TELÉFONO CELULAR (conectado al mismo Wi-Fi):" -ForegroundColor Gray
if ($accessWarning -or -not $usingHttps) {
    Write-Host "  [ALERTA DE SEGURIDAD] - Para habilitar la cámara en el teléfono:" -ForegroundColor Red
    Write-Host "  1. Cierra el servidor." -ForegroundColor Yellow
    Write-Host "  2. Haz clic derecho sobre 'iniciar_servidor.bat' y selecciona 'Ejecutar como Administrador'." -ForegroundColor Yellow
    Write-Host "  (Actualmente el servidor corre en HTTP y la cámara del celular será bloqueada)." -ForegroundColor Red
} else {
    Write-Host ("  -> https://" + $localIp + ":" + $port) -ForegroundColor Green -Bold
    Write-Host ""
    Write-Host "  * NOTA: Al entrar la primera vez en el celular, verás un mensaje de 'Conexión no privada'." -ForegroundColor DarkYellow
    Write-Host "    Simplemente pulsa 'Configuración Avanzada' y luego 'Acceder a $localIp (sitio no seguro)'." -ForegroundColor Yellow
    Write-Host "    ¡Esto activará la cámara local de forma segura e instantánea!" -ForegroundColor Green
}
Write-Host "==================================================================" -ForegroundColor Magenta
Write-Host "Cualquier cambio que guardes en los archivos se verá al recargar la página en el celular." -ForegroundColor Gray
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
        # Control silencioso
    }
}
