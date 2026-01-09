
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
    <section id="meme" className="py-20 bg-transparent border-y border-cyan-500/10">
      <div className="container mx-auto px-4 reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            FLUFF <span className="text-cyan-400">FACTORY</span>
          </h2>
          <p className="text-blue-300 text-sm tracking-widest uppercase mb-12 font-bold">
            Create your own Fluffin Art • Powered by AI
          </p>
          
          <div className="bg-blue-900/20 backdrop-blur-md p-6 md:p-10 border border-cyan-500/20 shadow-2xl mb-10 rounded-3xl relative overflow-hidden transition-all hover:border-cyan-500/40">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Fluffin the monster eating a giant pizza..."
                className="flex-1 bg-black/40 border border-blue-500/30 p-4 text-white rounded-xl outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all font-medium placeholder-blue-500/50"
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => startGeneration()}
                  disabled={loading}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-black font-black px-8 py-4 rounded-xl uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button 
                  onClick={handleRandom}
                  disabled={loading}
                  className="bg-white text-black hover:bg-cyan-100 px-6 py-4 rounded-xl font-bold transition-all text-xl shadow-lg"
                  title="Random Idea"
                >
                  🎲
                </button>
              </div>
            </div>

            <div className="aspect-square w-full max-w-[500px] mx-auto bg-black/20 border border-cyan-500/10 rounded-2xl flex items-center justify-center relative overflow-hidden group hover:border-cyan-400/30 transition-colors">
              {loading ? (
                <div className="text-center z-10">
                  <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-cyan-300 font-bold text-xs uppercase tracking-widest animate-pulse">Summoning Cuteness...</p>
                </div>
              ) : result ? (
                <div className="w-full h-full relative">
                  <img src={result} alt="Generated Fluffin" className="w-full h-full object-cover animate-in fade-in duration-700" />
                  <a 
                    href={result} 
                    download={`fluffin-meme-${Date.now()}.png`}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <span className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform">Download Art</span>
                  </a>
                </div>
              ) : error ? (
                <div className="p-10 text-center">
                  <div className="text-cyan-400 font-black text-xl mb-4 uppercase">Oops!</div>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">
                    {error.includes("Locked") ? "API Key Missing" : error}
                  </p>
                </div>
              ) : (
                <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <img src={CONFIG.LOGO_URL} className="w-32 h-32 mx-auto mb-4 grayscale rounded-full" alt="Reference Logo" />
                  <p className="text-xs uppercase font-bold tracking-widest text-cyan-200">Waiting for Input</p>
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
