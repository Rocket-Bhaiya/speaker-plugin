/**
 * Background Service Worker
 * Handles context menu creation and keyboard shortcuts
 */

// Import browser polyfill for Chrome compatibility
if (typeof browser === 'undefined') {
  self.browser = chrome;
}

// Default settings
const DEFAULT_SETTINGS = {
  speed: 1.0,
  voice: 'hi-IN', // Prefer Hindi-Indian voice
  autoStop: true
};

// Initialize extension
browser.runtime.onInstalled.addListener(async () => {
  console.log('Hinglish Speaker extension installed');
  
  // Create context menu
  browser.contextMenus.create({
    id: 'speak-selected-text',
    title: '🎙️ Speak Selected Text',
    contexts: ['selection']
  });

  // Initialize default settings
  const stored = await browser.storage.sync.get(DEFAULT_SETTINGS);
  if (!stored.speed) {
    await browser.storage.sync.set(DEFAULT_SETTINGS);
  }
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'speak-selected-text' && info.selectionText) {
    // Send message to content script to speak the text
    browser.tabs.sendMessage(tab.id, {
      action: 'speak',
      text: info.selectionText
    }).catch(err => {
      console.error('Error sending message to content script:', err);
    });
  }
});

// Handle keyboard shortcut
browser.commands.onCommand.addListener((command) => {
  if (command === 'speak-selected-text') {
    // Query active tab and send message
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      if (tabs[0]) {
        browser.tabs.sendMessage(tabs[0].id, {
          action: 'speakSelection'
        }).catch(err => {
          console.error('Error sending keyboard shortcut message:', err);
        });
      }
    });
  }
});

// Handle messages from content script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    browser.storage.sync.get(DEFAULT_SETTINGS).then(settings => {
      sendResponse(settings);
    });
    return true; // Keep message channel open for async response
  }
  
  if (message.action === 'saveSettings') {
    browser.storage.sync.set(message.settings).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});
