# Example Chrome extension

Chrome extension built on top of [these instructions](https://developer.chrome.com/extensions/getstarted), demonstrating some features of interest.

## Usage

1. Open the Extension Management page by navigating to `chrome://extensions`.
1. Enable Developer Mode by clicking the toggle switch next to Developer mode.
1. Click the `LOAD UNPACKED` button and select the extension directory.

## Features

- Browser action menu for
  - changing background color by clicking square (with extension options for choosing color)
  - showing current text selection
  - saving text selection to local storage
  - exporting saved selection in `json` format
- Context menu for handling selections in `background.js`
- Content script for reading DOM and sending/handling messages
