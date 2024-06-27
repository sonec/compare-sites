// @ts-check
const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch()
  const page = await browser.newPage()
  const seenURLs = new Set()
  let found = {}
  const crawl = async (url, home) => {
    if (seenURLs.has(url)) {
      return
    }
    seenURLs.add(url)
    if (!url.startsWith(home)) {
      return
    }
    let path = new URL(url).pathname
    let key = path.replace(/\//g, '_')
    if(!found[key]){
        found[key] = path
        console.log(`\t"${key}":"${path}"`);
    }
    await page.goto(url)
    await page.waitForSelector('body')
    const urls = await page.$$eval('a', (elements) =>
      elements.map((el) => el.href),
    )
    for await (const u of urls) {
      await crawl(u, home)
    }
  }
  let start = 'https://www.google.com'
  let base = start
  console.log("{")
  await crawl(start,base)
  console.log("}")
  await browser.close()
})()