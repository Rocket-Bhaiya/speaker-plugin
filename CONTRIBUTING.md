# Contributing to Indian Voice Speaker

Thank you for your interest in contributing! 🎉

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/speaker-plugin.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test the extension locally
6. Commit your changes: `git commit -m "Add: your feature description"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 🧪 Testing Your Changes

### Local Testing (Chrome)
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `speaker-plugin` folder
5. Test your changes on the provided `test.html` page

### Local Testing (Firefox)
1. Open Firefox and go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json` from the folder
4. Test your changes

## 📝 Code Style Guidelines

### JavaScript
- Use ES6+ features (const/let, arrow functions, etc.)
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

```javascript
// Good
const getIndianVoice = (preferredGender) => {
  const voices = speechSynthesis.getVoices();
  // Implementation...
};

// Avoid
function gv(g) {
  var v = speechSynthesis.getVoices();
  // Implementation...
}
```

### CSS
- Use meaningful class names with prefixes (`ivs-` for this extension)
- Keep specificity low
- Use CSS variables for repeated values
- Maintain responsive design

### HTML
- Use semantic HTML5 elements
- Keep accessibility in mind (ARIA labels where needed)
- Validate HTML structure

## 🎯 Areas for Contribution

### High Priority
- [ ] Add support for more Indian languages (Tamil, Telugu, Bengali, etc.)
- [ ] Improve voice detection algorithm
- [ ] Add unit tests
- [ ] Performance optimizations
- [ ] Better error handling

### Medium Priority
- [ ] Integration with premium TTS APIs (ElevenLabs, OpenAI)
- [ ] Export speech as audio file
- [ ] Text highlighting as it's being spoken
- [ ] Customizable keyboard shortcuts
- [ ] Multi-language translation + TTS

### Low Priority
- [ ] Statistics dashboard (words spoken, time used)
- [ ] Themes and color customization
- [ ] Voice samples preview
- [ ] Bookmark integration

## 🐛 Bug Reports

When reporting bugs, please include:
1. **Browser & Version**: Chrome 120, Firefox 115, etc.
2. **OS**: Windows 11, macOS Sonoma, Ubuntu 24.04, etc.
3. **Steps to Reproduce**: Detailed steps
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Screenshots/Console Logs**: If applicable

### Bug Report Template
```markdown
**Browser & Version**: Chrome 120
**OS**: Windows 11
**Available Voices**: (run `speechSynthesis.getVoices()` in console)

**Steps to Reproduce**:
1. Select text containing Hindi characters
2. Right-click and choose "Speak Selected Text"
3. Observe behavior

**Expected**: Should speak in Hindi voice
**Actual**: Speaks in English voice with incorrect pronunciation

**Console Errors**: [Paste any console errors here]
```

## ✨ Feature Requests

When requesting features, please include:
1. **Use Case**: Why is this feature needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives Considered**: Other ways to solve the problem
4. **Additional Context**: Screenshots, mockups, examples

## 🔧 Development Setup

### Prerequisites
- Node.js (for any build tools you might add)
- Git
- A modern browser (Chrome/Firefox)
- Basic knowledge of WebExtensions API

### Project Structure
```
speaker-plugin/
├── manifest.json       # Extension configuration (Manifest V3)
├── background.js       # Service worker (context menu, storage)
├── content.js          # Content script (TTS logic, UI injection)
├── popup.html          # Settings UI
├── popup.js            # Settings logic
├── style.css           # Floating control styles
├── icons/              # Extension icons
├── test.html           # Test page with sample content
├── setup.sh            # Setup script
└── README.md           # Documentation
```

### Key Files Explained

**manifest.json**: Extension metadata and permissions
- Defines required permissions
- Sets up context menus
- Configures keyboard shortcuts

**background.js**: Runs in the background
- Handles context menu clicks
- Manages storage
- Coordinates between popup and content scripts

**content.js**: Injected into web pages
- Main TTS logic
- Floating UI creation
- Selection detection
- Voice selection algorithm

**popup.html/js**: Extension popup UI
- Settings panel
- History display
- Quick actions

**style.css**: Floating control CSS
- Isolated styles (using #id selectors)
- Responsive design
- Animations

## 🧩 Extension APIs Used

### Chrome Storage API
```javascript
chrome.storage.sync.get(['key'], (result) => {
  // Use result.key
});

chrome.storage.sync.set({ key: value });
```

### Chrome Runtime Messaging
```javascript
// From content script to background
chrome.runtime.sendMessage({ action: 'speak', text: 'Hello' });

// Listen in background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle message
});
```

### Web Speech API
```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.voice = selectedVoice;
utterance.rate = 1.0;
speechSynthesis.speak(utterance);
```

## 🎨 UI/UX Guidelines

- Keep the floating control minimal and non-intrusive
- Use smooth animations (0.3s transitions)
- Maintain high contrast for readability
- Support both light and dark themes
- Ensure draggable elements are obvious
- Provide visual feedback for all actions

## 🔍 Testing Checklist

Before submitting a PR, test:
- [ ] Extension loads without errors
- [ ] Context menu appears on text selection
- [ ] Keyboard shortcut (Ctrl+Shift+S) works
- [ ] Popup opens and settings persist
- [ ] Floating control appears when speaking
- [ ] Speed adjustment works in real-time
- [ ] Auto-speak mode toggles correctly
- [ ] History saves and replays
- [ ] Works on different websites
- [ ] Hindi/Hinglish text is detected correctly
- [ ] No console errors

## 📜 Commit Message Format

Use semantic commit messages:
- `feat: Add Tamil language support`
- `fix: Resolve voice detection issue on Firefox`
- `docs: Update installation instructions`
- `style: Improve floating control animations`
- `refactor: Simplify voice selection logic`
- `test: Add unit tests for content script`
- `chore: Update dependencies`

## 🔐 Security Considerations

- Never request unnecessary permissions
- Validate all user inputs
- Don't store sensitive data
- Be careful with eval() and innerHTML
- Follow CSP (Content Security Policy) best practices

## 🌍 Internationalization

If adding new languages:
1. Update `detectLanguage()` function in `content.js`
2. Add language patterns in `getIndianVoice()`
3. Test with native speakers if possible
4. Update documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Community

- Be respectful and inclusive
- Help others learn
- Provide constructive feedback
- Credit others' work

## 💬 Questions?

- Open an issue with the "question" label
- Check existing issues first
- Be specific and provide context

---

**Happy Contributing! 🎙️**
