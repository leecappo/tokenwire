const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.ts-card'));
    const cardData = cards.slice(0, 2).map((card, i) => {
      const rect = card.getBoundingClientRect();
      const img = card.querySelector('.ts-img');
      const body = card.querySelector('.ts-body');
      const title = card.querySelector('.ts-title');
      return {
        index: i,
        cardTop: rect.top,
        cardHeight: rect.height,
        cardWidth: rect.width,
        imgExists: !!img,
        imgHeight: img ? img.getBoundingClientRect().height : 0,
        bodyExists: !!body,
        bodyHeight: body ? body.getBoundingClientRect().height : 0,
        titleExists: !!title,
        titleText: title ? title.textContent?.substring(0, 50) : 'N/A',
        titleHeight: title ? title.getBoundingClientRect().height : 0,
      };
    });
    
    // Check image elements specifically
    const heroImg = document.querySelector('#hero-img');
    const heroImgRect = heroImg ? heroImg.getBoundingClientRect() : null;
    
    return {
      cardData,
      heroImgRect,
      bodyHeight: document.body.scrollHeight,
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
