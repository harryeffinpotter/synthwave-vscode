#!/usr/bin/env python3
import json
import os

ROOT = os.path.dirname(os.path.dirname(__file__))
CFG = os.path.join(ROOT, 'src', 'glow.config.json')

def load_cfg():
    if not os.path.exists(CFG):
        return {"overrides": {}, "noglowHexes": []}
    with open(CFG, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_cfg(cfg):
    with open(CFG, 'w', encoding='utf-8') as f:
        json.dump(cfg, f, indent=2)
    print(f"Saved {CFG}")

def hex6(s):
    s = s.strip().lower().lstrip('#')
    if len(s) != 6 or any(c not in '0123456789abcdef' for c in s):
        raise ValueError('Provide a 6-digit hex color')
    return s

def add_override():
    h = hex6(input('Hex to override (e.g. 8cd9ff): '))
    base = '#' + h
    glow = input('Glow color hex (default same as base): ').strip() or base
    glow = '#' + hex6(glow)
    strength = float(input('Glow strength scale 0.0-1.0 (default 0.55): ') or '0.55')
    # Use the template’s [NEON_BRIGHTNESS] alpha so the extension can modulate
    style = f"color: {base}; text-shadow: 0 0 2px #000, 0 0 14px {glow}[NEON_BRIGHTNESS], 0 0 28px {glow}[NEON_BRIGHTNESS], 0 0 64px {glow}[NEON_BRIGHTNESS]; backface-visibility: hidden;"
    cfg = load_cfg()
    cfg['overrides'][h] = style
    # ensure it is not in noglow
    cfg['noglowHexes'] = [x for x in cfg.get('noglowHexes', []) if x != h]
    save_cfg(cfg)

def set_noglow():
    h = hex6(input('Hex to set NO GLOW (e.g. 6ea4ff): '))
    cfg = load_cfg()
    if h not in cfg.get('noglowHexes', []):
        cfg.setdefault('noglowHexes', []).append(h)
    # also remove any explicit override
    cfg.get('overrides', {}).pop(h, None)
    save_cfg(cfg)

def list_cfg():
    cfg = load_cfg()
    print(json.dumps(cfg, indent=2))

def main():
    print('1) Add/Update glow override')
    print('2) Set NO-GLOW for a hex')
    print('3) Show current config')
    choice = (input('Choose: ').strip() or '3')
    if choice == '1':
        add_override()
    elif choice == '2':
        set_noglow()
    else:
        list_cfg()

if __name__ == '__main__':
    main()



