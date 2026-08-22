const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Add "Free 48h Sandbox" and "Partner Program" to Navigation Header Links
if (!html.includes('openSandboxPocModal()')) {
  html = html.replace(
    '<a class="text-on-surface-variant hover:text-white transition-colors" href="#calculator">ROI Calculator</a>',
    '<a class="text-cyan-400 hover:text-cyan-300 font-bold transition-colors cursor-pointer" onclick="openSandboxPocModal()">Free 48h Sandbox</a>\n        <a class="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer" onclick="openPartnerProgramModal()">Partner Program</a>\n        <a class="text-on-surface-variant hover:text-white transition-colors" href="#calculator">ROI Calculator</a>'
  );
  console.log('✅ Added Sandbox and Partner links to Main Navbar!');
}

// Add Starter Self-Hosted Micro-Tier card into the Pricing Matrix if not present
const starterTierCard = `
            <!-- STARTER SELF-HOSTED MICRO-TIER -->
            <div class="p-6 rounded-3xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 border-2 border-cyan-500/50 hover:border-cyan-400 transition-all flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    SELF-HOSTED STARTER
                  </span>
                  <span class="text-[10px] font-mono text-slate-400">INSTANT ON-PREM</span>
                </div>
                <h4 class="text-lg font-bold text-white mt-2 font-display">Single Facility / Studio License</h4>
                <p class="text-xs text-slate-400 font-sans mt-1">
                  Turnkey Docker installer for single-site operators, boutique clinics, and subcontractors.
                </p>
                <div class="mt-4 text-2xl font-black text-cyan-400 font-mono">
                  $199 <span class="text-xs text-slate-400 font-normal">/ ₱9,990</span>
                </div>
                <span class="text-[10px] text-slate-500 font-mono block">One-time perpetual fee &bull; 0 recurring SaaS fees</span>

                <ul class="mt-4 space-y-2 text-xs text-slate-300 font-mono">
                  <li class="flex items-center gap-2"><span class="text-cyan-400">✓</span> 1 Production Site / Node</li>
                  <li class="flex items-center gap-2"><span class="text-cyan-400">✓</span> Docker Compose Air-Gapped Stack</li>
                  <li class="flex items-center gap-2"><span class="text-cyan-400">✓</span> Universal 1-Click Migration Engine</li>
                  <li class="flex items-center gap-2"><span class="text-cyan-400">✓</span> Instant License Key Activation</li>
                </ul>
              </div>

              <div class="space-y-2 pt-2">
                <button type="button" onclick="selectPricingTier('Starter Self-Hosted Tier', 199, 9990)" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md">
                  <span>⚡ Instant License Activation ($199)</span>
                </button>
                <button type="button" onclick="openSandboxPocModal()" class="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer">
                  <span>🎁 Request Free 48h Custom Sandbox</span>
                </button>
              </div>
            </div>
`;

if (!html.includes('SELF-HOSTED STARTER')) {
  // Find pricing grid
  const gridPos = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-3 gap-6');
  if (gridPos !== -1) {
    html = html.replace(
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-6',
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-4'
    );
    const target = '<div class="grid grid-cols-1 md:grid-cols-4 gap-4';
    html = html.substring(0, gridPos) + target + '\n' + starterTierCard + html.substring(gridPos + target.length);
    console.log('✅ Injected Starter Self-Hosted Micro-Tier into Master Pricing Grid!');
  }
}

// Sync all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 PRICING & NAVBAR 100% SYNCHRONIZED ACROSS ALL 4 MASTER FILES!');
