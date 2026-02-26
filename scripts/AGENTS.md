# SCRIPTS KNOWLEDGE BASE

Parent: `../AGENTS.md`
Scope: `scripts/`

## OVERVIEW
Ordered content pipeline for extraction, transformation, generation, SEO injection, and image migration.
Most scripts are data-destructive or overwrite outputs.

## EXECUTION ORDER
1. `extract-blog-content.mjs`
2. `migrate-images.mjs` (can run alongside step 1)
3. `transform-articles.mjs`
4. `generate-articles.mjs`
5. `inject-article-seo.mjs`

## INPUTS / OUTPUTS
- Extract: `site-mirror/blog/*/index.html` -> `redesign/data/articles-catalog.json`
- Transform: catalog -> `redesign/data/transformed/articles-transformed.json`
- Generate: transformed data -> `redesign/articles/*.html`
- SEO inject: generated HTML -> updated HTML with meta/json-ld
- Migrate images: CDN refs -> `redesign/images/*` + `redesign/data/image-map.json`

## DESTRUCTIVE RISKS
- `generate-articles.mjs` removes prior generated HTML outputs.
- URL fix scripts can rewrite many files in place.
- Running pipeline out of order causes missing-data cascades.

## SAFE USAGE PATTERNS
- Run one stage, inspect output artifact, then continue.
- Keep backups of `redesign/articles/` and `redesign/data/transformed/` before regeneration.
- Prefer latest URL-fix variant (`fix-urls4.ps1`) for encoding safety.

## ANTI-PATTERNS
- Do not run generate before transform artifacts exist.
- Do not edit transformed JSON manually if script rerun is expected.
- Do not apply URL-fix scripts without scoped path checks.
