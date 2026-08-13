import { useState, useEffect, useCallback, memo } from 'react';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, AlertTriangle, BedDouble, ChevronRight, Loader2, RefreshCw, X, Stethoscope, Sparkles, Search, XCircle, Info, WifiOff } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type BedData } from '../db';



const MOCK_BEDS: BedData[] = Array.from({ length: 12 }, (_, i) => {
  const statusRnd = Math.random();
  const status = statusRnd > 0.6 ? 'occupied' : statusRnd > 0.3 ? 'cleaning' : 'empty';
  return {
    id: `B-${1000 + i}`,
    room: `Room ${101 + i}`,
    status,
    acuity: status === 'occupied' ? (Math.random() > 0.7 ? 'critical' : 'stable') : 'none',
    patientName: status === 'occupied' ? `Patient ${Math.floor(Math.random() * 900) + 100}` : undefined,
    evsStatus: status === 'cleaning' ? (Math.random() > 0.5 ? 'in-progress' : 'pending') : undefined,
    tat: status === 'cleaning' ? Math.floor(Math.random() * 45) + 10 : undefined,
  };
});

export const BedManagement = memo(() => {
  const { showToast } = useToast();
  const beds = useLiveQuery(() => db.beds.toArray(), []) || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedBed, setSelectedBed] = useState<BedData | null>(null);
  const [appState, setAppState] = useState<'loading' | 'error' | 'empty' | 'full' | 'partial'>('loading');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        setAppState('loading');
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock error condition for testing (20% chance to fail)
        if (Math.random() > 0.8) throw new Error("Sync Failed");
        
        await db.transaction('rw', db.beds, async () => {
           await db.beds.clear();
           await db.beds.bulkAdd(MOCK_BEDS);
        });

        if (MOCK_BEDS.length === 0) {
           setAppState('empty');
        } else {
           setAppState('full');
        }
      } catch (err) {
        console.error("Sync Error:", err);
        const cached = await db.beds.count();
        if (cached > 0) {
           setAppState('partial');
           showToast('Offline Mode: Displaying cached telemetry.', 'warn');
        } else {
           setAppState('error');
        }
      }
    };
    fetchBeds();
  }, [showToast]);

  const zeroClickAdmit = useCallback(async () => {
    if (appState !== 'full' && appState !== 'partial') return;
    setIsScanning(true);
    
    // Simulate AI scanning delay
    await new Promise(r => setTimeout(r, 1500));

    const emptyBeds = await db.beds.where('status').equals('empty').toArray();
    if (emptyBeds.length === 0) {
      showToast('No empty beds available for handoff.', 'error');
      setIsScanning(false);
      return;
    }

    const optimalBed = emptyBeds[0];
    await db.beds.update(optimalBed.id, {
      status: 'occupied',
      patientName: `Auto Admit ${Math.floor(Math.random() * 900) + 100}`,
      acuity: 'stable'
    });

    showToast(`Zero-Click Handoff: Patient intelligently assigned to ${optimalBed.room}`, 'success');
    setSelectedBed(optimalBed);
    setIsScanning(false);
  }, [appState, showToast]);

  // Aggregated KPIs (Zero-Undefined Defensive Logic)
  const filteredBeds = beds.filter(b => b.room.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalBeds = filteredBeds.length || 1; 
  const occupiedBeds = filteredBeds.filter(b => b.status === 'occupied').length;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100) || 0;
  const criticalAlerts = filteredBeds.filter(b => b.acuity === 'critical').length || 0;
  const cleaningBeds = filteredBeds.filter(b => b.status === 'cleaning');
  const avgTat = cleaningBeds.length > 0 
    ? Math.round(cleaningBeds.reduce((acc, b) => acc + (b.tat || 0), 0) / cleaningBeds.length) 
    : 0;

  return (
    <div className="flex h-full w-full bg-[#050811] text-slate-200 overflow-hidden font-sans">
      
      {/* Main Body: Triple Metric Layout */}
      <div className="flex-1 p-6 flex flex-col h-full overflow-hidden relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <BedDouble className="text-[#2563EB]" />
              Unified Bed Orchestration
            </h1>
            <p className="text-slate-400 text-sm mt-1">Real-time facility occupancy and EVS turnaround</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative group">
                <div 
                   className="relative flex items-center bg-black/40 border border-slate-700 rounded-lg overflow-hidden focus-within:border-[#2563EB]/50 focus-within:ring-1 focus-within:ring-[#2563EB]/50 transition-all"
                   onMouseEnter={() => setShowTooltip(true)}
                   onMouseLeave={() => setShowTooltip(false)}
                >
                   <div className="pl-3 text-slate-500"><Search size={16} /></div>
                   <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter') {
                          e.preventDefault();
                          showToast(`Search executed for: ${searchQuery}`, 'info');
                       }
                     }}
                     placeholder="Search Room or ID..."
                     className="w-48 bg-transparent text-sm text-white px-3 py-2 outline-none placeholder:text-slate-600"
                   />
                   {searchQuery && (
                     <button 
                       onClick={() => setSearchQuery('')}
                       className="pr-3 text-slate-500 hover:text-slate-300 transition-colors"
                     >
                        <XCircle size={16} />
                     </button>
                   )}
                </div>
                
                {/* Form Tooltip */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-[#0B1C30]/95 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl shadow-xl z-50 pointer-events-none"
                    >
                       <div className="flex gap-2">
                          <Info size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-white mb-1">Search Parameters</p>
                            <p className="text-xs text-slate-400">Accepts Room Number (e.g., "101") or Bed ID (e.g., "B-1002"). Press Enter to submit or Backspace to clear.</p>
                          </div>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             <button 
               onClick={() => setAppState('loading')}
               className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 rounded-lg text-sm text-white transition-all"
             >
               <RefreshCw size={16} className={appState === 'loading' ? 'animate-spin' : ''} />
               Force Sync
             </button>
             <button
               onClick={zeroClickAdmit}
               disabled={isScanning}
               className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest transition-all ${
                 isScanning 
                   ? 'bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/50'
                   : 'bg-emerald-500 hover:bg-emerald-400 text-[#050811] shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95'
               }`}
             >
               {isScanning ? (
                 <>
                   <Search size={16} className="animate-ping" />
                   Scanning...
                 </>
               ) : (
                 <>
                   <Stethoscope size={16} />
                   Zero-Click Admit
                 </>
               )}
             </button>
          </div>
        </div>

        {/* 4-State Journey Handling */}
        {appState === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
             <div className="relative">
                <div className="absolute inset-0 bg-[#2563EB]/20 rounded-full blur-xl animate-pulse"></div>
                <Loader2 size={40} className="text-[#2563EB] animate-spin relative z-10" />
             </div>
             <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Syncing Bed Telemetry...</p>
          </div>
        )}

        {appState === 'error' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto"
          >
             <div className="relative mb-6">
               <div className="absolute inset-0 bg-rose-500/20 blur-2xl animate-pulse rounded-full"></div>
               <div className="w-20 h-20 bg-rose-950/80 border border-rose-500/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(225,29,72,0.3)]">
                  <AlertTriangle size={36} className="text-rose-500 drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]" />
               </div>
             </div>
             <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Telemetry Sync Failed</h2>
             <p className="text-slate-400 mb-8 leading-relaxed">Unable to retrieve live bed statuses. The system is operating in offline mode. Changes will be queued.</p>
             <button 
                onClick={() => setAppState('loading')}
                className="px-8 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/50 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(225,29,72,0.15)] hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] active:scale-95"
             >
               Force Reconnect
             </button>
          </motion.div>
        )}

        {appState === 'empty' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#2563EB]/10 blur-2xl rounded-full"></div>
                <div className="w-24 h-24 bg-[#0B1C30]/80 border border-slate-700/80 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                   <BedDouble size={40} className="text-[#2563EB] drop-shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                </div>
             </div>
             <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">No Beds Configured</h2>
             <p className="text-slate-400 max-w-md mb-8">Your facility does not have any active beds matching the current filters. Adjust your criteria to continue.</p>
             <button 
                onClick={() => {
                   setSearchQuery('');
                   setAppState('loading');
                }}
                className="px-6 py-2.5 bg-[#2563EB]/10 hover:bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/40 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2"
             >
                <RefreshCw size={18} />
                Clear Filters
             </button>
          </motion.div>
        )}

        {(appState === 'full' || appState === 'partial') && (
          <div className="flex-1 flex flex-col min-h-0">
            {appState === 'partial' && (
              <div className="mb-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-2 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.1)] shrink-0">
                 <div className="flex items-center gap-2 font-bold text-sm">
                    <WifiOff size={16} className="animate-pulse" />
                    OFFLINE MODE (PARTIAL DATA)
                 </div>
                 <span className="text-xs text-amber-500/70 font-semibold">Displaying cached telemetry. Changes will queue and sync when online.</span>
              </div>
            )}
            {/* Top Row: KPI Cards */}
            <div className="grid grid-cols-3 gap-6 mb-6 shrink-0">
              
              <div className="bg-[#0B1C30]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Clock size={64} />
                </div>
                <div className="flex items-center space-x-3 text-slate-400 mb-4">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Clock size={20} /></div>
                  <span className="font-semibold text-sm uppercase tracking-wider">Avg EVS TAT</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-white">{avgTat}</span>
                  <span className="text-slate-400 font-mono">mins</span>
                </div>
              </div>

              <div className="bg-[#0B1C30]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users size={64} />
                </div>
                <div className="flex items-center space-x-3 text-slate-400 mb-4">
                  <div className="p-2 bg-[#2563EB]/10 rounded-lg text-[#2563EB]"><BedDouble size={20} /></div>
                  <span className="font-semibold text-sm uppercase tracking-wider">Facility Occupancy</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-white">{occupancyRate}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 mt-4 rounded-full overflow-hidden">
                  <div className="bg-[#2563EB] h-full rounded-full" style={{ width: `${occupancyRate}%` }}></div>
                </div>
              </div>

              <div className="bg-[#0B1C30]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <AlertTriangle size={64} />
                </div>
                <div className="flex items-center space-x-3 text-slate-400 mb-4">
                  <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><AlertTriangle size={20} /></div>
                  <span className="font-semibold text-sm uppercase tracking-wider">Critical Acuity</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-4xl font-bold ${criticalAlerts > 0 ? 'text-rose-500' : 'text-white'}`}>{criticalAlerts}</span>
                  <span className="text-slate-400 font-mono">Active</span>
                </div>
                {criticalAlerts > 0 && (
                   <p className="text-xs text-rose-500 mt-4 font-mono animate-pulse">REQUIRES IMMEDIATE ATTENTION</p>
                )}
              </div>

            </div>

            {/* Bottom Row: Consolidated Data Grid */}
            <div className="flex-1 bg-[#0B1C30]/50 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col">
               <div className="grid grid-cols-5 gap-4 p-4 border-b border-slate-800 bg-slate-900/50 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                 <div className="col-span-1">Bed ID</div>
                 <div className="col-span-1">Room</div>
                 <div className="col-span-1">Status</div>
                 <div className="col-span-1">Acuity</div>
                 <div className="col-span-1 text-right">Action</div>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                 {filteredBeds.map(bed => (
                   <motion.div 
                     key={bed.id}
                     whileHover={{ x: 4 }}
                     onClick={() => setSelectedBed(bed)}
                     className={`grid grid-cols-5 gap-4 p-4 rounded-xl items-center cursor-pointer border transition-colors ${
                       selectedBed?.id === bed.id 
                         ? 'bg-[#2563EB]/10 border-[#2563EB]/30' 
                         : 'bg-black/20 border-slate-800/50 hover:border-slate-600'
                     }`}
                   >
                     <div className="col-span-1 font-mono font-bold text-white">{bed.id}</div>
                     <div className="col-span-1 text-slate-300 truncate max-w-full" title={bed.room}>{bed.room}</div>
                     <div className="col-span-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                           bed.status === 'occupied' ? 'bg-[#2563EB]/20 text-[#2563EB]' :
                           bed.status === 'cleaning' ? 'bg-amber-500/20 text-amber-500' :
                           'bg-slate-700/50 text-slate-400'
                        }`}>
                          {bed.status}
                        </span>
                     </div>
                     <div className="col-span-1">
                       {bed.acuity === 'critical' ? (
                         <div className="flex items-center text-rose-500 space-x-1">
                           <AlertTriangle size={14} className="animate-pulse" />
                           <span className="text-xs uppercase tracking-wider font-bold">Critical</span>
                         </div>
                       ) : bed.acuity === 'stable' ? (
                         <span className="text-xs uppercase tracking-wider text-emerald-400">Stable</span>
                       ) : (
                         <span className="text-xs text-slate-500">-</span>
                       )}
                     </div>
                     <div className="col-span-1 flex justify-end">
                       <ChevronRight size={18} className="text-slate-500" />
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Pane: Contextual Details (Zero-Scroll Pattern) */}
      <AnimatePresence mode="wait">
        {selectedBed && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-[380px] border-l border-slate-800/80 bg-[#0B1C30]/90 backdrop-blur-2xl h-full flex flex-col shrink-0"
          >
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-mono">{selectedBed.id}</h2>
                <p className="text-slate-400 text-sm mt-1">{selectedBed.room}</p>
              </div>
              <button onClick={() => setSelectedBed(null)} className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6 flex-1 space-y-6 overflow-y-auto">
              
              {selectedBed.status === 'occupied' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-[#2563EB] mb-2">
                    <Stethoscope size={18} />
                    <h3 className="font-semibold uppercase tracking-wider text-sm">Patient Profile</h3>
                  </div>
                  <div className="p-4 bg-black/20 rounded-xl border border-slate-800">
                    <p className="font-medium text-white truncate max-w-full" title={selectedBed.patientName}>{selectedBed.patientName || "Unknown Patient"}</p>
                    <p className="text-sm text-slate-400 mt-1">Acuity: {selectedBed.acuity.toUpperCase()}</p>
                  </div>
                </div>
              )}

              {selectedBed.status === 'cleaning' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-amber-500 mb-2">
                    <Sparkles size={18} />
                    <h3 className="font-semibold uppercase tracking-wider text-sm">EVS Operation</h3>
                  </div>
                  <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                    <p className="font-medium text-amber-500 capitalize">{selectedBed.evsStatus || "Unknown"} Status</p>
                    <div className="flex items-center mt-3 text-sm text-slate-300">
                      <Clock size={14} className="mr-2 text-slate-500" />
                      TAT: {selectedBed.tat || 0} minutes elapsed
                    </div>
                  </div>
                </div>
              )}

              {selectedBed.status === 'empty' && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                   <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700">
                      <BedDouble size={24} className="text-slate-500" />
                   </div>
                   <h3 className="text-white font-semibold">Bed is Ready</h3>
                   <p className="text-slate-400 text-sm mt-2 max-w-[200px]">This bed has been cleaned and is ready for admission.</p>
                </div>
              )}

            </div>

            <div className="p-6 border-t border-slate-800/80 space-y-3">
              {selectedBed.status === 'occupied' && (
                <button className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-xl font-bold transition-all active:scale-95">
                  Initiate Transfer
                </button>
              )}
              {selectedBed.status === 'cleaning' && (
                <button className="w-full py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-xl font-bold transition-all active:scale-95">
                  Page EVS Staff
                </button>
              )}
              {selectedBed.status === 'empty' && (
                <button 
                  onClick={() => showToast('Bed assignment workflow initiated.', 'info')}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] active:scale-95"
                >
                  Assign Bed
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
});
