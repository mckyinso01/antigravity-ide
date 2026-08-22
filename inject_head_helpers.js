const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

const targetHead = `  <!-- Official Live PayPal Smart Payment Buttons SDK -->`;
const replacementHead = `  <script>
    window.hideDrawerLoader = function() {
      const loader = document.getElementById('drawer-loader');
      if (loader) loader.classList.add('hidden');
    };
  </script>
  <!-- Official Live PayPal Smart Payment Buttons SDK -->`;

if (!html.includes('window.hideDrawerLoader = function()')) {
  html = html.replace(targetHead, replacementHead);
  console.log('✅ Injected window.hideDrawerLoader in <head> to prevent ReferenceError!');
}

fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% SYNCHRONIZED!');
