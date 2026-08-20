// 🏗️ SITESAFE STRUCTURAPRO - HIGH-TICKET EXECUTIVE COLD PITCH TEMPLATE
// Target: General Contractor Owners, CEOs, VPs of Construction, Project Executives ($20M-$250M Projects)
// Value Anchor: Eradication of $50K/Day Liquidated Damages, NOAA Delay Shield, 1-Click AIA G702 / G703

function generateSiteSafePitch(lead = {}) {
  const companyName = lead.company_name || lead.hospital_name || 'your firm';
  const decisionMaker = lead.decision_maker || lead.name || 'Executive Leadership';
  const firstName = decisionMaker.split(' ')[0] || 'Leadership';
  const painPoint = lead.pain_point || 'critical path float variances and subcontractor payment application delays';

  const subject = `Eliminating $50K/Day Liquidated Delay Penalties at ${companyName} (Automated CPM & AIA G702)`;

  const plainText = `Hi ${firstName},

I’ve been following ${companyName}'s major commercial project pipeline and the complexity of managing trade coordination across your critical path (${painPoint}).

On large-scale commercial projects, general contractors frequently get hit with two massive financial drains:

❌ 1. Unexcused Weather Delays & $50K/Day Liquidated Damages: When adverse weather halts concrete pours or steel erection, GCs lose critical extension-of-time (EOT) claims because manual paper logs lack third-party certified atmospheric proof.

❌ 2. Sub-Tier Lien Ambush & 45-Day AIA G702 Billing Delays: Manually tracking dozens of unconditional lien waivers and compiling payment applications delays cash disbursements, risking stop-work notices and owner disputes.

We engineered SiteSafe StructuraPro — the Civil Engineering CPM Command OS:

🚜 How SiteSafe StructuraPro Protects Your Margins:
• Automated NOAA Atmospheric Delay Shield: Natively connects to local NOAA weather station radar to auto-generate contractually certified EOT claim packages the minute rainfall or high winds breach safety thresholds.
• 1-Click AIA Document G702 / G703 Billing Engine: Auto-compiles schedule of values, stored material invoices, and mandatory sub-tier lien waivers in under 60 seconds.
• Real-Time CPM Float & Variance Radar: Identifies critical path slippages across mechanical, electrical, and structural trades before milestones are breached.
• Drone Photogrammetry & Blueprint Overlay: Aligns drone orthomosaics with CAD/BIM blueprints to prove exact work-in-place progress.

You can test drive the live CPM construction sandbox directly:
👉 Live CPM Sandbox: https://sitesafe.linkable.it.com

And review our full enterprise software suite:
👉 Master Ecosystem Hub: https://linkable.it.com

Are you open to a brief 7-minute walk-through this week to see how we protect your project margins backed by our 100% Sovereign IP Buyout & 3-Gives Milestone Escrow?

Best regards,

Mharc Gatan
Founder & Chief Systems Architect • LinkableAI
🌐 Ecosystem Hub: https://linkable.it.com
🏗️ SiteSafe StructuraPro: https://sitesafe.linkable.it.com
📬 Direct Founder Email: mharcgatan@linkable.it.com`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; font-size: 14px; margin: 0; padding: 20px; background-color: #f8fafc; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .badge { display: inline-block; background: #fef3c7; color: #d97706; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; border: 1px solid #fde68a; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    .btn { display: inline-block; background: #d97706; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 14px 0 16px 0; font-size: 14px; box-shadow: 0 2px 6px rgba(217,119,6,0.25); }
    .feature-box { background: #fffbeb; border-left: 4px solid #d97706; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13px; color: #78350f; }
    .footer { margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">CIVIL ENGINEERING COMMAND • CPM &amp; AIA G702 BILLING</div>
    <p>Hi <strong>${firstName}</strong>,</p>
    
    <p>I’ve been following <strong>${companyName}</strong>'s major commercial project pipeline and the complexity of managing trade coordination across your critical path (<em>${painPoint}</em>).</p>

    <div class="feature-box">
      <strong>🚜 SiteSafe StructuraPro — Margin Protection OS:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 18px; line-height: 1.7;">
        <li><strong>Automated NOAA Atmospheric Delay Shield:</strong> Natively connects to local NOAA weather radar to auto-generate contractually certified EOT claim packages the minute rainfall or winds breach safety thresholds.</li>
        <li><strong>1-Click AIA Document G702 / G703 Engine:</strong> Auto-compiles schedule of values, stored material invoices, and mandatory sub-tier lien waivers in under 60 seconds.</li>
        <li><strong>Real-Time CPM Float &amp; Variance Radar:</strong> Identifies critical path slippages across mechanical, electrical, and structural trades before milestones are breached.</li>
        <li><strong>Drone Photogrammetry &amp; Blueprint Overlay:</strong> Aligns drone orthomosaics with CAD/BIM blueprints to prove exact work-in-place progress.</li>
      </ul>
    </div>

    <p>You can test drive the live CPM construction sandbox directly:</p>
    <div>
      <a href="https://sitesafe.linkable.it.com" class="btn">🏗️ Open SiteSafe StructuraPro Sandbox ↗</a>
    </div>

    <p style="font-size: 13px; color: #475569;">
      Explore our complete 5-system enterprise architecture showcase: <a href="https://linkable.it.com" style="color: #d97706; text-decoration: none; font-weight: bold;">https://linkable.it.com ↗</a>
    </p>

    <p>Are you open to a brief 7-minute walk-through this week to see how we protect your project margins backed by our <strong>100% Sovereign IP Buyout &amp; 3-Gives Milestone Escrow</strong>?</p>

    <div class="footer">
      <strong>Mharc Gatan</strong><br>
      Founder &amp; Chief Systems Architect • LinkableAI<br>
      🌐 Ecosystem Hub: <a href="https://linkable.it.com" style="color: #d97706;">https://linkable.it.com</a><br>
      🏗️ SiteSafe StructuraPro: <a href="https://sitesafe.linkable.it.com" style="color: #d97706;">https://sitesafe.linkable.it.com</a><br>
      📬 Direct Founder Email: <a href="mailto:mharcgatan@linkable.it.com" style="color: #d97706;">mharcgatan@linkable.it.com</a>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, plainText, html };
}

module.exports = { generateSiteSafePitch };
