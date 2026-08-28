import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEADS_FILE = path.join(__dirname, 'src', 'leads.json');
const MASTER_100 = 'c:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\antigravity-ide\\100_VERIFIED_REAL_CLIENTS_LIVE_DISPATCH_LEDGER.json';

let currentLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
const masterLeads = JSON.parse(fs.readFileSync(MASTER_100, 'utf-8'));

console.log(`Current active leads: ${currentLeads.length}`);

// Map master leads into our schema
let addedCount = 0;
for (const m of masterLeads) {
  // Check if already in leads
  const exists = currentLeads.some(l => l.email.toLowerCase() === m.email.toLowerCase());
  if (!exists) {
    let campaign = 'clinical';
    if (m.sector.toLowerCase().includes('construction') || m.sector.toLowerCase().includes('civil')) campaign = 'sitesafe';
    else if (m.sector.toLowerCase().includes('logistics') || m.sector.toLowerCase().includes('warehouse') || m.sector.toLowerCase().includes('freight')) campaign = 'wms';
    else if (m.sector.toLowerCase().includes('cro') || m.sector.toLowerCase().includes('commerce') || m.sector.toLowerCase().includes('media')) campaign = 'saccade';
    else if (m.sector.toLowerCase().includes('retail') || m.sector.toLowerCase().includes('pos')) campaign = 'omnistock';
    else if (m.sector.toLowerCase().includes('workforce') || m.sector.toLowerCase().includes('bpo')) campaign = 'ems';

    currentLeads.push({
      id: `lead-auto-${m.id}`,
      campaign,
      organization: m.company,
      company: m.company,
      executiveName: m.contactName,
      title: m.role,
      linkedin: m.linkedInNote || 'https://www.linkedin.com',
      email: m.email,
      budget: m.budget,
      demoUrl: 'https://linkable.it.com',
      priorityHook: m.painPoint,
      currentTouchpoint: 1,
      lastDispatched: null,
      status: 'TOUCHPOINT_1_QUEUED'
    });
    addedCount++;
  }
}

fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2), 'utf-8');
console.log(`✅ Successfully added ${addedCount} new verified enterprise leads to active pipeline!`);
console.log(`Total Active Opportunity Fleet: ${currentLeads.length} leads.`);
