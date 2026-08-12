import { useState, useEffect, useCallback, memo } from 'react';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';
import { Sparkles, ClipboardList, Clock, AlertTriangle, CheckCircle, RefreshCw, ChevronRight, User, WifiOff } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type EVSTask } from '../db';

const MOCK_TASKS: EVSTask[] = [
  { id: 'EVS-701', room: 'Room 101', priority: 'stat', status: 'pending', requestTime: '10:05 AM' },
  { id: 'EVS-702', room: 'Room 204', priority: 'routine', status: 'pending', requestTime: '10:15 AM' },
  { id: 'EVS-703', room: 'Room 310', priority: 'urgent', status: 'in-progress', assignedTo: 'Maria S.', requestTime: '09:30 AM', elapsedMinutes: 24 },
  { id: 'EVS-704', room: 'OR 2', priority: 'stat', status: 'in-progress', assignedTo: 'John D.', requestTime: '09:45 AM', elapsedMinutes: 15 },
];

export const EVSApp = memo(() => {
  const { showToast } = useToast();
  const tasks = useLiveQuery(() => db.evsTasks.toArray(), []) || [];
  const [appState, setAppState] = useState<'loading' | 'error' | 'empty' | 'full' | 'partial'>('loading');
  const [productivityScore, setProductivityScore] = useState(0);

  const assignTask = useCallback(async (id: string) => {
    await db.evsTasks.update(id, { status: 'in-progress', assignedTo: 'Current User' });
    showToast(`Task ${id} moved to Active Cleaning.`, 'info');
  }, [showToast]);

  const simulateIntelligentDispatch = useCallback(async () => {
    const pendingTasks = await db.evsTasks.where('status').equals('pending').toArray();
    if (pendingTasks.length === 0) {
      showToast('Queue is empty. No tasks to dispatch.', 'info');
      return;
    }
    
    const sorted = [...pendingTasks].sort((a, b) => {
      const priorityWeight: Record<string, number> = { 'stat': 3, 'high': 2, 'routine': 1 };
      const weightDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (weightDiff !== 0) return weightDiff;
      const elapsedB = b.elapsedMinutes ?? 0;
      const elapsedA = a.elapsedMinutes ?? 0;
      return elapsedB - elapsedA;
    });

    const toDispatch = sorted.slice(0, Math.min(3, sorted.length));
    
    await db.transaction('rw', db.evsTasks, async () => {
      for (const t of toDispatch) {
        await db.evsTasks.update(t.id, { status: 'in-progress', assignedTo: 'Auto-Dispatched AI' });
      }
    });

    showToast(`Intelligent Dispatch optimally assigned ${toDispatch.length} tasks.`, 'success');
  }, [showToast]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setAppState('loading');
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock error condition for testing
        if (Math.random() > 0.8) throw new Error("Sync Failed");
        
        await db.transaction('rw', db.evsTasks, async () => {
           await db.evsTasks.clear();
           await db.evsTasks.bulkAdd(MOCK_TASKS);
        });

        if (MOCK_TASKS.length === 0) {
           setAppState('empty');
        } else {
           setProductivityScore(88); // Mock score
           setAppState('full');
        }
      } catch (_) {
        const cached = await db.evsTasks.count();
        if (cached > 0) {
           setAppState('partial');
           showToast('Offline Mode: Displaying cached telemetry.', 'warn');
        } else {
           setAppState('error');
        }
      }
    };
    fetchTasks();
  }, [showToast]);

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const activeTasks = tasks.filter(t => t.status === 'in-progress');

  return (
    <div className="flex flex-col h-full w-full bg-[#050811] text-slate-200 font-sans p-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ClipboardList className="text-emerald-500" />
            EVS Field App
          </h1>
          <p className="text-slate-400 text-sm mt-1">Live task assignments and turnaround tracking</p>
        </div>
        
        <div className="flex items-center gap-4">
           {(appState === 'full' || appState === 'partial') && (
             <div className="flex items-center gap-3 bg-[#0B1C30]/80 border border-slate-800 rounded-xl px-4 py-2">
               <span className="text-sm font-semibold uppercase text-slate-400">Shift Score</span>
               <span className="text-xl font-bold text-emerald-400">{productivityScore}%</span>
             </div>
           )}
           <button 
             onClick={() => setAppState('loading')}
             className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-all active:scale-95 h-[44px]"
           >
             <RefreshCw size={16} className={appState === 'loading' ? 'animate-spin' : ''} />
             Sync
           </button>
        </div>
      </div>

      {/* 4-State Journey */}
      <div className="flex-1 relative rounded-2xl overflow-hidden flex">
        {appState === 'loading' && (
          <div className="w-full h-full bg-[#0B1C30]/50 border border-slate-800 flex flex-col items-center justify-center space-y-4 rounded-2xl">
             <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                <Sparkles size={40} className="text-emerald-500 animate-pulse relative z-10" />
             </div>
             <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Syncing Field Assignments...</p>
          </div>
        )}

        {appState === 'error' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full bg-[#0B1C30]/50 border border-slate-800 flex flex-col items-center justify-center text-center rounded-2xl"
          >
             <div className="relative mb-6">
               <div className="absolute inset-0 bg-amber-500/20 blur-2xl animate-pulse rounded-full"></div>
               <div className="w-20 h-20 bg-amber-950/80 border border-amber-500/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                  <AlertTriangle size={36} className="text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
               </div>
             </div>
             <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">EVS Sync Failed</h2>
             <p className="text-slate-400 mb-8 max-w-md leading-relaxed">Network connection to field devices lost. Continuing in offline mode.</p>
             <button 
                onClick={() => setAppState('loading')}
                className="px-8 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/50 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] active:scale-95"
             >
               Force Reconnect
             </button>
          </motion.div>
        )}

        {appState === 'empty' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-full bg-[#0B1C30]/50 border border-slate-800 flex flex-col items-center justify-center text-center rounded-2xl"
          >
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full"></div>
                <div className="w-24 h-24 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                   <CheckCircle size={48} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                </div>
             </div>
             <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">All Clear!</h2>
             <p className="text-emerald-400 max-w-md text-lg mb-8">Zero pending tasks. Excellent turnaround today.</p>
             <button 
                onClick={() => showToast('Generating Shift Audit...', 'info')}
                className="px-8 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2"
             >
                <ClipboardList size={20} />
                Review Shift Audit
             </button>
          </motion.div>
        )}

        {(appState === 'full' || appState === 'partial') && (
          <div className="w-full h-full flex flex-col min-h-0">
             {appState === 'partial' && (
              <div className="mb-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-2 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.1)] shrink-0">
                 <div className="flex items-center gap-2 font-bold text-sm">
                    <WifiOff size={16} className="animate-pulse" />
                    OFFLINE MODE (PARTIAL DATA)
                 </div>
                 <span className="text-xs text-amber-500/70 font-semibold">Displaying cached EVS tasks. Assignments will queue.</span>
              </div>
             )}
             <div className="w-full h-full flex gap-6 min-h-0">
             {/* Pending Column */}
             <div className="flex-1 flex flex-col min-h-0 bg-[#0B1C30]/80 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                   <h3 className="font-bold text-white uppercase tracking-wider text-sm">Pending Queue</h3>
                   <div className="flex items-center gap-2">
                      <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingTasks.length}</span>
                      <button onClick={simulateIntelligentDispatch} className="ml-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/50 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                         <Sparkles size={14} />
                         Auto-Dispatch
                      </button>
                   </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 px-2 pb-4">
                  {pendingTasks.map(task => (
                    <motion.div 
                       key={task.id}
                       whileHover={{ scale: 1.02 }}
                       className="bg-[#050811] border border-slate-800/80 p-4 rounded-xl shadow-lg relative overflow-hidden group cursor-pointer"
                    >
                      {task.priority === 'stat' && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.8)]"></div>
                      )}
                      {task.priority === 'urgent' && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                      )}
                      
                      <div className="flex justify-between items-start mb-3">
                         <span className="font-mono font-bold text-white">{task.room}</span>
                         <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                           task.priority === 'stat' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' :
                           task.priority === 'urgent' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' :
                           'bg-slate-700/50 text-slate-400'
                         }`}>
                           {task.priority}
                         </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-slate-400 text-sm mt-4">
                        <div className="flex items-center gap-1.5">
                           <Clock size={14} />
                           <span>Req: {task.requestTime}</span>
                        </div>
                        <button 
                          onClick={() => assignTask(task.id)}
                          className="flex items-center gap-1 text-[#2563EB] hover:text-[#3B82F6] transition-all group-hover:translate-x-1 duration-200 active:scale-95"
                        >
                          <span className="text-xs font-bold uppercase">Assign</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>

             {/* Active Column */}
             <div className="flex-1 flex flex-col min-h-0 bg-[#0B1C30]/80 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                   <h3 className="font-bold text-white uppercase tracking-wider text-sm">Active Cleaning</h3>
                   <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded-full text-xs font-bold">{activeTasks.length}</span>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 px-2 pb-4">
                  {activeTasks.map(task => (
                    <motion.div 
                       key={task.id}
                       whileHover={{ scale: 1.02 }}
                       className="bg-[#050811] border border-emerald-500/30 p-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.05)] cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                         <span className="font-mono font-bold text-white">{task.room}</span>
                         <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-xs font-bold">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            IN PROGRESS
                         </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-slate-300 text-sm">
                         <User size={14} className="text-slate-500" />
                         <span>Assigned to: <span className="font-semibold text-white truncate max-w-[120px] inline-block align-bottom">{task.assignedTo}</span></span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-amber-500 text-sm font-mono font-bold">
                           <Clock size={14} />
                           <span>{task.elapsedMinutes}m elapsed</span>
                        </div>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition-all active:scale-95">
                          Verify
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>
             </div>
          </div>
        )}
      </div>

    </div>
  );
});
