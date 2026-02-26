# PROJECT KNOWLEDGE BASE

Generated: 2026-02-26
Scope: entire repository

## OVERVIEW
Static-first Korean beauty information platform deployed on Cloudflare Workers Assets.
Primary live root is `redesign/`; most other top-level folders are pipeline, mirror, evidence, or experiments.

## STRUCTURE
`redesign/` - production assets (HTML/CSS/JS/images/data)
`scripts/` - content pipeline (extract/transform/generate/seo/image)
`site-mirror/` - mirrored upstream Webflow snapshot (reference, generated)
`glamfeed/` - isolated experimental HTML builder workspace
`.sisyphus/` - planning/evidence/session artifacts
`wrangler.toml` - deployment routing + assets root

## WHERE TO LOOK
| Task | Location | Notes |
|---|---|---|
| Live homepage/layout | `redesign/index.html` | Direct production impact |
| Global style changes | `redesign/shared.css` | Cascades across all pages |
| Shared runtime data | `redesign/shared-data.js` | Multi-page content source |
| Article listing template | `redesign/articles.html` | Discovery/funnel page |
| Generated article pages | `redesign/articles/*.html` | Prefer regenerate, not manual bulk edit |
| SEO crawler controls | `redesign/robots.txt`, `redesign/sitemap.xml` | Search visibility impact |
| Redirect/cache rules | `redesign/_redirects`, `redesign/_headers` | Routing, cache, security headers |
| Deployment config | `wrangler.toml` | Domain routing + deploy root |
| Pipeline scripts | `scripts/*.mjs` | Ordered execution required |

## CONVENTIONS (PROJECT-SPECIFIC)
- Deploy target is `redesign/` only; root files are not served.
- Mobile-first UI with fixed bottom nav/CTA relationship.
- Shared data contracts live in `redesign/shared-data.js`.
- `site-mirror/` is source reference, not canonical editable app.
- Many screenshot files at repo root are QA evidence, not product assets.

## HIERARCHY RULE
- Child `AGENTS.md` files should define local deltas only.
- Do not duplicate global repository rules in every subdirectory doc.
- Keep parent references intact so agents can traverse constraints safely.

## ANTI-PATTERNS (THIS REPO)
- Never treat `site-mirror/` as source of truth.
- Never mass-edit generated `redesign/articles/*.html` when pipeline change is intended.
- Never change `wrangler.toml` routes/assets without full smoke check.
- Never modify `redesign/_redirects`/`redesign/robots.txt` casually; SEO blast radius is high.
- Never assume `glamfeed/` is part of production deploy path.

## COMMANDS
```bash
npx wrangler dev
npx wrangler deploy
node scripts/extract-blog-content.mjs
node scripts/migrate-images.mjs
node scripts/transform-articles.mjs
node scripts/generate-articles.mjs
node scripts/inject-article-seo.mjs
```

## VERIFICATION GATE
- For production-facing edits: check mobile + desktop screenshots on key pages.
- For routing/SEO edits: verify redirects, robots, sitemap sanity.
- For pipeline edits: run end-to-end script order on sample/full dataset.

## SUBDIRECTORY DOCS
- `redesign/AGENTS.md` - production web boundaries and safe edit zones
- `redesign/editorial/AGENTS.md` - transformation policy and legal style constraints
- `redesign/data/AGENTS.md` - generated data artifacts and edit policy
- `scripts/AGENTS.md` - pipeline contracts, order, destructive risks
- `site-mirror/AGENTS.md` - mirror regeneration and strict read-only rule
- `glamfeed/AGENTS.md` - isolated experimental builder workflow
