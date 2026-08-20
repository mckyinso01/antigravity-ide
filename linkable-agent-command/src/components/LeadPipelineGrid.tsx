import React, { useState } from 'react';
import { Search, ExternalLink, Send, CheckCircle2, Eye } from 'lucide-react';
import { LeadRecord, CampaignVertical } from '../types';

interface Props {
  leads: LeadRecord[];
  onTriggerSingleFollowUp: (leadId: number) => void;
}

export const LeadPipelineGrid: React.FC<Props> = ({ leads, onTriggerSingleFollowUp }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVertical, setSelectedVertical] = useState<CampaignVertical>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950/80 text-indigo-400 border border-indigo-500/30">
            🏥 CLINICAL_EHR
          </span>
        );
      case 'sitesafe':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/80 text-blue-400 border border-blue-500/30">
            🏗️ SITESAFE_OS
          </span>
        );
      case 'omnistock':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            📦 OMNISTOCK_WMS
          </span>
        );
      case 'saccade':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-400 border border-rose-500/30">
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

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
      {/* Table Header & Search/Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            Target Pipeline Funnel & Engagement
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {filteredLeads.length} Targets
            </span>
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Verified executive recipients, delivery timestamps & personalized demo sandbox links
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search hospital or CEO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#030712]/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Vertical Selector */}
          <select
            value={selectedVertical}
            onChange={(e) => setSelectedVertical(e.target.value as CampaignVertical)}
            className="bg-[#030712]/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">All Verticals (4)</option>
            <option value="clinical">Clinical ICU EHR</option>
            <option value="sitesafe">SiteSafe Safety OS</option>
            <option value="omnistock">OmniStock Spatial WMS</option>
            <option value="saccade">Saccade CRO</option>
          </select>

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
              const sandboxUrl = `https://clinical.linkable.it.com?prospect=${encodeURIComponent(
                lead.hospitalName
              )}&name=${encodeURIComponent(lead.contactName)}&mode=demo`;

              return (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-900/50 transition-colors group"
                >
                  {/* Hospital */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-white font-sans text-sm">
                      {lead.hospitalName}
                    </div>
                    <div className="text-[11px] text-slate-400">{lead.country}</div>
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
                        <span>Launch Demo Bot</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Single Follow-Up Action */}
                      <button
                        onClick={() => onTriggerSingleFollowUp(lead.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                        title="Dispatch Single Co-Design Follow-Up"
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
