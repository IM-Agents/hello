# Calculator App — Agent Execution Plan

**Source:** `README.md`, `docs/*.md`  
**Figma file:** `efb6D9WRrFaSemoXuJOMxy`  
**Stack (implementation):** React 18 + webpack 5 (monorepo), Node.js 24 + Express, REST API

---

## Phase 1 — Figma (page-wise, MCP)

| # | Screen / Frame | Purpose | Status |
|---|----------------|---------|--------|
| F1 | Desktop — Default | Calculator + empty history (DEG active) | Done (node `668:2158`) |
| F2 | Desktop — Error State | Division by zero / invalid expression UI | Pending |
| F3 | Desktop — History Populated | History (3/10) with sample entries | Pending |
| F4 | Desktop — RAD Mode | RAD toggle active, DEG inactive | Pending |
| F5 | Tablet — Default | ~768px stacked layout | Pending |
| F6 | Mobile — Default | ~375px single column | Pending |
| F7 | Mobile — History Expanded | History visible below keypad | Pending |

After each frame: record node-id + URL in `docs/figma-tree.md`.

---

## Phase 2 — Monorepo scaffold

| # | Task | Status |
|---|------|--------|
| S1 | Root `package.json` + `packageManager`, workspaces, turbo | Pending |
| S2 | Root `.env.example`, `.gitignore`, `turbo.json` | Pending |
| S3 | `apps/web` — webpack 5 React SPA (not Vite) | Pending |
| S4 | `apps/api` — Express + safe evaluator | Pending |
| S5 | `scripts/preview-start.js`, `preview-stop.js`, `proxy.js` | Pending |
| S6 | Shared packages optional (`packages/calculator-core`) | Pending |

---

## Phase 3 — Implementation

| # | Task | Status |
|---|------|--------|
| I1 | Safe expression parser/evaluator (no `eval`) | Pending |
| I2 | API: `POST /api/v1/calculate`, history CRUD | Pending |
| I3 | React UI: display, keypad, DEG/RAD, memory | Pending |
| I4 | History panel (max 10), keyboard handlers | Pending |
| I5 | Responsive CSS (mobile / tablet / desktop) | Pending |
| I6 | Error states matching Figma | Pending |
| I7 | `npm run preview` end-to-end validation | Pending |

---

## Phase 4 — Test cases (Markdown)

| File | Scope |
|------|--------|
| `docs/tests/desktop-default.md` | Desktop default UI + calc |
| `docs/tests/desktop-error.md` | Error display scenarios |
| `docs/tests/desktop-history.md` | History panel flows |
| `docs/tests/tablet-responsive.md` | Tablet breakpoint |
| `docs/tests/mobile-responsive.md` | Mobile breakpoint |
| `docs/tests/api-calculate.md` | POST calculate API |
| `docs/tests/api-history.md` | History API |
| `docs/tests/combined-e2e.md` | Cross-page workflows (keyboard + memory + history + API) |

---

## Agent TODO list (execution order)

1. [x] Read README + docs; inspect existing Figma frame
2. [x] Figma F2–F7 blocked (view-only seat) — responsive/error variants in React CSS
3. [x] Update `docs/figma-tree.md` with full navigation tree + links
4. [x] Scaffold monorepo (webpack + Express + preview scripts)
5. [x] Implement calculator core + API + React UI
6. [x] Wire responsive layouts to Figma breakpoints
7. [x] Generate test case markdown files (page-wise + combined)
8. [ ] Run `npm run preview` and smoke-test (user can run locally)

---

## Design tokens (from Figma)

| Token | Value |
|-------|--------|
| Calculator bg | `#1d1f26` |
| History panel bg | `#191b22` |
| Display bg | `#0c0e14` |
| Primary blue | `#005ef4` |
| Operator orange | `#ff5714` |
| Clear red | `#ff5546` |
| Button dark | `#33343b` / `#282a30` |
| Text primary | `#ffffff` / `#e2e2ea` |
| Text muted | `#e4beb3` |
| Border accent | `#5b4038` |
