const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://bucolic-brigadeiros-89a8e1.netlify.app/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    const hero = document.querySelector('.hero');
    const tsSection = document.querySelector('.topstories-section');
    const firstCard = document.querySelector('.ts-card');
    
    return {
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      bodyHeight: document.body.scrollHeight,
      htmlHeight: document.documentElement.scrollHeight,
      mainTop: main ? main.getBoundingClientRect().top : 0,
      mainBottom: main ? main.getBoundingClientRect().bottom : 0,
      heroTop: hero ? hero.getBoundingClientRect().top : 0,
      heroBottom: hero ? hero.getBoundingClientRect().bottom : 0,
      tsTop: tsSection ? tsSection.getBoundingClientRect().top : 0,
      tsBottom: tsSection ? tsSection.getBoundingClientRect().bottom : 0,
      cardTop: firstCard ? firstCard.getBoundingClientRect().top : 0,
      cardBottom: firstCard ? firstCard.getBoundingClientRect().bottom : 0,
      cardOpacity: firstCard ? getComputedStyle(firstCard).opacity : 0,
      cardDisplay: firstCard ? getComputedStyle(firstCard).display : 'N/A',
      cardVisibility: firstCard ? getComputedStyle(firstCard).visibility : 'N/A',
      cardPosition: firstCard ? getComputedStyle(firstCard).position : 'N/A',
      cardZIndex: firstCard ? getComputedStyle(firstCard).zIndex : 'N/A',
      cardTransform: firstCard ? getComputedStyle(firstCard).transform : 'N/A',
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
