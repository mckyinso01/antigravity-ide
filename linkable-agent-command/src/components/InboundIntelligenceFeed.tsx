import React, { useState } from 'react';
import { Sparkles, Send, Edit3, CheckCircle } from 'lucide-react';
import { InboundReply, ReplyIntent } from '../types';

interface Props {
  replies: InboundReply[];
  onApproveAndSend: (replyId: string, replyText: string) => void;
}

export const InboundIntelligenceFeed: React.FC<Props> = ({ replies, onApproveAndSend }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<{ [id: string]: string }>({});

  const getIntentBadge = (intent: ReplyIntent) => {
    switch (intent) {
      case 'custom_ehr':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-500/40">
            ⚡ EPIC / FHIR INTEGRATION
          </span>
        );
      case 'demo_request':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            🎙️ DEMO WALKTHROUGH REQUEST
          </span>
        );
      case 'pricing_licensing':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-500/40">
            💰 LICENSING & PRICING
          </span>
        );
      case 'ui_ux_mod':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40">
            🎨 UI/UX CUSTOMIZATION
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700">
            GENERAL INQUIRY
          </span>
        );
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-cyan animate-pulse" />
            Inbound Reply Intelligence & Autonomous AI Drafter
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Real-time Gmail IMAP poller • Gemini NLP intent classification • 1-Tap Executive Reply
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1 rounded-xl bg-cyan-950/80 text-accent-cyan border border-cyan-500/30">
          GEMINI_1.5_PRO_ONLINE
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {replies.map((reply) => {
          const currentText = editedText[reply.id] ?? reply.suggestedAiReply;
          const isEditing = editingId === reply.id;
          const isApproved = reply.status === 'approved_sent';

          return (
            <div
              key={reply.id}
              className={`p-4 rounded-2xl border transition-all ${
                isApproved
                  ? 'bg-emerald-950/20 border-emerald-500/30 opacity-75'
                  : 'bg-slate-900/70 border-white/10 hover:border-cyan-500/30'
              }`}
            >
              {/* Top Row: Sender & Intent */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-xs text-black">
                    {reply.senderName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm font-sans flex items-center gap-2">
                      {reply.senderName}
                      <span className="text-xs font-normal text-slate-400">
                        ({reply.organization})
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {reply.senderEmail} • {new Date(reply.receivedAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getIntentBadge(reply.intent)}
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/20">
                    Confidence: {(reply.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Prospect Message Body */}
              <div className="p-3 rounded-xl bg-[#030712]/90 border border-white/5 text-xs text-slate-300 font-sans leading-relaxed mb-3">
                <div className="font-mono text-[10px] text-slate-500 uppercase mb-1">
                  Subject: {reply.subject}
                </div>
                "{reply.snippet}"
              </div>

              {/* AI Draft Response Section */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent-cyan">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Drafter (Founder Twin Tone: Mharc Gatan):
                  </div>
                  {!isApproved && (
                    <button
                      onClick={() => setEditingId(isEditing ? null : reply.id)}
                      className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      {isEditing ? 'Done Editing' : 'Edit Draft'}
                    </button>
                  )}
                </div>

                {/* Draft Content or Textarea */}
                {isEditing ? (
                  <textarea
                    rows={6}
                    value={currentText}
                    onChange={(e) =>
                      setEditedText({ ...editedText, [reply.id]: e.target.value })
                    }
                    className="w-full bg-[#030712] border border-cyan-500/40 rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                ) : (
                  <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {currentText}
                  </pre>
                )}

                {/* Action Buttons */}
                <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  {isApproved ? (
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> DISPATCHED VIA SMTP
                    </span>
                  ) : (
                    <button
                      onClick={() => onApproveAndSend(reply.id, currentText)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-cyan to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold font-mono text-xs shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Approve & Dispatch Reply ➔</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
