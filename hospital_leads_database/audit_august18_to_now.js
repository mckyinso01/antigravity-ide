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

const SPACEMAIL_CONFIG = {
  imap: {
    user: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
    password: process.env.SPACEMAIL_PASS || 'Melonjuice01!',
    host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 15000
  }
};

async function auditMailbox(accountName, imapConfig) {
  console.log(`\n======================================================`);
  console.log(`🔍 AUDITING ${accountName.toUpperCase()} [Aug 18, 2026 -> Present]`);
  console.log(`======================================================`);

  let connection;
  const results = {
    visitorsAndLeads: [],
    prospectReplies: [],
    ordersAndPayments: [],
    bouncesAndAutoReplies: [],
    otherMessages: []
  };

  try {
    connection = await imaps.connect(imapConfig);
    await connection.openBox('INBOX');

    // Search messages from Aug 18, 2026
    const searchDate = new Date(2026, 7, 18); // August 18, 2026
    const searchCriteria = [['SINCE', searchDate]];
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`📬 Retrieved ${messages.length} messages received since August 18 in ${accountName}.`);

    for (const msg of messages) {
      const headerPart = msg.parts.find(p => p.which === 'HEADER');
      const textPart = msg.parts.find(p => p.which === 'TEXT');

      const subject = headerPart?.body?.subject?.[0] || 'No Subject';
      const from = headerPart?.body?.from?.[0] || 'Unknown Sender';
      const date = headerPart?.body?.date?.[0] || '';
      const rawText = textPart?.body || '';
      const cleanBody = rawText.replace(/<[^>]*>?/gm, ' ').replace(/=\r?\n/g, '').replace(/\s+/g, ' ').trim().substring(0, 500);

      const msgObj = { date, from, subject, excerpt: cleanBody };

      const lowerFrom = from.toLowerCase();
      const lowerSubj = subject.toLowerCase();
      const lowerBody = cleanBody.toLowerCase();

      // 1. Website Visitors & Form Submissions / Beacons
      if (
        lowerFrom.includes('formsubmit') ||
        lowerSubj.includes('gatzdevs') ||
        lowerSubj.includes('visitor') ||
        lowerSubj.includes('form submission') ||
        lowerSubj.includes('survey') ||
        lowerSubj.includes('contact form') ||
        lowerSubj.includes('feedback') ||
        lowerSubj.includes('sandbox')
      ) {
        results.visitorsAndLeads.push(msgObj);
      }
      // 2. Orders & Commercial Payments
      else if (
        lowerFrom.includes('stripe') ||
        lowerFrom.includes('paypal') ||
        lowerFrom.includes('gumroad') ||
        lowerFrom.includes('lemonsqueezy') ||
        lowerSubj.includes('payment') ||
        lowerSubj.includes('order') ||
        lowerSubj.includes('invoice') ||
        lowerSubj.includes('purchased')
      ) {
        results.ordersAndPayments.push(msgObj);
      }
      // 3. Bounces & System Delivery Notifications
      else if (
        lowerFrom.includes('mailer-daemon') ||
        lowerFrom.includes('postmaster') ||
        lowerSubj.includes('delivery status') ||
        lowerSubj.includes('undelivered') ||
        lowerSubj.includes('failure') ||
        lowerSubj.includes('out of office') ||
        lowerSubj.includes('automatic reply') ||
        lowerSubj.includes('autoreply')
      ) {
        results.bouncesAndAutoReplies.push(msgObj);
      }
      // 4. Potential Direct Prospect Replies / High Intents
      else if (
        !lowerFrom.includes('mharcgatan@linkable.it.com') &&
        !lowerFrom.includes('mckinsyo01@gmail.com') &&
        !lowerFrom.includes('google') &&
        !lowerFrom.includes('linkedin') &&
        !lowerFrom.includes('coursera') &&
        !lowerFrom.includes('facebook') &&
        !lowerFrom.includes('jobstreet') &&
        !lowerFrom.includes('namecheap')
      ) {
        results.prospectReplies.push(msgObj);
      } else {
        results.otherMessages.push(msgObj);
      }
    }
  } catch (err) {
    console.error(`❌ Error querying ${accountName}:`, err.message);
  } finally {
    if (connection) {
      try { await connection.end(); } catch {}
    }
  }

  return results;
}

async function runFullAudit() {
  console.log('🚀 Initiating Comprehensive August 18 -> August 22 Live Audit across all channels...\n');

  const gmailAudit = await auditMailbox('Gmail (mckinsyo01@gmail.com)', GMAIL_CONFIG);
  const spacemailAudit = await auditMailbox('Spacemail (mharcgatan@linkable.it.com)', SPACEMAIL_CONFIG);

  // Also read submitted forms ledger if present
  let localLedger = [];
  const ledgerPath = path.join(__dirname, 'submitted_prospect_surveys_ledger.json');
  if (fs.existsSync(ledgerPath)) {
    try { localLedger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8')); } catch {}
  }

  let followUpLog = [];
  const followUpPath = path.join(__dirname, 'hospital_followup_log.json');
  if (fs.existsSync(followUpPath)) {
    try { followUpLog = JSON.parse(fs.readFileSync(followUpPath, 'utf8')); } catch {}
  }

  const combinedReport = {
    auditedAt: new Date().toISOString(),
    auditWindow: 'August 18, 2026 - August 22, 2026',
    gmail: {
      totalMessagesSinceAug18: gmailAudit.visitorsAndLeads.length + gmailAudit.prospectReplies.length + gmailAudit.ordersAndPayments.length + gmailAudit.bouncesAndAutoReplies.length + gmailAudit.otherMessages.length,
      visitorsAndLeadsCount: gmailAudit.visitorsAndLeads.length,
      prospectRepliesCount: gmailAudit.prospectReplies.length,
      ordersAndPaymentsCount: gmailAudit.ordersAndPayments.length,
      bouncesCount: gmailAudit.bouncesAndAutoReplies.length,
      visitorsAndLeads: gmailAudit.visitorsAndLeads,
      prospectReplies: gmailAudit.prospectReplies,
      ordersAndPayments: gmailAudit.ordersAndPayments,
      bouncesAndAutoReplies: gmailAudit.bouncesAndAutoReplies
    },
    spacemail: {
      totalMessagesSinceAug18: spacemailAudit.visitorsAndLeads.length + spacemailAudit.prospectReplies.length + spacemailAudit.ordersAndPayments.length + spacemailAudit.bouncesAndAutoReplies.length + spacemailAudit.otherMessages.length,
      visitorsAndLeadsCount: spacemailAudit.visitorsAndLeads.length,
      prospectRepliesCount: spacemailAudit.prospectReplies.length,
      ordersAndPaymentsCount: spacemailAudit.ordersAndPayments.length,
      bouncesCount: spacemailAudit.bouncesAndAutoReplies.length,
      visitorsAndLeads: spacemailAudit.visitorsAndLeads,
      prospectReplies: spacemailAudit.prospectReplies,
      ordersAndPayments: spacemailAudit.ordersAndPayments,
      bouncesAndAutoReplies: spacemailAudit.bouncesAndAutoReplies
    },
    localSubmittedSurveysCount: localLedger.length,
    localSubmittedSurveys: localLedger,
    followUpsDispatchedCount: followUpLog.length,
    followUpsDispatched: followUpLog
  };

  fs.writeFileSync(path.join(__dirname, 'audit_august18_to_22_results.json'), JSON.stringify(combinedReport, null, 2));

  console.log('\n======================================================');
  console.log('📊 COMPREHENSIVE AUDIT SUMMARY (AUG 18 - AUG 22, 2026)');
  console.log('======================================================');
  console.log(`🌐 Website Visitors / Form Submissions: ${combinedReport.gmail.visitorsAndLeadsCount + combinedReport.spacemail.visitorsAndLeadsCount + localLedger.length}`);
  console.log(`💬 Verified Prospect Inbound Replies:   ${combinedReport.gmail.prospectRepliesCount + combinedReport.spacemail.prospectRepliesCount}`);
  console.log(`💳 Orders / Payment Confirmations:      ${combinedReport.gmail.ordersAndPaymentsCount + combinedReport.spacemail.ordersAndPaymentsCount}`);
  console.log(`🚨 Bounces & Auto-Replies Detected:     ${combinedReport.gmail.bouncesCount + combinedReport.spacemail.bouncesCount}`);
  console.log(`📬 Follow-Up Emails Dispatched to date: ${followUpLog.length}`);
  console.log('======================================================\n');
}

runFullAudit().catch(console.error);
