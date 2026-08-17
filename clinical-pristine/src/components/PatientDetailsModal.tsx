import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Siren, 
  LogOut, 
  User, 
  Maximize2, 
  Minimize2,
  AlertTriangle
} from 'lucide-react';
import { db, type BedData } from '../db';
import { useToast } from '../contexts/ToastContext';
import { useEmergency } from '../contexts/EmergencyContext';
import { clinicalAudio } from '../utils/clinicalAudio';

interface Props {
  bed: BedData | null;
  onClose: () => void;
  onUpdate?: () => void;
}

export const PatientDetailsModal = ({ bed, onClose, onUpdate }: Props) => {
  const { showToast } = useToast();
  const { triggerCodeBlue } = useEmergency();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (bed) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [bed]);

  if (!bed) return null;

  const safety = bed.patientSafety;
  const isOccupied = bed.status === 'occupied';

  const handleDischarge = async () => {
    if (!bed) return;
    try {
      const isolationType = safety?.isolation || 'none';
      
      let ppeRequired = ['Gloves', 'Gown'];
      let chemicalProtocol = 'Standard Quaternary Ammonium Disinfectant';
      let priority: 'routine' | 'urgent' | 'stat' = 'urgent';

      if (isolationType === 'cdiff') {
        ppeRequired = ['Gloves', 'Fluid-Resistant Gown', 'Shoe Covers'];
        chemicalProtocol = 'Sporicidal Sodium Hypochlorite (Bleach) — 4 Min Wet Contact Time (NO ALCOHOL)';
        priority = 'stat';
      } else if (isolationType === 'airborne') {
        ppeRequired = ['N95 Respirator', 'Eye Protection', 'Gloves', 'Gown'];
        chemicalProtocol = 'UV-C Terminal Disinfection Robot + HEPA Air Purge (20 Min)';
        priority = 'stat';
      } else if (isolationType === 'contact') {
        ppeRequired = ['Gloves', 'Contact Gown'];
        chemicalProtocol = 'Enhanced Hospital-Grade Disinfectant Wipe Protocol';
        priority = 'urgent';
      }

      await db.beds.update(bed.id, {
        status: 'cleaning',
        acuity: 'none',
        evsStatus: 'pending',
        tat: 30
      });

      if (bed.room) {
        await db.rooms.update(bed.room, {
          status: 'cleaning',
          acuity: 'none'
        });
      }

      await db.evsTasks.add({
        id: `EVS-${Date.now()}`,
        room: bed.room,
        bedId: bed.id,
        priority,
        status: 'pending',
        requestTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isolationType,
        ppeRequired,
        chemicalProtocol
      });

      clinicalAudio.playSuccessChime();
      showToast(`Patient discharged from ${bed.id}. Terminal sanitization task dispatched to EVS.`, 'success');
      onUpdate?.();
      onClose();
    } catch (err) {
      console.error('Discharge Error:', err);
      showToast('Failed to process discharge in database.', 'error');
    }
  };

  const handleTriggerCodeBlue = () => {
    triggerCodeBlue(`${bed.room} (${bed.id})`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-slate-900/40 z-[130] flex justify-end font-sans"
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
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black font-mono text-sm border-2 shadow-xs ${
                bed.status === 'occupied' ? (bed.acuity === 'critical' ? 'bg-rose-100 border-rose-400 text-rose-950' : 'bg-blue-100 border-blue-400 text-blue-950') :
                bed.status === 'cleaning' ? 'bg-amber-100 border-amber-400 text-amber-950' :
                'bg-emerald-100 border-emerald-400 text-emerald-950'
              }`}>
                {bed.id}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">
                    {bed.patientName || (bed.status === 'empty' ? 'Available Bay' : 'Sanitization in Progress')}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-md bg-white border-2 border-slate-300 text-slate-900 text-xs font-mono font-black uppercase">
                    {bed.room}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  {bed.status === 'occupied' ? `Status: OCCUPIED (${bed.acuity.toUpperCase()})` : `Status: ${bed.status.toUpperCase()}`}
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

          {/* Drawer Body */}
          {isOccupied && safety ? (
            <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm font-sans bg-slate-50">
              {/* Clinical Snapshot */}
              <div className="p-5 rounded-2xl bg-white border-2 border-slate-300 shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-3 border-b-2 border-slate-200 text-xs font-mono">
                  <span className="text-slate-600 font-bold">MRN: <strong className="text-blue-700 font-black">{safety.mrn}</strong></span>
                  <span className="text-slate-600 font-bold">AGE: <strong className="text-slate-950 font-black">{safety.age} yo</strong> ({safety.gender})</span>
                  <span className="text-slate-600 font-bold">ADMITTED: <strong className="text-slate-950 font-black">{safety.admittedAt}</strong></span>
                </div>

                <div>
                  <div className="text-xs text-slate-600 font-mono uppercase mb-1 font-black">Chief Complaint &amp; Diagnosis:</div>
                  <div className="text-slate-950 font-black text-base leading-snug">{safety.chiefComplaint}</div>
                </div>

                {/* Vitals Telemetry */}
                {safety.vitals && (
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t-2 border-slate-200 text-center font-mono text-xs">
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">BP</span>
                      <span className="text-slate-950 font-black">{safety.vitals.bp}</span>
                    </div>
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">HR</span>
                      <span className="text-rose-700 font-black">{safety.vitals.hr}</span>
                    </div>
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">SpO2</span>
                      <span className="text-blue-700 font-black">{safety.vitals.spo2}%</span>
                    </div>
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">TEMP</span>
                      <span className="text-amber-700 font-black">{safety.vitals.temp}°C</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Safety Precautions */}
              <div className="p-5 rounded-2xl bg-white border-2 border-slate-300 shadow-sm space-y-3">
                <div className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono">
                  CLINICAL SAFETY PRECAUTIONS
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono font-bold">
                  <div className="p-3 rounded-xl bg-slate-100 border-2 border-slate-300">
                    <span className="text-slate-600 block text-[10px] font-bold">ISOLATION PROTOCOL</span>
                    <span className="text-slate-950 font-black uppercase">{safety.isolation}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border-2 border-slate-300">
                    <span className="text-slate-600 block text-[10px] font-bold">FALL RISK</span>
                    <span className={`font-black flex items-center gap-1 ${safety.fallRisk ? 'text-rose-700' : 'text-slate-950'}`}>
                      {safety.fallRisk ? (
                        <>
                          <AlertTriangle size={13} className="text-rose-700" />
                          <span>High Fall Risk</span>
                        </>
                      ) : (
                        <span>Standard</span>
                      )}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border-2 border-slate-300">
                    <span className="text-slate-600 block text-[10px] font-bold">NPO STATUS</span>
                    <span className="text-slate-950 font-black">{safety.npo ? 'Strict NPO' : 'Diet Allowed'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border-2 border-slate-300">
                    <span className="text-slate-600 block text-[10px] font-bold">CODE STATUS</span>
                    <span className="text-slate-950 font-black">{safety.dnr ? 'DNR (Do Not Resuscitate)' : 'Full Code'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3 text-slate-600 font-mono bg-slate-50 font-bold">
              <User size={36} className="text-slate-500" />
              <p className="text-xs">Bay {bed.id} is currently {bed.status.toUpperCase()}.</p>
            </div>
          )}

          {/* Sticky Drawer Footer */}
          {isOccupied && (
            <div className="p-4 bg-slate-100 border-t-2 border-slate-300 flex items-center justify-between gap-3 flex-shrink-0">
              <button 
                onClick={handleTriggerCodeBlue}
                className="px-4 py-2.5 rounded-xl font-black text-xs bg-rose-600 hover:bg-rose-700 text-white border-2 border-rose-700 flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer uppercase"
              >
                <Siren size={16} /> Code Blue Bay
              </button>

              <button 
                onClick={handleDischarge}
                className="px-5 py-2.5 rounded-xl font-black text-xs bg-white hover:bg-slate-50 text-slate-950 border-2 border-slate-400 hover:border-slate-800 flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer uppercase"
              >
                <LogOut size={16} /> Discharge &amp; EVS Disinfect
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
