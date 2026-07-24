import React, { useState } from 'react';
import { DollarSign, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export const EnterprisePriceComparisonMatrix: React.FC = () => {
  const [headcount, setHeadcount] = useState(1);

  const competitorCost = headcount * 165000;
  const ourSaasCost = 249 * 12;
  const annualSavings = competitorCost - ourSaasCost;
  const savingsPercent = ((annualSavings / competitorCost) * 100).toFixed(1);

  return (
    <div className="theme-glacial-frost p-6 rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-600 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Section 20 Price & ROI Advantage Matrix</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Salary vs FleetPulse-AI Cost Advantage</h3>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{savingsPercent}% Client Savings</span>
        </span>
      </div>

      {/* Headcount Slider */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-slate-900">
          <span>Replaced Fleet Supervisor Headcount:</span>
          <span className="text-teal-700 font-extrabold text-sm">{headcount} Supervisor ({headcount * 450} Vehicles)</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={headcount}
          onChange={(e) => setHeadcount(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
        />
      </div>

      {/* ROI Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-1">
          <span className="font-semibold text-red-700">Traditional Headcount Cost</span>
          <p className="text-2xl font-extrabold text-red-950">${competitorCost.toLocaleString()} <span className="text-xs font-normal text-red-700">/yr</span></p>
          <p className="text-[11px] text-red-800">$165k/yr salary per supervisor</p>
        </div>

        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
          <span className="font-semibold text-teal-700">FleetPulse-AI SaaS Subscription</span>
          <p className="text-2xl font-extrabold text-teal-950">${ourSaasCost.toLocaleString()} <span className="text-xs font-normal text-teal-700">/yr</span></p>
          <p className="text-[11px] text-teal-800">$249/mo flat rate (Unlimited Vehicles)</p>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1">
          <span className="font-semibold text-emerald-800 flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Net Annual Savings</span>
          </span>
          <p className="text-2xl font-extrabold text-emerald-950">${annualSavings.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-800 font-bold">98.2% ROI In Your Pocket</p>
        </div>
      </div>
    </div>
  );
};
