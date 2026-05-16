# Functional Test Cases — Figma page: Style Guide

## Metadata

- **Source:** `docs/figma-tree.md` § Page 4 · `1:2`
- **Stack:** Figma MCP token extraction (`Colors`, `Typography`, `Components`)
- **Top frames:** `85:1397`, `90:1387`, `90:1590`

## Positive Test Cases

### TC-POS-001: Colors frame resolves

**Type:** UI  
**Priority:** High  

**Steps:**

1. Request node `85:1397`; enumerate color styles or rectangles with attached paints via MCP exports.

**Expected result:**

- **Colors** subtree accessible; at least primary brand / surface tokens discoverable programmatically.

---

### TC-POS-002: Typography scale frame

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Resolve `90:1590` **Typography**.
2. List text layers with attributed styles.

**Expected result:**

- Named text styles correlate to display / keypad / caption roles used in **`668:2158`** shell.

---

### TC-POS-003: Components library frame

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Traverse `90:1387` including **COMPONENT_SET Component 3** `210:6570` and **Component 1** `190:4084`.

**Expected result:**

- MCP returns component variants without broken master references after file updates.

---

### TC-POS-004: Element Header instance sample

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Drill **Element Header** instance `90:2866` if still bound.

**Expected result:**

- Overrides listed for QA diff when header pattern updates.

---

### TC-POS-005: Semantic alignment with prototype components

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Locate shared component keys between Style Guide **`Component 3`** subtree and prototype **Design** **`Component 4`** instances (`222:7039`, etc.).

**Expected result:**

- Document lineage or divergence — single source expectation stated for engineering handoff.

---

## Negative Test Cases

### TC-NEG-001: Style removal without deprecation note

**Type:** Negative  
**Priority:** Medium  

**Steps:**

1. Compare historical vs current MCP output for Typography children count.

**Expected result:**

- If count drops sharply, README sync task flagged before release.

---

### TC-NEG-002: Unauthorized style export

**Type:** Negative  
**Priority:** Low  

**Steps:**

1. Attempt style dump using expired PAT.

**Expected result:**

- Hard failure (`403`/`401`), no partially cached PASS.

---

## Edge Cases

### TC-EDGE-001: Duplicate frame name “Header” under Colors

**Type:** Edge  
**Priority:** Low  

**Steps:**

1. Traverse nested **Header** `85:1378` under Colors.

**Expected result:**

- Uniqueness always by ID `85:1378`; scripts must not lookup by bare string **Header**.

---

### TC-EDGE-002: Component set pagination in MCP payloads

**Type:** Edge  
**Priority:** Low  

**Steps:**

1. Request full `90:1387` with API depth capped.

**Expected result:**

- If truncated, escalate depth or targeted `nodes?ids=` — avoid silent omission of **`Component_SET`**.

---

## Logical Validation Cases

### TC-LOG-001: Token → implementation traceability

**Type:** Logical  
**Priority:** High  

**Steps:**

1. For each surfaced color/text style: map to Tailwind/CSS variable plan in codebase (future automated diff).

**Expected result:**

- Any Style Guide orphan without runtime twin recorded as backlog or intentional marketing-only palette.

---

### TC-LOG-002: Cross-page parity with Calculator shell

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Compare button corner radii tokens from **`Component`** pages against **Scientific & Keypad Grid** button frames `668:2172` lineage.

**Expected result:**

- Deltas ≤ agreed tolerance unless responsive scaling documented.

---

---

_Generated using Cursor skill **testcase-generation** · **File:** `page-figma-style-guide.md`_
