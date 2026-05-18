# Functional Test Cases — Error States (Combined)

## Metadata
- **Source:** `docs/edge-cases.md`, `docs/acceptance-criteria.md`
- **Figma planned screens:** Error variants (duplicate from `668:2154`)
- **Coverage:** TC-POS-001–003, TC-NEG-001–008, TC-EDGE-001–004, TC-LOG-001–003

## Positive Test Cases

### TC-POS-001: Error clears on new input
**Type:** UI | **Priority:** High  
**Steps:** Trigger error → tap digit  
**Expected:** Error cleared; new input shown

### TC-POS-002: Error color on display
**Type:** UI | **Priority:** Medium  
**Steps:** Trigger division by zero  
**Expected:** Display uses error styling (red text)

### TC-POS-003: UI remains interactive after error
**Type:** UI | **Priority:** High  
**Steps:** After error, tap C and new calculation  
**Expected:** Normal operation resumes

## Negative Test Cases

### TC-NEG-001: Division by zero message
**Expected:** User-friendly message; not "Infinity"

### TC-NEG-002: Invalid expression message
**Test data:** `*)`  
**Expected:** Readable validation message

### TC-NEG-003: Empty evaluate
**Expected:** "Nothing to evaluate"

### TC-NEG-004: sqrt negative message
**Expected:** Cannot take square root of negative number

### TC-NEG-005: log(0) and log(-1)
**Expected:** Invalid input for log

### TC-NEG-006: API 500 sanitized
**Expected:** No internal stack in JSON response

### TC-NEG-007: Malformed decimals
**Test data:** `1.2.3`  
**Expected:** Invalid number format

### TC-NEG-008: Consecutive operators
**Test data:** `5++2`  
**Expected:** Invalid expression

## Edge Test Cases

### TC-EDGE-001: Backspace after error
**Steps:** Error state → Backspace  
**Expected:** No crash; predictable recovery

### TC-EDGE-002: Escape clears
**Steps:** Error → press Escape  
**Expected:** Cleared state

### TC-EDGE-003: Error during loading
**Steps:** Slow network mock → double Enter  
**Expected:** No duplicate submissions / race

### TC-EDGE-004: Overflow result
**Test data:** Very large exponent  
**Expected:** Finite error or scientific notation; no hang

## Logical Test Cases

### TC-LOG-001: Error recovery workflow
**Steps:** 5/0 → C → 2+2 → =  
**Expected:** Final result 4; history only successful calc

### TC-LOG-002: Cross-page error consistency
**Steps:** Same invalid expr on mobile, tablet, desktop  
**Expected:** Identical error messages

### TC-LOG-003: API + UI error code alignment
**Steps:** Compare `errorCode` from API with UI message  
**Expected:** DIV_BY_ZERO, INVALID_EXPR, SQRT_NEGATIVE, EMPTY mapped correctly
