import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Download, 
  ZoomIn,
  ZoomOut,
  Maximize2,
  Hand,
  MousePointer,
  Grid,
  RotateCw,
  BedDouble,
  Flame,
  DoorOpen,
  Stethoscope,
  Building,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Undo2,
  Redo2,
  Layers,
  Camera,
  Upload,
  Sparkles,
  Eye,
  EyeOff,
  X,
  ScanLine,
  Minimize2,
  PanelRightClose,
  PanelRightOpen
} from 'lucide-react';
import { db, type RoomData, DEFAULT_HOSPITAL_FLOORS } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';
import { getFloorBlueprint } from '../utils/floorBlueprints';

interface Props {
  rooms: RoomData[];
  floorLevel?: number;
  onSelectFloor?: (floorNum: number) => void;
  onExitBuilder: () => void;
}

export type CADItemType = 'floor' | 'room' | 'bed' | 'tag' | 'door' | 'wall';

export interface CADFloorBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CADBedItem {
  id: string;
  label: string;
  relX: number;
  relY: number;
  rotation: 0 | 90 | 180 | 270;
  status: 'occupied' | 'empty' | 'cleaning';
  acuity: 'critical' | 'stable' | 'none';
  patientName?: string;
}

export interface CADDoorItem {
  id: string;
  relX: number;
  relY: number;
  rotation: 0 | 90 | 180 | 270;
  width: number;
}

export interface CADWallItem {
  id: string;
  relX: number;
  relY: number;
  length: number;
  rotation: 0 | 90;
  thickness: number;
}

export interface CADRoomHierarchy {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  department: string;
  status: 'occupied' | 'empty' | 'cleaning' | 'maintenance';
  acuity: 'critical' | 'stable' | 'none';
  beds: CADBedItem[];
  doors: CADDoorItem[];
  walls: CADWallItem[];
}

export interface CADFloorTag {
  id: string;
  text: string;
  iconType: 'fire-exit' | 'emergency-stair' | 'nurse-station' | 'restroom' | 'pharmacy' | 'elevator' | 'helipad' | 'text';
  x: number;
  y: number;
  color: string;
}

export interface CADFloorSnapshot {
  floorBounds: CADFloorBounds;
  rooms: CADRoomHierarchy[];
  tags: CADFloorTag[];
  corridorWalls: CADWallItem[];
}

export const LEVEL_4_ROOMS: CADRoomHierarchy[] = [
  {
    id: 'R-401-ICU',
    name: 'ICU Resuscitation Suite 401',
    x: 40,
    y: 40,
    w: 380,
    h: 280,
    department: 'ICU',
    status: 'occupied',
    acuity: 'critical',
    beds: [
      {
        id: 'B-401-1',
        label: 'ICU Bed 1',
        relX: 200,
        relY: 20,
        rotation: 0,
        status: 'occupied',
        acuity: 'critical',
        patientName: 'Marcus Thorne'
      }
    ],
    doors: [
      { id: 'D-401-1', relX: 380, relY: 200, rotation: 90, width: 36 }
    ],
    walls: []
  },
  {
    id: 'R-402-STEP',
    name: '3-Bed Stepdown Ward 402',
    x: 40,
    y: 360,
    w: 380,
    h: 300,
    department: 'Med-Surg',
    status: 'occupied',
    acuity: 'stable',
    beds: [
      {
        id: 'B-402-1',
        label: 'Bed 402-A',
        relX: 20,
        relY: 20,
        rotation: 270,
        status: 'occupied',
        acuity: 'stable',
        patientName: 'Elena Rostova'
      },
      {
        id: 'B-402-2',
        label: 'Bed 402-B',
        relX: 20,
        relY: 110,
        rotation: 270,
        status: 'occupied',
        acuity: 'stable',
        patientName: 'Sarah Jenkins'
      },
      {
        id: 'B-402-3',
        label: 'Bed 402-C',
        relX: 20,
        relY: 200,
        rotation: 270,
        status: 'empty',
        acuity: 'none'
      }
    ],
    doors: [
      { id: 'D-402-1', relX: 380, relY: 100, rotation: 90, width: 36 }
    ],
    walls: []
  },
  {
    id: 'R-403-ACUTE',
    name: '4-Bed Acute Inpatient 403',
    x: 520,
    y: 40,
    w: 400,
    h: 280,
    department: 'Med-Surg',
    status: 'occupied',
    acuity: 'stable',
    beds: [
      {
        id: 'B-403-1',
        label: 'Bed 403-A',
        relX: 60,
        relY: 20,
        rotation: 0,
        status: 'occupied',
        acuity: 'stable',
        patientName: 'Robert Vance'
      },
      {
        id: 'B-403-2',
        label: 'Bed 403-B',
        relX: 200,
        relY: 20,
        rotation: 0,
        status: 'occupied',
        acuity: 'stable',
        patientName: 'Maria Santos'
      },
      {
        id: 'B-403-3',
        label: 'Bed 403-C',
        relX: 340,
        relY: 80,
        rotation: 90,
        status: 'empty',
        acuity: 'none'
      },
      {
        id: 'B-403-4',
        label: 'Bed 403-D',
        relX: 340,
        relY: 180,
        rotation: 90,
        status: 'occupied',
        acuity: 'critical',
        patientName: 'Arthur Dent'
      }
    ],
    doors: [
      { id: 'D-403-1', relX: 0, relY: 180, rotation: 270, width: 36 }
    ],
    walls: []
  },
  {
    id: 'R-404-SINGLE',
    name: 'Single Isolation Care 404',
    x: 520,
    y: 360,
    w: 400,
    h: 300,
    department: 'Isolation',
    status: 'occupied',
    acuity: 'stable',
    beds: [
      {
        id: 'B-404-1',
        label: 'Bed 404',
        relX: 180,
        relY: 220,
        rotation: 180,
        status: 'occupied',
        acuity: 'stable',
        patientName: 'David Kim'
      }
    ],
    doors: [
      { id: 'D-404-1', relX: 0, relY: 80, rotation: 270, width: 36 }
    ],
    walls: []
  }
];

export const LEVEL_4_TAGS: CADFloorTag[] = [
  { id: 'TAG-1', text: 'WEST STAIRS 🚪', iconType: 'emergency-stair', x: 40, y: 325, color: '#16A34A' },
  { id: 'TAG-2', text: 'EAST STAIRS 🚪', iconType: 'emergency-stair', x: 840, y: 325, color: '#16A34A' },
  { id: 'TAG-3', text: 'FIRE EXIT 🚨', iconType: 'fire-exit', x: 40, y: 15, color: '#DC2626' },
  { id: 'TAG-4', text: 'FIRE EXIT 🚨', iconType: 'fire-exit', x: 840, y: 15, color: '#DC2626' },
  { id: 'TAG-5', text: 'CENTRAL TELEMETRY DESK 🩺', iconType: 'nurse-station', x: 480, y: 325, color: '#0284C7' }
];

export function blueprintToCadHierarchy(blueprint: import('../utils/floorBlueprints').FloorBlueprintConfig): {
  rooms: CADRoomHierarchy[];
  tags: CADFloorTag[];
} {
  const rooms: CADRoomHierarchy[] = blueprint.rooms.map(dr => {
    const roomBeds = blueprint.beds.filter(dbBed => dbBed.room === dr.id);
    const mappedBeds: CADBedItem[] = roomBeds.map((rb, idx) => ({
      id: rb.id,
      label: rb.id,
      relX: rb.x !== undefined ? Math.max(10, rb.x - dr.x) : Math.min(dr.w - 50, 20 + idx * 80),
      relY: rb.y !== undefined ? Math.max(10, rb.y - dr.y) : 60,
      rotation: (rb.rotation as any) ?? 0,
      status: rb.status || 'empty',
      acuity: rb.acuity || 'none',
      patientName: rb.patientName
    }));

    return {
      id: dr.id,
      name: dr.name,
      x: dr.x,
      y: dr.y,
      w: dr.w,
      h: dr.h,
      department: dr.department || 'Med-Surg',
      status: dr.status || 'occupied',
      acuity: dr.acuity || 'stable',
      beds: mappedBeds,
      doors: [
        { id: `DOOR-${dr.id}`, relX: dr.x < 450 ? dr.w : 0, relY: dr.h - 50, rotation: dr.x < 450 ? 90 : 270, width: 36 }
      ],
      walls: []
    };
  });

  const tags: CADFloorTag[] = blueprint.tags.map(dt => ({
    id: dt.id,
    text: dt.text,
    iconType: dt.iconType || 'fire-exit',
    x: dt.x,
    y: dt.y,
    color: dt.color || '#DC2626'
  }));

  return { rooms, tags };
}

export const ConceptBCADBuilder: React.FC<Props> = ({
  rooms: _rooms,
  floorLevel = 1,
  onSelectFloor,
  onExitBuilder
}) => {
  const { showToast } = useToast();

  // Active Floor Level (Synchronized with CommandCenter)
  const [activeFloorLevel, setActiveFloorLevel] = useState<number>(floorLevel || 1);

  useEffect(() => {
    if (floorLevel && floorLevel !== activeFloorLevel) {
      setActiveFloorLevel(floorLevel);
    }
  }, [floorLevel]);

  // Root CAD Data Model (Synchronous dynamic initialization for activeFloorLevel)
  const initialCadData = blueprintToCadHierarchy(getFloorBlueprint(floorLevel || 1));
  const [floorBounds, setFloorBounds] = useState<CADFloorBounds>({ x: 30, y: 20, w: 940, h: 660 });
  const [roomList, setRoomList] = useState<CADRoomHierarchy[]>(initialCadData.rooms);
  const [tagList, setTagList] = useState<CADFloorTag[]>(initialCadData.tags);
  const [corridorWalls, setCorridorWalls] = useState<CADWallItem[]>([]);

  // Automatically load existing floor entities from Dexie database or authentic blueprint
  useEffect(() => {
    let isMounted = true;
    const loadFloorEntities = async () => {
      try {
        let dbRooms = await db.rooms.where('floorNumber').equals(activeFloorLevel).toArray();
        let dbBeds = await db.beds.where('floorNumber').equals(activeFloorLevel).toArray();
        let dbTags = await db.floorTags.where('floorNumber').equals(activeFloorLevel).toArray();

        // If no rooms in DB for this floor, seed from authentic blueprint
        if (!dbRooms || dbRooms.length === 0) {
          const bp = getFloorBlueprint(activeFloorLevel);
          await db.rooms.bulkPut(bp.rooms);
          await db.beds.bulkPut(bp.beds);
          await db.floorTags.bulkPut(bp.tags);
          dbRooms = bp.rooms;
          dbBeds = bp.beds;
          dbTags = bp.tags;
        }

        if (isMounted && dbRooms && dbRooms.length > 0) {
          const loadedRooms: CADRoomHierarchy[] = dbRooms.map(dr => {
            const roomBeds = dbBeds.filter(dbBed => dbBed.room === dr.id);
            const mappedBeds: CADBedItem[] = roomBeds.map((rb, idx) => ({
              id: rb.id,
              label: rb.id,
              relX: rb.x !== undefined ? Math.max(10, rb.x - dr.x) : Math.min(dr.w - 50, 20 + idx * 80),
              relY: rb.y !== undefined ? Math.max(10, rb.y - dr.y) : 60,
              rotation: (rb.rotation as any) ?? 0,
              status: rb.status || 'empty',
              acuity: rb.acuity || 'none',
              patientName: rb.patientName
            }));

            return {
              id: dr.id,
              name: dr.name,
              x: dr.x,
              y: dr.y,
              w: dr.w,
              h: dr.h,
              department: dr.department || 'Med-Surg',
              status: dr.status || 'occupied',
              acuity: dr.acuity || 'stable',
              beds: mappedBeds,
              doors: [
                { id: `DOOR-${dr.id}`, relX: dr.x < 450 ? dr.w : 0, relY: dr.h - 50, rotation: dr.x < 450 ? 90 : 270, width: 36 }
              ],
              walls: []
            };
          });

          const mappedTags: CADFloorTag[] = (dbTags && dbTags.length > 0 ? dbTags : getFloorBlueprint(activeFloorLevel).tags).map(dt => ({
            id: dt.id,
            text: dt.text,
            iconType: dt.iconType || 'fire-exit',
            x: dt.x,
            y: dt.y,
            color: dt.color || '#DC2626'
          }));

          setRoomList(loadedRooms);
          setTagList(mappedTags);
          setSelectedRoomId(null);
          setSelectedSubId(null);
          setSelectedItemType(null);
          pushHistory({ x: 30, y: 20, w: 940, h: 660 }, loadedRooms, mappedTags, []);
        }
      } catch (err) {
        console.error('Error loading CAD floor layout from DB:', err);
      }
    };

    loadFloorEntities();
    return () => { isMounted = false; };
  }, [activeFloorLevel]);

  // Camera / Scanner Underlay State
  const [showScannerModal, setShowScannerModal] = useState<boolean>(false);
  const [underlayImage, setUnderlayImage] = useState<string | null>(null);
  const [underlayOpacity, setUnderlayOpacity] = useState<number>(0.35);
  const [showUnderlay, setShowUnderlay] = useState<boolean>(false);
  const [isAiScanning, setIsAiScanning] = useState<boolean>(false);

  // Canvas Maximization States
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);

  // Undo / Redo History Stack
  const [history, setHistory] = useState<CADFloorSnapshot[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Helper: Push Snapshot to History
  const pushHistory = useCallback((
    newBounds: CADFloorBounds,
    newRooms: CADRoomHierarchy[],
    newTags: CADFloorTag[],
    newWalls: CADWallItem[]
  ) => {
    const snapshot: CADFloorSnapshot = {
      floorBounds: { ...newBounds },
      rooms: JSON.parse(JSON.stringify(newRooms)),
      tags: JSON.parse(JSON.stringify(newTags)),
      corridorWalls: JSON.parse(JSON.stringify(newWalls))
    };

    setHistory(prev => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      return [...upToCurrent, snapshot];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Initial snapshot
  useEffect(() => {
    if (history.length === 0) {
      pushHistory(floorBounds, roomList, tagList, corridorWalls);
    }
  }, []);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      const snap = history[prevIdx];
      setFloorBounds(snap.floorBounds);
      setRoomList(snap.rooms);
      setTagList(snap.tags);
      setCorridorWalls(snap.corridorWalls);
      setHistoryIndex(prevIdx);
      clinicalAudio.playDrawerSwoosh();
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      const snap = history[nextIdx];
      setFloorBounds(snap.floorBounds);
      setRoomList(snap.rooms);
      setTagList(snap.tags);
      setCorridorWalls(snap.corridorWalls);
      setHistoryIndex(nextIdx);
      clinicalAudio.playDrawerSwoosh();
    }
  };

  // Active Tool & Selection State
  const [activeTool, setActiveTool] = useState<'select' | 'pan' | 'delete'>('select');
  const [selectedItemType, setSelectedItemType] = useState<CADItemType | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  // Dropdown Menus
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showFloorDropdown, setShowFloorDropdown] = useState(false);

  // Dragging States
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Resizing State
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<'SE' | 'N' | 'S' | 'E' | 'W' | 'NW' | 'NE' | 'SW' | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0, mouseX: 0, mouseY: 0 });

  // Canvas Pan & Zoom State
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // Grid Controls
  const [gridSnap, setGridSnap] = useState(true);
  const [showGridLines, setShowGridLines] = useState(true);

  const GRID_SIZE = 20;
  const snap = (val: number) => gridSnap ? Math.round(val / GRID_SIZE) * GRID_SIZE : val;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Screen -> SVG Transformed Model Space
  const getModelCoordinates = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };

    const rect = svg.getBoundingClientRect();
    const rawSvgX = ((clientX - rect.left) / rect.width) * 1000;
    const rawSvgY = ((clientY - rect.top) / rect.height) * 700;

    const modelX = (rawSvgX - pan.x) / zoom;
    const modelY = (rawSvgY - pan.y) / zoom;

    return { x: modelX, y: modelY };
  }, [pan.x, pan.y, zoom]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement;
      if (isInput) return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.code === 'Space' && !isSpacePressed) {
        e.preventDefault();
        setIsSpacePressed(true);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRotateSelected();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDeleteSelected();
      } else if (e.key === '+' || e.key === '=') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setZoom(prev => Math.min(3.0, Number((prev + 0.2).toFixed(2))));
        }
      } else if (e.key === '-') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          setZoom(prev => Math.max(0.4, Number((prev - 0.2).toFixed(2))));
        }
      } else if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setZoom(1.0);
        setPan({ x: 0, y: 0 });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        setIsPanning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isSpacePressed, selectedRoomId, selectedSubId, selectedItemType, historyIndex, history]);

  // Rotate Selected Bed, Door, or Wall
  const handleRotateSelected = () => {
    if (selectedItemType === 'bed' && selectedRoomId && selectedSubId) {
      const nextRooms = roomList.map(r => {
        if (r.id === selectedRoomId) {
          const nextBeds = r.beds.map(b => {
            if (b.id === selectedSubId) {
              const nextRot = ((b.rotation + 90) % 360) as CADBedItem['rotation'];
              return { ...b, rotation: nextRot };
            }
            return b;
          });
          return { ...r, beds: nextBeds };
        }
        return r;
      });
      setRoomList(nextRooms);
      pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
      clinicalAudio.playDrawerSwoosh();
    } else if (selectedItemType === 'door' && selectedRoomId && selectedSubId) {
      const nextRooms = roomList.map(r => {
        if (r.id === selectedRoomId) {
          const nextDoors = r.doors.map(d => {
            if (d.id === selectedSubId) {
              const nextRot = ((d.rotation + 90) % 360) as CADDoorItem['rotation'];
              return { ...d, rotation: nextRot };
            }
            return d;
          });
          return { ...r, doors: nextDoors };
        }
        return r;
      });
      setRoomList(nextRooms);
      pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
      clinicalAudio.playDrawerSwoosh();
    }
  };

  // Delete Selected Entity
  const handleDeleteSelected = () => {
    if (selectedItemType === 'room' && selectedRoomId) {
      const nextRooms = roomList.filter(r => r.id !== selectedRoomId);
      setRoomList(nextRooms);
      setSelectedRoomId(null);
      setSelectedItemType(null);
      pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
      clinicalAudio.playDrawerSwoosh();
    } else if (selectedItemType === 'bed' && selectedRoomId && selectedSubId) {
      const nextRooms = roomList.map(r => {
        if (r.id === selectedRoomId) {
          return { ...r, beds: r.beds.filter(b => b.id !== selectedSubId) };
        }
        return r;
      });
      setRoomList(nextRooms);
      setSelectedSubId(null);
      setSelectedItemType(null);
      pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
      clinicalAudio.playDrawerSwoosh();
    } else if (selectedItemType === 'tag' && selectedSubId) {
      const nextTags = tagList.filter(t => t.id !== selectedSubId);
      setTagList(nextTags);
      setSelectedSubId(null);
      setSelectedItemType(null);
      pushHistory(floorBounds, roomList, nextTags, corridorWalls);
      clinicalAudio.playDrawerSwoosh();
    }
  };

  // Direct 1-Click Spawning Methods (Clean, Zero Rogue Walls)
  const handleDirectAddRoom = () => {
    const timestamp = Date.now().toString().slice(-4);
    const newRoom: CADRoomHierarchy = {
      id: `R-NEW-${timestamp}`,
      name: `Clinical Suite ${timestamp}`,
      x: snap(floorBounds.x + 80),
      y: snap(floorBounds.y + 80),
      w: 320,
      h: 240,
      department: 'Med-Surg',
      status: 'occupied',
      acuity: 'stable',
      beds: [
        {
          id: `B-${timestamp}-1`,
          label: `Bed ${timestamp.slice(-2)}`,
          relX: 140,
          relY: 20,
          rotation: 0,
          status: 'occupied',
          acuity: 'stable',
          patientName: 'Admitted Patient'
        }
      ],
      doors: [
        { id: `DOOR-${timestamp}`, relX: 0, relY: 100, rotation: 270, width: 36 }
      ],
      walls: [] // Clean, no unexpected rogue walls
    };

    const nextRooms = [...roomList, newRoom];
    setRoomList(nextRooms);
    setSelectedRoomId(newRoom.id);
    setSelectedItemType('room');
    setShowAddDropdown(false);
    pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
    clinicalAudio.playSuccessChime();
  };

  const handleDirectAddBed = () => {
    const targetRoom = selectedRoomId ? roomList.find(r => r.id === selectedRoomId) : roomList[0];
    if (!targetRoom) return;

    const timestamp = Date.now().toString().slice(-4);
    const newBed: CADBedItem = {
      id: `B-NEW-${timestamp}`,
      label: `Bed ${timestamp.slice(-2)}`,
      relX: Math.min(targetRoom.w - 40, Math.max(15, 20 + (targetRoom.beds.length * 60) % (targetRoom.w - 50))),
      relY: 20,
      rotation: 0,
      status: 'empty',
      acuity: 'none'
    };

    const nextRooms = roomList.map(r => {
      if (r.id === targetRoom.id) {
        return { ...r, beds: [...r.beds, newBed] };
      }
      return r;
    });

    setRoomList(nextRooms);
    setSelectedRoomId(targetRoom.id);
    setSelectedSubId(newBed.id);
    setSelectedItemType('bed');
    setShowAddDropdown(false);
    pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
    clinicalAudio.playSuccessChime();
  };

  const handleDirectAddDoor = () => {
    const targetRoom = selectedRoomId ? roomList.find(r => r.id === selectedRoomId) : roomList[0];
    if (!targetRoom) return;

    const timestamp = Date.now().toString().slice(-4);
    const newDoor: CADDoorItem = {
      id: `DOOR-NEW-${timestamp}`,
      relX: targetRoom.w,
      relY: 80,
      rotation: 90,
      width: 36
    };

    const nextRooms = roomList.map(r => {
      if (r.id === targetRoom.id) {
        return { ...r, doors: [...r.doors, newDoor] };
      }
      return r;
    });

    setRoomList(nextRooms);
    setSelectedRoomId(targetRoom.id);
    setSelectedSubId(newDoor.id);
    setSelectedItemType('door');
    setShowAddDropdown(false);
    pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
    clinicalAudio.playSuccessChime();
  };

  const handleDirectAddTag = (iconType: CADFloorTag['iconType'], text: string, color: string) => {
    const timestamp = Date.now().toString().slice(-4);
    const newTag: CADFloorTag = {
      id: `TAG-NEW-${timestamp}`,
      text: text,
      iconType: iconType,
      x: snap(floorBounds.x + floorBounds.w / 2 - 40),
      y: snap(floorBounds.y + 40),
      color: color
    };

    const nextTags = [...tagList, newTag];
    setTagList(nextTags);
    setSelectedSubId(newTag.id);
    setSelectedItemType('tag');
    setShowAddDropdown(false);
    pushHistory(floorBounds, roomList, nextTags, corridorWalls);
    clinicalAudio.playSuccessChime();
  };

  // Floor Plan Image Upload / Camera Handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setUnderlayImage(dataUrl);
        setShowUnderlay(true);
        setShowScannerModal(false);
        clinicalAudio.playSuccessChime();
        showToast('Hospital Floor Plan Scanned & Mounted as Blueprint Underlay!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // AI Auto-Vectorization from Hospital Emergency Map
  const handleAiAutoVectorize = () => {
    setIsAiScanning(true);
    clinicalAudio.playDrawerSwoosh();

    setTimeout(() => {
      setIsAiScanning(false);
      setShowScannerModal(false);
      setShowUnderlay(true);

      const bp = getFloorBlueprint(activeFloorLevel);
      const { rooms: autoRooms, tags: autoTags } = blueprintToCadHierarchy(bp);
      setFloorBounds({ x: 30, y: 20, w: 940, h: 660 });
      setRoomList(autoRooms);
      setTagList(autoTags);
      setCorridorWalls([]);
      pushHistory({ x: 30, y: 20, w: 940, h: 660 }, autoRooms, autoTags, []);
      clinicalAudio.playSuccessChime();
      showToast(`AI Blueprint Vision extracted Level ${activeFloorLevel} Architectural Blueprint!`, 'success');
    }, 1200);
  };

  // Pointer Down on Floor Perimeter
  const handleFloorPointerDown = (e: React.PointerEvent, handleType?: typeof resizeHandle) => {
    e.stopPropagation();
    setSelectedRoomId(null);
    setSelectedSubId(null);
    setSelectedItemType('floor');

    const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);

    if (handleType) {
      setIsResizing(true);
      setResizeHandle(handleType);
      setResizeStart({
        x: floorBounds.x,
        y: floorBounds.y,
        w: floorBounds.w,
        h: floorBounds.h,
        mouseX: modelX,
        mouseY: modelY
      });
    } else {
      // Drag entire floor along with ALL rooms, beds, and stairs
      setIsDragging(true);
      setDragOffset({
        x: modelX - floorBounds.x,
        y: modelY - floorBounds.y
      });
    }
  };

  // Pointer Down on Room Container (Strict Parent)
  const handleRoomPointerDown = (e: React.PointerEvent, room: CADRoomHierarchy) => {
    e.stopPropagation();

    if (activeTool === 'delete') {
      const nextRooms = roomList.filter(r => r.id !== room.id);
      setRoomList(nextRooms);
      pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
      clinicalAudio.playDrawerSwoosh();
      return;
    }

    if (activeTool === 'pan' || isSpacePressed || e.button === 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    setSelectedRoomId(room.id);
    setSelectedSubId(null);
    setSelectedItemType('room');
    setIsDragging(true);

    const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);
    setDragOffset({
      x: modelX - room.x,
      y: modelY - room.y
    });
  };

  // Pointer Down on Room Corner Resize Handle
  const handleRoomResizePointerDown = (e: React.PointerEvent, room: CADRoomHierarchy) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle('SE');
    setSelectedRoomId(room.id);
    setSelectedSubId(null);
    setSelectedItemType('room');

    const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);
    setResizeStart({
      x: room.x,
      y: room.y,
      w: room.w,
      h: room.h,
      mouseX: modelX,
      mouseY: modelY
    });
  };

  // Pointer Down on Bed (Inside Room)
  const handleBedPointerDown = (e: React.PointerEvent, room: CADRoomHierarchy, bed: CADBedItem) => {
    e.stopPropagation();

    if (activeTool === 'delete') {
      const nextRooms = roomList.map(r => r.id === room.id ? { ...r, beds: r.beds.filter(b => b.id !== bed.id) } : r);
      setRoomList(nextRooms);
      pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
      clinicalAudio.playDrawerSwoosh();
      return;
    }

    setSelectedRoomId(room.id);
    setSelectedSubId(bed.id);
    setSelectedItemType('bed');
    setIsDragging(true);

    const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);
    setDragOffset({
      x: (modelX - room.x) - bed.relX,
      y: (modelY - room.y) - bed.relY
    });
  };

  // Pointer Down on Doorway (Generous Hitbox)
  const handleDoorPointerDown = (e: React.PointerEvent, room: CADRoomHierarchy, door: CADDoorItem) => {
    e.stopPropagation();
    setSelectedRoomId(room.id);
    setSelectedSubId(door.id);
    setSelectedItemType('door');
    setIsDragging(true);

    const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);
    setDragOffset({
      x: (modelX - room.x) - door.relX,
      y: (modelY - room.y) - door.relY
    });
  };

  // Pointer Down on Tag
  const handleTagPointerDown = (e: React.PointerEvent, tag: CADFloorTag) => {
    e.stopPropagation();
    setSelectedRoomId(null);
    setSelectedSubId(tag.id);
    setSelectedItemType('tag');
    setIsDragging(true);

    const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);
    setDragOffset({
      x: modelX - tag.x,
      y: modelY - tag.y
    });
  };

  // Global Pointer Move with AUTO-CLAMPING ON RESIZE
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      return;
    }

    // 1. RESIZING LOGIC WITH STRICT INTERNAL BOUNDARY CLAMPING
    if (isResizing) {
      const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);
      const deltaX = modelX - resizeStart.mouseX;
      const deltaY = modelY - resizeStart.mouseY;

      // Resizing Floor Perimeter
      if (selectedItemType === 'floor') {
        let { x, y, w, h } = resizeStart;
        if (resizeHandle === 'E' || resizeHandle === 'SE' || resizeHandle === 'NE') {
          w = Math.max(400, snap(resizeStart.w + deltaX));
        }
        if (resizeHandle === 'S' || resizeHandle === 'SE' || resizeHandle === 'SW') {
          h = Math.max(300, snap(resizeStart.h + deltaY));
        }
        if (resizeHandle === 'W' || resizeHandle === 'SW' || resizeHandle === 'NW') {
          const newW = Math.max(400, snap(resizeStart.w - deltaX));
          x = snap(resizeStart.x + (resizeStart.w - newW));
          w = newW;
        }
        if (resizeHandle === 'N' || resizeHandle === 'NE' || resizeHandle === 'NW') {
          const newH = Math.max(300, snap(resizeStart.h - deltaY));
          y = snap(resizeStart.y + (resizeStart.h - newH));
          h = newH;
        }
        setFloorBounds({ x, y, w, h });
        return;
      }

      // Resizing Room WITH AUTO-CLAMPING BEDS AND DOORS INSIDE!
      if (selectedItemType === 'room' && selectedRoomId) {
        const newW = Math.max(160, snap(resizeStart.w + deltaX));
        const newH = Math.max(120, snap(resizeStart.h + deltaY));

        setRoomList(prev => prev.map(r => {
          if (r.id === selectedRoomId) {
            // AUTOMATICALLY CLAMP ALL BEDS SO THEY NEVER SPILL OUTSIDE WHEN SHRINKING
            const clampedBeds = r.beds.map(b => ({
              ...b,
              relX: Math.max(10, Math.min(newW - 48, b.relX)),
              relY: Math.max(10, Math.min(newH - 62, b.relY))
            }));

            // CLAMP DOORS TO WALL EDGES
            const clampedDoors = r.doors.map(d => ({
              ...d,
              relX: d.relX > newW ? newW : d.relX,
              relY: d.relY > newH ? newH : d.relY
            }));

            return { 
              ...r, 
              w: newW, 
              h: newH,
              beds: clampedBeds,
              doors: clampedDoors
            };
          }
          return r;
        }));
        return;
      }
    }

    // 2. DRAGGING LOGIC (100% Mathematically Locked)
    if (isDragging) {
      const { x: modelX, y: modelY } = getModelCoordinates(e.clientX, e.clientY);

      // Dragging Entire Floor Container (Moves ALL Rooms, Beds, & Stairs synchronously!)
      if (selectedItemType === 'floor') {
        const newX = snap(modelX - dragOffset.x);
        const newY = snap(modelY - dragOffset.y);
        const deltaX = newX - floorBounds.x;
        const deltaY = newY - floorBounds.y;

        if (deltaX !== 0 || deltaY !== 0) {
          setFloorBounds(prev => ({ ...prev, x: newX, y: newY }));
          // Move all rooms
          setRoomList(prev => prev.map(r => ({ ...r, x: r.x + deltaX, y: r.y + deltaY })));
          // Move all tags
          setTagList(prev => prev.map(t => ({ ...t, x: t.x + deltaX, y: t.y + deltaY })));
        }
        return;
      }

      // Dragging Room (Moves ALL its internal beds & doors automatically!)
      if (selectedItemType === 'room' && selectedRoomId) {
        const newX = snap(modelX - dragOffset.x);
        const newY = snap(modelY - dragOffset.y);
        setRoomList(prev => prev.map(r => r.id === selectedRoomId ? { ...r, x: newX, y: newY } : r));
        return;
      }

      // Dragging Bed (Inside Room relative coordinates - CLAMPED TO ROOM EDGES)
      if (selectedItemType === 'bed' && selectedRoomId && selectedSubId) {
        const targetRoom = roomList.find(r => r.id === selectedRoomId);
        if (!targetRoom) return;

        const newRelX = Math.max(10, Math.min(targetRoom.w - 38, snap((modelX - targetRoom.x) - dragOffset.x)));
        const newRelY = Math.max(10, Math.min(targetRoom.h - 50, snap((modelY - targetRoom.y) - dragOffset.y)));

        setRoomList(prev => prev.map(r => {
          if (r.id === selectedRoomId) {
            return {
              ...r,
              beds: r.beds.map(b => b.id === selectedSubId ? { ...b, relX: newRelX, relY: newRelY } : b)
            };
          }
          return r;
        }));
        return;
      }

      // Dragging Door (Inside Room relative coordinates)
      if (selectedItemType === 'door' && selectedRoomId && selectedSubId) {
        const targetRoom = roomList.find(r => r.id === selectedRoomId);
        if (!targetRoom) return;

        const newRelX = snap((modelX - targetRoom.x) - dragOffset.x);
        const newRelY = snap((modelY - targetRoom.y) - dragOffset.y);

        setRoomList(prev => prev.map(r => {
          if (r.id === selectedRoomId) {
            return {
              ...r,
              doors: r.doors.map(d => d.id === selectedSubId ? { ...d, relX: newRelX, relY: newRelY } : d)
            };
          }
          return r;
        }));
        return;
      }

      // Dragging Safety Tag
      if (selectedItemType === 'tag' && selectedSubId) {
        const newX = snap(modelX - dragOffset.x);
        const newY = snap(modelY - dragOffset.y);
        setTagList(prev => prev.map(t => t.id === selectedSubId ? { ...t, x: newX, y: newY } : t));
        return;
      }
    }
  };

  // Pointer Up: Finalize and Snapshot
  const handlePointerUp = () => {
    if (isDragging || isResizing) {
      pushHistory(floorBounds, roomList, tagList, corridorWalls);
    }
    setIsDragging(false);
    setIsResizing(false);
    setIsPanning(false);
    setResizeHandle(null);
  };

  const handleClearCanvas = () => {
    setFloorBounds({ x: 30, y: 20, w: 940, h: 660 });
    setRoomList([]);
    setTagList([]);
    setCorridorWalls([]);
    setSelectedRoomId(null);
    setSelectedSubId(null);
    setSelectedItemType(null);
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
    pushHistory({ x: 30, y: 20, w: 940, h: 660 }, [], [], []);
    clinicalAudio.playDrawerSwoosh();
    showToast('Cleared floor canvas to blank state', 'info');
  };

  // Reset to Current Floor Architecture
  const handleResetLayout = () => {
    const bp = getFloorBlueprint(activeFloorLevel);
    const { rooms: resetRooms, tags: resetTags } = blueprintToCadHierarchy(bp);
    setFloorBounds({ x: 30, y: 20, w: 940, h: 660 });
    setRoomList(resetRooms);
    setTagList(resetTags);
    setCorridorWalls([]);
    setSelectedRoomId(null);
    setSelectedSubId(null);
    setSelectedItemType(null);
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
    pushHistory({ x: 30, y: 20, w: 940, h: 660 }, resetRooms, resetTags, []);
    clinicalAudio.playDrawerSwoosh();
    showToast(`Reset to Level ${activeFloorLevel} Architectural Blueprint`, 'info');
  };

  // Export JSON Blueprint
  const handleExportJSON = () => {
    const blueprintData = {
      version: '4.0.0-hierarchical-cad-suite',
      timestamp: new Date().toISOString(),
      floorLevel: activeFloorLevel,
      gridSize: GRID_SIZE,
      floorBounds: floorBounds,
      metrics: {
        totalRooms: roomList.length,
        totalBeds: roomList.reduce((acc, r) => acc + r.beds.length, 0),
        grossAreaSqFt: Math.round((floorBounds.w * floorBounds.h) / 44),
      },
      rooms: roomList,
      safetyTags: tagList
    };

    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(blueprintData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', jsonStr);
    dlAnchor.setAttribute('download', `Hospital_Level${activeFloorLevel}_CAD_Blueprint_${Date.now()}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
    showToast(`Level ${activeFloorLevel} Blueprint exported as JSON.`, 'success');
  };

  // 1:1 Live Operational Map Bi-directional Database Synchronization
  const handleSaveBlueprint = async () => {
    try {
      const roomsToSave: RoomData[] = roomList.map(r => ({
        id: r.id,
        name: r.name,
        floorNumber: activeFloorLevel,
        department: (r.department || 'Med-Surg') as any,
        status: r.status || 'occupied',
        acuity: r.acuity || 'stable',
        x: r.x,
        y: r.y,
        w: r.w,
        h: r.h
      }));

      // Retrieve existing beds to merge deep patient data, vitals, and safety records!
      const existingBeds = await db.beds.where('floorNumber').equals(activeFloorLevel).toArray();
      const existingBedMap = new Map(existingBeds.map(b => [b.id, b]));

      const bedsToSave: any[] = [];
      roomList.forEach(r => {
        r.beds.forEach(b => {
          const existing = existingBedMap.get(b.id);
          bedsToSave.push({
            ...(existing || {}),
            id: b.id,
            room: r.id,
            floorNumber: activeFloorLevel,
            status: b.status || existing?.status || 'empty',
            acuity: b.acuity || existing?.acuity || 'none',
            patientName: b.patientName !== undefined ? b.patientName : existing?.patientName,
            patientSafety: existing?.patientSafety,
            equipment: existing?.equipment || ['telemetry'],
            x: r.x + b.relX,
            y: r.y + b.relY,
            rotation: b.rotation || 0
          });
        });
      });

      const tagsToSave: any[] = tagList.map(t => ({
        id: t.id,
        floorNumber: activeFloorLevel,
        x: t.x,
        y: t.y,
        text: t.text,
        color: t.color,
        iconType: t.iconType
      }));

      await db.transaction('rw', db.rooms, db.beds, db.floorTags, async () => {
        // Delete old entities for this specific floor
        const oldRooms = await db.rooms.where('floorNumber').equals(activeFloorLevel).toArray();
        const oldBeds = await db.beds.where('floorNumber').equals(activeFloorLevel).toArray();
        const oldTags = await db.floorTags.where('floorNumber').equals(activeFloorLevel).toArray();
        
        if (oldRooms.length > 0) {
          await db.rooms.bulkDelete(oldRooms.map(er => er.id));
        }
        if (oldBeds.length > 0) {
          await db.beds.bulkDelete(oldBeds.map(eb => eb.id));
        }
        if (oldTags.length > 0) {
          await db.floorTags.bulkDelete(oldTags.map(et => et.id));
        }

        if (roomsToSave.length > 0) {
          await db.rooms.bulkPut(roomsToSave);
        }
        if (bedsToSave.length > 0) {
          await db.beds.bulkPut(bedsToSave);
        }
        if (tagsToSave.length > 0) {
          await db.floorTags.bulkPut(tagsToSave);
        }
      });

      clinicalAudio.playSuccessChime();
      showToast(`Level ${activeFloorLevel} Blueprint saved! Live Hospital Map updated.`, 'success');
    } catch (err) {
      console.error('Failed to save CAD blueprint:', err);
      showToast('Error saving CAD layout to database', 'error');
    }
  };

  // Active Entities for Inspector
  const activeRoom = roomList.find(r => r.id === selectedRoomId);
  const activeBed = activeRoom?.beds.find(b => b.id === selectedSubId);
  const activeDoor = activeRoom?.doors.find(d => d.id === selectedSubId);
  const activeTag = tagList.find(t => t.id === selectedSubId);

  const totalBedsCount = roomList.reduce((acc, r) => acc + r.beds.length, 0);

  return (
    <div className={`w-full h-full flex flex-col bg-[#F4F5F7] overflow-hidden select-none font-sans ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      
      {/* HIDDEN FILE INPUT FOR SCANNER */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* CAD TOP TOOLBAR */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-2xs">
        
        {/* LEFT: TOOLS & DIRECT SPAWNING */}
        <div className="flex items-center gap-1.5 flex-wrap">
          
          {/* Floor Level Switcher with Prev/Next Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const prev = Math.max(1, activeFloorLevel - 1);
                setActiveFloorLevel(prev);
                onSelectFloor?.(prev);
                clinicalAudio.playDrawerSwoosh();
              }}
              disabled={activeFloorLevel <= 1}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed border border-slate-200 transition-colors cursor-pointer"
              title="Previous Floor (Down)"
              aria-label="Previous Floor"
            >
              <ChevronLeft size={13} />
            </button>

            <div className="relative">
              {(() => {
                const currentFloorMeta = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === activeFloorLevel) || {
                  number: activeFloorLevel,
                  name: `Level ${activeFloorLevel}: Inpatient Ward`,
                  department: 'Inpatient Department',
                  shortCode: `L${activeFloorLevel}`
                };
                return (
                  <button
                    onClick={() => setShowFloorDropdown(!showFloorDropdown)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950 text-white shadow-2xs transition-all cursor-pointer max-w-[320px]"
                  >
                    <Building size={13} className="text-blue-400 shrink-0" />
                    <span className="truncate">{currentFloorMeta.name}</span>
                    <ChevronDown size={12} className="text-slate-400 shrink-0" />
                  </button>
                );
              })()}

              {showFloorDropdown && (
                <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 text-xs max-h-80 overflow-y-auto custom-scrollbar">
                  {DEFAULT_HOSPITAL_FLOORS.map(floor => (
                    <button
                      key={floor.number}
                      onClick={() => {
                        setActiveFloorLevel(floor.number);
                        onSelectFloor?.(floor.number);
                        setShowFloorDropdown(false);
                        clinicalAudio.playDrawerSwoosh();
                      }}
                      className={`p-2 rounded-lg text-left font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        activeFloorLevel === floor.number ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <span className="block">{floor.name}</span>
                        <span className="text-[10px] text-slate-500 font-normal">{floor.department}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                        {floor.shortCode}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                const next = Math.min(18, activeFloorLevel + 1);
                setActiveFloorLevel(next);
                onSelectFloor?.(next);
                clinicalAudio.playDrawerSwoosh();
              }}
              disabled={activeFloorLevel >= 18}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 disabled:text-slate-300 disabled:cursor-not-allowed border border-slate-200 transition-colors cursor-pointer"
              title="Next Floor (Up)"
              aria-label="Next Floor"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                historyIndex > 0 ? 'text-slate-700 hover:bg-white hover:text-slate-900' : 'text-slate-300 cursor-not-allowed'
              }`}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={13} />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                historyIndex < history.length - 1 ? 'text-slate-700 hover:bg-white hover:text-slate-900' : 'text-slate-300 cursor-not-allowed'
              }`}
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={13} />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          {/* Select Tool */}
          <button
            onClick={() => setActiveTool('select')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTool === 'select' ? 'bg-slate-900 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="Select and move rooms, beds, walls, and floor"
          >
            <MousePointer size={13} /> Select
          </button>

          {/* Pan Canvas */}
          <button
            onClick={() => setActiveTool('pan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTool === 'pan' ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="Pan canvas (Hold Spacebar)"
          >
            <Hand size={13} /> Pan Canvas
          </button>

          {/* 1-CLICK DIRECT SPAWN COMPONENT MENU */}
          <div className="relative">
            <button
              onClick={() => setShowAddDropdown(!showAddDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all cursor-pointer"
            >
              <Plus size={14} /> Add Component <ChevronDown size={12} />
            </button>

            {showAddDropdown && (
              <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1 text-xs">
                
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Direct Spawn Components
                </div>

                <button
                  onClick={handleDirectAddRoom}
                  className="p-2 rounded-lg text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Building size={14} className="text-blue-600" />
                  <div>
                    <span className="block font-bold">1-Click Room Bay Container</span>
                    <span className="text-[10px] text-slate-500 font-normal">Spawns room with bed &amp; doorway</span>
                  </div>
                </button>

                <button
                  onClick={handleDirectAddBed}
                  className="p-2 rounded-lg text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <BedDouble size={14} className="text-emerald-600" />
                  <div>
                    <span className="block font-bold">1-Click Hospital Bed</span>
                    <span className="text-[10px] text-slate-500 font-normal">Spawns inside active room</span>
                  </div>
                </button>

                <button
                  onClick={handleDirectAddDoor}
                  className="p-2 rounded-lg text-left font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <DoorOpen size={14} className="text-amber-600" />
                  <div>
                    <span className="block font-bold">1-Click Doorway with Swing Arc</span>
                    <span className="text-[10px] text-slate-500 font-normal">90° egress swing clearance</span>
                  </div>
                </button>

                <button
                  onClick={() => handleDirectAddTag('fire-exit', 'FIRE EXIT 🚨', '#E11D48')}
                  className="p-2 rounded-lg text-left font-semibold text-slate-800 hover:bg-rose-50 hover:text-rose-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Flame size={14} className="text-rose-600" />
                  <div>
                    <span className="block font-bold">Fire Exit Safety Marker 🚨</span>
                    <span className="text-[10px] text-slate-500 font-normal">Emergency escape sign</span>
                  </div>
                </button>

                <button
                  onClick={() => handleDirectAddTag('emergency-stair', 'EMERGENCY STAIRS 🚪', '#16A34A')}
                  className="p-2 rounded-lg text-left font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Building size={14} className="text-emerald-600" />
                  <div>
                    <span className="block font-bold">Emergency Stairs Core 🚪</span>
                    <span className="text-[10px] text-slate-500 font-normal">Evacuation stairwell core</span>
                  </div>
                </button>

                <button
                  onClick={() => handleDirectAddTag('nurse-station', 'CENTRAL NURSE STATION 🩺', '#0284C7')}
                  className="p-2 rounded-lg text-left font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-800 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Stethoscope size={14} className="text-blue-600" />
                  <div>
                    <span className="block font-bold">Central Nurse Station 🩺</span>
                    <span className="text-[10px] text-slate-500 font-normal">Staff telemetry desk</span>
                  </div>
                </button>

              </div>
            )}
          </div>

          {/* 📸 CAMERA / AI SCAN FLOORPLAN BUTTON */}
          <button
            onClick={() => setShowScannerModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all cursor-pointer"
            title="Scan hospital evacuation escape map or blueprint photo"
          >
            <Camera size={14} className="text-indigo-200" />
            <span>Scan Map</span>
            <Sparkles size={11} className="text-amber-300 animate-pulse" />
          </button>

          {/* Toggle Underlay Visibility if loaded */}
          {underlayImage && (
            <button
              onClick={() => setShowUnderlay(!showUnderlay)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                showUnderlay ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
              title="Toggle scanned map reference underlay"
            >
              {showUnderlay ? <Eye size={13} /> : <EyeOff size={13} />}
              <span>Underlay</span>
            </button>
          )}

          {/* Delete Tool */}
          <button
            onClick={() => setActiveTool(activeTool === 'delete' ? 'select' : 'delete')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTool === 'delete' ? 'bg-rose-600 text-white shadow-2xs' : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
            title="Toggle Delete Mode"
          >
            <Trash2 size={13} /> Delete
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          {/* Snap & Grid */}
          <button
            onClick={() => setGridSnap(!gridSnap)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
              gridSnap ? 'bg-slate-100 text-slate-900 border-slate-300 font-bold' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50'
            }`}
          >
            Snap: {gridSnap ? '20px ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowGridLines(!showGridLines)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
              showGridLines ? 'bg-slate-100 text-slate-900 border-slate-300 font-bold' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50'
            }`}
          >
            <Grid size={12} /> Grid
          </button>

          {/* Zoom */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setZoom(prev => Math.max(0.4, Number((prev - 0.2).toFixed(2))))}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
            >
              <ZoomOut size={13} />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-800 px-1 min-w-[42px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(3.0, Number((prev + 0.2).toFixed(2))))}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
            >
              <ZoomIn size={13} />
            </button>
            <button
              onClick={() => { setZoom(1.0); setPan({ x: 0, y: 0 }); }}
              className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

        </div>

        {/* RIGHT: SAVE & EXPORT */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={handleClearCanvas}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer border border-slate-300"
            title="Start with a blank floor perimeter"
          >
            <Plus size={13} /> Blank Floor
          </button>

          <button
            onClick={handleResetLayout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer border border-slate-300"
          >
            <RotateCcw size={13} /> Preset Level {activeFloorLevel}
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer border border-slate-300"
          >
            <Download size={13} /> Export JSON
          </button>

          <button
            onClick={handleSaveBlueprint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Save size={13} /> Save Blueprint
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          {/* Full Screen Focus Mode Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              isFullScreen ? 'bg-indigo-50 text-indigo-700 border-indigo-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title={isFullScreen ? 'Exit Full Screen Studio' : 'Maximize Studio (Full Screen)'}
          >
            {isFullScreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isFullScreen ? 'Exit Focus' : 'Maximize'}</span>
          </button>

          {/* Toggle Inspector Drawer */}
          <button
            onClick={() => setIsInspectorOpen(!isInspectorOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              isInspectorOpen ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' : 'bg-blue-50 text-blue-700 border-blue-300'
            }`}
            title="Toggle Right Inspector Dock"
          >
            {isInspectorOpen ? <PanelRightClose size={13} /> : <PanelRightOpen size={13} />}
            <span>Inspector</span>
          </button>

          <button
            onClick={onExitBuilder}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Exit Architect Mode
          </button>

        </div>

      </div>

      {/* WORKSPACE & INSPECTOR */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        
        {/* INTERACTIVE CAD VIEWPORT */}
        <div 
          ref={containerRef}
          className={`flex-1 relative overflow-hidden bg-slate-100 flex items-center justify-center ${isPanning ? 'cursor-grabbing' : isSpacePressed || activeTool === 'pan' ? 'cursor-grab' : 'cursor-default'} select-none`}
          onWheel={(e) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? 1.12 : 0.88;
            setZoom(prev => Math.max(0.4, Math.min(3.0, Number((prev * factor).toFixed(2)))));
          }}
          onPointerDown={(e) => {
            if (activeTool === 'pan' || activeTool === 'select' || isSpacePressed || e.button === 1) {
              setIsPanning(true);
              setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
              if (activeTool === 'select' && !isSpacePressed) {
                setSelectedRoomId(null);
                setSelectedSubId(null);
                setSelectedItemType(null);
              }
            }
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1000 700"
            className="w-full h-full block font-sans select-none"
            style={{ touchAction: 'none' }}
          >
            <defs>
              {/* Snap Grid */}
              <pattern id="cadSnap20" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none" />
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* TRANSFORMED INNER GROUP FOR PAN & ZOOM */}
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              
              {/* Canvas Background */}
              <rect x="-1000" y="-700" width="3000" height="2100" fill={showGridLines ? "url(#cadSnap20)" : "#FFFFFF"} />

              {/* SCANNED HOSPITAL BLUEPRINT / EMERGENCY PLAN UNDERLAY */}
              {showUnderlay && underlayImage && (
                <image
                  href={underlayImage}
                  x={floorBounds.x}
                  y={floorBounds.y}
                  width={floorBounds.w}
                  height={floorBounds.h}
                  opacity={underlayOpacity}
                  preserveAspectRatio="none"
                />
              )}

              {/* 1. OUTER FLOOR PERIMETER WALL (Click/Drag entire building or resize handles) */}
              <g 
                onPointerDown={(e) => handleFloorPointerDown(e)}
                className="cursor-move group"
              >
                {/* Outer Hospital Boundary Wall */}
                <rect 
                  x={floorBounds.x} 
                  y={floorBounds.y} 
                  width={floorBounds.w} 
                  height={floorBounds.h} 
                  fill={showUnderlay && underlayImage ? "transparent" : "#FFFFFF"} 
                  stroke={selectedItemType === 'floor' ? "#0284C7" : "#0F172A"} 
                  strokeWidth={selectedItemType === 'floor' ? "7" : "6"} 
                  strokeDasharray={selectedItemType === 'floor' ? "8 4" : undefined}
                  rx="6"
                  className="shadow-sm"
                />

                {/* Central Corridor Floor Marker */}
                <rect
                  x={floorBounds.x + 440}
                  y={floorBounds.y + 20}
                  width="60"
                  height={floorBounds.h - 40}
                  fill="#F8FAFC"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  rx="4"
                />
                <text
                  x={floorBounds.x + 470}
                  y={floorBounds.y + 80}
                  fontSize="9"
                  fontWeight="bold"
                  fill="#94A3B8"
                  textAnchor="middle"
                  transform={`rotate(90 ${floorBounds.x + 470} ${floorBounds.y + 80})`}
                >
                  CENTRAL CORRIDOR EGRESS
                </text>

                {/* Floor Perimeter Resize Handles (8 Controls) */}
                {selectedItemType === 'floor' && (
                  <g>
                    <circle cx={floorBounds.x} cy={floorBounds.y} r="6" fill="#0284C7" stroke="#FFF" strokeWidth="2" className="cursor-nwse-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'NW')} />
                    <circle cx={floorBounds.x + floorBounds.w} cy={floorBounds.y} r="6" fill="#0284C7" stroke="#FFF" strokeWidth="2" className="cursor-nesw-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'NE')} />
                    <circle cx={floorBounds.x + floorBounds.w} cy={floorBounds.y + floorBounds.h} r="6" fill="#0284C7" stroke="#FFF" strokeWidth="2" className="cursor-nwse-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'SE')} />
                    <circle cx={floorBounds.x} cy={floorBounds.y + floorBounds.h} r="6" fill="#0284C7" stroke="#FFF" strokeWidth="2" className="cursor-nesw-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'SW')} />

                    <rect x={floorBounds.x + floorBounds.w / 2 - 8} y={floorBounds.y - 4} width="16" height="8" rx="2" fill="#0284C7" className="cursor-ns-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'N')} />
                    <rect x={floorBounds.x + floorBounds.w / 2 - 8} y={floorBounds.y + floorBounds.h - 4} width="16" height="8" rx="2" fill="#0284C7" className="cursor-ns-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'S')} />
                    <rect x={floorBounds.x + floorBounds.w - 4} y={floorBounds.y + floorBounds.h / 2 - 8} width="8" height="16" rx="2" fill="#0284C7" className="cursor-ew-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'E')} />
                    <rect x={floorBounds.x - 4} y={floorBounds.y + floorBounds.h / 2 - 8} width="8" height="16" rx="2" fill="#0284C7" className="cursor-ew-resize" onPointerDown={(e) => handleFloorPointerDown(e, 'W')} />
                  </g>
                )}
              </g>

              {/* 2. SAFETY TAGS & STAIRS ON FLOOR */}
              {tagList.map(tag => {
                const isSel = selectedItemType === 'tag' && selectedSubId === tag.id;
                return (
                  <g
                    key={tag.id}
                    onPointerDown={(e) => handleTagPointerDown(e, tag)}
                    className="cursor-move"
                  >
                    <rect
                      x={tag.x - 6}
                      y={tag.y - 12}
                      width={tag.text.length * 6.5 + 24}
                      height="22"
                      rx="5"
                      fill={isSel ? "#E0F2FE" : "#FFFFFF"}
                      stroke={isSel ? "#0284C7" : tag.color}
                      strokeWidth={isSel ? "2.5" : "1.5"}
                      className="drop-shadow-xs"
                    />
                    <circle cx={tag.x + 3} cy={tag.y - 1} r="4.5" fill={tag.color} />
                    <text
                      x={tag.x + 13}
                      y={tag.y + 3}
                      fontSize="9"
                      fontWeight="bold"
                      fill={tag.color}
                    >
                      {tag.text}
                    </text>
                  </g>
                );
              })}

              {/* 3. STRICTLY HIERARCHICAL ROOM CONTAINERS */}
              {roomList.map(room => {
                const isRoomSel = selectedItemType === 'room' && selectedRoomId === room.id;
                const isCrit = room.acuity === 'critical';
                const isVac = room.status === 'empty';

                return (
                  <g
                    key={room.id}
                    transform={`translate(${room.x}, ${room.y})`}
                    className="cursor-move"
                  >
                    {/* Room Container Background (Rendered first) */}
                    <rect
                      x="0"
                      y="0"
                      width={room.w}
                      height={room.h}
                      fill={isRoomSel ? "#E0F2FE" : showUnderlay && underlayImage ? "rgba(255,255,255,0.75)" : "#FFFFFF"}
                      stroke={isRoomSel ? "#0284C7" : "#0F172A"}
                      strokeWidth={isRoomSel ? "3" : "4"}
                      strokeDasharray={isRoomSel ? "6 3" : undefined}
                      rx="4"
                      onPointerDown={(e) => handleRoomPointerDown(e, room)}
                      className="transition-all"
                    />

                    {/* Room Badge Header */}
                    <rect
                      x="8"
                      y="8"
                      width={Math.min(room.w - 16, 85)}
                      height="18"
                      fill={isCrit ? "#FFE4E6" : isVac ? "#F1F5F9" : "#FEF3C7"}
                      stroke={isCrit ? "#FDA4AF" : isVac ? "#CBD5E1" : "#FDE68A"}
                      strokeWidth="1"
                      rx="4"
                      onPointerDown={(e) => handleRoomPointerDown(e, room)}
                    />
                    <text
                      x="14"
                      y="20"
                      fontSize="10"
                      fontWeight="bold"
                      fill={isCrit ? "#9F1239" : isVac ? "#475569" : "#92400E"}
                      onPointerDown={(e) => handleRoomPointerDown(e, room)}
                    >
                      {room.id}
                    </text>

                    {/* Room Name & Specs */}
                    <text
                      x="12"
                      y="40"
                      fontSize="11"
                      fontWeight="bold"
                      fill="#0F172A"
                      onPointerDown={(e) => handleRoomPointerDown(e, room)}
                    >
                      {room.name}
                    </text>
                    <text
                      x="12"
                      y="54"
                      fontSize="9"
                      fontWeight="600"
                      fill="#64748B"
                      onPointerDown={(e) => handleRoomPointerDown(e, room)}
                    >
                      {room.department} • {room.beds.length} {room.beds.length === 1 ? 'Bed' : 'Beds'}
                    </text>

                    {/* ROOM DOORWAYS (WITH TRUE WALL KNOCKOUT GAP & STRUCTURAL JAMBS) */}
                    {room.doors.map(door => {
                      const isDoorSel = selectedItemType === 'door' && selectedSubId === door.id;
                      const doorLeafLen = door.width;
                      return (
                        <g
                          key={door.id}
                          transform={`rotate(${door.rotation} ${door.relX} ${door.relY})`}
                          onPointerDown={(e) => handleDoorPointerDown(e, room, door)}
                          className="cursor-pointer group"
                        >
                          {/* 1. True Wall Knockout Gap: Physically breaks the 4px black room wall */}
                          <rect
                            x={door.relX}
                            y={door.relY - 4}
                            width={door.width}
                            height={8}
                            fill="#FFFFFF"
                          />

                          {/* 2. Structural Door Jamb Frame Posts [■] on both sides */}
                          <rect
                            x={door.relX - 2}
                            y={door.relY - 3}
                            width={4}
                            height={6}
                            fill={isDoorSel ? "#0284C7" : "#0F172A"}
                            rx={1}
                          />
                          <rect
                            x={door.relX + door.width - 2}
                            y={door.relY - 3}
                            width={4}
                            height={6}
                            fill={isDoorSel ? "#0284C7" : "#0F172A"}
                            rx={1}
                          />

                          {/* 3. Floor Threshold Line */}
                          <line
                            x1={door.relX}
                            y1={door.relY}
                            x2={door.relX + door.width}
                            y2={door.relY}
                            stroke="#CBD5E1"
                            strokeWidth="1.5"
                          />

                          {/* 4. Solid Angled Door Leaf Panel (Inswing at 45°) */}
                          <line
                            x1={door.relX}
                            y1={door.relY}
                            x2={door.relX + doorLeafLen * 0.7}
                            y2={door.relY + doorLeafLen * 0.7}
                            stroke={isDoorSel ? "#0284C7" : "#0F172A"}
                            strokeWidth={isDoorSel ? "3.5" : "2.5"}
                            strokeLinecap="round"
                          />

                          {/* 5. 90° Swing Clearance Arc */}
                          <path
                            d={`M ${door.relX} ${door.relY} A ${door.width} ${door.width} 0 0 1 ${door.relX + door.width} ${door.relY + door.width}`}
                            fill="none"
                            stroke={isDoorSel ? "#0284C7" : "#94A3B8"}
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />

                          {/* 6. Generous Transparent Hitbox for effortless clicking */}
                          <rect
                            x={door.relX - 8}
                            y={door.relY - 12}
                            width={door.width + 16}
                            height={door.width + 20}
                            fill="transparent"
                            pointerEvents="all"
                          />
                        </g>
                      );
                    })}

                    {/* NESTED HOSPITAL BEDS / HELIPADS / EMERGENCY GURNEYS */}
                    {room.beds.map(bed => {
                      const isBedSel = selectedItemType === 'bed' && selectedSubId === bed.id;
                      const isBedCrit = bed.acuity === 'critical';
                      const isBedVac = bed.status === 'empty';
                      const isHelipad = bed.id.startsWith('HELI') || room.department === 'Aviation' || room.name.toLowerCase().includes('helipad');
                      const isGurney = bed.id.startsWith('B-HELI') || room.department === 'STAT Core' || room.name.toLowerCase().includes('trauma chute');

                      return (
                        <g
                          key={bed.id}
                          transform={`translate(${bed.relX}, ${bed.relY}) rotate(${bed.rotation} ${isHelipad ? '45 45' : isGurney ? '16 28' : '19 26'})`}
                          onPointerDown={(e) => handleBedPointerDown(e, room, bed)}
                          className="cursor-move group"
                        >
                          {/* Selection Glow */}
                          {isBedSel && (
                            <rect
                              x="-4"
                              y="-4"
                              width={isHelipad ? '98' : isGurney ? '40' : '46'}
                              height={isHelipad ? '98' : isGurney ? '64' : '60'}
                              rx={isHelipad ? '14' : '6'}
                              fill="none"
                              stroke="#0284C7"
                              strokeWidth="2.5"
                              strokeDasharray="4 2"
                            />
                          )}

                          {isHelipad ? (
                            /* Helipad CAD Touchdown Graphic */
                            <g>
                              <rect
                                x="0"
                                y="0"
                                width="90"
                                height="90"
                                rx="14"
                                fill="#0F172A"
                                stroke="#F59E0B"
                                strokeWidth="2"
                                className="drop-shadow-xs"
                              />
                              <circle cx="45" cy="45" r="38" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
                              <circle cx="45" cy="45" r="28" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
                              <line x1="45" y1="7" x2="45" y2="83" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
                              <line x1="7" y1="45" x2="83" y2="45" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 2" />
                              <text x="45" y="55" fontSize="28" fontWeight="900" fill="#F8FAFC" textAnchor="middle">H</text>
                              <text x="45" y="74" fontSize="7.5" fontWeight="bold" fill="#F59E0B" textAnchor="middle" fontFamily="monospace">
                                {bed.label || bed.id}
                              </text>
                            </g>
                          ) : isGurney ? (
                            /* Emergency Mobile Gurney CAD Graphic */
                            <g>
                              <rect
                                x="0"
                                y="0"
                                width="32"
                                height="56"
                                rx="5"
                                fill="#FFFFFF"
                                stroke="#0F172A"
                                strokeWidth="2"
                                className="drop-shadow-xs"
                              />
                              <circle cx="2" cy="2" r="2.5" fill="#0F172A" />
                              <circle cx="30" cy="2" r="2.5" fill="#0F172A" />
                              <circle cx="2" cy="54" r="2.5" fill="#0F172A" />
                              <circle cx="30" cy="54" r="2.5" fill="#0F172A" />
                              <rect x="4" y="4" width="24" height="48" rx="3" fill={isBedCrit ? '#FFE4E6' : '#F1F5F9'} />
                              <rect x="6" y="7" width="20" height="9" rx="2" fill={isBedCrit ? '#F43F5E' : isBedVac ? '#CBD5E1' : '#0284C7'} />
                              <text x="16" y="30" fontSize="7.5" fontWeight="bold" fill="#0F172A" textAnchor="middle">
                                {bed.label || bed.id}
                              </text>
                            </g>
                          ) : (
                            /* Standard Ward Bed CAD Graphic */
                            <g>
                              {/* Mattress Base (Resized 38px x 52px) */}
                              <rect
                                x="0"
                                y="0"
                                width="38"
                                height="52"
                                rx="4"
                                fill="#FFFFFF"
                                stroke="#0F172A"
                                strokeWidth="2"
                                className="drop-shadow-xs"
                              />

                              {/* Headboard (Touches Wall) */}
                              <rect
                                x="0"
                                y="0"
                                width="38"
                                height="6"
                                fill="#0F172A"
                                rx="1"
                              />

                              {/* Pillow (Acuity Color) */}
                              <rect
                                x="5"
                                y="9"
                                width="28"
                                height="10"
                                rx="2"
                                fill={isBedCrit ? "#F43F5E" : isBedVac ? "#E2E8F0" : "#0284C7"}
                              />

                              {/* Bed Label */}
                              <text
                                x="19"
                                y="34"
                                fontSize="8"
                                fontWeight="bold"
                                fill="#0F172A"
                                textAnchor="middle"
                              >
                                {bed.label}
                              </text>

                              {/* IV Apparatus Pole */}
                              <circle
                                cx="3"
                                cy="9"
                                r="2.5"
                                fill={isBedCrit ? "#E11D48" : "#64748B"}
                              />
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* Corner Resize Handle on Room */}
                    {isRoomSel && (
                      <circle
                        cx={room.w}
                        cy={room.h}
                        r="7"
                        fill="#0284C7"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="cursor-nwse-resize"
                        onPointerDown={(e) => handleRoomResizePointerDown(e, room)}
                      />
                    )}
                  </g>
                );
              })}

            </g>
          </svg>

          {/* STATUS HUD */}
          <div className="absolute bottom-4 left-4 bg-white border border-slate-200 rounded-xl p-1.5 shadow-lg flex items-center gap-1.5 text-xs select-none">
            <span className="font-mono font-bold text-slate-900 text-xs px-1 min-w-[44px] text-center">
              {Math.round(zoom * 100)}%
            </span>

            <div className="h-4 w-px bg-slate-200 mx-0.5"></div>

            <button
              onClick={() => { setZoom(1.0); setPan({ x: 0, y: 0 }); }}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset View (100%)"
            >
              <Maximize2 size={14} />
            </button>

            <span className="text-[10px] text-slate-400 pl-1 border-l border-slate-200 hidden md:inline">
              <strong>Level 4 Active</strong> • {roomList.length} Rooms • {totalBedsCount} Beds • All Headboards Against Walls
            </span>
          </div>

        </div>

        {/* RIGHT PROPERTY INSPECTOR DOCK */}
        {isInspectorOpen && (
          <div className="w-80 bg-white border-l border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 shadow-xs">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">CAD Bay Inspector</span>
              <button 
                onClick={() => setIsInspectorOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
                title="Collapse Inspector"
              >
                <PanelRightClose size={15} />
              </button>
            </div>

          {/* 1. FLOOR INSPECTOR */}
          {selectedItemType === 'floor' && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Hospital Floor Selected
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Floor Width</label>
                  <input
                    type="number"
                    value={floorBounds.w}
                    onChange={(e) => setFloorBounds(prev => ({ ...prev, w: parseInt(e.target.value) || 940 }))}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Floor Height</label>
                  <input
                    type="number"
                    value={floorBounds.h}
                    onChange={(e) => setFloorBounds(prev => ({ ...prev, h: parseInt(e.target.value) || 660 }))}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs mt-1">
                <span className="font-bold text-slate-900 block mb-1">Level 4 Specifications:</span>
                <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                  <span>Gross Area:</span>
                  <span className="font-bold text-blue-700">{Math.round((floorBounds.w * floorBounds.h) / 44).toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Capacity:</span>
                  <span className="font-bold text-slate-800">{totalBedsCount} Beds ({roomList.length} Rooms)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Drag anywhere on the floor border to translate the entire building, or drag the 8 blue handles to expand.
              </p>
            </div>
          )}

          {/* 2. ROOM CONTAINER INSPECTOR WITH STRICT CLAMPING */}
          {selectedItemType === 'room' && activeRoom && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Room Container Selected
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Room ID</label>
                <input
                  type="text"
                  value={activeRoom.id}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRoomList(prev => prev.map(r => r.id === selectedRoomId ? { ...r, id: val } : r));
                    setSelectedRoomId(val);
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={activeRoom.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRoomList(prev => prev.map(r => r.id === selectedRoomId ? { ...r, name: val } : r));
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Department</label>
                <select
                  value={activeRoom.department}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRoomList(prev => prev.map(r => r.id === selectedRoomId ? { ...r, department: val } : r));
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                >
                  <option value="Emergency">Emergency / Trauma</option>
                  <option value="ICU">ICU Resuscitation</option>
                  <option value="Med-Surg">Med-Surg Unit</option>
                  <option value="Isolation">Isolation &amp; Negative Pressure</option>
                </select>
              </div>

              {/* Dimensions with Auto-Clamping */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Width (px)</label>
                  <input
                    type="number"
                    value={activeRoom.w}
                    onChange={(e) => {
                      const newW = Math.max(160, parseInt(e.target.value) || 200);
                      setRoomList(prev => prev.map(r => {
                        if (r.id === selectedRoomId) {
                          const clampedBeds = r.beds.map(b => ({
                            ...b,
                            relX: Math.max(10, Math.min(newW - 48, b.relX))
                          }));
                          return { ...r, w: newW, beds: clampedBeds };
                        }
                        return r;
                      }));
                    }}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={activeRoom.h}
                    onChange={(e) => {
                      const newH = Math.max(120, parseInt(e.target.value) || 160);
                      setRoomList(prev => prev.map(r => {
                        if (r.id === selectedRoomId) {
                          const clampedBeds = r.beds.map(b => ({
                            ...b,
                            relY: Math.max(10, Math.min(newH - 62, b.relY))
                          }));
                          return { ...r, h: newH, beds: clampedBeds };
                        }
                        return r;
                      }));
                    }}
                    className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs"
                  />
                </div>
              </div>

              {/* Beds Inside This Room */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-800 block mb-1">Beds Inside ({activeRoom.beds.length}):</span>
                <div className="flex flex-wrap gap-1">
                  {activeRoom.beds.map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedSubId(b.id);
                        setSelectedItemType('bed');
                      }}
                      className="px-2 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-bold text-slate-700 hover:border-blue-500 cursor-pointer"
                    >
                      {b.label} ({b.rotation}°)
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDeleteSelected}
                className="mt-2 w-full py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer border border-rose-200 flex items-center justify-center gap-1.5"
              >
                <Trash2 size={13} /> Remove Room Bay
              </button>
            </div>
          )}

          {/* 3. BED INSPECTOR */}
          {selectedItemType === 'bed' && activeBed && activeRoom && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Hospital Bed Selected
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Parent: <strong>{activeRoom.id}</strong>
                </span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Bed Label</label>
                <input
                  type="text"
                  value={activeBed.label}
                  onChange={(e) => {
                    const val = e.target.value;
                    setRoomList(prev => prev.map(r => r.id === selectedRoomId ? {
                      ...r,
                      beds: r.beds.map(b => b.id === selectedSubId ? { ...b, label: val } : b)
                    } : r));
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              {/* 4-Way Wall Orientation Selector */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Headboard Wall Orientation</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs font-bold font-mono">
                  {([0, 90, 180, 270] as const).map(deg => (
                    <button
                      key={deg}
                      onClick={() => {
                        const nextRooms = roomList.map(r => r.id === selectedRoomId ? {
                          ...r,
                          beds: r.beds.map(b => b.id === selectedSubId ? { ...b, rotation: deg } : b)
                        } : r);
                        setRoomList(nextRooms);
                        pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
                        clinicalAudio.playDrawerSwoosh();
                      }}
                      className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
                        activeBed.rotation === deg ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={handleRotateSelected}
                  className="w-full py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer border border-slate-300 flex items-center justify-center gap-1.5"
                >
                  <RotateCw size={13} /> Rotate 90° (Shortcut: R)
                </button>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Acuity Status</label>
                <select
                  value={activeBed.acuity}
                  onChange={(e) => {
                    const val = e.target.value as any;
                    setRoomList(prev => prev.map(r => r.id === selectedRoomId ? {
                      ...r,
                      beds: r.beds.map(b => b.id === selectedSubId ? { ...b, acuity: val } : b)
                    } : r));
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                >
                  <option value="critical">Critical (Red Acuity)</option>
                  <option value="stable">Stable (Blue Acuity)</option>
                  <option value="none">Vacant / None</option>
                </select>
              </div>

              <button
                onClick={handleDeleteSelected}
                className="mt-2 w-full py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer border border-rose-200 flex items-center justify-center gap-1.5"
              >
                <Trash2 size={13} /> Remove Bed
              </button>
            </div>
          )}

          {/* 4. DOORWAY INSPECTOR */}
          {selectedItemType === 'door' && activeDoor && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Doorway Selected
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Swing Direction</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs font-bold font-mono">
                  {([0, 90, 180, 270] as const).map(deg => (
                    <button
                      key={deg}
                      onClick={() => {
                        const nextRooms = roomList.map(r => r.id === selectedRoomId ? {
                          ...r,
                          doors: r.doors.map(d => d.id === selectedSubId ? { ...d, rotation: deg } : d)
                        } : r);
                        setRoomList(nextRooms);
                        pushHistory(floorBounds, nextRooms, tagList, corridorWalls);
                        clinicalAudio.playDrawerSwoosh();
                      }}
                      className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
                        activeDoor.rotation === deg ? 'bg-amber-600 text-white border-amber-700' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. SAFETY TAG INSPECTOR */}
          {selectedItemType === 'tag' && activeTag && (
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Safety Marker Selected
              </span>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Marker Text</label>
                <input
                  type="text"
                  value={activeTag.text}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTagList(prev => prev.map(t => t.id === selectedSubId ? { ...t, text: val } : t));
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              <button
                onClick={handleDeleteSelected}
                className="mt-2 w-full py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors cursor-pointer border border-rose-200 flex items-center justify-center gap-1.5"
              >
                <Trash2 size={13} /> Remove Marker
              </button>
            </div>
          )}

          {/* EMPTY INSPECTOR */}
          {!selectedItemType && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-slate-400">
              <Layers size={32} className="mb-2 text-slate-300" />
              <span className="text-xs font-bold text-slate-600 block">Level {activeFloorLevel} Overview</span>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Click any Room, Bed, Doorway, Stairwell, or the Floor Boundary to inspect and modify.
              </p>
            </div>
          )}

          {/* BLUEPRINT STATS */}
          {(() => {
            const currentFloorMeta = DEFAULT_HOSPITAL_FLOORS.find(f => f.number === activeFloorLevel) || {
              number: activeFloorLevel,
              name: `Level ${activeFloorLevel}: Inpatient Ward`,
              department: 'Inpatient Department',
              shortCode: `L${activeFloorLevel}`
            };
            return (
              <div className="mt-auto p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">{currentFloorMeta.name}</span>
                <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                  <span>Rooms / Bays:</span>
                  <span className="font-bold text-slate-800">{roomList.length} Rooms</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                  <span>Total Beds:</span>
                  <span className="font-bold text-emerald-700">{totalBedsCount} Beds</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-0.5">
                  <span>Egress Cores:</span>
                  <span className="font-bold text-slate-800">{tagList.length} Safety Markers</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>History Stack:</span>
                  <span className="font-bold text-slate-700">{historyIndex + 1} / {history.length}</span>
                </div>
              </div>
            );
          })()}

        </div>
        )}

      </div>

      {/* 📸 CAMERA / AI BLUEPRINT SCANNER MODAL */}
      {showScannerModal && (
        <div className="fixed inset-0 bg-slate-950/70 flex items-center justify-center z-50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Camera size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    Hospital Floorplan &amp; Emergency Map Scanner
                    <Sparkles size={13} className="text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Scan wall-mounted emergency exit maps to auto-build or trace CAD floorplans.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowScannerModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 flex flex-col gap-4">
              
              {/* Option 1: File / Photo Upload */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
              >
                <div className="p-3 bg-white rounded-xl shadow-xs text-indigo-600 mb-2 group-hover:scale-105 transition-transform">
                  <Upload size={24} />
                </div>
                <span className="text-xs font-bold text-indigo-950">Upload or Snap Photo of Escape Plan</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Supports PNG, JPG, JPEG from phone camera or CAD scan</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OR USE HOSPITAL AI VISION PRESET</span>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              {/* Option 2: AI Auto-Vectorize from Standard Map */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ScanLine size={16} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">Hospital Level {activeFloorLevel} Escape Diagram</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    {roomList.length} Rooms • {totalBedsCount} Beds • {tagList.length} Egress Cores
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Automatically extracts architectural room boundaries, bed alignments against walls, emergency stairs, and fire exit corridors for Level {activeFloorLevel}.
                </p>

                <button
                  onClick={handleAiAutoVectorize}
                  disabled={isAiScanning}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isAiScanning ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing Wall Lines &amp; Bed Coordinates...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-amber-300" />
                      <span>1-Click Auto-Vectorize Blueprint</span>
                    </>
                  )}
                </button>
              </div>

              {/* Opacity Control if loaded */}
              {underlayImage && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Tracing Underlay Opacity</span>
                    <span className="text-[10px] text-slate-500">Adjust reference image transparency</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.05"
                    value={underlayOpacity}
                    onChange={(e) => setUnderlayOpacity(parseFloat(e.target.value))}
                    className="w-28"
                  />
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
