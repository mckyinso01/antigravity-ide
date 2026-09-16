import imaps from 'imap-simple';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  imap: {
    user: process.env.SMTP_USER || 'mckinsyo01@gmail.com',
    password: process.env.SMTP_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 20000
  }
};

async function checkRecentGmail() {
  console.log('Connecting to Gmail IMAP (mckinsyo01@gmail.com)...');
  try {
    const connection = await imaps.connect(config);
    console.log('✅ Connected to Gmail IMAP.');
    await connection.openBox('INBOX');

    // Search last 20 messages
    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`📬 Total Inbox Messages: ${messages.length}`);

    const recent = messages.slice(-15);
    console.log('\n--- 15 Most Recent Messages ---');
    for (const m of recent) {
      const header = m.parts.find(p => p.which === 'HEADER');
      if (header && header.body) {
        const from = header.body.from?.[0] || 'Unknown';
        const subject = header.body.subject?.[0] || 'No Subject';
        const date = header.body.date?.[0] || 'No Date';
        console.log(`• [${date}]`);
        console.log(`  From: ${from}`);
        console.log(`  Subject: ${subject}`);
      }
    }
    connection.end();
  } catch (err) {
    console.error('❌ Gmail IMAP Error:', err.message);
  }
}

checkRecentGmail();
