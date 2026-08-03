# 🛡️ Gemini 3.6 Flash Deterministic Remediation Master Prompt & Zod Engine Spec

## Executive Overview
This specification provides the production-grade Master Prompt template, model execution settings, Zod output schema, validation pipeline, and 4-tier agent policy matrix for performing evidence-first, zero-hallucination code quality & remediation scans using Gemini 3.6 Flash.

---

## 1. Model Execution Settings

- **Model**: `gemini-3.6-flash`
- **Temperature**: `0.0` (deterministic)
- **Top P**: `0.95`
- **Max Output Tokens**: `1600`
- **Response Format**: `JSON-only` (no prose, no markdown, no code fences)

---

## 2. System Instruction

```
You are a production-safe code remediation agent. Use ONLY the files provided in the FILES mapping. Never invent file paths, line numbers, secrets, usernames, or any values not present in the provided FILES. Output MUST be valid JSON exactly matching the OUTPUT_SCHEMA supplied in the user message. If you cannot determine a correct fix, set the related field(s) to null and give a one-sentence reason. Any change touching secrets, admin endpoints, infra, or destructive actions MUST set requires_human_review = true. Use deterministic reasoning and produce minimal, targeted unified diffs. Do not output any prose outside the required JSON.
```

---

## 3. User Master Prompt Template (JSON Payload)

```json
{
  "repo_files": ["<FILE_PATH_1>", "<FILE_PATH_2>"],
  "FILES": {
    "<FILE_PATH_1>": "<FILE_CONTENT_1>",
    "<FILE_PATH_2>": "<FILE_CONTENT_2>"
  },
  "change_request": [
    "Redact committed secrets in any config files and add local_config_template + .gitignore",
    "Add tools/validate_model_output.ts (Zod validator) and scripts/audit_model_output.ts (auditor: file existence + git apply --check)",
    "Add tests/webhook.spec.ts (supertest) to validate stripe raw-body handling (if webhook route exists)",
    "Add/update package.json devDependencies and scripts for validation & auditing (non-destructive)",
    "Add .github/workflows/validate-model-output.yml to run validator, auditor, lint and tests on PRs",
    "List any additional non-destructive improvements to harden production configuration and agent policies"
  ],
  "constraints": {
    "max_diff_size": 20000,
    "only_modify_files": ["<FILE_PATH_1>", "<FILE_PATH_2>"],
    "disallow_secrets_in_output": true,
    "max_changes": 40
  },
  "MANDATORY_BEHAVIOR": {
    "json_only": true,
    "no_markdown": true,
    "no_code_fences": true,
    "evidence_required": true,
    "evidence_snippet_rules": "Provide verbatim snippet from FILES in evidence; trim with '…' only if necessary",
    "proposed_fixes_must_be_unified_diffs": true,
    "destructive_actions_flag": "requires_human_review = true",
    "confidence_threshold_for_auto_apply": 0.9
  },
  "OUTPUT_SCHEMA": {
    "audit_id": "string",
    "summary": "string (≤220 chars)",
    "errors": ["string"],
    "changes": [
      {
        "id": "string",
        "title": "string",
        "severity": "critical|high|medium|low",
        "description": "one-sentence",
        "evidence": [
          { "file": "path", "startLine": null, "endLine": null, "snippet": "verbatim snippet" }
        ],
        "proposed_fix": {
          "type": "patch|config|process|test|doc",
          "diff_unified": "string|null",
          "explanation": "string short",
          "tests_added": ["path"],
          "requires_human_review": true
        },
        "confidence": 0.95
      }
    ],
    "ci_workflows": [
      { "file": "path", "explanation": "string", "workflow_snippet": "string" }
    ],
    "agent_policy_changes": [
      {
        "agent_id": "string",
        "role": "string",
        "allowed_actions": ["read_repo", "create_branch", "apply_patch", "open_pr", "run_tests"],
        "deny_actions": ["apply_destructive_patches", "deploy_without_approval"],
        "review_requirements": "string"
      }
    ],
    "metadata": { "generated_at": "ISO8601", "model": "gemini-3.6-flash", "temperature": 0.0 },
    "post_checks": {
      "patchs_apply_check": true,
      "lint_passed": true,
      "tests_passed": true,
      "notes": ["string"]
    }
  },
  "RETRY_INSTRUCTION": "If your JSON is rejected by server validation, run one retry only with: ONLY OUTPUT VALID JSON MATCHING THE SCHEMA. Fix errors: <server_provided_errors>.",
  "ACCEPTANCE_CRITERIA": {
    "json_parse_success_rate": "≥99%",
    "hallucination_rate_allowed": "≤0.5%",
    "patch_apply_success_rate": "≥98%",
    "auto_apply_confidence_threshold": 0.9
  }
}
```

---

## 4. Server-Side Execution & Validation Pipeline

1. **Construct Payload**: Extract array of target `repo_files` and `FILES` text mapping.
2. **Execute Gemini Call**: Pass System & User messages with `temperature: 0.0` and `response_format: JSON-only`.
3. **Parse & Validate Schema**: Run `npx ts-node tools/validate_model_output.ts model_output.json`.
4. **Audit File References & Diffs**: Run `npx ts-node scripts/audit_model_output.ts model_output.json` (executes `git ls-files` verification & `git apply --check`).
5. **Gating Logic**:
   - If `requires_human_review === false`, `confidence >= 0.9`, and `severity < high` -> Auto-create branch & open PR.
   - If `requires_human_review === true` or `severity >= high` -> Require explicit Security Officer sign-off.

---

## 5. Enforced Agent Policy Matrix

- **`repo-reader`**: `read_repo`, `list_files`, `open_issues` (No code modifications).
- **`auditor-agent`**: `read_repo`, `run_tests`, `run_auditor` (Validates JSON, cannot apply patches).
- **`remediation-agent`**: `read_repo`, `create_branch`, `apply_patch` (non-destructive only), `open_pr`, `run_tests` (Demands human review for high severity / secrets).
- **`deploy-agent`**: `deploy` to staging/canary only after 100% green CI and explicit human approval.
