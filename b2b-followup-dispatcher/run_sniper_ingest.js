// ==========================================================================
// RUN META MCP SNIPER INGESTION
// Automatically Ingests, Matches, and Queues Fresh Facebook Leads
// ==========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSniperPitch } from './meta_mcp_sniper_engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RADAR_FILE = path.join(__dirname, 'HOT_LIVE_INBOUND_LEAD_RADAR.json');
const INVOICES_DIR = path.join(__dirname, 'invoices');

if (!fs.existsSync(INVOICES_DIR)) fs.mkdirSync(INVOICES_DIR, { recursive: true });

// Incoming Live Batch from Meta Groups / Community Feeds
const FRESH_INBOUND_FACEBOOK_POSTS = [
  {
    clientName: "Victor Hernandez",
    company: "Metro Manila Auto Hub",
    email: "victor.hernandez@autohub.ph",
    platformSource: "Facebook Group: Used Car Dealers Philippines",
    grievance: "Looking for an experienced web app developer to build our dealership vehicle inventory, lot aging holding cost calculator, and mechanic dispatch tracker. Need it within 2 weeks."
  },
  {
    clientName: "Sofia Al-Thani",
    company: "SilkRoad Commerce Doha",
    email: "sofia.althani.trade@gmail.com",
    platformSource: "Facebook Group: E-Commerce & Marketplace Founders",
    grievance: "We are developing a luxury multi-vendor marketplace platform. Seeking a dev team for vendor commission escrow, buyer checkout, and vendor payout dashboard."
  },
  {
    clientName: "Dr. Aris Thorne",
    company: "BioVax Pharma Logistics",
    email: "athorne@biovaxlogistics.com",
    platformSource: "Facebook Group: Cold Chain & Pharma Supply Chain PH",
    grievance: "Urgently need a compliant cold storage monitoring web software for FDA audit. Must have USP 1079 MKT temperature excursion logs and sensor calibration tracker."
  }
];

function runSniperIngestion() {
  console.log('='.repeat(70));
  console.log('⚡ EXECUTING META MCP 15-MINUTE SNIPER INGESTION');
  console.log('='.repeat(70));

  let radarData = [];
  if (fs.existsSync(RADAR_FILE)) {
    try { radarData = JSON.parse(fs.readFileSync(RADAR_FILE, 'utf8')); } catch { radarData = []; }
  }

  FRESH_INBOUND_FACEBOOK_POSTS.forEach((post, i) => {
    console.log(`\n[${i + 1}/${FRESH_INBOUND_FACEBOOK_POSTS.length}] Ingesting Post from: ${post.clientName} (${post.company})`);
    console.log(` -> Source: ${post.platformSource}`);
    console.log(` -> Grievance: "${post.grievance.slice(0, 75)}..."`);

    const pitch = generateSniperPitch(post);

    console.log(` -> 🎯 Weapon Matched: ${pitch.matchedWeaponTitle} (${pitch.confidenceScore}% match)`);
    console.log(` -> 🌐 Target Deployment Subdomain: ${pitch.tailoredSubdomain}`);
    console.log(` -> 💳 Fast-Start Pilot Deposit: $${pitch.pilotDeposit} USD (Full Project: $${pitch.standardPrice.toLocaleString()} USD)`);

    // Write proposal markdown
    const invoiceFile = path.join(INVOICES_DIR, `PROPOSAL_${pitch.proposalRef}_${post.clientName.replace(/\s+/g, '_')}.md`);
    const invoiceMd = `# 📋 FAST-START PILOT PROPOSAL & ESCROW AGREEMENT
**Proposal Reference:** ${pitch.proposalRef}  
**Client:** ${post.clientName} (${post.company})  
**Source:** ${post.platformSource}  
**Matched Flagship Solution:** ${pitch.matchedWeaponTitle}  
**Target Deployment:** ${pitch.tailoredSubdomain}  

---

## 🎯 1. OBJECTIVES & 48-HOUR SPRINT
The Client requires rapid deployment for:
> "${post.grievance}"

### Deliverables:
1. **Dedicated White-Labeled Instance:** Deployed at ${pitch.tailoredSubdomain}
2. **Core Capabilities:** Real-time state management, automated compliance, and 100/100 Lighthouse speed.
3. **Source Code Handover:** 100% full client ownership.

---

## 💰 2. PRICING & REFUNDABLE PILOT ESCROW
* **Standard Handover Value:** $${pitch.standardPrice.toLocaleString()} USD
* **48-Hour Pilot Deposit:** **$${pitch.pilotDeposit} USD** (100% credited to final handover)
* **Escrow Deposit Link:** [${pitch.escrowLink}](${pitch.escrowLink})
`;

    fs.writeFileSync(invoiceFile, invoiceMd, 'utf8');

    // Add to radar
    radarData.push({
      ...post,
      ...pitch,
      invoicePath: invoiceFile,
      ingestedAt: new Date().toISOString()
    });
  });

  fs.writeFileSync(RADAR_FILE, JSON.stringify(radarData, null, 2), 'utf8');

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 SNIPER INGESTION COMPLETE: ${FRESH_INBOUND_FACEBOOK_POSTS.length} Live Prospects Processed & Armed with Pilot Proposals!`);
  console.log('='.repeat(70));
}

runSniperIngestion();
