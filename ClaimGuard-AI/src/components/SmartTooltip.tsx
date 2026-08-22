import React, { useState, useRef } from 'react';

interface SmartTooltipProps {
  content: string;
  title?: string;
  shortcut?: string;
  nextStepAction?: string;
  stepNumber?: number;
  totalSteps?: number;
  smartBeaconType?: 'action' | 'legal' | 'appeal' | 'fraud';
  position?: 'top' | 'bottom' | 'left' | 'right';
  delayMs?: number;
  children: React.ReactNode;
  className?: string;
}

export const SmartTooltip: React.FC<SmartTooltipProps> = ({
  content,
  title,
  shortcut,
  nextStepAction,
  stepNumber,
  totalSteps,
  smartBeaconType = 'action',
  position = 'top',
  delayMs = 150,
  children,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
    }
  };

  const getBeaconBadge = () => {
    switch (smartBeaconType) {
      case 'legal':
        return { dot: 'bg-purple-400', tag: 'STATUTORY DEFENSE' };
      case 'appeal':
        return { dot: 'bg-emerald-400', tag: 'INSURER APPEAL' };
      case 'fraud':
        return { dot: 'bg-rose-400', tag: 'BILLING DISCREPANCY' };
      default:
        return { dot: 'bg-cyan-400', tag: 'NEXT ACTION' };
    }
  };

  const beacon = getBeaconBadge();

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div
          className={`absolute z-50 pointer-events-none transition-all duration-150 ease-out transform ${getPositionClasses()}`}
          style={{ minWidth: '220px', maxWidth: '320px' }}
        >
          <div className="p-3 rounded-2xl bg-slate-950/98 text-slate-100 border border-cyan-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-xl text-[11px] font-sans leading-relaxed animate-in fade-in zoom-in-95 duration-150">
            {title && (
              <div className="font-bold text-cyan-300 font-mono text-[11px] flex items-center justify-between gap-1.5 mb-1.5 pb-1.5 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${beacon.dot} animate-pulse`}></span>
                  {title}
                </span>
                <div className="flex items-center gap-1">
                  {stepNumber && totalSteps && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-800 text-cyan-300 border border-cyan-800/50">
                      Step {stepNumber}/{totalSteps}
                    </span>
                  )}
                  {shortcut && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[9px] border border-slate-700">
                      {shortcut}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="text-slate-300 font-normal mb-2 leading-relaxed">
              {content}
            </div>

            {/* Predictive Next Step Action Beacon */}
            {nextStepAction && (
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-950/70 to-blue-950/70 border border-cyan-500/40 text-[11px] font-sans">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300 text-[10px] uppercase tracking-wider mb-0.5 font-mono">
                  <span>👉 Next Legal Action:</span>
                </div>
                <p className="text-cyan-100 font-medium text-[11px] leading-snug">
                  {nextStepAction}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
