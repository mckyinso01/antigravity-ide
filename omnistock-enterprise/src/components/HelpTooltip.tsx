import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  title: string;
  purpose: string;
  howTo?: string;
  shortcut?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  showIcon?: boolean;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({
  title,
  purpose,
  howTo,
  shortcut,
  position = 'bottom',
  children,
  showIcon = false
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2.5';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2.5';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2.5';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2.5';
    }
  };

  return (
    <div 
      className="relative inline-flex items-center group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {showIcon && (
        <span className="ml-1 text-slate-500 hover:text-[#5BC0BE] cursor-help transition-colors">
          <HelpCircle size={12} />
        </span>
      )}

      {isVisible && (
        <div 
          className={`absolute ${getPositionClasses()} z-50 w-64 p-3 rounded-xl bg-[#060A14]/98 border border-[#2A4374] text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-2xl pointer-events-none animate-fadeIn font-sans text-left`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1E2D4D] pb-1.5 mb-1.5">
            <span className="font-mono font-bold text-xs text-[#6FFFE9] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5BC0BE]"></span>
              {title}
            </span>
            {shortcut && (
              <span className="px-1.5 py-0.5 rounded bg-[#121D36] border border-[#2A4374] text-[9px] font-mono text-slate-300">
                {shortcut}
              </span>
            )}
          </div>

          {/* Purpose & How To */}
          <div className="space-y-1 text-[11px] leading-relaxed">
            <p className="text-slate-200">
              <strong className="text-[#5BC0BE] font-semibold">Purpose:</strong> {purpose}
            </p>
            {howTo && (
              <p className="text-slate-400 text-[10px]">
                <strong className="text-slate-300 font-semibold">How to Use:</strong> {howTo}
              </p>
            )}
          </div>

          {/* Subdued footer tag */}
          <div className="mt-2 pt-1 border-t border-[#1E2D4D]/60 flex items-center justify-between text-[8px] font-mono text-slate-500">
            <span>OMNISTOCK HUD GUIDE</span>
            <span className="text-emerald-400">ACTIVE</span>
          </div>
        </div>
      )}
    </div>
  );
};
