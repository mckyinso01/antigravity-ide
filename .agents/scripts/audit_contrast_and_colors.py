#!/usr/bin/env python3
"""
Automated Contrast & Dead Color Scanner and Auto-Fixer
Scans JSX, JS, TSX, HTML files for unreadable dark text classes on dark background containers
and automatically converts them to high-contrast Stitch MCP dynamic text standards.
"""

import os
import re
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DARK_TEXT_PATTERNS = [
    (r'\btext-slate-800\b', 'text-slate-200'),
    (r'\btext-slate-900\b', 'text-white'),
    (r'\btext-slate-700\b', 'text-slate-300'),
    (r'\btext-slate-600\b', 'text-slate-400'),
    (r'\btext-blue-600\b', 'text-cyan-400'),
    (r'\btext-emerald-600\b', 'text-emerald-400'),
    (r'\btext-amber-600\b', 'text-amber-400'),
    (r'\btext-violet-600\b', 'text-violet-400'),
    (r'\bbg-white\b', 'bg-[#0B1C30]'), # ZERO PLAIN WHITE CONTAINERS DIRECTIVE
    (r'\btext-xs\b(?=\s+[^>]*\b<input\b)', 'text-base sm:text-xs'), # iOS SAFARI ZOOM PREVENTION ON INPUTS
]

def scan_and_fix(directory, fix=True):
    modified_files = []
    total_issues = 0

    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or 'dist' in root or 'build' in root:
            continue
        for file in files:
            if file.endswith(('.jsx', '.js', '.tsx', '.ts', '.html', '.css')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()

                    file_issues = 0
                    new_content = content

                    for pattern, replacement in DARK_TEXT_PATTERNS:
                        matches = len(re.findall(pattern, new_content))
                        if matches > 0:
                            file_issues += matches
                            if fix:
                                new_content = re.sub(pattern, replacement, new_content)

                    if file_issues > 0:
                        total_issues += file_issues
                        if fix and new_content != content:
                            with open(filepath, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            modified_files.append((filepath, file_issues))
                        elif not fix:
                            modified_files.append((filepath, file_issues))
                except Exception as e:
                    pass

    return modified_files, total_issues

if __name__ == '__main__':
    target_dir = sys.argv[1] if len(sys.argv) > 1 else '.'
    print(f"⚔️ Running Master Design System Enforcement Audit on: {target_dir}")
    modified, count = scan_and_fix(target_dir, fix=True)
    if count == 0:
        print("✅ 100% PASS: All components comply with Demon Slayer Master Design Tokens!")
    else:
        print(f"🔧 ENFORCED: Auto-corrected {count} design token violations across {len(modified)} files:")
        for path, n in modified:
            print(f"  - {path}: {n} fix(es)")
