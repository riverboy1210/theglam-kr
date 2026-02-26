const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const checks = [];
  const scenarios = [
    { label: 'mobile', width: 390, height: 844 },
    { label: 'desktop', width: 1440, height: 900 },
  ];

  for (const scenario of scenarios) {
    const page = await browser.newPage({
      viewport: { width: scenario.width, height: scenario.height },
    });

    await page.goto('https://www.theglam.kr/', { waitUntil: 'networkidle' });
    await page.mouse.wheel(0, 1400);
    await page.waitForTimeout(300);
    checks.push({ view: scenario.label, page: 'home', title: await page.title() });

    await page.goto('https://www.theglam.kr/articles.html', { waitUntil: 'networkidle' });
    await page.mouse.wheel(0, 1800);
    await page.waitForTimeout(300);
    const first3 = await page.$$eval('#articles-grid .article-card h3', (els) =>
      els.slice(0, 3).map((e) => e.textContent.trim())
    );
    checks.push({ view: scenario.label, page: 'articles', first3 });

    await page.goto('https://www.theglam.kr/hospitals.html', { waitUntil: 'networkidle' });
    await page.mouse.wheel(0, 1600);
    await page.waitForTimeout(300);
    const hospitals = await page.$$eval('.hospital-name', (els) =>
      els.slice(0, 6).map((e) => e.textContent.trim())
    );
    checks.push({ view: scenario.label, page: 'hospitals', hospitals });

    await page.goto('https://www.theglam.kr/community.html', { waitUntil: 'networkidle' });
    const categories = ['전체', '눈', '코', '얼굴윤곽', '피부', '바디', '리프팅', '필러/보톡스'];
    const counts = {};
    for (const c of categories) {
      await page.getByRole('button', { name: c, exact: true }).click();
      await page.waitForTimeout(100);
      counts[c] = Number(await page.$eval('#post-count', (el) => el.textContent.trim()));
    }
    checks.push({ view: scenario.label, page: 'community', counts });

    await page.screenshot({ path: `direct-check-${scenario.label}-community.png`, fullPage: true });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(checks, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
