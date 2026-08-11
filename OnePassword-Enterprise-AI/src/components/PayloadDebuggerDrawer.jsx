import React from 'react';

export default function PayloadDebuggerDrawer({ isOpen, onClose, logPayload }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#1B2A4A] border-l border-[#30363D] max-w-md w-full h-full flex flex-col shadow-2xl animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-6 bg-[#0D0F12] border-b border-[#30363D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐞</span>
            <h3 className="text-sm font-bold text-white">Raw JSON Payload & Header Inspector</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Payload Metadata & Transport Headers</label>
            <div className="p-3 bg-[#0D0F12] border border-[#30363D] rounded-xl text-[11px] text-slate-300 space-y-1">
              <div>HTTP Method: <strong className="text-emerald-400">POST (TLS 1.3 Strict)</strong></div>
              <div>Content-Type: <strong className="text-[#48CAE4]">application/json</strong></div>
              <div>Host Domain: <strong className="text-white">gatzdevs.surge.sh</strong></div>
              <div>Security Transport: <strong className="text-cyan-400">HSTS Enabled (max-age=31536000)</strong></div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Raw Encrypted Block JSON</label>
            <pre className="p-4 bg-[#0D0F12] border border-[#30363D] rounded-xl text-[11px] text-[#48CAE4] overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(logPayload || {
                block_id: "block_004",
                cipher: "AES-256-GCM",
                pbkdf2_salt: "0x98f12a39...",
                iterations: 100000,
                status: "VERIFIED_CHAIN",
                timestamp: new Date().toISOString()
              }, null, 2)}
            </pre>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-[#0D0F12] border-t border-[#30363D] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#145FE4] hover:bg-[#2563EB] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
}

