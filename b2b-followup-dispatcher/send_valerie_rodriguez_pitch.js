import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const lead = {
  id: "lead-os-valerie-sclogistics",
  company: "Saddle Creek Transportation & Warehousing",
  organization: "Saddle Creek Logistics Services",
  contactName: "Valerie Rodriguez",
  email: "Valerie.Rodriguez@SCLOGISTICS.COM",
  demoUrl: "https://omnistock.linkable.it.com"
};

const mailOptions = {
  from: `"Mharc Gatan | OmniStock Spatial WMS" <mharcgatan@linkable.it.com>`,
  to: lead.email,
  subject: `Re: 3D Voxel Warehouse Twin & FEFO Cold Storage — Saddle Creek Logistics Services`,
  text: `Hi Valerie,

Mark Cabrera’s office noted that he has officially retired from Saddle Creek Logistics Services and kindly directed correspondence regarding operations to your office.

We recently reached out regarding our OmniStock Spatial WMS architecture tailored for Saddle Creek's multi-facility distribution network.

Instead of static diagrams, our engineering team deployed an interactive live 3D WebGL Digital Twin sandbox designed to cut forklift transit miles by up to 34% and automate omnichannel slotting and FEFO cold storage quarantine:

👉 Live Interactive Demo: https://omnistock.linkable.it.com

Key Operational Capabilities:
• Real-time 3D Voxel Warehouse Layout & Multi-Tier Pallet Tracking
• Sub-millisecond SKU relocation & slotting optimization algorithms
• Air-gapped offline barcode scanning & automated quarantine controls
• Zero-Vendor-Lock-in REST & GraphQL connector for existing WMS/ERP databases

⚡ PILOT & DEPLOYMENT OPTIONS:
We offer a 48-Hour Dedicated Private Sandbox pre-loaded with your warehouse CAD layout for a flat $650 USD refundable pilot deposit (100% credited towards the $38,500 perpetual license).

Would you or your warehouse engineering leadership be open for a brief 10-minute technical walkthrough this coming week?

Best regards,
Mharc Gatan
Lead Solutions Architect | OmniStock Spatial WMS
Direct: mharcgatan@linkable.it.com
Ecosystem Portfolio: https://linkable.it.com`
};

async function execute() {
  console.log('='.repeat(70));
  console.log(`🚀 [STEP 1] DISPATCHING OMNISTOCK PITCH TO VALERIE RODRIGUEZ`);
  console.log(`Recipient: ${lead.contactName} <${lead.email}>`);
  console.log(`Company: ${lead.company}`);
  console.log(`Demo: ${lead.demoUrl}`);
  console.log('='.repeat(70));

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ DISPATCH SUCCESSFUL!`);
    console.log(`📡 Message ID: ${info.messageId}`);
    console.log(`📬 Accepted: ${JSON.stringify(info.accepted)}`);
    console.log(`⏱️ Response: ${info.response}`);

    // Update dispatch_log.json
    const logPath = path.join(__dirname, 'src', 'dispatch_log.json');
    if (fs.existsSync(logPath)) {
      const logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      logs.push({
        leadId: lead.id,
        company: lead.company,
        email: lead.email,
        touchpoint: 1,
        status: "SENT",
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
      console.log(`📝 Logged to src/dispatch_log.json successfully.`);
    }

    // Update leads.json if present
    const leadsPath = path.join(__dirname, 'src', 'leads.json');
    if (fs.existsSync(leadsPath)) {
      const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
      // Check if Valerie is already there or replace Mark Cabrera
      const existingIdx = leads.findIndex(l => l.email && l.email.toLowerCase() === lead.email.toLowerCase());
      if (existingIdx === -1) {
        leads.push({
          ...lead,
          status: "CONTACTED",
          lastContactedAt: new Date().toISOString()
        });
        fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
        console.log(`📁 Added Valerie Rodriguez to src/leads.json.`);
      }
    }

  } catch (err) {
    console.error(`❌ SMTP DISPATCH ERROR: ${err.message}`);
    process.exit(1);
  }
}

execute();
