const imaps = require('imap-simple');

const ACCOUNTS = [
  {
    name: 'Gmail (mckinsyo01@gmail.com)',
    config: {
      imap: {
        user: 'mckinsyo01@gmail.com',
        password: 'ldiibghudivdkboq',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 15000
      }
    }
  },
  {
    name: 'SpaceMail (mharcgatan@linkable.it.com)',
    config: {
      imap: {
        user: 'mharcgatan@linkable.it.com',
        password: 'Melonjuice01!',
        host: 'mail.spacemail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 15000
      }
    }
  }
];

async function scanAccount(account) {
  console.log(`\n======================================================`);
  console.log(`🔍 SCANNING INBOX: ${account.name}`);
  console.log(`======================================================`);
  try {
    const connection = await imaps.connect(account.config);
    await connection.openBox('INBOX');

    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`Total messages in INBOX: ${messages.length}`);

    const recent = messages.slice(-30).reverse();

    for (let i = 0; i < recent.length; i++) {
      const item = recent[i];
      const headerPart = item.parts.find(p => p.which === 'HEADER');
      const textPart = item.parts.find(p => p.which === 'TEXT');

      const headers = headerPart?.body || {};
      const from = headers.from?.[0] || 'Unknown';
      const to = headers.to?.[0] || 'Unknown';
      const subject = headers.subject?.[0] || 'No Subject';
      const date = headers.date?.[0] || 'Unknown Date';
      const body = textPart?.body || '';

      const isTarget = from.toLowerCase().includes('skagit') || 
                       from.toLowerCase().includes('postmaster') ||
                       subject.toLowerCase().includes('skagit') ||
                       body.toLowerCase().includes('skagit');

      console.log(`\n[${i + 1}] ${isTarget ? '🚨 TARGET MATCH FOUND (SKAGIT / POSTMASTER) 🚨' : '📩'}`);
      console.log(`Date: ${date}`);
      console.log(`From: ${from}`);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      
      const snippet = body.slice(0, 300).replace(/\r?\n|\r/g, ' ');
      console.log(`Snippet: ${snippet}...`);

      if (isTarget) {
        console.log(`\n**************** FULL MESSAGE BODY ****************`);
        console.log(body);
        console.log(`***************************************************\n`);
      }
    }

    connection.end();
  } catch (err) {
    console.error(`❌ Error scanning ${account.name}:`, err.message);
  }
}

async function run() {
  for (const acc of ACCOUNTS) {
    await scanAccount(acc);
  }
}

run();
