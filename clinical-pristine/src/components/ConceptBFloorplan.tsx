import React, { useState, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Hand } from 'lucide-react';
import { db, type RoomData, type BedData, type FloorTagData, DEFAULT_HOSPITAL_FLOORS } from '../db';
import { maskPatientName } from '../utils/clinicalCalculators';
import { getFloorBlueprint } from '../utils/floorBlueprints';
import { DynamicPatientAvatar } from './DynamicPatientAvatar';

interface Props {
  selectedBedId?: string | null;
  onSelectBed?: (bedId: string) => void;
  floorNumber?: number;
  onSelectFloor?: (floorNum: number) => void;
  onOpenFloorEditor?: (floorNum: number) => void;
  isHipaaMasked?: boolean;
}

export const ConceptBFloorplan: React.FC<Props> = ({
  selectedBedId,
  onSelectBed,
  floorNumber = 1,
  onSelectFloor,
  onOpenFloorEditor,
  isHipaaMasked = false,
}) => {
  const [showFloorDropdown, setShowFloorDropdown] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panMode, setPanMode] = useState<boolean>(false);

  // Hover Popover Bubble State
  const [hoveredBed, setHoveredBed] = useState<BedData | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ x: number; y: number } | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBedMouseEnter = (bed: BedData, e: React.MouseEvent) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredBed(bed);
    setPopoverPos({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleBedMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredBed(null);
      setPopoverPos(null);
    }, 180);
  };

  const handlePopoverMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handlePopoverMouseLeave = () => {
    setHoveredBed(null);
    setPopoverPos(null);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(2.5, +(prev + 0.15).toFixed(2)));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(0.5, +(prev - 0.15).toFixed(2)));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (panMode || e.button === 1 || zoomLevel > 1) {
      setIsPanning(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const onMouseUp = () => setIsPanning(false);

  const onWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  };

  // 1. LIVE DEXIE QUERY: Dynamically query rooms, beds, and tags for current floor
  const allRooms = useLiveQuery(() => db.rooms.toArray()) || [];
  const allBeds = useLiveQuery(() => db.beds.toArray()) || [];
  const allFloorTags = useLiveQuery(() => db.floorTags.toArray()) || [];

  // Filter by active floor
  const rooms: RoomData[] = allRooms.filter(r => (r.floorNumber ?? 1) === floorNumber);
  const beds: BedData[] = allBeds.filter(b => (b.floorNumber ?? 1) === floorNumber);
  const tags: FloorTagData[] = allFloorTags.filter(t => (t.floorNumber ?? 1) === floorNumber);

  // Fallback to authentic architectural hospital blueprint
  const fallbackBlueprint = getFloorBlueprint(floorNumber);
  const effectiveRooms: RoomData[] = rooms.length > 0 ? rooms : fallbackBlueprint.rooms;
  const effectiveBeds: BedData[] = beds.length > 0 ? beds : fallbackBlueprint.beds;
  const effectiveTags: FloorTagData[] = tags.length > 0 ? tags : fallbackBlueprint.tags;

  const currentFloorMeta = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === floorNumber) || {
    number: floorNumber,
    name: `Level ${floorNumber}`,
    department: 'Hospital Ward',
    shortCode: `L${floorNumber}`
  };

  const getRoomBeds = (roomId: string) => {
    return effectiveBeds.filter(b => b.room === roomId);
  };

  const isSelected = (id: string) => selectedBedId === id;

  return (
    <div className="w-full h-full flex-1 bg-[#F8FAFC] flex flex-col overflow-hidden select-none relative">
      
      {/* 1. DEDICATED FLOOR NAVIGATION TOOLBAR */}
      <div className="px-3.5 py-2 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0 shadow-2xs z-20">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* PREVIOUS FLOOR BUTTON */}
          <button
            onClick={() => onSelectFloor?.(Math.max(1, floorNumber - 1))}
            disabled={floorNumber <= 1}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed border border-slate-200 transition-colors cursor-pointer"
            title="Previous Floor (Down)"
            aria-label="Previous Floor"
          >
            <ChevronLeft size={14} />
          </button>

          {/* CURRENT FLOOR DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowFloorDropdown(!showFloorDropdown)}
              className="px-3 py-1.5 bg-slate-950 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-all cursor-pointer shadow-2xs max-w-[320px]"
            >
              <span>🏢 {currentFloorMeta.name}</span>
              <span className="text-[10px] text-slate-400 font-normal">▾</span>
            </button>

            {showFloorDropdown && (
              <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 text-xs max-h-80 overflow-y-auto custom-scrollbar">
                {DEFAULT_HOSPITAL_FLOORS.map(floor => (
                  <button
                    key={floor.number}
                    onClick={() => {
                      onSelectFloor?.(floor.number);
                      setShowFloorDropdown(false);
                    }}
                    className={`p-2 rounded-lg text-left font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      floorNumber === floor.number ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="block">{floor.name}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{floor.department}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                      L{floor.number}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NEXT FLOOR BUTTON */}
          <button
            onClick={() => onSelectFloor?.(Math.min(18, floorNumber + 1))}
            disabled={floorNumber >= 18}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed border border-slate-200 transition-colors cursor-pointer"
            title="Next Floor (Up)"
            aria-label="Next Floor"
          >
            <ChevronRight size={14} />
          </button>

          {/* QUICK FLOOR STEPPER PILLS */}
          <div className="flex items-center gap-1 ml-1 overflow-x-auto py-0.5 max-w-[420px] custom-scrollbar">
            {Array.from({ length: 18 }, (_, i) => i + 1)
              .filter(num => Math.abs(num - floorNumber) <= 2 || (floorNumber <= 3 && num <= 6) || (floorNumber >= 16 && num >= 13))
              .slice(0, 6)
              .map(fNum => (
                <button
                  key={fNum}
                  onClick={() => onSelectFloor?.(fNum)}
                  className={`px-2 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    floorNumber === fNum
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  L{fNum}
                </button>
              ))}
          </div>
        </div>

        {/* CONTROLS & OCCUPANCY STATS */}
        <div className="flex items-center gap-2">
          {/* ZOOM TOOLBAR IN HEADER */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.5}
              className="p-1 rounded hover:bg-white text-slate-700 disabled:text-slate-300 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="px-1.5 font-mono text-[11px] font-bold text-slate-800">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.5}
              className="p-1 rounded hover:bg-white text-slate-700 disabled:text-slate-300 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>
          </div>

          {onOpenFloorEditor && (
            <button
              onClick={() => onOpenFloorEditor(floorNumber)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer"
              title={`Edit Floor Level ${floorNumber} Blueprint Architecture (Admin Authentication Required)`}
            >
              <span>✏️ Edit Floor Level {floorNumber}</span>
            </button>
          )}

          <div className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200">
            {effectiveRooms.length} Suites
          </div>
          <div className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-xs border border-blue-200">
            {effectiveBeds.length} Bays
          </div>
        </div>
      </div>

      {/* FLOATING ZOOM & PAN QUICK-DOCK */}
      <div className="absolute right-4 bottom-4 z-30 flex items-center gap-1.5 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shadow-lg text-xs">
        <button
          onClick={() => setPanMode(!panMode)}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            panMode ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-700 hover:bg-slate-100'
          }`}
          title={panMode ? 'Pan Mode Active (Click & Drag)' : 'Enable Pan Tool'}
        >
          <Hand size={14} />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-0.5"></div>

        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 0.5}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>

        <button
          onClick={handleResetZoom}
          className="px-2 py-0.5 font-mono text-[11px] font-bold text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          title="Reset Zoom to 100%"
        >
          {Math.round(zoomLevel * 100)}%
        </button>

        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 2.5}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-0.5"></div>

        <button
          onClick={handleResetZoom}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Reset Canvas View"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* 2. SVG FLOORPLAN CANVAS CONTAINER */}
      <div 
        className={`flex-1 overflow-hidden p-3 flex items-center justify-center min-h-[540px] ${
          panMode || isPanning ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.15s ease-out',
            width: '100%',
            maxWidth: '980px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg 
            viewBox="0 0 1000 720" 
            className="w-full max-w-[980px] h-auto drop-shadow-sm font-sans"
            style={{ minWidth: '780px' }}
          >
        <defs>
          <filter id="glass-glow-critical" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F43F5E" floodOpacity="0.55" />
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#E11D48" floodOpacity="0.8" />
          </filter>

          <filter id="bed-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* 1. FLOOR BASE CANVASS & STRUCTURAL PERIMETER */}
        <rect x="30" y="20" width="940" height="670" fill="#FFFFFF" rx="12" stroke="#0F172A" strokeWidth="4" />

        {/* 2. DYNAMIC CENTRAL CORRIDOR EGRESS ZONE */}
        {effectiveRooms.length > 3 && (
          <g>
            <rect x="440" y="30" width="120" height="650" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
            <text x="500" y="350" fill="#94A3B8" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              CENTRAL CORRIDOR
            </text>
          </g>
        )}

        {/* 3. DYNAMIC FLOOR-SPECIFIC SAFETY CORES & CLINICAL TAGS */}
        {effectiveTags.map(tag => {
          const isHelipad = tag.iconType === 'helipad';
          const isFireExit = tag.iconType === 'fire-exit';
          const isStair = tag.iconType === 'emergency-stair';
          const isNurse = tag.iconType === 'nurse-station';

          const bgColor = isFireExit ? '#FFF1F2' : isStair ? '#F0FDF4' : isNurse ? '#F0F9FF' : isHelipad ? '#FEF3C7' : '#F8FAFC';
          const borderColor = isFireExit ? '#E11D48' : isStair ? '#16A34A' : isNurse ? '#0284C7' : isHelipad ? '#F59E0B' : '#64748B';
          const textColor = isFireExit ? '#BE123C' : isStair ? '#15803D' : isNurse ? '#0369A1' : isHelipad ? '#B45309' : '#334155';

          const boxWidth = Math.max(130, tag.text.length * 6.5 + 24);

          return (
            <g key={tag.id} transform={`translate(${tag.x}, ${tag.y})`}>
              <rect
                x={-boxWidth / 2}
                y={-12}
                width={boxWidth}
                height={24}
                rx={6}
                fill={bgColor}
                stroke={borderColor}
                strokeWidth={1.5}
                className="drop-shadow-2xs"
              />
              <text
                x={0}
                y={4}
                fill={textColor}
                fontSize={8.5}
                fontWeight="bold"
                textAnchor="middle"
              >
                {tag.text}
              </text>
            </g>
          );
        })}

        {/* 4. DYNAMIC ROOM CONTAINERS FROM DATABASE */}
        {effectiveRooms.map(room => {
          const roomBeds = getRoomBeds(room.id);
          const isRoomSelected = roomBeds.some(b => isSelected(b.id));

          const rx = room.x ?? 70;
          const ry = room.y ?? 60;
          const rw = room.w ?? room.width ?? 350;
          const rh = room.h ?? room.height ?? 260;

          const deptColors: Record<string, { bg: string; border: string; badge: string; badgeBg: string; text: string }> = {
            'Emergency': { bg: '#FFF1F2', border: '#FDA4AF', badge: '#BE123C', badgeBg: '#FFE4E6', text: '#9F1239' },
            'Intensive Care': { bg: '#EFF6FF', border: '#93C5FD', badge: '#1D4ED8', badgeBg: '#DBEAFE', text: '#1E40AF' },
            'Surgery': { bg: '#F5F3FF', border: '#C4B5FD', badge: '#6D28D9', badgeBg: '#EDE9FE', text: '#5B21B6' },
            'Med-Surg': { bg: '#F8FAFC', border: '#CBD5E1', badge: '#334155', badgeBg: '#F1F5F9', text: '#1E293B' },
            'Pediatrics': { bg: '#FDF4FF', border: '#F0ABFC', badge: '#A21CAF', badgeBg: '#FAE8FF', text: '#86198F' },
            'Maternity': { bg: '#FFF7ED', border: '#FDBA74', badge: '#C2410C', badgeBg: '#FFEDD5', text: '#9A3412' },
            'Aviation / Trauma Flight Deck': { bg: '#FFFBEB', border: '#FCD34D', badge: '#B45309', badgeBg: '#FEF3C7', text: '#78350F' },
          };

          const deptKey = room.department || 'Med-Surg';
          const theme = deptColors[deptKey] || deptColors['Med-Surg'];

          return (
            <g key={room.id} transform={`translate(${rx}, ${ry})`} className="transition-all duration-300">
              
              {/* ROOM BOUNDARY WALL */}
              <rect
                x="0"
                y="0"
                width={rw}
                height={rh}
                fill={isRoomSelected ? '#F0F9FF' : '#FFFFFF'}
                stroke={isRoomSelected ? '#0284C7' : '#0F172A'}
                strokeWidth={isRoomSelected ? '3.5' : '2.5'}
                rx="6"
                className="transition-colors duration-200"
              />

              {/* ROOM HEADER CONTAINER */}
              <rect
                x="1"
                y="1"
                width={rw - 2}
                height="34"
                fill={theme.bg}
                rx="5"
              />
              <line
                x1="0"
                y1="35"
                x2={rw}
                y2="35"
                stroke={theme.border}
                strokeWidth="1.5"
              />

              {/* DEPARTMENT COLOR BADGE */}
              <rect
                x="10"
                y="8"
                width="auto"
                height="18"
                rx="4"
                fill={theme.badgeBg}
                stroke={theme.border}
                strokeWidth="1"
              />
              <text
                x="15"
                y="20"
                fontSize="9"
                fontWeight="bold"
                fill={theme.badge}
                letterSpacing="0.5"
              >
                {room.id.toUpperCase()}
              </text>

              {/* ROOM NAME */}
              <text
                x="85"
                y="21"
                fontSize="11"
                fontWeight="bold"
                fill="#0F172A"
              >
                {room.name}
              </text>

              {/* BED CAPACITY BADGE */}
              <text
                x={rw - 15}
                y="21"
                fontSize="9.5"
                fontWeight="bold"
                fill="#64748B"
                textAnchor="end"
              >
                {roomBeds.length} Beds
              </text>

              {/* ARCHITECTURAL CORRIDOR DOORWAYS */}
              {room.doorPosition !== 'none' && (
                <g>
                  {/* North / Top Doorway */}
                  {room.doorPosition === 'top' && (
                    <g transform={`translate(${rw / 2 - 20}, -2)`}>
                      <rect x="0" y="0" width="40" height="4" fill="#FFFFFF" />
                      <path d="M 0 0 A 40 40 0 0 1 40 0" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="0" y1="0" x2="28" y2="-28" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )}

                  {/* South / Bottom Doorway */}
                  {room.doorPosition === 'bottom' && (
                    <g transform={`translate(${rw / 2 - 20}, ${rh - 2})`}>
                      <rect x="0" y="0" width="4" height="4" fill="#FFFFFF" />
                      <path d="M 0 4 A 40 40 0 0 0 40 4" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="0" y1="4" x2="28" y2="32" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )}

                  {/* East / Right Corridor Doorway */}
                  {(room.doorPosition === 'right' || (!room.doorPosition && rx < 440)) && (
                    <g transform={`translate(${rw - 2}, ${rh - 45})`}>
                      <rect x="0" y="0" width="4" height="36" fill="#FFFFFF" />
                      <path d="M 4 0 A 36 36 0 0 1 4 36" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="4" y1="36" x2="28" y2="12" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )}

                  {/* West / Left Corridor Doorway */}
                  {(room.doorPosition === 'left' || (!room.doorPosition && rx > 500)) && (
                    <g transform={`translate(-2, ${rh - 45})`}>
                      <rect x="0" y="0" width="4" height="36" fill="#FFFFFF" />
                      <path d="M 0 0 A 36 36 0 0 0 0 36" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="0" y1="36" x2="-24" y2="12" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )}
                </g>
              )}

              {/* 🛏️ RESIZED BEDS (+) / 🚁 HELIPADS / 🚑 MOBILE GURNEYS WITH HOVER POPOVER CAPABILITY */}
              {roomBeds.map(bed => {
                const isBedSel = isSelected(bed.id);
                const isCrit = bed.acuity === 'critical';
                const isStable = bed.acuity === 'stable';
                const isDischarged = (bed.status as string) === 'discharged';
                const isVacant = bed.status === 'empty';

                const isHelipad = bed.id.startsWith('HELI') || room.department === 'Aviation' || room.name.toLowerCase().includes('helipad') || room.name.toLowerCase().includes('landing');
                const isGurney = bed.id.startsWith('B-HELI') || room.department === 'STAT Core' || room.name.toLowerCase().includes('trauma chute') || room.name.toLowerCase().includes('gurney');

                const bedIndex = roomBeds.findIndex(b => b.id === bed.id);
                let bx = 20 + (bedIndex * 110);
                let by = 55;

                if (bed.x !== undefined && bed.x >= rx && bed.x <= rx + rw - 30) {
                  bx = bed.x - rx;
                  by = (bed.y !== undefined && bed.y >= ry && bed.y <= ry + rh - 30) ? bed.y - ry : 55;
                } else if (bed.x !== undefined && bed.x >= 0 && bed.x <= rw - 30) {
                  bx = bed.x;
                  by = (bed.y !== undefined && bed.y >= 0 && bed.y <= rh - 30) ? bed.y : 55;
                }
                const rotation = bed.rotation ?? 0;

                const displayName = bed.patientName 
                  ? maskPatientName(bed.patientName, isHipaaMasked)
                  : (isVacant ? (isHelipad ? 'Helipad Clear' : 'Vacant Bay') : 'Patient Chart');

                return (
                  <g 
                    key={bed.id} 
                    transform={`translate(${bx}, ${by})`}
                    className="cursor-pointer group focus:outline-hidden"
                    role="button"
                    tabIndex={0}
                    aria-label={`${isHelipad ? 'Helipad' : isGurney ? 'Gurney' : 'Bed'} ${bed.id} ${displayName} Status ${bed.status} Acuity ${bed.acuity}`}
                    onClick={() => onSelectBed && onSelectBed(bed.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectBed && onSelectBed(bed.id); } }}
                    onMouseEnter={(e) => handleBedMouseEnter(bed, e)}
                    onMouseLeave={handleBedMouseLeave}
                  >
                    {/* 1. HELIPAD AVIATION LANDING ZONE GRAPHIC */}
                    {isHelipad ? (
                      <g transform={`rotate(${rotation} 45 45)`}>
                        {/* SELECTION HIGHLIGHT GLOW */}
                        {isBedSel && (
                          <rect 
                            x="-8" 
                            y="-8" 
                            width="106" 
                            height="106" 
                            rx="16" 
                            fill="#0284C7" 
                            fillOpacity="0.15" 
                            stroke="#0284C7" 
                            strokeWidth="2.5" 
                            strokeDasharray="6 3" 
                          />
                        )}

                        {/* Outer Helipad Touchdown Pad (Octagon / Circle) */}
                        <rect
                          x="0"
                          y="0"
                          width="90"
                          height="90"
                          rx="14"
                          fill="#0F172A"
                          stroke={isBedSel ? '#0284C7' : '#F59E0B'}
                          strokeWidth={isBedSel ? '3' : '2'}
                          filter="url(#bed-drop-shadow)"
                        />

                        {/* Outer Perimeter Yellow Warning Dash Ring */}
                        <circle
                          cx="45"
                          cy="45"
                          r="38"
                          fill="#1E293B"
                          stroke="#F59E0B"
                          strokeWidth="2"
                          strokeDasharray="6 3"
                        />

                        {/* Inner Landing Tarmac Ring */}
                        <circle
                          cx="45"
                          cy="45"
                          r="28"
                          fill="#0F172A"
                          stroke="#F59E0B"
                          strokeWidth="1.5"
                        />

                        {/* Flight Guidance Crosshairs */}
                        <line x1="45" y1="7" x2="45" y2="83" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="3 3" />
                        <line x1="7" y1="45" x2="83" y2="45" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="3 3" />

                        {/* Perimeter LED Strobe Beacons (4 Corners) */}
                        <circle cx="10" cy="10" r="3" fill="#EF4444" className="animate-pulse" />
                        <circle cx="80" cy="10" r="3" fill="#10B981" />
                        <circle cx="10" cy="80" r="3" fill="#F59E0B" />
                        <circle cx="80" cy="80" r="3" fill="#10B981" />

                        {/* Bold Central 'H' Touchdown Graphic */}
                        <text
                          x="45"
                          y="56"
                          fontSize="32"
                          fontWeight="900"
                          fontFamily="sans-serif"
                          fill={isCrit ? '#FDA4AF' : '#F8FAFC'}
                          textAnchor="middle"
                          letterSpacing="-1"
                        >
                          H
                        </text>

                        {/* Helipad Identifier Label Pill */}
                        <rect x="13" y="66" width="64" height="15" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
                        <text
                          x="45"
                          y="77"
                          fontSize="8"
                          fontWeight="bold"
                          fill="#F59E0B"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {bed.id}
                        </text>

                        {/* Inbound / Landed Helicopter Graphic (When Occupied) */}
                        {!isVacant && (
                          <g transform="translate(45, 26)">
                            <circle cx="0" cy="0" r="12" fill="#E11D48" fillOpacity="0.3" className="animate-ping" />
                            {/* Rotor Blades */}
                            <line x1="-16" y1="-5" x2="16" y2="-5" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="0" cy="-5" r="2" fill="#FFFFFF" />
                            {/* Air Ambulance Fuselage */}
                            <path
                              d="M -8 -2 L 8 -2 L 10 4 L -6 4 Z"
                              fill="#E11D48"
                              stroke="#FFFFFF"
                              strokeWidth="1"
                            />
                            {/* Tail Boom */}
                            <line x1="-8" y1="1" x2="-18" y2="-2" stroke="#E11D48" strokeWidth="2" />
                            <line x1="-18" y1="-6" x2="-18" y2="2" stroke="#FFFFFF" strokeWidth="1.5" />
                          </g>
                        )}
                      </g>
                    ) : isGurney ? (
                      /* 2. EMERGENCY RAPID TRANSPORT MOBILE GURNEY */
                      <g transform={`rotate(${rotation} 16 28)`}>
                        {isBedSel && (
                          <rect 
                            x="-4" 
                            y="-4" 
                            width="40" 
                            height="64" 
                            rx="6" 
                            fill="#0284C7" 
                            fillOpacity="0.15" 
                            stroke="#0284C7" 
                            strokeWidth="2.5" 
                            strokeDasharray="4 2" 
                          />
                        )}
                        {/* Gurney Frame */}
                        <rect 
                          x="0" 
                          y="0" 
                          width="32" 
                          height="56" 
                          rx="6" 
                          fill="#FFFFFF"
                          stroke={isBedSel ? '#0284C7' : '#0F172A'}
                          strokeWidth={isBedSel ? '2.5' : '2'}
                          filter="url(#bed-drop-shadow)"
                        />
                        {/* 4 Swivel Wheels */}
                        <circle cx="2" cy="3" r="2.5" fill="#0F172A" />
                        <circle cx="30" cy="3" r="2.5" fill="#0F172A" />
                        <circle cx="2" cy="53" r="2.5" fill="#0F172A" />
                        <circle cx="30" cy="53" r="2.5" fill="#0F172A" />
                        {/* Stretcher Pad */}
                        <rect x="4" y="4" width="24" height="48" rx="3" fill={isCrit ? '#FFE4E6' : '#F1F5F9'} />
                        {/* Head Pillow */}
                        <rect x="6" y="7" width="20" height="9" rx="2" fill={isCrit ? '#F43F5E' : isStable ? '#F59E0B' : isVacant ? '#CBD5E1' : '#0284C7'} />
                        {/* ID */}
                        <text x="16" y="30" fontSize="7.5" fontWeight="bold" fill="#0F172A" textAnchor="middle">
                          {bed.id}
                        </text>
                        {/* Cross */}
                        <path d="M16 36 v6 M13 39 h6" stroke={isCrit ? '#F43F5E' : isStable ? '#F59E0B' : '#0284C7'} strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                    ) : (
                      /* 3. STANDARD INPATIENT HOSPITAL BED */
                      <g transform={`rotate(${rotation} 19 26)`}>
                        {/* SELECTION HIGHLIGHT GLOW */}
                        {isBedSel && (
                          <rect 
                            x="-4" 
                            y="-4" 
                            width="46" 
                            height="60" 
                            rx="6" 
                            fill="#0284C7" 
                            fillOpacity="0.15" 
                            stroke="#0284C7" 
                            strokeWidth="2.5" 
                            strokeDasharray="4 2" 
                          />
                        )}

                        {/* Bed Frame & Mattress (38px x 52px) */}
                        <rect 
                          x="0" 
                          y="0" 
                          width="38" 
                          height="52" 
                          rx="4" 
                          fill="#FFFFFF"
                          stroke={isBedSel ? '#0284C7' : '#0F172A'}
                          strokeWidth={isBedSel ? '2.5' : '2'}
                          filter="url(#bed-drop-shadow)"
                        />

                        {/* Headboard */}
                        <rect x="0" y="0" width="38" height="6" rx="1" fill="#0F172A" />
                        
                        {/* Pillow (Acuity Color) */}
                        <rect 
                          x="5" 
                          y="9" 
                          width="28" 
                          height="10" 
                          rx="2" 
                          fill={isCrit ? '#F43F5E' : isStable ? '#F59E0B' : isVacant ? '#E2E8F0' : '#0284C7'} 
                        />

                        {/* Bed Identifier Label */}
                        <text 
                          x="19" 
                          y="30" 
                          fontSize="8" 
                          fontWeight="bold" 
                          fill="#0F172A" 
                          textAnchor="middle"
                        >
                          {bed.id}
                        </text>

                        {/* Medical Plus (+) Care Symbol */}
                        <path 
                          d="M19 36 v8 M15 40 h8" 
                          stroke={isCrit ? '#F43F5E' : isStable ? '#F59E0B' : isVacant ? '#CBD5E1' : '#0284C7'} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                        />

                        {/* IV Drip Pole with Status Lamp */}
                        <circle cx="3" cy="9" r="2.5" fill={isCrit ? '#E11D48' : isStable ? '#F59E0B' : '#64748B'} />
                        <circle cx="3" cy="9" r="1" fill="#FFFFFF" />
                      </g>
                    )}

                    {/* MICRO ACUITY STATUS PILL ANCHORED UNDER ITEM */}
                    <g transform={`translate(${isHelipad ? 45 : isGurney ? 16 : 19}, ${isHelipad ? 94 : isGurney ? 60 : 56})`}>
                      {isHelipad ? (
                        isCrit ? (
                          <g filter="url(#glass-glow-critical)">
                            <rect x="-32" y="0" width="64" height="14" rx="7" fill="#E11D48" fillOpacity="0.95" stroke="#FDA4AF" strokeWidth="1" />
                            <text x="0" y="10" fontSize="7.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">AIR AMBULANCE</text>
                          </g>
                        ) : (
                          <g>
                            <rect x="-24" y="0" width="48" height="14" rx="7" fill="#0F172A" fillOpacity="0.9" stroke="#F59E0B" strokeWidth="1" />
                            <text x="0" y="10" fontSize="7.5" fontWeight="bold" fill="#F59E0B" textAnchor="middle">PAD CLEAR</text>
                          </g>
                        )
                      ) : isCrit ? (
                        <g filter="url(#glass-glow-critical)">
                          <rect x="-24" y="0" width="48" height="14" rx="7" fill="#E11D48" fillOpacity="0.95" stroke="#FDA4AF" strokeWidth="1" />
                          <text x="0" y="10" fontSize="7.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">CRITICAL</text>
                        </g>
                      ) : isStable ? (
                        <g>
                          <rect x="-21" y="0" width="42" height="14" rx="7" fill="#FEF3C7" fillOpacity="0.95" stroke="#F59E0B" strokeWidth="1" />
                          <text x="0" y="10" fontSize="7.5" fontWeight="bold" fill="#B45309" textAnchor="middle">STABLE</text>
                        </g>
                      ) : isDischarged ? (
                        <g>
                          <rect x="-26" y="0" width="52" height="14" rx="7" fill="#D1FAE5" fillOpacity="0.95" stroke="#10B981" strokeWidth="1" />
                          <text x="0" y="10" fontSize="7.5" fontWeight="bold" fill="#065F46" textAnchor="middle">DISCHG</text>
                        </g>
                      ) : (
                        <g>
                          <rect x="-20" y="0" width="40" height="14" rx="7" fill="#F1F5F9" fillOpacity="0.9" stroke="#CBD5E1" strokeWidth="1" />
                          <text x="0" y="10" fontSize="7.5" fontWeight="bold" fill="#64748B" textAnchor="middle">VACANT</text>
                        </g>
                      )}
                    </g>

                  </g>
                );
              })}

            </g>
          );
        })}

        </svg>
        </div>
      </div>

      {/* 3. INTERACTIVE PATIENT SUMMARY HOVER POPOVER BUBBLE */}
      {hoveredBed && popoverPos && (
        <div 
          className="fixed z-50 pointer-events-auto transition-all duration-200 animate-in fade-in zoom-in-95"
          style={{
            left: `${popoverPos.x}px`,
            top: `${popoverPos.y}px`,
            transform: 'translate(-50%, -100%) translateY(-14px)',
          }}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
          onClick={() => {
            onSelectBed?.(hoveredBed.id);
            setHoveredBed(null);
          }}
        >
          <div className="w-84 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 cursor-pointer hover:border-sky-500/80 transition-all group">
            {/* Header: Profile Photo / Avatar + Acuity */}
            <div className="flex items-center gap-3 mb-3">
              {hoveredBed.patientName ? (
                <DynamicPatientAvatar
                  photoUrl={hoveredBed.patientSafety?.photoUrl}
                  patientName={hoveredBed.patientName}
                  bedId={hoveredBed.id}
                  size="md"
                  shape="rounded"
                  acuity={hoveredBed.acuity === 'critical' ? 'critical' : 'stable'}
                  allowUpload={true}
                />
              ) : (
                <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shadow-inner shrink-0 bg-gradient-to-br from-slate-600 to-slate-800 text-slate-300 ring-2 ring-slate-600">
                  <span className="text-xl">🛏️</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[11px] text-sky-400 font-bold">{hoveredBed.id}</span>
                  <span className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    hoveredBed.acuity === 'critical'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                      : hoveredBed.acuity === 'stable'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-700 text-slate-300 border border-slate-600'
                  }`}>
                    {hoveredBed.acuity === 'critical' ? '🚨 Critical' : hoveredBed.acuity === 'stable' ? '⚠️ Stable' : 'Vacant Bay'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white truncate mt-0.5">
                  {hoveredBed.patientName 
                    ? maskPatientName(hoveredBed.patientName, isHipaaMasked)
                    : 'Vacant Bay (Ready for Intake)'}
                </h4>

                <p className="text-[11px] text-slate-400 truncate">
                  {hoveredBed.patientSafety?.age ? `${hoveredBed.patientSafety.age} yo • ${hoveredBed.patientSafety.gender || 'Patient'}` : `Floor ${floorNumber} • ${currentFloorMeta.name}`}
                </p>
              </div>
            </div>

            {/* Live Vitals Micro-Grid */}
            {hoveredBed.patientSafety?.vitals ? (
              <div className="grid grid-cols-4 gap-1.5 p-2 bg-slate-800/80 rounded-xl border border-slate-700/50 mb-3 text-center">
                <div className="bg-slate-900/60 p-1.5 rounded-lg">
                  <span className="text-[9px] text-slate-400 block font-medium">BP</span>
                  <span className={`text-[11px] font-mono font-bold ${hoveredBed.acuity === 'critical' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {hoveredBed.patientSafety.vitals.bp || '120/80'}
                  </span>
                </div>
                <div className="bg-slate-900/60 p-1.5 rounded-lg">
                  <span className="text-[9px] text-slate-400 block font-medium">HR</span>
                  <span className={`text-[11px] font-mono font-bold ${hoveredBed.acuity === 'critical' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {hoveredBed.patientSafety.vitals.hr || 75} <span className="text-[8px] font-normal">bpm</span>
                  </span>
                </div>
                <div className="bg-slate-900/60 p-1.5 rounded-lg">
                  <span className="text-[9px] text-slate-400 block font-medium">SpO2</span>
                  <span className={`text-[11px] font-mono font-bold ${hoveredBed.patientSafety.vitals.spo2 && hoveredBed.patientSafety.vitals.spo2 < 92 ? 'text-rose-400' : 'text-sky-400'}`}>
                    {hoveredBed.patientSafety.vitals.spo2 || 98}%
                  </span>
                </div>
                <div className="bg-slate-900/60 p-1.5 rounded-lg">
                  <span className="text-[9px] text-slate-400 block font-medium">TEMP</span>
                  <span className="text-[11px] font-mono font-bold text-slate-200">
                    {hoveredBed.patientSafety.vitals.temp || 37.0}°C
                  </span>
                </div>
              </div>
            ) : hoveredBed.patientName ? (
              <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/50 mb-3 text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">MRN Dossier</span>
                {hoveredBed.patientSafety?.mrn || 'MRN-VERIFIED'} • Active Monitoring
              </div>
            ) : null}

            {/* Chief Complaint / Clinical Notes */}
            {hoveredBed.patientSafety?.chiefComplaint && (
              <div className="mb-3 px-2.5 py-1.5 bg-slate-800/60 rounded-lg text-[11px] text-slate-300 border border-slate-700/40 flex items-start gap-1.5">
                <span className="text-amber-400 shrink-0">📋</span>
                <span className="truncate">{hoveredBed.patientSafety.chiefComplaint}</span>
              </div>
            )}

            {/* Action Callout Click Trigger */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-sky-400 font-semibold group-hover:text-sky-300">
              <span>Click bubble or bed for complete dossier</span>
              <span className="transition-transform group-hover:translate-x-1">➔</span>
            </div>

            {/* Pointer Caret */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-900/95" />
          </div>
        </div>
      )}
    </div>
  );
};
