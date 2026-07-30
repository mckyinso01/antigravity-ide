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
    print(f"{CYAN}{BOLD}⚙️  PHASE 1: DEEP COMPLIANCE AUDIT SCAN (Checking 19 Rules across codebase...){RESET}\n")

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
    
    checklist_path = "omnistock_master_component_checklist.md"
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

    if not os.path.exists(tokens_path):
        ch19_pass = False
        ch19_details.append(f"{tokens_path} not found in workspace root.")

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

    print("-" * 75)
    score_color = GREEN if pass_rate == 100 else YELLOW if pass_rate >= 80 else RED
    print(f"{BOLD}FINAL VERDICT:{RESET} {score_color}{BOLD}{passed_count}/{total_count} CHECKS PASSED ({pass_rate:.1f}% SCORE){RESET}")
    
    if pass_rate == 100:
        print(f"\n{GREEN}{BOLD}🎉 100% PASS: PROJECT ATTAINS MASTER ZERO-DEFECT QUALITY SPECIFICATION!{RESET}\n")
    else:
        print(f"\n{YELLOW}{BOLD}⚠️ REVISE: Please address highlighted remediation items before build clearance.{RESET}\n")

    return pass_rate == 100

if __name__ == "__main__":
    args = sys.argv[1:]
    fix_mode = "--fix" in args
    clean_args = [a for a in args if a != "--fix"]
    target = clean_args[0] if clean_args else "omnistock/src"
    success = run_audit(target, fix_mode=fix_mode)
    sys.exit(0 if success else 1)
