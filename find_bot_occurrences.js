const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const html = fs.readFileSync(gatzCinematicIndex, 'utf8');

const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.includes('generateAiBotResponse')) {
    console.log(`[Line ${i + 1}] ${line.trim()}`);
  }
});
