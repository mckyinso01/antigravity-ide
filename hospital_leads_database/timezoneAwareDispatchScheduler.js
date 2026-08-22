// 🌍 TITAN TIMEZONE-AWARE MULTI-REGION OUTBOUND SCHEDULER v1.0
// Obeying Titan SMTP-01 (djb / Klensin Deliverability Standards) & Titan MKT-01 (Gary Halbert & Chris Voss)
//
// Ensures cold pitches and follow-ups are dispatched ONLY during target executives'
// Prime Local Business Hours (8:30 AM - 11:30 AM & 1:30 PM - 4:30 PM local time).
// Protects domain reputation and maximizes open rates.

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Ingest environment variables
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

const SENDER_EMAIL = process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com';
const SENDER_PASS = process.env.SPACEMAIL_PASS || 'Melonjuice01!';

const transporter = nodemailer.createTransport({
  host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SPACEMAIL_SMTP_PORT || '465', 10),
  secure: true,
  auth: { user: SENDER_EMAIL, pass: SENDER_PASS }
});

const LEADS_FILE = path.join(__dirname, 'verified_100_us_uk_hospitals.json');
const DISPATCH_LOG_FILE = path.join(__dirname, 'outreach_dispatch_log.json');

// Map State/Region abbreviations to IANA Timezones
const TIMEZONE_MAP = {
  // US Pacific (UTC-7 PDT)
  'CA': 'America/Los_Angeles', 'WA': 'America/Los_Angeles', 'OR': 'America/Los_Angeles', 'NV': 'America/Los_Angeles',
  // US Mountain (UTC-6 MDT)
  'CO': 'America/Denver', 'UT': 'America/Denver', 'AZ': 'America/Phoenix', 'NM': 'America/Denver', 'ID': 'America/Boise', 'MT': 'America/Denver', 'WY': 'America/Denver',
  // US Central (UTC-5 CDT)
  'TX': 'America/Chicago', 'IL': 'America/Chicago', 'MN': 'America/Chicago', 'WI': 'America/Chicago', 'MO': 'America/Chicago', 'LA': 'America/Chicago', 'TN': 'America/Chicago', 'OK': 'America/Chicago', 'KS': 'America/Chicago', 'IA': 'America/Chicago', 'NE': 'America/Chicago', 'AR': 'America/Chicago',
  // US Eastern (UTC-4 EDT)
  'NY': 'America/New_York', 'FL': 'America/New_York', 'PA': 'America/New_York', 'OH': 'America/New_York', 'GA': 'America/New_York', 'NC': 'America/New_York', 'VA': 'America/New_York', 'MA': 'America/New_York', 'MI': 'America/New_York', 'MD': 'America/New_York', 'DC': 'America/New_York', 'NJ': 'America/New_York', 'CT': 'America/New_York', 'SC': 'America/New_York', 'IN': 'America/Indiana/Indianapolis',
  // UK
  'UK': 'Europe/London', 'ENGLAND': 'Europe/London', 'SCOTLAND': 'Europe/London', 'WALES': 'Europe/London',
  // Asia-Pacific
  'PH': 'Asia/Manila', 'SG': 'Asia/Singapore', 'AU': 'Australia/Sydney'
};

/**
 * Infer the IANA Timezone of a lead based on location / country
 * @param {Object} lead 
 * @returns {string} IANA Timezone string
 */
function resolveLeadTimezone(lead) {
  if (lead.country === 'UK' || /UK|NHS|London|Manchester|Birmingham|Leeds/i.test(lead.location || '')) {
    return 'Europe/London';
  }
  if (lead.country === 'PH' || /Philippines|Manila|Makati|Cebu|Ortigas/i.test(lead.location || '')) {
    return 'Asia/Manila';
  }
  if (lead.country === 'SG' || /Singapore/i.test(lead.location || '')) {
    return 'Asia/Singapore';
  }

  // Parse US State code (e.g., "Salem, OR", "Bellevue, WA")
  const loc = lead.location || '';
  const match = loc.match(/,\s*([A-Z]{2})\b/);
  if (match && TIMEZONE_MAP[match[1]]) {
    return TIMEZONE_MAP[match[1]];
  }

  // Default fallback for US: Eastern Time
  return 'America/New_York';
}

/**
 * Check if the current time in the given timezone falls within Prime Business Hours
 * Golden Window A: 08:30 - 11:30 (Morning Inbox Sweep)
 * Golden Window B: 13:30 - 16:30 (Afternoon Review)
 * @param {string} timeZone 
 * @returns {{isGoldenHour: boolean, localTimeStr: string, hour: number, minute: number, windowName: string}}
 */
function checkTimezoneGoldenHour(timeZone) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { timeZone, hour12: false, hour: '2-digit', minute: '2-digit' });
  const [hStr, mStr] = timeStr.split(':');
  const hour = parseInt(hStr, 10);
  const minute = parseInt(mStr, 10);
  const totalMinutes = hour * 60 + minute;

  // Window A: 08:30 (510 min) to 11:30 (690 min)
  const isMorningWindow = totalMinutes >= 510 && totalMinutes <= 690;
  // Window B: 13:30 (810 min) to 16:30 (990 min)
  const isAfternoonWindow = totalMinutes >= 810 && totalMinutes <= 990;

  let windowName = 'OFF_HOURS';
  if (isMorningWindow) windowName = 'MORNING_GOLDEN_HOUR (8:30-11:30 AM)';
  else if (isAfternoonWindow) windowName = 'AFTERNOON_PRIME_WINDOW (1:30-4:30 PM)';

  return {
    isGoldenHour: isMorningWindow || isAfternoonWindow,
    localTimeStr: timeStr,
    hour,
    minute,
    windowName
  };
}

/**
 * Load Dispatched Leads Log
 */
function loadDispatchLog() {
  if (fs.existsSync(DISPATCH_LOG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DISPATCH_LOG_FILE, 'utf8'));
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Save Dispatched Leads Log
 */
function saveDispatchLog(log) {
  fs.writeFileSync(DISPATCH_LOG_FILE, JSON.stringify(log, null, 2));
}

/**
 * Generate Gary Halbert + Chris Voss Tactical Email Pitch
 */
function generateTacticalPitch(lead) {
  const hospitalName = lead.hospital_name || 'Your Healthcare Organization';
  const decisionMaker = lead.decision_maker?.split('/')[0]?.split('(')[0]?.trim() || 'Clinical Director';
  const pain = lead.pain_point || 'clinical oncology patient trial matching and EHR documentation overhead';

  const subject = `clinical trial revenue & oncology matching for ${hospitalName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { border-bottom: 2px solid #06b6d4; padding-bottom: 14px; margin-bottom: 20px; }
    .logo { font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
    .btn { display: inline-block; background: #06b6d4; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 18px 0; }
    .footer { margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 14px; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">TITAN AUTONOMOUS HEALTHTECH &amp; CRITICAL CARE OS</div>
      <div style="font-size: 12px; color: #64748b; font-family: monospace;">CLINICAL-PRISTINE ENTERPRISE WORKSTATION</div>
    </div>

    <p>Hi ${decisionMaker},</p>

    <p>Noticed ${hospitalName}'s ongoing clinical operations. Usually, clinical coordinators and oncology teams spend 15+ hours a week sifting through 500-page EHR charts just to match EGFR/KRAS biomarker mutations with active trial protocols.</p>

    <p>We built a space-grade clinical workstation (Clinical-Pristine OS) that converts bedside voice dictation into FDA 21 CFR Part 11 signed SBAR reports—and matches oncology patients to $12,500 pharma trial sponsorships in sub-300ms:</p>

    <div style="text-align: center;">
      <a href="https://linkable.it.com/" class="btn">▶ Watch 30-Second Demonstration &amp; Live Sandbox</a>
    </div>

    <p style="background: #f8fafc; border-left: 4px solid #06b6d4; padding: 12px; font-size: 13px; color: #334155;">
      <strong>Zero Risk Enterprise Trial:</strong> Would you be opposed to testing Clinical-Pristine on 3 anonymized patient charts on a free 7-day hospital sandbox to see what trials get matched?
    </p>

    <p>Best regards,<br>
    <strong>Mharc Gatan</strong><br>
    Managing Director, Titan Autonomous Enterprise<br>
    <a href="https://linkable.it.com" style="color: #06b6d4; text-decoration: none;">https://linkable.it.com</a></p>

    <div class="footer">
      This is a confidential executive briefing for ${hospitalName}. Air-Gapped Sovereign Deployment • FDA 21 CFR Part 11 Invariants.
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
}

/**
 * Main Autonomous Timezone-Aware Outbound Dispatch Cycle
 * @param {Object} options { maxBatchSize: number, dryRun: boolean }
 */
async function runTimezoneAwareDispatchCycle(options = { maxBatchSize: 3, dryRun: false }) {
  console.log(`\n========================================================================`);
  console.log(`🌍 TITAN TIMEZONE-AWARE AUTONOMOUS OUTBOUND ENGINE`);
  console.log(`⏰ Current System Time: ${new Date().toISOString()} (PHT: ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila' })})`);
  console.log(`========================================================================\n`);

  if (!fs.existsSync(LEADS_FILE)) {
    console.error(`❌ Leads file not found at: ${LEADS_FILE}`);
    return { dispatched: 0, error: 'LEADS_FILE_NOT_FOUND' };
  }

  const allLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  const dispatchLog = loadDispatchLog();
  const contactedEmails = new Set(dispatchLog.map(d => (d.recipient || '').toLowerCase()));

  console.log(`📊 Total Enterprise Leads Database: ${allLeads.length}`);
  console.log(`📋 Previously Dispatched Leads:      ${contactedEmails.size}\n`);

  // Group uncontacted leads by Timezone & evaluate Golden Hour
  const goldenHourEligibleLeads = [];
  const timezoneSummary = {};

  for (const lead of allLeads) {
    const email = (lead.sample_email || '').toLowerCase();
    if (!email || contactedEmails.has(email)) continue;

    const tz = resolveLeadTimezone(lead);
    const tzStatus = checkTimezoneGoldenHour(tz);

    if (!timezoneSummary[tz]) {
      timezoneSummary[tz] = { localTime: tzStatus.localTimeStr, window: tzStatus.windowName, eligible: 0, pending: 0 };
    }

    if (tzStatus.isGoldenHour) {
      timezoneSummary[tz].eligible++;
      goldenHourEligibleLeads.push({ lead, tz, tzStatus });
    } else {
      timezoneSummary[tz].pending++;
    }
  }

  console.log(`🌐 [GLOBAL TIMEZONE STATUS BREAKDOWN]:`);
  console.table(Object.keys(timezoneSummary).map(tz => ({
    Timezone: tz,
    'Local Time': timezoneSummary[tz].localTime,
    'Window State': timezoneSummary[tz].window,
    'Eligible for Dispatch': timezoneSummary[tz].eligible,
    'Waiting for Golden Hour': timezoneSummary[tz].pending
  })));

  console.log(`\n🎯 Total Leads in Prime Business Hours NOW: ${goldenHourEligibleLeads.length}`);

  if (goldenHourEligibleLeads.length === 0) {
    console.log(`ℹ️ No target regions are currently in their 08:30-11:30 AM or 1:30-4:30 PM Golden Window. Standing by for next cycle.`);
    return { dispatched: 0, message: 'NO_LEADS_IN_GOLDEN_HOUR' };
  }

  // Pick up to maxBatchSize to respect SMTP rate-limits and deliverability hygiene
  const batch = goldenHourEligibleLeads.slice(0, options.maxBatchSize || 3);
  let dispatchedCount = 0;

  for (const item of batch) {
    const { lead, tz, tzStatus } = item;
    const recipient = lead.sample_email;
    const { subject, html } = generateTacticalPitch(lead);

    console.log(`\n🚀 [DISPATCHING TO ACTIVE GOLDEN HOUR REGION]`);
    console.log(`   ├─ Hospital / Account: ${lead.hospital_name} (${lead.location})`);
    console.log(`   ├─ Target Recipient:   ${recipient}`);
    console.log(`   ├─ Target Timezone:    ${tz} (Local Time: ${tzStatus.localTimeStr} • ${tzStatus.windowName})`);
    console.log(`   └─ Subject:            "${subject}"`);

    if (options.dryRun) {
      console.log(`   [DRY RUN] Message generated successfully. Skipped network send.`);
      dispatchedCount++;
      continue;
    }

    try {
      const mailOptions = {
        from: `"Mharc Gatan • Titan Autonomous" <${SENDER_EMAIL}>`,
        to: recipient,
        subject: subject,
        html: html
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✓ [SUCCESSFULLY DELIVERED] MessageId: ${info.messageId}`);

      dispatchLog.push({
        id: dispatchLog.length + 1,
        hospital: lead.hospital_name,
        recipient: recipient,
        timezone: tz,
        targetLocalTime: tzStatus.localTimeStr,
        window: tzStatus.windowName,
        status: 'SUCCESS',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });
      dispatchedCount++;

      // Polite 2-second rate limit buffer between SMTP sends
      await new Promise(r => setTimeout(r, 2000));
    } catch (sendErr) {
      console.error(`   ❌ [DISPATCH FAILED] ${sendErr.message}`);
    }
  }

  if (!options.dryRun && dispatchedCount > 0) {
    saveDispatchLog(dispatchLog);
    console.log(`\n💾 Saved ${dispatchedCount} new dispatches to ${DISPATCH_LOG_FILE}`);
  }

  console.log(`\n✨ Timezone Outbound Dispatch Cycle Finished. Dispatched: ${dispatchedCount} accounts.`);
  return { dispatched: dispatchedCount, batchSize: batch.length };
}

module.exports = {
  runTimezoneAwareDispatchCycle,
  resolveLeadTimezone,
  checkTimezoneGoldenHour
};

if (require.main === module) {
  runTimezoneAwareDispatchCycle({ maxBatchSize: 3, dryRun: false })
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}
