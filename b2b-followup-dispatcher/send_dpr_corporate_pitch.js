import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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
  from: `"Mharc Gatan | Linkable Systems" <mharcgatan@linkable.it.com>`,
  to: "info@dpr.com",
  subject: "FAO: Project Controls Leadership & Management Committee — SiteSafe StructuraPro (CPM Delay Defense & NOAA Weather Sandbox)",
  text: `Hello DPR Construction Operations & Project Controls Leadership,

Reaching out regarding technical risk mitigation for DPR's mission-critical, healthcare, and advanced technology building portfolios.

Our engineering group has deployed a sovereign project controls architecture engineered specifically for tier-1 technical commercial builders:

👉 Live Interactive Demo: https://sitesafe.linkable.it.com
👉 Technical Architecture Mirror: https://sitesafe.surge.sh

Built & verifiable directly in your browser:
• 🏗️ Dynamic CPM Critical Path Delay Telemetry & automated liquidated damages defense packets
• 🌦️ NOAA-Certified Weather Threshold Delay Claims (wind shut-off telemetry, concrete curing temp thresholds)
• 📋 Subcontractor dispute forensics & schedule variance audit trail
• 🔒 Sovereign field architecture with zero perpetual SaaS lock-in

We recently connected with George Pfeffer regarding this capability, and we are sharing this live sandbox with your central intake team so it can be routed to your Project Controls and Operational Excellence leadership.

Could we schedule a brief 10-minute technical briefing with your team this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com
Master Enterprise Portfolio: https://linkable.it.com`
};

async function send() {
  console.log('Sending corporate pitch to info@dpr.com discovered via Facebook Contact Info...');
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ SUCCESS! Delivered to info@dpr.com. MessageId: ${info.messageId}`);
  } catch (err) {
    console.error(`❌ SMTP Error: ${err.message}`);
  }
}

send();
