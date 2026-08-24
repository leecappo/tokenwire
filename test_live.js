/* TokenWire - live data smoke test */
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:8767/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);

  const state = await page.evaluate(() => {
    const heroTitle = document.getElementById('hero-title')?.textContent || '';
    const liveText = document.getElementById('tw-live-text')?.textContent || '';
    const listRows = document.querySelectorAll('.list-row').length;
    const topCards = document.querySelectorAll('#topstories .ts-card').length;
    const featureCards = document.querySelectorAll('#features .feature-card').length;
    const sidebar = document.querySelector('#sidebar-markets')?.textContent || '';
    const bodyHeight = document.body.scrollHeight;
    const html = document.documentElement.outerHTML.slice(0, 200);
    return {
      heroTitle: heroTitle.slice(0, 100),
      liveText,
      listRows,
      topCards,
      featureCards,
      sidebar: sidebar.slice(0, 200),
      bodyHeight,
      html
    };
  });

  console.log(JSON.stringify(state, null, 2));
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
