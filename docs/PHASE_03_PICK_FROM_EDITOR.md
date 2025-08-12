### Phase 3 — Pick From Editor

Goals
- Click a button in Studio to select the token under cursor in VS Code and map it to a category.

Implementation
- Command `synthwave84.studio.pickFromEditor`:
  - Get active editor and cursor position.
  - Try semantic tokens provider to get token type/modifiers and range.
  - Fallback: heuristics per language (regex for strings/numbers/keywords).
  - Resolve category id using a mapping table and/or current theme hex.
  - Post `{category, hex, tokenType, scopes}` to webview.

Self-reporting
- Output: `pick:{file, line, tokenType, category}`
- Append to `src/.studio/last-picks.json` with a bounded size.

Manual tests
1) Place cursor on `if` in Python; category resolves to `controlKeyword`.
2) Place cursor on `child` variable; resolves to `variable`.
3) Place cursor on string literal; resolves to `string` (no-glow toggle is offered).

Completion gate
- 3 test cases above pass; webview focus jumps to the correct category.


