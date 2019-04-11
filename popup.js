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
  console.log("Saving selection");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];
    chrome.tabs.executeScript(
      tab.id,
      {
        code: "window.getSelection().toString();",
      },
      function(selection) {
        console.log(
          `Saving selection for url ${tab.url} and title ${tab.title}: ${
            selection[0]
          }`
        );
      }
    );
  });
};
