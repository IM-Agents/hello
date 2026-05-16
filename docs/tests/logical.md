# Functional Test Cases — Logical (Rules, State, Decisions)

## Metadata

- **Source:** `docs/prd.md`, `docs/edge-cases.md`, `docs/data-models.md` (if present), `docs/api-definitions.md`
- **Stack:** Calculator domain logic (expression → numeric result), REST API contracts
- **Coverage:** error taxonomy, angle semantics, memory semantics, normalization, idempotency of clears

## Positive Test Cases

### TC-POS-L01: Normalization maps constants consistently

**Type:** Business Logic / API  
**Priority:** High  
**Test data:**

- `PI*2` with `DEG`
- Replace `π` if UI sends unicode (API preprocess)

**Steps:**

1. POST calculate for supported constant forms.

**Expected result:**

- Finite numeric result matching `2π` within tolerance.

### TC-POS-L02: Log base semantics

**Type:** Business Logic  
**Priority:** High  
**Test data:**

- `log(100)` → base 10 → `2`
- `ln(E)` → natural → `1`

**Steps:**

1. POST both.

**Expected result:**

- Results match definitions in PRD § logarithmic functions.

### TC-POS-L03: Exponent operator associates per parser rules

**Type:** Business Logic  
**Priority:** Medium  
**Test data:**

- `2^3^2` — right-associative exponentiation → **512** (`2^(3^2)`).

**Steps:**

1. POST `2^3^2` to `/api/v1/calculate`.

**Expected result:**

- `result` is `512` (expr-eval `^` is right-associative).

### TC-NEG-L01: Malformed parentheses

**Type:** Business Logic  
**Priority:** Medium  
**Test data:**

- `(1+2`, `1+)`

**Steps:**

1. POST calculate.

**Expected result:**

- Controlled `INVALID_EXPRESSION` (or equivalent); no throw to client as 500.

### TC-NEG-L02: Missing expression field

**Type:** API Contract  
**Priority:** High  
**Steps:**

1. POST `/api/v1/calculate` with `{}`.

**Expected result:**

- `400` with structured error per implementation.

## Edge Cases

### TC-EDGE-L01: Signed number after operator

**Type:** Business Logic  
**Priority:** Medium  
**Test data:**

- `5+-3`

**Steps:**

1. POST calculate.

**Expected result:**

- `2` or documented rejection; must be stable across UI and API.

### TC-EDGE-L02: Only whitespace after trim

**Type:** Business Logic  
**Priority:** Medium  
**Test data:**

- `"   "`

**Steps:**

1. POST calculate.

**Expected result:**

- `EMPTY_INPUT` class error.

### TC-EDGE-L03: Memory operations with non-numeric display

**Type:** UI Logic  
**Priority:** Low  
**Preconditions:**

- Display contains `1+` (incomplete).

**Steps:**

1. Press `M+`.

**Expected result:**

- Documented behavior (e.g., uses `0` fallback or blocks action); no NaN memory.

## Logical Validation Cases

### TC-LOG-L01: Error code mapping completeness

**Type:** Traceability  
**Priority:** High  
**Steps:**

1. Trigger `DIVISION_BY_ZERO`, `NEGATIVE_SQRT`, `INVALID_LOG_INPUT`, `INVALID_EXPRESSION`, `EMPTY_INPUT`.

**Expected result:**

- Each maps to documented `errorCode` values from `docs/api-definitions.md`.

### TC-LOG-L02: Idempotent history clear

**Type:** State machine  
**Priority:** Low  
**Steps:**

1. `DELETE /api/v1/history` twice.

**Expected result:**

- Second call still success; history remains empty.

### TC-LOG-L03: Angle mode does not mutate stored memory value

**Type:** State / Isolation  
**Priority:** Medium  
**Steps:**

1. Store `10` in memory via `M+`.
2. Toggle `RAD`/`DEG`.
3. Recall memory.

**Expected result:**

- Memory value unchanged by mode toggle; only trig interpretation changes.

### TC-LOG-L04: Deterministic ordering of history eviction

**Type:** Data structure  
**Priority:** Medium  
**Steps:**

1. Insert 11 items with distinct timestamps/expressions.

**Expected result:**

- Oldest removed; order newest-first stable.

### TC-LOG-L05: API success payload fields present

**Type:** Contract  
**Priority:** High  
**Steps:**

1. Successful `POST /calculate`.

**Expected result:**

- Payload includes `success`, `expression`, `normalizedExpression`, `result`, `errorCode`, `message`, `timestamp` per `docs/api-definitions.md`.

---

_Generated using Cursor skill **testcase-generation** · **File:** `docs/tests/logical.md`_
