const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const dom = await page.evaluate(() => {
    const body = document.body;
    
    // Get all direct children of body
    const bodyChildren = Array.from(body.children).map(el => ({
      tag: el.tagName.toLowerCase(),
      id: el.id || '',
      className: el.className || '',
      position: getComputedStyle(el).position,
      childCount: el.children.length,
    }));
    
    // Check if ticker contains main (which would be a bug)
    const ticker = document.querySelector('.ticker');
    const tickerContainsMain = ticker ? ticker.contains(document.querySelector('main')) : false;
    
    // Get actual DOM order
    const mainEl = document.querySelector('main');
    const mainIndex = mainEl ? Array.from(body.children).indexOf(mainEl) : -1;
    const tickerIndex = ticker ? Array.from(body.children).indexOf(ticker) : -1;
    
    return {
      bodyChildrenCount: body.children.length,
      bodyChildren: bodyChildren.slice(0, 10),
      tickerContainsMain,
      mainIndex,
      tickerIndex,
    };
  });

  console.log(JSON.stringify(dom, null, 2));
  await browser.close();
})();
