# Functional Test Cases — Combined E2E Workflows

## Metadata
- **Scope:** Cross-feature flows (UI + API + keyboard + memory + history)

### TC-LOG-001: Full calculation workflow
1. Open app (desktop)
2. Set DEG; calculate `sin(30)+5^2`
3. Verify display `25.5`
4. Verify history entry
5. Click history row → expression reloads

### TC-LOG-002: Memory + calculate + MR
1. Calculate `100`
2. M+
3. Clear display; MR
4. Add `+50` and evaluate

### TC-LOG-003: Error recovery workflow
1. `10/0` → Error
2. Backspace / new input `8`
3. Successful `8*2`

### TC-LOG-004: API + UI sync
1. POST calculate via API
2. Refresh page / GET history
3. History panel shows server entry

### TC-LOG-005: Preview proxy path
1. `npm run build && npm run preview`
2. Open `http://localhost:8080`
3. Calculate via UI (proxied `/api`)
4. `npm run preview:stop`

### TC-LOG-006: Responsive regression
1. Desktop: side-by-side layout
2. Resize to 768px: stacked
3. Resize to 375px: mobile padding

### TC-LOG-007: Keyboard-only session
Perform 5 operations using only keyboard; no mouse

### TC-LOG-008: Angle mode switch mid-session
1. `sin(90)` in DEG → 1
2. Switch RAD; `sin(90)` → different value
3. Prior expression unchanged until edited
