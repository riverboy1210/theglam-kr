# REDESIGN KNOWLEDGE BASE

Parent: `../AGENTS.md`
Scope: `redesign/`

## OVERVIEW
Production asset root served by Cloudflare Workers Assets.
Edits here go live after `wrangler deploy`.

## ENTRY POINTS
- `index.html` - homepage
- `articles.html` - article discovery hub
- `article.html` - article template page
- `reviews.html` - review aggregation page
- `hospitals.html` - clinic directory/comparison
- `community.html`, `community-post.html` - community pages
- `consultation.html` - lead funnel page

## SAFE EDIT ZONES
- Hand-authored pages: root `*.html` files in this folder.
- Shared styles/data: `shared.css`, `shared-data.js`.
- Landing pages: `landing/*.html`.

## HIGH-RISK ZONES
- `articles/*.html` are generated at scale; avoid manual bulk edits.
- `_headers`, `_redirects`, `robots.txt`, `sitemap.xml` affect SEO/routing.
- `shared.css` changes cascade across every page.

## IMAGE + LAYOUT POLICY
- Mobile currently prefers full-image visibility (`contain`) over crop for cards.
- If content framing must never cut off subjects, keep mobile `object-fit: contain`.
- Any changes to image fit require mobile re-screenshot verification.

## REQUIRED VERIFICATION
- Recheck mobile + desktop for: home, articles, reviews, hospitals, community.
- Confirm no 4xx/5xx network errors on key pages.
- For SEO edits, validate canonical/OG/robots/sitemap consistency.

## ANTI-PATTERNS
- Do not treat `mockup/` or `mockup-v2/` as live source.
- Do not patch hundreds of generated article pages manually.
- Do not deploy after CSS/SEO changes without screenshot evidence.
