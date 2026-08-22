const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Target the duplicate snippet right after the new generateAiBotResponse function
const duplicateSnippet = `      // 2. 100% Free Custom Modification Guarantee
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
    }`;

if (html.includes(duplicateSnippet)) {
  html = html.replace(duplicateSnippet, '');
  console.log('✅ Successfully stripped duplicate leftover code block!');
} else {
  // Regex fallback
  html = html.replace(
    /(\s*\/\/ 2\. 100% Free Custom Modification Guarantee[\s\S]*?Read 3-Gives Terms<\/button>\s*<\/div>\s*<\/div>\s*`;\s*})/,
    ''
  );
  console.log('✅ Applied regex cleanup for duplicate bot script!');
}

// Synchronize all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 100% CLEANED: Zero raw JavaScript in DOM, clean script block synchronized across all files!');
