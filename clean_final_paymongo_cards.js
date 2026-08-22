const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Replace card 6 in Capabilities
html = html.replace(
  'PayMongo &amp; Direct Wire Rails',
  'Direct Bank Wire &amp; PayPal Global Rails'
);
html = html.replace(
  'PayMongo & Direct Wire Rails',
  'Direct Bank Wire & PayPal Global Rails'
);

html = html.replace(
  /Multi-currency settlement \(USD &amp; PHP\) via PayMongo \(GCash, Maya, Cards, QR Ph\), PayPal Smart Buttons, and direct corporate escrow bank wire rails\./g,
  'Multi-currency settlement (USD &amp; PHP) via Direct Bank Wire (BPI/BDO/UnionBank), GCash / Maya InstaPay (+63 962 281 2703), and PayPal Smart Buttons.'
);
html = html.replace(
  /Multi-currency settlement \(USD & PHP\) via PayMongo \(GCash, Maya, Cards, QR Ph\), PayPal Smart Buttons, and direct corporate escrow bank wire rails\./g,
  'Multi-currency settlement (USD & PHP) via Direct Bank Wire (BPI/BDO/UnionBank), GCash / Maya InstaPay (+63 962 281 2703), and PayPal Smart Buttons.'
);

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% REBRANDED & SYNCHRONIZED!');
