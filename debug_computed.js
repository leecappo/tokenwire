const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const card = document.querySelector('.ts-card');
    if (!card) return { error: 'no card' };
    
    const h3 = card.querySelector('h3');
    const bodyDiv = card.querySelector('.ts-body');
    const cardRect = card.getBoundingClientRect();
    const h3Rect = h3 ? h3.getBoundingClientRect() : null;
    const bodyRect = bodyDiv ? bodyDiv.getBoundingClientRect() : null;
    
    const h3Styles = h3 ? getComputedStyle(h3) : null;
    const bodyStyles = bodyDiv ? getComputedStyle(bodyDiv) : null;
    
    return {
      cardRect: { top: cardRect.top, bottom: cardRect.bottom, height: cardRect.height },
      h3Rect: h3Rect ? { top: h3Rect.top, bottom: h3Rect.bottom, height: h3Rect.height } : null,
      bodyRect: bodyRect ? { top: bodyRect.top, bottom: bodyRect.bottom, height: bodyRect.height } : null,
      h3Styles: h3Styles ? {
        color: h3Styles.color,
        display: h3Styles.display,
        visibility: h3Styles.visibility,
        opacity: h3Styles.opacity,
        position: h3Styles.position,
        fontFamily: h3Styles.fontFamily,
        fontSize: h3Styles.fontSize,
      } : null,
      bodyStyles: bodyStyles ? {
        color: bodyStyles.color,
        background: bodyStyles.backgroundColor,
        overflow: bodyStyles.overflow,
        height: bodyStyles.height,
      } : null,
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
