// 🛡️ CLAIMGUARD AI - HOSPITAL CROSS-SELL DISPATCHER v1.0
// Sequenced follow-up to hospital decision makers who previously received Clinical Pristine outreach.
// Rate-limited warmup queue: 5 emails/batch with 35-55s jitter.

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { generateClaimGuardCrossSellPitch } = require('./pitches/claimguard_cross_sell_pitch_template');

const DIR = __dirname;
const OUTREACH_LOG_PATH = path.join(DIR, 'outreach_dispatch_log.json');
const VERIFIED_LEADS_PATH = path.join(DIR, 'verified_100_us_uk_hospitals.json');
const STATE_PATH = path.join(DIR, 'claimguard_cross_sell_state.json');
const LOG_PATH = path.join(DIR, 'claimguard_cross_sell_log.json');

// Known hard bounces to strictly exclude
const BOUNCED_EMAILS = new Set([
  'gary.smith@skagitregionalhealth.org',
  'steve.baker@crh.org',
  'drew.early@memorial.health',
  'ryan.venier@ksbhospital.com'
]);

// Load .env
const envPath = path.join(DIR, '.env');
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

function getCleanEligibleHospitalLeads() {
  const outreachLog = fs.existsSync(OUTREACH_LOG_PATH)
    ? JSON.parse(fs.readFileSync(OUTREACH_LOG_PATH, 'utf8') || '[]')
    : [];
  const verifiedLeads = fs.existsSync(VERIFIED_LEADS_PATH)
    ? JSON.parse(fs.readFileSync(VERIFIED_LEADS_PATH, 'utf8') || '[]')
    : [];

  const sentMap = new Map();
  outreachLog.forEach(item => {
    if (item.recipient) {
      const cleanEmail = item.recipient.toLowerCase().trim();
      if (!sentMap.has(cleanEmail)) {
        sentMap.set(cleanEmail, item);
      }
    }
  });

  const eligible = [];
  let id = 1;

  for (const [email, dispatch] of sentMap.entries()) {
    if (BOUNCED_EMAILS.has(email)) continue;

    const leadInfo = verifiedLeads.find(
      l => (l.email || l.verified_email || '').toLowerCase().trim() === email
    ) || {};

    eligible.push({
      id: id++,
      email,
      hospital: leadInfo.hospital_name || dispatch.hospital || leadInfo.name || 'Hospital',
      location: leadInfo.location || leadInfo.state || 'USA',
      decisionMaker: leadInfo.contact_name || leadInfo.executive_name || leadInfo.name || 'Hospital Executive',
      title: leadInfo.title || leadInfo.role || 'Chief Information / Operations Officer',
      core_ehr: leadInfo.core_ehr || 'Epic / Cerner'
    });
  }

  return eligible;
}

function loadState() {
  if (fs.existsSync(STATE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {}
  }
  return {
    currentIndex: 0,
    totalDispatched: 0,
    dailyBatchSize: 5,
    delaySecondsMin: 35,
    delaySecondsMax: 55,
    lastDispatchedAt: null,
    history: []
  };
}

function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
}

function appendLog(entry) {
  const logs = fs.existsSync(LOG_PATH)
    ? JSON.parse(fs.readFileSync(LOG_PATH, 'utf8') || '[]')
    : [];
  logs.push(entry);
  fs.writeFileSync(LOG_PATH, JSON.stringify(logs, null, 2), 'utf8');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomJitter(minSec = 35, maxSec = 55) {
  return Math.floor(Math.random() * (maxSec - minSec + 1) + minSec) * 1000;
}

async function runClaimGuardCrossSell(options = { dryRun: true, batchSize: 5 }) {
  const leads = getCleanEligibleHospitalLeads();
  const state = loadState();

  console.log('================================================================');
  console.log('🛡️ LINKABLEAI CLAIMGUARD AI HOSPITAL CROSS-SELL DISPATCHER');
  console.log(`📋 Total Clean Eligible Hospital Leads: ${leads.length}`);
  console.log(`📌 Current Queue Index: ${state.currentIndex} / ${leads.length}`);
  console.log(`⚙️ Mode: ${options.dryRun ? 'DRY-RUN (No SMTP transmission)' : 'LIVE SMTP DISPATCH'}`);
  console.log(`📦 Batch Size: ${options.batchSize}`);
  console.log('================================================================\n');

  if (state.currentIndex >= leads.length) {
    console.log('✅ All eligible hospital leads have already been sequenced with ClaimGuard AI cross-sell.');
    return { status: 'COMPLETED', totalEligible: leads.length, dispatched: state.totalDispatched };
  }

  const batch = leads.slice(state.currentIndex, state.currentIndex + options.batchSize);
  console.log(`🚀 Processing batch of ${batch.length} leads (Range: #${state.currentIndex + 1} to #${state.currentIndex + batch.length})...\n`);

  const batchResults = [];

  for (let i = 0; i < batch.length; i++) {
    const lead = batch[i];
    const { subject, plainText, html } = generateClaimGuardCrossSellPitch(lead);

    console.log(`[${i + 1}/${batch.length}] Target: ${lead.decisionMaker} (${lead.email}) @ ${lead.hospital}`);
    console.log(`   📌 Subject: "${subject}"`);

    if (options.dryRun) {
      console.log('   🧪 [DRY-RUN] Generated successfully. (Skipping live SMTP send)\n');
      batchResults.push({ email: lead.email, hospital: lead.hospital, status: 'DRY_RUN_OK', timestamp: new Date().toISOString() });
    } else {
      try {
        const mailOptions = {
          from: `"Mharc Gatan | LinkableAI" <${SENDER_EMAIL}>`,
          to: lead.email,
          subject,
          text: plainText,
          html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`   ✅ Sent! MessageID: ${info.messageId}`);
        const logEntry = {
          recipient: lead.email,
          hospital: lead.hospital,
          decisionMaker: lead.decisionMaker,
          subject,
          messageId: info.messageId,
          timestamp: new Date().toISOString()
        };
        appendLog(logEntry);
        batchResults.push({ ...logEntry, status: 'SUCCESS' });
      } catch (err) {
        console.error(`   ❌ Failed to send to ${lead.email}:`, err.message);
        batchResults.push({ email: lead.email, hospital: lead.hospital, status: 'FAILED', error: err.message });
      }

      if (i < batch.length - 1) {
        const delay = randomJitter(state.delaySecondsMin, state.delaySecondsMax);
        console.log(`   ⏳ Pacing jitter: waiting ${(delay / 1000).toFixed(1)}s before next dispatch...\n`);
        await sleep(delay);
      }
    }
  }

  if (!options.dryRun) {
    state.currentIndex += batch.length;
    state.totalDispatched += batchResults.filter(r => r.status === 'SUCCESS').length;
    state.lastDispatchedAt = new Date().toISOString();
    state.history.push({
      runAt: state.lastDispatchedAt,
      batchRange: `${state.currentIndex - batch.length + 1}-${state.currentIndex}`,
      successCount: batchResults.filter(r => r.status === 'SUCCESS').length,
      failedCount: batchResults.filter(r => r.status === 'FAILED').length
    });
    saveState(state);
  }

  console.log('🏁 Batch processing complete.');
  return { results: batchResults, nextIndex: state.currentIndex + (options.dryRun ? 0 : batch.length) };
}

module.exports = {
  getCleanEligibleHospitalLeads,
  runClaimGuardCrossSell
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const isLive = args.includes('--live');
  const batchArg = args.find(a => a.startsWith('--batch='));
  const batchSize = batchArg ? parseInt(batchArg.split('=')[1], 10) : 5;

  runClaimGuardCrossSell({ dryRun: !isLive, batchSize })
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Fatal execution error:', err);
      process.exit(1);
    });
}
