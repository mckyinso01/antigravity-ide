const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const copyPath = path.join(__dirname, 'gatzdevs-cinematic', '200.html');

let html = fs.readFileSync(indexPath, 'utf8');

// =========================================================================
// 1. FLOATING AI ENTERPRISE CONSULTANT BOT HTML WIDGET
// =========================================================================
const aiBotWidgetHtml = `
<!-- ========================================================================= -->
<!-- FLOATING AI ENTERPRISE CONSULTANT & SPECIALIST BOT WIDGET -->
<!-- ========================================================================= -->
<div class="fixed bottom-6 right-6 z-50 font-mono" id="ai-consultant-container">
  
  <!-- Floating Launcher Button -->
  <button id="ai-bot-launcher" onclick="toggleAiConsultant()" class="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all flex items-center gap-3 cursor-pointer border border-cyan-400/40 group">
    <div class="relative flex items-center justify-center">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
    </div>
    <span class="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">smart_toy</span>
    <div class="text-left font-sans">
      <div class="text-[10px] uppercase font-mono tracking-widest text-cyan-200 leading-none">AI SPECIALIST</div>
      <div class="text-xs font-extrabold text-white leading-tight">Ask Architecture &amp; Licensing</div>
    </div>
  </button>

  <!-- Expanded AI Consultant Chat Drawer / Modal -->
  <div id="ai-bot-window" class="hidden absolute bottom-16 right-0 w-[92vw] sm:w-[440px] h-[600px] max-h-[82vh] bg-slate-950/95 backdrop-blur-2xl border border-blue-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950">
    
    <!-- Bot Header -->
    <div class="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
      <div class="flex items-center gap-2.5">
        <div class="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-accent-cyan">
          <span class="material-symbols-outlined text-xl">smart_toy</span>
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-bold text-white">LinkableAI Consultant</span>
            <span class="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30">ONLINE</span>
          </div>
          <p class="text-[10px] text-slate-400 font-sans">Autonomous Advisor • Founder Mharc Gatan AI</p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button onclick="clearAiChat()" title="Clear Chat" class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all text-xs">
          <span class="material-symbols-outlined text-base">restart_alt</span>
        </button>
        <button onclick="toggleAiConsultant()" title="Close" class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all">
          <span class="material-symbols-outlined text-base">close</span>
        </button>
      </div>
    </div>

    <!-- Chat Messages Stream Container -->
    <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-sans">
      <!-- Default Welcome Message from Bot -->
      <div class="flex gap-2.5 items-start">
        <div class="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-sm">smart_toy</span>
        </div>
        <div class="p-3.5 rounded-2xl rounded-tl-none bg-slate-900/90 border border-slate-800 text-slate-200 space-y-2 leading-relaxed max-w-[85%] shadow-md">
          <p>
            Hello! I am your <strong>LinkableAI Enterprise Consultant</strong>. I can assist you with:
          </p>
          <ul class="space-y-1 font-mono text-[11px] text-cyan-300">
            <li>• <strong>White-Label vs Tier 3 Resale Rights</strong></li>
            <li>• <strong>100% Free Custom Modifications</strong></li>
            <li>• <strong>3-Gives Milestone Escrow Schedule</strong></li>
            <li>• <strong>5/10th Pricing vs Legacy Giants</strong></li>
          </ul>
          <p class="text-[11px] text-slate-400">
            What would you like to explore today?
          </p>
        </div>
      </div>
    </div>

    <!-- Suggested Quick Question Chips -->
    <div class="p-2.5 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-1.5 shrink-0 scrollbar-none font-mono text-[10px]">
      <button onclick="handleQuickPrompt('Can I white-label or resell this software to my clients?')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
        🏷️ White-Label &amp; Resale Rights?
      </button>
      <button onclick="handleQuickPrompt('How does the 100% Free Custom Modification work?')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
        🛠️ 100% Free Custom Modifications?
      </button>
      <button onclick="handleQuickPrompt('Explain the 3-Gives Payment Schedule (30%/35%/35%)')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
        💳 3-Gives Milestone Escrow?
      </button>
      <button onclick="handleQuickPrompt('Compare pricing against Epic / Procore / Manhattan')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
        ⚖️ 5/10th Pricing vs Tech Giants?
      </button>
      <button onclick="handleQuickPrompt('How can I contact Founder Mharc Gatan?')" class="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 transition-all shrink-0 cursor-pointer">
        📞 Contact Founder Mharc Gatan
      </button>
    </div>

    <!-- Chat Input Form -->
    <form onsubmit="handleAiChatSubmit(event)" class="p-3 bg-slate-900 border-t border-slate-800 flex gap-2 shrink-0">
      <input type="text" id="ai-chat-input" placeholder="Ask about licensing, custom mods, or demos..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none font-sans" required />
      <button type="submit" class="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-xs hover:opacity-90 flex items-center justify-center cursor-pointer shadow-md">
        <span class="material-symbols-outlined text-sm">send</span>
      </button>
    </form>

  </div>
</div>
`;

// Insert the AI Bot HTML right before </body>
html = html.replace('</body>', `${aiBotWidgetHtml}\n</body>`);

// =========================================================================
// 2. BOT INTELLIGENCE & KNOWLEDGE BASE LOGIC
// =========================================================================
const aiBotLogicJs = `
    // =========================================================================
    // LINKABLEAI AUTONOMOUS ENTERPRISE CONSULTANT BOT ENGINE
    // =========================================================================
    let isAiBotOpen = false;

    function toggleAiConsultant() {
      const win = document.getElementById('ai-bot-window');
      isAiBotOpen = !isAiBotOpen;
      if (isAiBotOpen) {
        win.classList.remove('hidden');
        document.getElementById('ai-chat-input').focus();
      } else {
        win.classList.add('hidden');
      }
    }

    // Direct trigger handler used by the "Tour with AI Demo Specialist" buttons
    window.triggerLinkableDemo = function(appType) {
      if (!isAiBotOpen) toggleAiConsultant();
      
      const appMap = {
        clinical: {
          name: "Clinical Pristine ICU OS",
          intro: "Welcome to the **Clinical Pristine ICU OS** AI Architecture Tour! This platform eliminates bedside medication dosage errors with real-time waveform telemetry and barcoded 5-Rights eMAR verification. Would you like a demo breakdown, 5/10th pricing comparison vs Epic Systems, or to discuss free custom integrations for your hospital?"
        },
        construction: {
          name: "SiteSafe StructuraPro",
          intro: "Welcome to the **SiteSafe StructuraPro** AI Architecture Tour! This engineering OS eliminates liquidated damages with dynamic Critical Path Method (CPM) Gantt schedules and automated NOAA weather claim generation. Would you like to review custom ERP integrations or our 3-Gives milestone payment schedule?"
        },
        warehouse: {
          name: "OmniStock Spatial WMS",
          intro: "Welcome to the **OmniStock Spatial WMS** AI Architecture Tour! This supply chain engine provides a real-time WebGL 3D Voxel warehouse digital twin and strict FEFO expiration quarantine. Would you like to see how we integrate with your existing barcode hardware or our 50% cost savings vs Manhattan Associates?"
        },
        saccade: {
          name: "Saccade-UI Biometric CRO",
          intro: "Welcome to the **Saccade-UI Biometric CRO** AI Architecture Tour! Powered by biological Itti-Koch attention algorithms, it simulates user gaze flow in under 50ms without physical eye-tracking labs. Are you looking to white-label this for client CRO audits or acquire full sovereign source code?"
        }
      };

      const selected = appMap[appType] || { name: "LinkableAI Platform", intro: "Welcome to LinkableAI! How can I assist you with our enterprise software suites today?" };
      
      appendAiBotMessage(selected.intro);
    };

    function clearAiChat() {
      const container = document.getElementById('ai-chat-messages');
      container.innerHTML = \`
        <div class="flex gap-2.5 items-start">
          <div class="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
            <span class="material-symbols-outlined text-sm">smart_toy</span>
          </div>
          <div class="p-3.5 rounded-2xl rounded-tl-none bg-slate-900/90 border border-slate-800 text-slate-200 space-y-2 leading-relaxed max-w-[85%] shadow-md">
            <p>Chat cleared. How can I help you regarding our <strong>3 Perpetual Licensing Tiers</strong>, <strong>100% Free Custom Modifications</strong>, or <strong>3-Gives Payment Schedule</strong>?</p>
          </div>
        </div>
      \`;
    }

    function handleQuickPrompt(promptText) {
      document.getElementById('ai-chat-input').value = promptText;
      handleAiChatSubmit(new Event('submit'));
    }

    function handleAiChatSubmit(e) {
      if (e) e.preventDefault();
      const input = document.getElementById('ai-chat-input');
      const text = input.value.trim();
      if (!text) return;

      appendUserMessage(text);
      input.value = '';

      // Simulate intelligent sub-second AI deliberation
      showAiTypingIndicator();
      setTimeout(() => {
        removeAiTypingIndicator();
        const response = generateAiBotResponse(text);
        appendAiBotMessage(response);
      }, 600);
    }

    function appendUserMessage(text) {
      const container = document.getElementById('ai-chat-messages');
      const msgDiv = document.createElement('div');
      msgDiv.className = 'flex justify-end';
      msgDiv.innerHTML = \`
        <div class="p-3 rounded-2xl rounded-tr-none bg-blue-600 text-white font-sans text-xs max-w-[85%] shadow-md leading-relaxed">
          \${escapeHtml(text)}
        </div>
      \`;
      container.appendChild(msgDiv);
      container.scrollTop = container.scrollHeight;
    }

    function appendAiBotMessage(htmlContent) {
      const container = document.getElementById('ai-chat-messages');
      const msgDiv = document.createElement('div');
      msgDiv.className = 'flex gap-2.5 items-start';
      msgDiv.innerHTML = \`
        <div class="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-sm">smart_toy</span>
        </div>
        <div class="p-3.5 rounded-2xl rounded-tl-none bg-slate-900/90 border border-slate-800 text-slate-200 space-y-2 leading-relaxed max-w-[85%] shadow-md font-sans text-xs">
          \${htmlContent}
        </div>
      \`;
      container.appendChild(msgDiv);
      container.scrollTop = container.scrollHeight;
    }

    function showAiTypingIndicator() {
      const container = document.getElementById('ai-chat-messages');
      const typingDiv = document.createElement('div');
      typingDiv.id = 'ai-typing-indicator';
      typingDiv.className = 'flex gap-2.5 items-start';
      typingDiv.innerHTML = \`
        <div class="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-sm">smart_toy</span>
        </div>
        <div class="p-3 rounded-2xl rounded-tl-none bg-slate-900/90 border border-slate-800 text-slate-400 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
        </div>
      \`;
      container.appendChild(typingDiv);
      container.scrollTop = container.scrollHeight;
    }

    function removeAiTypingIndicator() {
      const indicator = document.getElementById('ai-typing-indicator');
      if (indicator) indicator.remove();
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.innerText = text;
      return div.innerHTML;
    }

    // =========================================================================
    // COMPREHENSIVE ENTERPRISE KNOWLEDGE BASE & INTENT MATCHER
    // =========================================================================
    function generateAiBotResponse(query) {
      const q = query.toLowerCase();

      // 1. White-Label vs Tier 3 Sovereign Buyout (Modification & Resale Rights)
      if (q.includes('white label') || q.includes('resell') || q.includes('modify') || q.includes('source code') || q.includes('ip buyout') || q.includes('tier 3')) {
        return \`
          <div class="space-y-2">
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
            <button onclick="openPayMongoCheckout('Tier 3 Sovereign Full Source Buyout', 38000, 2128000)" class="w-full py-2 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg font-bold font-mono text-[11px] hover:opacity-90 mt-1 cursor-pointer">
              Explore Tier 3 Sovereign IP Buyout ↗
            </button>
          </div>
        \`;
      }

      // 2. 100% Free Custom Modification Guarantee
      if (q.includes('free modification') || q.includes('custom') || q.includes('modify') || q.includes('setup') || q.includes('integration') || q.includes('api')) {
        return \`
          <div class="space-y-2">
            <div class="font-bold text-emerald-400 font-mono text-[11px] uppercase">🛠️ 100% Free Custom Modification System:</div>
            <p>
              Yes! LinkableAI guarantees that <strong>all custom modifications, API integrations, and database schema mappings are completed at ZERO additional charge (₱0 / $0)</strong>.
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• We connect to your existing SQL, ERP, PACS, or APIs.</li>
              <li>• We tailor workflows until 100% fulfilled.</li>
              <li>• Zero scope creep fees or hourly billing penalties.</li>
            </ul>
            <button onclick="openCoDesignSurvey('Enterprise Custom Modification')" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold font-mono text-[11px] transition-all cursor-pointer">
              Submit Your Custom Modification Specs ↗
            </button>
          </div>
        \`;
      }

      // 3. 3-Gives Payment Schedule & Refund Policy
      if (q.includes('3 gives') || q.includes('give') || q.includes('payment') || q.includes('installment') || q.includes('refund') || q.includes('escrow') || q.includes('deposit')) {
        return \`
          <div class="space-y-2">
            <div class="font-bold text-blue-300 font-mono text-[11px] uppercase">💳 The 3-Gives Milestone Escrow Schedule:</div>
            <div class="space-y-1.5 font-mono text-[11px]">
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <strong class="text-cyan-400">1st Give (30% Deposit):</strong> Activates dedicated senior engineers and private isolated cloud fork.
              </div>
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <strong class="text-teal-400">2nd Give (35% Modification Sign-Off):</strong> Paid ONLY after you test and approve all custom features in staging.
              </div>
              <div class="p-2 rounded bg-slate-950 border border-slate-800">
                <strong class="text-emerald-400">3rd Give (35% Live Production):</strong> Paid ONLY when the system is 100% live and operational with your staff.
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

      // 4. 5/10th Pricing vs Legacy Tech Giants
      if (q.includes('pricing') || q.includes('cost') || q.includes('epic') || q.includes('procore') || q.includes('manhattan') || q.includes('tobii') || q.includes('discount') || q.includes('5/10')) {
        return \`
          <div class="space-y-2">
            <div class="font-bold text-accent-cyan font-mono text-[11px] uppercase">⚖️ 5/10th Pricing Disruption Economics:</div>
            <p>
              LinkableAI prices all platforms at exactly <strong>50% (5/10th) of legacy enterprise giants</strong> with zero monthly subscription taxes:
            </p>
            <ul class="space-y-1 text-[11px] text-slate-300 font-mono">
              <li>• <strong>Clinical ICU OS:</strong> $48.5k (vs Epic $500k+ &amp; $45k/yr)</li>
              <li>• <strong>SiteSafe StructuraPro:</strong> $24.5k (vs Procore $65k/yr)</li>
              <li>• <strong>OmniStock WMS:</strong> $38.5k (vs Manhattan $250k+)</li>
              <li>• <strong>Saccade CRO:</strong> $9.5k (vs Tobii $35k/yr)</li>
            </ul>
            <p class="text-[11px] text-emerald-400 font-bold">
              100% Perpetual Ownership • No Per-Seat Tax.
            </p>
          </div>
        \`;
      }

      // 5. Contact Founder Mharc Gatan
      if (q.includes('contact') || q.includes('mharc') || q.includes('founder') || q.includes('call') || q.includes('meeting') || q.includes('email') || q.includes('phone')) {
        return \`
          <div class="space-y-2">
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
        <div class="space-y-2">
          <p>
            Thank you for asking! LinkableAI offers 4 flagship enterprise software platforms with <strong>100% Perpetual Licensing</strong>, <strong>100% Free Custom Modifications</strong>, and a <strong>3-Gives Milestone Escrow Schedule</strong>.
          </p>
          <p class="text-[11px] text-slate-300">
            Would you like to test drive a live sandbox, check our 5/10th pricing study vs legacy giants, or discuss custom API integrations for your organization?
          </p>
          <div class="flex flex-wrap gap-1.5 pt-1">
            <button onclick="openCoDesignSurvey('Custom Deployment')" class="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px]">Request Custom Specs</button>
            <button onclick="openTermsModal()" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px]">Read 3-Gives Terms</button>
          </div>
        </div>
      \`;
    }
`;

// Insert the AI Bot Engine JS into the script section
html = html.replace('</script>', `${aiBotLogicJs}\n</script>`);

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(copyPath, html, 'utf8');

console.log('✅ 100% SUCCESS: Injected Autonomous AI Enterprise Consultant Bot into linkable.it.com with full White-Label vs Tier 3 Resale knowledge, 100% Free Modifications, and 3-Gives Escrow intelligence!');
