// 미녀는 괴로워 (THE GLAM) — 공통 더미 데이터 세트
// 모든 목업 페이지에서 사용

const PROCEDURES = [
  { name: '쌍꺼풀 자연유착', category: '눈', priceRange: '50~80만원', popularity: 98 },
  { name: '절개 쌍꺼풀', category: '눈', priceRange: '80~150만원', popularity: 87 },
  { name: '콧대 필러', category: '코', priceRange: '30~80만원', popularity: 85 },
  { name: '코 재건술', category: '코', priceRange: '200~500만원', popularity: 72 },
  { name: '보톡스 사각턱', category: '보톡스', priceRange: '15~30만원', popularity: 95 },
  { name: 'HIFU 리프팅', category: '리프팅', priceRange: '50~150만원', popularity: 78 },
  { name: '지방흡입 복부', category: '지방흡입', priceRange: '200~400만원', popularity: 68 },
  { name: '윤곽 광대축소', category: '윤곽', priceRange: '300~600만원', popularity: 55 },
];

const HOSPITALS = [
  { name: '강남 AA성형외과', area: '강남역 3번출구 도보 5분', rating: 4.7, reviews: 328, tags: ['눈', '코', '윤곽'], events: true, verified: true, eventPrice: '쌍꺼풀 매몰법 59만원', originalPrice: '80만원' },
  { name: '신사 BB클리닉', area: '신사역 2번출구 도보 3분', rating: 4.5, reviews: 215, tags: ['보톡스', '필러', '리프팅'], events: false, verified: true, eventPrice: null, originalPrice: null },
  { name: '압구정 CC의원', area: '압구정역 5번출구 도보 7분', rating: 4.8, reviews: 541, tags: ['눈', '지방흡입'], events: true, verified: true, eventPrice: '눈 절개 105만원', originalPrice: '150만원' },
  { name: '강남 DD성형', area: '강남역 11번출구 도보 2분', rating: 4.3, reviews: 189, tags: ['코', '윤곽'], events: true, verified: false, eventPrice: '코필러 45만원', originalPrice: '65만원' },
  { name: '청담 EE뷰티클리닉', area: '청담역 8번출구 도보 10분', rating: 4.6, reviews: 302, tags: ['피부', '리프팅'], events: false, verified: true, eventPrice: null, originalPrice: null },
  { name: '논현 FF성형외과', area: '논현역 4번출구 도보 6분', rating: 4.4, reviews: 157, tags: ['눈', '보톡스'], events: true, verified: true, eventPrice: '보톡스 19만원', originalPrice: '28만원' },
];

const REVIEWS = [
  { id: 1, type: 'satisfied', rating: 4.8, title: '쌍꺼풀 자연유착 3주차 — 진짜 자연스러워요!', summary: '처음엔 붓기가 걱정됐는데 회복이 생각보다 빠르고 자연스러워요. 상담 선생님이 친절하게 설명해주셔서 믿고 수술할 수 있었어요.', procedure: '쌍꺼풀 자연유착', hospital: '강남 AA성형외과', cost: '65만원', author: '뷰티맘**', date: '2026.01.15', verified: true, likes: 142, comments: 23, views: 1820, timeline: null },
  { id: 2, type: 'satisfied', rating: 4.9, title: '보톡스 사각턱 1달째 — 갸름해진 것 같아요', summary: '효과가 확실히 보이기 시작했어요. 통증도 거의 없었고 선생님이 꼼꼼하게 설명해줘서 좋았어요.', procedure: '보톡스 사각턱', hospital: '신사 BB클리닉', cost: '22만원', author: '슬림페이스**', date: '2026.01.28', verified: true, likes: 98, comments: 12, views: 1120, timeline: null },
  { id: 3, type: 'average', rating: 3.0, title: '코 필러 — 기대보다는 효과가 약했어요', summary: '시술 자체는 빠르게 끝났는데 제가 원하는 만큼 콧대가 높아지지 않았어요. 상담 때 더 꼼꼼히 확인할 걸 아쉽습니다.', procedure: '콧대 필러', hospital: '압구정 CC의원', cost: '55만원', author: '코고민**', date: '2026.02.03', verified: false, likes: 45, comments: 18, views: 834, timeline: null },
  { id: 4, type: 'average', rating: 3.5, title: 'HIFU 리프팅 — 통증은 있지만 효과는 확실', summary: '시술 중 통증이 꽤 있었어요. 리프팅 효과는 2-3주 후부터 보이기 시작했고 피부 탄력이 좋아진 것 같기는 해요.', procedure: 'HIFU 리프팅', hospital: '청담 EE뷰티클리닉', cost: '120만원', author: '탄력원해**', date: '2026.02.10', verified: true, likes: 67, comments: 9, views: 956, timeline: null },
  { id: 5, type: 'unsatisfied', rating: 2.0, title: '지방흡입 복부 — 비용 대비 실망스러운 결과', summary: '회복 기간이 너무 길고 결과가 기대에 미치지 못했어요. 사전에 충분한 상담과 리얼한 후기를 더 많이 참고했어야 했는데 아쉽습니다.', procedure: '지방흡입 복부', hospital: '강남 DD성형', cost: '280만원', author: '복부고민**', date: '2026.02.01', verified: true, likes: 203, comments: 87, views: 4521, timeline: null },
  { id: 6, type: 'progress', rating: 4.5, title: '눈 절개 쌍꺼풀 — 1개월/3개월/6개월 경과 업데이트', summary: '1개월: 아직 붓기 남아있고 어색함. 3개월: 많이 안정되었고 자연스러워짐. 6개월: 완전히 정착, 너무 만족!', procedure: '절개 쌍꺼풀', hospital: '압구정 CC의원', cost: '135만원', author: '눈예쁘게**', date: '2025.08.20', verified: true, likes: 312, comments: 56, views: 6840, timeline: ['1개월: 붓기 남아있음, 아직 어색해요', '3개월: 많이 안정, 자연스러워졌어요', '6개월: 완전 정착! 너무 만족 ❤️'] },
];

const ARTICLES = [
  { id: 1, title: '쌍꺼풀 수술 가격, 진짜 얼마가 드는 걸까?', category: '비용비교', categoryColor: '#10B981', contentType: 'PRICE', slug: 'double-eyelid-price', procedureTags: ['눈'], date: '2026.02.20', views: 12340, readTime: '5분', author: '김서연 에디터', summary: '매몰법부터 절개법까지 실제 가격 비교와 숨겨진 비용까지 꼼꼼히 정리했어요.' },
  { id: 2, title: '코 성형 부작용, 미리 알면 막을 수 있어요', category: '안전정보', categoryColor: '#EF4444', contentType: 'SAFETY', slug: 'nose-surgery-side-effects', procedureTags: ['코'], date: '2026.02.15', views: 8920, readTime: '7분', author: '이다혜 에디터', summary: '부작용 발생률과 대처법, 그리고 병원 선택 시 꼭 확인해야 할 체크리스트.' },
  { id: 3, title: '보톡스 효과 언제까지? 지속 기간 완벽 정리', category: '회복/효과', categoryColor: '#8B5CF6', contentType: 'RECOVERY', slug: 'botox-duration-guide', procedureTags: ['보톡스'], date: '2026.02.10', views: 6540, readTime: '4분', author: '박지훈 에디터', summary: '부위별 지속 기간, 재시술 타이밍, 비용 대비 효과 분석.' },
  { id: 4, title: '코성형 비용 총정리 — 필러부터 재건술까지', category: '비용비교', categoryColor: '#10B981', contentType: 'PRICE', slug: 'nose-surgery-cost', procedureTags: ['코'], date: '2026.02.18', views: 9850, readTime: '6분', author: '김서연 에디터', summary: '코성형 방법별 가격 범위, 마취비·검사비 포함 총비용 실전 가이드.' },
  { id: 5, title: '지방흡입 가격, 부위별로 얼마나 들까?', category: '비용비교', categoryColor: '#10B981', contentType: 'PRICE', slug: 'liposuction-price-guide', procedureTags: ['지방흡입'], date: '2026.02.14', views: 11200, readTime: '7분', author: '이다혜 에디터', summary: '복부·허벅지·팔뚝별 가격 비교, 이벤트가 vs 실제 총비용 차이.' },
  { id: 6, title: '눈 성형 부작용 신호 — 이건 꼭 확인하세요', category: '안전정보', categoryColor: '#EF4444', contentType: 'SAFETY', slug: 'eye-surgery-safety', procedureTags: ['눈'], date: '2026.02.12', views: 7430, readTime: '5분', author: '박지훈 에디터', summary: '붓기 vs 감염 신호 구분법, 병원 재방문이 필요한 경우 체크리스트.' },
  { id: 7, title: '리프팅 시술, 내 피부에 맞는 걸 어떻게 고를까?', category: '안전정보', categoryColor: '#EF4444', contentType: 'SAFETY', slug: 'lifting-safety-guide', procedureTags: ['리프팅'], date: '2026.02.08', views: 6120, readTime: '6분', author: '김서연 에디터', summary: '울쎄라·써마지·HIFU 차이, 피부 타입별 추천 기준 정리.' },
  { id: 8, title: '쌍꺼풀 수술 회복기간 — 일상 복귀 현실 타임라인', category: '회복관리', categoryColor: '#3B82F6', contentType: 'RECOVERY', slug: 'double-eyelid-recovery', procedureTags: ['눈'], date: '2026.02.06', views: 8340, readTime: '5분', author: '이다혜 에디터', summary: '수술 직후부터 6개월까지, 붓기 빠지는 시기와 출근·운동 복귀 기준.' },
  { id: 9, title: '리프팅 후 관리법 — 효과 오래 가려면?', category: '회복관리', categoryColor: '#3B82F6', contentType: 'RECOVERY', slug: 'lifting-aftercare', procedureTags: ['리프팅'], date: '2026.02.02', views: 5890, readTime: '4분', author: '박지훈 에디터', summary: '시술 당일 주의사항, 자외선 차단, 마사지 시작 시점 가이드.' },
  { id: 10, title: '성형외과 고르는 법 — 후기 말고 이것도 보세요', category: '병원선택', categoryColor: '#8B5CF6', contentType: 'CLINIC_CHOICE', slug: 'how-to-choose-clinic', procedureTags: ['눈', '코', '리프팅'], date: '2026.01.30', views: 14200, readTime: '8분', author: '김서연 에디터', summary: '자격증 확인, 집도의 직접 상담 여부, 후기 신뢰도 판단 5단계.' },
  { id: 11, title: '온라인 후기 검증법 — 진짜 후기 vs 홍보 후기 구분', category: '병원선택', categoryColor: '#8B5CF6', contentType: 'CLINIC_CHOICE', slug: 'review-verification', procedureTags: ['눈', '코', '보톡스'], date: '2026.01.25', views: 10500, readTime: '6분', author: '이다혜 에디터', summary: '인증 후기, 사진 후기, 업체 작성 후기를 구분하는 실전 체크포인트.' },
  { id: 12, title: '첫 상담 전 체크리스트 — 이 질문은 꼭 하세요', category: '병원선택', categoryColor: '#8B5CF6', contentType: 'CLINIC_CHOICE', slug: 'consultation-checklist', procedureTags: ['눈', '코', '리프팅', '지방흡입'], date: '2026.01.20', views: 12800, readTime: '7분', author: '박지훈 에디터', summary: '상담 시 집도의 직접 참여 여부, 수술 방법, 비용 총액 확인 방법.' },
];

const BRAND = {
  name: '미녀는 괴로워',
  nameEn: 'THE GLAM',
  email: 'hello@theglam.kr',
  phone: '02-333-3539',
  domain: 'theglam.kr',
  tagline: '정직한 성형 정보, 현명한 선택',
};

// Browser + Node.js 호환
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROCEDURES, HOSPITALS, REVIEWS, ARTICLES, BRAND };
} else {
  window.GLAM_DATA = { PROCEDURES, HOSPITALS, REVIEWS, ARTICLES, BRAND };
}
