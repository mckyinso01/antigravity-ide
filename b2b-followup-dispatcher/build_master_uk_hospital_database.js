// ============================================================
// Comprehensive Master UK Hospital & Healthcare Database
// Categorized from NHS Mega-Giants down to Small Community & Brand-New Facilities
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, 'MASTER_UK_HOSPITALS_COMPREHENSIVE_DATABASE.json');

const ukHospitalDatabase = [
  // ==========================================
  // CATEGORY 1: UK MEGA-GIANTS (Turnover > £1.5B / Major Academic Teaching Trusts)
  // ==========================================
  {
    id: 'UK-GIANT-01',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Manchester University NHS Foundation Trust (MFT)",
    hospital_sites: "Manchester Royal Infirmary, Wythenshawe Hospital, Royal Manchester Children's, Saint Mary's",
    region: "Greater Manchester, North West",
    turnover: "£2.6 Billion",
    beds: 2100,
    core_epr: "Epic ('Hive' Programme)",
    decision_maker: "Samantha Liscio (Group Chief Digital & Information Officer)",
    email_domain: "mft.nhs.uk",
    email_pattern: "first.last@mft.nhs.uk",
    sample_email: "samantha.liscio@mft.nhs.uk",
    pain_point: "Unifying multi-site telemetry across 12 hospitals; high Epic perpetual maintenance overhead",
    nhs_mandate: "NHS Frontline Digitisation & Single Patient Record Convergence"
  },
  {
    id: 'UK-GIANT-02',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Guy's and St Thomas' NHS Foundation Trust (GSTT)",
    hospital_sites: "St Thomas' Hospital, Guy's Hospital, Evelina London Children's Hospital, Royal Brompton, Harefield",
    region: "London",
    turnover: "£2.4 Billion",
    beds: 2200,
    core_epr: "Epic ('Apollo' Programme - £450M Joint Deployment)",
    decision_maker: "Beverley Bryant (Joint Chief Digital Information Officer)",
    email_domain: "gstt.nhs.uk",
    email_pattern: "first.last@gstt.nhs.uk",
    sample_email: "beverley.bryant@gstt.nhs.uk",
    pain_point: "Joint acute telemetry and ICU waveform data sovereignty across South East London",
    nhs_mandate: "South East London ICS EPR Integration"
  },
  {
    id: 'UK-GIANT-03',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Barts Health NHS Trust",
    hospital_sites: "The Royal London Hospital, St Bartholomew's Hospital, Whipps Cross, Newham, Mile End",
    region: "London",
    turnover: "£2.5 Billion",
    beds: 1900,
    core_epr: "Cerner Millennium (Oracle Health)",
    decision_maker: "Sarah Jensen (Chief Information Officer)",
    email_domain: "bartshealth.nhs.uk",
    email_pattern: "first.last@nhs.net",
    sample_email: "sarah.jensen@nhs.net",
    pain_point: "High-volume trauma & cardiac telemetry interoperability across East London",
    nhs_mandate: "North East London ICS Frontline Digitisation"
  },
  {
    id: 'UK-GIANT-04',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Imperial College Healthcare NHS Trust",
    hospital_sites: "St Mary's Hospital, Charing Cross Hospital, Hammersmith Hospital, Queen Charlotte's & Chelsea, Western Eye",
    region: "London",
    turnover: "£1.8 Billion",
    beds: 1400,
    core_epr: "Cerner Millennium (Joint with Chelsea and Westminster)",
    decision_maker: "Linda Watts (Director of Digital Transformation)",
    email_domain: "imperial.nhs.uk",
    email_pattern: "first.last@imperial.nhs.uk",
    sample_email: "linda.watts@imperial.nhs.uk",
    pain_point: "Sub-second acute telemetry feed for major trauma and academic clinical trials",
    nhs_mandate: "North West London Acute Collaborative EPR"
  },
  {
    id: 'UK-GIANT-05',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "University College London Hospitals NHS Foundation Trust (UCLH)",
    hospital_sites: "University College Hospital, National Hospital for Neurology and Neurosurgery, Eastman Dental",
    region: "London",
    turnover: "£1.6 Billion",
    beds: 1100,
    core_epr: "Epic EHR",
    decision_maker: "James Thomas (Director of ICT / CIO)",
    email_domain: "uclh.nhs.uk",
    email_pattern: "first.last@uclh.nhs.uk",
    sample_email: "james.thomas@uclh.nhs.uk",
    pain_point: "High-acuity neuro & cancer ICU telemetry sync with in-house AI algorithms",
    nhs_mandate: "Digital Innovation Hub & Research Interoperability"
  },
  {
    id: 'UK-GIANT-06',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "King's College Hospital NHS Foundation Trust",
    hospital_sites: "King's College Hospital (Denmark Hill), Princess Royal University Hospital, Orpington Hospital",
    region: "London",
    turnover: "£1.6 Billion",
    beds: 1400,
    core_epr: "Epic ('Apollo' Programme)",
    decision_maker: "Nick Moberly (Chief Executive) / Beverley Bryant (CDIO)",
    email_domain: "kch.nhs.uk",
    email_pattern: "first.last@nhs.net",
    sample_email: "beverley.bryant@kch.nhs.uk",
    pain_point: "Real-time neuro-trauma and liver failure intensive care telemetry",
    nhs_mandate: "Joint GSTT & KCH Epic Convergence"
  },
  {
    id: 'UK-GIANT-07',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Leeds Teaching Hospitals NHS Trust",
    hospital_sites: "Leeds General Infirmary, St James's University Hospital, Chapel Allerton, Wharfedale",
    region: "West Yorkshire, North",
    turnover: "£1.7 Billion",
    beds: 1800,
    core_epr: "PPM+ (Open Standards Electronic Patient Record)",
    decision_maker: "Dr. Paul Jones (Chief Digital Information Officer)",
    email_domain: "leedsth.nhs.uk",
    email_pattern: "first.last@nhs.net",
    sample_email: "paul.jones@leedsth.nhs.uk",
    pain_point: "Transitioning legacy PPM+ to next-generation open HL7/FHIR microservices",
    nhs_mandate: "West Yorkshire ICS Digital Roadmap"
  },
  {
    id: 'UK-GIANT-08',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "University Hospitals Birmingham NHS Foundation Trust (UHB)",
    hospital_sites: "Queen Elizabeth Hospital Birmingham, Heartlands Hospital, Good Hope Hospital, Solihull Hospital",
    region: "West Midlands",
    turnover: "£2.1 Billion",
    beds: 2200,
    core_epr: "PICS (Prescribing Information and Communication System) / Epic transition",
    decision_maker: "Leonardo Tantari (Chief Information Officer)",
    email_domain: "uhb.nhs.uk",
    email_pattern: "first.last@uhb.nhs.uk",
    sample_email: "leonardo.tantari@uhb.nhs.uk",
    pain_point: "Massive military & acute polytrauma ICU bed management and telemetry silos",
    nhs_mandate: "Birmingham and Solihull ICS Digital Health Strategy"
  },
  {
    id: 'UK-GIANT-09',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Cambridge University Hospitals NHS Foundation Trust (CUH)",
    hospital_sites: "Addenbrooke's Hospital, The Rosie Hospital",
    region: "East of England",
    turnover: "£1.4 Billion",
    beds: 1200,
    core_epr: "Epic EHR (UK Pioneer HIMSS Stage 7)",
    decision_maker: "Philippa Kirkpatrick (Chief Information Officer) / Dr. Afzal Chaudhry (CCIO)",
    email_domain: "cuh.nhs.uk",
    email_pattern: "first.last@cuh.nhs.uk",
    sample_email: "philippa.kirkpatrick@cuh.nhs.uk",
    pain_point: "Biomedical campus research telemetry integration and multi-omics bed matching",
    nhs_mandate: "Cambridge Biomedical Campus Expansion & AI Telemetry"
  },
  {
    id: 'UK-GIANT-10',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Oxford University Hospitals NHS Foundation Trust (OUH)",
    hospital_sites: "John Radcliffe Hospital, Churchill Hospital, Nuffield Orthopaedic Centre, Horton General",
    region: "Thames Valley, South East",
    turnover: "£1.5 Billion",
    beds: 1300,
    core_epr: "Cerner Millennium (EPR Programme)",
    decision_maker: "Ben Attwood (Chief Digital Officer)",
    email_domain: "ouh.nhs.uk",
    email_pattern: "first.last@ouh.nhs.uk",
    sample_email: "ben.attwood@ouh.nhs.uk",
    pain_point: "High-throughput neonatal and neuro intensive care telemetry synchronization",
    nhs_mandate: "Oxford Academic Health Science Centre Digital Pipeline"
  },
  {
    id: 'UK-GIANT-11',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Newcastle upon Tyne Hospitals NHS Foundation Trust",
    hospital_sites: "Royal Victoria Infirmary, Freeman Hospital",
    region: "North East",
    turnover: "£1.4 Billion",
    beds: 1800,
    core_epr: "Cerner Millennium (Great North Care Record)",
    decision_maker: "Dr. Graham Evans (Chief Information and Technology Officer)",
    email_domain: "nuth.nhs.uk",
    email_pattern: "first.last@nhs.net",
    sample_email: "graham.evans@nuth.nhs.uk",
    pain_point: "Cardiothoracic transplant telemetry and regional ICU data exchange across North East",
    nhs_mandate: "Great North Care Record Interoperability"
  },
  {
    id: 'UK-GIANT-12',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Sheffield Teaching Hospitals NHS Foundation Trust",
    hospital_sites: "Northern General Hospital, Royal Hallamshire Hospital, Weston Park Hospital, Jessop Wing",
    region: "South Yorkshire",
    turnover: "£1.3 Billion",
    beds: 1700,
    core_epr: "System C (CareFlow) / In-house Lorenzo legacy migration",
    decision_maker: "Tracey Cotterill (Director of Digital)",
    email_domain: "sth.nhs.uk",
    email_pattern: "first.last@sth.nhs.uk",
    sample_email: "tracey.cotterill@sth.nhs.uk",
    pain_point: "Replacing legacy electronic health records with modern sub-second telemetry",
    nhs_mandate: "South Yorkshire ICS EPR Convergence"
  },
  {
    id: 'UK-GIANT-13',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Nottingham University Hospitals NHS Trust",
    hospital_sites: "Queen's Medical Centre (QMC), Nottingham City Hospital",
    region: "East Midlands",
    turnover: "£1.4 Billion",
    beds: 1700,
    core_epr: "Nervecentre EPR",
    decision_maker: "Andrew Fearn (Director of Digital Services)",
    email_domain: "nuh.nhs.uk",
    email_pattern: "first.last@nuh.nhs.uk",
    sample_email: "andrew.fearn@nuh.nhs.uk",
    pain_point: "Major trauma centre acute telemetry and e-prescribing bedside verification",
    nhs_mandate: "Nottinghamshire ICS EPR Deployment"
  },
  {
    id: 'UK-GIANT-14',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "University Hospitals of Leicester NHS Trust",
    hospital_sites: "Leicester Royal Infirmary, Glenfield Hospital, Leicester General Hospital",
    region: "East Midlands",
    turnover: "£1.4 Billion",
    beds: 1600,
    core_epr: "Nervecentre Cloud EPR",
    decision_maker: "Andy Carruthers (Chief Information Officer)",
    email_domain: "uhl-tr.nhs.uk",
    email_pattern: "first.last@uhl-tr.nhs.uk",
    sample_email: "andy.carruthers@uhl-tr.nhs.uk",
    pain_point: "Extensive ECMO and cardiac acute telemetry integration with mobile nursing carts",
    nhs_mandate: "Leicestershire and Rutland ICS Digital Health"
  },
  {
    id: 'UK-GIANT-15',
    category: 'Tier 1: UK Mega-Giants',
    trust_name: "Norfolk and Norwich University Hospitals NHS Foundation Trust",
    hospital_sites: "Norfolk and Norwich University Hospital, Cromer Hospital",
    region: "East of England",
    turnover: "£1.1 Billion",
    beds: 1200,
    core_epr: "Meditech Expanse (Joint Norfolk and Waveney EPR)",
    decision_maker: "Anthony Browne (Chief Information Officer)",
    email_domain: "nnuh.nhs.uk",
    email_pattern: "first.last@nnuh.nhs.uk",
    sample_email: "anthony.browne@nnuh.nhs.uk",
    pain_point: "Rural telemetry transport and emergency department bed turnaround bottlenecks",
    nhs_mandate: "Norfolk and Waveney Shared EPR Transformation"
  },

  // ==========================================
  // CATEGORY 2: WORLD-RENOWNED SPECIALIST TRUSTS
  // ==========================================
  {
    id: 'UK-SPEC-01',
    category: 'Tier 2: Specialist Hospitals',
    trust_name: "Great Ormond Street Hospital for Children NHS Foundation Trust (GOSH)",
    hospital_sites: "Great Ormond Street Hospital, London",
    region: "London",
    turnover: "£600 Million",
    beds: 400,
    core_epr: "Epic EHR ('Drive' EPR Programme)",
    decision_maker: "Dr. Shankar Sridharan (Chief Clinical Information Officer)",
    email_domain: "gosh.nhs.uk",
    email_pattern: "first.last@gosh.nhs.uk",
    sample_email: "shankar.sridharan@gosh.nhs.uk",
    pain_point: "Pediatric and neonatal intensive care waveform telemetry and rare-disease telemetry",
    nhs_mandate: "Pediatric Digital Health Hub & AI Research"
  },
  {
    id: 'UK-SPEC-02',
    category: 'Tier 2: Specialist Hospitals',
    trust_name: "The Royal Marsden NHS Foundation Trust",
    hospital_sites: "The Royal Marsden (Chelsea & Sutton)",
    region: "London / Surrey",
    turnover: "£550 Million",
    beds: 270,
    core_epr: "Epic EHR (Joint with GOSH)",
    decision_maker: "Steven Francis (Chief Information Officer)",
    email_domain: "royalmarsden.nhs.uk",
    email_pattern: "first.last@royalmarsden.nhs.uk",
    sample_email: "steven.francis@royalmarsden.nhs.uk",
    pain_point: "Complex oncology infusion eMAR and precision oncology telemetry monitoring",
    nhs_mandate: "National Cancer Vanguard Digital Systems"
  },
  {
    id: 'UK-SPEC-03',
    category: 'Tier 2: Specialist Hospitals',
    trust_name: "Alder Hey Children's NHS Foundation Trust",
    hospital_sites: "Alder Hey in the Park, Liverpool",
    region: "North West",
    turnover: "£420 Million",
    beds: 350,
    core_epr: "Meditech / System C Digital Careflow",
    decision_maker: "Kate Warriner (Chief Transformation and Digital Officer)",
    email_domain: "alderhey.nhs.uk",
    email_pattern: "first.last@alderhey.nhs.uk",
    sample_email: "kate.warriner@alderhey.nhs.uk",
    pain_point: "Pediatric ICU physiological monitoring and smart sensor hospital telemetry",
    nhs_mandate: "Alder Hey Innovation Centre & Digital Sensor Hospital"
  },
  {
    id: 'UK-SPEC-04',
    category: 'Tier 2: Specialist Hospitals',
    trust_name: "Royal Papworth Hospital NHS Foundation Trust",
    hospital_sites: "Royal Papworth Hospital (Cambridge Biomedical Campus)",
    region: "East of England",
    turnover: "£280 Million",
    beds: 310,
    core_epr: "Lorenzo / Epic Shared Services",
    decision_maker: "Andrew Raynes (Chief Information Officer)",
    email_domain: "royalpapworth.nhs.uk",
    email_pattern: "first.last@royalpapworth.nhs.uk",
    sample_email: "andrew.raynes@royalpapworth.nhs.uk",
    pain_point: "Advanced heart and lung transplant telemetry, ECMO sub-second waveform data streaming",
    nhs_mandate: "Specialist Cardiothoracic Digital Telemetry"
  },
  {
    id: 'UK-SPEC-05',
    category: 'Tier 2: Specialist Hospitals',
    trust_name: "The Christie NHS Foundation Trust",
    hospital_sites: "The Christie, Withington, Manchester",
    region: "North West",
    turnover: "£450 Million",
    beds: 220,
    core_epr: "Clinical Web Portal (In-House Open System)",
    decision_maker: "Alistair Reid-Hansen (Chief Information Officer)",
    email_domain: "christie.nhs.uk",
    email_pattern: "first.last@christie.nhs.uk",
    sample_email: "alistair.reid-hansen@christie.nhs.uk",
    pain_point: "Proton beam therapy telemetry and specialized chemotherapy dual-witnessing",
    nhs_mandate: "Comprehensive Cancer Care Telemetry"
  },

  // ==========================================
  // CATEGORY 3: MID-TIER ACUTE & REGIONAL GENERAL NHS TRUSTS
  // ==========================================
  {
    id: 'UK-ACUTE-01',
    category: 'Tier 3: Mid-Tier Acute Care',
    trust_name: "Chelsea and Westminster Hospital NHS Foundation Trust",
    hospital_sites: "Chelsea and Westminster Hospital, West Middlesex University Hospital",
    region: "London",
    turnover: "£900 Million",
    beds: 950,
    core_epr: "Cerner Millennium",
    decision_maker: "Sandra Reyes (Director of Digital Operations)",
    email_domain: "chelwest.nhs.uk",
    email_pattern: "first.last@chelwest.nhs.uk",
    sample_email: "sandra.reyes@chelwest.nhs.uk",
    pain_point: "NICU and burns intensive care telemetry integration with CW+ Innovation Hub",
    nhs_mandate: "NW London Acute Collaborative Interoperability"
  },
  {
    id: 'UK-ACUTE-02',
    category: 'Tier 3: Mid-Tier Acute Care',
    trust_name: "Royal Free London NHS Foundation Trust",
    hospital_sites: "Royal Free Hospital, Chase Farm Hospital, Barnet Hospital",
    region: "London",
    turnover: "£1.3 Billion",
    beds: 1200,
    core_epr: "Cerner Millennium (Chase Farm HIMSS Stage 7)",
    decision_maker: "Glenn Winteringham (Group Chief Digital Officer)",
    email_domain: "royalfree.nhs.uk",
    email_pattern: "first.last@nhs.net",
    sample_email: "glenn.winteringham@royalfree.nhs.uk",
    pain_point: "Standardizing digital telemetry across digital Chase Farm and legacy Barnet Hospital",
    nhs_mandate: "North Central London ICS Digital Frontier"
  },
  {
    id: 'UK-ACUTE-03',
    category: 'Tier 3: Mid-Tier Acute Care',
    trust_name: "St George's University Hospitals NHS Foundation Trust",
    hospital_sites: "St George's Hospital (Tooting), Queen Mary's Hospital (Roehampton)",
    region: "London",
    turnover: "£1.1 Billion",
    beds: 1100,
    core_epr: "Cerner Millennium",
    decision_maker: "Stephen Jones (Chief Information Officer)",
    email_domain: "stgeorges.nhs.uk",
    email_pattern: "first.last@stgeorges.nhs.uk",
    sample_email: "stephen.jones@stgeorges.nhs.uk",
    pain_point: "South West London major trauma telemetry and neuro-vascular monitoring",
    nhs_mandate: "South West London Acute Hospital Group EPR"
  },
  {
    id: 'UK-ACUTE-04',
    category: 'Tier 3: Mid-Tier Acute Care',
    trust_name: "Frimley Health NHS Foundation Trust",
    hospital_sites: "Frimley Park Hospital, Wexham Park Hospital, Heatherwood Hospital",
    region: "Surrey / Berkshire",
    turnover: "£900 Million",
    beds: 1000,
    core_epr: "Epic EHR",
    decision_maker: "Lucy Hood (Director of Digital Services)",
    email_domain: "fhft.nhs.uk",
    email_pattern: "first.last@nhs.net",
    sample_email: "lucy.hood@fhft.nhs.uk",
    pain_point: "New Heatherwood elective surgical telemetry and cross-site bed turnaround",
    nhs_mandate: "Frimley Integrated Care System Digital Strategy"
  },
  {
    id: 'UK-ACUTE-05',
    category: 'Tier 3: Mid-Tier Acute Care',
    trust_name: "Gloucestershire Hospitals NHS Foundation Trust",
    hospital_sites: "Gloucestershire Royal Hospital, Cheltenham General Hospital",
    region: "South West",
    turnover: "£750 Million",
    beds: 950,
    core_epr: "Alcidion Miya Precision EPR",
    decision_maker: "Mark Hutchinson (Executive Chief Digital and Information Officer)",
    email_domain: "glos.nhs.uk",
    email_pattern: "first.last@nhs.net",
    sample_email: "mark.hutchinson@glos.nhs.uk",
    pain_point: "Modernizing acute smart clinical alerts and bedside patient vitals telemetry",
    nhs_mandate: "Gloucestershire ICS Frontline Digitisation"
  },
  {
    id: 'UK-ACUTE-06',
    category: 'Tier 3: Mid-Tier Acute Care',
    trust_name: "Somerset NHS Foundation Trust",
    hospital_sites: "Musgrove Park Hospital, Yeovil District Hospital",
    region: "South West",
    turnover: "£850 Million",
    beds: 1050,
    core_epr: "Epic EPR (Procured for County-wide deployment)",
    decision_maker: "David Shannon (Director of Strategy and Digital Development)",
    email_domain: "somersetft.nhs.uk",
    email_pattern: "first.last@somersetft.nhs.uk",
    sample_email: "david.shannon@somersetft.nhs.uk",
    pain_point: "Merger integration of Musgrove and Yeovil hospital telemetry networks",
    nhs_mandate: "Somerset Integrated Care System Single EPR"
  },

  // ==========================================
  // CATEGORY 4: DISTRICT & COMMUNITY GENERAL HOSPITALS
  // ==========================================
  {
    id: 'UK-DIST-01',
    category: 'Tier 4: District General Hospitals',
    trust_name: "West Suffolk NHS Foundation Trust",
    hospital_sites: "West Suffolk Hospital, Bury St Edmunds",
    region: "East of England",
    turnover: "£380 Million",
    beds: 430,
    core_epr: "Cerner Millennium (GDE Trust)",
    decision_maker: "Liam McLaughlin (Chief Information Officer)",
    email_domain: "wsh.nhs.uk",
    email_pattern: "first.last@wsh.nhs.uk",
    sample_email: "liam.mclaughlin@wsh.nhs.uk",
    pain_point: "Hospital rebuild planning and maintaining sub-second telemetry on aging infrastructure",
    nhs_mandate: "New Hospital Programme Rebuild Digital Readiness"
  },
  {
    id: 'UK-DIST-02',
    category: 'Tier 4: District General Hospitals',
    trust_name: "Queen Elizabeth Hospital King's Lynn NHS Foundation Trust",
    hospital_sites: "Queen Elizabeth Hospital, King's Lynn",
    region: "East of England",
    turnover: "£320 Million",
    beds: 480,
    core_epr: "Meditech Expanse (Part of Norfolk Shared EPR)",
    decision_maker: "Paul Brooks (Director of Infrastructure & Digital)",
    email_domain: "qehkl.nhs.uk",
    email_pattern: "first.last@qehkl.nhs.uk",
    sample_email: "paul.brooks@qehkl.nhs.uk",
    pain_point: "RAAC concrete replacement transition while securing continuous ICU telemetry uptime",
    nhs_mandate: "Norfolk and Waveney Joint EPR Integration"
  },
  {
    id: 'UK-DIST-03',
    category: 'Tier 4: District General Hospitals',
    trust_name: "Harrogate and District NHS Foundation Trust",
    hospital_sites: "Harrogate District Hospital, Ripon Community Hospital",
    region: "North Yorkshire",
    turnover: "£340 Million",
    beds: 400,
    core_epr: "SystmOne Acute EPR (TPP)",
    decision_maker: "Wallace Sampson (Digital Director) / Matt Graham (Director of Digital)",
    email_domain: "hdft.nhs.uk",
    email_pattern: "first.last@hdft.nhs.uk",
    sample_email: "matt.graham@hdft.nhs.uk",
    pain_point: "District general acute waveform telemetry integration into SystmOne",
    nhs_mandate: "Humber and North Yorkshire ICS Digital Interoperability"
  },
  {
    id: 'UK-DIST-04',
    category: 'Tier 4: District General Hospitals',
    trust_name: "Airedale NHS Foundation Trust",
    hospital_sites: "Airedale General Hospital, Keighley",
    region: "West Yorkshire",
    turnover: "£280 Million",
    beds: 350,
    core_epr: "SystmOne Acute & Telehealth Hub",
    decision_maker: "David Moss (Chief Information Officer)",
    email_domain: "anhst.nhs.uk",
    email_pattern: "first.last@anhst.nhs.uk",
    sample_email: "david.moss@anhst.nhs.uk",
    pain_point: "Digital Care Hub remote telemedicine telemetry and acute ward monitoring",
    nhs_mandate: "National Digital Care Hub Telemetry Integration"
  },

  // ==========================================
  // CATEGORY 5: PRIVATE HEALTHCARE GIANTS & INDEPENDENT HOSPITALS
  // ==========================================
  {
    id: 'UK-PRIV-01',
    category: 'Tier 5: Private Healthcare Giants',
    trust_name: "Cleveland Clinic London",
    hospital_sites: "40 Grosvenor Place (184-bed acute hospital) & Portland Place Outpatient",
    region: "London (Belgravia / Marylebone)",
    turnover: "£350 Million",
    beds: 184,
    core_epr: "Epic EHR (Global Enterprise Cleveland Clinic Instance)",
    decision_maker: "Rai Mughal (Chief Information Officer)",
    email_domain: "ccf.org",
    email_pattern: "lastf@ccf.org",
    sample_email: "rmughal@ccf.org",
    pain_point: "Full closed-loop robotic pharmacy, laser-fast surgical telemetry, high-end private client expectations",
    nhs_mandate: "Private Ultra-High-Acuity Acute Care Delivery"
  },
  {
    id: 'UK-PRIV-02',
    category: 'Tier 5: Private Healthcare Giants',
    trust_name: "The London Clinic",
    hospital_sites: "20 Devonshire Place, Harley Street Medical Area",
    region: "London (Marylebone)",
    turnover: "£210 Million",
    beds: 230,
    core_epr: "Meditech / Custom Clinical Architecture",
    decision_maker: "James Maunder (Chief Information Officer)",
    email_domain: "thelondonclinic.co.uk",
    email_pattern: "first.last@thelondonclinic.co.uk",
    sample_email: "james.maunder@thelondonclinic.co.uk",
    pain_point: "Independent surgical and oncological telemetry without rigid proprietary cloud license lock-in",
    nhs_mandate: "Independent Charitable Hospital Digital Modernization"
  },
  {
    id: 'UK-PRIV-03',
    category: 'Tier 5: Private Healthcare Giants',
    trust_name: "Circle Health Group (UK's Largest Private Hospital Network)",
    hospital_sites: "54 Independent Hospitals Across England, Scotland & Wales",
    region: "UK-Wide",
    turnover: "£1.2 Billion",
    beds: 2400,
    core_epr: "Bespoke Circle Clinical EPR / TrakCare",
    decision_maker: "Mark Withers (Chief Information Officer)",
    email_domain: "circlehealthgroup.co.uk",
    email_pattern: "first.last@circlehealthgroup.co.uk",
    sample_email: "mark.withers@circlehealthgroup.co.uk",
    pain_point: "Standardizing patient monitors and eMAR verification across 54 independent acute facilities",
    nhs_mandate: "Independent Sector Private & NHS Elective Partnership"
  },
  {
    id: 'UK-PRIV-04',
    category: 'Tier 5: Private Healthcare Giants',
    trust_name: "Spire Healthcare Group",
    hospital_sites: "39 Private Hospitals and 33 Clinics Across the UK",
    region: "UK-Wide",
    turnover: "£1.3 Billion",
    beds: 1900,
    core_epr: "SAP / Electronic Clinical Workflow",
    decision_maker: "Jonathan Paisley (Chief Information Officer)",
    email_domain: "spirehealthcare.com",
    email_pattern: "first.last@spirehealthcare.com",
    sample_email: "jonathan.paisley@spirehealthcare.com",
    pain_point: "Cross-facility surgical theater telemetry and post-op telemetry tracking",
    nhs_mandate: "Private Surgical Center Digital Upgrades"
  },
  {
    id: 'UK-PRIV-05',
    category: 'Tier 5: Private Healthcare Giants',
    trust_name: "HCA Healthcare UK",
    hospital_sites: "The Wellington Hospital, The Portland Hospital, The Harley Street Clinic, The Lister Hospital",
    region: "London & Manchester",
    turnover: "£900 Million",
    beds: 800,
    core_epr: "Meditech / Epic Global Network",
    decision_maker: "IT Leadership & Digital Transformation Directorate",
    email_domain: "hcahealthcare.co.uk",
    email_pattern: "first.last@hcahealthcare.co.uk",
    sample_email: "it.procurement@hcahealthcare.co.uk",
    pain_point: "Private ICU cardiac and maternal-fetal telemetry with zero external data leakage",
    nhs_mandate: "High-Acuity Private Tertiary Referral Digital Systems"
  },

  // ==========================================
  // CATEGORY 6: BRAND-NEW STATE-OF-THE-ART & NEW HOSPITAL PROGRAMME (NHP) FACILITIES
  // ==========================================
  {
    id: 'UK-NEW-01',
    category: 'Tier 6: Brand-New Super-Hospitals',
    trust_name: "Midland Metropolitan University Hospital (Sandwell and West Birmingham NHS Trust)",
    hospital_sites: "Smethwick, West Midlands (Brand New £1B Acute Specialist Hospital)",
    region: "West Midlands",
    turnover: "£750 Million",
    beds: 736,
    core_epr: "Cerner Millennium ('Unity' EPR)",
    decision_maker: "Mark Reynolds (Chief Information Officer)",
    email_domain: "swbh.nhs.uk",
    email_pattern: "first.last@swbh.nhs.uk",
    sample_email: "mark.reynolds@swbh.nhs.uk",
    pain_point: "Commissioning brand-new acute clinical telemetry and smart-room bed sensors in newly opened super-hospital",
    nhs_mandate: "New Hospital Programme (NHP) Smart Building Infrastructure"
  },
  {
    id: 'UK-NEW-02',
    category: 'Tier 6: Brand-New Super-Hospitals',
    trust_name: "New Royal Liverpool University Hospital (Liverpool University Hospitals NHS FT)",
    hospital_sites: "Mount Vernon Street, Liverpool (Newly Built £745M State-of-the-Art Acute Facility)",
    region: "North West",
    turnover: "£1.2 Billion",
    beds: 640,
    core_epr: "InterSystems TrakCare / Epic convergence plan",
    decision_maker: "Dr. Jason Bincalar (Chief Information Officer)",
    email_domain: "liverpoolft.nhs.uk",
    email_pattern: "first.last@liverpoolft.nhs.uk",
    sample_email: "jason.bincalar@liverpoolft.nhs.uk",
    pain_point: "Single-bed room acute clinical surveillance and nurse call telemetry integration",
    nhs_mandate: "New Hospital Programme Single-En-Suite Clinical Monitoring"
  },
  {
    id: 'UK-NEW-03',
    category: 'Tier 6: Brand-New Super-Hospitals',
    trust_name: "Cambridge Cancer Research Hospital (CCRH)",
    hospital_sites: "Cambridge Biomedical Campus (Next-Generation Digital Hospital Construction)",
    region: "East of England",
    turnover: "£300 Million Build",
    beds: 250,
    core_epr: "Epic EHR (Integrated CUH Research Grid)",
    decision_maker: "Digital Innovation Lead / Dr. Afzal Chaudhry",
    email_domain: "cuh.nhs.uk",
    email_pattern: "first.last@cuh.nhs.uk",
    sample_email: "afzal.chaudhry@cuh.nhs.uk",
    pain_point: "Early cancer detection real-time genomic telemetry and ICU clinical trial bed mapping",
    nhs_mandate: "Government New Hospital Programme Cancer Center of Excellence"
  },
  {
    id: 'UK-NEW-04',
    category: 'Tier 6: Brand-New Super-Hospitals',
    trust_name: "The Louisa Martindale Building (University Hospitals Sussex NHS FT)",
    hospital_sites: "Royal Sussex County Hospital, Brighton (Newly Opened £500M Clinical Tower)",
    region: "South East",
    turnover: "£1.2 Billion",
    beds: 600,
    core_epr: "System C CareFlow / Nervecentre",
    decision_maker: "Mark Simpson (Chief Information Officer)",
    email_domain: "uhsussex.nhs.uk",
    email_pattern: "first.last@uhsussex.nhs.uk",
    sample_email: "mark.simpson@uhsussex.nhs.uk",
    pain_point: "New clinical building transition: high-acuity ICU, neurosurgery and trauma ward telemetry",
    nhs_mandate: "3T Re-development Digital Acute Infrastructure"
  }
];

function run() {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(ukHospitalDatabase, null, 2), 'utf-8');
  console.log(`✅ Master UK Hospital Database successfully generated!`);
  console.log(`📊 Total Classified UK Targets: ${ukHospitalDatabase.length}`);
  console.log(`📁 File written to: ${OUTPUT_FILE}`);

  // Summary by category
  const categories = {};
  ukHospitalDatabase.forEach(h => {
    categories[h.category] = (categories[h.category] || 0) + 1;
  });
  console.log('\n📊 Classification Breakdown:');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   • ${cat}: ${count} organizations`);
  });
}

run();
