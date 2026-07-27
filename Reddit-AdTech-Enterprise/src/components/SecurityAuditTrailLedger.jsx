import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertTriangle, RefreshCw, CheckCircle } from 'lucide-react';

export default function SecurityAuditTrailLedger({ isRedacted }) {
  const [isTampered, setIsTampered] = useState(false);

  const initialChain = [
    {
      blockId: 'BLK-001',
      timestamp: '18:40:00.000',
      action: 'SYSTEM_GENESIS_BLOCK',
      actor: 'system_root',
      hash: '88f12a3918239018239018239018239018239018239018239018239018239018',
      prevHash: '0000000000000000000000000000000000000000000000000000000000000000'
    },
    {
      blockId: 'BLK-002',
      timestamp: '18:40:02.104',
      action: 'AUCTION_WIN_VERIFIED',
      actor: 'TritonInferenceEngine',
      hash: isTampered ? 'TAMPERED_INVALID_HASH_99999999999999999999999999999999' : '77a23b4910293019203910293019203910293019203910293019203910293019',
      prevHash: '88f12a3918239018239018239018239018239018239018239018239018239018'
    },
    {
      blockId: 'BLK-003',
      timestamp: '18:40:02.400',
      action: isRedacted ? 'AD_POLICY_REDACTION_EXECUTED' : 'AD_COPY_SCAN_PASSED',
      actor: 'AdOpsAuditor_Elena',
      hash: '99c34d5010293019203910293019203910293019203910293019203910293020',
      prevHash: isTampered ? 'TAMPERED_INVALID_HASH_99999999999999999999999999999999' : '77a23b4910293019203910293019203910293019203910293019203910293019'
    }
  ];

  return (
    <div className="bg-[#1A1F26] p-6 rounded-2xl border border-[#2D3748] shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Lock className="w-5 h-5 text-[#FF4500]" />
          <div>
            <h4 className="text-base font-bold text-white">Cryptographic SHA-256 Audit Trail Ledger</h4>
            <p className="text-xs text-slate-400">Immutable WORM Audit Log for Compliance & Policy Enforcement</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isTampered ? (
            <button
              onClick={() => setIsTampered(false)}
              className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Self-Healing Restore Chain</span>
            </button>
          ) : (
            <button
              onClick={() => setIsTampered(true)}
              className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 rounded-lg text-xs font-semibold transition-all"
            >
              Test Tamper Simulation
            </button>
          )}
        </div>
      </div>

      {/* Ledger Status Badge */}
      <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${isTampered ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
        <div className="flex items-center space-x-2">
          {isTampered ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span>{isTampered ? '⚠️ CHAIN TAMPERED AT BLOCK #002 (Hash Mismatch)' : 'CHAIN VALID & VERIFIED (Cryptographic SHA-256 Link Intact)'}</span>
        </div>
        <span>Blocks Linked: 3</span>
      </div>

      {/* Block List */}
      <div className="space-y-3 font-mono text-xs">
        {initialChain.map((blk) => (
          <div key={blk.blockId} className="bg-[#0F1419] p-4 rounded-xl border border-[#2D3748] space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-bold text-[#FF4500]">{blk.blockId}</span>
              <span className="text-slate-500">{blk.timestamp}</span>
            </div>
            <div className="text-slate-200">Action: <span className="text-white font-semibold">{blk.action}</span> (Actor: {blk.actor})</div>
            <div className="text-[11px] text-slate-400 truncate">Hash: <span className={blk.hash.includes('TAMPERED') ? 'text-rose-400 font-bold' : 'text-slate-300'}>{blk.hash}</span></div>
            <div className="text-[10px] text-slate-500 truncate">Prev: {blk.prevHash}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
