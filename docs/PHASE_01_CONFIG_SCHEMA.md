### Phase 1 — Advanced Config Schema (Categories + Layered Glow)

Goals
- Introduce categories with base color, no-glow toggle, and up to 3 glow layers.
- Back-compat with existing `overrides` and `noglowHexes`.
- Validation schema and a dry-run renderer for testability.

Deliverables
- `src/studio/schema.glowconfig.json` JSON Schema.
- Updated `src/js/theme_template.js` to consume `[USER_CONFIG]`.
- Extended `tools/glow_tuner.py` to edit categories, layers, and UI keys.

Work items
- Schema: define `categories`, `overrides`, `noglowHexes`, `presets`, `ui.colors`.
- Injector: compute `text-shadow` from `glowLayers` as:
  - `0 0 blurPx colorWith[NEON_BRIGHTNESS]`
  - Concatenate up to 3 layers; include `0 0 2px #000` inner shadow for legibility.
- Merge order: `noglowHexes` > `overrides` > `category-derived` > generic glow.
- Keep string/comment no-glow guards independent of config.

Self-reporting
- Add an in-memory dry-run function `renderPreviewStyles(config)` returning `{cssText, counts}`.
- On Enable Neon: log counts `{categories, overrides, noglow, uiKeys}` and `cssBytes`.
- Write `src/.studio/last-config.json` with the same.

Manual tests
1) Add a category `variable` with 3 glow layers; Enable Neon; verify `cssBytes` increased; sample text shows multi-layer glow in editor after reload.
2) Put `string` hex into `noglowHexes`; verify no `text-shadow` generated for strings.
3) Change `ui.colors.editorGutter.background` and confirm the theme JSON updated.

Failure playbook
- If schema parse fails, log the exact JSON pointer path and write `error` into `last-config.json`.
- If a layer has invalid opacity/blur, clamp and log a warning.

Completion gate
- Schema file present; dry-run works; Enable Neon logs correct counts; styles reflect changes.

