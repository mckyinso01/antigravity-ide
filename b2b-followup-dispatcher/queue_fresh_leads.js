import fs from 'fs';
import path from 'path';

const allLeadsPath = path.resolve('src/leads.json');

const leadsData = JSON.parse(fs.readFileSync(allLeadsPath, 'utf8'));

const freshProspects = [
  {
    id: "lead-maritime-001",
    campaign: "bunkertrust",
    organization: "A.P. Moller - Maersk",
    company: "A.P. Moller - Maersk",
    executiveName: "Claus Hermansen",
    title: "Global Head of Marine Fuel Sourcing & EU ETS Compliance",
    linkedin: "https://www.linkedin.com/company/maersk-group",
    email: "claus.hermansen@maersk.com",
    budget: "$48,000 (Flat Perpetual)",
    demoUrl: "https://bunkertrust.linkable.it.com",
    priorityHook: "Real-time Coriolis MFM aeration theft detection & FuelEU Maritime penalty ledger",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-maritime-002",
    campaign: "bunkertrust",
    organization: "Mediterranean Shipping Company (MSC)",
    company: "Mediterranean Shipping Company (MSC)",
    executiveName: "Gianluigi Aponte",
    title: "VP Technical Management & Decarbonization",
    linkedin: "https://www.linkedin.com/company/msc-mediterranean-shipping-company",
    email: "technical.fleet@msc.com",
    budget: "$48,000 (Flat Perpetual)",
    demoUrl: "https://bunkertrust.linkable.it.com",
    priorityHook: "Automated EU ETS 50%/100% scope calculation & ISO 8217 lab spec validation",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-maritime-003",
    campaign: "bunkertrust",
    organization: "Hapag-Lloyd AG",
    company: "Hapag-Lloyd AG",
    executiveName: "Jan Holst",
    title: "Global Director of Fleet Performance & Fuel Strategy",
    linkedin: "https://www.linkedin.com/company/hapag-lloyd-ag",
    email: "jan.holst@hlag.com",
    budget: "$48,000 (Flat Perpetual)",
    demoUrl: "https://bunkertrust.linkable.it.com",
    priorityHook: "Coriolis mass flow verification and IMO CII rating optimization",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-maritime-004",
    campaign: "bunkertrust",
    organization: "Euronav NV",
    company: "Euronav NV",
    executiveName: "Rustin Edwards",
    title: "Head of Global Fuel Procurement & Tanker Bunkering",
    linkedin: "https://www.linkedin.com/company/euronav",
    email: "bunkers@euronav.com",
    budget: "$48,000 (Flat Perpetual)",
    demoUrl: "https://bunkertrust.linkable.it.com",
    priorityHook: "Stopping micro-bubble cappuccino aeration loss at bunkering manifold",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-maritime-005",
    campaign: "bunkertrust",
    organization: "DFDS Seaways",
    company: "DFDS Seaways",
    executiveName: "Torben Carlsen",
    title: "CEO & Technical Sustainability Oversight",
    linkedin: "https://www.linkedin.com/company/dfds",
    email: "tcarlsen@dfds.com",
    budget: "$48,000 (Flat Perpetual)",
    demoUrl: "https://bunkertrust.linkable.it.com",
    priorityHook: "100% Intra-EU scope EU ETS tax and multi-tank biofuel blending ledger",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-pharma-001",
    campaign: "pharmaguard",
    organization: "Pfizer Global Supply",
    company: "Pfizer Global Supply",
    executiveName: "Dr. Sarah Jenkins",
    title: "VP Global Cold Chain Quality & Regulatory Compliance",
    linkedin: "https://www.linkedin.com/company/pfizer",
    email: "sarah.jenkins.qa@pfizer.com",
    budget: "$58,500 (Flat Perpetual)",
    demoUrl: "https://pharmaguard.linkable.it.com",
    priorityHook: "USP <1079> Arrhenius Mean Kinetic Temperature stability math & FDA CAPA automation",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-pharma-002",
    campaign: "pharmaguard",
    organization: "Novartis International AG",
    company: "Novartis International AG",
    executiveName: "Marc Thorens",
    title: "Head of Technical Operations & GDP Quality",
    linkedin: "https://www.linkedin.com/company/novartis",
    email: "marc.thorens@novartis.com",
    budget: "$58,500 (Flat Perpetual)",
    demoUrl: "https://pharmaguard.linkable.it.com",
    priorityHook: "Multi-depot cryogenic telemetry & dual-witness GMP electronic signature gate",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-pharma-003",
    campaign: "pharmaguard",
    organization: "Roche Diagnostics / Genentech",
    company: "Roche Diagnostics / Genentech",
    executiveName: "Elena Rostova",
    title: "Director of Validation, Temperature Control & GDP",
    linkedin: "https://www.linkedin.com/company/roche",
    email: "elena.rostova@roche.com",
    budget: "$58,500 (Flat Perpetual)",
    demoUrl: "https://pharmaguard.linkable.it.com",
    priorityHook: "Instant FDA Form 483-defensive CAPA dossier export and NIST sensor calibration health",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-pharma-004",
    campaign: "pharmaguard",
    organization: "Moderna Therapeutics",
    company: "Moderna Therapeutics",
    executiveName: "David Sterling",
    title: "Senior Director Global Logistics QA",
    linkedin: "https://www.linkedin.com/company/modernatx",
    email: "david.sterling@modernatx.com",
    budget: "$58,500 (Flat Perpetual)",
    demoUrl: "https://pharmaguard.linkable.it.com",
    priorityHook: "-80°C to -150°C excursion modeling & 21 CFR Part 11 compliant audit trail",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  },
  {
    id: "lead-pharma-005",
    campaign: "pharmaguard",
    organization: "Lonza Group",
    company: "Lonza Group",
    executiveName: "Hanspeter Meier",
    title: "VP Global Drug Distribution & Quality",
    linkedin: "https://www.linkedin.com/company/lonza",
    email: "hanspeter.meier@lonza.com",
    budget: "$58,500 (Flat Perpetual)",
    demoUrl: "https://pharmaguard.linkable.it.com",
    priorityHook: "Eliminating batch waste via kinetic activation energy decay curves",
    currentTouchpoint: 1,
    status: "QUEUED_LIVE"
  }
];

const existingIds = new Set(leadsData.map(l => l.id));
let added = 0;

freshProspects.reverse().forEach(p => {
  if (!existingIds.has(p.id)) {
    leadsData.unshift(p);
    added++;
  }
});

fs.writeFileSync(allLeadsPath, JSON.stringify(leadsData, null, 2), 'utf8');
console.log(`✅ Successfully queued ${added} fresh Maritime & Pharma flagship leads at top of leads.json!`);
