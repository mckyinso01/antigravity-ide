const imaps = require('imap-simple');
const fs = require('fs');

const SENDER_EMAIL = 'mckinsyo01@gmail.com';
const SENDER_PASS = 'ldiibghudivdkboq';

const imapConfig = {
  imap: {
    user: SENDER_EMAIL,
    password: SENDER_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }
  }
};

async function readFormSubmitSubmissions() {
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 3);

  const searchCriteria = [['SINCE', sinceDate], ['HEADER', 'from', 'formsubmit']];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: false, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`Found ${messages.length} FormSubmit notifications.`);

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const header = msg.parts.find(p => p.which === 'HEADER');
    const text = msg.parts.find(p => p.which === 'TEXT');
    console.log(`\n--------------------------------------------`);
    console.log(`[SUBMISSION #${i+1}] Date: ${header?.body?.date?.[0]}`);
    console.log(`Subject: ${header?.body?.subject?.[0]}`);
    console.log(`Body:`);
    console.log(text?.body?.substring(0, 500));
  }

  connection.end();
}

readFormSubmitSubmissions().catch(console.error);
