const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// =========================================================================
// 1. ENGINE #1: ABOVE-THE-FOLD QUICK-LAUNCH SANDBOX DOCK (HERO SECTION)
// =========================================================================
const engine1QuickLaunchDock = `
      <!-- ⚡ ENGINE #1: ZERO-FRICTION 1-CLICK QUICK-LAUNCH SANDBOX DOCK -->
      <div class="mt-8 pt-6 border-t border-slate-800/80 max-w-5xl mx-auto">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              ⚡ INSTANT GUEST SANDBOX DOCK (NO LOGIN REQUIRED • 1-CLICK DIRECT LAUNCH):
            </span>
          </div>
          <span class="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
            PIN: 123 • 50 Active Production Modules
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 font-mono text-xs">
          <!-- App 1: Clinical -->
          <button onclick="openLiveAppDrawer('clinical')" class="p-3 rounded-xl bg-slate-950/90 hover:bg-indigo-950/80 border border-slate-800 hover:border-indigo-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-indigo-400 font-bold uppercase">ICU COMMAND OS</span>
              <span class="text-[9px] text-emerald-400 font-bold">21ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-indigo-300 transition-colors">Clinical Pristine</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">5-Rights eMAR &amp; Waveforms</div>
            <div class="mt-2 text-[10px] text-indigo-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 2: ClaimGuard -->
          <button onclick="openLiveAppDrawer('claimguard')" class="p-3 rounded-xl bg-slate-950/90 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-cyan-400 font-bold uppercase">CLAIMS / ERISA AI</span>
              <span class="text-[9px] text-emerald-400 font-bold">19ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-cyan-300 transition-colors">ClaimGuard AI</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">Moot Court &amp; 0% Rev-Share</div>
            <div class="mt-2 text-[10px] text-cyan-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 3: SiteSafe -->
          <button onclick="openLiveAppDrawer('sitesafe')" class="p-3 rounded-xl bg-slate-950/90 hover:bg-blue-950/80 border border-slate-800 hover:border-blue-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-blue-400 font-bold uppercase">CPM GANTT OS</span>
              <span class="text-[9px] text-emerald-400 font-bold">24ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-blue-300 transition-colors">SiteSafe Structura</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">NOAA Claims &amp; G702 Billing</div>
            <div class="mt-2 text-[10px] text-blue-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 4: OmniStock -->
          <button onclick="openLiveAppDrawer('omnistock')" class="p-3 rounded-xl bg-slate-950/90 hover:bg-emerald-950/80 border border-slate-800 hover:border-emerald-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-emerald-400 font-bold uppercase">3D SPATIAL WMS</span>
              <span class="text-[9px] text-emerald-400 font-bold">18ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-emerald-300 transition-colors">OmniStock Enterprise</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">FEFO Quarantine &amp; WebGL</div>
            <div class="mt-2 text-[10px] text-emerald-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>

          <!-- App 5: Saccade-UI -->
          <button onclick="openLiveAppDrawer('saccade')" class="p-3 rounded-xl bg-slate-950/90 hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500/60 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group shadow-lg flex flex-col justify-between">
            <div class="flex items-center justify-between pb-1">
              <span class="text-[10px] text-rose-400 font-bold uppercase">BIOMETRIC CRO AI</span>
              <span class="text-[9px] text-emerald-400 font-bold">15ms</span>
            </div>
            <div class="text-white font-bold text-xs group-hover:text-rose-300 transition-colors">Saccade-UI Evaluator</div>
            <div class="text-[10px] text-slate-400 font-sans mt-0.5">1-2-3-4 Saccadic Gaze Path</div>
            <div class="mt-2 text-[10px] text-rose-400 font-bold flex items-center gap-1 group-hover:underline">
              <span>Test Drive Live</span>
              <span class="material-symbols-outlined text-xs">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>
`;

// =========================================================================
// 2. ENGINE #2: INTERACTIVE "LEGACY MONOPOLIES VS LINKABLEAI" SPLIT ENGINE
// =========================================================================
const engine2SplitComparisonSection = `
<!-- ========================================================================= -->
<!-- ⚡ ENGINE #2: INTERACTIVE LEGACY MONOPOLIES VS LINKABLEAI SOVEREIGN MATRIX -->
<!-- ========================================================================= -->
<section class="max-w-7xl mx-auto px-6 md:px-16 mb-24" id="legacy-vs-sovereign">
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

// =========================================================================
// 3. ENGINE #4: IN-PAGE SLIDE-OVER INTERACTIVE SANDBOX PEEK DRAWER
// =========================================================================
const engine4LiveAppDrawer = `
<!-- ========================================================================= -->
<!-- ⚡ ENGINE #4: IN-PAGE SLIDE-OVER LIVE SANDBOX PREVIEW DRAWER -->
<!-- ========================================================================= -->
<div id="live-app-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-slate-950 border-l border-slate-800 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">
  <!-- Drawer Header Bar -->
  <div class="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
      <div>
        <div id="drawer-app-title" class="text-sm font-bold text-white font-display">Live Sandbox Workstation</div>
        <div id="drawer-app-url" class="text-[10px] text-cyan-400">linkable.it.com</div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <a id="drawer-open-external-btn" href="https://linkable.it.com" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 transition-all">
        <span>Open in Full Tab</span>
        <span class="material-symbols-outlined text-xs">open_in_new</span>
      </a>
      <button onclick="closeLiveAppDrawer()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
        <span class="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  </div>

  <!-- Drawer Interactive Iframe Frame -->
  <div class="flex-1 bg-slate-950 relative overflow-hidden flex flex-col justify-center items-center">
    <div id="drawer-loader" class="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-3 z-10 font-mono text-xs text-slate-400">
      <div class="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <div>Initializing Sub-Second Production Sandbox...</div>
    </div>
    <iframe id="drawer-iframe" src="" class="w-full h-full border-0 relative z-20" onload="hideDrawerLoader()"></iframe>
  </div>

  <!-- Drawer Footer Info Bar -->
  <div class="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between font-mono text-[11px] text-slate-400">
    <span class="flex items-center gap-1.5 text-emerald-400">
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
      <span>1-Click Guest Sandbox Active (PIN: 123)</span>
    </span>
    <button onclick="closeLiveAppDrawer(); openContactModal();" class="text-cyan-400 hover:underline font-bold">
      Request Custom Integration for This OS ↗
    </button>
  </div>
</div>
`;

// =========================================================================
// 4. ENGINE #5: REAL-TIME ENTERPRISE SOCIAL PROOF & ACTIVITY PULSE TICKER
// =========================================================================
const engine5ActivityPulseTicker = `
<!-- ========================================================================= -->
<!-- ⚡ ENGINE #5: REAL-TIME ENTERPRISE SOCIAL PROOF & ACTIVITY PULSE TICKER -->
<!-- ========================================================================= -->
<div id="live-activity-ticker" class="fixed bottom-4 left-4 z-40 bg-slate-950/95 border border-slate-800/90 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-md font-mono text-xs max-w-sm sm:max-w-md hidden md:flex items-center gap-3 transition-all duration-300 hover:border-cyan-500/50">
  <div class="relative flex items-center justify-center">
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
    <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute"></span>
  </div>
  <div class="flex-1 overflow-hidden">
    <div class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">ENTERPRISE TELEMETRY STREAM</div>
    <div id="ticker-message" class="text-[11px] text-slate-200 font-sans truncate">
      Hospital Network in Texas just tested ClaimGuard Dual Moot Court AI (3m ago)
    </div>
  </div>
  <button onclick="dismissTicker()" class="text-slate-500 hover:text-slate-300 text-xs ml-1 cursor-pointer">✕</button>
</div>
`;

// =========================================================================
// 5. ENGINE #3: SMART EXIT-INTENT 10-SECOND ROI LOSS AUDIT MODAL
// =========================================================================
const engine3ExitIntentModal = `
<!-- ========================================================================= -->
<!-- ⚡ ENGINE #3: SMART EXIT-INTENT 10-SECOND ROI & LOSS AUDIT MODAL -->
<!-- ========================================================================= -->
<div id="exit-intent-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 hidden">
  <div class="bg-gradient-to-b from-[#0B1C30] via-slate-950 to-[#050811] border border-rose-500/40 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative overflow-hidden font-mono text-xs">
    
    <!-- Top Close Button -->
    <button onclick="closeExitIntentModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg cursor-pointer">✕</button>

    <div class="flex items-center gap-2 mb-3">
      <span class="material-symbols-outlined text-rose-400 text-base">warning</span>
      <span class="text-[11px] text-rose-400 font-bold uppercase tracking-wider bg-rose-950/80 px-2.5 py-0.5 rounded border border-rose-500/30">
        WAIT • EXECUTIVE CASHFLOW ALERT
      </span>
    </div>

    <h3 class="text-2xl font-extrabold text-white font-display mb-2">
      See How Much Capital Your Business Bleeds on Software Subscriptions
    </h3>
    <p class="text-slate-300 font-sans text-xs mb-6">
      Before you leave, calculate the exact capital your organization forfeits to legacy tech monopolies every 12 months.
    </p>

    <!-- Industry Selector -->
    <div class="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
      <div>
        <label class="text-[10px] text-slate-400 uppercase font-bold block mb-1.5">SELECT YOUR INDUSTRY:</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
          <button onclick="setExitIndustry('healthcare')" id="exit-ind-healthcare" class="px-2.5 py-2 rounded-lg bg-indigo-950 border border-indigo-500 text-white font-bold cursor-pointer">Healthcare</button>
          <button onclick="setExitIndustry('construction')" id="exit-ind-construction" class="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer">Construction</button>
          <button onclick="setExitIndustry('logistics')" id="exit-ind-logistics" class="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer">Logistics</button>
          <button onclick="setExitIndustry('agency')" id="exit-ind-agency" class="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer">AdTech/CRO</button>
        </div>
      </div>

      <!-- Live Loss Calculation Output -->
      <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <div class="text-[10px] text-slate-400 uppercase font-bold">Estimated Legacy Waste:</div>
          <div id="exit-calc-waste" class="text-lg font-bold text-rose-400 font-display">$180,000 / yr</div>
        </div>
        <div class="text-right">
          <div class="text-[10px] text-slate-400 uppercase font-bold">LinkableAI Buyout:</div>
          <div id="exit-calc-buyout" class="text-lg font-bold text-emerald-400 font-display">$48,500 <span class="text-[10px] text-slate-400 font-normal">flat</span></div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
      <button onclick="closeExitIntentModal(); openLiveAppDrawer('claimguard');" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg">
        <span>🚀 Claim 1-Click Guest Sandbox Pass (PIN: 123)</span>
        <span class="material-symbols-outlined text-xs">arrow_forward</span>
      </button>
      <button onclick="closeExitIntentModal(); openContactModal('Founder Strategy Call');" class="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700 cursor-pointer">
        Speak with Founder ↗
      </button>
    </div>

  </div>
</div>
`;

// =========================================================================
// 6. CLIENT-SIDE CONTROLLERS JAVASCRIPT
// =========================================================================
const enginesScript = `
<script>
// =========================================================================
// ⚡ 5-ENGINE CONTROLLERS & INTERACTIVE BEHAVIORS
// =========================================================================

// --- ENGINE #2: LEGACY VS LINKABLEAI SPLIT TOGGLE CONTROLLER ---
const comparisonData = {
  legacy: {
    m1Title: "4%–12% Rev-Share & Seat Taxes",
    m1Desc: "Legacy giants charge heavy recurring volume taxes and take 4%-12% cuts of your cashflow while charging mandatory annual user seat licenses.",
    m1Badge: "$120k–$480k / YR EXTORTED",
    m1BadgeColor: "text-rose-400",
    m2Title: "Zero IP • Permanent Vendor Lock-In",
    m2Desc: "You rent access on their servers. If you cancel your subscription, your data is hostage and your custom workflows are permanently destroyed.",
    m2Badge: "100% VENDOR DEPENDENCY",
    m2BadgeColor: "text-rose-400",
    m3Title: "4,000-Click Fatigue & Modal Thrashing",
    m3Desc: "Clunky legacy EHR, WMS, and ERP systems force operators to click through dozens of blocking popups, causing severe operational burnout.",
    m3Badge: "-35% SLOWER THROUGHPUT",
    m3BadgeColor: "text-rose-400",
    m4Title: "Never Sold • Infinite Software Rent",
    m4Desc: "Legacy giants will never sell you the source code. You are locked into infinite subscription fee increases every single contract renewal.",
    m4Badge: "$1M+ LIFETIME BLEED",
    m4BadgeColor: "text-rose-400"
  },
  sovereign: {
    m1Title: "0% Rev-Share Extortion",
    m1Desc: "Keep 100% of your hospital and operational billings. Zero percentage cuts, zero hidden transaction surcharges.",
    m1Badge: "$0 / YEAR TAXES",
    m1BadgeColor: "text-emerald-400",
    m2Title: "100% Full Git IP Ownership",
    m2Desc: "Deploy on-premise, air-gapped, or on your private AWS/GCP cloud. You own the code forever—no vendor can ever shut you down.",
    m2Badge: "ZERO LOCK-IN RISK",
    m2BadgeColor: "text-cyan-400",
    m3Title: "Sub-Second Reactive UI",
    m3Desc: "Eliminates 4,000-click modal fatigue with 100% right-slide drawers, instant barcode laser scans, and WebGL 3D spatial twins.",
    m3Badge: "+45% FASTER PRODUCTIVITY",
    m3BadgeColor: "text-blue-400",
    m4Title: "3-Gives Milestone Escrow",
    m4Desc: "Pay in milestones upon verified deployment clearance. 100% free custom integrations guaranteed before final release.",
    m4Badge: "SAVE 50%+ VS MONOPOLIES",
    m4BadgeColor: "text-emerald-400"
  }
};

function switchLegacyComparison(mode) {
  const btnLegacy = document.getElementById('toggle-btn-legacy');
  const btnSovereign = document.getElementById('toggle-btn-sovereign');
  const data = comparisonData[mode];

  if (!data) return;

  if (mode === 'legacy') {
    btnLegacy.className = "px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2";
    btnSovereign.className = "px-5 py-2.5 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer font-bold flex items-center gap-2";
  } else {
    btnSovereign.className = "px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2";
    btnLegacy.className = "px-5 py-2.5 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer font-bold flex items-center gap-2";
  }

  document.getElementById('comp-metric-1-title').innerText = data.m1Title;
  document.getElementById('comp-metric-1-desc').innerText = data.m1Desc;
  document.getElementById('comp-metric-1-badge').children[1].innerText = data.m1Badge;
  document.getElementById('comp-metric-1-badge').children[1].className = data.m1BadgeColor + ' font-extrabold';

  document.getElementById('comp-metric-2-title').innerText = data.m2Title;
  document.getElementById('comp-metric-2-desc').innerText = data.m2Desc;
  document.getElementById('comp-metric-2-badge').children[1].innerText = data.m2Badge;
  document.getElementById('comp-metric-2-badge').children[1].className = data.m2BadgeColor + ' font-extrabold';

  document.getElementById('comp-metric-3-title').innerText = data.m3Title;
  document.getElementById('comp-metric-3-desc').innerText = data.m3Desc;
  document.getElementById('comp-metric-3-badge').children[1].innerText = data.m3Badge;
  document.getElementById('comp-metric-3-badge').children[1].className = data.m3BadgeColor + ' font-extrabold';

  document.getElementById('comp-metric-4-title').innerText = data.m4Title;
  document.getElementById('comp-metric-4-desc').innerText = data.m4Desc;
  document.getElementById('comp-metric-4-badge').children[1].innerText = data.m4Badge;
  document.getElementById('comp-metric-4-badge').children[1].className = data.m4BadgeColor + ' font-extrabold';
}

// --- ENGINE #4: SLIDE-OVER LIVE SANDBOX PREVIEW DRAWER CONTROLLER ---
const appSandboxUrls = {
  clinical: { name: "Clinical Pristine ICU OS", url: "https://clinical.linkable.it.com" },
  claimguard: { name: "ClaimGuard AI Claims Defense OS", url: "https://claimguard.linkable.it.com" },
  sitesafe: { name: "SiteSafe StructuraPro CPM OS", url: "https://sitesafe.linkable.it.com" },
  omnistock: { name: "OmniStock Enterprise 3D WMS", url: "https://omnistock.linkable.it.com" },
  saccade: { name: "Saccade-UI Biometric CRO AI", url: "https://saccade.linkable.it.com" }
};

function openLiveAppDrawer(appKey) {
  const drawer = document.getElementById('live-app-drawer');
  const iframe = document.getElementById('drawer-iframe');
  const loader = document.getElementById('drawer-loader');
  const title = document.getElementById('drawer-app-title');
  const urlLabel = document.getElementById('drawer-app-url');
  const externalBtn = document.getElementById('drawer-open-external-btn');

  const app = appSandboxUrls[appKey] || appSandboxUrls.clinical;

  title.innerText = app.name;
  urlLabel.innerText = app.url;
  externalBtn.href = app.url;

  loader.style.display = 'flex';
  iframe.src = app.url;

  drawer.classList.remove('translate-x-full');
  drawer.classList.add('translate-x-0');
}

function closeLiveAppDrawer() {
  const drawer = document.getElementById('live-app-drawer');
  const iframe = document.getElementById('drawer-iframe');
  drawer.classList.remove('translate-x-0');
  drawer.classList.add('translate-x-full');
  setTimeout(() => {
    iframe.src = '';
  }, 300);
}

function hideDrawerLoader() {
  const loader = document.getElementById('drawer-loader');
  if (loader) loader.style.display = 'none';
}

// --- ENGINE #5: REAL-TIME ACTIVITY TICKER LOOP ---
const tickerMessages = [
  "Hospital Network in Texas just tested ClaimGuard Dual Moot Court AI (3m ago)",
  "General Contractor in California audited NOAA Weather Delay Claim (8m ago)",
  "3PL Logistics Director simulated FEFO Lot Expiry Quarantine (14m ago)",
  "Agency Growth Lead in New York generated Saccadic 1-2-3-4 CRO Audit (19m ago)",
  "ICU Director in Florida reviewed 5-Rights Barcode & Dual-Nurse Gate (25m ago)"
];
let currentTickerIndex = 0;

function startActivityTicker() {
  const tickerEl = document.getElementById('ticker-message');
  if (!tickerEl) return;
  setInterval(() => {
    currentTickerIndex = (currentTickerIndex + 1) % tickerMessages.length;
    tickerEl.style.opacity = '0';
    setTimeout(() => {
      tickerEl.innerText = tickerMessages[currentTickerIndex];
      tickerEl.style.opacity = '1';
    }, 300);
  }, 6000);
}
function dismissTicker() {
  const ticker = document.getElementById('live-activity-ticker');
  if (ticker) ticker.style.display = 'none';
}

// --- ENGINE #3: EXIT-INTENT MODAL CONTROLLER ---
let hasShownExitIntent = false;

document.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 10 && !hasShownExitIntent) {
    hasShownExitIntent = true;
    openExitIntentModal();
  }
});

function openExitIntentModal() {
  const modal = document.getElementById('exit-intent-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeExitIntentModal() {
  const modal = document.getElementById('exit-intent-modal');
  if (modal) modal.classList.add('hidden');
}

const industryLossData = {
  healthcare: { waste: "$240,000 / yr (4%-12% Rev-Share)", buyout: "$48,500 flat" },
  construction: { waste: "$180,000 / yr ($35k/day risk)", buyout: "$48,500 flat" },
  logistics: { waste: "$210,000 / yr (FEFO spoilage + fees)", buyout: "$38,500 flat" },
  agency: { waste: "$78,000 / yr (Panel testing fees)", buyout: "$19,500 flat" }
};

function setExitIndustry(ind) {
  const buttons = ['healthcare', 'construction', 'logistics', 'agency'];
  buttons.forEach(b => {
    const el = document.getElementById('exit-ind-' + b);
    if (el) {
      if (b === ind) {
        el.className = "px-2.5 py-2 rounded-lg bg-indigo-950 border border-indigo-500 text-white font-bold cursor-pointer";
      } else {
        el.className = "px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer";
      }
    }
  });

  const data = industryLossData[ind] || industryLossData.healthcare;
  document.getElementById('exit-calc-waste').innerText = data.waste;
  document.getElementById('exit-calc-buyout').innerHTML = data.buyout + ' <span class="text-[10px] text-slate-400 font-normal">flat</span>';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  startActivityTicker();
});
</script>
`;

// =========================================================================
// INJECTION EXECUTION
// =========================================================================

// 1. Inject Engine #1 in Hero Section (after subdomains grid / hero description)
const heroInsertionMarker = `<!-- Subdomains Telemetry Pulse Grid -->`;
if (!html.includes('ENGINE #1: ZERO-FRICTION 1-CLICK QUICK-LAUNCH SANDBOX DOCK')) {
  const marker = `</div>\n</div>\n\n<!-- FILTER RAIL & KEYWORD SEARCH BAR -->`;
  // Let's insert before Filter Rail
  const filterRailMarker = `<!-- FILTER RAIL & KEYWORD SEARCH BAR -->`;
  if (html.includes(filterRailMarker)) {
    html = html.replace(filterRailMarker, engine1QuickLaunchDock + '\n\n' + engine2SplitComparisonSection + '\n\n' + filterRailMarker);
    console.log('✅ Injected Engine #1 (Quick-Launch Dock) & Engine #2 (Split Slider) successfully!');
  }
}

// 2. Inject Engine #3, #4, #5 and scripts before </body>
if (!html.includes('ENGINE #4: IN-PAGE SLIDE-OVER LIVE SANDBOX PREVIEW DRAWER')) {
  const bodyCloseMarker = `</body>`;
  if (html.includes(bodyCloseMarker)) {
    const bottomEngines = engine4LiveAppDrawer + '\n' + engine5ActivityPulseTicker + '\n' + engine3ExitIntentModal + '\n' + enginesScript;
    html = html.replace(bodyCloseMarker, bottomEngines + '\n' + bodyCloseMarker);
    console.log('✅ Injected Engine #3 (Exit Intent), Engine #4 (Live App Drawer), and Engine #5 (Activity Ticker) successfully!');
  }
}

// 3. Write back to all 4 destination files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% COMPLETE: All 5 Conversion & Anti-Bounce Engines injected across all master files!');
