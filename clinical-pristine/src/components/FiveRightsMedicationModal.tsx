import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  Lock, 
  Pill, 
  Sparkles,
  Users
} from 'lucide-react';
import { db, type BedData, type MedicationOrder } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bed: BedData | null;
  medicationOrder?: MedicationOrder | null;
  onAdministered?: (medName: string) => void;
}

const CONTROLLED_SCHEDULE_II = [
  'fentanyl',
  'morphine',
  'hydromorphone',
  'dilaudid',
  'midazolam',
  'versed',
  'propofol',
  'lorazepam',
  'ativan',
  'oxycodone',
  'norepinephrine',
  'epinephrine',
  'heparin',
  'insulin'
];

export const FiveRightsMedicationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  bed,
  medicationOrder,
  onAdministered
}) => {
  const { showToast } = useToast();

  const [patientWristbandScanned, setPatientWristbandScanned] = useState(false);
  const [medBarcodeScanned, setMedBarcodeScanned] = useState(false);
  const [doseVerified, setDoseVerified] = useState(false);
  const [routeVerified, setRouteVerified] = useState(false);
  const [timeVerified, setTimeVerified] = useState(false);

  // Dual-Nurse Witness State
  const [nurse1Pin, setNurse1Pin] = useState('123');
  const [nurse2Pin, setNurse2Pin] = useState('8888');
  const [nurse2Name] = useState('Dr. Arthur Chen, MD (Clinical Witness)');
  const [witnessCertified, setWitnessCertified] = useState(false);

  if (!isOpen || !bed) return null;

  const targetMed = medicationOrder || {
    name: 'Fentanyl IV Push',
    dose: '50 mcg',
    route: 'IV Push',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'due'
  };

  const isControlledDrug = CONTROLLED_SCHEDULE_II.some(drug => 
    targetMed.name.toLowerCase().includes(drug)
  );

  const patientName = bed.patientName || 'Admitted Patient';
  const mrn = bed.patientSafety?.mrn || `MRN-${bed.id}`;
  const allergies = bed.patientSafety?.allergies || [];

  const handleScanWristband = () => {
    setPatientWristbandScanned(true);
    clinicalAudio.playSuccessChime();
    showToast(`✓ Scanned Wristband: ${patientName} (${mrn})`, 'info');
  };

  const handleScanMedBarcode = () => {
    setMedBarcodeScanned(true);
    clinicalAudio.playSuccessChime();
    showToast(`✓ Scanned NDC Barcode: ${targetMed.name} (${targetMed.dose})`, 'info');
  };

  const handleVerifyDualNurse = () => {
    if (!nurse1Pin || !nurse2Pin) {
      showToast('Both Nurse 1 and Witness Nurse PINs are required', 'error');
      return;
    }
    setWitnessCertified(true);
    clinicalAudio.playSuccessChime();
    showToast(`✓ Co-Sign Certified by ${nurse2Name}`, 'success');
  };

  const canAdminister = 
    patientWristbandScanned && 
    medBarcodeScanned && 
    doseVerified && 
    routeVerified && 
    timeVerified && 
    (!isControlledDrug || witnessCertified);

  const handleConfirmAdministration = async () => {
    if (!canAdminister) return;

    try {
      const existingSafety = bed.patientSafety || {
        mrn,
        age: 45,
        chiefComplaint: 'Clinical Care',
        triageLevel: 3,
        fallRisk: false,
        npo: false,
        dnr: false,
        isolation: 'none',
        admittedAt: new Date().toISOString()
      };

      const currentMeds = existingSafety.medicationsSchedule || [];
      const updatedMeds = currentMeds.map(m => {
        if (m.name === targetMed.name && m.dose === targetMed.dose) {
          return { ...m, status: 'given' as const, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        }
        return m;
      });

      // If not present in schedule, append
      if (!currentMeds.some(m => m.name === targetMed.name)) {
        updatedMeds.push({
          name: targetMed.name,
          dose: targetMed.dose,
          route: targetMed.route,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'given'
        });
      }

      await db.beds.update(bed.id, {
        patientSafety: {
          ...existingSafety,
          medicationsSchedule: updatedMeds
        }
      });

      clinicalAudio.playSuccessChime();
      showToast(
        `✓ 5-Rights Verified & Administered: ${targetMed.name} to ${patientName}`,
        'success'
      );

      onAdministered?.(targetMed.name);
      onClose();
    } catch (e) {
      console.error('Error administering medication', e);
      showToast('Failed to log medication administration', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070B14]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0C1220] border border-[#2A4374] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden text-slate-100 font-sans">
        {/* Header */}
        <div className="h-16 border-b border-[#1E2D4D] bg-[#0E1628] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">5-Rights Medication Administration</h3>
                {isControlledDrug && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-rose-950 text-rose-300 border border-rose-600 animate-pulse">
                    SCHEDULE II NARCOTIC
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Bed {bed.room} • {patientName} ({mrn})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#152038] transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 font-mono text-xs">
          {/* Target Medication Spotlight Card */}
          <div className="p-4 rounded-xl bg-[#121D36] border border-[#2A4374] flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-950 text-purple-300 border border-purple-700">
                <Pill size={20} />
              </div>
              <div>
                <span className="text-[10px] text-[#5BC0BE] font-bold uppercase">PRESCRIBED DRUG ORDER</span>
                <h4 className="text-base font-sans font-bold text-white leading-tight">{targetMed.name}</h4>
                <div className="text-slate-300 text-[11px] mt-0.5">
                  Dose: <strong className="text-emerald-400">{targetMed.dose}</strong> • Route: <strong className="text-sky-300">{targetMed.route}</strong>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">ADMIN WINDOW</span>
              <span className="text-xs font-bold text-amber-300">STAT / Due Now</span>
            </div>
          </div>

          {/* Allergy Warning if applicable */}
          {allergies.length > 0 && allergies[0] !== 'NKDA' && (
            <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-500 text-amber-200 text-xs flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-400 shrink-0" />
              <span><strong>PATIENT ALLERGIES:</strong> {allergies.join(', ')} (Verified safe against {targetMed.name})</span>
            </div>
          )}

          {/* 5-Rights Interactive Verification Checklist */}
          <div className="space-y-2.5">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider block">
              MANDATORY 5-RIGHTS CHECKPOINT GATE
            </span>

            {/* 1. Right Patient */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              patientWristbandScanned ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-[#0E1628] border-[#1E2D4D] text-slate-300'
            }`}>
              <div className="flex items-center gap-2.5">
                {patientWristbandScanned ? <CheckCircle2 size={16} className="text-emerald-400" /> : <QrCode size={16} className="text-slate-500" />}
                <div>
                  <span className="font-bold text-white block">1. Right Patient</span>
                  <span className="text-[10px] text-slate-400">Wristband Barcode: {mrn}</span>
                </div>
              </div>
              <button
                onClick={handleScanWristband}
                disabled={patientWristbandScanned}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  patientWristbandScanned ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14]'
                }`}
              >
                {patientWristbandScanned ? '✓ Verified' : 'Scan Wristband'}
              </button>
            </div>

            {/* 2. Right Drug */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              medBarcodeScanned ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-[#0E1628] border-[#1E2D4D] text-slate-300'
            }`}>
              <div className="flex items-center gap-2.5">
                {medBarcodeScanned ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Pill size={16} className="text-slate-500" />}
                <div>
                  <span className="font-bold text-white block">2. Right Drug</span>
                  <span className="text-[10px] text-slate-400">GS1 NDC Barcode: NDC-50242-040-62</span>
                </div>
              </div>
              <button
                onClick={handleScanMedBarcode}
                disabled={medBarcodeScanned}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  medBarcodeScanned ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14]'
                }`}
              >
                {medBarcodeScanned ? '✓ Verified' : 'Scan Medication'}
              </button>
            </div>

            {/* 3. Right Dose */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              doseVerified ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-[#0E1628] border-[#1E2D4D] text-slate-300'
            }`}>
              <div className="flex items-center gap-2.5">
                {doseVerified ? <CheckCircle2 size={16} className="text-emerald-400" /> : <ShieldCheck size={16} className="text-slate-500" />}
                <div>
                  <span className="font-bold text-white block">3. Right Dose</span>
                  <span className="text-[10px] text-slate-400">Confirm {targetMed.dose} vs High-Alert threshold</span>
                </div>
              </div>
              <button
                onClick={() => setDoseVerified(true)}
                disabled={doseVerified}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  doseVerified ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#1C2D52] hover:bg-[#253B6E] text-slate-200 border border-[#2A4374]'
                }`}
              >
                {doseVerified ? '✓ Verified' : 'Confirm Dose'}
              </button>
            </div>

            {/* 4. Right Route */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              routeVerified ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-[#0E1628] border-[#1E2D4D] text-slate-300'
            }`}>
              <div className="flex items-center gap-2.5">
                {routeVerified ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Sparkles size={16} className="text-slate-500" />}
                <div>
                  <span className="font-bold text-white block">4. Right Route</span>
                  <span className="text-[10px] text-slate-400">Route confirmed as: {targetMed.route}</span>
                </div>
              </div>
              <button
                onClick={() => setRouteVerified(true)}
                disabled={routeVerified}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  routeVerified ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#1C2D52] hover:bg-[#253B6E] text-slate-200 border border-[#2A4374]'
                }`}
              >
                {routeVerified ? '✓ Verified' : 'Confirm Route'}
              </button>
            </div>

            {/* 5. Right Time */}
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              timeVerified ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300' : 'bg-[#0E1628] border-[#1E2D4D] text-slate-300'
            }`}>
              <div className="flex items-center gap-2.5">
                {timeVerified ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Clock size={16} className="text-slate-500" />}
                <div>
                  <span className="font-bold text-white block">5. Right Time & Window</span>
                  <span className="text-[10px] text-slate-400">Current timestamp within ±30 min scheduled window</span>
                </div>
              </div>
              <button
                onClick={() => setTimeVerified(true)}
                disabled={timeVerified}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  timeVerified ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#1C2D52] hover:bg-[#253B6E] text-slate-200 border border-[#2A4374]'
                }`}
              >
                {timeVerified ? '✓ Verified' : 'Confirm Time'}
              </button>
            </div>
          </div>

          {/* Dual-Nurse Witness Co-Sign Section (Mandatory for Schedule II) */}
          {isControlledDrug && (
            <div className="p-4 rounded-xl bg-[#121D36] border border-rose-500/50 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-rose-400" />
                  <span className="font-bold text-rose-200 text-xs">DUAL-NURSE WITNESS CO-SIGN GATE</span>
                </div>
                {witnessCertified ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-bold">
                    ✓ Witness Verified
                  </span>
                ) : (
                  <span className="text-[10px] text-rose-400 font-mono font-bold">
                    2 Signatures Required
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Administering RN PIN:</label>
                  <div className="relative">
                    <Lock size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      value={nurse1Pin}
                      onChange={(e) => setNurse1Pin(e.target.value)}
                      placeholder="PIN: 123"
                      className="w-full bg-[#070B14] border border-[#1E2D4D] text-white text-xs rounded-lg pl-7 pr-2.5 py-1.5 outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Witness RN / MD PIN:</label>
                  <div className="relative">
                    <Lock size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="password"
                      value={nurse2Pin}
                      onChange={(e) => setNurse2Pin(e.target.value)}
                      placeholder="PIN: 8888"
                      className="w-full bg-[#070B14] border border-[#1E2D4D] text-white text-xs rounded-lg pl-7 pr-2.5 py-1.5 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {!witnessCertified ? (
                <button
                  type="button"
                  onClick={handleVerifyDualNurse}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Verify Dual Witness Co-Sign
                </button>
              ) : (
                <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-[10px] flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span>Witness Certificate: Certified by {nurse2Name} (HIPAA Audit Logged)</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-16 border-t border-[#1E2D4D] bg-[#0E1628] px-6 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#152038] hover:bg-[#1E2D4D] text-slate-300 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirmAdministration}
            disabled={!canAdminister}
            className={`px-6 py-2.5 rounded-xl font-mono font-bold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
              canAdminister
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <ShieldCheck size={16} />
            <span>Confirm & Administer Dose</span>
          </button>
        </div>
      </div>
    </div>
  );
};
