import Dexie, { type Table } from 'dexie';

export interface PatientVitals {
  bp: string;
  hr: number;
  spo2: number;
  temp: number;
  lastRecorded: string;
}

export interface MedicationOrder {
  name: string;
  dose: string;
  route: string;
  time: string;
  status: 'given' | 'due' | 'scheduled';
}

export interface PatientSafetyInfo {
  mrn: string;
  age: number;
  gender?: 'Male' | 'Female' | 'Other';
  photoUrl?: string; // Real patient portrait data URL or photo path
  chiefComplaint: string;
  triageLevel: 1 | 2 | 3 | 4 | 5; // 1 = Resuscitation, 5 = Non-urgent
  allergies?: string[];
  fallRisk: boolean;
  npo: boolean;
  dnr: boolean;
  isolation: 'none' | 'contact' | 'airborne' | 'droplet' | 'cdiff';
  assignedDoctor?: string;
  assignedNurse?: string;
  admittedAt: string;
  pendingDischarge?: boolean;
  vitals?: PatientVitals;
  activeApparatus?: string[]; // e.g. ['IV Infusion Pump (Normal Saline 100mL/hr)', 'Nasal Cannula 4L O2', 'Cardiac Telemetry Lead II']
  pendingDoctorOrders?: string[]; // e.g. ['Pending 12-Lead ECG', 'Stat Troponin-I Lab', 'Portable Chest X-Ray']
  bloodTransfusionStatus?: 'scheduled' | 'crossmatching' | 'transfusing' | 'none'; // e.g. 2 Units PRBC
  bloodDrawScheduled?: string; // e.g. 'Stat CBC / Troponin-I'
  apparatusRequested?: string; // e.g. '12-Lead ECG & High-Flow O2'
  medicationsSchedule?: MedicationOrder[];
  nursingShiftNotes?: string;
}

export interface BedData {
  id: string;
  room: string;
  floorNumber?: number; // 1 to 18
  status: 'occupied' | 'empty' | 'cleaning';
  acuity: 'critical' | 'stable' | 'none';
  patientName?: string;
  patientSafety?: PatientSafetyInfo;
  equipment?: string[]; // e.g., ['telemetry', 'ventilator', 'negative-pressure', 'o2']
  evsStatus?: 'pending' | 'in-progress' | 'completed';
  tat?: number;
  x: number;
  y: number;
  rotation: number;
  version?: number; // Optimistic Concurrency Control (OCC)
  updatedAt?: string;
}

export interface EVSTask {
  id: string;
  room: string;
  bedId?: string;
  floorNumber?: number;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in-progress' | 'completed';
  isolationType: 'none' | 'contact' | 'airborne' | 'droplet' | 'cdiff';
  previousPatientMRN?: string;
  dischargeReason?: string;
  ppeRequired: string[];
  chemicalProtocol: string;
  assignedTo?: string;
  requestTime: string;
  startedAt?: string;
  elapsedMinutes?: number;
  cleaningDurationSeconds?: number;
}

export interface SecurityAlert {
  id: string;
  type: 'critical' | 'warn' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location: string;
  floorNumber?: number;
  acknowledged: boolean;
  acknowledgedBy?: string;
  codeBlueTimerSeconds?: number;
}

export interface RoomData {
  id: string;
  name: string;
  floorNumber?: number; // 1 to 18
  department?: 'ICU' | 'Emergency' | 'Med-Surg' | 'Isolation' | 'Pediatrics' | 'Surgical' | 'Oncology' | 'Helipad' | 'Surgery' | 'PACU' | 'Pre-Op' | 'CCU' | 'SICU' | 'Neuro-ICU' | 'Nephrology' | 'Peritoneal' | 'Water Plant' | 'NICU' | 'Child Life' | 'Nutrition' | 'LDRP' | 'Obstetrics' | 'Nursery' | 'Aviation' | 'Aviation Ops' | 'STAT Core' | 'Step-Down' | string;
  status: 'occupied' | 'empty' | 'cleaning' | 'maintenance';
  acuity: 'critical' | 'stable' | 'none';
  patientName?: string;
  assignedNurse?: string;
  negativePressure?: boolean;
  isVerticalCore?: boolean; // marks elevator banks and fire stairwells
  x: number;
  y: number;
  w: number;
  h: number;
  width?: number;
  height?: number;
  doorPosition?: 'top' | 'bottom' | 'left' | 'right' | string;
}

export interface WallData {
  id: string;
  floorNumber?: number;
  isVerticalCore?: boolean;
  x: number;
  y: number;
  length: number;
  rotation: number;
  thickness: number;
  isDoorway?: boolean;
}

export interface FloorTagData {
  id: string;
  floorNumber?: number;
  isVerticalCore?: boolean;
  x: number;
  y: number;
  text: string;
  color?: string;
  fontSize?: number;
  iconType?: 'nurse-station' | 'restroom' | 'elevator' | 'fire-exit' | 'pharmacy' | 'text' | 'helipad' | 'emergency-stair';
}

export interface FloorZoneData {
  id: string;
  floorNumber?: number;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

export interface FloorMetadata {
  number: number;
  name: string;
  department: string;
  shortCode: string;
  badge?: string;
  color?: string;
  description?: string;
  isTypical?: boolean;
}

export const DEFAULT_HOSPITAL_FLOORS: FloorMetadata[] = [
  { number: 1, name: 'Level 1: Ground Floor', department: 'Emergency & Trauma Resuscitation', shortCode: 'L1-ER', badge: 'Emergency', color: 'rose' },
  { number: 2, name: 'Level 2: Surgical Suites', department: 'Operating Theaters & PACU', shortCode: 'L2-OR', badge: 'Sterile', color: 'cyan' },
  { number: 3, name: 'Level 3: Critical Care Unit', department: 'Cardiac & Intensive Care (ICU/CCU)', shortCode: 'L3-ICU', badge: 'Critical', color: 'amber' },
  { number: 4, name: 'Level 4: Inpatient Med-Surg', department: 'General Surgery & Acute Inpatient', shortCode: 'L4-MS', isTypical: true, color: 'blue' },
  { number: 5, name: 'Level 5: Inpatient Med-Surg', department: 'Internal Medicine & Step-Down', shortCode: 'L5-MS', isTypical: true, color: 'blue' },
  { number: 6, name: 'Level 6: Orthopedics & Rehab', department: 'Musculoskeletal & Joint Center', shortCode: 'L6-ORTHO', isTypical: true, color: 'blue' },
  { number: 7, name: 'Level 7: Neurology & Stroke', department: 'Comprehensive Stroke & Spine Center', shortCode: 'L7-NEURO', isTypical: true, color: 'purple' },
  { number: 8, name: 'Level 8: Pulmonary & Respiratory', department: 'Pulmonary Care & Sleep Lab', shortCode: 'L8-PULM', isTypical: true, color: 'blue' },
  { number: 9, name: 'Level 9: Renal & Dialysis Unit', department: 'Nephrology & Acute Hemodialysis', shortCode: 'L9-RENAL', isTypical: true, color: 'blue' },
  { number: 10, name: 'Level 10: Pediatrics & NICU', department: 'Neonatal & Pediatric Intensive Care', shortCode: 'L10-PEDS', isTypical: true, color: 'emerald' },
  { number: 11, name: 'Level 11: Maternity & Delivery', department: 'Obstetrics, Labor & Delivery Suites', shortCode: 'L11-OB', isTypical: true, color: 'pink' },
  { number: 12, name: 'Level 12: Gastroenterology', department: 'Endoscopy & Advanced GI Suite', shortCode: 'L12-GI', isTypical: true, color: 'blue' },
  { number: 13, name: 'Level 13: Cardiology & Telemetry', department: 'Non-Invasive Cardiac Telemetry', shortCode: 'L13-CARD', isTypical: true, color: 'rose' },
  { number: 14, name: 'Level 14: Infectious Disease', department: 'Airborne Infection Isolation Unit', shortCode: 'L14-ISO', isTypical: true, color: 'amber' },
  { number: 15, name: 'Level 15: Geriatric & Palliative', department: 'Complex Care & Senior Health', shortCode: 'L15-GERI', isTypical: true, color: 'blue' },
  { number: 16, name: 'Level 16: Oncology & Infusion', department: 'Bone Marrow Transplant & Oncology', shortCode: 'L16-ONCO', color: 'indigo' },
  { number: 17, name: 'Level 17: Executive & Lab Center', department: 'Hospital Administration & Central Labs', shortCode: 'L17-EXEC', color: 'slate' },
  { number: 18, name: 'Level 18: Roofdeck Helipad', department: 'Air Ambulance & Trauma Chute', shortCode: 'L18-HELI', badge: 'STAT Aviation', color: 'amber' },
];

export interface TransfusionRecord {
  id: string;
  bedId: string;
  mrn: string;
  patientName: string;
  bloodUnitNumber: string;
  bloodProduct: string; // e.g. '2 Units PRBC'
  bloodGroup: string; // e.g. 'O-Positive'
  crossmatchVerified: boolean;
  nurse1Name: string;
  nurse1Pin: string;
  nurse2Name: string;
  nurse2Pin: string;
  baselineBp: string;
  baselineHr: number;
  baselineTemp: number;
  status: 'verified' | 'transfusing' | 'completed' | 'reaction_stopped';
  startedAt: string;
  completedAt?: string;
}

export interface AclsEventLog {
  id: string;
  eventDate: string;
  arrestTime: string;
  initialRhythm: string;
  shocksDelivered: { time: string; energyJoules: number }[];
  medicationsAdministered: { time: string; medication: string; dose: string }[];
  cprMinutes: number;
  outcome: 'ROSC' | 'Deceased' | 'TransferToCathLab';
  codeLeader: string;
  codeDocumenter: string;
  summaryNotes: string;
}

export interface StaffMember {
  id: string;
  employeeId: string;
  username: string;
  fullName: string;
  role: 'nurse' | 'doctor' | 'admin' | 'evs' | 'respiratory' | 'pharmacy';
  jobTitle: string;
  department: string;
  assignedFloor?: number;
  pin: string;
  avatarInitials: string;
  avatarColor?: string;
  registeredAt: string;
  lastActiveShift?: string;
  phone?: string;
  mobileNumber?: string;
  email?: string;
  age?: number;
  sex?: 'Male' | 'Female' | 'Other';
  homeAddress?: string;
  photoUrl?: string;
  shiftStatus?: 'on-duty' | 'on-call' | 'break' | 'off-duty';
  licenseNumber?: string;
}

export class PristineDatabase extends Dexie {
  beds!: Table<BedData, string>;
  evsTasks!: Table<EVSTask, string>;
  alerts!: Table<SecurityAlert, string>;
  rooms!: Table<RoomData, string>;
  walls!: Table<WallData, string>;
  floorTags!: Table<FloorTagData, string>;
  floorZones!: Table<FloorZoneData, string>;
  transfusions!: Table<TransfusionRecord, string>;
  aclsLogs!: Table<AclsEventLog, string>;
  staff!: Table<StaffMember, string>;

  constructor() {
    super('ClinicalPristineDB_v3');
    this.version(3).stores({
      beds: 'id, status, acuity, room, floorNumber',
      evsTasks: 'id, status, priority, isolationType, floorNumber',
      alerts: 'id, type, acknowledged, floorNumber',
      rooms: 'id, status, acuity, department, floorNumber',
      walls: 'id, floorNumber',
      floorTags: 'id, floorNumber',
      floorZones: 'id, floorNumber',
      transfusions: 'id, bedId, mrn, status',
      aclsLogs: 'id, eventDate, outcome',
      staff: 'id, username, employeeId, role, department, assignedFloor'
    });
  }
}

export const db = new PristineDatabase();

import { getFloorBlueprint } from './utils/floorBlueprints';

export const INITIAL_HOSPITAL_STAFF: StaffMember[] = [
  {
    id: 'staff-001',
    employeeId: 'EMP-98214',
    username: 'nurse_sarah',
    fullName: 'Sarah Vance, BSN, RN',
    role: 'nurse',
    jobTitle: 'Charge Nurse & Resuscitation Lead',
    department: 'Emergency & Trauma Resuscitation',
    assignedFloor: 1,
    pin: '123',
    avatarInitials: 'SV',
    avatarColor: 'from-blue-600 to-indigo-700',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'Day Shift (07:00 - 19:00)',
    email: 'sarah.vance@pristine-hospital.org',
    phone: '+1 (555) 234-5678',
    mobileNumber: '+1 (555) 234-5678',
    age: 34,
    sex: 'Female',
    homeAddress: '742 Evergreen Terrace, Medical District, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1594824813590-78965a14bc77?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'on-duty',
    licenseNumber: 'RN-8492019-MA'
  },
  {
    id: 'staff-002',
    employeeId: 'EMP-98215',
    username: 'nurse_elena',
    fullName: 'Elena Rostova, RN, CCRN',
    role: 'nurse',
    jobTitle: 'Critical Care Staff Nurse II',
    department: 'Emergency & Trauma Resuscitation',
    assignedFloor: 1,
    pin: '123',
    avatarInitials: 'ER',
    avatarColor: 'from-emerald-600 to-teal-700',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'Night Shift (19:00 - 07:00)',
    email: 'elena.rostova@pristine-hospital.org',
    phone: '+1 (555) 345-6789',
    mobileNumber: '+1 (555) 345-6789',
    age: 29,
    sex: 'Female',
    homeAddress: '128 Marlborough St, Back Bay, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'on-duty',
    licenseNumber: 'RN-9102844-MA'
  },
  {
    id: 'staff-003',
    employeeId: 'EMP-77102',
    username: 'dr_santos',
    fullName: 'Dr. Angela Santos, MD, FACS',
    role: 'doctor',
    jobTitle: 'Attending Trauma Surgeon',
    department: 'Surgical & Trauma Core',
    assignedFloor: 1,
    pin: '123',
    avatarInitials: 'AS',
    avatarColor: 'from-purple-600 to-pink-700',
    registeredAt: new Date().toISOString(),
    lastActiveShift: '24-Hour STAT On-Call',
    email: 'angela.santos@pristine-hospital.org',
    phone: '+1 (555) 456-7890',
    mobileNumber: '+1 (555) 456-7890',
    age: 43,
    sex: 'Female',
    homeAddress: '55 Beacon St, Beacon Hill, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'on-duty',
    licenseNumber: 'MD-7491023-MA'
  },
  {
    id: 'staff-004',
    employeeId: 'EMP-66014',
    username: 'dr_chen',
    fullName: 'Dr. Alexander Chen, MD',
    role: 'doctor',
    jobTitle: 'Attending Intensivist & Pulmonologist',
    department: 'Cardiac & Intensive Care (ICU/CCU)',
    assignedFloor: 3,
    pin: '123',
    avatarInitials: 'AC',
    avatarColor: 'from-amber-600 to-orange-700',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'ICU Critical Care Lead',
    email: 'alexander.chen@pristine-hospital.org',
    phone: '+1 (555) 567-8901',
    mobileNumber: '+1 (555) 567-8901',
    age: 48,
    sex: 'Male',
    homeAddress: '88 Commonwealth Ave, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'on-call',
    licenseNumber: 'MD-6601928-MA'
  },
  {
    id: 'staff-005',
    employeeId: 'EMP-50119',
    username: 'maria_clean',
    fullName: 'Maria Santos-Cruz',
    role: 'evs',
    jobTitle: 'Lead Biohazard & UV-C Disinfection Specialist',
    department: 'Environmental Services (EVS)',
    assignedFloor: 1,
    pin: '123',
    avatarInitials: 'MS',
    avatarColor: 'from-emerald-600 to-green-700',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'Terminal Disinfection Lead',
    email: 'maria.santos@pristine-hospital.org',
    phone: '+1 (555) 678-9012',
    mobileNumber: '+1 (555) 678-9012',
    age: 39,
    sex: 'Female',
    homeAddress: '240 Tremont St, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'on-duty',
    licenseNumber: 'EVS-CERT-8841'
  },
  {
    id: 'staff-006',
    employeeId: 'EMP-40192',
    username: 'pharm_rachel',
    fullName: 'Dr. Rachel Kim, PharmD, BCPS',
    role: 'pharmacy',
    jobTitle: 'Clinical Pharmacy Specialist (ICU/ER)',
    department: 'Central Hospital Pharmacy',
    assignedFloor: 17,
    pin: '123',
    avatarInitials: 'RK',
    avatarColor: 'from-amber-600 to-yellow-700',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'Stat Verification & Dosing',
    email: 'rachel.kim@pristine-hospital.org',
    phone: '+1 (555) 789-0123',
    mobileNumber: '+1 (555) 789-0123',
    age: 36,
    sex: 'Female',
    homeAddress: '15 Newbury St, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'on-duty',
    licenseNumber: 'RPH-4910284-MA'
  },
  {
    id: 'staff-007',
    employeeId: 'EMP-30419',
    username: 'resp_david',
    fullName: 'David Thorne, BSRT, RRT-ACCS',
    role: 'respiratory',
    jobTitle: 'Critical Care Adult & Neonatal Respiratory Therapist',
    department: 'Cardiopulmonary & Respiratory Care',
    assignedFloor: 3,
    pin: '123',
    avatarInitials: 'DT',
    avatarColor: 'from-cyan-600 to-blue-700',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'Ventilator & Airway Management',
    email: 'david.thorne@pristine-hospital.org',
    phone: '+1 (555) 890-1234',
    mobileNumber: '+1 (555) 890-1234',
    age: 35,
    sex: 'Male',
    homeAddress: '31 Huntington Ave, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'break',
    licenseNumber: 'RRT-391029-MA'
  },
  {
    id: 'staff-008',
    employeeId: 'EMP-10001',
    username: 'admin',
    fullName: 'Hospital Ops Admin Lead',
    role: 'admin',
    jobTitle: 'Director of Clinical Operations & Quality',
    department: 'Executive Operations',
    assignedFloor: 17,
    pin: '123',
    avatarInitials: 'AD',
    avatarColor: 'from-slate-700 to-slate-900',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'Command Deck Supervisor',
    email: 'admin.ops@pristine-hospital.org',
    phone: '+1 (555) 901-2345',
    mobileNumber: '+1 (555) 901-2345',
    age: 51,
    sex: 'Male',
    homeAddress: '100 Federal St, Financial District, Boston, MA',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    shiftStatus: 'on-duty',
    licenseNumber: 'FACHE-99214'
  }
];

export async function ensureHospitalDataSeeded() {
  const isProduction = localStorage.getItem('clinical_pristine_production_mode') === 'true';

  const staffCount = await db.staff.count();
  if (staffCount === 0 && !isProduction) {
    await db.staff.bulkPut(INITIAL_HOSPITAL_STAFF);
  }

  // Check for legacy unmigrated rooms or missing 18 floors
  const existingRooms = await db.rooms.toArray();
  const hasLegacyRooms = existingRooms.some(r => 
    ['R-101', 'R-102-N', 'R-105-L', 'R-105-N1', 'R-105-N2', 'R-105-S', 'R-107-N', 'R-108-S', 'R-110-L', 'R-118-S', 'R-119-S', 'R-STEPDOWN'].includes(r.id)
  );

  const totalRooms = existingRooms.length;
  if (totalRooms < 50 || hasLegacyRooms) {
    if (hasLegacyRooms) {
      await db.rooms.clear();
      await db.beds.clear();
      await db.floorTags.clear();
    }

    const allRooms: RoomData[] = [];
    const allBeds: BedData[] = [];
    const allTags: FloorTagData[] = [];

    for (let floor = 1; floor <= 18; floor++) {
      const bp = getFloorBlueprint(floor);
      allRooms.push(...bp.rooms);
      
      if (isProduction) {
        // In production mode, all beds are pristine and vacant (0 demo patients)
        const cleanBeds = bp.beds.map(b => ({
          ...b,
          status: 'empty' as const,
          acuity: 'none' as const,
          patientName: undefined,
          patientSafety: undefined,
          evsStatus: 'completed' as const
        }));
        allBeds.push(...cleanBeds);
      } else {
        allBeds.push(...bp.beds);
      }
      
      allTags.push(...bp.tags);
    }

    const initialEvsTasks: EVSTask[] = isProduction ? [] : [
      {
        id: 'EVS-701',
        room: 'Room 101',
        bedId: 'B-101-A',
        floorNumber: 1,
        priority: 'stat',
        status: 'pending',
        isolationType: 'cdiff',
        previousPatientMRN: 'MRN-994821',
        dischargeReason: 'Discharged — Severe C. Diff Colitis',
        ppeRequired: ['Fluid-Resistant Gown', 'Nitrile Gloves', 'Shoe Covers'],
        chemicalProtocol: 'Sporicidal Sodium Hypochlorite (Bleach) — 4 Min Wet Contact Time (NO ALCOHOL)',
        requestTime: '10:05 AM',
        elapsedMinutes: 4
      },
      {
        id: 'EVS-702',
        room: 'Room 104',
        bedId: 'B-104-ISO',
        floorNumber: 1,
        priority: 'urgent',
        status: 'pending',
        isolationType: 'airborne',
        previousPatientMRN: 'MRN-884120',
        dischargeReason: 'Transferred — COVID-19 / Pneumonia',
        ppeRequired: ['N95 Respirator', 'Eye Shield', 'Gloves', 'Gown'],
        chemicalProtocol: 'UV-C Terminal Disinfection Robot + HEPA Air Purge (20 Min)',
        requestTime: '10:15 AM',
        elapsedMinutes: 12
      },
      {
        id: 'EVS-703',
        room: 'Room 103',
        bedId: 'B-103-C',
        floorNumber: 1,
        priority: 'routine',
        status: 'in-progress',
        isolationType: 'none',
        assignedTo: 'Maria S.',
        previousPatientMRN: 'MRN-773012',
        dischargeReason: 'Routine Medical Discharge',
        ppeRequired: ['Standard Gloves'],
        chemicalProtocol: 'Standard Quaternary Ammonium Hospital Disinfectant Wipes',
        requestTime: '09:30 AM',
        elapsedMinutes: 18
      }
    ];

    const initialAlerts: SecurityAlert[] = isProduction ? [] : [
      { id: 'ALT-991', type: 'critical', title: 'Code Blue Initiated', message: 'Cardiac arrest protocol activated at ICU Bed 104.', timestamp: '10:00 AM', location: 'ICU Bed 104', acknowledged: false },
      { id: 'ALT-992', type: 'warn', title: 'Negative Pressure Threshold Exceeded', message: 'Isolation Room 204 airflow pressure dropped by 18%. Verify HEPA seals.', timestamp: '09:45 AM', location: 'Isolation Ward B', acknowledged: false },
      { id: 'ALT-993', type: 'info', title: 'Telemetry Gateway Online', message: 'Central EHR vital signs telemetry sync nominal (30/30 nodes).', timestamp: '09:15 AM', location: 'Server Core', acknowledged: true },
      { id: 'ALT-994', type: 'warn', title: 'Medication Vault Access Timeout', message: 'Automated Pyxis dispensing door remained open > 60 seconds.', timestamp: '08:50 AM', location: 'Pharmacy Wing', acknowledged: true },
    ];

    await db.rooms.bulkPut(allRooms);
    await db.beds.bulkPut(allBeds);
    await db.floorTags.bulkPut(allTags);
    if (initialEvsTasks.length > 0) await db.evsTasks.bulkPut(initialEvsTasks);
    if (initialAlerts.length > 0) await db.alerts.bulkPut(initialAlerts);
    if (!isProduction) await db.staff.bulkPut(INITIAL_HOSPITAL_STAFF);
  } else if (!isProduction) {
    // If beds already exist and in demo mode, ensure occupied beds without photos get initial photos
    try {
      const existingBeds = await db.beds.toArray();
      for (const bed of existingBeds) {
        if (bed.status === 'occupied' && bed.patientSafety && !bed.patientSafety.photoUrl) {
          const bp = getFloorBlueprint(bed.floorNumber || 1);
          const blueprintBed = bp.beds.find(b => b.id === bed.id);
          if (blueprintBed?.patientSafety?.photoUrl) {
            await db.beds.update(bed.id, {
              patientSafety: {
                ...bed.patientSafety,
                photoUrl: blueprintBed.patientSafety.photoUrl
              }
            });
          }
        }
      }
    } catch (err) {
      console.warn('Silent migration for patient photoUrls:', err);
    }
  }
}

export interface CleanSweepParams {
  hospitalName: string;
  adminName: string;
  adminEmail: string;
  adminPin: string;
  adminLicense?: string;
  adminDepartment?: string;
}

/**
 * 🧹 PRODUCTION CLEAN SWEEP ENGINE
 * Purges 100% of mock patients, dummy EVS queues, demo clinical alerts, and sample staff.
 * Preserves the exact 18-floor CAD vector blueprints with all beds reset to vacant bays.
 * Registers the client's verified Hospital Administrator profile and enables Production Mode.
 */
export async function cleanSweepToProductionState(params: CleanSweepParams) {
  // 1. Purge dynamic operational tables
  await db.evsTasks.clear();
  await db.alerts.clear();
  await db.staff.clear();

  // 2. Sanitize all 18-floor beds to clean, empty state
  const existingBeds = await db.beds.toArray();
  if (existingBeds.length > 0) {
    const cleanBeds = existingBeds.map(bed => ({
      ...bed,
      status: 'empty' as const,
      acuity: 'none' as const,
      patientName: undefined,
      patientSafety: undefined,
      evsStatus: 'completed' as const
    }));
    await db.beds.bulkPut(cleanBeds);
  } else {
    // If no beds, generate clean beds from blueprints
    const allRooms: RoomData[] = [];
    const allBeds: BedData[] = [];
    const allTags: FloorTagData[] = [];
    for (let floor = 1; floor <= 18; floor++) {
      const bp = getFloorBlueprint(floor);
      allRooms.push(...bp.rooms);
      allBeds.push(...bp.beds.map(b => ({
        ...b,
        status: 'empty' as const,
        acuity: 'none' as const,
        patientName: undefined,
        patientSafety: undefined,
        evsStatus: 'completed' as const
      })));
      allTags.push(...bp.tags);
    }
    await db.rooms.bulkPut(allRooms);
    await db.beds.bulkPut(allBeds);
    await db.floorTags.bulkPut(allTags);
  }

  // 3. Register the new Chief Medical Director / Hospital Administrator
  const initials = params.adminName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AD';

  const newAdmin: StaffMember = {
    id: 'STAFF-ADMIN-01',
    employeeId: 'EMP-ADMIN-01',
    username: 'admin',
    fullName: params.adminName,
    jobTitle: 'Chief Medical Officer / Hospital Administrator',
    role: 'admin',
    department: params.adminDepartment || 'Executive Hospital Administration',
    assignedFloor: 17,
    pin: params.adminPin || '1234',
    avatarInitials: initials,
    avatarColor: 'from-blue-700 to-indigo-900',
    registeredAt: new Date().toISOString(),
    lastActiveShift: 'Executive Medical Director',
    email: params.adminEmail || 'admin@hospital.org',
    phone: '+1 (555) 010-0000',
    mobileNumber: '+1 (555) 010-0000',
    age: 48,
    sex: 'Other',
    homeAddress: `${params.hospitalName} Administrative Suite`,
    shiftStatus: 'on-duty',
    licenseNumber: params.adminLicense || 'MED-DIR-001'
  };

  await db.staff.put(newAdmin);

  // 4. Set Production Environment flags
  localStorage.setItem('clinical_pristine_production_mode', 'true');
  localStorage.setItem('clinical_pristine_hospital_name', params.hospitalName);
  localStorage.setItem('clinical_pristine_admin_name', params.adminName);
  localStorage.setItem('clinical_pristine_deploy_date', new Date().toISOString());

  return { success: true };
}

/**
 * 🔄 RESTORE DEMO STATE (For Demonstrations & Training Simulations)
 */
export async function restoreDemoState() {
  localStorage.removeItem('clinical_pristine_production_mode');
  localStorage.removeItem('clinical_pristine_hospital_name');
  localStorage.removeItem('clinical_pristine_admin_name');
  localStorage.removeItem('clinical_pristine_deploy_date');

  await db.rooms.clear();
  await db.beds.clear();
  await db.floorTags.clear();
  await db.evsTasks.clear();
  await db.alerts.clear();
  await db.staff.clear();

  await ensureHospitalDataSeeded();
  return { success: true };
}

/**
 * 🔒 HARDWARE-LEVEL STORAGE PERSISTENCE & HEALTH TELEMETRY
 * Requests persistent storage from browser engine (eviction-immune) and reads quota.
 */
export async function enablePersistentStorage(): Promise<{ persisted: boolean; usage?: number; quota?: number }> {
  try {
    let isPersisted = false;
    if (navigator.storage && navigator.storage.persist) {
      isPersisted = await navigator.storage.persist();
    }
    let estimate: StorageEstimate | undefined;
    if (navigator.storage && navigator.storage.estimate) {
      estimate = await navigator.storage.estimate();
    }
    return {
      persisted: isPersisted,
      usage: estimate?.usage,
      quota: estimate?.quota
    };
  } catch {
    return { persisted: false };
  }
}

/**
 * ⚡ ATOMIC OPTIMISTIC CONCURRENCY MUTATION FOR BEDS
 * Prevents race conditions and last-write-wins (LWW) data loss across multi-tab sessions.
 */
export async function atomicUpdateBed(
  id: string,
  mutationFn: (currentBed: BedData) => Partial<BedData>
): Promise<BedData> {
  return await db.transaction('rw', db.beds, async () => {
    const existing = await db.beds.get(id);
    if (!existing) throw new Error(`Bed ${id} not found in ClinicalPristineDB.`);

    const updates = mutationFn(existing);
    const updatedBed: BedData = {
      ...existing,
      ...updates,
      version: (existing.version || 0) + 1,
      updatedAt: new Date().toISOString()
    };

    await db.beds.put(updatedBed);
    return updatedBed;
  });
}

// Automatically request persistent storage on boot
enablePersistentStorage();

