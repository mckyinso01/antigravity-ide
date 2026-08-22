const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. Remove dangling duplicate snippet in Featured Products header if present
const danglingSnippet = `          <div>
            <div class="text-[10px] text-slate-400 font-bold">SPATIAL WMS</div>
            <div class="text-xs font-bold text-white group-hover:text-emerald-400">omnistock.linkable.it.com</div>
          </div>
          <div class="text-right">
            <span class="text-[10px] text-emerald-400 font-bold">18ms</span>
            <span class="block text-[9px] text-slate-500">HEALTHY</span>
          </div>
          </a>

          <!-- Subdomain 4: Saccade-UI -->
          <a href="https://saccade.linkable.it.com" target="_blank" rel="noopener noreferrer"
            class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-rose-500 transition-all flex items-center justify-between group">
            <div>
              <div class="text-[10px] text-slate-400 font-bold">NEURO BIOMETRIC CRO</div>
              <div class="text-xs font-bold text-white group-hover:text-rose-400">saccade.linkable.it.com</div>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-emerald-400 font-bold">15ms</span>
              <span class="block text-[9px] text-slate-500">HEALTHY</span>
            </div>
          </a>
        </div>
      </div>`;

if (html.includes(danglingSnippet)) {
  html = html.replace(danglingSnippet, '');
  console.log('✅ Removed dangling duplicate subdomains snippet.');
}

// 2. Properly space the Hero, Dock, Legacy vs Sovereign, and Dossiers
// Let's ensure Engine #1 (Quick Launch Dock) has distinct standalone container spacing with mb-24
const oldDockBlock = `<!-- ⚡ ENGINE #1: ZERO-FRICTION 1-CLICK QUICK-LAUNCH SANDBOX DOCK -->
      <div class="mt-8 pt-6 border-t border-slate-800/80 max-w-5xl mx-auto">`;

const newDockBlock = `<!-- ========================================================================= -->
      <!-- ⚡ ENGINE #1: ZERO-FRICTION 1-CLICK QUICK-LAUNCH SANDBOX DOCK (ELEVATED)  -->
      <!-- ========================================================================= -->
      <div class="mt-12 mb-20 p-6 md:p-8 rounded-3xl glass-card border border-cyan-500/30 bg-gradient-to-b from-[#0B1C30]/90 via-slate-950/90 to-[#050811] shadow-2xl max-w-5xl mx-auto">`;

if (html.includes(oldDockBlock)) {
  html = html.replace(oldDockBlock, newDockBlock);
  console.log('✅ Elevated Quick-Launch Dock into distinct standalone card with generous margins.');
}

// 3. Ensure Legacy vs Sovereign Section has generous top & bottom margins (my-24)
const oldLegacySection = `<section class="max-w-7xl mx-auto px-6 md:px-16 mb-24" id="legacy-vs-sovereign">`;
const newLegacySection = `<section class="max-w-7xl mx-auto px-6 md:px-16 my-24" id="legacy-vs-sovereign">`;

if (html.includes(oldLegacySection)) {
  html = html.replace(oldLegacySection, newLegacySection);
  console.log('✅ Enhanced Legacy vs Sovereign section with clean my-24 vertical spacing.');
}

// 4. Ensure Drawer has a background backdrop click-to-close overlay
const oldDrawer = `<div id="live-app-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-slate-950 border-l border-slate-800 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">`;
const newDrawer = `<!-- Backdrop Overlay for Live Drawer -->
<div id="live-app-drawer-backdrop" onclick="closeLiveAppDrawer()" class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm hidden transition-opacity duration-300"></div>

<div id="live-app-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-slate-950 border-l border-slate-800 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">`;

if (html.includes(oldDrawer) && !html.includes('id="live-app-drawer-backdrop"')) {
  html = html.replace(oldDrawer, newDrawer);
  console.log('✅ Added backdrop overlay for Slide Drawer.');
}

// 5. Update openLiveAppDrawer / closeLiveAppDrawer to toggle the backdrop
html = html.replace(
  `drawer.classList.remove('translate-x-full');\n  drawer.classList.add('translate-x-0');`,
  `drawer.classList.remove('translate-x-full');\n  drawer.classList.add('translate-x-0');\n  const backdrop = document.getElementById('live-app-drawer-backdrop');\n  if (backdrop) backdrop.classList.remove('hidden');`
);

html = html.replace(
  `drawer.classList.remove('translate-x-0');\n  drawer.classList.add('translate-x-full');`,
  `drawer.classList.remove('translate-x-0');\n  drawer.classList.add('translate-x-full');\n  const backdrop = document.getElementById('live-app-drawer-backdrop');\n  if (backdrop) backdrop.classList.add('hidden');`
);

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 Successfully polished layout spacing, removed colliding elements, and updated all 4 files!');
