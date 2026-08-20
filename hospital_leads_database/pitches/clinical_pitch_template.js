// 🏥 CLINICAL PRISTINE OS - HIGH-TICKET EXECUTIVE COLD PITCH TEMPLATE
// Target: Chief Nursing Officers (CNO), Chief Medical Officers (CMO), Directors of Emergency & ICU
// Value Anchor: 40-Min Bed Boarding Delay Eradication, Sub-15ms Spatial HUD, Zero Medication Errors

function generateClinicalPitch(lead = {}) {
  const hospitalName = lead.hospital_name || lead.company_name || 'your hospital';
  const decisionMaker = lead.decision_maker || lead.name || 'Clinical Leadership';
  const firstName = decisionMaker.split(' ')[0] || 'Leadership';
  const painPoint = lead.pain_point || 'inpatient bed turnaround delays and emergency boarding constraints';
  const coreEHR = lead.core_ehr || 'Epic / Cerner';

  const subject = `Reducing Inpatient Bed Turnaround Latency at ${hospitalName} (Sub-15ms Spatial Clinical HUD)`;

  const plainText = `Hi ${firstName},

I saw that ${hospitalName} has been actively managing acute patient occupancy and navigating bed placement turnaround latencies (${painPoint}).

When inpatient bed assignment lags, nursing coordinators and bed placement teams often lose 40+ minutes per shift simply chasing bed status in ${coreEHR} or calling environmental services to confirm room sanitation over clipboards.

Worse, legacy EHR interfaces force clinicians to click through 15 nested sub-menus just to administer critical high-risk medications, increasing bedside documentation burnout.

We engineered Clinical Pristine OS — an ultra-responsive, zero-footprint Spatial Clinical HUD that integrates natively with existing hospital systems (HL7 / FHIR v2.5.1):

⚡ How Clinical Pristine OS Solves This:
• Sub-15ms Spatial Bed HUD: Real-time visual floor plans with live MEWS vitals waveforms, telemetry Lead II monitoring, and automated EVS biohazard QR locks.
• Zero Medication Errors (5-Rights eMAR): Barcode scanning with mandatory dual-nurse witness handoffs for controlled narcotics and automated dose calculation guards.
• Surviving Sepsis Hour-1 & ACLS Studio: Built-in 2-minute visual CPR metronome, automated code blue audit trails, and statutory FDA non-device CDS compliance.
• Zero-Installation / Self-Hosted: Runs on-premise behind your hospital firewall with zero per-seat licensing penalties.

You can interact with the live clinical workstation here:
👉 Live Clinical Workstation: https://clinical.linkable.it.com

And review our full software architecture portfolio:
👉 Master Ecosystem Hub: https://linkable.it.com

Would you be open to a 7-minute walk-through this week to see how we cut patient admission-to-bed time by 32% backed by our 3-Gives Milestone Escrow Guarantee?

Warm regards,

Mharc Gatan
Founder & Chief Systems Architect • LinkableAI
🌐 Ecosystem Hub: https://linkable.it.com
🏥 Clinical Pristine OS: https://clinical.linkable.it.com
📬 Direct Founder Email: mharcgatan@linkable.it.com`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; font-size: 14px; margin: 0; padding: 20px; background-color: #f8fafc; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .badge { display: inline-block; background: #ecfdf5; color: #059669; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; border: 1px solid #a7f3d0; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    .btn { display: inline-block; background: #059669; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 14px 0 16px 0; font-size: 14px; box-shadow: 0 2px 6px rgba(5,150,105,0.25); }
    .feature-box { background: #f0fdf4; border-left: 4px solid #059669; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13px; color: #064e3b; }
    .footer { margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">CLINICAL SYSTEMS ENGINEERING • SPATIAL HUD (HL7/FHIR)</div>
    <p>Hi <strong>${firstName}</strong>,</p>
    
    <p>I noticed that <strong>${hospitalName}</strong> has been actively managing acute patient occupancy and navigating bed placement turnaround latencies (<em>${painPoint}</em>).</p>
    
    <p>When inpatient bed assignment lags, nursing coordinators and bed placement teams often lose <strong>40+ minutes per shift</strong> simply chasing bed status in <strong>${coreEHR}</strong> or coordinating room sanitation over clipboards.</p>

    <div class="feature-box">
      <strong>⚡ Clinical Pristine OS — High-Efficiency Spatial HUD:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 18px; line-height: 1.7;">
        <li><strong>Sub-15ms Spatial Bed HUD:</strong> Real-time visual floor plans with live MEWS vitals waveforms, telemetry Lead II monitoring, and automated EVS biohazard QR locks.</li>
        <li><strong>Zero Medication Errors (5-Rights eMAR):</strong> Barcode scanning with mandatory dual-nurse witness handoffs for controlled narcotics.</li>
        <li><strong>Surviving Sepsis Hour-1 &amp; ACLS Studio:</strong> Built-in 2-minute CPR metronome &amp; statutory FDA non-device CDS compliance.</li>
        <li><strong>Zero-Installation / Self-Hosted:</strong> Runs on-premise behind your hospital firewall with zero per-seat licensing penalties.</li>
      </ul>
    </div>

    <p>You can interact with the live clinical workstation here:</p>
    <div>
      <a href="https://clinical.linkable.it.com" class="btn">🩺 Launch Clinical Pristine Live HUD ↗</a>
    </div>

    <p style="font-size: 13px; color: #475569;">
      Explore our complete 5-system enterprise architecture showcase: <a href="https://linkable.it.com" style="color: #059669; text-decoration: none; font-weight: bold;">https://linkable.it.com ↗</a>
    </p>

    <p>Would you be open to a 7-minute walk-through this week to see how we cut patient admission-to-bed time by 32% backed by our <strong>3-Gives Milestone Escrow Guarantee</strong>?</p>

    <div class="footer">
      <strong>Mharc Gatan</strong><br>
      Founder &amp; Chief Systems Architect • LinkableAI<br>
      🌐 Ecosystem Hub: <a href="https://linkable.it.com" style="color: #059669;">https://linkable.it.com</a><br>
      🏥 Clinical Pristine OS: <a href="https://clinical.linkable.it.com" style="color: #059669;">https://clinical.linkable.it.com</a><br>
      📬 Direct Founder Email: <a href="mailto:mharcgatan@linkable.it.com" style="color: #059669;">mharcgatan@linkable.it.com</a>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, plainText, html };
}

module.exports = { generateClinicalPitch };
