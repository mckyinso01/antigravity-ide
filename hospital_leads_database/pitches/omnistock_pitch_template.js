// 📦 OMNISTOCK SPATIAL WMS - HIGH-TICKET EXECUTIVE COLD PITCH TEMPLATE
// Target: VPs of Supply Chain, Directors of Logistics, 3PL Operations Executives (100,000+ sq ft Distribution Centers)
// Value Anchor: Eradication of 4.2-Mile Forklift Travel Waste, 3D Spatial Voxel Heatmaps, Dynamic Slotting

function generateOmniStockPitch(lead = {}) {
  const companyName = lead.company_name || lead.hospital_name || 'your distribution center';
  const decisionMaker = lead.decision_maker || lead.name || 'Supply Chain Leadership';
  const firstName = decisionMaker.split(' ')[0] || 'Leadership';
  const painPoint = lead.pain_point || 'warehouse travel waste and high-velocity SKU congestion';

  const subject = `Cutting 4.2 Miles of Daily Forklift Travel at ${companyName} (3D Spatial Voxel WMS)`;

  const plainText = `Hi ${firstName},

I saw that ${companyName} has been expanding distribution throughput and managing high-SKU inventory turns across your facility (${painPoint}).

In large distribution centers (100K+ sq ft), legacy WMS software creates hidden operational waste:

❌ The Forklift Deadhead Drain: Warehouse operators spend up to 35% of their shift driving empty forklifts (over 4.2 miles per driver daily) because static tabular databases fail to optimize volumetric pick paths.

❌ Honeycomb Rack Congestion & Expiration Spoilage: High-velocity SKUs get trapped behind slow-moving pallets, leading to dock bottlenecking and costly expired lot write-offs.

We engineered OmniStock Spatial WMS — the 3D Spatial Logistics & Dynamic Slotting Engine:

📦 How OmniStock Kills Warehouse Waste:
• 3D Voxel Spatial Heatmaps: Visualizes your entire warehouse in real-time 3D, showing exact weight distribution, pallet velocity, and heat zones down to the specific bin coordinate.
• Dynamic AI Slotting Optimization: Rebalances high-turnover SKUs closer to shipping docks, reducing total travel distance by up to 28%.
• Rugged Zebra/Android Scanner Bridge: Sub-10ms barcode verification with offline resilient caching for uninterrupted operations in RF-shielded cold storage zones.
• Automated FEFO / FIFO Expiration Intercept: Eliminates expired lot write-offs with automated quarantine alerts.

You can navigate the live 3D spatial warehouse sandbox immediately:
👉 Live WMS Sandbox: https://omnistock.linkable.it.com

And review our full software architecture portfolio:
👉 Master Ecosystem Hub: https://linkable.it.com

Would you have 7 minutes this week to see a live demonstration of how we reduce fulfillment cycle times backed by our 3-Gives Milestone Escrow Guarantee?

Warm regards,

Mharc Gatan
Founder & Chief Systems Architect • LinkableAI
🌐 Ecosystem Hub: https://linkable.it.com
📦 OmniStock Spatial WMS: https://omnistock.linkable.it.com
📬 Direct Founder Email: mharcgatan@linkable.it.com`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; font-size: 14px; margin: 0; padding: 20px; background-color: #f8fafc; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .badge { display: inline-block; background: #f3e8ff; color: #9333ea; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; border: 1px solid #e9d5ff; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    .btn { display: inline-block; background: #9333ea; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin: 14px 0 16px 0; font-size: 14px; box-shadow: 0 2px 6px rgba(147,51,234,0.25); }
    .feature-box { background: #faf5ff; border-left: 4px solid #9333ea; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0; font-size: 13px; color: #581c87; }
    .footer { margin-top: 28px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">SUPPLY CHAIN SPATIAL ARCHITECTURE • 3D VOXEL WMS</div>
    <p>Hi <strong>${firstName}</strong>,</p>
    
    <p>I saw that <strong>${companyName}</strong> has been expanding distribution throughput and managing high-SKU inventory turns across your facility (<em>${painPoint}</em>).</p>

    <div class="feature-box">
      <strong>📦 OmniStock Spatial WMS — Warehouse Velocity Architecture:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 18px; line-height: 1.7;">
        <li><strong>3D Voxel Spatial Heatmaps:</strong> Visualizes your entire warehouse in real-time 3D, showing exact weight distribution, pallet velocity, and heat zones down to the specific bin coordinate.</li>
        <li><strong>Dynamic AI Slotting Optimization:</strong> Rebalances high-turnover SKUs closer to shipping docks, reducing total forklift travel distance by up to 28%.</li>
        <li><strong>Rugged Scanner Bridge:</strong> Sub-10ms barcode verification with offline resilient caching for uninterrupted operations in RF-shielded cold storage zones.</li>
        <li><strong>Automated FEFO / FIFO Intercept:</strong> Eliminates expired lot write-offs with automated quarantine alerts.</li>
      </ul>
    </div>

    <p>You can navigate the live 3D spatial warehouse sandbox immediately:</p>
    <div>
      <a href="https://omnistock.linkable.it.com" class="btn">📦 Launch OmniStock 3D Spatial WMS ↗</a>
    </div>

    <p style="font-size: 13px; color: #475569;">
      Explore our complete 5-system enterprise architecture showcase: <a href="https://linkable.it.com" style="color: #9333ea; text-decoration: none; font-weight: bold;">https://linkable.it.com ↗</a>
    </p>

    <p>Would you have 7 minutes this week to see a live demonstration of how we reduce fulfillment cycle times backed by our <strong>3-Gives Milestone Escrow Guarantee</strong>?</p>

    <div class="footer">
      <strong>Mharc Gatan</strong><br>
      Founder &amp; Chief Systems Architect • LinkableAI<br>
      🌐 Ecosystem Hub: <a href="https://linkable.it.com" style="color: #9333ea;">https://linkable.it.com</a><br>
      📦 OmniStock Spatial WMS: <a href="https://omnistock.linkable.it.com" style="color: #9333ea;">https://omnistock.linkable.it.com</a><br>
      📬 Direct Founder Email: <a href="mailto:mharcgatan@linkable.it.com" style="color: #9333ea;">mharcgatan@linkable.it.com</a>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, plainText, html };
}

module.exports = { generateOmniStockPitch };
