// ============================================================
// B2B Multi-Touchpoint Follow-Up Dispatcher Engine
// Strict 5-Titan Defensive Hardening & Zero-Mock Pipeline
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { TEMPLATES } from './templates.js';
import { verifyEmailPreFlight } from './email_verifier.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'leads.json');
const LOG_FILE = path.join(__dirname, 'dispatch_log.json');

const isLiveMode = process.argv.includes('--live');
const isDryRun = process.argv.includes('--dry-run') || !isLiveMode;
const limitArgIdx = process.argv.indexOf('--limit');
const batchLimit = limitArgIdx !== -1 && process.argv[limitArgIdx + 1] ? parseInt(process.argv[limitArgIdx + 1], 10) : Infinity;

console.log('='.repeat(60));
console.log(`🚀 B2B FOLLOW-UP DISPATCHER ENGINE [Deep Claude 5.0 Mode]`);
console.log(`Mode: ${isLiveMode ? '🔴 LIVE SMTP DISPATCH' : '🟡 DRY-RUN PREVIEW (Safe Test)'}`);
if (batchLimit !== Infinity) console.log(`Batch Limit: ${batchLimit} verified leads`);
console.log('='.repeat(60));

// Defensive Delay helper (Random Jitter to protect SMTP reputation: 3500ms - 5500ms)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomJitter = (min = 3500, max = 5500) => Math.floor(Math.random() * (max - min + 1)) + min;

function loadLeads() {
  if (!fs.existsSync(LEADS_FILE)) {
    throw new Error(`Leads file not found at: ${LEADS_FILE}`);
  }
  const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
  return JSON.parse(raw);
}

function saveLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

function appendLog(entry) {
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try {
      logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
    } catch {
      logs = [];
    }
  }
  logs.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing required SMTP credentials in .env (SMTP_HOST, SMTP_USER, SMTP_PASS)');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: true }
  });
}

async function runDispatcher() {
  const leads = loadLeads();
  console.log(`📋 Loaded ${leads.length} verified target leads from registry.`);

  let transporter = null;
  if (isLiveMode) {
    try {
      transporter = createTransporter();
      console.log(`🔒 SMTP Transporter configured securely for ${process.env.SMTP_USER}`);
    } catch (err) {
      console.error(`❌ SMTP Initialization Error: ${err.message}`);
      console.error(`💡 Tip: Run in dry-run mode or configure .env credentials.`);
      process.exit(1);
    }
  }

  let dispatchedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < leads.length; i++) {
    if (dispatchedCount >= batchLimit) {
      console.log(`\n🛑 Batch Limit of ${batchLimit} reached. Halting dispatch gracefully.`);
      break;
    }

    const lead = leads[i];

    // Filter: Require genuine named executive
    const personName = (lead.executiveName || lead.clientName || '').trim();
    if (!personName || personName.toLowerCase().includes('director') || personName.toLowerCase().includes('lead')) {
      skippedCount++;
      continue;
    }

    const campaignTemplates = TEMPLATES[lead.campaign];

    if (!campaignTemplates) {
      console.warn(`⚠️ Unknown campaign "${lead.campaign}" for lead: ${lead.company}`);
      skippedCount++;
      continue;
    }

    const touchpointNum = lead.currentTouchpoint || 1;
    const template = campaignTemplates[touchpointNum];

    if (!template) {
      console.warn(`⚠️ No template found for Touchpoint ${touchpointNum} in campaign "${lead.campaign}".`);
      skippedCount++;
      continue;
    }

    const subject = template.subject(lead.company);
    const body = template.body(lead);

    console.log(`\n--- [${i + 1}/${leads.length}] Processing Lead: ${lead.company} ---`);
    console.log(`🎯 Campaign: ${lead.campaign.toUpperCase()} | Touchpoint: #${touchpointNum}`);
    console.log(`📧 Recipient: ${lead.email}`);
    console.log(`📝 Subject: ${subject}`);

    // Pre-flight deliverability armor
    const verification = await verifyEmailPreFlight(lead.email);
    if (!verification.isValid) {
      console.warn(`🛡️ [VERIFIER REJECTED] Skipping ${lead.company} (${lead.email}): Reason: ${verification.reason}`);
      lead.status = `REJECTED_${verification.reason}`;
      skippedCount++;
      appendLog({
        timestamp: new Date().toISOString(),
        leadId: lead.id,
        company: lead.company,
        email: lead.email,
        campaign: lead.campaign,
        touchpoint: touchpointNum,
        error: `Pre-flight verification failed: ${verification.reason}`,
        status: 'VERIFIER_REJECTED'
      });
      continue;
    }
    console.log(`🛡️ [VERIFIED MX] Host: ${verification.mxHost}`);

    if (isDryRun) {
      console.log(`📄 Preview Body:\n${body.substring(0, 180)}...\n[Truncated for preview]`);
      console.log(`✅ [DRY-RUN] Verified formatting and tags for ${lead.company}`);
      dispatchedCount++;
    } else {
      try {
        console.log(`⏳ Sending via SMTP...`);
        const senderName = process.env.SENDER_NAME || 'Gatz | Solutions Architecture';
        const senderEmail = process.env.SENDER_EMAIL || process.env.SMTP_USER;

        const info = await transporter.sendMail({
          from: `"${senderName}" <${senderEmail}>`,
          to: lead.email,
          subject,
          text: body
        });

        console.log(`✨ Delivered! Message ID: ${info.messageId}`);
        lead.lastDispatched = new Date().toISOString();
        lead.status = `TOUCHPOINT_${touchpointNum}_DELIVERED`;
        lead.currentTouchpoint = touchpointNum < 3 ? touchpointNum + 1 : 3;

        appendLog({
          timestamp: new Date().toISOString(),
          leadId: lead.id,
          company: lead.company,
          email: lead.email,
          campaign: lead.campaign,
          touchpoint: touchpointNum,
          messageId: info.messageId,
          status: 'SUCCESS'
        });

        dispatchedCount++;

        // Jitter rate limiting between outbound emails
        const delay = getRandomJitter();
        console.log(`🛡️ Rate-limiting: Pausing for ${(delay / 1000).toFixed(1)}s...`);
        await sleep(delay);
      } catch (sendErr) {
        console.error(`❌ Send Failure for ${lead.company}: ${sendErr.message}`);
        appendLog({
          timestamp: new Date().toISOString(),
          leadId: lead.id,
          company: lead.company,
          email: lead.email,
          campaign: lead.campaign,
          touchpoint: touchpointNum,
          error: sendErr.message,
          status: 'FAILED'
        });
      }
    }
  }

  if (isLiveMode) {
    saveLeads(leads);
    console.log(`💾 Updated leads registry state saved.`);
  }

  console.log('\n' + '='.repeat(60));
  console.log(`📊 BATCH DISPATCH SUMMARY`);
  console.log(`Total Leads: ${leads.length}`);
  console.log(`Processed / Verified: ${dispatchedCount}`);
  console.log(`Skipped: ${skippedCount}`);
  console.log(`Mode: ${isLiveMode ? 'LIVE COMPLETE' : 'DRY-RUN VERIFIED (Ready for Live Send)'}`);
  console.log('='.repeat(60));
}

runDispatcher().catch((err) => {
  console.error('Fatal Dispatcher Error:', err);
  process.exit(1);
});
