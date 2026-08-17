/**
 * Production Remediation Agent Harness
 * Executes deterministic code quality & remediation evaluation matching exact Output Schema.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runRemediationAgent(repoRootDir) {
  console.log(`\n🚀 Starting Production Remediation Agent Execution on: ${repoRootDir}`);

  // 1. Gather repo_files
  const targetFiles = [
    'package.json',
    'src/api/base44Client.js',
    'src/lib/AuthContext.jsx',
    'scripts/validate_code_quality_schema.js',
    'docs/specifications/gemini_3_6_flash_deterministic_audit_spec.md'
  ];

  const repo_files = targetFiles.filter(f => fs.existsSync(path.join(repoRootDir, f)));
  const FILES = {};

  repo_files.forEach(f => {
    FILES[f] = fs.readFileSync(path.join(repoRootDir, f), 'utf8');
  });

  console.log(`📦 Loaded ${repo_files.length} repo_files into FILES mapping.`);

  // 2. Generate Schema-Compliant Remediation JSON
  const MOCK_PATTERNS = [
    /MOCK_/i,
    /mockData/i,
    /fakeData/i,
    /hardcoded/i,
    /staticData/i,
    /dummy/i,
    /John Doe/i,
    /test@test\.com/i,
    /lorem ipsum/i,
    /placeholder/i,
    /TODO/i,
    /FIXME/i
  ];

  function collectSourceFiles(dir, extensions) {
    let results = [];
    const skipDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        const dirName = path.basename(file);
        if (!skipDirs.includes(dirName)) {
          results = results.concat(collectSourceFiles(file, extensions));
        }
      } else {
        const ext = path.extname(file).toLowerCase();
        if (extensions.includes(ext)) {
          results.push(file);
        }
      }
    });
    return results;
  }

  function scanFileForMockViolations(filePath, repoRootDir) {
    const violations = [];
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const relativePath = path.relative(repoRootDir, filePath).replace(/\\/g, '/');

    lines.forEach((line, index) => {
      for (const pattern of MOCK_PATTERNS) {
        if (pattern.test(line)) {
          violations.push({
            file: relativePath,
            line: index + 1,
            content: line.trim(),
            pattern: pattern.source
          });
          break;
        }
      }
    });
    return violations;
  }

  const allSourceFiles = collectSourceFiles(repoRootDir, ['.js', '.jsx', '.ts', '.tsx', '.vue']);
  const allViolations = [];

  allSourceFiles.forEach(file => {
    allViolations.push(...scanFileForMockViolations(file, repoRootDir));
  });

  const outputJson = {
    audit_id: `REMED-${new Date().toISOString().slice(0,10)}-DYN`,
    summary: `Dynamic mock data scan completed on ${new Date().toISOString()}`,
    errors: [],
    findings: [],
    code_changes_suggested: [],
    metadata: {
      generated_at: new Date().toISOString(),
      model: "dynamic-scanner-v1",
      temperature: 0.0,
      files_scanned: allSourceFiles.length,
      total_violations: allViolations.length
    },
    post_checks: {
      patchs_apply_check: false,
      lint_passed: null,
      tests_passed: null,
      notes: []
    }
  };

  allViolations.forEach((violation, index) => {
    outputJson.findings.push({
      id: `MOCK-VIOLATION-${index + 1}`,
      title: `Mock/Static Data Detected`,
      severity: "high",
      description: `Pattern "${violation.pattern}" found in ${violation.file} at line ${violation.line}`,
      evidence: [{
        file: violation.file,
        startLine: violation.line,
        endLine: violation.line,
        snippet: violation.content
      }],
      proposed_fix: {
        type: "refactor",
        diff_unified: null,
        explanation: `Replace static/mock value with a real data source (API call, database query, or localStorage). Do NOT use hardcoded values in production components.`,
        tests_added: [],
        requires_human_review: true
      },
      confidence: 0.95
    });

    outputJson.code_changes_suggested.push({
      file: violation.file,
      change_type: "modify",
      diff_unified: null,
      explanation: `Line ${violation.line}: Remove mock pattern "${violation.pattern}" and wire to real data source.`
    });
  });

  outputJson.post_checks.notes.push(`Scanned ${allSourceFiles.length} source files`);
  outputJson.post_checks.notes.push(`Found ${allViolations.length} mock/static data violations`);
  if (allViolations.length === 0) {
    outputJson.post_checks.notes.push("PASS: Zero mock data violations detected. All source files are clean.");
  }

  const outputPath = path.join(repoRootDir, 'docs', 'evaluations', 'production_remediation_output.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(outputJson, null, 2), 'utf8');
  console.log(`✅ Saved Output JSON to: ${outputPath}`);

  // 3. Run validation check
  const validatorScript = path.join(repoRootDir, 'scripts', 'validate_code_quality_schema.js');
  if (fs.existsSync(validatorScript)) {
    console.log(`\n🧪 Running Auditor Script Validation:`);
    try {
      execSync(`node "${validatorScript}" "${outputPath}" "${repoRootDir}"`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`⚠️ Validation encountered non-zero exit code: ${err.message}`);
    }
  }
}

const targetDir = process.argv[2] || path.join(__dirname, '..');
runRemediationAgent(targetDir);

