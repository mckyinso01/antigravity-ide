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
        authTimeout: 10000
      }
    },
    boxes: ['INBOX', '[Gmail]/Spam', '[Gmail]/All Mail']
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
        authTimeout: 10000
      }
    },
    boxes: ['INBOX', 'Junk', 'Spam', 'Trash']
  }
];

async function scanAccount(account) {
  console.log(`\n================================================================`);
  console.log(`📡 CONNECTING TO ACCOUNT: ${account.name}`);
  console.log(`================================================================`);
  
  let connection;
  try {
    connection = await imaps.connect(account.config);
  } catch (e) {
    console.error(`❌ Connection failed for ${account.name}:`, e.message);
    return;
  }

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 7); // Last 7 days

  for (const boxName of account.boxes) {
    try {
      console.log(`\n📂 Checking Mailbox Folder: "${boxName}"...`);
      await connection.openBox(boxName);

      // Search recent messages (past 7 days)
      const searchCriteria = [['SINCE', sinceDate]];
      const fetchOptions = {
        bodies: ['HEADER', 'TEXT'],
        markSeen: false
      };

      const messages = await connection.search(searchCriteria, fetchOptions);
      console.log(`Found ${messages.length} messages in past 7 days in "${boxName}".`);

      for (let i = 0; i < messages.length; i++) {
        const item = messages[i];
        const headerPart = item.parts.find(p => p.which === 'HEADER');
        const textPart = item.parts.find(p => p.which === 'TEXT');

        const headers = headerPart?.body || {};
        const from = headers.from?.[0] || 'Unknown';
        const to = headers.to?.[0] || 'Unknown';
        const subject = headers.subject?.[0] || 'No Subject';
        const date = headers.date?.[0] || 'Unknown Date';
        const body = textPart?.body || '';

        const isSkagit = from.toLowerCase().includes('skagit') ||
                         subject.toLowerCase().includes('skagit') ||
                         body.toLowerCase().includes('skagit') ||
                         from.toLowerCase().includes('postmaster');

        const isRecent = true;

        if (isSkagit || isRecent) {
          console.log(`\n----------------------------------------------------------------`);
          console.log(`${isSkagit ? '🚨 MATCH (SKAGIT / POSTMASTER) 🚨' : '📬 RECENT EMAIL'}`);
          console.log(`Folder:  ${boxName}`);
          console.log(`Date:    ${date}`);
          console.log(`From:    ${from}`);
          console.log(`To:      ${to}`);
          console.log(`Subject: ${subject}`);
          
          if (isSkagit) {
            console.log(`\n>>> FULL BODY: <<<`);
            console.log(body);
            console.log(`>>> END BODY <<<\n`);
          } else {
            console.log(`Preview: ${body.slice(0, 180).replace(/\r?\n|\r/g, ' ')}...`);
          }
        }
      }
    } catch (err) {
      console.log(`Note on box ${boxName}: ${err.message}`);
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
