const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. FREE 48-HOUR CUSTOM SANDBOX & POC MODAL
const sandboxModalHtml = `
  <!-- ========================================================================= -->
  <!-- 🎁 FREE 48-HOUR CUSTOM ENTERPRISE SANDBOX & POC REQUEST MODAL -->
  <!-- ========================================================================= -->
  <div id="sandbox-poc-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md hidden animate-in fade-in duration-200">
    <div class="bg-[#0B132B] border border-cyan-500/40 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative font-sans text-slate-100">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070D1E]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
            <span class="material-symbols-outlined">rocket_launch</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-white font-display flex items-center gap-2">
              <span>Free 48-Hour Custom Enterprise Sandbox</span>
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">100% ZERO-RISK POC</span>
            </h3>
            <p class="text-xs text-slate-400 font-mono">Experience your real facility floorplan &amp; data running live in 3D within 48 hours.</p>
          </div>
        </div>
        <button type="button" onclick="closeModal('sandbox-poc-modal')" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <form onsubmit="handleSandboxSubmit(event)" class="p-6 space-y-4 text-xs font-mono">
        <div class="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-[11px] leading-relaxed">
          💡 <strong>How it works:</strong> Provide your company name and basic scope. Our systems architecture team will build an interactive, branded proof-of-concept sandbox using your layout and sample metrics — completely free with zero purchasing obligation.
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] text-slate-300 mb-1 font-bold">Company / Organization Name *</label>
            <input type="text" id="poc-company-name" required placeholder="e.g. Toby's Sports / St. Luke's Hospital" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none text-xs" />
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-1 font-bold">Select Target Platform *</label>
            <select id="poc-platform-select" required class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none text-xs">
              <option value="OmniStock 3D Spatial WMS">📦 OmniStock Enterprise 3D WMS</option>
              <option value="Clinical Pristine ICU OS">🏥 Clinical Pristine ICU Telemetry OS</option>
              <option value="SiteSafe StructuraPro CPM OS">🏗️ SiteSafe StructuraPro Construction OS</option>
              <option value="ClaimGuard AI Legal Defense">🛡️ ClaimGuard AI Revenue Defense</option>
              <option value="Saccade-UI Biometric CRO">👁️ Saccade-UI Biometric CRO Evaluator</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] text-slate-300 mb-1 font-bold">Your Name &amp; Title *</label>
            <input type="text" id="poc-contact-name" required placeholder="e.g. Juan dela Cruz (VP Logistics)" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none text-xs" />
          </div>
          <div>
            <label class="block text-[11px] text-slate-300 mb-1 font-bold">Corporate Email / WhatsApp *</label>
            <input type="text" id="poc-contact-email" required placeholder="e.g. juan@company.com or +63 917..." class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none text-xs" />
          </div>
        </div>

        <div>
          <label class="block text-[11px] text-slate-300 mb-1 font-bold">Facility Scope / Pain Point / Custom Requirements</label>
          <textarea id="poc-details" rows="3" placeholder="e.g. 5,000 sqm warehouse, 30 pickers, want to test Eulerian shortest walking routes and barcode photo verification." class="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 outline-none text-xs"></textarea>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="text-[10px] text-slate-400">
            ✓ Turnaround: &lt; 48 Hours &bull; Direct Founder Support: +63 962 281 2703
          </div>
          <button type="submit" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2">
            <span>🚀 Request Free 48-Hour Sandbox</span>
          </button>
        </div>
      </form>
    </div>
  </div>
`;

// 2. AGENCY RESELLER & PARTNER PROGRAM MODAL
const partnerModalHtml = `
  <!-- ========================================================================= -->
  <!-- 🤝 AUTHORIZED AGENCY & RESELLER PARTNER PROGRAM MODAL -->
  <!-- ========================================================================= -->
  <div id="partner-program-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md hidden animate-in fade-in duration-200">
    <div class="bg-[#0D1527] border border-indigo-500/40 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative font-sans text-slate-100">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080E1C]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold">
            <span class="material-symbols-outlined">handshake</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-white font-display flex items-center gap-2">
              <span>Authorized Solutions Partner &amp; Reseller Program</span>
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">25% - 30% REVENUE SHARE</span>
            </h3>
            <p class="text-xs text-slate-400 font-mono">Earn ₱50,000 – ₱150,000+ per closed deployment introducing our sovereign platforms.</p>
          </div>
        </div>
        <button type="button" onclick="closeModal('partner-program-modal')" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="p-6 space-y-4 text-xs font-mono">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-center">
            <span class="text-emerald-400 text-lg font-black block">25% – 30%</span>
            <span class="text-slate-300 text-[11px] font-bold block">Direct Deal Commission</span>
            <span class="text-slate-500 text-[10px] block">₱50k – ₱150k / Deal</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-center">
            <span class="text-cyan-400 text-lg font-black block">100% Free</span>
            <span class="text-slate-300 text-[11px] font-bold block">POC Sandboxes Built</span>
            <span class="text-slate-500 text-[10px] block">We do the engineering</span>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-center">
            <span class="text-amber-400 text-lg font-black block">White-Label</span>
            <span class="text-slate-300 text-[11px] font-bold block">Agency IP Options</span>
            <span class="text-slate-500 text-[10px] block">Your brand / Our engine</span>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <h4 class="text-white font-bold text-xs flex items-center gap-1.5 text-cyan-400">
            <span class="material-symbols-outlined text-sm">verified</span> Target Partner Profiles:
          </h4>
          <ul class="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
            <li><strong>IT &amp; Management Consultants:</strong> Advising clients burdened by high monthly SaaS fees.</li>
            <li><strong>Construction PM Advisers:</strong> Serving General Contractors needing Procore alternatives.</li>
            <li><strong>Healthcare &amp; RCM Billing Agencies:</strong> Supporting hospitals battling denial backlogs.</li>
            <li><strong>Logistics 3PL Integrators:</strong> Deploying turnkey barcode WMS systems.</li>
          </ul>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="https://wa.me/639622812703?text=Hi%20Mharc,%20I%20am%20interested%20in%20becoming%20an%20Authorized%20Solutions%20Partner%20for%20LinkableAI%20platforms." target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">chat</span>
            <span>Join Partner Program via WhatsApp</span>
          </a>
          <a href="mailto:mharcgatan@linkable.it.com?subject=Authorized%20Partner%20Application%20-%20LinkableAI" class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold transition cursor-pointer flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">mail</span>
            <span>Apply via Email</span>
          </a>
        </div>
      </div>
    </div>
  </div>
`;

// Inject modals before closing body tag if not present
if (!html.includes('id="sandbox-poc-modal"')) {
  html = html.replace('</body>', sandboxModalHtml + '\n' + partnerModalHtml + '\n</body>');
  console.log('✅ Injected Sandbox POC Modal and Partner Program Modal into HTML!');
}

// 3. JAVASCRIPT HANDLER FOR SANDBOX SUBMISSIONS
const sandboxJsHandler = `
    // 🎁 48-Hour Free Custom Sandbox POC Handlers
    function openSandboxPocModal(platform) {
      if (platform) {
        const select = document.getElementById('poc-platform-select');
        if (select) {
          Array.from(select.options).forEach(opt => {
            if (opt.value.toLowerCase().includes(platform.toLowerCase()) || opt.text.toLowerCase().includes(platform.toLowerCase())) {
              select.value = opt.value;
            }
          });
        }
      }
      openModal('sandbox-poc-modal');
    }

    function openPartnerProgramModal() {
      openModal('partner-program-modal');
    }

    function handleSandboxSubmit(e) {
      e.preventDefault();
      const company = document.getElementById('poc-company-name')?.value || 'Enterprise Prospect';
      const platform = document.getElementById('poc-platform-select')?.value || 'Sovereign Platform';
      const contact = document.getElementById('poc-contact-name')?.value || 'Leadership';
      const emailOrPhone = document.getElementById('poc-contact-email')?.value || '';
      const details = document.getElementById('poc-details')?.value || '';

      const msg = \`Hello Mharc, I would like to request a Free 48-Hour Custom Sandbox for \${company} on \${platform}. Contact: \${contact} (\${emailOrPhone}). Requirements: \${details}\`;
      const waUrl = \`https://wa.me/639622812703?text=\${encodeURIComponent(msg)}\`;

      closeModal('sandbox-poc-modal');
      showToast('Thank you! Redirecting to Founder Mharc Gatan on WhatsApp to provision your sandbox...', 'success');
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1200);
    }
`;

if (!html.includes('function handleSandboxSubmit')) {
  html = html.replace('function calculateWebsiteRoi()', sandboxJsHandler + '\n    function calculateWebsiteRoi()');
  console.log('✅ Injected Sandbox & Partner JS Handlers!');
}

// Sync all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 MASTER SHOWCASE 100% SYNCHRONIZED WITH 48H SANDBOX & PARTNER ENGINE!');
