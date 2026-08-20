// 🚀 LINKABLEAI 5-FLAGSHIP MULTI-VERTICAL OUTREACH DISPATCHER v5.0
// Founder & CEO: Mharc Gatan <mharcgatan@linkable.it.com>
// Dual Escalation: mckinsyo01@gmail.com

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const { generateClaimGuardPitch } = require('./pitches/claimguard_pitch_template');
const { generateClinicalPitch } = require('./pitches/clinical_pitch_template');
const { generateSiteSafePitch } = require('./pitches/sitesafe_pitch_template');
const { generateOmniStockPitch } = require('./pitches/omnistock_pitch_template');
const { generateSaccadePitch } = require('./pitches/saccade_pitch_template');

// Load .env
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
const FOUNDER_PERSONAL = process.env.ESCALATION_EMAIL || 'mckinsyo01@gmail.com';

const transporter = nodemailer.createTransport({
  host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SPACEMAIL_SMTP_PORT || '465', 10),
  secure: true,
  auth: { user: SENDER_EMAIL, pass: SENDER_PASS }
});

const PITCH_GENERATORS = {
  claimguard: generateClaimGuardPitch,
  clinical: generateClinicalPitch,
  sitesafe: generateSiteSafePitch,
  omnistock: generateOmniStockPitch,
  saccade: generateSaccadePitch
};

async function dispatchColdEmail(vertical, lead, recipientEmail) {
  const generator = PITCH_GENERATORS[vertical.toLowerCase()] || generateClaimGuardPitch;
  const { subject, plainText, html } = generator(lead);

  const mailOptions = {
    from: `"Mharc Gatan | LinkableAI" <${SENDER_EMAIL}>`,
    to: recipientEmail,
    subject: subject,
    text: plainText,
    html: html
  };

  console.log(`📤 Dispatching [${vertical.toUpperCase()}] pitch to ${recipientEmail}...`);
  console.log(`📌 Subject: "${subject}"`);
  
  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ [${vertical.toUpperCase()}] Dispatch Success! MessageId: ${info.messageId}`);
  return { success: true, messageId: info.messageId, vertical, timestamp: new Date().toISOString() };
}

// Test Suite: Send 1 sample of each vertical to Founder
async function runPitchSuiteDemo() {
  console.log('\n================================================================');
  console.log('🧪 RUNNING LINKABLEAI 5-FLAGSHIP PITCH SUITE TEST RUN');
  console.log(`⏰ Timestamp: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })} PHT`);
  console.log(`📬 Recipient: ${FOUNDER_PERSONAL} & ${SENDER_EMAIL}`);
  console.log('================================================================\n');

  const demoLead = {
    hospital_name: 'Memorial Hermann Health System',
    company_name: 'Memorial Hermann / Skanska Commercial',
    decision_maker: 'David Callender, MD',
    pain_point: 'managing surgical claim denials and acute patient throughput',
    core_ehr: 'Epic EHR'
  };

  console.log('1️⃣ Sending ClaimGuard AI Pitch...');
  await dispatchColdEmail('claimguard', demoLead, FOUNDER_PERSONAL);

  console.log('\n✅ ClaimGuard AI test pitch successfully delivered to founder inbox.');
}

module.exports = { dispatchColdEmail, runPitchSuiteDemo };

if (require.main === module) {
  runPitchSuiteDemo()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('❌ Error executing pitch dispatcher:', err);
      process.exit(1);
    });
}
