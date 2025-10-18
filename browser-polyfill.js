/**
 * Browser API Polyfill for Chrome and Firefox
 * Ensures browser.* APIs work in Chrome by aliasing chrome.* APIs
 */
(function() {
  'use strict';

  // If browser API already exists (Firefox), do nothing
  if (typeof browser !== 'undefined') {
    return;
  }

  // Create browser namespace for Chrome
  if (typeof chrome !== 'undefined') {
    window.browser = {
      runtime: chrome.runtime,
      storage: chrome.storage,
      contextMenus: chrome.contextMenus,
      tabs: chrome.tabs,
      commands: chrome.commands
    };
  }
})();
