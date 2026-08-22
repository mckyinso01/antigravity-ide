const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. Update Founder Modal with LinkedIn and WhatsApp Buttons
const targetResumeModalButtons = `<div class="flex justify-end gap-3">
        <button class="border border-outline-variant text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0B1C30]/5"
          onclick="closeModal('resume-modal')">Close</button>
        <button class="bg-accent-electric text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600"
          onclick="downloadResumeToast()">Download CV</button>
      </div>`;

const newResumeModalButtons = `<div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-6 font-mono text-xs">
        <div class="flex items-center justify-between">
          <span class="text-slate-400">LinkedIn Profile:</span>
          <a href="https://www.linkedin.com/in/mharc-christian-gatan-258218344" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline font-bold flex items-center gap-1">
            <span>in/mharc-christian-gatan</span>
            <span class="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">WhatsApp Direct:</span>
          <a href="https://wa.me/639622812703" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline font-bold flex items-center gap-1">
            <span>+63 962 281 2703</span>
            <span class="material-symbols-outlined text-xs">chat</span>
          </a>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Founder Direct Email:</span>
          <a href="mailto:mharcgatan@linkable.it.com" class="text-white hover:underline font-bold">mharcgatan@linkable.it.com</a>
        </div>
      </div>
      <div class="flex justify-between items-center gap-3">
        <a href="https://www.linkedin.com/in/mharc-christian-gatan-258218344" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-[#0077B5] hover:bg-[#006097] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all">
          <span>LinkedIn</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
        </a>
        <div class="flex gap-2">
          <button class="border border-outline-variant text-white px-5 py-2 rounded-lg font-bold hover:bg-slate-800 text-xs"
            onclick="closeModal('resume-modal')">Close</button>
          <button class="bg-accent-electric text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-600 text-xs"
            onclick="downloadResumeToast()">Download CV</button>
        </div>
      </div>`;

if (html.includes(targetResumeModalButtons)) {
  html = html.replace(targetResumeModalButtons, newResumeModalButtons);
  console.log('✅ Founder modal enriched with verified LinkedIn & WhatsApp rails!');
}

// 2. Add LinkedIn to Footer
const targetFooter = `<div class="text-on-surface-variant text-xs flex flex-wrap items-center gap-3">
        <button onclick="openTermsModal()" class="text-cyan-400 hover:underline font-bold">Enterprise Terms &amp;
          3-Gives Policy</button>
        <span>•</span>
        Â© 2026 LinkableAI Enterprise Systems Studio. Built with 100% Zero-Defect Precision.
      </div>`;

const newFooter = `<div class="text-on-surface-variant text-xs flex flex-wrap items-center gap-3">
        <button onclick="openTermsModal()" class="text-cyan-400 hover:underline font-bold">Enterprise Terms &amp; 3-Gives Policy</button>
        <span>•</span>
        <a href="https://www.linkedin.com/in/mharc-christian-gatan-258218344" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline font-bold">Founder LinkedIn</a>
        <span>•</span>
        <a href="https://wa.me/639622812703" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline font-bold">WhatsApp Direct</a>
        <span>•</span>
        © 2026 LinkableAI Enterprise Systems Studio. Built with 100% Zero-Defect Precision.
      </div>`;

if (html.includes(targetFooter)) {
  html = html.replace(targetFooter, newFooter);
  console.log('✅ Footer updated with LinkedIn and WhatsApp links!');
} else {
  // Regex match fallback
  html = html.replace(
    /(<button onclick="openTermsModal\(\)"[^>]*>Enterprise Terms &amp;[\s\S]*?<\/div>)/,
    `<button onclick="openTermsModal()" class="text-cyan-400 hover:underline font-bold">Enterprise Terms &amp; 3-Gives Policy</button>
        <span>•</span>
        <a href="https://www.linkedin.com/in/mharc-christian-gatan-258218344" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline font-bold">Founder LinkedIn</a>
        <span>•</span>
        <a href="https://wa.me/639622812703" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline font-bold">WhatsApp Direct</a>
        <span>•</span>
        © 2026 LinkableAI Enterprise Systems Studio. Built with 100% Zero-Defect Precision.
      </div>`
  );
}

// 3. Update AI Bot contact card
const oldBotContactLine = `<div>💬 WhatsApp: <a href="https://wa.me/639622812703" target="_blank" class="text-emerald-400 hover:underline font-bold">+63 962 281 2703 ↗</a></div>`;
const newBotContactLine = `<div>💬 WhatsApp: <a href="https://wa.me/639622812703" target="_blank" class="text-emerald-400 hover:underline font-bold">+63 962 281 2703 ↗</a></div>
              <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/mharc-christian-gatan-258218344" target="_blank" class="text-blue-400 hover:underline font-bold">in/mharc-christian-gatan ↗</a></div>`;

if (html.includes(oldBotContactLine) && !html.includes('in/mharc-christian-gatan')) {
  html = html.replace(oldBotContactLine, newBotContactLine);
  console.log('✅ AI Bot contact knowledge updated with LinkedIn!');
}

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% SYNCHRONIZED ACROSS ALL 4 FILES WITH FOUNDER LINKEDIN & WHATSAPP!');
