import React, { useState, useEffect } from 'react';
import { Activity, BarChart2, ShieldCheck, Sliders, Sun, Moon, Search, Command, ChevronLeft, ChevronRight, CheckCircle2, Lock, ExternalLink, Download } from 'lucide-react';
import AdRankingStreamConsole from './components/AdRankingStreamConsole';
import MLLatencyHistogram from './components/MLLatencyHistogram';
import CampaignBudgetOptimizerModal from './components/CampaignBudgetOptimizerModal';
import AdPolicyComplianceAuditor from './components/AdPolicyComplianceAuditor';
import GlobalCommandPaletteModal from './components/GlobalCommandPaletteModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('telemetry'); // telemetry, latency, auditor
  const [isLeftRailCollapsed, setIsLeftRailCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [isOptimizerModalOpen, setIsOptimizerModalOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenOptimizer = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setIsOptimizerModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-[#0F1419] text-slate-100' : 'bg-[#0B1C30] text-white'}`}>
      
      {/* Top Telemetry Header */}
      <header className={`border-b px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md ${isDarkMode ? 'bg-[#0F1419]/90 border-[#2D3748]' : 'bg-[#0B1C30]/90 border-slate-200'}`}>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLeftRailCollapsed(!isLeftRailCollapsed)}
            className={`p-2 rounded-xl border transition-all ${isDarkMode ? 'bg-[#1A1F26] border-[#2D3748] hover:bg-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-300'}`}
            title="Toggle Left Rail Collapse"
          >
            {isLeftRailCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#FF4500] rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-[#FF4500]/30 text-lg">
              r/
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-base tracking-tight">Reddit Enterprise AdTech</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/30">
                  MLOps v4.2
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">1.5M Bids/sec • Triton ML Inference Engine</p>
            </div>
          </div>
        </div>

        {/* Search & Top Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className={`flex items-center space-x-3 px-4 py-2 rounded-xl border text-xs font-mono transition-all ${isDarkMode ? 'bg-[#1A1F26] border-[#2D3748] text-slate-400 hover:border-[#FF4500] hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-400'}`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search or type command...</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded text-[10px] font-bold">Ctrl+K</kbd>
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition-all ${isDarkMode ? 'bg-[#1A1F26] border-[#2D3748] text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-300 text-slate-300 hover:bg-slate-200'}`}
            title="Toggle Light / Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="https://gatzdevs.surge.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#FF4500] text-white hover:bg-[#FF4500]/90 rounded-xl text-xs font-bold transition-all shadow-md shadow-[#FF4500]/20"
          >
            <span>Live Surge Target</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Body Layout (Fluid Edge-to-Edge Container) */}
      <div className="flex-1 flex w-full">
        
        {/* Left Navigation Rail */}
        <aside className={`transition-all duration-300 border-r flex flex-col justify-between p-4 ${isLeftRailCollapsed ? 'w-16' : 'w-64'} ${isDarkMode ? 'bg-[#0F1419] border-[#2D3748]' : 'bg-slate-100 border-slate-200'}`}>
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === 'telemetry' ? 'bg-[#FF4500] text-white shadow-lg shadow-[#FF4500]/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'}`}
            >
              <Activity className="w-5 h-5 flex-shrink-0" />
              {!isLeftRailCollapsed && <span>Ad Auction Stream</span>}
            </button>

            <button
              onClick={() => setActiveTab('latency')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === 'latency' ? 'bg-[#FF4500] text-white shadow-lg shadow-[#FF4500]/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'}`}
            >
              <BarChart2 className="w-5 h-5 flex-shrink-0" />
              {!isLeftRailCollapsed && <span>ML Latency Histogram</span>}
            </button>

            <button
              onClick={() => setActiveTab('auditor')}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === 'auditor' ? 'bg-[#FF4500] text-white shadow-lg shadow-[#FF4500]/20' : 'text-slate-400 hover:bg-slate-800/40 hover:text-white'}`}
            >
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              {!isLeftRailCollapsed && <span>Policy Auditor</span>}
            </button>
          </div>

          {!isLeftRailCollapsed && (
            <div className="p-4 bg-[#1A1F26] rounded-2xl border border-[#2D3748] space-y-2">
              <div className="text-xs font-bold text-slate-300">System Status</div>
              <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All 4 Modules Active</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Target: https://gatzdevs.surge.sh</div>
            </div>
          )}
        </aside>

        {/* Main View Reading / Editing Canvas */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'telemetry' && (
            <AdRankingStreamConsole onSelectCampaign={handleOpenOptimizer} />
          )}

          {activeTab === 'latency' && (
            <MLLatencyHistogram />
          )}

          {activeTab === 'auditor' && (
            <AdPolicyComplianceAuditor />
          )}
        </main>
      </div>

      {/* Campaign Budget Optimizer Slide-Over Modal */}
      <CampaignBudgetOptimizerModal
        campaignId={selectedCampaignId}
        isOpen={isOptimizerModalOpen}
        onClose={() => setIsOptimizerModalOpen(false)}
      />

      {/* Global Command Palette Modal */}
      <GlobalCommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}

