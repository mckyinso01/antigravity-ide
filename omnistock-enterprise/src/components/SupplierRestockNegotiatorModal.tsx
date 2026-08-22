import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Maximize2,
  Minimize2,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SupplierQuote {
  supplier: string;
  initialQuote: number;
  negotiatedQuote: number;
  discountPct: number;
  leadTimeDays: number;
  reliabilityScore: number;
  status: 'counter_offered' | 'accepted' | 'rejected';
}

interface SupplierRestockNegotiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  skuCode?: string;
  skuName?: string;
  currentStock?: number;
  reorderQuantity?: number;
}

export const SupplierRestockNegotiatorModal: React.FC<SupplierRestockNegotiatorModalProps> = ({
  isOpen,
  onClose,
  skuCode = "SKU-9924-STEEL",
  skuName = "Grade 60 Structural Deformed Rebar (16mm x 6m)",
  currentStock = 14,
  reorderQuantity = 500
}) => {
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [negotiationStep, setNegotiationStep] = useState(0);
  const [isPoIssued, setIsPoIssued] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'negotiator' | 'ar_forklift'>('negotiator');

  const quotes: SupplierQuote[] = [
    {
      supplier: "Pacific Heavy Steel Corp",
      initialQuote: 28500,
      negotiatedQuote: 24800,
      discountPct: 13.0,
      leadTimeDays: 2,
      reliabilityScore: 99.2,
      status: "accepted"
    },
    {
      supplier: "Apex Global Industrial Supply",
      initialQuote: 29800,
      negotiatedQuote: 26400,
      discountPct: 11.4,
      leadTimeDays: 3,
      reliabilityScore: 96.5,
      status: "counter_offered"
    },
    {
      supplier: "Manila Bay Logistics & Steel",
      initialQuote: 31000,
      negotiatedQuote: 28500,
      discountPct: 8.1,
      leadTimeDays: 4,
      reliabilityScore: 92.0,
      status: "rejected"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsNegotiating(true);
      setNegotiationStep(0);
      setIsPoIssued(false);

      const t1 = setTimeout(() => setNegotiationStep(1), 800);
      const t2 = setTimeout(() => setNegotiationStep(2), 1800);
      const t3 = setTimeout(() => {
        setNegotiationStep(3);
        setIsNegotiating(false);
      }, 3000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSaved = quotes[0].initialQuote - quotes[0].negotiatedQuote;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[140] bg-slate-950/60 backdrop-blur-xs flex justify-end font-sans animate-in fade-in duration-100"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-2xl'
          } bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl text-slate-100 font-sans`}
        >
          {/* Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Bot size={20} className={isNegotiating ? "animate-spin" : ""} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-white font-mono">Autonomous Supplier Restock AI</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40">
                    SPOT-QUOTE ENGINE
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Automated Multi-Supplier Bidding &amp; Spatial AR Navigation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-rose-500/20 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pt-3 bg-slate-950/60 border-b border-slate-800 flex gap-4 text-xs font-mono">
            <button
              onClick={() => setActiveTab('negotiator')}
              className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'negotiator' 
                  ? 'text-cyan-400 border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              🤖 Spot-Quote Restock AI
            </button>
            <button
              onClick={() => setActiveTab('ar_forklift')}
              className={`pb-2.5 font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'ar_forklift' 
                  ? 'text-cyan-400 border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              🥽 Spatial AR Forklift HUD
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar bg-slate-900/90 text-sm">
            
            {activeTab === 'negotiator' ? (
              <>
                {/* SKU Trigger Ribbon */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold rounded border border-rose-500/30">
                        LOW STOCK ALERT ({currentStock} Units)
                      </span>
                      <span className="text-xs font-mono text-cyan-400">{skuCode}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">{skuName}</h3>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="text-slate-400 block">Target Reorder:</span>
                    <span className="text-white font-bold">{reorderQuantity} Units</span>
                  </div>
                </div>

                {/* AI Multi-Party Negotiation Status */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-800/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                      <Sparkles size={16} className={isNegotiating ? "animate-pulse" : ""} />
                      {isNegotiating ? "AI AGENT PARALLEL NEGOTIATION IN PROGRESS..." : "3 SUPPLIER QUOTES COMPARED & OPTIMIZED"}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      Saved ₱{totalSaved.toLocaleString()} (-13.0%)
                    </span>
                  </div>

                  {/* Negotiation Terminal Feed */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                    <p className={negotiationStep >= 0 ? "text-cyan-300" : "text-slate-600"}>
                      [0.1s] Request for Quote dispatched to 3 certified suppliers for {reorderQuantity} units.
                    </p>
                    <p className={negotiationStep >= 1 ? "text-amber-300" : "text-slate-600"}>
                      [1.2s] Pacific Heavy Steel initial: ₱28,500 ➔ AI Counter: ₱24,800 citing volume contract.
                    </p>
                    <p className={negotiationStep >= 2 ? "text-emerald-300 font-bold" : "text-slate-600"}>
                      [2.8s] ✓ Pacific Heavy Steel accepted ₱24,800 (Lead time: 48h, Reliability: 99.2%).
                    </p>
                  </div>
                </div>

                {/* Quotes Comparison Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Supplier Spot Bids Matrix
                  </h4>

                  {quotes.map((q, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        q.status === 'accepted'
                          ? 'bg-emerald-950/20 border-emerald-500/50 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{q.supplier}</span>
                            {q.status === 'accepted' && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                                🏆 BEST SPOT BID
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                            <span>Lead: {q.leadTimeDays} Days</span>
                            <span>•</span>
                            <span>Score: {q.reliabilityScore}%</span>
                          </div>
                        </div>

                        <div className="text-right font-mono">
                          <div className="text-xs line-through text-slate-500">₱{q.initialQuote.toLocaleString()}</div>
                          <div className="text-sm font-bold text-emerald-400">₱{q.negotiatedQuote.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Issue Purchase Order Container */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-cyan-400" />
                      Digital Purchase Order #PO-2026-8924
                    </span>
                    <span className="text-emerald-400 font-bold">Net Total: ₱24,800.00</span>
                  </div>

                  <button
                    onClick={() => setIsPoIssued(true)}
                    disabled={isPoIssued}
                    className={`w-full py-2.5 rounded-xl font-bold font-mono text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isPoIssued 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md font-black'
                    }`}
                  >
                    {isPoIssued ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>✓ PO Signed &amp; Dispatched via EDI Gateway</span>
                      </>
                    ) : (
                      <>
                        <span>Approve &amp; Dispatch PO to Pacific Heavy Steel (Save ₱3,700)</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              /* AR Forklift HUD View */
              <div className="space-y-4 font-mono">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-400 flex items-center gap-2">
                      <Compass size={16} className="animate-spin" />
                      SPATIAL AR FORKLIFT GUIDANCE • ACTIVE
                    </span>
                    <span className="text-slate-400">SPEED: 6.2 km/h</span>
                  </div>

                  {/* Simulated AR Camera Viewport */}
                  <div className="h-56 rounded-xl bg-slate-900 border border-cyan-500/30 relative flex flex-col justify-between p-4 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:24px_24px]" />
                    
                    <div className="flex justify-between items-start z-10 text-xs">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg">
                        TARGET: AISLE 04 • RACK B-12
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg">
                        ETA: 24 SECONDS
                      </span>
                    </div>

                    {/* Glowing Navigation Direction Arrows */}
                    <div className="text-center z-10 space-y-1">
                      <div className="text-2xl text-cyan-400 animate-bounce">▲</div>
                      <div className="text-xs text-cyan-300 font-bold">STRAIGHT 15m ➔ TURN RIGHT AT PILLAR 08</div>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400 z-10">
                      <span>FORKLIFT ID: FL-04 (Lead Tech: Santos)</span>
                      <span>COLLISION SENSORS: CLEAR</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300">
                  <p>• Shortest-Path Euclidean A* Algorithm active across 48 warehouse aisles.</p>
                  <p>• Bin confirmation automatically triggers warehouse inventory decrement.</p>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs font-mono transition-colors cursor-pointer"
            >
              Close (Esc)
            </button>

            <button
              onClick={() => alert("PO Exported to ERP & Accounting Ledger.")}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer font-black"
            >
              <FileSpreadsheet size={16} />
              <span>Export PO to ERP</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
