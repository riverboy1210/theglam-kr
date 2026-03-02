// BODA shared data model for fortune-service discovery pages.
// Purpose of each array:
// - SERVICES: normalized service catalog entries for list/detail/filtering UI.
// - CONSULTATION_TYPES: major consultation topics users search for.
// - SERVICE_TYPES: platform/business model group labels for services.
// - METHODS: consultation delivery methods used by filters and badges.
// - PRICE_RANGES: numeric buckets used for price filters and summaries.
// - REVIEWS: AI-aggregated public review digests per service.
// - ARTICLES: editorial metadata for content/recommendation modules.

/**
 * @typedef {'positive' | 'negative' | 'neutral' | null} Sentiment
 */

/**
 * @typedef {{
 *   name: string,
 *   url: string,
 *   reviewCount: number | null
 * }} ReviewSource
 */

/**
 * @typedef {{
 *   aiSummary: string | null,
 *   sentiment: Sentiment,
 *   keywords: string[],
 *   pros: string[],
 *   cons: string[],
 *   sourceCount: number,
 *   lastUpdated: string | null,
 *   sources: ReviewSource[]
 * }} ServiceReviewSummary
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   type: string,
 *   method: string[],
 *   specialty: string[],
 *   counselingType: string[],
 *   priceRange: string,
 *   priceStructure: '건당정액' | '분당과금' | '월구독' | '무료' | '무료+부분유료',
 *   extraCharges: boolean,
 *   freeTrial: string | null,
 *   platform: string[],
 *   counselorCount: number | '다수' | null,
 *   signupRequired: boolean,
 *   reviewCount: number | null,
 *   operatingHours: string,
 *   summary: string,
 *   officialUrl: string,
 *   rating: number | null,
 *   reviewSummary: ServiceReviewSummary
 * }} Service
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   keywords: string[]
 * }} ConsultationType
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   icon: string
 * }} ServiceType
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   desc: string
 * }} Method
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   min?: number,
 *   max?: number
 * }} PriceRange
 */

/**
 * @typedef {{
 *   id: string,
 *   serviceId: string,
 *   period: string,
 *   aiSummary: string | null,
 *   sentiment: Sentiment,
 *   keywords: string[],
 *   pros: string[],
 *   cons: string[],
 *   sourceCount: number,
 *   lastUpdated: string | null,
 *   sources: ReviewSource[]
 * }} ReviewDigest
 */

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   category: string,
 *   slug: string,
 *   publishedAt: string,
 *   summary: string,
 *   tags: string[]
 * }} Article
 */

/**
 * @typedef {{
 *   name: string,
 *   nameEn: string,
 *   tagline: string,
 *   email: string,
 *   domain: string,
 *   url: string,
 *   disclaimer: string
 * }} Brand
 */

/** @type {Service[]} */
const SERVICES = [
  {
    id: 'chunmyung',
    name: '천명',
    type: '전화상담플랫폼',
    method: ['전화 상담', '채팅 상담'],
    specialty: ['연애/궁합', '진로/취업'],
    counselingType: ['사주', '타로', '신점'],
    priceRange: '1~3만원',
    priceStructure: '분당과금',
    extraCharges: false,
    freeTrial: '첫 3분 무료',
    platform: ['앱(iOS)', '앱(Android)', '웹'],
    counselorCount: '다수',
    signupRequired: true,
    reviewCount: 400000,
    operatingHours: '24시간',
    summary: '후기 40만 건 이상으로 비교 지표가 풍부한 대표 전화상담 플랫폼',
    officialUrl: 'https://example.com/chunmyung',
    rating: null,
    reviewSummary: {
      aiSummary: null,
      sentiment: null,
      keywords: [],
      pros: [],
      cons: [],
      sourceCount: 0,
      lastUpdated: null,
      sources: [],
    },
  },
  {
    id: 'saju-onair',
    name: '사주온에어',
    type: 'AI운세',
    method: ['AI 상담', '앱 자동 풀이'],
    specialty: ['종합운', '재물/사업', '가족/관계'],
    counselingType: ['사주', '오늘의 운세', '토정비결'],
    priceRange: '1만원 이하',
    priceStructure: '무료+부분유료',
    extraCharges: false,
    freeTrial: null,
    platform: ['앱(iOS)', '앱(Android)', '웹'],
    counselorCount: null,
    signupRequired: false,
    reviewCount: 18500,
    operatingHours: '24시간',
    summary: '빠른 자동 풀이를 중심으로 초보 사용자가 접근하기 쉬운 AI 운세 서비스',
    officialUrl: 'https://example.com/saju-onair',
    rating: 4.2,
    reviewSummary: {
      aiSummary: null,
      sentiment: null,
      keywords: [],
      pros: [],
      cons: [],
      sourceCount: 0,
      lastUpdated: null,
      sources: [],
    },
  },
];

/** @type {ConsultationType[]} */
const CONSULTATION_TYPES = [
  { id: 'love', name: '연애/궁합', keywords: ['연애운', '궁합', '속마음', '재회', '결혼', '썸'] },
  { id: 'career', name: '진로/취업', keywords: ['이직', '취업', '적성', '직업운'] },
  { id: 'wealth', name: '재물/사업', keywords: ['재물운', '사업운', '투자', '금전'] },
  { id: 'health', name: '건강', keywords: ['건강운', '질병'] },
  { id: 'general', name: '종합운', keywords: ['신년운세', '토정비결', '평생운', '인생총운'] },
  { id: 'family', name: '가족/관계', keywords: ['부모', '자녀', '직장 인간관계'] },
];

/** @type {ServiceType[]} */
const SERVICE_TYPES = [
  { id: 'phone', name: '전화상담플랫폼', icon: '📞' },
  { id: 'app', name: '앱기반자동풀이', icon: '📱' },
  { id: 'ai', name: 'AI운세', icon: '🤖' },
  { id: 'portal', name: '포털무료운세', icon: '🌐' },
  { id: 'corporate', name: '기업제공무료', icon: '🏢' },
  { id: 'offline', name: '오프라인점집', icon: '🏠' },
  { id: 'tarotcafe', name: '타로카페', icon: '☕' },
];

/** @type {Method[]} */
const METHODS = [
  { id: 'phone', name: '전화 상담', desc: '실시간 음성, 즉각 피드백' },
  { id: 'chat', name: '채팅 상담', desc: '텍스트 기반, 기록 남음' },
  { id: 'visit', name: '대면 상담', desc: '직접 방문, 현장감' },
  { id: 'auto', name: '앱 자동 풀이', desc: '즉시 결과, 저렴/무료' },
  { id: 'ai', name: 'AI 상담', desc: '24시간, 무료~저가' },
];

/** @type {PriceRange[]} */
const PRICE_RANGES = [
  { id: 'free', name: '무료', max: 0 },
  { id: 'under10k', name: '1만원 이하', max: 10000 },
  { id: '10k-30k', name: '1~3만원', min: 10000, max: 30000 },
  { id: '30k-50k', name: '3~5만원', min: 30000, max: 50000 },
  { id: 'over50k', name: '5만원 이상', min: 50000 },
];

/** @type {ReviewDigest[]} */
const REVIEWS = [
  {
    id: 'chunmyung-2026q1',
    serviceId: 'chunmyung',
    period: '2026-Q1',
    aiSummary: '응답 속도와 상담사 친절도에 대한 만족 의견이 많지만, 시간 경과에 따른 비용 체감은 엇갈립니다.',
    sentiment: 'positive',
    keywords: ['친절', '빠른연결', '가격부담'],
    pros: ['상담사 선택 폭이 넓음', '야간에도 연결 가능'],
    cons: ['장시간 상담 시 요금 부담', '상담사 편차 존재'],
    sourceCount: 3,
    lastUpdated: '2026-03-02',
    sources: [
      { name: 'Google Play Store', url: 'https://play.google.com', reviewCount: null },
      { name: 'App Store', url: 'https://www.apple.com/app-store', reviewCount: null },
      { name: '공식 앱 후기', url: 'https://example.com/chunmyung/reviews', reviewCount: 1200 },
    ],
  },
  {
    id: 'saju-onair-2026q1',
    serviceId: 'saju-onair',
    period: '2026-Q1',
    aiSummary: '가볍게 확인하는 일일 운세 용도로 만족도가 높고, 심층 해석의 깊이는 보완 요구가 있습니다.',
    sentiment: 'neutral',
    keywords: ['간편함', '일일운세', '해석깊이'],
    pros: ['회원가입 없이 시작 가능', '결과 확인 속도가 빠름'],
    cons: ['심층 상담 대체는 어려움', '유료 리포트 가격 체감 차이'],
    sourceCount: 2,
    lastUpdated: '2026-03-02',
    sources: [
      { name: 'Google Play Store', url: 'https://play.google.com', reviewCount: null },
      { name: '공식 웹 리뷰', url: 'https://example.com/saju-onair/reviews', reviewCount: 430 },
    ],
  },
];

/** @type {Article[]} */
const ARTICLES = [
  {
    id: 'boda-fortune-platform-guide-2026',
    title: '전화상담부터 AI 운세까지: 2026 운세 서비스 선택 가이드',
    category: '서비스비교',
    slug: 'fortune-service-selection-guide-2026',
    publishedAt: '2026-03-02',
    summary: '상담 방식, 비용 구조, 후기 신뢰도 기준으로 운세 서비스를 비교하는 기본 체크리스트.',
    tags: ['운세비교', '전화상담', 'AI운세'],
  },
];

/** @type {Brand} */
const BRAND = {
  name: '보다',
  nameEn: 'BODA',
  tagline: '운세를 보다, 더 보다 나은 선택',
  email: 'hello@unsetok.com',
  domain: 'unsetok.com',
  url: 'https://unsetok.com',
  disclaimer:
    'BODA는 운세 서비스의 정보를 비교·제공하는 플랫폼이며, 특정 서비스의 효과나 정확성을 보증하지 않습니다. 서비스 이용에 따른 결과는 이용자 본인의 판단과 책임 하에 이루어집니다. 운세 상담은 참고용이며, 중요한 의사결정은 전문가(의료/법률/재무 등)와 상의하시기 바랍니다.',
};

// Browser + Node.js compatibility.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SERVICES, CONSULTATION_TYPES, SERVICE_TYPES, METHODS, PRICE_RANGES, REVIEWS, ARTICLES, BRAND };
} else {
  window.BODA_DATA = { SERVICES, CONSULTATION_TYPES, SERVICE_TYPES, METHODS, PRICE_RANGES, REVIEWS, ARTICLES, BRAND };
}
