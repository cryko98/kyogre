
import React, { useState } from 'react';
import { generateKyogreMeme } from '../services/gemini';
import { CONFIG, RANDOM_PROMPTS } from '../constants';

const MemeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Removed CONFIG.LOGO_URL as it is no longer used for reference
      const imageUrl = await generateKyogreMeme(finalPrompt);
      setResult(imageUrl);
    } catch (err: any) {
      console.error("Generator component caught error:", err);
      setError(err.message || "Something went wrong in the deep sea. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRandom = () => {
    const random = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(random);
    handleGenerate(random);
  };

  return (
    <section id="meme" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-center mb-4 uppercase tracking-tighter">
          DEEP SEA <span className="text-red-600">MEME FORGE</span>
        </h2>
        <p className="text-center text-slate-500 mb-12 max-w-2xl mx-auto uppercase text-xs tracking-widest font-bold">
          The King obeys your commands. Type a prompt or use the randomizer.
        </p>

        <div className="max-w-4xl mx-auto bg-slate-950 p-6 md:p-8 border border-red-900/30 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
          <div className="flex flex-col md:flex-row gap-2 mb-8">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g. Kyogre rules the throne of Mars..."
              className="flex-1 bg-black border border-red-900/30 px-6 py-4 focus:border-red-600 outline-none text-white transition-all text-sm tracking-wide"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => handleGenerate()}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-slate-900 text-white px-8 py-4 font-black transition-all flex items-center justify-center min-w-[120px] uppercase tracking-widest text-sm"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>FORGING...</span>
                  </div>
                ) : 'GENERATE'}
              </button>
              <button 
                onClick={handleRandom}
                disabled={loading}
                className="bg-white hover:bg-red-600 text-black hover:text-white px-6 py-4 transition-all flex items-center justify-center"
                title="Random Meme"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          <div className="min-h-[350px] md:min-h-[500px] flex flex-col items-center justify-center border border-red-900/20 bg-black relative rounded-sm overflow-hidden">
            {loading ? (
              <div className="text-center space-y-4 p-8">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-special text-red-600 animate-pulse uppercase tracking-[0.3em] text-xs">SUMMONING THE KING FROM THE DEPTHS</p>
                <p className="text-slate-600 text-[10px] uppercase tracking-widest">Generating high-quality image data...</p>
              </div>
            ) : result ? (
              <div className="w-full h-full relative group">
                <img src={result} alt="Generated Kyogre Meme" className="w-full h-full object-contain p-2" />
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = result;
                    link.download = `kyogre-meme-${Date.now()}.png`;
                    link.click();
                  }}
                  className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 p-3 text-white transition-all shadow-xl rounded-full scale-0 group-hover:scale-100 duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12 a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            ) : error ? (
              <div className="text-center p-8">
                <div className="text-red-500 font-black uppercase text-sm mb-4 tracking-widest">⚠️ ERROR DETECTED</div>
                <div className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">{error}</div>
                <button 
                  onClick={() => handleGenerate()} 
                  className="mt-6 text-red-600 underline text-[10px] uppercase font-bold tracking-widest hover:text-white"
                >
                  RETRY PROTOCOL
                </button>
              </div>
            ) : (
              <div className="text-slate-800 text-center p-10 select-none opacity-50">
                <img src={CONFIG.LOGO_URL} alt="Logo Ref" className="w-24 h-24 mx-auto mb-6 grayscale brightness-50" />
                <p className="uppercase font-black text-xs tracking-[0.4em]">Awaiting Command</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeGenerator;
