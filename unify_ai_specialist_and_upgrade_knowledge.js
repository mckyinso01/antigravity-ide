const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');
const linkableDemoSpecialistJs = path.join(__dirname, 'gatzdevs-cinematic', 'assets', 'LinkableDemoSpecialist.js');

// 1. Update LinkableDemoSpecialist.js to avoid duplicate floating button injection
if (fs.existsSync(linkableDemoSpecialistJs)) {
  let jsContent = fs.readFileSync(linkableDemoSpecialistJs, 'utf8');
  
  // Add ClaimGuard to product context
  if (!jsContent.includes("productContext = 'claimguard'")) {
    jsContent = jsContent.replace(
      "if (hostDomain.includes('clinical') || currentPath.includes('clinical')) {",
      "if (hostDomain.includes('claimguard') || currentPath.includes('claimguard')) {\n    productContext = 'claimguard';\n    productTitle = 'ClaimGuard AI • Statutory Claims & ERISA OS';\n    badgeColor = '#00E5FF';\n  } else if (hostDomain.includes('clinical') || currentPath.includes('clinical')) {"
    );
  }

  // Prevent duplicate floating trigger button if host already has #ai-bot-launcher or #ai-consultant-container
  const renderFloatingBtnSnippet = `  function renderFloatingWidget() {`;
  if (jsContent.includes(renderFloatingBtnSnippet)) {
    jsContent = jsContent.replace(
      renderFloatingBtnSnippet,
      `  function renderFloatingWidget() {\n    if (document.getElementById('ai-consultant-container') || document.getElementById('ai-bot-launcher')) {\n      console.log('⚡ Unified AI Consultant Container detected in host DOM. Skipping duplicate floating button.');\n      return;\n    }`
    );
  }

  fs.writeFileSync(linkableDemoSpecialistJs, jsContent, 'utf8');
  console.log('✅ Upgraded LinkableDemoSpecialist.js with ClaimGuard support and duplicate button prevention.');
}

// 2. Upgrade generateAiBotResponse with comprehensive 5-App deep technical intelligence
let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

const newAiBotResponseEngine = `
    function generateAiBotResponse(query) {
      const q = query.toLowerCase();

      // 1. ClaimGuard AI (Claims Defense & Moot Court)
      if (q.includes('claimguard') || q.includes('claim') || q.includes('erisa') || q.includes('denial') || q.includes('moot court') || q.includes('insurance') || q.includes('prompt pay') || q.includes('rcm')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-cyan-400 font-mono text-[11px] uppercase flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>🛡️ ClaimGuard AI • Legal &amp; Claims Defense OS:</span>
            </div>
            <p>
              ClaimGuard AI eradicates the <strong>4%–12% revenue-share holdap</strong> taken by legacy RCM monopolies (Waystar, Optum) with automated legal statutory claims defense:
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• <strong>Autonomous Dual Moot Court AI:</strong> Simulates adversarial Judge &amp; Defense panels to stress-test claims before submission.</li>
              <li>• <strong>ERISA §503 &amp; Prompt Pay Claims:</strong> Auto-cites insurance commissioner statutory interest penalties.</li>
              <li>• <strong>0% Rev-Share Extortion:</strong> Hospitals keep 100% of collected revenue.</li>
            </ul>
            <div class="flex gap-2 pt-1">
              <button onclick="openLiveAppDrawer('claimguard')" class="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-[10px] font-bold cursor-pointer">
                Test Drive ClaimGuard Live ↗
              </button>
              <button onclick="openCoDesignSurvey('ClaimGuard AI')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] cursor-pointer">
                Request RCM Integration
              </button>
            </div>
          </div>
        \`;
      }

      // 2. Clinical Pristine ICU OS
      if (q.includes('clinical') || q.includes('icu') || q.includes('emar') || q.includes('hospital') || q.includes('patient') || q.includes('vital') || q.includes('ehr') || q.includes('epic') || q.includes('nurse')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-indigo-400 font-mono text-[11px] uppercase flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
              <span>🏥 Clinical Pristine ICU OS:</span>
            </div>
            <p>
              Engineered to eliminate bedside medication errors and 4,000-click EHR fatigue with sub-second reactive ergonomics:
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• <strong>5-Rights Barcode eMAR:</strong> Patient, Drug, Dose, Route, Time verification.</li>
              <li>• <strong>Dual-Nurse Digital Co-Sign:</strong> Cryptographic witness gate for high-risk paralytics &amp; vasopressors.</li>
              <li>• <strong>HL7 FHIR R4 Bridge:</strong> Seamless 2-way sync with existing hospital PACS &amp; EHR.</li>
            </ul>
            <div class="flex gap-2 pt-1">
              <button onclick="openLiveAppDrawer('clinical')" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] font-bold cursor-pointer">
                Test Drive Clinical Live ↗
              </button>
              <button onclick="openCoDesignSurvey('Clinical Pristine OS')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] cursor-pointer">
                Custom Hospital Specs
              </button>
            </div>
          </div>
        \`;
      }

      // 3. SiteSafe StructuraPro (Construction CPM & NOAA)
      if (q.includes('sitesafe') || q.includes('construction') || q.includes('cpm') || q.includes('gantt') || q.includes('noaa') || q.includes('weather') || q.includes('procore') || q.includes('delay') || q.includes('g702')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-blue-400 font-mono text-[11px] uppercase flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>🏗️ SiteSafe StructuraPro CPM OS:</span>
            </div>
            <p>
              Protects General Contractors from <strong>$35k/day liquidated damage penalties</strong> with real-time critical path physics and weather dispute claims:
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• <strong>Real-Time CPM Float Engine:</strong> Instant recalculation of critical path schedules.</li>
              <li>• <strong>Certified NOAA Weather Claims:</strong> Automated precipitation and wind dispute packages.</li>
              <li>• <strong>AIA G702 / G703 Billing:</strong> Automated progress billing &amp; sub-tier lien waivers.</li>
            </ul>
            <div class="flex gap-2 pt-1">
              <button onclick="openLiveAppDrawer('sitesafe')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] font-bold cursor-pointer">
                Test Drive SiteSafe Live ↗
              </button>
              <button onclick="openCoDesignSurvey('SiteSafe StructuraPro')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] cursor-pointer">
                Custom GC Integration
              </button>
            </div>
          </div>
        \`;
      }

      // 4. OmniStock Enterprise 3D WMS
      if (q.includes('omnistock') || q.includes('warehouse') || q.includes('wms') || q.includes('3d') || q.includes('voxel') || q.includes('fefo') || q.includes('inventory') || q.includes('manhattan') || q.includes('stock')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-emerald-400 font-mono text-[11px] uppercase flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>📦 OmniStock Enterprise 3D Spatial WMS:</span>
            </div>
            <p>
              Eradicates warehouse blindspots and perishable spoilage with a real-time WebGL digital twin:
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• <strong>Three.js 3D Voxel Twin:</strong> Interactive spatial visualization of warehouse bays &amp; racks.</li>
              <li>• <strong>Strict FEFO Quarantine:</strong> First-Expired-First-Out routing preventing inventory write-offs.</li>
              <li>• <strong>Hardware Agnostic Laser Scans:</strong> Integrates with Zebra, Honeywell, and mobile cameras.</li>
            </ul>
            <div class="flex gap-2 pt-1">
              <button onclick="openLiveAppDrawer('omnistock')" class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold cursor-pointer">
                Test Drive OmniStock Live ↗
              </button>
              <button onclick="openCoDesignSurvey('OmniStock Enterprise')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] cursor-pointer">
                3PL Integration Specs
              </button>
            </div>
          </div>
        \`;
      }

      // 5. Saccade-UI Biometric CRO AI
      if (q.includes('saccade') || q.includes('cro') || q.includes('gaze') || q.includes('eye') || q.includes('tracking') || q.includes('attention') || q.includes('biometric') || q.includes('tobii') || q.includes('adtech')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-rose-400 font-mono text-[11px] uppercase flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>👁️ Saccade-UI Biometric CRO Evaluator:</span>
            </div>
            <p>
              Simulates biological human gaze and attention in &lt; 50ms without physical $35k eye-tracking hardware:
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• <strong>1-2-3-4 Saccadic Sequence:</strong> Maps the exact path human eyes scan across your UI.</li>
              <li>• <strong>Itti-Koch Biological Saliency:</strong> Predicts high-contrast fixation points before ad spend.</li>
              <li>• <strong>Cognitive Load Score:</strong> Quantifies visual clutter and conversion friction automatically.</li>
            </ul>
            <div class="flex gap-2 pt-1">
              <button onclick="openLiveAppDrawer('saccade')" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-[10px] font-bold cursor-pointer">
                Test Drive Saccade Live ↗
              </button>
              <button onclick="openCoDesignSurvey('Saccade-UI Evaluator')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] cursor-pointer">
                White-Label for Agency
              </button>
            </div>
          </div>
        \`;
      }

      // 6. White-Label vs Tier 3 Sovereign Buyout (Modification & Resale Rights)
      if (q.includes('white label') || q.includes('white-label') || q.includes('resell') || q.includes('resale') || q.includes('modify') || q.includes('source code') || q.includes('ip buyout') || q.includes('tier 3')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-cyan-300 font-mono text-[11px] uppercase">⚖️ White-Label vs. Tier 3 Sovereign Buyout:</div>
            <p>
              • <strong>Tier 2 White-Label (Enterprise Cluster):</strong> Allows your firm or agency to put your <strong>own logo, branding, and custom domain</strong> to serve your own clients under your brand. However, you do not own the core Git repository.
            </p>
            <p>
              • <strong>Tier 3 Sovereign Full Source Code &amp; IP Buyout:</strong> <strong>This is the tier that allows you to modify the entire codebase and resell it as your own software!</strong>
            </p>
            <div class="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-[11px] font-mono text-amber-300 space-y-1">
              <div>✓ 100% Full Git Repository Ownership</div>
              <div>✓ Full Rights to Modify, Rebrand &amp; Resell to Clients</div>
              <div>✓ 100% Sovereign On-Premise Hosting</div>
              <div>✓ 0% Royalties or Licensing Cuts Forever</div>
            </div>
            <button onclick="openPayMongoCheckout('Tier 3 Sovereign Full Source Buyout', 165000, 9240000)" class="w-full py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg font-bold font-mono text-[11px] hover:opacity-90 mt-1 cursor-pointer">
              Explore Tier 3 Sovereign IP Buyout ($165k) ↗
            </button>
          </div>
        \`;
      }

      // 7. 100% Free Custom Modification Guarantee
      if (q.includes('free modification') || q.includes('custom') || q.includes('modify') || q.includes('setup') || q.includes('integration') || q.includes('api')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-emerald-400 font-mono text-[11px] uppercase">🛠️ 100% Free Custom Modification System:</div>
            <p>
              Yes! LinkableAI guarantees that <strong>all custom modifications, API integrations, and database schema mappings are completed at ZERO additional charge (₱0 / $0)</strong>.
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• We connect directly to your existing SQL, ERP, PACS, or APIs.</li>
              <li>• We tailor workflows until 100% fulfilled.</li>
              <li>• Zero scope creep fees or hourly billing penalties.</li>
            </ul>
            <button onclick="openCoDesignSurvey('Enterprise Custom Modification')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold font-mono text-[11px] transition-all cursor-pointer">
              Submit Your Custom Modification Specs ↗
            </button>
          </div>
        \`;
      }

      // 8. 3-Gives Payment Schedule & Escrow Policy
      if (q.includes('3 gives') || q.includes('give') || q.includes('payment') || q.includes('installment') || q.includes('refund') || q.includes('escrow') || q.includes('deposit')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-blue-300 font-mono text-[11px] uppercase">💳 The 3-Gives Milestone Escrow Schedule:</div>
            <div class="space-y-1.5 font-mono text-[11px]">
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <strong class="text-cyan-400">1st Give (30% Retainer):</strong> Activates dedicated senior engineers and private cloud fork.
              </div>
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <strong class="text-teal-400">2nd Give (35% Modification Approval):</strong> Paid ONLY after you test and approve all custom features in staging.
              </div>
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <strong class="text-emerald-400">3rd Give (35% Live Launch):</strong> Paid ONLY when the system is 100% live and operational with your staff.
              </div>
            </div>
            <p class="text-[11px] text-slate-400">
              *The initial 30% deposit is non-refundable because dedicated senior labor and cloud infrastructure are immediately incurred, while your remaining 70% is 100% shielded.
            </p>
            <button onclick="openTermsModal()" class="text-cyan-400 hover:underline font-mono text-[11px] block text-center font-bold">
              Read Full 3-Gives Terms &amp; Refund Policy ↗
            </button>
          </div>
        \`;
      }

      // 9. 5/10th Pricing vs Legacy Monopolies
      if (q.includes('pricing') || q.includes('cost') || q.includes('price') || q.includes('tier') || q.includes('discount') || q.includes('5/10')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-accent-cyan font-mono text-[11px] uppercase">⚖️ 5/10th Pricing Disruption Economics:</div>
            <p>
              LinkableAI prices all platforms at exactly <strong>50% (5/10th) of legacy enterprise giants</strong> with zero monthly subscription taxes:
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• <strong>Single Production Deployment:</strong> $48,500 flat (₱2,716,000)</li>
              <li>• <strong>Multi-Tenant Enterprise Cluster:</strong> $88,500 flat (₱4,956,000)</li>
              <li>• <strong>Full Sovereign Source Code Buyout:</strong> $165,000 flat (₱9,240,000)</li>
            </ul>
            <p class="text-[11px] text-emerald-400 font-bold">
              100% Perpetual Ownership • 0% Software Rent.
            </p>
          </div>
        \`;
      }

      // 10. Contact Founder Mharc Gatan
      if (q.includes('contact') || q.includes('mharc') || q.includes('founder') || q.includes('call') || q.includes('meeting') || q.includes('email') || q.includes('phone')) {
        return \`
          <div class="space-y-2 font-sans text-xs">
            <div class="font-bold text-white font-mono text-[11px] uppercase">📞 Direct Founder Engagement:</div>
            <p>
              You can connect directly with Founder &amp; Principal AI Architect <strong>Mharc Gatan</strong>:
            </p>
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
              <div>📧 Email: <a href="mailto:mharcgatan@linkable.it.com" class="text-cyan-400 hover:underline font-bold">mharcgatan@linkable.it.com</a></div>
              <div>⚡ Direct Wire &amp; PayMongo Rails Active</div>
              <div>📍 Manila, PH • Global Cloud Deployments</div>
            </div>
            <button onclick="openContactModal('Direct Founder Inquiry')" class="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold font-mono text-[11px] transition-all cursor-pointer">
              Schedule Architecture Consultation ↗
            </button>
          </div>
        \`;
      }

      // Default Fallback Response
      return \`
        <div class="space-y-2 font-sans text-xs">
          <p>
            Thank you for asking! LinkableAI offers 5 flagship sovereign software platforms:
          </p>
          <ul class="space-y-1 font-mono text-[11px] text-cyan-300">
            <li>• <strong>Clinical Pristine ICU OS</strong> (5-Rights eMAR &amp; Waveforms)</li>
            <li>• <strong>ClaimGuard AI</strong> (Claims Defense &amp; Moot Court)</li>
            <li>• <strong>SiteSafe StructuraPro</strong> (CPM Gantt &amp; NOAA Claims)</li>
            <li>• <strong>OmniStock Enterprise</strong> (3D Spatial WMS &amp; FEFO)</li>
            <li>• <strong>Saccade-UI Evaluator</strong> (Biometric CRO AI)</li>
          </ul>
          <p class="text-[11px] text-slate-400">
            Which system or licensing tier would you like to explore?
          </p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            <button onclick="handleQuickPrompt('Tell me about ClaimGuard AI')" class="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-200 font-mono text-[10px]">ClaimGuard AI</button>
            <button onclick="handleQuickPrompt('Tell me about Clinical Pristine')" class="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-200 font-mono text-[10px]">Clinical ICU</button>
            <button onclick="handleQuickPrompt('Tell me about SiteSafe StructuraPro')" class="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-200 font-mono text-[10px]">SiteSafe CPM</button>
            <button onclick="handleQuickPrompt('Tell me about OmniStock')" class="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-200 font-mono text-[10px]">OmniStock 3D</button>
            <button onclick="handleQuickPrompt('Tell me about Saccade-UI')" class="px-2 py-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-200 font-mono text-[10px]">Saccade CRO</button>
          </div>
        </div>
      \`;
    }
`;

const oldResponseEnginePattern = /function generateAiBotResponse\(query\) \{[\s\S]*?return `[\s\S]*?`;\s*\}/;

if (oldResponseEnginePattern.test(html)) {
  html = html.replace(oldResponseEnginePattern, newAiBotResponseEngine.trim());
  console.log('✅ Replaced generateAiBotResponse with 5-App Deep Domain Intelligence!');
}

// 3. Update quick prompt chips in the modal header
const oldChips = `<div
        class="p-2.5 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-1.5 shrink-0 scrollbar-none font-mono text-[10px]">
        <button onclick="handleQuickPrompt('Can I white-label or resell this software to my clients?')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          🏷️ White-Label &amp; Resale Rights?
        </button>
        <button onclick="handleQuickPrompt('How does the 100% Free Custom Modification work?')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          🛠️ 100% Free Custom Modifications?
        </button>
        <button onclick="handleQuickPrompt('Explain the 3-Gives Payment Schedule (30%/35%/35%)')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          💳 3-Gives Milestone Escrow?
        </button>
        <button onclick="handleQuickPrompt('Compare pricing against Epic / Procore / Manhattan')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          ⚖️ 5/10th Pricing vs Tech Giants?
        </button>
        <button onclick="handleQuickPrompt('How can I contact Founder Mharc Gatan?')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          📞 Contact Founder Mharc Gatan
        </button>
      </div>`;

const newChips = `<div
        class="p-2.5 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-1.5 shrink-0 scrollbar-none font-mono text-[10px]">
        <button onclick="handleQuickPrompt('Tell me about ClaimGuard AI legal claims defense')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          🛡️ ClaimGuard AI
        </button>
        <button onclick="handleQuickPrompt('Tell me about Clinical Pristine ICU OS')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          🏥 Clinical ICU
        </button>
        <button onclick="handleQuickPrompt('Tell me about SiteSafe StructuraPro CPM')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          🏗️ SiteSafe CPM
        </button>
        <button onclick="handleQuickPrompt('Tell me about OmniStock Enterprise 3D WMS')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          📦 OmniStock 3D
        </button>
        <button onclick="handleQuickPrompt('Tell me about Saccade-UI Biometric CRO')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-rose-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          👁️ Saccade CRO
        </button>
        <button onclick="handleQuickPrompt('Explain 5/10th Pricing and 3-Gives Escrow')"
          class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
          ⚖️ 5/10th Pricing &amp; 3-Gives Escrow
        </button>
      </div>`;

if (html.includes(oldChips)) {
  html = html.replace(oldChips, newChips);
  console.log('✅ Updated quick prompt chips with all 5 apps!');
}

// 4. Synchronize all 4 master files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% COMPLETE: AI Demo Chatbot fully trained across all 5 Apps and duplicate button eliminated!');
