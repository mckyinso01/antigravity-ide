const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function fixDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fixDirectory(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/class=/g, 'className=');
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Fixed ${file}`);
    }
  }
}

fixDirectory(srcDir);
