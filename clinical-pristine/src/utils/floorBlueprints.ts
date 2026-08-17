import type { RoomData, BedData, FloorTagData } from '../db';

export interface FloorBlueprintConfig {
  rooms: RoomData[];
  beds: BedData[];
  tags: FloorTagData[];
}

export const HOSPITAL_FLOOR_BLUEPRINTS: Record<number, FloorBlueprintConfig> = {
  // --------------------------------------------------------------------------
  // LEVEL 1: EMERGENCY & TRAUMA PAVILION (L1-ER)
  // --------------------------------------------------------------------------
  1: {
    rooms: [
      { id: 'R-101-TRAUMA', name: 'Trauma Resuscitation Suite 101', floorNumber: 1, department: 'Emergency', status: 'occupied', acuity: 'critical', x: 60, y: 50, w: 390, h: 280 },
      { id: 'R-102-TRIAGE', name: 'Rapid Triage & Observation 102', floorNumber: 1, department: 'Emergency', status: 'occupied', acuity: 'stable', x: 60, y: 370, w: 390, h: 280 },
      { id: 'R-103-ACUTE', name: 'Acute Inpatient Care Suite 103', floorNumber: 1, department: 'Med-Surg', status: 'occupied', acuity: 'stable', x: 540, y: 50, w: 400, h: 280 },
      { id: 'R-104-ISO', name: 'Airborne Infection Isolation Suite 104', floorNumber: 1, department: 'Isolation', status: 'occupied', acuity: 'critical', x: 540, y: 370, w: 400, h: 280 }
    ],
    beds: [
      {
        id: 'B-101-A', room: 'R-101-TRAUMA', floorNumber: 1, status: 'occupied', acuity: 'critical', patientName: 'Eleanor Vance',
        patientSafety: {
          mrn: 'MRN-202401', age: 42, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Severe Polytrauma & Hemorrhagic Shock', triageLevel: 1,
          allergies: ['Penicillin', 'Sulfa'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: '08:00 AM',
          assignedDoctor: 'Dr. Angela Santos, MD', assignedNurse: 'Nurse Eleanor Vance, RN',
          activeApparatus: ['IV Infusion Pump (Normal Saline @ 100mL/h)', 'Cardiac Telemetry Lead II', 'High-Flow 15L O2 Mask'],
          vitals: { bp: '168/102', hr: 170, spo2: 93, temp: 38.6, lastRecorded: '08:00 AM' },
          medicationsSchedule: [{ name: 'Cefazolin 2g IVPB', dose: '2 g', route: 'IV', time: '08:00 AM', status: 'given' }, { name: 'Epinephrine 1mg IV', dose: '1 mg', route: 'IV', time: '08:15 AM', status: 'due' }]
        },
        equipment: ['telemetry', 'ventilator', 'o2'], x: 100, y: 110, rotation: 0
      },
      { id: 'B-101-B', room: 'R-101-TRAUMA', floorNumber: 1, status: 'empty', acuity: 'none', equipment: ['telemetry', 'ventilator', 'o2'], x: 230, y: 110, rotation: 0 },
      {
        id: 'B-102-A', room: 'R-102-TRIAGE', floorNumber: 1, status: 'occupied', acuity: 'stable', patientName: 'Arthur Pendelton',
        patientSafety: {
          mrn: 'MRN-202402', age: 58, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Post-Syncope Cardiac Observation', triageLevel: 3,
          allergies: ['NKDA'], fallRisk: true, npo: false, dnr: false, isolation: 'none', admittedAt: '08:15 AM',
          assignedDoctor: 'Dr. Angela Santos, MD', assignedNurse: 'Nurse Eleanor Vance, RN',
          activeApparatus: ['Telemetry Lead II', 'Saline Lock'],
          vitals: { bp: '120/78', hr: 74, spo2: 98, temp: 37.0, lastRecorded: '08:15 AM' },
          medicationsSchedule: [{ name: 'Metoprolol 25mg PO', dose: '25 mg', route: 'Oral', time: '08:00 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 100, y: 430, rotation: 0
      },
      { id: 'B-102-B', room: 'R-102-TRIAGE', floorNumber: 1, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 230, y: 430, rotation: 0 },
      {
        id: 'B-103-A', room: 'R-103-ACUTE', floorNumber: 1, status: 'occupied', acuity: 'stable', patientName: 'Sarah Jenkins',
        patientSafety: {
          mrn: 'MRN-202403', age: 34, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Acute Pyelonephritis on IV Antibiotics', triageLevel: 3,
          allergies: ['Ciprofloxacin'], fallRisk: false, npo: false, dnr: false, isolation: 'none', admittedAt: '07:45 AM',
          assignedDoctor: 'Dr. Angela Santos, MD', assignedNurse: 'Nurse John Smith, RN',
          activeApparatus: ['IV Saline Lock (Ceftriaxone IV)'],
          vitals: { bp: '118/74', hr: 72, spo2: 99, temp: 37.8, lastRecorded: '07:45 AM' },
          medicationsSchedule: [{ name: 'Ceftriaxone 1g IV', dose: '1 g', route: 'IV', time: '08:00 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 580, y: 110, rotation: 0
      },
      {
        id: 'B-103-B', room: 'R-103-ACUTE', floorNumber: 1, status: 'occupied', acuity: 'stable', patientName: 'Nelson Davies',
        patientSafety: {
          mrn: 'MRN-202404', age: 62, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Post-Angioplasty Recovery', triageLevel: 2,
          allergies: ['Aspirin'], fallRisk: true, npo: false, dnr: false, isolation: 'none', admittedAt: '08:10 AM',
          assignedDoctor: 'Dr. Robert Vance, MD', assignedNurse: 'Nurse Eleanor Vance, RN',
          activeApparatus: ['Cardiac Telemetry Lead II', 'Radial Compression Band'],
          vitals: { bp: '130/84', hr: 78, spo2: 97, temp: 36.8, lastRecorded: '08:10 AM' },
          medicationsSchedule: [{ name: 'Clopidogrel 75mg PO', dose: '75 mg', route: 'Oral', time: '08:00 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 690, y: 110, rotation: 0
      },
      { id: 'B-103-C', room: 'R-103-ACUTE', floorNumber: 1, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 800, y: 110, rotation: 0 },
      { id: 'B-103-D', room: 'R-103-ACUTE', floorNumber: 1, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 800, y: 210, rotation: 90 },
      {
        id: 'B-104-ISO', room: 'R-104-ISO', floorNumber: 1, status: 'occupied', acuity: 'critical', patientName: 'David Kim',
        patientSafety: {
          mrn: 'MRN-202405', age: 45, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Suspected Open Pulmonary TB (Airborne Precautions)', triageLevel: 2,
          allergies: ['Rifampin'], fallRisk: true, npo: false, dnr: false, isolation: 'airborne', admittedAt: '08:30 AM',
          assignedDoctor: 'Dr. Michael Chen, MD', assignedNurse: 'Nurse Eleanor Vance, RN',
          activeApparatus: ['Negative Pressure Monitor Active', 'Continuous SpO2 Pulse Ox', 'N95 Respirator Required for Entry'],
          vitals: { bp: '138/88', hr: 98, spo2: 94, temp: 38.4, lastRecorded: '08:30 AM' },
          medicationsSchedule: [{ name: 'Isoniazid 300mg PO', dose: '300 mg', route: 'Oral', time: '08:30 AM', status: 'given' }]
        },
        equipment: ['telemetry', 'negative-pressure', 'o2'], x: 680, y: 450, rotation: 0
      }
    ],
    tags: [
      { id: 'TAG-1-EXIT', floorNumber: 1, x: 480, y: 32, text: 'FIRE EXIT NORTH 🚨', color: '#DC2626', iconType: 'fire-exit' },
      { id: 'TAG-1-NS', floorNumber: 1, x: 480, y: 350, text: 'NURSE STATION Live Telemetry Hub 🩺', color: '#0284C7', iconType: 'nurse-station' },
      { id: 'TAG-1-STAIRW', floorNumber: 1, x: 250, y: 350, text: 'WEST STAIRS CORE 🚪', color: '#16A34A', iconType: 'emergency-stair' },
      { id: 'TAG-1-STAIRE', floorNumber: 1, x: 730, y: 350, text: 'EAST STAIRS CORE 🚪', color: '#16A34A', iconType: 'emergency-stair' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 2: SURGICAL SUITES & PACU RECOVERY (L2-OR)
  // --------------------------------------------------------------------------
  2: {
    rooms: [
      { id: 'R-201-OR1', name: 'Operating Theater 1 (Major Trauma & Neuro)', floorNumber: 2, department: 'Surgery', status: 'occupied', acuity: 'critical', x: 60, y: 50, w: 380, h: 280 },
      { id: 'R-202-OR2', name: 'Operating Theater 2 (Hybrid Robotic DaVinci)', floorNumber: 2, department: 'Surgery', status: 'empty', acuity: 'none', x: 60, y: 370, w: 380, h: 280 },
      { id: 'R-203-PACU', name: 'Post-Anesthesia Care Unit (PACU 4-Bay)', floorNumber: 2, department: 'PACU', status: 'occupied', acuity: 'stable', x: 520, y: 50, w: 420, h: 280 },
      { id: 'R-204-PREOP', name: 'Pre-Op Induction & Surgical Scrub Core', floorNumber: 2, department: 'Pre-Op', status: 'occupied', acuity: 'stable', x: 520, y: 370, w: 420, h: 280 }
    ],
    beds: [
      {
        id: 'B-OR-201', room: 'R-201-OR1', floorNumber: 2, status: 'occupied', acuity: 'critical', patientName: 'Jonathan Hayes',
        patientSafety: {
          mrn: 'MRN-202501', age: 52, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Intraoperative Right Parietal Craniotomy', triageLevel: 1,
          allergies: ['Latex'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: '06:30 AM',
          assignedDoctor: 'Dr. Evelyn Reed, MD (Neurosurgery)', assignedNurse: 'Scrub RN Alex Chen',
          activeApparatus: ['General Endotracheal Anesthesia', 'Arterial Line (Radial)', 'Central Venous Catheter (Internal Jugular)'],
          vitals: { bp: '115/68', hr: 68, spo2: 100, temp: 36.5, lastRecorded: '09:00 AM' },
          medicationsSchedule: [{ name: 'Propofol Infusion @ 120mcg/kg/min', dose: '120 mcg', route: 'IV', time: '09:00 AM', status: 'given' }]
        },
        equipment: ['ventilator', 'telemetry', 'o2'], x: 220, y: 150, rotation: 0
      },
      { id: 'B-OR-202', room: 'R-202-OR2', floorNumber: 2, status: 'empty', acuity: 'none', equipment: ['telemetry', 'o2'], x: 220, y: 470, rotation: 0 },
      {
        id: 'B-PACU-1', room: 'R-203-PACU', floorNumber: 2, status: 'occupied', acuity: 'stable', patientName: 'Clara Oswald',
        patientSafety: {
          mrn: 'MRN-202502', age: 29, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Post-Laparoscopic Appendectomy Phase I Recovery', triageLevel: 3,
          allergies: ['Codeine'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: '08:45 AM',
          assignedDoctor: 'Dr. Evelyn Reed, MD', assignedNurse: 'PACU RN Marcus Thorne',
          activeApparatus: ['Nasal Cannula 2L O2', 'Continuous SpO2 Sensor'],
          vitals: { bp: '122/76', hr: 76, spo2: 99, temp: 37.1, lastRecorded: '09:10 AM' },
          medicationsSchedule: [{ name: 'Ondansetron 4mg IV', dose: '4 mg', route: 'IV', time: '08:50 AM', status: 'given' }]
        },
        equipment: ['telemetry', 'o2'], x: 570, y: 110, rotation: 0
      },
      {
        id: 'B-PACU-2', room: 'R-203-PACU', floorNumber: 2, status: 'occupied', acuity: 'stable', patientName: 'Henry Cavill',
        patientSafety: {
          mrn: 'MRN-202503', age: 41, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Post-Inguinal Hernia Repair PACU Recovery', triageLevel: 3,
          allergies: ['NKDA'], fallRisk: true, npo: false, dnr: false, isolation: 'none', admittedAt: '09:00 AM',
          assignedDoctor: 'Dr. Evelyn Reed, MD', assignedNurse: 'PACU RN Marcus Thorne',
          activeApparatus: ['IV Saline Lock'],
          vitals: { bp: '128/80', hr: 70, spo2: 98, temp: 36.9, lastRecorded: '09:15 AM' },
          medicationsSchedule: [{ name: 'Acetaminophen 1000mg IV', dose: '1 g', route: 'IV', time: '09:05 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 670, y: 110, rotation: 0
      },
      { id: 'B-PACU-3', room: 'R-203-PACU', floorNumber: 2, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 770, y: 110, rotation: 0 },
      { id: 'B-PACU-4', room: 'R-203-PACU', floorNumber: 2, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 870, y: 110, rotation: 0 },
      {
        id: 'B-PREOP-1', room: 'R-204-PREOP', floorNumber: 2, status: 'occupied', acuity: 'stable', patientName: 'Robert Lang',
        patientSafety: {
          mrn: 'MRN-202504', age: 60, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Pre-Op Holding: Scheduled Lap Cholecystectomy', triageLevel: 3,
          allergies: ['Morphine'], fallRisk: false, npo: true, dnr: false, isolation: 'none', admittedAt: '08:30 AM',
          assignedDoctor: 'Dr. Michael Chen, MD', assignedNurse: 'Pre-Op RN Chloe Decker',
          activeApparatus: ['18G Left Forearm PIV Line (D5W KVO)'],
          vitals: { bp: '134/82', hr: 80, spo2: 98, temp: 36.8, lastRecorded: '08:30 AM' },
          medicationsSchedule: [{ name: 'Midazolam 2mg IV', dose: '2 mg', route: 'IV', time: '09:20 AM', status: 'due' }]
        },
        equipment: ['telemetry'], x: 570, y: 430, rotation: 0
      },
      { id: 'B-PREOP-2', room: 'R-204-PREOP', floorNumber: 2, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 720, y: 430, rotation: 0 }
    ],
    tags: [
      { id: 'TAG-2-STERILE', floorNumber: 2, x: 480, y: 32, text: 'SURGICAL HEPA AIRLOCK 🔬', color: '#0284C7', iconType: 'fire-exit' },
      { id: 'TAG-2-PACU-NS', floorNumber: 2, x: 480, y: 350, text: 'PACU CENTRAL MONITORING 🩺', color: '#0284C7', iconType: 'nurse-station' },
      { id: 'TAG-2-SCRUB', floorNumber: 2, x: 250, y: 350, text: 'STERILE SCRUB ALCOVE 🧼', color: '#16A34A', iconType: 'emergency-stair' },
      { id: 'TAG-2-STAIRE', floorNumber: 2, x: 730, y: 350, text: 'SURGERY RECOVERY CORE 🚪', color: '#16A34A', iconType: 'emergency-stair' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 3: CRITICAL CARE UNIT (CARDIAC & INTENSIVE CARE ICU/CCU) (L3-ICU)
  // --------------------------------------------------------------------------
  3: {
    rooms: [
      { id: 'R-301-CCU', name: 'Coronary Care Glass Pod 301', floorNumber: 3, department: 'CCU', status: 'occupied', acuity: 'critical', x: 60, y: 50, w: 380, h: 280 },
      { id: 'R-302-MICU', name: 'Medical ICU Resuscitation Pod 302', floorNumber: 3, department: 'ICU', status: 'occupied', acuity: 'critical', x: 60, y: 370, w: 380, h: 280 },
      { id: 'R-303-SICU', name: 'Surgical Trauma ICU Pod 303', floorNumber: 3, department: 'SICU', status: 'occupied', acuity: 'critical', x: 520, y: 50, w: 420, h: 280 },
      { id: 'R-304-NEURO', name: 'Neuro-ICU Negative Pressure Pod 304', floorNumber: 3, department: 'Neuro-ICU', status: 'occupied', acuity: 'critical', x: 520, y: 370, w: 420, h: 280 }
    ],
    beds: [
      {
        id: 'B-CCU-301', room: 'R-301-CCU', floorNumber: 3, status: 'occupied', acuity: 'critical', patientName: 'Liam Gallagher',
        patientSafety: {
          mrn: 'MRN-202601', age: 54, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Acute Inferior STEMI with Cardiogenic Shock on IABP', triageLevel: 1,
          allergies: ['Heparin'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: '04:15 AM',
          assignedDoctor: 'Dr. Angela Santos, MD (Cardiology)', assignedNurse: 'ICU RN Natasha Romanoff',
          activeApparatus: ['Intra-Aortic Balloon Pump (1:1 Augmentation)', '12-Lead Continuous Telemetry', 'Dopamine IV Infusion @ 5mcg/kg/min'],
          vitals: { bp: '98/62', hr: 92, spo2: 96, temp: 37.2, lastRecorded: '09:00 AM' },
          medicationsSchedule: [{ name: 'Norepinephrine 8mcg/min IV', dose: '8 mcg', route: 'IV', time: '09:00 AM', status: 'given' }]
        },
        equipment: ['ventilator', 'telemetry', 'o2'], x: 220, y: 150, rotation: 0
      },
      {
        id: 'B-MICU-302', room: 'R-302-MICU', floorNumber: 3, status: 'occupied', acuity: 'critical', patientName: 'Sophia Martinez',
        patientSafety: {
          mrn: 'MRN-202602', age: 38, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Severe Acute Respiratory Distress Syndrome (ARDS) on V-V ECMO', triageLevel: 1,
          allergies: ['Sulfa'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: '02:30 AM',
          assignedDoctor: 'Dr. Michael Chen, MD (Intensivist)', assignedNurse: 'ICU RN Steve Rogers',
          activeApparatus: ['V-V Extracorporeal Membrane Oxygenation (ECMO)', 'Hamilton G5 Mechanical Ventilator (PEEP 14)', 'Continuous Cisatracurium Infusion'],
          vitals: { bp: '108/64', hr: 88, spo2: 92, temp: 38.2, lastRecorded: '09:05 AM' },
          medicationsSchedule: [{ name: 'Fentanyl 100mcg/hr IV', dose: '100 mcg', route: 'IV', time: '09:00 AM', status: 'given' }]
        },
        equipment: ['ventilator', 'telemetry', 'o2'], x: 220, y: 470, rotation: 0
      },
      {
        id: 'B-SICU-303', room: 'R-303-SICU', floorNumber: 3, status: 'occupied', acuity: 'critical', patientName: 'Ethan Hunt',
        patientSafety: {
          mrn: 'MRN-202603', age: 48, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Post-Exploratory Laparotomy for Hepatic Laceration (Damage Control)', triageLevel: 1,
          allergies: ['Penicillin'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: '05:00 AM',
          assignedDoctor: 'Dr. Evelyn Reed, MD (Trauma Surgery)', assignedNurse: 'ICU RN Bruce Wayne',
          activeApparatus: ['Rapid Transfusion Level 1 System Online', 'Bilateral Jackson-Pratt Drains', 'Arterial Line'],
          vitals: { bp: '112/70', hr: 104, spo2: 95, temp: 36.4, lastRecorded: '09:10 AM' },
          medicationsSchedule: [{ name: 'Tranexamic Acid 1g IV', dose: '1 g', route: 'IV', time: '09:00 AM', status: 'given' }]
        },
        equipment: ['ventilator', 'telemetry', 'o2'], x: 700, y: 150, rotation: 0
      },
      {
        id: 'B-NEURO-304', room: 'R-304-NEURO', floorNumber: 3, status: 'occupied', acuity: 'critical', patientName: 'Olivia Wilde',
        patientSafety: {
          mrn: 'MRN-202604', age: 33, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Severe Traumatic Brain Injury with Camino ICP Bolt (ICP 18 mmHg)', triageLevel: 1,
          allergies: ['NKDA'], fallRisk: true, npo: true, dnr: false, isolation: 'airborne', admittedAt: '03:45 AM',
          assignedDoctor: 'Dr. Evelyn Reed, MD', assignedNurse: 'ICU RN Barry Allen',
          activeApparatus: ['Camino Fiberoptic Intracranial Pressure Bolt', '3% Hypertonic Saline Continuous Infusion', 'Targeted Temperature Management (36.0 C)'],
          vitals: { bp: '142/86', hr: 62, spo2: 98, temp: 36.0, lastRecorded: '09:15 AM' },
          medicationsSchedule: [{ name: 'Mannitol 20% 50g IVPB', dose: '50 g', route: 'IV', time: '08:30 AM', status: 'given' }]
        },
        equipment: ['ventilator', 'telemetry', 'negative-pressure', 'o2'], x: 700, y: 470, rotation: 0
      }
    ],
    tags: [
      { id: 'TAG-3-COMMAND', floorNumber: 3, x: 480, y: 350, text: '360 CRITICAL COMMAND DESK 🚨', color: '#E11D48', iconType: 'nurse-station' },
      { id: 'TAG-3-ABG', floorNumber: 3, x: 250, y: 350, text: 'STAT ABG POINT-OF-CARE 🩸', color: '#DC2626', iconType: 'fire-exit' },
      { id: 'TAG-3-CRASH', floorNumber: 3, x: 730, y: 350, text: 'CODE BLUE RESUSCITATION CART ⚡', color: '#DC2626', iconType: 'emergency-stair' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 9: RENAL & ACUTE HEMODIALYSIS UNIT (L9-RENAL)
  // --------------------------------------------------------------------------
  9: {
    rooms: [
      { id: 'R-901-DIAL', name: 'Acute Hemodialysis Suite (4 Stations)', floorNumber: 9, department: 'Nephrology', status: 'occupied', acuity: 'stable', x: 60, y: 50, w: 420, h: 280 },
      { id: 'R-902-PERI', name: 'Peritoneal Dialysis & Home Training Suite 902', floorNumber: 9, department: 'Peritoneal', status: 'occupied', acuity: 'stable', x: 60, y: 370, w: 420, h: 280 },
      { id: 'R-903-NEPHRO', name: 'Inpatient Nephrology & Pre-Transplant 903', floorNumber: 9, department: 'Nephrology', status: 'occupied', acuity: 'stable', x: 520, y: 50, w: 420, h: 280 },
      { id: 'R-904-WATER', name: 'Reverse Osmosis (RO) Dialysis Water Core', floorNumber: 9, department: 'Water Plant', status: 'empty', acuity: 'none', x: 520, y: 370, w: 420, h: 280 }
    ],
    beds: [
      {
        id: 'B-901-A', room: 'R-901-DIAL', floorNumber: 9, status: 'occupied', acuity: 'stable', patientName: 'Tony Stark',
        patientSafety: {
          mrn: 'MRN-202901', age: 50, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'End-Stage Renal Disease on 4-Hour Hemodialysis Run', triageLevel: 3,
          allergies: ['Vancomycin'], fallRisk: false, npo: false, dnr: false, isolation: 'none', admittedAt: '07:00 AM',
          assignedDoctor: 'Dr. Michael Chen, MD (Nephrology)', assignedNurse: 'Nephrology RN Clark Kent',
          activeApparatus: ['Fresenius 5008 Hemodialysis Machine (BFR 350 mL/min)', 'Left AV Fistula Two-Needle Cannulation'],
          vitals: { bp: '138/84', hr: 76, spo2: 98, temp: 36.7, lastRecorded: '09:00 AM' },
          medicationsSchedule: [{ name: 'Epoetin Alfa 4000 Units SubQ', dose: '4000 U', route: 'SubQ', time: '09:00 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 100, y: 110, rotation: 0
      },
      {
        id: 'B-901-B', room: 'R-901-DIAL', floorNumber: 9, status: 'occupied', acuity: 'stable', patientName: 'Steve Rogers',
        patientSafety: {
          mrn: 'MRN-202902', age: 34, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Post-Renal Biopsy 6-Hour Strict Bedrest', triageLevel: 2,
          allergies: ['NKDA'], fallRisk: true, npo: false, dnr: false, isolation: 'none', admittedAt: '08:00 AM',
          assignedDoctor: 'Dr. Michael Chen, MD', assignedNurse: 'Nephrology RN Clark Kent',
          activeApparatus: ['Pressure Dressing Right Flank', 'Strict Urine Output Urimeter'],
          vitals: { bp: '120/78', hr: 68, spo2: 99, temp: 36.6, lastRecorded: '09:00 AM' },
          medicationsSchedule: [{ name: 'Cefazolin 1g IV', dose: '1 g', route: 'IV', time: '08:00 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 200, y: 110, rotation: 0
      },
      { id: 'B-901-C', room: 'R-901-DIAL', floorNumber: 9, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 300, y: 110, rotation: 0 },
      { id: 'B-901-D', room: 'R-901-DIAL', floorNumber: 9, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 400, y: 110, rotation: 0 },
      {
        id: 'B-902-A', room: 'R-902-PERI', floorNumber: 9, status: 'occupied', acuity: 'stable', patientName: 'Natasha Romanoff',
        patientSafety: {
          mrn: 'MRN-202903', age: 39, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Automated Peritoneal Dialysis Cycler Training', triageLevel: 3,
          allergies: ['Latex'], fallRisk: false, npo: false, dnr: false, isolation: 'none', admittedAt: '08:15 AM',
          assignedDoctor: 'Dr. Michael Chen, MD', assignedNurse: 'PD Nurse Diana Prince',
          activeApparatus: ['Baxter HomeChoice APD Cycler', 'Tenckhoff Catheter Sterile Dressing'],
          vitals: { bp: '124/82', hr: 72, spo2: 99, temp: 36.8, lastRecorded: '08:15 AM' },
          medicationsSchedule: [{ name: 'Nutrineal 1.1% PD Solution', dose: '2000 mL', route: 'IP', time: '08:00 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 140, y: 430, rotation: 0
      },
      { id: 'B-902-B', room: 'R-902-PERI', floorNumber: 9, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 280, y: 430, rotation: 0 },
      {
        id: 'B-903-A', room: 'R-903-NEPHRO', floorNumber: 9, status: 'occupied', acuity: 'stable', patientName: 'Clint Barton',
        patientSafety: {
          mrn: 'MRN-202904', age: 46, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Living Donor Kidney Transplant Pre-Workup', triageLevel: 3,
          allergies: ['Penicillin'], fallRisk: false, npo: false, dnr: false, isolation: 'none', admittedAt: '07:30 AM',
          assignedDoctor: 'Dr. Michael Chen, MD', assignedNurse: 'RN Clark Kent',
          activeApparatus: ['IV Saline Lock'],
          vitals: { bp: '126/80', hr: 74, spo2: 98, temp: 36.9, lastRecorded: '07:30 AM' }
        },
        equipment: ['telemetry'], x: 600, y: 110, rotation: 0
      },
      { id: 'B-903-B', room: 'R-903-NEPHRO', floorNumber: 9, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 740, y: 110, rotation: 0 }
    ],
    tags: [
      { id: 'TAG-9-HD-NS', floorNumber: 9, x: 480, y: 350, text: 'HEMODIALYSIS MONITORING HUB 🩺', color: '#0284C7', iconType: 'nurse-station' },
      { id: 'TAG-9-RO-ALARM', floorNumber: 9, x: 730, y: 350, text: 'RO WATER PURITY SENSOR 💧', color: '#0284C7', iconType: 'pharmacy' },
      { id: 'TAG-9-STAIR', floorNumber: 9, x: 250, y: 350, text: 'RENAL EMERGENCY EGRESS 🚪', color: '#16A34A', iconType: 'emergency-stair' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 10: PEDIATRICS & NEONATAL ICU (L10-PEDS)
  // --------------------------------------------------------------------------
  10: {
    rooms: [
      { id: 'R-1001-NICU', name: 'Neonatal Intensive Care Pod 1001', floorNumber: 10, department: 'NICU', status: 'occupied', acuity: 'critical', x: 60, y: 50, w: 380, h: 280 },
      { id: 'R-1002-PEDS', name: 'Pediatric Inpatient Care Suite 1002', floorNumber: 10, department: 'Pediatrics', status: 'occupied', acuity: 'stable', x: 60, y: 370, w: 380, h: 280 },
      { id: 'R-1003-PLAY', name: 'Child Life Play Therapy & Family Lounge 1003', floorNumber: 10, department: 'Child Life', status: 'empty', acuity: 'none', x: 520, y: 50, w: 420, h: 280 },
      { id: 'R-1004-MILK', name: 'Human Milk Prep & Infant Nutrition Core 1004', floorNumber: 10, department: 'Nutrition', status: 'empty', acuity: 'none', x: 520, y: 370, w: 420, h: 280 }
    ],
    beds: [
      {
        id: 'B-NICU-1', room: 'R-1001-NICU', floorNumber: 10, status: 'occupied', acuity: 'critical', patientName: 'Baby Boy Miller (28-Week Preemie)',
        patientSafety: {
          mrn: 'MRN-203001', age: 0, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Extreme Prematurity & Neonatal Respiratory Distress on CPAP', triageLevel: 1,
          allergies: ['NKDA'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: 'Yesterday',
          assignedDoctor: 'Dr. Leonard McCoy, MD (Neonatologist)', assignedNurse: 'NICU RN Christine Chapel',
          activeApparatus: ['Dräger Isolette C2000 Closed Incubator', 'Infant Bubble CPAP (PEEP +6)', 'UVC / UAC Central Umbilical Lines'],
          vitals: { bp: '58/34', hr: 156, spo2: 95, temp: 36.8, lastRecorded: '09:00 AM' },
          medicationsSchedule: [{ name: 'Caffeine Citrate 10mg IV', dose: '10 mg', route: 'IV', time: '09:00 AM', status: 'given' }]
        },
        equipment: ['ventilator', 'telemetry', 'o2'], x: 140, y: 110, rotation: 0
      },
      {
        id: 'B-NICU-2', room: 'R-1001-NICU', floorNumber: 10, status: 'occupied', acuity: 'critical', patientName: 'Baby Girl Davis',
        patientSafety: {
          mrn: 'MRN-203002', age: 0, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Neonatal Hyperbilirubinemia on Double Phototherapy', triageLevel: 2,
          allergies: ['NKDA'], fallRisk: false, npo: false, dnr: false, isolation: 'none', admittedAt: '06:00 AM',
          assignedDoctor: 'Dr. Leonard McCoy, MD', assignedNurse: 'NICU RN Christine Chapel',
          activeApparatus: ['GE BiliSoft LED Phototherapy Blanket', 'Continuous Neonatal Cardiorespiratory Lead'],
          vitals: { bp: '62/38', hr: 144, spo2: 98, temp: 36.9, lastRecorded: '09:10 AM' }
        },
        equipment: ['telemetry'], x: 280, y: 110, rotation: 0
      },
      {
        id: 'B-PEDS-1', room: 'R-1002-PEDS', floorNumber: 10, status: 'occupied', acuity: 'stable', patientName: 'Lucas Scott',
        patientSafety: {
          mrn: 'MRN-203003', age: 7, gender: 'Male', photoUrl: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Acute Pediatric Asthma Exacerbation on DuoNeb', triageLevel: 3,
          allergies: ['Peanuts'], fallRisk: true, npo: false, dnr: false, isolation: 'none', admittedAt: '07:45 AM',
          assignedDoctor: 'Dr. Leonard McCoy, MD', assignedNurse: 'Peds RN Amy Pond',
          activeApparatus: ['Pediatric Pulse Ox SpO2 Finger Probe', 'Saline Lock Left Hand'],
          vitals: { bp: '102/64', hr: 98, spo2: 96, temp: 37.4, lastRecorded: '08:30 AM' },
          medicationsSchedule: [{ name: 'Albuterol/Ipratropium Neb', dose: '2.5 mg', route: 'Neb', time: '09:00 AM', status: 'given' }]
        },
        equipment: ['telemetry', 'o2'], x: 140, y: 430, rotation: 0
      },
      { id: 'B-PEDS-2', room: 'R-1002-PEDS', floorNumber: 10, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 280, y: 430, rotation: 0 }
    ],
    tags: [
      { id: 'TAG-10-NICU-NS', floorNumber: 10, x: 480, y: 350, text: 'NEONATAL CENTRAL TELEMETRY 🍼', color: '#0284C7', iconType: 'nurse-station' },
      { id: 'TAG-10-MILK', floorNumber: 10, x: 730, y: 350, text: 'PASTEURIZED MILK STORAGE LAB 🥛', color: '#0284C7', iconType: 'pharmacy' },
      { id: 'TAG-10-SAFE', floorNumber: 10, x: 250, y: 350, text: 'PEDIATRIC SAFETY AIRLOCK 🧸', color: '#16A34A', iconType: 'emergency-stair' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 11: MATERNITY & LABOR/DELIVERY (LDRP) (L11-OB)
  // --------------------------------------------------------------------------
  11: {
    rooms: [
      { id: 'R-1101-LDRP', name: 'Labor, Delivery & Recovery Suite 1101', floorNumber: 11, department: 'LDRP', status: 'occupied', acuity: 'stable', x: 60, y: 50, w: 380, h: 280 },
      { id: 'R-1102-LDRP', name: 'Labor, Delivery & Recovery Suite 1102', floorNumber: 11, department: 'LDRP', status: 'occupied', acuity: 'stable', x: 60, y: 370, w: 380, h: 280 },
      { id: 'R-1103-CSEC', name: 'Emergency Obstetric C-Section OR 1103', floorNumber: 11, department: 'Obstetrics', status: 'empty', acuity: 'none', x: 520, y: 50, w: 420, h: 280 },
      { id: 'R-1104-NURS', name: 'Newborn Nursery & Resuscitation Core', floorNumber: 11, department: 'Nursery', status: 'occupied', acuity: 'stable', x: 520, y: 370, w: 420, h: 280 }
    ],
    beds: [
      {
        id: 'B-LDRP-1101', room: 'R-1101-LDRP', floorNumber: 11, status: 'occupied', acuity: 'stable', patientName: 'Sarah Connor',
        patientSafety: {
          mrn: 'MRN-203101', age: 31, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Active Labor: 6cm Dilated with Epidural Anesthesia', triageLevel: 2,
          allergies: ['Penicillin'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: '05:30 AM',
          assignedDoctor: 'Dr. Beverly Crusher, MD (OB/GYN)', assignedNurse: 'Labor RN Donna Noble',
          activeApparatus: ['Continuous Electronic Fetal Heart Rate Monitor (FHR 142 bpm)', 'Lumbar Epidural Infusion (Bupivacaine/Fentanyl)', 'IV Pitocin Infusion @ 6 mU/min'],
          vitals: { bp: '118/74', hr: 82, spo2: 99, temp: 37.1, lastRecorded: '09:00 AM' }
        },
        equipment: ['telemetry', 'o2'], x: 180, y: 150, rotation: 0
      },
      {
        id: 'B-LDRP-1102', room: 'R-1102-LDRP', floorNumber: 11, status: 'occupied', acuity: 'stable', patientName: 'Emily Blunt',
        patientSafety: {
          mrn: 'MRN-203102', age: 36, gender: 'Female', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', chiefComplaint: 'Postpartum Day 1 (Uncomplicated Vaginal Delivery)', triageLevel: 3,
          allergies: ['Sulfa'], fallRisk: false, npo: false, dnr: false, isolation: 'none', admittedAt: 'Yesterday',
          assignedDoctor: 'Dr. Beverly Crusher, MD', assignedNurse: 'OB RN Donna Noble',
          activeApparatus: ['Rooming-In Infant Bassinet'],
          vitals: { bp: '116/72', hr: 68, spo2: 98, temp: 36.9, lastRecorded: '08:30 AM' },
          medicationsSchedule: [{ name: 'Ibuprofen 600mg PO q6h', dose: '600 mg', route: 'Oral', time: '08:30 AM', status: 'given' }]
        },
        equipment: ['telemetry'], x: 180, y: 450, rotation: 0
      },
      { id: 'B-OB-OR-1', room: 'R-1103-CSEC', floorNumber: 11, status: 'empty', acuity: 'none', equipment: ['ventilator', 'telemetry', 'o2'], x: 700, y: 150, rotation: 0 },
      { id: 'B-BASS-1', room: 'R-1104-NURS', floorNumber: 11, status: 'occupied', acuity: 'stable', patientName: 'Infant Connor', equipment: ['telemetry'], x: 600, y: 430, rotation: 0 },
      { id: 'B-BASS-2', room: 'R-1104-NURS', floorNumber: 11, status: 'occupied', acuity: 'stable', patientName: 'Infant Blunt', equipment: ['telemetry'], x: 700, y: 430, rotation: 0 },
      { id: 'B-BASS-3', room: 'R-1104-NURS', floorNumber: 11, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 800, y: 430, rotation: 0 }
    ],
    tags: [
      { id: 'TAG-11-LDRP', floorNumber: 11, x: 480, y: 350, text: 'FETAL TELEMETRY COMMAND HUB 👶', color: '#F43F5E', iconType: 'nurse-station' },
      { id: 'TAG-11-WARMER', floorNumber: 11, x: 250, y: 350, text: 'PANDA INFANT RESUSCITATION WARMER 🌟', color: '#EC4899', iconType: 'emergency-stair' },
      { id: 'TAG-11-OR-EXIT', floorNumber: 11, x: 730, y: 350, text: 'OBSTETRIC OR RAPID AIRLOCK 🚪', color: '#16A34A', iconType: 'fire-exit' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL 18: ROOFDECK HELIPAD & AIR AMBULANCE TRAUMA CHUTE (L18-HELI)
  // --------------------------------------------------------------------------
  18: {
    rooms: [
      { id: 'R-1801-PAD', name: 'Flight Landing Zone & Helipad Touchdown Pad', floorNumber: 18, department: 'Aviation', status: 'occupied', acuity: 'critical', x: 60, y: 45, w: 880, h: 350 },
      { id: 'R-1802-CREW', name: 'Air Medical Flight Crew Ready Room & Pilot Ops', floorNumber: 18, department: 'Aviation Ops', status: 'occupied', acuity: 'stable', x: 60, y: 430, w: 410, h: 220 },
      { id: 'R-1803-TRAUMA', name: 'Roofdeck STAT Trauma Chute & Express Elevator to OR/ER', floorNumber: 18, department: 'STAT Core', status: 'occupied', acuity: 'critical', x: 530, y: 430, w: 410, h: 220 }
    ],
    beds: [
      {
        id: 'HELI-PAD-1801', room: 'R-1801-PAD', floorNumber: 18, status: 'occupied', acuity: 'critical', patientName: 'LifeFlight 1 Air Ambulance (EC-145 Touchdown)',
        patientSafety: {
          mrn: 'MRN-FLIGHT-01', age: 0, gender: 'Other', chiefComplaint: 'Inbound In-Flight Polytrauma Extrication from Highway 101', triageLevel: 1,
          allergies: ['NKDA'], fallRisk: false, npo: true, dnr: false, isolation: 'none', admittedAt: '09:00 AM',
          assignedDoctor: 'Flight Physician Dr. Jack Shephard, MD', assignedNurse: 'Flight Paramedic John Locke',
          activeApparatus: ['Aviation Oxygen System (3000 PSI)', 'Hamilton T1 Transport Ventilator', 'ZOLL X-Series Defibrillator/Pacer'],
          vitals: { bp: '90/54', hr: 132, spo2: 91, temp: 35.8, lastRecorded: '09:12 AM' },
          medicationsSchedule: [{ name: 'TXA 1g IV Push in Flight', dose: '1 g', route: 'IV', time: '09:05 AM', status: 'given' }]
        },
        equipment: ['ventilator', 'telemetry', 'o2'], x: 440, y: 180, rotation: 0
      },
      {
        id: 'B-HELI-1', room: 'R-1803-TRAUMA', floorNumber: 18, status: 'occupied', acuity: 'critical', patientName: 'Rapid Gurney 1 (Direct to Trauma OR 1)',
        patientSafety: {
          mrn: 'MRN-STAT-01', age: 28, gender: 'Male', chiefComplaint: 'Penetrating Torso Trauma ETA 3 Minutes', triageLevel: 1,
          allergies: ['NKDA'], fallRisk: true, npo: true, dnr: false, isolation: 'none', admittedAt: 'STAT',
          assignedDoctor: 'Trauma Team Alpha', assignedNurse: 'STAT RN Kate Austen',
          activeApparatus: ['Level 1 Rapid Blood Infuser Primed with 4 Units O-Neg PRBC'],
          vitals: { bp: '82/48', hr: 140, spo2: 89, temp: 35.5, lastRecorded: 'In Flight' }
        },
        equipment: ['ventilator', 'telemetry', 'o2'], x: 610, y: 520, rotation: 0
      },
      { id: 'B-HELI-2', room: 'R-1803-TRAUMA', floorNumber: 18, status: 'empty', acuity: 'none', equipment: ['telemetry', 'o2'], x: 770, y: 520, rotation: 0 }
    ],
    tags: [
      { id: 'TAG-18-WIND', floorNumber: 18, x: 500, y: 32, text: 'HELIPAD WIND CONE & APPROACH LIGHTS 🚁', color: '#F59E0B', iconType: 'helipad' },
      { id: 'TAG-18-CHUTE', floorNumber: 18, x: 735, y: 415, text: 'STAT EXPRESS ELEVATOR DIRECT TO OR 🚨', color: '#DC2626', iconType: 'fire-exit' },
      { id: 'TAG-18-RADIO', floorNumber: 18, x: 265, y: 415, text: 'AVIATION VHF RADIO AIR-GROUND BASE 📻', color: '#0284C7', iconType: 'nurse-station' },
      { id: 'TAG-18-STAIR', floorNumber: 18, x: 500, y: 415, text: 'FLIGHT DECK ACCESS STAIRS 🚪', color: '#16A34A', iconType: 'emergency-stair' }
    ]
  }
};

export function getFloorBlueprint(floorNumber: number): FloorBlueprintConfig {
  if (HOSPITAL_FLOOR_BLUEPRINTS[floorNumber]) {
    return HOSPITAL_FLOOR_BLUEPRINTS[floorNumber];
  }

  // Fallback for typical inpatient med-surg floors (Levels 4-8, 12-17)
  const baseFloor = floorNumber;
  return {
    rooms: [
      { id: `R-${baseFloor}01-SUITE`, name: `Inpatient Acute Care Suite ${baseFloor}01`, floorNumber: baseFloor, department: 'Med-Surg', status: 'occupied', acuity: 'stable', x: 60, y: 50, w: 380, h: 280 },
      { id: `R-${baseFloor}02-STEP`, name: `Step-Down Telemetry Ward ${baseFloor}02`, floorNumber: baseFloor, department: 'Step-Down', status: 'occupied', acuity: 'stable', x: 60, y: 370, w: 380, h: 280 },
      { id: `R-${baseFloor}03-ACUTE`, name: `Acute 4-Bed Ward ${baseFloor}03`, floorNumber: baseFloor, department: 'Med-Surg', status: 'occupied', acuity: 'stable', x: 520, y: 50, w: 420, h: 280 },
      { id: `R-${baseFloor}04-ISO`, name: `Airborne Infection Isolation ${baseFloor}04`, floorNumber: baseFloor, department: 'Isolation', status: 'occupied', acuity: 'critical', x: 520, y: 370, w: 420, h: 280 }
    ],
    beds: [
      {
        id: `B-${baseFloor}01-A`, room: `R-${baseFloor}01-SUITE`, floorNumber: baseFloor, status: 'occupied', acuity: 'stable', patientName: `Patient ${baseFloor}01-A`,
        patientSafety: {
          mrn: `MRN-${baseFloor}001`, age: 55, gender: 'Male', chiefComplaint: 'Post-Op Inpatient Telemetry Observation', triageLevel: 3,
          allergies: ['NKDA'], fallRisk: true, npo: false, dnr: false, isolation: 'none', admittedAt: '08:00 AM',
          vitals: { bp: '124/80', hr: 74, spo2: 98, temp: 36.9, lastRecorded: '08:00 AM' }
        },
        equipment: ['telemetry'], x: 140, y: 110, rotation: 0
      },
      { id: `B-${baseFloor}01-B`, room: `R-${baseFloor}01-SUITE`, floorNumber: baseFloor, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 260, y: 110, rotation: 0 },
      {
        id: `B-${baseFloor}02-A`, room: `R-${baseFloor}02-STEP`, floorNumber: baseFloor, status: 'occupied', acuity: 'stable', patientName: `Patient ${baseFloor}02-A`,
        patientSafety: {
          mrn: `MRN-${baseFloor}002`, age: 62, gender: 'Female', chiefComplaint: 'Internal Medicine Observation', triageLevel: 3,
          allergies: ['Penicillin'], fallRisk: false, npo: false, dnr: false, isolation: 'none', admittedAt: '08:30 AM',
          vitals: { bp: '130/84', hr: 78, spo2: 97, temp: 37.0, lastRecorded: '08:30 AM' }
        },
        equipment: ['telemetry'], x: 140, y: 430, rotation: 0
      },
      { id: `B-${baseFloor}02-B`, room: `R-${baseFloor}02-STEP`, floorNumber: baseFloor, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 260, y: 430, rotation: 0 },
      {
        id: `B-${baseFloor}03-A`, room: `R-${baseFloor}03-ACUTE`, floorNumber: baseFloor, status: 'occupied', acuity: 'stable', patientName: `Patient ${baseFloor}03-A`,
        patientSafety: {
          mrn: `MRN-${baseFloor}003`, age: 48, gender: 'Male', chiefComplaint: 'Acute Surgical Recovery', triageLevel: 2,
          allergies: ['Sulfa'], fallRisk: true, npo: false, dnr: false, isolation: 'none', admittedAt: '07:45 AM',
          vitals: { bp: '122/76', hr: 72, spo2: 99, temp: 36.8, lastRecorded: '07:45 AM' }
        },
        equipment: ['telemetry'], x: 570, y: 110, rotation: 0
      },
      { id: `B-${baseFloor}03-B`, room: `R-${baseFloor}03-ACUTE`, floorNumber: baseFloor, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 670, y: 110, rotation: 0 },
      { id: `B-${baseFloor}03-C`, room: `R-${baseFloor}03-ACUTE`, floorNumber: baseFloor, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 770, y: 110, rotation: 0 },
      { id: `B-${baseFloor}03-D`, room: `R-${baseFloor}03-ACUTE`, floorNumber: baseFloor, status: 'empty', acuity: 'none', equipment: ['telemetry'], x: 870, y: 110, rotation: 0 },
      {
        id: `B-${baseFloor}04-ISO`, room: `R-${baseFloor}04-ISO`, floorNumber: baseFloor, status: 'occupied', acuity: 'critical', patientName: `Patient ${baseFloor}04-ISO`,
        patientSafety: {
          mrn: `MRN-${baseFloor}004`, age: 67, gender: 'Female', chiefComplaint: 'Negative Pressure AIIR Isolation Care', triageLevel: 1,
          allergies: ['Latex'], fallRisk: true, npo: false, dnr: false, isolation: 'airborne', admittedAt: '08:15 AM',
          vitals: { bp: '140/88', hr: 96, spo2: 94, temp: 38.3, lastRecorded: '08:15 AM' }
        },
        equipment: ['telemetry', 'negative-pressure', 'o2'], x: 720, y: 470, rotation: 0
      }
    ],
    tags: [
      { id: `TAG-${baseFloor}-EXIT`, floorNumber: baseFloor, x: 480, y: 32, text: `LEVEL ${baseFloor} FIRE EXIT 🚨`, color: '#DC2626', iconType: 'fire-exit' },
      { id: `TAG-${baseFloor}-NS`, floorNumber: baseFloor, x: 480, y: 350, text: `NURSE STATION ${baseFloor} 🩺`, color: '#0284C7', iconType: 'nurse-station' },
      { id: `TAG-${baseFloor}-STAIRW`, floorNumber: baseFloor, x: 250, y: 350, text: 'WEST STAIR CORE 🚪', color: '#16A34A', iconType: 'emergency-stair' },
      { id: `TAG-${baseFloor}-STAIRE`, floorNumber: baseFloor, x: 730, y: 350, text: 'EAST STAIR CORE 🚪', color: '#16A34A', iconType: 'emergency-stair' }
    ]
  };
}
