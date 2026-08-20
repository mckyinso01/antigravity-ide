// 🤖 LINKABLEAI SURGICAL INBOUND PROSPECT REPLY PARSER & ALERT DAEMON
// High-precision parser that ONLY triggers on authentic prospect replies, extracts their feedback/modifications,
// and delivers a comprehensive Executive Lead Dossier to the founder.

const fs = require('fs');
const path = require('path');
const imaps = require('imap-simple');
const nodemailer = require('nodemailer');

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

const { processInboundAndGenerateSalesReply } = require('./autonomousSalesVaAgent');

const CONFIG = {
  imapConfig: {
    imap: {
      user: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
      password: process.env.SPACEMAIL_PASS || 'Melonjuice01!',
      host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
      port: parseInt(process.env.SPACEMAIL_IMAP_PORT || '993', 10),
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 15000
    }
  },
  smtp: {
    host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
    port: parseInt(process.env.SPACEMAIL_SMTP_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
      pass: process.env.SPACEMAIL_PASS || 'Melonjuice01!'
    }
  },
  founderEmail: 'mckinsyo01@gmail.com',
  officialEmail: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
  pollIntervalMinutes: 10
};

const DISPATCH_LOG_PATH = path.join(__dirname, 'outreach_dispatch_log.json');
const FOLLOWUP_LOG_PATH = path.join(__dirname, 'hospital_followup_log.json');
const HOSPITALS_METADATA_PATH = path.join(__dirname, 'verified_100_us_uk_hospitals.json');
const OMNISTOCK_LEADS_PATH = path.join(__dirname, '..', 'omnistock_100_verified_leads.json');
const PROCESSED_REPLIES_PATH = path.join(__dirname, 'inbound_replies_processed.json');

const transporter = nodemailer.createTransport(CONFIG.smtp);

function loadJson(filePath, defaultValue = []) {
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function extractEmail(str) {
  if (!str) return '';
  const match = str.match(/<([^>]+)>/) || str.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return match ? match[1].toLowerCase().trim() : str.toLowerCase().trim();
}

function buildProspectWhitelist() {
  const dispatchLog = loadJson(DISPATCH_LOG_PATH, []);
  const followUpLog = loadJson(FOLLOWUP_LOG_PATH, []);
  const hospitals = loadJson(HOSPITALS_METADATA_PATH, []);
  const omnistock = loadJson(OMNISTOCK_LEADS_PATH, []);

  const emails = new Set();
  const domains = new Set();

  dispatchLog.forEach(l => {
    const e = extractEmail(l.recipient || l.email);
    if (e) {
      emails.add(e);
      if (e.includes('@')) domains.add(e.split('@')[1]);
    }
  });

  followUpLog.forEach(l => {
    const e = extractEmail(l.recipient || l.email);
    if (e) {
      emails.add(e);
      if (e.includes('@')) domains.add(e.split('@')[1]);
    }
  });

  hospitals.forEach(h => {
    if (h.targetEmail) {
      const e = extractEmail(h.targetEmail);
      emails.add(e);
      if (e.includes('@')) domains.add(e.split('@')[1]);
    }
    if (h.domain) domains.add(h.domain.toLowerCase().trim());
  });

  omnistock.forEach(o => {
    if (o.email) {
      const e = extractEmail(o.email);
      emails.add(e);
      if (e.includes('@')) domains.add(e.split('@')[1]);
    }
    if (o.domain) domains.add(o.domain.toLowerCase().trim());
  });

  return { emails, domains };
}

const GLOBAL_EXCLUSION_DOMAINS = new Set([
  'linkedin.com', 'facebookmail.com', 'coursera.org', 'jobstreet.com', 'flexjobs.com',
  'grabpoints.com', 'dubaidutyfree.com', 'mobbin.com', 'google.com', 'googlemail.com',
  'bir.gov.ph', 'e.gov.ph', 'namecheap.com', 'mypaymentvault.com', 'grammarly.com',
  'yotspot.com', 'zendesk.com', 'formsubmit.co', 'stripe.com', 'netflix.com',
  'spotify.com', 'apollo.io', 'supabase.com', 'indeed.com', 'crunchyroll.com'
]);

function isExcludedDomain(senderEmail) {
  const email = extractEmail(senderEmail);
  const domain = email.split('@')[1] || '';
  for (const excl of GLOBAL_EXCLUSION_DOMAINS) {
    if (domain.includes(excl)) return true;
  }
  return false;
}

function analyzeProspectIntent(bodyText, subject) {
  const text = (bodyText + ' ' + subject).toLowerCase();
  const categories = [];
  const keyHighlights = [];

  // 1. Design & UI/UX Modifications
  if (text.match(/design|layout|interface|look|appearance|color|theme|screen|hud|view|cluttered|simplified|dashboard/i)) {
    categories.push('🎨 UI/UX & Design Modification Request');
    keyHighlights.push('Prospect requested visual or layout adjustments to the interface.');
  }

  // 2. Feature & Module Additions
  if (text.match(/feature|module|add|include|capability|alert|alarm|barcode|scanner|medication|pharmacy|nursing|protocol|telemetry|sepsis/i)) {
    categories.push('➕ Custom Feature / Module Addition');
    keyHighlights.push('Prospect identified specific clinical tools, alerts, or modules they want built in.');
  }

  // 3. System Integration / EHR Connectivity
  if (text.match(/epic|cerner|meditech|allscripts|ehr|emr|fhir|hl7|integration|connector|sync|database|sap/i)) {
    categories.push('🔁 EHR / Legacy System Integration');
    keyHighlights.push('Prospect requested connectivity with hospital EHR/EMR platforms (Epic, Cerner, Meditech).');
  }

  // 4. Pricing, Licensing & Pilot Buyout
  if (text.match(/price|cost|pricing|quote|license|buyout|budget|procurement|contract|terms|proposal/i)) {
    categories.push('💰 Commercial / Pricing / Licensing Inquiry');
    keyHighlights.push('Prospect is asking about procurement, one-time buyout terms, or pilot pricing.');
  }

  // 5. Demo & Meeting Requests
  if (text.match(/demo|call|meeting|schedule|discuss|zoom|teams|available|calendar|time|speak|presentation/i)) {
    categories.push('📅 Demo & Technical Walkthrough Request');
    keyHighlights.push('Prospect wants to schedule a direct call or live engineering demonstration.');
  }

  if (categories.length === 0) {
    categories.push('💬 General Feedback / Executive Comment');
    keyHighlights.push('Prospect shared feedback or commentary regarding the platform architecture.');
  }

  return {
    primaryCategory: categories[0],
    allCategories: categories,
    summaryBulletPoints: keyHighlights
  };
}

function matchLeadMetadata(senderEmail) {
  const email = extractEmail(senderEmail);
  const domain = email.split('@')[1] || '';

  const dispatchLog = loadJson(DISPATCH_LOG_PATH, []);
  const followUpLog = loadJson(FOLLOWUP_LOG_PATH, []);
  const hospitals = loadJson(HOSPITALS_METADATA_PATH, []);
  const omnistock = loadJson(OMNISTOCK_LEADS_PATH, []);

  let match = dispatchLog.find(l => extractEmail(l.recipient || l.email) === email);
  let followUpMatch = followUpLog.find(l => extractEmail(l.recipient || l.email) === email);
  let hospitalMeta = hospitals.find(h => (h.domain || '').includes(domain) || (h.targetEmail && extractEmail(h.targetEmail) === email));
  let omniMeta = omnistock.find(o => (o.domain || '').includes(domain) || (o.email && extractEmail(o.email) === email));

  return {
    hospitalName: match?.hospital || hospitalMeta?.hospitalName || omniMeta?.company || 'Enterprise Prospect Organization',
    recipientEmail: email,
    executiveTitle: hospitalMeta?.targetExecutive || omniMeta?.channel || 'Chief Information Officer / Operations Director',
    stateOrLocation: hospitalMeta?.state || hospitalMeta?.location || omniMeta?.sector || 'Enterprise Client',
    originalSentDate: match?.timestamp || 'Previously Contacted',
    followUpDate: followUpMatch?.followUpSentAt || 'N/A'
  };
}

async function sendExecutiveAlert(emailData, intentAnalysis, leadMeta) {
  const subject = `🚨 [HIGH-INTENT PROSPECT REPLY] ${leadMeta.hospitalName} • ${intentAnalysis.primaryCategory}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #0f172a; background-color: #f1f5f9; margin: 0; padding: 20px; }
    .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08); overflow: hidden; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; padding: 24px 28px; }
    .badge { display: inline-block; background: #ef4444; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
    .header p { margin: 4px 0 0 0; font-size: 13px; color: #93c5fd; }
    .content { padding: 28px; }
    .section-title { font-size: 14px; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .meta-item { font-size: 12px; }
    .meta-label { color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 10px; }
    .meta-value { color: #0f172a; font-weight: 700; margin-top: 2px; }
    .intent-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; margin-bottom: 24px; }
    .intent-title { font-size: 15px; font-weight: 700; color: #1e3a8a; margin-bottom: 6px; }
    .intent-bullet { font-size: 13px; color: #334155; margin-bottom: 4px; }
    .raw-message-box { background: #0f172a; color: #e2e8f0; padding: 18px; border-radius: 8px; font-family: monospace; font-size: 12px; line-height: 1.5; white-space: pre-wrap; margin-bottom: 24px; max-height: 300px; overflow-y: auto; }
    .action-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px; margin-bottom: 20px; }
    .action-title { font-size: 13px; font-weight: 700; color: #166534; margin-bottom: 8px; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff !important; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 6px; text-decoration: none; }
    .footer { background: #f8fafc; padding: 14px 28px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">🔥 High-Priority Inbound Lead Reply</div>
      <h1>${leadMeta.hospitalName}</h1>
      <p>Received on ${emailData.date} from ${emailData.from}</p>
    </div>

    <div class="content">
      <div class="section-title">🏥 Organization &amp; Executive Dossier</div>
      <div class="meta-grid">
        <div class="meta-item">
          <div class="meta-label">Organization / Hospital</div>
          <div class="meta-value">${leadMeta.hospitalName}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Target Title / Contact</div>
          <div class="meta-value">${leadMeta.executiveTitle}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Sender Email</div>
          <div class="meta-value">${leadMeta.recipientEmail}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Location / Sector</div>
          <div class="meta-value">${leadMeta.stateOrLocation}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Initial Contact Sent</div>
          <div class="meta-value">${leadMeta.originalSentDate}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Follow-Up Sent</div>
          <div class="meta-value">${leadMeta.followUpDate}</div>
        </div>
      </div>

      <div class="section-title">🎯 Parsed Prospect Intent &amp; Requested Changes</div>
      <div class="intent-box">
        <div class="intent-title">${intentAnalysis.primaryCategory}</div>
        ${intentAnalysis.summaryBulletPoints.map(b => `<div class="intent-bullet">• ${b}</div>`).join('')}
      </div>

      <div class="section-title">💬 Verbatim Message From Prospect</div>
      <div class="raw-message-box">${emailData.bodyText}</div>

      <div class="action-box">
        <div class="action-title">⚡ Recommended Founder Action:</div>
        <p style="margin: 0 0 12px 0; font-size: 12px; color: #166534;">
          Reply directly to <strong>${leadMeta.recipientEmail}</strong> confirming their request. Emphasize our rapid 48-hour turn-around for custom architecture modifications.
        </p>
        <a href="mailto:${leadMeta.recipientEmail}?subject=Re: ${encodeURIComponent(emailData.subject)}" class="btn">Reply Directly via Email &rarr;</a>
      </div>
    </div>

    <div class="footer">
      LinkableAI Autonomous Inbound Parser Daemon • Monitored via Google Cloud / IMAP Rails
    </div>
  </div>
</body>
</html>
  `;

  const info = await transporter.sendMail({
    from: '"LinkableAI Executive Alert" <mckinsyo01@gmail.com>',
    to: CONFIG.founderEmail,
    subject: subject,
    html: html
  });

  console.log(`   🚨 Executive Alert Email Dispatched to Founder! Message ID: ${info.messageId}`);
}

async function auditAndParseInboundReplies() {
  console.log(`\n======================================================`);
  console.log(`📥 SURGICAL PROSPECT REPLY PARSER DAEMON`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  console.log(`======================================================`);

  const whitelist = buildProspectWhitelist();
  console.log(`🎯 Whitelist Loaded: ${whitelist.emails.size} target emails | ${whitelist.domains.size} enterprise domains.`);

  const processedReplies = loadJson(PROCESSED_REPLIES_PATH, []);
  const processedSet = new Set(processedReplies.map(p => p.messageId || p.uid));

  let connection;
  try {
    connection = await imaps.connect(CONFIG.imapConfig);
    await connection.openBox('INBOX');

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - 7);

    const searchCriteria = [['SINCE', sinceDate]];
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`📬 Retrieved ${messages.length} messages from Gmail inbox.`);

    let newProspectRepliesCount = 0;

    for (const msg of messages) {
      const headerPart = msg.parts.find(p => p.which === 'HEADER');
      const textPart = msg.parts.find(p => p.which === 'TEXT');

      const subject = headerPart?.body?.subject?.[0] || '';
      const from = headerPart?.body?.from?.[0] || '';
      const date = headerPart?.body?.date?.[0] || '';
      const messageId = headerPart?.body?.['message-id']?.[0] || `UID_${msg.attributes.uid}`;
      const rawText = textPart?.body || '';

      if (processedSet.has(messageId)) continue;

      // 1. Filter out obvious system domains
      if (isExcludedDomain(from)) {
        processedReplies.push({ messageId, from, subject, date, type: 'IGNORED_EXCLUSION' });
        processedSet.add(messageId);
        continue;
      }

      const senderEmail = extractEmail(from);
      const senderDomain = senderEmail.split('@')[1] || '';
      const subjectLower = subject.toLowerCase();

      // 2. Strict Matching: Must match a whitelisted prospect email/domain OR be a direct product thread reply
      const isKnownProspect = whitelist.emails.has(senderEmail) || whitelist.domains.has(senderDomain);
      const isProductThreadReply = 
        subjectLower.startsWith('re:') && 
        (subjectLower.includes('clinical pristine') || subjectLower.includes('omnistock') || subjectLower.includes('sitesafe') || subjectLower.includes('spatial bed') || subjectLower.includes('linkableai') || subjectLower.includes('workflow modifications'));

      if (isKnownProspect || isProductThreadReply) {
        console.log(`\n🔥 AUTHENTIC PROSPECT REPLY DETECTED!`);
        console.log(`   From: ${from}`);
        console.log(`   Subject: ${subject}`);

        const cleanText = rawText.replace(/<[^>]*>?/gm, ' ').replace(/=\r?\n/g, '').replace(/\s+/g, ' ').trim();
        const leadMeta = matchLeadMetadata(from);

        console.log(`🤖 Triggering Alexis Vance AI Sales Specialist for prospect reply from: ${from}`);
        const salesResult = await processInboundAndGenerateSalesReply({
          from,
          senderName: leadMeta.executiveTitle,
          organization: leadMeta.hospitalName,
          vertical: 'clinical',
          subject,
          body: cleanText.substring(0, 1500),
          messageId
        });

        processedReplies.push({
          messageId,
          from,
          subject,
          date,
          hospital: leadMeta.hospitalName,
          category: salesResult?.intent || 'PROSPECT_INQUIRY',
          processedAt: new Date().toISOString(),
          type: 'VERIFIED_PROSPECT_REPLY',
          salesResult
        });
        processedSet.add(messageId);
        newProspectRepliesCount++;
      } else {
        // Mark irrelevant personal/unrelated email as processed without alerting
        processedReplies.push({ messageId, from, subject, date, type: 'IGNORED_NON_PROSPECT' });
        processedSet.add(messageId);
      }
    }

    saveJson(PROCESSED_REPLIES_PATH, processedReplies);
    console.log(`\n🎉 Parser Cycle Complete. Verified ${newProspectRepliesCount} authentic prospect replies.`);
  } catch (err) {
    console.error(`❌ Inbound Parser Error:`, err);
  } finally {
    if (connection) {
      try { connection.end(); } catch {}
    }
  }
}

async function startDaemon() {
  console.log(`🤖 Starting LinkableAI Surgical Inbound Reply Parser Daemon (Interval: ${CONFIG.pollIntervalMinutes}m)...`);
  await auditAndParseInboundReplies();

  setInterval(async () => {
    try {
      await auditAndParseInboundReplies();
    } catch (err) {
      console.error('Daemon Cycle Error:', err.message);
    }
  }, CONFIG.pollIntervalMinutes * 60 * 1000);
}

if (require.main === module) {
  const isCron = process.argv.includes('--cron');
  if (isCron) {
    startDaemon();
  } else {
    auditAndParseInboundReplies()
      .then(() => {
        console.log('Single pass completed.');
        process.exit(0);
      })
      .catch(err => {
        console.error('Fatal parser error:', err);
        process.exit(1);
      });
  }
}

module.exports = { auditAndParseInboundReplies, startDaemon };
