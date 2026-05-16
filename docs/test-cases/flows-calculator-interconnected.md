# Functional Test Cases — Combined Flows (Calculator App)

## Metadata

- **Source:** `README.md`, `docs/prd.md`, `docs/api-definitions.md` (if implemented), `docs/edge-cases.md`
- **Stack:** React + Node/Express (optional history persistence upgrade)
- **Coverage:** Cross-cutting flows: input + evaluate + history + memory + angle mode + keyboard + API + resilience

---

## Positive Test Cases

### TC-POS-101: End-to-end basic chain with history roll

**Type:** Functional / Logical  
**Priority:** High  
**Preconditions:**

- Fresh session or cleared history

**Steps:**

1. Calculate `2 + 2`
2. Then `× 3` **or** new expression `result × 3` per product chaining rules
3. Repeat until more than 3 entries exist

**Expected result:**

- Each success adds row with expression + result
- History ordering newest-first or oldest-first as designed, max 10

---

### TC-POS-102: Scientific pipeline with constants π and e

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Insert `π` and `e` in valid expressions
2. Evaluate

**Expected result:**

- Numerically sensible results; constants match backend/frontend spec

---

### TC-POS-103: Trig + log combined expression

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. In **DEG**, evaluate `sin(30) + log(100)` (or equivalent syntax)

**Expected result:**

- Combined result correct within tolerance

---

### TC-POS-104: Memory workflow across multiple evaluations

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. `M+` after `10`
2. New calculation `5`, `M+`
3. `MR`, then `MC`, then `MR` again

**Expected result:**

- MR returns `15` before MC; after MC MR returns `0` or empty state per spec

---

### TC-POS-105: Keyboard-only session mirrors pointer session

**Type:** UI / Functional  
**Priority:** High  

**Steps:**

1. Perform same five expressions using only keyboard

**Expected result:**

- Identical results and history as pointer path

---

### TC-POS-106: Responsive transition mid-session preserves state

**Type:** UI / Responsive  
**Priority:** Medium  

**Steps:**

1. Enter partial expression on mobile width
2. Resize to tablet/desktop without reload

**Expected result:**

- Expression/state preserved; no data loss

---

### TC-POS-107: GET `/api/v1/history` returns up to 10 items when server persistence enabled

**Type:** API  
**Priority:** Low  
**Preconditions:**

- Backend persistence implemented

**Steps:**

1. Perform calculations
2. Call GET `/api/v1/history`

**Expected result:**

- Items ≤ 10; schema matches `docs/data-models.md` if defined

---

## Negative Test Cases

### TC-NEG-101: Backend rejects unsafe payload — frontend shows message

**Type:** API / UI  
**Priority:** High  
**Preconditions:**

- Malformed body to `POST /api/v1/calculate` if API used

**Steps:**

1. Send invalid JSON or missing fields
2. Observe UI if wired

**Expected result:**

- 400-class response; friendly UI handling

---

### TC-NEG-102: Network timeout / offline — non-destructive UX

**Type:** Functional  
**Priority:** Medium  
**Preconditions:**

- Throttle or block API in devtools if client-side evaluation fallback absent

**Steps:**

1. Attempt calculation requiring network

**Expected result:**

- Clear offline/toast message; UI usable or graceful degrade per architecture

---

### TC-NEG-103: Concurrent rapid evaluates do not corrupt history order

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. Spam `=` or Enter quickly

**Expected result:**

- Final displayed result consistent; history rows not duplicated inconsistently

---

## Edge Cases

### TC-EDGE-101: Toggle DEG/RAD after result then reuse in new trig

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. Compute trig in DEG
2. Switch to RAD
3. New trig calculation only

**Expected result:**

- Second calculation uses RAD; first history row unchanged

---

### TC-EDGE-102: DELETE `/api/v1/history` clears server list and UI

**Type:** API  
**Priority:** Low  
**Preconditions:**

- Persistence enabled

**Steps:**

1. Populate history
2. DELETE `/api/v1/history`
3. Refresh or refetch

**Expected result:**

- UI list empty; GET returns empty

---

### TC-EDGE-103: Tangent near asymptote

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Evaluate `tan(90°)` in DEG or equivalent undefined case

**Expected result:**

- Defined error or large finite handling per `docs/edge-cases.md` “Tangent near undefined angles”

---

## Logical Validation Cases

### TC-LOG-101: Cross-page consistency (single Container — section focus)

**Type:** UI  
**Priority:** High  

**Steps:**

1. Compare mobile vs desktop framing of same internal state (split history location only)

**Expected result:**

- Single source of truth for expression; only layout differs

---

### TC-LOG-102: State diagram — idle → editing → error → idle

**Type:** Logical  
**Priority:** High  

**Steps:**

1. From idle, enter digits (editing)
2. Force error
3. Recover via Clear digit rule

**Expected result:**

- Transitions match state machine; no orphan modal focus

---

### TC-LOG-103: History row selection (if feature adds “tap to reuse”)

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. Tap history row if implemented

**Expected result:**

- Expression loads into display or behavior per future spec; if not implemented, N/A

---

### TC-LOG-104: Security — no raw eval on server

**Type:** Technical  
**Priority:** High  

**Steps:**

1. Code review or grep backend for unsafe eval

**Expected result:**

- Parser/evaluator is controlled per README security notes

---

### TC-LOG-105: Accessibility — reduced motion respect

**Type:** Accessibility  
**Priority:** Low  

**Steps:**

1. Enable OS “reduce motion”
2. Trigger key feedback animations

**Expected result:**

- Animations disabled or minimized per platform CSS `prefers-reduced-motion`

---

### TC-LOG-106: Form validation N/A — expression validation only

**Type:** Business Logic  
**Priority:** Low  

**Steps:**

1. Confirm no traditional multi-field forms besides expression entry

**Expected result:**

- All validation centralized on expression parser/evaluator paths

---

### TC-LOG-107: Cross-browser smoke (Chrome, Firefox, Safari)

**Type:** Non-functional  
**Priority:** Medium  

**Steps:**

1. Run POS-005 and POS-008 in each browser

**Expected result:**

- Consistent results and layout

---

_Generated using Cursor skill **testcase-generation** · **File:** `flows-calculator-interconnected.md`_
