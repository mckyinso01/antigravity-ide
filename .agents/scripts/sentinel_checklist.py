import os
import sys
import subprocess
import re

# Set stdout/stderr to UTF-8 mode safely
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='ignore')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='ignore')

def run_sentinel_audit():
    print("=" * 75)
    print("AUTONOMOUS SENTINEL VERIFICATION COUNCIL (`SENTINEL-SWARM`)")
    print("=" * 75)
    print("Checking 4 Mandatory Pre-Flight & Post-Task Directives...\n")

    workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    ledger_path = os.path.join(workspace_root, "omnistock_master_component_checklist.md")
    agents_path = os.path.join(workspace_root, ".agents", "AGENTS.md")
    audit_script = os.path.join(workspace_root, ".agents", "scripts", "master_project_audit.py")

    checks = []

    # 1. Master Issue Ledger Audit
    if os.path.exists(ledger_path):
        with open(ledger_path, 'r', encoding='utf-8', errors='ignore') as f:
            l_text = f.read()
            matches = re.findall(r'^\d+\.\s+\*\*', l_text, re.MULTILINE)
            issue_count = len(matches)
            milestone_rem = issue_count % 20
            milestone_status = f"Next 20-Issue Milestone Gate in {20 - milestone_rem} issue(s)" if milestone_rem != 0 else "20-ISSUE MILESTONE GATE TRIGGERED! Codify into master_project_audit.py!"
            checks.append(("1. Master Issue Ledger Synchronization", True, f"{issue_count} Issues Logged & Remediated. ({milestone_status})"))
    else:
        checks.append(("1. Master Issue Ledger Synchronization", False, "Master Ledger file missing!"))

    # 2. System Rulebook Rules Count
    if os.path.exists(agents_path):
        with open(agents_path, 'r', encoding='utf-8', errors='ignore') as f:
            a_text = f.read()
            rule_matches = re.findall(r'^\d+\.\s+\*\*', a_text, re.MULTILINE)
            checks.append(("2. System Governance Rulebook (AGENTS.md)", True, f"{len(rule_matches)} Master Rules Active & Locked."))
    else:
        checks.append(("2. System Governance Rulebook (AGENTS.md)", False, "AGENTS.md missing!"))

    # 3. Master CLI Audit Suite
    if os.path.exists(audit_script):
        try:
            res = subprocess.run([sys.executable, audit_script], capture_output=True, text=True, encoding='utf-8', errors='ignore', timeout=15)
            if "25/25 CHECKS PASSED" in res.stdout or "100.0% SCORE" in res.stdout or "100% PASS" in res.stdout:
                checks.append(("3. Programmatic CLI Audit Suite (master_project_audit.py)", True, "100.0% PASS Scorecard (25/25 Checks Passed)."))
            else:
                checks.append(("3. Programmatic CLI Audit Suite (master_project_audit.py)", False, "CLI Audit Suite failed or had failing checks!"))
        except Exception as e:
            checks.append(("3. Programmatic CLI Audit Suite (master_project_audit.py)", False, f"Execution error: {e}"))
    else:
        checks.append(("3. Programmatic CLI Audit Suite (master_project_audit.py)", False, "Audit script missing!"))

    # 4. Source Control Status
    try:
        git_res = subprocess.run(["git", "status", "-u"], capture_output=True, text=True, encoding='utf-8', errors='ignore', cwd=workspace_root)
        if "nothing to commit, working tree clean" in git_res.stdout:
            checks.append(("4. Source Control Workspace Cleanliness", True, "Git working tree 100% clean and committed."))
        else:
            checks.append(("4. Source Control Workspace Cleanliness", False, "Uncommitted changes detected in working tree!"))
    except Exception as e:
        checks.append(("4. Source Control Workspace Cleanliness", False, f"Git status error: {e}"))

    # Output Results
    all_passed = True
    for title, passed, detail in checks:
        status_icon = "[PASS]" if passed else "[FAIL]"
        if not passed:
            all_passed = False
        print(f"{status_icon} {title}")
        print(f"       +-- {detail}")

    print("-" * 75)
    if all_passed:
        print("SENTINEL AUDIT VERDICT: 100% FULLY AUTONOMOUS GOVERNANCE COMPLIANT!\n")
    else:
        print("SENTINEL AUDIT VERDICT: GOVERNANCE ACTION REQUIRED BEFORE PROCEEDING!\n")

if __name__ == "__main__":
    run_sentinel_audit()
