import fs from "fs";
import path from "path";
import child_process from "child_process";

function run(cmd: string, opts: { cwd?: string } = {}) {
  try {
    return child_process.execSync(cmd, { stdio: "pipe", encoding: "utf8", ...opts });
  } catch (err: any) {
    throw new Error(err.stdout || err.message || String(err));
  }
}

function usageAndExit() {
  console.error("Usage: ts-node scripts/audit_model_output.ts <model_output.json>");
  process.exit(2);
}

function gitLsFiles(): string[] {
  try {
    const out = run("git ls-files");
    return out.split("\n").filter(Boolean);
  } catch (e) {
    console.warn("git ls-files failed; falling back to filesystem scan of repo root.");
    return [];
  }
}

async function main() {
  const arg = process.argv[2];
  if (!arg) usageAndExit();
  const modelPath = path.resolve(process.cwd(), arg);
  if (!fs.existsSync(modelPath)) {
    console.error("Model output file not found:", modelPath);
    process.exit(2);
  }
  const modelJson = JSON.parse(fs.readFileSync(modelPath, "utf8"));
  const repoFiles = new Set(gitLsFiles());

  let errors: string[] = [];
  let allPatchesValid = true;

  function checkFileExists(filePath: string) {
    if (repoFiles.size === 0) {
      return fs.existsSync(path.resolve(process.cwd(), filePath));
    }
    return repoFiles.has(filePath);
  }

  const findings = modelJson.findings || modelJson.changes || [];
  for (const f of findings) {
    const evidenceArr = f.evidence || [];
    for (const ev of evidenceArr) {
      if (!checkFileExists(ev.file)) {
        const msg = `Referenced file not found: ${ev.file} (finding id: ${f.id || f.title || "unknown"})`;
        console.error(msg);
        errors.push(msg);
      }
    }
  }

  const codeChanges = modelJson.code_changes_suggested || [];
  for (const ch of codeChanges) {
    if (!ch.diff_unified) continue;
    const tmpPatch = path.join(process.cwd(), `.tmp_model_patch_${Date.now()}.patch`);
    fs.writeFileSync(tmpPatch, ch.diff_unified, "utf8");
    try {
      run(`git apply --check ${tmpPatch}`);
      console.log(`Patch check OK for file: ${ch.file}`);
    } catch (e: any) {
      console.error(`Patch check FAILED for: ${ch.file} — ${e.message}`);
      errors.push(`git apply --check failed for ${ch.file}: ${e.message}`);
      allPatchesValid = false;
    } finally {
      try { fs.unlinkSync(tmpPatch); } catch {}
    }
  }

  for (const f of findings) {
    const pf = f.proposed_fix || {};
    const diff = pf.patch_unified_diff || null;
    if (!diff) continue;
    const tmpPatch = path.join(process.cwd(), `.tmp_model_patch_${Date.now()}.patch`);
    fs.writeFileSync(tmpPatch, diff, "utf8");
    try {
      run(`git apply --check ${tmpPatch}`);
      console.log(`Patch check OK for finding: ${f.id}`);
    } catch (e: any) {
      console.error(`Patch check FAILED for finding ${f.id} — ${e.message}`);
      errors.push(`git apply --check failed for finding ${f.id}: ${e.message}`);
      allPatchesValid = false;
    } finally {
      try { fs.unlinkSync(tmpPatch); } catch {}
    }
  }

  const summary = {
    timestamp: new Date().toISOString(),
    model_file: modelPath,
    repo_files_count: repoFiles.size,
    errors,
    allPatchesValid,
  };
  const outPath = path.join(process.cwd(), "audit_result.json");
  fs.writeFileSync(outPath, JSON.stringify(summary, null, 2), "utf8");
  console.log("Audit summary written to", outPath);

  if (errors.length > 0) {
    console.error("Audit completed with errors. See audit_result.json");
    process.exit(3);
  } else {
    console.log("Audit completed: all checks passed.");
    process.exit(0);
  }
}

main().catch((e) => {
  console.error("Unexpected auditor error:", e);
  process.exit(10);
});
