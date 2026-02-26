# EDITORIAL KNOWLEDGE BASE

Parent: `../AGENTS.md`
Scope: `redesign/editorial/`

## OVERVIEW
Transformation policy and batch-writing governance for article content.
Defines style, structure, and legal-safe messaging constraints.
This file covers editorial-only rules; deployment and pipeline rules are inherited.

## KEY FILES
- `TRANSFORMATION_PIPELINE.md` - canonical transformation rules
- `generate_batch_02.mjs` - batch generation helper
- `BATCH_01_SAMPLE_10.md`, `BATCH_02_REAL_20.md` - output examples

## REQUIRED CONTENT SHAPE
- Hook -> Value -> Trust -> Action flow
- Structured checklist/FAQ/CTA/disclaimer blocks
- Korean readability first; avoid model-sounding tone

## LEGAL + TRUST GUARDRAILS
- No fabricated testimonials or efficacy guarantees.
- Keep medical disclaimers explicit.
- Prefer neutral, check-first language over promotional claims.

## ANTI-PATTERNS
- Do not relax legal-safe phrasing for conversion copy.
- Do not remove disclaimer blocks from templates.
- Do not introduce unverifiable medical assertions.
