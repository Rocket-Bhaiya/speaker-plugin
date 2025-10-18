/**
 * Content Script
 * Handles text-to-speech functionality and floating player UI
 */

class HinglishSpeaker {
  constructor() {
    this.utterance = null;
    this.synth = window.speechSynthesis;
    this.player = null;
    this.floatingButton = null;
    this.settings = {
      speed: 1.0,
      voice: 'hi-IN',
      autoStop: true
    };
    this.isPlaying = false;
    this.isPaused = false;
    
    this.init();
  }

  async init() {
    // Load settings
    await this.loadSettings();
    
    // Create floating button
    this.createFloatingButton();
    
    // Listen for messages from background script
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'speak' && message.text) {
        this.speak(message.text);
      } else if (message.action === 'speakSelection') {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
          this.speak(selectedText);
        }
      }
    });

    // Handle speech synthesis events
    this.setupSpeechHandlers();
  }

  async loadSettings() {
    try {
      const stored = await browser.runtime.sendMessage({ action: 'getSettings' });
      this.settings = { ...this.settings, ...stored };
    } catch (err) {
      console.error('Error loading settings:', err);
    }
  }

  async saveSettings() {
    try {
      await browser.runtime.sendMessage({
        action: 'saveSettings',
        settings: this.settings
      });
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  }

  createFloatingButton() {
    // Create a small floating button that appears near selected text
    this.floatingButton = document.createElement('div');
    this.floatingButton.id = 'hinglish-speaker-float-btn';
    this.floatingButton.innerHTML = '🎙️';
    this.floatingButton.style.display = 'none';
    document.body.appendChild(this.floatingButton);

    // Show button when text is selected
    document.addEventListener('mouseup', (e) => {
      setTimeout(() => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText && selectedText.length > 0) {
          this.showFloatingButton(e.pageX, e.pageY);
        } else {
          this.hideFloatingButton();
        }
      }, 10);
    });

    // Hide when clicking elsewhere
    document.addEventListener('mousedown', (e) => {
      if (e.target !== this.floatingButton) {
        this.hideFloatingButton();
      }
    });

    this.floatingButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        this.speak(selectedText);
      }
    });
  }

  showFloatingButton(x, y) {
    this.floatingButton.style.left = (x + 10) + 'px';
    this.floatingButton.style.top = (y - 40) + 'px';
    this.floatingButton.style.display = 'block';
  }

  hideFloatingButton() {
    this.floatingButton.style.display = 'none';
  }

  createPlayer() {
    if (this.player) {
      return; // Player already exists
    }

    this.player = document.createElement('div');
    this.player.id = 'hinglish-speaker-player';
    this.player.innerHTML = `
      <div class="hs-player-header">
        <span class="hs-player-title">🎙️ Hinglish Speaker</span>
        <button class="hs-close-btn" title="Close">×</button>
      </div>
      <div class="hs-player-controls">
        <button class="hs-play-btn" title="Play/Pause">▶️</button>
        <button class="hs-stop-btn" title="Stop">⏹️</button>
      </div>
      <div class="hs-player-speed">
        <label>Speed: <span class="hs-speed-value">1.0</span>x</label>
        <input type="range" class="hs-speed-slider" min="0.5" max="2" step="0.1" value="1.0">
      </div>
      <div class="hs-player-text"></div>
    `;
    
    document.body.appendChild(this.player);
    this.setupPlayerControls();
  }

  setupPlayerControls() {
    const playBtn = this.player.querySelector('.hs-play-btn');
    const stopBtn = this.player.querySelector('.hs-stop-btn');
    const closeBtn = this.player.querySelector('.hs-close-btn');
    const speedSlider = this.player.querySelector('.hs-speed-slider');
    const speedValue = this.player.querySelector('.hs-speed-value');

    playBtn.addEventListener('click', () => {
      if (this.isPlaying && !this.isPaused) {
        this.pause();
      } else if (this.isPaused) {
        this.resume();
      } else {
        // Re-speak current text
        const textDiv = this.player.querySelector('.hs-player-text');
        if (textDiv.textContent) {
          this.speak(textDiv.textContent);
        }
      }
    });

    stopBtn.addEventListener('click', () => {
      this.stop();
    });

    closeBtn.addEventListener('click', () => {
      this.stop();
      this.hidePlayer();
    });

    speedSlider.value = this.settings.speed;
    speedValue.textContent = this.settings.speed;

    speedSlider.addEventListener('input', (e) => {
      const speed = parseFloat(e.target.value);
      speedValue.textContent = speed.toFixed(1);
      this.settings.speed = speed;
      
      // Update current utterance if speaking
      if (this.utterance) {
        this.utterance.rate = speed;
      }
      
      this.saveSettings();
    });

    // Make player draggable
    this.makeDraggable(this.player);
  }

  makeDraggable(element) {
    const header = element.querySelector('.hs-player-header');
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    header.style.cursor = 'move';

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = (element.offsetTop - pos2) + 'px';
      element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  showPlayer(text) {
    if (!this.player) {
      this.createPlayer();
    }
    
    this.player.style.display = 'block';
    const textDiv = this.player.querySelector('.hs-player-text');
    textDiv.textContent = text.substring(0, 100) + (text.length > 100 ? '...' : '');
  }

  hidePlayer() {
    if (this.player) {
      this.player.style.display = 'none';
    }
  }

  setupSpeechHandlers() {
    // These will be set up when utterance is created
  }

  getPreferredVoice() {
    const voices = this.synth.getVoices();
    
    // Prefer Hindi-Indian voices
    let voice = voices.find(v => v.lang === 'hi-IN');
    
    // Fallback to English-Indian
    if (!voice) {
      voice = voices.find(v => v.lang === 'en-IN');
    }
    
    // Fallback to any Hindi voice
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('hi'));
    }
    
    // Fallback to any English-India voice
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en-IN'));
    }
    
    // Last resort: any English voice
    if (!voice) {
      voice = voices.find(v => v.lang.startsWith('en'));
    }
    
    return voice || voices[0];
  }

  speak(text) {
    // Auto-stop previous speech if enabled
    if (this.settings.autoStop && this.isPlaying) {
      this.stop();
    }

    // Hide floating button
    this.hideFloatingButton();

    // Show player
    this.showPlayer(text);

    // Wait for voices to load
    if (this.synth.getVoices().length === 0) {
      this.synth.addEventListener('voiceschanged', () => {
        this.performSpeak(text);
      }, { once: true });
    } else {
      this.performSpeak(text);
    }
  }

  performSpeak(text) {
    this.utterance = new SpeechSynthesisUtterance(text);
    
    // Set preferred voice
    const voice = this.getPreferredVoice();
    if (voice) {
      this.utterance.voice = voice;
      this.utterance.lang = voice.lang;
    } else {
      this.utterance.lang = 'hi-IN'; // Default to Hindi-Indian
    }
    
    // Set speech rate
    this.utterance.rate = this.settings.speed;
    
    // Set up event handlers
    this.utterance.onstart = () => {
      this.isPlaying = true;
      this.isPaused = false;
      this.updatePlayButton('⏸️');
    };
    
    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.updatePlayButton('▶️');
    };
    
    this.utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isPlaying = false;
      this.isPaused = false;
      this.updatePlayButton('▶️');
    };
    
    // Speak
    this.synth.speak(this.utterance);
  }

  pause() {
    if (this.isPlaying && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.updatePlayButton('▶️');
    }
  }

  resume() {
    if (this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.updatePlayButton('⏸️');
    }
  }

  stop() {
    this.synth.cancel();
    this.isPlaying = false;
    this.isPaused = false;
    this.updatePlayButton('▶️');
  }

  updatePlayButton(text) {
    if (this.player) {
      const playBtn = this.player.querySelector('.hs-play-btn');
      if (playBtn) {
        playBtn.textContent = text;
      }
    }
  }
}

// Initialize the speaker
const speaker = new HinglishSpeaker();
