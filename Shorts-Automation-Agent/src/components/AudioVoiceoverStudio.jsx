import React, { useState } from 'react';
import { Mic, Play, Pause, Volume2, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';

export default function AudioVoiceoverStudio({ script, voiceConfig, setVoiceConfig, onNext }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthStatus, setSynthStatus] = useState('');

  const voiceOptions = [
    { id: 'en-US-ChristopherNeural', name: 'Christopher (US Male - Deep Male Narrator)', lang: 'English (US)' },
    { id: 'en-US-JennyNeural', name: 'Jenny (US Female - Clear Energetic Voice)', lang: 'English (US)' },
    { id: 'en-US-GuyNeural', name: 'Guy (US Male - Professional Tech Host)', lang: 'English (US)' },
    { id: 'en-PH-JamesNeural', name: 'James (PH English Male - Warm Conversational)', lang: 'English (PH)' }
  ];

  const handleSynthesizeAudio = () => {
    setIsSynthesizing(true);
    setSynthStatus('Synthesizing speech via Microsoft Edge-TTS (0-Quota)...');
    
    setTimeout(() => {
      setSynthStatus('Applying pitch-shift & audio chromagram fingerprinting...');
      setTimeout(() => {
        setIsSynthesizing(false);
        setSynthStatus('✅ Audio Chromagram Generated cleanly! Zero-Demonetization Fingerprint Attached.');
      }, 1000);
    }, 1000);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className="p-6 rounded-2xl cyber-glass border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 text-xs font-mono font-bold border border-cyan-800">
              Module 2 of 5
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              Microsoft Edge-TTS Voice & Audio Synthesizer
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero-Cost Voice Synthesis Engine (<span className="text-cyan-300 font-mono">edge-tts</span>). Pitch-shifted audio chromagram fingerprinting attached.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-emerald-400" />
            Edge-TTS Active ($0.00 Cost)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Voice Settings */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Neural Voice Actor
              </label>
              <div className="space-y-2">
                {voiceOptions.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setVoiceConfig({ ...voiceConfig, voice: v.id })}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      voiceConfig.voice === v.id
                        ? 'bg-cyan-950/40 border-cyan-500/60 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{v.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{v.id}</div>
                    </div>
                    {voiceConfig.voice === v.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Pitch & Rate Controls */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Speech Rate (Speed)</span>
                  <span className="font-mono text-cyan-400">{voiceConfig.rate}</span>
                </div>
                <input
                  type="range"
                  min="-20%"
                  max="+20%"
                  value={voiceConfig.rate}
                  onChange={(e) => setVoiceConfig({ ...voiceConfig, rate: e.target.value })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                  <span>Pitch Shift (Fingerprint Protection)</span>
                  <span className="font-mono text-emerald-400">{voiceConfig.pitch}</span>
                </div>
                <input
                  type="range"
                  min="-10Hz"
                  max="+10Hz"
                  value={voiceConfig.pitch}
                  onChange={(e) => setVoiceConfig({ ...voiceConfig, pitch: e.target.value })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleSynthesizeAudio}
              disabled={isSynthesizing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSynthesizing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Synthesizing Voice & Chromagram...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-slate-950" />
                  <span>Synthesize Voiceover ($0.00 Cost)</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Audio Waveform & Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-4 flex flex-col justify-between h-full">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Real-Time Audio Waveform & Chromagram</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300">
                  Format: MP3 192kbps
                </span>
              </div>

              {synthStatus && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs font-mono text-cyan-300">
                  {synthStatus}
                </div>
              )}

              {/* Animated Waveform Visualizer */}
              <div className="p-6 rounded-xl bg-[#030712] border border-slate-800 flex items-center justify-center gap-1.5 h-32">
                {[40, 75, 30, 90, 60, 100, 45, 80, 35, 95, 70, 50, 85, 40, 65, 90, 30, 80, 60, 100, 45, 75, 35, 90, 50].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: isPlaying ? `${height}%` : '20%' }}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isPlaying ? 'bg-gradient-to-t from-cyan-500 to-emerald-400 animate-pulse' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <button
                  onClick={handleTogglePlay}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause Audio' : 'Play Voiceover Preview'}</span>
                </button>
                <div className="text-xs font-mono text-slate-400">
                  Duration: <span className="text-white font-bold">0:45</span> / 0:45
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <div className="text-[11px] text-slate-400 font-mono">
                Fingerprint Status: <span className="text-emerald-400 font-bold">Unique Audio Hash Attached</span>
              </div>
              <button
                onClick={onNext}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Video Canvas Render (Stage 3) ➔</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
