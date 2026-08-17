import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  Server,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { db } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';

interface HospitalProvisioningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HospitalProvisioningModal: React.FC<HospitalProvisioningModalProps> = ({
  isOpen,
  onClose
}) => {
  const [hospitalName, setHospitalName] = useState(() => localStorage.getItem('pristine_hospital_name') || 'Pristine Health System');
  const [floorName, setFloorName] = useState(() => localStorage.getItem('pristine_floor_name') || 'Level 1 (Trauma & ICU)');
  const [unitCode, setUnitCode] = useState(() => localStorage.getItem('pristine_unit_code') || 'TICU-NORTH-100');
  
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveProvisioning = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('pristine_hospital_name', hospitalName);
    localStorage.setItem('pristine_floor_name', floorName);
    localStorage.setItem('pristine_unit_code', unitCode);
    
    clinicalAudio.playSuccessChime();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
      window.location.reload();
    }, 1200);
  };

  const handleResetDatabaseToBaseline = async () => {
    if (window.confirm("CAUTION: This will atomic-reset all beds, rooms, EVS tasks, and alerts to the standard clinical demonstration baseline. Continue?")) {
      await db.delete();
      clinicalAudio.playAlertTone();
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[130] bg-slate-900/40 flex justify-end font-sans"
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
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900 transition-all duration-300`}
        >
          {/* Drawer Header */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-blue-300 flex items-center justify-center text-blue-700 shadow-xs font-black">
                <Building2 size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">Facility Provisioning Wizard</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    GATE 21
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  Tenant Identity &amp; Clinical Database State Management
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

          {/* Form Content */}
          {savedSuccess || resetSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <CheckCircle2 size={64} className="text-emerald-700 animate-bounce" />
              <h3 className="text-2xl font-black text-slate-950 font-display">
                {resetSuccess ? 'Database Purged to Demonstration Baseline!' : 'Facility Provisioning Saved!'}
              </h3>
              <p className="text-xs text-slate-700 font-mono font-bold">
                Reloading application context and realigning clinical telemetry...
              </p>
            </div>
          ) : (
            <form id="provisioning-form" onSubmit={handleSaveProvisioning} className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
              {/* Facility Identity Settings */}
              <div className="space-y-4">
                <div className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Server size={14} className="text-blue-700" />
                  HOSPITAL &amp; WARD TENANT IDENTITY
                </div>

                <div className="space-y-3 bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm">
                  <div>
                    <label className="text-xs text-slate-900 block mb-1.5 font-bold">Health System / Hospital Name</label>
                    <input 
                      type="text"
                      value={hospitalName}
                      onChange={e => setHospitalName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-950 text-sm focus:border-blue-600 outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-900 block mb-1.5 font-bold">Active Ward / Floor Unit Name</label>
                    <input 
                      type="text"
                      value={floorName}
                      onChange={e => setFloorName(e.target.value)}
                      required
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-950 text-sm focus:border-blue-600 outline-none font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-900 block mb-1.5 font-bold">Telemetry Unit Code</label>
                    <input 
                      type="text"
                      value={unitCode}
                      onChange={e => setUnitCode(e.target.value)}
                      required
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-950 text-sm focus:border-blue-600 outline-none font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Baseline Database Reset Section */}
              <div className="pt-4 border-t-2 border-slate-300 space-y-3">
                <div className="text-xs font-black text-rose-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <ShieldAlert size={14} />
                  ATOMIC DEMO PURGE &amp; DATABASE RESET
                </div>
                
                <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm space-y-2">
                  <p className="text-xs text-slate-700 font-mono font-bold">
                    Reset all beds, rooms, patient records, EVS sanitization tasks, and audit logs back to the standardized demonstration baseline.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetDatabaseToBaseline}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border-2 border-rose-300 text-xs font-mono font-black flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer mt-2"
                  >
                    <RotateCcw size={14} /> Purge &amp; Reset to Clinical Demonstration Baseline
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Drawer Footer */}
          {!savedSuccess && !resetSuccess && (
            <div className="p-4 bg-slate-100 border-t-2 border-slate-300 flex items-center justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-200 text-xs font-bold border-2 border-slate-300 bg-white transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="provisioning-form"
                className="px-6 py-2.5 rounded-xl font-black text-xs bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save size={16} /> Save Facility Changes
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
