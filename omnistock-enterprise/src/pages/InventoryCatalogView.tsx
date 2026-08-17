import React, { useState } from 'react';
import type { SkuItem, BinSlot } from '../types';
import { 
  Package, 
  Search, 
  Plus
} from 'lucide-react';
import { HelpTooltip } from '../components/HelpTooltip';

interface InventoryCatalogViewProps {
  skus: SkuItem[];
  bins?: BinSlot[];
  onAddSku: (sku: SkuItem) => void;
  onOpenScanner?: () => void;
}

export const InventoryCatalogView: React.FC<InventoryCatalogViewProps> = ({
  skus,
  onAddSku
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newCat] = useState('General Merchandise');
  const [newBarcode] = useState('');
  const [newQty, setNewQty] = useState(100);
  const [newBin, setNewBin] = useState('A-02-L1');

  const categories = ['ALL', ...Array.from(new Set(skus.map(s => s.category)))];

  const filteredSkus = skus.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.skuCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.barcode.includes(searchTerm);
    const matchesCat = categoryFilter === 'ALL' || s.category === categoryFilter;
    const matchesRisk = riskFilter === 'ALL' || s.stockoutRisk === riskFilter;
    return matchesSearch && matchesCat && matchesRisk;
  });

  const handleCreateSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName) return;
    const item: SkuItem = {
      id: `sku-${Date.now()}`,
      skuCode: newCode,
      name: newName,
      category: newCat,
      barcode: newBarcode || String(Math.floor(Math.random() * 900000000000 + 100000000000)),
      rfidTag: `E280116060000${Math.floor(Math.random() * 900000000 + 100000000)}`,
      unitCost: 45.0,
      retailPrice: 89.0,
      stockQty: Number(newQty),
      allocatedQty: 0,
      safetyStock: 25,
      reorderPoint: 50,
      leadTimeDays: 7,
      primaryBin: newBin,
      clientId: 'client-1',
      weightKg: 2.5,
      turnoverRate: 12.0,
      stockoutRisk: 'LOW'
    };
    onAddSku(item);
    setIsAddModalOpen(false);
    setNewCode('');
    setNewName('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden font-sans">
      {/* Action Header */}
      <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#5BC0BE]">
            <Package size={18} />
          </div>
          <div>
            <h2 className="font-mono font-bold text-sm text-white">Master SKU & Inventory Catalog</h2>
            <span className="text-[10px] text-slate-400 font-mono">{filteredSkus.length} Active SKUs Registered</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <HelpTooltip
            title="Create New Master SKU"
            purpose="Magrehistro ng bagong produkto sa master catalog na may kasamang GS1 barcode, RFID tag, safety stock threshold, at unit cost."
            howTo="I-click ang button upang buksan ang modal at punan ang mga detalye ng bagong SKU."
            position="bottom"
          >
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm glow-mint"
            >
              <Plus size={15} />
              <span>Add New SKU</span>
            </button>
          </HelpTooltip>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 border-b border-[#1E2D4D] bg-[#0D1527]/50 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by SKU Code, Description, Barcode..."
              className="w-full bg-[#070B14] border border-[#1E2D4D] focus:border-[#5BC0BE] text-white rounded-xl pl-8 pr-3 py-1.5 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#070B14] border border-[#1E2D4D] text-slate-300 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-[#070B14] border border-[#1E2D4D] text-slate-300 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="CRITICAL">Critical Stockout</option>
          </select>
        </div>
      </div>

      {/* SKU Table Ledger */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-[#0D1527] border border-[#1E2D4D] rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1E2D4D] bg-[#121D36] text-slate-400 text-[11px]">
                <th className="p-3">SKU CODE</th>
                <th className="p-3">ITEM DESCRIPTION</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">GS1 BARCODE</th>
                <th className="p-3 text-right">ON-HAND</th>
                <th className="p-3 text-right">SAFETY STOCK</th>
                <th className="p-3">PRIMARY BIN</th>
                <th className="p-3">TURNOVER</th>
                <th className="p-3">RISK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2D4D]/60 text-slate-300">
              {filteredSkus.map((sku) => (
                <tr key={sku.id} className="hover:bg-[#121D36]/80 transition-colors">
                  <td className="p-3 font-bold text-[#6FFFE9]">{sku.skuCode}</td>
                  <td className="p-3 font-sans text-white font-medium max-w-xs truncate">{sku.name}</td>
                  <td className="p-3 text-slate-400">{sku.category}</td>
                  <td className="p-3 text-slate-400 font-mono">{sku.barcode}</td>
                  <td className="p-3 text-right font-bold text-white">{sku.stockQty}</td>
                  <td className="p-3 text-right text-slate-400">{sku.safetyStock}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-[#070B14] border border-[#1E2D4D] text-[#5BC0BE] font-bold">
                      {sku.primaryBin}
                    </span>
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">{sku.turnoverRate}x</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sku.stockoutRisk === 'CRITICAL' 
                        ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse' 
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {sku.stockoutRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add SKU Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#070B14] border border-[#2A4374] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl font-mono text-xs glow-mint">
            <h3 className="text-white font-bold text-sm">Register New Enterprise SKU</h3>
            <form onSubmit={handleCreateSku} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">SKU Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ELEC-SENS-4K"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg outline-none font-bold"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Item Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4K Infrared Proximity Sensor"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Initial Qty</label>
                  <input
                    type="number"
                    value={newQty}
                    onChange={(e) => setNewQty(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Primary Bin Slot</label>
                  <input
                    type="text"
                    value={newBin}
                    onChange={(e) => setNewBin(e.target.value)}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg outline-none font-bold"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-[#0D1527] text-slate-300 py-2.5 rounded-xl border border-[#1E2D4D] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#5BC0BE] text-[#070B14] font-bold py-2.5 rounded-xl cursor-pointer glow-mint"
                >
                  Save & Slot SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
