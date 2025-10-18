// Popup script for Indian Voice Speaker Extension

// Load settings on popup open
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadHistory();
  setupEventListeners();
});

// Load saved settings
function loadSettings() {
  chrome.storage.sync.get(['voiceRate', 'voiceGender', 'autoSpeak', 'theme'], (result) => {
    // Voice speed
    if (result.voiceRate) {
      document.getElementById('voice-speed').value = result.voiceRate;
      document.getElementById('speed-value').textContent = result.voiceRate.toFixed(1) + 'x';
    }
    
    // Voice gender
    if (result.voiceGender) {
      document.getElementById('voice-gender').value = result.voiceGender;
    }
    
    // Auto speak
    if (result.autoSpeak !== undefined) {
      document.getElementById('auto-speak').checked = result.autoSpeak;
    }
    
    // Theme
    if (result.theme === 'dark') {
      document.getElementById('dark-theme').checked = true;
      document.body.classList.add('dark');
    }
  });
}

// Load history
function loadHistory() {
  chrome.storage.sync.get(['spokenHistory'], (result) => {
    const historyList = document.getElementById('history-list');
    const history = result.spokenHistory || [];
    
    if (history.length === 0) {
      historyList.innerHTML = '<div class="empty-history">No spoken text yet</div>';
      return;
    }
    
    historyList.innerHTML = '';
    history.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-text">${escapeHtml(item.text)}</div>
        <div class="history-time">${formatTime(item.timestamp)}</div>
      `;
      
      // Click to speak again
      historyItem.addEventListener('click', () => {
        speakHistoryItem(item.text);
      });
      
      historyList.appendChild(historyItem);
    });
  });
}

// Setup event listeners
function setupEventListeners() {
  // Voice speed slider
  const speedSlider = document.getElementById('voice-speed');
  speedSlider.addEventListener('input', (e) => {
    const speed = parseFloat(e.target.value);
    document.getElementById('speed-value').textContent = speed.toFixed(1) + 'x';
    chrome.storage.sync.set({ voiceRate: speed });
  });
  
  // Voice gender
  document.getElementById('voice-gender').addEventListener('change', (e) => {
    chrome.storage.sync.set({ voiceGender: e.target.value });
  });
  
  // Auto speak toggle
  document.getElementById('auto-speak').addEventListener('change', (e) => {
    chrome.storage.sync.set({ autoSpeak: e.target.checked });
  });
  
  // Dark theme toggle
  document.getElementById('dark-theme').addEventListener('change', (e) => {
    const isDark = e.target.checked;
    chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
    document.body.classList.toggle('dark', isDark);
  });
  
  // Speak selected button
  document.getElementById('speak-selected').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, (response) => {
        if (response && response.text) {
          speakText(response.text);
        } else {
          showNotification('Please select some text first!');
        }
      });
    });
  });
  
  // Stop speech button
  document.getElementById('stop-speech').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stop' });
  });
}

// Speak text
function speakText(text) {
  chrome.storage.sync.get(['voiceRate', 'voiceGender'], (result) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'speak',
        text: text,
        rate: result.voiceRate || 1.0,
        gender: result.voiceGender || 'female'
      });
      
      // Refresh history after a short delay
      setTimeout(loadHistory, 500);
    });
  });
}

// Speak history item
function speakHistoryItem(text) {
  speakText(text);
}

// Utility functions
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function showNotification(message) {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 12px;
    z-index: 10000;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 2000);
}
