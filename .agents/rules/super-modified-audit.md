# 🛡️ SUPER-MODIFIED MASTER AUDIT & EVALUATION SPECIFICATION (`/super-modified-audit`)

## Command Directive
When `/super-modified-audit` is invoked, the Orchestrator MUST execute the 22-Phase Master Audit Protocol:

1. **8-Stage Remediation Cycle**: Identify ➔ RCA ➔ Plan ➔ Resolve ➔ Confirm ➔ Prevent ➔ Script Automation ➔ Ledger Lock.
2. **Technical Controls**: `server.ts` Zod AI validation, `express-rate-limit`, SHA-256 file manifest (`audits/manifest.json`), `scripts/ast-scan.ts`.
3. **CI & Security Gating**: `.github/workflows/ci.yml` (`tsc --noEmit`, CodeQL SAST, Dependabot, SBOM).
4. **Playwright E2E & Axe A11y**: Smoke journey (`Register` ➔ `Login` ➔ `Dashboard` ➔ `SpeedToLead` ➔ `Export PDF`) & WCAG AA release gate.
5. **Zenitsu Gold Theme**: Lock `#F9E006` Cyber Gold base accents on `#0B1C30` solid card interior.
6. **72-Brain Swarm & Agentic Auditors**: Consult DeepSeek-R1, Qwen 2.5 Coder, GPT-4o, Llama 3.3, `COPILOT-01`, and `Saccade UI/UX`.
7. **Scorecard Attestation**: Require **100.0% PASS SCORE (47/47 Checks)** on `python .agents/scripts/master_project_audit.py`.
