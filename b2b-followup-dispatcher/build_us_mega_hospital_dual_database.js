// ============================================================
// US Mega-Hospital Chains & Health Systems Dual-Pitch Database
// The Largest Inpatient Insurance Denial & Telemetry Market in the World
// Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, 'US_MEGA_HOSPITALS_DUAL_DATABASE.json');
const LOG_FILE = path.join(__dirname, 'src', 'dispatch_log.json');

const usMegaChains = [
  {
    id: 'US-MEGA-01',
    system_name: 'Kaiser Permanente',
    headquarters: 'Oakland, California',
    hospitals_count: '39 Hospitals, 734 Medical Offices',
    beds: 9500,
    core_ehr: 'Epic EHR (HealthConnect - Largest Private Epic Instance)',
    decision_maker: 'Diane Comer (Chief Information and Technology Officer) / Revenue Cycle Directorate',
    email_domain: 'kp.org',
    sample_email: 'diane.comer@kp.org',
    role_email: 'healthconnect.support@kp.org',
    pain_point: 'Managed care capitation reconciliation and high-acuity ICU bedside documentation alignment'
  },
  {
    id: 'US-MEGA-02',
    system_name: 'Ascension Health',
    headquarters: 'St. Louis, Missouri',
    hospitals_count: '140 Hospitals across 19 States',
    beds: 26000,
    core_ehr: 'Cerner Millennium / Oracle Health Unified Domain',
    decision_maker: 'Gerry Lewis (Chief Information Officer) / VP Denial Management',
    email_domain: 'ascension.org',
    sample_email: 'gerry.lewis@ascension.org',
    role_email: 'digital.health@ascension.org',
    pain_point: 'Multi-state Medicaid/Medicare Advantage commercial denials and nursing charting burden'
  },
  {
    id: 'US-MEGA-03',
    system_name: 'CommonSpirit Health',
    headquarters: 'Chicago, Illinois',
    hospitals_count: '142 Hospitals, 2,200 Care Sites across 21 States',
    beds: 25000,
    core_ehr: 'Epic EHR / Cerner Millennium (Hybrid Modernization)',
    decision_maker: 'Daniel Barchi (Chief Information Officer) / VP Revenue Cycle Operations',
    email_domain: 'commonspirit.org',
    sample_email: 'daniel.barchi@commonspirit.org',
    role_email: 'digital@commonspirit.org',
    pain_point: 'CO-50 medical necessity denials on complex surgical stays and cross-state EHR consolidation'
  },
  {
    id: 'US-MEGA-04',
    system_name: 'Providence St. Joseph Health',
    headquarters: 'Renton, Washington',
    hospitals_count: '51 Hospitals, 1,000+ Clinics across 7 States',
    beds: 12000,
    core_ehr: 'Epic EHR (Enterprise Single Domain)',
    decision_maker: 'B.J. Moore (Chief Information Officer) / VP Revenue Cycle Management',
    email_domain: 'providence.org',
    sample_email: 'bj.moore@providence.org',
    role_email: 'digital.strategy@providence.org',
    pain_point: 'Commercial payer prior-authorization disputes and 60fps arterial waveform telemetry storage'
  },
  {
    id: 'US-MEGA-05',
    system_name: 'Trinity Health',
    headquarters: 'Livonia, Michigan',
    hospitals_count: '88 Hospitals across 26 States',
    beds: 18000,
    core_ehr: 'Epic EHR (TogetherCare Programme)',
    decision_maker: 'Marcus Shipley (Chief Information Officer) / Director of Patient Financial Services',
    email_domain: 'trinity-health.org',
    sample_email: 'marcus.shipley@trinity-health.org',
    role_email: 'togethercare@trinity-health.org',
    pain_point: 'Multi-hospital inpatient claim recoupments and closed-loop eMAR narcotic verification'
  },
  {
    id: 'US-MEGA-06',
    system_name: 'Tenet Healthcare',
    headquarters: 'Dallas, Texas',
    hospitals_count: '65 Acute Care Hospitals, 450+ Ambulatory Facilities',
    beds: 16000,
    core_ehr: 'Cerner Millennium / Oracle Health',
    decision_maker: 'Paola Arbour (Chief Information Officer) / Conifer Health Solutions RCM Lead',
    email_domain: 'tenethealth.com',
    sample_email: 'paola.arbour@tenethealth.com',
    role_email: 'informatics@tenethealth.com',
    pain_point: 'High commercial denial write-offs and sub-second critical care telemetry streaming'
  },
  {
    id: 'US-MEGA-07',
    system_name: 'HCA Healthcare (US Corporate Headquarters)',
    headquarters: 'Nashville, Tennessee',
    hospitals_count: '186 Hospitals across 20 States and UK',
    beds: 47000,
    core_ehr: 'Meditech Expanse / Epic (Enterprise Modernization)',
    decision_maker: 'Marty Paslick (Chief Information Officer) / VP Clinical Informatics',
    email_domain: 'hcahealthcare.com',
    sample_email: 'marty.paslick@hcahealthcare.com',
    role_email: 'clinical.systems@hcahealthcare.com',
    pain_point: 'Nationwide acute inpatient denial prevention and massive telemetry hardware per-bed licensing taxes'
  },
  {
    id: 'US-MEGA-08',
    system_name: 'Baylor Scott & White Health',
    headquarters: 'Dallas, Texas',
    hospitals_count: '52 Hospitals across Texas',
    beds: 7500,
    core_ehr: 'Epic EHR',
    decision_maker: 'Matthew Kull (Chief Information Officer) / VP Clinical Revenue Integrity',
    email_domain: 'bswhealth.org',
    sample_email: 'matthew.kull@bswhealth.org',
    role_email: 'digital@bswhealth.org',
    pain_point: 'ERISA Section 502 commercial denial appeals and high-acuity bedside alarm fatigue'
  },
  {
    id: 'US-MEGA-09',
    system_name: 'UPMC (University of Pittsburgh Medical Center)',
    headquarters: 'Pittsburgh, Pennsylvania',
    hospitals_count: '40 Hospitals, 800+ Clinical Sites',
    beds: 8500,
    core_ehr: 'Epic EHR / Cerner Millennium Hybrid',
    decision_maker: 'Ed McCallister (Chief Information Officer) / VP Health Plan Adjudication',
    email_domain: 'upmc.edu',
    sample_email: 'mccallistered@upmc.edu',
    role_email: 'upmcdigital@upmc.edu',
    pain_point: 'Integrated delivery and finance system (IDFS) provider-payer friction and ICU telemetry feeds'
  },
  {
    id: 'US-MEGA-10',
    system_name: 'AdventHealth',
    headquarters: 'Altamonte Springs, Florida',
    hospitals_count: '52 Hospitals across 9 States',
    beds: 9200,
    core_ehr: 'Epic EHR (Multi-Billion Dollar Epic Transformation)',
    decision_maker: 'Brent Snyder (Chief Information Officer) / Executive Director of Revenue Cycle',
    email_domain: 'adventhealth.com',
    sample_email: 'brent.snyder@adventhealth.com',
    role_email: 'epic.support@adventhealth.com',
    pain_point: 'Post-Epic transition clinical denial backlogs and ICU patient flow surveillance'
  },
  {
    id: 'US-MEGA-11',
    system_name: 'Mass General Brigham (Partners HealthCare)',
    headquarters: 'Boston, Massachusetts',
    hospitals_count: '16 Hospitals (Massachusetts General & Brigham and Women’s)',
    beds: 4500,
    core_ehr: 'Epic EHR',
    decision_maker: 'Jane Shen (Chief Information Officer) / CCIO & Revenue Management Directorate',
    email_domain: 'mgb.org',
    sample_email: 'jshen@mgb.org',
    role_email: 'digitalhealth@mgb.org',
    pain_point: 'High-cost academic oncology/surgical denial recovery and quaternary ICU waveform research archives'
  },
  {
    id: 'US-MEGA-12',
    system_name: 'NewYork-Presbyterian Hospital',
    headquarters: 'New York, New York',
    hospitals_count: '10 Hospital Campuses (Columbia & Weill Cornell)',
    beds: 4300,
    core_ehr: 'Epic EHR',
    decision_maker: 'Leo Bodden (Chief Digital and Information Officer) / VP Inpatient Revenue Operations',
    email_domain: 'nyp.org',
    sample_email: 'leobodden@nyp.org',
    role_email: 'itdirectorate@nyp.org',
    pain_point: 'NYC commercial payer downcoding disputes and pediatric/cardiac ICU telemetry integration'
  },
  {
    id: 'US-MEGA-13',
    system_name: 'Northwell Health',
    headquarters: 'New Hyde Park, New York',
    hospitals_count: '21 Hospitals, 900+ Outpatient Facilities',
    beds: 5500,
    core_ehr: 'Epic EHR (Comprehensive Health System Modernization)',
    decision_maker: 'John Bosco (Chief Information Officer) / VP Managed Care Billing',
    email_domain: 'northwell.edu',
    sample_email: 'jbosco@northwell.edu',
    role_email: 'digitalhealth@northwell.edu',
    pain_point: 'New York largest private employer healthcare system inpatient denial defense and FHIR interoperability'
  },
  {
    id: 'US-MEGA-14',
    system_name: 'Johns Hopkins Medicine',
    headquarters: 'Baltimore, Maryland',
    hospitals_count: '6 Academic & Community Hospitals',
    beds: 2800,
    core_ehr: 'Epic EHR',
    decision_maker: 'Dwight Raum (Chief Information Officer) / Director of Clinical Documentation Improvement (CDI)',
    email_domain: 'jhmi.edu',
    sample_email: 'draum@jhmi.edu',
    role_email: 'it@jhmi.edu',
    pain_point: 'Maryland All-Payer Model hospital rate compliance and complex tertiary denial prevention'
  },
  {
    id: 'US-MEGA-15',
    system_name: 'Mayo Clinic Health System',
    headquarters: 'Rochester, Minnesota',
    hospitals_count: '16 Hospitals across MN, WI, IA + Destination Centers in AZ & FL',
    beds: 3000,
    core_ehr: 'Epic EHR (Plummer Project Enterprise)',
    decision_maker: 'Cris Ross (Chief Information Officer) / Revenue Management Directorate',
    email_domain: 'mayo.edu',
    sample_email: 'ross.cris@mayo.edu',
    role_email: 'informatics@mayo.edu',
    pain_point: 'Global referral destination complex surgical claim justification and zero-latency waveform pipelines'
  },
  {
    id: 'US-MEGA-16',
    system_name: 'Sutter Health',
    headquarters: 'Sacramento, California',
    hospitals_count: '24 Acute Care Hospitals, 200+ Clinics',
    beds: 3500,
    core_ehr: 'Epic EHR',
    decision_maker: 'Laura Wilt (Chief Digital Officer) / VP Revenue Cycle Operations',
    email_domain: 'sutterhealth.org',
    sample_email: 'wiltl@sutterhealth.org',
    role_email: 'digital@sutterhealth.org',
    pain_point: 'Northern California commercial insurer denial disputes and 5-rights medication administration safety'
  },
  {
    id: 'US-MEGA-17',
    system_name: 'Intermountain Health',
    headquarters: 'Salt Lake City, Utah',
    hospitals_count: '33 Hospitals across 7 Mountain West States',
    beds: 4900,
    core_ehr: 'Epic EHR / Cerner transition',
    decision_maker: 'Dan Liljenquist (Chief Strategy Officer) / Craig Richardville (Chief Digital and Information Officer)',
    email_domain: 'intermountainhealthcare.org',
    sample_email: 'craig.richardville@imail.org',
    role_email: 'digital@intermountainhealthcare.org',
    pain_point: 'Value-based care risk adjustments and acute telemetry early deterioration alerts'
  },
  {
    id: 'US-MEGA-18',
    system_name: 'Memorial Hermann Health System',
    headquarters: 'Houston, Texas',
    hospitals_count: '17 Hospitals in Greater Houston',
    beds: 4100,
    core_ehr: 'Cerner Millennium / Epic Scoping',
    decision_maker: 'Amanda Hammel (Chief Information Officer) / VP Revenue Operations',
    email_domain: 'memorialhermann.org',
    sample_email: 'amanda.hammel@memorialhermann.org',
    role_email: 'digital@memorialhermann.org',
    pain_point: 'Texas Medical Center major trauma resuscitation telemetry and commercial payer downcoding disputes'
  },
  {
    id: 'US-MEGA-19',
    system_name: 'Cedars-Sinai Health System',
    headquarters: 'Los Angeles, California',
    hospitals_count: '4 Hospitals, 2,100 Physicians',
    beds: 1500,
    core_ehr: 'Epic EHR',
    decision_maker: 'Craig Kwiatkowski (Chief Information Officer) / Clinical Revenue Cycle Lead',
    email_domain: 'cshs.org',
    sample_email: 'craig.kwiatkowski@cshs.org',
    role_email: 'digital@cshs.org',
    pain_point: 'High-acuity heart transplant and neuro ICU telemetry linked to clean insurance submission'
  },
  {
    id: 'US-MEGA-20',
    system_name: 'Mount Sinai Health System',
    headquarters: 'New York, New York',
    hospitals_count: '8 Hospital Campuses across NYC',
    beds: 3800,
    core_ehr: 'Epic EHR',
    decision_maker: 'Kristin Myers (Chief Digital and Information Officer) / VP Denial Recovery',
    email_domain: 'mountsinai.org',
    sample_email: 'kristin.myers@mountsinai.org',
    role_email: 'digitalhealth@mountsinai.org',
    pain_point: 'Metropolitan high-volume emergency room boarding and insurer denial dispute automation'
  }
];

function buildDatabase() {
  console.log('='.repeat(75));
  console.log('🇺🇸 COMPILING US MEGA-HOSPITAL CHAINS & HEALTH SYSTEMS DUAL DATABASE');
  console.log('🏥 Top 20 Multi-Billion Dollar US Healthcare Networks');
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

  const cleanList = usMegaChains.filter(h => {
    const em = (h.sample_email || '').toLowerCase().trim();
    return em && !dispatched.has(em);
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cleanList, null, 2), 'utf-8');

  console.log(`\n✅ DATABASE SUCCESSFULLY COMPILED!`);
  console.log(`📊 Total US Mega-Chains Pending Outreach: ${cleanList.length}`);
  console.log(`📁 File written to: ${OUTPUT_FILE}`);
  cleanList.forEach((h, i) => {
    console.log(`   ${i + 1}. ${h.system_name} (${h.headquarters}) - ${h.beds} Beds | EHR: ${h.core_ehr}`);
  });
}

buildDatabase();
