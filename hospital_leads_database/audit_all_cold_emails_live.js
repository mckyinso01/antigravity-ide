const fs = require('fs');
const path = require('path');
const imaps = require('imap-simple');

const ACCOUNTS = [
  {
    name: 'Gmail (mckinsyo01@gmail.com)',
    config: {
      imap: {
        user: 'mckinsyo01@gmail.com',
        password: 'ldiibghudivdkboq',
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 15000
      }
    },
    boxes: ['INBOX', '[Gmail]/Spam']
  },
  {
    name: 'SpaceMail (mharcgatan@linkable.it.com)',
    config: {
      imap: {
        user: 'mharcgatan@linkable.it.com',
        password: 'Melonjuice01!',
        host: 'mail.spacemail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 15000
      }
    },
    boxes: ['INBOX', 'Junk', 'Spam']
  }
];

// Load databases
const hospitalsPath = path.join(__dirname, 'verified_100_us_uk_hospitals.json');
const hospitalDispatchLogPath = path.join(__dirname, 'outreach_dispatch_log.json');
const hospitalFollowUpLogPath = path.join(__dirname, 'hospital_followup_log.json');
const omniLeadsPath = path.join(__dirname, '..', 'omnistock_100_verified_leads.json');
const omniDispatchLogPath = path.join(__dirname, '..', 'omnistock_leads_database', 'omnistock_dispatch_log.json');

const hospitals = fs.existsSync(hospitalsPath) ? JSON.parse(fs.readFileSync(hospitalsPath, 'utf8')) : [];
const hospitalLogs = fs.existsSync(hospitalDispatchLogPath) ? JSON.parse(fs.readFileSync(hospitalDispatchLogPath, 'utf8')) : [];
const followUpLogs = fs.existsSync(hospitalFollowUpLogPath) ? JSON.parse(fs.readFileSync(hospitalFollowUpLogPath, 'utf8')) : [];
const omniLeads = fs.existsSync(omniLeadsPath) ? JSON.parse(fs.readFileSync(omniLeadsPath, 'utf8')) : [];
const omniLogs = fs.existsSync(omniDispatchLogPath) ? JSON.parse(fs.readFileSync(omniDispatchLogPath, 'utf8')) : [];

const prospectDomains = new Set();
const prospectEmails = new Set();
const companyMap = {};

hospitals.forEach(h => {
  const email = (h.sample_email || h.targetEmail || '').toLowerCase().trim();
  const domain = (h.email_domain || h.domain || '').toLowerCase().trim();
  if (email) prospectEmails.add(email);
  if (domain) prospectDomains.add(domain);
  if (domain) companyMap[domain] = h.hospital_name || h.hospitalName;
});

omniLeads.forEach(o => {
  const email = (o.email || '').toLowerCase().trim();
  const domain = (o.domain || (email.includes('@') ? email.split('@')[1] : '')).toLowerCase().trim();
  if (email) prospectEmails.add(email);
  if (domain) prospectDomains.add(domain);
  if (domain) companyMap[domain] = o.company;
});

hospitalLogs.forEach(l => {
  const email = (l.recipient || l.email || '').toLowerCase().trim();
  if (email) {
    prospectEmails.add(email);
    if (email.includes('@')) {
      const dom = email.split('@')[1];
      prospectDomains.add(dom);
      if (l.hospital) companyMap[dom] = l.hospital;
    }
  }
});

omniLogs.forEach(l => {
  const email = (l.email || l.recipient || '').toLowerCase().trim();
  if (email) {
    prospectEmails.add(email);
    if (email.includes('@')) {
      const dom = email.split('@')[1];
      prospectDomains.add(dom);
      if (l.company) companyMap[dom] = l.company;
    }
  }
});

function cleanStr(s) {
  return (s || '').replace(/[\r\n]+/g, ' ').trim();
}

function extractEmail(str) {
  if (!str) return '';
  const match = str.match(/<([^>]+)>/) || str.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return match ? match[1].toLowerCase().trim() : str.toLowerCase().trim();
}

async function auditAccount(acc) {
  console.log(`\n======================================================`);
  console.log(`📬 AUDITING ACCOUNT: ${acc.name}`);
  console.log(`======================================================`);

  let conn;
  try {
    conn = await imaps.connect(acc.config);
  } catch (err) {
    console.error(`❌ Connection failed for ${acc.name}:`, err.message);
    return { account: acc.name, error: err.message, messages: [] };
  }

  const results = [];
  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 14); // 14 days

  for (const box of acc.boxes) {
    try {
      await conn.openBox(box);
      const searchCriteria = [['SINCE', sinceDate]];
      const fetchOptions = { bodies: ['HEADER', 'TEXT'], struct: true, markSeen: false };
      const msgs = await conn.search(searchCriteria, fetchOptions);

      console.log(`Folder [${box}]: Found ${msgs.length} messages in the last 14 days.`);

      for (const m of msgs) {
        const headerPart = m.parts.find(p => p.which === 'HEADER');
        const textPart = m.parts.find(p => p.which === 'TEXT');
        const headers = headerPart?.body || {};
        const fromRaw = headers.from?.[0] || '';
        const toRaw = headers.to?.[0] || '';
        const subject = headers.subject?.[0] || '(No Subject)';
        const date = headers.date?.[0] || '';
        const bodyRaw = textPart?.body || '';
        const senderEmail = extractEmail(fromRaw);
        const senderDomain = senderEmail.includes('@') ? senderEmail.split('@')[1] : '';

        // Classification
        let category = 'GENERAL';
        let matchedCompany = null;

        // Check if bounce
        const isBounce = senderEmail.includes('mailer-daemon') ||
                         senderEmail.includes('postmaster') ||
                         subject.toLowerCase().includes('undelivered') ||
                         subject.toLowerCase().includes('failure') ||
                         subject.toLowerCase().includes('undeliverable') ||
                         bodyRaw.toLowerCase().includes('550 ') ||
                         bodyRaw.toLowerCase().includes('recipient not found');

        // Check if summary report
        const isSummary = subject.includes('[Outreach Summary]') || 
                          subject.includes('[OmniStock Summary]') ||
                          subject.includes('[Hourly Report]') ||
                          subject.includes('[HIGH-INTENT PROSPECT REPLY]');

        // Check if outreach prospect match
        let isProspect = prospectEmails.has(senderEmail) || prospectDomains.has(senderDomain);
        if (!isProspect) {
          for (const d of prospectDomains) {
            if (senderDomain.includes(d) || bodyRaw.toLowerCase().includes(d)) {
              isProspect = true;
              matchedCompany = companyMap[d];
              break;
            }
          }
        } else {
          matchedCompany = companyMap[senderDomain] || companyMap[senderEmail];
        }

        // Check if subject relates to our campaigns
        const subLower = subject.toLowerCase();
        const isColdCampaignThread = subLower.includes('clinical pristine') ||
                                     subLower.includes('spatial bed') ||
                                     subLower.includes('omnistock') ||
                                     subLower.includes('eulerian') ||
                                     subLower.includes('wave picking') ||
                                     subLower.includes('ed boarding') ||
                                     subLower.includes('bed turnaround') ||
                                     subLower.includes('linkableai') ||
                                     subLower.includes('custom modules or workflow modifications');

        if (isSummary) {
          category = 'SYSTEM_SUMMARY';
        } else if (isBounce) {
          category = 'BOUNCE_NOTIFICATION';
        } else if (isProspect || isColdCampaignThread) {
          category = 'PROSPECT_COMMUNICATION';
        }

        results.push({
          box,
          from: fromRaw,
          senderEmail,
          senderDomain,
          to: toRaw,
          subject,
          date,
          category,
          isBounce,
          isProspect,
          isColdCampaignThread,
          matchedCompany,
          snippet: cleanStr(bodyRaw).substring(0, 300),
          fullBody: bodyRaw
        });
      }
    } catch (boxErr) {
      console.log(`Note for folder ${box}:`, boxErr.message);
    }
  }

  conn.end();
  return { account: acc.name, messages: results };
}

async function main() {
  const allResults = [];
  for (const acc of ACCOUNTS) {
    const res = await auditAccount(acc);
    allResults.push(res);
  }

  const outputPath = path.join(__dirname, 'full_cold_email_audit_report.json');
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`📊 LIVE EMAIL AUDIT COMPLETE`);
  console.log(`======================================================`);

  // Summarize
  allResults.forEach(acc => {
    console.log(`\nAccount: ${acc.account}`);
    if (acc.error) {
      console.log(`  ❌ Error: ${acc.error}`);
      return;
    }
    const msgs = acc.messages;
    const prospectMsgs = msgs.filter(m => m.category === 'PROSPECT_COMMUNICATION');
    const bounces = msgs.filter(m => m.category === 'BOUNCE_NOTIFICATION');
    const summaries = msgs.filter(m => m.category === 'SYSTEM_SUMMARY');

    console.log(`  Total Messages (14d): ${msgs.length}`);
    console.log(`  🔥 Prospect Communications / Replies: ${prospectMsgs.length}`);
    console.log(`  🛡️ Bounces / Delivery Failures: ${bounces.length}`);
    console.log(`  📊 System Summaries / Outreach Reports: ${summaries.length}`);

    if (prospectMsgs.length > 0) {
      console.log(`\n  --- 🎯 DETECTED PROSPECT COMMUNICATIONS ---`);
      prospectMsgs.forEach((p, idx) => {
        console.log(`  [${idx + 1}] Date: ${p.date}`);
        console.log(`      From: ${p.from}`);
        console.log(`      Subject: ${p.subject}`);
        console.log(`      Company: ${p.matchedCompany || 'Identified Prospect'}`);
        console.log(`      Snippet: ${p.snippet.substring(0, 200)}...`);
      });
    }

    if (bounces.length > 0) {
      console.log(`\n  --- ⚠️ DETECTED BOUNCES / POSTMASTER NOTICES ---`);
      bounces.slice(0, 10).forEach((b, idx) => {
        console.log(`  [${idx + 1}] Date: ${b.date} | Subject: ${b.subject} | From: ${b.senderEmail}`);
      });
    }
  });
}

main().catch(console.error);
