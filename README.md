# asparser — retired

This repository is an orphaned fetch/resolve/parse prototype retained temporarily as historical provenance during repository consolidation.

Its surviving responsibilities are small and no longer justify a standalone package:

- remote HTTP fetch + response-type dispatch overlaps native `fetch` plus the canonical response-processing utilities in `dddominikk/utils`;
- JSON, text, and binary parsing are direct platform operations;
- JSONL/JSONC parsing is small domain logic with no discovered external consumer;
- `PathResolver` duplicates the earlier modular-parser implementation already preserved under `attention-spa/airtable/legacy`;
- the JavaScript/MJS parser imports fetched source through a `data:` URL and therefore executes remote code. It is intentionally **not** being promoted as a generic "safe eval" utility.

Repository audit found no external code imports, no open issues or pull requests, no GitHub Actions workflows, no GitHub Releases, and only the `main` branch.

This is separate from `dddominikk/browser-parser`, which owns current-browser-page DOM capture/reporting and remains an independently justified active surface.

Consolidation record: `dddominikk/incubator#18`.

Do not add new functionality here.
