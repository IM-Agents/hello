# Functional Test Cases — Figma Page: Archive

## Metadata

- **Source:** `docs/figma-tree.md`
- **Stack:** Figma MCP (read-only reference)
- **Coverage:** Canvas **Archive** (`655-482`) — **Replicate Figma Design Layout** frames (`655-483`, `655-540`)

---

## Positive Test Cases

### TC-ARC-POS-001: Archive canvas opens for historical comparison

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Open canvas node `655-482`

**Expected result:**

- Archive page visible; labeled as non-canonical in workflow docs

---

### TC-ARC-POS-002: First replicate layout Container resolves

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Navigate to node `655-485` (**Container** under first replicate layout)

**Expected result:**

- Layout loads; used only for regression archaeology unless promoted

---

### TC-ARC-POS-003: Second replicate layout Container resolves

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Open node `655-542`

**Expected result:**

- Alternate archive layout visible

---

## Negative Test Cases

### TC-ARC-NEG-001: New implementation must not silently fork from Archive layouts

**Type:** Process  
**Priority:** Medium  

**Steps:**

1. Confirm engineers use **AI Testing** `668-2158` or current PRD pointer—not Archive—as default

**Expected result:**

- No accidental Archive reference in CI screenshots baseline without approval

---

## Edge Cases

### TC-ARC-EDGE-001: Duplicate layout names under Archive

**Type:** Tooling  
**Priority:** Medium  

**Steps:**

1. Disambiguate frames using node ids `655-483` vs `655-540` only

**Expected result:**

- Tickets cite node ids to avoid wrong layout

---

## Logical Validation Cases

### TC-ARC-LOG-001: Archive diff against Container entry highlights intentional UX drift

**Type:** Logical  
**Priority:** Low  

**Steps:**

1. Side-by-side compare Archive **Container** (`655-485` / `655-542`) vs **AI Testing** `668-2158`

**Expected result:**

- Documented rationale if spacing/component versions diverge

---

_Generated for Figma page **Archive** · aligns with `docs/figma-tree.md`_
