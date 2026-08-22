const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// The Saccade migration feature card
const saccadeMigrationCard = `
            <!-- Feature Card 0: Universal Hotjar & Crazy Egg Migration Engine -->
            <div class="p-5 rounded-2xl bg-gradient-to-b from-rose-950/40 to-pink-950/30 border border-rose-500/40 hover:border-rose-400 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">
                  <span class="material-symbols-outlined text-xl">visibility</span>
                </div>
                <span class="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  1-Click CRO Migration
                </span>
              </div>
              <h4 class="text-base font-bold text-white font-display">Universal Hotjar &amp; Crazy Egg 1-Click Migration</h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed">
                Instant analytics ingestion for growth agencies. Ingest 100,000+ session clicks, dwell times, and funnel drop-off steps directly from <strong>Hotjar</strong>, <strong>Crazy Egg</strong>, <strong>Google Analytics 4 (GA4)</strong>, or raw eye-tracking CSVs in under 3 seconds.
              </p>
              <div class="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-rose-300">
                <span class="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/30">✓ Hotjar / Crazy Egg / GA4 / Raw CSV</span>
                <span class="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/30">✓ Sub-15ms Neural Saliency Tensor Mapping</span>
                <span class="px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/30">✓ Zero Recurring Monthly SaaS Retainers</span>
              </div>
            </div>
`;

// Find the feature grid inside Saccade Dossier (DOSSIER 5)
const saccadePos = html.indexOf('<!-- DOSSIER 5: Saccade-UI');
if (saccadePos !== -1) {
  const gridPos = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">', saccadePos);
  if (gridPos !== -1 && gridPos < saccadePos + 10000) {
    const targetStr = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">';
    html = html.substring(0, gridPos) + targetStr + '\n' + saccadeMigrationCard + html.substring(gridPos + targetStr.length);
    console.log('✅ Injected 1-Click Hotjar/Crazy Egg Migration Card into Saccade Dossier!');
  }
}

// Update AI Demo Specialist knowledge for Saccade
html = html.replace(
  'Welcome to the <strong>Saccade-UI Evaluator</strong> AI Architecture Tour! This system predicts visual attention heatmaps and cognitive micro-friction using biological saccade eye-movement models.',
  'Welcome to the <strong>Saccade-UI Evaluator</strong> AI Architecture Tour! This system features a <strong>Universal 1-Click Hotjar, Crazy Egg & GA4 Migration Engine</strong> (instant zero-tagging heatmap import), biological saccade eye-tracking models, and predictive CRO micro-friction scoring.'
);

// Sync all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 SACCADE DOSSIER & AI SPECIALIST SYNCHRONIZED ACROSS ALL 4 ECOSYSTEM FILES!');
