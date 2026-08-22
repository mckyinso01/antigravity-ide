const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Find SiteSafe Dossier in index.html
const sitesafeMarker = 'SiteSafe StructuraPro';
console.log('SiteSafe occurrences:');
let pos = 0;
while ((pos = html.indexOf(sitesafeMarker, pos)) !== -1) {
  console.log(`At index ${pos}:`);
  console.log(html.substring(pos, pos + 200));
  pos += sitesafeMarker.length;
}
