import React, { useState } from 'react';
import type { BinSlot } from '../types';
import { 
  X, 
  Package, 
  MapPin, 
  Printer, 
  ArrowRightLeft, 
  CheckCircle2
} from 'lucide-react';

interface BinDetailDrawerProps {
  bin: BinSlot | null;
  onClose: () => void;
  onUpdateQuantity: (binId: string, newQty: number) => void;
  onTransfer: (binId: string, targetBinCode: string, qty: number) => void;
}

export const BinDetailDrawer: React.FC<BinDetailDrawerProps> = ({
  bin,
  onClose,
  onUpdateQuantity,
  onTransfer
}) => {
  if (!bin) return null;

  const [editQty, setEditQty] = useState<number>(bin.quantity);
  const [targetBin, setTargetBin] = useState<string>('B-04-L2');
  const [transferQty, setTransferQty] = useState<number>(10);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSaveQty = () => {
    onUpdateQuantity(bin.id, Number(editQty));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleTransfer = () => {
    if (transferQty > 0 && transferQty <= bin.quantity) {
      onTransfer(bin.id, targetBin, Number(transferQty));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handlePrintLabel = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      alert(`🖨️ Zebra ZT411 Print Spooler: Dispatched GS1-128 Label for Bin ${bin.code} / SKU ${bin.skuCode || 'N/A'}`);
    }, 800);
  };

  return (
    <div className="w-84 border-l border-[#1E2D4D] bg-[#070B14]/95 backdrop-blur-xl flex flex-col h-full shrink-0 z-20 font-sans shadow-2xl">
      {/* Header */}
      <div className="h-14 border-b border-[#1E2D4D] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#5BC0BE]" />
          <div>
            <h3 className="font-mono font-bold text-sm text-white">{bin.code}</h3>
            <span className="text-[10px] text-slate-400 font-mono">{bin.zone} • Level {bin.level}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
        {/* Status Pill & Velocity Class */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
          <span className="text-slate-400">Bay Occupancy:</span>
          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
            bin.status === 'OCCUPIED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
            bin.status === 'EMPTY' ? 'bg-slate-900 text-slate-400 border border-slate-700' :
            bin.status === 'QUARANTINE' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
            'bg-amber-950 text-amber-400 border border-amber-800'
          }`}>
            {bin.status}
          </span>
        </div>

        {/* Stored SKU Card */}
        {bin.skuCode ? (
          <div className="p-3 rounded-xl bg-[#121D36] border border-[#2A4374] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#5BC0BE] font-bold">STORED INVENTORY</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                CLASS {bin.velocityClass}
              </span>
            </div>
            <h4 className="text-white font-sans font-bold text-xs leading-snug">
              {bin.skuName}
            </h4>
            <div className="text-[10px] text-slate-400 space-y-0.5">
              <div>SKU: <strong className="text-slate-200">{bin.skuCode}</strong></div>
              <div>Lot/Batch: <strong className="text-slate-200">{bin.batchLot || 'LOT-2026-GEN-01'}</strong></div>
              <div>Expires: <strong className="text-amber-300">{bin.expiryDate || '2028-12-31'}</strong></div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#0D1527] border border-dashed border-[#1E2D4D] text-center text-slate-500">
            <Package size={24} className="mx-auto mb-1 opacity-40" />
            <p className="text-[11px]">Empty Bay Slot</p>
            <span className="text-[9px]">Ready for Inbound Put-Away</span>
          </div>
        )}

        {/* Real-Time Stock Cycle Count Adjustment */}
        <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
          <label className="text-slate-300 font-bold block text-[11px]">
            Cycle Count Adjustment (Qty):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={editQty}
              onChange={(e) => setEditQty(Number(e.target.value))}
              className="w-full bg-[#070B14] border border-[#1E2D4D] focus:border-[#5BC0BE] text-white px-3 py-1.5 rounded-lg outline-none font-bold text-xs"
            />
            <button
              onClick={handleSaveQty}
              className="bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs"
            >
              Update
            </button>
          </div>
        </div>

        {/* Fast Inter-Bay Transfer Tool */}
        {bin.quantity > 0 && (
          <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-2">
            <label className="text-slate-300 font-bold block text-[11px]">
              Forklift Inter-Bay Transfer:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[9px] text-slate-400 block mb-0.5">Target Bin</span>
                <input
                  type="text"
                  value={targetBin}
                  onChange={(e) => setTargetBin(e.target.value)}
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-white px-2.5 py-1.5 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block mb-0.5">Units Qty</span>
                <input
                  type="number"
                  value={transferQty}
                  onChange={(e) => setTransferQty(Number(e.target.value))}
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-white px-2.5 py-1.5 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
            <button
              onClick={handleTransfer}
              className="w-full mt-1 flex items-center justify-center gap-1.5 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 py-1.5 rounded-lg transition-all cursor-pointer text-xs font-bold"
            >
              <ArrowRightLeft size={13} className="text-[#5BC0BE]" />
              Execute Transfer
            </button>
          </div>
        )}

        {/* Print GS1 Barcode Label */}
        <button
          onClick={handlePrintLabel}
          disabled={isPrinting}
          className="w-full flex items-center justify-center gap-2 bg-[#0D1527] hover:bg-[#121D36] border border-[#1E2D4D] hover:border-[#5BC0BE] text-slate-200 py-2 rounded-xl transition-all cursor-pointer text-xs"
        >
          <Printer size={15} className="text-[#5BC0BE]" />
          <span>{isPrinting ? 'Spooling Zebra Driver...' : 'Print GS1-128 Shelf Label'}</span>
        </button>

        {saveSuccess && (
          <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-center text-[10px] flex items-center justify-center gap-1.5">
            <CheckCircle2 size={12} />
            <span>Warehouse state synchronized!</span>
          </div>
        )}
      </div>
    </div>
  );
};
