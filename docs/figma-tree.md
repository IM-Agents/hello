# Figma Navigation Tree — Calculator App (Responsive)

**File Key:** `efb6D9WRrFaSemoXuJOMxy`  
**Prototype Base URL:** https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy  
**Figma access:** View-only seat — additional frames documented for implementation; create/edit requires Editor access.

---

## Summary

| Metric | Count |
|--------|-------|
| Total screens (planned) | 7 |
| Implemented in Figma | 1 |
| Overlays | 0 |
| Modals | 0 |
| Entry screen | **Desktop — Default** |

---

## Navigation Tree

```
# Calculator App (Responsive)

[ENTRY] Desktop — Default
│  https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158
│  node-id: 668:2158 — Calculator + History (empty), DEG active
│
├── Desktop — Error State (planned)
│  Expression: "10 ÷ 0" → display "Error" (red)
│  Implementation: apps/web responsive + error banner
│
├── Desktop — History Populated (planned)
│  History header "(3/10)" with sample rows
│  Implementation: HistoryPanel with entries
│
├── Desktop — RAD Mode (planned)
│  RAD toggle active (blue), DEG inactive
│  Implementation: angle mode toggle state
│
├── Tablet — Default (~768px) (planned)
│  Calculator + history stacked or narrowed side-by-side
│  Implementation: @media max-width 1024px
│
├── Mobile — Default (~375px) (planned)
│  Single column; history below keypad
│  Implementation: @media max-width 640px
│
└── Mobile — History Expanded (planned)
   History list visible below calculator
   Implementation: mobile layout scroll
```

---

## Screen Reference (MCP / implementation)

| Screen | Node ID | Figma URL | Status |
|--------|---------|-----------|--------|
| Desktop — Default | `668:2158` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158) | In file |
| Desktop — Error State | — | — | CSS/React variant |
| Desktop — History Populated | — | — | CSS/React variant |
| Desktop — RAD Mode | — | — | CSS/React variant |
| Tablet — Default | — | — | Responsive breakpoint |
| Mobile — Default | — | — | Responsive breakpoint |
| Mobile — History Expanded | — | — | Responsive breakpoint |

---

## Design tokens (from Figma node 668:2158)

| Token | Hex |
|-------|-----|
| Calculator surface | `#1d1f26` |
| History panel | `#191b22` |
| Display background | `#0c0e14` |
| Primary / equals / DEG active | `#005ef4` |
| Operator buttons | `#ff5714` |
| Clear / reset | `#ff5546` |
| Function buttons | `#282a30` |
| Number buttons | `#33343b` |
| Text primary | `#ffffff` |
| Text secondary | `#e2e2ea` |
| Text muted | `#e4beb3` |
| Error text | `#ff5546` |
| Border accent | `#5b4038` |
