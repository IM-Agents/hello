# Functional Test Cases — Figma Page: Welcome

## Metadata

- **Source:** `docs/figma-tree.md`, `README.md`
- **Stack:** Design QA via MCP (Framelink / `figma-developer-mcp`), optional UI if Welcome is shipped as marketing
- **Coverage:** Canvas **Welcome** (`0-1`) — frames **About** (`321-438`), **Calcify Cover** (`329-413`)

---

## Positive Test Cases

### TC-WEL-POS-001: MCP resolves Welcome canvas node

**Type:** UI / Tooling  
**Priority:** Medium  

**Steps:**

1. Open MCP with `fileKey` `efb6D9WRrFaSemoXuJOMxy` and node id `0-1`
2. Confirm canvas name matches **Welcome**

**Expected result:**

- Tool returns metadata consistent with **Welcome** page

---

### TC-WEL-POS-002: About frame deep link opens correct artboard

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Open deep link for node `321-438` from `docs/figma-tree.md`

**Expected result:**

- Figma focuses **About** frame without cross-page drift

---

### TC-WEL-POS-003: Calcify Cover frame deep link opens correct artboard

**Type:** UI  
**Priority:** Low  

**Steps:**

1. Open deep link for node `329-413`

**Expected result:**

- Figma focuses **Calcify Cover**

---

## Negative Test Cases

### TC-WEL-NEG-001: Invalid node id fails gracefully in MCP

**Type:** Tooling  
**Priority:** Low  

**Steps:**

1. Request MCP fetch with bogus node id (e.g. `999-99999`)

**Expected result:**

- Clear error; no crash of agent session

---

## Edge Cases

### TC-WEL-EDGE-001: Emoji or special characters in sibling page names do not break indexing

**Type:** Tooling  
**Priority:** Low  

**Steps:**

1. Confirm **Design (Prototype) 💥** still appears in page index while Welcome links remain valid

**Expected result:**

- `docs/figma-tree.md` page index rows remain navigable

---

## Logical Validation Cases

### TC-WEL-LOG-001: Welcome assets are out of core calculator acceptance unless PRD expands scope

**Type:** Business Logic  
**Priority:** Medium  

**Steps:**

1. Compare `README.md` primary features vs Welcome content

**Expected result:**

- Test cases here marked **N/A for app automation** if product excludes marketing; design-only checks still apply

---

_Generated for Figma page **Welcome** · aligns with `docs/figma-tree.md`_
