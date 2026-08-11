import fs from "fs";
import path from "path";
import { z } from "zod";

// Schema matching the remediation prompt OUTPUT_SCHEMA
const EvidenceSchema = z.object({
  file: z.string(),
  startLine: z.number().nullable(),
  endLine: z.number().nullable(),
  snippet: z.string(),
});

const ProposedFixSchema = z.object({
  type: z.enum(["patch", "config", "process", "test", "doc"]),
  diff_unified: z.string().nullable(),
  explanation: z.string(),
  tests_added: z.array(z.string()).optional(),
  requires_human_review: z.boolean(),
});

const ChangeSchema = z.object({
  id: z.string(),
  title: z.string(),
  severity: z.enum(["critical", "high", "medium", "low"]),
  description: z.string(),
  evidence: z.array(EvidenceSchema),
  proposed_fix: ProposedFixSchema,
  confidence: z.number().min(0).max(1),
});

const CIWorkflowSchema = z.object({
  file: z.string(),
  explanation: z.string(),
  workflow_snippet: z.string(),
});

const AgentPolicySchema = z.object({
  agent_id: z.string(),
  role: z.string(),
  allowed_actions: z.array(z.string()),
  deny_actions: z.array(z.string()),
  review_requirements: z.string(),
});

const OutputSchema = z.object({
  audit_id: z.string(),
  summary: z.string(),
  errors: z.array(z.string()).optional(),
  changes: z.array(ChangeSchema),
  ci_workflows: z.array(CIWorkflowSchema).optional(),
  agent_policy_changes: z.array(AgentPolicySchema).optional(),
  metadata: z.object({
    generated_at: z.string(),
    model: z.string(),
    temperature: z.number(),
  }),
  post_checks: z
    .object({
      patchs_apply_check: z.boolean(),
      lint_passed: z.union([z.boolean(), z.null()]),
      tests_passed: z.union([z.boolean(), z.null()]),
      notes: z.array(z.string()).optional(),
    })
    .optional(),
});

function usage() {
  console.error("Usage: ts-node tools/validate_model_output.ts <model_output.json>");
  process.exit(2);
}

async function main() {
  const arg = process.argv[2];
  if (!arg) usage();
  const file = path.resolve(process.cwd(), arg);
  if (!fs.existsSync(file)) {
    console.error("File not found:", file);
    process.exit(2);
  }
  const raw = fs.readFileSync(file, "utf8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e: any) {
    console.error("Invalid JSON:", e.message);
    process.exit(3);
  }
  try {
    OutputSchema.parse(parsed);
    // console.log("✅ Model output VALID against schema.");
    process.exit(0);
  } catch (e: any) {
    console.error("❌ Validation errors:", e.errors || e.message || e);
    process.exit(4);
  }
}

main().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(10);
});

