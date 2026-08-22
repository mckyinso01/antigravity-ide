const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// The 6 Active Feature Modules for ClaimGuard AI
const claimguardModules = `
            <!-- 6 ACTIVE PRODUCTION FEATURE MODULES -->
            <div class="space-y-3 pt-2 border-t border-slate-800/80">
              <div
                class="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm text-cyan-400">tune</span>
                <span>6 ACTIVE PRODUCTION FEATURE MODULES (BUILT-IN):</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-cyan-400 text-base mt-0.5">gavel</span>
                  <div>
                    <div class="text-white font-bold text-[11px]">Dual-Agent Moot Court Engine</div>
                    <div class="text-[10px] text-slate-400 font-sans">Pre-submission adversarial payer simulation stress-testing CMS-0057-F &amp; LCD rules.</div>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-cyan-400 text-base mt-0.5">scanner</span>
                  <div>
                    <div class="text-white font-bold text-[11px]">TWAIN 2.4 / WIA 2.0 Feeder Bridge</div>
                    <div class="text-[10px] text-slate-400 font-sans">Direct browser-to-hardware optical scanning from Fujitsu/Epson sheet-fed scanners.</div>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-cyan-400 text-base mt-0.5">lock_clock</span>
                  <div>
                    <div class="text-white font-bold text-[11px]">Cryptographic e-Fax Gateway</div>
                    <div class="text-[10px] text-slate-400 font-sans">RFC 3198 legally admissible transmission receipts with certified delivery timestamps.</div>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-cyan-400 text-base mt-0.5">percent</span>
                  <div>
                    <div class="text-white font-bold text-[11px]">State Prompt Pay Calculator</div>
                    <div class="text-[10px] text-slate-400 font-sans">Automated accrual of 1.5% to 2% monthly statutory late penalties (TX, CA, FL, NY).</div>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-cyan-400 text-base mt-0.5">savings</span>
                  <div>
                    <div class="text-white font-bold text-[11px]">0% Rev-Share Sovereign Vault</div>
                    <div class="text-[10px] text-slate-400 font-sans">Eliminates 4%-12% vendor cuts with 100% hospital cashflow retention.</div>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-cyan-400 text-base mt-0.5">dock_to_left</span>
                  <div>
                    <div class="text-white font-bold text-[11px]">Non-Modal Right Slide Drawers</div>
                    <div class="text-[10px] text-slate-400 font-sans">Eliminates 4,000-click modal fatigue and popup thrashing with 100% split-pane studios.</div>
                  </div>
                </div>
              </div>
            </div>
`;

// The Comprehensive 5/10th Price Gap Evaluation Table & Executive Reality Check for ClaimGuard AI
const claimguardPriceTableAndRealityCheck = `
            <!-- COMPREHENSIVE 5/10TH PRICE GAP EVALUATION TABLE -->
            <div class="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-3 font-mono text-xs">
              <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <span class="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">balance</span>
                  5/10TH PRICE GAP EVALUATION VS TECH GIANTS (WAYSTAR, OPTUM &amp; RCM REV-SHARE BENCHMARK):
                </span>
                <span
                  class="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
                  SAVE UP TO $1.2M ANNUALLY (0% REV-SHARE)
                </span>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="text-[10px] text-slate-400 uppercase border-b border-slate-800 bg-slate-900/50">
                      <th class="py-2.5 px-3">Commercial Licensing Tier</th>
                      <th class="py-2.5 px-3">Legacy Tech Giants (Waystar / Optum)</th>
                      <th class="py-2.5 px-3 text-cyan-300">LinkableAI (0% Rev-Share Model)</th>
                      <th class="py-2.5 px-3 text-right text-emerald-400">Direct Net Savings</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60 text-xs">
                    <tr class="hover:bg-slate-900/40 transition-colors">
                      <td class="py-2.5 px-3 font-bold text-white">Tier 01: Single Hospital Billing Dept</td>
                      <td class="py-2.5 px-3 text-rose-400 font-medium">4%-12% Rev-Share ($120k-$240k/yr drain)</td>
                      <td class="py-2.5 px-3 font-bold text-emerald-400">$48,500 (₱2.71M) <span class="text-[10px] text-slate-400 font-normal">flat / yr (0% rev-share)</span></td>
                      <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE UP TO $191,500/YR (80%)</td>
                    </tr>
                    <tr class="hover:bg-slate-900/40 transition-colors bg-blue-950/10">
                      <td class="py-2.5 px-3 font-bold text-cyan-300 flex items-center gap-1.5">
                        <span>Tier 02: Enterprise Hospital Cluster</span>
                        <span class="bg-cyan-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">POPULAR</span>
                      </td>
                      <td class="py-2.5 px-3 text-rose-400 font-medium">$300,000 + 6% ongoing rev-share tax</td>
                      <td class="py-2.5 px-3 font-bold text-emerald-400">$88,500 (₱4.95M) <span class="text-[10px] text-slate-400 font-normal">annual cluster (0% rev-share)</span></td>
                      <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE UP TO $450,000/YR (80%)</td>
                    </tr>
                    <tr class="hover:bg-slate-900/40 transition-colors">
                      <td class="py-2.5 px-3 font-bold text-amber-300">Tier 03: Full Source Code &amp; IP Buyout</td>
                      <td class="py-2.5 px-3 text-rose-400 font-medium">NEVER SOLD (Permanent vendor lock-in)</td>
                      <td class="py-2.5 px-3 font-bold text-amber-400">$165,000 (₱9.24M) <span class="text-[10px] text-slate-400 font-normal">100% full Git IP buyout</span></td>
                      <td class="py-2.5 px-3 text-right font-extrabold text-emerald-400 bg-emerald-950/20">SAVE $1.2M+ LIFETIME VALUE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- PROVOCATIVE EXECUTIVE REALITY CHECK CALLOUT -->
            <div class="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-slate-950 border border-cyan-500/40 shadow-xl relative overflow-hidden">
              <div class="flex items-start gap-3.5">
                <div class="p-2.5 rounded-xl bg-cyan-600/20 border border-cyan-400/40 text-cyan-300">
                  <span class="material-symbols-outlined text-2xl">psychology_alt</span>
                </div>
                <div class="space-y-1.5">
                  <div class="text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    THE HOSPITAL CFO &amp; RCM REALITY CHECK: WHY LET VENDORS EXTORT 4% TO 12% OF YOUR CASH FLOW?
                  </div>
                  <p class="text-sm font-bold text-white leading-snug">
                    "Are you willing to keep paying hundreds of thousands of dollars in permanent revenue-share cuts to third-party billing vendors instead of keeping 100% of your hospital's hard-earned clinical revenue?"
                  </p>
                  <p class="text-xs text-slate-300 font-sans leading-relaxed">
                    Every year, hospital systems forfeit millions in revenue-share penalties to claims vendors who profit from slow appeals and opaque processes. ClaimGuard AI arms your internal billing team with adversarial moot court AI and statutory prompt pay interest enforcement—saving over $1.2M annually at 0% rev-share.
                  </p>
                </div>
              </div>
            </div>
`;

// Find ClaimGuard Dossier and inject the missing pieces
const targetMarker = `<!-- 5/10TH PRICING DISRUPTION STUDY -->`;

// Let's replace within ClaimGuard's container
const claimguardStartMarker = `<!-- DOSSIER 2: ClaimGuard AI Healthcare Claims & Legal Defense OS -->`;
const sitesafeStartMarker = `<!-- DOSSIER 2: SiteSafe StructuraPro -->`;

if (html.includes(claimguardStartMarker) && html.includes(sitesafeStartMarker)) {
  const parts = html.split(sitesafeStartMarker);
  let claimguardSection = parts[0];
  const restOfFile = sitesafeStartMarker + parts[1];

  // Insert modules before 5/10th pricing study
  if (!claimguardSection.includes('Dual-Agent Moot Court Engine')) {
    const splitIndex = claimguardSection.lastIndexOf(targetMarker);
    if (splitIndex !== -1) {
      const beforePricing = claimguardSection.substring(0, splitIndex);
      const afterPricing = claimguardSection.substring(splitIndex);
      claimguardSection = beforePricing + claimguardModules + '\n' + claimguardPriceTableAndRealityCheck + '\n' + afterPricing;
      console.log('✅ ClaimGuard 6 Modules & 5/10th Price Table injected successfully!');
    }
  }

  html = claimguardSection + restOfFile;
}

// Write to all 4 destination files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 Successfully synchronized all 4 HTML files with the complete 5-Dossier architecture!');
