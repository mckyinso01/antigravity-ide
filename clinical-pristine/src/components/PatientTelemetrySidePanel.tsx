import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Heart, 
  ChevronRight, 
  AlertTriangle, 
  MoreHorizontal,
  Maximize2
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

export const PatientTelemetrySidePanel: React.FC<Props> = ({
  beds,
  rooms,
  selectedBedId,
  onSelectBed,
  onOpenDossier,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [ecgPhase, setEcgPhase] = useState(0);
  const [activeTab, setActiveTab] = useState<'vitals' | 'meds' | 'labs'>('vitals');

  // Animate waveform phase in high performance 60fps loop
  useEffect(() => {
    let animFrame: number;
    const animate = () => {
      setEcgPhase(prev => (prev + 1) % 360);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Filter occupied beds with telemetry/safety data or top acuity beds
  const monitoredBeds = beds
    .filter(b => b.status === 'occupied' && b.patientSafety)
    .slice(0, 4);

  // If no occupied beds with safety, fallback to top occupied beds
  const displayBeds = monitoredBeds.length > 0 ? monitoredBeds : beds.filter(b => b.status === 'occupied').slice(0, 3);

  return (
    <aside className={`bg-white border-l-2 border-slate-400 h-full flex flex-col shadow-lg transition-all duration-300 shrink-0 ${isCollapsed ? 'w-14' : 'w-80 md:w-88'}`}>
      {/* Header */}
      <div className="px-4 py-2.5 border-b-2 border-slate-300 flex flex-col gap-2 bg-slate-100 shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Activity size={17} className="text-blue-700 font-black animate-pulse" />
              <h2 className="font-black text-sm text-slate-950 tracking-tight uppercase">Patient Telemetry</h2>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            {!isCollapsed && (
              <button 
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors"
                title="Telemetry options"
              >
                <MoreHorizontal size={16} />
              </button>
            )}
            {onToggleCollapse && (
              <button 
                onClick={onToggleCollapse}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
                title={isCollapsed ? "Expand Patient Telemetry" : "Collapse Telemetry Panel"}
              >
                <ChevronRight size={16} className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Sub Tabs: Vitals / Meds / Labs (Concept B Epic Command Deck) */}
        {!isCollapsed && (
          <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-xl border border-slate-300 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('vitals')}
              className={`py-1 rounded-lg transition-all text-center cursor-pointer ${
                activeTab === 'vitals' ? 'bg-slate-950 text-white font-black shadow-xs' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Vitals
            </button>
            <button
              onClick={() => setActiveTab('meds')}
              className={`py-1 rounded-lg transition-all text-center cursor-pointer ${
                activeTab === 'meds' ? 'bg-slate-950 text-white font-black shadow-xs' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Rx Meds
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`py-1 rounded-lg transition-all text-center cursor-pointer ${
                activeTab === 'labs' ? 'bg-slate-950 text-white font-black shadow-xs' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              Lab Orders
            </button>
          </div>
        )}
      </div>

      {/* Monitored Patient Telemetry Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 custom-scrollbar">
        {displayBeds.map((bed, idx) => {
          const room = rooms.find(r => r.id === bed.room);
          const safety = bed.patientSafety;
          const isSelected = selectedBedId === bed.id;

          const hr = safety?.vitals?.hr || (idx === 0 ? 170 : idx === 1 ? 150 : 140);
          const spo2 = safety?.vitals?.spo2 || 93;
          const bp = safety?.vitals?.bp || (idx === 0 ? '120/78' : idx === 1 ? '138/88' : '120/38');
          const hasAlert = safety?.fallRisk || hr > 120 || spo2 < 90 || idx === 0;

          if (isCollapsed) {
            return (
              <button
                key={bed.id}
                onClick={() => {
                  onSelectBed(bed.id);
                  onOpenDossier(bed.id);
                }}
                className={`w-full p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition-all cursor-pointer ${
                  isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-300 bg-white hover:border-slate-500'
                }`}
                title={`Bed ${bed.id} - ${bed.patientName || 'Occupied'}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${bed.acuity === 'critical' ? 'bg-rose-600 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-mono font-black text-slate-900">{bed.id.split('-')[0]}</span>
                <span className="text-[9px] font-mono font-bold text-slate-600">{hr}</span>
              </button>
            );
          }

          return (
            <div 
              key={bed.id} 
              className={`p-3 rounded-2xl border-2 transition-all shadow-sm ${
                isSelected 
                  ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500 shadow-md' 
                  : 'border-slate-300 bg-white hover:border-slate-500'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="font-black text-slate-950">Bed {bed.id}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 font-bold truncate max-w-[100px]">{room?.name || bed.room}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-black uppercase ${
                    bed.acuity === 'critical' 
                      ? 'bg-rose-100 text-rose-950 border border-rose-300' 
                      : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  }`}>
                    {bed.acuity === 'critical' ? 'CRITICAL' : 'STABLE'}
                  </span>
                  <button 
                    onClick={() => onOpenDossier(bed.id)}
                    className="p-1 text-slate-500 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Open Full Dossier"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>
              </div>

              {/* Patient Name & Demographics */}
              <div className="mb-2.5">
                <div className="font-black text-xs text-slate-950 font-display">
                  {bed.patientName || 'Admitted Patient'}
                  {safety && (
                    <span className="text-[10px] font-mono text-slate-500 font-bold ml-1.5">
                      ({safety.age}yo • {safety.mrn})
                    </span>
                  )}
                </div>
              </div>

              {/* TAB 1: HARDWARE MONITOR TELEMETRY DECK */}
              {activeTab === 'vitals' && (
                <div className="intellivue-bezel intellivue-raster p-3 mb-2 border-2 border-slate-700 shadow-xl">
                  {/* Lead Status Bar */}
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/80 font-black">LEAD II</span>
                      <span>FILTER MON</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-slate-300">QRS NORM</span>
                    </div>
                  </div>

                  {/* LEAD II ECG CHANNEL */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-col shrink-0 min-w-[58px]">
                      <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">HR (BPM)</span>
                      <div className="flex items-center gap-1 text-emerald-400 font-mono text-base font-black">
                        <Heart size={13} className="text-emerald-400 fill-emerald-400 animate-pulse" />
                        <span>{hr}</span>
                      </div>
                    </div>
                    <div className="flex-1 h-7 ml-2 mr-1 relative flex items-center overflow-hidden bg-slate-950/40 rounded border border-slate-800/50">
                      <svg className="w-full h-7" preserveAspectRatio="none" viewBox="0 0 200 40">
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
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            strokeDasharray: '200',
                            strokeDashoffset: (ecgPhase * 2) % 200,
                          }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* SpO2 PLETH CHANNEL */}
                  <div className="flex items-center justify-between mb-2 border-t border-slate-800/80 pt-1.5">
                    <div className="flex flex-col shrink-0 min-w-[58px]">
                      <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase">SpO2 (%)</span>
                      <span className="text-cyan-400 font-mono text-base font-black">{spo2}</span>
                    </div>
                    <div className="flex-1 h-5 ml-2 mr-1 relative flex items-center overflow-hidden bg-slate-950/40 rounded border border-slate-800/50">
                      <svg className="w-full h-5" preserveAspectRatio="none" viewBox="0 0 200 30">
                        <path
                          d={`M 0 15 
                             Q 20 5, 40 15 T 80 15 T 120 15 T 160 15 T 200 15`}
                          fill="none"
                          stroke="#06B6D4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: '200',
                            strokeDashoffset: (ecgPhase * 1.5) % 200,
                          }}
                        />
                      </svg>
                    </div>
                    <span className="text-[8px] font-mono text-cyan-400/80 font-bold">PI 3.4%</span>
                  </div>

                  {/* NIBP / ARTERIAL PRESSURE CHANNEL */}
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5">
                    <div className="flex flex-col shrink-0 min-w-[58px]">
                      <span className="text-[8px] font-mono text-rose-400 font-bold uppercase">NIBP (mmHg)</span>
                      <span className="text-rose-400 font-mono text-xs font-black">{bp}</span>
                    </div>
                    <div className="flex-1 h-5 ml-2 mr-1 relative flex items-center overflow-hidden bg-slate-950/40 rounded border border-slate-800/50">
                      <svg className="w-full h-5" preserveAspectRatio="none" viewBox="0 0 200 30">
                        <path
                          d={`M 0 15 
                             Q 15 8, 30 15 Q 45 22, 60 15 Q 75 8, 90 15 Q 105 22, 120 15 Q 135 8, 150 15 Q 165 22, 180 15 Q 195 8, 200 15`}
                          fill="none"
                          stroke="#F43F5E"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: '200',
                            strokeDashoffset: (ecgPhase * 1.2) % 200,
                          }}
                        />
                      </svg>
                    </div>
                    <span className="text-[8px] font-mono text-rose-400 font-bold">MAP 88</span>
                  </div>
                </div>
              )}

              {/* TAB 2 & 3: MEDICATION & LAB SUMMARY (CONCEPT B EPIC DECK) */}
              {(activeTab === 'meds' || activeTab === 'labs') && safety?.medicationsSchedule && (
                <div className="mt-2 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[10px] font-mono">
                  <div className="flex justify-between items-center text-slate-700 font-bold mb-1.5">
                    <span className="uppercase text-[9px] font-black">{activeTab === 'meds' ? 'Active Rx Schedule' : 'Diagnostic Lab Orders'}</span>
                    <span className="text-blue-700 font-black">
                      {activeTab === 'meds' ? `${safety.medicationsSchedule.filter(m => m.status === 'given').length}/${safety.medicationsSchedule.length} Given` : '2 Lab Orders'}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {safety.medicationsSchedule.map((med, medIdx) => (
                      <div key={medIdx} className="flex justify-between items-center bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs">
                        <div>
                          <span className="font-black text-slate-950 block">{med.name}</span>
                          <span className="text-[9px] text-slate-500">{med.dose}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded font-black text-[9px] ${
                          med.status === 'given' ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-blue-100 text-blue-950 border border-blue-300'
                        }`}>
                          {med.status === 'given' ? '✓ Administered' : med.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CLINICAL ALERT BANNER */}
              {hasAlert && (
                <div className="mt-2 bg-amber-50 border-2 border-amber-300 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px] text-amber-950 font-bold shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-700 shrink-0 font-bold" />
                    <span className="font-bold">{safety?.chiefComplaint ? `Alert: ${safety.chiefComplaint.slice(0, 20)}...` : 'Alerts telemetry'}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDossier(bed.id);
                    }}
                    className="text-[10px] text-amber-900 font-black underline hover:text-blue-700 cursor-pointer"
                  >
                    VIEW &rarr;
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
