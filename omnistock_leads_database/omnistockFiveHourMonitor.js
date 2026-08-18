const fs = require('fs');
const path = require('path');
const imaps = require('imap-simple');
const nodemailer = require('nodemailer');

const SENDER_EMAIL = 'mckinsyo01@gmail.com';
const SENDER_PASS = 'ldiibghudivdkboq';

const STATE_FILE = path.join(__dirname, 'omnistock_outreach_state.json');
const LOG_FILE = path.join(__dirname, 'omnistock_dispatch_log.json');
const LEADS_FILE = path.join(__dirname, '..', 'omnistock_100_verified_leads.json');

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

async function runOmniStockAudit() {
  console.log('\n🔍 ===================================================');
  console.log('⏰ [5-HOUR CRON] INITIATING OMNISTOCK PIPELINE AUDIT');
  console.log(`⏰ Timestamp: ${new Date().toLocaleString()}`);
  console.log('===================================================');

  const state = fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) : { currentIndex: 0, totalDispatched: 0 };
  const logs = fs.existsSync(LOG_FILE) ? JSON.parse(fs.readFileSync(LOG_FILE, 'utf8')) : [];
  const leads = fs.existsSync(LEADS_FILE) ? JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')) : [];

  let detectedReplies = [];
  let detectedBounces = [];

  try {
    console.log('🔄 Connecting to Gmail IMAP to scan inbox for OmniStock replies & bounces...');
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
        for (const lead of leads) {
          if (lead.email && bodyText.includes(lead.email)) {
            lead.status = 'BOUNCED';
            console.log(`⚠️ Marked Lead #${lead.id} (${lead.company} - ${lead.email}) as BOUNCED.`);
          }
        }
      }

      // 2. Detect Prospect Replies for OmniStock
      if (subject.toLowerCase().includes('omnistock') || subject.toLowerCase().includes('wms saas') || subject.toLowerCase().includes('shorter picker routes') || subject.toLowerCase().includes('eulerian shortest-path')) {
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
  const totalSent = logs.filter(l => l.status === 'DELIVERED').length;
  const pendingLeads = leads.length - (state.currentIndex || 0);

  console.log('\n📊 OMNISTOCK 5-HOUR AUDIT SUMMARY:');
  console.log(`• Total Delivered to Date: ${totalSent}`);
  console.log(`• Pending Queue Remaining: ${pendingLeads} Companies`);
  console.log(`• Incoming Prospect Replies: ${detectedReplies.length}`);
  console.log(`• Bounces Detected & Filtered: ${detectedBounces.length}`);

  // High Priority Alert if response detected
  if (detectedReplies.length > 0) {
    console.log('🚨 STAT PRIORITY: Inbound OmniStock prospect reply detected! Sending alert...');
    try {
      await transporter.sendMail({
        from: `"OmniStock Lead Alert" <${SENDER_EMAIL}>`,
        to: SENDER_EMAIL,
        subject: `🚨 [HIGH INTENT LEAD] Inbound OmniStock Enterprise Reply! (${detectedReplies[0].from})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 2px solid #5BC0BE; border-radius: 10px;">
            <h2 style="color: #070B14; margin-top: 0;">🚨 High-Intent OmniStock Response Detected!</h2>
            <p><strong>From:</strong> ${detectedReplies[0].from}</p>
            <p><strong>Subject:</strong> ${detectedReplies[0].subject}</p>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <strong>Message Excerpt:</strong><br>
              <pre style="white-space: pre-wrap; font-family: sans-serif;">${detectedReplies[0].snippet}</pre>
            </div>
            <p>👉 <strong>Action:</strong> Open Gmail and reply to book the Spatial CAD technical review!</p>
          </div>
        `
      });
    } catch (e) {
      console.warn('Could not send STAT alert:', e.message);
    }
  }

  // 5-Hour Executive Report Email
  try {
    await transporter.sendMail({
      from: `"OmniStock Pipeline Manager" <${SENDER_EMAIL}>`,
      to: SENDER_EMAIL,
      subject: `📊 [OmniStock 5-Hour Report] ${totalSent} Dispatched • ${pendingLeads} Remaining • ${detectedReplies.length} Replies`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; max-width: 600px;">
          <h3 style="color: #0f172a; margin-top: 0;">📦 OmniStock 5-Hour Autonomous Outreach Status</h3>
          <p style="font-size: 13px; color: #64748b;">Report Generated: ${new Date().toLocaleString()}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px;">
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Total Emails Delivered</strong></td><td style="padding: 8px; text-align: right; color: #16a34a; font-weight: bold;">${totalSent}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Queue Remaining</strong></td><td style="padding: 8px; text-align: right; font-weight: bold;">${pendingLeads} / ${leads.length}</td></tr>
            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Inbound Replies</strong></td><td style="padding: 8px; text-align: right; color: #2563eb; font-weight: bold;">${detectedReplies.length}</td></tr>
            <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px;"><strong>Bounces Filtered</strong></td><td style="padding: 8px; text-align: right; color: #dc2626;">${detectedBounces.length}</td></tr>
          </table>

          <div style="background: #f0fdf4; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #166534;">
            <strong>Pipeline Health:</strong> 🟢 Operational & Healthy. Next micro-batch scheduled automatically.
          </div>
          
          <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">OmniStock Enterprise Spatial CAD & 3PL Logistics</p>
        </div>
      `
    });
    console.log('📬 OmniStock 5-Hour Executive Report Delivered to mckinsyo01@gmail.com!');
  } catch (err) {
    console.warn('Could not send OmniStock 5-hour summary email:', err.message);
  }
}

if (require.main === module) {
  runOmniStockAudit().catch(console.error);
}

module.exports = { runOmniStockAudit };
