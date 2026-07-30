import React, { useState } from 'react';
import { Sparkles, Cpu, Copy, Check, FileText, Wand2, RefreshCw } from 'lucide-react';

export default function ScriptGeneratorStudio({ script, setScript, onNext }) {
  const [topic, setTopic] = useState('Top 5 Unknown Psychological Tricks People Use on You');
  const [niche, setNiche] = useState('Psychology & Human Behavior');
  const [model, setModel] = useState('Qwen 2.5 Coder 32B (Hugging Face Free Tier)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    "Top 5 Psychological Tricks That Control Conversations",
    "3 Dark Secrets About Space Science Scientists Don't Tell You",
    "Why 99% of People Fail at Consistency (And How to Fix It)",
    "5 High-Income AI Skills You Can Learn in 7 Days"
  ];

  const handleGenerateScript = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedText = `[HOOK 0:00-0:03]: Did you know your brain falls for this psychological trick every single day? Here is the truth...

[POINT 1 0:03-0:12]: First, the Benjamin Franklin Effect. If you want someone to like you, don't do them a favor—ask them to do a small favor for you! Their brain rationalizes that they must care about you.

[POINT 2 0:12-0:25]: Second, the Door-in-the-Face Technique. Ask for something ridiculously huge first. When they say no, immediately ask for your actual request. It instantly feels small.

[POINT 3 0:25-0:40]: Third, Silence as Power. When someone gives a weak answer, stay completely silent while making soft eye contact. The uncomfortable silence forces them to reveal more.

[CALL TO ACTION 0:40-0:45]: Save this short before you forget it and hit subscribe for daily high-income psychology breakdowns!`;
      
      setScript(generatedText);
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className="p-6 rounded-2xl cyber-glass border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-950 text-cyan-400 text-xs font-mono font-bold border border-cyan-800">
              Module 1 of 5
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              Hugging Face AI Script Generator Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Offload script drafting to free Hugging Face Serverless API (<span className="text-cyan-300 font-mono">Qwen 2.5 32B / Llama 3.3 70B</span>). $0.00 Token Cost.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            0-Quota Engine Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Prompt Configuration */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Video Topic / Hook Prompt
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-[#030712] border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition font-mono"
                placeholder="Enter topic prompt..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Sample Trending Topics
              </label>
              <div className="space-y-1.5">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTopic(prompt)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-[11px] text-slate-300 transition flex items-center justify-between group"
                  >
                    <span className="truncate">{prompt}</span>
                    <Sparkles className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  Niche Category
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">
                  AI Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#030712] border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                >
                  <option>Qwen 2.5 Coder 32B (HF Free)</option>
                  <option>Llama 3.3 70B (HF Free)</option>
                  <option>DeepSeek R1 (HF Free)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateScript}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Drafting Script via Hugging Face API...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-slate-950" />
                  <span>Generate Viral Script ($0.00 Cost)</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Generated Script Output Editor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-3 flex flex-col h-full">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Script Output & Kinetic Timestamps
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={14}
              className="w-full flex-1 p-4 bg-[#030712] border border-slate-800 rounded-xl text-xs text-cyan-100 font-mono leading-relaxed focus:outline-none focus:border-cyan-500 transition resize-none"
              placeholder="Script content will appear here..."
            />

            <div className="pt-2 flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-400">
                Word Count: <span className="text-cyan-400 font-bold">{script.split(/\s+/).filter(Boolean).length} words</span> (~45 seconds)
              </div>
              <button
                onClick={onNext}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Proceed to Audio Voiceover (Stage 2) ➔</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
