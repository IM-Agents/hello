# Functional Test Cases — Figma Page 1 · Container (Calculator App Responsive)

## Metadata

- **Figma reference:** [Calculator App (Responsive) — Container](https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158) (`node-id=668-2158`, API node `668:2158`)
- **Source:** `docs/figma-tree.md`, `docs/prd.md`, `docs/acceptance-criteria.md`
- **Stack:** React (Vite), Tailwind CSS, Express (Node.js), REST `/api/v1/*`
- **Coverage:** layout shell, primary display, keypad zones, history panel placement, responsive behavior vs single-page Figma shell

## Positive Test Cases

### TC-POS-001: Container layout loads without horizontal scroll on mobile width

**Type:** UI  
**Priority:** High  
**Preconditions:**

- Frontend dev server running; viewport width 375px (mobile).

**Test data:**

- Initial route: `/`

**Steps:**

1. Open the app at mobile width.
2. Observe the main calculator column and history aside (stacked vertically).

**Expected result:**

- No unintended horizontal scrollbar on the primary viewport.
- Touch targets remain visually separated per grid spacing.

### TC-POS-002: Display region shows built expression before evaluate

**Type:** UI  
**Priority:** High  
**Preconditions:**

- App loaded.

**Test data:**

- Button sequence: `2`, `+`, `3`

**Steps:**

1. Tap `2`, `+`, `3` in order.
2. Read the display string.

**Expected result:**

- Display reads `2+3` (or equivalent contiguous expression).

### TC-POS-003: Operator buttons are visually distinct from numeric keys

**Type:** UI  
**Priority:** Medium  
**Preconditions:**

- App loaded; light-on-dark theme visible.

**Steps:**

1. Compare styling classes / colors of an operator key and a numeric key.

**Expected result:**

- Operator keys use accent styling; numeric keys use neutral numeric styling (matches acceptance criteria).

### TC-POS-004: History aside lists latest successful calculation first

**Type:** UI / API  
**Priority:** High  
**Preconditions:**

- Backend reachable; history empty or cleared.

**Test data:**

- Expression `5+5`, then `3+1`

**Steps:**

1. Evaluate `5+5`.
2. Evaluate `3+1`.
3. Open / scroll history panel.

**Expected result:**

- Top history row corresponds to `3+1`; second row to `5+5`.

### TC-POS-005: DEG / RAD toggle updates API payloads

**Type:** UI / API  
**Priority:** High  
**Preconditions:**

- Network tab or API logging enabled.

**Steps:**

1. Select `DEG`; evaluate `sin(90)`.
2. Select `RAD`; evaluate `sin(PI/2)`.

**Expected result:**

- Requests include `angleMode: "DEG"` then `angleMode: "RAD"` with results `1` (within float tolerance).

### TC-POS-006: Focus ring visible on keyboard-focused control

**Type:** Accessibility  
**Priority:** Medium  
**Preconditions:**

- Desktop browser; Tab navigation enabled.

**Steps:**

1. Tab until a keypad button receives focus.
2. Observe focus styling.

**Expected result:**

- Visible focus ring (contrast-compliant) on focused interactive control.

## Negative Test Cases

### TC-NEG-001: Division by zero surfaces friendly error

**Type:** API / UI  
**Priority:** High  
**Preconditions:**

- API available.

**Test data:**

- `expression`: `10/0`

**Steps:**

1. POST `/api/v1/calculate` with the payload.
2. If via UI, enter `10/0` and evaluate.

**Expected result:**

- HTTP `422` from API; `errorCode` `DIVISION_BY_ZERO`; UI shows user-readable message, no stack trace.

### TC-NEG-002: Square root of negative rejected

**Type:** API  
**Priority:** High  
**Test data:**

- `expression`: `sqrt(-4)`

**Steps:**

1. POST calculate.

**Expected result:**

- `422` with `NEGATIVE_SQRT` (or equivalent documented code).

### TC-NEG-003: Invalid log domain rejected

**Type:** API  
**Priority:** Medium  
**Test data:**

- `log(-10)`, `ln(0)`

**Steps:**

1. POST each expression.

**Expected result:**

- Non-success response with `INVALID_LOG_INPUT` (or documented code).

### TC-NEG-004: Unsupported characters rejected

**Type:** API  
**Priority:** Medium  
**Test data:**

- `expression`: `alert(1)` or include `;` / `` ` `` if disallowed

**Steps:**

1. POST calculate.

**Expected result:**

- `422` / validation failure per implementation; no code execution.

### TC-NEG-005: Empty evaluation does not crash UI

**Type:** UI  
**Priority:** High  
**Steps:**

1. Clear display.
2. Press evaluate (`=`).

**Expected result:**

- Inline error such as “Nothing to evaluate”; no uncaught exception / white screen.

## Edge Cases

### TC-EDGE-001: Long expression wraps in display without layout break

**Type:** UI  
**Priority:** Low  
**Test data:**

- Long concatenation of digits and `+`.

**Steps:**

1. Enter a 40+ character expression.
2. Observe display container.

**Expected result:**

- Text wraps (`break-all` / scroll) without breaking page layout.

### TC-EDGE-002: History obeys maximum length (10)

**Type:** API  
**Priority:** Medium  
**Steps:**

1. Perform 11 successful distinct calculations.
2. GET `/api/v1/history`.

**Expected result:**

- At most 10 items returned; oldest evicted.

### TC-EDGE-003: Rapid sequential evaluates last result wins

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Evaluate `1+1`, immediately `2+2` without pause.

**Expected result:**

- Display shows final correct result; history order consistent.

### TC-EDGE-004: Percent postfix normalizes per backend rules

**Type:** API  
**Priority:** Low  
**Test data:**

- `50%`, `10*50%` (if supported by grammar)

**Steps:**

1. POST calculate for each.

**Expected result:**

- Documented numeric outcome or controlled error (no crash).

## Logical Validation Cases

### TC-LOG-001: Visual hierarchy matches Figma “Container” intent

**Type:** Business / Design QA  
**Priority:** Medium  
**Steps:**

1. Compare spacing, display prominence, and keypad grouping against Figma Container frame.

**Expected result:**

- No conflicting layout patterns (e.g., history mistakenly primary on desktop) relative to design intent documented in `docs/figma-tree.md`.

### TC-LOG-002: Responsive breakpoint stacks history under calculator on narrow viewports

**Type:** UI  
**Priority:** High  
**Steps:**

1. Resize from desktop to mobile width.

**Expected result:**

- Calculator remains usable first; history follows in vertical order (matches responsive goal).

---

_Generated using Cursor skill **testcase-generation** · **File:** `docs/tests/figma-page-1-container.md`_
