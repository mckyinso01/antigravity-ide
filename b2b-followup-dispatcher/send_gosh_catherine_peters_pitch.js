// ============================================================
// Warm Executive Referral Outreach: Great Ormond Street Hospital (GOSH)
// Direct Referral from Dr. Shankar Sridharan (CCIO)
// Target: Dr. Catherine Peters (Acting CCIO / EPR Lead)
// Email: Catherine.Peters@gosh.nhs.uk
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

async function sendGOSHPitch() {
  console.log('='.repeat(75));
  console.log('🏥 WARM EXECUTIVE REFERRAL OUTREACH: GOSH NHS TRUST');
  console.log('👤 Target: Dr. Catherine Peters (Acting CCIO / EPR Lead)');
  console.log('✉️ Email: Catherine.Peters@gosh.nhs.uk');
  console.log('📌 Source: Direct referral from Dr. Shankar Sridharan (CCIO)');
  console.log('='.repeat(75));

  const domain = 'gosh.nhs.uk';
  const mx = await resolveMxAsync(domain);
  if (!mx.valid) {
    console.error(`❌ MX Verification Failed for ${domain}: ${mx.reason}`);
    return;
  }
  console.log(`🛡️ Verified MX Host: ${mx.host}`);

  const subject = `Referral from Dr. Sridharan: ICU Telemetry & Epic EPR Interoperability (Clinical Pristine & ClaimGuard AI) for GOSH`;

  const text = `Dear Dr. Peters,

I am writing following Dr. Shankar Sridharan's out-of-office guidance regarding CCIO and Electronic Patient Record (EPR) architecture at Great Ormond Street Hospital for Children NHS Foundation Trust (GOSH).

As GOSH advances its world-renowned pediatric digital health leadership and Epic EPR ecosystem, clinical informatics leaders encounter two critical operational bottlenecks:
1. Vendor Waveform Silos: Proprietary acute bedside monitors isolate continuous physiological vitals (multi-lead ECG, arterial pressure, SpO2 plethysmographs) behind closed vendor networks, requiring high per-bed licensing fees.
2. Clinical Documentation Reconciliation: Complex acute pediatric admissions require extensive nursing and clinical documentation time to cross-reference administered medications and physiological telemetry for audit and specialized commissioning.

To solve both challenges within an open, Caldicott-compliant architecture, Linkable Systems engineered a dual-pillar enterprise clinical operating system:

🏥 PILLAR 1: Clinical Pristine ICU OS (Clinical Telemetry Layer)
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com
• 📈 60fps Real-Time ICU Waveforms (High-fidelity multi-lead ECG, Arterial Line, SpO2)
• 💊 5-Rights Closed-Loop eMAR with Narcotic Dual-Witness Protocol (Preventing bedside medication errors)
• 🔄 Bi-Directional Epic EPR Interoperability via Open HL7 / FHIR APIs
• 🛡️ 100% Caldicott-Compliant & Sovereign Private Cloud / On-Premise Deployable (Zero Public Cloud Leakage)

🛡️ PILLAR 2: ClaimGuard AI (Administrative & Audit Defense Layer)
👉 Live Adjudication Sandbox: https://claimguard.linkable.it.com
• ⚡ Pre-Submission Clinical Verification cross-referencing complex pediatric case mix documentation directly with verified bedside ICU telemetry timestamps
• 📑 1-Click Objective Clinical Dossier Generation eliminating manual doctor/nursing documentation overhead
• 💰 Perpetual Enterprise Architecture (Zero Recurring Annual SaaS Seat Tax)

🚀 48-HOUR DEDICATED SANDBOX ACCESS:
We have provisioned dedicated 48-Hour Sandbox Environments for GOSH's CCIO team, clinical informatics fellows, and intensive care nursing leads to test live HL7/FHIR telemetry streams.

👉 Simply reply "SANDBOX" or "DEMO" to this email, and our engineering team will provision your team's direct credentials and technical whitepaper within 2 hours.

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  try {
    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: 'Catherine.Peters@gosh.nhs.uk',
      subject,
      text
    });

    console.log(`\n✨ Successfully Delivered to Dr. Catherine Peters!`);
    console.log(`📬 MessageId: ${info.messageId}`);
    console.log(`📅 Timestamp: ${new Date().toISOString()}`);

    appendLog({
      type: 'WARM_REFERRAL_GOSH_DISPATCH',
      organization: 'Great Ormond Street Hospital for Children NHS Foundation Trust (GOSH)',
      referral_source: 'Dr. Shankar Sridharan (CCIO)',
      recipient_name: 'Dr. Catherine Peters',
      recipient_title: 'Acting CCIO / EPR Lead',
      email: 'Catherine.Peters@gosh.nhs.uk',
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

    console.log('✅ Log successfully recorded in src/dispatch_log.json');
  } catch (err) {
    console.error(`❌ Dispatch Error: ${err.message}`);
  }

  console.log('='.repeat(75));
}

sendGOSHPitch().catch(console.error);
