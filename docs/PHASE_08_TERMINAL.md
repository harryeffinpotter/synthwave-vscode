### Phase 8 — Terminal (Deferred)

Goals
- Terminal color palette editor in Studio with live pseudo-terminal preview.

Scope
- All keys: `terminal.foreground`, `terminal.background`, `terminal.selectionBackground`, `terminalCursor.foreground`, `terminalCursor.background`, and full 16-color palette (ansi + bright).
- Store under `config.ui.colors` and apply to `themes/synthwave-color-theme.json` on Apply.

Preview
- In webview, emulate terminal output with ANSI sequences: ls, errors, git status. No glow in terminal (color-only).

Self-reporting
- Log `terminal:updated` with count of keys changed.
- Write `src/.studio/last-terminal.json` with new palette.

Completion gate
- After Apply+Reload, integrated terminal colors match preview.


