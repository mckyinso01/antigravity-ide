const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const copyPath = path.join(__dirname, 'gatzdevs-cinematic', '200.html');

let html = fs.readFileSync(indexPath, 'utf8');

// =========================================================================
// 1. FREE MODIFICATIONS & 3-GIVES MILESTONE GUARANTEE BANNER
// =========================================================================
const trustGuaranteeBanner = `
<!-- ========================================================================= -->
<!-- 100% FREE CUSTOM MODIFICATIONS & 3-GIVES MILESTONE TRUST GUARANTEE BANNER -->
<!-- ========================================================================= -->
<section class="max-w-7xl mx-auto px-6 md:px-16 mb-24" id="trust-guarantee">
  <div class="glass-card spotlight-card p-8 md:p-12 rounded-3xl border border-emerald-500/40 relative overflow-hidden bg-gradient-to-br from-surface-card via-slate-950 to-emerald-950/30 shadow-2xl">
    
    <!-- Background Ambient Glow -->
    <div class="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="relative z-10 space-y-8">
      
      <!-- Banner Header -->
      <div class="text-center max-w-3xl mx-auto space-y-3">
        <div class="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider">
          <span class="material-symbols-outlined text-sm">verified</span>
          <span>100% CLIENT TRUST &amp; RISK-FREE ASSURANCE SYSTEM</span>
        </div>
        <h2 class="text-3xl md:text-5xl font-extrabold text-white font-display">
          100% Free Custom Modifications.<br/>
          <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Pay in 3 Milestone Gives as We Build.</span>
        </h2>
        <p class="text-on-surface-variant text-sm md:text-base leading-relaxed font-sans">
          We earn your trust through skin-in-the-game engineering. Need the software customized for your specific hospital, construction firm, warehouse, or agency? <strong>We implement all your custom modifications at zero extra charge</strong>, backed by our 3-Gives Milestone Escrow payment schedule.
        </p>
      </div>

      <!-- 2-Column Trust Pillars -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        
        <!-- Pillar 1: Free Custom Modification System -->
        <div class="p-6 md:p-8 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <span class="material-symbols-outlined text-2xl">handyman</span>
            </div>
            <div>
              <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">ZERO EXTRA COST</span>
              <h3 class="text-xl font-bold text-white font-display">100% Free Custom Modification System</h3>
            </div>
          </div>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Every business has unique workflows, database structures, and legacy APIs. When you acquire any LinkableAI platform, <strong>we do not charge a single cent for custom modifications</strong>.
          </p>
          <ul class="space-y-2.5 font-mono text-xs text-slate-300">
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-emerald-400 text-sm mt-0.5">check_circle</span>
              <span><strong>Custom Database &amp; API Integrations:</strong> Connect directly to your existing SQL, ERP, or PACS.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-emerald-400 text-sm mt-0.5">check_circle</span>
              <span><strong>Tailored Feature Engineering:</strong> We build new modules until 100% of your business requirements are met.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="material-symbols-outlined text-emerald-400 text-sm mt-0.5">check_circle</span>
              <span><strong>Zero Scope Creep Invoices:</strong> Unlimited iterative adjustments during onboarding at ₱0 / $0 extra.</span>
            </li>
          </ul>
        </div>

        <!-- Pillar 2: 3-Gives Milestone Escrow Schedule -->
        <div class="p-6 md:p-8 rounded-2xl bg-slate-950/90 border border-blue-500/30 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-accent-cyan shrink-0">
              <span class="material-symbols-outlined text-2xl">payments</span>
            </div>
            <div>
              <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">MILESTONE-BASED RISK SHIELD</span>
              <h3 class="text-xl font-bold text-white font-display">The 3-Gives Payment Schedule</h3>
            </div>
          </div>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            Never pay 100% upfront for promises. You only release funds across 3 verified delivery milestones:
          </p>
          <div class="space-y-2 font-mono text-xs">
            
            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3">
              <div class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <div class="text-white font-bold text-xs">1st Give (30% Engagement Retainer)</div>
                  <div class="text-[10px] text-slate-400 font-sans">Paid upon contract signing. Immediately activates dedicated senior engineers &amp; private cloud fork.</div>
                </div>
              </div>
              <span class="text-cyan-400 font-bold shrink-0">30% Deposit</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3">
              <div class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <div class="text-white font-bold text-xs">2nd Give (35% Custom Modification Sign-Off)</div>
                  <div class="text-[10px] text-slate-400 font-sans">Paid ONLY after all requested custom features and UI modifications are fully completed &amp; approved.</div>
                </div>
              </div>
              <span class="text-teal-400 font-bold shrink-0">35% Milestone</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3">
              <div class="flex items-start gap-2">
                <span class="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <div class="text-white font-bold text-xs">3rd Give (35% 100% Live Production Launch)</div>
                  <div class="text-[10px] text-slate-400 font-sans">Paid ONLY when the system is 100% live, operational, staff-onboarded, and running in production.</div>
                </div>
              </div>
              <span class="text-emerald-400 font-bold shrink-0">35% Final</span>
            </div>

          </div>
        </div>

      </div>

      <!-- Action & Terms Footer Strip -->
      <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div class="flex items-center gap-2 text-slate-300">
          <span class="material-symbols-outlined text-emerald-400 text-base">gavel</span>
          <span>Transparent Contract Terms • Clear 30% Retainer Protection • 70% Milestone Shield</span>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="openTermsModal()" class="text-cyan-400 hover:underline font-bold flex items-center gap-1 cursor-pointer">
            <span>Read 3-Gives Commercial Terms &amp; Refund Policy ↗</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</section>
`;

// Insert the Trust Guarantee Banner right above the #pricing section
html = html.replace('<!-- ONE-PAGE PRICING SHEET & 3 PERPETUAL LICENSING TIERS (5/10th PRICING MODEL) -->', `${trustGuaranteeBanner}\n<!-- ONE-PAGE PRICING SHEET & 3 PERPETUAL LICENSING TIERS (5/10th PRICING MODEL) -->`);


// =========================================================================
// 2. TERMS & CONDITIONS MODAL WITH BULLETPROOF REFUND & 30% RETAINER CLAUSE
// =========================================================================
const termsModal = `
<!-- ENTERPRISE TERMS & CONDITIONS & 3-GIVES REFUND POLICY MODAL -->
<div class="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 hidden flex items-center justify-center p-4" id="terms-modal">
  <div class="bg-surface-card border border-blue-500/50 p-8 rounded-3xl max-w-3xl w-full shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-950 via-surface-card to-slate-950 max-h-[90vh] overflow-y-auto">
    
    <button class="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors z-10" onclick="closeModal('terms-modal')">
      <span class="material-symbols-outlined">close</span>
    </button>
    
    <div class="flex items-center gap-3 mb-6 relative z-10 pb-4 border-b border-slate-800">
      <div class="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-accent-cyan shrink-0">
        <span class="material-symbols-outlined text-2xl">policy</span>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">LEGAL &amp; COMMERCIAL TERMS</span>
          <span class="text-[10px] font-mono text-emerald-400 font-bold">100% TRANSPARENCY</span>
        </div>
        <h3 class="text-2xl font-bold text-white font-display mt-0.5">Enterprise Commercial Terms &amp; Refund Policy</h3>
      </div>
    </div>

    <div class="space-y-6 text-xs text-slate-300 font-sans leading-relaxed font-body">
      
      <!-- Section 1 -->
      <div class="space-y-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
        <div class="font-mono font-bold text-white text-sm flex items-center gap-2">
          <span class="material-symbols-outlined text-blue-400 text-base">verified_user</span>
          <span>1. Perpetual Commercial Licensing Model (No Monthly SaaS Taxes)</span>
        </div>
        <p>
          All LinkableAI software suites are delivered under a 100% perpetual commercial license or sovereign source buyout agreement. The client pays a fixed, one-time price. LinkableAI shall never impose recurring monthly seat fees, per-user usage taxes, or unexpected licensing price hikes.
        </p>
      </div>

      <!-- Section 2 -->
      <div class="space-y-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
        <div class="font-mono font-bold text-emerald-400 text-sm flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-400 text-base">handyman</span>
          <span>2. 100% Free Custom Modification &amp; Tailoring Guarantee</span>
        </div>
        <p>
          LinkableAI guarantees that all requested custom feature modifications, API integrations, and workflow tailoring required to adapt the application to the client's existing business operations shall be completed at <strong>zero additional cost (₱0 / $0)</strong>. Custom development continues until 100% of agreed functional specifications are fulfilled.
        </p>
      </div>

      <!-- Section 3 -->
      <div class="space-y-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
        <div class="font-mono font-bold text-cyan-400 text-sm flex items-center gap-2">
          <span class="material-symbols-outlined text-cyan-400 text-base">payments</span>
          <span>3. The 3-Gives Milestone Escrow Structure</span>
        </div>
        <p>
          Clients electing the 3-Gives Milestone Payment Option agree to the following delivery schedule:
        </p>
        <ul class="space-y-1.5 font-mono text-[11px] text-slate-300 pl-2">
          <li>• <strong>Give 1 (30% Engagement Retainer):</strong> Payable upon contract execution to initiate architectural provisioning.</li>
          <li>• <strong>Give 2 (35% Modification Sign-Off):</strong> Payable ONLY after client tests and approves all custom modifications in staging.</li>
          <li>• <strong>Give 3 (35% Final Production Launch):</strong> Payable ONLY when the customized platform is 100% live and operational.</li>
        </ul>
      </div>

      <!-- Section 4: REFUND POLICY & 30% RETAINER CLAUSE (THE BULLETPROOF RATIONALE) -->
      <div class="space-y-3 p-5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs">
        <div class="font-mono font-bold text-rose-300 text-sm flex items-center gap-2">
          <span class="material-symbols-outlined text-rose-400 text-base">shield_with_heart</span>
          <span>4. Refund Policy &amp; Non-Refundable 30% Engineering Initiation Retainer</span>
        </div>
        <p class="text-slate-200">
          <strong>Why is the 1st Give (30% Deposit) Non-Refundable under the 3-Gives Agreement?</strong>
        </p>
        <div class="p-3.5 rounded-lg bg-slate-950/90 border border-rose-800/40 space-y-2 text-[11px] text-slate-300 leading-relaxed font-mono">
          <p>
            1. <strong>Immediate Dedicated Engineering Allocation:</strong> Upon receipt of the 30% deposit, LinkableAI immediately assigns senior AI and full-stack software engineers dedicated to the client's codebase fork, architecture mapping, and API integration.
          </p>
          <p>
            2. <strong>Committed Infrastructure &amp; Sunk Labor Costs:</strong> Dedicated private sandbox servers, database staging environments, and intellectual property access are immediately provisioned and incurred. These computational and senior labor expenditures are irreversible.
          </p>
          <p>
            3. <strong>Complete Client Risk Shield for Remaining 70%:</strong> In exchange, the client is 100% shielded against financial risk. The remaining <strong>70% of the total contract is NEVER due</strong> unless the client has personally tested, verified, and signed off on the custom modifications (Give 2) and live production deployment (Give 3).
          </p>
        </div>
        <p class="text-[11px] text-slate-400 font-sans">
          *If the client selects the 100% Upfront Payment option (instead of 3-Gives), standard 30-day delivery defect remedy and satisfaction warranty terms apply.
        </p>
      </div>

    </div>

    <div class="flex justify-end gap-3 pt-6 border-t border-slate-800 mt-6">
      <button class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all text-xs font-mono cursor-pointer" onclick="closeModal('terms-modal')">
        I Understand &amp; Agree
      </button>
    </div>

  </div>
</div>
`;

// Insert the Terms Modal
html = html.replace('<!-- CLIENT CO-DESIGN & FEASIBILITY FEEDBACK SURVEY MODAL -->', `${termsModal}\n<!-- CLIENT CO-DESIGN & FEASIBILITY FEEDBACK SURVEY MODAL -->`);


// =========================================================================
// 3. UPDATE PAYMONGO CHECKOUT MODAL WITH 3-GIVES / FULL UPFRONT SELECTOR
// =========================================================================
const paymentScheduleSelector = `
    <!-- PAYMENT SCHEDULE SELECTION (FULL UPFRONT vs 3-GIVES MILESTONE) -->
    <div class="mb-4 p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/40 relative z-10 font-mono text-xs">
      <div class="text-[10px] text-indigo-400 uppercase tracking-widest mb-2 font-bold flex items-center justify-between">
        <span>CHOOSE PAYMENT STRUCTURE:</span>
        <span class="text-emerald-400">100% FREE MODIFICATIONS INCLUDED</span>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <label class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 cursor-pointer hover:border-blue-500/60 transition-all" id="pay-opt-3gives-label">
          <input type="radio" name="payment_structure_opt" value="3gives" checked onchange="handlePaymentStructureChange('3gives')" class="accent-blue-500" />
          <div>
            <div class="font-bold text-white text-[11px]">3-Gives Escrow (30%)</div>
            <div class="text-[9px] text-emerald-400">Pay 30% Deposit Now</div>
          </div>
        </label>
        <label class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 cursor-pointer hover:border-blue-500/60 transition-all" id="pay-opt-full-label">
          <input type="radio" name="payment_structure_opt" value="full" onchange="handlePaymentStructureChange('full')" class="accent-blue-500" />
          <div>
            <div class="font-bold text-white text-[11px]">100% Full Upfront</div>
            <div class="text-[9px] text-slate-400">Instant Full Codebase IP</div>
          </div>
        </label>
      </div>
    </div>
`;

// Insert the payment schedule selector right above the payment tabs
html = html.replace('<!-- PAYMENT CHANNEL SELECTOR TABS -->', `${paymentScheduleSelector}\n    <!-- PAYMENT CHANNEL SELECTOR TABS -->`);


// =========================================================================
// 4. JS HANDLERS FOR 3-GIVES PAYMENT CALCULATION & TERMS MODAL
// =========================================================================
const newJsHandlers = `
    // Terms & Conditions Modal Handlers
    function openTermsModal() {
      document.getElementById('terms-modal').classList.remove('hidden');
    }

    // 3-Gives vs Full Upfront Dynamic Payment Calculator
    let currentPaymentStructure = '3gives';

    function handlePaymentStructureChange(structure) {
      currentPaymentStructure = structure;
      updateCheckoutAmounts();
    }

    function updateCheckoutAmounts() {
      const phpDisplay = document.getElementById('paymongo-amount-php');
      const usdDisplay = document.getElementById('paymongo-amount-usd');
      const titleDisplay = document.getElementById('paymongo-plan-title');

      if (!currentSelectedPlan) return;

      if (currentPaymentStructure === '3gives') {
        const depositPhp = Math.round(currentSelectedPlan.php * 0.30);
        const depositUsd = Math.round(currentSelectedPlan.usd * 0.30);
        phpDisplay.innerText = \`₱\${depositPhp.toLocaleString()} PHP (30% 1st Give)\`;
        usdDisplay.innerText = \`$\${depositUsd.toLocaleString()} USD Deposit\`;
        titleDisplay.innerText = \`\${currentSelectedPlan.name} [3-Gives 30% Deposit]\`;
      } else {
        phpDisplay.innerText = \`₱\${currentSelectedPlan.php.toLocaleString()} PHP\`;
        usdDisplay.innerText = \`$\${currentSelectedPlan.usd.toLocaleString()} USD\`;
        titleDisplay.innerText = \`\${currentSelectedPlan.name} [Full Upfront]\`;
      }
    }
`;

// Insert JS handlers into script
html = html.replace('function openPayMongoCheckout(planName, priceUsd, pricePhp) {', `${newJsHandlers}\n\n    function openPayMongoCheckout(planName, priceUsd, pricePhp) {\n      currentPaymentStructure = '3gives';\n      const radio3Gives = document.querySelector('input[value="3gives"]');\n      if (radio3Gives) radio3Gives.checked = true;\n`);
html = html.replace("document.getElementById('paymongo-amount-php').innerText = `₱${pricePhp.toLocaleString()} PHP`;", "updateCheckoutAmounts();");
html = html.replace("document.getElementById('paymongo-amount-usd').innerText = `$${priceUsd.toLocaleString()} USD`;", "");
html = html.replace("document.getElementById('paymongo-plan-title').innerText = `${planName} Deposit`;", "");

// Update footer with direct terms link
html = html.replace('<div class="text-on-surface-variant text-xs">', `<div class="text-on-surface-variant text-xs flex flex-wrap items-center gap-3">\n        <button onclick="openTermsModal()" class="text-cyan-400 hover:underline font-bold">Enterprise Terms &amp; 3-Gives Policy</button>\n        <span>•</span>`);

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(copyPath, html, 'utf8');

console.log('✅ 100% SUCCESS: Injected Free Modification & 3-Gives Trust Banner, Terms Modal with 30% Retainer Rationale, and Dynamic 3-Gives Checkout Selector!');
