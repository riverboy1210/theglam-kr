import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://unsetok.com';
const SHARED_DATA_PATH = path.resolve(__dirname, '../boda/shared-data.js');
const OUTPUT_DIR = path.resolve(__dirname, '../boda/compare');

const PAIRS = [
  ['sajochungung', 'jeomsin'],
  ['sajochungung', 'chunmyung'],
  ['postellar', 'hellobot'],
  ['jeomsin', 'chunmyung'],
  ['postellar', 'zendi'],
  ['hellobot', 'zendi'],
  ['mytarot', 'ozstarot'],
  ['naver-unse', 'nate-unse'],
  ['sajochungung', 'postellar'],
  ['jeomsin', 'postellar'],
  ['soultalk', 'sajochungung'],
  ['ssintong', 'sajochungung'],
  ['dosa-ai', 'hori-ai'],
  ['unse7', 'unsedamda'],
  ['annyeong-tarot', 'mytarot']
];

const TABLE_ROWS = [
  ['유형', (service) => service.type],
  ['상담방식', (service) => joinList(service.method)],
  ['전문분야', (service) => joinList(service.specialty)],
  ['가격대', (service) => service.priceRange],
  ['가격구조', (service) => service.priceStructure],
  ['추가과금', (service) => (service.extraCharges ? '있음' : '없음')],
  ['무료체험', (service) => textOrFallback(service.freeTrial, '없음')],
  ['플랫폼', (service) => joinList(service.platform)],
  ['상담사 수', (service) => textOrFallback(service.counselorCount)],
  ['운영시간', (service) => textOrFallback(service.operatingHours)],
  ['후기 수', (service) => reviewText(service.reviewCount)],
  ['한줄 요약', (service) => textOrFallback(service.summary)]
];

function loadServices() {
  const source = fs.readFileSync(SHARED_DATA_PATH, 'utf8');
  const sandbox = {
    module: { exports: {} },
    exports: {},
    window: {},
  };

  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'shared-data.js' });

  const services = sandbox.module.exports?.SERVICES || sandbox.window?.BODA_DATA?.SERVICES;
  if (!Array.isArray(services)) {
    throw new Error('shared-data.js에서 SERVICES 배열을 찾지 못했습니다.');
  }

  return services;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function textOrFallback(value, fallback = '정보 미확인') {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  return String(value);
}

function joinList(values, fallback = '정보 미확인') {
  return Array.isArray(values) && values.length ? values.join(', ') : fallback;
}

function formatNumber(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return '0';
  }
  return Math.round(num).toLocaleString('ko-KR');
}

function reviewText(value) {
  if (value === null || value === undefined) {
    return '정보 미확인';
  }
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return '정보 미확인';
  }
  if (num === 0) {
    return '0건';
  }
  return `${num.toLocaleString('ko-KR')}건`;
}

function hasBatchim(text) {
  if (!text) return false;
  const lastChar = String(text).trim().slice(-1);
  if (!lastChar) return false;
  const code = lastChar.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) {
    return false;
  }
  return (code - 0xac00) % 28 !== 0;
}

function withAndParticle(text) {
  return `${text}${hasBatchim(text) ? '과' : '와'}`;
}

function withObjectParticle(text) {
  return `${text}${hasBatchim(text) ? '을' : '를'}`;
}

function pricingPanel(service) {
  const detail = service.pricingDetail || {};
  const range = Array.isArray(detail.costRange15min) ? detail.costRange15min : [];
  const min = range.length ? formatNumber(range[0]) : '0';
  const max = range.length > 1 ? formatNumber(range[1]) : min;

  return `<article class="price-card">
            <h3>${escapeHtml(service.name)}</h3>
            <ul>
              <li><strong>단위 비용</strong><span>${escapeHtml(textOrFallback(detail.costPerUnit))}</span></li>
              <li><strong>과금 유형</strong><span>${escapeHtml(textOrFallback(detail.billingType, textOrFallback(service.priceStructure)))}</span></li>
              <li><strong>15분 평균</strong><span>${formatNumber(detail.avgCost15min)}원</span></li>
              <li><strong>30분 평균</strong><span>${formatNumber(detail.avgCost30min)}원</span></li>
              <li><strong>15분 범위</strong><span>${min}원 ~ ${max}원</span></li>
              <li><strong>실제 비용 예시</strong><span>${escapeHtml(textOrFallback(detail.realCostExample))}</span></li>
            </ul>
          </article>`;
}

function warningsPanel(service) {
  const warnings = Array.isArray(service.consumerWarnings) ? service.consumerWarnings : [];
  if (!warnings.length) {
    return `<article class="warning-card"><h3>${escapeHtml(service.name)}</h3><p class="muted">공개된 소비자 참고사항이 없습니다.</p></article>`;
  }

  const items = warnings
    .map((item) => `<li><span class="warning-tag warning-${escapeHtml(item.type)}">${warningLabel(item.type)}</span>${escapeHtml(item.text)}</li>`)
    .join('');

  return `<article class="warning-card"><h3>${escapeHtml(service.name)}</h3><ul>${items}</ul></article>`;
}

function warningLabel(type) {
  if (type === 'caution') return '주의';
  if (type === 'positive') return '강점';
  return '팁';
}

function compareRows(serviceA, serviceB) {
  return TABLE_ROWS.map(
    ([label, getter]) => `<tr><th scope="row">${escapeHtml(label)}</th><td>${escapeHtml(getter(serviceA))}</td><td>${escapeHtml(getter(serviceB))}</td></tr>`
  ).join('');
}

function faqItems(serviceA, serviceB) {
  const nameA = serviceA.name;
  const nameB = serviceB.name;
  const pairText = `${withAndParticle(nameA)} ${nameB}`;

  const priceA = serviceA.pricingDetail?.avgCost15min;
  const priceB = serviceB.pricingDetail?.avgCost15min;
  let cheaperAnswer = `${pairText} 모두 가격 구조가 달라 이용 시간과 결제 방식에 따라 체감 비용이 달라집니다.`;

  if (Number.isFinite(priceA) && Number.isFinite(priceB) && priceA !== priceB) {
    const cheaper = priceA < priceB ? nameA : nameB;
    cheaperAnswer = `15분 평균 비용 기준으로는 ${cheaper} 쪽이 더 낮게 나타나지만, 실제 결제는 상담사와 상품 선택에 따라 달라질 수 있습니다.`;
  }

  return [
    {
      q: `${pairText} 중 어디가 더 저렴한가요?`,
      a: cheaperAnswer,
    },
    {
      q: `${pairText}의 상담 방식 차이는?`,
      a: `${nameA}은(는) ${joinList(serviceA.method)} 방식, ${nameB}은(는) ${joinList(serviceB.method)} 방식을 제공합니다.`,
    },
    {
      q: `${nameA} vs ${nameB} 어디가 더 좋나요?`,
      a: '두 서비스의 우열보다 목적에 맞는 선택이 중요합니다. 원하는 상담 유형, 예산, 이용 시간대 기준으로 비교해 보세요.',
    },
    {
      q: '초보자에게 추천하는 서비스는?',
      a: `처음 이용한다면 가격 구조가 이해하기 쉽고 무료 또는 저비용 진입이 가능한 서비스를 먼저 체험하는 방법이 일반적입니다. ${nameA}, ${nameB} 모두 기본 정보 페이지를 확인한 뒤 선택하세요.`,
    },
    {
      q: '두 서비스의 가장 큰 차이점은?',
      a: `핵심 차이는 서비스 유형(${serviceA.type} / ${serviceB.type}), 결제 구조(${serviceA.priceStructure} / ${serviceB.priceStructure}), 제공 채널(${joinList(serviceA.platform)} / ${joinList(serviceB.platform)})입니다.`,
    },
  ];
}

function buildStructuredData(serviceA, serviceB, fileName, faq) {
  const url = `${SITE_URL}/compare/${fileName}`;
  const pairName = `${serviceA.name} vs ${serviceB.name}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '비교',
        item: `${SITE_URL}/compare.html`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pairName,
        item: url,
      },
    ],
  };

  return {
    faq: JSON.stringify(faqSchema, null, 2),
    breadcrumb: JSON.stringify(breadcrumbSchema, null, 2),
  };
}

function buildHtml(serviceA, serviceB) {
  const fileName = `${serviceA.id}-vs-${serviceB.id}.html`;
  const title = `${serviceA.name} vs ${serviceB.name} 비교 | 보다 BODA`;
  const pairText = `${withAndParticle(serviceA.name)} ${serviceB.name}`;
  const description = `${pairText}의 가격, 상담방식, 후기를 한눈에 비교하고 상황에 맞는 선택 포인트를 확인해보세요.`;
  const canonicalUrl = `${SITE_URL}/compare/${fileName}`;
  const intro = `${withObjectParticle(pairText)} 같은 기준으로 비교했습니다. 서비스 유형, 상담 방식, 가격 구조, 운영 정보와 소비자 참고사항을 함께 확인해 상황에 맞게 선택해 보세요.`;
  const rows = compareRows(serviceA, serviceB);
  const faq = faqItems(serviceA, serviceB);
  const faqHtml = faq
    .map(
      (item) => `<details><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p></details>`
    )
    .join('');
  const schema = buildStructuredData(serviceA, serviceB, fileName, faq);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="naver-site-verification" content="f5e6ef9b14fafab6e7d12b5f3a13f433f84a91de">
  <meta name="google-site-verification" content="ddkEOwCZrlrsWD8FW1dT7T9nLVVEKOM1Rdm8E5VuaOg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="../images/favicon.svg">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${SITE_URL}/images/logo.svg">
  <meta property="og:site_name" content="보다 BODA">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="stylesheet" href="../shared.css">
  <style>
    .panel { background: #fff; border: 1px solid var(--border-light); border-radius: 14px; box-shadow: 0 10px 24px rgba(17,24,39,0.06); padding: 16px; margin-bottom: 12px; }
    .hero h1 { margin: 0 0 10px; font-size: 1.5rem; letter-spacing: -0.01em; }
    .hero p { margin: 0; color: var(--text-muted); }
    .compare-table-wrap { overflow-x: auto; }
    .compare-table { width: 100%; min-width: 680px; border-collapse: collapse; }
    .compare-table th, .compare-table td { border-bottom: 1px solid var(--border); padding: 10px; text-align: left; vertical-align: top; font-size: 0.9rem; }
    .compare-table thead th { background: #fff1f7; font-weight: 800; }
    .compare-table tbody th { width: 130px; color: var(--text-muted); font-weight: 700; }
    .grid-two { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .price-card, .warning-card { border: 1px solid var(--border); border-radius: 12px; background: #fff; padding: 12px; }
    .price-card h3, .warning-card h3 { margin: 0 0 10px; font-size: 1rem; }
    .price-card ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    .price-card li { display: grid; grid-template-columns: 96px 1fr; gap: 10px; font-size: 0.86rem; }
    .price-card strong { color: var(--text-muted); }
    .warning-card ul { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
    .warning-card li { font-size: 0.9rem; }
    .warning-tag { display: inline-block; margin-right: 8px; padding: 2px 8px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; }
    .warning-caution { background: #fff3e8; color: #9a3412; border: 1px solid #fdba74; }
    .warning-tip { background: #eff6ff; color: #1d4ed8; border: 1px solid #93c5fd; }
    .warning-positive { background: #ecfdf3; color: #166534; border: 1px solid #86efac; }
    .muted { margin: 0; color: var(--text-muted); }
    .faq details { border-top: 1px solid var(--border-light); padding: 12px 0; }
    .faq details:first-of-type { border-top: 0; padding-top: 0; }
    .faq summary { cursor: pointer; font-weight: 700; }
    .faq p { margin: 8px 0 0; color: var(--text-muted); }
    .cta-row { display: flex; flex-wrap: wrap; gap: 8px; }
    @media (min-width: 900px) {
      .grid-two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
  </style>
  <script type="application/ld+json">
${schema.faq}
  </script>
  <script type="application/ld+json">
${schema.breadcrumb}
  </script>
</head>
<body>
  <header class="site-header"><div class="header-inner"><a href="/" class="logo"><span class="logo-ko">보다 BODA</span></a><nav class="header-nav"><a href="/" class="nav-link">홈</a><a href="/services.html" class="nav-link">서비스찾기</a><a href="/reviews.html" class="nav-link">후기</a><a href="/compare.html" class="nav-link">비교</a><a href="/match.html" class="nav-link">매칭</a><a href="/cost-calculator.html" class="nav-link">비용계산</a><a href="/community.html" class="nav-link">커뮤니티</a><a href="/articles.html" class="nav-link">콘텐츠</a></nav></div></header>

  <main class="main-content">
    <div class="container">
      <nav aria-label="breadcrumb" style="margin-bottom: 12px;"><a href="/">홈</a> &gt; <a href="/compare.html">비교</a> &gt; <span aria-current="page">${escapeHtml(serviceA.name)} vs ${escapeHtml(serviceB.name)}</span></nav>

      <section class="panel hero">
        <h1>${escapeHtml(serviceA.name)} vs ${escapeHtml(serviceB.name)} 비교</h1>
        <p>${escapeHtml(intro)}</p>
      </section>

      <section class="panel">
        <h2 class="section-title">핵심 비교표</h2>
        <div class="compare-table-wrap">
          <table class="compare-table" aria-label="${escapeHtml(withAndParticle(serviceA.name))} ${escapeHtml(serviceB.name)} 비교표">
            <thead><tr><th>비교 항목</th><th>${escapeHtml(serviceA.name)}</th><th>${escapeHtml(serviceB.name)}</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <h2 class="section-title">가격 상세 비교</h2>
        <div class="grid-two">
          ${pricingPanel(serviceA)}
          ${pricingPanel(serviceB)}
        </div>
      </section>

      <section class="panel">
        <h2 class="section-title">소비자 참고사항</h2>
        <div class="grid-two">
          ${warningsPanel(serviceA)}
          ${warningsPanel(serviceB)}
        </div>
      </section>

      <section class="panel faq">
        <h2 class="section-title">자주 묻는 질문 (FAQ)</h2>
        ${faqHtml}
      </section>

      <section class="panel">
        <h2 class="section-title">다음 단계</h2>
        <div class="cta-row">
          <a class="btn-primary" href="/services/${serviceA.id}.html">${escapeHtml(serviceA.name)} 상세 보기</a>
          <a class="btn-outline" href="/services/${serviceB.id}.html">${escapeHtml(serviceB.name)} 상세 보기</a>
          <a class="btn-outline" href="/compare.html">다른 서비스 비교하기</a>
        </div>
      </section>
    </div>
  </main>

  <footer class="site-footer"><div class="footer-inner"><div class="footer-brand"><strong>BODA · 보다</strong></div><p class="footer-disclaimer">BODA는 서비스 정보를 객관적으로 비교해 제공하며 우열 순위를 제시하지 않습니다.</p></div></footer>
  <nav class="bottom-nav"><a href="/" class="bottom-nav-item">홈</a><a href="/services.html" class="bottom-nav-item">서비스</a><a href="/community.html" class="bottom-nav-item">커뮤니티</a><a href="/compare.html" class="bottom-nav-item active">비교</a><a href="/articles.html" class="bottom-nav-item">콘텐츠</a></nav>
</body>
</html>
`;
}

function main() {
  const services = loadServices();
  const serviceMap = new Map(services.map((service) => [service.id, service]));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [idA, idB] of PAIRS) {
    const serviceA = serviceMap.get(idA);
    const serviceB = serviceMap.get(idB);

    if (!serviceA || !serviceB) {
      throw new Error(`서비스를 찾을 수 없습니다: ${idA}, ${idB}`);
    }

    const fileName = `${idA}-vs-${idB}.html`;
    const outputPath = path.join(OUTPUT_DIR, fileName);
    const html = buildHtml(serviceA, serviceB);
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`generated: ${outputPath}`);
  }

  console.log(`done: ${PAIRS.length} comparison pages generated`);
}

main();
