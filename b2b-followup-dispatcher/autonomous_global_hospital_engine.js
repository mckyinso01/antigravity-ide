// ============================================================
// Autonomous 24/7 Global Hospital Outreach Engine (US & UK)
// Full Continuous Multi-Channel Execution with Pre-Flight DNS Armor
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import dns from 'node:dns';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOSPITALS_FILE = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\antigravity-ide\\hospital_leads_database\\verified_100_us_uk_hospitals.json';
const ALIVE_LEADS_FILE = path.join(__dirname, 'VERIFIED_ALIVE_OUTREACH_LEADS.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

const SENDER_NAME = process.env.SENDER_NAME || 'Mharc Gatan - Linkable Systems';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com';

const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);

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
const getRandomJitter = (min = 5000, max = 9000) => Math.floor(Math.random() * (max - min + 1)) + min;

function loadJson(file) {
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

function saveJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

function appendLog(entry) {
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try { logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8')); } catch { logs = []; }
  }
  logs.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

function resolveMxAsync(domain) {
  return new Promise((resolve) => {
    resolver.resolveMx(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        resolve({ valid: false, reason: err ? err.code : 'NO_MX_RECORD' });
      } else {
        addresses.sort((a, b) => a.priority - b.priority);
        resolve({ valid: true, host: addresses[0].exchange });
      }
    });
  });
}

function buildHospitalPitch(lead) {
  const isUK = lead.country === 'UK' || lead.email.endsWith('.uk') || (lead.location && lead.location.includes('UK'));
  const company = lead.hospital_name || lead.company || 'Healthcare Organization';
  const name = lead.decision_maker || lead.name || 'Chief Information Officer & Clinical Informatics Leadership';
  const ehr = lead.core_ehr || 'EPR / EHR';

  if (isUK) {
    const subject = `EPR Telemetry & NHS Interoperability Architecture for ${company}`;
    const text = `Dear Clinical Informatics & Digital Health Leadership at ${company},

I am reaching out regarding ${company}'s digital clinical telemetry pipelines and ${ehr} integration architecture.

Legacy proprietary clinical systems impose high recurring license overhead while siloing critical patient telemetry.

We engineered Clinical Pristine ICU OS — an enterprise, self-hosted perpetual clinical architecture designed for sub-second HL7/FHIR telemetry and full Caldicott Guardian data sovereignty:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Core Technical Capabilities:
• 📈 60fps Real-Time ICU Waveforms (Arterial Line, Multi-lead ECG, SpO2)
• 💊 5-Rights eMAR Narcotic Dual-Witness Verification
• 🔄 Bi-Directional ${ehr} Interoperability via Open HL7 / FHIR Standards
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / NHS Trust Private Cloud Deployable)

We are offering dedicated 48-Hour Sandbox Access for your digital health and clinical informatics team. Would you be open to a brief 10-minute technical demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

    return { subject, text };
  } else {
    const subject = `Clinical Telemetry & ${ehr} Real-Time Architecture for ${company}`;
    const text = `Dear Clinical & ITS Leadership at ${company},

I am reaching out regarding ${company}'s acute care clinical telemetry infrastructure and real-time ${ehr} integration.

Proprietary hospital software vendors often charge steep annual seat licensing fees while locking clinical waveform telemetry into rigid silos.

We engineered Clinical Pristine ICU OS — an enterprise, perpetual-license clinical data architecture designed for sub-second HL7/FHIR interoperability:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Core Clinical Capabilities:
• 📈 Sub-Second Multi-Lead Waveforms (Real-time ECG, Arterial Line, SpO2)
• 💊 5-Rights eMAR Narcotic Dual-Witness Verification
• 🔄 1-Click Bi-Directional ${ehr} Telemetry Migration
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / Private Cloud Deployable)

We are offering dedicated 48-Hour Sandbox Access for your ITS enterprise systems and clinical informatics engineering team. Would you be open to a brief 10-minute technical demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

    return { subject, text };
  }
}

async function runAutonomousEngine() {
  console.log('='.repeat(70));
  console.log('🚀 AUTONOMOUS 24/7 GLOBAL HOSPITAL OUTREACH ENGINE (USA & UK)');
  console.log('🛡️ Pre-Flight DNS MX Handshake Active | Real-Time Message Tracking');
  console.log('='.repeat(70));

  const hospitals = loadJson(HOSPITALS_FILE);
  const aliveLeads = loadJson(ALIVE_LEADS_FILE);

  // Unify leads into a clean dispatch queue
  const queue = [];
  const seenEmails = new Set();

  // 1. Add alive leads
  for (const a of aliveLeads) {
    if (a.dispatchStatus !== 'DELIVERED' && a.email && !seenEmails.has(a.email.toLowerCase())) {
      seenEmails.add(a.email.toLowerCase());
      queue.push({
        id: a.id || `alive_${queue.length}`,
        company: a.company || a.hospital || 'Healthcare Target',
        name: a.name || 'Clinical Leadership',
        email: a.email.toLowerCase().trim(),
        country: a.email.endsWith('.uk') ? 'UK' : 'US',
        core_ehr: 'Epic/Cerner',
        sourceFile: 'alive'
      });
    }
  }

  // 2. Add 100 hospitals database targets
  for (const h of hospitals) {
    const email = (h.sample_email || '').toLowerCase().trim();
    if (email && h.status !== 'DELIVERED' && !seenEmails.has(email)) {
      seenEmails.add(email);
      queue.push({
        id: h.id,
        company: h.hospital_name,
        name: h.decision_maker,
        email: email,
        country: h.country || 'US',
        core_ehr: h.core_ehr || 'Epic',
        sourceFile: 'hospitals'
      });
    }
  }

  console.log(`\n📊 Queue Loaded: ${queue.length} targets pending verified dispatch.`);
  console.log('🚀 Starting continuous execution...\n');

  let successCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const target = queue[i];
    const domain = target.email.split('@')[1];

    if (!domain) {
      skippedCount++;
      continue;
    }

    // Pre-flight DNS verification
    const mx = await resolveMxAsync(domain);
    if (!mx.valid) {
      console.log(`❌ [${i + 1}/${queue.length}] SKIPPED: ${target.email} - Dead MX (${mx.reason})`);
      skippedCount++;
      continue;
    }

    const { subject, text } = buildHospitalPitch(target);

    console.log(`\n📤 [${i + 1}/${queue.length}] (${target.country}) Dispatching to: ${target.company}`);
    console.log(`   👤 ${target.name} | ✉️ ${target.email}`);
    console.log(`   🛡️ MX Host: ${mx.host}`);

    try {
      const info = await transporter.sendMail({
        from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
        to: target.email,
        subject,
        text
      });

      console.log(`   ✨ Successfully Delivered! MessageId: ${info.messageId}`);
      successCount++;

      appendLog({
        type: 'GLOBAL_HOSPITAL_DISPATCH',
        country: target.country,
        company: target.company,
        name: target.name,
        email: target.email,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      // Update source files
      if (target.sourceFile === 'hospitals') {
        const item = hospitals.find(x => x.id === target.id);
        if (item) {
          item.status = 'DELIVERED';
          item.deliveredAt = new Date().toISOString();
          item.messageId = info.messageId;
          saveJson(HOSPITALS_FILE, hospitals);
        }
      } else {
        const item = aliveLeads.find(x => x.email.toLowerCase() === target.email);
        if (item) {
          item.dispatchStatus = 'DELIVERED';
          item.deliveredAt = new Date().toISOString();
          item.messageId = info.messageId;
          saveJson(ALIVE_LEADS_FILE, aliveLeads);
        }
      }

      // Safe human jitter
      const jitter = getRandomJitter(5000, 8500);
      console.log(`   ⏳ Jitter delay (${(jitter / 1000).toFixed(1)}s)...`);
      await sleep(jitter);
    } catch (err) {
      console.error(`   ❌ Dispatch Error for ${target.email}: ${err.message}`);
      if (err.message.includes('too many messages') || err.message.includes('554') || err.message.includes('quota')) {
        console.warn('   ⚠️ SMTP hourly throttle detected. Backing off for 60s before resuming...');
        await sleep(60000);
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('🏁 GLOBAL HOSPITAL OUTREACH RUN FINISHED');
  console.log(`✨ Delivered: ${successCount} | ❌ Skipped/Dead: ${skippedCount} | Total: ${queue.length}`);
  console.log('='.repeat(70));
}

runAutonomousEngine().catch(console.error);
