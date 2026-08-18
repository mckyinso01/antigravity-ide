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
    authTimeout: 10000
  }
};

async function auditFast() {
  console.log('🔍 Connecting to Gmail IMAP...');
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  // Search past 10 days
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 10);

  const searchCriteria = [['SINCE', sinceDate]];
  const fetchOptions = { bodies: ['HEADER'], struct: false, markSeen: false };

  console.log('⚡ Fetching email headers...');
  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`📬 Retrieved ${messages.length} message headers.`);

  const visitors = [];
  const orders = [];
  const bounces = [];
  const prospectReplies = [];

  for (const msg of messages) {
    const headerPart = msg.parts.find(p => p.which === 'HEADER');
    const subject = headerPart?.body?.subject?.[0] || '';
    const from = headerPart?.body?.from?.[0] || '';
    const date = headerPart?.body?.date?.[0] || '';

    // Visitors & Leads
    if (from.toLowerCase().includes('formsubmit') || subject.toLowerCase().includes('gatzdevs lead') || subject.toLowerCase().includes('visitor') || subject.toLowerCase().includes('omnistock') || subject.toLowerCase().includes('pristine')) {
      visitors.push({ date, from, subject });
    }

    // Purchases / App Orders / Stripe
    if (
      from.toLowerCase().includes('stripe') ||
      from.toLowerCase().includes('paypal') ||
      from.toLowerCase().includes('gumroad') ||
      from.toLowerCase().includes('lemonsqueezy') ||
      subject.toLowerCase().includes('payment') ||
      subject.toLowerCase().includes('order') ||
      subject.toLowerCase().includes('transfer') ||
      subject.toLowerCase().includes('wire') ||
      subject.toLowerCase().includes('invoice') ||
      subject.toLowerCase().includes('bought') ||
      subject.toLowerCase().includes('purchase')
    ) {
      // Filter out promotional/newsletters from bank news if not an order
      orders.push({ date, from, subject });
    }

    // Bounces
    if (
      from.toLowerCase().includes('mailer-daemon') ||
      from.toLowerCase().includes('postmaster') ||
      subject.toLowerCase().includes('delivery status notification') ||
      subject.toLowerCase().includes('undelivered') ||
      subject.toLowerCase().includes('failure')
    ) {
      bounces.push({ date, from, subject });
    }

    // Direct prospect replies
    if (
      subject.toLowerCase().includes('reducing ed boarding') ||
      subject.toLowerCase().includes('spatial clinical') ||
      subject.toLowerCase().includes('clinical pristine') ||
      subject.toLowerCase().includes('wms saas') ||
      subject.toLowerCase().includes('shorter picker routes') ||
      subject.toLowerCase().includes('omnistock')
    ) {
      if (!from.includes(SENDER_EMAIL) && !from.toLowerCase().includes('mailer-daemon') && !from.toLowerCase().includes('formsubmit')) {
        prospectReplies.push({ date, from, subject });
      }
    }
  }

  connection.end();

  console.log('\n======================================================');
  console.log(`🌐 DETECTED WEBSITE VISITORS / LEADS: ${visitors.length}`);
  console.log('======================================================');
  visitors.forEach((v, i) => console.log(`[VISITOR #${i+1}] ${v.date} | From: ${v.from} | Subject: ${v.subject}`));

  console.log('\n======================================================');
  console.log(`💳 DETECTED PURCHASES / PAYMENT EMAILS: ${orders.length}`);
  console.log('======================================================');
  orders.forEach((o, i) => console.log(`[ORDER #${i+1}] ${o.date} | From: ${o.from} | Subject: ${o.subject}`));

  console.log('\n======================================================');
  console.log(`🚨 DETECTED BOUNCES: ${bounces.length}`);
  console.log('======================================================');
  bounces.forEach((b, i) => console.log(`[BOUNCE #${i+1}] ${b.date} | From: ${b.from} | Subject: ${b.subject}`));

  console.log('\n======================================================');
  console.log(`💬 PROSPECT DIRECT REPLIES: ${prospectReplies.length}`);
  console.log('======================================================');
  prospectReplies.forEach((r, i) => console.log(`[REPLY #${i+1}] ${r.date} | From: ${r.from} | Subject: ${r.subject}`));

  const outputData = {
    auditedAt: new Date().toISOString(),
    totalEmailsChecked: messages.length,
    visitors,
    orders,
    bounces,
    prospectReplies
  };

  fs.writeFileSync(path.join(__dirname, 'fast_inbox_audit_results.json'), JSON.stringify(outputData, null, 2));
}

auditFast().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
