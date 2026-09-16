import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUEUE_FILE = path.join(__dirname, 'MASTER_FOLLOWUP_540_QUEUE.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

// Parse CLI flags
const args = process.argv.slice(2);
const limitArg = args.find(a => a.startsWith('--limit='));
const waveArg = args.find(a => a.startsWith('--wave='));
const weaponArg = args.find(a => a.startsWith('--weapon='));
const isDryRun = args.includes('--dry-run');

const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 25;
const waveNum = waveArg ? parseInt(waveArg.split('=')[1], 10) : 2;
const weaponFilter = weaponArg ? weaponArg.split('=')[1].toUpperCase() : 'HOSPITAL_CLAIMGUARD';

// Google SMTP Relay via mckinsyo01@gmail.com sending as mharcgatan@linkable.it.com
const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'mckinsyo01@gmail.com',
    pass: process.env.SMTP_PASS
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getSalutation(name) {
  if (!name || name === 'Executive Leader' || name === 'Clinical Operations' || name === 'Decision Maker' || name === 'Operations Team') {
    return 'Hello';
  }
  const clean = name.replace(/^(Dr\.|Prof\.|Engr\.|Archt\.)\s*/i, '').trim();
  const parts = clean.split(/\s+/);
  if (parts.length > 1) {
    if (/^(Dr|Prof)/i.test(name)) {
      return `Dr. ${parts[parts.length - 1]}`;
    }
    return parts[0];
  }
  return name;
}

function buildEmailPayload(target) {
  const salutation = getSalutation(target.name);
  const company = target.company || 'your organization';

  switch (target.weapon) {
    case 'HOSPITAL_CLAIMGUARD':
      return {
        subject: 'Re: Eliminating recurring EHR vendor lock-in and commercial claim denials',
        text: `${salutation},

Following up briefly on my note from last week regarding ${company}.

Rather than discussing a broad platform overhaul, would your operations team be open to an initial zero-risk test on 10 aged commercial claim denials that your billing team has written off or stalled on?

If our ClaimGuard engine cannot recover statutory settlement under ERISA guidelines, you pay $0. If cash is recovered directly to your hospital accounts, our fee is 15% purely on contingency.

Can I send over the 1-page sample audit methodology, or provision a private sandbox for your revenue cycle leadership?

Best regards,

Mharc Gatan
Founder & Lead Architect | Linkable Systems
Email: mharcgatan@linkable.it.com
Live Systems: https://linkable.it.com`
      };

    case 'AUTOMOTIVE_APEX':
      return {
        subject: `Re: Dealership Inventory & Automotive Fleet CRM Architecture — ${company}`,
        text: `${salutation},

Following up briefly on my note regarding the fleet and inventory workflow for ${company}.

If your team is currently navigating delayed lead response times or manual inventory updates across channels, we can stand up an interactive private staging environment for your dealership within 24 to 48 hours.

Key engineering specs:
• Instant sub-0.4s mobile vehicle check-in and inventory scan
• Automated SMS/WhatsApp instant speed-to-lead responder (<3 seconds)
• Zero vendor lock-in with full source code control ($650 milestone deposit to initiate sandbox)

Would you be open to a 3-minute interactive sandbox test on your phone this week?

Best regards,

Mharc Gatan
Founder & Lead Architect | Linkable Systems
Email: mharcgatan@linkable.it.com
Live Systems: https://linkable.it.com`
      };

    case 'CONSTRUCTION_SITESAFE':
      return {
        subject: `Re: Automated Weather Delay Insurance Claim Generator & CPM Schedule — ${company}`,
        text: `${salutation},

Following up briefly on my note regarding weather delay disputes and project logs for ${company}.

Most general contractors lose tens of thousands on un-certified rain day disputes and manual safety logs. We engineered SiteSafe StructuraPro to automate this completely:

• Automated NOAA-certified weather delay insurance claim generator (1-click audit-proof PDF)
• Dynamic CPM Gantt & geofenced OSHA 300 / 300A compliance sentinel
• 48-Hour dedicated project trial ($499 refundable milestone deposit)

Can I provision a private project sandbox for your field superintendents to test on an active jobsite?

Best regards,

Mharc Gatan
Founder & Lead Architect | SiteSafe AI
Email: mharcgatan@linkable.it.com
Live Systems: https://sitesafe.linkable.it.com`
      };

    case 'LOGISTICS_OMNISTOCK':
      return {
        subject: `Re: Sub-0.3s WMS Inventory & Cold Storage Architecture — ${company}`,
        text: `${salutation},

Following up briefly on my note regarding inventory and cold storage operations for ${company}.

If manual bin tracking or barcode latency is slowing down your fulfillment shifts, we can provision a dedicated OmniStock staging sandbox for your warehouse within 24 to 48 hours:

• Sub-0.3s camera & Bluetooth barcode scan with zero cloud lag
• Automated USP <1079> temperature excursion logging & excursion alerts
• Private, on-premise or cloud deployment ($650 milestone escrow to initiate staging)

Would your operations team be open to testing the live scanner on a warehouse mobile device this week?

Best regards,

Mharc Gatan
Founder & Lead Architect | Linkable Systems
Email: mharcgatan@linkable.it.com
Live Systems: https://omnistock.linkable.it.com`
      };

    case 'MARITIME_BUNKERTRUST':
      return {
        subject: `Re: ISO 8217 Bunker Fuel Quality Assurance & Dispute Sentinel — ${company}`,
        text: `${salutation},

Following up briefly on my note regarding ISO 8217 compliance and bunker delivery notes for ${company}.

Off-spec bunker fuels and quantity disputes cost shipowners hundreds of thousands in charter delays and engine maintenance. We deliver an automated fuel dispute sentinel:

• Instant BDN cross-check against ISO 8217:2024 specifications (density, viscosity, catalytic fines)
• Automated 1-click Letter of Protest (LOP) generator backed by time-stamped telemetry
• 48-Hour vessel trial under milestone escrow ($650 deposit)

Can I send over the 1-page sample audit or provision a sandbox for your technical operations team?

Best regards,

Mharc Gatan
Founder & Lead Architect | BunkerTrust
Email: mharcgatan@linkable.it.com
Live Systems: https://bunkertrust.linkable.it.com`
      };

    default: // GENERAL_ENTERPRISE
      return {
        subject: `Re: Full-stack sprint & production architecture — ${company}`,
        text: `${salutation},

Following up briefly on my note regarding full-stack architecture for ${company}.

If you are currently evaluating technical partners or looking to accelerate your product roadmap, I can stand up a private, live interactive prototype of your core workflow within 24 to 48 hours—before any long-term commitment.

Key engineering specs:
• 100/100 Lighthouse score & sub-0.4s DOM paint
• Clean, zero-vendor-lockin JavaScript/Node architecture
• Structured under milestone escrow ($650 deposit to initiate staging, balance upon verified completion)

What specific bottleneck or module is the highest priority for your team this week?

Best regards,

Mharc Gatan
Founder & Lead Architect | Linkable Systems
Email: mharcgatan@linkable.it.com
Live Systems: https://linkable.it.com`
      };
  }
}

async function run() {
  console.log('='.repeat(75));
  console.log(`🌊 MASTER ROLLING WAVE FOLLOW-UP DISPATCHER [WAVE ${waveNum}]`);
  console.log(`   Relay: Google SMTP (smtp.gmail.com:465) via mckinsyo01@gmail.com`);
  console.log(`   From: "Mharc Gatan | Linkable Systems" <mharcgatan@linkable.it.com>`);
  console.log(`   Mode: ${isDryRun ? 'DRY-RUN (Simulated)' : 'LIVE DISPATCH'}`);
  console.log(`   Weapon Filter: ${weaponFilter}`);
  console.log(`   Batch Limit: ${limit}`);
  console.log('='.repeat(75));

  if (!fs.existsSync(QUEUE_FILE)) {
    console.error('❌ Queue file not found:', QUEUE_FILE);
    process.exit(1);
  }

  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
  let logs = [];
  if (fs.existsSync(LOG_FILE)) {
    logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  }

  // Filter pending targets
  let candidates = queue.filter(q => q.followupStatus === 'PENDING');
  if (weaponFilter !== 'ALL') {
    candidates = candidates.filter(q => q.weapon === weaponFilter);
  }

  console.log(`📋 Total candidates in queue for [${weaponFilter}]: ${candidates.length}`);
  const batch = candidates.slice(0, limit);
  console.log(`🎯 Targets selected for Wave ${waveNum}: ${batch.length}\n`);

  if (batch.length === 0) {
    console.log('🎉 No pending targets found for this criteria!');
    return;
  }

  let transporter = null;
  if (!isDryRun) {
    transporter = nodemailer.createTransport(SMTP_CONFIG);
    try {
      console.log('[SMTP] Connecting and verifying Google SMTP credentials...');
      await transporter.verify();
      console.log('✅ Google SMTP connection handshake verified.\n');
    } catch (smtpErr) {
      console.error('❌ SMTP verification failed:', smtpErr.message);
      process.exit(1);
    }
  }

  let successCount = 0;
  let failCount = 0;
  let consecutiveFails = 0;

  for (let i = 0; i < batch.length; i++) {
    const target = batch[i];
    const payload = buildEmailPayload(target);

    console.log(`[${i + 1}/${batch.length}] Target: ${target.name} (${target.company})`);
    console.log(`   To: ${target.email}`);
    console.log(`   Weapon: ${target.weapon}`);
    console.log(`   Threading In-Reply-To: ${target.originalMessageId}`);

    if (isDryRun) {
      console.log(`   [DRY-RUN] Subject: "${payload.subject}"`);
      console.log(`   [DRY-RUN] Would send threaded email via Google SMTP.\n`);
      successCount++;
    } else {
      const mailOptions = {
        from: '"Mharc Gatan | Linkable Systems" <mharcgatan@linkable.it.com>',
        replyTo: 'mharcgatan@linkable.it.com',
        to: target.email,
        subject: payload.subject,
        inReplyTo: target.originalMessageId,
        references: target.originalMessageId,
        text: payload.text
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`   ✅ Dispatched! Message ID: ${info.messageId}`);
        console.log(`   Accepted: ${info.accepted.join(', ')}`);

        // Update target in queue
        target.followupStatus = 'SENT';
        target.followupDispatchedAt = new Date().toISOString();
        target.followupMessageId = info.messageId;
        target.waveNumber = waveNum;

        // Append to logs
        logs.push({
          type: `FOLLOWUP_WAVE_${waveNum}_${target.weapon}`,
          name: target.name,
          company: target.company,
          email: target.email,
          inReplyTo: target.originalMessageId,
          messageId: info.messageId,
          status: 'SUCCESS',
          timestamp: new Date().toISOString()
        });

        // Persist progress immediately
        fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');
        fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');

        successCount++;
        consecutiveFails = 0;
      } catch (err) {
        console.error(`   ❌ Failed to send to ${target.email}:`, err.message);
        target.followupStatus = 'FAILED';
        target.lastError = err.message;
        failCount++;
        consecutiveFails++;

        fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');

        if (consecutiveFails >= 3) {
          console.error('\n🚨 EMERGENCY HALT: 3 consecutive SMTP failures detected. Stopping wave to protect domain.');
          break;
        }
      }

      if (i < batch.length - 1) {
        console.log('   ⏳ Sleeping 3000ms for safe rate-limiting...');
        await sleep(3000);
      }
    }
  }

  console.log('\n' + '='.repeat(75));
  console.log(`🏁 WAVE ${waveNum} EXECUTION COMPLETE`);
  console.log(`   Total Attempted: ${batch.length}`);
  console.log(`   Successful:      ${successCount}`);
  console.log(`   Failed:          ${failCount}`);
  console.log(`   Remaining in Weapon [${weaponFilter}]: ${candidates.length - successCount}`);
  console.log('='.repeat(75));
}

run().catch(console.error);
