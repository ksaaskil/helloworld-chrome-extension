chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
});

// Holds the data structure for all the context menus used in the app
const CONTEXT_MENU_CONTENTS = {
  forSelection: ["Bold"],
};

const setupContextMenus = () => {
  CONTEXT_MENU_CONTENTS.forSelection.forEach(commandId => {
    chrome.contextMenus.create({
      type: "separator",
      id: "sep1",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      title: commandId + ' "%s"',
      id: commandId,
      contexts: ["selection"],
    });
  });
};

// Add context menus
chrome.runtime.onInstalled.addListener(() => {
  setupContextMenus();
});

const sendMessageToActiveCurrentWindowTab = (message, callback) => {
  console.log(`Sending message: ${JSON.stringify(message)}`);
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, callback);
    }
  );
};

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  console.log(
    `Selection menu '${item.menuItemId}' got selection: '${item.selectionText}'`
  );
  sendMessageToActiveCurrentWindowTab({
    type: "selection handled",
    selection: item.selectionText,
  });
});

chrome.runtime.onSuspend.addListener(() => {
  console.log("Suspending.");
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let logMessage = `Got message '${JSON.stringify(request)}' from `;
  logMessage += sender.tab
    ? "from a content script at: " + sender.tab.url
    : "from the extension";
  console.log(logMessage);
  if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
  if (request.activate) {
    console.log(`Activating badge as got: ${JSON.stringify(request)}`);
    chrome.browserAction.setBadgeText({ text: "ON" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
  }
});
