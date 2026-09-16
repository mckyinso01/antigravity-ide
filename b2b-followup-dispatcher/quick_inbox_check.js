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
    authTimeout: 10000
  }
};

async function quickCheck() {
  try {
    const connection = await imaps.connect(config);
    const box = await connection.openBox('INBOX');
    const total = box.messages.total;
    console.log(`📬 Total messages in INBOX: ${total}`);

    // Fetch the last 15 messages by sequence number range
    const startSeq = Math.max(1, total - 14);
    const seqRange = `${startSeq}:${total}`;
    console.log(`Fetching sequence range: ${seqRange}...`);

    const messages = await connection.search([['UID', `${startSeq}:*`]], {
      bodies: ['HEADER'],
      markSeen: false
    });

    console.log(`Found ${messages.length} recent messages:\n`);
    for (const m of messages.slice(-10)) {
      const header = m.parts.find(p => p.which === 'HEADER')?.body;
      if (header) {
        console.log(`• From: ${header.from?.[0]}`);
        console.log(`  Subject: ${header.subject?.[0]}`);
        console.log(`  Date: ${header.date?.[0]}`);
        console.log(`---`);
      }
    }

    connection.end();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

quickCheck();
