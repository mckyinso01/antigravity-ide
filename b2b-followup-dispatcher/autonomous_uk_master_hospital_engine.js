// ============================================================
// Autonomous UK Master Hospital Outreach Engine (All Categorized Tiers)
// Specialized NHS & Private Healthcare Telemetry Dispatches via Google SMTP
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

const UK_DATABASE_FILE = path.join(__dirname, 'MASTER_UK_HOSPITALS_COMPREHENSIVE_DATABASE.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

const SENDER_NAME = process.env.SENDER_NAME || 'Mharc Gatan - Linkable Systems';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com';

const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'mckinsyo01@gmail.com',
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomJitter = (min = 5500, max = 9000) => Math.floor(Math.random() * (max - min + 1)) + min;

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

function buildUKPitch(target) {
  const trust = target.trust_name;
  const dm = target.decision_maker || 'Chief Digital Information Officer & Clinical Informatics Team';
  const dmFirstName = dm.split(' ')[0].replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/, '');
  const epr = target.core_epr || 'EPR';
  const sites = target.hospital_sites ? ` across ${target.hospital_sites}` : '';
  const isPrivate = target.category.includes('Private');

  let subject = '';
  let text = '';

  if (isPrivate) {
    subject = `Acute Clinical Telemetry & Perpetual ${epr} Architecture for ${trust}`;
    text = `Dear ${dmFirstName},

I am reaching out regarding ${trust}'s clinical physiological telemetry infrastructure and high-acuity patient monitoring.

Proprietary vendor ecosystems often demand continuous subscription escalations while restricting acute bedside waveforms to closed proprietary networks.

We engineered Clinical Pristine ICU OS — an enterprise, self-hosted perpetual clinical telemetry architecture designed for sub-second HL7/FHIR interoperability and 100% private data sovereignty:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Core Clinical Capabilities:
• 📈 60fps Multi-Lead Waveforms (Real-Time Arterial Line, Multi-Vector ECG, SpO2)
• 💊 5-Rights Closed-Loop eMAR & High-Risk Dual-Witnessing
• 🔄 Bi-Directional ${epr} Telemetry Synchronization via Open FHIR APIs
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / Private Cloud Deployable)

We are offering dedicated 48-Hour Sandbox Access for your clinical informatics and digital technology team. Would you be open to a brief 10-minute technical demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  } else {
    subject = `EPR Telemetry & NHS Interoperability Architecture for ${trust}`;
    text = `Dear ${dmFirstName},

I am reaching out regarding ${trust}'s digital clinical telemetry pipelines${sites} and ${epr} interoperability architecture.

As NHS trusts advance under the Frontline Digitisation Programme, legacy proprietary clinical monitors often silo vital signs and acute waveforms, creating vendor lock-in and steep recurring license overheads.

We engineered Clinical Pristine ICU OS — an enterprise, self-hosted perpetual clinical architecture engineered for sub-second HL7/FHIR telemetry and uncompromising Caldicott Guardian data sovereignty:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Core Technical Capabilities for NHS Acute Trusts:
• 📈 60fps Real-Time ICU Waveforms (Arterial Line, Multi-lead ECG, SpO2)
• 💊 5-Rights eMAR Narcotic Dual-Witness Verification
• 🔄 Bi-Directional ${epr} Interoperability via Open HL7 / FHIR Standards
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / NHS Trust Private Cloud Deployable)
• 💰 Perpetual Architecture (Zero Recurring Per-Bed Annual SaaS Tax)

We are offering dedicated 48-Hour Sandbox Access for your digital transformation, CCIO, and clinical informatics team. Would you be open to a brief 10-minute technical demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;
  }

  return { subject, text };
}

async function runUKMasterEngine() {
  console.log('='.repeat(70));
  console.log('🇬🇧 AUTONOMOUS UK MASTER HOSPITAL OUTREACH ENGINE');
  console.log('🏥 All Categorized Tiers: Giants, Specialists, Acute, Private & NHP');
  console.log('🛡️ Google SMTP Enterprise Pipeline | DNS MX Pre-Flight Verification');
  console.log('='.repeat(70));

  const allHospitals = loadJson(UK_DATABASE_FILE);
  const logs = loadJson(LOG_FILE);

  const dispatchedEmails = new Set(logs.map((l) => (l.email || '').toLowerCase().trim()));

  const queue = [];
  const seenEmails = new Set();

  for (const h of allHospitals) {
    const email = (h.sample_email || '').toLowerCase().trim();
    if (email && !dispatchedEmails.has(email) && h.status !== 'DELIVERED' && !seenEmails.has(email)) {
      seenEmails.add(email);
      queue.push(h);
    }
  }

  console.log(`\n📊 Queue Loaded: ${queue.length} UK Hospital targets pending verified dispatch.`);
  console.log('🚀 Starting continuous execution...\n');

  let successCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const target = queue[i];
    const email = (target.sample_email || '').toLowerCase().trim();
    const domain = email.split('@')[1];

    if (!domain) {
      skippedCount++;
      continue;
    }

    // Pre-flight DNS verification
    const mx = await resolveMxAsync(domain);
    if (!mx.valid) {
      console.log(`❌ [${i + 1}/${queue.length}] SKIPPED: ${email} - Dead MX (${mx.reason})`);
      skippedCount++;
      continue;
    }

    const { subject, text } = buildUKPitch(target);

    console.log(`\n📤 [${i + 1}/${queue.length}] (${target.category}) Dispatching to: ${target.trust_name}`);
    console.log(`   👤 ${target.decision_maker} | ✉️ ${email}`);
    console.log(`   🛡️ MX Host: ${mx.host}`);

    try {
      const info = await transporter.sendMail({
        from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
        to: email,
        subject,
        text
      });

      console.log(`   ✨ Successfully Delivered! MessageId: ${info.messageId}`);
      successCount++;

      appendLog({
        type: 'UK_MASTER_HOSPITAL_DISPATCH',
        category: target.category,
        trust: target.trust_name,
        decision_maker: target.decision_maker,
        email: email,
        beds: target.beds,
        epr: target.core_epr,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      // Update UK Database file
      const item = allHospitals.find((x) => x.id === target.id);
      if (item) {
        item.status = 'DELIVERED';
        item.deliveredAt = new Date().toISOString();
        item.messageId = info.messageId;
        saveJson(UK_DATABASE_FILE, allHospitals);
      }

      // Safe human jitter
      const jitter = getRandomJitter(5500, 8500);
      console.log(`   ⏳ Jitter delay (${(jitter / 1000).toFixed(1)}s)...`);
      await sleep(jitter);
    } catch (err) {
      console.error(`   ❌ Dispatch Error for ${email}: ${err.message}`);
      if (err.message.includes('too many messages') || err.message.includes('quota') || err.message.includes('554')) {
        console.warn('   ⚠️ SMTP rate limit detected. Backing off for 60s before resuming...');
        await sleep(60000);
      }
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('🏁 UK MASTER HOSPITAL OUTREACH RUN FINISHED');
  console.log(`✨ Delivered: ${successCount} | ❌ Skipped/Dead: ${skippedCount} | Total: ${queue.length}`);
  console.log('='.repeat(70));
}

runUKMasterEngine().catch(console.error);
