const imaps = require('imap-simple');

const config = {
  imap: {
    user: 'mckinsyo01@gmail.com',
    password: 'ldiibghudivdkboq',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  }
};

async function searchGmail() {
  console.log('Connecting to Gmail...');
  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');

  // Use Gmail RAW search
  console.log('Searching for "skagit" in Gmail INBOX...');
  const skagitMsgs = await connection.search([['X-GM-RAW', 'skagit']], { bodies: ['HEADER', 'TEXT'], markSeen: false });
  console.log(`Found ${skagitMsgs.length} messages matching "skagit" in Gmail.`);

  for (let i = 0; i < skagitMsgs.length; i++) {
    const m = skagitMsgs[i];
    const h = m.parts.find(p => p.which === 'HEADER')?.body || {};
    const t = m.parts.find(p => p.which === 'TEXT')?.body || '';
    console.log(`\n--- GMAIL SKAGIT MATCH ${i + 1} ---`);
    console.log(`Date:    ${h.date?.[0]}`);
    console.log(`From:    ${h.from?.[0]}`);
    console.log(`To:      ${h.to?.[0]}`);
    console.log(`Subject: ${h.subject?.[0]}`);
    console.log(`Body:`);
    console.log(t);
  }

  console.log('\nSearching for "postmaster" in Gmail INBOX...');
  const postmasterMsgs = await connection.search([['X-GM-RAW', 'postmaster']], { bodies: ['HEADER', 'TEXT'], markSeen: false });
  console.log(`Found ${postmasterMsgs.length} messages matching "postmaster" in Gmail.`);

  for (let i = 0; i < postmasterMsgs.length; i++) {
    const m = postmasterMsgs[i];
    const h = m.parts.find(p => p.which === 'HEADER')?.body || {};
    const t = m.parts.find(p => p.which === 'TEXT')?.body || '';
    console.log(`\n--- GMAIL POSTMASTER MATCH ${i + 1} ---`);
    console.log(`Date:    ${h.date?.[0]}`);
    console.log(`From:    ${h.from?.[0]}`);
    console.log(`To:      ${h.to?.[0]}`);
    console.log(`Subject: ${h.subject?.[0]}`);
    console.log(`Body:`);
    console.log(t.slice(0, 1000));
  }

  // Also check past 24 hours all messages in Gmail
  console.log('\nSearching for all emails in past 24 hours in Gmail...');
  const recentMsgs = await connection.search([['X-GM-RAW', 'newer_than:1d']], { bodies: ['HEADER', 'TEXT'], markSeen: false });
  console.log(`Found ${recentMsgs.length} messages in past 24 hours in Gmail.`);

  for (let i = 0; i < recentMsgs.length; i++) {
    const m = recentMsgs[i];
    const h = m.parts.find(p => p.which === 'HEADER')?.body || {};
    const t = m.parts.find(p => p.which === 'TEXT')?.body || '';
    console.log(`\n--- RECENT GMAIL ${i + 1} ---`);
    console.log(`Date:    ${h.date?.[0]}`);
    console.log(`From:    ${h.from?.[0]}`);
    console.log(`To:      ${h.to?.[0]}`);
    console.log(`Subject: ${h.subject?.[0]}`);
    console.log(`Body snippet: ${t.slice(0, 300).replace(/\r?\n|\r/g, ' ')}`);
  }

  connection.end();
}

searchGmail().catch(console.error);
