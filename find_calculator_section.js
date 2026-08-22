const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Find calculator section in index.html
const calcMarkers = ['calculator', 'Pricing & Calculator', 'calculator-section', 'roi-calculator'];
calcMarkers.forEach(m => {
  let pos = 0;
  while ((pos = html.toLowerCase().indexOf(m.toLowerCase(), pos)) !== -1) {
    console.log(`Found "${m}" at ${pos}:`);
    console.log(html.substring(pos, pos + 250));
    pos += m.length;
  }
});
