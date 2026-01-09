
import React, { useState } from 'react';
import { generateKyogreMeme } from '../services/gemini';
import { CONFIG, RANDOM_PROMPTS } from '../constants';

const MemeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGeneration = async (overridePrompt?: string) => {
    const finalPrompt = (overridePrompt || prompt).trim();
    if (!finalPrompt) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const imageUrl = await generateKyogreMeme(finalPrompt);
      setResult(imageUrl);
    } catch (err: any) {
      console.error("Forge Error:", err);
      setError(err.message || "An unexpected error occurred in the fluff.");
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const random = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(random);
    startGeneration(random);
  };

  return (
    <section id="meme" className="py-24 relative">
      {/* Decorative background glow behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 reveal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-[10px] font-black tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                AI Core Online
             </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-white drop-shadow-[0_2px_10px_rgba(34,211,238,0.5)]">
              FLUFF <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">GENERATOR</span>
            </h2>
            <p className="text-blue-200 text-sm tracking-[0.2em] uppercase font-bold">
              Visualize the legend • Powered by Neural Networks
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8 bg-[#0a0f1f]/60 backdrop-blur-xl p-2 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            
            {/* Left Control Panel */}
            <div className="lg:col-span-2 flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
              <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Input Parameters</label>
              
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your Fluffin scenario..."
                className="flex-1 bg-black/40 border border-cyan-900/50 focus:border-cyan-400 p-4 text-white rounded-xl outline-none transition-all font-medium placeholder-blue-500/30 resize-none h-32 text-sm shadow-inner"
              />
              
              <div className="flex gap-3">
                <button 
                  onClick={handleRandom}
                  disabled={loading}
                  className="bg-blue-900/40 text-cyan-300 border border-cyan-800 hover:bg-cyan-900/50 hover:border-cyan-400 px-4 py-3 rounded-lg font-bold transition-all"
                  title="Randomize"
                >
                  <span className="text-lg">🎲</span>
                </button>
                <button 
                  onClick={() => startGeneration()}
                  disabled={loading}
                  className="flex-1 relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black py-3 rounded-lg uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? 'Processing...' : 'Generate Art'}
                  </span>
                  {!loading && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
                </button>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5">
                <div className="text-[10px] text-slate-400 font-mono">
                  STATUS: <span className={loading ? "text-yellow-400 animate-pulse" : "text-green-400"}>{loading ? "PROCESSING..." : "READY"}</span>
                </div>
              </div>
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-3 bg-black/40 rounded-2xl border border-cyan-500/10 overflow-hidden relative flex items-center justify-center min-h-[400px] group">
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg"></div>

              {loading ? (
                <div className="text-center z-10 w-full h-full flex flex-col items-center justify-center bg-black/20">
                  <div className="scan-line"></div>
                  <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mb-6"></div>
                  <p className="text-cyan-300 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">Synthesizing...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full relative group-inner">
                  <img src={result} alt="Generated Fluffin" className="w-full h-full object-contain animate-in fade-in zoom-in duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                    <a 
                      href={result} 
                      download={`fluffin-meme-${Date.now()}.png`}
                      className="bg-cyan-500 text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                    >
                      Download High-Res
                    </a>
                  </div>
                </div>
              ) : error ? (
                <div className="p-10 text-center max-w-sm">
                   <div className="inline-block p-4 rounded-full bg-red-500/10 text-red-400 mb-4 text-2xl">⚠️</div>
                  <div className="text-red-400 font-bold text-lg mb-2 uppercase">System Error</div>
                  <p className="text-slate-400 text-xs leading-relaxed font-mono">
                    {error.includes("Locked") ? "API Key Access Restricted" : error}
                  </p>
                </div>
              ) : (
                <div className="text-center opacity-40">
                   <div className="w-24 h-24 mx-auto mb-4 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center">
                      <span className="text-4xl">🖼️</span>
                   </div>
                  <p className="text-xs uppercase font-bold tracking-widest text-cyan-200">Awaiting Neural Input</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
