import React from 'react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';


interface CleanSweepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const CleanSweepModal: React.FC<CleanSweepModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-[#070B14] border border-rose-800/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4 glow-danger">
        <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-3">
          <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Warehouse Clean Sweep & Factory Reset</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          This will purge all custom inventory adjustments, reset racking bays to default Northeast Hub layout, and reload factory 3PL client test ledgers.
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-[#0D1527] hover:bg-[#121D36] border border-[#1E2D4D] text-slate-300 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-lg"
          >
            <RotateCcw size={14} />
            <span>Execute Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
