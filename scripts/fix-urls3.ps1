$redesignPath = "D:\00000.안티그래비티 아수스\10.글램\redesign"
$files = Get-ChildItem -Path $redesignPath -Recurse -Include "*.xml"
Write-Host "Found $($files.Count) XML files"
foreach ($file in $files) {
    Write-Host "Checking: $($file.Name)"
    $content = [System.IO.File]::ReadAllText($file.FullName)
    Write-Host "  Length: $($content.Length)"
    $idx = $content.IndexOf("://theglam.kr")
    Write-Host "  IndexOf ://theglam.kr = $idx"
    $idx2 = $content.IndexOf("theglam")
    Write-Host "  IndexOf theglam = $idx2"
    if ($idx2 -ge 0) {
        $snippet = $content.Substring($idx2, [Math]::Min(60, $content.Length - $idx2))
        Write-Host "  Snippet: $snippet"
    }
}
