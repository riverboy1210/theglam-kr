import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'site-mirror', 'blog');
const OUTPUT_DIR = join(ROOT, 'redesign', 'data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'articles-catalog.json');

// Category to ContentType mapping (from TRANSFORMATION_PIPELINE.md)
const CATEGORY_MAP = {
  '\uBE44\uC6A9 \uBE44\uAD50': 'PRICE',
  '\uC548\uC804 \uC815\uBCF4': 'SAFETY',
  '\uD68C\uBCF5 \uAD00\uB9AC': 'RECOVERY',
  '\uD68C\uBCF5\uAD00\uB9AC': 'RECOVERY',
  '\uBCD1\uC6D0 \uC120\uD0DD': 'CLINIC_CHOICE',
  '\uC2DC\uC220 \uBC0F \uC218\uC220': 'CLINIC_CHOICE',
  '\uC2DC\uC220\uBC0F\uC218\uC220': 'CLINIC_CHOICE',
};

// Keyword-based fallback classification
const KEYWORD_PATTERNS = {
  PRICE: /\uAC00\uACA9|\uBE44\uC6A9|\uACAC\uC801|\uC774\uBCA4\uD2B8\uAC00|\uD560\uC778|\uCD1D\uBE44\uC6A9|\uD328\uD0A4\uC9C0|\uC218\uAC00|\uB2E8\uAC00|\uC6D0\)|\uB9CC\uC6D0|price|cost|fee|discount/i,
  SAFETY: /\uBD80\uC791\uC6A9|\uBD80\uAE30|\uD569\uBCD1\uC99D|\uC751\uAE09|\uC704\uD5D8|\uAC10\uC5FC|\uCD9C\uD608|\uC548\uC804|\uC2E0\uD638|\uC8FC\uC758\uC0AC\uD56D|safety|side.?effect|complication|risk|emergency/i,
  RECOVERY: /\uD68C\uBCF5|\uBCF5\uADC0|\uAE30\uAC04|\uD0C0\uC784\uB77C\uC778|\uC77C\uCC28|\uCD9C\uADFC|\uC6B4\uB3D9|\uC138\uC548|\uCC1C\uC9C8|\uAD00\uB9AC|recovery|postop|day.?\d|downtime|return/i,
  CLINIC_CHOICE: /\uBCD1\uC6D0|\uD074\uB9AC\uB2C9|\uC758\uC6D0|\uC120\uD0DD|\uC0C1\uB2F4|\uC9C8\uBB38|\uBE44\uAD50|\uD6C4\uAE30|\uB9AC\uBDF0|\uCD94\uCC9C|surgeon|clinic|choose|consult|review/i,
};

function extractJsonLd(html) {
  const results = [];
  // Webflow bug: JSON-LD <script> tag is never closed, and the @graph array
  // is missing its closing ] and }. We extract via regex and fix the JSON.
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)(?=<script|<\/head)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let raw = m[1].trim();
    // Direct parse attempt
    try { results.push(JSON.parse(raw)); continue; } catch (e) { /* expected */ }
    // Fix malformed Webflow JSON: find last } then close the @graph array + outer obj
    // Strategy: count unmatched [ and { brackets, then append closers
    let braces = 0;
    let brackets = 0;
    let inString = false;
    let escape = false;
    let lastValidPos = 0;
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      if (escape) { escape = false; continue; }
      if (ch === '\\' && inString) { escape = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === '{') braces++;
      if (ch === '}') { braces--; lastValidPos = i; }
      if (ch === '[') brackets++;
      if (ch === ']') { brackets--; lastValidPos = i; }
      // If we've balanced everything, we found the end
      if (braces === 0 && brackets === 0 && (ch === '}' || ch === ']')) {
        raw = raw.slice(0, i + 1);
        break;
      }
    }
    // If still unbalanced, truncate at last valid } and append closers
    if (braces > 0 || brackets > 0) {
      raw = raw.slice(0, lastValidPos + 1);
      while (brackets > 0) { raw += ']'; brackets--; }
      while (braces > 0) { raw += '}'; braces--; }
    }
    try { results.push(JSON.parse(raw)); } catch (e) { /* still broken, skip */ }
  }
  return results;
}

function extractBlogPosting(jsonLdArray) {
  for (const ld of jsonLdArray) {
    if (ld['@graph']) {
      for (const node of ld['@graph']) {
        if (node['@type'] === 'BlogPosting') return node;
      }
    }
    if (ld['@type'] === 'BlogPosting') return ld;
  }
  return null;
}

function extractBreadcrumbs(jsonLdArray) {
  for (const ld of jsonLdArray) {
    if (ld['@graph']) {
      for (const node of ld['@graph']) {
        if (node['@type'] === 'BreadcrumbList') return node;
      }
    }
    if (ld['@type'] === 'BreadcrumbList') return ld;
  }
  return null;
}

// Use exact Webflow selectors found by structure analysis
function extractBodyContent($) {
  // Primary selector from Webflow structure analysis
  const richContent = $('.blog-details-rich-content.w-richtext');

  if (richContent.length === 0) {
    // Fallback selectors
    const fallbacks = ['.w-richtext', '.rich-text', '.blog-post-content'];
    for (const sel of fallbacks) {
      const el = $(sel);
      if (el.length > 0) {
        return buildContentObj($, el.first(), sel);
      }
    }
    return { html: '', text: '', selector: 'none', headings: [], images: [], lists: [], wordCount: 0, charCount: 0 };
  }

  return buildContentObj($, richContent.first(), '.blog-details-rich-content.w-richtext');
}

function buildContentObj($, contentEl, selector) {
  const headings = [];
  contentEl.find('h1, h2, h3, h4').each((_, el) => {
    headings.push({ level: el.tagName.toLowerCase(), text: $(el).text().trim() });
  });

  const images = [];
  contentEl.find('img').each((_, el) => {
    images.push({ src: $(el).attr('src') || '', alt: $(el).attr('alt') || '' });
  });

  const lists = [];
  contentEl.find('ul, ol').each((_, el) => {
    const items = [];
    $(el).find('> li').each((_, li) => { items.push($(li).text().trim()); });
    lists.push({ type: el.tagName.toLowerCase(), items });
  });

  const paragraphs = [];
  contentEl.find('> p').each((_, el) => {
    const t = $(el).text().trim();
    if (t) paragraphs.push(t);
  });

  const text = contentEl.text().replace(/\s+/g, ' ').trim();

  return {
    html: contentEl.html(),
    text,
    selector,
    headings,
    images,
    lists,
    paragraphs,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    charCount: text.length,
  };
}

// Extract Webflow-specific metadata from HTML elements
function extractWebflowMeta($) {
  return {
    title: $('h1.blog-details-title').text().trim() || $('title').text().replace(/\s*-\s*\uBBF8\uB140\uB294 \uAD34\uB85C\uC6CC\s*$/, '').trim(),
    category: $('.news-category-tag').text().trim() || null,
    author: $('.banner-news-author-name').text().trim() || null,
    date: $('.banner-news-date').text().trim() || null,
    featuredImage: $('img.blog-details-image').attr('src') || null,
    metaDescription: $('meta[name="description"]').attr('content') || '',
    ogImage: $('meta[property="og:image"]').attr('content') || '',
  };
}

function classifyContentType(articleSection, keywords, title, bodyText) {
  // 1. Category mapping
  if (articleSection) {
    const sections = Array.isArray(articleSection) ? articleSection : [articleSection];
    for (const section of sections) {
      const normalized = section.trim();
      if (CATEGORY_MAP[normalized]) return { type: CATEGORY_MAP[normalized], method: 'category' };
    }
  }

  // 2. Title + keyword matching
  const titleStr = [title || '', ...(Array.isArray(keywords) ? keywords : [keywords || ''])].join(' ');
  for (const [type, pattern] of Object.entries(KEYWORD_PATTERNS)) {
    if (pattern.test(titleStr)) return { type, method: 'title-keyword' };
  }

  // 3. Body text analysis
  const sample = (bodyText || '').slice(0, 2000);
  const scores = {};
  for (const [type, pattern] of Object.entries(KEYWORD_PATTERNS)) {
    const matches = sample.match(new RegExp(pattern.source, 'gi'));
    scores[type] = matches ? matches.length : 0;
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (best && best[1] > 0) return { type: best[0], method: 'body-analysis', score: best[1] };

  return { type: 'CLINIC_CHOICE', method: 'default' };
}

async function main() {
  console.log('THE GLAM Blog Content Extraction Pipeline');
  console.log('='.repeat(50));

  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries = await readdir(BLOG_DIR, { withFileTypes: true });
  const blogDirs = entries.filter(e => e.isDirectory()).map(e => e.name).sort();
  console.log('Found ' + blogDirs.length + ' blog directories');

  const articles = [];
  const errors = [];
  const stats = {
    total: blogDirs.length,
    success: 0,
    noJsonLd: 0,
    noContent: 0,
    errors: 0,
    contentTypes: { PRICE: 0, SAFETY: 0, RECOVERY: 0, CLINIC_CHOICE: 0 },
    classificationMethods: {},
    categories: {},
    authors: {},
  };

  for (const slug of blogDirs) {
    const htmlPath = join(BLOG_DIR, slug, 'index.html');
    try {
      const html = await readFile(htmlPath, 'utf-8');
      const $ = load(html);

      // JSON-LD extraction
      const jsonLdArray = extractJsonLd(html);
      const blogPosting = extractBlogPosting(jsonLdArray);
      const breadcrumbs = extractBreadcrumbs(jsonLdArray);
      if (!blogPosting) stats.noJsonLd++;

      // Webflow HTML metadata
      const wfMeta = extractWebflowMeta($);

      // Body content with correct Webflow selectors
      const body = extractBodyContent($);
      if (!body.text || body.charCount < 50) stats.noContent++;

      // Merge metadata (JSON-LD primary, Webflow HTML fallback)
      const articleSection = blogPosting?.articleSection || [];
      const title = blogPosting?.headline || wfMeta.title;
      const description = blogPosting?.description || wfMeta.metaDescription;
      const authorName = blogPosting?.author?.name || wfMeta.author || 'Unknown';
      const datePublished = blogPosting?.datePublished || wfMeta.date || '';
      const dateModified = blogPosting?.dateModified || '';
      const keywords = blogPosting?.keywords || [];
      const ldImages = blogPosting?.image || [];

      // Breadcrumb category
      const breadcrumbCategory = breadcrumbs?.itemListElement
        ?.filter(item => item.position === 2)
        ?.map(item => item.name) || [];

      // HTML category tag
      const htmlCategory = wfMeta.category;

      // Classify content type
      const classification = classifyContentType(
        articleSection.length > 0 ? articleSection : (htmlCategory ? [htmlCategory] : breadcrumbCategory),
        keywords,
        title,
        body.text
      );

      const article = {
        id: slug,
        slug,
        title,
        description,
        author: authorName,
        datePublished,
        dateModified,
        articleSection: Array.isArray(articleSection) ? articleSection : [articleSection].filter(Boolean),
        breadcrumbCategory,
        htmlCategory,
        keywords: Array.isArray(keywords) ? keywords : [keywords].filter(Boolean),
        featuredImage: wfMeta.featuredImage || (ldImages.length > 0 ? ldImages[0] : null),
        contentType: classification.type,
        classificationMethod: classification.method,
        url: blogPosting?.url || 'https://www.theglam.kr/blog/' + slug,
        body: {
          selector: body.selector,
          wordCount: body.wordCount,
          charCount: body.charCount,
          headingCount: body.headings?.length || 0,
          paragraphCount: body.paragraphs?.length || 0,
          imageCount: body.images?.length || 0,
          listCount: body.lists?.length || 0,
          headings: body.headings,
        },
        bodyPreview: (body.text || '').slice(0, 500),
      };

      articles.push(article);
      stats.success++;
      stats.contentTypes[classification.type]++;
      stats.classificationMethods[classification.method] = (stats.classificationMethods[classification.method] || 0) + 1;

      for (const section of article.articleSection) {
        if (section) stats.categories[section] = (stats.categories[section] || 0) + 1;
      }
      if (htmlCategory) stats.categories['[HTML] ' + htmlCategory] = (stats.categories['[HTML] ' + htmlCategory] || 0) + 1;
      stats.authors[authorName] = (stats.authors[authorName] || 0) + 1;

    } catch (err) {
      stats.errors++;
      errors.push({ slug, error: err.message });
    }
  }

  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.datePublished || 0) - new Date(a.datePublished || 0));

  const output = {
    _meta: {
      generated: new Date().toISOString(),
      source: 'site-mirror/blog/*/index.html',
      pipeline: 'scripts/extract-blog-content.mjs',
      version: '1.0.0',
    },
    stats,
    errors: errors.length > 0 ? errors : undefined,
    articles,
  };

  await writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

  // Print summary
  console.log('\nExtraction Summary');
  console.log('='.repeat(50));
  console.log('Success: ' + stats.success + '/' + stats.total);
  console.log('No JSON-LD: ' + stats.noJsonLd);
  console.log('No/Short Content: ' + stats.noContent);
  console.log('Errors: ' + stats.errors);

  console.log('\nContent Type Distribution');
  console.log('-'.repeat(50));
  for (const [type, count] of Object.entries(stats.contentTypes)) {
    const pct = ((count / stats.success) * 100).toFixed(1);
    console.log('  ' + type.padEnd(15) + ' ' + String(count).padStart(4) + ' (' + pct + '%)');
  }

  console.log('\nClassification Methods');
  console.log('-'.repeat(50));
  for (const [method, count] of Object.entries(stats.classificationMethods)) {
    console.log('  ' + method.padEnd(20) + ' ' + count);
  }

  console.log('\nArticle Sections (Categories)');
  console.log('-'.repeat(50));
  for (const [cat, count] of Object.entries(stats.categories).sort((a, b) => b[1] - a[1])) {
    console.log('  ' + cat.padEnd(25) + ' ' + count);
  }

  console.log('\nAuthors');
  console.log('-'.repeat(50));
  for (const [author, count] of Object.entries(stats.authors).sort((a, b) => b[1] - a[1])) {
    console.log('  ' + author.padEnd(15) + ' ' + count);
  }

  const fileSizeKB = (JSON.stringify(output).length / 1024).toFixed(1);
  console.log('\nOutput: ' + OUTPUT_FILE);
  console.log('File size: ' + fileSizeKB + ' KB');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
