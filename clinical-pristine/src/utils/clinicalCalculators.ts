/**
 * Clinical Pristine OS - Standard Clinical Decision Support (CDS) Calculators
 * Level 1 Mission-Critical Medical Algorithms
 */

export interface VitalsInput {
  bp?: string;
  hr?: number;
  spo2?: number;
  temp?: number;
  rr?: number;
}

export interface MEWSResult {
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendation: string;
  badgeClass: string;
  triggerSepsisAlert: boolean;
}

/**
 * Modified Early Warning Score (MEWS)
 * Validated clinical triage scoring for rapid deterioration detection
 */
export function calculateMEWS(vitals?: VitalsInput): MEWSResult {
  if (!vitals) {
    return {
      score: 0,
      riskLevel: 'LOW',
      recommendation: 'Baseline Observation',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      triggerSepsisAlert: false
    };
  }

  let score = 0;

  // 1. Heart Rate
  const hr = vitals.hr || 75;
  if (hr < 40) score += 2;
  else if (hr <= 50) score += 1;
  else if (hr <= 100) score += 0;
  else if (hr <= 110) score += 1;
  else if (hr <= 129) score += 2;
  else score += 3;

  // 2. Systolic Blood Pressure
  let systolic = 120;
  if (vitals.bp && vitals.bp.includes('/')) {
    const parts = vitals.bp.split('/');
    systolic = parseInt(parts[0], 10) || 120;
  }
  if (systolic < 70) score += 3;
  else if (systolic <= 80) score += 2;
  else if (systolic <= 100) score += 1;
  else if (systolic <= 199) score += 0;
  else score += 2;

  // 3. Temperature
  const temp = vitals.temp || 37.0;
  if (temp < 35.0) score += 2;
  else if (temp <= 38.4) score += 0;
  else score += 2;

  // 4. Respiratory Rate (estimated from vitals or defaults)
  const rr = vitals.rr || (hr > 110 ? 24 : 16);
  if (rr < 9) score += 2;
  else if (rr <= 14) score += 0;
  else if (rr <= 20) score += 1;
  else if (rr <= 29) score += 2;
  else score += 3;

  // 5. Oxygen Saturation (SpO2)
  const spo2 = vitals.spo2 || 98;
  if (spo2 < 90) score += 3;
  else if (spo2 < 93) score += 2;
  else if (spo2 < 96) score += 1;

  // Risk Classification
  if (score >= 5) {
    return {
      score,
      riskLevel: 'CRITICAL',
      recommendation: 'STAT Rapid Response & Sepsis Screening',
      badgeClass: 'bg-rose-100 text-rose-900 border-rose-400 animate-pulse font-black',
      triggerSepsisAlert: true
    };
  } else if (score >= 3) {
    return {
      score,
      riskLevel: 'MEDIUM',
      recommendation: 'Increase Vitals Frequency to q1h',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-400 font-bold',
      triggerSepsisAlert: false
    };
  } else {
    return {
      score,
      riskLevel: 'LOW',
      recommendation: 'Routine Shift Telemetry Monitoring',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold',
      triggerSepsisAlert: false
    };
  }
}

/**
 * HIPAA Privacy Shield Name Masker
 */
export function maskPatientName(fullName?: string, isPrivacyActive: boolean = false): string {
  if (!fullName) return 'Unoccupied Bay';
  if (!isPrivacyActive) return fullName;

  const parts = fullName.trim().split(' ');
  if (parts.length === 1) return `${parts[0][0]}.`;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

/**
 * IV Infusion Drop Rate Calculator (gtt/min & mL/hr)
 */
export function calculateIVInfusion(volumeML: number, durationHours: number, dropFactorGtt: number = 20) {
  if (durationHours <= 0) return { mlPerHour: 0, dropsPerMin: 0 };
  const mlPerHour = Math.round(volumeML / durationHours);
  const totalMinutes = durationHours * 60;
  const dropsPerMin = Math.round((volumeML * dropFactorGtt) / totalMinutes);
  return { mlPerHour, dropsPerMin };
}

/**
 * HL7 FHIR R4 Patient Resource & Clinical Bundle Exporter
 */
export function exportPatientToFHIR(bed: {
  id: string;
  patientName?: string;
  patientSafety?: {
    mrn?: string;
    age?: number;
    gender?: string;
    chiefComplaint?: string;
    triageLevel?: number;
    allergies?: string[];
    vitals?: { bp?: string; hr?: number; spo2?: number; temp?: number; lastRecorded?: string };
    medicationsSchedule?: { name: string; dose: string; route?: string; time?: string; status: string }[];
    assignedDoctor?: string;
    assignedNurse?: string;
  };
}) {
  const safety = bed.patientSafety;
  const bundle = {
    resourceType: 'Bundle',
    type: 'collection',
    timestamp: new Date().toISOString(),
    entry: [
      {
        fullUrl: `urn:uuid:patient-${bed.id}`,
        resource: {
          resourceType: 'Patient',
          id: safety?.mrn || `MRN-${bed.id}`,
          identifier: [
            { system: 'http://hospital.pristine-os.internal/mrn', value: safety?.mrn || 'UNKNOWN' }
          ],
          name: [{ text: bed.patientName || 'Anonymous Inpatient' }],
          gender: safety?.gender?.toLowerCase() || 'unknown',
          extension: [
            { url: 'http://hl7.org/fhir/StructureDefinition/patient-age', valueInteger: safety?.age || 0 },
            { url: 'http://hospital.pristine-os.internal/triage-level', valueInteger: safety?.triageLevel || 3 }
          ]
        }
      },
      {
        fullUrl: `urn:uuid:encounter-${bed.id}`,
        resource: {
          resourceType: 'Encounter',
          status: 'in-progress',
          class: { code: 'IMP', display: 'inpatient encounter' },
          subject: { reference: `urn:uuid:patient-${bed.id}` },
          location: [{ location: { display: `Bed ${bed.id}` } }],
          reasonCode: [{ text: safety?.chiefComplaint || 'Acute Inpatient Observation' }]
        }
      },
      {
        fullUrl: `urn:uuid:observation-vitals-${bed.id}`,
        resource: {
          resourceType: 'Observation',
          status: 'final',
          category: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'vital-signs' }] }],
          code: { text: 'Hospital Inpatient Vitals Panel' },
          subject: { reference: `urn:uuid:patient-${bed.id}` },
          effectiveDateTime: new Date().toISOString(),
          component: [
            { code: { text: 'Blood Pressure' }, valueString: safety?.vitals?.bp || '120/80' },
            { code: { text: 'Heart Rate' }, valueQuantity: { value: safety?.vitals?.hr || 75, unit: 'beats/min' } },
            { code: { text: 'Oxygen Saturation' }, valueQuantity: { value: safety?.vitals?.spo2 || 98, unit: '%' } },
            { code: { text: 'Body Temperature' }, valueQuantity: { value: safety?.vitals?.temp || 37.0, unit: 'Cel' } }
          ]
        }
      }
    ]
  };

  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FHIR_R4_${safety?.mrn || bed.id}_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
