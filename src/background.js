/* eslint-disable no-undef */
import { getOpenTabs, categorizeTabs } from "./categorizer";

chrome.runtime.onInstalled.addListener(() => {
  console.log("IntelliTab has been installed!");
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log(`Tab ${tabId} has finished loading.`);

    // Fetch and categorize the open tabs
    const openTabs = await getOpenTabs();
    const categorizedTabs = await categorizeTabs(openTabs);

    // Send the categorized tabs to the extension popup
    chrome.runtime.sendMessage({ tabs: categorizedTabs });
  }
});
