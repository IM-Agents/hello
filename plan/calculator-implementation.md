# Calculator Implementation Plan

**Source:** `README.md`, `docs/*.md`  
**Stack:** React 18 + Vite (frontend), Node.js 24 + Express (backend), Turborepo monorepo  
**Figma file:** `efb6D9WRrFaSemoXuJOMxy`

---

## Agent TODO List (execution order)

### Phase A — Planning & Figma mapping
| ID | Task | Status |
|----|------|--------|
| A1 | Read README + docs; confirm feature scope | Done |
| A2 | Inventory Figma frames via API; map node IDs per breakpoint | Done |
| A3 | Update `docs/figma-tree.md` with page-wise prototype URLs | Done |
| A4 | Document dummy/placeholder screens not yet in Figma (error states) | Done |

### Phase B — Monorepo scaffold
| ID | Task | Status |
|----|------|--------|
| B1 | Root `package.json`, `turbo.json`, workspaces | Done |
| B2 | `apps/web` — Vite + React 18 + CSS modules | Done |
| B3 | `apps/api` — Express, helmet, cors, validation | Done |
| B4 | `packages/calculator-core` — safe expression evaluator | Done |
| B5 | Root `.gitignore` | Done |

### Phase C — Backend
| ID | Task | Status |
|----|------|--------|
| C1 | `POST /api/v1/calculate` with Joi validation | Done |
| C2 | `GET/POST/DELETE /api/v1/history` (in-memory, max 10) | Done |
| C3 | Error codes: DIV_BY_ZERO, INVALID_EXPR, SQRT_NEGATIVE, EMPTY | Done |
| C4 | No raw `eval`; tokenizer + shunting-yard evaluator | Done |

### Phase D — Frontend
| ID | Task | Status |
|----|------|--------|
| D1 | Calculator layout matching Figma (desktop/tablet/mobile) | Done |
| D2 | Display, DEG/RAD toggle, memory (M+/M−/MR/MC) | Done |
| D3 | Scientific keypad: sin/cos/tan/log/ln/√/^/π/e/%/± | Done |
| D4 | History panel (last 10), clear history | Done |
| D5 | Keyboard: 0-9, operators, Enter, Backspace | Done |
| D6 | Error banner + API integration | Done |

### Phase E — Test cases
| ID | Task | Status |
|----|------|--------|
| E1 | `tests/mobile-calculator.md` — iPhone frames | Done |
| E2 | `tests/tablet-calculator.md` — iPad frames | Done |
| E3 | `tests/desktop-calculator.md` — 1440px screens | Done |
| E4 | `tests/history-panel.md` — history UI + API | Done |
| E5 | `tests/calculation-engine-combined.md` — API + cross-page flows | Done |
| E6 | `tests/error-states-combined.md` — validation + edge cases | Done |

---

## Figma page map (MCP / prototype reference)

| Screen | Node ID | URL suffix |
|--------|---------|------------|
| Mobile — iPhone 14 Plus (default) | `222:7129` | `node-id=222-7129` |
| Mobile — variant 2 | `356:3191` | `node-id=356-3191` |
| Mobile — variant 3 | `356:4359` | `node-id=356-4359` |
| Mobile — variant 4 | `360:4751` | `node-id=360-4751` |
| Tablet — iPad Mini 6 | `210:7038` | `node-id=210-7038` |
| Tablet — variant 2 | `356:3193` | `node-id=356-3193` |
| Tablet — variant 3 | `356:4361` | `node-id=356-4361` |
| Tablet — variant 4 | `360:4753` | `node-id=360-4753` |
| Desktop — Calculator v1 | `610:2428` | `node-id=610-2428` |
| Desktop — Calculator v2 | `668:1904` | `node-id=668-1904` |
| Desktop — Calculator v3 + History **[ENTRY]** | `668:2154` | `node-id=668-2154` |
| Component — Calculator Unit | `668:2159` | `node-id=668-2159` |
| Component — History Panel | `668:2246` | `node-id=668-2246` |
| Container (layout shell) | `668:2158` | `node-id=668-2158` |

**Note:** Figma MCP `use_figma` was unavailable in this session; frames were verified via Figma REST API. New error-state frames can be duplicated from `668:2154` in Figma Desktop.

---

## Architecture decision

- **Monorepo:** Turborepo with `apps/web`, `apps/api`, `packages/calculator-core`
- **Shared evaluator** in `calculator-core` used by API (and optionally frontend for offline preview)
- **History:** Server in-memory for V1; frontend mirrors for display

---

## Acceptance alignment

See `docs/acceptance-criteria.md` — all calculation, memory, history, keyboard, and error criteria covered in Phase C–E.
