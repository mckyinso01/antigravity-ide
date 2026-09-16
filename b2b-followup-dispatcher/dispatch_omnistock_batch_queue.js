// ============================================================
// FLEXIBLE ENTERPRISE BATCH DISPATCHER FOR OMNISTOCK WMS PIPELINES
// Dispatches Batch 2 & Batch 3 with Rate-Limiting, Blacklist Filtering & Detailed Logging
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { TEMPLATES } from './src/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');
const LEADS_FILE = path.join(__dirname, 'src', 'leads.json');
const PURGED_FILE = path.join(__dirname, 'PURGED_DEAD_LEADS.json');

const args = process.argv.slice(2);
const pipelineArg = args.find(a => a.startsWith('--pipeline='));
const limitArg = args.find(a => a.startsWith('--limit='));
const isDryRun = args.includes('--dry-run');

const targetPipelineFile = pipelineArg 
  ? path.resolve(__dirname, pipelineArg.split('=')[1])
  : path.join(__dirname, 'OMNISTOCK_BATCH2_50_PIPELINE.json');

const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 50;

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
  if (!fs.existsSync(targetPipelineFile)) {
    console.error('❌ Pipeline file not found:', targetPipelineFile);
    process.exit(1);
  }

  const allTargets = JSON.parse(fs.readFileSync(targetPipelineFile, 'utf-8'));
  
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
  }

  let purgedSet = new Set();
  if (fs.existsSync(PURGED_FILE)) {
    const purged = JSON.parse(fs.readFileSync(PURGED_FILE, 'utf-8'));
    purgedSet = new Set(purged.map(p => (p.email || '').toLowerCase().trim()));
  }

  // Blacklist dead domains that hard reject
  const blacklistedDomains = ['complog.com', 'weberlogistics.com', 'linbeck.com', 'level10gc.com'];

  const pendingTargets = allTargets.filter(t => {
    const normEmail = (t.email || '').toLowerCase().trim();
    if (!normEmail) return false;
    
    // Check if already purged
    if (purgedSet.has(normEmail)) {
      return false;
    }

    // Check blacklisted domain
    const domain = normEmail.split('@')[1];
    if (blacklistedDomains.includes(domain)) {
      return false;
    }

    // Check if already successfully dispatched
    const alreadyDispatched = logs.some(l => 
      (l.email || '').toLowerCase().trim() === normEmail && 
      (l.status === 'SUCCESS' || l.status === 'SENT')
    );
    return !alreadyDispatched;
  });

  console.log(`============================================================`);
  console.log(`🚀 OMNISTOCK BATCH PIPELINE DISPATCHER`);
  console.log(`   - Pipeline: ${path.basename(targetPipelineFile)}`);
  console.log(`   - Total in File: ${allTargets.length}`);
  console.log(`   - Purged / Blacklisted Filtered: ${allTargets.length - pendingTargets.length}`);
  console.log(`   - Clean Pending to Dispatch: ${pendingTargets.length}`);
  console.log(`   - Batch Limit: ${limit}`);
  console.log(`   - Mode: ${isDryRun ? '🧪 DRY RUN' : '🚀 LIVE PRODUCTION DISPATCH'}`);
  console.log(`============================================================\n`);

  const queue = pendingTargets.slice(0, limit);
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < queue.length; i++) {
    const lead = queue[i];
    const templateGroup = TEMPLATES.wms;
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
        campaign: "wms",
        demoUrl: lead.demoUrl,
        touchpoint: 1,
        channel: "EMAIL_SMTP",
        status: "SUCCESS",
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      };

      logs.push(logEntry);
      fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');

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
      await sleep(1500);
    } catch (err) {
      console.error(`   ❌ FAILED to send to ${lead.email}:`, err.message);
      failCount++;
      const errorEntry = {
        id: `dispatch-err-${Date.now()}-${i}`,
        leadId: lead.id,
        email: lead.email,
        company: lead.company,
        campaign: "wms",
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
  console.log(`🏁 OMNISTOCK DISPATCH BATCH COMPLETE`);
  console.log(`   - Successful Dispatches: ${successCount}`);
  console.log(`   - Failed Dispatches: ${failCount}`);
  console.log(`   - Total Logs Recorded in: ${LOG_FILE}`);
  console.log(`============================================================`);
}

run().catch(console.error);
