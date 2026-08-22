const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// The SiteSafe migration feature card
const sitesafeMigrationCard = `
            <!-- Feature Card 0: Universal Procore & Primavera P6 Migration Engine -->
            <div class="p-5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-orange-950/30 border border-amber-500/40 hover:border-amber-400 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  <span class="material-symbols-outlined text-xl">engineering</span>
                </div>
                <span class="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  1-Click GC Migration
                </span>
              </div>
              <h4 class="text-base font-bold text-white font-display">Universal Procore &amp; Primavera P6 1-Click Migration</h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed">
                Zero re-entry friction for General Contractors. Import full CPM Gantt schedules, predecessor logic, subcontractor directories, and AIA G702/G703 billing schedules directly from <strong>Procore</strong>, <strong>Oracle Primavera P6 (.xml/.xer)</strong>, <strong>Microsoft Project (.mpp)</strong>, or <strong>Autodesk ACC (BIM 360)</strong> in under 3 seconds.
              </p>
              <div class="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-amber-300">
                <span class="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">✓ Procore / P6 / MS Project / BIM 360</span>
                <span class="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">✓ Critical Path Predecessor Auto-Link</span>
                <span class="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">✓ AIA G702 Pay App Billing Schedule</span>
              </div>
            </div>
`;

// Find the feature grid inside SiteSafe Dossier (after index 82000)
const sitesafePos = html.indexOf('<!-- DOSSIER 3: SiteSafe StructuraPro');
if (sitesafePos !== -1) {
  const gridPos = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">', sitesafePos);
  if (gridPos !== -1 && gridPos < sitesafePos + 10000) {
    const targetStr = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">';
    html = html.substring(0, gridPos) + targetStr + '\n' + sitesafeMigrationCard + html.substring(gridPos + targetStr.length);
    console.log('✅ Injected 1-Click Procore/P6 Migration Card into SiteSafe Dossier!');
  }
}

// Update AI Demo Specialist knowledge for SiteSafe
html = html.replace(
  'Welcome to the <strong>SiteSafe StructuraPro</strong> AI Architecture Tour! This engineering OS eliminates liquidated damages with dynamic Critical Path Method (CPM) Gantt schedules and automated NOAA weather claim generation.',
  'Welcome to the <strong>SiteSafe StructuraPro</strong> AI Architecture Tour! This engineering OS features a <strong>Universal 1-Click Procore & Primavera P6 Migration Engine</strong> (instant zero-loss schedule switch), dynamic Critical Path Method (CPM) Gantt float protection, and automated NOAA weather claim generation.'
);

// Sync all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% SYNCHRONIZED ACROSS ALL 4 ECOSYSTEM FILES!');
