const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Check deployed CSS for our changes
  const cssResponse = await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/styles.css');
  const cssText = await page.content();
  
  // Wait, that's HTML. Let me use fetch instead
  await page.goto('about:blank');
  const css = await page.evaluate(async () => {
    const res = await fetch('https://bucolic-brigadeiros-89a8e1.netlify.app/styles.css');
    const text = await res.text();
    const hasMinHeight100 = text.includes('html {') && text.includes('min-height: 100%');
    const hasBodyMinHeight = text.includes('body {') && text.includes('min-height: 100vh');
    return { hasMinHeight100, hasBodyMinHeight };
  });
  
  console.log('CSS checks:', JSON.stringify(css, null, 2));
  await browser.close();
})();
