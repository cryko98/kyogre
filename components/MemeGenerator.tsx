
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
      setError(err.message || "Chakra depleted. Try again later.");
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 reveal">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-4 py-1 rounded-sm border border-orange-500/30 bg-orange-950/30 text-orange-400 text-[10px] font-black tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Sage Art: AI Creation
             </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-white font-special drop-shadow-[0_2px_10px_rgba(249,115,22,0.5)]">
              JUTSU <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">GENERATOR</span>
            </h2>
            <p className="text-orange-200 text-sm tracking-[0.2em] uppercase font-bold">
              Weave signs • Focus Chakra • Create Art
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8 bg-[#0f0f0f] p-2 rounded-lg border-2 border-orange-900/50 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            
            {/* Left Control Panel - Scroll Style */}
            <div className="lg:col-span-2 flex flex-col gap-4 p-6 rounded-md bg-neutral-900/50 border border-neutral-800">
              <label className="text-xs font-bold text-orange-500 uppercase tracking-widest font-special">Jutsu Description</label>
              
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Naruto performing Rasengan on the moon..."
                className="flex-1 bg-black/60 border border-orange-900/50 focus:border-orange-500 p-4 text-orange-50 rounded-sm outline-none transition-all font-medium placeholder-orange-900/50 resize-none h-32 text-sm shadow-inner font-mono"
              />
              
              <div className="flex gap-3">
                <button 
                  onClick={handleRandom}
                  disabled={loading}
                  className="bg-neutral-800 text-orange-500 border border-neutral-700 hover:border-orange-500 px-4 py-3 rounded-sm font-bold transition-all"
                  title="Random Scroll"
                >
                  <span className="text-lg">📜</span>
                </button>
                <button 
                  onClick={() => startGeneration()}
                  disabled={loading}
                  className="flex-1 relative overflow-hidden bg-orange-600 hover:bg-orange-500 text-black font-black py-3 rounded-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? 'Weaving Signs...' : 'ACTIVATE JUTSU'}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-3 bg-black rounded-md border border-orange-500/20 overflow-hidden relative flex items-center justify-center min-h-[400px] group">
              
              {/* Corner Accents - Ninja Tool Style */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-500"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-500"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-500"></div>

              {loading ? (
                <div className="text-center z-10 w-full h-full flex flex-col items-center justify-center bg-black/80">
                  <div className="scan-line"></div>
                  <div className="w-24 h-24 border-4 border-orange-600/30 border-t-orange-500 rounded-full animate-spin mb-6"></div>
                  <p className="text-orange-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">Gathering Nature Energy...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full relative group-inner">
                  <img src={result} alt="Generated Naruto Art" className="w-full h-full object-contain animate-in fade-in zoom-in duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                    <a 
                      href={result} 
                      download={`naruto-jutsu-${Date.now()}.png`}
                      className="bg-orange-500 text-black px-8 py-3 rounded-sm font-black uppercase text-xs tracking-widest hover:scale-105 hover:bg-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                    >
                      Save to Scroll
                    </a>
                  </div>
                </div>
              ) : error ? (
                <div className="p-10 text-center max-w-sm">
                   <div className="text-red-500 font-bold text-lg mb-2 uppercase">Jutsu Failed</div>
                  <p className="text-slate-400 text-xs leading-relaxed font-mono">
                    {error}
                  </p>
                </div>
              ) : (
                <div className="text-center opacity-30">
                   <div className="w-24 h-24 mx-auto mb-4 border-2 border-dashed border-orange-500/30 rounded-full flex items-center justify-center">
                      <span className="text-4xl">🔥</span>
                   </div>
                  <p className="text-xs uppercase font-bold tracking-widest text-orange-200">Awaiting User Chakra</p>
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
