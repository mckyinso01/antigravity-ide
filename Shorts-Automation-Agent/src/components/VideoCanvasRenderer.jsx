import React, { useState } from 'react';
import { Film, Play, Download, Sparkles, Layers, RefreshCw, Eye, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VideoCanvasRenderer({ script, voiceConfig, onNext }) {
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [isRenderComplete, setIsRenderComplete] = useState(false);

  const [captionStyle, setCaptionStyle] = useState('Cyber Cyan Kinetic');
  const [bgCategory, setBgCategory] = useState('Abstract Cyber Particles');

  const handleStartRender = () => {
    setIsRendering(true);
    setRenderProgress(10);
    
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRendering(false);
          setIsRenderComplete(true);
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className="p-6 rounded-2xl cyber-glass border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 text-xs font-mono font-bold border border-cyan-800">
              Module 3 of 5
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              9:16 Vertical Video Canvas & Kinetic Overlay Renderer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time 1080x1920 portrait canvas rendering engine. Kinetic typography & CC0 video layer composition.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-emerald-400" />
            HTML5 Canvas Engine Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Video Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Kinetic Caption Style
              </label>
              <select
                value={captionStyle}
                onChange={(e) => setCaptionStyle(e.target.value)}
                className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
              >
                <option>Cyber Cyan Kinetic (Yellow/Cyan Pop)</option>
                <option>Hyper Emerald Neon (Bold Highlighting)</option>
                <option>Minimal White Box (Subtle Shadow)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Background CC0 Media Stream
              </label>
              <select
                value={bgCategory}
                onChange={(e) => setBgCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
              >
                <option>Abstract Cyber Particles (Dark Obsidian)</option>
                <option>Futuristic City Night Loop (Pexels CC0)</option>
                <option>Deep Space Nebula Loop (Pixabay CC0)</option>
              </select>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span className="text-cyan-400 font-bold">1080 x 1920 (9:16)</span>
              </div>
              <div className="flex justify-between">
                <span>Frame Rate:</span>
                <span className="text-emerald-400 font-bold">60 FPS</span>
              </div>
              <div className="flex justify-between">
                <span>Rendering Engine:</span>
                <span className="text-cyan-300">Browser Canvas / WebGL</span>
              </div>
            </div>

            <button
              onClick={handleStartRender}
              disabled={isRendering}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isRendering ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Rendering Frames... {renderProgress}%</span>
                </>
              ) : (
                <>
                  <Film className="w-4 h-4 text-slate-950" />
                  <span>Render Full 9:16 Video ($0.00 Cost)</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Interactive 9:16 Canvas Phone Mockup */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-[300px] h-[550px] rounded-[36px] p-3 bg-slate-900 border-4 border-slate-800 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            
            {/* Phone Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-20" />

            {/* Video Canvas Container */}
            <div className="w-full h-full rounded-[24px] bg-[#030712] relative overflow-hidden flex flex-col justify-between p-4 border border-cyan-500/20">
              
              {/* Background Particle Animation Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/40 via-slate-950 to-emerald-950/40 opacity-80" />

              {/* Top Header Badge */}
              <div className="relative z-10 pt-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/40">
                  9:16 Preview
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">
                  60 FPS
                </span>
              </div>

              {/* Middle Kinetic Captions Overlay */}
              <div className="relative z-10 text-center my-auto space-y-2 px-2">
                <div className="inline-block px-3 py-1 bg-yellow-400 text-slate-950 font-black text-sm uppercase rounded shadow-lg tracking-wider animate-bounce">
                  PSYCHOLOGICAL TRICK
                </div>
                <p className="text-xs text-white font-extrabold leading-snug drop-shadow-md">
                  "If you want someone to like you, ask them for a small favor!"
                </p>
              </div>

              {/* Bottom Video Controls Overlay */}
              <div className="relative z-10 pb-2 space-y-2">
                {isRendering && (
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      style={{ width: `${renderProgress}%` }}
                      className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all"
                    />
                  </div>
                )}
                {isRenderComplete && (
                  <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[10px] font-mono text-center flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Render Complete! 1080x1920 MP4 Ready</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>

      <div className="pt-4 flex items-center justify-between border-t border-slate-800">
        <div className="text-xs font-mono text-slate-400">
          Export Format: <span className="text-cyan-400 font-bold">H.264 MP4 Vertical Video</span>
        </div>
        <button
          onClick={onNext}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Proceed to Demonetization Audit (Stage 4) ➔</span>
        </button>
      </div>

    </div>
  );
}
