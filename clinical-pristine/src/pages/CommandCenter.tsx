import { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BedDouble, AlertTriangle, CheckCircle2, Loader2, Sparkles, X, User, Compass, WifiOff, Siren, Lock, Unlock, KeyRound, Settings, Square, Minus, Type, Layers, Save, RotateCcw, RotateCw, Trash2, ZoomIn, ZoomOut } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type RoomData, type WallData, type FloorTagData, type BedData } from '../db';
import { useEmergency } from '../contexts/EmergencyContext';

const MOCK_ROOMS: RoomData[] = Array.from({ length: 8 }, (_, i) => {
  const isOccupied = Math.random() > 0.4;
  return {
    id: `R-${100 + i}`,
    name: `Room ${100 + i}`,
    status: isOccupied ? 'occupied' : 'empty',
    acuity: isOccupied ? (Math.random() > 0.7 ? 'critical' : 'stable') : 'none',
    x: (i % 4) * 320 + 100,
    y: Math.floor(i / 4) * 260 + 100,
    w: 280,
    h: 200,
  };
});

const MOCK_BEDS: BedData[] = Array.from({ length: 16 }, (_, i) => {
  const roomIndex = Math.floor(i / 2); 
  return {
    id: `B-${100 + i}`,
    room: `R-${100 + roomIndex}`,
    status: Math.random() > 0.5 ? 'occupied' : 'empty',
    acuity: 'none',
    x: (i % 2 === 0 ? 50 : 170),
    y: 60,
    rotation: 0
  };
});

const MOCK_WALLS: WallData[] = [
  { id: 'W-1', x: 50, y: 50, length: 1350, rotation: 0, thickness: 8 },
  { id: 'W-2', x: 50, y: 650, length: 1350, rotation: 0, thickness: 8 },
  { id: 'W-3', x: 50, y: 50, length: 600, rotation: 90, thickness: 8 },
  { id: 'W-4', x: 1400, y: 50, length: 600, rotation: 90, thickness: 8 },
];

const GRID_SIZE = 20;
const snapToGrid = (val: number) => Math.round(val / GRID_SIZE) * GRID_SIZE;

export const CommandCenter = memo(() => {
  const rooms = useLiveQuery(() => db.rooms.toArray(), []) || [];
  const walls = useLiveQuery(() => db.walls.toArray(), []) || [];
  const tags = useLiveQuery(() => db.floorTags.toArray(), []) || [];
  const beds = useLiveQuery(() => db.beds.toArray(), []) || [];
  
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [appState, setAppState] = useState<'loading' | 'error' | 'full' | 'partial'>('loading');
  const { isCodeBlue, toggleCodeBlue } = useEmergency();
  
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [selectedBuilderId, setSelectedBuilderId] = useState<string | null>(null);
  const [resizingWall, setResizingWall] = useState<{ id: string, length: number } | null>(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const [checklist, setChecklist] = useState({ nurseCleared: false, evsSanitized: false, bedReady: false });
  const [floorName, setFloorName] = useState(() => localStorage.getItem('pristine_floor_name') || 'Level 1');

  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('pristine_floor_name', floorName);
  }, [floorName]);

  useEffect(() => {
    const el = canvasWrapperRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setZoom(prev => Math.min(Math.max(0.2, prev + (e.deltaY > 0 ? -0.1 : 0.1)), 3));
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (selectedRoom) setChecklist({ nurseCleared: false, evsSanitized: false, bedReady: false });
  }, [selectedRoom]);

  const isChecklistComplete = checklist.nurseCleared && checklist.evsSanitized && checklist.bedReady;

  useEffect(() => {
    const fetchCanvasData = async () => {
      try {
        setAppState('loading');
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const migrationDone = localStorage.getItem('beds_migrated_v3');
        await db.transaction('rw', db.rooms, db.walls, db.beds, async () => {
           const rc = await db.rooms.count();
           if (rc === 0) {
             await db.rooms.bulkAdd(MOCK_ROOMS);
             await db.walls.bulkAdd(MOCK_WALLS);
             await db.beds.bulkAdd(MOCK_BEDS);
           }
           
           if (!migrationDone) {
             const allRooms = await db.rooms.toArray();
             for (const r of allRooms) {
               if (r.w === 200) await db.rooms.update(r.id, { w: 280, h: 200 });
             }
             const allBeds = await db.beds.toArray();
             for (const b of allBeds) {
               if (b.room) {
                 const parent = allRooms.find(r => r.id === b.room);
                 if (parent && (b.x > 280 || b.y > 200)) {
                   await db.beds.update(b.id, { x: Math.max(10, b.x - parent.x), y: Math.max(10, b.y - parent.y) });
                 }
               }
             }
           }
        });
        if (!migrationDone) localStorage.setItem('beds_migrated_v3', 'true');
        setAppState('full');
      } catch (err) {
        console.error("Sync Error:", err);
        const cached = await db.rooms.count();
        if (cached > 0) setAppState('partial');
        else setAppState('error');
      }
    };
    fetchCanvasData();
  }, []);

  const getStatusColor = (status: RoomData['status'], acuity: RoomData['acuity']) => {
    if (status === 'occupied') return acuity === 'critical' ? 'bg-[#0B1C30]/90 border-rose-500/50' : 'bg-[#0B1C30]/90 border-blue-500/50';
    if (status === 'cleaning') return 'bg-[#0B1C30]/90 border-amber-500/50';
    return 'bg-[#0B1C30]/50 border-white/10';
  };

  const getStatusGlow = (status: RoomData['status'], acuity: RoomData['acuity']) => {
    if (status === 'occupied' && acuity === 'critical') return 'shadow-[0_0_15px_rgba(225,29,72,0.4)]';
    if (status === 'occupied') return 'shadow-[0_0_15px_rgba(37,99,235,0.2)]';
    if (status === 'cleaning') return 'shadow-[0_0_15px_rgba(245,158,11,0.2)]';
    return '';
  };

  const handleDragEnd = async (type: 'room' | 'wall' | 'tag' | 'bed', id: string, info: any, originalX: number, originalY: number, parentW?: number, parentH?: number) => {
    if (!isBuilderMode) return;
    let newX = snapToGrid(originalX + info.offset.x);
    let newY = snapToGrid(originalY + info.offset.y);
    
    if (type === 'bed' && parentW && parentH) {
      newX = snapToGrid(Math.max(10, Math.min(newX, parentW - 60)));
      newY = snapToGrid(Math.max(10, Math.min(newY, parentH - 100)));
    }
    
    if (type === 'room') await db.rooms.update(id, { x: newX, y: newY });
    if (type === 'wall') await db.walls.update(id, { x: newX, y: newY });
    if (type === 'tag') await db.floorTags.update(id, { x: newX, y: newY });
    if (type === 'bed') await db.beds.update(id, { x: newX, y: newY });
  };

  const addRoom = async () => {
    await db.rooms.add({
      id: `R-${Math.floor(Math.random() * 10000)}`,
      name: `New Room`,
      status: 'empty',
      acuity: 'none',
      x: 300, y: 300, w: 280, h: 200
    });
  };

  const addBedToRoom = async (room: RoomData) => {
    const existingBeds = beds.filter(b => b.room === room.id);
    const offsetX = 20 + (existingBeds.length * 70);
    await db.beds.add({
      id: `B-${Math.floor(Math.random() * 10000)}`,
      room: room.id,
      status: 'empty',
      acuity: 'none',
      x: offsetX, 
      y: 40, 
      rotation: 0
    });
  };

  const addTagToRoom = async (room: RoomData) => {
    await db.floorTags.add({
      id: `T-${Math.floor(Math.random() * 10000)}`,
      label: 'New Label',
      x: room.x + 20, 
      y: room.y + room.h - 40,
    });
  };

  const addWall = async () => {
    await db.walls.add({
      id: `W-${Math.floor(Math.random() * 10000)}`,
      x: 400, y: 400, length: 200, rotation: 0, thickness: 8
    });
  };

  const MainCanvas = () => (
    <>
    <div 
      ref={canvasWrapperRef}
      className="absolute inset-0 overflow-auto custom-scrollbar bg-[#050811]"
      onClick={() => isBuilderMode && setSelectedBuilderId(null)}
    >
      <div 
        className="relative min-w-[3000px] min-h-[3000px] origin-top-left transition-transform duration-75"
        style={{
          transform: `scale(${zoom})`,
          backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)',
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
        }}
      >
        {/* Render Walls */}
        {walls.map((wall) => {
          const currentLength = resizingWall?.id === wall.id ? resizingWall.length : wall.length;
          return (
          <motion.div
            key={wall.id}
            drag={isBuilderMode}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd('wall', wall.id, info, wall.x, wall.y)}
            className={`absolute rounded-full cursor-${isBuilderMode ? 'grab' : 'default'} active:cursor-grabbing transition-colors ${selectedBuilderId === wall.id ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-400 hover:bg-slate-300'}`}
            style={{
              x: wall.x,
              y: wall.y,
              width: currentLength,
              height: wall.thickness,
              rotate: wall.rotation,
              transformOrigin: 'left center'
            }}
            onClick={(e) => {
              if (isBuilderMode) {
                e.stopPropagation();
                setSelectedBuilderId(wall.id);
              }
            }}
          >
            {isBuilderMode && selectedBuilderId === wall.id && (
              <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onPointerDown={(e) => e.stopPropagation()}
                onDrag={(e, info) => {
                  const angleRad = (wall.rotation * Math.PI) / 180;
                  const deltaLength = info.delta.x * Math.cos(angleRad) + info.delta.y * Math.sin(angleRad);
                  setResizingWall(prev => ({ 
                    id: wall.id, 
                    length: Math.max(20, (prev ? prev.length : wall.length) + deltaLength) 
                  }));
                }}
                onDragEnd={() => {
                  setResizingWall(prev => {
                    if (prev && prev.id === wall.id) {
                      const snapped = snapToGrid(prev.length);
                      db.walls.update(wall.id, { length: snapped });
                    }
                    return null;
                  });
                }}
                className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-[3px] border-emerald-500 rounded-full cursor-crosshair z-50 hover:scale-150 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.9)]"
              />
            )}
            {isBuilderMode && selectedBuilderId === wall.id && (
              <div 
                className="absolute top-[-50px] left-0 bg-[#0B1C30] border border-emerald-500/50 p-1.5 rounded-xl flex items-center gap-1 shadow-2xl z-50"
                style={{ transform: `rotate(${-wall.rotation}deg)`, transformOrigin: 'bottom left' }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => db.walls.update(wall.id, { rotation: (wall.rotation - 45) % 360 })}
                  className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                  title="Rotate Left"
                >
                  <RotateCcw size={18} />
                </button>
                <button 
                  onClick={() => db.walls.update(wall.id, { rotation: (wall.rotation + 45) % 360 })}
                  className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                  title="Rotate Right"
                >
                  <RotateCw size={18} />
                </button>
                <div className="w-px h-5 bg-slate-700 mx-1" />
                <button 
                  onClick={() => db.walls.delete(wall.id)}
                  className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                  title="Delete Wall"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )})}

        {/* Render Rooms */}
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            drag={isBuilderMode}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd('room', room.id, info, room.x, room.y)}
            className={`absolute rounded-xl border-2 flex flex-col p-3 justify-between transition-colors duration-300 cursor-${isBuilderMode ? 'grab' : 'pointer'} active:cursor-grabbing ${getStatusColor(room.status, room.acuity)} ${getStatusGlow(room.status, room.acuity)} ${selectedRoom?.id === room.id ? 'ring-2 ring-white/50 z-10' : ''}`}
            style={{
              x: room.x,
              y: room.y,
              width: room.w,
              height: room.h,
            }}
            onClick={(e) => {
              if (isBuilderMode) {
                e.stopPropagation();
                setSelectedBuilderId(room.id);
              } else {
                setSelectedRoom(room);
              }
            }}
          >
            <div className="absolute top-[-26px] left-0 pointer-events-none flex items-center gap-2">
              <span className={`font-mono text-sm font-bold tracking-wider drop-shadow-md ${
                room.status === 'occupied' && room.acuity === 'critical' ? 'text-rose-400' :
                room.status === 'occupied' ? 'text-blue-400' :
                room.status === 'cleaning' ? 'text-amber-400' :
                'text-slate-400'
              }`}>{room.id}</span>
              {room.acuity === 'critical' && <AlertTriangle size={16} className="text-rose-400 animate-pulse" />}
              {room.status === 'cleaning' && <Sparkles size={14} className="text-amber-400" />}
            </div>

            {/* Room Builder Menu */}
            {isBuilderMode && selectedBuilderId === room.id && (
              <div 
                className="absolute top-[-50px] left-0 bg-[#0B1C30] border border-emerald-500/50 p-1.5 rounded-xl flex items-center gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 cursor-default"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => addBedToRoom(room)}
                  className="flex items-center gap-1 px-3 py-1.5 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors text-xs font-bold whitespace-nowrap"
                  title="Add Bed inside this room"
                ><BedDouble size={14} /> + Bed</button>
                <div className="w-px h-5 bg-slate-700 mx-1" />
                <button 
                  onClick={() => addTagToRoom(room)}
                  className="flex items-center gap-1 px-3 py-1.5 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors text-xs font-bold whitespace-nowrap"
                  title="Add Label inside this room"
                ><Type size={14} /> + Tag</button>
                <div className="w-px h-5 bg-slate-700 mx-1" />
                <button 
                  onClick={() => db.rooms.delete(room.id)}
                  className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                  title="Delete Room"
                ><Trash2 size={16} /></button>
              </div>
            )}

            {/* Render Beds INSIDE Room */}
            {beds.filter(b => b.room === room.id).map((bed) => (
              <motion.div
                key={bed.id}
                drag={isBuilderMode}
                dragMomentum={false}
                dragConstraints={{ top: 10, left: 10, right: room.w - 60, bottom: room.h - 100 }}
                dragElastic={0}
                onDragEnd={(e, info) => handleDragEnd('bed', bed.id, info, bed.x, bed.y, room.w, room.h)}
                className={`absolute flex flex-col items-center justify-center cursor-${isBuilderMode ? 'grab' : 'pointer'} active:cursor-grabbing transition-colors rounded-lg border-2 ${
                  bed.status === 'occupied' ? 'bg-[#2563EB]/20 border-[#2563EB]/50 text-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.3)]' :
                  bed.status === 'cleaning' ? 'bg-amber-500/20 border-amber-500/50 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]' :
                  'bg-[#0B1C30]/80 border-slate-600/50 text-slate-400 hover:border-slate-500'
                } ${selectedBuilderId === bed.id ? 'ring-2 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : ''}`}
                style={{
                  x: bed.x,
                  y: bed.y,
                  width: 50,
                  height: 90,
                  rotate: bed.rotation,
                  transformOrigin: 'center center'
                }}
                onClick={(e) => {
                  if (isBuilderMode) {
                    e.stopPropagation();
                    setSelectedBuilderId(bed.id);
                  }
                }}
              >
                <BedDouble size={24} />
                <span className="text-[10px] font-bold mt-1 opacity-60 font-mono">{bed.id}</span>
                {isBuilderMode && selectedBuilderId === bed.id && (
                  <div 
                    className="absolute top-[-50px] left-1/2 -translate-x-1/2 bg-[#0B1C30] border border-emerald-500/50 p-1.5 rounded-xl flex items-center gap-1 shadow-2xl z-50 cursor-default"
                    style={{ transform: `rotate(${-bed.rotation}deg)` }}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <button 
                      onClick={() => db.beds.update(bed.id, { rotation: (bed.rotation - 45) % 360 })}
                      className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                    ><RotateCcw size={18} /></button>
                    <button 
                      onClick={() => db.beds.update(bed.id, { rotation: (bed.rotation + 45) % 360 })}
                      className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                    ><RotateCw size={18} /></button>
                    <div className="w-px h-5 bg-slate-700 mx-1" />
                    <button 
                      onClick={() => db.beds.delete(bed.id)}
                      className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                    ><Trash2 size={18} /></button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ))}

        {/* Render Floor Tags */}
        {tags.map((tag) => (
          <motion.div
            key={tag.id}
            drag={isBuilderMode}
            dragMomentum={false}
            onDragEnd={(e, info) => handleDragEnd('tag', tag.id, info, tag.x, tag.y)}
            className={`absolute px-3 py-1 rounded cursor-${isBuilderMode ? 'grab' : 'pointer'} active:cursor-grabbing ${selectedBuilderId === tag.id ? 'ring-2 ring-emerald-500 bg-slate-800/80' : ''}`}
            style={{ x: tag.x, y: tag.y }}
            onClick={(e) => {
              if (isBuilderMode) {
                e.stopPropagation();
                setSelectedBuilderId(tag.id);
              }
            }}
          >
            <span className="text-slate-400 font-mono text-sm font-bold tracking-widest uppercase">{tag.label}</span>
            {isBuilderMode && selectedBuilderId === tag.id && (
              <div 
                className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-[#0B1C30] border border-emerald-500/50 p-1 rounded-xl shadow-2xl z-50"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => db.floorTags.delete(tag.id)}
                  className="p-2 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                ><Trash2 size={16} /></button>
              </div>
            )}
          </motion.div>
        ))}

      </div>
    </div>
    
    {/* Zoom Controls UI */}
    <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-1 bg-[#0B1C30]/90 border border-slate-700/80 p-1.5 rounded-xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Zoom In"><ZoomIn size={20} /></button>
      <button onClick={() => setZoom(1)} className="p-2 hover:bg-slate-700 rounded-lg text-emerald-400 font-mono text-[10px] font-bold transition-colors" title="Reset Zoom">{Math.round(zoom * 100)}%</button>
      <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Zoom Out"><ZoomOut size={20} /></button>
    </div>
    </>
  );

  return (
    <>
      {/* NORMAL VIEW - INSIDE MAIN DASHBOARD */}
      {!isBuilderMode && (
        <div className="flex h-full w-full bg-[#050811] text-slate-200 overflow-hidden font-sans">
          <div className="flex-1 p-6 flex flex-col h-full overflow-hidden relative">
            <div className="flex items-center justify-between mb-8 z-10 relative">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${isCodeBlue ? 'bg-rose-500/20 text-rose-500 shadow-rose-500/20' : 'bg-[#2563EB]/20 text-[#2563EB] shadow-[#2563EB]/20'}`}>
                    <Activity size={24} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
                    <div className="flex items-center gap-2 mt-1">
                      {isBuilderMode ? (
                        <input 
                          type="text" 
                          value={floorName}
                          onChange={(e) => setFloorName(e.target.value)}
                          className="bg-black/40 border border-slate-700 rounded-md px-2 py-0.5 text-sm font-bold text-[#2563EB] outline-none focus:border-[#2563EB] transition-colors w-32"
                          placeholder="e.g. Level 1"
                        />
                      ) : (
                        <p className="text-sm font-bold text-[#2563EB]">{floorName}</p>
                      )}
                      <p className="text-slate-400 text-sm">| RTS Live Topographical Map</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-[#0B1C30]/80 p-2 rounded-2xl border border-slate-700/50 backdrop-blur-md">
                  <button 
                    onClick={() => setShowAdminLogin(true)}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border bg-black/40 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10"
                  >
                    <Lock size={18} /> Edit Floor Plan
                  </button>

                  <button 
                    onClick={toggleCodeBlue}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border ${
                      isCodeBlue 
                        ? 'bg-rose-950/80 text-rose-300 border-rose-500/50 shadow-[0_0_16px_rgba(225,29,72,0.6)] animate-pulse hover:bg-rose-900/90'
                        : 'bg-black/40 text-rose-500 border-rose-500/30 hover:bg-rose-950/50 hover:text-rose-400 hover:border-rose-500/50'
                    }`}
                  >
                    <Siren size={18} />
                    {isCodeBlue ? 'Stand Down' : 'Code Blue'}
                  </button>
                </div>
              </div>

            <div className="flex-1 bg-[#0B1C30]/50 backdrop-blur-md rounded-2xl border border-slate-800/80 overflow-hidden relative shadow-2xl">
              {appState === 'loading' ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <Loader2 size={32} className="text-[#2563EB] animate-spin" />
                  <p className="text-slate-400 text-sm font-mono animate-pulse">INITIALIZING WEBGL CANVAS...</p>
                </div>
              ) : (
                <MainCanvas />
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
              className="w-[400px] border-l border-slate-800/80 bg-[#0B1C30]/90 backdrop-blur-2xl h-full flex flex-col shrink-0 relative z-20"
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
                      <button className="px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/50 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 mx-auto shadow-lg">
                         <Compass size={18} className="text-[#2563EB]" />
                         Center Map
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
                          <p className="font-medium text-white truncate">{selectedRoom.patientName ?? "No active patient"}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Assigned Staff</label>
                        <div className="p-4 bg-black/20 rounded-xl border border-slate-800">
                          <p className="font-medium text-white truncate">{selectedRoom.assignedNurse ?? "No nurse on duty"}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-slate-800/80">
                        <label className="text-xs font-semibold text-[#2563EB] uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 size={14} /> Clearance Validation
                        </label>
                        <div className="space-y-2">
                          {[
                            { id: 'nurseCleared', label: 'Nurse Final Clearance' },
                            { id: 'evsSanitized', label: 'EVS Bio-Sanitization' },
                            { id: 'bedReady', label: 'Bed Telemetry Ready' },
                          ].map((item) => (
                            <label key={item.id} className="flex items-center space-x-3 p-3 bg-black/20 hover:bg-black/40 border border-slate-800 rounded-xl cursor-pointer transition-colors group">
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                checklist[item.id as keyof typeof checklist] 
                                  ? 'bg-emerald-500 border-emerald-500 text-[#050811]' 
                                  : 'bg-transparent border-slate-600'
                              }`}>
                                {checklist[item.id as keyof typeof checklist] && <CheckCircle2 size={14} />}
                              </div>
                              <span className={`text-sm font-medium ${checklist[item.id as keyof typeof checklist] ? 'text-white' : 'text-slate-400'}`}>
                                {item.label}
                              </span>
                              <input 
                                type="checkbox" className="hidden" 
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
                        className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                          isChecklistComplete 
                            ? 'bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                            : 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-slate-700/50'
                        }`}
                      >
                        {isChecklistComplete ? <><Sparkles size={18} /> Clear Room</> : 'Complete Validation First'}
                      </button>
                    </div>
                 </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* FULL SCREEN BUILDER MODE OVERLAY */}
      <AnimatePresence>
        {isBuilderMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050811] overflow-hidden"
          >
            {/* FLOATING BUILDER TOOLBAR */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B1C30]/90 backdrop-blur-xl border border-emerald-500/50 p-3 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.2)] flex items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold border-r border-slate-700 pr-6">
                <Settings size={20} className="animate-[spin_4s_linear_infinite]" />
                BUILDER MODE
              </div>
              <div className="flex gap-2">
                <button onClick={addRoom} className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors">
                  <Square size={16} /> Room
                </button>
                <button onClick={addWall} className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors">
                  <Minus size={16} /> Wall
                </button>
                <div className="w-px h-8 bg-slate-700 mx-2" />
                <button 
                  onClick={() => setIsBuilderMode(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 rounded-lg text-sm text-white font-bold transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  <Save size={16} /> Save & Exit
                </button>
              </div>
            </div>

            {/* MANUAL OVERLAY TRACING BACKUP UI (Mock) */}
            <div className="absolute bottom-6 left-6 z-50 bg-[#0B1C30]/90 border border-slate-700 p-4 rounded-xl shadow-xl flex items-center gap-4">
              <div className="bg-slate-800 p-2 rounded-lg">
                <Layers size={20} className="text-[#2563EB]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Tracing Overlay</h4>
                <p className="text-xs text-slate-400">Upload blueprint image</p>
              </div>
              <button className="ml-4 px-3 py-1.5 bg-[#2563EB]/20 text-[#2563EB] hover:bg-[#2563EB]/30 rounded-lg text-xs font-bold transition-colors border border-[#2563EB]/30">
                Upload
              </button>
            </div>

            <MainCanvas />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN LOGIN MODAL */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0B1C30] border border-slate-700 p-8 rounded-2xl shadow-2xl max-w-sm w-full"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50">
                  <KeyRound size={32} className="text-emerald-500" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white text-center mb-2">Admin Authorization</h2>
              <p className="text-sm text-slate-400 text-center mb-6">Enter password to unlock Full-Screen Floor Plan Builder.</p>
              
              <input 
                type="password" value={adminPassword}
                onChange={(e) => { setAdminPassword(e.target.value); setAdminError(false); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (adminPassword === 'admin') {
                      setIsBuilderMode(true);
                      setShowAdminLogin(false);
                      setAdminPassword('');
                    } else setAdminError(true);
                  }
                }}
                className={`w-full bg-black/40 border ${adminError ? 'border-rose-500 text-rose-500' : 'border-slate-700 focus:border-emerald-500 text-white'} rounded-xl px-4 py-3 outline-none mb-4`}
                placeholder="Enter Password... (Hint: admin)" autoFocus
              />
              
              <div className="flex gap-3">
                <button onClick={() => { setShowAdminLogin(false); setAdminPassword(''); setAdminError(false); }} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors">
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (adminPassword === 'admin') {
                      setIsBuilderMode(true);
                      setShowAdminLogin(false);
                      setAdminPassword('');
                    } else setAdminError(true);
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
    </>
  );
});
