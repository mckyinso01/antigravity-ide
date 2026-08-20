const fs = require('fs');
const path = require('path');
const imaps = require('imap-simple');

const imapConfig = {
  imap: {
    user: 'mckinsyo01@gmail.com',
    password: 'ldiibghudivdkboq',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 15000
  }
};

async function baseline() {
  const connection = await imaps.connect(imapConfig);
  await connection.openBox('INBOX');

  const messages = await connection.search([['ALL']], { bodies: ['HEADER'], struct: false, markSeen: false });
  console.log('Baselining ' + messages.length + ' existing messages into processed set...');

  const processed = messages.map(m => {
    const header = m.parts.find(p => p.which === 'HEADER')?.body;
    const msgId = header?.['message-id']?.[0] || 'UID_' + m.attributes.uid;
    return {
      messageId: msgId,
      from: header?.from?.[0] || '',
      subject: header?.subject?.[0] || '',
      type: 'BASELINE_INITIALIZED'
    };
  });

  const outPath = path.join(__dirname, 'inbound_replies_processed.json');
  fs.writeFileSync(outPath, JSON.stringify(processed, null, 2), 'utf8');
  console.log('Saved baseline to inbound_replies_processed.json');
  connection.end();
}

baseline().catch(console.error);
