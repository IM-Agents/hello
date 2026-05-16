# Calculator App — Design Execution Plan & Build Checklist

**Sources:** `README.md`, `docs/figma-tree.md`, `docs/prd.md`, `docs/acceptance-criteria.md`, `docs/edge-cases.md`, `Agent.md`  
**Figma file (canonical):** `efb6D9WRrFaSemoXuJOMxy` — [Prototype](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy)  
**Documented UI scope:** See **`docs/figma-tree.md`** — five Figma canvas pages; **README** product UI entry remains **Container** (`668-2158`) on **AI Testing**.

---

## 1. Application structure (analysis)

| Layer | Responsibility |
|--------|----------------|
| **Pages** | Primary build target: **Container** on **AI Testing**; separate canvases hold prototype devices, style guide, welcome/archive — see `docs/figma-tree.md` |
| **Modules** | Display, keypad (basic + scientific clusters), history panel, mode/memory controls, error/feedback |
| **Flows** | Input → validate → evaluate (client or via API) → update display/history/memory; keyboard parallel to pointer |
| **Dependencies** | React UI; optional REST `/api/v1/calculate`, `/api/v1/history` per README |

---

## 2. MCP / Figma execution note

- **Configured MCP:** `.cursor/mcp.json` includes `figma-developer-mcp` (requires `FIGMA_API_KEY`).
- **This artifact set:** Structural plan, component/tokens spec, and test cases for QA automation.
- **Actual node creation in Figma** must be done in the Figma editor (or via tooling that exposes write access to your team’s Figma setup). Use **Section 7** as the step-by-step build script inside file `efb6D9WRrFaSemoXuJOMxy`, page aligned with `[ENTRY] Container` in `docs/figma-tree.md`.

---

## 3. Internal TODO checklist (design build)

- [ ] Publish **design tokens** as Figma variables (color, type, radius, space, elevation)
- [ ] Create **Key / Button** component with variants (type, size, state)
- [ ] Create **Display** component (default, error sub-state)
- [ ] Create **History row** + **History panel** (empty + populated)
- [ ] Create **Angle mode control** (DEG/RAD) and **memory cluster** (M+, M−, MR, MC)
- [ ] Assemble **Mobile** frame (narrow, history collapsible or bottom sheet pattern)
- [ ] Assemble **Tablet** frame (split: history + keypad)
- [ ] Assemble **Desktop** frame (wider split, optional max width)
- [ ] Add **prototype links** (optional): history toggle if implemented as overlay
- [ ] Run **accessibility** review: contrast, focus order annotation, hit targets
- [ ] Handoff: mark export settings, component descriptions, dev mode spacing

---

## 4. Required inventory

### 4.1 Pages

| ID | Name | Notes |
|----|------|--------|
| P1 | **AI Testing → Calculator 3 → Container** | README entry node `668-2158` |
| P2 | **Design (Prototype)** | Device frames (iPhone / iPad) + labels — prototype flows |
| P3 | **Style Guide** | Tokens + components |
| P4 | **Welcome** | Marketing/cover (out of core app scope unless product expands) |
| P5 | **Archive** | Legacy/reference layouts |

### 4.2 Layout systems

- **Auto-layout** vertical: page padding → header/toolbar → display → keypad → (optional) history dock
- **Auto-layout** horizontal: tablet/desktop **two-column** (keypad | history)
- **Grid** (optional): scientific rows with consistent `gap` token
- **Safe area** padding on mobile for notch/home indicator (annotation)

### 4.3 Design tokens

| Category | Tokens (suggested names) |
|----------|---------------------------|
| **Color** | `color/bg/canvas`, `color/bg/surface`, `color/text/primary`, `color/text/muted`, `color/key/numeric`, `color/key/operator`, `color/key/scientific`, `color/key/memory`, `color/border/subtle`, `color/state/error`, `color/state/focus-ring` |
| **Typography** | `font/display` (monospace or tabular nums), `font/ui/body`, `font/ui/caption`, scales: 12 / 14 / 16 / 32–48 for display |
| **Spacing** | `space/1`–`space/8` on 4px scale |
| **Radius** | `radius/key`, `radius/panel`, `radius/display` |
| **Elevation** | `shadow/raised` for pressed/hover distinction (subtle) |
| **Motion** | `duration/fast` 120–180ms, `easing/standard` — micro-press on keys only (spec in prototype) |

### 4.4 Responsive breakpoints

| Name | Width (px) | Layout intent |
|------|------------|---------------|
| **Mobile** | 390 (reference) | Stacked; history behind toggle or bottom sheet; full-width keypad |
| **Tablet** | 768 | Two-column; fixed min tap 44×44 |
| **Desktop** | 1280+ | Centered max-width ~1200; generous gaps; history always visible |

### 4.5 States

| State | Where | Design behavior |
|-------|--------|-----------------|
| **Default** | Global | Neutral surfaces, readable contrast |
| **Loading** | Optional | Skeleton or subtle pulse on display if awaiting first API health |
| **Empty** | History | Illustration or “No calculations yet” caption |
| **Error** | Display + optional banner | Short copy; Dismiss or clears on next key per product rule |
| **Success** | After eval | Result in display; new history row |
| **Hover/pressed** | Keys | Shade shift + 1px translate or inner shadow |
| **Focus visible** | Keys | Ring token for keyboard navigation |
| **Disabled** | If any op invalid | Lower opacity; avoid if UX uses errors instead |

### 4.6 User flows

1. **Basic arithmetic:** digit/operator input → `=` → result → history append  
2. **Scientific:** insert fn/constants; **DEG/RAD** changes trig interpretation  
3. **Memory:** M+/M−/MR/MC with visible memory indicator  
4. **History:** last 10 items; expression + result visible  
5. **Keyboard:** digits, ops, Enter, Backspace mirror buttons  
6. **Errors:** div by zero, sqrt/log domain, invalid expr — friendly message, non-crash  

### 4.7 Reusable sections

- **Header bar** — app name, optional settings (future theme)
- **Mode strip** — DEG/RAD, memory indicators
- **Display stack** — expression line + result line (if split)
- **Keypad** — numeric grid + operators + scientific row(s)
- **History list** — scroll region, row component

### 4.8 Modals / drawers / popups

- No **calculator** modals required by README V1. **Login Page** exists on Figma canvas **AI Testing** (`655-404`) — out of MVP scope unless PRD changes. Optional: **History drawer** on mobile — if added, create an **Overlay** frame variant for prototype only

### 4.9 Tables / forms / cards / charts

- **No** tables, forms, or charts. **Cards:** optional elevated **History item** as card style

### 4.10 Mobile / tablet / desktop variants

- Three **frames** under `Container`, each using the same components with **responsive variant** props (width, column direction, history visibility)

### 4.11 Accessibility

- Minimum **44×44** pt touch targets (document in component description)
- **Contrast** ≥ WCAG AA for text vs button backgrounds
- **Focus order** left-to-right, top-to-bottom matching visual layout
- **Live region** annotation for display updates (for dev handoff)
- **Labels** on icon-only keys (sin, π, √) via tooltip or aria-label in spec

### 4.12 Animation / micro-interaction

- Key **press** 120ms scale or shadow; no distracting motion
- Display **digit roll** optional (low priority); prefer static for V1
- Error **shake** optional; keep subtle

---

## 5. Component library (Figma)

| Component | Variants / properties |
|-----------|------------------------|
| `Key` | `type`: numeric \| operator \| scientific \| memory \| utility; `size`: sm \| md \| lg; `state`: default \| hover \| pressed \| focus \| disabled |
| `Display` | `state`: idle \| error |
| `HistoryRow` | `truncated`: yes \| no |
| `HistoryPanel` | `state`: empty \| filled |
| `AngleToggle` | `value`: DEG \| RAD |
| `MemoryCluster` | composition of `Key` memory types |
| `App/Container` | `breakpoint`: mobile \| tablet \| desktop |

**Naming:** `Component / Key`, `Component / Display`, etc.

---

## 6. Sequential Figma page build (per `docs/figma-tree.md`)

1. Open file `efb6D9WRrFaSemoXuJOMxy` and verify all **five canvas pages** listed in `docs/figma-tree.md` exist.  
2. **Style Guide:** maintain tokens/components referenced by implementation (`1-2`).  
3. **Design (Prototype):** keep device frames (`65-3892`) aligned with breakpoints in § Responsive breakpoints.  
4. **AI Testing:** treat frame **Container** (`668-2158`) as `[ENTRY]` for README scope; evolve **Calculator 3** subtree before older calculator variants unless deprecated.  
5. Optional: **Welcome** / **Archive** for marketing or legacy reference only — do not use as silent UX source of truth.  
6. Wire prototype **starting point** to the frame product designates (canonical deep link remains `node-id=668-2158` unless changed in tree doc).  
7. Publish library if shared; otherwise keep as local components  

---

## 7. Validation gates

| Gate | Reference |
|------|-----------|
| Pages match tree | `docs/figma-tree.md` (all canvas pages + entry node) |
| Features | `README.md` § Primary Features |
| UX rules | `docs/acceptance-criteria.md` § UI/UX |
| Edge behavior | `docs/edge-cases.md` |
| Agent | `Agent.md` (style, tests, docs, `.gitignore`) |

---

_Generated for calculator responsive UI · aligns with documented Figma scope_
