# 🎙️ Indian Voice Speaker - Chrome/Firefox Extension

A powerful cross-browser extension that converts selected text into natural-sounding Indian Hinglish speech using Web Speech API.

## ✨ Features

### 🎯 Core Functionality
- **Right-click Context Menu** - Select text → Right-click → "🎙️ Speak Selected Text"
- **Keyboard Shortcut** - `Ctrl+Shift+S` (or `Cmd+Shift+S` on Mac) to speak selected text
- **Floating Control Panel** - Draggable mini-player with Play/Pause/Stop controls
- **Indian Voice Support** - Automatically selects Hindi (hi-IN) or English Indian (en-IN) voices

### ⚙️ Advanced Settings
- **Voice Gender Selection** - Choose between Male/Female Indian voices
- **Adjustable Speed** - Control speech rate from 0.5x to 2.0x
- **Auto-speak Mode** - Automatically speak text when selected (toggle on/off)
- **Dark/Light Theme** - Beautiful gradient UI with theme support
- **Language Auto-detection** - Detects Hindi Devanagari vs English text

### 📜 Additional Features
- **Speech History** - Last 5 spoken texts saved with timestamps
- **One-click Replay** - Click any history item to speak it again
- **Persistent Settings** - All preferences synced across devices
- **Works Offline** - Uses browser's built-in TTS voices

## 🚀 Installation

### For Chrome/Edge/Brave

1. **Download/Clone this repository**
   ```bash
   git clone https://github.com/Rocket-Bhaiya/speaker-plugin.git
   cd speaker-plugin
   ```

2. **Generate PNG icons from SVG** (required for Chrome)
   ```bash
   # Install ImageMagick if not installed
   sudo apt-get install imagemagick  # Ubuntu/Debian
   # or
   brew install imagemagick  # macOS

   # Convert SVG to PNG icons
   convert -background none icons/icon128.svg -resize 128x128 icons/icon128.png
   convert -background none icons/icon128.svg -resize 48x48 icons/icon48.png
   convert -background none icons/icon128.svg -resize 16x16 icons/icon16.png
   ```

3. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `speaker-plugin` folder
   - Extension should now be installed! 🎉

### For Firefox

1. **Download/Clone this repository** (same as above)

2. **Create Firefox-compatible manifest** (optional - current manifest works for both)

3. **Load temporarily in Firefox**
   - Open Firefox and go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the `speaker-plugin` folder
   - Extension loaded! (Note: temporary extensions are removed when Firefox closes)

4. **For permanent installation** - You need to sign the extension through Mozilla Add-ons

## 📖 Usage

### Method 1: Context Menu
1. Select any text on a webpage
2. Right-click to open context menu
3. Click "🎙️ Speak Selected Text"
4. Floating control panel appears automatically

### Method 2: Keyboard Shortcut
1. Select any text on a webpage
2. Press `Ctrl+Shift+S` (`Cmd+Shift+S` on Mac)
3. Text starts speaking immediately

### Method 3: Extension Popup
1. Click the extension icon in toolbar
2. Select text on the page
3. Click "Speak Selected Text" button in popup

### Method 4: Auto-speak Mode
1. Open extension popup
2. Toggle "Auto-speak on selection" ON
3. Simply select any text - it will speak automatically!

## 🎨 Features Walkthrough

### Floating Control Panel
- **Draggable** - Click and drag the header to move it anywhere
- **Play/Pause** - Toggle speech playback
- **Stop** - Stop current speech
- **Speed Slider** - Adjust speed in real-time (0.5x - 2.0x)
- **Auto-hide** - Disappears 3 seconds after speech ends

### Settings Panel
Access via extension icon → Opens beautiful popup with:
- Voice gender selection (Male/Female)
- Speed control slider
- Auto-speak toggle
- Dark theme toggle
- Quick action buttons
- Speech history with replay

### Voice Selection
The extension automatically prioritizes:
1. Hindi voices (hi-IN) - Google हिन्दी, Microsoft Heera
2. Indian English voices (en-IN)
3. British English voices (en-GB) as fallback
4. Gender preference (Male/Female) when available

## 🛠️ Technical Details

### Architecture
- **Manifest V3** - Modern Chrome extension format
- **Service Worker** - Efficient background script
- **Content Script** - Injected into all webpages
- **Web Speech API** - Native browser TTS (no external dependencies)

### Files Structure
```
speaker-plugin/
├── manifest.json       # Extension configuration
├── background.js       # Service worker (context menu, shortcuts)
├── content.js          # Main TTS logic + floating UI
├── popup.html          # Settings UI
├── popup.js            # Settings logic
├── style.css           # Floating control styles
├── icons/              # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

### Storage
Uses `chrome.storage.sync` for:
- Voice rate (speed)
- Voice gender preference
- Auto-speak enabled/disabled
- Theme (light/dark)
- Speech history (last 5 items)

### Browser Compatibility
- ✅ Chrome/Chromium (90+)
- ✅ Edge (90+)
- ✅ Brave
- ✅ Opera
- ✅ Firefox (89+) with minor manifest tweaks

## 🎤 Voice Availability

Available voices depend on your operating system:

**Windows:**
- Microsoft Heera (Hindi, Female) - hi-IN
- Microsoft Hemant (Hindi, Male) - hi-IN

**macOS:**
- Lekha (Hindi) - hi-IN
- Indian English voices

**Linux:**
- eSpeak voices (Hindi & English)
- Install additional voices: `sudo apt-get install espeak-ng-data`

**Android (via Chrome):**
- Google Hindi voices
- Google English Indian voices

To check available voices, open browser console and run:
```javascript
speechSynthesis.getVoices().forEach(voice => 
  console.log(voice.name, voice.lang)
);
```

## 🔧 Customization

### Change Default Speed
Edit `background.js`, line ~15:
```javascript
chrome.storage.sync.set({ voiceRate: 1.5 }); // Change 1.0 to your preferred speed
```

### Change Default Voice
Edit `content.js`, function `getIndianVoice()` to modify priority:
```javascript
const indianVoicePatterns = [
  { lang: 'hi-IN', keywords: ['hindi', 'हिन्दी'] },
  // Add more patterns here
];
```

### Customize Floating UI Position
Edit `style.css`, line ~4:
```css
#indian-voice-speaker-control {
  bottom: 20px;  /* Change this */
  right: 20px;   /* Change this */
}
```

## 🐛 Troubleshooting

### No voices available
- **Solution**: Reload the page after installing the extension
- **Check**: Open console and run `speechSynthesis.getVoices()`

### Indian voices not found
- **Windows**: Install Hindi language pack from Settings
- **macOS**: System Preferences → Accessibility → Spoken Content → System Voice → Manage Voices
- **Linux**: `sudo apt-get install speech-dispatcher-hindi`

### Extension not working
- Check if site has restrictive CSP (Content Security Policy)
- Some sites (chrome://, about:, etc.) block extensions
- Reload the page after installing

### Speech cuts off
- Increase browser's speech queue limit
- Reduce text length (try chunks of 500 characters)

## 🚀 Future Enhancements

Potential upgrades (PRs welcome!):
- [ ] Integration with ElevenLabs API for ultra-realistic voices
- [ ] OpenAI TTS API support
- [ ] Download speech as MP3
- [ ] Highlight text as it's being spoken
- [ ] Translation + TTS combo
- [ ] Custom voice speed per language
- [ ] Keyboard shortcuts customization
- [ ] Export/Import settings

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💬 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- Web Speech API by W3C
- Icon design inspired by modern UI trends
- Indian voice community feedback

---

**Made with ❤️ for the Indian developer community**

Enjoy natural Indian speech on any webpage! 🎙️🇮🇳