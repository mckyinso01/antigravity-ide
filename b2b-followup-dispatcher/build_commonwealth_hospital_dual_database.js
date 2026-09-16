// ============================================================
// Commonwealth Hospital Authorities Dual-Pitch Database
// Australia, Canada & New Zealand State/Provincial Health Authorities
// Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, 'COMMONWEALTH_HOSPITALS_DUAL_DATABASE.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

const commonwealthChains = [
  // --- AUSTRALIA ---
  {
    id: 'AU-01',
    country: 'Australia',
    region: 'New South Wales',
    authority_name: 'eHealth NSW / NSW Health',
    hospital_sites: 'Royal Prince Alfred Hospital, Westmead Hospital, St Vincent’s Sydney, Royal North Shore Hospital (220+ Facilities)',
    beds: 19000,
    core_ehr: 'Epic EHR (Single Digital Patient Record - SDPR A$1B Statewide Deployment) / Cerner legacy',
    decision_maker: 'Dr. Zoran Bolevich (Chief Executive & Chief Information Officer) / Director of Clinical Operations',
    email_domain: 'health.nsw.gov.au',
    sample_email: 'zoran.bolevich@health.nsw.gov.au',
    role_email: 'ehealth-communications@health.nsw.gov.au',
    pain_point: 'Statewide Epic SDPR rollout acute waveform telemetry sync and Medicare reciprocal billing'
  },
  {
    id: 'AU-02',
    country: 'Australia',
    region: 'Queensland',
    authority_name: 'eHealth Queensland / Queensland Health',
    hospital_sites: 'Royal Brisbane and Women’s Hospital (RBWH), Princess Alexandra Hospital, Gold Coast University Hospital',
    beds: 14000,
    core_ehr: 'Cerner Millennium (integrated electronic Medical Record - ieMR statewide)',
    decision_maker: 'Damian Green (Chief Digital Officer) / Executive Director of Clinical Informatics',
    email_domain: 'health.qld.gov.au',
    sample_email: 'damian.green@health.qld.gov.au',
    role_email: 'ehealth-info@health.qld.gov.au',
    pain_point: 'ieMR continuous physiological telemetry feeds and rural aeromedical retrieval vitals links'
  },
  {
    id: 'AU-03',
    country: 'Australia',
    region: 'Victoria',
    authority_name: 'Parkville Precinct Health Services (Melbourne Health & Peter Mac)',
    hospital_sites: 'The Royal Melbourne Hospital, Peter MacCallum Cancer Centre, The Royal Women’s Hospital, Royal Children’s Hospital',
    beds: 3500,
    core_ehr: 'Epic EHR (Parkville Electronic Medical Record Flagship)',
    decision_maker: 'George Cozaris (Chief Information Officer) / CCIO Directorate',
    email_domain: 'mh.org.au',
    sample_email: 'george.cozaris@mh.org.au',
    role_email: 'emr.support@mh.org.au',
    pain_point: 'Quaternary trauma and cancer center multi-lead arterial waveform streaming into Epic EMR'
  },
  {
    id: 'AU-04',
    country: 'Australia',
    region: 'South Australia',
    authority_name: 'SA Health (Central Adelaide Local Health Network)',
    hospital_sites: 'Royal Adelaide Hospital (RAH - Australia’s Most Advanced Hospital), Queen Elizabeth Hospital',
    beds: 2200,
    core_ehr: 'Altera Digital Health (Sunrise EMR & PAS statewide)',
    decision_maker: 'Bret Morris (Chief Information Officer) / Clinical Systems Lead',
    email_domain: 'sa.gov.au',
    sample_email: 'bret.morris@sa.gov.au',
    role_email: 'sahealthdigital@sa.gov.au',
    pain_point: 'Royal Adelaide automated robotic pharmacy and 800-bed single-room ICU bedside telemetry'
  },
  {
    id: 'AU-05',
    country: 'Australia',
    region: 'Western Australia',
    authority_name: 'Health Support Services (WA Health)',
    hospital_sites: 'Fiona Stanley Hospital Perth, Sir Charles Gairdner Hospital, Royal Perth Hospital',
    beds: 5500,
    core_ehr: 'WebPAS / Digital Health Strategy 2020-2030 (EHR Modernization)',
    decision_maker: 'Holger Kaufmann (Chief Information Officer) / Director of Clinical ICT',
    email_domain: 'health.wa.gov.au',
    sample_email: 'holger.kaufmann@health.wa.gov.au',
    role_email: 'hss.digital@health.wa.gov.au',
    pain_point: 'Remote mining region air-ambulance telemetry buffering and state acute bed turnover'
  },
  {
    id: 'AU-06',
    country: 'Australia',
    region: 'National Private',
    authority_name: 'Ramsay Health Care Australia',
    hospital_sites: '73 Private Hospitals across Australia (Largest Private Hospital Operator)',
    beds: 9000,
    core_ehr: 'Epic EHR / Bespoke Clinical Portal',
    decision_maker: 'John Sutherland (Chief Information Officer) / VP Commercial Private Health Billing',
    email_domain: 'ramsayhealth.com.au',
    sample_email: 'sutherlandj@ramsayhealth.com.au',
    role_email: 'digital@ramsayhealth.com.au',
    pain_point: 'Private health fund (Medibank, Bupa AU) claim dispute prevention and surgical high-dependency tracking'
  },
  {
    id: 'AU-07',
    country: 'Australia',
    region: 'National Private',
    authority_name: 'Healthscope Australia',
    hospital_sites: '42 Private Hospitals across Australia (including Northern Beaches Hospital Sydney)',
    beds: 5000,
    core_ehr: 'Telstra Health MedNeXt / In-House Electronic Medical Record',
    decision_maker: 'Geoff Neate (Chief Information Officer) / Revenue Cycle Director',
    email_domain: 'healthscope.com.au',
    sample_email: 'geoff.neate@healthscope.com.au',
    role_email: 'digitalhealth@healthscope.com.au',
    pain_point: 'Private medical insurer downcoding dispute mitigation and ICU bedside medication safety'
  },

  // --- CANADA ---
  {
    id: 'CA-01',
    country: 'Canada',
    region: 'Ontario',
    authority_name: 'University Health Network (UHN Toronto)',
    hospital_sites: 'Toronto General Hospital (Ranked #3 Worldwide), Toronto Western Hospital, Princess Margaret Cancer Centre',
    beds: 1500,
    core_ehr: 'Epic EHR (Synapse Programme Enterprise)',
    decision_maker: 'Dr. David Jaffray (Executive VP, Technology and Innovation) / Chief Information Officer',
    email_domain: 'uhn.ca',
    sample_email: 'david.jaffray@uhn.ca',
    role_email: 'digital@uhn.ca',
    pain_point: 'World-leading organ transplant and cardiovascular ICU high-frequency waveform streaming'
  },
  {
    id: 'CA-02',
    country: 'Canada',
    region: 'Ontario',
    authority_name: 'Hamilton Health Sciences',
    hospital_sites: 'Hamilton General Hospital, Juravinski Hospital and Cancer Centre, McMaster Children’s Hospital',
    beds: 1400,
    core_ehr: 'Epic EHR (Project Odyssey)',
    decision_maker: 'Michelle Leafloor (VP Health Information & Chief Information Officer)',
    email_domain: 'hhsc.ca',
    sample_email: 'leafloor@hhsc.ca',
    role_email: 'itdirectorate@hhsc.ca',
    pain_point: 'Ontario major regional trauma and burn center sub-second bedside telemetry'
  },
  {
    id: 'CA-03',
    country: 'Canada',
    region: 'Ontario',
    authority_name: 'The Ottawa Hospital / L’Hôpital d’Ottawa',
    hospital_sites: 'Civic Campus (Major Trauma), General Campus, Riverside Campus',
    beds: 1200,
    core_ehr: 'Epic EHR (Champlain Digital Health Network Shared Epic)',
    decision_maker: 'Cameron Love (President & CEO) / Chief Information Officer & Digital Directorate',
    email_domain: 'toh.ca',
    sample_email: 'clove@toh.ca',
    role_email: 'digitalhealth@toh.ca',
    pain_point: 'New $2.8B French-English bilingual digital hospital development and critical care waveform sync'
  },
  {
    id: 'CA-04',
    country: 'Canada',
    region: 'Alberta',
    authority_name: 'Alberta Health Services (AHS)',
    hospital_sites: 'Foothills Medical Centre Calgary, University of Alberta Hospital Edmonton, Royal Alexandra (106 Acute Hospitals)',
    beds: 8500,
    core_ehr: 'Epic EHR (Connect Care - Largest Single Province-Wide Healthcare Deployment)',
    decision_maker: 'Penny Rae (Chief Information Officer) / CCIO & Connect Care Leadership',
    email_domain: 'ahs.ca',
    sample_email: 'penny.rae@ahs.ca',
    role_email: 'connectcare@ahs.ca',
    pain_point: 'Province-wide single-chart ICU telemetry harmonization across Calgary and Edmonton centers'
  },
  {
    id: 'CA-05',
    country: 'Canada',
    region: 'British Columbia',
    authority_name: 'Vancouver Coastal Health (VCH)',
    hospital_sites: 'Vancouver General Hospital (VGH), Lions Gate Hospital, Richmond Hospital',
    beds: 3000,
    core_ehr: 'Cerner Millennium (Clinical Systems Transformation - CST Cerner)',
    decision_maker: 'Dermot Kelly (VP Digital Health and Chief Information Officer)',
    email_domain: 'vch.ca',
    sample_email: 'dermot.kelly@vch.ca',
    role_email: 'digital@vch.ca',
    pain_point: 'Pacific major trauma center acute telemetry and inter-facility emergency transfers'
  },
  {
    id: 'CA-06',
    country: 'Canada',
    region: 'British Columbia',
    authority_name: 'Fraser Health Authority',
    hospital_sites: 'Surrey Memorial Hospital, Royal Columbian Hospital New Westminster, Abbotsford Regional',
    beds: 3200,
    core_ehr: 'Meditech / CST Cerner Modernization',
    decision_maker: 'Philip Barker (VP Digital Health & Chief Information Officer)',
    email_domain: 'fraserhealth.ca',
    sample_email: 'philip.barker@fraserhealth.ca',
    role_email: 'digital@fraserhealth.ca',
    pain_point: 'Canada’s fastest growing health authority emergency department capacity and ICU bed surveillance'
  },
  {
    id: 'CA-07',
    country: 'Canada',
    region: 'Nova Scotia',
    authority_name: 'Nova Scotia Health Authority (NSHA)',
    hospital_sites: 'QEII Health Sciences Centre Halifax, Dartmouth General Hospital',
    beds: 3100,
    core_ehr: 'Oracle Health / Cerner Millennium (One Person One Record - OPOR C$365M Programme)',
    decision_maker: 'Keltie Jamieson (Chief Information Officer) / OPOR Programme Leadership',
    email_domain: 'nshealth.ca',
    sample_email: 'keltie.jamieson@nshealth.ca',
    role_email: 'opor@nshealth.ca',
    pain_point: 'Atlantic Canada OPOR enterprise clinical vitals integration and rural acute connectivity'
  },

  // --- NEW ZEALAND ---
  {
    id: 'NZ-01',
    country: 'New Zealand',
    region: 'Northern Region',
    authority_name: 'Health New Zealand - Te Whatu Ora (Northern)',
    hospital_sites: 'Auckland City Hospital, Starship Children’s Hospital, Middlemore Hospital, North Shore Hospital',
    beds: 3000,
    core_ehr: 'Orion Health Clinical Portal / Regional TrakCare',
    decision_maker: 'Shayne Hunter (National Chief Data and Digital) / Northern Regional CIO',
    email_domain: 'adhb.govt.nz',
    sample_email: 'shayneh@adhb.govt.nz',
    role_email: 'digital@adhb.govt.nz',
    pain_point: 'National paediatric and tertiary cardiothoracic ICU continuous telemetry streaming'
  },
  {
    id: 'NZ-02',
    country: 'New Zealand',
    region: 'Te Manawa Taki',
    authority_name: 'Health New Zealand - Te Whatu Ora (Waikato)',
    hospital_sites: 'Waikato Hospital Hamilton, Thames Hospital',
    beds: 950,
    core_ehr: 'Intersystems TrakCare / Midland Regional eRIC System',
    decision_maker: 'Chief Digital and Information Officer / Clinical Informatics Lead',
    email_domain: 'waikatodhb.health.nz',
    sample_email: 'digital@waikatodhb.health.nz',
    role_email: 'informatics@waikatodhb.health.nz',
    pain_point: 'Post-cyber incident zero-trust telemetry air-gapping and regional trauma monitoring'
  },
  {
    id: 'NZ-03',
    country: 'New Zealand',
    region: 'Te Waipounamu',
    authority_name: 'Health New Zealand - Te Whatu Ora (Canterbury)',
    hospital_sites: 'Christchurch Hospital (Waipapa Acute Services Building), Burwood Hospital',
    beds: 1200,
    core_ehr: 'Cortex Clinical Portal / South Island Regional Alliance Record',
    decision_maker: 'Chief Digital Officer / Southern Clinical Systems Directorate',
    email_domain: 'cdhb.health.nz',
    sample_email: 'digital@cdhb.health.nz',
    role_email: 'it@cdhb.health.nz',
    pain_point: 'Waipapa acute emergency resuscitation telemetry and South Island clinical record integration'
  }
];

function buildCommonwealthDatabase() {
  console.log('='.repeat(75));
  console.log('🌏 COMPILING COMMONWEALTH HOSPITAL AUTHORITIES DUAL-PITCH DATABASE');
  console.log('🏥 Australia (7) | Canada (7) | New Zealand (3)');
  console.log('🔗 Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture');
  console.log('='.repeat(75));

  let dispatched = new Set();
  if (fs.existsSync(LOG_FILE)) {
    try {
      const logs = JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'));
      dispatched = new Set(logs.map(l => (l.email || '').toLowerCase().trim()));
    } catch (e) {
      console.warn('Notice:', e.message);
    }
  }

  const cleanList = commonwealthChains.filter(h => {
    const em = (h.sample_email || '').toLowerCase().trim();
    return em && !dispatched.has(em);
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cleanList, null, 2), 'utf-8');

  console.log(`\n✅ COMMONWEALTH DATABASE SUCCESSFULLY COMPILED!`);
  console.log(`📊 Total Authorities Pending Outreach: ${cleanList.length}`);
  console.log(`📁 File written to: ${OUTPUT_FILE}`);
  cleanList.forEach((h, i) => {
    console.log(`   ${i + 1}. [${h.country}] ${h.authority_name} (${h.beds} Beds) | EHR: ${h.core_ehr}`);
  });
}

buildCommonwealthDatabase();
