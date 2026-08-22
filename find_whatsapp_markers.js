const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

console.log('--- SEARCHING FOR FLOATING OR CONTACT MARKERS ---');
const markers = ['wa.me', 'WhatsApp', 'floating-dock', 'contact-modal', 'Founder Direct'];
markers.forEach(m => {
  let pos = 0;
  while ((pos = html.indexOf(m, pos)) !== -1) {
    console.log(`Found "${m}" at ${pos}:`);
    console.log(html.substring(pos - 50, pos + 200));
    pos += m.length;
  }
});
