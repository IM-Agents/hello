# Functional Test Cases — Figma page: Archive

## Metadata

- **Source:** `docs/figma-tree.md` § Page 5 · `655:482`
- **Purpose:** Regression / migration reference — **not** default MCP entry for new implementation
- **Top frames:** `655:483`, `655:540`

## Positive Test Cases

### TC-POS-001: Primary archive layout resolves

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. MCP-fetch `655:483` → child **Body** `655:484`.

**Expected result:**

- Frame hierarchy persists for historical diffing when reconciling archived vs **AI Testing** shells.

---

### TC-POS-002: Alternate archive replicate layout

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. MCP-fetch `655:540` → **App** `655:541`.

**Expected result:**

- Separate experiment graph documented; linkage to Calculator 3 recorded if intentional fork.

---

## Negative Test Cases

### TC-NEG-001: Archive mistaken for canonical entry

**Type:** Negative  
**Priority:** Medium  

**Steps:**

1. Attempt to drive pixel QA from **`655:483`** ignoring README **`668:2158`** guidance.

**Expected result:**

- Test harness rejects mismatch when `canonicalEntry` assertion enabled.

---

### TC-NEG-002: Deleted archive without doc update

**Type:** Negative  
**Priority:** Low  

**Steps:**

1. Simulate missing node id `655:483` via `/nodes` lookup.

**Expected result:**

- `docs/figma-tree.md` flagged stale; onboarding agents must revisit Archive section removal.

---

## Edge Cases

### TC-EDGE-001: Duplicate “Replicate Figma Design Layout” naming

**Type:** Edge  
**Priority:** Low  

**Steps:**

1. Resolve both duplicates solely by **`node-id`**.

**Expected result:**

- No ambiguous selection — tests always pass explicit ids (`655:483` vs `655:540`), never bare names.

---

## Logical Validation Cases

### TC-LOG-001: Sunset criteria for archive canvases

**Type:** Logical  
**Priority:** Low  

**Steps:**

1. If **AI Testing Container** **`668:2158`** superseded all behaviours from Archive subtree, propose deletion ticket.

**Expected result:**

- Decision recorded — either keep for legacy QA or prune with changelog line in README Agent checklist.

---

---

_Generated using Cursor skill **testcase-generation** · **File:** `page-figma-archive.md`_
