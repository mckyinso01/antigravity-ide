/**
 * 🕵️ AUDIT GITHUB WORKFLOWS & FIND ROOT CAUSE OF FAILED RUNS
 */

const fs = require('fs');
const path = require('path');

const wfDir = path.join(__dirname, '.github', 'workflows');
const files = fs.readdirSync(wfDir);

console.log('========================================================================');
console.log('🕵️ GITHUB ACTIONS WORKFLOWS INVENTORY & FAILURE ROOT CAUSE ANALYSIS');
console.log('========================================================================\n');

files.forEach(file => {
  const fullPath = path.join(wfDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  
  console.log(`📄 WORKFLOW: ${file}`);
  
  // Find triggers
  const onMatch = content.match(/on:\s*([\s\S]*?)(?=jobs:|$)/);
  if (onMatch) {
    const lines = onMatch[0].split('\n').filter(l => l.trim() && !l.startsWith('#')).map(l => '   ' + l.trim());
    console.log(`   Triggers:\n${lines.join('\n')}`);
  }

  // Find run commands
  const runMatches = content.match(/run:\s*([^\n]+|\|[\s\S]*?(?=\n\s*-[a-zA-Z]|\n\s*[a-zA-Z0-9_-]+:|$))/g);
  if (runMatches) {
    console.log('   Commands:');
    runMatches.forEach(r => {
      console.log('     ├─ ' + r.replace(/\n\s*/g, ' ').slice(0, 80));
    });
  }
  console.log('------------------------------------------------------------------------');
});
