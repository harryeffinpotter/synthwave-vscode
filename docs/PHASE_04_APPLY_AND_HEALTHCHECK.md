### Phase 4 — Apply to Editor and Health Checks

Goals
- Apply config to real VS Code (regen `neondreams.js`, update theme JSON UI keys), then prompt reload.
- Provide a health check to validate environment and outputs.

Apply flow
- Write `glow.config.json` and theme JSON changes.
- Regenerate and write `neondreams.js` with `[USER_CONFIG]`.
- Show notification: "Theme updated — Reload now?"
- Log `apply:{cssBytes, themeKeysUpdated}` and write `src/.studio/last-apply.json` with file hashes.

Health check
- Command `synthwave84.healthCheck`:
  - Resolve workbench paths (both electron bases and html candidates).
  - Verify `neondreams.js` exists and is referenced in HTML.
  - Parse `glow.config.json` against schema.
  - Render a small CSS sample; assert tokens replaced and no-glow respected.
- Log structured JSON and write `src/.studio/last-health.json`.

Manual tests
1) Apply+Reload; inspect editor UI and confirm key categories and UI colors.
2) Run Health Check; ensure all checks report green.

Completion gate
- `last-apply.json` and `last-health.json` exist and show success.


