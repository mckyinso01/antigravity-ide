// ============================================================
// Viral B2B Inbound & Social Lead Generation Engine
// Formats high-authority technical case studies for LinkedIn & Reddit
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CAMPAIGN_DIR = path.join(__dirname, '..', 'social_campaigns');

if (!fs.existsSync(CAMPAIGN_DIR)) {
  fs.mkdirSync(CAMPAIGN_DIR, { recursive: true });
}

const POSTS = [
  {
    platform: "LinkedIn B2B Thought Leadership",
    title: "1. Why Hospital EHRs are 10 Years Behind (And How We Built a 60fps ICU Telemetry Engine)",
    content: `Most hospital software looks and feels like it was built in 2004.

Proprietary EHR vendors charge $500k+ in annual licensing while locking patient telemetry behind clunky Java applets and proprietary protocols.

We took a different approach:
We engineered Clinical Pristine ICU OS — a zero-vendor-lock-in, browser-native clinical telemetry platform running at a native 60fps in WebGL.

Key Architecture Highlights:
• 📈 60fps Multi-Waveform Rendering (Arterial Line, ECG, SpO2, EtCO2) with zero lag
• 💊 Bedside 5-Rights eMAR Narcotic Dual-Witness Verification
• 🔄 1-Click Bi-Directional HL7 / FHIR Migration Engine
• 🛡️ Zero Cloud Data Leakage (Self-hosted & Air-gapped deployable)

You can test the live interactive ICU sandbox directly in your browser without logging in:
👉 Live Platform: https://clinical.linkable.it.com

Are you seeing similar vendor lock-in challenges with your clinical informatics stack?

#HealthTech #ClinicalInformatics #ICU #HL7 #FHIR #MedTech #SoftwareArchitecture`
  },
  {
    platform: "LinkedIn B2B Thought Leadership",
    title: "2. The $2M Weather Delay Dispute: How CPM Scheduling Needs to Evolve",
    content: `In commercial construction, liquidated damages can easily cost a general contractor $15,000 to $50,000 PER DAY of project delay.

Yet, 80% of schedule delay disputes come down to unverified weather claims and manual Excel Gantt charts that fail to prove critical path causality.

We engineered SiteSafe StructuraPro to solve this exact bottleneck:
• 📊 Dynamic CPM Gantt Engine with instant Critical Path Variance Diagnosis
• 🌦️ Automated NOAA-Certified Weather Delay Insurance Claim Generator
• 👷 Geofenced Subcontractor Safety Telemetry & OSHA 300 / 300A Compliance Logs

Test the live construction sandbox here:
👉 Live Construction Engine: https://sitesafe.linkable.it.com

What tools does your project controls team use to prove weather delay causality?

#ConstructionTech #ConTech #ProjectControls #BIM #GeneralContractors #CivilEngineering`
  },
  {
    platform: "Reddit r/SaaS & r/webdev",
    title: "3. We Built a 3D Voxel Warehouse Twin in Pure WebGL (Zero 3rd-Party Dependencies)",
    content: `Title: We built a 3D Voxel digital twin for enterprise warehouses in pure WebGL. Here’s what we learned about spatial WMS.

Hey r/webdev,

Most warehouse management systems (WMS) still present inventory in 2D top-down grid tables. When dealing with high-density vertical racking (10+ levels high) or multi-temperature cold storage, 2D fails completely.

We built OmniStock Spatial WMS to render a full 3D Voxel twin of industrial facilities right inside standard web browsers.

Key Tech Stack & Lessons:
1. Three.js / WebGL with instanced meshes for rendering 50,000+ pallet bins at 60fps.
2. Real-time thermal gradient mapping for cold-chain monitoring.
3. Sub-second shortest pick-path calculations to reduce forklift travel time by 40%.

You can try the live 3D sandbox without signing up:
👉 Live 3D Twin: https://omnistock.linkable.it.com

Would love any feedback on the WebGL rendering performance and UI ergonomics!

#webdev #threejs #javascript #webgl #saas`
  }
];

let md = `# 📢 VIRAL B2B SOCIAL & INBOUND CAMPAIGN KIT\n\n`;
md += `**Master Showcase:** [https://linkable.it.com](https://linkable.it.com)\n\n---\n\n`;

for (const p of POSTS) {
  md += `## ${p.title}\n`;
  md += `* **Target Channel:** \`${p.platform}\`\n\n`;
  md += `\`\`\`text\n${p.content}\n\`\`\`\n\n---\n\n`;
}

const outFile = path.join(CAMPAIGN_DIR, 'VIRAL_B2B_INBOUND_POSTS.md');
fs.writeFileSync(outFile, md, 'utf-8');

console.log('='.repeat(65));
console.log('⚡ VIRAL B2B SOCIAL & INBOUND CAMPAIGN SUITE READY!');
console.log(`Saved to: ${outFile}`);
console.log('='.repeat(65));
