# Functional Test Cases — Figma Page: Style Guide

## Metadata

- **Source:** `docs/figma-tree.md`, `docs/design/EXECUTION_PLAN.md`
- **Stack:** Design tokens, component library, MCP
- **Coverage:** Canvas **Style Guide** (`1-2`) — **Colors** (`85-1397`), **Components** (`90-1387`), **Typography** (`90-1590`)

---

## Positive Test Cases

### TC-STG-POS-001: Colors frame resolves for token extraction

**Type:** UI  
**Priority:** High  

**Steps:**

1. Open node `85-1397`
2. Enumerate color styles / variables exposed

**Expected result:**

- Token names align with suggested names in `EXECUTION_PLAN` § Design tokens where applicable

---

### TC-STG-POS-002: Components frame exposes calculator-related sets

**Type:** UI  
**Priority:** High  

**Steps:**

1. Open node `90-1387`
2. Locate calculator component sets (**Component 1** mobile, **Component 3** tablet per layer naming)

**Expected result:**

- Variant matrix (theme × equal key) documented for implementation

---

### TC-STG-POS-003: Typography frame resolves for type scale

**Type:** UI  
**Priority:** Medium  

**Steps:**

1. Open node `90-1590`

**Expected result:**

- Text styles usable for display vs UI body hierarchy in README responsive UI

---

### TC-STG-POS-004: MCP returns component set metadata for Button / Icon Button

**Type:** Tooling  
**Priority:** Medium  

**Steps:**

1. Query MCP for nodes `2-477` (Button set) and `169-4228` (Icon Button) when traversing from Components

**Expected result:**

- Variant properties readable for automated design lint or codegen pipelines

---

## Negative Test Cases

### TC-STG-NEG-001: Hard-coded hex in app bypasses Style Guide tokens

**Type:** Technical  
**Priority:** High  

**Steps:**

1. Review PR for raw hex usage outside token mapping

**Expected result:**

- Colors pulled from agreed tokens or design exceptions documented

---

## Edge Cases

### TC-STG-EDGE-001: Dark theme variants exist — product picks default for V1

**Type:** Business Logic  
**Priority:** Medium  

**Steps:**

1. List dark vs light component variants in Style Guide
2. Confirm README “Future: theme toggle” vs shipped default

**Expected result:**

- Single default theme for MVP; others gated

---

## Logical Validation Cases

### TC-STG-LOG-001: Style Guide ↔ prototype ↔ AI Testing Container triangle stays consistent

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Sample Key component fill from Style Guide
2. Compare to pixels in **Design (Prototype)** iPhone frame and **AI Testing** Container

**Expected result:**

- No drift beyond agreed tolerance; drift flagged as design debt

---

### TC-STG-LOG-002: Icon-only keys require aria-label spec traceability

**Type:** Accessibility  
**Priority:** Medium  

**Steps:**

1. From Icon Button set, list calculator icons (sin, π, √, etc.)
2. Map each to proposed `aria-label` in implementation spec

**Expected result:**

- Each icon-only control has label source documented (`EXECUTION_PLAN` accessibility section)

---

_Generated for Figma page **Style Guide** · aligns with `docs/figma-tree.md`_
