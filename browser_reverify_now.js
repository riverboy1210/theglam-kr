const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const scenarios = [
    { label: 'mobile', width: 390, height: 844 },
    { label: 'desktop', width: 1440, height: 900 },
  ];
  const routes = ['/', '/articles.html', '/reviews.html', '/hospitals.html', '/community.html'];
  const summary = [];

  for (const scenario of scenarios) {
    const page = await browser.newPage({ viewport: { width: scenario.width, height: scenario.height } });
    for (const route of routes) {
      const url = `https://www.theglam.kr${route}`;
      const failed = [];
      const jsErrors = [];

      page.removeAllListeners('response');
      page.removeAllListeners('pageerror');
      page.on('response', (r) => {
        if (r.status() >= 400 && !r.url().includes('cdn-cgi/rum')) {
          failed.push({ status: r.status(), url: r.url() });
        }
      });
      page.on('pageerror', (e) => jsErrors.push(e.message));

      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      await page.mouse.wheel(0, 1800);
      await page.waitForTimeout(350);

      const slug = route === '/' ? 'home' : route.replace('/', '').replace('.html', '');
      const shot = `reverify-${scenario.label}-${slug}.png`;
      await page.screenshot({ path: shot, fullPage: true });

      summary.push({
        view: scenario.label,
        route,
        title: await page.title(),
        screenshot: shot,
        failedCount: failed.length,
        jsErrorCount: jsErrors.length,
      });
    }
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(summary, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
