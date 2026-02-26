$redesignPath = "D:\00000.안티그래비티 아수스\10.글램\redesign"
$count = 0
$files = Get-ChildItem -Path $redesignPath -Recurse -Include "*.html","*.xml","*.txt","*.js","*.css"
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $newContent = $content.Replace("://theglam.kr", "://www.theglam.kr")
    $newContent = $newContent.Replace("://www.www.theglam.kr", "://www.theglam.kr")
    if ($content -ne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent)
        $count++
        Write-Host "Fixed: $($file.FullName)"
    }
}
Write-Host "Total files fixed: $count"
