import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Shield, Activity, Cpu, Database, Network } from 'lucide-react';

interface SystemSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemSpecsModal = ({ isOpen, onClose }: SystemSpecsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050811]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-4xl bg-[#0B1C30]/95 border border-slate-700/80 rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.15)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-black/20 shrink-0">
              <div className="flex items-center gap-3">
                <Terminal size={24} className="text-[#2563EB]" />
                <div>
                  <h2 className="text-xl font-bold text-white tracking-wide">CLINICAL PRISTINE OS</h2>
                  <p className="text-xs font-mono text-[#2563EB] uppercase tracking-widest mt-1">Architecture & System Specifications</p>
                </div>
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
              
              <section>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu size={18} className="text-slate-400" />
                  5 Autonomous Background Modules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Activity className="text-[#2563EB]" />, title: 'Real-time WebGL Renderer', desc: 'Powers the 60fps topographical hospital map without DOM repaints.' },
                    { icon: <Database className="text-emerald-500" />, title: 'Offline-First Telemetry Sync', desc: 'Dexie.js integration ensures zero data loss during network drops.' },
                    { icon: <Shield className="text-rose-500" />, title: 'Threat Intelligence Engine', desc: 'Monitors socket health and physical access security breaches.' },
                    { icon: <Network className="text-amber-500" />, title: 'EVS Logistics Router', desc: 'Calculates shortest path and optimal assignments for field agents.' },
                    { icon: <Terminal className="text-purple-500" />, title: 'Zero-Defect Audit Daemon', desc: 'Continuous background evaluation of UI state integrity.' },
                  ].map((mod, idx) => (
                    <div key={idx} className="bg-[#050811] border border-slate-800/50 p-4 rounded-xl flex gap-4 hover:border-slate-600 transition-colors">
                      <div className="shrink-0 mt-1">{mod.icon}</div>
                      <div>
                        <h4 className="font-bold text-slate-200 text-sm">{mod.title}</h4>
                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">{mod.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-slate-400" />
                  10 Flagship Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    'Unified Bed Orchestration (Zero-Scroll)',
                    'Asymmetric Split-Screen Context Panels',
                    '4-State Journey Protocol (Loading, Empty, Error, Full)',
                    'Zero-Undefined Defensive Data Architecture',
                    'Kinetic Moving Border Interactivity',
                    'High-Contrast Dark Mode (#050811 & #0B1C30)',
                    'Micro-Animations via Framer Motion',
                    'Chronological Threat Event Streaming',
                    'Kanban-style Field App with Dual Queues',
                    '100% Edge-to-Edge Responsive Viewport'
                  ].map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></div>
                       {cap}
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800/80 bg-black/20 shrink-0 text-center flex justify-between items-center text-xs text-slate-500 font-mono">
               <span>v1.0.0-zero-defect</span>
               <span>Built with React + Vite + Tailwind + Framer Motion</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
