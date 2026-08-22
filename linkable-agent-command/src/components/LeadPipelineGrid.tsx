import React, { useState } from 'react';
import { Search, ExternalLink, Send, CheckCircle2, Eye, Layers } from 'lucide-react';
import { LeadRecord, CampaignVertical } from '../types';

interface Props {
  leads: LeadRecord[];
  onTriggerSingleFollowUp: (leadId: number) => void;
  selectedVertical: CampaignVertical;
  onSelectVertical: (vertical: CampaignVertical) => void;
}

export const LeadPipelineGrid: React.FC<Props> = ({
  leads,
  onTriggerSingleFollowUp,
  selectedVertical,
  onSelectVertical
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLeads = leads.filter((lead) => {
    const orgName = lead.companyName || lead.hospitalName || '';
    const matchesSearch =
      orgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVertical =
      selectedVertical === 'all' || lead.vertical === selectedVertical;

    const matchesStatus =
      statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesVertical && matchesStatus;
  });

  const getVerticalBadge = (vertical: CampaignVertical) => {
    switch (vertical) {
      case 'clinical':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            🏥 CLINICAL_HUD
          </span>
        );
      case 'claimguard':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30">
            🛡️ CLAIMGUARD_RCM
          </span>
        );
      case 'sitesafe':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-500/30">
            🏗️ SITESAFE_OS
          </span>
        );
      case 'omnistock':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            📦 OMNISTOCK_WMS
          </span>
        );
      case 'saccade':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/30">
            👁️ SACCADE_CRO
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'replied':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-500/40 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            REPLIED (HOT)
          </span>
        );
      case 'followed_up':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            FOLLOWED UP
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30">
            <Send className="w-3 h-3" />
            DELIVERED
          </span>
        );
      default:
        return null;
    }
  };

  const getSandboxUrl = (lead: LeadRecord) => {
    const org = encodeURIComponent(lead.companyName || lead.hospitalName || '');
    const name = encodeURIComponent(lead.contactName);
    switch (lead.vertical) {
      case 'clinical':
        return `https://clinical.linkable.it.com?prospect=${org}&name=${name}&mode=demo`;
      case 'claimguard':
        return `https://claimguard.linkable.it.com?prospect=${org}&name=${name}&mode=demo`;
      case 'sitesafe':
        return `https://sitesafe.linkable.it.com?prospect=${org}&name=${name}&mode=demo`;
      case 'omnistock':
        return `https://omnistock.linkable.it.com?prospect=${org}&name=${name}&mode=demo`;
      case 'saccade':
        return `https://saccade.linkable.it.com?prospect=${org}&name=${name}&mode=demo`;
      default:
        return `https://linkable.it.com?prospect=${org}`;
    }
  };

  const verticalCounts = {
    all: leads.length,
    clinical: leads.filter((l) => l.vertical === 'clinical').length,
    claimguard: leads.filter((l) => l.vertical === 'claimguard').length,
    sitesafe: leads.filter((l) => l.vertical === 'sitesafe').length,
    omnistock: leads.filter((l) => l.vertical === 'omnistock').length,
    saccade: leads.filter((l) => l.vertical === 'saccade').length,
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
      {/* Vertical Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/10">
        <button
          onClick={() => onSelectVertical('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
            selectedVertical === 'all'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Fleet ({verticalCounts.all})</span>
        </button>

        <button
          onClick={() => onSelectVertical('clinical')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
            selectedVertical === 'clinical'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span>🏥 Clinical HUD ({verticalCounts.clinical})</span>
        </button>

        <button
          onClick={() => onSelectVertical('claimguard')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
            selectedVertical === 'claimguard'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span>🛡️ ClaimGuard Defense ({verticalCounts.claimguard})</span>
        </button>

        <button
          onClick={() => onSelectVertical('sitesafe')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
            selectedVertical === 'sitesafe'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span>🏗️ SiteSafe OS ({verticalCounts.sitesafe})</span>
        </button>

        <button
          onClick={() => onSelectVertical('omnistock')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
            selectedVertical === 'omnistock'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span>📦 OmniStock WMS ({verticalCounts.omnistock})</span>
        </button>

        <button
          onClick={() => onSelectVertical('saccade')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
            selectedVertical === 'saccade'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span>👁️ Saccade CRO ({verticalCounts.saccade})</span>
        </button>
      </div>

      {/* Header & Search/Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            Target Pipeline Funnel & Engagement
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {filteredLeads.length} Targets
            </span>
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Verified executive decision makers, delivery telemetry & interactive sandbox links
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search company, executive, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#030712]/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#030712]/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">All Statuses</option>
            <option value="replied">Replied (Hot)</option>
            <option value="followed_up">Followed Up</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-slate-400 border-b border-white/5 pb-2">
              <th className="py-2.5 px-3 font-semibold">TARGET ORGANIZATION</th>
              <th className="py-2.5 px-3 font-semibold">EXECUTIVE CONTACT</th>
              <th className="py-2.5 px-3 font-semibold">VERTICAL</th>
              <th className="py-2.5 px-3 font-semibold">STATUS</th>
              <th className="py-2.5 px-3 font-semibold">ENGAGEMENT</th>
              <th className="py-2.5 px-3 font-semibold text-right">INTERACTIVE SANDBOX</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLeads.map((lead) => {
              const sandboxUrl = getSandboxUrl(lead);
              const orgName = lead.companyName || lead.hospitalName || 'Target Enterprise';

              return (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-900/50 transition-colors group"
                >
                  {/* Company / Hospital */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-white font-sans text-sm">
                      {orgName}
                    </div>
                    <div className="text-[11px] text-slate-400">{lead.country}</div>
                    {lead.painPoint && (
                      <div className="text-[10px] text-slate-500 italic truncate max-w-xs mt-0.5">
                        {lead.painPoint}
                      </div>
                    )}
                  </td>

                  {/* Contact */}
                  <td className="py-3 px-3">
                    <div className="text-slate-200 font-medium">{lead.contactName}</div>
                    <div className="text-[11px] text-slate-400">{lead.title}</div>
                    <div className="text-[10px] text-cyan-400/80">{lead.email}</div>
                  </td>

                  {/* Vertical */}
                  <td className="py-3 px-3">{getVerticalBadge(lead.vertical)}</td>

                  {/* Status */}
                  <td className="py-3 px-3">{getStatusBadge(lead.status)}</td>

                  {/* Engagement */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lead.openCount} opens</span>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Active {lead.lastEngagedAgo}
                    </div>
                  </td>

                  {/* Actions / Interactive Sandbox */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Live Demo Bot Sandbox Launcher */}
                      <a
                        href={sandboxUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 hover:border-cyan-400 text-accent-cyan font-bold transition-all text-[11px]"
                        title="Launch Personalized AI Demo Specialist Sandbox"
                      >
                        <span>Launch Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Single Follow-Up Action */}
                      <button
                        onClick={() => onTriggerSingleFollowUp(lead.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                        title="Dispatch Single Tailored Outreach / Follow-Up"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
