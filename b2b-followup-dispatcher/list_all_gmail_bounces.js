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

async function listAllBounces() {
  const connection = await imapSimple.connect(config);
  const box = await connection.openBox('INBOX');
  const total = box.messages.total;
  const countToFetch = 100;
  const startSeq = Math.max(1, total - countToFetch + 1);

  const f = connection.imap.seq.fetch(`${startSeq}:${total}`, {
    bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT']
  });

  const bounces = [];

  f.on('message', (msg, seqno) => {
    let header = '', body = '';
    msg.on('body', (stream, info) => {
      let b = '';
      stream.on('data', c => b += c.toString('utf8'));
      stream.once('end', () => {
        if (info.which.includes('HEADER')) header = b;
        else body = b;
      });
    });

    msg.once('end', () => {
      const subMatch = header.match(/Subject:\s*(.*)/i);
      const fromMatch = header.match(/From:\s*(.*)/i);
      const dateMatch = header.match(/Date:\s*(.*)/i);

      const sub = subMatch ? subMatch[1].trim() : '';
      const from = fromMatch ? fromMatch[1].trim() : '';
      const date = dateMatch ? dateMatch[1].trim() : '';

      const isBounce = 
        from.toLowerCase().includes('mailer-daemon') ||
        from.toLowerCase().includes('postmaster') ||
        sub.toLowerCase().includes('delivery status notification') ||
        sub.toLowerCase().includes('address not found') ||
        sub.toLowerCase().includes('undelivered') ||
        sub.toLowerCase().includes('undeliverable') ||
        sub.toLowerCase().includes('returned mail') ||
        sub.toLowerCase().includes('failure');

      if (isBounce) {
        const text = body.replace(/<[^>]+>/g, ' ');
        const emailMatches = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || [];
        const filtered = emailMatches.filter(e => 
          !e.toLowerCase().includes('google') && 
          !e.toLowerCase().includes('gmail') && 
          !e.toLowerCase().includes('linkable.it.com') && 
          !e.toLowerCase().includes('mailer-daemon')
        );

        // Extract error line
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const errLine = lines.find(l => 
          l.includes('550') || l.includes('554') || l.includes('553') || 
          l.includes('couldn\'t be found') || l.includes('does not exist') || 
          l.includes('Domain not found') || l.includes('User unknown')
        ) || lines.find(l => l.includes('Error') || l.includes('rejected')) || 'See snippet';

        bounces.push({
          seqno,
          date,
          from,
          subject: sub,
          recipient: filtered[0] || 'Unknown',
          reason: errLine.substring(0, 120)
        });
      }
    });
  });

  f.once('end', () => {
    setTimeout(() => {
      console.log('='.repeat(75));
      console.log(`TOTAL BOUNCES IN GMAIL: ${bounces.length}`);
      console.log('='.repeat(75));
      bounces.forEach((b, idx) => {
        console.log(`${idx + 1}. [${b.date}] Target: ${b.recipient}`);
        console.log(`   From: ${b.from} | Sub: ${b.subject}`);
        console.log(`   Reason: ${b.reason}`);
        console.log('-'.repeat(50));
      });
      connection.end();
    }, 3000);
  });
}

listAllBounces().catch(console.error);
