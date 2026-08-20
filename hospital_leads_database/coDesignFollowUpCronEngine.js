// 🔁 LINKABLEAI CO-DESIGN & WORKFLOW MODIFICATION FOLLOW-UP ENGINE
// Automated cron-ready engine that reaches out to prospects for workflow feedback, modifications, and feature requests.

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const { appendMessage, getOrCreateThread } = require('./conversationThreadManager');

const CONFIG = {
  smtp: {
    host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
    port: parseInt(process.env.SPACEMAIL_SMTP_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
      pass: process.env.SPACEMAIL_PASS || 'Melonjuice01!'
    }
  },
  sender: '"Mharc Gatan • LinkableAI" <mharcgatan@linkable.it.com>',
  followUpMinAgeHours: 40,  // 40+ hours (Day 2 follow-up window)
  followUpMaxAgeHours: 168, // Within 7 days
  maxFollowUpsPerCycle: 5,  // Safe micro-batch per run
  delayBetweenEmailsSec: 25, // Pacing delay to ensure high deliverability
  cronIntervalMinutes: 60   // Recurring check interval
};

const DISPATCH_LOG_PATH = path.join(__dirname, 'outreach_dispatch_log.json');
const FOLLOWUP_LOG_PATH = path.join(__dirname, 'hospital_followup_log.json');
const BOUNCE_BLACKLIST_PATH = path.join(__dirname, 'hospital_bounced_blacklist.json');

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

function generateCoDesignEmail(lead) {
  const targetName = lead.recipient ? lead.recipient.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') : 'Team';
  const hospitalOrCompany = lead.hospital || lead.hospitalName || lead.company || 'your facility';
  const appUrl = 'https://clinical-pristine.surge.sh';
  const masterUrl = 'https://linkable.it.com';

  const subject = `Quick follow-up: What custom modules or workflow modifications would ${hospitalOrCompany} need?`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; padding: 26px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header-bar { border-left: 4px solid #2563eb; padding-left: 12px; margin-bottom: 20px; }
    .h-title { font-size: 16px; font-weight: 700; color: #0f172a; margin: 0; }
    .h-sub { font-size: 11px; color: #64748b; font-family: monospace; text-transform: uppercase; }
    .q-box { background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 18px 0; border: 1px solid #cbd5e1; }
    .q-item { margin-bottom: 12px; font-size: 13px; color: #334155; }
    .q-item:last-child { margin-bottom: 0; }
    .q-num { font-weight: 700; color: #2563eb; }
    .btn { display: inline-block; background: #0f172a; color: #ffffff !important; font-weight: 600; font-size: 12px; padding: 10px 18px; border-radius: 6px; text-decoration: none; margin-top: 12px; }
    .footer { margin-top: 24px; padding-top: 14px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header-bar">
      <div class="h-sub">Product Co-Design &amp; Architecture Review</div>
      <div class="h-title">Tailoring Clinical Pristine OS for ${hospitalOrCompany}</div>
    </div>

    <p style="font-size: 13px; color: #334155;">Hi ${targetName},</p>

    <p style="font-size: 13px; color: #334155;">
      Following up on my previous note regarding the <strong>Clinical Pristine ICU &amp; Spatial Bed Management OS</strong> 
      (live at <a href="${appUrl}" style="color: #2563eb;">clinical-pristine.surge.sh</a>).
    </p>

    <p style="font-size: 13px; color: #334155;">
      We are actively working with healthcare directors to refine our next architectural sprint, and we would value your direct perspective:
    </p>

    <div class="q-box">
      <div class="q-item"><span class="q-num">1. ➕ Feature Additions:</span> Are there specific custom modules, medication alerts, or clinical HUD tools you would want added?</div>
      <div class="q-item"><span class="q-num">2. 🔄 Workflow Modifications:</span> Are there specific verification steps, BCMA barcode flows, or UI layouts you would adjust to match your team's exact SOPs?</div>
      <div class="q-item"><span class="q-num">3. 🔁 Systems to Connect/Replace:</span> Which legacy EHR/WMS systems (e.g. Epic, Cerner, Meditech) would you require native bidirectional integrations for?</div>
      <div class="q-item"><span class="q-num">4. 💬 Comments &amp; Critiques:</span> Do you have any general feedback, friction points, or suggestions after reviewing the platform?</div>
    </div>

    <p style="font-size: 13px; color: #334155;">
      Even a 1-sentence reply with your thoughts or your team's top workflow priority would be tremendously helpful.
    </p>

    <a href="${appUrl}" class="btn">Launch Live Workstation &rarr;</a>

    <p style="margin-top: 22px; font-size: 13px; color: #334155;">
      Best regards,<br>
      <strong>Mharc Gatan</strong><br>
      <span style="font-size: 12px; color: #64748b;">Founder &amp; Principal AI Architect • LinkableAI</span><br>
      <span style="font-size: 11px; color: #2563eb;"><a href="${masterUrl}" style="color: #2563eb;">linkable.it.com</a></span>
    </p>

    <div class="footer">
      Delivered to ${lead.recipient || lead.email} • LinkableAI Architecture Co-Design Series
    </div>
  </div>
</body>
</html>
  `;

  const text = `
Hi ${targetName},

Following up on my previous note regarding Clinical Pristine ICU OS (live at ${appUrl}).

We are currently refining our next deployment sprint with clinical leaders and would value your perspective:

1. Feature Additions: Any specific modules, alerts, or clinical tools you'd want added?
2. Workflow Modifications: Any verification steps, BCMA barcode flows, or layouts you would adjust for your SOPs?
3. Systems to Connect/Replace: Which EHR systems (Epic, Cerner, Meditech) would you need connectors for?
4. Comments & Critiques: Any general feedback or friction points?

Even a 1-sentence reply with your thoughts would be tremendously helpful.

Best regards,
Mharc Gatan
Founder & Principal AI Architect • LinkableAI
${masterUrl}
  `;

  return { subject, html, text };
}

function parseDateRobust(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) return d;

  // Handle DD/MM/YYYY hh:mm:ss a/pm format e.g. "17/08/2026 2:15:23 pm"
  const parts = dateStr.split(/[\/\s:]+/);
  if (parts.length >= 6) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    let hour = parseInt(parts[3], 10);
    const min = parseInt(parts[4], 10);
    const sec = parseInt(parts[5], 10);
    const meridian = parts[6] ? parts[6].toLowerCase() : '';
    if (meridian === 'pm' && hour < 12) hour += 12;
    if (meridian === 'am' && hour === 12) hour = 0;
    const parsed = new Date(year, month, day, hour, min, sec);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return null;
}

function getDynamicPacingSettings(totalDeliveredCount) {
  if (totalDeliveredCount >= 250) {
    return {
      mode: 'TURBO_ENTERPRISE_MODE',
      batchSize: 20,
      delaySec: 12,
      label: '🚀 Turbo Enterprise Mode (100 emails / 5 hrs)'
    };
  } else if (totalDeliveredCount >= 100) {
    return {
      mode: 'ACCELERATED_GROWTH_MODE',
      batchSize: 10,
      delaySec: 18,
      label: '⚡ Accelerated Growth Mode (50 emails / 5 hrs)'
    };
  } else {
    return {
      mode: 'SAFE_WARMUP_MODE',
      batchSize: 5,
      delaySec: 25,
      label: '🛡️ Safe Warmup Mode (25 emails / 5 hrs)'
    };
  }
}

async function runFollowUpBatch() {
  console.log(`\n======================================================`);
  console.log(`🔁 LINKABLEAI CO-DESIGN FOLLOW-UP DISPATCHER`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  console.log(`======================================================`);

  const dispatchLog = loadJson(DISPATCH_LOG_PATH, []);
  const followUpLog = loadJson(FOLLOWUP_LOG_PATH, []);
  const bounceList = loadJson(BOUNCE_BLACKLIST_PATH, []);

  const totalDelivered = followUpLog.length + dispatchLog.length;
  const pacing = getDynamicPacingSettings(totalDelivered);

  console.log(`📈 Pacing Escalation Status: ${pacing.label}`);
  console.log(`📊 Total Ecosystem Delivered: ${totalDelivered} (Threshold: 100 for Accelerated Mode)`);

  const bouncedEmails = new Set(bounceList.map(b => (b.email || b.failedRecipient || '').toLowerCase()));
  const alreadyFollowedUp = new Set(followUpLog.map(f => (f.recipient || f.email || '').toLowerCase()));

  const now = Date.now();
  const eligibleLeads = dispatchLog.filter(lead => {
    const targetEmail = (lead.recipient || lead.email || '').toLowerCase();
    if (!targetEmail) return false;
    if (lead.status !== 'SUCCESS' && lead.status !== 'DELIVERED') return false;
    if (bouncedEmails.has(targetEmail)) return false;
    if (alreadyFollowedUp.has(targetEmail)) return false;

    const parsedDate = parseDateRobust(lead.timestamp);
    if (!parsedDate) return false;
    const ageHours = (now - parsedDate.getTime()) / (1000 * 60 * 60);
    return ageHours >= CONFIG.followUpMinAgeHours && ageHours <= CONFIG.followUpMaxAgeHours;
  });

  console.log(`📊 Dispatched Leads: ${dispatchLog.length}`);
  console.log(`✅ Already Followed Up: ${alreadyFollowedUp.size}`);
  console.log(`🎯 Eligible for Co-Design Follow-Up (Age 48h-168h): ${eligibleLeads.length}`);

  if (eligibleLeads.length === 0) {
    console.log(`ℹ️ No leads currently in the 48h-168h follow-up window.`);
    return { sent: 0 };
  }

  const batch = eligibleLeads.slice(0, pacing.batchSize);
  console.log(`🚀 Executing batch of ${batch.length} emails with ${pacing.delaySec}s pacing...`);

  let sentCount = 0;
  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const targetEmail = lead.recipient || lead.email;
    const hospital = lead.hospital || lead.hospitalName || 'Health System';

    console.log(`\n[${i + 1}/${batch.length}] Dispatching Follow-Up to: ${hospital} <${targetEmail}>`);

    const { subject, html, text } = generateCoDesignEmail(lead);

    const mailOptions = {
      from: CONFIG.sender,
      to: targetEmail,
      subject: subject,
      html: html,
      text: text,
      inReplyTo: lead.messageId || undefined,
      references: lead.messageId || undefined
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✅ Success! Message ID: ${info.messageId}`);

      followUpLog.push({
        id: lead.id,
        hospital: hospital,
        recipient: targetEmail,
        originalSentAt: lead.timestamp,
        followUpSentAt: new Date().toISOString(),
        followUpMessageId: info.messageId,
        status: 'SUCCESS'
      });

      // Record in conversation thread memory
      try {
        appendMessage(targetEmail, {
          sender: CONFIG.sender,
          recipient: targetEmail,
          direction: 'OUTBOUND',
          subject: subject,
          body: text,
          salesMethodology: 'CODESIGN_WORKFLOW_FOLLOWUP',
          dealStatus: 'NURTURING'
        });
      } catch (errMem) {
        console.error('   ⚠️ Thread memory update error:', errMem.message);
      }
      saveJson(FOLLOWUP_LOG_PATH, followUpLog);
      sentCount++;

      if (i < batch.length - 1) {
        console.log(`   ⏳ Pacing delay ${pacing.delaySec}s...`);
        await sleep(pacing.delaySec * 1000);
      }
    } catch (err) {
      console.error(`   ❌ Failed to send follow-up:`, err.message);
    }
  }

  console.log(`\n🎉 Follow-Up Batch Complete: ${sentCount} successfully delivered.`);
  return { sent: sentCount };
}

// Recurring daemon mode if called with --cron
async function startDaemon() {
  console.log(`🤖 Starting LinkableAI Follow-Up Cron Daemon (Interval: ${CONFIG.cronIntervalMinutes}m)...`);
  await runFollowUpBatch();

  setInterval(async () => {
    try {
      await runFollowUpBatch();
    } catch (err) {
      console.error('Cron Cycle Error:', err.message);
    }
  }, CONFIG.cronIntervalMinutes * 60 * 1000);
}

if (require.main === module) {
  const isCron = process.argv.includes('--cron');
  if (isCron) {
    startDaemon();
  } else {
    runFollowUpBatch()
      .then(res => {
        console.log('Finished with result:', res);
        process.exit(0);
      })
      .catch(err => {
        console.error('Fatal execution error:', err);
        process.exit(1);
      });
  }
}

module.exports = { runFollowUpBatch, startDaemon };
