const imaps = require('imap-simple');
const fs = require('fs');
const path = require('path');

// Ingest .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const GMAIL_CONFIG = {
  name: 'Gmail (mckinsyo01@gmail.com)',
  imap: {
    user: 'mckinsyo01@gmail.com',
    password: 'ldiibghudivdkboq',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  },
  boxes: ['INBOX', '[Gmail]/Spam']
};

const SPACEMAIL_CONFIG = {
  name: 'SpaceMail (mharcgatan@linkable.it.com)',
  imap: {
    user: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
    password: process.env.SPACEMAIL_PASS || 'Melonjuice01!',
    host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  },
  boxes: ['INBOX', 'Junk', 'Spam']
};

async function scanAccountFast(account) {
  console.log(`\n======================================================`);
  console.log(`🔍 SCANNING ${account.name} (Aug 18, 2026 -> Present)`);
  console.log(`======================================================`);

  let connection;
  const itemsFound = [];

  try {
    connection = await imaps.connect({ imap: account.imap });
    const sinceDate = new Date(2026, 7, 18); // August 18, 2026

    for (const box of account.boxes) {
      try {
        await connection.openBox(box);
        const searchCriteria = [['SINCE', sinceDate]];
        const fetchOptions = {
          bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE MESSAGE-ID)'],
          struct: false,
          markSeen: false
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        console.log(`📂 Folder "${box}": Retrieved ${messages.length} message headers.`);

        for (const msg of messages) {
          const headerPart = msg.parts.find(p => p.which.includes('HEADER'));
          const headers = headerPart?.body || {};
          const subject = (headers.subject?.[0] || 'No Subject').trim();
          const from = (headers.from?.[0] || 'Unknown Sender').trim();
          const date = (headers.date?.[0] || '').trim();
          const to = (headers.to?.[0] || '').trim();

          const msgDate = new Date(date);
          // Filter strictly >= Aug 18, 2026
          if (msgDate >= sinceDate) {
            itemsFound.push({
              account: account.name,
              box,
              date,
              from,
              to,
              subject
            });
          }
        }
      } catch (err) {
        console.log(`   (Folder note on ${box}: ${err.message})`);
      }
    }
  } catch (err) {
    console.error(`❌ Connection error for ${account.name}:`, err.message);
  } finally {
    if (connection) {
      try { await connection.end(); } catch {}
    }
  }

  return itemsFound;
}

async function runAudit() {
  console.log('⚡ STARTING ULTRA-FAST HEADER-LEVEL INBOX AUDIT (Aug 18-22, 2026)...\n');

  const gmailHeaders = await scanAccountFast(GMAIL_CONFIG);
  const spacemailHeaders = await scanAccountFast(SPACEMAIL_CONFIG);

  const allMessages = [...gmailHeaders, ...spacemailHeaders];
  console.log(`\n📬 Total Messages Received Across Both Accounts (Aug 18 - 22): ${allMessages.length}\n`);

  // Classify Messages
  const visitorsAndBeacons = [];
  const prospectReplies = [];
  const bouncesAndPostmaster = [];
  const systemAndCommercial = [];
  const executiveReports = [];

  for (const m of allMessages) {
    const fromLow = m.from.toLowerCase();
    const subjLow = m.subject.toLowerCase();

    if (fromLow.includes('formsubmit') || subjLow.includes('gatzdevs') || subjLow.includes('visitor') || subjLow.includes('survey') || subjLow.includes('submission')) {
      visitorsAndBeacons.push(m);
    } else if (subjLow.includes('hourly report') || subjLow.includes('5-hour') || subjLow.includes('executive telemetry') || subjLow.includes('linkableai official spacemail')) {
      executiveReports.push(m);
    } else if (fromLow.includes('mailer-daemon') || fromLow.includes('postmaster') || subjLow.includes('delivery status') || subjLow.includes('undelivered') || subjLow.includes('failed')) {
      bouncesAndPostmaster.push(m);
    } else if (
      fromLow.includes('google') || fromLow.includes('linkedin') || fromLow.includes('coursera') ||
      fromLow.includes('facebook') || fromLow.includes('jobstreet') || fromLow.includes('namecheap') ||
      fromLow.includes('dubaidutyfree') || fromLow.includes('grabpoints') || fromLow.includes('flexjobs')
    ) {
      systemAndCommercial.push(m);
    } else {
      prospectReplies.push(m);
    }
  }

  console.log('================================================================');
  console.log(`🌐 1. WEBSITE VISITORS / BEACON FORMS: ${visitorsAndBeacons.length}`);
  console.log('================================================================');
  visitorsAndBeacons.forEach(v => console.log(`   📅 ${v.date} | From: ${v.from} | Subject: ${v.subject}`));

  console.log('\n================================================================');
  console.log(`💬 2. DIRECT PROSPECT INBOUND / HIGH INTENT EMAILS: ${prospectReplies.length}`);
  console.log('================================================================');
  if (prospectReplies.length === 0) {
    console.log('   (No unclassified direct prospect replies detected in this timeframe)');
  } else {
    prospectReplies.forEach(p => console.log(`   📅 ${p.date} | Account: ${p.account} | From: ${p.from} | Subject: ${p.subject}`));
  }

  console.log('\n================================================================');
  console.log(`🚨 3. BOUNCES / POSTMASTER / DELIVERY NOTIFICATIONS: ${bouncesAndPostmaster.length}`);
  console.log('================================================================');
  bouncesAndPostmaster.forEach(b => console.log(`   📅 ${b.date} | Account: ${b.account} | Subject: ${b.subject}`));

  console.log('\n================================================================');
  console.log(`📊 4. EXECUTIVE TELEMETRY REPORTS RECEIVED: ${executiveReports.length}`);
  console.log('================================================================');
  executiveReports.forEach(e => console.log(`   📅 ${e.date} | Account: ${e.account} | Subject: ${e.subject}`));

  // Check local submitted surveys ledger
  const surveysLedgerPath = path.join(__dirname, 'submitted_prospect_surveys_ledger.json');
  let surveys = [];
  if (fs.existsSync(surveysLedgerPath)) {
    try { surveys = JSON.parse(fs.readFileSync(surveysLedgerPath, 'utf8')); } catch {}
  }
  console.log('\n================================================================');
  console.log(`📝 5. LOCAL CO-DESIGN SURVEY RESPONSES ON FILE: ${surveys.length}`);
  console.log('================================================================');
  surveys.forEach((s, i) => console.log(`   #${i+1} ${s.submittedAt || s.date} | Hospital: ${s.hospitalName || s.hospital} | Contact: ${s.contactPerson || s.email} | Intent: ${s.requestedChanges || s.feedback}`));

  const resultFile = path.join(__dirname, 'fast_august18_audit_summary.json');
  fs.writeFileSync(resultFile, JSON.stringify({
    timestamp: new Date().toISOString(),
    window: 'August 18, 2026 -> August 22, 2026',
    totalMessages: allMessages.length,
    visitorsAndBeaconsCount: visitorsAndBeacons.length,
    prospectRepliesCount: prospectReplies.length,
    bouncesCount: bouncesAndPostmaster.length,
    executiveReportsCount: executiveReports.length,
    surveysCount: surveys.length,
    visitorsAndBeacons,
    prospectReplies,
    bouncesAndPostmaster,
    executiveReports,
    surveys
  }, null, 2));

  console.log(`\n💾 Saved detailed audit JSON to: ${resultFile}`);
}

runAudit().catch(console.error);
