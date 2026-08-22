const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// 1. Update Contact CTA with 1-Click WhatsApp Button
const targetCta = `<button
            class="inline-flex items-center gap-3 bg-accent-electric text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-xl shadow-blue-600/30"
            onclick="openContactModal('General Inquiry')">
            <span>Start A Project Conversation</span>
            <span class="material-symbols-outlined">alternate_email</span>
          </button>`;

const newCta = `<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/639622812703?text=Hello%20Mharc,%20I%20am%20interested%20in%20deploying%20LinkableAI%20Sovereign%20Platforms%20for%20my%20organization." 
               target="_blank" 
               rel="noopener noreferrer"
               class="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all cursor-pointer shadow-xl shadow-emerald-900/40 text-sm md:text-base">
              <span class="material-symbols-outlined">chat</span>
              <span>Chat on WhatsApp (+63 962 281 2703)</span>
            </a>
            <button
              class="inline-flex items-center gap-3 bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all cursor-pointer shadow-lg text-sm md:text-base"
              onclick="openContactModal('General Inquiry')">
              <span>Send Architecture Inquiry</span>
              <span class="material-symbols-outlined">alternate_email</span>
            </button>
          </div>`;

if (html.includes(targetCta)) {
  html = html.replace(targetCta, newCta);
  console.log('✅ Contact CTA updated with 1-click WhatsApp button!');
}

// 2. Update AI Bot Contact details to highlight WhatsApp
const targetBotContact = `<div>📧 Email: <a href="mailto:mharcgatan@linkable.it.com" class="text-cyan-400 hover:underline font-bold">mharcgatan@linkable.it.com</a></div>
              <div>⚡ Direct Wire &amp; PayMongo Rails Active</div>
              <div>📍 Manila, PH • Global Cloud Deployments</div>`;

const newBotContact = `<div>📧 Email: <a href="mailto:mharcgatan@linkable.it.com" class="text-cyan-400 hover:underline font-bold">mharcgatan@linkable.it.com</a></div>
              <div>💬 WhatsApp: <a href="https://wa.me/639622812703" target="_blank" class="text-emerald-400 hover:underline font-bold">+63 962 281 2703 ↗</a></div>
              <div>⚡ Direct Wire &amp; PayMongo Rails Active</div>
              <div>📍 Manila, PH • Global Cloud Deployments</div>`;

if (html.includes(targetBotContact)) {
  html = html.replace(targetBotContact, newBotContact);
  console.log('✅ AI Bot contact knowledge updated with WhatsApp!');
}

// 3. Update GCash / Maya verified number text in payment card
html = html.replace('+63 962\n            281 ••••', '+63 962 281 2703 (WhatsApp / GCash Active)');
html = html.replace('+63 962 281 ••••', '+63 962 281 2703 (WhatsApp / GCash Active)');

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% SYNCHRONIZED ACROSS ALL 4 FILES WITH WHATSAPP +639622812703!');
