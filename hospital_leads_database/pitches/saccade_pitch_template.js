// 👁️ SACCADE-UI BIOMETRIC - HIGH-TICKET EXECUTIVE COLD PITCH TEMPLATE
// Target: VPs of Growth, CMOs, Heads of Product / High-Volume eCommerce ($10M+ GMV)
// Value Anchor: Eradication of 72% Silent Drop-Offs, Real-Time Webcam Eye-Tracking, Saccade Heatmaps

function generateSaccadePitch(lead = {}) {
  const companyName = lead.company_name || lead.hospital_name || 'your store';
  const decisionMaker = lead.decision_maker || lead.name || 'Growth Leadership';
  const firstName = decisionMaker.split(' ')[0] || 'Leadership';
  const painPoint = lead.pain_point || 'checkout funnel drop-offs and cognitive visual friction';

  const subject = `Fixing the 72% Silent Drop-Off on ${companyName} (Real-Time Biometric Saccade CRO)`;

  const plainText = `Hi ${firstName},

I was reviewing the checkout flow and landing page architecture on ${companyName} (${painPoint}).

Traditional analytics tools (Google Analytics, standard heatmaps) only tell you where visitors clicked after they already decided to leave. They are completely blind to WHY visitors hesitated in the first place.

❌ Over 72% of high-intent visitors abandon transactions because of subconscious cognitive friction—visual clutter, misaligned trust badges, or copy that fails the initial 200-millisecond optical fixation test.

We engineered Saccade-UI Biometric — the Neuro Biometric Conversion Rate Intelligence Engine:

👁️ How Saccade-UI Elevates Conversion Rates:
• Zero-Hardware Webcam Eye-Tracking: Captures millisecond-level gaze fixation, ocular saccades, and pupil dilation directly through the browser with zero external eye-tracking hardware required.
• Visual Saliency & Cognitive Load Heatmaps: Instantly reveals what elements grab attention vs. which CTA buttons are being completely ignored by human foveal vision.
• 4-Pane Optical Diff Comparator: Side-by-side split-testing comparing raw DOM layout, cognitive attention hotspots, and conversion probability scores.
• Biometric A/B Victory Predictor: Accurately forecasts winning UI variants before spending $50,000 on live paid traffic.

You can test drive the live biometric eye-tracking sandbox right in your browser:
👉 Live Biometric Sandbox: https://saccade.linkable.it.com

And review our full software ecosystem catalog:
👉 Master Ecosystem Hub: https://linkable.it.com

Would you be open to a 7-minute optical teardown of your primary landing page this week backed by our 3-Gives Milestone Escrow Guarantee?

Best regards,

Mharc Gatan
Founder & Chief Systems Architect • LinkableAI
🌐 Ecosystem Hub: https://linkable.it.com
👁️ Saccade-UI Biometric: https://saccade.linkable.it.com
📬 Direct Founder Email: mharcgatan@linkable.it.com`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; font-size: 14px; margin: 0; padding: 20px; background-color: #f8fafc; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .badge { display: inline-block; background: #ede9fe; color: #7c3aed; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; border: 1px solid #ddd6fe; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    .btn { display: inline-block; background: #7c3aed; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 14px 0 16px 0; font-size: 14px; box-shadow: 0 2px 6px rgba(124,58,237,0.25); }
    .feature-box { background: #f5f3ff; border-left: 4px solid #7c3aed; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13px; color: #4c1d95; }
    .footer { margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">NEURO BIOMETRIC CRO • WEBCAM EYE-TRACKING</div>
    <p>Hi <strong>${firstName}</strong>,</p>
    
    <p>I was reviewing the checkout flow and landing page architecture on <strong>${companyName}</strong> (<em>${painPoint}</em>).</p>

    <div class="feature-box">
      <strong>👁️ Saccade-UI Biometric — Neuro Conversion Intelligence:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 18px; line-height: 1.7;">
        <li><strong>Zero-Hardware Webcam Eye-Tracking:</strong> Captures millisecond-level gaze fixation, ocular saccades, and pupil dilation directly through the browser.</li>
        <li><strong>Visual Saliency &amp; Cognitive Load Heatmaps:</strong> Reveals what elements grab attention vs. which CTA buttons are being completely ignored by human foveal vision.</li>
        <li><strong>4-Pane Optical Diff Comparator:</strong> Side-by-side split-testing comparing raw DOM layout, cognitive attention hotspots, and conversion probability.</li>
        <li><strong>Biometric A/B Victory Predictor:</strong> Forecasts winning UI variants before spending $50,000 on live paid traffic.</li>
      </ul>
    </div>

    <p>You can test drive the live biometric eye-tracking sandbox right in your browser:</p>
    <div>
      <a href="https://saccade.linkable.it.com" class="btn">👁️ Test Saccade-UI Live Biometric Sandbox ↗</a>
    </div>

    <p style="font-size: 13px; color: #475569;">
      Explore our complete 5-system enterprise architecture showcase: <a href="https://linkable.it.com" style="color: #7c3aed; text-decoration: none; font-weight: bold;">https://linkable.it.com ↗</a>
    </p>

    <p>Would you be open to a 7-minute optical teardown of your primary landing page this week backed by our <strong>3-Gives Milestone Escrow Guarantee</strong>?</p>

    <div class="footer">
      <strong>Mharc Gatan</strong><br>
      Founder &amp; Chief Systems Architect • LinkableAI<br>
      🌐 Ecosystem Hub: <a href="https://linkable.it.com" style="color: #7c3aed;">https://linkable.it.com</a><br>
      👁️ Saccade-UI Biometric: <a href="https://saccade.linkable.it.com" style="color: #7c3aed;">https://saccade.linkable.it.com</a><br>
      📬 Direct Founder Email: <a href="mailto:mharcgatan@linkable.it.com" style="color: #7c3aed;">mharcgatan@linkable.it.com</a>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, plainText, html };
}

module.exports = { generateSaccadePitch };
