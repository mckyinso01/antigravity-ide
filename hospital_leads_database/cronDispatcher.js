const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const SENDER_EMAIL = 'mckinsyo01@gmail.com';
const SENDER_PASS = 'ldiibghudivdkboq'; // Google App Password

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS
  }
});

const LEADS_FILE = path.join(__dirname, 'verified_100_us_uk_hospitals.json');
const STATE_FILE = path.join(__dirname, 'outreach_state.json');
const LOG_FILE = path.join(__dirname, 'outreach_dispatch_log.json');

function getState() {
  if (!fs.existsSync(STATE_FILE)) {
    const initialState = {
      nextLeadId: 1,
      totalSent: 0,
      dailyBatchSize: 5,
      delaySecondsMin: 35,
      delaySecondsMax: 55,
      lastRun: null,
      history: []
    };
    fs.writeFileSync(STATE_FILE, JSON.stringify(initialState, null, 2));
    return initialState;
  }
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function generateEmailContent(lead) {
  const hospitalName = lead.hospital_name;
  const decisionMaker = lead.decision_maker;
  const firstName = decisionMaker.split(' ')[0] || 'Leadership';
  const coreEHR = lead.core_ehr;
  const painPoint = lead.pain_point;

  const subject = `Reducing ED Boarding & Bed Turnaround Latency at ${hospitalName} (Zero-Footprint ${coreEHR} HUD)`;

  const plainText = `Hi ${firstName},

I saw that ${hospitalName} has been managing high acute occupancy and navigating patient flow constraints across your Med-Surg and emergency units (${painPoint}).

When inpatient bed assignment lags, nursing coordinators and bed management teams often lose 45+ minutes per shift just chasing bed status in ${coreEHR} or calling EVS to check if rooms are sanitized.

We engineered Clinical Pristine OS — an ultra-responsive, zero-footprint Spatial Clinical HUD that integrates with existing EHRs (${coreEHR}, HL7/FHIR v2.5.1):

• Sub-15ms Live Spatial Bed HUD: Visual floorplans with real-time MEWS vitals, telemetry Lead II, and EVS biohazard QR locks.
• Surviving Sepsis Hour-1 & ACLS Resuscitation Studio: Built-in 2-minute CPR metronome & statutory FDA non-device CDS compliance.
• Zero-Installation / Self-Hosted: Can run on-premise behind your firewall with zero recurring per-seat SaaS licensing.

You can interact with the live interactive workstation here:
👉 https://clinical-pristine.surge.sh/

And review our complete systems architecture catalog here:
👉 https://gatzdevs.surge.sh/

Are you open to a brief 7-minute technical walk-through this week to see how we cut patient admission-to-bed time by 32%?

Warm regards,

Gatz
Autonomous Systems & Clinical Architecture
Portfolio: https://gatzdevs.surge.sh/
Clinical Live Workstation: https://clinical-pristine.surge.sh/`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; font-size: 15px; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
    .badge { display: inline-block; background: #eff6ff; color: #2563eb; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px; border: 1px solid #bfdbfe; margin-bottom: 16px; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff !important; font-weight: 700; text-decoration: none; padding: 12px 22px; border-radius: 8px; margin: 12px 0 16px 0; font-size: 14px; box-shadow: 0 2px 6px rgba(37,99,235,0.25); }
    .btn-secondary { display: inline-block; background: #f8fafc; color: #0f172a !important; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 8px; margin-left: 8px; font-size: 13px; border: 1px solid #cbd5e1; }
    .feature-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 18px 0; font-size: 14px; }
    .footer { margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">CLINICAL SYSTEMS ENGINEERING • SPATIAL HUD</div>
    <p>Hi <strong>${firstName}</strong>,</p>
    
    <p>I noticed that <strong>${hospitalName}</strong> has been actively managing high patient volume and addressing capacity bottlenecks (<em>${painPoint}</em>).</p>
    
    <p>When inpatient bed assignment lags, nursing coordinators and bed placement teams often lose 40+ minutes per shift just chasing room status in <strong>${coreEHR}</strong> or coordinating with EVS over clipboards.</p>
    
    <div class="feature-box">
      <strong>Clinical Pristine OS — High-Efficiency Spatial HUD (HL7/FHIR v2.5.1):</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 20px;">
        <li><strong>Sub-15ms Spatial Bed HUD:</strong> Visual floorplans with real-time MEWS acuity, telemetry Lead II, and EVS biohazard QR locks.</li>
        <li><strong>Surviving Sepsis Hour-1 & ACLS Studio:</strong> Built-in 2-minute CPR metronome & statutory FDA CDS compliance.</li>
        <li><strong>Zero-Installation / On-Premise:</strong> Deploys behind your firewall with zero recurring per-seat SaaS licensing.</li>
      </ul>
    </div>
    
    <div>
      <a href="https://clinical-pristine.surge.sh/" class="btn">🚀 Launch Live Clinical Workstation</a>
      <a href="https://gatzdevs.surge.sh/" class="btn-secondary">View System Specs</a>
    </div>
    
    <p>Are you open to a brief 7-minute technical walk-through this week to see how this cuts patient admission-to-bed time by 32%?</p>
    
    <div class="footer">
      <strong>Gatz</strong><br>
      Autonomous Systems & Clinical Architecture Studio<br>
      Live Demo: <a href="https://clinical-pristine.surge.sh/">clinical-pristine.surge.sh</a> • Portfolio: <a href="https://gatzdevs.surge.sh/">gatzdevs.surge.sh</a>
    </div>
  </div>
</body>
</html>`;

  return { subject, plainText, html };
}

async function runScheduledBatch() {
  console.log('⏰ [CRON TRIGGER] Starting Scheduled Daily B2B Hospital Outreach Batch...');
  await transporter.verify();
  console.log('✅ SMTP Authenticated as mckinsyo01@gmail.com');

  const state = getState();
  const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));

  if (state.nextLeadId > leads.length) {
    console.log('🏁 All 100 hospital leads have already received outreach!');
    return;
  }

  const startId = state.nextLeadId;
  const batchSize = state.dailyBatchSize || 5;
  const endId = Math.min(startId + batchSize - 1, leads.length);

  const currentBatch = leads.filter(l => l.id >= startId && l.id <= endId);
  console.log(`🎯 Executing Batch: Leads #${startId} to #${endId} (${currentBatch.length} Hospitals)`);

  const logs = fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) : [];
  const batchResults = [];

  for (let i = 0; i < currentBatch.length; i++) {
    const lead = currentBatch[i];
    const { subject, plainText, html } = generateEmailContent(lead);
    const targetEmail = lead.sample_email;

    console.log(`\n📨 [${i + 1}/${currentBatch.length}] Dispatching to #${lead.id}: ${lead.hospital_name} -> ${targetEmail}`);

    try {
      const info = await transporter.sendMail({
        from: `"Gatz | Clinical Systems Studio" <${SENDER_EMAIL}>`,
        to: targetEmail,
        subject: subject,
        text: plainText,
        html: html
      });

      console.log(`✅ SUCCESS! MessageId: ${info.messageId}`);
      const entry = {
        id: lead.id,
        hospital: lead.hospital_name,
        recipient: targetEmail,
        status: 'SUCCESS',
        messageId: info.messageId,
        timestamp: new Date().toISOString()
      };
      logs.push(entry);
      batchResults.push(entry);
    } catch (err) {
      console.error(`❌ FAILED for #${lead.id} (${targetEmail}):`, err.message);
      const entry = {
        id: lead.id,
        hospital: lead.hospital_name,
        recipient: targetEmail,
        status: 'FAILED',
        error: err.message,
        timestamp: new Date().toISOString()
      };
      logs.push(entry);
      batchResults.push(entry);
    }

    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

    if (i < currentBatch.length - 1) {
      const delay = Math.floor(Math.random() * (state.delaySecondsMax - state.delaySecondsMin + 1) + state.delaySecondsMin);
      console.log(`⏳ Pacing pause: Waiting ${delay}s before next hospital to protect sender reputation...`);
      await new Promise(r => setTimeout(r, delay * 1000));
    }
  }

  // Update State
  state.nextLeadId = endId + 1;
  state.totalSent += batchResults.filter(r => r.status === 'SUCCESS').length;
  state.lastRun = new Date().toISOString();
  state.history.push({
    runAt: new Date().toISOString(),
    batchRange: `${startId}-${endId}`,
    successCount: batchResults.filter(r => r.status === 'SUCCESS').length,
    failedCount: batchResults.filter(r => r.status === 'FAILED').length
  });
  saveState(state);

  // Send Daily Summary Email to User
  try {
    await transporter.sendMail({
      from: `"Gatz Outreach Automator" <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      subject: `📊 [Outreach Summary] Batch #${startId}-${endId} Completed (${batchResults.length} Hospitals)`,
      text: `Daily B2B Outreach Cron Execution Complete:\n\n` +
        `• Batch Range: #${startId} - #${endId}\n` +
        `• Successfully Delivered: ${batchResults.filter(r => r.status === 'SUCCESS').length}\n` +
        `• Next Scheduled Batch: #${state.nextLeadId}\n` +
        `• Total Processed to date: ${state.nextLeadId - 1} / 100 Hospitals.\n\n` +
        `Targeted Institutions in this batch:\n` +
        currentBatch.map(b => `- #${b.id} ${b.hospital_name} (${b.decision_maker}) -> ${b.sample_email}`).join('\n')
    });
    console.log('📬 Sent daily summary email report to user.');
  } catch (err) {
    console.warn('Could not send summary report:', err.message);
  }

  console.log(`\n🎉 BATCH #${startId}-${endId} COMPLETED SUCCESSFULLY!`);
  console.log(`Next batch will start at Lead #${state.nextLeadId}`);
}

if (require.main === module) {
  runScheduledBatch().catch(console.error);
}

module.exports = { runScheduledBatch };
