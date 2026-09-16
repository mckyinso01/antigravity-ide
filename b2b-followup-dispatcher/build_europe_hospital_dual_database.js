// ============================================================
// Build Top 20 European Private & Acute Hospital Groups Database
// Germany | France | Switzerland | Spain | Italy | Nordics
// Clinical Pristine ICU OS + ClaimGuard AI Dual Architecture
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, 'EUROPE_HOSPITALS_DUAL_DATABASE.json');

const europeChains = [
  {
    id: "EU-01",
    country: "Germany",
    region: "National / Berlin",
    hospital_name: "Fresenius Helios Kliniken GmbH",
    facility_count: "86 Acute Hospitals (Europe's Largest Private Hospital Group)",
    beds: 35000,
    core_ehr: "Dedalus ORBIS / Epic Transition & SAP IS-H (KHZG Digitization)",
    decision_maker: "Carsten Frischmuth (Chief Information Officer & Head of Group IT)",
    email_domain: "helios-gesundheit.de",
    sample_email: "carsten.frischmuth@helios-gesundheit.de",
    role_email: "info@helios-gesundheit.de",
    pain_point: "KHZG hospital digitization mandate compliance, continuous bedside physiological telemetry streaming into ORBIS, and German G-DRG inpatient coding dispute defense"
  },
  {
    id: "EU-02",
    country: "Germany",
    region: "National / Hamburg",
    hospital_name: "Asklepios Kliniken Gruppe",
    facility_count: "170+ Healthcare Facilities & Acute Clinics",
    beds: 31000,
    core_ehr: "Dedalus ORBIS / Cerner i.s.h.med",
    decision_maker: "Henning Schneider (Chief Information Officer & Digital Transformation Lead)",
    email_domain: "asklepios.com",
    sample_email: "h.schneider@asklepios.com",
    role_email: "it-service@asklepios.com",
    pain_point: "Enterprise KHZG modernization, telemetry vendor lock-in across 170 facilities, and automated MDK audit denial defense"
  },
  {
    id: "EU-03",
    country: "Germany",
    region: "National / Munich",
    hospital_name: "Sana Kliniken AG",
    facility_count: "55 Acute Hospitals & Specialized Inpatient Centers",
    beds: 10000,
    core_ehr: "Dedalus ORBIS & Cerner",
    decision_maker: "Michael Schöpf (Chief Information Officer & Head of IT Management)",
    email_domain: "sana.de",
    sample_email: "michael.schoepf@sana.de",
    role_email: "info@sana.de",
    pain_point: "Multi-center acute ICU waveform standardization and automated DRG insurance settlement recovery"
  },
  {
    id: "EU-04",
    country: "France",
    region: "National / Paris",
    hospital_name: "Ramsay Santé (France & Nordics)",
    facility_count: "350+ Facilities & Acute Clinics across France, Sweden, Norway, and Denmark",
    beds: 25000,
    core_ehr: "Maincare Solutions / Dedalus DxCare / Berger-Levrault",
    decision_maker: "Matthieu Levesque (Chief Digital & Information Officer)",
    email_domain: "ramsaygds.fr",
    sample_email: "m.levesque@ramsaygds.fr",
    role_email: "contact@ramsaygds.fr",
    pain_point: "Pan-European cross-border telemetry standardization, Ségur de la Santé compliance, and French T2A hospital activity billing audit defense"
  },
  {
    id: "EU-05",
    country: "France",
    region: "National / Paris",
    hospital_name: "Elsan SAS (Leading French Private Hospital Group)",
    facility_count: "140 Acute Clinics & Surgical Centers",
    beds: 15000,
    core_ehr: "Dedalus DxCare / Medasys",
    decision_maker: "Jérôme Dupont (Director of Information Systems & Digital)",
    email_domain: "elsan.care",
    sample_email: "j.dupont@elsan.care",
    role_email: "contact@elsan.care",
    pain_point: "Sub-second acute telemetry monitoring integration and automated Sécurité Sociale / Mutuelle rejection appeal generation"
  },
  {
    id: "EU-06",
    country: "Switzerland",
    region: "National / Zurich & Geneva",
    hospital_name: "Hirslanden Private Hospital Group (Mediclinic)",
    facility_count: "17 Premier Quaternary Private Hospitals",
    beds: 2100,
    core_ehr: "Epic EHR / SAP Healthcare (Swiss Epic Flagship)",
    decision_maker: "Christian Weskott (Chief Information Officer) / CCIO Directorate",
    email_domain: "hirslanden.ch",
    sample_email: "christian.weskott@hirslanden.ch",
    role_email: "medien@hirslanden.ch",
    pain_point: "Ultra-high-end private ICU continuous waveform streaming into Epic EHR and Swiss SwissDRG/KVG payer billing reconciliation"
  },
  {
    id: "EU-07",
    country: "Switzerland",
    region: "National / Valais & Vaud",
    hospital_name: "Swiss Medical Network SA",
    facility_count: "21 Inpatient Clinics & Surgical Hospitals",
    beds: 1800,
    core_ehr: "Dedalus ORBIS / Intersystems TrakCare",
    decision_maker: "Fabian Rindlisbacher (Chief Information Officer)",
    email_domain: "swissmedical.net",
    sample_email: "frindlisbacher@swissmedical.net",
    role_email: "info@swissmedical.net",
    pain_point: "Swiss FADP private cloud data sovereignty, real-time arterial waveform monitoring, and SwissDRG complex claim validation"
  },
  {
    id: "EU-08",
    country: "Spain",
    region: "National / Madrid & Barcelona",
    hospital_name: "Quirónsalud (Fresenius Helios Spain)",
    facility_count: "58 Acute Hospitals & Specialized Quaternary Centers",
    beds: 7000,
    core_ehr: "Dedalus Ehcos & SAP Healthcare",
    decision_maker: "Ángel Blanco (Director of Organization, Processes and ICT)",
    email_domain: "quironsalud.es",
    sample_email: "angel.blanco@quironsalud.es",
    role_email: "info@quironsalud.es",
    pain_point: "Multi-hospital physiological waveform archiving, Spanish mutual fund private health insurance billing validation, and zero SaaS lock-in"
  },
  {
    id: "EU-09",
    country: "Spain",
    region: "Madrid / Barcelona",
    hospital_name: "HM Hospitales",
    facility_count: "48 Healthcare Centers & 21 Acute Hospitals",
    beds: 2500,
    core_ehr: "Green Cube / Bespoke EHR",
    decision_maker: "Alberto Estirado (Chief Information Officer & Digital Transformation)",
    email_domain: "hmhospitales.com",
    sample_email: "aestirado@hmhospitales.com",
    role_email: "comunicacion@hmhospitales.com",
    pain_point: "Cardiovascular and oncology ICU telemetry streaming and private Spanish insurance pre-authorization denial defense"
  },
  {
    id: "EU-10",
    country: "Italy",
    region: "Lombardy / Milan",
    hospital_name: "Gruppo San Donato (GSD - Italy's Largest Private Hospital Group)",
    facility_count: "56 Healthcare Facilities, including IRCCS Policlinico San Donato & San Raffaele",
    beds: 5800,
    core_ehr: "Engineering Ingegneria Informatica / Dedalus",
    decision_maker: "Emanuele Vignola (Group Chief Information Officer)",
    email_domain: "grupposandonato.it",
    sample_email: "emanuele.vignola@grupposandonato.it",
    role_email: "info@grupposandonato.it",
    pain_point: "High-volume cardiovascular ICU telemetry monitoring, SSN regional reimbursement optimization, and private payer dispute resolution"
  },
  {
    id: "EU-11",
    country: "Italy",
    region: "Lombardy / Milan",
    hospital_name: "Humanitas Research Hospital (IRCCS)",
    facility_count: "10 Acute Quaternary Hospitals & Academic Research Centers",
    beds: 1800,
    core_ehr: "Bespoke Modern EHR & Dedalus",
    decision_maker: "Maurizio Suraci (Chief Information Officer)",
    email_domain: "humanitas.it",
    sample_email: "maurizio.suraci@humanitas.it",
    role_email: "urp@humanitas.it",
    pain_point: "Academic quaternary ICU multi-lead arterial waveform recording and international patient insurance claim reimbursement defense"
  },
  {
    id: "EU-12",
    country: "Germany",
    region: "Hesse / Marburg",
    hospital_name: "Rhön-Klinikum AG (Asklepios Group)",
    facility_count: "5 Maximum Care Campuses including Universitätsklinikum Gießen und Marburg",
    beds: 5400,
    core_ehr: "Cerner i.s.h.med & Dedalus ORBIS",
    decision_maker: "Stefan Stranz (Head of Corporate IT Infrastructure)",
    email_domain: "rhoen-klinikum-ag.com",
    sample_email: "stefan.stranz@rhoen-klinikum-ag.com",
    role_email: "it-leitung@rhoen-klinikum-ag.com",
    pain_point: "University hospital acute research telemetry integration, KHZG Förderkriterien fulfillment, and complex DRG case verification"
  },
  {
    id: "EU-13",
    country: "Germany",
    region: "Bavaria",
    hospital_name: "Schön Klinik SE",
    facility_count: "17 Specialized Acute Clinics for Orthopedics and Neurology",
    beds: 3000,
    core_ehr: "Dedalus ORBIS",
    decision_maker: "Markus Reischl (Chief Information Officer)",
    email_domain: "schoen-klinik.de",
    sample_email: "mreischl@schoen-klinik.de",
    role_email: "info@schoen-klinik.de",
    pain_point: "Neuro-intensive care bedside EEG/waveform capture and specialized inpatient rehabilitation insurer coverage proof"
  },
  {
    id: "EU-14",
    country: "Germany",
    region: "Baden-Württemberg",
    hospital_name: "Kliniken Schmieder (Neurological Centers of Excellence)",
    facility_count: "6 Specialized Acute & Quaternary Neuro-ICU Clinics",
    beds: 2200,
    core_ehr: "Dedalus ORBIS & Nexus AG",
    decision_maker: "Alexander Egle (Director of Information Technology)",
    email_domain: "kliniken-schmieder.de",
    sample_email: "a.egle@kliniken-schmieder.de",
    role_email: "zentrale@kliniken-schmieder.de",
    pain_point: "Long-term ventilated neuro-ICU physiological waveform monitoring and German statutory health insurance (GKV) length-of-stay dispute defense"
  },
  {
    id: "EU-15",
    country: "France",
    region: "National / Rennes & Paris",
    hospital_name: "Vivalto Santé (3rd Largest Private Hospital Operator in France)",
    facility_count: "50+ Acute Clinics & Hospitals",
    beds: 7500,
    core_ehr: "Maincare Solutions / Berger-Levrault",
    decision_maker: "Philippe Durand (Chief Information Officer)",
    email_domain: "vivalto-sante.com",
    sample_email: "pdurand@vivalto-sante.com",
    role_email: "contact@vivalto-sante.com",
    pain_point: "Rapid regional clinical network integration, multi-lead telemetry bedside synchronization, and T2A activity justification"
  },
  {
    id: "EU-16",
    country: "Netherlands",
    region: "Utrecht / Nieuwegein",
    hospital_name: "St. Antonius Ziekenhuis (Top Quaternary Heart & Lung Center)",
    facility_count: "3 Inpatient Campuses & Specialized Acute Centers",
    beds: 850,
    core_ehr: "Epic EHR (Enterprise St. Antonius)",
    decision_maker: "René Luigies (Chief Information Officer) / CCIO Directorate",
    email_domain: "antoniusziekenhuis.nl",
    sample_email: "r.luigies@antoniusziekenhuis.nl",
    role_email: "info@antoniusziekenhuis.nl",
    pain_point: "Cardiac acute ICU waveform telemetry integration into Epic EHR and Dutch DBC/DOT healthcare insurer claims reconciliation"
  },
  {
    id: "EU-17",
    country: "Netherlands",
    region: "Rotterdam",
    hospital_name: "Erasmus MC (Erasmus University Medical Center)",
    facility_count: "Largest Quaternary Medical Center in the Netherlands",
    beds: 1200,
    core_ehr: "Epic EHR (Erasmus MC Flagship)",
    decision_maker: "Simon Vermeer (Chief Information Officer)",
    email_domain: "erasmusmc.nl",
    sample_email: "s.vermeer@erasmusmc.nl",
    role_email: "ict-servicedesk@erasmusmc.nl",
    pain_point: "High-density trauma and neonatal ICU physiological telemetry streaming into Epic without proprietary gateway hardware tax"
  },
  {
    id: "EU-18",
    country: "Spain",
    region: "Navarre & Madrid",
    hospital_name: "Clínica Universidad de Navarra (Ranked #1 Private Hospital in Spain)",
    facility_count: "2 Academic Quaternary Medical Campuses (Pamplona & Madrid)",
    beds: 650,
    core_ehr: "Bespoke Modern EHR / Intersystems HealthShare",
    decision_maker: "Javier Arcos (Chief Information Officer & Digital Medical Director)",
    email_domain: "unav.es",
    sample_email: "jarcos@unav.es",
    role_email: "atencionalpaciente@unav.es",
    pain_point: "Precision medicine ICU waveform telemetry capture and international insurer medical dossier defense"
  },
  {
    id: "EU-19",
    country: "Sweden / Nordics",
    region: "Stockholm & Gothenburg",
    hospital_name: "Capio AB (Ramsay Santé Nordics)",
    facility_count: "100+ Healthcare Facilities & Acute Hospitals in Sweden and Norway",
    beds: 3500,
    core_ehr: "Cambio COSMIC EHR / Cerner",
    decision_maker: "Stefan Sjöström (Chief Digital Officer & Head of IT)",
    email_domain: "capio.se",
    sample_email: "stefan.sjostrom@capio.se",
    role_email: "info@capio.se",
    pain_point: "Nordic COSMIC EHR continuous vitals integration and regional council healthcare funding dispute resolution"
  },
  {
    id: "EU-20",
    country: "Austria",
    region: "Vienna",
    hospital_name: "PremiQaMed Group (Leading Private Hospital Operator in Austria)",
    facility_count: "5 Premier Private Inpatient Hospitals (Privatklinik Döbling, Confraternität, etc.)",
    beds: 700,
    core_ehr: "SAP Healthcare & Bespoke Clinical Portal",
    decision_maker: "Thomas Mlczoch (Chief Information Officer)",
    email_domain: "premiqamed.at",
    sample_email: "thomas.mlczoch@premiqamed.at",
    role_email: "holding@premiqamed.at",
    pain_point: "Private hospital patient telemetry monitoring and Austrian LKF (Leistungsorientierte Krankenanstaltenfinanzierung) reimbursement validation"
  }
];

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(europeChains, null, 2), 'utf-8');
console.log('='.repeat(75));
console.log('🇪🇺 EUROPE PRIVATE & ACUTE HOSPITALS DUAL-DATABASE COMPILED');
console.log(`📁 Target File: ${OUTPUT_FILE}`);
console.log(`📊 Total Enterprise Chains: ${europeChains.length}`);
console.log('🔗 Dual Architecture: Clinical Pristine ICU OS + ClaimGuard AI');
console.log('='.repeat(75));
