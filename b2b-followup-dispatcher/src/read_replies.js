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

async function readSpecificEmails() {
  const connection = await imaps.connect(config);
  for (const box of ['INBOX', 'Trash']) {
    await connection.openBox(box);
    const messages = await connection.search(['ALL'], { bodies: ['HEADER', 'TEXT'], markSeen: false });
    for (const m of messages) {
      const header = m.parts.find(p => p.which === 'HEADER')?.body;
      const text = m.parts.find(p => p.which === 'TEXT')?.body;
      const from = header?.from?.[0] || '';
      const subject = header?.subject?.[0] || '';
      if (from.includes('akqa') || from.includes('tobys') || from.includes('circlehealthgroup')) {
        console.log(`\n======================================================`);
        console.log(`BOX: ${box}`);
        console.log(`FROM: ${from}`);
        console.log(`SUBJECT: ${subject}`);
        console.log(`BODY:`);
        console.log(text);
        console.log(`======================================================\n`);
      }
    }
  }
  connection.end();
}

readSpecificEmails().catch(console.error);
