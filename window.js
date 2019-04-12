const stored = document.getElementById("stored");

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let key in changes) {
    let storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed. ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      JSON.stringify(storageChange.oldValue),
      JSON.stringify(storageChange.newValue)
    );
  }
  updateShownSaved();
});

function updateShownSaved() {
  chrome.storage.local.get(null, function(items) {
    console.log(`Stored: ${JSON.stringify(items)}`);
    stored.innerHTML = JSON.stringify(items);
  });
}

updateShownSaved();
