- 2026-02-25: 하단 탭 활성 상태는 요구사항 허용안에 따라 `검색` 탭만 `active` 처리했다.
- 2026-02-25: 비교 표, 체크리스트, 에디터 팁, Before/After, CTA, 댓글 섹션을 모두 정적 더미 콘텐츠로 구성해 복잡한 JS 없이 QA 가능한 목업 형태로 고정했다.

- 2026-02-25: Implemented homepage as a single static HTML file with inline page-specific CSS in head to satisfy mockup isolation and avoid shared.css churn.
- 2026-02-25: Used unified content-grid responsive pattern (1 col mobile / 3 col desktop) across review, editor, price, and hospital sections for predictable scanning and maintenance.

- 2026-02-25: `hospitals.html`는 `boilerplate.html` 셸을 유지하고 페이지 전용 CSS만 `<style>`에 추가해 독립 목업으로 완성했다.
- 2026-02-25: 바텀 네비는 요구사항대로 `🏥병원` 탭만 `active` 처리하고, 필터는 정적 칩 UI로 구성해 복잡한 JavaScript를 배제했다.

- 2026-02-25: `consultation.html` 하단 네비는 요구사항에 맞춰 `👤마이` 탭만 `active`로 설정했다.
- 2026-02-25: 상담 제출은 `action="#"` + `onsubmit="return false;"`로 고정하고 FAQ는 `<details>/<summary>`로 구현해 JS 의존 없이 정적 인터랙션을 유지했다.
