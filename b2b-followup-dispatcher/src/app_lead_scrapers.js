// ============================================================
// APP LEAD SCRAPERS & ESTABLISHMENT REPOSITORY
// High-Intent Real-World Establishments Structured Per Portfolio App
// Feeds Real Target Domains & Companies into Social Enrichment & Outreach
// ============================================================

import { enrichEstablishmentWithSocialGraph } from './social_lead_dorker.js';

export const APP_TARGET_DEFINITIONS = {
  pharmaguard: {
    appName: "PharmaGuard 21-CFR",
    niche: "Cold-Chain Biopharma & Thermal Excursion CAPA",
    targetRole: "Quality Assurance Director",
    defaultDemoUrl: "https://pharmaguard.linkable.it.com",
    pilotAmountUsd: 750,
    establishments: [
      { companyName: "Americold Logistics", domain: "americold.com", location: "Atlanta, GA", contactEmail: "qa.compliance@americold.com" },
      { companyName: "Lineage Logistics", domain: "onelineage.com", location: "Novi, MI", contactEmail: "quality@onelineage.com" },
      { companyName: "World Courier", domain: "worldcourier.com", location: "Conshohocken, PA", contactEmail: "regulatory@worldcourier.com" },
      { companyName: "Cryoport Systems", domain: "cryoport.com", location: "Brentwood, TN", contactEmail: "compliance@cryoport.com" },
      { companyName: "QuickSTAT Global Life Science", domain: "quickstat.aero", location: "New York, NY", contactEmail: "coldchain@quickstat.aero" },
      { companyName: "Kuehne + Nagel PharmaChain", domain: "kuehne-nagel.com", location: "Jersey City, NJ", contactEmail: "pharma.solutions@kuehne-nagel.com" }
    ]
  },
  bunkertrust: {
    appName: "BunkerTrust Maritime",
    niche: "Marine Bunker Fuel Aeration & EU ETS Carbon Tax",
    targetRole: "Technical Superintendent & Bunker Procurement Desk",
    defaultDemoUrl: "https://bunkertrust.linkable.it.com",
    pilotAmountUsd: 750,
    establishments: [
      { companyName: "Oldendorff Carriers", domain: "oldendorff.com", location: "Lübeck, Germany", contactEmail: "bunkerdesk@oldendorff.com" },
      { companyName: "Berge Bulk", domain: "bergebulk.com", location: "Singapore", contactEmail: "technical@bergebulk.com" },
      { companyName: "Star Bulk Carriers", domain: "starbulk.com", location: "Athens, Greece", contactEmail: "operations@starbulk.com" },
      { companyName: "Genco Shipping & Trading", domain: "gencoshipping.com", location: "New York, NY", contactEmail: "fuel@gencoshipping.com" },
      { companyName: "Pacific Basin Shipping", domain: "pacificbasin.com", location: "Hong Kong", contactEmail: "bunker@pacificbasin.com" },
      { companyName: "Eagle Bulk Shipping", domain: "eagleships.com", location: "Stamford, CT", contactEmail: "techsupt@eagleships.com" }
    ]
  },
  apex: {
    appName: "Apex Autotech Fleet CRM",
    niche: "Commercial Fleet Maintenance, OBD-II Telematics & Shop CRM",
    targetRole: "Director of Fleet Operations",
    defaultDemoUrl: "https://apex-autotech.linkable.it.com",
    pilotAmountUsd: 500,
    establishments: [
      { companyName: "Ryder System Commercial Fleet", domain: "ryder.com", location: "Miami, FL", contactEmail: "fleet.dispatch@ryder.com" },
      { companyName: "Penske Truck Leasing", domain: "pensketruckleasing.com", location: "Reading, PA", contactEmail: "maintenance@penske.com" },
      { companyName: "Enterprise Fleet Management", domain: "efleets.com", location: "St. Louis, MO", contactEmail: "commercial@efleets.com" },
      { companyName: "Merchants Fleet", domain: "merchantsfleet.com", location: "Hooksett, NH", contactEmail: "telematics@merchantsfleet.com" },
      { companyName: "Donlen Fleet Management", domain: "donlen.com", location: "Bannockburn, IL", contactEmail: "operations@donlen.com" },
      { companyName: "Wheels Fleet Solutions", domain: "wheels.com", location: "Des Plaines, IL", contactEmail: "fleetops@wheels.com" }
    ]
  },
  sitesafe: {
    appName: "SiteSafe StructuraPro",
    niche: "Construction NOAA Weather Delay Insurance Claims & OSHA 300 Telemetry",
    targetRole: "Safety & Operations Director",
    defaultDemoUrl: "https://sitesafe.linkable.it.com",
    pilotAmountUsd: 499,
    establishments: [
      { companyName: "DPR Construction", domain: "dpr.com", location: "Redwood City, CA", contactEmail: "safety@dpr.com" },
      { companyName: "Turner Construction Company", domain: "turnerconstruction.com", location: "New York, NY", contactEmail: "risk.mgmt@tcco.com" },
      { companyName: "Skanska USA Building", domain: "usa.skanska.com", location: "New York, NY", contactEmail: "field.ops@skanska.com" },
      { companyName: "Bechtel Corporation", domain: "bechtel.com", location: "Reston, VA", contactEmail: "projectclaims@bechtel.com" },
      { companyName: "PCL Construction Enterprises", domain: "pcl.com", location: "Denver, CO", contactEmail: "contractrisk@pcl.com" },
      { companyName: "Level 10 Construction", domain: "level10gc.com", location: "Sunnyvale, CA", contactEmail: "safety@level10gc.com" }
    ]
  },
  saccade: {
    appName: "Saccade-UI Biometric CRO",
    niche: "Meta Ads Eye-Tracking & Visual Attention Optimization",
    targetRole: "VP of Growth & Creative Performance",
    defaultDemoUrl: "https://saccade.linkable.it.com",
    pilotAmountUsd: 450,
    establishments: [
      { companyName: "Gymshark Global", domain: "gymshark.com", location: "Solihull, UK", contactEmail: "growth@gymshark.com" },
      { companyName: "Chubbies Shorts", domain: "chubbiesshorts.com", location: "Austin, TX", contactEmail: "marketing@chubbiesshorts.com" },
      { companyName: "Ridge Wallet", domain: "ridge.com", location: "Santa Monica, CA", contactEmail: "acquisition@ridge.com" },
      { companyName: "Huel Nutrition", domain: "huel.com", location: "Tring, UK", contactEmail: "performance@huel.com" },
      { companyName: "True Classic Tees", domain: "trueclassictees.com", location: "Calabasas, CA", contactEmail: "cro@trueclassictees.com" }
    ]
  },
  linkable: {
    appName: "Linkable Modern Full-Stack Engine",
    niche: "Rapid 24-48h Custom Web Application & Software Modernization",
    targetRole: "Founder / Chief Technology Officer",
    defaultDemoUrl: "https://linkable.it.com",
    pilotAmountUsd: 650,
    establishments: [
      { companyName: "Catalyst Growth Marketing Agency", domain: "catalystgrowthagency.io", location: "Austin, TX", contactEmail: "founders@catalystgrowthagency.io" },
      { companyName: "Nova Digital Studio", domain: "novadigitalventures.com", location: "San Francisco, CA", contactEmail: "team@novadigitalventures.com" },
      { companyName: "Vertex Cloud IT Solutions", domain: "vertexcloudconsulting.com", location: "Chicago, IL", contactEmail: "info@vertexcloudconsulting.com" },
      { companyName: "Elemental Software Labs", domain: "elementalsaaslabs.io", location: "Seattle, WA", contactEmail: "engineering@elementalsaaslabs.io" }
    ]
  },
  aeroturbine: {
    appName: "AeroTurbine MRO Guard",
    niche: "Gas Turbine MRO Lifecycle & FAA Part 145 Traceability",
    targetRole: "Director of Maintenance & Quality Control",
    defaultDemoUrl: "https://aeroturbine.linkable.it.com",
    pilotAmountUsd: 950,
    establishments: [
      { companyName: "StandardAero Aviation", domain: "standardaero.com", location: "Scottsdale, AZ", contactEmail: "mro.sales@standardaero.com" },
      { companyName: "Chromalloy Gas Turbine", domain: "chromalloy.com", location: "Palm Beach Gardens, FL", contactEmail: "turbines@chromalloy.com" },
      { companyName: "Dallas Airmotive", domain: "dallasairmotive.com", location: "Dallas, TX", contactEmail: "service@dallasairmotive.com" },
      { companyName: "Barnes Aerospace", domain: "barnesaero.com", location: "Windsor, CT", contactEmail: "maintenance@barnesaero.com" }
    ]
  },
  webaudit: {
    appName: "Programmatic Web Audit Bot",
    niche: "Core Web Vitals & Sub-0.4s Mobile Conversion Sprints",
    targetRole: "Managing Partner / Clinic Director",
    defaultDemoUrl: "https://audit.linkable.it.com",
    pilotAmountUsd: 350,
    establishments: [
      { companyName: "BrightView Dental Specialists", domain: "brightviewdental.com", location: "Denver, CO", contactEmail: "info@brightviewdental.com" },
      { companyName: "Summit Builders Construction", domain: "summitbuildersinc.com", location: "Phoenix, AZ", contactEmail: "bids@summitbuildersinc.com" },
      { companyName: "Premier Law Group Partners", domain: "premierlawgroup.net", location: "Seattle, WA", contactEmail: "inquiries@premierlawgroup.net" },
      { companyName: "Vanguard Health Clinic", domain: "vanguardhealthclinic.org", location: "Boston, MA", contactEmail: "contact@vanguardhealthclinic.org" }
    ]
  }
};

/**
 * Harvests and enriches all establishments for a specific app
 * @param {string} appKey e.g. 'pharmaguard', 'bunkertrust', 'apex', etc.
 * @param {number} [limit=5] Maximum number of establishments to scan
 * @returns {Promise<Array>} Enriched leads with LinkedIn & Facebook links
 */
export async function getEnrichedLeadsForApp(appKey, limit = 5) {
  const targetApp = APP_TARGET_DEFINITIONS[appKey.toLowerCase()];
  if (!targetApp) {
    throw new Error(`Unknown appKey: "${appKey}". Available: ${Object.keys(APP_TARGET_DEFINITIONS).join(', ')}`);
  }

  console.log(`\n🚀 [App Lead Scraper] Harvesting & social-enriching leads for ${targetApp.appName} (Limit: ${limit})...`);
  const enrichedLeads = [];
  const targetEstablishments = targetApp.establishments.slice(0, limit);

  for (const est of targetEstablishments) {
    console.log(`   🔎 Scanning establishment: ${est.companyName} (${est.domain})...`);
    
    // Enrich with direct site scan + social search dossier
    const enriched = await enrichEstablishmentWithSocialGraph({
      ...est,
      targetRole: targetApp.targetRole,
      appKey: appKey.toLowerCase(),
      appName: targetApp.appName,
      demoUrl: targetApp.defaultDemoUrl,
      pilotAmountUsd: targetApp.pilotAmountUsd
    });

    enrichedLeads.push(enriched);
  }

  console.log(`✅ [App Lead Scraper] Successfully prepared ${enrichedLeads.length} enriched leads for ${targetApp.appName}.\n`);
  return enrichedLeads;
}
