import React, { useState } from 'react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { MetricCards } from './components/MetricCards';
import { LeadPipelineGrid } from './components/LeadPipelineGrid';
import { InboundIntelligenceFeed } from './components/InboundIntelligenceFeed';
import { CloudEngineModal } from './components/CloudEngineModal';
import { TelegramAlertModal } from './components/TelegramAlertModal';
import {
  INITIAL_LEADS,
  INITIAL_INBOUND_REPLIES,
  INITIAL_TELEMETRY,
} from './data/liveTelemetryData';
import { LeadRecord, InboundReply, CloudEngineTelemetry } from './types';
import {
  Activity,
  Layers,
  Inbox,
  Globe,
  ExternalLink,
} from 'lucide-react';

export const App: React.FC = () => {
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_LEADS);
  const [inboundReplies, setInboundReplies] = useState<InboundReply[]>(INITIAL_INBOUND_REPLIES);
  const [telemetry, setTelemetry] = useState<CloudEngineTelemetry>(INITIAL_TELEMETRY);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'inbound' | 'subdomains'>('pipeline');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bannerAlert, setBannerAlert] = useState<string | null>(null);

  const handleToggleAutoPilot = () => {
    setTelemetry((prev) => ({
      ...prev,
      autoPilotEnabled: !prev.autoPilotEnabled,
    }));
    setBannerAlert(
      !telemetry.autoPilotEnabled
        ? '⚡ Auto-Pilot Activated: Follow-ups will dispatch on 60m cron schedule.'
        : '⏸️ Manual Review Mode Enabled: Outbound dispatches paused.'
    );
    setTimeout(() => setBannerAlert(null), 4000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setBannerAlert('🔄 Telemetry synchronised with Google Cloud Run.');
      setTimeout(() => setBannerAlert(null), 3000);
    }, 800);
  };

  const handleTriggerSingleFollowUp = (leadId: number) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: 'followed_up',
              followedUpAt: new Date().toISOString(),
              lastEngagedAgo: 'Just now',
            }
          : l
      )
    );
    const targetLead = leads.find((l) => l.id === leadId);
    setBannerAlert(`🚀 Single Co-Design Follow-Up dispatched to ${targetLead?.hospitalName}!`);
    setTimeout(() => setBannerAlert(null), 4000);
  };

  const handleApproveAndSendReply = (replyId: string, _replyText: string) => {
    setInboundReplies((prev) =>
      prev.map((r) => (r.id === replyId ? { ...r, status: 'approved_sent' } : r))
    );
    setBannerAlert('✅ Executive reply successfully dispatched via SMTP!');
    setTimeout(() => setBannerAlert(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Navigation Bar */}
      <HeaderNavbar
        telemetry={telemetry}
        onToggleAutoPilot={handleToggleAutoPilot}
        onOpenCloudModal={() => setIsCloudModalOpen(true)}
        onOpenTelegramModal={() => setIsTelegramModalOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Real-time Banner Alert */}
      {bannerAlert && (
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-500/30 px-4 py-2 text-center text-xs font-mono text-cyan-300 flex items-center justify-center gap-2 animate-fadeIn">
          <Activity className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
          <span>{bannerAlert}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Top Metric Cards */}
        <MetricCards
          leads={leads}
          inboundReplies={inboundReplies}
          telemetry={telemetry}
        />

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-accent-cyan text-black shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>LEAD_PIPELINE ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inbound')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all relative ${
                activeTab === 'inbound'
                  ? 'bg-accent-cyan text-black shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>INBOUND_REPLIES ({inboundReplies.length})</span>
              {inboundReplies.some((r) => r.status === 'pending_review') && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('subdomains')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'subdomains'
                  ? 'bg-accent-cyan text-black shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>SUBDOMAIN_FLEET (5)</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
            LinkableAI Autonomous Systems • Founder: Mharc Gatan
          </div>
        </div>

        {/* Tab 1: Lead Pipeline */}
        {activeTab === 'pipeline' && (
          <LeadPipelineGrid
            leads={leads}
            onTriggerSingleFollowUp={handleTriggerSingleFollowUp}
          />
        )}

        {/* Tab 2: Inbound Reply Intelligence */}
        {activeTab === 'inbound' && (
          <InboundIntelligenceFeed
            replies={inboundReplies}
            onApproveAndSend={handleApproveAndSendReply}
          />
        )}

        {/* Tab 3: Subdomain Fleet Health */}
        {activeTab === 'subdomains' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Subdomain 1 */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    🏥 CLINICAL ICU EHR OS
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    21ms • HEALTHY
                  </span>
                </div>
                <h4 className="text-base font-bold text-white font-sans mb-1">
                  clinical.linkable.it.com
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  Critical Care ICU Telemetry, Bio-signals & FHIR EHR bridging.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400">AI Demo Bot: Active</span>
                <a
                  href="https://clinical.linkable.it.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-white hover:text-accent-cyan flex items-center gap-1"
                >
                  Visit Subdomain <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Subdomain 2 */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-blue-400">
                    🏗️ SITESAFE INDUSTRIAL OS
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    24ms • HEALTHY
                  </span>
                </div>
                <h4 className="text-base font-bold text-white font-sans mb-1">
                  sitesafe.linkable.it.com
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  Real-Time Computer Vision Hazard Detection & Weather Delays.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400">AI Demo Bot: Active</span>
                <a
                  href="https://sitesafe.linkable.it.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-white hover:text-accent-cyan flex items-center gap-1"
                >
                  Visit Subdomain <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Subdomain 3 */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    📦 OMNISTOCK SPATIAL WMS
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    18ms • HEALTHY
                  </span>
                </div>
                <h4 className="text-base font-bold text-white font-sans mb-1">
                  omnistock.linkable.it.com
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  3D Spatial Warehouse CAD, AGV Routing & FIFO Logistics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400">AI Demo Bot: Active</span>
                <a
                  href="https://omnistock.linkable.it.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-white hover:text-accent-cyan flex items-center gap-1"
                >
                  Visit Subdomain <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Subdomain 4 */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-rose-400">
                    👁️ SACCADE BIOMETRIC CRO
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    15ms • HEALTHY
                  </span>
                </div>
                <h4 className="text-base font-bold text-white font-sans mb-1">
                  saccade.linkable.it.com
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  Visual Attention Heatmaps, Cognitive Load & CRO Scoring.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400">AI Demo Bot: Active</span>
                <a
                  href="https://saccade.linkable.it.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-white hover:text-accent-cyan flex items-center gap-1"
                >
                  Visit Subdomain <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Subdomain 5 */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    🚀 MAIN ENTERPRISE HUB
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    19ms • HEALTHY
                  </span>
                </div>
                <h4 className="text-base font-bold text-white font-sans mb-1">
                  linkable.it.com
                </h4>
                <p className="text-xs text-slate-400 font-sans">
                  LinkableAI Master Headquarters, Product Showcase & Trial Engine.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400">AI Demo Bot: Active</span>
                <a
                  href="https://linkable.it.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-white hover:text-accent-cyan flex items-center gap-1"
                >
                  Visit Subdomain <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cloud Engine Telemetry Modal */}
      <CloudEngineModal
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        telemetry={telemetry}
      />

      {/* Telegram Alert Webhook Modal */}
      <TelegramAlertModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
      />
    </div>
  );
};
export default App;
