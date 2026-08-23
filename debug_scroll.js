const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Inject background colors
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = `
      body { background: rgba(255, 0, 0, 0.2) !important; }
      main { background: rgba(0, 255, 0, 0.3) !important; }
      section.hero { background: rgba(0, 0, 255, 0.3) !important; }
      .ts-card { background: rgba(255, 255, 0, 0.3) !important; }
    `;
    document.head.appendChild(style);
  });

  // Screenshot at top
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/debug_scroll_top.png', fullPage: true });
  
  // Scroll down
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/debug_scroll_800.png', fullPage: true });
  
  // Scroll to middle
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/debug_scroll_1500.png', fullPage: true });
  
  console.log('Screenshots saved at different scroll positions');
  await browser.close();
})();
