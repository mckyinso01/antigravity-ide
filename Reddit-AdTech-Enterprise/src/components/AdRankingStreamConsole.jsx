import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, Search, Download, Filter, Zap, RefreshCw, Layers, Sliders, CheckCircle, AlertTriangle } from 'lucide-react';

export default function AdRankingStreamConsole({ onSelectCampaign }) {
  const [isStreaming, setIsStreaming] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubreddit, setSelectedSubreddit] = useState('ALL');
  const [density, setDensity] = useState('spacious'); // spacious vs compact
  const [events, setEvents] = useState([
    {
      id: 'auc_889101',
      timestamp: '18:40:02.104',
      timestampNs: '1785133776104928102',
      subreddit: 'r/technology',
      advertiser: 'AcmeCorp Cloud',
      campaignId: 'cmp_acme_cloud_2026',
      adTitle: 'Deploy 1.2B Parameter LLMs in < 5 Minutes',
      bidCpm: 28.50,
      pCtr: 0.048,
      pCvr: 0.125,
      relevance: 1.45,
      eCpm: 64.20,
      won: true,
      latencyMs: 1.84,
      nodePool: 'gpu-cluster-us-east-a100'
    },
    {
      id: 'auc_889102',
      timestamp: '18:40:02.189',
      timestampNs: '1785133776189201490',
      subreddit: 'r/gaming',
      advertiser: 'Nexus Games Studio',
      campaignId: 'cmp_nexus_rpg_launch',
      adTitle: 'Pre-Order Elden Realm VR Today on Steam',
      bidCpm: 18.20,
      pCtr: 0.062,
      pCvr: 0.098,
      relevance: 1.20,
      eCpm: 41.80,
      won: true,
      latencyMs: 2.10,
      nodePool: 'gpu-cluster-us-east-a100'
    },
    {
      id: 'auc_889103',
      timestamp: '18:40:02.245',
      timestampNs: '1785133776245019283',
      subreddit: 'r/wallstreetbets',
      advertiser: 'AlphaQuant Trading',
      campaignId: 'cmp_alpha_quant_options',
      adTitle: 'Zero-Commission Algo Trading Terminal',
      bidCpm: 35.00,
      pCtr: 0.035,
      pCvr: 0.180,
      relevance: 1.80,
      eCpm: 88.50,
      won: true,
      latencyMs: 1.45,
      nodePool: 'gpu-cluster-us-west-h100'
    },
    {
      id: 'auc_889104',
      timestamp: '18:40:02.312',
      timestampNs: '1785133776312948201',
      subreddit: 'r/programming',
      advertiser: 'DevPulse Monitoring',
      campaignId: 'cmp_devpulse_apm',
      adTitle: 'Real-Time Distributed Tracing for K8s',
      bidCpm: 14.00,
      pCtr: 0.029,
      pCvr: 0.075,
      relevance: 1.10,
      eCpm: 22.40,
      won: false,
      latencyMs: 3.89,
      nodePool: 'cpu-fallback-us-central'
    },
    {
      id: 'auc_889105',
      timestamp: '18:40:02.401',
      timestampNs: '1785133776401928374',
      subreddit: 'r/askreddit',
      advertiser: 'GlobalVPN Security',
      campaignId: 'cmp_vpn_privacy_sale',
      adTitle: 'Protect Your IP - 70% Off Annual Plan',
      bidCpm: 12.50,
      pCtr: 0.051,
      pCvr: 0.088,
      relevance: 1.05,
      eCpm: 28.10,
      won: true,
      latencyMs: 1.95,
      nodePool: 'gpu-cluster-eu-central-a100'
    }
  ]);

  // Simulate Live High-Throughput Stream
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const subreddits = ['r/technology', 'r/gaming', 'r/wallstreetbets', 'r/programming', 'r/askreddit', 'r/crypto', 'r/science'];
      const advertisers = ['AcmeCorp Cloud', 'Nexus Games Studio', 'AlphaQuant Trading', 'DevPulse APM', 'GlobalVPN', 'Stripe Billing', 'Datadog Engine'];
      const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)];
      const randomAdv = advertisers[Math.floor(Math.random() * advertisers.length)];
      const randomBid = parseFloat((10 + Math.random() * 30).toFixed(2));
      const randomCtr = parseFloat((0.02 + Math.random() * 0.06).toFixed(3));
      const randomCvr = parseFloat((0.05 + Math.random() * 0.15).toFixed(3));
      const randomRel = parseFloat((1.0 + Math.random() * 0.8).toFixed(2));
      const randomEcpm = parseFloat((randomBid + (randomCtr * randomCvr * 1000) * randomRel).toFixed(2));
      const randomLatency = parseFloat((1.1 + Math.random() * 2.5).toFixed(2));
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;

      const newEvent = {
        id: `auc_${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: timeStr,
        timestampNs: `${Date.now()}948201`,
        subreddit: randomSub,
        advertiser: randomAdv,
        campaignId: `cmp_${randomAdv.toLowerCase().replace(/\s+/g, '_')}_2026`,
        adTitle: `Promoted: Enterprise Solution for ${randomSub}`,
        bidCpm: randomBid,
        pCtr: randomCtr,
        pCvr: randomCvr,
        relevance: randomRel,
        eCpm: randomEcpm,
        won: randomEcpm > 30.0,
        latencyMs: randomLatency,
        nodePool: randomLatency > 3.0 ? 'cpu-fallback-us-central' : 'gpu-cluster-us-east-a100'
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredEvents = events.filter(ev => {
    const matchesSearch = ev.adTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.advertiser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub = selectedSubreddit === 'ALL' || ev.subreddit === selectedSubreddit;
    return matchesSearch && matchesSub;
  });

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredEvents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `reddit_ad_auction_telemetry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Telemetry Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1A1F26] p-5 rounded-2xl border border-[#2D3748] shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#FF4500]/10 rounded-xl border border-[#FF4500]/30 text-[#FF4500]">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white tracking-wide">Live Ad Auction Telemetry Stream</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${isStreaming ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                {isStreaming ? 'STREAMING ACTIVE (1.5M/s)' : 'PAUSED'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Protobuf v1 over Confluent Kafka • Triton ML Model Latency Monitored</p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all shadow-md ${isStreaming ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
          >
            {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isStreaming ? 'Pause Feed' : 'Resume Feed'}</span>
          </button>

          <button
            onClick={exportJSON}
            className="flex items-center space-x-2 px-4 py-2 bg-[#2D3748]/60 text-slate-200 hover:bg-[#2D3748] border border-slate-700 rounded-xl text-sm font-medium transition-all"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search ad title, advertiser, or auction ID... (Backspace to clear)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1F26] border border-[#2D3748] rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] transition-all"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedSubreddit}
            onChange={e => setSelectedSubreddit(e.target.value)}
            className="w-full bg-[#1A1F26] border border-[#2D3748] rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#FF4500]"
          >
            <option value="ALL">All Subreddits (100k+ Active)</option>
            <option value="r/technology">r/technology</option>
            <option value="r/gaming">r/gaming</option>
            <option value="r/wallstreetbets">r/wallstreetbets</option>
            <option value="r/programming">r/programming</option>
            <option value="r/askreddit">r/askreddit</option>
          </select>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => setDensity(density === 'spacious' ? 'compact' : 'spacious')}
            className="px-3 py-2 bg-[#1A1F26] border border-[#2D3748] rounded-xl text-xs font-mono text-slate-300 hover:text-white"
          >
            Density: <span className="text-[#FF4500] font-bold capitalize">{density}</span>
          </button>
        </div>
      </div>

      {/* Main Telemetry Data Stream Table */}
      <div className="bg-[#1A1F26] rounded-2xl border border-[#2D3748] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0F1419] border-b border-[#2D3748] text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Auction ID / Time</th>
                <th className="py-3.5 px-4">Subreddit</th>
                <th className="py-3.5 px-4">Advertiser & Ad Title</th>
                <th className="py-3.5 px-4 text-right">Base Bid</th>
                <th className="py-3.5 px-4 text-right">pCTR / pCVR</th>
                <th className="py-3.5 px-4 text-right">Computed eCPM</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">ML Latency</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D3748]/50">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-500 font-mono">
                    No auction events match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredEvents.map(ev => (
                  <tr key={ev.id} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="py-3 px-4 font-mono text-xs text-slate-300">
                      <div className="font-bold text-white">{ev.id}</div>
                      <div className="text-slate-500 text-[10px]">{ev.timestamp}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-[#0079D3] border border-[#0079D3]/30">
                        {ev.subreddit}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs truncate">
                      <div className="text-slate-200 font-medium text-xs group-hover:text-[#FF4500] transition-colors">{ev.adTitle}</div>
                      <div className="text-xs text-slate-500">{ev.advertiser}</div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-xs text-slate-300">
                      ${ev.bidCpm.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-xs text-slate-400">
                      <div>{(ev.pCtr * 100).toFixed(1)}% / {(ev.pCvr * 100).toFixed(1)}%</div>
                      <div className="text-[10px] text-slate-500">Rel: {ev.relevance.toFixed(2)}x</div>
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-sm font-bold text-emerald-400">
                      ${ev.eCpm.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {ev.won ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" /> WON
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-500 border border-slate-700">
                          OUTBID
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-xs">
                      <span className={`${ev.latencyMs > 2.5 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                        {ev.latencyMs.toFixed(2)} ms
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onSelectCampaign(ev.campaignId)}
                        className="p-1.5 bg-[#FF4500]/10 text-[#FF4500] hover:bg-[#FF4500] hover:text-white rounded-lg transition-all"
                        title="Configure Campaign Budget Optimizer"
                      >
                        <Sliders className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
