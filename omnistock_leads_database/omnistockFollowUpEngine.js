// 🔁 OMNISTOCK AUTOMATED DAY 2 / DAY 4 FOLLOW-UP SEQUENCE ENGINE
// Dispatches high-value, non-pushy second-touch emails to engaged prospects after 48-96 hours.

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const CONFIG = {
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'mckinsyo01@gmail.com',
      pass: 'ldiibghudivdkboq'
    }
  },
  sender: '"McKinsey & Lead Architect | OmniStock ERP" <mckinsyo01@gmail.com>',
  followUpMinAgeHours: 48,
  followUpMaxAgeHours: 120,
  maxFollowUpsPerRun: 3,
  delayBetweenFollowUpsSec: 40
};

const DISPATCH_LOG_PATH = path.join(__dirname, 'omnistock_dispatch_log.json');
const FOLLOWUP_LOG_PATH = path.join(__dirname, 'omnistock_followup_log.json');
const BOUNCE_LOG_PATH = path.join(__dirname, 'omnistock_bounced_blacklist.json');

const transporter = nodemailer.createTransport(CONFIG.smtp);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadJson(filePath, defaultValue = []) {
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function generateOmniStockFollowUpHtml(lead) {
  const company = lead.company || 'your team';
  const targetExecutive = lead.executive || 'Operations & Supply Chain Director';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
    .title { font-size: 17px; font-weight: 800; color: #0f172a; margin: 0; }
    .tagline { font-size: 11px; color: #0d9488; font-family: monospace; font-weight: 700; text-transform: uppercase; }
    .content { font-size: 13px; color: #334155; }
    .highlight-card { background: #f0fdfa; border-left: 4px solid #0d9488; padding: 14px; margin: 18px 0; border-radius: 4px; }
    .cta-btn { display: inline-block; background: #0f172a; color: #ffffff !important; font-weight: 700; font-size: 12px; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 14px; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; font-family: monospace; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="tagline">OmniStock Enterprise • Spatial Warehouse CAD</div>
      <h1 class="title">Quick Follow-Up: Custom CAD Warehouse Blueprint for ${company}</h1>
    </div>
    
    <div class="content">
      <p>Hi ${targetExecutive},</p>
      
      <p>Following up briefly on our note regarding eliminating per-scanner monthly WMS SaaS fees for <strong>${company}</strong>.</p>
      
      <p>To help you evaluate whether our visual spatial twin is a fit without any time investment on your side, our solutions engineering team can draft a <strong>complimentary 3D Spatial CAD floorplan</strong> for 1 of your warehouse aisles or mezzanine zones.</p>

      <div class="highlight-card">
        <strong style="color: #0f172a; display: block; margin-bottom: 6px;">Key Highlights for ${company}:</strong>
        <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #334155;">
          <li><strong>45% Shorter Picking Loops:</strong> Eulerian graph-theoretic wave routing eliminates picker zig-zag walking fatigue.</li>
          <li><strong>$4,500 One-Time Buyout:</strong> Zero per-scanner monthly taxes for unlimited handheld barcode guns.</li>
          <li><strong>72-Hour Rapid Onboarding:</strong> Full Master SKU import and Docker container deployment.</li>
        </ul>
      </div>

      <p>You can test the interactive blueprint directly in your browser, or schedule a quick 5-minute technical review below:</p>

      <a href="https://omnistock.surge.sh" class="cta-btn">Launch Live Spatial CAD Demo &amp; Review &rarr;</a>

      <p style="margin-top: 20px;">Best regards,</p>
      <p style="margin: 0; font-weight: 700; color: #0f172a;">McKinsey &amp; The OmniStock Solutions Architecture Team</p>
      <p style="margin: 0; font-size: 11px; color: #64748b;">Direct Inquiries: mckinsyo01@gmail.com | 005790246533 B2B Wire Rails</p>
    </div>

    <div class="footer">
      Delivered to ${lead.email} • 100% On-Premise Air-Gapped Logistics Architecture
    </div>
  </div>
</body>
</html>
  `;
}

async function runOmniStockFollowUpCycle() {
  console.log(`\n======================================================`);
  console.log(`🔁 OMNISTOCK AUTOMATED DAY 2 / DAY 4 FOLLOW-UP RUNNER`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  console.log(`======================================================`);

  const dispatchLog = loadJson(DISPATCH_LOG_PATH, []);
  const followUpLog = loadJson(FOLLOWUP_LOG_PATH, []);
  const bouncedList = loadJson(BOUNCE_LOG_PATH, []);

  const bouncedEmails = new Set(bouncedList.map(b => b.email ? b.email.toLowerCase() : ''));
  const alreadyFollowedUp = new Set(followUpLog.map(f => f.email ? f.email.toLowerCase() : ''));

  const now = Date.now();
  const eligibleLeads = dispatchLog.filter(lead => {
    if (!lead.email || lead.status !== 'DELIVERED') return false;
    const emailNorm = lead.email.toLowerCase();
    if (bouncedEmails.has(emailNorm)) return false;
    if (alreadyFollowedUp.has(emailNorm)) return false;

    const sentAt = new Date(lead.timestamp).getTime();
    const ageHours = (now - sentAt) / (1000 * 60 * 60);
    return ageHours >= CONFIG.followUpMinAgeHours && ageHours <= CONFIG.followUpMaxAgeHours;
  });

  console.log(`📊 Total Dispatched Leads: ${dispatchLog.length}`);
  console.log(`🎯 Eligible for Follow-Up #1 (Age: 48h-120h): ${eligibleLeads.length}`);

  if (eligibleLeads.length === 0) {
    console.log(`ℹ️ No leads currently in the 48h-120h follow-up window.`);
    return { followUpsSent: 0 };
  }

  const batch = eligibleLeads.slice(0, CONFIG.maxFollowUpsPerRun);
  console.log(`🚀 Dispatching micro-batch of ${batch.length} follow-up emails...`);

  let sentCount = 0;
  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    console.log(`\n[${i + 1}/${batch.length}] Sending Follow-Up to: ${lead.company} <${lead.email}>`);

    const htmlContent = generateOmniStockFollowUpHtml(lead);
    const mailOptions = {
      from: CONFIG.sender,
      to: lead.email,
      subject: `Re: Eliminating WMS SaaS per-user fees + 45% shorter picker routes for ${lead.company}`,
      html: htmlContent,
      inReplyTo: lead.messageId || undefined,
      references: lead.messageId || undefined
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ Delivered! Message ID: ${info.messageId}`);

      followUpLog.push({
        id: lead.id,
        company: lead.company,
        email: lead.email,
        originalSentAt: lead.timestamp,
        followUpSentAt: new Date().toISOString(),
        followUpMessageId: info.messageId,
        status: 'DELIVERED'
      });
      saveJson(FOLLOWUP_LOG_PATH, followUpLog);
      sentCount++;

      if (i < batch.length - 1) {
        console.log(`   ⏳ Pacing delay ${CONFIG.delayBetweenFollowUpsSec}s...`);
        await sleep(CONFIG.delayBetweenFollowUpsSec * 1000);
      }
    } catch (err) {
      console.error(`   ❌ Failed to send follow-up:`, err.message);
    }
  }

  console.log(`\n🎉 Follow-Up Cycle Finished: ${sentCount} sent.`);
  return { followUpsSent: sentCount };
}

if (require.main === module) {
  runOmniStockFollowUpCycle()
    .then(res => {
      console.log('Result:', res);
      process.exit(0);
    })
    .catch(err => {
      console.error('Fatal Follow-Up Error:', err);
      process.exit(1);
    });
}

module.exports = { runOmniStockFollowUpCycle };
