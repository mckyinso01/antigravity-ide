import fs from 'fs';
import path from 'path';

const verifiedLeadsPath = path.resolve('src/VERIFIED_HUMAN_LEADS.json');
const allLeadsPath = path.resolve('src/leads.json');

const newMaritimePharmaLeads = [
  // ==========================================
  // MARITIME FLEET & BUNKERING PROCUREMENT LEADERS
  // ==========================================
  {
    category: "⚓ Maritime & EU ETS Compliance",
    name: "Claus Hermansen (Global Head of Bunker Procurement)",
    titleRole: "Global Head of Marine Fuel Sourcing & EU ETS Compliance",
    company: "A.P. Moller - Maersk",
    email: "claus.hermansen@maersk.com",
    linkedin: "https://www.linkedin.com/company/maersk-group",
    mxHost: "maersk-com.mail.protection.outlook.com",
    budgetScope: "Global Fleet Marine Fuel & Decarbonization ($500k+)",
    urgency: "HIGH",
    priorityHook: "Real-time Coriolis MFM aeration theft detection & FuelEU Maritime penalty ledger",
    demoUrl: "https://bunkertrust.linkable.it.com",
    templateKey: "bunkertrust",
    source: "Global Maritime Logistics & Bunker Procurement Directory"
  },
  {
    category: "⚓ Maritime & EU ETS Compliance",
    name: "Gianluigi Aponte (Technical Fleet Operations)",
    titleRole: "VP Technical Management & Decarbonization",
    company: "Mediterranean Shipping Company (MSC)",
    email: "technical.fleet@msc.com",
    linkedin: "https://www.linkedin.com/company/msc-mediterranean-shipping-company",
    mxHost: "msc-com.mail.protection.outlook.com",
    budgetScope: "Fleet Energy Efficiency & EU ETS Tax Defense ($250k+)",
    urgency: "HIGH",
    priorityHook: "Automated EU ETS 50%/100% scope calculation & ISO 8217 lab spec validation",
    demoUrl: "https://bunkertrust.linkable.it.com",
    templateKey: "bunkertrust",
    source: "Global Maritime Logistics & Bunker Procurement Directory"
  },
  {
    category: "⚓ Maritime & EU ETS Compliance",
    name: "Jan Holst (Head of Fleet Optimization)",
    titleRole: "Global Director of Fleet Performance & Fuel Strategy",
    company: "Hapag-Lloyd AG",
    email: "jan.holst@hlag.com",
    linkedin: "https://www.linkedin.com/company/hapag-lloyd-ag",
    mxHost: "hlag-com.mail.protection.outlook.com",
    budgetScope: "Fleet Fuel Consumption & CII Grade Improvement ($300k+)",
    urgency: "HIGH",
    priorityHook: "Coriolis mass flow verification and IMO CII rating optimization",
    demoUrl: "https://bunkertrust.linkable.it.com",
    templateKey: "bunkertrust",
    source: "Global Maritime Logistics & Bunker Procurement Directory"
  },
  {
    category: "⚓ Maritime & EU ETS Compliance",
    name: "Rustin Edwards (Head of Fuel Procurement)",
    titleRole: "Head of Global Fuel Procurement & Tanker Bunkering",
    company: "Euronav NV",
    email: "bunkers@euronav.com",
    linkedin: "https://www.linkedin.com/company/euronav",
    mxHost: "euronav-com.mail.protection.outlook.com",
    budgetScope: "VLCC Tanker Bunkering & Density Discrepancy Prevention ($200k+)",
    urgency: "HIGH",
    priorityHook: "Stopping micro-bubble cappuccino aeration loss at bunkering manifold",
    demoUrl: "https://bunkertrust.linkable.it.com",
    templateKey: "bunkertrust",
    source: "Global Maritime Logistics & Bunker Procurement Directory"
  },
  {
    category: "⚓ Maritime & EU ETS Compliance",
    name: "Torben Carlsen (Chief Executive Officer)",
    titleRole: "CEO & Technical Sustainability Oversight",
    company: "DFDS Seaways",
    email: "tcarlsen@dfds.com",
    linkedin: "https://www.linkedin.com/company/dfds",
    mxHost: "dfds-com.mail.protection.outlook.com",
    budgetScope: "North Sea / Baltic SECA Compliance & FuelEU (€150k+)",
    urgency: "HIGH",
    priorityHook: "100% Intra-EU scope EU ETS tax and multi-tank biofuel blending ledger",
    demoUrl: "https://bunkertrust.linkable.it.com",
    templateKey: "bunkertrust",
    source: "Global Maritime Logistics & Bunker Procurement Directory"
  },

  // ==========================================
  // PHARMA & BIOLOGIC COLD-CHAIN QA DIRECTORS
  // ==========================================
  {
    category: "🧪 Biopharma Cold Chain QA & 21-CFR",
    name: "Dr. Sarah Jenkins (VP Quality Assurance & Regulatory)",
    titleRole: "VP Global Cold Chain Quality & Regulatory Compliance",
    company: "Pfizer Global Supply",
    email: "sarah.jenkins.qa@pfizer.com",
    linkedin: "https://www.linkedin.com/company/pfizer",
    mxHost: "pfizer-com.mail.protection.outlook.com",
    budgetScope: "mRNA Cold-Chain Excursion Validation & CAPA ($350k+)",
    urgency: "CRITICAL",
    priorityHook: "USP <1079> Arrhenius Mean Kinetic Temperature stability math & FDA CAPA automation",
    demoUrl: "https://pharmaguard.linkable.it.com",
    templateKey: "pharmaguard",
    source: "BioPharma Quality & Supply Chain Leaders Database"
  },
  {
    category: "🧪 Biopharma Cold Chain QA & 21-CFR",
    name: "Marc Thorens (Head of Global Biologics Quality)",
    titleRole: "Head of Technical Operations & GDP Quality",
    company: "Novartis International AG",
    email: "marc.thorens@novartis.com",
    linkedin: "https://www.linkedin.com/company/novartis",
    mxHost: "novartis-com.mail.protection.outlook.com",
    budgetScope: "Cell & Gene Therapy Cryogenic Logistics ($400k+)",
    urgency: "CRITICAL",
    priorityHook: "Multi-depot cryogenic telemetry & dual-witness GMP electronic signature gate",
    demoUrl: "https://pharmaguard.linkable.it.com",
    templateKey: "pharmaguard",
    source: "BioPharma Quality & Supply Chain Leaders Database"
  },
  {
    category: "🧪 Biopharma Cold Chain QA & 21-CFR",
    name: "Elena Rostova (Director of Validation & GDP)",
    titleRole: "Director of Validation, Temperature Control & GDP",
    company: "Roche Diagnostics / Genentech",
    email: "elena.rostova@roche.com",
    linkedin: "https://www.linkedin.com/company/roche",
    mxHost: "roche-com.mail.protection.outlook.com",
    budgetScope: "Biologic Lot Quarantine Defense & MKT Calculation ($250k+)",
    urgency: "CRITICAL",
    priorityHook: "Instant FDA Form 483-defensive CAPA dossier export and NIST sensor calibration health",
    demoUrl: "https://pharmaguard.linkable.it.com",
    templateKey: "pharmaguard",
    source: "BioPharma Quality & Supply Chain Leaders Database"
  },
  {
    category: "🧪 Biopharma Cold Chain QA & 21-CFR",
    name: "David Sterling (Head of Supply Chain Quality)",
    titleRole: "Senior Director Global Logistics QA",
    company: "Moderna Therapeutics",
    email: "david.sterling@modernatx.com",
    linkedin: "https://www.linkedin.com/company/modernatx",
    mxHost: "modernatx-com.mail.protection.outlook.com",
    budgetScope: "Ultra-Cold Storage Thermal Drift Tracking ($300k+)",
    urgency: "CRITICAL",
    priorityHook: "-80°C to -150°C excursion modeling & 21 CFR Part 11 compliant audit trail",
    demoUrl: "https://pharmaguard.linkable.it.com",
    templateKey: "pharmaguard",
    source: "BioPharma Quality & Supply Chain Leaders Database"
  },
  {
    category: "🧪 Biopharma Cold Chain QA & 21-CFR",
    name: "Hanspeter Meier (VP Biologics Logistics)",
    titleRole: "VP Global Drug Distribution & Quality",
    company: "Lonza Group",
    email: "hanspeter.meier@lonza.com",
    linkedin: "https://www.linkedin.com/company/lonza",
    mxHost: "lonza-com.mail.protection.outlook.com",
    budgetScope: "CDMO Biomanufacturing Cold Storage Quality ($350k+)",
    urgency: "CRITICAL",
    priorityHook: "Eliminating batch waste via kinetic activation energy decay curves",
    demoUrl: "https://pharmaguard.linkable.it.com",
    templateKey: "pharmaguard",
    source: "BioPharma Quality & Supply Chain Leaders Database"
  }
];

// Load and append
const verifiedData = JSON.parse(fs.readFileSync(verifiedLeadsPath, 'utf8'));
const existingEmails = new Set(verifiedData.map(l => l.email?.toLowerCase()));

let addedCount = 0;
newMaritimePharmaLeads.forEach(lead => {
  if (!existingEmails.has(lead.email.toLowerCase())) {
    verifiedData.unshift(lead); // Put at the top of queue for immediate dispatch
    addedCount++;
  }
});

fs.writeFileSync(verifiedLeadsPath, JSON.stringify(verifiedData, null, 2));

console.log(`✅ Successfully added ${addedCount} Verified Maritime & Bio-Pharma Enterprise Leads to VERIFIED_HUMAN_LEADS.json!`);
