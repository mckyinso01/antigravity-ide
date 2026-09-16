// ============================================================
// Autonomous ClaimGuard Hospital Addendum Engine (Touchpoint 2)
// Weaving ClaimGuard AI into the 103 Delivered UK Acute Trusts & Boards
// Connecting Clinical Pristine ICU Telemetry to Insurance Denial Defense
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

const DB1_FILE = path.join(__dirname, 'MASTER_UK_HOSPITALS_COMPREHENSIVE_DATABASE.json');
const DB2_FILE = path.join(__dirname, 'UK_HOSPITALS_BATCH_2_EXHAUSTIVE_DATABASE.json');
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

function buildClaimGuardAddendumPitch(target) {
  const trust = target.trust_name;
  const dm = target.decision_maker || 'Chief Digital Information Officer & Clinical Informatics Team';
  const dmFirstName = dm.split(' ')[0].replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s*/, '');
  const epr = target.core_epr || 'EPR';
  const sites = target.hospital_sites ? ` across ${target.hospital_sites}` : '';

  const subject = `Addendum: Linking ICU Telemetry to Insurance Denial Defense (ClaimGuard AI) — ${trust}`;
  const text = `Dear ${dmFirstName},

Following up on my earlier note regarding ${trust}'s clinical ICU telemetry pipelines${sites} and ${epr} interoperability:

In discussions with acute hospital and trust leadership, a critical operational friction point is that high-acuity interventions and complex inpatient stays experience severe insurance claim denials and delayed adjudications from commercial payers, Private Patient Units (PPU), and reciprocal health billing programs.

Often, claims are denied (CO-50 medical necessity, downcoding, or unbundled care) simply because bedside physiological evidence is locked inside clinical monitors and not tied directly to billing packets.

To eliminate this revenue drain, we integrated ClaimGuard AI directly with Clinical Pristine:
👉 Live Interactive Adjudication Sandbox: https://claimguard.linkable.it.com
👉 Live Clinical Telemetry Sandbox: https://clinical.linkable.it.com

How the Dual Architecture Protects ${trust}'s Operating Margins:
• 🛡️ Direct Telemetry-to-Billing Validation: Automatically links 60fps bedside ICU waveforms, vitals, and 5-rights eMAR narcotic administration timestamps into inpatient claim lines.
• ⚡ Sub-Second Denial Prediction: Audits ANSI X12 837/835 claim files prior to submission against insurer-specific clinical policy bulletins with 99.4% first-pass clean claim accuracy.
• 📑 Automated 1-Click Appeal Packets: Generates tamper-proof medical necessity appeal dossiers grounded in objective physiological data, eliminating weeks of manual clinician and billing dispute overhead.
• 💰 Zero Contingency / Perpetual Ownership: Delivered as a self-hosted perpetual enterprise architecture with zero recurring annual per-bed licensing taxes.

We can activate a synchronized 48-Hour Sandbox for your digital transformation team, CCIO, and Finance / Revenue Cycle Management (RCM) leadership to evaluate both platforms side-by-side.

Would you be open to a brief 10-minute demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  return { subject, text };
}

async function runClaimGuardAddendumEngine() {
  console.log('='.repeat(75));
  console.log('🛡️ AUTONOMOUS CLAIMGUARD HOSPITAL ADDENDUM ENGINE (TOUCHPOINT 2)');
  console.log('🏥 Weaving ClaimGuard AI into 103 Delivered UK Acute Trusts & Boards');
  console.log('🔗 Bridging Clinical Pristine ICU Telemetry to Insurance Denial Defense');
  console.log('🛡️ Google SMTP Enterprise Pipeline | DNS MX Pre-Flight Verification');
  console.log('='.repeat(75));

  const db1 = loadJson(DB1_FILE);
  const db2 = loadJson(DB2_FILE);
  const logs = loadJson(LOG_FILE);

  const alreadySent = new Set(
    logs
      .filter((l) => l.type === 'CLAIM_GUARD_HOSPITAL_ADDENDUM')
      .map((l) => (l.email || '').toLowerCase().trim())
  );

  const queue = [];
  const seenEmails = new Set();

  // Load from DB1
  for (const h of db1) {
    if (h.status === 'DELIVERED') {
      const email = (h.sample_email || '').toLowerCase().trim();
      if (email && !alreadySent.has(email) && !seenEmails.has(email)) {
        seenEmails.add(email);
        queue.push({ ...h, _db: 'DB1' });
      }
    }
  }

  // Load from DB2
  for (const h of db2) {
    if (h.status === 'DELIVERED') {
      const email = (h.sample_email || '').toLowerCase().trim();
      if (email && !alreadySent.has(email) && !seenEmails.has(email)) {
        seenEmails.add(email);
        queue.push({ ...h, _db: 'DB2' });
      }
    }
  }

  console.log(`\n📊 Queue Loaded: ${queue.length} Delivered UK Hospital targets pending ClaimGuard Addendum.`);
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

    // Pre-flight DNS verification
    const mx = await resolveMxAsync(domain);
    if (!mx.valid) {
      console.log(`❌ [${i + 1}/${queue.length}] SKIPPED: ${email} (${target.trust_name}) - Dead MX (${mx.reason})`);
      skippedCount++;
      continue;
    }

    const { subject, text } = buildClaimGuardAddendumPitch(target);

    console.log(`\n📤 [${i + 1}/${queue.length}] [Touchpoint 2] Dispatching ClaimGuard Addendum to: ${target.trust_name}`);
    console.log(`   👤 ${target.decision_maker} | ✉️ ${email}`);
    console.log(`   🛡️ MX Host: ${mx.host} | 🏥 EPR: ${target.core_epr}`);

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
        type: 'CLAIM_GUARD_HOSPITAL_ADDENDUM',
        trust: target.trust_name,
        decision_maker: target.decision_maker,
        email: email,
        core_epr: target.core_epr,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      // Update source DB
      if (target._db === 'DB1') {
        const item = db1.find((x) => x.id === target.id);
        if (item) {
          item.claimGuardAddendumSent = true;
          item.claimGuardAddendumAt = new Date().toISOString();
          item.claimGuardMessageId = info.messageId;
          saveJson(DB1_FILE, db1);
        }
      } else if (target._db === 'DB2') {
        const item = db2.find((x) => x.id === target.id);
        if (item) {
          item.claimGuardAddendumSent = true;
          item.claimGuardAddendumAt = new Date().toISOString();
          item.claimGuardMessageId = info.messageId;
          saveJson(DB2_FILE, db2);
        }
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
  console.log('🏁 CLAIMGUARD HOSPITAL ADDENDUM RUN COMPLETE');
  console.log(`✨ Delivered: ${successCount} | ❌ Skipped/Dead: ${skippedCount} | Total Processed: ${queue.length}`);
  console.log('='.repeat(75));
}

runClaimGuardAddendumEngine().catch(console.error);
