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
    <div className="fixed inset-y-0 right-0 w-[420px] max-w-full z-50 bg-[#070B14]/98 border-l border-rose-800/80 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col h-full overflow-y-auto animate-slideLeft font-sans">
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-sm">
          <AlertTriangle size={18} />
          <span>Warehouse Clean Sweep</span>
        </div>
        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer">
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-4 font-mono text-xs flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-200 text-xs leading-relaxed">
            ⚠️ <strong>FACTORY PURGE WARNING:</strong> This will purge all custom inventory transfers, reset floorplan rack coordinates back to default Northeast Hub topology, and reload factory 3PL client test ledgers.
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Use this when you want a clean slate for demonstrating warehouse configuration, wave pick optimization, or multi-aisle grocery wayfinding.
          </p>
        </div>

        <div className="flex gap-2 pt-4 border-t border-[#1E2D4D]">
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
