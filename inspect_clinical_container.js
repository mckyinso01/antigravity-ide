const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Find Clinical Pristine section and inject the 1-Click Universal EHR Migration Engine feature
const clinicalSearchText = 'Multi-Bed ICU &amp; CCU Patient Safety Command';
const clinicalSearchTextAlt = 'Multi-Bed ICU & CCU Patient Safety Command';

if (html.includes(clinicalSearchText) || html.includes(clinicalSearchTextAlt)) {
  console.log('Found Clinical Pristine container in index.html!');
} else {
  console.log('Searching for Clinical Pristine markers...');
}

// Let's check where the Clinical Pristine capabilities and feature cards are
const featureMarker = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">';
// Let's inspect the Clinical Pristine container block
const clinicalIndex = html.indexOf('Clinical Pristine');
if (clinicalIndex !== -1) {
  console.log('Clinical Pristine index:', clinicalIndex);
  console.log(html.substring(clinicalIndex, clinicalIndex + 800));
}
