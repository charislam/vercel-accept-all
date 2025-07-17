chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.command === "approveAllVercelTabs") {
    chrome.tabs.query({}, function (tabs) {
      const authorizeTabs = tabs.filter(
        (tab) => tab.url && tab.url.includes("https://vercel.com/git/authorize")
      )

      for (const tab of authorizeTabs) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            function waitForButton() {
              return new Promise((resolve) => {
                const maxAttempts = 50
                let attempts = 0

                function checkForButton() {
                  const authorizeButton = document.querySelector(
                    "div.geist-wrapper > div > div > button"
                  )

                  if (authorizeButton || attempts >= maxAttempts) {
                    authorizeButton?.click()
                    setTimeout(() => {
                      window.close()
                    })
                    resolve()
                  } else {
                    attempts++
                    setTimeout(checkForButton, 100)
                  }
                }

                // Check if document is ready
                if (document.readyState === "loading") {
                  document.addEventListener("DOMContentLoaded", checkForButton)
                } else {
                  checkForButton()
                }
              })
            }

            waitForButton()
          }
        })
      }
    })
    sendResponse({ status: "done" })
    return true
  }
})
