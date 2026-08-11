#!/usr/bin/env node
/**
 * tools/validate_tokens.js
 * - Validates design/tokens/master_tokens.json against tokens.schema.json.
 * - Uses Ajv if available, with pure Node JSON validation fallback.
 */
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const TOKENS_PATH = path.join(ROOT, 'design', 'tokens', 'master_tokens.json');
const SCHEMA_PATH = path.join(ROOT, 'design', 'tokens', 'tokens.schema.json');

function main() {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.error('ERROR: tokens file not found:', TOKENS_PATH);
    process.exit(2);
  }
  const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));

  try {
    const Ajv = require('ajv');
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);
    const ok = validate(tokens);
    if (!ok) {
      console.error('Token validation failed:');
      console.error(validate.errors);
      process.exit(1);
    }
  } catch (err) {
    // Pure Node fallback check for required root keys
    const requiredKeys = schema.required || ['colors', 'buttons', 'shadows', 'borders', 'motion'];
    const missing = requiredKeys.filter(k => !(k in tokens));
    if (missing.length > 0) {
      console.error('Token validation failed! Missing keys:', missing);
      process.exit(1);
    }
  }

  // console.log('Design tokens validation: OK');
  process.exit(0);
}

if (require.main === module) main();

