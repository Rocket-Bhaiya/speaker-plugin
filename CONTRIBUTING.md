# Contributing to Hinglish Speaker

Thank you for your interest in contributing to the Hinglish Speaker extension! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites
- Basic knowledge of JavaScript, HTML, and CSS
- Understanding of browser extensions (Chrome/Firefox)
- A code editor (VS Code, Sublime Text, etc.)
- Git installed on your system

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rocket-Bhaiya/speaker-plugin.git
   cd speaker-plugin
   ```

2. **Load the extension in your browser**
   - Follow the [INSTALLATION.md](INSTALLATION.md) guide
   - Use "Load unpacked" for development

3. **Make your changes**
   - Edit the relevant files
   - No build step required - it's vanilla JavaScript!

4. **Test your changes**
   - Reload the extension in your browser
   - Test on multiple pages
   - Verify all features work as expected

## Project Structure

```
speaker-plugin/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker
├── content.js             # Content script (main logic)
├── content.css            # UI styles
├── browser-polyfill.js    # Cross-browser compatibility
├── icons/                 # Extension icons
├── README.md              # Main documentation
├── INSTALLATION.md        # Installation guide
└── CONTRIBUTING.md        # This file
```

## Development Guidelines

### Code Style
- Use 2 spaces for indentation
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### JavaScript
- Use modern ES6+ features
- Avoid global variables
- Use `const` and `let` instead of `var`
- Handle errors gracefully with try-catch

### CSS
- Use BEM-like naming convention
- Prefix all classes with `hs-` to avoid conflicts
- Keep specificity low
- Use flexbox/grid for layouts

### Testing
Before submitting a PR, test:
- ✅ Context menu works
- ✅ Floating button appears and works
- ✅ Keyboard shortcut (Ctrl+Shift+S) works
- ✅ Player UI appears and is draggable
- ✅ Play/Pause/Stop buttons work
- ✅ Speed slider works (0.5x - 2.0x)
- ✅ Settings persist across sessions
- ✅ Works in both Chrome and Firefox
- ✅ No console errors

## Making Contributions

### Bug Fixes
1. Create an issue describing the bug
2. Fork the repository
3. Create a branch: `fix/bug-description`
4. Make your changes
5. Test thoroughly
6. Submit a pull request

### New Features
1. Create an issue to discuss the feature
2. Wait for approval/feedback
3. Fork the repository
4. Create a branch: `feature/feature-name`
5. Implement the feature
6. Add documentation if needed
7. Test thoroughly
8. Submit a pull request

### Documentation
- Fix typos or improve clarity
- Add examples or screenshots
- Update installation instructions
- Translate to other languages

## Pull Request Process

1. **Update documentation** if you've made significant changes
2. **Follow the code style** of the existing codebase
3. **Test your changes** in both Chrome and Firefox
4. **Write a clear PR description** explaining what and why
5. **Link related issues** in the PR description

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Changes tested in Chrome
- [ ] Changes tested in Firefox
- [ ] No console errors or warnings
- [ ] Documentation updated (if needed)
- [ ] No merge conflicts

## Feature Requests

We welcome feature requests! Please:
1. Check existing issues to avoid duplicates
2. Describe the feature clearly
3. Explain the use case
4. Provide examples if possible

### Potential Enhancements
- ElevenLabs/OpenAI TTS API fallback
- Voice selection UI
- More language support
- Custom keyboard shortcuts
- Highlighting text as it's read
- Reading speed presets
- Dark mode for UI

## Questions?

- Open an issue for general questions
- Tag issues with `question` label
- Be respectful and patient

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

Thank you for contributing! 🎙️
