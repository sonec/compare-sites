// @ts-check
const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch()
  const page = await browser.newPage()
  const seenURLs = new Set()
  const crawl = async (url, home) => {
    if (seenURLs.has(url)) {
      return
    }
    seenURLs.add(url)
    if (!url.startsWith(home)) {
      return
    }
    console.log(`Visiting ${url}`)
    await page.goto(url)
    await page.waitForSelector('body')
    const urls = await page.$$eval('a', (elements) =>
      elements.map((el) => el.href),
    )
    for await (const u of urls) {
      await crawl(u, home)
    }
  }
  let start = 'https://www.example.com'
  let base = start
  await crawl(start,base)
  console.log(seenURLs)
  await browser.close()
})()