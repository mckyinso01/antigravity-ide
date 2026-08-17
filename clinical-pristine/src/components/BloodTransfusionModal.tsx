import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplet, 
  ShieldCheck, 
  UserCheck, 
  Barcode, 
  Activity, 
  CheckCircle2, 
  X,
  ArrowLeft,
  Lock,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { db, type BedData } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';
import { DynamicPatientAvatar } from './DynamicPatientAvatar';

interface BloodTransfusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bed: BedData | null;
}

export const BloodTransfusionModal: React.FC<BloodTransfusionModalProps> = ({
  isOpen,
  onClose,
  bed
}) => {
  const safety = bed?.patientSafety;
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [bloodUnitNumber, setBloodUnitNumber] = useState('PRBC-99201-OPOS');
  const [bloodGroup] = useState('O-Positive (Rh+)');
  const [crossmatchVerified, setCrossmatchVerified] = useState(true);
  const [patientWristbandScanned, setPatientWristbandScanned] = useState(true);
  
  const [nurse1Name, setNurse1Name] = useState('RN Jessica Reyes');
  const [nurse1Pin, setNurse1Pin] = useState('8812');
  const [nurse2Name, setNurse2Name] = useState('RN Mark Bautista');
  const [nurse2Pin, setNurse2Pin] = useState('4409');
  
  const [baselineBp, setBaselineBp] = useState(safety?.vitals?.bp || '118/76');
  const [baselineHr, setBaselineHr] = useState(safety?.vitals?.hr || 82);
  const [baselineTemp, setBaselineTemp] = useState(safety?.vitals?.temp || 36.8);
  
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen || !bed || !safety) return null;

  const handleStartTransfusion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to Dexie transfusions record
    await db.transfusions.add({
      id: `TX-${Date.now()}`,
      bedId: bed.id,
      mrn: safety.mrn,
      patientName: bed.patientName || 'Unknown Patient',
      bloodUnitNumber,
      bloodProduct: '2 Units PRBC (Packed Red Blood Cells)',
      bloodGroup,
      crossmatchVerified,
      nurse1Name,
      nurse1Pin,
      nurse2Name,
      nurse2Pin,
      baselineBp,
      baselineHr: Number(baselineHr),
      baselineTemp: Number(baselineTemp),
      status: 'transfusing',
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Update bed patient safety status
    const updatedOrders = (safety.pendingDoctorOrders || []).filter(o => !o.includes('Blood Transfusion'));
    updatedOrders.push(`Transfusion in Progress: Unit #${bloodUnitNumber} (Started ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);

    await db.beds.update(bed.id, {
      patientSafety: {
        ...safety,
        bloodTransfusionStatus: 'transfusing',
        pendingDoctorOrders: updatedOrders
      }
    });

    clinicalAudio.playSuccessChime();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[130] bg-slate-900/40 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-xl md:max-w-2xl'
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900 font-sans transition-all duration-300`}
        >
          {/* Drawer Header with Breadcrumb */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-200 border-2 border-slate-300 bg-white transition-colors flex items-center gap-1.5 text-xs font-mono font-black cursor-pointer"
                title="Return to Patient Chart"
              >
                <ArrowLeft size={16} /> Bay {bed.id}
              </button>
              <div className="w-px h-6 bg-slate-300" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">2-Nurse Dual Sign-Off</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 border-2 border-rose-300 text-rose-950 text-xs font-mono font-black">
                    JCAHO PROTOCOL
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  Blood Product Administration Verification • Recipient: {bed.patientName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-slate-600 hover:text-slate-950 rounded-xl hover:bg-slate-200 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title={isFullScreen ? "Restore Standard Drawer" : "Expand Full Screen"}
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-600 hover:text-rose-700 rounded-xl hover:bg-rose-50 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title="Close Drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {isSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <CheckCircle2 size={64} className="text-emerald-600 animate-bounce" />
              <h3 className="text-2xl font-black text-slate-950 font-display">Dual Sign-Off Authenticated!</h3>
              <p className="text-xs text-slate-700 font-mono max-w-md font-bold">
                Blood Unit <span className="text-rose-700 font-black">{bloodUnitNumber}</span> ({bloodGroup}) is now actively transfusing to {bed.patientName}.
              </p>
            </div>
          ) : (
            <form id="transfusion-form" onSubmit={handleStartTransfusion} className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
              {/* Patient & Blood Unit Verification Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="text-xs text-blue-700 font-bold uppercase font-mono flex items-center gap-1.5">
                    <UserCheck size={16} /> PATIENT IDENTITY VERIFICATION
                  </div>
                  <div className="flex items-center gap-3">
                    <DynamicPatientAvatar
                      photoUrl={safety.photoUrl}
                      patientName={bed.patientName}
                      bedId={bed.id}
                      size="md"
                      shape="circle"
                      acuity={bed.acuity === 'critical' ? 'critical' : 'stable'}
                      allowUpload={true}
                    />
                    <div>
                      <span className="text-xs text-slate-500 block">Recipient Legal Name</span>
                      <span className="text-slate-900 font-bold text-base font-display">{bed.patientName}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block">MRN:</span>
                      <span className="text-blue-700 font-bold">{safety.mrn}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">AGE / GENDER:</span>
                      <span className="text-slate-800">{safety.age} yo / {safety.gender}</span>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 pt-2 border-t border-slate-100 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={patientWristbandScanned}
                      onChange={e => setPatientWristbandScanned(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" 
                    />
                    <span className="text-xs text-slate-700 font-medium">Wristband 2D Barcode Scanned &amp; Verified</span>
                  </label>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <div className="text-xs text-rose-700 font-bold uppercase font-mono flex items-center gap-1.5">
                    <Barcode size={16} /> BLOOD UNIT SPECIMEN DETAILS
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Blood Unit / DIN Barcode *</span>
                    <input 
                      type="text" 
                      value={bloodUnitNumber}
                      onChange={e => setBloodUnitNumber(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold text-xs focus:border-rose-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block">PRODUCT:</span>
                      <span className="text-slate-800 font-bold">2 Units PRBC</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">BLOOD GROUP:</span>
                      <span className="text-rose-700 font-bold">{bloodGroup}</span>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 pt-2 border-t border-slate-100 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={crossmatchVerified}
                      onChange={e => setCrossmatchVerified(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300" 
                    />
                    <span className="text-xs text-slate-700 font-medium">Crossmatch Compatibility Verified</span>
                  </label>
                </div>
              </div>

              {/* Baseline Vitals Verification */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="text-xs text-amber-700 font-bold uppercase font-mono flex items-center gap-1.5">
                  <Activity size={16} /> MANDATORY PRE-TRANSFUSION BASELINE VITALS
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1 font-mono">Baseline BP (mmHg)</label>
                    <input 
                      type="text" 
                      value={baselineBp}
                      onChange={e => setBaselineBp(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1 font-mono">Heart Rate (BPM)</label>
                    <input 
                      type="number" 
                      value={baselineHr}
                      onChange={e => setBaselineHr(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1 font-mono">Body Temp (°C)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={baselineTemp}
                      onChange={e => setBaselineTemp(Number(e.target.value))}
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold text-xs outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* 2-Nurse Dual Sign-Off Digital Authentication */}
              <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-2xs space-y-4">
                <div className="text-xs text-rose-700 font-bold uppercase font-mono flex items-center gap-1.5">
                  <ShieldCheck size={16} /> DUAL-NURSE CLINICAL SIGN-OFF SIGNATURES
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nurse 1 */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase font-mono block">Primary Administering Nurse (RN 1)</span>
                    <input 
                      type="text" 
                      value={nurse1Name}
                      onChange={e => setNurse1Name(e.target.value)}
                      placeholder="Nurse 1 Full Name"
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none focus:border-blue-500 font-medium"
                    />
                    <div className="relative">
                      <input 
                        type="password" 
                        value={nurse1Pin}
                        onChange={e => setNurse1Pin(e.target.value)}
                        placeholder="Nurse 1 PIN (8812)"
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono outline-none focus:border-blue-500"
                      />
                      <Lock size={12} className="absolute right-3 top-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Nurse 2 */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase font-mono block">Secondary Verifying Nurse (RN 2)</span>
                    <input 
                      type="text" 
                      value={nurse2Name}
                      onChange={e => setNurse2Name(e.target.value)}
                      placeholder="Nurse 2 Full Name"
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs outline-none focus:border-rose-500 font-medium"
                    />
                    <div className="relative">
                      <input 
                        type="password" 
                        value={nurse2Pin}
                        onChange={e => setNurse2Pin(e.target.value)}
                        placeholder="Nurse 2 PIN (4409)"
                        required
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 text-xs font-mono outline-none focus:border-rose-500"
                      />
                      <Lock size={12} className="absolute right-3 top-3 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Sticky Action Footer */}
          {!isSuccess && (
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="transfusion-form"
                disabled={!crossmatchVerified || !patientWristbandScanned || !nurse1Pin || !nurse2Pin}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Droplet size={16} /> Authenticate &amp; Begin Blood Transfusion
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
