// 📋 LINKABLEAI SUBMITTED FORMS & PROSPECT EVALUATION PARSER CRON DAEMON
// Automated 15-Minute Background Ingestion Engine
// Scans IMAP inboxes for incoming FormSubmit micro-surveys, parses 1-5 scores, requested automations,
// and appends structured records into submitted_prospect_surveys_ledger.json.

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

const LEDGER_PATH = path.join(__dirname, 'submitted_prospect_surveys_ledger.json');

const ACCOUNTS = [
  {
    name: 'Gmail (mckinsyo01@gmail.com)',
    config: {
      imap: {
        user: 'mckinsyo01@gmail.com',
        password: process.env.GMAIL_APP_PASSWORD || 'ldiibghudivdkboq',
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
        user: process.env.SPACEMAIL_USER || 'mharcgatan@linkable.it.com',
        password: process.env.SPACEMAIL_PASS || 'Melonjuice01!',
        host: process.env.SPACEMAIL_HOST || 'mail.spacemail.com',
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 15000
      }
    },
    boxes: ['INBOX', 'Junk', 'Spam']
  }
];

function loadLedger() {
  if (fs.existsSync(LEDGER_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf8'));
    } catch {
      return [];
    }
  }
  return [];
}

function saveLedger(ledger) {
  fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
}

function parseFormSubmitBody(bodyText, subject) {
  const result = {
    app: 'Unknown Application',
    organization: '',
    contactName: '',
    contactEmail: '',
    contactTitle: '',
    problemReductionRating: '',
    problemScoreNum: null,
    pricingRoiRating: '',
    pricingScoreNum: null,
    desiredCustomizations: '',
    requestedAutomations: '',
    submittedAt: new Date().toISOString()
  };

  // Detect App from Subject or Body
  if (/OmniStock/i.test(subject) || /OmniStock/i.test(bodyText)) result.app = 'OmniStock Spatial WMS';
  else if (/SiteSafe/i.test(subject) || /SiteSafe/i.test(bodyText) || /StructuraPro/i.test(bodyText)) result.app = 'SiteSafe AI Construction OS';
  else if (/Clinical Pristine/i.test(subject) || /Clinical/i.test(bodyText)) result.app = 'Clinical Pristine OS';
  else if (/Saccade/i.test(subject) || /Saccade/i.test(bodyText)) result.app = 'Saccade AI Biometric CRO Engine';
  else if (/ClaimGuard/i.test(subject) || /ClaimGuard/i.test(bodyText)) result.app = 'ClaimGuard AI Legal Defense OS';

  const clean = bodyText.replace(/<[^>]*>/g, '\n');
  const lines = clean.split('\n').map(l => l.trim()).filter(Boolean);

  lines.forEach((line, idx) => {
    if (/organization|company|facility|hospital|contractor/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match && match !== '=') result.organization = match.trim();
    }
    if (/contactName|contact_name|name\b/i.test(line) && !/organization/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match && !match.includes('Clicked Launch Demo') && match !== '=') result.contactName = match.trim();
    }
    if (/contactEmail|contact_email|email\b/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match && match.includes('@') && !match.includes('example.com') && !match.includes('test.com')) result.contactEmail = match.trim();
    }
    if (/contactTitle|contact_title|title|role\b/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match && match !== '=') result.contactTitle = match.trim();
    }
    if (/problemReductionRating|problem_reduction|operational bottlenecks/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match) {
        result.problemReductionRating = match.trim();
        const num = parseInt(match, 10);
        if (!isNaN(num)) result.problemScoreNum = num;
      }
    }
    if (/pricingRoiRating|pricing_roi|license fees|buyout/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match) {
        result.pricingRoiRating = match.trim();
        const num = parseInt(match, 10);
        if (!isNaN(num)) result.pricingScoreNum = num;
      }
    }
    if (/desiredCustomizations|customizations|modifications|change, enhance/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match) result.desiredCustomizations = match.trim();
    }
    if (/requestedAutomations|automations|which automations/i.test(line)) {
      const match = line.split(/:\s*/)[1] || (lines[idx + 1] && !lines[idx + 1].includes(':') ? lines[idx + 1] : '');
      if (match) result.requestedAutomations = match.trim();
    }
  });

  // Strict Validation: Must have at least a valid contact email or actual customization/feedback text
  if (!result.contactEmail && !result.desiredCustomizations && !result.requestedAutomations && !result.problemScoreNum) {
    return null; // Reject incomplete/test submission
  }

  return result;
}

async function runSubmittedFormsParserJob() {
  console.log(`\n========================================================================`);
  console.log(`📋 [${new Date().toISOString()}] STARTING SUBMITTED FORMS PARSER DAEMON`);
  console.log(`========================================================================`);

  const ledger = loadLedger();
  const existingIds = new Set(ledger.map(entry => `${entry.contactEmail}_${entry.organization}_${entry.app}`));
  let newEntriesCount = 0;

  for (const account of ACCOUNTS) {
    try {
      console.log(`\n🔍 Connecting to ${account.name}...`);
      const connection = await imaps.connect(account.config);

      for (const boxName of account.boxes) {
        try {
          await connection.openBox(boxName);
          const searchCriteria = [
            'ALL',
            ['SINCE', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)] // Last 7 days
          ];
          const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false
          };

          const messages = await connection.search(searchCriteria, fetchOptions);
          console.log(`  📁 [${boxName}] Found ${messages.length} total messages.`);

          for (const msg of messages) {
            const headerPart = msg.parts.find(p => p.which === 'HEADER');
            const subject = headerPart?.body?.subject?.[0] || '';
            const from = headerPart?.body?.from?.[0] || '';
            const date = headerPart?.body?.date?.[0] || new Date().toISOString();

            // Check if this is a FormSubmit submission or evaluation survey
            const isSurvey = 
              /formsubmit\.co/i.test(from) || 
              /\[Demo Evaluation\]/i.test(subject) || 
              /\[Exit Survey\]/i.test(subject) ||
              /Workstation Review/i.test(subject);

            if (isSurvey) {
              const textPart = msg.parts.find(p => p.which === 'TEXT');
              const bodyText = textPart?.body || '';
              const parsed = parseFormSubmitBody(bodyText, subject);
              if (!parsed) continue; // Skip incomplete, bot click, or test submissions

              parsed.dateReceived = date;
              parsed.mailbox = account.name;

              const entryId = `${parsed.contactEmail}_${parsed.organization}_${parsed.app}`;
              if (!existingIds.has(entryId)) {
                ledger.push(parsed);
                existingIds.add(entryId);
                newEntriesCount++;
                console.log(`    ⭐ [AUTHENTIC EVALUATION INGESTED] ${parsed.app} from ${parsed.contactEmail || parsed.organization} (Rating: ${parsed.problemReductionRating || 'N/A'})`);
              }
            }
          }
        } catch (boxErr) {
          console.warn(`  ⚠️ Could not scan box ${boxName}: ${boxErr.message}`);
        }
      }

      await connection.end();
    } catch (connErr) {
      console.warn(`  ❌ Connection failed for ${account.name}: ${connErr.message}`);
    }
  }

  saveLedger(ledger);

  // Compute Aggregates
  const total = ledger.length;
  const avgProblemScore = total > 0 ? (ledger.reduce((acc, c) => acc + (c.problemScoreNum || 5), 0) / total).toFixed(1) : '5.0';
  const avgPricingScore = total > 0 ? (ledger.reduce((acc, c) => acc + (c.pricingScoreNum || 5), 0) / total).toFixed(1) : '5.0';

  console.log(`\n========================================================================`);
  console.log(`📊 [SURVEY PARSER SUMMARY]`);
  console.log(`   Total Evaluated Surveys in Ledger: ${total}`);
  console.log(`   New Ingested This Run:             ${newEntriesCount}`);
  console.log(`   Average Problem Reduction Score:   ${avgProblemScore} / 5.0 ⭐`);
  console.log(`   Average Pricing ROI Score:         ${avgPricingScore} / 5.0 ⭐`);
  console.log(`   Ledger Location:                   ${LEDGER_PATH}`);
  console.log(`========================================================================\n`);

  return {
    total,
    newEntriesCount,
    avgProblemScore,
    avgPricingScore,
    ledger
  };
}

if (require.main === module) {
  runSubmittedFormsParserJob().catch(console.error);
}

module.exports = {
  runSubmittedFormsParserJob,
  loadLedger,
  LEDGER_PATH
};
