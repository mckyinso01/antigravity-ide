import { memo, useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Activity,
  Flame, 
  Zap, 
  HeartPulse, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  MoreHorizontal,
  Bell,
  Settings
} from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useEmergency } from '../contexts/EmergencyContext';
import { clinicalAudio } from '../utils/clinicalAudio';
import { ACLSResuscitationEngine } from '../components/ACLSResuscitationEngine';

export const AlertsApp = memo(() => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'ACLS_STUDIO'>('TELEMETRY');
  const alerts = useLiveQuery(() => db.alerts.toArray(), []) || [];

  const { 
    isCodeBlue, 
    codeBlueSeconds, 
    epinephrineCountdown, 
    shocksDelivered, 
    triggerCodeBlue, 
    standDownCodeBlue, 
    administerEpi,
    isMuted,
    toggleMute
  } = useEmergency();

  const activeAlerts = alerts.filter(a => !a.acknowledged);

  const acknowledgeAlert = async (id: string) => {
    try {
      await db.alerts.update(id, {
        acknowledged: true,
        acknowledgedBy: 'Nurse Sarah Jenkins, RN'
      });
      clinicalAudio.playSuccessChime();
      showToast(`Alert ${id} acknowledged and logged in audit trail.`, 'success');
    } catch (err) {
      console.error(err);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F4F5F7]">
      {/* TOP HEADER */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Clinical Alarms &amp; Threat Telemetry</h1>
          
          {/* View Mode Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold ml-2">
            <button
              onClick={() => setActiveTab('TELEMETRY')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'TELEMETRY'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Activity size={13} />
              <span>Telemetry Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab('ACLS_STUDIO')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ACLS_STUDIO'
                  ? 'bg-rose-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              <Zap size={13} className={activeTab === 'ACLS_STUDIO' ? 'text-white' : 'text-rose-600'} />
              <span>ACLS Resuscitation Studio</span>
            </button>
          </div>

          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
            {activeAlerts.length} Active System Alarms
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleMute}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer border ${
              isMuted ? 'bg-slate-100 text-slate-600 border-slate-300' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isMuted ? 'Audio Silenced' : 'Siren Active'}</span>
          </button>

          <button 
            onClick={() => {
              if (isCodeBlue) {
                standDownCodeBlue();
                showToast('Code Blue stood down.', 'info');
              } else {
                triggerCodeBlue('ICU Resuscitation Suite 101');
                setActiveTab('ACLS_STUDIO');
                showToast('🚨 Code Blue Activated! Opening ACLS Studio...', 'error');
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer ${
              isCodeBlue ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            <ShieldAlert size={14} />
            <span>{isCodeBlue ? 'Stand Down Emergency' : '🚨 Trigger Code Blue Drill'}</span>
          </button>

          <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <MoreHorizontal size={18} />
          </button>

          <button className="relative text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <Bell size={18} />
          </button>

          <button className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <Settings size={18} />
          </button>

          {/* USER AVATAR */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              NS
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">Nurse Sarah</span>
              <span className="text-[10px] text-slate-500 font-medium">Charge Nurse</span>
            </div>
          </div>
        </div>
      </header>

      {/* VIEW CONDITIONAL: ACLS RESUSCITATION STUDIO vs STANDARD TELEMETRY */}
      {activeTab === 'ACLS_STUDIO' ? (
        <div className="flex-1 overflow-hidden">
          <ACLSResuscitationEngine 
            patientRoom="ICU Resuscitation Suite 101 (B-11)" 
            patientName="Eleanor Vance (MRN-202400)" 
            onStandDown={() => setActiveTab('TELEMETRY')}
          />
        </div>
      ) : (
        /* MAIN BODY TELEMETRY DECK */
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          
          {/* RESUSCITATION / EMERGENCY COMMAND DECK */}
          {isCodeBlue ? (
            <div className="bg-rose-600 rounded-2xl p-5 text-white shadow-md border border-rose-700 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  <Flame size={28} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-rose-200 block">ACLS Resuscitation Active</span>
                  <h2 className="text-xl font-bold font-sans">CODE BLUE: ICU Suite 101 (B-11)</h2>
                  <p className="text-xs text-rose-100">ACLS Team dispatched • Shock &amp; Epinephrine cycle active</p>
                </div>
              </div>

              {/* LIVE RESUSCITATION TELEMETRY */}
              <div className="flex items-center gap-4 bg-rose-700/60 p-3 rounded-xl border border-rose-500">
                <div className="text-center px-3 border-r border-rose-500/60">
                  <span className="text-[10px] text-rose-200 uppercase tracking-wider block font-bold">Elapsed</span>
                  <span className="text-xl font-mono font-bold">{formatTimer(codeBlueSeconds)}</span>
                </div>
                <div className="text-center px-3 border-r border-rose-500/60">
                  <span className="text-[10px] text-rose-200 uppercase tracking-wider block font-bold">Shocks</span>
                  <span className="text-xl font-mono font-bold">{shocksDelivered}</span>
                </div>
                <div className="text-center px-3">
                  <span className="text-[10px] text-rose-200 uppercase tracking-wider block font-bold">Next Epi In</span>
                  <span className="text-xl font-mono font-bold">{formatTimer(epinephrineCountdown)}</span>
                </div>
              </div>

              {/* ACTION CONTROLS */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveTab('ACLS_STUDIO')}
                  className="px-3.5 py-2 rounded-xl bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Zap size={15} /> Open ACLS Simulation Studio
                </button>
                <button 
                  onClick={administerEpi}
                  className="px-3.5 py-2 rounded-xl bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <HeartPulse size={15} /> Give Epi 1mg IV
                </button>
              </div>
            </div>
          ) : (
          /* ALL CLEAR BANNER */
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hospital Threat Matrix: Nominal / Standby</h3>
                <p className="text-xs text-slate-500">ACLS crash carts inspected • Continuous telemetry monitoring enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ALL SYSTEMS CLEAR
              </span>
            </div>
          </div>
        )}

        {/* ALARMS & AUDIT LOG GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
          
          {/* ACTIVE CLINICAL & SYSTEM ALERTS (2 COLUMNS) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Telemetry &amp; Clinical Alarms</h3>
                <p className="text-xs text-slate-500">Unacknowledged patient alerts requiring clinical verification</p>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {activeAlerts.length} Unresolved Alarms
              </span>
            </div>

            <div className="flex-1 overflow-x-auto p-4">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Priority</th>
                    <th className="py-2.5 px-3 font-semibold">Alarm Detail &amp; Location</th>
                    <th className="py-2.5 px-3 font-semibold">Origin</th>
                    <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {alerts.map(a => {
                    const isCrit = a.type === 'critical';
                    const isWarn = a.type === 'warn';

                    return (
                      <tr key={a.id} className={`hover:bg-slate-50/80 transition-colors ${a.acknowledged ? 'opacity-50' : ''}`}>
                        
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isCrit ? 'bg-rose-100 text-rose-700' :
                            isWarn ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {isCrit ? 'Critical' : isWarn ? 'Warning' : 'Info'}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block text-xs">{a.title}</span>
                          <span className="text-[10px] text-slate-500">{a.message}</span>
                        </td>

                        <td className="py-3 px-3 text-slate-700 font-medium">
                          {a.location || 'Ward Telemetry'}
                        </td>

                        <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                          {a.timestamp || 'Just Now'}
                        </td>

                        <td className="py-3 px-4 text-right">
                          {a.acknowledged ? (
                            <span className="text-slate-400 text-[11px] font-medium flex items-center justify-end gap-1">
                              <CheckCircle2 size={13} /> Acknowledged
                            </span>
                          ) : (
                            <button
                              onClick={() => acknowledgeAlert(a.id)}
                              className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all cursor-pointer"
                            >
                              Acknowledge
                            </button>
                          )}
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* TELEMETRY THRESHOLDS & CARDIAC GAUGE (1 COLUMN) */}
          <div className="flex flex-col gap-4">
            
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Automated Alarm Thresholds</h3>
              <p className="text-xs text-slate-500 mb-4">Continuous ICU &amp; Telemetry monitoring limits</p>
              
              <div className="flex flex-col gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">Tachycardia Critical</span>
                    <span className="text-[10px] text-slate-500">Heart Rate &gt; 140 bpm</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[10px]">STAT</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">Bradycardia Critical</span>
                    <span className="text-[10px] text-slate-500">Heart Rate &lt; 45 bpm</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[10px]">STAT</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">SpO2 Hypoxia Limit</span>
                    <span className="text-[10px] text-slate-500">Oxygen Saturation &lt; 90%</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold text-[10px]">Warning</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">Cardiac Telemetry Rhythm Engine</h3>
                <p className="text-xs text-slate-500 mb-3">Live algorithmic arrhythmia detection</p>
                <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs flex flex-col gap-1 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span>LEAD II: V-PACED</span>
                    <span className="text-white text-[10px] bg-emerald-900/60 px-1.5 py-0.5 rounded">NORMAL SINUS</span>
                  </div>
                  <div className="h-8 flex items-center overflow-hidden">
                    <span className="tracking-widest">/\_/\_/\_/\_/\_/\_/\_/\_/\_/\</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>QRS: 92ms</span>
                    <span>QTc: 410ms</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 mt-4 flex items-center gap-2">
                <Activity size={16} className="text-emerald-600 shrink-0" />
                <span>All telemetry gateways streaming with <strong>zero packet latency</strong>.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
      )}

    </div>
  );
});
