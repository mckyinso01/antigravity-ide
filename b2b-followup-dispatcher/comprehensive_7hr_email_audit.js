// ============================================================
// Comprehensive 7-Hour Dual Inbox Audit
// SpaceMail (mharcgatan@linkable.it.com) & Gmail (mckinsyo01@gmail.com)
// Extracts: Direct Replies, OOO Alternate Emails, Bounces & DSNs
// ============================================================

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

function extractEmailsFromText(text) {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const matches = text.match(emailRegex) || [];
  // Filter out system emails
  const ignored = ['mailer-daemon', 'postmaster', 'google', 'spacemail', 'linkable.it.com', 'wsh.nhs.uk'];
  return [...new Set(matches.map(e => e.toLowerCase()).filter(e => !ignored.some(ig => e.includes(ig))))];
}

async function auditInbox(label, config) {
  console.log('='.repeat(75));
  console.log(`📡 AUDITING ${label} INBOX (${config.imap.user})...`);
  console.log('='.repeat(75));

  try {
    const connection = await imapSimple.connect(config);
    console.log(`✅ Connected to ${label} IMAP server.`);

    const box = await connection.openBox('INBOX');
    const total = box.messages.total;
    console.log(`📬 Total Message Count in INBOX: ${total}`);

    if (total === 0) {
      console.log('   (Empty Inbox)');
      connection.end();
      return { total: 0, autoReplies: [], bounces: [], directReplies: [] };
    }

    // Fetch the last 40 messages to cover the 7-hour period
    const countToFetch = Math.min(40, total);
    const startSeq = Math.max(1, total - countToFetch + 1);
    const seqRange = `${startSeq}:${total}`;
    console.log(`⚡ Fetching exact sequence range ${seqRange} (Last ${countToFetch} messages)...`);

    const messages = await new Promise((resolve, reject) => {
      const results = [];
      const f = connection.imap.seq.fetch(seqRange, {
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE REPLY-TO MESSAGE-ID)', 'TEXT']
      });

      f.on('message', (msg, seqno) => {
        let rawHeader = '';
        let rawBody = '';

        msg.on('body', (stream, info) => {
          let buffer = '';
          stream.on('data', (chunk) => { buffer += chunk.toString('utf8'); });
          stream.once('end', () => {
            if (info.which.includes('HEADER')) rawHeader = buffer;
            else rawBody = buffer;
          });
        });

        msg.once('end', () => {
          const h = parseHeaders(rawHeader);
          results.push({
            seqno,
            from: h.from || 'Unknown',
            subject: h.subject || '(No Subject)',
            date: h.date || '',
            replyTo: h['reply-to'] || '',
            body: rawBody
          });
        });
      });

      f.once('error', reject);
      f.once('end', () => resolve(results));
    });

    console.log(`📊 Successfully retrieved ${messages.length} messages.\n`);

    const autoReplies = [];
    const bounces = [];
    const directReplies = [];

    for (const m of messages) {
      const fromLower = m.from.toLowerCase();
      const subLower = m.subject.toLowerCase();

      // Suppress automated self-reporting digests
      if (fromLower.includes('mckinsyo01@gmail.com') && (subLower.includes('report') || subLower.includes('digest'))) {
        continue;
      }
      if (fromLower.includes('mharcgatan@linkable.it.com') && subLower.includes('dual architecture')) {
        continue; // Sent message copies in inbox
      }

      if (
        subLower.includes('automatic reply') ||
        subLower.includes('out of the office') ||
        subLower.includes('away from office') ||
        subLower.includes('auto:') ||
        subLower.includes('on annual leave') ||
        subLower.includes('vacation')
      ) {
        // Extract alternate emails from body
        const plainBody = m.body.replace(/<[^>]+>/g, ' ');
        const candidateEmails = extractEmailsFromText(plainBody);
        autoReplies.push({ ...m, candidateEmails, plainBody: plainBody.substring(0, 350).replace(/\r?\n\s*\r?\n/g, '\n').trim() });
      } else if (
        subLower.includes('delivery status notification') ||
        subLower.includes('undeliverable') ||
        subLower.includes('returned mail') ||
        subLower.includes('undelivered') ||
        subLower.includes('failure') ||
        fromLower.includes('mailer-daemon') ||
        fromLower.includes('postmaster')
      ) {
        // Extract bounced recipient from body or subject
        const plainBody = m.body.replace(/<[^>]+>/g, ' ');
        const bouncedEmails = extractEmailsFromText(plainBody);
        bounces.push({ ...m, bouncedEmails, snippet: plainBody.substring(0, 300).replace(/\r?\n\s*\r?\n/g, ' ').trim() });
      } else {
        directReplies.push(m);
      }
    }

    connection.end();
    return { total, autoReplies, bounces, directReplies };
  } catch (err) {
    console.error(`❌ Error auditing ${label}:`, err.message);
    return { total: 0, autoReplies: [], bounces: [], directReplies: [] };
  }
}

async function runMasterAudit() {
  const spaceMailConfig = {
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

  const gmailConfig = {
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

  const smResults = await auditInbox('SPACEMAIL', spaceMailConfig);
  const gmResults = await auditInbox('GMAIL', gmailConfig);

  console.log('\n' + '='.repeat(75));
  console.log('🏁 7-HOUR CONSOLIDATED AUDIT SUMMARY');
  console.log('='.repeat(75));

  console.log(`\n📬 1. DIRECT REPLIES DETECTED: ${smResults.directReplies.length + gmResults.directReplies.length}`);
  [...smResults.directReplies, ...gmResults.directReplies].forEach((d, i) => {
    console.log(`   [${i + 1}] 👤 ${d.from} | 📌 ${d.subject} | 📅 ${d.date}`);
  });

  console.log(`\n🏖️ 2. AUTOMATIC REPLIES DETECTED: ${smResults.autoReplies.length + gmResults.autoReplies.length}`);
  [...smResults.autoReplies, ...gmResults.autoReplies].forEach((a, i) => {
    console.log(`   [${i + 1}] 👤 From: ${a.from}`);
    console.log(`       📌 Subject: ${a.subject}`);
    console.log(`       📅 Date: ${a.date}`);
    console.log(`       🎯 Extracted Alternative Emails: ${a.candidateEmails.join(', ') || 'None found in text'}`);
    console.log(`       📝 Snippet:\n       "${a.plainBody.substring(0, 200)}..."`);
    console.log('   ---');
  });

  console.log(`\n❌ 3. BOUNCES / UNDELIVERABLE NOTICES DETECTED: ${smResults.bounces.length + gmResults.bounces.length}`);
  [...smResults.bounces, ...gmResults.bounces].forEach((b, i) => {
    console.log(`   [${i + 1}] 📌 Subject: ${b.subject} (${b.date})`);
    console.log(`       ⚠️ Senders/DAEMON: ${b.from}`);
    console.log(`       🎯 Bounced Recipient Candidates: ${b.bouncedEmails.join(', ') || 'See snippet'}`);
    console.log(`       📝 Error Snippet: "${b.snippet.substring(0, 180)}..."`);
    console.log('   ---');
  });
}

runMasterAudit().catch(console.error);
