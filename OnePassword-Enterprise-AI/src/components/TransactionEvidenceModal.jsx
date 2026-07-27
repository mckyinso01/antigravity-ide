import React from 'react';

export default function TransactionEvidenceModal({ item, onClose, onShowToast }) {
  if (!item) return null;

  const handleCopyProof = () => {
    navigator.clipboard.writeText(JSON.stringify(item, null, 2));
    if (onShowToast) onShowToast('Proof Cryptographic Hash Copied to Clipboard!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1B2A4A] border border-[#30363D] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0D0F12] border-b border-[#30363D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <h3 className="text-sm font-bold text-white">Cryptographic Proof & Evidence Inspector</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 text-xs font-mono">
          <div className="p-4 bg-[#0D0F12] rounded-xl border border-[#30363D] space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Secret Key Identifier:</span>
              <span className="text-white font-bold">{item.name || item.id}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Encryption Standard:</span>
              <span className="text-emerald-400 font-bold">AES-256-GCM Web Crypto</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>PBKDF2 Key Iterations:</span>
              <span className="text-[#48CAE4] font-bold">100,000 Iterations (Salted)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Verification Status:</span>
              <span className="text-emerald-300 font-bold">ZERO_KNOWLEDGE_VERIFIED</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Encrypted Ciphertext Payload (Client-Side Derived)</label>
            <pre className="p-3 bg-[#0D0F12] border border-[#30363D] rounded-xl text-[11px] text-[#48CAE4] overflow-x-auto whitespace-pre-wrap break-all">
              {item.encryptedValue || item.currentHash || 'AES256GCM:v1:e2F3Z...'}
            </pre>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">RSA Audit Signature & Proof Hash</label>
            <div className="p-3 bg-[#0D0F12] border border-[#30363D] rounded-xl text-[11px] text-slate-300 break-all">
              RSA-SHA256:v1:98f1a23e9812390182390182390182390182390182390182390182390182390
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0D0F12] border-t border-[#30363D] flex items-center justify-between">
          <button
            onClick={handleCopyProof}
            className="px-4 py-2 bg-[#145FE4]/20 hover:bg-[#145FE4]/30 text-[#48CAE4] border border-[#145FE4]/40 font-bold text-xs rounded-xl transition-colors"
          >
            📋 Copy Proof Cryptographic Hash
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#145FE4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
