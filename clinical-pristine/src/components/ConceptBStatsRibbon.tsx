import React from 'react';

interface Props {
  occupiedCount?: number;
  availableCount?: number;
  avgAcuity?: string;
  totalBedsCount?: number;
  criticalCount?: number;
  stableCount?: number;
  isBuilderMode?: boolean;
  onToggleBuilderMode?: (enabled: boolean) => void;
  onSelectBlueprint?: () => void;
  isHipaaMasked?: boolean;
  onToggleHipaa?: () => void;
}

export const ConceptBStatsRibbon: React.FC<Props> = ({
  occupiedCount = 0,
  availableCount = 0,
  avgAcuity = '0/0',
  totalBedsCount = 0,
  criticalCount = 0,
  stableCount = 0,
  isBuilderMode = false,
  onToggleBuilderMode,
  onSelectBlueprint,
  isHipaaMasked = false,
  onToggleHipaa,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const total = totalBedsCount > 0 ? totalBedsCount : (occupiedCount + availableCount);
  const critPct = total > 0 ? (criticalCount / total) * 100 : 0;
  const stblPct = total > 0 ? (stableCount / total) * 100 : 0;
  const emptPct = total > 0 ? (availableCount / total) * 100 : 100;

  // IN CAD BUILDER MODE: Ultra-Compact Single-Row Header (Saves ~100px vertical space)
  if (isBuilderMode) {
    return (
      <div className="pb-2 mb-2 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0 select-none">
        {/* Left: Title + Micro Stat Badges */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <h2 className="text-sm font-bold text-slate-900 font-sans tracking-tight">
            Architectural CAD Blueprint Builder
          </h2>

          <div className="h-3.5 w-px bg-slate-200"></div>

          {/* Micro Stat 1: Occupied */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span><strong>{occupiedCount}</strong> Occupied</span>
          </div>

          {/* Micro Stat 2: Available */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span><strong>{availableCount}</strong> Available</span>
          </div>

          {/* Micro Stat 3: Acuity */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700">
            <span>Acuity: <strong>{avgAcuity}</strong></span>
          </div>

          {/* Micro Stat 4: Mini Dynamic Census Bar */}
          <div className="hidden xl:flex items-center gap-1.5 pl-1">
            <span className="text-[10px] text-slate-500 font-medium">Census:</span>
            <div className="w-24 h-2 rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
              {critPct > 0 && <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${critPct}%` }} title={`Critical (${critPct.toFixed(0)}%)`} />}
              {stblPct > 0 && <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${stblPct}%` }} title={`Stable (${stblPct.toFixed(0)}%)`} />}
              {emptPct > 0 && <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${emptPct}%` }} title={`Vacant (${emptPct.toFixed(0)}%)`} />}
            </div>
          </div>
        </div>

        {/* Right: Mode Switcher Dropdown */}
        <div className="flex items-center gap-2 relative shrink-0">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span className="font-bold text-blue-700">CAD Architect Mode</span>
            <span className="text-slate-500 text-[10px]">▾</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 flex flex-col gap-1 text-xs">
              <button
                onClick={() => {
                  onToggleBuilderMode?.(false);
                  onSelectBlueprint?.();
                  setIsDropdownOpen(false);
                }}
                className="p-2 rounded-lg text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="font-bold block">Hospital Blueprint</span>
                <span className="text-[10px] text-slate-500 font-normal">Live clinical telemetry &amp; bed management</span>
              </button>

              <button
                onClick={() => {
                  onToggleBuilderMode?.(true);
                  setIsDropdownOpen(false);
                }}
                className="p-2 rounded-lg text-left font-semibold bg-blue-50 text-blue-700 transition-colors cursor-pointer"
              >
                <span className="font-bold block">CAD Floorplan Builder</span>
                <span className="text-[10px] text-blue-600 font-normal">Drag-and-drop rooms, resize bays &amp; save</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // IN LIVE HOSPITAL MAP MODE: Full Occupancy Stats Card Header
  return (
    <div className="pb-3 mb-3 border-b border-slate-200 relative">
      {/* Top Header of the Main Card */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-slate-900 font-sans tracking-tight">
          Live Occupancy Stats
        </h2>
        <div className="flex items-center gap-2 relative">
          {onToggleHipaa && (
            <button
              onClick={onToggleHipaa}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer shadow-2xs ${
                isHipaaMasked 
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
              title="Toggle HIPAA Privacy Shield to mask patient names on screen"
            >
              <span>{isHipaaMasked ? '🛡️ HIPAA Shield: ON' : '🛡️ HIPAA Shield: OFF'}</span>
            </button>
          )}

          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <span>Hospital Blueprint</span>
            <span className="text-slate-500 text-[10px]">▾</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 flex flex-col gap-1 text-xs">
              <button
                onClick={() => {
                  onToggleBuilderMode?.(false);
                  onSelectBlueprint?.();
                  setIsDropdownOpen(false);
                }}
                className="p-2 rounded-lg text-left font-semibold bg-blue-50 text-blue-700 transition-colors cursor-pointer"
              >
                <span className="font-bold">Hospital Blueprint</span>
                <span className="text-[10px] text-slate-500">Live clinical telemetry &amp; bed management</span>
              </button>

              <button
                onClick={() => {
                  onToggleBuilderMode?.(true);
                  setIsDropdownOpen(false);
                }}
                className="p-2 rounded-lg text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span className="font-bold">CAD Floorplan Builder</span>
                <span className="text-[10px] text-slate-500">Drag-and-drop rooms, resize bays &amp; save</span>
              </button>
            </div>
          )}

          <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
            <span className="text-sm font-black leading-none tracking-widest">•••</span>
          </button>
        </div>
      </div>

      {/* Stats Numbers Row */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-1">
        {/* Stat 1: Occupied Beds */}
        <div className="flex flex-col">
          <span className="text-3xl font-black text-slate-950 leading-none tracking-tight font-sans">
            {occupiedCount}
          </span>
          <span className="text-xs font-semibold text-slate-600 mt-1">
            Occupied Beds
          </span>
        </div>

        {/* Stat 2: Available Beds */}
        <div className="flex flex-col">
          <span className="text-3xl font-black text-slate-950 leading-none tracking-tight font-sans">
            {availableCount}
          </span>
          <span className="text-xs font-semibold text-slate-600 mt-1">
            Available Beds
          </span>
        </div>

        {/* Stat 3: Avg. Telemetry */}
        <div className="flex flex-col">
          <span className="text-3xl font-black text-slate-950 leading-none tracking-tight font-sans">
            {total > 0 ? `${((occupiedCount / total) * 100).toFixed(0)}%` : '0%'}
          </span>
          <span className="text-xs font-semibold text-slate-600 mt-1">
            Occupancy Rate
          </span>
        </div>

        {/* Stat 4: Average Acuity */}
        <div className="flex flex-col">
          <span className="text-3xl font-black text-slate-950 leading-none tracking-tight font-sans">
            {avgAcuity}
          </span>
          <span className="text-xs font-semibold text-slate-600 mt-1">
            Critical / Occupied
          </span>
        </div>

        {/* Stat 5: Dynamic Computed Multi-Segment Census Bar */}
        <div className="flex flex-col min-w-[200px] lg:min-w-[240px]">
          <span className="text-xs font-bold text-slate-800 leading-none tracking-tight font-sans mb-1.5 flex justify-between">
            <span>Floor Census</span>
            <span className="text-slate-500 font-mono">{occupiedCount}/{total} Beds</span>
          </span>
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200 p-0.5 shadow-inner">
            {critPct > 0 && <div className="h-full bg-rose-500 rounded-l-full transition-all duration-300" style={{ width: `${critPct}%` }} title={`Critical: ${criticalCount} (${critPct.toFixed(0)}%)`} />}
            {stblPct > 0 && <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${stblPct}%` }} title={`Stable: ${stableCount} (${stblPct.toFixed(0)}%)`} />}
            {emptPct > 0 && <div className="h-full bg-emerald-500 rounded-r-full transition-all duration-300" style={{ width: `${emptPct}%` }} title={`Available: ${availableCount} (${emptPct.toFixed(0)}%)`} />}
          </div>
        </div>
      </div>
    </div>
  );
};
