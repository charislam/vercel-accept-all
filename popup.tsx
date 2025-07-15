import { sendToContentScript } from "@plasmohq/messaging"
import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  const [returnId, setReturnId] = useStorage("returnTabId")

  async function handleClick(command) {
    const currentTab = await getCurrentTab()
    if (currentTab) {
      setReturnId(currentTab.id)
    }
    await sendToContentScript({ name: command })
  }

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
  }

  return (
    <div style={{ width: "720px", fontFamily: "monospace", padding: "12px" }}>
      <h1 style={{ margin: "0" }}>vercel-accept-all</h1>
      <p>Approve all vercel deployments in 2 clicks</p>
      <p>Only works when viewing a Pull Request on GitHub</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => handleClick("openTabs")}>
          Open all authorization tabs
        </button>
        <button onClick={() => {
          chrome.runtime.sendMessage({ command: "approveAllVercelTabs" })
        }}>
          Approve all Vercel tabs
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
