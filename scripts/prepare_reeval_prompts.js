/**
 * Re-evaluation Prompt Batch Preparer
 * Merges repo files context into generated reeval prompts for Gemini.
 */
const fs = require('fs');
const path = require('path');

const REEVAL_DIR = path.join(__dirname, '..', '.agents', 'scripts', 'output', 'reeval_prompts');
const PAYLOADS_DIR = path.join(__dirname, '..', '.agents', 'scripts', 'output', 'reeval_payloads');
const REPO_ROOT = path.join(__dirname, '..');

// console.log(`\n📦 Preparing Re-evaluation Prompt Payloads for Gemini...`);

if (!fs.existsSync(REEVAL_DIR)) {
  console.error(`❌ Reeval prompts directory missing. Run 'node scripts/scan_transcripts.js' first.`);
  process.exit(1);
}

if (!fs.existsSync(PAYLOADS_DIR)) {
  fs.mkdirSync(PAYLOADS_DIR, { recursive: true });
}

const promptFiles = fs.readdirSync(REEVAL_DIR).filter(f => f.endsWith('.json'));

promptFiles.forEach((file) => {
  const raw = fs.readFileSync(path.join(REEVAL_DIR, file), 'utf8');
  const data = JSON.parse(raw);

  const sampleRepoFiles = ['package.json', 'docs/company_rules.md', 'policies/agent_policy.yaml'];
  const FILES = {};

  sampleRepoFiles.forEach((rf) => {
    const abs = path.join(REPO_ROOT, rf);
    if (fs.existsSync(abs)) {
      FILES[rf] = fs.readFileSync(abs, 'utf8');
    }
  });

  data.repo_files = sampleRepoFiles;
  data.FILES = FILES;

  const payloadPath = path.join(PAYLOADS_DIR, file);
  fs.writeFileSync(payloadPath, JSON.stringify(data, null, 2), 'utf8');
});

// console.log(`✅ Prepared ${promptFiles.length} prompt payload(s) in: ${PAYLOADS_DIR}\n`);

