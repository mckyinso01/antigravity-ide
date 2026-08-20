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
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  }
};

async function checkRecent() {
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 2);

  const searchCriteria = [['SINCE', sinceDate]];
  const fetchOptions = { bodies: ['HEADER'], struct: false, markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log('=== LATEST EMAILS (PAST 48 HOURS) ===');
  messages.slice(-15).reverse().forEach((msg, idx) => {
    const header = msg.parts.find(p => p.which === 'HEADER')?.body;
    console.log([] Date:  | From:  | Subject: );
  });
  connection.end();
}

checkRecent().catch(console.error);
