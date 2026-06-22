$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
cd "$PSScriptRoot\.."

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "   Antigravity Pool Windows Launcher   " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host

try {
    & "$PSScriptRoot\open-antigravity-pool.ps1"
    Write-Host
    Write-Host "✓ Antigravity Pool has started successfully!" -ForegroundColor Green
    Write-Host "Dashboard: http://localhost:18080" -ForegroundColor Green
} catch {
    Write-Host
    Write-Host "❌ Error starting Antigravity Pool: $_" -ForegroundColor Red
}

Write-Host
Write-Host "Press ENTER to exit this window..."
Read-Host
