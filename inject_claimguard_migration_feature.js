const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// The ClaimGuard migration feature card
const claimguardMigrationCard = `
            <!-- Feature Card 0: Universal Epic Resolute & EDI 835 Migration Engine -->
            <div class="p-5 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-blue-950/30 border border-cyan-500/40 hover:border-cyan-400 transition-all space-y-3 shadow-lg">
              <div class="flex items-center justify-between">
                <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                  <span class="material-symbols-outlined text-xl">gavel</span>
                </div>
                <span class="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  1-Click RCM Migration
                </span>
              </div>
              <h4 class="text-base font-bold text-white font-display">Universal Epic Resolute &amp; EDI 835 1-Click Migration</h4>
              <p class="text-xs text-slate-300 font-sans leading-relaxed">
                Instant revenue recovery switch for hospital billing networks. Ingest 10,000+ denial lines, CARC/RARC unbundling codes, patient MRNs, and clearinghouse advice files directly from <strong>Epic Resolute HB/PB</strong>, <strong>ANSI X12 EDI 835/837</strong>, <strong>Optum</strong>, or <strong>Change Healthcare</strong> in under 3 seconds.
              </p>
              <div class="pt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-cyan-300">
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">✓ Epic Resolute / EDI 835 / Optum / Cerner</span>
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">✓ Automated ERISA § 502(a) Citation Mapping</span>
                <span class="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">✓ 2% Statutory Prompt Pay Clock Activation</span>
              </div>
            </div>
`;

// Find the feature grid inside ClaimGuard Dossier (DOSSIER 2)
const claimguardPos = html.indexOf('<!-- DOSSIER 2: ClaimGuard AI');
if (claimguardPos !== -1) {
  const gridPos = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">', claimguardPos);
  if (gridPos !== -1 && gridPos < claimguardPos + 10000) {
    const targetStr = '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">';
    html = html.substring(0, gridPos) + targetStr + '\n' + claimguardMigrationCard + html.substring(gridPos + targetStr.length);
    console.log('✅ Injected 1-Click Epic/EDI 835 Migration Card into ClaimGuard Dossier!');
  }
}

// Update AI Demo Specialist knowledge for ClaimGuard
html = html.replace(
  'Welcome to the <strong>ClaimGuard AI</strong> Architecture Tour! This system overturns wrongful commercial insurance claim denials using automated ERISA § 502(a) briefs and 2% prompt pay interest penalties.',
  'Welcome to the <strong>ClaimGuard AI</strong> Architecture Tour! This system features a <strong>Universal 1-Click Epic Resolute & EDI 835 Migration Engine</strong> (instant zero-loss claim import), automated ERISA § 502(a) legal briefs, and 2% statutory prompt pay enforcement.'
);

// Sync all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 CLAIMGUARD DOSSIER & AI SPECIALIST SYNCHRONIZED ACROSS ALL 4 ECOSYSTEM FILES!');
