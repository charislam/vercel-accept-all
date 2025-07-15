chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.command === "approveAllVercelTabs") {
    chrome.tabs.query({}, function (tabs) {
      const authorizeTabs = tabs.filter((tab) =>
        tab.url && tab.url.includes("https://vercel.com/git/authorize")
      );

      authorizeTabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const authorizeButton = document.querySelector(
              "div.geist-wrapper > div > div > button"
            );
            if (authorizeButton) {
              authorizeButton.click();
              setTimeout(() => {
                window.close();
              });
            }
          }
        });
      });
    });
    sendResponse({ status: "done" });
    return true;
  }
}); 