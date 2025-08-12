### Synthwave Theme Studio — Master TODO (Execution Script)

Goal: Ship a live-preview Theme Studio to edit base colors and neon glows (per category and per-layer), with no-glow toggles, presets, export/import, and self-reporting health checks. Terminal editor comes last.

Status conventions
- Output channel: "Synthwave Studio" (all steps must log there)
- JSON checkpoints written to `src/.studio/` for each key step
- After every step, verify the specified log+JSON exists and matches the acceptance criteria

Phases
1) Config + Injector foundation (done in repo; extend here)
2) Advanced config schema (layers, categories, UI keys)
3) Theme Studio webview (preview + controls)
4) Pick-from-editor mapping
5) Apply-to-editor (regen + reload)
6) Export/Import/Presets
7) QA + Health checks + Docs
8) Terminal (deferred)

---

1) Config + Injector foundation
- [x] Add `src/glow.config.json` and wire it in `src/extension.js`
- [x] Inject config into `[USER_OVERRIDES]`/`[USER_NOGLOW]` (done); now upgrade to `[USER_CONFIG]`
Tasks
- [ ] Update `src/extension.js` to inject `[USER_CONFIG]` (full JSON) and log summary
  - Log: `{ overrides:N, noglow:M, hasCategories:bool }`
  - JSON: write `src/.studio/last-enable.json` with the same info
- [ ] Update `src/js/theme_template.js` to accept `[USER_CONFIG]` (if not already), compute styles, and respect `noglow`
- [ ] Ensure strings/comments remain no-glow by default
Acceptance
- Enable Neon writes `neondreams.js` and logs the summary; JSON file created

2) Advanced config schema
Add categories, layered glow, UI color keys, presets.
- [ ] Create `src/studio/schema.glowconfig.json` documenting:
  - categories.{id}.baseHex, noGlow, glowLayers[{color, opacity, blur}]
  - overrides.{hex}: same structure
  - noglowHexes: [hex]
  - presets.{name}: partial category overrides
  - ui.colors: map of VS Code color keys → hex
- [ ] Extend `src/js/theme_template.js` to:
  - Build `categoryHexToStyle` from categories
  - Merge with overrides; apply `noglow` first
  - Generate text-shadow from `glowLayers` with `[NEON_BRIGHTNESS]`
- [ ] Extend `tools/glow_tuner.py` with:
  - `category set <id> base <hex>`
  - `category glow <id> set <layer> color <hex> opacity <0..1> blur <px>`
  - `category toggle-noglow <id> true|false`
  - `hex noglow add|remove <hex>`
  - `ui set <key> <hex>`
Self-report
- Output: "Config schema loaded: categories=X, overrides=Y"
- JSON: `src/.studio/last-config.json`
Acceptance
- Dry-run render function returns CSS string length > 10k and includes at least 6 category colors

3) Theme Studio webview (core)
Files
- `src/studio/ThemeStudioPanel.ts`
- `src/studio/web/{index.html,main.js,styles.css}`
- `src/studio/samples/{sample.py,sample.js,sample.html,sample.css}`
Features
- [ ] Command `synthwave84.openThemeStudio` opens panel
- [ ] Left pane: Monaco preview with 4 tabs (HTML/CSS/JS/Python)
- [ ] Right pane: controls
  - Category list: base color picker, glow toggle, 3 layers (color, opacity, blur)
  - UI chrome group: pickers for common VS Code keys (gutter, tabs, title bar, etc.)
  - Preset dropdown; Save, Preview-only, Apply+Reload
Live preview
- [ ] In-webview CSS overlay mirrors computed glow without needing reload
Save & Apply
- [ ] Save writes `glow.config.json`
- [ ] Apply triggers regeneration and reload prompt
Self-report
- Output: "Studio ready: categories K"
- JSON: `src/.studio/last-studio.json` with panel open timestamp and counts
Acceptance
- Changing a category color visibly updates Monaco preview immediately

4) Pick from editor
- [ ] Command `synthwave84.studio.pickFromEditor`
- [ ] Resolve semantic token at cursor → category id
- [ ] Post to webview with `{category, hex, tokenType, scopes}`
- [ ] Fallback heuristics if semantic tokens unavailable
Self-report
- Output: per-pick log line with `{file, range, tokenType, category}`
- JSON append: `src/.studio/last-picks.json`
Acceptance
- Clicking "Pick from Editor" focuses correct category in Studio and highlights it

5) Apply-to-editor path
- [ ] Implement `applyConfigToVSCode()` in extension
  - Regenerate `neondreams.js` with `[USER_CONFIG]`
  - Apply `ui.colors` into `themes/synthwave-color-theme.json`
  - Prompt reload
Self-report
- Output: "Applied theme: cssBytes, themeKeysUpdated"
- JSON: `src/.studio/last-apply.json` with hashes (sha256) of files
Acceptance
- After apply + reload, colors in the real editor match Studio preview (spot-check 5 categories)

6) Export / Import / Presets
- [ ] Export current: zip of `glow.config.json` + `themes/synthwave-color-theme.json`
- [ ] Import zip/json: merge, preview-only until Save
- [ ] Preset list: built-ins under `src/studio/presets/`
Self-report
- Output: "Exported preset X to dist/..." or "Imported preset Y"
- JSON: `src/.studio/last-export.json` / `last-import.json`
Acceptance
- Round-trip: export → delete → import → preview identical

7) QA / Health checks / Docs
- [ ] Add command `synthwave84.healthCheck`
  - Verify workbench path, injection tag, config parse, style presence
  - Render a small CSS sample and verify token replacements
- [ ] Add `docs/`:
  - STUDIO_SPEC.md (UI spec, message protocol, schema)
  - HEALTH_CHECKS.md (how to run, expected outputs)
  - Recipes: strings/comments no-glow; neon presets; RGB layered glow
Self-report
- Output: JSON block of check results
- File: `src/.studio/last-health.json`
Acceptance
- HealthCheck returns all green on a supported VS Code version

8) Terminal (deferred)
- [ ] Studio: Terminal tab with 16-color palette + fg/bg/cursor/selection
- [ ] Pseudo-terminal preview (ansi sequences: ls, errors, git status)
- [ ] Apply writes theme JSON keys
Self-report
- Output: "Terminal palette updated"
- JSON: `src/.studio/last-terminal.json`
Acceptance
- Colors reflect in VS Code integrated terminal after Apply + Reload

Non-negotiables
- Strings + comments no-glow by default
- Control keywords (if/for/else/in) non-glow by default; variables glow by default
- Gutter color editable in Studio
- Every Save/Apply/Enable logs to output channel and writes a JSON checkpoint under `src/.studio/`

Daily driver quick flow
1) Open Studio → tweak categories → preview updates instantly
2) Use Pick-from-editor for a specific token
3) Save → Apply + Reload
4) If issues: run Health Check and read `src/.studio/last-*.json`



