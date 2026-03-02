import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const BODA_DIR = path.join(ROOT_DIR, 'boda');
const SERVICES_DIR = path.join(BODA_DIR, 'services');
const SHARED_DATA_PATH = path.join(BODA_DIR, 'shared-data.js');
const INDEX_PATH = path.join(BODA_DIR, 'index.html');
const COMPARE_PATH = path.join(BODA_DIR, 'compare.html');

const COMPARISONS = [
  ['sajochungung-vs-jeomsin.html', 'sajochungung', 'jeomsin'],
  ['sajochungung-vs-chunmyung.html', 'sajochungung', 'chunmyung'],
  ['sajochungung-vs-postellar.html', 'sajochungung', 'postellar'],
  ['soultalk-vs-sajochungung.html', 'soultalk', 'sajochungung'],
  ['ssintong-vs-sajochungung.html', 'ssintong', 'sajochungung'],
  ['postellar-vs-hellobot.html', 'postellar', 'hellobot'],
  ['postellar-vs-zendi.html', 'postellar', 'zendi'],
  ['jeomsin-vs-chunmyung.html', 'jeomsin', 'chunmyung'],
  ['jeomsin-vs-postellar.html', 'jeomsin', 'postellar'],
  ['hellobot-vs-zendi.html', 'hellobot', 'zendi'],
  ['mytarot-vs-ozstarot.html', 'mytarot', 'ozstarot'],
  ['annyeong-tarot-vs-mytarot.html', 'annyeong-tarot', 'mytarot'],
  ['naver-unse-vs-nate-unse.html', 'naver-unse', 'nate-unse'],
  ['dosa-ai-vs-hori-ai.html', 'dosa-ai', 'hori-ai'],
  ['unse7-vs-unsedamda.html', 'unse7', 'unsedamda'],
];

const POPULAR_COMPARISONS = [
  'sajochungung-vs-jeomsin.html',
  'sajochungung-vs-chunmyung.html',
  'postellar-vs-hellobot.html',
  'jeomsin-vs-chunmyung.html',
  'postellar-vs-zendi.html',
  'naver-unse-vs-nate-unse.html',
];

function extractServiceNames(sharedDataSource) {
  const serviceBlockMatch = sharedDataSource.match(/const\s+SERVICES\s*=\s*\[(?<block>[\s\S]*?)\];/);
  const source = serviceBlockMatch?.groups?.block ?? sharedDataSource;
  const idNamePattern = /id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'/g;
  const names = new Map();

  for (const match of source.matchAll(idNamePattern)) {
    const id = match[1];
    const name = match[2];
    if (!names.has(id)) {
      names.set(id, name);
    }
  }

  return names;
}

function buildComparisonMap() {
  const map = new Map();
  for (const [filename, leftId, rightId] of COMPARISONS) {
    const item = { filename, leftId, rightId };
    if (!map.has(leftId)) map.set(leftId, []);
    if (!map.has(rightId)) map.set(rightId, []);
    map.get(leftId).push(item);
    map.get(rightId).push(item);
  }
  return map;
}

function cardTitle(item, nameMap) {
  const leftName = nameMap.get(item.leftId) ?? item.leftId;
  const rightName = nameMap.get(item.rightId) ?? item.rightId;
  return `${leftName} vs ${rightName}`;
}

function buildServiceCompareSection(serviceId, compareMap, nameMap) {
  const list = compareMap.get(serviceId) ?? [];
  const cards = list
    .map((item) => `          <a class="related-card" href="/compare/${item.filename}"><strong>${cardTitle(item, nameMap)}</strong><p class="service-meta">두 서비스의 가격, 방식, 장단점을 한눈에 비교</p></a>`)
    .join('\n');

  return [
    '      <section class="panel" style="margin-top: 12px;">',
    '        <div class="section-header"><h2 class="section-title">비교 페이지</h2></div>',
    '        <div class="related-grid">',
    cards,
    '        </div>',
    '      </section>',
  ].join('\n');
}

function upsertServicePage(source, serviceId, compareMap, nameMap) {
  const hasComparisons = (compareMap.get(serviceId) ?? []).length > 0;
  if (!hasComparisons) {
    return source;
  }

  const existingSectionPattern = /\n\s*<section class="panel" style="margin-top: 12px;">\s*<div class="section-header"><h2 class="section-title">비교 페이지<\/h2><\/div>[\s\S]*?<\/section>\n/g;
  let nextSource = source.replace(existingSectionPattern, '\n');

  const nextStepStart = '      <section class="panel" style="margin-top: 12px;">\n        <div class="section-header"><h2 class="section-title">다음 단계</h2></div>';
  const compareSection = buildServiceCompareSection(serviceId, compareMap, nameMap);

  if (!nextSource.includes(nextStepStart)) {
    throw new Error(`다음 단계 섹션을 찾을 수 없습니다: ${serviceId}`);
  }

  nextSource = nextSource.replace(nextStepStart, `${compareSection}\n\n${nextStepStart}`);
  return nextSource;
}

function buildIndexPopularSection(nameMap) {
  const cards = POPULAR_COMPARISONS.map((filename) => {
    const item = COMPARISONS.find((entry) => entry[0] === filename);
    if (!item) {
      throw new Error(`비교 데이터가 없습니다: ${filename}`);
    }
    const title = cardTitle({ filename, leftId: item[1], rightId: item[2] }, nameMap);
    return [
      `          <a href="/compare/${filename}" class="card card-hover" style="text-decoration:none; color:inherit; padding:14px;">`,
      `            <strong style="font-size:0.9rem;">${title}</strong>`,
      '            <p style="font-size:0.78rem; color:var(--text-muted); margin:4px 0 0;">가격·방식 비교</p>',
      '          </a>',
    ].join('\n');
  }).join('\n');

  return [
    '      <section style="margin-top:20px; margin-bottom:10px;">',
    '        <div class="section-header">',
    '          <h2 class="section-title">인기 비교</h2>',
    '          <a href="/compare.html" class="section-more">전체 보기 ></a>',
    '        </div>',
    '        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">',
    cards,
    '        </div>',
    '      </section>',
  ].join('\n');
}

function upsertIndexPage(source, nameMap) {
  const popularSection = buildIndexPopularSection(nameMap);
  if (source.includes(popularSection)) {
    return source;
  }

  const existingSectionPattern = /\n\s*<section style="margin-top:20px; margin-bottom:10px;">\s*<div class="section-header">\s*<h2 class="section-title">인기 비교<\/h2>[\s\S]*?<\/section>\n/g;
  const cleanSource = source.replace(existingSectionPattern, '\n');
  const anchor = /(<\/section>\s*)(\s*<\/div>\s*<\/main>)/;

  if (!anchor.test(cleanSource)) {
    throw new Error('index.html 삽입 위치를 찾을 수 없습니다.');
  }

  return cleanSource.replace(anchor, `$1\n${popularSection}\n$2`);
}

function buildCompareListingSection(nameMap) {
  const cards = COMPARISONS.map(([filename, leftId, rightId]) => {
    const title = cardTitle({ filename, leftId, rightId }, nameMap);
    return [
      `        <a href="/compare/${filename}" class="card card-hover" style="text-decoration:none; color:inherit; padding:14px;">`,
      `          <strong style="font-size:0.9rem;">${title}</strong>`,
      '          <p style="font-size:0.78rem; color:var(--text-muted); margin:4px 0 0;">가격·방식·장단점 비교</p>',
      '        </a>',
    ].join('\n');
  }).join('\n');

  return [
    '    <section class="panel" style="margin-top: 12px;">',
    '      <div class="section-header"><h2 class="section-title">인기 비교 페이지</h2></div>',
    '      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">',
    cards,
    '      </div>',
    '    </section>',
  ].join('\n');
}

function upsertComparePage(source, nameMap) {
  const existingSectionPattern = /\n\s*<section class="panel" style="margin-top: 12px;">\s*<div class="section-header"><h2 class="section-title">인기 비교 페이지<\/h2><\/div>[\s\S]*?<\/section>\n/g;
  const cleanSource = source.replace(existingSectionPattern, '\n');
  const resultPanelPattern = /(<section class="panel" id="result-panel">[\s\S]*?<\/section>)(\s*<\/div><\/main>)/;
  const listing = buildCompareListingSection(nameMap);

  if (!resultPanelPattern.test(cleanSource)) {
    throw new Error('compare.html 결과 패널 위치를 찾을 수 없습니다.');
  }

  return cleanSource.replace(resultPanelPattern, `$1\n${listing}$2`);
}

async function updateServicePages(compareMap, nameMap) {
  const entries = await fs.readdir(SERVICES_DIR, { withFileTypes: true });
  let changedCount = 0;

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.html')) {
      continue;
    }

    const serviceId = path.basename(entry.name, '.html');
    const filePath = path.join(SERVICES_DIR, entry.name);
    const source = await fs.readFile(filePath, 'utf8');
    const updated = upsertServicePage(source, serviceId, compareMap, nameMap);

    if (updated !== source) {
      await fs.writeFile(filePath, updated, 'utf8');
      changedCount += 1;
    }
  }

  return changedCount;
}

async function main() {
  const sharedDataSource = await fs.readFile(SHARED_DATA_PATH, 'utf8');
  const serviceNameMap = extractServiceNames(sharedDataSource);
  const comparisonMap = buildComparisonMap();

  const serviceChanged = await updateServicePages(comparisonMap, serviceNameMap);

  const indexSource = await fs.readFile(INDEX_PATH, 'utf8');
  const indexUpdated = upsertIndexPage(indexSource, serviceNameMap);
  if (indexUpdated !== indexSource) {
    await fs.writeFile(INDEX_PATH, indexUpdated, 'utf8');
  }

  const compareSource = await fs.readFile(COMPARE_PATH, 'utf8');
  const compareUpdated = upsertComparePage(compareSource, serviceNameMap);
  if (compareUpdated !== compareSource) {
    await fs.writeFile(COMPARE_PATH, compareUpdated, 'utf8');
  }

  const indexChanged = indexUpdated !== indexSource ? 1 : 0;
  const compareChanged = compareUpdated !== compareSource ? 1 : 0;
  const total = serviceChanged + indexChanged + compareChanged;

  process.stdout.write(
    `Updated files: services=${serviceChanged}, index=${indexChanged}, compare=${compareChanged}, total=${total}\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
