# Functional Test Cases — History Panel

## Metadata
- **Source:** `docs/figma-tree.md` — node `668:2246`, API `GET/POST/DELETE /api/v1/history`
- **Stack:** React, Express, in-memory store
- **Coverage:** TC-POS-001–006, TC-NEG-001–003, TC-EDGE-001–003, TC-LOG-001–002

## Positive Test Cases

### TC-POS-001: Empty state message
**Type:** UI | **Priority:** High  
**Preconditions:** Fresh session, no calculations  
**Steps:** Open history panel  
**Expected:** "No calculations yet"

### TC-POS-002: Auto-update after calculation
**Type:** Functional | **Priority:** High  
**Steps:** Evaluate `1+1`  
**Expected:** New item: expression `1+1`, result `2`

### TC-POS-003: Expression and result displayed
**Type:** UI | **Priority:** High  
**Steps:** View history item  
**Expected:** Both fields visible per acceptance criteria

### TC-POS-004: Angle mode label
**Type:** UI | **Priority:** Medium  
**Steps:** Calculate in RAD mode  
**Expected:** History item shows `RAD`

### TC-POS-005: GET /api/v1/history
**Type:** API | **Priority:** High  
**Steps:** curl GET after calculations  
**Expected:** JSON array max 10 items with id, expression, result, angleMode, createdAt

### TC-POS-006: Clear button
**Type:** UI | **Priority:** High  
**Steps:** Click Clear  
**Expected:** UI list empty; DELETE API clears server store

## Negative Test Cases

### TC-NEG-001: POST history invalid body
**Type:** API | **Priority:** Medium  
**Steps:** POST missing `result`  
**Expected:** 400 validation error

### TC-NEG-002: Clear empty history
**Type:** API | **Priority:** Low  
**Steps:** DELETE when empty  
**Expected:** Success response; no error

### TC-NEG-003: History after failed calculation
**Type:** Functional | **Priority:** High  
**Steps:** Failed eval (e.g. div by zero)  
**Expected:** No new history entry

## Edge Test Cases

### TC-EDGE-001: 11th calculation eviction
**Type:** Functional | **Priority:** High  
**Steps:** Perform 11 successful calculations  
**Expected:** Oldest removed; count stays 10

### TC-EDGE-002: Long expression in history
**Type:** UI | **Priority:** Medium  
**Steps:** Store 200-char expression  
**Expected:** word-break; panel layout intact

### TC-EDGE-003: Timestamp ordering
**Type:** API | **Priority:** Medium  
**Steps:** Rapid sequential calculations  
**Expected:** Newest first in list

## Logical Test Cases

### TC-LOG-001: History + calculate integration
**Type:** Workflow | **Priority:** High  
**Steps:** POST calculate → GET history  
**Expected:** Latest item matches calculate response

### TC-LOG-002: Clear and recalculate
**Type:** Workflow | **Priority:** Medium  
**Steps:** Clear → new calculation  
**Expected:** Single item in history
