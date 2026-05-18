# Functional Test Cases — Mobile (≤640px)

## Metadata
- **Breakpoint:** `@media (max-width: 640px)`
- **Figma:** Mobile — Default (planned)

### TC-POS-001: Single column layout
**Viewport:** 375×812  
**Expected:** Calculator and history stack vertically

### TC-POS-002: Reduced padding
**Expected:** `calculator-unit` padding 16px

### TC-POS-003: Keyboard on mobile browser
**Steps:** Focus page; use device keyboard  
**Expected:** Enter and digits work

### TC-EDGE-001: Long expression wrap
**Steps:** Enter 30+ character expression  
**Expected:** Display wraps without layout break
