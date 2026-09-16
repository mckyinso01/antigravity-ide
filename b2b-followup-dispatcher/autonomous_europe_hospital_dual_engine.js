// ============================================================
// Autonomous European Hospital Groups Dual Outreach Engine
// Germany (6) | France (3) | Switzerland (2) | Spain (3) | Italy (2) | Netherlands (2) | Sweden (1) | Austria (1)
// Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture
// High-Inquiry Trigger Hooks | Google SMTP Enterprise Pipeline
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

const EU_DATABASE_FILE = path.join(__dirname, 'EUROPE_HOSPITALS_DUAL_DATABASE.json');
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

function buildEuropePitch(target) {
  const hospital = target.hospital_name;
  const dm = target.decision_maker || 'Chief Information Officer & Digital Health Directorate';
  const dmFirstName = dm.split(' ')[0].replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.|Herr|Frau|Monsieur|Madame)\s*/, '');
  const ehr = target.core_ehr || 'Clinical Hospital EHR';
  const painPoint = target.pain_point;
  const country = target.country;
  const facilityCount = target.facility_count || 'acute healthcare facilities';

  const subject = `Enterprise Dual Architecture: ICU Telemetry Interoperability & Revenue Defense for ${hospital}`;
  const text = `Dear ${dmFirstName},

I am contacting your office regarding ${hospital}'s acute bedside physiological telemetry architecture across ${facilityCount} and ${ehr} clinical interoperability roadmap.

As leading health systems in ${country} navigate stringent digital mandates and payer audit pressures, leadership faces two critical operational bottlenecks:
1. Vendor Waveform Silos: Proprietary bedside monitor manufacturers lock acute ICU vitals into closed hardware networks, charging exorbitant recurring license fees per bed.
2. Inpatient Adjudication & Audit Frictions: Complex inpatient admissions face increasing insurer documentation disputes, requiring hundreds of clinical hours to justify intensive care coding.

To resolve both challenges simultaneously, Linkable Systems engineered a dual-pillar sovereign clinical architecture:

🏥 PILLAR 1: Clinical Pristine ICU OS (Clinical Telemetry Layer)
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com
• 📈 60fps Real-Time ICU Waveforms (Multi-Lead ECG, Arterial Line, SpO2 Plethysmograph)
• 💊 5-Rights Closed-Loop eMAR with Narcotic Dual-Witness Protocol
• 🔄 Bi-Directional ${ehr} Interoperability via Open HL7 / FHIR APIs
• 🛡️ 100% On-Premise / Sovereign European Private Cloud Deployable (GDPR / Swiss FADP / C5 Compliant)

🛡️ PILLAR 2: ClaimGuard AI (Revenue & Administrative Defense Layer)
👉 Live Denial Adjudication Sandbox: https://claimguard.linkable.it.com
• ⚡ Pre-Submission Clinical Verification cross-referencing inpatient billable codes directly with verified bedside ICU telemetry timestamps
• 🎯 Automated Inpatient Claim & Encounter Auditing against statutory and private health insurance reimbursement rules
• 📑 1-Click Objective Clinical Dossier Generation eliminating manual doctor/nursing audit defense overhead
• 💰 Perpetual Enterprise License (Zero Recurring Annual SaaS Seat Tax)
• 🎯 Tailored Solution: ${painPoint}

🚀 HOW TO START A 48-HOUR ZERO-RISK TEST:
We have provisioned dedicated 48-Hour Sandbox Environments for your clinical IT, CCIO, and finance teams to test live HL7/FHIR telemetry streams.

👉 Simply reply "SANDBOX" or "DEMO" to this email, and our systems engineering team will provision your credentials and technical whitepaper within 2 hours.

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  return { subject, text };
}

async function runEuropeEngine() {
  console.log('='.repeat(75));
  console.log('🇪🇺 AUTONOMOUS EUROPEAN PRIVATE & ACUTE HOSPITALS DUAL OUTREACH ENGINE');
  console.log('🏥 Germany | France | Switzerland | Spain | Italy | Netherlands | Nordics');
  console.log('🔗 Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture');
  console.log('🛡️ Google SMTP Enterprise Pipeline | DNS MX Pre-Flight Verification');
  console.log('='.repeat(75));

  const allChains = loadJson(EU_DATABASE_FILE);
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

  console.log(`\n📊 Queue Loaded: ${queue.length} European Hospital targets pending verified dispatch.`);
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
      console.log(`❌ [${i + 1}/${queue.length}] SKIPPED: ${email} (${target.hospital_name}) - Dead MX (${mx.reason})`);
      skippedCount++;
      
      const item = allChains.find((x) => x.id === target.id);
      if (item) {
        item.status = 'SKIPPED_DEAD_MX';
        item.skipReason = mx.reason;
        saveJson(EU_DATABASE_FILE, allChains);
      }
      continue;
    }

    const { subject, text } = buildEuropePitch(target);

    console.log(`\n📤 [${i + 1}/${queue.length}] [${target.country}] Dispatching Dual-Pitch to: ${target.hospital_name}`);
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
        type: 'EUROPE_HOSPITAL_DUAL_DISPATCH',
        country: target.country,
        hospital_name: target.hospital_name,
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
        saveJson(EU_DATABASE_FILE, allChains);
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
  console.log('🏁 EUROPEAN HOSPITAL GROUPS DUAL OUTREACH RUN COMPLETE');
  console.log(`✨ Delivered: ${successCount} | ❌ Skipped/Dead: ${skippedCount} | Total Processed: ${queue.length}`);
  console.log('='.repeat(75));
}

runEuropeEngine().catch(console.error);
