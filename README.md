# Example Chrome extension

Chrome extension initially built on top of [these instructions](https://developer.chrome.com/extensions/getstarted), with more features added while learning.

## Usage

1. Open the Extension Management page by navigating to `chrome://extensions`.
1. Enable Developer Mode by clicking the toggle switch next to Developer mode.
1. Click the `LOAD UNPACKED` button and select the extension directory.

## Features

- Browser action pop-up for
  - changing background color by clicking square (with extension options for choosing color, this comes from the original tutorial)
  - showing current text selection in the popup
  - saving current text selection to local storage by host name
  - exporting saved selections in `json` format
  - opening new extension window showing saved selections
- Context menu for highlighting selections, works by passing messages so that the background script can do something with the selection as well
- Content script for reading DOM and notifying background script if page contains given content
