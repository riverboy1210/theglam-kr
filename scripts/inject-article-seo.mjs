import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CATALOG_FILE = join(ROOT, 'redesign', 'data', 'articles-catalog.json');
const ARTICLES_DIR = join(ROOT, 'redesign', 'articles');

const SITE_URL = 'https://theglam.kr';
const BRAND_TITLE_SUFFIX = ' | 미녀는 괴로워';
const SITE_NAME = '미녀는 괴로워 THE GLAM';
const PUBLISHER_NAME = '미녀는 괴로워';
const FALLBACK_IMAGE = 'https://theglam.kr/logo.png';

function escapeAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function parseDateToIso(dateValue) {
  const raw = String(dateValue ?? '').trim();
  if (!raw) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  const match = raw.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s*(\d{4})$/);
  if (!match) return '';

  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  const month = months[match[1]];
  if (!month) return '';

  const day = String(Number.parseInt(match[2], 10)).padStart(2, '0');
  const year = match[3];
  return `${year}-${month}-${day}`;
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (Array.isArray(value)) {
      const found = value.find((item) => String(item ?? '').trim() !== '');
      if (found) return String(found).trim();
      continue;
    }

    const text = String(value ?? '').trim();
    if (text) return text;
  }
  return '';
}

function normalizeKeywords(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? '').trim()).filter(Boolean);
  }
  if (!value) return [];
  return [String(value).trim()].filter(Boolean);
}

function addImgAttribute(tag, name, value) {
  const attributePattern = new RegExp(`\\b${name}\\s*=`, 'i');
  if (attributePattern.test(tag)) return tag;

  if (/\/>\s*$/.test(tag)) {
    return tag.replace(/\/>\s*$/, ` ${name}="${value}"/>`);
  }
  return tag.replace(/>\s*$/, ` ${name}="${value}">`);
}

function ensureImageAttributes(html) {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    let updated = addImgAttribute(tag, 'loading', 'lazy');
    updated = addImgAttribute(updated, 'decoding', 'async');
    return updated;
  });
}

function hasOgTags(headContent) {
  return /<meta\s+property=["']og:type["']/i.test(headContent);
}

function hasTwitterTags(headContent) {
  return /<meta\s+name=["']twitter:card["']/i.test(headContent);
}

function hasArticleJsonLd(headContent) {
  return /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?"@type"\s*:\s*"Article"[\s\S]*?<\/script>/i.test(headContent);
}

function hasBreadcrumbJsonLd(headContent) {
  return /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?"@type"\s*:\s*"BreadcrumbList"[\s\S]*?<\/script>/i.test(headContent);
}

function buildSeoInjection(meta) {
  const titleWithSuffix = `${meta.title}${BRAND_TITLE_SUFFIX}`;
  const articleUrl = `${SITE_URL}/articles/${meta.slug}`;

  const ogBlock = [
    '<meta property="og:type" content="article">',
    `<meta property="og:title" content="${escapeAttr(titleWithSuffix)}">`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}">`,
    `<meta property="og:url" content="${escapeAttr(articleUrl)}">`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}">`,
    '<meta property="og:locale" content="ko_KR">',
    `<meta property="og:image" content="${escapeAttr(meta.featuredImage)}">`,
    `<meta property="article:published_time" content="${escapeAttr(meta.datePublished)}">`,
    `<meta property="article:modified_time" content="${escapeAttr(meta.dateModified)}">`,
    `<meta property="article:author" content="${escapeAttr(meta.author)}">`,
    `<meta property="article:section" content="${escapeAttr(meta.category)}">`,
  ].join('\n  ');

  const twitterBlock = [
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeAttr(titleWithSuffix)}">`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}">`,
    `<meta name="twitter:image" content="${escapeAttr(meta.featuredImage)}">`,
  ].join('\n  ');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: meta.featuredImage,
    author: {
      '@type': 'Person',
      name: meta.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: meta.category,
    keywords: meta.keywords,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/mockup/articles.html` },
      { '@type': 'ListItem', position: 3, name: meta.title },
    ],
  };

  return {
    ogBlock,
    twitterBlock,
    articleJsonLd: JSON.stringify(articleJsonLd, null, 2),
    breadcrumbJsonLd: JSON.stringify(breadcrumbJsonLd, null, 2),
  };
}

async function loadCatalog() {
  const raw = await readFile(CATALOG_FILE, 'utf8');
  const parsed = JSON.parse(raw);
  const articles = Array.isArray(parsed.articles) ? parsed.articles : [];

  const bySlug = new Map();
  for (const item of articles) {
    const slug = String(item?.slug ?? '').trim();
    if (!slug) continue;
    bySlug.set(slug, item);
  }

  return bySlug;
}

function buildArticleMeta(catalogItem, slug) {
  const title = firstNonEmpty(catalogItem?.title, slug);
  const description = firstNonEmpty(catalogItem?.description, title);
  const author = firstNonEmpty(catalogItem?.author, 'THE GLAM');

  const published = parseDateToIso(catalogItem?.datePublished);
  const modified = parseDateToIso(catalogItem?.dateModified) || published;

  const featuredImage = firstNonEmpty(catalogItem?.featuredImage, FALLBACK_IMAGE);
  const category = firstNonEmpty(
    catalogItem?.articleSection,
    catalogItem?.breadcrumbCategory,
    catalogItem?.contentType,
    '블로그'
  );

  return {
    slug,
    title,
    description,
    author,
    datePublished: published,
    dateModified: modified,
    featuredImage,
    category,
    keywords: normalizeKeywords(catalogItem?.keywords),
  };
}

function injectIntoHead(html, blocksToInject) {
  const headClosePattern = /<\/head>/i;
  const match = html.match(headClosePattern);
  if (!match) return null;

  const injection = `\n  ${blocksToInject.join('\n\n  ')}\n`;
  return html.replace(headClosePattern, `${injection}</head>`);
}

async function main() {
  const catalogBySlug = await loadCatalog();
  const entries = await readdir(ARTICLES_DIR, { withFileTypes: true });
  const htmlFiles = entries
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === '.html')
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  let total = 0;
  let updated = 0;
  let unchanged = 0;
  let failed = 0;
  let missingCatalog = 0;

  for (const fileName of htmlFiles) {
    total += 1;
    const slug = parse(fileName).name;
    const catalogItem = catalogBySlug.get(slug);
    if (!catalogItem) {
      missingCatalog += 1;
      failed += 1;
      console.error(`[FAIL] ${fileName}: catalog entry not found`);
      continue;
    }

    const filePath = join(ARTICLES_DIR, fileName);
    try {
      const originalHtml = await readFile(filePath, 'utf8');
      const headMatch = originalHtml.match(/<head>[\s\S]*?<\/head>/i);
      if (!headMatch) {
        failed += 1;
        console.error(`[FAIL] ${fileName}: <head> block not found`);
        continue;
      }

      const headContent = headMatch[0];
      const meta = buildArticleMeta(catalogItem, slug);
      const built = buildSeoInjection(meta);

      const blocksToInject = [];
      if (!hasOgTags(headContent)) {
        blocksToInject.push(built.ogBlock);
      }
      if (!hasTwitterTags(headContent)) {
        blocksToInject.push(built.twitterBlock);
      }
      if (!hasArticleJsonLd(headContent)) {
        blocksToInject.push(`<script type="application/ld+json">\n${built.articleJsonLd}\n  </script>`);
      }
      if (!hasBreadcrumbJsonLd(headContent)) {
        blocksToInject.push(`<script type="application/ld+json">\n${built.breadcrumbJsonLd}\n  </script>`);
      }

      let nextHtml = originalHtml;
      if (blocksToInject.length > 0) {
        const injected = injectIntoHead(nextHtml, blocksToInject);
        if (!injected) {
          failed += 1;
          console.error(`[FAIL] ${fileName}: failed injecting into <head>`);
          continue;
        }
        nextHtml = injected;
      }

      nextHtml = ensureImageAttributes(nextHtml);

      if (nextHtml !== originalHtml) {
        await writeFile(filePath, nextHtml, 'utf8');
        updated += 1;
        console.log(`[OK]   ${fileName}`);
      } else {
        unchanged += 1;
        console.log(`[SKIP] ${fileName}`);
      }
    } catch (error) {
      failed += 1;
      console.error(`[FAIL] ${fileName}: ${error.message}`);
    }
  }

  console.log('\nSEO injection report');
  console.log('--------------------');
  console.log(`Total files: ${total}`);
  console.log(`Updated: ${updated}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Failed: ${failed}`);
  console.log(`Missing catalog entries: ${missingCatalog}`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('Fatal:', error.message);
  process.exit(1);
});
