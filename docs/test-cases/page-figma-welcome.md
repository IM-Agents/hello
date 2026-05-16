# Functional Test Cases — Figma page: Welcome

## Metadata

- **Source:** `docs/figma-tree.md` (Welcome · `0:1`), PRD §4 / user stories where applicable
- **Stack:** `figma-developer-mcp` / Framelink, Figma REST
- **Frames under test:** About `321:438`, Calcify Cover `329:413`, descendant Frame 52 `321:437`

## Positive Test Cases

### TC-POS-001: Load About canvas via MCP

**Type:** UI  
**Priority:** Medium  
**Preconditions:**

- `FIGMA_API_KEY` configured for MCP; file key `efb6D9WRrFaSemoXuJOMxy`.

**Test data:**

- `nodeIdColon`: `321:438`

**Steps:**

1. Request node `321:438` via MCP (`get_file_nodes` / equivalent).
2. Open deep link https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=321-438 in browser for sanity check.

**Expected result:**

- Response returns a `FRAME` named **About** with non-empty children.
- Browser selection matches MCP node name and id format.

---

### TC-POS-002: Load Calcify Cover canvas

**Type:** UI  
**Priority:** Medium  
**Preconditions:**

- MCP session active for same file key.

**Test data:**

- `nodeIdColon`: `329:413`

**Steps:**

1. Resolve `329:413` via MCP.
2. Compare child count versus prior snapshot in `docs/figma-tree.md` hierarchy (marketing imagery blocks).

**Expected result:**

- Node type is **FRAME** named **Calcify Cover**.
- At least one child frame or vector asset is present under the node.

---

### TC-POS-003: Drill into nested Frame 52 under About

**Type:** UI  
**Priority:** Low  

**Steps:**

1. From parent `321:438`, descend to child `321:437` (Frame 52).
2. Confirm layer names remain ASCII-safe for MCP logging.

**Expected result:**

- Child resolves under **About**; no orphan node warnings from MCP tooling.

---

## Negative Test Cases

### TC-NEG-001: Invalid node id rejects cleanly

**Type:** Functional  
**Priority:** Low  

**Test data:**

- `nodeIdColon`: `0:999999`

**Steps:**

1. Request non-existent synthetic id against file key via REST `GET /v1/files/:key/nodes`.

**Expected result:**

- API returns documented error or empty nodes map; MCP wrapper surfaces non-200 without crashing consumer.

---

### TC-NEG-002: Wrong file key mismatch

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. Call MCP with plausible node id but **incorrect** file key.

**Expected result:**

- Explicit failure (“file not found” / 404); no silent fallback to partial data.

---

## Edge Cases

### TC-EDGE-001: Duplicate-name frames on Welcome

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. List direct children of page `0:1` via API.

**Expected result:**

- Exactly the documented Welcome top-level frames; if Figma duplicates names, MCP still differentiates **by unique id**.

---

### TC-EDGE-002: Depth-limited traversal

**Type:** Functional  
**Priority:** Low  

**Steps:**

1. Fetch file with `depth=1`; attempt to reach `321:437`.

**Expected result:**

- `321:437` absent from shallow response — confirms documented `depth=3` guideline in `docs/figma-tree.md`.

---

## Logical Validation Cases

### TC-LOG-001: Welcome vs product scope

**Type:** Business Logic  
**Priority:** Medium  

**Steps:**

1. Map Welcome frames to README primary calculator features list.

**Expected result:**

- No mandatory calculator controls are required exclusively on Welcome; marketing scope stays out of arithmetic acceptance paths.

---

_Generated using Cursor skill **testcase-generation** · **File:** `page-figma-welcome.md`_
