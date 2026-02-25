# 콘텐츠 허브 + 분산 접목 목업 — articles.html 신규 + 기존 페이지 업데이트

## TL;DR

> **Quick Summary**: 383개 기존 정보성 글을 새 목업에 접목하기 위해, 콘텐츠 허브 페이지(articles.html)를 신규 생성하고, 기존 4개 페이지에 관련 기사 카드를 분산 배치한다. shared-data.js의 ARTICLES 데이터를 12개로 확장하고, article.html 상세 템플릿에 관련 기사/사이드바를 보강한다.
>
> **Deliverables**:
> - `redesign/mockup/articles.html` — 콘텐츠 허브 (신규)
> - `redesign/mockup/shared-data.js` — ARTICLES 12개로 확장
> - `redesign/mockup/article.html` — 상세 템플릿 보강 (관련 기사 동적화)
> - `redesign/mockup/index.html` — 에디터 추천 확장 + 최신 기사 섹션
> - `redesign/mockup/reviews.html` — 관련 기사 섹션 추가
> - `redesign/mockup/hospitals.html` — 시술 가이드 기사 섹션 추가
> - `redesign/mockup/consultation.html` — FAQ 기사 링크 추가
> - `redesign/mockup/shared.css` — 필요 시 신규 컴포넌트 스타일 추가
>
> **Estimated Effort**: Medium (5 tasks, 2 waves)
> **Parallel Execution**: YES — Wave 2에서 4개 페이지 업데이트 동시 병렬
> **Critical Path**: Task 1 (데이터+CSS) → Task 2 (articles.html) + Tasks 3-5 (기존 페이지 업데이트 병렬) → QA

---

## Context

### Original Request
사용자가 기존 사이트(site-mirror/)에 383개 정보성 블로그 글이 있는데, 새 목업 디자인에 어떻게 접목시킬 수 있느냐고 질문. 분석 후 "C. 허브 + 분산" 방식을 추천했고 사용자가 동의.

### Key Decisions
- **접목 전략**: C안 — 전용 허브 페이지(articles.html) + 기존 페이지에 관련 기사 분산 배치
- **하단 네비 변경**: "검색" 탭 → articles.html로 연결 (전 페이지 bottom-nav 업데이트)
- **데이터 확장**: shared-data.js ARTICLES를 3개→12개로 확장, 4가지 콘텐츠 유형 균등 배분
- **라우팅**: 목업 단계이므로 모든 기사 카드는 `./article.html`로 링크 (단일 상세 페이지)
- **shared-data.js 용도**: 개발자 참고용 데이터 + 추후 JS 렌더링 가능하도록 구조화 (목업에서는 HTML 하드코딩)

### Metis Review
**Identified Gaps** (addressed):
- 라우팅 전략: 목업이므로 단일 article.html로 통일 (추후 ?id=X 확장 가능)
- shared-data.js 바인딩: 목업은 하드코딩, 데이터는 개발 참고용 스키마로 확장
- 시술별 필터 UX: 콘텐츠유형 탭(1차) + 시술태그 칩(2차) 2단 구조
- ARTICLES 스키마: id, title, slug, category, contentType, procedureTags, date, views, readTime, author, summary 필드

---

## Work Objectives

### Core Objective
383개 기존 블로그 콘텐츠가 새 목업 UI에서 어떻게 노출되는지 시각적으로 보여주는 것. 콘텐츠 허브 페이지 + 기존 페이지 분산 배치의 완성된 목업을 브라우저에서 확인 가능하게 한다.

### Concrete Deliverables
- `articles.html` — 콘텐츠 허브 (카테고리 필터 + 시술 태그 + 검색 + 12개 기사 카드 그리드)
- 기존 4개 페이지에 관련 기사 섹션 추가 (각 2-3개 카드)
- 모든 페이지 bottom-nav "검색" 탭 → articles.html 링크로 변경
- shared-data.js에 확장된 ARTICLES 스키마 (12개)

### Must Have
- articles.html에 콘텐츠유형 필터 탭: 전체 | 비용비교 | 안전정보 | 회복관리 | 병원선택
- articles.html에 시술별 태그 칩: 눈 | 코 | 리프팅 | 보톡스 | 지방흡입 | 윤곽 | 피부
- articles.html에 검색바 (시각적 목업)
- articles.html에 기사 카드 최소 12개 (4유형 × 3개)
- 기사 카드 UI: 이미지 플레이스홀더 + 카테고리 배지 + 제목 + 요약 + 날짜 + 조회수 + 읽기시간
- article.html 사이드바에 "관련 기사" 3개 카드 (현재 "#" 링크 → article.html 링크로 변경)
- 모든 페이지 bottom-nav "검색" 탭이 articles.html로 연결
- 기존 shared.css 디자인 시스템 100% 준수
- 모바일(375px) 반응형 필수

### Must NOT Have (Guardrails)
- ❌ 실제 JS 필터/검색 기능 구현 금지 (시각적 목업만, 필터 버튼은 active 클래스 토글 정도만 허용)
- ❌ 실제 병원명 사용 금지 (더미만)
- ❌ 외부 이미지 사용 금지 (div 플레이스홀더만)
- ❌ site-mirror/ 블로그 원문 복사 금지 (더미 텍스트만)
- ❌ article.html 본문 콘텐츠 변경 금지 (사이드바/관련기사만 수정)
- ❌ floating-cta / bottom-nav 위치관계 변경 금지 (기존 규칙 유지)
- ❌ 기존 페이지의 핵심 섹션 삭제/변경 금지 (기사 섹션을 **추가**만 함)

---

## Verification Strategy

### QA Policy
모든 변경 페이지는 Playwright 브라우저에서 데스크톱(1440×900) + 모바일(375×812)로 시각 검증.
Evidence: `.sisyphus/evidence/content-hub-*.png`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — 데이터 확장 + CSS + articles.html + bottom-nav 전체 업데이트):
├── Task 1: shared-data.js ARTICLES 확장 (3→12개) + shared.css 추가 스타일 + bottom-nav "검색"→articles.html 전 페이지 일괄 변경
└── Task 2: articles.html 콘텐츠 허브 신규 생성 [deep]

Wave 2 (기존 페이지 업데이트 — MAX PARALLEL):
├── Task 3: index.html + article.html 콘텐츠 섹션 보강 [deep]
├── Task 4: reviews.html + hospitals.html 관련 기사 섹션 추가 [deep]
└── Task 5: consultation.html FAQ 기사 링크 + 전체 QA (Playwright 검증) [deep + playwright]
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|------------|--------|------|
| 1 | None | 2,3,4,5 | 1 |
| 2 | 1 | 5 | 1 |
| 3 | 1 | 5 | 2 |
| 4 | 1 | 5 | 2 |
| 5 | 1,2,3,4 | None | 2 |

### Agent Dispatch Summary
- **Wave 1**: T1 → `quick`, T2 → `deep` + `frontend-ui-ux`
- **Wave 2**: T3 → `deep`, T4 → `deep`, T5 → `deep` + `playwright`

---

## TODOs

### Shared Directives (ALL Tasks Must Follow)

> **공통 규칙:**
> - 기존 `shared.css` 디자인 시스템(CSS 변수, 컴포넌트 클래스) 100% 재사용
> - 기존 `boilerplate.html` 구조(header/footer/bottom-nav/floating-cta) 유지
> - 이미지는 div 플레이스홀더(배경색 #E5E7EB + 텍스트 "이미지")
> - 더미 병원명: 강남 AA성형외과, 신사 BB클리닉, 압구정 CC의원 등
> - bottom-nav "검색" 탭(🔍)은 `./articles.html`로 연결 (전 페이지 통일)
> - articles.html의 bottom-nav에서는 "검색" 탭이 `.active`
> - floating-cta: bottom:56px(모바일), bottom-nav: bottom:0 위치관계 유지
> - 기사 카드에는 반드시: 카테고리 배지(색상 코딩) + 제목 + 요약 1줄 + 날짜 + 조회수
> - 콘텐츠유형별 배지 색상: 비용비교=#10B981(초록), 안전정보=#EF4444(빨강), 회복관리=#3B82F6(파랑), 병원선택=#8B5CF6(보라)

---

- [x] 1. 데이터 확장 + CSS 추가 + bottom-nav 전 페이지 일괄 업데이트

  **What to do**:
  - **shared-data.js** — ARTICLES 배열을 3개→12개로 확장:
    - 비용비교(3개): 쌍꺼풀 가격, 코성형 비용, 지방흡입 가격
    - 안전정보(3개): 눈성형 부작용, 코성형 부작용, 보톡스 주의사항
    - 회복관리(3개): 쌍꺼풀 회복기간, 리프팅 후 관리, 윤곽수술 회복
    - 병원선택(3개): 성형외과 고르는 법, 후기 검증법, 상담 전 체크리스트
  - 각 ARTICLES 항목의 필드:
    ```
    { id, title, slug, contentType: 'PRICE'|'SAFETY'|'RECOVERY'|'CLINIC_CHOICE',
      category: '비용비교'|'안전정보'|'회복관리'|'병원선택',
      categoryColor: '#10B981'|'#EF4444'|'#3B82F6'|'#8B5CF6',
      procedureTags: ['눈','코',...],
      date: '2026.02.XX', views: number, readTime: 'N분',
      author: '김서연 에디터'|'이다혜 에디터',
      summary: '한줄 요약 텍스트' }
    ```
  - **shared.css** — 필요한 추가 스타일:
    - `.article-grid` — 기사 카드 그리드 (모바일 1열, 태블릿 2열, 데스크톱 3열)
    - `.content-type-tab` — 콘텐츠유형 필터 탭 (기존 `.filter-chip` 변형)
    - `.procedure-tag` — 시술별 태그 칩 (기존 `.chip` 변형)
    - `.article-card-horizontal` — 가로형 기사 카드 (기존 페이지 사이드바용)
    - `.related-articles` — 관련 기사 섹션 래퍼
  - **bottom-nav 전 페이지 일괄 변경**: `boilerplate.html`, `index.html`, `article.html`, `reviews.html`, `hospitals.html`, `consultation.html` — 총 6개 파일에서 bottom-nav "검색" 탭의 `href`를 `#`에서 `./articles.html`로 변경
    - boilerplate.html: `<a href="#">` 중 검색(🔍) 탭 → `<a href="./articles.html">`
    - index.html, article.html, reviews.html, hospitals.html, consultation.html도 동일하게 변경

  **Must NOT do**: 기존 PROCEDURES, HOSPITALS, REVIEWS 데이터 구조 변경, 기존 CSS 변수 수정

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**: Wave 1 | Blocks: 2,3,4,5 | Blocked By: None

  **References**:
  - `redesign/mockup/shared-data.js` — 현재 ARTICLES 3개 구조
  - `redesign/mockup/shared.css` — 기존 `.card`, `.chip`, `.filter-chip` 패턴
  - `redesign/editorial/TRANSFORMATION_PIPELINE.md` — 4가지 콘텐츠유형 정의
  - `redesign/editorial/BATCH_02_REAL_20.md` — 실제 기사 제목/카테고리 패턴
  - `redesign/mockup/boilerplate.html` — bottom-nav 구조 (검색 탭 위치 확인)
  - `redesign/mockup/index.html` — bottom-nav 현재 링크 구조

  **Acceptance Criteria**:
  - [ ] shared-data.js에 ARTICLES 12개 존재 (비용비교3 + 안전정보3 + 회복관리3 + 병원선택3)
  - [ ] 각 ARTICLE에 id, title, slug, contentType, category, categoryColor, procedureTags, date, views, readTime, author, summary 필드 존재
  - [ ] shared.css에 .article-grid, .article-card-horizontal, .related-articles 클래스 추가
  - [ ] 6개 HTML 파일 모두 bottom-nav "검색" 탭이 ./articles.html로 연결
  - [ ] `node -e "const d=require('./redesign/mockup/shared-data.js'); console.log(d.ARTICLES.length)"` → 12

  **QA Scenarios:**
  ```
  Scenario: shared-data.js ARTICLES 확장 검증
    Tool: Bash
    Steps: node -e "const d=require('./redesign/mockup/shared-data.js'); console.log(d.ARTICLES.length, d.ARTICLES.map(a=>a.contentType))"
    Expected: 12 ['PRICE','PRICE','PRICE','SAFETY','SAFETY','SAFETY','RECOVERY','RECOVERY','RECOVERY','CLINIC_CHOICE','CLINIC_CHOICE','CLINIC_CHOICE']
    Evidence: .sisyphus/evidence/task-data-articles.txt

  Scenario: bottom-nav 검색 탭 링크 검증
    Tool: Bash
    Steps: grep -c "articles.html" redesign/mockup/*.html
    Expected: 6개 이상 (6개 파일에서 각 1회 이상)
    Evidence: .sisyphus/evidence/task-nav-links.txt
  ```

  **Commit**: NO

---

- [x] 2. articles.html 콘텐츠 허브 신규 생성

  **What to do**:
  - `redesign/mockup/articles.html` 생성 — **boilerplate.html을 복사하여 시작**
  - **페이지 타이틀**: "정보 콘텐츠" / title: "정보 콘텐츠 — 성형 시술 가이드 | 미녀는 괴로워"
  - **검색바**: 상단에 큰 검색바 ("쌍꺼풀 가격, 코성형 부작용, 회복기간..." 플레이스홀더)
  - **콘텐츠유형 필터 탭** (1차 필터, 가로 스크롤):
    - 전체(활성) | 비용비교 | 안전정보 | 회복관리 | 병원선택
    - 각 탭에 해당 카테고리 색상 dot 또는 배지
  - **시술별 태그 칩** (2차 필터, 가로 스크롤):
    - 전체 | 눈 | 코 | 윤곽 | 보톡스 | 리프팅 | 지방흡입 | 피부
  - **정렬**: 최신순 | 인기순 | 조회수순 (우측 정렬, 셀렉트 또는 칩)
  - **기사 카드 그리드** (12개):
    - 모바일: 1열 세로 카드
    - 태블릿: 2열
    - 데스크톱: 3열
    - 각 카드: 이미지 플레이스홀더(140px) + 카테고리 배지(색상 코딩) + 제목(bold) + 요약(1줄, text-muted) + 하단 메타(작성자 · 날짜 · 조회수 · 읽기시간)
    - 모든 카드 클릭 시 `./article.html` 링크
  - **"더 많은 기사 보기" 버튼**: 하단에 아웃라인 버튼 (페이지네이션 시각적 목업)
  - **인기 키워드**: 하단에 "인기 검색 키워드" 섹션 — 태그 클라우드 (쌍꺼풀 가격, 코성형 부작용, 보톡스 효과, 리프팅 비용 등)
  - **bottom-nav**: 🔍검색 탭이 `.active` 상태
  - **floating-cta**: "무료 상담 받아보기" (기존과 동일)

  **디자인 벤치마크**: 강남언니 "매거진" 섹션 + 바비톡 "정보" 탭 참고
  - 카드 기반, 카테고리 배지 컬러 코딩, 깔끔한 그리드

  **Must NOT do**: 실제 필터/검색 JS 구현, 외부 이미지, 기존 페이지 수정

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: [`frontend-ui-ux`]

  **Parallelization**: Wave 1 (with Task 1) | Blocks: 5 | Blocked By: 1

  **References**:
  - `redesign/mockup/boilerplate.html` — HTML 골격 복사 시작점
  - `redesign/mockup/shared.css` — 기존 디자인 시스템 (CSS 변수, .card, .chip, .filter-chip 등)
  - `redesign/mockup/shared-data.js` — ARTICLES 데이터 참조 (Task 1에서 12개로 확장됨)
  - `redesign/mockup/index.html` — "에디터 추천" 섹션의 기사 카드 패턴 참고 (lines 310-341)
  - `redesign/mockup/reviews.html` — 필터바 UI 패턴 참고 (카테고리 칩 + 정렬)

  **Acceptance Criteria**:
  - [ ] articles.html 파일 생성됨
  - [ ] 검색바 존재
  - [ ] 콘텐츠유형 필터 탭 5개 (전체/비용비교/안전정보/회복관리/병원선택)
  - [ ] 시술별 태그 칩 8개 (전체 포함)
  - [ ] 기사 카드 12개 존재 (4유형 × 3개)
  - [ ] 각 카드에 카테고리 배지 + 제목 + 요약 + 날짜 + 조회수 존재
  - [ ] bottom-nav "검색" 탭 active 상태
  - [ ] floating-cta + bottom-nav 존재
  - [ ] 모바일 반응형 (1열 카드)

  **QA Scenarios:**
  ```
  Scenario: articles.html 데스크톱
    Tool: Playwright
    Preconditions: npx serve redesign/mockup --listen 3030
    Steps:
      1. http://localhost:3030/articles.html 열기, 1440×900
      2. 검색바 존재 확인 (input[type="search"] 또는 input[placeholder*="쌍꺼풀"])
      3. 콘텐츠유형 탭 5개 확인
      4. 기사 카드 12개 확인
      5. 3열 그리드 배치 확인
      6. 전체 스크린샷
    Expected: 깔끔한 3열 그리드, 모든 카드에 배지+제목+메타 표시
    Evidence: .sisyphus/evidence/content-hub-articles-desktop.png

  Scenario: articles.html 모바일
    Tool: Playwright
    Steps:
      1. 375×812 뷰포트
      2. 1열 카드 배치 확인
      3. 필터 탭 가로스크롤 확인
      4. bottom-nav 검색 탭 active 확인
      5. floating-cta가 bottom-nav 위에 위치 확인
    Expected: 모바일 1열 레이아웃, 네비 정상
    Evidence: .sisyphus/evidence/content-hub-articles-mobile.png
  ```

  **Commit**: NO

---

- [x] 3. index.html + article.html 콘텐츠 섹션 보강

  **What to do**:
  **index.html 변경사항**:
  - "에디터 추천" 섹션의 "더보기 ›" 링크를 `./articles.html`로 변경
  - "에디터 추천" 아래에 "최신 정보 기사" 섹션 추가:
    - 섹션 헤더: "최신 정보 기사" + "더보기 ›" (→ articles.html)
    - 가로형 기사 카드 3개 (`.article-card-horizontal`): 좌측 이미지 플레이스홀더(80×80) + 우측에 카테고리 배지 + 제목 + 날짜
    - 비용비교/안전정보/회복관리 각 1개
  - bottom-nav "검색" 탭 href → `./articles.html` (Task 1에서 이미 변경됨, 확인만)

  **article.html 변경사항**:
  - 사이드바 "관련 아티클" 섹션의 3개 링크:
    - 현재 `href="#"` → `href="./article.html"`로 변경
    - 각 기사에 카테고리 배지 추가 (안전정보, 회복관리, 비용비교)
  - 본문 하단 CTA 아래에 "이런 기사도 읽어보세요" 섹션 추가:
    - 가로형 기사 카드 3개 (`.article-card-horizontal`)
    - "더 많은 기사 보기" → articles.html 링크

  **Must NOT do**: article.html 본문 콘텐츠 변경, index.html 기존 섹션 삭제/변경

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**: Wave 2 (with Task 4) | Blocks: 5 | Blocked By: 1

  **References**:
  - `redesign/mockup/index.html` — "에디터 추천" 섹션 위치 (lines 310-341)
  - `redesign/mockup/article.html` — 사이드바 "관련 아티클" (lines 391-407), CTA 영역 (lines 410-419)
  - `redesign/mockup/shared.css` — `.article-card-horizontal` (Task 1에서 추가됨)

  **Acceptance Criteria**:
  - [ ] index.html "에디터 추천" 더보기 → articles.html 링크
  - [ ] index.html에 "최신 정보 기사" 섹션 + 가로형 카드 3개 추가
  - [ ] article.html 사이드바 관련 기사 3개 링크가 article.html로 연결
  - [ ] article.html 하단에 "이런 기사도 읽어보세요" 섹션 + 카드 3개 추가
  - [ ] 기존 콘텐츠 변경 없음

  **QA Scenarios:**
  ```
  Scenario: index.html 새 기사 섹션
    Tool: Playwright
    Steps:
      1. http://localhost:3030/index.html 열기, 1440×900
      2. "최신 정보 기사" 섹션 존재 확인
      3. 가로형 기사 카드 3개 확인
      4. 전체 스크린샷
    Evidence: .sisyphus/evidence/content-hub-index-desktop.png

  Scenario: article.html 관련 기사
    Tool: Playwright
    Steps:
      1. http://localhost:3030/article.html 열기, 375×812
      2. 하단 "이런 기사도 읽어보세요" 섹션 확인
      3. 카드 3개 확인
    Evidence: .sisyphus/evidence/content-hub-article-mobile.png
  ```

  **Commit**: NO

---

- [x] 4. reviews.html + hospitals.html 관련 기사 섹션 추가

  **What to do**:
  **reviews.html 변경사항**:
  - 후기 카드 목록과 "후기 작성" CTA 사이에 "후기 작성 전 꼭 읽어보세요" 섹션 추가:
    - 가로형 기사 카드 2개:
      1. 안전정보 배지 + "부작용 신호, 미리 알면 대처할 수 있어요" (안전 관련)
      2. 병원선택 배지 + "후기 볼 때 이것만 확인하세요 — 검증 체크리스트" (후기 검증 관련)
    - "더 많은 정보 기사 ›" → articles.html 링크

  **hospitals.html 변경사항**:
  - 병원 카드 목록과 "가격 비교" 섹션 사이에 "시술 가이드" 섹션 추가:
    - 가로형 기사 카드 2개:
      1. 비용비교 배지 + "시술별 가격, 숨겨진 비용까지 체크하세요" (가격 관련)
      2. 회복관리 배지 + "수술 후 회복기간, 현실적 일정표" (회복 관련)
    - "더 많은 시술 가이드 ›" → articles.html 링크

  **Must NOT do**: 기존 후기카드/병원카드 변경, 필터바 변경

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: []

  **Parallelization**: Wave 2 (with Task 3) | Blocks: 5 | Blocked By: 1

  **References**:
  - `redesign/mockup/reviews.html` — 후기 카드 목록 구조, "후기 작성" CTA 위치
  - `redesign/mockup/hospitals.html` — 병원 카드 목록, "가격 비교" 섹션 위치
  - `redesign/mockup/shared.css` — `.article-card-horizontal`, `.related-articles`

  **Acceptance Criteria**:
  - [ ] reviews.html에 "후기 작성 전 꼭 읽어보세요" 섹션 + 기사 카드 2개 추가
  - [ ] hospitals.html에 "시술 가이드" 섹션 + 기사 카드 2개 추가
  - [ ] 기존 콘텐츠 변경 없음
  - [ ] 모바일 레이아웃 정상

  **QA Scenarios:**
  ```
  Scenario: reviews.html 관련 기사
    Tool: Playwright
    Steps:
      1. http://localhost:3030/reviews.html 열기, 375×812
      2. "후기 작성 전 꼭 읽어보세요" 섹션 존재 확인
      3. 기사 카드 2개 확인
    Evidence: .sisyphus/evidence/content-hub-reviews-mobile.png

  Scenario: hospitals.html 시술 가이드
    Tool: Playwright
    Steps:
      1. http://localhost:3030/hospitals.html 열기, 375×812
      2. "시술 가이드" 섹션 존재 확인
      3. 기사 카드 2개 확인
    Evidence: .sisyphus/evidence/content-hub-hospitals-mobile.png
  ```

  **Commit**: NO

---

- [x] 5. consultation.html FAQ 기사 링크 + 전체 QA (Playwright 검증)

  **What to do**:
  **consultation.html 변경사항**:
  - FAQ 섹션과 후기 증언 사이에 "상담 전 읽어보면 좋은 글" 섹션 추가:
    - 가로형 기사 카드 2개:
      1. 병원선택 배지 + "상담 전 체크리스트 — 이것만 준비하세요"
      2. 비용비교 배지 + "시술 비용, 상담 시 꼭 물어볼 5가지"
    - "더 많은 정보 ›" → articles.html 링크

  **전체 QA (6개 페이지)**:
  - `npx serve redesign/mockup --listen 3030` 실행 확인
  - 6개 페이지 (index, article, reviews, hospitals, consultation, **articles**) × 2 뷰포트 = **12장 스크린샷**
  - 검증 항목:
    1. articles.html 정상 렌더링 (검색바, 필터, 12개 카드, 3열 그리드)
    2. 모든 페이지 bottom-nav "검색" 탭 → articles.html 링크
    3. articles.html에서 "검색" 탭 active 상태
    4. 기존 5개 페이지의 관련 기사 섹션 표시
    5. floating-cta / bottom-nav 겹침 없음 (모바일)
    6. 기존 콘텐츠 깨짐 없음

  **Must NOT do**: 기존 페이지 구조 변경

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: [`playwright`]

  **Parallelization**: Wave 2 (after 3,4) | Blocks: None | Blocked By: 1,2,3,4

  **References**:
  - `redesign/mockup/consultation.html` — FAQ 섹션, 후기 증언 위치
  - `redesign/mockup/*.html` — 전체 6개 페이지

  **Acceptance Criteria**:
  - [ ] consultation.html에 "상담 전 읽어보면 좋은 글" 섹션 + 기사 카드 2개 추가
  - [ ] 12장 스크린샷 (.sisyphus/evidence/content-hub-*.png)
  - [ ] articles.html 정상 렌더링 (데스크톱 3열 + 모바일 1열)
  - [ ] 모든 페이지 bottom-nav "검색" 탭 → articles.html 연결 확인
  - [ ] articles.html에서 "검색" 탭 active
  - [ ] 기존 5개 페이지 콘텐츠 깨짐 없음
  - [ ] floating-cta / bottom-nav 모바일 위치 정상

  **QA Scenarios:**
  ```
  Scenario: 전체 페이지 데스크톱 스크린샷 (6개)
    Tool: Playwright
    Steps:
      1. http://localhost:3030/index.html → 1440×900 fullPage 스크린샷
      2. http://localhost:3030/articles.html → 1440×900 fullPage 스크린샷
      3. http://localhost:3030/article.html → 1440×900 fullPage 스크린샷
      4. http://localhost:3030/reviews.html → 1440×900 fullPage 스크린샷
      5. http://localhost:3030/hospitals.html → 1440×900 fullPage 스크린샷
      6. http://localhost:3030/consultation.html → 1440×900 fullPage 스크린샷
    Evidence: .sisyphus/evidence/content-hub-{page}-desktop.png (6장)

  Scenario: 전체 페이지 모바일 스크린샷 (6개)
    Tool: Playwright
    Steps:
      1~6. 각 페이지 375×812 fullPage 스크린샷
      articles.html에서 검색 탭 active 확인
      모든 페이지에서 floating-cta가 bottom-nav 위에 위치 확인
    Evidence: .sisyphus/evidence/content-hub-{page}-mobile.png (6장)

  Scenario: bottom-nav 네비게이션 테스트
    Tool: Playwright
    Steps:
      1. http://localhost:3030/index.html 열기
      2. bottom-nav "검색" 탭 클릭 → articles.html URL 확인
      3. articles.html에서 "후기" 탭 클릭 → reviews.html URL 확인
      4. articles.html에서 "홈" 탭 클릭 → index.html URL 확인
    Expected: 모든 네비게이션 링크 정상 작동
    Evidence: .sisyphus/evidence/content-hub-nav-test.txt
  ```

  **Commit**: YES
  - Message: `feat(mockup): 콘텐츠 허브(articles.html) 추가 + 기존 페이지 기사 분산 접목`
  - Files: `redesign/mockup/*`

---

## Commit Strategy

| After Task | Message | Files |
|------------|---------|-------|
| 5 (최종) | `feat(mockup): 콘텐츠 허브(articles.html) + 기존 페이지 기사 분산 접목` | `redesign/mockup/*` |

---

## Success Criteria

### Verification Commands
```bash
ls redesign/mockup/
# Expected: shared.css boilerplate.html shared-data.js index.html article.html reviews.html hospitals.html consultation.html articles.html (9개 파일)

node -e "const d=require('./redesign/mockup/shared-data.js'); console.log('ARTICLES:', d.ARTICLES.length)"
# Expected: ARTICLES: 12

grep -c "articles.html" redesign/mockup/*.html
# Expected: 모든 HTML 파일에서 1회 이상 (bottom-nav 링크)
```

### Final Checklist
- [ ] 9개 파일 존재 (기존 8개 + articles.html 1개)
- [ ] articles.html에 콘텐츠유형 필터 5개 + 시술 태그 8개 + 검색바 + 기사 카드 12개
- [ ] shared-data.js ARTICLES 12개 (4유형 × 3개)
- [ ] index.html에 "최신 정보 기사" 섹션 추가
- [ ] article.html에 "이런 기사도 읽어보세요" 섹션 추가
- [ ] reviews.html에 "후기 작성 전 꼭 읽어보세요" 섹션 추가
- [ ] hospitals.html에 "시술 가이드" 섹션 추가
- [ ] consultation.html에 "상담 전 읽어보면 좋은 글" 섹션 추가
- [ ] 모든 페이지 bottom-nav "검색" → articles.html 연결
- [ ] articles.html에서 "검색" 탭 active
- [ ] 12장 스크린샷 저장 (6페이지 × 2뷰포트)
- [ ] 모바일 레이아웃 정상 (모든 페이지)
- [ ] floating-cta / bottom-nav 겹침 없음
