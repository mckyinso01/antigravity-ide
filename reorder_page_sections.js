const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. Extract Engine #1 (Quick Launch Dock) block
const dockStartMarker = '<!-- ========================================================================= -->\n      <!-- ⚡ ENGINE #1: ZERO-FRICTION 1-CLICK QUICK-LAUNCH SANDBOX DOCK (ELEVATED)  -->';
const dockEndMarker = '<!-- ========================================================================= -->\n<!-- ⚡ ENGINE #2: INTERACTIVE LEGACY MONOPOLIES VS LINKABLEAI SOVEREIGN MATRIX -->';

// Let's locate both sections cleanly
const engine2StartMarker = '<!-- ========================================================================= -->\n<!-- ⚡ ENGINE #2: INTERACTIVE LEGACY MONOPOLIES VS LINKABLEAI SOVEREIGN MATRIX -->';
const engine2EndMarker = '</section>\n\n<!-- FILTER RAIL & KEYWORD SEARCH BAR -->';

// Let's create clean standalone markup for Engine 1 & Engine 2
const cleanEngine1Section = `
    <!-- ========================================================================= -->
    <!-- ⚡ ENGINE #1: ZERO-FRICTION 1-CLICK QUICK-LAUNCH SANDBOX DOCK (ELEVATED)  -->
    <!-- ========================================================================= -->
    <section class="max-w-7xl mx-auto px-6 md:px-16 mb-24" id="sandbox-dock">
      <div class="p-6 md:p-8 rounded-3xl glass-card border border-cyan-500/30 bg-gradient-to-b from-[#0B1C30]/90 via-slate-950/90 to-[#050811] shadow-2xl max-w-5xl mx-auto">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              ⚡ INSTANT GUEST SANDBOX DOCK (NO LOGIN REQUIRED • 1-CLICK DIRECT LAUNCH):
            </span>
          </div>
          <span class="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
            PIN: 123 • 50 Active Production Modules
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
          <!-- App 1: Clinical -->
          <button onclick="openLiveAppDrawer('clinical')" class="p-3.5 rounded-xl bg-slate-950/90 hover:bg-indigo-950/80 border border-slate-800 hover:border-indigo-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-indigo-400 font-bold uppercase">ICU COMMAND OS</span>
              <span class="text-[9px] text-emerald-400 font-bold">21ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-indigo-300 transition-colors">Clinical Pristine</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">5-Rights eMAR &amp; Waveforms</div>
            <div class="mt-2.5 text-[10px] text-indigo-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 2: ClaimGuard -->
          <button onclick="openLiveAppDrawer('claimguard')" class="p-3.5 rounded-xl bg-slate-950/90 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-cyan-400 font-bold uppercase">CLAIMS / ERISA AI</span>
              <span class="text-[9px] text-emerald-400 font-bold">19ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-cyan-300 transition-colors">ClaimGuard AI</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">Moot Court &amp; 0% Rev-Share</div>
            <div class="mt-2.5 text-[10px] text-cyan-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 3: SiteSafe -->
          <button onclick="openLiveAppDrawer('sitesafe')" class="p-3.5 rounded-xl bg-slate-950/90 hover:bg-blue-950/80 border border-slate-800 hover:border-blue-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-blue-400 font-bold uppercase">CPM GANTT OS</span>
              <span class="text-[9px] text-emerald-400 font-bold">24ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-blue-300 transition-colors">SiteSafe Structura</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">NOAA Claims &amp; G702 Billing</div>
            <div class="mt-2.5 text-[10px] text-blue-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 4: OmniStock -->
          <button onclick="openLiveAppDrawer('omnistock')" class="p-3.5 rounded-xl bg-slate-950/90 hover:bg-emerald-950/80 border border-slate-800 hover:border-emerald-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-emerald-400 font-bold uppercase">3D SPATIAL WMS</span>
              <span class="text-[9px] text-emerald-400 font-bold">18ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-emerald-300 transition-colors">OmniStock Enterprise</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">FEFO Quarantine &amp; WebGL</div>
            <div class="mt-2.5 text-[10px] text-emerald-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 5: Saccade-UI -->
          <button onclick="openLiveAppDrawer('saccade')" class="p-3.5 rounded-xl bg-slate-950/90 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-rose-400 font-bold uppercase">BIOMETRIC CRO AI</span>
              <span class="text-[9px] text-emerald-400 font-bold">15ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-rose-300 transition-colors">Saccade-UI Evaluator</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">1-2-3-4 Saccadic Gaze Path</div>
            <div class="mt-2.5 text-[10px] text-rose-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>
    </section>
`;

const cleanEngine2Section = `
    <!-- ========================================================================= -->
    <!-- ⚡ ENGINE #2: INTERACTIVE LEGACY MONOPOLIES VS LINKABLEAI SOVEREIGN MATRIX -->
    <!-- ========================================================================= -->
    <section class="max-w-7xl mx-auto px-6 md:px-16 mb-28" id="legacy-vs-sovereign">
      <div class="glass-card spotlight-card p-8 md:p-12 rounded-3xl border border-blue-500/30 relative overflow-hidden bg-gradient-to-b from-[#0B1C30] via-slate-950 to-[#050811]">
        
        <!-- Section Header & Interactive Toggle Controls -->
        <div class="text-center max-w-3xl mx-auto mb-10">
          <div class="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider mb-3">
            <span class="material-symbols-outlined text-sm">compare_arrows</span>
            <span>THE ARCHITECTURAL SHOWDOWN</span>
          </div>
          <h2 class="text-3xl md:text-5xl font-extrabold text-white font-display tracking-tight mb-4">
            Legacy SaaS Monopolies <span class="text-rose-400 font-serif italic">vs.</span> LinkableAI Sovereign OS
          </h2>
          <p class="text-slate-300 text-sm md:text-base font-sans">
            Toggle below to see the exact operational bleeding caused by legacy vendors vs. the permanent cashflow retained with LinkableAI sovereign software ownership.
          </p>

          <!-- Interactive Switch Pills -->
          <div class="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800 mt-6 shadow-2xl font-mono text-xs">
            <button id="toggle-btn-legacy" onclick="switchLegacyComparison('legacy')" class="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer font-bold flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>🔴 Legacy Monopolies (Software Rent)</span>
            </button>
            <button id="toggle-btn-sovereign" onclick="switchLegacyComparison('sovereign')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>🟢 LinkableAI Sovereign Model (Perpetual IP)</span>
            </button>
          </div>
        </div>

        <!-- Dynamic Interactive Display Grid -->
        <div id="comparison-display-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          
          <!-- Metric 1 -->
          <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40">
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">RECURRING REVENUE TAX</div>
              <div id="comp-metric-1-title" class="text-lg font-bold text-emerald-400 font-display mt-1">0% Rev-Share Extortion</div>
              <p id="comp-metric-1-desc" class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                Keep 100% of your hospital and operational billings. Zero percentage cuts, zero hidden transaction surcharges.
              </p>
            </div>
            <div id="comp-metric-1-badge" class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-slate-400">Annual Waste:</span>
              <span class="text-emerald-400 font-extrabold">$0 / YEAR</span>
            </div>
          </div>

          <!-- Metric 2 -->
          <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40">
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">SOURCE CODE &amp; DATA PRIVACY</div>
              <div id="comp-metric-2-title" class="text-lg font-bold text-cyan-400 font-display mt-1">100% Full Git IP Ownership</div>
              <p id="comp-metric-2-desc" class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                Deploy on-premise, air-gapped, or on your private AWS/GCP cloud. You own the code forever—no vendor can ever shut you down.
              </p>
            </div>
            <div id="comp-metric-2-badge" class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-slate-400">Vendor Lock-In:</span>
              <span class="text-cyan-400 font-extrabold">ZERO RISK</span>
            </div>
          </div>

          <!-- Metric 3 -->
          <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40">
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">OPERATIONAL VELOCITY</div>
              <div id="comp-metric-3-title" class="text-lg font-bold text-blue-400 font-display mt-1">Sub-Second Reactive UI</div>
              <p id="comp-metric-3-desc" class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                Eliminates 4,000-click modal fatigue with 100% right-slide drawers, instant barcode laser scans, and WebGL 3D spatial twins.
              </p>
            </div>
            <div id="comp-metric-3-badge" class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-slate-400">User Efficiency:</span>
              <span class="text-blue-400 font-extrabold">+45% FASTER</span>
            </div>
          </div>

          <!-- Metric 4 -->
          <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40">
            <div>
              <div class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">FINANCIAL ROI &amp; ESCROW</div>
              <div id="comp-metric-4-title" class="text-lg font-bold text-amber-400 font-display mt-1">3-Gives Milestone Escrow</div>
              <p id="comp-metric-4-desc" class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                Pay in milestones upon verified deployment clearance. 100% free custom integrations guaranteed before final release.
              </p>
            </div>
            <div id="comp-metric-4-badge" class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-slate-400">Net Cost Savings:</span>
              <span class="text-emerald-400 font-extrabold">SAVE 50%+</span>
            </div>
          </div>

        </div>

        <!-- Bottom Action Ribbon -->
        <div class="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div class="text-xs font-mono text-slate-300">
            ⚡ <strong>Procurement Rule:</strong> Never sign another 3-year vendor contract without checking our 5/10th pricing gap matrix.
          </div>
          <div class="flex items-center gap-3">
            <button onclick="openExitIntentModal()" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-mono text-xs transition-all cursor-pointer">
              Calculate Exact Org Savings ↗
            </button>
            <a href="#pricing" class="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs font-mono transition-all shadow-md cursor-pointer">
              Explore 5/10th Pricing Matrix ↓
            </a>
          </div>
        </div>

      </div>
    </section>
`;

const cleanSectionAppsHeader = `
    <!-- ========================================================================= -->
    <!-- SECTION 2: STANDALONE CODEBASES • FEATURED SOFTWARE PRODUCTS (ELEVATED)   -->
    <!-- ========================================================================= -->
    <section class="max-w-7xl mx-auto px-6 md:px-16 mb-28" id="apps">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <div class="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-2">Standalone Codebases • Supermarket Capability Dossiers</div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-2 font-display underline decoration-accent-electric decoration-4 underline-offset-8">Featured Software Products</h2>
          <p class="text-on-surface-variant text-sm md:text-base">Fully transparent outer packaging: complete feature modules, pain point ledgers, nutrition facts, and 5/10th pricing disruption studies.</p>
        </div>
      </div>
`;

// Replace the entire middle chunk between Hero end and Filter Rail
const heroEndMarker = '<!-- 5-Subdomain Telemetry Pulse Grid -->';
// Find where hero section ends
const heroClosingTag = '</section>\n\n    <!-- ========================================================================= -->\n    <!-- SECTION 2: STANDALONE CODEBASES';

// Let's use regex or substring replacement to place Engine 1 and Engine 2 cleanly
const patternToReplace = /<\/section>\s*<!-- ========================================================================= -->\s*<!-- SECTION 2: STANDALONE CODEBASES[\s\S]*?<!-- FILTER RAIL & KEYWORD SEARCH BAR -->/;

if (patternToReplace.test(html)) {
  html = html.replace(
    patternToReplace,
    '</section>\n\n' + cleanEngine1Section + '\n\n' + cleanEngine2Section + '\n\n' + cleanSectionAppsHeader + '\n\n      <!-- FILTER RAIL & KEYWORD SEARCH BAR -->'
  );
  console.log('✅ Successfully reordered Hero -> Engine 1 (Dock) -> Engine 2 (Legacy vs Sovereign) -> Section 2 (Apps & Dossiers)!');
}

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% Perfected: All containers separated with pristine vertical margins!');
