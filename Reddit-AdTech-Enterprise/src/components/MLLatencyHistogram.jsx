import React, { useState } from 'react';
import { Cpu, Zap, ShieldCheck, AlertCircle, RefreshCw, BarChart2, Server, Gauge, Check } from 'lucide-react';

export default function MLLatencyHistogram() {
  const [selectedNodePool, setSelectedNodePool] = useState('ALL');
  const [percentileTarget, setPercentileTarget] = useState('p99');
  const [isSimulatingSpike, setIsSimulatingSpike] = useState(false);
  const [isRebalanced, setIsRebalanced] = useState(false);

  // Latency Buckets (in milliseconds)
  const buckets = [
    { range: '0.0 - 0.5 ms', count: 420000, color: 'bg-emerald-500' },
    { range: '0.5 - 1.0 ms', count: 850000, color: 'bg-emerald-500' },
    { range: '1.0 - 1.5 ms', count: 1200000, color: 'bg-emerald-400' },
    { range: '1.5 - 2.0 ms', count: 980000, color: 'bg-emerald-400' },
    { range: '2.0 - 2.5 ms', count: isSimulatingSpike && !isRebalanced ? 650000 : 310000, color: 'bg-amber-400' },
    { range: '2.5 - 3.0 ms', count: isSimulatingSpike && !isRebalanced ? 420000 : 120000, color: 'bg-amber-500' },
    { range: '3.0 - 4.0 ms', count: isSimulatingSpike && !isRebalanced ? 280000 : 45000, color: isSimulatingSpike && !isRebalanced ? 'bg-rose-500 animate-pulse' : 'bg-amber-500' },
    { range: '4.0+ ms', count: isSimulatingSpike && !isRebalanced ? 180000 : 8000, color: isSimulatingSpike && !isRebalanced ? 'bg-rose-600 animate-pulse' : 'bg-rose-500' }
  ];

  const maxCount = Math.max(...buckets.map(b => b.count));

  const triggerSpike = () => {
    setIsSimulatingSpike(true);
    setIsRebalanced(false);
  };

  const triggerRebalance = () => {
    setIsRebalanced(true);
    setTimeout(() => {
      setIsSimulatingSpike(false);
      setIsRebalanced(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-[#2D3748] shadow-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Median Latency (p50)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">1.84 ms</div>
          <div className="text-xs text-slate-500 mt-1">SLA Target: &le; 2.0ms</div>
        </div>

        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-[#2D3748] shadow-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">p95 Latency</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">3.42 ms</div>
          <div className="text-xs text-slate-500 mt-1">95% auctions evaluated</div>
        </div>

        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-[#2D3748] shadow-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">p99 Latency (Strict SLA)</div>
          <div className={`text-2xl font-bold font-mono mt-1 ${isSimulatingSpike && !isRebalanced ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
            {isSimulatingSpike && !isRebalanced ? '14.25 ms ⚠️' : '8.15 ms'}
          </div>
          <div className="text-xs text-slate-500 mt-1">Hard Cap: &le; 20.0ms</div>
        </div>

        <div className="bg-[#1A1F26] p-5 rounded-2xl border border-[#2D3748] shadow-lg">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active GPU Clusters</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">128 Pods</div>
          <div className="text-xs text-emerald-400 mt-1">NVIDIA A100 / H100 Fleet</div>
        </div>
      </div>

      {/* Control Buttons & Node Pool Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1A1F26] p-4 rounded-2xl border border-[#2D3748]">
        <div className="flex items-center space-x-3">
          <Server className="w-5 h-5 text-[#FF4500]" />
          <span className="text-sm font-semibold text-white">Node Pool Selector:</span>
          <select
            value={selectedNodePool}
            onChange={e => setSelectedNodePool(e.target.value)}
            className="bg-[#0F1419] border border-[#2D3748] rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#FF4500]"
          >
            <option value="ALL">All GPU Node Pools (US-East, US-West, EU-Central)</option>
            <option value="gpu-cluster-us-east-a100">gpu-cluster-us-east-a100 (64 Pods)</option>
            <option value="gpu-cluster-us-west-h100">gpu-cluster-us-west-h100 (48 Pods)</option>
            <option value="cpu-fallback-us-central">cpu-fallback-us-central (16 Pods)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={triggerSpike}
            disabled={isSimulatingSpike && !isRebalanced}
            className="px-3.5 py-2 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-xs font-medium transition-all"
          >
            Simulate Latency Spike
          </button>

          <button
            onClick={triggerRebalance}
            className="px-3.5 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-xl text-xs font-medium shadow-md transition-all flex items-center space-x-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRebalanced ? 'animate-spin' : ''}`} />
            <span>Self-Healing Load Rebalance</span>
          </button>
        </div>
      </div>

      {/* Main Histogram Visualizer */}
      <div className="bg-[#1A1F26] p-6 rounded-2xl border border-[#2D3748] shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-[#FF4500]" />
            <h3 className="text-lg font-bold text-white">Sub-Millisecond Inference Latency Distribution</h3>
          </div>
          {isSimulatingSpike && !isRebalanced && (
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30 animate-bounce">
              <AlertCircle className="w-4 h-4" />
              <span>SLO Alert: P99 Latency Breach on GPU-Cluster-East</span>
            </div>
          )}
          {isRebalanced && (
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              <Check className="w-4 h-4" />
              <span>Load Rebalanced across H100 Node Pool</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {buckets.map((b, idx) => {
            const pct = Math.round((b.count / maxCount) * 100);
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>{b.range}</span>
                  <span>{b.count.toLocaleString()} auctions ({pct}%)</span>
                </div>
                <div className="w-full bg-[#0F1419] h-5 rounded-lg overflow-hidden p-0.5 border border-[#2D3748]">
                  <div
                    className={`h-full rounded-md transition-all duration-700 ${b.color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-[#2D3748] flex items-center justify-between text-xs text-slate-400 font-mono">
          <div>Monitored via OpenTelemetry C++ SDK • Nanosecond Timer Resolution</div>
          <div className="text-emerald-400 font-semibold">Triton Inference Server v24.02</div>
        </div>
      </div>
    </div>
  );
}
