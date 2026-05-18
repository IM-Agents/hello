# Functional Test Cases — Calculation Engine (Combined / Cross-Page)

## Metadata
- **Source:** `docs/api-definitions.md`, `packages/calculator-core`, `POST /api/v1/calculate`
- **Stack:** Node.js, `@repo/calculator-core`, Express
- **Coverage:** TC-POS-001–010, TC-NEG-001–006, TC-EDGE-001–005, TC-LOG-001–004

## Positive Test Cases

### TC-POS-001: Basic addition
**Test data:** `{ "expression": "2+3", "angleMode": "DEG" }`  
**Expected:** `result: 5`, `success: true`

### TC-POS-002: Multiplication and division
**Test data:** `8/2*3`  
**Expected:** `12`

### TC-POS-003: sin(30) DEG
**Expected:** `0.5` (±1e-10)

### TC-POS-004: cos(60) DEG
**Expected:** `0.5` (±1e-10)

### TC-POS-005: tan(45) DEG
**Expected:** `1` (±1e-10)

### TC-POS-006: log(100)
**Expected:** `2`

### TC-POS-007: ln(e) — use token `e`
**Expected:** `1` (±1e-10)

### TC-POS-008: sqrt(25)
**Expected:** `5`

### TC-POS-009: 2^10
**Expected:** `1024`

### TC-POS-010: Parentheses (2+3)*4
**Expected:** `20`

## Negative Test Cases

### TC-NEG-001: Division by zero
**Test data:** `5/0`  
**Expected:** `errorCode: DIV_BY_ZERO`, status 422

### TC-NEG-002: Empty expression
**Test data:** `{ "expression": "   " }`  
**Expected:** `errorCode: EMPTY`, status 400

### TC-NEG-003: Invalid expression
**Test data:** `5++2`  
**Expected:** `errorCode: INVALID_EXPR`

### TC-NEG-004: sqrt negative
**Test data:** `sqrt(-1)`  
**Expected:** `errorCode: SQRT_NEGATIVE`

### TC-NEG-005: Unknown function
**Test data:** `foo(1)`  
**Expected:** `errorCode: INVALID_EXPR`

### TC-NEG-006: No raw eval (security)
**Type:** Security | **Priority:** High  
**Steps:** Code review evaluator module  
**Expected:** No `eval()` or `Function()` on user input

## Edge Test Cases

### TC-EDGE-001: Unary minus
**Test data:** `-5+3`  
**Expected:** `-2`

### TC-EDGE-002: Nested functions
**Test data:** `sin(cos(0))` — if supported; else `sin(0)`  
**Expected:** Defined behavior per parser

### TC-EDGE-003: RAD vs DEG same expression
**Steps:** sin(90) DEG vs sin(90) RAD  
**Expected:** Different numeric results

### TC-EDGE-004: Modulo
**Test data:** `10%3`  
**Expected:** `1`

### TC-EDGE-005: Pi constant
**Test data:** `pi*2`  
**Expected:** ≈ 6.28318

## Logical Test Cases

### TC-LOG-001: Mobile → API → History flow
**Steps:** UI calculate on mobile → verify API history  
**Expected:** Consistent expression/result across UI and API

### TC-LOG-002: Tablet scientific batch
**Steps:** Run sin, cos, log, sqrt in one session  
**Expected:** All succeed; history capped at 10

### TC-LOG-003: Desktop keyboard + API
**Steps:** Keyboard Enter evaluate → GET history  
**Expected:** Entry persisted server-side

### TC-LOG-004: Core package unit tests
**Steps:** `npm test` in `packages/calculator-core`  
**Expected:** All tests pass
