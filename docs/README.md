# Mui Flexy demo & docs

This is the interactive demo & docs published at
https://brandonscript.github.io/mui-flexy/. It supports MUI v5, v6, v7, and v9
(MUI skipped v8). The isolated rendering fixtures live in `../fixtures/`.

## Run locally

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm run demo
```

Open http://localhost:3003/?mui=v9 to select MUI v9 directly. Use `v5`, `v6`, or
`v7` for other adapters. Missing or invalid versions default to v7. Version links
preserve other query parameters and the hash, support reloads and back/forward,
and can be opened in another tab. Add `&styling=classes` for shared layout styles.

`pnpm dev` and `pnpm run docs:dev` are aliases for the demo. The server builds the
site first, then polls source files and rebuilds with Rollup; refresh after a rebuild.
`pnpm run docs:dev:basepath` simulates the `/mui-flexy` GitHub Pages path locally.

## Build and serve

```sh
pnpm run build:demo
pnpm run demo:serve
```

`build:docs` and `docs:serve` remain aliases. For production, set
`BASEPATH=/mui-flexy` when building; the Pages workflow already does this.

## Files

- `Docs.tsx`: version navigation and interactive FlexBox / FlexGrid sandboxes.
- `index.template.html`: page shell and CDN import maps.
- `rollup.docs.mjs`: version-specific adapter bundles and the application bundle.
- `dev-server.js`: development server with query-string and base-path support.
- `llms.txt`: index for coding agents.
- `guide.md`: generated copy of the root README for retrieval tools.
- `static/`: generated JavaScript bundles; do not edit these directly.

## Browser checks

`pnpm run test:e2e:docs` verifies the published application's navigation,
responsive controls, direction changes, and Grid layout. Regression fixtures
are checked separately with `pnpm run test:e2e:fixtures`.
