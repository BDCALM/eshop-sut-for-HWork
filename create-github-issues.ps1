[CmdletBinding()]
param(
    [string]$Repo,
    [switch]$DryRun,
    [switch]$IncludeExisting
)

$ErrorActionPreference = 'Stop'

$reportPath = Join-Path $PSScriptRoot 'bug-report.md'
if (-not (Test-Path $reportPath)) {
    throw "Bug report was not found: $reportPath"
}

if (-not $Repo) {
    $remote = git -C (Split-Path $PSScriptRoot -Parent | Split-Path -Parent | Split-Path -Parent) remote get-url origin 2>$null
    if ($LASTEXITCODE -eq 0 -and $remote) {
        if ($remote -match 'github\.com[:/]([^/]+/[^/.]+)(?:\.git)?$') {
            $Repo = $Matches[1]
        }
    }
}

$repoArgs = @()
if ($Repo) {
    $repoArgs = @('--repo', $Repo)
}

$lines = Get-Content -LiteralPath $reportPath -Encoding UTF8
$issues = @()
$current = $null

foreach ($line in $lines) {
    if ($line -match '^###\s+((?:BUG|UX)-[^:]+):\s*(.+)$') {
        if ($current) {
            $issues += [pscustomobject]$current
        }
        $current = [ordered]@{
            Id = $Matches[1].Trim()
            Title = $Matches[2].Trim()
            Body = New-Object System.Collections.Generic.List[string]
        }
        [void]$current.Body.Add($line)
        continue
    }

    if ($current) {
        if ($line -match '^##\s') {
            $issues += [pscustomobject]$current
            $current = $null
            continue
        }
        [void]$current.Body.Add($line)
    }
}

if ($current) {
    $issues += [pscustomobject]$current
}

if (-not $issues.Count) {
    throw "No BUG-* or UX-* sections were found in $reportPath"
}

if (-not $DryRun -and -not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw "GitHub CLI 'gh' was not found. Install it from https://cli.github.com/ and run 'gh auth login'."
}

Write-Host "Found $($issues.Count) issue sections in $reportPath"

foreach ($issue in $issues) {
    $title = "$($issue.Id): $($issue.Title)"
    $body = ($issue.Body -join [Environment]::NewLine).Trim()

    if ($DryRun) {
        Write-Host "`n--- DRY RUN ---" -ForegroundColor Yellow
        Write-Host "Title: $title"
        Write-Host $body
        continue
    }

    if (-not $IncludeExisting) {
        $existing = gh issue list @repoArgs --state all --search "in:title $($issue.Id)" --json title --limit 20 | ConvertFrom-Json
        if ($existing | Where-Object { $_.title -like "$($issue.Id):*" }) {
            Write-Host "Skipping existing issue: $title" -ForegroundColor DarkYellow
            continue
        }
    }

    $tempPath = [System.IO.Path]::GetTempFileName()
    try {
        Set-Content -LiteralPath $tempPath -Value $body -Encoding utf8
        $issueUrl = gh issue create @repoArgs --title $title --body-file $tempPath
        if ($LASTEXITCODE -ne 0) {
            throw "gh issue create failed for $title"
        }
        Write-Host "Created: $title -> $issueUrl" -ForegroundColor Green
    }
    finally {
        Remove-Item -LiteralPath $tempPath -Force -ErrorAction SilentlyContinue
    }
}
