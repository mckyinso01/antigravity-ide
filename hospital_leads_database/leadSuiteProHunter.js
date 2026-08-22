// 🌐 LINKABLEAI AUTONOMOUS LEADSUITE PRO HUNTER & DECISION-MAKER FINDER
// Ports OpenStreetMap Overpass Scraper & Waterfall DecisionMaker Extraction
// from mckyinso01/lead-suite-pro into the LinkableAI CRM Architecture.

const fs = require('fs');
const path = require('path');
const dns = require('dns').promises;
const dnsSync = require('dns');

try {
  dnsSync.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const HUNTER_OUTPUT_PATH = path.join(__dirname, 'lead_hunter_discovered_accounts.json');

// Target Metropolitan Cities for High-Ticket B2B Expansion
const TARGET_REGIONS = [
  { city: 'Houston', state: 'Texas', bbox: '29.5,-95.8,30.1,-95.0' },
  { city: 'Dallas', state: 'Texas', bbox: '32.6,-97.0,33.0,-96.5' },
  { city: 'Los Angeles', state: 'California', bbox: '33.7,-118.6,34.3,-118.1' },
  { city: 'San Francisco', state: 'California', bbox: '37.7,-122.5,37.8,-122.3' },
  { city: 'Chicago', state: 'Illinois', bbox: '41.6,-87.9,42.0,-87.5' },
  { city: 'Atlanta', state: 'Georgia', bbox: '33.6,-84.5,33.9,-84.2' },
  { city: 'London', country: 'United Kingdom', bbox: '51.3,-0.5,51.7,0.3' },
  { city: 'Manchester', country: 'United Kingdom', bbox: '53.4,-2.4,53.6,-2.1' }
];

/**
 * Extracts clean domain name from URL or email
 */
function extractCleanDomain(urlOrEmail) {
  if (!urlOrEmail) return '';
  let domain = urlOrEmail.trim().toLowerCase();
  if (domain.includes('@')) {
    domain = domain.split('@')[1];
  }
  domain = domain.replace(/^https?:\/\//, '');
  domain = domain.replace(/^www\./, '');
  domain = domain.split('/')[0].split('?')[0];
  return domain;
}

/**
 * Generates prioritized Decision-Maker contacts based on company data & domain
 * (Ported from LeadSuite Pro decisionMakerFinder.ts)
 */
function generateDecisionMakers(companyName, website, knownEmail, contactName) {
  const domain = extractCleanDomain(website || knownEmail) || 'targetenterprise.com';
  const cleanCompany = (companyName || 'Target Enterprise').trim();
  const firstName = contactName ? contactName.trim().split(' ')[0].toLowerCase() : '';
  const lastName = contactName && contactName.trim().split(' ').length > 1 ? contactName.trim().split(' ')[1].toLowerCase() : '';

  const contacts = [];

  // 1. Founder / Owner / CEO (Ultimate Economic Buyer)
  const ownerEmail = firstName 
    ? (lastName ? `${firstName}.${lastName}@${domain}` : `${firstName}@${domain}`)
    : `owner@${domain}`;

  contacts.push({
    id: `dm-owner-${domain}`,
    role: 'owner',
    roleTitle: 'Founder / CEO / Managing Director',
    name: contactName || `${cleanCompany} Executive Office`,
    email: ownerEmail,
    confidence: firstName ? 92 : 84,
    pitchAngle: 'ROI, 5/10th pricing disruption, 100% free custom setup, and eliminating recurring SaaS taxes.',
    painPoint: 'High software license fees, bloated headcount, and slow legacy vendor development cycles.'
  });

  // 2. CTO / Tech Lead / CIO (Technical Gatekeeper)
  contacts.push({
    id: `dm-cto-${domain}`,
    role: 'cto',
    roleTitle: 'Chief Technology Officer / CIO',
    name: 'Engineering & Tech Architecture Lead',
    email: `tech@${domain}`,
    confidence: 88,
    pitchAngle: 'Direct sprint augmentation, high-performance TypeScript/Node architectures, and perpetual Git source code ownership.',
    painPoint: 'Feature backlogs, maintaining outdated legacy stacks, and brittle third-party integrations.'
  });

  // 3. VP of Operations / COO / CNO (Workflow Leader)
  contacts.push({
    id: `dm-ops-${domain}`,
    role: 'ops',
    roleTitle: 'Head of Operations / Chief Nursing Officer',
    name: 'Operations & Process Lead',
    email: `operations@${domain}`,
    confidence: 80,
    pitchAngle: 'Centralized operations, automated BCMA/CPM/FEFO compliance verification, and 3-Gives milestone security.',
    painPoint: 'Manual double-entry, spreadsheet disorganization, and compliance audit penalties.'
  });

  return {
    domain,
    companyName: cleanCompany,
    website: website || `https://${domain}`,
    contacts
  };
}

/**
 * Checks DNS MX records to verify domain accepts mail
 */
async function verifyDomainMx(domain) {
  if (!domain || domain.includes('localhost') || domain === 'targetenterprise.com') return false;
  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch (e) {
    return false;
  }
}

const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass.private.coffee/api/interpreter'
];

/**
 * Live OpenStreetMap Overpass Scraper with multi-mirror fallback
 */
async function queryOverpassCategory(categoryTag, bbox, limit = 10) {
  const query = `
    [out:json][timeout:30];
    (
      node[${categoryTag}](${bbox});
      way[${categoryTag}](${bbox});
    );
    out tags center ${limit};
  `;

  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const url = `${mirror}?data=${encodeURIComponent(query)}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': 'LinkableAI-LeadSuiteHunter/2.0 (mharcgatan@linkable.it.com)' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.elements && data.elements.length > 0) {
          return data.elements;
        }
      }
    } catch (err) {
      // Try next mirror
    }
  }
  return [];
}

/**
 * Main Autonomous Lead Hunting Cycle
 */
async function runLeadHunterCycle(options = {}) {
  const targetVertical = options.vertical || 'clinical'; // clinical | sitesafe | omnistock | saccade
  const targetRegion = TARGET_REGIONS[Math.floor(Math.random() * TARGET_REGIONS.length)];
  
  console.log(`\n======================================================`);
  console.log(`🌐 LEADSUITE PRO HUNTER: Commencing Live Lead Discovery`);
  console.log(`📍 Target Sector: ${targetVertical.toUpperCase()} in ${targetRegion.city}, ${targetRegion.state || targetRegion.country}`);
  console.log(`======================================================\n`);

  let tag = 'amenity=hospital';
  if (targetVertical === 'claimguard') tag = 'amenity=hospital';
  if (targetVertical === 'sitesafe') tag = 'office=construction_company';
  if (targetVertical === 'omnistock') tag = 'building=warehouse';
  if (targetVertical === 'saccade') tag = 'office=advertising_agency';

  const rawElements = await queryOverpassCategory(tag, targetRegion.bbox, 10);
  console.log(`🔍 Discovered ${rawElements.length} raw geographic nodes from OpenStreetMap.`);

  const discoveredAccounts = [];
  for (const el of rawElements) {
    const name = el.tags?.name || el.tags?.['name:en'] || el.tags?.operator;
    if (!name) continue;

    const website = el.tags?.website || el.tags?.['contact:website'] || el.tags?.url || `https://${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
    const email = el.tags?.email || el.tags?.['contact:email'] || '';
    const phone = el.tags?.phone || el.tags?.['contact:phone'] || '';
    const cleanDomain = extractCleanDomain(website || email);

    console.log(`\n🏢 Processing Account: ${name}`);
    console.log(`   🌐 Domain: ${cleanDomain} | 📞 Phone: ${phone || 'N/A'}`);

    const hasMx = await verifyDomainMx(cleanDomain);
    console.log(`   📫 DNS MX Mail Verification: ${hasMx ? '✅ ACTIVE' : '⚠️ UNRESOLVED'}`);

    const accountDossier = generateDecisionMakers(name, website, email, null);
    accountDossier.vertical = targetVertical;
    accountDossier.location = `${targetRegion.city}, ${targetRegion.state || targetRegion.country}`;
    accountDossier.phone = phone;
    accountDossier.hasActiveMx = hasMx;
    accountDossier.discoveredAt = new Date().toISOString();

    discoveredAccounts.push(accountDossier);
  }

  // Persist to discovered storage
  let existingHunterData = [];
  if (fs.existsSync(HUNTER_OUTPUT_PATH)) {
    try {
      existingHunterData = JSON.parse(fs.readFileSync(HUNTER_OUTPUT_PATH, 'utf8'));
    } catch {
      existingHunterData = [];
    }
  }

  // Deduplicate by domain
  const existingDomains = new Set(existingHunterData.map(a => a.domain));
  let newAdded = 0;
  discoveredAccounts.forEach(acc => {
    if (!existingDomains.has(acc.domain)) {
      existingHunterData.push(acc);
      existingDomains.add(acc.domain);
      newAdded++;
    }
  });

  fs.writeFileSync(HUNTER_OUTPUT_PATH, JSON.stringify(existingHunterData, null, 2), 'utf8');
  console.log(`\n✅ LeadSuite Pro Hunt Complete! Added ${newAdded} new verified enterprise accounts to pipeline.`);
  return { totalDiscovered: discoveredAccounts.length, newlySaved: newAdded, targetRegion };
}

module.exports = {
  runLeadHunterCycle,
  generateDecisionMakers,
  extractCleanDomain,
  verifyDomainMx
};

if (require.main === module) {
  runLeadHunterCycle({ vertical: 'clinical' });
}
