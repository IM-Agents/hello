# Functional Test Cases — Combined Flows (Cross-surface / Interrelated)

## Metadata

- **Source:** `docs/prd.md`, `docs/api-definitions.md`, `README.md`
- **Stack:** React frontend, Express backend, shared history store
- **Coverage:** evaluate ↔ history ↔ memory ↔ angle mode ↔ keyboard ↔ clear operations

## Positive Test Cases

### TC-POS-101: Evaluate then verify history and GET alignment

**Type:** Integration (UI + API)  
**Priority:** High  
**Preconditions:**

- Fresh server process or cleared history.

**Steps:**

1. `DELETE /api/v1/history`.
2. From UI, evaluate `7*8`.
3. `GET /api/v1/history`.

**Expected result:**

- UI history shows `7*8` / `56`.
- API `items[0]` matches expression/result/angleMode shown in UI.

### TC-POS-102: Memory recall feeds next expression and evaluates

**Type:** UI  
**Priority:** Medium  
**Steps:**

1. Evaluate `5+5` (result `10`).
2. Press `M+` (memory includes 10).
3. Clear; press `MR`; press `+`; `3`; evaluate.

**Expected result:**

- Final evaluation uses recalled memory value in expression (e.g. `10+3` → `13`).

### TC-POS-103: Keyboard and mouse interactions stay in sync

**Type:** UI  
**Priority:** High  
**Steps:**

1. Mouse-click `1`, `+`.
2. Keyboard-type `2`.
3. Press `Enter`.

**Expected result:**

- Expression builds coherently; result `3`.

### TC-POS-104: Angle mode switch mid-session produces different trig results

**Type:** UI / API  
**Priority:** High  
**Steps:**

1. `RAD`: evaluate `sin(PI/2)` → expect `1`.
2. Switch `DEG`: evaluate `sin(90)` → expect `1`.

**Expected result:**

- Both succeed; history records mode per entry.

### TC-POS-105: Clear history resets UI list and API store

**Type:** Integration  
**Priority:** Medium  
**Steps:**

1. Run one successful calculation.
2. Click history “Clear”.
3. `GET /api/v1/history`.

**Expected result:**

- UI empty state; API `items: []`.

## Negative Test Cases

### TC-NEG-101: Backend down shows network error without corrupting prior display text

**Type:** UI  
**Priority:** Medium  
**Preconditions:**

- Stop backend or point `VITE_API_BASE` at invalid host.

**Steps:**

1. Enter `1+1`, evaluate.

**Expected result:**

- Friendly network error message; UI does not blank unexpectedly.

### TC-NEG-102: Invalid second evaluate after correcting mode

**Type:** UI / API  
**Priority:** Low  
**Steps:**

1. Evaluate invalid `sqrt(-1)` (expect error).
2. Switch mode; evaluate valid `sqrt(4)`.

**Expected result:**

- Error clears on success path; latest result `2`.

## Edge Cases

### TC-EDGE-101: Concurrent rapid POSTs last write wins in history ordering

**Type:** API (stress)  
**Priority:** Low  
**Steps:**

1. Fire two near-simultaneous `POST /calculate` with different expressions.

**Expected result:**

- History contains both in deterministic newest-first order without server crash.

### TC-EDGE-102: Large finite result displays in UI

**Type:** UI  
**Priority:** Low  
**Test data:**

- `10^9` or equivalent supported exponent form.

**Steps:**

1. Evaluate.

**Expected result:**

- Readable display; no overflow crash.

## Logical Validation Cases

### TC-LOG-101: Server-side evaluation trust boundary

**Type:** Security / Architecture  
**Priority:** High  
**Steps:**

1. Send only allowed tokens in `expression`.

**Expected result:**

- Parser/evaluator rejects disallowed constructs; no `eval` of arbitrary strings (see `README.md` security notes).

### TC-LOG-102: History reflects successful calculations only

**Type:** Business rule  
**Priority:** Medium  
**Steps:**

1. Trigger a failed evaluation.
2. Inspect history.

**Expected result:**

- Failed runs do not append entries (per current backend behavior).

### TC-LOG-103: Single source of truth for history

**Type:** Architecture  
**Priority:** Medium  
**Steps:**

1. Compare client-only memory versus `GET /history` after multiple tabs hypothetical (if applicable).

**Expected result:**

- Document whether history is server-authoritative; UI refreshes from API after success.

---

_Generated using Cursor skill **testcase-generation** · **File:** `docs/tests/combined-flows.md`_
