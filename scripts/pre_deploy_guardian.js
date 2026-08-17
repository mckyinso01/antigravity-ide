/**
 * Pre-Deploy Guardian
 * Proactively scans all .md checklist files and blocks deployment
 * if any mandatory items are unchecked or any plan is incomplete.
 *
 * Usage:
 *   node scripts/pre_deploy_guardian.js [repoRootDir]
 *
 * Exit codes:
 *   0 = All clear — safe to deploy
 *   1 = BLOCKED — incomplete checklist or plan detected
 */

const fs = require('fs');
const path = require('path');

// ─── CONFIGURATION ────────────────────────────────────────────────────────────

/**
 * Files the guardian will ALWAYS check, in priority order.
 * These are paths relative to repoRootDir.
 */
const MANDATORY_CHECKLISTS = [
  'docs/master_deployment_checklist.md',
  'docs/evaluations/expanded_25_yes_gates_protocol.md',
  'docs/evaluations/rapid_release_5h_checklist.md',
  'docs/evaluations/ok_criteria_gate_5h_rapid_release.md',
];

/**
 * Files treated as PLAN documents — used to check feature completeness.
 * The guardian will warn if unchecked `[ ]` items exist in these.
 */
const PLAN_FILES = [
  'task.md',
  'implementation_plan.md',
  'walkthrough.md',
];

/**
 * Company guideline .md files to surface as context warnings.
 * The guardian reads these and reminds the agent they must be followed.
 */
const GUIDELINE_FILES = [
  'docs/agent_governance.md',
  'docs/company_rules.md',
  'CLAUDE.md',
];

// Skip directories when auto-discovering additional checklist .md files
const SKIP_DIRS = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage', '.github'];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Parse a markdown file and return all checklist items.
 * Returns { unchecked: [...], checked: [...], inProgress: [...] }
 */
function parseChecklist(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const unchecked = [];
  const checked = [];
  const inProgress = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (/^- \[ \]/.test(trimmed)) {
      unchecked.push({ lineNumber: index + 1, text: trimmed.replace(/^- \[ \]\s*/, '') });
    } else if (/^- \[x\]/i.test(trimmed)) {
      checked.push({ lineNumber: index + 1, text: trimmed.replace(/^- \[x\]\s*/i, '') });
    } else if (/^- \[\/\]/.test(trimmed)) {
      inProgress.push({ lineNumber: index + 1, text: trimmed.replace(/^- \[\/\]\s*/, '') });
    }
  });

  return { unchecked, checked, inProgress };
}

/**
 * Recursively find all .md files in a directory (excluding SKIP_DIRS).
 */
function findAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.includes(file)) {
        results = results.concat(findAllMdFiles(fullPath));
      }
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

/**
 * Print a horizontal divider.
 */
function divider(char = '─', len = 70) {
  console.log(char.repeat(len));
}

// ─── MAIN GUARDIAN LOGIC ─────────────────────────────────────────────────────

function runGuardian(repoRootDir) {
  console.log('\n');
  divider('═');
  console.log('🛡️  PRE-DEPLOY GUARDIAN — DEPLOYMENT READINESS SCAN');
  divider('═');
  console.log(`📁 Repo Root : ${repoRootDir}`);
  console.log(`🕐 Timestamp : ${new Date().toISOString()}`);
  divider();

  let deploymentBlocked = false;
  const blockingReasons = [];
  const warnings = [];

  // ── STEP 1: Mandatory Checklists ──────────────────────────────────────────
  console.log('\n📋 STEP 1 — Scanning Mandatory Deployment Checklists...\n');

  MANDATORY_CHECKLISTS.forEach(relPath => {
    const fullPath = path.join(repoRootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      warnings.push(`⚠️  Mandatory checklist NOT FOUND: ${relPath} — Create this file!`);
      return;
    }

    const { unchecked, checked, inProgress } = parseChecklist(fullPath);
    const total = unchecked.length + checked.length + inProgress.length;
    const completionPct = total === 0 ? 100 : Math.round((checked.length / total) * 100);

    if (unchecked.length > 0) {
      deploymentBlocked = true;
      blockingReasons.push({
        file: relPath,
        unchecked,
        inProgress,
        checked: checked.length,
        total
      });
      console.log(`  ❌ [BLOCKED] ${relPath}`);
      console.log(`     Progress: ${checked.length}/${total} complete (${completionPct}%)`);
      unchecked.slice(0, 5).forEach(item => {
        console.log(`     • Line ${item.lineNumber}: [ ] ${item.text.substring(0, 80)}`);
      });
      if (unchecked.length > 5) {
        console.log(`     ... and ${unchecked.length - 5} more unchecked items.`);
      }
    } else if (inProgress.length > 0) {
      warnings.push(`⚠️  In-progress items in: ${relPath} (${inProgress.length} task(s) marked [/])`);
      console.log(`  ⚠️  [IN PROGRESS] ${relPath} — ${inProgress.length} items still marked [/]`);
    } else {
      console.log(`  ✅ [PASS] ${relPath} — All ${checked.length} items checked.`);
    }
  });

  // ── STEP 2: Plan & Task Completeness ─────────────────────────────────────
  console.log('\n📐 STEP 2 — Scanning Plan & Task Files for Incomplete Features...\n');

  PLAN_FILES.forEach(relPath => {
    const fullPath = path.join(repoRootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      return; // Plan files are optional per-project
    }

    const { unchecked, checked, inProgress } = parseChecklist(fullPath);
    if (unchecked.length === 0 && inProgress.length === 0) {
      console.log(`  ✅ [COMPLETE] ${relPath} — All tasks done.`);
      return;
    }

    if (unchecked.length > 0 || inProgress.length > 0) {
      deploymentBlocked = true;
      const allIncomplete = [...inProgress, ...unchecked];
      blockingReasons.push({
        file: relPath,
        unchecked: allIncomplete,
        checked: checked.length,
        total: checked.length + allIncomplete.length
      });
      console.log(`  ❌ [BLOCKED] ${relPath} — Feature plan is INCOMPLETE`);
      allIncomplete.slice(0, 5).forEach(item => {
        console.log(`     • Line ${item.lineNumber}: ${item.text.substring(0, 80)}`);
      });
      if (allIncomplete.length > 5) {
        console.log(`     ... and ${allIncomplete.length - 5} more.`);
      }
    }
  });

  // ── STEP 3: Guideline Reminders ───────────────────────────────────────────
  console.log('\n📜 STEP 3 — Company Guideline Reminders...\n');

  GUIDELINE_FILES.forEach(relPath => {
    const fullPath = path.join(repoRootDir, relPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lineCount = content.split('\n').length;
      console.log(`  📌 ${relPath} (${lineCount} lines) — Active. Agent must comply before deploying.`);
    }
  });

  // ── STEP 4: Auto-discover any OTHER checklists with open items ────────────
  console.log('\n🔍 STEP 4 — Auto-scanning all .md files for unchecked items...\n');

  const allMdFiles = findAllMdFiles(repoRootDir);
  const alreadyScanned = new Set([
    ...MANDATORY_CHECKLISTS.map(p => path.resolve(repoRootDir, p)),
    ...PLAN_FILES.map(p => path.resolve(repoRootDir, p)),
    ...GUIDELINE_FILES.map(p => path.resolve(repoRootDir, p)),
  ]);

  let autoDiscoveredIssues = 0;
  allMdFiles.forEach(fullPath => {
    if (alreadyScanned.has(fullPath)) return;
    const { unchecked } = parseChecklist(fullPath);
    if (unchecked.length > 0) {
      const relPath = path.relative(repoRootDir, fullPath).replace(/\\/g, '/');
      warnings.push(`⚠️  ${relPath}: ${unchecked.length} unchecked item(s) found`);
      autoDiscoveredIssues++;
    }
  });

  if (autoDiscoveredIssues === 0) {
    console.log('  ✅ No additional unchecked items found in other .md files.');
  } else {
    console.log(`  ⚠️  Found unchecked items in ${autoDiscoveredIssues} additional file(s) (non-blocking, listed in warnings).`);
  }

  // ── FINAL VERDICT ─────────────────────────────────────────────────────────
  divider('═');

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (Non-blocking):');
    warnings.forEach(w => console.log(`  ${w}`));
  }

  if (deploymentBlocked) {
    divider('═');
    console.log('\n🚨  DEPLOYMENT BLOCKED — BRO, HINDI PA PWEDE I-DEPLOY!\n');
    divider('═');
    console.log('\nNakita ng Pre-Deploy Guardian ang mga sumusunod na blocking issues:\n');

    blockingReasons.forEach((reason, i) => {
      console.log(`  ${i + 1}. 📄 ${reason.file}`);
      console.log(`     Progress: ${reason.checked}/${reason.total} items complete`);
      console.log(`     Incomplete items:`);
      reason.unchecked.slice(0, 3).forEach(item => {
        console.log(`       ❌ Line ${item.lineNumber}: ${item.text.substring(0, 90)}`);
      });
      if (reason.unchecked.length > 3) {
        console.log(`       ... and ${reason.unchecked.length - 3} more.`);
      }
      console.log('');
    });

    console.log('👆 Complete ALL the above items first, then run this guardian again.');
    console.log('   Only when this script exits with ✅ ALL CLEAR are you safe to deploy.\n');
    divider('═');
    process.exit(1);
  } else {
    divider('═');
    console.log('\n✅  ALL CLEAR — Deployment is APPROVED by Pre-Deploy Guardian!\n');
    console.log('   All mandatory checklists are complete.');
    console.log('   All plan tasks are done.');
    console.log('   All guidelines are active.\n');
    console.log('   You may now proceed with: surge / npm run build / deploy\n');
    divider('═');
    process.exit(0);
  }
}

// ─── ENTRY POINT ──────────────────────────────────────────────────────────────

const targetDir = process.argv[2] || path.join(__dirname, '..');
runGuardian(targetDir);
