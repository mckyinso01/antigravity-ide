import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  RotateCcw, 
  Sparkles,
  ArrowRight,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { cleanSweepToProductionState, restoreDemoState, type CleanSweepParams } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';

interface ProductionCleanSweepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (hospitalName: string) => void;
}

export const ProductionCleanSweepModal: React.FC<ProductionCleanSweepModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const isCurrentlyProduction = localStorage.getItem('clinical_pristine_production_mode') === 'true';
  const existingHospitalName = localStorage.getItem('clinical_pristine_hospital_name') || '';

  const [step, setStep] = useState<'warning' | 'form' | 'executing' | 'success' | 'restoring'>('warning');
  const [formData, setFormData] = useState<CleanSweepParams>({
    hospitalName: existingHospitalName || 'Metropolitan General Hospital',
    adminName: 'Dr. Michael Chen, MD, FACS',
    adminEmail: 'chief.medical@metropolitan-health.org',
    adminPin: '9921',
    adminLicense: 'MD-FACH-88210',
    adminDepartment: 'Executive Clinical Leadership'
  });

  const [progressStep, setProgressStep] = useState(0);

  const stepsList = [
    'Sanitizing active clinical admissions and census records...',
    'Resetting all 18 CAD hospital floor beds to vacant bays...',
    'Purging sample EVS biohazard disinfection queues...',
    'Wiping demo clinical alerts, MEWS alarms & SBAR handoffs...',
    'Registering Master Chief Medical Officer PIN & HIPAA Protocol...',
    'Initializing 100% clean production hospital workspace...'
  ];

  const handleStartCleanSweep = async () => {
    setStep('executing');
    clinicalAudio.playAlertTone();

    for (let i = 0; i < stepsList.length; i++) {
      setProgressStep(i);
      clinicalAudio.playDrawerSwoosh();
      await new Promise(r => setTimeout(r, 450));
    }

    await cleanSweepToProductionState(formData);
    clinicalAudio.playSuccessChime();
    setStep('success');
    onSuccess(formData.hospitalName);
  };

  const handleRestoreDemo = async () => {
    setStep('restoring');
    clinicalAudio.playDrawerSwoosh();
    await restoreDemoState();
    await new Promise(r => setTimeout(r, 900));
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-xl bg-white border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans text-slate-900"
        >
          {/* Modal Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b-2 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
                <Trash2 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-lg text-white">Production Clean Sweep</h3>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold">
                    FACTORY DEPLOYMENT
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Wipe all mock/demo records &bull; Initialize blank hospital
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-5 bg-slate-50 max-h-[75vh] overflow-y-auto custom-scrollbar">

            {/* STEP 1: WARNING & SCOPE AUDIT */}
            {step === 'warning' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-2.5">
                  <div className="flex items-center gap-2 text-rose-900 font-black text-sm">
                    <ShieldAlert size={18} className="text-rose-600 shrink-0" />
                    <span>Client Production Deployment Protocol</span>
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed font-bold">
                    Executing a Clean Sweep will permanently purge all demonstration data so your hospital staff can begin live clinical intake with 100% zero synthetic data contamination.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-200 shadow-xs space-y-1.5">
                    <span className="text-rose-700 font-bold flex items-center gap-1.5 uppercase text-[11px]">
                      <Trash2 size={13} /> Purged Cleanly
                    </span>
                    <ul className="text-slate-600 space-y-1 text-[11px]">
                      <li>• All mock patient admissions</li>
                      <li>• Sample EVS biohazard tasks</li>
                      <li>• Demo emergency code alerts</li>
                      <li>• Synthetic clinical staff roster</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border-2 border-slate-200 shadow-xs space-y-1.5">
                    <span className="text-emerald-700 font-bold flex items-center gap-1.5 uppercase text-[11px]">
                      <CheckCircle2 size={13} /> Preserved 100%
                    </span>
                    <ul className="text-slate-600 space-y-1 text-[11px]">
                      <li>• 18 CAD hospital floor blueprints</li>
                      <li>• Level 18 Helipad telemetry engine</li>
                      <li>• Vector room coordinate grid</li>
                      <li>• Offline Dexie IndexedDB engine</li>
                    </ul>
                  </div>
                </div>

                {isCurrentlyProduction && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-900">
                    <div className="font-mono">
                      <strong>Current Mode:</strong> Production ({existingHospitalName})
                    </div>
                    <button
                      onClick={handleRestoreDemo}
                      className="text-xs text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw size={12} /> Restore Demo Mode
                    </button>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => setStep('form')}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Hospital Setup</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: BLANK HOSPITAL ONBOARDING FORM */}
            {step === 'form' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-blue-50 border-2 border-blue-200 rounded-2xl text-xs text-blue-900 flex items-center gap-2.5">
                  <Building2 size={18} className="text-blue-700 shrink-0" />
                  <span className="font-bold">
                    Enter your organization's legal details. This registers your Chief Medical Director as the master administrator.
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-800 font-bold mb-1">HOSPITAL / CLINIC LEGAL NAME</label>
                    <input 
                      type="text"
                      value={formData.hospitalName}
                      onChange={e => setFormData({ ...formData, hospitalName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-slate-950 font-bold focus:border-blue-600 outline-none"
                      placeholder="e.g. St. Jude Children's Research Hospital"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-800 font-bold mb-1">CHIEF MEDICAL OFFICER / ADMIN</label>
                      <input 
                        type="text"
                        value={formData.adminName}
                        onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-slate-950 font-bold focus:border-blue-600 outline-none"
                        placeholder="Dr. Michael Vance, MD"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-800 font-bold mb-1">MASTER 4-DIGIT PIN</label>
                      <input 
                        type="text"
                        maxLength={6}
                        value={formData.adminPin}
                        onChange={e => setFormData({ ...formData, adminPin: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-slate-950 font-bold focus:border-blue-600 outline-none text-center tracking-widest text-sm"
                        placeholder="9921"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-800 font-bold mb-1">OFFICIAL WORK EMAIL</label>
                      <input 
                        type="email"
                        value={formData.adminEmail}
                        onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-slate-950 font-bold focus:border-blue-600 outline-none"
                        placeholder="director@hospital.org"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-800 font-bold mb-1">MEDICAL LICENSE / BADGE #</label>
                      <input 
                        type="text"
                        value={formData.adminLicense}
                        onChange={e => setFormData({ ...formData, adminLicense: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-300 rounded-xl text-slate-950 font-bold focus:border-blue-600 outline-none"
                        placeholder="MD-88210"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2.5">
                  <button
                    onClick={() => setStep('warning')}
                    className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleStartCleanSweep}
                    disabled={!formData.hospitalName || !formData.adminName || !formData.adminPin}
                    className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Trash2 size={16} />
                    <span>Execute Production Clean Sweep</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: EXECUTING PROGRESS ANIMATION */}
            {step === 'executing' && (
              <div className="py-8 space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-rose-100 border-4 border-rose-500 border-t-transparent animate-spin mx-auto flex items-center justify-center">
                  <Trash2 size={24} className="text-rose-600 animate-pulse" />
                </div>

                <div>
                  <h4 className="font-display font-black text-base text-slate-950">
                    Executing Hospital Clean Sweep...
                  </h4>
                  <p className="text-xs text-slate-600 font-mono mt-1 font-bold">
                    {stepsList[progressStep] || 'Finalizing...'}
                  </p>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-rose-500 to-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${((progressStep + 1) / stepsList.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION */}
            {step === 'success' && (
              <div className="py-4 space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <Sparkles size={32} />
                </div>

                <div>
                  <h4 className="font-display font-black text-xl text-slate-950">
                    Hospital Workspace Initialized!
                  </h4>
                  <p className="text-xs text-slate-600 font-mono mt-1">
                    <strong>{formData.hospitalName}</strong> is now live in 100% zero-mock production mode.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-left space-y-2 text-xs font-mono">
                  <div className="text-emerald-950 font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Active Production Specifications:</span>
                  </div>
                  <div className="text-slate-700 space-y-1 text-[11px]">
                    <div>• <strong>Master Admin:</strong> {formData.adminName} (PIN: {formData.adminPin})</div>
                    <div>• <strong>Floors 1–18 Census:</strong> 100% Vacant Bays (Ready for Live Patients)</div>
                    <div>• <strong>EVS Sanitization:</strong> 0 Pending Tasks • Clean Terminal Status</div>
                    <div>• <strong>HIPAA Persistence:</strong> Offline Dexie IndexedDB Sealed</div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      window.location.href = '/evs';
                    }}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileSpreadsheet size={15} />
                    <span>Import Staff (CSV)</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      window.location.href = '/';
                    }}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Clean Live Map</span> &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* RESTORING STATE */}
            {step === 'restoring' && (
              <div className="py-8 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
                <p className="font-mono text-xs text-slate-700 font-bold">Restoring sample hospital demonstration records...</p>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-100 border-t-2 border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Air-Gapped Production Engine</span>
            <span className="font-bold text-slate-900">Zero-Mock Standard</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
