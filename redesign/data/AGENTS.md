# DATA KNOWLEDGE BASE

Parent: `../AGENTS.md`
Scope: `redesign/data/`

## OVERVIEW
Pipeline artifacts for catalog, transformed content, redirects, and image mapping.
Many files are generated outputs.
This file covers data-artifact handling only; deployment rules are inherited.

## KEY ARTIFACTS
- `articles-catalog.json` - extracted metadata index
- `image-map.json` - CDN -> local image mapping
- `transformed/articles-transformed.json` - transformed article corpus
- `transformed/redirects.json` - redirect mapping artifact

## EDIT POLICY
- Prefer regenerating artifacts via scripts over manual edits.
- Manual patching only for emergency corrections with clear notes.

## VALIDATION CHECKS
- JSON validity after any change.
- Consistency between catalog slugs and generated pages.
- Redirect mappings should not create loops or dead targets.

## ANTI-PATTERNS
- Do not hand-edit transformed corpus before rerunning transform stage.
- Do not remove keys expected by generation scripts.
- Do not commit partial artifacts from failed pipeline runs.
