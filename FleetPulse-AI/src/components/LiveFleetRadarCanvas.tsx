import React, { useEffect, useRef } from 'react';
import { Radio, ShieldCheck, Activity, Zap } from 'lucide-react';

export const LiveFleetRadarCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const nodes = [
      { x: 120, y: 80, name: 'TRK-901', speed: '62mph', status: 'normal' },
      { x: 260, y: 150, name: 'TRK-902', speed: '58mph', status: 'alert' },
      { x: 380, y: 90, name: 'TRK-903', speed: '65mph', status: 'autonomous' },
      { x: 200, y: 220, name: 'TRK-904', speed: '60mph', status: 'normal' },
      { x: 450, y: 190, name: 'TRK-905', speed: '64mph', status: 'normal' }
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark Spatial Grid Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid Lines
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.15)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Radar Concentric Sweep Circles
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      for (let r = radius / 3; r <= radius; r += radius / 3) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(13, 148, 136, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Rotating Radar Beam
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);

      const gradient = ctx.createConicGradient(0, 0, 0);
      gradient.addColorStop(0, 'rgba(13, 148, 136, 0.4)');
      gradient.addColorStop(0.2, 'rgba(13, 148, 136, 0.05)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, 0, Math.PI / 2);
      ctx.closePath();
      ctx.fill();

      // Sweeping Radar Line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      // Render Moving Transport Nodes
      nodes.forEach((n, i) => {
        // Slow organic jitter movement
        n.x += Math.sin(angle + i) * 0.3;
        n.y += Math.cos(angle + i) * 0.3;

        // Node Glow Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = n.status === 'alert' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(20, 184, 166, 0.3)';
        ctx.fill();

        // Node Center Dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = n.status === 'alert' ? '#ef4444' : '#14b8a6';
        ctx.fill();

        // Label Text
        ctx.font = '10px monospace';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText(`${n.name} (${n.speed})`, n.x + 10, n.y + 3);
      });

      angle += 0.02;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-[#090d16]">
      <div className="absolute top-3 left-3 z-10 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs text-white">
        <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
        <span className="font-bold text-teal-300 font-mono text-[11px]">LIVE TELEMATICS RADAR (120Hz STREAM)</span>
      </div>

      <div className="absolute top-3 right-3 z-10 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs text-white">
        <Activity className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-bold text-emerald-400 font-mono text-[11px]">450 NODES ONLINE</span>
      </div>

      <canvas
        ref={canvasRef}
        width={580}
        height={240}
        className="w-full h-60 object-cover"
      />
    </div>
  );
};
