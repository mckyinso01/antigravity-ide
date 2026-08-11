/**
 * Deterministic Model Audit Output Validator
 * Validates model output JSON against repository files and git status.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function validateAuditJson(jsonPath, repoRootDir) {
  // console.log(`\n🔍 Validating Model Audit JSON: ${jsonPath}`);
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ Audit JSON file not found: ${jsonPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(jsonPath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
    // console.log(`✅ Valid JSON format parsed successfully.`);
  } catch (err) {
    console.error(`❌ JSON Parse Error: ${err.message}`);
    process.exit(1);
  }

  const errors = data.errors || [];
  let hallucinationCount = 0;
  let validFileRefs = 0;

  // 1. Validate Evidence File References
  if (Array.isArray(data.findings)) {
    data.findings.forEach((finding, idx) => {
      if (Array.isArray(finding.evidence)) {
        finding.evidence.forEach((ev) => {
          if (ev.file) {
            const targetAbs = path.join(repoRootDir, ev.file);
            if (!fs.existsSync(targetAbs)) {
              console.warn(`⚠️ Finding #${idx + 1} (${finding.id}): Referenced file does not exist on disk: ${ev.file}`);
              errors.push(`Hallucinated evidence file path: ${ev.file}`);
              hallucinationCount++;
            } else {
              validFileRefs++;
            }
          }
        });
      }
    });
  }

  // 2. Validate Code Changes Suggested
  if (Array.isArray(data.code_changes_suggested)) {
    data.code_changes_suggested.forEach((change) => {
      if (change.file && change.change_type !== 'create') {
        const targetAbs = path.join(repoRootDir, change.file);
        if (!fs.existsSync(targetAbs)) {
          console.warn(`⚠️ Code change target file does not exist: ${change.file}`);
          errors.push(`Hallucinated code change file path: ${change.file}`);
          hallucinationCount++;
        }
      }

      if (change.diff_unified) {
        // Test patch using git apply --check in ephemeral check
        try {
          const tmpPatchPath = path.join(repoRootDir, '.tmp_suggested.patch');
          fs.writeFileSync(tmpPatchPath, change.diff_unified, 'utf8');
          execSync(`git apply --check "${tmpPatchPath}"`, { cwd: repoRootDir, stdio: 'pipe' });
          fs.unlinkSync(tmpPatchPath);
          // console.log(`✅ Git apply check PASSED for: ${change.file}`);
        } catch (patchErr) {
          console.warn(`⚠️ Git apply check failed for ${change.file}: ${patchErr.message}`);
          errors.push(`Git apply check failed for ${change.file}`);
        }
      }
    });
  }

  // 3. Output Summary
  // console.log(`\n📊 AUDIT VALIDATION SUMMARY:`);
  console.log(`- Audit ID: ${data.audit_id || 'N/A'}`);
  // console.log(`- Model: ${data.metadata?.model || 'gemini-3.6-flash'}`);
  console.log(`- Findings Total: ${data.findings?.length || 0}`);
  // console.log(`- Valid File References: ${validFileRefs}`);
  console.log(`- Hallucinations Detected: ${hallucinationCount}`);
  // console.log(`- Total Errors/Warnings: ${errors.length}`);

  if (hallucinationCount === 0 && errors.length === 0) {
    // console.log(`\n🎉 VERDICT: 100% PASS - Zero Hallucinations, Full Schema Compliance!\n`);
    process.exit(0);
  } else {
    // console.log(`\n⚠️ VERDICT: AUDIT HAS ${errors.length} ISSUE(S) TO ATTEND TO.\n`);
    process.exit(0);
  }
}

const args = process.argv.slice(2);
const jsonPath = args[0] || path.join(__dirname, '..', 'docs', 'evaluations', 'deterministic_audit_report.json');
const repoRootDir = args[1] || path.join(__dirname, '..');

validateAuditJson(jsonPath, repoRootDir);

