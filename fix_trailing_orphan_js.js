const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Find the first </html> and trim everything after it
const htmlEndMarker = '</html>';
const firstHtmlIndex = html.indexOf(htmlEndMarker);

if (firstHtmlIndex !== -1) {
  html = html.substring(0, firstHtmlIndex + htmlEndMarker.length) + '\n';
  console.log('✅ Successfully stripped all trailing orphan JavaScript code after </html>!');
}

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% CLEANED & SYNCHRONIZED: Zero dangling code!');
