// ==========================================================================
// RUN META LEADGEN SIMULATION & MONTHLY RETAINER ENGINE
// Speed-to-Lead Ingestion, Sub-Second Qualification & Retainer Proposals
// ==========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processMetaLeadInstant } from './src/meta_leadgen_instant_qualifier.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROPOSALS_DIR = path.join(__dirname, 'invoices');
if (!fs.existsSync(PROPOSALS_DIR)) fs.mkdirSync(PROPOSALS_DIR, { recursive: true });

const SIMULATED_META_INBOUND_LEADS = [
  {
    leadgenId: "LEAD-META-771801",
    formId: "FORM-SOLAR-COMMERCIAL",
    pageId: "PAGE-APEX-SOLAR",
    brandName: "Apex Solar Energy PH",
    fullName: "Engr. Roberto Santos",
    phone: "+639178829102",
    email: "rsantos@santoshospitality.ph",
    fieldData: [
      { question: "What is your monthly Meralco electricity bill?", answer: "Above 150k PHP/month" },
      { question: "When are you looking to install commercial solar?", answer: "Immediately this week" },
      { question: "Are you the commercial property owner?", answer: "Yes, President & Owner" }
    ]
  },
  {
    leadgenId: "LEAD-META-771802",
    formId: "FORM-HIFU-VIP",
    pageId: "PAGE-LUXESKIN",
    brandName: "LuxeSkin Aesthetics Clinic",
    fullName: "Carmela De Guzman",
    phone: "+639185521094",
    email: "carmela.deguzman@gmail.com",
    fieldData: [
      { question: "Which aesthetic treatment are you interested in?", answer: "Full-Face Ultra-Lift HIFU Package" },
      { question: "What is your expected treatment budget?", answer: "25k - 40k PHP" },
      { question: "When would you like your doctor consultation?", answer: "This Saturday afternoon" }
    ]
  },
  {
    leadgenId: "LEAD-META-771803",
    formId: "FORM-DENTAL-IMPLANTS",
    pageId: "PAGE-DENTAPRO",
    brandName: "DentaPro Implant Center",
    fullName: "Dr. Arthur Tan",
    phone: "+639209124481",
    email: "dr.arthur.tan@tanclinics.ph",
    fieldData: [
      { question: "How many dental implants do you require?", answer: "Full Arch All-on-4 Restoration" },
      { question: "What is your procedure budget range?", answer: "Above 250,000 PHP" },
      { question: "When are you looking to schedule surgery?", answer: "Within 2 weeks" }
    ]
  },
  {
    leadgenId: "LEAD-META-771804",
    formId: "FORM-ESTATE-CONDO",
    pageId: "PAGE-AVALON-ESTATES",
    brandName: "Avalon Prime Residences",
    fullName: "Jonathan Wei",
    phone: "+639171092831",
    email: "jwei.investments@wei-capital.com",
    fieldData: [
      { question: "What unit size are you looking to acquire?", answer: "3-Bedroom Penthouse Suite" },
      { question: "Target investment range?", answer: "Above 35M PHP" },
      { question: "Timeline for site ocular visit?", answer: "Tomorrow 10:00 AM" }
    ]
  }
];

function runLeadgenSimulation() {
  console.log('='.repeat(70));
  console.log('⚡ EXECUTING SUB-SECOND META LEADGEN QUALIFIER BATCH (STRATEGY 3)');
  console.log('='.repeat(70));

  let totalPipelineGeneratedUsd = 0;

  SIMULATED_META_INBOUND_LEADS.forEach((lead, i) => {
    console.log(`\n[${i + 1}/${SIMULATED_META_INBOUND_LEADS.length}] Inbound Meta Lead: ${lead.fullName} (${lead.brandName})`);
    
    const result = processMetaLeadInstant(lead);
    const qual = result.qualification;

    totalPipelineGeneratedUsd += qual.estimatedDealValueUsd;

    console.log(` -> ⚡ Execution Speed: ${result.processingLatencyMs}ms (Instantaneous WhatsApp Trigger)`);
    console.log(` -> 🎯 Qualification Tier: ${qual.qualificationTier} (Score: ${qual.leadScore}/100)`);
    console.log(` -> 💰 Est. Deal Value: $${qual.estimatedDealValueUsd.toLocaleString()} USD | Urgent Action: ${qual.urgentActionRequired}`);
    console.log(` -> 🔒 WORM SHA-256 Receipt: ${result.sha256Receipt.slice(0, 16)}...`);
    console.log(` -> 📲 WhatsApp Auto-Response:\n    "${result.instantResponsePayload.messageBody.split('\n')[0]}"`);

    // Generate B2B Monthly Retainer Proposal for the Business Owner
    const proposalRef = `RETAINER-${Date.now().toString().slice(-6)}`;
    const proposalFile = path.join(PROPOSALS_DIR, `PROPOSAL_${proposalRef}_${lead.brandName.replace(/\s+/g, '_')}.md`);
    
    const proposalMd = `# 📋 META LEADGEN SPEED-TO-LEAD AUTOMATION & MONTHLY RETAINER
**Proposal Reference:** ${proposalRef}  
**Client Business:** ${lead.brandName}  
**Lead Capture Target:** Facebook & Instagram Lead Ads  
**Guaranteed Metric:** Drop Lead Response Time from 4+ Hours to **Under 8 Seconds**  

---

## 🎯 1. THE PROBLEM SOLVED
* 70% of Meta ad leads go cold because sales teams take hours to respond.
* Leads contacted in **under 60 seconds** have **391% higher close rates**.

---

## ⚡ 2. AUTOMATED DELIVERABLES
1. **Sub-Second Webhook Dispatcher:** Ingests and qualifies Meta leads in <300ms.
2. **Instant Multi-Channel Outreach:** Automated WhatsApp, Messenger & SMS booking links.
3. **Owner High-Priority Push Alert:** Instant dispatch alert to sales manager on VIP leads.

---

## 💰 3. PRICING & MONTHLY RETAINER
* **One-Time Onboarding & Integration Fee:** **$1,000 USD**
* **Monthly Active Retainer & SLA:** **$750 USD/month**
* **Escrow Agreement Link:** https://linkable.it.com/escrow/deposit?ref=${proposalRef}&amount=1000
`;

    fs.writeFileSync(proposalFile, proposalMd, 'utf8');
    console.log(` -> 📄 Retainer Proposal Generated: ${path.basename(proposalFile)}`);
  });

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 SUB-SECOND LEADGEN SIMULATION COMPLETE!`);
  console.log(`📊 Total Leads Qualified: ${SIMULATED_META_INBOUND_LEADS.length}`);
  console.log(`💎 Total Buyer Deal Pipeline Value: $${totalPipelineGeneratedUsd.toLocaleString()} USD`);
  console.log(`💼 Total Setup Fee Pipeline ($1,000 each): $${(SIMULATED_META_INBOUND_LEADS.length * 1000).toLocaleString()} USD`);
  console.log(`🔄 Total Monthly Retainer Pipeline ($750/mo each): $${(SIMULATED_META_INBOUND_LEADS.length * 750).toLocaleString()} USD/mo`);
  console.log('='.repeat(70));
}

runLeadgenSimulation();
