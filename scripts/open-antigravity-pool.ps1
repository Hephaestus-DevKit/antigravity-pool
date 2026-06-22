# PowerShell script to open/start Antigravity Pool and open dashboard
$ErrorActionPreference = "Stop"

$ProjectDir = Resolve-Path "$PSScriptRoot\.."
$Port = $env:PORT
if (-not $Port) {
    $Port = "18080"
}
$Url = "http://localhost:$Port"
$HealthUrl = "$Url/api/v1/models"

function Is-Running {
    try {
        $response = Invoke-RestMethod -Uri $HealthUrl -Method Get -TimeoutSec 2
        if ($response -and $response.data -and ($response.data | Where-Object { $_.owned_by -eq "google-companion-pool" })) {
            return $true
        }
    } catch {
        # Silent fail
    }
    return $false
}

Write-Host "🔍 Checking if Antigravity Pool is already running on port $Port..." -ForegroundColor Cyan

if (-not (Is-Running)) {
    Write-Host "🚀 Antigravity Pool is not running. Starting local Next.js server..." -ForegroundColor Yellow
    
    # Check if Next build output exists, if not build it
    $buildIdPath = Join-Path $ProjectDir ".next\BUILD_ID"
    if (-not (Test-Path $buildIdPath)) {
        Write-Host "📦 Next.js build output not found. Running build first..." -ForegroundColor Gray
        Start-Process -FilePath "npm" -ArgumentList "run build" -WorkingDirectory $ProjectDir -NoNewWindow -Wait
    }
    
    # Launch NPM dev/start server in a background job or separate terminal process
    # We will start "npm run dev" to keep it running
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c title Antigravity Pool Server & npm run dev" -WorkingDirectory $ProjectDir -WindowStyle Normal
    
    # Wait for up to 30 seconds for the health check to succeed
    Write-Host "⏳ Waiting for server to become healthy..." -ForegroundColor Gray
    $healthy = $false
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 1
        if (Is-Running) {
            $healthy = $true
            break
        }
    }
    
    if (-not $healthy) {
        Write-Error "❌ Antigravity Pool failed to start within 30 seconds. Please run 'npm run dev' manually to inspect errors."
    }
}

Write-Host "🌍 Opening browser dashboard at $Url..." -ForegroundColor Green
Start-Process $Url
