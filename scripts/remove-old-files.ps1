# Run from the project root (PowerShell) AFTER copying the new files in.
# Removes the single-language files that the [locale] versions replace. Review the list first.
$old = @(
  'src/app/layout.tsx', 'src/app/page.tsx',
  'src/app/about', 'src/app/contact', 'src/app/products',
  'src/content/home.ts', 'src/content/about.ts', 'src/content/contact.ts',
  'src/content/products.ts', 'src/content/product-details.ts'
)
$old | ForEach-Object { if (Test-Path -LiteralPath $_) { Write-Host "removing $_"; Remove-Item -LiteralPath $_ -Recurse -Force -Confirm } }
Write-Host "`nStill importing the old content files? Search for them:"
Write-Host "Select-String -Path src -Recurse -Pattern \"@/content/(home|about|contact|products|product-details)'\""
