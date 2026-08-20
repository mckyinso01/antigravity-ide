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
    authTimeout: 20000
  }
};

async function auditVisitorsAndOrders() {
  console.log('🔍 Connecting to Gmail IMAP to perform Deep Visitor, Lead, and Purchase Audit...');
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  // Search past 14 days
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 14);

  const searchCriteria = [['SINCE', sinceDate]];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`📬 Retrieved ${messages.length} messages from inbox.`);

  const visitors = [];
  const orders = [];
  const bounces = [];
  const prospectReplies = [];

  for (const msg of messages) {
    const headerPart = msg.parts.find(p => p.which === 'HEADER');
    const textPart = msg.parts.find(p => p.which === 'TEXT');

    const subject = headerPart?.body?.subject?.[0] || '';
    const from = headerPart?.body?.from?.[0] || '';
    const date = headerPart?.body?.date?.[0] || '';
    const bodyText = textPart?.body || '';

    // 1. Check for Website Visitors / Lead submissions (FormSubmit, etc.)
    if (from.toLowerCase().includes('formsubmit') || subject.toLowerCase().includes('gatzdevs lead') || subject.toLowerCase().includes('new visitor') || subject.toLowerCase().includes('omnistock') || subject.toLowerCase().includes('clinical-pristine')) {
      visitors.push({
        date,
        from,
        subject,
        bodyExcerpt: bodyText.substring(0, 400).replace(/\r?\n|\r/g, ' ')
      });
    }

    // 2. Check for Orders / Purchases / Payments
    const isPayment =
      from.toLowerCase().includes('stripe') ||
      from.toLowerCase().includes('paypal') ||
      from.toLowerCase().includes('gumroad') ||
      from.toLowerCase().includes('lemonsqueezy') ||
      subject.toLowerCase().includes('payment received') ||
      subject.toLowerCase().includes('you made a sale') ||
      subject.toLowerCase().includes('new order') ||
      subject.toLowerCase().includes('bank transfer') ||
      subject.toLowerCase().includes('wire transfer') ||
      subject.toLowerCase().includes('invoice paid') ||
      subject.toLowerCase().includes('purchase confirmation');

    if (isPayment) {
      orders.push({
        date,
        from,
        subject,
        bodyExcerpt: bodyText.substring(0, 400).replace(/\r?\n|\r/g, ' ')
      });
    }

    // 3. Check for Bounces
    const isBounce =
      from.toLowerCase().includes('mailer-daemon') ||
      from.toLowerCase().includes('postmaster') ||
      subject.toLowerCase().includes('delivery status notification') ||
      subject.toLowerCase().includes('undelivered mail');

    if (isBounce) {
      bounces.push({
        date,
        from,
        subject,
        bodyExcerpt: bodyText.substring(0, 400).replace(/\r?\n|\r/g, ' ')
      });
    }

    // 4. Check for direct prospect replies to our outreach
    if (
      subject.toLowerCase().includes('reducing ed boarding') ||
      subject.toLowerCase().includes('spatial clinical hud') ||
      subject.toLowerCase().includes('clinical pristine') ||
      subject.toLowerCase().includes('wms saas per-user fees') ||
      subject.toLowerCase().includes('shorter picker routes') ||
      subject.toLowerCase().includes('omnistock')
    ) {
      if (!from.includes(SENDER_EMAIL) && !from.toLowerCase().includes('mailer-daemon') && !from.toLowerCase().includes('formsubmit')) {
        prospectReplies.push({
          date,
          from,
          subject,
          bodyExcerpt: bodyText.substring(0, 400).replace(/\r?\n|\r/g, ' ')
        });
      }
    }
  }

  connection.end();

  console.log('\n======================================================');
  console.log(`🌐 DETECTED WEBSITE VISITORS / LEADS: ${visitors.length}`);
  console.log('======================================================');
  visitors.forEach((v, i) => console.log(`[VISITOR #${i + 1}] ${v.date} | Subject: ${v.subject} | Content: ${v.bodyExcerpt.slice(0, 150)}...`));

  console.log('\n======================================================');
  console.log(`💳 DETECTED PURCHASES / APP ORDERS: ${orders.length}`);
  console.log('======================================================');
  orders.forEach((o, i) => console.log(`[ORDER #${i + 1}] ${o.date} | From: ${o.from} | Subject: ${o.subject}`));

  console.log('\n======================================================');
  console.log(`🚨 DETECTED BOUNCES: ${bounces.length}`);
  console.log('======================================================');
  bounces.forEach((b, i) => console.log(`[BOUNCE #${i + 1}] ${b.date} | Subject: ${b.subject} | ${b.bodyExcerpt.slice(0, 150)}...`));

  console.log('\n======================================================');
  console.log(`💬 PROSPECT DIRECT REPLIES: ${prospectReplies.length}`);
  console.log('======================================================');
  prospectReplies.forEach((r, i) => console.log(`[REPLY #${i + 1}] ${r.date} | From: ${r.from} | Subject: ${r.subject}`));

  const fullReport = {
    auditedAt: new Date().toISOString(),
    visitorCount: visitors.length,
    orderCount: orders.length,
    bounceCount: bounces.length,
    replyCount: prospectReplies.length,
    visitors,
    orders,
    bounces,
    prospectReplies
  };

  fs.writeFileSync(path.join(__dirname, 'visitor_and_orders_full_audit.json'), JSON.stringify(fullReport, null, 2));
}

auditVisitorsAndOrders().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
