import React, { useState } from 'react';

export default function GlobalCommandPaletteModal({ isOpen, onClose, onNavigate, onShowToast }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const commands = [
    { id: 'vault', title: 'Open Zero-Knowledge Vault Console', category: 'Module', route: 'vault', icon: '🛡️' },
    { id: 'auditor', title: 'Open SOC2 & ISO 27001 Auditor', category: 'Module', route: 'auditor', icon: '📋' },
    { id: 'scanner', title: 'Open Secret Exposure Interceptor', category: 'Module', route: 'scanner', icon: '🔍' },
    { id: 'ledger', title: 'Open Cryptographic Audit Ledger', category: 'Module', route: 'ledger', icon: '🔐' },
    { id: 'export', title: 'Trigger Multi-Format Export Wizard', category: 'Action', action: 'export', icon: '📊' }
  ];

  const filteredCommands = commands.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCommand = (cmd) => {
    onClose();
    if (cmd.route) {
      if (onNavigate) onNavigate(cmd.route);
      if (onShowToast) onShowToast(`Navigated to ${cmd.title}`, 'info');
    } else if (cmd.action === 'export') {
      if (onShowToast) onShowToast('Export Wizard Initialized!', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
      <div className="bg-[#1B2A4A] border border-[#30363D] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Search Bar Input */}
        <div className="p-4 bg-[#0D0F12] border-b border-[#30363D] flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type a command or search 1Password vault (e.g. SOC2, vault, export)..."
            className="w-full bg-transparent text-sm font-mono text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 bg-[#1B2A4A] text-slate-400 border border-[#30363D] rounded text-[10px] font-mono">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands or vault items found for "{searchQuery}".
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => handleSelectCommand(cmd)}
                className="w-full p-3 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">{cmd.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{cmd.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{cmd.category}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#48CAE4] opacity-0 group-hover:opacity-100 transition-opacity">
                  Jump ➔
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#0D0F12] border-t border-[#30363D] text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>Tip: Press <kbd className="text-slate-300">Ctrl+K</kbd> anywhere to open Command Palette</span>
          <span>1Password Enterprise</span>
        </div>

      </div>
    </div>
  );
}
