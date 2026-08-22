import React from 'react';
import { Send, Clock, Inbox, ShieldCheck, TrendingUp } from 'lucide-react';
import { LeadRecord, InboundReply, CloudEngineTelemetry, CampaignVertical } from '../types';

interface Props {
  leads: LeadRecord[];
  inboundReplies: InboundReply[];
  telemetry: CloudEngineTelemetry;
  selectedVertical: CampaignVertical;
}

export const MetricCards: React.FC<Props> = ({
  leads,
  inboundReplies,
  telemetry,
  selectedVertical,
}) => {
  const activeLeads =
    selectedVertical === 'all'
      ? leads
      : leads.filter((l) => l.vertical === selectedVertical);

  const totalDispatched = activeLeads.length;
  const followedUpCount = activeLeads.filter((l) => l.status === 'followed_up').length;
  const replyCount = inboundReplies.length;
  const pendingReviewCount = inboundReplies.filter((r) => r.status === 'pending_review').length;

  const getVerticalLabel = () => {
    switch (selectedVertical) {
      case 'clinical':
        return 'Clinical ICU EHR';
      case 'claimguard':
        return 'ClaimGuard Claims Defense';
      case 'sitesafe':
        return 'SiteSafe Safety OS';
      case 'omnistock':
        return 'OmniStock Spatial WMS';
      case 'saccade':
        return 'Saccade Biometric CRO';
      default:
        return 'All 5 Flagships';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Outbound Dispatched */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
        <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Active Targets ({getVerticalLabel()})
          </span>
          <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-accent-cyan">
            <Send className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-display text-white tracking-tight">
            {totalDispatched}
          </span>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> 100% Verified
          </span>
        </div>
        <p className="text-[11px] font-mono text-slate-500 mt-2">
          Decision makers with custom demo sandbox links
        </p>
      </div>

      {/* Card 2: Co-Design Follow-Up Pacing */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
        <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Follow-Up Executed
          </span>
          <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-display text-white tracking-tight">
            {followedUpCount}
          </span>
          <span className="text-xs font-mono text-indigo-400">
            / {totalDispatched} Targets
          </span>
        </div>
        <p className="text-[11px] font-mono text-slate-500 mt-2">
          Pacing: 35–55s jitter • Spacemail rate-safe
        </p>
      </div>

      {/* Card 3: Inbound Reply & Intent Stream */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-amber-500/40 transition-all">
        <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Inbound AI Replies
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Inbox className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-display text-white tracking-tight">
            {replyCount}
          </span>
          {pendingReviewCount > 0 ? (
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-500/30 font-bold animate-pulse">
              {pendingReviewCount} PENDING
            </span>
          ) : (
            <span className="text-xs font-mono text-slate-400">0 Pending</span>
          )}
        </div>
        <p className="text-[11px] font-mono text-slate-500 mt-2">
          Gemini NLP: Intent classified & draft generated
        </p>
      </div>

      {/* Card 4: 24/7 Cloud Heartbeat */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Cloud Heartbeat
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold font-display text-emerald-400 tracking-tight">
            {telemetry.uptimePercentage}%
          </span>
          <span className="text-xs font-mono text-slate-400">
            Next: {telemetry.nextCronTriggerInMinutes}m
          </span>
        </div>
        <p className="text-[11px] font-mono text-slate-500 mt-2">
          Google Cloud Run (24/7 Multi-Vertical Daemon)
        </p>
      </div>
    </div>
  );
};
