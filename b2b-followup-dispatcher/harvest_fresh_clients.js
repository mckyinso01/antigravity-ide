import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEADS_FILE = path.join(__dirname, 'src', 'leads.json');
const MASTER_200 = 'c:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\antigravity-ide\\200_VERIFIED_REAL_CLIENTS_LIVE_DISPATCH_LEDGER.json';

let currentLeads = [];
if (fs.existsSync(LEADS_FILE)) {
  currentLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
}

console.log(`Initial active leads in pipeline: ${currentLeads.length}`);

let masterLeads = [];
if (fs.existsSync(MASTER_200)) {
  masterLeads = JSON.parse(fs.readFileSync(MASTER_200, 'utf-8'));
}

let addedCount = 0;
for (const m of masterLeads) {
  if (!m.email || m.email.includes('example.com')) continue;
  
  const exists = currentLeads.some(l => l.email && l.email.toLowerCase() === m.email.toLowerCase());
  if (!exists) {
    let campaign = 'saccade';
    const sector = (m.sector || '').toLowerCase();
    const pain = (m.painPoint || '').toLowerCase();

    if (sector.includes('health') || sector.includes('hospital') || sector.includes('clinic') || sector.includes('telehealth') || sector.includes('medical') || pain.includes('ehr') || pain.includes('telemetry')) {
      campaign = 'clinical';
    } else if (sector.includes('construction') || sector.includes('civil') || sector.includes('engineering') || sector.includes('contractor') || pain.includes('cpm') || pain.includes('weather')) {
      campaign = 'sitesafe';
    } else if (sector.includes('logistics') || sector.includes('warehouse') || sector.includes('freight') || sector.includes('supply chain') || pain.includes('inventory') || pain.includes('wms') || pain.includes('voxel')) {
      campaign = 'wms';
    } else if (sector.includes('retail') || sector.includes('pos') || sector.includes('supermarket') || sector.includes('store') || pain.includes('pos') || pain.includes('cashier')) {
      campaign = 'omnistock';
    } else if (sector.includes('workforce') || sector.includes('hr') || sector.includes('payroll') || sector.includes('bpo') || pain.includes('biometric') || pain.includes('scheduling')) {
      campaign = 'ems';
    } else if (sector.includes('cro') || sector.includes('web') || sector.includes('app') || sector.includes('design') || sector.includes('agency') || sector.includes('media') || sector.includes('saas') || sector.includes('mobile')) {
      campaign = 'saccade';
    }

    currentLeads.push({
      id: `lead-rfp-${m.id || addedCount + 1}`,
      campaign,
      organization: m.company,
      company: m.company,
      executiveName: m.contactName || 'Executive Directorate',
      title: m.role || 'Decision Maker',
      linkedin: m.linkedInNote || 'https://www.linkedin.com',
      email: m.email,
      budget: m.budget || '$5,000 USD',
      demoUrl: `https://${campaign === 'clinical' ? 'clinical' : campaign === 'sitesafe' ? 'sitesafe' : campaign === 'wms' ? 'omnistock' : campaign === 'omnistock' ? 'omnistock' : 'linkable'}.it.com`,
      priorityHook: m.painPoint || 'rapid full-stack web application development',
      currentTouchpoint: 1,
      lastDispatched: null,
      status: 'TOUCHPOINT_1_QUEUED'
    });
    addedCount++;
  }
}

fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2), 'utf-8');
console.log(`============================================================`);
console.log(`🎉 INGESTION COMPLETE!`);
console.log(`Added ${addedCount} brand-new verified client RFPs searching for full stack / apps!`);
console.log(`Total Active Opportunity Fleet: ${currentLeads.length} accounts.`);
console.log(`============================================================`);
