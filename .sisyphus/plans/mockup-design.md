# 미녀는 괴로워 — UI/UX 목업 디자인 (강남언니/바비톡 벤치마크)

## TL;DR

> **Quick Summary**: 미녀는 괴로워 플랫폼의 핵심 5개 페이지를 강남언니/바비톡 스타일로 벤치마크한 HTML/CSS 정적 레이아웃 목업을 제작한다. 브라우저에서 바로 열어 레이아웃/디자인을 확인할 수 있는 고충실도 정적 목업 수준 (복잡한 JS 인터랙션 없음).
>
> **Deliverables**:
> - `redesign/mockup/shared.css` — 공통 디자인 시스템 (컬러, 타이포, 컴포넌트)
> - `redesign/mockup/index.html` — 메인 홈페이지
> - `redesign/mockup/article.html` — 기사/콘텐츠 상세
> - `redesign/mockup/reviews.html` — 후기/리뷰 페이지
> - `redesign/mockup/hospitals.html` — 병원 찾기/비교
> - `redesign/mockup/consultation.html` — 상담신청 폼
>
> **Estimated Effort**: Medium (7 tasks, 3 waves)
> **Parallel Execution**: YES — Wave 2에서 5개 페이지 동시 병렬
> **Critical Path**: Task 1 (디자인 시스템) → Tasks 2-6 (5페이지 병렬) → Task 7 (QA)

---

## Context

### Original Request
사용자가 제공한 "미녀는 괴로워 웹사이트 고도화 기획서 프롬프트"에 기반하여, 기획서 작성 전에 먼저 UI/UX 목업 디자인을 확인하고 싶다는 요청.

### Key Decisions
- **브랜드명**: "미녀는 괴로워" (메인 로고/헤더), "THE GLAM" (영문 서브브랜드, footer·meta)
- **디자인 방향**: 강남언니/바비톡 벤치마크 (모던 뷰티 플랫폼 스타일)
- **산출물**: HTML/CSS 정적 레이아웃 목업 (복잡한 JS 인터랙션 없음)
- **범위**: 핵심 5개 페이지 전체
- **모바일 우선**: 모든 페이지 모바일 반응형 필수
- **기존 redesign/ 관계**: 새 목업(mockup/)이 대체. 확정 후 기존 페이지는 아카이브/삭제 예정
### Research Findings

**현재 사이트 상태 (redesign/ 폴더):**
- 5개 페이지 존재: hub형 index + 3 landing(price/safety/clinic) + 1 article
- 디자인 시스템: warm beige(#f4efe8), teal accent(#0f766e), Pretendard 폰트
- CTA 패턴: 전화(tel:0233333539), 이메일(mailto:hello@theglam.kr), 크로스플랫폼 링크
- 브랜드: THE GLAM / 미녀는 괴로워, 도메인 theglam.kr
- 콘텐츠 구조: content.js 데이터 기반 동적 렌더링 (map, methods, scenarios, intents, funnel, legal)

**원본 웹플로우 사이트 (site-mirror/):**
- 뉴스 포털형 레이아웃, 10개 카테고리, 블로그 100+개
- 작가 4명(김서연, 박지훈, 이다혜, 한상민), 유튜브/팟캐스트 섹션
- BlogPosting JSON-LD 스키마, Organization + WebSite 스키마

**강남언니/바비톡 벤치마크:**
- 강남언니: 핑크-화이트 톤, 카드 기반 UI, 별점+리뷰수, 시술 카테고리 탭, 병원 프로필 카드, Before/After, 플로팅 상담 버튼, 영수증 인증 후기
- 바비톡: 보라-핑크 그라데이션, AI 검색 바, 후기 피드(SNS형), 가격 견적 비교, 부작용 후기 별도 탭, 초개인화 추천, 하단 네비게이션 바
- 공통: 모바일 퍼스트, 하단 고정 CTA, 카드 레이아웃, 필터/정렬, 이미지 중심, 소셜 프루프

---

## Work Objectives

### Core Objective
강남언니/바비톡 수준의 모던 뷰티 플랫폼 UI를 HTML/CSS로 구현하여, 사용자(기획자)가 브라우저에서 직접 확인하고 피드백할 수 있는 고충실도 목업 5개 페이지를 제작한다.

### Concrete Deliverables
- `redesign/mockup/` 폴더 내 8개 파일 (shared.css + boilerplate.html + shared-data.js + 5개 HTML)
- 각 HTML은 `npx serve redesign/mockup` 후 브라우저에서 독립적으로 열 수 있음
- 모바일(375px)~데스크톱(1440px) 반응형
- 더미 데이터로 실제 콘텐츠 느낌 재현

### Must Have
- 모바일 우선 반응형 디자인
- 하단 고정 CTA 바 (플로팅)
- 카드 기반 UI 컴포넌트
- 실제 시술명 더미 데이터 (쌍꺼풀, 코성형, 지방흡입 등)
- 더미 병원명 (강남 AA성형외과, OO클리닉 등)
- 한국어 콘텐츠 전체
- 각 페이지 간 내비게이션 링크 연결
- Before/After 이미지 플레이스홀더
- 별점/리뷰 카운트 UI

### Must NOT Have (Guardrails)
- ❌ 실제 병원명 사용 금지 (더미만)
- ❌ 실제 환자 사진 사용 금지 (플레이스홀더만)
- ❌ 백엔드/서버 연동 (순수 HTML/CSS/JS 목업)
- ❌ 외부 프레임워크(React, Vue, Bootstrap, Tailwind) 사용 금지 — 순수 HTML/CSS + 바닐라 JS만
- ❌ 강남언니/바비톡 로고/상표 직접 사용 금지
- ❌ 영어 전용 UI 텍스트 금지 (전체 한국어)
- ❌ 바비톡/강남언니 후기 원문 복사 금지 — 의료광고법·저작권 위반 (변형·재작성만 허용)
- ❌ 의료 효과 보장 문구 금지 — "100% 성공", "부작용 없음" 등 의료법 위반 소지 문구 사용 금지
- ❌ 특정 병원 우월성 표현 금지 — "최고", "1위", "유일" 등 비교광고 표현 금지 (의료광고법)

### 추가 권장사항 (기획서 작성 시 반영)
- ⚠️ 법적 검토: 의료광고법, 의료법상 병원 알선 이슈 확인 필요 (강남언니도 의협과 갈등 사례 있음)
- ⚠️ 커스텀 도메인: 현재 webflow.io → theglam.kr 자체 도메인 연결 필수 (SEO)
- ⚠️ 초기 트래픽: 네이버 블로그/카페, 인스타그램, 유튜브 쇼츠 연동 전략 필요
- ⚠️ 목업 확정 후 본격 기획서에서 상세 다룰 항목들

---

## Verification Strategy

### QA Policy
모든 목업 페이지는 Playwright 브라우저에서 실제 열어서 시각적으로 검증.
Evidence: `.sisyphus/evidence/mockup-*.png`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 디자인 시스템 + 보일러플레이트 + 더미데이터):
└── Task 1: 공통 디자인 시스템 shared.css + boilerplate.html + shared-data.js [visual-engineering]

--- GATE: Task 1 검증 ---
  Playwright로 boilerplate.html 열어 header/footer/bottom-nav/floating-cta 렌더링 확인
  shared-data.js node import 테스트 통과 확인
  GATE 통과 후에만 Wave 2 진행

Wave 2 (5페이지 MAX PARALLEL — 모두 Task 1에만 의존):
├── Task 2: 메인 홈페이지 [visual-engineering]
├── Task 3: 기사/콘텐츠 상세 [visual-engineering]
├── Task 4: 후기/리뷰 페이지 [visual-engineering]
├── Task 5: 병원 찾기/비교 [visual-engineering]
└── Task 6: 상담신청 폼 [visual-engineering]

Wave 3 (QA + 통합 검증):
└── Task 7: Playwright 스크린샷 + 모바일 뷰 + 링크 확인 + npx serve 검증 [visual-engineering]

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|------------|--------|------|
| 1 | None | 2,3,4,5,6 | 1 |
| 2 | 1 | 7 | 2 |
| 3 | 1 | 7 | 2 |
| 4 | 1 | 7 | 2 |
| 5 | 1 | 7 | 2 |
| 6 | 1 | 7 | 2 |
| 7 | 2,3,4,5,6 | None | 3 |

### Agent Dispatch Summary
- **Wave 1**: T1 → `visual-engineering` + `frontend-ui-ux`
- **Wave 2**: T2-T6 → `visual-engineering` + `frontend-ui-ux` (5개 동시)
- **Wave 3**: T7 → `visual-engineering` + `playwright`

---

## TODOs

### Shared Directives (ALL Tasks Must Follow)

> **공통 규칙:**
> - 모든 HTML은 `<link rel="stylesheet" href="./shared.css">` + `<script src="./shared-data.js"></script>` 로 공통 CSS·데이터 참조
> - 모든 페이지는 Task 1에서 제공하는 **HTML 보일러플레이트 템플릿**을 복사하여 시작 (header/footer/bottom-nav/floating-cta 구조 통일)
> - 하단 고정 CTA 바 (`.floating-cta`): position fixed, **bottom: 56px** (모바일에서 bottom-nav 위에 위치), z-index 100, 72px 높이
> - 모바일 하단 네비 (`.bottom-nav`): position fixed, **bottom: 0**, z-index 101, 56px 높이, 5개 탭: 🏠홈 / 🔍검색 / ⭐후기 / 🏥병원 / 👤마이
> - **위치 관계**: bottom-nav(0px) → floating-cta(56px) → 본문 padding-bottom: 128px(56+72)
> - 하단 네비 탭은 각각 index.html / (현재) / reviews.html / hospitals.html / consultation.html 로 연결
> - 이미지는 절대 외부 URL 사용 금지 — div 플레이스홀더(배경색 #E5E7EB + 텍스트 "이미지")로 대체
> - 더미 데이터는 `shared-data.js`에서 가져옴 (시술명, 병원명, 가격, 후기 등 중앙 관리)
> - **JS 복잡도 한계**: 아코디언은 `<details>`/`<summary>` HTML만 사용. 카로셀, 필터, 슬라이더, 모달 등 복잡한 JS 인터랙션 금지. active 클래스 토글 정도만 허용
> - 디자인 벤치마크: 강남언니 + 바비톡 — **Playwright 직접 방문 시도 → 봇 차단(PerimeterX) 시 Google 이미지 검색/앱스토어 스크린샷으로 대체** (gangnamunni.com에 봇 차단 확인됨)
> - lang="ko", charset="utf-8", viewport 메타 필수
> - 브랜드명: **"미녀는 괴로워"** (메인 로고/제목), "THE GLAM" (영문 서브브랜드, footer·meta에서 사용)
> - 로컬 서버: `npx serve redesign/mockup` 으로 확인 (file:// 프로토콜 대신 http://localhost 사용)
---

- [x] 1. 공통 디자인 시스템 — shared.css + HTML 보일러플레이트 + shared-data.js

  **What to do**:
  - **파일 3개 생성**: `redesign/mockup/shared.css`, `redesign/mockup/boilerplate.html`, `redesign/mockup/shared-data.js`
  - **Playwright로 gangnamunni.com과 babitalk.com 방문 시도** → 봇 차단 시 Google 이미지 검색(`강남언니 앱 UI`, `바비톡 앱 화면`)으로 디자인 패턴 수집
  - **shared.css** — 컬러 팔레트 (CSS 변수):
    - `--primary`: 소프트 핑크 (#FF6B9D) — 강남언니 참고
    - `--secondary`: 라벤더 (#8B5CF6) — 바비톡 참고
    - `--accent`: 코랄 (#FF7F7F) — CTA 강조
    - `--bg`: 화이트 #FFFFFF, `--bg-gray`: #F8F9FA
    - `--text`: #1A1A2E, `--text-muted`: #6B7280
    - `--success`: #10B981, `--warning`: #F59E0B, `--danger`: #EF4444
    - `--border`: #E5E7EB, `--shadow`: rgba(0,0,0,0.08)
  - **shared.css** — 타이포: Pretendard + Noto Sans KR, 크기 12~40px 스케일, 웨이트 400/500/600/700
  - **shared.css** — 컴포넌트 클래스 (최소 15개):
    `.card`, `.badge`, `.badge-hot`, `.badge-verified`, `.rating`, `.tag`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.floating-cta`, `.bottom-nav`, `.avatar`, `.before-after`, `.price-tag`, `.price-original`, `.filter-bar`, `.section-header`, `.search-bar`, `.chip`, `.divider`
  - **shared.css** — 반응형: 모바일(~767px), 태블릿(768~1023px), 데스크톱(1024px~, max-width: 1200px)
  - **shared.css** — floating-cta와 bottom-nav 위치 관계:
    - `.bottom-nav`: position fixed, **bottom: 0**, z-index: 101, height: 56px, 모바일에서만 display:flex
    - `.floating-cta`: position fixed, **bottom: 56px** (모바일) / **bottom: 0** (데스크톱, bottom-nav 미표시), z-index: 100, height: 72px
    - `body`: padding-bottom: 128px (모바일) / 72px (데스크톱) — 콘텐츠 가림 방지
  - **boilerplate.html** — Wave 2 에이전트들이 복사할 HTML 골격 템플릿:
    - `<!DOCTYPE html>` + meta + CSS/JS 링크
    - `<header>`: 로고 "미녀는 괴로워" + 검색바 + 알림 아이콘
    - `<main>`: 빈 콘텐츠 영역 (각 페이지가 채울 부분)
    - `<footer>`: 브랜드(THE GLAM · 미녀는 괴로워), 연락처(hello@theglam.kr, 02-333-3539), 이용약관, 개인정보처리방침
    - `.floating-cta`: "무료 상담 받아보기" 핑크 버튼
    - `.bottom-nav`: 5탭 (🏠홈·🔍검색·⭐후기·🏥병원·👤마이) + 각 페이지 링크
  - **shared-data.js** — 공통 더미 데이터 세트 (모든 페이지에서 import):
    - `PROCEDURES`: [{name: '쌍꺼풀 자연유착', category: '눈', priceRange: '50~80만원'}, ...] (6개+)
    - `HOSPITALS`: [{name: '강남 AA성형외과', area: '강남역 3번출구', rating: 4.7, reviews: 328}, ...] (6개+)
    - `REVIEWS`: [{title: '쌍꺼풀 3주차 솔직후기', rating: 4.8, author: '뷰티맘**', ...}, ...] (6개+)
    - `ARTICLES`: [{title: '쌍꺼풀 수술 가격, 진짜 얼마가 드는 걸까?', category: '비용비교', ...}, ...] (3개+)
    - `BRAND`: {name: '미녀는 괴로워', nameEn: 'THE GLAM', email: 'hello@theglam.kr', phone: '02-333-3539'}
  **Must NOT do**: Bootstrap/Tailwind 사용, SCSS 전처리기 사용, 카로셀/슬라이더/모달 등 복잡한 JS

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 1 | Blocks: 2,3,4,5,6 | Blocked By: None

  **References**:
  - `redesign/styles.css` — 현재 CSS 구조 참고 (반응형 패턴)
  - gangnamunni.com — 카드/별점/병원카드 디자인 패턴
  - babitalk.com — 검색바/후기피드/가격비교 UI 패턴

  **Acceptance Criteria**:
  - [ ] shared.css 파일 생성됨
  - [ ] boilerplate.html 파일 생성됨 (header + footer + floating-cta + bottom-nav)
  - [ ] shared-data.js 파일 생성됨 (PROCEDURES, HOSPITALS, REVIEWS, ARTICLES, BRAND)
  - [ ] CSS 변수 15개+ 정의
  - [ ] 컴포넌트 클래스 15개+ 정의
  - [ ] 미디어쿼리 2개+ (767px, 1024px)
  - [ ] floating-cta bottom:56px(모바일) / bottom-nav bottom:0 위치 관계 정확
  **QA Scenarios:**
  ```
  Scenario: CSS 유효성
    Tool: Bash
    Steps: grep -c "\-\-" redesign/mockup/shared.css → Assert ≥ 15
    Evidence: .sisyphus/evidence/task-1-css.txt

  Scenario: 보일러플레이트 HTML 구조 확인
    Tool: Playwright
    Preconditions: npx serve redesign/mockup 실행
    Steps:
      1. http://localhost:3000/boilerplate.html 열기 (375×812)
      2. header에 "미녀는 괴로워" 텍스트 존재 확인
      3. .bottom-nav 요소 존재 + 5개 탭 확인
      4. .floating-cta 요소 존재 확인
      5. footer에 "THE GLAM" 텍스트 존재 확인
    Expected: 헤더/푸터/네비/CTA 모두 렌더링, 겹침 없음
    Evidence: .sisyphus/evidence/task-1-boilerplate.png

  Scenario: shared-data.js 유효성
    Tool: Bash
    Steps: node -e "const d=require('./redesign/mockup/shared-data.js'); console.log(Object.keys(d))"
    Expected: PROCEDURES, HOSPITALS, REVIEWS, ARTICLES, BRAND 키 모두 존재
    Evidence: .sisyphus/evidence/task-1-data.txt

  Scenario: 강남언니/바비톡 디자인 참고 수집 (봇 차단 대비)
    Tool: Playwright
    Steps:
      1. gangnamunni.com 접속 시도 → 스크린샷 캡처
      2. 봇 차단 시: Google 이미지 검색 "강남언니 앱 UI 디자인" → 상위 결과 스크린샷
      3. babitalk.com 접속 시도 → 스크린샷 캡처
      4. 봇 차단 시: Google 이미지 검색 "바비톡 앱 화면" → 상위 결과 스크린샷
    Expected: 최소 2장의 벤치마크 참고 이미지 확보
    Failure Indicators: 두 사이트 모두 차단 + Google 검색도 실패
    Evidence: .sisyphus/evidence/benchmark-gangnamunni.png, .sisyphus/evidence/benchmark-babitalk.png
  ```

  **Commit**: NO

---

- [x] 2. 메인 홈페이지 — index.html

  **What to do**:
  - `redesign/mockup/index.html` 생성 — **boilerplate.html을 복사하여 시작, shared-data.js의 더미데이터 활용**
  - **헤더**: 로고 "미녀는 괴로워" (핑크 강조) + 검색바 (중앙, "쌍꺼풀, 코성형, 리프팅..." 플레이스홀더) + 인기 검색어 태그 가로스크롤
  - **히어로 배너**: 그라데이션 배경, "이번 주 인기 시술 TOP 5" + CTA버튼
  - **카테고리 탭 바** (가로 스크롤): 전체|눈|코|윤곽|가슴|지방흡입|리프팅|피부|치아|기타 (각 이모지+텍스트)
  - **인기 후기 섹션**: "실시간 인기 후기" + "더보기>" / 후기카드 3개 (썸네일 플레이스홀더 + 시술태그 + 별점 + 한줄요약 + ♥좋아요수)
  - **에디터 추천 섹션**: "에디터 추천" + "더보기>" / 기사카드 3개 (이미지 플레이스홀더 + 카테고리 배지 + 제목 + 날짜 + 조회수)
  - **가격 비교 섹션**: "시술별 가격 비교" + "더보기>" / 가격카드 3개 (시술명 + 가격범위 + "비교하기" 버튼)
  - **병원 추천 섹션**: "이달의 추천 병원" + "더보기>" / 병원카드 3개 (병원명 + 지역 + 태그 + ★별점 + 리뷰수 + "무료상담" 버튼)
  - **이벤트 배너**: 가로 스크롤 배너 2-3개
  - **플로팅 CTA**: "무료 상담 받아보기" 핑크 버튼 (하단 고정)
  - **모바일 하단 네비**: 5탭 (홈·검색·후기·병원·마이) → 각 목업 페이지 링크
  - **푸터**: 브랜드, 연락처(hello@theglam.kr, 02-333-3539), 이용약관, 개인정보처리방침

  **Must NOT do**: 실제 병원명/환자사진, 복잡한 JS, 외부 이미지 CDN

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 2 (with 3,4,5,6) | Blocks: 7 | Blocked By: 1

  **References**:
  - `redesign/index.html` — 현재 홈페이지 섹션 구조
  - `redesign/content.js` — 데이터 구조 (map, intents, funnel, cta)
  - `site-mirror/index.html` — 원본 웹플로우 레이아웃 (10개 카테고리, 속보 티커, 뉴스 그리드)

  **Acceptance Criteria**:
  - [ ] index.html 생성됨
  - [ ] 헤더, 히어로, 카테고리탭, 후기, 기사, 가격비교, 병원추천, 이벤트, 푸터 섹션 모두 존재
  - [ ] 플로팅 CTA 바 + 모바일 하단 네비 존재
  - [ ] 4개 다른 목업 페이지 링크 존재

  **QA Scenarios:**
  ```
  Scenario: 홈페이지 데스크톱
    Tool: Playwright
    Preconditions: npx serve redesign/mockup 실행
    Steps: http://localhost:3000/index.html 열기, 뷰포트 1440×900, 전체 스크린샷
    Expected: 카드 3열 배치, 모든 섹션 렌더링
    Evidence: .sisyphus/evidence/task-2-desktop.png

  Scenario: 홈페이지 모바일
    Tool: Playwright
    Steps: 뷰포트 375×812, 전체 스크린샷
    Expected: 1열 카드, 하단네비 표시, floating-cta가 bottom-nav 위에 위치
    Evidence: .sisyphus/evidence/task-2-mobile.png
  ```

  **Commit**: NO

---

- [x] 3. 기사/콘텐츠 상세 — article.html

  **What to do**:
  - `redesign/mockup/article.html` 생성 — **boilerplate.html을 복사하여 시작, shared-data.js의 ARTICLES 데이터 활용**
  - **기사 제목**: "쌍꺼풀 수술 가격, 진짜 얼마가 드는 걸까?" (예시)
  - **기사 메타**: 카테고리 배지 [비용비교] + 작성일 2026.02.20 + 조회수 1,234 + 읽기시간 5분
  - **작성자 프로필**: 아바타(플레이스홀더) + 이름 "김서연 에디터" + 한줄 소개
  - **본문 콘텐츠**:
    - H2 소제목 3~4개로 구조화
    - 비용 비교표 (테이블): 매몰법 50~80만, 절개법 80~150만, 자연유착 70~120만
    - 체크리스트 박스: "수술 전 확인사항 5가지"
    - 인포박스: "에디터 TIP" 강조 블록
    - Before/After 플레이스홀더 (가로 2분할)
  - **사이드바 (데스크톱)** 또는 **본문 중간 삽입 (모바일)**:
    - 병원 추천 카드 1-2개 (병원명 + 별점 + "무료상담" 버튼)
    - 관련 기사 3개 (썸네일 + 제목)
  - **CTA 영역** (본문 종료 후):
    - "이 시술에 관심이 있으신가요?" → "무료 상담 받아보기" 핑크 버튼
    - 바비톡/강남언니 크로스체크 링크
  - **댓글/질문 섹션**: 더미 댓글 2-3개 (아바타 + 닉네임 + 내용 + 좋아요)
  - **플로팅 CTA** + **하단 네비**

  **Must NOT do**: 실제 의료 정보 제공 (더미 텍스트), 외부 이미지

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 2 (with 2,4,5,6) | Blocks: 7 | Blocked By: 1

  **References**:
  - `redesign/articles/safety-side-effect-signals.html` — 현재 기사 템플릿 (H1 + 카드 + CTA + disclaimer)
  - `site-mirror/blog/abdominal-etching-surgery-maintenance/index.html` — 원본 블로그 글 구조 (BlogPosting 스키마, 작가 정보)
  - `redesign/editorial/TRANSFORMATION_PIPELINE.md` — 콘텐츠 구조 규칙 (Hook→Value→Trust→Action)

  **Acceptance Criteria**:
  - [ ] article.html 생성됨
  - [ ] 기사 제목, 메타(배지+날짜+조회수), 작성자 프로필 존재
  - [ ] 본문에 비교표, 체크리스트, 인포박스 존재
  - [ ] 병원 추천 카드 + CTA 영역 존재
  - [ ] 댓글 섹션 존재 (더미 2-3개)

  **QA Scenarios:**
  ```
  Scenario: 기사 데스크톱
    Tool: Playwright
    Preconditions: npx serve redesign/mockup 실행
    Steps: http://localhost:3000/article.html 열기, 1440×900, 전체 스크린샷, 사이드바 병원카드 확인
    Evidence: .sisyphus/evidence/task-3-desktop.png

  Scenario: 기사 모바일
    Tool: Playwright
    Steps: 375×812, CTA 버튼 가시성 확인, floating-cta가 bottom-nav 위에 위치
    Evidence: .sisyphus/evidence/task-3-mobile.png
  ```

  **Commit**: NO

---

- [x] 4. 후기/리뷰 페이지 — reviews.html

  **What to do**:
  - `redesign/mockup/reviews.html` 생성 — **boilerplate.html을 복사하여 시작, shared-data.js의 REVIEWS 데이터 활용**
  - **페이지 제목**: "리얼 후기 모아보기"
  - **필터 바** (상단 고정 or 스크롤):
    - 시술 카테고리 필터 (칩/태그): 전체|눈|코|윤곽|가슴|지방흡입|리프팅|피부
    - 정렬: 인기순|최신순|별점높은순|댓글많은순
    - 인증 필터: 전체|인증후기만|사진후기만
  - **후기 카드 목록** (6개 더미 후기):
    각 카드에:
    - 인증 배지 (🏷️인증 / 📸사진)
    - 시술명 태그 (쌍꺼풀 자연유착)
    - ★ 별점 (4.8)
    - 제목: "쌍꺼풀 자연유착 3주차 솔직후기"
    - 요약 텍스트 2-3줄
    - Before/After 이미지 플레이스홀더 (가로 2장)
    - 메타: 작성자 닉네임 + 작성일 + 병원명(더미) + 비용
    - 상호작용: ♥ 좋아요수 + 💬 댓글수 + 👁️ 조회수
  - **후기 유형 혼합** (더미 데이터):
    - 2개: 만족 후기 (별점 4.5~5.0)
    - 2개: 보통 후기 (별점 3.0~3.5)
    - 1개: 부작용/불만족 후기 (별점 2.0) — 바비톡처럼 병원명 노출
    - 1개: 경과 업데이트 후기 (1개월→3개월→6개월 타임라인)
  - **후기 작성 유도 배너**: "나도 후기 작성하기" CTA (모달 미구현, 버튼만)
  - **플로팅 CTA** + **하단 네비**

  **Must NOT do**: 실제 후기 복사, 실제 병원/환자 정보

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 2 (with 2,3,5,6) | Blocks: 7 | Blocked By: 1

  **References**:
  - 강남언니 후기 목록 — 별점+사진+인증배지 카드 패턴
  - 바비톡 후기 피드 — SNS형 피드 + 부작용후기 탭 + 타임라인 업데이트
  - `redesign/editorial/BATCH_02_REAL_20.md` — 콘텐츠 유형 분류 (PRICE/SAFETY/RECOVERY/CLINIC_CHOICE)

  **Acceptance Criteria**:
  - [ ] reviews.html 생성됨
  - [ ] 필터 바 (카테고리 + 정렬 + 인증필터) 존재
  - [ ] 후기 카드 6개 존재 (만족2 + 보통2 + 부작용1 + 경과1)
  - [ ] 각 카드에 별점, Before/After 플레이스홀더, 좋아요/댓글/조회수 존재
  - [ ] "후기 작성하기" CTA 존재

  **QA Scenarios:**
  ```
  Scenario: 후기 데스크톱
    Tool: Playwright
    Preconditions: npx serve redesign/mockup 실행
    Steps: http://localhost:3000/reviews.html 열기, 1440×900, 카드 2열 배치 확인, 필터바 확인
    Evidence: .sisyphus/evidence/task-4-desktop.png

  Scenario: 후기 모바일
    Tool: Playwright
    Steps: 375×812, 1열 카드, 필터바 가로스크롤
    Evidence: .sisyphus/evidence/task-4-mobile.png
  ```

  **Commit**: NO

---

- [x] 5. 병원 찾기/비교 — hospitals.html

  **What to do**:
  - `redesign/mockup/hospitals.html` 생성 — **boilerplate.html을 복사하여 시작, shared-data.js의 HOSPITALS 데이터 활용**
  - **검색/필터 영역**:
    - 검색바: "병원명, 시술명, 지역 검색"
    - 지역 필터 (칩): 전체|강남|신사|압구정|잠실|홍대|신촌|기타
    - 시술 필터 (칩): 눈|코|윤곽|가슴|지방흡입|리프팅|피부
    - 정렬: 추천순|리뷰많은순|별점높은순|가격낮은순
  - **병원 카드 목록** (6개 더미 병원):
    각 카드에:
    - 병원 대표 이미지 플레이스홀더
    - 병원명 (강남 AA성형외과)
    - 위치 (강남역 3번출구 도보 5분)
    - 대표 시술 태그 3개 (눈, 코, 윤곽)
    - ★ 별점 + 리뷰수 (★4.7 · 328개 후기)
    - 대표 가격: "쌍꺼풀 매몰법 ~~80만원~~ **59만원** (이벤트)"
    - 뱃지: 🏆인기 / ✅인증 / 🎉이벤트 중
    - CTA: "무료 상담 신청" 버튼 (핑크)
    - 보조: "상세보기" 링크
  - **가격 비교 도구** (하단 섹션):
    - 시술 선택 드롭다운
    - 비교표: 병원 3개 × 항목(가격, 별점, 리뷰수, 위치, 이벤트) 비교 테이블
    - "이 병원들에 한번에 상담 문의하기" CTA
  - **이벤트 모아보기** (하단):
    - 이벤트 카드 3개 (병원명 + 시술 + 할인가 + 기간 + "신청하기")
  - **플로팅 CTA**: "병원 비교 후 상담 받기"
  - **하단 네비**

  **Must NOT do**: 실제 병원 정보, 실제 가격, 지도 API 연동

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 2 (with 2,3,4,6) | Blocks: 7 | Blocked By: 1

  **References**:
  - 강남언니 병원 목록 — 카드 레이아웃, 별점+리뷰수, 이벤트가격 표시
  - 바비톡 발품정보 — 견적 비교 UI, 가격 비교표
  - `redesign/landing/price-comparison.html` — 현재 가격 비교 랜딩 (5항목 체크리스트)
  - `redesign/landing/clinic-selection.html` — 현재 병원 선택 랜딩 (상담 질문 템플릿)

  **Acceptance Criteria**:
  - [ ] hospitals.html 생성됨
  - [ ] 검색/필터 영역 (지역 + 시술 + 정렬) 존재
  - [ ] 병원 카드 6개 (이름, 위치, 태그, 별점, 가격, CTA)
  - [ ] 가격 비교 테이블 (3개 병원 비교) 존재
  - [ ] 이벤트 모아보기 카드 3개 존재

  **QA Scenarios:**
  ```
  Scenario: 병원 데스크톱
    Tool: Playwright
    Preconditions: npx serve redesign/mockup 실행
    Steps: http://localhost:3000/hospitals.html 열기, 1440×900, 병원카드 2-3열 확인, 비교표 확인
    Evidence: .sisyphus/evidence/task-5-desktop.png

  Scenario: 병원 모바일
    Tool: Playwright
    Steps: 375×812, 1열 카드, 필터 가로스크롤
    Evidence: .sisyphus/evidence/task-5-mobile.png
  ```

  **Commit**: NO

---

- [x] 6. 상담신청 폼 — consultation.html

  **What to do**:
  - `redesign/mockup/consultation.html` 생성 — **boilerplate.html을 복사하여 시작, FAQ는 `<details>`/`<summary>` HTML만 사용**
  - **페이지 제목**: "무료 상담 신청" + 부제: "전문 상담사가 24시간 내 연락드립니다"
  - **신뢰 배지 영역**: "누적 상담 12,340건" + "만족도 4.8점" + "평균 응답 3시간" (더미 수치)
  - **상담 신청 폼**:
    - 이름 (input text, 필수)
    - 연락처 (input tel, 필수, "010-0000-0000" 플레이스홀더)
    - 관심 시술 (select 드롭다운: 쌍꺼풀/코성형/지방흡입/리프팅/윤곽/보톡스/필러/기타)
    - 희망 지역 (select: 강남/신사/압구정/잠실/홍대/기타)
    - 예산 범위 (radio: 50만원 이하/50~100만원/100~200만원/200~300만원/300만원 이상/미정)
    - 추가 메시지 (textarea, 선택)
    - 개인정보 수집 동의 체크박스 (필수)
    - "무료 상담 신청하기" 버튼 (핑크, 큰 사이즈)
  - **간편 문의** (폼 하단):
    - 카카오톡 상담 버튼 (노란색)
    - 전화 상담 버튼 (tel:0233333539)
    - 이메일 문의 (mailto:hello@theglam.kr)
  - **FAQ 섹션**: 아코디언 3개
    - "상담 신청하면 바로 수술해야 하나요?" → 아닙니다...
    - "어떤 병원이 연락을 주나요?" → 관심 시술과 지역에 맞는...
    - "상담 비용이 있나요?" → 모든 상담은 무료입니다...
  - **후기 증언** (폼 옆 or 하단):
    - 더미 후기 2개: "상담 받고 좋은 병원 소개받았어요!" ★★★★★
  - **개인정보 안내**: 짧은 안내 텍스트 + 링크
  - **플로팅 CTA**: "전화로 바로 상담" (전화 아이콘)
  - **하단 네비**

  **Must NOT do**: 실제 폼 제출 (action="#", onsubmit="return false"), 외부 API 연동

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 2 (with 2,3,4,5) | Blocks: 7 | Blocked By: 1

  **References**:
  - 강남언니 상담신청 플로우 — 앱 내 상담 폼, 시술/지역 선택 UI
  - `redesign/landing/clinic-selection.html` — 현재 상담 준비 페이지 (질문 템플릿)

  **Acceptance Criteria**:
  - [ ] consultation.html 생성됨
  - [ ] 상담 폼 필드 7개 (이름, 연락처, 시술, 지역, 예산, 메시지, 동의)
  - [ ] 제출 버튼 + 간편문의(카카오/전화/이메일) 존재
  - [ ] FAQ 아코디언 3개 존재
  - [ ] 신뢰 배지 영역 존재

  **QA Scenarios:**
  ```
  Scenario: 상담폼 데스크톱
    Tool: Playwright
    Preconditions: npx serve redesign/mockup 실행
    Steps: http://localhost:3000/consultation.html 열기, 1440×900, 폼 필드 표시 확인, FAQ <details> 클릭하여 아코디언 열림 확인
    Evidence: .sisyphus/evidence/task-6-desktop.png

  Scenario: 상담폼 모바일
    Tool: Playwright
    Steps: 375×812, 폼 레이아웃 1열 확인, 버튼 터치영역 확인, floating-cta가 bottom-nav 위에 위치
    Evidence: .sisyphus/evidence/task-6-mobile.png
  ```

  **Commit**: NO

---

- [x] 7. 전체 QA — Playwright 스크린샷 + 네비게이션 통합 검증

  **What to do**:
  - `npx serve redesign/mockup` 실행 후 5개 목업 페이지 전체를 Playwright로 열어 시각적 검증
  - **데스크톱 (1440×900)**: 5개 페이지 각각 전체 스크린샷
  - **모바일 (375×812)**: 5개 페이지 각각 전체 스크린샷
  - **네비게이션 검증**: 하단 네비 5개 탭이 모든 페이지에서 올바른 페이지로 연결되는지 확인
  - **플로팅 CTA/bottom-nav 검증**: 모든 페이지에서 floating-cta가 bottom-nav 위에 위치하는지 확인 (겹침 없음)
  - **일관성 검증**: 헤더/푸터/하단네비가 모든 페이지에서 동일한 구조 (boilerplate 정합성)
  - 문제 발견 시 해당 HTML/CSS 수정
  - 모든 스크린샷을 `.sisyphus/evidence/` 에 저장
  **Must NOT do**: 페이지 구조 변경 (시각적 수정만)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
  - **Skills**: [`playwright`, `frontend-ui-ux`]

  **Parallelization**: Wave 3 | Blocks: None | Blocked By: 2,3,4,5,6

  **References**:
  - `redesign/mockup/*.html` — 모든 목업 페이지

  **Acceptance Criteria**:
  - [ ] 스크린샷 10장 (.sisyphus/evidence/mockup-*.png)
  - [ ] 모든 페이지 렌더링 정상 (깨진 레이아웃 0)
  - [ ] 하단 네비 링크 5개 모두 정상 작동
  - [ ] 플로팅 CTA 모든 페이지 표시 + bottom-nav 위에 위치
  - [ ] 모바일에서 레이아웃 정상
  - [ ] 헤더/푸터/네비 5개 페이지 간 일관성 확인
  **QA Scenarios:**
  ```
  Scenario: 전체 페이지 데스크톱 스크린샷
    Tool: Playwright
    Preconditions: npx serve redesign/mockup 실행
    Steps:
      1. http://localhost:3000/index.html → 1440×900 스크린샷
      2. http://localhost:3000/article.html → 1440×900 스크린샷
      3. http://localhost:3000/reviews.html → 1440×900 스크린샷
      4. http://localhost:3000/hospitals.html → 1440×900 스크린샷
      5. http://localhost:3000/consultation.html → 1440×900 스크린샷
    Evidence: .sisyphus/evidence/mockup-{page}-desktop.png (5장)

  Scenario: 전체 페이지 모바일 스크린샷
    Tool: Playwright
    Steps:
      1~5. 각 페이지 375×812 스크린샷
      각 페이지에서 floating-cta가 bottom-nav 위에 위치하는지 확인
    Evidence: .sisyphus/evidence/mockup-{page}-mobile.png (5장)

  Scenario: 네비게이션 통합
    Tool: Playwright
    Steps:
      1. http://localhost:3000/index.html 열기
      2. .bottom-nav "후기" 탭 클릭 → reviews.html URL 확인
      3. .bottom-nav "병원" 탭 클릭 → hospitals.html URL 확인
      4. .bottom-nav "마이" 탭 클릭 → consultation.html URL 확인
    Expected: 모든 링크 정상 작동
    Evidence: .sisyphus/evidence/mockup-nav-test.png
  ```

  **Commit**: YES
  - Message: `feat(mockup): 강남언니/바비톡 벤치마크 5페이지 UI/UX 목업`
  - Files: `redesign/mockup/*`

---

## Final Verification Wave

- [x] F1. **Visual QA** — `visual-engineering` + `playwright`
  `npx serve redesign/mockup` 실행 후 Playwright로 모든 5개 페이지를 데스크톱(1440px) + 모바일(375px) 뷰포트에서 스크린샷 캡처.
  각 페이지의 CTA 버튼 가시성, 카드 레이아웃 정렬, 폰트 렌더링, 색상 일관성 확인.
  floating-cta와 bottom-nav 겹침 없음 확인 (모바일 뷰포트).
  페이지 간 네비게이션 링크 클릭하여 모든 연결 확인.
  Output: `.sisyphus/evidence/mockup-*.png` (10장: 5페이지 × 2뷰포트)
  VERDICT: APPROVE if 모든 페이지 렌더링 정상 + CTA 가시성 확인 + 모바일 레이아웃 정상 + floating/nav 겹침 없음

---

## Commit Strategy

| After Task | Message | Files |
|------------|---------|-------|
| 7 (최종) | `feat(mockup): 강남언니/바비톡 벤치마크 5페이지 UI 목업` | `redesign/mockup/*` |

---

## Success Criteria

### Verification Commands
```bash
# 목업 파일 존재 확인
ls redesign/mockup/
# Expected: shared.css boilerplate.html shared-data.js index.html article.html reviews.html hospitals.html consultation.html
npx serve redesign/mockup
# Expected: 로컬 서버 기동, 브라우저에서 http://localhost:3000 접근 가능

### Final Checklist
- [ ] 8개 파일 존재 (1 CSS + 1 boilerplate + 1 data.js + 5 HTML)
- [ ] 모든 HTML npx serve 후 브라우저에서 독립 렌더링 가능
- [ ] 모바일 뷰(375px) 레이아웃 정상
- [ ] 하단 고정 CTA 바 모든 페이지에 존재 + bottom-nav 위에 위치
- [ ] 카드 기반 UI 컴포넌트 사용
- [ ] 더미 데이터 한국어 콘텐츠 채워짐 (shared-data.js에서 가져옴)
- [ ] 페이지 간 네비게이션 링크 작동
- [ ] 헤더/푸터/네비 5개 페이지 간 일관성 확인
- [ ] 스크린샷 증거 10장 저장
- [ ] 브랜드명 "미녀는 괴로워" 헤더에 적용, "THE GLAM" 푸터에 적용