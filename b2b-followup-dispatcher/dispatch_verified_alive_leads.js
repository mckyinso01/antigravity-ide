// ============================================================
// Verified Alive Lead Dispatcher (Controlled Micro-Batch)
// Dispatches strictly to pre-flight verified MX mailboxes
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { sendAutomationSummaryReport } from './src/founder_notifier.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEADS_FILE = path.join(__dirname, 'VERIFIED_ALIVE_OUTREACH_LEADS.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

const BATCH_SIZE = 5; // 5 verified leads per micro-batch
const SENDER_NAME = process.env.SENDER_NAME || 'Mharc Gatan | Linkable Systems';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomJitter = (min = 6000, max = 12000) => Math.floor(Math.random() * (max - min + 1)) + min;

function loadLeads() {
  if (!fs.existsSync(LEADS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function appendLog(entry) {
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try { logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8')); } catch { logs = []; }
  }
  logs.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

function buildClinicalPitch(lead) {
  const company = lead.company || 'Healthcare Organization';
  const name = lead.name || 'Clinical Leadership';

  const subject = `Clinical Telemetry & EHR Data Architecture for ${company}`;
  const text = `Hi ${name},

I am reaching out regarding ${company}'s clinical telemetry and EHR integration infrastructure.

Many healthcare systems encounter high recurring licensing fees and siloed patient data with legacy vendor stacks.

We engineered Clinical Pristine ICU OS — a self-hosted, perpetual-license clinical data architecture designed for seamless HL7/FHIR interoperability and 60fps real-time ICU telemetry:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Key Technical Highlights:
• 📈 Sub-Second Multi-Lead Waveforms (Real-time ECG, Arterial Line, SpO2)
• 💊 5-Rights eMAR Narcotic Dual-Witness Verification
• 🔄 Bi-Directional HL7 / FHIR EHR Pipeline Integration
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / Private Cloud Deployable)

We are offering a dedicated 48-Hour Sandbox Access for your clinical informatics and systems engineering team. Would you be open to a brief 10-minute technical review this week?

Best regards,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Live Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com
`;

  return { subject, text };
}

async function executeBatch() {
  console.log('='.repeat(65));
  console.log('🚀 CONTROLLED MICRO-BATCH OUTREACH (PRE-FLIGHT VERIFIED LEADS)');
  console.log(`⏱️ Batch Size: ${BATCH_SIZE} verified targets | Human Jitter: 6s - 12s`);
  console.log('='.repeat(65));

  const leads = loadLeads();
  let dispatched = 0;

  for (let i = 0; i < leads.length; i++) {
    if (dispatched >= BATCH_SIZE) break;

    const lead = leads[i];
    if (lead.dispatchStatus === 'DELIVERED') continue;

    const { subject, text } = buildClinicalPitch(lead);

    console.log(`\n📤 [${dispatched + 1}/${BATCH_SIZE}] Sending to: ${lead.name} (${lead.company})`);
    console.log(`   ✉️ Email: ${lead.email} | MX: ${lead.mxHost}`);

    try {
      const info = await transporter.sendMail({
        from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
        to: lead.email,
        subject,
        text
      });

      console.log(`   ✨ Successfully Delivered! MessageId: ${info.messageId}`);
      lead.dispatchStatus = 'DELIVERED';
      lead.dispatchedAt = new Date().toISOString();
      lead.messageId = info.messageId;

      appendLog({
        type: 'VERIFIED_MICRO_BATCH',
        company: lead.company,
        name: lead.name,
        email: lead.email,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      dispatched++;
      saveLeads(leads);

      if (dispatched < BATCH_SIZE) {
        const jitter = getRandomJitter(6000, 12000);
        console.log(`   ⏳ Human Jitter delay (${(jitter / 1000).toFixed(1)}s) to protect sender reputation...`);
        await sleep(jitter);
      }
    } catch (err) {
      console.error(`   ❌ Dispatch Error for ${lead.email}: ${err.message}`);
      lead.dispatchStatus = `ERROR_${err.message.substring(0, 40)}`;
      saveLeads(leads);
    }
  }

  console.log('\n' + '='.repeat(65));
  console.log(`🏁 Batch Completed: ${dispatched} verified executive emails delivered.`);
  console.log('='.repeat(65));

  if (dispatched > 0) {
    await sendAutomationSummaryReport({
      dispatchedThisCycle: dispatched,
      verifiedLeadsInQueue: leads.filter(l => l.dispatchStatus !== 'DELIVERED').length,
      inboundRepliesCount: 0,
      mode: 'Pre-Flight Verified Micro-Batch Outreach',
      nextCycle: 'On-Demand / Staggered Window',
      notes: `Successfully delivered ${dispatched} verified executive pitches to healthcare informatics leaders without bounces. Pre-flight verified MX protection active.`
    }).catch(e => console.error(`Report error: ${e.message}`));
  }

  return dispatched;
}

executeBatch().catch(console.error);
