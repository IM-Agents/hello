# Functional Test Cases — Desktop History Panel

## Metadata
- **Source:** README history feature (last 10)
- **Coverage:** History UI + API

### TC-POS-001: Empty state copy
**Expected:** "No calculations yet" and tip box visible

### TC-POS-002: Counter format
**After 3 calcs:** Header shows `(3/10)`

### TC-POS-003: Click history item loads expression
**Steps:** Complete `2+2`; click history row  
**Expected:** Display `4`; expression `2+2`

### TC-POS-004: Clear history button
**Steps:** Clear history  
**Expected:** Empty state; GET `/api/v1/history` returns `[]`

### TC-POS-005: Auto-update after calculate
**Steps:** New successful calc  
**Expected:** New row at top

### TC-NEG-001: Clear with empty history
**Expected:** No error

### TC-EDGE-001: 10 item cap via API
**Steps:** POST 11 history entries or 11 calcs  
**Expected:** Max 10 items returned
