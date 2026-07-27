import React, { useState, useEffect } from 'react';
import { Search, X, Zap, Sliders, ShieldCheck, Activity, BarChart2, Check } from 'lucide-react';

export default function GlobalCommandPaletteModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered via App.jsx
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { id: 'telemetry', title: 'Open Live Ad Auction Telemetry Stream', icon: Activity, view: 'telemetry' },
    { id: 'latency', title: 'View Sub-Millisecond ML Latency Histogram', icon: BarChart2, view: 'latency' },
    { id: 'auditor', title: 'Run Ad Policy & Multi-Secret Scanner', icon: ShieldCheck, view: 'auditor' },
    { id: 'optimizer', title: 'Configure Campaign Budget Optimizer', icon: Sliders, view: 'telemetry' }
  ];

  const filteredCommands = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-xl bg-[#1A1F26] border border-[#2D3748] rounded-2xl shadow-2xl overflow-hidden space-y-2 p-4">
        <div className="relative flex items-center border-b border-[#2D3748] pb-3">
          <Search className="w-5 h-5 text-slate-400 absolute left-3" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search... (Press Esc to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent pl-10 pr-10 py-2 text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1 py-2">
          {filteredCommands.map(cmd => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.id}
                onClick={() => {
                  onNavigate(cmd.view);
                  onClose();
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-800/80 text-left transition-colors text-slate-200 group"
              >
                <div className="p-2 bg-slate-800 group-hover:bg-[#FF4500] text-slate-300 group-hover:text-white rounded-lg transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{cmd.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
