# Figma Navigation Tree — Calculator App (Responsive)

**File Key:** `efb6D9WRrFaSemoXuJOMxy`  
**Last Modified:** 2026-05-02T10:03:08Z  
**Prototype Base URL:** https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy

---

## Using this document with Figma MCP

When calling a Figma MCP tool (or REST API) that expects a **file key** and optional **node id**:

| Field | Value | Notes |
|--------|--------|--------|
| **File key** | `efb6D9WRrFaSemoXuJOMxy` | Stable identifier for this file |
| **Node id (URL form)** | `668-2158` | Appears in Figma share/dev URLs after `node-id=` |
| **Node id (API / MCP form)** | `668:2158` | Colon form; convert from URL by replacing `-` with `:` |

**Deep link template (open in browser):**

```text
https://www.figma.com/design/{fileKey}?node-id={nodeIdUrl}
```

Example (entry frame):

```text
https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158
```

**MCP checklist (per page / frame):**

1. Pass **file key** exactly as in the **Page-wise links** table below.
2. Pass **node id** in the format your MCP server documents (often `668:2158`).
3. If the MCP returns additional child frame ids, append new rows to **Page-wise links** so agents stay aligned with the live file.

---

## Summary

| Metric | Count |
|--------|-------|
| Total pages | 1 |
| Main pages | 1 |
| Overlays | 0 |
| Modals | 0 |
| Dialogs | 0 |
| Entry page | **Calculator App (Responsive)** |

---

## Page-wise links (Figma — all URLs)

| # | Page (Figma) | Role | `node-id` (URL) | Node id (API) | Direct link |
|---|----------------|------|-----------------|---------------|-------------|
| 1 | Calculator App (Responsive) | Main design file / single page | `668-2158` | `668:2158` | https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158 |

**Contained frames (within Page 1 — logical IA for MCP/agents):**

| Logical area | Description | Node id (URL) | Node id (API) | Direct link |
|--------------|-------------|---------------|---------------|-------------|
| **Container** (entry) | Primary responsive calculator shell — start here for layout parity | `668-2158` | `668:2158` | https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158 |

> **Note:** The exported tree currently shows a single top-level page with one entry frame. If the Figma file gains separate frames for mobile/tablet/desktop breakpoints, add one table row per frame with its `node-id` from Figma’s **Copy link** (or from the MCP metadata).

---

## Navigation Tree (prototype summary)

```
# Calculator App (Responsive)

[ENTRY] Container
│  https://www.figma.com/design/efb6D9WRrFaSemoXuJOMxy?node-id=668-2158
│

```

---

## Agent mapping: Figma → implementation

| Figma page / frame | App surface | Repo touchpoints |
|--------------------|------------|------------------|
| Page 1 · Container | Calculator + history layout | `frontend/src/` (layout, responsive grid) |
| — | REST evaluation + history | `backend/src/` (`/api/v1/calculate`, `/api/v1/history`) |

This keeps design links **page-wise** for MCP while implementation tracks the same feature set described in `README.md` and `docs/prd.md`.
