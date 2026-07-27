import React, { useState } from 'react';
import { X, Sliders, DollarSign, Globe, Check, AlertTriangle, RefreshCw, Zap } from 'lucide-react';

export default function CampaignBudgetOptimizerModal({ campaignId, isOpen, onClose }) {
  const [ecpmFloor, setEcpmFloor] = useState(15.00);
  const [ecpmCeiling, setEcpmCeiling] = useState(85.00);
  const [pacingMode, setPacingMode] = useState('EVEN_STANDARD');
  const [dailyBudget, setDailyBudget] = useState(50000);
  const [currency, setCurrency] = useState('USD');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Currency Conversion Factors
  const currencyRates = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    JPY: { symbol: '¥', rate: 155.40 }
  };

  const currentSymbol = currencyRates[currency].symbol;
  const convertedBudget = (dailyBudget * currencyRates[currency].rate).toLocaleString();

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="w-full max-w-xl bg-[#1A1F26] border-l border-[#2D3748] h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
        <div className="space-y-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2D3748]">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#FF4500]/10 rounded-xl text-[#FF4500] border border-[#FF4500]/30">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Campaign Budget & eCPM Optimizer</h3>
                <p className="text-xs text-slate-400 font-mono">Campaign ID: {campaignId || 'cmp_acme_cloud_2026'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* eCPM Target Threshold Sliders */}
          <div className="bg-[#0F1419] p-5 rounded-2xl border border-[#2D3748] space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">1. eCPM Floor & Ceiling Tuning</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Minimum eCPM Floor:</span>
                <span className="text-emerald-400 font-bold">{currentSymbol}{ecpmFloor.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="0.5"
                value={ecpmFloor}
                onChange={e => setEcpmFloor(parseFloat(e.target.value))}
                className="w-full accent-[#FF4500] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Maximum eCPM Ceiling:</span>
                <span className="text-emerald-400 font-bold">{currentSymbol}{ecpmCeiling.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="1.0"
                value={ecpmCeiling}
                onChange={e => setEcpmCeiling(parseFloat(e.target.value))}
                className="w-full accent-[#FF4500] cursor-pointer"
              />
            </div>
          </div>

          {/* Pacing Mode Selector */}
          <div className="bg-[#0F1419] p-5 rounded-2xl border border-[#2D3748] space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">2. Budget Pacing Algorithm</h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPacingMode('EVEN_STANDARD')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${pacingMode === 'EVEN_STANDARD' ? 'bg-[#FF4500]/20 border-[#FF4500] text-white' : 'bg-[#1A1F26] border-[#2D3748] text-slate-400 hover:text-slate-200'}`}
              >
                Standard Even
              </button>

              <button
                onClick={() => setPacingMode('ACCELERATED')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${pacingMode === 'ACCELERATED' ? 'bg-[#FF4500]/20 border-[#FF4500] text-white' : 'bg-[#1A1F26] border-[#2D3748] text-slate-400 hover:text-slate-200'}`}
              >
                Accelerated Peak
              </button>

              <button
                onClick={() => setPacingMode('STRICT_CAP')}
                className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${pacingMode === 'STRICT_CAP' ? 'bg-[#FF4500]/20 border-[#FF4500] text-white' : 'bg-[#1A1F26] border-[#2D3748] text-slate-400 hover:text-slate-200'}`}
              >
                Strict Cap Limit
              </button>
            </div>
          </div>

          {/* Daily Budget & Currency Switcher */}
          <div className="bg-[#0F1419] p-5 rounded-2xl border border-[#2D3748] space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">3. Daily Budget & Multi-Currency</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Daily Cap Amount:</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-sm">{currentSymbol}</span>
                  <input
                    type="number"
                    value={dailyBudget}
                    onChange={e => setDailyBudget(Number(e.target.value))}
                    className="w-full bg-[#1A1F26] border border-[#2D3748] rounded-xl pl-8 pr-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FF4500]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Currency Filter:</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="w-full bg-[#1A1F26] border border-[#2D3748] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#FF4500]"
                >
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                  <option value="JPY">JPY (¥ - Japanese Yen)</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex justify-between">
              <span>Converted Daily Budget:</span>
              <span className="text-[#FF4500] font-bold">{currentSymbol}{convertedBudget} {currency}</span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-6 border-t border-[#2D3748] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#0F1419] text-slate-400 hover:text-white border border-[#2D3748] rounded-xl text-sm font-medium transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#FF4500] hover:bg-[#FF4500]/90 text-white rounded-xl text-sm font-bold shadow-lg shadow-[#FF4500]/20 transition-all flex items-center space-x-2"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Configuration Saved!</span>
              </>
            ) : (
              <span>Apply Optimization Rules</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
