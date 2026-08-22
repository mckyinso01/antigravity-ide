const imaps = require('imap-simple');
const fs = require('fs');
const path = require('path');

async function inspectHighIntentMessages() {
  console.log('🔍 Connecting to Gmail to perform forensic content inspection on high-intent subjects...\n');

  const connection = await imaps.connect({
    imap: {
      user: 'mckinsyo01@gmail.com',
      password: 'ldiibghudivdkboq',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 15000
    }
  });

  await connection.openBox('INBOX');

  // Search specific subjects to inspect their exact origin, payload, and body
  const searchCriteria = [['SINCE', new Date(2026, 7, 18)]];
  const fetchOptions = {
    bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE MESSAGE-ID)', 'TEXT'],
    struct: true,
    markSeen: false
  };

  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log(`Retrieved ${messages.length} messages. Inspecting targets...\n`);

  const results = [];

  for (const msg of messages) {
    const headerPart = msg.parts.find(p => p.which.includes('HEADER'));
    const textPart = msg.parts.find(p => p.which === 'TEXT');

    const headers = headerPart?.body || {};
    const subject = (headers.subject?.[0] || '').trim();
    const from = (headers.from?.[0] || '').trim();
    const date = (headers.date?.[0] || '').trim();
    const rawText = textPart?.body || '';
    const cleanBody = rawText.replace(/<[^>]*>?/gm, ' ').replace(/=\r?\n/g, '').replace(/\s+/g, ' ').trim();

    const isTarget =
      subject.includes('BUYOUT') ||
      subject.includes('Banner University') ||
      subject.includes('STAT High-Intent') ||
      subject.includes('Evaluating ICU Telemetry') ||
      subject.includes('SACCADE-UI LEAD') ||
      subject.includes('HIGH-INTENT PROSPECT REPLY') ||
      subject.includes('Launch Demo');

    if (isTarget) {
      // Determine if Test
      const isInternalFrom = from.includes('mckinsyo01@gmail.com') || from.includes('mharcgatan@linkable.it.com');
      const hasTestIndicators =
        cleanBody.toLowerCase().includes('test') ||
        cleanBody.toLowerCase().includes('localhost') ||
        cleanBody.toLowerCase().includes('demo simulation') ||
        subject.toLowerCase().includes('alexis vance') ||
        cleanBody.includes('San Roque') ||
        cleanBody.includes('Dr. Robert Vance') ||
        cleanBody.includes('LNK-2026-0WMF9');

      results.push({
        date,
        from,
        subject,
        bodySnippet: cleanBody.slice(0, 350),
        isInternalSender: isInternalFrom,
        hasTestIndicators,
        classification: hasTestIndicators || isInternalFrom ? '🧪 INTERNAL_TEST_SIMULATION' : '👤 AUTHENTIC_EXTERNAL_PROSPECT'
      });
    }
  }

  await connection.end();

  console.log('================================================================');
  console.log(`🔎 FORENSIC AUDIT OF HIGH-INTENT SIGNALS (${results.length} items evaluated)`);
  console.log('================================================================');

  results.forEach((r, i) => {
    console.log(`\n[SIGNAL #${i + 1}] ${r.classification}`);
    console.log(`📅 Date:    ${r.date}`);
    console.log(`👤 From:    ${r.from}`);
    console.log(`📌 Subject: ${r.subject}`);
    console.log(`📝 Snippet: ${r.bodySnippet}`);
  });

  fs.writeFileSync(path.join(__dirname, 'forensic_high_intent_audit.json'), JSON.stringify(results, null, 2));
}

inspectHighIntentMessages().catch(console.error);
