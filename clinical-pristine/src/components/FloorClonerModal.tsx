import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  AlertCircle, 
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, DEFAULT_HOSPITAL_FLOORS, type RoomData, type BedData, type WallData } from '../db';

interface FloorClonerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFloorNumber: number;
  onFloorCloned: (targetFloorNumber: number) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const FloorClonerModal: React.FC<FloorClonerModalProps> = ({
  isOpen,
  onClose,
  currentFloorNumber,
  onFloorCloned,
  showToast
}) => {
  const [targetFloors, setTargetFloors] = useState<number[]>([]);
  const [isCloning, setIsCloning] = useState(false);
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [includeBeds, setIncludeBeds] = useState(true);
  const [includeWalls, setIncludeWalls] = useState(true);

  if (!isOpen) return null;

  const currentFloorMeta = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === currentFloorNumber) || {
    number: currentFloorNumber,
    name: `Level ${currentFloorNumber}`,
    department: 'Hospital Ward'
  };

  const handleToggleFloor = (floorNum: number) => {
    if (floorNum === currentFloorNumber) return; // Cannot clone into self
    setTargetFloors(prev => 
      prev.includes(floorNum) ? prev.filter(f => f !== floorNum) : [...prev, floorNum]
    );
  };

  const handleSelectTypicalWardRange = () => {
    // Typical Med-Surg inpatient block is Floors 5 through 15
    const typical = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].filter(f => f !== currentFloorNumber);
    setTargetFloors(typical);
  };

  const handleSelectAllUpperFloors = () => {
    const uppers = Array.from({ length: 18 }, (_, i) => i + 1).filter(f => f > currentFloorNumber);
    setTargetFloors(uppers);
  };

  const handleClearSelection = () => {
    setTargetFloors([]);
  };

  const handleExecuteClone = async () => {
    if (targetFloors.length === 0) {
      showToast("Please select at least one target floor level.", "error");
      return;
    }

    setIsCloning(true);
    try {
      // 1. Fetch all elements from source floor
      const sourceRooms = await db.rooms.filter(r => (r.floorNumber ?? 1) === currentFloorNumber).toArray();
      const sourceWalls = await db.walls.filter(w => (w.floorNumber ?? 1) === currentFloorNumber).toArray();
      const sourceBeds = await db.beds.filter(b => (b.floorNumber ?? 1) === currentFloorNumber).toArray();

      if (sourceRooms.length === 0 && sourceWalls.length === 0) {
        showToast(`Current Level ${currentFloorNumber} has no rooms or walls to clone!`, 'error');
        setIsCloning(false);
        return;
      }

      let totalRoomsCreated = 0;
      let totalBedsCreated = 0;

      // 2. Clone sequentially into each target floor
      for (const targetFloor of targetFloors) {
        // If overwrite is requested, clear target floor items
        if (overwriteExisting) {
          const existingRoomIds = (await db.rooms.filter(r => (r.floorNumber ?? 1) === targetFloor).toArray()).map(r => r.id);
          const existingWallIds = (await db.walls.filter(w => (w.floorNumber ?? 1) === targetFloor).toArray()).map(w => w.id);
          const existingBedIds = (await db.beds.filter(b => (b.floorNumber ?? 1) === targetFloor).toArray()).map(b => b.id);
          const existingTagIds = (await db.floorTags.filter(t => (t.floorNumber ?? 1) === targetFloor).toArray()).map(t => t.id);

          await db.rooms.bulkDelete(existingRoomIds);
          await db.walls.bulkDelete(existingWallIds);
          await db.beds.bulkDelete(existingBedIds);
          await db.floorTags.bulkDelete(existingTagIds);
        }

        // Clone Walls
        if (includeWalls) {
          const newWalls: WallData[] = sourceWalls.map((w, idx) => ({
            ...w,
            id: `W-F${targetFloor}-${idx + 1}-${Date.now().toString().slice(-4)}`,
            floorNumber: targetFloor
          }));
          await db.walls.bulkPut(newWalls);
        }

        // Clone Rooms with intelligent renumbering (e.g. Room 101 -> Room 501 on Level 5)
        const roomIdMap = new Map<string, string>();
        const newRooms: RoomData[] = sourceRooms.map((r, idx) => {
          const roomSuffix = idx + 1;
          const targetRoomNumber = (targetFloor * 100) + roomSuffix;
          const newRoomId = `R-${targetRoomNumber}`;
          roomIdMap.set(r.id, newRoomId);

          return {
            ...r,
            id: newRoomId,
            name: `Room ${targetRoomNumber}`,
            floorNumber: targetFloor,
            status: 'empty', // Cloned rooms start clean & empty
            acuity: 'none'
          };
        });

        await db.rooms.bulkPut(newRooms);
        totalRoomsCreated += newRooms.length;

        // Clone Beds mapped to new room IDs
        if (includeBeds) {
          const newBeds: BedData[] = sourceBeds.map((b, idx) => {
            const newRoomId = roomIdMap.get(b.room) || `R-${targetFloor * 100 + (idx + 1)}`;
            const bedSuffix = b.id.includes('A') ? 'A' : b.id.includes('B') ? 'B' : `${idx + 1}`;
            const targetRoomNumStr = newRoomId.replace('R-', '');
            const newBedId = `B-${targetRoomNumStr}${bedSuffix}`;

            return {
              ...b,
              id: newBedId,
              room: newRoomId,
              floorNumber: targetFloor,
              status: 'empty',
              acuity: 'none',
              patientName: undefined,
              patientSafety: undefined
            };
          });

          await db.beds.bulkPut(newBeds);
          totalBedsCreated += newBeds.length;
        }
      }

      showToast(`Cloned Level ${currentFloorNumber} layout to ${targetFloors.length} floors (${totalRoomsCreated} rooms, ${totalBedsCreated} beds generated)!`, 'success');
      
      // Auto-navigate to first cloned target floor
      if (targetFloors[0]) {
        onFloorCloned(targetFloors[0]);
      }
      onClose();
    } catch (err) {
      console.error("Cloner error:", err);
      showToast("Failed to clone floor layout.", "error");
    } finally {
      setIsCloning(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 font-sans">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white border-2 border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900"
        >
          {/* Header */}
          <div className="p-4 border-b-2 border-slate-300 flex items-center justify-between bg-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 flex items-center justify-center border-2 border-slate-300 shadow-xs font-black">
                <Copy size={20} />
              </div>
              <div>
                <h2 className="text-base font-black text-slate-950 font-display flex items-center gap-2">
                  <span>18-Storey Ward Layout Mass Cloner</span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border-2 border-emerald-300 font-black">
                    High-Velocity Builder
                  </span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5 font-mono font-bold">
                  Source: <strong className="text-emerald-800">Level {currentFloorNumber} ({currentFloorMeta.name})</strong> ➔ Select target floors to replicate
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-rose-50 text-slate-600 hover:text-rose-700 rounded-xl border-2 border-slate-300 bg-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 overflow-y-auto space-y-5 custom-scrollbar flex-1 text-xs bg-slate-50">
            {/* Fast Presets */}
            <div>
              <div className="text-[11px] font-black text-slate-950 uppercase tracking-wider mb-2 flex items-center justify-between font-mono">
                <span>Quick Range Selection</span>
                <span className="text-emerald-800 font-black">{targetFloors.length} target floors selected</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleSelectTypicalWardRange}
                  className="px-3.5 py-2.5 bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-500 rounded-xl text-left transition-all cursor-pointer font-black text-slate-950 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="text-emerald-800 font-mono font-black">Floors 5 to 15</div>
                  <div className="text-[10px] text-slate-600 font-bold">Typical Med-Surg Tower</div>
                </button>
                <button
                  type="button"
                  onClick={handleSelectAllUpperFloors}
                  className="px-3.5 py-2.5 bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-500 rounded-xl text-left transition-all cursor-pointer font-black text-slate-950 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="text-blue-800 font-mono font-black">All Upper Floors</div>
                  <div className="text-[10px] text-slate-600 font-bold">Levels {currentFloorNumber + 1} to 18</div>
                </button>
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="px-3.5 py-2.5 bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-rose-400 rounded-xl text-left transition-all cursor-pointer font-black text-slate-700 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="text-rose-700 font-mono font-black">Clear Selection</div>
                  <div className="text-[10px] text-slate-500 font-bold">Reset target checkboxes</div>
                </button>
              </div>
            </div>

            {/* Target Floor Grid (18 Floors) */}
            <div>
              <div className="text-[11px] font-black text-slate-950 uppercase tracking-wider mb-2 font-mono">
                Target Building Levels (1 to 18)
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {DEFAULT_HOSPITAL_FLOORS.map(floor => {
                  const isCurrent = floor.number === currentFloorNumber;
                  const isSelected = targetFloors.includes(floor.number);

                  return (
                    <button
                      key={floor.number}
                      type="button"
                      disabled={isCurrent}
                      onClick={() => handleToggleFloor(floor.number)}
                      className={`p-2.5 rounded-xl border-2 flex flex-col items-center text-center transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs font-black ring-2 ring-emerald-400'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-900 shadow-xs'
                      }`}
                    >
                      <span className="text-xs font-black font-mono">L{floor.number}</span>
                      <span className="text-[10px] text-slate-700 truncate w-full mt-0.5 font-bold">{floor.shortCode}</span>
                      {isCurrent && <span className="text-[9px] text-amber-800 mt-1 font-black">SOURCE</span>}
                      {isSelected && <span className="text-[9px] text-emerald-800 mt-1 font-black uppercase">SELECTED</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Options */}
            <div className="p-4 bg-white border-2 border-slate-300 rounded-2xl space-y-2.5 shadow-sm">
              <div className="text-xs font-black text-slate-950 font-mono">Cloning Parameters</div>
              
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={includeWalls}
                  onChange={e => setIncludeWalls(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span>Include Perimeter Walls &amp; Doorways</span>
              </label>

              <label className="flex items-center gap-2 text-slate-700 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={includeBeds}
                  onChange={e => setIncludeBeds(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <span>Include Beds with Smart Room Numbering (e.g., Room 101 ➔ Room 501 on Level 5)</span>
              </label>

              <label className="flex items-center gap-2 text-rose-600 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={overwriteExisting}
                  onChange={e => setOverwriteExisting(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 border-slate-300"
                />
                <span>Overwrite existing layouts on selected target floors</span>
              </label>
            </div>

            {/* Safety Warning */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-900 text-[11px]">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
              <div>
                <strong>Auto-Sanitization Applied:</strong> All cloned beds and rooms will be initialized in <strong>Clean / Empty</strong> state with fresh IDs. Active clinical patients remain undisturbed on Level {currentFloorNumber}.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
            <div className="text-xs text-slate-500 font-mono">
              {targetFloors.length === 0 ? 'Select target floors above' : `Ready to clone Level ${currentFloorNumber} to ${targetFloors.length} floors`}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={targetFloors.length === 0 || isCloning}
                onClick={handleExecuteClone}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-xs text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles size={15} />
                <span>{isCloning ? 'Cloning Wards...' : `Replicate Layout (${targetFloors.length} Floors)`}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
