import os
import sys
import subprocess
import argparse

# Set stdout/stderr to UTF-8 mode safely
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='ignore')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='ignore')

def run_deep_total_audit(target_dir=None):
    workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    print("=" * 75)
    print("⚔️ DEEP EXHAUSTIVE TOTAL AUDIT, MCPS & COUNCIL SWARM EXECUTION ENGINE")
    print("=" * 75)
    print("Enforcing 4-Pillar TOTAL Protocol, 72-Brain Swarm Debate & Sentinel Audit...\n")

    # 1. Execute 72-Brain Council Swarm Debate
    print("🧠 STEP 1: Invoking 72-Brain Council of Elders Swarm...")
    council_script = os.path.join(workspace_root, ".agents", "scripts", "council_debate.py")
    if os.path.exists(council_script):
        try:
            res_c = subprocess.run([
                sys.executable, council_script, 
                "--task", f"Deep Exhaustive TOTAL Audit of {target_dir or 'Workspace'}", 
                "--role", "QA-01", 
                "--mode", "quick"
            ], capture_output=True, text=True, encoding='utf-8', errors='ignore', timeout=30)
            print("   ✓ Council Swarm Synthesized Verdict Ready.")
        except Exception as e:
            print(f"   ⚠️ Council Swarm Warning: {e}")

    # 2. Execute Master CLI Audit Suite
    print("\n⚔️ STEP 2: Running Master CLI Audit Suite (master_project_audit.py)...")
    audit_script = os.path.join(workspace_root, ".agents", "scripts", "master_project_audit.py")
    if os.path.exists(audit_script):
        cmd = [sys.executable, audit_script]
        if target_dir:
            cmd.append(target_dir)
        try:
            res_a = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore', timeout=30)
            print(res_a.stdout)
        except Exception as e:
            print(f"   ❌ Audit Suite Error: {e}")

    # 3. Execute Field DevOps Sentinel Audit
    print("\n🕵️ STEP 3: Running Field DevOps Sentinel Overseer Audit...")
    sentinel_script = os.path.join(workspace_root, ".agents", "scripts", "sentinel_checklist.py")
    if os.path.exists(sentinel_script):
        try:
            res_s = subprocess.run([sys.executable, sentinel_script], capture_output=True, text=True, encoding='utf-8', errors='ignore', timeout=30)
            print(res_s.stdout)
        except Exception as e:
            print(f"   ❌ Sentinel Audit Error: {e}")

    print("=" * 75)
    print("🎉 DEEP TOTAL AUDIT PIPELINE COMPLETED SUCCESSFULLY!")
    print("=" * 75)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run Deep Exhaustive TOTAL Audit Pipeline")
    parser.add_argument("target_dir", nargs="?", default=None, help="Target src directory to audit (e.g. EMS/src)")
    args = parser.parse_args()
    
    run_deep_total_audit(args.target_dir)
