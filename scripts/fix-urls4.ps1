[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$redesignPath = Get-Item -LiteralPath "D:\00000.*\10.*\redesign" -ErrorAction SilentlyContinue
if (-not $redesignPath) {
    $redesignPath = Get-Item -LiteralPath (Join-Path $PSScriptRoot "..\redesign")
}
Write-Host "Path: $($redesignPath.FullName)"
$files = Get-ChildItem -LiteralPath $redesignPath.FullName -Recurse -File | Where-Object { $_.Extension -in ".html",".xml",".txt",".js",".css" }
Write-Host "Found $($files.Count) files"
$count = 0
foreach ($file in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    $newContent = $content.Replace("://theglam.kr", "://www.theglam.kr").Replace("://www.www.theglam.kr", "://www.theglam.kr")
    if ($content -ne $newContent) {
        $newBytes = [System.Text.Encoding]::UTF8.GetBytes($newContent)
        [System.IO.File]::WriteAllBytes($file.FullName, $newBytes)
        $count++
        Write-Host "Fixed: $($file.Name)"
    }
}
Write-Host "Total fixed: $count"
