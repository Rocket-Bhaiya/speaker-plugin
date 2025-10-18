#!/bin/bash

# Package script for Hinglish Speaker Extension
# Creates a zip file ready for distribution or Chrome Web Store upload

VERSION="1.0.0"
OUTPUT_DIR="dist"
ZIP_NAME="hinglish-speaker-v${VERSION}.zip"

echo "🎙️ Packaging Hinglish Speaker Extension v${VERSION}"
echo "================================================"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Files to include in the package
FILES=(
    "manifest.json"
    "background.js"
    "browser-polyfill.js"
    "content.js"
    "content.css"
    "README.md"
    "icons/"
)

# Create zip file
echo "Creating zip file: $OUTPUT_DIR/$ZIP_NAME"
zip -r "$OUTPUT_DIR/$ZIP_NAME" "${FILES[@]}" -x "*.DS_Store" "*/.*"

if [ $? -eq 0 ]; then
    echo "✅ Package created successfully!"
    echo "📦 Location: $OUTPUT_DIR/$ZIP_NAME"
    echo "📊 Size: $(du -h "$OUTPUT_DIR/$ZIP_NAME" | cut -f1)"
    echo ""
    echo "You can now:"
    echo "  - Upload to Chrome Web Store"
    echo "  - Upload to Firefox Add-ons"
    echo "  - Share with users for manual installation"
else
    echo "❌ Error creating package"
    exit 1
fi
