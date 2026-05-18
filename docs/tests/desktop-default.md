# Functional Test Cases — Desktop Default

## Metadata
- **Source:** README.md, docs/acceptance-criteria.md, Figma node `668:2158`
- **Stack:** React 18, webpack, Express API
- **Coverage:** TC-POS-001–010, TC-NEG-001–005, TC-EDGE-001–004

## Positive Test Cases

### TC-POS-001: Basic addition
**Type:** UI | **Priority:** High  
**Preconditions:** App loaded on desktop viewport (≥1024px)  
**Steps:** Click `2`, `+`, `3`, `=`  
**Expected:** Display shows `5`; history adds `2+3 = 5`

### TC-POS-002: Basic subtraction
**Steps:** Click `9`, `−`, `4`, `=`  
**Expected:** Display `5`

### TC-POS-003: Multiplication
**Steps:** Click `6`, `×`, `7`, `=`  
**Expected:** Display `42`

### TC-POS-004: Division
**Steps:** Click `8`, `÷`, `2`, `=`  
**Expected:** Display `4`

### TC-POS-005: Scientific sin (DEG)
**Preconditions:** DEG mode active  
**Steps:** Click `sin`, `3`, `0`, `)`, `=`  
**Expected:** Display `0.5` (± rounding tolerance)

### TC-POS-006: Memory M+ and MR
**Steps:** Enter `42`, `M+`, `MC` skipped, `MR`  
**Expected:** Display restores `42`

### TC-POS-007: Constants π and e
**Steps:** Click `π`, `+`, `e`, `=`  
**Expected:** Numeric sum ≈ 5.859…

### TC-POS-008: Keyboard digits and Enter
**Steps:** Type `1`, `2`, `+`, `3` on keyboard; press Enter  
**Expected:** Evaluates to `15`

### TC-POS-009: Square root
**Steps:** Click `√`, `1`, `6`, `)`, `=`  
**Expected:** Display `4`

### TC-POS-010: Exponent
**Steps:** Click `2`, `x^y`, `3`, `=` (or `2^3`)  
**Expected:** Display `8`

## Negative Test Cases

### TC-NEG-001: Division by zero
**Steps:** `1`, `0`, `÷`, `0`, `=`  
**Expected:** Display `Error`; message "Cannot divide by zero"

### TC-NEG-002: Empty evaluate
**Steps:** Press `=` with empty expression  
**Expected:** Error state; no crash

### TC-NEG-003: Invalid nested operators
**Steps:** Enter `5++2`, `=`  
**Expected:** Invalid expression error

### TC-NEG-004: sqrt of negative
**Steps:** `√`, `-`, `1`, `)`, `=`  
**Expected:** Negative sqrt error message

### TC-NEG-005: log of non-positive
**Steps:** `log`, `0`, `)`, `=`  
**Expected:** Invalid logarithm message

## Edge Test Cases

### TC-EDGE-001: History max 10 items
**Steps:** Perform 11 successful calculations  
**Expected:** History shows only latest 10

### TC-EDGE-002: DEG vs RAD sin
**Steps:** Toggle RAD; `sin(90)` vs DEG `sin(90)`  
**Expected:** Results differ per mode

### TC-EDGE-003: Backspace after error
**Steps:** Trigger error; press Backspace  
**Expected:** Recoverable input state

### TC-EDGE-004: Clear resets display
**Steps:** Enter partial expression; click clear (⌫ row reset)  
**Expected:** Display `0`; expression empty
