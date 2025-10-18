// Background service worker for Indian Voice Speaker Extension

// Initialize context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'speakSelectedText',
    title: '🎙️ Speak Selected Text',
    contexts: ['selection']
  });

  // Set default settings
  chrome.storage.sync.get(['voiceRate', 'voiceGender', 'autoSpeak', 'theme'], (result) => {
    if (!result.voiceRate) {
      chrome.storage.sync.set({ voiceRate: 1.0 });
    }
    if (!result.voiceGender) {
      chrome.storage.sync.set({ voiceGender: 'female' });
    }
    if (result.autoSpeak === undefined) {
      chrome.storage.sync.set({ autoSpeak: false });
    }
    if (!result.theme) {
      chrome.storage.sync.set({ theme: 'light' });
    }
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'speakSelectedText' && info.selectionText) {
    speakTextInTab(tab.id, info.selectionText);
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'speak-selection') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelection' }, (response) => {
          if (response && response.text) {
            speakTextInTab(tabs[0].id, response.text);
          }
        });
      }
    });
  }
});

// Function to speak text in a specific tab
function speakTextInTab(tabId, text) {
  chrome.storage.sync.get(['voiceRate', 'voiceGender', 'spokenHistory'], (result) => {
    const voiceRate = result.voiceRate || 1.0;
    const voiceGender = result.voiceGender || 'female';
    
    // Send message to content script to speak
    chrome.tabs.sendMessage(tabId, {
      action: 'speak',
      text: text,
      rate: voiceRate,
      gender: voiceGender
    });

    // Save to history
    saveToHistory(text, result.spokenHistory || []);
  });
}

// Save spoken text to history (last 5)
function saveToHistory(text, history) {
  const newHistory = [
    {
      text: text.substring(0, 100), // Limit length
      timestamp: Date.now()
    },
    ...history
  ].slice(0, 5);
  
  chrome.storage.sync.set({ spokenHistory: newHistory });
}

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'speak') {
    if (sender.tab) {
      speakTextInTab(sender.tab.id, request.text);
    }
  } else if (request.action === 'stop') {
    // Broadcast stop message to all tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { action: 'stopSpeech' }).catch(() => {});
      });
    });
  }
  
  sendResponse({ success: true });
  return true;
});
