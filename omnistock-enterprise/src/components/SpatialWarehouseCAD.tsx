import React, { useState } from 'react';
import type { BinSlot, PickOrder } from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  Zap, 
  Navigation, 
  Flame,
  Search,
  Layers,
  ChevronRight
} from 'lucide-react';
import { HelpTooltip } from './HelpTooltip';

interface SpatialWarehouseCADProps {
  bins: BinSlot[];
  activeOrder?: PickOrder;
  selectedBin: BinSlot | null;
  onSelectBin: (bin: BinSlot) => void;
  onOpenOptimizer: () => void;
}

export const SpatialWarehouseCAD: React.FC<SpatialWarehouseCADProps> = ({
  bins,
  activeOrder,
  selectedBin,
  onSelectBin,
  onOpenOptimizer
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [showPickPath, setShowPickPath] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredBin, setHoveredBin] = useState<BinSlot | null>(null);
  const [showManifestHUD, setShowManifestHUD] = useState<boolean>(true);
  const [manifestSearch, setManifestSearch] = useState<string>('');

  // Filter bins by vertical racking level
  const currentLevelBins = bins.filter(b => b.level === selectedLevel);

  // Filter items on current level for HUD manifest
  const occupiedLevelBins = currentLevelBins.filter(b => b.quantity > 0 && b.skuCode);
  const filteredManifest = occupiedLevelBins.filter(b => 
    b.skuName?.toLowerCase().includes(manifestSearch.toLowerCase()) ||
    b.skuCode?.toLowerCase().includes(manifestSearch.toLowerCase()) ||
    b.code.toLowerCase().includes(manifestSearch.toLowerCase())
  );

  // Get active pick bin codes from activeOrder
  const activePickBinCodes = activeOrder 
    ? activeOrder.items.map(i => i.binLocation)
    : ['A-01-L1', 'B-02-L2', 'E-01-L1'];

  const getBinColor = (bin: BinSlot) => {
    if (selectedBin?.id === bin.id) return '#6FFFE9';
    if (activePickBinCodes.includes(bin.code)) return '#38BDF8';
    if (showHeatmap) {
      if (bin.velocityClass === 'A') return '#10B981';
      if (bin.velocityClass === 'B') return '#3B82F6';
      if (bin.velocityClass === 'C') return '#F59E0B';
      return '#334155';
    }
    if (bin.status === 'EMPTY') return '#1E293B';
    if (bin.status === 'QUARANTINE') return '#A855F7';
    if (bin.status === 'RESERVED') return '#EAB308';
    if (bin.zone === 'Cold Vault') return '#06B6D4';
    if (bin.velocityClass === 'A') return '#10B981';
    return '#3B82F6';
  };

  // Generate Eulerian path coordinates
  const pickCoordinates = currentLevelBins
    .filter(b => activePickBinCodes.includes(b.code))
    .map(b => ({ x: b.x + 12, y: b.y + 12, code: b.code }));

  const pathPoints = [
    { x: 30, y: 380, code: 'STAGING DOCK' },
    ...pickCoordinates,
    { x: 740, y: 380, code: 'PACK & SHIP' }
  ];

  const pathString = pathPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden relative font-sans">
      {/* Top HUD Controls Bar */}
      <div className="h-12 border-b border-[#1E2D4D] bg-[#0D1527]/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5BC0BE] animate-ping"></span>
            SPATIAL CAD DIGITAL TWIN • LEVEL {selectedLevel}
          </span>

          {/* Level Switcher (1 to 4) with HelpTooltip */}
          <HelpTooltip
            title="Vertical Tier Switcher"
            purpose="Nagpapalit ng tinitingnang palapag (L1 hanggang L4) ng mga high-bay storage racks."
            howTo="Pindutin ang L1 para sa ground floor picking o L2–L4 para sa matataas na forklift bays."
            position="bottom"
          >
            <div className="flex items-center bg-[#070B14] border border-[#1E2D4D] rounded-lg p-0.5">
              {[1, 2, 3, 4].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-[#5BC0BE] text-[#070B14] shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  L{lvl}
                </button>
              ))}
            </div>
          </HelpTooltip>

          {/* Toggle Level Manifest HUD with HelpTooltip */}
          <HelpTooltip
            title="Level Items Manifest Drawer"
            purpose="Ipinapakita ang searchable side list ng lahat ng naka-imbak na gamot, baterya, at parts sa kasalukuyang palapag."
            howTo="I-click ang button upang buksan/isara ang manifest list at mag-locate ng item sa mapa."
            position="bottom"
          >
            <button
              onClick={() => setShowManifestHUD(!showManifestHUD)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                showManifestHUD
                  ? 'bg-[#1C2D52] text-[#6FFFE9] border-[#5BC0BE]/50'
                  : 'bg-[#121D36] text-slate-400 border-[#1E2D4D] hover:text-slate-200'
              }`}
            >
              <Layers size={13} className="text-[#5BC0BE]" />
              <span>Level Items HUD ({occupiedLevelBins.length})</span>
            </button>
          </HelpTooltip>
        </div>

        {/* Action Toggles & Eulerian Optimizer Button */}
        <div className="flex items-center gap-2">
          {/* Heatmap Toggle with HelpTooltip */}
          <HelpTooltip
            title="Velocity Heatmap Toggle"
            purpose="Kinukulayan ang racks ayon sa demand velocity: Berde (Class A Fast-Movers) vs Asul (Class B) vs Dilaw (Class C)."
            howTo="I-click upang makita kung saang racks pinakamadalas mag-pull ng inventory."
            position="bottom"
          >
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                showHeatmap 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 glow-amber' 
                  : 'bg-[#121D36] text-slate-400 border-[#1E2D4D] hover:text-slate-200'
              }`}
            >
              <Flame size={13} className={showHeatmap ? 'text-amber-400' : 'text-slate-400'} />
              <span>Velocity Heatmap</span>
            </button>
          </HelpTooltip>

          {/* Eulerian Wave Pick Path Toggle with HelpTooltip */}
          <HelpTooltip
            title="Eulerian Pick Path Router"
            purpose="Ipinapakita ang neon shortest-path trail na nag-uugnay sa Dock Inbound, Pick Bins, at Pack & Ship."
            howTo="I-click upang ipakita o itago ang optimized forklift route guide."
            position="bottom"
          >
            <button
              onClick={() => setShowPickPath(!showPickPath)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                showPickPath 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 glow-mint' 
                  : 'bg-[#121D36] text-slate-400 border-[#1E2D4D] hover:text-slate-200'
              }`}
            >
              <Navigation size={13} className="text-emerald-400" />
              <span>Eulerian Pick Route</span>
            </button>
          </HelpTooltip>

          {/* Wave Pick Optimizer Modal Trigger with HelpTooltip */}
          <HelpTooltip
            title="Wave Batch Optimizer"
            purpose="Binubuksan ang multi-order batching algorithm upang pagsamahin ang mga customer orders sa iisang mabilis na pick wave."
            howTo="I-click upang suriin ang kabuuang bigat, oras na matitipid, at i-dispatch ang wave sa mga forklift cart."
            position="bottom"
          >
            <button
              onClick={onOpenOptimizer}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#3A86FF] to-[#5BC0BE] hover:opacity-95 text-[#070B14] font-bold text-xs px-3 py-1 rounded-lg shadow-sm cursor-pointer font-mono"
            >
              <Zap size={13} className="fill-current stroke-[2]" />
              <span>Optimize Wave</span>
            </button>
          </HelpTooltip>

          {/* Zoom controls with HelpTooltip */}
          <HelpTooltip
            title="CAD Blueprint Zoom Controls"
            purpose="Pinalalaki o pinaliliit ang SVG floorplan resolution para sa mas malinaw na pag-inspeksyon."
            howTo="I-click ang (+) upang mag-zoom in sa mga racks o (-) upang lumayo."
            position="bottom"
          >
            <div className="flex items-center bg-[#070B14] border border-[#1E2D4D] rounded-lg p-0.5 ml-2">
              <button 
                onClick={() => setZoomLevel(Math.max(0.7, zoomLevel - 0.1))} 
                className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <ZoomOut size={14} />
              </button>
              <span className="px-1.5 text-[10px] font-mono text-slate-300">{Math.round(zoomLevel * 100)}%</span>
              <button 
                onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))} 
                className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <ZoomIn size={14} />
              </button>
            </div>
          </HelpTooltip>
        </div>
      </div>

      {/* Main Workspace Area (CAD Floorplan + Level Manifest HUD) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Interactive CAD Canvas Area */}
        <div className="flex-1 relative overflow-auto flex items-center justify-center p-4">
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            className="transition-transform duration-200 bg-[#0D1527] border border-[#1E2D4D] rounded-2xl p-6 shadow-2xl relative w-[860px] h-[520px]"
          >
            {/* Warehouse CAD Grid Canvas (SVG) */}
            <svg className="w-full h-full" viewBox="0 0 800 460">
              <defs>
                {/* Subtle Grid Pattern */}
                <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30, 45, 77, 0.4)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="800" height="460" fill="url(#cadGrid)" />

              {/* Warehouse Facility Zones & Boundary Markings */}
              {/* Staging & Inbound Dock */}
              <rect x="20" y="340" width="120" height="90" fill="#121D36" stroke="#2A4374" strokeWidth="1.5" rx="6" />
              <text x="30" y="365" fill="#5BC0BE" fontSize="10" fontFamily="monospace" fontWeight="bold">DOCK INBOUND</text>
              <text x="30" y="380" fill="#64748B" fontSize="8" fontFamily="monospace">Gate 01-04 • Active</text>

              {/* Cold Vault Zone */}
              <rect x="520" y="20" width="130" height="300" fill="rgba(6, 182, 212, 0.05)" stroke="#0891B2" strokeWidth="1" strokeDasharray="4" rx="8" />
              <text x="530" y="40" fill="#06B6D4" fontSize="9" fontFamily="monospace" fontWeight="bold">COLD VAULT (-80°C)</text>

              {/* Hazmat Cage */}
              <rect x="660" y="20" width="120" height="300" fill="rgba(168, 85, 247, 0.05)" stroke="#9333EA" strokeWidth="1" strokeDasharray="4" rx="8" />
              <text x="670" y="40" fill="#A855F7" fontSize="9" fontFamily="monospace" fontWeight="bold">HAZMAT CAGE</text>

              {/* Pack & Ship Conveyor Staging */}
              <rect x="660" y="340" width="120" height="90" fill="#121D36" stroke="#2A4374" strokeWidth="1.5" rx="6" />
              <text x="670" y="365" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">PACK & SHIP</text>
              <text x="670" y="380" fill="#64748B" fontSize="8" fontFamily="monospace">FedEx / Freight Out</text>

              {/* Forklift Main Transit Aisle */}
              <line x1="20" y1="330" x2="780" y2="330" stroke="#EAB308" strokeWidth="1" strokeDasharray="6" opacity="0.6" />
              <text x="360" y="325" fill="#EAB308" fontSize="8" fontFamily="monospace" opacity="0.8">FORKLIFT MAIN TRANSIT LANE</text>

              {/* Animated Eulerian Shortest-Path Pick Route */}
              {showPickPath && (
                <g>
                  <path
                    d={pathString}
                    fill="none"
                    stroke="#5BC0BE"
                    strokeWidth="3"
                    className="animate-path"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                  {pathPoints.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#070B14"
                      stroke="#5BC0BE"
                      strokeWidth="2"
                    />
                  ))}
                </g>
              )}

              {/* Racking Aisles & Individual Bin Slots */}
              {currentLevelBins.map((bin) => {
                const isSelected = selectedBin?.id === bin.id;
                const isHovered = hoveredBin?.id === bin.id;
                const color = getBinColor(bin);

                return (
                  <g 
                    key={bin.id} 
                    className="cursor-pointer transition-transform"
                    onClick={() => onSelectBin(bin)}
                    onMouseEnter={() => setHoveredBin(bin)}
                    onMouseLeave={() => setHoveredBin(null)}
                  >
                    {/* Bin Slot Tile */}
                    <rect
                      x={bin.x}
                      y={bin.y}
                      width="24"
                      height="24"
                      fill={color}
                      stroke={isSelected ? '#FFFFFF' : isHovered ? '#6FFFE9' : '#1E2D4D'}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                      rx="3"
                      className="transition-all duration-150"
                    />

                    {/* Bin Code Text */}
                    <text
                      x={bin.x + 12}
                      y={bin.y + 15}
                      fill={bin.status === 'EMPTY' ? '#64748B' : '#070B14'}
                      fontSize="7"
                      fontFamily="monospace"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {bin.aisle}{bin.bay}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Live Hover Tooltip with Item Name, Batch, and Photo Preview */}
            {hoveredBin && (
              <div 
                style={{ left: Math.min(hoveredBin.x + 30, 580), top: Math.max(hoveredBin.y - 40, 10) }}
                className="absolute z-30 pointer-events-none bg-[#070B14]/98 border border-[#5BC0BE] p-3 rounded-xl shadow-2xl text-xs font-mono w-64 backdrop-blur-xl animate-fadeIn"
              >
                <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-1 mb-1.5">
                  <span className="font-bold text-white text-[11px]">{hoveredBin.code}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                    hoveredBin.velocityClass === 'A' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-blue-950 text-blue-300 border border-blue-700'
                  }`}>
                    CLASS {hoveredBin.velocityClass}
                  </span>
                </div>

                <p className="text-[11px] text-[#6FFFE9] font-sans font-bold leading-tight line-clamp-2">
                  {hoveredBin.skuName || 'Empty Storage Bay'}
                </p>

                {hoveredBin.skuCode && (
                  <div className="text-[9px] text-slate-400 mt-1">
                    SKU: <span className="text-slate-200">{hoveredBin.skuCode}</span>
                  </div>
                )}

                <div className="flex justify-between text-[10px] text-slate-300 mt-1.5 pt-1.5 border-t border-[#1E2D4D]">
                  <span>Units: <strong className="text-emerald-400">{hoveredBin.quantity}</strong></span>
                  <span>Lot: <strong className="text-amber-300">{hoveredBin.batchLot || 'N/A'}</strong></span>
                </div>
              </div>
            )}

            {/* CAD Legend Box */}
            <div className="absolute bottom-3 left-3 bg-[#070B14]/90 border border-[#1E2D4D] p-2 rounded-xl text-[10px] font-mono flex items-center gap-3 backdrop-blur-sm">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]"></span> Class A Fast
              </span>
              <span className="flex items-center gap-1 text-blue-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></span> Class B Std
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#A855F7]"></span> Hazmat
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1E293B]"></span> Empty
              </span>
              <span className="flex items-center gap-1 text-[#6FFFE9]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#6FFFE9]"></span> Active Wave
              </span>
            </div>
          </div>
        </div>

        {/* Right Collapsible "Level Stock Manifest HUD" Panel */}
        {showManifestHUD && (
          <div className="w-72 border-l border-[#1E2D4D] bg-[#0A1124]/95 backdrop-blur-xl flex flex-col h-full shrink-0 z-10 font-sans shadow-xl">
            {/* HUD Header */}
            <div className="p-3 border-b border-[#1E2D4D] bg-[#0D1527] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Layers size={13} className="text-[#5BC0BE]" />
                  Level {selectedLevel} Stock Manifest
                </h4>
                <span className="text-[10px] text-slate-400">{filteredManifest.length} Occupied Racks</span>
              </div>
              <button 
                onClick={() => setShowManifestHUD(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Instant Search Bar */}
            <div className="p-2.5 border-b border-[#1E2D4D] bg-[#070B14]">
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter Level items or bin..."
                  value={manifestSearch}
                  onChange={(e) => setManifestSearch(e.target.value)}
                  className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white text-[11px] pl-8 pr-2.5 py-1.5 rounded-lg outline-none focus:border-[#5BC0BE] font-mono"
                />
              </div>
            </div>

            {/* Item List with Click-to-Locate on CAD Map */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 text-xs font-mono">
              {filteredManifest.length === 0 ? (
                <div className="p-4 text-center text-slate-500 text-xs">
                  No matching inventory found on Level {selectedLevel}.
                </div>
              ) : (
                filteredManifest.map(b => (
                  <div
                    key={b.id}
                    onClick={() => onSelectBin(b)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedBin?.id === b.id 
                        ? 'bg-[#1C2D52] border-[#5BC0BE] text-white shadow-md' 
                        : 'bg-[#0D1527] hover:bg-[#121D36] border-[#1E2D4D] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#6FFFE9] text-[11px]">{b.code}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">{b.quantity} units</span>
                    </div>
                    <p className="text-[11px] font-sans font-semibold text-slate-100 line-clamp-1 mt-0.5">
                      {b.skuName}
                    </p>
                    <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                      <span>{b.skuCode}</span>
                      <span>Lot: {b.batchLot?.substring(0, 10)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
