// ==========================================================================
// FACEBOOK & META PAIN POINT RADAR HARVESTER
// Real-time Extraction of High-Intent Business Grievances & Instant Matching
// ==========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RADAR_FILE = path.join(__dirname, '../HOT_LIVE_INBOUND_LEAD_RADAR.json');
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Real-World Pain Point Archetypes Harvested from Meta Business Communities
export const TARGET_PAIN_POINT_CATEGORIES = [
  {
    category: "Cold-Chain & Pharma Regulatory Hinaing",
    keywords: ["cold storage temperature excursion", "biologics spoiled", "FDA 21 CFR CAPA", "USP 1079 compliance", "pharma warehouse sensor"],
    matchedWeapon: "PharmaGuard 21-CFR",
    demoUrl: "https://pharmaguard.linkable.it.com",
    campaign: "pharmaguard",
    generatePitch: (lead) => `Hi ${lead.clientName},\n\nSaw your post regarding challenges with ${lead.scope}.\n\nWhen cold storage fluctuates, throwing away expensive inventory or failing FDA inspections is a massive headache. We engineered an automated, zero-lockin OS:\n👉 Live Sandbox: https://pharmaguard.linkable.it.com\n\n• USP <1079> Mean Kinetic Temperature Arrhenius stability math (proves batch safety to FDA auditors)\n• 60fps real-time sensor waveform & automated 5-Whys Ishikawa root-cause CAPA dossiers\n• 48-Hour Validation Pilot ($750 refundable deposit)\n\nLet me know if you'd like a 10-minute walkthrough!\n\nBest regards,\nMharc Gatan | PharmaGuard 21-CFR\nmharcgatan@linkable.it.com`
  },
  {
    category: "Maritime Bunker Fuel & EU ETS Carbon Tax Hinaing",
    keywords: ["bunker fuel discrepancy", "cappuccino effect aeration", "EU ETS shipping tax", "FuelEU penalty", "charter party laytime fuel dispute"],
    matchedWeapon: "BunkerTrust Maritime",
    demoUrl: "https://bunkertrust.linkable.it.com",
    campaign: "bunkertrust",
    generatePitch: (lead) => `Hi ${lead.clientName},\n\nNoticed your discussion regarding ${lead.scope}.\n\nMicro-bubble aeration ("Cappuccino effect") costs shipowners $40K-$100K per bunker delivery, while EU ETS Directive 2023/959 adds €75.50/t in carbon liabilities.\n\nWe built a high-precision Swiss daylight ledger solving this:\n👉 Live Sandbox: https://bunkertrust.linkable.it.com\n\n• Real-time Coriolis MFM apparent density aeration intercept\n• 100% Intra-EU / 50% Extra-EU automated carbon tax & FuelEU €2,400/t penalty forecaster\n• Dual-witness STCW III/2 WORM SHA-256 cryptographic Bunker Delivery Notes\n\nOpen to running a 48-hour pilot on your next bunkering voyage?\n\nBest regards,\nMharc Gatan | BunkerTrust Maritime\nmharcgatan@linkable.it.com`
  },
  {
    category: "Construction Delay Claims & Subcontractor Safety Hinaing",
    keywords: ["rain day dispute general contractor", "weather delay insurance claim", "OSHA 300 logs headache", "subcontractor compliance tracking", "construction project delay"],
    matchedWeapon: "SiteSafe StructuraPro",
    demoUrl: "https://sitesafe.linkable.it.com",
    campaign: "sitesafe",
    generatePitch: (lead) => `Hi ${lead.clientName},\n\nSaw your post regarding ${lead.scope}.\n\nMost general contractors lose tens of thousands on un-certified rain day disputes and manual safety logs.\n\nWe built an automated operating system:\n👉 Live Sandbox: https://sitesafe.linkable.it.com\n\n• Automated NOAA-certified weather delay insurance claim generator (1-click audit-proof PDF)\n• Dynamic CPM Gantt & geofenced OSHA 300 / 300A compliance sentinel\n• 48-Hour dedicated project trial ($499 refundable deposit)\n\nWould your operations team be open for a quick 10-minute demo?\n\nBest regards,\nMharc Gatan | SiteSafe AI\nmharcgatan@linkable.it.com`
  },
  {
    category: "Meta Ads Fatigue & Low Conversion Rate Hinaing",
    keywords: ["meta ads high CPC low ROAS", "ad creative fatigue facebook", "landing page dropoff", "need CRO audit", "shopify store traffic no sales"],
    matchedWeapon: "Saccade-UI Biometric CRO",
    demoUrl: "https://saccade.linkable.it.com",
    campaign: "saccade",
    generatePitch: (lead) => `Hi ${lead.clientName},\n\nSaw your post regarding ${lead.scope}.\n\nInstead of burning ad spend on guessing which creative hooks work, our engine uses the biological Itti-Koch visual attention algorithm to generate instant GPU eye-tracking heatmaps:\n👉 Live Sandbox: https://saccade.linkable.it.com\n\n• Sub-5ms client-side fixation & visual saliency predictions\n• Fixes background visual distraction before launching campaigns\n• $450 Fast Campaign Audit or $9,500 Perpetual Software License\n\nSend over 1 ad image or landing page URL and I'll generate a free visual fixation audit for you!\n\nBest regards,\nMharc Gatan | Saccade-UI\nmharcgatan@linkable.it.com`
  },
  {
    category: "Custom Web App / SaaS Urgent Build Hinaing",
    keywords: ["looking for full stack developer", "need custom web app ASAP", "looking for developer to fix buggy software", "need SaaS MVP 48 hours", "sino marunong gumawa ng system"],
    matchedWeapon: "Linkable Modern Full-Stack Engine",
    demoUrl: "https://linkable.it.com",
    campaign: "clinical", // or rapid web
    generatePitch: (lead) => `Hi ${lead.clientName},\n\nSaw your post seeking a developer for ${lead.scope}.\n\nInstead of long onboarding delays or static mockups, we deliver production web platforms on rapid 24-48 hour functional sprints.\n\n👉 Live Portfolio: https://linkable.it.com\n\n• 100/100 Lighthouse Performance & Sub-0.4s DOM Paint\n• Zero-Vendor-Lockin clean JavaScript/Node/Tailwind architecture\n• $650 Milestone Escrow to start today (balance upon 100% completion)\n\nWhat specific features are needed first? I can turn around a live interactive draft within 24 hours!\n\nBest regards,\nMharc Gatan | Linkable Systems\nmharcgatan@linkable.it.com`
  }
];

export function harvestAndMatchFreshLeads(rawPosts) {
  const radar = fs.existsSync(RADAR_FILE) ? JSON.parse(fs.readFileSync(RADAR_FILE, 'utf8')) : [];
  const leads = fs.existsSync(LEADS_FILE) ? JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')) : [];

  let newHarvestedCount = 0;

  rawPosts.forEach((post, index) => {
    const postText = (post.title + ' ' + post.content).toLowerCase();
    
    // Match against our 5 weapon categories
    let bestMatch = null;
    for (const cat of TARGET_PAIN_POINT_CATEGORIES) {
      const hasKeyword = cat.keywords.some(kw => postText.includes(kw.toLowerCase()));
      if (hasKeyword) {
        bestMatch = cat;
        break;
      }
    }

    if (!bestMatch) {
      bestMatch = TARGET_PAIN_POINT_CATEGORIES[4]; // Default to Custom Web Engine
    }

    const leadId = `fb-radar-${Date.now()}-${index}`;
    const formattedLead = {
      id: leadId,
      sourcePlatform: post.groupOrPlatform || "Facebook Business & Tech Community",
      clientTitle: post.title || "Urgent Solution Needed",
      clientName: post.authorName || "Business Decision-Maker",
      contactMethod: post.contactMethod || "Facebook Messenger / Email",
      contactEmail: post.contactEmail || "inquiry@clientdomain.com",
      budget: post.budget || "$800 - $3,500 Fixed",
      urgency: post.urgency || "HIGH (Immediate Start)",
      scope: post.content,
      matchedWeapon: bestMatch.matchedWeapon,
      liveDemoLink: bestMatch.demoUrl,
      pitchDM: bestMatch.generatePitch({
        clientName: post.authorName || "there",
        scope: post.title || post.content
      }),
      status: "QUEUED_FOR_DISPATCH",
      harvestedAt: new Date().toISOString()
    };

    // Check duplicate
    const exists = radar.some(r => r.scope === formattedLead.scope || (r.contactEmail === formattedLead.contactEmail && r.contactEmail !== "inquiry@clientdomain.com"));
    if (!exists) {
      radar.unshift(formattedLead);
      newHarvestedCount++;

      // Also append to main leads.json if email exists
      if (formattedLead.contactEmail && formattedLead.contactEmail.includes('@') && !formattedLead.contactEmail.includes('clientdomain.com')) {
        leads.unshift({
          id: leadId,
          campaign: bestMatch.campaign,
          organization: formattedLead.clientName,
          company: formattedLead.clientName,
          executiveName: formattedLead.clientName,
          title: "Inquiring Decision-Maker",
          email: formattedLead.contactEmail,
          budget: formattedLead.budget,
          demoUrl: formattedLead.liveDemoLink,
          priorityHook: formattedLead.scope,
          currentTouchpoint: 1,
          status: "QUEUED_LIVE"
        });
      }
    }
  });

  fs.writeFileSync(RADAR_FILE, JSON.stringify(radar, null, 2), 'utf8');
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');

  console.log(`\n🎉 [HARVEST COMPLETE] Successfully harvested & matched ${newHarvestedCount} fresh Facebook pain-point leads!`);
  return { newHarvestedCount, totalInRadar: radar.length };
}

// Sample execution with live test posts
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sampleFacebookPosts = [
    {
      groupOrPlatform: "Facebook Group: E-Commerce Brand Owners Philippines",
      authorName: "Ramon Castillo (E-Com Brand Director)",
      title: "Meta Ads high CPC low ROAS and landing page dropoff issue",
      content: "Sobrang taas ng cost per acquisition namin sa Facebook and Meta ads ngayon. Traffic is clicking but dropping off before checkout on Shopify. Need a CRO audit or someone who can analyze our ad visual hook and landing page layout ASAP.",
      contactEmail: "ramon@castillobrands.ph",
      budget: "$1,500 - $3,000",
      urgency: "CRITICAL"
    },
    {
      groupOrPlatform: "Facebook Group: Logistics & Cold Storage Operators PH",
      authorName: "Engr. Patrick Villanueva",
      title: "Need custom cold storage temperature excursion monitoring system",
      content: "Naghahanap kami ng automated cold storage temperature monitoring software na may USP 1079 compliance at instant excursion alerts para sa aming pharmaceutical warehouse sa Laguna. Manual excel logs are failing audit.",
      contactEmail: "pvillanueva@apexlogistics.com.ph",
      budget: "$5,000 - $12,000",
      urgency: "HIGH"
    },
    {
      groupOrPlatform: "Facebook Group: Construction Contractors & Project Managers PH",
      authorName: "Archt. Jojo Mendoza",
      title: "Weather delay insurance claim and rain day dispute general contractor",
      content: "Palaging may dispute sa client regarding rain days at weather delay claims. We need automated weather delay insurance claim generator connected to NOAA / Pagasa data with CPM Gantt schedule tracking.",
      contactEmail: "jojo.mendoza@mendozaconstruct.ph",
      budget: "$2,500 - $6,000",
      urgency: "HIGH"
    }
  ];

  harvestAndMatchFreshLeads(sampleFacebookPosts);
}
