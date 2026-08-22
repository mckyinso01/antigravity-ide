// 🛡️ CLAIMGUARD AI - HOSPITAL EHR SUITE EXPANSION & CLAIMS DEFENSE CROSS-SELL PITCH
// Target: Hospital Leadership (CFO, VP Revenue Cycle, CIO, CMIO)
// Context: Follow-up & Suite Expansion to Previous Clinical Pristine EHR HUD outreach

function generateClaimGuardCrossSellPitch(lead = {}) {
  const hospitalName = lead.hospital || lead.hospital_name || lead.company_name || 'your hospital';
  const decisionMaker = lead.decisionMaker || lead.decision_maker || lead.contact_name || lead.name || 'Leadership';
  const firstName = decisionMaker.split(' ')[0] || 'Leadership';
  const location = lead.location || lead.state || 'US';
  const coreEHR = lead.core_ehr || lead.ehr || 'Epic / Cerner';

  const subject = `Expanding ${hospitalName}'s EHR Stack: Pre-Submission Claims Defense & Rev-Share Elimination`;

  const plainText = `Hi ${firstName},

Following up on our earlier briefing regarding the Clinical Pristine spatial ICU HUD for ${hospitalName}, I wanted to introduce the companion financial defense engine in the LinkableAI healthcare suite: ClaimGuard AI.

While Clinical Pristine eliminates bedside documentation friction and ED boarding bottlenecks, ClaimGuard AI secures the financial perimeter by stopping commercial payer claim denials before submission.

Most hospital executives we partner with are battling two chronic revenue drains:

❌ 1. The 5%–12% BPO Rev-Share Tax: Outsourced billing vendors (Optum, R1, Ensemble) take recurring percentage cuts of your top-line revenue—costing up to $30,000,000 over 5 years on a standard $120M net patient revenue.
❌ 2. Hostile Payer AI Downcoding: Commercial payers deploy automated algorithms to silently downcode Sepsis-3, 2-Midnight inpatient stays, and robotic surgical cases, freezing critical hospital cash flow for 90–120+ days.

⚔️ How ClaimGuard AI Protects ${hospitalName}:
• Dual-Agent Devil’s Moot Court AI: Pre-audits claims against payer-specific denial rules and binds statutory ERISA § 502 & CMS-0057-F legal briefs prior to 837 EDI submission.
• State Prompt Pay Late Penalty Enforcement: Automatically generates statutory 1.5%–2% monthly interest penalty demand letters under State Insurance Codes to enforce immediate payer compliance.
• Zero Rev-Share Sovereign Ownership: Available as a flat predictable license or 100% full IP source code buyout—letting ${hospitalName} retain 100% of collected revenue.
• Native EHR & Hardware Bridges: Zero-friction integration with ${coreEHR} via FHIR R4, plus 1-click 300 DPI duplex scanner feeder and cryptographic e-Fax bridges with Bates numbering.

📊 5-Year Cash Flow Comparison:
--------------------------------------------------------------------------------
• 5% Rev-Share BPO (Optum/R1): $6,000,000/yr ➔ $30,000,000 Total Drain
• Legacy RCM SaaS (Waystar/Epic): $620,000 Yr 1 ➔ $2,020,000 Total Drain
• ClaimGuard AI Enterprise Tier: $185,000/yr ➔ $925,000 Total ($1.095M savings vs SaaS)
• ClaimGuard AI 100% Sovereign Buyout: $485,000 Flat ($0 Yrs 2–5) ➔ $29.5M Saved!
--------------------------------------------------------------------------------
💡 Payback Velocity: Under 45 Days (recovering 4–6 complex denials covers 100% of software costs).

You can test drive both interconnected hospital workstations live in sandbox mode:
👉 ClaimGuard AI Claims Defense: https://claimguard.linkable.it.com
👉 Clinical Pristine EHR HUD: https://clinical.linkable.it.com
👉 Master Healthcare Ecosystem: https://linkable.it.com

Are you open to a brief 7-minute architecture walk-through next week to review how the unified Clinical + ClaimGuard suite protects both clinical workflows and bottom-line revenue?

Warm regards,

Mharc Gatan
Founder & Chief Systems Architect • LinkableAI
🌐 Ecosystem Hub: https://linkable.it.com
🛡️ ClaimGuard AI: https://claimguard.linkable.it.com
📬 Direct Founder Email: mharcgatan@linkable.it.com`;

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
  .badge { display: inline-block; background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.05em; margin-bottom: 16px; }
  h2 { color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700; line-height: 1.3; }
  p { margin: 0 0 16px 0; font-size: 14px; }
  .highlight-box { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; }
  .table-box { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
  .table-box th { background: #0f172a; color: #ffffff; text-align: left; padding: 8px 12px; font-weight: 600; }
  .table-box td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
  .cta-btn { display: inline-block; background: #0284c7; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; margin: 16px 8px 16px 0; box-shadow: 0 2px 4px rgba(2, 132, 199, 0.2); }
  .cta-secondary { display: inline-block; background: #0f172a; color: #ffffff !important; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; margin: 16px 0; }
  .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
</style>
</head>
<body>
<div class="container">
  <div class="badge">Healthcare Suite Expansion</div>
  <h2>Expanding ${hospitalName}'s EHR Stack: Pre-Submission Claims Defense & Rev-Share Elimination</h2>
  
  <p>Hi ${firstName},</p>
  
  <p>Following up on our earlier briefing regarding the <strong>Clinical Pristine</strong> spatial ICU HUD for ${hospitalName}, I wanted to introduce the companion financial defense engine in our hospital suite: <strong>ClaimGuard AI</strong>.</p>
  
  <p>While Clinical Pristine eliminates bedside documentation friction, ClaimGuard AI secures your hospital's financial perimeter by stopping commercial payer claim denials before submission.</p>
  
  <div class="highlight-box">
    <strong>⚔️ Key Defense Capabilities:</strong><br>
    • <strong>Dual-Agent Devil’s Moot Court:</strong> Simulates payer denial bots and binds unassailable ERISA § 502 & CMS-0057-F statutory legal briefs before 837 EDI submission.<br>
    • <strong>State Prompt Pay Penalty Enforcement:</strong> Automatically demands statutory 1.5%–2% monthly interest penalties on delayed claims under state insurance codes.<br>
    • <strong>0% Rev-Share / 100% Sovereign IP Buyout:</strong> Zero recurring percentage cuts. Flat predictable license or complete source code buyout so ${hospitalName} keeps 100% of revenue.
  </div>

  <table class="table-box">
    <thead>
      <tr>
        <th>Option</th>
        <th>5-Year Cost</th>
        <th>Savings vs BPO</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>5% Rev-Share BPO (Optum/R1)</td>
        <td>$30,000,000</td>
        <td>$0 (Baseline)</td>
      </tr>
      <tr>
        <td>ClaimGuard Enterprise License</td>
        <td>$925,000</td>
        <td><strong>+$29,075,000</strong></td>
      </tr>
      <tr style="background: #f0fdf4;">
        <td><strong>ClaimGuard 100% IP Buyout</strong></td>
        <td><strong>$485,000 (Flat)</strong></td>
        <td><strong style="color: #16a34a;">+$29,515,000</strong></td>
      </tr>
    </tbody>
  </table>

  <p>You can test drive both live production workstations immediately in interactive sandbox mode:</p>
  
  <div>
    <a href="https://claimguard.linkable.it.com" class="cta-btn">🛡️ Launch ClaimGuard AI</a>
    <a href="https://clinical.linkable.it.com" class="cta-secondary">🏥 Launch Clinical HUD</a>
  </div>
  
  <p style="margin-top: 16px;">Are you open to a brief 7-minute architecture walk-through next week to see how the combined suite protects both clinical operations and revenue?</p>
  
  <div class="footer">
    <strong>Mharc Gatan</strong><br>
    Founder & Chief Systems Architect • LinkableAI<br>
    Ecosystem: <a href="https://linkable.it.com" style="color: #0284c7;">https://linkable.it.com</a><br>
    Direct Email: <a href="mailto:mharcgatan@linkable.it.com" style="color: #0284c7;">mharcgatan@linkable.it.com</a>
  </div>
</div>
</body>
</html>
`;

  return { subject, plainText, html };
}

module.exports = { generateClaimGuardCrossSellPitch };

if (require.main === module) {
  const sample = generateClaimGuardCrossSellPitch({
    hospital: 'Salem Health Hospitals & Clinics',
    decisionMaker: 'Bob MacDonald',
    location: 'USA (Oregon)'
  });
  console.log('--- TEST GENERATION ---');
  console.log('Subject:', sample.subject);
  console.log('Plain Text Preview:\n', sample.plainText.slice(0, 300));
}
