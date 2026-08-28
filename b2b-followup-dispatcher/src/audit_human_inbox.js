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

async function auditHumanMessages() {
  const connection = await imaps.connect(config);
  for (const box of ['INBOX', 'Archive', 'Trash']) {
    try {
      await connection.openBox(box);
      const messages = await connection.search(['ALL'], { bodies: ['HEADER'], markSeen: false });
      console.log(`\n================== Checking ${box} (${messages.length} msgs) ==================`);
      for (const m of messages) {
        const header = m.parts.find(p => p.which === 'HEADER')?.body;
        if (!header) continue;
        const from = header.from?.[0] || '';
        const subject = header.subject?.[0] || '';
        const date = header.date?.[0] || '';
        const isDaemon = from.toLowerCase().includes('daemon') || from.toLowerCase().includes('bounces') || from.toLowerCase().includes('postmaster');
        if (!isDaemon) {
          console.log(`✨ [HUMAN / SERVICE SENDER in ${box}]:`);
          console.log(`   From: ${from}`);
          console.log(`   Subject: ${subject}`);
          console.log(`   Date: ${date}\n`);
        }
      }
    } catch (err) {
      console.log(`Error reading ${box}: ${err.message}`);
    }
  }
  connection.end();
}

auditHumanMessages().catch(console.error);
