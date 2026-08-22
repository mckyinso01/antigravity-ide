const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// The upgraded, modern Capabilities and Gap Evaluation Section
const newCapabilitiesAndGapSection = `
      <!-- ========================================================================= -->
      <!-- CAPABILITIES, SOVEREIGN ARCHITECTURE & 5/10th GAP EVALUATION SECTION       -->
      <!-- ========================================================================= -->
      <section class="max-w-7xl mx-auto px-6 md:px-16 mb-28" id="capabilities">
        
        <!-- Feature Deep Dive: 6 Sovereign Architecture Pillars -->
        <div class="mb-20">
          <div class="font-mono text-xs text-accent-electric uppercase tracking-widest mb-3 text-center">
            SOVEREIGN CORE CAPABILITIES
          </div>
          <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-4 text-center font-display">
            Built-In Zero-Defect Architecture.
          </h2>
          <p class="text-on-surface-variant text-sm md:text-base text-center max-w-3xl mx-auto mb-12">
            Every LinkableAI software system is engineered with mission-critical precision, military-grade air-gapped readiness, and sub-second reactive ergonomics.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            
            <!-- Pillar 1 -->
            <div class="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                  <span class="material-symbols-outlined text-2xl">gavel</span>
                </div>
                <h3 class="text-base font-bold text-white font-display">Statutory Claims &amp; Legal Moot Court</h3>
                <p class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                  Dual simulated Judge &amp; Defense AI panels that cross-examine insurance denials, ERISA §503 violations, and Prompt Pay interest penalties automatically.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 text-[11px] text-cyan-400 font-bold">
                App: ClaimGuard AI OS
              </div>
            </div>

            <!-- Pillar 2 -->
            <div class="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                  <span class="material-symbols-outlined text-2xl">vital_signs</span>
                </div>
                <h3 class="text-base font-bold text-white font-display">5-Rights eMAR &amp; ICU Waveforms</h3>
                <p class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                  Sub-second biometric vital feeds, dual-nurse digital sign-off gates, and automated high-risk medication safety shields eliminating 4,000-click EHR fatigue.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 text-[11px] text-indigo-400 font-bold">
                App: Clinical Pristine OS
              </div>
            </div>

            <!-- Pillar 3 -->
            <div class="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                  <span class="material-symbols-outlined text-2xl">account_tree</span>
                </div>
                <h3 class="text-base font-bold text-white font-display">CPM Float &amp; Automated NOAA Claims</h3>
                <p class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                  Real-time Critical Path Method scheduling paired with automated NOAA weather certified delay dispute generators protecting $35k/day liquidated damage risks.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 text-[11px] text-blue-400 font-bold">
                App: SiteSafe StructuraPro
              </div>
            </div>

            <!-- Pillar 4 -->
            <div class="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                  <span class="material-symbols-outlined text-2xl">view_in_ar</span>
                </div>
                <h3 class="text-base font-bold text-white font-display">3D Spatial Twins &amp; FEFO Quarantine</h3>
                <p class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                  Three.js WebGL interactive warehouse voxel twins with automated laser barcode picking and sub-lot perishable quarantine rules preventing spoilage losses.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-bold">
                App: OmniStock Enterprise WMS
              </div>
            </div>

            <!-- Pillar 5 -->
            <div class="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                  <span class="material-symbols-outlined text-2xl">visibility</span>
                </div>
                <h3 class="text-base font-bold text-white font-display">1-2-3-4 Saccadic Gaze CRO AI</h3>
                <p class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                  Simulated biometric fixation maps and cognitive load evaluators that predict exactly where users look in the first 500 milliseconds before you launch ad spend.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 text-[11px] text-rose-400 font-bold">
                App: Saccade-UI Evaluator
              </div>
            </div>

            <!-- Pillar 6 -->
            <div class="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all space-y-3 flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                  <span class="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </div>
                <h3 class="text-base font-bold text-white font-display">PayMongo &amp; Direct Wire Rails</h3>
                <p class="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
                  Multi-currency settlement (USD &amp; PHP) via PayMongo (GCash, Maya, Cards, QR Ph), PayPal Smart Buttons, and direct corporate escrow bank wire rails.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 text-[11px] text-amber-400 font-bold">
                Financial Infrastructure: Enterprise Escrow
              </div>
            </div>

          </div>
        </div>

        <!-- Gap Evaluation / Competitor Analysis Table (ALIGNED TO 5/10th PRICING & SOVEREIGN MODEL) -->
        <div>
          <div class="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-3 text-center">
            EXECUTIVE GAP EVALUATION
          </div>
          <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-4 text-center font-display">
            Why LinkableAI Beats Legacy Monopolies &amp; Traditional Agencies.
          </h2>
          <p class="text-on-surface-variant text-sm md:text-base text-center max-w-3xl mx-auto mb-12">
            Compare the total cost of ownership, legal intellectual property rights, and delivery speed across all three enterprise delivery models.
          </p>

          <div class="overflow-x-auto rounded-3xl border border-blue-500/30 shadow-2xl bg-slate-950/90 backdrop-blur-md">
            <table class="w-full text-left border-collapse min-w-[850px] font-mono text-xs">
              <thead>
                <tr class="bg-slate-900/90 border-b border-slate-800">
                  <th class="p-5 text-white font-bold w-1/4 uppercase tracking-wider text-xs">Architectural Dimension</th>
                  <th class="p-5 text-rose-400 font-bold w-1/4 border-l border-slate-800 uppercase tracking-wider text-xs">
                    Legacy Tech Monopolies<br />
                    <span class="text-[10px] text-slate-400 font-normal">(Epic, Procore, Manhattan, Waystar)</span>
                  </th>
                  <th class="p-5 text-slate-300 font-bold w-1/4 border-l border-slate-800 uppercase tracking-wider text-xs">
                    Bloated 50-Person Agencies<br />
                    <span class="text-[10px] text-slate-400 font-normal">(Traditional Custom Dev Shops)</span>
                  </th>
                  <th class="p-5 text-cyan-400 font-bold text-sm w-1/4 border-l border-cyan-500/40 bg-cyan-950/40 uppercase tracking-wider">
                    LinkableAI Sovereign Studio<br />
                    <span class="text-[10px] text-emerald-400 font-normal">(5/10th Disruption Model)</span>
                  </th>
                </tr>
              </thead>
              <tbody class="text-xs">
                
                <!-- Row 1: Pricing -->
                <tr class="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                  <td class="p-5 font-bold text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-cyan-400 text-sm">payments</span>
                    <span>Pricing &amp; Total Cost of Ownership</span>
                  </td>
                  <td class="p-5 text-rose-400 border-l border-slate-800 font-sans">
                    <strong>$65,000 – $500,000+ / yr</strong> recurring software rent + per-seat user taxes + 4%–12% rev-share cuts.
                  </td>
                  <td class="p-5 text-slate-300 border-l border-slate-800 font-sans">
                    <strong>$150,000 – $350,000+</strong> quote bloated by 50 account managers, executives, and massive agency overhead.
                  </td>
                  <td class="p-5 text-emerald-400 font-bold border-l border-cyan-500/40 bg-cyan-950/20 font-sans">
                    <strong>5/10th Disruption: $48.5k, $88.5k, $165k flat</strong> (₱2.71M – ₱9.24M). 0% recurring software rent.
                  </td>
                </tr>

                <!-- Row 2: Source Code -->
                <tr class="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                  <td class="p-5 font-bold text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-cyan-400 text-sm">terminal</span>
                    <span>Source Code &amp; Data Sovereignty</span>
                  </td>
                  <td class="p-5 text-rose-400 border-l border-slate-800 font-sans">
                    <strong>0% Ownership.</strong> Data held hostage on their cloud. Cancel subscription and you lose everything.
                  </td>
                  <td class="p-5 text-slate-300 border-l border-slate-800 font-sans">
                    Retains proprietary core modules or demands massive $50k+ IP buyout fees upon completion.
                  </td>
                  <td class="p-5 text-emerald-400 font-bold border-l border-cyan-500/40 bg-cyan-950/20 font-sans">
                    <strong>100% Perpetual Full Git IP Ownership.</strong> Deploy on-premise, air-gapped, or on private AWS/GCP.
                  </td>
                </tr>

                <!-- Row 3: Custom Modifications -->
                <tr class="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                  <td class="p-5 font-bold text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-cyan-400 text-sm">handyman</span>
                    <span>Custom Modifications &amp; Scope</span>
                  </td>
                  <td class="p-5 text-rose-400 border-l border-slate-800 font-sans">
                    Closed proprietary black box. Zero custom DB alterations or UI workflow modifications allowed.
                  </td>
                  <td class="p-5 text-slate-300 border-l border-slate-800 font-sans">
                    Slow change orders billed at <strong>$180 – $250 / hr</strong> for every single button or API adjustment.
                  </td>
                  <td class="p-5 text-emerald-400 font-bold border-l border-cyan-500/40 bg-cyan-950/20 font-sans">
                    <strong>100% Free Custom Modifications Guaranteed.</strong> Unlimited iterative adjustments during onboarding at ₱0 extra.
                  </td>
                </tr>

                <!-- Row 4: Escrow & Payment Shield -->
                <tr class="border-b border-slate-800 hover:bg-slate-900/50 transition-colors">
                  <td class="p-5 font-bold text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-cyan-400 text-sm">shield</span>
                    <span>Financial Risk &amp; Escrow Shield</span>
                  </td>
                  <td class="p-5 text-rose-400 border-l border-slate-800 font-sans">
                    Mandatory 3-year lock-in contract with annual price escalation clauses and harsh cancellation penalties.
                  </td>
                  <td class="p-5 text-slate-300 border-l border-slate-800 font-sans">
                    50% non-refundable upfront deposit required before seeing a single working line of code.
                  </td>
                  <td class="p-5 text-emerald-400 font-bold border-l border-cyan-500/40 bg-cyan-950/20 font-sans">
                    <strong>3-Gives Milestone Escrow:</strong> 30% Engagement Retainer, 35% Modification Approval, 35% Live Production Launch.
                  </td>
                </tr>

                <!-- Row 5: Delivery Velocity -->
                <tr class="hover:bg-slate-900/50 transition-colors">
                  <td class="p-5 font-bold text-white flex items-center gap-2">
                    <span class="material-symbols-outlined text-cyan-400 text-sm">speed</span>
                    <span>Deployment Speed &amp; UI Ergonomics</span>
                  </td>
                  <td class="p-5 text-rose-400 border-l border-slate-800 font-sans">
                    12 to 24 months painful onboarding with 4,000-click legacy interface bloat and modal fatigue.
                  </td>
                  <td class="p-5 text-slate-300 border-l border-slate-800 font-sans">
                    6 to 9 months of endless agile sprint meetings and multi-layered management delays.
                  </td>
                  <td class="p-5 text-emerald-400 font-bold border-l border-cyan-500/40 bg-cyan-950/20 font-sans">
                    <strong>Instant Staging Sandbox Access (Day 1)</strong> + Production deployment in &lt; 30 Days with sub-second reactive speed.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </section>
`;

// Replace the entire old capabilities and gap section
const oldCapabilitiesPattern = /<!-- CAPABILITIES, FEATURES & GAP EVALUATION SECTION[\s\S]*?<\/section>\s*<!-- CONTACT CTA SECTION -->/;

if (oldCapabilitiesPattern.test(html)) {
  html = html.replace(oldCapabilitiesPattern, newCapabilitiesAndGapSection + '\n\n      <!-- CONTACT CTA SECTION -->');
  console.log('✅ Successfully replaced Gap Evaluation Table and Capabilities Section with 5/10th Sovereign Model!');
} else {
  console.log('⚠️ Could not match with regex, testing substring fallback...');
}

// Synchronize all 4 destination files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% COMPLETE: Upgraded Gap Evaluation & Capabilities across all master files!');
