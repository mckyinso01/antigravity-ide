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

async function readFullTable() {
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  const searchCriteria = [['HEADER', 'subject', 'Miami, United States']];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: false, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  if (messages.length > 0) {
    const textPart = messages[0].parts.find(p => p.which === 'TEXT')?.body || '';
    // Strip HTML tags
    const cleanText = textPart.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ');
    console.log('Clean Extracted Payload:');
    console.log(cleanText);
  }
  connection.end();
}

readFullTable().catch(console.error);
