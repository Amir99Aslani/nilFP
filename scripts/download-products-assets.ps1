# Run from the project root (PowerShell). The Figma links expire after 7 days.
New-Item -ItemType Directory -Force -Path public/images/products | Out-Null
curl.exe -L -o public/images/products/hero.png        "https://www.figma.com/api/mcp/asset/e7c3196c-bcef-41d4-8fd7-042fc8469240.png"
curl.exe -L -o public/images/products/hero-mobile.png "https://www.figma.com/api/mcp/asset/b23c1a39-ea8a-43f2-9260-55f74e427cee.png"
curl.exe -L -o public/images/products/boxes.png       "https://www.figma.com/api/mcp/asset/baa024f0-93c4-4707-a414-add526a0f8e4.png"
Get-ChildItem public/images/products | Select-Object Name, Length
