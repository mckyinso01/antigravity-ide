// ============================================================
// Deep Audit of Bounces and Delivery Failures in Gmail
// Account: mckinsyo01@gmail.com
// ============================================================

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

function extractFailedRecipient(text) {
  // Regex patterns commonly found in Gmail DSNs:
  // "The response was: 550 ... recipient@domain.com"
  // "Your message wasn't delivered to recipient@domain.com because the address couldn't be found"
  // "An error occurred while trying to deliver the mail to the following recipients: recipient@domain.com"
  const patterns = [
    /delivered to ([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i,
    /deliver the mail to the following recipients?:\s*<?([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)>?/i,
    /failed recipient:\s*<?([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)>?/i,
    /final-recipient:\s*rfc822;\s*<?([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)>?/i,
    /<([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)>:\s*(?:550|553|554|Host or domain name not found|User unknown|Recipient address rejected)/i,
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)\s*(?:couldn't be found|does not exist|User unknown)/i
  ];

  for (const pat of patterns) {
    const match = text.match(pat);
    if (match && match[1]) {
      const email = match[1].toLowerCase();
      if (!email.includes('googlemail') && !email.includes('gmail') && !email.includes('mailer-daemon')) {
        return email;
      }
    }
  }

  // Fallback: look for general email addresses in text excluding gmail/google
  const generalEmails = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) || [];
  const filtered = generalEmails
    .map(e => e.toLowerCase())
    .filter(e => !e.includes('google') && !e.includes('gmail') && !e.includes('mailer-daemon') && !e.includes('linkable.it.com'));
  
  return filtered.length > 0 ? filtered[0] : 'Unknown';
}

function extractBounceReason(text) {
  const lines = text.split(/\r?\n/);
  const relevantLines = [];
  for (const line of lines) {
    const l = line.trim();
    if (
      l.includes('550') ||
      l.includes('553') ||
      l.includes('554') ||
      l.includes('couldn\'t be found') ||
      l.includes('does not exist') ||
      l.includes('Domain not found') ||
      l.includes('Recipient address rejected') ||
      l.includes('mailbox unavailable') ||
      l.includes('User unknown') ||
      l.includes('relay not permitted') ||
      l.includes('Access denied') ||
      l.includes('blocked')
    ) {
      relevantLines.push(l);
    }
  }
  return relevantLines.slice(0, 3).join(' | ') || 'Diagnostic code not found in snippet';
}

async function deepAuditGmailBounces() {
  console.log('='.repeat(75));
  console.log('🔍 DEEP AUDIT: GMAIL BOUNCES & DELIVERY STATUS NOTIFICATIONS (DSN)');
  console.log('Account: mckinsyo01@gmail.com');
  console.log('='.repeat(75));

  const connection = await imapSimple.connect(config);
  const box = await connection.openBox('INBOX');
  const total = box.messages.total;
  console.log(`📬 Total messages in Gmail INBOX: ${total}`);

  // Fetch the last 80 messages
  const countToFetch = Math.min(80, total);
  const startSeq = Math.max(1, total - countToFetch + 1);
  const seqRange = `${startSeq}:${total}`;
  console.log(`⚡ Scanning sequence range ${seqRange} (Last ${countToFetch} messages)...`);

  const messages = await new Promise((resolve, reject) => {
    const results = [];
    const f = connection.imap.seq.fetch(seqRange, {
      bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE MESSAGE-ID)', 'TEXT']
    });

    f.on('message', (msg, seqno) => {
      let header = '';
      let body = '';

      msg.on('body', (stream, info) => {
        let b = '';
        stream.on('data', c => b += c.toString('utf8'));
        stream.once('end', () => {
          if (info.which.includes('HEADER')) header = b;
          else body = b;
        });
      });

      msg.once('end', () => {
        const h = parseHeaders(header);
        results.push({
          seqno,
          from: h.from || 'Unknown',
          subject: h.subject || '(No Subject)',
          date: h.date || '',
          body
        });
      });
    });

    f.once('error', reject);
    f.once('end', () => resolve(results));
  });

  console.log(`📊 Retrieved ${messages.length} messages. Analyzing for bounces...\n`);

  const bounces = [];
  const autoReplies = [];

  for (const m of messages) {
    const fromLower = m.from.toLowerCase();
    const subLower = m.subject.toLowerCase();
    const bodyText = m.body.replace(/<[^>]+>/g, ' ');

    const isBounce = 
      fromLower.includes('mailer-daemon') ||
      fromLower.includes('postmaster') ||
      subLower.includes('delivery status notification') ||
      subLower.includes('address not found') ||
      subLower.includes('undelivered mail') ||
      subLower.includes('undeliverable') ||
      subLower.includes('returned mail') ||
      subLower.includes('failure');

    const isAutoReply = 
      subLower.includes('automatic reply') ||
      subLower.includes('out of the office') ||
      subLower.includes('auto:') ||
      subLower.includes('on leave');

    if (isBounce) {
      const recipient = extractFailedRecipient(bodyText);
      const reason = extractBounceReason(bodyText);
      bounces.push({
        seqno: m.seqno,
        date: m.date,
        subject: m.subject,
        from: m.from,
        recipient,
        reason,
        snippet: bodyText.substring(0, 300).replace(/\r?\n\s*\r?\n/g, ' ').trim()
      });
    } else if (isAutoReply) {
      autoReplies.push({
        seqno: m.seqno,
        date: m.date,
        subject: m.subject,
        from: m.from
      });
    }
  }

  console.log('='.repeat(75));
  console.log(`❌ BOUNCED / ADDRESS NOT FOUND MESSAGES FOUND IN GMAIL: ${bounces.length}`);
  console.log('='.repeat(75));

  if (bounces.length === 0) {
    console.log('No bounce messages found in the last 80 Gmail messages.');
  } else {
    bounces.forEach((b, i) => {
      console.log(`\n[${i + 1}] 📌 SUBJECT: ${b.subject}`);
      console.log(`    📅 DATE: ${b.date}`);
      console.log(`    👤 SENDER/DAEMON: ${b.from}`);
      console.log(`    🎯 FAILED RECIPIENT: ${b.recipient}`);
      console.log(`    ⚠️ ERROR REASON: ${b.reason}`);
      console.log(`    📝 RAW SNIPPET: "${b.snippet.substring(0, 200)}..."`);
    });
  }

  console.log('\n' + '='.repeat(75));
  console.log(`🏖️ AUTO-REPLIES FOUND IN GMAIL: ${autoReplies.length}`);
  console.log('='.repeat(75));
  autoReplies.forEach((a, i) => {
    console.log(`[${i + 1}] ${a.from} | ${a.subject} | ${a.date}`);
  });

  connection.end();
}

deepAuditGmailBounces().catch(console.error);
