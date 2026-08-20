const imaps = require('imap-simple');

const ACCOUNTS = [
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
        authTimeout: 10000
      }
    },
    boxes: ['INBOX', 'Junk', 'Spam', 'Trash', 'Sent']
  },
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
        authTimeout: 10000
      }
    },
    boxes: ['INBOX', '[Gmail]/Spam']
  }
];

async function scanAccount(account) {
  console.log(`\n================================================================`);
  console.log(`📡 SCANNING: ${account.name}`);
  console.log(`================================================================`);
  
  let connection;
  try {
    connection = await imaps.connect(account.config);
  } catch (e) {
    console.error(`❌ Connection failed for ${account.name}:`, e.message);
    return;
  }

  for (const boxName of account.boxes) {
    try {
      console.log(`\n📂 Checking Box: "${boxName}"...`);
      await connection.openBox(boxName);

      // Search all messages in the box with HEADER only
      const searchCriteria = ['ALL'];
      const fetchOptions = {
        bodies: ['HEADER'],
        markSeen: false
      };

      const messages = await connection.search(searchCriteria, fetchOptions);
      console.log(`Total messages in "${boxName}": ${messages.length}`);

      // Inspect the latest 25 messages
      const recent = messages.slice(-25).reverse();

      for (let i = 0; i < recent.length; i++) {
        const item = recent[i];
        const headerPart = item.parts.find(p => p.which === 'HEADER');
        const headers = headerPart?.body || {};
        const from = headers.from?.[0] || 'Unknown';
        const to = headers.to?.[0] || 'Unknown';
        const subject = headers.subject?.[0] || 'No Subject';
        const date = headers.date?.[0] || 'Unknown Date';
        const uid = item.attributes.uid;

        const isTarget = from.toLowerCase().includes('skagit') ||
                         from.toLowerCase().includes('postmaster') ||
                         subject.toLowerCase().includes('skagit') ||
                         from.toLowerCase().includes('regionalhealth') ||
                         subject.toLowerCase().includes('regionalhealth');

        console.log(`\n[${i + 1}] UID:${uid} | ${isTarget ? '🚨 TARGET MATCH FOUND 🚨' : '📬'}`);
        console.log(`Date:    ${date}`);
        console.log(`From:    ${from}`);
        console.log(`To:      ${to}`);
        console.log(`Subject: ${subject}`);

        // If it's a target or one of the 3 most recent emails, fetch the full body
        if (isTarget || i < 3) {
          try {
            const bodyRes = await connection.search([['UID', uid.toString()]], { bodies: ['TEXT'], markSeen: false });
            const textPart = bodyRes[0]?.parts.find(p => p.which === 'TEXT');
            const bodyText = textPart?.body || '';
            console.log(`\n--- MESSAGE BODY (UID ${uid}) ---`);
            console.log(bodyText.slice(0, 1500));
            console.log(`--- END BODY ---\n`);
          } catch (e) {
            console.log(`Error fetching body: ${e.message}`);
          }
        }
      }
    } catch (err) {
      console.log(`Note on box "${boxName}": ${err.message}`);
    }
  }

  connection.end();
}

async function main() {
  for (const acc of ACCOUNTS) {
    await scanAccount(acc);
  }
}

main().catch(console.error);
