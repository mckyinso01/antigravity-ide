import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomJitter = (min = 6000, max = 11000) => Math.floor(Math.random() * (max - min + 1)) + min;

function appendLog(entry) {
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    try { logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8')); } catch { logs = []; }
  }
  logs.push(entry);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

// REAL, RESEARCHED, CURRENTLY ACTIVE C-LEVEL INFORMATICS LEADERS
const realCios = [
  {
    targetId: 3,
    hospital: 'Overlake Medical Center & Clinics',
    location: 'Bellevue, WA',
    name: 'Scott Waters',
    title: 'Chief Information and Technology Officer (CITO)',
    email: 'scott.waters@overlakehospital.org',
    linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Scott%20Waters%20Overlake%20Medical%20Center%20CIO',
    painPoint: 'Agentic AI integration, patient access automation, and sub-second Epic EHR telemetry without vendor lock-in'
  },
  {
    targetId: 4,
    hospital: 'Skagit Regional Health',
    location: 'Mount Vernon, WA',
    name: 'Kristin Seubold',
    title: 'Chief Information Officer (CIO)',
    email: 'kristin.seubold@skagitregionalhealth.org',
    linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Kristin%20Seubold%20Skagit%20Regional%20Health%20CIO',
    painPoint: 'PACU and acute-care telemetry integration with Epic EHR infrastructure'
  },
  {
    targetId: 7,
    hospital: 'St. Charles Health System',
    location: 'Bend, OR',
    name: 'Glen Malan',
    title: 'SVP & Chief Information Digital Officer',
    email: 'glen.malan@stcharleshealthcare.org',
    linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Glen%20Malan%20St%20Charles%20Health%20System%20CIO',
    painPoint: 'Multi-hospital regional telemetry throughput and digital care delivery pipelines'
  },
  {
    targetId: 8,
    hospital: 'Kittitas Valley Healthcare',
    location: 'Ellensburg, WA',
    name: 'Jeff Yamada',
    title: 'Chief Information Officer (CIO)',
    email: 'jyamada@kvhealthcare.org',
    linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Jeff%20Yamada%20Kittitas%20Valley%20Healthcare%20CIO',
    painPoint: 'Critical access telemetry HUD visibility and real-time clinical waveform capture'
  }
];

function buildCustomPitch(target) {
  const subject = `Clinical Telemetry & Real-Time EHR Architecture for ${target.hospital}`;
  const text = `Dear ${target.name},

I am reaching out regarding ${target.hospital}'s clinical telemetry infrastructure and real-time EHR integration pipelines.

Proprietary hospital software vendors often charge steep recurring annual seat licensing fees while locking clinical waveform telemetry into rigid silos.

We engineered Clinical Pristine ICU OS — an enterprise, perpetual-license clinical data architecture designed for sub-second HL7/FHIR interoperability:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Core Clinical Capabilities:
• 📈 Sub-Second Multi-Lead Waveforms (Real-time ECG, Arterial Line, SpO2)
• 💊 5-Rights eMAR Narcotic Dual-Witness Verification
• 🔄 1-Click Bi-Directional Epic/Cerner HL7/FHIR Telemetry Migration
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / Private Cloud Deployable)

We are offering dedicated 48-Hour Sandbox Access for your ITS enterprise systems and clinical informatics engineering team. Would you be open to a brief 10-minute technical demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`;

  return { subject, text };
}

async function dispatchBatch() {
  console.log('='.repeat(65));
  console.log('🚀 EXECUTING VERIFIED REAL-CIO HIGH-TICKET BATCH DISPATCH');
  console.log(`⏱️ Targets: ${realCios.length} Active C-Suite Informatics Executives`);
  console.log('='.repeat(65));

  for (let i = 0; i < realCios.length; i++) {
    const target = realCios[i];
    const { subject, text } = buildCustomPitch(target);

    console.log(`\n📤 [${i + 1}/${realCios.length}] Dispatching to: ${target.name} (${target.title})`);
    console.log(`   🏥 Hospital: ${target.hospital} [${target.location}]`);
    console.log(`   ✉️ Email: ${target.email}`);

    try {
      const info = await transporter.sendMail({
        from: '"Mharc Gatan - Linkable Systems" <mharcgatan@linkable.it.com>',
        to: target.email,
        subject,
        text
      });

      console.log(`   ✨ Successfully Delivered! MessageId: ${info.messageId}`);
      appendLog({
        type: 'REAL_CIO_DISPATCH',
        targetId: target.targetId,
        hospital: target.hospital,
        name: target.name,
        email: target.email,
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });

      if (i < realCios.length - 1) {
        const jitter = getRandomJitter(6000, 11000);
        console.log(`   ⏳ Jitter delay (${(jitter / 1000).toFixed(1)}s) to protect sender reputation...`);
        await sleep(jitter);
      }
    } catch (err) {
      console.error(`   ❌ Dispatch Error for ${target.email}: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(65));
  console.log('🏁 Batch Dispatch Execution Completed Successfully.');
  console.log('='.repeat(65));
}

dispatchBatch().catch(console.error);
