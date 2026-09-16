import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOSPITALS_FILE = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\antigravity-ide\\hospital_leads_database\\verified_100_us_uk_hospitals.json';
const OUTPUT_FILE = path.join(__dirname, 'LINKEDIN_GLOBAL_HOSPITAL_TOUCHPOINTS.json');

function cleanDecisionMaker(raw) {
  if (!raw) return { name: 'Chief Information Officer', title: 'CIO' };
  // Clean string like "Bob MacDonald (CIO) / Amy Giles (CNO)"
  const first = raw.split('/')[0].trim();
  const match = first.match(/^([^(]+)(?:\(([^)]+)\))?/);
  if (match) {
    return {
      name: match[1].trim(),
      title: match[2] ? match[2].trim() : 'Chief Information Officer'
    };
  }
  return { name: first, title: 'Chief Information Officer' };
}

function buildLinkedInTouchpoint(hospital) {
  const dm = cleanDecisionMaker(hospital.decision_maker);
  const company = hospital.hospital_name;
  const ehr = hospital.core_ehr || 'EPR/EHR';
  const isUK = hospital.country === 'UK' || (hospital.location && hospital.location.includes('UK'));

  // LinkedIn Search URL
  const searchQuery = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(`"${company}" ("CIO" OR "Chief Information Officer" OR "VP IT")`)}`;

  // Bespoke connection pitch / comment (under 300 chars for LinkedIn connection limit)
  let connectionNote = '';
  let commentPitch = '';

  if (isUK) {
    connectionNote = `Hi ${dm.name.split(' ')[0]}, reaching out regarding ${company}'s ${ehr} telemetry. We engineered Clinical Pristine ICU OS—sub-second HL7/FHIR telemetry with Caldicott data sovereignty: clinical.linkable.it.com. Would love to share 48h sandbox access for your team. - Mharc`;
    commentPitch = `Impressive focus on patient-centric care at ${company}. Real-time sub-second waveform telemetry and seamless ${ehr} integration are transforming acute ICU care without vendor lock-in. Worth exploring our live open sandbox: clinical.linkable.it.com`;
  } else {
    connectionNote = `Hi ${dm.name.split(' ')[0]}, reaching out regarding acute care telemetry at ${company}. We built Clinical Pristine ICU OS—sub-second waveforms with seamless ${ehr} interoperability: clinical.linkable.it.com. Offering 48-hr sandbox access for your clinical IT team. - Mharc`;
    commentPitch = `Exceptional leadership at ${company}. Breaking down proprietary ICU waveform silos while maintaining sub-second HL7/FHIR ${ehr} synchronization is game-changing for clinician burnout. Live demo: clinical.linkable.it.com`;
  }

  return {
    id: hospital.id,
    company: company,
    country: hospital.country,
    location: hospital.location,
    beds: hospital.beds,
    core_ehr: ehr,
    target_name: dm.name,
    target_title: dm.title,
    email: hospital.sample_email,
    email_status: hospital.status || 'SENT',
    linkedin_search_url: searchQuery,
    linkedin_connection_note: connectionNote,
    linkedin_comment_pitch: commentPitch,
    touchpoint_channel: 'LinkedIn + Corporate Email Multi-Touch',
    status: 'READY_FOR_LINKEDIN_EXECUTION'
  };
}

function run() {
  const rawHospitals = JSON.parse(fs.readFileSync(HOSPITALS_FILE, 'utf-8'));
  const touchpoints = rawHospitals.map(buildLinkedInTouchpoint);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(touchpoints, null, 2), 'utf-8');
  console.log(`✅ Successfully generated LinkedIn Multi-Touch Dossier for all ${touchpoints.length} hospitals.`);
  console.log(`📁 Saved to: ${OUTPUT_FILE}`);
}

run();
