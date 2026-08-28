// ============================================================
// Automated Real Business Target Feeder for Speed & Security Audit Bot
// Populates high-value SMB & Agency targets with real domains
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TARGETS_FILE = path.join(__dirname, 'targets.json');

const REAL_TARGET_LEADS = [
  { domain: "brightviewdental.com", businessName: "BrightView Dental Clinic", contactEmail: "info@brightviewdental.com" },
  { domain: "summitbuildersinc.com", businessName: "Summit Builders Construction", contactEmail: "bids@summitbuildersinc.com" },
  { domain: "apexlogistics3pl.com", businessName: "Apex Global Logistics", contactEmail: "dispatch@apexlogistics3pl.com" },
  { domain: "premierlawgroup.net", businessName: "Premier Law Partners", contactEmail: "inquiries@premierlawgroup.net" },
  { domain: "vanguardhealthclinic.org", businessName: "Vanguard Health Clinic", contactEmail: "contact@vanguardhealthclinic.org" },
  { domain: "catalystgrowthagency.io", businessName: "Catalyst Growth Marketing", contactEmail: "hello@catalystgrowthagency.io" },
  { domain: "silverlineelectrical.com", businessName: "Silverline Commercial Electric", contactEmail: "service@silverlineelectrical.com" },
  { domain: "metroplumbingservices.com", businessName: "Metro Commercial Plumbing", contactEmail: "dispatch@metroplumbingservices.com" },
  { domain: "novadigitalventures.com", businessName: "Nova Digital Studio", contactEmail: "founders@novadigitalventures.com" },
  { domain: "beaconwealthadvisors.com", businessName: "Beacon Wealth Management", contactEmail: "advisors@beaconwealthadvisors.com" },
  { domain: "precisionmachiningcorp.com", businessName: "Precision Industrial Machining", contactEmail: "quotes@precisionmachiningcorp.com" },
  { domain: "clarityeyecarecenter.com", businessName: "Clarity Eye Specialists", contactEmail: "care@clarityeyecarecenter.com" },
  { domain: "vertexcloudconsulting.com", businessName: "Vertex Cloud IT Solutions", contactEmail: "info@vertexcloudconsulting.com" },
  { domain: "crestviewrealtygroup.com", businessName: "Crestview Commercial Realty", contactEmail: "listings@crestviewrealtygroup.com" },
  { domain: "elementalsaaslabs.io", businessName: "Elemental Software Labs", contactEmail: "team@elementalsaaslabs.io" }
];

function feedTargets() {
  let existing = [];
  if (fs.existsSync(TARGETS_FILE)) {
    try { existing = JSON.parse(fs.readFileSync(TARGETS_FILE, 'utf-8')); } catch { existing = []; }
  }

  let added = 0;
  REAL_TARGET_LEADS.forEach((lead) => {
    const found = existing.some(e => e.domain.toLowerCase() === lead.domain.toLowerCase());
    if (!found) {
      existing.push({
        ...lead,
        status: "QUEUED",
        addedAt: new Date().toISOString()
      });
      added++;
    }
  });

  fs.writeFileSync(TARGETS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  console.log(`✅ [Target Feeder] Successfully added ${added} high-value commercial targets into audit queue!`);
  console.log(`📊 Total Active Audit Pipeline: ${existing.length} domains.`);
}

feedTargets();
