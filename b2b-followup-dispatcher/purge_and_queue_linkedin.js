import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const deadLeadsToPurge = [
  {
    email: "bspapen@weberlogistics.com",
    name: "Bob Spapen",
    title: "Chief Executive Officer",
    company: "Weber Logistics",
    source: "omnistock_wms_wave",
    status: "PURGED_BOUNCED_550",
    reason: "550 Invalid Recipient - Mimecast rejected address",
    purgedAt: new Date().toISOString(),
    linkedin: "https://www.linkedin.com/company/weber-logistics",
    campaign: "omnistock_wms",
    demoUrl: "https://omnistock.linkable.it.com"
  },
  {
    email: "bkelly@complog.com",
    name: "Bob Kelly",
    title: "Chief Executive Officer",
    company: "Comprehensive Logistics",
    source: "omnistock_wms_wave",
    status: "PURGED_BOUNCED_550",
    reason: "550 5.4.1 Recipient address rejected: Access denied",
    purgedAt: new Date().toISOString(),
    linkedin: "https://www.linkedin.com/company/comprehensive-logistics-co.-inc.",
    campaign: "omnistock_wms",
    demoUrl: "https://omnistock.linkable.it.com"
  },
  {
    email: "dfinch@linbeck.com",
    name: "David Finch",
    title: "Chief Executive Officer",
    company: "Linbeck Group",
    source: "structurapro_wave",
    status: "PURGED_BOUNCED_550",
    reason: "550 5.4.1 Recipient address rejected: Access denied",
    purgedAt: new Date().toISOString(),
    linkedin: "https://www.linkedin.com/company/linbeck-group-llc",
    campaign: "structurapro",
    demoUrl: "https://sitesafe.linkable.it.com"
  },
  {
    email: "dgiles@level10gc.com",
    name: "Dennis Giles",
    title: "President / CEO",
    company: "Level 10 Construction",
    source: "structurapro_wave",
    status: "PURGED_BOUNCED_550",
    reason: "[Postmaster] Recipient email address possibly incorrect",
    purgedAt: new Date().toISOString(),
    linkedin: "https://www.linkedin.com/company/level-10-construction",
    campaign: "structurapro",
    demoUrl: "https://sitesafe.linkable.it.com"
  },
  {
    email: "info@kingedwardvii.co.uk",
    name: "Executive Leadership",
    title: "Chief Executive",
    company: "King Edward VII's Hospital",
    source: "claimguard_healthcare_wave",
    status: "PURGED_BOUNCED_550",
    reason: "550 5.4.1 Recipient address rejected: Access denied",
    purgedAt: new Date().toISOString(),
    linkedin: "https://www.linkedin.com/company/king-edward-vii's-hospital",
    campaign: "claimguard",
    demoUrl: "https://claimguard.linkable.it.com"
  }
];

console.log('='.repeat(70));
console.log('🚫 [STEP 2] PURGING BOUNCED EMAILS & QUEUING LINKEDIN RECOVERY');
console.log('='.repeat(70));

// 1. Update PURGED_DEAD_LEADS.json
const purgedPath = path.join(__dirname, 'PURGED_DEAD_LEADS.json');
let purgedList = [];
if (fs.existsSync(purgedPath)) {
  purgedList = JSON.parse(fs.readFileSync(purgedPath, 'utf8'));
}

let addedCount = 0;
for (const item of deadLeadsToPurge) {
  if (!purgedList.some(p => p.email.toLowerCase() === item.email.toLowerCase())) {
    purgedList.push(item);
    addedCount++;
    console.log(`❌ Purged & Blacklisted: ${item.email} (${item.company}) - ${item.reason}`);
  }
}
fs.writeFileSync(purgedPath, JSON.stringify(purgedList, null, 2));
console.log(`📁 Saved to PURGED_DEAD_LEADS.json (Total purged leads: ${purgedList.length}).`);

// 2. Update MASSIVE_FEATURED_APPS_100_PIPELINE.json
const massivePipelinePath = path.join(__dirname, 'MASSIVE_FEATURED_APPS_100_PIPELINE.json');
if (fs.existsSync(massivePipelinePath)) {
  const pipeline = JSON.parse(fs.readFileSync(massivePipelinePath, 'utf8'));
  let updatedInPipeline = 0;
  for (const item of pipeline) {
    if (item.email && deadLeadsToPurge.some(d => d.email.toLowerCase() === item.email.toLowerCase())) {
      item.status = "BOUNCED_TRANSFERRED_TO_LINKEDIN";
      item.purgedAt = new Date().toISOString();
      updatedInPipeline++;
    }
  }
  fs.writeFileSync(massivePipelinePath, JSON.stringify(pipeline, null, 2));
  console.log(`📁 Updated ${updatedInPipeline} leads in MASSIVE_FEATURED_APPS_100_PIPELINE.json to BOUNCED_TRANSFERRED_TO_LINKEDIN.`);
}

// 3. Update src/leads.json
const leadsPath = path.join(__dirname, 'src', 'leads.json');
if (fs.existsSync(leadsPath)) {
  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  let updatedInLeads = 0;
  for (const item of leads) {
    if (item.email && deadLeadsToPurge.some(d => d.email.toLowerCase() === item.email.toLowerCase())) {
      item.status = "BOUNCED_TRANSFERRED_TO_LINKEDIN";
      item.purgedAt = new Date().toISOString();
      updatedInLeads++;
    }
  }
  fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
  console.log(`📁 Updated ${updatedInLeads} leads in src/leads.json to BOUNCED_TRANSFERRED_TO_LINKEDIN.`);
}

// 4. Save to LINKEDIN_BOUNCE_RECOVERY_QUEUE.json
const recoveryPath = path.join(__dirname, 'LINKEDIN_BOUNCE_RECOVERY_QUEUE.json');
let recoveryQueue = [];
if (fs.existsSync(recoveryPath)) {
  recoveryQueue = JSON.parse(fs.readFileSync(recoveryPath, 'utf8'));
}

for (const item of deadLeadsToPurge) {
  if (!recoveryQueue.some(r => r.company.toLowerCase() === item.company.toLowerCase())) {
    recoveryQueue.push({
      company: item.company,
      targetExecutive: item.name,
      title: item.title,
      linkedin: item.linkedin,
      campaign: item.campaign,
      demoUrl: item.demoUrl,
      suggestedAction: "Direct LinkedIn Connection & Comment on Recent Executive Post",
      pitchHook: item.campaign === 'omnistock_wms' 
        ? "3D Voxel Digital Twin & Automated Slotting optimization for high-density logistics" 
        : item.campaign === 'structurapro'
        ? "Automated NOAA Weather Delay Insurance Claims & OSHA 300 Telemetry"
        : "ICU Telemetry to Insurance Denial Defense AI",
      status: "QUEUED_FOR_LINKEDIN_ENGAGEMENT",
      queuedAt: new Date().toISOString()
    });
  }
}
fs.writeFileSync(recoveryPath, JSON.stringify(recoveryQueue, null, 2));
console.log(`🚀 Queued ${deadLeadsToPurge.length} executive accounts in LINKEDIN_BOUNCE_RECOVERY_QUEUE.json for LinkedIn multi-touch!`);
console.log('='.repeat(70));
