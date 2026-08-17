import React, { useState, useEffect } from 'react';
import { Sun, Moon, Contrast } from 'lucide-react';

export const BrightnessControl: React.FC = () => {
  const [brightness, setBrightness] = useState<number>(() => {
    const saved = localStorage.getItem('pristine_brightness');
    return saved ? parseFloat(saved) : 100;
  });

  const [contrast, setContrast] = useState<number>(() => {
    const saved = localStorage.getItem('pristine_contrast');
    return saved ? parseFloat(saved) : 100;
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--app-brightness', `${brightness / 100}`);
    localStorage.setItem('pristine_brightness', brightness.toString());
  }, [brightness]);

  useEffect(() => {
    document.documentElement.style.setProperty('--app-contrast', `${contrast / 100}`);
    localStorage.setItem('pristine_contrast', contrast.toString());
  }, [contrast]);

  return (
    <div className="flex items-center gap-3 bg-white border-2 border-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-800 shadow-sm hover:border-slate-400 transition-colors">
      {/* Brightness Calibration Slider */}
      <div className="flex items-center gap-1.5" title={`Brightness: ${brightness}%`}>
        <Sun size={13} className="text-slate-500 shrink-0" />
        <input 
          type="range" 
          min="50" 
          max="125" 
          value={brightness}
          onChange={(e) => setBrightness(parseInt(e.target.value))}
          className="w-14 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
        />
        <Sun size={15} className="text-slate-900 shrink-0 font-bold" />
      </div>

      {/* Contrast / Workstation Dimmer Slider */}
      <div className="flex items-center gap-1.5 border-l-2 border-slate-200 pl-2.5" title={`Contrast: ${contrast}%`}>
        <Moon size={13} className="text-slate-500 shrink-0" />
        <input 
          type="range" 
          min="75" 
          max="130" 
          value={contrast}
          onChange={(e) => setContrast(parseInt(e.target.value))}
          className="w-14 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
        />
        <Contrast size={14} className="text-slate-900 shrink-0 font-bold" />
      </div>
    </div>
  );
};
