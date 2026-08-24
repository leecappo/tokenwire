/* TokenWire - live site smoke test */
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const url = 'https://bucolic-brigadeiros-89a8e1.netlify.app/';
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);

  const result = {
    url,
    heroTitle: await page.$eval('#hero-title', el => el.textContent.trim()).catch(() => 'MISSING'),
    liveText: await page.$eval('#tw-live-text', el => el.textContent.trim()).catch(() => 'MISSING'),
    listRows: await page.locator('.latest-list .list-row').count(),
    topCards: await page.locator('.topstories .ts-card').count(),
    featureCards: await page.locator('.features .feature-card').count(),
    sidebar: await page.$eval('#sidebar-markets', el => el.textContent.trim()).catch(() => 'MISSING'),
    bodyHeight: await page.evaluate(() => document.body.scrollHeight),
    htmlLength: await page.evaluate(() => document.documentElement.outerHTML.length),
  };

  console.log(JSON.stringify(result, null, 2));
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/live_site.png', fullPage: true });
  await browser.close();
})();
