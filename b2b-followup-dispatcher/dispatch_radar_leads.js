// ============================================================
// Direct Live Dispatcher for Inbound Radar Leads
// Sends personalized pitches immediately via SpaceMail SMTP
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RADAR_FILE = path.join(__dirname, 'HOT_LIVE_INBOUND_LEAD_RADAR.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

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

async function dispatchRadarLeads() {
  console.log('='.repeat(65));
  console.log('🚀 EXECUTING DIRECT LIVE DISPATCH ON RADAR LEADS');
  console.log('='.repeat(65));

  const radarLeads = JSON.parse(fs.readFileSync(RADAR_FILE, 'utf-8'));
  let sent = 0;

  for (let i = 0; i < radarLeads.length; i++) {
    const lead = radarLeads[i];
    if (lead.status === 'SENT_LIVE') {
      console.log(`⏩ [Skipping] ${lead.clientName} already sent.`);
      continue;
    }

    const mailOptions = {
      from: `"Mharc Gatan | Linkable Systems" <${process.env.SMTP_USER || 'mharcgatan@linkable.it.com'}>`,
      to: lead.contactEmail,
      subject: `Proposal: Rapid 24-48h Sprint & Architecture for ${lead.clientName}`,
      text: lead.pitchDM
    };

    try {
      console.log(`📤 Sending Direct Pitch -> ${lead.clientName} [${lead.contactEmail}]...`);
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ Sent Successfully! MessageId: ${info.messageId}`);

      lead.status = 'SENT_LIVE';
      lead.dispatchedAt = new Date().toISOString();
      lead.messageId = info.messageId;

      // Append to global log
      let logs = [];
      if (fs.existsSync(LOG_FILE)) {
        try { logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8')); } catch { logs = []; }
      }
      logs.push({
        leadId: lead.id,
        clientName: lead.clientName,
        email: lead.contactEmail,
        platform: lead.sourcePlatform,
        status: 'SENT_LIVE',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');

      sent++;
      console.log(`   ⏳ Jitter delay (3500ms)...`);
      await sleep(3500);
    } catch (err) {
      console.error(`   ❌ Dispatch Notice for ${lead.contactEmail}: ${err.message}`);
      if (err.message.includes('too many messages') || err.message.includes('554')) {
        console.warn(`   ⏳ Rate limit detected. Saved in armed queue for next window.`);
        break;
      }
    }
  }

  fs.writeFileSync(RADAR_FILE, JSON.stringify(radarLeads, null, 2), 'utf-8');
  console.log('='.repeat(65));
  console.log(`📊 Dispatch Complete: ${sent} hot radar leads delivered live!`);
  console.log('='.repeat(65));
}

dispatchRadarLeads();
