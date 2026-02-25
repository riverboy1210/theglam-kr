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

// 커뮤니티 게시글 (8개)
const COMMUNITY_POSTS = [
  { id: 1, author: '익명의 토끼 🐰', date: '3일 전', procedure: '쌍꺼풀 매몰법', category: '눈', hospital: '강남 AA성형외과', cost: '65만원', recovery: '2주', rating: 4.5, title: '쌍꺼풀 매몰법 3개월 후기 — 생각보다 자연스러워요', excerpt: '강남 AA성형외과에서 쌍꺼풀 매몰법 받은 지 3개월이 됐어요. 처음엔 붓기가 걱정됐는데 생각보다 빨리 빠졌고 지금은 정말 자연스러워요. 친구들도 모를 정도!', imageCount: 4, likes: 247, comments: 38, views: 1820, tags: ['쌍꺼풀', '매몰법', '눈성형'], verified: true },
  { id: 2, author: '익명의 고양이 🐱', date: '5일 전', procedure: '코끝 성형', category: '코', hospital: '신사 BB클리닉', cost: '120만원', recovery: '3주', rating: 4.0, title: '코끝 성형 2개월 — 붓기 완전히 빠지는 데 시간이 걸려요', excerpt: '코끝 볼륨을 살리는 수술을 받았어요. 1개월까지는 붓기 때문에 답답했는데 2개월 되니까 원하던 모양이 나오기 시작했어요. 결과는 만족!', imageCount: 3, likes: 182, comments: 24, views: 1240, tags: ['코성형', '코끝', '콧대'], verified: true },
  { id: 3, author: '익명의 판다 🐼', date: '1주 전', procedure: '리프팅', category: '리프팅', hospital: '압구정 CC의원', cost: '85만원', recovery: '1주', rating: 3.5, title: '실리프팅 4주차 — 효과 있나요? 솔직 후기', excerpt: '30대 중반에 처음 리프팅 받아봤어요. 시술 직후에는 당기는 느낌이 있었고 지금은 한쪽이 조금 더 내려간 것 같아서 걱정 중. 개인차가 있다고 하더라고요.', imageCount: 2, likes: 143, comments: 52, views: 2100, tags: ['리프팅', '실리프팅', '안티에이징'], verified: false },
  { id: 4, author: '익명의 여우 🦊', date: '10일 전', procedure: '필러', category: '필러/보톡스', hospital: '강남 AA성형외과', cost: '30만원', recovery: '3일', rating: 5.0, title: '팔자주름 필러 — 시술 1시간, 효과 바로 나요!', excerpt: '팔자주름이 너무 신경 쓰여서 필러 맞았어요. 시술 시간은 30분도 안 걸렸고 멍이 조금 들었지만 3일 만에 다 빠졌어요. 결과 대만족입니다.', imageCount: 5, likes: 389, comments: 41, views: 3200, tags: ['필러', '팔자주름', '히알루론산'], verified: true },
  { id: 5, author: '익명의 곰 🐻', date: '2주 전', procedure: '지방흡입', category: '바디', hospital: '신사 BB클리닉', cost: '280만원', recovery: '4주', rating: 4.0, title: '복부 지방흡입 2개월 — 효과 있었나요?', excerpt: '출산 후 달라진 복부 때문에 지방흡입 결심했어요. 회복이 생각보다 힘들었고 압박복이 고통스러웠지만... 지금은 거울 보는 게 즐거워졌어요.', imageCount: 6, likes: 215, comments: 67, views: 4100, tags: ['지방흡입', '복부', '바디라인'], verified: true },
  { id: 6, author: '익명의 오리 🦆', date: '3주 전', procedure: '눈밑지방재배치', category: '눈', hospital: '압구정 CC의원', cost: '190만원', recovery: '2주', rating: 4.5, title: '눈밑지방재배치 — 애교살이 생겼어요', excerpt: '눈밑 불룩함이 콤플렉스였는데 수술 후 확실히 없어지고 오히려 애교살이 생겼어요. 의사 선생님이 자연스럽게 해주셔서 너무 만족스러워요.', imageCount: 4, likes: 312, comments: 29, views: 2850, tags: ['눈밑지방재배치', '애교살', '눈성형'], verified: true },
  { id: 7, author: '익명의 강아지 🐶', date: '1개월 전', procedure: '광대축소', category: '얼굴윤곽', hospital: '강남 AA성형외과', cost: '350만원', recovery: '6주', rating: 3.5, title: '광대축소 3개월 — 회복이 정말 힘들었어요', excerpt: '얼굴이 넓어서 고민이었는데 광대축소 했어요. 솔직히 회복기간이 너무 힘들었어요. 6주간 붓기와 싸웠고 지금도 왼쪽이 약간 비대칭인 것 같아서 추적관찰 중이에요.', imageCount: 3, likes: 167, comments: 89, views: 5200, tags: ['광대축소', '얼굴윤곽', '뼈수술'], verified: false },
  { id: 8, author: '익명의 토끼2 🐰', date: '1개월 전', procedure: '보톡스', category: '필러/보톡스', hospital: '압구정 CC의원', cost: '15만원', recovery: '없음', rating: 5.0, title: '사각턱 보톡스 — 6개월째 지속 중이에요', excerpt: '사각턱 보톡스를 처음 맞은 게 6개월 전인데 아직도 효과가 유지되고 있어요. 시술 후 2주부터 서서히 갸름해지는 게 보였고 지금은 V라인이 생겼어요.', imageCount: 2, likes: 428, comments: 33, views: 3800, tags: ['보톡스', '사각턱', '턱보톡스'], verified: true }
];

// 댓글 (5개, community-post.html용)
const COMMENTS = [
  { id: 1, author: '익명의 고양이 🐱', text: '저도 같은 시술 고민 중인데 정말 도움이 됐어요! 비용이랑 회복기간 정보가 너무 유용해요.', date: '2시간 전', likes: 12 },
  { id: 2, author: '익명의 판다 🐼', text: '혹시 병원 예약은 어떻게 하셨나요? 전화로 상담 먼저 받으셨나요?', date: '4시간 전', likes: 7 },
  { id: 3, author: '익명의 여우 🦊', text: '저도 비슷한 수술 받았는데 붓기가 빠지는 게 개인차가 크더라고요. 빨리 빠지셨네요 부러워요!', date: '1일 전', likes: 23 },
  { id: 4, author: '익명의 곰 🐻', text: '경험 공유해주셔서 감사해요. 의료 정보는 개인차가 있으니 꼭 전문의와 상담하세요~', date: '2일 전', likes: 34 },
  { id: 5, author: '익명의 오리 🦆', text: '이런 솔직한 후기 너무 좋아요. 덕분에 미리 마음의 준비를 할 수 있었어요.', date: '3일 전', likes: 18 }
];

// 전문의 자문위원 (3명)
const TRUST_EXPERTS = [
  { id: 1, emoji: '👨‍⚕️', name: '김OO 원장', specialty: '성형외과 전문의', hospital: '강남 AA성형외과', experience: '15년', role: '의료 자문위원' },
  { id: 2, emoji: '👩‍⚕️', name: '이OO 원장', specialty: '피부과 전문의', hospital: '신사 BB클리닉', experience: '12년', role: '피부 자문위원' },
  { id: 3, emoji: '👨‍🔬', name: '박OO 교수', specialty: '의료정보학 박사', hospital: '○○대학교병원', experience: '20년', role: '정보 감수위원' }
];

// Browser + Node.js 호환
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROCEDURES, HOSPITALS, REVIEWS, ARTICLES, BRAND, COMMUNITY_POSTS, COMMENTS, TRUST_EXPERTS };
} else {
  window.GLAM_DATA = { PROCEDURES, HOSPITALS, REVIEWS, ARTICLES, BRAND, COMMUNITY_POSTS, COMMENTS, TRUST_EXPERTS };
}
