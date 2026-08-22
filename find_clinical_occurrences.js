const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const html = fs.readFileSync(gatzCinematicIndex, 'utf8');

let pos = 0;
while ((pos = html.indexOf('Clinical Pristine', pos)) !== -1) {
  console.log(`Occurrence at ${pos}:`);
  console.log(html.substring(Math.max(0, pos - 100), Math.min(html.length, pos + 250)));
  console.log('--------------------------------------------------');
  pos += 'Clinical Pristine'.length;
}
