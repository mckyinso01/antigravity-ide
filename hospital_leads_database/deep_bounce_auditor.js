const imaps = require('imap-simple');
const fs = require('fs');
const path = require('path');

const SENDER_EMAIL = 'mckinsyo01@gmail.com';
const SENDER_PASS = 'ldiibghudivdkboq';

const imapConfig = {
  imap: {
    user: SENDER_EMAIL,
    password: SENDER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 15000
  }
};

async function auditAllBounces() {
  console.log('🔍 Connecting to Gmail IMAP to perform Deep Bounce & Delivery Audit...');
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  // Search for all delivery failures / mailer-daemon messages across recent history (past 7 days)
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 7);

  const searchCriteria = [['SINCE', sinceDate]];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`📬 Retrieved ${messages.length} total messages from inbox across the past 7 days.`);

  const bounces = [];
  const prospectReplies = [];

  for (const msg of messages) {
    const headerPart = msg.parts.find(p => p.which === 'HEADER');
    const textPart = msg.parts.find(p => p.which === 'TEXT');

    const subject = headerPart?.body?.subject?.[0] || '';
    const from = headerPart?.body?.from?.[0] || '';
    const to = headerPart?.body?.to?.[0] || '';
    const date = headerPart?.body?.date?.[0] || '';
    const bodyText = textPart?.body || '';

    const isBounce = 
      from.toLowerCase().includes('mailer-daemon') ||
      from.toLowerCase().includes('postmaster') ||
      subject.toLowerCase().includes('delivery status notification') ||
      subject.toLowerCase().includes('undelivered mail') ||
      subject.toLowerCase().includes('failure notice') ||
      subject.toLowerCase().includes('undeliverable');

    if (isBounce) {
      // Extract failed address
      const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
      const allFoundEmails = bodyText.match(emailRegex) || [];
      const failedEmail = allFoundEmails.find(e => !e.toLowerCase().includes('google') && !e.toLowerCase().includes('gmail') && !e.toLowerCase().includes('support') && !e.toLowerCase().includes('mailer-daemon')) || 'Unknown';

      // Extract error / diagnostic code
      let reason = 'Unknown Delivery Failure';
      if (bodyText.includes('550 5.1.1') || bodyText.includes('550-5.1.1') || bodyText.toLowerCase().includes('does not exist') || bodyText.toLowerCase().includes('user unknown') || bodyText.toLowerCase().includes('recipient address rejected')) {
        reason = '550 5.1.1 - Recipient User Account Does Not Exist (Dead/Invalid Mailbox)';
      } else if (bodyText.includes('550-5.7.26') || bodyText.toLowerCase().includes('unauthenticated') || bodyText.toLowerCase().includes('spf') || bodyText.toLowerCase().includes('dkim')) {
        reason = '550 5.7.26 - Authentication Policy (SPF/DKIM alignment issue)';
      } else if (bodyText.toLowerCase().includes('domain not found') || bodyText.toLowerCase().includes('dns') || bodyText.toLowerCase().includes('mx record')) {
        reason = '550 - Domain DNS / MX Records Not Found';
      } else if (bodyText.toLowerCase().includes('quota') || bodyText.toLowerCase().includes('mailbox is full')) {
        reason = '452 - Mailbox Full / Over Quota';
      } else if (bodyText.toLowerCase().includes('blocked') || bodyText.toLowerCase().includes('spam') || bodyText.toLowerCase().includes('blacklisted')) {
        reason = '554 - Content / Spam Filter Policy Block';
      }

      bounces.push({
        date,
        subject,
        from,
        failedRecipient: failedEmail,
        diagnosticReason: reason,
        snippet: bodyText.substring(0, 350).replace(/\r?\n|\r/g, ' ')
      });
    } else {
      // Check for real replies from prospects
      if (!from.includes(SENDER_EMAIL) && !from.toLowerCase().includes('google') && !from.toLowerCase().includes('security') && !from.toLowerCase().includes('noreply')) {
        prospectReplies.push({
          date,
          from,
          subject,
          snippet: bodyText.substring(0, 200).replace(/\r?\n|\r/g, ' ')
        });
      }
    }
  }

  connection.end();

  console.log('\n======================================================');
  console.log(`🚨 DETECTED BOUNCED EMAILS: ${bounces.length}`);
  console.log('======================================================');
  bounces.forEach((b, idx) => {
    console.log(`\n[BOUNCE #${idx + 1}]`);
    console.log(`• Date: ${b.date}`);
    console.log(`• Failed Address: ${b.failedRecipient}`);
    console.log(`• Subject: ${b.subject}`);
    console.log(`• Error Reason: ${b.diagnosticReason}`);
  });

  console.log('\n======================================================');
  console.log(`📬 INCOMING PROSPECT / REPLIES: ${prospectReplies.length}`);
  console.log('======================================================');
  prospectReplies.forEach((r, idx) => {
    console.log(`\n[INBOUND #${idx + 1}]`);
    console.log(`• Date: ${r.date}`);
    console.log(`• From: ${r.from}`);
    console.log(`• Subject: ${r.subject}`);
  });

  // Save audit artifact
  const auditResult = {
    auditedAt: new Date().toISOString(),
    totalBounces: bounces.length,
    bounces,
    prospectReplies
  };
  fs.writeFileSync(path.join(__dirname, 'gmail_bounce_audit_report.json'), JSON.stringify(auditResult, null, 2));
  console.log('\n✅ Full report saved to gmail_bounce_audit_report.json');
}

auditAllBounces().catch(err => {
  console.error('❌ Audit Error:', err);
  process.exit(1);
});
