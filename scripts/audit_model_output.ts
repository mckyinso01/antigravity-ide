import fs from "fs";
import path from "path";
import child_process from "child_process";

function run(cmd: string) {
  try {
    return child_process.execSync(cmd, { stdio: "pipe", encoding: "utf8" });
  } catch (err: any) {
    throw new Error(err.stdout || err.message || String(err));
  }
}

function usage() {
  console.error("Usage: ts-node scripts/audit_model_output.ts <model_output.json>");
  process.exit(2);
}

function gitLsFiles(): string[] {
  try {
    const out = run("git ls-files");
    return out.split("\n").filter(Boolean);
  } catch (e) {
    return [];
  }
}

async function main() {
  const arg = process.argv[2];
  if (!arg) usage();
  const modelPath = path.resolve(process.cwd(), arg);
  if (!fs.existsSync(modelPath)) {
    console.error("Model output file not found:", modelPath);
    process.exit(2);
  }
  const modelJson = JSON.parse(fs.readFileSync(modelPath, "utf8"));
  const repoFiles = new Set(gitLsFiles());
  const errors: string[] = [];
  let allPatchesValid = true;

  const changes = modelJson.changes || modelJson.findings || [];
  for (const ch of changes) {
    const evidence = ch.evidence || [];
    for (const ev of evidence) {
      const filePath = ev.file;
      const exists = repoFiles.size ? repoFiles.has(filePath) : fs.existsSync(path.resolve(process.cwd(), filePath));
      if (!exists) {
        const msg = `Missing referenced file: ${filePath} (change id: ${ch.id})`;
        console.error(msg);
        errors.push(msg);
      }
    }
    const diff = ch.proposed_fix?.diff_unified || null;
    if (diff) {
      const tmp = path.join(process.cwd(), `.tmp_model_patch_${Date.now()}.patch`);
      fs.writeFileSync(tmp, diff, "utf8");
      try {
        run(`git apply --check ${tmp}`);
        console.log(`Patch apply-check OK for change: ${ch.id}`);
      } catch (e: any) {
        const msg = `git apply --check FAILED for change ${ch.id}: ${e.message}`;
        console.error(msg);
        errors.push(msg);
        allPatchesValid = false;
      } finally {
        try { fs.unlinkSync(tmp); } catch {}
      }
    }
  }

  const summary = {
    timestamp: new Date().toISOString(),
    repo_files_count: repoFiles.size,
    errors,
    allPatchesValid,
  };
  const out = path.join(process.cwd(), "audit_result.json");
  fs.writeFileSync(out, JSON.stringify(summary, null, 2), "utf8");
  console.log("Audit summary written to", out);
  process.exit(errors.length ? 3 : 0);
}

main().catch((e) => {
  console.error("Auditor unexpected error:", e);
  process.exit(10);
});
