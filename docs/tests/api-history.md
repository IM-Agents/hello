# Functional Test Cases — API History

## Metadata
- **Endpoints:** GET/POST/DELETE `/api/v1/history`

### TC-POS-001: GET empty history
**Expected:** `{ success: true, items: [], maxItems: 10 }`

### TC-POS-002: POST manual entry
**Body:** `{ "expression": "1+1", "result": "2", "angleMode": "DEG" }`  
**Expected:** 201 with `item.id`

### TC-POS-003: DELETE clears
**Expected:** Subsequent GET returns `[]`

### TC-EDGE-001: FIFO cap
**Steps:** POST 12 items  
**Expected:** GET returns 10 newest
