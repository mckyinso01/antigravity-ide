import React, { useState } from 'react';
import type { PickOrder } from '../types';
import {
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HelpTooltip } from '../components/HelpTooltip';


interface WavePickingViewProps {
  orders: PickOrder[];
  onCompletePickItem: (orderId: string, itemIdx: number) => void;
  onDispatchWaveModal: () => void;
}

export const WavePickingView: React.FC<WavePickingViewProps> = ({
  orders,
  onCompletePickItem,
  onDispatchWaveModal
}) => {
  const [activeOrderId, setActiveOrderId] = useState<string>(orders[0]?.id || '');

  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0];

  const handlePickLine = (orderId: string, idx: number) => {
    onCompletePickItem(orderId, idx);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden font-sans">
      {/* Header */}
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3A86FF]/20 border border-[#3A86FF]/40 flex items-center justify-center text-[#3A86FF]">
            <Zap size={18} className="fill-current" />
          </div>
          <div>
            <h2 className="font-mono font-bold text-sm text-white">Wave Picking & Outbound Dispatch</h2>
            <span className="text-[10px] text-slate-400 font-mono">Eulerian Shortest-Path Execution Engine</span>
          </div>
        </div>

        <HelpTooltip
          title="Wave Batching Engine"
          purpose="Automatically consolidates active customer orders based on SKU proximity to minimize forklift transit time."
          howTo="Click to open the batch wave modal and dispatch a new Eulerian pick sequence."
          position="bottom"
        >
          <button
            onClick={onDispatchWaveModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#3A86FF] to-[#5BC0BE] text-[#070B14] font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-mono shadow-sm"
          >
            <Zap size={14} className="fill-current" />
            <span>Batch New Wave</span>
          </button>
        </HelpTooltip>
      </div>

      {/* Main Pick Execution Console */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
        {/* Left Orders Queue Rail */}
        <div className="border-r border-[#1E2D4D] bg-[#070B14] p-4 overflow-y-auto space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 block mb-2">
            Active Wave Orders ({orders.length})
          </span>

          {orders.map((ord) => {
            const isSelected = ord.id === activeOrder?.id;
            const completedItems = ord.items.filter(i => i.status === 'PICKED').length;
            const isFinished = completedItems === ord.items.length;

            return (
              <div
                key={ord.id}
                onClick={() => setActiveOrderId(ord.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${isSelected
                    ? 'bg-[#121D36] border-[#5BC0BE] shadow-lg glow-mint'
                    : 'bg-[#0D1527] border-[#1E2D4D] hover:border-slate-600'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-white">{ord.orderNumber}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${ord.priority === 'STAT' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                    {ord.priority}
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-sans">
                  <strong>{ord.clientName}</strong>
                  <span className="block text-[11px] text-slate-400 truncate">{ord.destination}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-[#1E2D4D]">
                  <span>Progress: <strong className={isFinished ? 'text-emerald-400' : 'text-white'}>{completedItems}/{ord.items.length} Picked</strong></span>
                  <span className="text-[#5BC0BE]">{ord.assignedPicker}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Order Item Checklist & Shortest-Path Route */}
        {activeOrder ? (
          <div className="lg:col-span-2 bg-[#0D1527] p-6 overflow-y-auto space-y-6 font-mono">
            <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-4">
              <div>
                <span className="text-xs text-[#5BC0BE] font-bold block">ORDER DETAILS</span>
                <h3 className="text-white text-lg font-bold">{activeOrder.orderNumber} • {activeOrder.clientName}</h3>
                <span className="text-xs text-slate-400">{activeOrder.destination}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Assigned Logistics Cart</span>
                <span className="text-white font-bold text-sm">{activeOrder.assignedPicker}</span>
              </div>
            </div>

            {/* Visual Pick Sequence Path */}
            <div className="p-4 rounded-xl bg-[#070B14] border border-[#1E2D4D] space-y-2">
              <span className="text-xs text-slate-400 font-bold block">
                OPTIMIZED PICK PATH (EULERIAN SEQUENCE):
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="px-2.5 py-1 rounded bg-[#121D36] text-slate-400">Dock Start</span>
                {activeOrder.optimalRoutePath.map((binCode, idx) => (
                  <React.Fragment key={idx}>
                    <ArrowRight size={14} className="text-[#5BC0BE]" />
                    <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                      Stop {idx + 1}: {binCode}
                    </span>
                  </React.Fragment>
                ))}
                <ArrowRight size={14} className="text-[#5BC0BE]" />
                <span className="px-2.5 py-1 rounded bg-[#121D36] text-emerald-400">Pack & Ship</span>
              </div>
            </div>

            {/* Pick Lines Table */}
            <div className="space-y-3">
              <span className="text-xs text-slate-300 font-bold block">Items to Pick & Verify:</span>
              <div className="space-y-2.5">
                {activeOrder.items.map((item, idx) => {
                  const isPicked = item.status === 'PICKED';
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all ${isPicked
                          ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-200'
                          : 'bg-[#121D36] border-[#2A4374] text-white'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#070B14] border border-[#1E2D4D] flex items-center justify-center font-bold text-xs text-[#5BC0BE]">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{item.skuCode}</span>
                            <span className="px-2 py-0.5 rounded bg-[#070B14] text-[#6FFFE9] text-[10px] font-bold">
                              BIN {item.binLocation}
                            </span>
                          </div>
                          <span className="text-xs text-slate-300 font-sans block">{item.name}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-white">Qty: {item.quantity}</span>
                        <button
                          onClick={() => handlePickLine(activeOrder.id, idx)}
                          disabled={isPicked}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isPicked
                              ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700 cursor-default'
                              : 'bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] shadow-sm'
                            }`}
                        >
                          <CheckCircle2 size={14} />
                          <span>{isPicked ? 'Verified' : 'Confirm Pick'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-2 flex items-center justify-center text-slate-500 font-mono text-xs">
            No active pick order selected.
          </div>
        )}
      </div>
    </div>
  );
};
