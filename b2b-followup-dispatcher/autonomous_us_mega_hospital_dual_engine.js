// ============================================================
// Autonomous US Mega-Hospital Chains Dual-Pitch Engine
// The Top 20 Multi-Billion Dollar US Healthcare Networks
// Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture
// Google SMTP Pipeline | DNS MX Pre-Flight Verification
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

const US_DATABASE_FILE = path.join(__dirname, 'US_MEGA_HOSPITALS_DUAL_DATABASE.json');
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
const getRandomJitter = (min = 5500, max = 8500) => Math.floor(Math.random() * (max - min + 1)) + min;

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

function buildUSMegaPitch(target) {
  const system = target.system_name;
  const dm = target.decision_maker || 'Chief Information Officer & Revenue Cycle Leadership';
  const dmFirstName = dm.split(' ')[0].replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/, '');
  const ehr = target.core_ehr || 'EHR';
  const hCount = target.hospitals_count;
  const painPoint = target.pain_point;

  const subject = `Dual Architecture: ICU Bedside Telemetry & Commercial Denial Defense for ${system}`;
  const text = `Dear ${dmFirstName},

I am writing regarding ${system}'s clinical monitoring infrastructure across ${hCount} and the growing revenue friction surrounding commercial insurance inpatient claim denials.

In enterprise health systems, clinical informatics and revenue cycle teams face two compounding structural bottlenecks:
1. Bedside Telemetry Silos: Proprietary bedside monitors lock waveforms and vitals into closed vendor networks with steep recurring per-bed license fees.
2. Inpatient Claim Denials: High-acuity ICU and complex surgical stays experience the highest commercial denial rates (CO-50 medical necessity, downcoding, and unbundled service disputes) due to delayed or missing bedside physiological justification.

To bridge this divide, we engineered an integrated dual-engine enterprise hospital architecture:

🏥 PILLAR 1: Clinical Pristine ICU OS (Clinical Layer)
👉 Live Telemetry Sandbox: https://clinical.linkable.it.com
• 📈 60fps Real-Time ICU Waveforms (Multi-Lead ECG, Arterial Line, SpO2 Plethysmograph)
• 💊 5-Rights Closed-Loop eMAR with High-Risk Narcotic Dual-Witness Protocol
• 🔄 Bi-Directional ${ehr} Interoperability via Open HL7 / FHIR APIs
• 🛡️ 100% On-Premise / Private Cloud Sovereignty (Zero Cloud PHI Leakage / HIPAA Hardened)

🛡️ PILLAR 2: ClaimGuard AI (Revenue Cycle & Denial Defense Layer)
👉 Live Adjudication Sandbox: https://claimguard.linkable.it.com
• ⚡ Pre-Submission ANSI X12 837/835 Claim Audits linked directly to verified bedside telemetry and eMAR timestamps
• 🎯 Sub-Second Commercial Insurer (UHC, Humana, Elevance, Aetna, Cigna) and Medicare Advantage Denial Prediction
• 📑 Automated 1-Click Medical Necessity Appeal Dossiers with objective physiological telemetry proof under ERISA Section 502 statutory guidelines
• 💰 Self-Hosted Perpetual Enterprise Architecture (Zero Recurring Percentage-of-Collections SaaS Tax)
• 🎯 Solves: ${painPoint}

We are offering dedicated 48-Hour Sandbox Access for your digital transformation, CCIO, and Revenue Cycle Management (RCM) leadership to test both platforms in a synchronized environment.

Would you be open to a brief 10-minute technical walkthrough this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  return { subject, text };
}

async function runUSMegaEngine() {
  console.log('='.repeat(75));
  console.log('🇺🇸 AUTONOMOUS US MEGA-HOSPITAL CHAINS DUAL OUTREACH ENGINE');
  console.log('🏥 Top 20 Multi-Billion Dollar US Healthcare Networks');
  console.log('🔗 Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture');
  console.log('🛡️ Google SMTP Enterprise Pipeline | DNS MX Pre-Flight Verification');
  console.log('='.repeat(75));

  const allChains = loadJson(US_DATABASE_FILE);
  const logs = loadJson(LOG_FILE);

  const dispatchedEmails = new Set(logs.map((l) => (l.email || '').toLowerCase().trim()));

  const queue = [];
  const seenEmails = new Set();

  for (const h of allChains) {
    const email = (h.sample_email || '').toLowerCase().trim();
    if (email && !dispatchedEmails.has(email) && h.status !== 'DELIVERED' && !seenEmails.has(email)) {
      seenEmails.add(email);
      queue.push(h);
    }
  }

  console.log(`\n📊 Queue Loaded: ${queue.length} US Mega-Chain targets pending verified dispatch.`);
  console.log('🚀 Starting autonomous execution...\n');

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

    // Pre-flight DNS MX verification
    const mx = await resolveMxAsync(domain);
    if (!mx.valid) {
      console.log(`❌ [${i + 1}/${queue.length}] SKIPPED: ${email} (${target.system_name}) - Dead MX (${mx.reason})`);
      skippedCount++;
      
      const item = allChains.find((x) => x.id === target.id);
      if (item) {
        item.status = 'SKIPPED_DEAD_MX';
        item.skipReason = mx.reason;
        saveJson(US_DATABASE_FILE, allChains);
      }
      continue;
    }

    const { subject, text } = buildUSMegaPitch(target);

    console.log(`\n📤 [${i + 1}/${queue.length}] Dispatching Dual-Pitch to: ${target.system_name}`);
    console.log(`   👤 ${target.decision_maker} | ✉️ ${email}`);
    console.log(`   🛡️ MX Host: ${mx.host} | 🏥 Beds: ${target.beds} | EHR: ${target.core_ehr}`);

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
        type: 'US_MEGA_HOSPITAL_DUAL_DISPATCH',
        system_name: target.system_name,
        decision_maker: target.decision_maker,
        email: email,
        beds: target.beds,
        ehr: target.core_ehr,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      // Update source DB
      const item = allChains.find((x) => x.id === target.id);
      if (item) {
        item.status = 'DELIVERED';
        item.deliveredAt = new Date().toISOString();
        item.messageId = info.messageId;
        saveJson(US_DATABASE_FILE, allChains);
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

  console.log('\n' + '='.repeat(75));
  console.log('🏁 US MEGA-HOSPITAL CHAINS DUAL OUTREACH RUN COMPLETE');
  console.log(`✨ Delivered: ${successCount} | ❌ Skipped/Dead: ${skippedCount} | Total Processed: ${queue.length}`);
  console.log('='.repeat(75));
}

runUSMegaEngine().catch(console.error);
