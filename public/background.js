chrome.runtime.onInstalled.addListener(() => {
  console.log("IntelliTab has been installed!");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log(`Tab ${tabId} has finished loading.`);
  }
});
