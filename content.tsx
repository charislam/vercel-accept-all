import { useMessage } from "@plasmohq/messaging/hook"

const openVercelLinks = () => {
  const vercelItems = Array.from(
    document.body.querySelectorAll(
      "[aria-label='Checks'] [aria-label='failing checks'] li[aria-label^='Vercel']"
    )
  )
  const hrefs = vercelItems.map((item) =>
    item.querySelector("a[href^='https://vercel.com']")?.getAttribute("href")
  )

  hrefs.forEach((href) => {
    if (href) {
      window.open(href, "_blank")
    }
  })

  return hrefs
}

const ContentScript = () => {
  useMessage<string, {}>(async (req, res) => {
    const { name } = req
    if (name === "openTabs") {
      openVercelLinks()
    }
  })
}

export default ContentScript
