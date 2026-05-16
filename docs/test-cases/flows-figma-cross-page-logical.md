# Functional Test Cases — Cross-page logical flows (Figma MCP)

## Metadata

- **Sources:** All pages indexed in `docs/figma-tree.md`, README canonical entry **`668:2158`**, `docs/acceptance-criteria.md`, `docs/prd.md`
- **Audience:** MCP-driven parity checks bridging **Design prototype**, **AI Testing spec**, **Style Guide**, and **Archive**

## Positive test cases

### TC-POS-001: MCP id round-trip README ↔ REST ↔ URL

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Take README entry **`668-2158`** URL form.
2. Convert to **`668:2158`**; call REST `GET /files/:key/nodes?ids=668:2158`.
3. Re-open MCP with same tuple.

**Expected result:**

- All three pathways return **Container** with identical canonical id across stack.

---

### TC-POS-002: Component 4 prototype → Style Guide ancestry

**Type:** Functional  
**Priority:** High  

**Steps:**

1. From **Design** prototype iPhone **`222:7129`**, enumerate **COMPONENT** **`Component 4`** master key.
2. Cross-search Style Guide subtree `90:1387` for matching component key/name.

**Expected result:**

- Lineage documented; if master external to page, MCP notes external library hint for engineers.

---

### TC-POS-003: Typography tokens drive display strings

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Capture text style identifiers from **`90:1590`** (Typography frame).
2. Sample text nodes beneath **Display** subtree **`668:2167`** hierarchy.

**Expected result:**

- Where Figma attaches styles, MCP outputs share same style ids; freestyle text flagged for refactor.

---

## Negative test cases

### TC-NEG-001: Prototype-only feature absent from authoritative shell

**Type:** Negative  
**Priority:** Medium  

**Steps:**

1. Diff flattened button labels between **Prototype col1 iPhone `222:7129`** subtree and **AI Testing Container `668:2158`** subtree.

**Expected result:**

- Any operator present only on prototype flagged — either backlog for implementation **or** deprecated prototype artefact requiring cleanup.

---

### TC-NEG-002: Silent Style Guide drift

**Type:** Negative  
**Priority:** Medium  

**Steps:**

1. Hash sorted color style names from **`85:1397`** weekly.

**Expected result:**

- Hash change triggers optional visual regression scheduling even if filenames stable.

---

## Edge cases

### TC-EDGE-001: Emoji / punctuation in page name `Design (Prototype) 💥`

**Type:** Edge  
**Priority:** Low  

**Steps:**

1. Request page `65:3892` by **id**, not human title string, through automation.

**Expected result:**

- MCP scripts remain stable regardless of emoji in Figma sidebar label change.

---

### TC-EDGE-002: Calculator iteration confusion across pages

**Type:** Edge  
**Priority:** High  

**Steps:**

1. Contrast bounding boxes **`610:2428`**, **`668:1904`**, **`668:2154`** in single batch request.

**Expected result:**

- Non-authoritative calculators marked “reference only”; automation default targets **`668:2158`** only unless scenario demands legacy.

---

## Logical validation cases

### TC-LOG-001: End-to-end design → QA artifact chain

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Start at **Prototype** deepest operator row MCP path.
2. Trace matching control under **`668:2172`**.
3. Locate colour fill token back to **`85:1397`**.
4. Persist mapping row in spreadsheet or JSON fixture consumed by CI.

**Expected result:**

- Full chain reproducible — failure at any hop yields defect category (spec / prototype / tokens).

---

### TC-LOG-002: Scope boundary — Welcome marketing vs Calculator product

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. Confirm no duplicate **Scientific & Keypad Grid** ids under Welcome page `0:1`.

**Expected result:**

- Marketing creatives isolated; keyboard automation never routes through Welcome unintentionally.

---

### TC-LOG-003: Login vs Core calculator MCP routing

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. Simulate dual-target session pulling **`655:94`** Login and **`668:2158`** in one job with namespace separation (`auth` vs `calculator`).

**Expected result:**

- Assertions compartmentalised; auth UI never blocks baseline arithmetic conformance unless epic demands combined flow.

---

### TC-LOG-004: Archive retirement signal

**Type:** Logical  
**Priority:** Low  

**Steps:**

1. Automated diff of flattened layer names **Archive Body `655:484`** vs **Container Calculator Unit `668:2159`** with similarity score.

**Expected result:**

- Score trend informs whether Archive duplicates effort — feeds README maintenance backlog item **Re-sync**.

---

---

_Generated using Cursor skill **testcase-generation** · **File:** `flows-figma-cross-page-logical.md`_
