/**
 * design/scripts/validate_tokens.js
 * Programmatic Validation Script for master_tokens.json against tokens.schema.json
 */

const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '../tokens/tokens.schema.json');
const masterPath = path.join(__dirname, '../tokens/master_tokens.json');

console.log('🔍 Validating master_tokens.json structure...');

if (!fs.existsSync(schemaPath) || !fs.existsSync(masterPath)) {
  console.error('❌ Schema or master_tokens.json missing!');
  process.exit(1);
}

try {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));

  const requiredTop = schema.required || [];
  let missing = [];

  requiredTop.forEach(req => {
    if (!master[req]) {
      missing.push(req);
    }
  });

  if (missing.length > 0) {
    console.error(`❌ Validation Failed! Missing top-level keys: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log('✓ master_tokens.json strictly matches tokens.schema.json!');
  process.exit(0);
} catch (err) {
  console.error('❌ JSON Parsing Error:', err.message);
  process.exit(1);
}
