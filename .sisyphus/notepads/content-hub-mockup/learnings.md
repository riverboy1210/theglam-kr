# Content Hub Mockup — Learnings

## [2026-02-25] Task 1: Data + CSS + nav links
- ARTICLES expanded to 12 with new fields: contentType, slug, procedureTags
- 4 new CSS classes added to shared.css: .article-grid, .article-card-img, .article-card-horizontal, .related-articles, .content-type-tabs, .content-type-tab
- bottom-nav "검색" tab updated to ./articles.html in 7 files (boilerplate + 6 pages)
- Verification: ARTICLES.length = 12, contentTypes = ['PRICE', 'SAFETY', 'RECOVERY', 'CLINIC_CHOICE']

## [2026-02-25] Task 2: articles.html 생성
- page-hero section with gradient background for category page identity
- .article-grid with 1/2/3 col responsive — hardcoded 12 cards covering all 4 contentTypes
- Filter tabs (content-type-tabs) + procedure chips (filter-bar filter-chip) two-row system
- all card onclick="location.href='./article.html'" for mockup routing

## [2026-02-25] Task 3: index.html + article.html 기사 섹션 추가
- index.html: "에디터 추천" 더보기 → articles.html, "최신 정보 기사" section with .related-articles + .article-card-horizontal
- article.html: sidebar related article links fixed (# → ./article.html), category badges added, "이런 기사도 읽어보세요" .related-articles section inserted before comments

## [2026-02-25] Task 4: reviews.html + hospitals.html 기사 섹션
- reviews.html: "후기 작성 전 꼭 읽어보세요" .related-articles section with 2 .article-card-horizontal (안전정보 + 병원선택) inserted before CTA
- hospitals.html: "시술 가이드" .related-articles section with 2 .article-card-horizontal (비용비교 + 회복관리) inserted before price comparison table

## [2026-02-25] Task 5: consultation.html + Full QA
- consultation.html: "상담 전 읽어보면 좋은 글" .related-articles section inserted before testimonials
- Playwright QA: 12 screenshots (6 pages × 2 viewports) saved to .sisyphus/evidence/content-hub-*.png
- All 6 pages verified with new article sections visible
