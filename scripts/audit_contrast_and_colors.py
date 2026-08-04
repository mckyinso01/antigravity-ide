#!/usr/bin/env python3
"""
Automated WCAG 2.1 AA Contrast Ratio & Color Audit Script
Validates contrast ratios for master design tokens.
"""
import json
import math
import pathlib
import sys

# Force UTF-8 encoding for Windows stdout/stderr
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

REPO_ROOT = pathlib.Path(__file__).parent.parent.resolve()
TOKEN_PATH = REPO_ROOT / "omnistock" / "design" / "tokens" / "master_tokens.json"

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip("#")
    if len(hex_str) == 3:
        hex_str = "".join([c*2 for c in hex_str])
    return [int(hex_str[i:i+2], 16) for i in (0, 2, 4)]

def linearize(c):
    c_s = c / 255.0
    return c_s / 12.92 if c_s <= 0.04045 else math.pow((c_s + 0.055) / 1.055, 2.4)

def calculate_luminance(rgb):
    r, g, b = [linearize(c) for c in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def calculate_contrast_ratio(hex1, hex2):
    lum1 = calculate_luminance(hex_to_rgb(hex1))
    lum2 = calculate_luminance(hex_to_rgb(hex2))
    l1 = max(lum1, lum2)
    l2 = min(lum1, lum2)
    return (l1 + 0.05) / (l2 + 0.05)

def main():
    print("🔍 Running WCAG 2.1 AA Contrast Ratio Audit on Master Tokens...")
    
    if not TOKEN_PATH.exists():
        print(f"❌ Master token file not found: {TOKEN_PATH}", file=sys.stderr)
        sys.exit(1)

    with open(TOKEN_PATH, "r", encoding="utf-8") as f:
        tokens = json.load(f)

    color_surface_dark = tokens["colors"]["surface"]["dark"] # #050811
    color_surface_card = tokens["colors"]["surface"]["card"] # #0B1C30
    
    text_crystal_white = tokens["colors"]["text"]["crystalWhite"] # #FFFFFF
    text_ice_white = tokens["colors"]["text"]["iceWhite"] # #F8FAFC
    text_slate_muted = tokens["colors"]["text"]["slateMuted"] # #94A3B8

    pairs_to_test = [
        ("Crystal White on Dark Surface", text_crystal_white, color_surface_dark, 4.5),
        ("Ice White on Card Surface", text_ice_white, color_surface_card, 4.5),
        ("Slate Muted on Card Surface", text_slate_muted, color_surface_card, 3.0),
        ("Button Primary Text on Action Primary", "#FFFFFF", tokens["colors"]["action"]["primary"], 4.5),
    ]

    all_passed = True

    for label, fg, bg, min_required in pairs_to_test:
        ratio = calculate_contrast_ratio(fg, bg)
        status = "PASSED" if ratio >= min_required else "FAILED"
        print(f"  • {label}: {fg} on {bg} => Ratio {ratio:.2f}:1 (Required >= {min_required}:1) [{status}]")
        if ratio < min_required:
            all_passed = False

    if not all_passed:
        print("\n❌ WCAG Contrast Audit Failed: One or more token pairs failed AA contrast thresholds.", file=sys.stderr)
        sys.exit(1)

    print("\n✅ WCAG 2.1 AA Contrast Audit 100% PASSED! All token pairs satisfy contrast standards.")

if __name__ == "__main__":
    main()
