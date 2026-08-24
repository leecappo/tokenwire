const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(msg.type() + ': ' + msg.text()));
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  const tickerPrices = await page.$$eval('.ticker-price', els => els.map(e => e.textContent.trim()));
  const sidebarRows = await page.$$eval('#sidebar-markets .trending-item', els => els.map(e => e.textContent.trim().replace(/\s+/g, ' ')));
  const liveText = await page.$eval('#tw-live-text', el => el.textContent.trim()).catch(() => 'MISSING');
  console.log(JSON.stringify({ liveText, tickerPrices, sidebarRows, consoleLogs: consoleLogs.slice(-30) }, null, 2));
  await browser.close();
})();
