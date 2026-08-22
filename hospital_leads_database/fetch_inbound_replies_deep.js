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

async function fetchAllVerifiedReplies() {
  console.log('🔍 Connecting to Gmail to fetch all verified prospect replies & content...');
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  // Search recent messages across the last 14 days
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 14);

  const searchCriteria = [['SINCE', sinceDate]];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`📬 Total messages scanned in past 14 days: ${messages.length}`);

  const verifiedProspectReplies = [];

  for (const msg of messages) {
    const headerPart = msg.parts.find(p => p.which === 'HEADER');
    const textPart = msg.parts.find(p => p.which === 'TEXT');

    const subject = headerPart?.body?.subject?.[0] || '';
    const from = headerPart?.body?.from?.[0] || '';
    const date = headerPart?.body?.date?.[0] || '';
    const rawBody = textPart?.body || '';

    // Filter out bounces, automated promo newsletters (Indeed, Trip.com, Zapier, Perplexity, Vercel, Github notifications, Coursera, etc.)
    const isBounce = 
      from.toLowerCase().includes('mailer-daemon') ||
      from.toLowerCase().includes('postmaster') ||
      subject.toLowerCase().includes('delivery status notification') ||
      subject.toLowerCase().includes('undeliverable') ||
      subject.toLowerCase().includes('failure notice');

    const isSystemPromo =
      from.toLowerCase().includes('indeed') ||
      from.toLowerCase().includes('trip.com') ||
      from.toLowerCase().includes('zapier') ||
      from.toLowerCase().includes('perplexity') ||
      from.toLowerCase().includes('vercel') ||
      from.toLowerCase().includes('github') ||
      from.toLowerCase().includes('coursera') ||
      from.toLowerCase().includes('crunchyroll') ||
      from.toLowerCase().includes('spaceship') ||
      from.toLowerCase().includes('namecheap') ||
      from.toLowerCase().includes('grabpoints') ||
      from.toLowerCase().includes('yotspot') ||
      from.toLowerCase().includes('dubaidutyfree') ||
      from.toLowerCase().includes('mmfyt') ||
      from.toLowerCase().includes('globaldelight') ||
      from.toLowerCase().includes(SENDER_EMAIL);

    if (!isBounce && !isSystemPromo) {
      verifiedProspectReplies.push({
        date,
        from,
        subject,
        body: rawBody
      });
    }
  }

  connection.end();

  console.log(`\n======================================================`);
  console.log(`🎉 TOTAL VERIFIED PROSPECT REPLIES FOUND: ${verifiedProspectReplies.length}`);
  console.log(`======================================================\n`);

  verifiedProspectReplies.forEach((r, idx) => {
    console.log(`\n------------------------------------------------------`);
    console.log(`📩 [VERIFIED INBOUND #${idx + 1}]`);
    console.log(`📅 DATE: ${r.date}`);
    console.log(`👤 FROM: ${r.from}`);
    console.log(`📌 SUBJECT: ${r.subject}`);
    console.log(`📝 BODY CONTENT:`);
    console.log(r.body);
    console.log(`------------------------------------------------------`);
  });

  fs.writeFileSync(
    path.join(__dirname, 'verified_inbound_replies_detailed.json'),
    JSON.stringify(verifiedProspectReplies, null, 2),
    'utf8'
  );
}

fetchAllVerifiedReplies().catch(err => {
  console.error('❌ Error fetching replies:', err);
});
