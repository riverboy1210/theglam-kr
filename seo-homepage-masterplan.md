# SEO 완벽 준수 홈페이지 제작 마스터플랜 — Work Plan

## TL;DR

> **Quick Summary**: 1,130개 SEO 항목을 6개 개발 단계 + 5개 웹사이트 유형별 섹션으로 구조화한 개발 워크플랜/체크리스트 마크다운 문서를 생성한다. Next.js App Router 코드 예시 포함, 한국어 중심 작성.
>
> **Deliverables**:
> - `seo-homepage-masterplan-guide.md` — 단일 마크다운 파일 (예상 8,000~15,000줄)
>
> **Estimated Effort**: Large (9개 순차 작성 태스크 + 검증)
> **Parallel Execution**: NO — 순차 작성 (각 태스크가 이전 태스크의 파일에 append)
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4A → Task 4B → Task 4C → Task 5 → Task 6 → Task 7 → Task 8 → Task 9 → Task 10(검증)

---

## Context

### Original Request
"홈페이지 제작을 설계할 때 seo-1000-methods 파일대로 검색상위노출을 지키면서 만들기 위해 어떤식으로 완벽한 기획 마크다운 형식으로 만들어주세요"

→ seo-1000-methods.md의 1,130개 SEO 방법론을 개발 단계별로 매핑한 종합 개발 워크플랜/체크리스트 마크다운 문서 생성

### Interview Summary
**Key Discussions**:
- 문서 용도: 개발 워크플랜/체크리스트 (AI 프롬프트 템플릿 아님)
- 웹사이트 유형: 전체 5종 (기업소개, 쇼핑몰, 랜딩페이지, SaaS, 포트폴리오)
- SEO 항목 범위: 전체 1,130개 포함
- 기술 스택: Next.js App Router
- 문서 구조: 하이브리드 (개발 단계별 + SEO 카테고리별)
- 언어: 한국어 중심, 기술용어 영어
- 코드 예시: Next.js App Router 코드 스니펫 포함
- 유형별 섹션: 별도 섹션으로 분리

**Research Findings**:
- Core Web Vitals 2026: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
- Google 랭킹 요소: Content quality 23%, Meta title 14%, E-E-A-T 12%, CWV 11%
- AEO (Answer Engine Optimization)가 2026년 핵심 전략
- Next.js 패턴: generateMetadata, sitemap.ts, robots.ts, JSON-LD
- 렌더링 전략: SSG > ISR > SSR > CSR (SEO 관점)

### Metis Review
**Identified Gaps** (addressed):
- 파일 크기 (8,000~15,000줄): 단일 파일 + 목차로 유지, 9개 순차 태스크로 분할 생성
- 항목별 깊이: 체크박스 + 원본 텍스트 + 간단 맥락. 코드는 기술적 항목 ~80-120개만
- 우선순위 표시: 🔴 필수/🟡 권장/🟢 선택 3단계 도입
- 크로스 카테고리 항목: 원래 위치에 1회 기재, `→ 참조: #번호` 형태로 교차참조
- Phase 3 과부하 (340항목): 3개 서브태스크로 분할 (4A/4B/4C)
- 홈페이지 = 웹사이트 전체 (한국어 관용적 의미)
- 비이커머스 유형 섹션: **[DECISION NEEDED — 아래 참조]**

---

## Work Objectives

### Core Objective
seo-1000-methods.md의 1,130개 SEO 항목 전체를 6개 개발 단계 + 5개 웹사이트 유형별로 구조화한 개발자 실행 가이드/체크리스트 마크다운 문서를 생성한다.

### Concrete Deliverables
- `seo-homepage-masterplan-guide.md` — 루트 디렉토리에 단일 마크다운 파일

### Definition of Done
- [ ] 문서 내 체크박스 항목 수 = 정확히 1,130개
- [ ] 원본 번호 #1~#1130 전체 존재 확인
- [ ] 6개 Phase 헤딩 존재
- [ ] 20개 카테고리 서브헤딩 존재
- [ ] 5개 웹사이트 유형 섹션 존재
- [ ] Next.js 코드 블록 60~150개 범위
- [ ] 한국어 중심 작성 (코드 블록 외 영어 전용 단락 0개)

### Must Have
- ALL 1,130 항목 — 원본 번호 그대로 유지
- `- [ ]` 마크다운 체크박스 포맷
- 6단계 개발 페이즈 구조
- Next.js App Router 코드 예시 (기술적 항목)
- 5개 웹사이트 유형별 섹션
- 목차 (Table of Contents)
- 항목별 우선순위 표시 (🔴/🟡/🟢)
- Phase별 항목 수 검증 카운터

### Must NOT Have (Guardrails)
- ❌ 원본 1,130개 외 추가 항목 ("bonus tip", "추가 권장사항" 등 금지)
- ❌ 항목 번호 변경 (리넘버링 금지 — 원본 #1~#1130 유지)
- ❌ Next.js 외 프레임워크 코드 (React/Vue/WordPress 등)
- ❌ 항목당 3문장 이상 설명 (간결하게 — 최대 2문장 확장)
- ❌ 코드 스니펫 30줄 초과
- ❌ 비기술적 항목에 코드 예시 (전략/콘텐츠/분석 항목은 코드 없음)
- ❌ 동일 항목 중복 기재 (교차참조 `→ 참조: #번호` 사용)
- ❌ 본문 체크리스트 항목 내 외부 URL 삽입 금지 (단, 부록 `### E. 참고 자료`에 한해 Next.js 공식문서, Google Search Central, Schema.org 등 핵심 참고 URL 최대 10개 허용)
- ❌ 툴 튜토리얼 (툴 이름만 언급, 사용법 설명 금지)
- ❌ 케이스 스터디/사례 연구
- ❌ 영어 전용 단락 (코드 블록 외)
- ❌ 사용자 수동 검증 요구

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: N/A (문서 생성 태스크)
- **Automated tests**: None (코드 작성이 아닌 문서 생성)
- **Framework**: None

### Agent-Executed QA Scenarios (MANDATORY)

> 이 프로젝트는 문서 생성이므로, QA는 구조적/수량적 검증으로 수행.
> 모든 검증은 에이전트가 bash 명령으로 직접 실행.

```
Scenario: 체크박스 항목 수 정확히 1,130개 확인
  Tool: Bash (grep)
  Preconditions: seo-homepage-masterplan-guide.md 생성 완료
  Steps:
    1. grep -c "^- \[ \]" seo-homepage-masterplan-guide.md
    2. Assert: 출력값 = 1130
  Expected Result: 정확히 1130
  Failure Indicators: 1130 미만 (누락) 또는 초과 (추가 항목)
  Evidence: 터미널 출력 캡처

Scenario: 원본 번호 #1~#1130 전체 존재 확인
  Tool: Bash (loop + grep)
  Preconditions: 문서 생성 완료
  Steps:
    1. for i in $(seq 1 1130); do grep -q "\*\*#$i\." seo-homepage-masterplan-guide.md || echo "MISSING: $i"; done
    2. Assert: 출력 없음 (누락 항목 0개)
  Expected Result: 모든 번호 존재
  Failure Indicators: "MISSING: N" 출력
  Evidence: 터미널 출력 캡처

Scenario: 6개 Phase 헤딩 존재 확인
  Tool: Bash (grep)
  Steps:
    1. grep -c "^## Phase" seo-homepage-masterplan-guide.md
    2. Assert: 출력값 = 6
  Expected Result: 6개 Phase 헤딩
  Evidence: 터미널 출력

Scenario: 20개 카테고리 서브헤딩 존재 확인
  Tool: Bash (grep)
  Steps:
    1. grep -c "^### 카테고리\|^### Category\|^### Cat " seo-homepage-masterplan-guide.md
    2. Assert: 출력값 = 20
  Expected Result: 20개 카테고리
  Evidence: 터미널 출력

Scenario: 5개 웹사이트 유형 섹션 존재 확인
  Tool: Bash (grep)
  Steps:
    1. grep "^### Type" seo-homepage-masterplan-guide.md | wc -l
    2. Assert: 출력값 = 5
    3. grep "기업소개" seo-homepage-masterplan-guide.md && grep "쇼핑몰\|이커머스" seo-homepage-masterplan-guide.md && grep "랜딩페이지" seo-homepage-masterplan-guide.md && grep "SaaS" seo-homepage-masterplan-guide.md && grep "포트폴리오" seo-homepage-masterplan-guide.md
    4. Assert: 5개 유형 키워드 모두 존재
  Expected Result: 5개 유형별 헤딩
  Evidence: 터미널 출력

Scenario: 코드 블록 수 적정 범위 확인 (60~150개)
  Tool: Bash (grep)
  Steps:
    1. grep -c '```tsx\|```typescript' seo-homepage-masterplan-guide.md
    2. Assert: 60 ≤ 출력값 ≤ 150
  Expected Result: 60~150개 코드 블록
  Evidence: 터미널 출력

Scenario: Phase별 항목 수 교차검증
  Tool: Bash (section extraction + grep)
  Steps:
    1. Phase 1 영역 추출 → 체크박스 카운트 → Assert = 150
    2. Phase 2 영역 추출 → 체크박스 카운트 → Assert = 190
    3. Phase 3 영역 추출 → 체크박스 카운트 → Assert = 340
    4. Phase 4 영역 추출 → 체크박스 카운트 → Assert = 140
    5. Phase 5 영역 추출 → 체크박스 카운트 → Assert = 200
    6. Phase 6 영역 추출 → 체크박스 카운트 → Assert = 50
    7. Type-Specific 영역 추출 → 체크박스 카운트 → Assert = 60
    8. 합산 Assert = 1130
  Expected Result: Phase별 카운트 일치 + 총합 1130
  Evidence: 터미널 출력
```

---

## Execution Strategy

### Sequential Writing Pipeline

> 이 프로젝트는 **단일 파일에 순차 append**하는 방식이므로, 병렬 실행이 불가.
> 각 태스크는 이전 태스크가 작성한 파일에 이어서 작성한다.

```
Task 1: 문서 헤더, 목차, 소개, 범례, 읽는 방법
  ↓
Task 2: Phase 1 기획 (150 items: Cat 4 + Cat 5 + Cat 19)
  ↓
Task 3: Phase 2 설계 (190 items: Cat 2 + Cat 8 + Cat 11)
  ↓
Task 4A: Phase 3A 개발-Core (120 items: Cat 1 + Cat 16) [+ 코드 예시 집중]
  ↓
Task 4B: Phase 3B 개발-Data/Media (100 items: Cat 14 + Cat 9) [+ 코드 예시]
  ↓
Task 4C: Phase 3C 개발-Intl/Voice/Advanced (120 items: Cat 12 + Cat 18 + Cat 20)
  ↓
Task 5: Phase 4 콘텐츠 (140 items: Cat 3 + Cat 13)
  ↓
Task 6: Phase 5 런칭 (200 items: Cat 6 + Cat 7 + Cat 17)
  ↓
Task 7: Phase 6 분석 (50 items: Cat 15)
  ↓
Task 8: 웹사이트 유형별 특화 섹션 (60 items: Cat 10 + 유형별 교차참조)
  ↓
Task 9: 부록 (렌더링 전략 매트릭스, 코드 예시 인덱스, 약어 목록, 참고자료)
  ↓
Task 10: 최종 검증 (항목 수 카운트, 구조 확인, 누락 체크)
```

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2, 3, 4A, 4B, 4C, 5, 6, 7, 8, 9 | None |
| 2 | 1 | 3 | None |
| 3 | 2 | 4A | None |
| 4A | 3 | 4B | None |
| 4B | 4A | 4C | None |
| 4C | 4B | 5 | None |
| 5 | 4C | 6 | None |
| 6 | 5 | 7 | None |
| 7 | 6 | 8 | None |
| 8 | 7 | 9 | None |
| 9 | 8 | 10 | None |
| 10 | 9 | None | None |

### Agent Dispatch Summary

| Task | Recommended Agent | Rationale |
|------|-------------------|-----------|
| 1~9 | task(category="writing", load_skills=[], ...) | 문서 생성 태스크 — writing 카테고리 최적 |
| 10 | task(category="quick", load_skills=[], ...) | 구조적 검증 — 빠른 bash 명령 실행 |

---

## TODOs

### Shared Directives (ALL Tasks Must Follow)

> **항목 포맷 템플릿** (Task 1에서 정의, 모든 태스크가 동일하게 적용):
> ```markdown
> - [ ] **#번호. 항목명** — 설명 `[🔴필수|🟡권장|🟢선택]`
>   - 💡 맥락 설명 (최대 2문장, 필요한 경우에만)
>   - 🌐 적용 유형: 기업 | 쇼핑몰 | 랜딩 | SaaS | 포트폴리오 (해당 유형만 표기)
>   - → 참조: #관련번호 (교차참조, 필요한 경우에만)
> ```
>
> **코드 예시 포맷** (기술적 항목에만):
> ```markdown
> - [ ] **#번호. 항목명** — 설명 `[🔴필수]`
>   - 💡 맥락 설명
>   - 🌐 적용 유형: 전체
>   ```tsx
>   // Next.js App Router 코드 예시 (최대 30줄)
>   ```
> ```

---

- [x] 1. 문서 헤더, 목차, 소개, 범례, 읽는 방법 가이드

  **What to do**:
  - 문서 제목 작성: `# SEO 완벽 준수 홈페이지 제작 마스터플랜`
  - 문서 목적/개요 섹션 작성 (이 문서가 무엇이고 어떻게 사용하는지)
  - 목차(TOC) 생성: 6개 Phase + 20개 카테고리 + 5개 유형 + 부록 앵커 링크
  - 범례 섹션 작성:
    - 우선순위 기호: 🔴 필수 / 🟡 권장 / 🟢 선택
    - 유형 약어: 기업 / 쇼핑몰 / 랜딩 / SaaS / 포트폴리오
    - 교차참조 표기법: `→ 참조: #번호`
    - 코드 예시 표기법 설명
  - 전체 통계 요약: 1,130개 항목, 20개 카테고리, 6개 Phase
  - Phase별 항목 수 미리보기 테이블
  - SEO 카테고리 → Phase 매핑 테이블
  - 기술 스택 개요: Next.js App Router, SSR/SSG/ISR
  - Core Web Vitals 2026 목표치: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
  - 항목 포맷 템플릿 정의 (위 Shared Directives 참조)

  **Must NOT do**:
  - 체크리스트 항목 작성 (Task 2부터 시작)
  - 항목 추가 (범례/가이드만)
  - 영어 전용 단락 (코드 블록 제외)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: 문서 구조/소개문 작성 — 기술 코드 아닌 산문 작성
  - **Skills**: []
    - 추가 스킬 불필요 (순수 마크다운 작성)

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential — Task 1 (첫 번째)
  - **Blocks**: Tasks 2~10 (모든 후속 태스크)
  - **Blocked By**: None (즉시 시작 가능)

  **References**:

  **Pattern References**:
  - `seo-1000-methods.md:1-50` — 전체 문서 구조 참조, 20개 카테고리 헤딩 추출
  - `homepage-prompt-formula.md:1-30` — 기존 문서 소개 형식 참조

  **Documentation References**:
  - 이 플랜의 "Shared Directives" 섹션 — 항목 포맷 템플릿 정의

  **WHY Each Reference Matters**:
  - `seo-1000-methods.md` — 20개 카테고리 이름과 항목 범위를 정확하게 목차에 반영해야 함
  - `homepage-prompt-formula.md` — 기존 문서의 소개 스타일을 참고하되 체크리스트 형식으로 변환

  **Acceptance Criteria**:
  - [ ] 파일 `seo-homepage-masterplan-guide.md` 생성됨
  - [ ] 목차에 6개 Phase 앵커 링크 존재
  - [ ] 목차에 20개 카테고리 앵커 링크 존재
  - [ ] 목차에 5개 유형별 섹션 앵커 링크 존재
  - [ ] 범례 섹션에 🔴/🟡/🟢 설명 존재
  - [ ] 항목 포맷 템플릿 정의 존재
  - [ ] Phase별 항목 수 요약 테이블 존재 (합계 1130)
  - [ ] 체크박스 항목 0개 (아직 없어야 함)

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: 목차 구조 확인
    Tool: Bash (grep)
    Steps:
      1. grep -c "^##\|^###" seo-homepage-masterplan-guide.md
      2. Assert: 헤딩 구조 존재
      3. grep "Phase 1\|Phase 2\|Phase 3\|Phase 4\|Phase 5\|Phase 6" seo-homepage-masterplan-guide.md
      4. Assert: 6개 Phase 모두 목차에 존재
    Expected Result: 목차에 완전한 구조
    Evidence: 터미널 출력

  Scenario: 항목 포맷 템플릿 정의 존재 확인
    Tool: Bash (grep)
    Steps:
      1. grep "🔴\|🟡\|🟢" seo-homepage-masterplan-guide.md
      2. Assert: 3개 우선순위 기호 모두 범례에 존재
    Expected Result: 범례 섹션에 우선순위 설명
    Evidence: 터미널 출력
  ```

  **Commit**: NO (그룹 커밋 — Task 9 완료 후)

---

- [x] 2. Phase 1: 기획 (Planning) — 150 항목

  **What to do**:
  - Phase 1 헤딩 작성: `## Phase 1: 기획 (Planning)`
  - Phase 개요: 이 단계에서 수행할 작업 설명 (2-3문장)
  - 3개 카테고리 서브섹션 작성:
    - `### 카테고리 4: 키워드 리서치 & 최적화 (#251-310)` — 60개 항목
    - `### 카테고리 5: 사이트 아키텍처 & 구조 (#311-360)` — 50개 항목
    - `### 카테고리 19: 경쟁 분석 (#1041-1080)` — 40개 항목
  - 각 항목을 포맷 템플릿에 맞게 작성:
    - 원본 번호 유지
    - 원본 텍스트 + 한국어 맥락 (필요시, 최대 2문장)
    - 우선순위 표시 (🔴/🟡/🟢)
    - 적용 웹사이트 유형 태그
    - 교차참조 (필요시)
  - Phase 1 종료 시 항목 수 카운터: `> ✅ Phase 1 체크리스트: 150개 항목`
  - 이 Phase에는 코드 예시 거의 없음 (기획 단계 — 전략적 항목)

  **Must NOT do**:
  - 항목 번호 변경
  - 원본에 없는 항목 추가
  - 코드 스니펫 추가 (기획 단계는 전략적)
  - 항목당 3문장 이상 설명

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: 150개 항목의 체크리스트 형식 변환 — 산문 작성 위주
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential
  - **Blocks**: Task 3
  - **Blocked By**: Task 1

  **References**:

  **Pattern References**:
  - `seo-1000-methods.md:551-676` — 카테고리 4: 키워드 리서치 & 최적화 (#251-310) 원본 텍스트
  - `seo-1000-methods.md:677-782` — 카테고리 5: 사이트 구조 & 아키텍처 (#311-360) 원본 텍스트
  - `seo-1000-methods.md:2221-2306` — 카테고리 19: 경쟁 분석 & 전략 (#1041-1080) 원본 텍스트

  **Documentation References**:
  - Task 1에서 정의한 항목 포맷 템플릿 — 이 템플릿을 정확히 따를 것

  **WHY Each Reference Matters**:
  - seo-1000-methods.md의 해당 라인 범위에서 원본 항목 텍스트를 정확히 추출해야 함
  - 항목 번호, 제목, 설명을 원본 그대로 유지하면서 포맷 템플릿에 맞게 변환

  **Acceptance Criteria**:
  - [ ] Phase 1 헤딩 존재
  - [ ] 카테고리 4, 5, 19 서브헤딩 존재
  - [ ] Phase 1 영역 내 체크박스 항목 = 정확히 150개
  - [ ] #251~#310 (60개), #311~#360 (50개), #1041~#1080 (40개) 전체 존재
  - [ ] 항목 수 카운터 `150개` 표시 존재

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Phase 1 항목 수 검증
    Tool: Bash
    Steps:
      1. sed -n '/^## Phase 1/,/^## Phase 2/p' seo-homepage-masterplan-guide.md | grep -c "^- \[ \]"
      2. Assert: 출력값 = 150
    Expected Result: 150개 체크박스 항목
    Evidence: 터미널 출력

  Scenario: Phase 1 항목 번호 완전성 검증
    Tool: Bash
    Steps:
      1. for i in $(seq 251 310); do grep -q "\*\*#$i\." seo-homepage-masterplan-guide.md || echo "MISSING: $i"; done
      2. for i in $(seq 311 360); do grep -q "\*\*#$i\." seo-homepage-masterplan-guide.md || echo "MISSING: $i"; done
      3. for i in $(seq 1041 1080); do grep -q "\*\*#$i\." seo-homepage-masterplan-guide.md || echo "MISSING: $i"; done
      4. Assert: 출력 없음
    Expected Result: 누락 항목 0개
    Evidence: 터미널 출력
  ```

  **Commit**: NO (그룹 커밋)

---

- [x] 3. Phase 2: 설계 (Design) — 190 항목

  **What to do**:
  - Phase 2 헤딩 작성: `## Phase 2: 설계 (Design)`
  - Phase 개요 작성
  - 3개 카테고리 서브섹션:
    - `### 카테고리 2: 온페이지 SEO (#81-160)` — 80개 항목
    - `### 카테고리 8: 모바일 SEO (#521-570)` — 50개 항목
    - `### 카테고리 11: UX & Core Web Vitals (#681-740)` — 60개 항목
  - 포맷 템플릿 적용 (우선순위, 유형 태그, 교차참조)
  - Cat 11 항목에는 CWV 기준값 포함 (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1)
  - Phase 2 항목 수 카운터: `> ✅ Phase 2 체크리스트: 190개 항목`
  - 일부 기술적 항목에 간단한 코드 예시 가능 (meta viewport, responsive 패턴 등)

  **Must NOT do**:
  - 항목 번호 변경, 추가 항목, 3문장 초과

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 4A
  - **Blocked By**: Task 2

  **References**:
  - `seo-1000-methods.md:199-364` — 카테고리 2: 온페이지 SEO (#81-160) 원본 텍스트
  - `seo-1000-methods.md:1115-1220` — 카테고리 8: 모바일 SEO (#521-570) 원본 텍스트
  - `seo-1000-methods.md:1453-1578` — 카테고리 11: 사용자 경험 & Core Web Vitals (#681-740) 원본 텍스트

  **Acceptance Criteria**:
  - [ ] Phase 2 영역 내 체크박스 = 정확히 190개
  - [ ] #81~#160 (80개), #521~#570 (50개), #681~#740 (60개) 전체 존재
  - [ ] 누적 항목 수: 150 + 190 = 340개

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Phase 2 항목 수 검증
    Tool: Bash
    Steps:
      1. sed -n '/^## Phase 2/,/^## Phase 3/p' seo-homepage-masterplan-guide.md | grep -c "^- \[ \]"
      2. Assert: 출력값 = 190
    Expected Result: 190개 체크박스
    Evidence: 터미널 출력
  ```

  **Commit**: NO

---

- [x] 4A. Phase 3A: 개발-Core — 기술 SEO + 보안 (120 항목)

  **What to do**:
  - Phase 3 헤딩: `## Phase 3: 개발 (Development)`
  - Phase 개요 작성 (Phase 3 전체 340항목 중 3개 서브태스크로 분할 안내)
  - 2개 카테고리:
    - `### 카테고리 1: 기술적 SEO (#1-80)` — 80개 항목 **[코드 예시 집중]**
    - `### 카테고리 16: 보안 & 신뢰 (#931-970)` — 40개 항목
  - **코드 예시 집중 구간**: Cat 1 기술적 SEO에 Next.js App Router 코드 스니펫 대량 포함
    - `generateMetadata` 패턴 (동적 메타태그)
    - `sitemap.ts` 패턴 (사이트맵 자동 생성)
    - `robots.ts` 패턴 (로봇 설정)
    - `canonical` URL 설정
    - `next/image` 최적화
    - `next/font` 최적화
    - SSR/SSG/ISR 렌더링 전략 선택
    - 301/302 리다이렉트 (next.config.js)
    - 404 에러 페이지 (not-found.tsx)
    - JSON-LD 구조화 데이터 기본
  - Cat 16 보안: HTTPS, CSP, CORS, XSS 방지 관련 Next.js 설정 코드

  **Must NOT do**:
  - 코드 스니펫 30줄 초과
  - 비기술 항목에 코드 추가
  - React/Vue 코드

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: 문서 작성이지만 기술적 코드 스니펫 포함 — writing이 코드 포맷팅도 처리 가능
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 4B
  - **Blocked By**: Task 3

  **References**:

  **Pattern References**:
  - `seo-1000-methods.md:33-198` — 카테고리 1: 기술적 SEO (#1-80) 원본 텍스트
  - `seo-1000-methods.md:1983-2068` — 카테고리 16: 보안 & 신뢰성 (#931-970) 원본 텍스트

  **External References (Next.js SEO 코드 패턴)**:
  - Next.js Metadata API: generateMetadata, generateStaticParams 패턴
  - Next.js sitemap.ts: 파일 기반 사이트맵 생성
  - Next.js robots.ts: 로봇 설정
  - Next.js JSON-LD: 구조화 데이터 패턴 (dangerouslySetInnerHTML)
  - next/image: 이미지 최적화 (sizes, priority, placeholder)
  - next/font: 폰트 최적화 (Google Fonts, 로컬 폰트)
  - next.config.js: 리다이렉트, 헤더, 보안 설정

  **WHY Each Reference Matters**:
  - Cat 1은 기술적 SEO의 핵심 — 대부분의 항목이 Next.js 코드로 직접 구현 가능
  - 이전 세션의 연구 결과 (bg_ce45a4cd)에서 정확한 Next.js 패턴 확보 완료

  **Acceptance Criteria**:
  - [ ] Phase 3 헤딩 존재
  - [ ] Cat 1, Cat 16 서브헤딩 존재
  - [ ] Phase 3A 영역 내 체크박스 = 정확히 120개
  - [ ] #1~#80 (80개), #931~#970 (40개) 전체 존재
  - [ ] 코드 블록 최소 20개 (Cat 1에 집중)
  - [ ] 모든 코드 블록이 ```tsx 또는 ```typescript 랭귀지 태그 사용

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Phase 3A 항목 수 및 코드 블록 검증
    Tool: Bash
    Steps:
      1. Cat 1 + Cat 16 영역 체크박스 카운트 → Assert = 120
      2. grep -c '```tsx\|```typescript' Phase 3 영역 → Assert ≥ 20
    Expected Result: 120개 항목, 20+ 코드 블록
    Evidence: 터미널 출력
  ```

  **Commit**: NO

---

- [x] 4B. Phase 3B: 개발-Data/Media — 스키마 마크업 + 이미지/비디오 SEO (100 항목)

  **What to do**:
  - 2개 카테고리 (Phase 3 내부 계속):
    - `### 카테고리 14: 스키마 마크업 (#831-880)` — 50개 항목 **[JSON-LD 코드 집중]**
    - `### 카테고리 9: 이미지 & 비디오 SEO (#571-620)` — 50개 항목
  - Cat 14 스키마 마크업: 다양한 JSON-LD 유형별 코드 예시
    - Organization, WebSite, WebPage, Article, Product, BreadcrumbList
    - FAQ, HowTo, LocalBusiness, Event, Review
    - 웹사이트 유형별 필수 스키마 매핑
  - Cat 9 이미지/비디오: next/image 활용, WebP/AVIF, lazy loading, alt text, video sitemap

  **Must NOT do**:
  - JSON-LD 외 마이크로데이터/RDFa 코드 (JSON-LD만 사용)
  - 코드 30줄 초과

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 4C
  - **Blocked By**: Task 4A

  **References**:
  - `seo-1000-methods.md:1771-1876` — 카테고리 14: 스키마 마크업 & 구조화 데이터 (#831-880) 원본 텍스트
  - `seo-1000-methods.md:1221-1326` — 카테고리 9: 이미지 & 비디오 SEO (#571-620) 원본 텍스트

  **Acceptance Criteria**:
  - [ ] Cat 14, Cat 9 서브헤딩 존재
  - [ ] 체크박스 = 정확히 100개
  - [ ] #831~#880 (50개), #571~#620 (50개) 전체 존재
  - [ ] JSON-LD 코드 블록 최소 8개 (Organization, WebSite, Article, Product, BreadcrumbList, FAQ, HowTo, LocalBusiness)

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Phase 3B 항목 수 및 JSON-LD 검증
    Tool: Bash
    Steps:
      1. Cat 14 + Cat 9 영역 체크박스 → Assert = 100
      2. grep -c "JSON-LD\|@type\|schema.org" 코드 블록 → Assert ≥ 8
    Expected Result: 100개 항목, 8+ JSON-LD 스키마
    Evidence: 터미널 출력
  ```

  **Commit**: NO

---

- [x] 4C. Phase 3C: 개발-Intl/Voice/Advanced — 국제화 + 음성검색 + 실험적 SEO (120 항목)

  **What to do**:
  - 3개 카테고리 (Phase 3 내부 계속):
    - `### 카테고리 12: 국제 SEO (#741-780)` — 40개 항목
    - `### 카테고리 18: 음성 검색 (#1011-1040)` — 30개 항목
    - `### 카테고리 20: 고급 & 실험적 SEO (#1081-1130)` — 50개 항목
  - Cat 12: hreflang 태그, next-intl 설정, 다국어 URL 구조 코드
  - Cat 18: 음성 검색 최적화 (구조화 데이터, FAQ 스키마, 자연어 패턴)
  - Cat 20: 실험적 기법 (AI 검색 대응, 새로운 마크업 등)
  - Phase 3 종료 시 전체 카운터: `> ✅ Phase 3 체크리스트: 340개 항목 (3A: 120 + 3B: 100 + 3C: 120)`

  **Must NOT do**:
  - 항목 번호 변경, 추가 항목, 30줄 초과 코드

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 5
  - **Blocked By**: Task 4B

  **References**:
  - `seo-1000-methods.md:1579-1664` — 카테고리 12: 국제 SEO (#741-780) 원본 텍스트
  - `seo-1000-methods.md:2155-2220` — 카테고리 18: 음성 검색 & 대화형 검색 최적화 (#1011-1040) 원본 텍스트
  - `seo-1000-methods.md:2307-2457` — 카테고리 20: 고급 & 실험적 SEO 기법 (#1081-1130) 원본 텍스트

  **Acceptance Criteria**:
  - [ ] Cat 12, Cat 18, Cat 20 서브헤딩 존재
  - [ ] Phase 3C 영역 체크박스 = 정확히 120개
  - [ ] Phase 3 전체 = 340개 (120+100+120)
  - [ ] hreflang 코드 예시 최소 1개
  - [ ] Phase 3 종료 카운터 존재

  **Commit**: NO

---

- [x] 5. Phase 4: 콘텐츠 (Content) — 140 항목

  **What to do**:
  - Phase 4 헤딩: `## Phase 4: 콘텐츠 (Content)`
  - 2개 카테고리:
    - `### 카테고리 3: 콘텐츠 전략 (#161-250)` — 90개 항목
    - `### 카테고리 13: AI 검색 & AEO (#781-830)` — 50개 항목
  - Cat 3: 콘텐츠 계획, 작성, 업데이트 전략 (코드 없음 — 전략적 항목)
  - Cat 13: AEO (Answer Engine Optimization), AI 검색 대응 전략
    - 구조화된 답변 형식, FAQ 콘텐츠 패턴
    - ChatGPT/Gemini/Perplexity 검색 대응
  - Phase 4 카운터: `> ✅ Phase 4 체크리스트: 140개 항목`
  - 코드 예시 최소화 (콘텐츠 전략은 비기술적)

  **Must NOT do**:
  - 콘텐츠 작성 예시 (SEO 전략만, 실제 콘텐츠 아님)
  - 기술 코드 과다 (AEO는 전략 항목)

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 6
  - **Blocked By**: Task 4C

  **References**:
  - `seo-1000-methods.md:365-550` — 카테고리 3: 콘텐츠 전략 (#161-250) 원본 텍스트
  - `seo-1000-methods.md:1665-1770` — 카테고리 13: AI 검색 & Answer Engine Optimization (#781-830) 원본 텍스트

  **Acceptance Criteria**:
  - [ ] Phase 4 영역 체크박스 = 정확히 140개
  - [ ] #161~#250 (90개), #781~#830 (50개) 전체 존재
  - [ ] 누적: 150+190+340+140 = 820개

  **Commit**: NO

---

- [x] 6. Phase 5: 런칭 & 초기 운영 (Launch) — 200 항목

  **What to do**:
  - Phase 5 헤딩: `## Phase 5: 런칭 & 초기 운영 (Launch & Operations)`
  - 3개 카테고리:
    - `### 카테고리 6: 오프페이지 SEO & 링크 빌딩 (#361-450)` — 90개 항목
    - `### 카테고리 7: 로컬 SEO (#451-520)` — 70개 항목
    - `### 카테고리 17: 소셜 미디어 & 브랜드 (#971-1010)` — 40개 항목
  - Cat 6: 백링크 전략, 게스트 포스팅, PR, 디렉토리 등록 (코드 없음)
  - Cat 7: Google Business Profile, NAP 일관성, 지역 키워드 (코드 없음)
  - Cat 17: 소셜 시그널, Open Graph, Twitter Card (간단한 메타태그 코드)
  - Phase 5 카운터: `> ✅ Phase 5 체크리스트: 200개 항목`

  **Must NOT do**:
  - 마케팅 캠페인 상세 전략 (체크리스트만)
  - 외부 서비스 가입 가이드

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 7
  - **Blocked By**: Task 5

  **References**:
  - `seo-1000-methods.md:783-968` — 카테고리 6: 오프페이지 SEO & 링크 빌딩 (#361-450) 원본 텍스트
  - `seo-1000-methods.md:969-1114` — 카테고리 7: 로컬 SEO (#451-520) 원본 텍스트
  - `seo-1000-methods.md:2069-2154` — 카테고리 17: 소셜 미디어 & 브랜드 시그널 (#971-1010) 원본 텍스트

  **Acceptance Criteria**:
  - [ ] Phase 5 영역 체크박스 = 정확히 200개
  - [ ] #361~#450 (90개), #451~#520 (70개), #971~#1010 (40개) 전체 존재
  - [ ] 누적: 820+200 = 1,020개

  **Commit**: NO

---

- [x] 7. Phase 6: 분석 & 지속 최적화 (Analytics) — 50 항목

  **What to do**:
  - Phase 6 헤딩: `## Phase 6: 분석 & 지속 최적화 (Analytics & Continuous Optimization)`
  - 1개 카테고리:
    - `### 카테고리 15: SEO 분석 & 측정 (#881-930)` — 50개 항목
  - Google Analytics 4, Search Console, 핵심 지표 모니터링, 보고서 자동화
  - 간단한 GA4/GTM 설정 코드 (Next.js Script 컴포넌트 활용)
  - Phase 6 카운터: `> ✅ Phase 6 체크리스트: 50개 항목`

  **Must NOT do**:
  - GA4 튜토리얼 (설정 코드만)
  - 외부 툴 상세 가이드

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 8
  - **Blocked By**: Task 6

  **References**:
  - `seo-1000-methods.md:1877-1982` — 카테고리 15: SEO 분석 & 측정 (#881-930) 원본 텍스트

  **Acceptance Criteria**:
  - [ ] Phase 6 영역 체크박스 = 정확히 50개
  - [ ] #881~#930 (50개) 전체 존재
  - [ ] 누적: 1,020+50 = 1,070개

  **Commit**: NO

---

- [x] 8. 웹사이트 유형별 특화 섹션 — 60 항목 + 교차참조

  **What to do**:
  - 유형별 섹션 헤딩: `## 웹사이트 유형별 특화 가이드`
  - 5개 유형 서브섹션:
    - `### Type 1: 기업소개 사이트 (Corporate)`
      - 핵심 적용 항목 교차참조 목록 (Cat 14 Organization 스키마, Cat 7 로컬 SEO, Cat 16 신뢰 등)
      - 기업소개 사이트 우선순위 체크리스트 (교차참조만, 새 항목 아님)
    - `### Type 2: 쇼핑몰/이커머스 (E-commerce)`
      - `#### 카테고리 10: 이커머스 SEO (#621-680)` — **60개 항목 (체크박스)**
      - Product, Offer, Review 스키마 코드 예시
      - 쇼핑몰 특화 교차참조 (Cat 14 Product 스키마, Cat 9 상품 이미지 등)
    - `### Type 3: 랜딩페이지 (Landing Page)`
      - 핵심 적용 항목 교차참조 (Cat 11 CWV, Cat 2 CTA 최적화, Cat 8 모바일 등)
    - `### Type 4: SaaS`
      - 핵심 적용 항목 교차참조 (Cat 3 콘텐츠 마케팅, Cat 12 국제 SEO, Cat 14 SoftwareApplication 스키마 등)
    - `### Type 5: 포트폴리오 (Portfolio)`
      - 핵심 적용 항목 교차참조 (Cat 9 이미지 SEO, Cat 14 Person/CreativeWork 스키마, Cat 11 CWV 등)
  - 유형별 "Top 20 필수 항목" 교차참조 테이블
  - 유형별 스키마 마크업 추천 매트릭스
  - 유형별 카운터: `> ✅ 유형별 체크리스트: 60개 신규 항목 (이커머스 Cat 10) + 교차참조`

  **Must NOT do**:
  - Cat 10 외에 새 체크박스 항목 추가 (교차참조는 `→ 참조: #번호` 형태)
  - 유형별 완전한 별도 워크플랜 작성 (너무 방대)
  - 각 유형에 대한 디자인/UI 가이드

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 9
  - **Blocked By**: Task 7

  **References**:
  - `seo-1000-methods.md:1327-1452` — 카테고리 10: 이커머스 SEO (#621-680) 원본 텍스트
  - `seo-homepage-masterplan-guide.md` (이전 Task들이 작성한 결과물) — 교차참조 대상 항목 확인용

  **Acceptance Criteria**:
  - [ ] 5개 유형 서브섹션 존재 (기업소개, 쇼핑몰, 랜딩페이지, SaaS, 포트폴리오)
  - [ ] Cat 10 항목 = 정확히 60개 체크박스 (쇼핑몰 섹션)
  - [ ] #621~#680 전체 존재
  - [ ] 비이커머스 유형은 교차참조만 (새 체크박스 0개)
  - [ ] 누적: 1,070+60 = 1,130개 (전체 완성!)

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: 유형별 섹션 + 총 항목 수 최종 검증
    Tool: Bash
    Steps:
      1. grep "기업소개\|Corporate" seo-homepage-masterplan-guide.md | head -1 → Assert: 출력 존재
      2. grep "쇼핑몰\|이커머스\|E-commerce" seo-homepage-masterplan-guide.md | head -1 → Assert: 출력 존재
      3. grep "랜딩페이지\|Landing" seo-homepage-masterplan-guide.md | head -1 → Assert: 출력 존재
      4. grep "SaaS" seo-homepage-masterplan-guide.md | head -1 → Assert: 출력 존재
      5. grep "포트폴리오\|Portfolio" seo-homepage-masterplan-guide.md | head -1 → Assert: 출력 존재
      6. grep -c "^- \[ \]" seo-homepage-masterplan-guide.md → Assert = 1130
    Expected Result: 5개 유형 + 총 1130개 항목
    Evidence: 터미널 출력
  ```

  **Commit**: NO

---

- [x] 9. 부록 (Appendices) — 마무리 섹션

  **What to do**:
  - 부록 헤딩: `## 부록 (Appendices)`
  - 서브섹션들:
    - `### A. Next.js 렌더링 전략 매트릭스`
      - SSG vs ISR vs SSR vs CSR 비교표 (SEO 관점)
      - 페이지 유형별 추천 렌더링 전략
    - `### B. 코드 예시 인덱스`
      - 전체 코드 스니펫 목록 (항목 번호 + 코드 종류 + 위치)
    - `### C. SEO 카테고리 → Phase 매핑 전체표`
      - 20개 카테고리가 어느 Phase에 배치되었는지 요약
    - `### D. 약어 & 용어 정리`
      - SEO 관련 약어 목록 (CWV, LCP, INP, CLS, E-E-A-T, AEO, SERP 등)
    - `### E. 참고 자료`
      - Next.js 공식 문서, Google Search Central, Schema.org 등
    - `### F. 최종 검증 체크리스트`
      - 전체 항목 수 확인 명령어
      - Phase별 항목 수 확인 명령어
      - 코드 블록 수 확인 명령어

  **Must NOT do**:
  - 새 체크박스 항목 추가 (부록은 참조용)
  - `### E. 참고 자료`에 URL 10개 초과 (핵심 공식 문서만: Next.js docs, Google Search Central, Schema.org, web.dev 등)

  **Recommended Agent Profile**:
  - **Category**: `writing`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 10
  - **Blocked By**: Task 8

  **References**:
  - 이전 모든 Task에서 작성된 내용 — 인덱스 및 요약용

  **Acceptance Criteria**:
  - [ ] 부록 A~F 서브섹션 존재
  - [ ] 렌더링 전략 비교표 존재
  - [ ] 코드 예시 인덱스 존재
  - [ ] 용어 정리 존재
  - [ ] 새 체크박스 항목 0개 (부록에는 체크박스 없음)

  **Commit**: NO

---

- [x] 10. 최종 검증 & 커밋

  **What to do**:
  - 전체 문서 구조 검증:
    1. 총 체크박스 항목 수 = 1,130 확인
    2. 모든 항목 번호 #1~#1130 존재 확인
    3. 6개 Phase 헤딩 존재 확인
    4. 20개 카테고리 서브헤딩 존재 확인
    5. 5개 웹사이트 유형 섹션 존재 확인
    6. 코드 블록 수 범위 확인 (60~150)
    7. Phase별 항목 수 검증 (150+190+340+140+200+50+60 = 1130)
  - 누락 항목이 있으면 해당 Phase로 돌아가 수정
  - 모든 검증 통과 시 커밋

  **Must NOT do**:
  - 검증 실패 시 무시하고 진행

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: bash 명령으로 구조적 검증만 — 빠른 실행
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (마지막)
  - **Blocks**: None
  - **Blocked By**: Task 9

  **References**:
  - `seo-homepage-masterplan-guide.md` — 검증 대상 파일
  - `seo-1000-methods.md` — 원본 대조용

  **Acceptance Criteria**:
  - [ ] 모든 검증 통과 (7개 검증 항목 모두 PASS)
  - [ ] 실패 항목 0개

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: 종합 최종 검증
    Tool: Bash
    Steps:
      1. grep -c "^- \[ \]" seo-homepage-masterplan-guide.md → Assert = 1130
      2. for i in $(seq 1 1130); do grep -q "\*\*#$i\." seo-homepage-masterplan-guide.md || echo "MISSING: $i"; done → Assert: 출력 없음
      3. grep -c "^## Phase" seo-homepage-masterplan-guide.md → Assert = 6
      4. grep -c "^### 카테고리" seo-homepage-masterplan-guide.md → Assert = 20
      5. grep -c "^### Type" seo-homepage-masterplan-guide.md → Assert = 5
      6. grep -c '```tsx\|```typescript' seo-homepage-masterplan-guide.md → Assert: 60~150 범위
      7. sed -n '/^## Phase 1/,/^## Phase 2/p' seo-homepage-masterplan-guide.md | grep -c "^- \[ \]" → 150; sed -n '/^## Phase 2/,/^## Phase 3/p' seo-homepage-masterplan-guide.md | grep -c "^- \[ \]" → 190; (계속 각 Phase별 카운트) → 합계 1130
    Expected Result: 모든 검증 PASS
    Evidence: 전체 검증 로그 캡처
  ```

  **Commit**: YES (git repo가 초기화되어 있는 경우에만 — `git rev-parse --is-inside-work-tree` 확인 후 진행. git repo가 아니면 커밋 건너뛰기)
  - Message: `docs: SEO 1130 항목 기반 홈페이지 제작 마스터플랜 가이드 생성`
  - Files: `seo-homepage-masterplan-guide.md`
  - Pre-commit: 최종 검증 스크립트 전체 PASS 확인

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 10 (최종) | `docs: SEO 1130 항목 기반 홈페이지 제작 마스터플랜 가이드 생성` | `seo-homepage-masterplan-guide.md` | 항목 수 1130, 구조 검증 전체 PASS |

> 단일 커밋으로 최종 완성 파일만 커밋. 중간 태스크별 커밋 없음.

---

## Success Criteria

### Verification Commands
```bash
# 1. 총 체크박스 항목 수
grep -c "^- \[ \]" seo-homepage-masterplan-guide.md
# Expected: 1130

# 2. 모든 항목 번호 존재
for i in $(seq 1 1130); do grep -q "\*\*#$i\." seo-homepage-masterplan-guide.md || echo "MISSING: $i"; done
# Expected: (no output = all present)

# 3. Phase 수
grep -c "^## Phase" seo-homepage-masterplan-guide.md
# Expected: 6

# 4. 코드 블록 수
grep -c '```tsx\|```typescript' seo-homepage-masterplan-guide.md
# Expected: 60~150

# 5. 문서 크기
wc -l seo-homepage-masterplan-guide.md
# Expected: 4000~20000 lines
```

### Final Checklist
- [ ] ALL 1,130 항목 포함 (번호 #1~#1130)
- [ ] 6개 Phase 구조 완성
- [ ] 20개 카테고리 모두 배치
- [ ] 5개 웹사이트 유형 섹션 존재
- [ ] Next.js App Router 코드 예시 포함 (60~150개)
- [ ] 한국어 중심 + 영어 기술용어
- [ ] 추가 항목 0개 (원본만)
- [ ] 목차 + 범례 + 부록 완비
- [ ] 우선순위 표시 (🔴/🟡/🟢) 적용
- [ ] Phase별 항목 수 카운터 표시
