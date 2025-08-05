function openOptionsPage() {
  var optionsPath = 'options/options.html';
  var optionsUrl = chrome.runtime.getURL(optionsPath);
  chrome.tabs.create({url: optionsUrl});
}

chrome.action.onClicked.addListener(function(tab) {
  openOptionsPage();
});
