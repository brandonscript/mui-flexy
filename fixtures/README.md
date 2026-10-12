# Mui Flexy test fixtures

These workspaces exercise isolated MUI v5/v6/v7/v9 adapters for automated tests.
For the interactive public demo & docs, run `pnpm run demo` from the root and open
http://localhost:3003/.

Run a fixture with `pnpm run fixture:v5`, `fixture:v6`, `fixture:v7`, or
`fixture:v9` (ports 3005, 3006, 3007, and 3008), or use `fixture:all`.
`?classes` opens the shared-class regression fixture; v9 also accepts
`?styling=classes` on its full rendering fixture.

Use `pnpm run build:fixtures` and `pnpm run test:e2e:fixtures` to build and verify
these workspaces. They are excluded from Context7's public usage documentation.
