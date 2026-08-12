import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Bell, Palette, Shield, LogOut, Sliders, Activity, Clock, Stethoscope } from 'lucide-react';
import { useState } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [isolationTime, setIsolationTime] = useState(45);
  const [statWeight, setStatWeight] = useState(3);
  const [autoAdmitEnabled, setAutoAdmitEnabled] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-sans">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050811]/60 backdrop-blur-sm"
          />

          {/* Slide-out Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md h-full bg-[#0B1C30]/95 border-l border-slate-700/80 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-black/20 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">System Settings</h2>
                <p className="text-xs text-slate-400 mt-1">Manage your preferences</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              
              {/* Profile Section */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Account</h3>
                <div className="bg-[#050811] border border-slate-800/50 rounded-xl p-4 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/50 flex items-center justify-center text-[#2563EB]">
                     <User size={24} />
                   </div>
                   <div className="flex-1">
                     <h4 className="text-white font-bold">Admin User</h4>
                     <p className="text-slate-400 text-sm">admin@pristine.os</p>
                   </div>
                   <button className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all active:scale-95">
                     Edit
                   </button>
                </div>
              </section>

              {/* Preferences Section */}
              <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Preferences</h3>
                <div className="space-y-2">
                   {[
                     { icon: <Palette size={18} />, label: 'Appearance', value: 'Dark Glass' },
                     { icon: <Bell size={18} />, label: 'Notifications', value: 'All Active' },
                     { icon: <Shield size={18} />, label: 'Security Level', value: 'Strict' },
                   ].map((item, idx) => (
                     <button key={idx} className="w-full flex items-center justify-between p-4 bg-[#050811] hover:bg-slate-800/50 border border-slate-800/50 hover:border-slate-700 rounded-xl transition-all active:scale-95 group">
                        <div className="flex items-center gap-3 text-slate-300 group-hover:text-white transition-colors">
                           <div className="text-slate-500 group-hover:text-[#2563EB] transition-colors">{item.icon}</div>
                           <span className="font-medium">{item.label}</span>
                        </div>
                        <span className="text-xs font-mono text-[#2563EB] bg-[#2563EB]/10 px-2 py-1 rounded-md">{item.value}</span>
                     </button>
                   ))}
                </div>
              </section>

              {/* No-Code Rule Engine Section */}
              <section>
                <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Sliders size={16} />
                  AI Workflow Engine Rules
                </h3>
                <div className="space-y-4">
                  
                  {/* Isolation Turnaround Time */}
                  <div className="bg-[#050811] border border-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock size={16} className="text-amber-500" />
                        <span className="font-medium text-sm">Isolation Turnaround SLA</span>
                      </div>
                      <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">{isolationTime} mins</span>
                    </div>
                    <input 
                      type="range" 
                      min="30" max="120" step="5" 
                      value={isolationTime}
                      onChange={(e) => setIsolationTime(Number(e.target.value))}
                      className="w-full accent-amber-500 mt-2"
                    />
                    <p className="text-[10px] text-slate-500 mt-2">Allocated cleaning time for infectious/COVID rooms before triggering SLA alerts.</p>
                  </div>

                  {/* EVS STAT Multiplier */}
                  <div className="bg-[#050811] border border-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Activity size={16} className="text-emerald-500" />
                        <span className="font-medium text-sm">EVS AI Dispatch (STAT Weight)</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">{statWeight}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" max="10" step="1" 
                      value={statWeight}
                      onChange={(e) => setStatWeight(Number(e.target.value))}
                      className="w-full accent-emerald-500 mt-2"
                    />
                    <p className="text-[10px] text-slate-500 mt-2">Weight multiplier for STAT EVS requests in the Auto-Dispatch sorting algorithm.</p>
                  </div>

                  {/* Zero-Click Auto-Admit */}
                  <div className="bg-[#050811] border border-slate-800/50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-slate-300 mb-1">
                        <Stethoscope size={16} className="text-[#2563EB]" />
                        <span className="font-medium text-sm">Zero-Click Handoff</span>
                      </div>
                      <p className="text-[10px] text-slate-500">Allow AI to auto-assign incoming ER patients to optimal empty beds.</p>
                    </div>
                    <button 
                      onClick={() => setAutoAdmitEnabled(!autoAdmitEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoAdmitEnabled ? 'bg-[#2563EB]' : 'bg-slate-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoAdmitEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-800/80 bg-black/20 shrink-0">
               <button 
                 onClick={() => window.location.href = '/login'}
                 className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-xl font-bold transition-all active:scale-95"
               >
                 <LogOut size={18} />
                 Sign Out
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
