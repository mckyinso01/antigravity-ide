import React, { useState } from 'react';
import { Bell, Smartphone, Send, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramAlertModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [telegramHandle, setTelegramHandle] = useState('@mharcgatan');
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleSendTest = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-white/15 p-6 relative overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Instant Mobile Telegram / WhatsApp Alerts
              </h3>
              <div className="text-xs font-mono text-indigo-400">
                1-Tap Approve AI Reply from Mobile Phone
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Configuration Body */}
        <div className="space-y-4 text-xs font-mono mb-6">
          <div>
            <label className="block text-slate-400 mb-1.5 font-bold">
              Founder Telegram ID / Webhook URL:
            </label>
            <input
              type="text"
              value={telegramHandle}
              onChange={(e) => setTelegramHandle(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2 text-slate-300 font-sans leading-relaxed">
            <div className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-indigo-400" />
              Real-Time Push Preview:
            </div>
            <div className="p-3 rounded-xl bg-[#030712] border border-indigo-500/20 font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-indigo-400 font-bold">🚨 HOSPITAL REPLY RECEIVED</div>
              <div><strong>From:</strong> Scott Waters (Overlake Medical)</div>
              <div><strong>Intent:</strong> Custom EHR Demo (FHIR)</div>
              <div className="text-slate-400">"Evaluating options for ICU telemetry..."</div>
              <div className="pt-2 flex gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px]">
                  [✅ 1-Tap Send]
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 text-[10px]">
                  [✏️ Edit]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSendTest}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            {testSent ? 'Ping Dispatched! ✅' : 'Send Test Mobile Ping'}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-cyan to-blue-600 text-black text-xs font-mono font-bold transition-all"
          >
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  );
};
