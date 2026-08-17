import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  ScanLine, 
  Search, 
  Layers, 
  ChevronDown,
  Terminal,
  RotateCcw
} from 'lucide-react';


interface NavigationHeaderProps {
  onOpenScanner: () => void;
  onOpenSpecs: () => void;
  onOpenCleanSweep: () => void;
  onOpenSearch: (query: string) => void;
  activeWarehouseName: string;
  onChangeWarehouse: (name: string) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  onOpenScanner,
  onOpenSpecs,
  onOpenCleanSweep,
  onOpenSearch,
  activeWarehouseName,
  onChangeWarehouse
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onOpenSearch(e.target.value);
  };

  return (
    <header className="h-14 border-b border-[#1E2D4D] bg-[#070B14]/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-30 font-sans">
      {/* Left: Brand & Warehouse Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5BC0BE] to-[#3A86FF] flex items-center justify-center text-[#070B14] font-black shadow-lg glow-mint">
            <Boxes size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white font-mono">OMNISTOCK</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1E2D4D] text-[#6FFFE9] font-bold">WMS-v2.6</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono block -mt-0.5">Spatial CAD & Autonomous 3PL Hub</span>
          </div>
        </div>

        {/* Warehouse Selector Dropdown */}
        <div 
          onClick={() => {
            const next = activeWarehouseName.includes('Alpha') 
              ? 'Warehouse Beta • West Coast Gateway' 
              : 'Warehouse Alpha • Northeast Logistics Hub';
            onChangeWarehouse(next);
          }}
          className="hidden lg:flex items-center gap-2 bg-[#0D1527] hover:bg-[#121D36] border border-[#1E2D4D] px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all"
        >
          <Layers size={14} className="text-[#5BC0BE]" />
          <span className="text-slate-300 font-medium">{activeWarehouseName}</span>
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">5 ZONES</span>
          <ChevronDown size={12} className="text-slate-400" />
        </div>
      </div>


      {/* Center: Real-time Barcode / SKU Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Scan / Search SKU, GS1 Barcode, Bin Code (e.g. A-01-L1)..."
            className="w-full bg-[#0D1527] border border-[#1E2D4D] focus:border-[#5BC0BE] text-slate-100 text-xs rounded-xl pl-9 pr-16 py-2 outline-none transition-all placeholder:text-slate-500 font-mono"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-[#1E2D4D] px-1.5 py-0.5 rounded border border-slate-700">
            Ctrl+K
          </span>
        </div>
      </div>

      {/* Right: Telemetry Controls & Status Badges */}
      <div className="flex items-center gap-2.5">
        {/* P2P Cluster Online Sync Badge & Clock */}
        <div className="flex items-center gap-2 bg-[#0D1527] border border-emerald-900/60 px-2.5 py-1 rounded-lg text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="hidden sm:inline font-bold">CLUSTER SYNC</span>
          <span className="text-slate-400 text-[10px] border-l border-[#1E2D4D] pl-2">{time}</span>
        </div>


        {/* Quick Camera Barcode Scanner Trigger */}
        <button
          onClick={onOpenScanner}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#5BC0BE] to-[#3A86FF] hover:opacity-90 text-[#070B14] font-bold text-xs px-3 py-1.5 rounded-lg shadow-md transition-all cursor-pointer glow-mint shrink-0"
        >
          <ScanLine size={15} className="stroke-[2.5]" />
          <span className="hidden sm:inline">Camera/RFID Scanner</span>
        </button>

        {/* System Specs & Licensing */}
        <button
          onClick={onOpenSpecs}
          className="flex items-center gap-1.5 bg-[#0D1527] hover:bg-[#121D36] border border-[#1E2D4D] hover:border-[#5BC0BE] text-slate-300 text-xs px-2.5 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 font-mono"
        >
          <Terminal size={14} className="text-[#5BC0BE]" />
          <span className="hidden sm:inline">Specs & Pricing</span>
        </button>

        {/* Clean Sweep / Reset */}
        <button
          onClick={onOpenCleanSweep}
          title="Warehouse Clean Sweep / Reset"
          className="p-1.5 bg-[#0D1527] hover:bg-rose-950/40 border border-[#1E2D4D] hover:border-rose-800 text-slate-400 hover:text-rose-400 rounded-lg transition-all cursor-pointer shrink-0"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </header>
  );
};
