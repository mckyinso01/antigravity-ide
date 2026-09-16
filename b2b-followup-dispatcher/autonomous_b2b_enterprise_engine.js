// ============================================================
// Autonomous B2B Enterprise Revenue Engine (92 Pending Targets)
// High-Converting Multi-Industry Outreach with Google SMTP & Pre-Flight DNS Armor
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

const LEADS_FILE = path.join(__dirname, 'src', 'leads.json');
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
const getRandomJitter = (min = 5000, max = 8500) => Math.floor(Math.random() * (max - min + 1)) + min;

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

function buildB2BPitch(lead) {
  const company = lead.company || lead.organization || 'Enterprise Team';
  const name = (lead.executiveName || lead.name || 'Decision Maker').split('(')[0].trim();
  const campaign = (lead.campaign || '').toLowerCase();
  const demoUrl = lead.demoUrl || 'https://linkable.it.com';
  const hook = lead.priorityHook || '';

  let subject = '';
  let text = '';

  if (campaign.includes('pharmaguard')) {
    subject = `Automated Cold Chain Telemetry & USP 1079 Compliance for ${company}`;
    text = `Dear ${name},

I am reaching out regarding ${company}'s cold storage temperature logging and FDA 21 CFR Part 11 / USP 1079 audit readiness.

Manual temperature logging creates compliance vulnerabilities during regulatory inspections and risks expensive inventory spoilage.

We engineered PharmaGuard — an enterprise automated cold-chain telemetry architecture featuring instant multi-channel excursion alerts, cryptographically signed audit trails, and sub-10ms sensor verification:
👉 Live Interactive Telemetry Sandbox: ${demoUrl}

Key Capabilities:
• 🌡️ 24/7 Automated IoT Temperature & Humidity Telemetry
• 🛡️ 100% FDA 21 CFR Part 11 Electronic Signature Compliance
• 🚨 Instant Real-Time Excursion Escalations (SMS, Webhook, Call)
• 📊 1-Click Automated Regulatory Audit Reporting

We are providing 48-Hour Sandbox Access for your operations and quality assurance team. Would you be open to a brief 10-minute technical demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  } else if (campaign.includes('sitesafe') || campaign.includes('structura')) {
    subject = `Automated Weather Delay Claims & Telemetry Architecture for ${company}`;
    text = `Dear ${name},

I am reaching out regarding ${company}'s commercial project schedules and delay dispute mitigation.

Weather-related disputes and liquidated damages often arise when delay claims lack verifiable, tamper-proof meteorological documentation.

We engineered SiteSafe / Structura — an automated construction risk intelligence engine connected directly to NOAA / Pagasa meteorological pipelines with critical path CPM Gantt synchronization:
👉 Live Interactive Telemetry Sandbox: ${demoUrl}

Key Capabilities:
• 🌧️ Automated Tamper-Proof Weather Delay Claim Certification
• 📅 Real-Time Critical Path CPM Schedule Synchronization
• 🛡️ Direct Liquidated Damages & Contractor Risk Mitigation
• 📑 1-Click Certified Legal Dispute Packets

We are offering dedicated sandbox access for your project management and commercial operations team. Would you be open to a quick 10-minute walkthrough this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  } else if (campaign.includes('saccade')) {
    subject = `Predictive Visual CRO & Gaze Saccade Architecture for ${company}`;
    text = `Dear ${name},

I am reaching out regarding ${company}'s digital conversion funnels and acquisition efficiency.

Rising Meta and Google acquisition costs make pre-checkout drop-offs increasingly expensive for high-growth brands.

We engineered Saccade AI — a predictive visual attention and gaze tracking engine that audits visual hierarchy, friction points, and checkout paths before ad spend is committed:
👉 Live Interactive Optimization Sandbox: ${demoUrl}

Key Capabilities:
• 👁️ Sub-Second Predictive Gaze Heatmaps (94% Correlation to Eye-Tracking)
• 🛒 Frictionless Checkout & Cart Drop-Off Remediation
• 📈 Measurable Conversion Rate Uplift (15% - 32% Proven Increase)
• ⚡ 1-Click Visual Hierarchy Audit & Redesign Prototypes

We are offering a complimentary baseline CRO audit for ${company}. Would you be open to a brief 10-minute review of our findings this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  } else {
    // General Enterprise / Marketplace / Healthcare
    subject = `Custom Architecture & Automated Systems Implementation for ${company}`;
    text = `Dear ${name},

I am reaching out regarding ${company}'s enterprise system modernization and custom platform infrastructure.

${hook ? `Context: ${hook}\n\n` : ''}We build high-performance, custom enterprise software platforms engineered for maximum scalability, data sovereignty, and zero ongoing vendor lock-in:
👉 Live Interactive Portfolio & Production Platforms: https://linkable.it.com

Core Engineering Capabilities:
• ⚡ Sub-Second Real-Time Data Pipelines & WebSockets
• 🛡️ Bank-Grade Security & Custom Payment / Escrow Multi-Vendor Architecture
• 📱 Zero-Latency Progressive Web Apps & Native Client Interfaces
• ☁️ Dedicated Self-Hosted / Private Cloud Deployment Options

Would you be open to a brief 10-minute technical demonstration of our production architecture this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;
  }

  return { subject, text };
}

async function runB2BEngine() {
  console.log('='.repeat(70));
  console.log('🚀 AUTONOMOUS B2B ENTERPRISE REVENUE ENGINE (92 PENDING TARGETS)');
  console.log('🛡️ Google SMTP Enterprise Pipeline | DNS MX Pre-Flight Verification');
  console.log('='.repeat(70));

  const allLeads = loadJson(LEADS_FILE);
  const logs = loadJson(LOG_FILE);

  const dispatchedEmails = new Set(logs.map((l) => (l.email || '').toLowerCase().trim()));

  const queue = [];
  const seenEmails = new Set();

  for (const l of allLeads) {
    const email = (l.email || '').toLowerCase().trim();
    if (email && !dispatchedEmails.has(email) && l.status !== 'SENT' && !seenEmails.has(email)) {
      seenEmails.add(email);
      queue.push(l);
    }
  }

  console.log(`\n📊 Queue Loaded: ${queue.length} B2B Enterprise targets pending verified dispatch.`);
  console.log('🚀 Starting continuous execution...\n');

  let successCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const target = queue[i];
    const email = (target.email || '').toLowerCase().trim();
    const domain = email.split('@')[1];

    if (!domain) {
      skippedCount++;
      continue;
    }

    // Pre-flight DNS MX verification
    const mx = await resolveMxAsync(domain);
    if (!mx.valid) {
      console.log(`❌ [${i + 1}/${queue.length}] SKIPPED: ${email} - Dead MX (${mx.reason})`);
      skippedCount++;
      continue;
    }

    const { subject, text } = buildB2BPitch(target);

    console.log(`\n📤 [${i + 1}/${queue.length}] (${target.campaign || 'B2B'}) Dispatching to: ${target.company || target.organization}`);
    console.log(`   👤 ${target.executiveName || target.name || 'Decision Maker'} | ✉️ ${email}`);
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
        type: 'B2B_ENTERPRISE_DISPATCH',
        leadId: target.id,
        campaign: target.campaign || 'B2B',
        company: target.company || target.organization,
        name: target.executiveName || target.name,
        email: email,
        budget: target.budget,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      // Update leads.json status
      const item = allLeads.find((x) => x.id === target.id || (x.email && x.email.toLowerCase().trim() === email));
      if (item) {
        item.status = 'SENT';
        item.lastDispatchedAt = new Date().toISOString();
        item.lastMessageId = info.messageId;
        saveJson(LEADS_FILE, allLeads);
      }

      // Safe human jitter
      const jitter = getRandomJitter(5000, 8500);
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
  console.log('🏁 B2B ENTERPRISE OUTREACH RUN FINISHED');
  console.log(`✨ Delivered: ${successCount} | ❌ Skipped/Dead: ${skippedCount} | Total: ${queue.length}`);
  console.log('='.repeat(70));
}

runB2BEngine().catch(console.error);
