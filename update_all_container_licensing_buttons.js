const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const copyPath = path.join(__dirname, 'gatzdevs-cinematic', '200.html');

let html = fs.readFileSync(indexPath, 'utf8');

// ==========================================
// 1. Clinical Pristine Action Block
// ==========================================
const clinicalActionBlock = `
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
    </div>`;

// ==========================================
// 2. SiteSafe StructuraPro Action Block
// ==========================================
const siteSafeActionBlock = `
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
    </div>`;

// ==========================================
// 3. OmniStock Spatial WMS Action Block
// ==========================================
const omniStockActionBlock = `
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
    </div>`;

// ==========================================
// 4. Saccade-UI Biometric CRO Action Block
// ==========================================
const saccadeActionBlock = `
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
    </div>`;

// Replace in SiteSafe
const siteSafePattern = /<!-- CLIENT FEEDBACK SURVEY & COMMERCIAL ACTION BAR -->[\s\S]*?<!-- ========================================================================= -->\s*<!-- DOSSIER 3: OmniStock Spatial WMS -->/;
html = html.replace(siteSafePattern, `${siteSafeActionBlock}\n\n  </div>\n</div>\n\n<!-- ========================================================================= -->\n<!-- DOSSIER 3: OmniStock Spatial WMS -->`);

// Replace in OmniStock
const omniStockPattern = /<!-- CLIENT FEEDBACK SURVEY & COMMERCIAL ACTION BAR -->[\s\S]*?<!-- ========================================================================= -->\s*<!-- DOSSIER 4: Saccade-UI Biometric CRO -->/;
html = html.replace(omniStockPattern, `${omniStockActionBlock}\n\n  </div>\n</div>\n\n<!-- ========================================================================= -->\n<!-- DOSSIER 4: Saccade-UI Biometric CRO -->`);

// Replace in Saccade
const saccadePattern = /<!-- Action Bar \/ Test Drive Buttons -->[\s\S]*?<!-- ONE-PAGE PRICING SHEET & 3 PERPETUAL LICENSING TIERS/;
html = html.replace(saccadePattern, `${saccadeActionBlock}\n\n  </div>\n</div>\n\n<!-- ONE-PAGE PRICING SHEET & 3 PERPETUAL LICENSING TIERS`);

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(copyPath, html, 'utf8');

console.log('✅ Successfully updated all 4 featured product containers with 3 Perpetual Licensing Tier Buttons!');
