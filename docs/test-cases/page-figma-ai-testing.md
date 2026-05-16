# Functional Test Cases — Figma Page: AI Testing

## Metadata

- **Source:** `docs/figma-tree.md`, `README.md`, `docs/prd.md`, `docs/acceptance-criteria.md`
- **Stack:** Figma MCP + React calculator UI
- **Coverage:** Canvas **AI Testing** (`610-1650`) — **Calculator**, **Calculator 2**, **Calculator 3** (+ **Container** `668-2158`), **Login Page** section (`655-404`)

---

## Positive Test Cases

### TC-AIT-POS-001: README entry Container resolves via MCP

**Type:** Tooling  
**Priority:** High  

**Steps:**

1. Use MCP with node id **`668-2158`**
2. Confirm node name **Container**

**Expected result:**

- MCP output matches **Calculator 3 → Container** hierarchy in Figma

---

### TC-AIT-POS-002: Calculator root frames are distinguishable by node id

**Type:** UI  
**Priority:** High  

**Test data:**

- `610-2428` Calculator  
- `668-1904` Calculator 2  
- `668-2154` Calculator 3  

**Steps:**

1. Open each deep link from `docs/figma-tree.md`

**Expected result:**

- Three separate constructions visible; **Calculator 3** holds canonical **Container**

---

### TC-AIT-POS-003: Login Page section loads for design QA

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Open node `655-404` (**Login Page** section)

**Expected result:**

- Login artboard present; scope flagged vs README V1 out-of-scope unless PRD updated

---

### TC-AIT-POS-004: Deep link parity — Container matches historical prototype entry

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. Compare `668-2158` URL against legacy docs referencing same entry

**Expected result:**

- Same node remains documented entry in `docs/figma-tree.md` appendix

---

## Negative Test Cases

### TC-AIT-NEG-001: Implementing Login flows without PRD acceptance is rejected

**Type:** Business Logic  
**Priority:** Medium  

**Steps:**

1. Check `docs/prd.md` scope for auth

**Expected result:**

- No Login automation required for V1 calculator unless explicitly added to PRD

---

### TC-AIT-NEG-002: Using Calculator or Calculator 2 node as shipping reference without review

**Type:** Process  
**Priority:** Medium  

**Steps:**

1. Verify product owner names **Calculator 3 / Container** as handoff root

**Expected result:**

- Implementation does not snap to obsolete variant without sign-off

---

## Edge Cases

### TC-AIT-EDGE-001: Nested Content Area frames differ between calculator variants

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Expand **Calculator** vs **Calculator 3** in Figma layers

**Expected result:**

- Document any extra zones (e.g. banner) that must not leak into minimal calculator app

---

## Logical Validation Cases

### TC-AIT-LOG-001: Single source of truth — AI Testing Container drives acceptance visual parity

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Map each **README** primary feature to a region inside node `668-2158`

**Expected result:**

- Display, keypad, history, mode/memory controls traceable in design

---

### TC-AIT-LOG-002: Cross-variant regression matrix

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. When design updates **Calculator 2**, confirm whether **Calculator 3** must mirror change

**Expected result:**

- Changelog states which variant is authoritative

---

_Generated for Figma page **AI Testing** · aligns with `docs/figma-tree.md`_
