console.log("Running content script.");
// document.body.style.backgroundColor = "#3aa757";

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

// Listening to message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(`Got message: ${JSON.stringify(request)}`);
});
