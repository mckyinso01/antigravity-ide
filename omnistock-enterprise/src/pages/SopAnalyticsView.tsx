import React from 'react';
import type { SkuItem, WarehouseStats } from '../types';
import { 
  TrendingUp, 
  AlertTriangle, 
  ArrowUpRight
} from 'lucide-react';
import { HelpTooltip } from '../components/HelpTooltip';

interface SopAnalyticsViewProps {
  skus: SkuItem[];
  stats: WarehouseStats;
}

export const SopAnalyticsView: React.FC<SopAnalyticsViewProps> = ({
  skus,
  stats
}) => {
  const criticalSkus = skus.filter(s => s.stockoutRisk === 'CRITICAL' || s.stockQty <= s.reorderPoint);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden font-sans">
      {/* Header */}
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <TrendingUp size={18} />
          </div>
          <div>
            <h2 className="font-mono font-bold text-sm text-white">S&OP Inventory Velocity & Demand Forecasting</h2>
            <span className="text-[10px] text-slate-400 font-mono">Stockout Risk Predictor • Gross Margin ROI (GMROI)</span>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 bg-[#121D36] border border-[#2A4374] text-[#6FFFE9] rounded-lg font-bold">
          Model Confidence: 99.4%
        </span>
      </div>

      {/* Main Analytics Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto font-mono text-xs">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1">
            <span className="text-slate-400 text-[10px] block">GROSS MARGIN ROI (GMROI)</span>
            <div className="text-emerald-400 font-bold text-2xl flex items-center gap-1">
              <span>3.42x</span>
              <ArrowUpRight size={18} />
            </div>
            <span className="text-[10px] text-slate-400 font-sans">+0.68 vs industry benchmark (2.74x)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1">
            <span className="text-slate-400 text-[10px] block">ANNUAL INVENTORY TURNOVER</span>
            <div className="text-[#5BC0BE] font-bold text-2xl">14.2 Turns</div>
            <span className="text-[10px] text-slate-400 font-sans">High velocity fast-fulfillment tier</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1">
            <span className="text-slate-400 text-[10px] block">STORAGE UTILIZATION RATE</span>
            <div className="text-white font-bold text-2xl">{stats.utilizationRate}%</div>
            <span className="text-[10px] text-slate-400 font-sans">{stats.occupiedBins} of {stats.totalCapacityBins} bins occupied</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1">
            <span className="text-slate-400 text-[10px] block">PREDICTIVE STOCKOUT RISK</span>
            <div className="text-rose-400 font-bold text-2xl">{criticalSkus.length} SKUs</div>
            <span className="text-[10px] text-rose-300 font-sans">Requires replenishment PO</span>
          </div>
        </div>

        {/* Critical Stockout Alerts Table */}
        <div className="bg-[#0D1527] border border-rose-900/60 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle size={18} />
              <span>Predictive Stockout Early Warning Radar</span>
            </div>
            <span className="text-[10px] text-slate-400">Dynamic Reorder Points (ROP) Active</span>
          </div>

          <div className="bg-[#070B14] border border-[#1E2D4D] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#1E2D4D] bg-[#121D36] text-slate-400">
                  <th className="p-3">SKU CODE</th>
                  <th className="p-3">ITEM DESCRIPTION</th>
                  <th className="p-3 text-right">CURRENT STOCK</th>
                  <th className="p-3 text-right">REORDER POINT (ROP)</th>
                  <th className="p-3 text-right">DAYS OF COVER</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2D4D]/60 text-slate-300">
                {criticalSkus.map((sku) => (
                  <tr key={sku.id} className="hover:bg-[#121D36]/80 transition-colors">
                    <td className="p-3 font-bold text-rose-400">{sku.skuCode}</td>
                    <td className="p-3 text-white font-sans font-medium">{sku.name}</td>
                    <td className="p-3 text-right font-bold text-white">{sku.stockQty}</td>
                    <td className="p-3 text-right text-amber-300 font-bold">{sku.reorderPoint}</td>
                    <td className="p-3 text-right text-rose-400 font-bold">2.4 Days</td>
                    <td className="p-3 text-right">
                      <HelpTooltip
                        title="Autonomous Purchase Order Generator"
                        purpose="Automatically generates vendor restock Purchase Orders based on lead time and daily burn rate to prevent stockouts."
                        howTo="Click to generate and transmit the replenishment order to the accredited manufacturer."
                        position="left"
                      >
                        <button 
                          onClick={() => alert(`📦 Autonomous EDI PO dispatched for SKU ${sku.skuCode} (Qty: 250 units)!`)}
                          className="px-3 py-1 bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold rounded-lg transition-all cursor-pointer text-[10px]"
                        >
                          Auto-Generate PO
                        </button>
                      </HelpTooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
