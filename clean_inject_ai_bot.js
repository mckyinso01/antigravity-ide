const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const copyPath = path.join(__dirname, 'gatzdevs-cinematic', '200.html');

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Remove any misplaced bot script inside head or elsewhere
html = html.replace(/\/\/ =========================================================================\r?\n\s*\/\/ LINKABLEAI AUTONOMOUS ENTERPRISE CONSULTANT BOT ENGINE[\s\S]*?<\/script>/, '</script>');

// 2. Define the clean, robust AI Bot Script Block
const cleanAiBotScript = `
  <!-- LINKABLEAI AUTONOMOUS ENTERPRISE CONSULTANT BOT ENGINE -->
  <script>
    let isAiBotOpen = false;

    function toggleAiConsultant() {
      const win = document.getElementById('ai-bot-window');
      if (!win) return;
      isAiBotOpen = !isAiBotOpen;
      if (isAiBotOpen) {
        win.classList.remove('hidden');
        const input = document.getElementById('ai-chat-input');
        if (input) input.focus();
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
          intro: "Welcome to the <strong>Clinical Pristine ICU OS</strong> AI Architecture Tour! This platform eliminates bedside medication dosage errors with real-time waveform telemetry and barcoded 5-Rights eMAR verification. Would you like a demo breakdown, 5/10th pricing comparison vs Epic Systems, or to discuss free custom integrations for your hospital?"
        },
        construction: {
          name: "SiteSafe StructuraPro",
          intro: "Welcome to the <strong>SiteSafe StructuraPro</strong> AI Architecture Tour! This engineering OS eliminates liquidated damages with dynamic Critical Path Method (CPM) Gantt schedules and automated NOAA weather claim generation. Would you like to review custom ERP integrations or our 3-Gives milestone payment schedule?"
        },
        warehouse: {
          name: "OmniStock Spatial WMS",
          intro: "Welcome to the <strong>OmniStock Spatial WMS</strong> AI Architecture Tour! This supply chain engine provides a real-time WebGL 3D Voxel warehouse digital twin and strict FEFO expiration quarantine. Would you like to see how we integrate with your existing barcode hardware or our 50% cost savings vs Manhattan Associates?"
        },
        saccade: {
          name: "Saccade-UI Biometric CRO",
          intro: "Welcome to the <strong>Saccade-UI Biometric CRO</strong> AI Architecture Tour! Powered by biological Itti-Koch attention algorithms, it simulates user gaze flow in under 50ms without physical eye-tracking labs. Are you looking to white-label this for client CRO audits or acquire full sovereign source code?"
        }
      };

      const selected = appMap[appType] || { name: "LinkableAI Platform", intro: "Welcome to LinkableAI! How can I assist you with our enterprise software suites today?" };
      
      appendAiBotMessage(selected.intro);
    };

    function clearAiChat() {
      const container = document.getElementById('ai-chat-messages');
      if (!container) return;
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
      const input = document.getElementById('ai-chat-input');
      if (input) {
        input.value = promptText;
        handleAiChatSubmit(new Event('submit'));
      }
    }

    function handleAiChatSubmit(e) {
      if (e) e.preventDefault();
      const input = document.getElementById('ai-chat-input');
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;

      appendUserMessage(text);
      input.value = '';

      showAiTypingIndicator();
      setTimeout(() => {
        removeAiTypingIndicator();
        const response = generateAiBotResponse(text);
        appendAiBotMessage(response);
      }, 500);
    }

    function appendUserMessage(text) {
      const container = document.getElementById('ai-chat-messages');
      if (!container) return;
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
      if (!container) return;
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
      if (!container) return;
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

    function generateAiBotResponse(query) {
      const q = query.toLowerCase();

      // 1. White-Label vs Tier 3 Sovereign Buyout (Modification & Resale Rights)
      if (q.includes('white label') || q.includes('white-label') || q.includes('resell') || q.includes('resale') || q.includes('modify') || q.includes('source code') || q.includes('ip buyout') || q.includes('tier 3')) {
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
  </script>
`;

// Insert clean script right before </body>
html = html.replace('</body>', `${cleanAiBotScript}\n</body>`);

fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(copyPath, html, 'utf8');

console.log('✅ 100% CLEANED & RE-INJECTED: Standalone AI Consultant Bot Script successfully placed before </body>!');
