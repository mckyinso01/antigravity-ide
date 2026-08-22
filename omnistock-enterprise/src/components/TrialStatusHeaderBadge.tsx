import React from 'react';
import { Clock, ShieldCheck } from 'lucide-react';
import { SmartTooltip } from './SmartTooltip';

interface TrialStatusHeaderBadgeProps {
  daysRemaining: number;
  isUnlockedPerpetual: boolean;
  onOpenCoDesignModal: () => void;
}

export const TrialStatusHeaderBadge: React.FC<TrialStatusHeaderBadgeProps> = ({
  daysRemaining,
  isUnlockedPerpetual,
  onOpenCoDesignModal
}) => {
  if (isUnlockedPerpetual) {
    return (
      <SmartTooltip
        title="Enterprise Sovereign License"
        content="100% Perpetual On-Premises IP License Active. Zero recurring per-scanner SaaS taxes."
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold shadow-sm">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>PERPETUAL SOVEREIGN LICENSE</span>
        </div>
      </SmartTooltip>
    );
  }

  return (
    <SmartTooltip
      title="7-Day Enterprise Trial"
      content="Full-featured sovereign WMS trial active. Click to review trial status, request custom ERP connectors, or unlock perpetual license."
    >
      <button
        type="button"
        onClick={onOpenCoDesignModal}
        className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r from-blue-950/90 to-cyan-950/90 hover:from-blue-900 hover:to-cyan-900 border border-cyan-500/40 text-cyan-200 font-mono text-[11px] font-bold shadow-sm transition-all cursor-pointer group"
      >
        <Clock size={13} className="text-cyan-400 animate-pulse" />
        <span>7-Day Trial: <strong className="text-white">{daysRemaining} {daysRemaining === 1 ? 'Day' : 'Days'} Left</strong></span>
        <span className="hidden sm:inline text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 group-hover:bg-cyan-500/30">
          Review &bull; Buyout
        </span>
      </button>
    </SmartTooltip>
  );
};
