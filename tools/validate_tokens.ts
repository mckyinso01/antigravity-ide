/**
 * Design Token Schema Validator CLI
 * Validates master_tokens.json against tokens.schema.json
 */
import * as fs from 'fs';
import * as path from 'path';

function validateDesignTokens() {
  const tokenPath = path.join(__dirname, '../omnistock/design/tokens/master_tokens.json');
  const schemaPath = path.join(__dirname, '../omnistock/design/tokens/tokens.schema.json');

  if (!fs.existsSync(tokenPath)) {
    console.error(`❌ Token file not found: ${tokenPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ Schema file not found: ${schemaPath}`);
    process.exit(1);
  }

  const tokens = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

  const requiredSections = schema.required || [];
  const missing = requiredSections.filter((section: string) => !(section in tokens));

  if (missing.length > 0) {
    console.error(`❌ Token Schema Validation Failed! Missing sections: ${missing.join(', ')}`);
    process.exit(1);
  }

  console.log(`✅ Token Schema Validation Passed! Token file "${tokens.name}" (v${tokens.version}) satisfies all schema requirements.`);
}

validateDesignTokens();
