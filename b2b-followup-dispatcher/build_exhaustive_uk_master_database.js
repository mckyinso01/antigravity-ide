// ============================================================
// Exhaustive UK Master Hospital Database Builder (Batch 2 Full Expansion)
// Covers Every NHS Acute Trust & Territorial Health Board across UK
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, 'UK_HOSPITALS_BATCH_2_EXHAUSTIVE_DATABASE.json');
const DISPATCH_LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

const fullRoster = [
  // ============================================================
  // SCOTLAND - ALL TERRITORIAL HEALTH BOARDS
  // ============================================================
  {
    id: 'SCOT-01',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Greater Glasgow and Clyde',
    hospital_sites: 'Queen Elizabeth University Hospital (QEUH), Glasgow Royal Infirmary, Royal Alexandra Hospital Paisley',
    beds: 3800,
    core_epr: 'InterSystems TrakCare / Clinical Portal',
    decision_maker: 'Director of eHealth and Digital Health',
    email_domain: 'ggc.scot.nhs.uk',
    sample_email: 'digital@ggc.scot.nhs.uk',
    pain_point: 'UK’s largest acute hospital campus (QEUH) multi-building ICU telemetry streaming'
  },
  {
    id: 'SCOT-02',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Lothian',
    hospital_sites: 'Royal Infirmary of Edinburgh, Western General Hospital, St John’s Hospital Livingston',
    beds: 2600,
    core_epr: 'InterSystems TrakCare (National Scottish Standard)',
    decision_maker: 'Director of Digital Services & eHealth',
    email_domain: 'nhslothian.scot.nhs.uk',
    sample_email: 'digital@nhslothian.scot.nhs.uk',
    pain_point: 'Edinburgh major trauma centre acute physiological waveform latency reduction'
  },
  {
    id: 'SCOT-03',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Grampian',
    hospital_sites: 'Aberdeen Royal Infirmary, Royal Aberdeen Children’s Hospital, Dr Gray’s Hospital Elgin',
    beds: 1200,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Director of Digital & Information Technology',
    email_domain: 'nhs.scot',
    sample_email: 'gram.digital@nhs.scot',
    pain_point: 'Grampian rural acute telemedicine and North Sea offshore/remote ICU telemetry links'
  },
  {
    id: 'SCOT-04',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Tayside',
    hospital_sites: 'Ninewells Hospital Dundee, Perth Royal Infirmary',
    beds: 1100,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Director of Digital Innovation',
    email_domain: 'nhs.scot',
    sample_email: 'tay.digital@nhs.scot',
    pain_point: 'Ninewells major trauma centre acute physiological telemetry monitoring'
  },
  {
    id: 'SCOT-05',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Fife',
    hospital_sites: 'Victoria Hospital Kirkcaldy, Queen Margaret Hospital Dunfermline',
    beds: 750,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Associate Director of Digital & Information',
    email_domain: 'nhs.scot',
    sample_email: 'fife.digital@nhs.scot',
    pain_point: 'Elective orthopedic and acute surgical telemetry integration'
  },
  {
    id: 'SCOT-06',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Highland',
    hospital_sites: 'Raigmore Hospital Inverness, Caithness General Hospital Wick, Belford Hospital Fort William',
    beds: 650,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Head of Digital Transformation',
    email_domain: 'nhs.scot',
    sample_email: 'highland.digital@nhs.scot',
    pain_point: 'Highland remote emergency department telemetry and island hospital air-transfer coordination'
  },
  {
    id: 'SCOT-07',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Lanarkshire',
    hospital_sites: 'University Hospital Wishaw, University Hospital Monklands, University Hospital Hairmyres',
    beds: 1300,
    core_epr: 'InterSystems TrakCare / Monklands Replacement Project',
    decision_maker: 'Director of Information and Digital Technology',
    email_domain: 'nhs.scot',
    sample_email: 'lanarkshire.digital@nhs.scot',
    pain_point: 'New Monklands digital hospital planning and tri-site telemetry synchronization'
  },
  {
    id: 'SCOT-08',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Ayrshire and Arran',
    hospital_sites: 'University Hospital Crosshouse Kilmarnock, University Hospital Ayr',
    beds: 850,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Director of Digital Services',
    email_domain: 'aapct.scot.nhs.uk',
    sample_email: 'clinical.systems@aapct.scot.nhs.uk',
    pain_point: 'Acute medical admission telemetry and rapid response bedside alerts'
  },
  {
    id: 'SCOT-09',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Forth Valley',
    hospital_sites: 'Forth Valley Royal Hospital Larbert',
    beds: 860,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Head of Clinical Systems',
    email_domain: 'nhs.scot',
    sample_email: 'fv.digital@nhs.scot',
    pain_point: 'Automated robotic pharmacy & single-bed ICU ward telemetry verification'
  },
  {
    id: 'SCOT-10',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Dumfries and Galloway',
    hospital_sites: 'Dumfries and Galloway Royal Infirmary, Galloway Community Hospital Stranraer',
    beds: 400,
    core_epr: 'InterSystems TrakCare (100% Single-Room Digital Hospital)',
    decision_maker: 'Director of Digital Health',
    email_domain: 'nhs.scot',
    sample_email: 'dg.digital@nhs.scot',
    pain_point: '100% single-patient room acoustic telemetry and remote clinical monitoring'
  },
  {
    id: 'SCOT-11',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'NHS Borders',
    hospital_sites: 'Borders General Hospital Melrose',
    beds: 320,
    core_epr: 'InterSystems TrakCare',
    decision_maker: 'Head of Information and eHealth',
    email_domain: 'borders.scot.nhs.uk',
    sample_email: 'digital@borders.scot.nhs.uk',
    pain_point: 'Borders acute admissions unit telemetry and rapid deterioration alert routing'
  },
  {
    id: 'SCOT-12',
    region: 'Scotland',
    category: 'Scottish Territorial Health Board',
    trust_name: 'Golden Jubilee National Hospital',
    hospital_sites: 'Golden Jubilee University National Hospital Clydebank',
    beds: 300,
    core_epr: 'InterSystems TrakCare Specialist Cardiac',
    decision_maker: 'Chief Information Officer',
    email_domain: 'gjnh.scot.nhs.uk',
    sample_email: 'digital@gjnh.scot.nhs.uk',
    pain_point: 'National advanced heart failure and cardiothoracic surgical telemetry'
  },

  // ============================================================
  // WALES - ALL UNIVERSITY HEALTH BOARDS & TRUSTS
  // ============================================================
  {
    id: 'WALES-01',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Betsi Cadwaladr University Health Board (BCUHB)',
    hospital_sites: 'Ysbyty Gwynedd Bangor, Ysbyty Glan Clwyd Bodelwyddan, Wrexham Maelor Hospital',
    beds: 1900,
    core_epr: 'Welsh Clinical Portal (WCP) / Digital Health and Care Wales',
    decision_maker: 'Executive Director of Digital & Technology',
    email_domain: 'wales.nhs.uk',
    sample_email: 'bcuhb.digital@wales.nhs.uk',
    pain_point: 'Largest health board in Wales; tri-hospital acute telemetry network convergence'
  },
  {
    id: 'WALES-02',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Cardiff and Vale University Health Board',
    hospital_sites: 'University Hospital of Wales (UHW Cardiff), University Hospital Llandough',
    beds: 1500,
    core_epr: 'Welsh Clinical Portal / Meditech',
    decision_maker: 'Director of Digital Services',
    email_domain: 'wales.nhs.uk',
    sample_email: 'cardiff.digital@wales.nhs.uk',
    pain_point: 'Welsh major trauma centre ICU bedside telemetry and pediatric sync'
  },
  {
    id: 'WALES-03',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Swansea Bay University Health Board',
    hospital_sites: 'Morriston Hospital Swansea, Singleton Hospital, Neath Port Talbot Hospital',
    beds: 1300,
    core_epr: 'Welsh Clinical Portal / Signal Clinical Alerts',
    decision_maker: 'Assistant Director of Digital Strategy',
    email_domain: 'wales.nhs.uk',
    sample_email: 'swanseabay.digital@wales.nhs.uk',
    pain_point: 'Welsh Centre for Burns and Plastic Surgery intensive care telemetry'
  },
  {
    id: 'WALES-04',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Aneurin Bevan University Health Board',
    hospital_sites: 'The Grange University Hospital Cwmbran (Specialist Critical Care), Royal Gwent Hospital Newport, Nevill Hall Abergavenny',
    beds: 1600,
    core_epr: 'Welsh Clinical Portal / Clinical Workstation',
    decision_maker: 'Director of Digital and Information',
    email_domain: 'wales.nhs.uk',
    sample_email: 'aneurinbevan.digital@wales.nhs.uk',
    pain_point: 'The Grange 470-bed specialist critical care center acute ICU waveform orchestration'
  },
  {
    id: 'WALES-05',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Cwm Taf Morgannwg University Health Board',
    hospital_sites: 'Prince Charles Hospital Merthyr Tydfil, Royal Glamorgan Hospital Llantrisant, Princess of Wales Bridgend',
    beds: 1400,
    core_epr: 'Welsh Clinical Portal',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'wales.nhs.uk',
    sample_email: 'ctm.digital@wales.nhs.uk',
    pain_point: 'Valley hospital network stroke & acute cardiac telemetry integration'
  },
  {
    id: 'WALES-06',
    region: 'Wales',
    category: 'Welsh University Health Board',
    trust_name: 'Hywel Dda University Health Board',
    hospital_sites: 'Glangwili General Hospital Carmarthen, Bronglais Hospital Aberystwyth, Withybush Haverfordwest, Prince Philip Llanelli',
    beds: 950,
    core_epr: 'Welsh Clinical Portal',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'wales.nhs.uk',
    sample_email: 'hyweldda.digital@wales.nhs.uk',
    pain_point: 'West Wales rural acute telemetry and cross-county clinical surveillance'
  },
  {
    id: 'WALES-07',
    region: 'Wales',
    category: 'Welsh Specialist NHS Trust',
    trust_name: 'Velindre University NHS Trust',
    hospital_sites: 'Velindre Cancer Centre Cardiff',
    beds: 180,
    core_epr: 'ChemoCare / Welsh Clinical Portal Oncology Module',
    decision_maker: 'Head of Digital Informatics',
    email_domain: 'wales.nhs.uk',
    sample_email: 'velindre.digital@wales.nhs.uk',
    pain_point: 'New Velindre Cancer Centre high-acuity systemic anti-cancer therapy (SACT) telemetry'
  },

  // ============================================================
  // NORTHERN IRELAND - ALL HSC HEALTH & SOCIAL CARE TRUSTS
  // ============================================================
  {
    id: 'NI-01',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Belfast Health and Social Care Trust',
    hospital_sites: 'Royal Victoria Hospital Belfast, Belfast City Hospital, Mater Infirmorum Hospital',
    beds: 1800,
    core_epr: 'Epic EHR (Northern Ireland "Encompass" Programme)',
    decision_maker: 'Chief Information Officer / Encompass Director',
    email_domain: 'belfasttrust.hscni.net',
    sample_email: 'digital@belfasttrust.hscni.net',
    pain_point: 'Regional trauma and transplant ICU telemetry deployment under Epic Encompass'
  },
  {
    id: 'NI-02',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'South Eastern Health and Social Care Trust',
    hospital_sites: 'Ulster Hospital Dundonald, Lagan Valley Hospital Lisburn, Downe Hospital Downpatrick',
    beds: 900,
    core_epr: 'Epic EHR (Encompass Pioneer Go-Live Trust)',
    decision_maker: 'Director of Information Technology',
    email_domain: 'setrust.hscni.net',
    sample_email: 'encompass.support@setrust.hscni.net',
    pain_point: 'Post-Epic Encompass telemetry optimization and sub-second acute bed turns'
  },
  {
    id: 'NI-03',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Southern Health and Social Care Trust',
    hospital_sites: 'Craigavon Area Hospital Portadown, Daisy Hill Hospital Newry',
    beds: 850,
    core_epr: 'Epic EHR (Encompass Implementation)',
    decision_maker: 'Assistant Director of Digital Strategy',
    email_domain: 'southerntrust.hscni.net',
    sample_email: 'digital@southerntrust.hscni.net',
    pain_point: 'Acute telemetry convergence across Craigavon and Daisy Hill ICU suites'
  },
  {
    id: 'NI-04',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Northern Health and Social Care Trust',
    hospital_sites: 'Antrim Area Hospital, Causeway Hospital Coleraine',
    beds: 750,
    core_epr: 'Epic EHR (Encompass Deployment)',
    decision_maker: 'Head of Information and Telecommunications',
    email_domain: 'northerntrust.hscni.net',
    sample_email: 'digital@northerntrust.hscni.net',
    pain_point: 'Emergency department boarding telemetry and ICU capacity visibility'
  },
  {
    id: 'NI-05',
    region: 'Northern Ireland',
    category: 'Northern Ireland HSC Trust',
    trust_name: 'Western Health and Social Care Trust',
    hospital_sites: 'Altnagelvin Area Hospital Derry, South West Acute Hospital Enniskillen',
    beds: 800,
    core_epr: 'Epic EHR (Encompass Programme)',
    decision_maker: 'Chief Clinical Information Officer',
    email_domain: 'westerntrust.hscni.net',
    sample_email: 'digital@westerntrust.hscni.net',
    pain_point: 'Cross-border North-West cancer and cardiac telemetry with Republic of Ireland'
  },

  // ============================================================
  // ENGLAND - REGIONAL ACUTE NHS TRUSTS (EXPANDED BY REGION)
  // ============================================================

  // --- YORKSHIRE & THE HUMBER ---
  {
    id: 'YORK-01',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Hull University Teaching Hospitals NHS Trust',
    hospital_sites: 'Hull Royal Infirmary, Castle Hill Hospital Cottingham',
    beds: 1200,
    core_epr: 'Lorenzo / Nervecentre transitioning',
    decision_maker: 'Director of Digital Services',
    email_domain: 'hey.nhs.uk',
    sample_email: 'digital@hey.nhs.uk',
    pain_point: 'Humber major trauma centre and cardiothoracic acute telemetry feeds'
  },
  {
    id: 'YORK-02',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'York and Scarborough Teaching Hospitals NHS Foundation Trust',
    hospital_sites: 'York Hospital, Scarborough Hospital',
    beds: 1050,
    core_epr: 'System C CareFlow',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'york.nhs.uk',
    sample_email: 'digital@york.nhs.uk',
    pain_point: 'Dual-site acute medical telemetry across North Yorkshire coastal network'
  },
  {
    id: 'YORK-03',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Mid Yorkshire Teaching NHS Trust',
    hospital_sites: 'Pinderfields Hospital Wakefield, Dewsbury and District Hospital, Pontefract Hospital',
    beds: 1100,
    core_epr: 'System C CareFlow EPR',
    decision_maker: 'Director of Digital and Information Technology',
    email_domain: 'midyorks.nhs.uk',
    sample_email: 'digital@midyorks.nhs.uk',
    pain_point: 'Regional burns center and acute trauma telemetry synchronisation'
  },
  {
    id: 'YORK-04',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Calderdale and Huddersfield NHS Foundation Trust',
    hospital_sites: 'Calderdale Royal Hospital Halifax, Huddersfield Royal Infirmary',
    beds: 800,
    core_epr: 'Cerner Millennium (GDE Pioneer)',
    decision_maker: 'Assistant Director of Digital Health',
    email_domain: 'cht.nhs.uk',
    sample_email: 'digital@cht.nhs.uk',
    pain_point: 'Cross-Pennine dual-site acute vitals alerting and electronic bed monitoring'
  },
  {
    id: 'YORK-05',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Bradford Teaching Hospitals NHS Foundation Trust',
    hospital_sites: 'Bradford Royal Infirmary, St Luke’s Hospital Bradford',
    beds: 850,
    core_epr: 'Cerner Millennium (Shared with CHFT)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'bthft.nhs.uk',
    sample_email: 'digital@bthft.nhs.uk',
    pain_point: 'AI-assisted Command Centre acute patient flow and ICU telemetry orchestration'
  },
  {
    id: 'YORK-06',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Doncaster and Bassetlaw Teaching Hospitals NHS Foundation Trust',
    hospital_sites: 'Doncaster Royal Infirmary, Bassetlaw Hospital Worksop, Montagu Hospital Mexborough',
    beds: 800,
    core_epr: 'System C CareFlow',
    decision_maker: 'Chief Information Officer',
    email_domain: 'dbth.nhs.uk',
    sample_email: 'digital@dbth.nhs.uk',
    pain_point: 'South Yorkshire and North Notts acute admission telemetry routing'
  },
  {
    id: 'YORK-07',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'The Rotherham NHS Foundation Trust',
    hospital_sites: 'Rotherham Hospital',
    beds: 500,
    core_epr: 'Meditech Magic / Expanse upgrade',
    decision_maker: 'Head of Health Informatics',
    email_domain: 'rothgen.nhs.uk',
    sample_email: 'digital@rothgen.nhs.uk',
    pain_point: 'Acute emergency care and high-dependency telemetry upgrade'
  },
  {
    id: 'YORK-08',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Barnsley Hospital NHS Foundation Trust',
    hospital_sites: 'Barnsley Hospital',
    beds: 450,
    core_epr: 'System C CareFlow',
    decision_maker: 'Director of ICT',
    email_domain: 'barnsley.nhs.uk',
    sample_email: 'digital@barnsley.nhs.uk',
    pain_point: 'Rapid clinical response and ward vital signs early warning integration'
  },
  {
    id: 'YORK-09',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Northern Lincolnshire and Goole NHS Foundation Trust',
    hospital_sites: 'Diana Princess of Wales Hospital Grimsby, Scunthorpe General Hospital, Goole Hospital',
    beds: 750,
    core_epr: 'System C CareFlow / Joint Humber Procurement',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'nlg.nhs.uk',
    sample_email: 'digital@nlg.nhs.uk',
    pain_point: 'Estuary acute trauma and emergency department telemetry balancing'
  },
  {
    id: 'YORK-10',
    region: 'Yorkshire and the Humber',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Harrogate and District NHS Foundation Trust',
    hospital_sites: 'Harrogate District Hospital, Ripon Community Hospital',
    beds: 400,
    core_epr: 'Strata Health / SystmOne Acute',
    decision_maker: 'Head of Digital Services',
    email_domain: 'hdft.nhs.uk',
    sample_email: 'digital@hdft.nhs.uk',
    pain_point: 'Elective surgical telemetry and integrated community acute step-down monitoring'
  },

  // --- NORTH WEST ---
  {
    id: 'NW-01',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Liverpool University Hospitals NHS Foundation Trust',
    hospital_sites: 'Royal Liverpool University Hospital (Brand New 646-Bed PFI), Aintree University Hospital, Broadgreen Hospital',
    beds: 1700,
    core_epr: 'Silverlink / Altera Digital Health (Sunrise EPR)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'liverpoolft.nhs.uk',
    sample_email: 'digital@liverpoolft.nhs.uk',
    pain_point: 'New Royal Liverpool 100% single-room ICU acoustic telemetry and Aintree trauma feeds'
  },
  {
    id: 'NW-02',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Northern Care Alliance NHS Foundation Trust',
    hospital_sites: 'Salford Royal Hospital (Major Trauma & Neuro), The Royal Oldham Hospital, Fairfield General Bury, Rochdale Infirmary',
    beds: 2000,
    core_epr: 'Altera Digital Health (Sunrise EPR - Global Digital Exemplar)',
    decision_maker: 'Chief Digital and Information Officer',
    email_domain: 'nca.nhs.uk',
    sample_email: 'digital@nca.nhs.uk',
    pain_point: 'Greater Manchester neurosciences and regional major trauma continuous waveform streaming'
  },
  {
    id: 'NW-03',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Lancashire Teaching Hospitals NHS Foundation Trust',
    hospital_sites: 'Royal Preston Hospital (Major Trauma), Chorley and South Ribble Hospital',
    beds: 1000,
    core_epr: 'QuadraMed / Regional Shared Care Record',
    decision_maker: 'Director of Digital Services',
    email_domain: 'lthtr.nhs.uk',
    sample_email: 'digital@lthtr.nhs.uk',
    pain_point: 'Preston neurosurgical and major trauma resuscitation unit sub-second telemetry'
  },
  {
    id: 'NW-04',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'East Lancashire Hospitals NHS Trust',
    hospital_sites: 'Royal Blackburn Teaching Hospital, Burnley General Teaching Hospital',
    beds: 1000,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Executive Director of Digital Healthcare',
    email_domain: 'elht.nhs.uk',
    sample_email: 'digital@elht.nhs.uk',
    pain_point: 'East Lancashire hyper-acute stroke unit and vascular surgical telemetry'
  },
  {
    id: 'NW-05',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals of Morecambe Bay NHS Foundation Trust',
    hospital_sites: 'Royal Lancaster Infirmary, Furness General Hospital Barrow-in-Furness, Westmorland General Kendal',
    beds: 800,
    core_epr: 'Lorenzo / In-House Lorenzo Migration',
    decision_maker: 'Chief Information Officer',
    email_domain: 'mbht.nhs.uk',
    sample_email: 'digital@mbht.nhs.uk',
    pain_point: 'Remote Morecambe Bay coastal acute telemetry and tri-hospital patient distribution'
  },
  {
    id: 'NW-06',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Mersey and West Lancashire Teaching Hospitals NHS Trust',
    hospital_sites: 'Whiston Hospital Prescot, St Helens Hospital, Southport and Formby District General, Ormskirk Hospital',
    beds: 1200,
    core_epr: 'Medway EPR / System C',
    decision_maker: 'Director of Digital and Information Technology',
    email_domain: 'sthk.nhs.uk',
    sample_email: 'digital@sthk.nhs.uk',
    pain_point: 'Mersey regional burns unit and Merseyside acute admission telemetry harmonization'
  },
  {
    id: 'NW-07',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Countess of Chester Hospital NHS Foundation Trust',
    hospital_sites: 'Countess of Chester Hospital',
    beds: 600,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'coch.nhs.uk',
    sample_email: 'digital@coch.nhs.uk',
    pain_point: 'Cross-border England-Wales acute bed turnover telemetry and intensive care surveillance'
  },
  {
    id: 'NW-08',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Warrington and Halton Teaching Hospitals NHS Foundation Trust',
    hospital_sites: 'Warrington Hospital, Halton General Hospital Runcorn',
    beds: 550,
    core_epr: 'Lorenzo / Cerner transition',
    decision_maker: 'Associate Director of IT',
    email_domain: 'whh.nhs.uk',
    sample_email: 'digital@whh.nhs.uk',
    pain_point: 'Acute emergency admissions and intensive care telemetry synchronization'
  },
  {
    id: 'NW-09',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Stockport NHS Foundation Trust',
    hospital_sites: 'Stepping Hill Hospital Stockport',
    beds: 750,
    core_epr: 'Lorenzo / Epic regional scoping',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'stockport.nhs.uk',
    sample_email: 'digital@stockport.nhs.uk',
    pain_point: 'Stepping Hill hyper-acute stroke unit telemetry and neonatal intensive care tracking'
  },
  {
    id: 'NW-10',
    region: 'North West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Mid Cheshire Hospitals NHS Foundation Trust',
    hospital_sites: 'Leighton Hospital Crewe, Victoria Infirmary Northwich',
    beds: 540,
    core_epr: 'Medway (System C) / New Hospital Programme RAAC Replacement',
    decision_maker: 'Director of Digital Technology',
    email_domain: 'mcht.nhs.uk',
    sample_email: 'digital@mcht.nhs.uk',
    pain_point: 'New Leighton Hospital digital blueprint and RAAC ward telemetry continuity'
  },

  // --- NORTH EAST & CUMBRIA ---
  {
    id: 'NE-01',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'The Newcastle upon Tyne Hospitals NHS Foundation Trust',
    hospital_sites: 'Royal Victoria Infirmary (RVI Major Trauma), Freeman Hospital (Cardiothoracic & Transplant)',
    beds: 1800,
    core_epr: 'Cerner Millennium (GDE Flagship)',
    decision_maker: 'Chief Information Officer',
    email_domain: 'nuth.nhs.uk',
    sample_email: 'digital@nuth.nhs.uk',
    pain_point: 'Heart/lung transplant acute ICU waveform telemetry and Great North Children’s Hospital sync'
  },
  {
    id: 'NE-02',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'South Tees Hospitals NHS Foundation Trust',
    hospital_sites: 'The James Cook University Hospital Middlesbrough (Major Trauma), Friarage Hospital Northallerton',
    beds: 1000,
    core_epr: 'Altera Digital Health (Sunrise EPR)',
    decision_maker: 'Director of Digital Healthcare',
    email_domain: 'stees.nhs.uk',
    sample_email: 'digital@stees.nhs.uk',
    pain_point: 'James Cook regional cardiothoracic and spinal injuries ICU sub-second telemetry'
  },
  {
    id: 'NE-03',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'North Tees and Hartlepool NHS Foundation Trust',
    hospital_sites: 'University Hospital of North Tees Stockton-on-Tees, University Hospital of Hartlepool',
    beds: 650,
    core_epr: 'TrakCare / InterSystems',
    decision_maker: 'Associate Director of Digital Transformation',
    email_domain: 'nth.nhs.uk',
    sample_email: 'digital@nth.nhs.uk',
    pain_point: 'Joint clinical strategy with South Tees; dual-trust acute vitals monitoring'
  },
  {
    id: 'NE-04',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'County Durham and Darlington NHS Foundation Trust',
    hospital_sites: 'University Hospital of North Durham, Darlington Memorial Hospital',
    beds: 850,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Director of Health Informatics',
    email_domain: 'cddft.nhs.uk',
    sample_email: 'digital@cddft.nhs.uk',
    pain_point: 'County-wide dual acute site ICU telemetry alignment and mobile alert dispatch'
  },
  {
    id: 'NE-05',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'South Tyneside and Sunderland NHS Foundation Trust',
    hospital_sites: 'Sunderland Royal Hospital, South Tyneside District Hospital South Shields',
    beds: 950,
    core_epr: 'Meditech Magic / Allscripts',
    decision_maker: 'Director of Digital Services',
    email_domain: 'stsft.nhs.uk',
    sample_email: 'digital@stsft.nhs.uk',
    pain_point: 'Sunderland bariatric and acute stroke ICU continuous physiological surveillance'
  },
  {
    id: 'NE-06',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Gateshead Health NHS Foundation Trust',
    hospital_sites: 'Queen Elizabeth Hospital Gateshead',
    beds: 500,
    core_epr: 'In-House Medway / System C',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'ghnt.nhs.uk',
    sample_email: 'digital@ghnt.nhs.uk',
    pain_point: 'Northern Centre for Cancer Care gynecological oncology ICU telemetry monitoring'
  },
  {
    id: 'NE-07',
    region: 'North East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'North Cumbria Integrated Care NHS Foundation Trust',
    hospital_sites: 'Cumberland Infirmary Carlisle, West Cumberland Hospital Whitehaven',
    beds: 600,
    core_epr: 'Lorenzo / Epic regional exploration',
    decision_maker: 'Director of Digital Health and Care',
    email_domain: 'ncic.nhs.uk',
    sample_email: 'digital@ncic.nhs.uk',
    pain_point: 'Geographically isolated West Cumbria trauma and Carlisle acute ICU connectivity'
  },

  // --- WEST MIDLANDS ---
  {
    id: 'WM-01',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'The Dudley Group NHS Foundation Trust',
    hospital_sites: 'Russells Hall Hospital Dudley, Guest Hospital, Corbett Hospital',
    beds: 750,
    core_epr: 'Altera Digital Health (Sunrise EPR)',
    decision_maker: 'Chief Information Officer',
    email_domain: 'dgh.nhs.uk',
    sample_email: 'digital@dgh.nhs.uk',
    pain_point: 'Black Country acute admissions and surgical high-dependency telemetry feeds'
  },
  {
    id: 'WM-02',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'The Royal Wolverhampton NHS Trust',
    hospital_sites: 'New Cross Hospital Wolverhampton, Cannock Chase Hospital',
    beds: 900,
    core_epr: 'System C CareFlow EPR',
    decision_maker: 'Director of ICT and Digital Health',
    email_domain: 'rwt.nhs.uk',
    sample_email: 'digital@rwt.nhs.uk',
    pain_point: 'Heart and lung cardiothoracic surgery ICU real-time physiological waveforms'
  },
  {
    id: 'WM-03',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Walsall Healthcare NHS Trust',
    hospital_sites: 'Walsall Manor Hospital (Brand New Urgent and Emergency Care Centre)',
    beds: 550,
    core_epr: 'System C CareFlow',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'walsallhealthcare.nhs.uk',
    sample_email: 'digital@walsallhealthcare.nhs.uk',
    pain_point: 'Brand new multi-million pound emergency centre resuscitation telemetry integration'
  },
  {
    id: 'WM-04',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Sandwell and West Birmingham NHS Trust',
    hospital_sites: 'Midland Metropolitan University Hospital Smethwick (Brand New Flagship Super-Hospital), Sandwell Hospital, City Hospital Birmingham',
    beds: 850,
    core_epr: 'Cerner Millennium (Unity EPR Programme)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'swbh.nhs.uk',
    sample_email: 'digital@swbh.nhs.uk',
    pain_point: 'New Midland Met super-hospital single-room acute telemetry deployment and bed management'
  },
  {
    id: 'WM-05',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Wye Valley NHS Trust',
    hospital_sites: 'Hereford County Hospital',
    beds: 350,
    core_epr: 'IMS Maxims',
    decision_maker: 'Associate Director of Digital Health',
    email_domain: 'wvt.nhs.uk',
    sample_email: 'digital@wvt.nhs.uk',
    pain_point: 'Herefordshire rural acute telemetry and cross-border patient monitoring'
  },
  {
    id: 'WM-06',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'South Warwickshire University NHS Foundation Trust',
    hospital_sites: 'Warwick Hospital, Stratford Hospital, Ellen Badger Hospital',
    beds: 450,
    core_epr: 'Lorenzo / EPR Convergence with George Eliot',
    decision_maker: 'Director of Digital and Information Technology',
    email_domain: 'swft.nhs.uk',
    sample_email: 'digital@swft.nhs.uk',
    pain_point: 'Foundation group dual-trust clinical telemetry harmonization'
  },
  {
    id: 'WM-07',
    region: 'West Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'George Eliot Hospital NHS Trust',
    hospital_sites: 'George Eliot Hospital Nuneaton',
    beds: 350,
    core_epr: 'Lorenzo / Group EPR Strategy',
    decision_maker: 'Head of Information and Technology',
    email_domain: 'geh.nhs.uk',
    sample_email: 'digital@geh.nhs.uk',
    pain_point: 'Acute emergency admissions unit and high dependency vitals alerting'
  },

  // --- EAST MIDLANDS ---
  {
    id: 'EM-01',
    region: 'East Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals of Leicester NHS Trust',
    hospital_sites: 'Leicester Royal Infirmary, Glenfield Hospital (Cardiothoracic & ECMO Flagship), Leicester General Hospital',
    beds: 2200,
    core_epr: 'Nervecentre Electronic EPR (Pioneer Trust)',
    decision_maker: 'Chief Information Officer',
    email_domain: 'uhl-tr.nhs.uk',
    sample_email: 'digital@uhl-tr.nhs.uk',
    pain_point: 'Glenfield national adult ECMO and paediatric cardiothoracic ICU high-frequency waveforms'
  },
  {
    id: 'EM-02',
    region: 'East Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals of Derby and Burton NHS Foundation Trust',
    hospital_sites: 'Royal Derby Hospital, Queen’s Hospital Burton upon Trent',
    beds: 1500,
    core_epr: 'Lorenzo / Nervecentre EPR Implementation',
    decision_maker: 'Executive Director of Digital Transformation',
    email_domain: 'uhdb.nhs.uk',
    sample_email: 'digital@uhdb.nhs.uk',
    pain_point: 'Merger-scale dual-acute site ICU telemetry consolidation and early warning alerts'
  },
  {
    id: 'EM-03',
    region: 'East Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'United Lincolnshire Hospitals NHS Trust',
    hospital_sites: 'Lincoln County Hospital, Pilgrim Hospital Boston, Grantham and District Hospital',
    beds: 1100,
    core_epr: 'System C CareFlow',
    decision_maker: 'Director of Digital Services',
    email_domain: 'ulh.nhs.uk',
    sample_email: 'digital@ulh.nhs.uk',
    pain_point: 'Vast rural county acute emergency telemetry and remote cardiology surveillance'
  },
  {
    id: 'EM-04',
    region: 'East Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Sherwood Forest Hospitals NHS Foundation Trust',
    hospital_sites: 'King’s Mill Hospital Mansfield, Newark Hospital',
    beds: 650,
    core_epr: 'Nervecentre Mobile EPR (Exemplar Trust)',
    decision_maker: 'Director of Digital',
    email_domain: 'sfh-tr.nhs.uk',
    sample_email: 'digital@sfh-tr.nhs.uk',
    pain_point: 'Fully mobile digital hospital bedside telemetry and sepsis early detection'
  },
  {
    id: 'EM-05',
    region: 'East Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Chesterfield Royal Hospital NHS Foundation Trust',
    hospital_sites: 'Chesterfield Royal Hospital',
    beds: 550,
    core_epr: 'Lorenzo / Meditech transition',
    decision_maker: 'Head of ICT and Systems',
    email_domain: 'chesterfieldroyal.nhs.uk',
    sample_email: 'digital@chesterfieldroyal.nhs.uk',
    pain_point: 'Brand new urgent and emergency care department telemetry integration'
  },
  {
    id: 'EM-06',
    region: 'East Midlands',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Northampton General Hospital NHS Trust',
    hospital_sites: 'Northampton General Hospital',
    beds: 750,
    core_epr: 'System C CareFlow (Group Model with Kettering)',
    decision_maker: 'Group Chief Digital Information Officer',
    email_domain: 'ngh.nhs.uk',
    sample_email: 'digital@ngh.nhs.uk',
    pain_point: 'Northamptonshire acute hospital group synchronized telemetry and bed visibility'
  },

  // --- EAST OF ENGLAND ---
  {
    id: 'EE-01',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Norfolk and Norwich University Hospitals NHS Foundation Trust',
    hospital_sites: 'Norfolk and Norwich University Hospital, Cromer Hospital',
    beds: 1250,
    core_epr: 'Silverlink / In-House / Joint Norfolk EPR Procurement',
    decision_maker: 'Chief Information Officer',
    email_domain: 'nnuh.nhs.uk',
    sample_email: 'digital@nnuh.nhs.uk',
    pain_point: 'East Anglian major acute hospital and quad-hospital Norfolk EPR telemetry convergence'
  },
  {
    id: 'EE-02',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'East Suffolk and North Essex NHS Foundation Trust',
    hospital_sites: 'Ipswich Hospital, Colchester Hospital, Clacton Hospital',
    beds: 1300,
    core_epr: 'Lorenzo / Epic regional scoping',
    decision_maker: 'Director of Digital Services',
    email_domain: 'esneft.nhs.uk',
    sample_email: 'digital@esneft.nhs.uk',
    pain_point: 'Dual-county acute ICU vitals synchronisation across Ipswich and Colchester'
  },
  {
    id: 'EE-03',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'West Suffolk NHS Foundation Trust',
    hospital_sites: 'West Suffolk Hospital Bury St Edmunds, Newmarket Community Hospital',
    beds: 500,
    core_epr: 'Cerner Millennium (GDE Exemplar / New Hospital Programme Build)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'wsh.nhs.uk',
    sample_email: 'digital@wsh.nhs.uk',
    pain_point: 'New West Suffolk digital hospital architecture and RAAC replacement telemetry'
  },
  {
    id: 'EE-04',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'James Paget University Hospitals NHS Foundation Trust',
    hospital_sites: 'James Paget University Hospital Great Yarmouth',
    beds: 500,
    core_epr: 'Lorenzo / Joint Norfolk EPR / New Hospital Programme',
    decision_maker: 'Associate Director of Digital Transformation',
    email_domain: 'jpaget.nhs.uk',
    sample_email: 'digital@jpaget.nhs.uk',
    pain_point: 'Coastal acute admissions telemetry and new NHP digital hospital design'
  },
  {
    id: 'EE-05',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'East and North Hertfordshire NHS Trust',
    hospital_sites: 'Lister Hospital Stevenage, New QEII Hospital Welwyn Garden City, Hertford County',
    beds: 750,
    core_epr: 'Lorenzo / Electronic Prescribing and Medicines Administration',
    decision_maker: 'Director of Digital Informatics',
    email_domain: 'enherts-tr.nhs.uk',
    sample_email: 'digital@enherts-tr.nhs.uk',
    pain_point: 'Lister regional renal intensive care and cardiology acute telemetry feeds'
  },
  {
    id: 'EE-06',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Mid and South Essex NHS Foundation Trust',
    hospital_sites: 'Broomfield Hospital Chelmsford, Southend University Hospital, Basildon University Hospital',
    beds: 2100,
    core_epr: 'System C CareFlow (Unified Tri-Hospital EPR)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'mse.nhs.uk',
    sample_email: 'digital@mse.nhs.uk',
    pain_point: 'One of the largest trusts in England; tri-site cardiothoracic (Basildon) and burns (Broomfield) telemetry'
  },
  {
    id: 'EE-07',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'The Queen Elizabeth Hospital King’s Lynn NHS Foundation Trust',
    hospital_sites: 'The Queen Elizabeth Hospital King’s Lynn',
    beds: 500,
    core_epr: 'Silverlink / Norfolk EPR / New Hospital Programme',
    decision_maker: 'Head of Information Technology',
    email_domain: 'qehkl.nhs.uk',
    sample_email: 'digital@qehkl.nhs.uk',
    pain_point: 'RAAC replacement hospital digital telemetry architecture and rural emergency feeds'
  },
  {
    id: 'EE-08',
    region: 'East of England',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Milton Keynes University Hospital NHS Foundation Trust',
    hospital_sites: 'Milton Keynes University Hospital',
    beds: 550,
    core_epr: 'Cerner Millennium (GDE Fast Follower / Apple Health Records Partner)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'mkuh.nhs.uk',
    sample_email: 'digital@mkuh.nhs.uk',
    pain_point: 'Pioneering robotic surgery and acute telemetry mobile smartphone integration'
  },

  // --- SOUTH EAST & HOME COUNTIES ---
  {
    id: 'SE-01',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Maidstone and Tunbridge Wells NHS Trust',
    hospital_sites: 'Tunbridge Wells Hospital (PFI 100% Single-Bed), Maidstone Hospital (Kent Oncology Centre)',
    beds: 750,
    core_epr: 'Altera Digital Health (Sunrise EPR)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'mtw.nhs.uk',
    sample_email: 'digital@mtw.nhs.uk',
    pain_point: 'National Care Coordination Centre (TeleTracking) and 100% single-bed ICU telemetry integration'
  },
  {
    id: 'SE-02',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'East Kent Hospitals University NHS Foundation Trust',
    hospital_sites: 'William Harvey Hospital Ashford, Queen Elizabeth The Queen Mother Hospital Margate, Kent and Canterbury Hospital',
    beds: 1200,
    core_epr: 'Altera Digital Health (Sunrise EPR Rollout)',
    decision_maker: 'Executive Director of Digital and Technology',
    email_domain: 'ekhuft.nhs.uk',
    sample_email: 'digital@ekhuft.nhs.uk',
    pain_point: 'Tri-site acute telemetry convergence and maternity/neonatal early warning surveillance'
  },
  {
    id: 'SE-03',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Dartford and Gravesham NHS Trust',
    hospital_sites: 'Darent Valley Hospital Dartford, Queen Mary’s Hospital Sidcup',
    beds: 550,
    core_epr: 'Altera Digital Health (Sunrise EPR Flagship)',
    decision_maker: 'Director of ICT',
    email_domain: 'dgt.nhs.uk',
    sample_email: 'digital@dgt.nhs.uk',
    pain_point: 'High-volume acute emergency care and surgical high-dependency telemetry'
  },
  {
    id: 'SE-04',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Medway NHS Foundation Trust',
    hospital_sites: 'Medway Maritime Hospital Gillingham',
    beds: 600,
    core_epr: 'Altera Digital Health (Sunrise EPR)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'medway.nhs.uk',
    sample_email: 'digital@medway.nhs.uk',
    pain_point: 'High-acuity emergency department flow and pediatric ICU telemetry integration'
  },
  {
    id: 'SE-05',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Surrey and Sussex Healthcare NHS Trust',
    hospital_sites: 'East Surrey Hospital Redhill, Crawley Hospital, Horsham Hospital',
    beds: 700,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Director of Digital Services',
    email_domain: 'sash.nhs.uk',
    sample_email: 'digital@sash.nhs.uk',
    pain_point: 'Major trauma center acute physiological telemetry and Gatwick airport emergency zone flow'
  },
  {
    id: 'SE-06',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Royal Surrey NHS Foundation Trust',
    hospital_sites: 'Royal Surrey County Hospital Guildford, St Luke’s Cancer Centre',
    beds: 500,
    core_epr: 'Cerner Millennium (Joint Surrey EPR Programme)',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'royalsurrey.nhs.uk',
    sample_email: 'digital@royalsurrey.nhs.uk',
    pain_point: 'Regional cancer centre oncological surgery and intensive care telemetry'
  },
  {
    id: 'SE-07',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Ashford and St Peter’s Hospitals NHS Foundation Trust',
    hospital_sites: 'St Peter’s Hospital Chertsey, Ashford Hospital Middlesex',
    beds: 600,
    core_epr: 'Cerner Millennium (Surrey Shared EPR)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'asph.nhs.uk',
    sample_email: 'digital@asph.nhs.uk',
    pain_point: 'Surrey acute coronary care and neonatal intensive care telemetry integration'
  },
  {
    id: 'SE-08',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals Sussex NHS Foundation Trust',
    hospital_sites: 'Royal Sussex County Hospital Brighton (Louisa Martindale Building), Worthing Hospital, St Richard’s Hospital Chichester, Princess Royal Hospital Haywards Heath',
    beds: 1750,
    core_epr: 'Nervecentre / Medway / 3T Redevelopment',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'uhsussex.nhs.uk',
    sample_email: 'digital@uhsussex.nhs.uk',
    pain_point: 'Brand new Louisa Martindale major trauma building ICU telemetry orchestration'
  },
  {
    id: 'SE-09',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'East Sussex Healthcare NHS Trust',
    hospital_sites: 'Conquest Hospital Hastings, Eastbourne District General Hospital',
    beds: 800,
    core_epr: 'Nervecentre EPR Rollout',
    decision_maker: 'Director of Digital Health',
    email_domain: 'esht.nhs.uk',
    sample_email: 'digital@esht.nhs.uk',
    pain_point: 'Dual-site acute stroke and cardiac monitoring across East Sussex'
  },
  {
    id: 'SE-10',
    region: 'South East',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Isle of Wight NHS Trust',
    hospital_sites: 'St Mary’s Hospital Newport',
    beds: 250,
    core_epr: 'System C CareFlow / Portsmouth Group Partnership',
    decision_maker: 'Head of Digital Services',
    email_domain: 'iow.nhs.uk',
    sample_email: 'digital@iow.nhs.uk',
    pain_point: 'Island isolated acute telemetry and mainland mainland helicopter transfer vitals'
  },

  // --- SOUTH WEST ---
  {
    id: 'SW-01',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals Bristol and Weston NHS Foundation Trust',
    hospital_sites: 'Bristol Royal Infirmary, Bristol Royal Hospital for Children, Bristol Heart Institute, Weston General Hospital',
    beds: 1400,
    core_epr: 'System C CareFlow EPR',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'uhbw.nhs.uk',
    sample_email: 'digital@uhbw.nhs.uk',
    pain_point: 'South West pediatric ICU and adult cardiothoracic surgery real-time waveform telemetry'
  },
  {
    id: 'SW-02',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'North Bristol NHS Trust',
    hospital_sites: 'Southmead Hospital Bristol (Brunel Building 800-Bed Major Trauma Centre)',
    beds: 850,
    core_epr: 'Lorenzo / In-House Open Digital EHR (Brunel Exemplar)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'nbt.nhs.uk',
    sample_email: 'digital@nbt.nhs.uk',
    pain_point: 'Southmead 75% single-room major trauma center and neurosciences continuous telemetry'
  },
  {
    id: 'SW-03',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Royal United Hospitals Bath NHS Foundation Trust',
    hospital_sites: 'Royal United Hospital Bath',
    beds: 650,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'ruh.nhs.uk',
    sample_email: 'digital@ruh.nhs.uk',
    pain_point: 'Dyson Cancer Centre high-acuity infusion telemetry and acute surgical monitoring'
  },
  {
    id: 'SW-04',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Great Western Hospitals NHS Foundation Trust',
    hospital_sites: 'Great Western Hospital Swindon',
    beds: 550,
    core_epr: 'System C CareFlow',
    decision_maker: 'Chief Information Officer',
    email_domain: 'gwh.nhs.uk',
    sample_email: 'digital@gwh.nhs.uk',
    pain_point: 'Brand new urgent and emergency care facility telemetry integration'
  },
  {
    id: 'SW-05',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Salisbury NHS Foundation Trust',
    hospital_sites: 'Salisbury District Hospital',
    beds: 450,
    core_epr: 'Lorenzo / Epic regional scoping',
    decision_maker: 'Director of Information Technology',
    email_domain: 'salisbury.nhs.uk',
    sample_email: 'digital@salisbury.nhs.uk',
    pain_point: 'Duke of Cornwall Spinal Treatment Centre and regional burns ICU telemetry'
  },
  {
    id: 'SW-06',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Royal Devon University Healthcare NHS Foundation Trust',
    hospital_sites: 'Royal Devon and Exeter Hospital (Wonford), North Devon District Hospital Barnstaple',
    beds: 1100,
    core_epr: 'Epic EHR (Exemplar Trust in South West)',
    decision_maker: 'Chief Digital Officer',
    email_domain: 'royaldevon.nhs.uk',
    sample_email: 'digital@royaldevon.nhs.uk',
    pain_point: 'Cross-Devon Epic EHR sub-second telemetry and rural North Devon acute connectivity'
  },
  {
    id: 'SW-07',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Torbay and South Devon NHS Foundation Trust',
    hospital_sites: 'Torbay Hospital Torquay',
    beds: 500,
    core_epr: 'Epic EHR (Devon Shared Domain)',
    decision_maker: 'Director of Digital Services',
    email_domain: 'torbayandsouthdevon.nhs.uk',
    sample_email: 'digital@torbayandsouthdevon.nhs.uk',
    pain_point: 'Devon ICS joint Epic telemetry optimization and acute medical admissions flow'
  },
  {
    id: 'SW-08',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Somerset NHS Foundation Trust',
    hospital_sites: 'Musgrove Park Hospital Taunton, Yeovil District Hospital',
    beds: 1050,
    core_epr: 'Epic EHR (Integrated Acute and Mental Health Foundation Trust)',
    decision_maker: 'Chief Information Officer',
    email_domain: 'somersetft.nhs.uk',
    sample_email: 'digital@somersetft.nhs.uk',
    pain_point: 'Musgrove Park surgical center acute telemetry and dual-site county integration'
  },
  {
    id: 'SW-09',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'University Hospitals Dorset NHS Foundation Trust',
    hospital_sites: 'Royal Bournemouth Hospital (Major Emergency Hospital), Poole Hospital (Major Planned Hospital), Christchurch Hospital',
    beds: 1200,
    core_epr: 'Cerner Millennium / One Dorset Digital Strategy',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'uhd.nhs.uk',
    sample_email: 'digital@uhd.nhs.uk',
    pain_point: 'Beach Building new major emergency hospital ICU telemetry deployment'
  },
  {
    id: 'SW-10',
    region: 'South West',
    category: 'England Regional Acute NHS Trust',
    trust_name: 'Dorset County Hospital NHS Foundation Trust',
    hospital_sites: 'Dorset County Hospital Dorchester',
    beds: 400,
    core_epr: 'System C CareFlow',
    decision_maker: 'Associate Director of Digital',
    email_domain: 'dchft.nhs.uk',
    sample_email: 'digital@dchft.nhs.uk',
    pain_point: 'West Dorset rural emergency care telemetry and high dependency vitals tracking'
  },

  // --- LONDON DISTRICT & ACUTE TRUSTS ---
  {
    id: 'LDN-01',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'Kingston Hospital NHS Foundation Trust',
    hospital_sites: 'Kingston Hospital',
    beds: 550,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Director of Digital',
    email_domain: 'kingstonhospital.nhs.uk',
    sample_email: 'digital@kingstonhospital.nhs.uk',
    pain_point: 'High-turnover acute admissions and neonatal intensive care continuous telemetry'
  },
  {
    id: 'LDN-02',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'Epsom and St Helier University Hospitals NHS Trust',
    hospital_sites: 'St Helier Hospital Carshalton, Epsom Hospital, Queen Mary’s Hospital for Children',
    beds: 850,
    core_epr: 'Cerner Millennium (SWL Regional Collaborative)',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'esth.nhs.uk',
    sample_email: 'digital@esth.nhs.uk',
    pain_point: 'New Specialist Emergency Care Hospital planning and acute renal telemetry'
  },
  {
    id: 'LDN-03',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'Croydon Health Services NHS Trust',
    hospital_sites: 'Croydon University Hospital, Purley War Memorial Hospital',
    beds: 650,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Director of ICT and Digital Healthcare',
    email_domain: 'croydonhealth.nhs.uk',
    sample_email: 'digital@croydonhealth.nhs.uk',
    pain_point: 'High-volume emergency department resuscitation telemetry and early sepsis alerts'
  },
  {
    id: 'LDN-04',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'Whittington Health NHS Trust',
    hospital_sites: 'Whittington Hospital Archway',
    beds: 450,
    core_epr: 'System C CareFlow',
    decision_maker: 'Director of Digital and Technology',
    email_domain: 'whittington.nhs.uk',
    sample_email: 'digital@whittington.nhs.uk',
    pain_point: 'North Central London integrated acute vitals monitoring and surgical step-down telemetry'
  },
  {
    id: 'LDN-05',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'North Middlesex University Hospital NHS Trust',
    hospital_sites: 'North Middlesex University Hospital Edmonton',
    beds: 500,
    core_epr: 'Medway (System C) / Royal Free Group Partnership',
    decision_maker: 'Director of Digital Transformation',
    email_domain: 'northmid.nhs.uk',
    sample_email: 'digital@northmid.nhs.uk',
    pain_point: 'Enfield and Haringey high-volume acute emergency care telemetry sync'
  },
  {
    id: 'LDN-06',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'Homerton Healthcare NHS Foundation Trust',
    hospital_sites: 'Homerton University Hospital Hackney',
    beds: 450,
    core_epr: 'Cerner Millennium (GDE Pioneer)',
    decision_maker: 'Chief Information Officer',
    email_domain: 'homerton.nhs.uk',
    sample_email: 'digital@homerton.nhs.uk',
    pain_point: 'Neonatal level 3 intensive care and acute obstetrics telemetry monitoring'
  },
  {
    id: 'LDN-07',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'Barking, Havering and Redbridge University Hospitals NHS Trust',
    hospital_sites: 'Queen’s Hospital Romford (Hyper-Acute Stroke & Neuro), King George Hospital Ilford',
    beds: 1000,
    core_epr: 'System C CareFlow / EPR Procurement',
    decision_maker: 'Chief Digital Information Officer',
    email_domain: 'bhrhospitals.nhs.uk',
    sample_email: 'digital@bhrhospitals.nhs.uk',
    pain_point: 'Essex/London border hyper-acute stroke unit and neurosurgical continuous vitals tracking'
  },
  {
    id: 'LDN-08',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'The Hillingdon Hospitals NHS Foundation Trust',
    hospital_sites: 'Hillingdon Hospital Uxbridge, Mount Vernon Hospital Northwood',
    beds: 500,
    core_epr: 'System C CareFlow / New Hospital Programme Redevelopment',
    decision_maker: 'Director of Informatics',
    email_domain: 'thh.nhs.uk',
    sample_email: 'digital@thh.nhs.uk',
    pain_point: 'New Hillingdon Hospital digital infrastructure and Heathrow emergency zone coverage'
  },
  {
    id: 'LDN-09',
    region: 'London',
    category: 'London Acute NHS Trust',
    trust_name: 'London North West University Healthcare NHS Trust',
    hospital_sites: 'Northwick Park Hospital Harrow (Major Emergency & Hyper-Acute Stroke), Ealing Hospital, Central Middlesex Hospital',
    beds: 1100,
    core_epr: 'Cerner Millennium',
    decision_maker: 'Chief Information Officer',
    email_domain: 'lnwh.nhs.uk',
    sample_email: 'digital@lnwh.nhs.uk',
    pain_point: 'Northwick Park one of London’s busiest emergency departments continuous telemetry'
  }
];

function buildExhaustiveDatabase() {
  console.log('='.repeat(70));
  console.log('🇬🇧 COMPILING EXHAUSTIVE UK MASTER HOSPITAL DATABASE (BATCH 2)');
  console.log('='.repeat(70));

  let dispatchedSet = new Set();
  if (fs.existsSync(DISPATCH_LOG_FILE)) {
    try {
      const logs = JSON.parse(fs.readFileSync(DISPATCH_LOG_FILE, 'utf-8'));
      dispatchedSet = new Set(logs.map(l => (l.email || '').toLowerCase().trim()));
      console.log(`🔍 Total Prior Dispatches in System: ${dispatchedSet.size}`);
    } catch (e) {
      console.warn('⚠️ Could not load dispatch log:', e.message);
    }
  }

  // Filter out any already dispatched
  const cleanedQueue = [];
  const seenEmails = new Set();

  for (const item of fullRoster) {
    const email = (item.sample_email || '').toLowerCase().trim();
    if (!seenEmails.has(email) && !dispatchedSet.has(email)) {
      seenEmails.add(email);
      cleanedQueue.push(item);
    } else {
      console.log(`ℹ️ Skipping already dispatched or duplicate: ${item.trust_name} (${email})`);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cleanedQueue, null, 2), 'utf-8');

  console.log(`\n✅ EXHAUSTIVE DATABASE COMPILED!`);
  console.log(`📊 Total Clean Un-Dispatched Targets: ${cleanedQueue.length}`);
  console.log(`📁 File written to: ${OUTPUT_FILE}`);

  const regions = {};
  cleanedQueue.forEach(h => {
    regions[h.region] = (regions[h.region] || 0) + 1;
  });

  console.log('\n📊 Regional Breakdown:');
  Object.entries(regions).forEach(([reg, count]) => {
    console.log(`   • ${reg}: ${count} acute trusts / health authorities`);
  });
}

buildExhaustiveDatabase();
