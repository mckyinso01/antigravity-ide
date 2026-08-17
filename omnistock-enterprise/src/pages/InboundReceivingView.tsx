import React, { useState } from 'react';
import type { SkuItem, BinSlot } from '../types';
import { 
  ArrowDownToLine, 
  Barcode, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HelpTooltip } from '../components/HelpTooltip';

interface InboundReceivingViewProps {
  skus: SkuItem[];
  bins: BinSlot[];
  onReceiveInbound: (skuCode: string, qty: number, targetBin: string) => void;
  onOpenScanner: () => void;
}

export const InboundReceivingView: React.FC<InboundReceivingViewProps> = ({
  skus,
  bins: _bins,
  onReceiveInbound,
  onOpenScanner
}) => {

  const [selectedSkuCode, setSelectedSkuCode] = useState<string>(skus[0]?.skuCode || '');
  const [receiveQty, setReceiveQty] = useState<number>(120);
  const [targetBin, setTargetBin] = useState<string>('A-02-L1');
  const [poNumber, setPoNumber] = useState<string>('PO-2026-8492');
  const [carrier, setCarrier] = useState<string>('FedEx Freight');
  const [isReceived, setIsReceived] = useState<boolean>(false);

  const selectedSku = skus.find(s => s.skuCode === selectedSkuCode) || skus[0];

  const handleReceive = (e: React.FormEvent) => {
    e.preventDefault();
    if (receiveQty > 0) {
      onReceiveInbound(selectedSkuCode, Number(receiveQty), targetBin);
      setIsReceived(true);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
      setTimeout(() => setIsReceived(false), 3000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden font-sans">
      {/* Header */}
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ArrowDownToLine size={18} />
          </div>
          <div>
            <h2 className="font-mono font-bold text-sm text-white">Inbound Receiving & Smart Put-Away Dock</h2>
            <span className="text-[10px] text-slate-400 font-mono">Dock Gate 01-04 • Automated Pallet Slotting</span>
          </div>
        </div>

        <HelpTooltip
          title="Inbound Barcode Decoupler"
          purpose="Awtomatikong bina-basa ang GS1-128 shipping labels sa papasok na mga pallet upang auto-fill ang PO at SKU manifest."
          howTo="I-click upang buksan ang camera scanner at i-scan ang shipping container label."
          position="bottom"
        >
          <button
            onClick={onOpenScanner}
            className="flex items-center gap-1.5 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer font-mono"
          >
            <Barcode size={15} className="text-[#5BC0BE]" />
            <span>Scan Inbound Barcode</span>
          </button>
        </HelpTooltip>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 p-6 gap-6 overflow-y-auto font-mono text-xs">
        {/* Left: Inbound Manifest & PO Form */}
        <div className="bg-[#0D1527] border border-[#1E2D4D] rounded-2xl p-6 space-y-4 shadow-xl">
          <span className="text-xs font-bold text-[#5BC0BE] block">INBOUND PO MANIFEST DOCK</span>
          <form onSubmit={handleReceive} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Purchase Order (PO #)</label>
                <input
                  type="text"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-white p-2 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Freight Carrier</label>
                <input
                  type="text"
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-white p-2 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Select Incoming SKU</label>
              <select
                value={selectedSkuCode}
                onChange={(e) => setSelectedSkuCode(e.target.value)}
                className="w-full bg-[#070B14] border border-[#1E2D4D] text-white p-2 rounded-lg font-bold cursor-pointer"
              >
                {skus.map(s => (
                  <option key={s.id} value={s.skuCode}>{s.skuCode} - {s.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Received Units Qty</label>
                <input
                  type="number"
                  value={receiveQty}
                  onChange={(e) => setReceiveQty(Number(e.target.value))}
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-white p-2 rounded-lg font-bold text-sm"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Target Put-Away Bay</label>
                <input
                  type="text"
                  value={targetBin}
                  onChange={(e) => setTargetBin(e.target.value)}
                  className="w-full bg-[#070B14] border border-[#1E2D4D] text-[#6FFFE9] p-2 rounded-lg font-bold text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-[#5BC0BE] hover:opacity-90 text-[#070B14] py-3 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg glow-mint text-xs mt-2"
            >
              <CheckCircle2 size={16} />
              <span>Verify & Inbound Pallet to Stock</span>
            </button>
          </form>

          {isReceived && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-center font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              <span>PO Received & Ingested into Floor Inventory!</span>
            </div>
          )}
        </div>

        {/* Right: AI Smart Slotting Recommendation */}
        <div className="bg-[#0D1527] border border-[#1E2D4D] rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles size={14} />
                AI SMART SLOTTING SUGGESTION
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                CLASS {(selectedSku && selectedSku.turnoverRate > 10) ? 'A' : 'B'} VELOCITY
              </span>
            </div>

            <p className="text-slate-300 font-sans leading-relaxed text-xs">
              Based on historical pick frequency (<strong>{selectedSku?.turnoverRate || 12}x annual turns</strong>), OmniStock AI recommends slotting this SKU in <strong>Lower Racking Level 1 or 2</strong> in Aisle A or B to minimize forklift lifting cycles.
            </p>


            <div className="p-4 rounded-xl bg-[#121D36] border border-[#2A4374] space-y-2">
              <div className="text-white font-bold text-sm">{selectedSku?.name}</div>
              <div className="text-slate-400 text-[11px] space-y-1">
                <div>Current Stock: <strong className="text-white">{selectedSku?.stockQty} units</strong></div>
                <div>Primary Location: <strong className="text-[#6FFFE9]">{selectedSku?.primaryBin}</strong></div>
                <div>GS1 Barcode: <strong className="text-slate-200">{selectedSku?.barcode}</strong></div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#070B14] border border-[#1E2D4D] text-slate-400 text-[10px] space-y-1">
            <div className="flex justify-between">
              <span>Forklift Dispatch Route:</span>
              <strong className="text-slate-200">Dock 02 ➔ Bay {targetBin}</strong>
            </div>
            <div className="flex justify-between">
              <span>Estimated Put-Away Time:</span>
              <strong className="text-emerald-400">1.8 minutes</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
