# 🎙️ Hinglish Speaker - Text-to-Speech Extension

A cross-browser Chrome and Firefox extension (Manifest V3) that reads selected text in Indian Hinglish using the Web Speech API.

## Features

- 🗣️ **Text-to-Speech**: Read selected text using Web Speech API with Hindi-Indian (hi-IN) or English-Indian (en-IN) voices
- 📱 **Multiple Triggers**:
  - Context menu: Right-click on selected text → "🎙️ Speak Selected Text"
  - Floating button: Appears near selected text for quick access
  - Keyboard shortcut: `Ctrl+Shift+S` (Windows/Linux) or `Cmd+Shift+S` (Mac)
- 🎚️ **Playback Controls**: Minimal floating player with:
  - Play/Pause/Stop buttons
  - Speed control slider (0.5x - 2.0x)
  - Draggable interface
- 💾 **Settings Persistence**: Preferences stored in `chrome.storage.sync`
- 🔄 **Auto-stop**: Automatically stops previous speech when starting new
- 🌐 **Cross-browser**: Works on both Chrome and Firefox

## Installation

### Chrome

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory
5. The extension is now installed and ready to use!

### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension directory
5. The extension is now installed and ready to use!

## Usage

### Method 1: Context Menu
1. Select any text on a webpage
2. Right-click on the selected text
3. Click "🎙️ Speak Selected Text" from the context menu

### Method 2: Floating Button
1. Select any text on a webpage
2. A small 🎙️ button will appear near your selection
3. Click the button to start speech

### Method 3: Keyboard Shortcut
1. Select any text on a webpage
2. Press `Ctrl+Shift+S` (Windows/Linux) or `Cmd+Shift+S` (Mac)

### Player Controls

The floating player appears when text-to-speech starts:

- **▶️/⏸️ Play/Pause**: Toggle playback
- **⏹️ Stop**: Stop current speech
- **Speed Slider**: Adjust playback speed from 0.5x to 2.0x
- **× Close**: Close the player (also stops speech)
- **Drag**: Click and drag the header to move the player

## Technical Details

- **Manifest Version**: V3
- **Speech API**: Web Speech API (SpeechSynthesis)
- **Preferred Voices**: Hindi-Indian (hi-IN) and English-Indian (en-IN)
- **Storage**: chrome.storage.sync for cross-device settings
- **Browser Compatibility**: Chrome, Firefox, Edge, and other Chromium-based browsers

## File Structure

```
speaker-plugin/
├── manifest.json          # Extension manifest (Manifest V3)
├── background.js          # Background service worker
├── content.js             # Content script for TTS and UI
├── content.css            # Styles for floating UI
├── browser-polyfill.js    # Cross-browser API compatibility
├── icons/                 # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## Development

The extension uses vanilla JavaScript with no build tools required. Simply edit the files and reload the extension in your browser.

## Privacy

This extension:
- Does not collect any user data
- Does not make external network requests
- Uses only browser-native Web Speech API
- Stores preferences locally in browser storage

## License

MIT License - Feel free to use and modify as needed.

## Future Enhancements

- Optional fallback to ElevenLabs/OpenAI TTS APIs
- Additional language support
- Voice selection UI
- Customizable keyboard shortcuts