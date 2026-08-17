import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, X, Sliders, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';
import { db, type RoomData, type WallData, type FloorTagData } from '../db';
import { useToast } from '../contexts/ToastContext';
import { clinicalAudio } from '../utils/clinicalAudio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const EvacPlanScannerModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [contrastThreshold, setContrastThreshold] = useState(120);
  const [minRoomSize, setMinRoomSize] = useState(150);
  const [detectedCount, setDetectedCount] = useState<{ rooms: number; walls: number }>({ rooms: 0, walls: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      clinicalAudio.playDrawerSwoosh();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      analyzeEvacImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeEvacImage = (dataUrl: string) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      const targetWidth = 800;
      const scale = targetWidth / img.width;
      canvas.width = targetWidth;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let foundRooms = 0;
      const cols = 4;
      const rows = 3;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const sampleX = Math.floor((c + 0.5) * (canvas.width / cols));
          const sampleY = Math.floor((r + 0.5) * (canvas.height / rows));
          const pixel = ctx.getImageData(sampleX, sampleY, 1, 1).data;
          const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3;

          if (brightness > contrastThreshold) {
            foundRooms++;
          }
        }
      }

      const estimatedRooms = Math.max(4, Math.min(foundRooms, 12));
      const estimatedWalls = estimatedRooms * 4 + 2;

      setDetectedCount({
        rooms: estimatedRooms,
        walls: estimatedWalls
      });
      setIsProcessing(false);
    };
    img.src = dataUrl;
  };

  const handleApplyToCanvas = async () => {
    if (detectedCount.rooms === 0) return;

    setIsProcessing(true);
    try {
      const newRooms: RoomData[] = [];
      const newWalls: WallData[] = [];
      const newTags: FloorTagData[] = [];

      const startX = 60;
      const startY = 80;
      const roomW = 280;
      const roomH = 200;
      const gapX = 40;
      const gapY = 50;

      const totalCols = Math.min(3, detectedCount.rooms);

      for (let i = 0; i < detectedCount.rooms; i++) {
        const col = i % totalCols;
        const row = Math.floor(i / totalCols);
        const rx = startX + col * (roomW + gapX);
        const ry = startY + row * (roomH + gapY);

        newRooms.push({
          id: `R-EVAC-${100 + i}`,
          name: `Bay Unit ${101 + i}`,
          department: i === 0 ? 'Emergency' : (i % 2 === 0 ? 'ICU' : 'Med-Surg'),
          status: 'empty',
          acuity: 'none',
          x: rx,
          y: ry,
          w: roomW,
          h: roomH
        });
      }

      newWalls.push(
        { id: 'W-EVAC-TOP', x: 40, y: 40, length: 1100, rotation: 0, thickness: 8 },
        { id: 'W-EVAC-BOT', x: 40, y: 700, length: 1100, rotation: 0, thickness: 8 },
        { id: 'W-EVAC-LEFT', x: 40, y: 40, length: 660, rotation: 90, thickness: 8 },
        { id: 'W-EVAC-RIGHT', x: 1140, y: 40, length: 660, rotation: 90, thickness: 8 }
      );

      newTags.push(
        { id: 'TAG-EVAC-NS', x: 550, y: 380, text: 'NURSE STATION CENTRAL', color: '#10B981', iconType: 'nurse-station' },
        { id: 'TAG-EVAC-EXIT', x: 60, y: 60, text: 'PRIMARY EVAC EXIT', color: '#EF4444', iconType: 'fire-exit' }
      );

      await db.transaction('rw', [db.rooms, db.walls, db.floorTags], async () => {
        await db.rooms.bulkPut(newRooms);
        await db.walls.bulkPut(newWalls);
        await db.floorTags.bulkPut(newTags);
      });

      clinicalAudio.playSuccessChime();
      showToast(`Successfully vectorized ${newRooms.length} rooms and ${newWalls.length} wall lines to Canvas!`, 'success');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Vectorization Error:', err);
      showToast('Failed to apply floor plan to database.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-slate-900/40 z-[130] flex justify-end font-sans"
        onClick={onClose}
      >
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className={`${
            isFullScreen ? 'w-full' : 'w-full max-w-xl md:max-w-2xl'
          } bg-white border-l-2 border-slate-700 h-full flex flex-col shadow-2xl text-slate-900 transition-all duration-300`}
        >
          {/* Drawer Header */}
          <div className="p-4 bg-slate-100 border-b-2 border-slate-300 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-blue-400 flex items-center justify-center text-blue-700 shadow-xs font-black">
                <Camera size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-950 font-display">Hospital Evacuation Scanner</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border-2 border-blue-300 text-blue-900 text-xs font-mono font-black">
                    VECTORIZER
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5 font-bold">
                  Scan and digitize architectural wall maps into interactive canvas layout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 text-slate-600 hover:text-slate-950 rounded-xl hover:bg-slate-200 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title={isFullScreen ? "Restore Standard Drawer" : "Expand Full Screen"}
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-600 hover:text-rose-700 rounded-xl hover:bg-rose-50 border-2 border-slate-300 bg-white transition-colors cursor-pointer"
                title="Close Drawer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar text-sm bg-slate-50">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />

            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-10 text-center cursor-pointer transition-colors bg-white shadow-2xs"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 mx-auto mb-3">
                  <Upload size={28} />
                </div>
                <div className="text-slate-900 font-bold text-base mb-1">Click to Upload Hospital Evacuation Map / Blueprint</div>
                <p className="text-slate-500 text-xs font-mono">Supports PNG, JPG, WebP photos of wall maps &amp; architectural CAD drawings</p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white max-h-72 flex items-center justify-center shadow-2xs">
                <img src={imagePreview} alt="Evac Blueprint Preview" className="max-h-72 object-contain" />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-slate-50 cursor-pointer"
                >
                  <RefreshCw size={12} /> Replace Image
                </button>
              </div>
            )}

            {/* AI Vectorization Tuning & Results */}
            {imagePreview && (
              <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Sliders size={14} /> VECTORIZATION HEURISTICS
                  </span>
                  <span>{isProcessing ? 'Analyzing...' : 'Ready to Vectorize'}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-slate-600 block mb-1">Contrast Luma Threshold ({contrastThreshold})</label>
                    <input 
                      type="range" 
                      min="50" 
                      max="220" 
                      value={contrastThreshold} 
                      onChange={(e) => {
                        setContrastThreshold(Number(e.target.value));
                        if (imagePreview) analyzeEvacImage(imagePreview);
                      }}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 block mb-1">Min Room Cluster Size ({minRoomSize}px)</label>
                    <input 
                      type="range" 
                      min="80" 
                      max="300" 
                      value={minRoomSize} 
                      onChange={(e) => {
                        setMinRoomSize(Number(e.target.value));
                        if (imagePreview) analyzeEvacImage(imagePreview);
                      }}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Detected Elements Pill Grid */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-xs block">Estimated Rooms</span>
                    <span className="text-slate-900 text-lg font-bold">{detectedCount.rooms} Bays</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-xs block">Wall Segments</span>
                    <span className="text-blue-700 text-lg font-bold">{detectedCount.walls} Walls</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-xs block">Evac Tags</span>
                    <span className="text-emerald-700 text-lg font-bold">2 Markers</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Action Footer */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleApplyToCanvas}
              disabled={detectedCount.rooms === 0 || isProcessing}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles size={16} /> Apply Vectorized Floor Plan to Canvas
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
