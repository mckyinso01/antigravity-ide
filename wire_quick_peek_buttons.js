const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Replace standard tour buttons with dual Peek + Sandbox actions
html = html.replace(
  'onclick="window.triggerLinkableDemo ? window.triggerLinkableDemo(\\\'clinical\\\') : openContactModal()"',
  'onclick="openLiveAppDrawer(\\\'clinical\\\')"'
);

html = html.replace(
  'onclick="openCoDesignSurvey(\\\'Clinical Pristine OS\\\')"',
  'onclick="openLiveAppDrawer(\\\'clinical\\\')"'
);

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('✅ Wired Quick Peek buttons to Live Drawer across all files.');
