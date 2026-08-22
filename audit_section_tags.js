const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const html = fs.readFileSync(gatzCinematicIndex, 'utf8');

const lines = html.split('\n');
let sectionStack = [];

lines.forEach((line, index) => {
  const lineNum = index + 1;
  const sectionOpenMatches = line.matchAll(/<section([^>]*)>/g);
  for (const match of sectionOpenMatches) {
    const idMatch = match[1].match(/id="([^"]+)"/);
    const id = idMatch ? idMatch[1] : 'unnamed-section';
    sectionStack.push({ lineNum, id });
    console.log(`[L${lineNum}] OPEN <section id="${id}"> (Depth: ${sectionStack.length})`);
  }

  const sectionCloseMatches = line.matchAll(/<\/section>/g);
  for (const match of sectionCloseMatches) {
    const popped = sectionStack.pop();
    console.log(`[L${lineNum}] CLOSE </section> -> closed ${popped ? popped.id : 'EXTRA CLOSE'} (Remaining depth: ${sectionStack.length})`);
  }
});

console.log('Final Unclosed Sections:', sectionStack);
