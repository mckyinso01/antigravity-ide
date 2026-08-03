# 🛡️ Gemini 3.6 Flash Deterministic Audit Engine & Zod Schema Specification

## Executive Overview
This document specifies the exact prompt engineering, output schema, behavioral constraints, and Zod validation engine for performing evidence-first, zero-hallucination code quality & production-readiness audits using Gemini 3.6 Flash.

---

## 1. Model Configuration

- **Model**: `gemini-3.6-flash`
- **Temperature**: `0.0` (deterministic)
- **Top P**: `0.95`
- **Max Output Tokens**: `1600`
- **Response Format**: `JSON-only` (no prose, no markdown, no code fences)

---

## 2. System Instruction

```
You are a rigorous, evidence-first code reviewer and remediation planner. You must output only valid JSON following the EXACT schema provided. Never invent file paths, event IDs, usernames, secrets, or code that is not grounded in the input repository content. If you cannot verify a claim from the provided repo files or explicit input, set the related field to null and provide a short reason. If any recommendation is destructive (delete/purge/reset), set "requires_human_review": true. Always include explicit provenance: file paths and line ranges. Do not output prose outside the JSON. Aim for precision; avoid speculation.
```

---

## 3. Zod Schema Specification (TypeScript / Node.js)

```typescript
import { z } from "zod";

export const EvidenceSchema = z.object({
  file: z.string(),
  startLine: z.number().nullable(),
  endLine: z.number().nullable(),
  snippet: z.string(),
});

export const ProposedFixSchema = z.object({
  type: z.enum(["patch", "config", "process", "test", "doc"]),
  patch_unified_diff: z.string().nullable(),
  explanation: z.string(),
  requires_human_review: z.boolean(),
});

export const FindingSchema = z.object({
  id: z.string(),
  title: z.string(),
  severity: z.enum(["critical", "high", "medium", "low"]),
  description: z.string(),
  evidence: z.array(EvidenceSchema),
  proposed_fix: ProposedFixSchema,
  confidence: z.number().min(0).max(1),
});

export const OutputSchema = z.object({
  audit_id: z.string(),
  summary: z.string(),
  findings: z.array(FindingSchema),
  code_changes_suggested: z.array(
    z.object({
      file: z.string(),
      change_type: z.enum(["modify", "create", "delete"]),
      diff_unified: z.string(),
      tests_to_add: z.array(z.string()),
    })
  ),
  agent_rules: z.array(
    z.object({
      agent_id: z.string(),
      role: z.string(),
      capabilities: z.array(z.string()),
      allowed_actions: z.array(z.string()),
      deny_actions: z.array(z.string()),
      review_requirements: z.string(),
    })
  ),
  ci_changes: z.array(
    z.object({
      type: z.enum(["workflow", "config"]),
      file: z.string(),
      explanation: z.string(),
      workflow_snippet: z.string().nullable(),
    })
  ),
  tests_and_audits: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      script: z.string(),
    })
  ),
  metadata: z.object({
    generated_at: z.string(),
    model: z.string(),
    temperature: z.number(),
  }),
  errors: z.array(z.string()).optional(),
});
```

---

## 4. Mandatory Behavioral Constraints

1. **Exact Evidence**: All `evidence` entries must feature `file`, `startLine`, `endLine`, and verbatim `snippet` from provided repo files.
2. **File Existence Validation**: Every referenced file path must exist in `repo_files`. If missing, tag finding as hallucinated, append to `errors`, and set `requires_human_review: true`.
3. **Zero Secret Leakage**: Never echo or leak secret tokens, API keys, or credentials in output JSON.
4. **Human Review Gate**: If severity is `critical` or confidence < 0.6, require explicit human review and do not auto-apply patches.
5. **JSON-Only Payload**: No leading or trailing prose outside the valid JSON object.
