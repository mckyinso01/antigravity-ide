import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  BedDouble, 
  Search, 
  UserPlus
} from 'lucide-react';
import { type BedData } from '../../db';

interface BedCensusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  beds: BedData[];
  onSelectBed: (bedId: string) => void;
  onAdmitPatient: (bedId?: string) => void;
  currentFloorNumber: number;
}

export const BedCensusDrawer: React.FC<BedCensusDrawerProps> = ({
  isOpen,
  onClose,
  beds,
  onSelectBed,
  onAdmitPatient,
  currentFloorNumber
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'empty' | 'critical' | 'isolation' | 'cleaning'>('all');

  const filteredBeds = useMemo(() => {
    return beds.filter(bed => {
      const bFloor = bed.floorNumber ?? 1;
      if (bFloor !== currentFloorNumber) return false;

      if (statusFilter === 'empty' && bed.status !== 'empty') return false;
      if (statusFilter === 'critical' && (bed.status !== 'occupied' || bed.acuity !== 'critical')) return false;
      if (statusFilter === 'isolation' && (!bed.patientSafety?.isolation || bed.patientSafety.isolation === 'none')) return false;
      if (statusFilter === 'cleaning' && bed.status !== 'cleaning') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = bed.id.toLowerCase().includes(q);
        const matchesRoom = bed.room?.toLowerCase().includes(q);
        const matchesName = bed.patientName?.toLowerCase().includes(q);
        const matchesMrn = bed.patientSafety?.mrn?.toLowerCase().includes(q);
        if (!matchesId && !matchesRoom && !matchesName && !matchesMrn) return false;
      }

      return true;
    });
  }, [beds, currentFloorNumber, statusFilter, searchQuery]);

  const totalOccupied = beds.filter(b => b.status === 'occupied').length;
  const totalAvailable = beds.filter(b => b.status === 'empty').length;
  const totalCritical = beds.filter(b => b.status === 'occupied' && b.acuity === 'critical').length;

  if (!isOpen) return null;

  return (
    <motion.aside
      initial={{ x: '100%', opacity: 0.7 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0.7 }}
      transition={{ duration: 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-0 bottom-0 w-[440px] max-w-[90vw] bg-white border-l border-slate-200 shadow-2xl z-40 flex flex-col font-sans"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <BedDouble size={18} />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 leading-tight">Bed Census & Intake</h2>
            <p className="text-[11px] text-slate-500 font-mono">Live Capacity & Acuity Monitor</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          title="Close Drawer (Esc)"
        >
          <X size={18} />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border-b border-slate-200 text-xs font-mono">
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-400">OCCUPIED</div>
          <div className="font-bold text-slate-800 text-sm">{totalOccupied} <span className="text-[10px] text-slate-400 font-normal">/ {beds.length}</span></div>
        </div>
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-400">READY INTAKE</div>
          <div className="font-bold text-emerald-600 text-sm">{totalAvailable}</div>
        </div>
        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-[10px] text-slate-400">CRITICAL L1/2</div>
          <div className="font-bold text-rose-600 text-sm">{totalCritical}</div>
        </div>
      </div>

      {/* Floor & Filter Chips */}
      <div className="p-3 border-b border-slate-100 flex flex-col gap-2">
        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search bed ID, patient, MRN..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-medium">
          {[
            { id: 'all', label: 'All Beds' },
            { id: 'empty', label: 'Available' },
            { id: 'critical', label: 'Critical' },
            { id: 'isolation', label: 'Isolation' },
            { id: 'cleaning', label: 'Cleaning' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id as any)}
              className={`px-2.5 py-1 rounded-lg border transition-colors shrink-0 cursor-pointer ${
                statusFilter === f.id
                  ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bed List */}
      <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100 space-y-2">
        {filteredBeds.map(bed => {
          const isOccupied = bed.status === 'occupied';
          const isCleaning = bed.status === 'cleaning';
          const isCrit = isOccupied && bed.acuity === 'critical';

          return (
            <div
              key={bed.id}
              onClick={() => isOccupied && onSelectBed(bed.id)}
              className={`pt-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                isCrit
                  ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
                  : isOccupied
                  ? 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                  : isCleaning
                  ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                  : 'bg-emerald-50/30 border-emerald-200/80 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs font-mono text-slate-900">{bed.id}</span>
                  <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200">
                    {bed.room}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    L{bed.floorNumber ?? 1}
                  </span>
                </div>

                <div>
                  {isCrit ? (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-700 border border-rose-200 animate-pulse">
                      CRITICAL L1
                    </span>
                  ) : isOccupied ? (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
                      OCCUPIED
                    </span>
                  ) : isCleaning ? (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      DISINFECTING
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      READY
                    </span>
                  )}
                </div>
              </div>

              {isOccupied ? (
                <div>
                  <div className="font-bold text-xs text-slate-800">{bed.patientName}</div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 font-mono">
                    <span>{bed.patientSafety?.mrn}</span>
                    <span>• {bed.patientSafety?.gender} {bed.patientSafety?.age}yo</span>
                    {bed.patientSafety?.vitals && (
                      <span className="text-slate-700 font-bold">
                        BP {bed.patientSafety.vitals.bp} | HR {bed.patientSafety.vitals.hr}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-slate-500 italic">Sanitized & Available</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAdmitPatient(bed.id);
                    }}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    <UserPlus size={11} /> Admit
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <button
          onClick={() => onAdmitPatient()}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <UserPlus size={15} /> + Admit Patient (Triage)
        </button>
      </div>
    </motion.aside>
  );
};
