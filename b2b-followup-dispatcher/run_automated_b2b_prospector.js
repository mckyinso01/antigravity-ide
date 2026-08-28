// ==========================================================================
// AUTOMATED B2B PROSPECTOR & DISPATCH ENGINE
// Ingests High-Ticket Local & Global Businesses, Generates Tailored Pilots & Dispatches
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

const TARGET_BUSINESS_PROSPECTS = [
  {
    name: "Dr. Oliver & Medical Team",
    title: "Clinic Director",
    company: "Skin101 Aesthetics Clinics",
    email: "inquiries@skin101clinics.com",
    category: "Aesthetic Medicine",
    subject: "Stop Losing 35% of Meta Ad Bookings (Server-Side CAPI + <3s WhatsApp Speed-to-Lead)",
    body: `Hi Skin101 Medical & Marketing Team,

Noticed Skin101 Clinics is actively scaling Meta Ads for laser, acne surgery, and skin rejuvenation treatments across Metro Manila.

Two critical technical bottlenecks cost aesthetic clinics ₱150,000+ in lost patients every month:
1. iOS 14.5+ & AdBlockers hide 35% of booked consultations from your Facebook Pixel, degrading your Meta ROAS.
2. Patient leads that wait more than 5 minutes for a reply on Messenger drop booking conversion by 70%.

Our engineering team built a turnkey solution:

👉 Live Demo & Escrow Portal: https://linkable.it.com/pilot.html?client=Skin101Clinics&amount=450

What we install in 48 Hours:
• 🛡️ Server-Side Meta Conversions API (CAPI) Gateway: Direct server-to-server SHA-256 event stream (Event Quality Score 8.5/10+).
• ⚡ Sub-3-Second WhatsApp & Messenger Speed-to-Lead Concierge: Greets inquiring patients immediately, qualifies treatment choice, and books directly into your branch calendar.

⚡ 48-HOUR FAST PILOT ($450 USD / ₱25,000 — 100% REFUNDABLE):
If consultation speed does not jump to sub-3-seconds during our live test, your deposit is refunded immediately.

👉 Lock in Pilot via PayPal Escrow:
https://linkable.it.com/pilot.html?client=Skin101Clinics&amount=450

When are you free for a 10-minute walkthrough this week?

Best regards,
Mharc Gatan
Lead Solutions Architect | GatzFam Dev Tools & Linkable Systems
Direct: mharcgatan@linkable.it.com
Master Supermarket: https://linkable.it.com`
  },
  {
    name: "Engr. Mike & Solar Sales Team",
    title: "Head of Residential Solar",
    company: "SolarIC Philippines",
    email: "info@solaric.ph",
    category: "Solar Engineering",
    subject: "Sub-3-Second WhatsApp Speed-to-Lead for ₱350k+ Grid-Tie Solar Inquiries",
    body: `Hi Engr. Mike & SolarIC Team,

Saw your high-converting Meta Ads promoting grid-tie rooftop solar systems across Luzon and Visayas.

In solar installations where contract values range from ₱350,000 to ₱1.5M, homeowner conversion drops dramatically when inquiries sit in Facebook Lead Forms for hours before a sales engineer calls.

We built a dedicated speed-to-lead automation engine:

👉 Live Interactive Demo: https://linkable.it.com/pilot.html?client=SolarICPH&amount=450

How it accelerates your revenue:
• ⚡ Sub-3-Second WhatsApp Engagement: Homeowners receive an instant WhatsApp response with your solar savings calculator and a 1-click site inspection booking link.
• 📊 High-Intent Scoring: Automatically categorizes inquiries with >₱10k Meralco bills as VIP and fires an instant SMS dispatch alert to your on-duty engineers.
• 🛡️ Server-Side Meta CAPI: Recovers lost tracking data to help Meta's algorithm find higher-net-worth homeowners.

⚡ 48-HOUR FAST-START PILOT ($450 USD / ₱25,000):
Includes complete webhook setup and WhatsApp integration with a 100% money-back guarantee.

👉 Lock in Pilot via PayPal Escrow:
https://linkable.it.com/pilot.html?client=SolarICPH&amount=450

Let me know if you would like a brief 10-minute demonstration!

Best regards,
Mharc Gatan
Lead Solutions Architect | GatzFam Dev Tools & Linkable Systems
Direct: mharcgatan@linkable.it.com`
  },
  {
    name: "Dr. Ralph & Patient Care Team",
    title: "Managing Director",
    company: "Urban Smiles Dental Clinic",
    email: "customercare@urbansmiles.ph",
    category: "Dental Surgery",
    subject: "Instant 24/7 WhatsApp Appointment Concierge + Meta Pixel Fix for Dental Implants",
    body: `Dear Dr. Ralph & Urban Smiles Team,

For high-ticket dental procedures like Clear Aligners, Porcelain Veneers, and Implants (₱80,000 - ₱250,000+ packages), patients who inquire at night or on weekends often book with the first clinic that gives an immediate answer.

We developed a specialized booking automation platform:

👉 Live Interactive Demo: https://linkable.it.com/pilot.html?client=UrbanSmiles&amount=450

What we deliver in 48 Hours:
• ⚡ Sub-3-Second WhatsApp Appointment Concierge: Automatically answers pricing questions, provides branch availability, and reserves preliminary panoramic X-ray slots.
• 🛡️ Server-Side Meta CAPI: Guarantees 100% conversion tracking back to Ads Manager so Meta targets patients with real dental budgets.

⚡ 48-HOUR PILOT SPRINT ($450 USD — 100% REFUNDABLE):
Complete turnkey installation with zero technical burden on your staff.

👉 Official Pilot Proposal & 1-Click Escrow Checkout:
https://linkable.it.com/pilot.html?client=UrbanSmiles&amount=450

Would you be open for a quick 10-minute walkthrough this Thursday or Friday?

Best regards,
Mharc Gatan
Lead Solutions Architect | GatzFam Dev Tools & Linkable Systems
Direct: mharcgatan@linkable.it.com`
  },
  {
    name: "Sales & Dealership Management",
    title: "Managing Director",
    company: "Veloce Motors Philippines",
    email: "sales@velocemotors.ph",
    category: "Automotive Dealership",
    subject: "1-Click Inventory to Facebook Marketplace Catalog Sync & OBD-II Health Badges",
    body: `Hi Veloce Motors Team,

Saw your premium vehicle inventory and showroom listings in Metro Manila.

Instead of spending hours manually re-listing vehicles on Facebook Marketplace and updating price drops by hand, our engineering team deployed an automated dealership OS:

👉 Live Interactive Demo: https://apexautotech.linkable.it.com

Key Capabilities:
• 🚗 1-Click Facebook Marketplace Catalog Sync: Converts your entire showroom into Meta Commerce XML/JSON feeds with mileage, VIN, and price drop badges.
• ⚡ Sub-Second Speed-to-Lead: Instant WhatsApp test-drive booking for buyers inquiring on Marketplace.
• 🔒 WORM SHA-256 Vehicle Service & Odometer Seal: Stops mileage fraud and protects dealership reputation.

⚡ 48-HOUR PILOT SPRINT ($650 USD — 100% REFUNDABLE):
Pre-loaded with your exact vehicle showroom inventory.

👉 Official Pilot Proposal & 1-Click Escrow Checkout:
https://linkable.it.com/pilot.html?client=VeloceMotorsPH&amount=650

Let me know if you would like a 10-minute live demonstration!

Best regards,
Mharc Gatan
Lead Solutions Architect | GatzFam Dev Tools & Linkable Systems
Direct: mharcgatan@linkable.it.com`
  }
];

async function runB2BProspector() {
  console.log('='.repeat(70));
  console.log('🚀 RUNNING AUTOMATED B2B PROSPECTOR & DISPATCH ENGINE');
  console.log('Target: 4 High-Ticket Real Estate, Clinic & Dealership Brands');
  console.log('='.repeat(70));

  let successCount = 0;

  for (let i = 0; i < TARGET_BUSINESS_PROSPECTS.length; i++) {
    const lead = TARGET_BUSINESS_PROSPECTS[i];
    console.log(`\n[${i + 1}/${TARGET_BUSINESS_PROSPECTS.length}] Sending to: ${lead.name} (${lead.company}) [${lead.email}]...`);

    const mailOptions = {
      from: `"Mharc Gatan | GatzFam Dev Tools" <${process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com'}>`,
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
        category: lead.category,
        subject: lead.subject,
        messageId: info.messageId,
        checkoutLink: `https://linkable.it.com/pilot.html?client=${lead.company.replace(/\s+/g, '')}`,
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
  console.log(`🎉 PROSPECTOR BATCH FINISHED: ${successCount}/${TARGET_BUSINESS_PROSPECTS.length} Delivered with 1-Click Escrow Links!`);
  console.log('='.repeat(70));
}

runB2BProspector();
