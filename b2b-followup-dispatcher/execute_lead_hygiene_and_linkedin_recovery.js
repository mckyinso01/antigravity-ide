// ============================================================
// ZERO-DEFECT LEAD HYGIENE & LINKEDIN RECOVERY ENGINE
// 1. Purges generic helpdesk/info@/customercare@ and bounced addresses
// 2. Transports targets to high-precision LinkedIn multi-touch queue
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PURGED_FILE = path.join(__dirname, 'PURGED_DEAD_LEADS.json');
const LINKEDIN_QUEUE_FILE = path.join(__dirname, 'LINKEDIN_BOUNCE_RECOVERY_QUEUE.json');
const MASTER_QUEUE_FILE = path.join(__dirname, 'MASTER_FOLLOWUP_540_QUEUE.json');
const VERIFIED_ALIVE_FILE = path.join(__dirname, 'VERIFIED_ALIVE_OUTREACH_LEADS.json');
const META_RADAR_FILE = path.join(__dirname, 'META_ENTERPRISE_PROSPECT_RADAR.json');
const SRC_LEADS_FILE = path.join(__dirname, 'src', 'leads.json');
const SRC_HUMAN_FILE = path.join(__dirname, 'src', 'VERIFIED_HUMAN_LEADS.json');

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) return [];
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err.message);
    return [];
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Check if an email address is a generic shared/ticketing desk
function isGenericOrJunkEmail(email) {
  if (!email || typeof email !== 'string') return true;
  const lower = email.toLowerCase().trim();
  const genericPrefixes = [
    'info@',
    'customercare@',
    'support@',
    'help@',
    'admin@',
    'contact@',
    'inquiries@',
    'inquiry@',
    'postmaster@',
    'mailer-daemon@',
    'service@',
    'care@',
    'office@',
    'hello@',
    'general@'
  ];

  if (genericPrefixes.some(p => lower.startsWith(p))) return true;

  // Specific blacklisted emails from inbox bounces/automated loops
  const specificBlacklist = [
    'postmaster@jolecoresourcesinc933.onmicrosoft.com',
    'customercare@southstardrug.com.ph',
    'support@thegenericspharmacy.zendesk.com',
    'postmaster@skagitregionalhealth.org',
    'postmaster@valleybaptist.net',
    'mailer-daemon@bounces.jellyfish.systems',
    'mailer-daemon@encryptdel202.appriver.com'
  ];

  return specificBlacklist.includes(lower);
}

// Generate tailored LinkedIn pitch hook based on company/industry
function generateLinkedInHook(company, industry) {
  const comp = (company || '').toLowerCase();
  const ind = (industry || '').toLowerCase();

  if (comp.includes('drug') || comp.includes('pharmacy') || comp.includes('pharma') || comp.includes('tgp') || comp.includes('southstar')) {
    return {
      title: 'Head of Supply Chain / VP Operations / CIO',
      campaign: 'pharma_wms_automation',
      demoUrl: 'https://omnistock.linkable.it.com',
      note: `Hi, reaching out regarding supply chain and warehouse fulfillment at ${company}. We built OmniStock—reducing travel time and automating batch expiry FEFO tracking in high-throughput distribution. Live sandbox: omnistock.linkable.it.com. Would love to connect. - Mharc`,
      comment: `Impressive scale and distribution reach at ${company}. Optimizing warehouse slotting and eliminating manual picker travel is critical for pharma retail margins. Demo: omnistock.linkable.it.com`
    };
  }

  if (comp.includes('hospital') || comp.includes('health') || comp.includes('clinic') || comp.includes('medical') || comp.includes('nhs')) {
    return {
      title: 'Chief Information Officer / VP of IT / Clinical Informatics Director',
      campaign: 'clinical_icu_telemetry',
      demoUrl: 'https://clinical.linkable.it.com',
      note: `Hi, reaching out regarding acute telemetry and EHR interoperability at ${company}. We engineered Clinical Pristine ICU OS—sub-second waveforms with seamless HL7/FHIR sync: clinical.linkable.it.com. Offering sandbox access for clinical IT teams. - Mharc`,
      comment: `Forward-thinking clinical operations at ${company}. Breaking down proprietary waveform silos while maintaining sub-second HL7/FHIR EHR synchronization is game-changing. Live demo: clinical.linkable.it.com`
    };
  }

  if (comp.includes('logistics') || comp.includes('freight') || comp.includes('cargo') || comp.includes('warehouse')) {
    return {
      title: 'VP of Logistics / Supply Chain Director / COO',
      campaign: 'omnistock_wms',
      demoUrl: 'https://omnistock.linkable.it.com',
      note: `Hi, reaching out regarding high-density warehousing at ${company}. We built OmniStock 3D Voxel Digital Twin—optimizing automated slotting and cutting forklift travel: omnistock.linkable.it.com. Would love to share 48h sandbox access. - Mharc`,
      comment: `Crucial focus on distribution efficiency at ${company}. 3D Voxel spatial routing can eliminate miles of forklift deadhead travel daily. Live sandbox: omnistock.linkable.it.com`
    };
  }

  // General B2B / Construction / Tech
  return {
    title: 'Chief Technology Officer / Operations Director / VP Engineering',
    campaign: 'enterprise_automation',
    demoUrl: 'https://sitesafe.linkable.it.com',
    note: `Hi, reaching out regarding operational telemetry and workflow automation at ${company}. We deploy custom enterprise software and real-time dashboard systems: sitesafe.linkable.it.com. Would love to connect and share insights. - Mharc`,
    comment: `Exceptional work at ${company}. Enterprise automation and real-time telemetry are essential for operational resilience. Live demo: sitesafe.linkable.it.com`
  };
}

async function executeHygieneAndLinkedInTransfer() {
  console.log('='.repeat(75));
  console.log('🧼 EXECUTING STAGE 1: LEAD LIST HYGIENE & PURGE AUDIT');
  console.log('='.repeat(75));

  const purgedList = loadJson(PURGED_FILE);
  const linkedinQueue = loadJson(LINKEDIN_QUEUE_FILE);
  const purgedEmailSet = new Set(purgedList.map(p => (p.email || '').toLowerCase().trim()));
  const linkedinCompanySet = new Set(linkedinQueue.map(l => (l.company || '').toLowerCase().trim()));

  // 1. Known Recent Bounces from Inbox to forcefully add
  const recentInboxBounces = [
    {
      email: 'postmaster@jolecoresourcesinc933.onmicrosoft.com',
      name: 'Operations Leadership',
      company: 'St. Joseph Drug / Joleco Resources',
      reason: 'UNDELIVERABLE_EXCHANGE_REJECTION (Forklift pitch rejected by MS 365 postmaster)',
      campaign: 'omnistock_wms'
    },
    {
      email: 'customercare@southstardrug.com.ph',
      name: 'Customer Support Desk',
      company: 'Southstar Drug',
      reason: 'AUTOMATED_ZENDESK_TICKETING_LOOP (Generates welcome ticket instead of human lead)',
      campaign: 'omnistock_wms'
    },
    {
      email: 'support@thegenericspharmacy.zendesk.com',
      name: 'TGP Support Desk',
      company: 'The Generics Pharmacy (TGP)',
      reason: 'AUTOMATED_ZENDESK_TICKETING_LOOP (Generates support ticket instead of human lead)',
      campaign: 'omnistock_wms'
    },
    {
      email: 'postmaster@skagitregionalhealth.org',
      name: 'Skagit Postmaster',
      company: 'Skagit Regional Health',
      reason: 'UNDELIVERABLE_EXCHANGE_550',
      campaign: 'claimguard'
    },
    {
      email: 'postmaster@valleybaptist.net',
      name: 'Valley Baptist Postmaster',
      company: 'Valley Baptist Medical Center',
      reason: 'UNDELIVERABLE_EXCHANGE_550',
      campaign: 'claimguard'
    },
    {
      email: 'clinicaltrial@colquittregional.com',
      name: 'Oncology / Clinical Trials',
      company: 'Colquitt Regional Medical Center',
      reason: 'APPRIVER_GATEWAY_FAILURE (Encrypted gateway rejection)',
      campaign: 'claimguard'
    }
  ];

  let newlyPurgedCount = 0;
  let newlyTransferredToLinkedIn = 0;

  for (const b of recentInboxBounces) {
    const lowerEmail = b.email.toLowerCase();
    if (!purgedEmailSet.has(lowerEmail)) {
      const entry = {
        email: b.email,
        name: b.name,
        company: b.company,
        source: 'inbox_audit_bounce',
        status: 'PURGED_INBOX_BOUNCE',
        reason: b.reason,
        purgedAt: new Date().toISOString()
      };
      purgedList.push(entry);
      purgedEmailSet.add(lowerEmail);
      newlyPurgedCount++;
      console.log(`🚨 Quarantined inbox bounce: ${b.email} (${b.company})`);
    }

    // Add to LinkedIn Queue
    const compKey = b.company.toLowerCase().trim();
    if (!linkedinCompanySet.has(compKey)) {
      const hook = generateLinkedInHook(b.company, '');
      const searchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(`"${b.company}" ("${hook.title.split('/')[0].trim()}" OR "CIO" OR "VP" OR "Director")`)}`;
      linkedinQueue.push({
        company: b.company,
        targetExecutive: b.name.includes('Postmaster') || b.name.includes('Desk') ? hook.title.split('/')[0].trim() : b.name,
        title: hook.title,
        searchUrl: searchUrl,
        linkedin: `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(b.company)}`,
        campaign: hook.campaign,
        demoUrl: hook.demoUrl,
        suggestedAction: 'Direct LinkedIn Connection & Comment on Executive Post',
        pitchHook: hook.note,
        commentPitch: hook.comment,
        status: 'QUEUED_FOR_LINKEDIN_ENGAGEMENT',
        queuedAt: new Date().toISOString(),
        origin: 'inbox_bounce_recovery'
      });
      linkedinCompanySet.add(compKey);
      newlyTransferredToLinkedIn++;
      console.log(`💼 Queued LinkedIn target for: ${b.company}`);
    }
  }

  // 2. Scrub MASTER_FOLLOWUP_540_QUEUE.json
  const masterQueue = loadJson(MASTER_QUEUE_FILE);
  let masterScrubbed = 0;
  const cleanedMasterQueue = [];

  for (const lead of masterQueue) {
    const email = (lead.email || '').toLowerCase().trim();
    if (isGenericOrJunkEmail(email) || purgedEmailSet.has(email)) {
      masterScrubbed++;
      // Ensure in purged list
      if (!purgedEmailSet.has(email)) {
        purgedList.push({
          email: lead.email,
          name: lead.name || lead.executiveName || 'Generic Desk',
          company: lead.company || lead.hospital || 'Unknown',
          source: 'master_followup_540_scrub',
          status: 'PURGED_GENERIC_DESK',
          reason: 'GENERIC_INFO_OR_SUPPORT_PREFIX',
          purgedAt: new Date().toISOString()
        });
        purgedEmailSet.add(email);
        newlyPurgedCount++;
      }

      // Add to LinkedIn Queue if not present
      const comp = lead.company || lead.hospital;
      if (comp && !linkedinCompanySet.has(comp.toLowerCase().trim())) {
        const hook = generateLinkedInHook(comp, lead.industry);
        const searchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(`"${comp}" ("CIO" OR "VP" OR "Director")`)}`;
        linkedinQueue.push({
          company: comp,
          targetExecutive: lead.name && !lead.name.toLowerCase().includes('directorate') && !lead.name.toLowerCase().includes('desk') ? lead.name : hook.title.split('/')[0].trim(),
          title: hook.title,
          searchUrl: searchUrl,
          linkedin: `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(comp)}`,
          campaign: hook.campaign,
          demoUrl: hook.demoUrl,
          suggestedAction: 'Direct LinkedIn Connection & Comment on Executive Post',
          pitchHook: hook.note,
          commentPitch: hook.comment,
          status: 'QUEUED_FOR_LINKEDIN_ENGAGEMENT',
          queuedAt: new Date().toISOString(),
          origin: 'generic_email_scrub'
        });
        linkedinCompanySet.add(comp.toLowerCase().trim());
        newlyTransferredToLinkedIn++;
      }
    } else {
      cleanedMasterQueue.push(lead);
    }
  }

  saveJson(MASTER_QUEUE_FILE, cleanedMasterQueue);
  console.log(`\n🧹 MASTER_FOLLOWUP_540_QUEUE.json: Scrubbed ${masterScrubbed} generic/purged leads. Remaining live leads: ${cleanedMasterQueue.length}`);

  // 3. Scrub VERIFIED_ALIVE_OUTREACH_LEADS.json
  const aliveLeads = loadJson(VERIFIED_ALIVE_FILE);
  let aliveScrubbed = 0;
  const cleanedAliveLeads = [];

  for (const lead of aliveLeads) {
    const email = (lead.email || '').toLowerCase().trim();
    if (isGenericOrJunkEmail(email) || purgedEmailSet.has(email)) {
      aliveScrubbed++;
      if (!purgedEmailSet.has(email)) {
        purgedList.push({
          email: lead.email,
          name: lead.name || 'Generic Desk',
          company: lead.company || 'Unknown',
          source: 'verified_alive_scrub',
          status: 'PURGED_GENERIC_DESK',
          reason: 'GENERIC_INFO_OR_SUPPORT_PREFIX',
          purgedAt: new Date().toISOString()
        });
        purgedEmailSet.add(email);
        newlyPurgedCount++;
      }

      const comp = lead.company;
      if (comp && !linkedinCompanySet.has(comp.toLowerCase().trim())) {
        const hook = generateLinkedInHook(comp, lead.industry);
        const searchUrl = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(`"${comp}" ("CIO" OR "VP" OR "Director")`)}`;
        linkedinQueue.push({
          company: comp,
          targetExecutive: hook.title.split('/')[0].trim(),
          title: hook.title,
          searchUrl: searchUrl,
          linkedin: `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(comp)}`,
          campaign: hook.campaign,
          demoUrl: hook.demoUrl,
          suggestedAction: 'Direct LinkedIn Connection & Comment on Executive Post',
          pitchHook: hook.note,
          commentPitch: hook.comment,
          status: 'QUEUED_FOR_LINKEDIN_ENGAGEMENT',
          queuedAt: new Date().toISOString(),
          origin: 'generic_email_scrub'
        });
        linkedinCompanySet.add(comp.toLowerCase().trim());
        newlyTransferredToLinkedIn++;
      }
    } else {
      cleanedAliveLeads.push(lead);
    }
  }

  saveJson(VERIFIED_ALIVE_FILE, cleanedAliveLeads);
  console.log(`🧹 VERIFIED_ALIVE_OUTREACH_LEADS.json: Scrubbed ${aliveScrubbed} generic/purged leads. Remaining live leads: ${cleanedAliveLeads.length}`);

  // 4. Scrub src/leads.json if exists
  const srcLeads = loadJson(SRC_LEADS_FILE);
  if (srcLeads.length > 0) {
    let srcScrubbed = 0;
    const cleanedSrcLeads = [];
    for (const lead of srcLeads) {
      const email = (lead.email || '').toLowerCase().trim();
      if (isGenericOrJunkEmail(email) || purgedEmailSet.has(email)) {
        srcScrubbed++;
      } else {
        cleanedSrcLeads.push(lead);
      }
    }
    saveJson(SRC_LEADS_FILE, cleanedSrcLeads);
    console.log(`🧹 src/leads.json: Scrubbed ${srcScrubbed} leads. Remaining live leads: ${cleanedSrcLeads.length}`);
  }

  // Save updated Purged and LinkedIn lists
  saveJson(PURGED_FILE, purgedList);
  saveJson(LINKEDIN_QUEUE_FILE, linkedinQueue);

  console.log('\n' + '='.repeat(75));
  console.log('🏁 FINAL TELEMETRY & EXECUTION REPORT');
  console.log('='.repeat(75));
  console.log(`📁 Total Quarantined in PURGED_DEAD_LEADS.json: ${purgedList.length} (+${newlyPurgedCount} newly added)`);
  console.log(`🚀 Total Targets in LINKEDIN_BOUNCE_RECOVERY_QUEUE.json: ${linkedinQueue.length} (+${newlyTransferredToLinkedIn} newly added)`);
  console.log('='.repeat(75));
}

executeHygieneAndLinkedInTransfer().catch(console.error);
