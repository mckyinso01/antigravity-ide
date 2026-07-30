import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Database, CheckCircle } from 'lucide-react';

export default function AnalyticsAndLedgerHub() {
  const stats = [
    { label: 'Total Videos Generated', value: '142', change: '+24 this week' },
    { label: 'Total Viral Views (YT/TikTok/Reels)', value: '1.24M', change: '+340k this week' },
    { label: 'Total Operational Cost', value: '$0.00', change: '100% Free Open-Source Stack' },
    { label: 'Monetization Status', value: '100% Eligible', change: '0 Reused Content Strikes' }
  ];

  const recentDispatches = [
    { id: 'disp_001', topic: 'Top 5 Psychological Tricks That Control Conversations', views: '452.1k', platform: 'YouTube Shorts', date: '2026-07-28' },
    { id: 'disp_002', topic: '3 Dark Secrets About Space Science', views: '312.8k', platform: 'TikTok CRP', date: '2026-07-27' },
    { id: 'disp_003', topic: 'Why 99% of People Fail at Consistency', views: '280.4k', platform: 'Instagram Reels', date: '2026-07-26' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title Banner */}
      <div className="p-6 rounded-2xl cyber-glass border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 text-xs font-mono font-bold border border-cyan-800">
              Module 6 of 6
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              Analytics Telemetry & WORM Audit Trail Ledger
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time viral view metrics, zero-cost operational verification, and immutable SHA-256 dispatch ledger.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            Telemetry Active
          </span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-400">{s.label}</div>
            <div className="text-2xl font-black text-white font-display">{s.value}</div>
            <div className="text-[11px] font-mono text-emerald-400">{s.change}</div>
          </div>
        ))}
      </div>

      {/* WORM Audit Ledger Table */}
      <div className="p-6 rounded-2xl cyber-glass border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>WORM SHA-256 Campaign Audit Ledger</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono">
            Immutable Storage
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="pb-3">Dispatch ID</th>
                <th className="pb-3">Campaign Topic</th>
                <th className="pb-3">Platform</th>
                <th className="pb-3">Views</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
              {recentDispatches.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition">
                  <td className="py-3 text-cyan-400 font-bold">{item.id}</td>
                  <td className="py-3 font-sans font-medium text-slate-100 max-w-xs truncate">{item.topic}</td>
                  <td className="py-3 text-slate-300">{item.platform}</td>
                  <td className="py-3 text-emerald-400 font-bold">{item.views}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                      100% Monetized
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
