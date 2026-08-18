const fs = require('fs');
const path = require('path');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const dnsPromises = dns.promises;
const nodemailer = require('nodemailer');

const SENDER_EMAIL = 'mckinsyo01@gmail.com';
const SENDER_PASS = 'ldiibghudivdkboq'; // Google App Password

const LEADS_FILE = path.join(__dirname, '..', 'omnistock_100_verified_leads.json');
const LOG_FILE = path.join(__dirname, 'omnistock_dispatch_log.json');
const STATE_FILE = path.join(__dirname, 'omnistock_outreach_state.json');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS
  }
});

// Pre-Flight DNS MX Verification & Catch-All Filter Engine
async function verifyEmailDeliverability(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, reason: 'INVALID_SYNTAX' };
  }

  const [localPart, domain] = email.toLowerCase().split('@');
  const blacklistedLocalParts = [
    'catch-all', 'admin', 'administrator', 'group', 'all', 'everyone',
    'postmaster', 'mailer-daemon', 'no-reply', 'noreply', 'helpdesk',
    'support-team', 'info-noreply', 'system'
  ];

  if (blacklistedLocalParts.includes(localPart)) {
    return { valid: false, reason: `GENERIC_GROUP_ALIAS_BLOCKED (${localPart}@)` };
  }

  try {
    const mxRecords = await dnsPromises.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) {
      return { valid: false, reason: 'NO_MX_RECORDS_FOUND_FOR_DOMAIN' };
    }
    return { valid: true, mxHost: mxRecords[0].exchange };
  } catch (err) {
    return { valid: false, reason: `DNS_MX_LOOKUP_FAILED (${err.code || err.message})` };
  }
}

function loadLeads() {
  if (!fs.existsSync(LEADS_FILE)) {
    throw new Error(`Leads file not found at: ${LEADS_FILE}`);
  }
  return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
}

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    return {
      currentIndex: data.currentIndex || data.totalDispatched || 0,
      totalDispatched: data.totalDispatched || 0,
      dailyBatchSize: data.dailyBatchSize || 5,
      delaySecondsMin: data.delaySecondsMin || 35,
      delaySecondsMax: data.delaySecondsMax || 55,
      lastDispatchedAt: data.lastDispatchedAt || null,
      status: data.status || 'IDLE',
      history: data.history || []
    };
  }
  return {
    currentIndex: 0,
    totalDispatched: 0,
    dailyBatchSize: 5,
    delaySecondsMin: 35,
    delaySecondsMax: 55,
    lastDispatchedAt: null,
    status: 'IDLE',
    history: []
  };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

function loadLogs() {
  if (fs.existsSync(LOG_FILE)) {
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  }
  return [];
}

function saveLogs(logs) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');
}

function generateEmailContent(lead) {
  const company = lead.company;
  const decisionMaker = lead.decision_maker || 'Supply Chain & Logistics Leadership';
  const firstName = decisionMaker.split(' ')[0] || 'Leadership';

  const subject = `Eliminating WMS SaaS per-user fees + 45% shorter picker routes for ${company}`;

  const plainText = `Hi ${firstName},

Quick question for ${company}'s logistics operations: Is your distribution warehouse currently paying recurring monthly per-user license fees (SaaS tax) on your WMS software?

Most retail and 3PL distribution networks spend upwards of $40,000–$60,000 annually on per-scanner user licensing while still battling warehouse shrinkage, inventory discrepancies, and inefficient picker walking routes.

We developed OmniStock Enterprise — an interactive Spatial CAD Digital Twin and 3PL Fulfillment Engine built specifically to solve these 3 operational pain points:

1. 🗺️ Eulerian Shortest-Path Wave Picking:
   Automatically calculates the mathematical shortest walking loop for multi-order pickers, reducing floor travel distance and fatigue by up to 45%.

2. 🛡️ Zero-Shrinkage Anti-Pilferage Lock:
   Enforces live watermarked photo capture, blind cycle counting (actual expected quantities hidden from counters), and non-empty rack deletion locks to prevent accidental or intentional stock manipulation.

3. 💰 Zero Monthly User Tax (100% On-Premise Buyout):
   Run fully air-gapped on your local network/Docker intranet with unlimited handheld barcode guns and zero recurring subscription fees.

You can interact with the live spatial CAD engine directly in your browser:
👉 Live Demonstration: https://omnistock.surge.sh

And review our complete systems architecture catalog here:
👉 Systems Portfolio: https://gatzdevs.surge.sh

Would you be open to a brief 5-minute technical review with our lead solutions engineer this week to see if OmniStock is a fit for ${company}'s warehouse topology?

Best regards,

Solutions Engineering & Commercial Architecture
OmniStock Enterprise Logistics Hub
Direct Line: mckinsyo01@gmail.com
Live Portal: https://omnistock.surge.sh`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1E293B; background-color: #F8FAFC; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #070B14 0%, #0D1527 100%); padding: 24px; color: #FFFFFF; border-bottom: 2px solid #5BC0BE; }
    .badge { display: inline-block; background: rgba(91, 192, 190, 0.15); color: #5BC0BE; font-family: monospace; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(91, 192, 190, 0.3); margin-bottom: 8px; }
    .header h2 { margin: 0; font-size: 18px; color: #FFFFFF; letter-spacing: -0.5px; }
    .content { padding: 24px; font-size: 14px; color: #334155; }
    .highlight-card { background: #F1F5F9; border-left: 4px solid #5BC0BE; padding: 14px 16px; border-radius: 0 8px 8px 0; margin: 16px 0; font-size: 13px; }
    .feature-item { margin-bottom: 12px; padding-left: 4px; }
    .feature-title { font-weight: 700; color: #0F172A; }
    .btn-container { text-align: center; margin: 24px 0 16px 0; }
    .btn { display: inline-block; background: #070B14; color: #5BC0BE !important; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 8px; border: 1px solid #5BC0BE; box-shadow: 0 4px 12px rgba(91, 192, 190, 0.2); }
    .footer { background: #070B14; padding: 16px 24px; font-size: 11px; color: #64748B; border-top: 1px solid #1E293B; }
    .footer a { color: #5BC0BE; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">SPATIAL CAD WMS • 3PL FULFILLMENT HUB</div>
      <h2>Eliminating WMS SaaS Per-User Tax + 45% Shorter Picking Loops</h2>
    </div>
    
    <div class="content">
      <p>Hi <strong>${firstName}</strong>,</p>
      
      <p>Quick question for <strong>${company}</strong>'s supply chain operations: Is your distribution warehouse currently paying recurring monthly per-user licensing fees on your WMS software?</p>
      
      <div class="highlight-card">
        Most retail and 3PL distribution networks spend <strong>$40,000–$60,000 annually</strong> on per-scanner user licensing while still battling warehouse shrinkage, missing pallets, and inefficient picker walking routes.
      </div>
      
      <p>We engineered <strong>OmniStock Enterprise</strong> — an interactive Spatial CAD Digital Twin and 3PL Fulfillment Engine built specifically to solve these 3 operational bottlenecks:</p>
      
      <div class="feature-item">
        <div class="feature-title">🗺️ 1. Eulerian Shortest-Path Wave Picking</div>
        <div>Automatically calculates the mathematical shortest walking loop for multi-order pickers, reducing floor travel distance and fatigue by up to 45%.</div>
      </div>
      
      <div class="feature-item">
        <div class="feature-title">🛡️ 2. Zero-Shrinkage Anti-Pilferage Lock</div>
        <div>Enforces live watermarked photo capture, blind cycle counting (expected quantities hidden from counters), and non-empty rack deletion locks to prevent stock manipulation.</div>
      </div>
      
      <div class="feature-item">
        <div class="feature-title">💰 3. Zero Monthly User Tax (100% On-Premise Buyout)</div>
        <div>Run fully air-gapped on your local Docker intranet with unlimited handheld barcode guns and zero recurring subscription fees.</div>
      </div>
      
      <div class="btn-container">
        <a href="https://omnistock.surge.sh" class="btn" target="_blank">Test Interactive Spatial CAD Demo &rarr;</a>
      </div>
      
      <p>Would you be open to a brief 5-minute technical review with our lead solutions engineer this week to see if OmniStock fits <strong>${company}</strong>'s warehouse topology?</p>
      
      <p>Warm regards,<br>
      <strong>Solutions Engineering & Commercial Architecture</strong><br>
      OmniStock Enterprise Logistics Hub<br>
      Direct: <a href="mailto:mckinsyo01@gmail.com" style="color: #0284C7;">mckinsyo01@gmail.com</a></p>
    </div>
    
    <div class="footer">
      <div>OmniStock Enterprise WMS • Live Portal: <a href="https://omnistock.surge.sh">https://omnistock.surge.sh</a></div>
      <div>Portfolio & Architecture Catalog: <a href="https://gatzdevs.surge.sh">https://gatzdevs.surge.sh</a></div>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, plainText, html };
}

async function runScheduledOmniStockBatch() {
  console.log('⏰ [OMNISTOCK CRON] Starting Scheduled Micro-Batch Dispatch with Pre-Flight MX Shield...');
  await transporter.verify();
  console.log('✅ OmniStock SMTP Authenticated as mckinsyo01@gmail.com');

  const leads = loadLeads();
  const state = loadState();
  const logs = loadLogs();

  const startIndex = state.currentIndex;
  const batchSize = state.dailyBatchSize || 5;
  const endIndex = Math.min(startIndex + batchSize, leads.length);

  if (startIndex >= leads.length) {
    console.log('🏁 All 100 OmniStock enterprise leads have already received outreach!');
    return { status: 'COMPLETED', totalDispatched: state.totalDispatched };
  }

  const batch = leads.slice(startIndex, endIndex);
  console.log(`🎯 Executing OmniStock Batch: Targets #${startIndex + 1} to #${endIndex} (${batch.length} Companies)`);

  const batchResults = [];

  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const emailIndex = startIndex + i + 1;

    // PRE-FLIGHT DELIVERABILITY CHECK
    console.log(`\n🛡️ [PRE-FLIGHT] Checking deliverability for #${lead.id} ${lead.company} (${lead.email})...`);
    const deliverability = await verifyEmailDeliverability(lead.email);

    if (!deliverability.valid) {
      console.warn(`  ⚠️ BLOCKED BY PRE-FLIGHT SHIELD: ${deliverability.reason}`);
      const entry = {
        id: lead.id,
        company: lead.company,
        email: lead.email,
        sector: lead.sector,
        status: 'SKIPPED_PREFLIGHT',
        reason: deliverability.reason,
        timestamp: new Date().toISOString()
      };
      logs.push(entry);
      batchResults.push(entry);
      saveLogs(logs);
      continue;
    }

    console.log(`  ✓ DNS MX Active: ${deliverability.mxHost}`);
    const { subject, plainText, html } = generateEmailContent(lead);

    console.log(`📨 [${emailIndex}/${leads.length}] Dispatching to #${lead.id}: ${lead.company} (${lead.email})...`);

    try {
      const info = await transporter.sendMail({
        from: `"OmniStock Enterprise Hub" <${SENDER_EMAIL}>`,
        to: lead.email,
        replyTo: SENDER_EMAIL,
        subject: subject,
        text: plainText,
        html: html
      });

      console.log(`  ✅ SENT! MessageId: ${info.messageId}`);
      const entry = {
        id: lead.id,
        company: lead.company,
        email: lead.email,
        sector: lead.sector,
        subject: subject,
        messageId: info.messageId,
        timestamp: new Date().toISOString(),
        status: 'DELIVERED'
      };
      logs.push(entry);
      batchResults.push(entry);
    } catch (err) {
      console.error(`  ❌ FAILED to send to ${lead.email}:`, err.message);
      const entry = {
        id: lead.id,
        company: lead.company,
        email: lead.email,
        sector: lead.sector,
        subject: subject,
        error: err.message,
        timestamp: new Date().toISOString(),
        status: 'FAILED'
      };
      logs.push(entry);
      batchResults.push(entry);
    }

    saveLogs(logs);

    if (i < batch.length - 1) {
      const delay = Math.floor(Math.random() * (state.delaySecondsMax - state.delaySecondsMin + 1) + state.delaySecondsMin);
      console.log(`⏳ Pacing pause: Waiting ${delay}s before next recipient to protect SMTP health...`);
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
    }
  }

  const successfulInBatch = batchResults.filter(r => r.status === 'DELIVERED').length;
  state.currentIndex = endIndex;
  state.totalDispatched += successfulInBatch;
  state.lastDispatchedAt = new Date().toISOString();
  state.status = endIndex >= leads.length ? 'COMPLETED' : 'IDLE';
  state.history.push({
    runAt: new Date().toISOString(),
    batchRange: `${startIndex + 1}-${endIndex}`,
    successCount: successfulInBatch,
    skippedCount: batchResults.filter(r => r.status === 'SKIPPED_PREFLIGHT').length,
    failedCount: batchResults.filter(r => r.status === 'FAILED').length
  });

  saveState(state);

  // Send batch summary email report
  try {
    await transporter.sendMail({
      from: `"OmniStock Outreach Automator" <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      subject: `📦 [OmniStock Summary] Batch #${startIndex + 1}-${endIndex} Completed (${successfulInBatch} Delivered)`,
      text: `OmniStock B2B Outreach Micro-Batch Execution Complete:\n\n` +
        `• Batch Range: #${startIndex + 1} - #${endIndex}\n` +
        `• Successfully Delivered: ${successfulInBatch}\n` +
        `• Pre-Flight Blocked (Bad MX/Catch-All): ${batchResults.filter(r => r.status === 'SKIPPED_PREFLIGHT').length}\n` +
        `• Next Scheduled Batch: #${state.currentIndex + 1}\n` +
        `• Total Processed to Date: ${state.currentIndex} / ${leads.length} Enterprise Targets.\n\n` +
        `Targeted Companies in this batch:\n` +
        batch.map(b => `- #${b.id} ${b.company} (${b.sector}) -> ${b.email} [${b.status || 'PROCESSED'}]`).join('\n')
    });
    console.log('📬 Sent OmniStock batch summary email report to user.');
  } catch (err) {
    console.warn('Could not send OmniStock summary email:', err.message);
  }

  console.log(`\n🎉 OMNISTOCK BATCH #${startIndex + 1}-${endIndex} COMPLETED!`);
  console.log(`Next batch will start at Lead #${state.currentIndex + 1}`);
  return {
    status: 'BATCH_DONE',
    newIndex: state.currentIndex,
    totalDispatched: state.totalDispatched,
    totalLeads: leads.length
  };
}

if (require.main === module) {
  runScheduledOmniStockBatch().catch(console.error);
}

module.exports = { runScheduledOmniStockBatch, verifyEmailDeliverability };
