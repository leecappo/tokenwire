const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const ancestors = await page.evaluate(() => {
    const card = document.querySelector('.ts-card');
    if (!card) return { error: 'no card' };
    
    const path = [];
    let el = card;
    while (el && el !== document.documentElement) {
      const style = getComputedStyle(el);
      path.push({
        tag: el.tagName.toLowerCase(),
        className: el.className || '',
        id: el.id || '',
        position: style.position,
        zIndex: style.zIndex,
        overflow: style.overflow,
        visibility: style.visibility,
        opacity: style.opacity,
        display: style.display,
        backgroundColor: style.backgroundColor,
        transform: style.transform,
      });
      el = el.parentElement;
    }
    return { path };
  });

  console.log(JSON.stringify(ancestors, null, 2));
  await browser.close();
})();
