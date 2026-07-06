# AGENTS.md

## Stack

- **React 19** + **TypeScript 6** + **Vite 8** + **Mantine 9**
- Path alias `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`)
- React Compiler enabled via `@rolldown/plugin-babel` + `babel-plugin-react-compiler`
- ESLint flat config (`eslint.config.js`), PostCSS with `postcss-preset-mantine`

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server at `0.0.0.0:5173` |
| `npm run build` | `tsc -b && vite build` (TypeScript project references first) |
| `npm run lint` | `eslint .` |
| `npm run preview` | `vite preview` |

Always run `npm run build` (not just `vite build`) — `tsc -b` enforces project references in `tsconfig.json`.

## Architecture

- **Entry**: `src/main.tsx` → `App.tsx` (MantineProvider + BrowserRouter + Layout)
- **Pages**: `src/pages/{home,applicants,references,settings}/` — each re-exported via `index.ts`
- **Layout**: `src/layout/Layout.tsx` with collapsible navbar + header
- **Shared**: `src/components/FormField.tsx` — generic dynamic form renderer
- **Routes**: `/`, `/Reference`, `/Settings`, `/applicants/add/`, `/applicants/search/`

## Development notes

- **No API layer yet** — `axios` is a dependency but unused; forms call `console.log(values)` on submit. No `.env` files committed.
- **No tests** — no test framework in `package.json`.
- **Mantine v9** is very new — verify API compatibility before suggesting Mantine APIs from memory.
- **TypeScript strict**: `verbatimModuleSyntax`, `erasableSyntaxOnly`, `noUnusedLocals`, `noUnusedParameters`.
- **Docker**: `Dockerfile` uses `node:22-alpine`, runs `npm run dev` on 5173.
- **Known build issue**: `tsc -b` fails with `TS5101: Option 'baseUrl' is deprecated`. Workaround: add `"ignoreDeprecations": "6.0"` to `compilerOptions` in `tsconfig.app.json`. Vite build alone (`vite build`) works fine.
