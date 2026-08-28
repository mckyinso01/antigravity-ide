// ============================================================
// Top 20 Richest & High-Purchasing-Power Global Enterprise Leads Fleet
// Countries: US, UK, CH, SG, UAE, AU, CA, DE, NO, NL, SE, DK, IE, SA, QA, JP, KR, NZ, HK, LU
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LEADS_FILE = path.join(__dirname, 'src', 'leads.json');

let currentLeads = [];
if (fs.existsSync(LEADS_FILE)) {
  currentLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
}

const GLOBAL_TOP20_TARGETS = [
  // 🇸🇬 Singapore (Top MedTech, Hospital & Logistics Hub)
  {
    id: "lead-g20-sg-001",
    country: "Singapore",
    currency: "SGD / USD",
    campaign: "clinical",
    organization: "SingHealth / Singapore General Hospital",
    company: "Singapore General Hospital (SingHealth)",
    executiveName: "Chief Information Officer & Digital Health Lead",
    title: "Group Chief Information Officer",
    linkedin: "https://www.linkedin.com/company/singhealth",
    email: "cio.digital@singhealth.com.sg",
    budget: "$65,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "Sub-second multi-waveform ICU telemetry & 1-Click HL7/FHIR EHR migration for smart hospital wards",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-sg-002",
    country: "Singapore",
    currency: "SGD / USD",
    campaign: "clinical",
    organization: "Parkway Pantai / IHH Healthcare",
    company: "IHH Healthcare (Parkway Hospitals)",
    executiveName: "Head of Medical Technology & Clinical Systems",
    title: "VP Digital Health & IT",
    linkedin: "https://www.linkedin.com/company/ihh-healthcare",
    email: "digital.health@ihhhealthcare.com",
    budget: "$65,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "Bedside 5-Rights eMAR narcotic dual-witness verification & multi-hospital ICU ward telemetry",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-sg-003",
    country: "Singapore",
    currency: "SGD / USD",
    campaign: "wms",
    organization: "YCH Group Supply Chain",
    company: "YCH Group (Supply Chain City)",
    executiveName: "Director of Warehouse Automation & Logistics",
    title: "Head of Supply Chain Solutions",
    linkedin: "https://www.linkedin.com/company/ych-group",
    email: "corporate.solutions@ych.com",
    budget: "$55,000 USD (Flat Perpetual)",
    demoUrl: "https://omnistock.linkable.it.com",
    priorityHook: "3D Voxel Digital Twin warehouse layout & real-time automated pallet trajectory optimization",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇦🇪 United Arab Emirates (UAE / Dubai / Abu Dhabi - Mega Healthcare & Construction)
  {
    id: "lead-g20-uae-001",
    country: "United Arab Emirates",
    currency: "AED / USD",
    campaign: "clinical",
    organization: "Cleveland Clinic Abu Dhabi",
    company: "Cleveland Clinic Abu Dhabi",
    executiveName: "Chief Information Officer & Operations Lead",
    title: "CIO & Executive Director of IT",
    linkedin: "https://www.linkedin.com/company/cleveland-clinic-abu-dhabi",
    email: "itprocurement@clevelandclinicabudhabi.ae",
    budget: "$75,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "Zero-latency 60fps ICU vital telemetry with zero cloud data leakage & JCI compliance engine",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-uae-002",
    country: "United Arab Emirates",
    currency: "AED / USD",
    campaign: "sitesafe",
    organization: "Emaar Properties Construction",
    company: "Emaar Properties PJSC",
    executiveName: "Director of Digital Construction & Project Delivery",
    title: "VP Project Controls & BIM",
    linkedin: "https://www.linkedin.com/company/emaar-properties",
    email: "projects.procurement@emaar.ae",
    budget: "$45,000 USD (Flat Perpetual)",
    demoUrl: "https://sitesafe.linkable.it.com",
    priorityHook: "Dynamic CPM critical path delay mitigation & automated extreme heat safety telemetry engine",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-uae-003",
    country: "United Arab Emirates",
    currency: "AED / USD",
    campaign: "wms",
    organization: "DP World Logistics",
    company: "DP World Global Logistics",
    executiveName: "Head of Digital Logistics & Port Warehousing",
    title: "VP Supply Chain Technologies",
    linkedin: "https://www.linkedin.com/company/dp-world",
    email: "digital.solutions@dpworld.com",
    budget: "$65,000 USD (Flat Perpetual)",
    demoUrl: "https://omnistock.linkable.it.com",
    priorityHook: "3D Voxel spatial twin & automated multi-zone container / cold-storage routing engine",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇨🇭 Switzerland (Pharma & High-Precision Private Hospital Systems)
  {
    id: "lead-g20-ch-001",
    country: "Switzerland",
    currency: "CHF / EUR / USD",
    campaign: "clinical",
    organization: "Hirslanden Private Hospital Group",
    company: "Hirslanden Private Hospital Group",
    executiveName: "Head of Digital Clinical Infrastructure",
    title: "Chief Digital & Information Officer",
    linkedin: "https://www.linkedin.com/company/hirslanden",
    email: "digital.health@hirslanden.ch",
    budget: "$85,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "Swiss FADP-compliant zero-leakage ICU telemetry & high-precision bedside eMAR automation",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-ch-002",
    country: "Switzerland",
    currency: "CHF / EUR / USD",
    campaign: "wms",
    organization: "Kuehne + Nagel International",
    company: "Kuehne + Nagel Logistics AG",
    executiveName: "VP Global Contract Logistics & Tech",
    title: "Head of Warehouse Solutions",
    linkedin: "https://www.linkedin.com/company/kuehne-nagel",
    email: "contract.logistics@kuehne-nagel.com",
    budget: "$75,000 USD (Flat Perpetual)",
    demoUrl: "https://omnistock.linkable.it.com",
    priorityHook: "Real-time 3D spatial voxel inventory management & pharmaceutical cold-chain compliance",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-ch-003",
    country: "Switzerland",
    currency: "CHF / EUR / USD",
    campaign: "sitesafe",
    organization: "Implenia Construction AG",
    company: "Implenia AG (Infrastructure & Civil)",
    executiveName: "Director of Digital Construction & BIM",
    title: "Head of Project Controls",
    linkedin: "https://www.linkedin.com/company/implenia",
    email: "bim.solutions@implenia.com",
    budget: "$42,000 USD (Flat Perpetual)",
    demoUrl: "https://sitesafe.linkable.it.com",
    priorityHook: "Dynamic CPM Gantt & automated alpine weather delay liability reporting engine",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇦🇺 Australia (Massive Healthcare, Mining & Infrastructure Construction)
  {
    id: "lead-g20-au-001",
    country: "Australia",
    currency: "AUD / USD",
    campaign: "clinical",
    organization: "Ramsay Health Care Australia",
    company: "Ramsay Health Care",
    executiveName: "Group Chief Digital Officer",
    title: "Head of Digital Clinical Systems",
    linkedin: "https://www.linkedin.com/company/ramsay-health-care",
    email: "digital.health@ramsayhealth.com.au",
    budget: "$65,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "Instant HL7/FHIR interoperability with zero cloud data lock-in & continuous ICU vital monitoring",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-au-002",
    country: "Australia",
    currency: "AUD / USD",
    campaign: "sitesafe",
    organization: "Lendlease Construction",
    company: "Lendlease Corporation",
    executiveName: "Head of Digital Engineering & Safety Controls",
    title: "VP Project Controls",
    linkedin: "https://www.linkedin.com/company/lendlease",
    email: "digital.engineering@lendlease.com",
    budget: "$48,000 USD (Flat Perpetual)",
    demoUrl: "https://sitesafe.linkable.it.com",
    priorityHook: "Geofenced safety telemetry, subcontractor permit verification & automated CPM scheduling",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇳🇱 Netherlands (European Logistics Hub & High-Tech)
  {
    id: "lead-g20-nl-001",
    country: "Netherlands",
    currency: "EUR / USD",
    campaign: "wms",
    organization: "Port of Rotterdam Cold Logistics",
    company: "Rotterdam Cold Logistics Hub",
    executiveName: "Director of Logistics Technologies",
    title: "Head of Cold Chain Operations",
    linkedin: "https://www.linkedin.com/company/port-of-rotterdam",
    email: "logistics.systems@portofrotterdam.com",
    budget: "$58,000 USD (Flat Perpetual)",
    demoUrl: "https://omnistock.linkable.it.com",
    priorityHook: "3D Voxel cold-chain twin & sub-zero temperature sensor telemetry integration",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-nl-002",
    country: "Netherlands",
    currency: "EUR / USD",
    campaign: "sitesafe",
    organization: "Royal BAM Group Construction",
    company: "Royal BAM Group NV",
    executiveName: "Director of Digital Construction",
    title: "Head of Safety & Schedule Risk",
    linkedin: "https://www.linkedin.com/company/royal-bam-group",
    email: "digital.construction@bam.com",
    budget: "$45,000 USD (Flat Perpetual)",
    demoUrl: "https://sitesafe.linkable.it.com",
    priorityHook: "Automated CPM schedule slip diagnosis & North Sea weather delay insurance claims engine",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇸🇦 Saudi Arabia (Vision 2030 Mega Projects & Healthcare)
  {
    id: "lead-g20-sa-001",
    country: "Saudi Arabia",
    currency: "SAR / USD",
    campaign: "clinical",
    organization: "Dr. Sulaiman Al Habib Medical Group",
    company: "Dr. Sulaiman Al Habib Medical Services",
    executiveName: "Chief Technology Officer",
    title: "Head of Medical Systems & Telemetry",
    linkedin: "https://www.linkedin.com/company/drsulaimanalhabib",
    email: "it.procurement@drsulaimanalhabib.com",
    budget: "$80,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "Rapid multi-hospital ICU ward telemetry deployment & narcotic dual-witness verification",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-sa-002",
    country: "Saudi Arabia",
    currency: "SAR / USD",
    campaign: "sitesafe",
    organization: "Red Sea Global Construction",
    company: "Red Sea Global (Giga-Projects)",
    executiveName: "Director of Project Controls & Safety",
    title: "Head of Program Management & Safety",
    linkedin: "https://www.linkedin.com/company/red-sea-global",
    email: "projectcontrols@redseaglobal.com",
    budget: "$60,000 USD (Flat Perpetual)",
    demoUrl: "https://sitesafe.linkable.it.com",
    priorityHook: "Dynamic CPM schedule variance calculation & automated subcontractor workforce safety audit",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇩🇪 Germany (MedTech, Hospital & Automotive/Industrial Warehousing)
  {
    id: "lead-g20-de-001",
    country: "Germany",
    currency: "EUR / USD",
    campaign: "clinical",
    organization: "Helios Kliniken Germany",
    company: "Helios Health GmbH",
    executiveName: "Head of Digital Hospital Systems",
    title: "Chief Information Officer",
    linkedin: "https://www.linkedin.com/company/helios-kliniken-gmbh",
    email: "it.direktion@helios-gesundheit.de",
    budget: "$70,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "GDPR/EU compliant zero-data-leakage ICU telemetry & high-throughput eMAR dispensing engine",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-de-002",
    country: "Germany",
    currency: "EUR / USD",
    campaign: "wms",
    organization: "Dachser European Logistics",
    company: "Dachser SE Logistics",
    executiveName: "Head of Contract Logistics Technologies",
    title: "VP Warehouse Systems",
    linkedin: "https://www.linkedin.com/company/dachser",
    email: "contract.logistics@dachser.com",
    budget: "$65,000 USD (Flat Perpetual)",
    demoUrl: "https://omnistock.linkable.it.com",
    priorityHook: "3D Voxel spatial inventory twin & sub-second multi-depot inventory tracking",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇮🇪 Ireland (Global Tech & Pharma European HQ Hub)
  {
    id: "lead-g20-ie-001",
    country: "Ireland",
    currency: "EUR / USD",
    campaign: "saccade",
    organization: "Publicis Media Europe / Dublin",
    company: "Publicis Media Global Hub",
    executiveName: "Head of CRO & Performance Engineering",
    title: "Director of Digital Analytics",
    linkedin: "https://www.linkedin.com/company/publicis-media",
    email: "cro.performance@publicis.ie",
    budget: "$18,500 USD (Flat Perpetual)",
    demoUrl: "https://saccade.linkable.it.com",
    priorityHook: "Neural biometric eye-tracking heatmap simulation & conversion rate optimization without cookie tracking",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇳🇴 Norway & 🇸🇪 Sweden (Nordic High-GDP Tech & Logistics)
  {
    id: "lead-g20-no-001",
    country: "Norway",
    currency: "NOK / EUR / USD",
    campaign: "wms",
    organization: "Posten Bring Cold Logistics",
    company: "Posten Bring Logistics Nordic",
    executiveName: "Director of Logistics Technology",
    title: "Head of Automation",
    linkedin: "https://www.linkedin.com/company/posten-bring",
    email: "digital.logistics@postenbring.com",
    budget: "$52,000 USD (Flat Perpetual)",
    demoUrl: "https://omnistock.linkable.it.com",
    priorityHook: "Nordic arctic-grade cold chain WMS twin & automated warehouse temperature compliance",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-se-001",
    country: "Sweden",
    currency: "SEK / EUR / USD",
    campaign: "sitesafe",
    organization: "NCC Construction Nordic",
    company: "NCC AB (Infrastructure & Civil)",
    executiveName: "Head of Virtual Design & Construction (VDC)",
    title: "Director of Project Controls",
    linkedin: "https://www.linkedin.com/company/ncc",
    email: "vdc.construction@ncc.se",
    budget: "$44,000 USD (Flat Perpetual)",
    demoUrl: "https://sitesafe.linkable.it.com",
    priorityHook: "Dynamic CPM Gantt & automated extreme winter construction weather liability reporting",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },

  // 🇯🇵 Japan & 🇰🇷 South Korea (Advanced Smart Hospitals & Spatial Warehousing)
  {
    id: "lead-g20-jp-001",
    country: "Japan",
    currency: "JPY / USD",
    campaign: "wms",
    organization: "Daifuku Warehouse Systems Global",
    company: "Daifuku Co., Ltd. (Global Systems)",
    executiveName: "Head of Overseas Digital Logistics",
    title: "VP Global Software Engineering",
    linkedin: "https://www.linkedin.com/company/daifuku",
    email: "global.software@daifuku.co.jp",
    budget: "$75,000 USD (Flat Perpetual)",
    demoUrl: "https://omnistock.linkable.it.com",
    priorityHook: "3D Voxel spatial twin & automated high-density rack trajectory optimization engine",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  },
  {
    id: "lead-g20-kr-001",
    country: "South Korea",
    currency: "KRW / USD",
    campaign: "clinical",
    organization: "Asan Medical Center International",
    company: "Asan Medical Center (Digital Health)",
    executiveName: "Head of International Medical Informatics",
    title: "Director of Smart Hospital Solutions",
    linkedin: "https://www.linkedin.com/company/asan-medical-center",
    email: "smart.hospital@amc.seoul.kr",
    budget: "$70,000 USD (Flat Perpetual)",
    demoUrl: "https://clinical.linkable.it.com",
    priorityHook: "Zero-latency 60fps ICU telemetry & bedside multi-parameter biometric dashboard",
    currentTouchpoint: 1,
    lastDispatched: null,
    status: "TOUCHPOINT_1_QUEUED"
  }
];

let added = 0;
for (const lead of GLOBAL_TOP20_TARGETS) {
  const exists = currentLeads.some(l => l.email.toLowerCase() === lead.email.toLowerCase());
  if (!exists) {
    currentLeads.push(lead);
    added++;
  }
}

fs.writeFileSync(LEADS_FILE, JSON.stringify(currentLeads, null, 2), 'utf-8');
console.log(`🌍 [GLOBAL EXPANSION COMPLETE]`);
console.log(`Added ${added} elite enterprise targets across Singapore, Switzerland, UAE, Australia, Germany, Saudi Arabia, Netherlands, Japan, and more!`);
console.log(`Total Active Opportunity Fleet: ${currentLeads.length} leads.`);
