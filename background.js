function openOptionsPage() {
  var optionsPath = 'options/options.html';
  var optionsUrl = chrome.extension.getURL(optionsPath);
  chrome.tabs.create({url: optionsPath});
}

chrome.action.onClicked.addListener(function(tab) {
  openOptionsPage();
});
