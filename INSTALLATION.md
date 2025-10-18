# Installation Guide

## 🎙️ Hinglish Speaker Extension

This guide will help you install the Hinglish Speaker extension in Chrome, Firefox, and other Chromium-based browsers.

---

## Chrome / Edge / Brave (Chromium-based browsers)

### Step 1: Download the Extension
- Clone or download this repository to your computer
- Unzip if necessary

### Step 2: Open Extensions Page
- Open your browser and navigate to:
  - **Chrome**: `chrome://extensions/`
  - **Edge**: `edge://extensions/`
  - **Brave**: `brave://extensions/`

### Step 3: Enable Developer Mode
- Toggle the "Developer mode" switch in the top-right corner

### Step 4: Load the Extension
1. Click the "Load unpacked" button
2. Navigate to the extension directory (where `manifest.json` is located)
3. Click "Select Folder"

### Step 5: Verify Installation
- You should see the "Hinglish Speaker" extension card with the 🎙️ icon
- The extension is now active!

---

## Firefox

### Step 1: Download the Extension
- Clone or download this repository to your computer
- Unzip if necessary

### Step 2: Open Debugging Page
- Open Firefox and navigate to: `about:debugging#/runtime/this-firefox`

### Step 3: Load Temporary Add-on
1. Click "Load Temporary Add-on..."
2. Navigate to the extension directory
3. Select the `manifest.json` file
4. Click "Open"

### Step 4: Verify Installation
- The extension will appear in the list of temporary extensions
- Note: In Firefox, temporary extensions are removed when you close the browser

### For Permanent Installation in Firefox:
- You'll need to package and sign the extension through [Mozilla Add-ons](https://addons.mozilla.org/)
- Or use [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) for development

---

## Usage

Once installed, you can use the extension in three ways:

### 1. Context Menu
1. Select any text on a webpage
2. Right-click on the selected text
3. Click "🎙️ Speak Selected Text"

### 2. Floating Button
1. Select any text on a webpage
2. A small 🎙️ button will appear near your selection
3. Click the button to start speech

### 3. Keyboard Shortcut
1. Select any text on a webpage
2. Press:
   - **Windows/Linux**: `Ctrl + Shift + S`
   - **Mac**: `Cmd + Shift + S`

---

## Troubleshooting

### Extension doesn't appear
- Make sure you've enabled Developer Mode
- Verify that all extension files are present
- Check the browser console for errors

### Speech doesn't work
- Ensure your device has text-to-speech voices installed
- Check browser permissions for the extension
- Try refreshing the page

### No Hindi/Hinglish voices available
- Install language packs for Hindi (hi-IN) and English-India (en-IN) on your system
- The extension will fallback to available voices if preferred voices are not found

### Chrome/Edge:
- Go to Settings → Languages → Add Hindi
- Some voices may require Windows Language Packs or macOS Language & Region settings

### Firefox:
- Firefox uses system voices, so install Hindi language support through your OS

---

## Uninstallation

### Chrome/Edge/Brave:
1. Go to `chrome://extensions/` (or equivalent)
2. Find "Hinglish Speaker"
3. Click "Remove"

### Firefox:
1. Go to `about:debugging#/runtime/this-firefox`
2. Find "Hinglish Speaker"
3. Click "Remove"

---

## Privacy

This extension:
- ✅ Works completely offline using browser Web Speech API
- ✅ Does not collect or transmit any data
- ✅ Does not make external network requests
- ✅ Stores only your speed preferences locally

---

## System Requirements

- **Chrome**: Version 88+ (for Manifest V3)
- **Firefox**: Version 109+ (for Manifest V3)
- **Edge**: Version 88+
- **Operating System**: Windows 10+, macOS 10.15+, Linux (with speech synthesis support)

---

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Ensure all files are present in the extension directory
3. Try reloading the extension
4. Open an issue on GitHub with details about your problem
