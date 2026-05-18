# Functional Test Cases — Tablet Calculator (iPad)

## Metadata
- **Source:** `docs/figma-tree.md` — nodes `210:7038`, `356:3193`, `356:4361`, `360:4753`
- **Stack:** React 18, Vite, REST API
- **Viewport:** 744px–1023px
- **Coverage:** TC-POS-001–006, TC-NEG-001–004, TC-EDGE-001–003, TC-LOG-001–002

## Positive Test Cases

### TC-POS-001: Tablet two-column layout
**Type:** UI | **Priority:** High  
**Preconditions:** Viewport 768px  
**Steps:** Load app  
**Expected:** Calculator and history side-by-side per CSS grid

### TC-POS-002: Touch target size
**Type:** UI | **Priority:** High  
**Steps:** Inspect keypad buttons  
**Expected:** Buttons ≥ 44px touch target; adequate spacing

### TC-POS-003: Percentage operation
**Type:** Functional | **Priority:** Medium  
**Steps:** Enter `200%50` or `200*50%` per parser → evaluate  
**Expected:** Valid modulo/percent behavior per implementation

### TC-POS-004: Square root
**Type:** Functional | **Priority:** High  
**Steps:** Enter `sqrt(16)` → evaluate  
**Expected:** Result `4`

### TC-POS-005: Exponent
**Type:** Functional | **Priority:** High  
**Steps:** Enter `5^2` → evaluate  
**Expected:** Result `25`

### TC-POS-006: Constants π and e
**Type:** Functional | **Priority:** Medium  
**Steps:** Tap π and e buttons  
**Expected:** Values inserted into expression

## Negative Test Cases

### TC-NEG-001: sqrt negative
**Type:** Functional | **Priority:** High  
**Steps:** `sqrt(-4)` → evaluate  
**Expected:** Square root error message

### TC-NEG-002: log of non-positive
**Type:** Functional | **Priority:** High  
**Steps:** `log(0)` → evaluate  
**Expected:** Invalid input error

### TC-NEG-003: Unbalanced parentheses
**Type:** Functional | **Priority:** Medium  
**Steps:** `(2+3` → evaluate  
**Expected:** Mismatched parentheses error

### TC-NEG-004: History clear confirmation
**Type:** UI | **Priority:** Low  
**Steps:** Add items → Clear history  
**Expected:** List empty; API DELETE succeeds

## Edge Test Cases

### TC-EDGE-001: History max 10 items
**Type:** Functional | **Priority:** High  
**Steps:** Perform 12 successful calculations  
**Expected:** Only 10 newest entries in history panel

### TC-EDGE-002: Very large result
**Type:** Functional | **Priority:** Medium  
**Steps:** `10^20` → evaluate  
**Expected:** Finite display or overflow error; no crash

### TC-EDGE-003: Tablet keyboard + touch mix
**Type:** UI | **Priority:** Medium  
**Steps:** Type `3+3` on keyboard then tap `=`  
**Expected:** Result `6`

## Logical Test Cases

### TC-LOG-001: Scientific session
**Type:** Workflow | **Priority:** High  
**Steps:** sin(45) + cos(45) in DEG → evaluate  
**Expected:** Combined result; two history entries if evaluated separately

### TC-LOG-002: Responsive breakpoint transition
**Type:** UI | **Priority:** Medium  
**Steps:** Resize from 500px to 800px  
**Expected:** Layout switches mobile → tablet without state loss
