# Figma Navigation Tree — Calculator App (Responsive)

**File Key:** `efb6D9WRrFaSemoXuJOMxy`  
**Last Modified:** 2026-05-02T10:03:08Z  
**Prototype Base URL:** https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy

---

## Summary

| Metric | Count |
|--------|-------|
| Total pages | 13 |
| Main pages | 11 |
| Overlays | 0 |
| Modals | 0 |
| Dialogs | 0 |
| Entry page | **Calculator 3 (Desktop + History)** |

---

## Page index (for MCP / implementation)

| # | Screen | Breakpoint | Node ID | Figma link |
|---|--------|------------|---------|------------|
| 1 | iPhone 14 Plus — Default | Mobile (428×926) | `222:7129` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=222-7129) |
| 2 | iPhone 14 Plus — Variant B | Mobile | `356:3191` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-3191) |
| 3 | iPhone 14 Plus — Variant C | Mobile | `356:4359` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-4359) |
| 4 | iPhone 14 Plus — Variant D | Mobile | `360:4751` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=360-4751) |
| 5 | iPad Mini 6 — Default | Tablet (744×1133) | `210:7038` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=210-7038) |
| 6 | iPad Mini 6 — Variant B | Tablet | `356:3193` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-3193) |
| 7 | iPad Mini 6 — Variant C | Tablet | `356:4361` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-4361) |
| 8 | iPad Mini 6 — Variant D | Tablet | `360:4753` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=360-4753) |
| 9 | Calculator — Desktop v1 | Desktop (1440×1080) | `610:2428` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=610-2428) |
| 10 | Calculator — Desktop v2 | Desktop | `668:1904` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-1904) |
| 11 | Calculator 3 — Desktop + History | Desktop | `668:2154` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2154) |
| 12 | Calculator Unit (component) | Component | `668:2159` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2159) |
| 13 | History Panel (component) | Component | `668:2246` | [Open](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2246) |

**Figma canvas pages:** `Design (Prototype) 💥` (mobile/tablet), `AI Testing` (desktop layouts).

---

## Navigation Tree

```
# Calculator App (Responsive)

[ENTRY] Calculator 3 — Desktop + History
│  https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2154
│
├── Mobile — iPhone 14 Plus (Default)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=222-7129
│
├── Mobile — iPhone 14 Plus (Variant B)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-3191
│
├── Mobile — iPhone 14 Plus (Variant C)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-4359
│
├── Mobile — iPhone 14 Plus (Variant D)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=360-4751
│
├── Tablet — iPad Mini 6 (Default)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=210-7038
│
├── Tablet — iPad Mini 6 (Variant B)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-3193
│
├── Tablet — iPad Mini 6 (Variant C)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=356-4361
│
├── Tablet — iPad Mini 6 (Variant D)
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=360-4753
│
├── Desktop — Calculator v1
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=610-2428
│
├── Desktop — Calculator v2
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-1904
│
├── [ENTRY] Desktop — Calculator 3 + History Panel
│   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2154
│   ├── Container (layout shell)
│   │   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158
│   ├── Calculator Unit
│   │   https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2159
│   └── History Panel
│       https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2246
```

---

## Implementation mapping

| UI area | Figma reference | React component |
|---------|-----------------|-----------------|
| Display + DEG/RAD | `668:2161` Mode Toggles & Display | `DisplayPanel` |
| Keypad grid | `668:2172` Scientific & Keypad Grid | `Keypad` |
| History list | `668:2246` History Panel | `HistoryPanel` |
| Responsive shell | `222:7129`, `210:7038`, `668:2154` | `CalculatorLayout` |

---

## Dummy / planned screens (create in Figma if missing)

| Screen | Purpose | Suggested duplicate from |
|--------|---------|--------------------------|
| Error — Division by zero | Show error banner on display | `668:2154` |
| Error — Invalid expression | Malformed input feedback | `668:2154` |
| History — Empty state | No calculations yet | `668:2246` |
| Memory — Active indicator | M≠0 badge on MR | `668:2159` |
