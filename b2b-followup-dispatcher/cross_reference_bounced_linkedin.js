import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. The bounced emails from Gmail
const bouncedEmails = [
  { email: 'ross.cris@mayo.edu', org: 'Mayo Clinic', name: 'Cris Ross' },
  { email: 'craig.richardville@imail.org', org: 'Intermountain Health', name: 'Craig Richardville' },
  { email: 'kristin.myers@mountsinai.org', org: 'Mount Sinai Health System', name: 'Kristin Myers (Current CIO is Lisa Stump)' },
  { email: 'zoran.bolevich@health.nsw.gov.au', org: 'eHealth NSW Australia', name: 'Zoran Bolevich' },
  { email: 'bret.morris@sa.gov.au', org: 'SA Health Australia', name: 'Bret Morris' },
  { email: 'damian.green@health.qld.gov.au', org: 'Queensland Health Australia', name: 'Damian Green' },
  { email: 'holger.kaufmann@health.wa.gov.au', org: 'WA Health Australia', name: 'Holger Kaufmann' },
  { email: 'sutherlandj@ramsayhealth.com.au', org: 'Ramsay Health Care Australia', name: 'John Sutherland' },
  { email: 'geoff.neate@healthscope.com.au', org: 'Healthscope Australia', name: 'Geoff Neate' },
  { email: 'penny.rae@ahs.ca', org: 'Alberta Health Services Canada', name: 'Penny Rae' },
  { email: 'shayneh@adhb.govt.nz', org: 'Auckland DHB New Zealand', name: 'Shayne Hunter' },
  { email: 'digital@waikatodhb.health.nz', org: 'Waikato DHB New Zealand', name: 'Waikato DHB Digital' },
  { email: 'digital@cdhb.health.nz', org: 'Canterbury DHB New Zealand', name: 'Canterbury DHB Digital' },
  { email: 'carsten.frischmuth@helios-gesundheit.de', org: 'Helios Kliniken Germany', name: 'Carsten Frischmuth' },
  { email: 'michael.schoepf@sana.de', org: 'Sana Kliniken Germany', name: 'Michael Schöpf' },
  { email: 'j.dupont@elsan.care', org: 'Elsan France', name: 'Jérôme Dupont' },
  { email: 'christian.weskott@hirslanden.ch', org: 'Hirslanden Switzerland', name: 'Christian Weskott' },
  { email: 'frindlisbacher@swissmedical.net', org: 'Swiss Medical Network', name: 'F. Rindlisbacher' },
  { email: 'emanuele.vignola@grupposandonato.it', org: 'Gruppo San Donato Italy', name: 'Emanuele Vignola' },
  { email: 'mreischl@schoen-klinik.de', org: 'Schön Klinik Germany', name: 'M. Reischl' },
  { email: 'r.luigies@antoniusziekenhuis.nl', org: 'St. Antonius Ziekenhuis Netherlands', name: 'R. Luigies' },
  { email: 'jarcos@unav.es', org: 'Clínica Universidad de Navarra Spain', name: 'Javier Arcos' },
  { email: 'stefan.sjostrom@capio.se', org: 'Capio AB Sweden', name: 'Stefan Sjöström' },
  { email: 'thomas.mlczoch@premiqamed.at', org: 'PremiQaMed Austria', name: 'Thomas Mlczoch' },
  { email: 'digital@thh.nhs.uk', org: 'The Hillingdon Hospitals NHS Trust', name: 'Digital Directorate' },
  { email: 'digital@croydonhealth.nhs.uk', org: 'Croydon Health Services NHS Trust', name: 'Digital Directorate' },
  { email: 'digital@medway.nhs.uk', org: 'Medway NHS Foundation Trust', name: 'Digital Directorate' },
  { email: 'lisa.carroll@walsallhealthcare.nhs.uk', org: 'Walsall Healthcare NHS Trust', name: 'Lisa Carroll' },
  { email: 'digital@barnsley.nhs.uk', org: 'Barnsley Hospital NHS Foundation Trust', name: 'Digital Directorate' },
  { email: 'digital@dbth.nhs.uk', org: 'Doncaster & Bassetlaw Teaching Hospitals', name: 'Digital Directorate' },
  { email: 'digital@royalsurrey.nhs.uk', org: 'Royal Surrey NHS Foundation Trust', name: 'Digital Directorate' },
  { email: 'digital@nth.nhs.uk', org: 'North Tees & Hartlepool NHS Trust', name: 'Digital Directorate' },
  { email: 'digital@rothgen.nhs.uk', org: 'The Rotherham NHS Foundation Trust', name: 'Digital Directorate' },
  { email: 'digital@asph.nhs.uk', org: 'Ashford & St Peter\'s Hospitals', name: 'Digital Directorate' },
  { email: 'digital@york.nhs.uk', org: 'York & Scarborough Teaching Hospitals', name: 'Digital Directorate' },
  { email: 'digital@walsallhealthcare.nhs.uk', org: 'Walsall Healthcare NHS Trust', name: 'Digital Directorate' }
];

// 2. The 10 pending invitations verified on LinkedIn 2 days ago:
const linkedinPendingInvitations = [
  'Matthew Chambers',
  'Gerry Lewis',
  'Chad Wasserman',
  'Lisa Stump', // Mount Sinai (matches Mount Sinai!)
  'Mark Rauschuber',
  'Craig Kwiatkowski',
  'Peter M. Fleischut, MD',
  'Richard Mendola, Ph.D.',
  'Sarah Hatchett',
  'Arun Kumar Bhaskara-Baba'
];

// 3. The 5 sent today:
const sentToday = [
  'Scott Waters',
  'Shea C.',
  'Kristin Seubold',
  'Glen Malan, MBA',
  'Jeff Yamada'
];

// 4. Load LINKEDIN_GLOBAL_HOSPITAL_TOUCHPOINTS.json
const touchpointsFile = path.join(__dirname, 'LINKEDIN_GLOBAL_HOSPITAL_TOUCHPOINTS.json');
let touchpoints = [];
if (fs.existsSync(touchpointsFile)) {
  touchpoints = JSON.parse(fs.readFileSync(touchpointsFile, 'utf8'));
}

console.log('='.repeat(75));
console.log('CROSS-REFERENCE REPORT: BOUNCED EMAILS VS LINKEDIN DISPATCH STATUS');
console.log('='.repeat(75));

let sentOnLinkedIn = [];
let notSentOnLinkedIn = [];

for (const b of bouncedEmails) {
  // Check if organization or name matches any of our sent invitations
  let match = null;

  // Mount Sinai check
  if (b.org.includes('Mount Sinai')) {
    match = {
      type: 'VERIFIED_PENDING_ON_LINKEDIN',
      matchedPerson: 'Lisa Stump (EVP, CDIO & Dean of IT, Mount Sinai Health System)',
      detail: 'Email bounced because old contact was used, but Lisa Stump was directly invited on LinkedIn!'
    };
  }

  // Check against all pending
  for (const p of [...linkedinPendingInvitations, ...sentToday]) {
    if (b.name.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(b.name.toLowerCase())) {
      match = {
        type: 'VERIFIED_PENDING_ON_LINKEDIN',
        matchedPerson: p,
        detail: 'Direct match with sent LinkedIn invitation'
      };
      break;
    }
  }

  // Check in touchpoints dossier
  const inDossier = touchpoints.find(t => 
    (t.email && t.email.toLowerCase() === b.email.toLowerCase()) ||
    (t.company && b.org.toLowerCase().includes(t.company.toLowerCase()))
  );

  if (match) {
    sentOnLinkedIn.push({ ...b, match });
  } else {
    notSentOnLinkedIn.push({ ...b, inDossier: !!inDossier, searchUrl: inDossier ? inDossier.linkedin_search_url : `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(`"${b.org}" ("CIO" OR "IT Director")`)}` });
  }
}

console.log(`\n✅ 1. BOUNCED LEADS ALREADY CONTACTED ON LINKEDIN: ${sentOnLinkedIn.length}`);
sentOnLinkedIn.forEach((s, idx) => {
  console.log(`   [${idx + 1}] Org: ${s.org} (${s.email})`);
  console.log(`       Target Invited: ${s.match.matchedPerson}`);
  console.log(`       Detail: ${s.match.detail}`);
});

console.log(`\n❌ 2. BOUNCED LEADS NOT YET CONTACTED ON LINKEDIN: ${notSentOnLinkedIn.length}`);
notSentOnLinkedIn.forEach((ns, idx) => {
  console.log(`   [${idx + 1}] Org: ${ns.org} | Target: ${ns.name} | Email: ${ns.email}`);
  console.log(`       In Dossier: ${ns.inDossier ? 'YES' : 'NO'} | Search: ${ns.searchUrl.substring(0, 80)}...`);
});
