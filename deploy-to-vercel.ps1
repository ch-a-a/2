# Run this script from the project root in a local PowerShell terminal.
# Make sure Git and Node are installed and available in PATH.

$projectPath = "c:\Users\86175\Documents\Codex\2026-06-28\ai-resume-builder-next-js-15"
$repoUrl = "https://github.com/ch-a-a/Custom-resume.git"

Set-Location $projectPath

Write-Host "Initializing repository and pushing to GitHub..." -ForegroundColor Cyan
if (-not (Test-Path .git)) {
    git init
}

git remote remove origin -ErrorAction SilentlyContinue
git remote add origin $repoUrl

git add .
git commit -m "Prepare Vercel deployment" | Out-Null

git branch -M main

git push -u origin main

Write-Host "Push complete. Now log in to Vercel and import the repository." -ForegroundColor Green
Write-Host "Use the following Vercel environment variables after import: OPENAI_API_KEY, NEXT_PUBLIC_APP_URL" -ForegroundColor Yellow
Write-Host "Optional for persistent share storage: VERCEL_KV_URL and VERCEL_KV_TOKEN" -ForegroundColor Yellow
