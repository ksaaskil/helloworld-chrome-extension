let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});

changeColor.onclick = function(element) {
  console.log("Changing bg color");
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: 'document.body.style.backgroundColor = "' + color + '";',
    });
  });
};

const showSelection = document.getElementById("showSelection");

showSelection.onclick = function() {
  console.log("Showing selection");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: "window.getSelection().toString();",
      },
      function(selection) {
        const outputText = `You had selected text: ${selection[0]}`;
        document.getElementById("output").innerHTML = outputText;
      }
    );
  });
};

const saveSelection = document.getElementById("saveSelection");

saveSelection.onclick = function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const hostname = url.hostname;
    const pathname = url.pathname;

    chrome.tabs.executeScript(
      tab.id,
      {
        code: "window.getSelection().toString();",
      },
      function(results) {
        const selection = results[0];
        console.log(`Saving selection for url ${url}: '${selection}'`);
        const toSave = { pathname, selection };
        chrome.storage.local.set(
          { [hostname]: JSON.stringify(toSave) },
          function() {
            console.log(`Saved to ${hostname}: ${JSON.stringify(toSave)}`);
          }
        );
      }
    );
  });
};

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      JSON.stringify(storageChange.oldValue),
      JSON.stringify(storageChange.newValue)
    );
  }
});

const exportButton = document.getElementById("export");

exportButton.onclick = () => {
  console.log("Exporting data...");
  chrome.storage.local.get(null, items => {
    const text = JSON.stringify(items);
    const url = "data:application/json;base64," + btoa(text);
    chrome.downloads.download({
      url,
      filename: "export.json",
    });
    console.log(`Exported: ${text}`);
  });
};

const messageContentScriptButton = document.getElementById(
  "messageContentScript"
);

messageContentScriptButton.onclick = () => {
  // Sending request from extension to content script
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          greeting: "hello",
        },
        function(response) {
          console.log(`Extension got response: ${JSON.stringify(response)}`);
        }
      );
    }
  );
};

const openButton = document.getElementById("open");

openButton.onclick = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL("window.html"),
    type: "popup",
  });
};
