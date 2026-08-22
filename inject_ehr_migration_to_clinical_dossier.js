const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Check Clinical Pristine Feature Pills & Badges
// Let's add the Universal EHR Migration Engine Card to the Clinical Pristine Technical Matrix
const migrationCardHtml = `
            <!-- Feature Card 0: Universal EHR Migration Engine -->
            <div class="p-5 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-blue-950/30 border border-cyan-500/40 hover:border-cyan-400 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                  <span class="material-symbols-outlined text-xl">database</span>
                </div>
                <span class="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  1-Click EHR Migration
                </span>
              </div>
              <h4 class="text-base font-bold text-white font-display">Universal Legacy EHR / EMR 1-Click Migration Engine</h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed">
                Zero data loss hospital switch. Ingest complete patient censuses, active eMAR schedules, vitals, and allergy histories directly from <strong>Epic Systems (Hyperspace)</strong>, <strong>Cerner (Oracle Health)</strong>, <strong>Meditech Expanse</strong>, <strong>FHIR R4 Bundles</strong>, or generic hospital CSV/Excel spreadsheets in under 3 seconds.
              </p>
              <div class="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-cyan-300">
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">✓ Epic / Cerner / Meditech</span>
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">✓ HL7 v2 / FHIR R4 Dual Parser</span>
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">✓ Pre-Flight Allergy &amp; Conflict Scanner</span>
              </div>
            </div>
`;

// Insert the migration card into Clinical Pristine's 3-column feature grid
const clinicalGridTarget = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">';
if (html.includes(clinicalGridTarget)) {
  html = html.replace(
    clinicalGridTarget,
    `${clinicalGridTarget}\n${migrationCardHtml}`
  );
  console.log('✅ Injected Universal EHR Migration Card into Clinical Pristine Showcase!');
}

// Update AI bot knowledge for Clinical Pristine as well
html = html.replace(
  'Welcome to the <strong>Clinical Pristine ICU OS</strong> AI Architecture Tour! This platform eliminates bedside medication dosage errors with real-time waveform telemetry and barcoded 5-Rights eMAR verification.',
  'Welcome to the <strong>Clinical Pristine ICU OS</strong> AI Architecture Tour! This platform features a <strong>Universal 1-Click Legacy EHR Migration Engine</strong> (instant zero-data-loss switch from Epic, Cerner, Meditech & CSV), sub-second multi-waveform telemetry, and barcoded 5-Rights eMAR verification.'
);

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% SYNCHRONIZED ACROSS ALL ECOSYSTEM HUBS!');
