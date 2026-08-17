import React, { useState } from 'react';
import type { BinSlot, PickOrder } from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  Zap, 
  Navigation, 
  Flame
} from 'lucide-react';


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

  // Filter bins by vertical racking level
  const currentLevelBins = bins.filter(b => b.level === selectedLevel);

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
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden relative">
      {/* Top HUD Controls Bar */}
      <div className="h-12 border-b border-[#1E2D4D] bg-[#0D1527]/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5BC0BE] animate-ping"></span>
            SPATIAL CAD DIGITAL TWIN • LEVEL {selectedLevel}
          </span>

          {/* Level Switcher (1 to 4) */}
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
        </div>

        {/* Action Toggles & Eulerian Optimizer Button */}
        <div className="flex items-center gap-2">
          {/* Heatmap Toggle */}
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

          {/* Eulerian Wave Pick Path Toggle */}
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

          {/* Wave Pick Optimizer Modal Trigger */}
          <button
            onClick={onOpenOptimizer}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#3A86FF] to-[#5BC0BE] hover:opacity-95 text-[#070B14] font-bold text-xs px-3 py-1 rounded-lg shadow-sm cursor-pointer font-mono"
          >
            <Zap size={13} className="fill-current stroke-[2]" />
            <span>Optimize Wave</span>
          </button>

          {/* Zoom controls */}
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
        </div>
      </div>

      {/* Interactive CAD Canvas Area */}
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

          {/* Live Hover Tooltip */}
          {hoveredBin && (
            <div 
              style={{ left: hoveredBin.x + 30, top: hoveredBin.y - 10 }}
              className="absolute z-30 pointer-events-none bg-[#070B14]/95 border border-[#5BC0BE] p-2.5 rounded-xl shadow-2xl text-xs font-mono w-56 backdrop-blur-md"
            >
              <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-1 mb-1.5">
                <span className="font-bold text-white text-[11px]">{hoveredBin.code}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                  hoveredBin.velocityClass === 'A' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-blue-950 text-blue-300 border border-blue-700'
                }`}>
                  CLASS {hoveredBin.velocityClass}
                </span>
              </div>
              <p className="text-[10px] text-[#6FFFE9] truncate font-sans font-semibold">
                {hoveredBin.skuName || 'Empty Storage Bay'}
              </p>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Stock: <strong className="text-white">{hoveredBin.quantity} units</strong></span>
                <span>Weight: <strong className="text-white">{hoveredBin.currentWeightKg} kg</strong></span>
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
    </div>
  );
};
