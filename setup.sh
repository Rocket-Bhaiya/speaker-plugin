#!/bin/bash
# Setup script for Indian Voice Speaker Extension

echo "🎙️ Indian Voice Speaker Extension - Setup"
echo "=========================================="
echo ""

# Check if icons exist
if [ -f "icons/icon128.png" ] && [ -f "icons/icon48.png" ] && [ -f "icons/icon16.png" ]; then
    echo "✅ Icons found"
else
    echo "⚠️  PNG icons not found. Generating from SVG..."
    
    # Check if ImageMagick is installed
    if ! command -v convert &> /dev/null; then
        echo "Installing ImageMagick..."
        sudo apt-get update && sudo apt-get install -y imagemagick
    fi
    
    # Convert SVG to PNG
    convert -background none icons/icon128.svg -resize 128x128 icons/icon128.png
    convert -background none icons/icon128.svg -resize 48x48 icons/icon48.png
    convert -background none icons/icon128.svg -resize 16x16 icons/icon16.png
    echo "✅ Icons generated successfully"
fi

echo ""
echo "📁 Extension Files:"
echo "-------------------"
ls -1 *.json *.js *.html *.css 2>/dev/null | while read file; do
    echo "  ✓ $file"
done

echo ""
echo "🎨 Icons:"
echo "--------"
ls -lh icons/*.png 2>/dev/null | awk '{print "  ✓ "$9" ("$5")"}'

echo ""
echo "🚀 Installation Instructions:"
echo "----------------------------"
echo ""
echo "For Chrome/Edge/Brave:"
echo "  1. Open chrome://extensions/"
echo "  2. Enable 'Developer mode' (toggle in top-right)"
echo "  3. Click 'Load unpacked'"
echo "  4. Select this folder: $(pwd)"
echo ""
echo "For Firefox:"
echo "  1. Open about:debugging#/runtime/this-firefox"
echo "  2. Click 'Load Temporary Add-on'"
echo "  3. Select manifest.json from this folder"
echo ""
echo "✨ All set! Your extension is ready to install."
