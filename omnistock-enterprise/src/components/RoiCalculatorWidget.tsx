import React, { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface RoiPreset {
  label: string;
  team: number;
  fee: number;
  inflation: number;
  name: string;
}

interface RoiCalculatorWidgetProps {
  appName?: string;
  defaultBuyoutPrice?: number;
  defaultBuyoutTierName?: string;
  presets?: RoiPreset[];
  onSelectTier?: (tierName: string, priceFormatted: string) => void;
}

const DEFAULT_PRESETS: RoiPreset[] = [
  { label: 'Logiwa 3PL', team: 35, fee: 38000, inflation: 12, name: 'Logiwa Multi-Client 3PL' },
  { label: 'Manhattan WMS', team: 80, fee: 95000, inflation: 15, name: 'Manhattan Associates Enterprise' },
  { label: 'Fishbowl WMS', team: 20, fee: 18000, inflation: 10, name: 'Fishbowl Warehouse & Scanners' },
  { label: 'Custom Regional', team: 15, fee: 14000, inflation: 8, name: 'Regional 3PL Legacy Stack' },
];

export const RoiCalculatorWidget: React.FC<RoiCalculatorWidgetProps> = ({
  appName = 'OmniStock Spatial WMS',
  defaultBuyoutPrice = 25000,
  defaultBuyoutTierName = 'Tier 3: 100% Commercial IP Buyout',
  presets = DEFAULT_PRESETS,
  onSelectTier,
}) => {
  const [teamSize, setTeamSize] = useState(35);
  const [annualFee, setAnnualFee] = useState(38000);
  const [inflationRate, setInflationRate] = useState(10);
  const [activePreset, setActivePreset] = useState<string | null>('Logiwa 3PL');

  // Mathematical 3-Year Model
  const rate = inflationRate / 100;
  const y1 = annualFee;
  const y2 = y1 * (1 + rate);
  const y3 = y2 * (1 + rate);
  const legacyTotal = Math.round(y1 + y2 + y3);

  // Dynamic Tier Assignment
  let buyoutPrice = defaultBuyoutPrice;
  let targetTierName = defaultBuyoutTierName;
  if (annualFee <= 20000 && teamSize <= 25) {
    buyoutPrice = 4500;
    targetTierName = 'Tier 1: Single DC Facility ($4,500)';
  } else if (annualFee <= 50000 && teamSize <= 50) {
    buyoutPrice = 8500;
    targetTierName = 'Tier 2: Multi-Facility 3PL ($8,500)';
  } else {
    buyoutPrice = 25000;
    targetTierName = 'Tier 3: 100% Commercial IP ($25,000)';
  }

  const netSavings = Math.max(0, legacyTotal - buyoutPrice);
  const pctSavings = legacyTotal > 0 ? ((netSavings / legacyTotal) * 100).toFixed(1) : '90.0';
  const paybackMonths = annualFee > 0 ? ((buyoutPrice / annualFee) * 12).toFixed(1) : '2.8';

  const handleApplyPreset = (p: RoiPreset) => {
    setActivePreset(p.label);
    setTeamSize(p.team);
    setAnnualFee(p.fee);
    setInflationRate(p.inflation);
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-[#0A1020] border border-[#1E2D4D] space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1E2D4D]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold mb-2">
            <Sparkles size={12} />
            <span>EXECUTIVE CASH FLOW &amp; ROI ENGINE</span>
          </div>
          <h3 className="font-mono font-bold text-lg md:text-xl text-white">
            Zero-SaaS Buyout vs Annual Subscription Economics
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Model your multi-year operational savings switching to {appName} milestone ownership.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activePreset === p.label
                  ? 'bg-[#3A86FF] text-[#070B14] shadow-md shadow-[#3A86FF]/30'
                  : 'bg-[#0D1527] text-slate-400 hover:text-white border border-[#1E2D4D]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-4">
          {/* Team Size */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1E2D4D]">
            <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
              <span className="text-slate-400">Warehouse Staff &amp; Pickers:</span>
              <span className="font-bold text-[#6FFFE9]">{teamSize} Active Scanners</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={teamSize}
              onChange={(e) => {
                setTeamSize(Number(e.target.value));
                setActivePreset(null);
              }}
              className="w-full accent-[#3A86FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>5 Scanners</span>
              <span>75 Mid-Tier</span>
              <span>200+ Enterprise</span>
            </div>
          </div>

          {/* Current Legacy Fee */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1E2D4D]">
            <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
              <span className="text-slate-400">Current Legacy WMS Annual Spend:</span>
              <span className="font-bold text-amber-400">${annualFee.toLocaleString()} / year</span>
            </div>
            <input
              type="range"
              min="5000"
              max="150000"
              step="1000"
              value={annualFee}
              onChange={(e) => {
                setAnnualFee(Number(e.target.value));
                setActivePreset(null);
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>$5,000 / yr</span>
              <span>$75,000 / yr</span>
              <span>$150,000+ / yr</span>
            </div>
          </div>

          {/* Annual Price Increase */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-[#1E2D4D]">
            <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
              <span className="text-slate-400">Projected Vendor Price Escalation:</span>
              <span className="font-bold text-rose-400">{inflationRate}% / year compounding</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="1"
              value={inflationRate}
              onChange={(e) => {
                setInflationRate(Number(e.target.value));
                setActivePreset(null);
              }}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>5% (Modest)</span>
              <span>10% (Industry Standard)</span>
              <span>20% (Aggressive)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-[#070B14] border border-[#3A86FF]/40 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#1E2D4D] text-xs font-mono">
              <span className="text-slate-400">Target Deliverable Tier</span>
              <span className="font-bold text-[#6FFFE9] bg-[#121D36] px-2 py-0.5 rounded border border-[#2A4374]">
                {targetTierName.split('(')[0]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-center">
              <div className="p-3 rounded-2xl bg-[#0D1527] border border-rose-900/40">
                <div className="text-[10px] text-slate-400">3-Yr Legacy Spend</div>
                <div className="text-base font-bold text-rose-400 mt-0.5">${legacyTotal.toLocaleString()}</div>
                <div className="text-[9px] text-slate-500">Recurring Drain</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0D1527] border border-emerald-900/40">
                <div className="text-[10px] text-slate-400">1-Time Buyout</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">${buyoutPrice.toLocaleString()}</div>
                <div className="text-[9px] text-emerald-500">$0 in Y2 &amp; Y3</div>
              </div>
            </div>

            {/* Net Savings Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border border-emerald-500/40 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                Net 3-Year Cash Savings
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-mono mt-1">
                +${netSavings.toLocaleString()}
              </div>
              <div className="flex justify-center items-center gap-3 text-xs font-mono mt-2 pt-2 border-t border-emerald-500/20">
                <span className="text-emerald-300 font-bold">{pctSavings}% Saved</span>
                <span className="text-slate-500">•</span>
                <span className="text-[#6FFFE9] font-bold">{paybackMonths} Mo Breakeven</span>
              </div>
            </div>
          </div>

          {onSelectTier && (
            <button
              type="button"
              onClick={() => onSelectTier(targetTierName, `$${buyoutPrice.toLocaleString()}`)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#3A86FF] to-[#5BC0BE] hover:opacity-90 text-[#070B14] font-mono font-extrabold text-xs shadow-lg shadow-[#3A86FF]/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap size={14} className="fill-current" />
              <span>Acquire This Buyout Tier (${buyoutPrice.toLocaleString()})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
