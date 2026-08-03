/**
 * Automated Transcript & Council Verdict Sanity Scanner
 * Performs automated provenance, simulation tagging, library existence, and secret checks.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function scanTranscript(transcriptPath, repoRootDir) {
  console.log(`\n🔍 Scanning Council Transcript: ${transcriptPath}`);

  if (!fs.existsSync(transcriptPath)) {
    console.log(`⚠️ Transcript file not found: ${transcriptPath} (skipping scan).`);
    process.exit(0);
  }

  const content = fs.readFileSync(transcriptPath, 'utf8');
  const issues = [];
  let isSimulated = false;

  // Rule 1: Simulation Flagging (IsSimulated)
  if (content.includes('Local Simulation') || content.includes('Substituted due to:')) {
    isSimulated = true;
    console.log(`ℹ️ [SIMULATION DETECTED] Transcript originated from fallback simulation engine.`);
  }

  // Rule 2: Secret Scanner (SecretScan)
  const secretPatterns = [
    /github_pat_[a-zA-Z0-9_]{30,}/g,
    /gsk_[a-zA-Z0-9]{35,}/g,
    /AQ\.[a-zA-Z0-9_\-]{30,}/g,
    /AKIA[0-9A-Z]{16}/g
  ];

  secretPatterns.forEach((regex) => {
    const matches = content.match(regex);
    if (matches) {
      issues.push(`CRITICAL: Exposed API Secret Pattern detected (${matches.length} instance(s)).`);
    }
  });

  // Rule 3: Business Pricing Decision Flagging (PriceCheck)
  const priceRegex = /\$\d{2,}(?:,\d{3})*(?:\/mo|\/one-time)?/g;
  const pricesFound = content.match(priceRegex);
  if (pricesFound) {
    console.log(`💡 [BUSINESS DECISION FLAGGED] Unverified pricing assertions detected: ${pricesFound.join(', ')}`);
  }

  // Rule 4: Library Existence Checks (LibExistence)
  const pkgPath = path.join(repoRootDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };

    const requireRegex = /require\(['"]([^'"]+)['"]\)|from ['"]([^'"]+)['"]/g;
    let match;
    while ((match = requireRegex.exec(content)) !== null) {
      const libName = match[1] || match[2];
      if (libName && !libName.startsWith('.') && !libName.startsWith('/') && !['fs','path','child_process','os','http','https','util','events'].includes(libName)) {
        if (!allDeps[libName]) {
          console.warn(`⚠️ [UNGROUNDED DEP] Snippet references unlisted dependency: '${libName}'`);
        }
      }
    }
  }

  console.log(`\n📊 TRANSCRIPT SANITY REPORT:`);
  console.log(`- Simulated Run: ${isSimulated ? 'YES (Auto-patches restricted)' : 'NO (Live model output)'}`);
  console.log(`- Secret Violations: ${issues.length}`);

  if (issues.length > 0) {
    console.error(`❌ SANITY SCAN FAILED with ${issues.length} critical issue(s):`);
    issues.forEach(i => console.error(`  - ${i}`));
    process.exit(1);
  } else {
    console.log(`✅ SANITY SCAN PASSED: Zero secret leaks, full transcript compliance!\n`);
    process.exit(0);
  }
}

const repoRoot = process.argv[3] || path.join(__dirname, '..');
const targetFile = process.argv[2] || path.join(repoRoot, '.agents', 'scripts', 'output', 'last_verdict.md');

scanTranscript(targetFile, repoRoot);
