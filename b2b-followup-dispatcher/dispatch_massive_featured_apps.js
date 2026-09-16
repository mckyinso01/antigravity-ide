// ============================================================
// AUTOMATED DISPATCHER FOR MASSIVE 100 FEATURED APPS PIPELINE
// StructuraPro (sitesafe.linkable.it.com) & OmniStock (omnistock.linkable.it.com)
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { TEMPLATES } from './src/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PIPELINE_FILE = path.join(__dirname, 'MASSIVE_FEATURED_APPS_100_PIPELINE.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');
const LEADS_FILE = path.join(__dirname, 'src', 'leads.json');

// Parse CLI flags
const args = process.argv.slice(2);
const limitArg = args.find(a => a.startsWith('--limit='));
const campaignArg = args.find(a => a.startsWith('--campaign='));
const isDryRun = args.includes('--dry-run');

const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 100;
const campaignFilter = campaignArg ? campaignArg.split('=')[1] : null;

// SMTP configuration: SpaceMail Enterprise Relay
const transporter = nodemailer.createTransport({
  host: 'mail.spacemail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'mharcgatan@linkable.it.com',
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  if (!fs.existsSync(PIPELINE_FILE)) {
    console.error('❌ Pipeline file not found:', PIPELINE_FILE);
    process.exit(1);
  }

  const allTargets = JSON.parse(fs.readFileSync(PIPELINE_FILE, 'utf-8'));
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  }

  const dispatchedEmailSet = new Set(
    logs.filter(l => l.status === 'SUCCESS' || l.status === 'SENT').map(l => (l.email || '').toLowerCase().trim())
  );

  let filtered = allTargets.filter(t => {
    if (campaignFilter && t.campaign !== campaignFilter) return false;
    // Don't resend if already dispatched today in this campaign
    return true;
  });

  // Filter out those already successfully dispatched in logs for this demo
  const pendingTargets = filtered.filter(t => {
    const normEmail = (t.email || '').toLowerCase().trim();
    const alreadyDispatched = logs.some(l => 
      (l.email || '').toLowerCase().trim() === normEmail && 
      (l.status === 'SUCCESS' || l.status === 'SENT') &&
      (l.demoUrl || '').includes(t.campaign === 'sitesafe' ? 'sitesafe' : 'omnistock')
    );
    return !alreadyDispatched;
  });

  console.log(`============================================================`);
  console.log(`🎯 MASSIVE FEATURED APPS B2B DISPATCHER`);
  console.log(`   - Total in Pipeline: ${allTargets.length}`);
  console.log(`   - Campaign Filter: ${campaignFilter || 'ALL (sitesafe + omnistock)'}`);
  console.log(`   - Pending to Dispatch: ${pendingTargets.length}`);
  console.log(`   - Batch Limit: ${limit}`);
  console.log(`   - Mode: ${isDryRun ? '🧪 DRY RUN (No emails sent)' : '🚀 LIVE PRODUCTION DISPATCH'}`);
  console.log(`============================================================\n`);

  const queue = pendingTargets.slice(0, limit);
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const lead = queue[i];
    const templateGroup = TEMPLATES[lead.campaign];
    if (!templateGroup || !templateGroup[1]) {
      console.warn(`⚠️ No template found for campaign: ${lead.campaign}, skipping ${lead.company}`);
      continue;
    }

    const subject = templateGroup[1].subject(lead.company);
    const body = templateGroup[1].body(lead);

    console.log(`[${i + 1}/${queue.length}] Dispatching to ${lead.executiveName} (${lead.title}) @ ${lead.company}`);
    console.log(`   📧 To: ${lead.email} | Subject: ${subject}`);
    console.log(`   🌐 Demo: ${lead.demoUrl}`);

    if (isDryRun) {
      console.log(`   ✅ [DRY RUN] Would send email successfully.\n`);
      successCount++;
      continue;
    }

    try {
      const mailOptions = {
        from: '"Mharc Gatan - Linkable Systems" <mharcgatan@linkable.it.com>',
        to: lead.email,
        replyTo: 'mharcgatan@linkable.it.com',
        subject: subject,
        text: body
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ SENT SUCCESS! MessageId: ${info.messageId}\n`);

      const logEntry = {
        id: `dispatch-${Date.now()}-${i}`,
        leadId: lead.id,
        email: lead.email,
        company: lead.company,
        executiveName: lead.executiveName,
        title: lead.title,
        campaign: lead.campaign,
        demoUrl: lead.demoUrl,
        touchpoint: 1,
        channel: "EMAIL_SMTP",
        status: "SUCCESS",
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      };

      logs.push(logEntry);
      fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');

      // Update lead status in leads.json
      if (fs.existsSync(LEADS_FILE)) {
        const leadsData = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
        const lIdx = leadsData.findIndex(l => (l.email || '').toLowerCase().trim() === lead.email.toLowerCase().trim());
        if (lIdx >= 0) {
          leadsData[lIdx].status = 'SENT';
          leadsData[lIdx].lastDispatchedAt = new Date().toISOString();
          leadsData[lIdx].lastMessageId = info.messageId;
          fs.writeFileSync(LEADS_FILE, JSON.stringify(leadsData, null, 2), 'utf-8');
        }
      }

      successCount++;
      // Pacing delay (1.5 seconds) to maintain flawless deliverability
      await sleep(1500);
    } catch (err) {
      console.error(`   ❌ FAILED to send to ${lead.email}:`, err.message);
      failCount++;
      const errorEntry = {
        id: `dispatch-err-${Date.now()}-${i}`,
        leadId: lead.id,
        email: lead.email,
        company: lead.company,
        campaign: lead.campaign,
        channel: "EMAIL_SMTP",
        status: "FAILED",
        error: err.message,
        timestamp: new Date().toISOString()
      };
      logs.push(errorEntry);
      fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
      await sleep(1000);
    }
  }

  console.log(`\n============================================================`);
  console.log(`🏁 DISPATCH BATCH COMPLETE`);
  console.log(`   - Successful Dispatches: ${successCount}`);
  console.log(`   - Failed Dispatches: ${failCount}`);
  console.log(`   - Total Logs Recorded in: ${LOG_FILE}`);
  console.log(`============================================================`);
}

run().catch(console.error);
