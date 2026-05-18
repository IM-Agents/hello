# Functional Test Cases — Tablet (≤1024px)

## Metadata
- **Breakpoint:** `@media (max-width: 1024px)`
- **Figma:** Tablet — Default (planned)

### TC-POS-001: Stacked layout
**Viewport:** 768×1024  
**Expected:** Calculator above history; full width panels

### TC-POS-002: Keypad remains 5 columns
**Expected:** All buttons visible without horizontal scroll

### TC-POS-003: Touch targets
**Expected:** Buttons min-height ≥48px

### TC-EDGE-001: History scroll
**Preconditions:** 10 history items  
**Expected:** History list scrolls inside panel
