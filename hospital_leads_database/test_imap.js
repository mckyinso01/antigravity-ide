const imaps = require('imap-simple');

const config = {
  imap: {
    user: 'mckinsyo01@gmail.com',
    password: 'ldiibghudivdkboq',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  }
};

async function testImap() {
  console.log('🔄 Testing IMAP connection to imap.gmail.com...');
  const connection = await imaps.connect(config);
  console.log('✅ Connected to Gmail IMAP successfully!');
  await connection.openBox('INBOX');
  const searchCriteria = ['UNSEEN'];
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true };
  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`📬 Current Unseen Messages in Inbox: ${messages.length}`);
  connection.end();
}

testImap().catch(console.error);
