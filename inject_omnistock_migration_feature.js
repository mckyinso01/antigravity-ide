const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// The OmniStock migration feature card
const omnistockMigrationCard = `
            <!-- Feature Card 0: Universal Manhattan WMS & SAP EWM Migration Engine -->
            <div class="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-teal-950/30 border border-emerald-500/40 hover:border-emerald-400 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                  <span class="material-symbols-outlined text-xl">inventory_2</span>
                </div>
                <span class="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  1-Click WMS Migration
                </span>
              </div>
              <h4 class="text-base font-bold text-white font-display">Universal Manhattan &amp; SAP EWM 1-Click Migration</h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed">
                Instant catalog ingestion for 3PLs and distribution centers. Ingest 50,000+ Master SKUs, ABC velocity classifications, barcode/RFID mappings, and FEFO expiry matrices directly from <strong>Manhattan Associates</strong>, <strong>SAP EWM (MATMAS/LAGP)</strong>, <strong>NetSuite WMS</strong>, or <strong>Fishbowl</strong> in under 3 seconds.
              </p>
              <div class="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-emerald-300">
                <span class="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">✓ Manhattan / SAP EWM / NetSuite / Fishbowl</span>
                <span class="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">✓ 50,000 SKU Master Spreadsheet Ingestion</span>
                <span class="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">✓ 3D Spatial Racking &amp; Bin Auto-Assignment</span>
              </div>
            </div>
`;

// Find the feature grid inside OmniStock Dossier (DOSSIER 4)
const omnistockPos = html.indexOf('<!-- DOSSIER 4: OmniStock Enterprise');
if (omnistockPos !== -1) {
  const gridPos = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">', omnistockPos);
  if (gridPos !== -1 && gridPos < omnistockPos + 10000) {
    const targetStr = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">';
    html = html.substring(0, gridPos) + targetStr + '\n' + omnistockMigrationCard + html.substring(gridPos + targetStr.length);
    console.log('✅ Injected 1-Click Manhattan/SAP EWM Migration Card into OmniStock Dossier!');
  }
}

// Update AI Demo Specialist knowledge for OmniStock
html = html.replace(
  'Welcome to the <strong>OmniStock Enterprise</strong> AI Architecture Tour! This system transforms flat 2D warehouse logs into an interactive 3D spatial digital twin with automated wave pick path calculation.',
  'Welcome to the <strong>OmniStock Enterprise</strong> AI Architecture Tour! This system features a <strong>Universal 1-Click Manhattan & SAP EWM Migration Engine</strong> (50,000 SKU instant switch), 3D spatial racking digital twin, and automated wave pick route optimization.'
);

// Sync all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 OMNISTOCK DOSSIER & AI SPECIALIST SYNCHRONIZED ACROSS ALL 4 ECOSYSTEM FILES!');
