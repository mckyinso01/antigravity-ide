import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BedDouble, AlertTriangle, CheckCircle2, Loader2, Sparkles, X, User, Compass, WifiOff, Siren, Lock, Unlock, KeyRound, Settings, Grid, Plus } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type RoomData } from '../db';
import { useEmergency } from '../contexts/EmergencyContext';

// Mock Database
const MOCK_ROOMS: RoomData[] = Array.from({ length: 16 }, (_, i) => {
  const isOccupied = Math.random() > 0.4;
  const isCleaning = !isOccupied && Math.random() > 0.5;
  return {
    id: `R-${100 + i}`,
    name: `Room ${100 + i}`,
    status: isOccupied ? 'occupied' : isCleaning ? 'cleaning' : 'empty',
    acuity: isOccupied ? (Math.random() > 0.7 ? 'critical' : 'stable') : 'none',
    patientName: isOccupied ? `Patient ${Math.floor(Math.random() * 1000)}` : undefined,
    assignedNurse: isOccupied ? `Nurse ${String.fromCharCode(65 + (i % 5))}` : undefined,
  };
});

export const CommandCenter = memo(() => {
  const rooms = useLiveQuery(() => db.rooms.toArray(), []) || [];
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [appState, setAppState] = useState<'loading' | 'error' | 'full' | 'partial'>('loading');
  const { isCodeBlue, toggleCodeBlue } = useEmergency();
  
  // Admin Builder State
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  
  // Handoff Checklist State
  const [checklist, setChecklist] = useState({
    nurseCleared: false,
    evsSanitized: false,
    bedReady: false
  });

  // Reset checklist when room changes
  useEffect(() => {
    if (selectedRoom) {
      setChecklist({ nurseCleared: false, evsSanitized: false, bedReady: false });
    }
  }, [selectedRoom?.id]);

  const isChecklistComplete = checklist.nurseCleared && checklist.evsSanitized && checklist.bedReady;

  // Simulate network load
  useEffect(() => {
    const fetchCanvasData = async () => {
      try {
        setAppState('loading');
        await new Promise(resolve => setTimeout(resolve, 1200));
        // Simulate a 10% chance of an error to demonstrate the Error State
        if (Math.random() > 0.8) throw new Error("WebGL Canvas rendering failed. Retrying sync...");
        
        await db.transaction('rw', db.rooms, async () => {
           await db.rooms.clear();
           await db.rooms.bulkAdd(MOCK_ROOMS);
        });

        setAppState('full');
      } catch (_) {
        const cached = await db.rooms.count();
        if (cached > 0) {
           setAppState('partial');
        } else {
           setAppState('error');
        }
      }
    };
    fetchCanvasData();
  }, []);

  const getStatusColor = (status: RoomData['status'], acuity: RoomData['acuity']) => {
    if (status === 'occupied') return acuity === 'critical' ? 'bg-[#E11D48]/80 border-[#E11D48]' : 'bg-[#2563EB]/80 border-[#2563EB]';
    if (status === 'cleaning') return 'bg-[#F59E0B]/80 border-[#F59E0B]';
    return 'bg-white/5 border-white/10'; // empty
  };

  const getStatusGlow = (status: RoomData['status'], acuity: RoomData['acuity']) => {
    if (status === 'occupied' && acuity === 'critical') return 'shadow-[0_0_15px_rgba(225,29,72,0.5)]';
    if (status === 'cleaning') return 'shadow-[0_0_15px_rgba(245,158,11,0.3)]';
    return '';
  };

  return (
    <div className="flex h-full w-full bg-[#050811] text-slate-200 overflow-hidden font-sans">
      
      {/* LEFT PANE: Interactive Topographical Map Canvas */}
      <div className="flex-1 p-6 flex flex-col h-full overflow-hidden relative">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${isCodeBlue ? 'bg-rose-500/20 text-rose-500 shadow-rose-500/20' : 'bg-[#2563EB]/20 text-[#2563EB] shadow-[#2563EB]/20'}`}>
                <Activity size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
                <p className="text-slate-400">Real-time topographical unit overview</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => isBuilderMode ? setIsBuilderMode(false) : setShowAdminLogin(true)}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border ${
                  isBuilderMode 
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-600'
                    : 'bg-black/40 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10'
                }`}
              >
                {isBuilderMode ? <Unlock size={18} /> : <Lock size={18} />}
                {isBuilderMode ? 'Exit Builder Mode' : 'Edit Floor Plan'}
              </button>

              <button 
                onClick={toggleCodeBlue}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border ${
                  isCodeBlue 
                    ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.6)] animate-pulse hover:bg-rose-600'
                    : 'bg-black/40 text-rose-500 border-rose-500/30 hover:bg-rose-500/10'
                }`}
              >
                <Siren size={18} />
                {isCodeBlue ? 'Stand Down' : 'Code Blue'}
              </button>
            </div>
          </div>

        <div className="flex-1 bg-[#0B1C30]/50 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 flex items-center justify-center relative overflow-hidden">
          
          {appState === 'loading' && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 size={32} className="text-[#2563EB] animate-spin" />
              <p className="text-slate-400 text-sm font-mono animate-pulse">INITIALIZING WEBGL CANVAS...</p>
            </div>
          )}

          {appState === 'error' && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-md">
              <div className="p-4 bg-[#E11D48]/10 rounded-full border border-[#E11D48]/20">
                <AlertTriangle size={32} className="text-[#E11D48]" />
              </div>
              <h2 className="text-lg font-bold text-white">Canvas Sync Disconnected</h2>
              <p className="text-slate-400 text-sm">Failed to connect to the central telemetry server. The system is attempting to auto-reconnect via Dexie.js offline cache.</p>
              <button 
                onClick={() => setAppState('loading')}
                className="mt-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all active:scale-95 text-sm"
              >
                Force Retry Sync
              </button>
            </div>
          )}

          {(appState === 'full' || appState === 'partial') && (
             <div className="w-full h-full flex flex-col">
                {appState === 'partial' && (
                  <div className="mb-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-2 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.1)] shrink-0">
                     <div className="flex items-center gap-2 font-bold text-sm">
                        <WifiOff size={16} className="animate-pulse" />
                        OFFLINE MODE (PARTIAL DATA)
                     </div>
                     <span className="text-xs text-amber-500/70 font-semibold">Displaying cached topographical layout.</span>
                  </div>
                )}
                 <div className={`w-full h-full grid grid-cols-4 gap-4 auto-rows-[minmax(100px,1fr)] content-start overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 ${isBuilderMode ? 'border-2 border-dashed border-emerald-500/30 bg-emerald-500/5 p-4 rounded-xl' : ''}`}>
                  <AnimatePresence>
                    {isBuilderMode && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0B1C30]/90 backdrop-blur-md border border-emerald-500/50 p-4 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.2)] z-20 flex items-center gap-6"
                      >
                        <div className="flex items-center gap-2 text-emerald-400 font-bold border-r border-slate-700 pr-6">
                          <Settings size={20} className="animate-[spin_4s_linear_infinite]" />
                          BUILDER MODE ACTIVE
                        </div>
                        <div className="flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors">
                            <Grid size={16} /> Grid Snap
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 border border-slate-700 rounded-lg text-sm text-slate-300 transition-colors">
                            <Plus size={16} /> Add Custom Tag
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {rooms.map((room) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedRoom(room)}
                        className={`cursor-pointer rounded-xl border-2 flex flex-col p-3 justify-between transition-all duration-300 ${getStatusColor(room.status, room.acuity)} ${getStatusGlow(room.status, room.acuity)} ${selectedRoom?.id === room.id ? 'ring-2 ring-white/50 scale-105' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-sm font-bold text-white drop-shadow-md">{room.id}</span>
                          {room.acuity === 'critical' && <AlertTriangle size={16} className="text-white animate-pulse" />}
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          {room.status === 'cleaning' && <Sparkles size={20} className="text-white/80" />}
                          {room.status === 'occupied' && <User size={20} className="text-white/80" />}
                          {room.status === 'empty' && <BedDouble size={20} className="text-slate-500" />}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* RIGHT PANE: Contextual Slide-out Details */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedRoom ? 'selected' : 'empty'}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-[400px] border-l border-slate-800/80 bg-[#0B1C30]/90 backdrop-blur-2xl h-full flex flex-col shrink-0"
        >
          {!selectedRoom ? (
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="relative mb-4">
                   <div className="absolute inset-0 bg-[#2563EB]/10 blur-xl rounded-full animate-pulse"></div>
                   <div className="w-24 h-24 rounded-full bg-[#0B1C30]/80 flex items-center justify-center border border-slate-700/80 relative z-10 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
                     <CheckCircle2 size={40} className="text-[#2563EB] drop-shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                   </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Standing By</h3>
                  <p className="text-slate-400 text-sm max-w-[250px] mb-8">Select a room from the Topographical Canvas to view live telemetry and assignments.</p>
                  <button 
                    className="px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/50 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 mx-auto shadow-lg"
                  >
                     <Compass size={18} className="text-[#2563EB]" />
                     Load Default View
                  </button>
                </div>
             </div>
          ) : (
             <div className="flex flex-col h-full">
                <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white font-mono">{selectedRoom.name}</h2>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-slate-300">
                      {selectedRoom.status}
                    </span>
                  </div>
                  <button onClick={() => setSelectedRoom(null)} className="p-2 hover:bg-white/10 rounded-full transition-all active:scale-95">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Patient Details</label>
                    <div className="p-4 bg-black/20 rounded-xl border border-slate-800">
                      <p className="font-medium text-white truncate max-w-full" title={selectedRoom.patientName}>{selectedRoom.patientName ?? "No active patient assigned"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Assigned Staff</label>
                    <div className="p-4 bg-black/20 rounded-xl border border-slate-800">
                      <p className="font-medium text-white truncate max-w-full" title={selectedRoom.assignedNurse}>{selectedRoom.assignedNurse ?? "No nurse on duty"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Acuity Status</label>
                    <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
                      selectedRoom.acuity === 'critical' ? 'bg-[#E11D48]/10 border-[#E11D48]/30 text-[#E11D48]' :
                      selectedRoom.acuity === 'stable' ? 'bg-[#2563EB]/10 border-[#2563EB]/30 text-[#2563EB]' :
                      'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      <Activity size={18} />
                      <p className="font-medium uppercase tracking-wider text-sm">
                        {selectedRoom.acuity !== 'none' ? selectedRoom.acuity : 'System Idle'}
                      </p>
                    </div>
                  </div>

                  {/* Right-Drawer Handoff Checklist */}
                  <div className="space-y-3 pt-4 border-t border-slate-800/80">
                    <label className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={14} />
                      Clearance Validation Checklist
                    </label>
                    
                    <div className="space-y-2">
                      {[
                        { id: 'nurseCleared', label: 'Nurse Final Clearance Verified' },
                        { id: 'evsSanitized', label: 'EVS Bio-Sanitization Complete' },
                        { id: 'bedReady', label: 'Bed Telemetry Locked & Ready' },
                      ].map((item) => (
                        <label key={item.id} className="flex items-center space-x-3 p-3 bg-black/20 hover:bg-black/40 border border-slate-800 rounded-xl cursor-pointer transition-colors group">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            checklist[item.id as keyof typeof checklist] 
                              ? 'bg-emerald-500 border-emerald-500 text-[#050811]' 
                              : 'bg-transparent border-slate-600 group-hover:border-slate-400'
                          }`}>
                            {checklist[item.id as keyof typeof checklist] && <CheckCircle2 size={14} />}
                          </div>
                          <span className={`text-sm font-medium transition-colors ${
                            checklist[item.id as keyof typeof checklist] ? 'text-white' : 'text-slate-400'
                          }`}>
                            {item.label}
                          </span>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={checklist[item.id as keyof typeof checklist]}
                            onChange={(e) => setChecklist(prev => ({ ...prev, [item.id]: e.target.checked }))}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-800/80">
                  <button 
                    disabled={!isChecklistComplete}
                    className={`w-full py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                      isChecklistComplete 
                        ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                        : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
                    }`}
                  >
                    {isChecklistComplete ? (
                      <>
                        <Sparkles size={18} />
                        Clear Room & Initiate Dispatch
                      </>
                    ) : (
                      'Complete Validation First'
                    )}
                  </button>
                </div>
              </div>
           )}
        </motion.div>
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0B1C30] border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-sm w-full"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50">
                  <KeyRound size={32} className="text-emerald-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white text-center mb-2">Admin Authorization</h2>
              <p className="text-sm text-slate-400 text-center mb-6">Enter password to unlock Floor Plan Builder.</p>
              
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setAdminError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (adminPassword === 'admin') {
                      setIsBuilderMode(true);
                      setShowAdminLogin(false);
                      setAdminPassword('');
                    } else {
                      setAdminError(true);
                    }
                  }
                }}
                className={`w-full bg-black/40 border ${adminError ? 'border-rose-500 focus:border-rose-500 text-rose-500' : 'border-slate-700 focus:border-emerald-500 text-white'} rounded-xl px-4 py-3 outline-none mb-4`}
                placeholder="Enter Password... (Hint: admin)"
                autoFocus
              />
              
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminPassword('');
                    setAdminError(false);
                  }}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (adminPassword === 'admin') {
                      setIsBuilderMode(true);
                      setShowAdminLogin(false);
                      setAdminPassword('');
                    } else {
                      setAdminError(true);
                    }
                  }}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  Unlock
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
});
