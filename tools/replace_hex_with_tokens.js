#!/usr/bin/env node
/**
 * tools/replace_hex_with_tokens.js
 * - Scans source files for hardcoded hex colors and suggests replacements based on master_tokens.json.
 * - Runs in --dry mode by default and outputs suggestions to reports/hex_replacements.json
 *
 * Usage:
 *  node tools/replace_hex_with_tokens.js --dry
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const TOKENS_PATH = path.join(ROOT, 'omnistock', 'design', 'tokens', 'master_tokens.json');
const OUT_DIR = path.join(ROOT, 'reports');
fs.mkdirSync(OUT_DIR, { recursive: true });

const argv = process.argv.slice(2);
const dry = argv.includes('--dry');

if (!fs.existsSync(TOKENS_PATH)) {
  console.error('master_tokens.json not found:', TOKENS_PATH);
  process.exit(2);
}
const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
const colorMap = {};

function extractColors(obj, prefix = '') {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && v.startsWith('#')) {
      colorMap[v.toLowerCase()] = prefix ? `${prefix}.${k}` : k;
    } else if (typeof v === 'object' && v !== null) {
      extractColors(v, prefix ? `${prefix}.${k}` : k);
    }
  }
}
extractColors(tokens.colors || {});

const searchDirs = ['src', 'omnistock/src', 'packages'];
const validExts = ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'];
const occurrences = [];

function walkDir(dir) {
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    const resPath = path.join(fullDir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        walkDir(path.relative(ROOT, resPath));
      }
    } else if (entry.isFile() && validExts.includes(path.extname(entry.name))) {
      const content = fs.readFileSync(resPath, 'utf8');
      const re = /#[0-9A-Fa-f]{6}/g;
      let m;
      while ((m = re.exec(content)) !== null) {
        const hex = m[0].toLowerCase();
        const tokenName = colorMap[hex] || null;
        const line = content.substring(0, m.index).split('\n').length;
        occurrences.push({
          file: path.relative(ROOT, resPath),
          line,
          hex,
          suggested_token: tokenName
        });
      }
    }
  }
}

for (const d of searchDirs) {
  walkDir(d);
}

const outPath = path.join(OUT_DIR, 'hex_replacements.json');
fs.writeFileSync(outPath, JSON.stringify({ occurrences_count: occurrences.length, occurrences }, null, 2), 'utf8');
// console.log(`Hex scan complete. Found ${occurrences.length} hardcoded hex occurrences.`);
// console.log('Results written to:', outPath);
process.exit(0);

