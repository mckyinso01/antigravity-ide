import imapSimple from 'imap-simple';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  imap: {
    user: 'mckinsyo01@gmail.com',
    password: process.env.SMTP_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 15000
  }
};

async function readGooglePaymentsEmail() {
  const conn = await imapSimple.connect(config);
  const box = await conn.openBox('INBOX');
  const total = box.messages.total;
  
  // Search for Google Payments
  const searchCriteria = [['HEADER', 'FROM', 'payments-noreply@google.com']];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'] };
  
  const results = await conn.search(searchCriteria, fetchOptions);
  console.log(`Found ${results.length} messages from Google Payments.`);
  
  if (results.length > 0) {
    const latest = results[results.length - 1];
    let body = '';
    const textPart = latest.parts.find(p => p.which === 'TEXT');
    if (textPart) {
      body = textPart.body;
    }
    const headerPart = latest.parts.find(p => p.which === 'HEADER');
    console.log('DATE:', headerPart?.body?.date?.[0]);
    console.log('SUBJECT:', headerPart?.body?.subject?.[0]);
    console.log('BODY:');
    console.log(body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1500));
  }
  
  conn.end();
}

readGooglePaymentsEmail().catch(console.error);
