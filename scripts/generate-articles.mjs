import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const TRANSFORMED_FILE = join(ROOT, 'redesign', 'data', 'transformed', 'articles-transformed.json');
const IMAGE_MAP_FILE = join(ROOT, 'redesign', 'data', 'image-map.json');
const MOCKUP_ARTICLE_FILE = join(ROOT, 'redesign', 'mockup', 'article.html');
const MOCKUP_SHARED_CSS_FILE = join(ROOT, 'redesign', 'mockup', 'shared.css');

const BLOG_DIR = join(ROOT, 'site-mirror', 'blog');
const OUTPUT_DIR = join(ROOT, 'redesign', 'articles');
const OUTPUT_SHARED_CSS_FILE = join(OUTPUT_DIR, 'shared.css');
const REPORT_FILE = join(ROOT, 'redesign', 'data', 'migration-report.txt');

const FALLBACK_DISCLAIMER =
  '본 콘텐츠는 일반적인 정보 제공을 위한 참고 자료이며, 개인 상태에 따른 의료적 판단을 대체하지 않습니다. 정확한 진단과 시술 여부는 반드시 의료진 상담을 통해 결정하세요.';

const HERO_REGEX = /<img[^>]*class="blog-details-image"[^>]*src="([^"]+)"/i;
const BODY_REGEX_PRIMARY = /<div class="blog-details-rich-content w-richtext">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i;
const BODY_REGEX_FALLBACK = /<div class="blog-details-rich-content w-richtext">([\s\S]*?)<\/div>/i;
const TITLE_REGEX = /<h1[^>]*class="[^"]*blog-details-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i;
const AUTHOR_REGEX = /<div[^>]*class="[^"]*banner-news-author-name[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
const DATE_REGEX = /<div[^>]*class="[^"]*banner-news-date[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
const CDN_URL_REGEX = /https:\/\/cdn\.prod\.website-files\.com\/[^\s"'()<>]+/gi;

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

function stripTags(value) {
  return String(value ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function extractStyleBlock(mockupHtml) {
  const styleMatch = mockupHtml.match(/<style>[\s\S]*?<\/style>/i);
  if (!styleMatch) {
    throw new Error('Could not extract <style> block from redesign/mockup/article.html');
  }
  return styleMatch[0];
}

function rewriteCdnUrls(html, imageMap) {
  return String(html ?? '').replace(CDN_URL_REGEX, (url) => {
    const direct = imageMap[url];
    if (direct) return '../images/' + encodeURI(direct);

    const withoutQuery = url.split('?')[0];
    const noQueryMapped = imageMap[withoutQuery];
    if (noQueryMapped) return '../images/' + encodeURI(noQueryMapped);

    return url;
  });
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function renderChecklist(checklist) {
  const items = safeArray(checklist);
  if (items.length === 0) return '';

  const list = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  return `
          <div class="info-box checklist-box">
            <h3>✅ 체크리스트</h3>
            <ul class="checklist">
              ${list}
            </ul>
          </div>`;
}

function renderFaq(faq) {
  const items = safeArray(faq);
  if (items.length === 0) return '';

  const blocks = items
    .map((item) => {
      const q = escapeHtml(item?.question ?? '질문');
      const a = escapeHtml(item?.answer ?? '답변 준비 중입니다.');
      return `<details><summary>${q}</summary><p>${a}</p></details>`;
    })
    .join('');

  return `
          <section class="faq-section" style="margin-top:24px;">
            <h2>자주 묻는 질문</h2>
            ${blocks}
          </section>`;
}

function renderCrosscheckLinks(content) {
  const primaryLinks = safeArray(content?.cta?.primary?.links);
  const secondaryLinks = safeArray(content?.cta?.secondary?.links);
  const links = [...primaryLinks, ...secondaryLinks]
    .filter((link) => link && link.href)
    .map((link) => {
      const label = escapeHtml(link.label || link.href);
      const href = escapeAttr(link.href);
      return `<a href="${href}" target="_blank" rel="noopener">${label} ↗</a>`;
    })
    .join('');

  if (!links) return '<span>다른 플랫폼 링크가 준비 중입니다.</span>';
  return `<span>다른 플랫폼에서도 확인하기: </span>${links}`;
}

function renderHero(heroImageUrl, title) {
  if (!heroImageUrl) return '';
  return `
          <div class="article-hero-image" style="margin: 0 0 18px;">
            <img src="${escapeAttr(heroImageUrl)}" alt="${escapeAttr(title)}" style="width:100%;border-radius:12px;">
          </div>`;
}

function buildArticleHtml({ article, styleBlock, title, author, datePublished, heroImageUrl, bodyHtml }) {
  const seoTitle = article?.seo?.title || `${title} | 미녀는 괴로워`;
  const seoDescription = article?.seo?.metaDescription || '';
  const canonical = article?.seo?.canonical || `https://theglam.kr/articles/${article.slug}`;
  const badgeColor = article?.badgeColor || '#10B981';
  const contentTypeLabel = article?.contentTypeLabel || '아티클';
  const disclaimer = article?.content?.disclaimer || FALLBACK_DISCLAIMER;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(seoTitle)}</title>
  <meta name="description" content="${escapeAttr(seoDescription)}">
  <link rel="canonical" href="${escapeAttr(canonical)}">
  <link rel="stylesheet" href="./shared.css">
  ${styleBlock}
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="../mockup/index.html" class="logo">
        <span class="logo-ko">미녀는 괴로워</span>
        <span class="logo-en">THE GLAM</span>
      </a>
      <div class="header-search">
        <input type="search" class="header-search-input" placeholder="쌍꺼풀, 코성형, 리프팅...">
        <button type="button" class="header-search-btn">🔍</button>
      </div>
    </div>
  </header>

  <main class="main-content">
    <article class="article-page">
      <div class="article-layout">
        <article class="article-main">
          <div class="article-header">
            <div class="article-meta-top">
              <span class="badge" style="background:${escapeAttr(badgeColor)};color:#fff;">${escapeHtml(contentTypeLabel)}</span>
              <span class="article-date">${escapeHtml(datePublished)}</span>
            </div>
            <h1 class="article-title">${escapeHtml(title)}</h1>
            <div class="author-profile">
              <div class="avatar" style="width:40px;height:40px;border-radius:50%;background:#FFE0EC;display:flex;align-items:center;justify-content:center;">👩</div>
              <div><strong>${escapeHtml(author)} 에디터</strong></div>
            </div>
          </div>

          ${renderHero(heroImageUrl, title)}

          <div class="article-content">
            ${bodyHtml}
          </div>

          ${renderChecklist(article?.content?.checklist)}

          ${renderFaq(article?.content?.faq)}

          <p class="article-disclaimer">${escapeHtml(disclaimer)}</p>
        </article>

        <aside class="article-sidebar">
          <section class="card sidebar-card">
            <span class="badge" style="background:#ffe7ef;color:#d9336c;">상담 안내</span>
            <h3 style="margin:8px 0 4px;">THE GLAM · 미녀는 괴로워</h3>
            <div class="hospital-meta">
              <span>hello@theglam.kr</span>
              <span>02-333-3539</span>
            </div>
            <a href="../mockup/consultation.html" class="btn-primary" style="width:100%;">무료상담</a>
          </section>
        </aside>
      </div>

      <div class="article-cta-area">
        <p>이 시술에 관심이 있으신가요?</p>
        <a href="../mockup/consultation.html" class="btn-primary">💬 무료 상담 받아보기</a>
        <div class="crosscheck-links">
          ${renderCrosscheckLinks(article?.content)}
        </div>
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <strong>THE GLAM · 미녀는 괴로워</strong>
        <p style="margin: 4px 0 0;">성형 시술 정보 플랫폼 | theglam.kr</p>
      </div>
      <div class="footer-links">
        <a href="../mockup-v2/terms.html">이용약관</a>
        <a href="../mockup-v2/privacy.html">개인정보처리방침</a>
        <a href="mailto:hello@theglam.kr">문의하기</a>
      </div>
      <div style="margin: 8px 0; display: flex; gap: 16px; font-size: 0.8rem;">
        <a href="mailto:hello@theglam.kr" style="color: var(--text-muted); text-decoration: none;">hello@theglam.kr</a>
        <a href="tel:0233333539" style="color: var(--text-muted); text-decoration: none;">02-333-3539</a>
      </div>
      <p class="footer-disclaimer">본 플랫폼은 의료광고 심의 기준을 준수하며, 특정 의료기관의 우열을 단정하거나 환자 유치를 알선하지 않습니다. 시술 결과는 개인에 따라 다를 수 있습니다.</p>
    </div>
  </footer>

  <div class="floating-cta">
    <a href="../mockup/consultation.html" class="floating-cta-btn">💬 무료 상담 받아보기</a>
  </div>

  <nav class="bottom-nav">
    <a href="../mockup/index.html" class="bottom-nav-item">
      <span class="nav-icon">🏠</span>
      <span>홈</span>
    </a>
    <a href="../mockup/articles.html" class="bottom-nav-item active">
      <span class="nav-icon">🔍</span>
      <span>검색</span>
    </a>
    <a href="../mockup/reviews.html" class="bottom-nav-item">
      <span class="nav-icon">⭐</span>
      <span>후기</span>
    </a>
    <a href="../mockup/hospitals.html" class="bottom-nav-item">
      <span class="nav-icon">🏥</span>
      <span>병원</span>
    </a>
    <a href="../mockup/consultation.html" class="bottom-nav-item">
      <span class="nav-icon">👤</span>
      <span>마이</span>
    </a>
  </nav>
</body>
</html>
`;
}

function extractFromWebflow(html) {
  const hero = html.match(HERO_REGEX)?.[1]?.trim() || '';
  const title = stripTags(html.match(TITLE_REGEX)?.[1] || '');
  const author = stripTags(html.match(AUTHOR_REGEX)?.[1] || '');
  const date = stripTags(html.match(DATE_REGEX)?.[1] || '');

  const bodyMatch = html.match(BODY_REGEX_PRIMARY) || html.match(BODY_REGEX_FALLBACK);
  let body = bodyMatch?.[1] || '';
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '').trim();

  return { hero, title, author, date, body };
}

function sortBySlugFailures(a, b) {
  return a.slug.localeCompare(b.slug);
}

async function cleanOutputHtmlFiles() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const files = await readdir(OUTPUT_DIR, { withFileTypes: true });
  const htmlFiles = files.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.html'));

  await Promise.all(htmlFiles.map((entry) => unlink(join(OUTPUT_DIR, entry.name))));
}

async function main() {
  const transformedRaw = await readFile(TRANSFORMED_FILE, 'utf8');
  const transformed = JSON.parse(transformedRaw);
  const articles = safeArray(transformed.articles);

  const imageMapRaw = await readFile(IMAGE_MAP_FILE, 'utf8');
  const imageMap = JSON.parse(imageMapRaw);

  const mockupHtml = await readFile(MOCKUP_ARTICLE_FILE, 'utf8');
  const styleBlock = extractStyleBlock(mockupHtml);

  await cleanOutputHtmlFiles();

  const sharedCss = await readFile(MOCKUP_SHARED_CSS_FILE, 'utf8');
  await writeFile(OUTPUT_SHARED_CSS_FILE, sharedCss, 'utf8');

  let generatedCount = 0;
  let heroCount = 0;
  let faqCount = 0;
  let checklistCount = 0;
  const failures = [];

  for (const article of articles) {
    const slug = article?.slug;
    if (!slug) {
      failures.push({ slug: '(missing-slug)', error: 'Article has no slug' });
      continue;
    }

    const blogPath = join(BLOG_DIR, slug, 'index.html');
    let extracted = { hero: '', title: '', author: '', date: '', body: '' };

    try {
      const blogHtml = await readFile(blogPath, 'utf8');
      extracted = extractFromWebflow(blogHtml);
    } catch (error) {
      failures.push({ slug, error: `Read/parse failed: ${error.message}` });
    }

    const title = extracted.title || article?.content?.headline || article?.seo?.title || slug;
    const author = extracted.author || article?.author || 'THE GLAM';
    const datePublished = extracted.date || article?.datePublished || '';

    let heroSource = extracted.hero || article?.featuredImage || '';
    heroSource = rewriteCdnUrls(heroSource, imageMap);
    const heroImageUrl = heroSource || '';
    if (heroImageUrl) heroCount += 1;

    let bodyHtml = extracted.body || '<p>본문 콘텐츠를 불러오지 못했습니다.</p>';
    bodyHtml = rewriteCdnUrls(bodyHtml, imageMap);
    if (!bodyHtml.trim()) {
      bodyHtml = '<p>본문 콘텐츠가 비어 있습니다.</p>';
      failures.push({ slug, error: 'Empty body extracted' });
    }

    const faqItems = safeArray(article?.content?.faq);
    if (faqItems.length > 0) faqCount += 1;

    const checklistItems = safeArray(article?.content?.checklist);
    if (checklistItems.length > 0) checklistCount += 1;

    const html = buildArticleHtml({
      article,
      styleBlock,
      title,
      author,
      datePublished,
      heroImageUrl,
      bodyHtml,
    });

    const targetFile = join(OUTPUT_DIR, `${slug}.html`);
    await writeFile(targetFile, html, 'utf8');
    generatedCount += 1;
  }

  failures.sort(sortBySlugFailures);

  const reportLines = [
    'THE GLAM Article Migration Report',
    `Generated at: ${new Date().toISOString()}`,
    '',
    `Total articles generated: ${generatedCount}`,
    `Total with hero images: ${heroCount}`,
    `Total with FAQs: ${faqCount}`,
    `Total with checklists: ${checklistCount}`,
    '',
    'Failures:',
  ];

  if (failures.length === 0) {
    reportLines.push('- none');
  } else {
    for (const failure of failures) {
      reportLines.push(`- ${failure.slug}: ${failure.error}`);
    }
  }

  await writeFile(REPORT_FILE, reportLines.join('\n') + '\n', 'utf8');

  console.log(`Generated ${generatedCount} article pages.`);
  console.log(`Hero images: ${heroCount}, FAQs: ${faqCount}, checklists: ${checklistCount}`);
  console.log(`Report: ${basename(REPORT_FILE)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
