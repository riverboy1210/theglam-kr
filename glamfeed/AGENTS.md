# GLAMFEED KNOWLEDGE BASE

Parent: `../AGENTS.md`
Scope: `glamfeed/`

## OVERVIEW
Isolated experimental HTML builder workspace.
Not part of Cloudflare deploy root.

## WORKFLOW (LEGACY APPEND STYLE)
- Multiple `b*.js`/`build*.js` files append fragments into `glamfeed/index.html`.
- Output is composition-by-append, not module bundling.

## SAFE EDIT BOUNDARIES
- Edit builder scripts when experimenting.
- Regenerate output after script changes.
- Keep experiments local to `glamfeed/`.

## RISKS
- Re-running append scripts can duplicate sections/styles.
- `index.html` here is generated/assembled and easy to desync.

## ANTI-PATTERNS
- Do not assume `glamfeed/` changes affect production.
- Do not import glamfeed output into `redesign/` without deliberate migration.
- Do not treat append order as optional.
