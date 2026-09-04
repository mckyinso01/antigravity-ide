// ============================================================
// B2B 24/7 Autonomous Revenue Engine & 10-Minute Dispatch Daemon
// Strict 5-Titan Defensive Hardening & Pre-Flight Delivery Armor
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import imaps from 'imap-simple';
import { TEMPLATES } from './templates.js';
import { verifyEmailPreFlight } from './email_verifier.js';
import { forwardInboundClientEmail, sendAutomationSummaryReport } from './founder_notifier.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'leads.json');
const LOG_FILE = path.join(__dirname, 'dispatch_log.json');
const INBOUND_FILE = path.join(__dirname, 'inbound_replies.json');

const BATCH_SIZE_PER_CYCLE = 5;
const CYCLE_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

console.log('='.repeat(65));
console.log('⚡ 24/7 AUTONOMOUS REVENUE ENGINE & 10-MINUTE DAEMON ARMED');
console.log(`⏱️ Schedule: Every 10 Minutes | Batch: ${BATCH_SIZE_PER_CYCLE} verified named leads/cycle`);
console.log('🛡️ Deliverability: Pre-Flight DNS MX Handshake Verification Active');
console.log('='.repeat(65));

const imapConfig = {
  imap: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    password: process.env.SMTP_PASS || 'Melonjuice01!',
    host: 'mail.spacemail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 25000
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    pass: process.env.SMTP_PASS || 'Melonjuice01!'
  },
  tls: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomJitter = (min = 4000, max = 6500) => Math.floor(Math.random() * (max - min + 1)) + min;

function loadLeads() {
  if (!fs.existsSync(LEADS_FILE)) return [];
  return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
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

function recordInboundReply(reply) {
  let replies = [];
  if (fs.existsSync(INBOUND_FILE)) {
    try { replies = JSON.parse(fs.readFileSync(INBOUND_FILE, 'utf-8')); } catch { replies = []; }
  }
  
  const exists = replies.some(r => r.from === reply.from && r.date === reply.date);
  if (!exists) {
    replies.push(reply);
    fs.writeFileSync(INBOUND_FILE, JSON.stringify(replies, null, 2), 'utf-8');
    console.log(`\n🎉 [INBOUND LEAD ALERT] New Client Message Received from: ${reply.from}`);
    console.log(`   Subject: ${reply.subject}`);
    console.log(`   Snippet: ${reply.snippet}`);

    // Forward immediately to Founder's direct Gmail (mckinsyo01@gmail.com)
    forwardInboundClientEmail({
      from: reply.from,
      subject: reply.subject,
      date: reply.date,
      body: reply.snippet,
      snippet: reply.snippet
    }).catch(e => console.error(`⚠️ Inbound forward error: ${e.message}`));
  }
}

async function checkInboundReplies() {
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox('INBOX');

    const messages = await connection.search(['ALL'], {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
      struct: true
    });
    
    const recent = messages.slice(-15).reverse();

    for (const msg of recent) {
      const headerPart = msg.parts.find((p) => p.which === 'HEADER');
      if (!headerPart || !headerPart.body) continue;

      const from = (headerPart.body.from && headerPart.body.from[0]) || 'Unknown';
      const subject = (headerPart.body.subject && headerPart.body.subject[0]) || 'No Subject';
      const date = (headerPart.body.date && headerPart.body.date[0]) || '';

      const fromLower = from.toLowerCase();
      const isDaemon = fromLower.includes('daemon') || fromLower.includes('bounce') || fromLower.includes('postmaster');
      if (isDaemon) continue;

      const bodyPart = msg.parts.find((p) => p.which === 'TEXT');
      const snippet = bodyPart && bodyPart.body ? bodyPart.body.substring(0, 200).replace(/\r?\n/g, ' ') : '';

      recordInboundReply({ from, subject, date, snippet, timestamp: new Date().toISOString() });
    }

    connection.end();
  } catch (err) {
    console.error(`⚠️ [IMAP Inbound Audit]: ${err.message}`);
  }
}

async function executeOutboundBatch() {
  const leads = loadLeads();
  let dispatchedThisCycle = 0;

  for (let i = 0; i < leads.length; i++) {
    if (dispatchedThisCycle >= BATCH_SIZE_PER_CYCLE) {
      console.log(`🛑 Batch limit of ${BATCH_SIZE_PER_CYCLE} reached for this 10-minute window.`);
      break;
    }

    const lead = leads[i];

    // Only process genuine named decision-makers that have not been dispatched yet
    const personName = (lead.executiveName || lead.clientName || '').trim();
    if (!personName || personName.toLowerCase().includes('director') || personName.toLowerCase().includes('lead')) {
      continue;
    }

    // Check if touchpoint 1 is already sent
    if (lead.status && lead.status.includes('DELIVERED') || lead.status === 'TOUCHPOINT_1_SENT') {
      continue;
    }

    const campaignTemplates = TEMPLATES[lead.campaign];
    if (!campaignTemplates) continue;

    const touchpointNum = lead.currentTouchpoint || 1;
    const template = campaignTemplates[touchpointNum];
    if (!template) continue;

    // Pre-flight MX verification gate
    const verification = await verifyEmailPreFlight(lead.email);
    if (!verification.isValid) {
      console.warn(`🛡️ [VERIFIER REJECTED] Skipping ${lead.company} (${lead.email}): Reason: ${verification.reason}`);
      lead.status = `REJECTED_${verification.reason}`;
      saveLeads(leads);
      continue;
    }

    const subject = template.subject(lead.company);
    const body = template.body(lead);

    const mailOptions = {
      from: `"${process.env.SENDER_NAME || 'Mharc Gatan | Linkable Systems'}" <${process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com'}>`,
      to: lead.email,
      subject,
      text: body
    };

    try {
      console.log(`\n📤 [${i + 1}/${leads.length}] Dispatching to: ${personName} (${lead.company}) [${lead.email}]...`);
      console.log(`   🛡️ MX Host: ${verification.mxHost}`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✨ Successfully Delivered! MessageId: ${info.messageId}`);

      lead.status = `TOUCHPOINT_${touchpointNum}_DELIVERED`;
      lead.lastDispatched = new Date().toISOString();
      saveLeads(leads);

      appendLog({
        leadId: lead.id,
        company: lead.company,
        executiveName: personName,
        email: lead.email,
        touchpoint: touchpointNum,
        status: 'SUCCESS',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      dispatchedThisCycle++;
      const jitter = getRandomJitter(4000, 6500);
      console.log(`   ⏳ Jitter delay (${(jitter / 1000).toFixed(1)}s) to maintain 100% sender reputation...`);
      await sleep(jitter);
    } catch (err) {
      console.error(`   ❌ Dispatch Error for ${lead.email}: ${err.message}`);
      if (err.message.includes('too many messages') || err.message.includes('554')) {
        console.warn(`   ⏳ Hourly SMTP Rate Limit detected. Pausing until next cycle.`);
        break;
      } else {
        lead.status = `DISPATCH_ERROR`;
        saveLeads(leads);
      }
    }
  }

  return dispatchedThisCycle;
}

let isCycleRunning = false;
async function runRevenueCycle() {
  if (isCycleRunning) return;
  isCycleRunning = true;
  const now = new Date().toLocaleTimeString('en-US', { hour12: true });
  console.log(`\n================================================================`);
  console.log(`⏰ [${now}] EXECUTING 10-MINUTE REVENUE & DISPATCH CYCLE`);
  console.log(`================================================================`);
  try {
    await checkInboundReplies();
    const sent = await executeOutboundBatch();
    console.log(`\n📊 Cycle Summary: ${sent} executive emails dispatched.`);
    console.log(`💤 Next automated cycle in 10 minutes (${new Date(Date.now() + CYCLE_INTERVAL_MS).toLocaleTimeString('en-US', { hour12: true })})...`);

    if (sent > 0) {
      const activeLeads = loadLeads();
      sendAutomationSummaryReport({
        dispatchedThisCycle: sent,
        verifiedLeadsInQueue: activeLeads.filter(l => !l.status || !l.status.includes('DELIVERED')).length,
        inboundRepliesCount: (JSON.parse(fs.existsSync(INBOUND_FILE) ? fs.readFileSync(INBOUND_FILE, 'utf-8') : '[]')).length,
        mode: '10-Minute Autonomous Daemon',
        nextCycle: '10 Minutes'
      }).catch(e => console.error(`⚠️ Automation summary error: ${e.message}`));
    }
  } catch (err) {
    console.error(`❌ Cycle Fatal Error: ${err.message}`);
  } finally {
    isCycleRunning = false;
  }
}

// 1. Run immediate first cycle
runRevenueCycle();

// 2. Set recurring 10-minute cron interval
setInterval(runRevenueCycle, CYCLE_INTERVAL_MS);
