- 2026-02-25: `article.html` uses `boilerplate.html` shell 그대로 유지하고, 콘텐츠 전용 스타일은 페이지 내부 `<style>`에서만 확장해 공통 `shared.css` 충돌을 최소화했다.
- 2026-02-25: 사이드바는 `.article-layout` 그리드로 데스크톱 2열(본문+280px) 구성, 모바일에서는 단일 컬럼으로 자연스럽게 본문 뒤에 이어지도록 배치했다.

- 2026-02-25: Home mockup follows boilerplate shell and shared utility classes (card, section-header, filter-bar) to keep style consistency while adding page-level layout CSS.
- 2026-02-25: For static mockups in this repo, Biome a11y enforces explicit type on every button, including chip-style filter controls.

- 2026-02-25: `hospitals.html` 제작 시 검색/필터/카드/비교표/이벤트를 한 페이지에 묶을 때 공통 컴포넌트(`.card`, `.badge`, `.tag`, `.filter-bar`)를 재사용하면 `shared.css`와 충돌 없이 일관된 톤 유지가 쉽다.
- 2026-02-25: 병원/이벤트 카드형 UI는 모바일 1열 기본 + `@media (min-width: 768px)`에서 병원 2열, 이벤트 3열로 분리하면 요구 스펙을 충족하면서도 스캔성이 좋아진다.

- 2026-02-25: `consultation.html`은 `boilerplate.html` 구조를 그대로 유지하면서 페이지 전용 폼/FAQ/후기 스타일만 `<style>`에 추가하면 공통 레이아웃과 브랜드 톤을 안전하게 유지할 수 있다.
- 2026-02-25: 상담 페이지의 플로팅 CTA는 `shared-data.js` 로드 뒤 스크립트로 내용/색상만 override하면 전역 컴포넌트 수정 없이 페이지별 행동유도를 바꿀 수 있다.
