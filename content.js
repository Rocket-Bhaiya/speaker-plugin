// Content script for Indian Voice Speaker Extension

let currentUtterance = null;
let isPlaying = false;
let isPaused = false;
let floatingControl = null;
let lastSelectedText = '';

// Initialize speech synthesis
function initializeSpeech() {
  // Load voices (sometimes needs to be triggered)
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
      // Voices loaded
    };
  }
}

// Get Indian voices
function getIndianVoice(preferredGender = 'female') {
  const voices = speechSynthesis.getVoices();
  
  // Priority order for Indian voices
  const indianVoicePatterns = [
    { lang: 'hi-IN', keywords: ['hindi', 'हिन्दी'] },
    { lang: 'en-IN', keywords: ['indian', 'india'] },
    { lang: 'en-GB', keywords: ['english', 'uk'] }
  ];
  
  let selectedVoice = null;
  
  // Try to find matching Indian voice
  for (const pattern of indianVoicePatterns) {
    const matchingVoices = voices.filter(voice => 
      voice.lang.startsWith(pattern.lang) || 
      pattern.keywords.some(keyword => voice.name.toLowerCase().includes(keyword))
    );
    
    if (matchingVoices.length > 0) {
      // Prefer gender if specified
      const genderMatch = matchingVoices.find(v => 
        preferredGender === 'female' ? 
        v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('heera') :
        v.name.toLowerCase().includes('male')
      );
      
      selectedVoice = genderMatch || matchingVoices[0];
      break;
    }
  }
  
  return selectedVoice || voices[0];
}

// Detect language (simple heuristic)
function detectLanguage(text) {
  // Check for Hindi Devanagari characters
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(text)) {
    return 'hi-IN';
  }
  return 'en-IN';
}

// Speak text function
function speakText(text, rate = 1.0, gender = 'female') {
  // Stop any ongoing speech
  stopSpeech();
  
  if (!text || text.trim() === '') {
    return;
  }
  
  lastSelectedText = text;
  
  currentUtterance = new SpeechSynthesisUtterance(text);
  const voice = getIndianVoice(gender);
  
  if (voice) {
    currentUtterance.voice = voice;
  }
  
  // Set language based on text content
  currentUtterance.lang = detectLanguage(text);
  currentUtterance.rate = rate;
  currentUtterance.pitch = 1.0;
  currentUtterance.volume = 1.0;
  
  // Event handlers
  currentUtterance.onstart = () => {
    isPlaying = true;
    isPaused = false;
    showFloatingControl();
    updateControlUI();
  };
  
  currentUtterance.onend = () => {
    isPlaying = false;
    isPaused = false;
    updateControlUI();
    hideFloatingControlAfterDelay();
  };
  
  currentUtterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    isPlaying = false;
    isPaused = false;
    updateControlUI();
  };
  
  currentUtterance.onpause = () => {
    isPaused = true;
    updateControlUI();
  };
  
  currentUtterance.onresume = () => {
    isPaused = false;
    updateControlUI();
  };
  
  speechSynthesis.speak(currentUtterance);
}

// Stop speech
function stopSpeech() {
  speechSynthesis.cancel();
  isPlaying = false;
  isPaused = false;
  currentUtterance = null;
  updateControlUI();
}

// Pause/Resume speech
function togglePause() {
  if (isPaused) {
    speechSynthesis.resume();
  } else {
    speechSynthesis.pause();
  }
}

// Create floating control UI
function createFloatingControl() {
  if (floatingControl) {
    return;
  }
  
  floatingControl = document.createElement('div');
  floatingControl.id = 'indian-voice-speaker-control';
  floatingControl.innerHTML = `
    <div class="ivs-control-header">
      <span class="ivs-title">🎙️ Voice Speaker</span>
      <button class="ivs-close-btn" id="ivs-close">×</button>
    </div>
    <div class="ivs-control-body">
      <div class="ivs-buttons">
        <button class="ivs-btn" id="ivs-play-pause" title="Play/Pause">
          <span id="ivs-play-icon">▶️</span>
        </button>
        <button class="ivs-btn" id="ivs-stop" title="Stop">⏹️</button>
      </div>
      <div class="ivs-speed-control">
        <label>Speed: <span id="ivs-speed-value">1.0x</span></label>
        <input type="range" id="ivs-speed-slider" min="0.5" max="2.0" step="0.1" value="1.0">
      </div>
    </div>
  `;
  
  document.body.appendChild(floatingControl);
  
  // Event listeners
  document.getElementById('ivs-close').addEventListener('click', hideFloatingControl);
  document.getElementById('ivs-play-pause').addEventListener('click', togglePause);
  document.getElementById('ivs-stop').addEventListener('click', stopSpeech);
  
  const speedSlider = document.getElementById('ivs-speed-slider');
  speedSlider.addEventListener('input', (e) => {
    const speed = parseFloat(e.target.value);
    document.getElementById('ivs-speed-value').textContent = speed.toFixed(1) + 'x';
    
    // Save speed setting
    chrome.storage.sync.set({ voiceRate: speed });
    
    // If speaking, restart with new speed
    if (isPlaying && lastSelectedText) {
      chrome.storage.sync.get(['voiceGender'], (result) => {
        speakText(lastSelectedText, speed, result.voiceGender || 'female');
      });
    }
  });
  
  // Load saved speed
  chrome.storage.sync.get(['voiceRate'], (result) => {
    if (result.voiceRate) {
      speedSlider.value = result.voiceRate;
      document.getElementById('ivs-speed-value').textContent = result.voiceRate.toFixed(1) + 'x';
    }
  });
  
  // Make draggable
  makeDraggable(floatingControl);
}

// Show floating control
function showFloatingControl() {
  if (!floatingControl) {
    createFloatingControl();
  }
  floatingControl.classList.add('ivs-visible');
}

// Hide floating control
function hideFloatingControl() {
  if (floatingControl) {
    floatingControl.classList.remove('ivs-visible');
  }
}

// Hide after delay
function hideFloatingControlAfterDelay() {
  setTimeout(() => {
    if (!isPlaying) {
      hideFloatingControl();
    }
  }, 3000);
}

// Update control UI
function updateControlUI() {
  if (!floatingControl) return;
  
  const playIcon = document.getElementById('ivs-play-icon');
  if (isPaused) {
    playIcon.textContent = '▶️';
  } else if (isPlaying) {
    playIcon.textContent = '⏸️';
  } else {
    playIcon.textContent = '▶️';
  }
}

// Make element draggable
function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = element.querySelector('.ivs-control-header');
  
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
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }
  
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Handle text selection for auto-speak
document.addEventListener('mouseup', () => {
  chrome.storage.sync.get(['autoSpeak'], (result) => {
    if (result.autoSpeak) {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        chrome.storage.sync.get(['voiceRate', 'voiceGender'], (settings) => {
          speakText(selectedText, settings.voiceRate || 1.0, settings.voiceGender || 'female');
        });
      }
    }
  });
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'speak') {
    speakText(request.text, request.rate, request.gender);
    sendResponse({ success: true });
  } else if (request.action === 'stopSpeech') {
    stopSpeech();
    sendResponse({ success: true });
  } else if (request.action === 'getSelection') {
    const selectedText = window.getSelection().toString().trim();
    sendResponse({ text: selectedText });
  }
  return true;
});

// Initialize on load
initializeSpeech();
