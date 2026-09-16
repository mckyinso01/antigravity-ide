import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

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

const mailOptions = {
  from: '"Mharc Gatan - Linkable Systems" <mharcgatan@linkable.it.com>',
  to: 'david.kinyon@asante.org',
  subject: 'Epic EHR Telemetry & Multi-Campus Interoperability for Asante Health System',
  text: `Dear David,

I am reaching out regarding Asante Health System's multi-campus clinical telemetry and Epic EHR integration architecture across Rogue Regional, Three Rivers, and Ashland.

Proprietary hospital software vendors often charge steep recurring annual seat licensing fees while locking clinical waveform telemetry into rigid silos.

We engineered Clinical Pristine ICU OS — an enterprise, perpetual-license clinical data architecture designed for sub-second HL7/FHIR interoperability:
👉 Live Interactive Telemetry Sandbox: https://clinical.linkable.it.com

Core Clinical Capabilities:
• 📈 Sub-Second Multi-Lead Waveforms (Real-time ECG, Arterial Line, SpO2)
• 💊 5-Rights eMAR Narcotic Dual-Witness Verification
• 🔄 1-Click Bi-Directional Epic HL7/FHIR Telemetry Migration
• 🛡️ Zero Cloud Data Leakage (100% On-Premise / Private Cloud Deployable)

We are offering dedicated 48-Hour Sandbox Access for your ITS enterprise systems and clinical informatics engineering team. Would you be open to a brief 10-minute technical demonstration this week?

Sincerely,

Mharc Gatan
Lead Solutions Architect | Linkable Systems
🌐 Portfolio & Production Platforms: https://linkable.it.com
📧 Direct: mharcgatan@linkable.it.com`
};

async function send() {
  console.log('Dispatching personalized pitch to David Kinyon (SVP & CIO, Asante Health System)...');
  const info = await transporter.sendMail(mailOptions);
  console.log('✨ Successfully Delivered to Asante Health CIO! MessageId:', info.messageId);
}

send().catch(console.error);
