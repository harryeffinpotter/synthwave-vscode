### Phase 0 — Foundation, invariants, and instrumentation

Goals
- Lock project invariants (strings/comments no-glow, keywords grouped, variables glow by default).
- Establish logging and checkpoint files so every step self-reports.
- Ensure the injector path is stable across VS Code versions we target.

Deliverables
- Output channel "Synthwave Studio" created at extension activation.
- Checkpoint directory `src/.studio/` auto-created.
- On "Enable Neon" run, write `src/.studio/last-enable.json` with a summary and print a matching log block.
- Document versions supported by `resolveWorkbenchPaths`.

Work items
- Create `Synthwave Studio` output channel and a tiny logger utility in `src/extension.js`.
- Ensure `src/.studio/` exists; write JSON summaries there (counts and hashes of outputs).
- Keep and document the invariants:
  - Strings/comments: no glow unless explicitly enabled.
  - Control keywords (if/for/else/in): default sky blue, no glow.
  - Variables: default glow; Functions/Classes: configurable.

Instrumentation & self-reporting
- On activation: log "studio:activated" with VS Code version, platform.
- On Enable Neon success: log a structured line and write JSON:
  - `{ overrides: N, noglow: M, hasCategories: bool, cssBytes: number }`
  - Save to `src/.studio/last-enable.json`.

Manual checks (must pass)
1) Run "Synthwave '84: Enable Neon".
2) View Output → "Synthwave Studio": confirm a JSON line with counts and cssBytes.
3) Open `src/.studio/last-enable.json`: same data present and well-formed.

Automated smoke (optional now)
- Node script that resolves the workbench paths and asserts `neondreams.js` exists after enabling.

Failure playbook
- If workbench HTML path missing: try both `electron-browser` and `electron-sandbox` and both `workbench.esm.html` and `workbench.html` (already implemented). If still missing, log an explicit error code and the base path probed.
- If writing `neondreams.js` fails: log fs error code and suggested action (run as admin) and write to `src/.studio/last-enable.json` with `error`.

Completion gate
- Output channel shows a structured success log.
- `src/.studio/last-enable.json` exists with non-zero cssBytes.

