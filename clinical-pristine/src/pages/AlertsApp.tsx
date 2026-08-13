import { useState, useEffect, useCallback, memo } from 'react';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, WifiOff, Activity, AlertOctagon, Info, Flame, Check, AlertTriangle } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type SecurityAlert } from '../db';

const MOCK_ALERTS: SecurityAlert[] = [
  { id: 'ALT-991', type: 'critical', title: 'Code Blue Initiated', message: 'Cardiac arrest protocol activated.', timestamp: 'Just now', location: 'ICU Bed 4', acknowledged: false },
  { id: 'ALT-992', type: 'warn', title: 'Unauthorized Access', message: 'Badge scan failed at secure pharmacy door.', timestamp: '2 mins ago', location: 'Pharmacy Wing', acknowledged: false },
  { id: 'ALT-993', type: 'info', title: 'System Maintenance', message: 'EHR sync scheduled for 02:00 AM.', timestamp: '15 mins ago', location: 'Server Core', acknowledged: true },
  { id: 'ALT-994', type: 'critical', title: 'Oxygen Pressure Drop', message: 'Main supply line detecting 15% pressure drop.', timestamp: '18 mins ago', location: 'Ward B', acknowledged: false },
];

export const AlertsApp = memo(() => {
  const { showToast } = useToast();
  const alerts = useLiveQuery(() => db.alerts.toArray(), []) || [];
  const [appState, setAppState] = useState<'loading' | 'error' | 'empty' | 'full' | 'partial'>('loading');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setAppState('loading');
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock error condition for testing
        if (Math.random() > 0.8) throw new Error("Socket Disconnected");
        
        await db.transaction('rw', db.alerts, async () => {
           await db.alerts.clear();
           await db.alerts.bulkAdd(MOCK_ALERTS);
        });

        if (MOCK_ALERTS.length === 0) {
           setAppState('empty');
        } else {
           setAppState('full');
        }
      } catch (err) {
        console.error("Sync Error:", err);
        const cached = await db.alerts.count();
        if (cached > 0) {
           setAppState('partial');
           showToast('Offline Mode: Displaying cached telemetry.', 'warn');
        } else {
           setAppState('error');
        }
      }
    };
    fetchAlerts();
  }, [showToast]);

  const acknowledgeAlert = useCallback(async (id: string) => {
    await db.alerts.update(id, { acknowledged: true });
    showToast(`Alert ${id} acknowledged.`, 'success');
  }, [showToast]);

  const activeThreats = alerts.filter(a => !a.acknowledged && (a.type === 'critical' || a.type === 'warn')).length;

  return (
    <div className="flex flex-col h-full w-full bg-[#050811] text-slate-200 font-sans p-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldAlert className="text-rose-500" />
            Security & Alerts
          </h1>
          <p className="text-slate-400 text-sm mt-1">Global threat monitoring and audit logs</p>
        </div>
        
        <div className="flex items-center gap-4">
           {(appState === 'full' || appState === 'partial') && (
             <div className="flex items-center gap-3 bg-[#0B1C30]/80 border border-slate-800 rounded-xl px-4 py-2 shadow-lg">
               <span className="text-sm font-semibold uppercase text-slate-400">Threat Level</span>
               {activeThreats > 0 ? (
                 <span className="flex items-center gap-2 text-rose-500 font-bold animate-pulse">
                    <Flame size={18} /> ELEVATED ({activeThreats})
                 </span>
               ) : (
                 <span className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck size={18} /> SECURE
                 </span>
               )}
             </div>
           )}
           <button 
             onClick={() => setAppState('loading')}
             className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-all active:scale-95 h-[44px]"
           >
             <Activity size={16} className={appState === 'loading' ? 'animate-spin' : ''} />
             Poll Engine
           </button>
        </div>
      </div>

      {/* 4-State Journey */}
      <div className="flex-1 relative rounded-2xl overflow-hidden flex bg-[#0B1C30]/50 border border-slate-800 backdrop-blur-md">
        
        {appState === 'loading' && (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
             <div className="relative">
                <div className="absolute inset-0 bg-[#2563EB]/20 rounded-full blur-xl animate-pulse"></div>
                <Activity size={48} className="text-[#2563EB] animate-pulse relative z-10" />
             </div>
             <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Establishing Secure Socket...</p>
          </div>
        )}

        {appState === 'error' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full border-2 border-rose-500/50 flex flex-col items-center justify-center text-center bg-rose-950/10"
          >
             <div className="relative mb-6">
               <div className="absolute inset-0 bg-rose-500/20 blur-2xl animate-pulse rounded-full"></div>
               <div className="w-24 h-24 bg-rose-950/80 border border-rose-500/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(225,29,72,0.4)]">
                  <WifiOff size={40} className="text-rose-500 drop-shadow-[0_0_15px_rgba(225,29,72,0.8)] animate-pulse" />
               </div>
             </div>
             <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Socket Disconnected</h2>
             <p className="text-slate-400 mb-8 max-w-md text-lg leading-relaxed">Alert engine lost connection to the message broker. Real-time telemetry is down.</p>
             <button 
                onClick={() => setAppState('loading')}
                className="px-8 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/50 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(225,29,72,0.15)] hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] active:scale-95"
             >
               Restart Services
             </button>
          </motion.div>
        )}

        {appState === 'empty' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full flex flex-col items-center justify-center text-center"
          >
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"></div>
                <div className="w-28 h-28 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                   <ShieldCheck size={56} className="text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)]" />
                </div>
             </div>
             <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Zero Active Threats</h2>
             <p className="text-emerald-400 max-w-md text-lg mb-8">System is operating securely within normal parameters.</p>
             <button 
                onClick={() => showToast('Running Deep Diagnostic Audit...', 'info')}
                className="px-8 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2"
             >
                <ShieldAlert size={20} />
                Run Diagnostic Audit
             </button>
          </motion.div>
        )}

        {(appState === 'full' || appState === 'partial') && (
          <div className="w-full h-full flex flex-col min-h-0">
             {appState === 'partial' && (
              <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-500 px-6 py-3 flex items-center justify-between shrink-0">
                 <div className="flex items-center gap-2 font-bold text-sm">
                    <WifiOff size={16} className="animate-pulse" />
                    OFFLINE MODE (PARTIAL DATA)
                 </div>
                 <span className="text-xs text-amber-500/70 font-semibold">Displaying cached alerts. Disconnected from broker.</span>
              </div>
             )}
             
             {/* Feed Header */}
             <div className="px-6 py-4 border-b border-slate-800 bg-black/20 flex justify-between items-center shrink-0">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Chronological Event Stream</h3>
                {activeThreats > 0 && (
                  <button 
                    onClick={async () => {
                      const unacknowledged = alerts.filter(a => !a.acknowledged).map(a => a.id);
                      await db.transaction('rw', db.alerts, async () => {
                         for (const id of unacknowledged) {
                            await db.alerts.update(id, { acknowledged: true });
                         }
                      });
                      showToast('All active threats acknowledged.', 'success');
                    }}
                    className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-all active:scale-95 uppercase flex items-center gap-1"
                  >
                    <Check size={14} /> Acknowledge All
                  </button>
                )}
             </div>

             {/* Feed List */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
                <AnimatePresence>
                  {alerts.map(alert => (
                    <motion.div
                       key={alert.id}
                       layout
                       initial={{ opacity: 0, x: -20 }}
                       animate={{ opacity: 1, x: 0 }}
                       className={`p-5 rounded-2xl border transition-all ${
                         alert.acknowledged 
                           ? 'bg-black/40 border-slate-800/50 opacity-60' 
                           : alert.type === 'critical'
                             ? 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_30px_rgba(225,29,72,0.1)]'
                             : alert.type === 'warn'
                               ? 'bg-amber-950/20 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.05)]'
                               : 'bg-[#050811] border-slate-700/50'
                       }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 mt-1">
                          {alert.type === 'critical' ? (
                            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-500">
                              <AlertOctagon size={20} className={!alert.acknowledged ? 'animate-pulse' : ''} />
                            </div>
                          ) : alert.type === 'warn' ? (
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-500">
                              <AlertTriangle size={20} />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/50 flex items-center justify-center text-[#2563EB]">
                              <Info size={20} />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <div>
                               <h4 className={`text-lg font-bold ${alert.acknowledged ? 'text-slate-400' : 'text-white'}`}>{alert.title}</h4>
                               <div className="flex items-center gap-3 mt-1 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                                 <span>{alert.id}</span>
                                 <span>•</span>
                                 <span className={alert.type === 'critical' && !alert.acknowledged ? 'text-rose-400' : ''}>{alert.location}</span>
                                 <span>•</span>
                                 <span>{alert.timestamp}</span>
                               </div>
                             </div>
                             {!alert.acknowledged && (
                               <button 
                                 onClick={() => acknowledgeAlert(alert.id)}
                                 className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all active:scale-95 ${
                                   alert.type === 'critical' 
                                     ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30'
                                     : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                 }`}
                               >
                                 Acknowledge
                               </button>
                             )}
                          </div>
                          <p className={`mt-3 text-sm break-words line-clamp-2 ${alert.acknowledged ? 'text-slate-500' : 'text-slate-300'}`}>
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
          </div>
        )}

      </div>
    </div>
  );
});
