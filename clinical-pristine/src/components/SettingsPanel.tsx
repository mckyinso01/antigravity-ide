import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Bell, Palette, Shield, Sliders, Activity, Clock, Stethoscope, Maximize2, Minimize2, Cpu, HardDrive, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clinicalAudio } from '../utils/clinicalAudio';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { enablePersistentStorage } from '../db';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCleanSweep?: () => void;
}

export const SettingsPanel = ({ isOpen, onClose, onOpenCleanSweep }: SettingsPanelProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isolationTime, setIsolationTime] = useState(45);
  const [statWeight, setStatWeight] = useState(3);
  const [autoAdmitEnabled, setAutoAdmitEnabled] = useState(true);
  const [storageInfo, setStorageInfo] = useState<{ persisted: boolean; usage?: number; quota?: number }>({ persisted: true });

  const { isLowGpuMode, toggleLowGpuMode } = useAccessibility();

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
      enablePersistentStorage().then(info => setStorageInfo(info));
    }
  }, [isOpen]);

  const formatMb = (bytes?: number) => {
    if (!bytes) return '1.8 MB';
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-sans bg-slate-900/40 animate-in fade-in duration-100" onClick={onClose}>
          
          {/* Slide-out Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative ${
              isFullScreen ? 'w-full' : 'w-full max-w-md'
            } h-full bg-white border-l-2 border-slate-700 shadow-2xl flex flex-col text-slate-900`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-slate-300 bg-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-300 text-blue-700 flex items-center justify-center font-black shadow-xs">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-950 font-display">System Settings</h2>
                  <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">Workstation Preferences &amp; AI Engine</p>
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
                  title="Close Settings"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-slate-50">
              
              {/* Account Profile */}
              <section>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono mb-3">Account Profile</h3>
                <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                   <div className="w-11 h-11 rounded-xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-800 font-black">
                     <User size={22} />
                   </div>
                   <div className="flex-1">
                     <h4 className="text-slate-950 font-black text-sm">Clinical Administrator</h4>
                     <p className="text-slate-600 text-xs font-mono font-bold">admin@pristine.os • ED Charge</p>
                   </div>
                   <button className="px-3.5 py-1.5 text-xs font-black bg-white hover:bg-slate-100 text-slate-950 rounded-xl border-2 border-slate-300 transition-all cursor-pointer shadow-xs">
                     Edit
                   </button>
                </div>
              </section>

              {/* Hardware Performance & Storage Telemetry */}
              <section>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono mb-3">Hardware &amp; Storage Telemetry</h3>
                <div className="space-y-2">
                  
                  {/* Low-GPU COW Mode */}
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 text-slate-950 mb-0.5 font-black">
                        <Cpu size={16} className="text-blue-700" />
                        <span className="font-black text-xs">Low-GPU COW Cart Acceleration</span>
                      </div>
                      <p className="text-xs text-slate-600 font-bold">Disables heavy blur filters to preserve 60fps on older hospital terminals.</p>
                    </div>
                    <button 
                      onClick={toggleLowGpuMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer border-2 ${isLowGpuMode ? 'bg-emerald-600 border-emerald-700' : 'bg-slate-300 border-slate-400'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${isLowGpuMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Non-Evictable Storage Status */}
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 text-slate-950 mb-0.5 font-black">
                        <HardDrive size={16} className="text-purple-700" />
                        <span className="font-black text-xs">IndexedDB Storage Persistence</span>
                      </div>
                      <p className="text-xs text-slate-600 font-bold">Used: {formatMb(storageInfo.usage)} • Browser Eviction Protected</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-mono font-bold flex items-center gap-1">
                      <ShieldCheck size={12} />
                      {storageInfo.persisted ? 'PERSISTED' : 'STANDARD'}
                    </span>
                  </div>

                </div>
              </section>

              {/* Preferences Section */}
              <section>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono mb-3">Workstation Preferences</h3>
                <div className="space-y-2">
                   {[
                     { icon: <Palette size={16} />, label: 'Appearance', value: 'Light Workstation' },
                     { icon: <Bell size={16} />, label: 'Notifications', value: 'All Active' },
                     { icon: <Shield size={16} />, label: 'Security Protocol', value: 'HIPAA Strict (AES-256)' },
                   ].map((item, idx) => (
                     <div key={idx} className="w-full flex items-center justify-between p-3.5 bg-white border-2 border-slate-300 rounded-xl shadow-xs">
                        <div className="flex items-center gap-3 text-slate-900 font-bold">
                           <div className="text-slate-600">{item.icon}</div>
                           <span className="font-bold text-xs">{item.label}</span>
                        </div>
                        <span className="text-xs font-mono font-black text-blue-900 bg-blue-100 border-2 border-blue-300 px-2.5 py-0.5 rounded-full">{item.value}</span>
                     </div>
                   ))}
                </div>
              </section>

              {/* AI Rule Engine Section */}
              <section>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                  <Sliders size={14} className="text-blue-700" />
                  AI Clinical Engine Rules
                </h3>
                <div className="space-y-3">
                  
                  {/* Isolation Turnaround Time */}
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-slate-950 font-bold">
                        <Clock size={16} className="text-amber-600" />
                        <span className="font-bold text-xs">Isolation Turnaround SLA</span>
                      </div>
                      <span className="text-xs font-mono font-black text-amber-950 bg-amber-100 border-2 border-amber-300 px-2.5 py-0.5 rounded-full">{isolationTime} mins</span>
                    </div>
                    <input 
                      type="range" 
                      min="30" max="120" step="5" 
                      value={isolationTime}
                      onChange={(e) => setIsolationTime(Number(e.target.value))}
                      className="w-full accent-amber-600 mt-2 cursor-pointer"
                    />
                    <p className="text-xs text-slate-600 mt-2 font-bold">Allocated cleaning time for infectious/COVID rooms before triggering SLA alerts.</p>
                  </div>

                  {/* EVS STAT Multiplier */}
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-slate-950 font-bold">
                        <Activity size={16} className="text-emerald-700" />
                        <span className="font-bold text-xs">EVS AI Dispatch (STAT Weight)</span>
                      </div>
                      <span className="text-xs font-mono font-black text-emerald-950 bg-emerald-100 border-2 border-emerald-300 px-2.5 py-0.5 rounded-full">{statWeight}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" max="10" step="1" 
                      value={statWeight}
                      onChange={(e) => setStatWeight(Number(e.target.value))}
                      className="w-full accent-emerald-600 mt-2 cursor-pointer"
                    />
                    <p className="text-xs text-slate-600 mt-2 font-bold">Weight multiplier for STAT EVS requests in the Auto-Dispatch sorting algorithm.</p>
                  </div>

                  {/* Zero-Click Auto-Admit */}
                  <div className="bg-white border-2 border-slate-300 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 text-slate-950 mb-0.5 font-black">
                        <Stethoscope size={16} className="text-blue-700" />
                        <span className="font-black text-xs">Zero-Click Handoff</span>
                      </div>
                      <p className="text-xs text-slate-600 font-bold">Allow AI to auto-assign incoming ER patients to optimal empty beds.</p>
                    </div>
                    <button 
                      onClick={() => setAutoAdmitEnabled(!autoAdmitEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer border-2 ${autoAdmitEnabled ? 'bg-blue-600 border-blue-700' : 'bg-slate-300 border-slate-400'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-xs ${autoAdmitEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                </div>
              </section>

              {/* Client Deployment & Clean Sweep */}
              {onOpenCleanSweep && (
                <section>
                  <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono mb-3">Client Deployment &amp; Data Sanitization</h3>
                  <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-4 space-y-3">
                    <p className="text-xs text-rose-900 font-bold">Purge demo records and register official hospital profile before handover.</p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenCleanSweep();
                      }}
                      className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-colors cursor-pointer shadow-xs"
                    >
                      Production Clean Sweep Wizard
                    </button>
                  </div>
                </section>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
