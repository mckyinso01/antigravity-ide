const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const fallbackPath = path.join(__dirname, 'gatzdevs-cinematic', '200.html');

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update Subdomains Telemetry List to include ClaimGuard AI right after Clinical Pristine
const oldSubdomainsGrid = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
    <!-- Subdomain 1: Clinical Pristine -->
    <a href="https://clinical.linkable.it.com" target="_blank" rel="noopener noreferrer" class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500 transition-all flex items-center justify-between group">
      <div>
        <div class="text-[10px] text-slate-400 font-bold">HEALTHCARE ICU OS</div>
        <div class="text-xs font-bold text-white group-hover:text-indigo-400">clinical.linkable.it.com</div>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-emerald-400 font-bold">21ms</span>
        <span class="block text-[9px] text-slate-500">HEALTHY</span>
      </div>
    </a>`;

const newSubdomainsGrid = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-3">
    <!-- Subdomain 1: Clinical Pristine -->
    <a href="https://clinical.linkable.it.com" target="_blank" rel="noopener noreferrer" class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500 transition-all flex items-center justify-between group">
      <div>
        <div class="text-[10px] text-slate-400 font-bold">HEALTHCARE ICU OS</div>
        <div class="text-xs font-bold text-white group-hover:text-indigo-400">clinical.linkable.it.com</div>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-emerald-400 font-bold">21ms</span>
        <span class="block text-[9px] text-slate-500">HEALTHY</span>
      </div>
    </a>

    <!-- Subdomain 2: ClaimGuard AI -->
    <a href="https://claimguard.linkable.it.com" target="_blank" rel="noopener noreferrer" class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500 transition-all flex items-center justify-between group">
      <div>
        <div class="text-[10px] text-slate-400 font-bold">HEALTHCARE CLAIMS OS</div>
        <div class="text-xs font-bold text-white group-hover:text-cyan-400">claimguard.linkable.it.com</div>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-emerald-400 font-bold">19ms</span>
        <span class="block text-[9px] text-slate-500">HEALTHY</span>
      </div>
    </a>`;

if (html.includes(oldSubdomainsGrid)) {
  html = html.replace(oldSubdomainsGrid, newSubdomainsGrid);
  console.log('✅ Subdomains Grid updated with ClaimGuard AI.');
} else {
  console.log('⚠️ Could not find exact subdomains grid block.');
}

// 2. Update Flagship count from [4] to [5]
html = html.replace('All Flagships <span class="ml-1 opacity-80" id="count-all">[4]</span>', 'All Flagships <span class="ml-1 opacity-80" id="count-all">[5]</span>');
html = html.replace('Clinical ICU OS <span class="ml-1 opacity-60" id="count-dispatch">[1]</span>', 'Healthcare Defense <span class="ml-1 opacity-60" id="count-dispatch">[2]</span>');
html = html.replace('4 STANDALONE_APPLICATIONS', '5 STANDALONE_APPLICATIONS');

// 3. Inject ClaimGuard AI Dossier right after Dossier 1 (Clinical Pristine)
const claimguardDossier = `

<!-- ========================================================================= -->
<!-- DOSSIER 2: ClaimGuard AI Healthcare Claims & Legal Defense OS -->
<!-- ========================================================================= -->
<div class="product-card-item moving-border-card rounded-3xl overflow-hidden" data-category="dispatch" data-search="claimguard ai healthcare claims billing denials erisa 502 cms-0057-f prompt pay moot court efax twain scanner lexis pre-submission">
  <div class="card-inner-surface bg-[#0A1628] w-full p-8 md:p-10 rounded-[1.38rem] flex flex-col gap-8">
    
    <!-- Header & Subdomain Live Pulse -->
    <div class="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[11px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full font-bold">HEALTHCARE CLAIMS &amp; LEGAL DEFENSE OS</span>
          <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE PRODUCTION SANDBOX
          </span>
        </div>
        <h3 class="text-3xl md:text-4xl font-extrabold text-white font-display">ClaimGuard AI</h3>
        <p class="text-sm md:text-base text-slate-300 font-sans mt-2 max-w-2xl">
          Pre-Submission Adversarial Healthcare Claims Defense Engine. Destroys 4%-12% revenue-share vendor extortion and downcoding with ERISA § 502 statutory briefs.
        </p>
      </div>

      <div class="flex flex-col items-end gap-2">
        <div class="text-right">
          <div class="text-[10px] font-mono text-slate-400 uppercase">Live Endpoint:</div>
          <a href="https://claimguard.linkable.it.com" target="_blank" rel="noopener noreferrer" class="block font-bold text-cyan-400 hover:underline text-sm">claimguard.linkable.it.com ↗</a>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">HIPAA Safe Harbor</span>
          <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">Zero Blur Drawers</span>
        </div>
      </div>
    </div>

    <!-- Live Demo Visual & Capability Matrix -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-7 flex flex-col gap-3">
        <div class="relative rounded-2xl overflow-hidden border border-slate-700 aspect-video shadow-2xl bg-slate-950 group">
          <div class="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-indigo-950/40 pointer-events-none z-10"></div>
          <img src="/assets/demos/clinical_demo.webp" alt="ClaimGuard AI Live Workflow Demo" class="w-full h-full object-cover" />
          <div class="absolute bottom-3 left-3 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span class="text-[11px] font-mono text-white">Adversarial Pre-Debate &amp; TWAIN Hardware Bridge Active</span>
          </div>
        </div>
        <p class="text-[11px] font-mono text-slate-400 italic">
          *Live interactive sandbox showing 50 real-world edge cases, 100% right slide drawers, e-Fax RFC 3198 dispatcher, and 1.5%–2% state prompt pay interest calculator.
        </p>
      </div>

      <div class="lg:col-span-5 flex flex-col gap-4">
        <div class="p-5 rounded-2xl bg-slate-950/70 border border-rose-500/20 flex flex-col gap-3">
          <div class="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono tracking-wider">
            <span class="material-symbols-outlined text-sm">warning</span>
            <span>CRITICAL HOSPITAL BILLING PAIN POINTS ERADICATED:</span>
          </div>
          <ul class="space-y-2 text-xs text-slate-300 font-sans">
            <li class="flex items-start gap-2">
              <span class="text-rose-400 font-bold">❌</span>
              <div><strong class="text-white">4%-12% Rev-Share Extortion:</strong> Eradicated with flat sovereign buyout pricing and 100% revenue retention.</div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-rose-400 font-bold">❌</span>
              <div><strong class="text-white">4,000-Click Fatigue &amp; Blinding Modals:</strong> Eradicated via 0% blocking popups, 100% right slide drawers, and pan-zoom studios.</div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-rose-400 font-bold">❌</span>
              <div><strong class="text-white">Arbitrary Payer Downcoding:</strong> Eradicated via pre-submission automated citation of ERISA § 502 &amp; CMS-0057-F.</div>
            </li>
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
          <div class="text-cyan-400 font-bold uppercase mb-1">ENTERPRISE SPECIFICATIONS</div>
          <div>• <strong>Compliance:</strong> HIPAA Safe Harbor, RFC 3198 Cryptographic e-Fax</div>
          <div>• <strong>Drivers:</strong> TWAIN 2.4 &amp; WIA 2.0 Physical Feeder Scanner Bridge</div>
          <div>• <strong>Engine:</strong> Dual-Agent Devil's Moot Court Pre-Submission AI</div>
          <div>• <strong>Statutes:</strong> ERISA § 502, CMS-0057-F, State Prompt Pay Acts (TX, CA, FL, NY)</div>
        </div>
      </div>
    </div>

    <!-- 5/10TH PRICING DISRUPTION STUDY -->
    <div class="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-2.5 py-1 rounded-md border border-cyan-500/40">5/10th Pricing Disruption</span>
          <span class="text-white font-bold text-sm">Full Source Code Buyout vs 12% Rev-Share Extortion</span>
        </div>
        <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">SAVE UP TO $1.2M ANNUALLY</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Tier 1 -->
        <button onclick="openPayMongoCheckout('ClaimGuard AI - Tier 1 Commercial Department License', 48500, 2716000)" class="p-3.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-cyan-400 font-bold uppercase">TIER 01 • COMMERCIAL LICENSE</div>
            <div class="text-white font-bold text-sm mt-0.5">Single Hospital Billing Dept</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Full EDI defense, TWAIN bridge, e-Fax gateway &amp; Moot Court.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-cyan-900 flex items-center justify-between">
            <span class="text-cyan-400 font-extrabold text-sm font-mono">$48,500 <span class="text-[10px] font-normal text-slate-300">flat / yr</span></span>
            <span class="text-[11px] text-cyan-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>

        <!-- Tier 2 -->
        <button onclick="openPayMongoCheckout('ClaimGuard AI - Tier 2 Enterprise Hospital Cluster', 88500, 4956000)" class="p-3.5 rounded-xl bg-gradient-to-b from-cyan-950/90 to-indigo-950/80 hover:from-cyan-900 hover:to-indigo-900 border border-indigo-500/60 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-lg shadow-cyan-950/50">
          <div>
            <div class="text-[10px] font-mono text-indigo-400 font-bold uppercase">TIER 02 • MULTI-FACILITY CLUSTER</div>
            <div class="text-white font-bold text-sm mt-0.5">Enterprise Hospital Network</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">Unlimited hospital beds, multi-facility EDI integration &amp; priority SLA.</div>
          </div>
          <div class="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span class="text-cyan-300 font-extrabold text-sm font-mono">$88,500 <span class="text-[10px] font-normal text-slate-300">annual cluster</span></span>
            <span class="text-[11px] text-indigo-300 font-bold group-hover:underline flex items-center gap-1">Pay / Wire ↗</span>
          </div>
        </button>

        <!-- Tier 3 -->
        <button onclick="openPayMongoCheckout('ClaimGuard AI - Tier 3 Sovereign Source Buyout', 165000, 9240000)" class="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-left transition-all hover:scale-[1.01] cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="text-[10px] font-mono text-amber-400 font-bold uppercase">TIER 03 • SOVEREIGN BUYOUT</div>
            <div class="text-white font-bold text-sm mt-0.5">Full Source Code &amp; IP</div>
            <div class="text-[10px] text-slate-400 font-sans mt-1">100% Git repository ownership, 3-Gives milestone escrow &amp; free mods.</div>
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
      <button onclick="openCoDesignSurvey('ClaimGuard AI Claims OS')" class="px-5 py-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer">
        <span class="material-symbols-outlined text-sm text-cyan-400">rate_review</span>
        <span>What do you think? Request Custom Alignment for Your Hospital ↗</span>
      </button>

      <!-- Direct Sandbox & AI Tour Links -->
      <div class="flex flex-wrap items-center gap-3">
        <button onclick="window.triggerLinkableDemo ? window.triggerLinkableDemo('clinical') : openContactModal()" class="px-4 py-3 rounded-xl glass-card border border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-sm text-cyan-400">smart_toy</span>
          <span>AI Tour</span>
        </button>
        <a href="https://claimguard.linkable.it.com" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md">
          <span>Test Drive Sandbox</span>
          <span class="material-symbols-outlined text-sm">arrow_outward</span>
        </a>
      </div>
    </div>

  </div>
</div>
`;

const insertionMarker = `<!-- DOSSIER 2: SiteSafe StructuraPro -->`;
if (!html.includes('DOSSIER 2: ClaimGuard AI')) {
  html = html.replace(insertionMarker, claimguardDossier + '\n' + insertionMarker);
  console.log('✅ ClaimGuard AI Dossier injected directly after Clinical Pristine.');
}

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(fallbackPath, html, 'utf8');
console.log('✅ Synchronized index.html and 200.html for linkable.it.com.');
