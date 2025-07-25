chrome.action.onClicked.addListener((tab) => {
  openInIncognito(tab.url);
});

chrome.contextMenus.create({
  id: "open-in-incognito",
  title: "Open this page in incognito",
  contexts: ["page"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-in-incognito") {
    openInIncognito(tab.url);
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "open_in_incognito") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) openInIncognito(tabs[0].url);
    });
  }
});

function openInIncognito(url) {
  chrome.windows.create({
    url,
    incognito: true
  });
}
