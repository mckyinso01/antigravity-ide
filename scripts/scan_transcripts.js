/**
 * Deep Transcript & Re-evaluation Prompt Scanner
 * Extracts proposal sections, code blocks, library imports, secret leaks, and pricing assertions.
 */
const fs = require('fs');
const path = require('path');

const TRANSCRIPTS_DIR = path.join(__dirname, '..', '.agents', 'scripts', 'output');
const LAST_DEBATE = path.join(TRANSCRIPTS_DIR, 'last_debate.md');
const LAST_VERDICT = path.join(TRANSCRIPTS_DIR, 'last_verdict.md');
const PKG_PATH = path.join(__dirname, '..', 'package.json');
const OUT_REPORT = path.join(TRANSCRIPTS_DIR, 'scan_report.json');
const REVAL_DIR = path.join(TRANSCRIPTS_DIR, 'reeval_prompts');

function readIfExists(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch (e) { return ''; }
}

const debateText = readIfExists(LAST_DEBATE);
const verdictText = readIfExists(LAST_VERDICT);
const pkgText = readIfExists(PKG_PATH);
const pkg = pkgText ? JSON.parse(pkgText) : { dependencies: {}, devDependencies: {} };

function extractProposals(md) {
  const sections = [];
  const lines = md.split('\n');
  let curTitle = 'Intro & Executive Summary';
  let curBody = [];

  for (const line of lines) {
    if (line.startsWith('## Proposal') || line.startsWith('### Proposal') || line.startsWith('## Specialist') || line.startsWith('### Specialist')) {
      if (curBody.length) sections.push({ title: curTitle, body: curBody.join('\n') });
      curTitle = line.trim();
      curBody = [];
    } else {
      curBody.push(line);
    }
  }
  if (curBody.length) sections.push({ title: curTitle, body: curBody.join('\n') });
  return sections;
}

function findCodeBlocks(text) {
  const blocks = [];
  const fenceRe = /```(\w*)\n([\s\S]*?)```/g;
  let m;
  while ((m = fenceRe.exec(text)) !== null) {
    blocks.push({ lang: m[1] || 'text', code: m[2] });
  }
  return blocks;
}

function findImports(code) {
  const imports = [];
  const reqRe = /require\(['"`]([^'"]+)['"`]\)/g;
  const importRe = /from\s+['"`]([^'"]+)['"`]/g;
  let m;
  while ((m = reqRe.exec(code)) !== null) imports.push(m[1]);
  while ((m = importRe.exec(code)) !== null) imports.push(m[1]);
  return imports;
}

function detectSecrets(text) {
  const patterns = [/ghp_[A-Za-z0-9]+/, /gsk_[A-Za-z0-9]+/, /AQ\.[A-Za-z0-9_\-]+/, /AKIA[A-Z0-9]+/];
  const found = [];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) found.push(...m);
  }
  return Array.from(new Set(found));
}

function isSimulated(text) {
  const triggers = ['Substituted due to', 'Local Simulation', 'Simulation', 'Fallback', 'Unauthorized', 'HTTP Error 401'];
  const t = text.toLowerCase();
  return triggers.some(s => t.includes(s.toLowerCase()));
}

function priceClaims(text) {
  const r = /\$\s?\d{2,}(?:,\d{3})*(?:\.\d+)?(?:\/mo|\/one-time)?/g;
  return text.match(r) || [];
}

function analyzeSection(sec, idx) {
  const codeBlocks = findCodeBlocks(sec.body);
  const imports = codeBlocks.flatMap(cb => findImports(cb.code));
  const secretMatches = detectSecrets(sec.body);
  const priceMatches = priceClaims(sec.body);
  const simulated = isSimulated(sec.body);
  const issues = [];

  if (simulated) issues.push({ type: 'simulation', msg: 'Proposal originated from fallback simulation engine.' });
  if (secretMatches.length) issues.push({ type: 'secret', msg: 'Exposed API credentials detected', matches: secretMatches });
  if (priceMatches.length) issues.push({ type: 'business', msg: 'Pricing / commercial claims detected', matches: priceMatches });

  const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const missingDeps = imports.filter(i => {
    if (i.startsWith('.') || i.startsWith('/')) return false;
    const name = i.split('/')[0];
    return !allDeps[name];
  });

  if (missingDeps.length) {
    issues.push({ type: 'missing_dependency', msg: 'Unlisted external libraries referenced', libs: missingDeps });
  }

  return {
    id: `proposal-${idx}`,
    title: sec.title,
    simulated,
    imports: Array.from(new Set(imports)),
    issues,
    codeBlocksCount: codeBlocks.length
  };
}

console.log(`\n🔍 Deep Scanning Council Transcripts...`);
const combinedText = debateText + '\n' + verdictText;
const sections = extractProposals(combinedText);
const results = sections.map((s, i) => analyzeSection(s, i + 1));

if (!fs.existsSync(REVAL_DIR)) {
  fs.mkdirSync(REVAL_DIR, { recursive: true });
}

results.forEach((r) => {
  const promptPayload = {
    proposal_id: r.id,
    title: r.title,
    simulated: r.simulated,
    repo_files: [],
    FILES: {},
    excerpt_issues: r.issues
  };
  fs.writeFileSync(path.join(REVAL_DIR, `${r.id}.json`), JSON.stringify(promptPayload, null, 2), 'utf8');
});

const report = {
  timestamp: new Date().toISOString(),
  total_sections_scanned: results.length,
  simulated_sections_found: results.filter(r => r.simulated).length,
  total_issues_found: results.reduce((acc, r) => acc + r.issues.length, 0),
  results
};

fs.writeFileSync(OUT_REPORT, JSON.stringify(report, null, 2), 'utf8');

console.log(`✅ Scan Complete: ${results.length} sections analyzed.`);
console.log(`📊 Scan Report Written to: ${OUT_REPORT}`);
console.log(`📂 Generated ${results.length} Re-eval Prompts in: ${REVAL_DIR}\n`);
