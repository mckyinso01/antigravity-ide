import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  ChevronDown, 
  Layers, 
  Search, 
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_HOSPITAL_FLOORS, type BedData } from '../db';

interface MultiFloorNavigatorProps {
  currentFloorNumber: number;
  onSelectFloor: (floorNumber: number) => void;
  allBeds: BedData[];
  alerts?: any[];
  isCodeBlueActive?: boolean;
}

export const MultiFloorNavigator: React.FC<MultiFloorNavigatorProps> = ({
  currentFloorNumber,
  onSelectFloor,
  allBeds,
  isCodeBlueActive
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentFloor = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === currentFloorNumber) || {
    number: currentFloorNumber,
    name: `Level ${currentFloorNumber}`,
    department: 'General Care',
    shortCode: `L${currentFloorNumber}`,
    badge: 'General',
    color: 'blue'
  };

  // Compute live floor stats
  const getFloorStats = (floorNum: number) => {
    const floorBeds = allBeds.filter(b => (b.floorNumber ?? 1) === floorNum);
    const occupied = floorBeds.filter(b => b.status === 'occupied').length;
    const critical = floorBeds.filter(b => b.status === 'occupied' && b.acuity === 'critical').length;
    const total = floorBeds.length;
    return { occupied, critical, total };
  };

  const filteredFloors = DEFAULT_HOSPITAL_FLOORS.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `floor ${f.number}`.includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative font-mono text-xs" ref={dropdownRef}>
      {/* Interactive Header Dropdown Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-xl transition-all shadow-xs group cursor-pointer"
        title="Switch Hospital Level / Ward Floor (1 to 18)"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-slate-900 font-mono flex items-center gap-1.5">
          <Building2 size={15} className="text-blue-600" />
          <span className="text-blue-600 font-bold">{currentFloor.shortCode}:</span>
          <span className="text-slate-800">{currentFloor.name}</span>
        </span>
        <span className="text-[10px] text-slate-500 hidden sm:inline px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
          {currentFloor.department}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>

      {/* Dropdown Menu (18-Storey Hospital Navigator) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-[100] overflow-hidden flex flex-col max-h-[480px]"
          >
            {/* Header / Search */}
            <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers size={14} className="text-blue-600" />
                  <span>18-STOREY TOWER DIRECTORY</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  18 Levels Total
                </div>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search level, department, ICU..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>

            {/* Floor List Scrollable */}
            <div className="overflow-y-auto custom-scrollbar p-1.5 divide-y divide-slate-100">
              {filteredFloors.map(floor => {
                const isSelected = floor.number === currentFloorNumber;
                const stats = getFloorStats(floor.number);

                return (
                  <button
                    key={floor.number}
                    onClick={() => {
                      onSelectFloor(floor.number);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer group ${
                      isSelected
                        ? 'bg-blue-50 border border-blue-200 text-blue-950 font-medium'
                        : 'hover:bg-slate-50 text-slate-700 hover:text-slate-950 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Floor Badge */}
                      <div 
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono border ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                            : 'bg-slate-100 text-slate-600 border-slate-200 group-hover:text-blue-600 group-hover:border-blue-200'
                        }`}
                      >
                        {floor.number}
                      </div>

                      {/* Floor Info */}
                      <div>
                        <div className="font-bold flex items-center gap-1.5 text-xs text-slate-900">
                          <span>{floor.name}</span>
                          {floor.number === 1 && isCodeBlueActive && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] bg-rose-100 text-rose-700 border border-rose-200 animate-pulse font-bold">
                              <Flame size={10} /> CODE BLUE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{floor.department}</span>
                          {floor.badge && (
                            <span className="text-blue-600 font-bold text-[9px]">
                              • {floor.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Live Bed Count Pill */}
                    <div className="text-right">
                      {stats.total > 0 ? (
                        <div className="text-[10px] font-mono">
                          <span className={stats.critical > 0 ? 'text-rose-600 font-bold' : 'text-slate-600'}>
                            {stats.occupied}/{stats.total} Beds
                          </span>
                          {stats.critical > 0 && (
                            <div className="text-[9px] text-rose-600 font-bold">
                              {stats.critical} Critical
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400">Empty / Layout</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Elevator Quick-Buttons */}
            <div className="p-2 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Jump to:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 5, 12, 18].map(fn => (
                  <button
                    key={fn}
                    onClick={() => {
                      onSelectFloor(fn);
                      setIsOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer transition-colors ${
                      currentFloorNumber === fn
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    L{fn}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

