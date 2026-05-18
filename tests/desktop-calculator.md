# Functional Test Cases — Desktop Calculator

## Metadata
- **Source:** `docs/figma-tree.md` — nodes `610:2428`, `668:1904`, `668:2154` (ENTRY)
- **Stack:** React 18, Vite, Express API
- **Viewport:** ≥ 1024px
- **Coverage:** TC-POS-001–008, TC-NEG-001–004, TC-EDGE-001–003, TC-LOG-001–003

## Positive Test Cases

### TC-POS-001: Desktop layout matches Figma Calculator 3
**Type:** UI | **Priority:** High  
**Preconditions:** Viewport 1440px  
**Steps:** Compare layout to Figma `668:2154`  
**Expected:** Calculator unit ~704px; history panel ~288px; purple theme

### TC-POS-002: Header and branding
**Type:** UI | **Priority:** Low  
**Steps:** Load page  
**Expected:** "Calculator" title and subtitle visible

### TC-POS-003: Operator button styling
**Type:** UI | **Priority:** Medium  
**Steps:** Inspect +, −, ×, ÷ buttons  
**Expected:** Distinct accent color vs numeric keys

### TC-POS-004: Equals button emphasis
**Type:** UI | **Priority:** Medium  
**Steps:** Inspect `=` button  
**Expected:** Accent equals color (amber/orange)

### TC-POS-005: Hover states on buttons
**Type:** UI | **Priority:** Medium  
**Steps:** Hover over keys  
**Expected:** Brightness/filter change per CSS

### TC-POS-006: Full keyboard support
**Type:** UI | **Priority:** High  
**Steps:** Use `0-9`, `+`, `-`, `*`, `/`, `(`, `)`, Enter, Backspace, Escape  
**Expected:** All mapped actions work

### TC-POS-007: Sign toggle ±
**Type:** Functional | **Priority:** Medium  
**Steps:** Enter `42` → tap ±  
**Expected:** Expression ends with `-42`

### TC-POS-008: chained operations
**Type:** Functional | **Priority:** High  
**Steps:** `10-3*2` → evaluate  
**Expected:** Result `4` (order of operations)

## Negative Test Cases

### TC-NEG-001: Malformed API request
**Type:** API | **Priority:** High  
**Steps:** POST `/api/v1/calculate` with `{}`  
**Expected:** 400 validation error

### TC-NEG-002: Expression too long
**Type:** API | **Priority:** Low  
**Steps:** POST 600-char expression  
**Expected:** 400 validation error

### TC-NEG-003: Invalid angleMode
**Type:** API | **Priority:** Medium  
**Steps:** POST with `angleMode: "GRAD"`  
**Expected:** 400 validation error

### TC-NEG-004: No stack trace in error response
**Type:** Security | **Priority:** High  
**Steps:** Trigger server error  
**Expected:** Generic message in production; no stack in JSON

## Edge Test Cases

### TC-EDGE-001: Repeated equals
**Type:** Functional | **Priority:** Medium  
**Steps:** `5+3=` then `=` again  
**Expected:** Predictable behavior; no crash

### TC-EDGE-002: MC after M+
**Type:** Functional | **Priority:** Medium  
**Steps:** Store value → MC → MR  
**Expected:** Memory zero; M badge hidden

### TC-EDGE-003: Desktop history scroll
**Type:** UI | **Priority:** Low  
**Steps:** Fill 10 history items  
**Expected:** Panel scrolls internally

## Logical Test Cases

### TC-LOG-001: End-to-end desktop session
**Type:** Workflow | **Priority:** High  
**Steps:** Multiple calcs → review history → clear → new calc  
**Expected:** Full flow without reload

### TC-LOG-002: Figma entry screen parity
**Type:** UI | **Priority:** Medium  
**Steps:** Compare Calculator Unit `668:2159` structure  
**Expected:** Display, mode toggles, keypad rows align

### TC-LOG-003: API health check
**Type:** API | **Priority:** Low  
**Steps:** GET `/health`  
**Expected:** `{ status: "ok" }`
