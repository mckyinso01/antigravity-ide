import React, { useState } from 'react';
import { Zap, HeartPulse } from 'lucide-react';

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

const DEFAULT_HEALTHCARE_PRESETS: RoiPreset[] = [
  { label: 'Epic Maintenance', team: 60, fee: 92000, inflation: 12, name: 'Epic Systems Annual Maintenance & EHR Modules' },
  { label: 'Cerner Millennium', team: 45, fee: 78000, inflation: 10, name: 'Cerner Health Network Suite' },
  { label: 'Meditech Expanse', team: 30, fee: 45000, inflation: 8, name: 'Meditech EHR / Floorplan Addon' },
  { label: 'Regional Hospital', team: 25, fee: 36000, inflation: 10, name: 'Independent Health Center Stack' },
];

export const RoiCalculatorWidget: React.FC<RoiCalculatorWidgetProps> = ({
  appName = 'Clinical Pristine OS',
  defaultBuyoutPrice = 35000,
  defaultBuyoutTierName = 'Tier 3: Enterprise Hospital Network ($35,000)',
  presets = DEFAULT_HEALTHCARE_PRESETS,
  onSelectTier,
}) => {
  const [teamSize, setTeamSize] = useState(40);
  const [annualFee, setAnnualFee] = useState(85000);
  const [inflationRate, setInflationRate] = useState(12);
  const [activePreset, setActivePreset] = useState<string | null>('Epic Maintenance');

  // Mathematical 3-Year Model
  const rate = inflationRate / 100;
  const y1 = annualFee;
  const y2 = y1 * (1 + rate);
  const y3 = y2 * (1 + rate);
  const legacyTotal = Math.round(y1 + y2 + y3);

  // Dynamic Tier Assignment
  let buyoutPrice = defaultBuyoutPrice;
  let targetTierName = defaultBuyoutTierName;
  if (annualFee <= 40000 && teamSize <= 30) {
    buyoutPrice = 6500;
    targetTierName = 'Tier 1: Single Facility Hospital ($6,500)';
  } else if (annualFee <= 75000 && teamSize <= 60) {
    buyoutPrice = 14500;
    targetTierName = 'Tier 2: Multi-Campus Health System ($14,500)';
  } else {
    buyoutPrice = 35000;
    targetTierName = 'Tier 3: Enterprise Hospital Network ($35,000)';
  }

  const netSavings = Math.max(0, legacyTotal - buyoutPrice);
  const pctSavings = legacyTotal > 0 ? ((netSavings / legacyTotal) * 100).toFixed(1) : '90.0';
  const paybackMonths = annualFee > 0 ? ((buyoutPrice / annualFee) * 12).toFixed(1) : '2.5';

  const handleApplyPreset = (p: RoiPreset) => {
    setActivePreset(p.label);
    setTeamSize(p.team);
    setAnnualFee(p.fee);
    setInflationRate(p.inflation);
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-[#09131F] border border-cyan-500/30 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono font-bold mb-2">
            <HeartPulse size={12} />
            <span>HOSPITAL CIO CASH FLOW &amp; BUYOUT ROI ENGINE</span>
          </div>
          <h3 className="font-bold text-lg md:text-xl text-white">
            Zero-SaaS Buyout vs Annual Epic / Cerner Maintenance Fees
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Model your multi-year operational savings switching to {appName} perpetual milestone ownership.
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
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
              <span className="text-slate-400">Nursing Stations &amp; Telemetry Beds:</span>
              <span className="font-bold text-cyan-400">{teamSize} Monitored Stations</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="10"
              value={teamSize}
              onChange={(e) => {
                setTeamSize(Number(e.target.value));
                setActivePreset(null);
              }}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>10 Beds</span>
              <span>100 Mid-Size Hospital</span>
              <span>250+ Regional Medical Center</span>
            </div>
          </div>

          {/* Current Legacy Fee */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
              <span className="text-slate-400">Current Legacy EHR / Maintenance Bill:</span>
              <span className="font-bold text-rose-400">${annualFee.toLocaleString()} / year</span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={annualFee}
              onChange={(e) => {
                setAnnualFee(Number(e.target.value));
                setActivePreset(null);
              }}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>$10,000 / yr</span>
              <span>$100,000 / yr</span>
              <span>$200,000+ / yr</span>
            </div>
          </div>

          {/* Annual Price Increase */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
              <span className="text-slate-400">EHR Vendor License Escalation Rate:</span>
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
              <span>12% (Healthcare Industry Standard)</span>
              <span>20% (Aggressive)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-slate-900/95 border border-cyan-500/40 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Recommended Healthcare Tier</span>
              <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                {targetTierName.split('(')[0]}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-center">
              <div className="p-3 rounded-2xl bg-[#0B1120] border border-rose-900/40">
                <div className="text-[10px] text-slate-400">3-Yr Legacy Spend</div>
                <div className="text-base font-bold text-rose-400 mt-0.5">${legacyTotal.toLocaleString()}</div>
                <div className="text-[9px] text-slate-500">Recurring Drain</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0B1120] border border-emerald-900/40">
                <div className="text-[10px] text-slate-400">1-Time Buyout</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">${buyoutPrice.toLocaleString()}</div>
                <div className="text-[9px] text-emerald-400">$0 in Y2 &amp; Y3</div>
              </div>
            </div>

            {/* Net Savings Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-950/80 border border-emerald-500/40 text-center">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                Net 3-Year Retained Hospital Capital
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white font-mono mt-1">
                +${netSavings.toLocaleString()}
              </div>
              <div className="flex justify-center items-center gap-3 text-xs font-mono mt-2 pt-2 border-t border-emerald-500/20">
                <span className="text-emerald-300 font-bold">{pctSavings}% Saved</span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-400 font-bold">{paybackMonths} Mo Breakeven</span>
              </div>
            </div>
          </div>

          {onSelectTier && (
            <button
              type="button"
              onClick={() => onSelectTier(targetTierName, `$${buyoutPrice.toLocaleString()}`)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap size={14} className="fill-current" />
              <span>Acquire Hospital Buyout License (${buyoutPrice.toLocaleString()})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
