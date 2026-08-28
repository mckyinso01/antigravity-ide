import imaps from 'imap-simple';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  imap: {
    user: process.env.SMTP_USER || 'mharcgatan@linkable.it.com',
    password: process.env.SMTP_PASS || 'Melonjuice01!',
    host: 'mail.spacemail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 25000
  }
};

async function checkAll() {
  console.log('Connecting to SpaceMail IMAP...');
  const connection = await imaps.connect(config);
  const boxes = await connection.getBoxes();
  console.log('Available Mailboxes:', Object.keys(boxes));

  const targets = ['INBOX', 'Spam', 'Junk', 'Trash'];
  for (const boxName of targets) {
    try {
      await connection.openBox(boxName);
      const messages = await connection.search(['ALL'], { bodies: ['HEADER', 'TEXT'], markSeen: false });
      console.log(`\n========================================`);
      console.log(`📂 Mailbox [${boxName}]: ${messages.length} messages found`);
      console.log(`========================================`);
      const recent = messages.slice(-10);
      for (const m of recent) {
        const header = m.parts.find(p => p.which === 'HEADER');
        if (header && header.body) {
          console.log(`• From: ${header.body.from?.[0]}`);
          console.log(`  Subject: ${header.body.subject?.[0]}`);
          console.log(`  Date: ${header.body.date?.[0]}`);
        }
      }
    } catch (e) {
      console.log(`Notice for ${boxName}: ${e.message}`);
    }
  }
  connection.end();
}

checkAll().catch(console.error);
