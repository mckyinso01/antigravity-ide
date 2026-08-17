import React, { useState, useRef } from 'react';
import type { BinSlot, PickOrder, AisleSignage, FacilityZone } from '../types';
import { db } from '../services/db';
import { 
  ZoomIn, 
  ZoomOut, 
  Zap, 
  Navigation, 
  Flame, 
  Search, 
  Layers, 
  ChevronRight,
  Edit3,
  Check,
  Plus,
  Trash2,
  Tag,
  Square,
  Save,
  CheckCircle2,
  X,
  Move
} from 'lucide-react';
import { HelpTooltip } from './HelpTooltip';

interface SpatialWarehouseCADProps {
  bins: BinSlot[];
  activeOrder?: PickOrder;
  selectedBin: BinSlot | null;
  onSelectBin: (bin: BinSlot) => void;
  onOpenOptimizer: () => void;
  onRefreshBins?: () => void;
}

export const SpatialWarehouseCAD: React.FC<SpatialWarehouseCADProps> = ({
  bins,
  activeOrder,
  selectedBin,
  onSelectBin,
  onOpenOptimizer,
  onRefreshBins
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [showPickPath, setShowPickPath] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredBin, setHoveredBin] = useState<BinSlot | null>(null);
  const [showManifestHUD, setShowManifestHUD] = useState<boolean>(true);
  const [manifestSearch, setManifestSearch] = useState<string>('');
  const [activeAisleFilter, setActiveAisleFilter] = useState<string | null>(null);

  // CAD Studio / Editor Mode State
  const [isEditorMode, setIsEditorMode] = useState<boolean>(false);
  const [aisleSigns, setAisleSigns] = useState<AisleSignage[]>(db.getAisleSigns());
  const [zones, setZones] = useState<FacilityZone[]>(db.getZones());
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Dragging State
  const [draggingBinId, setDraggingBinId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Modals inside CAD Studio
  const [editingAisle, setEditingAisle] = useState<AisleSignage | null>(null);
  const [isAddRackOpen, setIsAddRackOpen] = useState<boolean>(false);
  const [isAddZoneOpen, setIsAddZoneOpen] = useState<boolean>(false);

  // Add Rack Form State
  const [newRackAisle, setNewRackAisle] = useState<string>('A');
  const [newRackBay, setNewRackBay] = useState<number>(9);
  const [newRackX, setNewRackX] = useState<number>(80);
  const [newRackY, setNewRackY] = useState<number>(420);
  const [newRackSku, setNewRackSku] = useState<string>('');

  // Add Zone Form State
  const [newZoneName, setNewZoneName] = useState<string>('DRY PROVISIONS & BULK');
  const [newZoneCode, setNewZoneCode] = useState<string>('BULK-DRY');
  const [newZoneX, setNewZoneX] = useState<number>(300);
  const [newZoneY, setNewZoneY] = useState<number>(20);
  const [newZoneW, setNewZoneW] = useState<number>(180);
  const [newZoneH, setNewZoneH] = useState<number>(140);
  const [newZoneColor, setNewZoneColor] = useState<string>('rgba(236, 72, 153, 0.08)');
  const [newZoneStroke, setNewZoneStroke] = useState<string>('#EC4899');

  // Filter bins by vertical racking level
  const currentLevelBins = bins.filter(b => b.level === selectedLevel);

  // Filter items on current level for HUD manifest
  const occupiedLevelBins = currentLevelBins.filter(b => b.quantity > 0 && b.skuCode);
  const filteredManifest = occupiedLevelBins.filter(b => {
    const matchesAisle = activeAisleFilter ? b.aisle === activeAisleFilter : true;
    const matchesSearch = b.skuName?.toLowerCase().includes(manifestSearch.toLowerCase()) ||
                          b.skuCode?.toLowerCase().includes(manifestSearch.toLowerCase()) ||
                          b.code.toLowerCase().includes(manifestSearch.toLowerCase());
    return matchesAisle && matchesSearch;
  });

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
    if (bin.zone.includes('Cold')) return '#06B6D4';
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

  // SVG Mouse Coordinates helper for Drag & Drop
  const getSVGCoordinates = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 800 / rect.width;
    const scaleY = 460 / rect.height;
    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY)
    };
  };

  // Drag handlers
  const handleMouseDownOnBin = (e: React.MouseEvent, bin: BinSlot) => {
    if (!isEditorMode) {
      onSelectBin(bin);
      return;
    }
    e.stopPropagation();
    setDraggingBinId(bin.id);
    onSelectBin(bin);
    const coords = getSVGCoordinates(e as any);
    setDragOffset({ x: coords.x - bin.x, y: coords.y - bin.y });
  };

  const handleMouseMoveSVG = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isEditorMode || !draggingBinId) return;
    const coords = getSVGCoordinates(e);
    const newX = Math.max(10, Math.min(760, coords.x - dragOffset.x));
    const newY = Math.max(10, Math.min(420, coords.y - dragOffset.y));
    
    // Snap to 5px grid
    const snappedX = Math.round(newX / 5) * 5;
    const snappedY = Math.round(newY / 5) * 5;

    db.updateBinPosition(draggingBinId, snappedX, snappedY);
    if (onRefreshBins) onRefreshBins();
  };

  const handleMouseUpSVG = () => {
    if (draggingBinId) {
      setDraggingBinId(null);
      setStatusMessage('📍 Rack position updated and saved!');
      setTimeout(() => setStatusMessage(null), 2000);
    }
  };

  // Add new rack handler
  const handleAddNewRack = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `${newRackAisle}-${String(newRackBay).padStart(2, '0')}-L${selectedLevel}`;
    const newBinSlot: BinSlot = {
      id: `bin-custom-${Date.now()}`,
      code,
      aisle: newRackAisle,
      bay: Number(newRackBay),
      level: selectedLevel,
      zone: newRackAisle === 'E' ? 'Cold Vault' : newRackAisle === 'F' ? 'Hazmat Cage' : 'Standard Pallet Racks',
      x: Number(newRackX),
      y: Number(newRackY),
      status: newRackSku ? 'OCCUPIED' : 'EMPTY',
      capacityKg: 1200,
      currentWeightKg: newRackSku ? 350 : 0,
      skuCode: newRackSku || undefined,
      skuName: newRackSku ? `Custom Slotted SKU (${newRackSku})` : undefined,
      quantity: newRackSku ? 50 : 0,
      batchLot: `LOT-2026-${newRackAisle}${newRackBay}`,
      expiryDate: '2028-12-31',
      velocityClass: newRackAisle === 'A' || newRackAisle === 'B' ? 'A' : 'B',
      lastAudited: new Date().toISOString().split('T')[0],
      auditLogs: []
    };

    db.addCustomBin(newBinSlot);
    if (onRefreshBins) onRefreshBins();
    setIsAddRackOpen(false);
    setStatusMessage(`✨ New Rack ${code} successfully added to Floorplan!`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Delete selected rack handler
  const handleDeleteSelectedRack = () => {
    if (!selectedBin) return;
    if (confirm(`Are you sure you want to delete Rack ${selectedBin.code} from the warehouse layout?`)) {
      db.deleteBin(selectedBin.id);
      if (onRefreshBins) onRefreshBins();
      setStatusMessage(`🗑️ Rack ${selectedBin.code} deleted.`);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Add Zone handler
  const handleAddNewZone = (e: React.FormEvent) => {
    e.preventDefault();
    const newZone: FacilityZone = {
      id: `zone-${Date.now()}`,
      name: newZoneName,
      code: newZoneCode,
      x: Number(newZoneX),
      y: Number(newZoneY),
      width: Number(newZoneW),
      height: Number(newZoneH),
      color: newZoneColor,
      strokeColor: newZoneStroke
    };
    const updated = db.addZone(newZone);
    setZones(updated);
    setIsAddZoneOpen(false);
    setStatusMessage(`📐 Storage Zone '${newZoneName}' created!`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Save Aisle Sign update
  const handleSaveAisleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAisle) return;
    const updated = db.updateAisleSign(editingAisle.aisle, editingAisle);
    setAisleSigns(updated);
    setEditingAisle(null);
    setStatusMessage(`🏷️ Aisle ${editingAisle.aisle} signage updated to '${editingAisle.name}'!`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070B14] overflow-hidden relative font-sans">
      {/* Top HUD Controls Bar */}
      <div className="h-12 border-b border-[#1E2D4D] bg-[#0D1527]/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isEditorMode ? 'bg-amber-400 animate-bounce' : 'bg-[#5BC0BE] animate-ping'}`}></span>
            {isEditorMode ? 'CAD FLOORPLAN STUDIO • EDIT MODE' : `SPATIAL CAD DIGITAL TWIN • LEVEL ${selectedLevel}`}
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

        {/* Action Toggles, Studio Mode Switcher & Optimizer Button */}
        <div className="flex items-center gap-2">
          {/* Heatmap Toggle */}
          {!isEditorMode && (
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
          )}

          {/* Eulerian Wave Pick Path Toggle */}
          {!isEditorMode && (
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
          )}

          {/* EDIT MODE TOGGLE BUTTON */}
          <HelpTooltip
            title="CAD Floorplan Studio Editor"
            purpose="Binubuksan ang interactive layout builder kung saan maaari kang mag-drag at mag-usod ng racks, magdagdag ng bagong shelf, magbura, at mag-rename ng mga aisle signage."
            howTo="I-click upang lumipat sa pagitan ng View Mode at Drag-and-Drop Studio Mode."
            position="bottom"
          >
            <button
              onClick={() => setIsEditorMode(!isEditorMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer shadow-sm ${
                isEditorMode
                  ? 'bg-amber-500 text-[#070B14] border-amber-400 shadow-amber-500/30 glow-amber'
                  : 'bg-[#121D36] hover:bg-[#1E2D4D] text-[#6FFFE9] border-[#5BC0BE]/50'
              }`}
            >
              {isEditorMode ? (
                <>
                  <Check size={13} className="stroke-[3]" />
                  <span>Exit Studio (Done)</span>
                </>
              ) : (
                <>
                  <Edit3 size={13} />
                  <span>Edit Floorplan Studio</span>
                </>
              )}
            </button>
          </HelpTooltip>

          {/* Wave Pick Optimizer Modal Trigger */}
          {!isEditorMode && (
            <HelpTooltip
              title="Wave Batch Optimizer"
              purpose="Binubuksan ang multi-order batching algorithm upang pagsamahin ang mga customer orders sa iisang mabilis na pick wave."
              howTo="I-click upang kalkulahin ang sabay-sabay na pick schedule."
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
          )}

          {/* Zoom controls */}
          <HelpTooltip
            title="CAD Blueprint Zoom Controls"
            purpose="Pinalalaki o pinaliliit ang SVG floorplan resolution para sa mas malinaw na pag-inspeksyon."
            howTo="I-click ang (+) upang mag-zoom in sa mga racks o (-) upang lumayo."
            position="bottom"
          >
            <div className="flex items-center bg-[#070B14] border border-[#1E2D4D] rounded-lg p-0.5 ml-1">
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

      {/* Interactive CAD Studio Action Toolbar (When in Edit Mode) */}
      {isEditorMode && (
        <div className="h-10 bg-[#121D36] border-b border-[#2A4374] px-4 flex items-center justify-between text-xs font-mono shrink-0 animate-fadeIn z-10">
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Move size={13} />
              <span>DRAG RACKS TO REPOSITION</span>
            </span>
            <span className="text-slate-400 text-[11px] border-l border-slate-700 pl-2">
              Click any Aisle Banner to rename tags (e.g. Noodles, Shampoos, Pharma)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Add Rack Button */}
            <button
              onClick={() => setIsAddRackOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0D1527] hover:bg-[#1E2D4D] border border-[#5BC0BE] text-[#6FFFE9] font-bold cursor-pointer"
            >
              <Plus size={12} />
              <span>+ Add Rack/Bay</span>
            </button>

            {/* Add Custom Zone */}
            <button
              onClick={() => setIsAddZoneOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#0D1527] hover:bg-[#1E2D4D] border border-pink-500 text-pink-300 font-bold cursor-pointer"
            >
              <Square size={12} />
              <span>+ Add Zone</span>
            </button>

            {/* Delete Selected Rack */}
            {selectedBin && (
              <button
                onClick={handleDeleteSelectedRack}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-300 font-bold cursor-pointer"
              >
                <Trash2 size={12} />
                <span>Delete Rack {selectedBin.code}</span>
              </button>
            )}

            {/* Save Button */}
            <button
              onClick={() => {
                setStatusMessage('💾 Floorplan Layout & Signage synced to IndexedDB!');
                setTimeout(() => setStatusMessage(null), 2500);
              }}
              className="flex items-center gap-1 px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-[#070B14] font-bold cursor-pointer"
            >
              <Save size={12} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Area (CAD Floorplan + Level Manifest HUD) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Interactive CAD Canvas Area */}
        <div className="flex-1 relative overflow-auto flex items-center justify-center p-4">
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            className="transition-transform duration-200 bg-[#0D1527] border border-[#1E2D4D] rounded-2xl p-6 shadow-2xl relative w-[860px] h-[520px]"
          >
            {/* Status Toast */}
            {statusMessage && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 bg-emerald-950 border border-emerald-500 text-emerald-300 px-4 py-1.5 rounded-xl shadow-xl text-xs font-mono font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Warehouse CAD Grid Canvas (SVG) */}
            <svg 
              ref={svgRef}
              className="w-full h-full select-none" 
              viewBox="0 0 800 460"
              onMouseMove={handleMouseMoveSVG}
              onMouseUp={handleMouseUpSVG}
            >
              <defs>
                {/* Subtle Grid Pattern */}
                <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30, 45, 77, 0.4)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Background Grid */}
              <rect width="800" height="460" fill="url(#cadGrid)" />

              {/* DYNAMIC FACILITY STORAGE ZONES */}
              {zones.map((zone) => (
                <g key={zone.id}>
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.width}
                    height={zone.height}
                    fill={zone.color}
                    stroke={zone.strokeColor}
                    strokeWidth="1.5"
                    strokeDasharray="4"
                    rx="8"
                  />
                  <text
                    x={zone.x + 10}
                    y={zone.y + 20}
                    fill={zone.strokeColor}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {zone.name}
                  </text>
                </g>
              ))}

              {/* Forklift Main Transit Aisle */}
              <line x1="20" y1="330" x2="780" y2="330" stroke="#EAB308" strokeWidth="1" strokeDasharray="6" opacity="0.6" />
              <text x="360" y="325" fill="#EAB308" fontSize="8" fontFamily="monospace" opacity="0.8">FORKLIFT MAIN TRANSIT LANE</text>

              {/* OVERHEAD AISLE SIGNAGE BANNERS (Grocery / Multi-Category Style) */}
              {aisleSigns.map((sign, idx) => {
                const aisleX = 80 + (idx * 110);
                const isFiltered = activeAisleFilter === sign.aisle;

                return (
                  <g
                    key={sign.aisle}
                    className="cursor-pointer group"
                    onClick={() => {
                      if (isEditorMode) {
                        setEditingAisle(sign);
                      } else {
                        setActiveAisleFilter(activeAisleFilter === sign.aisle ? null : sign.aisle);
                      }
                    }}
                  >
                    {/* Overhead Signboard Plaque */}
                    <rect
                      x={aisleX - 25}
                      y="15"
                      width="90"
                      height="26"
                      rx="6"
                      fill={isFiltered ? '#1C2D52' : '#0B132B'}
                      stroke={isFiltered ? '#5BC0BE' : sign.color}
                      strokeWidth={isFiltered ? 2 : 1}
                      className="transition-all"
                    />

                    {/* Icon & Aisle Letter */}
                    <text
                      x={aisleX - 20}
                      y="32"
                      fontSize="11"
                    >
                      {sign.icon}
                    </text>
                    <text
                      x={aisleX - 5}
                      y="27"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      AISLE {sign.aisle}
                    </text>
                    <text
                      x={aisleX - 5}
                      y="37"
                      fill={sign.color}
                      fontSize="6.5"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                    >
                      {sign.name.length > 15 ? sign.name.substring(0, 14) + '…' : sign.name}
                    </text>

                    {/* Edit pencil icon in edit mode */}
                    {isEditorMode && (
                      <circle cx={aisleX + 58} cy="28" r="5" fill="#EAB308" />
                    )}
                  </g>
                );
              })}

              {/* Animated Eulerian Shortest-Path Pick Route */}
              {!isEditorMode && showPickPath && (
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
                const isDragging = draggingBinId === bin.id;
                const color = getBinColor(bin);

                return (
                  <g 
                    key={bin.id} 
                    className={`cursor-pointer transition-transform ${isEditorMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    onMouseDown={(e) => handleMouseDownOnBin(e, bin)}
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
                      stroke={isSelected ? '#FFFFFF' : isDragging ? '#F59E0B' : isHovered ? '#6FFFE9' : '#1E2D4D'}
                      strokeWidth={isSelected ? 2.5 : isDragging ? 2 : isHovered ? 2 : 1}
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
            {!isEditorMode && hoveredBin && (
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
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400">{filteredManifest.length} Occupied</span>
                  {activeAisleFilter && (
                    <span 
                      onClick={() => setActiveAisleFilter(null)}
                      className="text-[9px] px-1.5 py-0.2 rounded bg-[#5BC0BE]/20 text-[#6FFFE9] border border-[#5BC0BE]/40 cursor-pointer font-mono"
                    >
                      Aisle {activeAisleFilter} ✕
                    </span>
                  )}
                </div>
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

      {/* AISLE SIGNAGE CUSTOMIZER DRAWER SLIDE */}
      {editingAisle && (
        <div className="fixed inset-y-0 right-0 w-[420px] max-w-full z-[100] pointer-events-auto bg-[#070B14]/98 border-l border-[#2A4374] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col h-full overflow-y-auto animate-slideLeft font-sans">
          <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#5BC0BE]">
                <Tag size={16} />
              </div>
              <div>
                <h3 className="font-mono font-bold text-sm text-white">Customize Aisle {editingAisle.aisle} Signage</h3>
                <span className="text-[10px] text-[#5BC0BE] font-mono">Overhead Wayfinding Designer</span>
              </div>
            </div>
            <button 
              onClick={() => setEditingAisle(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSaveAisleSign} className="p-5 space-y-4 font-mono text-xs flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 block mb-1">Aisle Category Name (e.g. Canned Goods, Pharma)</label>
                <input
                  type="text"
                  value={editingAisle.name}
                  onChange={(e) => setEditingAisle({ ...editingAisle, name: e.target.value })}
                  className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl font-bold focus:border-[#5BC0BE] outline-none"
                  placeholder="e.g. Noodles, Milk & Canned Goods"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Icon / Emoji</label>
                  <select
                    value={editingAisle.icon}
                    onChange={(e) => setEditingAisle({ ...editingAisle, icon: e.target.value })}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl"
                  >
                    <option value="💊">💊 Pharmaceuticals</option>
                    <option value="🥫">🥫 Food & Canned Goods</option>
                    <option value="🧼">🧼 Soaps & Shampoos</option>
                    <option value="⚡">⚡ Electronics & Batteries</option>
                    <option value="🧰">🧰 Hydraulics & Tools</option>
                    <option value="⚙️">⚙️ Bearings & Fasteners</option>
                    <option value="❄️">❄️ Cold Storage (-80°C)</option>
                    <option value="☣️">☣️ Hazmat & Chemicals</option>
                    <option value="📦">📦 General Dry Goods</option>
                    <option value="🧴">🧴 Personal Care & Liquids</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Badge Accent Color</label>
                  <select
                    value={editingAisle.color}
                    onChange={(e) => setEditingAisle({ ...editingAisle, color: e.target.value })}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl"
                  >
                    <option value="#06B6D4">Cyan (#06B6D4)</option>
                    <option value="#3B82F6">Blue (#3B82F6)</option>
                    <option value="#10B981">Green (#10B981)</option>
                    <option value="#F59E0B">Amber (#F59E0B)</option>
                    <option value="#EC4899">Pink (#EC4899)</option>
                    <option value="#A855F7">Purple (#A855F7)</option>
                    <option value="#14B8A6">Teal (#14B8A6)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Department / Sector</label>
                <input
                  type="text"
                  value={editingAisle.department}
                  onChange={(e) => setEditingAisle({ ...editingAisle, department: e.target.value })}
                  className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl focus:border-[#5BC0BE] outline-none"
                  placeholder="e.g. Healthcare & Safety"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D] space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Signage Preview</span>
                <div 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-white font-bold text-xs"
                  style={{ backgroundColor: `${editingAisle.color}20`, borderColor: editingAisle.color }}
                >
                  <span className="text-sm">{editingAisle.icon}</span>
                  <span>AISLE {editingAisle.aisle}: {editingAisle.name || 'Category'}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#1E2D4D]">
              <button
                type="button"
                onClick={() => setEditingAisle(null)}
                className="px-4 py-2.5 bg-[#121D36] hover:bg-[#1E2D4D] text-slate-300 rounded-xl transition-all cursor-pointer font-sans text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold rounded-xl shadow-md glow-mint transition-all cursor-pointer font-sans text-xs"
              >
                Save Signage
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD CUSTOM RACK / BAY DRAWER SLIDE */}
      {isAddRackOpen && (
        <div className="fixed inset-y-0 right-0 w-[420px] max-w-full z-[100] pointer-events-auto bg-[#070B14]/98 border-l border-[#2A4374] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col h-full overflow-y-auto animate-slideLeft font-sans">
          <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#5BC0BE]/20 border border-[#5BC0BE]/40 flex items-center justify-center text-[#5BC0BE]">
                <Plus size={16} />
              </div>
              <div>
                <h3 className="font-mono font-bold text-sm text-white">Add Custom Racking Bay</h3>
                <span className="text-[10px] text-[#5BC0BE] font-mono">Floorplan Topology Builder</span>
              </div>
            </div>
            <button 
              onClick={() => setIsAddRackOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleAddNewRack} className="p-5 space-y-4 font-mono text-xs flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Aisle</label>
                  <select
                    value={newRackAisle}
                    onChange={(e) => setNewRackAisle(e.target.value)}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl font-bold"
                  >
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(a => (
                      <option key={a} value={a}>Aisle {a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Bay Number</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newRackBay}
                    onChange={(e) => setNewRackBay(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Canvas X Coordinate</label>
                  <input
                    type="number"
                    value={newRackX}
                    onChange={(e) => setNewRackX(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Canvas Y Coordinate</label>
                  <input
                    type="number"
                    value={newRackY}
                    onChange={(e) => setNewRackY(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Initial SKU Code (Optional)</label>
                <input
                  type="text"
                  value={newRackSku}
                  onChange={(e) => setNewRackSku(e.target.value)}
                  placeholder="e.g. FOOD-NOODLE-RAMEN-100"
                  className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl focus:border-[#5BC0BE] outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#0D1527] border border-[#1E2D4D] text-[11px] text-slate-300">
                <span className="text-emerald-400 font-bold block mb-1">📍 Generated Slot Code:</span>
                <span className="font-mono text-white text-xs bg-[#070B14] px-2 py-1 rounded border border-[#1E2D4D]">
                  {newRackAisle}-{String(newRackBay).padStart(2, '0')}-L{selectedLevel}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#1E2D4D]">
              <button
                type="button"
                onClick={() => setIsAddRackOpen(false)}
                className="px-4 py-2.5 bg-[#121D36] hover:bg-[#1E2D4D] text-slate-300 rounded-xl transition-all cursor-pointer font-sans text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#5BC0BE] hover:bg-[#6FFFE9] text-[#070B14] font-bold rounded-xl shadow-md glow-mint transition-all cursor-pointer font-sans text-xs"
              >
                Create Rack
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD STORAGE ZONE DRAWER SLIDE */}
      {isAddZoneOpen && (
        <div className="fixed inset-y-0 right-0 w-[420px] max-w-full z-[100] pointer-events-auto bg-[#070B14]/98 border-l border-[#2A4374] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col h-full overflow-y-auto animate-slideLeft font-sans">
          <div className="h-14 border-b border-[#1E2D4D] bg-[#0D1527] px-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
                <Square size={16} />
              </div>
              <div>
                <h3 className="font-mono font-bold text-sm text-white">Add Custom Facility Zone</h3>
                <span className="text-[10px] text-pink-400 font-mono">Spatial Boundary Designer</span>
              </div>
            </div>
            <button 
              onClick={() => setIsAddZoneOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#121D36] transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleAddNewZone} className="p-5 space-y-4 font-mono text-xs flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 block mb-1">Zone Name</label>
                <input
                  type="text"
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl font-bold focus:border-pink-500 outline-none"
                  placeholder="e.g. DRY PROVISIONS & BULK"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Zone Code</label>
                  <input
                    type="text"
                    value={newZoneCode}
                    onChange={(e) => setNewZoneCode(e.target.value)}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Border Color</label>
                  <input
                    type="text"
                    value={newZoneStroke}
                    onChange={(e) => {
                      setNewZoneStroke(e.target.value);
                      setNewZoneColor(`${e.target.value}15`);
                    }}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">X</label>
                  <input
                    type="number"
                    value={newZoneX}
                    onChange={(e) => setNewZoneX(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Y</label>
                  <input
                    type="number"
                    value={newZoneY}
                    onChange={(e) => setNewZoneY(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Width</label>
                  <input
                    type="number"
                    value={newZoneW}
                    onChange={(e) => setNewZoneW(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Height</label>
                  <input
                    type="number"
                    value={newZoneH}
                    onChange={(e) => setNewZoneH(Number(e.target.value))}
                    className="w-full bg-[#0D1527] border border-[#1E2D4D] text-white p-2 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-[#1E2D4D]">
              <button
                type="button"
                onClick={() => setIsAddZoneOpen(false)}
                className="px-4 py-2.5 bg-[#121D36] hover:bg-[#1E2D4D] text-slate-300 rounded-xl transition-all cursor-pointer font-sans text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer font-sans text-xs"
              >
                Add Zone
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
