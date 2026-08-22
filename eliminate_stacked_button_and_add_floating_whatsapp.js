const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. In index.html, remove the redundant inline #ai-bot-launcher button that was causing the overlapping blue pill!
const targetInlineLauncher = `    <!-- Floating Launcher Button -->
    <button id="ai-bot-launcher" onclick="toggleAiConsultant()"
      class="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-2xl shadow-blue-500/40 hover:scale-105 transition-all flex items-center gap-3 cursor-pointer border border-cyan-400/40 group">
      <div class="relative flex items-center justify-center">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
      </div>
      <span class="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">smart_toy</span>
      <div class="text-left font-sans">
        <div class="text-[10px] uppercase font-mono tracking-widest text-cyan-200 leading-none">AI SPECIALIST</div>
        <div class="text-xs font-extrabold text-white leading-tight">Ask Architecture &amp; Licensing</div>
      </div>
    </button>`;

if (html.includes(targetInlineLauncher)) {
  html = html.replace(targetInlineLauncher, `    <!-- Inline launcher removed to eliminate double-layer overlap with LinkableDemoSpecialist -->`);
  console.log('✅ Removed duplicate inline #ai-bot-launcher!');
}

// 2. Add an elegant, high-visibility Floating WhatsApp Founder Chat Pill at bottom-left (or bottom-right floating strip)
const floatingWhatsAppPill = `  <!-- ========================================================================= -->
  <!-- 🟢 HIGH-VISIBILITY FLOATING WHATSAPP FOUNDER DIRECT RAILS -->
  <!-- ========================================================================= -->
  <aside aria-label="WhatsApp Direct Support" class="fixed bottom-6 left-6 z-50">
    <a href="https://wa.me/639622812703?text=Hello%20Mharc,%20I%20am%20reviewing%20LinkableAI%20Sovereign%20Platforms%20and%20would%20like%20to%20discuss%20an%20enterprise%20deployment."
       target="_blank"
       rel="noopener noreferrer"
       class="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white font-bold text-xs shadow-2xl shadow-emerald-900/50 hover:scale-105 hover:shadow-emerald-500/30 transition-all flex items-center gap-2.5 border border-emerald-300/40 group backdrop-blur-lg">
      <div class="relative flex items-center justify-center">
        <span class="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-white"></span>
      </div>
      <span class="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">chat</span>
      <div class="text-left font-sans">
        <div class="text-[9px] uppercase font-mono tracking-wider text-emerald-100 leading-none">FOUNDER DIRECT</div>
        <div class="text-xs font-extrabold text-white leading-tight">WhatsApp (+63 962 281 2703)</div>
      </div>
    </a>
  </aside>

`;

if (!html.includes('HIGH-VISIBILITY FLOATING WHATSAPP FOUNDER DIRECT RAILS')) {
  const injectionTarget = `  <!-- ========================================================================= -->\n  <!-- FLOATING AI ENTERPRISE CONSULTANT & SPECIALIST BOT WIDGET -->`;
  html = html.replace(injectionTarget, floatingWhatsAppPill + injectionTarget);
  console.log('✅ Injected High-Visibility Floating WhatsApp Direct Rails!');
}

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% UNIFIED & SYNCHRONIZED ACROSS ALL 4 FILES!');
