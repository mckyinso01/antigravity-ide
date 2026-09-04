// ============================================================
// 24/7 GitHub Actions Cloud Single-Cycle Revenue Runner
// Runs independently in the cloud every 20 mins without local PC
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import imaps from 'imap-simple';
import { TEMPLATES } from './templates.js';
import { forwardInboundClientEmail, sendAutomationSummaryReport } from './founder_notifier.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'leads.json');
const LOG_FILE = path.join(__dirname, 'dispatch_log.json');
const INBOUND_FILE = path.join(__dirname, 'inbound_replies.json');

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
const getRandomJitter = (min = 3500, max = 6500) => Math.floor(Math.random() * (max - min + 1)) + min;

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

async function checkInboundReplies() {
  console.log('📬 [CLOUD SENTINEL] Auditing SpaceMail IMAP Inbox...');
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox('INBOX');

    const searchCriteria = ['ALL'];
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false, struct: true };

    const messages = await connection.search(searchCriteria, fetchOptions);
    const recent = messages.slice(-15).reverse();

    let replies = [];
    if (fs.existsSync(INBOUND_FILE)) {
      try { replies = JSON.parse(fs.readFileSync(INBOUND_FILE, 'utf-8')); } catch { replies = []; }
    }

    let newCount = 0;
    for (const msg of recent) {
      const headerPart = msg.parts.find((p) => p.which === 'HEADER');
      if (!headerPart || !headerPart.body) continue;

      const from = (headerPart.body.from && headerPart.body.from[0]) || 'Unknown';
      const subject = (headerPart.body.subject && headerPart.body.subject[0]) || 'No Subject';
      const date = (headerPart.body.date && headerPart.body.date[0]) || '';

      const isMailerDaemon = from.toLowerCase().includes('mailer-daemon') || from.toLowerCase().includes('postmaster');
      if (isMailerDaemon) continue;

      const exists = replies.some(r => r.from === from && r.date === date);
      if (!exists) {
        const bodyPart = msg.parts.find((p) => p.which === 'TEXT');
        const snippet = bodyPart && bodyPart.body ? bodyPart.body.substring(0, 180).replace(/\r?\n/g, ' ') : '';
        replies.push({ from, subject, date, snippet, timestamp: new Date().toISOString() });
        console.log(`🎉 [INBOUND ALERT] New Client Response from: ${from}`);
        newCount++;

        // Forward immediately to Founder's direct Gmail (mckinsyo01@gmail.com)
        forwardInboundClientEmail({
          from,
          subject,
          date,
          body: snippet,
          snippet
        }).catch(e => console.error(`⚠️ Cloud forward error: ${e.message}`));
      }
    }

    fs.writeFileSync(INBOUND_FILE, JSON.stringify(replies, null, 2), 'utf-8');
    connection.end();
    console.log(`✅ [IMAP Audit Finished] ${newCount} new messages logged.`);
  } catch (err) {
    console.error(`⚠️ [IMAP Audit Error]: ${err.message}`);
  }
}

async function executeCloudOutbound() {
  const leads = loadLeads();
  let sentCount = 0;
  const BATCH_LIMIT = 8; // Conservative batch per cycle to respect rate limits

  console.log(`📤 [CLOUD DISPATCHER] Checking for queued leads...`);

  for (let i = 0; i < leads.length; i++) {
    if (sentCount >= BATCH_LIMIT) {
      console.log(`✋ Reached cloud cycle limit (${BATCH_LIMIT} messages). Yielding for next cron cycle...`);
      break;
    }

    const lead = leads[i];
    if (lead.status !== 'TOUCHPOINT_1_QUEUED') continue;

    const campaignTemplates = TEMPLATES[lead.campaign];
    if (!campaignTemplates) continue;

    const touchpointNum = lead.currentTouchpoint || 1;
    const template = campaignTemplates[touchpointNum];
    if (!template) continue;

    const subject = template.subject(lead.company);
    const body = template.body(lead);

    const mailOptions = {
      from: `"Mharc Gatan | Linkable Systems" <${process.env.SMTP_USER || 'mharcgatan@linkable.it.com'}>`,
      to: lead.email,
      subject,
      text: body
    };

    try {
      console.log(`📤 [${i + 1}/${leads.length}] Sending -> ${lead.executiveName} (${lead.company}) [${lead.email}]...`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ Sent! MessageId: ${info.messageId}`);

      lead.status = 'TOUCHPOINT_1_SENT';
      lead.lastDispatched = new Date().toISOString();
      saveLeads(leads);

      appendLog({
        leadId: lead.id,
        company: lead.company,
        email: lead.email,
        touchpoint: touchpointNum,
        status: 'SENT',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      sentCount++;
      const jitter = getRandomJitter(3500, 6000);
      await sleep(jitter);
    } catch (err) {
      console.error(`   ❌ Dispatch Error for ${lead.email}: ${err.message}`);
      if (err.message.includes('too many messages') || err.message.includes('554')) {
        console.warn(`   ⏳ Hourly SMTP Rate Limit reached. Pausing batch.`);
        break;
      }
    }
  }

  console.log(`📊 Cloud Outbound Cycle Finished: ${sentCount} messages sent.`);
  return sentCount;
}

async function main() {
  console.log('='.repeat(65));
  console.log('⚡ 24/7 CLOUD REVENUE RUNNER ACTIVATED');
  console.log('='.repeat(65));
  await checkInboundReplies();
  const sent = await executeCloudOutbound();

  if (sent > 0) {
    const activeLeads = loadLeads();
    await sendAutomationSummaryReport({
      dispatchedThisCycle: sent,
      verifiedLeadsInQueue: activeLeads.filter(l => !l.status || !l.status.includes('DELIVERED')).length,
      inboundRepliesCount: (JSON.parse(fs.existsSync(INBOUND_FILE) ? fs.readFileSync(INBOUND_FILE, 'utf-8') : '[]')).length,
      mode: '24/7 GitHub Actions Cloud Runner',
      nextCycle: '20 Minutes (GitHub Actions Cron)'
    }).catch(e => console.error(`⚠️ Cloud report error: ${e.message}`));
  }

  console.log('='.repeat(65));
  console.log('🏁 Cloud Cycle Completed Successfully.');
  console.log('='.repeat(65));
}

main().catch(console.error);
