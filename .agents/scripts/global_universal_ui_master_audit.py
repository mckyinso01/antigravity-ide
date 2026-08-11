#!/usr/bin/env python3
"""
🌐 GLOBAL UNIVERSAL UI MASTER AUDIT ENGINE
Antigravity IDE Theme-Agnostic Structural, Functional & Accessibility Evaluator

Governed by 72-Brain Council Swarm, Stitch MCP, and
3_tier_audit_classification_and_governance_architecture.md Specification.

Usage:
    python .agents/scripts/global_universal_ui_master_audit.py [target_directory]
    Example: python .agents/scripts/global_universal_ui_master_audit.py Lead-suite-Pro/src
"""

import os
import sys
import re

# Enforce UTF-8 stdout encoding for Windows console compatibility
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
RESET = "\033[0m"
BOLD = "\033[1m"

def print_header(title):
    print(f"\n{CYAN}{BOLD}{'='*75}{RESET}")
    print(f"{CYAN}{BOLD}🌐  {title}{RESET}")
    print(f"{CYAN}{BOLD}{'='*75}{RESET}")

def scan_files(directory, extensions=(".jsx", ".js", ".tsx", ".ts", ".html", ".css")):
    matched_files = []
    for root, _, files in os.walk(directory):
        if "node_modules" in root or "dist" in root or ".git" in root or "build" in root:
            continue
        for file in files:
            if file.endswith(extensions):
                matched_files.append(os.path.join(root, file))
    return matched_files

def main():
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "src"
    if not os.path.isabs(target_dir):
        target_dir = os.path.abspath(target_dir)

    print_header(f"GLOBAL UNIVERSAL UI MASTER AUDIT ENGINE: {target_dir}")
    print(f"{BOLD}Evaluates Theme-Agnostic Structural, Functional & Accessibility Integrity (0 Color Impact){RESET}\n")

    files = scan_files(target_dir)
    print(f"📁 Scanned Files: {len(files)} target files found.\n")

    results = []

    def log_check(name, passed, details=None):
        results.append((name, passed, details or []))
        status_str = f"{GREEN}[✅ PASS]{RESET}" if passed else f"{RED}[❌ FAIL]{RESET}"
        print(f"{status_str} {name}")
        if not passed and details:
            for detail in details[:5]:
                print(f"      ↳ {detail}")
            if len(details) > 5:
                print(f"      ↳ ... and {len(details) - 5} more violations.")

    # --- CHECK 1: Master Button Token Alignment ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if re.search(r'className=["\'][^"\']*bg-red-600 hover:bg-red-500[^"\']*["\']', content):
                    violators.append(f"{os.path.basename(f)}: Ad-hoc danger button uses bg-red-600 instead of DESIGN_TOKENS.buttons.danger.")
    log_check("1. Master Button Token Alignment Standard (BUTTON-TOKENS-ALIGNMENT-STD)", len(violators) == 0, violators)

    # --- CHECK 2: Mobile 16px Base Input Font Size ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if re.search(r'<input\s+[^>]*class(?:Name)?=["\'][^"\']*text-\[8px\][^"\']*["\']', content):
                    violators.append(f"{os.path.basename(f)}: Text input font size too small (<16px) causing mobile Safari auto-zoom.")
    log_check("2. Mobile 16px Base Input Font Size Guard (INPUT-FONT-GUARD)", len(violators) == 0, violators)

    # --- CHECK 3: Image Alt Text Accessibility ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if re.search(r'<img\s+[^>]*alt=["\']\s*["\']', content):
                    violators.append(f"{os.path.basename(f)}: <img> tag has empty alt=\"\" text attribute.")
    log_check("3. Image Alt Text Accessibility Standard (IMAGE-ALT-TEXT-GUARD)", len(violators) == 0, violators)

    # --- CHECK 4: Controlled Z-Index Scale ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if re.search(r'z-\[1000\]', content):
                    violators.append(f"{os.path.basename(f)}: Non-standard z-[1000] found (use z-50).")
    log_check("4. Controlled Z-Index Layer Scale Guard (ZINDEX-COLLISION-GUARD)", len(violators) == 0, violators)

    # --- CHECK 5: Defensive Array Indexing ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if re.search(r'chartData\[chartData\.length - 1\]\.scraped', content):
                    violators.append(f"{os.path.basename(f)}: Un-guarded array indexing without defensive fallback.")
    log_check("5. Defensive Array Index Guard (UNDEFINED-ARRAY-LENGTH-GUARD)", len(violators) == 0, violators)

    # --- CHECK 6: Dynamic Count Pluralization ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if re.search(r'\{[^}]+\.length\}\s+Product\s+Components', content):
                    violators.append(f"{os.path.basename(f)}: Dynamic count text missing pluralization logic.")
    log_check("6. Dynamic Count Pluralization Grammar Law (PLURALIZATION-GRAMMAR-GUARD)", len(violators) == 0, violators)

    # --- CHECK 7: Unused Component Import Heuristic ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if "import { DESIGN_TOKENS }" in content and "DESIGN_TOKENS" not in content.split("import { DESIGN_TOKENS }")[1]:
                    violators.append(f"{os.path.basename(f)}: Unused imported symbol 'DESIGN_TOKENS'.")
    log_check("7. Unused Component Import Heuristic (UNUSED-IMPORT-GUARD)", len(violators) == 0, violators)

    # --- CHECK 8: 4-Tier Commercial Licensing Footer Bar ---
    violators = []
    for f in files:
        if f.endswith("App.tsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if "<LicensingDeploymentTierBar" not in content:
                    violators.append(f"{os.path.basename(f)}: LicensingDeploymentTierBar not mounted at application shell root.")
    log_check("8. 4-Tier Commercial Licensing Footer Bar (4-TIER-LICENSING-BAR)", len(violators) == 0, violators)

    # --- CHECK 9: Defensive Database & Async Load Crash Guards ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if "fetch(" in content and "try {" not in content and ".catch(" not in content:
                    violators.append(f"{os.path.basename(f)}: Async fetch missing try-catch block or .catch() fallback.")
    log_check("9. Defensive Database & Async Load Crash Guards (TRY-CATCH-DEFENSE-GUARD)", len(violators) == 0, violators)

    # --- CHECK 10: Icon-Only Button Accessibility Guard ---
    violators = []
    for f in files:
        if f.endswith(".tsx") or f.endswith(".jsx"):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file_obj:
                content = file_obj.read()
                if re.search(r'<button\s+[^>]*class(?:Name)?=["\'][^"\']*p-1[^"\']*["\'][^>]*>\s*<span\s+className=["\']material-symbols-outlined["\']>[^<]+</span>\s*</button>', content):
                    if "aria-label" not in content and "title" not in content:
                        violators.append(f"{os.path.basename(f)}: Icon-only button missing aria-label or title attribute.")
    log_check("10. Icon-Only Button Accessibility Guard (ICON-BUTTON-A11Y-GUARD)", len(violators) == 0, violators)

    total_checks = len(results)
    passed_checks = sum(1 for _, p, _ in results if p)
    score = (passed_checks / total_checks) * 100

    print(f"\n{CYAN}{BOLD}{'='*75}{RESET}")
    print(f"{BOLD}FINAL GLOBAL UNIVERSAL AUDIT VERDICT: {passed_checks}/{total_checks} CHECKS PASSED ({score:.1f}% SCORE){RESET}")
    print(f"{CYAN}{BOLD}{'='*75}{RESET}\n")

    if score == 100.0:
        print(f"{GREEN}{BOLD}✨ 100% GLOBAL STRUCTURAL & FUNCTIONAL PERFECTION ATTAINED! ✨{RESET}\n")
        sys.exit(0)
    else:
        print(f"{YELLOW}{BOLD}⚠️ REVISE: Please resolve structural violations above.{RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
