# Functional Test Cases — Figma page: Design (Prototype)

## Metadata

- **Source:** `docs/figma-tree.md` § Page 2 · `65:3892`
- **Stack:** Figma MCP, responsive QA (iPhone / iPad)
- **Breakpoints:** Four column groups with paired **iPhone 14 Plus** + **iPad Mini 6 (8.3)** frames

## Positive Test Cases

### TC-POS-001: Resolve column 1 iPhone prototype

**Type:** UI  
**Priority:** High  

**Test data:**

- `nodeIdColon`: `222:7129`

**Steps:**

1. Open MCP details for `222:7129`.
2. Verify direct child **`Component 4`** instance (`222:7039`) exists.

**Expected result:**

- Frame name **iPhone 14 Plus**; instance master link resolvable via MCP metadata.

---

### TC-POS-002: Resolve column 1 iPad prototype

**Type:** UI  
**Priority:** High  

**Test data:**

- `nodeIdColon`: `210:7038`

**Steps:**

1. Repeat structure check for **`Component 4`** (`210:6933`).

**Expected result:**

- Frame name **iPad Mini 6 (8.3)**; mirrored component slot vs iPhone column (visual hierarchy parity).

---

### TC-POS-003–008: Columns 2–4 device pairing

**Type:** UI  
**Priority:** High  

**Pairs:** `(356:3191 ↔ 356:3193)`, `(356:4359 ↔ 356:4361)`, `(360:4751 ↔ 360:4753)`

**Steps:** (repeat per pair)

1. Resolve iPhone frame id → note first **INSTANCE** child.
2. Resolve linked iPad frame id → note first **INSTANCE** child.

**Expected result:**

- Each pair exposes **COMPONENT** **`Component 4`** instance lineage (names consistent).

---

### TC-POS-009: Header text consistency

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Inspect text node under each **Header** frame (`90:3248`, `356:3186`, `356:4354`, `360:4746`).

**Expected result:**

- All read **Design (Prototype)** (or updated title consistently across columns after redesign).

---

## Negative Test Cases

### TC-NEG-001: Stale breakpoint column reference

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. Use documented id from this file after hypothetical Figma regrouping without re-sync.

**Expected result:**

- CI or manual MCP check fails visibly — prompts update to `docs/figma-tree.md`.

---

### TC-NEG-002: Selecting label frame instead of device shell

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Open **Label** frame `90:3257` expecting playable calculator sizing.

**Expected result:**

- Node only contains typography for **iPhone 14 Plus** label — MCP consumer must target sibling device frame ids from table, not Label ids.

---

## Edge Cases

### TC-EDGE-001: Aspect ratio deltas

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Compare absolute bounds of `222:7129` vs `210:7038` via MCP geometry.

**Expected result:**

- iPad frame width > iPhone frame width; confirms responsive intent.

---

### TC-EDGE-002: Fourth column truncation

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Verify deepest column headers exist (`360:4745`) even when canvas zoom differs in Figma client.

**Expected result:**

- Node resolves identically regardless of viewport — id-based addressing only.

---

## Logical Validation Cases

### TC-LOG-001: Four-column parallelism

**Type:** Business Logic  
**Priority:** Medium  

**Steps:**

1. Assert each column has **Header**, **two Labels**, **iPhone**, **iPad** quintuple.

**Expected result:**

- Documented matrix complete; gaps indicate design debt to record in README sync task.

---

### TC-LOG-002: Component 4 linkage to acceptance criteria

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Trace **Component 4** master to calculator affordances enumerated in `docs/acceptance-criteria.md`.

**Expected result:**

- Every primary operator region in AC maps to inspectable MCP subtree (digits, trig, memory, history affordances).

---

---

_Generated using Cursor skill **testcase-generation** · **File:** `page-figma-design-prototype.md`_
