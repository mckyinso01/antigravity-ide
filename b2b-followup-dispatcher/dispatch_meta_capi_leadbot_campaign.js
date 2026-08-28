// ==========================================================================
// B2B CAMPAIGN: META CAPI & SPEED-TO-LEAD INSTANT WHATSAPP BOT OFFER
// Targets High-Ticket Clinics, Solar Installers, and E-Commerce Brands
// ==========================================================================

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_FILE = path.join(__dirname, 'src/dispatch_log.json');

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

const CAPI_CAMPAIGN_TARGETS = [
  {
    name: "Dr. Katrina Santos",
    title: "Medical Director",
    company: "DermaElite Aesthetics Clinic BGC",
    email: "dr.katrina.santos@dermaelite.ph",
    subject: "Stop Losing 35% of Meta Ad Bookings (Server-Side CAPI + <3s WhatsApp Speed-to-Lead)",
    body: `Dear Dr. Katrina,

Noticed DermaElite Aesthetics is actively running Meta Ads for premium HIFU, Thermage, and skin rejuvenation treatments.

Two critical bottlenecks cost aesthetic clinics ₱150,000+ in wasted patient acquisition every month:
1. iOS 14 & AdBlockers hide 35% of booked consultations from your Facebook Pixel, causing Meta's algorithm to optimize for low-quality clicks.
2. Inquiries that wait more than 5 minutes for a response drop their booking conversion rate by 70%.

We built a turnkey solution for clinics:

👉 Live Technical Overview & Demo: https://linkable.it.com/pilot.html?client=DermaEliteClinic&amount=450

What we install in 48 Hours:
• 🛡️ Server-Side Meta Conversions API (CAPI) Gateway: 100% data recovery via server-to-server SHA-256 hashed matching (Event Quality Score 8.5/10+).
• ⚡ Sub-3-Second WhatsApp Speed-to-Lead Bot: The instant a patient submits a Meta Lead form, our bot messages them on WhatsApp, qualifies their treatment preference, and books them directly into your consultation calendar.

⚡ 48-HOUR FAST PILOT (₱25,000 / $450 USD — 100% REFUNDABLE):
If your consultation booking speed does not jump to sub-3-seconds during our live test, 100% of your deposit is refunded immediately.

👉 Official Pilot Proposal & 1-Click Escrow Deposit:
https://linkable.it.com/pilot.html?client=DermaEliteClinic&amount=450

When are you free for a 10-minute live demonstration this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com
Master Portfolio: https://linkable.it.com`
  },
  {
    name: "Engr. Gabriel Navarro",
    title: "Managing Director",
    company: "SunPower Philippines & Apex Solar",
    email: "g.navarro@sunpowerph.com",
    subject: "Sub-3-Second WhatsApp Speed-to-Lead for Commercial & Residential Solar Inquiries",
    body: `Hi Engr. Gabriel,

Saw your high-converting Meta Ad campaigns for residential and commercial solar installations across Luzon.

In the solar industry, a single qualified rooftop inquiry is worth ₱350,000 – ₱1.2M in contract value. However, when homeowners fill out a Facebook Lead Form, competing solar companies often call them first if your team takes more than 10 minutes to respond.

We developed an instant speed-to-lead gateway:

👉 Live Interactive Demo: https://linkable.it.com/pilot.html?client=SunPowerPH&amount=450

How it accelerates your revenue:
• ⚡ Sub-3-Second WhatsApp Engagement: As soon as a lead submits their electricity bill estimate on Meta, our webhook bot triggers a personalized WhatsApp message with your project portfolio and an instant site-inspection scheduler.
• 📊 Lead Qualification Tiering: Automatically scores high-intent homeowners (₱10k+/mo Meralco bill) and immediately sends an SMS dispatch alert to your senior sales engineers.
• 🛡️ Server-Side Meta CAPI: Restores lost ad attribution for closed solar contracts.

⚡ 48-HOUR FAST-START INSTALLATION ($450 USD / ₱25,000):
We can have your Meta Lead Forms connected to WhatsApp within 48 hours. 100% Money-Back Guarantee.

👉 Lock in Installation via PayPal Escrow:
https://linkable.it.com/pilot.html?client=SunPowerPH&amount=450

Let me know if you would like a 10-minute walkthrough!

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com`
  },
  {
    name: "Dr. Miguel Reyes",
    title: "Principal Implant Specialist",
    company: "Reyes Dental Implant Specialists",
    email: "dr.miguel@reyesdental.ph",
    subject: "Fixing Meta Pixel Dropoff & Instant Appointment Booking for Dental Implants & Veneers",
    body: `Dear Dr. Miguel,

For high-ticket dental procedures like Full-Arch Implants and Porcelain Veneers (₱120k - ₱300k+ packages), patient trust and immediate responsiveness determine who gets the booking.

If a patient inquires at 9:00 PM and only gets a reply the next morning, they have already messaged 3 other dental clinics.

We built a dedicated solution:

👉 Live Interactive Demo: https://linkable.it.com/pilot.html?client=ReyesDental&amount=450

What we deliver in 48 hours:
• ⚡ Sub-3-Second WhatsApp Consultation Concierge: Greets inquiring patients immediately, provides pricing transparency, and reserves their preliminary X-ray slot.
• 🛡️ Server-Side Meta CAPI: Ensures Meta's algorithm finds more high-net-worth patients looking for premium smile makeovers.

⚡ 48-HOUR FAST SPRINT ($450 USD — 100% REFUNDABLE):
Includes complete Meta webhook setup, WhatsApp API integration, and staff training.

👉 Official Pilot Agreement & 1-Click Escrow Checkout:
https://linkable.it.com/pilot.html?client=ReyesDental&amount=450

Would you be open for a brief 10-minute call this Thursday or Friday?

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com`
  },
  {
    name: "Camilla Soriano",
    title: "Founder & CEO",
    company: "GlowLuxe Skincare E-Commerce",
    email: "camilla@glowluxeshop.com",
    subject: "Recover 35% Lost Shopify Purchases on Meta Ads via Server-Side CAPI Gateway",
    body: `Hi Camilla,

Saw your scaling Meta Ads for GlowLuxe Skincare.

If you are noticing discrepancies between your Shopify dashboard sales and your Meta Ads Manager reported ROAS, browser ad-blockers and Apple iOS 14.5+ are silently blocking up to 35% of your purchase events from firing.

When Meta doesn't see your purchases, its algorithm bids inefficiently and increases your Customer Acquisition Cost (CAC).

We engineered a Server-Side Meta CAPI Gateway:

👉 Live Interactive Demo: https://linkable.it.com/pilot.html?client=GlowLuxeSkincare&amount=450

How it fixes your ROAS:
• 🛡️ Server-to-Server SHA-256 Event Stream: Sends 100% of Shopify/WooCommerce purchases directly from the server to Meta Graph API v20.0 with Event Match Quality ≥ 8.5/10.
• 🎯 Exact Event Deduplication: Prevents double-counting with browser pixels.
• ⚡ Immediate Ad Algorithm Retargeting: Meta instantly identifies high-LTV repeat buyers.

⚡ 48-HOUR FAST-START DEPLOYMENT ($450 USD / ₱25,000):
Turnkey setup on your store with 100% money-back guarantee.

👉 Lock in Pilot via PayPal Escrow:
https://linkable.it.com/pilot.html?client=GlowLuxeSkincare&amount=450

Let me know if you would like us to check your store's current Pixel Match Quality score!

Best regards,
Mharc Gatan
Lead Solutions Architect | Linkable Systems
Direct: mharcgatan@linkable.it.com`
  }
];

async function dispatchCapiCampaign() {
  console.log('='.repeat(70));
  console.log('🚀 EXECUTING META CAPI & SPEED-TO-LEAD B2B OUTBOUND BLITZ');
  console.log('Target: 4 High-Ticket Clinics, Solar & E-Commerce Brands');
  console.log('='.repeat(70));

  let successCount = 0;

  for (let i = 0; i < CAPI_CAMPAIGN_TARGETS.length; i++) {
    const lead = CAPI_CAMPAIGN_TARGETS[i];
    console.log(`\n[${i + 1}/${CAPI_CAMPAIGN_TARGETS.length}] Sending to: ${lead.name} (${lead.company}) [${lead.email}]...`);

    const mailOptions = {
      from: `"Mharc Gatan | Linkable Systems" <${process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com'}>`,
      to: lead.email,
      subject: lead.subject,
      text: lead.body
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`   ✨ Successfully Delivered! MessageId: ${info.messageId}`);
      successCount++;

      // Log dispatch
      const logEntry = {
        clientName: lead.name,
        company: lead.company,
        email: lead.email,
        subject: lead.subject,
        messageId: info.messageId,
        checkoutLink: `https://linkable.it.com/pilot.html?client=${lead.company.replace(/\s+/g, '')}&amount=450`,
        status: 'DELIVERED_SUCCESS',
        timestamp: new Date().toISOString()
      };

      let logs = [];
      if (fs.existsSync(LOG_FILE)) {
        try { logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')); } catch { logs = []; }
      }
      logs.push(logEntry);
      fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');

      // Jitter delay between messages
      await new Promise(r => setTimeout(r, 4500));
    } catch (err) {
      console.error(`   ❌ Dispatch Notice: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 META CAPI & SPEED-TO-LEAD CAMPAIGN FINISHED: ${successCount}/${CAPI_CAMPAIGN_TARGETS.length} Delivered with 1-Click Escrow Links!`);
  console.log('='.repeat(70));
}

dispatchCapiCampaign();
