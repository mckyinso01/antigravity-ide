import imapSimple from 'imap-simple';
import dotenv from 'dotenv';

dotenv.config();

function parseHeaders(raw) {
  const lines = raw.split(/\r?\n/);
  const headers = {};
  let currentKey = null;

  for (const line of lines) {
    if (/^\s+/.test(line) && currentKey) {
      headers[currentKey] += ' ' + line.trim();
    } else {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        currentKey = match[1].toLowerCase();
        headers[currentKey] = match[2].trim();
      }
    }
  }
  return headers;
}

async function checkSpaceMail() {
  console.log('\n' + '='.repeat(70));
  console.log('📡 1. AUDITING SPACEMAIL INBOX (mharcgatan@linkable.it.com)...');
  console.log('='.repeat(70));

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

  try {
    const connection = await imapSimple.connect(config);
    console.log('✅ Connected to SpaceMail IMAP server.');
    const box = await connection.openBox('INBOX');
    const total = box.messages.total;
    console.log(`📬 Total Messages in SpaceMail INBOX: ${total}`);

    if (total === 0) {
      console.log('   (Inbox is completely empty)');
      connection.end();
      return;
    }

    const countToFetch = Math.min(20, total);
    const startSeq = Math.max(1, total - countToFetch + 1);
    const seqRange = `${startSeq}:${total}`;

    const messages = await new Promise((resolve, reject) => {
      const results = [];
      const f = connection.imap.seq.fetch(seqRange, {
        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE REPLY-TO)'
      });

      f.on('message', (msg, seqno) => {
        let rawHeader = '';
        msg.on('body', (stream) => {
          stream.on('data', (chunk) => { rawHeader += chunk.toString('utf8'); });
          stream.once('end', () => {
            const h = parseHeaders(rawHeader);
            results.push({
              seqno,
              from: h.from || 'Unknown',
              subject: h.subject || '(No Subject)',
              date: h.date || '',
              replyTo: h['reply-to'] || ''
            });
          });
        });
      });

      f.once('error', reject);
      f.once('end', () => resolve(results));
    });

    console.log(`📊 Retrieved ${messages.length} messages from SpaceMail:\n`);
    for (const m of messages.reverse()) {
      console.log(`• [${m.date}]`);
      console.log(`  👤 From: ${m.from}`);
      console.log(`  📌 Subject: ${m.subject}`);
      console.log('---');
    }

    connection.end();
  } catch (err) {
    console.error('❌ SpaceMail Error:', err.message);
  }
}

async function checkGmail() {
  console.log('\n' + '='.repeat(70));
  console.log('📡 2. AUDITING GMAIL INBOX (mckinsyo01@gmail.com)...');
  console.log('='.repeat(70));

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

  try {
    const connection = await imapSimple.connect(config);
    console.log('✅ Connected to Gmail IMAP server.');
    const box = await connection.openBox('INBOX');
    const total = box.messages.total;
    console.log(`📬 Total Messages in Gmail INBOX: ${total}`);

    const countToFetch = 15;
    const startSeq = Math.max(1, total - countToFetch + 1);
    const seqRange = `${startSeq}:${total}`;

    const messages = await new Promise((resolve, reject) => {
      const results = [];
      const f = connection.imap.seq.fetch(seqRange, {
        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE REPLY-TO)'
      });

      f.on('message', (msg, seqno) => {
        let rawHeader = '';
        msg.on('body', (stream) => {
          stream.on('data', (chunk) => { rawHeader += chunk.toString('utf8'); });
          stream.once('end', () => {
            const h = parseHeaders(rawHeader);
            results.push({
              seqno,
              from: h.from || 'Unknown',
              subject: h.subject || '(No Subject)',
              date: h.date || '',
              replyTo: h['reply-to'] || ''
            });
          });
        });
      });

      f.once('error', reject);
      f.once('end', () => resolve(results));
    });

    console.log(`📊 Retrieved ${messages.length} recent messages from Gmail:\n`);
    for (const m of messages.reverse()) {
      const fromLower = m.from.toLowerCase();
      const subLower = m.subject.toLowerCase();
      if (fromLower.includes('mckinsyo01@gmail.com') && (subLower.includes('report') || subLower.includes('digest'))) {
        continue;
      }
      console.log(`• [${m.date}]`);
      console.log(`  👤 From: ${m.from}`);
      console.log(`  📌 Subject: ${m.subject}`);
      console.log('---');
    }

    connection.end();
  } catch (err) {
    console.error('❌ Gmail Error:', err.message);
  }
}

async function runAudit() {
  await checkSpaceMail();
  await checkGmail();
}

runAudit().catch(console.error);
