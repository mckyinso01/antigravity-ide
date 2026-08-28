import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.spacemail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    pass: process.env.SMTP_PASS || 'Melonjuice01!'
  },
  tls: { rejectUnauthorized: false }
});

const mailOptions = {
  from: `"Mharc Gatan | Linkable Systems" <mharcgatan@linkable.it.com>`,
  to: "marcus.thorne.ventures@gmail.com",
  subject: "Re: Automotive Dealership & Fleet CRM OS — Live Interactive Sandbox Built for Apex AutoTech",
  text: `Hi Marcus,

Saw your post regarding the automotive dealership inventory and fleet CRM platform you're architecting for Apex AutoTech.

Instead of generic slides or wireframes, our engineering team built and deployed a live functional sandbox tailored to your exact specifications:

👉 Live Interactive Demo: https://apexautotech.linkable.it.com
👉 Mirror Domain: https://apex-autotech.surge.sh

What is already built & running in your browser:
• 🚗 Real-time Dealership Stock & Holding Cost Ledger with dynamic lot aging depreciation & net margin calculation
• ⚡ 60fps OBD-II CAN-Bus Telemetry Stream (Speed, MAF, Instant MPG, and P0300 misfire fault simulation)
• 📋 4-Stage CRM Client Pipeline (Inbound, Test Drive Scheduled, Financing/Lease RFP, Delivered)
• 🔒 Dual-Witness Digital Vehicle Handover & Service Sign-off with WORM SHA-256 cryptographic seal

⚡ 48-HOUR FAST-START SPRINT:
We offer a dedicated, white-labeled sandbox deployment pre-loaded with your dealership's vehicle inventory for a flat $650 USD refundable pilot deposit (100% credited towards the $4,500 full project handover).

👉 Official Pilot Proposal & Agreement:
https://linkable.it.com/pilot.html?client=ApexAutoTech

Would you be open to a 10-minute live walkthrough of the platform this Thursday or Friday?

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com
Master Portfolio: https://linkable.it.com`
};

async function sendMarcus() {
  console.log('Sending single pitch to Marcus Thorne (Apex AutoTech)...');
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ SUCCESS! MessageId: ${info.messageId}`);
  } catch (err) {
    console.error(`❌ SMTP Response: ${err.message}`);
  }
}

sendMarcus();
