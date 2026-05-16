# Functional Test Cases — Figma Page: Design (Prototype)

## Metadata

- **Source:** `docs/figma-tree.md`, `docs/design/EXECUTION_PLAN.md`, `README.md`
- **Stack:** Figma MCP + responsive implementation (React)
- **Coverage:** Canvas **Design (Prototype) 💥** (`65-3892`) — Headers, Labels, **iPhone 14 Plus**, **iPad Mini 6** frames (multiple theme rows)

---

## Positive Test Cases

### TC-DPT-POS-001: Each iPhone prototype frame resolves independently

**Type:** UI  
**Priority:** High  

**Test data:**

- Nodes: `222-7129`, `356-3191`, `356-4359`, `360-4751`

**Steps:**

1. For each node id, open deep link from `docs/figma-tree.md`
2. Confirm device shell is **iPhone 14 Plus** variant

**Expected result:**

- Four distinct frames load; layout matches prototype intent per row

---

### TC-DPT-POS-002: Each iPad prototype frame resolves independently

**Type:** UI  
**Priority:** High  

**Test data:**

- Nodes: `210-7038`, `356-3193`, `356-4361`, `360-4753`

**Steps:**

1. Open each deep link
2. Verify frame name **iPad Mini 6 (8.3)**

**Expected result:**

- Tablet layouts visible; history + keypad structure aligns with `EXECUTION_PLAN` tablet split intent

---

### TC-DPT-POS-003: Header + Label frames pair to theme rows

**Type:** Logical  
**Priority:** Medium  

**Steps:**

1. Map Headers (`90-3244`, `356-3185`, …) to adjacent Labels per design convention
2. Confirm naming/consistency in Figma layers

**Expected result:**

- Annotators can trace which Header/Label belongs to which device pair

---

### TC-DPT-POS-004: MCP fetch returns structured children for mobile entry frame

**Type:** Tooling  
**Priority:** Medium  

**Steps:**

1. Call MCP on node `222-7129`
2. Inspect child frames (e.g. nested calculator regions)

**Expected result:**

- Child hierarchy usable for dev handoff (display, keypad, history regions identifiable)

---

## Negative Test Cases

### TC-DPT-NEG-001: Mixing node ids across theme rows does not imply implementation mixes themes

**Type:** Business Logic  
**Priority:** Medium  

**Steps:**

1. Pick Header from row A and iPhone frame from row B
2. Verify implementation uses **single coherent theme** per build variant

**Expected result:**

- Product documents which theme is canonical for V1; no accidental hybrid

---

## Edge Cases

### TC-DPT-EDGE-001: Duplicate frame names (multiple “Header”) rely on node id not label alone

**Type:** Tooling  
**Priority:** High  

**Steps:**

1. Reference frames only by **node id** in tickets and MCP calls

**Expected result:**

- No ambiguity when multiple nodes share the display name **Header**

---

## Logical Validation Cases

### TC-DPT-LOG-001: Prototype page mobile width tracks README responsive mobile reference

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Compare iPhone frame width to README / acceptance mobile intent (~390px logical)

**Expected result:**

- Implemented CSS breakpoints reflect same intent as prototype device choice

---

### TC-DPT-LOG-002: Prototype tablet width tracks README tablet breakpoint (~768px)

**Type:** Logical  
**Priority:** High  

**Steps:**

1. Compare iPad Mini frame to documented tablet breakpoint

**Expected result:**

- Layout split (history visible) matches `page-container-responsive.md` tablet expectations

---

_Generated for Figma page **Design (Prototype) 💥** · aligns with `docs/figma-tree.md`_
