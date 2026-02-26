const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const scenarios = [
    { label: 'mobile', width: 390, height: 844 },
    { label: 'desktop', width: 1440, height: 900 },
  ];
  const pages = [
    { key: 'home', path: '/' },
    { key: 'articles', path: '/articles.html' },
    { key: 'hospitals', path: '/hospitals.html' },
  ];

  const report = [];

  for (const scenario of scenarios) {
    const page = await browser.newPage({
      viewport: { width: scenario.width, height: scenario.height },
    });

    for (const target of pages) {
      const url = `https://www.theglam.kr${target.path}`;
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
      await page.mouse.wheel(0, 1600);
      await page.waitForTimeout(350);

      const shot = `direct-${scenario.label}-${target.key}.png`;
      await page.screenshot({ path: shot, fullPage: true });

      report.push({
        view: scenario.label,
        page: target.key,
        title: await page.title(),
        screenshot: shot,
        failedCount: failed.length,
        jsErrorCount: jsErrors.length,
      });
    }

    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
