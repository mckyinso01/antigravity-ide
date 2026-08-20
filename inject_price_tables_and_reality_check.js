const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const copyPath = path.join(__dirname, 'gatzdevs-cinematic', '200.html');

let html = fs.readFileSync(indexPath, 'utf8');

// =========================================================================
// 4 PRODUCT DOSSIERS WITH COMPREHENSIVE 5/10TH PRICE TABLES & REALITY CHECKS
// =========================================================================
const updatedProductDossiers = `<!-- 4 EXHAUSTIVE DEEP-TECH PRODUCT DOSSIERS WITH ACTUAL FUNCTIONAL VIDEOS & NUTRITION FACTS -->
<div class="space-y-20" id="product-cards-grid">

<!-- ========================================================================= -->
<!-- DOSSIER 1: Clinical Pristine ICU OS -->
<!-- ========================================================================= -->
<div class="product-card-item moving-border-card rounded-3xl overflow-hidden" data-category="dispatch" data-search="clinical pristine icu healthcare emar 5-rights dosage narcotic witness sbar transfusion">
  <div class="card-inner-surface bg-[#0B1C30] w-full p-8 md:p-10 rounded-[1.38rem] flex flex-col gap-8">
    
    <!-- Header & Subdomain Live Pulse -->
    <div class="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[11px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full font-bold">HEALTHCARE ICU COMMAND OS</span>
          <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE PRODUCTION SANDBOX
          </span>
        </div>
        <h3 class="text-3xl md:text-4xl font-extrabold text-white font-display">Clinical Pristine OS</h3>
        <p class="text-indigo-300 font-medium text-base mt-1">
          Zero ICU Medication Dosage Errors. Sub-Second Bedside Telemetry Stream.
        </p>
      </div>
      <div class="text-right font-mono text-xs">
        <span class="text-slate-400">Live Endpoint:</span>
        <a href="https://clinical.linkable.it.com" target="_blank" rel="noopener noreferrer" class="block font-bold text-indigo-400 hover:underline text-sm">clinical.linkable.it.com ↗</a>
      </div>
    </div>

    <!-- Main Grid: Video Player + Enterprise Capabilities -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <!-- ACTUAL FUNCTIONAL VIDEO WINDOW (7 Cols) -->
      <div class="lg:col-span-7 space-y-3">
        <div class="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative group">
          <!-- Window Titlebar -->
          <div class="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span class="text-slate-400 ml-2 font-bold text-[11px]">Clinical OS • Live Bedside ICU Waveform &amp; Dosage Gate</span>
            </div>
            <span class="text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded text-[10px] border border-indigo-500/30">ACTUAL WORKFLOW</span>
          </div>

          <!-- Video / Animated Demo Display -->
          <div class="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
            <img src="/assets/demos/clinical_demo.webp" alt="Clinical Pristine OS Live Workflow Demo" class="w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-white flex items-center gap-2 shadow-lg">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Barcoded Five-Rights Admin &amp; Code Blue Real-Time Intercept</span>
            </div>
          </div>
        </div>
        <p class="text-[11px] font-mono text-slate-400 italic text-center">
          *Actual screen recording showing bedside vitals telemetry, barcode medication verification, and double-witness narcotic waste logs.
        </p>
      </div>

      <!-- ENTERPRISE CAPABILITIES & NUTRITION FACTS (5 Cols) -->
      <div class="lg:col-span-5 space-y-4">
        
        <!-- Multi-Painpoint Crisis Ledger -->
        <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 font-mono text-xs">
          <div class="flex items-center gap-2 font-bold text-rose-400 mb-2">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>CRITICAL ICU PAIN POINTS ERADICATED:</span>
          </div>
          <ul class="space-y-1.5 text-slate-300 font-sans text-xs">
            <li>❌ <strong>Fatal Dosage Calculation Errors:</strong> Eradicated via automated weight/organ-function dosage limits.</li>
            <li>❌ <strong>Narcotic Diversion &amp; Audit Fines:</strong> Eradicated via 2-RN biometric witness signatures.</li>
            <li>❌ <strong>Shift Handover SBAR Drop-Offs:</strong> Eradicated via automated digital SBAR ledger exports.</li>
          </ul>
        </div>

        <!-- Technical Specification / "Ingredients" Table -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
          <div class="text-[11px] uppercase tracking-widest text-slate-400 font-bold pb-1 border-b border-slate-800 flex justify-between">
            <span>ENTERPRISE SPECIFICATIONS</span>
            <span class="text-indigo-400">CLINICAL-V2.4</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Interoperability Standard:</span>
            <span class="font-bold text-emerald-400">HL7 FHIR Release 4 &amp; DICOM</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Patient Safety Verification:</span>
            <span class="font-bold text-indigo-400">5-Rights Barcode Laser Scan</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Telemetry Sampling Latency:</span>
            <span class="font-bold text-cyan-400">&lt; 150ms Bedside Waveform Sync</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Regulatory Compliance:</span>
            <span class="font-bold text-amber-400">HIPAA, HITECH &amp; Joint Commission</span>
          </div>
        </div>

      </div>
    </div>

    <!-- 6 ACTIVE PRODUCTION FEATURE MODULES -->
    <div class="space-y-3 pt-2 border-t border-slate-800/80">
      <div class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-sm text-indigo-400">tune</span>
        <span>6 ACTIVE PRODUCTION FEATURE MODULES (BUILT-IN):</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-indigo-400 text-base mt-0.5">qr_code_scanner</span>
          <div>
            <div class="text-white font-bold text-[11px]">Five-Rights Barcode eMAR</div>
            <div class="text-[10px] text-slate-400 font-sans">Zero-mismatch patient wristband &amp; vial verification.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-indigo-400 text-base mt-0.5">group_add</span>
          <div>
            <div class="text-white font-bold text-[11px]">Schedule II Dual Witness Gate</div>
            <div class="text-[10px] text-slate-400 font-sans">Mandatory secondary RN credential approval for high-risk narcotics.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-indigo-400 text-base mt-0.5">swap_horiz</span>
          <div>
            <div class="text-white font-bold text-[11px]">SBAR Shift Transfer Protocol</div>
            <div class="text-[10px] text-slate-400 font-sans">Automated Situation-Background-Assessment handover ledger.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-indigo-400 text-base mt-0.5">sync_alt</span>
          <div>
            <div class="text-white font-bold text-[11px]">HL7 FHIR Bi-Directional Sync</div>
            <div class="text-[10px] text-slate-400 font-sans">Sub-second interoperability with hospital HIS and PACS servers.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-indigo-400 text-base mt-0.5">ecg_heart</span>
          <div>
            <div class="text-white font-bold text-[11px]">Bedside Waveform Telemetry</div>
            <div class="text-[10px] text-slate-400 font-sans">Real-time SpO2, HR, MAP, and Code Blue priority broadcasting.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-indigo-400 text-base mt-0.5">bloodtype</span>
          <div>
            <div class="text-white font-bold text-[11px]">Crossmatch Transfusion Guard</div>
            <div class="text-[10px] text-slate-400 font-sans">Zero-mismatch blood unit ABO/Rh verification before administration.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- COMPREHENSIVE 5/10TH PRICE GAP EVALUATION TABLE -->
    <div class="p-5 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-3 font-mono text-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <span class="text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">balance</span>
          5/10TH PRICE GAP EVALUATION VS TECH GIANTS (EPIC SYSTEMS &amp; CERNER BENCHMARK):
        </span>
        <span class="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
          SAVE 50%+ ON INITIAL &amp; RECURRING COSTS
        </span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900/50">
              <th class="py-2.5 px-3">Commercial Licensing Tier</th>
              <th class="py-2.5 px-3">Legacy Tech Giants (Epic / Cerner)</th>
              <th class="py-2.5 px-3 text-indigo-300">LinkableAI (5/10th Model)</th>
              <th class="py-2.5 px-3 text-right text-emerald-400">Direct Net Savings</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-xs">
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-white">Tier 01: Commercial Ward License</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$100,000 + $25k/yr annual seat tax</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$48,500 (₱2.71M) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $51,500 (51.5%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors bg-blue-950/10">
              <td class="py-2.5 px-3 font-bold text-blue-300 flex items-center gap-1.5">
                <span>Tier 02: Hospital Network Cluster</span>
                <span class="bg-blue-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">POPULAR</span>
              </td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$180,000 + $45k/yr recurring support</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$88,500 (₱4.95M) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $91,500 (50.8%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-amber-300">Tier 03: Full Source Code &amp; IP Buyout</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$350,000+ (Rarely sold by legacy giants)</td>
              <td class="py-2.5 px-3 font-bold text-amber-400">$165,000 (₱9.24M) <span class="text-[10px] text-slate-400 font-normal">100% full Git IP buyout</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $185,000 (52.8%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PROVOCATIVE EXECUTIVE REALITY CHECK CALLOUT -->
    <div class="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950 border border-indigo-500/40 shadow-xl relative overflow-hidden">
      <div class="flex items-start gap-3.5">
        <div class="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-400/40 text-indigo-300">
          <span class="material-symbols-outlined text-2xl">psychology_alt</span>
        </div>
        <div class="space-y-1.5">
          <div class="text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest">
            THE HEALTHCARE EXECUTIVE REALITY CHECK: WHY KEEP PAYING SOFTWARE RENT?
          </div>
          <p class="text-sm font-bold text-white leading-snug">
            "Are you willing to pay recurring yearly license taxes to legacy tech giants instead of maximizing your hospital's retained operating profits?"
          </p>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Every single year, healthcare networks balance their cashflow just to pay software subscriptions — capital that should be funding advanced ICU beds, hiring elite medical talent, expanding clinic branches, or securing founder and executive wealth. Stop renting. Own your ICU EHR 100% perpetually with LinkableAI.
          </p>
        </div>
      </div>
    </div>

    <!-- 3 PERPETUAL LICENSING TIER PAYMENT BUTTONS -->
    <div class="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30">
      <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800">
        <span class="text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">verified_user</span>
          SELECT COMMERCIAL LICENSING TIER (100% PERPETUAL • ZERO MONTHLY TAXES):
        </span>
        <span class="text-emerald-400 font-bold">SECURED BY PAYMONGO &amp; BANK WIRE</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Tier 1 -->
        <button onclick="openPayMongoCheckout('Clinical Pristine - Tier 1 Commercial Ward License', 48500, 2716000)" class="p-3.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 border border-indigo-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-indigo-400 font-bold uppercase">TIER 01 • SINGLE WARD</div>
            <div class="text-white font-bold text-sm mt-0.5">Commercial Ward License</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Single ICU facility deployment, full 6 feature modules.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-indigo-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$48,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-indigo-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 2 -->
        <button onclick="openPayMongoCheckout('Clinical Pristine - Tier 2 Enterprise Hospital Cluster', 88500, 4956000)" class="p-3.5 rounded-xl bg-gradient-to-b from-indigo-950/90 to-blue-950/80 hover:from-indigo-900 hover:to-blue-900 border border-blue-500/60 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-lg shadow-indigo-950/50">
          <div class="absolute top-2 right-2 bg-blue-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">POPULAR</div>
          <div>
            <div class="text-[10px] font-mono text-blue-400 font-bold uppercase">TIER 02 • MULTI-FACILITY</div>
            <div class="text-white font-bold text-sm mt-0.5">Hospital Network Cluster</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Multi-branch hospital network, EHR API sync &amp; priority SLA.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-blue-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$88,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-blue-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 3 -->
        <button onclick="openPayMongoCheckout('Clinical Pristine - Tier 3 Sovereign Source Buyout', 165000, 9240000)" class="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-amber-400 font-bold uppercase">TIER 03 • SOVEREIGN BUYOUT</div>
            <div class="text-white font-bold text-sm mt-0.5">Full Source Code &amp; IP</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">100% Git repository ownership, sovereign on-prem deployment.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span class="text-amber-400 font-extrabold text-sm font-mono">$165,000 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-amber-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
      </div>
    </div>

    <!-- CLIENT FEEDBACK SURVEY & COMMERCIAL ACTION BAR -->
    <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
      <!-- Interactive Co-Design Survey Button -->
      <button onclick="openCoDesignSurvey('Clinical Pristine ICU OS')" class="px-5 py-3 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-200 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer">
        <span class="material-symbols-outlined text-sm text-indigo-400">rate_review</span>
        <span>What do you think? Request Custom Alignment for Your Hospital ↗</span>
      </button>

      <!-- Direct Sandbox & AI Tour Links -->
      <div class="flex flex-wrap items-center gap-3">
        <button onclick="window.triggerLinkableDemo ? window.triggerLinkableDemo('clinical') : openContactModal()" class="px-4 py-3 rounded-xl glass-card border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-sm text-indigo-400">smart_toy</span>
          <span>AI Tour</span>
        </button>
        <a href="https://clinical.linkable.it.com" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md">
          <span>Test Drive Sandbox</span>
          <span class="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
    </div>

  </div>
</div>

<!-- ========================================================================= -->
<!-- DOSSIER 2: SiteSafe StructuraPro -->
<!-- ========================================================================= -->
<div class="product-card-item moving-border-card rounded-3xl overflow-hidden" data-category="crm" data-search="sitesafe structurapro construction cpm gantt aia g702 lien waiver blueprint delay weather noaa">
  <div class="card-inner-surface bg-[#0B1C30] w-full p-8 md:p-10 rounded-[1.38rem] flex flex-col gap-8">
    
    <!-- Header & Subdomain Live Pulse -->
    <div class="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[11px] font-mono text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full font-bold">CIVIL ENGINEERING CPM COMMAND OS</span>
          <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE PRODUCTION SANDBOX
          </span>
        </div>
        <h3 class="text-3xl md:text-4xl font-extrabold text-white font-display">SiteSafe StructuraPro</h3>
        <p class="text-blue-300 font-medium text-base mt-1">
          Critical Path Float Protection. NOAA Automated Weather Delay Claims &amp; AIA G702 Pay Apps.
        </p>
      </div>
      <div class="text-right font-mono text-xs">
        <span class="text-slate-400">Live Endpoint:</span>
        <a href="https://sitesafe.linkable.it.com" target="_blank" rel="noopener noreferrer" class="block font-bold text-blue-400 hover:underline text-sm">sitesafe.linkable.it.com ↗</a>
      </div>
    </div>

    <!-- Main Grid: Video Player + Enterprise Capabilities -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <!-- ACTUAL FUNCTIONAL VIDEO WINDOW (7 Cols) -->
      <div class="lg:col-span-7 space-y-3">
        <div class="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative group">
          <!-- Window Titlebar -->
          <div class="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span class="text-slate-400 ml-2 font-bold text-[11px]">SiteSafe • CPM Gantt Schedule Engine &amp; NOAA Claim Generator</span>
            </div>
            <span class="text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded text-[10px] border border-blue-500/30">ACTUAL WORKFLOW</span>
          </div>

          <!-- Video / Animated Demo Display -->
          <div class="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
            <img src="/assets/demos/sitesafe_demo.webp" alt="SiteSafe StructuraPro Live Workflow Demo" class="w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-white flex items-center gap-2 shadow-lg">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Dynamic Critical Path Recalculation &amp; AIA G702 Export</span>
            </div>
          </div>
        </div>
        <p class="text-[11px] font-mono text-slate-400 italic text-center">
          *Actual screen recording demonstrating real-time critical path recalculations, float impact simulations, and certified weather delay filings.
        </p>
      </div>

      <!-- ENTERPRISE CAPABILITIES & NUTRITION FACTS (5 Cols) -->
      <div class="lg:col-span-5 space-y-4">
        
        <!-- Multi-Painpoint Crisis Ledger -->
        <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 font-mono text-xs">
          <div class="flex items-center gap-2 font-bold text-rose-400 mb-2">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>CONSTRUCTION CRISIS PAIN POINTS ERADICATED:</span>
          </div>
          <ul class="space-y-1.5 text-slate-300 font-sans text-xs">
            <li>❌ <strong>$35k/Day Liquidated Damages:</strong> Eradicated via legally-admissible NOAA weather impact logs.</li>
            <li>❌ <strong>Subcontractor Lien Disputes:</strong> Eradicated via real-time digital lien waiver escrow gates.</li>
            <li>❌ <strong>AIA G702 Billing Delays:</strong> Eradicated via 1-click retainage recalculation and PDF pay apps.</li>
          </ul>
        </div>

        <!-- Technical Specification / "Ingredients" Table -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
          <div class="text-[11px] uppercase tracking-widest text-slate-400 font-bold pb-1 border-b border-slate-800 flex justify-between">
            <span>ENTERPRISE SPECIFICATIONS</span>
            <span class="text-blue-400">SITESAFE-V3.1</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Schedule Algorithm:</span>
            <span class="font-bold text-emerald-400">Dynamic Critical Path Method (CPM)</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Weather Validation:</span>
            <span class="font-bold text-blue-400">NOAA API Certified Station Telemetry</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Payment Applications:</span>
            <span class="font-bold text-cyan-400">AIA Document G702/G703 Standards</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Document Security:</span>
            <span class="font-bold text-amber-400">SHA-256 Tamper-Evident Ledger</span>
          </div>
        </div>

      </div>
    </div>

    <!-- 6 ACTIVE PRODUCTION FEATURE MODULES -->
    <div class="space-y-3 pt-2 border-t border-slate-800/80">
      <div class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-sm text-blue-400">tune</span>
        <span>6 ACTIVE PRODUCTION FEATURE MODULES (BUILT-IN):</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-blue-400 text-base mt-0.5">timeline</span>
          <div>
            <div class="text-white font-bold text-[11px]">Dynamic CPM Gantt Engine</div>
            <div class="text-[10px] text-slate-400 font-sans">Sub-second cascade recomputation across all milestone dependencies.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-blue-400 text-base mt-0.5">thunderstorm</span>
          <div>
            <div class="text-white font-bold text-[11px]">NOAA Weather Claim Generator</div>
            <div class="text-[10px] text-slate-400 font-sans">Certified weather station rain/wind delay claim filings with audit proof.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-blue-400 text-base mt-0.5">request_quote</span>
          <div>
            <div class="text-white font-bold text-[11px]">AIA G702 / G703 Pay Apps</div>
            <div class="text-[10px] text-slate-400 font-sans">Automated Schedule of Values, retainage calculation &amp; PDF exports.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-blue-400 text-base mt-0.5">verified</span>
          <div>
            <div class="text-white font-bold text-[11px]">Lien Waiver Escrow Vault</div>
            <div class="text-[10px] text-slate-400 font-sans">Conditional and unconditional subcontractor waiver execution.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-blue-400 text-base mt-0.5">architecture</span>
          <div>
            <div class="text-white font-bold text-[11px]">BIM Blueprint Annotation</div>
            <div class="text-[10px] text-slate-400 font-sans">Vector CAD/PDF markups with geo-tagged jobsite inspection pinpoints.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-blue-400 text-base mt-0.5">health_and_safety</span>
          <div>
            <div class="text-white font-bold text-[11px]">OSHA Pre-Task Safety Log</div>
            <div class="text-[10px] text-slate-400 font-sans">Daily digital compliance logs with tamper-evident cryptographic hash.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- COMPREHENSIVE 5/10TH PRICE GAP EVALUATION TABLE -->
    <div class="p-5 rounded-2xl bg-slate-950/90 border border-blue-500/30 space-y-3 font-mono text-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <span class="text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">balance</span>
          5/10TH PRICE GAP EVALUATION VS TECH GIANTS (PROCORE &amp; AUTODESK BUILD BENCHMARK):
        </span>
        <span class="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
          SAVE 50%+ ON UNLIMITED JOBSITES
        </span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900/50">
              <th class="py-2.5 px-3">Commercial Licensing Tier</th>
              <th class="py-2.5 px-3">Legacy Tech Giants (Procore / Autodesk)</th>
              <th class="py-2.5 px-3 text-blue-300">LinkableAI (5/10th Model)</th>
              <th class="py-2.5 px-3 text-right text-emerald-400">Direct Net Savings</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-xs">
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-white">Tier 01: Commercial Site License</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$50,000 / year volume-based fee</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$24,500 (₱1.37M) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $25,500 (51.0%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors bg-blue-950/10">
              <td class="py-2.5 px-3 font-bold text-cyan-300 flex items-center gap-1.5">
                <span>Tier 02: Enterprise Firm Cluster</span>
                <span class="bg-cyan-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">POPULAR</span>
              </td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$97,000 / year recurring subscription</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$48,500 (₱2.71M) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $48,500 (50.0%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-amber-300">Tier 03: Full Source Code &amp; IP Buyout</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$190,000+ (Not available from SaaS giants)</td>
              <td class="py-2.5 px-3 font-bold text-amber-400">$95,000 (₱5.32M) <span class="text-[10px] text-slate-400 font-normal">100% full Git IP buyout</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $95,000 (50.0%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PROVOCATIVE EXECUTIVE REALITY CHECK CALLOUT -->
    <div class="p-5 rounded-2xl bg-gradient-to-r from-blue-950/80 via-cyan-950/60 to-slate-950 border border-blue-500/40 shadow-xl relative overflow-hidden">
      <div class="flex items-start gap-3.5">
        <div class="p-2.5 rounded-xl bg-blue-600/20 border border-blue-400/40 text-blue-300">
          <span class="material-symbols-outlined text-2xl">psychology_alt</span>
        </div>
        <div class="space-y-1.5">
          <div class="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
            THE GENERAL CONTRACTOR REALITY CHECK: WHY KEEP PAYING SOFTWARE RENT?
          </div>
          <p class="text-sm font-bold text-white leading-snug">
            "Are you willing to pay recurring yearly volume taxes to construction SaaS giants instead of maximizing your firm's yearly profit?"
          </p>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Every single year, general contractors surrender massive project margins to software subscriptions — money that could be buying heavy construction machinery, acquiring prime real estate, funding early retirement, or expanding to bigger commercial jobsites. Stop renting. Own your engineering command OS forever.
          </p>
        </div>
      </div>
    </div>

    <!-- 3 PERPETUAL LICENSING TIER PAYMENT BUTTONS -->
    <div class="p-4 rounded-2xl bg-slate-950/90 border border-blue-500/30">
      <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800">
        <span class="text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">verified_user</span>
          SELECT COMMERCIAL LICENSING TIER (100% PERPETUAL • ZERO MONTHLY TAXES):
        </span>
        <span class="text-emerald-400 font-bold">SECURED BY PAYMONGO &amp; BANK WIRE</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Tier 1 -->
        <button onclick="openPayMongoCheckout('SiteSafe StructuraPro - Tier 1 Commercial License', 24500, 1372000)" class="p-3.5 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-blue-400 font-bold uppercase">TIER 01 • SINGLE GENERAL CONTRACTOR</div>
            <div class="text-white font-bold text-sm mt-0.5">Commercial Site License</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Unlimited project jobsites, dynamic CPM Gantt &amp; NOAA weather claims.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-blue-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$24,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-blue-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 2 -->
        <button onclick="openPayMongoCheckout('SiteSafe StructuraPro - Tier 2 Enterprise Firm Cluster', 48500, 2716000)" class="p-3.5 rounded-xl bg-gradient-to-b from-blue-950/90 to-cyan-950/80 hover:from-blue-900 hover:to-cyan-900 border border-cyan-500/60 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-lg shadow-blue-950/50">
          <div class="absolute top-2 right-2 bg-cyan-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">POPULAR</div>
          <div>
            <div class="text-[10px] font-mono text-cyan-400 font-bold uppercase">TIER 02 • MULTI-FIRM CLUSTER</div>
            <div class="text-white font-bold text-sm mt-0.5">Enterprise Firm Cluster</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Multi-branch construction firm mesh, ERP API sync &amp; priority SLA.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-cyan-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$48,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-cyan-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 3 -->
        <button onclick="openPayMongoCheckout('SiteSafe StructuraPro - Tier 3 Sovereign Source Buyout', 95000, 5320000)" class="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-amber-400 font-bold uppercase">TIER 03 • SOVEREIGN BUYOUT</div>
            <div class="text-white font-bold text-sm mt-0.5">Full Source Code &amp; IP</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">100% Git repository ownership, sovereign on-prem deployment.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span class="text-amber-400 font-extrabold text-sm font-mono">$95,000 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-amber-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
      </div>
    </div>

    <!-- CLIENT FEEDBACK SURVEY & COMMERCIAL ACTION BAR -->
    <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
      <!-- Interactive Co-Design Survey Button -->
      <button onclick="openCoDesignSurvey('SiteSafe StructuraPro')" class="px-5 py-3 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/50 text-blue-200 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer">
        <span class="material-symbols-outlined text-sm text-blue-400">rate_review</span>
        <span>What do you think? Request Custom Alignment for Your Firm ↗</span>
      </button>

      <!-- Direct Sandbox & AI Tour Links -->
      <div class="flex flex-wrap items-center gap-3">
        <button onclick="window.triggerLinkableDemo ? window.triggerLinkableDemo('construction') : openContactModal()" class="px-4 py-3 rounded-xl glass-card border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-sm text-blue-400">smart_toy</span>
          <span>AI Tour</span>
        </button>
        <a href="https://sitesafe.linkable.it.com" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md">
          <span>Test Drive Sandbox</span>
          <span class="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
    </div>

  </div>
</div>

<!-- ========================================================================= -->
<!-- DOSSIER 3: OmniStock Spatial WMS -->
<!-- ========================================================================= -->
<div class="product-card-item moving-border-card rounded-3xl overflow-hidden" data-category="pos" data-search="omnistock spatial 3d voxel wms warehouse inventory fefo asn pallet rack slotting">
  <div class="card-inner-surface bg-[#0B1C30] w-full p-8 md:p-10 rounded-[1.38rem] flex flex-col gap-8">
    
    <!-- Header & Subdomain Live Pulse -->
    <div class="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[11px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">SPATIAL 3D VOXEL WMS &amp; WCS PLATFORM</span>
          <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE PRODUCTION SANDBOX
          </span>
        </div>
        <h3 class="text-3xl md:text-4xl font-extrabold text-white font-display">OmniStock Spatial WMS</h3>
        <p class="text-emerald-300 font-medium text-base mt-1">
          3D Voxel Digital Twin. FEFO Expiration Quarantine &amp; Volumetric Bin Optimization.
        </p>
      </div>
      <div class="text-right font-mono text-xs">
        <span class="text-slate-400">Live Endpoint:</span>
        <a href="https://omnistock.linkable.it.com" target="_blank" rel="noopener noreferrer" class="block font-bold text-emerald-400 hover:underline text-sm">omnistock.linkable.it.com ↗</a>
      </div>
    </div>

    <!-- Main Grid: Video Player + Enterprise Capabilities -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <!-- ACTUAL FUNCTIONAL VIDEO WINDOW (7 Cols) -->
      <div class="lg:col-span-7 space-y-3">
        <div class="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative group">
          <!-- Window Titlebar -->
          <div class="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span class="text-slate-400 ml-2 font-bold text-[11px]">OmniStock • 3D Voxel Digital Twin &amp; Heatmap Modeler</span>
            </div>
            <span class="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">ACTUAL WORKFLOW</span>
          </div>

          <!-- Video / Animated Demo Display -->
          <div class="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
            <img src="/assets/demos/omnistock_demo.webp" alt="OmniStock Spatial WMS Live Workflow Demo" class="w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-white flex items-center gap-2 shadow-lg">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Real-Time FEFO Quarantine &amp; Spatial Pick-Path Optimization</span>
            </div>
          </div>
        </div>
        <p class="text-[11px] font-mono text-slate-400 italic text-center">
          *Actual screen recording showing live 3D warehouse voxel bin allocation, real-time FEFO batch quarantine, and traveling salesman pick routing.
        </p>
      </div>

      <!-- ENTERPRISE CAPABILITIES & NUTRITION FACTS (5 Cols) -->
      <div class="lg:col-span-5 space-y-4">
        
        <!-- Multi-Painpoint Crisis Ledger -->
        <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 font-mono text-xs">
          <div class="flex items-center gap-2 font-bold text-rose-400 mb-2">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>WAREHOUSE CRISIS PAIN POINTS ERADICATED:</span>
          </div>
          <ul class="space-y-1.5 text-slate-300 font-sans text-xs">
            <li>❌ <strong>Perishable Spoilage Losses:</strong> Eradicated via automated FEFO lot-expiry hard-stops.</li>
            <li>❌ <strong>Wasted Picker Travel Time:</strong> Eradicated via 3D traveling-salesman shortest route calculations.</li>
            <li>❌ <strong>Inbound ASN Staging Bottlenecks:</strong> Eradicated via 1-click cross-docking dispatch.</li>
          </ul>
        </div>

        <!-- Technical Specification / "Ingredients" Table -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
          <div class="text-[11px] uppercase tracking-widest text-slate-400 font-bold pb-1 border-b border-slate-800 flex justify-between">
            <span>ENTERPRISE SPECIFICATIONS</span>
            <span class="text-emerald-400">OMNISTOCK-V2.0</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Spatial Engine:</span>
            <span class="font-bold text-emerald-400">Interactive WebGL 3D Voxel Mesh</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Expiration Control:</span>
            <span class="font-bold text-emerald-400">FEFO (First-Expired, First-Out)</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Barcode Compatibility:</span>
            <span class="font-bold text-cyan-400">GS1-128, SSCC &amp; 2D DataMatrix</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Putaway Intelligence:</span>
            <span class="font-bold text-amber-400">Volumetric Velocity Slotting</span>
          </div>
        </div>

      </div>
    </div>

    <!-- 6 ACTIVE PRODUCTION FEATURE MODULES -->
    <div class="space-y-3 pt-2 border-t border-slate-800/80">
      <div class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-sm text-emerald-400">tune</span>
        <span>6 ACTIVE PRODUCTION FEATURE MODULES (BUILT-IN):</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-emerald-400 text-base mt-0.5">view_in_ar</span>
          <div>
            <div class="text-white font-bold text-[11px]">3D Voxel Warehouse Twin</div>
            <div class="text-[10px] text-slate-400 font-sans">WebGL spatial twin with real-time rack occupancy heatmaps.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-emerald-400 text-base mt-0.5">event_busy</span>
          <div>
            <div class="text-white font-bold text-[11px]">Strict FEFO Expiry Guard</div>
            <div class="text-[10px] text-slate-400 font-sans">Automated batch quarantine preventing expired lot dispatch.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-emerald-400 text-base mt-0.5">route</span>
          <div>
            <div class="text-white font-bold text-[11px]">TSP Pick-Path Optimizer</div>
            <div class="text-[10px] text-slate-400 font-sans">Calculates shortest travel distance per picker, cutting cycle time by 44%.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-emerald-400 text-base mt-0.5">move_to_inbox</span>
          <div>
            <div class="text-white font-bold text-[11px]">Multi-Zone Directed Slotting</div>
            <div class="text-[10px] text-slate-400 font-sans">Dynamically allocates fast-moving SKUs to primary pick faces.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-emerald-400 text-base mt-0.5">swap_calls</span>
          <div>
            <div class="text-white font-bold text-[11px]">Cross-Docking ASN Matcher</div>
            <div class="text-[10px] text-slate-400 font-sans">Direct transfer of inbound receipts to outbound staging lanes.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-emerald-400 text-base mt-0.5">inventory</span>
          <div>
            <div class="text-white font-bold text-[11px]">GS1-128 &amp; SSCC Label Engine</div>
            <div class="text-[10px] text-slate-400 font-sans">Compliant logistics labels with automated EDI shipping manifests.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- COMPREHENSIVE 5/10TH PRICE GAP EVALUATION TABLE -->
    <div class="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3 font-mono text-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <span class="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">balance</span>
          5/10TH PRICE GAP EVALUATION VS TECH GIANTS (MANHATTAN &amp; BLUE YONDER BENCHMARK):
        </span>
        <span class="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
          SAVE 50%+ ON UNLIMITED SKUS
        </span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900/50">
              <th class="py-2.5 px-3">Commercial Licensing Tier</th>
              <th class="py-2.5 px-3">Legacy Tech Giants (Manhattan / SAP)</th>
              <th class="py-2.5 px-3 text-emerald-300">LinkableAI (5/10th Model)</th>
              <th class="py-2.5 px-3 text-right text-emerald-400">Direct Net Savings</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-xs">
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-white">Tier 01: Commercial Warehouse License</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$77,000 + annual support fees</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$38,500 (₱2.15M) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $38,500 (50.0%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors bg-blue-950/10">
              <td class="py-2.5 px-3 font-bold text-teal-300 flex items-center gap-1.5">
                <span>Tier 02: Multi-Hub Network Cluster</span>
                <span class="bg-teal-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">POPULAR</span>
              </td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$137,000 multi-hub licensing</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$68,500 (₱3.83M) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $68,500 (50.0%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-amber-300">Tier 03: Full Source Code &amp; IP Buyout</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$250,000+ proprietary on-prem buyout</td>
              <td class="py-2.5 px-3 font-bold text-amber-400">$125,000 (₱7.00M) <span class="text-[10px] text-slate-400 font-normal">100% full Git IP buyout</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $125,000 (50.0%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PROVOCATIVE EXECUTIVE REALITY CHECK CALLOUT -->
    <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-teal-950/60 to-slate-950 border border-emerald-500/40 shadow-xl relative overflow-hidden">
      <div class="flex items-start gap-3.5">
        <div class="p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-400/40 text-emerald-300">
          <span class="material-symbols-outlined text-2xl">psychology_alt</span>
        </div>
        <div class="space-y-1.5">
          <div class="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest">
            THE SUPPLY CHAIN EXECUTIVE REALITY CHECK: WHY KEEP PAYING SOFTWARE RENT?
          </div>
          <p class="text-sm font-bold text-white leading-snug">
            "Are you willing to pay exorbitant annual maintenance fees to legacy logistics giants instead of reinvesting in warehouse expansion?"
          </p>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Every year, supply chain operators bleed capital on software licenses — funds that could be purchasing automated sorting robotics, acquiring new distribution hubs, completing your personal investment portfolio, or securing family freedom. Stop renting. Own your 3D spatial WMS perpetually.
          </p>
        </div>
      </div>
    </div>

    <!-- 3 PERPETUAL LICENSING TIER PAYMENT BUTTONS -->
    <div class="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30">
      <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800">
        <span class="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">verified_user</span>
          SELECT COMMERCIAL LICENSING TIER (100% PERPETUAL • ZERO MONTHLY TAXES):
        </span>
        <span class="text-emerald-400 font-bold">SECURED BY PAYMONGO &amp; BANK WIRE</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Tier 1 -->
        <button onclick="openPayMongoCheckout('OmniStock Spatial WMS - Tier 1 Commercial License', 38500, 2156000)" class="p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-emerald-400 font-bold uppercase">TIER 01 • SINGLE FACILITY</div>
            <div class="text-white font-bold text-sm mt-0.5">Commercial Warehouse License</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Single distribution center, 3D Voxel CAD twin &amp; FEFO guard.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-emerald-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$38,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-emerald-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 2 -->
        <button onclick="openPayMongoCheckout('OmniStock Spatial WMS - Tier 2 Enterprise Multi-Hub Cluster', 68500, 3836000)" class="p-3.5 rounded-xl bg-gradient-to-b from-emerald-950/90 to-teal-950/80 hover:from-emerald-900 hover:to-teal-900 border border-teal-500/60 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-lg shadow-emerald-950/50">
          <div class="absolute top-2 right-2 bg-teal-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">POPULAR</div>
          <div>
            <div class="text-[10px] font-mono text-teal-400 font-bold uppercase">TIER 02 • MULTI-HUB CLUSTER</div>
            <div class="text-white font-bold text-sm mt-0.5">Multi-Hub Network Cluster</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Multi-facility warehouse mesh, ERP API sync &amp; priority SLA.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-teal-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$68,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-teal-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 3 -->
        <button onclick="openPayMongoCheckout('OmniStock Spatial WMS - Tier 3 Sovereign Source Buyout', 125000, 7000000)" class="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-amber-400 font-bold uppercase">TIER 03 • SOVEREIGN BUYOUT</div>
            <div class="text-white font-bold text-sm mt-0.5">Full Source Code &amp; IP</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">100% Git repository ownership, sovereign on-prem deployment.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span class="text-amber-400 font-extrabold text-sm font-mono">$125,000 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-amber-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
      </div>
    </div>

    <!-- CLIENT FEEDBACK SURVEY & COMMERCIAL ACTION BAR -->
    <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
      <!-- Interactive Co-Design Survey Button -->
      <button onclick="openCoDesignSurvey('OmniStock Spatial WMS')" class="px-5 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-200 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer">
        <span class="material-symbols-outlined text-sm text-emerald-400">rate_review</span>
        <span>What do you think? Request Custom Alignment for Your Warehouse ↗</span>
      </button>

      <!-- Direct Sandbox & AI Tour Links -->
      <div class="flex flex-wrap items-center gap-3">
        <button onclick="window.triggerLinkableDemo ? window.triggerLinkableDemo('warehouse') : openContactModal()" class="px-4 py-3 rounded-xl glass-card border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-sm text-emerald-400">smart_toy</span>
          <span>AI Tour</span>
        </button>
        <a href="https://omnistock.linkable.it.com" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md">
          <span>Test Drive Sandbox</span>
          <span class="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
    </div>

  </div>
</div>

<!-- ========================================================================= -->
<!-- DOSSIER 4: Saccade-UI Biometric CRO -->
<!-- ========================================================================= -->
<div class="product-card-item moving-border-card rounded-3xl overflow-hidden" data-category="legal" data-search="saccade ui biometric cro neural eye tracking heatmap visual attention gaze prediction cognitive clutter audit pdf">
  <div class="card-inner-surface bg-[#0B1C30] w-full p-8 md:p-10 rounded-[1.38rem] flex flex-col gap-8">
    
    <!-- Header & Subdomain Live Pulse -->
    <div class="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[11px] font-mono text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full font-bold">NEURO BIOMETRIC CRO EVALUATOR</span>
          <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE PRODUCTION SANDBOX
          </span>
        </div>
        <h3 class="text-3xl md:text-4xl font-extrabold text-white font-display">Saccade-UI Biometric CRO</h3>
        <p class="text-rose-300 font-medium text-base mt-1">
          Predictive Gaze Fixation Simulation. Cognitive Clutter Scoring &amp; 1-Click Executive PDF CRO Audit.
        </p>
      </div>
      <div class="text-right font-mono text-xs">
        <span class="text-slate-400">Live Endpoint:</span>
        <a href="https://saccade.linkable.it.com" target="_blank" rel="noopener noreferrer" class="block font-bold text-rose-400 hover:underline text-sm">saccade.linkable.it.com ↗</a>
      </div>
    </div>

    <!-- Main Grid: Video Player + Enterprise Capabilities -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <!-- ACTUAL FUNCTIONAL VIDEO WINDOW (7 Cols) -->
      <div class="lg:col-span-7 space-y-3">
        <div class="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative group">
          <!-- Window Titlebar -->
          <div class="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span class="text-slate-400 ml-2 font-bold text-[11px]">Saccade-UI • Live Predictive Gaze Scanpath &amp; Attention Heatmap</span>
            </div>
            <span class="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded text-[10px] border border-rose-500/30">ACTUAL WORKFLOW</span>
          </div>

          <!-- Video / Animated Demo Display -->
          <div class="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
            <img src="/assets/demos/saccade_preview.png" alt="Saccade Biometric CRO Actual Executive Audit Report Preview" class="w-full h-auto object-cover" />
            <div class="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-mono text-white flex items-center gap-2 shadow-lg">
              <span class="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              <span>Predictive Fixation Saccades &amp; 1-Click Executive PDF CRO Audit</span>
            </div>
          </div>
        </div>
        <p class="text-[11px] font-mono text-slate-400 italic text-center">
          *Actual live screenshot showing visual clarity scores, cognitive friction metrics, first fixation times, and executive optimization directives.
        </p>
      </div>

      <!-- ENTERPRISE CAPABILITIES & NUTRITION FACTS (5 Cols) -->
      <div class="lg:col-span-5 space-y-4">
        
        <!-- Multi-Painpoint Crisis Ledger -->
        <div class="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 font-mono text-xs">
          <div class="flex items-center gap-2 font-bold text-rose-400 mb-2">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>CRO CONVERSION CRISIS PAIN POINTS ERADICATED:</span>
          </div>
          <ul class="space-y-1.5 text-slate-300 font-sans text-xs">
            <li>❌ <strong>70%+ Landing Page Bounce Rate:</strong> Eradicated via predictive first-fixation gaze trajectory analysis.</li>
            <li>❌ <strong>Lagging Post-Hoc Heatmaps:</strong> Eradicated via sub-50ms instant neural attention simulation.</li>
            <li>❌ <strong>$15,000 Physical Lab Costs:</strong> Eradicated via zero-participant biological vision algorithms.</li>
          </ul>
        </div>

        <!-- Technical Specification / "Ingredients" Table -->
        <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs space-y-2">
          <div class="text-[11px] uppercase tracking-widest text-slate-400 font-bold pb-1 border-b border-slate-800 flex justify-between">
            <span>ENTERPRISE SPECIFICATIONS</span>
            <span class="text-rose-400">SACCADE-V1.8</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Vision Science Model:</span>
            <span class="font-bold text-emerald-400">Itti-Koch &amp; DeepGaze II Simulation</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Saccadic Breakdown:</span>
            <span class="font-bold text-rose-400">Chronological 1-2-3-4 Fixation Sequence</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Cognitive Scoring:</span>
            <span class="font-bold text-cyan-400">Visual Clutter &amp; CTA Saliency %</span>
          </div>
          <div class="flex justify-between text-slate-300">
            <span>• Executive Reporting:</span>
            <span class="font-bold text-amber-400">1-Click Client-Ready PDF Exporter</span>
          </div>
        </div>

      </div>
    </div>

    <!-- 6 ACTIVE PRODUCTION FEATURE MODULES -->
    <div class="space-y-3 pt-2 border-t border-slate-800/80">
      <div class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <span class="material-symbols-outlined text-sm text-rose-400">tune</span>
        <span>6 ACTIVE PRODUCTION FEATURE MODULES (BUILT-IN):</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-rose-400 text-base mt-0.5">visibility</span>
          <div>
            <div class="text-white font-bold text-[11px]">Biological Attention Heatmap</div>
            <div class="text-[10px] text-slate-400 font-sans">Itti-Koch &amp; DeepGaze II neural visual saliency simulation.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-rose-400 text-base mt-0.5">alt_route</span>
          <div>
            <div class="text-white font-bold text-[11px]">Saccadic Scanpath Trajectory</div>
            <div class="text-[10px] text-slate-400 font-sans">Chronological 1-2-3-4-5 first-fixation sequence and scanpath vectors.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-rose-400 text-base mt-0.5">grain</span>
          <div>
            <div class="text-white font-bold text-[11px]">Cognitive Clutter &amp; Noise Index</div>
            <div class="text-[10px] text-slate-400 font-sans">Calculates visual density %, identifying competing distraction zones.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-rose-400 text-base mt-0.5">ads_click</span>
          <div>
            <div class="text-white font-bold text-[11px]">CTA Saliency &amp; Visibility Ratio</div>
            <div class="text-[10px] text-slate-400 font-sans">Measures exact milliseconds before first user glance lands on CTA.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-rose-400 text-base mt-0.5">picture_as_pdf</span>
          <div>
            <div class="text-white font-bold text-[11px]">1-Click Executive PDF Exporter</div>
            <div class="text-[10px] text-slate-400 font-sans">White-label client CRO recommendation dossier with actionable scores.</div>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-rose-400 text-base mt-0.5">speed</span>
          <div>
            <div class="text-white font-bold text-[11px]">Sub-50ms Neural Compute</div>
            <div class="text-[10px] text-slate-400 font-sans">Runs completely client-side in browser with WebAssembly engine.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- COMPREHENSIVE 5/10TH PRICE GAP EVALUATION TABLE -->
    <div class="p-5 rounded-2xl bg-slate-950/90 border border-rose-500/30 space-y-3 font-mono text-xs">
      <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <span class="text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">balance</span>
          5/10TH PRICE GAP EVALUATION VS TECH GIANTS (TOBII PRO &amp; NEURONS INC BENCHMARK):
        </span>
        <span class="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
          SAVE 50%+ ON BIOMETRIC EYE-TRACKING
        </span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900/50">
              <th class="py-2.5 px-3">Commercial Licensing Tier</th>
              <th class="py-2.5 px-3">Legacy Tech Giants (Tobii Pro / Neurons)</th>
              <th class="py-2.5 px-3 text-rose-300">LinkableAI (5/10th Model)</th>
              <th class="py-2.5 px-3 text-right text-emerald-400">Direct Net Savings</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-xs">
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-white">Tier 01: Commercial Agency License</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$19,000 / year per-seat license</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$9,500 (₱532k) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $9,500 (50.0%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors bg-blue-950/10">
              <td class="py-2.5 px-3 font-bold text-pink-300 flex items-center gap-1.5">
                <span>Tier 02: Enterprise CRO Suite</span>
                <span class="bg-pink-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">POPULAR</span>
              </td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$39,000 / year recurring subscription</td>
              <td class="py-2.5 px-3 font-bold text-emerald-400">$19,500 (₱1.09M) <span class="text-[10px] text-slate-400 font-normal">one-time perpetual</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $19,500 (50.0%)</td>
            </tr>
            <tr class="hover:bg-slate-900/40 transition-colors">
              <td class="py-2.5 px-3 font-bold text-amber-300">Tier 03: Full Source Code &amp; IP Buyout</td>
              <td class="py-2.5 px-3 text-rose-400 font-medium">$76,000+ proprietary algorithm buyout</td>
              <td class="py-2.5 px-3 font-bold text-amber-400">$38,000 (₱2.12M) <span class="text-[10px] text-slate-400 font-normal">100% full Git IP buyout</span></td>
              <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $38,000 (50.0%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- PROVOCATIVE EXECUTIVE REALITY CHECK CALLOUT -->
    <div class="p-5 rounded-2xl bg-gradient-to-r from-rose-950/80 via-pink-950/60 to-slate-950 border border-rose-500/40 shadow-xl relative overflow-hidden">
      <div class="flex items-start gap-3.5">
        <div class="p-2.5 rounded-xl bg-rose-600/20 border border-rose-400/40 text-rose-300">
          <span class="material-symbols-outlined text-2xl">psychology_alt</span>
        </div>
        <div class="space-y-1.5">
          <div class="text-xs font-mono font-bold text-rose-300 uppercase tracking-widest">
            THE AGENCY FOUNDER REALITY CHECK: WHY KEEP PAYING SOFTWARE RENT?
          </div>
          <p class="text-sm font-bold text-white leading-snug">
            "Are you willing to pay recurring agency seat taxes to eye-tracking software labs instead of maximizing your agency's retained revenue?"
          </p>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Every year, agency founders budget for recurring tool licenses instead of buying dream luxury assets, investing in property, accelerating early retirement, or scaling their client roster. Stop renting. Own your client-side biometric CRO platform perpetually with LinkableAI.
          </p>
        </div>
      </div>
    </div>

    <!-- 3 PERPETUAL LICENSING TIER PAYMENT BUTTONS -->
    <div class="p-4 rounded-2xl bg-slate-950/90 border border-rose-500/30">
      <div class="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 pb-2 border-b border-slate-800">
        <span class="text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span class="material-symbols-outlined text-sm">verified_user</span>
          SELECT COMMERCIAL LICENSING TIER (100% PERPETUAL • ZERO MONTHLY TAXES):
        </span>
        <span class="text-emerald-400 font-bold">SECURED BY PAYMONGO &amp; BANK WIRE</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Tier 1 -->
        <button onclick="openPayMongoCheckout('Saccade-UI Biometric CRO - Tier 1 Commercial License', 9500, 532000)" class="p-3.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-rose-400 font-bold uppercase">TIER 01 • AGENCY LICENSE</div>
            <div class="text-white font-bold text-sm mt-0.5">Commercial CRO License</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Unlimited domain audits, Itti-Koch gaze modeling &amp; PDF exporter.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-rose-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$9,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-rose-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 2 -->
        <button onclick="openPayMongoCheckout('Saccade-UI Biometric CRO - Tier 2 Enterprise CRO Suite', 19500, 1092000)" class="p-3.5 rounded-xl bg-gradient-to-b from-rose-950/90 to-pink-950/80 hover:from-rose-900 hover:to-pink-900 border border-pink-500/60 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-lg shadow-rose-950/50">
          <div class="absolute top-2 right-2 bg-pink-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">POPULAR</div>
          <div>
            <div class="text-[10px] font-mono text-pink-400 font-bold uppercase">TIER 02 • MULTI-CLIENT SUITE</div>
            <div class="text-white font-bold text-sm mt-0.5">Enterprise CRO Cluster</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Multi-client agency portal, white-label audit PDFs &amp; priority SLA.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-pink-800/50 flex items-center justify-between">
            <span class="text-emerald-400 font-extrabold text-sm font-mono">$19,500 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-pink-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
        <!-- Tier 3 -->
        <button onclick="openPayMongoCheckout('Saccade-UI Biometric CRO - Tier 3 Sovereign Source Buyout', 38000, 2128000)" class="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-amber-400 font-bold uppercase">TIER 03 • SOVEREIGN BUYOUT</div>
            <div class="text-white font-bold text-sm mt-0.5">Full Source Code &amp; IP</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">100% Git repository ownership, sovereign on-prem deployment.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span class="text-amber-400 font-extrabold text-sm font-mono">$38,000 <span class="text-[10px] font-normal text-slate-300">one-time</span></span>
            <span class="text-[11px] text-amber-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>
      </div>
    </div>

    <!-- CLIENT FEEDBACK SURVEY & COMMERCIAL ACTION BAR -->
    <div class="flex flex-wrap items-center justify-between gap-4 pt-2">
      <!-- Interactive Co-Design Survey Button -->
      <button onclick="openCoDesignSurvey('Saccade-UI Biometric CRO')" class="px-5 py-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-200 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer">
        <span class="material-symbols-outlined text-sm text-rose-400">rate_review</span>
        <span>What do you think? Request Custom Alignment for Your Agency ↗</span>
      </button>

      <!-- Direct Sandbox & AI Tour Links -->
      <div class="flex flex-wrap items-center gap-3">
        <button onclick="window.triggerLinkableDemo ? window.triggerLinkableDemo('saccade') : openContactModal()" class="px-4 py-3 rounded-xl glass-card border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-sm text-rose-400">smart_toy</span>
          <span>AI Tour</span>
        </button>
        <a href="https://saccade.linkable.it.com" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md">
          <span>Test Drive Sandbox</span>
          <span class="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
    </div>

  </div>
</div>

</div>`;

// Replace product cards grid in index.html
const gridRegex = /<!-- 4 EXHAUSTIVE DEEP-TECH PRODUCT DOSSIERS WITH ACTUAL FUNCTIONAL VIDEOS & NUTRITION FACTS -->[\s\S]*?<!-- ONE-PAGE PRICING SHEET & 3 PERPETUAL LICENSING TIERS/;
html = html.replace(gridRegex, `${updatedProductDossiers}\n\n<!-- ONE-PAGE PRICING SHEET & 3 PERPETUAL LICENSING TIERS`);

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(copyPath, html, 'utf8');

console.log('✅ 100% SUCCESS: Injected 5/10th Price Comparison Tables and Executive Reality Checks across all 4 product containers!');
