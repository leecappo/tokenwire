const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Intercept response to verify CSS is loaded
  await page.route('**/*.css', route => {
    route.continue();
  });
  
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);

  // Check if body/html/min-height are applied
  const cssCheck = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const main = document.querySelector('main');
    
    const htmlStyle = getComputedStyle(html);
    const bodyStyle = getComputedStyle(body);
    const mainStyle = getComputedStyle(main);
    
    return {
      html: {
        minHeight: htmlStyle.minHeight,
        height: htmlStyle.height,
      },
      body: {
        minHeight: bodyStyle.minHeight,
        height: bodyStyle.height,
        position: bodyStyle.position,
        background: bodyStyle.backgroundColor,
      },
      main: {
        minHeight: mainStyle.minHeight,
        height: mainStyle.height,
        background: mainStyle.backgroundColor,
      }
    };
  });

  console.log('CSS Diagnostics:', JSON.stringify(cssCheck, null, 2));
  
  // Force body background to red to see if it paints
  await page.evaluate(() => {
    document.body.style.background = 'rgba(255, 0, 0, 0.3)';
    document.body.style.minHeight = '100vh';
  });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/leedan/Desktop/cryptonews/final_diagnostic.png', fullPage: true });
  console.log('Screenshot saved with forced red body background');
  
  await browser.close();
})();
