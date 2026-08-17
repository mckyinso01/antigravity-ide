import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Siren, 
  Printer, 
  X, 
  Heart,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { clinicalAudio } from '../utils/clinicalAudio';

interface AclsAuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AclsAuditLogModal = ({
  isOpen,
  onClose
}: AclsAuditLogModalProps) => {
  const aclsLogs = useLiveQuery(() => db.aclsLogs.toArray(), []) || [];
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
            isFullScreen ? 'w-full' : 'w-full max-w-2xl'
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900 transition-all duration-300`}
        >
          {/* Drawer Header */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-rose-400 flex items-center justify-center text-rose-700 shadow-xs">
                <Siren size={22} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">Code Blue ACLS Debrief Logs</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 border-2 border-rose-300 text-rose-950 text-xs font-mono font-black">
                    AHA PROTOCOL
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  Cardiac Arrest Chronology • Defibrillation &amp; Epinephrine Timelines
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

          {/* Logs List Body */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
            {aclsLogs.length === 0 ? (
              <div className="py-16 text-center text-slate-500 font-mono text-sm space-y-3 bg-white rounded-2xl border-2 border-slate-300 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-rose-700 mx-auto font-black">
                  <Heart size={24} />
                </div>
                <p className="text-slate-950 font-black text-base">No active resuscitation events logged for this shift.</p>
                <p className="text-xs text-slate-600 font-bold">Events are automatically recorded when Code Blue is triggered.</p>
              </div>
            ) : (
              aclsLogs.map((log) => (
                <div 
                  key={log.id}
                  className="p-5 rounded-2xl bg-white border-2 border-slate-300 shadow-sm space-y-3 font-mono"
                >
                  <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-950 text-sm font-sans">{log.codeLeader}</span>
                      <span className="text-xs text-slate-600 font-bold">({log.arrestTime})</span>
                    </div>
                    <span className="text-xs text-rose-950 font-black px-2.5 py-0.5 rounded-full bg-rose-100 border-2 border-rose-300">
                      {log.initialRhythm}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">CPR DURATION</span>
                      <span className="text-slate-950 font-black">{log.cprMinutes} mins</span>
                    </div>
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">SHOCKS DELIVERED</span>
                      <span className="text-amber-800 font-black">{log.shocksDelivered?.length || 0}</span>
                    </div>
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">MEDS GIVEN</span>
                      <span className="text-purple-800 font-black">{log.medicationsAdministered?.length || 0} doses</span>
                    </div>
                    <div className="bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300">
                      <span className="text-slate-600 block text-[10px] font-bold">OUTCOME</span>
                      <span className={`font-black ${log.outcome === 'ROSC' ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {log.outcome === 'ROSC' ? 'ROSC Achieved' : log.outcome}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 pt-1 flex items-center justify-between font-bold">
                    <span>Documenter: <strong className="text-slate-950">{log.codeDocumenter}</strong></span>
                    <span>Date: <strong className="text-slate-950">{log.eventDate}</strong></span>
                  </div>
                  {log.summaryNotes && (
                    <div className="text-xs text-slate-900 bg-slate-100 p-2.5 rounded-xl border-2 border-slate-300 font-bold">
                      {log.summaryNotes}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-100 border-t-2 border-slate-300 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl font-black text-xs bg-white hover:bg-slate-50 text-slate-950 border-2 border-slate-400 hover:border-slate-800 flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer uppercase"
            >
              <Printer size={16} /> Print ACLS Log
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 border-2 border-blue-700 cursor-pointer uppercase"
            >
              Close (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
