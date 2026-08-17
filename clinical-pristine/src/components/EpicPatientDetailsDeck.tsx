import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  MoreHorizontal
} from 'lucide-react';
import type { RoomData, BedData } from '../db';

interface Props {
  beds: BedData[];
  rooms: RoomData[];
  selectedBedId: string | null;
  onSelectBed: (bedId: string) => void;
  onOpenDossier: (bedId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const EpicPatientDetailsDeck: React.FC<Props> = ({
  beds,
  rooms,
  selectedBedId,
  onSelectBed,
  onOpenDossier,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [ecgPhase, setEcgPhase] = useState(0);

  // Animate waveform phase in 60fps loop
  useEffect(() => {
    let animFrame: number;
    const animate = () => {
      setEcgPhase(prev => (prev + 1) % 360);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Find active selected bed or default to first occupied bed
  const activeBed = beds.find(b => b.id === selectedBedId) || 
    beds.find(b => b.status === 'occupied' && b.patientSafety) || 
    beds.find(b => b.status === 'occupied') || 
    beds[0];

  const activeRoom = activeBed ? rooms.find(r => r.id === activeBed.room) : null;
  const safety = activeBed?.patientSafety;

  const occupiedBeds = beds.filter(b => b.status === 'occupied');

  return (
    <aside className={`bg-white border-l-2 border-slate-400 h-full flex flex-col shadow-xl transition-all duration-300 shrink-0 select-none overflow-hidden ${
      isCollapsed ? 'w-14' : 'w-84 md:w-96'
    }`}>
      {/* SECTION 1: DOCKED HEADER WITH COLLAPSE */}
      <div className="px-4 py-3 border-b-2 border-slate-300 flex items-center justify-between bg-slate-100 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <h2 className="font-black text-base text-slate-950 font-display tracking-tight">Patient Details</h2>
          </div>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          {!isCollapsed && (
            <button 
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
              title="Options"
            >
              <MoreHorizontal size={16} />
            </button>
          )}
          {onToggleCollapse && (
            <button 
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              title={isCollapsed ? "Expand Patient Deck" : "Collapse Patient Deck"}
            >
              <ChevronRight size={16} className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {isCollapsed ? (
        /* COLLAPSED QUICK SWITCHER ICONS */
        <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
          {occupiedBeds.map((bed) => {
            const isSel = activeBed?.id === bed.id;
            return (
              <button
                key={bed.id}
                onClick={() => {
                  onSelectBed(bed.id);
                  onOpenDossier(bed.id);
                }}
                className={`w-full p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition-all cursor-pointer ${
                  isSel ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-white hover:border-slate-500'
                }`}
                title={`Bed ${bed.id} - ${bed.patientName || 'Occupied'}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${bed.acuity === 'critical' ? 'bg-rose-600 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-mono font-black text-slate-900">{bed.id.split('-')[0]}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* EXPANDED FULL CONCEPT B DOSSIER SPLIT SCREEN */
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 custom-scrollbar">
          
          {/* PATIENT SELECTOR CHIPS */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {occupiedBeds.map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBed(b.id)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-black transition-all shrink-0 cursor-pointer border-2 ${
                  activeBed?.id === b.id
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-white hover:text-slate-950'
                }`}
              >
                {b.id}
              </button>
            ))}
          </div>

          {/* CARD 1: PATIENT DEMOGRAPHICS HEADER (CONCEPT B EXACT LOOK) */}
          <div className="bg-white border-2 border-slate-400 p-3.5 rounded-2xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-400 flex items-center justify-center font-black font-display text-slate-800 text-base shadow-xs shrink-0">
                  {safety?.photoUrl ? (
                    <img src={safety.photoUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span>{activeBed?.patientName ? activeBed.patientName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'JR'}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base text-slate-950 font-display">
                      {activeBed?.patientName || 'Jame State'}
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 font-bold">
                    {safety ? `${safety.age} yo • ${safety.gender || 'Adult'}` : 'October 25, 1988'} • {safety?.mrn || 'MRN-202400'}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black font-mono bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Active
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-500 block text-[9px] font-bold uppercase">Clinical Status</span>
                <span className="font-black text-slate-950">Active Patient</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] font-bold uppercase">Admission Date</span>
                <span className="font-black text-slate-950">07/17/2023</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[9px] font-bold uppercase">Dossier Protocol</span>
                <span className="font-bold text-slate-700">Active clinical dossier • Bay {activeBed?.id} ({activeRoom?.name || 'Ward'})</span>
              </div>
            </div>
          </div>

          {/* CARD 2: LIVE VITALS TELEMETRY (CONCEPT B MULTI-LEAD CHART) */}
          <div className="bg-white border-2 border-slate-400 p-3.5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-black text-xs text-slate-950 font-display">Live Vitals Telemetry</h4>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold">
                <span className="flex items-center gap-1 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Heart Rate
                </span>
                <span className="flex items-center gap-1 text-rose-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span> Blood Pres.
                </span>
                <span className="flex items-center gap-1 text-cyan-700">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span> Ox, Sat.
                </span>
              </div>
            </div>

            {/* WAVEFORM CANVAS WITH Y-AXIS SCALE */}
            <div className="flex items-stretch bg-slate-950/90 rounded-xl p-2 border border-slate-800 relative overflow-hidden">
              {/* Y-Axis scale numbers */}
              <div className="flex flex-col justify-between text-[8px] font-mono font-bold text-slate-400 pr-1.5 border-r border-slate-800/80 shrink-0">
                <span>140</span>
                <span>120</span>
                <span>100</span>
                <span>80</span>
              </div>

              {/* Oscillating Multi-Lead Waves */}
              <div className="flex-1 relative h-28 ml-2 flex flex-col justify-between overflow-hidden">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full h-px bg-slate-500"></div>
                  <div className="w-full h-px bg-slate-500"></div>
                  <div className="w-full h-px bg-slate-500"></div>
                  <div className="w-full h-px bg-slate-500"></div>
                </div>

                {/* GREEN HEART RATE ECG LINE */}
                <svg className="w-full h-9" preserveAspectRatio="none" viewBox="0 0 200 40">
                  <path
                    d={`M 0 20 
                       Q 15 20, 20 20 
                       L 25 18 L 30 22 L 35 20 
                       L 40 5 L 45 35 L 50 12 L 55 24 L 60 20 
                       Q 75 20, 90 15 Q 105 20, 115 20
                       L 125 18 L 130 22 L 135 20 
                       L 140 5 L 145 35 L 150 12 L 155 24 L 160 20
                       Q 175 20, 190 15 Q 200 20, 200 20`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: '200',
                      strokeDashoffset: (ecgPhase * 2) % 200,
                    }}
                  />
                </svg>

                {/* RED BLOOD PRESSURE ARTERIAL LINE */}
                <svg className="w-full h-7" preserveAspectRatio="none" viewBox="0 0 200 30">
                  <path
                    d={`M 0 15 
                       Q 15 8, 30 15 Q 45 22, 60 15 Q 75 8, 90 15 Q 105 22, 120 15 Q 135 8, 150 15 Q 165 22, 180 15 Q 195 8, 200 15`}
                    fill="none"
                    stroke="#F43F5E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '200',
                      strokeDashoffset: (ecgPhase * 1.3) % 200,
                    }}
                  />
                </svg>

                {/* CYAN SpO2 PLETH LINE */}
                <svg className="w-full h-7" preserveAspectRatio="none" viewBox="0 0 200 30">
                  <path
                    d={`M 0 15 
                       Q 20 5, 40 15 T 80 15 T 120 15 T 160 15 T 200 15`}
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '200',
                      strokeDashoffset: (ecgPhase * 1.6) % 200,
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* X-Axis scale numbers */}
            <div className="flex justify-between text-[8px] font-mono font-bold text-slate-500 mt-1 px-7">
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
            </div>
          </div>

          {/* CARD 3: MEDICATION ADMINISTRATION TIMELINE (CONCEPT B EXACT LOOK) */}
          <div className="bg-white border-2 border-slate-400 p-3.5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-black text-xs text-slate-950 font-display">Medication Administration Timeline</h4>
            </div>

            {/* CALENDAR DATE HEADER */}
            <div className="grid grid-cols-5 text-center text-[10px] font-mono font-black text-slate-700 pb-1.5 border-b border-slate-200">
              <span>Sep 16</span>
              <span>Sep 18</span>
              <span>Sep 21</span>
              <span>Sep 26</span>
              <span>Sep 30</span>
            </div>

            {/* TIMELINE ROWS */}
            <div className="mt-2 space-y-2 font-mono text-[11px]">
              {/* Row 1: Scheduled */}
              <div className="flex items-center">
                <span className="w-22 text-slate-600 font-bold text-[10px]">Scheduled</span>
                <div className="flex-1 flex items-center gap-1.5">
                  <div className="bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 rounded-md font-black text-[10px]">
                    2 tms. almg
                  </div>
                </div>
              </div>

              {/* Row 2: Administered */}
              <div className="flex items-center">
                <span className="w-22 text-slate-600 font-bold text-[10px]">Administered</span>
                <div className="flex-1 flex items-center gap-1.5">
                  <div className="bg-emerald-100 text-emerald-950 border border-emerald-300 px-2 py-0.5 rounded-md font-black text-[10px]">
                    2 mg
                  </div>
                  <div className="bg-emerald-100 text-emerald-950 border border-emerald-300 px-2 py-0.5 rounded-md font-black text-[10px]">
                    1 mg
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4: CURRENT LAB ORDERS TABLE (CONCEPT B EXACT LOOK) */}
          <div className="bg-white border-2 border-slate-400 p-3.5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-black text-xs text-slate-950 font-display">Current Lab Orders</h4>
            </div>

            <table className="w-full text-left font-mono text-[11px]">
              <thead>
                <tr className="text-slate-500 text-[10px] font-bold border-b border-slate-200 pb-1">
                  <th className="pb-1 font-black">Name</th>
                  <th className="pb-1 font-black">Status</th>
                  <th className="pb-1 font-black text-right">Acuity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-1.5 font-black text-slate-950">Stat Troponin-I</td>
                  <td className="py-1.5 text-slate-600 font-bold">Completed</td>
                  <td className="py-1.5 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-100 text-rose-950 border border-rose-300">
                      • Critical
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 font-black text-slate-950">ABG Blood Gas</td>
                  <td className="py-1.5 text-slate-600 font-bold">Manage</td>
                  <td className="py-1.5 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300">
                      Discharged
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 font-black text-slate-950">12-Lead ECG</td>
                  <td className="py-1.5 text-slate-600 font-bold">Completed</td>
                  <td className="py-1.5 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-100 text-amber-950 border border-amber-300">
                      • Stable
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-1.5 font-black text-slate-950">CBC Blood Count</td>
                  <td className="py-1.5 text-slate-600 font-bold">Completed</td>
                  <td className="py-1.5 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300">
                      Discharged
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      )}
    </aside>
  );
};
