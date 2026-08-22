import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  CreditCard, 
  Download, 
  Calendar,
  MessageSquareQuote
} from 'lucide-react';
import { downloadAirGappedDeploymentBundle } from '../utils/airGappedBundle';

interface TrialExpiryCoDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  daysRemaining: number;
  isExpired: boolean;
  onRequestExtension: () => void;
  onOpenLicensingModal: () => void;
}

export const TrialExpiryCoDesignModal: React.FC<TrialExpiryCoDesignModalProps> = ({
  isOpen,
  onClose,
  daysRemaining,
  isExpired,
  onRequestExtension,
  onOpenLicensingModal
}) => {
  const [feedbackRating, setFeedbackRating] = useState<'exceptional' | 'great' | 'needs_work'>('exceptional');
  const [customRequest, setCustomRequest] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `ClaimGuard AI 7-Day Trial Feedback: Rating: ${feedbackRating}. Custom Requests: ${customRequest || 'None'}`;
    const waUrl = `https://wa.me/639622812703?text=${encodeURIComponent(message)}`;
    setSubmittedFeedback(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0B132B] border border-cyan-500/50 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative font-sans text-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#070D1E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <span>ClaimGuard AI 7-Day Sovereign Access</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  isExpired 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {isExpired ? 'TRIAL CONCLUDED' : `${daysRemaining} DAYS REMAINING`}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {isExpired 
                  ? 'Your 7-day full evaluation period has concluded. Choose your next step below.' 
                  : 'Evaluate ERISA § 502 statutory citations, pre-submission claims defense, and Prompt Pay interest calculation.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs font-mono">
          {/* SECTION 1: CO-DESIGN FEEDBACK & CUSTOM REQUEST */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-xs flex items-center gap-1.5 text-cyan-400">
                <MessageSquareQuote size={15} /> 1. How was your team's experience with ClaimGuard AI?
              </span>
              <span className="text-[10px] text-slate-400">100% Free Custom Modifications</span>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setFeedbackRating('exceptional')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold cursor-pointer transition ${
                    feedbackRating === 'exceptional'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ⭐ Exceptional (Ready)
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackRating('great')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold cursor-pointer transition ${
                    feedbackRating === 'great'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  👍 Great (Need Tweaks)
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackRating('needs_work')}
                  className={`py-2 px-3 rounded-xl border text-center font-bold cursor-pointer transition ${
                    feedbackRating === 'needs_work'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🛠️ Need Specific Feature
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 mb-1">
                  What custom legal brief citations, clearinghouse EDI 837/835 bridges, or state prompt-pay rules would you like Founder Mharc Gatan to engineer?
                </label>
                <textarea
                  value={customRequest}
                  onChange={(e) => setCustomRequest(e.target.value)}
                  placeholder="e.g. We need custom Optum / Change Healthcare direct ANSI X12 837 connector, California AB 1455 statutory interest calculator..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-cyan-400 outline-none text-xs"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400">
                  {submittedFeedback ? '✅ Transmitted to Founder Mharc Gatan!' : '✓ Zero obligation • Free tailoring included'}
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition flex items-center gap-1.5 cursor-pointer text-[11px]"
                >
                  <Send size={12} />
                  <span>Submit Customization Request</span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 2: PERPETUAL BUYOUT & PRICING OPTIONS */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-xs flex items-center gap-1.5 text-blue-400">
                <ShieldCheck size={15} /> 2. Permanent Sovereign RCM Defense Ownership
              </span>
              <span className="text-[10px] font-bold text-emerald-400">0% Recurring Per-Claim Tax</span>
            </div>
            <p className="text-slate-300 text-[11px] font-sans">
              Eliminate revenue cycle vendor percentage cuts (often 4-8% of collections). Deploy ClaimGuard AI permanently behind your hospital firewall with 100% full IP source code buyout.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLicensingModal();
                }}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <CreditCard size={14} />
                <span>View Buyout Tiers &bull; 3-Gives Escrow</span>
              </button>

              <button
                type="button"
                onClick={downloadAirGappedDeploymentBundle}
                className="py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-bold transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Download size={14} />
                <span>Download Air-Gapped Docker Bundle</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: COURTESY 72-HOUR EXTENSION */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-300 font-bold">Need more time to review with your CFO & General Counsel?</span>
              <p className="text-slate-500 text-[10px]">Extend your full-featured trial by an additional 72 hours.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onRequestExtension();
                alert('✅ 72-Hour Courtesy Trial Extension Granted!');
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <Calendar size={12} />
              <span>+72h Extension</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#070D1E] flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>🔒 100% Data Safety Guarantee: Your claim filings and appeal briefs remain strictly confidential.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
