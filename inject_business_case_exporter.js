const fs = require('fs');
const path = require('path');

const gatzCinematicIndex = path.join(__dirname, 'gatzdevs-cinematic', 'index.html');
const gatzCinematic200 = path.join(__dirname, 'gatzdevs-cinematic', '200.html');
const gatzPortfolioIndex = path.join(__dirname, 'GatzDevPortfolio', 'index.html');
const gatzPortfolio200 = path.join(__dirname, 'GatzDevPortfolio', '200.html');

let html = fs.readFileSync(gatzCinematicIndex, 'utf8');

// Function to generate downloadable board-ready business case
const downloadBusinessCaseFn = `
    // 📄 Download Executive Board-Ready Business Case (PDF/Text)
    function downloadBoardReadyBusinessCase() {
      const teamSize = document.getElementById('roi-team-size-val')?.innerText || '25 Seats';
      const annualFee = document.getElementById('roi-annual-fee-val')?.innerText || '$24,000 / year';
      const inflation = document.getElementById('roi-inflation-val')?.innerText || '10% / year';
      const legacyTotal = document.getElementById('roi-legacy-total')?.innerText || '$79,440';
      const buyoutPrice = document.getElementById('roi-buyout-price')?.innerText || '$18,500';
      const netSavings = document.getElementById('roi-net-savings')?.innerText || '$60,940';
      const pctSavings = document.getElementById('roi-pct-savings')?.innerText || '76.7%';
      const payback = document.getElementById('roi-payback-months')?.innerText || '9.3 Months';
      const tierName = document.getElementById('roi-target-tier')?.innerText || 'Multi-Facility Commercial IP';

      const content = \`================================================================================
LINKABLEAI ENTERPRISE EXECUTIVE BOARD-READY BUSINESS CASE
Zero-SaaS Perpetual License vs Multi-Year Incumbent Subscription Analysis
================================================================================
Generated for: Executive Leadership & Investment Committee
Date: \${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Author: Mharc Gatan, Founder & Chief AI Systems Architect (LinkableAI)
Contact: mharcgatan@linkable.it.com | WhatsApp: +63 962 281 2703

--------------------------------------------------------------------------------
1. EXECUTIVE SUMMARY & CAPITAL EFFICIENCY PROJECTION
--------------------------------------------------------------------------------
By deploying LinkableAI's 100% Perpetual Sovereign License architecture, the
enterprise permanently eliminates recurring vendor SaaS taxation, seat licenses,
and forced annual renewal price hikes.

• System Scope: \${teamSize}
• Target License Tier: \${tierName}
• One-Time Sovereign Buyout Price: \${buyoutPrice} (₱\${(activeRoiTier.php || 1050000).toLocaleString()})
• Estimated 3-Year Legacy Vendor Cost: \${legacyTotal} (incl. \${inflation} annual price hike)
• Net 3-Year Projected Cash Savings: \${netSavings} (\${pctSavings} Capital Retained)
• Capital Payback Velocity: \${payback} to 100% Breakeven

--------------------------------------------------------------------------------
2. SOVEREIGN ARCHITECTURAL ADVANTAGES
--------------------------------------------------------------------------------
[✓] 100% Perpetual Intellectual Property / Deployment Rights
[✓] Zero Per-Seat User Licensing Penalties
[✓] Air-Gapped On-Premises Docker / Kubernetes Cluster Ready
[✓] Universal 1-Click Legacy Migration Engine (Zero Data Loss Switch)
[✓] Guaranteed 3-Year Zero-Defect Maintenance & Security Hotfix SLA

--------------------------------------------------------------------------------
3. TRANSACTION & ESCROW TERMS
--------------------------------------------------------------------------------
Milestone Escrow Structure:
  • Milestone 1 (30% Deposit): Sandbox Provisioning & Custom Data Migration
  • Milestone 2 (40% Deployment): On-Premise Docker Setup & System Calibration
  • Milestone 3 (30% Sign-Off): Production Handover & Full Sovereign Source Code

Direct Founder Support: Mharc Gatan | +63 962 281 2703 | linkable.it.com
================================================================================\`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`LINKABLEAI_BOARD_READY_BUSINESS_CASE_\${Date.now()}.txt\`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
`;

// Add download button markup in ROI calculator if not present
if (!html.includes('downloadBoardReadyBusinessCase')) {
  // Add download button next to Lock In This Buyout Tier button
  const oldBtnMarkup = `onclick="lockInRoiTier()"`;
  const newBtnMarkup = `onclick="lockInRoiTier()"\n                  class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer">\n                  <span>🔒 Lock In This Buyout Tier &bull; Start Escrow</span>\n                </button>\n                <button type="button" onclick="downloadBoardReadyBusinessCase()"\n                  class="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer">\n                  <span>📄 Download Board-Ready Business Case (TXT/PDF)</span>`;
  
  html = html.replace(
    'onclick="lockInRoiTier()"\n                  class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer">\n                  <span>🔒 Lock In This Buyout Tier &bull; Start Escrow</span>',
    newBtnMarkup
  );
  
  // Inject function into JS section
  const jsMarker = 'function calculateWebsiteRoi()';
  html = html.replace(jsMarker, downloadBusinessCaseFn + '\n    ' + jsMarker);
  
  console.log('✅ Injected Board-Ready Business Case Exporter into Master ROI Calculator!');
}

// Sync all 4 files
fs.writeFileSync(gatzCinematicIndex, html, 'utf8');
fs.writeFileSync(gatzCinematic200, html, 'utf8');
fs.writeFileSync(gatzPortfolioIndex, html, 'utf8');
fs.writeFileSync(gatzPortfolio200, html, 'utf8');

console.log('🎉 ROI CALCULATOR & BUSINESS CASE EXPORTER 100% SYNCHRONIZED!');
