import imapSimple from 'imap-simple';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  imap: {
    user: process.env.SMTP_USER || 'mckinsyo01@gmail.com',
    password: process.env.SMTP_PASS,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
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

async function auditInboundMessages() {
  console.log('='.repeat(75));
  console.log('📥 INBOUND IMAP CLOSING & LEAD TRIAGE MONITOR');
  console.log(`📡 Connecting to Gmail IMAP (${config.imap.user})...`);
  console.log('='.repeat(75));

  try {
    const connection = await imapSimple.connect(config);
    console.log('✅ Connected to Gmail IMAP server.');

    const box = await connection.openBox('INBOX');
    const total = box.messages.total;
    console.log(`📬 Total Inbox Message Count: ${total}`);

    const countToFetch = 25;
    const startSeq = Math.max(1, total - countToFetch + 1);
    const seqRange = `${startSeq}:${total}`;
    console.log(`⚡ Fetching exact sequence range ${seqRange} (Last ${countToFetch} messages)...`);

    const messages = await new Promise((resolve, reject) => {
      const results = [];
      const f = connection.imap.seq.fetch(seqRange, {
        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE REPLY-TO)'
      });

      f.on('message', (msg, seqno) => {
        let rawHeader = '';
        msg.on('body', (stream) => {
          stream.on('data', (chunk) => {
            rawHeader += chunk.toString('utf8');
          });
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

    console.log(`📊 Successfully retrieved ${messages.length} recent messages.\n`);

    const categorized = {
      hotInbound: [],
      outOfOffice: [],
      deliveryReports: [],
      generalUpdates: []
    };

    for (const m of messages) {
      const fromLower = m.from.toLowerCase();
      const subLower = m.subject.toLowerCase();

      // Filter out auto-generated executive check reports sent to self
      if (fromLower.includes('mckinsyo01@gmail.com') && (subLower.includes('executive report') || subLower.includes('digest'))) {
        continue;
      }

      if (
        subLower.includes('automatic reply') ||
        subLower.includes('out of the office') ||
        subLower.includes('away from office') ||
        subLower.includes('on annual leave') ||
        subLower.includes('vacation')
      ) {
        categorized.outOfOffice.push(m);
      } else if (
        subLower.includes('delivery status notification') ||
        subLower.includes('undeliverable') ||
        subLower.includes('returned mail') ||
        fromLower.includes('mailer-daemon') ||
        fromLower.includes('postmaster')
      ) {
        categorized.deliveryReports.push(m);
      } else if (
        subLower.includes('dual architecture') ||
        subLower.includes('clinical pristine') ||
        subLower.includes('claimguard') ||
        subLower.includes('linkable') ||
        subLower.includes('icu') ||
        subLower.includes('telemetry') ||
        subLower.includes('re:') ||
        subLower.includes('fwd:') ||
        subLower.includes('contract') ||
        subLower.includes('invoice') ||
        subLower.includes('proposal')
      ) {
        categorized.hotInbound.push(m);
      } else {
        categorized.generalUpdates.push(m);
      }
    }

    console.log('='.repeat(75));
    console.log('🔥 1. HOT INBOUND CLIENT REPLIES & DISCUSSIONS:');
    if (categorized.hotInbound.length === 0) {
      console.log('   (No direct customer replies in current window - pipeline warming up)');
    } else {
      categorized.hotInbound.forEach((h, i) => {
        console.log(`   [${i + 1}] 👤 From: ${h.from}`);
        console.log(`       📌 Subject: ${h.subject}`);
        console.log(`       📅 Date: ${h.date}`);
      });
    }

    console.log('\n🏖️ 2. OUT-OF-OFFICE & ALTERNATE CONTACTS (WARM LEADS):');
    if (categorized.outOfOffice.length === 0) {
      console.log('   (No automated OOO notices in last 25 emails)');
    } else {
      categorized.outOfOffice.forEach((o, i) => {
        console.log(`   [${i + 1}] 👤 From: ${o.from}`);
        console.log(`       📌 Subject: ${o.subject}`);
        console.log(`       📅 Date: ${o.date}`);
      });
    }

    console.log('\n📬 3. GATEWAY & BOUNCE NOTICES (FOR DATABASE HYGIENE):');
    console.log(`   Total notices in sample: ${categorized.deliveryReports.length}`);
    categorized.deliveryReports.slice(-5).forEach((d, i) => {
      console.log(`   [${i + 1}] 📌 ${d.subject} (${d.from})`);
    });

    console.log('\n📫 4. RECENT SYSTEM & EXTERNAL NOTIFICATIONS:');
    categorized.generalUpdates.slice(-5).forEach((g, i) => {
      console.log(`   [${i + 1}] 📌 ${g.subject} (${g.from})`);
    });

    console.log('\n' + '='.repeat(75));
    console.log('🏁 INBOUND IMAP TRIAGE COMPLETE');
    console.log('='.repeat(75));

    connection.end();
  } catch (err) {
    console.error('❌ IMAP Error:', err.message);
  }
}

auditInboundMessages().catch(console.error);
