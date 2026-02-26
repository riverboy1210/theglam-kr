# SITE-MIRROR KNOWLEDGE BASE

Parent: `../AGENTS.md`
Scope: `site-mirror/`

## OVERVIEW
Generated snapshot of upstream Webflow content.
Reference-only archive; not canonical production source.

## SOURCE OF TRUTH
- Canonical upstream: `https://minyeoneungoeroweo-efed5f.webflow.io/`
- Regeneration scripts at repo root: `mirror_site.mjs`, `mirror_site.py`

## USAGE
- Read mirrored pages/assets for extraction/reference.
- Use as pipeline input for `scripts/extract-blog-content.mjs`.

## STRICT POLICY
- Treat files here as generated artifacts.
- If upstream changes are needed, update upstream then regenerate mirror.

## ANTI-PATTERNS
- Do not hand-edit files in `site-mirror/` expecting persistence.
- Do not treat this folder as deploy source.
- Do not mix mirror edits with live page edits in `redesign/`.
