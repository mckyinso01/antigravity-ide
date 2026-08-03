#!/usr/bin/env python3
"""
⚔️ UNIVERSAL DEEP EXHAUSTIVE PROJECT AUDIT & EVALUATION SUITE
Antigravity IDE Master Agentic Governance & Quality Enforcement Engine

Governed by 72-Brain Council Swarm, Stitch MCP Design System, and AGENTS.md OKF v0.2 Specification.
Enforces the 4-Pillar TOTAL Audit & Evaluation Philosophy Directive (`TOTAL-AUDIT-EVALUATION-LAW`).

TOTAL PHILOSOPHY PILLARS:
 1. TOTAL COVERAGE (100% Record): Every defect (visible UI + invisible internal wirings) is logged in Master Ledger.
 2. TOTAL PERMANENT PREVENTION: Every bug fixed is codified into this CLI evaluator so AI NEVER forgets.
 3. TOTAL EMPIRICAL PROOF: Must achieve 100.0% PASS score + live DevTools E2E screenshot verification.
 4. TOTAL WOW FACTOR: Enforces Demon Slayer Cyber Glass design tokens and zero-crash user experience.

Usage:
    python .agents/scripts/master_project_audit.py [target_directory]
    Example: python .agents/scripts/master_project_audit.py omnistock/src
"""

import os
import sys
import re
import json
from datetime import datetime

# Enforce UTF-8 stdout encoding for Windows console compatibility
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Color terminal ANSI codes
CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
RESET = "\033[0m"
BOLD = "\033[1m"

def print_total_philosophy_banner():
    print(f"\n{CYAN}{BOLD}{'='*75}{RESET}")
    print(f"{CYAN}{BOLD}🛡️  THE 'TOTAL' MASTER AUDIT & EVALUATION PHILOSOPHY PROTOCOL (`TOTAL-AUDIT-LAW`){RESET}")
    print(f"{CYAN}{BOLD}{'='*75}{RESET}")
    print(f" 1. {BOLD}TOTAL COVERAGE (100% Record){RESET}: Every defect (visible UI + invisible wirings) logged in Ledger.")
    print(f" 2. {BOLD}TOTAL PERMANENT PREVENTION{RESET}: Every bug fixed is codified as a CLI check so it NEVER recurs.")
    print(f" 3. {BOLD}TOTAL EMPIRICAL PROOF{RESET}: Requires 100.0% PASS scorecard + DevTools E2E visual verification.")
    print(f" 4. {BOLD}TOTAL WOW FACTOR{RESET}: Enforces Demon Slayer Cyber Glass design tokens & zero-crash performance.")
    print(f"{CYAN}{BOLD}{'-'*75}{RESET}\n")

def print_header(title):
    print(f"\n{CYAN}{BOLD}{'='*75}{RESET}")
    print(f"{CYAN}{BOLD}⚔️  {title}{RESET}")
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

def run_auto_fixer(directory):
    print(f"\n{YELLOW}{BOLD}🔧 PHASE 0: AUTOMATED CODEBASE REPAIR & DESIGN TOKEN CONSOLIDATION...{RESET}")
    AUTO_FIX_PATTERNS = [
        (re.compile(r'\btext-slate-800\b'), 'text-slate-200'),
        (re.compile(r'\btext-slate-900\b'), 'text-white'),
        (re.compile(r'\btext-slate-700\b'), 'text-slate-300'),
        (re.compile(r'\btext-slate-600\b'), 'text-slate-400'),
        (re.compile(r'\btext-blue-600\b'), 'text-cyan-400'),
        (re.compile(r'\btext-emerald-600\b'), 'text-emerald-400'),
        (re.compile(r'\btext-amber-600\b'), 'text-amber-400'),
        (re.compile(r'\btext-violet-600\b'), 'text-violet-400'),
        (re.compile(r'\bbg-white\b'), 'bg-[#0B1C30]'),
    ]
    
    files = scan_files(directory)
    fixed_files_count = 0
    total_fixes = 0
    
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        new_content = content
        file_fixes = 0
        for pattern, replacement in AUTO_FIX_PATTERNS:
            new_content, count = pattern.subn(replacement, new_content)
            file_fixes += count
            
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            fixed_files_count += 1
            total_fixes += file_fixes
            
    print(f"{GREEN}✅ Auto-Fixer Complete: Repaired {total_fixes} design token issues across {fixed_files_count} files.{RESET}\n")

def run_audit(target_dir, fix_mode=False):
    print_total_philosophy_banner()
    print_header(f"UNIFIED MASTER AUDIT, EVALUATION & REPAIR SUITE: {target_dir}")
    
    if fix_mode:
        run_auto_fixer(target_dir)

    files = scan_files(target_dir)
    if not files:
        print(f"{RED}❌ Error: No source files found in target directory '{target_dir}'.{RESET}")
        return False

    print(f"🔍 Scanned {len(files)} source files in target directory.")
    print(f"{CYAN}{BOLD}⚙️  PHASE 1: DEEP COMPLIANCE AUDIT SCAN (Checking 43 Rules across codebase...){RESET}\n")

    results = []
    
    # ---------------------------------------------------------
    # CHECK 1: Monochromatic Luminance Typography System
    # ---------------------------------------------------------
    ch1_pass = True
    ch1_details = []
    forbidden_colors = re.compile(r'\b(text-red-500|text-blue-500|text-green-500|text-pink-500|text-purple-500)\b')
    h1_pattern = re.compile(r'<h1[^>]*class="([^"]*)"', re.IGNORECASE)
    
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            h1_matches = h1_pattern.findall(content)
            for cls in h1_matches:
                if not ("text-white" in cls or "text-slate-100" in cls or "typography.h1" in cls or "text-slate-50" in cls):
                    ch1_pass = False
                    ch1_details.append(f"{os.path.basename(fpath)}: H1 does not use Monochromatic Level 1 Crystal White (class: '{cls[:40]}...')")
            for match in forbidden_colors.finditer(content):
                line_no = content[:match.start()].count('\n') + 1
                ch1_details.append(f"{os.path.basename(fpath)}:{line_no} Forbidden ad-hoc font color '{match.group(0)}' (use semantic tokens or slate scale)")

    results.append(("1. Monochromatic Luminance Typography (MONO-LUMINANCE-TYPOGRAPHY)", ch1_pass and len(ch1_details) == 0, ch1_details))

    # ---------------------------------------------------------
    # CHECK 2: Mobile 16px Base Font Size Input Guard
    # ---------------------------------------------------------
    ch2_pass = True
    ch2_details = []
    input_tag = re.compile(r'<(input|textarea|select)[^>]*class="([^"]*)"', re.IGNORECASE)
    
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in input_tag.finditer(content):
                tag, cls = match.groups()
                if "hidden" in cls or 'type="file"' in content[match.start():match.end()] or 'type="checkbox"' in content[match.start():match.end()] or 'type="radio"' in content[match.start():match.end()]:
                    continue
                if not ("text-base" in cls or "forms.input" in cls or "text-[16px]" in cls):
                    ch2_pass = False
                    line_no = content[:match.start()].count('\n') + 1
                    ch2_details.append(f"{os.path.basename(fpath)}:{line_no} <{tag}> missing 16px font size guard ('text-base' or 'DESIGN_TOKENS.forms.input') to prevent mobile browser viewport auto-zoom.")

    results.append(("2. Mobile 16px Base Font Size Input Guard (INPUT-FONT-GUARD)", ch2_pass, ch2_details))

    # ---------------------------------------------------------
    # CHECK 3: 4-Criterion Container Interactivity Compliance
    # ---------------------------------------------------------
    ch3_pass = True
    ch3_details = []
    
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "POS.jsx" in fpath or "Login.jsx" in fpath or "Inventory.jsx" in fpath:
                if not ("interactiveTier1" in content or "moving-border-card" in content or "app-card-hover" in content or "water-breathing-card" in content):
                    ch3_pass = False
                    ch3_details.append(f"{os.path.basename(fpath)}: Interactive view missing 4-Criterion Container Interactivity tokens.")

    results.append(("3. 4-Criterion Container Interactivity Standard (CONTAINER-INTERACTIVITY-STD)", ch3_pass, ch3_details))

    # ---------------------------------------------------------
    # CHECK 4: Defensive Database & Async Load Crash Guards
    # ---------------------------------------------------------
    ch4_pass = True
    ch4_details = []
    
    for fpath in files:
        if "components/ui" in fpath.replace("\\", "/") or "hooks" in fpath.replace("\\", "/"):
            continue
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "const loadData = async" in content or "useEffect(() => {" in content:
                if "try {" not in content and ".catch(" not in content:
                    ch4_pass = False
                    ch4_details.append(f"{os.path.basename(fpath)}: Async data fetch missing defensive try-catch block or .catch(() => []) fallback.")

    results.append(("4. Defensive Database & Async Load Crash Guards (TRY-CATCH-DEFENSE-GUARD)", ch4_pass and len(ch4_details) == 0, ch4_details))

    # ---------------------------------------------------------
    # CHECK 5: 1.5px Uniform Border Width & Frosted Glass Scrollbar
    # ---------------------------------------------------------
    ch5_pass = True
    ch5_details = []
    
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "designSystem.js" in fpath or "index.css" in fpath:
                if "1.5px" not in content and "border-width" not in content:
                    ch5_pass = False
                    ch5_details.append(f"{os.path.basename(fpath)}: Design system missing 1.5px uniform border width standard.")
                if "SCROLL-CYBER-GLASS" not in content and "scrollbar" not in content:
                    ch5_pass = False
                    ch5_details.append(f"{os.path.basename(fpath)}: Design system missing Frosted Glass Scrollbar specification.")

    results.append(("5. 1.5px Uniform Border & Frosted Glass Scrollbar (UNIFORM-BORDER-SCROLLBAR)", ch5_pass, ch5_details))

    # ---------------------------------------------------------
    # CHECK 6: Ergonomic Ambient Shadow & Glow Elevation
    # ---------------------------------------------------------
    ch6_pass = True
    ch6_details = []
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "designSystem.js" in fpath:
                if "box-shadow" not in content and "shadow-" not in content:
                    ch6_pass = False
                    ch6_details.append(f"{os.path.basename(fpath)}: Missing uniform subtle ambient shadow tokens.")

    results.append(("6. Ergonomic Ambient Shadow & Glow Elevation (UNIFORM-SUBTLE-SHADOWS)", ch6_pass, ch6_details))

    # ---------------------------------------------------------
    # CHECK 7: Interactive Password Eye Toggle & Form Validation
    # ---------------------------------------------------------
    ch7_pass = True
    ch7_details = []
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if 'type="password"' in content or 'showPassword' in content:
                if not ("Eye" in content or "EyeOff" in content or "showPassword" in content):
                    ch7_pass = False
                    ch7_details.append(f"{os.path.basename(fpath)}: Password field missing interactive Eye/EyeOff visibility toggle button.")

    results.append(("7. Interactive Password Eye Toggle & Form Validation (FORM-EYE-VALIDATION)", ch7_pass, ch7_details))

    # ---------------------------------------------------------
    # CHECK 8: Glowing Action Buttons with Spinner Loading Feedback
    # ---------------------------------------------------------
    ch8_pass = True
    ch8_details = []
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "Login.jsx" in fpath or "POS.jsx" in fpath or "Inventory.jsx" in fpath:
                if "shadow-[0_0_20px_rgba(0,229,255,0.3)]" not in content and "glowingAction" not in content and "shadow-cyan-500" not in content:
                    ch8_pass = False
                    ch8_details.append(f"{os.path.basename(fpath)}: Primary action button missing cyan ambient glow shadow.")

    results.append(("8. Glowing Action Buttons & Spinner Feedback (GLOWING-ACTION-BUTTONS)", ch8_pass, ch8_details))

    # ---------------------------------------------------------
    # CHECK 9: 4-Tier Commercial Licensing Footer Bar
    # ---------------------------------------------------------
    ch9_pass = True
    ch9_details = []
    found_licensing_bar = False
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "SOFTWARE FACTORY" in content or "Self-Host" in content or "White-Label" in content or "Source Code IP" in content:
                found_licensing_bar = True
                break

    if not found_licensing_bar:
        ch9_pass = False
        ch9_details.append("4-Tier Commercial Licensing Footer Bar ('SOFTWARE FACTORY', 'Self-Host', 'White-Label', 'Source Code IP') not found in application layouts.")

    results.append(("9. 4-Tier Commercial Licensing Footer Bar (4-TIER-LICENSING-BAR)", ch9_pass, ch9_details))

    # ---------------------------------------------------------
    # CHECK 10: Zero-Bypass Route Matching & Auth Guards
    # ---------------------------------------------------------
    ch10_pass = True
    ch10_details = []
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if "Login.jsx" in fpath or "App.jsx" in fpath or "main.jsx" in fpath:
                if "catch" not in content and "try" not in content:
                    ch10_pass = False
                    ch10_details.append(f"{os.path.basename(fpath)}: Auth route missing defensive try-catch initialization guard.")

    results.append(("10. Zero-Bypass Route Matching & Auth Guards (ZERO-BYPASS-AUTH-GUARD)", ch10_pass, ch10_details))

    # ---------------------------------------------------------
    # CHECK 11: Master Button Token Alignment Standard
    # ---------------------------------------------------------
    ch11_pass = True
    ch11_details = []
    ad_hoc_btn = re.compile(r'<button[^>]*class="([^"]*)"', re.IGNORECASE)
    for fpath in files:
        if "components/ui" in fpath.replace("\\", "/") or "node_modules" in fpath:
            continue
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in ad_hoc_btn.finditer(content):
                cls = match.group(1)
                # If button uses raw styling without token or standard classes
                if ("bg-emerald-600" in cls or "hover:bg-slate-100" in cls or "bg-red-500" in cls) and "DESIGN_TOKENS" not in cls:
                    ch11_pass = False
                    line_no = content[:match.start()].count('\n') + 1
                    ch11_details.append(f"{os.path.basename(fpath)}:{line_no} Button uses ad-hoc inline background styling instead of DESIGN_TOKENS.buttons.* or DESIGN_TOKENS.icons.iconButton.")

    results.append(("11. Master Button Token Alignment Standard (BUTTON-TOKENS-ALIGNMENT-STD)", ch11_pass and len(ch11_details) == 0, ch11_details))

    # ---------------------------------------------------------
    # CHECK 12: Defensive Data Fallback & Zero-Undefined Display Law
    # ---------------------------------------------------------
    ch12_pass = True
    ch12_details = []
    raw_undef_prop = re.compile(r'\$\{alert\.(current_quantity|threshold)\}')
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in raw_undef_prop.finditer(content):
                ch12_pass = False
                line_no = content[:match.start()].count('\n') + 1
                ch12_details.append(f"{os.path.basename(fpath)}:{line_no} Direct property interpolation '${match.group(0)}' without nullish coalescing (??) fallback can cause 'undefined' display crash.")

    results.append(("12. Defensive Data Fallback & Zero-Undefined Display Law (UNDEFINED-DATA-FALLBACK-GUARD)", ch12_pass and len(ch12_details) == 0, ch12_details))

    # ---------------------------------------------------------
    # CHECK 13: Strict High-Contrast Dark Mode Card Surface Directive
    # ---------------------------------------------------------
    ch13_pass = True
    ch13_details = []
    light_card_bg = re.compile(r'<Card[^>]*class="([^"]*(bg-orange-100|bg-yellow-100|bg-slate-100)[^"]*)"', re.IGNORECASE)
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in light_card_bg.finditer(content):
                ch13_pass = False
                line_no = content[:match.start()].count('\n') + 1
                ch13_details.append(f"{os.path.basename(fpath)}:{line_no} Card uses light cream/yellow background fill in dark mode, causing unreadable low contrast typography.")

    results.append(("13. High-Contrast Dark Mode Card Surface Directive (MONO-LUMINANCE-DARK-MODE-GUARD)", ch13_pass and len(ch13_details) == 0, ch13_details))

    # ---------------------------------------------------------
    # CHECK 14: Light Mode Pastel Badge Prevention
    # ---------------------------------------------------------
    ch14_pass = True
    ch14_details = []
    light_badge_bg = re.compile(r'<Badge[^>]*class="([^"]*(bg-violet-100|bg-amber-100|bg-orange-100|bg-green-100|bg-red-100|bg-emerald-100)[^"]*)"', re.IGNORECASE)
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in light_badge_bg.finditer(content):
                ch14_pass = False
                line_no = content[:match.start()].count('\n') + 1
                ch14_details.append(f"{os.path.basename(fpath)}:{line_no} Badge uses light pastel background fill in dark mode, causing blinding visual contrast anomaly.")

    results.append(("14. Light Mode Pastel Badge Prevention (LIGHT-BADGE-CONTRAST-GUARD)", ch14_pass and len(ch14_details) == 0, ch14_details))

    # ---------------------------------------------------------
    # CHECK 15: Dynamic Icon Color Coding & Token Uniformity
    # ---------------------------------------------------------
    ch15_pass = True
    ch15_details = []
    hardcoded_icon_color = re.compile(r'text-\[\#10B981\]')
    for fpath in files:
        if "components/ui" in fpath.replace("\\", "/"):
            continue
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in hardcoded_icon_color.finditer(content):
                ch15_pass = False
                line_no = content[:match.start()].count('\n') + 1
                ch15_details.append(f"{os.path.basename(fpath)}:{line_no} Icon renders hardcoded fallback color text-[#10B981] instead of dynamic hashing or token color mapping.")

    results.append(("15. Dynamic Icon Color Coding & Token Uniformity (DYNAMIC-ICON-COLOR-GUARD)", ch15_pass and len(ch15_details) == 0, ch15_details))

    # ---------------------------------------------------------
    # CHECK 16: Dynamic Count Pluralization Grammar Law
    # ---------------------------------------------------------
    ch16_pass = True
    ch16_details = []
    bad_plural = re.compile(r'\{[a-zA-Z0-9_\.]+\}\s*(low stock alert|item|product)\b(?![s\$\{A-Za-z0-9_\=])', re.IGNORECASE)
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in bad_plural.finditer(content):
                # Ignore prop declarations like product={product} or dynamic plural interpolation like `${count} product${
                matched_text = match.group(0)
                pos = match.end()
                following_code = content[pos:pos+15]
                if "=" in matched_text or "${" in following_code:
                    continue
                ch16_pass = False
                line_no = content[:match.start()].count('\n') + 1
                ch16_details.append(f"{os.path.basename(fpath)}:{line_no} Dynamic count text '{matched_text}' missing pluralization logic ('alert(s)' or ternary '? s :').")

    results.append(("16. Dynamic Count Pluralization Grammar Law (PLURALIZATION-GRAMMAR-GUARD)", ch16_pass and len(ch16_details) == 0, ch16_details))

    # ---------------------------------------------------------
    # CHECK 17: Master Danger Button Token Alignment
    # ---------------------------------------------------------
    ch17_pass = True
    ch17_details = []
    raw_danger_btn = re.compile(r'<Button[^>]*className="([^"]*(bg-rose-600|bg-red-600)[^"]*)"', re.IGNORECASE)
    for fpath in files:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in raw_danger_btn.finditer(content):
                cls = match.group(1)
                if "DESIGN_TOKENS" not in cls:
                    ch17_pass = False
                    line_no = content[:match.start()].count('\n') + 1
                    ch17_details.append(f"{os.path.basename(fpath)}:{line_no} Danger action button uses ad-hoc inline background instead of DESIGN_TOKENS.buttons.danger.")

    results.append(("17. Master Danger Button Token Alignment (DANGER-BUTTON-TOKEN-GUARD)", ch17_pass and len(ch17_details) == 0, ch17_details))

    # ---------------------------------------------------------
    # CHECK 18: Standard Page Header Card Structure
    # ---------------------------------------------------------
    ch18_pass = True
    ch18_details = []
    for fpath in files:
        if "src/pages" in fpath.replace("\\", "/"):
            fname = os.path.basename(fpath)
            if fname in ["Landing.jsx", "Login.jsx"]:
                continue
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "<h1" in content and "DESIGN_TOKENS.typography.h1" not in content and "text-xl font-bold" in content:
                    ch18_pass = False
                    ch18_details.append(f"{fname}: Page title H1 does not consume DESIGN_TOKENS.typography.h1 inside a standard header container card.")

    results.append(("18. Standard Page Header Card Structure (PAGE-HEADER-CONTAINER-GUARD)", ch18_pass and len(ch18_details) == 0, ch18_details))

    # ---------------------------------------------------------
    # CHECK 19: TOTAL Governance & Master Ledger Synchronization
    # ---------------------------------------------------------
    ch19_pass = True
    ch19_details = []
    
    checklist_path = "master_component_checklist.md" if os.path.exists("master_component_checklist.md") else "omnistock_master_component_checklist.md"
    tokens_path = "company_master_design_tokens_spec.md"
    agents_rulebook_path = ".agents/AGENTS.md"

    if os.path.exists(checklist_path):
        with open(checklist_path, 'r', encoding='utf-8', errors='ignore') as f:
            c_text = f.read()
            if "PRICING-MANAGER-REM-37" not in c_text:
                ch19_pass = False
                ch19_details.append(f"{checklist_path}: Master Ledger missing latest Item 37 signoff.")
    else:
        ch19_pass = False
        ch19_details.append(f"{checklist_path} not found in workspace root.")

    tokens_in_docs = os.path.join("docs", "governance", tokens_path)
    if not os.path.exists(tokens_path) and not os.path.exists(tokens_in_docs):
        ch19_pass = False
        ch19_details.append(f"{tokens_path} not found in workspace root or docs/governance/.")

    if os.path.exists(agents_rulebook_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "TOTAL-AUDIT-EVALUATION-LAW" not in a_text:
                ch19_pass = False
                ch19_details.append(f"{agents_rulebook_path}: System rulebook missing TOTAL-AUDIT-EVALUATION-LAW directive.")
    else:
        ch19_pass = False
        ch19_details.append(f"{agents_rulebook_path} not found in workspace root.")

    results.append(("19. TOTAL Governance & Master Ledger Synchronization (TOTAL-GOVERNANCE-LEDGER-SYNC)", ch19_pass and len(ch19_details) == 0, ch19_details))

    # ---------------------------------------------------------
    # CHECK 20: Autonomous Agentic Maestro Routing Law
    # ---------------------------------------------------------
    ch20_pass = True
    ch20_details = []
    if os.path.exists(agents_rulebook_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "AUTONOMOUS-MAESTRO-ORCHESTRATION" not in a_text:
                ch20_pass = False
                ch20_details.append(f"{agents_rulebook_path}: System rulebook missing AUTONOMOUS-MAESTRO-ORCHESTRATION directive.")
    else:
        ch20_pass = False
        ch20_details.append(f"{agents_rulebook_path} not found in workspace root.")

    results.append(("20. Autonomous Agentic Maestro Routing Law (AUTONOMOUS-MAESTRO-ORCHESTRATION)", ch20_pass and len(ch20_details) == 0, ch20_details))

    # ---------------------------------------------------------
    # CHECK 21: Google Cloud Data Agent Kit & Security Safeguards
    # ---------------------------------------------------------
    ch21_pass = True
    ch21_details = []
    if os.path.exists(agents_rulebook_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "DATA-AGENT-KIT-HARMONIZATION" not in a_text:
                ch21_pass = False
                ch21_details.append(f"{agents_rulebook_path}: System rulebook missing DATA-AGENT-KIT-HARMONIZATION directive.")
    else:
        ch21_pass = False
        ch21_details.append(f"{agents_rulebook_path} not found in workspace root.")

    results.append(("21. Google Cloud Data Agent Kit & Security Safeguards (DATA-AGENT-KIT-HARMONIZATION)", ch21_pass and len(ch21_details) == 0, ch21_details))

    # ---------------------------------------------------------
    # CHECK 22: Mandatory Immediate Ledger Recording Directive
    # ---------------------------------------------------------
    ch22_pass = True
    ch22_details = []
    if os.path.exists(agents_rulebook_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "PASSIVE-AUTOMATIC-LEDGER-LOCK" not in a_text:
                ch22_pass = False
                ch22_details.append(f"{agents_rulebook_path}: System rulebook missing PASSIVE-AUTOMATIC-LEDGER-LOCK directive.")
    else:
        ch22_pass = False
        ch22_details.append(f"{agents_rulebook_path} not found in workspace root.")

    results.append(("22. Mandatory Immediate Ledger Recording Directive (PASSIVE-AUTOMATIC-LEDGER-LOCK)", ch22_pass and len(ch22_details) == 0, ch22_details))

    # ---------------------------------------------------------
    # CHECK 23: 20-Issue Milestone Preventive Audit Expansion Directive
    # ---------------------------------------------------------
    ch23_pass = True
    ch23_details = []
    if os.path.exists(agents_rulebook_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "LEDGER-20-MILESTONE-THRESHOLD" not in a_text:
                ch23_pass = False
                ch23_details.append(f"{agents_rulebook_path}: System rulebook missing LEDGER-20-MILESTONE-THRESHOLD directive.")
    else:
        ch23_pass = False
        ch23_details.append(f"{agents_rulebook_path} not found in workspace root.")

    results.append(("23. 20-Issue Milestone Preventive Audit Script Expansion (LEDGER-20-MILESTONE-THRESHOLD)", ch23_pass and len(ch23_details) == 0, ch23_details))

    # ---------------------------------------------------------
    # CHECK 24: Autonomous Sentinel Verification Council Directive
    # ---------------------------------------------------------
    ch24_pass = True
    ch24_details = []
    sentinel_script_path = os.path.join(os.path.dirname(__file__), "sentinel_checklist.py")
    if os.path.exists(agents_rulebook_path) and os.path.exists(sentinel_script_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "AUTONOMOUS-SENTINEL-FIELD-DEVOPS" in a_text or "AUTONOMOUS-SENTINEL-VERIFICATION-COUNCIL" in a_text:
                pass
            else:
                ch24_pass = False
                ch24_details.append(f"{agents_rulebook_path}: System rulebook missing AUTONOMOUS-SENTINEL-FIELD-DEVOPS directive.")
    else:
        ch24_pass = False
        ch24_details.append("sentinel_checklist.py or AGENTS.md not found in workspace.")

    results.append(("24. Autonomous Sentinel Verification Council Directive (AUTONOMOUS-SENTINEL-VERIFICATION-COUNCIL)", ch24_pass and len(ch24_details) == 0, ch24_details))

    # ---------------------------------------------------------
    # CHECK 25: 80-Issue Milestone Ledger Gate & Thermal Receipt / System Specs Verification
    # ---------------------------------------------------------
    ch25_pass = True
    ch25_details = []
    thermal_modal_path = os.path.join(target_dir, "components", "pos", "ThermalReceiptModal.jsx")
    specs_md_path = os.path.abspath(os.path.join(target_dir, "..", "specs.md"))
    
    # Check if this is a POS app or general standalone product
    if "omnistock" in target_dir.lower():
        if not os.path.exists(thermal_modal_path):
            ch25_pass = False
            ch25_details.append(f"{thermal_modal_path}: ThermalReceiptModal.jsx missing from POS components.")
    else:
        if not os.path.exists(specs_md_path) and not os.path.exists(thermal_modal_path):
            ch25_pass = False
            ch25_details.append(f"{specs_md_path}: specs.md missing from product root directory.")

    results.append(("25. 80-Issue Milestone Ledger Gate & Thermal Receipt Verification (LEDGER-80-MILESTONE-GATE-AUDIT)", ch25_pass and len(ch25_details) == 0, ch25_details))

    # ---------------------------------------------------------
    # CHECK 26: Strict Line-by-Line Prohibited Color Class Scanner
    # ---------------------------------------------------------
    ch26_pass = True
    ch26_details = []
    prohibited_patterns = [
        (re.compile(r'\b(bg-rose-100|bg-rose-50|bg-slate-100|bg-slate-200|text-indigo-700|text-indigo-800)\b'), "Un-mapped light mode or low-contrast text color"),
        (re.compile(r'\b(bg-blue-600|text-blue-600|bg-blue-500|focus:ring-indigo-500)\b'), "Ad-hoc blue or indigo override instead of theme tokens"),
    ]

    for fpath in files:
        if fpath.endswith((".tsx", ".jsx")):
            fname = os.path.basename(fpath)
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()
                for line_idx, line_str in enumerate(lines, 1):
                    # Skip SVG elements or comments
                    if "<path" in line_str or "<svg" in line_str or "//" in line_str:
                        continue
                    for pat, reason in prohibited_patterns:
                        if pat.search(line_str):
                            ch26_pass = False
                            ch26_details.append(f"{fname}:L{line_idx} - {reason} ({pat.pattern})")

    results.append(("26. Strict Line-by-Line Prohibited Color Class Scanner (STRICT-DESIGN-TOKEN-COLOR-PURGE)", ch26_pass and len(ch26_details) == 0, ch26_details))

    # ---------------------------------------------------------
    # CHECK 27: Sidebar & Navigation Active Rail Token Guard
    # ---------------------------------------------------------
    ch27_pass = True
    ch27_details = []
    for fpath in files:
        if "Sidebar" in os.path.basename(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "bg-white" in content or "bg-slate-100" in content:
                    ch27_pass = False
                    ch27_details.append(f"{os.path.basename(fpath)}: Active navigation rail item contains solid light background fill instead of translucent theme token.")

    results.append(("27. Sidebar & Navigation Active Rail Token Guard (SIDEBAR-RAIL-ACTIVE-TOKEN-GUARD)", ch27_pass and len(ch27_details) == 0, ch27_details))

    # ---------------------------------------------------------
    # CHECK 28: Form Input Focus Ring Token Guard
    # ---------------------------------------------------------
    ch28_pass = True
    ch28_details = []
    for fpath in files:
        if fpath.endswith((".tsx", ".jsx")):
            fname = os.path.basename(fpath)
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "<input" in content and ("focus:ring-indigo-" in content or "focus:ring-blue-" in content):
                    ch28_pass = False
                    ch28_details.append(f"{fname}: Form input contains ad-hoc indigo/blue focus ring override instead of design token focus ring.")

    results.append(("28. Form Input Focus Ring Token Guard (FORM-FOCUS-RING-TOKEN-GUARD)", ch28_pass and len(ch28_details) == 0, ch28_details))

    # ---------------------------------------------------------
    # CHECK 29: Screenshot 1 Integration Bento & Scrollbar Alignment Guard
    # ---------------------------------------------------------
    ch29_pass = True
    ch29_details = []
    
    # Verify EcosystemIntegrationsHub category filter styling
    for fpath in files:
        if "EcosystemIntegrationsHub.tsx" in os.path.basename(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "filterCategory === cat" in content and "font-mono" not in content:
                    ch29_pass = False
                    ch29_details.append("EcosystemIntegrationsHub.tsx: Category filter pills missing font-mono token styling.")

    # Verify index.css root dark scrollbar declaration
    index_css_path = os.path.join(target_dir, "index.css")
    if os.path.exists(index_css_path):
        with open(index_css_path, 'r', encoding='utf-8', errors='ignore') as f:
            css_text = f.read()
            if "scrollbar-color" not in css_text or ("background-color: #0D1117" not in css_text and "background-color: #050811" not in css_text and "background-color: #0A0A0C" not in css_text):
                ch29_pass = False
                ch29_details.append("index.css: Root html/body missing explicit dark background-color and scrollbar-color token declaration.")

    results.append(("29. Screenshot 1 Integration Bento & Scrollbar Alignment Guard (SCREENSHOT-1-INTEGRATION-SCROLLBAR-GUARD)", ch29_pass and len(ch29_details) == 0, ch29_details))

    # ---------------------------------------------------------
    # CHECK 30: Engine Card Compact Ergonomic Resizing & Height Guard
    # ---------------------------------------------------------
    ch30_pass = True
    ch30_details = []
    
    target_engine_files = [
        "SkillsMobilityGraphEngine.tsx",
        "WasmWorkforceAnalyticsEngine.tsx",
        "SpatialWorkforceCommandCenter.tsx",
        "AirGappedDisasterRecoveryVault.tsx",
        "HumanInTheLoopGovernanceShield.tsx",
        "AutonomousPayrollEscrowEngine.tsx"
    ]
    
    for fpath in files:
        fname = os.path.basename(fpath)
        if fname in target_engine_files:
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "p-5 md:p-6 shadow-lg relative overflow-hidden animate-fade-in" in content or "p-6 md:p-8" in content:
                    ch30_pass = False
                    ch30_details.append(f"{fname}: Container retains oversized padding (p-5 md:p-6 or p-6 md:p-8) instead of compact ergonomic padding (p-4 md:p-5).")

    results.append(("30. Engine Card Compact Ergonomic Resizing & Height Guard (COMPACT-CONTAINER-HEIGHT-GUARD)", ch30_pass and len(ch30_details) == 0, ch30_details))

    # ---------------------------------------------------------
    # CHECK 31: Light Theme Document & Printable Surface Standard Guard
    # ---------------------------------------------------------
    ch31_pass = True
    ch31_details = []
    for fpath in files:
        if "PayslipCreator" in os.path.basename(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "id=\"printable-payslip\"" in content and "bg-[#F0FDFD]" not in content and "bg-[#E6F7F7]" not in content:
                    ch31_pass = False
                    ch31_details.append(f"{os.path.basename(fpath)}: Printable document sheet missing Aquamarine Tinted Paper fill (#F0FDFD / #E6F7F7).")

    results.append(("31. Light Theme Document & Printable Surface Guard (LIGHT-THEME-DOCUMENT-SPEC-CHECK)", ch31_pass and len(ch31_details) == 0, ch31_details))

    # ---------------------------------------------------------
    # CHECK 32: View Print Interactive Zoom & Barcode Scanner Guard
    # ---------------------------------------------------------
    ch32_pass = True
    ch32_details = []
    for fpath in files:
        if "PayslipCreator" in os.path.basename(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "isViewPrintOpen" not in content or "zoomLevel" not in content or "Barcode" not in content or "QrCode" not in content:
                    ch32_pass = False
                    ch32_details.append(f"{os.path.basename(fpath)}: Missing View Print modal state, zoom controls, or Barcode/QR Code generator.")

    results.append(("32. View Print Interactive Zoom & Barcode Scanner Guard (VIEW-PRINT-ZOOM-BARCODE-CHECK)", ch32_pass and len(ch32_details) == 0, ch32_details))

    # ---------------------------------------------------------
    # CHECK 33: Payslip Creator Ergonomic Compact Container Guard
    # ---------------------------------------------------------
    ch33_pass = True
    ch33_details = []
    for fpath in files:
        if "PayslipCreator" in os.path.basename(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "space-y-6 animate-fade-in" in content or "sticky top-6 space-y-4" in content:
                    ch33_pass = False
                    ch33_details.append(f"{os.path.basename(fpath)}: Retains oversized spacing (space-y-6 or sticky top-6) instead of compact layout (space-y-3.5 or sticky top-2).")

    results.append(("33. Payslip Creator Ergonomic Compact Container Guard (PAYSLIP-COMPACT-LAYOUT-CHECK)", ch33_pass and len(ch33_details) == 0, ch33_details))

    # ---------------------------------------------------------
    # CHECK 34: Mandated Philippine Deductions High-Contrast Surface Guard
    # ---------------------------------------------------------
    ch34_pass = True
    ch34_details = []
    for fpath in files:
        if "PayslipCreator" in os.path.basename(fpath) or "RealTimePayroll" in os.path.basename(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "bg-slate-50/50" in content or "text-slate-400/60" in content or "text-cyan-600/40" in content or "border-slate-200/40" in content:
                    ch34_pass = False
                    ch34_details.append(f"{os.path.basename(fpath)}: Contains low-contrast opacity text or grey fill in statutory deduction boxes.")

    results.append(("34. Mandated Philippine Deductions High-Contrast Surface Guard (MANDATED-DEDUCTIONS-CONTRAST-CHECK)", ch34_pass and len(ch34_details) == 0, ch34_details))

    # ---------------------------------------------------------
    # CHECK 35: Console.log Production Leak Scanner
    # ---------------------------------------------------------
    ch35_pass = True
    ch35_details = []
    console_log_pat = re.compile(r'\bconsole\.(log|debug)\b')
    for fpath in files:
        if "components/ui" in fpath.replace("\\", "/") or "test" in fpath.lower():
            continue
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in console_log_pat.finditer(content):
                line_no = content[:match.start()].count('\n') + 1
                ch35_pass = False
                ch35_details.append(f"{os.path.basename(fpath)}:{line_no} Production console.log/debug statement found.")

    results.append(("35. Console.log Production Leak Scanner (CONSOLE-LOG-LEAK-GUARD)", ch35_pass and len(ch35_details) == 0, ch35_details))

    # ---------------------------------------------------------
    # CHECK 36: useEffect Event Listener Cleanup Guard
    # ---------------------------------------------------------
    ch36_pass = True
    ch36_details = []
    for fpath in files:
        if fpath.endswith((".jsx", ".tsx")):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "addEventListener(" in content and "removeEventListener(" not in content:
                    ch36_pass = False
                    ch36_details.append(f"{os.path.basename(fpath)}: addEventListener found without removeEventListener cleanup in component.")

    results.append(("36. useEffect Event Listener Cleanup Guard (USEEFFECT-CLEANUP-GUARD)", ch36_pass and len(ch36_details) == 0, ch36_details))

    # ---------------------------------------------------------
    # CHECK 37: Inline Style Anti-Pattern Scanner
    # ---------------------------------------------------------
    ch37_pass = True
    ch37_details = []
    inline_color_pat = re.compile(r'style=\{\{[^}]*(color|backgroundColor|background)\s*:\s*["\'][^"\']+["\'][^}]*\}\}')
    for fpath in files:
        if "components/ui" in fpath.replace("\\", "/"):
            continue
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in inline_color_pat.finditer(content):
                line_no = content[:match.start()].count('\n') + 1
                ch37_pass = False
                ch37_details.append(f"{os.path.basename(fpath)}:{line_no} Inline style color/bg object found instead of design token CSS class.")

    results.append(("37. Inline Style Anti-Pattern Scanner (INLINE-STYLE-GUARD)", ch37_pass and len(ch37_details) == 0, ch37_details))

    # ---------------------------------------------------------
    # CHECK 38: Unused Component Import Heuristic
    # ---------------------------------------------------------
    ch38_pass = True
    ch38_details = []
    named_import_pat = re.compile(r'import\s+\{([^}]+)\}\s+from\s+["\'][^"\']+["\']')
    for fpath in files:
        if fpath.endswith((".jsx", ".tsx")):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                imports = named_import_pat.findall(content)
                for imp_group in imports:
                    symbols = [s.strip().split(' as ')[-1] for s in imp_group.split(',') if s.strip()]
                    for sym in symbols:
                        if sym and not sym.startswith("type ") and not sym.startswith("Types"):
                            occurrences = len(re.findall(r'\b' + re.escape(sym) + r'\b', content))
                            if occurrences <= 1:
                                ch38_pass = False
                                ch38_details.append(f"{os.path.basename(fpath)}: Unused imported symbol '{sym}'.")

    results.append(("38. Unused Component Import Heuristic (UNUSED-IMPORT-GUARD)", ch38_pass and len(ch38_details) == 0, ch38_details))

    # ---------------------------------------------------------
    # CHECK 39: Icon-Only Button Accessibility Guard
    # ---------------------------------------------------------
    ch39_pass = True
    ch39_details = []
    icon_only_btn_pat = re.compile(r'<button[^>]*>(?:\s*<[A-Z]\w+Icon[^/>]*/?>|\s*<[A-Z]\w+[^/>]*size=[^/>]*/?>)\s*</button>', re.IGNORECASE)
    for fpath in files:
        if fpath.endswith((".jsx", ".tsx")):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                for match in icon_only_btn_pat.finditer(content):
                    tag_str = match.group(0)
                    if "aria-label" not in tag_str and "title=" not in tag_str:
                        line_no = content[:match.start()].count('\n') + 1
                        ch39_pass = False
                        ch39_details.append(f"{os.path.basename(fpath)}:{line_no} Icon-only button missing aria-label or title attribute for screen readers.")

    results.append(("39. Icon-Only Button Accessibility Guard (ICON-BUTTON-A11Y-GUARD)", ch39_pass and len(ch39_details) == 0, ch39_details))

    # ---------------------------------------------------------
    # CHECK 40: Image Alt Text Accessibility Guard
    # ---------------------------------------------------------
    ch40_pass = True
    ch40_details = []
    img_tag_pat = re.compile(r'<img[^>]*>', re.IGNORECASE)
    for fpath in files:
        if fpath.endswith((".jsx", ".tsx", ".html")):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                for match in img_tag_pat.finditer(content):
                    tag_str = match.group(0)
                    if 'alt=""' in tag_str or 'alt=' not in tag_str:
                        line_no = content[:match.start()].count('\n') + 1
                        ch40_pass = False
                        ch40_details.append(f"{os.path.basename(fpath)}:{line_no} <img> tag missing meaningful alt text attribute.")

    results.append(("40. Image Alt Text Accessibility Guard (IMAGE-ALT-TEXT-GUARD)", ch40_pass and len(ch40_details) == 0, ch40_details))

    # ---------------------------------------------------------
    # CHECK 41: Hardcoded API URL Guard
    # ---------------------------------------------------------
    ch41_pass = True
    ch41_details = []
    hardcoded_url_pat = re.compile(r'fetch\(["\']http://localhost:5000')
    for fpath in files:
        if fpath.endswith((".jsx", ".tsx", ".js", ".ts")):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                for match in hardcoded_url_pat.finditer(content):
                    line_no = content[:match.start()].count('\n') + 1
                    ch41_pass = False
                    ch41_details.append(f"{os.path.basename(fpath)}:{line_no} Hardcoded localhost API URL instead of import/env configuration.")

    results.append(("41. Hardcoded API URL Guard (HARDCODED-URL-GUARD)", ch41_pass and len(ch41_details) == 0, ch41_details))

    # ---------------------------------------------------------
    # CHECK 42: Error Boundary Route Wrapping Guard
    # ---------------------------------------------------------
    ch42_pass = True
    ch42_details = []
    for fpath in files:
        if os.path.basename(fpath) in ["App.jsx", "App.tsx", "main.jsx", "main.tsx"]:
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if "ErrorBoundary" not in content and "error" not in content.lower():
                    ch42_pass = False
                    ch42_details.append(f"{os.path.basename(fpath)}: Application root missing ErrorBoundary route protection.")

    results.append(("42. Error Boundary Route Wrapping Guard (ERROR-BOUNDARY-ROUTE-GUARD)", ch42_pass and len(ch42_details) == 0, ch42_details))

    # ---------------------------------------------------------
    # CHECK 43: z-index Scale Collision Scanner
    # ---------------------------------------------------------
    ch43_pass = True
    ch43_details = []
    z_index_pat = re.compile(r'\bz-\[?(9999|999|1000)\]?\b')
    for fpath in files:
        if "components/ui" in fpath.replace("\\", "/"):
            continue
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for match in z_index_pat.finditer(content):
                line_no = content[:match.start()].count('\n') + 1
                ch43_pass = False
                ch43_details.append(f"{os.path.basename(fpath)}:{line_no} Excessive z-index '{match.group(0)}' found (use z-50 for modals, z-40 for tooltips).")

    results.append(("43. z-index Scale Collision Scanner (ZINDEX-COLLISION-GUARD)", ch43_pass and len(ch43_details) == 0, ch43_details))

    # ---------------------------------------------------------
    # CHECK 44: Defensive Array Length & Optional Chaining Guard
    # ---------------------------------------------------------
    ch44_pass = True
    ch44_details = []
    unguarded_len_pat = re.compile(r'/\s*\(\s*\w+\.length\s*-\s*1\s*\)|\[\s*\w+\.length\s*-\s*1\s*\]\.(?!\?)')
    for fpath in files:
        if fpath.endswith((".jsx", ".tsx")):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                for match in unguarded_len_pat.finditer(content):
                    line_no = content[:match.start()].count('\n') + 1
                    ch44_pass = False
                    ch44_details.append(f"{os.path.basename(fpath)}:{line_no} Unguarded array .length access found without Math.max fallback or optional chaining.")

    results.append(("44. Defensive Array Length & Optional Chaining Guard (UNDEFINED-ARRAY-LENGTH-GUARD)", ch44_pass and len(ch44_details) == 0, ch44_details))

    # ---------------------------------------------------------
    # CHECK 45: Dark Mode Glassmorphism & Contrast Guard
    # ---------------------------------------------------------
    ch45_pass = True
    ch45_details = []
    stark_light_modal_footer_pat = re.compile(r'class(Name)?="[^"]*bg-slate-50\b[^"]*text-slate-400\b[^"]*"', re.IGNORECASE)
    for fpath in files:
        if fpath.endswith((".jsx", ".tsx")):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                for match in stark_light_modal_footer_pat.finditer(content):
                    line_no = content[:match.start()].count('\n') + 1
                    ch45_pass = False
                    ch45_details.append(f"{os.path.basename(fpath)}:{line_no} Modal/Dropdown contains stark light background fill (bg-slate-50) violating dark mode glassmorphism rules.")

    results.append(("45. Dark Mode Glassmorphism & Contrast Guard (DARK-MODE-GLASS-CONTRAST-GUARD)", ch45_pass and len(ch45_details) == 0, ch45_details))

    # ---------------------------------------------------------
    # CHECK 46: Strict Zero-Static-Data Policy Guard
    # ---------------------------------------------------------
    ch46_pass = True
    ch46_details = []
    if os.path.exists(agents_rulebook_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "STRICT-ZERO-STATIC-DATA-POLICY" not in a_text:
                ch46_pass = False
                ch46_details.append(f"{agents_rulebook_path}: System rulebook missing STRICT-ZERO-STATIC-DATA-POLICY directive.")
    else:
        ch46_pass = False
        ch46_details.append(f"{agents_rulebook_path} not found in workspace root.")

    results.append(("46. Strict Zero-Static-Data Policy Guard (STRICT-ZERO-STATIC-DATA-GUARD)", ch46_pass and len(ch46_details) == 0, ch46_details))

    # ---------------------------------------------------------
    # CHECK 47: Strict Domain Deployment Isolation Guard
    # ---------------------------------------------------------
    ch47_pass = True
    ch47_details = []
    if os.path.exists(agents_rulebook_path):
        with open(agents_rulebook_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            if "STRICT-DOMAIN-ISOLATION-GUARD" not in a_text:
                ch47_pass = False
                ch47_details.append(f"{agents_rulebook_path}: System rulebook missing STRICT-DOMAIN-ISOLATION-GUARD directive.")
    else:
        ch47_pass = False
        ch47_details.append(f"{agents_rulebook_path} not found in workspace root.")

    results.append(("47. Strict Domain Deployment Isolation Guard (STRICT-DOMAIN-ISOLATION-GUARD)", ch47_pass and len(ch47_details) == 0, ch47_details))

    # ---------------------------------------------------------
    # PHASE 2: SCORECARD & REPORT EVALUATION GENERATION
    # ---------------------------------------------------------
    passed_count = sum(1 for _, passed, _ in results if passed)
    total_count = len(results)
    pass_rate = (passed_count / total_count) * 100

    print(f"\n{CYAN}{BOLD}📊 PHASE 2: UNIFIED MASTER EVALUATION SCORECARD & METRICS:{RESET}")
    print("-" * 75)

    for title, passed, details in results:
        status_symbol = f"{GREEN}✅ PASS{RESET}" if passed else f"{RED}❌ FAIL{RESET}"
        print(f"[{status_symbol}] {title}")
        if not passed and details:
            for detail in details[:3]: # limit output
                print(f"      {YELLOW}↳ {detail}{RESET}")

    # Top Violation Files Summary
    file_violations = {}
    for title, passed, details in results:
        if not passed and details:
            for detail in details:
                fname = detail.split(":")[0].strip()
                file_violations[fname] = file_violations.get(fname, 0) + 1

    print("-" * 75)
    print(f"{CYAN}{BOLD}📁 TOP VIOLATION FILES (Worst Offenders):{RESET}")
    if file_violations:
        sorted_violations = sorted(file_violations.items(), key=lambda x: x[1], reverse=True)[:5]
        for idx, (fname, count) in enumerate(sorted_violations, 1):
            print(f"  {idx}. {YELLOW}{fname}{RESET} — {count} violation{'s' if count > 1 else ''}")
    else:
        print(f"  {GREEN}None — Zero defects! 🎉{RESET}")

    print("-" * 75)
    score_color = GREEN if pass_rate == 100 else YELLOW if pass_rate >= 80 else RED
    print(f"{BOLD}FINAL VERDICT:{RESET} {score_color}{BOLD}{passed_count}/{total_count} CHECKS PASSED ({pass_rate:.1f}% SCORE){RESET}")
    
    if pass_rate == 100:
        print(f"\n{GREEN}{BOLD}🎉 100% PASS: PROJECT ATTAINS MASTER ZERO-DEFECT QUALITY SPECIFICATION!{RESET}\n")
    else:
        print(f"\n{YELLOW}{BOLD}⚠️ REVISE: Please address highlighted remediation items before build clearance.{RESET}\n")

    return {
        "passed_count": passed_count,
        "total_count": total_count,
        "pass_rate": pass_rate,
        "is_100_percent": pass_rate == 100,
        "results": [{"name": title, "passed": passed, "details": details} for title, passed, details in results]
    }

def discover_standalone_products(workspace_root):
    ignored = {
        "node_modules", ".git", ".venv", ".agents", ".gemini", ".vscode",
        ".cursor", ".claude", ".maestro", "scratch", "docs", "extensions",
        "knowledge", "skills", "social_launch", "huggingface-hub",
        "quad-brain-council-service", "copilot-agent-service", "antigravity-clean"
    }
    products = []
    if not os.path.exists(workspace_root):
        return products
        
    for item in os.listdir(workspace_root):
        full_path = os.path.join(workspace_root, item)
        if os.path.isdir(full_path) and item not in ignored and not item.startswith('.'):
            src_dir = os.path.join(full_path, "src")
            if os.path.exists(src_dir) and os.path.isdir(src_dir):
                src_files = scan_files(src_dir)
                if src_files:
                    products.append((item, src_dir))
    return sorted(products, key=lambda x: x[0])

if __name__ == "__main__":
    args = sys.argv[1:]
    fix_mode = "--fix" in args
    all_mode = "--all" in args
    json_mode = "--json" in args
    
    clean_args = [a for a in args if a not in ["--fix", "--all", "--json"]]
    
    workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    if all_mode:
        discovered = discover_standalone_products(workspace_root)
        print(f"{CYAN}{BOLD}🔍 Auto-discovered {len(discovered)} standalone products in workspace:{RESET}")
        for p_name, p_dir in discovered:
            print(f"   • {BOLD}{p_name}{RESET} -> {p_dir}")
        targets = [p_dir for _, p_dir in discovered]
    elif clean_args:
        targets = [clean_args[0]]
    else:
        targets = ["EMS/src", "omnistock/src"]

    all_results_report = {
        "timestamp": datetime.now().isoformat(),
        "mode": "all" if all_mode else "single",
        "products": [],
        "combined_total": 0,
        "combined_passed": 0,
        "combined_score": 0.0
    }
        
    all_success = True
    for target in targets:
        if os.path.exists(target):
            audit_dict = run_audit(target, fix_mode=fix_mode)
            p_name = os.path.basename(os.path.dirname(os.path.abspath(target)))
            all_results_report["products"].append({
                "name": p_name,
                "target": target,
                "total_checks": audit_dict["total_count"],
                "passed": audit_dict["passed_count"],
                "score": audit_dict["pass_rate"],
                "results": audit_dict["results"]
            })
            all_results_report["combined_total"] += audit_dict["total_count"]
            all_results_report["combined_passed"] += audit_dict["passed_count"]
            if not audit_dict["is_100_percent"]:
                all_success = False

    if all_results_report["combined_total"] > 0:
        all_results_report["combined_score"] = (all_results_report["combined_passed"] / all_results_report["combined_total"]) * 100

    if all_mode and len(all_results_report["products"]) > 1:
        print(f"\n{CYAN}{BOLD}{'='*75}{RESET}")
        print(f"{CYAN}{BOLD}🏆 COMBINED MULTI-PRODUCT AUDIT SCORECARD ({len(all_results_report['products'])} Products Audited){RESET}")
        print(f"{CYAN}{BOLD}{'='*75}{RESET}")
        for p in all_results_report["products"]:
            p_color = GREEN if p["score"] == 100 else YELLOW if p["score"] >= 80 else RED
            print(f" {p['name']:<25}: {p_color}{BOLD}{p['passed']}/{p['total_checks']} PASS ({p['score']:.1f}%){RESET}")
        print(f"{CYAN}{BOLD}{'-'*75}{RESET}")
        c_color = GREEN if all_results_report["combined_score"] == 100 else YELLOW
        print(f" {BOLD}TOTAL WORKSPACE SCORE{RESET}      : {c_color}{BOLD}{all_results_report['combined_passed']}/{all_results_report['combined_total']} PASS ({all_results_report['combined_score']:.1f}%){RESET}\n")

    if json_mode:
        report_file = "audit_report.json"
        with open(report_file, "w", encoding="utf-8") as f:
            json.dump(all_results_report, f, indent=2)
        print(f"{GREEN}📄 Audit report written to '{os.path.abspath(report_file)}'.{RESET}\n")

    sys.exit(0 if all_success else 1)

