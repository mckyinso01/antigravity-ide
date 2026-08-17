import React, { useState, useEffect } from 'react';
import { FlaskConical, Clock, AlertTriangle } from 'lucide-react';

interface LabTatCountdownProps {
  labName: string;
  targetMinutes?: number;
}

export const LabTatCountdown: React.FC<LabTatCountdownProps> = ({
  labName,
  targetMinutes = 30
}) => {
  // Initialize countdown seconds (default targetMinutes * 60)
  const [secondsRemaining, setSecondsRemaining] = useState(() => {
    // Generate slight random offset for realism between 12 to 28 mins
    return Math.floor((targetMinutes * 60) * 0.7);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const absSecs = Math.abs(secs);
    const m = Math.floor(absSecs / 60);
    const s = absSecs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isOverdue = secondsRemaining <= 0;
  const isUrgent = secondsRemaining > 0 && secondsRemaining < 300; // < 5 mins

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-mono border transition-all ${
      isOverdue 
        ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 animate-pulse shadow-sm'
        : isUrgent 
        ? 'bg-amber-950/60 border-amber-500/50 text-amber-300' 
        : 'bg-slate-900/90 border-slate-800 text-cyan-300'
    }`}>
      <FlaskConical size={11} className={isOverdue ? 'text-rose-400' : 'text-cyan-400'} />
      <span className="font-semibold truncate max-w-[130px]">{labName}:</span>
      {isOverdue ? (
        <span className="font-bold text-rose-400 flex items-center gap-0.5">
          <AlertTriangle size={10} /> +{formatTime(secondsRemaining)} Overdue
        </span>
      ) : (
        <span className="font-bold flex items-center gap-0.5">
          <Clock size={10} className="text-slate-400" /> {formatTime(secondsRemaining)}
        </span>
      )}
    </div>
  );
};
