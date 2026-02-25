# 체류증가: 놀이터 기능 — 커뮤니티·신뢰·법적·SNS 목업

## TL;DR

> **Quick Summary**: 기획서 보완 제안서(P0 4개 항목)를 HTML/CSS 정적 목업으로 구현. 바비톡 스타일 커뮤니티 게시판, 신뢰도/브랜딩 요소, 법적 페이지, SNS 공유 버튼을 `redesign/mockup-v2/` 별도 폴더에 생성.
> 
> **Deliverables**:
> - `redesign/mockup-v2/` 폴더 (독립 목업 세트)
> - 커뮤니티 피드 페이지 (바비톡 스타일 2열 카드 그리드 + 시술 필터)
> - 게시글 상세 페이지 (이미지 갤러리 + 시술정보 카드 + 댓글 + SNS 공유)
> - 이용약관 페이지
> - 개인정보처리방침 페이지
> - 확장된 shared.css (커뮤니티 컴포넌트 추가)
> - 확장된 shared-data.js (COMMUNITY_POSTS 데이터 추가)
> - 업데이트된 boilerplate.html (커뮤니티 탭 추가 + 법적 링크 연결)
> 
> **Estimated Effort**: Medium (4~6개 태스크)
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 1 (공유자원) → Task 2~5 (페이지 병렬) → Task 6 (QA)

---

## Context

### Original Request
사용자가 `체류증가/기획서_보완_제안.md` 파일을 추가하고, "사이트를 놀이터로 만들고 싶다. 성형에 관심 있는 모든 남녀가"라고 요청. 기존 10섹션 기획서에서 빠진 "소통 → 체류 → 재방문" 기능 11개 항목 중 P0 4개를 우선 목업으로 구현.

### Interview Summary
**Key Discussions**:
- **범위**: P0 4개 우선 (#11 커뮤니티, #14 신뢰도, #15 법적, #19 SNS)
- **스타일**: 바비톡 벤치마크 (카드형 피드, 사진 중심, 좋아요/댓글, 시술 태그 필터)
- **파일 위치**: `redesign/mockup-v2/` 별도 폴더 (기존 mockup과 분리)

**Research Findings**:
- 기존 mockup 디자인 시스템: 83+ CSS 변수, 15+ 컴포넌트 클래스, boilerplate 템플릿 완비
- 바비톡 2025 리뉴얼: 포유/추천/카테고리 3탭, 2열 카드 그리드, AI 개인화 피드
- 한국 의료광고법(제56조·제57조): 면책 고지 필수, 비포/애프터에 "개인차 있음" 필수
- 개인정보보호법 제30조: 개인정보처리방침 9개 조항 필수 기재
- SNS 공유: 카카오톡 공유 SDK, 네이버 블로그 API, Web Share API (인스타)

### Metis Review
**Identified Gaps** (addressed):
- 네비게이션 구조 변경 → boilerplate.html에 커뮤니티 탭 추가로 해결
- 더미 데이터 수량 미정 → 커뮤니티 게시글 8개, 댓글 5개로 확정
- 기존 페이지와의 연결 → v2 boilerplate에서 기존 mockup 페이지로 상대경로 링크
- 글쓰기 페이지 스코프 크리프 → 명시적 제외

---

## Work Objectives

### Core Objective
"소통 → 체류 → 재방문" 경험을 목업으로 시각화. 성형에 관심 있는 남녀가 "놀이터"처럼 머물고 싶은 커뮤니티 중심 UI를 정적 HTML/CSS로 구현.

### Concrete Deliverables
- `redesign/mockup-v2/shared.css` — 기존 83개 변수 유지 + 커뮤니티 컴포넌트 (~30개 클래스 추가)
- `redesign/mockup-v2/boilerplate.html` — 커뮤니티 탭 + 법적 페이지 링크 반영
- `redesign/mockup-v2/shared-data.js` — COMMUNITY_POSTS(8개), COMMENTS(5개) 데이터 추가
- `redesign/mockup-v2/community.html` — 바비톡 스타일 커뮤니티 피드
- `redesign/mockup-v2/community-post.html` — 게시글 상세 (SNS 공유 포함)
- `redesign/mockup-v2/terms.html` — 이용약관
- `redesign/mockup-v2/privacy.html` — 개인정보처리방침

### Definition of Done
- [ ] `npx serve redesign/mockup-v2 --listen 3031` 로 로컬 서버 실행 가능
- [ ] 모든 7개 파일이 브라우저에서 렌더링 됨
- [ ] 커뮤니티 피드: 2열 카드 그리드 + 시술 필터 탭 + 좋아요/댓글 카운트 표시
- [ ] 게시글 상세: 이미지 갤러리 + 시술정보 카드 + 댓글 섹션 + SNS 공유 4종
- [ ] 법적 페이지 2종: 이용약관, 개인정보처리방침 (구조적 마크업)
- [ ] 모든 페이지에 의료 면책 고지 포함
- [ ] 모바일/데스크톱 반응형 정상 작동

### Must Have
- 바비톡 스타일 2열 카드 그리드 커뮤니티 피드
- 시술 카테고리 필터 탭 (수평 스크롤, 눈/코/얼굴윤곽/피부/바디/리프팅/필러)
- 카드 액션 바 (좋아요, 댓글, 저장, 공유)
- 익명 사용자 닉네임 (동물 이모지 패턴: "익명의 토끼 🐰")
- 게시글 상세 시술 정보 카드 (시술명/병원/비용/회복기간/만족도)
- SNS 공유 4종 (카카오톡/네이버/인스타/링크복사) — 버튼 UI만, SDK 미연동
- 의료 면책 고지 배너 (모든 페이지 footer + 후기 카드 내)
- 개인정보처리방침 9개 조항 구조
- 이용약관 기본 구조 (서비스 이용, 게시물 정책, 면책, 분쟁해결)
- 에디터 신뢰 프로필 (전문의 자문단 섹션) — 게시글 상세 사이드바
- Before/After 플레이스홀더에 "※ 시술 결과는 개인에 따라 다를 수 있습니다" 문구

### Must NOT Have (Guardrails)
- ❌ 글쓰기/작성 페이지 (스코프 아웃)
- ❌ 사용자 프로필 페이지
- ❌ 알림 배지/알림 센터
- ❌ 실제 카카오톡 SDK 연동 (버튼 UI만)
- ❌ 쿠키 동의 배너 (Phase 1 범위 아님)
- ❌ 기존 mockup/ 폴더 파일 수정 (v2는 독립)
- ❌ 실제 병원명 사용 (더미: 강남 AA성형외과, 신사 BB클리닉 등)
- ❌ 외부 이미지 URL (div 플레이스홀더만)
- ❌ 복잡한 JavaScript (details/summary 아코디언 + 간단한 DOM 조작만 허용)
- ❌ 의료 효과 보장 문구 ("100% 성공", "부작용 없음" 등)
- ❌ 병원 우열 비교 표현
- ❌ AI 검색, 무한 스크롤 실제 구현

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (정적 HTML/CSS 목업)
- **Automated tests**: None (정적 목업이므로 단위 테스트 불필요)
- **Framework**: None

### QA Policy
Every task MUST include Playwright-based QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Playwright — Navigate, interact, assert DOM, screenshot
- **서버 실행**: `npx serve redesign/mockup-v2 --listen 3031` (기존 3030과 충돌 방지)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — 공유 자원 세팅):
├── Task 1: shared.css 확장 + boilerplate.html 업데이트 + shared-data.js 확장 [quick]

Wave 2 (After Wave 1 — 4개 페이지 병렬):
├── Task 2: community.html — 커뮤니티 피드 (depends: 1) [deep]
├── Task 3: community-post.html — 게시글 상세 + SNS 공유 (depends: 1) [deep]
├── Task 4: terms.html + privacy.html — 법적 페이지 2종 (depends: 1) [quick]

Wave 3 (After Wave 2 — QA 검증):
├── Task 5: Playwright QA — 전 페이지 검증 + 스크린샷 (depends: 2,3,4) [unspecified-high]

Wave FINAL (After ALL — 독립 리뷰):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA — Playwright (unspecified-high)
├── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 2 → Task 5 → F1-F4
Parallel Speedup: ~50% faster than sequential
Max Concurrent: 3 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 2, 3, 4 | 1 |
| 2 | 1 | 5 | 2 |
| 3 | 1 | 5 | 2 |
| 4 | 1 | 5 | 2 |
| 5 | 2, 3, 4 | F1-F4 | 3 |

### Agent Dispatch Summary

- **Wave 1**: 1 task — T1 → `quick`
- **Wave 2**: 3 tasks — T2 → `deep`, T3 → `deep`, T4 → `quick`
- **Wave 3**: 1 task — T5 → `unspecified-high` + `playwright` skill
- **FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high` + `playwright`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.

- [x] 1. 공유 자원 세팅 — shared.css 확장 + boilerplate.html + shared-data.js

  **What to do**:
  - `redesign/mockup-v2/` 디렉토리 생성
  - `redesign/mockup/shared.css`를 `redesign/mockup-v2/shared.css`로 복사 후 커뮤니티 컴포넌트 CSS 추가:
    - `.post-card` — 커뮤니티 카드 (16px border-radius, 카드 그림자, hover 효과)
    - `.feed-grid` — 2열 그리드 (모바일 2열, 태블릿 3열)
    - `.card-header` — 유저 아바타 + 닉네임 + 날짜
    - `.procedure-tags` — 시술 태그 (핑크/블루/그레이 배경)
    - `.card-image-wrap` — 정사각형 이미지 영역 (aspect-ratio: 1/1)
    - `.card-actions` — 좋아요/댓글/저장/공유 액션 바
    - `.filter-tabs-primary` — 수평 스크롤 카테고리 탭 (overflow-x: auto, scrollbar 숨김)
    - `.filter-tab` — 필터 탭 버튼 (pill shape, active 시 var(--primary) 배경)
    - `.sort-bar` — 정렬 바 (최신순/인기순/조회순)
    - `.post-detail` — 게시글 상세 레이아웃
    - `.image-gallery` — 이미지 갤러리 (dot indicator)
    - `.procedure-info-card` — 시술 정보 테이블 카드
    - `.comments-section` — 댓글 섹션 (입력 + 목록)
    - `.comment-item` — 댓글 아이템 (아바타 + 본문 + 좋아요/답글)
    - `.share-buttons` — SNS 공유 버튼 그룹
    - `.share-btn.kakao` — 카카오 노란색 (#FEE500)
    - `.share-btn.naver` — 네이버 초록색 (#03C75A)
    - `.share-btn.instagram` — 인스타 그라데이션
    - `.share-btn.copy` — 링크복사 회색
    - `.medical-disclaimer` — 의료 면책 고지 박스 (경고 스타일)
    - `.legal-page` — 법적 페이지 레이아웃 (목차 + 조항)
    - `.legal-table` — 법적 정보 테이블
    - `.toc` — 목차 네비게이션
    - `.trust-section` — 신뢰도 섹션 (전문의 자문단, E-E-A-T)
    - `.trust-card` — 전문가/에디터 프로필 카드
    - `.skeleton-card` — 스켈레톤 로딩 카드 (shimmer 애니메이션)
    - `.line-clamp-2` — 2줄 말줄임
  - `redesign/mockup/boilerplate.html`을 `redesign/mockup-v2/boilerplate.html`로 복사 후 수정:
    - 하단 네비게이션에 커뮤니티 탭 추가: `<a href="./community.html" class="bottom-nav-item"><span class="nav-icon">💬</span><span>커뮤니티</span></a>`
    - 기존 4개 탭 아이콘 재배치: 🏠홈, 🔍검색(→articles), 💬커뮤니티(신규), ⭐후기, 👤마이
    - 기존 mockup 페이지 링크는 `../mockup/` 상대경로 사용 (index.html, reviews.html 등)
    - v2 전용 페이지 링크는 `./` 상대경로 (community.html, terms.html 등)
    - footer 법적 링크 실제 연결: `<a href="./terms.html">이용약관</a>`, `<a href="./privacy.html">개인정보처리방침</a>`
    - footer 의료 면책 고지 강화: "본 플랫폼의 모든 후기 및 정보는 개인 경험담으로, 의료적 조언이나 진단을 대체하지 않습니다."
  - `redesign/mockup/shared-data.js`를 `redesign/mockup-v2/shared-data.js`로 복사 후 확장:
    - 기존 PROCEDURES, HOSPITALS, REVIEWS, ARTICLES, BRAND 유지
    - `COMMUNITY_POSTS` 배열 추가 (8개 더미 게시글):
      ```
      { id, author: '익명의 토끼 🐰', authorEmoji: '🐰', date: '3일 전',
        procedure: '쌍꺼풀 매몰법', category: '눈', hospital: '강남 AA성형외과',
        cost: '65만원', recovery: '2주', rating: 4.5,
        title: '제목', excerpt: '2줄 요약', imageCount: 4,
        likes: 247, comments: 38, views: 1820, saved: false,
        tags: ['쌍꺼풀', '매몰법'], verified: true }
      ```
    - 게시글 카테고리 분포: 눈(3), 코(2), 얼굴윤곽(1), 피부(1), 리프팅(1)
    - `COMMENTS` 배열 추가 (5개 더미 댓글):
      ```
      { id, author: '익명의 고양이 🐱', text: '댓글 내용',
        date: '2시간 전', likes: 12, replies: 0 }
      ```
    - `TRUST_EXPERTS` 배열 추가 (3명 더미 전문의):
      ```
      { name: '김OO 원장', specialty: '성형외과 전문의',
        hospital: '강남 AA성형외과', experience: '15년',
        role: '의료 자문위원' }
      ```

  **Must NOT do**:
  - 기존 `redesign/mockup/` 폴더 파일 수정 금지
  - 외부 폰트/CDN 추가 금지 (기존 Pretendard 유지)
  - 기존 CSS 변수값 변경 금지 (추가만 가능)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 파일 복사 + CSS/JS/HTML 확장 작업. 복잡한 로직 없음
  - **Skills**: []
    - 프론트엔드 스킬 불필요 — 파일 복사와 텍스트 추가 수준
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: CSS 추가가 주 작업이지만, 패턴이 이미 문서화되어 있어 불필요

  **Parallelization**:
  - **Can Run In Parallel**: NO (다른 모든 태스크의 기반)
  - **Parallel Group**: Wave 1 (단독)
  - **Blocks**: Tasks 2, 3, 4
  - **Blocked By**: None

  **References**:

  **Pattern References** (existing code to follow):
  - `redesign/mockup/shared.css` — 전체 파일 복사 기반. 83개 CSS 변수, 15+ 컴포넌트. 새 클래스는 기존 네이밍 컨벤션(`.component-name`) 따를 것
  - `redesign/mockup/boilerplate.html` — 전체 파일 복사 기반. header(z:200) + footer + bottom-nav(z:101, 56px) + floating-cta(z:100, 72px) 구조
  - `redesign/mockup/shared-data.js` — 전체 파일 복사 기반. PROCEDURES(8), HOSPITALS(6), REVIEWS(6), ARTICLES(12), BRAND 스키마
  - `redesign/mockup/reviews.html` — review-card 패턴 참고. card-hover, badge, tag, rating, before-after, review-stats 클래스 재사용

  **External References**:
  - 바비톡 2025 카드 피드 패턴: 2열 그리드, 정사각형 이미지, 시술태그 pill, 좋아요/댓글/저장 액션바
  - 한국 의료광고법 제56조·제57조: 면책 고지 필수 문구

  **WHY Each Reference Matters**:
  - `shared.css`: 새 CSS 클래스가 기존 변수(--primary, --radius 등)를 사용해야 시각적 일관성 유지
  - `boilerplate.html`: 네비게이션 구조를 정확히 복제한 뒤 커뮤니티 탭만 삽입해야 레이아웃 깨지지 않음
  - `shared-data.js`: 기존 데이터 스키마를 따라야 향후 통합 시 충돌 없음
  - `reviews.html`: post-card의 카드 구조가 review-card와 유사 — 동일 패턴 확장

  **Acceptance Criteria**:
  - [ ] `redesign/mockup-v2/` 디렉토리에 3개 파일 존재: shared.css, boilerplate.html, shared-data.js
  - [ ] shared.css에 기존 83+ 변수 + 커뮤니티 컴포넌트 30+ 클래스 포함
  - [ ] boilerplate.html에 커뮤니티 탭 포함 (bottom-nav 5개 탭)
  - [ ] shared-data.js에 COMMUNITY_POSTS(8개), COMMENTS(5개), TRUST_EXPERTS(3명) 포함
  - [ ] footer에 terms.html, privacy.html 링크 연결

  **QA Scenarios:**

  ```
  Scenario: 공유 자원 파일 존재 확인
    Tool: Bash
    Preconditions: redesign/mockup-v2/ 디렉토리 존재
    Steps:
      1. ls redesign/mockup-v2/ → 3개 파일 확인
      2. grep 'COMMUNITY_POSTS' redesign/mockup-v2/shared-data.js → 매칭
      3. grep 'community.html' redesign/mockup-v2/boilerplate.html → 커뮤니티 탭 존재
      4. grep '.post-card' redesign/mockup-v2/shared.css → 커뮤니티 카드 클래스 존재
      5. grep 'terms.html' redesign/mockup-v2/boilerplate.html → 법적 링크 연결
    Expected Result: 모든 grep 매칭 성공
    Failure Indicators: 파일 미존재 또는 grep 매칭 실패
    Evidence: .sisyphus/evidence/task-1-shared-resources.txt

  Scenario: CSS 변수 호환성 확인
    Tool: Bash
    Preconditions: shared.css 파일 존재
    Steps:
      1. grep '--primary: #FF6B9D' redesign/mockup-v2/shared.css → 기존 변수 유지 확인
      2. grep '--radius: 12px' redesign/mockup-v2/shared.css → 기존 변수 유지 확인
      3. grep '.feed-grid' redesign/mockup-v2/shared.css → 신규 클래스 존재 확인
    Expected Result: 기존 변수 유지 + 신규 클래스 추가됨
    Failure Indicators: 기존 변수 변경됨 또는 신규 클래스 누락
    Evidence: .sisyphus/evidence/task-1-css-compat.txt
  ```

  **Commit**: NO (Task 5 QA 후 일괄 커밋)

---

- [x] 2. 커뮤니티 피드 페이지 (community.html) — 바비톡 스타일 2열 카드 그리드

  **What to do**:
  - `redesign/mockup-v2/community.html` 생성 (boilerplate.html 기반)
  - 페이지 구조:
    1. **페이지 헤더**: "커뮤니티" 타이틀 + "성형 고민, 함께 나눠요" 서브테스트
    2. **시술 카테고리 필터 탭**: 수평 스크롤, 8개 탭 [전체] [눈] [코] [얼굴윤곽] [피부] [바디] [리프팅] [필러/보톡스]
    3. **정렬 바**: "후기 N개" 카운트 + 최신순/인기순/조회순 버튼
    4. **2열 카드 그리드** (`.feed-grid`):
       - 각 카드(`.post-card`): 유저아바타+닉네임+날짜 → 시술태그 → 정사각형 이미지 플레이스홀더 → 2줄 요약 → 액션바(♥ 편수/💬 편수/🔖 저장)
       - 익명 닉네임 패턴: "익명의 토끼 🐰", "익명의 고양이 🐱", "익명의 판다 🐼" 등
       - 인증후기 배지: `.badge-verified` 사용
       - Before/After 플레이스홀더: `"※ 시술 결과는 개인에 따라 다를 수 있습니다"` 문구 포함
    5. **스켈레톤 로딩**: 그리드 하단에 `.skeleton-card` 2개 (더 보기 힌트)
    6. **의료 면책 고지**: 피드 상단에 `.medical-disclaimer` 배너
  - 반응형: 모바일 2열, 태블릿(768px+) 3열
  - 카드 내 데이터는 `shared-data.js`의 `COMMUNITY_POSTS` 배열에서 `<script>` 로 동적 렌더링
  - 각 카드 클릭 시 `community-post.html?id=N` 링크

  **Must NOT do**:
  - 무한 스크롤 실제 구현 (Intersection Observer 없음 — 스켈레톤은 시각적 힌트만)
  - 필터 탭 실제 필터링 기능 (탭은 UI만, 클릭 시 active 토글 정도만)
  - 글쓰기 버튼/페이지

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: HTML+CSS+JS 통합 구현. 바비톡 스타일 카드 그리드 + 필터 + 동적 렌더링 복합 작업
  - **Skills**: [`playwright`]
    - `playwright`: QA 시나리오 실행으로 렌더링 검증
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: 디자인 패턴이 이미 문서화되어 불필요

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 3, 4)
  - **Blocks**: Task 5
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `redesign/mockup-v2/shared.css` — `.feed-grid`, `.post-card`, `.card-actions`, `.filter-tabs-primary` 등 사용
  - `redesign/mockup-v2/boilerplate.html` — 페이지 틀 복사
  - `redesign/mockup-v2/shared-data.js` — `COMMUNITY_POSTS` 배열 참조
  - `redesign/mockup/reviews.html` — 카드 그리드 패턴, filter-chip, badge 사용법

  **External References**:
  - 바비톡 2025 카드 피드 구조: 2열 그리드 + 정사각형 이미지 + 시술태그 + 액션바

  **Acceptance Criteria**:
  - [ ] community.html 파일 존재
  - [ ] http://localhost:3031/community.html 브라우저 렌더링
  - [ ] 2열 카드 그리드 표시 (8개 카드)
  - [ ] 시술 필터 탭 8개 표시 (수평 스크롤)
  - [ ] 카드에 좋아요/댓글/저장 카운트 표시
  - [ ] 의료 면책 고지 표시

  **QA Scenarios:**

  ```
  Scenario: 커뮤니티 피드 렌더링 확인 (모바일)
    Tool: Playwright
    Preconditions: npx serve redesign/mockup-v2 --listen 3031 실행 중
    Steps:
      1. page.goto('http://localhost:3031/community.html')
      2. page.waitForSelector('.feed-grid')
      3. 카드 개수 확인: page.locator('.post-card').count() ≥ 4
      4. 필터 탭 확인: page.locator('.filter-tab').count() === 8
      5. 액션 바 확인: page.locator('.card-actions').first().isVisible()
      6. 의료 면책 확인: page.locator('.medical-disclaimer').isVisible()
      7. 스크린샷: page.screenshot({ fullPage: true })
    Expected Result: 카드 그리드 + 필터 + 면책고지 모두 렌더링
    Failure Indicators: 카드 0개, 필터 없음, 면책고지 없음
    Evidence: .sisyphus/evidence/task-2-community-feed-mobile.png

  Scenario: 데스크톱 반응형 확인
    Tool: Playwright
    Preconditions: 서버 실행 중
    Steps:
      1. page.setViewportSize({ width: 1280, height: 900 })
      2. page.goto('http://localhost:3031/community.html')
      3. 그리드 컨테이너 너비 확인: 카드가 3열로 배치되는지 시각적 확인
      4. page.screenshot({ fullPage: true })
    Expected Result: 3열 그리드 렌더링
    Evidence: .sisyphus/evidence/task-2-community-feed-desktop.png
  ```

  **Commit**: NO (Task 5 QA 후 일괄 커밋)

---

- [x] 3. 게시글 상세 페이지 (community-post.html) — 이미지 갤러리 + 시술정보 + 댓글 + SNS 공유

  **What to do**:
  - `redesign/mockup-v2/community-post.html` 생성 (boilerplate.html 기반)
  - 페이지 구조 (상세 레이아웃):
    1. **뒤로가기 헤더**: "← 커뮤니티로 돌아가기" + 공유 버튼
    2. **이미지 갤러리** (`.image-gallery`):
       - Before/After 플레이스홀더 3장 (Before, After 1주, After 1개월)
       - dot indicator 3개 (1번째 active)
       - "※ 시술 결과는 개인에 따라 다를 수 있습니다" 문구
    3. **작성자 정보**: 아바타 + "익명의 토끼 🐰" + 날짜 + 조회수
    4. **시술 정보 카드** (`.procedure-info-card`):
       - 시술명: 쌍꺼풀 매몰법
       - 병원: 강남 AA성형외과
       - 비용: 65만원
       - 회복기간: 약 2주
       - 만족도: ★★★★☆ 4.5
    5. **본문 콘텐츠**: 시술 후기 더미 텍스트 (3~4문단)
    6. **의료 면책 고지** (`.medical-disclaimer`): 본문 하단에 경고 박스
    7. **SNS 공유 버튼** (`.share-buttons`):
       - 카카오톡 (노란색 #FEE500, 이모지 텍스트 '📨')
       - 네이버 (초록색 #03C75A, 텍스트 'N')
       - 인스타그램 (그라데이션, 텍스트 '📷')
       - 링크복사 (회색, 텍스트 '🔗')
       - 버튼 클릭 시 alert('카카오톡 공유 SDK 연동 예정') 등 플레이스홀더
    8. **신뢰도 섹션** (`.trust-section`) — 사이드바 또는 본문 하단:
       - "의료 자문위원" 섹션 (TRUST_EXPERTS 3명 카드)
       - 에디터 프로필 강화: "김서연 에디터 · 성형정보 전문 · 경력 5년"
       - E-E-A-T 요소: "✅ 전문의 감수 완료" 배지
    9. **댓글 섹션** (`.comments-section`):
       - "댓글 N개" 헤더
       - 댓글 입력 폼 (아바타 + input + 등록 버튼)
       - 댓글 목록 5개 (COMMENTS 데이터 사용)
       - 각 댓글: 아바타 + 닉네임 + 본문 + 날짜 + ♥수 + 답글 버튼
    10. **하단 고정 액션바**: ♥ 좋아요(247) + 💬 댓글쓰기 + 🔖 저장 (플로팅 CTA 대체)
  - 데스크톱에서는 article.html과 유사한 2칼럼 레이아웃 (본문 + 사이드바)

  **Must NOT do**:
  - 실제 카카오톡 SDK 연동 (버튼 UI + alert 플레이스홀더만)
  - 이미지 슬라이더/스와이프 실제 구현 (dot indicator는 시각적 목업만)
  - 팔로우 버튼 기능

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 복합 레이아웃 (10개 섹션). 카드+갤러리+댓글+공유+신뢰도 통합
  - **Skills**: [`playwright`]
    - `playwright`: 렌더링 검증 및 스크린샷
  - **Skills Evaluated but Omitted**:
    - `frontend-ui-ux`: 패턴 문서화 되어있어 불필요

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 4)
  - **Blocks**: Task 5
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `redesign/mockup-v2/shared.css` — `.post-detail`, `.image-gallery`, `.procedure-info-card`, `.comments-section`, `.share-buttons` 클래스
  - `redesign/mockup-v2/shared-data.js` — `COMMUNITY_POSTS[0]` 데이터로 상세 페이지 채우기
  - `redesign/mockup/article.html` — 디테일 페이지 레이아웃 패턴 (article-layout, article-main + sidebar)
  - `redesign/mockup/reviews.html` — review-card 패턴 (badge, rating, before-after)

  **External References**:
  - 바비톡 포스트 상세 레이아웃: 갤러리+시술카드+댓글+공유
  - SNS 버튼 색상: 카카오 #FEE500, 네이버 #03C75A, 인스타 gradient

  **Acceptance Criteria**:
  - [ ] community-post.html 파일 존재
  - [ ] http://localhost:3031/community-post.html 렌더링
  - [ ] 이미지 갤러리 (3개 dot indicator) 표시
  - [ ] 시술 정보 카드 (5개 항목) 표시
  - [ ] SNS 공유 버튼 4종 표시 (카카오/네이버/인스타/링크)
  - [ ] 댓글 섹션 (5개 댓글 + 입력폼) 표시
  - [ ] 신뢰도 섹션 (3명 전문의) 표시
  - [ ] 의료 면책 고지 표시

  **QA Scenarios:**

  ```
  Scenario: 게시글 상세 전체 렌더링 (모바일)
    Tool: Playwright
    Preconditions: npx serve redesign/mockup-v2 --listen 3031 실행 중
    Steps:
      1. page.goto('http://localhost:3031/community-post.html')
      2. page.waitForSelector('.post-detail')
      3. 갤러리 확인: page.locator('.image-gallery').isVisible()
      4. 시술정보 확인: page.locator('.procedure-info-card').isVisible()
      5. SNS 버튼 확인: page.locator('.share-btn').count() === 4
      6. 댓글 확인: page.locator('.comment-item').count() ≥ 3
      7. 신뢰도 확인: page.locator('.trust-section').isVisible()
      8. 면책고지 확인: page.locator('.medical-disclaimer').isVisible()
      9. page.screenshot({ fullPage: true })
    Expected Result: 10개 섹션 모두 렌더링
    Failure Indicators: 섹션 누락 또는 레이아웃 깨짐
    Evidence: .sisyphus/evidence/task-3-post-detail-mobile.png

  Scenario: SNS 공유 버튼 스타일 확인
    Tool: Playwright
    Preconditions: 서버 실행 중
    Steps:
      1. page.goto('http://localhost:3031/community-post.html')
      2. 카카오 버튼 색상 확인: page.locator('.share-btn.kakao') 의 background에 '#FEE500' 포함
      3. 네이버 버튼 색상 확인: page.locator('.share-btn.naver') 의 background에 '#03C75A' 포함
      4. page.screenshot({ clip: { x: 0, y: 공유섹션Y, width: 375, height: 200 } })
    Expected Result: 4개 버튼 브랜드 색상 적용
    Evidence: .sisyphus/evidence/task-3-sns-buttons.png
  ```

  **Commit**: NO (Task 5 QA 후 일괄 커밋)

---

- [x] 4. 법적 페이지 2종 (terms.html + privacy.html) — 이용약관 + 개인정보처리방침

  **What to do**:
  - `redesign/mockup-v2/terms.html` 생성 (boilerplate.html 기반):
    - "이용약관" 페이지 헤더
    - 시행일 + 최종 개정일
    - 목차 (`.toc`) — 8개 조항 링크:
      - 제1조 목적
      - 제2조 정의
      - 제3조 서비스 이용
      - 제4조 게시물 정책 (커뮤니티 관련 — 허위 후기 제재, 부작용 후기 삭제 금지)
      - 제5조 면책 사항 (의료 정보 면책)
      - 제6조 금지 행위
      - 제7조 서비스 중단·해지
      - 제8조 분쟁 해결
    - 각 조항 더미 본문 (2~3문장 요약 수준)
    - `<details><summary>` 아코디언 패턴 사용 가능
  - `redesign/mockup-v2/privacy.html` 생성 (boilerplate.html 기반):
    - "개인정보처리방침" 페이지 헤더 (강조 마크 — 개인정보보호법 필수)
    - 시행일 + 최종 개정일
    - 목차 (`.toc`) — 9개 조항:
      - 제1조 개인정보의 처리 목적
      - 제2조 처리하는 개인정보의 항목 (상담 폼: 이름, 연락처, 이메일, 관심 시술)
      - 제3조 개인정보의 보유 및 이용기간
      - 제4조 개인정보의 제3자 제공
      - 제5조 개인정보처리의 위탁
      - 제6조 정보주체의 권리·의무
      - 제7조 개인정보 자동수집 장치 (쿠키)
      - 제8조 개인정보보호책임자 (`.legal-table` 사용)
      - 제9조 권익침해 구제방법 (개인정보침해신고센터, 분쟁조정위원회 등 4개 기관 링크)
    - 브랜드 정보: 상호 THE GLAM · 미녀는 괴로워 / 이메일 hello@theglam.kr / 전화 02-333-3539
  - 두 페이지 공통 스타일: `.legal-page` 레이아웃, 깔끔한 타이포그래피, 적절한 여백

  **Must NOT do**:
  - 실제 법률 자문 수준의 상세 약관 (더미 요약 수준)
  - 쿠키 동의 배너 구현
  - 사업자등록번호 등 실제 사업자 정보 (더미 정보 사용)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 정적 텍스트 페이지 2개. 복잡한 로직 없음, 법적 문서 구조만 따르면 됨
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: QA는 Task 5에서 일괄 실행

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 2, 3)
  - **Blocks**: Task 5
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `redesign/mockup-v2/boilerplate.html` — 페이지 틀, footer 카카오톡 SDK, 사업자 정보 영역
  - `redesign/mockup-v2/shared.css` — `.legal-page`, `.legal-table`, `.toc` 클래스
  - `redesign/mockup/article.html` — 긴 본문 콘텐츠 레이아웃 참고 (article-content)

  **External References**:
  - 한국 개인정보보호법 제30조: 개인정보처리방침 9개 조항 필수 기재
  - 전자상거래법: 사업자 정보 기재 의무
  - 의료법 제56조: 의료광고 면책 고지 문구

  **Acceptance Criteria**:
  - [ ] terms.html, privacy.html 파일 존재
  - [ ] http://localhost:3031/terms.html 렌더링
  - [ ] http://localhost:3031/privacy.html 렌더링
  - [ ] terms.html: 목차 8개 조항 + 각 조항 본문
  - [ ] privacy.html: 목차 9개 조항 + 권익침해 구제방법 섹션
  - [ ] privacy.html: 개인정보보호책임자 테이블

  **QA Scenarios:**

  ```
  Scenario: 이용약관 페이지 구조 확인
    Tool: Playwright
    Preconditions: 서버 실행 중
    Steps:
      1. page.goto('http://localhost:3031/terms.html')
      2. page.waitForSelector('.legal-page')
      3. 목차 확인: page.locator('.toc li').count() === 8
      4. 조항 확인: page.locator('h2').count() ≥ 8
      5. 게시물 정책 조항 확인: page.locator('text=게시물 정책').isVisible()
      6. page.screenshot({ fullPage: true })
    Expected Result: 8개 조항 모두 렌더링, 목차 링크 존재
    Evidence: .sisyphus/evidence/task-4-terms.png

  Scenario: 개인정보처리방침 페이지 구조 확인
    Tool: Playwright
    Preconditions: 서버 실행 중
    Steps:
      1. page.goto('http://localhost:3031/privacy.html')
      2. page.waitForSelector('.legal-page')
      3. 목차 확인: page.locator('.toc li').count() === 9
      4. 책임자 테이블: page.locator('.legal-table').isVisible()
      5. 구제방법 확인: page.locator('text=권익침해 구제방법').isVisible()
      6. page.screenshot({ fullPage: true })
    Expected Result: 9개 조항 + 책임자 테이블 + 구제방법 링크
    Evidence: .sisyphus/evidence/task-4-privacy.png

  Scenario: footer에서 법적 페이지 접근
    Tool: Playwright
    Preconditions: 서버 실행 중
    Steps:
      1. page.goto('http://localhost:3031/community.html')
      2. footer의 '이용약관' 링크 확인: page.locator('footer a[href="./terms.html"]').isVisible()
      3. footer의 '개인정보처리방침' 링크 확인: page.locator('footer a[href="./privacy.html"]').isVisible()
    Expected Result: footer에서 양쪽 페이지로 이동 가능
    Evidence: .sisyphus/evidence/task-4-footer-links.png
  ```

  **Commit**: NO (Task 5 QA 후 일괄 커밋)

---

- [x] 5. Playwright QA — 전 페이지 통합 검증 + 스크린샷 + 커밋

  **What to do**:
  - `npx serve redesign/mockup-v2 --listen 3031 &` 서버 실행
  - Playwright로 전체 4개 페이지 검증:
    1. community.html — 모바일(375px) + 데스크톱(1280px)
    2. community-post.html — 모바일(375px) + 데스크톱(1280px)
    3. terms.html — 모바일(375px)
    4. privacy.html — 모바일(375px)
  - 각 페이지별 검증 항목:
    - DOM 렌더링 성공 (페이지 로드 오류 없음)
    - 핵심 셀렉터 존재 (`.feed-grid`, `.post-card`, `.share-btn`, `.legal-page`, `.toc`)
    - 반응형 레이아웃 정상 (모바일 2열 → 데스크톱 3열)
    - 의료 면책 고지 모든 페이지 존재
    - 커뮤니티 탭이 bottom-nav에 존재
    - footer 법적 링크 동작 (terms.html, privacy.html)
  - 스크린샷 10장+ 캡처
  - 모든 QA PASS 후 git commit:
    - `git add redesign/mockup-v2/`
    - `git commit -m "feat(mockup-v2): 체류증가 P0 — 커뮤니티·법적·신뢰·SNS 목업"`

  **Must NOT do**:
  - QA 실패 시 커밋 금지 (수정 후 재검증)
  - 기존 mockup/ 폴더 파일 수정

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Playwright 검증 + git 커밋 복합 작업
  - **Skills**: [`playwright`]
    - `playwright`: 브라우저 QA 검증 필수
  - **Skills Evaluated but Omitted**:
    - `git-master`: 단순 커밋이라 불필요

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (단독)
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 2, 3, 4

  **References**:

  **Pattern References**:
  - `redesign/mockup-v2/*` — Wave 2에서 생성된 모든 파일 검증 대상
  - `.sisyphus/plans/engagement-playground.md` — 본 플랜의 Must Have / Must NOT Have 기준으로 검증

  **Acceptance Criteria**:
  - [ ] 4개 페이지 모두 브라우저 렌더링 성공
  - [ ] 스크린샷 10장+ 측적
  - [ ] 모든 Must Have 항목 검증 통과
  - [ ] git commit 완료

  **QA Scenarios:**

  ```
  Scenario: 전체 페이지 렌더링 확인
    Tool: Playwright
    Preconditions: npx serve redesign/mockup-v2 --listen 3031 실행 중
    Steps:
      1. 페이지별 page.goto → 4개 URL 모두 200 OK 확인
      2. 각 페이지에서 핵심 셀렉터 존재 확인
      3. 모바일(375px) + 데스크톱(1280px) 뷰포트로 스크린샷
    Expected Result: 4개 페이지 전량 정상 렌더링
    Evidence: .sisyphus/evidence/task-5-all-pages-qa.txt + 개별 스크린샷

  Scenario: 반응형 그리드 검증
    Tool: Playwright
    Preconditions: 서버 실행 중
    Steps:
      1. 모바일(375px)에서 community.html → .feed-grid 자식 grid-template-columns 확인
      2. 데스크톱(1280px)에서 community.html → 3열 레이아웃 확인
    Expected Result: 브레이크포인트 전환 정상
    Evidence: .sisyphus/evidence/task-5-responsive-grid.png

  Scenario: 법적 페이지 링크 동작 검증
    Tool: Playwright
    Preconditions: 서버 실행 중
    Steps:
      1. community.html footer에서 '이용약관' 클릭
      2. URL이 '/terms.html'로 이동 확인
      3. terms.html footer에서 '개인정보처리방침' 클릭
      4. URL이 '/privacy.html'로 이동 확인
    Expected Result: footer 링크 정상 네비게이션
    Evidence: .sisyphus/evidence/task-5-legal-navigation.png
  ```

  **Commit**: YES
  - Message: `feat(mockup-v2): 체류증가 P0 — 커뮤니티·법적·신뢰·SNS 목업`
  - Files: `redesign/mockup-v2/*`
  - Pre-commit: Playwright QA 전량 PASS

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Validate HTML structure (proper semantic tags, no broken links within v2). Review CSS for: unused classes, !important abuse, inconsistent naming. Check all buttons have `type="button"`. Verify no external image URLs. Check AI slop: excessive comments, over-abstraction, generic variable names.
  Output: `HTML [PASS/FAIL] | CSS [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start `npx serve redesign/mockup-v2 --listen 3031`. Visit every page via Playwright. Test mobile viewport (375px) and desktop (1280px). Verify: filter tabs scroll horizontally, cards display in 2-col grid (mobile) / 3-col (desktop), SNS share buttons visible, legal pages have proper ToC, footer disclaimer present on ALL pages. Screenshot each page both viewports. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Mobile [N/N] | Desktop [N/N] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual files. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance: no 글쓰기 page, no user profiles, no actual SDK integration, no real hospital names, no external images, no medical guarantees. Flag unaccounted files.
  Output: `Tasks [N/N compliant] | Must NOT [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **After Task 5 (QA PASS)**: `feat(mockup-v2): 체류증가 P0 — 커뮤니티·법적·신뢰·SNS 목업`
  - Files: `redesign/mockup-v2/*`
  - Pre-commit: Playwright QA all pages pass

---

## Success Criteria

### Verification Commands
```bash
npx serve redesign/mockup-v2 --listen 3031  # 서버 실행
# 4개 페이지 접근 가능:
# http://localhost:3031/community.html
# http://localhost:3031/community-post.html
# http://localhost:3031/terms.html
# http://localhost:3031/privacy.html
```

### Final Checklist
- [ ] 커뮤니티 피드: 바비톡 스타일 2열 카드 그리드 렌더링
- [ ] 시술 필터 탭: 7개 카테고리 수평 스크롤
- [ ] 게시글 상세: 이미지 갤러리 + 시술정보 + 댓글 + SNS 공유
- [ ] SNS 공유: 카카오톡/네이버/인스타/링크복사 버튼 4종
- [ ] 이용약관: 구조적 법적 문서 마크업
- [ ] 개인정보처리방침: 9개 조항 + 목차
- [ ] 의료 면책 고지: 모든 페이지 footer에 포함
- [ ] 신뢰 요소: 전문의 자문단 섹션, 에디터 프로필
- [ ] 모바일(375px) / 데스크톱(1280px) 반응형
- [ ] 모든 "Must NOT Have" 항목 위반 없음
