const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    const main = document.querySelector('main');
    return {
      bodyHeight: body.scrollHeight,
      htmlHeight: html.scrollHeight,
      bodyClientHeight: body.clientHeight,
      mainHeight: main ? main.scrollHeight : 0,
      bodyBg: getComputedStyle(body).backgroundColor,
      htmlBg: getComputedStyle(html).backgroundColor,
      mainBg: main ? getComputedStyle(main).backgroundColor : 'N/A',
      tsCards: document.querySelectorAll('.ts-card').length,
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/check_live_screenshot.png', fullPage: true });
  await browser.close();
})();
