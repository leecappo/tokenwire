const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Inject debug styling after page load
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'debug-outlines';
    style.textContent = `
      body { outline: 4px solid lime !important; }
      main { outline: 4px solid red !important; background: rgba(255,0,0,0.1) !important; }
      section.hero { outline: 4px solid blue !important; }
      .topstories-section { outline: 4px solid orange !important; }
      .ts-card { outline: 2px solid pink !important; }
      .hero-card { outline: 3px solid cyan !important; background: rgba(0,255,255,0.1) !important; }
      .container { outline: 1px dashed white !important; }
    `;
    document.head.appendChild(style);
  });

  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/debug_inject.png', fullPage: true });
  console.log('Screenshot with injected outlines saved');
  
  const info = await page.evaluate(() => {
    return {
      bodyHeight: document.body.scrollHeight,
      mainExists: !!document.querySelector('main'),
      heroExists: !!document.querySelector('.hero'),
      tsSectionExists: !!document.querySelector('.topstories-section'),
      tsCards: document.querySelectorAll('.ts-card').length,
      outlineStyleInjected: !!document.getElementById('debug-outlines'),
    };
  });
  console.log('Info:', JSON.stringify(info, null, 2));
  
  await browser.close();
})();
