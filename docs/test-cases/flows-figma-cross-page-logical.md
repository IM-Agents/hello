# Functional Test Cases — Combined Logical Flows (Cross-Figma-Page)

## Metadata

- **Source:** `docs/figma-tree.md`, `README.md`, `docs/prd.md`, `docs/test-cases/page-container-responsive.md`, `docs/test-cases/flows-calculator-interconnected.md`
- **Stack:** Figma MCP + React + optional REST API
- **Coverage:** Interrelated flows spanning **Style Guide**, **Design (Prototype)**, **AI Testing**, **Welcome**, **Archive**

---

## Positive Test Cases

### TC-XPG-POS-001: Token → prototype → shipping Container alignment

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Pick primary button fill token from **Style Guide** (`85-1397` subtree)
2. Verify same token applied on **Design (Prototype)** iPhone frame (`222-7129` lineage)
3. Verify **AI Testing** Container (`668-2158`) matches chosen theme variant

**Expected result:**

- Single coherent theme story from tokens through prototype to handoff frame

---

### TC-XPG-POS-002: Responsive story spans Design prototype + implementation breakpoints

**Type:** UI / Logical  
**Priority:** High  

**Steps:**

1. From **Design (Prototype)**, capture mobile (`222-7129`) and tablet (`210-7038`) structural differences
2. Execute `page-container-responsive.md` TC-POS-001 through TC-POS-003 on implemented app

**Expected result:**

- Behavior matches prototype intent at mobile and tablet widths

---

### TC-XPG-POS-003: MCP regression sweep across all canvas roots

**Type:** Tooling  
**Priority:** Medium  

**Steps:**

1. For each row in `docs/figma-tree.md` **Page index**, call MCP file/node resolution (`0-1`, `65-3892`, `610-1650`, `1-2`, `655-482`)

**Expected result:**

- All five canvases remain accessible; file key unchanged

---

## Negative Test Cases

### TC-XPG-NEG-001: Style Guide component swap without prototype update

**Type:** Process  
**Priority:** Medium  

**Steps:**

1. Simulate rename/removal of **Component 1** variant in Style Guide

**Expected result:**

- CI or design review catches orphan references in prototype pages before code merge

---

### TC-XPG-NEG-002: Marketing Welcome treated as functional calculator spec

**Type:** Business Logic  
**Priority:** Low  

**Steps:**

1. Attempt to derive keypad behavior only from **Welcome** frames

**Expected result:**

- Blocked; authoritative spec remains README + AI Testing Container + acceptance docs

---

## Edge Cases

### TC-XPG-EDGE-001: Login section exists on AI Testing but V1 scope excludes auth

**Type:** Business Logic  
**Priority:** Medium  

**Steps:**

1. Confirm PRD out-of-scope list vs Login frames (`655-404`)

**Expected result:**

- Cross-page tests mark Login **N/A** for calculator MVP automation unless scope changes

---

### TC-XPG-EDGE-002: Archive layouts resurrected after Container updates

**Type:** Logical  
**Priority:** Low  

**Steps:**

1. After Container redesign, compare against Archive snapshots for intentional breaking changes

**Expected result:**

- Changelog records intentional deltas (spacing, taxonomy, components)

---

## Logical Validation Cases

### TC-XPG-LOG-001: End-to-end design traceability matrix

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Build trace grid: Feature (README) → Style Guide node → Prototype frame node → AI Testing node → Automated TC id (`page-container-responsive`, `flows-calculator-interconnected`)

**Expected result:**

- No orphan requirements; each README feature maps to ≥1 design node and ≥1 TC

---

### TC-XPG-LOG-002: MCP node-id drift detection

**Type:** Tooling  
**Priority:** High  

**Steps:**

1. On schedule or after Figma publishes, diff API file structure vs committed `docs/figma-tree.md`

**Expected result:**

- Drift triggers update task (README checklist item 1)

---

### TC-XPG-LOG-003: Combined calculator functional + design parity run order

**Type:** Logical  
**Priority:** Medium  

**Recommended order:**

1. MCP canvas health (`TC-XPG-POS-003`)
2. Token alignment (`TC-XPG-POS-001`)
3. Responsive functional suite (`page-container-responsive.md`)
4. Cross-cutting calculator flows (`flows-calculator-interconnected.md`)

**Expected result:**

- Fail fast on tooling/design mismatches before deep functional assertions

---

_Generated as **combined logical** suite · complements page-wise `page-figma-*.md` files_
