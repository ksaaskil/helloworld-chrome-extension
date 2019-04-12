console.log("Running content script.");

const sendMessage = (message, callback) => {
  console.log(`Sending message: ${JSON.stringify(message)}`);
  chrome.runtime.sendMessage(message, callback);
};

// Sending messages
const message = { greeting: "hello" };
sendMessage(message, response => {
  console.log(`Got response: ${response.farewell}`);
});

const title = document.title;
sendMessage({ title });

function activateIfFound(text) {
  const htmlString = document.documentElement.outerHTML.toString();
  const activate = new RegExp(text).test(htmlString);
  sendMessage({ activate });
}

activateIfFound("Python");

// Listening to message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(`Got message: ${JSON.stringify(request)}`);
  if (request.type === "selection handled") {
    colorSelection();
  }
});

const HIGHLIGHT_TAG = "mark";

function colorSelection() {
  if (LAST_ELEMENT && LAST_SELECTION) {
    console.log(`Colored element: ${LAST_ELEMENT}`);
    const cleanedSelection = LAST_SELECTION.toString().replace(
      new RegExp("</?script>"),
      ""
    );
    LAST_ELEMENT.innerHTML = LAST_ELEMENT.innerHTML.replace(
      cleanedSelection,
      `<${HIGHLIGHT_TAG}>${cleanedSelection}</${HIGHLIGHT_TAG}>`
    );
  } else {
    console.log("Nothing to color.");
  }
}

let LAST_SELECTION, LAST_ELEMENT;

document.body.addEventListener(
  "contextmenu",
  e => {
    LAST_SELECTION = window.getSelection();
    LAST_ELEMENT = e.target;
    console.log(`Last selection and element updated`);
  },
  false
);
