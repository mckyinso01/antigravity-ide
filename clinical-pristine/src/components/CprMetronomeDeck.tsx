import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { clinicalAudio } from '../utils/clinicalAudio';

interface CprMetronomeDeckProps {
  isActive: boolean;
}

export const CprMetronomeDeck: React.FC<CprMetronomeDeckProps> = ({ isActive }) => {
  const [isAudioMuted, setIsAudioMuted] = useState(() => clinicalAudio.getMuted());
  const [compressionCount, setCompressionCount] = useState(0);

  // 110 BPM interval in ms = (60 / 110) * 1000 = 545.45 ms
  const intervalMs = Math.round((60 / 110) * 1000);

  useEffect(() => {
    if (!isActive) {
      setCompressionCount(0);
      clinicalAudio.stopPrecisionMetronome();
      return;
    }

    // Start precision Web Worker / Lookahead Scheduler immune to tab throttling
    clinicalAudio.startPrecisionMetronome(110, (count) => {
      setCompressionCount(count);
    });

    return () => {
      clinicalAudio.stopPrecisionMetronome();
    };
  }, [isActive]);

  const handleToggleMute = () => {
    const nextMuted = clinicalAudio.toggleMute();
    setIsAudioMuted(nextMuted);
  };

  if (!isActive) return null;

  return (
    <div className="p-3 bg-rose-50 border-2 border-rose-400 rounded-2xl flex items-center justify-between gap-4 font-mono text-xs shadow-md">
      <div className="flex items-center gap-3">
        {/* Visual 110 BPM Pulsing Heart Metronome */}
        <div className="relative flex items-center justify-center w-12 h-12">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: intervalMs / 1000, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-rose-200 border border-rose-400"
          />
          <Heart size={24} className="text-rose-600 fill-rose-600 z-10 animate-pulse" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-rose-900 font-bold text-sm font-display">110 BPM CPR PACER</span>
            <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[9px] font-bold">
              AHA 2024 PRECISION
            </span>
          </div>
          <div className="text-[10px] text-slate-600">
            Target Depth: <span className="text-blue-700 font-bold">2.0 - 2.4 in (5-6 cm)</span> • Compressions: <strong className="text-slate-900 font-bold">{compressionCount}</strong>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleMute}
          className={`p-2 rounded-xl border transition-colors flex items-center gap-1 text-[10px] font-bold cursor-pointer ${
            isAudioMuted 
              ? 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50' 
              : 'bg-rose-600 border-rose-700 text-white shadow-xs'
          }`}
          title={isAudioMuted ? 'Unmute 110 BPM Audio Click' : 'Mute Audio Click'}
        >
          {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isAudioMuted ? 'Muted' : '110 BPM Audio'}</span>
        </button>
      </div>
    </div>
  );
};
