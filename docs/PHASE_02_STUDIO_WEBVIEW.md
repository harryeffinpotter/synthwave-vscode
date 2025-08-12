### Phase 2 — Theme Studio Webview (Core)

Goals
- Provide a live Monaco preview and controls for categories, colors, no-glow, and glow layers.
- Save updates to config and offer Apply+Reload.

UI spec
- Left: Monaco tabs (HTML/CSS/JS/Python) using sample files under `src/studio/samples/`.
- Right: Control pane
  - Category list with color picker, no-glow toggle, glow layers (3 rows with color, opacity, blur sliders)
  - UI chrome section (common VS Code color keys)
  - Preset dropdown; Save; Apply+Reload; Preview-only toggle
- Toolbar: "Pick from Editor" button

Messaging
- Webview → Extension: `{type:'save', config}`, `{type:'apply'}`, `{type:'pickFromEditor'}`
- Extension → Webview: `{type:'ready', config, summary}`, `{type:'picked', category, hex, scopes}`

Self-reporting
- On open: log `studio:ready` with counts and write `src/.studio/last-studio.json`.
- On save: log `studio:saved` with diff size.
- On apply: log `studio:apply` with cssBytes and theme keys changed; write `last-apply.json`.

Manual tests
1) Change variable color; verify Monaco preview updates instantly.
2) Toggle glow off for control keywords; preview shows no-glow.
3) Add 3-layer glow to functions; visual edge improves.
4) Apply+Reload; real editor reflects changes.

Failure playbook
- Webview init error: show error banner in panel with a retry button and log exception in output channel.

Completion gate
- All controls work; preview matches applied output after reload; logs and JSON checkpoints produced.


