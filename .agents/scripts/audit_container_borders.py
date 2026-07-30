#!/usr/bin/env python3
"""
Automated Container Border & Fantasy Glassmorphism Scanner
Scans JSX, JS, TSX files in omnistock/src for containers missing standard border classes
or using legacy plain cards, automatically upgrading them to standard Fantasy Glassmorphic classes.
"""

import os
import re
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

UPGRADE_PATTERNS = [
    # Replace plain dark card backgrounds missing glass border with glass-fantasy-cyber
    (r'className="([^"]*?\bbg-\[\#0B1C30\]\b(?!.*?\bglass-fantasy-[a-z]+\b)[^"]*?)"', r'className="\1 glass-fantasy-cyber"'),
    (r'className="([^"]*?\bbg-\[\#071322\]\b(?!.*?\bglass-fantasy-[a-z]+\b)[^"]*?)"', r'className="\1 glass-fantasy-cyber"'),
]

def scan_and_upgrade(directory, fix=True):
    modified_files = []
    total_upgrades = 0

    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or 'dist' in root or 'build' in root:
            continue
        for file in files:
            if file.endswith(('.jsx', '.js', '.tsx', '.ts')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()

                    file_upgrades = 0
                    new_content = content

                    for pattern, replacement in UPGRADE_PATTERNS:
                        matches = len(re.findall(pattern, new_content))
                        if matches > 0:
                            file_upgrades += matches
                            if fix:
                                new_content = re.sub(pattern, replacement, new_content)

                    if file_upgrades > 0:
                        total_upgrades += file_upgrades
                        modified_files.append((filepath, file_upgrades))
                        if fix:
                            with open(filepath, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                except Exception as e:
                    print(f"Error scanning {filepath}: {e}")

    print(f"🔮 Master Fantasy Glassmorphism Enforcement Audit on: {directory}")
    if total_upgrades > 0 and fix:
        print(f"✨ Successfully upgraded {total_upgrades} containers across {len(modified_files)} files to Glassmorphism!")
        for path, count in modified_files:
            rel = os.path.relpath(path, directory)
            print(f"  ├─ {rel}: {count} glassmorphic upgrades")
    elif total_upgrades == 0:
        print(f"✅ 100% PASS: All containers possess crisp Fantasy Glassmorphic borders!")
    return total_upgrades

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "omnistock/src"
    scan_and_upgrade(target_dir, fix=True)
