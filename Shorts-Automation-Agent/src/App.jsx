import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav.jsx';
import ScriptGeneratorStudio from './components/ScriptGeneratorStudio.jsx';
import AudioVoiceoverStudio from './components/AudioVoiceoverStudio.jsx';
import VideoCanvasRenderer from './components/VideoCanvasRenderer.jsx';
import ZeroDemonetizationAuditor from './components/ZeroDemonetizationAuditor.jsx';
import MultiPlatformScheduler from './components/MultiPlatformScheduler.jsx';
import AnalyticsAndLedgerHub from './components/AnalyticsAndLedgerHub.jsx';
import PricingAndStripeCheckout from './components/PricingAndStripeCheckout.jsx';
import { Wand2, Mic, Film, ShieldCheck, Send, BarChart3, CreditCard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('script');

  // Shared Studio State
  const [script, setScript] = useState(
    `[HOOK 0:00-0:03]: Did you know your brain falls for this psychological trick every single day? Here is the truth...

[POINT 1 0:03-0:12]: First, the Benjamin Franklin Effect. If you want someone to like you, don't do them a favor—ask them to do a small favor for you! Their brain rationalizes that they must care about you.

[POINT 2 0:12-0:25]: Second, the Door-in-the-Face Technique. Ask for something ridiculously huge first. When they say no, immediately ask for your actual request. It instantly feels small.

[CALL TO ACTION 0:25-0:45]: Save this short before you forget it and hit subscribe for daily high-income psychology breakdowns!`
  );

  const [voiceConfig, setVoiceConfig] = useState({
    voice: 'en-US-ChristopherNeural',
    rate: '+0%',
    pitch: '+2Hz'
  });

  const navigationItems = [
    { id: 'script', label: '1. Script AI Studio', icon: Wand2 },
    { id: 'audio', label: '2. Edge-TTS Audio', icon: Mic },
    { id: 'canvas', label: '3. 9:16 Canvas Render', icon: Film },
    { id: 'audit', label: '4. Demonetization Audit', icon: ShieldCheck },
    { id: 'schedule', label: '5. Multi-Channel Dispatch', icon: Send },
    { id: 'pricing', label: '6. Stripe Pricing & Checkout', icon: CreditCard },
    { id: 'analytics', label: '7. Analytics & Ledger', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* Header Bar */}
      <HeaderNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {/* Navigation Rail Tabs */}
        <div className="p-1.5 rounded-2xl cyber-glass border border-slate-800 flex items-center justify-between overflow-x-auto gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Views */}
        <main>
          {activeTab === 'script' && (
            <ScriptGeneratorStudio
              script={script}
              setScript={setScript}
              onNext={() => setActiveTab('audio')}
            />
          )}

          {activeTab === 'audio' && (
            <AudioVoiceoverStudio
              script={script}
              voiceConfig={voiceConfig}
              setVoiceConfig={setVoiceConfig}
              onNext={() => setActiveTab('canvas')}
            />
          )}

          {activeTab === 'canvas' && (
            <VideoCanvasRenderer
              script={script}
              voiceConfig={voiceConfig}
              onNext={() => setActiveTab('audit')}
            />
          )}

          {activeTab === 'audit' && (
            <ZeroDemonetizationAuditor
              onNext={() => setActiveTab('schedule')}
            />
          )}

          {activeTab === 'schedule' && (
            <MultiPlatformScheduler
              onNext={() => setActiveTab('pricing')}
            />
          )}

          {activeTab === 'pricing' && (
            <PricingAndStripeCheckout />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsAndLedgerHub />
          )}
        </main>

      </div>

      {/* Footer Status Bar */}
      <footer className="border-t border-slate-800/80 bg-[#030712]/90 px-6 py-4 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Antigravity Shorts Studio • Stripe LIVE Connected • 100% Monetized</span>
        </div>
        <div>
          Target URL: <a href="https://gatzdevs.surge.sh" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">https://gatzdevs.surge.sh</a>
        </div>
      </footer>

    </div>
  );
}
