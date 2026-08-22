// 🚀 LINKABLEAI 5-FLAGSHIP MULTI-VERTICAL OUTREACH DISPATCHER v6.0
// Founder & CEO: Mharc Gatan <mharcgatan@linkable.it.com>
// Dual Escalation: mckinsyo01@gmail.com
// Manages: Clinical Pristine (Healthcare), ClaimGuard AI (Claims Defense), SiteSafe-AI (Construction), OmniStock (Retail/WMS), Saccade-UI (Design/CRO)

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const { generateClaimGuardPitch } = require('./pitches/claimguard_pitch_template');
const { generateClaimGuardCrossSellPitch } = require('./pitches/claimguard_cross_sell_pitch_template');
const { generateClinicalPitch } = require('./pitches/clinical_pitch_template');
const { generateSiteSafePitch } = require('./pitches/sitesafe_pitch_template');
const { generateOmniStockPitch } = require('./pitches/omnistock_pitch_template');
const { generateSaccadePitch } = require('./pitches/saccade_pitch_template');

const DIR = __dirname;
const OMNISTOCK_DIR = path.join(DIR, '..', 'omnistock_leads_database');

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
const FOUNDER_PERSONAL = process.env.ESCALATION_EMAIL || 'mckinsyo01@gmail.com';

const transporter = nodemailer.createTransport({
  host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SPACEMAIL_SMTP_PORT || '465', 10),
  secure: true,
  auth: { user: SENDER_EMAIL, pass: SENDER_PASS }
});

const PITCH_GENERATORS = {
  claimguard: generateClaimGuardPitch,
  'claimguard-cross-sell': generateClaimGuardCrossSellPitch,
  clinical: generateClinicalPitch,
  sitesafe: generateSiteSafePitch,
  omnistock: generateOmniStockPitch,
  saccade: generateSaccadePitch
};

function getLeadsForVertical(vertical) {
  switch (vertical.toLowerCase()) {
    case 'sitesafe': {
      const p = path.join(DIR, 'verified_sitesafe_leads.json');
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
    }
    case 'saccade': {
      const p = path.join(DIR, 'verified_saccade_leads.json');
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
    }
    case 'clinical': {
      const p = path.join(DIR, 'verified_100_us_uk_hospitals.json');
      return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : [];
    }
    case 'omnistock': {
      const p1 = path.join(DIR, '..', 'omnistock_100_verified_leads.json');
      const p2 = path.join(OMNISTOCK_DIR, 'verified_omnistock_leads_batch2.json');
      const l1 = fs.existsSync(p1) ? JSON.parse(fs.readFileSync(p1, 'utf8')) : [];
      const l2 = fs.existsSync(p2) ? JSON.parse(fs.readFileSync(p2, 'utf8')) : [];
      return [...l1, ...l2];
    }
    case 'claimguard':
    case 'claimguard-cross-sell': {
      const { getCleanEligibleHospitalLeads } = require('./claimguard_cross_sell_dispatcher');
      return getCleanEligibleHospitalLeads();
    }
    default:
      return [];
  }
}

async function dispatchColdEmail(vertical, lead, recipientEmail, isDryRun = false) {
  const generator = PITCH_GENERATORS[vertical.toLowerCase()] || generateClaimGuardPitch;
  const { subject, plainText, html } = generator(lead);

  console.log(`📤 [${vertical.toUpperCase()}] Target: ${lead.contact_name || lead.decisionMaker || lead.decision_maker || 'Executive'} <${recipientEmail}>`);
  console.log(`📌 Subject: "${subject}"`);

  if (isDryRun) {
    console.log(`🧪 [DRY-RUN] Email rendered cleanly. Skipping live SMTP.`);
    return { success: true, dryRun: true, vertical, timestamp: new Date().toISOString() };
  }

  const mailOptions = {
    from: `"Mharc Gatan | LinkableAI" <${SENDER_EMAIL}>`,
    to: recipientEmail,
    subject: subject,
    text: plainText,
    html: html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ [${vertical.toUpperCase()}] Dispatch Success! MessageId: ${info.messageId}`);
  return { success: true, messageId: info.messageId, vertical, timestamp: new Date().toISOString() };
}

// Test Suite: Renders sample pitches for all 5 flagships
async function runPitchSuiteDemo(isDryRun = true) {
  console.log('\n================================================================');
  console.log('🧪 RUNNING LINKABLEAI 5-FLAGSHIP MULTI-VERTICAL SUITE');
  console.log(`⏰ Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })} PHT`);
  console.log(`⚙️ Mode: ${isDryRun ? 'DRY RUN' : 'LIVE DISPATCH'}`);
  console.log('================================================================\n');

  const verticals = ['clinical', 'claimguard-cross-sell', 'sitesafe', 'omnistock', 'saccade'];

  for (const v of verticals) {
    const leads = getLeadsForVertical(v);
    const sampleLead = leads[0] || {
      company_name: 'Enterprise Target Corp',
      hospital_name: 'Enterprise Health System',
      contact_name: 'Alex Mercer',
      decisionMaker: 'Alex Mercer',
      pain_point: 'eliminating operational and manual workflow bottlenecks'
    };

    console.log(`\n--- VERTICAL: ${v.toUpperCase()} (Total Pool: ${leads.length} leads) ---`);
    await dispatchColdEmail(v, sampleLead, FOUNDER_PERSONAL, isDryRun);
  }

  console.log('\n================================================================');
  console.log('✅ ALL 5-FLAGSHIP PITCH GENERATORS VALIDATED SUCCESSFULLY!');
  console.log('================================================================\n');
}

module.exports = {
  dispatchColdEmail,
  getLeadsForVertical,
  runPitchSuiteDemo
};

if (require.main === module) {
  const args = process.argv.slice(2);
  const isLive = args.includes('--live');
  runPitchSuiteDemo(!isLive)
    .then(() => process.exit(0))
    .catch(err => {
      console.error('❌ Error executing multi-vertical suite:', err);
      process.exit(1);
    });
}
