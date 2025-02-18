
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed and service worker registered.");
  });
  
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['clientScript.js']
  }, () => {
    console.log("Client Script injected.");
  });
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureVisibleTab") {
    chrome.tabs.captureVisibleTab(
      null, 
      { format: "png", quality: 100 },
      (dataUrl) => {
        if (chrome.runtime.lastError) {
          console.error("Capture Error:", chrome.runtime.lastError.message);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else if (!dataUrl) {
          console.error("Capture failed: No data URL received.");
          sendResponse({ success: false, error: "No image data received" });
        } else {
          sendResponse({ success: true, dataUrl });
        }
      }
    );
    return true; // Keep message channel open for async response
  }
});

