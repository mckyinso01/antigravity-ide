const imaps = require('imap-simple');

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

async function checkFormContent() {
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 2);

  const searchCriteria = [['SINCE', sinceDate], ['HEADER', 'subject', 'New Visitor']];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: false, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`Found ${messages.length} visitor telemetry alerts.`);

  if (messages.length > 0) {
    const latest = messages[messages.length - 1];
    const text = latest.parts.find(p => p.which === 'TEXT')?.body || '';
    console.log('Sample Latest Visitor Form Payload:');
    console.log(text);
  }

  connection.end();
}

checkFormContent().catch(console.error);
