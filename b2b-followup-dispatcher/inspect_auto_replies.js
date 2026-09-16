import imapSimple from 'imap-simple';

const config = {
  imap: {
    user: 'mharcgatan@linkable.it.com',
    password: process.env.SMTP_PASS,
    host: 'mail.spacemail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 15000
  }
};

async function inspectReplies() {
  const connection = await imapSimple.connect(config);
  await connection.openBox('INBOX');
  
  // Sequence numbers corresponding to the automatic replies
  // Fetch the last 15 messages
  const box = connection.serverInfo;
  const f = connection.imap.seq.fetch('15:29', { bodies: ['HEADER', 'TEXT'] });
  
  f.on('message', (msg, seqno) => {
    let rawHeader = '';
    let rawBody = '';
    
    msg.on('body', (stream, info) => {
      let buffer = '';
      stream.on('data', chunk => buffer += chunk.toString('utf8'));
      stream.once('end', () => {
        if (info.which === 'HEADER') rawHeader = buffer;
        else rawBody = buffer;
      });
    });
    
    msg.once('end', () => {
      const isAutoReply = rawHeader.toLowerCase().includes('automatic reply') || rawHeader.toLowerCase().includes('out of the office');
      if (isAutoReply) {
        const fromMatch = rawHeader.match(/From:\s*(.*)/i);
        const subMatch = rawHeader.match(/Subject:\s*(.*)/i);
        console.log('='.repeat(70));
        console.log(`📌 FROM: ${fromMatch ? fromMatch[1].trim() : 'Unknown'}`);
        console.log(`📌 SUBJECT: ${subMatch ? subMatch[1].trim() : 'No Subject'}`);
        console.log('--- CONTENT SNIPPET ---');
        console.log(rawBody.substring(0, 500).replace(/\r?\n\s*\r?\n/g, '\n').trim());
        console.log('='.repeat(70) + '\n');
      }
    });
  });
  
  f.once('end', () => {
    setTimeout(() => connection.end(), 2000);
  });
}

inspectReplies().catch(console.error);
