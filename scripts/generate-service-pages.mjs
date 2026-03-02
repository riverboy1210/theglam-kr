import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const { SERVICES } = require('../boda/shared-data.js');

const SITE_URL = 'https://unsetok.com';
const OUTPUT_DIR = path.resolve(__dirname, '../boda/services');

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

function getRatingValue(service) {
  if (service.rating !== null && service.rating !== undefined) {
    return Number(service.rating);
  }
  return 4.5;
}

function getReviewCountValue(service) {
  if (service.reviewCount !== null && service.reviewCount !== undefined) {
    return Number(service.reviewCount);
  }
  return 1;
}

function warningByType(service, warningType) {
  const warnings = Array.isArray(service.consumerWarnings) ? service.consumerWarnings : [];
  return warnings.find((item) => item.type === warningType);
}

function warningAnswer(service, warningType, fallback) {
  const warning = warningByType(service, warningType);
  return warning ? warning.text : fallback;
}

function matchAnswer(service) {
  const tags = Array.isArray(service.situationMatch) ? service.situationMatch : [];
  if (!tags.length) {
    return `${service.name}은(는) 가볍게 운세를 참고하거나 빠르게 결과를 확인하려는 분에게 적합합니다.`;
  }
  return `${service.name}은(는) ${tags.join(', ')} 성향의 이용자에게 잘 맞습니다.`;
}

function counselingAnswer(service) {
  return `${service.name}은(는) ${joinList(service.specialty)} 분야 중심으로 ${joinList(service.counselingType)} 상담/풀이를 제공합니다.`;
}

function freeTrialAnswer(service) {
  if (service.freeTrial) {
    return `네, ${service.freeTrial} 조건의 무료 체험이 제공됩니다.`;
  }
  return '현재 확인된 별도 무료 상담 혜택은 없습니다.';
}

function generateFaqItems(service) {
  if (service.type === '전화상담플랫폼') {
    return [
      { q: `${service.name} 가격은 얼마인가요?`, a: textOrFallback(service.pricingDetail?.realCostExample) },
      { q: `${service.name}은 어떤 상담을 제공하나요?`, a: counselingAnswer(service) },
      {
        q: `${service.name}에서 주의할 점은 무엇인가요?`,
        a: warningAnswer(service, 'caution', '이용 전 결제 방식과 과금 단위를 먼저 확인하는 것이 좋습니다.')
      },
      { q: `${service.name}은 어떤 사람에게 추천하나요?`, a: matchAnswer(service) },
      { q: `${service.name} 무료 상담이 있나요?`, a: freeTrialAnswer(service) }
    ];
  }

  if (service.type === '앱기반자동풀이') {
    return [
      {
        q: `${service.name}은 무료인가요?`,
        a: `${service.priceStructure} 구조이며, ${textOrFallback(service.pricingDetail?.realCostExample)}.`
      },
      { q: `${service.name}에서 어떤 운세를 볼 수 있나요?`, a: counselingAnswer(service) },
      {
        q: `${service.name}의 장점은 무엇인가요?`,
        a: `${warningAnswer(service, 'positive', warningAnswer(service, 'tip', '앱에서 빠르게 결과를 확인할 수 있습니다.'))} ${textOrFallback(service.summary)}.`
      },
      {
        q: `${service.name}에서 주의할 점은?`,
        a: warningAnswer(service, 'caution', '현재까지 특별한 주의사항이 보고되지 않았습니다.')
      },
      { q: `${service.name}은 어떤 사람에게 적합한가요?`, a: matchAnswer(service) }
    ];
  }

  if (service.type === 'AI운세') {
    return [
      {
        q: `${service.name}은 정확한가요?`,
        a: 'AI 기반 운세 서비스로, 전통 사주 해석을 AI가 분석합니다. 참고용으로 활용하시기를 권합니다.'
      },
      { q: `${service.name}은 무료인가요?`, a: textOrFallback(service.pricingDetail?.realCostExample) },
      { q: `${service.name}의 특징은?`, a: textOrFallback(service.summary) },
      {
        q: `${service.name}에서 주의할 점은?`,
        a: warningAnswer(service, 'caution', '현재까지 특별한 주의사항이 보고되지 않았습니다.')
      },
      {
        q: `기존 운세 앱과 ${service.name}의 차이는?`,
        a: 'AI 기술을 활용하여 즉시 결과를 제공하는 것이 특징입니다.'
      }
    ];
  }

  if (service.type === '포털무료운세' || service.type === '기업제공무료') {
    const provider = service.type === '포털무료운세' ? '포털' : '기업';
    return [
      {
        q: `${service.name}은 정말 무료인가요?`,
        a: '네, 완전 무료 서비스입니다. 별도의 유료 결제 없이 이용 가능합니다.'
      },
      { q: `${service.name}에서 어떤 운세를 볼 수 있나요?`, a: counselingAnswer(service) },
      {
        q: `${service.name}의 장점은?`,
        a: `무료로 이용할 수 있으며, 대형 ${provider}에서 제공하여 신뢰도가 높습니다.`
      },
      {
        q: `${service.name}과 유료 서비스의 차이는?`,
        a: '기본적인 운세 정보를 무료로 제공하지만, 전문 상담사와의 1:1 상담은 제공하지 않습니다.'
      },
      { q: `${service.name}은 어떤 사람에게 적합한가요?`, a: matchAnswer(service) }
    ];
  }

  return [
    { q: `${service.name}은 어떤 서비스인가요?`, a: textOrFallback(service.summary) },
    { q: `${service.name} 가격은 얼마인가요?`, a: textOrFallback(service.pricingDetail?.realCostExample) },
    { q: `${service.name}은 어떤 상담을 제공하나요?`, a: counselingAnswer(service) },
    { q: `${service.name}에서 주의할 점은?`, a: warningAnswer(service, 'caution', '현재까지 특별한 주의사항이 보고되지 않았습니다.') },
    { q: `${service.name}은 어떤 사람에게 적합한가요?`, a: matchAnswer(service) }
  ];
}

function buildStructuredData(service, faqItems) {
  const pricing = service.pricingDetail || {};
  const [lowRaw, highRaw] = Array.isArray(pricing.costRange15min) ? pricing.costRange15min : [0, 0];
  const lowPrice = String(Number.isFinite(Number(lowRaw)) ? Number(lowRaw) : 0);
  const highPrice = String(Number.isFinite(Number(highRaw)) ? Number(highRaw) : Number(lowPrice));

  const appOrProduct = service.type === '전화상담플랫폼'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: service.name,
        category: service.type,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice,
          highPrice,
          priceCurrency: 'KRW'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(getRatingValue(service)),
          reviewCount: String(getReviewCountValue(service)),
          bestRating: '5'
        }
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: service.name,
        applicationCategory: 'LifestyleApplication',
        operatingSystem: joinList(service.platform),
        offers: {
          '@type': 'AggregateOffer',
          lowPrice,
          highPrice,
          priceCurrency: 'KRW'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(getRatingValue(service)),
          reviewCount: String(getReviewCountValue(service)),
          bestRating: '5'
        }
      };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '서비스', item: `${SITE_URL}/services.html` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/services/${service.id}.html` }
    ]
  };

  return {
    appOrProduct: JSON.stringify(appOrProduct, null, 2),
    faq: JSON.stringify(faq, null, 2),
    breadcrumb: JSON.stringify(breadcrumb, null, 2)
  };
}

function buildWarnings(service) {
  const warnings = Array.isArray(service.consumerWarnings) ? service.consumerWarnings : [];
  if (!warnings.length) {
    return '<div class="empty">현재까지 보고된 특별한 주의사항이 없습니다.</div>';
  }

  const iconByType = { caution: '⚠️', tip: '💡', positive: '✅' };
  const classByType = {
    caution: 'warning-caution',
    tip: 'warning-tip',
    positive: 'warning-positive'
  };

  return warnings
    .map((item) => {
      const type = classByType[item.type] ? item.type : 'tip';
      return `<span class="warning-badge ${classByType[type]}">${iconByType[type]} ${escapeHtml(item.text)}</span>`;
    })
    .join('');
}

function buildRelatedServices(service, services) {
  const related = services.filter((item) => item.type === service.type && item.id !== service.id).slice(0, 3);
  if (!related.length) {
    return '<div class="empty">유사 서비스 데이터가 아직 없습니다.</div>';
  }

  return related
    .map(
      (item) =>
        `<a class="related-card" href="/services/${item.id}.html"><strong>${escapeHtml(item.name)}</strong><p class="service-meta">${escapeHtml(textOrFallback(item.summary, '요약 준비중'))}</p><span class="tag">${escapeHtml(item.type)}</span></a>`
    )
    .join('');
}

function buildCostTable(service) {
  const pricing = service.pricingDetail || {};
  if (pricing.billingType !== '분당과금') {
    return '';
  }

  const cost10 = Math.round((Number(pricing.avgCost30min) || 0) / 3);
  const cost15 = Number(pricing.avgCost15min) || 0;
  const cost30 = Number(pricing.avgCost30min) || 0;

  return `
            <div class="price-box">
              <table class="price-table" aria-label="예상 비용 표">
                <thead><tr><th>상담 시간</th><th>예상 비용</th></tr></thead>
                <tbody>
                  <tr><td>10분</td><td>${formatNumber(cost10)}원</td></tr>
                  <tr><td>15분</td><td>${formatNumber(cost15)}원</td></tr>
                  <tr><td>30분</td><td>${formatNumber(cost30)}원</td></tr>
                </tbody>
              </table>
            </div>`;
}

function generateHtml(service, services) {
  const title = `${service.name} 후기·가격·비교 | 보다 BODA`;
  const metaDescription = `${service.name}의 실제 이용 후기, 가격(${service.priceRange}), 장단점을 확인하세요. ${service.type} 서비스를 비교하고 나에게 맞는 서비스를 찾아보세요.`;
  const canonicalUrl = `${SITE_URL}/services/${service.id}.html`;
  const summary = textOrFallback(service.summary);
  const faqItems = generateFaqItems(service);
  const jsonLd = buildStructuredData(service, faqItems);
  const officialUrl = service.officialUrl || '/services.html';
  const officialText = service.officialUrl ? '공식 사이트' : '공식 사이트 미확인';
  const warningsHtml = buildWarnings(service);
  const relatedHtml = buildRelatedServices(service, services);
  const costTableHtml = buildCostTable(service);

  const infoRows = [
    ['유형', textOrFallback(service.type)],
    ['분야', joinList(service.specialty)],
    ['상담방식', joinList(service.method)],
    ['상담종류', joinList(service.counselingType)],
    ['가격대', textOrFallback(service.priceRange)],
    ['가격구조', textOrFallback(service.priceStructure)],
    ['추가비용', service.extraCharges ? '있음' : '없음'],
    ['무료체험', textOrFallback(service.freeTrial, '없음')],
    ['플랫폼', joinList(service.platform)],
    ['상담사수', textOrFallback(service.counselorCount)],
    ['회원가입', service.signupRequired ? '필요' : '불필요'],
    ['운영시간', textOrFallback(service.operatingHours)]
  ];

  const infoHtml = infoRows
    .map(([key, value]) => `<div class="kv-row"><span class="kv-key">${escapeHtml(key)}</span><span>${escapeHtml(value)}</span></div>`)
    .join('');

  const faqHtml = faqItems
    .map(
      (item) => `
          <details>
            <summary>${escapeHtml(item.q)}</summary>
            <p>${escapeHtml(item.a)}</p>
          </details>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/svg+xml" href="../images/favicon.svg">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(summary)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${SITE_URL}/images/logo.svg">
  <meta property="og:site_name" content="보다 BODA">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(summary)}">
  <link rel="stylesheet" href="../shared.css">
  <style>
    .detail-grid { display: grid; gap: 14px; }
    .panel { background: #fff; border: 1px solid var(--border-light); border-radius: 14px; box-shadow: 0 10px 24px rgba(17,24,39,0.06); padding: 16px; }
    .service-hero { display: grid; gap: 8px; }
    .service-title { margin: 0; font-size: 1.45rem; letter-spacing: -0.01em; }
    .subtitle { margin: 0; color: var(--text-muted); }
    .kv-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
    .kv-row { display: grid; grid-template-columns: 110px minmax(0,1fr); gap: 10px; font-size: 0.9rem; border-bottom: 1px solid var(--border-light); padding-bottom: 8px; }
    .kv-row:last-child { border-bottom: none; }
    .kv-key { color: var(--text-muted); font-weight: 700; }
    .list { margin: 0; padding-left: 18px; }
    .related-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .related-card { text-decoration: none; color: inherit; padding: 12px; border: 1px solid var(--border); border-radius: 12px; background: #fff; }
    .price-box { margin-top: 10px; border: 1px solid var(--border-light); border-radius: 10px; overflow: hidden; }
    .price-table { width: 100%; border-collapse: collapse; font-size: 0.86rem; }
    .price-table th, .price-table td { padding: 8px 10px; text-align: left; border-bottom: 1px solid var(--border-light); }
    .price-table th { background: #faf7f1; color: var(--text-muted); font-weight: 700; }
    .price-table tr:last-child td { border-bottom: none; }
    .warning-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
    .warning-badge { display: inline-flex; align-items: center; gap: 6px; padding: 7px 10px; border-radius: 999px; font-size: 0.82rem; line-height: 1.3; }
    .warning-caution { background: #fff3e8; color: #9a3412; border: 1px solid #fdba74; }
    .warning-tip { background: #eff6ff; color: #1d4ed8; border: 1px solid #93c5fd; }
    .warning-positive { background: #ecfdf3; color: #166534; border: 1px solid #86efac; }
    .empty { text-align: center; color: var(--text-muted); padding: 24px 10px; border: 1px dashed #f3c5db; border-radius: 12px; }
    @media (min-width: 900px) {
      .detail-grid { grid-template-columns: 1.4fr 1fr; }
      .kv-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
      .related-grid { grid-template-columns: repeat(3, minmax(0,1fr)); }
    }
  </style>
  <script type="application/ld+json">
${jsonLd.appOrProduct}
  </script>
  <script type="application/ld+json">
${jsonLd.faq}
  </script>
  <script type="application/ld+json">
${jsonLd.breadcrumb}
  </script>
</head>
<body>
  <header class="site-header"><div class="header-inner"><a href="/" class="logo"><span class="logo-ko">보다 BODA</span></a><nav class="header-nav"><a href="/" class="nav-link">홈</a><a href="/services.html" class="nav-link">서비스찾기</a><a href="/reviews.html" class="nav-link">후기</a><a href="/compare.html" class="nav-link">비교</a><a href="/match.html" class="nav-link">매칭</a><a href="/cost-calculator.html" class="nav-link">비용계산</a><a href="/community.html" class="nav-link">커뮤니티</a><a href="/articles.html" class="nav-link">콘텐츠</a></nav></div></header>

  <main class="main-content">
    <div class="container">
      <nav aria-label="breadcrumb" style="margin-bottom: 12px;"><a href="/">홈</a> &gt; <a href="/services.html">서비스</a> &gt; <span aria-current="page">${escapeHtml(service.name)}</span></nav>

      <section class="panel service-hero">
        <div class="tag-row"><span class="badge badge-hot">${escapeHtml(service.type)}</span><span class="badge badge-new">${escapeHtml(service.priceRange)}</span></div>
        <h1 class="service-title">${escapeHtml(service.name)}</h1>
        <p class="subtitle">${escapeHtml(summary)}</p>
        <div>
          <a class="btn-outline" href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(officialText)}</a>
        </div>
      </section>

      <div class="detail-grid" style="margin-top: 12px;">
        <section class="panel">
          <div class="section-header"><h2 class="section-title">핵심 정보</h2></div>
          <div class="kv-grid">${infoHtml}</div>
        </section>

        <section class="panel">
          <div class="section-header"><h2 class="section-title">💰 실제 비용 안내</h2></div>
          <p class="subtitle">${escapeHtml(textOrFallback(service.pricingDetail?.realCostExample))}</p>
          <p class="subtitle" style="margin-top:8px;">과금방식: ${escapeHtml(textOrFallback(service.pricingDetail?.billingType))}</p>${costTableHtml}
          <div style="margin-top:14px;" class="section-header"><h2 class="section-title">소비자 참고사항</h2></div>
          <div class="warning-wrap">${warningsHtml}</div>
        </section>
      </div>

      <section class="panel" style="margin-top: 12px;">
        <div class="section-header"><h2 class="section-title">자주 묻는 질문 (FAQ)</h2></div>${faqHtml}
      </section>

      <section class="panel" style="margin-top: 12px;">
        <div class="section-header"><h2 class="section-title">관련 서비스</h2></div>
        <div class="related-grid">${relatedHtml}</div>
      </section>

      <section class="panel" style="margin-top: 12px;">
        <div class="section-header"><h2 class="section-title">다음 단계</h2></div>
        <p class="subtitle">예상 비용을 계산하거나, 나에게 맞는 서비스 추천을 받아보세요.</p>
        <div style="margin-top: 10px;"><a class="btn-primary" href="/cost-calculator.html">비용 계산기</a><a class="btn-outline" href="/match.html" style="margin-left:8px;">매칭 퀴즈</a></div>
      </section>
    </div>
  </main>

  <footer class="site-footer"><div class="footer-inner"><div class="footer-brand"><strong>BODA · 보다</strong></div><p class="footer-disclaimer">BODA는 운세 서비스의 정보를 비교·제공하는 플랫폼이며, 특정 서비스의 효과나 정확성을 보증하지 않습니다.</p></div></footer>
  <nav class="bottom-nav"><a href="/" class="bottom-nav-item"><span class="nav-icon">🏠</span><span>홈</span></a><a href="/services.html" class="bottom-nav-item active"><span class="nav-icon">🔍</span><span>서비스</span></a><a href="/community.html" class="bottom-nav-item"><span class="nav-icon">💬</span><span>커뮤니티</span></a><a href="/compare.html" class="bottom-nav-item"><span class="nav-icon">🆚</span><span>비교</span></a><a href="/articles.html" class="bottom-nav-item"><span class="nav-icon">📰</span><span>콘텐츠</span></a></nav>
</body>
</html>
`;
}

function main() {
  if (!Array.isArray(SERVICES)) {
    throw new Error('SERVICES 데이터가 배열이 아닙니다.');
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  let generatedCount = 0;

  for (const service of SERVICES) {
    if (!service?.id) {
      continue;
    }
    const html = generateHtml(service, SERVICES);
    const outputPath = path.join(OUTPUT_DIR, `${service.id}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
    generatedCount += 1;
    console.log(`[${generatedCount}/${SERVICES.length}] generated: ${outputPath}`);
  }

  console.log(`Done. Generated ${generatedCount} static service pages in ${OUTPUT_DIR}`);
}

main();
