import React, { useState } from 'react';
import type { PickOrder } from '../types';
import { 
  X, 
  Zap, 
  Clock, 
  Truck, 
  Layers,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WavePickOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: PickOrder[];
  onDispatchWave: (orderIds: string[]) => void;
}

export const WavePickOptimizerModal: React.FC<WavePickOptimizerModalProps> = ({
  isOpen,
  onClose,
  orders,
  onDispatchWave
}) => {
  if (!isOpen) return null;

  const [selectedOrders, setSelectedOrders] = useState<string[]>(orders.map(o => o.id));

  const handleToggleOrder = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(o => o !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const handleRunOptimization = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };


  const handleDispatch = () => {
    onDispatchWave(selectedOrders);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className="bg-[#070B14] border border-[#2A4374] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col glow-blue">
        {/* Header */}
        <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3A86FF]/20 border border-[#3A86FF]/40 flex items-center justify-center text-[#3A86FF]">
              <Zap size={18} className="fill-current" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white">Eulerian Wave Pick Optimization Engine</h3>
              <span className="text-[10px] text-slate-400 font-mono">Multi-Order Batching • Shortest-Path Walk Slasher</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 font-mono text-xs">
          {/* Metrics Savings Callout */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
              <span className="text-[10px] text-slate-400 block mb-1">Pick Travel Distance</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-base">
                <TrendingDown size={18} />
                <span>-38.4%</span>
              </div>
              <span className="text-[9px] text-slate-500">Saved 420 meters</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
              <span className="text-[10px] text-slate-400 block mb-1">Wave Cycle Time</span>
              <div className="flex items-center gap-1.5 text-[#5BC0BE] font-bold text-base">
                <Clock size={16} />
                <span>11.4 min</span>
              </div>
              <span className="text-[9px] text-slate-500">vs 19.8 min manual</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
              <span className="text-[10px] text-slate-400 block mb-1">Batch SKU Volume</span>
              <div className="flex items-center gap-1.5 text-white font-bold text-base">
                <Layers size={16} />
                <span>4 SKUs</span>
              </div>
              <span className="text-[9px] text-slate-500">Combined in 1 Cart</span>
            </div>
          </div>

          {/* Orders Batch Checklist */}
          <div className="space-y-2">
            <span className="text-[11px] text-slate-300 font-bold block">
              Pending Orders for Wave Allocation:
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => handleToggleOrder(ord.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedOrders.includes(ord.id)
                      ? 'bg-[#121D36] border-[#5BC0BE]/60 text-white'
                      : 'bg-[#0D1527] border-[#1E2D4D] text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(ord.id)}
                      onChange={() => {}}
                      className="rounded accent-[#5BC0BE]"
                    />
                    <div>
                      <span className="font-bold text-white block">{ord.orderNumber}</span>
                      <span className="text-[10px] text-slate-400 font-sans">{ord.clientName} • {ord.destination}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    ord.priority === 'STAT' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {ord.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculated Sequence preview */}
          <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D]">
            <span className="text-[10px] text-slate-400 block mb-1.5 font-bold">
              GENERATED EULERIAN PICK SEQUENCE:
            </span>
            <div className="flex items-center gap-1.5 text-slate-300 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">DOCK STAGE</span>
              <ArrowRight size={12} className="text-[#5BC0BE]" />
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">A-01-L1</span>
              <ArrowRight size={12} className="text-[#5BC0BE]" />
              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px]">B-02-L2</span>
              <ArrowRight size={12} className="text-[#5BC0BE]" />
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">E-01-L1</span>
              <ArrowRight size={12} className="text-[#5BC0BE]" />
              <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px]">F-02-L1</span>
              <ArrowRight size={12} className="text-[#5BC0BE]" />
              <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 text-[10px]">PACK & SHIP</span>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleRunOptimization}
              className="flex-1 bg-[#121D36] hover:bg-[#1E2D4D] border border-[#2A4374] text-slate-200 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap size={14} className="text-[#5BC0BE]" />
              <span>Re-calculate Eulerian Path</span>
            </button>
            <button
              onClick={handleDispatch}
              className="flex-1 bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] hover:opacity-90 text-[#070B14] py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg glow-mint"
            >
              <Truck size={14} />
              <span>Dispatch Wave to Forklifts</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
