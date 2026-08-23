const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Inject debug CSS to see what's painting
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent = `
      body { outline: 4px solid lime !important; }
      main { outline: 4px solid red !important; }
      section.hero { outline: 4px solid blue !important; }
      .topstories-section { outline: 4px solid orange !important; }
      .ts-card { outline: 2px solid pink !important; }
      .hero-card { outline: 3px solid cyan !important; }
    `;
    document.head.appendChild(style);
  });
  
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/debug_paint.png', fullPage: true });
  console.log('Screenshot saved');
  await browser.close();
})();
