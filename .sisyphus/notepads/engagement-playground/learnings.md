# Learnings — engagement-playground

## [2026-02-25] Session ses_36d5675dbffey6PNkFnLYcUC2E — Plan Start

### Design System (from explore agent)
- CSS variables: --primary: #FF6B9D | --secondary: #8B5CF6 | --radius: 12px | --radius-sm: 8px
- All buttons MUST have `type="button"` (Biome a11y rule)
- Relative imports: `./shared.css` and `./shared-data.js`
- Card pattern: `.card.card-hover` with hover: translateY(-2px)
- Filter chip active: primary color bg + white text
- Avatar size: 42x42px circular
- Header z-index: 200 | floating-cta z-index: 100, height: 72px | bottom-nav z-index: 101, height: 56px
- Body padding-bottom: 128px (mobile), 72px (tablet+)

### 바비톡 2025 UI Patterns (from librarian agent)
- 2-column card grid (mobile), 3-column (tablet+)
- Card image: aspect-ratio: 1/1 (square, Instagram style)
- Anonymous nickname pattern: "익명의 토끼 🐰", "익명의 고양이 🐱", "익명의 판다 🐼"
- Procedure tag colors: primary (#FFF0F5 bg / #E91E8C text), secondary (#F0F4FF / #4A6CF7), clinic (#F5F5F5 / #666)
- Action bar: likes ♥, comments 💬, save 🔖, share ↗
- Filter tabs: overflow-x: auto + scrollbar-width: none (hide scrollbar)
- 정렬 바: 최신순/인기순/조회순

### Korean Medical Law Compliance
- 의료법 제56조·제57조: 면책 고지 MUST be on every page/card
- Before/After 이미지에 "※ 시술 결과는 개인에 따라 다를 수 있습니다" 필수
- 개인정보보호법 제30조: 9개 조항 필수 기재
- No "100% 성공", "부작용 없음", "최고", "1위" 문구
- 사업자 정보 footer 기재 필수

### SNS Share Button Colors
- 카카오톡: background #FEE500, color #3A1D1D
- 네이버: background #03C75A, color #fff
- 인스타그램: gradient(#f09433 → #bc1888), color #fff
- 링크복사: background #f5f5f5, color #333

### File Structure (mockup-v1 reference)
- boilerplate: header(z:200) + main + footer + floating-cta(z:100, 72px) + bottom-nav(z:101, 56px)
- bottom-nav tabs: 🏠홈, 🔍검색, ⭐후기, 🏥병원, 👤마이 (기존 5개)
- v2 bottom-nav: 🏠홈, 💬커뮤니티(신규), 🔍검색, ⭐후기, 👤마이
- All links between v2 pages use `./` relative path
- Links to v1 pages use `../mockup/` relative path

### Dummy Data
- Hospital names: 강남 AA성형외과, 신사 BB클리닉, 압구정 CC의원
- Author names (anonymous): 익명의 토끼 🐰, 익명의 고양이 🐱, 익명의 판다 🐼, 익명의 여우 🦊, 익명의 곰 🐻, 익명의 오리 🦆, 익명의 강아지 🐶, 익명의 토끼2 🐰
- Expert advisors: 김OO 원장(성형외과), 이OO 원장(피부과), 박OO 교수(의료정보학)

## [2026-02-25] Task 1: 공유 자원 세팅 COMPLETE
- **shared.css**: 1048 lines, 83+ existing CSS variables maintained + 30+ community component classes added
  - Community section starts at line 740 with marker `/* ===== COMMUNITY COMPONENTS ===== */`
  - Key classes: .feed-grid, .post-card, .card-header, .procedure-tags, .comments-section, .trust-section, .legal-page, etc.
  - Includes skeleton loading, medical disclaimer, author section, post action bar
- **boilerplate.html**: 85 lines, updated with:
  - Bottom nav: 5 tabs (🏠홈, 💬커뮤니티, 🔍검색, ⭐후기, 👤마이)
  - Footer: Legal links connected (./terms.html, ./privacy.html)
  - Medical disclaimer enhanced with medical law reference (의료법 제56조)
  - Floating CTA: "💬 커뮤니티 참여하기" → ./community.html
  - Title updated: "미녀는 괴로워 | THE GLAM — 성형 커뮤니티 · 정보 플랫폼"
- **shared-data.js**: 90 lines, existing data maintained + new structures:
  - COMMUNITY_POSTS: 8 posts with full metadata (author, date, procedure, hospital, cost, recovery, rating, images, engagement)
  - COMMENTS: 5 comments with author, text, date, likes
  - TRUST_EXPERTS: 3 medical experts with emoji, name, specialty, hospital, experience, role
  - All exported for both browser (window.GLAM_DATA) and Node.js (module.exports)

**Verification Results:**
✅ Files created in redesign/mockup-v2/
✅ shared.css: .post-card class present (2 occurrences)
✅ boilerplate.html: terms.html & privacy.html links connected
✅ boilerplate.html: 💬커뮤니티 tab in bottom nav (5 tabs total)
✅ shared-data.js: COMMUNITY_POSTS(8), COMMENTS(5), TRUST_EXPERTS(3) all present
✅ No modifications to original redesign/mockup/ files
✅ All CSS variables preserved, only additions made

## [2026-02-25] Task 4: terms.html + privacy.html COMPLETE
- ✅ terms.html: 8 sections (제1조~제8조), medical disclaimer in section 5 (제5조)
- ✅ privacy.html: 9 sections (제1조~제9조), legal-table x3 (수집항목, 위탁업체, 책임자), 권익침해 구제방법 4기관
- ✅ Both files: .legal-page layout, .toc nav, footer legal links working
- ✅ Both files: boilerplate structure (header, footer, floating-cta, bottom-nav)
- ✅ Both files: title tags updated correctly
- ✅ Both files: back link to community.html working
- ✅ Medical disclaimer (의료법 제56조) included in terms.html section 5
- ✅ KISA, KOPICO, SPO, Police cyber bureau links in privacy.html section 9

## [2026-02-25] Task 2: community.html COMPLETE
- feed-grid + post-card: 8 cards rendered from COMMUNITY_POSTS
- filter-tab: 8 tabs, JS filter working
- Playwright: mobile + desktop screenshots saved
- Issues found (if any): Playwright MCP Chrome launch failed in this environment, validated with Playwright CLI (`npx -p playwright`) instead

## [2026-02-25] Task 3: community-post.html COMPLETE
- Sections: gallery + procedure-card + body + disclaimer + sns-share + comments + trust
- SNS buttons: 4 (kakao/naver/instagram/copy) — alert placeholder
- Comments: 5 from COMMENTS data
- Trust experts: 3 from TRUST_EXPERTS data
- Mobile: trust section injected into main content via JS
- Desktop: sidebar visible via JS (1024px+)

## [2026-02-25] Task 5: Playwright QA — 전 페이지 통합 검증 COMPLETE
- All 4 pages return HTTP 200 via npx serve on port 3031
- Playwright CLI (`npx -p playwright node -e "..."`) works; Playwright MCP browser launch still fails
- Shell interprets `$$` in Playwright scripts — use `p.evaluate(() => document.querySelectorAll(...))` instead of `p.$$(...)`
- 12 screenshots captured (8 mobile + 4 desktop)
- Selector verification results:
  - community.html: .feed-grid(2), .post-card(8), .filter-tab(8), .medical-disclaimer(1) ✅
  - community-post.html: .image-gallery(1), .procedure-info-card(1), .share-btn-sns(4), .comment-item(5), .medical-disclaimer(1) ✅
  - terms.html: .legal-page(1), .toc(1), h2(8) ✅
  - privacy.html: .legal-page(1), .toc(1), .legal-table(3) ✅
- Git commit: b34d07f feat(mockup-v2): 체류증가 P0 — 커뮤니티·법적·신뢰·SNS 목업
- 7 files committed: shared.css, boilerplate.html, shared-data.js, community.html, community-post.html, terms.html, privacy.html
