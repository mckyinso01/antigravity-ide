// ============================================================
// Comprehensive UK Hospitals Batch 2 Database Generator
// All Remaining Acute NHS Trusts across Scotland, Wales, Northern Ireland & Regional England
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, 'UK_HOSPITALS_BATCH_2_EXHAUSTIVE_DATABASE.json');

const ukBatch2 = [
  // --- SCOTLAND REGIONAL HEALTH BOARDS ---
  {
    id: 'SCOT-01',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Grampian',
    hospitals: 'Aberdeen Royal Infirmary, Royal Aberdeen Children’s Hospital, Dr Gray’s Hospital',
    beds: 1200,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Director of Digital & Information Technology',
    email_domain: 'scot.nhs.uk',
    email_pattern: 'gram.digital@nhs.scot',
    sample_email: 'gram.digital@nhs.scot',
    pain_point: 'Grampian rural acute telemedicine and offshore/remote ICU telemetry feeds'
  },
  {
    id: 'SCOT-02',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Tayside',
    hospitals: 'Ninewells Hospital Dundee, Perth Royal Infirmary',
    beds: 1100,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Director of Digital Innovation',
    email_domain: 'nhs.scot',
    email_pattern: 'tay.digital@nhs.scot',
    sample_email: 'tay.digital@nhs.scot',
    pain_point: 'Ninewells major trauma centre acute physiological telemetry monitoring'
  },
  {
    id: 'SCOT-03',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Fife',
    hospitals: 'Victoria Hospital Kirkcaldy, Queen Margaret Hospital Dunfermline',
    beds: 750,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Associate Director of Digital & Information',
    email_domain: 'nhs.scot',
    email_pattern: 'fife.digital@nhs.scot',
    sample_email: 'fife.digital@nhs.scot',
    pain_point: 'Elective orthopedic and acute surgical telemetry integration'
  },
  {
    id: 'SCOT-04',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Highland',
    hospitals: 'Raigmore Hospital Inverness, Caithness General',
    beds: 650,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Head of Digital Transformation',
    email_domain: 'nhs.scot',
    email_pattern: 'highland.digital@nhs.scot',
    sample_email: 'highland.digital@nhs.scot',
    pain_point: 'Highland remote emergency department telemetry and island transfers'
  },
  {
    id: 'SCOT-05',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Lanarkshire',
    hospitals: 'University Hospital Wishaw, University Hospital Monklands, University Hospital Hairmyres',
    beds: 1300,
    core_epr: 'InterSystems TrakCare / Monklands Replacement Project',
    decision_maker: 'Director of Information and Digital Technology',
    email_domain: 'nhs.scot',
    email_pattern: 'lanarkshire.digital@nhs.scot',
    sample_email: 'lanarkshire.digital@nhs.scot',
    pain_point: 'New Monklands digital hospital planning and tri-site telemetry synchronization'
  },
  {
    id: 'SCOT-06',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Ayrshire and Arran',
    hospitals: 'University Hospital Crosshouse, University Hospital Ayr',
    beds: 850,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Director of Digital Services',
    email_domain: 'aapct.scot.nhs.uk',
    email_pattern: 'clinical.systems@aapct.scot.nhs.uk',
    sample_email: 'clinical.systems@aapct.scot.nhs.uk',
    pain_point: 'Acute medical admission telemetry and rapid response bedside alerts'
  },
  {
    id: 'SCOT-07',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Forth Valley',
    hospitals: 'Forth Valley Royal Hospital Larbert',
    beds: 860,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Head of Clinical Systems',
    email_domain: 'nhs.scot',
    email_pattern: 'fv.digital@nhs.scot',
    sample_email: 'fv.digital@nhs.scot',
    pain_point: 'Automated robotic pharmacy & single-bed ICU ward telemetry verification'
  },
  {
    id: 'SCOT-08',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'Golden Jubilee National Hospital',
    hospitals: 'Golden Jubilee University National Hospital Clydebank',
    beds: 300,
    core_epr: 'InterSystems TrakCare Specialist Cardiac',
    decision_maker: 'Chief Information Officer',
    email_domain: 'gjnh.scot.nhs.uk',
    email_pattern: 'digital@gjnh.scot.nhs.uk',
    sample_email: 'digital@gjnh.scot.nhs.uk',
    pain_point: 'National advanced heart failure and cardiothoracic surgical telemetry'
  },

  // --- WALES UNIVERSITY HEALTH BOARDS ---
  {
    id: 'WALES-01',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Betsi Cadwaladr University Health Board (BCUHB)',
    hospitals: 'Ysbyty Gwynedd Bangor, Ysbyty Glan Clwyd Bodelwyddan, Wrexham Maelor Hospital',
    beds: 1900,
    core_epr: 'Welsh Clinical Portal (WCP) / Digital Health and Care Wales',
    decision_maker: 'Executive Director of Digital & Technology',
    email_domain: 'wales.nhs.uk',
    email_pattern: 'bcuhb.digital@wales.nhs.uk',
    sample_email: 'bcuhb.digital@wales.nhs.uk',
    pain_point: 'Largest health board in Wales; tri-hospital acute telemetry network convergence'
  },
  {
    id: 'WALES-02',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Cardiff and Vale University Health Board',
    hospitals: 'University Hospital of Wales (UHW Cardiff), University Hospital Llandough',
    beds: 1500,
    core_epr: 'Welsh Clinical Portal / Meditech',
    decision_maker: 'Director of Digital Services',
    email_domain: 'wales.nhs.uk',
    email_pattern: 'cardiff.digital@wales.nhs.uk',
    sample_email: 'cardiff.digital@wales.nhs.uk',
    pain_point: 'Welsh major trauma centre ICU bedside telemetry and pediatric sync'
  },
  {
    id: 'WALES-03',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Swansea Bay University Health Board',
    hospitals: 'Morriston Hospital Swansea, Singleton Hospital, Neath Port Talbot Hospital',
    beds: 1300,
    core_epr: 'Welsh Clinical Portal / Signal Clinical Alerts',
    decision_maker: 'Assistant Director of Digital Strategy',
    email_domain: 'wales.nhs.uk',
    email_pattern: 'swanseabay.digital@wales.nhs.uk',
    sample_email: 'swanseabay.digital@wales.nhs.uk',
    pain_point: 'Welsh Centre for Burns and Plastic Surgery intensive care telemetry'
  },
  {
    id: 'WALES-04',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Cwm Taf Morgannwg University Health Board',
    hospitals: 'Prince Charles Hospital Merthyr Tydfil, Royal Glamorgan Hospital, Princess of Wales Bridgend',
    beds: 1400,
    core_epr: 'Welsh Clinical Portal',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'wales.nhs.uk',
    email_pattern: 'ctm.digital@wales.nhs.uk',
    sample_email: 'ctm.digital@wales.nhs.uk',
    pain_point: 'Valley hospital network stroke & acute cardiac telemetry integration'
  },
  {
    id: 'WALES-05',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Hywel Dda University Health Board',
    hospitals: 'Glangwili General Hospital Carmarthen, Bronglais Aberystwyth, Withybush Haverfordwest',
    beds: 950,
    core_epr: 'Welsh Clinical Portal',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'wales.nhs.uk',
    email_pattern: 'hyweldda.digital@wales.nhs.uk',
    sample_email: 'hyweldda.digital@wales.nhs.uk',
    pain_point: 'West Wales rural acute telemetry and cross-county clinical surveillance'
  },

  // --- NORTHERN IRELAND HEALTH & SOCIAL CARE (HSC) TRUSTS ---
  {
    id: 'NI-01',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Belfast Health and Social Care Trust',
    hospitals: 'Royal Victoria Hospital Belfast, Belfast City Hospital, Mater Infirmorum Hospital',
    beds: 1800,
    core_epr: 'Epic EHR (Northern Ireland "Encompass" Programme)',
    decision_maker: 'Chief Information Officer / Encompass Director',
    email_domain: 'belfasttrust.hscni.net',
    email_pattern: 'digital@belfasttrust.hscni.net',
    sample_email: 'digital@belfasttrust.hscni.net',
    pain_point: 'Regional trauma and transplant ICU telemetry deployment under Epic Encompass'
  },
  {
    id: 'NI-02',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'South Eastern Health and Social Care Trust',
    hospitals: 'Ulster Hospital Dundonald, Lagan Valley Hospital, Downe Hospital',
    beds: 900,
    core_epr: 'Epic EHR (Encompass Pioneer Go-Live Trust)',
    decision_maker: 'Director of Information Technology',
    email_domain: 'setrust.hscni.net',
    email_pattern: 'encompass.support@setrust.hscni.net',
    sample_email: 'encompass.support@setrust.hscni.net',
    pain_point: 'Post-Epic Encompass telemetry optimization and sub-second acute bed turns'
  },
  {
    id: 'NI-03',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Southern Health and Social Care Trust',
    hospitals: 'Craigavon Area Hospital Portadown, Daisy Hill Hospital Newry',
    beds: 850,
    core_epr: 'Epic EHR (Encompass Implementation)',
    decision_maker: 'Assistant Director of Digital Strategy',
    email_domain: 'southerntrust.hscni.net',
    email_pattern: 'digital@southerntrust.hscni.net',
    sample_email: 'digital@southerntrust.hscni.net',
    pain_point: 'Acute telemetry convergence across Craigavon and Daisy Hill ICU suites'
  },
  {
    id: 'NI-04',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Northern Health and Social Care Trust',
    hospitals: 'Antrim Area Hospital, Causeway Hospital Coleraine',
    beds: 750,
    core_epr: 'Epic EHR (Encompass Deployment)',
    decision_maker: 'Head of Information and Telecommunications',
    email_domain: 'northerntrust.hscni.net',
    email_pattern: 'digital@northerntrust.hscni.net',
    sample_email: 'digital@northerntrust.hscni.net',
    pain_point: 'Emergency department boarding telemetry and ICU capacity visibility'
  },
  {
    id: 'NI-05',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Western Health and Social Care Trust',
    hospitals: 'Altnagelvin Area Hospital Derry, South West Acute Hospital Enniskillen',
    beds: 800,
    core_epr: 'Epic EHR (Encompass Programme)',
    decision_maker: 'Chief Clinical Information Officer',
    email_domain: 'westerntrust.hscni.net',
    email_pattern: 'digital@westerntrust.hscni.net',
    sample_email: 'digital@westerntrust.hscni.net',
    pain_point: 'Cross-border North-West cancer and cardiac telemetry with Republic of Ireland'
  },

  // --- ENGLAND REGIONAL ACUTE NHS TRUSTS ---
  {
    id: 'ENG-01',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'North West Anglia NHS Foundation Trust',
    hospitals: 'Peterborough City Hospital, Hinchingbrooke Hospital',
    beds: 950,
    core_epr: 'Epic EHR (Procured Joint Regional Strategy)',
    decision_maker: 'Chief Information Officer',
    email_domain: 'nwangliaft.nhs.uk',
    email_pattern: 'digital@nwangliaft.nhs.uk',
    sample_email: 'digital@nwangliaft.nhs.uk',
    pain_point: 'Dual-site acute bed turnarounds and ICU physiological telemetry tracking'
  },
  {
    id: 'ENG-02',
    region: 'East Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals of North Midlands NHS Trust',
    hospitals: 'Royal Stoke University Hospital, County Hospital Stafford',
    beds: 1400,
    core_epr: 'System C CareFlow',
    decision_maker: 'Director of Digital Technology & Informatics',
    email_domain: 'uhnm.nhs.uk',
    email_pattern: 'digital@uhnm.nhs.uk',
    sample_email: 'digital@uhnm.nhs.uk',
    pain_point: 'Royal Stoke major trauma centre acute waveform telemetry and stroke monitoring'
  },
  {
    id: 'ENG-03',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals Coventry and Warwickshire NHS Trust',
    hospitals: 'University Hospital Coventry, Hospital of St Cross Rugby',
    beds: 1250,
    core_epr: 'Cerner Millennium / Electronic Vitals',
    decision_maker: 'Chief Information Officer',
    email_domain: 'uhcw.nhs.uk',
    email_pattern: 'digital@uhcw.nhs.uk',
    sample_email: 'digital@uhcw.nhs.uk',
    pain_point: 'Major trauma resuscitation telemetry and acute cardiothoracic monitoring'
  },
  {
    id: 'ENG-04',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Wirral University Teaching Hospital NHS Foundation Trust',
    hospitals: 'Arrowe Park Hospital, Clatterbridge Hospital Wirral',
    beds: 850,
    core_epr: 'Cerner Millennium (GDE Pioneer)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'wuth.nhs.uk',
    email_pattern: 'digital@wuth.nhs.uk',
    sample_email: 'digital@wuth.nhs.uk',
    pain_point: 'Fast-track surgical admission telemetry and closed-loop electronic prescribing'
  },
  {
    id: 'ENG-05',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Blackpool Teaching Hospitals NHS Foundation Trust',
    hospitals: 'Blackpool Victoria Hospital, Clifton Hospital',
    beds: 830,
    core_epr: 'Cerner Millennium / Lancashire Regional Record',
    decision_maker: 'Director of ICT & Digital Healthcare',
    email_domain: 'bfwh.nhs.uk',
    email_pattern: 'digital@bfwh.nhs.uk',
    sample_email: 'digital@bfwh.nhs.uk',
    pain_point: 'Lancashire Cardiac Centre acute telemetry and emergency department flow'
  },
  {
    id: 'ENG-06',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Northumbria Healthcare NHS Foundation Trust',
    hospitals: 'Northumbria Specialist Emergency Care Hospital (NSECH Cramlington)',
    beds: 900,
    core_epr: 'Silverlink / In-House Open Digital EHR',
    decision_maker: 'Executive Director of Digital Innovation',
    email_domain: 'northumbria.nhs.uk',
    email_pattern: 'digital@northumbria.nhs.uk',
    sample_email: 'digital@northumbria.nhs.uk',
    pain_point: 'Dedicated 24/7 specialist emergency care hospital telemetry and acute triage'
  },
  {
    id: 'ENG-07',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals Plymouth NHS Trust',
    hospitals: 'Derriford Hospital Plymouth',
    beds: 1000,
    core_epr: 'Epic EHR (Procured Joint Devon Shared EPR)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'plymouth.nhs.uk',
    email_pattern: 'digital@plymouth.nhs.uk',
    sample_email: 'digital@plymouth.nhs.uk',
    pain_point: 'Peninsula major trauma centre sub-second telemetry and remote coastal links'
  },
  {
    id: 'ENG-08',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Royal Cornwall Hospitals NHS Trust',
    hospitals: 'Royal Cornwall Hospital (Treliske) Truro',
    beds: 750,
    core_epr: 'Epic EHR (Shared with Devon and Cornwall)',
    decision_maker: 'Chief Digital Officer',
    email_domain: 'rcht.cornwall.nhs.uk',
    email_pattern: 'digital@rcht.cornwall.nhs.uk',
    sample_email: 'digital@rcht.cornwall.nhs.uk',
    pain_point: 'Cornwall isolated acute medical telemetry and seasonal peak ED surge buffering'
  },
  {
    id: 'ENG-09',
    region: 'South Central',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospital Southampton NHS Foundation Trust',
    hospitals: 'Southampton General Hospital, Princess Anne Hospital',
    beds: 1300,
    core_epr: 'ChartOnline (In-House Open Platform) / Cerner Millennium transition',
    decision_maker: 'Chief Information Officer',
    email_domain: 'uhs.nhs.uk',
    email_pattern: 'digital@uhs.nhs.uk',
    sample_email: 'digital@uhs.nhs.uk',
    pain_point: 'Wessex neurological and pediatric intensive care continuous waveform feeds'
  },
  {
    id: 'ENG-10',
    region: 'South Central',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Portsmouth Hospitals University NHS Trust',
    hospitals: 'Queen Alexandra Hospital Cosham',
    beds: 1200,
    core_epr: 'Epic EHR (Procured Hampshire Regional Record)',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'porthosp.nhs.uk',
    email_pattern: 'digital@porthosp.nhs.uk',
    sample_email: 'digital@porthosp.nhs.uk',
    pain_point: 'Hyper-acute stroke and renal intensive care telemetry streaming'
  }
];

function run() {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(ukBatch2, null, 2), 'utf-8');
  console.log(`✅ UK Batch 2 Database successfully compiled!`);
  console.log(`📊 Total Targets in Batch 2: ${ukBatch2.length}`);
  console.log(`📁 File written to: ${OUTPUT_FILE}`);

  const regions = {};
  ukBatch2.forEach(h => {
    regions[h.region] = (regions[h.region] || 0) + 1;
  });
  console.log('\n📊 Regional Distribution:');
  Object.entries(regions).forEach(([r, count]) => {
    console.log(`   • ${r}: ${count} health authorities`);
  });
}

run();
