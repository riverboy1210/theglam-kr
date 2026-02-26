$redesignPath = "D:\00000.안티그래비티 아수스\10.글램\redesign"
$count = 0
$files = Get-ChildItem -Path $redesignPath -Recurse -Include "*.html","*.xml","*.txt","*.js","*.css"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content -match "://theglam\.kr") {
        $newContent = $content -replace "://theglam\.kr", "://www.theglam.kr"
        # Prevent double www
        $newContent = $newContent -replace "://www\.www\.theglam\.kr", "://www.theglam.kr"
        if ($content -ne $newContent) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent)
            $count++
            Write-Host "Fixed: $($file.Name)"
        }
    }
}
Write-Host "`nTotal files fixed: $count"
