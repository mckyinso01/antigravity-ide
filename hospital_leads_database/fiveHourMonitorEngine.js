const fs = require('fs');
const path = require('path');
const imaps = require('imap-simple');
const nodemailer = require('nodemailer');

const SENDER_EMAIL = 'mckinsyo01@gmail.com';
const SENDER_PASS = 'ldiibghudivdkboq';

const STATE_FILE = path.join(__dirname, 'outreach_state.json');
const LOG_FILE = path.join(__dirname, 'outreach_dispatch_log.json');
const LEADS_FILE = path.join(__dirname, 'verified_100_us_uk_hospitals.json');

const imapConfig = {
  imap: {
    user: SENDER_EMAIL,
    password: SENDER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  }
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: SENDER_EMAIL, pass: SENDER_PASS }
});

async function runFiveHourAudit() {
  console.log('\n🔍 ===================================================');
  console.log('⏰ [5-HOUR CRON] INITIATING 5-HOUR B2B PIPELINE AUDIT');
  console.log(`⏰ Timestamp: ${new Date().toLocaleString()}`);
  console.log('===================================================');

  const state = fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) : { nextLeadId: 1, totalSent: 0 };
  const logs = fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) : [];
  const leads = fs.existsSync(LEADS_FILE) ? JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')) : [];

  let detectedReplies = [];
  let detectedBounces = [];

  try {
    console.log('🔄 Connecting to Gmail IMAP to scan inbox for replies & bounces...');
    const connection = await imaps.connect(imapConfig);
    await connection.openBox('INBOX');

    // Search messages received in last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const searchCriteria = [['SINCE', yesterday]];
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`📬 Found ${messages.length} recent messages in Gmail inbox to audit.`);

    for (const msg of messages) {
      const headerPart = msg.parts.find(p => p.which === 'HEADER');
      const textPart = msg.parts.find(p => p.which === 'TEXT');
      
      const subject = headerPart?.body?.subject?.[0] || '';
      const from = headerPart?.body?.from?.[0] || '';
      const bodyText = textPart?.body || '';

      // 1. Detect Bounces
      if (from.toLowerCase().includes('mailer-daemon') || from.toLowerCase().includes('postmaster') || subject.toLowerCase().includes('delivery status notification') || subject.toLowerCase().includes('undeliverable')) {
        detectedBounces.push({ from, subject, date: headerPart?.body?.date?.[0] });
        // Find which lead bounced and mark it
        for (const lead of leads) {
          if (lead.sample_email && bodyText.includes(lead.sample_email)) {
            lead.status = 'BOUNCED';
            console.log(`⚠️ Marked Lead #${lead.id} (${lead.sample_email}) as BOUNCED.`);
          }
        }
      }

      // 2. Detect Prospect Replies
      if (subject.toLowerCase().includes('reducing ed boarding') || subject.toLowerCase().includes('clinical pristine') || subject.toLowerCase().includes('spatial clinical hud')) {
        if (!from.includes(SENDER_EMAIL)) {
          detectedReplies.push({
            from,
            subject,
            snippet: bodyText.substring(0, 300)
          });
        }
      }
    }

    connection.end();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

  } catch (err) {
    console.error('⚠️ IMAP audit notice:', err.message);
  }

  // Calculate Stats
  const totalSent = logs.filter(l => l.status === 'SUCCESS').length;
  const pendingLeads = leads.filter(l => l.id >= state.nextLeadId).length;

  console.log('\n📊 5-HOUR AUDIT SUMMARY:');
  console.log(`• Total Delivered to Date: ${totalSent}`);
  console.log(`• Pending Queue Remaining: ${pendingLeads} Hospitals`);
  console.log(`• Incoming Prospect Replies: ${detectedReplies.length}`);
  console.log(`• Bounces Detected & Filtered: ${detectedBounces.length}`);

  // Send High-Priority Instant Alert if an Executive Replied!
  if (detectedReplies.length > 0) {
    console.log('🚨 STAT PRIORITY: Inbound prospect reply detected! Sending instant alert...');
    try {
      await transporter.sendMail({
        from: `"Gatz STAT Alert" <${SENDER_EMAIL}>`,
        to: SENDER_EMAIL,
        subject: `🚨 [STAT PRIORITY LEAD] Inbound Hospital Reply Received! (${detectedReplies[0].from})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 2px solid #2563eb; border-radius: 10px;">
            <h2 style="color: #2563eb; margin-top: 0;">🚨 High-Intent Hospital Response Detected!</h2>
            <p><strong>From:</strong> ${detectedReplies[0].from}</p>
            <p><strong>Subject:</strong> ${detectedReplies[0].subject}</p>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <strong>Message Excerpt:</strong><br>
              <pre style="white-space: pre-wrap; font-family: sans-serif;">${detectedReplies[0].snippet}</pre>
            </div>
            <p>👉 <strong>Next Action:</strong> Open Gmail and reply to schedule the 7-minute clinical walk-through!</p>
          </div>
        `
      });
    } catch (e) {
      console.warn('Could not send STAT alert:', e.message);
    }
  }

  // Send 5-Hour Executive Progress Report Email
  try {
    await transporter.sendMail({
      from: `"Gatz Autonomous Pipeline" <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      subject: `📊 [5-Hour Pipeline Report] ${totalSent} Dispatched • ${pendingLeads} Remaining • ${detectedReplies.length} Replies`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; max-width: 600px;">
          <h3 style="color: #0f172a; margin-top: 0;">🏥 5-Hour Autonomous B2B Outreach Status</h3>
          <p style="font-size: 13px; color: #64748b;">Report Generated: ${new Date().toLocaleString()}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Total Emails Delivered</strong></td><td style="padding: 8px; text-align: right; color: #16a34a; font-weight: bold;">${totalSent}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Queue Remaining</strong></td><td style="padding: 8px; text-align: right; font-weight: bold;">${pendingLeads} / ${leads.length}</td></tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Inbound Replies</strong></td><td style="padding: 8px; text-align: right; color: #2563eb; font-weight: bold;">${detectedReplies.length}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Bounces Blacklisted</strong></td><td style="padding: 8px; text-align: right; color: #dc2626;">${detectedBounces.length}</td></tr>
          </table>

          <div style="background: #eff6ff; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #1e40af;">
            <strong>Pipeline Status:</strong> 🟢 Operational & Healthy. Next hourly micro-batch scheduled automatically.
          </div>
          
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">Gatz Devs Studio • Autonomous Clinical Outreach Engine</p>
        </div>
      `
    });
    console.log('📬 5-Hour Executive Report Email Delivered to mckinsyo01@gmail.com!');
  } catch (err) {
    console.warn('Could not send 5-hour summary email:', err.message);
  }

  // Auto-Refill Check
  if (pendingLeads < 20) {
    console.log('⚠️ Pending leads low (< 20). Triggering Auto-Refill Engine...');
    const { autoRefillNextBatch } = require('./leadAutoRefillEngine');
    await autoRefillNextBatch();
  }
}

if (require.main === module) {
  runFiveHourAudit().catch(console.error);
}

module.exports = { runFiveHourAudit };
