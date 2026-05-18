# Functional Test Cases — Mobile Calculator (iPhone)

## Metadata
- **Source:** `docs/figma-tree.md` — nodes `222:7129`, `356:3191`, `356:4359`, `360:4751`
- **Stack:** React 18, Vite, REST API
- **Viewport:** max-width 428px
- **Coverage:** TC-POS-001–008, TC-NEG-001–005, TC-EDGE-001–004, TC-LOG-001–003

## Positive Test Cases

### TC-POS-001: Render mobile layout
**Type:** UI | **Priority:** High  
**Preconditions:** App loaded at mobile viewport (375–428px)  
**Steps:** Open `/`  
**Expected:** Calculator unit visible; history panel below or stacked; no horizontal scroll

### TC-POS-002: Tap digits and operators
**Type:** UI | **Priority:** High  
**Steps:** Tap `7`, `+`, `3`, `=`  
**Expected:** Display shows result `10`; history updates

### TC-POS-003: DEG mode trigonometry
**Type:** Functional | **Priority:** High  
**Test data:** `sin(30)`  
**Steps:** Ensure DEG active → enter sin(30) → evaluate  
**Expected:** Result ≈ `0.5`

### TC-POS-004: Memory M+ and MR
**Type:** Functional | **Priority:** Medium  
**Steps:** Enter `5` → M+ → C → MR  
**Expected:** Display shows `5`; M badge visible

### TC-POS-005: Keyboard numeric input
**Type:** UI | **Priority:** High  
**Steps:** Press keys `2`, `*`, `4`, Enter  
**Expected:** Result `8`

### TC-POS-006: Backspace removes last token
**Type:** UI | **Priority:** Medium  
**Steps:** Enter `123` → Backspace twice  
**Expected:** Display shows `1`

### TC-POS-007: Scientific keys visible
**Type:** UI | **Priority:** Medium  
**Steps:** Scroll keypad if needed  
**Expected:** sin, cos, tan, log, ln, π, e buttons present

### TC-POS-008: Clear resets display
**Type:** UI | **Priority:** High  
**Steps:** Enter expression → tap C  
**Expected:** Display `0`; expression empty

## Negative Test Cases

### TC-NEG-001: Division by zero
**Type:** Functional | **Priority:** High  
**Steps:** Enter `5/0` → evaluate  
**Expected:** Error message shown; no crash

### TC-NEG-002: Empty evaluate
**Type:** Functional | **Priority:** High  
**Steps:** Tap `=` with empty input  
**Expected:** Friendly error "Nothing to evaluate"

### TC-NEG-003: Invalid expression
**Type:** Functional | **Priority:** High  
**Steps:** Enter `5++2` → evaluate  
**Expected:** Invalid expression error

### TC-NEG-004: API offline
**Type:** API | **Priority:** Medium  
**Preconditions:** API stopped  
**Steps:** Evaluate `2+2`  
**Expected:** "Unable to reach calculator service"

### TC-NEG-005: Double decimal
**Type:** Functional | **Priority:** Medium  
**Steps:** Enter `1.2.3` → evaluate  
**Expected:** Invalid number format error

## Edge Test Cases

### TC-EDGE-001: Long expression display
**Type:** UI | **Priority:** Low  
**Steps:** Enter 30+ digit expression  
**Expected:** Display truncates/wraps without layout break

### TC-EDGE-002: Rapid button taps
**Type:** UI | **Priority:** Medium  
**Steps:** Tap digits rapidly 20 times  
**Expected:** No duplicate handlers; stable display

### TC-EDGE-003: Rotate viewport
**Type:** UI | **Priority:** Medium  
**Steps:** Rotate device landscape/portrait  
**Expected:** Layout remains usable

### TC-EDGE-004: RAD mode sin(π/2)
**Type:** Functional | **Priority:** Medium  
**Steps:** Switch RAD → evaluate sin(1.5708) approx  
**Expected:** Result ≈ 1

## Logical Test Cases

### TC-LOG-001: Full calculation flow
**Type:** Workflow | **Priority:** High  
**Steps:** Enter `2+3*4` → evaluate → check history  
**Expected:** Result `14`; history item with expression and result

### TC-LOG-002: Mode toggle mid-session
**Type:** Workflow | **Priority:** Medium  
**Steps:** DEG sin(30) → switch RAD → sin(30)  
**Expected:** Different results per mode

### TC-LOG-003: Memory workflow
**Type:** Workflow | **Priority:** Medium  
**Steps:** 10 M+ → 5 M− → MR  
**Expected:** MR shows `5`
