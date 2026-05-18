# Functional Test Cases — API Calculate

## Metadata
- **Endpoint:** `POST /api/v1/calculate`

### TC-POS-001: Valid arithmetic
**Body:** `{ "expression": "2+3", "angleMode": "DEG" }`  
**Expected:** 200, `success: true`, `result: 5`

### TC-POS-002: Trig DEG
**Body:** `{ "expression": "sin(30)", "angleMode": "DEG" }`  
**Expected:** `result: 0.5`

### TC-POS-003: Trig RAD
**Body:** `{ "expression": "sin(1.5708)", "angleMode": "RAD" }`  
**Expected:** ~1

### TC-POS-004: Timestamp present
**Expected:** ISO `timestamp` field

### TC-NEG-001: Division by zero
**Body:** `{ "expression": "10/0" }`  
**Expected:** 422, `DIVISION_BY_ZERO`

### TC-NEG-002: Invalid angle mode
**Body:** `{ "expression": "1+1", "angleMode": "GRAD" }`  
**Expected:** 400 validation

### TC-EDGE-001: Expression max length
**Body:** 501 char expression  
**Expected:** 400 validation
