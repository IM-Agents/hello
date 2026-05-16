# Functional Test Cases — Page: Container (Responsive Calculator)

## Metadata

- **Source:** `README.md`, `docs/prd.md`, `docs/acceptance-criteria.md`, `docs/edge-cases.md`, `docs/figma-tree.md`
- **Stack:** React (Vite), REST API optional, Modern browsers
- **Coverage:** UI layout/visual states, responsive behavior, display/history/keypad, accessibility signals on single **Container** page

---

## Positive Test Cases

### TC-POS-001: Mobile layout renders stacked regions

**Type:** UI  
**Priority:** High  
**Preconditions:**

- Viewport width ≤ mobile reference (e.g. 390px)
- Application loaded successfully

**Test data:**

- `viewport`: 390px width

**Steps:**

1. Open calculator at mobile breakpoint
2. Observe order: header/toolbar (if present) → display → keypad → history or history affordance

**Expected result:**

- Primary calculator controls visible without horizontal scroll
- Touch targets meet minimum readable size (design spec ≥ 44×44 logical px)

---

### TC-POS-002: Tablet split layout shows history beside keypad

**Type:** UI  
**Priority:** High  
**Preconditions:**

- Viewport ~768px width

**Test data:**

- `viewport`: 768px width

**Steps:**

1. Resize to tablet breakpoint
2. Complete one valid calculation
3. Observe history and keypad simultaneously visible per design

**Expected result:**

- Two-column (or equivalent) layout matches Figma **Tablet** frame
- History shows expression and result for the calculation

---

### TC-POS-003: Desktop layout preserves max width and spacing

**Type:** UI  
**Priority:** Medium  
**Preconditions:**

- Viewport ≥ 1280px

**Steps:**

1. Open at desktop width
2. Compare padding and column proportions to design tokens (centered container optional)

**Expected result:**

- No excessive stretch of display text; consistent gutters
- History and keypad both visible (unless design specifies collapse — then match spec)

---

### TC-POS-004: Numeric keys update display

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Tap `1`, `2`, `3` in sequence

**Expected result:**

- Display reflects entered digits in correct order without dropping characters

---

### TC-POS-005: Basic arithmetic evaluation

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Enter `12 + 3` then trigger evaluate (`=` or Enter)

**Expected result:**

- Result `15` shown clearly
- New history row: expression and result

---

### TC-POS-006: Operator keys visually distinct from numeric keys

**Type:** UI  
**Priority:** High  

**Steps:**

1. Inspect operator vs numeric buttons (color, weight, or style)

**Expected result:**

- Operators are distinguishable from numbers per acceptance criteria

---

### TC-POS-007: Hover and active feedback on buttons

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Hover pointer-capable device over keys
2. Press and hold a key

**Expected result:**

- Visible hover and active/pressed states (where applicable per platform)

---

### TC-POS-008: DEG mode trig evaluation

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Ensure mode is **DEG**
2. Compute `sin(90)` or equivalent per input model

**Expected result:**

- Result consistent with degree interpretation (e.g. `1` or acceptable float tolerance)

---

### TC-POS-009: RAD mode trig evaluation

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Switch to **RAD**
2. Compute `sin(π/2)` or equivalent

**Expected result:**

- Result consistent with radian interpretation

---

### TC-POS-010: Memory M+ then MR recall

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Evaluate `5`, press `M+`, clear or new entry per spec, press `MR`

**Expected result:**

- Recalled memory matches accumulated value per rules
- No UI crash

---

## Negative Test Cases

### TC-NEG-001: Division by zero surfaces friendly error

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Enter `1 / 0` and evaluate

**Expected result:**

- User-friendly error message
- UI remains responsive; no uncaught exception exposed

---

### TC-NEG-002: Square root of negative number

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Enter `√(-1)` or equivalent valid path to sqrt of negative

**Expected result:**

- Clear error; no crash

---

### TC-NEG-003: Log of non-positive number

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Evaluate `log(0)` and separately `ln(-2)` per supported operations

**Expected result:**

- Readable error for domain violations

---

### TC-NEG-004: Malformed or invalid expression

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Enter sequences that parser rejects (e.g. repeated operators per product rules)
2. Evaluate

**Expected result:**

- Friendly validation or error
- No silent wrong answer

---

### TC-NEG-005: Empty evaluation attempt

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Without meaningful input, press `=` / Enter

**Expected result:**

- No crash; predictable behavior (error or no-op) per spec

---

### TC-NEG-006: Keyboard unsupported key does not break state

**Type:** UI / Functional  
**Priority:** Medium  

**Steps:**

1. Focus app and press unsupported keys (e.g. letters if not mapped)

**Expected result:**

- State remains stable or keys ignored safely

---

### TC-NEG-007: Rapid repeated taps do not desync display

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Rapidly tap digits and operators

**Expected result:**

- Display and internal state remain consistent; no duplicated phantom characters beyond debounce rules

---

## Edge Cases

### TC-EDGE-001: Multiple decimal points in one token rejected or normalized

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Attempt `1..2` or `3.4.5`

**Expected result:**

- Invalid input prevented or normalized per `docs/edge-cases.md`

---

### TC-EDGE-002: Trailing operator before evaluate

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Enter `5 +` then evaluate

**Expected result:**

- Defined behavior: error or auto-normalization; no crash

---

### TC-EDGE-003: History capped at 10 entries

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Perform 11 successful distinct calculations

**Expected result:**

- Oldest drops; at most 10 visible

---

### TC-EDGE-004: Angle mode switch mid-input

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Partial expression with trig pending; toggle DEG/RAD; complete

**Expected result:**

- Behavior matches documented rule; no silent corruption (`docs/edge-cases.md`)

---

### TC-EDGE-005: Very large numbers / overflow presentation

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. Multiply large values until non-finite or overflow messaging

**Expected result:**

- Readable message or `Infinity` handling per product choice; no broken layout

---

### TC-EDGE-006: Small screens preserve tappable regions

**Type:** UI  
**Priority:** High  

**Steps:**

1. Use shortest mobile height viewport
2. Attempt to tap corner keys

**Expected result:**

- Keys remain reachable; acceptable scroll if design allows

---

## Logical Validation Cases

### TC-LOG-001: Keyboard Enter matches `=` evaluate

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Enter valid expression via keyboard
2. Press Enter

**Expected result:**

- Same outcome as clicking `=`

---

### TC-LOG-002: Keyboard Backspace removes last token/char per model

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Type multi-character number and operators
2. Press Backspace repeatedly

**Expected result:**

- Matches acceptance: “last input token or character” rule

---

### TC-LOG-003: After error, next input recovers predictably

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. Provoke error state
2. Press Clear or digit per recovery rule

**Expected result:**

- Predictable reset; no stuck error overlay unless designed

---

### TC-LOG-004: Successful calculation appends history then allows new expression

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Complete calculation
2. Start new digits without reload

**Expected result:**

- Display clears or appends per clear semantics; history retains previous row

---

### TC-LOG-005: API error (if REST used) degrades gracefully

**Type:** API / UI  
**Priority:** Medium  

**Preconditions:**

- Backend returns 4xx/5xx for `/api/v1/calculate`

**Steps:**

1. Submit calculation that triggers API error path

**Expected result:**

- User-facing message; no stack trace; optional retry

---

### TC-LOG-006: Focus order follows visual keypad layout

**Type:** Accessibility  
**Priority:** High  

**Steps:**

1. Tab through interactive elements

**Expected result:**

- Logical order per `docs/edge-cases.md` keyboard focus guidance

---

### TC-LOG-007: Color contrast meets WCAG AA for text on keys

**Type:** Accessibility  
**Priority:** Medium  

**Steps:**

1. Sample operator vs numeric key text/background per design tokens

**Expected result:**

- Contrast acceptable for primary labels

---

_Generated using Cursor skill **testcase-generation** · **File:** `page-container-responsive.md`_
