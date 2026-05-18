# Functional Test Cases — Desktop Error State

## Metadata
- **Source:** docs/edge-cases.md, Figma planned screen "Desktop — Error State"
- **Coverage:** Error UI + API error codes

## Positive (recovery)

### TC-POS-001: Error clears on new digit
**Steps:** Cause division-by-zero error; press `5`  
**Expected:** Error banner clears; expression starts with `5`

### TC-POS-002: Error expression line preserved
**Steps:** `10÷0` then `=`  
**Expected:** Preview line shows `10/0` or normalized form

## Negative

### TC-NEG-001: Error styling
**Expected:** Main display text color `#ff5546`; class `display-value error`

### TC-NEG-002: API 422 on invalid math
**POST** `/api/v1/calculate` `{ "expression": "10/0", "angleMode": "DEG" }`  
**Expected:** `success: false`, `errorCode: DIVISION_BY_ZERO`

### TC-NEG-003: API 400 on missing expression
**POST** `{}`  
**Expected:** 400 validation error

### TC-NEG-004: Malformed expression
**POST** `{ "expression": "5++2" }`  
**Expected:** 422, `INVALID_EXPRESSION`

### TC-NEG-005: Empty expression
**POST** `{ "expression": "   " }`  
**Expected:** 422, `EMPTY_EXPRESSION`

## Edge

### TC-EDGE-001: Error does not add history
**Steps:** Failed evaluation  
**Expected:** History count unchanged

### TC-EDGE-002: Stack trace not exposed
**Expected:** API body has no `stack` field
