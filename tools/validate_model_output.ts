import fs from "fs";
import path from "path";
import { z } from "zod";

const EvidenceSchema = z.object({
  file: z.string(),
  startLine: z.number().nullable(),
  endLine: z.number().nullable(),
  snippet: z.string(),
});
const ProposedFixSchema = z.object({
  type: z.enum(["patch","config","process","test","doc"]),
  patch_unified_diff: z.string().nullable(),
  explanation: z.string(),
  requires_human_review: z.boolean(),
});
const FindingSchema = z.object({
  id: z.string(),
  title: z.string(),
  severity: z.enum(["critical","high","medium","low"]),
  description: z.string(),
  evidence: z.array(EvidenceSchema),
  proposed_fix: ProposedFixSchema,
  confidence: z.number().min(0).max(1),
});
const OutputSchema = z.object({
  audit_id: z.string(),
  summary: z.string(),
  findings: z.array(FindingSchema),
  code_changes_suggested: z.array(z.object({
    file: z.string(),
    change_type: z.enum(["modify","create","delete"]),
    diff_unified: z.string(),
    tests_to_add: z.array(z.string()),
  })).optional(),
  agent_rules: z.array(z.object({
    agent_id: z.string(),
    role: z.string(),
    capabilities: z.array(z.string()),
    allowed_actions: z.string(),
    deny_actions: z.string(),
    review_requirements: z.string(),
  })).optional(),
  ci_changes: z.array(z.object({
    type: z.enum(["workflow","config"]),
    file: z.string(),
    explanation: z.string(),
    workflow_snippet: z.string().nullable(),
  })).optional(),
  tests_and_audits: z.array(z.object({
    id: z.string(),
    description: z.string(),
    script: z.string(),
  })).optional(),
  metadata: z.object({
    generated_at: z.string(),
    model: z.string(),
    temperature: z.number(),
  }),
  errors: z.array(z.string()).optional(),
});

function printUsageAndExit() {
  console.error("Usage: ts-node tools/validate_model_output.ts <path-to-model-output.json>");
  process.exit(2);
}

async function main() {
  const arg = process.argv[2];
  if (!arg) printUsageAndExit();
  const filePath = path.resolve(process.cwd(), arg);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(2);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch (e: any) {
    console.error("Invalid JSON:", e.message);
    process.exit(2);
  }

  try {
    OutputSchema.parse(parsed);
    console.log("✅ Model output VALID against schema.");
    process.exit(0);
  } catch (e: any) {
    console.error("❌ Validation failed:");
    console.error(e.errors || e.message || e);
    process.exit(3);
  }
}

main().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(10);
});
