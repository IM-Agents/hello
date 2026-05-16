# Functional Test Cases — Figma page: AI Testing

## Metadata

- **Source:** `docs/figma-tree.md` § Page 3 · `610:1650`, README canonical entry **`668:2158`**
- **Stack:** Figma MCP, UI implementation parity
- **Primary nodes:** Calculator `610:2428`, Calculator 2 `668:1904`, Calculator 3 `668:2154`, **Container** `668:2158`, Login `655:94`

## Positive Test Cases

### TC-POS-001: Canonical README entry resolves

**Type:** UI  
**Priority:** High  

**Steps:**

1. Resolve `668:2158` via MCP.
2. Confirm parent linkage to `Calculator 3` **`668:2154`**.

**Expected result:**

- Node name **Container**; descendants include **Calculator Unit** `668:2159` and **History Panel** `668:2246`.

---

### TC-POS-002: Calculator (legacy shell) navigation header

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Open `610:2463` **Top Header navigation**.

**Expected result:**

- Structural layer exists alongside **Content Area** `610:2429` for layout parity regressions vs final shell.

---

### TC-POS-003: Calculator 2 simplified body

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Traverse `668:1904` → **Content Area** `668:1905`; compare subtree depth to Calculator 3.

**Expected result:**

- Document differences for QA (intermediate fidelity variant); no silent merge with Container spec.

---

### TC-POS-004: Scientific keypad grid MCP coverage

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Drill **Scientific & Keypad Grid** `668:2172`.
2. Collect row containers `668:2173` … `668:2234`.

**Expected result:**

- Rows align with README feature taxonomy (memory row, trig rows, equals row, powers row).

---

### TC-POS-005: Mode toggles and display assembly

**Type:** Functional  
**Priority:** High  

**Steps:**

1. Open **Mode Toggles & Display** `668:2161`.
2. List button frames `668:2163`, `668:2165`.

**Expected result:**

- Dual-toggle structure present for Deg/Rad (or labelled successor) meets user story § angle mode switching.

---

### TC-POS-006: History panel guidance copy

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Locate text under **History Panel** `668:2246` (tip copy `668:2270` per tree export).

**Expected result:**

- Copy explains reload-from-history expectation — aligns with PRD §4.7 behaviour.

---

### TC-POS-007: Login page screen

**Type:** Functional  
**Priority:** Medium  

**Steps:**

1. Resolve `655:404` SECTION → nested **Login Page** `655:94`.

**Expected result:**

- Login screen graph isolated from calculator MCP entry; used only when auth overlay is in scope.

---

### TC-POS-008: Slider component set sanity

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. Open **COMPONENT_SET** `655:461`; count variant axes if exposed via MCP metadata.

**Expected result:**

- Component set parses without MCP errors; variants documented externally if UX depends on sliders.

---

## Negative Test Cases

### TC-NEG-001: Entry confusion with Calculator 3 root vs Container

**Type:** Negative  
**Priority:** Medium  

**Steps:**

1. Point automation only at **`668:2154`** omitting **`668:2158`**.

**Expected result:**

- Extra wrapper layers may skew bounds; README mandates **668:2158** for pixel-true shell — MCP script should warn.

---

### TC-NEG-002: Partial subtree after auth scope change

**Type:** Negative  
**Priority:** Low  

**Steps:**

1. Simulate MCP token lacking file access mid-session.

**Expected result:**

- Clear auth error — no fallback empty canvas treated as PASS.

---

## Edge Cases

### TC-EDGE-001: Extremely nested button leaves

**Type:** Edge  
**Priority:** Medium  

**Steps:**

1. Sample leaf **TEXT** ids under keypad (e.g. `668:2174`).
2. Measure path depth vs MCP depth limits.

**Expected result:**

- Automation still retrieves label strings for golden snapshot tests without exceeding tool recursion caps.

---

### TC-EDGE-002: Glowing ellipse asset layering

**Type:** Edge  
**Priority:** Low  

**Steps:**

1. Inspect `668:2156` ellipse sibling before **Container** `668:2158`.

**Expected result:**

- Decorative layer flagged as non-interactive — excluded from tap-target conformance unless spec changes.

---

## Logical Validation Cases

### TC-LOG-001: AI Testing shells vs README feature completeness

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Map PRD calculator functions to MCP-discoverable buttons under **`668:2158`**.
2. Map optional Login graph `655:94` separately — mark out-of-scope for core calculator QA unless backlog demands.

**Expected result:**

- Mandatory calculator functions reachable from **`668:2158`** subgraph; gaps filed as defects.

---

### TC-LOG-002: Calculator iteration lineage

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. Compare **Calculator** `610:2428`, **Calculator 2** `668:1904`, **Calculator 3** `668:2154` feature density.

**Expected result:**

- **Calculator 3** + **Container** is authoritative for greenfield QA; older frames referenced only for regression breadcrumbs.

---

---

_Generated using Cursor skill **testcase-generation** · **File:** `page-figma-ai-testing.md`_
