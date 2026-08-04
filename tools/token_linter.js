#!/usr/bin/env node
/**
 * Cross-Platform Token Linter for Antigravity IDE & OmniStock POS
 * Scans source code for un-tokenized raw hex colors outside approved token files.
 */
const fs = require('fs');
const path = require('path');

const ALLOWED_FILES = [
  'master_tokens.json',
  'designSystem.js',
  'design-tokens.json',
  'tokens.schema.json',
  'tailwind.config.js',
  'index.css'
];

const SCAN_DIRS = [
  path.join(__dirname, '../omnistock/src'),
  path.join(__dirname, '../src')
];

let totalViolations = 0;
const HEX_REGEX = /#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b/g;

function scanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        scanDir(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js'))) {
      if (ALLOWED_FILES.some(allowed => entry.name.includes(allowed))) continue;

      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        // Skip comment lines
        if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) return;
        
        const matches = line.match(HEX_REGEX);
        if (matches) {
          // Flag ad-hoc inline hex color overrides
          matches.forEach(match => {
            // Allow standard theme constants in specific files
            if (line.includes('DESIGN_TOKENS') || line.includes('DEMON_SLAYER')) return;
            console.log(`⚠️ Token Linter Warning: ${path.relative(process.cwd(), fullPath)}:${idx + 1} - Raw hex color "${match}" detected.`);
            totalViolations++;
          });
        }
      });
    }
  }
}

console.log('🔍 Running Antigravity IDE Design Token Linter Audit...');
SCAN_DIRS.forEach(dir => scanDir(dir));

if (totalViolations > 50) {
  console.log(`\n❌ Token Linter Failed: Found ${totalViolations} raw hex color instances requiring tokenization.`);
  process.exit(1);
} else {
  console.log(`\n✅ Token Linter Passed! Total un-tokenized instances within acceptable threshold (${totalViolations} warnings).`);
  process.exit(0);
}
