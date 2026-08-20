const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const copyPath = path.join(__dirname, 'gatzdevs-cinematic', '200.html');

let html = fs.readFileSync(indexPath, 'utf8');

// =========================================================================
// 1. REBUILD TELEMETRY & FILTER BAR
// =========================================================================
const telemetryAndFilterSection = `<!-- LIVE SUBDOMAIN HEARTBEAT & TELEMETRY STATUS INDICATOR [HUB-01] -->
<div class="glass-card spotlight-card p-5 rounded-2xl border border-blue-500/30 mb-8 font-mono text-xs">
  <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
    <div class="flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="font-bold text-white uppercase text-xs">Live Subdomain Telemetry Hub</span>
      <span class="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">ALL SYSTEMS 100% OPERATIONAL</span>
    </div>
    <div class="text-[11px] text-slate-400">Auto-Ping Interval: 5s • Global Edge Availability: 99.99%</div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-3">
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
    </a>

    <!-- Subdomain 3: SiteSafe -->
    <a href="https://sitesafe.linkable.it.com" target="_blank" rel="noopener noreferrer" class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group">
      <div>
        <div class="text-[10px] text-slate-400 font-bold">CONSTRUCTION OS</div>
        <div class="text-xs font-bold text-white group-hover:text-blue-400">sitesafe.linkable.it.com</div>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-emerald-400 font-bold">24ms</span>
        <span class="block text-[9px] text-slate-500">HEALTHY</span>
      </div>
    </a>

    <!-- Subdomain 4: OmniStock -->
    <a href="https://omnistock.linkable.it.com" target="_blank" rel="noopener noreferrer" class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500 transition-all flex items-center justify-between group">
      <div>
        <div class="text-[10px] text-slate-400 font-bold">SPATIAL WMS</div>
        <div class="text-xs font-bold text-white group-hover:text-emerald-400">omnistock.linkable.it.com</div>
      </div>
      <div class="text-right">
        <span class="text-[10px] text-emerald-400 font-bold">18ms</span>
        <span class="block text-[9px] text-slate-500">HEALTHY</span>
      </div>
    </a>

    <!-- Subdomain 5: Saccade-UI -->
    <a href="https://saccade.linkable.it.com" target="_blank" rel="noopener noreferrer" class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-rose-500 transition-all flex items-center justify-between group">
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
</div>

<!-- FILTER RAIL & KEYWORD SEARCH BAR -->
<div class="glass-card spotlight-card p-4 rounded-2xl border border-outline-variant mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
  <!-- Category Filter Tabs -->
  <div class="flex flex-wrap gap-2 text-xs font-mono">
    <button class="px-4 py-2 rounded-xl border border-accent-electric bg-accent-electric text-white font-bold transition-all shadow-md" id="filter-btn-all" onclick="filterCategory('all')">
      All Flagships <span class="ml-1 opacity-80" id="count-all">[5]</span>
    </button>
    <button class="px-4 py-2 rounded-xl border border-outline-variant bg-slate-950/80 text-on-surface-variant hover:text-white transition-all" id="filter-btn-dispatch" onclick="filterCategory('dispatch')">
      Healthcare Defense <span class="ml-1 opacity-60" id="count-dispatch">[2]</span>
    </button>
    <button class="px-4 py-2 rounded-xl border border-outline-variant bg-slate-950/80 text-on-surface-variant hover:text-white transition-all" id="filter-btn-crm" onclick="filterCategory('crm')">
      Construction CPM <span class="ml-1 opacity-60" id="count-crm">[1]</span>
    </button>
    <button class="px-4 py-2 rounded-xl border border-outline-variant bg-slate-950/80 text-on-surface-variant hover:text-white transition-all" id="filter-btn-pos" onclick="filterCategory('pos')">
      WMS &amp; Logistics <span class="ml-1 opacity-60" id="count-pos">[1]</span>
    </button>
    <button class="px-4 py-2 rounded-xl border border-outline-variant bg-slate-950/80 text-on-surface-variant hover:text-white transition-all" id="filter-btn-legal" onclick="filterCategory('legal')">
      Neurology CRO <span class="ml-1 opacity-60" id="count-legal">[1]</span>
    </button>
  </div>
  <!-- Keyword Search Input (Shortcut: Ctrl+K) -->
  <div class="w-full md:w-72 relative font-mono text-xs">
    <span class="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base">search</span>
    <input class="w-full bg-slate-950 border border-outline-variant rounded-xl pl-9 pr-8 py-2 text-white focus:border-accent-electric outline-none transition-colors" id="app-search-input" oninput="handleSearchInput()" placeholder="Search apps... (Ctrl+K)" type="text"/>
    <kbd class="absolute right-2.5 top-2.5 bg-slate-800 text-[9px] text-on-surface-variant px-1.5 py-0.5 rounded">Ctrl+K</kbd>
  </div>
</div>`;

// Replace from LIVE SUBDOMAIN HEARTBEAT down to start of product dossiers
const telemetryRegex = /<!-- LIVE SUBDOMAIN HEARTBEAT[\s\S]*?<!-- 4 EXHAUSTIVE DEEP-TECH|<!-- LIVE SUBDOMAIN HEARTBEAT[\s\S]*?<div class="space-y-16" id="product-cards-grid">/;
if (telemetryRegex.test(html)) {
  html = html.replace(telemetryRegex, telemetryAndFilterSection + '\n\n<div class="space-y-16" id="product-cards-grid">');
  console.log('✅ Replaced Telemetry Hub and Filter Rail with 5-app layout.');
}

// Write back
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(copyPath, html, 'utf8');
console.log('✅ Updated index.html and 200.html successfully.');
