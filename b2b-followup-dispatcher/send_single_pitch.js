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
  to: "tariq.almansoor.commerce@gmail.com",
  subject: "Re: Multi-Vendor Marketplace Platform — Live Interactive Sandbox Built for Tariq Al-Mansoor",
  text: `Hi Tariq,

Saw your post regarding the multi-vendor marketplace platform you're seeking to develop.

Instead of wireframes or slides, our engineering team built and deployed a live functional sandbox tailored to your exact specifications:

👉 Live Interactive Demo: https://bazaartrust.linkable.it.com
👉 Mirror Domain: https://bazaartrust-marketplace.surge.sh

What is already built & running in your browser:
• 🛍️ Multi-Vendor Storefront Catalog with dynamic stock and 1-click escrow checkout
• ⚡ 60fps Real-time Escrow Pipeline Stream visualizing funds held vs platform commission yield
• 📊 Automated 3-Way Commission Split Ledger (12.5% Platform, 2.9%+$0.30 Gateway, 5% Dispute Reserve, Vendor Net Payout)
• 🔒 WORM SHA-256 Cryptographic Escrow Release & Delivery Sign-off Certificates

⚡ 48-HOUR FAST-START SPRINT ($650 USD REFUNDABLE DEPOSIT):
We can deploy a dedicated, white-labeled sandbox pre-loaded with your merchant categories and commission rules. The $650 deposit is 100% credited towards the $4,000 project milestone.

👉 Official Pilot Proposal:
https://linkable.it.com/pilot.html?client=TariqAlMansoor

When are you free for a brief 10-minute technical walkthrough this Thursday or Friday?

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com
Master Portfolio: https://linkable.it.com`
};

async function send() {
  console.log('Sending single pitch to Tariq Al-Mansoor...');
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ SUCCESS! MessageId: ${info.messageId}`);
  } catch (err) {
    console.error(`❌ SMTP Response: ${err.message}`);
  }
}

send();
