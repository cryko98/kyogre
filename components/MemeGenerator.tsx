
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
      setError(err.message || "An unexpected error occurred in the deep sea.");
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
    <section id="meme" className="py-20 bg-black border-y border-red-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase italic tracking-tighter">
            KYOGRE <span className="text-red-600">PRIMAL</span> FORGE
          </h2>
          <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase mb-12">
            AI Meme Engine • Powered by Primal $KYOGRE Energy
          </p>
          
          <div className="bg-slate-950 p-6 md:p-10 border border-red-900/30 shadow-2xl mb-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Kyogre surfing on a wave of gold coins in a neon city..."
                className="flex-1 bg-black border border-red-900/40 p-4 text-white outline-none focus:border-red-600 font-mono text-sm"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => startGeneration()}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-black px-8 py-4 uppercase tracking-tighter transition-all whitespace-nowrap"
                >
                  {loading ? 'FORGING...' : 'GENERATE'}
                </button>
                <button 
                  onClick={handleRandom}
                  disabled={loading}
                  className="bg-white text-black hover:bg-red-500 hover:text-white px-6 py-4 font-black transition-all"
                  title="Random Idea"
                >
                  🎲
                </button>
              </div>
            </div>

            <div className="aspect-square w-full max-w-[500px] mx-auto bg-black border border-red-900/20 flex items-center justify-center relative overflow-hidden group">
              {loading ? (
                <div className="text-center z-10">
                  <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-red-500 font-black text-xs uppercase tracking-widest animate-pulse">Consulting the Primal Forces...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full relative">
                  <img src={result} alt="Generated Kyogre" className="w-full h-full object-cover animate-in fade-in duration-700" />
                  <a 
                    href={result} 
                    download={`kyogre-meme-${Date.now()}.png`}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <span className="bg-white text-black px-8 py-3 font-black uppercase text-xs tracking-widest">Download Artifact</span>
                  </a>
                </div>
              ) : error ? (
                <div className="p-10 text-center">
                  <div className="text-red-600 font-black text-xl mb-4 uppercase tracking-tighter italic">FORGE ERROR</div>
                  <p className="text-slate-500 text-[11px] uppercase font-mono leading-relaxed max-w-xs mx-auto">
                    {error.includes("Locked") ? "Primal Forge Locked: Check Vercel Environment Variables (API_KEY) and Redeploy." : error}
                  </p>
                </div>
              ) : (
                <div className="text-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <img src={CONFIG.LOGO_URL} className="w-32 h-32 mx-auto mb-4 grayscale" alt="Reference Logo" />
                  <p className="text-[10px] uppercase font-black tracking-[0.4em]">Visual DNA Connected • Standby</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
             {RANDOM_PROMPTS.slice(0, 4).map((p, i) => (
               <button 
                 key={i} 
                 onClick={() => { setPrompt(p); startGeneration(p); }}
                 className="text-[9px] uppercase font-bold text-slate-700 hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500 pb-1"
               >
                 Idea {i+1}
               </button>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
