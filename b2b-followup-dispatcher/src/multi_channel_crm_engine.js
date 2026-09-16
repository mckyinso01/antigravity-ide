// ============================================================
// MASTER MULTI-CHANNEL CRM ENGINE (FB + LinkedIn + Email + Escrow)
// Fully Autonomous, Zero-Token Dependency B2B Growth Engine
// Orchestrates: Scrape -> Social Enrich -> Pre-Flight Verify -> Pitch -> Close
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import { APP_TARGET_DEFINITIONS, getEnrichedLeadsForApp } from './app_lead_scrapers.js';
import { verifyEmailPreFlight } from './email_verifier.js';
import { TEMPLATES, getLinkedInPitch, getFacebookMessengerPitch } from './templates.js';
import { scanInboundRepliesAndCloseDeals, createEscrowAgreement } from './autonomous_deal_closer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const CRM_DATABASE_FILE = path.join(__dirname, '../MASTER_MULTI_CHANNEL_CRM_LEADS.json');
const SOCIAL_QUEUE_FILE = path.join(__dirname, '../LINKEDIN_BOUNCE_RECOVERY_QUEUE.json');
const DISPATCH_LOG_FILE = path.join(__dirname, 'dispatch_log.json');

/**
 * Loads the existing CRM Database or initializes an empty one
 */
export function loadCrmDatabase() {
  if (fs.existsSync(CRM_DATABASE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CRM_DATABASE_FILE, 'utf8'));
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * Saves the CRM Database to disk atomically to prevent file corruption
 */
export function saveCrmDatabase(leads) {
  const tmpPath = `${CRM_DATABASE_FILE}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(leads, null, 2), 'utf8');
  fs.renameSync(tmpPath, CRM_DATABASE_FILE);
}

/**
 * Configures Nodemailer Transporter using existing SMTP credentials
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

/**
 * Runs the Complete Pipeline for a single app or all apps
 * @param {object} options
 * @param {string} [options.appKey] e.g. 'pharmaguard', 'apex', or 'all'
 * @param {boolean} [options.liveSend] If true, sends live emails via SMTP
 * @param {number} [options.limit] Max leads per app to process
 */
export async function runCrmPipeline(options = {}) {
  const { appKey = 'all', liveSend = false, limit = 10 } = options;

  console.log('='.repeat(75));
  console.log(`🚀 MASTER MULTI-CHANNEL CRM ENGINE ACTIVATED`);
  console.log(`Mode: ${liveSend ? '🔥 LIVE OUTREACH' : '🛡️ DRY RUN (Simulation & Social Queueing)'}`);
  console.log(`Target: ${appKey.toUpperCase()} | Limit: ${limit} per app`);
  console.log('='.repeat(75));

  const targetApps = appKey.toLowerCase() === 'all'
    ? Object.keys(APP_TARGET_DEFINITIONS)
    : [appKey.toLowerCase()];

  let masterDb = loadCrmDatabase();
  let socialQueue = [];
  if (fs.existsSync(SOCIAL_QUEUE_FILE)) {
    try { socialQueue = JSON.parse(fs.readFileSync(SOCIAL_QUEUE_FILE, 'utf8')); } catch { socialQueue = []; }
  }

  let totalScraped = 0;
  let totalEmailVerified = 0;
  let totalSocialQueued = 0;
  let totalDispatched = 0;

  let transporter = null;
  if (liveSend) {
    try {
      transporter = createTransporter();
      await transporter.verify();
      console.log('✅ SMTP Transporter verified and connected.');
    } catch (e) {
      console.error('❌ SMTP Connection Failed:', e.message);
      console.log('⚠️ Falling back to DRY-RUN mode for safety.');
    }
  }

  for (const currentApp of targetApps) {
    console.log(`\n📦 Processing Portfolio App: [${currentApp.toUpperCase()}]`);
    const leads = await getEnrichedLeadsForApp(currentApp, limit);

    for (const lead of leads) {
      totalScraped++;
      console.log(`\n🏢 Lead: ${lead.companyName} (${lead.domain})`);

      // 1. Pre-Flight Email Verification
      let emailVerification = { isValid: false, score: 0, route: 'ROUTE_TO_SOCIAL_OUTREACH', reason: 'NO_EMAIL' };
      if (lead.contactEmail) {
        emailVerification = await verifyEmailPreFlight(lead.contactEmail);
      }

      console.log(`   📧 Email: ${lead.contactEmail || 'N/A'} -> Score: ${emailVerification.score}/100 [${emailVerification.route}]`);

      // 2. Customized Pitch Generation per App
      const templateGroup = TEMPLATES[currentApp] || TEMPLATES['linkable'];
      const wave1 = templateGroup[1];
      const emailSubject = wave1.subject(lead.companyName);
      const emailBody = wave1.body({
        ...lead,
        contactName: lead.executiveName,
        company: lead.companyName
      });

      // 3. Social Pitches (LinkedIn & FB Messenger)
      const linkedinPitch = getLinkedInPitch(currentApp, lead);
      const facebookPitch = getFacebookMessengerPitch(currentApp, lead);

      const processedLead = {
        ...lead,
        emailScore: emailVerification.score,
        emailRoute: emailVerification.route,
        emailVerificationReason: emailVerification.reason,
        customEmailSubject: emailSubject,
        customEmailBody: emailBody,
        linkedinInMailPitch: linkedinPitch,
        facebookMessengerPitch: facebookPitch,
        lastProcessedAt: new Date().toISOString()
      };

      // 4. Smart Multi-Channel Dispatch Decision
      if (emailVerification.route === 'DIRECT_EMAIL' && emailVerification.isValid) {
        totalEmailVerified++;
        if (liveSend && transporter) {
          try {
            console.log(`   ✉️ Dispatching live email to ${lead.contactEmail}...`);
            await transporter.sendMail({
              from: `"${process.env.SENDER_NAME || 'Mharc Gatan'}" <${process.env.SMTP_USER}>`,
              replyTo: process.env.SENDER_EMAIL || 'mharcgatan@linkable.it.com',
              to: lead.contactEmail,
              subject: emailSubject,
              text: emailBody
            });
            processedLead.outreachStatus = 'EMAIL_DISPATCHED';
            totalDispatched++;
            console.log(`   ✅ Email successfully sent to ${lead.contactEmail}`);
          } catch (sendErr) {
            console.error(`   ❌ Failed to send email: ${sendErr.message}`);
            processedLead.outreachStatus = 'EMAIL_BOUNCED_QUEUED_FOR_SOCIAL';
            processedLead.emailRoute = 'ROUTE_TO_SOCIAL_OUTREACH';
          }
        } else {
          processedLead.outreachStatus = 'DRY_RUN_EMAIL_READY';
        }
      }

      // If email failed, is risky, or bounced -> Shift to Social Queue (LinkedIn & Facebook)
      if (processedLead.emailRoute === 'ROUTE_TO_SOCIAL_OUTREACH' || processedLead.outreachStatus === 'EMAIL_BOUNCED_QUEUED_FOR_SOCIAL') {
        totalSocialQueued++;
        processedLead.outreachStatus = 'QUEUED_FOR_1CLICK_SOCIAL_DISPATCH';
        console.log(`   📲 [SOCIAL RECOVERY QUEUE] Queued for direct LinkedIn / FB outreach.`);
        console.log(`      🔗 LinkedIn Search: ${lead.socialSearchDossier.linkedinSearchUrl}`);
        if (lead.messengerUrl) {
          console.log(`      💬 FB Messenger: ${lead.messengerUrl}`);
        }

        // Add to persistent social recovery queue
        if (!socialQueue.some(q => q.companyName === lead.companyName)) {
          socialQueue.push({
            companyName: lead.companyName,
            domain: lead.domain,
            appKey: currentApp,
            executiveName: lead.executiveName,
            executiveRole: lead.executiveRole,
            linkedinSearchUrl: lead.socialSearchDossier.linkedinSearchUrl,
            facebookMessengerUrl: lead.messengerUrl,
            phone: lead.publicPhone,
            linkedinPitch,
            facebookPitch,
            queuedAt: new Date().toISOString()
          });
        }
      }

      // Upsert into master DB
      const existingIdx = masterDb.findIndex(m => m.companyName.toLowerCase() === lead.companyName.toLowerCase());
      if (existingIdx >= 0) {
        masterDb[existingIdx] = { ...masterDb[existingIdx], ...processedLead };
      } else {
        masterDb.push(processedLead);
      }
    }
  }

  // Save updated databases
  saveCrmDatabase(masterDb);
  fs.writeFileSync(SOCIAL_QUEUE_FILE, JSON.stringify(socialQueue, null, 2), 'utf8');

  // 5. Inbound IMAP Reply & Deal Closing Check
  console.log('\n📬 Checking for Inbound Client Replies and Escrow Closing Triggers...');
  const closingReport = await scanInboundRepliesAndCloseDeals();

  console.log('\n' + '='.repeat(75));
  console.log('📊 MASTER MULTI-CHANNEL CRM SUMMARY REPORT');
  console.log('='.repeat(75));
  console.log(`Total Establishments Scraped & Enriched: ${totalScraped}`);
  console.log(`Email Verified (Safe to send):           ${totalEmailVerified}`);
  console.log(`Social Queued (FB + LinkedIn):           ${totalSocialQueued}`);
  console.log(`Live Emails Dispatched:                  ${totalDispatched}`);
  console.log(`Unread Inbound Replies Scanned:          ${closingReport.scanned}`);
  console.log(`Hot Leads / Escrow Deals Triggered:      ${closingReport.hotLeadsFound}`);
  console.log(`Master Database Records:                 ${masterDb.length}`);
  console.log(`Social Recovery Queue Total:             ${socialQueue.length}`);
  console.log('='.repeat(75));

  return {
    totalScraped,
    totalEmailVerified,
    totalSocialQueued,
    totalDispatched,
    closingReport
  };
}

// Direct CLI Execution
if (process.argv[1] && process.argv[1].endsWith('multi_channel_crm_engine.js')) {
  const isLive = process.argv.includes('--live');
  const appArg = process.argv.find(a => a.startsWith('--app='));
  const appKey = appArg ? appArg.split('=')[1] : 'all';

  runCrmPipeline({ appKey, liveSend: isLive, limit: 3 })
    .then(() => process.exit(0))
    .catch(err => {
      console.error('FATAL CRM ERROR:', err);
      process.exit(1);
    });
}
