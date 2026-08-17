import React from 'react';
import { 
  Sparkles, 
  Copy,
  Ghost,
  BedDouble,
  Stethoscope,
  Building2,
  Trash2
} from 'lucide-react';

export type ArchetypePreset = 
  | 'single-icu'
  | 'standard-2bed'
  | 'bay-4bed'
  | 'ward-6bed'
  | 'ward-8bed'
  | 'nurse-station'
  | 'elevator-core'
  | 'evs-utility';

interface ArchetypeStampBarProps {
  currentFloorNumber: number;
  onStampArchetype: (preset: ArchetypePreset) => void;
  onOpenCloner: () => void;
  showGhostLayer: boolean;
  onToggleGhostLayer: () => void;
}

export const ArchetypeStampBar: React.FC<ArchetypeStampBarProps> = ({
  currentFloorNumber,
  onStampArchetype,
  onOpenCloner,
  showGhostLayer,
  onToggleGhostLayer
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 p-2.5 bg-white border-2 border-slate-300 rounded-2xl shadow-sm font-mono text-xs text-slate-900">
      
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-black text-blue-900 border-r-2 border-slate-200">
        <Sparkles size={14} className="text-blue-700" />
        <span>ARCHETYPE STAMPS:</span>
      </div>

      {/* Preset 1: Single ICU Isolation */}
      <button
        onClick={() => onStampArchetype('single-icu')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-rose-50 border-2 border-slate-300 hover:border-rose-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp single-bed private suite / ICU isolation pod"
      >
        <BedDouble size={14} className="text-rose-700" />
        <span>ICU Pod (1B)</span>
      </button>

      {/* Preset 2: Standard 2-Bed Bay */}
      <button
        onClick={() => onStampArchetype('standard-2bed')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border-2 border-slate-300 hover:border-blue-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp standard 2-bed semi-private room"
      >
        <BedDouble size={14} className="text-blue-700" />
        <span>2-Bed Bay</span>
      </button>

      {/* Preset 3: 4-Bed Sub-Acute Bay */}
      <button
        onClick={() => onStampArchetype('bay-4bed')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 border-2 border-slate-300 hover:border-indigo-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp 4-bed sub-acute bay (2x2 matrix)"
      >
        <BedDouble size={14} className="text-indigo-700" />
        <span>4-Bed Bay</span>
      </button>

      {/* Preset 4: 6-Bed Med-Surg Ward */}
      <button
        onClick={() => onStampArchetype('ward-6bed')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-teal-50 border-2 border-slate-300 hover:border-teal-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp 6-bed Med-Surg inpatient ward (2x3 matrix)"
      >
        <BedDouble size={14} className="text-teal-700" />
        <span>6-Bed Ward</span>
      </button>

      {/* Preset 5: 8-Bed General Ward */}
      <button
        onClick={() => onStampArchetype('ward-8bed')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-amber-50 border-2 border-slate-300 hover:border-amber-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp 8-bed large observation ward (2x4 matrix)"
      >
        <BedDouble size={14} className="text-amber-700" />
        <span>8-Bed Ward</span>
      </button>

      {/* Preset 6: Central Nurse Station */}
      <button
        onClick={() => onStampArchetype('nurse-station')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 border-2 border-slate-300 hover:border-emerald-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp central nurse telemetry station hub"
      >
        <Stethoscope size={14} className="text-emerald-700" />
        <span>Nurse Hub</span>
      </button>

      {/* Preset 7: Elevator Core & Fire Exit */}
      <button
        onClick={() => onStampArchetype('elevator-core')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-purple-50 border-2 border-slate-300 hover:border-purple-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp vertical elevator shaft and emergency fire stairwell"
      >
        <Building2 size={14} className="text-purple-700" />
        <span>Elevator Core</span>
      </button>

      {/* Preset 8: EVS Sluice Room */}
      <button
        onClick={() => onStampArchetype('evs-utility')}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-amber-50 border-2 border-slate-300 hover:border-amber-400 rounded-xl text-slate-950 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer text-xs font-black"
        title="Stamp EVS disinfection and dirty utility room"
      >
        <Trash2 size={14} className="text-amber-700" />
        <span>Clean Zone</span>
      </button>

      <div className="h-5 w-[2px] bg-slate-300 mx-1" />

      {/* Ghost Silhouette (Onion Skinning) */}
      <button
        onClick={onToggleGhostLayer}
        className={`flex items-center gap-1.5 px-3 py-1.5 border-2 rounded-xl transition-all cursor-pointer text-xs font-black shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
          showGhostLayer
            ? 'bg-purple-100 border-purple-400 text-purple-950'
            : 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
        }`}
        title="Toggle translucent ghost silhouette of Lower Level (Level N-1) for wall alignment"
      >
        <Ghost size={14} className={showGhostLayer ? 'text-purple-700' : 'text-slate-600'} />
        <span>Ghost L{Math.max(1, currentFloorNumber - 1)}</span>
      </button>

      {/* Mass Floor Cloner Button */}
      <button
        onClick={onOpenCloner}
        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl border-2 border-emerald-700 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-xs uppercase"
        title="Duplicate this floor layout to multiple target building levels"
      >
        <Copy size={14} />
        <span>Clone Floor L{currentFloorNumber} ➔</span>
      </button>

    </div>
  );
};

