// ============================================================
// Instant High-Ticket Proposal & Contract Closer Engine
// Channels: Upwork, OnlineJobs.ph, LinkedIn InMail, Direct WhatsApp
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', 'active_proposals');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PROPOSALS = [
  {
    title: "1. Urgent High-Ticket Web & Mobile Development (Upwork / OnlineJobs.ph)",
    dealSize: "$1,500 - $5,000 USD",
    targetPlatform: "Upwork / OnlineJobs / Direct Client",
    hook: "24-48 Hour Interactive Prototype Delivery",
    content: `Hi [Client Name],

I can deliver your [Website / Web Application / Platform] on a high-velocity 24–48 hour rapid sprint.

Instead of generic talk or static mockups, you can test our live enterprise production platforms running right now in your browser:
👉 Live Showcase: https://linkable.it.com

Why Clients Choose Our Engineering:
• ⚡ Sub-Second Load Speeds (<0.4s DOM paint, 100/100 Lighthouse Performance)
• 📱 100% Responsive Desktop, Tablet, & Mobile (Pristine Tailwind / Modern CSS)
• 🔒 Zero-Leakage Data Security & Enterprise API Integration
• 💳 Milestone Escrow Terms: Initial deposit to launch today, balance released only upon your 100% satisfaction.

Can you share the Figma link, brief, or feature list? I will review it immediately and send you a functional structure breakdown within the hour.

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`
  },
  {
    title: "2. Autonomous AI Agents & Business Workflow Automation (B2B Mid-Market)",
    dealSize: "$3,500 - $12,000 USD",
    targetPlatform: "LinkedIn InMail / Direct B2B RFP",
    hook: "Multi-Agent Autonomous Orchestration & Zero-Vendor-Lock-in",
    content: `Hi [Executive Name],

Saw your focus on scaling [Company Name]'s digital workflows and operational throughput.

Most businesses waste 40+ hours a week on repetitive manual data reconciliation, customer support routing, and multi-app copy-pasting.

We build autonomous, enterprise-grade AI Agent systems that execute complex multi-step workflows with 100% precision:
👉 Live Platform Showcase: https://linkable.it.com

What We Deliver:
1. 🤖 Custom AI Agentic Pipelines (Deep LLM integration with strict zero-hallucination guardrails)
2. 🔄 1-Click Bi-Directional Sync (Postgres, Firestore, CRM, ERP, Slack, WhatsApp)
3. ⚡ 48-Hour Live Sandbox Deployment (Fully interactive test environment before rollout)

Let's do a 10-minute live demonstration this week. What day works best for your schedule?

Best regards,
Mharc Gatan
Founder & Lead Architect | Linkable Systems
🌐 https://linkable.it.com`
  },
  {
    title: "3. Enterprise Hospital & HealthTech ICU Telemetry (Healthcare Systems)",
    dealSize: "$48,500 - $85,000 USD (Perpetual License)",
    targetPlatform: "Executive Direct Email / Hospital Procurement",
    hook: "Zero-Vendor-Lock-in HL7/FHIR EHR Integration",
    content: `Dear [CIO / CNO / Medical Director],

I am reaching out regarding [Hospital Name]'s clinical telemetry and EHR integration infrastructure.

Proprietary hospital software vendors charge exorbitant annual recurring seat fees while locking your patient data into rigid silos.

We engineered Clinical Pristine ICU OS — a self-hosted, perpetual-license clinical operating system:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Core Clinical Capabilities:
• 📈 60fps Real-Time ICU Waveforms (Multi-lead ECG, Arterial Line, SpO2, EtCO2)
• 💊 5-Rights eMAR Narcotic Dual-Witness Verification (Eliminating bedside dispensing errors)
• 🔄 1-Click HL7 / FHIR Bi-Directional EHR Migration
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / Private Cloud Deployable)

We are offering a $650 USD 48-Hour Dedicated Sandbox Trial for your medical informatics team. Would you be open to reviewing the live interactive demo this week?

Sincerely,
Mharc Gatan
Solutions Architecture | Linkable Systems
🌐 https://linkable.it.com`
  },
  {
    title: "4. Construction Critical Path & OSHA Weather Delay Engine (General Contractors)",
    dealSize: "$24,500 - $60,000 USD",
    targetPlatform: "General Contractor Project Directors / Commercial Developers",
    hook: "Automated NOAA Delay Insurance Recovery & Dynamic CPM Gantt",
    content: `Dear [Project Director / VP Operations],

Construction schedule slippage and unverified weather delay disputes cost commercial general contractors millions in liquidated damages.

We engineered SiteSafe StructuraPro — an enterprise Critical Path Method (CPM) and jobsite risk management engine:
👉 Live Construction Sandbox: https://sitesafe.linkable.it.com

What SiteSafe Solves On-Site:
• 📊 Dynamic Interactive CPM Gantt with Instant Critical Path Variance Diagnosis
• 🌦️ Automated NOAA-Certified Weather Delay Insurance Claim Generator
• 👷 Subcontractor Geofenced Safety Telemetry & Real-Time OSHA 300/300A Compliance Logs

Would you be open to a 5-minute sandbox test on your active project schedules this Thursday?

Best regards,
Mharc Gatan
Solutions Architecture | Linkable Systems
🌐 https://sitesafe.linkable.it.com`
  },
  {
    title: "5. Cold-Chain & 3D Spatial Warehouse Management (Logistics Executives)",
    dealSize: "$38,500 - $75,000 USD",
    targetPlatform: "Supply Chain VPs / 3PL Cold Storage Directors",
    hook: "3D Voxel Digital Twin & Sub-Zero Sensor Telemetry",
    content: `Dear [VP Logistics / Supply Chain Director],

Traditional 2D warehouse software fails to optimize vertical cubic space and multi-temperature cold storage zones.

We developed OmniStock Spatial WMS — an interactive 3D Voxel digital twin for enterprise warehousing:
👉 Live 3D Warehouse Sandbox: https://omnistock.linkable.it.com

Key Operational Highlights:
• 📦 Full 3D Voxel Racking Digital Twin with Real-Time Thermal Gradient Mapping
• ⚡ 40% Reduction in Forklift Trajectory Latency via Automated Pick-Path Optimization
• 🔄 Instant Integration with SAP, Oracle WMS, and Zebra RFID scanners

Let's deploy a 48-hour pilot twin for your primary facility. When is a good time for a brief walkthrough?

Best regards,
Mharc Gatan
Solutions Architecture | Linkable Systems
🌐 https://omnistock.linkable.it.com`
  }
];

let markdownOutput = `# 🚀 HIGH-TICKET MULTI-CHANNEL PROPOSAL & CLOSING KIT\n\n`;
markdownOutput += `**Live Master Platform:** [https://linkable.it.com](https://linkable.it.com)\n\n`;
markdownOutput += `*Generated for immediate execution across Upwork, Freelance Job Boards, Direct LinkedIn InMail, and High-Intent B2B Outreach.*\n\n---\n\n`;

for (const p of PROPOSALS) {
  markdownOutput += `## ${p.title}\n`;
  markdownOutput += `* **Target Deal Size:** \`${p.dealSize}\`\n`;
  markdownOutput += `* **Platforms:** ${p.targetPlatform}\n`;
  markdownOutput += `* **Core Hook:** ${p.hook}\n\n`;
  markdownOutput += `\`\`\`text\n${p.content}\n\`\`\`\n\n---\n\n`;
}

const targetFile = path.join(OUTPUT_DIR, 'HIGH_TICKET_CLOSING_PROPOSALS.md');
fs.writeFileSync(targetFile, markdownOutput, 'utf-8');

console.log('='.repeat(65));
console.log('⚡ HIGH-TICKET CLOSING PROPOSAL SUITE GENERATED!');
console.log(`Saved to: ${targetFile}`);
console.log('='.repeat(65));
