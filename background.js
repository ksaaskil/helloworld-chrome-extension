chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
  /*
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.showPageAction()],
      },
    ]);
  });
  */
});

// Holds the data structure for all the context menus used in the app
const CONTEXT_MENU_CONTENTS = {
  forSelection: ["Selection context menu"],
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
  chrome.browserAction.setBadgeText({ text: "!" });
  chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
});

chrome.runtime.onSuspend.addListener(() => {
  console.log("Suspending.");
});
