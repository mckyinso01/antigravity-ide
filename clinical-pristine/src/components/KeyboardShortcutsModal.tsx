import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { clinicalAudio } from '../utils/clinicalAudio';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K', action: 'Universal Command Palette & Patient Spotlight Jump', category: 'Global Search' },
    { key: 'Alt + A', action: 'Open Patient Admission & Bed Allocation Drawer', category: 'Clinical Admission' },
    { key: 'Alt + S', action: 'Open 1-Click SBAR Shift Handover Report', category: 'Clinical Handover' },
    { key: 'Alt + B', action: '2-Nurse Dual Sign-Off Blood Transfusion Protocol', category: 'Patient Safety' },
    { key: 'Alt + L', action: 'Phlebotomy Specimen Tube Barcode Dispenser', category: 'Laboratory' },
    { key: 'Alt + C', action: 'Trigger / Stand Down Code Blue Resuscitation', category: 'Emergency' },
    { key: 'Alt + E', action: 'Open Evacuation Blueprint Scanner', category: 'Hospital Tools' },
    { key: 'Esc', action: 'Close any active Drawer, Modal, or Command HUD', category: 'Global Navigation' },
    { key: '1 / 2 / 3 / 4', action: 'Quick Navigate: Command Center / Beds / EVS / Alerts', category: 'Ward Navigation' },
    { key: '?', action: 'Toggle this Keyboard Shortcuts Command Deck', category: 'Help' }
  ];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[140] bg-slate-900/40 flex justify-end font-sans"
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
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-300 flex items-center justify-center text-blue-700 font-black shadow-xs">
                <Keyboard size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">ER &amp; ICU Keyboard Command Deck</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    HOTKEYS
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  High-speed clinical workflow hotkeys for emergency clinicians
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

          {/* Shortcuts Grid */}
          <div className="flex-1 p-6 space-y-3 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
            <div className="text-xs font-black text-slate-950 uppercase tracking-wider font-mono mb-2">
              RAPID HOSPITAL ACTIONS &amp; SHORTCUTS
            </div>

            {shortcuts.map((sc, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white border-2 border-slate-300 shadow-sm flex items-center justify-between hover:border-slate-500 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="space-y-0.5 pr-4">
                  <span className="text-slate-950 font-black block text-sm">{sc.action}</span>
                  <span className="text-xs text-slate-600 font-mono uppercase font-black">{sc.category}</span>
                </div>
                <kbd className="px-3 py-1.5 rounded-xl bg-slate-100 border-2 border-slate-300 text-blue-900 font-mono font-black text-xs shadow-xs flex-shrink-0">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-100 border-t-2 border-slate-300 flex items-center justify-between text-xs font-mono text-slate-700 font-bold flex-shrink-0">
            <span className="flex items-center gap-1.5 text-slate-800 font-bold">
              <Sparkles size={14} className="text-blue-700" />
              Press <kbd className="px-1.5 py-0.5 bg-white border-2 border-slate-300 rounded text-blue-900 font-black shadow-xs">?</kbd> anytime to open this deck.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs transition-all border-2 border-blue-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              Close (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
