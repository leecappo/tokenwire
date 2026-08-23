const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Change main background to bright color
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'debug-color';
    style.textContent = `
      main { background: rgba(255, 0, 0, 0.3) !important; }
      section.hero { background: rgba(0, 255, 0, 0.3) !important; }
      .ts-card { background: rgba(0, 0, 255, 0.3) !important; }
    `;
    document.head.appendChild(style);
  });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/debug_color.png', fullPage: true });
  console.log('Screenshot with color injection saved');
  await browser.close();
})();
